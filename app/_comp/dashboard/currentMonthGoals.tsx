"use client";

import { useUserStore } from "@/app/store/user_store";
import { useGetGoals } from "@/components/helpers/useGetGoals";
import {
  useDeleteGoal,
  useUpdateGoal,
} from "@/components/helpers/useUpdateGoal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Popconfirm, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import { Flame, PlusCircleIcon } from "lucide-react";
import { memo } from "react";

const CurrentMonthGoals = () => {
  const currentMonth = dayjs().month() + 1;
  const { data: goals, isPending } = useGetGoals(currentMonth);
  const setOpenAddGoalDialog = useUserStore((state) => state.setAddGoalDialog);
  const setEditingGoal = useUserStore((state) => state.setEditingGoal);
  const setSelectedMonth = useUserStore((state) => state.setSelectedMonth);
  const { mutateAsync: deleteGoal } = useDeleteGoal();
  const { mutateAsync: updateGoal } = useUpdateGoal();

  const handleEdit = (goal: any) => {
    setEditingGoal(goal);
    setOpenAddGoalDialog(true);
  };

  const handleToggleStatus = (goal: any) => {
    updateGoal({
      id: goal.id,
      status: !goal.status,
    });
  };
  const handleAddNewGoal = () => {
    setOpenAddGoalDialog(true);
    setSelectedMonth(dayjs().month() + 1);
  };
  if (!goals?.length) {
    return (
      <Card className="flex items-center justify-center font-bold shadow-sm">
        <div className="text-gray-500 text-center py-4">
          You haven't set any goals for this month yet!
          <Button type="link" onClick={() => setOpenAddGoalDialog(true)}>
            Make one Now
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="flex flex-col gap-4 shadow-sm h-full"
      styles={{ body: { padding: "1.5rem" } }}
      loading={isPending}
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold flex items-center gap-2 text-gray-800">
          Current Month Goals{" "}
          <Flame className="text-orange-500 fill-orange-500" size={20} />
        </h1>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusCircleIcon size={18} />}
          onClick={handleAddNewGoal}
          title="Add Goal For Current Month"
          className="flex items-center justify-center bg-black hover:bg-gray-800 border-none"
        />
      </div>

      <div className="flex flex-col gap-3 w-full">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
              goal.status
                ? "bg-green-50/30 border-green-100 opacity-75"
                : "bg-white border-gray-100 hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <Checkbox
                checked={goal.status}
                onChange={() => handleToggleStatus(goal)}
                className="scale-110"
              />
              <span
                className={`font-medium text-sm flex-1 ${
                  goal.status ? "text-gray-400 line-through" : "text-gray-700"
                }`}
              >
                {goal.goal}
              </span>
              <Tag
                color={goal.status ? "success" : "processing"}
                className="rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wider border-0"
              >
                {goal.status ? "Completed" : "Pending"}
              </Tag>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
              <Tooltip title="Edit">
                <Button
                  type="text"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(goal)}
                  className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                />
              </Tooltip>
              <Popconfirm
                title="Delete the goal"
                description="Are you sure to delete this goal?"
                onConfirm={() => deleteGoal(goal.id)}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Delete">
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </Popconfirm>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default memo(CurrentMonthGoals);
