import { FaCheck } from "react-icons/fa"

export default function AttendanceCard({name}) {
    return (
        <div className="relative bg-gradient-to-t from-gray-400 to-gray-100 border rounded-xs px-4 py-2 text-xl">
            {name}
            <button type="button" className="absolute right-0 top-0 bg-gradient-to-b from-green-400 to-green-600 p-3 cursor-pointer border-l"><FaCheck className="text-white" /></button>
        </div>
    )
}