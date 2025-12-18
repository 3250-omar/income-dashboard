import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useUserStore } from "@/app/store/user_store";

export const deleteUser = async (id: string) => {
  supabase.from("users").delete().eq("id", id);
};
export const updateUser = async (
  id: string,
  data: { name?: string; email?: string; password?: string; image_url?: string }
) => {
  supabase.from("users").update(data).eq("id", id);
};

export const UpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const setProfile = useUserStore((state) => state.setProfile);

  return useMutation({
    mutationKey: ["user"],
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
      if (updatedUser) {
        setProfile(updatedUser);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Profile updated successfully");
    },
  });
};
