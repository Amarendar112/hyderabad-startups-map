import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";
import SeoContent from "@/components/seo/SeoContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hyderabadstartupsmap.com"),
  title: "Hyderabad Startup Map - Startups, Founders & Funding",
  description:
    "Explore Hyderabad startups on an interactive map. Discover startups, founders, funding, sectors and locations across Hyderabad's growing startup ecosystem.",
  keywords: [
    "Hyderabad Startup Map",
    "Hyderabad Startups Map",
    "Hyderabad Startups",
    "Hyderabad Startup Directory",
    "Startup Map Hyderabad",
    "Hyderabad Startup Ecosystem",
    "Hyderabad Founders",
    "T-Hub Hyderabad",
    "HITEC City Startups",
    "Hyderabad Tech Ecosystem",
    "Hyderabad Venture Capital",
    "Hyderabad Incubators",
  ],
  openGraph: {
    title: "Hyderabad Startup Map - Startups, Founders & Funding",
    description:
      "Explore Hyderabad startups on an interactive map. Discover startups, founders, funding, sectors and locations across Hyderabad's growing startup ecosystem.",
    url: "https://www.hyderabadstartupsmap.com/",
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
    title: "Hyderabad Startup Map - Startups, Founders & Funding",
    description:
      "Explore Hyderabad startups on an interactive map. Discover startups, founders, funding, sectors and locations across Hyderabad's growing startup ecosystem.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://www.hyderabadstartupsmap.com/",
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
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
      "@id": "https://www.hyderabadstartupsmap.com/#website",
      "url": "https://www.hyderabadstartupsmap.com/",
      "name": "Hyderabad Startup Map",
      "alternateName": [
        "Hyderabad Startups Map",
        "Hyderabad Startup Directory"
      ],
      "description":
        "Explore Hyderabad startups on an interactive map. Discover startups, founders, funding, sectors and locations across Hyderabad's growing startup ecosystem.",
      "publisher": {
        "@id": "https://www.hyderabadstartupsmap.com/#organization",
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "Organization",
      "@id": "https://www.hyderabadstartupsmap.com/#organization",
      "name": "Hyderabad Startup Map",
      "url": "https://www.hyderabadstartupsmap.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.hyderabadstartupsmap.com/logo.png",
      },
      "description":
        "Explore Hyderabad startups on an interactive map. Discover startups, founders, funding, sectors and locations across Hyderabad's growing startup ecosystem.",
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
        <SeoContent />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
