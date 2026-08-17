import { redirect } from "next/navigation";
import { getTopicsByCategory } from "@/lib/api/topics";

export default async function PythonPage() {
  const topics = await getTopicsByCategory("python");
  if (topics.length > 0) {
    redirect(`/python/${topics[0].slug}`);
  }
  return null;
}
