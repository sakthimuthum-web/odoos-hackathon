import { useParams } from "react-router-dom"
import { useTrips } from "../store/TripContext.jsx"
import { useState } from "react"
import ActivityCard from "../components/ActivityCard.jsx"

export default function ActivitySearch() {
  const { tripId } = useParams()
  const { state, dispatch } = useTrips()
  const trip = state.trips.find(t => t.id === tripId)
  const [type, setType] = useState("")
  const [maxCost, setMaxCost] = useState(100)
  const [cityFilter, setCityFilter] = useState("")

  const filtered = state.activitiesCatalog.filter(a =>
    (type ? a.type === type : true) &&
    a.cost <= maxCost &&
    (cityFilter ? a.city.toLowerCase().includes(cityFilter.toLowerCase()) : true)
  )

  function addToFirstStop(activity) {
    if (!trip.stops.length) return
    const stopId = trip.stops[0].id
    const act = { id: "a" + Math.random().toString(36).slice(2, 8), ...activity, time: "10:00" }
    dispatch({ type: "ADD_ACTIVITY", payload: { tripId, stopId, activity: act } })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Find activities</h1>
      <div className="grid md:grid-cols-4 gap-3">
        <select className="border rounded px-3 py-2" value={type} onChange={e => setType(e.target.value)}>
          <option value="">All types</option>
          <option value="Sightseeing">Sightseeing</option>
          <option value="Culture">Culture</option>
          <option value="Leisure">Leisure</option>
        </select>
        <input type="number" className="border rounded px-3 py-2" value={maxCost} onChange={e => setMaxCost(Number(e.target.value))} />
        <input className="border rounded px-3 py-2" placeholder="City filter..." value={cityFilter} onChange={e => setCityFilter(e.target.value)} />
        <div className="text-sm text-gray-600 flex items-center">Results: {filtered.length}</div>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {filtered.map(a => <ActivityCard key={a.id} activity={a} onAdd={addToFirstStop} />)}
      </div>
    </div>
  )
}