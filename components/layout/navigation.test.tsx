import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Navigation", () => {
  afterEach(() => {
    document.body.style.overflow = "";
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("renders the portfolio logo, primary links, and email contact CTA", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "work@example.com");
    vi.resetModules();
    const { Navigation } = await import("@/components/layout/navigation");

    render(<Navigation />);

    expect(screen.getByRole("link", { name: "IL_" })).toHaveAttribute("href", "#top");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: "Process" })).toHaveAttribute(
      "href",
      "#process",
    );
    expect(screen.queryByRole("link", { name: "Lab" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Technical Focus" })).toHaveAttribute(
      "href",
      "#technical-focus",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "#contact",
    );
    expect(screen.getByRole("link", { name: /Get in touch/ })).toHaveAttribute(
      "href",
      "mailto:work@example.com",
    );
  });

  it("renders an accessible mobile menu button", async () => {
    const { Navigation } = await import("@/components/layout/navigation");

    render(<Navigation />);

    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("moves focus into the mobile menu and locks page scroll when opened", async () => {
    const { Navigation } = await import("@/components/layout/navigation");

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
    const { Navigation } = await import("@/components/layout/navigation");

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
