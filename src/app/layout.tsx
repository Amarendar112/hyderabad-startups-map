import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hyderabadstartupsmap.com"),
  title: "Hyderabad Startup Map – Startups, Founders & Funding",
  description:
    "Explore Hyderabad's startup ecosystem with an interactive map. Discover startups, founders, funding, sectors, incubators and startup hubs across Hyderabad.",
  keywords: [
    "Hyderabad Startup Map",
    "Hyderabad Startups",
    "Hyderabad Founders",
    "T-Hub Hyderabad",
    "HITEC City Startups",
    "Hyderabad Tech Ecosystem",
    "Hyderabad Venture Capital",
    "Hyderabad Incubators",
  ],
  openGraph: {
    title: "Hyderabad Startup Map – Startups, Founders & Funding",
    description:
      "Explore Hyderabad's startup ecosystem with an interactive map. Discover startups, founders, funding, sectors, incubators and startup hubs across Hyderabad.",
    url: "https://hyderabadstartupsmap.com",
    siteName: "Hyderabad Startup Map",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Hyderabad Startup Map Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyderabad Startup Map – Startups, Founders & Funding",
    description:
      "Explore Hyderabad's startup ecosystem with an interactive map. Discover startups, founders, funding, sectors, incubators and startup hubs across Hyderabad.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://hyderabadstartupsmap.com",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
