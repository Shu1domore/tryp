import { useState } from "react"

export default function Section({ title, icon, defaultOpen = true, badge, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          {badge && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
              {badge}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  )
}
