"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import SideBar from "@/components/sideBar";
import { useUserStore } from "../store/user_store";
import TopHeader from "@/components/dashboard/header";
import AddTransactionModal from "../_comp/modals/addTransactionModal";
import AddGoalModal from "../_comp/modals/AddGoalModal";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const setUser = useUserStore((state) => state.setSessionUserData);

  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        if (!pathname.includes("sign-in")) {
          router.push("/sign-in");
        }
        return;
      }
      setUser(data.session.user);
    };

    checkSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);
      setUser(session?.user ?? null);
      if (event === "SIGNED_OUT") {
        router.push("/sign-in");
      }
    });

    // Proactively refresh session on tab visibility change
    // This helps avoid "JWT expired" errors after long periods of inactivity
    // const handleVisibilityChange = async () => {
    //   if (document.visibilityState === "visible") {
    //     console.log("Tab visible: Refreshing session...");
    //     const { data, error } = await supabase.auth.getSession();
    //     if (error) {
    //       console.error(
    //         "Error refreshing session on visibility change:",
    //         error
    //       );
    //     } else if (data.session) {
    //       setUser(data.session.user);
    //     }
    //   }
    // };

    // document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      subscription.unsubscribe();
      // document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [setUser, router, pathname]);
  if (pathname.includes("sign-in")) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <SideBar />
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen relative overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <AddTransactionModal />
      <AddGoalModal />
    </div>
  );
}
