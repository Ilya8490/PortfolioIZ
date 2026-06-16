"use client";

import { useEffect, useRef } from "react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { contactContent } from "@/content/contact";
import { ANIM, prefersReducedMotion } from "@/lib/animation";
import { gsap } from "@/lib/gsap";

const headline =
  "Open to the right opportunity. Freelance projects or full-time roles - let's talk.";

function ContactEmailText({ email }: { email: string }) {
  const [localPart, domain = ""] = email.split("@");

  return (
    <>
      <span>{localPart}</span>
      <span aria-hidden="true">@</span>
      <span className="sr-only">@</span>
      <span>{domain}</span>
    </>
  );
}

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
  const hasContactEmail = Boolean(contactContent.email);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return;
    }

    let matchMedia: ReturnType<typeof gsap.matchMedia> | undefined;

    const context = gsap.context(() => {
      const words = root.querySelectorAll("[data-contact-headline-word]");
      const line = root.querySelector("[data-contact-accent-line]");
      const actions = root.querySelectorAll("[data-contact-action]");

      matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: ANIM.scrollTrigger.start,
            once: ANIM.scrollTrigger.once,
          },
        });

        timeline
          .from(
            line,
            {
              height: 0,
              duration: ANIM.duration.default,
              ease: ANIM.ease.default,
            },
            0,
          )
          .from(
            words,
            {
              opacity: 0,
              y: 12,
              duration: ANIM.duration.fast,
              ease: ANIM.ease.default,
              stagger: ANIM.stagger.words,
            },
            0,
          )
          .from(
            actions,
            {
              opacity: 0,
              scale: 0.97,
              duration: ANIM.duration.fast,
              ease: ANIM.ease.default,
              stagger: ANIM.stagger.cards,
            },
            ANIM.duration.fast,
          );
      });
    }, root);

    return () => {
      matchMedia?.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={rootRef}
      aria-label="Contact"
      className="border-t border-(--line) bg-(--card) py-24 md:py-32"
    >
      <div className="section-shell grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:gap-16">
        <RevealOnScroll className="relative pl-6">
          <span
            data-contact-accent-line
            data-testid="contact-accent-line"
            className="absolute left-0 top-0 h-full w-0.5 bg-(--lime)"
            aria-hidden="true"
          />
          <p className="text-mono-label mb-5 text-xs text-(--lime)">Contact</p>
          <h2 className="text-display max-w-4xl text-4xl leading-[1.02] text-(--paper) md:text-6xl">
            {/* PRE-LAUNCH: update availability status before public launch */}
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
        </RevealOnScroll>

        <div className="lg:flex lg:justify-end">
          <div className="w-full max-w-md">
            <div className="flex flex-col gap-3 sm:flex-row">
              {hasContactEmail ? (
                <a
                  data-contact-action
                  href={`mailto:${contactContent.email}`}
                  className="inline-flex min-h-12 items-center justify-center border border-(--lime) bg-(--lime) px-5 text-sm font-semibold text-[#111111] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lime)"
                  style={{ color: "#111111" }}
                >
                  Send a Message -&gt;
                </a>
              ) : (
                <a
                  data-contact-action
                  href={contactContent.linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center border border-(--lime) bg-(--lime) px-5 text-sm font-semibold text-[#111111] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lime)"
                  style={{ color: "#111111" }}
                >
                  Contact via LinkedIn ↗
                </a>
              )}
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
            {/* POST-LAUNCH: add CV download link when a final CV file is ready */}
            <p className="mt-6 text-sm leading-6 text-(--fog)">
              {hasContactEmail ? (
                <>
                  or reach me directly at{" "}
                  <a
                    data-contact-action
                    href={`mailto:${contactContent.email}`}
                    aria-label={`or reach me directly at ${contactContent.email}`}
                    className="text-(--paper) transition-colors hover:text-(--lime)"
                  >
                    <ContactEmailText email={contactContent.email as string} />
                  </a>
                </>
              ) : (
                <>
                  The fastest way to reach me right now is{" "}
                  <a
                    data-contact-action
                    href={contactContent.linkedInUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-(--paper) transition-colors hover:text-(--lime)"
                  >
                    LinkedIn
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
