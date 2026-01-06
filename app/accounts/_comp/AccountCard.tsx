"use client";
import React, { useCallback } from "react";
import {
  Card,
  Button,
  Dropdown,
  Space,
  Typography,
  Spin,
  message,
  Modal,
  Tooltip,
} from "antd";
import { MoreVertical, Edit, Trash2, PlusCircle } from "lucide-react";
import { useUserStore } from "@/app/store/user_store";
import { useDeleteAccount } from "@/app/accounts/api/actions";
import { categoryIcons } from "@/app/constants";
import { useTransactions } from "@/components/helpers/useTransactions";
import { useDeleteTransaction } from "@/components/helpers/useDeleteTransaction";
import { Transaction } from "@/types/transaction";
import EditTransactionModal from "@/components/dashboard/_comp/editTransactionModal.tsx";

const { Text, Title } = Typography;

interface AccountCardProps {
  account: {
    id: string;
    name: string;
    balance: number;
  };
}

export const AccountCard = ({ account }: AccountCardProps) => {
  const {
    setAccountDialogIsOpen,
    setEditingAccount,
    setDialogIsOpen,
    setEditingTransaction,
    setIsEditTransactionModalOpen,
  } = useUserStore();
  const { mutateAsync: deleteAccount } = useDeleteAccount();
  const { mutateAsync: deleteTransaction } = useDeleteTransaction();

  const { data, isLoading } = useTransactions({
    accountId: account.id,
    enabled: !!account.id,
  });

  const transactions = data?.transactions || [];
  const totalBalance = account.balance || 0;

  const handleDelete = () => {
    Modal.confirm({
      title: "Delete Account",
      content: "Are you sure you want to delete this account?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteAccount(account.id);
          message.success("Account deleted successfully");
        } catch (error) {
          message.error(`Error deleting account: ${error}`);
        }
      },
    });
  };

  const handleEdit = () => {
    setEditingAccount(account);
    setAccountDialogIsOpen(true);
  };

  const menuItems = [
    {
      key: "edit",
      onClick: handleEdit,
      icon: <Edit className="w-4 h-4" />,
      label: "Edit Name",
    },
    {
      key: "delete",
      onClick: handleDelete,
      icon: <Trash2 className="w-4 h-4" />,
      label: "Delete Account",
      danger: true,
    },
  ];

  const getTransactionMenuItems = useCallback(
    (transaction: Transaction) => [
      {
        key: "edit",
        icon: <Edit className="w-4 h-4" />,
        label: "Edit",
        onClick: () => {
          setEditingTransaction(transaction);
          setIsEditTransactionModalOpen(true);
        },
      },
      {
        key: "delete",
        icon: <Trash2 className="w-4 h-4" />,
        label: "Delete",
        danger: true,
        onClick: () => {
          Modal.confirm({
            title: "Delete Transaction",
            content: "Are you sure you want to delete this transaction?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
              try {
                await deleteTransaction(transaction.id);
                message.success("Transaction deleted successfully");
              } catch (error) {
                message.error(`Error deleting transaction: ${error}`);
              }
            },
          });
        },
      },
    ],
    [setEditingTransaction, setIsEditTransactionModalOpen, deleteTransaction]
  );

  return (
    <Card
      className="hover:shadow-lg transition-all duration-300 border-none rounded-xl overflow-hidden"
      styles={{ body: { padding: "24px" } }}
    >
      <div className="flex flex-row items-center justify-between mb-4">
        <div className="space-y-1">
          <Title level={4} className="m-0! text-gray-800 font-bold">
            {account.name}
          </Title>
          <p
            className={`text-2xl font-bold m-0! ${
              totalBalance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            $
            {totalBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreVertical className="w-5 h-5" />} />
        </Dropdown>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <Text
            type="secondary"
            className="uppercase tracking-wider font-semibold text-[11px]"
          >
            Recent Transactions
          </Text>
          <Button
            type="link"
            size="small"
            className="flex items-center gap-1 p-0!"
            onClick={() => setDialogIsOpen(true)}
          >
            <PlusCircle className="w-4 h-4" />
            Add
          </Button>
        </div>

        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="flex justify-center py-6">
              <Spin size="small" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8">
              <Text type="secondary" className="italic text-sm">
                No transactions yet
              </Text>
            </div>
          ) : (
            transactions.map((transaction) => {
              const Icon =
                categoryIcons[
                  transaction?.category as keyof typeof categoryIcons
                ] || MoreVertical;
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between group p-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        transaction.type === "income"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <Tooltip title={transaction.description}>
                        <Text className="font-medium text-gray-700 truncate max-w-[140px]">
                          {transaction.description}
                        </Text>
                      </Tooltip>

                      <Text type="secondary" className="text-[11px]">
                        {new Date(transaction.date).toLocaleDateString()}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text
                      className={`font-semibold text-nowrap ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}$
                      {transaction.amount.toFixed(2)}
                    </Text>
                    <Dropdown
                      menu={{
                        items: getTransactionMenuItems(
                          transaction as Transaction
                        ),
                      }}
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <Button
                        type="text"
                        size="small"
                        icon={<MoreVertical className="w-4 h-4" />}
                      />
                    </Dropdown>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <EditTransactionModal />
    </Card>
  );
};
