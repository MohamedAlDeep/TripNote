import { Navbar } from "../components/Navigation/Navbar"
import { InsertNote } from "../components/Data/InsertNote"
import prisma from "@/lib/prisma"
import { Card } from "@/components/ui/card"
export default async function Page(){
    const notes = await prisma.note.findMany()
    console.log(notes)
    return(
        <div>
            <Navbar/>
            <h1 className="text-5xl font-bold m-7">Notes</h1>
            <div className="grid grid-cols-4">

            {
                notes.map(note => (
                    <Card className="w-60 p-2">
                        <h1>{note.title}</h1>
                        <h1>{note.content}</h1>
                        <h1>{note.location}</h1>
                        <h1>{note.destination}</h1>
                        <h1>{note.date ? new Date(note.date).toLocaleDateString() : ""}</h1>
                        <h1>{note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ""}</h1>
                    </Card>
                ))
            }
            </div>
            
            <InsertNote/>
        </div>
    )
}