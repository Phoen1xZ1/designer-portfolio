"use client";

import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/3d/hero-canvas"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-linear-to-br from-[#eef1f5]/90 via-transparent to-[#dfe5ed]/65" />
  ),
});

const LazyHeroCanvas = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [allowCanvas, setAllowCanvas] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const desktopViewport = window.matchMedia("(min-width: 1080px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setAllowCanvas(desktopViewport.matches && !reducedMotion.matches);
    };

    updatePreference();

    desktopViewport.addEventListener("change", updatePreference);
    reducedMotion.addEventListener("change", updatePreference);

    return () => {
      desktopViewport.removeEventListener("change", updatePreference);
      reducedMotion.removeEventListener("change", updatePreference);
    };
  }, []);

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
      { rootMargin: "220px" },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [allowCanvas]);

  return (
    <div ref={containerRef} className="h-full w-full">
      {allowCanvas && isVisible ? (
        <HeroCanvas />
      ) : (
        <div className="h-full w-full bg-linear-to-br from-[#f5f8fb] via-[#ebf1f7] to-[#dfe7f0]" />
      )}
    </div>
  );
};

export default LazyHeroCanvas;
