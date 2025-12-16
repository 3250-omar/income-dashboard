"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFinancialSummary } from "../helpers/useFinancialSummary";

export function IncomeExpensesCard() {
  const { data } = useFinancialSummary();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income & Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-6">${data?.balance}</div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Income</p>
            <p className="text-2xl font-semibold">${data?.income}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Expenses</p>
            <p className="text-2xl font-semibold text-red-600">
              ${data?.expenses}
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
