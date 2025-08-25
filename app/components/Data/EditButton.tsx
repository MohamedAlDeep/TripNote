"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setDefaultResultOrder } from "dns";
import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from "@radix-ui/react-label";
type Note = {
    id: number;
    title: string;
    content: string | null;
    // add other fields as needed
};

export function EditNoteButton({ note }: { note: Note }) {
    const router = useRouter()
    const [editing, setEditing ] = useState(false)
    const [title , setTitle ] = useState(note.title)
    const [content, setContent] = useState(note.content)
    const handleUpdate = async () => {
        await fetch(`/api/update/${note.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, content}),
        });
        router.refresh()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-34 bg-blue-800">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Note
                    </DialogTitle>
                    <DialogDescription>
                        You can edit the title, content, date of your note. However if you want to change the location then you can only delete the note and create new one.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Label>Title</Label>
                    <Input value={title} onChange={e => setTitle(e.target.value)}/>
                    <Label>Content</Label>
                    <Input value={content ?? ""} onChange={e => setContent(e.target.value)}/>
                    <DialogClose>
                        <Button className="mt-5 w-34 bg-blue-800" onClick={handleUpdate}>Save</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )

    // return editing ? (

        // <div>
        //     <Input value={title} onChange={e => setTitle(e.target.value)}/>
        //     <Button onClick={handleUpdate}>Save</Button>
        //     <Button onClick={() => setEditing(false)}>Cancel</Button>
        // </div>
    // ) : (
    //     <Button
    //     onClick={()=> setEditing(true)}
    //     >
    //         Edit
    //     </Button>

    // )
}