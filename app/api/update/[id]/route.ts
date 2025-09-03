import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const data = await request.json();
    const updatedNote = await prisma.note.update({
        where: { id: Number(id) },
        data,
    });
    return NextResponse.json(updatedNote);
}