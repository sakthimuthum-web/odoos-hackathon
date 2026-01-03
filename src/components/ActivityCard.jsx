export default function ActivityCard({ activity, onAdd }) {
  return (
    <div className="border rounded p-3 bg-white flex items-center justify-between">
      <div>
        <div className="font-medium">{activity.title}</div>
        <div className="text-xs text-gray-600">
          {activity.type} • Cost ₹{activity.cost} • {activity.duration}h
        </div>
      </div>
      {onAdd && (
        <button
          className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
          onClick={() => onAdd(activity)}
        >
          Add
        </button>
      )}
    </div>
  )
}
