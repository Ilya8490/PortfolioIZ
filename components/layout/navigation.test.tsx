import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Navigation } from "@/components/layout/navigation";

describe("Navigation", () => {
  it("renders the portfolio logo, primary links, and contact CTA", () => {
    render(<Navigation />);

    expect(screen.getByRole("link", { name: "IL_" })).toHaveAttribute("href", "#top");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: "Process" })).toHaveAttribute(
      "href",
      "#process",
    );
    expect(screen.getByRole("link", { name: "Lab" })).toHaveAttribute("href", "#lab");
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "#services",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "#contact",
    );
    expect(screen.getByRole("link", { name: /Let's Talk/ })).toHaveAttribute(
      "href",
      "#contact",
    );
  });

  it("renders an accessible mobile menu button", () => {
    render(<Navigation />);

    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
