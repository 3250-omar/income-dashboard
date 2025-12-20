"use client";

import { navigation } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/app/store/user_store";
import { DropdownMenuDemo } from "./sideBarDropDownMenu";
import { getUserData } from "@/app/hooks/getUserData";

interface NavifationCompProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const NavigationComp = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: NavifationCompProps) => {
  const pathName = usePathname();
  const sessionUserData = useUserStore((state) => state.sessionUserData);
  console.log("sessionUserData", sessionUserData);
  const { data: userData } = getUserData({
    userId: sessionUserData?.id,
    enabled: !!sessionUserData?.id,
  });

  console.log("profileop", userData);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b">
        <Image
          src={userData?.image_url || "/user-icematte_161669-211.webp"}
          alt="User"
          width={40}
          height={40}
          className="rounded-full h-10 w-10 object-cover"
        />
        <div>
          <h1 className="font-bold text-gray-900">Finance</h1>
          <p className="text-xs text-gray-500">
            {userData?.name || userData?.email}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathName === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Options Buttons */}
      <div className="p-4 border-t flex justify-center">
        <DropdownMenuDemo />
      </div>
    </div>
  );
};
export default NavigationComp;
