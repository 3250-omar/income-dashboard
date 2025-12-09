import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Personal Finance Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Track your income and expenses</p>
      </div>
      <Button asChild>
        <Link href="/finance">Add Transaction</Link>
      </Button>
    </div>
  );
}
