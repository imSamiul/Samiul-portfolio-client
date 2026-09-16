import { type Variants } from 'motion/react';

/**
 * Exported as a lookup rather than as individual objects: every `visible`
 * below is a function of the stagger index, and a function cannot be
 * serialised across the server/client boundary. Callers name a variant, so
 * they stay server components and only `Reveal` ever holds the object.
 *
 * Distances are deliberately small. A 16px rise that settles in 400ms reads as
 * "content arriving"; the 100–200px slides this file used to hold read as a
 * slideshow, and got worse every time they replayed.
 */
export const REVEAL_EASE = [0.21, 0.47, 0.32, 0.98] as const;

const STAGGER = 0.06;

function withStagger(hidden: Record<string, number>): Variants {
  return {
    hidden: { opacity: 0, ...hidden },
    visible: (index: number = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: REVEAL_EASE,
        delay: index * STAGGER,
      },
    }),
  };
}

export const revealVariants = {
  up: withStagger({ y: 20 }),
  down: withStagger({ y: -20 }),
  left: withStagger({ x: -24 }),
  right: withStagger({ x: 24 }),
  fade: withStagger({}),
  scale: withStagger({ scale: 0.96, y: 12 }),
} as const;

export type RevealVariant = keyof typeof revealVariants;
