"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePersonalization } from "@/lib/personalization"

export default function FutureHero() {
  const { refreshEnvironment } = usePersonalization()

  useEffect(() => {
    refreshEnvironment()
  }, [refreshEnvironment])

  return (
    <section className="relative w-full overflow-visible pb-0 md:pb-28 bg-transparent min-h-[60vh] md:min-h-[60vh] flex items-center justify-center">
      <div className="relative z-[2] px-6">
        <div className="pointer-events-auto text-center max-w-6xl mx-auto pt-16 md:pt-20 relative z-30">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1] bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-500 drop-shadow-[0_0_18px_rgba(0,0,0,0.6)] text-left md:text-center md:px-8 pb-[6px] -mb-[6px] overflow-visible">
            Your One‑Person Systems Team
          </h1>
        </div>

        <div className="mx-auto max-w-4xl mt-3 md:mt-5 text-center">
          <p className="mx-auto max-w-3xl text-zinc-300 text-lg md:text-2xl leading-relaxed">
            I’m Zack — a full‑stack software developer and systems architect who designs AI agents, automations, and custom software that capture your progress once and for all. You've spent years perfecting your workflow, and now, with my help, your computer can do it for you.
          </p>
        </div>

        <div className="mx-auto max-w-6xl mt-5 md:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/contact" className="relative inline-flex items-center justify-center p-[3px] rounded-full group focus:outline-none">
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a21caf]" />
            <span className="px-7 py-4 bg-black rounded-full text-white text-base md:text-lg font-semibold relative transition-colors duration-200 group-hover:bg-transparent">Start the Conversation</span>
          </Link>
          <Link href="/demos" className="relative inline-flex items-center justify-center p-[3px] rounded-full group focus:outline-none">
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a21caf] opacity-60" />
            <span className="px-7 py-4 bg-zinc-950 rounded-full text-zinc-200 text-base md:text-lg font-semibold relative transition-colors duration-200 group-hover:bg-transparent group-hover:text-white">See Capabilities</span>
          </Link>
        </div>

        <div className="mx-auto max-w-5xl mt-6 md:mt-8 text-center">
          <p className="mx-auto max-w-3xl text-zinc-400 text-base md:text-lg leading-relaxed">
            Small footprint. Big leverage. I partner with a select group of clients and ship tools that make your business meaningfully easier to run.
          </p>
        </div>
      </div>
    </section>
  )
}
