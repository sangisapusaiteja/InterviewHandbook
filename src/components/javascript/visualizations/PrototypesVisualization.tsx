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
type ProtoTab = "whatIsPrototype" | "addingMethods" | "hasOwnProperty" | "objectCreate";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<ProtoTab, TabInfo> = {
  whatIsPrototype: {
    label: "What is Prototype?",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Every JavaScript object has a hidden [[Prototype]] link accessible via __proto__. Constructor functions have a .prototype property that becomes the __proto__ of instances created with new. This chain is how objects inherit properties and methods.",
    codeSnippet: `function Person(name) {
  this.name = name;
}

const alice = new Person("Alice");

console.log(alice.__proto__ === Person.prototype);
console.log(Person.prototype.constructor === Person);
console.log(alice.__proto__.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__);`,
    codeOutput: [
      "alice.__proto__ === Person.prototype => true",
      "Person.prototype.constructor === Person => true",
      "alice.__proto__.__proto__ === Object.prototype => true",
      "Object.prototype.__proto__ => null (end of chain)",
    ],
  },
  addingMethods: {
    label: "Adding Methods",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Methods added to a constructor&apos;s prototype are shared by all instances. This is memory-efficient because each instance does not get its own copy of the method -- they all reference the same function on the prototype.",
    codeSnippet: `function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}

Dog.prototype.bark = function() {
  return this.name + " says Woof!";
};

Dog.prototype.info = function() {
  return this.name + " is a " + this.breed;
};

const rex = new Dog("Rex", "Labrador");
const max = new Dog("Max", "Poodle");

console.log(rex.bark());
console.log(max.info());
console.log(rex.bark === max.bark);`,
    codeOutput: [
      'rex.bark() => "Rex says Woof!"',
      'max.info() => "Max is a Poodle"',
      "rex.bark === max.bark => true (shared method)",
    ],
  },
  hasOwnProperty: {
    label: "hasOwnProperty",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "hasOwnProperty() checks whether a property belongs directly to the object (own property) or is inherited from the prototype chain. This is essential when iterating over object properties with for...in, which also enumerates inherited enumerable properties.",
    codeSnippet: `function Car(make) {
  this.make = make;
}
Car.prototype.drive = function() {
  return "Driving " + this.make;
};

const tesla = new Car("Tesla");

console.log(tesla.hasOwnProperty("make"));
console.log(tesla.hasOwnProperty("drive"));
console.log("drive" in tesla);

for (const key in tesla) {
  const own = tesla.hasOwnProperty(key);
  console.log(key + (own ? " (own)" : " (inherited)"));
}`,
    codeOutput: [
      'tesla.hasOwnProperty("make") => true',
      'tesla.hasOwnProperty("drive") => false',
      '"drive" in tesla => true',
      "make (own)",
      "drive (inherited)",
    ],
  },
  objectCreate: {
    label: "Object.create",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Object.create() creates a new object with a specified prototype. This gives you fine-grained control over the prototype chain without using constructor functions. You can even create objects with no prototype using Object.create(null).",
    codeSnippet: `const animal = {
  type: "Animal",
  describe() {
    return this.name + " is a " + this.type;
  }
};

const cat = Object.create(animal);
cat.name = "Whiskers";
cat.type = "Cat";

console.log(cat.describe());
console.log(Object.getPrototypeOf(cat) === animal);

const bare = Object.create(null);
bare.key = "value";
console.log(bare.toString);
console.log(bare.key);`,
    codeOutput: [
      'cat.describe() => "Whiskers is a Cat"',
      "Object.getPrototypeOf(cat) === animal => true",
      "bare.toString => undefined (no prototype)",
      'bare.key => "value"',
    ],
  },
};

const order: ProtoTab[] = ["whatIsPrototype", "addingMethods", "hasOwnProperty", "objectCreate"];

// ─── Visual: Prototype Chain Lookup ──────────────────────────────────────────
function PrototypeChainVisual() {
  const [lookingUp, setLookingUp] = useState(false);
  const [step, setStep] = useState(0);

  const handleLookup = () => {
    if (lookingUp) return;
    setLookingUp(true);
    setStep(1);
    setTimeout(() => setStep(2), 800);
    setTimeout(() => setStep(3), 1600);
    setTimeout(() => {
      setLookingUp(false);
      setStep(0);
    }, 3500);
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Prototype chain lookup for alice.greet():
      </p>
      <Button size="sm" onClick={handleLookup} disabled={lookingUp}>
        <Play className="h-3.5 w-3.5 mr-1" /> Look up method
      </Button>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[220px] flex flex-col items-center gap-3">
        {/* Instance box */}
        <motion.div
          animate={{
            borderColor: step === 1 ? "rgb(239 68 68)" : "rgb(148 163 184)",
            scale: step === 1 ? 1.03 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="rounded-lg border-2 bg-blue-500/10 border-slate-400/40 p-3 w-full max-w-[280px]"
        >
          <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">alice (instance)</p>
          <p className="text-xs font-mono text-blue-700 dark:text-blue-300">
            name: <span className="font-bold">&quot;Alice&quot;</span>
            <Badge variant="secondary" className="ml-2 text-[9px] bg-blue-500/20 text-blue-700 dark:text-blue-300">own</Badge>
          </p>
          {step === 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-red-500 mt-1.5 font-semibold"
            >
              greet() not found here...
            </motion.p>
          )}
        </motion.div>

        {/* Arrow */}
        <motion.div
          animate={{
            color: step === 2 ? "rgb(234 179 8)" : "rgb(148 163 184)",
          }}
          className="text-lg font-bold text-slate-400"
        >
          <span className="text-[10px] font-mono font-normal mr-1">__proto__</span> ↓
        </motion.div>

        {/* Prototype box */}
        <motion.div
          animate={{
            borderColor: step === 2 ? "rgb(234 179 8)" : step === 3 ? "rgb(34 197 94)" : "rgb(148 163 184)",
            scale: step === 2 || step === 3 ? 1.03 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="rounded-lg border-2 bg-emerald-500/10 border-slate-400/40 p-3 w-full max-w-[280px]"
        >
          <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Person.prototype</p>
          <p className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
            constructor: <span className="font-bold">Person</span>
          </p>
          <motion.p
            animate={{
              backgroundColor: step === 3 ? "rgb(34 197 94 / 0.2)" : "transparent",
            }}
            className="text-xs font-mono text-emerald-700 dark:text-emerald-300 rounded px-1 -mx-1"
          >
            greet: <span className="font-bold">function()</span>
            {step === 3 && (
              <Badge variant="secondary" className="ml-2 text-[9px] bg-green-500/20 text-green-700 dark:text-green-300">
                found!
              </Badge>
            )}
          </motion.p>
          {step === 2 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-yellow-600 dark:text-yellow-400 mt-1.5 font-semibold"
            >
              Searching prototype...
            </motion.p>
          )}
        </motion.div>

        {/* Arrow to Object.prototype */}
        <div className="text-lg font-bold text-slate-400">
          <span className="text-[10px] font-mono font-normal mr-1">__proto__</span> ↓
        </div>

        {/* Object.prototype box */}
        <motion.div className="rounded-lg border bg-muted/30 border-slate-400/30 p-2 w-full max-w-[280px]">
          <p className="text-[10px] font-semibold text-muted-foreground">Object.prototype</p>
          <p className="text-[10px] font-mono text-muted-foreground">toString(), hasOwnProperty(), ...</p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Visual: Adding Methods ──────────────────────────────────────────────────
function AddingMethodsVisual() {
  const [added, setAdded] = useState(false);

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Shared prototype methods vs instance properties:
      </p>
      <Button size="sm" onClick={() => setAdded(!added)}>
        <Play className="h-3.5 w-3.5 mr-1" /> {added ? "Reset" : "Add Methods to Prototype"}
      </Button>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[180px]">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* rex instance */}
          <div className="rounded-lg border bg-emerald-500/10 border-emerald-400/30 p-3">
            <p className="text-[10px] font-semibold text-muted-foreground mb-1">rex</p>
            <p className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
              name: <span className="font-bold">&quot;Rex&quot;</span>
            </p>
            <p className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
              breed: <span className="font-bold">&quot;Labrador&quot;</span>
            </p>
          </div>

          {/* max instance */}
          <div className="rounded-lg border bg-emerald-500/10 border-emerald-400/30 p-3">
            <p className="text-[10px] font-semibold text-muted-foreground mb-1">max</p>
            <p className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
              name: <span className="font-bold">&quot;Max&quot;</span>
            </p>
            <p className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
              breed: <span className="font-bold">&quot;Poodle&quot;</span>
            </p>
          </div>
        </div>

        {added && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground text-lg mb-2"
            >
              ↓ <span className="text-xs font-mono">both share __proto__</span> ↓
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="rounded-lg border bg-emerald-500/20 border-emerald-400/40 p-3"
            >
              <p className="text-[10px] font-semibold text-muted-foreground mb-1">Dog.prototype (shared)</p>
              <p className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
                bark: <span className="font-bold">function()</span>
              </p>
              <p className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
                info: <span className="font-bold">function()</span>
              </p>
              <Badge variant="secondary" className="mt-1.5 text-[9px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                1 copy in memory, shared by all instances
              </Badge>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Visual: hasOwnProperty ──────────────────────────────────────────────────
function HasOwnPropertyVisual() {
  const [selectedProp, setSelectedProp] = useState<string | null>(null);

  const props = [
    { name: "make", own: true },
    { name: "drive", own: false },
    { name: "toString", own: false },
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Click a property to check if it is own or inherited:
      </p>
      <div className="flex gap-2">
        {props.map((p) => (
          <button
            key={p.name}
            onClick={() => setSelectedProp(p.name)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              selectedProp === p.name
                ? "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[140px]">
        {selectedProp ? (
          <div className="space-y-3">
            {(() => {
              const prop = props.find((p) => p.name === selectedProp);
              if (!prop) return null;
              return (
                <>
                  <motion.div
                    key={selectedProp}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <p className="text-xs font-mono text-violet-700 dark:text-violet-300">
                      tesla.hasOwnProperty(&quot;{prop.name}&quot;)
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${
                          prop.own
                            ? "bg-green-500/20 text-green-700 dark:text-green-300"
                            : "bg-red-500/20 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {prop.own ? "true (own property)" : "false (inherited)"}
                      </Badge>
                    </div>
                    <div className={`rounded-lg border p-3 mt-2 ${
                      prop.own
                        ? "bg-green-500/10 border-green-400/30"
                        : "bg-violet-500/10 border-violet-400/30"
                    }`}>
                      <p className="text-[10px] font-semibold text-muted-foreground mb-1">
                        {prop.own ? "Found on: tesla (instance)" : prop.name === "drive" ? "Found on: Car.prototype" : "Found on: Object.prototype"}
                      </p>
                      <p className="text-xs font-mono text-violet-700 dark:text-violet-300">
                        {prop.name}: <span className="font-bold">{prop.name === "make" ? '"Tesla"' : "function()"}</span>
                      </p>
                    </div>
                  </motion.div>
                </>
              );
            })()}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Select a property above to check ownership
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: Object.create ───────────────────────────────────────────────────
function ObjectCreateVisual() {
  const [created, setCreated] = useState(false);

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Creating objects with custom prototypes:
      </p>
      <Button size="sm" onClick={() => setCreated(!created)}>
        <Play className="h-3.5 w-3.5 mr-1" /> {created ? "Reset" : "Run Object.create()"}
      </Button>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[160px]">
        {/* animal prototype */}
        <div className="rounded-lg border bg-orange-500/10 border-orange-400/30 p-3 mb-3">
          <p className="text-[10px] font-semibold text-muted-foreground mb-1">animal (prototype object)</p>
          <p className="text-xs font-mono text-orange-700 dark:text-orange-300">
            type: <span className="font-bold">&quot;Animal&quot;</span>
          </p>
          <p className="text-xs font-mono text-orange-700 dark:text-orange-300">
            describe: <span className="font-bold">function()</span>
          </p>
        </div>

        {created && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground text-lg mb-2"
            >
              ↑ <span className="text-xs font-mono">Object.create(animal)</span>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="rounded-lg border bg-orange-500/20 border-orange-400/40 p-3"
            >
              <p className="text-[10px] font-semibold text-muted-foreground mb-1">cat (created with Object.create)</p>
              <p className="text-xs font-mono text-orange-700 dark:text-orange-300">
                name: <span className="font-bold">&quot;Whiskers&quot;</span>
                <Badge variant="secondary" className="ml-2 text-[9px] bg-orange-500/20 text-orange-700 dark:text-orange-300">own</Badge>
              </p>
              <p className="text-xs font-mono text-orange-700 dark:text-orange-300">
                type: <span className="font-bold">&quot;Cat&quot;</span>
                <Badge variant="secondary" className="ml-2 text-[9px] bg-orange-500/20 text-orange-700 dark:text-orange-300">own (shadows)</Badge>
              </p>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                describe: <span className="italic">inherited from animal</span>
              </p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Reference Table ─────────────────────────────────────────────────────────
const referenceData = [
  {
    concept: "__proto__",
    description: "Hidden link to the prototype of an object",
    example: "obj.__proto__ === Constructor.prototype",
  },
  {
    concept: ".prototype",
    description: "Property on constructor functions that becomes __proto__ of instances",
    example: "Person.prototype.greet = function() {}",
  },
  {
    concept: "Object.create()",
    description: "Creates object with a specified prototype",
    example: "Object.create(proto)",
  },
  {
    concept: "hasOwnProperty()",
    description: "Checks if property is directly on the object",
    example: 'obj.hasOwnProperty("key")',
  },
  {
    concept: "Object.getPrototypeOf()",
    description: "Returns the prototype of an object",
    example: "Object.getPrototypeOf(obj)",
  },
  {
    concept: "instanceof",
    description: "Checks if prototype appears in the chain",
    example: "obj instanceof Constructor",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function PrototypesVisualization() {
  const [selected, setSelected] = useState<ProtoTab>("whatIsPrototype");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: ProtoTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Prototypes</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = tabs[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? t.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${tab.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{tab.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${tab.badgeColor}`}>
                  prototype
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                {selected === "whatIsPrototype" && <PrototypeChainVisual />}
                {selected === "addingMethods" && <AddingMethodsVisual />}
                {selected === "hasOwnProperty" && <HasOwnPropertyVisual />}
                {selected === "objectCreate" && <ObjectCreateVisual />}
              </div>

              {/* Right: Code + Output */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {tab.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(tab.codeOutput)}>
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

        {/* Reference Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold">Key Prototype Concepts</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Concept</th>
                  <th className="px-3 py-2 text-left font-semibold">Description</th>
                  <th className="px-3 py-2 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                {referenceData.map((row) => (
                  <tr key={row.concept} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-2 font-semibold font-mono">{row.concept}</td>
                    <td className="px-3 py-2">{row.description}</td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{row.example}</td>
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
