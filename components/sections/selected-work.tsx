"use client";

import { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { projects } from "@/content/projects";
import { ANIM, prefersReducedMotion } from "@/lib/animation";
import { gsap } from "@/lib/gsap";

const statusLabel = {
  verified: "Verified",
  placeholder: "Placeholder",
} as const;

export function SelectedWork() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }

    let matchMedia: ReturnType<typeof gsap.matchMedia> | undefined;

    const context = gsap.context(() => {
      const rows = root.querySelectorAll("[data-work-row]");

      matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        rows.forEach((row) => {
          const content = row.querySelector("[data-work-content]");
          const visual = row.querySelector("[data-work-visual]");
          const number = row.querySelector("[data-work-number]");

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: ANIM.scrollTrigger.start,
              once: ANIM.scrollTrigger.once,
            },
          });

          timeline
            .from(
              content,
              {
                opacity: 0,
                x: -20,
                duration: ANIM.duration.default,
                ease: ANIM.ease.enter,
              },
              0,
            )
            .from(
              visual,
              {
                opacity: 0,
                x: 20,
                duration: ANIM.duration.default,
                ease: ANIM.ease.enter,
              },
              0,
            )
            .from(
              number,
              {
                opacity: 0,
                duration: ANIM.duration.fast,
                ease: ANIM.ease.default,
              },
              0,
            );
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
      id="work"
      ref={rootRef}
      aria-labelledby="selected-work-title"
      className="border-t border-(--line) bg-(--ink) py-24 md:py-32"
    >
      <div className="section-shell">
        <RevealOnScroll className="grid gap-8 border-b border-(--line) pb-12 lg:grid-cols-[0.72fr_1fr] lg:items-end lg:gap-16">
          <p className="text-mono-label text-xs text-(--lime)">Selected Work</p>
          <h2
            id="selected-work-title"
            className="text-display max-w-4xl text-4xl leading-[1.02] text-(--paper) md:text-6xl"
          >
            A few sharp builds, shown with clear source confidence.
          </h2>
        </RevealOnScroll>

        <div>
          {projects.map((project, index) => {
            const projectNumber = String(index + 1).padStart(2, "0");
            const isReversed = index % 2 === 1;
            const href = project.href ?? "#contact";
            const linkLabel = project.href
              ? `Open ${project.title}`
              : `Ask about ${project.title}`;

            return (
              <article
                key={project.title}
                data-work-row
                className={clsx(
                  "group grid gap-8 border-b border-(--line) py-12 md:py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.7fr)] lg:items-center lg:gap-14",
                  isReversed && "lg:grid-flow-col-dense",
                )}
              >
                <div data-work-content className={clsx(isReversed && "lg:col-start-2")}>
                  <div className="mb-7 flex items-start justify-between gap-6">
                    <span
                      data-work-number
                      className="text-display text-7xl leading-none text-transparent opacity-[0.06] transition-opacity duration-300 [-webkit-text-stroke:1px_rgba(240,240,232,0.36)] group-hover:opacity-[0.03] md:text-8xl"
                    >
                      {projectNumber}
                    </span>
                    <span
                      className={clsx(
                        "text-mono-label border px-3 py-1 text-[10px]",
                        project.status === "verified"
                          ? "border-(--lime) text-(--lime)"
                          : "border-(--line) text-(--fog)",
                      )}
                    >
                      {statusLabel[project.status]}
                    </span>
                  </div>

                  <p className="text-mono-label text-xs text-(--fog)">
                    {project.category}
                  </p>
                  <h3 className="text-display mt-4 text-4xl leading-none text-(--paper) md:text-5xl">
                    {project.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-(--fog) md:text-base">
                    {project.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="text-mono-label border border-(--line) px-3 py-1 text-[10px] text-(--paper)"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <a
                    href={href}
                    target={project.href ? "_blank" : undefined}
                    rel={project.href ? "noreferrer" : undefined}
                    aria-label={linkLabel}
                    className="text-mono-label mt-8 inline-flex items-center gap-3 text-xs text-(--paper) transition-colors duration-300 hover:text-(--lime)"
                  >
                    {project.href ? "View Live Site" : "Details Pending"}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      -&gt;
                    </span>
                  </a>
                </div>

                <div
                  data-work-visual
                  className={clsx(
                    "relative min-h-72 overflow-hidden border border-(--line) bg-(--card) p-4 transition-colors duration-300 group-hover:border-[rgba(232,255,71,0.42)] md:min-h-96",
                    isReversed && "lg:col-start-1",
                  )}
                >
                  <div
                    className="absolute left-4 top-4 z-10 h-2 w-2 bg-(--muted) transition-colors duration-300 group-hover:bg-(--lime)"
                    aria-hidden="true"
                  />
                  <div className="h-full min-h-64 overflow-hidden border border-(--line) bg-[linear-gradient(135deg,rgba(240,240,232,0.12),rgba(240,240,232,0.02))] md:min-h-80">
                    <div className="flex h-full min-h-64 scale-100 flex-col justify-between p-5 transition-transform duration-500 group-hover:scale-[1.03] md:min-h-80 md:p-7">
                      <div className="flex items-center justify-between">
                        <span className="text-mono-label text-[10px] text-(--fog)">
                          Mockup Placeholder
                        </span>
                        <span className="h-px w-16 bg-(--line)" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-display max-w-xs text-3xl leading-none text-(--paper)">
                          {project.title}
                        </p>
                        <p className="mt-4 max-w-sm text-sm leading-6 text-(--fog)">
                          {project.status === "verified"
                            ? "Live URL reviewed for content direction."
                            : "Editable visual placeholder until source material is supplied."}
                        </p>
                      </div>
                      <div className="grid grid-cols-4 gap-2" aria-hidden="true">
                        {Array.from({ length: 8 }).map((_, itemIndex) => (
                          <span
                            key={itemIndex}
                            className={clsx(
                              "h-10 border border-(--line)",
                              itemIndex === index && "bg-[rgba(232,255,71,0.18)]",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
