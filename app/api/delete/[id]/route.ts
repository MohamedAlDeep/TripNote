import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function DELETE(request: Request): Promise<Response> {
  // Extract the id from the URL
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  const id = segments[segments.length - 1];

  if (!id) return new Response('Missing id', { status: 400 });

  await prisma.note.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}