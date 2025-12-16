import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { supabase } from "@/lib/supabaseClient";

export const useUpdateTransaction = () => {
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<{
        amount: number;
        category: string;
        description: string;
        date: string;
      }>;
    }) => {
      const { error } = await supabase
        .from("transactions")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["financial-summary"] });
    },
  });
};
