import CategorySelector from "@/app/_comp/selectors/categorySelector";
import { useUpdateTransaction } from "@/components/helpers/useUpdateTransaction";
import { Transaction } from "@/types/transaction";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";

const { Item } = Form;
const EditTransactionModal = ({
  isModal,
  setIsModal,
}: {
  isModal: { open: boolean; record: Transaction };
  setIsModal: (value: { open: boolean; record: Transaction }) => void;
}) => {
  const [form] = Form.useForm();
  const { mutateAsync: updateTransaction } = useUpdateTransaction();

  useEffect(() => {
    if (isModal.open) {
      form.setFieldsValue(isModal.record);
    }
  }, [isModal.open, isModal.record, form]);
  const onFinish = async () => {
    const values = form.getFieldsValue();
    console.log(values);
    const sentData = { ...values, id: isModal.record.id };
    await updateTransaction({ id: isModal.record.id, updates: sentData });
    setIsModal({
      open: false,
      record: {} as Transaction,
    });
  };
  return (
    <Modal
      title={"Edit Transaction Info"}
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
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          category: "all",
        }}
      >
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
          <CategorySelector />
        </Item>
        <Item label="Description" name="description">
          <Input.TextArea placeholder="Transaction Description" rows={3} />
        </Item>
      </Form>
    </Modal>
  );
};

export default EditTransactionModal;
