"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionItem } from "./transaction-item";
import { LucideIcon } from "lucide-react";
import { useTransactions } from "../../../components/helpers/useTransactions";

export interface Transaction {
  id: number;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  icon: LucideIcon;
}

export function RecentTransactions() {
  const { data: transactions } = useTransactions();
  if (!transactions) {
    return;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              type={transaction.type}
              category={transaction.category}
              amount={transaction.amount}
              date={transaction.date}
            />
          ))}
          {!transactions.length && (
            <div className="text-center py-12 text-gray-500 font-bold">
              No Transactions Found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
