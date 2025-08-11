"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Bento grid inspired by Aceternity UI, adapted for this codebase
// - Auto rows create consistent vertical rhythm
// - Cards expose spotlight-on-hover and subtle border to match site style

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 auto-rows-[10rem] gap-4 md:gap-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  className,
  children,
  as: Comp = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: any;
}) {
  // Spotlight hover uses CSS custom props so the gradient tracks pointer
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Comp
      onMouseMove={handleMouseMove}
      style={{
        // @ts-ignore CSS var typing
        "--x": `${coords.x}px`,
        // @ts-ignore CSS var typing
        "--y": `${coords.y}px`,
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60",
        "transition-colors duration-300 hover:border-zinc-700",
        className,
      )}
    >
      {/* Hover spotlight (kept subtle to match brand) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(500px circle at var(--x,50%) var(--y,50%), rgba(59,130,246,0.12), transparent 40%)",
        }}
      />

      <div className="relative h-full p-6 md:p-7 flex flex-col justify-between">
        {children}
      </div>
    </Comp>
  );
}

export default BentoGrid;

