"use client";

import { Bell, Search, Mail, Ellipsis, SquareStack } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/app/store/user_store";
import { getUserData } from "@/app/hooks/getUserData";
import Image from "next/image";
import { memo, useMemo } from "react";
import { Dropdown, MenuProps, Space } from "antd";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";

const TopHeader = () => {
  const router = useRouter();
  const { sessionUserData } = useUserStore();
  const { data: userData } = getUserData({
    userId: sessionUserData?.id,
    enabled: !!sessionUserData?.id,
  });
  const logOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/sign-in");
    } catch (error) {
      toast.error(`Error is : ${error}`);
    }
  };
  const items: MenuProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: "Update Profile",
        onClick: () => {
          router.push("/edit-profile");
        },
      },
      {
        type: "divider",
      },
      {
        key: "3",
        label: "Logout",
        danger: true,
        onClick: logOut,
      },
    ],
    [logOut]
  );
  return (
    <header className="h-20 border-b border-slate-100 bg-white flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 p-2 rounded-lg">
          <SquareStack color="white" onClick={() => router.push("/")} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 max-sm:hidden">
          <span>Welcome Back, {userData?.name?.split(" ")[0] || "User"}!</span>
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <Dropdown menu={{ items }}>
          <Space>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 max-w-[150px] truncate">
                  {userData?.name || "Loading..."}
                </p>
                <p className="text-xs text-slate-400">Premium Member</p>
              </div>
              <Image
                src={userData?.image_url || "/user-icematte_161669-211.webp"}
                alt="User Profile"
                width={40}
                height={40}
                className="rounded-xl h-10 w-10 object-cover border-2 border-slate-50"
              />
            </div>
            <Ellipsis />
          </Space>
        </Dropdown>
      </div>
    </header>
  );
};

export default memo(TopHeader);
