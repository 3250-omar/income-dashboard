"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import SideBar from "@/components/sideBar";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      console.log("Test Session", data.session?.user);

      if (!data.session) {
        router.push("/sign-in");
      }
      const user = data.session?.user;
      if (!user) return;
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
  }, []);

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
