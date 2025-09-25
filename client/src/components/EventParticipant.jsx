import { FaTimes } from "react-icons/fa";

export default function EventParticipant(p) {
    return (
        <div className="relative flex bg-gradient-to-b from-gray-300 to-gray-400 font-semibold pl-2 gap-2">
            {p.name}
            <button type="button" className="absolute right-0 bg-gradient-to-b from-red-400 to-red-600 text-white p-1 cursor-pointer" onClick={() => p.onRemove(p.name)}><FaTimes className="text-white" /></button>
        </div>
    )
}