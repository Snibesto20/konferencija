import { FaTimes } from "react-icons/fa";

export default function EventParticipant(p) {
    return (
        <div className="flex justify-between bg-gradient-to-b from-gray-300 to-gray-400 font-semibold pl-2 gap-2">
            {p.name}
            <button type="button" className="bg-gradient-to-b from-red-400 to-red-600 text-white p-1.5 cursor-pointer"><FaTimes className="text-white" onClick={() => p.onRemove(p.name)} /></button>
        </div>
    )
}