"use client";

import { useGetAccounts } from "@/app/accounts/api/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography, Spin, Empty, Button } from "antd";
import { Wallet, ArrowRight } from "lucide-react";
import Link from "next/link";

const { Text } = Typography;

export function DashboardAccounts() {
  const { data: accounts, isLoading } = useGetAccounts();

  return (
    <Card className="border-none shadow-sm bg-white rounded-2xl h-[400px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-slate-800">
          My Accounts
        </CardTitle>
        <Link href="/accounts">
          <Button
            type="link"
            className="text-blue-500 hover:text-blue-600 font-semibold p-0 flex items-center gap-1"
          >
            Manage <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col pt-0">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : !accounts || accounts.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <Empty
              description={<Text type="secondary">No accounts found</Text>}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 py-2">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100/50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{account.name}</h4>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                      Account Balance
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Text
                    className={`text-lg font-bold ${
                      account.balance >= 0
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    $
                    {account.balance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
