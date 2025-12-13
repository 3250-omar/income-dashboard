// expensesService.ts

import { supabase } from "@/lib/supabaseClient";

export const getAllIncomes = async () => {
  return supabase.from('incomes').select('*');
};
export const getUniqueIncomes = async (id:string) => {
  return supabase.from('incomes').select('*').eq('id', id);
};

export const addIncomes = async (income: { description: string; amount: number; category: string; user_id: string }) => {
  return supabase.from('incomes').insert(income);
};

export const updateIncomes  = async (id: string, data: any) => {
  return supabase.from('incomes').update(data).eq('id', id);
};

export const deleteIncomes  = async (id: string) => {
  return supabase.from('incomes').delete().eq('id', id);
};
