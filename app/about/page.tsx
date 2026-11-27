import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
export const metadata = { title: "Methodology" };
export default function About() {
  return (
    <div className='shell about'>
      <div className='eyebrow'>
        <span className='signal' /> Our editorial standards
      </div>
      <h1>
        Evidence comes
        <br />
        first<span>.</span>
      </h1>
      <p className='about-lede'>
        Unrhetoric is an independent reference prototype focused on claims
        common in U.S. conservative political discourse. The same evidentiary
        standard applies to claims from any political position.
      </p>
      <div className='standards'>
        {[
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
        ].map(([n, t, p]) => (
          <article key={n}>
            <span className='mono'>{n} /</span>
            <div>
              <h2>{t}</h2>
              <p>{p}</p>
            </div>
          </article>
        ))}
      </div>
      <Link className='primary-button' href='/#library'>
        Explore the library <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}
