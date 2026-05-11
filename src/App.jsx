import { useState } from "react"
import TripForm from "./components/TripForm"
import Results from "./components/Results"
import { destinations, cityCoordinates } from "./data/destinations"
import visaData from "./data/visa.json"
import { fetchWeather } from "./utils/weather"
import { generatePackingList } from "./utils/packing"

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(formData) {
    setLoading(true)
    setError(null)
    try {
      const { countryCode, city, startDate, endDate, hasLaundry, useDisposableUnderwear, bringLaptop, bringCamera } = formData
      const start = new Date(startDate)
      const end = new Date(endDate)
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

      if (days <= 0) {
        setError("返回日期必须晚于出发日期")
        setLoading(false)
        return
      }

      const coords = cityCoordinates[city]
      if (!coords) {
        setError("未找到该城市的坐标数据")
        setLoading(false)
        return
      }

      const weather = await fetchWeather(coords.lat, coords.lon, startDate, endDate)
      const avgTemp = weather.temperature_2m_max.reduce((a, b) => a + b, 0) / weather.temperature_2m_max.length

      const packingList = generatePackingList(days, avgTemp, { hasLaundry, useDisposableUnderwear, bringLaptop, bringCamera, countryCode })
      const visa = visaData[countryCode]
      const dest = destinations.find((d) => d.code === countryCode)

      setResult({
        countryCode,
        country: dest.country,
        city,
        days,
        startDate,
        endDate,
        weather,
        avgTemp,
        visa,
        packingList,
      })
    } catch (err) {
      setError(err.message || "发生错误，请重试")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <img src="/logo.svg" alt="Tryp" className="w-9 h-9" />
          <div>
            <h1 className="text-xl font-bold text-cyan-700 dark:text-cyan-400 leading-tight">Tryp</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">智能旅行打包助手</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <TripForm onSubmit={handleSubmit} loading={loading} />

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 animate-fade-in">
            {error}
          </div>
        )}

        {result && <Results data={result} />}
      </main>
    </div>
  )
}

export default App
