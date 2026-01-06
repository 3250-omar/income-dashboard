"use client";
import { useCallback, useEffect, useState, useMemo } from "react";
import { Form, Empty, Spin } from "antd";
import { useGetGoals } from "@/components/helpers/useGetGoals";
import {
  useUpdateGoal,
  useDeleteGoal,
} from "@/components/helpers/useUpdateGoal";
import dayjs from "dayjs";
import { GoalItem as GoalItemType } from "./types";
import GoalsHeader from "./_comp/GoalsHeader";
import GoalsFilter from "./_comp/GoalsFilter";
import GoalGroup from "./_comp/GoalGroup";
import { useUserStore } from "../store/user_store";

const { Item } = Form;

interface DBGoal {
  id: string;
  goal: string;
  status?: boolean;
  month?: number;
  goal_amount?: number;
}

interface FormValues {
  goals: GoalItemType[];
  month: any;
}

const Goals = () => {
  const [listFilterMonth, setListFilterMonth] = useState<number | null>(null);
  const [listFilterStatus, setListFilterStatus] = useState<boolean | null>(
    null
  );
  const setSelectedMonth = useUserStore((state) => state.setSelectedMonth);
  const [form] = Form.useForm<FormValues>();
  const selectedMonthValue = Form.useWatch("month", form);

  const selectedMonthAdd = useMemo(
    () =>
      selectedMonthValue ? dayjs(selectedMonthValue).month() + 1 : undefined,
    [selectedMonthValue]
  );

  const { mutateAsync: updateGoal } = useUpdateGoal();
  const { mutateAsync: deleteGoal } = useDeleteGoal();

  useEffect(() => {
    setSelectedMonth(selectedMonthAdd);
  }, [selectedMonthAdd, setSelectedMonth]);

  const { data: goals, isLoading } = useGetGoals(
    listFilterMonth ?? undefined,
    listFilterStatus ?? undefined
  );

  // Memoize the mapped and sorted goals to prevent unnecessary recalculations
  const mappedGoals = useMemo(() => {
    if (!goals) return [];

    const mapped = (goals as DBGoal[]).map((g) => ({
      id: g.id,
      goal: g.goal,
      status: g.status || false,
      month: g.month || 1,
      goal_amount: g.goal_amount,
    }));

    return mapped.sort((a, b) => a.month - b.month);
  }, [goals]);

  useEffect(() => {
    if (mappedGoals.length > 0) {
      form.setFieldsValue({ goals: mappedGoals });
    }
  }, [mappedGoals, form]);

  const onFinish = useCallback((values: FormValues) => {
    console.log("Saving Goals:", values);
  }, []);

  const disabledDate = useCallback((current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf("month");
  }, []);

  const toggleComplete = useCallback(
    (goal: GoalItemType) => {
      if (!goal.id) {
        console.error("Goal ID not found for update:", goal);
        return;
      }

      updateGoal({
        id: goal.id,
        status: !goal.status,
      });
    },
    [updateGoal]
  );

  const onRemove = useCallback(
    (goal: GoalItemType) => {
      if (!goal.id) {
        console.error("Goal ID not found for deletion:", goal);
        return;
      }

      deleteGoal(goal.id);
    },
    [deleteGoal]
  );

  const handleFilterChange = useCallback((date: dayjs.Dayjs | null) => {
    setListFilterMonth(date ? date.month() + 1 : null);
  }, []);

  const handleStatusChange = useCallback((status: boolean | null) => {
    setListFilterStatus(status);
  }, []);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <div className="max-w-10xl p-6 flex flex-col gap-10 max-sm:p-0">
        <GoalsHeader disabledDate={disabledDate} />

        <div className="w-full flex flex-col gap-6">
          <GoalsFilter
            listFilterMonth={listFilterMonth}
            onFilterChange={handleFilterChange}
            listFilterStatus={listFilterStatus}
            onStatusChange={handleStatusChange}
          />

          <div className="w-full">
            {isLoading ? (
              <div className="flex justify-center p-20">
                <Spin size="large" />
              </div>
            ) : (
              <Form.List name="goals">
                {(fields) => {
                  const goalsValues = form.getFieldValue("goals") || [];
                  const hasGoals = fields.length > 0;

                  if (!hasGoals) {
                    return (
                      <div className="bg-gray-50 rounded-2xl p-10 border-2 border-dashed border-gray-200">
                        <Empty description="No goals found." />
                      </div>
                    );
                  }

                  // Group fields by month for better performance
                  const fieldsByMonth = fields.reduce((acc, field) => {
                    const month = goalsValues[field.name]?.month || 0;
                    if (!acc[month]) acc[month] = [];
                    acc[month].push(field);
                    return acc;
                  }, {} as Record<number, typeof fields>);

                  return (
                    <div className="flex flex-col gap-12">
                      {Object.entries(fieldsByMonth)
                        .sort(([a], [b]) => Number(a) - Number(b))
                        .map(([mValue, monthFields]) => (
                          <GoalGroup
                            key={mValue}
                            mValue={Number(mValue)}
                            monthFields={monthFields}
                            currentGoals={goalsValues}
                            onToggleComplete={toggleComplete}
                            onRemove={onRemove}
                          />
                        ))}
                    </div>
                  );
                }}
              </Form.List>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Goals;
