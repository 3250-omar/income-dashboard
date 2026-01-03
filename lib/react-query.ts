import { QueryCache, QueryClient } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: async (error: any) => {
      if (error?.code === "PGRST303") {
        console.warn("Global JWT expiration detected. Refreshing session...");
        await supabase.auth.getSession();
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Retry immediately if JWT is expired (the global onError handles the refresh)
        if (error?.code === "PGRST303" && failureCount < 2) return true;
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
