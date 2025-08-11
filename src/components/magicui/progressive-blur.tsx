"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ProgressiveBlurProps = {
  position?: "top" | "bottom" | "both";
  height?: string; // e.g. '20%', '120px', '20vh'
  blur?: number; // px
  className?: string;
};

function TopBlur({ height, blur, className }: { height: string; blur: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-20",
        // Mask so blur fades out into the content
        "[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))]",
        className,
      )}
      style={{ height, backdropFilter: `blur(${blur}px)` }}
    />
  );
}

function BottomBlur({ height, blur, className }: { height: string; blur: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-20",
        "[mask-image:linear-gradient(to_top,rgba(0,0,0,1),rgba(0,0,0,0))]",
        className,
      )}
      style={{ height, backdropFilter: `blur(${blur}px)` }}
    />
  );
}

export function ProgressiveBlur({ position = "both", height = "22vh", blur = 10, className }: ProgressiveBlurProps) {
  if (position === "top") return <TopBlur height={height} blur={blur} className={className} />;
  if (position === "bottom") return <BottomBlur height={height} blur={blur} className={className} />;
  return (
    <>
      <TopBlur height={height} blur={blur} className={className} />
      <BottomBlur height={height} blur={blur} className={className} />
    </>
  );
}

export default ProgressiveBlur;
