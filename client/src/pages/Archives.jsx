import axios from "axios"

import { useState, useEffect } from "react"

import ArchivesCard from "../components/ArchivesCard"
import ArchivesNavbar from "../components/navbars/ArchivesNavbar"

export default function Archives() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        async function fetchEvents() {
            const response = await axios.get("http://localhost:5000/fetchEvents")
            setEvents(response.data)
        }
        
        fetchEvents()
    }, [])

    async function clearArchive() {
        await axios.delete("http://localhost:5000/clearArchive")
        setEvents([])
    }

    async function unarchiveEvent(target) {
        await axios.patch("http://localhost:5000/updateEvent", {target: {...target, archived: false}})
        setEvents(prev => prev.filter(el => el._id != target._id))
    }

    return (
        <div className="h-screen bg-gray-200">
            <ArchivesNavbar onClearArchive={clearArchive} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-5 pb-2.5 gap-8">
                {events.map(el => el.archived ? <ArchivesCard key={el._id} target={el} onUnarchive={unarchiveEvent} priority={el.priority} /> : null)}
            </div>
        </div>
    )
}