"use client";

import { useEffect, useRef } from "react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { services } from "@/content/services";
import { ANIM, prefersReducedMotion } from "@/lib/animation";
import { gsap } from "@/lib/gsap";

export function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }

    let matchMedia: ReturnType<typeof gsap.matchMedia> | undefined;

    const context = gsap.context(() => {
      const cards = root.querySelectorAll("[data-service-card]");

      matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(cards, {
          opacity: 0,
          y: 24,
          duration: ANIM.duration.default,
          ease: ANIM.ease.enter,
          stagger: ANIM.stagger.cards,
          scrollTrigger: {
            trigger: root,
            start: ANIM.scrollTrigger.start,
            once: ANIM.scrollTrigger.once,
          },
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
      id="services"
      ref={rootRef}
      aria-labelledby="services-title"
      className="border-t border-(--line) bg-(--ink) py-24 md:py-32"
    >
      <div className="section-shell">
        <RevealOnScroll className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-16">
          <p className="text-mono-label text-xs text-(--lime)">Services</p>
          <h2
            id="services-title"
            className="text-display max-w-4xl text-4xl leading-[1.02] text-(--paper) md:text-6xl"
          >
            Specialist help for websites that need to perform.
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid gap-px border border-(--line) bg-(--line) md:mt-20 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              data-service-card
              data-testid="service-card"
              className="group min-h-80 border-l-2 border-transparent bg-(--ink) p-6 transition-colors duration-300 hover:border-l-(--lime) hover:bg-(--card) focus-within:border-l-(--lime) focus-within:bg-(--card) md:p-7"
            >
              <p className="text-mono-label text-[10px] leading-5 text-(--fog)">
                Service Cluster
              </p>
              <h3 className="text-display mt-10 text-3xl leading-none text-(--paper)">
                {service.title}
              </h3>
              <p className="mt-6 text-sm leading-7 text-(--paper)">
                {service.targetClient}
              </p>
              <p className="mt-5 text-sm leading-7 text-(--fog)">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <a
          href="#contact"
          className="text-mono-label mt-8 inline-flex text-xs text-(--paper) transition-colors duration-300 hover:text-(--lime)"
        >
          Not sure what you need? Let&apos;s talk through it. -&gt;
        </a>
      </div>
    </section>
  );
}
