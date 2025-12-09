import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function MonthlySummaryChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Monthly Summary</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-300"></div>
              <span className="text-sm text-gray-600">Expense</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Bar chart visualization</p>
            <p className="text-xs text-gray-400">Coming soon with Recharts</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
