"use client";
import React from "react";
import { Form, Input, Card, Typography } from "antd";
import type { FormInstance } from "antd";
import { LockOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Item } = Form;

interface SecurityFormProps {
  form: FormInstance;
}

const SecuritySection: React.FC<SecurityFormProps> = ({ form }) => {
  return (
    <Card className="border-0! shadow-lg!">
      <div className="flex items-center gap-2 mb-6 text-xl font-semibold text-gray-900">
        <LockOutlined className="text-blue-600" />
        <Title level={4} style={{ margin: 0 }}>
          Change Password
        </Title>
      </div>

      <Item
        name="currentPassword"
        label="Current Password"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value && getFieldValue("newPassword")) {
                return Promise.reject(
                  new Error(
                    "Current password is required to set a new password"
                  )
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="Enter your current password"
          size="large"
        />
      </Item>

      <Item
        name="newPassword"
        label="New Password"
        extra="Must be at least 8 characters"
        rules={[{ min: 8, message: "Password must be at least 8 characters" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="Enter your new password"
          size="large"
        />
      </Item>

      <Item
        name="confirmPassword"
        label="Confirm New Password"
        dependencies={["newPassword"]}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="Confirm your new password"
          size="large"
        />
      </Item>
    </Card>
  );
};

export default SecuritySection;
