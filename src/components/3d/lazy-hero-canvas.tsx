"use client";

import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const HeroCanvas = dynamic(() => import("@/components/3d/hero-canvas"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-[2rem] bg-linear-to-br from-primary/10 via-transparent to-foreground/5" />
  ),
});

const LazyHeroCanvas = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [allowCanvas, setAllowCanvas] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopViewport = window.matchMedia("(min-width: 1024px)");

    const updatePreference = () => {
      setAllowCanvas(!reducedMotion.matches && desktopViewport.matches);
    };

    updatePreference();

    reducedMotion.addEventListener("change", updatePreference);
    desktopViewport.addEventListener("change", updatePreference);

    return () => {
      reducedMotion.removeEventListener("change", updatePreference);
      desktopViewport.removeEventListener("change", updatePreference);
    };
  }, [pathname]);

  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  useEffect(() => {
    if (!allowCanvas || !containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "180px" },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [allowCanvas, pathname]);

  return (
    <div ref={containerRef} className="h-full w-full">
      {allowCanvas && isVisible ? (
        <HeroCanvas key={pathname} />
      ) : (
        <div className="h-full w-full rounded-[2rem] bg-linear-to-br from-primary/10 via-transparent to-foreground/5" />
      )}
    </div>
  );
};

export default LazyHeroCanvas;
