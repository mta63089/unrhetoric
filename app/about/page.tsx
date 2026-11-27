import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Methodology" };
const standards = [
  [
    "01",
    "State the actual claim",
    "We distinguish illustrative paraphrases from attributed statements. Illustrative wording is not a quotation or evidence that a particular person said it.",
  ],
  [
    "02",
    "Use traceable evidence",
    "Dossiers link to original government reports, peer-reviewed studies, and identifiable research organizations. Advocacy sources are identified where relevant. Dates and populations matter.",
  ],
  [
    "03",
    "Distinguish fact and judgment",
    "Unsupported means the stated empirical conclusion is not established by the evidence presented. Misleading means a framing omits important context. Needs context means the claim is incomplete or depends on definitions. Value judgment is a normative position not resolvable through statistics alone.",
  ],
  [
    "04",
    "Show the limits",
    "A counterargument should acknowledge legitimate tradeoffs and uncertainties. A projection is not an observation. A correlation is not automatically causal.",
  ],
  [
    "05",
    "Keep claims maintainable",
    "This initial static edition is a research starting point, not a comprehensive or independently peer-reviewed fact-checking service. Sources and claims require ongoing editorial review before public use.",
  ],
];
export default function About() {
  return (
    <div className='mx-auto w-[calc(100%-32px)] max-w-237.5 pt-11.25 pb-17.5 min-[641px]:w-[calc(100%-64px)] min-[641px]:pt-18.75 min-[641px]:pb-25'>
      <div className='flex items-center gap-2 text-xs font-semibold text-muted'>
        <span className='size-2 rounded-full bg-accent' /> Our editorial
        standards
      </div>
      <h1 className='my-7.5 text-[clamp(53px,8.5vw,112px)] leading-[.97] font-extrabold tracking-[-.08em] text-accent'>
        Evidence comes
        <br />
        first<span className='text-ink'>.</span>
      </h1>
      <p className='max-w-212.5 text-[19px] leading-relaxed text-muted min-[641px]:text-[23px]'>
        Unrhetoric is an independent reference prototype focused on claims
        common in U.S. conservative political discourse. The same evidentiary
        standard applies to claims from any political position.
      </p>
      <div className='standards my-10'>
        {standards.map(([n, t, p]) => (
          <article
            key={n}
            className='grid grid-cols-[32px_1fr] gap-2.5 border-t border-line py-6 min-[641px]:grid-cols-[50px_1fr] min-[641px]:gap-5'
          >
            <span className='text-xs font-semibold text-accent'>{n} /</span>
            <div>
              <h2 className='mb-2.5 text-[25px] font-bold tracking-tight'>
                {t}
              </h2>
              <p className='leading-relaxed text-muted'>{p}</p>
            </div>
          </article>
        ))}
      </div>
      <Link
        href='/#library'
        className='inline-flex min-h-11 items-center justify-center gap-2.5 rounded-md bg-yellow px-4 py-3 text-sm font-bold text-ink transition-colors hover:bg-pink'
      >
        Explore the library <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}
