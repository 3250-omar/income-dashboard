"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import { useUserStore } from "@/app/store/user_store";
import { getUserData } from "@/app/hooks/getUserData";
import { useUpdateUserInfo } from "../api/actions";
import { Spin, Form, Button } from "antd";
import ProfileHeader from "./_comp/ProfileHeader";
import ProfileDetailsSection from "./_comp/ProfileDetailsSection";
import SecuritySection from "./_comp/SecuritySection";
import ProfileAvatar from "./_comp/ProfileAvatar";

const { Item } = Form;

const EditProfile = () => {
  const [form] = Form.useForm();
  const { mutate: updateUser, isPending } = useUpdateUserInfo();
  const sessionUserData = useUserStore((state) => state.sessionUserData);
  const { data: userProfile } = getUserData({
    userId: sessionUserData?.id,
  });

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

  // Handle file upload (called by ProfileAvatar)
  const handleUpload = async (file: File): Promise<string | null> => {
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
    if (!sessionUserData?.id) return;

    try {
      // 1. Update Profile Info
      // Check if profile details changed (optional optimization, but we can just update)
      updateUser({
        userId: sessionUserData.id,
        data: {
          name: values.username,
          email: values.email,
          image_url: values.image_url,
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
    } finally {
      // console.log("that will be executed after what happen ");
    }
  };

  if (!userProfile) {
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
            image_url: userProfile.image_url,
            username: userProfile.name,
            email: userProfile.email,
          }}
          className="space-y-6!"
        >
          {/* Avatar Section - Controlled by Form */}
          <Item name="image_url" noStyle>
            <ProfileAvatar onUpload={handleUpload} />
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
              loading={isPending}
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
