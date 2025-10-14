import { useNavigate } from "react-router-dom"

export default function ArchiveCard({target, onUnarchive}) {
    const navigate = useNavigate()
    
    return (
        <div className="relative flex flex-col bg-gradient-to-t from-gray-400 to-gray-100 rounded-xs h-36 p-3 border">
            <h2 className="text-xl font-semibold text-black">{target.name}</h2>
            <h4 className="text-gray-800">{target.date.replace("T", " ")}</h4>
            <div className="absolute bottom-0 left-0 flex justify-between bg-gradient-to-b border-t border-black font-semibold p-2 w-full from-gray-300 to-gray-400">
                <button className="cursor-pointer" onClick={() => navigate(`/start/${target._id}`)}>Peržiūrėti</button>
                <button className="cursor-pointer" onClick={() => onUnarchive(target)}>Sugražinti</button>
            </div>
        </div>
    )
}