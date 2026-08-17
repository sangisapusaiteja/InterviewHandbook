import { redirect } from "next/navigation";
import { getTopicsByCategory } from "@/lib/api/topics";

export default async function JavaScriptPage() {
  const topics = await getTopicsByCategory("javascript");
  if (topics.length > 0) {
    redirect(`/javascript/${topics[0].slug}`);
  }
  return null;
}
