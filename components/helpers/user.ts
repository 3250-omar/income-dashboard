import { useUserStore } from "@/app/store/user_store";
import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const deleteUser = async (id: string) => {
  supabase.from("users").delete().eq("id", id);
};

export const UpdateUserInfo = () => {
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
