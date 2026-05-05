"use client";

import { useEffect, useMemo, useState } from "react";

interface UseActiveSectionOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

const normalizeIds = (ids: string[]) =>
  ids
    .map((id) => id.trim())
    .filter(Boolean);

export const useActiveSection = (
  sectionIds: string[],
  options: UseActiveSectionOptions = {},
) => {
  const { rootMargin = "-30% 0px -55% 0px", threshold = [0.1, 0.4, 0.7] } = options;
  const [activeId, setActiveId] = useState<string | null>(null);

  const normalizedIds = useMemo(() => normalizeIds(sectionIds), [sectionIds]);

  useEffect(() => {
    if (normalizedIds.length === 0) {
      return;
    }

    const targets = normalizedIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (targets.length === 0) {
      return;
    }

    let clearOffset = Math.max(targets[0].offsetTop - 120, 0);

    const updateClearOffset = () => {
      clearOffset = Math.max(targets[0].offsetTop - 120, 0);
    };

    const clearIfAboveSections = () => {
      if (window.scrollY < clearOffset) {
        setActiveId(null);
      }
    };

    updateClearOffset();

    const hash = window.location.hash.replace("#", "").trim();

    if (hash && normalizedIds.includes(hash)) {
      setActiveId(hash);
    } else {
      clearIfAboveSections();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0 && window.scrollY >= clearOffset) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin, threshold },
    );

    targets.forEach((element) => observer.observe(element));

    window.addEventListener("scroll", clearIfAboveSections, { passive: true });
    window.addEventListener("resize", updateClearOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearIfAboveSections);
      window.removeEventListener("resize", updateClearOffset);
    };
  }, [normalizedIds, rootMargin, threshold]);

  return activeId;
};
