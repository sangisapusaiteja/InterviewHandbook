import { redirect } from "next/navigation";
import { getTopicsByCategory } from "@/lib/api/topics";

export default async function HTMLPage() {
  const topics = await getTopicsByCategory("html");
  if (topics.length > 0) {
    redirect(`/html/${topics[0].slug}`);
  }
  return null;
}
