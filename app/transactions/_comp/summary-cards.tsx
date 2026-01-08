import { useFinancialSummary } from "@/app/api/query";
import { useUserStore } from "@/app/store/user_store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SummaryCards() {
  const { sessionUserData } = useUserStore();
  const { data } = useFinancialSummary({
    userId: sessionUserData?.id,
    enabled: !!sessionUserData?.id,
  });
  console.log("🚀 ~ SummaryCards ~ data:", data);
  if (!data) {
    return;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">
            ${data?.income}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-600">
            ${data?.expenses}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-600">
            Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`text-3xl font-bold ${
              data?.balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${data?.balance}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
