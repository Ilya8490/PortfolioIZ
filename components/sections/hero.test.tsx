import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/sections/hero";

describe("Hero", () => {
  it("renders the Phase 2 positioning, calls to action, and capability tags", () => {
    render(<Hero />);

    expect(
      screen.getByText("Frontend Developer & UX/UI Designer — Berlin"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Websites built to perform in the real world\./,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Work" })).toHaveAttribute(
      "href",
      "#work",
    );
    expect(screen.getByRole("link", { name: /Let's Talk/ })).toHaveAttribute(
      "href",
      "#contact",
    );

    for (const tag of ["Next.js", "TypeScript", "UX/UI", "SEO", "Performance"]) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });
});
