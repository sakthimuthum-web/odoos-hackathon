import { useParams } from "react-router-dom"
import { useTrips } from "../store/TripContext.jsx"
import BudgetBar from "../components/BudgetBar.jsx"
import { useState } from "react"

export default function Budget() {
  const { tripId } = useParams()
  const { state, dispatch } = useTrips()
  const trip = state.trips.find(t => t.id === tripId)
  const [budget, setBudget] = useState(trip?.budget || { transport:0, stay:0, activities:0, meals:0 })
  const total = budget.transport + budget.stay + budget.activities + budget.meals
  const max = Math.max(1, total)

  function save() {
    dispatch({ type: "UPDATE_BUDGET", payload: { tripId, budget } })
  }

  if (!trip) return <div>Trip not found</div>

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Trip budget</h1>
      <div className="bg-white border rounded p-4">
        {["transport","stay","activities","meals"].map(k => (
          <div key={k} className="mb-3">
            <label className="text-sm font-medium capitalize">{k}</label>
            <input type="number" className="w-full border rounded px-3 py-2"
              value={budget[k]} onChange={e => setBudget({ ...budget, [k]: Number(e.target.value) })} />
          </div>
        ))}
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={save}>Save</button>
      </div>

      <div className="bg-white border rounded p-4 mt-4">
        <h2 className="font-semibold mb-2">Cost breakdown</h2>
        <BudgetBar label="Transport" value={budget.transport} max={max} />
        <BudgetBar label="Stay" value={budget.stay} max={max} />
        <BudgetBar label="Activities" value={budget.activities} max={max} />
        <BudgetBar label="Meals" value={budget.meals} max={max} />
        <div className="mt-2 text-sm">Total: ₹{total} • Avg/day estimate shown per itinerary in future</div>
      </div>
    </div>
  )
}