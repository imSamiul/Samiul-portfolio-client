import type { Metadata } from "next";

import "./globals.css";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Providers from "../components/layout/Providers";
import { siteConfig } from "../config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.jobTitle} (React, Node.js)`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

// Applies the saved theme before first paint so the page never flashes the
// default theme and the markup React hydrates against already matches.
const applySavedTheme = `try{var t=localStorage.getItem("theme");if(t){document.documentElement.setAttribute("data-theme",t)}}catch(e){/* theme preference is optional */}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: applySavedTheme }} />
      </head>
      <body>
        <Providers>
          <div className="min-h-screen">
            <Navbar />
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
