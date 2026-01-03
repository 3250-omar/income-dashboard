"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
import { useFinancialSummary } from "../helpers/useFinancialSummary";
import { useUserStore } from "@/app/store/user_store";
import { Button } from "@/components/ui/button";

export function SummaryCards() {
  const { sessionUserData, setDialogIsOpen } = useUserStore();
  const { data } = useFinancialSummary({
    enabled: !!sessionUserData?.id,
    userId: sessionUserData?.id,
  });

  const cards = [
    {
      title: "Total Balance",
      value: `$${data?.balance?.toLocaleString() || "0"}`,
      change: null,
      color: "text-slate-900",
    },
    {
      title: "Total Income",
      value: `$${data?.income?.toLocaleString() || "0"}`,
      change: "+ 8%",
      changeType: "up",
      color: "text-slate-900",
    },
    {
      title: "Total Expenses",
      value: `$${data?.expenses?.toLocaleString() || "0"}`,
      change: "- 3%",
      changeType: "down",
      color: "text-slate-900",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="border-none shadow-sm bg-white rounded-2xl overflow-hidden"
        >
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500 mb-2">
              {card.title}
            </p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-2xl font-bold text-slate-900">
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
      ))}
      <div className="flex items-center justify-end ">
        <Button
          onClick={() => setDialogIsOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 h-12 font-bold shadow-lg shadow-emerald-100 transition-all hover:scale-105 active:scale-95 cursor-pointer "
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Transaction
        </Button>
      </div>
    </div>
  );
}
