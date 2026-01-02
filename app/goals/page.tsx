"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Form, Empty, Spin } from "antd";
import { useGetGoals } from "@/components/helpers/useGetGoals";
import { useCreateGoal } from "@/components/helpers/useCreateGoal";
import AddGoalModal from "../_comp/modals/AddGoalModal";
import dayjs from "dayjs";
import { GoalItem as GoalItemType } from "./types";
import GoalsHeader from "./_comp/GoalsHeader";
import GoalsFilter from "./_comp/GoalsFilter";
import GoalGroup from "./_comp/GoalGroup";
import { Spinner } from "@/components/ui/spinner";

const { Item } = Form;

interface DBGoal {
  goal: string;
  completed?: boolean;
  sub_items?: any[];
  month?: number;
}

interface FormValues {
  goals: GoalItemType[];
  month: any;
}

const Goals = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listFilterMonth, setListFilterMonth] = useState<number | null>(null);

  const [form] = Form.useForm<FormValues>();
  const selectedMonthValue = Form.useWatch("month", form);
  const selectedMonthAdd = selectedMonthValue
    ? dayjs(selectedMonthValue).month() + 1
    : null;

  const { data: goals, isLoading } = useGetGoals(listFilterMonth ?? undefined);

  useEffect(() => {
    if (goals) {
      const mappedGoals = (goals as DBGoal[]).map((g) => ({
        goal: g.goal,
        completed: g.completed || false,
        subItems: g.sub_items || [],
        month: g.month || 1,
      }));

      mappedGoals.sort((a, b) => a.month - b.month);
      form.setFieldsValue({ goals: mappedGoals });
    }
  }, [goals, form]);

  const onFinish = (values: FormValues) => {
    console.log("Saving Goals:", values);
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf("month");
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const toggleComplete = useCallback(
    (index: number, subIndex?: number) => {
      const currentGoals =
        (form.getFieldValue("goals") as GoalItemType[]) || [];
      const newGoals = [...currentGoals];

      if (subIndex !== undefined) {
        const subItems = [...(newGoals[index]?.subItems || [])];
        subItems[subIndex] = {
          ...subItems[subIndex],
          completed: !subItems[subIndex]?.completed,
        };
        newGoals[index] = { ...newGoals[index], subItems };
      } else {
        newGoals[index] = {
          ...newGoals[index],
          completed: !newGoals[index]?.completed,
        };
      }

      form.setFieldsValue({ goals: newGoals });
    },
    [form]
  );

  const addSubItem = useCallback(
    (parentIndex: number) => {
      const currentGoals =
        (form.getFieldValue("goals") as GoalItemType[]) || [];
      const newGoals = [...currentGoals];
      const subItems = [...(newGoals[parentIndex]?.subItems || [])];
      subItems.push({ name: "", completed: false });
      newGoals[parentIndex] = { ...newGoals[parentIndex], subItems };
      form.setFieldsValue({ goals: newGoals });

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
      const currentGoals =
        (form.getFieldValue("goals") as GoalItemType[]) || [];
      const newGoals = [...currentGoals];
      const subItems = [...(newGoals[parentIndex]?.subItems || [])];
      subItems.splice(subIndex, 1);
      newGoals[parentIndex] = { ...newGoals[parentIndex], subItems };
      form.setFieldsValue({ goals: newGoals });
    },
    [form]
  );

  const handleSubItemNameChange = useCallback(
    (parentIndex: number, subIndex: number, value: string) => {
      const currentGoals =
        (form.getFieldValue("goals") as GoalItemType[]) || [];
      const newGoals = [...currentGoals];
      newGoals[parentIndex].subItems[subIndex].name = value;
      form.setFieldsValue({ goals: newGoals });
    },
    [form]
  );

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <div className="max-w-4xl mx-auto p-6 flex flex-col gap-10">
        <GoalsHeader
          selectedMonthAdd={selectedMonthAdd}
          onAddClick={showModal}
          disabledDate={disabledDate}
        />

        <div className="w-full flex flex-col gap-6">
          <GoalsFilter
            listFilterMonth={listFilterMonth}
            onFilterChange={(date) =>
              setListFilterMonth(date ? date.month() + 1 : null)
            }
          />

          <div className="w-full">
            <Item noStyle shouldUpdate>
              {() => (
                <Form.List name="goals">
                  {(fields, { remove }) => {
                    const currentGoals =
                      (form.getFieldValue("goals") as GoalItemType[]) || [];

                    const groups: Record<number, typeof fields> = {};
                    fields.forEach((field) => {
                      const m = currentGoals[field.name]?.month || 0;
                      if (!groups[m]) groups[m] = [];
                      groups[m].push(field);
                    });

                    const sortedMonths = Object.keys(groups)
                      .map(Number)
                      .sort((a, b) => a - b);

                    if (sortedMonths.length === 0) {
                      return (
                        <div className="bg-gray-50 rounded-2xl p-10 border-2 border-dashed border-gray-200">
                          <Empty description="No goals found." />
                        </div>
                      );
                    }

                    return (
                      <div className="flex flex-col gap-12">
                        {sortedMonths.map((mValue) => (
                          <GoalGroup
                            key={mValue}
                            mValue={mValue}
                            monthFields={groups[mValue]}
                            currentGoals={currentGoals}
                            onToggleComplete={toggleComplete}
                            onAddSubItem={addSubItem}
                            onRemoveSubItem={removeSubItem}
                            onRemove={remove}
                            onSubItemNameChange={handleSubItemNameChange}
                          />
                        ))}
                      </div>
                    );
                  }}
                </Form.List>
              )}
            </Item>
          </div>
        </div>
      </div>

      <AddGoalModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        selectedMonth={selectedMonthAdd}
      />
    </Form>
  );
};

export default Goals;
