"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import SideBar from "@/components/sideBar";
import { useUserStore } from "../store/user_store";
import { User } from "@supabase/supabase-js";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [testUser, setTestUser] = useState<User>();
  console.log("🚀 ~ ConditionalLayout ~ testUser:", testUser);
  const router = useRouter();
  const pathname = usePathname();
  const setUser = useUserStore((state) => state.setUser);
  const setProfile = useUserStore((state) => state.setProfile);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      console.log("Test Session", data.session?.user);

      if (!data.session) {
        router.push("/sign-in");
        return;
      }
      const user = data.session?.user;

      if (!user) return;
      setUser(user);
      setTestUser(user);

      // Fetch profile from users table
      const { data: profileData } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      try {
        await supabase
          .from("users")
          .update({
            name: user.user_metadata?.full_name || user.user_metadata?.name,
            image_url:
              user.user_metadata?.avatar_url || user.user_metadata?.picture,
          })
          .eq("id", user.id);
      } catch {
        console.log("error While eddited");
      }
    });
  }, [router, setProfile, setUser]);

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
    </div>
  );
}
