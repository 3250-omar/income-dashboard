"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AuthHeader,
  SignInForm,
  SignUpForm,
  SocialAuthButtons,
  AuthToggle,
} from "@/components/auth";
import { useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import VerificationForm from "@/components/auth/confirm";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const { signIn, isLoaded, setActive: setSignInActive } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded, setActive } = useSignUp();
  const router = useRouter();
  // const { isSignedIn, user } = useUser();
  // console.log("🚀 ~ RegisterPage ~ isSignedIn:", isSignedIn);
  // console.log("🚀 ~ RegisterPage ~ user:", user);
  const [mode, setMode] = useState<"signin" | "signup" | "verification">(
    "signin"
  );
  const [isLoading, setIsLoading] = useState(false);
  // Sign In State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // useEffect(() => {
  //   if (isSignedIn) {
  //     // User is logged in → redirect away from sign-in page
  //     router.push("/"); // or your desired page
  //   }
  // }, [isSignedIn, router]);

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    // Reset forms when switching
    setEmail("");
    setPassword("");
    setSignUpData({
      name: "",
      email: "",
      password: "",
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
  if (!isLoaded || !isSignUpLoaded) return;

  const handleVerificationSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: code.join(""),
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      toast.error((err as Error)?.message || "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
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
    try {
      // Create account
      const { error: signupError } = await supabase.auth.signUp({
        email: signUpData.email,

        password: signUpData.password,
        options: {
          data: { name: signUpData.name },
        },
      });
      if (signupError) {
        toast.error(signupError.message);
        setIsLoading(false);
        return;
      }
      toast.success("Sign Up is successful");
      setMode("signin");

      // Send verification code
      // 2️⃣ Send OTP for verification
      // const { error: otpError } = await supabase.auth.signInWithOtp({
      //   email: signUpData.email,
      //   options: {
      //     shouldCreateUser: false,
      //     // emailRedirectTo: `${window.location.origin}/verify-otp`,
      //   },
      // });

      // if (otpError) {
      //   toast.error(otpError.message);
      //   setIsLoading(false);
      //   return;
      // }
      // setMode("verification");
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
              />
            ) : (
              <VerificationForm
                onSubmit={handleVerificationSubmit}
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
