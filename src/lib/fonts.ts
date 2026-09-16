import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';

// Shared so `global-error.tsx`, which renders its own <html> outside the root
// layout, gets the same fonts rather than a second download.
//
// Three roles, three families: Plus Jakarta Sans carries the headings, Inter
// the running text (it stays narrow and readable at body sizes where a
// geometric display face gets tiring), and JetBrains Mono the small uppercase
// labels that give the pages their "engineer's notebook" texture.
export const displayFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const bodyFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

/** Every variable class at once — what `<html>` needs. */
export const fontVariables = `${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`;
