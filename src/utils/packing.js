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

  const lr = hasLaundry ? "，洗衣减半" : ""
  const clothing = [
    { name: "上衣/T恤", count: tops, category: "clothing", rule: `每天1件${lr}` },
    { name: "内裤", count: underwear, category: "clothing", rule: useDisposableUnderwear ? "已选一次性" : `天数+1${lr}` },
    { name: "袜子", count: socks, category: "clothing", rule: `每天1双${lr}` },
    { name: "裤子/裙子", count: pants, category: "clothing", rule: `每3天1条${lr}` },
    { name: "睡衣", count: 1, category: "clothing" },
  ]

  if (climate === "cold") {
    clothing.push(
      { name: "厚外套/羽绒服", count: 1, category: "clothing" },
      { name: "围巾", count: 1, category: "clothing" },
      { name: "手套", count: 1, category: "clothing" },
      { name: "保暖内衣", count: Math.ceil(days * factor * 0.5), category: "clothing", rule: "隔天换" },
    )
  } else if (climate === "cool") {
    clothing.push(
      { name: "薄外套/卫衣", count: 1, category: "clothing" },
      { name: "长袖衫", count: Math.ceil(days * factor * 0.3), category: "clothing" },
    )
  } else if (climate === "hot") {
    clothing.push(
      { name: "短裤", count: Math.ceil(days * factor * 0.5), category: "clothing", rule: "隔天换" },
      { name: "泳衣", count: 1, category: "clothing" },
    )
  }

  if (useDisposableUnderwear) {
    clothing.push({ name: "一次性内裤", count: days + 1, category: "clothing", rule: "天数+1" })
  }

  // Utility clothing items
  clothing.push({ name: "脏衣收纳袋", count: 1, category: "clothing", rule: "分隔干净/穿过的" })
  if (hasLaundry) {
    clothing.push({ name: "便携衣架", count: 2, category: "clothing", rule: "晾晒手洗衣物" })
  }

  const documents = [
    { name: "护照", count: 1, category: "documents" },
    { name: "身份证", count: 1, category: "documents" },
    { name: "签证材料", count: 1, category: "documents" },
    { name: "机票/酒店确认单", count: 1, category: "documents" },
    { name: "护照复印件", count: 1, category: "documents", rule: "纸质+手机各存一份" },
    { name: "证件照电子版", count: 1, category: "documents", rule: "存手机，补办备用" },
  ]

  // --- Electronics: smart cable & charger logic ---
  // Devices that need charging
  let chargingDevices = 1 // phone always
  if (bringLaptop) chargingDevices += 1
  if (bringCamera) chargingDevices += 1
  const ports = Math.max(2, chargingDevices) // charger needs at least 2 ports

  const plugNote = tips?.plugType ? `（${tips.plugType}）` : ""
  const electronics = [
    { name: "手机", count: 1, category: "electronics" },
    { name: "充电器", count: 1, category: "electronics", rule: `≥${ports}口，同时充${chargingDevices}台设备` },
    { name: "充电宝", count: 1, category: "electronics", rule: "≥10000mAh" },
    { name: "数据线（长，1.5m）", count: 1, category: "electronics", rule: "床头/桌面充电" },
    { name: "数据线（短，30cm）", count: 1, category: "electronics", rule: "配充电宝" },
    { name: "备用数据线", count: 1, category: "electronics", rule: "原装线，以防万一" },
    { name: `转换插头${plugNote}`, count: 1, category: "electronics" },
    { name: "耳机", count: 1, category: "electronics" },
    { name: "SIM卡针", count: 1, category: "electronics", rule: "换当地SIM卡" },
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
      { name: "相机电池", count: 2, category: "electronics", rule: "1块备用" },
      { name: "存储卡", count: 1, category: "electronics" },
    )
  }

  const toiletries = [
    { name: "牙刷牙膏", count: 1, category: "toiletries" },
    { name: "洗面奶", count: 1, category: "toiletries" },
    { name: "防晒霜", count: 1, category: "toiletries", rule: climate === "hot" ? "SPF50+" : "SPF30+" },
    { name: "护肤品", count: 1, category: "toiletries", rule: "分装瓶≤100ml" },
    { name: "密封袋", count: 2, category: "toiletries", rule: "液体登机必备" },
    { name: "纸巾/湿巾", count: 1, category: "toiletries" },
  ]

  if (climate === "hot" || climate === "warm") {
    toiletries.push(
      { name: "驱蚊液", count: 1, category: "toiletries" },
      { name: "晒后修复", count: 1, category: "toiletries" },
    )
  }
  if (climate === "cold") {
    toiletries.push(
      { name: "润唇膏", count: 1, category: "toiletries" },
      { name: "护手霜", count: 1, category: "toiletries" },
    )
  }

  const optional = [
    { name: "雨伞/雨衣", count: 1, category: "optional" },
    { name: "颈枕", count: 1, category: "optional", rule: "长途飞行必备" },
    { name: "眼罩耳塞", count: 1, category: "optional", rule: "飞机/酒店隔光隔音" },
    { name: "药品", count: 1, category: "optional", rule: "感冒/肠胃/创可贴/止痛" },
    { name: "零食", count: 1, category: "optional" },
    { name: "书/Kindle", count: 1, category: "optional" },
    { name: "运动装备", count: 1, category: "optional" },
    { name: "行李牌", count: 1, category: "optional", rule: "写上手机号" },
  ]

  // Add destination-specific items
  if (tips?.extraItems) {
    for (const item of tips.extraItems) {
      const list = { clothing, documents, electronics, toiletries, optional }[item.category]
      if (!list) continue
      const baseName = item.name.split("（")[0]
      const existing = list.find((i) => i.name.includes(baseName))
      if (item.override && existing) {
        existing.name = item.name
        if (item.rule) existing.rule = item.rule
      } else if (!existing) {
        list.push({ name: item.name, count: 1, category: item.category, rule: item.rule })
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
