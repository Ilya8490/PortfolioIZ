"use client";

import { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { ANIM } from "@/lib/animation";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}

export function RevealOnScroll({
  children,
  stagger,
  delay = 0,
  once = ANIM.scrollTrigger.once,
  className,
}: RevealOnScrollProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;

    if (!root || isReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root, {
          opacity: 0,
          y: 32,
          duration: ANIM.duration.default,
          ease: ANIM.ease.enter,
          stagger,
          delay,
          scrollTrigger: {
            trigger: root,
            start: ANIM.scrollTrigger.start,
            once,
          },
        });
      });

      return () => matchMedia.revert();
    }, root);

    return () => context.revert();
  }, [delay, isReducedMotion, once, stagger]);

  return (
    <div ref={rootRef} data-testid="reveal-on-scroll" className={clsx("motion-reveal", className)}>
      {children}
    </div>
  );
}
