import { useParams } from "react-router-dom"
import { useTrips } from "../store/TripContext.jsx"
import { useState } from "react"

export default function CitySearch() {
  const { tripId } = useParams()
  const { state, dispatch } = useTrips()
  const [query, setQuery] = useState("")
  const [country, setCountry] = useState("")
  const trip = state.trips.find(t => t.id === tripId)

  const filtered = state.cities.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) &&
    (country ? c.country.toLowerCase().includes(country.toLowerCase()) : true)
  )

  function addCity(c) {
    const stop = {
      id: "s" + Math.random().toString(36).slice(2, 8),
      city: c.name, country: c.country, startDate: trip.startDate, endDate: trip.endDate, activities: []
    }
    dispatch({ type: "ADD_STOP", payload: { tripId, stop } })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Find cities</h1>
      <div className="grid md:grid-cols-3 gap-3">
        <input className="border rounded px-3 py-2" placeholder="Search city..." value={query} onChange={e => setQuery(e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Filter by country..." value={country} onChange={e => setCountry(e.target.value)} />
        <div className="text-sm text-gray-600 flex items-center">Results: {filtered.length}</div>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {filtered.map(c => (
          <div key={c.id} className="bg-white border rounded p-3">
            <div className="font-medium">{c.name}</div>
            <div className="text-xs text-gray-600">{c.country}</div>
            <div className="text-xs mt-1">Cost idx: {c.costIndex} • Popularity: {c.popularity}</div>
            <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded" onClick={() => addCity(c)}>Add to Trip</button>
          </div>
        ))}
      </div>
    </div>
  )
}