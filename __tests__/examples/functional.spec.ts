import { describe, expect, it } from "vitest";
import { tools } from "../../src/tools";

/**
 * 图表结果接口定义
 * 定义了图表工具返回结果的标准结构
 */
interface ChartResult {
  content: Array<{
    data?: string;
    text?: string;
    mimeType?: string;
    type: string;
  }>;
}

/**
 * 验证图表结果的有效性
 * @param result - 图表工具返回的结果
 */
function expectValidChartResult(result: ChartResult) {
  // 验证结果对象存在
  expect(result).toBeDefined();
  // 验证内容数组存在且不为空
  expect(result.content).toBeDefined();
  expect(Array.isArray(result.content)).toBe(true);
  expect(result.content.length).toBeGreaterThan(0);

  // 验证第一个内容项的基本属性
  expect(result.content[0]).toBeDefined();
  expect(result.content[0].type).toBeDefined();

  // 对于图像类型，验证数据和MIME类型
  if (result.content[0].type === "image") {
    expect(result.content[0]?.data).toBeDefined();
    expect(result.content[0]?.data?.length).toBeGreaterThan(0);
    expect(result.content[0].mimeType).toBe("image/png");
  }
}

/**
 * 功能测试套件
 * 测试所有图表工具的基本功能是否正常工作
 * 确保每个工具都能生成有效的图表输出
 */
describe("functional tests", () => {
  /**
   * 通用测试参数
   * 用于所有图表类型的标准测试配置
   */
  const commonParams = {
    title: "功能测试图表",
    width: 800,
    height: 600,
    theme: "default" as const,
  };

  /**
   * 条形图功能测试
   * 验证条形图工具能够正确处理分类数据并生成图表
   */
  it("should generate bar chart", async () => {
    const barChartTool = tools.find((t) => t.name === "generate_bar_chart");
    expect(barChartTool).toBeDefined();

    if (barChartTool) {
      const result = await barChartTool.run({
        data: [
          { category: "产品A", value: 100 },
          { category: "产品B", value: 200 },
          { category: "产品C", value: 150 },
        ],
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 折线图功能测试
   * 验证折线图工具能够正确处理时间序列数据并生成趋势图表
   */
  it("should generate line chart", async () => {
    const lineChartTool = tools.find((t) => t.name === "generate_line_chart");
    expect(lineChartTool).toBeDefined();

    if (lineChartTool) {
      const result = await lineChartTool.run({
        data: [
          { time: "2023-01", value: 100 },
          { time: "2023-02", value: 120 },
          { time: "2023-03", value: 110 },
        ],
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 饼图功能测试
   * 验证饼图工具能够正确处理分类数据并生成圆形图表
   */
  it("should generate pie chart", async () => {
    const pieChartTool = tools.find((t) => t.name === "generate_pie_chart");
    expect(pieChartTool).toBeDefined();

    if (pieChartTool) {
      const result = await pieChartTool.run({
        data: [
          { category: "类别A", value: 30 },
          { category: "类别B", value: 40 },
          { category: "类别C", value: 30 },
        ],
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 雷达图功能测试
   * 验证雷达图工具能够正确处理多维度数据并生成雷达图表
   */
  it("should generate radar chart", async () => {
    const radarChartTool = tools.find((t) => t.name === "generate_radar_chart");
    expect(radarChartTool).toBeDefined();

    if (radarChartTool) {
      const result = await radarChartTool.run({
        data: [
          { name: "产品A", values: [80, 90, 70, 85, 75] },
          { name: "产品B", values: [70, 80, 85, 75, 80] },
        ],
        indicators: [
          { name: "质量", max: 100 },
          { name: "价格", max: 100 },
          { name: "服务", max: 100 },
          { name: "功能", max: 100 },
          { name: "体验", max: 100 },
        ],
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 散点图功能测试
   * 验证散点图工具能够正确处理二维坐标数据并生成散点图表
   */
  it("should generate scatter chart", async () => {
    const scatterChartTool = tools.find(
      (t) => t.name === "generate_scatter_chart",
    );
    expect(scatterChartTool).toBeDefined();

    if (scatterChartTool) {
      const result = await scatterChartTool.run({
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 25 },
          { x: 20, y: 30 },
        ],
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 桑基图功能测试
   * 验证桑基图工具能够正确处理流向数据并生成流程图表
   */
  it("should generate sankey chart", async () => {
    const sankeyChartTool = tools.find(
      (t) => t.name === "generate_sankey_chart",
    );
    expect(sankeyChartTool).toBeDefined();

    if (sankeyChartTool) {
      const result = await sankeyChartTool.run({
        data: [
          { source: "源头A", target: "目标A", value: 10 },
          { source: "源头B", target: "目标B", value: 15 },
          { source: "源头A", target: "目标B", value: 5 },
        ],
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 漏斗图功能测试
   * 验证漏斗图工具能够正确处理转化数据并生成漏斗图表
   */
  it("should generate funnel chart", async () => {
    const funnelChartTool = tools.find(
      (t) => t.name === "generate_funnel_chart",
    );
    expect(funnelChartTool).toBeDefined();

    if (funnelChartTool) {
      const result = await funnelChartTool.run({
        data: [
          { category: "访问", value: 1000 },
          { category: "咨询", value: 500 },
          { category: "购买", value: 100 },
        ],
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 仪表盘功能测试
   * 验证仪表盘工具能够正确处理单一数值并生成仪表盘图表
   */
  it("should generate gauge chart", async () => {
    const gaugeChartTool = tools.find((t) => t.name === "generate_gauge_chart");
    expect(gaugeChartTool).toBeDefined();

    if (gaugeChartTool) {
      const result = await gaugeChartTool.run({
        data: [{ name: "CPU使用率", value: 75 }],
        min: 0,
        max: 100,
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 矩形树图功能测试
   * 验证矩形树图工具能够正确处理层次数据并生成树状图表
   */
  it("should generate treemap chart", async () => {
    const treemapChartTool = tools.find(
      (t) => t.name === "generate_treemap_chart",
    );
    expect(treemapChartTool).toBeDefined();

    if (treemapChartTool) {
      const result = await treemapChartTool.run({
        data: [
          { name: "分类A", value: 100 },
          { name: "分类B", value: 200 },
          { name: "分类C", value: 150 },
        ],
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 旭日图功能测试
   * 验证旭日图工具能够正确处理多层级数据并生成环形图表
   */
  it("should generate sunburst chart", async () => {
    const sunburstChartTool = tools.find(
      (t) => t.name === "generate_sunburst_chart",
    );
    expect(sunburstChartTool).toBeDefined();

    if (sunburstChartTool) {
      const result = await sunburstChartTool.run({
        data: [
          {
            name: "根节点",
            children: [
              { name: "子节点1", value: 10 },
              { name: "子节点2", value: 20 },
            ],
          },
        ],
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 热力图功能测试
   * 验证热力图工具能够正确处理矩阵数据并生成热力图表
   */
  it("should generate heatmap chart", async () => {
    const heatmapChartTool = tools.find(
      (t) => t.name === "generate_heatmap_chart",
    );
    expect(heatmapChartTool).toBeDefined();

    if (heatmapChartTool) {
      const result = await heatmapChartTool.run({
        data: [
          { x: "周一", y: "上午", value: 5 },
          { x: "周一", y: "下午", value: 1 },
          { x: "周二", y: "上午", value: 3 },
          { x: "周二", y: "下午", value: 2 },
        ],
        axisXTitle: "星期",
        axisYTitle: "时间段",
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * K线图功能测试
   * 验证K线图工具能够正确处理股票数据并生成K线图表
   */
  it("should generate candlestick chart", async () => {
    const candlestickChartTool = tools.find(
      (t) => t.name === "generate_candlestick_chart",
    );
    expect(candlestickChartTool).toBeDefined();

    if (candlestickChartTool) {
      const result = await candlestickChartTool.run({
        data: [
          ["2023-01-01", 20, 34, 10, 25],
          ["2023-01-02", 25, 40, 20, 35],
        ],
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 箱线图功能测试
   * 验证箱线图工具能够正确处理统计数据并生成箱线图表
   */
  it("should generate boxplot chart", async () => {
    const boxplotChartTool = tools.find(
      (t) => t.name === "generate_boxplot_chart",
    );
    expect(boxplotChartTool).toBeDefined();

    if (boxplotChartTool) {
      const result = await boxplotChartTool.run({
        data: [
          [1, 9, 13, 22, 30],
          [2, 8, 15, 25, 35],
        ],
        categories: ["数据集1", "数据集2"],
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 关系图功能测试
   * 验证关系图工具能够正确处理网络数据并生成关系图表
   */
  it("should generate graph chart", async () => {
    const graphChartTool = tools.find((t) => t.name === "generate_graph_chart");
    expect(graphChartTool).toBeDefined();

    if (graphChartTool) {
      const result = await graphChartTool.run({
        data: {
          nodes: [
            { id: "1", name: "节点1" },
            { id: "2", name: "节点2" },
          ],
          edges: [{ source: "1", target: "2" }],
        },
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 平行坐标图功能测试
   * 验证平行坐标图工具能够正确处理多维数据并生成平行坐标图表
   */
  it("should generate parallel chart", async () => {
    const parallelChartTool = tools.find(
      (t) => t.name === "generate_parallel_chart",
    );
    expect(parallelChartTool).toBeDefined();

    if (parallelChartTool) {
      const result = await parallelChartTool.run({
        data: [
          { name: "产品A", values: [4.2, 3.4, 2.3, 1.8] },
          { name: "产品B", values: [3.8, 4.1, 3.2, 2.5] },
          { name: "产品C", values: [2.9, 3.8, 4.1, 3.2] },
        ],
        dimensions: ["价格", "质量", "服务", "价值"],
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 树图功能测试
   * 验证树图工具能够正确处理树形数据并生成树状图表
   */
  it("should generate tree chart", async () => {
    const treeChartTool = tools.find((t) => t.name === "generate_tree_chart");
    expect(treeChartTool).toBeDefined();

    if (treeChartTool) {
      const result = await treeChartTool.run({
        data: {
          name: "根节点",
          children: [
            {
              name: "分支1",
              children: [{ name: "叶子1" }, { name: "叶子2" }],
            },
            { name: "分支2" },
          ],
        },
        ...commonParams,
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 自定义ECharts图表功能测试
   * 验证自定义ECharts工具能够正确处理配置对象并生成图表
   */
  it("should generate custom echarts chart", async () => {
    const echartsChartTool = tools.find((t) => t.name === "generate_echarts");
    expect(echartsChartTool).toBeDefined();

    if (echartsChartTool) {
      // 定义自定义ECharts配置
      const customOption = {
        title: { text: "自定义图表" },
        tooltip: {},
        xAxis: { data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"] },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };

      const result = await echartsChartTool.run({
        echartsOption: JSON.stringify(customOption),
        width: 800,
        height: 600,
        theme: "default",
        outputType: "png",
      } as never);

      expectValidChartResult(result);
    }
  });

  /**
   * 不同输出类型测试
   * 验证ECharts工具支持多种输出格式（SVG、配置选项等）
   */
  it("should handle different output types", async () => {
    const echartsChartTool = tools.find((t) => t.name === "generate_echarts");
    expect(echartsChartTool).toBeDefined();

    if (echartsChartTool) {
      const customOption = {
        title: { text: "输出类型测试" },
        tooltip: {},
        xAxis: { data: ["A", "B", "C"] },
        yAxis: {},
        series: [{ name: "数据", type: "bar", data: [10, 20, 30] }],
      };

      // 测试SVG输出
      const svgResult = await echartsChartTool.run({
        width: 800,
        height: 600,
        theme: "default",
        outputType: "svg",
        echartsOption: JSON.stringify(customOption),
      } as never);

      expect(svgResult).toBeDefined();
      expect(svgResult.content).toBeDefined();
      expect(Array.isArray(svgResult.content)).toBe(true);
      expect(svgResult.content.length).toBeGreaterThan(0);
      expect(svgResult.content[0]).toHaveProperty("text");
      expect(svgResult.content[0]).toHaveProperty("type", "text");
      // 验证SVG内容包含svg标签
      const svgContent = svgResult.content[0];
      if (svgContent && "text" in svgContent && svgContent.text) {
        expect(svgContent.text).toContain("<svg");
      }

      // 测试配置选项输出
      const optionResult = await echartsChartTool.run({
        width: 800,
        height: 600,
        theme: "default",
        outputType: "option",
        echartsOption: JSON.stringify(customOption),
      } as never);

      expect(optionResult).toBeDefined();
      expect(optionResult.content).toBeDefined();
      expect(Array.isArray(optionResult.content)).toBe(true);
      expect(optionResult.content.length).toBeGreaterThan(0);
      expect(optionResult.content[0]).toHaveProperty("text");
      expect(optionResult.content[0]).toHaveProperty("type", "text");
      // 验证输出的文本是有效的JSON
      const optionContent = optionResult.content[0];
      if (optionContent && "text" in optionContent && optionContent.text) {
        expect(optionContent.text).toBeDefined();
        expect(() => JSON.parse(optionContent.text)).not.toThrow();
      }
    }
  });

  /**
   * 深色主题测试
   * 验证图表工具支持深色主题配置
   */
  it("should handle dark theme", async () => {
    const barChartTool = tools.find((t) => t.name === "generate_bar_chart");
    expect(barChartTool).toBeDefined();

    if (barChartTool) {
      const result = await barChartTool.run({
        ...commonParams,
        theme: "dark",
        data: [
          { category: "产品A", value: 100 },
          { category: "产品B", value: 200 },
          { category: "产品C", value: 150 },
        ],
      } as never);

      expectValidChartResult(result);
    }
  });
});

// 测试工具函数，用于验证图表结果的有效性
