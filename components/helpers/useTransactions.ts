import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/types/transaction";
import { supabase } from "@/lib/supabaseClient";

export const useTransactions = (type?: "income" | "expense") => {
  return useQuery({
    queryKey: ["transactions", type],
    queryFn: async (): Promise<Transaction[]> => {
      let query = supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: false });

      if (type) {
        query = query.eq("type", type);
      }
      
      const { data, error } = await query;
      if (error) throw error;

      return data;
    },
  });
};
