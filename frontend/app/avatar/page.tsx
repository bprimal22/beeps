"use client"

import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import StarsBackground from "../components/stars-background" // added import
import { useFrame } from "@react-three/fiber"
import { Sphere } from "three"

// Dynamically import AvatarCanvas to disable SSR
const AvatarCanvas = dynamic(() => import("./AvatarCanvas"), { ssr: false })

function PulsatingSun({ amplitude }: { amplitude: number }) {
  const meshRef = useRef<any>()
  // animate sun scale with audio amplitude
  useFrame(() => {
    if (meshRef.current) {
      // Base scale of 1 with amplitude affecting pulsation
      const scale = 1 + amplitude * 2
      meshRef.current.scale.set(scale, scale, scale)
    }
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial emissive="gold" emissiveIntensity={1} color="orange" />
    </mesh>
  )
}

export default function AvatarPage() {
  const [mounted, setMounted] = useState(false)
  const [amplitude, setAmplitude] = useState(0)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function setupAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 256
        const source = audioCtx.createMediaStreamSource(stream)
        source.connect(analyser)
        analyserRef.current = analyser
        const bufferLength = analyser.frequencyBinCount
        dataArrayRef.current = new Uint8Array(bufferLength)

        const updateAmplitude = () => {
          if (analyserRef.current && dataArrayRef.current) {
            analyserRef.current.getByteFrequencyData(dataArrayRef.current)
            // compute an average amplitude in range [0,1]
            const avg = dataArrayRef.current.reduce((acc, val) => acc + val, 0) / dataArrayRef.current.length
            setAmplitude(avg / 255)
          }
          requestAnimationFrame(updateAmplitude)
        }
        updateAmplitude()
      } catch (err) {
        console.error("Audio input not available", err)
      }
    }
    setupAudio()
  }, [])

  return !mounted ? (
    <div />
  ) : (
    <div className="h-screen w-full bg-black relative">
      <StarsBackground /> {/* added star background */}
      <AvatarCanvas amplitude={amplitude} />
      <div className="absolute top-0 inset-x-0 text-center mt-8 text-white font-bold text-2xl">
        let's talk...
      </div>
    </div>
  )
}
