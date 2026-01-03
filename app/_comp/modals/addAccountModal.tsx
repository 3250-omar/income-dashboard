"use client";
import { useUserStore } from "@/app/store/user_store";
import { useCreateAccount, useUpdateAccount } from "@/app/accounts/api/actions";
import { Button, Divider, Form, Input, Modal, message } from "antd";
import { useEffect } from "react";

interface FormValues {
  name: string;
}

const { Item } = Form;

const AddAccountModal = () => {
  const {
    accountDialogIsOpen,
    setAccountDialogIsOpen,
    editingAccount,
    setEditingAccount,
  } = useUserStore();

  const { mutateAsync: createAccount, isPending: createAccountIsPending } =
    useCreateAccount();
  const { mutateAsync: updateAccount, isPending: updateAccountIsPending } =
    useUpdateAccount();
  const isLoading = createAccountIsPending || updateAccountIsPending;
  const [form] = Form.useForm();

  useEffect(() => {
    if (accountDialogIsOpen) {
      if (editingAccount) {
        form.setFieldsValue({
          name: editingAccount.name,
        });
      } else {
        form.resetFields();
      }
    }
  }, [editingAccount, form, accountDialogIsOpen]);

  const onFinish = async (values: FormValues) => {
    try {
      if (editingAccount) {
        await updateAccount({ id: editingAccount.id, name: values.name });
        message.success("Account updated successfully");
      } else {
        await createAccount({ name: values.name });
        message.success("Account created successfully");
      }

      setAccountDialogIsOpen(false);
      setEditingAccount(null);
      form.resetFields();
    } catch (error) {
      message.error(`Error: ${error}`);
    }
  };

  return (
    <Modal
      open={accountDialogIsOpen}
      onCancel={() => {
        setAccountDialogIsOpen(false);
        setEditingAccount(null);
      }}
      footer={null}
      title={
        <div className="text-xl font-bold text-center">
          {editingAccount ? "Edit Account" : "Add Account"}
        </div>
      }
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Item
          label="Account Name"
          name="name"
          rules={[{ required: true, message: "Please enter an account name" }]}
        >
          <Input placeholder="e.g. Savings, Wallet, Bank" className="w-full" />
        </Item>

        <Divider />
        <div className="flex justify-center gap-4 items-center">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {editingAccount ? "Update Account" : "Add Account"}
          </Button>
          <Button
            onClick={() => {
              setAccountDialogIsOpen(false);
              setEditingAccount(null);
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

export default AddAccountModal;
