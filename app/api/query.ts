"use client";

import { useUserStore } from "@/app/store/user_store";
import { supabase } from "@/lib/supabaseClient";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

//Accounts Queries
export const useGetAccounts = () => {
  const sessionUserData = useUserStore((state) => state.sessionUserData);
  return useQuery({
    queryKey: ["accounts", sessionUserData?.id],
    queryFn: async () => {
      if (!sessionUserData) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", sessionUserData.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data as any[]; // Type this better if possible or use account interface
    },
    refetchOnWindowFocus: false,
  });
};

//Goals Queries
export const useGetGoals = (month?: number, status?: boolean) => {
  const sessionUserData = useUserStore((state) => state.sessionUserData);

  return useQuery({
    queryKey: ["goals", sessionUserData?.id, month, status],
    queryFn: async () => {
      let query = supabase
        .from("goals")
        .select("*")
        .eq("user_id", sessionUserData?.id);

      if (month !== undefined) {
        query = query.eq("month", month);
      }

      if (status !== undefined) {
        query = query.eq("status", status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!sessionUserData?.id,
    refetchOnWindowFocus: false,
  });
};

//Transactions Queries
export const useTransactions = ({
  type,
  enabled,
  userId,
  accountId,
  page,
  pageSize,
  // month,
}: {
  type?: "income" | "expense";
  enabled?: boolean;
  userId?: string;
  accountId?: string;
  page?: number;
  pageSize?: number;
  // month?: string;
}) => {
  return useQuery({
    queryKey: ["transactions", type, userId, accountId, page, pageSize],
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
      if (accountId) {
        query = query.eq("account_id", accountId);
      }
      // if (month) {
      //   query = query.eq("date", month);
      // }

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
      const { data, error } = await supabase.rpc("get_dashboard_totals");

      if (error) throw error;

      const { current_month, net_total_all_time } = data;
      return {
        income: current_month.income,
        expenses: current_month.expense,
        balance: net_total_all_time,
      };
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
