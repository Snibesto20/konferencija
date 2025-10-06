import { useState } from "react"
import { FaTimes, FaAlignLeft } from "react-icons/fa"

export default function Description({ visible, onRemove, onUpdate, initial }) {
  const [value, setValue] = useState(initial || "")

  function handleInput(ev) {
    const newValue = ev.target.value
    setValue(newValue)
    onUpdate(newValue, 1)
  }

  return (
    <div className={`relative flex-col ${visible ? "flex" : "hidden"} border border-sky-800 p-4 gap-2`}>
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
            <div className="w-8 h-8 border border-sky-800 p-1.5">
                <FaAlignLeft className="w-full h-full text-sky-800" />
            </div>
            <span className="font-semibold text-sky-800">Aprašymas</span>
        </div>
        <div className="w-8 h-8 border bg-gradient-to-b from-red-400 to-red-600 p-1.5 cursor-pointer" onClick={() => onRemove(1)}>
            <FaTimes className="w-full h-full text-white" />
        </div>
      </div>

      <textarea className="border border-sky-800 text-sky-800 outline-0 p-2 resize-none" onInput={ev => handleInput(ev)} value={value}/>
    </div>
  )
}
