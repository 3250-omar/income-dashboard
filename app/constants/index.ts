import {
  Banknote,
  Car,
  ClipboardList,
  DollarSign,
  Film,
  Heart,
  HomeIcon,
  LayoutDashboard,
  LucideIcon,
  MoreHorizontal,
  PiggyBank,
  Settings,
  ShoppingCart,
  Target,
  Utensils,
  Wallet,
} from "lucide-react";

export const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: ClipboardList },
  { name: "Budgets", href: "/budgets", icon: PiggyBank },
  { name: "Reports", href: "/reports", icon: Banknote },
  { name: "Accounts", href: "/accounts", icon: Wallet },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const categoryIcons: Record<string, LucideIcon> = {
  Salary: DollarSign,
  Food: Utensils,
  Bills: HomeIcon,
  Shopping: ShoppingCart,
  Entertainment: Film,
  Transportation: Car,
  Healthcare: Heart,
  Other: MoreHorizontal,
};

export const presentageCategoryColors = {
  Food: "bg-blue-500",
  Bills: "bg-red-500",
  Shopping: "bg-green-500",
  Entertainment: "bg-yellow-500",
  Transportation: "bg-purple-500",
  Healthcare: "bg-pink-500",
  Other: "bg-gray-500",
};

export const categoryList = [
  {
    label: "Salary",
    value: "salary",
  },
  {
    label: "Food",
    value: "food",
  },
  {
    label: "Bills",
    value: "bills",
  },
  {
    label: "Shopping",
    value: "shopping",
  },
  {
    label: "Entertainment",
    value: "entertainment",
  },
  {
    label: "Transportation",
    value: "transportation",
  },
  {
    label: "Healthcare",
    value: "healthcare",
  },
  {
    label: "Other",
    value: "other",
  },
];
