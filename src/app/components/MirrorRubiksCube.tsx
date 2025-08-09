"use client"

import { useMemo, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { ContactShadows, Environment, Edges } from "@react-three/drei"
import * as THREE from "three"

type MirrorRubiksCubeProps = React.ComponentProps<'group'> & {
  scaleFactor?: number
}

function Cubie({ position, size = 0.58 }: { position: [number, number, number]; size?: number }) {
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0.85, 0.88, 0.95),
    metalness: 1,
    roughness: 0.06,
    reflectivity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.35,
  }), [])

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size, size, size]} />
        <primitive object={material} attach="material" />
        <Edges threshold={6} color="#171717" />
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
    const auto = since > 3500 && !isDragging

    if (auto) {
      g.rotation.y += 0.25 * delta
      g.rotation.x += 0.12 * delta
      g.rotation.z += 0.06 * delta
    } else if (!isDragging) {
      // apply inertia
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

      // Select outer-layer cubies on the chosen face
      const threshold = 0.6
      const selected: THREE.Object3D[] = []
      for (const child of g.children) {
        const pos = child.position
        if (
          (axis === 'x' && (sign > 0 ? pos.x > threshold : pos.x < -threshold)) ||
          (axis === 'y' && (sign > 0 ? pos.y > threshold : pos.y < -threshold)) ||
          (axis === 'z' && (sign > 0 ? pos.z > threshold : pos.z < -threshold))
        ) {
          selected.push(child)
        }
      }

      // Attach selected to pivot to rotate as a unit
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
      const eased = 0.5 - 0.5 * Math.cos(Math.min(cur.t, 1) * Math.PI) // easeInOut
      const angle = eased * (Math.PI / 2) * cur.sign
      pivot.rotation.set(0, 0, 0)
      if (cur.axis === 'x') pivot.rotation.x = angle
      if (cur.axis === 'y') pivot.rotation.y = angle
      if (cur.axis === 'z') pivot.rotation.z = angle
      if (cur.t >= 1) {
        // bake transforms and reattach to main group
        const children = [...pivot.children]
        for (const c of children) g.attach(c)
        pivot.rotation.set(0, 0, 0)
        // prepare next adjacent face rotation in counter-direction
        twist.current.active = false
        twist.current.axisIndex = (twist.current.axisIndex + 1) % 3
        twist.current.sign = (cur.sign * -1) as 1 | -1
        twist.current.nextAt = performance.now() + 120 // short delay
      }
    }
  })

  const handlePointerDown: React.PointerEventHandler = (e) => {
    e.stopPropagation()
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    lastInteract.current = performance.now()
  }
  const handlePointerMove: React.PointerEventHandler = (e) => {
    if (!isDragging || !groupRef.current || !dragStart.current) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    groupRef.current.rotation.y += dx * 0.005
    groupRef.current.rotation.x += dy * 0.005
    velocity.current.vx = dx * 0.02
    velocity.current.vy = dy * 0.02
    dragStart.current = { x: e.clientX, y: e.clientY }
    lastInteract.current = performance.now()
  }
  const handlePointerUp: React.PointerEventHandler = (e) => {
    e.stopPropagation()
    setIsDragging(false)
    dragStart.current = null
    lastInteract.current = performance.now()
  }

  const cubies = useMemo(() => {
    const positions: [number, number, number][] = []
    const coords = [-1, 0, 1]
    for (const x of coords) for (const y of coords) for (const z of coords) {
      // Outer shell: include face centers and edges and corners; exclude only the invisible core
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
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {cubies.map((pos, i) => (
        <Cubie position={pos} key={i} />
      ))}
      {/* Pivot used for face twists */}
      <group ref={pivotRef} />
      <Environment preset="city" />
      <ContactShadows position={[0, -1.6, 0]} blur={2.5} opacity={0.35} scale={18} />
    </group>
  )
}
