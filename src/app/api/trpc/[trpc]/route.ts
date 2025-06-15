import { appRouter } from '@/server/trpc/routers/_app';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest, NextResponse } from 'next/server';

/**
 * tRPC API Route Handler - handles type-safe client-server communication
 */

export async function GET(req: NextRequest) { // GET request handler
  try {
    return await fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: appRouter,
      createContext: () => ({}),
    });
  } catch (error) {
    console.error('tRPC handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}