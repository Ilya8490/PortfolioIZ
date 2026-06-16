import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter" }),
  Space_Grotesk: () => ({ variable: "--font-space-grotesk" }),
  Space_Mono: () => ({ variable: "--font-space-mono" }),
}));

async function loadLayoutMetadata() {
  vi.resetModules();
  return import("@/app/layout");
}

async function loadImpressumMetadata() {
  vi.resetModules();
  return import("@/app/impressum/page");
}

describe("site metadata", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses environment-driven canonical and social URLs with noindex by default", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio-preview.vercel.app/");
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "false");

    const { metadata } = await loadLayoutMetadata();

    expect(metadata.title).toEqual({
      default: "Ilya | Frontend Developer & UX/UI Designer, Berlin",
      template: "%s | Ilya",
    });
    expect(metadata.description?.length).toBeGreaterThanOrEqual(150);
    expect(metadata.description?.length).toBeLessThanOrEqual(160);
    expect(metadata.metadataBase?.toString()).toBe("https://portfolio-preview.vercel.app/");
    expect(metadata.alternates).toEqual({ canonical: "/" });
    expect(metadata.robots).toEqual({
      index: false,
      follow: false,
    });
    expect(metadata.openGraph).toMatchObject({
      title: "Ilya | Frontend Developer & UX/UI Designer, Berlin",
      url: "https://portfolio-preview.vercel.app",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Ilya | Frontend Developer & UX/UI Designer, Berlin",
      images: ["/og-image.png"],
    });
  });

  it("allows global indexing only when explicitly enabled", async () => {
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "true");

    const { metadata } = await loadLayoutMetadata();

    expect(metadata.robots).toEqual({
      index: true,
      follow: true,
    });
  });

  it("keeps Impressum out of search indexing until legal details are complete", async () => {
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "true");

    const { metadata: impressumMetadata } = await loadImpressumMetadata();

    expect(impressumMetadata.robots).toEqual({
      index: false,
      follow: false,
    });
  });
});
