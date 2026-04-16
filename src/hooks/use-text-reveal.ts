"use client";

import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface UseTextRevealOptions {
  selector?: string;
  start?: string;
  duration?: number;
  lineStagger?: number;
}

type RevealVariant = "rise" | "drop" | "slide-left" | "slide-right" | "soft-zoom";

const hashText = (value: string) => {
  return Array.from(value).reduce((acc, char) => acc + char.charCodeAt(0), 0);
};

const pickBySeed = <T,>(seed: number, values: readonly T[]) => {
  if (values.length === 0) {
    throw new Error("pickBySeed requires at least one value");
  }

  return values[Math.abs(seed) % values.length];
};

const getFromVars = (variant: RevealVariant, yOffset: number) => {
  switch (variant) {
    case "drop":
      return { yPercent: -yOffset, xPercent: 0, opacity: 0.02, scale: 1 };
    case "slide-left":
      return { yPercent: Math.round(yOffset * 0.45), xPercent: -20, opacity: 0.01, scale: 1 };
    case "slide-right":
      return { yPercent: Math.round(yOffset * 0.45), xPercent: 20, opacity: 0.01, scale: 1 };
    case "soft-zoom":
      return { yPercent: Math.round(yOffset * 0.55), xPercent: 0, opacity: 0, scale: 0.965 };
    case "rise":
    default:
      return { yPercent: yOffset, xPercent: 0, opacity: 0.02, scale: 1 };
  }
};

const buildRevealLines = (heading: HTMLElement) => {
  if (heading.dataset.revealPrepared === "true") {
    const hasPreparedLines = heading.querySelector(".text-reveal-content");

    if (hasPreparedLines) {
      return;
    }

    // Locale/content re-render may clear injected spans but keep data attributes.
    // Rebuild lines when that happens so reveal remains active.
    heading.dataset.revealPrepared = "false";
  }

  const sourceText = heading.textContent ?? "";
  const normalized = sourceText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (normalized.length === 0) {
    return;
  }

  heading.textContent = "";

  normalized.forEach((line) => {
    const mask = document.createElement("span");
    mask.className = "text-reveal-line";

    const content = document.createElement("span");
    content.className = "text-reveal-content";
    content.textContent = line;

    mask.appendChild(content);
    heading.appendChild(mask);
  });

  heading.dataset.revealPrepared = "true";
};

export const useTextReveal = (
  scopeRef: RefObject<HTMLElement | null>,
  options?: UseTextRevealOptions,
  dependencies: unknown[] = [],
) => {
  const {
    selector = "h1, h2, h3, [data-text-reveal]",
    start = "top 85%",
    duration = 1.05,
    lineStagger = 0.11,
  } = options ?? {};

  useGSAP(
    () => {
      if (!scopeRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const headings = gsap.utils.toArray<HTMLElement>(selector, scopeRef.current);

      headings.forEach((heading, index) => {
        buildRevealLines(heading);

        const lines = heading.querySelectorAll<HTMLElement>(".text-reveal-content");

        if (lines.length === 0) {
          return;
        }

        const seed = hashText(heading.textContent ?? "") + index * 37;
        const isMainHeading = heading.tagName === "H1";
        const variant = isMainHeading
          ? "rise"
          : pickBySeed<RevealVariant>(seed + 5, ["rise", "drop", "slide-left", "slide-right", "soft-zoom"]);
        const revealEase = pickBySeed(seed + 11, ["power2.out", "power3.out", "expo.out"]);
        const revealDuration = duration * pickBySeed(seed + 17, [0.92, 1, 1.1]);
        const revealStagger = lineStagger * pickBySeed(seed + 23, [0.82, 1, 1.18]);
        const staggerFrom = pickBySeed(seed + 29, ["start", "end", "center"] as const);
        const isInitiallyVisible = heading.getBoundingClientRect().top < window.innerHeight * 0.9;
        const fromY = isInitiallyVisible
          ? pickBySeed(seed + 31, [96, 104, 110])
          : pickBySeed(seed + 43, [108, 114, 120]);
        const fromVars = {
          ...getFromVars(variant, fromY),
          rotateZ: 0.001,
        };
        const toVars = {
          yPercent: 0,
          xPercent: 0,
          opacity: 1,
          scale: 1,
          rotateZ: 0.001,
        };

        if (isInitiallyVisible) {
          gsap.fromTo(
            lines,
            fromVars,
            {
              ...toVars,
              duration: Math.max(0.72, revealDuration * 0.9),
              ease: revealEase,
              stagger:
                lines.length > 1
                  ? {
                      each: revealStagger,
                      from: staggerFrom,
                    }
                  : 0,
              delay: pickBySeed(seed + 59, [0.04, 0.08, 0.12]),
            },
          );
          return;
        }

        gsap.fromTo(
          lines,
          fromVars,
          {
            ...toVars,
            duration: revealDuration,
            ease: revealEase,
            stagger:
              lines.length > 1
                ? {
                    each: revealStagger,
                    from: staggerFrom,
                  }
                : 0,
            scrollTrigger: {
              trigger: heading,
              start,
              once: true,
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    {
      scope: scopeRef,
      dependencies: [selector, start, duration, lineStagger, ...dependencies],
    },
  );
};
