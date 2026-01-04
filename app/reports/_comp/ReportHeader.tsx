"use client";
import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

interface ReportHeaderProps {
  category: string;
  generatedDate: string;
  userEmail: string | undefined;
}

export const ReportHeader: React.FC<ReportHeaderProps> = React.memo(
  ({ category, generatedDate, userEmail }) => {
    return (
      <div className="flex justify-between items-end border-b border-[#f3f4f6] pb-6">
        <div>
          <Title level={2} className="m-0! text-[#3b82f6] capitalize">
            {category} Report
          </Title>
          <Text type="secondary" className="text-[#6b7280]">
            Generated on {generatedDate}
          </Text>
        </div>
        <div className="text-right">
          <Text strong className="block text-lg text-[#111827]">
            Financial Overview
          </Text>
          <Text type="secondary" className="text-[#6b7280]">
            {userEmail}
          </Text>
        </div>
      </div>
    );
  }
);

ReportHeader.displayName = "ReportHeader";
