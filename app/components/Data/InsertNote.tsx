"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Autour_One } from "next/font/google"
import { Input } from "@/components/ui/input"
import { Calendar } from '@/components/ui/calendar'
import { ChevronDownIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { da } from "date-fns/locale"



export function InsertNote(){
       // const title = 'test'
    // const content = 'test'
    // const location = 'test'
    // const destination = 'test123'
    // const authorId = 1 // Replace with actual user id
    // const date = new Date()
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

    const [title, setTitle ] = useState('')
    const [content, setContent ] = useState('')
    const [location, setLocation ] = useState('')
    const [destination, setDestination ] = useState('')
    const [authorID, setAuthorID ] = useState(0)
    // const [date, setDate] = useState<Date | undefined>(undefined)
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
                    date: date ? date.toISOString() : undefined
                })
            })
            if(res.ok){
                setMessage("Note added")
                setTitle('')
                setContent('')
                setLocation('')
                setDestination('')
                setAuthorID(0)
                setDate(undefined)
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
                <Label className="px-1" htmlFor="title">Title</Label>
                <Input 
                id="title"
                type="text"
                className="w-52" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                />
                
                <Label className="px-1">Content</Label>
                <Input type="text"
                className="w-52" 
                value={content}
                onChange={e => setContent(e.target.value)}
                />
                
                <Label className="px-1">location</Label>
                <Input type="text"
                className="w-52 "
                value={location}
                onChange={e => setLocation(e.target.value)}
                />
                
                <Label className="px-1">destination</Label>
                <Input type="text"
                className="w-52"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                />

                <Label>authorID</Label>
                <Input type="number"
                className="w-52 px-1"
                value={authorID}
                onChange={e => setAuthorID(parseInt(e.target.value))}
                />

                {/* <label>Date</label>
                                <Calendar 
                                    mode='single'
                                    className="rounded-lg border"
                                    selected={date}
                                    onSelect={setDate}
                                /> */}
                <div className="flex flex-col gap-3">
                    <Label htmlFor="date" className="px-1">
                        Date
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            id="date"
                            className='w-52 justify-between font-normal'
                            >
                                {date ? date.toLocaleDateString() : "Select date"}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto overflow-hidden p-0' align="start">
                            <Calendar 
                            mode="single" 
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setDate(date)
                                setOpen(false)
                            }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <Button className="w-52 mt-5" type='submit'> 
                    Add Note
                </Button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}