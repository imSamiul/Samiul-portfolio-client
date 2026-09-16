'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

/**
 * Both icons are always in the DOM and the `.dark` class on <html> decides
 * which one shows. Branching on `resolvedTheme` instead used to produce a
 * hydration mismatch: the server has no theme and rendered the moon, while
 * the client's first render already knew it was dark and rendered the sun.
 * The class is written before paint, so this never flickers either.
 */
function ThemeController() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle colour theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className="hidden size-5 dark:block" />
      <MoonIcon className="size-5 dark:hidden" />
    </Button>
  );
}

export default ThemeController;
