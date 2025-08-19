"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Autour_One } from "next/font/google"

export function InsertNote(){
       // const title = 'test'
    // const content = 'test'
    // const location = 'test'
    // const destination = 'test123'
    // const authorId = 1 // Replace with actual user id
    // const date = new Date()

    const [title, setTitle ] = useState('')
    const [content, setContent ] = useState('')
    const [location, setLocation ] = useState('')
    const [destination, setDestination ] = useState('')
    const [authorID, setAuthorID ] = useState(0)
    const [ date, setDate ] = useState('')
    const [ message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('')
        try {
            const res = await fetch('/api/notes', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title,
                    content,
                    location,
                    destination,
                    authorID: authorID ? Number(authorID) : undefined,
                    date
                })
            })
            if(res.ok){
                setMessage("Note added")
                setTitle('')
                setContent('')
                setLocation('')
                setDestination('')
                setAuthorID(0)
                setDate('')
            }
            else{
                setMessage('Failed to add note')
            }

        }catch (err){
            setMessage("Error submitting form")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                />
                
                <label>Content</label>
                <input type="text" 
                value={content}
                onChange={e => setContent(e.target.value)}
                />
                
                <label>location</label>
                <input type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                />
                
                <label>destination</label>
                <input type="text"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                />

                <label>authorID</label>
                <input type="number"
                value={authorID}
                onChange={e => setAuthorID(parseInt(e.target.value))}
                />

                <label>Date</label>
                <input type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                />
                <Button type='submit'> 
                    Add Note
                </Button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}