"use client";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/app/store/user_store";
import { supabase } from "@/lib/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  const sessionUserData = useUserStore((state) => state.sessionUserData);

  return useMutation({
    mutationFn: async (payload: {
      month: number;
      goal: string;
      goal_amount?: number;
      status: boolean;
    }) => {
      if (!sessionUserData) throw new Error("Not authenticated");

      const { error } = await supabase.from("goals").insert({
        ...payload,
        user_id: sessionUserData.id,
      });

      if (error) throw error;
    },

    onSuccess: () => {
      // Invalidate all queries that start with "goals"
      queryClient.invalidateQueries({
        queryKey: ["goals"],
        refetchType: "active",
      });
    },
  });
};
