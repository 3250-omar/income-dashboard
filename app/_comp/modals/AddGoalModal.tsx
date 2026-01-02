"use client";
import React from "react";
import { Form, Input, InputNumber, Modal } from "antd";
import dayjs from "dayjs";
import { useCreateGoal } from "@/components/helpers/useCreateGoal";
import { useUserStore } from "@/app/store/user_store";

interface AddGoalModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedMonth: number | null;
}

const { Item } = Form;

const AddGoalModal: React.FC<AddGoalModalProps> = ({
  isVisible,
  onClose,
  selectedMonth,
}) => {
  const [form] = Form.useForm();
  const { mutateAsync: createGoal, isPending } = useCreateGoal();
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedMonth !== null) {
        await createGoal({
          month: selectedMonth,
          goal: values.goal,
          goal_amount: values.amount,
        });
        form.resetFields();
        onClose();
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={`Add Goal for ${
        selectedMonth !== null
          ? dayjs()
              .month(selectedMonth - 1)
              .format("MMMM")
          : ""
      }`}
      open={isVisible}
      onOk={handleOk}
      okButtonProps={{
        loading: isPending,
      }}
      onCancel={handleCancel}
      okText="Add Goal"
      destroyOnHidden
    >
      <Form form={form} layout="vertical">
        <Item
          name="goal"
          label="Goal description"
          rules={[
            { required: true, message: "Please input the goal description!" },
          ]}
        >
          <Input placeholder="What do you want to achieve?" />
        </Item>
        <Item name="amount" label="Amount (Optional)">
          <InputNumber
            placeholder="0.00"
            min={0}
            className="w-full"
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Item>
      </Form>
    </Modal>
  );
};

export default AddGoalModal;
