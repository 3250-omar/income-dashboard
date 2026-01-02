"use client";

import { useGetGoals } from "@/components/helpers/useGetGoals";
import { Button, Card, Divider } from "antd";
import dayjs from "dayjs";
import { FireExtinguisherIcon, Flame, PlusCircleIcon } from "lucide-react";

const CurrentMonthGoals = () => {
  const currentMonth = dayjs().month() + 1;
  console.log("🚀 ~ CurrentMonthGoals ~ currentMonth:", currentMonth);
  const { data: goals, isPending } = useGetGoals(currentMonth);
  console.log("🚀 ~ CurrentMonthGoals ~ goals:", goals);
  if (!goals?.length) {
    return (
      <Card className="flex items-center justify-center font-bold ">
        You havnt goals in that month yet ! Make one Now
      </Card>
    );
  }
  return (
    <Card className="flex flex-col gap-4  shadow">
      <div className="flex items-center justify-between">
        {" "}
        <h1 className="text-xl font-semibold flex items-center justify-center gap-4">
          Current Month Goals <Flame color="orange" />
        </h1>
        <Button title="Add New Goal" icon={<PlusCircleIcon />} type="link" />
      </div>

      <Divider />
      <div className="flex flex-col gap-4  w-full!">
        {goals.map((goal) => (
          <div key={goal.id} className="shadow-sm p-2 rounded-xl ">
            {goal.goal}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CurrentMonthGoals;
