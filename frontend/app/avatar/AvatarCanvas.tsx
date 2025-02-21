"use client"
import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere } from "@react-three/drei"

function PulsatingSun({ amplitude }: { amplitude: number }) {
  const meshRef = useRef<any>()
  useFrame(() => {
    if (meshRef.current) {
      const scale = 1 + amplitude * 2
      meshRef.current.scale.set(scale, scale, scale)
    }
  })
  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshStandardMaterial emissive="gold" emissiveIntensity={1} color="orange" />
    </Sphere>
  )
}

export default function AvatarCanvas({ amplitude }: { amplitude: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <PulsatingSun amplitude={amplitude} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
