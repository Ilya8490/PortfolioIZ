"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigationItems } from "@/content/navigation";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateScrolledState = () => {
      setHasScrolled(window.scrollY > 12);
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        hasScrolled
          ? "border-(--line) bg-[rgba(10,10,15,0.78)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 w-[min(calc(100%-32px),var(--container))] items-center justify-between"
      >
        <Link
          href="#top"
          className="text-display text-2xl font-bold tracking-[-0.03em] text-(--paper)"
        >
          IL_
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-mono-label text-[11px] text-(--fog) transition-colors hover:text-(--paper)"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="#contact"
          className="text-mono-label hidden min-h-10 items-center border border-(--line) px-4 text-[11px] text-(--paper) transition-colors hover:border-(--lime) hover:text-(--lime) md:inline-flex"
        >
          Let&apos;s Talk <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-(--line) md:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span
            className={`h-px w-5 bg-(--paper) transition-transform ${
              isMenuOpen ? "translate-y-0.75 rotate-45" : ""
            }`}
            aria-hidden="true"
          />
          <span
            className={`h-px w-5 bg-(--paper) transition-transform ${
              isMenuOpen ? "-translate-y-1 -rotate-45" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </nav>

      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-(--line) bg-[rgba(10,10,15,0.96)] px-4 py-5 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-mono-label py-2 text-sm text-(--paper)"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
