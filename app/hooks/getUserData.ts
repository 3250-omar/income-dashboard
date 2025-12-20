import { supabase } from "@/lib/supabaseClient";
import { userType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const getUserData = ({userId , enabled }: {userId: string |undefined, enabled?: boolean}) => {
    return useQuery({
        queryKey: ["user",userId],
        enabled: enabled !== false,
        queryFn: async () :Promise<userType>=> {
            const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
      if (error) throw error;
            return data;
        },
        staleTime: 1000 * 60 * 5,
    } );
};