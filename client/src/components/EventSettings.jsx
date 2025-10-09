import { useState } from "react"
import { FaCheck, FaTimes, FaList, FaAlignLeft, FaMapMarkerAlt, FaUserFriends } from "react-icons/fa"
import PluginCard from "../components/PluginCard"
import Description from "./plugins/Description"
import NameParticipants from "./plugins/NameParticipants"
import ProfileParticipants from "./plugins/ProfileParticipants"

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
        <div className="relative w-200 bg-gray-200 opacity-150 rounded-xs p-4 m-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-bold text-xl">Naujas renginys</h2>
              <button className="bg-gradient-to-b from-red-400 to-red-600 text-white p-1.5 cursor-pointer outline outline-black" onClick={onClose}><FaTimes /></button>
            </div>
            <form className="flex flex-col space-y-4 mt-4">
                <div>
                    <span className="font-semibold">Renginio pavadinimas</span>
                    <input type="text" className="border outline-0 px-2 py-1 w-full mt-1" value={newEvent.name} onChange={e => setNewEvent(prev => ({...prev, name: e.target.value}))} />
                </div>
                <div>
                    <span className="font-semibold">Renginio data</span>
                    <input type="datetime-local" className="border outline-0 px-2 py-1 w-full mt-1" value={newEvent.date} onChange={ev => setNewEvent(prev => ({...prev, date: ev.target.value}))} />
                </div>

                <Description visible={newEvent.plugins?.[1] !== undefined} onUpdate={updatePlugin} onRemove={removePlugin} initial={newEvent.plugins?.[1]} />
                <NameParticipants visible={newEvent.plugins?.[2] !== undefined} onUpdate={updatePlugin} onRemove={removePlugin} initial={newEvent.plugins?.[2]} />
                <ProfileParticipants visible={newEvent.plugins[4] !== undefined} onUpdate={updatePlugin} onRemove={removePlugin} initial={newEvent.plugins?.[4]} />
                
                <div>
                    <span className="font-semibold">Renginio įskiepiai</span>
                    <div className="grid grid-cols-2 gap-4 overflow-y-scroll h-36 mt-1">
                      <PluginCard id={1} onAdd={addPlugin} mainColor={"#075985"} Icon={FaAlignLeft} secondaryColor={"#0284c7"} title="Aprašymas" description="Renginio aprašymas." selected={newEvent.plugins[1] !== undefined} cover={"iBlueTiles"} />
                      <PluginCard id={2} onAdd={addPlugin} mainColor={"#ef4444"} Icon={FaList} secondaryColor={"#f87171"} title="Vardinis dalyvių sąrašas" description="Dalyvių sąrašas su vardu." selected={newEvent.plugins[2] !== undefined} cover={"iRedDeathStar"} />
                      <PluginCard id={3} onAdd={addPlugin} mainColor={"#075985"} Icon={FaMapMarkerAlt} secondaryColor={"#0284c7"} title="Aprašymas" description="Renginio aprašymas papildantis informaciją." selected={newEvent.plugins[1] !== undefined} cover={"iTopography"} />
                      <PluginCard id={4} onAdd={addPlugin} mainColor={"#382211"} Icon={FaUserFriends} secondaryColor={"#6e533f"} title="Profilinis dalyvių sąrašas" description="Dalyvių sąrašas su vardu, pavarde, e-paštu." selected={newEvent.plugins[4] !== undefined} cover={"iBrownLeaves"} />
                    </div>
                </div>

                <button className="bg-gradient-to-b from-red-400 to-red-600 text-white font-bold border border-black p-1.5 cursor-pointer" type="button" onClick={_ => onDelete(target._id)}>Ištrinti renginį</button>
                <div className="flex w-full">
                    <button type="submit" className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-b from-green-400 to-green-600 w-3/4 border-r border border-black cursor-pointer text-white" onClick={ev => onUpdate(ev, newEvent)}><span className="font-bold ">Išsaugoti</span><FaCheck /></button>
                    <button type="button" className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-b from-red-400 to-red-600 w-1/4 border border-black cursor-pointer text-white"><FaTimes /></button>
                </div>
            </form>
        </div>
    )
}
