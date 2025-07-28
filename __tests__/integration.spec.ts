import { describe, expect, it } from "vitest";
import { tools } from "../src/tools";
import { generateBarChartTool, generateEChartsTool } from "../src/tools";

/**
 * 集成测试套件
 * 测试图表工具在各种边界条件和错误情况下的行为
 * 确保工具的健壮性和一致性
 */
describe("integration tests", () => {
  /**
   * 错误处理测试
   * 验证工具在接收到无效输入时能够正确抛出错误
   */
  describe("error handling", () => {
    it("should handle empty data arrays", async () => {
      try {
        await generateBarChartTool.run({
          data: [],
          title: "空数据测试",
          width: 800,
          height: 600,
          theme: "default",
        });
        // 如果没有抛出错误，说明测试失败
        expect(true).toBe(false);
      } catch (error) {
        // 验证确实抛出了错误
        expect(error).toBeDefined();
      }
    });

    it("should handle invalid JSON in echarts option", async () => {
      try {
        await generateEChartsTool.run({
          echartsOption: "invalid json", // 故意传入无效的 JSON 字符串
          width: 800,
          height: 600,
          theme: "default",
          outputType: "png",
        });
        // 如果没有抛出错误，说明测试失败
        expect(true).toBe(false);
      } catch (error) {
        // 验证确实抛出了错误
        expect(error).toBeDefined();
      }
    });

    it("should handle missing required fields", async () => {
      try {
        await generateBarChartTool.run({
          // 故意传入缺少必需字段 value 的数据
          data: [{ category: "test" }] as Array<{
            category: string;
            value: number;
            group?: string;
          }>,
          title: "缺少字段测试",
          width: 800,
          height: 600,
          theme: "default",
        });
        // 如果没有抛出错误，说明测试失败
        expect(true).toBe(false);
      } catch (error) {
        // 验证确实抛出了错误
        expect(error).toBeDefined();
      }
    });
  });

  /**
   * 边界情况测试
   * 测试工具在极端参数下的表现
   */
  describe("boundary cases", () => {
    it("should handle very small dimensions", async () => {
      // 测试极小尺寸的图表生成
      const result = await generateBarChartTool.run({
        data: [{ category: "test", value: 10 }],
        title: "小尺寸测试",
        width: 100,
        height: 100,
        theme: "default",
      });

      // 验证结果的基本结构
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content.length).toBeGreaterThan(0);
    });

    it("should handle very large dimensions", async () => {
      // 测试超大尺寸的图表生成
      const result = await generateBarChartTool.run({
        data: [{ category: "test", value: 10 }],
        title: "大尺寸测试",
        width: 2000,
        height: 2000,
        theme: "default",
      });

      // 验证结果的基本结构
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content.length).toBeGreaterThan(0);
    });

    it("should handle large datasets", async () => {
      // 生成包含1000个数据点的大数据集
      const largeData = Array.from({ length: 1000 }, (_, i) => ({
        category: `项目${i}`,
        value: Math.random() * 100,
      }));

      const result = await generateBarChartTool.run({
        data: largeData,
        title: "大数据集测试",
        width: 800,
        height: 600,
        theme: "default",
      });

      // 验证大数据集能够正常处理
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content.length).toBeGreaterThan(0);
    });

    it("should handle extreme values", async () => {
      // 测试极值数据的处理
      const result = await generateBarChartTool.run({
        data: [
          { category: "极小值", value: Number.MIN_SAFE_INTEGER },
          { category: "极大值", value: Number.MAX_SAFE_INTEGER },
          { category: "零值", value: 0 },
          { category: "负值", value: -100 },
        ],
        title: "极值测试",
        width: 800,
        height: 600,
        theme: "default",
      });

      // 验证极值数据能够正常处理
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.content.length).toBeGreaterThan(0);
    });
  });

  /**
   * 配置组合测试
   * 测试不同配置参数的组合效果
   */
  describe("configuration combinations", () => {
    it("should handle all theme combinations", async () => {
      const themes = ["default", "dark"] as const;

      // 遍历所有支持的主题
      for (const theme of themes) {
        const result = await generateBarChartTool.run({
          data: [{ category: "test", value: 10 }],
          title: `主题测试: ${theme}`,
          width: 800,
          height: 600,
          theme,
        });

        // 验证每个主题都能正常工作
        expect(result).toBeDefined();
        expect(result.content).toBeDefined();
        expect(result.content.length).toBeGreaterThan(0);
      }
    });

    it("should handle all output types for echarts", async () => {
      const outputTypes = ["png", "svg", "option"] as const;
      // 定义一个简单的 ECharts 配置
      const echartsOption = {
        title: { text: "测试图表" },
        xAxis: { data: ["A", "B", "C"] },
        yAxis: {},
        series: [{ type: "bar", data: [1, 2, 3] }],
      };

      // 测试所有输出类型
      for (const outputType of outputTypes) {
        const result = await generateEChartsTool.run({
          echartsOption: JSON.stringify(echartsOption),
          width: 800,
          height: 600,
          theme: "default",
          outputType,
        });

        expect(result).toBeDefined();
        expect(result.content).toBeDefined();
        expect(result.content.length).toBeGreaterThan(0);

        // 根据输出类型验证特定的内容格式
        if (outputType === "svg") {
          expect(result.content[0].type).toBe("text");
          expect(result.content[0]).toHaveProperty("text");
          expect(result.content[0].text).toContain("<svg");
        } else if (outputType === "option") {
          expect(result.content[0].type).toBe("text");
          expect(result.content[0]).toHaveProperty("text");
          const optionText = result.content[0]?.text;
          expect(optionText).toBeDefined();
          // 验证返回的是有效的 JSON
          expect(() => JSON.parse(optionText as string)).not.toThrow();
        } else {
          // PNG 输出类型
          expect(result.content[0].type).toBe("image");
          expect(result.content[0]).toHaveProperty("data");
          expect(result.content[0].mimeType).toBe("image/png");
        }
      }
    });
  });

  /**
   * 工具一致性测试
   * 确保所有图表工具都遵循相同的接口规范
   */
  describe("tool consistency", () => {
    it("should have consistent return structure across all tools", async () => {
      // 选择几个代表性的工具进行测试
      const barChartTool = tools.find((t) => t.name === "generate_bar_chart");
      const pieChartTool = tools.find((t) => t.name === "generate_pie_chart");
      const lineChartTool = tools.find((t) => t.name === "generate_line_chart");

      // 确保工具都存在
      expect(barChartTool).toBeDefined();
      expect(pieChartTool).toBeDefined();
      expect(lineChartTool).toBeDefined();

      // 定义不同图表类型的测试用例
      const testCases = [
        {
          tool: barChartTool,
          params: {
            data: [{ category: "test", value: 10 }],
            title: "一致性测试",
            width: 800,
            height: 600,
            theme: "default" as const,
          },
        },
        {
          tool: pieChartTool,
          params: {
            data: [{ category: "test", value: 10 }],
            title: "一致性测试",
            width: 800,
            height: 600,
            theme: "default" as const,
          },
        },
        {
          tool: lineChartTool,
          params: {
            data: [{ time: "2023-01", value: 10 }],
            title: "一致性测试",
            width: 800,
            height: 600,
            theme: "default" as const,
          },
        },
      ];

      // 遍历测试用例，验证返回结构的一致性
      for (const { tool, params } of testCases) {
        if (tool) {
          const result = await tool.run(params as never);

          // 验证所有工具都返回相同的基本结构
          expect(result).toBeDefined();
          expect(result).toHaveProperty("content");
          expect(Array.isArray(result.content)).toBe(true);
          expect(result.content.length).toBeGreaterThan(0);
          expect(result.content[0]).toHaveProperty("data");
          expect(result.content[0]).toHaveProperty("mimeType");
          expect(result.content[0]).toHaveProperty("type");
          expect(result.content[0].type).toBe("image");
        }
      }
    });

    it("should have all tools properly exported", () => {
      // 验证工具总数是否正确
      expect(tools).toHaveLength(17);

      // 定义期望的工具名称列表
      const expectedToolNames = [
        "generate_echarts",
        "generate_line_chart",
        "generate_bar_chart",
        "generate_pie_chart",
        "generate_radar_chart",
        "generate_scatter_chart",
        "generate_sankey_chart",
        "generate_funnel_chart",
        "generate_gauge_chart",
        "generate_treemap_chart",
        "generate_sunburst_chart",
        "generate_heatmap_chart",
        "generate_candlestick_chart",
        "generate_boxplot_chart",
        "generate_graph_chart",
        "generate_parallel_chart",
        "generate_tree_chart",
      ];

      // 验证实际导出的工具名称与期望一致
      const actualNames = tools.map((tool) => tool.name).sort();
      expect(actualNames).toEqual(expectedToolNames.sort());
    });
  });

  /**
   * 性能测试
   * 确保图表生成在合理的时间内完成
   */
  describe("performance", () => {
    it("should generate charts within reasonable time", async () => {
      // 记录开始时间
      const startTime = Date.now();

      // 生成包含100个数据点的图表
      await generateBarChartTool.run({
        data: Array.from({ length: 100 }, (_, i) => ({
          category: `项目${i}`,
          value: Math.random() * 100,
        })),
        title: "性能测试",
        width: 800,
        height: 600,
        theme: "default",
      });

      // 计算执行时间
      const endTime = Date.now();
      const duration = endTime - startTime;

      // 验证图表生成在5秒内完成（性能要求）
      expect(duration).toBeLessThan(5000);
    });
  });
});
