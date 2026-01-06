import React, { useMemo } from "react";
import { DatePicker, Space, Select } from "antd";
import dayjs from "dayjs";

interface GoalsFilterProps {
  listFilterMonth: number | null;
  onFilterChange: (date: dayjs.Dayjs | null) => void;
  listFilterStatus: boolean | null;
  onStatusChange: (status: boolean | null) => void;
}

const STATUS_OPTIONS = [
  { label: "All", value: undefined },
  { label: "Pending", value: false },
  { label: "Completed", value: true },
];

const GoalsFilter: React.FC<GoalsFilterProps> = React.memo(
  ({ listFilterMonth, onFilterChange, listFilterStatus, onStatusChange }) => {
    const headerTitle = useMemo(() => {
      if (listFilterMonth) {
        return `${dayjs()
          .month(listFilterMonth - 1)
          .format("MMMM")} Goals`;
      }
      return "All Goals";
    }, [listFilterMonth]);

    const datePickerValue = useMemo(() => {
      return listFilterMonth ? dayjs().month(listFilterMonth - 1) : undefined;
    }, [listFilterMonth]);

    return (
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm max-sm:flex-col max-sm:gap-4">
        <h2 className="text-lg font-bold text-gray-700 m-0">{headerTitle}</h2>
        <Space size="large" className="max-sm:flex-col max-sm:gap-4">
          <Space>
            <span className="text-gray-400 text-sm">Status:</span>
            <Select
              placeholder="All Status"
              className="w-32 max-sm:w-full"
              value={listFilterStatus}
              onChange={onStatusChange}
              allowClear
              options={STATUS_OPTIONS}
            />
          </Space>
          <Space>
            <span className="text-gray-400 text-sm">Filter by Month:</span>
            <DatePicker
              picker="month"
              placeholder="Show All"
              format="MMMM YYYY"
              onChange={onFilterChange}
              className="w-48 max-sm:w-full rounded-lg"
              value={datePickerValue}
              allowClear
            />
          </Space>
        </Space>
      </div>
    );
  }
);

GoalsFilter.displayName = "GoalsFilter";

export default GoalsFilter;
