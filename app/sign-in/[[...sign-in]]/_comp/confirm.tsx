import { Button, Form, Input } from "antd";

interface VerificationFormProps {
  isLoading?: boolean;
  onSubmit: (values: any) => void;
  // We can handle code state internally via Form onFinish now,
  // or pass it up if needed. Given the request, cleaner is better.
  // The parent handles logic, this just renders form and validates.
}
const { Item } = Form;

export default function VerificationForm({
  isLoading,
  onSubmit,
}: VerificationFormProps) {
  const [form] = Form.useForm();

  const onFinish = (values: { code: string }) => {
    // Return array of strings to match original potentially, or just string.
    // Parent expects array or string? Original state was array of 6 strings.
    // If we use Antd Input.OTP, value is string. We might need to adapt.
    // For now passing the string value.
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="space-y-6"
    >
      <div className="space-y-2 text-center">
        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to your email.
        </p>
        <div className="flex justify-center">
          <Item
            name="code"
            rules={[
              {
                required: true,
                len: 6,
                message: "Please enter the 6-digit code",
              },
            ]}
          >
            <Input.OTP size="large" length={6} />
          </Item>
        </div>
      </div>

      <Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-black hover:bg-black/90"
          loading={isLoading}
          block
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </Button>
      </Item>
    </Form>
  );
}
