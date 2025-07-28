import { describe, expect, it } from "vitest";
import {
  generateBarChartTool,
  generateBoxplotChartTool,
  generateCandlestickChartTool,
  generateEChartsTool,
  generateFunnelChartTool,
  generateGaugeChartTool,
  generateGraphChartTool,
  generateHeatmapChartTool,
  generateLineChartTool,
  generateParallelChartTool,
  generatePieChartTool,
  generateRadarChartTool,
  generateSankeyChartTool,
  generateScatterChartTool,
  generateSunburstChartTool,
  generateTreeChartTool,
  generateTreemapChartTool,
} from "../../src/tools";
import { zodToJsonSchema } from "../schema";

// 导入预期的JSON Schema定义文件
import barExpected from "./bar.json";
import boxplotExpected from "./boxplot.json";
import candlestickExpected from "./candlestick.json";
import echartsExpected from "./echarts.json";
import funnelExpected from "./funnel.json";
import gaugeExpected from "./gauge.json";
import graphExpected from "./graph.json";
import heatmapExpected from "./heatmap.json";
import lineExpected from "./line.json";
import parallelExpected from "./parallel.json";
import pieExpected from "./pie.json";
import radarExpected from "./radar.json";
import sankeyExpected from "./sankey.json";
import scatterExpected from "./scatter.json";
import sunburstExpected from "./sunburst.json";
import treeExpected from "./tree.json";
import treemapExpected from "./treemap.json";

/**
 * 图表工具JSON Schema验证测试套件
 * 验证每个图表工具的输入模式定义是否与预期的JSON Schema一致
 * 确保工具接口的稳定性和向后兼容性
 */
describe("charts schema check", () => {
  /**
   * 图表工具测试配置数组
   * 包含所有17个图表工具的名称、工具实例和预期Schema
   */
  const chartTests = [
    { name: "echarts", tool: generateEChartsTool, expected: echartsExpected }, // 通用ECharts工具
    { name: "line", tool: generateLineChartTool, expected: lineExpected }, // 折线图工具
    { name: "bar", tool: generateBarChartTool, expected: barExpected }, // 柱状图工具
    { name: "pie", tool: generatePieChartTool, expected: pieExpected }, // 饼图工具
    { name: "radar", tool: generateRadarChartTool, expected: radarExpected }, // 雷达图工具
    {
      name: "scatter",
      tool: generateScatterChartTool,
      expected: scatterExpected, // 散点图工具
    },
    { name: "sankey", tool: generateSankeyChartTool, expected: sankeyExpected }, // 桑基图工具
    { name: "funnel", tool: generateFunnelChartTool, expected: funnelExpected }, // 漏斗图工具
    { name: "gauge", tool: generateGaugeChartTool, expected: gaugeExpected }, // 仪表盘工具
    {
      name: "treemap",
      tool: generateTreemapChartTool,
      expected: treemapExpected, // 矩形树图工具
    },
    {
      name: "sunburst",
      tool: generateSunburstChartTool,
      expected: sunburstExpected, // 旭日图工具
    },
    {
      name: "heatmap",
      tool: generateHeatmapChartTool,
      expected: heatmapExpected, // 热力图工具
    },
    {
      name: "candlestick",
      tool: generateCandlestickChartTool,
      expected: candlestickExpected, // K线图工具
    },
    {
      name: "boxplot",
      tool: generateBoxplotChartTool,
      expected: boxplotExpected, // 箱线图工具
    },
    { name: "graph", tool: generateGraphChartTool, expected: graphExpected }, // 关系图工具
    {
      name: "parallel",
      tool: generateParallelChartTool,
      expected: parallelExpected, // 平行坐标图工具
    },
    { name: "tree", tool: generateTreeChartTool, expected: treeExpected }, // 树图工具
  ];

  /**
   * 为每个图表工具创建独立的Schema验证测试
   * 验证工具的实际Schema与预期Schema完全匹配
   */
  for (const { name, tool, expected } of chartTests) {
    it(`should check schema for ${name} chart`, () => {
      // 从工具中提取除run函数外的所有属性
      const { run, inputSchema, ...rest } = tool;

      // 构建实际的Schema对象，将Zod Schema转换为JSON Schema
      const actualSchema = {
        ...rest,
        inputSchema: zodToJsonSchema(inputSchema),
      };

      // 验证实际Schema与预期Schema完全匹配
      expect(actualSchema).toEqual(expected);
    });
  }

  /**
   * 工具名称唯一性验证
   * 确保所有图表工具的名称都是唯一的，避免命名冲突
   */
  it("should have unique tool names", () => {
    // 提取所有工具的名称
    const names = chartTests.map((test) => test.expected.name);
    const uniqueNames = new Set(names);

    // 验证去重后的名称数量与原始数量相同
    expect(uniqueNames.size).toBe(names.length);
  });

  /**
   * 工具基本属性完整性验证
   * 验证每个工具都包含必需的属性和正确的Schema结构
   */
  it("should have required properties for all tools", () => {
    for (const { name, expected } of chartTests) {
      // 验证工具包含基本属性
      expect(expected).toHaveProperty("name");
      expect(expected).toHaveProperty("description");
      expect(expected).toHaveProperty("inputSchema");

      // 验证inputSchema的基本结构
      expect(expected.inputSchema).toHaveProperty("type", "object");
      expect(expected.inputSchema).toHaveProperty("properties");
    }
  });
});
