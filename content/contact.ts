import { contactEmail } from "@/lib/site-config";

export const contactContent = {
  email: contactEmail,
  linkedInUrl: "https://www.linkedin.com/in/ilya-zubrytskyy/",
  githubUrl: "https://github.com/Ilya8490",
};

export const footerNavItems = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Impressum", href: "/impressum" },
] as const;
