import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import type { Topic } from "@/types/topic";

type AssistantMessage = {
  role: "assistant" | "user";
  content: string;
};

type RequestBody = {
  sectionTitle?: string;
  topic?: Topic;
  sessionId?: string;
  messages?: AssistantMessage[];
};

const MAX_HISTORY_MESSAGES = 5;

function summarizeTopic(topic: Topic, sectionTitle: string) {
  const keyPoints = topic.concept.keyPoints
    .slice(0, 8)
    .map((point, index) => `${index + 1}. ${point}`)
    .join("\n");

  const interviewQuestions = topic.interviewQuestions
    .slice(0, 5)
    .map(
      (item, index) =>
        `${index + 1}. ${item.question} (Hint: ${item.hint})`
    )
    .join("\n");

  const codePreview = topic.code.defaultCode
    .split("\n")
    .slice(0, 18)
    .join("\n")
    .trim();

  return [
    `Section: ${sectionTitle}`,
    `Topic: ${topic.title}`,
    `Difficulty: ${topic.difficulty}`,
    `Description: ${topic.description}`,
    `Explanation: ${topic.concept.explanation}`,
    `Analogy: ${topic.concept.realLifeAnalogy}`,
    `Key points:\n${keyPoints}`,
    topic.concept.timeComplexity
      ? `Time complexity: ${topic.concept.timeComplexity}`
      : null,
    topic.concept.spaceComplexity
      ? `Space complexity: ${topic.concept.spaceComplexity}`
      : null,
    interviewQuestions ? `Interview questions:\n${interviewQuestions}` : null,
    `Code language: ${topic.code.language}`,
    codePreview ? `Code preview:\n${codePreview}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildPrompt(
  sectionTitle: string,
  topic: Topic
) {
  return `
You are the AI study assistant inside Interview Handbook.
Your name is AJet.

Your job:
- Answer like a real AI tutor, not a template repeater.
- Stay focused on the current topic and closely related concepts.
- Use the topic context below as grounding, but go beyond it when the user asks a reasonable related question.
- Explain clearly, accurately, and conversationally, similar to ChatGPT.
- When useful, include examples, intuition, edge cases, and interview framing.
- If the user asks something clearly unrelated to the current topic, gently redirect them back to this topic.
- Do not say you are only allowed to repeat the provided notes.
- Avoid markdown tables.
- If the user asks for code, give correct code and explain why it works.
- If you include code, always wrap it in fenced markdown code blocks with a language tag when possible.
- If the user is confused, teach step by step.
- Keep replies short and compact by default.
- Prefer 3-6 short bullet points or a few short paragraphs.
- Do not give long explanations unless the user explicitly asks for a detailed or step-by-step answer.

Current topic context:
${summarizeTopic(topic, sectionTitle)}
`.trim();
}

function buildGeminiContents(messages: AssistantMessage[]) {
  return messages.slice(-MAX_HISTORY_MESSAGES).map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

function extractGeminiText(payload: unknown) {
  if (
    typeof payload !== "object" ||
    payload === null ||
    !("candidates" in payload) ||
    !Array.isArray(payload.candidates)
  ) {
    return "";
  }

  for (const candidate of payload.candidates) {
    if (
      typeof candidate !== "object" ||
      candidate === null ||
      !("content" in candidate) ||
      typeof candidate.content !== "object" ||
      candidate.content === null ||
      !("parts" in candidate.content) ||
      !Array.isArray(candidate.content.parts)
    ) {
      continue;
    }

    for (const part of candidate.content.parts) {
      if (
        typeof part === "object" &&
        part !== null &&
        "text" in part &&
        typeof part.text === "string" &&
        part.text.trim()
      ) {
        return part.text.trim();
      }
    }
  }

  return "";
}

export async function POST(request: Request) {
  const clerkEnabled = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
  );
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash-lite";

  if (!clerkEnabled) {
    return NextResponse.json(
      {
        error:
          "Clerk is not configured yet. Add your Clerk keys to enable AJet sign-in.",
      },
      { status: 503 }
    );
  }

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      {
        error: "Sign in to use AJet.",
      },
      { status: 401 }
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Missing GEMINI_API_KEY. Add it to your environment to enable the AI assistant.",
      },
      { status: 500 }
    );
  }

  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const topic = body.topic;
  const sectionTitle = body.sectionTitle?.trim();
  const messages = Array.isArray(body.messages) ? body.messages : [];

  if (!topic || !sectionTitle || messages.length === 0) {
    return NextResponse.json(
      { error: "Missing topic context or messages." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: buildPrompt(sectionTitle, topic) }],
          },
          contents: buildGeminiContents(messages),
          generationConfig: {
            temperature: 0.4,
            topP: 0.9,
            maxOutputTokens: 420,
            responseMimeType: "text/plain",
          },
        }),
      }
    );

    const payload = await response.json();

    if (!response.ok) {
      const apiError =
        payload?.error?.message ??
        "Gemini request failed while generating the assistant reply.";

      return NextResponse.json({ error: apiError }, { status: response.status });
    }

    const reply = extractGeminiText(payload);

    if (!reply) {
      return NextResponse.json(
        { error: "The AI assistant returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      {
        error:
          "Could not reach Gemini right now. Check your network and API configuration.",
      },
      { status: 502 }
    );
  }
}
