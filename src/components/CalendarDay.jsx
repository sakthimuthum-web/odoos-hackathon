export default function CalendarDay({ date, items = [], onMoveUp, onMoveDown }) {
  return (
    <div className="border rounded p-3 bg-white">
      <div className="font-semibold mb-2">{date}</div>
      <ul className="space-y-2">
        {items.map((it, idx) => (
          <li key={it.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{it.title}</div>
              <div className="text-xs text-gray-600">{it.time} • ₹{it.cost} • {it.duration}h</div>
            </div>
            <div className="flex gap-1">
              <button className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={() => onMoveUp(idx)}>↑</button>
              <button className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={() => onMoveDown(idx)}>↓</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
