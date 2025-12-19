"use client";
import { DashboardHeader } from "@/app/_comp/dashboard/dashboard-header";
import { RecentTransactions } from "@/app/_comp/dashboard/recent-transactions";
import IncomeExpensesCard from "@/app/_comp/dashboard/income-expenses-card";
import {
  LazyExpenseByCategory,
  LazyIncomeVsExpensesChart,
  LazyMonthlySummaryChart,
} from "./_comp/exportedCharts";

// Home page content
//only import client components and dynamic imports here
const Home = () => {
  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <DashboardHeader />
        {/* Summary Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IncomeExpensesCard />
          <LazyIncomeVsExpensesChart />
        </div>

        {/* Transactions and Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentTransactions />
          <LazyExpenseByCategory />
        </div>

        {/* Monthly Summary Section */}
        <LazyMonthlySummaryChart />
      </div>
    </>
  );
};

export default Home;
