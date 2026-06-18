export type NavigationItem = {
  label: string;
  href: string;
};

export type ProjectStatus = "verified" | "placeholder";

export type Project = {
  title: string;
  category: string;
  description: string;
  href?: string;
  technologies: string[];
  status: ProjectStatus;
};

export type TechnicalFocusItem = {
  title: string;
  targetClient: string;
  description: string;
};

export type AboutStat = {
  value: string;
  label: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type InterfaceLabItem = {
  title: string;
  description: string;
  icon: string;
  demo: "navigation" | "booking" | "dashboard" | "mobile" | "micro";
};
