
import { FaStar } from "react-icons/fa"

export default function EventCard(p) {
    return (
        <div className="relative flex flex-col bg-gradient-to-t from-gray-400 to-gray-100 rounded-xs h-36 p-3 border">
            <button className="absolute -top-2 -left-2 text-xl cursor-pointer" onClick={() => p.flipPriority(p.target._id)}>
                <FaStar className={`${p.target.priority ? "text-amber-500" : "text-black"}`} />
            </button>
            <h2 className={`text-xl font-semibold ${p.target.priority ? "bg-gradient-to-b from-yellow-500 to-amber-600 bg-clip-text text-transparent" : "text-black"}`}>{p.target.name}</h2>
            <h4 className="text-gray-800">{p.target.date.replace("T", " ")}</h4>
            <p className="truncate italic text-gray-500">
                {p.target.participants?.map(e => `${e}, `)}
            </p>
            <div className={`absolute bottom-0 left-0 flex justify-between bg-gradient-to-b  border-t border-black font-semibold p-2 w-full ${p.target.priority ? "from-amber-500 to-yellow-500" : "from-gray-300 to-gray-400"}`}>
                <button className="cursor-pointer">Pradėti</button>
                <button className="cursor-pointer" onClick={() => p.onConfigure(p.target._id)}>Konfiguruoti</button>
            </div>
        </div>
    )
}