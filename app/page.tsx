import Link from "next/link"
import Image from "next/image"
import StarsBackground from "./components/stars-background"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <StarsBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <h1 className="mb-3 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter">BP RIMAL</h1>
        <p className="mb-10 text-gray-400 text-lg sm:text-xl">Building cool shits with AI</p>

        <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {/* AI BP */}
          <Link
            href="/avatar"
            className="group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur \
            transition-all hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10 shadow-xl"
          >
            <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-black/40 ring-1 ring-white/10 shadow-lg group-hover:scale-105 transition-transform">
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

          {/* Terminal */}
          <Link
            href="/terminal"
            className="group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur \
            transition-all hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10 shadow-xl"
          >
            <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-black/40 ring-1 ring-white/10 shadow-lg group-hover:scale-105 transition-transform">
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

          {/* Resume */}
          <Link
            href="/resume"
            className="group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur \
            transition-all hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10 shadow-xl"
          >
            <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-black/40 ring-1 ring-white/10 shadow-lg group-hover:scale-105 transition-transform">
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

          {/* Writings */}
          <Link
            href="/writings"
            className="group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur \
            transition-all hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10 shadow-xl"
          >
            <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-black/40 ring-1 ring-white/10 shadow-lg group-hover:scale-105 transition-transform">
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
    </main>
  )
}
