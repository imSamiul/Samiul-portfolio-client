import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Pure-CSS infinite strip: the children are rendered twice and the track
 * slides by exactly half its width, so the loop point is invisible. No client
 * JavaScript, and `prefers-reduced-motion` freezes it through the global rule.
 */
function Marquee({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'group flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]',
        className,
      )}
    >
      <div className="flex w-max shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
        {children}
        <span aria-hidden="true" className="contents">
          {children}
        </span>
      </div>
    </div>
  );
}

export default Marquee;
