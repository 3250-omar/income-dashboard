"use client";

import AsideContainer from "./asideContainer";
import { memo } from "react";

interface UserInfoAndAsideProps {
  setIsSidebarOpen: (state: boolean) => void;
  isSidebarOpen: boolean;
}

const UserInfoAndAside = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: UserInfoAndAsideProps) => {
  return (
    <AsideContainer
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    />
  );
};

export default memo(UserInfoAndAside);
