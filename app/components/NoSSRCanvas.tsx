"use client"
import type { ComponentProps, ReactNode } from "react"
import { Canvas } from "@react-three/fiber"

type NoSSRCanvasProps = Omit<ComponentProps<typeof Canvas>, "children"> & {
  children: ReactNode
}

export default function NoSSRCanvas({ children, ...props }: NoSSRCanvasProps) {
  return <Canvas {...props}>{children}</Canvas>
}
