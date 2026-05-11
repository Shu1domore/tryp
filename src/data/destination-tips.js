// Destination-specific packing tips based on real travel experiences
// Each entry adds or modifies items in the packing list
export const destinationTips = {
  JP: {
    plugType: "A型（双扁头），110V电压，需带变压器或确认设备支持110V",
    extraItems: [
      { name: "拖鞋（日式旅馆需脱鞋）", category: "toiletries" },
      { name: "垃圾袋（日本街头几乎没有垃圾桶）", category: "optional" },
      { name: "零钱包（很多小店只收现金）", category: "optional" },
    ],
    warnings: ["日本酒店退房时间通常为上午10:00，比国内早", "温泉旅馆需自备洗漱用品"],
  },
  KR: {
    plugType: "C/F型（双圆头），220V，需带转换插头",
    extraItems: [
      { name: "拖鞋（韩国酒店普遍不提供一次性拖鞋）", category: "toiletries" },
      { name: "牙刷牙膏（韩国酒店环保政策不提供）", category: "toiletries", override: true },
    ],
    warnings: ["韩国酒店从1992年起不提供一次性洗漱用品（牙刷牙膏），务必自带", "济州岛很多民宿/酒店不提供一次性拖鞋"],
  },
  TH: {
    plugType: "A/C型（双扁头或双圆头），220V，大部分酒店有万能插座",
    extraItems: [
      { name: "防蚊液（登革热高发区）", category: "toiletries", override: true },
      { name: "肠胃药（水土不服常见）", category: "optional" },
      { name: "防水手机袋（泼水节/水上活动）", category: "optional" },
    ],
    warnings: ["防晒霜建议SPF50+以上", "寺庙参观需穿长裤长袖，不可穿拖鞋"],
  },
  SG: {
    plugType: "G型（英标三脚方头），230V，必须带转换插头",
    extraItems: [],
    warnings: ["新加坡室内空调非常冷，建议随身带薄外套", "口香糖禁止携带入境"],
  },
  MY: {
    plugType: "G型（英标三脚方头），240V，必须带转换插头",
    extraItems: [
      { name: "防蚊液", category: "toiletries", override: true },
      { name: "长袖长裤（清真寺参观需要）", category: "clothing" },
    ],
    warnings: ["参观清真寺需穿着保守，女性需戴头巾（通常现场提供）"],
  },
  ID: {
    plugType: "C/F型（欧标双圆头），230V，需带转换插头",
    extraItems: [
      { name: "防蚊液（登革热风险）", category: "toiletries", override: true },
      { name: "肠胃药", category: "optional" },
    ],
    warnings: ["巴厘岛机场安检严格，所有液体必须托运", "巴厘岛很多villa和小店只收现金"],
  },
  VN: {
    plugType: "A/C型，220V，大部分酒店有万能插座",
    extraItems: [
      { name: "口罩（摩托车尾气较重）", category: "optional" },
      { name: "肠胃药", category: "optional" },
    ],
    warnings: ["越南主要用现金，提前换好越南盾", "过马路要注意摩托车，慢步匀速通过"],
  },
  AE: {
    plugType: "G型（英标三脚方头），220V，必须带转换插头",
    extraItems: [
      { name: "长裙/长裤（商场和清真寺着装要求）", category: "clothing" },
      { name: "防晒帽/墨镜", category: "optional" },
    ],
    warnings: ["出租车只收迪拉姆现金", "斋月期间白天公共场合不可饮食"],
  },
  FR: {
    plugType: "E型（双圆头+接地孔），230V，需欧标转换插头",
    extraItems: [
      { name: "防盗腰包（巴黎扒手多）", category: "optional" },
      { name: "拖鞋（欧洲酒店不提供）", category: "toiletries" },
    ],
    warnings: ["巴黎扒手活跃，不要随身带太多现金", "欧洲酒店通常不提供拖鞋、牙刷牙膏"],
  },
  DE: {
    plugType: "F型（双圆头+接地夹），230V，需欧标转换插头",
    extraItems: [
      { name: "拖鞋（酒店不提供）", category: "toiletries" },
    ],
    warnings: ["德国是欧洲现金使用率最高的国家，很多餐厅和小店不收银行卡", "垃圾分类非常严格"],
  },
  IT: {
    plugType: "L型（三圆头），230V，意标插头比欧标细0.8mm，需专用意标转换插头",
    extraItems: [
      { name: "拖鞋（酒店不提供）", category: "toiletries" },
      { name: "防盗腰包（罗马/那不勒斯）", category: "optional" },
    ],
    warnings: ["意大利插头标准(L型)与法德不同，普通欧标可能插不进去", "欧洲酒店通常不提供拖鞋和一次性洗漱用品"],
  },
  ES: {
    plugType: "F型（双圆头+接地夹），230V，需欧标转换插头",
    extraItems: [
      { name: "拖鞋（酒店不提供）", category: "toiletries" },
      { name: "防盗腰包（巴塞罗那扒手多）", category: "optional" },
    ],
    warnings: ["巴塞罗那是欧洲扒手最活跃的城市之一", "西班牙午餐时间14:00-16:00，晚餐21:00后"],
  },
  GB: {
    plugType: "G型（英标三脚方头），230V，必须带转换插头",
    extraItems: [
      { name: "雨伞（英国天气多变）", category: "optional", override: true },
      { name: "拖鞋（酒店不提供）", category: "toiletries" },
    ],
    warnings: ["英国几乎100%无现金支付", "靠左行驶，过马路注意方向"],
  },
  US: {
    plugType: "A/B型（双扁头），120V电压，需确认设备支持或带变压器",
    extraItems: [
      { name: "小费零钱（$1和$5纸币多备）", category: "documents" },
    ],
    warnings: ["美国小费文化：餐厅15-20%，酒店行李员$1/件，客房清洁$2-3/天", "美国使用120V电压，部分电器（如吹风机）可能不兼容"],
  },
  AU: {
    plugType: "I型（八字扁头），230V，需带澳标转换插头",
    extraItems: [
      { name: "防晒霜SPF50+（紫外线极强）", category: "toiletries", override: true },
    ],
    warnings: ["澳洲紫外线强度是中国的3-5倍，必须做好防晒", "入境不可携带任何食品、动植物制品"],
  },
  NZ: {
    plugType: "I型（八字扁头），230V，需带澳标转换插头",
    extraItems: [
      { name: "防晒霜SPF50+", category: "toiletries", override: true },
    ],
    warnings: ["新西兰紫外线同样极强", "入境检查非常严格，食品必须申报"],
  },
  MV: {
    plugType: "G型（英标），230V，度假村通常提供万能插座",
    extraItems: [
      { name: "浮潜装备（自带更卫生）", category: "optional" },
      { name: "防水相机/手机防水袋", category: "optional" },
    ],
    warnings: ["度假村一般全含，结算刷卡", "小费建议给美元现金"],
  },
  LK: {
    plugType: "D/G型，230V，建议带万能转换插头",
    extraItems: [
      { name: "防蚊液", category: "toiletries", override: true },
      { name: "肠胃药", category: "optional" },
    ],
    warnings: ["斯里兰卡现金使用率高，建议带美元到当地换"],
  },
  KH: {
    plugType: "A/C型，230V，大部分酒店有万能插座",
    extraItems: [
      { name: "防蚊液", category: "toiletries", override: true },
      { name: "遮阳帽/防晒衣（吴哥窟暴晒）", category: "clothing" },
    ],
    warnings: ["柬埔寨通用美元，直接带美元", "吴哥窟参观需穿过膝裤/裙，不可露肩"],
  },
  PH: {
    plugType: "A/B型（双扁头），220V，与中国基本兼容",
    extraItems: [
      { name: "防蚊液", category: "toiletries", override: true },
      { name: "防水手机袋", category: "optional" },
    ],
    warnings: ["海岛ATM手续费高，建议提前换好比索", "跳岛游和水上活动多收现金"],
  },
}
