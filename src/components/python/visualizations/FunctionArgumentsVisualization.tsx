"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, Hash, Shuffle, Box, AlertTriangle } from "lucide-react";
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
type TopicKey = "positional" | "order" | "mutable" | "count";

interface TopicInfo {
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
  diagram: { args: string[]; params: string[] };
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  positional: {
    label: "Positional Args",
    subtitle: "Basic Passing",
    icon: <ArrowRight className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Positional arguments are matched to parameters by their position in the function call. The first argument maps to the first parameter, the second to the second, and so on. Arguments are the values you pass; parameters are the variable names in the function definition.",
    codeSnippet: `# Parameters: name, age (defined in function)
# Arguments: "Alice", 30 (passed in call)

def greet(name, age):
    print(f"Hello {name}, you are {age}!")

greet("Alice", 30)
greet("Bob", 25)`,
    codeOutput: [
      "Hello Alice, you are 30!",
      "Hello Bob, you are 25!",
    ],
    diagram: {
      args: ['"Alice"', "30"],
      params: ["name", "age"],
    },
  },
  order: {
    label: "Order Matters",
    subtitle: "Position Changes Result",
    icon: <Shuffle className="h-3.5 w-3.5" />,
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Since positional arguments are matched by order, swapping them changes which parameter gets which value. power(2, 3) means base=2, exp=3 (result 8), but power(3, 2) means base=3, exp=2 (result 9).",
    codeSnippet: `def power(base, exp):
    result = base ** exp
    print(f"power({base}, {exp}) = {result}")

# Order matters!
power(2, 3)   # base=2, exp=3 -> 8
power(3, 2)   # base=3, exp=2 -> 9

# They are NOT the same
print(f"2**3 == 3**2? {2**3 == 3**2}")`,
    codeOutput: [
      "power(2, 3) = 8",
      "power(3, 2) = 9",
      "2**3 == 3**2? False",
    ],
    diagram: {
      args: ["2", "3"],
      params: ["base", "exp"],
    },
  },
  mutable: {
    label: "Mutable vs Immutable",
    subtitle: "Side Effects",
    icon: <Box className="h-3.5 w-3.5" />,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "When you pass a mutable object (like a list) as an argument, the function receives a reference to the same object -- modifications inside the function affect the original. Immutable objects (like numbers or strings) cannot be changed, so the original stays the same.",
    codeSnippet: `def add_item(lst, num):
    lst.append(99)     # Modifies the original list
    num = num + 100    # Creates new local number
    print(f"Inside: lst={lst}, num={num}")

my_list = [1, 2, 3]
my_num = 10

add_item(my_list, my_num)
print(f"Outside: lst={my_list}, num={my_num}")`,
    codeOutput: [
      "Inside: lst=[1, 2, 3, 99], num=110",
      "Outside: lst=[1, 2, 3, 99], num=10",
    ],
    diagram: {
      args: ["[1,2,3]", "10"],
      params: ["lst", "num"],
    },
  },
  count: {
    label: "Argument Count",
    subtitle: "TypeError on Mismatch",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Python enforces strict argument counts for positional parameters. If you pass too few or too many arguments, Python raises a TypeError at runtime telling you how many were expected versus how many were given.",
    codeSnippet: `def add(a, b):
    return a + b

# Correct: 2 args for 2 params
print(add(3, 5))

# Too few arguments
try:
    add(3)
except TypeError as e:
    print(f"Error: {e}")

# Too many arguments
try:
    add(3, 5, 7)
except TypeError as e:
    print(f"Error: {e}")`,
    codeOutput: [
      "8",
      "Error: add() missing 1 required positional argument: 'b'",
      "Error: add() takes 2 positional arguments but 3 were given",
    ],
    diagram: {
      args: ["3", "5"],
      params: ["a", "b"],
    },
  },
};

const order: TopicKey[] = ["positional", "order", "mutable", "count"];

const chipColors: Record<TopicKey, string> = {
  positional: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  order: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  mutable: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  count: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Argument Mapping Diagram ─────────────────────────────────────────────────
function ArgMappingDiagram({
  args,
  params,
  color,
}: Readonly<{ args: string[]; params: string[]; color: string }>) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">Argument → Parameter Mapping</p>
      <div className={`rounded-xl border px-4 py-3 ${color}`}>
        <div className="flex flex-col gap-2">
          {params.map((param, idx) => (
            <motion.div
              key={`mapping-${param}-${idx}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-2 text-xs font-mono"
            >
              <span className="inline-flex items-center justify-center rounded-md bg-white/60 dark:bg-white/10 border px-2 py-1 font-bold min-w-[60px] text-center">
                {args[idx]}
              </span>
              <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
              <span className="inline-flex items-center justify-center rounded-md bg-white/60 dark:bg-white/10 border px-2 py-1 min-w-[60px] text-center">
                {param}
              </span>
              <Badge variant="secondary" className="text-[10px] opacity-70">
                pos {idx}
              </Badge>
            </motion.div>
          ))}
        </div>
        <p className="text-[10px] mt-2 opacity-70">
          <Hash className="inline h-3 w-3 mr-0.5" />
          Arguments (left) are mapped to parameters (right) by position
        </p>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function FunctionArgumentsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("positional");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Function Arguments</CardTitle>
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
                {t.icon}
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
                  function args
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Argument mapping diagram */}
            <ArgMappingDiagram
              args={topic.diagram.args}
              params={topic.diagram.params}
              color={topic.color}
            />

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
