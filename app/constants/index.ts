import {
  Banknote,
  Car,
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
  Snowflake,
  Sprout,
  Flower2,
  Sun,
  Waves,
  Palmtree,
  Bird,
  Leaf,
  CloudRain,
  Wind,
  Gift,
} from "lucide-react";

export const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  // { name: "Transactions", href: "/transactions", icon: ClipboardList },
  // { name: "Budgets", href: "/budget", icon: PiggyBank },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Accounts", href: "/accounts", icon: Wallet },
  { name: "Reports", href: "/reports", icon: Banknote },
  { name: "Settings", href: "/edit-profile", icon: Settings },
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

export const incomeCategories = [
  {
    label: "Salary",
    value: "salary",
  },
  {
    label: "Freelance",
    value: "freelance",
  },
  {
    label: "Business",
    value: "business",
  },
];

export const expenseCategories = [
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

export const monthStyles: Record<
  number,
  { color: string; bg: string; icon: LucideIcon }
> = {
  1: { color: "text-blue-600", bg: "bg-blue-50", icon: Snowflake },
  2: { color: "text-pink-600", bg: "bg-pink-50", icon: Heart },
  3: { color: "text-emerald-600", bg: "bg-emerald-50", icon: Sprout },
  4: { color: "text-orange-600", bg: "bg-orange-50", icon: Flower2 },
  5: { color: "text-yellow-600", bg: "bg-yellow-50", icon: Sun },
  6: { color: "text-cyan-600", bg: "bg-cyan-50", icon: Waves },
  7: { color: "text-red-600", bg: "bg-red-50", icon: Palmtree },
  8: { color: "text-amber-600", bg: "bg-amber-50", icon: Bird },
  9: { color: "text-orange-800", bg: "bg-orange-100", icon: Leaf },
  10: { color: "text-indigo-600", bg: "bg-indigo-50", icon: CloudRain },
  11: { color: "text-slate-600", bg: "bg-slate-50", icon: Wind },
  12: { color: "text-rose-600", bg: "bg-rose-50", icon: Gift },
};
