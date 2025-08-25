import { Navbar } from "../components/Navigation/Navbar"
import { InsertNote } from "../components/Data/InsertNote"
import prisma from "@/lib/prisma"
import { auth } from '@/app/auth'

import Cookies from 'js-cookie';

type Note = {
    id: number;
    title: string;
    content: string | null;
    location: string | null;
    destination: string | null;
    date: Date | null;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
};
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { DeleteNoteButton } from "../components/Data/DeleteNoteButtton"
import { EditNoteButton } from "../components/Data/EditButton"

export default async function Page() {
        const authorIdCookie = Cookies.get("author")
        const session = await auth();
        // Only fetch notes for the logged-in user
        const notes: Note[] = session?.user?.id
            ? await prisma.note.findMany({ where: { authorId: Number(authorIdCookie) } })
            : [];
        function refreshNotes() {}
        return (
        <div>
            <Navbar logged={true} />
            <h1 className="text-5xl font-bold m-7">Notes</h1>
            <div className="grid grid-cols-4 m-4">
                {notes.map((note) => (
                    <Card key={note.id} className="w-80 p-2">
                        <h1 className="text-3xl font-bold">{note.title}
                        </h1>
                        <sub>ID: {note.id}</sub>
                        <h1 className="text-gray-500">{note.content}</h1>
                        <h1 className="font-bold">Location</h1>
                        
                                                {/* Example: If location is a JSON stringified array, parse and map it. If it's an object, display its properties. */}
                                                {(() => {
                                                    if (!note.location) return null;
                                                    try {
                                                        const loc = JSON.parse(note.location);
                                                        if (Array.isArray(loc)) {
                                                            return loc.map((item, idx) => (
                                                                <div key={idx}>{JSON.stringify(item)}</div>
                                                            ));
                                                        } else if (typeof loc === 'object') {
                                                            return (
                                                                <div>
                                                                                                        {Object.entries(loc).map(([k, v]) => (
                                                                                                            <div key={k}>{k}: {String(v)}</div>
                                                                                                        ))}
                                                                </div>
                                                            );
                                                        } else {
                                                            return <div>{String(loc)}</div>;
                                                        }
                                                    } catch (e) {
                                                        return <div>Invalid location format</div>;
                                                    }
                                                })()}
                                                <h1 className="font-bold">Destination</h1>
                                                {/* Parse and display destination if it's a JSON string */}
                                                {(() => {
                                                    if (!note.destination) return null;
                                                    try {
                                                        const dest = JSON.parse(note.destination);
                                                        if (Array.isArray(dest)) {
                                                            return dest.map((item, idx) => (
                                                                <div key={idx}>{JSON.stringify(item)}</div>
                                                            ));
                                                        } else if (typeof dest === 'object') {
                                                            return (
                                                                <div>
                                                                    {Object.entries(dest).map(([k, v]) => (
                                                                        <div key={k}>{k}: {String(v)}</div>
                                                                    ))}
                                                                </div>
                                                            );
                                                        } else {
                                                            return <div>{String(dest)}</div>;
                                                        }
                                                    } catch (e) {
                                                        return <div>Invalid destination format</div>;
                                                    }
                                                })()}
                        <h1 className="font-bold">Date</h1>
                        <h1 className='text-gray-500'>{note.date ? new Date(note.date).toLocaleDateString() : ""}</h1>
                        <h1 className="font-bold">Created On</h1>
                        <h1 className="text-gray-500">{note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ""}</h1>
                        <Button className="bg-blue-800">
                            <a href={`/map?tab=true&source=${note.location}&destination=${note.destination}`}>View on Map</a>
                        </Button>
                        <div className="flex justify-center gap-5">
                            <DeleteNoteButton noteId={note.id} />
                            <EditNoteButton note={note} />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}