"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

import { useParallaxMedia } from "@/hooks/use-parallax-media";
import { useTextReveal } from "@/hooks/use-text-reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.08,
      smoothWheel: true,
      syncTouch: true,
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.defaults({
      invalidateOnRefresh: true,
    });
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  useTextReveal(rootRef, undefined, [pathname]);
  useParallaxMedia(rootRef, undefined, [pathname]);

  return <div ref={rootRef}>{children}</div>;
};

export default SmoothScrollProvider;
