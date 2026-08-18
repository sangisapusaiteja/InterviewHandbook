import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  center?: boolean;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export function Loader({
  className,
  size = "md",
  label,
  center = false,
}: LoaderProps) {
  const content = (
    <>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size], className)} />
      {label ? (
        <span className="text-sm text-muted-foreground">{label}</span>
      ) : null}
    </>
  );

  if (!center) {
    return <div className="flex items-center gap-3">{content}</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">{content}</div>
    </div>
  );
}
