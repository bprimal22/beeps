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
      </div>
    </main>
  )
}
