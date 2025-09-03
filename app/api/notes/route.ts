import { NextResponse } from "next/server";
import { createSafeApiHandler } from '@/lib/api-utils';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET handler for notes
async function getNotesHandler(request: Request): Promise<Response> {
  // Dynamic import to avoid build-time issues
  const { default: prisma } = await import('@/lib/prisma');
  
  // Your existing code to get notes
  const notes = await prisma.note.findMany();
  return NextResponse.json(notes);
}

// POST handler for creating notes
async function createNoteHandler(request: Request): Promise<Response> {
  const { default: prisma } = await import('@/lib/prisma');
  
  try {
    const body = await request.json();
    const note = await prisma.note.create({
      data: body
    });
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create note", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// Export the wrapped handlers
export const GET = createSafeApiHandler(getNotesHandler);
export const POST = createSafeApiHandler(createNoteHandler);