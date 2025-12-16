import { User } from "@supabase/supabase-js";
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
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <NavigationComp
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </aside>
  );
};

export default AsideContainer;
