"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AuthHeader,
  SignInForm,
  SignUpForm,
  SocialAuthButtons,
  AuthToggle,
} from "./_comp";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import VerificationForm from "./_comp/confirm";
import { useUserStore } from "@/app/store/user_store";
import { UpdateUserInfo } from "@/components/helpers/user";

export default function RegisterPage() {
  const router = useRouter();
  const setSessionUserData = useUserStore((state) => state.setSessionUserData);
  const [mode, setMode] = useState<"signin" | "signup" | "verification">(
    "signin"
  );
  const [userId, setUserId] = useState<string | null>(null);
  const { mutateAsync: updateUserInfo } = UpdateUserInfo();
  const [isLoading, setIsLoading] = useState(false);
  // Sign In State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [file, setFile] = useState<File | null>(null);
  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    image_url: "",
    password: "",
    confirmPassword: "",
  });

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    // Reset forms when switching
    setEmail("");
    setPassword("");
    setSignUpData({
      name: "",
      email: "",
      password: "",
      image_url: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const validateSignUpForm = () => {
    const newErrors: Record<string, string> = {};

    if (!signUpData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!signUpData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!signUpData.password) {
      newErrors.password = "Password is required";
    } else if (signUpData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      console.log("🚀 ~ handleSignInSubmit ~ error:", error);
      setSessionUserData(data.user);
      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }
      // ✅ Successful login
      console.log("User:", data.user);
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let newImageUrl = signUpData.image_url; // fallback to existing image

    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
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
    try {
      // Create account
      const { error: signupError, data: signUpUserData } =
        await supabase.auth.signUp({
          email: signUpData.email,
          password: signUpData.password,
          options: {
            data: { name: signUpData.name, image_url: newImageUrl },
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
            name: signUpData.name,
            image_url: newImageUrl,
          },
        });
      }
      console.log("🚀 ~ handleSignUpSubmit ~ newImageUrl:", newImageUrl);
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

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateSignUpForm();
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
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
              <SignInForm
                email={email}
                password={password}
                isLoading={isLoading}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSubmit={handleSignInSubmit}
              />
            ) : mode === "signup" ? (
              <SignUpForm
                formData={signUpData}
                errors={errors}
                isLoading={isLoading}
                onChange={handleSignUpChange}
                onSubmit={handleSignUpSubmit}
                setFile={setFile}
              />
            ) : (
              <VerificationForm
                onSubmit={() => {}}
                code={code}
                setCode={setCode}
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
