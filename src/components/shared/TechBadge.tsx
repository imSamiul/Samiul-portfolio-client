import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/** Tinted pill for a technology name — primary at 10% so a row stays quiet. */
function TechBadge({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'border-primary/15 bg-primary/8 font-mono text-[0.7rem] text-primary dark:bg-primary/12',
        className,
      )}
    >
      {children}
    </Badge>
  );
}

export default TechBadge;
