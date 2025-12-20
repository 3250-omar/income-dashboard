"use client";

import { useState } from "react";

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
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [formData, setFormData] = useState<FormData>({
    type: "income",
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <HeaderComp
        editingTransaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
        setFormData={setFormData}
      />
      {/* Summary Cards */}
      <SummaryCards />

      {/* Transactions List */}
      <TransactionsList setEditingTransaction={setEditingTransaction} />
    </div>
  );
}
