import { useParams } from "react-router-dom"
import { useTrips } from "../store/TripContext.jsx"

export default function ItineraryView() {
  const { tripId } = useParams()
  const { state } = useTrips()
  const trip = state.trips.find(t => t.id === tripId)
  const [mode, setMode] = useState("list")

  if (!trip) return <div>Trip not found</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Itinerary: {trip.name}</h1>
        <div className="flex gap-2">
          <button className={`px-3 py-1 rounded ${mode==="list"?"bg-blue-600 text-white":"bg-gray-100"}`} onClick={()=>setMode("list")}>List</button>
          <button className={`px-3 py-1 rounded ${mode==="calendar"?"bg-blue-600 text-white":"bg-gray-100"}`} onClick={()=>setMode("calendar")}>Calendar</button>
        </div>
      </div>

      {trip.stops.map(stop => (
        <div key={stop.id} className="bg-white border rounded p-4">
          <div className="font-semibold">{stop.city} • {stop.startDate} → {stop.endDate}</div>
          <div className="grid md:grid-cols-2 gap-3 mt-3">
            {stop.activities.map(a => (
              <div key={a.id} className="border rounded p-3">
                <div className="font-medium">{a.title}</div>
                <div className="text-xs text-gray-600">{a.time} • ₹{a.cost} • {a.duration}h</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}