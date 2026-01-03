"use client";
import React, { useMemo } from "react";
import { Collapse } from "antd";
import { monthStyles } from "@/app/constants";
import { GoalItem as GoalItemType } from "../types";
import GoalItem from "./GoalItem";
import MonthHeader from "./MonthHeader";

interface GoalGroupProps {
  mValue: number;
  monthFields: any[];
  currentGoals: GoalItemType[];
  onToggleComplete: (goal: GoalItemType) => void;
  onRemove: (goal: GoalItemType) => void;
}

const GoalGroup: React.FC<GoalGroupProps> = React.memo(
  ({ mValue, monthFields, currentGoals, onToggleComplete, onRemove }) => {
    const activeInMonth = useMemo(
      () => monthFields.filter((f) => !currentGoals[f.name]?.status),
      [monthFields, currentGoals]
    );

    const completedInMonth = useMemo(
      () => monthFields.filter((f) => currentGoals[f.name]?.status),
      [monthFields, currentGoals]
    );

    const style = monthStyles[mValue] || {
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: null,
    };

    return (
      <Collapse
        defaultActiveKey={[mValue]}
        className="bg-transparent! [&_.ant-collapse-header]:bg-gray-50! [&_.ant-collapse-header]:hover:bg-gray-100! [&_.ant-collapse-header]:transition-colors! "
        expandIconPlacement="end"
        items={[
          {
            key: mValue,
            label: <MonthHeader mValue={mValue} style={style} />,
            children: (
              <div className="flex flex-col gap-8 pt-4">
                {/* Active Goals Section */}
                {activeInMonth.length > 0 && (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-widest pl-2">
                        Pending · {activeInMonth.length}
                      </span>
                      <div className="h-px bg-blue-50 flex-1"></div>
                    </div>
                    <div className="flex flex-col gap-4">
                      {activeInMonth.map((field) => (
                        <GoalItem
                          key={field.key}
                          field={field}
                          task={currentGoals[field.name]}
                          onToggleComplete={onToggleComplete}
                          onRemove={onRemove}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed Goals Section */}
                {completedInMonth.length > 0 && (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-green-500 uppercase tracking-widest pl-2">
                        Completed · {completedInMonth.length}
                      </span>
                      <div className="h-px bg-green-50 flex-1"></div>
                    </div>
                    <div className="flex flex-col gap-4 transition-all duration-500">
                      {completedInMonth.map((field) => (
                        <GoalItem
                          key={field.key}
                          field={field}
                          task={currentGoals[field.name]}
                          onToggleComplete={onToggleComplete}
                          onRemove={onRemove}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />
    );
  }
);

GoalGroup.displayName = "GoalGroup";

export default GoalGroup;
