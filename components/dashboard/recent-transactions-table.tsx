"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "../helpers/useTransactions";
import { useUserStore } from "@/app/store/user_store";
import { Edit, Filter, Trash } from "lucide-react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import { Transaction, TransactionType } from "@/types/transaction";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useDeleteTransaction } from "../helpers/useDeleteTransaction";
import EditTransactionModal from "./_comp/editTransactionModal.tsx";

export function RecentTransactionsTable({
  transactionsFilter,
}: {
  transactionsFilter: TransactionType | "all";
}) {
  console.log(
    "🚀 ~ RecentTransactionsTable ~ transactionsFilter:",
    transactionsFilter
  );
  const {
    sessionUserData,
    setIsEditTransactionModalOpen,
    setEditingTransaction,
  } = useUserStore();
  //this is only initial value isnt effect the value of the filter if it changes
  const [filter, setFilter] = useState<TransactionType | "all">(
    transactionsFilter
  );
  console.log("🚀 ~ RecentTransactionsTable ~ filter:", filter);

  useEffect(() => {
    setFilter(transactionsFilter);
  }, [transactionsFilter]);

  const { mutateAsync: deleteTransaction } = useDeleteTransaction();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  console.log("🚀 ~ RecentTransactionsTable ~ pagination:", pagination);

  const { data, isLoading } = useTransactions({
    userId: sessionUserData?.id,
    enabled: !!sessionUserData?.id,
    type: filter === "all" ? undefined : filter,
    page: pagination.current - 1,
    pageSize: pagination.pageSize,
  });

  const transactions = data?.transactions || [];
  const totalCount = data?.count || 0;

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const selectOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Income",
      value: "income",
    },
    {
      label: "Expense",
      value: "expense",
    },
  ];
  const columns: TableColumnsType<Transaction> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Type",
      // dataIndex: "type",
      key: "type",
      render: (value: Transaction) => (
        <span
          className={cn(
            "text-xs font-bold",
            value.type === "income" ? "text-green-500" : "text-red-500"
          )}
        >
          {value.type}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (value: string) => (
        <Tooltip title={value}>
          <span className="max-w-[250] truncate">
            {value || "No Description Provided"}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text: string) => (
        <span className="text-xs font-bold">$ {text}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      fixed: "end",
      render: (record) => (
        <Space>
          <Button
            icon={<Edit color="blue" size={16} />}
            type="text"
            onClick={() => {
              setEditingTransaction(record as Transaction);
              setIsEditTransactionModalOpen(true);
            }}
          />
          <Popconfirm
            title="Are you sure you want to delete this transaction?"
            onConfirm={() => deleteTransaction(record.id)}
          >
            <Button icon={<Trash color="red" size={16} />} type="text" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card className="border-none shadow-sm bg-white rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-slate-800">
          Recent Transactions
        </CardTitle>
        <div className="flex gap-2">
          <Select
            options={selectOptions}
            placeholder="Filter"
            prefix={<Filter color="gray" />}
            // allowClear
            onChange={(value) => {
              setFilter(value);
              setPagination({ ...pagination, current: 1 });
            }}
            value={filter}
            className="w-[150px] h-[40px] "
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table
          columns={columns}
          dataSource={transactions}
          rowKey="id"
          loading={isLoading}
          onChange={handleTableChange}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: totalCount,
            showSizeChanger: true,
          }}
        />
      </CardContent>
      <EditTransactionModal />
    </Card>
  );
}
