"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef } from "react";

import gsap from "gsap";
import { usePathname } from "next/navigation";

interface InfiniteMarqueeProps {
  text?: string;
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
}

const InfiniteMarquee = ({ text, children, className, ariaLabel }: InfiniteMarqueeProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);
  const hasChildren = Boolean(children);
  const pathname = usePathname();

  const repeated = useMemo(() => {
    if (!text) {
      return "";
    }

    return Array.from({ length: 6 }, () => text).join("  //  ");
  }, [text]);

  useEffect(() => {
    if (
      !trackRef.current ||
      !itemRef.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let tween: gsap.core.Tween | null = null;
    let rafId: number | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const setupTicker = () => {
      tween?.kill();
      gsap.set(trackRef.current, { x: 0 });

      const itemWidth = itemRef.current?.offsetWidth ?? 0;

      if (itemWidth === 0) {
        return false;
      }

      const pxPerSecond = window.innerWidth < 768 ? 22 : 28;
      const duration = gsap.utils.clamp(40, 120, itemWidth / pxPerSecond);

      tween = gsap.fromTo(
        trackRef.current,
        { x: 0 },
        {
          x: -itemWidth,
          duration,
          ease: "none",
          repeat: -1,
        },
      );

      return true;
    };

    const ensureTicker = () => {
      if (!setupTicker()) {
        rafId = window.requestAnimationFrame(ensureTicker);
      }
    };

    const ctx = gsap.context(() => {
      ensureTicker();
    }, trackRef);

    const handleResize = () => ensureTicker();

    window.addEventListener("resize", handleResize);

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        ensureTicker();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => ensureTicker());
      resizeObserver.observe(itemRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pageshow", handlePageShow);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      resizeObserver?.disconnect();
      tween?.kill();
      ctx.revert();
    };
  }, [repeated, hasChildren, pathname]);

  const label = ariaLabel ?? text;

  return (
    <div className={className} aria-label={label}>
      <div className="overflow-hidden border-y border-foreground/14 py-4 md:py-6">
        <div ref={trackRef} className="flex w-max items-center motion-safe:will-change-transform">
          {hasChildren ? (
            <>
              <div ref={itemRef} className="flex items-center">
                {children}
              </div>
              <div className="flex items-center" aria-hidden>
                {children}
              </div>
            </>
          ) : (
            <>
              <div ref={itemRef} className="marquee-line shrink-0 pr-20 md:pr-24">
                {repeated}
              </div>
              <div className="marquee-line shrink-0 pr-20 md:pr-24" aria-hidden>
                {repeated}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
