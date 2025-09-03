import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

// Add this line to disable direct DB connections during build time
export const dynamic = 'force-dynamic';

export async function DELETE(request: Request): Promise<Response> {
  try {
    // Extract the id from the URL path
    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];

    if (!id || isNaN(Number(id))) {
      return new Response('Missing or invalid id', { status: 400 });
    }

    // Delete the note
    await prisma.note.delete({ 
      where: { id: Number(id) } 
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete note error:", error);
    return NextResponse.json(
      { error: "Failed to delete note", details: (error as Error).message },
      { status: 500 }
    );
  }
}