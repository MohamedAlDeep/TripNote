import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request:Request, {params}: {params: {id: string}}) {
    const id = await Number(params.id)
    const data = await request.json()
    console.log(data)
    const updatedNote = await prisma.note.update({
        where: {id},
        data,
    })
    return NextResponse.json(updatedNote)
}