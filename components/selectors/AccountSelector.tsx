"use client";

import { Select, SelectProps } from "antd";
import { useGetAccounts } from "@/app/accounts/api/query";

interface AccountSelectorProps extends SelectProps {
  // Add any custom props here if needed
}

export const AccountSelector = (props: AccountSelectorProps) => {
  const { data: accounts, isLoading } = useGetAccounts();

  const accountOptions =
    accounts?.map((acc: any) => ({
      label: acc.name,
      value: acc.id,
    })) || [];

  return (
    <Select
      loading={isLoading}
      options={accountOptions}
      placeholder="Select Account"
      className="w-full"
      {...props}
    />
  );
};
