"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import dynamic from 'next/dynamic';
import StarsBackground from "../components/stars-background";

function CosmicVisualization({ amplitude = 0 }) {
  const particlesRef = useRef<THREE.Points>(null);
  const wavesRef = useRef<THREE.Mesh>(null);

  // Initialize particle system
  const particleCount = 4000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const radius = 300 + Math.random() * 200;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
    
    const color = new THREE.Color();
    color.setHSL(0.6 + Math.random() * 0.2, 0.5 + Math.random() * 0.5, 0.4 + Math.random() * 0.4);
    
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  useFrame((state, delta) => {
    if (particlesRef.current && wavesRef.current) {
      // Animate particles with increased sensitivity
      particlesRef.current.rotation.y += delta * 0.1 * (1 + amplitude * 2);
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      
      // Base radius that will be affected by audio
      const baseRadius = 300 + amplitude * 500; // Increased amplitude effect
      
      for (let i = 0; i < positions.length; i += 3) {
        const originalX = positions[i];
        const originalY = positions[i + 1];
        const originalZ = positions[i + 2];
        
        const distance = Math.sqrt(
          originalX ** 2 + 
          originalY ** 2 + 
          originalZ ** 2
        );
        
        // More dramatic pulsing effect
        const pulseFactor = 1 + amplitude * Math.sin(time * 2 + distance * 0.01) * 1.5;
        // Scale factor that affects the overall size
        const scaleFactor = (baseRadius / 300) * pulseFactor;
        
        positions[i] = originalX * scaleFactor;
        positions[i + 1] = originalY * scaleFactor;
        positions[i + 2] = originalZ * scaleFactor;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      // More responsive wave animation
      wavesRef.current.rotation.x += delta * (0.5 + amplitude * 2);
      wavesRef.current.rotation.y += delta * (0.2 + amplitude * 1.5);
      wavesRef.current.scale.setScalar(1 + amplitude * 1.5); // Increased scale response
      
      // Update colors based on amplitude
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
      for (let i = 0; i < colors.length; i += 3) {
        const color = new THREE.Color();
        // Shift color hue based on amplitude
        color.setHSL(
          0.6 + amplitude * 0.2, // Base blue-purple shifting with amplitude
          0.5 + amplitude * 0.5, // Increased saturation with amplitude
          0.4 + amplitude * 0.6  // Increased brightness with amplitude
        );
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={4 + amplitude * 2} // Dynamic particle size
          transparent
          vertexColors
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh ref={wavesRef}>
        <torusGeometry args={[200, 3 + amplitude * 5, 16, 100]} /> {/* Dynamic torus thickness */}
        <meshBasicMaterial
          color={0x00ffff}
          transparent
          opacity={0.7 + amplitude * 0.3} // Dynamic opacity
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function AvatarPage() {
  const [mounted, setMounted] = useState(false);
  const [amplitude, setAmplitude] = useState(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    setMounted(true);
    async function setupAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyserRef.current = analyser;
        const bufferLength = analyser.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        const updateAmplitude = () => {
          if (analyserRef.current && dataArrayRef.current) {
            analyserRef.current.getByteFrequencyData(dataArrayRef.current);
            // compute an average amplitude in range [0,1]
            const avg = dataArrayRef.current.reduce((acc, val) => acc + val, 0) / dataArrayRef.current.length;
            setAmplitude(avg / 255);
          }
          requestAnimationFrame(updateAmplitude);
        };
        updateAmplitude();
      } catch (err) {
        console.error("Audio input not available", err);
      }
    }
    setupAudio();
  }, []);

  return !mounted ? (
    <div />
  ) : (
    <div className="h-screen w-full bg-black relative">
      <StarsBackground />
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 1000], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <CosmicVisualization amplitude={amplitude} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <div className="absolute top-0 inset-x-0 text-center mt-8 text-white font-bold text-2xl z-10">
        talk to me ...
      </div>
    </div>
  );
}