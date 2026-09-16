import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import Reveal from '@/components/shared/motion/Reveal';

/**
 * Eyebrow → heading → one-line description. Every public section opens with
 * this, left-aligned, so the pages share one rhythm instead of each heading
 * picking its own size and colour.
 */
function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = 'h2',
  align = 'left',
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <Heading
        className={cn(
          'mt-3 font-display font-bold tracking-tight',
          Heading === 'h1'
            ? 'text-4xl sm:text-5xl lg:text-6xl'
            : 'text-3xl sm:text-4xl',
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-base text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}

export default SectionHeading;
