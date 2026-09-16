import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

/** Title row every dashboard screen opens with; `actions` sits on the right. */
function DashboardHeader({
  title,
  description,
  backHref,
  backLabel = 'Back',
  actions,
}: {
  title: string;
  description?: ReactNode;
  backHref?: string;
  backLabel?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-8">
      <div>
        {backHref && (
          <Link
            href={backHref}
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            {backLabel}
          </Link>
        )}
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-1.5 text-sm text-pretty text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
    </div>
  );
}

export default DashboardHeader;
