import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

/** Numbers kept either side of the current page before an ellipsis takes over. */
const SIBLINGS = 1;

/** First and last always show, so a long list stays one row on a phone. */
function buildPageItems(page: number, totalPages: number) {
  const items: (number | 'gap')[] = [];

  for (let candidate = 1; candidate <= totalPages; candidate += 1) {
    const isEdge = candidate === 1 || candidate === totalPages;

    if (isEdge || Math.abs(candidate - page) <= SIBLINGS) {
      items.push(candidate);
    } else if (items.at(-1) !== 'gap') {
      items.push('gap');
    }
  }

  return items;
}

function StepLink({
  href,
  label,
  disabled,
  children,
}: {
  href: string;
  label: string;
  disabled: boolean;
  children: ReactNode;
}) {
  // Icon-only on a phone, icon + word from `sm` up.
  const className = cn(
    buttonVariants({ variant: 'outline', size: 'sm' }),
    'px-2 sm:px-3',
    disabled && 'pointer-events-none opacity-50',
  );

  // An anchor cannot be disabled, and a dead link at either end is worse than
  // no link at all for a screen reader.
  if (disabled) {
    return (
      <span className={className} aria-hidden="true">
        {children}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className={className}>
      {children}
    </Link>
  );
}

/**
 * Pages are links rather than buttons: the public list is crawled and shared,
 * and both lists get the back button for free.
 */
function Pagination({
  page,
  totalPages,
  basePath,
  total,
  pageSize,
  className,
}: {
  page: number;
  totalPages: number;
  /** Route the numbers point at; page one stays on the bare path. */
  basePath: string;
  /** With `pageSize`, renders a "Showing 10–17 of 17" line above the links. */
  total?: number;
  pageSize?: number;
  className?: string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const hrefFor = (target: number) =>
    target === 1 ? basePath : `${basePath}?page=${target}`;

  const range =
    total !== undefined && pageSize !== undefined
      ? {
          from: (page - 1) * pageSize + 1,
          to: Math.min(page * pageSize, total),
        }
      : null;

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex flex-col items-center gap-4', className)}
    >
      {range && (
        <p className="eyebrow tabular-nums">
          Showing {range.from}–{range.to} of {total}
        </p>
      )}
      <div className="flex items-center gap-1">
        <StepLink
          href={hrefFor(page - 1)}
          label="Previous page"
          disabled={page === 1}
        >
          <ChevronLeftIcon />
          <span className="hidden sm:inline">Previous</span>
        </StepLink>

        {buildPageItems(page, totalPages).map((item, index) =>
          item === 'gap' ? (
            <span
              key={`gap-${index}`}
              aria-hidden="true"
              className="px-1 text-muted-foreground"
            >
              …
            </span>
          ) : (
            <Link
              key={item}
              href={hrefFor(item)}
              aria-label={`Page ${item}`}
              aria-current={item === page ? 'page' : undefined}
              // The current page is the site's "active" amber, like the nav
              // underline and the resume tabs — not a second primary button.
              className={buttonVariants({
                variant: item === page ? 'secondary' : 'outline',
                size: 'icon-sm',
                className: cn(
                  'tabular-nums',
                  item === page && 'pointer-events-none font-semibold',
                ),
              })}
            >
              {item}
            </Link>
          ),
        )}

        <StepLink
          href={hrefFor(page + 1)}
          label="Next page"
          disabled={page === totalPages}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon />
        </StepLink>
      </div>
    </nav>
  );
}

export default Pagination;
