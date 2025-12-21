"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import SideBar from "@/components/sideBar";
import { useUserStore } from "../store/user_store";
import { User } from "@supabase/supabase-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormContainer from "@/components/reusableComponents/Form";
import path from "path";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [testUser, setTestUser] = useState<User>();
  console.log("🚀 ~ ConditionalLayout ~ testUser:", testUser);
  const router = useRouter();
  const pathname = usePathname();
  const setUser = useUserStore((state) => state.setSessionUserData);
  const setProfile = useUserStore((state) => state.setProfile);
  const { dialogIsOpen, setDialogIsOpen } = useUserStore();
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      console.log("Test Session", data?.user);

      if (!data.user) {
        router.push("/sign-in");
        return;
      }
      const sessionUserData = data?.user;

      if (!sessionUserData) return;
      setUser(sessionUserData);
      console.log("🚀 ~ ConditionalLayout ~ profile:", sessionUserData);
      try {
        await supabase
          .from("users")
          .update({
            name: sessionUserData.user_metadata?.name,
            image_url: sessionUserData.user_metadata?.image_url,
          })
          .eq("id", sessionUserData.id);
      } catch {
        console.log("error While eddited");
      }
    });
  }, [setProfile, setUser, router]);

  if (pathname.includes("sign-in")) {
    return (
      <div className="min-h-screen bg-gray-50">
        <>{children}</>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar />
      <div className="lg:pl-64">{children}</div>
      <Dialog
        open={dialogIsOpen}
        onOpenChange={(open) => {
          setDialogIsOpen(open);
          // if (!open) resetForm();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"Transaction"}</DialogTitle>
          </DialogHeader>
          <FormContainer />
        </DialogContent>
      </Dialog>
    </div>
  );
}
