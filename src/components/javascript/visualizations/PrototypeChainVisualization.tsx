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
          {lines.map((line, i) => (
            <p key={`${line}-${i}`} className="text-emerald-400">
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
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type PCTab = "chainBasics" | "inheritance" | "chainEnd" | "instanceOf";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<PCTab, GroupInfo> = {
  chainBasics: {
    label: "Chain Basics",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "When you access a property on an object, JavaScript first looks at the object itself. If the property is not found, it walks up the prototype chain &mdash; checking the object&apos;s [[Prototype]], then its [[Prototype]], and so on until it reaches null.",
    codeSnippet: `const animal = { eats: true };
const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.jumps);  // own property
console.log(rabbit.eats);   // found on prototype
console.log(rabbit.flies);  // not in chain`,
    codeOutput: [
      "true",
      "true",
      "undefined",
    ],
  },
  inheritance: {
    label: "Inheritance",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Prototypal inheritance lets one object inherit properties and methods from another. Constructor functions use their .prototype property to share methods across all instances created with &quot;new&quot;.",
    codeSnippet: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return this.name + " makes a sound";
};

function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const rex = new Dog("Rex");
console.log(rex.speak());
console.log(rex.name);
console.log(rex.constructor === Dog);`,
    codeOutput: [
      "Rex makes a sound",
      "Rex",
      "true",
    ],
  },
  chainEnd: {
    label: "Chain End",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Every prototype chain eventually terminates at Object.prototype, whose own [[Prototype]] is null. This null value signals the end of the lookup. If a property is not found anywhere in the chain, undefined is returned.",
    codeSnippet: `const obj = { x: 1 };

console.log(Object.getPrototypeOf(obj) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));

// hasOwnProperty lives on Object.prototype
console.log(obj.hasOwnProperty("x"));
console.log(obj.hasOwnProperty("toString"));
console.log(typeof obj.toString);`,
    codeOutput: [
      "true",
      "null",
      "true",
      "false",
      "function",
    ],
  },
  instanceOf: {
    label: "instanceof",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The instanceof operator checks whether a constructor&apos;s .prototype property appears anywhere in an object&apos;s prototype chain. It walks up the chain comparing each [[Prototype]] to Constructor.prototype.",
    codeSnippet: `function Animal() {}
function Dog() {}
Dog.prototype = Object.create(Animal.prototype);

const rex = new Dog();

console.log(rex instanceof Dog);
console.log(rex instanceof Animal);
console.log(rex instanceof Object);

// Manually checking the chain
const proto = Object.getPrototypeOf(rex);
console.log(proto === Dog.prototype);
console.log(Object.getPrototypeOf(proto) === Animal.prototype);`,
    codeOutput: [
      "true",
      "true",
      "true",
      "true",
      "true",
    ],
  },
};

const order: PCTab[] = ["chainBasics", "inheritance", "chainEnd", "instanceOf"];

// ─── interactive chain data ─────────────────────────────────────────────────
const chainBoxes = [
  {
    id: "myObj",
    label: "myObj",
    properties: ["name: \"Rex\"", "age: 3"],
    color: "border-blue-500 bg-blue-500/10",
    textColor: "text-blue-700 dark:text-blue-300",
  },
  {
    id: "animal-proto",
    label: "Animal.prototype",
    properties: ["speak()", "eat()"],
    color: "border-emerald-500 bg-emerald-500/10",
    textColor: "text-emerald-700 dark:text-emerald-300",
  },
  {
    id: "object-proto",
    label: "Object.prototype",
    properties: ["hasOwnProperty()", "toString()", "valueOf()"],
    color: "border-violet-500 bg-violet-500/10",
    textColor: "text-violet-700 dark:text-violet-300",
  },
  {
    id: "null",
    label: "null",
    properties: [],
    color: "border-zinc-500 bg-zinc-500/10",
    textColor: "text-zinc-500",
  },
];

const searchableMethods = [
  { name: "name", foundAt: 0, resultText: "Found \"name\" on myObj (own property)" },
  { name: "speak()", foundAt: 1, resultText: "Found \"speak()\" on Animal.prototype" },
  { name: "toString()", foundAt: 2, resultText: "Found \"toString()\" on Object.prototype" },
  { name: "fly()", foundAt: -1, resultText: "Not found — reached null (end of chain)" },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    method: "Object.getPrototypeOf(obj)",
    purpose: "Returns the prototype ([[Prototype]]) of an object",
    returns: "Object | null",
  },
  {
    method: "Object.create(proto)",
    purpose: "Creates a new object with the specified prototype",
    returns: "Object",
  },
  {
    method: "obj.hasOwnProperty(prop)",
    purpose: "Checks if a property is the object&apos;s own (not inherited)",
    returns: "boolean",
  },
  {
    method: "obj instanceof Constructor",
    purpose: "Checks if Constructor.prototype is in the prototype chain",
    returns: "boolean",
  },
  {
    method: "Object.setPrototypeOf(obj, proto)",
    purpose: "Sets the prototype of an object (not recommended for perf)",
    returns: "Object",
  },
  {
    method: "obj.isPrototypeOf(target)",
    purpose: "Checks if obj exists in target&apos;s prototype chain",
    returns: "boolean",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function PrototypeChainVisualization() {
  const [selected, setSelected] = useState<PCTab>("chainBasics");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [searchMethod, setSearchMethod] = useState<number | null>(null);
  const [highlightedBox, setHighlightedBox] = useState<number | null>(null);
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: PCTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  const runSearch = async (methodIndex: number) => {
    const method = searchableMethods[methodIndex];
    setSearchMethod(methodIndex);
    setSearchResult(null);
    setHighlightedBox(null);
    setAnimating(true);

    const stopAt = method.foundAt === -1 ? chainBoxes.length : method.foundAt + 1;

    for (let i = 0; i < stopAt; i++) {
      setHighlightedBox(i);
      await new Promise((r) => setTimeout(r, 800));
    }

    setSearchResult(method.resultText);
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Prototype Chain in JavaScript</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const g = groups[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? g.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {g.label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${group.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{group.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${group.badgeColor}`}>
                  prototype chain
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90" dangerouslySetInnerHTML={{ __html: group.description }} />
            </div>

            {/* Code + Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {group.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(group.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
              </div>

              {/* Right: Output */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interactive Chain Visual */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Interactive Prototype Chain Lookup
          </p>
          <div className="rounded-xl border bg-muted/20 px-4 py-5 space-y-5">
            {/* Search buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold mr-1">Search for:</span>
              {searchableMethods.map((m, idx) => (
                <Button
                  key={m.name}
                  size="sm"
                  variant={searchMethod === idx ? "default" : "outline"}
                  disabled={animating}
                  onClick={() => runSearch(idx)}
                  className="text-xs"
                >
                  <Play className="h-3 w-3 mr-1" />
                  {m.name}
                </Button>
              ))}
            </div>

            {/* Vertical chain */}
            <div className="flex flex-col items-center gap-0">
              {chainBoxes.map((box, idx) => (
                <div key={box.id} className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: highlightedBox === idx ? 1.08 : 1,
                      boxShadow:
                        highlightedBox === idx
                          ? "0 0 20px rgba(59,130,246,0.5)"
                          : "0 0 0px transparent",
                    }}
                    transition={{ duration: 0.25 }}
                    className={`relative rounded-xl border-2 px-5 py-3 min-w-[200px] text-center transition-all ${
                      highlightedBox === idx
                        ? box.color + " ring-2 ring-offset-2 ring-offset-background ring-blue-400"
                        : "bg-muted/30 border-border"
                    }`}
                  >
                    <p className={`font-mono font-bold text-sm ${highlightedBox === idx ? box.textColor : "text-foreground"}`}>
                      {box.label}
                    </p>
                    {box.properties.length > 0 && (
                      <div className="mt-1 space-y-0.5">
                        {box.properties.map((prop) => (
                          <p
                            key={prop}
                            className={`text-[11px] font-mono ${
                              highlightedBox === idx
                                ? "text-foreground/80"
                                : "text-muted-foreground"
                            }`}
                          >
                            {prop}
                          </p>
                        ))}
                      </div>
                    )}
                    {highlightedBox === idx && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center"
                      >
                        <span className="text-white text-[10px] font-bold">?</span>
                      </motion.div>
                    )}
                  </motion.div>
                  {idx < chainBoxes.length - 1 && (
                    <motion.div
                      animate={{
                        color:
                          highlightedBox !== null && highlightedBox >= idx
                            ? "rgb(59,130,246)"
                            : "rgb(161,161,170)",
                      }}
                      className="text-2xl font-bold select-none my-1"
                    >
                      ↓
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Search result */}
            <AnimatePresence mode="wait">
              {searchResult && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 text-center"
                >
                  <p className="text-xs font-mono text-emerald-400">{searchResult}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Prototype Chain Methods &amp; Operators
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Method / Operator</span>
              <span>Purpose</span>
              <span>Returns</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.method}
                className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300 text-[11px]">
                  {row.method}
                </code>
                <span
                  className="text-[11px] text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: row.purpose }}
                />
                <code className="font-mono text-[11px] text-muted-foreground">{row.returns}</code>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
