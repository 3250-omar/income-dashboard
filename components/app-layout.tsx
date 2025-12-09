"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, DollarSign, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { signOut } = useClerk();
  const { user } = useUser();
  console.log("🚀 ~ AppLayout ~ user:", user);

  const navigation = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Transactions", href: "/finance", icon: DollarSign },
  ];

  const handleLogout = async () => {
    console.log("🚀 ~ handleLogout ~ user12:");
    await signOut({ redirectUrl: "/sign-in" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b">
            <Image
              src={user?.imageUrl || "/user-icematte_161669-211.webp"}
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h1 className="font-bold text-gray-900">Finance</h1>
              <p className="text-xs text-gray-500">
                {user?.fullName || "User Name"}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
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
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:pl-64">{children}</div>
    </div>
  );
}
