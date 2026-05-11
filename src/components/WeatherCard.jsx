import { weatherCodeToEmoji } from "../utils/weather"

export default function WeatherCard({ weather, avgTemp }) {
  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        平均气温 <span className="font-medium text-gray-800 dark:text-gray-100">{avgTemp.toFixed(1)}°C</span>
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
        {weather.time.map((date, i) => (
          <div key={date} className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 transition-colors">
            <p className="text-xs text-gray-500 dark:text-gray-400">{date.slice(5)}</p>
            <p className="text-xl my-1">{weatherCodeToEmoji(weather.weathercode[i])}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {Math.round(weather.temperature_2m_min[i])}~{Math.round(weather.temperature_2m_max[i])}°
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
