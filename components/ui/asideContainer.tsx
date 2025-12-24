"use client";
import NavigationComp from "./navigationComp";

interface AsideContainerProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const AsideContainer = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: AsideContainerProps) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#f8fafc] border-r border-slate-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <NavigationComp setIsSidebarOpen={setIsSidebarOpen} />
    </aside>
  );
};

export default AsideContainer;
