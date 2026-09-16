import { ArrowUpRightIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';

import { siteConfig } from '@/lib/site';

const NAV = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/about#contact', label: 'Contact' },
];

const SOCIALS = [
  { href: siteConfig.socials.github, label: 'GitHub', Icon: FaGithub },
  { href: siteConfig.socials.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: `mailto:${siteConfig.email}`, label: 'Email', Icon: MailIcon },
];

const REPOS = [
  { href: siteConfig.repos.client, label: 'Frontend source' },
  { href: siteConfig.repos.server, label: 'API source' },
];

function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:py-16">
        <div>
          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-tight"
          >
            <span className="text-primary">SK</span>
            <span className="text-secondary">.</span>
          </Link>
          <p className="mt-3 max-w-sm text-pretty text-muted-foreground">
            {siteConfig.shortName} — {siteConfig.jobTitle.toLowerCase()} from{' '}
            {siteConfig.location}. {siteConfig.tagline}
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map(({ href, label, Icon }) => {
              const external = href.startsWith('http');

              return (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'me noopener noreferrer' : undefined}
                  aria-label={`${siteConfig.name} on ${label}`}
                  className="inline-flex size-10 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md hover:shadow-primary/10"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow">Pages</p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow">This site</p>
          <ul className="mt-4 space-y-2.5">
            <li className="text-sm text-muted-foreground">
              Next.js 16 · React 19 · Tailwind 4
            </li>
            {REPOS.map((repo) => (
              <li key={repo.href}>
                <a
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {repo.label}
                  <ArrowUpRightIcon className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono">Designed &amp; built by hand · Dhaka</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
