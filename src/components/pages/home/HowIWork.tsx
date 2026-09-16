import {
  GaugeIcon,
  ShieldCheckIcon,
  ShipIcon,
  type LucideIcon,
} from 'lucide-react';

import { siteConfig } from '@/lib/site';
import Reveal from '@/components/shared/motion/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';

/**
 * The "why hire me" section, written the way a reviewing engineer reads a
 * portfolio: not adjectives, but the habits they can verify in the source.
 * Every claim below points at something this repo or its API actually does.
 */
const PRINCIPLES: {
  Icon: LucideIcon;
  title: string;
  text: string;
  proof: string;
}[] = [
  {
    Icon: ShieldCheckIcon,
    title: 'Type-safe from the database up',
    text: 'Every API response is parsed with zod before a component sees it. A backend change fails loudly at the boundary, not as undefined.map three screens later.',
    proof: 'src/services/utils/apiHelper.ts',
  },
  {
    Icon: GaugeIcon,
    title: 'Server-first, fast by default',
    text: 'Public pages render on the server with tagged caches that the API invalidates on write — no polling, no stale dashboard, real 404 status codes.',
    proof: 'app/api/revalidate + projectServerApis',
  },
  {
    Icon: ShipIcon,
    title: 'Shipped, not just demoed',
    text: 'Live deployments, a public API repo, tests on the contract layer and a real admin dashboard behind auth. What you see here is production code.',
    proof: 'This site: Next.js 16 · React 19 · Vercel',
  },
];

function HowIWork() {
  return (
    <section aria-labelledby="how-heading" className="container-page section-y">
      <SectionHeading
        eyebrow="How I work"
        title={<span id="how-heading">What you get when you hire me</span>}
        description={
          <>
            Habits you can check yourself — the{' '}
            <a
              href={siteConfig.repos.client}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              source of this site
            </a>{' '}
            is public.
          </>
        }
      />

      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {PRINCIPLES.map((principle, index) => (
          <Reveal key={principle.title} as="li" index={index} className="flex">
            <article className="flex flex-1 flex-col rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <principle.Icon className="size-5" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{principle.title}</h3>
              <p className="mt-2 flex-1 text-sm text-pretty text-muted-foreground">
                {principle.text}
              </p>
              <p className="mt-5 truncate border-t pt-4 font-mono text-xs text-muted-foreground">
                {principle.proof}
              </p>
            </article>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export default HowIWork;
