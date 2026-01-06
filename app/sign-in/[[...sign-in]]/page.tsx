"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthHeader } from "./_comp/auth-header";
import { SignInForm } from "./_comp/sign-in-form";
import { SignUpForm } from "./_comp/sign-up-form";
import { SocialAuthButtons } from "./_comp/social-auth-buttons";
import { AuthToggle } from "./_comp/auth-toggle";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import VerificationForm from "./_comp/confirm";
import { useUserStore } from "@/app/store/user_store";
import { UpdateUserInfo } from "@/components/helpers/user";

// --- Types ---
interface SignInValues {
  email?: string;
  password?: string;
  [key: string]: any;
}

interface SignUpValues {
  name?: string;
  email?: string;
  password?: string;
  [key: string]: any;
}

interface VerificationValues {
  code: string;
}

// --- Helper: Image Upload ---
async function uploadProfileImage(file: File) {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `UserImages/${fileName}`;
    const { error: uploadError } = await supabase.storage
      .from("image")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("uploadingErr", uploadError);
      return "";
    }

    const { data: publicUrlData } = await supabase.storage
      .from("image")
      .getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Image upload exception:", error);
    return "";
  }
}

export default function RegisterPage() {
  const router = useRouter();
  const setSessionUserData = useUserStore((state) => state.setSessionUserData);
  const [mode, setMode] = useState<"signin" | "signup" | "verification">(
    "signin"
  );

  const { mutateAsync: updateUserInfo } = UpdateUserInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setFile(null);
  };

  const handleSignInSubmit = async (values: SignInValues) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email || "",
        password: values.password || "",
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        setSessionUserData(data.user);
        toast.success("Successful login");
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (values: SignUpValues) => {
    setIsLoading(true);
    let newImageUrl = "";

    if (file) {
      newImageUrl = await uploadProfileImage(file);
    }

    try {
      // Create account
      const { error: signupError, data: signUpUserData } =
        await supabase.auth.signUp({
          email: values.email || "",
          password: values.password || "",
          options: {
            data: { name: values.name, image_url: newImageUrl },
          },
        });

      if (signupError) {
        toast.error(signupError.message);
        setIsLoading(false);
        return;
      }

      if (signUpUserData?.user?.id) {
        await updateUserInfo({
          userId: signUpUserData.user.id,
          data: {
            name: values.name,
            image_url: newImageUrl,
          },
        });
      }

      toast.success("Sign Up is successful");
      setMode("signin");
    } catch (err) {
      toast.error(
        (err as Error)?.message ||
          "An unexpected error occurred during sign up."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (values: VerificationValues) => {
    // Placeholder for verification logic
    console.log("Verification code:", values.code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <AuthHeader mode={mode} />
        <Card>
          <CardHeader>
            <CardTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</CardTitle>
          </CardHeader>
          <CardContent>
            {mode === "signin" ? (
              <SignInForm isLoading={isLoading} onFinish={handleSignInSubmit} />
            ) : mode === "signup" ? (
              <SignUpForm
                isLoading={isLoading}
                onFinish={handleSignUpSubmit}
                setFile={setFile}
              />
            ) : (
              <VerificationForm
                isLoading={isLoading}
                onSubmit={handleVerificationSubmit}
              />
            )}

            <SocialAuthButtons />

            <AuthToggle mode={mode} onToggle={toggleMode} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
