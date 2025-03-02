"use client"

import { useState } from "react"
import StarsBackground from "../components/stars-background"
import Link from "next/link"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

// Timeline item type definition
type TimelineItem = {
  id: string
  type: "project" | "experience" | "education"
  title: string
  organization?: string
  link?: string
  period: string
  year: number
  description: string
  details?: string[]
  tech?: string[]
  weightsLink?: string
}

// Add this constant near other constant definitions
const companyLogos: Record<string, string> = {
  Visa: "/logos/visa.png",
  Apple: "/logos/apple.png",
  AMD: "/logos/amd.png",
  "University of Texas at Austin": "/logos/ut.png",
  "Integrated Nano Computing Lab": "/logos/ut.png",
}

export default function ResumePage() {
  // State to track expanded items
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  // Toggle expanded state for an item
  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Company links
  const companyLinks: Record<string, string> = {
    Visa: "https://www.visa.com",
    Apple: "https://www.apple.com",
    AMD: "https://www.amd.com",
    "University of Texas at Austin": "https://www.utexas.edu",
    "Integrated Nano Computing Lab": "https://utinclab.com/",
  }

  // Timeline data
  const timelineItems: TimelineItem[] = [
    // Education
    {
      id: "ms-ai",
      type: "education",
      title: "M.S. Artificial Intelligence",
      organization: "University of Texas at Austin",
      period: "2024 - Present",
      year: 2024,
      description: "Graduate studies in Artificial Intelligence",
      details: ["GPA: 4.0"],
    },
    // Current job
    {
      id: "visa",
      type: "experience",
      title: "Software Engineer",
      organization: "Visa",
      period: "June 2023 - Present",
      year: 2023,
      description: "Developing AI tools and B2B payment platform APIs",
      details: [
        "Developed an AI tool that utilizes historical production issues to recommend solutions for new ones, cutting initial investigation time from 4 hours to just 20 minutes",
        "Developed and maintained B2B payment platform APIs processing over $1.5B annually",
      ],
    },
    // BS Degree
    {
      id: "bs-ece",
      type: "education",
      title: "B.S. Electrical and Computer Engineering Honors",
      organization: "University of Texas at Austin",
      period: "2019 - 2023",
      year: 2023,
      description: "Undergraduate studies in Electrical and Computer Engineering",
      details: ["GPA: 3.87"],
    },
    // Projects in 2023
    {
      id: "genux",
      type: "project",
      title: "GenUX.site",
      link: "https://www.genux.site",
      period: "2023",
      year: 2023,
      description: "Generative User Interface framework for LLM agents",
      details: ["Generative User Interface framework enabling LLM agents to generate UI components in real time."],
      tech: ["Python", "TypeScript", "Svelte"],
    },
    {
      id: "decall",
      type: "project",
      title: "decall.live",
      link: "http://decall.live",
      period: "2023",
      year: 2023,
      description: "Low-latency AI Phone Receptionist",
      details: ["Low-latency AI Phone Receptionist for Auto Dealerships"],
      tech: ["Python", "TypeScript", "Kubernetes"],
    },
    // Apple internship
    {
      id: "apple",
      type: "experience",
      title: "Silicon Engineering Intern",
      organization: "Apple",
      period: "May 2022 - August 2022",
      year: 2022,
      description: "Developed testing tools for iOS/MacOS/WatchOS",
      details: [
        "Developed an agent to request, run, and cancel regression tests for iOS/MacOS/WatchOS software changes through slack",
        "Implemented data caching to detect error-prone host machines and reduce burdens on the test scheduler API",
        "Optimized data caching with multithreading which led to a 10x speedup in detection time",
      ],
    },
    // Projects in 2022
    {
      id: "ddi",
      type: "project",
      title: "Drug-Drug Interaction Classification",
      link: "https://github.com/bprimal22/Drug-Drug-Interaction-Classification",
      period: "2022",
      year: 2022,
      description: "Award-winning drug interaction prediction model",
      details: [
        "Innovated upon the state-of-the-art model in predicting interaction between drugs. Won the best UT Austin Data Science Project award.",
      ],
      tech: ["Python", "PyTorch"],
      weightsLink: "https://huggingface.co/bprimal/Drug-Drug-Interaction-Classification",
    },
    // AMD internship
    {
      id: "amd",
      type: "experience",
      title: "Product Engineering Intern",
      organization: "AMD",
      period: "January 2021 - August 2021",
      year: 2021,
      description: "Automated testing of server processors and GPUs",
      details: [
        "Implemented system level test automation of server processors and GPUs.",
        "Validated power consumption of GPU cores, saving over $5M annually",
      ],
    },
    // Projects in 2021
    {
      id: "video-translation",
      type: "project",
      title: "Video-Video Translation with Lip Sync",
      link: "https://medium.com/@contactbp22/video-video-translation-with-lip-sync-e83f627a1f8",
      period: "2021",
      year: 2021,
      description: "Translated videos with voice cloning and lip sync",
      details: ["Translated video content from one language to another with voice cloning and lip sync."],
      tech: ["Python", "PyTorch", "Transformers", "Wav2Lip"],
    },
    // Research (now part of work experience)
    {
      id: "research",
      type: "experience",
      title: "Research Assistant",
      organization: "Integrated Nano Computing Lab",
      period: "2019 - 2021",
      year: 2021,
      description: "Researched neuromorphic computing architectures",
      details: [
        "Researched neuromorphic computing architectures and Spiking Neural Networks on chip.",
        "Publication: Domain-wall magnetic tunnel junction spin-orbit torque oscillator",
      ],
    },
  ]

  // Separate items by type
  const projects = timelineItems.filter((item) => item.type === "project")
  const experiences = timelineItems.filter((item) => item.type === "experience")
  const education = timelineItems.filter((item) => item.type === "education")

  // Replace the getItemTypeIcon function with this updated version
  const getItemTypeIcon = (type: string, organization?: string) => {
    if (type === "experience" && organization && companyLogos[organization]) {
      return (
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center overflow-hidden p-1">
          <img 
            src={companyLogos[organization]} 
            alt={`${organization} logo`}
            className="w-full h-full object-contain"
          />
        </div>
      )
    }
  
    switch (type) {
      case "project":
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        )
      case "experience":
        return (
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        )
      case "education":
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  // Render timeline items
  const renderTimelineItems = (items: TimelineItem[]) => {
    return items.map((item) => (
      <div
        key={item.id}
        className={`bg-black/70 border border-gray-800 rounded-lg p-4 transition-all ${
          expandedItems[item.id] ? "bg-white/10" : "hover:bg-white/5"
        }`}
      >
        <div className="flex items-start cursor-pointer" onClick={() => toggleExpand(item.id)}>
          <div className="mr-3 mt-1">
            {getItemTypeIcon(item.type, item.organization)}
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline inline-flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.title}
                      <ExternalLink className="ml-1 w-3 h-3" />
                    </a>
                  ) : (
                    item.title
                  )}
                </h4>
                {item.organization && (
                  <p className="text-gray-400">
                    <a
                      href={companyLinks[item.organization] || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.organization}
                    </a>{" "}
                    • {item.period}
                  </p>
                )}
                <p className="text-gray-300">{item.description}</p>
              </div>
              <button
                className="text-gray-400 hover:text-white p-1"
                aria-label={expandedItems[item.id] ? "Collapse" : "Expand"}
              >
                {expandedItems[item.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Expanded content */}
        {expandedItems[item.id] && (
          <div className="mt-4 ml-11 border-t border-gray-700 pt-3">
            {item.details && item.details.length > 0 && (
              <ul className="list-disc ml-5 text-gray-300 space-y-2">
                {item.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            )}

            {item.tech && item.tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tech.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-white/10 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {item.weightsLink && (
              <p className="mt-3">
                <a
                  href={item.weightsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:underline"
                >
                  <img
                    src="https://huggingface.co/front/assets/huggingface_logo.svg"
                    alt="Hugging Face"
                    className="w-5 h-5 mr-1"
                  />
                  Model Weights
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <StarsBackground />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 p-4 md:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-12 bg-black/70 p-6 md:p-8 rounded-lg border border-gray-800 text-center">
          <div className="flex flex-col items-center mb-4">
            <img src="/bp.png" alt="BP Rimal" className="w-24 h-24 rounded-full mb-2" />
            <h1 className="text-4xl md:text-5xl font-bold">BP Rimal</h1>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://x.com/_bprimal_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>_bprimal_</span>
            </a>
            <a
              href="mailto:contactbp22@gmail.com"
              className="hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>contactbp22@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/bprimal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>bprimal</span>
            </a>
            <a
              href="https://github.com/bprimal22"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>bprimal22</span>
            </a>
          </div>
        </header>

        {/* Projects section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-800 pb-2">Projects</h2>
          <div className="space-y-4">{renderTimelineItems(projects)}</div>
        </section>

        {/* Work Experience section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-800 pb-2">Work Experience</h2>
          <div className="space-y-4">{renderTimelineItems(experiences)}</div>
        </section>

        {/* Education section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-800 pb-2">Education</h2>
          <div className="space-y-4">{renderTimelineItems(education)}</div>
        </section>

        {/* Back button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-black/70 border border-gray-800 rounded-lg hover:bg-white/10 transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 9H17a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" />
            </svg>
            <span>cd ..</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

