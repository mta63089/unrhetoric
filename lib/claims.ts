export const topics = [
  "Economy & labor",
  "Tax & spending",
  "Immigration",
  "Healthcare",
  "Climate & energy",
  "Crime & justice",
  "Elections",
  "Social policy",
  "Media literacy",
] as const;
export type Topic = (typeof topics)[number];
export type Verdict =
  | "Unsupported"
  | "Misleading"
  | "Needs context"
  | "Value judgment";
export type Source = {
  name: string;
  publisher: string;
  year: string;
  url: string;
};
export type Claim = {
  slug: string;
  topic: Topic;
  title: string;
  verdict: Verdict;
  context: string;
  statisticTrap: string;
  assessment: string;
  response: string;
  caveat: string;
  question: string;
  evidence: { value: string; label: string; detail: string; source: number }[];
  sources: Source[];
  keywords: string[];
};
const s = (
  name: string,
  publisher: string,
  year: string,
  url: string,
): Source => ({ name, publisher, year, url });
const refs = {
  fraud: s(
    "Improper payments: key concepts",
    "Government Accountability Office",
    "2024",
    "https://www.gao.gov/products/gao-24-107482",
  ),
  oecd: s(
    "Health at a Glance 2025: United States",
    "OECD",
    "2025",
    "https://www.oecd.org/en/publications/health-at-a-glance-2025_15a55280-en/united-states_3517f35e-en.html",
  ),
  insurance: s(
    "Health insurance coverage in the United States: 2023",
    "U.S. Census Bureau",
    "2024",
    "https://www.census.gov/library/publications/2024/demo/p60-284.html",
  ),
  gender: s(
    "The enduring grip of the gender pay gap",
    "Pew Research Center",
    "2023",
    "https://www.pewresearch.org/social-trends/2023/03/01/the-enduring-grip-of-the-gender-pay-gap/",
  ),
  irs: s(
    "Federal income tax rates and brackets",
    "Internal Revenue Service",
    "Reference",
    "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets",
  ),
  inflation: s(
    "The inflation rate is falling, but prices are not",
    "Federal Reserve Bank of St. Louis",
    "2024",
    "https://www.stlouisfed.org/publications/page-one-economics/2024/03/01/the-inflation-rate-is-falling-but-prices-are-not",
  ),
  wealth: s(
    "Distributional Financial Accounts",
    "Federal Reserve",
    "Quarterly data",
    "https://www.federalreserve.gov/releases/z1/dataviz/dfa/",
  ),
  deficit: s(
    "Monthly budget review: FY2024 summary",
    "Congressional Budget Office",
    "2024",
    "https://www.cbo.gov/publication/60843/html",
  ),
  tariffClaim: s(
    "Recapping tariff claims by Donald Trump",
    "FactCheck.org",
    "2025",
    "https://www.factcheck.org/2025/08/recapping-trumps-deceptive-tariff-claims/",
  ),
  coldClaim: s(
    "Existence of climate change questioned by President Trump",
    "Columbia University Sabin Center",
    "2019",
    "https://climate.law.columbia.edu/content/existence-climate-change-questioned-president-trump",
  ),
  crimeClaim: s(
    "Donald Trump’s closing arguments",
    "FactCheck.org",
    "2024",
    "https://www.factcheck.org/2024/10/donald-trumps-closing-arguments/",
  ),
  climateClaim: s(
    "Trump misrepresents climate change scenarios",
    "FactCheck.org",
    "2026",
    "https://www.factcheck.org/2026/06/trump-misrepresents-climate-change-scenarios/",
  ),

  wages: s(
    "The compensation-productivity gap",
    "Bureau of Labor Statistics",
    "2011",
    "https://www.bls.gov/opub/ted/2011/ted_20110224.htm",
  ),
  epi: s(
    "Understanding the historic divergence between productivity and a typical worker’s pay",
    "Economic Policy Institute (labor-oriented research)",
    "2015",
    "https://www.epi.org/publication/understanding-the-historic-divergence-between-productivity-and-a-typical-workers-pay-why-it-matters-and-why-its-real/",
  ),
  wage: s(
    "Budgetary effects of the Raise the Wage Act of 2021",
    "Congressional Budget Office",
    "2021",
    "https://www.cbo.gov/publication/56975",
  ),
  paul: s(
    "Paul distorts CBO estimate on impact of $15 minimum wage",
    "FactCheck.org",
    "2021",
    "https://www.factcheck.org/2021/01/paul-distorts-cbos-estimate-on-impact-of-15-minimum-wage/",
  ),
  tariff: s(
    "Effects of Section 232 and 301 tariffs",
    "U.S. International Trade Commission",
    "2023",
    "https://www.usitc.gov/press_room/news_release/2023/er0315_63679.htm",
  ),
  tax: s(
    "Distribution of household income, 2023",
    "Congressional Budget Office",
    "2026",
    "https://www.cbo.gov/publication/62792",
  ),
  immigration: s(
    "Effects of the immigration surge on the federal budget and the economy",
    "Congressional Budget Office",
    "2024",
    "https://www.cbo.gov/publication/60569",
  ),
  arrests: s(
    "Comparing crime rates by immigration status in Texas",
    "Light, He & Robey / PNAS",
    "2020",
    "https://doi.org/10.1073/pnas.2014704117",
  ),
  wisconsin: s(
    "Undocumented immigrants and felony arrest rates",
    "University of Wisconsin–Madison",
    "2020",
    "https://news.wisc.edu/undocumented-immigrants-far-less-likely-to-commit-crimes-in-u-s-than-citizens/",
  ),
  health: s(
    "How does health spending in the U.S. compare to other countries?",
    "KFF",
    "2026",
    "https://www.kff.org/health-costs/health-spending-in-the-u-s-as-compared-to-other-countries-slideshow/",
  ),
  healthCosts: s(
    "What drives U.S. health spending compared to other countries",
    "KFF",
    "2024",
    "https://www.kff.org/health-costs/what-drives-health-spending-in-the-u-s-compared-to-other-countries/",
  ),
  climate: s(
    "Climate change: physical science basis, summary for policymakers",
    "IPCC",
    "2021",
    "https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/",
  ),
  nasa: s(
    "Scientific consensus on climate change",
    "NASA",
    "Reference",
    "https://science.nasa.gov/climate-change/scientific-consensus/",
  ),
  ev: s(
    "Electric vehicle myths",
    "Environmental Protection Agency",
    "Reference",
    "https://www.epa.gov/greenvehicles/electric-vehicle-myths",
  ),
  crime: s(
    "Crime known to law enforcement, 2024",
    "Bureau of Justice Statistics",
    "2026",
    "https://bjs.ojp.gov/library/publications/crime-known-law-enforcement-2024",
  ),
  fbi: s(
    "Violent crime falls at historic rate",
    "FBI",
    "2026",
    "https://www.fbi.gov/news/stories/violent-crime-falls-at-historic-rate-new-fbi-data-show",
  ),
  heritage: s(
    "About the election fraud database",
    "Heritage Foundation (conservative advocacy)",
    "Reference",
    "https://www.heritage.org/article/about-the-election-fraud-database",
  ),
  brennan: s(
    "Heritage fraud database: an assessment",
    "Brennan Center for Justice",
    "2017",
    "https://www.brennancenter.org/our-work/research-reports/heritage-fraud-database-assessment",
  ),
  election: s(
    "Securing democracy: election infrastructure and voter confidence",
    "U.S. House hearing record",
    "2022",
    "https://www.govinfo.gov/content/pkg/CHRG-117hhrg47316/html/CHRG-117hhrg47316.htm",
  ),
  snap: s(
    "Characteristics of SNAP households, FY 2023",
    "USDA",
    "FY 2023",
    "https://www.fns.usda.gov/research/snap/characteristics-fy23",
  ),
  poverty: s(
    "Poverty in the United States: 2022",
    "U.S. Census Bureau",
    "2023",
    "https://www.census.gov/library/publications/2023/demo/p60-280.html",
  ),
  relief: s(
    "Poverty measure increased when pandemic relief ended",
    "U.S. Census Bureau",
    "2023",
    "https://www.census.gov/library/stories/2023/09/supplemental-poverty-measure.html",
  ),
  aid: s(
    "What is U.S. foreign aid?",
    "Council on Foreign Relations",
    "2025",
    "https://www.cfr.org/education/learn/reading/what-us-foreign-aid",
  ),
  social: s(
    "2026 Trustees Report summary",
    "Social Security Administration",
    "2026",
    "https://www.ssa.gov/oact/trsum/",
  ),
  social25: s(
    "2025 trustees projections",
    "Social Security Administration",
    "2025",
    "https://www.ssa.gov/news/en/press/releases/2025-06-18.html",
  ),
  income: s(
    "Distribution of household income in 2021",
    "Congressional Budget Office",
    "2024",
    "https://www.cbo.gov/publication/60341",
  ),
};
const e = (value: string, label: string, detail: string, source = 0) => ({
  value,
  label,
  detail,
  source,
});
export const claims: Claim[] = [
  {
    slug: "technology-versus-affordability",
    topic: "Economy & labor",
    title: "People have smartphones, so workers are better off than ever.",
    verdict: "Needs context",
    context:
      "Illustrative argument in debates about living standards: access to modern conveniences is used to dismiss concerns about rent, wages and economic security.",
    statisticTrap:
      "A comparison of consumer electronics across centuries says little about housing costs relative to earnings. Different dimensions of welfare are being conflated.",
    assessment:
      "Technological progress and economic insecurity can coexist. A meaningful comparison includes inflation-adjusted wages, essential costs, working hours, wealth and access to services.",
    response:
      "Compare like with like: track what a typical hour of work buys, alongside improvements in technology. One trend cannot settle the other.",
    caveat:
      "Many material conditions have genuinely improved over time; affordability trends also differ across goods, regions and households.",
    question:
      "Which measure of living standards are we comparing, and over what period?",
    evidence: [
      e(
        "1973",
        "A change in growth patterns",
        "BLS identifies a slowdown in productivity and real compensation growth after 1973.",
      ),
      e(
        "42.5%",
        "Average compensation growth",
        "EPI estimates growth in average hourly compensation during 1973–2014; typical-worker measures grew less.",
        1,
      ),
    ],
    sources: [refs.wages, refs.epi],
    keywords: [
      "phones",
      "medieval",
      "cost of living",
      "working class",
      "housing",
    ],
  },
  {
    slug: "minimum-wage-jobs",
    topic: "Economy & labor",
    title: "Raising the minimum wage only destroys jobs.",
    verdict: "Misleading",
    context:
      "Senator Rand Paul cited a CBO employment estimate during the 2021 minimum-wage debate; FactCheck.org examined the way he characterized that projection.",
    statisticTrap:
      "A projected loss of jobs is presented without the projected wage gains or changes in poverty.",
    assessment:
      "Minimum wage changes can increase pay and reduce employment at the same time. Magnitudes depend on the level, location and labor market. The 2021 CBO model projected both benefits and costs.",
    response:
      "Evaluate the projected changes in earnings, employment and poverty together rather than treating any single outcome as the entire policy impact.",
    caveat:
      "CBO modeled a particular proposal, not an observed result. Estimates are uncertain and cannot be transferred to every wage increase.",
    question:
      "Which increase, which labor market and what effect on total earnings?",
    evidence: [
      e(
        "1.4M",
        "Projected employment reduction",
        "CBO central estimate in 2025 under the 2021 proposal.",
      ),
      e(
        "900K",
        "Projected fewer people in poverty",
        "Same proposal and model.",
      ),
      e(
        "17M",
        "Directly affected workers",
        "Workers expected to earn below the proposed minimum absent the policy.",
        1,
      ),
    ],
    sources: [refs.wage, refs.paul],
    keywords: ["$15", "jobs", "Rand Paul", "wages"],
  },
  {
    slug: "foreign-tariffs",
    topic: "Economy & labor",
    title: "Foreign countries pay American tariffs.",
    verdict: "Misleading",
    context:
      "Donald Trump repeatedly suggested that other countries pay U.S. tariffs; FactCheck.org documented examples in its August 2025 review. The title is a paraphrase.",
    statisticTrap:
      "Revenue collected by customs is treated as foreign money without examining the importer or price changes.",
    assessment:
      "U.S. importers remit duties. The economic cost may be shared across importers, consumers and foreign producers; a USITC analysis found importers absorbed nearly the entire direct cost of the tariffs it studied.",
    response:
      "Distinguish who remits the tariff from who ultimately bears the cost. Compare import prices and downstream effects.",
    caveat:
      "Tariffs can support selected domestic producers; results for one tariff regime do not establish the burden of every tariff.",
    question: "Who paid the duty and how did prices and margins change?",
    evidence: [
      e(
        "Nearly all",
        "Direct tariff cost borne by U.S. importers",
        "USITC retrospective examination of Section 232 and 301 tariffs active in March 2022.",
      ),
    ],
    sources: [refs.tariff, refs.tariffClaim],
    keywords: ["trade", "China", "import tax", "prices"],
  },
  {
    slug: "productivity-wages",
    topic: "Economy & labor",
    title: "Workers automatically get paid more as productivity rises.",
    verdict: "Unsupported",
    context:
      "Illustrative market-efficiency argument that equates greater economic output with proportional pay gains for every worker.",
    statisticTrap:
      "Average compensation is used as though it were median compensation, and total output is confused with the distribution of income.",
    assessment:
      "Productivity raises the potential for compensation but does not guarantee that gains reach typical workers proportionately. Bargaining, benefits, price measures and income distribution matter.",
    response:
      "Use matched definitions of productivity and compensation, and distinguish average pay from typical-worker pay.",
    caveat:
      "The size of the gap depends on the measures and deflators chosen; it is not evidence of a single cause.",
    question: "Are we looking at median wages or average total compensation?",
    evidence: [
      e(
        "1973",
        "Historical turning point",
        "BLS identifies changed growth patterns after 1973.",
      ),
      e(
        "42.5%",
        "Average real compensation growth",
        "EPI calculation for 1973–2014, distinct from median compensation.",
        1,
      ),
    ],
    sources: [refs.wages, refs.epi],
    keywords: ["pay gap", "capitalism", "productivity"],
  },
  {
    slug: "rich-pay-all-taxes",
    topic: "Tax & spending",
    title:
      "High earners pay most federal taxes, so the tax system is unfair to them.",
    verdict: "Needs context",
    context:
      "Illustrative claim in debates over progressive taxation; a tax-share figure is used to settle a normative question about fairness.",
    statisticTrap:
      "The share of taxes paid is reported without the share of income earned or the effective tax rate. Federal taxes are also not all taxes.",
    assessment:
      "Tax shares reflect both rates and the distribution of taxable income. Fairness also depends on ability to pay, benefits received and the chosen principles of taxation.",
    response:
      "Compare income shares and effective tax rates across income groups. Then distinguish the empirical results from the fairness judgment.",
    caveat:
      "A progressive federal tax system does collect a larger share from high earners; state, local and payroll taxes can have different distributions.",
    question:
      "Are we discussing tax shares, effective rates or a moral principle?",
    evidence: [
      e(
        "70%",
        "Federal tax share of highest income quintile",
        "CBO estimate for 2023; the same share was 55% in 1979.",
      ),
    ],
    sources: [refs.tax],
    keywords: ["billionaires", "income tax", "wealth", "top 1 percent"],
  },
  {
    slug: "foreign-aid-budget",
    topic: "Tax & spending",
    title: "Ending foreign aid would solve the federal budget deficit.",
    verdict: "Unsupported",
    context:
      "Illustrative budget-cutting argument that portrays international assistance as a dominant federal expense.",
    statisticTrap:
      "Large dollar amounts are given without dividing by total federal outlays.",
    assessment:
      "Foreign aid is a small fraction of the federal budget. Its elimination cannot on its own resolve a large structural deficit. Evaluate particular programs on cost, effectiveness and strategic impact.",
    response:
      "Put the proposed savings beside the total deficit for the same fiscal year, rather than judging a large number in isolation.",
    caveat:
      "Definitions of aid and exceptional emergency appropriations change its share; spending effectiveness remains a legitimate question.",
    question:
      "What share of the deficit would the proposed cut actually eliminate?",
    evidence: [
      e(
        "~1%",
        "Typical share of U.S. federal budget",
        "CFR overview; varies by year and definition.",
      ),
      e(
        "$1.8T",
        "Federal deficit, FY2024",
        "CBO budget summary; this is a historical deficit, not a current aid estimate.",
        1,
      ),
    ],
    sources: [refs.aid, refs.deficit],
    keywords: ["USAID", "foreign spending", "deficit", "budget"],
  },
  {
    slug: "social-security-bankrupt",
    topic: "Tax & spending",
    title: "Social Security will go bankrupt and pay nothing.",
    verdict: "Misleading",
    context:
      "Illustrative argument in retirement and entitlement reform debates, often using the projected trust-fund depletion date.",
    statisticTrap:
      "The exhaustion of reserves is equated with the end of incoming payroll tax revenue.",
    assessment:
      "Trust fund depletion would produce a significant financing shortfall, not zero revenue. Continuing dedicated taxes would fund a portion of scheduled benefits absent legislative action.",
    response:
      "Separate reserves, ongoing income and scheduled benefits when describing the shortfall.",
    caveat:
      "The shortfall is real. Future benefits depend on law, economic assumptions and potential congressional reforms.",
    question:
      "Are we discussing depleted reserves or a complete absence of revenue?",
    evidence: [
      e(
        "2034",
        "Combined reserve depletion projection",
        "2026 trustees report, hypothetical combined OASDI funds.",
      ),
      e(
        "77%",
        "OASI benefits payable at depletion",
        "2025 report projection for OASI in 2033, not the combined fund.",
        1,
      ),
    ],
    sources: [refs.social, refs.social25],
    keywords: ["retirement", "entitlements", "solvency", "trust fund"],
  },
  {
    slug: "immigrants-crime",
    topic: "Immigration",
    title: "Undocumented immigrants commit more violent crime than citizens.",
    verdict: "Unsupported",
    context:
      "Illustrative claim in border-security and deportation debates, often made by generalizing from individual criminal cases.",
    statisticTrap:
      "Counts of arrests or individual incidents are presented without a population denominator; immigration offenses may be mixed with violent offenses.",
    assessment:
      "A study of Texas arrest data from 2012–2018 found lower felony arrest rates for undocumented immigrants than for U.S.-born citizens. Individual crimes do not establish a higher group rate.",
    response:
      "Compare the same offense categories per capita, using reliable population estimates. Do not infer a population trend from an individual case.",
    caveat:
      "Arrests are not convictions or all crimes; Texas in this period is not a definitive national estimate.",
    question:
      "What is the per-capita rate for comparable offenses and populations?",
    evidence: [
      e(
        "2×",
        "Violent felony arrest rate",
        "U.S.-born citizens relative to undocumented immigrants in Texas, 2012–2018.",
        1,
      ),
      e("4×+", "Property felony arrest rate", "Same comparison and period.", 1),
    ],
    sources: [refs.arrests, refs.wisconsin],
    keywords: ["illegal immigration", "migrants", "border", "crime"],
  },
  {
    slug: "immigration-jobs-fixed",
    topic: "Immigration",
    title: "Every immigrant worker takes a job from an American.",
    verdict: "Unsupported",
    context:
      "Illustrative labor-market argument that assumes an economy has a fixed number of jobs.",
    statisticTrap:
      "New labor supply is counted without considering new demand, business formation, investment or production.",
    assessment:
      "Immigration increases both labor supply and demand. CBO projects increased output from the recent surge, while identifying some near-term wage pressure for less-educated workers.",
    response:
      "Examine employment and wages by occupation, location and education rather than assuming a one-for-one displacement.",
    caveat:
      "Competition can be concentrated in particular occupations and regions. Aggregate gains do not guarantee gains for every worker.",
    question:
      "What evidence demonstrates displacement in the specific labor market?",
    evidence: [
      e(
        "2024–34",
        "CBO modeling horizon",
        "The 2024 analysis estimates increased economic output over its projection period.",
      ),
    ],
    sources: [refs.immigration],
    keywords: ["jobs", "wages", "migrants", "labor supply"],
  },
  {
    slug: "immigration-fiscal",
    topic: "Immigration",
    title: "Immigration is always a net cost to taxpayers.",
    verdict: "Misleading",
    context:
      "Illustrative fiscal claim that focuses on government services used by immigrants.",
    statisticTrap:
      "Service expenditures are counted but taxes and broader economic effects are omitted, or local costs are compared with federal revenues.",
    assessment:
      "Fiscal impacts depend on age, legal status, earnings, location and the level of government. CBO modeled a federal deficit reduction from the immigration surge alongside spending pressures.",
    response:
      "Compare revenues and expenditures at the same level of government and over the same time horizon.",
    caveat:
      "State and local governments may face real short-run costs even when the federal budget improves.",
    question: "Federal, state or local budget—and over how many years?",
    evidence: [
      e(
        "2024–34",
        "Federal projection period",
        "CBO projected lower federal deficits in its immigration surge scenario.",
      ),
    ],
    sources: [refs.immigration],
    keywords: ["taxpayers", "benefits", "public services", "deficit"],
  },
  {
    slug: "universal-healthcare-cost",
    topic: "Healthcare",
    title:
      "Universal healthcare necessarily costs more than private healthcare.",
    verdict: "Unsupported",
    context:
      "Illustrative argument against universal coverage that compares a proposed government budget with current public spending alone.",
    statisticTrap:
      "Public spending is compared without private premiums, employer contributions and out-of-pocket spending.",
    assessment:
      "The relevant comparison is total spending and outcomes. The United States already spends more per person than comparable affluent countries, many of which provide universal coverage using different models.",
    response:
      "Compare total per-person costs, coverage and outcomes rather than only the government budget.",
    caveat:
      "Universal coverage is not synonymous with single payer. A U.S. transition would have administrative, financing and capacity tradeoffs.",
    question: "Are premiums and out-of-pocket costs included in both systems?",
    evidence: [
      e(
        "$5,683",
        "Additional spending per person",
        "Difference between the U.S. and comparable wealthy countries in KFF’s 2024 analysis.",
        1,
      ),
    ],
    sources: [refs.health, refs.healthCosts],
    keywords: ["Medicare for all", "single payer", "insurance", "premiums"],
  },
  {
    slug: "healthcare-tax",
    topic: "Healthcare",
    title: "A healthcare tax increase means everyone pays more for healthcare.",
    verdict: "Misleading",
    context: "Illustrative argument during public-insurance financing debates.",
    statisticTrap:
      "The new tax is added to household costs while any premiums and cost sharing replaced by the plan are ignored.",
    assessment:
      "A tax increase and a decrease in private health expenses can occur simultaneously. Net household effects require a specific financing and benefits proposal.",
    response:
      "Calculate taxes plus premiums plus out-of-pocket expenses before and after the actual proposal.",
    caveat:
      "Some households could pay more and others less. No particular tax schedule or savings estimate follows from international comparisons.",
    question:
      "What existing costs would be replaced, and who pays the new tax?",
    evidence: [
      e(
        "$5,683",
        "U.S. spending difference per person",
        "KFF international comparison; not a forecast of household savings.",
      ),
    ],
    sources: [refs.healthCosts],
    keywords: ["taxes", "Vermont", "single payer", "premium"],
  },
  {
    slug: "climate-natural-cycles",
    topic: "Climate & energy",
    title: "The climate has always changed, so humans are not causing warming.",
    verdict: "Unsupported",
    context:
      "Illustrative climate-skeptic argument that treats earlier natural changes as an explanation for current warming.",
    statisticTrap:
      "A historical natural change is cited without measuring the causes and timing of present changes.",
    assessment:
      "Past natural climate changes are well established; that does not exclude a human cause today. Physical observations and attribution studies identify human greenhouse gas emissions as the main driver of recent global warming.",
    response:
      "Identify the proposed natural mechanism and test whether it reproduces current observations as well as greenhouse-gas forcing does.",
    caveat:
      "Natural variation still influences particular years and locations; attribution of individual events has uncertainty.",
    question: "Which measured forcing explains the observed warming pattern?",
    evidence: [
      e(
        "AR6",
        "Physical science assessment",
        "IPCC’s 2021 assessment finds human influence responsible for warming atmosphere, ocean and land.",
      ),
    ],
    sources: [refs.climate, refs.nasa],
    keywords: ["global warming", "CO2", "natural cycles"],
  },
  {
    slug: "cold-weather-climate",
    topic: "Climate & energy",
    title: "A cold winter proves global warming is fake.",
    verdict: "Unsupported",
    context:
      "Columbia University’s Sabin Center documented a January 28, 2019 Trump tweet suggesting cold U.S. weather disproves climate change. The title is illustrative, not a verbatim quote.",
    statisticTrap:
      "A single place and short period are substituted for a long-term global distribution.",
    assessment:
      "Weather describes short-term conditions; climate describes long-term patterns. Cold extremes remain possible in a warming climate.",
    response:
      "Use multi-decade global measurements to assess global warming, not one weather event.",
    caveat:
      "Regional weather trends can differ; specific extremes need separate attribution analysis.",
    question: "What is the geographic area and averaging period of the data?",
    evidence: [
      e(
        "Decades",
        "Relevant climate time scale",
        "IPCC evaluates long-term observed changes rather than isolated weather.",
      ),
    ],
    sources: [refs.climate, refs.coldClaim],
    keywords: ["snow", "weather", "winter"],
  },
  {
    slug: "ev-emissions",
    topic: "Climate & energy",
    title: "Electric vehicles are worse for the climate than gasoline cars.",
    verdict: "Misleading",
    context:
      "Illustrative argument focusing on battery manufacturing and power plants.",
    statisticTrap:
      "Manufacturing emissions are counted for EVs but fuel production and lifetime driving emissions are not counted consistently for gasoline vehicles.",
    assessment:
      "EPA finds lifetime greenhouse-gas emissions from typical EVs are generally lower, even accounting for manufacture. Grid mix, vehicle size and driving patterns affect the comparison.",
    response:
      "Compare full life-cycle emissions for comparable vehicles using the local electricity mix.",
    caveat:
      "Mining and manufacturing have real impacts; unusually carbon-intensive electricity and vehicle choices can change results.",
    question:
      "Is the comparison cradle-to-grave, and what grid mix is assumed?",
    evidence: [
      e(
        "Life cycle",
        "The relevant comparison",
        "EPA includes battery production and operating emissions in its assessment.",
      ),
    ],
    sources: [refs.ev],
    keywords: ["electric cars", "battery", "coal", "Tesla"],
  },
  {
    slug: "crime-record-high",
    topic: "Crime & justice",
    title: "Violent crime is constantly rising nationwide.",
    verdict: "Unsupported",
    context:
      "Illustrative law-and-order argument that generalizes from viral incidents or a selected local trend.",
    statisticTrap:
      "A spike in one city or one year is presented as a continuing national pattern.",
    assessment:
      "National reported violent crime has fallen in recent FBI and BJS data. Local trends may diverge, and victimization surveys can differ from police data.",
    response:
      "Specify the jurisdiction, offense, time period and rate; compare national and local trends separately.",
    caveat:
      "Declining crime is compatible with serious ongoing harm. Police reporting and survey measures are not identical.",
    question: "Which crime type, which geography and which data series?",
    evidence: [
      e(
        "−9.3%",
        "2025 national violent crime rate change",
        "FBI estimate from 2024 to 2025.",
        1,
      ),
      e(
        "370.8",
        "Violent offenses per 100,000",
        "BJS 2024 estimate, down from 393.9 in 2023.",
      ),
    ],
    sources: [refs.crime, refs.fbi],
    keywords: ["crime wave", "murder", "cities", "law and order"],
  },
  {
    slug: "crime-count-rate",
    topic: "Crime & justice",
    title: "A city with more recorded crimes must be more dangerous.",
    verdict: "Misleading",
    context:
      "Illustrative comparison of cities by total offenses without population size.",
    statisticTrap:
      "Raw counts conceal differences in the number of residents and people present.",
    assessment:
      "Rates per population are more informative than counts when comparing risk. Neighborhood, exposure, crime type and reporting still matter.",
    response:
      "Convert counts to rates using comparable populations and the same offense definitions.",
    caveat:
      "Resident population can understate daytime visitors; a citywide rate does not describe each neighborhood.",
    question:
      "What is the rate per 100,000 and who is included in that denominator?",
    evidence: [
      e(
        "Per 100K",
        "Standardized crime rate",
        "BJS publishes population-standardized offense estimates.",
      ),
    ],
    sources: [refs.crime],
    keywords: ["cities", "Chicago", "crime statistics", "denominator"],
  },
  {
    slug: "voter-fraud-scale",
    topic: "Elections",
    title: "Documented voter fraud cases prove fraud is widespread.",
    verdict: "Misleading",
    context:
      "The Heritage Foundation maintains a conservative election-fraud database; its entries are often invoked in debates over election rules.",
    statisticTrap:
      "A collection of detected cases across jurisdictions and years is treated as a rate without the corresponding number of ballots or consistent categories.",
    assessment:
      "Documented fraud exists and warrants investigation, but a list alone cannot establish prevalence or prove an election outcome changed. Use verified cases, scope and denominators.",
    response:
      "Separate proven offenses from allegations, and compare verified ballots affected with the relevant election margin.",
    caveat:
      "The database is explicitly a sampling, not an exhaustive count. Low detected prevalence does not prove no undetected fraud.",
    question:
      "How many verified ballots in the specific election were affected?",
    evidence: [
      e(
        "Sampling",
        "Heritage describes its own database",
        "Its methodology describes selected proven cases, not a prevalence estimate.",
      ),
      e(
        "2017",
        "Independent database assessment",
        "Brennan Center reviews the composition and interpretation of a historical version.",
        1,
      ),
    ],
    sources: [refs.heritage, refs.brennan],
    keywords: ["voter ID", "ballots", "fraud", "Heritage"],
  },
  {
    slug: "2020-voting-machines",
    topic: "Elections",
    title: "Voting machines systematically deleted votes in the 2020 election.",
    verdict: "Unsupported",
    context:
      "Illustrative formulation of allegations circulated after the November 2020 U.S. presidential election.",
    statisticTrap:
      "Unverified machine anecdotes or reporting corrections are used as proof of widespread vote alteration.",
    assessment:
      "Election infrastructure officials reported finding no evidence of voting systems deleting or losing votes. An allegation needs corroboration through audits, records and verifiable affected ballots.",
    response:
      "Ask for auditable records showing actual changes to cast ballots, rather than relying on an assertion or transient reporting discrepancy.",
    caveat:
      "Election administration can contain errors and vulnerabilities; specific documented issues still require investigation.",
    question:
      "Which verified audit or paper-ballot comparison demonstrates the claim?",
    evidence: [
      e(
        "Nov. 12, 2020",
        "Election infrastructure statement",
        "The later congressional hearing record reproduces the joint statement finding no evidence of systems deleting or losing votes.",
      ),
    ],
    sources: [refs.election],
    keywords: ["Dominion", "stolen election", "2020", "Trump"],
  },
  {
    slug: "snap-recipients",
    topic: "Social policy",
    title:
      "Food assistance primarily supports people who simply refuse to work.",
    verdict: "Misleading",
    context:
      "Illustrative welfare debate rhetoric depicting the typical recipient as an able-bodied adult avoiding employment.",
    statisticTrap:
      "A household receiving assistance is treated as one unemployed able-bodied adult, ignoring family composition.",
    assessment:
      "Most SNAP households include children, older people or nonelderly disabled people. Household eligibility and labor participation need to be evaluated separately.",
    response:
      "Start with the actual household demographics and employment data instead of a stereotype.",
    caveat:
      "The statistic is about households, not individual work status. Some recipients are subject to work rules, and program design can affect incentives.",
    question:
      "Are you describing recipients, households or adults subject to work requirements?",
    evidence: [
      e(
        "79%",
        "SNAP households with specified members",
        "FY2023 households with a child, elderly person or nonelderly person with a disability.",
      ),
    ],
    sources: [refs.snap],
    keywords: ["food stamps", "welfare", "lazy", "work requirements"],
  },
  {
    slug: "anti-poverty-programs",
    topic: "Social policy",
    title: "Government assistance never reduces poverty.",
    verdict: "Unsupported",
    context:
      "Illustrative argument against welfare and refundable tax credits, often relying on the persistence of poverty as proof of ineffectiveness.",
    statisticTrap:
      "Poverty before transfers is used to measure the effect of transfers, or continued poverty is treated as evidence of zero effect.",
    assessment:
      "The Supplemental Poverty Measure includes taxes and noncash benefits. Census evidence shows large changes in poverty associated with temporary pandemic-era transfers and tax credits.",
    response:
      "Compare poverty with and without the resources provided, and distinguish immediate poverty relief from long-term economic mobility.",
    caveat:
      "Several policies changed at once in 2022; the entire change cannot be attributed to one program.",
    question: "Is poverty being measured before or after transfers and taxes?",
    evidence: [
      e(
        "5.2%",
        "Child supplemental poverty, 2021",
        "Census estimate during expanded pandemic relief.",
      ),
      e(
        "12.4%",
        "Child supplemental poverty, 2022",
        "Census estimate after temporary policies expired.",
      ),
    ],
    sources: [refs.poverty, refs.relief],
    keywords: ["child tax credit", "welfare", "poverty", "benefits"],
  },
  {
    slug: "poverty-unchanged",
    topic: "Social policy",
    title: "The official poverty rate tells us whether tax credits work.",
    verdict: "Misleading",
    context:
      "Illustrative debate about the effects of cash and in-kind assistance.",
    statisticTrap:
      "The official poverty measure generally uses pre-tax cash income, so it excludes important effects of tax credits and noncash benefits.",
    assessment:
      "The official and supplemental measures answer different questions. The latter incorporates taxes, selected benefits and necessary expenses.",
    response:
      "Use the Supplemental Poverty Measure when examining tax credits and noncash assistance, and compare with the official measure where useful.",
    caveat:
      "Both measures involve methodological choices and neither captures every aspect of hardship.",
    question:
      "Does the poverty measure actually include the program being evaluated?",
    evidence: [
      e(
        "2",
        "Census poverty measures",
        "Official poverty and supplemental poverty use different resource definitions.",
      ),
    ],
    sources: [refs.poverty, refs.relief],
    keywords: ["SPM", "census", "child poverty", "tax credits"],
  },
  {
    slug: "anecdote-as-trend",
    topic: "Media literacy",
    title: "A viral video proves an entire population behaves that way.",
    verdict: "Unsupported",
    context:
      "Illustrative reasoning pattern in politically charged social feeds; a striking individual case becomes a generalization.",
    statisticTrap:
      "The selection process and frequency of similar cases are unknown, but the example is presented as representative.",
    assessment:
      "A single documented case establishes that the event occurred, not how common it is. A representative sample or an appropriate rate is needed for prevalence claims.",
    response:
      "Acknowledge the specific event and ask for population-level evidence before drawing a broad conclusion.",
    caveat:
      "Individual cases may reveal real problems and justify investigation; they are not automatically irrelevant.",
    question: "How representative is this example, and how was it selected?",
    evidence: [
      e(
        "1 case",
        "Not a prevalence estimate",
        "Example application: BJS estimates crime rates using population data, not viral incidents.",
      ),
    ],
    sources: [refs.crime],
    keywords: ["anecdote", "viral", "fallacy", "hasty generalization"],
  },
  {
    slug: "correlation-causation",
    topic: "Media literacy",
    title: "Two events happened together, so one must have caused the other.",
    verdict: "Unsupported",
    context:
      "Illustrative argument used across political positions to assign blame or credit based on timing alone.",
    statisticTrap:
      "An outcome before and after a policy is shown without a comparison group, underlying trend or alternative explanations.",
    assessment:
      "Timing can support a causal hypothesis, but confounders and counterfactuals matter. CBO models alternative scenarios when assessing immigration effects.",
    response:
      "Identify plausible competing explanations and compare the observed outcome with an appropriate counterfactual.",
    caveat:
      "Observational evidence can support causal conclusions when the research design is strong; experiments are not always feasible.",
    question: "What would likely have happened without the alleged cause?",
    evidence: [
      e(
        "Counterfactual",
        "A method, not a guarantee",
        "CBO explicitly models an alternative immigration scenario for its 2024 analysis.",
      ),
    ],
    sources: [refs.immigration],
    keywords: ["correlation", "causation", "fallacy", "president", "policy"],
  },
  {
    slug: "tax-share-denominator",
    topic: "Media literacy",
    title: "A larger tax bill proves someone faces a higher tax rate.",
    verdict: "Unsupported",
    context:
      "Illustrative numerical argument in debates over who carries the tax burden.",
    statisticTrap:
      "Dollar amounts are compared without income or taxable base.",
    assessment:
      "An absolute tax bill and an effective tax rate measure different things. A person with greater income may pay more dollars even with a lower rate.",
    response:
      "Divide relevant taxes by a consistent income measure; distinguish marginal from average rates.",
    caveat:
      "Different income definitions, unrealized gains and tax categories can produce different rate estimates.",
    question: "What income base and which taxes are included?",
    evidence: [
      e(
        "70%",
        "Federal tax share of top quintile",
        "CBO 2023 estimate; this is a share of tax payments, not an effective tax rate.",
      ),
    ],
    sources: [refs.tax],
    keywords: ["statistics", "tax rates", "denominator", "wealth"],
  },
  {
    slug: "higher-tax-bracket",
    topic: "Tax & spending",
    title: "A raise can make your entire salary subject to a higher tax rate.",
    verdict: "Unsupported",
    context:
      "Illustrative claim about progressive federal income taxes and the incentive to earn more.",
    statisticTrap:
      "The marginal rate on the last dollar of taxable income is confused with the average rate on all income.",
    assessment:
      "Federal income tax brackets apply to slices of taxable income. Entering a higher bracket does not retroactively tax lower slices at that rate.",
    response:
      "Apply each bracket only to the income within it. Compare total after-tax income rather than multiplying all income by the highest marginal rate.",
    caveat:
      "Benefit phaseouts and credits can create separate effective marginal rates or benefit cliffs. This claim concerns the ordinary federal bracket structure.",
    question:
      "Are you talking about marginal tax rates, effective rates or benefits?",
    evidence: [
      e(
        "Marginal",
        "Tax rate on an additional slice",
        "IRS explains how the higher bracket applies only to the income within it.",
      ),
    ],
    sources: [refs.irs],
    keywords: ["raise", "tax bracket", "income tax", "marginal"],
  },
  {
    slug: "improper-payments-fraud",
    topic: "Tax & spending",
    title: "Every improper government payment is fraud.",
    verdict: "Misleading",
    context:
      "Illustrative argument in debates about waste, fraud and spending cuts.",
    statisticTrap:
      "An improper payment total is relabeled as deliberate theft, even if the estimate includes documentation or processing problems.",
    assessment:
      "GAO distinguishes payments made incorrectly from intentional deception. Improper payments can include administrative errors, underpayments and fraud.",
    response:
      "Ask for separate estimates of proven fraud, overpayments, underpayments and documentation errors before estimating recoverable savings.",
    caveat:
      "Improper payments remain important even when they are not criminal. The available estimates may also miss some fraud.",
    question: "What fraction was actually determined to be intentional fraud?",
    evidence: [
      e(
        "2 concepts",
        "Improper payments and fraud",
        "GAO explains that the categories overlap but are not equivalent.",
      ),
    ],
    sources: [refs.fraud],
    keywords: ["DOGE", "waste", "fraud", "government spending"],
  },
  {
    slug: "inflation-versus-prices",
    topic: "Economy & labor",
    title: "If inflation fell, grocery prices should be back to normal.",
    verdict: "Misleading",
    context:
      "Illustrative argument in economic debates when disinflation is reported but consumers still face high prices.",
    statisticTrap:
      "The rate of price change is confused with the level of prices.",
    assessment:
      "Lower positive inflation means prices are still rising, but at a slower rate. Prices decline in aggregate during deflation. Affordability additionally depends on income.",
    response:
      "Separate the inflation rate from the cumulative price level and compare the latter with wage growth.",
    caveat:
      "Household experience varies by spending mix. Individual prices can fall even as the overall price index rises.",
    question:
      "Are you measuring the price level, its growth rate or purchasing power?",
    evidence: [
      e(
        "8% → 4%",
        "Illustration of disinflation",
        "The St. Louis Fed uses this example: prices keep rising, just more slowly.",
      ),
    ],
    sources: [refs.inflation],
    keywords: ["groceries", "CPI", "prices", "Biden", "cost of living"],
  },
  {
    slug: "wealth-versus-income",
    topic: "Economy & labor",
    title: "Income statistics tell us how wealth is distributed.",
    verdict: "Misleading",
    context:
      "Illustrative claim in inequality debates that treats annual earnings and accumulated ownership as interchangeable.",
    statisticTrap:
      "Annual flows of income are substituted for assets minus debts.",
    assessment:
      "Income and wealth are distinct. Household balance sheets capture accumulated assets and liabilities; annual income measures do not show all such holdings.",
    response:
      "Use wealth distribution data for ownership and income distribution data for annual resources. Compare the appropriate percentile groups.",
    caveat:
      "Wealth estimates are sensitive to asset valuations, survey coverage and household definitions. Neither measure alone captures opportunity.",
    question: "Is the statistic annual income or net worth?",
    evidence: [
      e(
        "5 groups",
        "Wealth percentile breakdown",
        "Federal Reserve Distributional Financial Accounts include the top 0.1%, remainder of top 1%, next 9%, next 40% and bottom half.",
      ),
    ],
    sources: [refs.wealth],
    keywords: ["billionaires", "inequality", "wealth gap", "net worth"],
  },
  {
    slug: "us-health-outcomes",
    topic: "Healthcare",
    title:
      "The U.S. spends the most on healthcare because it has the best outcomes.",
    verdict: "Misleading",
    context:
      "Illustrative defense of the current American healthcare system based on spending and medical innovation.",
    statisticTrap:
      "High spending or particular high-performing hospitals are treated as evidence of superior population-level outcomes.",
    assessment:
      "Higher spending does not automatically translate into better population health. OECD comparisons show U.S. life expectancy below the OECD average, while the U.S. performs well on some individual health indicators.",
    response:
      "Compare specific outcomes, access and spending across comparable populations rather than treating spending as a quality measure.",
    caveat:
      "Life expectancy also reflects socioeconomic, behavioral and other non-healthcare factors. It is not a pure measure of health system quality.",
    question:
      "Which outcomes, which populations and what adjustment for nonmedical factors?",
    evidence: [
      e("78.4 years", "U.S. life expectancy", "OECD Health at a Glance 2025."),
      e(
        "−2.7 years",
        "Relative to OECD average",
        "Difference reported in the same country note.",
      ),
    ],
    sources: [refs.oecd, refs.health],
    keywords: ["best healthcare", "life expectancy", "medical innovation"],
  },
  {
    slug: "private-insurance-alone",
    topic: "Healthcare",
    title:
      "Public health insurance is only a small part of the American system.",
    verdict: "Misleading",
    context:
      "Illustrative characterization of American healthcare as almost entirely privately insured.",
    statisticTrap:
      "The private coverage share is reported without the public coverage share or the possibility of overlap.",
    assessment:
      "Both private and public insurance cover substantial portions of the population. Medicare, Medicaid and other public programs are integral to the existing system.",
    response:
      "Compare public and private enrollment using the same survey period and allow for people with more than one coverage type.",
    caveat:
      "Coverage is not equivalent to access or service quality, and the coverage categories overlap.",
    question:
      "Are you measuring coverage, spending or the ownership of providers?",
    evidence: [
      e(
        "36.3%",
        "Public coverage in 2023",
        "Census estimate for some or all of the calendar year.",
      ),
      e(
        "65.4%",
        "Private coverage in 2023",
        "Overlap is possible; these shares should not be added as exclusive categories.",
      ),
    ],
    sources: [refs.insurance],
    keywords: [
      "Medicare",
      "Medicaid",
      "private insurance",
      "public healthcare",
    ],
  },
  {
    slug: "gender-pay-gap",
    topic: "Social policy",
    title: "The gender pay gap is completely made up.",
    verdict: "Unsupported",
    context:
      "Illustrative response to discussions of pay differences and discrimination.",
    statisticTrap:
      "The fact that an unadjusted gap is not a causal estimate of discrimination is treated as evidence that the measured gap does not exist.",
    assessment:
      "The aggregate gap is measurable. Occupation, hours, experience, caregiving and discrimination may contribute in different ways. An unadjusted ratio cannot isolate any one cause.",
    response:
      "Separate the existence of an earnings gap from the question of what explains it. Examine adjusted and unadjusted estimates together.",
    caveat:
      "An aggregate ratio does not show unequal pay for identical work. It is equally misleading to attribute the entire difference to discrimination without evidence.",
    question:
      "Are we discussing an aggregate earnings difference or a causal estimate?",
    evidence: [
      e(
        "82¢",
        "Median hourly earnings ratio, 2022",
        "Pew comparison of women’s hourly earnings with men’s.",
      ),
      e(
        "65¢",
        "Comparable ratio, 1982",
        "Historical comparison in the same analysis.",
      ),
    ],
    sources: [refs.gender],
    keywords: ["women", "wage gap", "discrimination", "equal pay"],
  },
  {
    slug: "climate-scenarios",
    topic: "Climate & energy",
    title: "Revised climate projections prove climate science was wrong.",
    verdict: "Misleading",
    context:
      "FactCheck.org examined a May 16, 2026 social media post by Donald Trump portraying updated scenarios as an admission that previous projections were wrong.",
    statisticTrap:
      "Conditional scenarios are interpreted as unconditional predictions, then differences in assumed emissions are framed as a failure of physical science.",
    assessment:
      "A scenario projects outcomes under specified assumptions. Revising assumptions about future emissions or development does not overturn observed warming or its attribution.",
    response:
      "Distinguish observed temperatures, physical-model performance and changes to future scenario assumptions.",
    caveat:
      "Models have uncertainties and should be evaluated against observations. Not all scenario revisions are merely changes in emissions assumptions.",
    question:
      "Did the underlying physics change, or did the scenario inputs change?",
    evidence: [
      e(
        "2026",
        "Documented claim",
        "FactCheck.org examines the scenario update and the public interpretation.",
      ),
      e(
        "2021",
        "IPCC assessment",
        "Physical science synthesis addresses observations and attribution separately from scenario projections.",
        1,
      ),
    ],
    sources: [refs.climateClaim, refs.climate],
    keywords: ["models", "predictions", "Trump", "climate alarmism"],
  },
];
export const verdictClass: Record<Verdict, string> = {
  Unsupported: "unsupported",
  Misleading: "misleading",
  "Needs context": "context",
  "Value judgment": "judgment",
};
export const claimBySlug = (slug: string) =>
  claims.find((c) => c.slug === slug);
