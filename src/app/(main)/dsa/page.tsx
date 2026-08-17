import { redirect } from "next/navigation";
import { getTopicsByCategory } from "@/lib/api/topics";

export default async function DSAPage() {
  const topics = await getTopicsByCategory("dsa");
  if (topics.length > 0) {
    redirect(`/dsa/${topics[0].slug}`);
  }
  return null;
}
