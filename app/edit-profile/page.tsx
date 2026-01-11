"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import { useUserStore } from "@/app/store/user_store";
import { useGetUserData } from "@/app/hooks/getUserData";
import { useUpdateUserInfo } from "../api/actions";
import { Spin, Form, Button } from "antd";
import ProfileHeader from "./_comp/ProfileHeader";
import ProfileDetailsSection from "./_comp/ProfileDetailsSection";
import SecuritySection from "./_comp/SecuritySection";
import ProfileAvatar from "./_comp/ProfileAvatar";

const { Item } = Form;

const EditProfile = () => {
  const [form] = Form.useForm();
  const [isUploading, setIsUploading] = useState(false);
  const imagePreview = Form.useWatch("image_url", form);
  console.log("🚀 ~ EditProfile ~ imagePreview:", imagePreview);
  const { mutate: updateUser, isPending } = useUpdateUserInfo();
  const sessionUserData = useUserStore((state) => state.sessionUserData);
  const { data: userProfile } = useGetUserData({
    userId: sessionUserData?.id,
    enabled: !!sessionUserData?.id,
  });
  console.log("🚀 ~ EditProfile ~ userProfile:", userProfile);

  // Initialize form values
  useEffect(() => {
    if (userProfile) {
      form.setFieldsValue({
        image_url: userProfile.image_url || "",
        username: userProfile.name || "",
        email: userProfile.email || "",
      });
    }
  }, [userProfile, form]);

  // Upload file to Supabase Storage
  const uploadImageToStorage = async (file: File): Promise<string | null> => {
    if (!sessionUserData?.id) return null;

    const fileExt = file.name.split(".").pop();
    const fileName = `${sessionUserData.id}.${Date.now()}.${fileExt}`;
    const filePath = `UserImages/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("image")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Error uploading image");
      return null;
    }

    const { data: publicUrlData } = await supabase.storage
      .from("image")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  // Unified submission handler
  const onFinish = async (values: any) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    if (!sessionUserData?.id) return;

    try {
      let imageUrlToSave = values.image_url;

      // If image_url is a File object (from new upload), upload it first
      if (values.image_url && typeof values.image_url !== "string") {
        setIsUploading(true);
        try {
          const file = values.image_url as File;
          const uploadedUrl = await uploadImageToStorage(file);

          if (uploadedUrl) {
            imageUrlToSave = uploadedUrl;
            // Update the form field with the real URL so subsequent saves work
            form.setFieldValue("image_url", uploadedUrl);
          } else {
            toast.error("Failed to upload image");
            return; // Stop if image upload failed
          }
        } finally {
          setIsUploading(false);
        }
      }

      // 1. Update Profile Info
      updateUser({
        userId: sessionUserData.id,
        data: {
          name: values.username,
          email: values.email,
          image_url: imageUrlToSave,
        },
      });

      // 2. Change Password (if provided)
      if (values.newPassword) {
        const { error } = await supabase.auth.updateUser({
          password: values.newPassword,
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Password changed successfully");
          form.resetFields([
            "currentPassword",
            "newPassword",
            "confirmPassword",
          ]);
        }
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (!userProfile || !sessionUserData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <ProfileHeader
          title="Edit Profile"
          description="Manage your account information and settings"
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          initialValues={{
            image_url: userProfile.image_url || "",
            username: userProfile.name,
            email: userProfile.email,
          }}
          className="space-y-6!"
        >
          {/* Avatar Section - Shows preview, uploads on save */}
          <Item
            name="image_url"
            noStyle
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getValueFromEvent={(e: any) => {
              // If coming from ProfileAvatar's onChange, it's just the File object
              return e;
            }}
          >
            <ProfileAvatar />
          </Item>

          {/* Profile Details Section */}
          <ProfileDetailsSection />

          {/* Security Section */}
          <SecuritySection form={form} />

          {/* Unified Save Button */}
          <Item className="mt-8">
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending || isUploading}
              size="large"
              className="w-full bg-blue-600 hover:bg-blue-700! h-12 text-lg font-semibold shadow-md"
            >
              Save All Changes
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
