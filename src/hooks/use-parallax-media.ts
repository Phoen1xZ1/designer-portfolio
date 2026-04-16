"use client";

import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface UseParallaxMediaOptions {
  selector?: string;
}

export const useParallaxMedia = (
  scopeRef: RefObject<HTMLElement | null>,
  options?: UseParallaxMediaOptions,
  dependencies: unknown[] = [],
) => {
  const { selector = "[data-parallax-media]" } = options ?? {};

  useGSAP(
    () => {
      if (!scopeRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const mediaNodes = gsap.utils.toArray<HTMLElement>(selector, scopeRef.current);

      mediaNodes.forEach((node) => {
        const trigger = node.closest("[data-parallax-wrap]") ?? node;

        gsap.fromTo(
          node,
          {
            yPercent: -8,
          },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          },
        );
      });
    },
    {
      scope: scopeRef,
      dependencies: [selector, ...dependencies],
    },
  );
};
