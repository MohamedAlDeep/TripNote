import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma'

// Remove NoteType and use Prisma's type directly, or construct the object inline
// type NoteType = {
//     title: string,
//     content: string,
//     location: string,
//     destination: string,
//     authorId?: number,
//     date?: Date
// }

export const dynamic = 'force-dynamic';

export async function POST(request: Request){
    const data = await request.json();
    // Build the note data object, only including fields if they are defined
    const noteData: any = {
        title: data.title,
        content: data.content,
        location: data.location,
        destination: data.destination,
    };
    if (data.authorID) noteData.authorId = Number(data.authorID);
    if (data.date) noteData.date = new Date(data.date);

    const note = await prisma.note.create({ data: noteData });
    return NextResponse.json(note, { status: 201 });
}