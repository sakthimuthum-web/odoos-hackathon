import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useTrips } from "../store/TripContext.jsx"
import TripCard from "../components/TripCard.jsx"
import { fetchPopularCities } from "../store/mockApi.js"

export default function Dashboard() {
  const { state, dispatch } = useTrips()
  const [popular, setPopular] = useState([])

  useEffect(() => {
    fetchPopularCities().then(setPopular)
  }, [])

  function handleDelete(id) {
    dispatch({ type: "DELETE_TRIP", payload: id })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Welcome, {state.user?.name}</h1>
        <Link to="/trips/new" className="px-4 py-2 bg-blue-600 text-white rounded">Plan New Trip</Link>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Upcoming trips</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {state.trips.map(t => <TripCard key={t.id} trip={t} onDelete={handleDelete} />)}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Popular destinations</h2>
        <div className="grid md:grid-cols-4 gap-3">
          {popular.map(c => (
            <div key={c.id} className="bg-white border rounded p-3">
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-gray-600">{c.country}</div>
              <div className="text-xs mt-1">Cost idx: {c.costIndex} • Popularity: {c.popularity}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}