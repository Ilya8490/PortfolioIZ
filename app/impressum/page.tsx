import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Legal notice placeholders for Ilya's portfolio website.",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-svh bg-(--ink) px-4 py-24 text-(--paper)">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-mono-label text-xs text-(--fog) transition-colors hover:text-(--lime)"
        >
          ← Back to portfolio
        </Link>

        <h1 className="text-display mt-12 text-5xl leading-none md:text-7xl">
          Impressum
        </h1>

        <section className="mt-12 border border-(--line) bg-(--card) p-6 md:p-8">
          {/* REQUIRED LEGAL CONTENT - must be completed before going live */}
          {/* German DDG provider information rules may require full name, address, contact email, tax ID if applicable */}
          <p className="text-mono-label text-xs text-(--lime)">
            REQUIRED LEGAL CONTENT - must be completed before going live
          </p>

          <div className="mt-8 space-y-4 text-sm leading-7 text-(--fog) md:text-base">
            <p>Name: Ilya [Last Name]</p>
            <p>Address: [Street, PLZ, Berlin, Germany]</p>
            <p>Email: [contact email]</p>
            <p>Tax ID: [if applicable]</p>
          </div>
        </section>

        <section className="mt-8 border border-(--line) p-6 md:p-8">
          <p className="text-sm leading-7 text-(--fog)">
            Current note: German website provider-information duties are now commonly
            associated with the Digitale-Dienste-Gesetz (DDG), which replaced the
            former Telemediengesetz (TMG) in May 2024. Do not launch without
            completing this page with real legal information. This is not optional for
            a commercial or business portfolio operated from Germany.
          </p>
        </section>
      </div>
    </main>
  );
}
