"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

import { AuthProvider } from "../../contexts/AuthContext";

function Providers({ children }: { children: ReactNode }) {
  // Keeping the client in state stops it from being shared between requests.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default Providers;
