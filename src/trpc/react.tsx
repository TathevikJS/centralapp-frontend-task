import { createTRPCReact } from '@trpc/react-query';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { type AppRouter } from '../server/trpc/routers/_app';

/**
 * tRPC React client for type-safe API calls
 */
export const api = createTRPCReact<AppRouter>();

// Type helpers for tRPC inputs and outputs
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>; 