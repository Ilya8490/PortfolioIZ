"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { heroContent } from "@/content/hero";
import { ANIM, prefersReducedMotion } from "@/lib/animation";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }

    let matchMedia: ReturnType<typeof gsap.matchMedia> | undefined;

    const context = gsap.context(() => {
      const revealItems = root.querySelectorAll("[data-hero-reveal]");

      matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ defaults: { ease: ANIM.ease.enter } });

        timeline
          .from(revealItems, {
            opacity: 0,
            y: 24,
            duration: ANIM.duration.default,
            stagger: ANIM.stagger.items,
          })
          .from(
            codeRef.current,
            {
              opacity: 0,
              y: 28,
              rotate: -1.5,
              duration: ANIM.duration.slow,
            },
            `-=${ANIM.duration.fast}`,
          )
          .to(codeRef.current, {
            y: -10,
            duration: ANIM.duration.slow * 3,
            ease: ANIM.ease.default,
            repeat: -1,
            yoyo: true,
          });
      });
    }, root);

    return () => {
      matchMedia?.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative isolate flex min-h-svh items-center overflow-hidden px-4 pb-16 pt-28"
    >
      <div className="hero-scanline" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 border-l border-(--line) lg:block" />

      <div className="mx-auto grid w-full max-w-(--container) items-center gap-14 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="max-w-4xl">
          <p data-hero-reveal className="text-mono-label mb-7 text-xs text-(--lime)">
            {heroContent.eyebrow}
          </p>

          <h1
            data-hero-reveal
            className="text-display max-w-5xl text-[clamp(3.35rem,6.4vw,6rem)] leading-[0.95] text-(--paper)"
          >
            {heroContent.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p
            data-hero-reveal
            className="mt-7 max-w-2xl text-base leading-7 text-(--fog) md:text-lg"
          >
            {heroContent.body}
          </p>

          <div data-hero-reveal className="mt-9 flex flex-wrap gap-3">
            <Button href={heroContent.primaryCta.href}>
              {heroContent.primaryCta.label}
            </Button>
            <Button href={heroContent.secondaryCta.href} variant="secondary">
              {heroContent.secondaryCta.label} <span aria-hidden="true">→</span>
            </Button>
          </div>

          <div data-hero-reveal className="mt-8 flex flex-wrap gap-2">
            {heroContent.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        <div
          ref={codeRef}
          className="hidden border border-(--line) bg-[rgba(20,20,28,0.74)] p-5 lg:block"
          aria-hidden="true"
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="text-mono-label text-[10px] text-(--fog)">
              portfolio.tsx
            </span>
            <span className="h-2 w-2 bg-(--lime)" />
          </div>
          <pre className="overflow-hidden text-sm leading-7 text-(--paper)">
            <code>{`const focus = [
  "clear UX",
  "fast pages",
  "clean React",
  "SEO basics"
];

build({
  intent: "convert",
  location: "Berlin"
});`}</code>
          </pre>
        </div>
      </div>

      <a
        data-hero-reveal
        href="#work"
        className="text-mono-label absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[10px] text-(--fog) transition-colors hover:text-(--lime) md:block"
      >
        Scroll
      </a>
    </section>
  );
}
