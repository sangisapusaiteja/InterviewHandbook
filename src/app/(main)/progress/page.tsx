import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ProgressPage } from "@/components/progress/ProgressPage";

export default async function UserProgressPage() {
  const clerkEnabled = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
  );

  if (clerkEnabled) {
    const { userId } = await auth();

    if (!userId) {
      redirect("/sign-in");
    }
  }

  return <ProgressPage />;
}
