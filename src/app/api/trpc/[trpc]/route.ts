import { appRouter } from '@/server/trpc/routers/_app';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
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