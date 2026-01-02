"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import { useTransactions } from "@/components/helpers/useTransactions";
import { useDeleteTransaction } from "@/components/helpers/useDeleteTransaction";
import { categoryIcons } from "@/app/constants";
import { useUpdateTransaction } from "@/components/helpers/useUpdateTransaction";
import { useUserStore } from "@/app/store/user_store";

import { Transaction } from "@/types/transaction";

interface TransactionsListProps {
  setEditingTransaction: (transaction: any | null) => void;
}

export default function TransactionsList({
  setEditingTransaction,
}: TransactionsListProps) {
  const { sessionUserData } = useUserStore();
  const { data } = useTransactions({
    userId: sessionUserData?.id,
    enabled: !!sessionUserData?.id,
  });
  const transactions = data?.transactions || [];
  const { setDialogIsOpen } = useUserStore();
  const { mutate } = useDeleteTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();
  console.log("🚀 ~ TransactionsList ~ data:", data);
  const handleEdit = (transaction: Transaction) => {
    console.log("🚀 ~ handleEdit ~ transaction:", transaction);
    setDialogIsOpen(true);
    setEditingTransaction(transaction);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No transactions yet. Add your first transaction!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => {
              const Icon =
                categoryIcons[
                  transaction.category as keyof typeof categoryIcons
                ] || MoreHorizontal;
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p
                      className={`text-lg font-semibold ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}$
                      {transaction.amount.toFixed(2)}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(transaction)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => mutate(transaction.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
