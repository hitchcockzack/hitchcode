"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export function Steps({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("relative mx-auto max-w-4xl", className)}>
      {/* Timeline rail */}
      <div aria-hidden className="absolute left-4 top-0 bottom-0 w-px bg-zinc-800 md:left-6" />
      {steps.map((step, idx) => (
        <li key={idx} className="relative pl-14 md:pl-20 py-6">
          {/* Node */}
          <div className="absolute left-0 top-6 h-8 w-8 md:h-10 md:w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            {step.icon ? (
              <span aria-hidden className="text-zinc-300">{step.icon}</span>
            ) : (
              <span className="text-xs md:text-sm font-semibold text-zinc-200">{idx + 1}</span>
            )}
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-zinc-100 leading-snug">{step.title}</h3>
          <p className="mt-2 text-zinc-400 leading-relaxed">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

export default Steps;

