import axios from "axios"
import { useEffect, useRef } from "react"
import { useState } from "react"
import {FaPlus} from "react-icons/fa"

import EventCard from "./components/EventCard"
import EventSettings from "./components/EventSettings"
import EventParticipant from "./components/EventParticipant"

export default function App() {
  const [eventFormOn, setEventFormOn] = useState(false)
  const name = useRef(null)
  const date = useRef(null)
  const participant = useRef(null)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(false)
  const [participants, setParticipants] = useState([])

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

  async function submitForm(e) {
    e.preventDefault()
    setParticipants([])

    await axios.post("http://localhost:5000/createEvent", {name: name.current.value, date: date.current.value})
  
    const response = await axios.get("http://localhost:5000/fetchEvents")
    setEvents(response.data)
  }

  function configureEvent(id) {
    setSelectedEvent(id)
  }

  async function updateEvent(event, target) {
      event.preventDefault()

      await axios.patch("http://localhost:5000/updateEvent", {event: target})
      setEvents(prev => prev.map(e => e._id === target._id ? target : e))
      setSelectedEvent(false)
  }

  async function flipPriority(id) {
    await axios.patch("http://localhost:5000/flipPriority", {_id: id})
    setEvents(prev => sortEvents(prev.map(e => e._id === id ? {...e, priority: !e.priority} : e)))
  }

  function removeParticipant(name) {
    setParticipants(prev => prev.filter(e => e !== name))
  }

  return (
    <div className="h-screen bg-gray-200">
        <div className="border-b px-5 py-2.5 mb-2.5">
          <button className="flex items-center gap-2 bg-gradient-to-b from-green-400 to-green-600 px-3 py-1.5 rounded-xs cursor-pointer" onClick={() => setEventFormOn(prev => !prev)}>
            <span className="font-bold">Pridėti naują</span>
            <FaPlus />
          </button>

          <div className={`absolute flex flex-col bg-gray-200 border w-72 p-2 z-10 ${eventFormOn ? "flex" : "hidden"} ${participants.length === 0 ? "h-60" : "h-86"}`}>
            <form onSubmit={e => submitForm(e)} className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="font-semibold">Renginio pavadinimas</span>
                <input type="text" ref={name} className="border outline-0 px-2" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Renginio data</span>
                <input type="datetime-local" ref={date} className="border outline-0 px-2" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Dalyvių sąrašas</span>
                <div className="flex pb-2">
                  <input type="text" ref={participant} className="border outline-0 px-2 w-full" />
                  <button type="button" className="bg-gradient-to-b from-green-400 to-green-600 p-1 cursor-pointer border" onClick={() => setParticipants(prev => [...prev, participant.current.value])}><FaPlus className="text-white" /></button>
                </div>
                <div className={`flex-col gap-2 overflow-y-scroll w-full break-all h-25  ${participants.length === 0 ? "hidden" : "flex"}`}>{participants.map((name, i) => <EventParticipant key={i} name={name} onRemove={removeParticipant} />)}</div>
              </div>
              <button type="submit" className="absolute left-0 bottom-0 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-b from-green-400 to-green-600 w-full border-t cursor-pointer">
                <span className="font-bold">Pridėti naują</span>
                <FaPlus />
              </button>
            </form>
          </div>
        </div>
        
        <div className="px-5 font-bold text-2xl mb-2.5">
          Renginiai
        </div>
        <div className="grid grid-cols-5 px-5 pb-2.5 gap-8">
          {events.map(element => <EventCard key={element._id} id={element._id} name={element.name} date={element.date} onConfigure={id => configureEvent(id)} flipPriority={flipPriority} priority={element.priority} />)}
        </div>

        {selectedEvent ?
          <div className={`absolute top-0 flex justify-center items-center h-screen bg-black opacity-80 w-full z-20}`}>
            <EventSettings onClose={() => setSelectedEvent(false)} target={selectedEvent} updateEvent={updateEvent} />
          </div>
        : null}
    </div>
  )
}