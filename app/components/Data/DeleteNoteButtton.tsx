"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function DeleteNoteButton({noteId}: {noteId: number}){
    const router = useRouter()
    return (
        <Button
        className="w-34 bg-blue-800"
        onClick={async () => {
            await fetch(`/api/delete/${noteId}`, {method: "DELETE"})
            router.refresh()
        }}>
            Delete
        </Button>
    )
}