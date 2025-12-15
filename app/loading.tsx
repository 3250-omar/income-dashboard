import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner className="h-12 w-12 text-primary" />
    </div>
  );
};

export default Loading;
