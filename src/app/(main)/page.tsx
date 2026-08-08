import { redirect } from "next/navigation";
import { DashboardPage } from "@/components/home/DashboardPage";
import { authServerEnabled, getCurrentUser } from "@/lib/auth-server";

export default async function HomePage() {
  if (authServerEnabled) {
    const user = await getCurrentUser();

    if (!user) {
      redirect("/sign-in");
    }
  }

  return <DashboardPage />;
}
