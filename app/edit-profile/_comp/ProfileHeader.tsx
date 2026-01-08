"use client";
import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

interface ProfileHeaderProps {
  title: string;
  description: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="mb-8 text-center sm:text-left">
      <Title level={2} className="mb-2! text-gray-900!">
        {title}
      </Title>
      <Text className="text-gray-600 font-medium">{description}</Text>
    </div>
  );
};

export default ProfileHeader;
