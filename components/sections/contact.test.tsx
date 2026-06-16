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
      "Open to the right opportunity. Freelance projects or full-time roles - let's talk.",
    );
    expect(
      within(section).getByText("Response time: usually within 24 hours."),
    ).toBeInTheDocument();
    expect(within(section).getAllByTestId("contact-headline-word").length).toBeGreaterThan(
      10,
    );
    expect(within(section).getByTestId("contact-accent-line")).toBeInTheDocument();

    expect(
      within(section).getByRole("link", { name: "Send a Message ->" }),
    ).toHaveAttribute("href", "mailto:work@example.com");
    expect(within(section).getByRole("link", { name: "View LinkedIn ↗" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(
      within(section).getByRole("link", {
        name: "or reach me directly at work@example.com",
      }),
    ).toHaveAttribute("href", "mailto:work@example.com");
  });

  it("renders a temporary contact state when no contact email is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "");
    vi.resetModules();
    const { Contact } = await import("@/components/sections/contact");

    render(<Contact />);

    const section = screen.getByLabelText("Contact");

    expect(within(section).getByRole("link", { name: "Contact via LinkedIn ↗" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/illia-zubr/",
    );
    expect(
      within(section).getByRole("link", { name: "LinkedIn" }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/illia-zubr/");
    expect(section).not.toHaveTextContent(/pending/i);
  });
});
