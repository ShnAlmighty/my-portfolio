import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/seo";
import { ErrorBoundary } from "@/components/ui";
import NetworkStatus from "@/components/layout/NetworkStatus";
import ServiceWorkerRegistration from "@/components/layout/ServiceWorkerRegistration";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: "Shantanu Patnaik - Full Stack Engineer & AI Specialist",
    template: "%s | Shantanu Patnaik"
  },
  description: "Portfolio of Shantanu Patnaik, a Software Engineer with expertise in Backend, AI, DevOps, and System architecture. Currently Lead Backend Engineer at Brandie with 5+ years of experience building scalable applications.",
  keywords: [
    "Full Stack Engineer",
    "AI Specialist", 
    "DevOps Engineer",
    "React Developer",
    "Node.js Developer",
    "Python Developer",
    "AWS Expert",
    "System Architecture",
    "Backend Developer",
    "Frontend Developer",
    "Shantanu Patnaik",
    "Software Engineer",
    "Web Developer",
    "Artificial Intelligence",
    "Cloud Computing"
  ],
  authors: [{ name: "Shantanu Patnaik", url: "https://shantanupatnaik.dev" }],
  creator: "Shantanu Patnaik",
  publisher: "Shantanu Patnaik",
  category: "Technology",
  classification: "Portfolio Website",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shantanupatnaik.dev",
    title: "Shantanu Patnaik - Backend Engineer & AI Specialist with Full Stack experience",
    description: "Portfolio showcasing 5+ years of expertise in Full Stack Development, AI, DevOps, and System Architecture. Currently Lead Backend Engineer at Brandie.",
    siteName: "Shantanu Patnaik Portfolio",
    images: [
      {
        url: "https://shantanupatnaik.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shantanu Patnaik - Backend Engineer & AI/ML Specialist"
      }
    ]
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Shantanu Patnaik - Full Stack Engineer & AI/ML Specialist",
  //   description: "Portfolio showcasing expertise in Full Stack Development, AI/ML, DevOps, and System Architecture.",
  //   images: ["https://shantanupatnaik.dev/og-image.jpg"]
  // },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://shantanupatnaik.dev"
  },
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes as needed
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Shantanu Portfolio" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <NetworkStatus />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
