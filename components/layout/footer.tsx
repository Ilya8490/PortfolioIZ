import Link from "next/link";
import { contactContent, footerNavItems } from "@/content/contact";

export function Footer() {
  const year = new Date().getFullYear();
  const hasContactEmail = Boolean(contactContent.email);

  return (
    <footer className="border-t border-(--muted) bg-[#07070B] pb-10 pt-20">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[0.5fr_1fr_0.5fr] md:items-center">
          <Link
            href="#top"
            className="text-display text-2xl font-bold tracking-[-0.03em] text-(--paper)"
          >
            IL_
          </Link>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-3 md:justify-center">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-mono-label text-[11px] text-(--fog) transition-colors hover:text-(--paper)"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-3 md:justify-end">
            <a
              href={contactContent.linkedInUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-mono-label flex h-10 w-10 items-center justify-center border border-(--line) text-[10px] text-(--paper) transition-colors hover:border-(--lime) hover:text-(--lime)"
            >
              <span aria-hidden="true">in</span>
            </a>
            <a
              href={contactContent.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-mono-label flex h-10 w-10 items-center justify-center border border-(--line) text-[10px] text-(--paper) transition-colors hover:border-(--lime) hover:text-(--lime)"
            >
              <span aria-hidden="true">gh</span>
            </a>
            {hasContactEmail && (
              <a
                href={`mailto:${contactContent.email}`}
                aria-label="Email"
                className="text-mono-label flex h-10 w-10 items-center justify-center border border-(--line) text-[10px] text-(--paper) transition-colors hover:border-(--lime) hover:text-(--lime)"
              >
                <span aria-hidden="true">@</span>
              </a>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-(--line) pt-8 text-sm text-(--fog) md:flex-row md:items-center md:justify-between">
          <p>© {year} Ilya. All rights reserved.</p>
          {/* Smooth scroll to top - use native scroll-behavior: smooth on html element */}
          <Link
            href="#top"
            className="text-mono-label text-[11px] text-(--paper) transition-colors hover:text-(--lime)"
          >
            ↑ Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
