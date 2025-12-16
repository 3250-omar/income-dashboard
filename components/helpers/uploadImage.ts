import { supabase } from "@/lib/supabaseClient";

export const uploadImage = async (file: File) => {
  console.log("🚀 ~ uploadImage ~ file:", file);
  const filePath = `image/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage.from("image").upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("image").getPublicUrl(filePath);
  console.log("🚀 ~ uploadImage ~ data:", data);

  return data.publicUrl;
};
