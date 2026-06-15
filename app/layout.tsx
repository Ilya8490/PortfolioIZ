import type { Metadata } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
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
  metadataBase: new URL("https://ilyazub.dev"),
  title: {
    default: "Ilya | Frontend Developer & UX/UI Designer, Berlin",
    template: "%s | Ilya",
  },
  description:
    "Berlin frontend developer and UX/UI designer building fast, accessible websites, clear product interfaces, and SEO-ready React experiences for modern teams.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ilya | Frontend Developer & UX/UI Designer, Berlin",
    description:
      "Berlin frontend developer and UX/UI designer building fast, accessible websites, clear product interfaces, and SEO-ready React experiences for modern teams.",
    url: "/",
    siteName: "Ilya Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilya | Frontend Developer & UX/UI Designer, Berlin",
    description:
      "Berlin frontend developer and UX/UI designer building fast, accessible websites, clear product interfaces, and SEO-ready React experiences for modern teams.",
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
