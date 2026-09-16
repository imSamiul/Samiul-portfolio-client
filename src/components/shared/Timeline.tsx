import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import Reveal from '@/components/shared/motion/Reveal';

export type TimelineItem = {
  /** Short label on the left rail: a year, a range, a stage. */
  period: string;
  title: string;
  description?: ReactNode;
  /** The step that is happening now; the dot turns yellow. */
  current?: boolean;
};

/**
 * Vertical timeline shared by the About journey and the Resume education
 * list. Dots sit on a hairline; the current step is the one place the
 * secondary colour appears in the component.
 */
function Timeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol className={cn('relative border-l border-border pl-8', className)}>
      {items.map((item, index) => (
        <Reveal
          key={item.title}
          as="li"
          index={index}
          className="relative pb-10 last:pb-0"
        >
          <span
            aria-hidden="true"
            className={cn(
              'absolute top-1.5 -left-[2.4rem] flex size-4 items-center justify-center rounded-full border-2 border-background ring-1 ring-border',
              item.current ? 'bg-secondary' : 'bg-primary',
            )}
          >
            {item.current && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary/60" />
            )}
          </span>
          <p className="eyebrow">{item.period}</p>
          <h3 className="mt-1.5 text-lg font-semibold">{item.title}</h3>
          {item.description && (
            <div className="mt-2 text-pretty text-muted-foreground">
              {item.description}
            </div>
          )}
        </Reveal>
      ))}
    </ol>
  );
}

export default Timeline;
