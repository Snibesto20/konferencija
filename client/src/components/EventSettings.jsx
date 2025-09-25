import axios from "axios"

import EventParticipant from "./EventParticipant"

import { useEffect, useState, useRef } from "react"

import {FaCheck, FaTimes, FaPlus } from "react-icons/fa"

export default function EventSettings(p) {
    const [target, setTarget] = useState(null)
    const [formTitle, setFormTitle] = useState(null)
    const participant = useRef(null)

    useEffect(() => {
        async function fetchEvent() {
            const fetchedEvent = await axios.get("http://localhost:5000/fetchEvent", {params: {id: p.target}})
            setTarget(fetchedEvent.data)
            setFormTitle(fetchedEvent.data.name)
        }
        fetchEvent()
    }, [])

    function removeParticipant(name) {
        setTarget(prev => ({...prev, participants: prev.participants.filter(e => e !== name)}))
    }
    
    return (
        <div className={`relative bg-gray-200 opacity-150 ${target?.participants.length === 0 ? "h-72" : "h-100"} rounded-xs`}>
            <button className="absolute top-0 right-0 bg-gradient-to-b from-red-400 to-red-600 text-white p-1.5 cursor-pointer" onClick={p.onClose}>
                <FaTimes />
            </button>
            <div className="border-b px-5 mb-2.5">
                <h2 className="font-bold text-xl">{formTitle}</h2>
            </div>

            <form className="flex flex-col gap-2 px-5 py-2.5">
                <div className="flex flex-col">
                    <span>Renginio pavadinimas</span>
                    <input type="text" className="border outline-0 px-2" value={target ? target.name : ""} onChange={e => setTarget(prev => ({...prev, name: e.target.value}))} />
                </div>
                <div className="flex flex-col">
                    <span>Renginio data</span>
                    <input type="datetime-local" className="border outline-0 px-2" value={target ? target.date : ""} onChange={e => setTarget(prev => ({...prev, date: e.target.value}))} />
                </div>
                <div className="flex flex-col">
                    <span>Dalyvių sąrašas</span>
                    <div className="flex pb-2">
                        <input type="text" ref={participant} className="border outline-0 px-2 w-full" />
                        <button type="button" className="bg-gradient-to-b from-green-400 to-green-600 p-1 cursor-pointer border" onClick={() => setTarget(prev => ({...prev, participants: [...prev.participants, participant.current.value]}))}><FaPlus className="text-white" /></button>
                    </div>
                    <div className={`flex-col gap-2 overflow-y-scroll w-full break-all h-25  ${target?.participants?.length === 0 ? "hidden" : "flex"}`}>{target?.participants?.map((name, i) => <EventParticipant key={i} name={name} onRemove={removeParticipant} />)}</div>
                </div>

                <div className="flex w-full absolute bottom-0 left-0">
                    <button type="submit" className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-b from-green-400 to-green-600 w-3/4 border-r border-t cursor-pointer" onClick={() => p.updateEvent(target)}>
                        <span className="font-bold">Išsaugoti</span>
                        <FaCheck />
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-b from-red-400 to-red-600 w-1/4 border-t cursor-pointer">
                        <FaTimes />
                    </button>
                </div>

            </form>
        </div>
    )
}