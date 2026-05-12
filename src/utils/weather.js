function shiftYear(dateStr, delta) {
  const d = new Date(dateStr)
  d.setFullYear(d.getFullYear() + delta)
  return d.toISOString().split("T")[0]
}

async function safeFetch(url) {
  let res
  try {
    res = await fetch(url)
  } catch {
    throw new Error("网络连接失败，请检查网络后重试")
  }
  return res
}

export async function fetchWeather(lat, lon, startDate, endDate) {
  const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&start_date=${startDate}&end_date=${endDate}&timezone=auto`
  const res = await safeFetch(forecastUrl)

  if (res.ok) {
    const data = await res.json()
    if (data.daily) return { ...data.daily, isHistorical: false }
  }

  const body = await res.json().catch(() => null)
  const outOfRange = body?.reason?.includes("out of allowed range")

  if (!outOfRange) throw new Error("天气数据获取失败，请稍后重试")

  const archiveUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&start_date=${shiftYear(startDate, -1)}&end_date=${shiftYear(endDate, -1)}&timezone=auto`
  const archiveRes = await safeFetch(archiveUrl)

  if (!archiveRes.ok) throw new Error("历史天气数据获取失败，请稍后重试")

  const archiveData = await archiveRes.json()
  if (!archiveData.daily) throw new Error("天气数据格式异常")

  const daily = archiveData.daily
  daily.time = daily.time.map((t) => shiftYear(t, 1))

  return { ...daily, isHistorical: true }
}

export function weatherCodeToLabel(code) {
  if (code === 0) return "晴"
  if (code <= 3) return "多云"
  if (code <= 48) return "雾"
  if (code <= 57) return "毛毛雨"
  if (code <= 67) return "雨"
  if (code <= 77) return "雪"
  if (code <= 82) return "阵雨"
  if (code <= 86) return "阵雪"
  if (code >= 95) return "雷暴"
  return "未知"
}

export function weatherCodeToEmoji(code) {
  if (code === 0) return "☀️"
  if (code <= 3) return "⛅"
  if (code <= 48) return "🌫️"
  if (code <= 57) return "🌦️"
  if (code <= 67) return "🌧️"
  if (code <= 77) return "🌨️"
  if (code <= 82) return "🌧️"
  if (code <= 86) return "🌨️"
  if (code >= 95) return "⛈️"
  return "❓"
}

export function classifyClimate(avgTemp) {
  if (avgTemp >= 28) return "hot"
  if (avgTemp >= 20) return "warm"
  if (avgTemp >= 10) return "cool"
  return "cold"
}
