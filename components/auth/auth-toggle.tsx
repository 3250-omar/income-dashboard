interface AuthToggleProps {
  mode: "signin" | "signup";
  onToggle: () => void;
}

export function AuthToggle({ mode, onToggle }: AuthToggleProps) {
  const isSignIn = mode === "signin";

  return (
    <p className="mt-6 text-center text-sm text-gray-600">
      {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
      <button
        type="button"
        onClick={onToggle}
        className="font-medium text-primary hover:underline"
      >
        {isSignIn ? "Sign up" : "Sign in"}
      </button>
    </p>
  );
}
