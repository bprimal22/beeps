"use client"
import React, { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function PulsatingSun({ amplitude }: { amplitude: number }) {
  const coreRef = useRef<any>()
  const coronaRef = useRef<any>()
  const atmosphereRef = useRef<any>()

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    
    if (coreRef.current) {
      const scale = 1 + amplitude * 1.5
      coreRef.current.scale.set(scale, scale, scale)
      coreRef.current.rotation.y += delta * 0.2

      // Make the core more orange-yellow and brighter with amplitude
      const temperature = 50 + amplitude * 20
      const color = new THREE.Color(`hsl(${temperature}, 100%, 60%)`)
      coreRef.current.material.emissiveIntensity = 2 + amplitude * 3
      coreRef.current.material.color = color
    }

    if (coronaRef.current) {
      const coronaScale = 1.3 + amplitude * 2 + Math.sin(time * 2) * 0.1
      coronaRef.current.scale.set(coronaScale, coronaScale, coronaScale)
      coronaRef.current.rotation.y -= delta * 0.1
      coronaRef.current.material.opacity = 0.3 + amplitude * 0.3
    }

    if (atmosphereRef.current) {
      const atmoScale = 1.1 + amplitude + Math.sin(time * 3) * 0.05
      atmosphereRef.current.scale.set(atmoScale, atmoScale, atmoScale)
      atmosphereRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <>
      {/* Core of the sun */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial 
          emissive="#FF7700"
          emissiveIntensity={2}
          color="#FFA500"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Inner atmosphere/chromosphere */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshPhongMaterial 
          color="#FF4500"
          opacity={0.4}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial 
          color="#FDB813"
          opacity={0.2}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  )
}

function StarryBackground() {
  const pointsRef = useRef<any>()
  const [positions, setPositions] = useState<Float32Array>()

  useEffect(() => {
    const stars = new Float32Array(5000 * 3)
    for (let i = 0; i < stars.length; i++) {
      stars[i] = (Math.random() - 0.5) * 100
    }
    setPositions(stars)
  }, [])

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial size={0.1} color="#FFFFFF" />
    </Points>
  )
}

export default function AvatarCanvas({ amplitude }: { amplitude: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} distance={10} decay={2} />
      <StarryBackground />
      <PulsatingSun amplitude={amplitude} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
