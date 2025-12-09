import { LucideIcon } from "lucide-react";

export interface Transaction {
  id: number;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  icon: LucideIcon;
}

export interface ExpenseCategory {
  category: string;
  percentage: number;
  color: string;
}

export interface DashboardData {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  recentTransactions: Transaction[];
  expensesByCategory: ExpenseCategory[];
}
