import { redirect } from "next/navigation";
import { getTopicsByCategory } from "@/lib/api/topics";

export default async function SystemDesignPage() {
  const topics = await getTopicsByCategory("system-design");
  if (topics.length > 0) {
    redirect(`/system-design/${topics[0].slug}`);
  }
  return null;
}
