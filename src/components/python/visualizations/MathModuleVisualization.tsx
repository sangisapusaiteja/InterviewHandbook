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
type TopicKey = "constants" | "powers-logs" | "trigonometry" | "combinatorics";

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
  constants: {
    label: "Constants & Basics",
    subtitle: "pi, e, inf, nan, tau, ceil, floor, trunc",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/10 text-blue-400",
    badgeLabel: "constants",
    description:
      "The math module provides fundamental mathematical constants like pi, e, tau, inf, and nan. It also includes basic rounding functions: ceil() rounds up to the nearest integer, floor() rounds down, and trunc() removes the decimal part without rounding.",
    keyPoints: [
      "math.pi = 3.141592653589793",
      "math.e = 2.718281828459045 (Euler's number)",
      "math.inf represents positive infinity, math.nan is Not a Number",
      "math.tau = 2 * pi (full circle in radians)",
      "math.ceil() rounds up, math.floor() rounds down",
      "math.trunc() truncates toward zero (removes decimals)",
    ],
    codeSnippet: `import math

# Mathematical constants
print("pi:", math.pi)
print("e:", math.e)
print("tau:", math.tau)
print("inf:", math.inf)
print("nan:", math.nan)

# Rounding functions
x = 3.7
print(f"ceil(\${x}):", math.ceil(x))
print(f"floor(\${x}):", math.floor(x))
print(f"trunc(\${x}):", math.trunc(x))

y = -2.3
print(f"ceil(\${y}):", math.ceil(y))
print(f"floor(\${y}):", math.floor(y))
print(f"trunc(\${y}):", math.trunc(y))`,
    codeOutput: [
      "pi: 3.141592653589793",
      "e: 2.718281828459045",
      "tau: 6.283185307179586",
      "inf: inf",
      "nan: nan",
      "ceil(3.7): 4",
      "floor(3.7): 3",
      "trunc(3.7): 3",
      "ceil(-2.3): -2",
      "floor(-2.3): -3",
      "trunc(-2.3): -2",
    ],
  },
  "powers-logs": {
    label: "Powers & Logs",
    subtitle: "sqrt, pow, exp, log, log2, log10",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
    badgeLabel: "powers",
    description:
      "The math module offers functions for exponentiation and logarithms. math.sqrt() computes the square root, math.pow() raises a number to a power (returning a float), and math.exp() computes e raised to a power. Logarithmic functions include math.log() (natural log), math.log2(), and math.log10().",
    keyPoints: [
      "math.sqrt(x) returns the square root of x",
      "math.pow(x, y) returns x raised to the power y as a float",
      "math.exp(x) returns e**x (exponential function)",
      "math.log(x) returns the natural logarithm (base e)",
      "math.log2(x) and math.log10(x) for base-2 and base-10 logs",
      "math.log(x, base) supports arbitrary base logarithms",
    ],
    codeSnippet: `import math

# Square root
print("sqrt(16):", math.sqrt(16))
print("sqrt(2):", math.sqrt(2))

# Powers and exponentiation
print("pow(2, 10):", math.pow(2, 10))
print("exp(1):", math.exp(1))
print("exp(2):", math.exp(2))

# Logarithms
print("log(e):", math.log(math.e))
print("log(100, 10):", math.log(100, 10))
print("log2(1024):", math.log2(1024))
print("log10(1000):", math.log10(1000))`,
    codeOutput: [
      "sqrt(16): 4.0",
      "sqrt(2): 1.4142135623730951",
      "pow(2, 10): 1024.0",
      "exp(1): 2.718281828459045",
      "exp(2): 7.38905609893065",
      "log(e): 1.0",
      "log(100, 10): 2.0",
      "log2(1024): 10.0",
      "log10(1000): 3.0",
    ],
  },
  trigonometry: {
    label: "Trigonometry",
    subtitle: "sin, cos, tan, radians, degrees, hypot",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/10 text-violet-400",
    badgeLabel: "trig",
    description:
      "Trigonometric functions in the math module work with radians by default. Use math.radians() and math.degrees() to convert between degrees and radians. math.sin(), math.cos(), and math.tan() compute standard trig values, while math.hypot() calculates the Euclidean distance (hypotenuse).",
    keyPoints: [
      "All trig functions expect angles in radians",
      "math.radians() converts degrees to radians",
      "math.degrees() converts radians to degrees",
      "math.sin(), math.cos(), math.tan() for standard trig",
      "math.hypot(x, y) returns sqrt(x*x + y*y)",
      "Results are floating-point approximations",
    ],
    codeSnippet: `import math

# Convert degrees to radians
angle_deg = 90
angle_rad = math.radians(angle_deg)
print(f"radians(\${angle_deg}):", angle_rad)

# Basic trig functions
print("sin(pi/2):", math.sin(math.pi / 2))
print("cos(0):", math.cos(0))
print("tan(pi/4):", math.tan(math.pi / 4))

# Convert radians back to degrees
print("degrees(pi):", math.degrees(math.pi))
print("degrees(pi/2):", math.degrees(math.pi / 2))

# Hypotenuse (Euclidean distance)
print("hypot(3, 4):", math.hypot(3, 4))
print("hypot(5, 12):", math.hypot(5, 12))`,
    codeOutput: [
      "radians(90): 1.5707963267948966",
      "sin(pi/2): 1.0",
      "cos(0): 1.0",
      "tan(pi/4): 0.9999999999999999",
      "degrees(pi): 180.0",
      "degrees(pi/2): 90.0",
      "hypot(3, 4): 5.0",
      "hypot(5, 12): 13.0",
    ],
  },
  combinatorics: {
    label: "Combinatorics",
    subtitle: "factorial, comb, perm, gcd, lcm",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/10 text-orange-400",
    badgeLabel: "combo",
    description:
      "The math module includes combinatorial and number-theory functions. math.factorial() computes n!, math.comb() calculates combinations (n choose k), and math.perm() calculates permutations. math.gcd() and math.lcm() find the greatest common divisor and least common multiple respectively.",
    keyPoints: [
      "math.factorial(n) returns n! (n factorial)",
      "math.comb(n, k) returns C(n, k) — combinations without repetition",
      "math.perm(n, k) returns P(n, k) — permutations without repetition",
      "math.gcd(a, b) returns the greatest common divisor",
      "math.lcm(a, b) returns the least common multiple (Python 3.9+)",
      "All functions return integers for integer inputs",
    ],
    codeSnippet: `import math

# Factorial
print("factorial(5):", math.factorial(5))
print("factorial(10):", math.factorial(10))

# Combinations and Permutations
print("comb(10, 3):", math.comb(10, 3))
print("perm(10, 3):", math.perm(10, 3))
print("comb(5, 2):", math.comb(5, 2))
print("perm(5, 2):", math.perm(5, 2))

# GCD and LCM
print("gcd(48, 18):", math.gcd(48, 18))
print("gcd(100, 75):", math.gcd(100, 75))
print("lcm(12, 18):", math.lcm(12, 18))
print("lcm(4, 6):", math.lcm(4, 6))`,
    codeOutput: [
      "factorial(5): 120",
      "factorial(10): 3628800",
      "comb(10, 3): 120",
      "perm(10, 3): 720",
      "comb(5, 2): 10",
      "perm(5, 2): 20",
      "gcd(48, 18): 6",
      "gcd(100, 75): 25",
      "lcm(12, 18): 36",
      "lcm(4, 6): 12",
    ],
  },
};

const order: TopicKey[] = ["constants", "powers-logs", "trigonometry", "combinatorics"];

const chipColors: Record<TopicKey, string> = {
  constants: "bg-blue-500/15 border-blue-500/30 text-blue-400",
  "powers-logs": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  trigonometry: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  combinatorics: "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function MathModuleVisualization() {
  const [selected, setSelected] = useState<TopicKey>("constants");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python math Module</CardTitle>
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
