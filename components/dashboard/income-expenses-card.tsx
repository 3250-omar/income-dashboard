"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IncomeExpensesCardProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export function IncomeExpensesCard({
  totalIncome,
  totalExpenses,
  balance,
}: IncomeExpensesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income & Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-6">
          ${balance.toLocaleString()}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Income</p>
            <p className="text-2xl font-semibold">
              ${totalIncome.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Expenses</p>
            <p className="text-2xl font-semibold text-red-600">
              ${totalExpenses.toLocaleString()}
            </p>
          </div>
        </div>
        <Button className="w-full" asChild>
          <Link href="/finance">Add Transaction</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
