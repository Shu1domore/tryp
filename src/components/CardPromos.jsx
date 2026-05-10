import { cardPromos, cardColors } from "../data/card-promos"

export default function CardPromos({ countryCode, country, city }) {
  const promos = cardPromos[countryCode]
  if (!promos || promos.length === 0) return null

  const sorted = [...promos].sort((a, b) => (a.tier === "strong" ? -1 : 1) - (b.tier === "strong" ? -1 : 1))

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        以下为{country}·{city}常见信用卡优惠，建议出行前确认最新活动
      </p>
      {sorted.map((promo) => {
        const colors = cardColors[promo.card] || { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700", badge: "bg-gray-100 text-gray-800" }
        return (
          <div key={promo.title} className={`p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.badge}`}>
                {promo.card}
              </span>
              {promo.tier === "strong" && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                  推荐
                </span>
              )}
              <span className={`text-sm font-medium ${colors.text}`}>{promo.title}</span>
            </div>
            <p className="text-sm text-gray-600 ml-1">{promo.desc}</p>
          </div>
        )
      })}
      <p className="text-xs text-gray-400 mt-2">
        * 优惠信息可能变动，请出发前查询各发卡机构官网确认
      </p>
    </div>
  )
}
