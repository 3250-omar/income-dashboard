"use client";
import React from "react";
import { Form, Input, Card, Typography } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Item } = Form;
const ProfileDetailsSection: React.FC = () => {
  return (
    <Card className="mb-6 border-0! shadow-lg!">
      <div className="flex items-center gap-2 mb-6 text-xl font-semibold text-gray-900">
        <UserOutlined className="text-blue-600" />
        <Title level={4} style={{ margin: 0 }}>
          Profile Information
        </Title>
      </div>

      <Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          prefix={<UserOutlined className="text-gray-400" />}
          placeholder="Enter your username"
          size="large"
        />
      </Item>

      <Item name="email" label="Email Address">
        <Input
          prefix={<MailOutlined className="text-gray-400" />}
          placeholder="Enter your email"
          size="large"
        />
      </Item>
    </Card>
  );
};

export default ProfileDetailsSection;
