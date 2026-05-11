import { useState } from "react"

export default function PackingList({ title, items }) {
  const [checked, setChecked] = useState(() => items.map(() => false))
  const [lastToggled, setLastToggled] = useState(null)

  function toggle(idx) {
    setChecked((prev) => prev.map((v, i) => (i === idx ? !v : v)))
    setLastToggled(idx)
  }

  const checkedCount = checked.filter(Boolean).length
  const total = items.length
  const allDone = checkedCount === total

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h4>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full transition-colors ${allDone ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
          {checkedCount}/{total}
        </span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-3">
        <div
          className={`h-1.5 rounded-full transition-all duration-300 ${allDone ? "bg-green-500" : "bg-indigo-500"}`}
          style={{ width: `${(checkedCount / total) * 100}%` }}
        />
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={item.name}
            onClick={() => toggle(i)}
            className={`flex items-center gap-3 text-sm p-2 rounded-lg cursor-pointer transition-colors ${checked[i] ? "bg-green-50 dark:bg-green-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"}`}
          >
            <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all duration-150 ${checked[i] ? "bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600" : "border-gray-300 dark:border-gray-500"} ${checked[i] && lastToggled === i ? "animate-check-pop" : ""}`}>
              {checked[i] && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`flex-1 transition-colors ${checked[i] ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-700 dark:text-gray-200"}`}>
              {item.name}
              {item.count > 1 && <span className="text-gray-400 dark:text-gray-500 ml-1">×{item.count}</span>}
              {item.note && <span className="text-gray-400 dark:text-gray-500 ml-1">({item.note})</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
