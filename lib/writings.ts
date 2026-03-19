import fs from "node:fs"
import path from "node:path"
import { cache } from "react"
import matter from "gray-matter"
import { z } from "zod"

const writingsDirectory = path.join(process.cwd(), "public", "articles")

const writingFrontmatterSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().optional().default(false),
})

export type Writing = {
  slug: string
  content: string
  title: string
  author: string
  description: string
  publishedAt: Date
  tags: string[]
  featured: boolean
}

function readWritingFile(fileName: string): Writing {
  const slug = fileName.replace(/\.md$/, "")
  const filePath = path.join(writingsDirectory, fileName)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  const frontmatter = writingFrontmatterSchema.parse(data)

  return {
    slug,
    content,
    title: frontmatter.title,
    author: frontmatter.author,
    description: frontmatter.description,
    publishedAt: frontmatter.publishedAt,
    tags: frontmatter.tags,
    featured: frontmatter.featured,
  }
}

export const getAllWritings = cache(() => {
  const files = fs.readdirSync(writingsDirectory).filter((file) => file.endsWith(".md"))

  return files
    .map(readWritingFile)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
})

export const getWritingBySlug = cache((slug: string) => {
  const writings = getAllWritings()
  return writings.find((writing) => writing.slug === slug) ?? null
})

export function formatPublishedDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}
