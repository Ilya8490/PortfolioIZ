import { render, screen, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Contact } from "@/components/sections/contact";
import { contactContent } from "@/content/contact";

describe("Contact", () => {
  it("renders the Phase 9 dual-audience CTA with split headline words", () => {
    render(<Contact />);

    const section = screen.getByLabelText("Contact");

    expect(section).toHaveTextContent(
      "Open to the right opportunity. Freelance projects or full-time roles - let's talk.",
    );
    expect(
      within(section).getByText("Response time: usually within 24 hours."),
    ).toBeInTheDocument();
    expect(within(section).getAllByTestId("contact-headline-word").length).toBeGreaterThan(
      10,
    );
    expect(within(section).getByTestId("contact-accent-line")).toBeInTheDocument();

    expect(
      within(section).getByRole("link", { name: "Send a Message ->" }),
    ).toHaveAttribute("href", `mailto:${contactContent.email}`);
    expect(within(section).getByRole("link", { name: "View LinkedIn ↗" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(
      within(section).getByRole("link", {
        name: `or reach me directly at ${contactContent.email}`,
      }),
    ).toHaveAttribute("href", `mailto:${contactContent.email}`);
  });
});
