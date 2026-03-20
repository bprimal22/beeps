export type Milestone = {
  period: string
  category: string
  title: string
  role?: string
  org: string
  summary: string
  highlights: string[]
  logoSrc?: string
  logoAlt?: string
  links?: Array<{
    href: string
    label: string
  }>
}

export const milestones: Milestone[] = [
  {
    period: "2019",
    category: "Education",
    title: "Started ECE Honors at UT Austin",
    role: "B.S. Electrical and Computer Engineering Honors",
    org: "University of Texas at Austin",
    summary: "Started the engineering foundation that led into research, internships, and product work.",
    highlights: [
      "Built a strong hardware + software base early.",
      "Finished the degree with a 3.87 GPA.",
    ],
    logoSrc: "/logos/ut.png",
    logoAlt: "University of Texas at Austin logo",
    links: [{ href: "https://www.utexas.edu", label: "UT Austin" }],
  },
  {
    period: "2019-2021",
    category: "Research",
    title: "Worked in the Integrated Nano Computing Lab",
    role: "Research Assistant",
    org: "Integrated Nano Computing Lab",
    summary: "Worked on neuromorphic computing and spiking neural networks on chip.",
    highlights: [
      "Researched neuromorphic computing architectures.",
      "Worked on spiking neural networks and in-memory computing ideas.",
    ],
    logoSrc: "/logos/ut.png",
    logoAlt: "University of Texas at Austin logo",
    links: [{ href: "https://utinclab.com/", label: "INCLab" }],
  },
  {
    period: "2021",
    category: "Industry",
    title: "Product Engineering",
    role: "Product Engineering Intern",
    org: "AMD",
    summary: "Worked on system-level validation for server processors and GPUs.",
    highlights: [
      "Implemented system-level test automation for server processors and GPUs.",
      "Validated GPU core power consumption, contributing more than $5M in annual savings.",
    ],
    logoSrc: "/logos/amd.png",
    logoAlt: "AMD logo",
    links: [{ href: "https://www.amd.com", label: "AMD" }],
  },
  {
    period: "2021",
    category: "Publication",
    title: "Neuromorphic computing publication",
    role: "Co-author",
    org: "Applied Physics Letters",
    summary: "Published work on in-memory computing hardware and circuits.",
    highlights: [
      "Co-authored research at the intersection of hardware and neuromorphic computing.",
      "Extended the research thread from the Integrated Nano Computing Lab.",
    ],
    logoSrc: "/logos/ut.png",
    logoAlt: "University of Texas at Austin logo",
    links: [
      {
        href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ijuSEnIAAAAJ&citation_for_view=ijuSEnIAAAAJ:u5HHmVD_uO8C",
        label: "Domain wall-magnetic tunnel junction spin-orbit torque devices and circuits for in-memory computing",
      },
      {
        href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ijuSEnIAAAAJ&citation_for_view=ijuSEnIAAAAJ:u-x6o8ySG0sC",
        label: "Spin orbit torque domain wall-magnetic tunnel junction devices and circuits for in-memory and neuromorphic computing",
      },
    ],
  },
  {
    period: "2022",
    category: "Industry",
    title: "Silicon Engineering",
    role: "Silicon Engineer",
    org: "Apple",
    summary: "Built internal tooling for regression testing across iOS, macOS, and watchOS.",
    highlights: [
      "Built a Slack-driven agent for regression test orchestration across iOS, macOS, and watchOS.",
      "Made test operations faster and more self-serve for engineering teams.",
      "Improved detection time by 10x through caching and multithreading.",
    ],
    logoSrc: "/logos/apple.png",
    logoAlt: "Apple logo",
    links: [{ href: "https://www.apple.com", label: "Apple" }],
  },
  {
    period: "2023-2026",
    category: "Industry",
    title: "AI Engineer",
    role: "Software Engineer",
    org: "Visa",
    summary: "Built core B2B payment APIs and AI-native internal tools at Visa.",
    highlights: [
      "Created and scaled an AI-native API Playground, evolving from a side project into a company-wide platform now being rolled out across Visa Developer Platform.",
      "Built an AI remediation assistant that learns from past production issues, reducing average incident lifespan from 27 days to 6 days.",
      "Designed and maintained APIs for Visa's B2B payment platform processing billions in transactions.",
    ],
    logoSrc: "/logos/visa.png",
    logoAlt: "Visa logo",
    links: [{ href: "https://www.visa.com", label: "Visa" }],
  },
  {
    period: "Oct 2023",
    category: "Project",
    title: "Founded GenUX",
    role: "Founder / builder",
    org: "GenUX",
    summary: "Founded an AI learning platform first deployed in UT Austin engineering courses.",
    highlights: [
      "Reached 1,000+ students in UT Austin engineering courses.",
      "Helped reduce D/F grades by 80% in its initial classroom deployment.",
    ],
    logoSrc: "/logos/genux.png",
    logoAlt: "GenUX logo",
    links: [{ href: "https://www.genux.site", label: "GenUX" }],
  },
  {
    period: "2025",
    category: "Publication",
    title: "Published GenUX case study",
    role: "Author",
    org: "2025 ASEE Annual Conference & Exposition",
    summary: "Published a year-long case study on AI-driven personalized learning in engineering education.",
    highlights: [
      "Presented the work at international education conferences, including Montreal in 2025.",
      "Turned classroom deployment results into a formal research and evaluation story.",
    ],
    logoSrc: "/logos/ut.png",
    logoAlt: "University of Texas at Austin logo",
    links: [
      {
        href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ijuSEnIAAAAJ&citation_for_view=ijuSEnIAAAAJ:9yKSN-GCB0IC",
        label: "WIP: AI-Driven Personalized Learning for an Introductory Computing Course",
      },
    ],
  },
  {
    period: "2026",
    category: "Startup",
    title: "Launched blackboardLM",
    role: "Founder / builder",
    org: "blackboardLM",
    summary: "Evolved GenUX into an AI teacher designed around interactive blackboard-based instruction.",
    highlights: [
      "Moved beyond static chat and video into interactive, step-by-step teaching on a blackboard.",
      "Got 1000+ users within the first month of launch.",
    ],
    logoSrc: "/logos/blackboardlm.svg",
    logoAlt: "blackboardLM logo",
    links: [{ href: "https://blackboardlm.com", label: "blackboardLM" }],
  },
]
