import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Process } from "@/components/sections/process";

describe("Process", () => {
  it("renders the Phase 5 UX process timeline", () => {
    render(<Process />);

    expect(screen.getByText("UX Process")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "A process built for clarity, performance and results.",
      }),
    ).toBeInTheDocument();

    for (const title of [
      "Research",
      "Strategy",
      "Wireframe",
      "UI Design",
      "Prototype",
      "Development",
      "Launch",
    ]) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }

    expect(screen.getAllByLabelText(/Process marker for/i)).toHaveLength(7);
  });
});
