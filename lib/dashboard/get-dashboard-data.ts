import { DollarSign, Utensils, Home as HomeIcon } from "lucide-react";
import { DashboardData } from "@/types/dashboard";

/**
 * Fetches dashboard data
 * TODO: Replace with actual Prisma database queries
 */
export function getDashboardData(): DashboardData {
  const totalIncome = 4325.0;
  const totalExpenses = 1109.5;
  const balance = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    balance,
    recentTransactions: [
      {
        id: 1,
        type: "income",
        category: "Salary",
        amount: 2000.0,
        date: "August",
        icon: DollarSign,
      },
      {
        id: 2,
        type: "expense",
        category: "Grocery",
        amount: 150.0,
        date: "Food",
        icon: Utensils,
      },
      {
        id: 3,
        type: "expense",
        category: "Utilities",
        amount: 100.0,
        date: "Bills",
        icon: HomeIcon,
      },
    ],
    expensesByCategory: [
      { category: "Food", percentage: 45, color: "bg-blue-500" },
      { category: "Bills", percentage: 30, color: "bg-red-500" },
      { category: "Entertainment", percentage: 15, color: "bg-teal-500" },
      { category: "Other", percentage: 10, color: "bg-blue-300" },
    ],
  };
}
