// expensesService.ts

import { supabaseServer } from "@/lib/supabaseServer";

export const getAllExpenses = async () => {
  return supabaseServer.from("expenses").select("*");
};
export const getUniqueExpenses = async (id: string) => {
  return supabaseServer.from("expenses").select("*").eq("id", id);
};

export const addExpense = async (expense: {
  description?: string;
  amount?: number;
  category?: string;
  user_id?: string;
}) => {
  return supabaseServer.from("expenses").insert(expense);
};

export const updateExpense = async (
  id: string,
  data: {
    description?: string;
    amount?: number;
    category?: string;
  }
) => {
  return supabaseServer.from("expenses").update(data).eq("id", id);
};

export const deleteExpense = async (id: string) => {
  return supabaseServer.from("expenses").delete().eq("id", id);
};
