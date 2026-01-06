import { SquareStack } from "lucide-react";

interface AuthHeaderProps {
  mode: "signin" | "signup" | "verification";
}

export function AuthHeader({ mode }: AuthHeaderProps) {
  const isSignIn = mode === "signin";

  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
        <SquareStack color="white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900">
        {isSignIn ? "Welcome back" : "Create account"}
      </h2>
      <p className="mt-2 text-gray-600">
        {isSignIn ? "Sign in to your account" : "Start managing your finances"}
      </p>
    </div>
  );
}
