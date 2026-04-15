"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

interface InfiniteMarqueeProps {
  items: string[];
  className?: string;
  duration?: number;
}

const InfiniteMarquee = ({
  items,
  className,
  duration = 28,
}: InfiniteMarqueeProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!trackRef.current || items.length === 0) {
        return;
      }

      const halfWidth = trackRef.current.scrollWidth / 2;
      const tween = gsap.fromTo(
        trackRef.current,
        { x: 0 },
        {
          x: -halfWidth,
          ease: "none",
          duration,
          repeat: -1,
        },
      );

      return () => {
        tween.kill();
      };
    },
    { scope: trackRef, dependencies: [duration, items] },
  );

  const sequence = [...items, ...items];

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        ref={trackRef}
        className="flex w-max items-center gap-8 py-6 text-sm font-medium tracking-[0.16em] text-foreground/78 uppercase"
        aria-hidden="true"
      >
        {sequence.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-8">
            {item}
            <span className="size-1 rounded-full bg-foreground/55" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfiniteMarquee;
