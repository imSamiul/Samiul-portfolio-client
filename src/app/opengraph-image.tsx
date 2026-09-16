import { ImageResponse } from 'next/og';

import { siteConfig } from '@/lib/site';

export const alt = `${siteConfig.name} — ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Rendered at build time, so it cannot read the theme tokens from CSS.
const BACKGROUND = '#111827';
const PRIMARY = '#4670B7';
const ACCENT = '#F08EA0';

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
        background: BACKGROUND,
        color: '#f9fafb',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 30, color: ACCENT }}>{siteConfig.jobTitle}</div>
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
