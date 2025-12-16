import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useFinancialSummary = () => {
  return useQuery({
    queryKey: ["financial-summary"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_financial_summary");

      if (error) throw error;

      const { income, expenses } = data[0];
      return {
        income,
        expenses,
        balance: income - expenses,
      };
    },
  });
};
