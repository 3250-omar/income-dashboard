"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "../helpers/useTransactions";
import { useUserStore } from "@/app/store/user_store";
import { ChevronDown, Filter } from "lucide-react";
import { Transaction } from "@/types/transaction";

export function RecentTransactionsTable() {
  const { sessionUserData } = useUserStore();
  const { data: transactions } = useTransactions({
    userId: sessionUserData?.id,
    enabled: !!sessionUserData?.id,
  });

  return (
    <Card className="border-none shadow-sm bg-white rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-slate-800">
          Recent Transactions
        </CardTitle>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">
            <Filter className="w-4 h-4" />
            All
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
                <th className="pb-4 pt-2 px-4 font-bold">Date</th>
                <th className="pb-4 pt-2 px-4 font-bold">Description</th>
                <th className="pb-4 pt-2 px-4 font-bold">Category</th>
                <th className="pb-4 pt-2 px-4 font-bold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions?.slice(0, 5).map((tx: Transaction) => (
                <tr
                  key={tx.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-medium text-slate-500">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-sm font-bold text-slate-800">
                    {tx.description}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                      {tx.category}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-4 text-sm font-bold text-right ${
                      tx.type === "income"
                        ? "text-emerald-500"
                        : "text-rose-500"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}$
                    {tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
              {!transactions?.length && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-slate-400 font-bold"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-bold px-4">
            <p>Page 1 of 5</p>
            <div className="flex gap-1">
              <button className="p-1 hover:text-slate-600">{"<"}</button>
              <button className="p-1 hover:text-slate-600">{">"}</button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
