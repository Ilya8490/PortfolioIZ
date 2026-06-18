import type { Metadata } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import { robotsMetadata, siteUrl } from "@/lib/site-config";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ilya | Junior Frontend / Fullstack Developer, Berlin",
    template: "%s | Ilya",
  },
  description:
    "Junior frontend / fullstack developer in Berlin building responsive web apps with React, TypeScript, Next.js, accessible UI, and selected project case studies.",
  alternates: {
    canonical: "/",
  },
  robots: robotsMetadata,
  openGraph: {
    title: "Ilya | Junior Frontend / Fullstack Developer, Berlin",
    description:
      "Junior frontend / fullstack developer in Berlin building responsive web apps with React, TypeScript, Next.js, accessible UI, and selected project case studies.",
    url: siteUrl,
    siteName: "Ilya Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilya | Junior Frontend / Fullstack Developer, Berlin",
    description:
      "Junior frontend / fullstack developer in Berlin building responsive web apps with React, TypeScript, Next.js, accessible UI, and selected project case studies.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        <div className="site-noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
