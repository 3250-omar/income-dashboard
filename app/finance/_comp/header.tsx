"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";

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
  setFormData: (formData: FormData) => void;
  setEditingTransaction: any;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  editingTransaction: Transaction | null;
  formData: FormData;
  setTransactions: any;
  transactions: any;
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("event", e);
    const newTransaction: Transaction = {
      id: editingTransaction?.id || generateId(),
      type: formData.type,
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date,
    };

    if (editingTransaction) {
      setTransactions(
        transactions.map((t: Transaction) =>
          t.id === editingTransaction.id ? newTransaction : t
        )
      );
    } else {
      setTransactions([...transactions, newTransaction]);
    }

    resetForm();
    setIsDialogOpen(false);
  };
  const generateId = () => Date.now();

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "income" | "expense") =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Bills">Bills</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                {editingTransaction ? "Update" : "Add"} Transaction
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeaderComp;
