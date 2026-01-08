import CategorySelector from "@/app/_comp/selectors/categorySelector";
import { Transaction } from "@/types/transaction";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useUserStore } from "@/app/store/user_store";
import { useEffect } from "react";
import { useUpdateTransaction } from "@/app/api/actions";

const { Item } = Form;
const EditTransactionModal = ({
  isModal,
  setIsModal,
}: {
  isModal?: { open: boolean; record: Transaction };
  setIsModal?: (value: { open: boolean; record: Transaction }) => void;
}) => {
  const {
    editingTransaction,
    setEditingTransaction,
    isEditTransactionModalOpen,
    setIsEditTransactionModalOpen,
  } = useUserStore();
  const [form] = Form.useForm();
  const { mutateAsync: updateTransaction } = useUpdateTransaction();

  // Use either props or global state
  const isOpen = isModal?.open || isEditTransactionModalOpen;
  const record = isModal?.record || editingTransaction;

  const handleCancel = () => {
    if (setIsModal) {
      setIsModal({ open: false, record: {} as Transaction });
    }
    setIsEditTransactionModalOpen(false);
    setEditingTransaction(null);
  };

  useEffect(() => {
    if (isOpen && record) {
      form.setFieldsValue(record);
    }
  }, [isOpen, record, form]);

  const onFinish = async () => {
    const values = form.getFieldsValue();
    if (!record?.id) return;
    const sentData = { ...values, id: record.id };
    await updateTransaction({ id: record.id, updates: sentData });
    handleCancel();
  };
  return (
    <Modal
      title={"Edit Transaction Info"}
      open={isOpen}
      onCancel={handleCancel}
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
