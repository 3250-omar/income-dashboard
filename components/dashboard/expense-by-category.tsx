import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryProgressBar } from "./category-progress-bar";

export interface ExpenseCategory {
  category: string;
  percentage: number;
  color: string;
}

interface ExpenseByCategoryProps {
  categories: ExpenseCategory[];
}

export function ExpenseByCategory({ categories }: ExpenseByCategoryProps) {
  console.log("🚀 ~ ExpenseByCategory ~ categories:", categories);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((item, index) => (
            <CategoryProgressBar
              key={index}
              category={item.category}
              percentage={item.percentage}
              color={item.color}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
