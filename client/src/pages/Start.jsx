import axios from "axios"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import AttendanceCard from "../components/AttendanceCard"

export default function Start() {
  const { id } = useParams()
  const [awaiting, setAwaiting] = useState(null)

  useEffect(() => {
    async function fetchParticipants() {
      const response = await axios.get("http://localhost:5000/fetchEvent", { params: { id } })
      setAwaiting(response.data.participants)
    }
    fetchParticipants()
  }, [id])

  if (!awaiting) return

  return (
    <div className="flex pt-50 justify-center gap-24 h-screen bg-gray-200">
        <div className="flex flex-col gap-2 w-1/4">
            <h3 className="text-2xl mb-2.5 font-bold">Laukiama</h3>
            {awaiting.map(el => (
                <div key={el}><AttendanceCard name={el} /></div>
            ))}
        </div>
        <div className="flex flex-col gap-2 w-1/4">
            <h3 className="text-2xl mb-2.5 font-bold">Laukiama</h3>
            {awaiting.map(el => (
                <div key={el}><AttendanceCard name={el} /></div>
            ))}
        </div>
    </div>
  )
}
