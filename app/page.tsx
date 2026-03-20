import Link from "next/link"
import Image from "next/image"
import StarsBackground from "./components/stars-background"
import TimelineSection from "./components/timeline-section"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <StarsBackground />

      <div className="relative z-10">
        <section className="relative flex min-h-[78svh] flex-col justify-center overflow-hidden px-6 py-12 lg:min-h-[74svh]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.18),_transparent_55%)]" />

          <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
            <h1 className="max-w-5xl text-center text-5xl font-black tracking-tighter sm:text-6xl lg:text-7xl xl:text-8xl">
              BP RIMAL
            </h1>

            <p className="mt-4 max-w-2xl text-center text-lg text-gray-400 sm:text-xl">
              building AI products to impact a billion lives
            </p>

            <div className="mt-12 grid w-full max-w-5xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              <Link
                href="/avatar"
                className="group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur transition-all hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10 shadow-xl"
              >
                <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-black/40 ring-1 ring-white/10 shadow-lg transition-transform group-hover:scale-105">
                  <Image
                    src="/icons/bp-icon.png"
                    width={96}
                    height={96}
                    alt="AI BP icon"
                    className="h-24 w-24 object-contain"
                  />
                </div>
                <span className="text-base font-semibold tracking-wide text-white">AI BP</span>
                <span className="mt-1 text-xs text-gray-400">talk to ai bp</span>
              </Link>

              <Link
                href="/terminal"
                className="group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur transition-all hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10 shadow-xl"
              >
                <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-black/40 ring-1 ring-white/10 shadow-lg transition-transform group-hover:scale-105">
                  <Image
                    src="/icons/macos-terminal-icon.svg"
                    width={96}
                    height={96}
                    alt="Terminal icon"
                    className="h-24 w-24 object-contain"
                  />
                </div>
                <span className="text-base font-semibold tracking-wide text-white">Terminal</span>
                <span className="mt-1 text-xs text-gray-400">for the nerds</span>
              </Link>

              <Link
                href="/resume"
                className="group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur transition-all hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10 shadow-xl"
              >
                <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-black/40 ring-1 ring-white/10 shadow-lg transition-transform group-hover:scale-105">
                  <Image
                    src="/icons/resume-icon.png"
                    width={96}
                    height={96}
                    alt="Resume icon"
                    className="h-24 w-24 object-contain"
                    priority
                  />
                </div>
                <span className="text-base font-semibold tracking-wide text-white">Resume</span>
                <span className="mt-1 text-xs text-gray-400">work + projects</span>
              </Link>

              <Link
                href="/writings"
                className="group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur transition-all hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10 shadow-xl"
              >
                <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-black/40 ring-1 ring-white/10 shadow-lg transition-transform group-hover:scale-105">
                  <Image
                    src="/icons/writings-icon.png"
                    width={96}
                    height={96}
                    alt="Writings icon"
                    className="h-24 w-24 object-contain"
                  />
                </div>
                <span className="text-base font-semibold tracking-wide text-white">Writings</span>
                <span className="mt-1 text-xs text-gray-400">my thoughts</span>
              </Link>
            </div>

          </div>
        </section>

        <TimelineSection id="timeline" mode="landing" />

        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-5 gap-y-3 px-6 pb-12 pt-2 text-sm text-gray-400 sm:px-8">
          <a
            href="mailto:contactbp22@gmail.com"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>contactbp22@gmail.com</span>
          </a>
          <a
            href="https://x.com/_bprimal_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>Twitter</span>
          </a>
          <a
            href="https://github.com/bprimal22"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/bprimal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://scholar.google.com/citations?hl=en&user=ijuSEnIAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm-7.74 7L12 13.97 19.74 10 12 6.03 4.26 10ZM6 14.9V18c0 1.58 2.69 3 6 3s6-1.42 6-3v-3.1l-6 3.27-6-3.27Z"/>
            </svg>
            <span>Google Scholar</span>
          </a>
        </div>
      </div>
    </main>
  )
}
