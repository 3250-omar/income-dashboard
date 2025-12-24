"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import SideBar from "@/components/sideBar";
import { useUserStore } from "../store/user_store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormContainer from "@/components/reusableComponents/Form";
import TopHeader from "@/components/dashboard/header";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const setUser = useUserStore((state) => state.setSessionUserData);
  const { dialogIsOpen, setDialogIsOpen } = useUserStore();

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

      // try {
      //   await supabase
      //     .from("users")
      //     .update({
      //       name: sessionUserData.user_metadata?.name,
      //       image_url: sessionUserData.user_metadata?.image_url,
      //     })
      //     .eq("id", sessionUserData.id);
      // } catch (error) {
      //   console.error("Error updating user data:", error);
      // }
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
      <Dialog
        open={dialogIsOpen}
        onOpenChange={(open) => {
          setDialogIsOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transaction</DialogTitle>
          </DialogHeader>
          <FormContainer />
        </DialogContent>
      </Dialog>
    </div>
  );
}
