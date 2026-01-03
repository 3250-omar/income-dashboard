import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...updateData
    }: {
      id: string;
      status?: boolean;
      month?: number;
      goal?: string;
      amount?: number;
    }) => {
      if (!id) {
        throw new Error("Goal ID is required for update.");
      }
      const { data, error } = await supabase
        .from("goals")
        .update(updateData)
        .eq("id", id);
      if (error) {
        console.error("Error updating goal:", error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });
};

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("goals")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return data;
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
