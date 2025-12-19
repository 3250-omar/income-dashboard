interface CategoryProgressBarProps {
  category: string;
  percentage: number;
  color: string;
}

export function CategoryProgressBar({
  category,
  percentage,
  color,
}: CategoryProgressBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <span className="text-sm font-medium text-gray-700">{category}</span>
        </div>
        <span className="text-sm text-gray-600">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
