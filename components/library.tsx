"use client";
import {
  claims,
  topics,
  verdictClass,
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
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
const storageKey = "unrhetoric-bookmarks-v1";
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
      className={`save-button ${active ? "active" : ""}`}
      aria-label={`${active ? "Remove saved" : "Save"} claim: ${claim.title}`}
      aria-pressed={active}
    >
      <Bookmark size={18} fill={active ? "currentColor" : "none"} />
      {!compact && <span>{active ? "Saved" : "Save claim"}</span>}
    </button>
  );
}
export function VerdictTag({ verdict }: { verdict: Verdict }) {
  return (
    <span className={`verdict ${verdictClass[verdict]}`}>
      <span />
      {verdict}
    </span>
  );
}
const featured = claims[0];
export function Home() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<Topic | "All topics">("All topics");
  const openTopic = (t: Topic) => {
    setTopic(t);
    setQuery("");
    document.getElementById("library")?.scrollIntoView({
      behavior:
        document.documentElement.classList.contains("motion-paused") ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
    });
  };
  const tile = (i: number) => (
    <button
      className={`edition-topic edition-topic-${i}`}
      style={
        {
          "--tile": [
            "#ff9dcf",
            "#ffdb46",
            "#a9c9ff",
            "#b8e78a",
            "#ff643b",
            "#ffdb46",
            "#006f68",
            "#ff9dcf",
            "#a9c9ff",
          ][i],
        } as React.CSSProperties
      }
      key={topics[i]}
      onClick={() => openTopic(topics[i])}
    >
      <span className='edition-meta'>
        {String(i + 1).padStart(2, "0")} /{" "}
        {claims.filter((c) => c.topic === topics[i]).length} claims
      </span>
      <strong>{topics[i]}</strong>
      <span className='edition-arrow'>
        <ArrowUpRight size={23} />
      </span>
    </button>
  );
  return (
    <>
      <section className='edition shell' aria-label='Discover topics'>
        <div className='edition-heading'>
          <div>
            <span className='edition-meta'>
              Independent reference / U.S. edition
            </span>
            <h1>
              The index<span>.</span>
            </h1>
          </div>
          <div className='edition-intro'>
            <p>
              Explore the claims behind American political debates, one topic at
              a time.
            </p>
            <form
              className='edition-search'
              onSubmit={(e) => {
                e.preventDefault();
                setTopic("All topics");
                document.getElementById("library")?.scrollIntoView();
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
              />
              <button aria-label='Search claims' type='submit'>
                <Search size={19} />
              </button>
            </form>
            <a href='#library'>
              All {claims.length} claims <ArrowRight size={19} />
            </a>
          </div>
        </div>
        <div className='edition-mosaic'>
          <article className='edition-feature'>
            <span className='edition-meta'>In focus / {featured.topic}</span>
            <div className='feature-motif' aria-hidden='true'>
              “
            </div>
            <div className='feature-copy'>
              <h2>{featured.title}</h2>
              <Link href={`/claims/${featured.slug}/`} className='feature-link'>
                Read the breakdown <ArrowUpRight size={22} />
              </Link>
            </div>
          </article>
          {tile(0)}
          {tile(1)}
          {tile(2)}
          {tile(3)}
          {tile(4)}
          {tile(5)}
          {tile(6)}
          {tile(7)}
          {tile(8)}
          <div className='edition-end'>
            <span className='edition-meta'>The editorial approach</span>
            <p>Claims are not conclusions.</p>
            <Link href='/about/'>
              How we evaluate evidence <ArrowUpRight size={18} />
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
    <section className='shell library' id='library'>
      <div className='section-kicker mono'>The library</div>
      <div className='library-title'>
        <h2>
          Find the argument<span>.</span>
        </h2>
        <p>
          Start with a claim you have encountered. Each breakdown separates the
          assertion from the evidence, including what the data cannot tell you.
        </p>
      </div>
      <div className='library-controls'>
        <div className='search-box'>
          <Search size={22} strokeWidth={1.6} />
          <input
            ref={searchRef}
            type='search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search a claim, topic or keyword…'
            aria-label='Search claims'
          />
          {query ? (
            <button
              className='clear-search'
              onClick={() => setQuery("")}
              aria-label='Clear search'
            >
              <X size={18} />
            </button>
          ) : (
            <span className='keyboard'>
              <Command size={12} /> K
            </span>
          )}
        </div>
        <div className='filter-row'>
          <label className='select-wrap'>
            <span className='sr-only'>Assessment</span>
            <select
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
            <ChevronDown size={15} />
          </label>
          <label className='select-wrap'>
            <span className='sr-only'>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>Editorial</option>
              <option>A–Z</option>
            </select>
            <ChevronDown size={15} />
          </label>
          <button
            className={`saved-filter ${onlySaved ? "selected" : ""}`}
            onClick={() => setOnlySaved((v) => !v)}
            aria-pressed={onlySaved}
          >
            <Bookmark size={15} fill={onlySaved ? "currentColor" : "none"} />{" "}
            Saved ({saved.length})
          </button>
        </div>
      </div>
      <div className='index-layout'>
        <aside className='topics'>
          <div className='mono side-title'>Topics</div>
          {(["All topics", ...topics] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={topic === t ? "topic active-topic" : "topic"}
            >
              <span>{t}</span>
              <span className='topic-count mono'>
                {t === "All topics"
                  ? claims.length
                  : claims.filter((c) => c.topic === t).length}
              </span>
            </button>
          ))}
          <Link className='method-link' href='/about/'>
            How we evaluate claims <ArrowUpRight size={14} />
          </Link>
        </aside>
        <div className='results'>
          <div className='results-header mono' aria-live='polite'>
            <span>
              {String(filtered.length).padStart(2, "0")} RESULTS{" "}
              {topic !== "All topics" ? ` / ${topic}` : ""}
            </span>
          </div>
          {filtered.length === 0 ? (
            <div className='empty'>
              <Search size={30} />
              <h3>No matching claims.</h3>
              <p>Try another keyword or reset your filters.</p>
              <button
                className='primary-button'
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
                className='claim-row'
                data-tone={topics.indexOf(c.topic) % 6}
                key={c.slug}
              >
                <Link className='claim-main group' href={`/claims/${c.slug}/`}>
                  <div className='claim-row-top'>
                    <span className='mono claim-id'>{c.topic}</span>
                    <VerdictTag verdict={c.verdict} />
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.assessment}</p>
                  <span className='read-link transition-transform group-hover:translate-x-1'>
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
      className='primary-button'
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setState("copied");
        } catch {
          setState("failed");
        }
      }}
    >
      {state === "copied" ? (
        <Check size={18} />
      ) : (
        <span className='copy-icon' />
      )}
      {state === "copied"
        ? "Copied"
        : state === "failed"
          ? "Copy unavailable — select text"
          : "Copy response"}
    </button>
  );
}
