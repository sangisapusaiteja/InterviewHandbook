"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";

// ─── types ────────────────────────────────────────────────────────────────────

type NodeState =
  | "idle"
  | "traverse"
  | "found"
  | "inserting"
  | "deleting"
  | "new";

interface LLNode {
  id: number;
  val: number;
  state: NodeState;
}

type OpTab = "insertHead" | "insertTail" | "deleteHead" | "deleteValue";
type PracticeTab = "reverse" | "middle" | "nthFromEnd";

interface Step {
  nodes: LLNode[];
  message: string;
  code: string;
}

interface PracticeStep {
  nodes: LLNode[];
  slow: number | null;
  fast: number | null;
  message: string;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

let _uid = 100;
const uid = () => ++_uid;

function makeNodes(vals: number[]): LLNode[] {
  return vals.map((v) => ({ id: uid(), val: v, state: "idle" as NodeState }));
}

function clone(nodes: LLNode[]): LLNode[] {
  return nodes.map((n) => ({ ...n }));
}

function setState(nodes: LLNode[], idx: number, state: NodeState): LLNode[] {
  const next = clone(nodes);
  next[idx] = { ...next[idx], state };
  return next;
}

function allIdle(nodes: LLNode[]): LLNode[] {
  return nodes.map((n) => ({ ...n, state: "idle" as NodeState }));
}

// ─── operation step builders ──────────────────────────────────────────────────

function buildInsertHead(nodes: LLNode[], val: number): Step[] {
  const steps: Step[] = [];
  const base = allIdle(clone(nodes));

  steps.push({
    nodes: base,
    message: `insertHead(${val}) — create new node, point it at current head`,
    code: "const node = new ListNode(val, this.head);",
  });

  const withNew: LLNode[] = [
    { id: uid(), val, state: "new" },
    ...base.map((n) => ({ ...n, state: "idle" as NodeState })),
  ];
  steps.push({
    nodes: withNew,
    message: `New node [${val}] created — now becomes the new head`,
    code: "this.head = node;",
  });

  steps.push({
    nodes: allIdle(withNew),
    message: `Done! [${val}] is the new head. O(1) — no traversal needed.`,
    code: "// ✓ complete",
  });

  return steps;
}

function buildInsertTail(nodes: LLNode[], val: number): Step[] {
  const steps: Step[] = [];
  const base = allIdle(clone(nodes));

  if (base.length === 0) {
    const withNew: LLNode[] = [{ id: uid(), val, state: "inserting" }];
    steps.push({
      nodes: [],
      message: "List is empty — new node becomes head directly",
      code: "if (!this.head) { this.head = node; return; }",
    });
    steps.push({
      nodes: withNew,
      message: `Done! [${val}] is now head.`,
      code: "// ✓ complete",
    });
    return steps;
  }

  steps.push({
    nodes: base,
    message: "insertTail — must walk to the last node first",
    code: "let cur = this.head;",
  });

  let cur = clone(base);
  for (let i = 0; i < cur.length; i++) {
    cur = setState(cur, i, "traverse");
    steps.push({
      nodes: clone(cur),
      message:
        i < cur.length - 1
          ? `cur.next exists — advance to index ${i + 1}`
          : `cur.next is null — found the tail at index ${i}`,
      code:
        i < cur.length - 1
          ? "while (cur.next) cur = cur.next;"
          : "// stopped at last node",
    });
    if (i < cur.length - 1) cur = setState(cur, i, "idle");
  }

  const withNew = [
    ...clone(cur),
    { id: uid(), val, state: "inserting" as NodeState },
  ];
  steps.push({
    nodes: withNew,
    message: `Append [${val}] — set cur.next = new node`,
    code: "cur.next = node;",
  });

  steps.push({
    nodes: allIdle(withNew),
    message: `Done! [${val}] appended to tail. O(n) traversal required.`,
    code: "// ✓ complete",
  });

  return steps;
}

function buildDeleteHead(nodes: LLNode[]): Step[] {
  if (nodes.length === 0) {
    return [
      {
        nodes: [],
        message: "List is empty — nothing to delete",
        code: "if (!this.head) return;",
      },
    ];
  }

  const steps: Step[] = [];
  const base = allIdle(clone(nodes));

  steps.push({
    nodes: base,
    message: "deleteHead — remove the first node, advance head",
    code: "if (!this.head) return;",
  });

  const marked = setState(base, 0, "deleting");
  steps.push({
    nodes: marked,
    message: `Marking head [${base[0].val}] for removal`,
    code: "this.head = this.head.next;",
  });

  const after = allIdle(base.slice(1));
  steps.push({
    nodes: after,
    message: `Done! [${base[0].val}] removed. O(1).`,
    code: "// ✓ complete",
  });

  return steps;
}

function buildDeleteValue(nodes: LLNode[], val: number): Step[] {
  const steps: Step[] = [];
  const base = allIdle(clone(nodes));

  steps.push({
    nodes: base,
    message: `deleteValue(${val}) — search from head`,
    code: "if (!this.head) return;",
  });

  const idx = base.findIndex((n) => n.val === val);

  if (idx === -1) {
    steps.push({
      nodes: base,
      message: `Value ${val} not found in list — no change`,
      code: "// value not found",
    });
    return steps;
  }

  if (idx === 0) {
    const marked = setState(base, 0, "deleting");
    steps.push({
      nodes: marked,
      message: `Head matches ${val} — advance head`,
      code: "if (this.head.val === val) { this.head = this.head.next; return; }",
    });
    steps.push({
      nodes: allIdle(base.slice(1)),
      message: `Done! [${val}] removed from head. O(1).`,
      code: "// ✓ complete",
    });
    return steps;
  }

  let cur = clone(base);
  for (let i = 0; i < idx; i++) {
    cur = setState(cur, i, "traverse");
    steps.push({
      nodes: clone(cur),
      message:
        i < idx - 1
          ? `cur.next.val (${cur[i + 1].val}) ≠ ${val} — advance`
          : `cur.next.val (${cur[i + 1].val}) === ${val} — found predecessor`,
      code: "while (cur.next && cur.next.val !== val) cur = cur.next;",
    });
    if (i < idx - 1) cur = setState(cur, i, "idle");
  }

  cur = setState(cur, idx, "deleting");
  steps.push({
    nodes: clone(cur),
    message: `Bypass [${val}] — cur.next = cur.next.next`,
    code: "if (cur.next) cur.next = cur.next.next;",
  });

  const after = allIdle([...cur.slice(0, idx), ...cur.slice(idx + 1)]);
  steps.push({
    nodes: after,
    message: `Done! [${val}] removed. O(n) traversal.`,
    code: "// ✓ complete",
  });

  return steps;
}

// ─── practice step builders ───────────────────────────────────────────────────

function buildReverse(vals: number[]): PracticeStep[] {
  const steps: PracticeStep[] = [];
  const nodes = makeNodes(vals);

  steps.push({
    nodes: allIdle(clone(nodes)),
    slow: 0,
    fast: null,
    message: "Start: prev = null, cur = head",
  });

  for (let i = 0; i < nodes.length; i++) {
    const cur = allIdle(clone(nodes));
    cur[i] = { ...cur[i], state: "traverse" };
    steps.push({
      nodes: cur,
      slow: i,
      fast: null,
      message: `cur=[${nodes[i].val}] — save nxt, flip cur.next → prev, advance`,
    });
  }

  const reversed = [...nodes].reverse().map((n) => ({
    ...n,
    id: uid(),
    state: "idle" as NodeState,
  }));
  steps.push({
    nodes: reversed,
    slow: null,
    fast: null,
    message: `Done! Reversed: [${reversed.map((n) => n.val).join(", ")}]`,
  });

  return steps;
}

function buildMiddle(vals: number[]): PracticeStep[] {
  const steps: PracticeStep[] = [];
  const nodes = makeNodes(vals);
  const n = nodes.length;

  steps.push({
    nodes: allIdle(clone(nodes)),
    slow: 0,
    fast: 0,
    message: "slow = head (idx 0), fast = head (idx 0)",
  });

  let slow = 0;
  let fast = 0;
  while (fast + 1 < n) {
    slow += 1;
    fast = Math.min(fast + 2, n - 1);
    const cur = allIdle(clone(nodes));
    if (slow < n) cur[slow] = { ...cur[slow], state: "traverse" };
    steps.push({
      nodes: cur,
      slow,
      fast,
      message: `slow→${slow}, fast→${fast}${fast + 1 >= n ? " — fast at end, stop" : ""}`,
    });
  }

  const final = allIdle(clone(nodes));
  final[slow] = { ...final[slow], state: "found" };
  steps.push({
    nodes: final,
    slow,
    fast,
    message: `Middle is index ${slow} → value ${nodes[slow].val}`,
  });

  return steps;
}

function buildNthFromEnd(vals: number[], n: number): PracticeStep[] {
  const steps: PracticeStep[] = [];
  const nodes = makeNodes(vals);
  const len = nodes.length;

  steps.push({
    nodes: allIdle(clone(nodes)),
    slow: 0,
    fast: 0,
    message: `leader = head, follower = head. Advance leader ${n} steps first.`,
  });

  let fast = 0;
  for (let i = 0; i < n && fast < len; i++, fast++) {
    const cur = allIdle(clone(nodes));
    if (fast < len) cur[fast] = { ...cur[fast], state: "traverse" };
    steps.push({
      nodes: cur,
      slow: 0,
      fast,
      message: `Advance leader to index ${fast}`,
    });
  }

  let slow = 0;
  while (fast < len) {
    slow++;
    fast++;
    const cur = allIdle(clone(nodes));
    if (slow < len) cur[slow] = { ...cur[slow], state: "traverse" };
    if (fast < len) cur[fast] = { ...cur[fast], state: "traverse" };
    steps.push({
      nodes: cur,
      slow,
      fast: fast < len ? fast : null,
      message: `leader→${fast < len ? fast : "null"}, follower→${slow}`,
    });
  }

  const final = allIdle(clone(nodes));
  if (slow < len) final[slow] = { ...final[slow], state: "found" };
  steps.push({
    nodes: final,
    slow,
    fast: null,
    message: `${n}th from end → index ${slow}, value ${nodes[slow]?.val ?? "?"}`,
  });

  return steps;
}

// ─── node colour ──────────────────────────────────────────────────────────────

function nodeColor(state: NodeState) {
  switch (state) {
    case "traverse":
      return "bg-purple-500 text-white border-purple-600";
    case "found":
      return "bg-amber-400 text-black border-amber-500";
    case "inserting":
    case "new":
      return "bg-emerald-500 text-white border-emerald-600";
    case "deleting":
      return "bg-red-500 text-white border-red-600";
    default:
      return "bg-card text-foreground border-border";
  }
}

// ─── NodeRow ──────────────────────────────────────────────────────────────────

interface NodeRowProps {
  nodes: LLNode[];
  slowIdx?: number | null;
  fastIdx?: number | null;
}

function NodeRow({ nodes, slowIdx, fastIdx }: NodeRowProps) {
  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-16 text-muted-foreground text-sm">
        (empty list)
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center py-4 gap-0">
      <AnimatePresence mode="popLayout">
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
            className="flex items-center"
          >
            <div className="relative">
              <div
                className={`w-12 h-10 flex items-center justify-center rounded border-2 text-sm font-mono font-bold transition-colors ${nodeColor(node.state)}`}
              >
                {node.val}
              </div>
              <div className="absolute -top-5 left-0 right-0 flex justify-center gap-0.5 text-[9px] font-semibold">
                {slowIdx === i && (
                  <span className="text-purple-500">slow</span>
                )}
                {fastIdx === i && (
                  <span className="text-amber-500">fast</span>
                )}
              </div>
            </div>
            {i < nodes.length - 1 ? (
              <div className="flex items-center text-muted-foreground px-0.5">
                <div className="w-4 h-px bg-muted-foreground" />
                <ChevronRight className="h-3 w-3 -ml-1" />
              </div>
            ) : (
              <div className="flex items-center text-muted-foreground pl-1 gap-0.5 text-[10px]">
                <div className="w-3 h-px bg-muted-foreground" />
                <span>null</span>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Operation Visualizer ─────────────────────────────────────────────────────

const INITIAL_VALS = [3, 7, 1, 9];

const opMeta: Record<OpTab, { label: string; complexity: string }> = {
  insertHead: { label: "insertHead(5)", complexity: "O(1)" },
  insertTail: { label: "insertTail(5)", complexity: "O(n)" },
  deleteHead: { label: "deleteHead()", complexity: "O(1)" },
  deleteValue: { label: "deleteValue(7)", complexity: "O(n)" },
};

function OperationVisualizer() {
  const [op, setOp] = useState<OpTab>("insertHead");
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [ran, setRan] = useState(false);

  const run = useCallback(() => {
    const base = makeNodes(INITIAL_VALS);
    let s: Step[];
    if (op === "insertHead") s = buildInsertHead(base, 5);
    else if (op === "insertTail") s = buildInsertTail(base, 5);
    else if (op === "deleteHead") s = buildDeleteHead(base);
    else s = buildDeleteValue(base, 7);
    setSteps(s);
    setStepIdx(0);
    setRan(true);
  }, [op]);

  const reset = () => {
    setRan(false);
    setSteps([]);
    setStepIdx(0);
  };

  const current = steps[stepIdx];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(opMeta) as OpTab[]).map((o) => (
          <button
            key={o}
            onClick={() => {
              setOp(o);
              reset();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
              op === o
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {opMeta[o].label}
            <span className="ml-1.5 opacity-60">{opMeta[o].complexity}</span>
          </button>
        ))}
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-1">
          Starting list: [{INITIAL_VALS.join(", ")}]
        </p>
        <NodeRow nodes={ran && current ? current.nodes : makeNodes(INITIAL_VALS)} />
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" onClick={run} className="gap-1.5">
          <Play className="h-3.5 w-3.5" />
          Run
        </Button>
        {ran && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
              disabled={stepIdx === 0}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setStepIdx((i) => Math.min(steps.length - 1, i + 1))}
              disabled={stepIdx === steps.length - 1}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
            <span className="text-xs text-muted-foreground">
              Step {stepIdx + 1}/{steps.length}
            </span>
            <Button size="sm" variant="ghost" onClick={reset} className="ml-auto">
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </>
        )}
      </div>

      {ran && current && (
        <motion.div
          key={stepIdx}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="rounded-lg bg-muted/50 px-3 py-2 text-sm">
            {current.message}
          </div>
          <pre className="rounded-lg bg-zinc-950 text-emerald-400 text-xs p-3 overflow-x-auto font-mono">
            {current.code}
          </pre>
        </motion.div>
      )}
    </div>
  );
}

// ─── Practice Section ─────────────────────────────────────────────────────────

const PRACTICE_VALS = [1, 2, 3, 4, 5];

function PracticeSection() {
  const [tab, setTab] = useState<PracticeTab>("reverse");
  const [steps, setSteps] = useState<PracticeStep[]>([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [ran, setRan] = useState(false);

  const run = useCallback(() => {
    let s: PracticeStep[];
    if (tab === "reverse") s = buildReverse(PRACTICE_VALS);
    else if (tab === "middle") s = buildMiddle(PRACTICE_VALS);
    else s = buildNthFromEnd(PRACTICE_VALS, 2);
    setSteps(s);
    setStepIdx(0);
    setRan(true);
  }, [tab]);

  const reset = () => {
    setRan(false);
    setSteps([]);
    setStepIdx(0);
  };

  const current = steps[stepIdx];

  const practiceInfo: Record<PracticeTab, { title: string; desc: string; complexity: string }> = {
    reverse: {
      title: "Reverse a Linked List",
      desc: "Iterative: three pointers (prev / cur / nxt) flip one arrow per step.",
      complexity: "O(n) time · O(1) space",
    },
    middle: {
      title: "Find Middle Node",
      desc: "Slow/fast two-pointer: slow +1, fast +2. When fast can't advance, slow is at middle.",
      complexity: "O(n) time · O(1) space",
    },
    nthFromEnd: {
      title: "Nth from End (n = 2)",
      desc: "Advance leader N steps, then move both together. When leader is null, follower is the target.",
      complexity: "O(n) time · O(1) space",
    },
  };

  const info = practiceInfo[tab];

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => {
        setTab(v as PracticeTab);
        reset();
      }}
    >
      <TabsList className="grid w-full grid-cols-3 text-xs">
        <TabsTrigger value="reverse">Reverse</TabsTrigger>
        <TabsTrigger value="middle">Find Middle</TabsTrigger>
        <TabsTrigger value="nthFromEnd">Nth from End</TabsTrigger>
      </TabsList>

      {(["reverse", "middle", "nthFromEnd"] as PracticeTab[]).map((t) => (
        <TabsContent key={t} value={t} className="space-y-3 mt-3">
          <div>
            <p className="text-sm font-medium">{info.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{info.desc}</p>
            <Badge variant="outline" className="mt-1 text-[10px]">
              {info.complexity}
            </Badge>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">
              List: [{PRACTICE_VALS.join(", ")}]
            </p>
            <NodeRow
              nodes={ran && current ? current.nodes : makeNodes(PRACTICE_VALS)}
              slowIdx={ran && current ? current.slow : null}
              fastIdx={ran && current ? current.fast : null}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={run} className="gap-1.5">
              <Play className="h-3.5 w-3.5" />
              Run
            </Button>
            {ran && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
                  disabled={stepIdx === 0}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setStepIdx((i) => Math.min(steps.length - 1, i + 1))}
                  disabled={stepIdx === steps.length - 1}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
                <span className="text-xs text-muted-foreground">
                  {stepIdx + 1}/{steps.length}
                </span>
                <Button size="sm" variant="ghost" onClick={reset} className="ml-auto">
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              </>
            )}
          </div>

          {ran && current && (
            <motion.div
              key={stepIdx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-muted/50 px-3 py-2 text-sm"
            >
              {current.message}
            </motion.div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function LinkedListVisualization() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            Linked List Operations
            <Badge variant="outline" className="text-[10px]">
              step-by-step
            </Badge>
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Select an operation, hit Run, then step through pointer changes.
            <span className="ml-1">
              <span className="text-emerald-500 font-medium">Green</span> = new ·{" "}
              <span className="text-red-500 font-medium">Red</span> = deleting ·{" "}
              <span className="text-purple-500 font-medium">Purple</span> = traversing
            </span>
          </p>
        </CardHeader>
        <CardContent>
          <OperationVisualizer />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Practice Problems</CardTitle>
          <p className="text-xs text-muted-foreground">
            Classic interview patterns — reversal and two-pointer techniques.
          </p>
        </CardHeader>
        <CardContent>
          <PracticeSection />
        </CardContent>
      </Card>
    </div>
  );
}
