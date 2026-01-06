import { Button, Checkbox, Form, Input } from "antd";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

const { Item } = Form;
interface SignInFormProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
}

export function SignInForm({ isLoading, onFinish }: SignInFormProps) {
  return (
    <Form
      name="signin"
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
      size="large"
      // className="space-y-2"
    >
      <Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
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
          {
            required: true,
            message: "Please input your password!",
          },
          { min: 8, message: "Password must be at least 8 characters" },
        ]}
      >
        <Input.Password
          prefix={<Lock className="text-gray-400" size={18} />}
          placeholder="••••••••"
        />
      </Item>

      <div className="flex items-center justify-between mb-4">
        <Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Item>
        <Link
          href="#"
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
          className="w-full bg-black hover:bg-black/90"
        >
          Sign in
        </Button>
      </Item>
    </Form>
  );
}
