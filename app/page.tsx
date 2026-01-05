"use client";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { RecentTransactionsTable } from "@/components/dashboard/recent-transactions-table";
import { DashboardAccounts } from "@/components/dashboard/dashboard-accounts";
import CurrentMonthGoals from "./_comp/dashboard/currentMonthGoals";
import { useState } from "react";
import { TransactionType } from "@/types/transaction";

const Home = () => {
  const [transactionsFilter, setTransactionsFilter] = useState<
    TransactionType | "all"
  >("all");
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Section: Summary Cards */}
      <SummaryCards
        setFilter={setTransactionsFilter}
        filter={transactionsFilter}
      />

      {/* Middle Section: Main Accounts & Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <DashboardAccounts />
        </div>
        <div className="xl:col-span-1">
          {/* <ExpenseBreakdown /> */}
          <CurrentMonthGoals />
        </div>
      </div>

      {/* Bottom Section: Transactions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="xl:col-span-2">
          <RecentTransactionsTable transactionsFilter={transactionsFilter} />
        </div>
        {/* <div className="xl:col-span-1">
          <RecentTransactionsList />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
