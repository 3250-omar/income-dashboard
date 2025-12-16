import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      // Invalidate all queries that start with "transactions"
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({ queryKey: ["financial-summary"] });
    },
  });
};
