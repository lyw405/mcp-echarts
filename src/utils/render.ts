import { createCanvas } from "@napi-rs/canvas";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

export function renderECharts(
  echartsOption: EChartsOption,
  width = 800,
  height = 600,
  theme = "default",
  outputType: "png" | "svg" | "option" = "png",
): string {
  if (outputType === "svg" || outputType === "option") {
    // 在 SSR 模式下第一个参数不需要再传入 DOM 对象
    const chart = echarts.init(null, theme, {
      renderer: "svg",
      ssr: true,
      width,
      height,
    });

    chart.setOption({
      ...echartsOption,
      animation: false,
    });

    // 输出字符串
    const svgStr = chart.renderToSVGString();

    // 如果不再需要图表，调用 dispose 以释放内存
    chart.dispose();
    // 返回 SVG 字符串 或者进过运行校验的 ECharts 配置项
    return outputType === "svg"
      ? svgStr
      : JSON.stringify(echartsOption, null, 2);
  }

  // 其他输出类型（如 PNG）需要使用 Canvas
  const canvas = createCanvas(width, height) as unknown as HTMLCanvasElement;
  const chart = echarts.init(canvas, theme, {
    devicePixelRatio: 3,
  });

  echarts.setPlatformAPI({
    loadImage(src, onload, onerror) {
      const img = new Image();
      img.onload = onload.bind(img);
      img.onerror = onerror.bind(img);
      img.src = src;
      return img;
    },
  });

  chart.setOption({
    ...echartsOption,
    animation: false,
  });

  // @ts-ignore
  const buffer = canvas.toBuffer("image/png");

  chart.dispose();

  return buffer.toString("base64");
}
