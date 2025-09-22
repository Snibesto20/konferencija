
import { FaStar } from "react-icons/fa"

export default function EventCard(p) {
    return (
        <div className="relative flex flex-col bg-gradient-to-t from-gray-400 to-gray-100 rounded-xs h-30 p-3 border">
            <button className="absolute -top-2 -left-2 text-xl cursor-pointer" onClick={() => p.flipPriority(p.id)}>
                <FaStar className={`${p.priority ? "text-amber-500" : "text-black"}`} />
            </button>
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <h4 className="text-gray-700">{p.date.replace("T", " ")}</h4>
            <div className="absolute bottom-0 left-0 flex justify-between bg-gradient-to-b from-gray-300 to-gray-400 border-t border-black font-semibold p-2 w-full">
                <button className="cursor-pointer">Pradėti</button>
                <button className="cursor-pointer" onClick={() => p.onConfigure(p.id)}>Konfiguruoti</button>
            </div>
        </div>
    )
}