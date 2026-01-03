import { useParams } from "react-router-dom"
import { useTrips } from "../store/TripContext.jsx"

export default function SharedItinerary() {
  const { publicId } = useParams()
  const { state } = useTrips()
  // Demo: map publicId to first trip
  const trip = state.trips[0]

  function copyTrip() {
    navigator.clipboard.writeText(JSON.stringify(trip, null, 2))
    alert("Trip copied to clipboard (demo).")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border rounded p-4">
        <h1 className="text-2xl font-semibold">Shared itinerary (read-only)</h1>
        <div className="text-xs text-gray-600">Public ID: {publicId}</div>
        <div className="mt-4">
          <div className="font-semibold">{trip.name}</div>
          <div className="text-sm">{trip.startDate} → {trip.endDate}</div>
          <div className="mt-2 grid md:grid-cols-2 gap-3">
            {trip.stops.map(s => (
              <div key={s.id} className="border rounded p-3">
                <div className="font-medium">{s.city}</div>
                <ul className="text-xs mt-1">
                  {s.activities.map(a => <li key={a.id}>• {a.title} ({a.time})</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button className="px-3 py-1 bg-gray-100 rounded" onClick={() => alert("Share to social (demo)")}>Share</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={copyTrip}>Copy Trip</button>
          </div>
        </div>
      </div>
    </div>
  )
}