import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

describe("RevealOnScroll", () => {
  it("renders children in their final visible state by default", () => {
    render(
      <RevealOnScroll>
        <p>Readable without JavaScript</p>
      </RevealOnScroll>,
    );

    const wrapper = screen.getByTestId("reveal-on-scroll");

    expect(screen.getByText("Readable without JavaScript")).toBeInTheDocument();
    expect(wrapper).toHaveClass("motion-reveal");
    expect(wrapper).not.toHaveStyle({ opacity: "0" });
    expect(wrapper).not.toHaveStyle({ transform: "translateY(32px)" });
  });
});
