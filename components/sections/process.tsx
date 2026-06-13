"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/content/process";
import { prefersReducedMotion } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

const markerIcons = ["?", "->", "[]", "UI", "<>", "{}", "OK"];

export function Process() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }

    const context = gsap.context(() => {
      const steps = root.querySelectorAll("[data-process-step]");

      gsap.set(steps, { opacity: 0, y: 24 });
      gsap.to(steps, {
        opacity: 1,
        y: 0,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          once: true,
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      id="process"
      ref={rootRef}
      aria-labelledby="process-title"
      className="border-t border-(--line) bg-(--ink) py-24 md:py-32"
    >
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-16">
          <p className="text-mono-label text-xs text-(--lime)">UX Process</p>
          <h2
            id="process-title"
            className="text-display max-w-4xl text-4xl leading-[1.02] text-(--paper) md:text-6xl"
          >
            A process built for clarity, performance and results.
          </h2>
        </div>

        <div className="relative mt-14 md:mt-20">
          <div
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
