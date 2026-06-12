"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities } from "@/content/capabilities";
import { prefersReducedMotion } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

export function Capabilities() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }

    const context = gsap.context(() => {
      const cards = root.querySelectorAll("[data-capability-card]");

      gsap.set(cards, { opacity: 0, y: 28 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          once: true,
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="capabilities-title"
      className="section-shell border-t border-(--line) py-24 md:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:gap-16">
        <div>
          <p className="text-mono-label mb-5 text-xs text-(--lime)">
            Selected Capabilities
          </p>
          <h2
            id="capabilities-title"
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
              className="group min-h-64 bg-(--ink) p-6 transition-colors duration-300 hover:bg-(--card) focus-within:bg-(--card) md:p-7"
            >
              <div className="mb-12 flex items-start justify-between gap-5">
                <span className="text-mono-label text-xs text-(--fog) transition-colors group-hover:text-(--lime)">
                  {capability.number}
                </span>
                <span
                  className="mt-1 h-2 w-2 bg-(--muted) transition-colors group-hover:bg-(--lime)"
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-display text-2xl leading-tight text-(--paper)">
                {capability.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-(--fog)">
                {capability.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
