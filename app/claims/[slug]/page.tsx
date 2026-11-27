import { CopyResponse, SaveButton, VerdictTag } from "@/components/library";
import { claimBySlug, claims } from "@/lib/claims";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <div className='reader'>
      <div className='reader-bar'>
        <Link href='/#library' className='back-link'>
          <ArrowLeft size={18} /> Back to index
        </Link>
        <span>
          {c.topic} / {String(index + 1).padStart(2, "0")}
        </span>
        <SaveButton claim={c} />
      </div>
      <div className='reader-columns'>
        <aside className='reader-claim'>
          <div className='reader-claim-inner'>
            <div className='reader-label'>
              <span>01 / The claim</span>
            </div>
            <h1>{c.title}</h1>
            <VerdictTag verdict={c.verdict} />
            <div className='reader-left-detail'>
              <h2>Where it appears</h2>
              <p>{c.context}</p>
              <h2>What the framing leaves out</h2>
              <p>{c.statisticTrap}</p>
            </div>
            <div className='reader-question'>
              <span className='edition-meta'>A question to examine</span>
              <p>{c.question}</p>
            </div>
          </div>
        </aside>
        <div className='reader-evidence'>
          <div className='reader-label'>
            <span>02 / The evidence</span>
          </div>
          <nav className='reader-nav' aria-label='On this page'>
            <a href='#assessment'>Context</a>
            <a href='#evidence'>Evidence</a>
            <a href='#response'>Response</a>
            <a href='#sources'>Sources</a>
          </nav>
          <section className='reader-section reader-opening' id='assessment'>
            <h2>
              What the evidence says<span>.</span>
            </h2>
            <p>{c.assessment}</p>
          </section>
          <section className='reader-section' id='evidence'>
            <span className='edition-meta'>The numbers &amp; findings</span>
            <div className='reader-facts'>
              {c.evidence.map((e, i) => (
                <article className='reader-fact' key={i}>
                  <span className='edition-meta'>0{i + 1} / Finding</span>
                  <strong>{e.value}</strong>
                  <h3>{e.label}</h3>
                  <p>{e.detail}</p>
                  <a href={`#source-${e.source + 1}`}>
                    {c.sources[e.source].publisher} <ArrowUpRight size={15} />
                  </a>
                </article>
              ))}
            </div>
          </section>
          <section className='reader-section' id='response'>
            <span className='edition-meta'>Putting it into words</span>
            <div className='reader-response'>
              <h2>A possible response.</h2>
              <p>{c.response}</p>
              <CopyResponse text={response} />
            </div>
            <div className='reader-caveat'>
              <BookOpen size={21} />
              <div>
                <h3>What this does not prove</h3>
                <p>{c.caveat}</p>
              </div>
            </div>
          </section>
          <section className='reader-section' id='sources'>
            <h2>Original sources.</h2>
            <div className='source-list'>
              {c.sources.map((s, i) => (
                <a
                  id={`source-${i + 1}`}
                  key={s.url}
                  href={s.url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='source-index'>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong>{s.name}</strong>
                    <span>
                      {s.publisher} / {s.year}
                    </span>
                  </div>
                  <ArrowUpRight size={20} />
                </a>
              ))}
            </div>
          </section>
          {related.length > 0 && (
            <section className='reader-section'>
              <h2>Related claims.</h2>
              <div className='reader-related'>
                {related.map((r) => (
                  <Link key={r.slug} href={`/claims/${r.slug}/`}>
                    {r.title}
                    <ArrowUpRight size={18} />
                  </Link>
                ))}
              </div>
            </section>
          )}
          <Link className='reader-next' href={`/claims/${next.slug}/`}>
            <span>
              <small>Next in the index</small>
              {next.title}
            </span>
            <ArrowRight size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
}
