import { render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { About } from "@/components/sections/about";
import { aboutStats } from "@/content/about";

describe("About", () => {
  it("renders the Phase 8 combined about and philosophy section", () => {
    render(<About />);

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "A growing developer profile shaped by real projects.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "I am a junior frontend / fullstack developer based in Berlin, building selected projects to practice modern web development, product thinking, and clean implementation.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Open to junior developer roles, internships, and professional networking."),
    ).toBeInTheDocument();

    const stats = screen.getByLabelText("About stats");
    for (const stat of aboutStats) {
      expect(within(stats).getByText(stat.value)).toBeInTheDocument();
      expect(within(stats).getByText(stat.label)).toBeInTheDocument();
    }

    expect(screen.getByRole("img", { name: "Portrait of Ilya" })).toHaveAttribute(
      "src",
      expect.stringContaining("ilya-portrait.jpeg"),
    );

    const philosophy = screen.getByLabelText("Design philosophy");
    expect(philosophy).toHaveTextContent("Good design does not fight for attention.");
    expect(philosophy).toHaveTextContent("It helps people understand, decide, and act.");
    expect(within(philosophy).getByTestId("philosophy-line")).toBeInTheDocument();
    expect(within(philosophy).getAllByTestId("philosophy-word").length).toBeGreaterThan(30);
  });
});
