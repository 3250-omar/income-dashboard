"use client";
import React from "react";
import { Form, DatePicker, Button, Space } from "antd";
import { RocketOutlined, PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Item } = Form;

interface GoalsHeaderProps {
  selectedMonthAdd: number | null;
  onAddClick: () => void;
  disabledDate: (current: dayjs.Dayjs) => boolean;
}

const GoalsHeader: React.FC<GoalsHeaderProps> = ({
  selectedMonthAdd,
  onAddClick,
  disabledDate,
}) => {
  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RocketOutlined className="text-3xl text-blue-500" />
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Financial Goals
          </h1>
        </div>
        <Space size="large">
          <Item name="month" noStyle>
            <DatePicker
              picker="month"
              placeholder="Month for New Goal"
              format="MMMM YYYY"
              disabledDate={disabledDate}
              className="w-56 h-10 rounded-lg"
            />
          </Item>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={onAddClick}
            disabled={!selectedMonthAdd}
            className="shadow-md hover:shadow-lg transition-all rounded-lg h-10"
          >
            Add Goal
          </Button>
        </Space>
      </div>
      <p className="text-gray-500 text-lg leading-relaxed">
        {selectedMonthAdd
          ? `Ready to set a new goal for ${dayjs()
              .month(selectedMonthAdd - 1)
              .format("MMMM")}? Select it above and click "Add Goal".`
          : "Select a month in the header to start adding new financial goals."}
      </p>
    </div>
  );
};

export default GoalsHeader;
