"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { aboutStats } from "@/content/about";
import { ANIM, prefersReducedMotion } from "@/lib/animation";
import { gsap } from "@/lib/gsap";

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

    let matchMedia: ReturnType<typeof gsap.matchMedia> | undefined;

    const context = gsap.context(() => {
      const aboutContent = root.querySelectorAll("[data-about-reveal]");
      const philosophyBlock = root.querySelector("[data-philosophy-block]");
      const philosophyLine = root.querySelector("[data-philosophy-line]");
      const philosophyWords = root.querySelectorAll("[data-philosophy-word]");

      matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(aboutContent, {
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

        if (philosophyBlock && philosophyLine && philosophyWords.length > 0) {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: philosophyBlock,
              start: ANIM.scrollTrigger.start,
              once: ANIM.scrollTrigger.once,
            },
          });

          timeline
            .from(
              philosophyLine,
              {
                height: 0,
                duration: ANIM.duration.draw,
                ease: ANIM.ease.default,
              },
              0,
            )
            .from(
              philosophyWords,
              {
                opacity: 0,
                y: 12,
                duration: ANIM.duration.fast,
                ease: ANIM.ease.default,
                stagger: ANIM.stagger.words,
              },
              0,
            );
        }
      });
    }, root);

    return () => {
      matchMedia?.revert();
      context.revert();
    };
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
            className="relative aspect-3/4 min-h-96 overflow-hidden border border-(--line) bg-(--card)"
          >
            <Image
              src="/images/ilya-portrait.jpeg"
              alt="Portrait of Ilya"
              fill
              priority={false}
              sizes="(min-width: 1024px) 38vw, calc(100vw - 32px)"
              className="object-cover object-[50%_34%]"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_56%,rgba(10,10,15,0.42))]"
              aria-hidden="true"
            />
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
                {/* PRE-LAUNCH: update availability status before public launch */}
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
          <RevealOnScroll className="relative max-w-4xl pl-6">
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
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
