import { useState } from "react"
import { FaList, FaPlus, FaTimes } from "react-icons/fa"
import EventParticipant from "../Participant"

export default function Participants({ visible, onRemove, onUpdate, initial }) {
    const [value, setValue] = useState(initial || [])
    const [input, setInput] = useState("")

    function handleInput() {
        const newValue = [...value, input]
        setValue(newValue)
        onUpdate(newValue, 2)
    }

    return (
        <div className={`relative flex-col ${visible ? "flex" : "hidden"} border border-red-500 p-4 gap-2`}>
            <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 border border-red-500 p-1.5">
                        <FaList className="w-full h-full text-red-500" />
                    </div>
                    <span className="font-semibold text-red-500">Dalyvių sąrašas</span>
                </div>
                <div className="w-8 h-8 border bg-gradient-to-b from-red-400 to-red-600 p-1.5 cursor-pointer" onClick={() => onRemove(2)}>
                    <FaTimes className="w-full h-full text-white" />
                </div>
            </div>
            <div className="flex">
                <input type="text" onChange={e => setInput(e.target.value)} className="border border-red-500 outline-0 px-2 w-full" onInput={ev => setInput(ev.target.value)} />
                <button type="button" className="bg-gradient-to-b from-red-400 to-red-600 p-1 cursor-pointer border border-red-500" onClick={handleInput}><FaPlus className="text-white" /></button>
            </div>
            <div className={`flex-col gap-2 w-full break-all mt-2 ${value.length === 0 ? "hidden" : "flex"} ${value.length === 1 ? "h-6" : value.length === 2 ? "h-14" : value.length === 3 ? "h-23" : "overflow-y-scroll h-23"}`}>{value.map((name, i) => <EventParticipant key={i} name={name} onRemove={() => setValue(prev => prev.filter(el => el.name !== name))} />)}</div>
        </div>
    )
}