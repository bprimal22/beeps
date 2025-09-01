"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import StarsBackground from "../components/stars-background";
import { useConversation } from "@elevenlabs/react";
import { PhoneCall, PhoneOff, Loader2 } from "lucide-react";

function CosmicVisualization({ amplitude = 0, mobile = false }) {
  const particlesRef = useRef<THREE.Points>(null);
  const wavesRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const geomRef = useRef<THREE.BufferGeometry>(null);

  // Device memory hint (stable across component lifetime)
  const deviceMem = useMemo(() => {
    if (typeof navigator !== "undefined" && "deviceMemory" in navigator) {
      const dm = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      if (typeof dm === "number" && dm > 0) return dm;
    }
    return 4;
  }, []);

  // Allocate once to a max size based on device memory; never changes length
  const maxCount = useMemo(() => (deviceMem <= 4 ? 4000 : 8000), [deviceMem]);

  // Effective draw count (can change without reallocating buffers)
  const effectiveCount = useMemo(() => {
    if (mobile) return Math.min(maxCount, deviceMem <= 3 ? 1500 : 2500);
    return Math.min(maxCount, deviceMem <= 4 ? 4000 : 8000);
  }, [mobile, maxCount, deviceMem]);

  // Precompute base positions and colors once
  const { basePositions, positions, colors } = useMemo(() => {
    const base = new Float32Array(maxCount * 3);
    const pos = new Float32Array(maxCount * 3);
    const col = new Float32Array(maxCount * 3);
    const tmpColor = new THREE.Color();

    for (let i = 0; i < maxCount; i++) {
      // Spiral-ish distribution for a denser core, looks cooler
      const r = 220 + Math.random() * 320;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(Math.random() * 2 - 1);

      const x = r * Math.sin(p) * Math.cos(t);
      const y = r * Math.sin(p) * Math.sin(t);
      const z = r * Math.cos(p);

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
      // initialize current positions to base
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Varied colors; keep static per-vertex for perf
      tmpColor.setHSL(
        0.52 + Math.random() * 0.25,
        0.6 + Math.random() * 0.35,
        0.5 + Math.random() * 0.4
      );
      col[i * 3] = tmpColor.r;
      col[i * 3 + 1] = tmpColor.g;
      col[i * 3 + 2] = tmpColor.b;
    }
    return { basePositions: base, positions: pos, colors: col };
  }, [maxCount]);

  // Update drawRange when effectiveCount changes, no reallocation
  useEffect(() => {
    if (geomRef.current) {
      geomRef.current.setDrawRange(0, effectiveCount);
    }
  }, [effectiveCount]);

  // Animate
  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const time = state.clock.elapsedTime;
    const pts = particlesRef.current;

    // Smooth rotation
    pts.rotation.y += delta * 0.2 * (1 + amplitude * 1.5);
    pts.rotation.x += delta * 0.05;

    // Update material once per frame
    if (materialRef.current) {
      // Soft size pulse
      const sizePulse = 2.2 + Math.sin(time * 2) * 0.6 + amplitude * 1.5;
      materialRef.current.size = mobile ? Math.min(2.5, sizePulse) : sizePulse;
      // Global hue shift for a subtle color drift
      const hue = (0.55 + Math.sin(time * 0.15 + amplitude) * 0.05) % 1;
      materialRef.current.color.setHSL(hue, 0.65, 0.55);
    }

    // Geometry deformations
    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const base = basePositions;

    if (!mobile) {
      // Desktop: do a ripple pulse using base positions
      const k = 1 + amplitude * 0.35; // global expansion factor
      for (let i = 0; i < effectiveCount * 3; i += 3) {
        const bx = base[i];
        const by = base[i + 1];
        const bz = base[i + 2];
        const dist = Math.sqrt(bx * bx + by * by + bz * bz);
        const pulse = 1 + Math.sin(time * 2 + dist * 0.008) * amplitude * 0.8;
        const s = k * pulse;
        arr[i] = bx * s;
        arr[i + 1] = by * s;
        arr[i + 2] = bz * s;
      }
      posAttr.needsUpdate = true;
    } else {
      // Mobile: lighter update — only global scale, no per-vertex trig
      const s = 1 + amplitude * 0.25 + Math.sin(time * 1.5) * 0.05;
      for (let i = 0; i < effectiveCount * 3; i += 3) {
        arr[i] = base[i] * s;
        arr[i + 1] = base[i + 1] * s;
        arr[i + 2] = base[i + 2] * s;
      }
      posAttr.needsUpdate = true;
    }

    // Accent meshes
    if (wavesRef.current) {
      wavesRef.current.rotation.x += delta * (0.4 + amplitude);
      wavesRef.current.rotation.y += delta * (0.2 + amplitude * 0.7);
      const waveScale = 1 + amplitude * 1.2 + Math.sin(time * 1.2) * 0.05;
      wavesRef.current.scale.setScalar(waveScale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.6;
      const rPulse = 1 + amplitude * 0.6 + Math.sin(time * 2.5) * 0.03;
      ringRef.current.scale.setScalar(rPulse);
    }
  });

  return (
    <group>
      <points ref={particlesRef}>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute attach="attributes-position" count={maxCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={maxCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          size={2.2}
          sizeAttenuation
          transparent
          opacity={0.95}
          color={new THREE.Color(0x66ccff)}
          vertexColors
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Wireframe wave sphere as a core pulse */}
      <mesh ref={wavesRef}>
        <sphereGeometry args={[200, 48, 48]} />
        <meshPhongMaterial
          color={0x00ffff}
          wireframe
          transparent
          opacity={0.25 + amplitude * 0.35}
          shininess={100}
          emissive={0x00ffff}
          emissiveIntensity={0.3 + amplitude * 0.7}
        />
      </mesh>
      {/* Outer ring accent */}
      <mesh ref={ringRef}>
        <torusGeometry args={[380, 6, 16, 200]} />
        <meshBasicMaterial color={0x00ffff} transparent opacity={0.2} />
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
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const [isConnecting, setIsConnecting] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected");
      setIsConnecting(false);
    },
    onDisconnect: () => {
      console.log("Disconnected");
      setIsConnecting(false);
    },
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
    // Env hints for perf/responsiveness
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onRMChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener?.("change", onRMChange);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

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
    return () => {
      window.removeEventListener("resize", checkMobile);
      mql.removeEventListener?.("change", onRMChange);
    };
  }, []);

  const startConversation = useCallback(async () => {
    try {
      // Microphone permission is already requested in useEffect,
      // but we include it here to ensure compatibility with the hook
      setIsConnecting(true);
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "YOUR_PUBLIC_AGENT_ID",
        connectionType: "webrtc",
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setIsConnecting(false);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    setIsConnecting(false);
    await conversation.endSession();
  }, [conversation]);

  return !mounted ? (
    <div />
  ) : (
    <div className="h-screen w-full bg-black relative">
      <StarsBackground />
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 1000], fov: 75 }}
          dpr={reducedMotion ? 1 : isMobile ? [1, 1.5] : [1, 2]}
          gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
          shadows={false}
        >
          <fog attach="fog" args={[0x000000, 800, 1600]} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[0, 0, 300]} intensity={1} color={0x00ffff} />
          <CosmicVisualization amplitude={reducedMotion ? 0 : amplitude} mobile={isMobile} />
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />
        </Canvas>
      </div>
      <div className="absolute top-0 inset-x-0 text-center mt-8 text-white font-bold text-2xl z-10">
        talk to me ...
      </div>
      <div className="absolute bottom-0 inset-x-0 flex flex-col items-center mb-10 space-y-3 z-10">
        <button
          aria-label={
            isConnecting ? "Connecting" : conversation.status === "connected" ? "End Call" : "Start Call"
          }
          onClick={
            isConnecting
              ? undefined
              : conversation.status === "connected"
              ? stopConversation
              : startConversation
          }
          disabled={isConnecting}
          className={`group relative h-14 w-14 sm:h-16 sm:w-16 rounded-full flex items-center justify-center 
            transition-all duration-300 shadow-lg 
            ${conversation.status === "connected" ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"}
            ${isConnecting ? "opacity-80" : ""}`}
        >
          {/* Pulse ring on idle and connecting */}
          <span
            className={`pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/30 
              ${isConnecting ? "animate-ping" : conversation.status !== "connected" ? "animate-pulse" : ""}`}
          />
          {isConnecting ? (
            <Loader2 className="h-6 w-6 sm:h-7 sm:w-7 text-white animate-spin" />
          ) : conversation.status === "connected" ? (
            <PhoneOff className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          ) : (
            <PhoneCall className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          )}
        </button>
        <p className="text-white/90 text-sm sm:text-base font-medium tracking-wide">
          {isConnecting ? "Connecting…" : conversation.status === "connected" ? "Connected" : "Tap to call"}
        </p>
        {responseText && (
          <p className="text-white/80 text-center text-sm sm:text-base max-w-xl px-6">{responseText}</p>
        )}
      </div>
    </div>
  );
}
