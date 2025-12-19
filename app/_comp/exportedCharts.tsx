"use client";
import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

export const LazyIncomeVsExpensesChart = dynamic(
  () => import("@/app/_comp/dashboard/income-vs-expenses-chart"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-full">
        <Spinner className="h-20 w-20" />
      </div>
    ),
  }
);

export const LazyExpenseByCategory = dynamic(
  () => import("@/app/_comp/dashboard/expense-by-category"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-full">
        <Spinner className="h-20 w-20" />
      </div>
    ),
  }
);
export const LazyMonthlySummaryChart = dynamic(
  () => import("@/app/_comp/dashboard/monthly-summary-chart"),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-full">
        <Spinner className="h-20 w-20" />
      </div>
    ),
  }
);
