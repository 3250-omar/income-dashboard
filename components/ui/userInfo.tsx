"use client";

import { Button } from "./button";
import NavigationComp from "./navigationComp";
import AsideContainer from "./asideContainer";
import { memo } from "react";
import type { User } from "@supabase/supabase-js";

interface UserInfoAndAsideProps {
  setIsSidebarOpen: (state: boolean) => void;
  isSidebarOpen: boolean;
  user: User | null;
  onLogout: () => Promise<void>;
}

const UserInfoAndAside = ({
  isSidebarOpen,
  setIsSidebarOpen,
  user,
  onLogout,
}: UserInfoAndAsideProps) => {
  return (
    <AsideContainer
      user={user}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      handleLogout={onLogout}
    />
  );
};

export default memo(UserInfoAndAside);
