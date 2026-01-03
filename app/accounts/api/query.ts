"use client";

import { useUserStore } from "@/app/store/user_store";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const useGetAccounts = () => {
  const sessionUserData = useUserStore((state) => state.sessionUserData);
  return useQuery({
    queryKey: ["accounts"],
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
