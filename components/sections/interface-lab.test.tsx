import { render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { InterfaceLab } from "@/components/sections/interface-lab";
import { interfaceLabItems } from "@/content/interface-lab";

describe("InterfaceLab", () => {
  it("renders the Phase 6 mini UI gallery cards", () => {
    render(<InterfaceLab />);

    expect(screen.getByText("Interface Lab")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Small interface systems for cleaner decisions and smoother flows.",
      }),
    ).toBeInTheDocument();

    for (const item of interfaceLabItems) {
      const card = screen.getByRole("heading", { name: item.title }).closest("article");

      expect(card).not.toBeNull();
      expect(
        within(card as HTMLElement).getByLabelText(`Interface icon for ${item.title}`),
      ).toBeInTheDocument();
      expect(within(card as HTMLElement).getByText(item.description)).toBeInTheDocument();
    }

    expect(screen.getAllByLabelText(/Interface demo for/i)).toHaveLength(5);
  });
});
