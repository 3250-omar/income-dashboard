"use client";
import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

interface GoalsFilterProps {
  listFilterMonth: number | null;
  onFilterChange: (date: dayjs.Dayjs | null) => void;
}

const GoalsFilter: React.FC<GoalsFilterProps> = ({
  listFilterMonth,
  onFilterChange,
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-bold text-gray-700 m-0">
        {listFilterMonth
          ? `${dayjs()
              .month(listFilterMonth - 1)
              .format("MMMM")} Goals`
          : "All Goals"}
      </h2>
      <Space>
        <span className="text-gray-400 text-sm">Filter by Month:</span>
        <DatePicker
          picker="month"
          placeholder="Show All"
          format="MMMM YYYY"
          onChange={onFilterChange}
          className="w-48 rounded-lg"
          value={listFilterMonth ? dayjs().month(listFilterMonth - 1) : null}
          allowClear
        />
      </Space>
    </div>
  );
};

export default GoalsFilter;
