import { useState } from "react"
import { FaTimes, FaMapMarkerAlt } from "react-icons/fa"

export default function Location({ visible, onRemove, onUpdate, initial }) {
  const [value, setValue] = useState(initial || "")

  function handleInput(ev) {
    const newValue = ev.target.value
    console.log(newValue);
    setValue(newValue)
    onUpdate(newValue, 3)
  }

  return (
    <div className={`relative flex-col ${visible ? "flex" : "hidden"} border border-green-800 p-4 gap-2`}>
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
            <div className="w-8 h-8 border border-green-800 p-1.5">
                <FaMapMarkerAlt className="w-full h-full text-green-800" />
            </div>
            <span className="font-semibold text-green-800">Lokacija</span>
        </div>
        <div className="w-8 h-8 border bg-gradient-to-b from-green-400 to-green-800 p-1.5 cursor-pointer" onClick={() => onRemove(3)}>
            <FaTimes className="w-full h-full text-white" />
        </div>
      </div>

      <input className="border border-green-800 text-green-800 outline-0 p-2" onInput={ev => handleInput(ev)} value={value}/>
    </div>
  )
}
