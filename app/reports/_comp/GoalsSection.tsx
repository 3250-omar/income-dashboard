"use client";
import React from "react";
import { Card, Row, Col, Progress, Typography } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface GoalsSectionProps {
  goals: any[];
}

export const GoalsSection: React.FC<GoalsSectionProps> = React.memo(
  ({ goals }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal: any) => (
          <Card
            key={goal.id}
            variant="borderless"
            className="shadow-sm hover:shadow-md transition-shadow bg-[#ffffff]"
          >
            <Row align="middle" justify="space-between" gutter={16}>
              <Col flex="1">
                <Title level={4} className="m-0! text-[#111827]">
                  {goal.goal}
                </Title>
                <Text type="secondary" className="text-[#6b7280]">
                  Target Month: {dayjs(goal.month).format("MMMM")}
                </Text>
              </Col>
              <Col className="text-right">
                <Text strong className="block text-lg text-[#111827]">
                  ${goal.goal_amount || 0}
                </Text>
                <Progress
                  percent={goal.status ? 100 : 0}
                  status={goal.status ? "success" : "active"}
                  className="w-[120px] md:w-[150px]"
                  strokeColor={goal.status ? "#16a34a" : "#3b82f6"}
                />
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    );
  }
);

GoalsSection.displayName = "GoalsSection";
