import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function DELETE(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  if (!id) return new Response('Missing id', { status: 400 });
  await prisma.note.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}