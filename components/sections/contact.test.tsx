import { render, screen, within } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Contact", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("renders the Phase 9 dual-audience CTA with split headline words", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "work@example.com");
    vi.resetModules();
    const { Contact } = await import("@/components/sections/contact");

    render(<Contact />);

    const section = screen.getByLabelText("Contact");

    expect(section).toHaveTextContent(
      "Get in touch about junior developer roles, internships, or professional networking.",
    );
    expect(
      within(section).getByText("For HR, recruiters, and tech contacts, email is the best place to start."),
    ).toBeInTheDocument();
    expect(within(section).getAllByTestId("contact-headline-word").length).toBeGreaterThan(
      10,
    );
    expect(within(section).getByTestId("contact-accent-line")).toBeInTheDocument();

    expect(
      within(section).getByRole("link", { name: "Email me ->" }),
    ).toHaveAttribute("href", "mailto:work@example.com");
    expect(within(section).getByRole("link", { name: "View LinkedIn ↗" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(
      within(section).getByRole("link", {
        name: "Email work@example.com",
      }),
    ).toHaveAttribute("href", "mailto:work@example.com");
  });

  it("renders a temporary contact state when no contact email is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "");
    vi.resetModules();
    const { Contact } = await import("@/components/sections/contact");

    render(<Contact />);

    const section = screen.getByLabelText("Contact");

    expect(within(section).getByRole("link", { name: "Contact on LinkedIn ↗" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/illia-zubr/",
    );
    expect(
      within(section).getByRole("link", { name: "LinkedIn" }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/illia-zubr/");
    expect(section).not.toHaveTextContent(/pending/i);
  });
});
