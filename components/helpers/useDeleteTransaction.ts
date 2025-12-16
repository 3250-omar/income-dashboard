import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { supabase } from "@/lib/supabaseClient";

export const useDeleteTransaction = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["financial-summary"] });
    },
  });
};
