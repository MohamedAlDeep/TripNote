import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function DELETE(request: Request, context: { params: { id: string } }) {
    const id = Number(context.params.id);
    await prisma.note.delete({ where: { id } });
    return NextResponse.json({ success: true });
}