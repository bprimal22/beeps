import Link from "next/link"
import { ArrowUpRight, Dot } from "lucide-react"
import StarsBackground from "@/app/components/stars-background"
import { formatPublishedDate, getAllWritings } from "@/lib/writings"

export default function WritingsPage() {
  const writings = getAllWritings()

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <StarsBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.06),_transparent_18%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8 sm:px-8 lg:px-12">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Writings</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl">my thoughts</h1>
          </div>
          <Link
            href="/"
            className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-cyan-300/50 hover:text-white md:inline-flex"
          >
            back home
          </Link>
        </div>

        <section className="flex flex-col gap-5">
          {writings.map((writing) => (
            <Link
              key={writing.slug}
              href={`/writings/${writing.slug}`}
              className="group flex min-h-[240px] flex-col justify-between rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.06]"
            >
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/45">
                  <span>{writing.author}</span>
                  <Dot className="h-4 w-4 text-white/20" />
                  <span>{formatPublishedDate(writing.publishedAt)}</span>
                </div>
                <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
                  {writing.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
                  {writing.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-cyan-200">
                read
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
