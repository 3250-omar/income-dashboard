"use client";
import { useUserStore } from "@/app/store/user_store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Transaction = {
  id: number;
  type: "income" | "expense";
  category: string;
  amount: number | string;
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

interface HeaderProps {
  setFormData: any;
  setEditingTransaction: any;
  editingTransaction: Transaction | null;
}

const HeaderComp = ({
  setFormData,
  setEditingTransaction,
  editingTransaction,
}: HeaderProps) => {
  const { dialogIsOpen, setDialogIsOpen } = useUserStore();
  console.log("editingTransaction in HeaderComp:", dialogIsOpen);
  const resetForm = () => {
    setFormData({
      type: "income",
      category: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
    setEditingTransaction(null);
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600 mt-1">Manage your income and expenses</p>
      </div>
      <Button
        onClick={() => {
          setDialogIsOpen(true);
          resetForm();
        }}
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Transaction
      </Button>
    </div>
  );
};

export default HeaderComp;
