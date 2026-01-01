"use client";
import { useUserStore } from "@/app/store/user_store";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useGetGoals = () => {
  const sessionUserData = useUserStore((state) => state.sessionUserData);

  return useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", sessionUserData?.id);
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, //   5 minutes
  });
};
