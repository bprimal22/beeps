"use client"

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 0.1,
    speedX: Math.random() * 2 - 1,
    speedY: Math.random() * 2 - 1,
  }
}

function updateParticle(particle: Particle, width: number, height: number) {
  particle.x += particle.speedX
  particle.y += particle.speedY

  if (particle.x > width) particle.x = 0
  if (particle.x < 0) particle.x = width
  if (particle.y > height) particle.y = 0
  if (particle.y < 0) particle.y = height
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
  ctx.fill()
}

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        updateParticle(particle, canvas.width, canvas.height)
        drawParticle(ctx, particle)
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />
}
