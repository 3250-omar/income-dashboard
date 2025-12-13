"use client";

import { navigation } from "@/app/constants";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";

interface NavifationCompProps {
  user: any;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  handleLogout: () => void;
}

const NavigationComp = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  handleLogout,
}: NavifationCompProps) => {
  const pathName = usePathname();
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b">
        <Image
          src={
            user?.user_metadata?.avatar_url || "/user-icematte_161669-211.webp"
          }
          alt="User"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h1 className="font-bold text-gray-900">Finance</h1>
          <p className="text-xs text-gray-500">
            {user?.user_metadata?.full_name || user?.email}
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

      {/* Logout Button */}
      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Log out
        </Button>
      </div>
    </div>
  );
};
export default NavigationComp;
