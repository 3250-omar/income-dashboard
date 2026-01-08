//Goals Actions

import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/user_store";
import { toast } from "react-toastify";

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

// Transactions Actions
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const sessionUserData = useUserStore((state) => state.sessionUserData);

  return useMutation({
    mutationFn: async (payload: {
      type: "income" | "expense";
      amount: number;
      category?: string;
      description?: string;
      date: string;
      account_id?: string;
    }) => {
      if (!sessionUserData) throw new Error("Not authenticated");

      const { error } = await supabase.from("transactions").insert({
        ...payload,
        user_id: sessionUserData.id,
      });

      if (error) throw error;
    },

    onSuccess: () => {
      // Invalidate all queries that start with "transactions"
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({ queryKey: ["financial-summary"] });
    },
  });
};
export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

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
        account_id: string;
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
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["financial-summary"] });
    },
  });
};

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
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({ queryKey: ["financial-summary"] });
    },
  });
};

// User Actions
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("users").delete().eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      // Invalidate all queries that start with "transactions"
      queryClient.invalidateQueries({
        queryKey: ["user"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({ queryKey: ["financial-summary"] });
    },
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const { setSessionUserData } = useUserStore();
  return useMutation({
    mutationKey: ["userUpdate"],
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string | number;
      data: { name?: string; email?: string; image_url?: string };
    }) => {
      const { error, data: updatedUser } = await supabase
        .from("users")
        .update(data)
        .eq("id", userId)
        .select()
        .single();
      if (error) {
        toast.error(`Error is ${error?.message}`);
        throw error;
      }
      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setSessionUserData(updatedUser);
    },
  });
};
