"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface InfiniteMarqueeProps {
  text: string;
  className?: string;
}

const InfiniteMarquee = ({ text, className }: InfiniteMarqueeProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      if (
        !trackRef.current ||
        !itemRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      let tween: gsap.core.Tween | null = null;

      const setupTicker = () => {
        tween?.kill();
        gsap.set(trackRef.current, { x: 0 });

        const itemWidth = itemRef.current?.offsetWidth ?? 0;

        if (itemWidth === 0) {
          return;
        }

        const pxPerSecond = window.innerWidth < 768 ? 22 : 28;
        const duration = gsap.utils.clamp(40, 120, itemWidth / pxPerSecond);

        tween = gsap.fromTo(
          trackRef.current,
          {
            x: 0,
          },
          {
            x: -itemWidth,
            duration,
            ease: "none",
            repeat: -1,
          },
        );
      };

      setupTicker();
      window.addEventListener("resize", setupTicker);

      return () => {
        window.removeEventListener("resize", setupTicker);
        tween?.kill();
      };
    },
    { scope: trackRef, dependencies: [text] },
  );

  const repeated = Array.from({ length: 6 }, () => text).join("  //  ");

  return (
    <div className={className} aria-label={text}>
      <div className="overflow-hidden border-y border-foreground/14 py-4 md:py-6">
        <div ref={trackRef} className="flex w-max items-center motion-safe:will-change-transform">
          <p ref={itemRef} className="marquee-line shrink-0 pr-20 md:pr-24">
            {repeated}
          </p>
          <p className="marquee-line shrink-0 pr-20 md:pr-24" aria-hidden>
            {repeated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
