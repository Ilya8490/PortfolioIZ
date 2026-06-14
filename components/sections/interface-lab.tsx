"use client";

import { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { interfaceLabItems } from "@/content/interface-lab";
import { ANIM, prefersReducedMotion } from "@/lib/animation";
import { gsap } from "@/lib/gsap";
import type { InterfaceLabItem } from "@/types";

function InterfaceDemo({ item }: { item: InterfaceLabItem }) {
  if (item.demo === "navigation") {
    return (
      <div
        aria-label={`Interface demo for ${item.title}`}
        className="flex h-full min-h-36 flex-col justify-between"
      >
        <div className="flex items-center justify-between border-b border-(--line) pb-4">
          <span className="h-3 w-10 bg-(--paper)" />
          <div className="flex gap-2">
            <span className="h-2 w-8 bg-(--muted) transition-colors group-hover:bg-(--lime)" />
            <span className="h-2 w-8 bg-(--muted)" />
            <span className="h-2 w-8 bg-(--muted)" />
          </div>
        </div>
        <div className="grid gap-2">
          <span className="h-8 w-4/5 border border-(--line)" />
          <span className="h-8 w-3/5 border border-(--line)" />
        </div>
      </div>
    );
  }

  if (item.demo === "booking") {
    return (
      <div
        aria-label={`Interface demo for ${item.title}`}
        className="grid h-full min-h-36 gap-3"
      >
        <div className="grid grid-cols-3 gap-2">
          <span className="h-8 border border-(--line) bg-[rgba(240,240,232,0.05)]" />
          <span className="h-8 border border-(--line) bg-[rgba(240,240,232,0.05)]" />
          <span className="h-8 border border-(--line) bg-[rgba(232,255,71,0.12)]" />
        </div>
        <span className="h-9 border border-(--line)" />
        <span className="h-9 border border-(--line)" />
        <span className="h-9 w-1/2 bg-(--paper) transition-colors group-hover:bg-(--lime)" />
      </div>
    );
  }

  if (item.demo === "dashboard") {
    return (
      <div
        aria-label={`Interface demo for ${item.title}`}
        className="grid h-full min-h-36 grid-cols-[0.72fr_1fr] gap-3"
      >
        <div className="grid gap-3">
          <span className="border border-(--line) bg-[rgba(232,255,71,0.1)]" />
          <span className="border border-(--line)" />
        </div>
        <div className="grid content-end gap-2 border border-(--line) p-3">
          {[42, 72, 54, 88, 64].map((height) => (
            <span
              key={height}
              className="block bg-(--muted) transition-colors group-hover:bg-(--lime)"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (item.demo === "mobile") {
    return (
      <div
        aria-label={`Interface demo for ${item.title}`}
        className="mx-auto flex h-full min-h-36 w-24 flex-col gap-3 border border-(--line) p-3"
      >
        <span className="h-3 w-8 bg-(--paper)" />
        <span className="h-16 border border-(--line) bg-[rgba(240,240,232,0.05)]" />
        <span className="h-5 border border-(--line)" />
        <span className="mt-auto h-7 bg-(--muted) transition-colors group-hover:bg-(--lime)" />
      </div>
    );
  }

  return (
    <div
      aria-label={`Interface demo for ${item.title}`}
      className="flex h-full min-h-36 items-center justify-center"
    >
      <div className="relative h-24 w-24 border border-(--line)">
        <span className="absolute left-4 top-4 h-4 w-4 bg-(--paper)" />
        <span className="absolute bottom-4 right-4 h-4 w-4 bg-(--muted) transition-all duration-300 group-hover:bottom-8 group-hover:right-8 group-hover:bg-(--lime)" />
        <span className="absolute left-1/2 top-1/2 h-px w-16 -translate-x-1/2 bg-(--line)" />
        <span className="absolute left-1/2 top-1/2 h-16 w-px -translate-y-1/2 bg-(--line)" />
      </div>
    </div>
  );
}

export function InterfaceLab() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }

    let matchMedia: ReturnType<typeof gsap.matchMedia> | undefined;

    const context = gsap.context(() => {
      const cards = root.querySelectorAll("[data-interface-card]");

      matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(cards, {
          opacity: 0,
          y: 28,
          duration: ANIM.duration.default,
          ease: ANIM.ease.enter,
          stagger: ANIM.stagger.items,
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
      id="lab"
      ref={rootRef}
      aria-labelledby="interface-lab-title"
      className="border-t border-(--line) bg-(--ink) py-24 md:py-32"
    >
      <div className="section-shell">
        <RevealOnScroll className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-16">
          <p className="text-mono-label text-xs text-(--lime)">Interface Lab</p>
          <h2
            id="interface-lab-title"
            className="text-display max-w-4xl text-4xl leading-[1.02] text-(--paper) md:text-6xl"
          >
            Small interface systems for cleaner decisions and smoother flows.
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid gap-px border border-(--line) bg-(--line) md:mt-20 md:grid-cols-2 lg:grid-cols-6">
          {interfaceLabItems.map((item, index) => (
            <article
              key={item.title}
              data-interface-card
              className={clsx(
                "group min-h-96 bg-(--ink) p-5 transition-colors duration-300 hover:bg-(--card) focus-within:bg-(--card) md:p-6",
                index < 2 ? "lg:col-span-3" : "lg:col-span-2",
              )}
            >
              <div className="mb-8 flex items-start justify-between">
                <span
                  aria-label={`Interface icon for ${item.title}`}
                  className="text-mono-label flex h-10 min-w-10 items-center justify-center border border-(--line) px-2 text-[10px] text-(--fog) transition-colors duration-300 group-hover:border-(--lime) group-hover:text-(--lime)"
                >
                  {item.icon}
                </span>
                <span
                  className="h-2 w-2 bg-(--muted) transition-colors duration-300 group-hover:bg-(--lime)"
                  aria-hidden="true"
                />
              </div>

              <div className="border border-(--line) bg-[rgba(240,240,232,0.025)] p-4 transition-transform duration-300 group-hover:-translate-y-1">
                <InterfaceDemo item={item} />
              </div>

              <h3 className="text-display mt-8 text-3xl leading-none text-(--paper)">
                {item.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-6 text-(--fog)">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
