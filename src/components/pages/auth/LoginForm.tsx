'use client';

import { ArrowLeftIcon, LockIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { siteConfig } from '@/lib/site';
import { useAuthManager } from '@/services/queryHooks/useAuthManager';
import { LoginFormType } from '@/types/userType';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

function LoginForm({ destination }: { destination: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: { email: '', password: '' },
  });
  const { signIn, isSigningIn, signInError } = useAuthManager(destination);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dots" />
        <div className="glow -top-24 left-1/4 size-80 bg-primary/25 dark:bg-primary/15" />
        <div className="glow -right-16 -bottom-24 size-80 bg-accent/25 dark:bg-accent/15" />
      </div>

      <div className="w-full max-w-sm rounded-2xl border bg-card p-6 shadow-xl shadow-primary/10 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl font-bold tracking-tight">
            <span className="text-primary">SK</span>
            <span className="text-secondary">.</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.65rem] tracking-wider text-muted-foreground uppercase">
            <LockIcon className="size-3" />
            Admin
          </span>
        </div>
        <h1 className="mt-6 text-2xl font-bold">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The dashboard is for the site owner only.
        </p>

        <form
          className="mt-6 grid gap-5"
          onSubmit={handleSubmit((values) => signIn(values))}
          noValidate
        >
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register('email', {
                required: 'Email is required',
                validate: (value) =>
                  value === siteConfig.email || 'Email is not valid',
              })}
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={Boolean(errors.password)}
              {...register('password', { required: 'Password is required' })}
            />
            <FieldError errors={[errors.password]} />
          </Field>

          <Button type="submit" disabled={isSigningIn} className="h-10">
            {isSigningIn ? 'Signing in…' : 'Sign in'}
          </Button>

          {signInError && (
            <p className="text-sm text-destructive" role="alert">
              {signInError.message}
            </p>
          )}
        </form>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to the site
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
