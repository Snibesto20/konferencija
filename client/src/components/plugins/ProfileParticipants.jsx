import { useState, useRef } from "react"
import { FaUserFriends, FaPlus, FaTimes } from "react-icons/fa"
import ProfileParticipant from "../ProfileParticipant"

export default function ProfileParticipants({ visible, onRemove, onUpdate, initial }) {
    const [value, setValue] = useState(initial || [])
    const name = useRef("")
    const surname = useRef("")
    const email = useRef("")

    console.log(value);
    
    function addParticipant() {
        const newValue = [...value, {name: name.current.value, surname: surname.current.value, email: email.current.value}]
        setValue(newValue)
        onUpdate(newValue, 4)
    }

    function removeParticipant(name) {
        const newValue = value.filter(el => el.name !== name)
        console.log(newValue);
        
        setValue(newValue)
        onUpdate(newValue, 4)
    }

    return (
        <div className={`relative flex-col ${visible ? "flex" : "hidden"} border border-[#382211] p-4 gap-2`}>
            <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 border border-[#382211] p-1.5">
                        <FaUserFriends className="w-full h-full text-[#382211]" />
                    </div>
                    <span className="font-semibold text-[#382211]">Profilinis dalyvių sąrašas</span>
                </div>
                <div className="w-8 h-8 border bg-gradient-to-b from-red-400 to-red-600 p-1.5 cursor-pointer" onClick={() => onRemove(4)}>
                    <FaTimes className="w-full h-full text-white" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-4 w-full">
                    <div>
                        <span className="text-[#382211]">Vardas:</span>
                        <input type="text" ref={name} className="border border-[#382211] outline-0 px-2 py-1 w-full" />
                    </div>
                    <div>
                        <span className="text-[#382211]">Pavardė:</span>
                        <input type="text" ref={surname} className="border border-[#382211] outline-0 px-2 py-1 w-full" />
                    </div>
                    <div>
                        <span className="text-[#382211]">E-paštas:</span>
                        <input type="text" ref={email} className="border border-[#382211] outline-0 px-2 py-1 w-full" />
                    </div>
                </div>
                <button type="button" className="flex justify-center bg-gradient-to-b from-[#6e533f] to-[#382211] p-1.5 cursor-pointer border border-[#382211]" onClick={addParticipant}><FaPlus className="text-white" /></button>
            </div>
            <div className={`flex-col gap-2 w-full break-all ${value.length === 0 ? "hidden" : "flex"} ${value.length === 1 ? "h-13" : value.length === 2 ? "h-28" : "overflow-y-scroll h-28"}`}>{value.map((el, i) => <ProfileParticipant key={i} name={el.name} surname={el.surname} email={el.email} onRemove={removeParticipant} />)}</div>
        </div>
    )
}