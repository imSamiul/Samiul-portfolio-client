'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

import { revealVariants, type RevealVariant } from './variants';

// Mirrors the (unexported) margin type motion accepts for `viewport`.
type MarginValue = `${number}${'px' | '%'}`;
type ViewportMargin =
  | MarginValue
  | `${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
  /** Position in a list; each step adds a small delay so grids cascade. */
  index?: number;
  /** How far past the viewport edge the element has to be before it plays. */
  margin?: ViewportMargin;
  /** Rendered element. Lets a list item be a real `<li>`. */
  as?: 'div' | 'li' | 'section' | 'article' | 'aside';
  id?: string;
};

/**
 * Plays once. Replaying on every scroll-back was the single most tiring thing
 * about the old site, and the browser only ever has to paint one transition.
 */
function Reveal({
  children,
  variant = 'up',
  className,
  index = 0,
  margin = '0px 0px -10% 0px',
  as = 'div',
  ...rest
}: RevealProps) {
  const Component = motion[as];

  return (
    <Component
      variants={revealVariants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      custom={index}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Reveal;
