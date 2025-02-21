"use client"
import React, { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function PulsatingNebula({ amplitude }: { amplitude: number }) {
  const meshRef = useRef<any>()
  const haloRef = useRef<any>()

  useFrame((state, delta) => {
    if (meshRef.current) {
      const scale = 1 + amplitude * 2
      meshRef.current.scale.set(scale, scale, scale)
      meshRef.current.rotation.y += delta * 0.5
    }
    if (haloRef.current) {
      const haloScale = 1.2 + amplitude * 1.5 + Math.sin(state.clock.elapsedTime) * 0.1
      haloRef.current.scale.set(haloScale, haloScale, haloScale)
      haloRef.current.rotation.y -= delta * 0.3
    }
  })

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          emissive="#8A2BE2" 
          emissiveIntensity={2} 
          color="purple" 
        />
      </mesh>
      <mesh ref={haloRef}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial 
          color="#4B0082" 
          opacity={0.5} 
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
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <StarryBackground />
      <PulsatingNebula amplitude={amplitude} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
