"use client";

import { useEffect, useRef } from "react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { processSteps } from "@/content/process";
import { ANIM, prefersReducedMotion } from "@/lib/animation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const markerIcons = ["?", "->", "[]", "UI", "<>", "{}", "OK"];

export function Process() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }

    let matchMedia: ReturnType<typeof gsap.matchMedia> | undefined;

    const context = gsap.context(() => {
      const steps = root.querySelectorAll("[data-process-step]");
      const line = root.querySelector("[data-process-line]");

      matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: ANIM.scrollTrigger.start,
            once: ANIM.scrollTrigger.once,
            scrub: ScrollTrigger.isTouch ? false : ANIM.duration.fast,
          },
        });

        timeline
          .from(
            line,
            {
              scaleX: 0,
              transformOrigin: "left",
              duration: ANIM.duration.draw,
              ease: ANIM.ease.default,
            },
            0,
          )
          .from(
            steps,
            {
              opacity: 0,
              y: ScrollTrigger.isTouch ? 12 : 24,
              duration: ANIM.duration.default,
              ease: ANIM.ease.enter,
              stagger: ANIM.stagger.items,
            },
            ScrollTrigger.isTouch ? 0 : ANIM.duration.fast,
          );
      });
    }, root);

    return () => {
      matchMedia?.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      id="process"
      ref={rootRef}
      aria-labelledby="process-title"
      className="border-t border-(--line) bg-(--ink) py-24 md:py-32"
    >
      <div className="section-shell">
        <RevealOnScroll className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-16">
          <p className="text-mono-label text-xs text-(--lime)">UX Process</p>
          <h2
            id="process-title"
            className="text-display max-w-4xl text-4xl leading-[1.02] text-(--paper) md:text-6xl"
          >
            A process built for clarity, performance and results.
          </h2>
        </RevealOnScroll>

        <div className="relative mt-14 md:mt-20">
          <div
            data-process-line
            className="absolute left-[1.05rem] top-0 h-full border-l border-dotted border-[rgba(240,240,232,0.28)] md:left-0 md:right-0 md:top-[1.18rem] md:h-px md:border-l-0 md:border-t"
            aria-hidden="true"
          />

          <ol className="grid gap-8 md:grid-cols-7 md:gap-4">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                data-process-step
                className="group relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-5 md:block"
              >
                <span
                  aria-label={`Process marker for ${step.title}`}
                  className="text-mono-label relative z-10 flex h-9 w-9 items-center justify-center border border-(--line) bg-(--ink) text-[10px] text-(--fog) transition-colors duration-300 group-hover:border-(--lime) group-hover:text-(--lime)"
                >
                  {markerIcons[index]}
                </span>

                <div className="pb-1 md:mt-9">
                  <p className="text-mono-label text-[10px] text-(--fog)">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-display mt-3 text-2xl leading-none text-(--paper) md:text-[clamp(1.12rem,1.8vw,1.55rem)]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-(--fog) md:text-[13px] md:leading-6">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
