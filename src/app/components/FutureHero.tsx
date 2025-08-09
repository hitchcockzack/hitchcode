"use client"

import { Suspense, useEffect } from "react"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { usePersonalization } from "@/lib/personalization"
import MirrorRubiksCube from "./MirrorRubiksCube"

export default function FutureHero() {
  const { refreshEnvironment } = usePersonalization()

  useEffect(() => {
    refreshEnvironment()
  }, [refreshEnvironment])

  return (
    <section className="relative min-h-[120vh] md:min-h-[140vh] w-full overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black z-0" />

      {/* Embedded scene that scrolls with the hero */}
      <Canvas
        className="pointer-events-none absolute inset-0 z-10"
        camera={{ position: [0, 0, 6.6], fov: 60 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Suspense fallback={null}>
          <MirrorRubiksCube position={[1.8, -0.6, -1.2]} scaleFactor={1.0} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      <div className="relative z-20 flex items-center justify-center px-6">
        <div className="pointer-events-auto text-center max-w-[90rem] mx-auto pt-24 md:pt-36">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-500 drop-shadow-[0_0_18px_rgba(0,0,0,0.6)]">
            Building Tomorrow’s Systems Today
          </h1>
          <p className="mt-5 text-zinc-400 text-lg md:text-2xl leading-relaxed">
            Ultra-minimal on the surface. Unapologetically complex under the hood. Bespoke systems, intelligent automation, and real-time architectures that scale.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 text-lg font-semibold shadow-[0_0_24px_rgba(37,99,235,0.3)] transition-transform hover:scale-[1.02]">
              Start the Conversation
            </Link>
            <Link href="/services/full-stack-development" className="inline-flex items-center justify-center rounded-xl border border-zinc-800 text-zinc-200 hover:text-white hover:border-zinc-700 px-7 py-4 text-lg font-semibold">
              See Capabilities
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
