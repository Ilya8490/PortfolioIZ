"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactContent } from "@/content/contact";
import { prefersReducedMotion } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

const headline =
  "Open to the right opportunity. Freelance projects or full-time roles - let's talk.";

function SplitHeadline({ text }: { text: string }) {
  return (
    <>
      {text.split(/\s+/).map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            data-contact-headline-word
            data-testid="contact-headline-word"
            className="inline-block will-change-transform"
          >
            {word}
          </span>
          {index < text.split(/\s+/).length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }

    const context = gsap.context(() => {
      const words = root.querySelectorAll("[data-contact-headline-word]");
      const line = root.querySelector("[data-contact-accent-line]");
      const actions = root.querySelectorAll("[data-contact-action]");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          once: true,
        },
      });

      timeline
        .fromTo(
          line,
          { height: 0 },
          { height: "100%", duration: 0.6, ease: "power2.out" },
          0,
        )
        .fromTo(
          words,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.055,
          },
          0,
        )
        .fromTo(
          actions,
          { opacity: 0, scale: 0.97 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.15,
          },
          0.12,
        );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={rootRef}
      aria-label="Contact"
      className="border-t border-(--line) bg-(--card) py-24 md:py-32"
    >
      <div className="section-shell grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:gap-16">
        <div className="relative pl-6">
          <span
            data-contact-accent-line
            data-testid="contact-accent-line"
            className="absolute left-0 top-0 h-full w-0.5 bg-(--lime)"
            aria-hidden="true"
          />
          <p className="text-mono-label mb-5 text-xs text-(--lime)">Contact</p>
          <h2 className="text-display max-w-4xl text-4xl leading-[1.02] text-(--paper) md:text-6xl">
            {/* EDITABLE: Update availability status and openness to roles as needed */}
            <SplitHeadline text={headline} />
          </h2>
          <div className="mt-8 max-w-2xl space-y-5 text-sm leading-7 text-(--fog) md:text-base md:leading-8">
            <p>
              Whether you have a clear brief or just an early idea, I am happy to
              have an honest conversation about what you need and whether I am the
              right person to help.
            </p>
            <p className="text-(--paper)">Response time: usually within 24 hours.</p>
          </div>
        </div>

        <div className="lg:flex lg:justify-end">
          <div className="w-full max-w-md">
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* EDITABLE: Link primary CTA to contact form or mailto:your@email.com */}
              <a
                data-contact-action
                href={`mailto:${contactContent.email}`}
                className="inline-flex min-h-12 items-center justify-center border border-(--lime) bg-(--lime) px-5 text-sm font-semibold text-(--ink) transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lime)"
              >
                Send a Message -&gt;
              </a>
              {/* EDITABLE: Replace LinkedIn URL with real profile */}
              <a
                data-contact-action
                href={contactContent.linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center border border-(--line) px-5 text-sm font-semibold text-(--paper) transition-colors hover:border-(--lime) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lime)"
              >
                View LinkedIn ↗
              </a>
            </div>
            {/* EDITABLE: Add CV download link once CV file is ready */}
            <p className="mt-6 text-sm leading-6 text-(--fog)">
              or reach me directly at{" "}
              <a
                data-contact-action
                href={`mailto:${contactContent.email}`}
                aria-label={`or reach me directly at ${contactContent.email}`}
                className="text-(--paper) transition-colors hover:text-(--lime)"
              >
                <span>hello</span>
                <span aria-hidden="true">@</span>
                <span className="sr-only">@</span>
                <span>ilyazub.dev</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
