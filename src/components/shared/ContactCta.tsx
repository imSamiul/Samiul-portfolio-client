import { ArrowUpRightIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';

import { siteConfig } from '@/lib/site';
import Reveal from '@/components/shared/motion/Reveal';
import { Button } from '@/components/ui/button';

/**
 * Closing band on every public page except About (which holds the form).
 * The one place the pink is allowed to be loud: it is a gradient here, not
 * text, and it sits between the last section and the footer.
 */
function ContactCta() {
  return (
    <section aria-labelledby="cta-heading" className="container-page section-y">
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-14 text-center sm:px-12 md:py-20">
          <div
            aria-hidden="true"
            className="blob -top-24 -left-16 size-72 bg-glow/40 dark:bg-glow/25"
          />
          <div
            aria-hidden="true"
            className="blob -right-16 -bottom-24 size-72 bg-primary/40 dark:bg-primary/25"
          />
          <div className="relative">
            <p className="eyebrow">Let&apos;s work together</p>
            <h2
              id="cta-heading"
              className="mx-auto mt-3 max-w-2xl text-3xl font-bold sm:text-4xl md:text-5xl"
            >
              Have a role or a project in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground sm:text-lg">
              {siteConfig.openToWork
                ? `I'm open to full-stack and frontend roles, remote or in ${siteConfig.location}.`
                : 'I am always happy to talk about interesting work.'}{' '}
              Send a message and I&apos;ll reply within a day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-11 px-6">
                <a href={`mailto:${siteConfig.email}`}>
                  <MailIcon />
                  {siteConfig.email}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 px-6">
                <Link href="/about#contact">
                  Contact form
                  <ArrowUpRightIcon />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default ContactCta;
