import axios from "axios"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"

import EventCard from "../components/EventCard"
import EventSettings from "../components/EventSettings"
import EventCreate from "../components/EventCreate"

export default function Panel() {
  const [createEventOn, setCreateEventOn] = useState(false)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(false)

  function sortEvents(sortable) {
    let priority = []
    const nonPriority = []  
    for(let i = 0; i < sortable.length; i++) {
      if(sortable[i].priority === true) {
        priority.push(sortable[i])
      }
      else {
        nonPriority.push(sortable[i])
      }
    }
    return([...priority, ...nonPriority])
  }

  useEffect(() => {
    async function fetchEvents() {
      const response = await axios.get("http://localhost:5000/fetchEvents")
      setEvents(sortEvents(response.data))
    }
    
    fetchEvents()
  }, [])

  async function createEvent(ev, newEvent) {
    ev.preventDefault()
    await axios.post("http://localhost:5000/createEvent", {newEvent})
  
    const response = await axios.get("http://localhost:5000/fetchEvents")
    console.log(response.data);
    
    setEvents(response.data)
    setCreateEventOn(false)
  }

  function configureEvent(el) {
    setSelectedEvent(el)
  }

  async function updateEvent(ev, target) {
      ev.preventDefault()
      await axios.patch("http://localhost:5000/updateEvent", {event: target})
      setEvents(prev => prev.map(el => el._id === target._id ? target : el))
      setSelectedEvent(false)
  }

  async function flipPriority(id) {
    await axios.patch("http://localhost:5000/flipPriority", {_id: id})
    setEvents(prev => sortEvents(prev.map(el => el._id === id ? {...el, priority: !el.priority} : el)))
  }

  async function deleteEvent(id) {
    await axios.delete("http://localhost:5000/deleteEvent", {data: {id}})
    setEvents(prev => prev.filter(el => el._id !== id))
    setSelectedEvent(false)
  }
  
  return (
    <div className="h-screen bg-gray-200">
        <div className="border-b px-5 py-2.5 mb-2.5">
          <button className="flex items-center gap-2 bg-gradient-to-b from-green-400 to-green-600 px-3 py-1.5 rounded-xs cursor-pointer border" onClick={() => setCreateEventOn(prev => !prev)}>
            <span className="font-bold">Pridėti naują</span>
            <FaPlus />
          </button>
        </div>
        
        <div className="px-5 font-bold text-2xl mb-2.5">
          Renginiai
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-5 pb-2.5 gap-8">
          {events.map(el => <EventCard key={el._id} target={el} onConfigure={id => configureEvent(id)} flipPriority={flipPriority} priority={el.priority} />)}
        </div>

        {selectedEvent ?
        <div className="absolute top-0 w-full flex justify-center items-center h-screen">
          <div className={`absolute top-0 h-screen bg-black opacity-80 w-full`}></div>
          <EventSettings onClose={() => setSelectedEvent(false)} target={selectedEvent} onUpdate={updateEvent} onDelete={deleteEvent} />
        </div>
        : null}

        {createEventOn ?
        <div className="absolute top-0 w-full flex justify-center items-center h-screen">
          <div className={`absolute top-0 h-screen bg-black opacity-80 w-full`}></div>
          {createEventOn ? <EventCreate onCreateEvent={createEvent} onClose={() => setCreateEventOn(false)} /> : null}
        </div>
        : null}
    </div>
  )
}