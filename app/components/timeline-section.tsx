"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { milestones } from "./timeline-data"

type TimelineSectionProps = {
  id?: string
  mode?: "landing" | "standalone"
}

export default function TimelineSection({ id, mode = "standalone" }: TimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isPublicationCategory = (category: string) => category.toLowerCase() === "publication"
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  })

  const headingOpacity = useTransform(scrollYProgress, [0, 0.18, 0.5], [0.35, 1, 1])
  const headingY = useTransform(scrollYProgress, [0, 0.25], [52, 0])
  const haloOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.08, 0.2, 0.1])

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative mx-auto max-w-6xl px-6 sm:px-8 ${
        mode === "landing" ? "pt-6 pb-24 lg:pt-10 lg:pb-32" : "py-14 lg:py-20"
      }`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(125,211,252,0.2),transparent_58%)]"
        style={prefersReducedMotion ? undefined : { opacity: haloOpacity }}
      />

      <motion.div
        className="relative z-10 mb-8"
        style={prefersReducedMotion ? undefined : { opacity: headingOpacity, y: headingY }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.38em] text-cyan-300/80">
          {mode === "landing" ? "My Arc" : "Timeline"}
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute bottom-0 left-[7.65rem] top-0 hidden w-px bg-gradient-to-b from-white/5 via-white/15 to-white/5 lg:block" />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-[7.65rem] top-0 hidden w-px origin-top bg-gradient-to-b from-cyan-300 via-white/70 to-amber-200 lg:block"
          style={prefersReducedMotion ? undefined : { scaleY: progress }}
        />

        <div className="space-y-4 lg:space-y-6">
          {milestones.map((milestone, index) => {
            const direction = index % 2 === 0 ? -30 : 30

            return (
              <motion.article
                key={`${milestone.period}-${milestone.title}`}
                className="lg:grid lg:grid-cols-[120px_28px_minmax(0,1fr)] lg:gap-6"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 42, x: direction }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="hidden lg:block lg:pt-6">
                  <p className="font-mono text-sm uppercase tracking-[0.28em] text-amber-200/80">{milestone.period}</p>
                </div>

                <div className="relative hidden lg:flex">
                  <motion.div
                    className="mt-5 h-4 w-4 rounded-full border border-cyan-200/60 bg-[#07131a] shadow-[0_0_24px_rgba(103,232,249,0.45)]"
                    initial={prefersReducedMotion ? false : { scale: 0.7, opacity: 0.4 }}
                    whileInView={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.35 }}
                  />
                </div>

                <details className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur transition-all open:bg-white/[0.08] hover:border-cyan-300/20 hover:bg-white/[0.06]">
                  <summary className="list-none cursor-pointer p-4 sm:p-5 lg:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                        {milestone.logoSrc ? (
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black p-2.5 ring-1 ring-white/10 sm:h-20 sm:w-20">
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

                          <h3 className="mt-3 text-lg font-medium leading-tight text-white sm:text-xl lg:text-[1.35rem]">
                            {milestone.title}
                          </h3>
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

                  <div className="border-t border-gray-700 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
                    <p className="text-sm leading-6 text-gray-300">{milestone.summary}</p>

                    <div className="mt-4 grid gap-2">
                      {milestone.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="rounded-2xl border border-white/8 bg-black/35 px-3 py-2.5 text-sm leading-6 text-gray-300"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {milestone.links?.length ? (
                      isPublicationCategory(milestone.category) ? (
                        <div className="mt-5 border-t border-white/8 pt-4">
                          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/75">
                            Publication links
                          </p>
                          <div className="mt-3 grid gap-2">
                            {milestone.links.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm leading-6 text-cyan-100 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-white hover:decoration-cyan-200"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {milestone.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center rounded-full border border-gray-700 bg-black/50 px-3 py-2 text-sm text-white transition hover:border-cyan-300/30 hover:bg-white/10"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )
                    ) : null}
                  </div>
                </details>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
