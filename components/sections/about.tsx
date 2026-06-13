"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutStats } from "@/content/about";
import { prefersReducedMotion } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

type PhilosophyFragment = {
  text: string;
  className?: string;
};

function SplitWords({ fragments }: { fragments: PhilosophyFragment[] }) {
  return (
    <>
      {fragments.map((fragment, fragmentIndex) => {
        const words = fragment.text.trim().split(/\s+/);

        return (
          <span key={`${fragment.text}-${fragmentIndex}`} className={fragment.className}>
            {fragmentIndex > 0 ? " " : null}
            {words.map((word, wordIndex) => (
              <span key={`${word}-${wordIndex}`}>
                <span
                  data-philosophy-word
                  data-testid="philosophy-word"
                  className="inline-block will-change-transform"
                >
                  {word}
                </span>
                {wordIndex < words.length - 1 ? " " : null}
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}

export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }

    const context = gsap.context(() => {
      const aboutContent = root.querySelectorAll("[data-about-reveal]");
      const philosophyBlock = root.querySelector("[data-philosophy-block]");
      const philosophyLine = root.querySelector("[data-philosophy-line]");
      const philosophyWords = root.querySelectorAll("[data-philosophy-word]");

      gsap.set(aboutContent, { opacity: 0, y: 24 });
      gsap.to(aboutContent, {
        opacity: 1,
        y: 0,
        duration: 0.78,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          once: true,
        },
      });

      if (philosophyBlock && philosophyLine && philosophyWords.length > 0) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: philosophyBlock,
            start: "top 70%",
            once: true,
          },
        });

        timeline
          .fromTo(
            philosophyLine,
            { height: 0 },
            { height: "100%", duration: 0.8, ease: "power2.out" },
            0,
          )
          .fromTo(
            philosophyWords,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.055,
            },
            0,
          );
      }
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      aria-labelledby="about-title"
      className="border-t border-(--line) bg-(--ink) py-24 md:py-32"
    >
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1fr] lg:items-center lg:gap-16">
          <div
            data-about-reveal
            aria-label="Portrait placeholder for Ilya"
            className="relative aspect-[3/4] min-h-96 overflow-hidden border border-(--line) bg-(--card)"
          >
            {/* TODO: Replace with real portrait - see photo direction in PRD */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_18%,rgba(240,240,232,0.2),transparent_12rem),linear-gradient(145deg,rgba(240,240,232,0.11),transparent_48%)]" />
            <div
              className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(240,240,232,0.65)_0.7px,transparent_0.7px)] [background-size:4px_4px]"
              aria-hidden="true"
            />
            <div className="absolute bottom-6 left-6 right-6 border-t border-(--line) pt-5">
              <p className="text-mono-label text-[10px] text-(--fog)">
                Portrait direction
              </p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-(--paper)">
                Dark, high-contrast, rectangular frame.
              </p>
            </div>
          </div>

          <div data-about-reveal>
            <p className="text-mono-label mb-5 text-xs text-(--lime)">About</p>
            <h2
              id="about-title"
              className="text-display max-w-4xl text-4xl leading-[1.02] text-(--paper) md:text-6xl"
            >
              Most websites look fine. Few of them actually work.
            </h2>

            <div className="mt-8 max-w-3xl space-y-5 text-sm leading-7 text-(--fog) md:text-base md:leading-8">
              <p>
                I am a frontend developer and UX/UI designer based in Berlin, working
                with startups, agencies, and businesses across Germany and Europe.
              </p>
              <p>
                I take projects from early design decisions through to shipped,
                performant frontend code - handling both the visual layer and the
                technical implementation without handing off between disciplines.
              </p>
              <p className="text-(--paper)">
                {/* EDITABLE: Update availability status as needed */}
                Currently open to full-time roles and select freelance projects.
              </p>
            </div>

            <dl
              aria-label="About stats"
              className="mt-10 grid gap-px border border-(--line) bg-(--line) sm:grid-cols-2 xl:grid-cols-4"
            >
              {aboutStats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="bg-(--ink) p-5">
                  <dt className="text-mono-label text-[10px] leading-5 text-(--fog)">
                    {stat.label}
                  </dt>
                  <dd className="text-display mt-3 text-3xl leading-none text-(--paper)">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div
          data-philosophy-block
          aria-label="Design philosophy"
          className="mt-16 border border-(--line) bg-(--card) px-6 py-10 md:mt-24 md:px-10 md:py-14"
        >
          <div className="relative max-w-4xl pl-6">
            <span
              data-philosophy-line
              data-testid="philosophy-line"
              className="absolute left-0 top-0 h-full w-px bg-(--muted)"
              aria-hidden="true"
            />
            <p className="text-[clamp(20px,2.5vw,32px)] font-light leading-[1.6] text-(--fog)">
              <SplitWords
                fragments={[
                  {
                    text: "Good design does not fight for attention.",
                    className: "text-(--paper)",
                  },
                  { text: "It helps people understand, decide, and act." },
                ]}
              />
            </p>
            <p className="mt-8 text-[clamp(20px,2.5vw,32px)] font-light leading-[1.6] text-(--fog)">
              <SplitWords
                fragments={[
                  { text: "I build websites with that principle at the center -" },
                  {
                    text: "clear structure, strong hierarchy, fast load times,",
                    className: "text-(--paper)",
                  },
                  {
                    text: "and details that earn trust without demanding to be noticed.",
                  },
                ]}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
