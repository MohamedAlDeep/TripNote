import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function DELETE(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  const id = segments[segments.length - 1];

  if (!id || isNaN(Number(id))) {
    return new Response('Missing or invalid id', { status: 400 });
  }

  try {
    await prisma.note.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    // Prisma error handling
    return NextResponse.json(
      { error: "Delete failed", details: (error as Error).message },
      { status: 500 }
    );
  }
}