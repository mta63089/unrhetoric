/** Shared by the Next application and the standalone preview. No external dependencies. */
export function installScrollMotion(): () => void {
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealSelector =
    ".edition-feature,.edition-topic,.edition-end,.library-title,.claim-row,.reader-section,.reader-next,.standards article";
  const artSelector = ".edition-heading,.edition-feature,.edition-topic";
  const watched = new Set<HTMLElement>();
  let art: HTMLElement[] = [],
    sections: HTMLElement[] = [],
    nav: HTMLAnchorElement[] = [];
  let frame = 0,
    active = "";
  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));
  const disabled = () =>
    media.matches || root.classList.contains("motion-paused");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-seen");
          observer.unobserve(entry.target);
        }
    },
    { threshold: 0, rootMargin: "0px 0px -4% 0px" },
  );
  function register() {
    for (const el of watched)
      if (!el.isConnected) {
        observer.unobserve(el);
        watched.delete(el);
      }
    document.querySelectorAll<HTMLElement>(revealSelector).forEach((el, i) => {
      if (watched.has(el)) return;
      watched.add(el);
      el.style.setProperty("--reveal-delay", `${(i % 3) * 70}ms`);
      el.classList.add("scroll-reveal");
      if (
        disabled() ||
        (el.getClientRects().length &&
          el.getBoundingClientRect().top < innerHeight * 0.92)
      )
        el.classList.add("scroll-seen");
      else observer.observe(el);
    });
    art = Array.from(document.querySelectorAll<HTMLElement>(artSelector));
    sections = Array.from(
      document.querySelectorAll<HTMLElement>(".reader-section[id]"),
    );
    nav = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".reader-nav a"),
    );
    active = "";
    request();
  }
  function update() {
    frame = 0;
    const off = disabled(),
      h = innerHeight,
      max = root.scrollHeight - h;
    const values = art
      .filter((el) => el.getClientRects().length)
      .map((el) => {
        const r = el.getBoundingClientRect();
        const p = clamp(
          (h / 2 - (r.top + r.height / 2)) / (h / 2 + r.height / 2),
          -1,
          1,
        );
        return { el, p: off ? 0 : p };
      });
    const current =
      sections
        .filter(
          (el) =>
            el.getClientRects().length &&
            el.getBoundingClientRect().top <= Math.min(h * 0.45, 290),
        )
        .at(-1)?.id ||
      sections.find((el) => el.getClientRects().length)?.id ||
      "";
    root.style.setProperty(
      "--reader-nav-top",
      `${document.querySelector(".site-header")?.getBoundingClientRect().height || 76}px`,
    );
    root.style.setProperty(
      "--page-progress",
      String(max > 0 ? clamp(scrollY / max, 0, 1) : 0),
    );
    for (const { el, p } of values) {
      el.style.setProperty("--drift", `${p * 64}px`);
      el.style.setProperty("--drift-small", `${p * 15}px`);
      el.style.setProperty("--turn", `${p * 32}deg`);
    }
    if (current !== active) {
      active = current;
      for (const a of nav) {
        if (a.hash === "#" + current)
          a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      }
    }
  }
  function request() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  function preferences() {
    if (disabled())
      for (const el of watched) {
        el.classList.add("scroll-seen");
        observer.unobserve(el);
      }
    request();
  }
  // Keep content readable when focused or navigated to by an in-page link.
  function focus(event: FocusEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    for (const el of watched)
      if (el.contains(target)) {
        el.classList.add("scroll-seen");
        observer.unobserve(el);
      }
  }
  const mutation = new MutationObserver(register);
  const main = document.querySelector("main");
  if (main) mutation.observe(main, { subtree: true, childList: true });
  const preferenceObserver = new MutationObserver(preferences);
  preferenceObserver.observe(root, {
    attributes: true,
    attributeFilter: ["class"],
  });
  const resizeObserver = new ResizeObserver(request);
  if (main) resizeObserver.observe(main);
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
  media.addEventListener("change", preferences);
  document.addEventListener("focusin", focus);
  register();
  return () => {
    observer.disconnect();
    mutation.disconnect();
    preferenceObserver.disconnect();
    resizeObserver.disconnect();
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", request);
    window.removeEventListener("resize", request);
    media.removeEventListener("change", preferences);
    document.removeEventListener("focusin", focus);
    for (const el of watched) {
      el.classList.remove("scroll-reveal", "scroll-seen");
      el.style.removeProperty("--reveal-delay");
    }
    for (const el of art) {
      for (const prop of ["--drift", "--drift-small", "--turn"])
        el.style.removeProperty(prop);
    }
    root.style.removeProperty("--page-progress");
  };
}
