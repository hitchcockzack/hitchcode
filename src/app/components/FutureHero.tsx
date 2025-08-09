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
    <section className="relative w-full overflow-visible pb-20 md:pb-28">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black z-0" />

      <div className="relative z-10 px-6">
        <div className="pointer-events-auto text-center max-w-6xl mx-auto pt-20 md:pt-28">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-500 drop-shadow-[0_0_18px_rgba(0,0,0,0.6)] text-left md:text-center md:px-8">
            Building Tomorrow’s Systems Today
          </h1>
        </div>

        {/* Side-by-side layout: subtext + CTA left, cube right; stacks on mobile */}
        <div className="mx-auto max-w-6xl mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left column: subtext + CTAs */}
          <div className="text-center md:text-left">
            <p className="mx-auto md:mx-0 max-w-2xl text-zinc-400 text-lg md:text-2xl leading-relaxed">
              Ultra-minimal on the surface. Unapologetically complex under the hood. Bespoke systems, intelligent automation, and real-time architectures that scale.
            </p>
          </div>

          {/* Right column: cube scene */}
          <div className="relative">
            <div className="w-full h-[40vh] sm:h-[48vh] md:h-[56vh] lg:h-[64vh] xl:h-[72vh]">
              <Canvas
                className="pointer-events-none block w-full h-full"
                camera={{ position: [0, 0, 9.0], fov: 60 }}
                dpr={[1, 2]}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
                <Suspense fallback={null}>
                  <MirrorRubiksCube position={[0, 0.6, 0]} scaleFactor={1.1} />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
              </Canvas>
            </div>
          </div>
        </div>

        {/* CTA buttons centered below the split section */}
        <div className="mx-auto max-w-6xl mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 px-7 py-4 text-base md:text-lg font-semibold text-white shadow-[0_8px_30px_rgba(37,99,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(37,99,235,0.35)] focus:outline-none focus:ring-2 focus:ring-blue-400/60"
          >
            <span className="relative">Start the Conversation</span>
          </Link>
          <Link
            href="/services/full-stack-development"
            className="inline-flex items-center justify-center rounded-full border border-zinc-700/60 bg-gradient-to-b from-zinc-900/60 to-zinc-800/40 backdrop-blur px-7 py-4 text-base md:text-lg font-semibold text-zinc-200 hover:text-white hover:border-zinc-600 transition-all duration-200 hover:-translate-y-0.5"
          >
            See Capabilities
          </Link>
        </div>
      </div>

      {/* CTA buttons placed below the cube */}
      <div className="relative z-10 mt-6 md:mt-8 px-6 pointer-events-auto">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 px-7 py-4 text-base md:text-lg font-semibold text-white shadow-[0_8px_30px_rgba(37,99,235,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(37,99,235,0.35)] focus:outline-none focus:ring-2 focus:ring-blue-400/60"
          >
            <span className="relative">Start the Conversation</span>
          </Link>
          <Link
            href="/services/full-stack-development"
            className="inline-flex items-center justify-center rounded-full border border-zinc-700/60 bg-gradient-to-b from-zinc-900/60 to-zinc-800/40 backdrop-blur px-7 py-4 text-base md:text-lg font-semibold text-zinc-200 hover:text-white hover:border-zinc-600 transition-all duration-200 hover:-translate-y-0.5"
          >
            See Capabilities
          </Link>
        </div>
      </div>
    </section>
  )
}
