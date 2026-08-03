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
type TopicKey = "case_strip" | "find_replace" | "split_join" | "check_methods";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  case_strip: {
    label: "Case & Strip",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Case methods transform letter casing without modifying the original string. Strip methods remove leading/trailing whitespace or specified characters, returning a new string each time.",
    keyPoints: [
      "upper() converts all characters to uppercase",
      "lower() converts all characters to lowercase",
      "title() capitalizes the first letter of each word",
      "capitalize() capitalizes only the first character of the string",
      "strip() removes whitespace from both ends",
      "lstrip() and rstrip() remove from left or right only",
    ],
    codeSnippet: `text = "  Hello, Python World!  "

# Case transformations
print(text.upper())
print(text.lower())
print(text.title())
print(text.capitalize())

# Stripping whitespace
print(repr(text.strip()))
print(repr(text.lstrip()))
print(repr(text.rstrip()))

# Strip specific characters
csv = "***data***"
print(csv.strip("*"))`,
    codeOutput: [
      "  HELLO, PYTHON WORLD!  ",
      "  hello, python world!  ",
      "  Hello, Python World!  ",
      "  hello, python world!  ",
      "'Hello, Python World!'",
      "'Hello, Python World!  '",
      "'  Hello, Python World!'",
      "data",
    ],
  },
  find_replace: {
    label: "Find & Replace",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Search methods locate substrings within a string. find() returns -1 when not found, while index() raises a ValueError. replace() returns a new string with substitutions applied.",
    keyPoints: [
      "find() returns the lowest index or -1 if not found",
      "index() is like find() but raises ValueError if not found",
      "count() returns the number of non-overlapping occurrences",
      "replace(old, new) substitutes all occurrences by default",
      "startswith() and endswith() check string boundaries",
      "All methods are case-sensitive",
    ],
    codeSnippet: `msg = "hello world, hello python"

# find and index
print(msg.find("hello"))
print(msg.find("java"))
print(msg.index("world"))

# count occurrences
print(msg.count("hello"))

# replace
print(msg.replace("hello", "hi"))
print(msg.replace("hello", "hi", 1))

# startswith and endswith
print(msg.startswith("hello"))
print(msg.endswith("python"))`,
    codeOutput: [
      "0",
      "-1",
      "6",
      "2",
      "hi world, hi python",
      "hi world, hello python",
      "True",
      "True",
    ],
  },
  split_join: {
    label: "Split & Join",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "split() breaks a string into a list of substrings using a delimiter. join() is the inverse — it combines an iterable of strings with a separator. partition() splits into exactly three parts around the first occurrence of the separator.",
    keyPoints: [
      "split() with no args splits on any whitespace and removes empties",
      "rsplit() splits from the right side",
      "splitlines() splits on line boundaries",
      "join() is called on the separator string",
      "partition() returns (before, sep, after) as a 3-tuple",
    ],
    codeSnippet: `text = "apple,banana,cherry,date"

# split by comma
print(text.split(","))

# split with maxsplit
print(text.split(",", 2))

# rsplit from the right
print(text.rsplit(",", 2))

# splitlines
multiline = "line1\\nline2\\nline3"
print(multiline.splitlines())

# join
fruits = ["apple", "banana", "cherry"]
print(" | ".join(fruits))

# partition
print("user@host".partition("@"))`,
    codeOutput: [
      "['apple', 'banana', 'cherry', 'date']",
      "['apple', 'banana', 'cherry,date']",
      "['apple,banana', 'cherry', 'date']",
      "['line1', 'line2', 'line3']",
      "apple | banana | cherry",
      "('user', '@', 'host')",
    ],
  },
  check_methods: {
    label: "Check Methods",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Check methods return True or False based on the string's content. They are useful for input validation — checking whether a string contains only letters, digits, alphanumeric characters, whitespace, or specific casing.",
    keyPoints: [
      "isalpha() — True if all characters are alphabetic",
      "isdigit() — True if all characters are digits",
      "isalnum() — True if all characters are alphanumeric",
      "isspace() — True if all characters are whitespace",
      "isupper() / islower() — checks if cased characters match",
      "All return False for empty strings",
    ],
    codeSnippet: `# isalpha - only letters
print("Hello".isalpha())
print("Hello World".isalpha())

# isdigit - only digits
print("12345".isdigit())
print("123.45".isdigit())

# isalnum - letters or digits
print("Python3".isalnum())
print("Python 3".isalnum())

# isspace - only whitespace
print("   ".isspace())
print(" hi ".isspace())

# isupper / islower
print("HELLO".isupper())
print("hello".islower())
print("Hello".isupper())`,
    codeOutput: [
      "True",
      "False",
      "True",
      "False",
      "True",
      "False",
      "True",
      "False",
      "True",
      "True",
      "False",
    ],
  },
};

const order: TopicKey[] = ["case_strip", "find_replace", "split_join", "check_methods"];

const chipColors: Record<TopicKey, string> = {
  case_strip: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  find_replace: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  split_join: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  check_methods: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Methods Reference Table ──────────────────────────────────────────────────
const methodsRef = [
  { method: "upper()", returns: "str", description: "Returns string with all characters uppercased" },
  { method: "lower()", returns: "str", description: "Returns string with all characters lowercased" },
  { method: "title()", returns: "str", description: "Returns string with first letter of each word capitalized" },
  { method: "capitalize()", returns: "str", description: "Returns string with first character capitalized" },
  { method: "strip([chars])", returns: "str", description: "Removes leading and trailing characters" },
  { method: "lstrip([chars])", returns: "str", description: "Removes leading characters" },
  { method: "rstrip([chars])", returns: "str", description: "Removes trailing characters" },
  { method: "find(sub)", returns: "int", description: "Returns lowest index of substring, or -1" },
  { method: "index(sub)", returns: "int", description: "Like find() but raises ValueError if not found" },
  { method: "count(sub)", returns: "int", description: "Returns number of non-overlapping occurrences" },
  { method: "replace(old, new)", returns: "str", description: "Returns string with replacements applied" },
  { method: "startswith(prefix)", returns: "bool", description: "True if string starts with prefix" },
  { method: "endswith(suffix)", returns: "bool", description: "True if string ends with suffix" },
  { method: "split(sep)", returns: "list", description: "Splits string into list by separator" },
  { method: "rsplit(sep)", returns: "list", description: "Splits from the right side" },
  { method: "splitlines()", returns: "list", description: "Splits string at line boundaries" },
  { method: "join(iterable)", returns: "str", description: "Joins iterable elements with the string as separator" },
  { method: "partition(sep)", returns: "tuple", description: "Splits into (before, sep, after) 3-tuple" },
  { method: "isalpha()", returns: "bool", description: "True if all characters are alphabetic" },
  { method: "isdigit()", returns: "bool", description: "True if all characters are digits" },
  { method: "isalnum()", returns: "bool", description: "True if all characters are alphanumeric" },
  { method: "isspace()", returns: "bool", description: "True if all characters are whitespace" },
  { method: "isupper()", returns: "bool", description: "True if all cased characters are uppercase" },
  { method: "islower()", returns: "bool", description: "True if all cased characters are lowercase" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function StringMethodsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("case_strip");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  const handleRun = () => {
    setOutputLines(topic.codeOutput);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          String Methods
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const chipColor = chipColors[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? chipColor + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {topics[key].label}
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
                  string method
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key Points */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Key Points</p>
              <ul className="space-y-1">
                {topic.keyPoints.map((point) => (
                  <li key={point} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="text-emerald-500 mt-0.5">&#x2022;</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Code + Output */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {topic.codeSnippet}
                </pre>
              </div>
              <Button size="sm" onClick={handleRun}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Methods Reference Table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Methods Reference</p>
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40 border-b">
                  <th className="text-left px-3 py-2 font-semibold">Method</th>
                  <th className="text-left px-3 py-2 font-semibold">Returns</th>
                  <th className="text-left px-3 py-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {methodsRef.map((row) => (
                  <tr key={row.method} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-1.5 font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {row.method}
                    </td>
                    <td className="px-3 py-1.5">
                      <Badge variant="secondary" className="text-[10px]">
                        {row.returns}
                      </Badge>
                    </td>
                    <td className="px-3 py-1.5 text-muted-foreground">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
