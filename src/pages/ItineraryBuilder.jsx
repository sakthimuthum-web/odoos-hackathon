import { useParams } from "react-router-dom"
import { useTrips } from "../store/TripContext.jsx"
import { useState } from "react"

export default function ItineraryBuilder() {
  const { tripId } = useParams()
  const { state, dispatch } = useTrips()
  const trip = state.trips.find(t => t.id === tripId)
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  if (!trip) return <div>Trip not found</div>

  function addStop() {
    const stop = {
      id: "s" + Math.random().toString(36).slice(2, 8),
      city, country, startDate, endDate, activities: []
    }
    dispatch({ type: "ADD_STOP", payload: { tripId, stop } })
    setCity(""); setCountry(""); setStartDate(""); setEndDate("")
  }

  function moveStop(index, dir) {
    const stops = [...trip.stops]
    const newIndex = index + dir
    if (newIndex < 0 || newIndex >= stops.length) return
    const [removed] = stops.splice(index, 1)
    stops.splice(newIndex, 0, removed)
    dispatch({ type: "REORDER_STOPS", payload: { tripId, stops } })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Build itinerary: {trip.name}</h1>

      <div className="bg-white border rounded p-4 grid md:grid-cols-5 gap-3">
        <input className="border rounded px-3 py-2" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
        <input type="date" className="border rounded px-3 py-2" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input type="date" className="border rounded px-3 py-2" value={endDate} onChange={e => setEndDate(e.target.value)} />
        <button className="bg-green-600 text-white rounded px-3 py-2" onClick={addStop}>Add Stop</button>
      </div>

      <div className="space-y-3">
        {trip.stops.map((s, idx) => (
          <div key={s.id} className="bg-white border rounded p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{s.city}, {s.country}</div>
                <div className="text-xs text-gray-600">{s.startDate} → {s.endDate}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={() => moveStop(idx, -1)}>↑</button>
                <button className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={() => moveStop(idx, 1)}>↓</button>
              </div>
            </div>
            <div className="text-sm text-gray-700 mt-2">Activities: {s.activities.length}</div>
          </div>
        ))}
      </div>
    </div>
  )
}