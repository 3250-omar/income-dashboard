import { SummaryCards } from "@/components/dashboard/summary-cards";
import { IncomeExpensesChart } from "@/components/dashboard/income-expenses-chart";
import { ExpenseBreakdown } from "@/components/dashboard/expense-breakdown";
import { RecentTransactionsTable } from "@/components/dashboard/recent-transactions-table";
import { RecentTransactionsList } from "@/components/dashboard/recent-transactions-list";

const Home = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Section: Summary Cards */}
      <SummaryCards />

      {/* Middle Section: Main Chart & Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <IncomeExpensesChart />
        </div>
        <div className="xl:col-span-1">
          <ExpenseBreakdown />
        </div>
      </div>

      {/* Bottom Section: Transactions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <RecentTransactionsTable />
        </div>
        <div className="xl:col-span-1">
          <RecentTransactionsList />
        </div>
      </div>
    </div>
  );
};

export default Home;
