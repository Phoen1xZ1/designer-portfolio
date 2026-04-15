"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  offsetY?: number;
}

const SectionReveal = ({
  children,
  className,
  offsetY = 40,
}: SectionRevealProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!rootRef.current) {
        return;
      }

      gsap.fromTo(
        rootRef.current,
        {
          autoAlpha: 0,
          y: offsetY,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 84%",
            once: true,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [offsetY] },
  );

  return (
    <div ref={rootRef} className={cn("motion-safe:will-change-transform", className)}>
      {children}
    </div>
  );
};

export default SectionReveal;
