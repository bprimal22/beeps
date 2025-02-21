"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  targetX: number
  targetY: number
}

interface ParticleConstellationProps {
  audioData: number[]
}

export default function ParticleConstellation({ audioData }: ParticleConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 2000
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    const createParticles = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * Math.min(canvas.width, canvas.height) * 0.4
        particles.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          size: Math.random() * 2 + 1,
          color: "rgba(255, 255, 255, 0.5)",
          targetX: centerX + Math.cos(angle) * radius,
          targetY: centerY + Math.sin(angle) * radius,
        })
      }
    }

    const updateParticles = () => {
      const audioDataSum = audioData.reduce((sum, value) => sum + value, 0)
      const averageAudioData = audioData.length ? audioDataSum / audioData.length : 0
      const intensity = averageAudioData / 128 // Normalize to 0-1 range

      particles.forEach((p, index) => {
        const frequencyBin = Math.floor((index / particleCount) * audioData.length)
        const frequencyIntensity = audioData[frequencyBin] / 255 // Normalize to 0-1 range

        // Update color based on frequency intensity
        const hue = frequencyIntensity * 360
        const saturation = 100
        const lightness = 50 + frequencyIntensity * 50
        p.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${0.5 + frequencyIntensity * 0.5})`

        // Update position based on overall intensity
        const angle = Math.atan2(p.targetY - centerY, p.targetX - centerX)
        const targetRadius = Math.sqrt(Math.pow(p.targetX - centerX, 2) + Math.pow(p.targetY - centerY, 2))
        const currentRadius = Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2))
        const newRadius = currentRadius + (targetRadius - currentRadius + intensity * 50) * 0.1

        p.x = centerX + Math.cos(angle) * newRadius
        p.y = centerY + Math.sin(angle) * newRadius

        // Update size based on frequency intensity
        p.size = 1 + frequencyIntensity * 3
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      requestAnimationFrame(animate)
    }

    createParticles()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles() // Recreate particles on resize
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [audioData])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
