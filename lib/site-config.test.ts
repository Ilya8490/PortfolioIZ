import { afterEach, describe, expect, it, vi } from "vitest";

async function loadSiteConfig() {
  vi.resetModules();
  return import("@/lib/site-config");
}

describe("site config", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllEnvs();
  });

  it("uses safe pre-launch defaults when environment variables are absent", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "");
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "");

    const { allowIndexing, contactEmail, siteUrl } = await loadSiteConfig();

    expect(siteUrl).toBe("https://your-project.vercel.app");
    expect(contactEmail).toBeNull();
    expect(allowIndexing).toBe(false);
  });

  it("normalizes configured public environment values", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio-preview.vercel.app/");
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "work@example.com");
    vi.stubEnv("NEXT_PUBLIC_ALLOW_INDEXING", "true");

    const { allowIndexing, contactEmail, siteUrl } = await loadSiteConfig();

    expect(siteUrl).toBe("https://portfolio-preview.vercel.app");
    expect(contactEmail).toBe("work@example.com");
    expect(allowIndexing).toBe(true);
  });
});
