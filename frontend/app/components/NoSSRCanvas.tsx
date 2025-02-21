"use client"
import React from "react"
import { Canvas } from "@react-three/fiber"

export default function NoSSRCanvas({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return <Canvas {...props}>{children}</Canvas>
}
