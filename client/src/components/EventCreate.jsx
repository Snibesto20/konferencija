import { useState } from "react"
import EventParticipant from "./EventParticipant"
import { FaTimes, FaPlus } from "react-icons/fa"

export default function EventCreate({onClose, onCreateEvent}) {
    const [newEvent, setNewEvent] = useState({name: "", date: "", participants: []})
    const [participantValue, setParticipantValue] = useState("")

    function removeParticipant(name) {
        setNewEvent(prev => ({...prev, participants: prev.participants.filter(el => el !== name)}))
    }

    function addParticipant() {
        if (!participantValue) return
        setNewEvent(prev => ({...prev, participants: [...prev.participants, participantValue]}))
        setParticipantValue("")
    }
    return (
        <div className={`absolute flex flex-col bg-gray-200 border w-72 p-2 z-10 ${newEvent.participants.length === 0 ? "h-60" : "h-86"}`}>
            <button className="absolute top-0 right-0 bg-gradient-to-b from-red-400 to-red-600 border-b border-l border-black text-white p-1.5 cursor-pointer" onClick={onClose}>
                <FaTimes />
            </button>
            <form onSubmit={ev => onCreateEvent(ev, newEvent)} className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="font-semibold">Renginio pavadinimas</span>
                <input type="text" onChange={ev => setNewEvent(prev => ({...prev, name: ev.target.value}))} className="border outline-0 px-2" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Renginio data</span>
                <input type="datetime-local" onChange={ev => setNewEvent(prev => ({...prev, date: ev.target.value}))} className="border outline-0 px-2" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Dalyvių sąrašas</span>
                <div className="flex pb-2">
                  <input type="text" value={participantValue} onChange={e => setParticipantValue(e.target.value)} className="border outline-0 px-2 w-full" />
                  <button type="button" className="bg-gradient-to-b from-green-400 to-green-600 p-1 cursor-pointer border" onClick={addParticipant}><FaPlus className="text-white" /></button>
                </div>
                <div className={`flex-col gap-2 overflow-y-scroll w-full break-all h-25 ${newEvent.participants.length === 0 ? "hidden" : "flex"}`}>{newEvent.participants.map((name, i) => <EventParticipant key={i} name={name} onRemove={removeParticipant} />)}</div>
              </div>
              <button type="submit" className="absolute left-0 bottom-0 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-b from-green-400 to-green-600 w-full border-t cursor-pointer">
                <span className="font-bold">Pridėti naują</span>
                <FaPlus />
              </button>
            </form>
        </div>
    )
}
