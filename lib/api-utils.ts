import { NextResponse } from 'next/server';

// Helper to safely handle API routes that use Prisma
export function createSafeApiHandler<T>(
  handler: (request: Request) => Promise<Response>
): (request: Request) => Promise<Response> {
  return async (request: Request) => {
    // Always skip DB operations during build time
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      console.log('Build-time API call detected, returning mock response');
      return NextResponse.json({ success: true, mock: true });
    }

    try {
      return await handler(request);
    } catch (error) {
      console.error('API error:', error);
      return NextResponse.json(
        { error: 'An error occurred', details: (error as Error).message },
        { status: 500 }
      );
    }
  };
}
