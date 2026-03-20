import Image from "next/image"
import { ChevronDown } from "lucide-react"
import StarsBackground from "../components/stars-background"

type Milestone = {
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

const milestones: Milestone[] = [
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
        label: "Publication",
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
    period: "2023-Present",
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
    title: "Built GenUX",
    role: "Founder / builder",
    org: "GenUX",
    summary: "Built a system for real-time agent-generated interfaces.",
    highlights: [
      "Enabled agents to generate interfaces in real time to interact with users.",
      "Pioneered interactions with Generative UI when the term Generative UI didn't exist yet.",
    ],
    logoSrc: "/logos/genux.png",
    logoAlt: "GenUX logo",
    links: [{ href: "https://www.genux.site", label: "GenUX" }],
  },
  {
    period: "2025",
    category: "Publication",
    title: "AI-driven personalized learning paper",
    role: "Author",
    org: "2025 ASEE Annual Conference & Exposition",
    summary: "Published work on AI-driven personalized learning for introductory computing.",
    highlights: [
      "Shifted the research thread toward AI and education.",
      "Connected product-building with academic communication.",
    ],
    logoSrc: "/logos/ut.png",
    logoAlt: "University of Texas at Austin logo",
    links: [
      {
        href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ijuSEnIAAAAJ&citation_for_view=ijuSEnIAAAAJ:9yKSN-GCB0IC",
        label: "ASEE paper",
      },
    ],
  },
  {
    period: "2026",
    category: "Products",
    title: "Built blackboardLM",
    role: "Founder / builder",
    org: "blackboardLM",
    summary: "Built a steerable learning product as the successor to GenUX.",
    highlights: [
      "Built blackboardLM for steerable, conversational lesson experiences.",
      "Evolved the GenUX product thread into a learning-focused AI experience.",
    ],
    logoSrc: "/logos/blackboardlm.svg",
    logoAlt: "blackboardLM logo",
    links: [{ href: "https://blackboardlm.com", label: "blackboardLM" }],
  },
]

export default function TimelinePage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <StarsBackground />
      <div className="relative z-10 mx-auto max-w-4xl p-8">


        <section className="relative">
          <div className="absolute bottom-0 left-[7.65rem] top-0 hidden w-px bg-gradient-to-b from-cyan-300/50 via-white/20 to-amber-200/50 lg:block" />

          <div className="space-y-4 lg:space-y-6">
            {milestones.map((milestone) => (
              <article
                key={`${milestone.period}-${milestone.title}`}
                className="lg:grid lg:grid-cols-[120px_28px_minmax(0,1fr)] lg:gap-6"
              >
                <div className="hidden lg:block lg:pt-5">
                  <p className="font-mono text-sm uppercase tracking-[0.28em] text-amber-200/80">{milestone.period}</p>
                </div>

                <div className="relative hidden lg:flex">
                  <div className="mt-5 h-4 w-4 rounded-full border border-cyan-200/60 bg-[#07131a] shadow-[0_0_24px_rgba(103,232,249,0.45)]" />
                </div>

                <details className="group rounded-lg border border-gray-800 bg-black/50 transition-all open:bg-white/10 hover:bg-white/10">
                  <summary className="list-none cursor-pointer p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                        {milestone.logoSrc ? (
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black p-2.5 sm:h-20 sm:w-20">
                            <Image
                              src={milestone.logoSrc}
                              alt={milestone.logoAlt ?? `${milestone.org} logo`}
                              width={80}
                              height={80}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        ) : null}

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-gray-700 bg-black/50 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-200/80 lg:hidden">
                              {milestone.period}
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">
                              {milestone.category}
                            </span>
                          </div>

                          <h2 className="mt-3 text-lg font-medium leading-tight text-white sm:text-xl">
                            {milestone.title}
                          </h2>
                          <p className="mt-1 text-sm text-gray-300">
                            {milestone.role ? `${milestone.role} · ` : ""}
                            {milestone.org}
                          </p>
                        </div>
                      </div>

                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-700 bg-black/50 text-gray-400 transition group-open:rotate-180 group-open:text-white">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </summary>

                  <div className="border-t border-gray-700 px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
                    <p className="text-sm leading-6 text-gray-300">{milestone.summary}</p>

                    <div className="mt-4 grid gap-2">
                      {milestone.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="rounded-lg border border-gray-800 bg-black/40 px-3 py-2.5 text-sm leading-6 text-gray-300"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {milestone.links?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {milestone.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-full border border-gray-700 bg-black/50 px-3 py-2 text-sm text-white transition hover:bg-white/10"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
