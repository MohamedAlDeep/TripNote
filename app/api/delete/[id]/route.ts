import { NextResponse } from "next/server";
import { createSafeApiHandler } from '@/lib/api-utils';

// Force dynamic rendering to ensure this runs at request time, not build time
export const dynamic = 'force-dynamic';

// The actual handler with Prisma usage
async function deleteHandler(request: Request): Promise<Response> {
  // We'll only get here during runtime, not build time
  const { default: prisma } = await import('@/lib/prisma');
  
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  const id = segments[segments.length - 1];
  
  if (!id || isNaN(Number(id))) {
    return new Response('Missing or invalid id', { status: 400 });
  }
  
  await prisma.note.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}

// Export the wrapped handler
export const DELETE = createSafeApiHandler(deleteHandler);