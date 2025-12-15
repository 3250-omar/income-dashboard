// expensesService.ts

"use server";
import { supabaseServer } from "@/lib/supabaseServer";

export const getAllIncomes = async () => {
  return supabaseServer.from("incomes").select("*");
};
export const getUniqueIncomes = async (id: string) => {
  return supabaseServer.from("incomes").select("*").eq("id", id);
};

export const addIncomes = async (income: {
  description?: string;
  amount?: number;
  category?: string;
  user_id?: string;
}) => {
  return supabaseServer.from("incomes").insert(income);
};

export const updateIncomes = async (
  id: string,
  data: {
    description?: string;
    amount?: number;
    category?: string;
  }
) => {
  return supabaseServer.from("incomes").update(data).eq("id", id);
};

export const deleteIncomes = async (id: string) => {
  return supabaseServer.from("incomes").delete().eq("id", id);
};
