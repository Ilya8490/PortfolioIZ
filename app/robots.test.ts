import { afterEach, describe, expect, it, vi } from "vitest";

async function loadRobots() {
  vi.resetModules();
  return import("@/app/robots");
}

describe("robots", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("allows crawling while pointing crawlers to the environment-driven sitemap", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio-preview.vercel.app/");

    const { default: robots } = await loadRobots();

    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://portfolio-preview.vercel.app/sitemap.xml",
    });
  });
});
