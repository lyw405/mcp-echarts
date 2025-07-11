import { describe, expect, it } from "vitest";
import { generateEChartsTool } from "../../src/tools";
import { zodToJsonSchema } from "../schema";
import expects from "./generate-echarts.json";

describe("schema check", () => {
  it("echarts schema", () => {
    const { run, inputSchema, ...rest } = generateEChartsTool;

    expect({
      ...rest,
      inputSchema: zodToJsonSchema(inputSchema),
    }).toEqual(expects);
  });
});
