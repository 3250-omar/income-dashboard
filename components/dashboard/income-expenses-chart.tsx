"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const data = [
  { name: "Apr 1", income: 2500, expenses: 1500, trend: 2200 },
  { name: "Apr 10", income: 3000, expenses: 1800, trend: 2600 },
  { name: "Apr 17", income: 3200, expenses: 1600, trend: 3000 },
  { name: "Apr 20", income: 3500, expenses: 2200, trend: 3300 },
  { name: "Apr 25", income: 3100, expenses: 2500, trend: 3500 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--primary))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--destructive))",
  },
  trend: {
    label: "Trend",
    color: "#f59e0b",
  },
} satisfies ChartConfig;

export function IncomeExpensesChart() {
  return (
    <Card className="border-none shadow-sm bg-white rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-slate-800">
          Income & Expenses
        </CardTitle>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {["This Month", "Last Month", "Year"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === "This Month"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  content={<ChartTooltipContent />}
                  cursor={{ fill: "#f8fafc" }}
                />
                <Bar
                  dataKey="income"
                  fill="var(--color-income)"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Bar
                  dataKey="expenses"
                  fill="var(--color-expenses)"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Line
                  type="monotone"
                  dataKey="trend"
                  stroke="var(--color-trend)"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#f59e0b",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => (
                    <span className="text-xs font-bold text-slate-500 capitalize">
                      {value}
                    </span>
                  )}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
