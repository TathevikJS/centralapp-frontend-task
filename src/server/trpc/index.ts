import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import superjson from 'superjson';

/**
 * tRPC instance with superjson transformer and enhanced error formatting
 */
const t = initTRPC.create({
  transformer: superjson, // Handle complex types like Date, BigInt
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        // Include Zod validation errors in response
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Export router and procedure builders
export const router = t.router;
export const publicProcedure = t.procedure; 