// expensesService.ts

import { supabase } from "@/lib/supabaseClient";

export const getAllExpenses = async () => {
  return supabase.from('expenses').select('*');
};
export const getUniqueExpenses = async (id:string) => {
  return supabase.from('expenses').select('*').eq('id' , id);
};

export const addExpense = async (expense: { description: string; amount: number; category: string; user_id: string }) => {
  return supabase.from('expenses').insert(expense);
};

export const updateExpense = async (id: string, data: any) => {
  return supabase.from('expenses').update(data).eq('id', id);
};

export const deleteExpense = async (id: string) => {
  return supabase.from('expenses').delete().eq('id', id);
};
