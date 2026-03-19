import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Newsreader } from "next/font/google"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ArrowLeft, Dot } from "lucide-react"
import { formatPublishedDate, getAllWritings, getWritingBySlug } from "@/lib/writings"

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
})

export function generateStaticParams() {
  return getAllWritings().map((writing) => ({ slug: writing.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const writing = getWritingBySlug(slug)

  if (!writing) {
    return {
      title: "Writing not found",
    }
  }

  return {
    title: `${writing.title} | BP Rimal`,
    description: writing.description,
  }
}

export default async function WritingArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const writing = getWritingBySlug(slug)

  if (!writing) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <Link
          href="/writings"
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white/72 transition hover:border-cyan-300/40 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          back to writings
        </Link>

        <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] shadow-[0_30px_120px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]" />
          <div className="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <article className="mx-auto max-w-4xl">
              <header className="border-b border-white/10 pb-10">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/45">
                  <span>{writing.author}</span>
                  <Dot className="h-4 w-4 text-white/20" />
                  <span>{formatPublishedDate(writing.publishedAt)}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {writing.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/68"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[0.94] tracking-[-0.065em] text-white sm:text-5xl lg:text-7xl">
                  {writing.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68 sm:text-xl">
                  {writing.description}
                </p>
              </header>

              <div className={`${newsreader.className} mt-10`}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-7 text-[1.18rem] leading-[1.95] text-white/84 sm:text-[1.27rem]">
                        {children}
                      </p>
                    ),
                    em: ({ children }) => (
                      <em className="text-cyan-100/95 not-italic">{children}</em>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-5 mt-14 text-3xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                        {children}
                      </h2>
                    ),
                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                    ul: ({ children }) => <ul className="mb-8 ml-6 list-disc space-y-3 text-white/82">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-8 ml-6 list-decimal space-y-3 text-white/82">{children}</ol>,
                    li: ({ children }) => <li className="pl-2 text-[1.05rem] leading-8">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="my-10 border-l border-cyan-300/35 pl-6 text-xl italic leading-9 text-cyan-50/90">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="underline decoration-cyan-300/45 underline-offset-4 transition hover:text-cyan-200"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {writing.content}
                </ReactMarkdown>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  )
}
