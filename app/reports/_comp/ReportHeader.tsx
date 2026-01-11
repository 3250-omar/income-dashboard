"use client";
import React from "react";
import { Image, Typography } from "antd";

import dayjs from "dayjs";

const { Title, Text } = Typography;

interface ReportHeaderProps {
  category: string;
  userData: any | undefined;
}

export const ReportHeader: React.FC<ReportHeaderProps> = React.memo(
  ({ category, userData }) => {
    return (
      <div className="flex justify-between items-center border-b border-[#f3f4f6] pb-6 max-sm:flex-col max-sm:gap-4 ">
        <div>
          <Title
            level={2}
            className="m-0! text-[#3b82f6] capitalize max-sm:text-xl"
          >
            {category} Report
          </Title>
          <Text type="secondary" className="text-[#6b7280] max-sm:text-sm">
            Generated on {dayjs().format("YYYY-MM-DD")}
          </Text>
        </div>
        <Image
          src={userData?.image_url || "/user-icematte_161669-211.webp"}
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <div className="text-right max-sm:text-center">
          <Text strong className="block text-lg text-[#111827]">
            Financial Overview
          </Text>
          <Text type="secondary" className="text-[#6b7280]">
            {userData?.name}- {userData?.email}
          </Text>
        </div>
      </div>
    );
  }
);

ReportHeader.displayName = "ReportHeader";
