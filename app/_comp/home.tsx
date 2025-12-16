import {
  DashboardHeader,
  ExpenseByCategory,
  IncomeExpensesCard,
  IncomeVsExpensesChart,
  RecentTransactions,
} from "@/components/dashboard";
import MonthlySummaryChart from "@/components/dashboard/monthly-summary-chart";
import { getDashboardData } from "@/lib/dashboard/get-dashboard-data";

const HomeComponent = async () => {
  const data = await getDashboardData();

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <DashboardHeader />
        {/* Summary Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IncomeExpensesCard
            totalIncome={data.totalIncome}
            totalExpenses={data.totalExpenses}
            balance={data.balance}
          />
          <IncomeVsExpensesChart />
        </div>

        {/* Transactions and Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentTransactions transactions={data.recentTransactions} />
          <ExpenseByCategory categories={data.expensesByCategory} />
        </div>

        {/* Monthly Summary Section */}
        <MonthlySummaryChart />
      </div>
    </>
  );
};

export default HomeComponent;
