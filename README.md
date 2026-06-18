# Ilya — Portfolio Website

Personal portfolio site for Ilya, a frontend developer and UX/UI designer based in Berlin.

Live: set through `NEXT_PUBLIC_SITE_URL`.

## Tech Stack

- Next.js 15 App Router
- React
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- `next/font`
- `next/image`
- Vitest + Testing Library

## Getting Started

```bash
cp .env.example .env.local
npm install
npm run dev
npm run test
npm run typecheck
npm run lint
npm run build
npm run start
```

## Environment Variables

- `NEXT_PUBLIC_SITE_URL`: canonical site URL used by metadata, Open Graph, sitemap, and robots.
- `NEXT_PUBLIC_CONTACT_EMAIL`: contact email used by the footer and contact section.
- `NEXT_PUBLIC_ALLOW_INDEXING`: set to `false` for the initial Vercel deploy; set to `true` only after the domain, contact method, and Impressum are complete.

Use `.env.example` as the public template. Keep `.env.local` private.

## Project Structure

- `app/`: App Router pages, metadata, sitemap, and robots route.
- `components/layout/`: Navigation and footer.
- `components/sections/`: Rendered portfolio sections.
- `components/ui/`: Small shared UI primitives.
- `content/`: Editable site content for navigation, hero, projects, process, technical focus, contact, and about stats.
- `lib/`: Site config, animation utilities, GSAP setup, hooks, and tests.
- `public/images/`: Portrait and project screenshots.
- `styles/globals.css`: Global styles, tokens, focus states, and shared CSS helpers.
- `types/`: Shared TypeScript types.

## Updating Projects

Projects are managed in `content/projects.ts`.

Current `Project` shape:

```ts
{
  title: string;
  category: string;
  description: string;
  href?: string;
  technologies: string[];
  status: "verified" | "placeholder";
}
```

Project screenshots live in `public/images/projects/`. If a new project needs a custom mockup, update `components/sections/selected-work.tsx` using the existing patterns.

## Updating Content

- Contact details and social links: `content/contact.ts` and the environment variables.
- Project descriptions and external links: `content/projects.ts`.
- Technical focus: `content/technical-focus.ts`.
- Process steps: `content/process.ts`.
- Availability status: `components/sections/about.tsx` and `components/sections/contact.tsx`.
- About stats: `content/about.ts`.

Keep claims verifiable. Avoid fake metrics, unverifiable results, and placeholder public copy.

## Design System

Core CSS tokens live in `styles/globals.css`:

- `--ink`
- `--paper`
- `--lime`
- `--card`
- `--muted`
- `--fog`
- `--line`

The site uses a dark editorial portfolio direction with restrained lime accents, sharp spacing, visible keyboard focus states, and motion that respects reduced-motion preferences.

## Deployment

The intended first deploy is a private/noindex Vercel deployment on the free Vercel domain.

Set these values in the Vercel dashboard:

```env
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_CONTACT_EMAIL=zubrwebdev@gmail.com
NEXT_PUBLIC_ALLOW_INDEXING=false
```

`app/robots.ts` allows crawling so search engines can read page-level robots metadata. Indexing is controlled by `NEXT_PUBLIC_ALLOW_INDEXING` in `app/layout.tsx`.

When the site is ready for public promotion:

1. Configure the final domain in Vercel.
2. Update `NEXT_PUBLIC_SITE_URL`.
3. Confirm `NEXT_PUBLIC_CONTACT_EMAIL`.
4. Complete and review `/impressum`.
5. Set `NEXT_PUBLIC_ALLOW_INDEXING=true`.
6. Redeploy.

## Impressum

`/impressum` is intentionally incomplete and remains `noindex` regardless of the global indexing setting.

Before public indexing is enabled, Ilya must complete the page with real legal content and obtain a manual review against current German Anbieterkennzeichnung / DDG requirements. This repository does not provide legal advice.

## Pre-Launch TODO

Tier 1 blockers before public indexing:

- Ilya to provide: real `/impressum` legal content.
- Ilya to provide: manual legal review of `/impressum`.
- Ilya to verify: confirmed working contact method.
- Ilya to provide: production domain and final `NEXT_PUBLIC_SITE_URL`.
- Developer to verify: no visible fake or placeholder content on public indexed pages.

Tier 2 items before promoting the site:

- Ilya to confirm: current availability status.
- Ilya to approve: project descriptions and selected work links.
- Developer to implement: final OG image if the generated placeholder should be replaced.
- Developer to verify: Vercel environment variables and final deployment checks.

Tier 3 post-launch improvements:

- Additional selected work projects.
- Case study detail pages.
- Contact form with backend replacing the `mailto:` fallback.
- Blog or writing section.
- Analytics or event tracking.

## License

Not open source. All rights reserved.
