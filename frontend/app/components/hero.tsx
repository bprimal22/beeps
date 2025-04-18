"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

type Command = {
  command: string
  description: string
  action: () => string
  showInHelp?: boolean  // New property to control visibility in help commands
}

const WELCOME_MESSAGE = "Type 'help' for available commands."

export default function Hero() {
  const router = useRouter()

  const commands: Command[] = [
    {
      command: "talk",
      description: "talk to AI BP!",
      action: () => {
        router.push("/avatar")
        return "Waking AI BP up..."
      },
      showInHelp: true
    },
    {
      command: "resume",
      description: "see BP's resume",
      action: () => {
        router.push("/resume")  
        return "Navigating to resume page..."
      },
      showInHelp: true
    },
    {
      command: "writings",
      description: "check out BP's writings",
      action: () => {
        router.push("/writings")
        return "Navigating to writings page..."
      },
      showInHelp: true
    },
    {
      command: "help",
      description: "List available commands",
      action: () => commands
        .filter(cmd => cmd.showInHelp)
        .map((cmd) => 
          `<span class="text-green-400 font-bold">${cmd.command}</span>: ${cmd.description}`
        ).join("\n")
    },
    {
      command: "ls", 
      description: "List available commands",
      action: () => commands
        .filter(cmd => cmd.showInHelp)
        .map((cmd) => 
          `<span class="text-green-400 font-bold">${cmd.command}</span>`
        ).join(" ")
    },
    {
      command: "clear",
      description: "Clear the terminal",
      action: () => ""
    },
  ]

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [input, setInput] = useState("")
  
  // Initialize output with welcome message and help command result
  const helpCommandOutput = commands.find(cmd => cmd.command === "help")?.action() || ""
  const [output, setOutput] = useState<string[]>([
    "Welcome to BP Rimal's terminal. Type 'help' for available commands.",
    "> help",
    helpCommandOutput
  ])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedInput = input.trim().toLowerCase()
    const command = commands.find((cmd) => cmd.command === trimmedInput)

    if (command) {
      if (command.command === "clear") {
        setOutput([WELCOME_MESSAGE])
      } else {
        setOutput([...output, `> ${input}`, command.action()])
      }
    }

    setInput("")
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <motion.h1
          className="mb-6 text-6xl font-black tracking-tighter sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          BP RIMAL
        </motion.h1>
        <motion.p
          className="max-w-[600px] text-lg text-gray-400 sm:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Building cool shits with AI
        </motion.p>
        <motion.div
          className="w-full max-w-3xl bg-black bg-opacity-75 p-6 rounded-lg border border-gray-700 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="h-96 overflow-auto mb-4 font-mono text-sm space-y-2">
            {output.map((line, index) => (
              <div 
                key={index} 
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: line.startsWith(">") ? line : line.replace(/\n/g, '<br/>') 
                }}
              />
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center border-t border-gray-700 pt-4">
            <span className="text-green-400 mr-2 font-bold">$</span>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="flex-grow bg-transparent outline-none text-white font-mono text-lg"
              autoFocus
            />
          </form>
        </motion.div>
      </div>
    </div>
  )
}

