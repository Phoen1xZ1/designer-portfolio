"use client";

import { useMemo, useRef } from "react";
import { usePathname } from "next/navigation";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

type KineticTextTag = "span" | "p" | "div" | "h1" | "h2" | "h3";

interface KineticTextProps {
  text: string;
  as?: KineticTextTag;
  className?: string;
  letterClassName?: string;
  stagger?: number;
  fromY?: number;
  duration?: number;
}

const splitCharacters = (value: string) => Array.from(value);

const KineticText = ({
  text,
  as: Tag = "span",
  className,
  letterClassName,
  stagger = 0.02,
  fromY = 10,
  duration = 0.6,
}: KineticTextProps) => {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const letters = useMemo(() => splitCharacters(text), [text]);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (!rootRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const nodes = gsap.utils.toArray<HTMLElement>("[data-kinetic-letter]", rootRef.current);

      gsap.fromTo(
        nodes,
        {
          y: fromY,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power3.out",
          stagger,
        },
      );
    },
    { scope: rootRef, dependencies: [text, stagger, fromY, duration, pathname] },
  );

  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span
        ref={rootRef}
        aria-hidden
        className="inline-flex flex-wrap items-baseline whitespace-pre-wrap"
      >
        {letters.map((char, index) => (
          <span
            key={`${char}-${index}`}
            data-kinetic-letter
            className={cn("inline-block will-change-transform", letterClassName)}
          >
            {char}
          </span>
        ))}
      </span>
    </Tag>
  );
};

export default KineticText;
