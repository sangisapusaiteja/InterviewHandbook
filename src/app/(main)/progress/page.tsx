import { redirect } from "next/navigation";
import { ProgressPage } from "@/components/progress/ProgressPage";
import { authServerEnabled, getCurrentUser } from "@/lib/auth-server";

export default async function UserProgressPage() {
  if (authServerEnabled) {
    const user = await getCurrentUser();

    if (!user) {
      redirect("/sign-in");
    }
  }

  return <ProgressPage />;
}
