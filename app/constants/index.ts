import {
  Car,
  DollarSign,
  Film,
  Heart,
  HomeIcon,
  LayoutDashboard,
  LucideIcon,
  MoreHorizontal,
  ShoppingCart,
  Utensils,
} from "lucide-react";

export const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: DollarSign },
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
