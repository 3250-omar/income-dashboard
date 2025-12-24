"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const data = [
  { name: "Housing", value: 35, color: "#3b82f6" },
  { name: "Food", value: 20, color: "#f87171" },
  { name: "Transport", value: 15, color: "#2dd4bf" },
  { name: "Entertainment", value: 10, color: "#fbbf24" },
  { name: "Other", value: 20, color: "#a855f7" },
];

const chartConfig = {
  housing: { label: "Housing", color: "#3b82f6" },
  food: { label: "Food", color: "#f87171" },
  transport: { label: "Transport", color: "#2dd4bf" },
  entertainment: { label: "Entertainment", color: "#fbbf24" },
  other: { label: "Other", color: "#a855f7" },
} satisfies ChartConfig;

export function ExpenseBreakdown() {
  return (
    <Card className="border-none shadow-sm bg-white rounded-2xl h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-800">
          Expense Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                  formatter={(value, entry) => {
                    const payload = entry?.payload as
                      | { value: number }
                      | undefined;
                    return (
                      <span className="text-xs font-bold text-slate-500 ml-2">
                        {value}{" "}
                        <span className="text-slate-400 font-medium">
                          {payload?.value}%
                        </span>
                      </span>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
