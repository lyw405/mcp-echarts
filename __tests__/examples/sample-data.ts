// 示例数据用于测试各种图表

export const barChartData = [
  { category: "苹果", value: 120 },
  { category: "香蕉", value: 80 },
  { category: "橙子", value: 150 },
  { category: "葡萄", value: 90 },
];

export const lineChartData = [
  { time: "2023-01", value: 100 },
  { time: "2023-02", value: 120 },
  { time: "2023-03", value: 85 },
  { time: "2023-04", value: 160 },
  { time: "2023-05", value: 140 },
];

export const pieChartData = [
  { category: "技术", value: 35 },
  { category: "营销", value: 25 },
  { category: "销售", value: 20 },
  { category: "客服", value: 20 },
];

export const radarChartData = [
  { name: "性能", value: 85 },
  { name: "功能", value: 90 },
  { name: "易用性", value: 75 },
  { name: "稳定性", value: 95 },
  { name: "价格", value: 60 },
];

export const scatterChartData = [
  { x: 10, y: 15 },
  { x: 20, y: 25 },
  { x: 30, y: 35 },
  { x: 40, y: 30 },
  { x: 50, y: 45 },
];

export const sankeyChartData = [
  { source: "访问首页", target: "产品页面", value: 1000 },
  { source: "产品页面", target: "添加购物车", value: 300 },
  { source: "添加购物车", target: "结算", value: 200 },
  { source: "结算", target: "完成购买", value: 150 },
];

export const funnelChartData = [
  { category: "访问网站", value: 1000 },
  { category: "浏览产品", value: 800 },
  { category: "添加购物车", value: 600 },
  { category: "开始结算", value: 400 },
  { category: "完成购买", value: 300 },
];

export const gaugeChartData = [{ name: "CPU使用率", value: 75 }];

export const treemapChartData = [
  {
    name: "技术部门",
    value: 100,
    children: [
      { name: "前端", value: 40 },
      { name: "后端", value: 60 },
    ],
  },
  {
    name: "业务部门",
    value: 80,
    children: [
      { name: "营销", value: 30 },
      { name: "销售", value: 50 },
    ],
  },
];

export const sunburstChartData = [
  {
    name: "公司",
    value: 200,
    children: [
      {
        name: "技术",
        value: 100,
        children: [
          { name: "前端", value: 40 },
          { name: "后端", value: 60 },
        ],
      },
      {
        name: "业务",
        value: 100,
        children: [
          { name: "销售", value: 60 },
          { name: "营销", value: 40 },
        ],
      },
    ],
  },
];

export const heatmapChartData = [
  { x: "周一", y: "9点", value: 5 },
  { x: "周一", y: "10点", value: 8 },
  { x: "周二", y: "9点", value: 3 },
  { x: "周二", y: "10点", value: 7 },
  { x: "周三", y: "9点", value: 9 },
  { x: "周三", y: "10点", value: 6 },
];

export const candlestickChartData = [
  { date: "2023-01-01", open: 100, high: 110, low: 95, close: 105 },
  { date: "2023-01-02", open: 105, high: 115, low: 100, close: 108 },
  { date: "2023-01-03", open: 108, high: 112, low: 102, close: 106 },
  { date: "2023-01-04", open: 106, high: 118, low: 104, close: 115 },
];

export const boxplotChartData = [
  { category: "A组", value: 10 },
  { category: "A组", value: 12 },
  { category: "A组", value: 15 },
  { category: "A组", value: 18 },
  { category: "A组", value: 20 },
  { category: "B组", value: 8 },
  { category: "B组", value: 11 },
  { category: "B组", value: 14 },
  { category: "B组", value: 16 },
  { category: "B组", value: 22 },
];

export const graphChartData = {
  nodes: [
    { id: "node1", name: "节点1" },
    { id: "node2", name: "节点2" },
    { id: "node3", name: "节点3" },
    { id: "node4", name: "节点4" },
  ],
  edges: [
    { source: "node1", target: "node2" },
    { source: "node2", target: "node3" },
    { source: "node3", target: "node4" },
    { source: "node1", target: "node4" },
  ],
};

export const parallelChartData = [
  { name: "产品A", values: [4.2, 3.4, 2.3, 1.8] },
  { name: "产品B", values: [3.8, 4.1, 3.2, 2.5] },
  { name: "产品C", values: [2.9, 3.8, 4.1, 3.2] },
];

export const parallelDimensions = ["价格", "质量", "服务", "价值"];

export const treeChartData = {
  name: "根节点",
  children: [
    {
      name: "子节点1",
      children: [{ name: "叶节点1" }, { name: "叶节点2" }],
    },
    {
      name: "子节点2",
      children: [{ name: "叶节点3" }, { name: "叶节点4" }],
    },
  ],
};

export const echartsOption = {
  title: {
    text: "ECharts测试图表",
    left: "center",
    top: "2%",
  },
  tooltip: {},
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};
