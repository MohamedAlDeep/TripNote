import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const { id } = await request.json()
    const response = NextResponse.json({success: true})
    response.cookies.set("author", String(id))
}