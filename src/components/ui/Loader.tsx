import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        className,
      )}
    >
      <Loader2Icon className="size-8 animate-spin text-primary" />
      <p className="mt-4 text-lg text-muted-foreground">
        Loading, please wait...
      </p>
    </div>
  );
}

export default Loader;
