import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionItem } from "./transaction-item";
import { LucideIcon } from "lucide-react";

export interface Transaction {
  id: number;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  icon: LucideIcon;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
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
              icon={transaction.icon}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
