import { redirect } from "next/navigation";
import { getTopicsByCategory } from "@/lib/api/topics";

export default async function PostgreSQLPage() {
  const topics = await getTopicsByCategory("postgresql");
  if (topics.length > 0) {
    redirect(`/postgresql/${topics[0].slug}`);
  }
  return null;
}
