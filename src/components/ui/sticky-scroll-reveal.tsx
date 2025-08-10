"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [proximities, setProximities] = useState<number[]>(() =>
    new Array(content.length).fill(0),
  );
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  // Compute proximity of each text block to viewport center and set activeCard accordingly
  const computeProximities = useCallback(() => {
    const viewportCenterY = window.innerHeight / 2;
    const nextProximities = itemRefs.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const elementCenterY = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenterY - viewportCenterY);
      const maxDistance = Math.max(viewportCenterY, 1);
      // Proximity in [0,1], where 1 = perfectly centered
      const proximity = Math.max(0, 1 - distance / maxDistance);
      return proximity;
    });

    setProximities(nextProximities);

    // Active card is the one with highest proximity
    let maxIndex = 0;
    let maxValue = -Infinity;
    for (let i = 0; i < nextProximities.length; i++) {
      if (nextProximities[i] > maxValue) {
        maxValue = nextProximities[i];
        maxIndex = i;
      }
    }
    setActiveCard(maxIndex);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current != null) return; // throttle to rAF
      rafRef.current = window.requestAnimationFrame(() => {
        computeProximities();
        rafRef.current && window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      });
    };
    computeProximities();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [computeProximities]);

  // Keep background solid black; no cycling or gradients.

  return (
    <motion.div
      className="relative flex flex-col md:flex-row w-full md:justify-center gap-6 md:gap-10 rounded-none p-0 md:px-10 md:py-0 bg-black"
      ref={sectionRef}
    >
      {/* Left: scrolling text */}
      <div className="relative flex items-start px-6 md:px-8 order-2 md:order-1">
        <div className="max-w-2xl">
          {content.map((item, index) => {
            const proximity = proximities[index] ?? 0;
            const opacity = 0.35 + 0.65 * proximity; // 0.35 -> 1 as it centers
            const brighten = 0.8 + 0.7 * proximity; // brightness(0.8 -> 1.5)
            return (
              <div
                key={item.title + index}
                className="my-20 will-change-transform"
                ref={(el) => (itemRefs.current[index] = el)}
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity }}
                  style={{ filter: `brightness(${brighten})` }}
                  className="text-2xl md:text-3xl font-bold text-slate-100"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity }}
                  style={{ filter: `brightness(${brighten})` }}
                  className="text-base md:text-lg mt-6 md:mt-10 max-w-sm text-slate-300"
                >
                  {item.description}
                </motion.p>
              </div>
            );
          })}
          {/* small buffer to let the last item center nicely without huge trailing space */}
          <div className="h-16" />
        </div>
      </div>

      {/* Right: sticky, vertically centered media block */}
      <div className="md:sticky top-0 h-[56vh] md:h-screen flex items-center justify-center px-4 order-1 md:order-2">
        <div
          className={cn(
            "relative block h-[56vh] sm:h-[58vh] md:h-[60vh] w-full md:w-[90vw] md:max-w-[30rem] overflow-visible",
            contentClassName,
          )}
        >
          {content[activeCard].content ?? null}
        </div>
      </div>
    </motion.div>
  );
};
