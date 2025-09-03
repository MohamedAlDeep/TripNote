import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

// Prevent static analysis during build but don't use edge runtime
export const dynamic = 'force-dynamic';

export async function DELETE(request: Request): Promise<Response> {
  // Skip DB operations during build - CRUCIAL addition
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PHASE === 'phase-production-build') {
    return new Response('Skipping DB operations during build', { status: 200 });
  }
  
  try {
    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];
    
    if (!id || isNaN(Number(id))) {
      return new Response('Missing or invalid id', { status: 400 });
    }
    
    await prisma.note.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete note error:", error);
    return NextResponse.json(
      { error: "Failed to delete note", details: (error as Error).message },
      { status: 500 }
    );
  }
}