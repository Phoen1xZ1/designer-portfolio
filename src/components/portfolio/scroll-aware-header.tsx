"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ScrollAwareHeaderProps {
  children: ReactNode;
  className?: string;
}

const ScrollAwareHeader = ({ children, className }: ScrollAwareHeaderProps) => (
  <header className={cn("sticky top-0 z-50 bg-background", className)}>{children}</header>
);

export default ScrollAwareHeader;
