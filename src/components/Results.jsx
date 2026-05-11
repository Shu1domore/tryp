import Section from "./Section"
import WeatherCard from "./WeatherCard"
import PackingList from "./PackingList"
import CardPromos from "./CardPromos"
import CashBudget from "./CashBudget"
import { categoryLabels } from "../utils/packing"

export default function Results({ data }) {
  const { country, city, days, weather, avgTemp, visa, packingList, countryCode } = data

  const totalItems = [
    ...packingList.clothing,
    ...packingList.documents,
    ...packingList.electronics,
    ...packingList.toiletries,
    ...packingList.optional,
  ].length

  return (
    <div className="mt-8 space-y-4 animate-fade-in">
      {/* Trip summary */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
          {country} · {city}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {data.startDate} → {data.endDate}（{days} 天）· 共 {totalItems} 件物品
        </p>
      </div>

      {/* Destination warnings */}
      {packingList.warnings?.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 animate-fade-in">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">⚠️ 目的地注意事项</p>
          <ul className="space-y-1">
            {packingList.warnings.map((w, i) => (
              <li key={i} className="text-sm text-amber-700 dark:text-amber-400 flex gap-2">
                <span className="flex-shrink-0">·</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Priority order: documents > visa > weather > clothing > electronics > toiletries > cash > cards > optional */}

      <Section title={categoryLabels.documents} icon="📄" defaultOpen={true} badge={`${packingList.documents.length}件`}>
        <PackingList title={categoryLabels.documents} items={packingList.documents} />
      </Section>

      {visa && (
        <Section title="签证信息" icon="🛂" defaultOpen={true}>
          <p className="text-sm text-gray-700 dark:text-gray-300">{visa.policy}</p>
          {visa.visaFree && (
            <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-full">
              免签
            </span>
          )}
        </Section>
      )}

      <Section title="天气预报" icon="🌤️" defaultOpen={true} badge={`均温${avgTemp.toFixed(0)}°C`}>
        <WeatherCard weather={weather} avgTemp={avgTemp} />
      </Section>

      <Section title={categoryLabels.clothing} icon="👕" defaultOpen={true} badge={`${packingList.clothing.length}件`}>
        <PackingList title={categoryLabels.clothing} items={packingList.clothing} />
      </Section>

      <Section title={categoryLabels.electronics} icon="🔌" defaultOpen={true} badge={`${packingList.electronics.length}件`}>
        <PackingList title={categoryLabels.electronics} items={packingList.electronics} />
      </Section>

      <Section title={categoryLabels.toiletries} icon="🧴" defaultOpen={true} badge={`${packingList.toiletries.length}件`}>
        <PackingList title={categoryLabels.toiletries} items={packingList.toiletries} />
      </Section>

      <Section title="现金预算" icon="💰" defaultOpen={true} badge="带多少钱">
        <CashBudget city={city} days={days} />
      </Section>

      <Section title="信用卡优惠" icon="💳" defaultOpen={true} badge="带对卡省更多">
        <CardPromos countryCode={countryCode} country={country} city={city} />
      </Section>

      <Section title={categoryLabels.optional} icon="🎒" defaultOpen={true} badge={`${packingList.optional.length}件`}>
        <PackingList title={categoryLabels.optional} items={packingList.optional} />
      </Section>
    </div>
  )
}
