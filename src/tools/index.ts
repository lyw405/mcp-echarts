import { generateBarChartTool } from "./bar";
import { generateBoxplotChartTool } from "./boxplot";
import { generateCandlestickChartTool } from "./candlestick";
import { generateEChartsTool } from "./echarts";
import { generateFunnelChartTool } from "./funnel";
import { generateGaugeChartTool } from "./gauge";
import { generateGraphChartTool } from "./graph";
import { generateHeatmapChartTool } from "./heatmap";
import { generateLineChartTool } from "./line";
import { generateParallelChartTool } from "./parallel";
import { generatePieChartTool } from "./pie";
import { generateRadarChartTool } from "./radar";
import { generateSankeyChartTool } from "./sankey";
import { generateScatterChartTool } from "./scatter";
import { generateSunburstChartTool } from "./sunburst";
import { generateTreeChartTool } from "./tree";
import { generateTreemapChartTool } from "./treemap";

export const tools = [
  generateEChartsTool,
  generateLineChartTool,
  generateBarChartTool,
  generatePieChartTool,
  generateRadarChartTool,
  generateScatterChartTool,
  generateSankeyChartTool,
  generateFunnelChartTool,
  generateGaugeChartTool,
  generateTreemapChartTool,
  generateSunburstChartTool,
  generateHeatmapChartTool,
  generateCandlestickChartTool,
  generateBoxplotChartTool,
  generateGraphChartTool,
  generateParallelChartTool,
  generateTreeChartTool,
];

// 重新导出各个工具，方便测试和其他地方使用
export {
  generateEChartsTool,
  generateLineChartTool,
  generateBarChartTool,
  generatePieChartTool,
  generateRadarChartTool,
  generateScatterChartTool,
  generateSankeyChartTool,
  generateFunnelChartTool,
  generateGaugeChartTool,
  generateTreemapChartTool,
  generateSunburstChartTool,
  generateHeatmapChartTool,
  generateCandlestickChartTool,
  generateBoxplotChartTool,
  generateGraphChartTool,
  generateParallelChartTool,
  generateTreeChartTool,
};
