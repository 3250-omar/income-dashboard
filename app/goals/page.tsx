"use client";
import React, { useCallback } from "react";
import { Button, Checkbox, Form, Input, Progress, Tooltip, Empty } from "antd";
import {
  DeleteOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  RocketOutlined,
} from "@ant-design/icons";
const { List, Item } = Form;

interface SubItem {
  name: string;
  completed: boolean;
}

interface GoalItem {
  name: string;
  completed: boolean;
  subItems: SubItem[];
}

interface FormValues {
  goals: GoalItem[];
}

const Goals = () => {
  const [form] = Form.useForm<FormValues>();

  const onFinish = (values: FormValues) => {
    console.log("Saving Goals:", values);
  };

  // --- Helper Functions ---

  const toggleComplete = useCallback(
    (index: number, subIndex?: number) => {
      const goals = (form.getFieldValue("goals") as GoalItem[]) || [];

      if (subIndex !== undefined) {
        const subItems = [...(goals[index]?.subItems || [])];
        subItems[subIndex] = {
          ...subItems[subIndex],
          completed: !subItems[subIndex]?.completed,
        };
        goals[index] = { ...goals[index], subItems };
      } else {
        goals[index] = {
          ...goals[index],
          completed: !goals[index]?.completed,
        };
      }

      form.setFieldsValue({ goals });
    },
    [form]
  );

  const addSubItem = useCallback(
    (parentIndex: number) => {
      const goals = (form.getFieldValue("goals") as GoalItem[]) || [];
      const subItems = [...(goals[parentIndex]?.subItems || [])];
      subItems.push({ name: "", completed: false });
      goals[parentIndex] = { ...goals[parentIndex], subItems };
      form.setFieldsValue({ goals });

      // Focus new sub-item
      setTimeout(() => {
        const el = document.getElementById(
          `subtask-input-${parentIndex}-${subItems.length - 1}`
        );
        el?.focus();
      }, 0);
    },
    [form]
  );

  const removeSubItem = useCallback(
    (parentIndex: number, subIndex: number) => {
      const goals = (form.getFieldValue("goals") as GoalItem[]) || [];
      const subItems = [...(goals[parentIndex]?.subItems || [])];
      subItems.splice(subIndex, 1);
      goals[parentIndex] = { ...goals[parentIndex], subItems };
      form.setFieldsValue({ goals });
    },
    [form]
  );

  // --- Progress Logic ---

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-10">
      {/* Header Section */}
      <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <RocketOutlined className="text-3xl text-blue-500" />
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Financial Goals
          </h1>
        </div>
        <p className="text-gray-500 text-lg leading-relaxed">
          Set clear financial milestones for this month. Break them down into
          small actionable steps and watch your progress grow.
        </p>

        {/* Dynamic Progress Bar */}
        <Item noStyle shouldUpdate>
          {() => {
            const goals = (form.getFieldValue("goals") as GoalItem[]) || [];
            if (goals.length === 0) return null;

            const totalItems = goals.reduce(
              (acc, goal) => acc + 1 + (goal.subItems?.length || 0),
              0
            );
            const completedItems = goals.reduce(
              (acc, goal) =>
                acc +
                (goal.completed ? 1 : 0) +
                (goal.subItems?.filter((s) => s.completed).length || 0),
              0
            );
            const percent =
              Math.round((completedItems / totalItems) * 100) || 0;

            return (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Monthly Achievement
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {percent}% Complete
                  </span>
                </div>
                <Progress
                  percent={percent}
                  status="active"
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                  showInfo={false}
                  className="mb-0"
                />
              </div>
            );
          }}
        </Item>
      </div>

      <div className="w-full">
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            goals: [{ name: "", completed: false, subItems: [] }],
          }}
          layout="vertical"
        >
          <Item noStyle shouldUpdate>
            {() => (
              <List name="goals">
                {(fields, { add, remove }) => {
                  const goals =
                    (form.getFieldValue("goals") as GoalItem[]) || [];
                  const activeGoals = fields.filter(
                    (f) => !goals[f.name]?.completed
                  );
                  const completedGoals = fields.filter(
                    (f) => goals[f.name]?.completed
                  );
                  const hasEmptyActive = activeGoals.some(
                    (f) => !goals[f.name]?.name?.trim()
                  );

                  return (
                    <div className="flex flex-col gap-12">
                      {/* Active Tasks Section */}
                      <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center px-2">
                          <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
                            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                            Active Focus
                          </h2>
                          <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            onClick={() => {
                              add({ completed: false, subItems: [] });
                              setTimeout(() => {
                                const inputs = document.querySelectorAll(
                                  '[id^="task-input-"]'
                                );
                                (
                                  inputs[inputs.length - 1] as HTMLElement
                                )?.focus();
                              }, 0);
                            }}
                            disabled={hasEmptyActive}
                            className="shadow-md hover:shadow-lg transition-all rounded-lg h-10"
                          >
                            New Goal
                          </Button>
                        </div>

                        {activeGoals.length === 0 ? (
                          <div className="bg-gray-50 rounded-2xl p-10 border-2 border-dashed border-gray-200">
                            <Empty description="No active goals. Start by adding one above!" />
                          </div>
                        ) : (
                          <div className="flex flex-col gap-4">
                            {activeGoals.map((field) => {
                              const task = goals[field.name];
                              const isEmpty = !task?.name?.trim();

                              return (
                                <div
                                  key={field.key}
                                  className="group flex flex-col bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                  {/* Main Goal Row */}
                                  <div className="flex items-center gap-4">
                                    <Checkbox
                                      checked={task?.completed}
                                      onChange={() =>
                                        toggleComplete(field.name)
                                      }
                                      disabled={isEmpty}
                                      className="scale-125 ml-2"
                                    />
                                    <Item name={[field.name, "name"]} noStyle>
                                      <Input
                                        id={`task-input-${field.key}`}
                                        variant="borderless"
                                        placeholder="What's your goal today?"
                                        className="text-lg font-medium text-gray-700 px-0 focus:shadow-none"
                                      />
                                    </Item>

                                    <div className="flex items-center gap-1 ">
                                      <Tooltip title="Add sub-task">
                                        <Button
                                          type="text"
                                          icon={
                                            <PlusCircleOutlined className="text-blue-400" />
                                          }
                                          onClick={() => addSubItem(field.name)}
                                          disabled={isEmpty}
                                        />
                                      </Tooltip>
                                      <Tooltip title="Confirm">
                                        <Button
                                          type="text"
                                          icon={
                                            <CheckOutlined className="text-green-500" />
                                          }
                                          disabled={isEmpty}
                                        />
                                      </Tooltip>
                                      <Tooltip title="Delete">
                                        <Button
                                          type="text"
                                          danger
                                          icon={<DeleteOutlined />}
                                          onClick={() => remove(field.name)}
                                        />
                                      </Tooltip>
                                    </div>
                                  </div>

                                  {/* Sub-Items List */}
                                  {task?.subItems &&
                                    task.subItems.length > 0 && (
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
                                                onChange={() =>
                                                  toggleComplete(
                                                    field.name,
                                                    sIdx
                                                  )
                                                }
                                                disabled={subEmpty}
                                              />
                                              <Input
                                                id={`subtask-input-${field.name}-${sIdx}`}
                                                value={sub.name}
                                                onChange={(e) => {
                                                  const newGoals = [...goals];
                                                  newGoals[field.name].subItems[
                                                    sIdx
                                                  ].name = e.target.value;
                                                  form.setFieldsValue({
                                                    goals: newGoals,
                                                  });
                                                }}
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
                                                onClick={() =>
                                                  removeSubItem(
                                                    field.name,
                                                    sIdx
                                                  )
                                                }
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Completed Section */}
                      {completedGoals.length > 0 && (
                        <div className="flex flex-col gap-6 pt-10 border-t border-gray-100">
                          <h2 className="text-xl font-bold text-gray-400 flex items-center gap-2">
                            <span className="w-2 h-6 bg-gray-200 rounded-full"></span>
                            Accomplished ({completedGoals.length})
                          </h2>
                          <div className="flex flex-col gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {completedGoals.map((field) => {
                              const task = goals[field.name];
                              return (
                                <div
                                  key={field.key}
                                  className="flex flex-col bg-gray-50/50 rounded-xl p-4 border border-transparent hover:border-gray-200 transition-all"
                                >
                                  <div className="flex items-center gap-4">
                                    <Checkbox
                                      checked={task.completed}
                                      onChange={() =>
                                        toggleComplete(field.name)
                                      }
                                    />
                                    <span className="text-lg line-through text-gray-500 flex-1">
                                      {task.name}
                                    </span>
                                    <Button
                                      type="text"
                                      danger
                                      icon={<DeleteOutlined />}
                                      onClick={() => remove(field.name)}
                                    />
                                  </div>

                                  {task.subItems?.length > 0 && (
                                    <div className="ml-10 mt-2 flex flex-col gap-2 opacity-50">
                                      {task.subItems.map((sub, sIdx) => (
                                        <div
                                          key={sIdx}
                                          className="flex items-center gap-2 text-sm line-through text-gray-400"
                                        >
                                          <div className="w-1 h-1 bg-gray-300 rounded-full mx-1" />
                                          {sub.name}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }}
              </List>
            )}
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default Goals;
