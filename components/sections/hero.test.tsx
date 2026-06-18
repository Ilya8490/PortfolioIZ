import { render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Hero", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("renders the developer portfolio positioning, calls to action, and capability tags", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "work@example.com");
    vi.resetModules();
    const { Hero } = await import("@/components/sections/hero");

    render(<Hero />);

    expect(
      screen.getByText("Junior Frontend / Fullstack Developer — Berlin"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Modern web projects shaped with clear code and thoughtful UI\./,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Projects" })).toHaveAttribute(
      "href",
      "#work",
    );
    expect(screen.getByRole("link", { name: /Get in touch/ })).toHaveAttribute(
      "href",
      "mailto:work@example.com",
    );

    for (const tag of ["Next.js", "TypeScript", "React", "Node.js", "UI/UX"]) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });
});
