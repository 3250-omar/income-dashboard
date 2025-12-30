import CategorySelector from "@/app/_comp/selectors/categorySelector";
import { Transaction } from "@/types/transaction";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";

const { Item } = Form;
const EditTransactionModal = ({
  isModal,
  setIsModal,
  onFinish,
}: {
  isModal: { open: boolean; record: Transaction };
  setIsModal: (value: { open: boolean; record: Transaction }) => void;
  onFinish: () => void;
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (isModal.open) {
      form.setFieldsValue(isModal.record);
    }
  }, [isModal.open, isModal.record, form]);
  return (
    <Modal
      title="Edit Transaction Info"
      open={isModal.open}
      onCancel={() => setIsModal({ open: false, record: {} as Transaction })}
      styles={{
        body: {
          padding: "20px",
          maxWidth: "500px",
        },
      }}
      onOk={onFinish}
    >
      <Form form={form} layout="vertical">
        <Item label="Type" name="type">
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
            allowClear
            className="w-full"
          />
        </Item>
        <Item label="Amount" name="amount">
          <InputNumber placeholder="Transaction Amount" className="w-full!" />
        </Item>
        <Item label="Category" name="category">
          <CategorySelector defaultValue={"all"} />
        </Item>
        <Item label="Description" name="description">
          <Input.TextArea placeholder="Transaction Description" rows={3} />
        </Item>
      </Form>
    </Modal>
  );
};

export default EditTransactionModal;
