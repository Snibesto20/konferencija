import { useState } from "react"
import { FaCheck, FaTimes, FaList, FaAlignLeft } from "react-icons/fa"
import PluginCard from "../components/PluginCard"
import Description from "./plugins/Description"
import Participants from "./plugins/Participants"

export default function EventSettings({target, onClose, onDelete, onUpdate}) {
    const [newEvent, setNewEvent] = useState(target)

    console.log(target);

    function addPlugin(pluginId) {
      setNewEvent(prev => {
        const tempEvent = {...prev}
        tempEvent.plugins[pluginId] = ""
        return tempEvent
      })
    }

    function updatePlugin(value, pluginId) {
        setNewEvent(prev => {
          const tempEvent = {...prev, plugins: {...prev.plugins, [pluginId]: value }}
          return tempEvent
        })
    }

    function removePlugin(pluginId) {
      setNewEvent(prev => {
        const tempEvent = {...prev}
        delete tempEvent.plugins[pluginId]
        return tempEvent
      })
    }
    
    return (
        <div className="relative w-200 bg-gray-200 opacity-150 rounded-xs">
            <button className="absolute top-0 right-0 bg-gradient-to-b from-red-400 to-red-600 text-white p-1.5 cursor-pointer outline outline-black" onClick={onClose}><FaTimes /></button>
            <form className="flex flex-col space-y-4 p-5">
                <div className="border-b pb-2"><h2 className="font-bold text-xl">{target.name}</h2></div>
                <div>
                    <span className="font-semibold">Renginio pavadinimas</span>
                    <input type="text" className="border outline-0 px-2 w-full" value={newEvent.name} onChange={e => setNewEvent(prev => ({...prev, name: e.target.value}))} />
                </div>
                <div>
                    <span className="font-semibold">Renginio data</span>
                    <input type="datetime-local" className="border outline-0 px-2 w-full" value={newEvent.date} onChange={ev => setNewEvent(prev => ({...prev, date: ev.target.value}))} />
                </div>


                <Description visible={newEvent.plugins?.[1] !== undefined} onUpdate={updatePlugin} onRemove={removePlugin} initial={newEvent.plugins?.[1]} />
                <Participants visible={newEvent.plugins?.[2] !== undefined} onUpdate={updatePlugin} onRemove={removePlugin} initial={newEvent.plugins?.[2]} />
                
                <div>
                    <span className="font-semibold">Renginio įskiepiai</span>
                    <div className="grid grid-cols-2 gap-8 overflow-y-scroll h-36">
                        <PluginCard id={2} onAdd={addPlugin} mainColor={"#ef4444"} Icon={FaList} secondaryColor={"#f87171"} cover="/backgrounds/red-diagonal-stripes.svg" title="Dalyvių sąrašas" description="Pridėti dalyvių sąrašą prie renginio." selected={newEvent.plugins?.[2] !== undefined} />
                        <PluginCard id={1} onAdd={addPlugin} mainColor={"#075985"} Icon={FaAlignLeft} secondaryColor={"#0284c7"} cover="/backgrounds/blue-squares.svg" title="Aprašymas" description="Pridėti renginiui aprašymą." selected={newEvent.plugins?.[1] !== undefined} />
                    </div>
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
