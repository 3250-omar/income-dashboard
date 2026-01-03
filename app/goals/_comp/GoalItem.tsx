import React, { useCallback, useMemo } from "react";
import { Form, Checkbox, Input, Tooltip, Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { monthStyles } from "@/app/constants";
import { GoalItem as GoalItemType } from "../types";
import { useUserStore } from "@/app/store/user_store";

const { Item } = Form;

interface GoalItemProps {
  field: {
    name: number;
    key: number;
    isListField: boolean;
    fieldKey: number;
    [key: string]: any;
  };
  task: GoalItemType;
  onToggleComplete: (goal: GoalItemType) => void;
  onRemove: (goal: GoalItemType) => void;
}

const GoalItem: React.FC<GoalItemProps> = React.memo(
  ({ field, task, onToggleComplete, onRemove }) => {
    const setAddGoalDialog = useUserStore((state) => state.setAddGoalDialog);
    const setEditingGoal = useUserStore((state) => state.setEditingGoal);

    const isFinished = useMemo(() => task?.status, [task?.status]);
    const isEmpty = useMemo(() => !task?.goal?.trim(), [task?.goal]);
    const hasGoalAmount = useMemo(
      () => task.goal_amount !== undefined && task.goal_amount !== null,
      [task.goal_amount]
    );

    const handleEdit = useCallback(() => {
      setEditingGoal(task);
      setAddGoalDialog(true);
    }, [task, setEditingGoal, setAddGoalDialog]);

    const handleToggle = useCallback(() => {
      onToggleComplete(task);
    }, [task, onToggleComplete]);

    const handleRemove = useCallback(() => {
      onRemove(task);
    }, [task, onRemove]);

    const containerClassName = useMemo(
      () =>
        `group flex flex-col bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 ${
          isFinished
            ? "border-green-100 bg-green-50/20 opacity-75"
            : "border-gray-100"
        }`,
      [isFinished]
    );

    const inputClassName = useMemo(
      () =>
        `text-lg font-medium px-0 focus:shadow-none p-0 h-auto ${
          isFinished ? "text-gray-400 line-through" : "text-gray-800"
        }`,
      [isFinished]
    );

    return (
      <div className={containerClassName}>
        {/* Hidden ID Field */}
        <Item name={[field.name, "id"]} hidden>
          <Input />
        </Item>

        {/* Main Goal Row */}
        <div className="flex items-center gap-4">
          <Item name={[field.name, "status"]} valuePropName="checked" noStyle>
            <Checkbox
              onChange={handleToggle}
              disabled={isEmpty}
              className="scale-125 ml-2"
            />
          </Item>
          <div className="flex-1 flex gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide w-12">
                Goal:
              </span>
              <Item name={[field.name, "goal"]} noStyle>
                <Input
                  variant="borderless"
                  placeholder="What's your goal?"
                  className={inputClassName}
                  readOnly
                />
              </Item>
            </div>
            {hasGoalAmount && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide w-12">
                  Target:
                </span>
                <span className="text-sm font-semibold text-gray-600">
                  ${task.goal_amount}
                </span>
              </div>
            )}
          </div>
          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <Tooltip title="Edit">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={handleEdit}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-600 hover:bg-blue-50"
              />
            </Tooltip>
            <Popconfirm
              title="Delete the goal"
              description="Are you sure to delete this goal?"
              onConfirm={handleRemove}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete">
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </Tooltip>
            </Popconfirm>
          </div>
        </div>
      </div>
    );
  }
);

GoalItem.displayName = "GoalItem";

export default GoalItem;
