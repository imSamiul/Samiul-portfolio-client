'use client';

import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ThemeController from './ThemeController';

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
];

function Navbar() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  // App Router keeps the layout mounted across navigations, so the sheet has
  // to be told to close when a link inside it is followed.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // The bar is transparent over the hero and gains a blurred surface once the
  // page has moved, so the first fold has no line across it.
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 12);
  });

  const links = isAuthenticated
    ? [...NAV_LINKS, { href: '/dashboard', label: 'Dashboard' }]
    : NAV_LINKS;

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300',
        isScrolled
          ? 'border-b border-border/60 bg-background/75 shadow-sm shadow-primary/5 backdrop-blur-md supports-backdrop-filter:bg-background/60'
          : 'border-b border-transparent bg-transparent',
      )}
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="container-page flex h-16 items-center gap-2">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation menu"
            >
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-6">
            <SheetHeader className="p-0">
              <SheetTitle className="font-display text-xl font-bold">
                <span className="text-primary">SK</span>
                <span className="text-secondary">.</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted',
                    isActive(link.href) && 'bg-muted text-primary',
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-4">
                <a href={`mailto:${siteConfig.email}`}>Hire me</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="font-display text-xl font-bold tracking-tight md:flex-1"
        >
          <span className="text-primary">SK</span>
          <span className="text-secondary">.</span>
        </Link>

        <nav className="relative hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground',
                  active ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {link.label}
                {active && (
                  // One shared `layoutId` makes the underline slide between
                  // links instead of blinking off and on.
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-secondary"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-1 md:gap-2">
          <ThemeController />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href={`mailto:${siteConfig.email}`}>Hire me</a>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
