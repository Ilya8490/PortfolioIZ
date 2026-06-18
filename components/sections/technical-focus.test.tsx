import { render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { technicalFocusItems } from "@/content/technical-focus";
import { TechnicalFocus } from "@/components/sections/technical-focus";

describe("TechnicalFocus", () => {
  it("renders the technical focus skill areas", () => {
    render(<TechnicalFocus />);

    expect(screen.getByText("Technical Focus")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Skills in practice across the projects I build.",
      }),
    ).toBeInTheDocument();

    for (const item of technicalFocusItems) {
      const card = screen.getByRole("heading", { name: item.title }).closest("article");

      expect(card).not.toBeNull();
      expect(within(card as HTMLElement).getByText(item.targetClient)).toBeInTheDocument();
      expect(within(card as HTMLElement).getByText(item.description)).toBeInTheDocument();
    }

    expect(screen.getAllByTestId("technical-focus-card")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Get in touch ->" })).toHaveAttribute(
      "href",
      "#contact",
    );
  });
});
