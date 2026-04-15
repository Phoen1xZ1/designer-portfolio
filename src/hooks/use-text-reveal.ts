"use client";

import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const buildRevealWords = (heading: HTMLElement) => {
  const originalContent = heading.innerHTML;
  const words = heading.textContent?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (!words.length) {
    return { originalContent, targets: [] as HTMLElement[] };
  }

  heading.textContent = "";

  const targets = words.map((word) => {
    const mask = document.createElement("span");
    mask.className = "text-reveal-mask";

    const inner = document.createElement("span");
    inner.className = "text-reveal-word";
    inner.textContent = word;

    mask.appendChild(inner);
    heading.appendChild(mask);
    heading.append(" ");

    return inner;
  });

  return { originalContent, targets };
};

export const useTextReveal = (scopeRef: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = scopeRef.current;

      if (!root) {
        return;
      }

      const headings = Array.from(
        root.querySelectorAll<HTMLElement>("[data-text-reveal]"),
      );

      const originals = new Map<HTMLElement, string>();
      const tweens: gsap.core.Tween[] = [];

      headings.forEach((heading) => {
        const { originalContent, targets } = buildRevealWords(heading);
        originals.set(heading, originalContent);

        if (!targets.length) {
          return;
        }

        gsap.set(targets, {
          yPercent: 96,
          opacity: 0,
          rotate: 0,
        });

        const tween = gsap.to(targets, {
          yPercent: 0,
          opacity: 1,
          ease: "power3.out",
          duration: 0.86,
          stagger: 0.042,
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            once: true,
          },
        });

        tweens.push(tween);
      });

      return () => {
        tweens.forEach((tween) => tween.kill());

        headings.forEach((heading) => {
          const original = originals.get(heading);

          if (typeof original === "string") {
            heading.innerHTML = original;
          }
        });
      };
    },
    { scope: scopeRef },
  );
};
