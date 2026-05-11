import { dailyBudget } from "../data/cash-budget"

export default function CashBudget({ city, days }) {
  const budget = dailyBudget[city]
  if (!budget) return <p className="text-sm text-gray-500 dark:text-gray-400">暂无该城市的现金预算数据</p>

  const lowTotal = budget.low * days
  const midTotal = budget.mid * days
  const highTotal = budget.high * days

  function formatCNY(amount) {
    if (amount >= 10000) return `${(amount / 10000).toFixed(1)}万`
    return amount.toLocaleString()
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        以下为 <span className="font-medium text-gray-700 dark:text-gray-200">{city}</span> {days}天的每日花费估算（人均，不含机票酒店），帮你判断需要带多少现金
      </p>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="text-center p-2 sm:p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <p className="text-xs text-green-600 dark:text-green-400 mb-1">省钱模式</p>
          <p className="text-base sm:text-lg font-bold text-green-700 dark:text-green-300">¥{formatCNY(lowTotal)}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">≈¥{budget.low}/天</p>
        </div>
        <div className="text-center p-2 sm:p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">舒适出行</p>
          <p className="text-base sm:text-lg font-bold text-blue-700 dark:text-blue-300">¥{formatCNY(midTotal)}</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">≈¥{budget.mid}/天</p>
        </div>
        <div className="text-center p-2 sm:p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
          <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">品质享受</p>
          <p className="text-base sm:text-lg font-bold text-purple-700 dark:text-purple-300">¥{formatCNY(highTotal)}</p>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">≈¥{budget.high}/天</p>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <div className="flex gap-2">
          <span className="text-amber-600 flex-shrink-0">💡</span>
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
              当地货币：{budget.localName}（{budget.currency}）
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-400">{budget.exchangeTip}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">建议携带现金（一次性带齐）</p>
        <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
          ¥{formatCNY(Math.round(midTotal * 0.6))} ~ ¥{formatCNY(Math.round(highTotal * 0.7))}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          按舒适~品质档60-70%估算（剩余可刷卡/移动支付）
        </p>
      </div>
    </div>
  )
}
