import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/types/transaction";
import { supabase } from "@/lib/supabaseClient";

export const useTransactions = ({
  type,
  enabled,
  userId,
}: {
  type?: "income" | "expense";
  enabled?: boolean;
  userId?: string;
}) => {
  return useQuery({
    queryKey: ["transactions", type],
    enabled,
    queryFn: async (): Promise<Transaction[]> => {
      let query = supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: false });

      if (type) {
        query = query.eq("type", type);
      }
      if (userId) {
        query = query.eq("user_id", userId);
      }
      const { data, error } = await query;
      if (error) throw error;

      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
