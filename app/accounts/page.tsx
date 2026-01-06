"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Button, Spin, Typography, Empty, Row, Col, Space } from "antd";
import { useUserStore } from "@/app/store/user_store";
import { useGetAccounts } from "./api/query";
import { AccountCard } from "./_comp/AccountCard";

const { Title, Paragraph, Text } = Typography;

const AccountsPage = () => {
  const { setAccountDialogIsOpen, setEditingAccount, setAccounts } =
    useUserStore();
  const { data: accounts, isLoading } = useGetAccounts();

  const handleAddAccount = () => {
    setEditingAccount(null);
    setAccountDialogIsOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 ">
      <div className="flex items-center justify-between">
        <Space orientation="vertical" size={0}>
          <Title level={2} className="m-0! text-gray-900 max-sm:text-xl!">
            Accounts
          </Title>
          <Paragraph className="text-gray-600 m-0! max-sm:text-sm!">
            Manage your bank accounts and wallets
          </Paragraph>
        </Space>

        <Button
          type="primary"
          size="large"
          icon={<Plus className="w-5 h-5 max-sm:w-3 max-sm:h-3" />}
          onClick={handleAddAccount}
          className="dashboard-gradient border-none! shadow-lg hover:scale-105 transition-transform flex items-center"
        >
          Add Account
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-32">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {accounts?.map((account: any) => (
            <Col xs={24} md={12} xl={8} key={account.id}>
              <AccountCard account={account} />
            </Col>
          ))}
          {!isLoading && accounts?.length === 0 && (
            <Col span={24}>
              <div className="py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center">
                <Empty
                  description={
                    <Text type="secondary" className="text-lg">
                      No accounts found. Create your first one!
                    </Text>
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                >
                  <Button
                    type="primary"
                    size="large"
                    icon={<Plus className="w-4 h-4" />}
                    onClick={handleAddAccount}
                    className="dashboard-gradient max-sm:text-sm border-none! mt-4"
                  >
                    Add New Account
                  </Button>
                </Empty>
              </div>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default AccountsPage;
