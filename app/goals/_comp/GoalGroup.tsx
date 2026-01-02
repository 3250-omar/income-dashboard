"use client";
import React from "react";
import dayjs from "dayjs";
import { Checkbox, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { monthStyles } from "@/app/constants";
import { GoalItem as GoalItemType } from "../types";
import GoalItem from "./GoalItem";

interface GoalGroupProps {
  mValue: number;
  monthFields: any[];
  currentGoals: GoalItemType[];
  onToggleComplete: (index: number, subIndex?: number) => void;
  onAddSubItem: (index: number) => void;
  onRemoveSubItem: (parentIndex: number, subIndex: number) => void;
  onRemove: (index: number) => void;
  onSubItemNameChange: (
    parentIndex: number,
    subIndex: number,
    value: string
  ) => void;
}

const GoalGroup: React.FC<GoalGroupProps> = ({
  mValue,
  monthFields,
  currentGoals,
  onToggleComplete,
  onAddSubItem,
  onRemoveSubItem,
  onRemove,
  onSubItemNameChange,
}) => {
  const activeInMonth = monthFields.filter(
    (f) => !currentGoals[f.name]?.completed
  );
  const completedInMonth = monthFields.filter(
    (f) => currentGoals[f.name]?.completed
  );

  const style = monthStyles[mValue] || {
    color: "text-blue-600",
    bg: "bg-blue-50",
    icon: null,
  };
  const Icon = style.icon;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider border border-transparent shadow-sm ${style.bg} ${style.color}`}
        >
          {Icon && <Icon size={16} />}
          {dayjs()
            .month(mValue - 1)
            .format("MMMM")}
        </div>
        <div className="h-px bg-gray-100 flex-1"></div>
      </div>

      {/* Active Tasks Section */}
      <div className="flex flex-col gap-6">
        {activeInMonth.length > 0 && (
          <div className="flex flex-col gap-4">
            {activeInMonth.map((field) => (
              <GoalItem
                key={field.key}
                field={field}
                task={currentGoals[field.name]}
                onToggleComplete={onToggleComplete}
                onAddSubItem={onAddSubItem}
                onRemoveSubItem={onRemoveSubItem}
                onRemove={onRemove}
                onSubItemNameChange={onSubItemNameChange}
              />
            ))}
          </div>
        )}
      </div>

      {/* Completed Section */}
      {completedInMonth.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {completedInMonth.map((field) => {
              const task = currentGoals[field.name];
              return (
                <div
                  key={field.key}
                  className="flex items-center gap-4 bg-gray-50/50 rounded-xl p-4 border border-transparent hover:border-gray-200 transition-all"
                >
                  <Checkbox
                    checked={task.completed}
                    onChange={() => onToggleComplete(field.name)}
                  />
                  <span className="text-lg line-through text-gray-500 flex-1">
                    {task.goal}
                  </span>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => onRemove(field.name)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalGroup;
