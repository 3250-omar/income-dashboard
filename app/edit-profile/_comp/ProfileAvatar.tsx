"use client";
import React, { useState, useEffect } from "react";
import { Upload, Avatar, Card, Button } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

interface ProfileAvatarProps {
  value?: string;
  onChange?: (value: string) => void;
  onUpload?: (file: File) => Promise<string | null>;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  value,
  onChange,
  onUpload,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(value);

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  const triggerChange = (changedValue: string) => {
    onChange?.(changedValue);
  };

  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;
    setLoading(true);
    try {
      if (onUpload) {
        const url = await onUpload(file as File);
        if (url) {
          triggerChange(url);
          setImageUrl(url); // Optimistic update
          onSuccess(url);
        } else {
          throw new Error("Upload failed or returned null");
        }
      } else {
        // If no upload handler, maybe we just want to pass the file?
        // But based on user request, they want immediate upload logic back.
        // We'll assume successful upload for now if no handler provided but that shouldn't happen based on page.tsx
        onSuccess("ok");
      }
    } catch (error) {
      console.error("Upload failed", error);
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6 border-0! shadow-lg!">
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <Upload
            name="avatar"
            showUploadList={false}
            customRequest={customRequest}
            className="cursor-pointer"
            disabled={loading}
          >
            <div className="relative group">
              <div className="p-1 rounded-full bg-linear-to-br from-blue-400 to-indigo-600">
                <Avatar
                  size={128}
                  src={imageUrl}
                  icon={<UserOutlined />}
                  className="bg-gray-200"
                />
              </div>
              {!loading && (
                <Button
                  style={{ border: 0 }}
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center shadow-lg"
                >
                  <CameraOutlined style={{ fontSize: "20px" }} />
                </Button>
              )}
            </div>
          </Upload>
        </div>
        <p className="text-sm text-gray-500 text-center">
          Click the camera icon to upload a new profile picture
        </p>
      </div>
    </Card>
  );
};

export default ProfileAvatar;
