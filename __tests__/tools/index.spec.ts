import { describe, expect, it } from "vitest";
import { tools } from "../../src/tools";

/**
 * 工具索引验证测试套件
 * 验证所有图表工具的基本结构、数量和属性是否符合规范
 * 确保工具导出的一致性和完整性
 */
describe("tools index", () => {
  /**
   * 工具数量验证
   * 验证导出的工具总数是否符合预期（17个图表工具）
   */
  it("should export all 17 chart tools", () => {
    // 验证工具数组包含17个图表工具
    expect(tools).toHaveLength(17);
  });

  /**
   * 工具结构一致性验证
   * 验证每个工具都具有必需的基本属性和正确的类型
   */
  it("should have consistent tool structure", () => {
    for (const tool of tools) {
      // 验证工具包含所有必需属性
      expect(tool).toHaveProperty("name");
      expect(tool).toHaveProperty("description");
      expect(tool).toHaveProperty("inputSchema");
      expect(tool).toHaveProperty("run");

      // 验证属性类型正确性
      expect(typeof tool.name).toBe("string");
      expect(typeof tool.description).toBe("string");
      expect(typeof tool.run).toBe("function");

      // 验证工具名称遵循命名规范（generate_开头）
      expect(tool.name).toMatch(/^generate_\w+$/);
    }
  });

  /**
   * 工具名称唯一性验证
   * 确保所有工具名称都是唯一的，避免重复定义
   */
  it("should have unique tool names", () => {
    const names = tools.map((tool) => tool.name);
    const uniqueNames = new Set(names);

    // 验证去重后的名称数量与原始数量相同
    expect(uniqueNames.size).toBe(names.length);
  });

  /**
   * 预期工具列表完整性验证
   * 验证所有预期的图表工具都已正确导出，确保没有遗漏
   */
  it("should include all expected chart types", () => {
    // 定义所有预期的图表工具名称
    const expectedTools = [
      "generate_echarts", // 通用ECharts工具
      "generate_line_chart", // 折线图
      "generate_bar_chart", // 柱状图
      "generate_pie_chart", // 饼图
      "generate_radar_chart", // 雷达图
      "generate_scatter_chart", // 散点图
      "generate_sankey_chart", // 桑基图
      "generate_funnel_chart", // 漏斗图
      "generate_gauge_chart", // 仪表盘
      "generate_treemap_chart", // 矩形树图
      "generate_sunburst_chart", // 旭日图
      "generate_heatmap_chart", // 热力图
      "generate_candlestick_chart", // K线图
      "generate_boxplot_chart", // 箱线图
      "generate_graph_chart", // 关系图
      "generate_parallel_chart", // 平行坐标图
      "generate_tree_chart", // 树图
    ];

    // 获取实际工具名称并排序
    const actualNames = tools.map((tool) => tool.name).sort();

    // 验证实际工具名称与预期完全匹配
    expect(actualNames).toEqual(expectedTools.sort());
  });
});
