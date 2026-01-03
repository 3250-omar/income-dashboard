"use client";
import React, { useEffect } from "react";
import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import dayjs from "dayjs";
import { useCreateGoal } from "@/components/helpers/useCreateGoal";
import { useUserStore } from "@/app/store/user_store";
import { useUpdateGoal } from "@/components/helpers/useUpdateGoal";
import { Calendar, DollarSign, Target } from "lucide-react";

const { Item } = Form;

const AddGoalModal = () => {
  const [form] = Form.useForm();
  const { mutateAsync: createGoal, isPending: isCreating } = useCreateGoal();
  const { mutateAsync: updateGoal, isPending: isUpdating } = useUpdateGoal();
  const setAddGoalDialog = useUserStore((state) => state.setAddGoalDialog);
  const selectedMonthValue = Form.useWatch("month", form);
  const openAddGoalDialog = useUserStore((state) => state.addGoalDialogIsOpen);
  const selectedMonth = useUserStore((state) => state.selectedMonth);
  const editingGoal = useUserStore((state) => state.editingGoal);
  const setEditingGoal = useUserStore((state) => state.setEditingGoal);

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (editingGoal) {
      form.setFieldsValue({
        month: dayjs().month(editingGoal.month - 1),
        goal: editingGoal.goal,
        amount: editingGoal.goal_amount,
      });
    } else {
      form.resetFields();
    }
  }, [editingGoal, form, openAddGoalDialog]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingGoal) {
        await updateGoal({
          id: editingGoal.id,
          month: selectedMonth || dayjs(selectedMonthValue).month() + 1,
          goal: values.goal,
          amount: values.amount,
        });
      } else {
        await createGoal({
          month: selectedMonth || dayjs(selectedMonthValue).month() + 1,
          goal: values.goal,
          goal_amount: values.amount,
          status: false,
        });
      }
      form.resetFields();
      setEditingGoal(null);
      setAddGoalDialog(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingGoal(null);
    setAddGoalDialog(false);
  };

  return (
    <Modal
      title={
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">
            {editingGoal ? "Edit Goal" : "Add New Goal"}
          </span>
          <span className="text-gray-400 font-normal text-sm">
            {selectedMonth !== null
              ? `Planning for ${dayjs()
                  .month((selectedMonthValue || selectedMonth) - 1)
                  .format("MMMM")}`
              : "Select a month and define your target"}
          </span>
        </div>
      }
      open={openAddGoalDialog}
      onOk={handleOk}
      okButtonProps={{
        loading: isPending,
        className: "bg-black hover:bg-gray-800 h-10 px-6 rounded-lg",
      }}
      cancelButtonProps={{
        className:
          "h-10 px-6 rounded-lg hover:text-red-500 hover:border-red-500",
      }}
      onCancel={handleCancel}
      okText={editingGoal ? "Update Goal" : "Add Goal"}
      destroyOnHidden
      className="p-4"
    >
      <Form form={form} layout="vertical" className="mt-6 flex flex-col gap-2">
        {!selectedMonth && !editingGoal ? (
          <Item
            name="month"
            label={<span className="font-semibold text-gray-700">Month</span>}
            rules={[{ required: true, message: "Please select a month" }]}
          >
            <DatePicker
              picker="month"
              placeholder="Select Month"
              format="MMMM YYYY"
              disabledDate={(current) =>
                current && current < dayjs().startOf("month")
              }
              className="w-full h-11 rounded-xl border-gray-200"
              suffixIcon={<Calendar className="text-gray-400" size={18} />}
              size="large"
            />
          </Item>
        ) : null}

        <Item
          name="goal"
          label={
            <span className="font-semibold text-gray-700">
              Goal Description
            </span>
          }
          rules={[
            { required: true, message: "Please input the goal description!" },
          ]}
        >
          <Input
            placeholder="e.g. Save for a new car"
            prefix={<Target className="text-gray-400 mr-2" size={18} />}
            className="h-11 rounded-xl border-gray-200"
            size="large"
          />
        </Item>

        <Item
          name="amount"
          label={
            <span className="font-semibold text-gray-700">
              Target Amount{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </span>
          }
        >
          <InputNumber
            placeholder="0.00"
            min={0}
            className="w-full! h-11 rounded-xl border-gray-200 flex items-center"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            prefix={<DollarSign className="text-gray-400 mr-2" size={18} />}
            size="large"
          />
        </Item>
      </Form>
    </Modal>
  );
};

export default AddGoalModal;
