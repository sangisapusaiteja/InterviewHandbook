import { redirect } from "next/navigation";
import { DashboardPage } from "@/components/home/DashboardPage";
import { authServerEnabled, getCurrentUser } from "@/lib/auth-server";
import { buildSearchIndex } from "@/lib/api/topics";

export default async function HomePage() {
  if (authServerEnabled) {
    const user = await getCurrentUser();

    if (!user) {
      redirect("/sign-in");
    }
  }

  let searchIndex: Awaited<ReturnType<typeof buildSearchIndex>> = [];
  try {
    searchIndex = await buildSearchIndex();
  } catch {
    searchIndex = [];
  }

  return <DashboardPage searchIndex={searchIndex} />;
}
