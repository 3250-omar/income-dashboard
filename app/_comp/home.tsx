import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ExpenseByCategory } from "@/components/dashboard/expense-by-category";
import { IncomeExpensesCard } from "@/components/dashboard/income-expenses-card";
import { IncomeVsExpensesChart } from "@/components/dashboard/income-vs-expenses-chart";
import MonthlySummaryChart from "@/components/dashboard/monthly-summary-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { getDashboardData } from "@/lib/dashboard/get-dashboard-data";

const HomeComponent = () => {
  const data = getDashboardData();

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <DashboardHeader />
        {/* Summary Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IncomeExpensesCard />
          <IncomeVsExpensesChart />
        </div>

        {/* Transactions and Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentTransactions />
          <ExpenseByCategory categories={data.expensesByCategory} />
        </div>

        {/* Monthly Summary Section */}
        <MonthlySummaryChart />
      </div>
    </>
  );
};

export default HomeComponent;
