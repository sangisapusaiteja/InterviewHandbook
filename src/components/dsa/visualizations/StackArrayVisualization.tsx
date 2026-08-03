"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── Console Output ──────────────────────────────────────────────────────────
function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px] overflow-auto"
        >
          {lines.map((line, i) => (
            <p key={i} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;</span>
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
          <p className="text-xs text-muted-foreground italic">
            Click ▶ Run to see output
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Stack Diagram ───────────────────────────────────────────────────────────
interface StackEl {
  id: number;
  val: number;
}

function StackDiagram({
  elements,
  activeId,
  isPopping,
}: {
  elements: StackEl[];
  activeId: number;
  isPopping: boolean;
}) {
  const reversed = [...elements].reverse(); // top first in display
  return (
    <div className="flex flex-col items-center gap-1 py-2">
      <span className="text-[10px] font-semibold text-primary tracking-widest uppercase">
        Top
      </span>
      <div className="border-2 border-dashed border-border rounded-xl px-5 py-3 min-h-[60px] flex flex-col gap-1.5 items-center w-fit">
        <AnimatePresence initial={false}>
          {reversed.map((el) => {
            const isActive = el.id === activeId;
            return (
              <motion.div
                key={el.id}
                initial={{ opacity: 0, y: -16, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  backgroundColor: isActive
                    ? isPopping
                      ? "#ef444430"
                      : "#22c55e30"
                    : "transparent",
                }}
                exit={{ opacity: 0, y: -16, scale: 0.85 }}
                transition={{ duration: 0.25 }}
                className="w-14 h-10 flex items-center justify-center rounded-lg border-2 font-mono text-sm font-bold"
                style={{
                  borderColor: isActive
                    ? isPopping
                      ? "#ef4444"
                      : "#22c55e"
                    : undefined,
                }}
              >
                {el.val}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {elements.length === 0 && (
          <p className="text-xs text-muted-foreground italic px-2 py-1">
            empty
          </p>
        )}
      </div>
      <div className="w-24 border-b-2 border-border/60 my-0.5" />
      <span className="text-[10px] text-muted-foreground">Bottom</span>
    </div>
  );
}

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface StackStep {
  elements: StackEl[];
  activeId: number;
  isPopping: boolean;
  action: string;
  msg: string;
}

interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

// ─── buildStack ───────────────────────────────────────────────────────────────
function buildStack(input: string): {
  arr: number[];
  steps: StackStep[];
  code: string;
  output: string[];
} {
  let nextId = 0;
  const parsed = input
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));
  const arr = parsed.length >= 2 ? parsed.slice(0, 6) : [5, 3, 8, 1, 4];

  const steps: StackStep[] = [];
  const stack: StackEl[] = [];

  steps.push({
    elements: [],
    activeId: -1,
    isPopping: false,
    action: "new Stack()",
    msg: "Stack created — empty  (LIFO: Last In, First Out)",
  });

  for (const val of arr) {
    const el: StackEl = { id: nextId++, val };
    stack.push(el);
    steps.push({
      elements: [...stack],
      activeId: el.id,
      isPopping: false,
      action: `push(${val})`,
      msg: `push(${val}) → top = ${val}  |  size = ${stack.length}`,
    });
  }

  const topEl = stack[stack.length - 1];
  steps.push({
    elements: [...stack],
    activeId: topEl.id,
    isPopping: false,
    action: `peek() → ${topEl.val}`,
    msg: `peek() returns ${topEl.val} without removing it`,
  });

  const popped = stack.pop()!;
  steps.push({
    elements: [...stack],
    activeId: stack.length ? stack[stack.length - 1].id : -1,
    isPopping: true,
    action: `pop() → ${popped.val}`,
    msg: `pop() removes ${popped.val}  ←  LIFO!${
      stack.length
        ? `  new top = ${stack[stack.length - 1].val}`
        : "  stack is now empty"
    }`,
  });

  return {
    arr,
    steps,
    code: [
      "class Stack {",
      "  constructor() { this.items = []; }",
      "  push(val) { this.items.push(val); }        // O(1)",
      "  pop()  { return this.items.pop() ?? null; } // O(1)",
      "  peek() { return this.items.at(-1) ?? null; }// O(1)",
      "  isEmpty() { return this.items.length === 0; }",
      "  size()    { return this.items.length; }",
      "}",
      "",
      "const s = new Stack();",
      ...arr.map((v) => `s.push(${v});`),
      `console.log("peek:", s.peek());  // ${arr[arr.length - 1]}`,
      `console.log("pop:", s.pop());    // ${arr[arr.length - 1]}`,
      `console.log("size:", s.size());  // ${arr.length - 1}`,
    ].join("\n"),
    output: [
      `After push [${arr.join(", ")}]`,
      `peek() → ${arr[arr.length - 1]}`,
      `pop()  → ${arr[arr.length - 1]}`,
      `size() → ${arr.length - 1}`,
    ],
  };
}

// ─── buildPractice ────────────────────────────────────────────────────────────
type PracticeTab = "validParentheses" | "minStack" | "evalRPN";

function buildPractice(
  tab: PracticeTab,
  input: string
): { code: string; output: string; steps: PracticeStep[] } {
  switch (tab) {
    case "minStack": {
      const nums = input
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));
      const arr = nums.length >= 2 ? nums.slice(0, 5) : [3, 5, 2, 7, 1];
      const items: number[] = [];
      const minS: number[] = [];
      const steps: PracticeStep[] = [
        { label: "Input", value: `push [${arr.join(", ")}]` },
      ];
      for (const v of arr) {
        items.push(v);
        minS.push(minS.length ? Math.min(v, minS[minS.length - 1]) : v);
        steps.push({
          label: `push(${v})`,
          value: `stack:[${items.join(",")}]  minS:[${minS.join(",")}]`,
        });
      }
      steps.push({
        label: "getMin()",
        value: String(minS[minS.length - 1]),
        highlight: true,
      });
      items.pop();
      minS.pop();
      steps.push({
        label: "pop()",
        value: `both stacks pop → getMin = ${minS[minS.length - 1]}`,
      });
      steps.push({
        label: "getMin()",
        value: String(minS[minS.length - 1]),
        highlight: true,
      });
      return {
        code: [
          "class MinStack {",
          "  constructor() { this.s = []; this.m = []; }",
          "  push(v) {",
          "    this.s.push(v);",
          "    const cur = this.m.length",
          "      ? Math.min(v, this.m.at(-1)) : v;",
          "    this.m.push(cur);",
          "  }",
          "  pop()    { this.s.pop(); this.m.pop(); }",
          "  getMin() { return this.m.at(-1); }",
          "}",
          "const ms = new MinStack();",
          ...arr.map((v) => `ms.push(${v});`),
          `console.log(ms.getMin()); // ${Math.min(...arr)}`,
        ].join("\n"),
        output: `getMin() → ${Math.min(...arr)}  (O(1))`,
        steps,
      };
    }

    case "evalRPN": {
      const rawTokens = input
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const tokens =
        rawTokens.some((t) => ["+", "-", "*", "/"].includes(t))
          ? rawTokens
          : ["2", "1", "+", "3", "*"];
      const steps: PracticeStep[] = [
        { label: "Tokens", value: `[${tokens.join(", ")}]` },
      ];
      const stk: number[] = [];
      const OPS = new Set(["+", "-", "*", "/"]);
      for (const tok of tokens) {
        if (OPS.has(tok)) {
          const b = stk.pop()!;
          const a = stk.pop()!;
          let res: number;
          if (tok === "+") res = a + b;
          else if (tok === "-") res = a - b;
          else if (tok === "*") res = a * b;
          else res = Math.trunc(a / b);
          stk.push(res);
          steps.push({
            label: `'${tok}'`,
            value: `${a} ${tok} ${b} = ${res}  →  stack:[${stk.join(",")}]`,
          });
        } else {
          stk.push(Number(tok));
          steps.push({
            label: `'${tok}'`,
            value: `push(${tok})  →  stack:[${stk.join(",")}]`,
          });
        }
      }
      steps.push({ label: "Result", value: String(stk[0]), highlight: true });
      return {
        code: [
          "function evalRPN(tokens) {",
          "  const stack = [];",
          "  for (const tok of tokens) {",
          "    if (['+','-','*','/'].includes(tok)) {",
          "      const [b, a] = [stack.pop(), stack.pop()];",
          "      if      (tok==='+') stack.push(a+b);",
          "      else if (tok==='-') stack.push(a-b);",
          "      else if (tok==='*') stack.push(a*b);",
          "      else                stack.push(Math.trunc(a/b));",
          "    } else {",
          "      stack.push(Number(tok));",
          "    }",
          "  }",
          "  return stack[0];",
          "}",
          `console.log(evalRPN([${tokens.map((t) => `"${t}"`).join(",")}]));`,
          `// ${stk[0]}`,
        ].join("\n"),
        output: String(stk[0]),
        steps,
      };
    }

    case "validParentheses": {
      const raw = input.replace(/[^()[\]{}]/g, "");
      const s = raw.length >= 2 ? raw : "()[{}]";
      const matchFor: Record<string, string> = { ")": "(", "}": "{", "]": "[" };
      const opens = new Set(["(", "{", "["]);
      const stk2: string[] = [];
      const steps: PracticeStep[] = [
        { label: "Input", value: `"${s}"` },
      ];
      let valid = true;
      for (const ch of s) {
        if (opens.has(ch)) {
          stk2.push(ch);
          steps.push({
            label: `'${ch}'`,
            value: `open → push  |  stack: [${stk2.join(",")}]`,
          });
        } else {
          const expected = matchFor[ch];
          const top = stk2.pop();
          if (top === expected) {
            steps.push({
              label: `'${ch}'`,
              value: `close → matched '${top}' ✓  |  stack: [${stk2.join(",") || "empty"}]`,
            });
          } else {
            valid = false;
            steps.push({
              label: `'${ch}'`,
              value: `close → expected '${expected}' got '${top ?? "∅"}' ✗  INVALID`,
            });
            break;
          }
        }
      }
      if (valid && stk2.length > 0) {
        valid = false;
        steps.push({
          label: "end",
          value: `stack not empty: [${stk2.join(",")}] — unclosed ✗`,
        });
      }
      steps.push({
        label: "Result",
        value: valid ? "true  ✅" : "false  ❌",
        highlight: true,
      });
      return {
        code: [
          "function isValid(s) {",
          "  const stack = [];",
          "  const map = { ')':'(', '}':'{', ']':'[' };",
          "  for (const ch of s) {",
          "    if ('({['.includes(ch)) {",
          "      stack.push(ch);",
          "    } else {",
          "      if (stack.pop() !== map[ch]) return false;",
          "    }",
          "  }",
          "  return stack.length === 0;",
          "}",
          `console.log(isValid("${s}")); // ${valid}`,
        ].join("\n"),
        output: String(valid),
        steps,
      };
    }
  }
}

// ─── Labels & colours ─────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  validParentheses: "Valid Parentheses  (LC 20)",
  minStack: "Min Stack  (LC 155)",
  evalRPN: "Evaluate RPN  (LC 150)",
};

const practiceColor: Record<PracticeTab, string> = {
  validParentheses:
    "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  minStack:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  evalRPN:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

const tabDefaults: Record<PracticeTab, string> = {
  validParentheses: "()[{}]",
  minStack: "3,5,2,7,1",
  evalRPN: "2,1,+,3,*",
};

const tabPlaceholders: Record<PracticeTab, string> = {
  validParentheses: 'e.g. ()[{}] or ([)]',
  minStack: "e.g. 3,5,2,7,1",
  evalRPN: "e.g. 2,1,+,3,*",
};

// ─── Main Section ─────────────────────────────────────────────────────────────
function MainSection() {
  const [input, setInput] = useState("5,3,8,1,4");
  const [hasRun, setHasRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof buildStack> | null>(
    null
  );

  const handleRun = async () => {
    const r = buildStack(input);
    setResult(r);
    setHasRun(true);
    setStepIndex(0);
    for (let i = 0; i < r.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 600));
      setStepIndex(i);
    }
  };

  const handleReset = () => {
    setHasRun(false);
    setResult(null);
    setStepIndex(0);
  };

  const step = result?.steps[stepIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Stack using Array</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Values to push (comma-separated)
              </label>
              <input
                className="w-full rounded-md border bg-background px-3 py-1.5 text-sm font-mono"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. 5,3,8,1,4"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleRun} className="gap-1.5">
                <Play className="h-3.5 w-3.5" /> Run
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                className="gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </Button>
            </div>

            {hasRun && result && step && (
              <>
                <StackDiagram
                  elements={step.elements}
                  activeId={step.activeId}
                  isPopping={step.isPopping}
                />
                <div className="rounded-lg border bg-muted/30 p-3 text-xs space-y-1">
                  <p className="font-mono font-semibold text-primary">
                    {step.action}
                  </p>
                  <p className="text-muted-foreground">{step.msg}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-3 h-3 rounded-sm border"
                      style={{
                        backgroundColor: "#22c55e30",
                        borderColor: "#22c55e",
                      }}
                    />
                    pushed / top
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-3 h-3 rounded-sm border"
                      style={{
                        backgroundColor: "#ef444430",
                        borderColor: "#ef4444",
                      }}
                    />
                    popped
                  </span>
                </div>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-3">
            <pre className="rounded-xl border bg-muted/50 px-4 py-3 text-xs font-mono overflow-auto max-h-60">
              {result?.code ?? buildStack(input).code}
            </pre>
            <ConsoleOutput lines={result?.output ?? null} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Practice Section ─────────────────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab] = useState<PracticeTab>("validParentheses");
  const [input, setInput] = useState(tabDefaults["validParentheses"]);
  const [result, setResult] = useState<{
    code: string;
    output: string;
    steps: PracticeStep[];
  } | null>(null);
  const [visibleSteps, setVisibleSteps] = useState(0);

  const handleRun = async () => {
    const r = buildPractice(tab, input);
    setResult(r);
    setVisibleSteps(0);
    for (let i = 1; i <= r.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 280));
      setVisibleSteps(i);
    }
  };

  const handleReset = () => {
    setResult(null);
    setVisibleSteps(0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Practice Problems</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(practiceLabel) as PracticeTab[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setInput(tabDefaults[t]);
                setResult(null);
                setVisibleSteps(0);
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                tab === t
                  ? practiceColor[t]
                  : "bg-muted/30 border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {practiceLabel[t]}
            </button>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Input
          </label>
          <input
            className="w-full rounded-md border bg-background px-3 py-1.5 text-sm font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tabPlaceholders[tab]}
          />
        </div>

        <div className="flex gap-2">
          <Button size="sm" onClick={handleRun} className="gap-1.5">
            <Play className="h-3.5 w-3.5" /> Run
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {result && (
          <div className="grid md:grid-cols-2 gap-4">
            <pre className="rounded-xl border bg-muted/50 px-4 py-3 text-xs font-mono overflow-auto max-h-64">
              {result.code}
            </pre>
            <div className="space-y-2">
              <ConsoleOutput lines={[result.output]} />
              <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-3 py-2 max-h-48 overflow-auto space-y-1">
                {result.steps.slice(0, visibleSteps).map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex justify-between gap-2 text-xs font-mono ${
                      s.highlight
                        ? "text-emerald-400 font-bold"
                        : "text-zinc-400"
                    }`}
                  >
                    <span className="text-zinc-500 shrink-0">{s.label}</span>
                    <span className="text-right">{s.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function StackArrayVisualization() {
  return (
    <div className="space-y-6">
      <MainSection />
      <PracticeSection />
    </div>
  );
}
