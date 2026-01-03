import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTrips } from "../store/TripContext.jsx"

export default function CreateTrip() {
  const navigate = useNavigate()
  const { dispatch } = useTrips()
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [coverUrl, setCoverUrl] = useState("")

  function handleSave(e) {
    e.preventDefault()
    const newTrip = {
      id: "t" + Math.random().toString(36).slice(2, 8),
      name, startDate, endDate, description, coverUrl,
      stops: [], budget: { transport: 0, stay: 0, activities: 0, meals: 0 }
    }
    dispatch({ type: "ADD_TRIP", payload: newTrip })
    navigate(`/trips/${newTrip.id}/build`)
  }

  return (
    <form onSubmit={handleSave} className="bg-white border rounded p-6 max-w-2xl">
      <h1 className="text-xl font-semibold mb-4">Create trip</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Trip name</label>
          <input className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm font-medium">Cover photo URL (optional)</label>
          <input className="w-full border rounded px-3 py-2" value={coverUrl} onChange={e => setCoverUrl(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Start date</label>
          <input type="date" className="w-full border rounded px-3 py-2" value={startDate} onChange={e => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm font-medium">End date</label>
          <input type="date" className="w-full border rounded px-3 py-2" value={endDate} onChange={e => setEndDate(e.target.value)} required />
        </div>
      </div>
      <div className="mt-4">
        <label className="text-sm font-medium">Description</label>
        <textarea className="w-full border rounded px-3 py-2" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Save & Build Itinerary</button>
      </div>
    </form>
  )
}