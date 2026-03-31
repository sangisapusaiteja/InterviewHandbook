"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  Check,
  Copy,
  Loader2,
  MessageSquare,
  Send,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Topic } from "@/types/topic";

type AssistantMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

type TopicAssistantProps = {
  topic: Topic;
  sectionTitle: string;
};

const quickActions = [
  "Explain this simply with an example",
  "Ask me 3 interview questions on this topic",
  "What mistakes do people make with this topic?",
  "How is this used in real projects?",
];

const MAX_CHAT_MESSAGES = 12;

function renderInlineFormatting(text: string) {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null = pattern.exec(text);

  while (match) {
    const [token] = match;
    const start = match.index;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={`${start}-bold`} className="font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      nodes.push(
        <em key={`${start}-italic`} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      nodes.push(
        <code
          key={`${start}-code`}
          className="rounded bg-black/15 px-1.5 py-0.5 font-mono text-[0.92em]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    lastIndex = start + token.length;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderMessageContent(
  content: string,
  copiedCode: string | null,
  onCopyCode: (code: string) => void
) {
  const parts = content.split(/```([\w-]*)\n?([\s\S]*?)```/g);

  if (parts.length === 1) {
    return (
      <div className="whitespace-pre-wrap">{renderInlineFormatting(content)}</div>
    );
  }

  const nodes: React.ReactNode[] = [];

  for (let index = 0; index < parts.length; index += 3) {
    const textPart = parts[index];
    const language = parts[index + 1];
    const codePart = parts[index + 2];

    if (textPart) {
      nodes.push(
        <div key={`text-${index}`} className="whitespace-pre-wrap">
          {renderInlineFormatting(textPart)}
        </div>
      );
    }

    if (typeof codePart === "string") {
      const trimmedCode = codePart.trim();

      nodes.push(
        <div
          key={`code-${index}`}
          className="my-3 overflow-hidden rounded-xl border border-black/10 bg-zinc-950/90 text-zinc-100"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
            <span>{language || "code"}</span>
            <button
              type="button"
              onClick={() => onCopyCode(trimmedCode)}
              className="inline-flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              {copiedCode === trimmedCode ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="overflow-x-auto p-3 text-xs leading-6">
            <code>{trimmedCode}</code>
          </pre>
        </div>
      );
    }
  }

  return <div>{nodes}</div>;
}

function buildInitialMessage(topic: Topic, sectionTitle: string) {
  return `I’m AJet, your ${sectionTitle} study assistant for "${topic.title}". Ask me anything related to this topic and I’ll answer with real reasoning, not just repeat the page.`;
}

export function TopicAssistant({
  topic,
  sectionTitle,
}: Readonly<TopicAssistantProps>) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const initialMessage = useMemo(
    () => buildInitialMessage(topic, sectionTitle),
    [topic, sectionTitle]
  );
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content: initialMessage,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const resetConversation = useCallback(() => {
    setMessages([
      {
        id: "intro",
        role: "assistant",
        content: initialMessage,
      },
    ]);
    setInput("");
    setIsLoading(false);
    setCopiedCode(null);
  }, [initialMessage]);

  useEffect(() => {
    resetConversation();
  }, [resetConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const copyCodeBlock = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      window.setTimeout(() => {
        setCopiedCode((current) => (current === code ? null : current));
      }, 1800);
    } catch {
      // Ignore clipboard failures
    }
  };

  const sendPrompt = async (prompt: string) => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || isLoading) {
      return;
    }

    const userMessage: AssistantMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmedPrompt,
    };

    const baseMessages =
      messages.length >= MAX_CHAT_MESSAGES
        ? [
            {
              id: "intro-reset",
              role: "assistant" as const,
              content: `${initialMessage}\n\nStarting a fresh chat to keep replies fast and token usage low.`,
            },
          ]
        : messages;

    const nextMessages = [...baseMessages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/topic-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sectionTitle,
          topic,
          messages: nextMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const payload = (await response.json()) as
        | { reply?: string; error?: string }
        | undefined;

      if (!response.ok || !payload?.reply) {
        throw new Error(
          payload?.error ??
            "The assistant could not respond right now. Please try again."
        );
      }

      const reply = payload.reply;

      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "The assistant could not respond right now. Please try again.";

      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant-error`,
          role: "assistant",
          content: message,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[min(82vh,760px)] w-[min(92vw,800px)] max-w-[800px] flex-col gap-0 overflow-hidden border-primary/20 bg-background/95 p-0 shadow-2xl outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 data-[state=open]:ring-0 supports-[backdrop-filter]:bg-background/90">
          <DialogHeader className="border-b border-border/70 px-6 pb-4 pt-6">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
              <Sparkles className="h-3.5 w-3.5" />
              AJet
            </p>
            <DialogTitle className="mt-2 text-xl">{topic.title}</DialogTitle>
            <DialogDescription className="mt-1 text-sm">
              Ask real topic-related questions and get AI answers.
            </DialogDescription>
          </DialogHeader>

          <Card className="flex min-h-0 flex-1 flex-col border-0 shadow-none">
            <CardContent className="flex min-h-0 flex-1 flex-col gap-4 p-5">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    disabled={isLoading}
                    onClick={() => void sendPrompt(action)}
                    className="rounded-full border border-border/80 bg-muted/20 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {action}
                  </button>
                ))}
              </div>

              <ScrollArea className="min-h-0 flex-1 rounded-2xl border border-border/70 bg-muted/10">
                <div className="space-y-3 p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6",
                        message.role === "assistant"
                          ? "mr-auto bg-secondary text-secondary-foreground"
                          : "ml-auto bg-primary text-primary-foreground"
                      )}
                    >
                      <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide opacity-80">
                        {message.role === "assistant" ? (
                          <Bot className="h-3.5 w-3.5" />
                        ) : (
                          <Lightbulb className="h-3.5 w-3.5" />
                        )}
                        {message.role === "assistant" ? "AJet" : "You"}
                      </p>
                      {renderMessageContent(
                        message.content,
                        copiedCode,
                        (code) => void copyCodeBlock(code)
                      )}
                    </div>
                  ))}

                  {isLoading ? (
                    <div className="mr-auto max-w-[88%] rounded-2xl bg-secondary px-4 py-3 text-sm text-secondary-foreground">
                      <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide opacity-80">
                        <Bot className="h-3.5 w-3.5" />
                        AJet
                      </p>
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Thinking...
                      </div>
                    </div>
                  ) : null}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <form
                className="flex items-center gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendPrompt(input);
                }}
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={`Ask about ${topic.title}...`}
                  disabled={isLoading}
                  className="h-12 flex-1 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-12 w-12 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-4 right-4 z-50 flex items-end justify-end">
      <Button
        type="button"
        size="lg"
        onClick={() => setOpen((current) => !current)}
        className="h-14 rounded-full px-5 shadow-[0_18px_45px_-20px_rgba(99,102,241,0.75)]"
      >
        <MessageSquare className="mr-2 h-5 w-5" />
        Ask AJet
      </Button>
      </div>
    </>
  );
}
