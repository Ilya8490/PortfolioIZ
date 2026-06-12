import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Capabilities } from "@/components/sections/capabilities";

describe("Capabilities", () => {
  it("renders the Phase 3 heading and required capability cards", () => {
    render(<Capabilities />);

    expect(screen.getByText("Selected Capabilities")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Clear interfaces, fast builds, and the details that make websites useful.",
      }),
    ).toBeInTheDocument();

    for (const title of [
      "UX/UI Thinking",
      "Frontend Development",
      "Performance Optimization",
      "SEO Foundations",
    ]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }

    for (const number of ["01", "02", "03", "04"]) {
      expect(screen.getByText(number)).toBeInTheDocument();
    }
  });
});
