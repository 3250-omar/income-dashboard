"use client";
import React from "react";
import { Form, Checkbox, Input, Tooltip, Button } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { GoalItem as GoalItemType } from "../types";

const { Item } = Form;

interface GoalItemProps {
  field: {
    name: number;
    key: number;
    [key: string]: any;
  };
  task: GoalItemType;
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

const GoalItem: React.FC<GoalItemProps> = ({
  field,
  task,
  onToggleComplete,
  onAddSubItem,
  onRemoveSubItem,
  onRemove,
  onSubItemNameChange,
}) => {
  const isEmpty = !task?.goal?.trim();

  return (
    <div className="group flex flex-col bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Main Goal Row */}
      <div className="flex items-center gap-4">
        <Checkbox
          checked={task?.completed}
          onChange={() => onToggleComplete(field.name)}
          disabled={isEmpty}
          className="scale-125 ml-2"
        />
        <Item name={[field.name, "goal"]} noStyle>
          <Input
            variant="borderless"
            placeholder="What's your goal?"
            className="text-lg font-medium text-gray-700 px-0 focus:shadow-none"
          />
        </Item>

        <div className="flex items-center gap-1 ">
          <Tooltip title="Add sub-task">
            <Button
              type="text"
              icon={<PlusCircleOutlined className="text-blue-400" />}
              onClick={() => onAddSubItem(field.name)}
              disabled={isEmpty}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onRemove(field.name)}
            />
          </Tooltip>
        </div>
      </div>

      {/* Sub-Items List */}
      {task?.subItems && task.subItems.length > 0 && (
        <div className="ml-10 mt-3 pl-4 border-l-2 border-gray-100 flex flex-col gap-3">
          {task.subItems.map((sub, sIdx) => {
            const subEmpty = !sub.name?.trim();
            return (
              <div
                key={`${field.key}-sub-${sIdx}`}
                className="flex items-center gap-3"
              >
                <Checkbox
                  checked={sub.completed}
                  onChange={() => onToggleComplete(field.name, sIdx)}
                  disabled={subEmpty}
                />
                <Input
                  id={`subtask-input-${field.name}-${sIdx}`}
                  value={sub.name}
                  onChange={(e) =>
                    onSubItemNameChange(field.name, sIdx, e.target.value)
                  }
                  variant="borderless"
                  placeholder="Task detail..."
                  className="text-gray-600 px-0 text-sm py-1"
                />
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={
                    <DeleteOutlined className="text-gray-300 hover:text-red-500" />
                  }
                  onClick={() => onRemoveSubItem(field.name, sIdx)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GoalItem;
