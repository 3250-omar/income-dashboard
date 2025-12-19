import { categoryIcons } from "@/app/constants";

interface TransactionItemProps {
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
}

export function TransactionItem({
  type,
  category,
  amount,
  date,
}: TransactionItemProps) {
  const Icon = categoryIcons[category] ?? categoryIcons["Other"];
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            type === "income"
              ? "bg-blue-100 text-blue-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{category}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <p
        className={`font-semibold ${
          type === "income" ? "text-green-600" : "text-red-600"
        }`}
      >
        {type === "income" ? "+" : "-"} ${amount}
      </p>
    </div>
  );
}
