'use client';

import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import type { MouseEvent, ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * A card whose border and surface light up around the cursor. The glow is a
 * radial gradient positioned by two motion values, so moving the mouse never
 * re-renders React — only the CSS variable changes.
 */
function SpotlightCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, color-mix(in oklch, var(--primary) 14%, transparent), transparent 70%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={cn(
        'group/spot relative overflow-hidden rounded-2xl border bg-card transition-colors duration-300 hover:border-primary/40',
        className,
      )}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

export default SpotlightCard;
