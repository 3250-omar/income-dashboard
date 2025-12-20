"use client";
import Image from "next/image";
import { Card } from "./card";
import { Camera, User } from "lucide-react";
import { useRef, useState } from "react";

const ProfileImageUpload = ({
  userProfileImage,
  setFile,
}: {
  userProfileImage?: string;
  setFile: (file: File) => void;
}) => {
  const [imagePreview, setImagePreview] = useState<string>(
    userProfileImage || ""
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeImageHandler = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const preview = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setImagePreview(preview);
    }
  };

  return (
    <Card className="p-6 mb-6 border-0 shadow-lg">
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-400 to-indigo-600 p-1">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                <User size={64} className="text-gray-400" />
              </div>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors shadow-lg"
          >
            <Camera size={20} />
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onChangeImageHandler}
          className="hidden"
        />
        <p className="text-sm text-gray-600 text-center">
          Click the camera icon to upload a new profile picture
        </p>
      </div>
    </Card>
  );
};

export default ProfileImageUpload;
