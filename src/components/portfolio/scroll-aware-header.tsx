"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface ScrollAwareHeaderProps {
  children: ReactNode;
  className?: string;
  hideOffset?: number;
}

const ScrollAwareHeader = ({
  children,
  className,
  hideOffset = 84,
}: ScrollAwareHeaderProps) => {
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      if (tickingRef.current) {
        return;
      }

      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastYRef.current;

        if (currentY <= 20 || delta < -4) {
          setHidden(false);
        } else if (currentY > hideOffset && delta > 5) {
          setHidden(true);
        }

        lastYRef.current = currentY;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hideOffset]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:will-change-transform",
        hidden ? "-translate-y-[115%]" : "translate-y-0",
        className,
      )}
    >
      {children}
    </header>
  );
};

export default ScrollAwareHeader;
