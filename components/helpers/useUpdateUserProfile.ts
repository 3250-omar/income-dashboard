import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";

export const useUpdateUserProfile = () => {
  const updateUserProfile = async (
    userId: string | number,
    data: {
      name?: string;
      email?: string;
      image_url?: string;
    }
  ) => {
    if (!userId) {
      toast.error("User ID is required");
      return false;
    }

    if (data.name && !data.name.trim()) {
      toast.error("Username cannot be empty");
      return false;
    }

    try {
      const { error } = await supabase
        .from("users")
        .update({
          name: data.name,
          email: data.email,
          image_url: data.image_url,
        })
        .eq("id", userId);

      if (error) {
        toast.error(`Failed to update profile: ${error.message}`);
        return false;
      }

      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      toast.error("Failed to update profile");
      return false;
    }
  };

  return { updateUserProfile };
};
