"use client";

import { navigation } from "@/app/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenuDemo } from "./sideBarDropDownMenu";

interface NavifationCompProps {
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const NavigationComp = ({ setIsSidebarOpen }: NavifationCompProps) => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navigation.map((item) => {
          const isActive = pathName === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-semibold text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      {/* <div className="p-4 border-t border-slate-100">
        <DropdownMenuDemo />
      </div> */}
    </div>
  );
};
export default NavigationComp;
