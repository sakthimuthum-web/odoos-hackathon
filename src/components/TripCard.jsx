import { Link } from "react-router-dom"

export default function TripCard({ trip, onDelete }) {
  const dateRange = `${trip.startDate} → ${trip.endDate}`
  const destCount = trip.stops?.length || 0
  return (
    <div className="bg-white border rounded-lg p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{trip.name}</h3>
        <span className="text-xs text-gray-500">{dateRange}</span>
      </div>
      <p className="text-sm text-gray-700">{trip.description}</p>
      <div className="text-xs text-gray-600">Destinations: {destCount}</div>
      <div className="flex gap-2 mt-2">
        <Link to={`/trips/${trip.id}/view`} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">View</Link>
        <Link to={`/trips/${trip.id}/build`} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Edit</Link>
        <button onClick={() => onDelete(trip.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">Delete</button>
      </div>
    </div>
  )
}
