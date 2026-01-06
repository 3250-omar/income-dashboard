"use client";
import React, { useMemo, useCallback } from "react";
import { Form, DatePicker, Button, Space } from "antd";
import { RocketOutlined, PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useUserStore } from "@/app/store/user_store";

const { Item } = Form;

interface GoalsHeaderProps {
  disabledDate: (current: dayjs.Dayjs) => boolean;
}

const GoalsHeader: React.FC<GoalsHeaderProps> = React.memo(
  ({ disabledDate }) => {
    const selectedMonthAdd = useUserStore((state) => state.selectedMonth);
    const setSelectedMonthAdd = useUserStore((state) => state.setSelectedMonth);
    const setOpenAddGoalDialog = useUserStore(
      (state) => state.setAddGoalDialog
    );

    const handleMonthChange = useCallback(
      (e: dayjs.Dayjs | null) => {
        setSelectedMonthAdd(e?.month() ? e.month() + 1 : undefined);
      },
      [setSelectedMonthAdd]
    );

    const handleAddGoal = useCallback(() => {
      setOpenAddGoalDialog(true);
    }, [setOpenAddGoalDialog]);

    const descriptionText = useMemo(() => {
      if (selectedMonthAdd) {
        const monthName = dayjs()
          .month(selectedMonthAdd - 1)
          .format("MMMM");
        return `Ready to set a new goal for ${monthName}? Select it above and click "Add Goal".`;
      }
      return "Select a month in the header to start adding new financial goals.";
    }, [selectedMonthAdd]);

    return (
      <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-4">
          <div className="flex items-center gap-3">
            <RocketOutlined className="text-3xl text-blue-500" />
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight max-sm:text-xl">
              Financial Goals
            </h1>
          </div>
          <Space size="large" className="max-sm:flex-col max-sm:gap-4">
            <Item name="month" noStyle>
              <DatePicker
                picker="month"
                placeholder="Month for New Goal"
                format="MMMM YYYY"
                disabledDate={disabledDate}
                onChange={handleMonthChange}
                className="w-56 h-10 rounded-lg"
              />
            </Item>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={handleAddGoal}
              disabled={!selectedMonthAdd}
              className="shadow-md hover:shadow-lg transition-all rounded-lg h-10 max-sm:w-56"
            >
              Add Goal
            </Button>
          </Space>
        </div>
        <p className="text-gray-500 text-lg leading-relaxed">
          {descriptionText}
        </p>
      </div>
    );
  }
);

GoalsHeader.displayName = "GoalsHeader";

export default GoalsHeader;
