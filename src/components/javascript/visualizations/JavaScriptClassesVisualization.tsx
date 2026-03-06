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
type ClassTab = "basics" | "inheritance" | "staticPrivate" | "gettersSetters";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<ClassTab, GroupInfo> = {
  basics: {
    label: "Class Basics",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A class is a blueprint for creating objects. The constructor method initializes instance properties, and you define methods directly inside the class body.",
    codeSnippet: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return "Hi, I am " + this.name;
  }

  getInfo() {
    return this.name + " is " + this.age;
  }
}

const alice = new Person("Alice", 30);
console.log(alice.greet());
console.log(alice.getInfo());
console.log(alice instanceof Person);`,
    codeOutput: [
      "Hi, I am Alice",
      "Alice is 30",
      "true",
    ],
  },
  inheritance: {
    label: "Inheritance",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Use the extends keyword to create a child class that inherits from a parent. Call super() in the constructor to invoke the parent constructor, and super.method() to call parent methods.",
    codeSnippet: `class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + " makes a sound.";
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    return this.name + " barks!";
  }
}

const rex = new Dog("Rex", "Labrador");
console.log(rex.speak());
console.log(rex.breed);
console.log(rex instanceof Animal);`,
    codeOutput: [
      "Rex barks!",
      "Labrador",
      "true",
    ],
  },
  staticPrivate: {
    label: "Static & Private",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Static methods belong to the class itself, not instances. Private fields (prefixed with #) are only accessible inside the class body.",
    codeSnippet: `class Counter {
  #count = 0;

  static description = "A simple counter";

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }

  static about() {
    return Counter.description;
  }
}

const c = new Counter();
c.increment();
c.increment();
console.log(c.getCount());
console.log(Counter.about());
// console.log(c.#count); // SyntaxError!
console.log("Private field hidden: true");`,
    codeOutput: [
      "2",
      "A simple counter",
      "Private field hidden: true",
    ],
  },
  gettersSetters: {
    label: "Getters/Setters",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Getters and setters let you define computed properties using get and set keywords. They look like property access but execute a function under the hood.",
    codeSnippet: `class Temperature {
  #celsius;

  constructor(celsius) {
    this.#celsius = celsius;
  }

  get fahrenheit() {
    return this.#celsius * 9 / 5 + 32;
  }

  set fahrenheit(f) {
    this.#celsius = (f - 32) * 5 / 9;
  }

  get celsius() {
    return this.#celsius;
  }
}

const temp = new Temperature(100);
console.log(temp.fahrenheit);
console.log(temp.celsius);
temp.fahrenheit = 32;
console.log(temp.celsius);`,
    codeOutput: [
      "212",
      "100",
      "0",
    ],
  },
};

const order: ClassTab[] = ["basics", "inheritance", "staticPrivate", "gettersSetters"];

// ─── class hierarchy visual data ──────────────────────────────────────────────
const parentClass = {
  name: "Animal",
  constructor: "constructor(name)",
  instanceMethods: ["speak()"],
  staticMethods: [] as string[],
};

const childClass = {
  name: "Dog",
  constructor: "constructor(name, breed)",
  instanceMethods: ["speak() (override)", "fetch()"],
  staticMethods: ["Dog.species()"],
  inherited: ["name (from Animal)"],
};

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    feature: "Class Declaration",
    syntax: "class MyClass { }",
    description: "Defines a new class with the class keyword",
  },
  {
    feature: "Constructor",
    syntax: "constructor() { }",
    description: "Special method called when creating an instance",
  },
  {
    feature: "Inheritance",
    syntax: "class Child extends Parent { }",
    description: "Child inherits all parent methods and properties",
  },
  {
    feature: "Super Call",
    syntax: "super() / super.method()",
    description: "Calls the parent constructor or parent method",
  },
  {
    feature: "Static Method",
    syntax: "static myMethod() { }",
    description: "Called on the class itself, not on instances",
  },
  {
    feature: "Private Field",
    syntax: "#myField",
    description: "Only accessible within the class body",
  },
  {
    feature: "Getter",
    syntax: "get prop() { }",
    description: "Computed property accessed like a regular property",
  },
  {
    feature: "Setter",
    syntax: "set prop(val) { }",
    description: "Runs a function when a property is assigned",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function JavaScriptClassesVisualization() {
  const [selected, setSelected] = useState<ClassTab>("basics");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [highlightInherited, setHighlightInherited] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: ClassTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">JavaScript Classes</CardTitle>
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
                  class
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
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

        {/* Interactive class hierarchy visual */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Class Hierarchy Diagram
          </p>
          <div className="rounded-xl border bg-muted/20 px-4 py-5 space-y-4">
            <div className="flex justify-center mb-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setHighlightInherited(!highlightInherited)}
              >
                {highlightInherited ? "Hide Inheritance" : "Show Inheritance"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Parent class */}
              <motion.div
                className="rounded-xl border-2 border-blue-500/50 bg-blue-500/5 overflow-hidden"
                animate={{ scale: highlightInherited ? 1.02 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-blue-500/20 px-3 py-2 text-center">
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-300 font-mono">
                    {parentClass.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Parent Class</p>
                </div>
                {/* Constructor */}
                <div className="px-3 py-2 border-t border-blue-500/20">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Constructor
                  </p>
                  <p className="text-xs font-mono text-amber-600 dark:text-amber-400">
                    {parentClass.constructor}
                  </p>
                </div>
                {/* Instance methods */}
                <div className="px-3 py-2 border-t border-blue-500/20">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Instance Methods
                  </p>
                  {parentClass.instanceMethods.map((m) => (
                    <p key={m} className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                      {m}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Child class */}
              <motion.div
                className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 overflow-hidden"
                animate={{ scale: highlightInherited ? 1.02 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-emerald-500/20 px-3 py-2 text-center">
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 font-mono">
                    {childClass.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    extends {parentClass.name}
                  </p>
                </div>
                {/* Constructor */}
                <div className="px-3 py-2 border-t border-emerald-500/20">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Constructor
                  </p>
                  <p className="text-xs font-mono text-amber-600 dark:text-amber-400">
                    {childClass.constructor}
                  </p>
                </div>
                {/* Instance methods */}
                <div className="px-3 py-2 border-t border-emerald-500/20">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Instance Methods
                  </p>
                  {childClass.instanceMethods.map((m) => (
                    <p
                      key={m}
                      className={`text-xs font-mono ${
                        m.includes("override")
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {m}
                    </p>
                  ))}
                </div>
                {/* Static methods */}
                <div className="px-3 py-2 border-t border-emerald-500/20">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Static Methods
                  </p>
                  {childClass.staticMethods.map((m) => (
                    <p key={m} className="text-xs font-mono text-violet-600 dark:text-violet-400">
                      {m}
                    </p>
                  ))}
                </div>
                {/* Inherited (conditionally highlighted) */}
                <AnimatePresence>
                  {highlightInherited && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-3 py-2 border-t border-emerald-500/20 bg-blue-500/10"
                    >
                      <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                        Inherited from {parentClass.name}
                      </p>
                      {childClass.inherited.map((m) => (
                        <p key={m} className="text-xs font-mono text-blue-600 dark:text-blue-400">
                          {m}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Arrow connector between classes */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono text-blue-600 dark:text-blue-400">{parentClass.name}</span>
              <span className="text-lg">&#x2190;</span>
              <span className="italic">extends</span>
              <span className="text-lg">&#x2190;</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">{childClass.name}</span>
            </div>

            {/* Color legend */}
            <div className="flex flex-wrap justify-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-500" />
                Constructor
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                Instance Method
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-violet-500" />
                Static Method
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-orange-500" />
                Overridden
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-blue-500" />
                Inherited
              </span>
            </div>
          </div>
        </div>

        {/* Comparison / Reference table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Class Features Reference
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Feature</span>
              <span>Syntax</span>
              <span>Description</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.feature}
                </code>
                <code className="font-mono text-[10px] text-violet-600 dark:text-violet-400">
                  {row.syntax}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.description}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
