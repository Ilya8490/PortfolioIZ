import { render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { SelectedWork } from "@/components/sections/selected-work";

describe("SelectedWork", () => {
  it("renders the Phase 4 project showcase with verified and placeholder content", () => {
    render(<SelectedWork />);

    expect(screen.getByText("Selected Work")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "A few sharp builds, shown with clear source confidence.",
      }),
    ).toBeInTheDocument();

    const projectNames = [
      "Catering Ice",
      "Personal News Feed",
      "Weather Dashboard",
      "Business Website",
    ];

    for (const title of projectNames) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }

    const cateringIce = screen
      .getByRole("heading", { name: "Catering Ice" })
      .closest("article");

    expect(cateringIce).not.toBeNull();
    expect(within(cateringIce as HTMLElement).getByText("Verified")).toBeInTheDocument();
    expect(
      within(cateringIce as HTMLElement).getByText(
        /Los Angeles ice cream catering site for weddings, private parties, and corporate events/i,
      ),
    ).toBeInTheDocument();
    expect(
      within(cateringIce as HTMLElement).getByRole("link", {
        name: /Open Catering Ice/i,
      }),
    ).toHaveAttribute("href", "https://catericecream.vercel.app");
    expect(
      within(cateringIce as HTMLElement).getByRole("img", {
        name: "Catering Ice desktop website screenshot",
      }),
    ).toHaveAttribute("src", expect.stringContaining("icecream-desktop.webp"));
    expect(
      within(cateringIce as HTMLElement).getByRole("img", {
        name: "Catering Ice mobile website screenshot",
      }),
    ).toHaveAttribute("src", expect.stringContaining("icecream-mobile.webp"));

    const personalNewsFeed = screen
      .getByRole("heading", { name: "Personal News Feed" })
      .closest("article");

    expect(personalNewsFeed).not.toBeNull();
    expect(
      within(personalNewsFeed as HTMLElement).getByRole("img", {
        name: "Personal News Feed desktop app screenshot",
      }),
    ).toHaveAttribute("src", expect.stringContaining("news-desktop.webp"));
    expect(
      within(personalNewsFeed as HTMLElement).getByRole("img", {
        name: "Personal News Feed mobile app screenshot",
      }),
    ).toHaveAttribute("src", expect.stringContaining("news-mobile.webp"));

    const weatherDashboard = screen
      .getByRole("heading", { name: "Weather Dashboard" })
      .closest("article");

    expect(weatherDashboard).not.toBeNull();
    expect(
      within(weatherDashboard as HTMLElement).getByRole("img", {
        name: "Weather Dashboard desktop app screenshot",
      }),
    ).toHaveAttribute("src", expect.stringContaining("weather.webp"));

    const businessWebsite = screen
      .getByRole("heading", { name: "Business Website" })
      .closest("article");

    expect(businessWebsite).not.toBeNull();
    expect(
      within(businessWebsite as HTMLElement).getByRole("img", {
        name: "Business Website desktop website screenshot",
      }),
    ).toHaveAttribute("src", expect.stringContaining("architect.webp"));

    expect(screen.getAllByText("Verified")).toHaveLength(4);
    expect(screen.queryByText("Placeholder")).not.toBeInTheDocument();
    expect(screen.queryByText("Mockup Placeholder")).not.toBeInTheDocument();

    for (const number of ["01", "02", "03", "04"]) {
      expect(screen.getByText(number)).toBeInTheDocument();
    }
  });
});
