import { FaTimes } from "react-icons/fa";

export default function NameParticipant({name, onRemove}) {
    return (
        <div className="relative flex bg-gradient-to-b from-gray-300 to-gray-400 pl-2 gap-2 border h-6">
            {name}
            <button type="button" className="absolute right-0 bg-gradient-to-b from-red-400 to-red-600 text-white p-1 cursor-pointer h-5.5 border-l border-black" onClick={() => onRemove(name)}><FaTimes className="text-white" /></button>
        </div>
    )
}