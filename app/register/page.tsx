"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AuthHeader,
  SignInForm,
  SignUpForm,
  SocialAuthButtons,
  AuthToggle,
} from "@/components/auth";

export default function RegisterPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [isLoading, setIsLoading] = useState(false);

  // Sign In State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement sign in logic
    console.log("Sign in:", { email, password });
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/";
    }, 1000);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSignUpForm()) {
      return;
    }

    setIsLoading(true);
    // TODO: Implement sign up logic
    console.log("Sign up:", signUpData);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/";
    }, 1000);
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            ) : (
              <SignUpForm
                formData={signUpData}
                errors={errors}
                isLoading={isLoading}
                onChange={handleSignUpChange}
                onSubmit={handleSignUpSubmit}
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
