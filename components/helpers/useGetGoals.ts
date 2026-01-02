"use client";
import { useUserStore } from "@/app/store/user_store";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useGetGoals = (month?: number) => {
  const sessionUserData = useUserStore((state) => state.sessionUserData);

  return useQuery({
    queryKey: ["goals", month],
    queryFn: async () => {
      let query = supabase
        .from("goals")
        .select("*")
        .eq("user_id", sessionUserData?.id);

      if (month !== undefined) {
        query = query.eq("month", month);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!sessionUserData?.id,
  });
};
