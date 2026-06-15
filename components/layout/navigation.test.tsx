import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { Navigation } from "@/components/layout/navigation";

describe("Navigation", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("renders the portfolio logo, primary links, and contact CTA", () => {
    render(<Navigation />);

    expect(screen.getByRole("link", { name: "IL_" })).toHaveAttribute("href", "#top");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: "Process" })).toHaveAttribute(
      "href",
      "#process",
    );
    expect(screen.queryByRole("link", { name: "Lab" })).not.toBeInTheDocument();
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

  it("moves focus into the mobile menu and locks page scroll when opened", async () => {
    render(<Navigation />);

    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

    expect(screen.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(document.body).toHaveStyle({ overflow: "hidden" });

    const mobileNavigation = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });

    await waitFor(() => {
      expect(within(mobileNavigation).getByRole("link", { name: "Work" })).toHaveFocus();
    });
  });

  it("closes the mobile menu with Escape and returns focus to the trigger", async () => {
    render(<Navigation />);

    const trigger = screen.getByRole("button", { name: "Open navigation menu" });
    fireEvent.click(trigger);

    const mobileNavigation = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });

    await waitFor(() => {
      expect(within(mobileNavigation).getByRole("link", { name: "Work" })).toHaveFocus();
    });

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveFocus();
    });
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });
});
