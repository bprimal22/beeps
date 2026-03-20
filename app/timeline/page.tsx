import TimelineSection from "../components/timeline-section"
import StarsBackground from "../components/stars-background"

export default function TimelinePage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <StarsBackground />
      <div className="relative z-10">
        <TimelineSection mode="standalone" />
      </div>
    </main>
  )
}
