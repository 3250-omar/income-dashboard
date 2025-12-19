import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useEffect } from "react";

interface VerificationFormProps {
  isLoading?: boolean;
  onSubmit: () => void;
  code: string[];
  setCode: (code: string[]) => void;
}

export default function VerificationForm({
  isLoading,
  onSubmit,
  code,
  setCode,
}: VerificationFormProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleChange = (index: number, value: string) => {
    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      const newCode = [...code];
      pastedCode.forEach((digit, i) => {
        newCode[i] = digit;
      });
      setCode(newCode);
      // Focus last filled input
      const lastIndex = Math.min(pastedCode.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    // Handle single digit input
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Verification Code</Label>
        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to your email.
        </p>
        <div className="flex gap-2 justify-between">
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={6} // Allow paste but visual is 1 char usually
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-bold p-0"
              disabled={isLoading}
            />
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || code.some((d) => !d)}
      >
        {isLoading ? "Verifying..." : "Verify Email"}
      </Button>
    </form>
  );
}
