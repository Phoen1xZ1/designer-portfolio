"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

interface RotatingBackdropProps {
  className?: string;
}

const RotatingBackdrop = ({ className }: RotatingBackdropProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!rootRef.current) {
        return;
      }

      const plates = rootRef.current.querySelectorAll<HTMLElement>("[data-plate]");

      const spin = gsap.to(rootRef.current, {
        rotate: 360,
        duration: 34,
        ease: "none",
        repeat: -1,
      });

      const breath = gsap.to(rootRef.current, {
        scale: 1.08,
        duration: 8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      plates.forEach((plate, index) => {
        gsap.fromTo(
          plate,
          {
            rotate: index * 8,
            x: index * 7,
            y: -index * 7,
          },
          {
            rotate: index % 2 === 0 ? -18 : 18,
            x: index % 2 === 0 ? 12 : -12,
            y: index % 2 === 0 ? -12 : 12,
            duration: 6.5 + index,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          },
        );
      });

      return () => {
        spin.kill();
        breath.kill();
        plates.forEach((plate) => gsap.killTweensOf(plate));
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      className={cn(
        "pointer-events-none relative h-[380px] w-[380px] md:h-[560px] md:w-[560px]",
        className,
      )}
    >
      <div
        data-plate
        className="absolute left-10 top-8 h-[62%] w-[62%] border border-foreground/10 bg-foreground/[0.02]"
      />
      <div
        data-plate
        className="absolute left-[24%] top-[14%] h-[62%] w-[62%] border border-foreground/14 bg-foreground/[0.05]"
      />
      <div
        data-plate
        className="absolute left-[38%] top-[20%] h-[62%] w-[62%] border border-foreground/18 bg-foreground/[0.09]"
      />
      <div
        data-plate
        className="absolute left-[18%] top-[30%] h-[62%] w-[62%] border border-foreground/8 bg-transparent"
      />
    </div>
  );
};

export default RotatingBackdrop;
