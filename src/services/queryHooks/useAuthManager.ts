'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

import { userApis } from '../apis/userApis';

export function useAuthManager(destination: string) {
  const { login } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutate: signIn,
    isPending: isSigningIn,
    error: signInError,
  } = useMutation({
    mutationFn: userApis.login,
    onSuccess: (data) => {
      // Whatever the previous session left behind belongs to a different admin
      // as far as this app knows, so none of it may leak into the new one.
      queryClient.clear();
      // login() writes the cookie synchronously, so the guard already sees it
      // by the time this navigation is handled.
      login(data.token);
      router.push(destination);
    },
  });

  return {
    // Loading states
    isSigningIn,

    // Errors
    signInError,

    // Actions
    signIn,
  };
}
