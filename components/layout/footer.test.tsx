import { render, screen, within } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Footer", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("renders the curated footer navigation, social links, dynamic year, and top link", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "work@example.com");
    vi.resetModules();
    const { Footer } = await import("@/components/layout/footer");

    render(<Footer />);

    expect(screen.getByRole("link", { name: "IL_" })).toHaveAttribute("href", "#top");

    const footerNav = screen.getByRole("navigation", { name: "Footer navigation" });
    for (const [label, href] of [
      ["Work", "#work"],
      ["Process", "#process"],
      ["About", "#about"],
      ["Impressum", "/impressum"],
    ]) {
      expect(within(footerNav).getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href,
      );
    }
    expect(within(footerNav).queryByRole("link", { name: "Lab" })).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:work@example.com",
    );
    expect(screen.getByText(`© ${new Date().getFullYear()} Ilya. All rights reserved.`));
    expect(screen.getByRole("link", { name: "↑ Back to top" })).toHaveAttribute(
      "href",
      "#top",
    );
  });

  it("does not render a fake email link when no contact email is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "");
    vi.resetModules();
    const { Footer } = await import("@/components/layout/footer");

    render(<Footer />);

    expect(screen.queryByRole("link", { name: "Email" })).not.toBeInTheDocument();
    expect(screen.queryByText(/pending/i)).not.toBeInTheDocument();
  });
});
