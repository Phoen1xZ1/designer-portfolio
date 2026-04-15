"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { cn } from "@/lib/utils";
import { useTextReveal } from "@/hooks/use-text-reveal";

interface TextRevealRootProps {
  children: ReactNode;
  className?: string;
}

const TextRevealRoot = ({ children, className }: TextRevealRootProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useTextReveal(rootRef);

  return (
    <div ref={rootRef} className={cn(className)}>
      {children}
    </div>
  );
};

export default TextRevealRoot;
