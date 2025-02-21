"use client"

import { useEffect, useState, useRef } from "react"
import ParticleConstellation from "./particle-constellation"

export default function Avatar2Page() {
  const [mounted, setMounted] = useState(false)
  const [audioData, setAudioData] = useState<number[]>([])
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)

  useEffect(() => {
    setMounted(true)
    async function setupAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        const audioCtx = new AudioContext()
        const analyser = audioCtx.createAnalyser()
        analyser.fftSize = 256
        const source = audioCtx.createMediaStreamSource(stream)
        source.connect(analyser)
        analyserRef.current = analyser
        const bufferLength = analyser.frequencyBinCount
        dataArrayRef.current = new Uint8Array(bufferLength)

        const updateAudioData = () => {
          if (analyserRef.current && dataArrayRef.current) {
            analyserRef.current.getByteFrequencyData(dataArrayRef.current)
            setAudioData(Array.from(dataArrayRef.current))
          }
          requestAnimationFrame(updateAudioData)
        }
        updateAudioData()
      } catch (err) {
        console.error("Audio input not available", err)
      }
    }
    setupAudio()
  }, [])

  return !mounted ? (
    <div />
  ) : (
    <div className="relative h-screen w-full bg-black">
      {/* Optional overlay UI */}
      <div className="absolute top-0 inset-x-0 text-center mt-8 text-white font-bold text-2xl z-10">
        talk to me ...
      </div>
      <ParticleConstellation audioData={audioData} />
    </div>
  )
}