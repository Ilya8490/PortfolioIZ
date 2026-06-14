import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import ImpressumPage from "@/app/impressum/page";

describe("ImpressumPage", () => {
  it("renders required legal placeholders for completion before launch", () => {
    render(<ImpressumPage />);

    expect(
      screen.getByRole("heading", { name: "Impressum" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/REQUIRED LEGAL CONTENT - must be completed before going live/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Name: Ilya [Last Name]")).toBeInTheDocument();
    expect(screen.getByText("Address: [Street, PLZ, Berlin, Germany]")).toBeInTheDocument();
    expect(screen.getByText(/Current note:/)).toHaveTextContent("DDG");
  });
});
