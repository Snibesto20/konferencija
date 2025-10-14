import { FaArchive, FaCog, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ArchivesNavbar({onClearArchive}) {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col border-b mb-2.5">
            <div className="flex items-center justify-between bg-gray-300 px-4 py-2 mb-2.5">
                <div className="flex items-center gap-2.5">
                    <FaArchive className="text-xl" />
                    <h2 className="font-bold text-xl">Archyvai</h2>
                </div>
                <div>
                    <button className="flex items-center gap-2.5 bg-gray-200 rounded-xs transition-all hover:rounded-4xl px-2 py-1 font-bold cursor-pointer" onClick={() => navigate("/panel")}>Valdymo skydas<FaCog /></button>
                </div>
            </div>
            <div className="flex gap-4 px-4 mb-2.5">
            <button className="flex items-center gap-2 bg-gradient-to-b from-red-400 to-red-600 px-3 py-1.5 rounded-xs transition-all hover:rounded-4xl cursor-pointer border" onClick={onClearArchive}>
                <span className="font-bold">Išvalyti archyvą</span>
                <FaTrash />
            </button>
            </div>
        </div>
    )
}