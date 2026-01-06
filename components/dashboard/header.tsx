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
          {/* <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> */}
          <SquareStack color="white" onClick={() => router.push("/")} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 max-sm:hidden">
          <span>Welcome Back, {userData?.name?.split(" ")[0] || "User"}!</span>
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search"
            className="pl-10 h-10 bg-slate-50 border-none rounded-xl text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Mail className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div> */}

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
