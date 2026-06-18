import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Catering Ice",
    category: "Business Website",
    description:
      "Los Angeles ice cream catering site for weddings, private parties, and corporate events, with event packages, custom quote CTAs, and polished event-focused positioning.",
    href: "https://catericecream.vercel.app",
    technologies: ["Next.js", "Responsive UI", "SEO Metadata"],
    status: "verified",
  },
  {
    title: "Personal News Feed",
    category: "Web App",
    description:
      "Personalized news platform that turns broad headlines into a feed shaped by each reader’s interests, saved stories, and onboarding preferences. It combines Next.js App Router, Prisma, PostgreSQL, and NextAuth to handle real user accounts, persistent article saving, and server-rendered personalization.",
    href: "https://news-api-feed.vercel.app",
    technologies: ["React", "API", "Prisma", "PostgreSQL"],
    status: "verified",
  },
  {
    title: "Weather Dashboard",
    category: "Product Interface",
    description:
      "A responsive weather application built with React, TypeScript, Tailwind CSS, and TanStack Query. It includes global city search, live current conditions, short-term forecasts, favorites stored in local storage, and a modern responsive UI.",
    href: "https://weather-app-new-peach.vercel.app",
    technologies: ["React", "TypeScript", "Tailwind CSS", "TanStack Query", "localStorage"],
    status: "verified",
  },
  {
    title: "Business Website",
    category: "Portfolio",
    description: "Premium architect portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and static export.",
    href: "https://architect-landingportfolio.vercel.app",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    status: "verified",
  },
];
