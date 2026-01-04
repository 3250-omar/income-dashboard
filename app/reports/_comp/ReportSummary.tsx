"use client";
import React from "react";
import { Row, Col, Card, Statistic } from "antd";

interface ReportSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
  completedGoals: number;
  totalGoals: number;
}

export const ReportSummary: React.FC<ReportSummaryProps> = React.memo(
  ({
    totalIncome,
    totalExpenses,
    totalBalance,
    completedGoals,
    totalGoals,
  }) => {
    return (
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-shadow h-full bg-[#ffffff]"
          >
            <Statistic
              title={<span className="text-[#4b5563]">Total Income</span>}
              value={totalIncome}
              precision={2}
              prefix={<span className="text-[#3b82f6] mr-2">$</span>}
              styles={{ content: { color: "#111827" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-shadow h-full bg-[#ffffff]"
          >
            <Statistic
              title={<span className="text-[#4b5563]">Total Expenses</span>}
              value={totalExpenses}
              precision={2}
              prefix={<span className="text-[#ef4444] mr-2">$</span>}
              styles={{ content: { color: "#111827" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-shadow h-full bg-[#ffffff]"
          >
            <Statistic
              title={<span className="text-[#4b5563]">Account Balance</span>}
              value={totalBalance}
              precision={2}
              prefix={<span className="text-[#3b82f6] mr-2">$</span>}
              styles={{ content: { color: "#111827" } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-shadow h-full bg-[#ffffff]"
          >
            <Statistic
              title={<span className="text-[#4b5563]">Goals Progress</span>}
              value={completedGoals}
              suffix={`/ ${totalGoals}`}
              styles={{ content: { color: "#111827" } }}
            />
          </Card>
        </Col>
      </Row>
    );
  }
);

ReportSummary.displayName = "ReportSummary";
