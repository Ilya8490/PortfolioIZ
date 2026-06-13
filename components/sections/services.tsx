"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/content/services";
import { prefersReducedMotion } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }

    const context = gsap.context(() => {
      const cards = root.querySelectorAll("[data-service-card]");

      gsap.set(cards, { opacity: 0, y: 24 });
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
      id="services"
      ref={rootRef}
      aria-labelledby="services-title"
      className="border-t border-(--line) bg-(--ink) py-24 md:py-32"
    >
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-16">
          <p className="text-mono-label text-xs text-(--lime)">Services</p>
          <h2
            id="services-title"
            className="text-display max-w-4xl text-4xl leading-[1.02] text-(--paper) md:text-6xl"
          >
            Specialist help for websites that need to perform.
          </h2>
        </div>

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
