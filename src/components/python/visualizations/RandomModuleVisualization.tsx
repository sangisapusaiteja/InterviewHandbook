"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── ConsoleOutput ────────────────────────────────────────────────────────────
function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px]"
        >
          {lines.map((line, idx) => (
            <p key={`${idx}-${line}`} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;&gt;&gt;</span>
              {line}
            </p>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="ph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[52px] flex items-center justify-center"
        >
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type TopicKey = "random-numbers" | "selection" | "shuffle-seed" | "secrets";

interface TopicInfo {
  label: string;
  subtitle: string;
  color: string;
  badgeColor: string;
  badgeLabel: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  "random-numbers": {
    label: "Random Numbers",
    subtitle: "random(), randint(), uniform()",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/10 text-blue-400",
    badgeLabel: "random",
    description:
      "The random module provides functions for generating pseudo-random numbers. random() returns a float in [0.0, 1.0), randint(a, b) returns an integer N such that a <= N <= b, and uniform(a, b) returns a random float in [a, b]. You can also generate numbers within specific ranges using randrange().",
    keyPoints: [
      "random.random() returns a float in [0.0, 1.0)",
      "random.randint(a, b) includes both endpoints a and b",
      "random.uniform(a, b) returns a random float between a and b",
      "random.randrange(start, stop, step) works like range() but picks randomly",
    ],
    codeSnippet: `import random

# Random float between 0 and 1
print("random():", random.random())

# Random integer between 1 and 10 (inclusive)
print("randint(1, 10):", random.randint(1, 10))

# Random float between 5.0 and 15.0
print("uniform(5, 15):", random.uniform(5, 15))

# Random from range (like range but random pick)
print("randrange(0, 100, 5):", random.randrange(0, 100, 5))

# Generate multiple random numbers
nums = [random.randint(1, 100) for _ in range(5)]
print("5 random ints:", nums)`,
    codeOutput: [
      "random(): 0.7134820391745372",
      "randint(1, 10): 7",
      "uniform(5, 15): 11.284359827465",
      "randrange(0, 100, 5): 35",
      "5 random ints: [42, 87, 13, 65, 29]",
    ],
  },
  selection: {
    label: "Selection",
    subtitle: "choice(), choices(), sample()",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
    badgeLabel: "selection",
    description:
      "Python's random module provides several functions for selecting elements from sequences. choice() picks a single random element, choices() selects k elements with replacement (allowing repeats), and sample() selects k unique elements without replacement. choices() also supports weighted random selection via the weights parameter.",
    keyPoints: [
      "random.choice(seq) picks one random element from a sequence",
      "random.choices(seq, k=n) picks n elements with replacement",
      "random.sample(seq, k=n) picks n unique elements without replacement",
      "choices(seq, weights=[...]) supports weighted random selection",
    ],
    codeSnippet: `import random

colors = ["red", "green", "blue", "yellow", "purple"]

# Pick one random element
print("choice:", random.choice(colors))

# Pick 3 with replacement (may repeat)
print("choices:", random.choices(colors, k=3))

# Pick 3 without replacement (unique)
print("sample:", random.sample(colors, k=3))

# Weighted random selection
fruits = ["apple", "banana", "cherry"]
weights = [10, 1, 1]  # apple 10x more likely
picks = random.choices(fruits, weights=weights, k=6)
print("weighted:", picks)`,
    codeOutput: [
      "choice: blue",
      "choices: ['red', 'yellow', 'red']",
      "sample: ['purple', 'green', 'blue']",
      "weighted: ['apple', 'apple', 'cherry', 'apple', 'apple', 'banana']",
    ],
  },
  "shuffle-seed": {
    label: "Shuffle & Seed",
    subtitle: "shuffle(), seed(), reproducibility",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/10 text-violet-400",
    badgeLabel: "seed",
    description:
      "random.shuffle() reorders a list in place randomly. random.seed() initialises the random number generator for reproducible results — using the same seed always produces the same sequence. getstate() and setstate() allow you to save and restore the generator state for exact replay of random sequences.",
    keyPoints: [
      "random.shuffle(list) modifies the list in place",
      "random.seed(n) makes random output reproducible",
      "Same seed always produces the same random sequence",
      "getstate() / setstate() save and restore generator state",
    ],
    codeSnippet: `import random

# Shuffle a list in place
cards = ["A", "K", "Q", "J", "10"]
random.shuffle(cards)
print("shuffled:", cards)

# Seed for reproducibility
random.seed(42)
print("seed(42) ->", random.random())
print("seed(42) ->", random.randint(1, 100))

# Same seed = same results
random.seed(42)
print("again   ->", random.random())
print("again   ->", random.randint(1, 100))

# Save and restore state
state = random.getstate()
print("val1:", random.random())
random.setstate(state)
print("val2:", random.random())  # same as val1`,
    codeOutput: [
      "shuffled: ['Q', '10', 'A', 'J', 'K']",
      "seed(42) -> 0.6394267984578837",
      "seed(42) -> 74",
      "again   -> 0.6394267984578837",
      "again   -> 74",
      "val1: 0.01832993161855452",
      "val2: 0.01832993161855452",
    ],
  },
  secrets: {
    label: "secrets Module",
    subtitle: "Cryptographic randomness",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/10 text-orange-400",
    badgeLabel: "security",
    description:
      "The secrets module (Python 3.6+) provides cryptographically strong random numbers suitable for security-sensitive applications like passwords, tokens, and API keys. Unlike the random module which uses a predictable PRNG, secrets uses the OS entropy source. Use token_hex() for hex strings, token_urlsafe() for URL-safe tokens, and token_bytes() for raw bytes.",
    keyPoints: [
      "secrets is designed for security — never use random for passwords",
      "token_hex(n) generates a random hex string of 2*n characters",
      "token_urlsafe(n) generates a URL-safe base64 token",
      "secrets.choice() is a secure version of random.choice()",
    ],
    codeSnippet: `import secrets
import string

# Cryptographic random integer
print("secure int:", secrets.randbelow(100))

# Generate secure tokens
print("token_hex:", secrets.token_hex(16))
print("token_url:", secrets.token_urlsafe(16))
print("token_bytes:", secrets.token_bytes(8))

# Generate a secure password
alphabet = string.ascii_letters + string.digits + "!@#\$%"
password = ''.join(secrets.choice(alphabet) for _ in range(12))
print("password:", password)

# Secure comparison (timing-attack safe)
token = secrets.token_hex(16)
print("compare:", secrets.compare_digest(token, token))`,
    codeOutput: [
      "secure int: 47",
      "token_hex: a3f7b2c91d4e8f0a6b5c3d2e1f0a9b8c",
      "token_url: Xk9mP2vLqR4wN7jY5tBn8A",
      "token_bytes: b'\\xd4\\x1a\\xf7\\x8b\\x3c\\x92\\xe0\\x5f'",
      "password: kR7#mP2xL9!q",
      "compare: True",
    ],
  },
};

const order: TopicKey[] = ["random-numbers", "selection", "shuffle-seed", "secrets"];

const chipColors: Record<TopicKey, string> = {
  "random-numbers": "bg-blue-500/15 border-blue-500/30 text-blue-400",
  selection: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  "shuffle-seed": "bg-violet-500/15 border-violet-500/30 text-violet-400",
  secrets: "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function RandomModuleVisualization() {
  const [selected, setSelected] = useState<TopicKey>("random-numbers");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python random Module</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = topics[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  selected === key
                    ? chipColors[key] + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label} — {t.subtitle}
              </button>
            );
          })}
        </div>

        {/* Animated detail area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Description banner */}
            <div className={`rounded-xl border px-4 py-3 text-sm ${topic.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{topic.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${topic.badgeColor}`}>
                  {topic.badgeLabel}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key points */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">Key Points</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {topic.keyPoints.map((point) => (
                  <li
                    key={`kp-${selected}-${point}`}
                    className="text-xs text-muted-foreground flex items-start gap-1.5"
                  >
                    <span className="text-emerald-500 mt-0.5 select-none">*</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Two-column: Code | Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code snippet */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {topic.codeSnippet}
                  </pre>
                </div>
              </div>

              {/* Right: Run + Output */}
              <div className="space-y-3">
                <Button size="sm" onClick={() => setOutputLines(topic.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                  <ConsoleOutput lines={outputLines} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
