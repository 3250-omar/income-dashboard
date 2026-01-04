"use client";
import React from "react";
import { Row, Col, Card, Statistic, Typography } from "antd";

const { Title, Text } = Typography;

interface AccountsSectionProps {
  accounts: any[];
}

export const AccountsSection: React.FC<AccountsSectionProps> = React.memo(
  ({ accounts }) => {
    return (
      <Row gutter={[16, 16]}>
        {accounts.map((account: any) => (
          <Col xs={24} md={8} key={account.id}>
            <Card
              variant="borderless"
              className="shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#3b82f6] bg-[#ffffff]"
            >
              <Title level={4} className="m-0! text-[#111827]">
                {account.name}
              </Title>
              <Text type="secondary" className="text-[#6b7280]">
                {account.type}
              </Text>
              <div className="mt-4">
                <Statistic
                  value={account.balance}
                  precision={2}
                  prefix={<span className="text-[#3b82f6]">$</span>}
                  styles={{ content: { color: "#111827", fontWeight: 700 } }}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
);

AccountsSection.displayName = "AccountsSection";
