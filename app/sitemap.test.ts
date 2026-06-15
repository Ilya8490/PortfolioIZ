import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("lists public indexable pages with canonical URLs", () => {
    expect(sitemap()).toEqual([
      expect.objectContaining({ url: "https://ilyazub.dev" }),
    ]);
  });
});
