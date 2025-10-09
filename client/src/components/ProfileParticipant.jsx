import { FaEnvelope, FaTimes, FaUser } from "react-icons/fa";

export default function ProfileParticipant({name, surname, email, onRemove}) {
    return (
        <div className="relative flex bg-gradient-to-b from-gray-300 to-gray-400 pl-2 gap-2 border h-13">
            <div>
                <div className="flex gap-4 items-center">
                    <FaUser />
                    {name} {surname}
                </div>
                <div className="flex gap-4 items-center">
                    <FaEnvelope /> {email}
                </div>
            </div>
            <button type="button" className="absolute right-0 bg-gradient-to-b from-red-400 to-red-600 text-white p-1 cursor-pointer h-full border-l border-black" onClick={() => onRemove(name)}><FaTimes className="text-white" /></button>
        </div>
    )
}