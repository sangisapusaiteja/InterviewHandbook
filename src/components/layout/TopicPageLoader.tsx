import { Loader } from "@/components/ui/Loader";

export function TopicPageLoader() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <Loader label="Loading topic..." />
    </div>
  );
}
