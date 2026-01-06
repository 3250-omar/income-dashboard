"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
import { useFinancialSummary } from "../helpers/useFinancialSummary";
import { useUserStore } from "@/app/store/user_store";
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/app/api/query";

import { TransactionType } from "@/types/transaction";

export function SummaryCards({
  setFilter,
  filter,
}: {
  setFilter: (filter: TransactionType | "all") => void;
  filter: TransactionType | "all";
}) {
  const { sessionUserData, setDialogIsOpen, setAccountDialogIsOpen } =
    useUserStore();
  const { data: accounts } = useGetAccounts();
  const { data } = useFinancialSummary({
    enabled: !!sessionUserData?.id,
    userId: sessionUserData?.id,
  });

  const cards: {
    title: string;
    value: string;
    change: string | null;
    changeType?: "up" | "down";
    color: string;
    filter: TransactionType | "all";
  }[] = [
    {
      title: "Total Balance",
      value: `$${data?.balance?.toLocaleString() || "0"}`,
      change: null,
      color: "text-slate-900",
      filter: "all",
    },
    {
      title: "Total Income",
      value: `$${data?.income?.toLocaleString() || "0"}`,
      change: null,
      // changeType: "up",
      color: "text-slate-900",
      filter: "income",
    },
    {
      title: "Total Expenses",
      value: `$${data?.expenses?.toLocaleString() || "0"}`,
      change: null,
      // changeType: "down",
      color: "text-slate-900",
      filter: "expense",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const isFilter = filter === card.filter;
        return (
          <Card
            key={index}
            className={`border-none shadow-sm ${
              isFilter ? "bg-emerald-500" : "bg-white"
            } rounded-2xl overflow-hidden cursor-pointer transition-colors duration-200 ease-in-out`}
            onClick={() => setFilter(card.filter)}
          >
            <CardContent className="p-6">
              <p
                className="text-sm font-medium text-slate-500 mb-2 "
                style={{ color: isFilter ? "white" : "" }}
              >
                {card.title}
              </p>
              <div className="flex items-baseline gap-3">
                <h3
                  className="text-2xl font-bold text-slate-900"
                  style={{ color: isFilter ? "white" : "" }}
                >
                  {card.value}
                </h3>
                {card.change && (
                  <span
                    className={`flex items-center text-xs font-bold ${
                      card.changeType === "up"
                        ? "text-emerald-500"
                        : "text-rose-500"
                    }`}
                  >
                    {card.changeType === "up" ? (
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-0.5" />
                    )}
                    {card.change}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
      <div className="flex items-center justify-center gap-4 max-sm:flex-col">
        <div className="flex flex-col gap-4 items-center text-center">
          {!accounts?.length ? (
            <h2>Make an Account First to start adding Your Transactions</h2>
          ) : null}
          <Button
            onClick={() => setAccountDialogIsOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 h-12 font-bold shadow-lg shadow-blue-100 transition-all hover:scale-105 active:scale-95 cursor-pointer "
          >
            {accounts?.length ? "Add New Account" : "Add Account"}
          </Button>
        </div>

        {accounts?.length ? (
          <Button
            onClick={() => setDialogIsOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 texst-white rounded-xl px-6 h-12 font-bold shadow-lg shadow-emerald-100 transition-all hover:scale-105 active:scale-95 cursor-pointer "
          >
            Add Transaction
          </Button>
        ) : null}
      </div>
    </div>
  );
}
