"use client";
import FormContainer from "@/components/reusableComponents/Form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  editingTransaction: Transaction | null;
  formData: FormData;
  setTransactions: any;
  transactions: Transaction[];
}

const HeaderComp = ({
  setFormData,
  setEditingTransaction,
  isDialogOpen,
  setTransactions,
  setIsDialogOpen,
  editingTransaction,
  formData,
  transactions,
}: HeaderProps) => {
  // const generateId = () => Date.now();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("event", e);
  //   const newTransaction: Transaction = {
  //     id: editingTransaction?.id || generateId(),
  //     type: formData.type,
  //     category: formData.category,
  //     amount: parseFloat(formData.amount),
  //     description: formData.description,
  //     date: formData.date,
  //   };

  //   if (editingTransaction) {
  //     setTransactions(
  //       transactions.map((t: Transaction) =>
  //         t.id === editingTransaction.id ? newTransaction : t
  //       )
  //     );
  //   } else {
  //     setTransactions([...transactions, newTransaction]);
  //   }

  //   resetForm();
  //   setIsDialogOpen(false);
  // };

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
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Add Transaction
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
            </DialogTitle>
          </DialogHeader>
          <FormContainer setIsDialogOpen={setIsDialogOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeaderComp;
