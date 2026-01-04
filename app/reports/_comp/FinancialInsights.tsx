"use client";
import React from "react";
import { Row, Col, Card, Statistic, Typography, Tag } from "antd";
import { TrendingUp, TrendingDown, Target, Zap } from "lucide-react";

const { Text } = Typography;

interface FinancialInsightsProps {
  savingsRate: number;
  burnRate: number;
  topCategory: { name: string; value: number } | null;
  netSavings: number;
  expenseRatio: number;
  avgTransactionSize: number;
}

export const FinancialInsights: React.FC<FinancialInsightsProps> = React.memo(
  ({
    savingsRate,
    burnRate,
    topCategory,
    netSavings,
    expenseRatio,
    avgTransactionSize,
  }) => {
    return (
      <div className="space-y-4">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={6}>
            <Card className="shadow-sm bg-[#ffffff] border-l-4 border-[#16a34a] h-full">
              <Text
                type="secondary"
                className="text-[#4b5563] flex items-center gap-2 mb-2"
              >
                <TrendingUp className="w-4 h-4 text-[#16a34a]" /> Savings Rate
              </Text>
              <Statistic
                value={savingsRate}
                suffix="%"
                precision={1}
                styles={{ content: { color: "#111827", fontWeight: 700 } }}
              />
              <div className="mt-2">
                <Tag color="success" className="rounded-full">
                  {savingsRate > 20 ? "Excellent" : "Healthy"}
                </Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Card className="shadow-sm bg-[#ffffff] border-l-4 border-[#ef4444] h-full">
              <Text
                type="secondary"
                className="text-[#4b5563] flex items-center gap-2 mb-2"
              >
                <TrendingDown className="w-4 h-4 text-[#ef4444]" /> Net Savings
              </Text>
              <Statistic
                value={netSavings}
                prefix="$"
                precision={2}
                styles={{ content: { color: "#111827", fontWeight: 700 } }}
              />
              <div className="mt-2 text-xs text-[#6b7280]">
                Surplus after all expenses
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Card className="shadow-sm bg-[#ffffff] border-l-4 border-[#3b82f6] h-full">
              <Text
                type="secondary"
                className="text-[#4b5563] flex items-center gap-2 mb-2"
              >
                <Target className="w-4 h-4 text-[#3b82f6]" /> Expense Ratio
              </Text>
              <Statistic
                value={expenseRatio}
                suffix="%"
                precision={1}
                styles={{ content: { color: "#111827", fontWeight: 700 } }}
              />
              <div className="mt-2 text-xs text-[#6b7280]">
                Portion of income spent
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Card className="shadow-sm bg-[#ffffff] border-l-4 border-[#f59e0b] h-full">
              <Text
                type="secondary"
                className="text-[#4b5563] flex items-center gap-2 mb-2"
              >
                <Zap className="w-4 h-4 text-[#f59e0b]" /> Avg. Transaction
              </Text>
              <Statistic
                value={avgTransactionSize}
                prefix="$"
                precision={2}
                styles={{ content: { color: "#111827", fontWeight: 700 } }}
              />
              <div className="mt-2 text-xs text-[#6b7280]">
                Average cost per entry
              </div>
            </Card>
          </Col>
        </Row>

        {topCategory && (
          <Card className="shadow-sm bg-[#ffffff] border-l-4 border-[#8b5cf6]">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#f5f3ff] rounded-xl text-[#8b5cf6]">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <Text type="secondary" className="text-[#4b5563]">
                  Top Expense Driver
                </Text>
                <div className="flex items-center justify-between">
                  <Text strong className="text-lg text-[#111827] capitalize">
                    {topCategory.name}
                  </Text>
                  <Text className="text-[#6b7280] font-semibold">
                    ${topCategory.value.toFixed(2)} total
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }
);

FinancialInsights.displayName = "FinancialInsights";
