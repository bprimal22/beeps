"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import StarsBackground from "../components/stars-background";
import { useConversation } from "@elevenlabs/react";

function CosmicVisualization({ amplitude = 0 }) {
  const particlesRef = useRef<THREE.Points>(null);
  const wavesRef = useRef<THREE.Mesh>(null);

  // Increase particle count from 4000 to 10000
  const particleCount = 10000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    // Adjust radius range for denser core
    const radius = 250 + Math.random() * 300;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const color = new THREE.Color();
    // Add more color variation
    color.setHSL(
      0.5 + Math.random() * 0.3, // More color variation in hue
      0.6 + Math.random() * 0.4, // Higher saturation
      0.5 + Math.random() * 0.5  // Brighter luminosity
    );

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  useFrame((state, delta) => {
    if (particlesRef.current && wavesRef.current) {
      particlesRef.current.rotation.y += delta * 0.1 * (1 + amplitude * 2);
      const positions = particlesRef.current.geometry.attributes.position.array;
      const time = state.clock.elapsedTime;

      const baseRadius = 300 + amplitude * 500;
      for (let i = 0; i < positions.length; i += 3) {
        const originalX = positions[i];
        const originalY = positions[i + 1];
        const originalZ = positions[i + 2];
        const distance = Math.sqrt(originalX ** 2 + originalY ** 2 + originalZ ** 2);
        const pulseFactor = 1 + amplitude * Math.sin(time * 2 + distance * 0.01) * 1.5;
        const scaleFactor = (baseRadius / 300) * pulseFactor;

        positions[i] = originalX * scaleFactor;
        positions[i + 1] = originalY * scaleFactor;
        positions[i + 2] = originalZ * scaleFactor;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      wavesRef.current.rotation.x += delta * (0.5 + amplitude * 2);
      wavesRef.current.rotation.y += delta * (0.2 + amplitude * 1.5);
      wavesRef.current.scale.setScalar(1 + amplitude * 1.5);

      const colors = particlesRef.current.geometry.attributes.color.array;
      for (let i = 0; i < colors.length; i += 3) {
        const color = new THREE.Color();
        color.setHSL(0.6 + amplitude * 0.2, 0.5 + amplitude * 0.5, 0.4 + amplitude * 0.6);
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
          size={3 + amplitude * 2} // Reduced base size for better density
          transparent
          vertexColors
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh ref={wavesRef}>
        <sphereGeometry args={[200, 64, 64]} />
        <meshPhongMaterial
          color={0x00ffff}
          transparent
          opacity={0.3 + amplitude * 0.3}
          shininess={100}
          emissive={0x00ffff}
          emissiveIntensity={0.5 + amplitude * 0.5}
        />
      </mesh>
    </group>
  );
}

type ExactUint8Array = Uint8Array<ArrayBuffer>;

export default function AvatarPage() {
  const [mounted, setMounted] = useState(false);
  const [amplitude, setAmplitude] = useState(0);
  const [responseText, setResponseText] = useState("");
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message: unknown) => {
      console.log("Message:", message);
      let text = "";
      if (typeof message === "object" && message !== null && "text" in message) {
        const maybeText = (message as { text?: unknown }).text;
        if (typeof maybeText === "string") text = maybeText;
      }
      setResponseText(text);
    },
    onError: (error: unknown) => console.error("Error:", error),
  });

  useEffect(() => {
    setMounted(true);
    async function setupAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const AudioContextCtor: typeof AudioContext =
          window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const audioCtx = new AudioContextCtor();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyserRef.current = analyser;
        const bufferLength = analyser.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        const updateAmplitude = () => {
          if (analyserRef.current && dataArrayRef.current) {
            analyserRef.current.getByteFrequencyData(
              dataArrayRef.current as unknown as ExactUint8Array
            );
            const avg =
              dataArrayRef.current.reduce((acc, val) => acc + val, 0) /
              dataArrayRef.current.length;
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

  const startConversation = useCallback(async () => {
    try {
      // Microphone permission is already requested in useEffect,
      // but we include it here to ensure compatibility with the hook
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "YOUR_PUBLIC_AGENT_ID",
        connectionType: "webrtc",
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return !mounted ? (
    <div />
  ) : (
    <div className="h-screen w-full bg-black relative">
      <StarsBackground />
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 1000], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <pointLight position={[0, 0, 300]} intensity={1} color={0x00ffff} />
          <CosmicVisualization amplitude={amplitude} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <div className="absolute top-0 inset-x-0 text-center mt-8 text-white font-bold text-2xl z-10">
        talk to me ...
      </div>
      <div className="absolute bottom-0 inset-x-0 flex flex-col items-center mb-8 space-y-4 z-10">
        <div className="flex space-x-4">
          <button
            onClick={startConversation}
            disabled={conversation.status === "connected"}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
            disabled:bg-gray-300 transition-all duration-300 transform hover:scale-105
            font-semibold tracking-wide shadow-lg hover:shadow-blue-500/50"
          >
            {conversation.status === "connected" ? "Connected" : "Start Conversation"}
          </button>
          <button
            onClick={stopConversation}
            disabled={conversation.status !== "connected"}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg 
            disabled:bg-gray-300 transition-all duration-300 transform hover:scale-105
            font-semibold tracking-wide shadow-lg hover:shadow-red-500/50"
          >
            End Conversation
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`h-3 w-3 rounded-full ${
            conversation.status === "connected" ? "bg-green-500" : "bg-gray-500"
          } animate-pulse`}></div>
          <p className="text-white text-sm font-medium uppercase tracking-wider">
            {conversation.status}
          </p>
        </div>
        <p className="text-white/90 text-lg">{responseText}</p>
      </div>
    </div>
  );
}
