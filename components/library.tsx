"use client";

import {
  claims,
  topics,
  type Claim,
  type Topic,
  type Verdict,
} from "@/lib/claims";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Command,
  Copy,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const storageKey = "unrhetoric-bookmarks-v1";
const featured = claims[0];
const metaClass =
  "text-[11px] leading-snug font-extrabold tracking-[.035em] uppercase";
const actionClass =
  "inline-flex min-h-11 items-center justify-center gap-2.5 border border-ink bg-yellow px-4 py-3 text-sm font-extrabold text-ink transition-colors hover:bg-pink";
const selectClass =
  "h-13.75 w-full appearance-none rounded-lg border-2 border-ink bg-white py-0 pr-8 pl-3 text-sm text-ink";

export function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    const read = () => {
      try {
        const value: unknown = JSON.parse(
          localStorage.getItem(storageKey) ??
            localStorage.getItem("contrapoint-bookmarks-v1") ??
            "[]",
        );
        setSaved(
          Array.isArray(value)
            ? value.filter((x): x is string => typeof x === "string")
            : [],
        );
      } catch {
        setSaved([]);
      }
    };
    read();
    window.addEventListener("storage", read);
    window.addEventListener("unrhetoric:saved", read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("unrhetoric:saved", read);
    };
  }, []);
  const toggle = (slug: string) => {
    const next = saved.includes(slug)
      ? saved.filter((s) => s !== slug)
      : [...saved, slug];
    setSaved(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      window.dispatchEvent(new Event("unrhetoric:saved"));
    } catch {}
  };
  return { saved, toggle };
}

export function SaveButton({
  claim,
  compact = false,
}: {
  claim: Claim;
  compact?: boolean;
}) {
  const { saved, toggle } = useSaved();
  const active = saved.includes(claim.slug);
  return (
    <button
      type='button'
      onClick={() => toggle(claim.slug)}
      aria-label={`${active ? "Remove saved" : "Save"} claim: ${claim.title}`}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-line text-[13px] font-semibold text-accent transition-colors hover:bg-soft aria-pressed:bg-soft ${compact ? "absolute top-4 right-4 size-9 bg-white/80 min-[641px]:top-5 min-[641px]:right-5" : "px-3.5 py-2.5"}`}
    >
      <Bookmark size={18} fill={active ? "currentColor" : "none"} />
      {!compact && <span>{active ? "Saved" : "Save claim"}</span>}
    </button>
  );
}

const verdictStyles: Record<Verdict, string> = {
  Unsupported: "bg-[#fbe5e4] text-[#9e302b]",
  Misleading: "bg-[#faecd9] text-[#89530f]",
  "Needs context": "bg-[#e9e5fa] text-[#5743a6]",
  "Value judgment": "bg-[#e8ebee] text-[#525d6b]",
};
export function VerdictTag({ verdict }: { verdict: Verdict }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-current px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${verdictStyles[verdict]}`}
    >
      <span className='size-1.5 shrink-0 rounded-full bg-current' />
      {verdict}
    </span>
  );
}

// All variant names are static strings so Tailwind v4 can discover them at build time.
const tileStyles = [
  "bg-pink min-[901px]:col-span-4",
  "bg-yellow min-[901px]:col-span-3",
  "bg-sky min-[901px]:col-span-3",
  "bg-mint min-[901px]:col-span-4",
  "bg-orange min-[901px]:col-span-4",
  "bg-yellow min-[901px]:col-span-2",
  "bg-accent text-paper min-[901px]:col-span-3",
  "bg-pink min-[901px]:col-span-3",
  "bg-sky min-[901px]:col-span-6 min-[901px]:row-span-1",
] as const;

const topicArt = ["↗", "%", "↔", "+", "☀", "≋", "◎", "✿", "?"] as const;
const claimTopicStyles = [
  "bg-pink/45",
  "bg-yellow/45",
  "bg-sky/45",
  "bg-mint/45",
  "bg-orange/25",
  "bg-yellow/35",
  "bg-soft",
  "bg-pink/30",
  "bg-sky/30",
] as const;

function scrollToLibrary() {
  const paused =
    document.documentElement.classList.contains("motion-paused") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById("library")
    ?.scrollIntoView({ behavior: paused ? "auto" : "smooth" });
}

export function Home() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<Topic | "All topics">("All topics");
  const openTopic = (t: Topic) => {
    setTopic(t);
    setQuery("");
    scrollToLibrary();
  };
  const tile = (i: number) => (
    <button
      type='button'
      key={topics[i]}
      onClick={() => openTopic(topics[i])}
      className={`edition-topic group relative isolate col-span-3 row-span-2 flex min-w-0 flex-col justify-between overflow-hidden rounded-xs border border-ink p-3 text-left transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-[4px_5px_0_var(--color-ink)] focus-visible:border-accent min-[641px]:p-4 ${tileStyles[i]}`}
    >
      <span className={metaClass}>
        {String(i + 1).padStart(2, "0")} /{" "}
        {claims.filter((c) => c.topic === topics[i]).length} claims
      </span>
      <span
        aria-hidden='true'
        className={`edition-symbol pointer-events-none absolute right-[-6%] text-[125px] leading-[.8] font-black opacity-22 min-[641px]:text-[clamp(100px,15vw,230px)] ${i === 8 ? "top-[-35%]" : "top-[22%]"}`}
      >
        {topicArt[i]}
      </span>
      <strong
        className={`relative z-10 max-w-[85%] text-[clamp(21px,5.8vw,31px)] leading-[.95] font-black tracking-[-.06em] wrap-break-word min-[641px]:text-[clamp(25px,5vw,45px)] ${i === 5 ? "min-[901px]:text-3xl" : "min-[901px]:text-[clamp(23px,3vw,47px)]"}`}
      >
        {topics[i]}
      </strong>
      <span className='edition-arrow absolute right-2 bottom-2 grid size-6.75 place-items-center rounded-full border border-current min-[641px]:right-2.75 min-[641px]:bottom-2.75 min-[641px]:size-8.25'>
        <ArrowUpRight size={23} className='size-4.25 min-[641px]:size-5.75' />
      </span>
    </button>
  );
  return (
    <>
      <section
        aria-label='Discover topics'
        className='mx-auto w-[calc(100%-24px)] max-w-370 pt-6 pb-11.25 min-[641px]:w-[calc(100%-48px)]'
      >
        <div className='edition-heading mb-3 flex flex-col gap-4.5 border-b-2 border-ink pb-5 min-[641px]:flex-row min-[641px]:items-end min-[641px]:justify-between min-[641px]:gap-8'>
          <div>
            <span className={metaClass}>
              Independent reference / U.S. edition
            </span>
            <h1 className='mt-3.5 text-[clamp(60px,16vw,106px)] leading-[.83] font-black tracking-[-.095em] min-[641px]:text-[clamp(70px,10vw,160px)]'>
              The index<span className='text-accent'>.</span>
            </h1>
          </div>
          <div className='edition-intro grid gap-2.25 min-[641px]:max-w-77.5'>
            <p className='text-[17px] leading-[1.35]'>
              Explore the claims behind American political debates, one topic at
              a time.
            </p>
            <form
              className='flex h-10 w-full items-center border border-ink bg-white'
              onSubmit={(e) => {
                e.preventDefault();
                setTopic("All topics");
                scrollToLibrary();
              }}
            >
              <input
                type='search'
                aria-label='Find a claim'
                placeholder='Find a claim…'
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setTopic("All topics");
                }}
                className='min-w-0 flex-1 bg-transparent px-2.5 py-2 text-sm text-ink focus-visible:-outline-offset-2'
              />
              <button
                aria-label='Search claims'
                type='submit'
                className='grid aspect-square h-full shrink-0 place-items-center border-l border-ink bg-yellow text-ink hover:bg-mint'
              >
                <Search size={19} />
              </button>
            </form>
            <a
              href='#library'
              className='flex items-center gap-2 text-[13px] font-extrabold underline underline-offset-4'
            >
              All {claims.length} claims <ArrowRight size={19} />
            </a>
          </div>
        </div>
        <div className='grid auto-rows-[minmax(82px,auto)] grid-cols-6 gap-1.5 min-[641px]:auto-rows-[minmax(105px,auto)] min-[641px]:gap-2.5 min-[901px]:auto-rows-[minmax(116px,auto)] min-[901px]:grid-cols-12'>
          <article className='edition-feature @container relative isolate col-span-6 row-span-4 flex min-h-80 flex-col justify-between gap-8 overflow-hidden rounded-xs border border-ink bg-accent p-3 text-paper min-[641px]:row-span-3 min-[641px]:p-6 min-[901px]:col-span-5 min-[901px]:row-span-4'>
            <span className={metaClass}>In focus / {featured.topic}</span>
            <div
              className='feature-motif pointer-events-none absolute top-[6%] right-[-8%] -z-10 grid aspect-square w-[68%] place-items-center opacity-43 min-[641px]:max-[900px]:top-0 min-[641px]:max-[900px]:right-0 min-[641px]:max-[900px]:w-[48%]'
              aria-hidden='true'
            >
              <i className='absolute inset-[4%] rounded-full border-2 border-sky' />
              <i className='absolute inset-[13%] rounded-full border-2 border-dashed border-sky' />
              <i className='absolute inset-[23%] rounded-full border-18 border-double border-pink' />
              <span className='text-[clamp(110px,20vw,280px)] leading-none font-black text-pink'>
                ?
              </span>
            </div>
            <div className='feature-copy relative z-10'>
              <span className={metaClass}>A claim worth examining</span>
              <h2 className='mt-3.25 mb-5 max-w-full text-[clamp(30px,10cqw,64px)] leading-[.96] font-black tracking-[-.065em] wrap-break-word min-[641px]:max-[900px]:max-w-[65%]'>
                {featured.title}
              </h2>
              <Link
                href={`/claims/${featured.slug}/`}
                className={`${actionClass} hover:translate-x-1`}
              >
                Read the breakdown <ArrowUpRight size={22} />
              </Link>
            </div>
          </article>
          {topics.map((_, i) => tile(i))}
          <div className='edition-end col-span-3 row-span-2 flex flex-col justify-between gap-2 rounded-xs border border-ink bg-white p-3 min-[641px]:p-4 min-[901px]:col-span-6 min-[901px]:row-span-1'>
            <span className={metaClass}>The editorial approach</span>
            <p className='text-xl leading-tight font-black tracking-tight min-[641px]:text-[23px]'>
              Claims are not conclusions.
            </p>
            <Link
              href='/about/'
              className='flex items-center gap-2 text-[11px] font-extrabold underline underline-offset-4 min-[641px]:text-[13px]'
            >
              How we evaluate evidence{" "}
              <ArrowUpRight size={18} className='shrink-0' />
            </Link>
          </div>
        </div>
      </section>
      <Library
        query={query}
        setQuery={setQuery}
        topic={topic}
        setTopic={setTopic}
      />
    </>
  );
}

function Library({
  query,
  setQuery,
  topic,
  setTopic,
}: {
  query: string;
  setQuery: (value: string) => void;
  topic: Topic | "All topics";
  setTopic: (value: Topic | "All topics") => void;
}) {
  const [verdict, setVerdict] = useState<Verdict | "All assessments">(
    "All assessments",
  );
  const [onlySaved, setOnlySaved] = useState(false);
  const [sort, setSort] = useState("Editorial");
  const { saved } = useSaved();
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const sync = () =>
      setOnlySaved(
        new URLSearchParams(window.location.search).get("saved") === "1",
      );
    sync();
    window.addEventListener("popstate", sync);
    const handle = (ev: KeyboardEvent) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === "k") {
        ev.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.scrollIntoView({
          block: "center",
          behavior:
            document.documentElement.classList.contains("motion-paused") ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
        });
      }
    };
    window.addEventListener("keydown", handle);
    return () => {
      window.removeEventListener("keydown", handle);
      window.removeEventListener("popstate", sync);
    };
  }, []);
  const filtered = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const list = claims.filter(
      (c) =>
        (topic === "All topics" || c.topic === topic) &&
        (verdict === "All assessments" || c.verdict === verdict) &&
        (!onlySaved || saved.includes(c.slug)) &&
        terms.every((t) =>
          [
            c.title,
            c.topic,
            c.assessment,
            c.context,
            c.statisticTrap,
            ...c.keywords,
          ]
            .join(" ")
            .toLowerCase()
            .includes(t),
        ),
    );
    return sort === "A–Z"
      ? [...list].sort((a, b) => a.title.localeCompare(b.title))
      : list;
  }, [query, topic, verdict, onlySaved, saved, sort]);
  return (
    <section
      className='mx-auto w-[calc(100%-32px)] max-w-330 scroll-mt-24 border-t border-ink pt-10 pb-22.5 lg:w-[calc(100%-88px)]'
      id='library'
    >
      <div className='mb-4 text-xs font-semibold text-muted'>The library</div>
      <div className='library-title mb-6 flex flex-col gap-3 min-[850px]:flex-row min-[850px]:items-end min-[850px]:justify-between min-[850px]:gap-10'>
        <h2 className='text-[clamp(42px,6vw,82px)] leading-none font-black tracking-[-.07em]'>
          Find the argument<span className='text-accent'>.</span>
        </h2>
        <p className='max-w-137.5 text-[15px] leading-relaxed text-muted min-[850px]:max-w-87.5'>
          Start with a claim you have encountered. Each breakdown separates the
          assertion from the evidence, including what the data cannot tell you.
        </p>
      </div>
      <div className='mb-7.5 flex flex-col gap-2.5 min-[1000px]:flex-row min-[1000px]:items-center'>
        <div className='flex h-13.75 min-w-0 flex-1 items-center gap-3 rounded-lg border-2 border-ink bg-white px-4 text-muted focus-within:border-accent'>
          <Search size={22} strokeWidth={1.6} className='shrink-0' />
          <input
            ref={searchRef}
            type='search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search a claim, topic or keyword…'
            aria-label='Search claims'
            className='min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none focus-visible:outline-none'
          />
          {query ? (
            <button
              type='button'
              onClick={() => setQuery("")}
              aria-label='Clear search'
              className='grid shrink-0 place-items-center'
            >
              <X size={18} />
            </button>
          ) : (
            <span className='flex shrink-0 items-center gap-1 rounded-md border border-line bg-white/50 px-1.5 py-1 text-xs'>
              <Command size={12} /> K
            </span>
          )}
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <label className='relative flex min-w-0 items-center'>
            <span className='sr-only'>Assessment</span>
            <select
              className={selectClass}
              value={verdict}
              onChange={(e) => setVerdict(e.target.value as typeof verdict)}
            >
              {[
                "All assessments",
                "Unsupported",
                "Misleading",
                "Needs context",
                "Value judgment",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className='pointer-events-none absolute right-3 text-muted'
            />
          </label>
          <label className='relative flex min-w-0 items-center'>
            <span className='sr-only'>Sort</span>
            <select
              className={selectClass}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option>Editorial</option>
              <option>A–Z</option>
            </select>
            <ChevronDown
              size={15}
              className='pointer-events-none absolute right-3 text-muted'
            />
          </label>
          <button
            type='button'
            className='flex h-13.75 items-center gap-1.5 rounded-lg border-2 border-ink bg-white px-3 text-sm whitespace-nowrap aria-pressed:border-accent aria-pressed:bg-soft aria-pressed:text-accent'
            onClick={() => setOnlySaved((v) => !v)}
            aria-pressed={onlySaved}
          >
            <Bookmark size={15} fill={onlySaved ? "currentColor" : "none"} />{" "}
            Saved ({saved.length})
          </button>
        </div>
      </div>
      <div className='grid min-w-0 items-start gap-5 min-[850px]:grid-cols-[185px_minmax(0,1fr)] min-[1121px]:grid-cols-[220px_minmax(0,1fr)] min-[1121px]:gap-8'>
        <aside className='flex min-w-0 items-center gap-1.5 overflow-x-auto pb-3 text-muted min-[850px]:sticky min-[850px]:top-26.25 min-[850px]:block min-[850px]:overflow-visible min-[850px]:rounded-xl min-[850px]:border-2 min-[850px]:border-ink min-[850px]:bg-sky min-[850px]:p-2.5 min-[850px]:shadow-[3px_3px_0_var(--color-ink)]'>
          <div className='mb-3 hidden px-2.5 text-[13px] font-semibold min-[850px]:block'>
            Topics
          </div>
          {(["All topics", ...topics] as const).map((t) => (
            <button
              type='button'
              key={t}
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className='flex shrink-0 items-center gap-2.5 rounded-full border border-line px-3 py-2 text-left text-xs font-semibold whitespace-nowrap hover:bg-ink/5 hover:text-ink aria-pressed:bg-paper aria-pressed:text-accent min-[850px]:w-full min-[850px]:rounded-md min-[850px]:border-0 min-[850px]:px-2.5 min-[850px]:py-3 min-[850px]:text-sm min-[850px]:whitespace-normal'
            >
              <span>{t}</span>
              <span className='ml-auto hidden text-xs min-[850px]:inline'>
                {t === "All topics"
                  ? claims.length
                  : claims.filter((c) => c.topic === t).length}
              </span>
            </button>
          ))}
          <Link
            className='hidden items-center gap-1.5 px-2.5 py-5 text-xs font-semibold text-accent hover:underline min-[850px]:flex'
            href='/about/'
          >
            How we evaluate claims{" "}
            <ArrowUpRight size={14} className='shrink-0' />
          </Link>
        </aside>
        <div className='grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-2'>
          <div
            className='col-span-full py-3 text-xs font-semibold text-muted'
            aria-live='polite'
          >
            {String(filtered.length).padStart(2, "0")} RESULTS{" "}
            {topic !== "All topics" ? ` / ${topic}` : ""}
          </div>
          {filtered.length === 0 ? (
            <div className='col-span-full flex flex-col items-start gap-3 rounded-xl border border-dashed border-line px-6 py-11 text-muted'>
              <Search size={30} />
              <h3 className='text-2xl font-bold text-ink'>
                No matching claims.
              </h3>
              <p>Try another keyword or reset your filters.</p>
              <button
                type='button'
                className={actionClass}
                onClick={() => {
                  setQuery("");
                  setTopic("All topics");
                  setVerdict("All assessments");
                  setOnlySaved(false);
                }}
              >
                Reset filters <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            filtered.map((c) => (
              <article
                className='claim-row relative flex min-w-0 items-stretch rounded-xl border-2 border-ink bg-white shadow-[3px_3px_0_var(--color-ink)] transition-[translate,box-shadow,background-color] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)]'
                key={c.slug}
              >
                <Link
                  className='group flex min-w-0 flex-1 flex-col items-start p-5 pr-15 min-[641px]:p-6 min-[641px]:pr-17'
                  href={`/claims/${c.slug}/`}
                >
                  <div className='mb-2.5 flex flex-wrap items-center gap-2.5'>
                    <span
                      className={`rounded-sm border border-ink px-2 py-1 text-xs font-extrabold ${claimTopicStyles[topics.indexOf(c.topic)]}`}
                    >
                      {c.topic}
                    </span>
                    <VerdictTag verdict={c.verdict} />
                  </div>
                  <h3 className='mb-2.5 text-[clamp(21px,1.65vw,27px)] leading-[1.18] font-extrabold tracking-[-.055em] group-hover:text-accent'>
                    {c.title}
                  </h3>
                  <p className='mb-3 max-w-[72ch] text-[15px] leading-relaxed text-muted'>
                    {c.assessment}
                  </p>
                  <span className='mt-auto flex items-center gap-1.5 text-[13px] font-[650] text-accent transition-transform group-hover:translate-x-1'>
                    Read the breakdown <ArrowUpRight size={15} />
                  </span>
                </Link>
                <SaveButton claim={c} compact />
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export function CopyResponse({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  return (
    <button
      type='button'
      className={actionClass}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setState("copied");
        } catch {
          setState("failed");
        }
      }}
    >
      {state === "copied" ? <Check size={18} /> : <Copy size={18} />}
      {state === "copied"
        ? "Copied"
        : state === "failed"
          ? "Copy unavailable — select text"
          : "Copy response"}
    </button>
  );
}
