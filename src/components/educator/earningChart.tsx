"use client";

import * as React from "react";
import { FrownIcon, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  earnings: {
    label: "Earnings",
  },
} satisfies ChartConfig;

export function EarningChart({ courseEarnings }: any) {
  const totalEarnings = courseEarnings.reduce(
    (acc: number, { earnings }: { earnings: number }) => acc + earnings,
    0
  );

  // sort chart data by earnings and limit to 5 courses and add all other courses to "others"
  let chartData = courseEarnings
    .sort((a: any, b: any) => b.earnings - a.earnings)
    .slice(0, 4);

  chartData = chartData.map((course: any, index: number) => ({
    courseId: course.courseId,
    earnings: course.earnings,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

  if (courseEarnings.length > 4) {
    const otherEarnings = courseEarnings
      .slice(4, courseEarnings.length)
      .reduce(
        (acc: number, { earnings }: { earnings: number }) => acc + earnings,
        0
      );

    chartData.push({
      courseId: "Others",
      earnings: otherEarnings,
      fill: `hsl(var(--chart-5))`,
    });

    console.log("chartData", chartData);
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] my-auto"
    >
      {totalEarnings == 0 ? (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <FrownIcon className="w-12 h-12 text-muted-foreground" />
          <p className="text-lg font-bold text-muted-foreground">
            No Earnings till now.
          </p>
        </div>
      ) : (
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="earnings"
            nameKey="courseId"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalEarnings.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        PHT Earned
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      )}
    </ChartContainer>
  );
}
