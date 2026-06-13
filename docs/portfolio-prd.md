# Portfolio Website — Phased Build Prompt for Codex

## Role

You are a senior frontend developer, UI designer, and UX-focused creative developer.

Build a premium personal portfolio website for **Ilya**, a Berlin-based frontend developer with UX/UI sensibility, e-commerce experience, WordPress experience, and modern React/Next.js skills.

The website should not look like a generic junior developer portfolio. It should feel like a sharp, technical, memorable portfolio for someone who understands design, frontend engineering, UX, performance, and client needs.

## Core Positioning

Use this positioning:

**Frontend Developer & UX/UI Designer**  
**Building fast, clear, conversion-focused websites for modern businesses.**

Avoid positioning Ilya as a pure Shopify specialist unless real Shopify project evidence exists in the codebase or project sources.

## Main Goal

The website must make potential clients, agencies, or hiring managers think:

> This person understands both design and code. I would trust him to build a professional website.

## Important Working Rule

Do not build everything at once.

Work strictly in phases.

After every phase:

1. Stop.
2. Summarize what was completed.
3. List changed files.
4. Run relevant checks.
5. Wait for approval before continuing to the next phase.

Do not continue to the next phase unless explicitly asked.

---

# Technical Direction

## Stack

Use:

- Next.js App Router
- TypeScript strict mode
- Tailwind CSS
- CSS Modules only if needed for complex animations
- GSAP as the primary animation library
- GSAP ScrollTrigger for scroll-based animation
- React Three Fiber / Three.js only if useful and performance-safe
- next/font for fonts
- next/image for optimized images
- ESLint
- Prettier

GSAP ScrollTrigger should be used for premium scroll-based interactions, pinned sections, timeline animations, and controlled reveal animations. Use GSAP carefully and clean up animations properly in React components.

## Do Not Use

Do not use:

- MUI
- Bootstrap
- Redux
- GraphQL
- tRPC
- unnecessary state management libraries

All UI components must be custom-built.

---

# Design Direction

Use the provided hero design direction as the main visual reference.

The design should feel:

- dark
- premium
- technical
- editorial
- sharp
- confident
- slightly experimental
- not generic
- not overly playful
- not corporate SaaS

## Color Tokens

Use these CSS variables:

```css
--ink: #0A0A0F;
--paper: #F0F0E8;
--lime: #E8FF47;
--card: #14141C;
--muted: #3D3D50;
--fog: #6B6B80;
```

## Typography

Use:

- Display / Headlines: Space Grotesk
- Body: Inter
- Mono / Labels / Tags: Space Mono

Typography rules:

- Headlines should be large, tight, and confident.
- Use `letter-spacing: -0.03em` for large display headings.
- Use `line-height: 0.95–1.05` for hero headlines.
- Use Space Mono for labels, tags, counters, and technical details.

## Visual Rules

- Use lime as a single controlled accent.
- Do not use lime as a large background except for small CTA buttons.
- No border-radius above 6px except special cases.
- Add subtle noise overlay globally.
- Use a hero grid background with very low opacity.
- Avoid heavy shadows.
- Avoid generic gradients.
- Avoid fake glassmorphism overload.
- Use strong spacing, alignment, and rhythm.

---

# Content Rules

Do not invent fake achievements.

Do not use fake metrics such as:

- 34% conversion lift
- 150k orders processed
- 100% client satisfaction
- 10+ happy clients

unless these are provided and verifiable.

Use real, safe content instead:

- project count if available
- technologies
- Berlin location
- project types
- performance focus
- UX/UI focus
- frontend development focus

If information is unknown, write realistic placeholder content and mark it clearly as editable.

Avoid generic phrases:

- passionate developer
- crafting digital experiences
- innovative solutions
- pixel-perfect websites
- cutting-edge technologies

Prefer concrete language:

- fast websites
- clear interfaces
- responsive layouts
- booking flows
- landing pages
- e-commerce UX
- performance optimization
- SEO foundations

---

# Project Data Sources

Before writing final project descriptions, inspect available project sources.

Use live URLs first, then GitHub repositories, then README files, then package.json files.

Project sources may include:

```text
https://catericecream.vercel.app
```
https://weather-app-new-peach.vercel.app

https://architect-landingportfolio.vercel.app

https://e-commerce-dashboard-client.vercel.app

Other projects may be provided later as GitHub links.

For every project, generate content from real available information.

Do not invent:

- business outcomes
- client testimonials
- revenue results
- conversion numbers
- user numbers
- technologies not found in the project
- features not present in the project

If project details are unavailable, use clear placeholders.

---

# Website Structure

Build the website with these main sections:

1. Navigation
2. Hero
3. Selected Capabilities
4. Selected Work
5. UX Process
6. Interface Lab
7. Services
8. About
9. Design Philosophy
10. Contact CTA
11. Footer

---

# Phase 0 — Project Audit and Plan

Before writing code:

1. Inspect the current project structure.
2. Identify framework version, existing dependencies, styling setup, and file structure.
3. Check whether Tailwind is installed.
4. Check whether TypeScript strict mode is enabled.
5. Check whether there are existing components or assets.
6. Check package.json scripts.
7. Create a concise implementation plan.

Output:

- project audit summary
- proposed file structure
- risks
- exact Phase 1 plan

Stop after this phase.

Do not modify files in Phase 0.

---

# Phase 1 — Foundation Setup

Goal:

Prepare the base architecture and visual system.

Tasks:

1. Configure global CSS variables.
2. Add font setup with next/font.
3. Configure base metadata.
4. Add global layout structure.
5. Add noise overlay.
6. Add base container utilities.
7. Add reusable UI primitives:
   - Button
   - Tag
   - SectionEyebrow
   - SectionHeader
8. Add content files for projects, services, process steps, and navigation.

Suggested structure:

```text
/app
  layout.tsx
  page.tsx
/components
  /ui
  /layout
  /sections
  /animations
/content
  projects.ts
  services.ts
  process.ts
  navigation.ts
/lib
  utils.ts
  animation.ts
/types
  index.ts
/styles
  globals.css
```

Checks:

- npm run lint
- npm run typecheck if available
- npm run build if reasonable

Stop after Phase 1.

---

# Phase 2 — Navigation and Hero

Goal:

Build the first-screen experience.

Hero should closely follow the provided dark technical design direction.

## Navigation

Requirements:

- fixed top nav
- logo: `IL_`
- links: Work, Process, Lab, Services, About, Contact
- right CTA: `Let's Talk →`
- desktop layout
- mobile hamburger menu
- accessible keyboard navigation
- visible focus states
- backdrop blur after scroll

## Hero

Hero should include:

- eyebrow
- large 3-line headline
- body text
- CTA buttons
- technology tags
- scroll hint
- optional floating code card

Recommended hero copy direction:

Eyebrow:

```text
Frontend Developer & UX/UI Designer — Berlin
```

Headline options:

```text
Websites built
to perform
in the real world.
```

or:

```text
Frontend development
with an eye
for UX.
```

Body:

```text
I design and build fast, responsive websites with clear user flows, polished interfaces, and clean frontend architecture.
```

CTA:

- View Work
- Let's Talk

Important:

- Do not use fake conversion metrics.
- If metrics are included, use capability-based labels instead of fake numbers.

Example capability strip:

```text
Next.js
TypeScript
UX/UI
SEO
Performance
```

Animations:

- controlled page-load sequence
- headline reveal or scramble animation
- subtle floating code card
- respect prefers-reduced-motion

Stop after Phase 2.

---

# Phase 3 — Selected Capabilities

Goal:

Add a short, high-impact section that explains what Ilya can do before showing projects.

Create four capability cards:

1. UX/UI Thinking
2. Frontend Development
3. Performance Optimization
4. SEO Foundations

Each card should include:

- number
- short title
- 1–2 sentence description
- subtle hover state
- lime accent on hover only

Animation:

- GSAP reveal on scroll
- staggered entrance
- no excessive movement

Stop after Phase 3.

---

# Phase 4 — Selected Work

Goal:

Build the main project showcase section.

Layout:

- dark section
- large editorial heading
- alternating project rows, not a basic card grid
- project number in large outline style
- project title
- category
- short description
- tech tags
- project image/mockup placeholder
- link to case study or external source

Initial projects:

1. Catering Ice
2. Personal News Feed
3. QuitQuest
4. WordPress Business Website

For Catering Ice:

Use the provided live URL if available:

```text
https://catericecream.vercel.app
```

For other projects:

Use placeholder data until GitHub/live URLs are provided.

Each project must clearly indicate whether the content is verified or placeholder.

Do not write fake results.

Project row hover:

- image scale 1 → 1.03
- arrow movement
- outline number fades slightly
- lime accent appears

Stop after Phase 4.

---

# Phase 5 — UX Process

Goal:

Show design and development thinking.

Section title:

```text
A process built for clarity, performance and results.
```

Steps:

1. Research
2. Strategy
3. Wireframe
4. UI Design
5. Prototype
6. Development
7. Launch

Design:

- horizontal timeline on desktop
- vertical timeline on mobile
- icon-based markers
- dotted connecting line
- no cliché oversized numbered circles

Animation:

- GSAP ScrollTrigger
- staggered step reveal
- reduced motion fallback

Stop after Phase 5.

---

# Phase 6 — Interface Lab

Goal:

Create a section that demonstrates UX/UI craftsmanship.

Cards:

1. Navigation Systems
2. Booking Forms
3. Dashboards
4. Mobile Layouts
5. Micro Interactions

Each card should include:

- icon
- title
- short description
- hover state

Optional enhancement:

Create small interactive visual demos inside some cards, but only if performance remains good.

This section should feel like a mini UI gallery, not a generic skills list.

Stop after Phase 6.

---



---

# Phase 9 — Contact CTA and Footer

Goal:

Create a strong final conversion section.

Contact CTA:

Headline:

```text
Have a project in mind?
Let's build something clear, fast and memorable.
```

Supporting text:

```text
Send a message if you need a business website, landing page, redesign, or frontend support.
```

CTA:

```text
Get In Touch →
```

Footer:

- logo
- nav links
- LinkedIn
- GitHub
- Email
- copyright
- impressum

Stop after Phase 9.

---

# Phase 10 — Motion System and GSAP Refinement

Goal:

Refine animations across the site.

Use GSAP for:

- hero entrance sequence
- scroll-triggered reveals
- selected work transitions
- process timeline
- interface lab hover enhancements
- section pinning only if it improves UX

Rules:

- animations must feel premium, not distracting
- no long intro animations
- no scroll hijacking
- no animation that blocks reading
- respect prefers-reduced-motion
- clean up GSAP instances properly

Use GSAP ScrollTrigger for scroll-linked animation where appropriate.

Stop after Phase 10.

---

# Phase 11 — Responsive, Accessibility and Performance Pass

Goal:

Make the site production-ready.

Check:

- mobile 375px
- tablet
- laptop
- desktop
- large desktop

Accessibility:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient color contrast
- alt text
- aria-labels where needed
- prefers-reduced-motion support
- custom cursor disabled on touch and reduced motion

Performance:

- optimize images
- avoid unnecessary client components
- avoid heavy 3D unless clearly justified
- lazy-load non-critical animations
- check bundle impact
- avoid layout shift

Target Lighthouse:

- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

Stop after Phase 11.

---

# Phase 12 — Final Polish and Documentation

Goal:

Prepare final handoff.

Tasks:

1. Review all copy.
2. Remove placeholders or mark them clearly.
3. Add README section explaining:
   - project goal
   - tech stack
   - scripts
   - design direction
   - animation approach
   - project structure
4. Confirm build passes.
5. Confirm lint passes.
6. Provide final summary.

Final output:

- changed files
- key implementation decisions
- remaining TODOs
- how to run locally
- how to add new projects
- how to update content

Stop after Phase 12.

---

# Global Quality Rules

Always:

- prefer clean architecture
- prefer readable components
- keep components small
- avoid duplicated animation logic
- avoid fake data
- avoid generic copy
- keep performance in mind
- make mobile excellent
- keep accessibility intact

Never:

- build all phases at once
- invent project results
- add unnecessary libraries
- use a UI component library
- hide important content behind animation
- make the design look like a template
- ignore reduced motion
- ignore keyboard users

---

# First Task

Start with **Phase 0 only**.

Inspect the project, summarize the current state, propose the implementation plan, and stop.

Do not modify files yet.
