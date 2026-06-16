import { afterEach, describe, expect, it, vi } from "vitest";

async function loadSitemap() {
  vi.resetModules();
  return import("@/app/sitemap");
}

describe("sitemap", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("lists public pages with environment-driven canonical URLs", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio-preview.vercel.app/");

    const { default: sitemap } = await loadSitemap();

    expect(sitemap()).toEqual([
      expect.objectContaining({ url: "https://portfolio-preview.vercel.app" }),
    ]);
  });
});
