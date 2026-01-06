import React from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Typography,
  Divider,
  List,
  Empty,
} from "antd";
import { Transaction } from "@/types/transaction";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export interface AccountsSectionProps {
  accounts: any[];
  transactions: Transaction[];
}

export const AccountsSection: React.FC<AccountsSectionProps> = React.memo(
  ({ accounts, transactions }) => {
    return (
      <Row gutter={[16, 16]}>
        {accounts.map((account: any) => {
          const accountTransactions = transactions
            .filter((t) => t.account_id === account.id)
            .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
            .slice(0, 5); // Show last 5 transactions

          return (
            <Col xs={24} md={12} lg={8} key={account.id}>
              <Card
                variant="borderless"
                className="shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#3b82f6] bg-[#ffffff] h-full"
                styles={{
                  body: {
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  },
                }}
              >
                <div className="mb-4">
                  <Title level={4} className="m-0! text-[#111827]">
                    {account.name}
                  </Title>
                  <Text type="secondary" className="text-[#6b7280]">
                    {account.type}
                  </Text>
                  <div className="mt-4">
                    <Statistic
                      value={account.balance}
                      precision={2}
                      prefix={<span className="text-[#3b82f6]">$</span>}
                      styles={{
                        content: { color: "#111827", fontWeight: 700 },
                      }}
                    />
                  </div>
                </div>

                <Divider className="my-3! m-0!" />

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <Text
                      strong
                      className="text-xs uppercase tracking-wider text-[#9ca3af]"
                    >
                      Latest Transactions
                    </Text>
                  </div>

                  {accountTransactions.length > 0 ? (
                    <div className="space-y-3">
                      {accountTransactions.map((t) => (
                        <div
                          key={t.id}
                          className="flex justify-between items-center group"
                        >
                          <div className="flex flex-col">
                            <Text className="text-sm font-medium text-[#374151] group-hover:text-[#3b82f6] transition-colors line-clamp-1 max-w-[250px]">
                              {t.description || t.category || "Uncategorized"}
                            </Text>
                            <Text className="text-[10px] text-[#9ca3af]">
                              {dayjs(t.date).format("MMM DD, YYYY")}
                            </Text>
                          </div>
                          <Text
                            className={`text-sm font-semibold ${
                              t.type === "income"
                                ? "text-emerald-600"
                                : "text-rose-600"
                            }`}
                          >
                            {t.type === "income" ? "+" : "-"}$
                            {Math.abs(t.amount).toFixed(2)}
                          </Text>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 flex flex-col items-center justify-center opacity-40">
                      <Text className="text-xs text-[#9ca3af]">
                        No recent activity
                      </Text>
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
);

AccountsSection.displayName = "AccountsSection";
