import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/types/transaction";
import { supabase } from "@/lib/supabaseClient";

export const useTransactions = ({
  type,
  enabled,
  userId,
  page,
  pageSize,
}: {
  type?: "income" | "expense";
  enabled?: boolean;
  userId?: string;
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ["transactions", type, userId, page, pageSize],
    enabled,
    queryFn: async (): Promise<{
      transactions: Transaction[];
      count: number | null;
    }> => {
      let query = supabase
        .from("transactions")
        .select("*", { count: "exact" })
        .order("date", { ascending: false });

      if (type) {
        query = query.eq("type", type);
      }
      if (userId) {
        query = query.eq("user_id", userId);
      }

      if (page !== undefined && pageSize !== undefined) {
        const from = page * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return {
        transactions: (data as Transaction[]) || [],
        count: count,
      };
    },
    staleTime: 1000 * 60 * 5, //   5 minutes
  });
};
