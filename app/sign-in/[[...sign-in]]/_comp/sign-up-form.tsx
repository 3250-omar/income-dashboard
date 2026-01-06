import { Button, Checkbox, Form, Input } from "antd";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import ProfileImageUpload from "@/components/ui/profileImageUpload";

const { Item } = Form;

interface SignUpFormProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  setFile: (file: File | null) => void;
}

export function SignUpForm({ isLoading, onFinish, setFile }: SignUpFormProps) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="signup"
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
      size="large"
      // className="space-y-2"
    >
      {/* Profile Image Logic remains separate or integrated via custom handling in parent, 
          but UI is placed here. setFile is passed from parent. */}
      <div className="flex justify-center mb-4">
        <ProfileImageUpload setFile={setFile} />
      </div>

      <Item
        name="name"
        label="Full Name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input
          prefix={<User className="text-gray-400" size={18} />}
          placeholder="John Doe"
        />
      </Item>

      <Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Email is invalid" },
        ]}
      >
        <Input
          prefix={<Mail className="text-gray-400" size={18} />}
          placeholder="you@example.com"
        />
      </Item>

      <Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Password is required" },
          { min: 8, message: "Password must be at least 8 characters" },
        ]}
      >
        <Input.Password
          prefix={<Lock className="text-gray-400" size={18} />}
          placeholder="••••••••"
        />
      </Item>

      <Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<Lock className="text-gray-400" size={18} />}
          placeholder="••••••••"
        />
      </Item>

      <Item
        name="terms"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("Should accept terms and conditions")
                  ),
          },
        ]}
      >
        <Checkbox>
          I agree to the{" "}
          <Link href="#" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </Checkbox>
      </Item>

      <Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
          className="w-full bg-black hover:bg-black/90"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </Item>
    </Form>
  );
}
