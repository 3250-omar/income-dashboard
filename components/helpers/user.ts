import { supabase } from "@/lib/supabaseClient";

export const deleteUser = async (id: string) => {
  supabase.from("users").delete().eq("id", id);
};
export const updateUser = async (
  id: string,
  data: { name?: string; email?: string; password?: string; image_url?: string }
) => {
  supabase.from("users").update(data).eq("id", id);
};
