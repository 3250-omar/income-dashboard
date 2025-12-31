"use client";
import { expenseCategories, incomeCategories } from "@/app/constants";
import { useUserStore } from "@/app/store/user_store";
import { useCreateTransaction } from "@/components/helpers/useCreateTransaction";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import dayjs from "dayjs";

interface formValues {
  type: "income" | "expense";
  amount: number;
  category: string;
  description?: string;
  date: string;
  otherCategory?: string;
}

const { Item } = Form;
const AddTransactionModal = () => {
  const { dialogIsOpen, setDialogIsOpen } = useUserStore();
  const { mutateAsync } = useCreateTransaction();
  const [form] = Form.useForm();
  const typeValue = Form.useWatch("type", form);
  const categoryValue = Form.useWatch("category", form);
  const onFinish = async (values: formValues) => {
    const { date, category, otherCategory, ...rest } = values;
    const payload = {
      ...rest,
      date: dayjs(date).format("YYYY-MM-DD"),
      category: categoryValue === "other" ? otherCategory : category,
    };
    await mutateAsync(payload);
    setDialogIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      open={dialogIsOpen}
      onCancel={() => setDialogIsOpen(false)}
      footer={null}
      title={
        <div className="text-xl font-bold text-center">Add Transaction</div>
      }
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select a type" }]}
        >
          <Select
            options={[
              {
                label: "Income",
                value: "income",
              },
              {
                label: "Expense",
                value: "expense",
              },
            ]}
            placeholder="Transaction Type"
            className="w-full"
          />
        </Item>
        <Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            options={
              typeValue === "income" ? incomeCategories : expenseCategories
            }
            placeholder="Transaction Category"
            className="w-full"
          />
        </Item>
        {categoryValue === "other" ? (
          <Item
            label="Other Category"
            name="otherCategory"
            rules={[{ required: true, message: "Please enter a category" }]}
          >
            <Input
              placeholder="Please enter the other category"
              className="w-full"
            />
          </Item>
        ) : null}
        <Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please enter an amount" }]}
        >
          <InputNumber
            placeholder="Transaction Amount"
            className="w-full!"
            min={0}
          />
        </Item>
        <Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker
            placeholder="Transaction Date"
            className="w-full"
            format="YYYY-MM-DD"
          />
        </Item>
        <Item
          label="Description"
          name="description"
          //   rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea placeholder="Transaction Description" rows={3} />
        </Item>
        <Divider />
        <div className="flex justify-center gap-4 items-center">
          <Button type="primary" htmlType="submit">
            Add Transaction
          </Button>
          <Button
            onClick={() => {
              setDialogIsOpen(false);
            }}
            htmlType="reset"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddTransactionModal;
