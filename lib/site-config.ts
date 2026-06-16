export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://your-project.vercel.app";

// PRE-LAUNCH: replace with real contact email when ready.
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;

export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const robotsMetadata = allowIndexing
  ? { index: true, follow: true }
  : { index: false, follow: false };
