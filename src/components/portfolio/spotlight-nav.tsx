"use client";

import { useEffect, useRef, useState } from "react";

import type { NavigationItem } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface SpotlightNavProps {
  items: NavigationItem[];
  activeId?: string | null;
  className?: string;
}

interface SpotlightStyle {
  left: number;
  width: number;
  opacity: number;
}

const getIdFromHref = (href: string) => href.replace("#", "").trim();

const SpotlightNav = ({ items, activeId, className }: SpotlightNavProps) => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [spotlight, setSpotlight] = useState<SpotlightStyle>({ left: 0, width: 0, opacity: 0 });

  const moveSpotlight = (id: string | null | undefined) => {
    if (!id || !navRef.current) {
      setSpotlight((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const item = itemRefs.current.get(id);

    if (!item) {
      return;
    }

    const navRect = navRef.current.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    setSpotlight({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  };

  useEffect(() => {
    moveSpotlight(activeId ?? null);
  }, [activeId, items]);

  useEffect(() => {
    const onResize = () => moveSpotlight(activeId ?? null);

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [activeId, items]);

  return (
    <nav
      ref={navRef}
      className={cn("relative hidden items-center gap-8 text-sm uppercase md:flex", className)}
      onMouseLeave={() => moveSpotlight(activeId ?? null)}
    >
      <span
        aria-hidden
        className="nav-spotlight"
        style={{
          width: `${spotlight.width}px`,
          transform: `translate(${spotlight.left}px, -50%)`,
          opacity: spotlight.opacity,
        }}
      />

      {items.map((item) => {
        const id = getIdFromHref(item.href);
        const isActive = activeId === id;

        return (
          <a
            key={item.href}
            href={item.href}
            ref={(node) => {
              if (node) {
                itemRefs.current.set(id, node);
              } else {
                itemRefs.current.delete(id);
              }
            }}
            onMouseEnter={() => moveSpotlight(id)}
            className="nav-link"
            data-active={isActive ? "true" : "false"}
            aria-current={isActive ? "location" : undefined}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
};

export default SpotlightNav;
