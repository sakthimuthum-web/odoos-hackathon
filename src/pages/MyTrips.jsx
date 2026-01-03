import TripCard from "../components/TripCard.jsx"
import { useTrips } from "../store/TripContext.jsx"

export default function MyTrips() {
  const { state, dispatch } = useTrips()
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Trips</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {state.trips.map(t => (
          <TripCard key={t.id} trip={t} onDelete={(id) => dispatch({ type: "DELETE_TRIP", payload: id })} />
        ))}
      </div>
    </div>
  )
}