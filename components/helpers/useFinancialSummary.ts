import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useFinancialSummary = ({
  userId,
  enabled,
}: {
  userId?: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["financial-summary", userId],
    enabled,
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
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
