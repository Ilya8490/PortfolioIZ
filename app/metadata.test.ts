import { describe, expect, it } from "vitest";
import { vi } from "vitest";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter" }),
  Space_Grotesk: () => ({ variable: "--font-space-grotesk" }),
  Space_Mono: () => ({ variable: "--font-space-mono" }),
}));

import { metadata } from "@/app/layout";
import { metadata as impressumMetadata } from "@/app/impressum/page";

describe("site metadata", () => {
  it("defines production SEO and social sharing metadata", () => {
    expect(metadata.title).toEqual({
      default: "Ilya | Frontend Developer & UX/UI Designer, Berlin",
      template: "%s | Ilya",
    });
    expect(metadata.description?.length).toBeGreaterThanOrEqual(150);
    expect(metadata.description?.length).toBeLessThanOrEqual(160);
    expect(metadata.metadataBase?.toString()).toBe("https://ilyazub.dev/");
    expect(metadata.alternates).toEqual({ canonical: "/" });
    expect(metadata.robots).toEqual({
      index: true,
      follow: true,
    });
    expect(metadata.openGraph).toMatchObject({
      title: "Ilya | Frontend Developer & UX/UI Designer, Berlin",
      url: "/",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Ilya | Frontend Developer & UX/UI Designer, Berlin",
      images: ["/og-image.png"],
    });
  });

  it("keeps Impressum out of search indexing until legal details are complete", () => {
    expect(impressumMetadata.robots).toEqual({
      index: false,
      follow: false,
    });
  });
});
