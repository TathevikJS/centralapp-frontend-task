'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { api } from '../trpc/react';
import superjson from 'superjson';

/**
 * tRPC Provider - sets up type-safe client-server communication with React Query
 */
export function TRPCProvider({ children }: { children: React.ReactNode }) {
  // Create React Query client with optimized caching settings
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
        gcTime: 1000 * 60 * 30, // Cache cleanup after 30 minutes
        retry: 1, // Retry failed queries once
        refetchOnWindowFocus: false, // Don't refetch when window gains focus
      },
    },
  }));
  
  // Create tRPC client with HTTP batching and superjson serialization
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc', // API endpoint for tRPC requests
          transformer: superjson, // Handles Date, BigInt, etc. serialization
        }),
      ],
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
} 