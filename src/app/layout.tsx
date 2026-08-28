import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Hyderabad Startup Map – 650+ Startups, Founders & Funding",
  description:
    "Explore Hyderabad's startup ecosystem with an interactive map. Discover 650+ startups, founders, funding, sectors, incubators and startup hubs across Hyderabad.",
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
    title: "Hyderabad Startup Map – 650+ Startups, Founders & Funding",
    description:
      "Explore Hyderabad's startup ecosystem with an interactive map. Discover 650+ startups, founders, funding, sectors, incubators and startup hubs across Hyderabad.",
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
    title: "Hyderabad Startup Map – 650+ Startups, Founders & Funding",
    description:
      "Explore Hyderabad's startup ecosystem with an interactive map. Discover 650+ startups, founders, funding, sectors, incubators and startup hubs across Hyderabad.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://hyderabadstartupsmap.com/#website",
      "url": "https://hyderabadstartupsmap.com/",
      "name": "Hyderabad Startup Map",
      "description":
        "Explore Hyderabad's startup ecosystem with an interactive map. Discover 650+ startups, founders, funding, sectors, incubators and startup hubs across Hyderabad.",
      "publisher": {
        "@id": "https://hyderabadstartupsmap.com/#organization",
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "Organization",
      "@id": "https://hyderabadstartupsmap.com/#organization",
      "name": "Hyderabad Startup Map",
      "url": "https://hyderabadstartupsmap.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hyderabadstartupsmap.com/logo.png",
      },
      "description":
        "Interactive directory and ecosystem map for 650+ Hyderabad startups, founders, funding, incubators, and innovation hubs.",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
