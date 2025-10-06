import { useState } from "react"
import { FaTimes, FaPlus, FaList, FaAlignLeft } from "react-icons/fa"
import PluginCard from "../components/PluginCard"
import Description from "./plugins/Description"
import Participants from "./plugins/Participants"

export default function EventCreate({ onClose, onCreateEvent }) {
  const [newEvent, setNewEvent] = useState({ name: "", date: "", participants: [], plugins: {} })

  function addPlugin(pluginId) {
    setNewEvent(prev => {
      const tempEvent = { ...prev }
      tempEvent.plugins[pluginId] = ""
      return tempEvent
    })
  }

  function removePlugin(pluginId) {
    setNewEvent(prev => {
      const tempEvent = { ...prev }
      delete tempEvent.plugins[pluginId]
      return tempEvent
    })
  }

  function updatePlugin(value, pluginId) {
    setNewEvent(prev => ({ ...prev, plugins: { ...prev.plugins, [pluginId]: value } }))
  }

  return (
    <div className="relative flex flex-col bg-gray-200 rounded-xs border p-5 w-200 gap-4">
      <button className="absolute top-0 right-0 bg-gradient-to-b from-red-400 to-red-600 text-white p-1.5 cursor-pointer outline outline-black" onClick={onClose}><FaTimes /></button>
      <div className="border-b pb-2"><h2 className="font-bold text-xl">Naujas renginys</h2></div>
      <form onSubmit={ev => onCreateEvent(ev, newEvent)} className="flex flex-col space-y-4">
        <div>
          <span className="font-semibold">Renginio pavadinimas</span>
          <input type="text" onChange={ev => setNewEvent(prev => ({ ...prev, name: ev.target.value }))} className="border outline-0 px-2 w-full mt-1" />
        </div>
        <div>
          <span className="font-semibold">Renginio data</span>
          <input type="datetime-local" onChange={ev => setNewEvent(prev => ({ ...prev, date: ev.target.value }))} className="border outline-0 px-2 w-full mt-1" />
        </div>

        <Description visible={newEvent.plugins[1] !== undefined} onUpdate={updatePlugin} onRemove={removePlugin} initial="" />
        <Participants visible={newEvent.plugins[2] !== undefined} onUpdate={updatePlugin} onRemove={removePlugin} initial="" />

        <div>
          <span className="font-semibold">Renginio įskiepiai</span>
          <div className="grid grid-cols-2 gap-8 overflow-y-scroll h-36 mt-1">
            <PluginCard id={2} onAdd={addPlugin} mainColor={"#ef4444"} Icon={FaList} secondaryColor={"#f87171"} cover="/backgrounds/red-diagonal-stripes.svg"title="Lokacija" description="Pridėti lokacijos informaciją prie renginio." selected={newEvent.plugins[2] !== undefined} />
            <PluginCard id={1} onAdd={addPlugin} mainColor={"#075985"} Icon={FaAlignLeft} secondaryColor={"#0284c7"} cover="/backgrounds/blue-squares.svg" title="Aprašymas" description="Pridėti renginiui aprašymą." selected={newEvent.plugins[1] !== undefined} />
          </div>
        </div>

        <button type="submit" className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-b from-green-400 to-green-600 w-full border cursor-pointer">
          <span className="font-bold">Pridėti naują</span>
          <FaPlus />
        </button>
      </form>
    </div>
  )
}
