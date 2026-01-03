"use client";

import { useUserStore } from "@/app/store/user_store";
import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const sessionUserData = useUserStore((state) => state.sessionUserData);

  return useMutation({
    mutationFn: async (payload: { name: string }) => {
      if (!sessionUserData) throw new Error("Not authenticated");

      const { error } = await supabase.from("accounts").insert({
        ...payload,
        user_id: sessionUserData.id,
      });

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
        refetchType: "active",
      });
      //   queryClient.invalidateQueries({ queryKey: ["financial-summary"] });
    },
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { id: string; name: string }) => {
      const { error } = await supabase
        .from("accounts")
        .update({ name: payload.name })
        .eq("id", payload.id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
        refetchType: "active",
      });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("accounts").delete().eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
        refetchType: "active",
      });
    },
  });
};
