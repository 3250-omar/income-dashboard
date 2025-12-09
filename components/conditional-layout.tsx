"use client";

import { usePathname } from "next/navigation";
import AppLayout from "./app-layout";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Pages that should not have the sidebar layout
  const noLayoutPages = ["/register"];

  const shouldShowLayout = !noLayoutPages.includes(pathname);

  if (shouldShowLayout) {
    return <AppLayout>{children}</AppLayout>;
  }

  return <>{children}</>;
}
