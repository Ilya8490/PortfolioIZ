"use client";

import { useEffect, useRef } from "react";
import { capabilities } from "@/content/capabilities";
import { ANIM, prefersReducedMotion } from "@/lib/animation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Capabilities() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }

    let matchMedia: ReturnType<typeof gsap.matchMedia> | undefined;

    const context = gsap.context(() => {
      const heading = root.querySelectorAll("[data-capability-heading]");
      const cards = root.querySelectorAll("[data-capability-card]");
      const animatedElements = [...heading, ...cards];

      matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          onComplete: () => {
            gsap.set(animatedElements, { clearProps: "opacity,transform" });
          },
          scrollTrigger: {
            trigger: root,
            start: ANIM.scrollTrigger.start,
            once: ANIM.scrollTrigger.once,
          },
        });

        timeline
          .from(heading, {
            opacity: 0,
            y: 24,
            duration: ANIM.duration.default,
            ease: ANIM.ease.enter,
            stagger: 0.08,
          })
          .from(
            cards,
            {
              opacity: 0,
              y: 20,
              duration: ANIM.duration.default,
              ease: ANIM.ease.enter,
              stagger: ANIM.stagger.items,
            },
            "-=0.25",
          );

        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    }, root);

    return () => {
      matchMedia?.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="capabilities-title"
      className="section-shell border-t border-(--line) py-24 md:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
        <div>
          <p data-capability-heading className="text-mono-label mb-5 text-xs text-(--lime)">
            Selected Capabilities
          </p>
          <h2
            id="capabilities-title"
            data-capability-heading
            className="text-display max-w-2xl text-4xl leading-[1.02] text-(--paper) md:text-6xl"
          >
            Clear interfaces, fast builds, and the details that make websites useful.
          </h2>
        </div>

        <div className="grid gap-px border border-(--line) bg-(--line) sm:grid-cols-2">
          {capabilities.map((capability) => (
            <article
              key={capability.title}
              data-capability-card
              tabIndex={0}
              aria-label={`${capability.number}. ${capability.title}: ${capability.description}`}
              className="capability-card group min-h-64 bg-(--ink) p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lime) md:p-7"
            >
              <div className="mb-12 flex items-start justify-between gap-5">
                <span className="text-mono-label text-xs text-(--fog) transition-colors duration-300 group-hover:text-[#050505] group-focus:text-[#050505]">
                  {capability.number}
                </span>
                <span
                  className="mt-1 h-2 w-2 bg-(--muted) transition-colors duration-300 group-hover:bg-[#050505] group-focus:bg-[#050505]"
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-display text-2xl leading-tight text-(--paper) transition-colors duration-300 group-hover:text-[#050505] group-focus:text-[#050505]">
                {capability.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-(--fog) transition-colors duration-300 group-hover:text-[#050505] group-focus:text-[#050505]">
                {capability.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
