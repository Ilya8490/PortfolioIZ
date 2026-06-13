import { render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import { Services } from "@/components/sections/services";

describe("Services", () => {
  it("renders the Phase 7 client-focused service clusters", () => {
    render(<Services />);

    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Specialist help for websites that need to perform.",
      }),
    ).toBeInTheDocument();

    for (const service of services) {
      const card = screen.getByRole("heading", { name: service.title }).closest("article");

      expect(card).not.toBeNull();
      expect(within(card as HTMLElement).getByText(service.targetClient)).toBeInTheDocument();
      expect(within(card as HTMLElement).getByText(service.description)).toBeInTheDocument();
    }

    expect(screen.getAllByTestId("service-card")).toHaveLength(3);
    expect(
      screen.getByRole("link", { name: "Not sure what you need? Let's talk through it. ->" }),
    ).toHaveAttribute("href", "#contact");
  });
});
