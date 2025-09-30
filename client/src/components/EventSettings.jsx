import EventParticipant from "./EventParticipant"
import { useState } from "react"
import { FaCheck, FaTimes, FaPlus } from "react-icons/fa"

export default function EventSettings({target, onClose, onDelete, onUpdate}) {
    const [newEvent, setNewEvent] = useState(target)
    const [participant, setparticipant] = useState("")

    function removeParticipant(name) {
        setNewEvent(prev => ({...prev, participants: prev.participants.filter(el => el !== name)}))
    }

    function addParticipant() {
        if (!participant) return
        setNewEvent(prev => ({...prev, participants: [...prev.participants, participant]}))
        setparticipant("")
    }
    
    return (
        <div className="relative w-5/6 sm:w-100 bg-gray-200 opacity-150 rounded-xs">
            <button className="absolute top-0 right-0 bg-gradient-to-b from-red-400 to-red-600 text-white p-1.5 cursor-pointer outline outline-black" onClick={onClose}><FaTimes /></button>
            <div className="border-b px-5"><h2 className="font-bold text-xl">{target.name}</h2></div>
            <form className="flex flex-col space-y-4 px-5 py-4">
                <div>
                    <span className="font-semibold">Renginio pavadinimas</span>
                    <input type="text" className="border outline-0 px-2 w-full" value={newEvent.name} onChange={e => setNewEvent(prev => ({...prev, name: e.target.value}))} />
                </div>
                <div>
                    <span className="font-semibold">Renginio data</span>
                    <input type="datetime-local" className="border outline-0 px-2 w-full" value={newEvent.date} onChange={ev => setNewEvent(prev => ({...prev, date: ev.target.value}))} />
                </div>
                <div>
                    <span className="font-semibold">Dalyvių sąrašas</span>
                    <div className="flex mt-1">
                        <input type="text" value={participant} onChange={e => setparticipant(e.target.value)} className="border outline-0 px-2 w-full" />
                        <button type="button" className="bg-gradient-to-b from-green-400 to-green-600 p-1 cursor-pointer border" onClick={addParticipant}><FaPlus className="text-white" /></button>
                    </div>
                    <div className={`flex-col gap-2 w-full break-all mt-2 ${newEvent.participants.length === 0 ? "hidden" : "flex"} ${newEvent.participants.length === 1 ? "h-6" : newEvent.participants.length === 2 ? "h-14" : newEvent.participants.length === 3 ? "h-23" : "overflow-y-scroll h-23"}`}>{newEvent.participants.map((name, i) => <EventParticipant key={i} name={name} onRemove={removeParticipant} />)}</div>
                </div>
                <button className="bg-gradient-to-b from-red-400 to-red-600 text-white font-bold border border-black p-1.5 cursor-pointer" type="button" onClick={_ => onDelete(target._id)}>Ištrinti renginį</button>
                <div className="flex w-full">
                    <button type="submit" className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-b from-green-400 to-green-600 w-3/4 border-r border cursor-pointer" onClick={ev => onUpdate(ev, newEvent)}><span className="font-bold ">Išsaugoti</span><FaCheck /></button>
                    <button type="button" className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-b from-red-400 to-red-600 w-1/4 border cursor-pointer"><FaTimes /></button>
                </div>
            </form>
        </div>
    )
}
