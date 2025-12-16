import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/app/store/user_store";

export const useCreateTransaction = () => {
  const user = useUserStore((state) => {
    return state.user;
  });
  console.log("🚀 ~ useCreateTransaction ~ user:", user);

  return useMutation({
    mutationFn: async (payload: {
      type: "income" | "expense";
      amount: number;
      category?: string;
      description?: string;
      date: string;
    }) => {
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("transactions").insert({
        ...payload,
        user_id: user.id,
      });

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["financial-summary"] });
    },
  });
};
