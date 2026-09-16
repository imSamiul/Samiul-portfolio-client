import type { Metadata, Viewport } from 'next';

import './globals.css';
import Providers from '@/components/layout/Providers';
import { fontVariables } from '@/lib/fonts';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.jobTitle} (React, Node.js)`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    'full-stack developer',
    'React developer',
    'Next.js developer',
    'MERN stack',
    'TypeScript',
    'Node.js',
    'Bangladesh',
    siteConfig.name,
  ],
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

// The browser chrome follows the theme: white in light, the dark surface
// (`--background` in `.dark`) otherwise.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1d2b' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `suppressHydrationWarning` is required: next-themes writes the theme
    // class onto <html> before React hydrates.
    <html
      lang="en"
      className={fontVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="font-sans">
        {/* Page chrome lives in the route groups: see (site)/layout.tsx. */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
