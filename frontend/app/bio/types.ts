export type TimelineItem = {
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