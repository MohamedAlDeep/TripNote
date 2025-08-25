import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request, context: { params: { id: string } }) {
    const id = Number(context.params.id);
    const data = await request.json();
    console.log(data);
    const updatedNote = await prisma.note.update({
        where: { id },
        data,
    });
    return NextResponse.json(updatedNote);
}