"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
const chartConfig = {
  informatika: {
    label: "S1 - Informatika",
    color: "#2563eb",
    // color: "hsl(var(--chart-1))",
  },
  industri: {
    label: "S1 - Teknik Industri",
    color: "#60a5fa",
    // color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
export function ChartAdmin({ chartData }: any) {
  //   console.log("chart", chartData);
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="total"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="informatika" fill="var(--color-informatika)" radius={4} />
        <Bar dataKey="industri" fill="var(--color-industri)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
