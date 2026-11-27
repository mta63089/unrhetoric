import { CopyResponse, SaveButton, VerdictTag } from "@/components/library";
import { claimBySlug, claims } from "@/lib/claims";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const metaClass =
  "text-[11px] leading-snug font-extrabold tracking-[.035em] uppercase";
const labelClass =
  "flex items-center justify-between border-b border-current pb-2.25 text-xs font-black tracking-[.04em] uppercase";
const sectionClass =
  "reader-section scroll-mt-33 border-b border-ink py-6 min-[641px]:scroll-mt-35.5";
const headingClass =
  "mb-3.5 text-[clamp(27px,3.1vw,48px)] leading-none font-black tracking-[-.055em]";
const sourceClass =
  "flex items-center justify-between gap-4 border-t border-ink py-4.25 hover:text-accent";
const navLinkClass =
  "relative shrink-0 rounded-full border border-ink px-3 py-1.5 text-xs font-extrabold transition-colors hover:bg-mint aria-[current=location]:border-accent aria-[current=location]:bg-accent aria-[current=location]:text-paper";

export function generateStaticParams() {
  return claims.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const c = claimBySlug((await params).slug);
  return { title: c?.title || "Claim", description: c?.assessment };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const c = claimBySlug((await params).slug);
  if (!c) notFound();
  const index = claims.indexOf(c);
  const related = claims
    .filter((x) => x.topic === c.topic && x.slug !== c.slug)
    .slice(0, 3);
  const next = claims[(index + 1) % claims.length];
  const response = `${c.response}\n\nContext: ${c.caveat}\n\nSources:\n${c.sources.map((s) => `${s.publisher}: ${s.url}`).join("\n")}`;

  return (
    <div className='mx-auto w-full max-w-370'>
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-ink px-3 py-2.5 text-xs font-[650] min-[641px]:px-6 min-[641px]:py-3'>
        <Link
          href='/#library'
          className='flex items-center gap-2 text-[13px] hover:text-accent'
        >
          <ArrowLeft size={18} /> Back to index
        </Link>
        <span className='hidden min-[641px]:inline'>
          {c.topic} / {String(index + 1).padStart(2, "0")}
        </span>
        <SaveButton claim={c} />
      </div>
      <div className='min-h-[calc(100dvh-120px)] min-[641px]:grid min-[641px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] min-[901px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]'>
        <aside className='relative border-b border-ink bg-pink px-4.5 py-6 min-[641px]:border-r min-[641px]:border-b-0 min-[641px]:p-[clamp(24px,3.2vw,48px)]'>
          <div className='reader-claim-inner pb-3.5 min-[641px]:sticky min-[641px]:top-22 min-[641px]:max-h-[calc(100dvh-106px)] min-[641px]:overflow-y-auto min-[641px]:scrollbar-thin'>
            <div className={labelClass}>
              <span>01 / The claim</span>
              <span aria-hidden='true' className='text-[28px] leading-none'>
                “ ”
              </span>
            </div>
            <h1 className='my-5.5 text-[42px] leading-[.99] font-black tracking-[-.065em] wrap-anywhere min-[641px]:text-[clamp(30px,4vw,48px)] min-[901px]:text-[clamp(34px,4.4vw,70px)]'>
              {c.title}
            </h1>
            <VerdictTag verdict={c.verdict} />
            <div>
              <h2 className='mt-5.5 mb-1.5 text-sm font-black'>
                Where it appears
              </h2>
              <p className='text-[15px] leading-normal'>{c.context}</p>
              <h2 className='mt-5.5 mb-1.5 text-sm font-black'>
                What the framing leaves out
              </h2>
              <p className='text-[15px] leading-normal'>{c.statisticTrap}</p>
            </div>
            <div className='reader-question relative mt-6 overflow-hidden border border-ink bg-yellow p-3.75'>
              <span className={metaClass}>A question to examine</span>
              <p className='mt-1.5 text-[17px] leading-[1.3] font-extrabold'>
                {c.question}
              </p>
            </div>
          </div>
        </aside>
        <div className='reader-evidence min-w-0 bg-paper px-4.5 py-6 min-[641px]:p-[clamp(24px,3.6vw,52px)]'>
          <div className={`${labelClass} text-accent`}>
            <span>02 / The evidence</span>
            <ArrowUpRight size={28} />
          </div>
          <nav
            className='reader-nav sticky top-(--reader-nav-top,66px) z-10 flex flex-wrap gap-2.25 border-b border-ink bg-paper py-2.5 min-[641px]:py-3'
            aria-label='On this page'
          >
            <a className={navLinkClass} href='#assessment'>
              Context
            </a>
            <a className={navLinkClass} href='#evidence'>
              Evidence
            </a>
            <a className={navLinkClass} href='#response'>
              Response
            </a>
            <a className={navLinkClass} href='#sources'>
              Sources
            </a>
          </nav>
          <section className={sectionClass} id='assessment'>
            <h2 className={headingClass}>
              What the evidence says<span className='text-accent'>.</span>
            </h2>
            <p className='text-[clamp(18px,2vw,26px)] leading-[1.35] tracking-[-.015em]'>
              {c.assessment}
            </p>
          </section>
          <section className={sectionClass} id='evidence'>
            <span className={metaClass}>The numbers &amp; findings</span>
            <div className='mt-3 grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-2.5'>
              {c.evidence.map((e, i) => (
                <article
                  className={`reader-fact flex min-w-0 flex-col gap-2 border border-ink p-4 ${i % 2 === 0 ? "bg-sky" : "bg-mint"}`}
                  key={i}
                >
                  <span className={metaClass}>
                    {String(i + 1).padStart(2, "0")} / Finding
                  </span>
                  <strong className='text-[clamp(30px,3.6vw,52px)] leading-none font-extrabold tracking-[-.06em] wrap-anywhere text-ink'>
                    {e.value}
                  </strong>
                  <h3 className='text-base font-bold'>{e.label}</h3>
                  <p className='text-[15px] leading-relaxed'>{e.detail}</p>
                  <a
                    className='mt-auto flex items-center gap-1.5 pt-1.5 text-xs font-bold underline hover:text-accent'
                    href={`#source-${e.source + 1}`}
                  >
                    {c.sources[e.source].publisher}{" "}
                    <ArrowUpRight className='shrink-0' size={15} />
                  </a>
                </article>
              ))}
            </div>
          </section>
          <section className={sectionClass} id='response'>
            <span className={metaClass}>Putting it into words</span>
            <div className='reader-response mt-2.5 bg-accent p-5 text-paper'>
              <h2 className={headingClass}>A possible response.</h2>
              <p className='mb-4 text-lg leading-relaxed'>{c.response}</p>
              <CopyResponse text={response} />
            </div>
            <div className='reader-caveat mt-2.5 flex items-start gap-3 bg-yellow p-3.5'>
              <BookOpen size={21} className='shrink-0 text-accent' />
              <div>
                <h3 className='mb-1 text-base font-bold'>
                  What this does not prove
                </h3>
                <p className='text-[15px] leading-relaxed'>{c.caveat}</p>
              </div>
            </div>
          </section>
          <section className={sectionClass} id='sources'>
            <h2 className={headingClass}>Original sources.</h2>
            <div className='source-list'>
              {c.sources.map((s, i) => (
                <a
                  className={`${sourceClass} scroll-mt-33 last:border-b target:outline-2 target:outline-accent min-[641px]:scroll-mt-35.5`}
                  id={`source-${i + 1}`}
                  key={s.url}
                  href={s.url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='shrink-0 text-muted'>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className='flex min-w-0 flex-1 flex-col gap-1.5'>
                    <strong className='text-base font-semibold wrap-anywhere'>
                      {s.name}
                    </strong>
                    <span className='text-xs text-muted'>
                      {s.publisher} / {s.year}
                    </span>
                  </div>
                  <ArrowUpRight size={20} className='shrink-0' />
                </a>
              ))}
            </div>
          </section>
          {related.length > 0 && (
            <section className={sectionClass}>
              <h2 className={headingClass}>Related claims.</h2>
              <div className='reader-related'>
                {related.map((r) => (
                  <Link
                    className={`${sourceClass} font-bold`}
                    key={r.slug}
                    href={`/claims/${r.slug}/`}
                  >
                    {r.title}
                    <ArrowUpRight size={18} className='shrink-0' />
                  </Link>
                ))}
              </div>
            </section>
          )}
          <Link
            className='reader-next mt-5 flex items-center justify-between gap-3 border border-ink bg-orange p-5.5 text-[19px] leading-tight font-bold tracking-[-.04em] text-ink hover:bg-mint min-[641px]:text-[22px]'
            href={`/claims/${next.slug}/`}
          >
            <span>
              <small className='mb-2 block text-[11px] tracking-normal uppercase'>
                Next in the index
              </small>
              {next.title}
            </span>
            <ArrowRight size={30} className='shrink-0' />
          </Link>
        </div>
      </div>
    </div>
  );
}
