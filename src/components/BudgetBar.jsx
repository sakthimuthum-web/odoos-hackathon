export default function BudgetBar({ label, value, max }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span>₹{value}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div className="h-2 bg-blue-500 rounded" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
