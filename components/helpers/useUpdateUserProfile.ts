import { useUserStore } from "@/app/store/user_store";
import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["user"],
    mutationFn: async (data?: {
      name?: string;
      image_url?: string;
      email?: string;
      userId?: string;
    }) => {
      console.log("data12", data);
      // Update database record
      const { error, data: userData } = await supabase
        .from("users")
        .update({
          name: data?.name,
          email: data?.email,
          image_url: data?.image_url,
        })
        .eq("id", data?.userId)
        .select()
        .single();

      // Update auth metadata
      const { error: authError } = await supabase.auth.updateUser({
        email: data?.email,
        data: {
          name: data?.name,
          avatar_url: data?.image_url, // auth uses avatar_url
        },
      });
      console.log("userData123", userData);
      if (error || authError) {
        throw new Error(error?.message || authError?.message);
      }
      return userData;
    },
    onSuccess: (userData) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
        refetchType: "active",
      });
      useUserStore.getState().setSessionUserData(userData);
    },
  });
};
