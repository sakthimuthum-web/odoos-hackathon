import { useParams } from "react-router-dom"
import { useTrips } from "../store/TripContext.jsx"
import CalendarDay from "../components/CalendarDay.jsx"

export default function CalendarTimeline() {
  const { tripId } = useParams()
  const { state, dispatch } = useTrips()
  const trip = state.trips.find(t => t.id === tripId)

  if (!trip) return <div>Trip not found</div>

  function reorderInStop(stop, from, to) {
    const activities = [...stop.activities]
    if (to < 0 || to >= activities.length) return
    const [removed] = activities.splice(from, 1)
    activities.splice(to, 0, removed)
    dispatch({ type: "ADD_ACTIVITY", payload: { tripId, stopId: stop.id, activity: removed } }) // noop pattern
    // in real app, create action for reorder; here we reassign:
    const newStops = trip.stops.map(s => s.id === stop.id ? { ...s, activities } : s)
    dispatch({ type: "REORDER_STOPS", payload: { tripId, stops: newStops } })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Timeline</h1>
      {trip.stops.map(stop => (
        <div key={stop.id} className="space-y-2">
          <div className="text-lg font-semibold">{stop.city} ({stop.startDate} → {stop.endDate})</div>
          <CalendarDay
            date={`${stop.city}`}
            items={stop.activities}
            onMoveUp={(idx) => reorderInStop(stop, idx, idx-1)}
            onMoveDown={(idx) => reorderInStop(stop, idx, idx+1)}
          />
        </div>
      ))}
    </div>
  )
}