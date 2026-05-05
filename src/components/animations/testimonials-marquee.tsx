"use client";

import { useMemo, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import type { TestimonialCopy } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface TestimonialsMarqueeProps {
  items: TestimonialCopy[];
  className?: string;
}

const buildLoopItems = (items: TestimonialCopy[]) => {
  if (items.length === 0) {
    return [] as TestimonialCopy[];
  }

  const repeatCount = items.length < 3 ? 4 : 2;
  return Array.from({ length: items.length * repeatCount }, (_, index) => items[index % items.length]);
};

const TestimonialsMarquee = ({ items, className }: TestimonialsMarqueeProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const loopItems = useMemo(() => buildLoopItems(items), [items]);
  const baseCount = items.length;

  useGSAP(
    () => {
      if (
        !trackRef.current ||
        loopItems.length === 0 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      let tween: gsap.core.Tween | null = null;

      const setupTicker = () => {
        tween?.kill();
        gsap.set(trackRef.current, { x: 0 });

        const trackWidth = trackRef.current?.scrollWidth ?? 0;
        const loopWidth = trackWidth / (baseCount < 3 ? 4 : 2);

        if (!loopWidth) {
          return;
        }

        const pxPerSecond = window.innerWidth < 768 ? 24 : 32;
        const duration = gsap.utils.clamp(32, 90, loopWidth / pxPerSecond);

        tween = gsap.to(trackRef.current, {
          x: -loopWidth,
          duration,
          ease: "none",
          repeat: -1,
        });
      };

      setupTicker();
      window.addEventListener("resize", setupTicker);

      return () => {
        window.removeEventListener("resize", setupTicker);
        tween?.kill();
      };
    },
    { scope: trackRef, dependencies: [loopItems.length, baseCount] },
  );

  if (loopItems.length === 0) {
    return null;
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={trackRef} className="flex w-max gap-6 md:gap-8">
        {loopItems.map((item, index) => (
          <article
            key={`${item.author}-${index}`}
            aria-hidden={index >= baseCount}
            className="w-[min(26rem,82vw)] rounded-2xl border border-foreground/14 bg-background/70 p-6 shadow-[0_25px_55px_-45px_rgba(15,23,42,0.35)] backdrop-blur"
          >
            <p className="text-sm leading-relaxed text-foreground/85">&ldquo;{item.quote}&rdquo;</p>
            <p className="mt-6 text-sm font-semibold text-foreground">{item.author}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.role}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsMarquee;
