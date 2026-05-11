import { useState, useMemo } from "react"
import { destinations } from "../data/destinations"

const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-colors"
const dateClass = `${inputClass} max-w-full box-border text-sm sm:text-base`

function YesNo({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <div className="flex gap-1 bg-gray-200 dark:bg-gray-600 rounded-lg p-0.5">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${value ? "bg-cyan-600 text-white shadow-sm" : "text-gray-400 dark:text-gray-400 hover:text-gray-600"}`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${!value ? "bg-gray-500 dark:bg-gray-400 text-white shadow-sm" : "text-gray-400 dark:text-gray-400 hover:text-gray-600"}`}
        >
          No
        </button>
      </div>
    </div>
  )
}

export default function TripForm({ onSubmit, loading }) {
  const [countryCode, setCountryCode] = useState("")
  const [city, setCity] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [hasLaundry, setHasLaundry] = useState(false)
  const [useDisposableUnderwear, setUseDisposableUnderwear] = useState(false)
  const [bringLaptop, setBringLaptop] = useState(false)
  const [bringCamera, setBringCamera] = useState(false)

  const selectedCountry = useMemo(
    () => destinations.find((d) => d.code === countryCode),
    [countryCode],
  )

  const days = useMemo(() => {
    if (!startDate || !endDate) return null
    const d = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
    return d > 0 ? d : null
  }, [startDate, endDate])

  function handleCountryChange(e) {
    setCountryCode(e.target.value)
    setCity("")
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ countryCode, city, startDate, endDate, hasLaundry, useDisposableUnderwear, bringLaptop, bringCamera })
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 space-y-5 overflow-hidden transition-colors">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">行程信息</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">目的地国家</label>
          <select value={countryCode} onChange={handleCountryChange} required className={inputClass}>
            <option value="">选择国家</option>
            {destinations.map((d) => (
              <option key={d.code} value={d.code}>{d.country}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">城市</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            disabled={!countryCode}
            className={`${inputClass} disabled:bg-gray-100 dark:disabled:bg-gray-600`}
          >
            <option value="">选择城市</option>
            {selectedCountry?.cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">出发日期</label>
          <input type="date" value={startDate} min={today} onChange={(e) => setStartDate(e.target.value)} required className={dateClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">返回日期</label>
          <input type="date" value={endDate} min={startDate || today} onChange={(e) => setEndDate(e.target.value)} required className={dateClass} />
        </div>
      </div>

      {days && (
        <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium animate-fade-in">
          共 {days} 天
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <YesNo label="想在酒店洗衣服吗？" value={hasLaundry} onChange={setHasLaundry} />
        <YesNo label="想带一次性内裤吗？" value={useDisposableUnderwear} onChange={setUseDisposableUnderwear} />
        <YesNo label="想带笔记本电脑吗？" value={bringLaptop} onChange={setBringLaptop} />
        <YesNo label="想带相机拍照吗？" value={bringCamera} onChange={setBringCamera} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 active:scale-[0.98] transition-all disabled:bg-cyan-300 dark:disabled:bg-cyan-800 disabled:cursor-not-allowed"
      >
        {loading ? "生成中..." : "生成打包清单"}
      </button>
    </form>
  )
}
