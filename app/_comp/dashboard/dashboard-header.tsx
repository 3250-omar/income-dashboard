"use client";
import { useUserStore } from "@/app/store/user_store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function DashboardHeader() {
  const { setDialogIsOpen } = useUserStore();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Personal Finance Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Track your income and expenses</p>
      </div>
      <Button onClick={() => setDialogIsOpen(true)}>
        {" "}
        <Plus className="w-5 h-5 mr-2" />
        Add Transaction
      </Button>
    </div>
  );
}
