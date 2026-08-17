import { redirect } from "next/navigation";
import { getTopicsByCategory } from "@/lib/api/topics";

export default async function TechnicalQuestionsPage() {
  const topics = await getTopicsByCategory("technical-questions");
  if (topics.length > 0) {
    redirect(`/technical-questions/${topics[0].slug}`);
  }
  return null;
}
