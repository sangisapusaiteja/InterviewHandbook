import { redirect } from "next/navigation";
import { getTopicsByCategory } from "@/lib/api/topics";

export default async function ReactPage() {
  const topics = await getTopicsByCategory("react");
  if (topics.length > 0) {
    redirect(`/react/${topics[0].slug}`);
  }
  return null;
}
