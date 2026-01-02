"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactions } from "../helpers/useTransactions";
import { useUserStore } from "@/app/store/user_store";
import {
  ShoppingCart,
  DollarSign,
  Wifi,
  Car,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Transaction } from "@/types/transaction";

const getIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "food":
      return (
        <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
          <ShoppingCart className="w-5 h-5" />
        </div>
      );
    case "income":
      return (
        <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl">
          <DollarSign className="w-5 h-5" />
        </div>
      );
    case "utilities":
      return (
        <div className="p-2 bg-cyan-50 text-cyan-500 rounded-xl">
          <Wifi className="w-5 h-5" />
        </div>
      );
    case "transport":
      return (
        <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
          <Car className="w-5 h-5" />
        </div>
      );
    default:
      return (
        <div className="p-2 bg-slate-50 text-slate-500 rounded-xl">
          <DollarSign className="w-5 h-5" />
        </div>
      );
  }
};

export function RecentTransactionsList() {
  const { sessionUserData } = useUserStore();
  const { data } = useTransactions({
    userId: sessionUserData?.id,
    enabled: !!sessionUserData?.id,
  });

  const transactions = data?.transactions || [];

  return (
    <Card className="border-none shadow-sm bg-white rounded-2xl h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-800">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {transactions.slice(0, 4).map((tx: Transaction) => (
            <div
              key={tx.id}
              className="flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {getIcon(tx.category || "other")}
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {tx.description}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {tx.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-bold ${
                    tx.type === "income" ? "text-emerald-500" : "text-slate-700"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}$
                  {tx.amount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          {!transactions.length && (
            <p className="py-6 text-center text-slate-400 font-bold">
              No transactions
            </p>
          )}
        </div>
        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
            <div className="w-4 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
          </div>
          <div className="flex gap-4">
            <button className="text-slate-300 hover:text-slate-600 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="text-slate-300 hover:text-slate-600 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
