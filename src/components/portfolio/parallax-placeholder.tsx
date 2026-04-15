"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ParallaxPlaceholderProps {
  title: string;
  subtitle: string;
  index: number;
  className?: string;
}

const tones = [
  "from-[#ece8df] via-[#e4e7eb] to-[#d2dbe4]",
  "from-[#efe8e2] via-[#e6ecec] to-[#d7e2dd]",
  "from-[#edeae5] via-[#e1e6ee] to-[#d2d6de]",
];

const ParallaxPlaceholder = ({
  title,
  subtitle,
  index,
  className,
}: ParallaxPlaceholderProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!rootRef.current || !mediaRef.current) {
        return;
      }

      const tween = gsap.fromTo(
        mediaRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      return () => {
        tween.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={cn("h-full w-full overflow-hidden", className)}>
      <div
        ref={mediaRef}
        className={cn(
          "flex h-full w-full flex-col justify-end bg-linear-to-br px-7 py-8 md:px-10 md:py-10",
          tones[index % tones.length],
        )}
      >
        <p className="text-xs tracking-[0.16em] text-foreground/65 uppercase">
          Placeholder Visual
        </p>
        <p className="mt-3 font-heading text-[clamp(1.7rem,4vw,3.2rem)] leading-[0.92] font-semibold tracking-tight text-foreground">
          {title}
        </p>
        <p className="mt-2 text-sm text-foreground/75">{subtitle}</p>
      </div>
    </div>
  );
};

export default ParallaxPlaceholder;
