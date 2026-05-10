import { useState, useMemo } from "react"
import { destinations } from "../data/destinations"

export default function TripForm({ onSubmit, loading }) {
  const [countryCode, setCountryCode] = useState("")
  const [city, setCity] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [hasLaundry, setHasLaundry] = useState(false)
  const [useDisposableUnderwear, setUseDisposableUnderwear] = useState(false)

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
    onSubmit({ countryCode, city, startDate, endDate, hasLaundry, useDisposableUnderwear })
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
      <h2 className="text-lg font-semibold text-gray-800">行程信息</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">目的地国家</label>
          <select
            value={countryCode}
            onChange={handleCountryChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none"
          >
            <option value="">选择国家</option>
            {destinations.map((d) => (
              <option key={d.code} value={d.code}>{d.country}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">城市</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            disabled={!countryCode}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none disabled:bg-gray-100"
          >
            <option value="">选择城市</option>
            {selectedCountry?.cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">出发日期</label>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">返回日期</label>
          <input
            type="date"
            value={endDate}
            min={startDate || today}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {days && (
        <p className="text-sm text-indigo-600 font-medium">
          共 {days} 天
        </p>
      )}

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={hasLaundry}
            onChange={(e) => setHasLaundry(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
          />
          酒店有洗衣机
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={useDisposableUnderwear}
            onChange={(e) => setUseDisposableUnderwear(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
          />
          带一次性内裤
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
      >
        {loading ? "生成中..." : "生成打包清单"}
      </button>
    </form>
  )
}
