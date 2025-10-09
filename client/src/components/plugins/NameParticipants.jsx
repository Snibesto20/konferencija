import { useState, useRef } from "react"
import { FaList, FaPlus, FaTimes } from "react-icons/fa"
import NameParticipant from "../NameParticipant"

export default function NameParticipants({ visible, onRemove, onUpdate, initial }) {
    const [value, setValue] = useState(initial || [])
    const name = useRef("")

    function addParticipant() {
        const newValue = [...value, name.current.value]
        setValue(newValue)
        onUpdate(newValue, 2)
    }

    function removeParticipant(name) {
        const newValue = value.filter(el => el !== name)
        console.log(newValue);
        
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
                    <span className="font-semibold text-red-500">Vardinis dalyvių sąrašas</span>
                </div>
                <div className="w-8 h-8 border bg-gradient-to-b from-red-400 to-red-600 p-1.5 cursor-pointer" onClick={() => onRemove(2)}>
                    <FaTimes className="w-full h-full text-white" />
                </div>
            </div>
            <div className="flex">
                <input type="text" ref={name} className="border border-red-500 outline-0 px-2 py-1 w-full" />
                <button type="button" className="bg-gradient-to-b from-red-400 to-red-600 p-1.5 cursor-pointer border border-red-500" onClick={addParticipant}><FaPlus className="text-white" /></button>
            </div>
            <div className={`flex-col gap-2 w-full break-all ${value.length === 0 ? "hidden" : "flex"} ${value.length === 1 ? "h-6" : value.length === 2 ? "h-14" : value.length === 3 ? "h-23" : "overflow-y-scroll h-23"}`}>{value.map((name, i) => <NameParticipant key={i} name={name} onRemove={removeParticipant} />)}</div>
        </div>
    )
}