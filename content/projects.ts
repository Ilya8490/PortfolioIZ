import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Catering Ice",
    category: "Business Website",
    description:
      "Los Angeles ice cream catering site for weddings, private parties, and corporate events, with event packages, custom quote CTAs, and premium service positioning.",
    href: "https://catericecream.vercel.app",
    technologies: ["Next.js", "Responsive UI", "SEO Metadata"],
    status: "verified",
  },
  {
    title: "Personal News Feed",
    category: "Web App",
    description:
      "Personalized news platform that turns broad headlines into a feed shaped by each reader’s interests, saved stories, and onboarding preferences. It combines Next.js App Router, Prisma, PostgreSQL, and NextAuth to handle real user accounts, persistent article saving, and server-rendered personalization.",
    technologies: ["React", "API", "Prisma", "PostgreSQL"],
    status: "verified",
  },
  {
    title: "QuitQuest",
    category: "Product Interface",
    description:
      "Editable placeholder until a live URL, repository, or README is provided.",
    technologies: ["Frontend", "UX/UI"],
    status: "placeholder",
  },
  {
    title: "WordPress Business Website",
    category: "WordPress",
    description: "Editable placeholder until project source material is provided.",
    technologies: ["WordPress", "Responsive Design"],
    status: "placeholder",
  },
];
