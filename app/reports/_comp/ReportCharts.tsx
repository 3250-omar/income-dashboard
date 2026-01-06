"use client";
import React from "react";
import { Row, Col, Card } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface ReportChartsProps {
  categoryData: Array<{ name: string; value: number }>;
  summaryData: Array<{ name: string; amount: number }>;
  colors: string[];
}

export const ReportCharts: React.FC<ReportChartsProps> = React.memo(
  ({ categoryData, summaryData, colors }) => {
    console.log(
      "🚀 ~ summaryData:",
      summaryData.filter((item) => item.amount > 0)
    );
    return (
      <Row gutter={[24, 24]}>
        {categoryData?.length ? (
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="py-2.5 text-[#111827] max-sm:text-sm">
                  Spending by Category
                </div>
              }
              styles={{
                body: {
                  padding: "0",
                },
              }}
              variant="borderless"
              className="shadow-sm h-full bg-[#ffffff] "
            >
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Pie>
                    <ReTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
        ) : (
          <Col xs={24} lg={12}>
            <div className="flex items-center justify-center h-[380px] bg-white rounded-2xl border border-dashed border-[#10b981]">
              <span className="font-semibold text-xl text-[#10b981]">
                You Have no Expenses Yet
              </span>
            </div>
          </Col>
        )}

        <Col xs={24} lg={12}>
          {summaryData?.filter((item) => item.amount > 0)?.length ? (
            <Card
              title={
                <div className="py-2.5 text-[#111827]">Income vs Expenses</div>
              }
              variant="borderless"
              className="shadow-sm h-full bg-[#ffffff]"
            >
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summaryData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3f4f6"
                    />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <ReTooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="amount"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      barSize={60}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-[380px] bg-white rounded-2xl border border-dashed border-[#3b82f6]">
              <span className="font-semibold text-xl text-[#3b82f6]">
                You Have no Transactions Yet
              </span>
            </div>
          )}
        </Col>
      </Row>
    );
  }
);

ReportCharts.displayName = "ReportCharts";
