import { classifyClimate } from "./weather"
import { destinationTips } from "../data/destination-tips"

export function generatePackingList(days, avgTemp, { hasLaundry, useDisposableUnderwear, bringLaptop, bringCamera, countryCode }) {
  const climate = classifyClimate(avgTemp)
  const factor = hasLaundry ? 0.5 : 1
  const tips = destinationTips[countryCode]

  const tops = Math.ceil(days * factor)
  const underwear = useDisposableUnderwear ? 0 : Math.ceil((days + 1) * factor)
  const socks = Math.ceil(days * factor)
  const pants = Math.ceil((days / 3) * factor)

  const clothing = [
    { name: "上衣/T恤", count: tops, category: "clothing" },
    { name: "内裤", count: underwear, category: "clothing", note: useDisposableUnderwear ? "已选一次性内裤" : null },
    { name: "袜子", count: socks, category: "clothing" },
    { name: "裤子/裙子", count: pants, category: "clothing" },
    { name: "睡衣", count: 1, category: "clothing" },
  ]

  if (climate === "cold") {
    clothing.push(
      { name: "厚外套/羽绒服", count: 1, category: "clothing" },
      { name: "围巾", count: 1, category: "clothing" },
      { name: "手套", count: 1, category: "clothing" },
      { name: "保暖内衣", count: Math.ceil(days * factor * 0.5), category: "clothing" },
    )
  } else if (climate === "cool") {
    clothing.push(
      { name: "薄外套/卫衣", count: 1, category: "clothing" },
      { name: "长袖衫", count: Math.ceil(days * factor * 0.3), category: "clothing" },
    )
  } else if (climate === "hot") {
    clothing.push(
      { name: "短裤", count: Math.ceil(days * factor * 0.5), category: "clothing" },
      { name: "泳衣", count: 1, category: "clothing" },
    )
  }

  if (useDisposableUnderwear) {
    clothing.push({ name: "一次性内裤", count: days + 1, category: "clothing" })
  }

  const documents = [
    { name: "护照", count: 1, category: "documents" },
    { name: "身份证", count: 1, category: "documents" },
    { name: "签证材料", count: 1, category: "documents" },
    { name: "机票/酒店确认单", count: 1, category: "documents" },
    { name: "护照复印件（备用）", count: 1, category: "documents" },
  ]

  const plugNote = tips?.plugType ? `（${tips.plugType}）` : ""
  const electronics = [
    { name: "手机", count: 1, category: "electronics" },
    { name: "充电器", count: 1, category: "electronics" },
    { name: "充电宝", count: 1, category: "electronics" },
    { name: `转换插头${plugNote}`, count: 1, category: "electronics" },
    { name: "耳机", count: 1, category: "electronics" },
  ]

  if (bringLaptop) {
    electronics.push(
      { name: "笔记本电脑", count: 1, category: "electronics" },
      { name: "电脑充电器", count: 1, category: "electronics" },
    )
  }
  if (bringCamera) {
    electronics.push(
      { name: "相机", count: 1, category: "electronics" },
      { name: "相机电池/充电器", count: 1, category: "electronics" },
      { name: "存储卡", count: 1, category: "electronics" },
    )
  }

  const toiletries = [
    { name: "牙刷牙膏", count: 1, category: "toiletries" },
    { name: "洗面奶", count: 1, category: "toiletries" },
    { name: "防晒霜", count: 1, category: "toiletries" },
    { name: "护肤品", count: 1, category: "toiletries" },
  ]

  if (climate === "hot" || climate === "warm") {
    toiletries.push(
      { name: "驱蚊液", count: 1, category: "toiletries" },
      { name: "晒后修复", count: 1, category: "toiletries" },
    )
  }

  const optional = [
    { name: "雨伞/雨衣", count: 1, category: "optional" },
    { name: "颈枕", count: 1, category: "optional" },
    { name: "眼罩耳塞", count: 1, category: "optional" },
    { name: "药品（感冒/肠胃/创可贴）", count: 1, category: "optional" },
    { name: "零食", count: 1, category: "optional" },
    { name: "书/Kindle", count: 1, category: "optional" },
    { name: "运动装备", count: 1, category: "optional" },
  ]

  // Add destination-specific items
  if (tips?.extraItems) {
    for (const item of tips.extraItems) {
      const list = { clothing, documents, electronics, toiletries, optional }[item.category]
      if (!list) continue
      const existing = list.find((i) => i.name.includes(item.name.split("（")[0]))
      if (item.override && existing) {
        existing.name = item.name
      } else if (!existing) {
        list.push({ name: item.name, count: 1, category: item.category })
      }
    }
  }

  const warnings = tips?.warnings || []

  return { clothing, documents, electronics, toiletries, optional, warnings }
}

export const categoryLabels = {
  clothing: "衣物",
  documents: "证件",
  electronics: "电子设备",
  toiletries: "洗护用品",
  optional: "可选物品",
}
