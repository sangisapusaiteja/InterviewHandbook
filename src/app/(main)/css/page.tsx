import { redirect } from "next/navigation";
import { getTopicsByCategory } from "@/lib/api/topics";

export default async function CSSPage() {
  const topics = await getTopicsByCategory("css");
  if (topics.length > 0) {
    redirect(`/css/${topics[0].slug}`);
  }
  return null;
}
