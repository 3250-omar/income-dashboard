import { Upload, Avatar, Card, GetProp, UploadProps, Typography } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

const { Title, Text } = Typography;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

interface ProfileAvatarProps {
  value?: string | File;
  onChange?: (file: File) => void;
}

const ProfileAvatar = ({ value, onChange }: ProfileAvatarProps) => {
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  // Generate preview only if value is a File
  useEffect(() => {
    if (value instanceof File) {
      getBase64(value as FileType, (url) => {
        setFilePreview(url);
      });
    } else {
      setTimeout(() => setFilePreview(undefined), 0);
    }
  }, [value]);

  const beforeUpload = (file: FileType) => {
    onChange?.(file);
    return false; // Prevent default upload behavior
  };

  const avatarSrc = typeof value === "string" ? value : filePreview;

  return (
    <Card className="mb-6 border-0! shadow-lg!">
      <div className="flex items-center gap-2 mb-8 text-xl font-semibold text-gray-900">
        <CameraOutlined className="text-blue-600" />
        <Title level={4} style={{ margin: 0 }}>
          Profile Picture
        </Title>
      </div>

      <div className="flex flex-col items-center justify-center py-4 gap-4">
        <Upload
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          maxCount={1}
        >
          <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
            <div className="p-1 rounded-full bg-linear-to-br from-blue-400 to-indigo-600 shadow-xl">
              <Avatar
                size={160}
                src={avatarSrc}
                className="bg-gray-100 border-4 border-white"
              />
            </div>

            {/* Camera Overlay */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-4 border-white/20">
              <div className="text-center">
                <CameraOutlined className="text-3xl text-white mb-1" />
                <div className="text-[10px] text-white font-bold uppercase tracking-wider">
                  Change
                </div>
              </div>
            </div>
          </div>
        </Upload>

        <div className="mt-6 text-center">
          <Text className="text-gray-500 block">
            Click the avatar to upload a new photo
          </Text>
          <Text type="secondary" className="text-[12px]">
            PNG, JPG or GIF (max. 800x800px)
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default ProfileAvatar;
