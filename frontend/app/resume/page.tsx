"use client"

import { useState } from "react"
import StarsBackground from '../components/stars-background'
import Link from 'next/link'
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

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

  // Add company logos
  const companyLogos: Record<string, string> = {
    "Visa": "/logos/visa.png",
    "Apple": "/logos/apple.png",
    "AMD": "/logos/amd.png",
    "University of Texas at Austin": "/logos/ut.png",
    "Integrated Nano Computing Lab": "/logos/ut.png",
  }

  // Company links
  const companyLinks: Record<string, string> = {
    "Visa": "https://www.visa.com",
    "Apple": "https://www.apple.com",
    "AMD": "https://www.amd.com",
    "University of Texas at Austin": "https://www.utexas.edu",
    "Integrated Nano Computing Lab": "https://utinclab.com/",
  }

  function getCompanyLink(company: string) {
    return companyLinks[company] || "#"
  }

  function getCompanyLogo(company: string) {
    return companyLogos[company] || null
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <StarsBackground />
      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        <header className="mb-12 bg-black/50 p-8 rounded-lg border border-gray-800 text-center">
          <div className="flex flex-col items-center mb-4">
            <img src="/bp.png" alt="BP Rimal" className="w-24 h-24 rounded-full mb-2" />
            <h1 className="text-5xl font-bold">BP Rimal</h1>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://x.com/_bprimal_" target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>_bprimal_</span>
            </a>
            <a href="mailto:contactbp22@gmail.com" 
              className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>contactbp22@gmail.com</span>
            </a>
            <a href="https://linkedin.com/in/bprimal" target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>bprimal</span>
            </a>
            <a href="https://github.com/bprimal22" target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
              <span>bprimal22</span>
            </a>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "GenUX.site",
                link: "https://www.genux.site",
                description: "Enabled LLM Agents to generate UI in real time to interact with users.",
                tech: ["Python", "TypeScript", "Svelte"]
              },
              {
                title: "decall.live",
                link: "http://decall.live",
                description: "Low-latency AI Phone Receptionist for Auto Dealerships",
                tech: ["Python", "TypeScript", "Kubernetes"]
              },
              {
                title: "Drug-Drug Interaction Classification",
                link: "https://github.com/bprimal22/Drug-Drug-Interaction-Classification",
                description: "Innovated upon the state-of-the-art model in predicting interaction between drugs. Won the best UT Austin Data Science Project award.",
                tech: ["Python", "PyTorch"],
                weightsLink: "https://huggingface.co/bprimal/Drug-Drug-Interaction-Classification"
              },
              {
                title: "Video-Video Translation with Lip Sync",
                link: "https://medium.com/@contactbp22/video-video-translation-with-lip-sync-e83f627a1f8",
                description: "Translated video content from one language to another with voice cloning and lip sync.",
                tech: ["Python", "PyTorch", "Transformers", "Wav2Lip"]
              }
            ].map((project, idx) => (
              <div key={idx} className="bg-black/50 border border-gray-800 rounded-lg p-6 hover:bg-white/10 transition-all">
                <h3 className="text-xl font-medium">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {project.title}
                  </a>
                </h3>
                <p className="text-gray-400 mt-2">{project.description}</p>
                {project.weightsLink && (
                  <p className="mt-2">
                    <a href={project.weightsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-400 hover:underline">
                      <img src="https://huggingface.co/front/assets/huggingface_logo.svg" alt="Hugging Face" className="w-5 h-5 mr-1" />
                      Model Weights
                    </a>
                  </p>
                )}
                <div className="flex gap-2 mt-3">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-white/10 rounded text-xs">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 mb-10">
          <h2 className="text-2xl font-semibold mb-6">Research</h2>
          <div 
            className={`bg-black/50 border border-gray-800 rounded-lg p-6 ${
              expandedItems['research'] ? "bg-white/10" : "hover:bg-white/10"
            } transition-all`}
          >
            <div className="flex items-start cursor-pointer" onClick={() => toggleExpand('research')}>
              <div className="mr-6 mt-1">
                {companyLogos["Integrated Nano Computing Lab"] && (
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center overflow-hidden p-2">
                    <img 
                      src={companyLogos["Integrated Nano Computing Lab"]} 
                      alt="Integrated Nano Computing Lab logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium">
                      <a
                        href="https://utinclab.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Integrated Nano Computing Lab
                      </a>
                    </h3>
                    <p className="text-gray-400">Research Assistant • 2019 - 2021</p>
                    <p className="text-gray-300">Researched neuromorphic computing architectures</p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-white p-1"
                    aria-label={expandedItems['research'] ? "Collapse" : "Expand"}
                  >
                    {expandedItems['research'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {expandedItems['research'] && (
              <div className="mt-4 ml-22 border-t border-gray-700 pt-3">
                <ul className="list-disc ml-5 text-gray-300 mt-4 space-y-2">
                  <li>
                    Researched neuromorphic computing architectures and Spiking Neural Networks on chip.
                  </li>
                  <li>
                    Publication:{" "}
                    <a
                      href="https://pubs.aip.org/aip/apl/article/118/11/112401/1022438/Domain-wall-magnetic-tunnel-junction-spin-orbit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Domain-wall magnetic tunnel junction spin-orbit torque oscillator
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold mb-6">Experience</h2>
          {[
            {
              id: 'visa',
              title: "Software Engineer",
              company: "Visa",
              period: "June 2023 - Present",
              points: [
                "Developed an AI tool that utilizes historical production issues to recommend solutions for new ones, cutting initial investigation time from 4 hours to just 20 minutes",
                "Developed and maintained B2B payment platform APIs processing over $1.5B annually"              
              ]
            },
            {
              id: 'apple',
              title: "Silicon Engineering Intern",
              company: "Apple",
              period: "May 2022 - August 2022",
              points: [
                "Developed an agent to request, run, and cancel regression tests for iOS/MacOS/WatchOS software changes through slack",
                "Implemented data caching to detect error-prone host machines and reduce burdens on the test scheduler API",
                "Optimized data caching with multithreading which led to a 10x speedup in detection time"
              ]
            },
            {
              id: 'amd',
              title: "Product Engineering Intern",
              company: "AMD",
              period: "January 2021 - August 2021",
              points: [
                "Implemented system level test automation of server processors and GPUs.",
                "Validated power consumption of GPU cores, saving over $5M annually"
              ]
            }
          ].map((job) => (
            <div 
              key={job.id} 
              className={`bg-black/50 border border-gray-800 rounded-lg p-6 ${
                expandedItems[job.id] ? "bg-white/10" : "hover:bg-white/10"
              } transition-all`}
            >
              <div className="flex items-start cursor-pointer" onClick={() => toggleExpand(job.id)}>
                <div className="mr-6 mt-1">
                  {companyLogos[job.company] && (
                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center overflow-hidden p-2">
                      <img 
                        src={companyLogos[job.company]} 
                        alt={`${job.company} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium">{job.title}</h3>
                      <p className="text-gray-400">
                        <a 
                          href={getCompanyLink(job.company)} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {job.company}
                        </a> • {job.period}
                      </p>
                    </div>
                    <button
                      className="text-gray-400 hover:text-white p-1"
                      aria-label={expandedItems[job.id] ? "Collapse" : "Expand"}
                    >
                      {expandedItems[job.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {expandedItems[job.id] && (
                <div className="mt-4 ml-22 border-t border-gray-700 pt-3">
                  <ul className="list-disc ml-5 mt-2 text-gray-300">
                    {job.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="mb-10 mt-10">
          <h2 className="text-2xl font-semibold mb-6">Education</h2>
          <div className="space-y-6">
            {[
              {
                id: 'ms-ai',
                degree: "M.S. Artificial Intelligence",
                school: "University of Texas at Austin",
                period: "2024 - Present",
                gpa: "4.0"
              },
              {
                id: 'bs-ece',
                degree: "B.S. Electrical and Computer Engineering Honors",
                school: "University of Texas at Austin",
                period: "2019 - 2023",
                gpa: "3.87"
              }
            ].map((edu) => (
              <div 
                key={edu.id}
                className={`bg-black/50 border border-gray-800 rounded-lg p-6 ${
                  expandedItems[edu.id] ? "bg-white/10" : "hover:bg-white/10"
                } transition-all`}
              >
                <div className="flex items-start cursor-pointer" onClick={() => toggleExpand(edu.id)}>
                  <div className="mr-6 mt-1">
                    {companyLogos[edu.school] && (
                      <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center overflow-hidden p-2">
                        <img 
                          src={companyLogos[edu.school]} 
                          alt={`${edu.school} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-medium">{edu.degree}</h3>
                        <p className="text-gray-400">
                          <a 
                            href={getCompanyLink(edu.school)} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {edu.school}
                          </a> • {edu.period}
                        </p>
                      </div>
                      <button
                        className="text-gray-400 hover:text-white p-1"
                        aria-label={expandedItems[edu.id] ? "Collapse" : "Expand"}
                      >
                        {expandedItems[edu.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {expandedItems[edu.id] && (
                  <div className="mt-4 ml-22 border-t border-gray-700 pt-3">
                    <p className="text-gray-300 mt-2">GPA: {edu.gpa}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        
        {/* Back button */}
        <div className="mt-8">
          <Link href="/" className="inline-flex items-center space-x-2 px-4 py-2 bg-black/50 border border-gray-800 rounded-lg hover:bg-white/10 transition-all">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 9H17a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"/>
            </svg>
            <span>cd ..</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

