"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import SideBar from "@/components/sideBar";
import { useUserStore } from "../store/user_store";
import TopHeader from "@/components/dashboard/header";
import AddTransactionModal from "../_comp/modals/addTransactionModal";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const setUser = useUserStore((state) => state.setSessionUserData);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/sign-in");
        return;
      }
      const sessionUserData = data?.user;
      console.log("🚀 ~ ConditionalLayout ~ sessionUserData:", sessionUserData);
      if (!sessionUserData) return;
      setUser(sessionUserData);
    });
  }, [setUser, router]);

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
    </div>
  );
}
