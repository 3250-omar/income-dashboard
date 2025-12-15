"use client";

import { useMemo, useState } from "react";
import {
  DollarSign,
  Utensils,
  Home as HomeIcon,
  ShoppingCart,
  Film,
  Car,
  Heart,
  MoreHorizontal,
  LucideIcon,
} from "lucide-react";
import HeaderComp from "./header";
import SummaryCards from "./summary-cards";
import TransactionsList from "./transactions-list";

type Transaction = {
  id: number;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
  date: string;
};

type FormData = {
  type: "income" | "expense";
  category: string;
  amount: string;
  description: string;
  date: string;
};

export default function TransactionPageComp() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [formData, setFormData] = useState<FormData>({
    type: "income",
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = useMemo(
    () => totalIncome - totalExpenses,
    [totalIncome, totalExpenses]
  );

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };
  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount.toString(),
      description: transaction.description,
      date: transaction.date,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <HeaderComp
        editingTransaction={editingTransaction}
        formData={formData}
        isDialogOpen={isDialogOpen}
        setEditingTransaction={setEditingTransaction}
        setFormData={setFormData}
        setIsDialogOpen={setIsDialogOpen}
        setTransactions={setTransactions}
        transactions={transactions}
      />
      {/* Summary Cards */}
      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
      />

      {/* Transactions List */}
      <TransactionsList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
