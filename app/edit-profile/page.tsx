"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { Lock, Mail, User } from "lucide-react";
import { UpdateUserInfo } from "@/components/helpers/user";
import { useUserStore } from "@/app/store/user_store";
import { getUserData } from "@/app/hooks/getUserData";
import ProfileImageUpload from "@/components/ui/profileImageUpload";

const EditProfile = () => {
  const { mutate: updateUser } = UpdateUserInfo();
  const sessionUserData = useUserStore((state) => state.sessionUserData);
  const { data: userProfile } = getUserData({
    userId: sessionUserData?.id,
  });

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    image_url: userProfile?.image_url || "",
    username: userProfile?.name || "",
    email: userProfile?.email || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [imagePreview, setImagePreview] = useState<string>(
    userProfile?.image_url || ""
  );
  const [file, setFile] = useState<File | null>(null);

  // Update userData when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setUserData({
        image_url: userProfile.image_url || "",
        username: userProfile.name || "",
        email: userProfile.email || "",
      });
      setImagePreview(userProfile.image_url || "");
    }
  }, [userProfile]);

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!sessionUserData?.id) return;
    if (!userData.username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
    try {
      setLoading(true);
      let newImageUrl = userData?.image_url; // fallback to existing image

      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${sessionUserData.id}.${Date.now()}.${fileExt}`;
        const filePath = `UserImages/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from("image")
          .upload(filePath, file, { upsert: true });

        if (uploadError) {
          console.log("uploadingErr", uploadError);
          return;
        }

        const { data: publicUrlData } = await supabase.storage
          .from("image")
          .getPublicUrl(filePath);
        newImageUrl = publicUrlData.publicUrl;
      }
      updateUser({
        userId: sessionUserData.id,
        data: {
          name: userData?.username,
          // email: userData?.email,
          image_url:
            userData?.image_url !== newImageUrl ? newImageUrl : undefined,
        },
      });
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Edit Profile
          </h1>
          <p className="text-gray-600">
            Manage your account information and settings
          </p>
        </div>
        {/* Profile Image Upload Section */}
        <ProfileImageUpload
          setFile={setFile}
          userProfileImage={userProfile?.image_url || ""}
        />

        {/* Profile Information Section */}
        <Card className="p-6 mb-6 border-0 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <User size={24} className="text-blue-600" />
            Profile Information
          </h2>

          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <Input
                type="text"
                value={userData.username}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, username: e.target.value }))
                }
                placeholder="Enter your username"
                className="w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </label>
              <Input
                type="email"
                value={userData.email}
                disabled
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your email"
                className="w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              />
              <p className="text-xs text-gray-500 mt-2">
                {userProfile?.email === userData.email
                  ? "Your current email address"
                  : "You may need to verify this email"}
              </p>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <Button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> Saving...
                  </span>
                ) : (
                  "Save Profile Changes"
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Password Section */}
        <Card className="p-6 border-0 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Lock size={24} className="text-blue-600" />
            Change Password
          </h2>

          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <Input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                placeholder="Enter your current password"
                className="w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                placeholder="Enter your new password"
                className="w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              />
              <p className="text-xs text-gray-500 mt-2">
                Must be at least 6 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Confirm your new password"
                className="w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              />
            </div>

            {/* Change Password Button */}
            <div className="pt-4">
              <Button
                onClick={handleChangePassword}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> Changing...
                  </span>
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
