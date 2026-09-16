import { ImageResponse } from 'next/og';

import { siteConfig } from '@/lib/site';

export const alt = `${siteConfig.name} — ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Rendered at build time, so it cannot read the theme tokens from CSS.
// Hex twins of the oklch tokens in globals.css (dark theme).
const BACKGROUND = '#141726';
const PRIMARY = '#90a1ff';
const SECONDARY = '#ffc622';
const GLOW = '#e369cc';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24,
        padding: 80,
        background: `radial-gradient(circle at 15% 20%, ${PRIMARY}33, transparent 45%), radial-gradient(circle at 90% 85%, ${GLOW}33, transparent 45%), ${BACKGROUND}`,
        color: '#f9fafb',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 26,
          letterSpacing: 6,
          textTransform: 'uppercase',
          color: SECONDARY,
        }}
      >
        {siteConfig.jobTitle}
      </div>
      <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
        {siteConfig.name}
      </div>
      <div style={{ display: 'flex', gap: 16, fontSize: 28, color: PRIMARY }}>
        {siteConfig.skills.slice(0, 5).join('  ·  ')}
      </div>
    </div>,
    size,
  );
}
