'use client';

import {
  ExternalLinkIcon,
  FileTextIcon,
  FolderKanbanIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';

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

const SIDEBAR_LINKS: { href: string; label: string; Icon: LucideIcon }[] = [
  {
    href: '/dashboard/project-list',
    label: 'Projects',
    Icon: FolderKanbanIcon,
  },
  { href: '/dashboard/add-project', label: 'Add project', Icon: PlusIcon },
  { href: '/dashboard/resume', label: 'Resume', Icon: FileTextIcon },
];

function SidebarLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  // The edit page has no sidebar entry of its own; it belongs to "Projects".
  const isActive = (href: string) =>
    pathname === href ||
    (href === '/dashboard/project-list' &&
      pathname.startsWith('/dashboard/edit-project'));

  return (
    <nav className="flex flex-col gap-1">
      {SIDEBAR_LINKS.map(({ href, label, Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={onNavigate}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isActive(href)
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
        >
          <Icon className="size-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  const { logout } = useAuth();

  return (
    <div className="mt-auto space-y-1 border-t pt-4">
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <ExternalLinkIcon className="size-4" />
        View site
      </Link>
      <button
        type="button"
        onClick={() => {
          logout();
          onNavigate?.();
        }}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <LogOutIcon className="size-4" />
        Log out
      </button>
      <p className="truncate px-3 pt-2 font-mono text-[0.65rem] text-muted-foreground">
        {siteConfig.email}
      </p>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2 px-3">
      <span className="font-display text-xl font-bold tracking-tight">
        <span className="text-primary">SK</span>
        <span className="text-secondary">.</span>
      </span>
      <span className="rounded-full border px-2 py-0.5 font-mono text-[0.65rem] tracking-wider text-muted-foreground uppercase">
        Admin
      </span>
    </div>
  );
}

function DashboardShell({ children }: { children: ReactNode }) {
  // The mobile sheet has to close itself on navigation; App Router keeps the
  // layout mounted across route changes, so it would otherwise stay open.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30 lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col gap-6 border-r bg-background p-4 lg:flex">
        <div className="flex items-center justify-between">
          <Brand />
          <ThemeController />
        </div>
        <SidebarLinks />
        <SidebarFooter />
      </aside>

      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-2 border-b bg-background px-4 py-3 lg:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open dashboard menu"
              >
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-72 flex-col p-4">
              <SheetHeader className="p-0">
                <SheetTitle asChild>
                  <div>
                    <Brand />
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <SidebarLinks onNavigate={() => setIsMenuOpen(false)} />
              </div>
              <SidebarFooter onNavigate={() => setIsMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          <div className="flex-1">
            <Brand />
          </div>
          <ThemeController />
        </div>

        <div className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardShell;
