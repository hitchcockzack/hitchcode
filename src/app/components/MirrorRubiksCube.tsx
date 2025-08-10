"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { ContactShadows, Edges, Environment, Lightformer } from "@react-three/drei"
import * as THREE from "three"

type MirrorRubiksCubeProps = React.ComponentProps<'group'> & {
  scaleFactor?: number
}

function Cubie({ position, size = 0.58 }: { position: [number, number, number]; size?: number }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size, size, size]} />
        {/* Toned, physically-based material that won't blow out with lights */}
        <meshPhysicalMaterial
          color={new THREE.Color(0.96, 0.96, 0.96)}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.75}
        />
        <Edges threshold={6} color="#0a0a0a" />
      </mesh>
    </group>
  )
}

export default function MirrorRubiksCube({ scaleFactor = 2.2, ...props }: MirrorRubiksCubeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const pivotRef = useRef<THREE.Group>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const velocity = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 })
  const lastInteract = useRef<number>(0)
  const { size } = useThree()
  const twist = useRef<{
    active: boolean
    axis: 'x' | 'y' | 'z'
    sign: 1 | -1
    t: number
    duration: number
    selection: THREE.Object3D[]
    nextAt: number
    axisIndex: number
  }>({ active: false, axis: 'y', sign: 1, t: 0, duration: 0.9, selection: [], nextAt: performance.now() + 1200, axisIndex: 0 })

  const scale = useMemo(() => {
    if (size.width < 480) return scaleFactor * 0.9
    if (size.width < 768) return scaleFactor * 1.05
    if (size.width < 1280) return scaleFactor * 1.2
    return scaleFactor * 1.3
  }, [size.width, scaleFactor])

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g) return

    const since = performance.now() - lastInteract.current
    const auto = since > 0 && !isDragging

    if (auto) {
      g.rotation.y += 0.25 * delta
      g.rotation.x += 0.12 * delta
      g.rotation.z += 0.06 * delta
    } else if (!isDragging) {
      g.rotation.y += velocity.current.vx * delta
      g.rotation.x += velocity.current.vy * delta
      velocity.current.vx *= 0.94
      velocity.current.vy *= 0.94
    }

    // Sequential face twist animation
    const now = performance.now()
    const pivot = pivotRef.current
    if (!pivot) return

    if (!twist.current.active && now > twist.current.nextAt) {
      const axes: Array<'x' | 'y' | 'z'> = ['x', 'y', 'z']
      const axis = axes[twist.current.axisIndex]
      const sign = twist.current.sign

      const threshold = 0.6
      const selected: THREE.Object3D[] = []
      for (const child of g.children) {
        const pos = (child as THREE.Object3D).position
        if (
          (axis === 'x' && (sign > 0 ? pos.x > threshold : pos.x < -threshold)) ||
          (axis === 'y' && (sign > 0 ? pos.y > threshold : pos.y < -threshold)) ||
          (axis === 'z' && (sign > 0 ? pos.z > threshold : pos.z < -threshold))
        ) {
          selected.push(child)
        }
      }

      for (const c of selected) pivot.attach(c)
      twist.current.active = true
      twist.current.axis = axis
      twist.current.sign = sign
      twist.current.t = 0
      twist.current.duration = 0.9
      twist.current.selection = selected
      twist.current.nextAt = now + 1600
    }

    if (twist.current.active) {
      const cur = twist.current
      cur.t += delta / cur.duration
      const eased = 0.5 - 0.5 * Math.cos(Math.min(cur.t, 1) * Math.PI)
      const angle = eased * (Math.PI / 2) * cur.sign
      pivot.rotation.set(0, 0, 0)
      if (cur.axis === 'x') pivot.rotation.x = angle
      if (cur.axis === 'y') pivot.rotation.y = angle
      if (cur.axis === 'z') pivot.rotation.z = angle
      if (cur.t >= 1) {
        const children = [...pivot.children]
        for (const c of children) g.attach(c)
        pivot.rotation.set(0, 0, 0)
        twist.current.active = false
        twist.current.axisIndex = (twist.current.axisIndex + 1) % 3
        twist.current.sign = (cur.sign * -1) as 1 | -1
        twist.current.nextAt = performance.now() + 120
      }
    }
  })

  const handlePointerDown: React.PointerEventHandler = () => {}
  const handlePointerMove: React.PointerEventHandler = () => {}
  const handlePointerUp: React.PointerEventHandler = () => {}

  const cubies = useMemo(() => {
    const positions: [number, number, number][] = []
    const coords = [-1, 0, 1]
    for (const x of coords) for (const y of coords) for (const z of coords) {
      if (x === 0 && y === 0 && z === 0) continue
      positions.push([x * 0.68, y * 0.68, z * 0.68])
    }
    return positions
  }, [])

  return (
    <group
      ref={groupRef}
      {...props}
      scale={[scale, scale, scale]}
    >
      {cubies.map((pos, i) => (
        <Cubie position={pos} key={i} />
      ))}
      <group ref={pivotRef} />
      <ContactShadows position={[0, -1.6, 0]} blur={2.2} opacity={0.4} scale={14} />

      {/* Balanced environment highlights for nice reflections without overexposure */}
      <Environment resolution={256} background={false} frames={1}>
        <group>
          <Lightformer form="rect" color="#2563eb" intensity={8} position={[0, 1, 10]} scale={[8, 4, 1]} rotation={[0, 0, 0]} />
          <Lightformer form="rect" color="#a21caf" intensity={6} position={[-3, -0.5, 10]} scale={[6, 3, 1]} rotation={[0, 0, 0]} />
          <Lightformer form="rect" color="#ffffff" intensity={2.5} position={[0, 2.5, 9]} scale={[2, 0.6, 1]} rotation={[0, 0, 0]} />
        </group>
      </Environment>
    </group>
  )
}
