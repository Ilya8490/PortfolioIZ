import { render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/footer";

describe("Footer", () => {
  it("renders the curated footer navigation, social links, dynamic year, and top link", () => {
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
    expect(within(footerNav).queryByRole("link", { name: "Services" })).not.toBeInTheDocument();

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
      expect.stringContaining("mailto:"),
    );
    expect(screen.getByText(`© ${new Date().getFullYear()} Ilya. All rights reserved.`));
    expect(screen.getByRole("link", { name: "↑ Back to top" })).toHaveAttribute(
      "href",
      "#top",
    );
  });
});
