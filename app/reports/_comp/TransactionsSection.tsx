"use client";
import React, { useMemo } from "react";
import { Card, Table, Typography } from "antd";

const { Text } = Typography;

interface TransactionsSectionProps {
  transactions: any[];
}

export const TransactionsSection: React.FC<TransactionsSectionProps> =
  React.memo(({ transactions }) => {
    const columns = useMemo(
      () => [
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          render: (text: string) => (
            <span className="font-medium text-[#111827]">{text}</span>
          ),
        },
        {
          title: "Category",
          dataIndex: "category",
          key: "category",
          render: (text: string) => (
            <span className="text-[#4b5563]">{text}</span>
          ),
        },
        {
          title: "Type",
          dataIndex: "type",
          key: "type",
          render: (type: string) => (
            <Text
              className={
                type === "income"
                  ? "text-[#16a34a] font-semibold text-nowrap"
                  : "text-[#dc2626] font-semibold text-nowrap"
              }
            >
              {type.toUpperCase()}
            </Text>
          ),
        },
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
          align: "right" as const,
          render: (amount: number) => (
            <span className="font-semibold text-[#111827]">
              ${amount.toFixed(2)}
            </span>
          ),
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
          render: (date: string) => (
            <span className="text-[#6b7280] text-nowrap">{date}</span>
          ),
        },
      ],
      []
    );

    return (
      <Card
        title={<span className="text-[#111827]">Recent Transactions</span>}
        variant="borderless"
        className="shadow-sm bg-[#ffffff] mb-8! overflow-y-auto p-0!"
      >
        <Table
          dataSource={transactions}
          columns={columns}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
          size="middle"
          rowKey="id"
          className="custom-table"
          // scroll={{ x: "max-content" }}
        />
      </Card>
    );
  });

TransactionsSection.displayName = "TransactionsSection";
