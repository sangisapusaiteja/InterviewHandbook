import type { TechnicalTopic, TechnicalModule } from "@/types/technical";

export const technicalModules: TechnicalModule[] = [
  // ── JavaScript Topics ──
  {
    id: "js-variables-scope",
    level: 1,
    title: "Variables & Scope",
    difficulty: "Beginner",
    description:
      "var, let, const, global scope, function scope, block scope, TDZ, hoisting.",
    topicIds: ["var-let-const", "hoisting"],
    category: "JavaScript",
  },
  {
    id: "js-functions",
    level: 2,
    title: "Functions",
    difficulty: "Beginner",
    description:
      "Functions, callback functions, closures, higher order functions.",
    topicIds: ["closures", "callbacks"],
    category: "JavaScript",
  },
  {
    id: "js-async",
    level: 3,
    title: "Asynchronous JavaScript",
    difficulty: "Intermediate",
    description:
      "Synchronous vs asynchronous, event loop, call stack, promises, promise states, async/await.",
    topicIds: ["promises-async-await"],
    category: "JavaScript",
  },
  {
    id: "js-array-methods",
    level: 4,
    title: "Array Methods",
    difficulty: "Beginner",
    description:
      "map, filter, reduce, forEach, find, some, every.",
    topicIds: ["array-methods"],
    category: "JavaScript",
  },
  {
    id: "js-objects",
    level: 5,
    title: "Objects",
    difficulty: "Beginner",
    description:
      "Dot notation, bracket notation, dynamic keys.",
    topicIds: ["dot-vs-bracket"],
    category: "JavaScript",
  },
  {
    id: "js-performance",
    level: 7,
    title: "Performance",
    difficulty: "Intermediate",
    description:
      "Debouncing, throttling, and performance optimization techniques.",
    topicIds: ["debouncing-throttling"],
    category: "JavaScript",
  },
  // ── Next.js Topics ──
  {
    id: "nextjs-rendering",
    level: 11,
    title: "Rendering & Components",
    difficulty: "Intermediate",
    description:
      "CSR, SSR, SSG, Client Components, Server Components, use client, hydration.",
    topicIds: ["nextjs-basics"],
    category: "Next.js",
  },
  {
    id: "nextjs-routing",
    level: 12,
    title: "Navigation & Routing",
    difficulty: "Intermediate",
    description:
      "useRouter, push, replace, back, refresh, dynamic routes, useParams, useSearchParams.",
    topicIds: ["nextjs-routing"],
    category: "Next.js",
  },
  // ── TypeScript Topics ──
  {
    id: "ts-utility-types",
    level: 14,
    title: "Utility Types",
    difficulty: "Intermediate",
    description:
      "Partial, Pick, Omit, Record, keyof, typeof.",
    topicIds: ["ts-utility-types"],
    category: "TypeScript",
  },
];

export const technicalTopics: TechnicalTopic[] = [
  {
    id: "var-let-const",
    title: "var, let, const",
    slug: "var-let-const",
    icon: "Boxes",
    difficulty: "Beginner",
    description:
      "Understand the differences between var, let, and const declarations in JavaScript — scoping, hoisting, and reassignment rules.",
    concept: {
      explanation:
        "JavaScript provides three keywords to declare variables: var, let, and const.\n\nAbout var:\nvar is function-scoped — it is accessible anywhere inside the function it is declared in, even outside blocks like if or for. var is hoisted to the top of its function with an initial value of undefined, so you can access it before the declaration line (though it will be undefined). var can be redeclared and reassigned freely.\n\nExample:\nif (true) { var x = 10; }\nconsole.log(x); // 10 — accessible outside the block\n\nvar y = 1;\nvar y = 2; // redeclaration allowed\nconsole.log(y); // 2\n\nAbout let:\nlet is block-scoped — it only exists inside the nearest { } block. let is hoisted but not initialised (Temporal Dead Zone), so accessing it before the declaration throws a ReferenceError. let can be reassigned but cannot be redeclared in the same scope.\n\nExample:\nif (true) { let z = 20; }\n// console.log(z); // ReferenceError: z is not defined\n\nlet a = 1;\na = 2; // reassignment allowed\n// let a = 3; // SyntaxError: already declared\n\nAbout const:\nconst is block-scoped like let. const must be initialised at declaration and cannot be reassigned. However, if the value is an object or array, its contents can still be modified (const prevents reassignment of the binding, not mutation of the value).\n\nExample:\nconst PI = 3.14;\n// PI = 4; // TypeError: cannot reassign\n\nconst user = { name: \"Alice\" };\nuser.name = \"Bob\"; // allowed — mutating the object\n// user = {}; // TypeError: cannot reassign\n\nIn modern JavaScript, use const by default, let only when reassignment is needed, and avoid var entirely.",
      realLifeAnalogy:
        "Think of var like a sticky note on a fridge — anyone in the kitchen (function) can see it and change it, even if you put it there before they entered. let is like a note inside a closed lunchbox (block) — only visible when the lunchbox is open, and you cannot have two notes with the same name inside. const is like a name tag on a trophy — once engraved, you cannot change the name, but you can still polish or move the trophy (modify its contents).",
      keyPoints: [
        "var is function-scoped; let and const are block-scoped",
        "var is hoisted with value undefined; let/const are hoisted but in the Temporal Dead Zone",
        "var can be redeclared; let and const cannot be redeclared in the same scope",
        "const must be initialised at declaration and cannot be reassigned",
        "const prevents reassignment of the binding, not mutation of the value",
        "Use const by default; switch to let only when reassignment is needed",
        "Avoid var in modern JavaScript code",
      ],
    },
    code: {
      language: "javascript",
      files: [
        {
          name: "var.js",
          language: "javascript",
          content: `// ── var (function-scoped) ──────────────────
// var ignores block scope — accessible outside if/for blocks
if (true) {
  var a = 10;
}
console.log(a); // 10

// var can be redeclared in the same scope
var x = 1;
var x = 2; // no error
console.log(x); // 2`,
        },
        {
          name: "let.js",
          language: "javascript",
          content: `// ── let (block-scoped) ────────────────────
// let is only accessible inside the block { }
if (true) {
  let b = 20;
}
// console.log(b); // ReferenceError: b is not defined

// let can be reassigned but NOT redeclared
let y = 1;
y = 2; // allowed
// let y = 3; // SyntaxError: Identifier 'y' has already been declared`,
        },
        {
          name: "const.js",
          language: "javascript",
          content: `// ── const (block-scoped, cannot reassign) ──
const PI = 3.14;
// PI = 4; // TypeError: Assignment to constant variable
// const GRAVITY; // SyntaxError: Missing initializer in const declaration

// const object — contents CAN be modified
const user = { name: "Alice" };
user.name = "Bob"; // allowed
// user = {}; // TypeError: Assignment to constant variable`,
        },
      ],
      defaultCode: `// ===== var, let, const =====

// ── var (function-scoped) ──────────────────
if (true) {
  var a = 10;
}
console.log(a); // 10

var x = 1;
var x = 2;
console.log(x); // 2

// ── let (block-scoped) ────────────────────
if (true) {
  let b = 20;
}

let y = 1;
y = 2;

// ── const (block-scoped, cannot reassign) ──
const PI = 3.14;

const user = { name: "Alice" };
user.name = "Bob";

// ── Best practice ──────────────────────────
const name = "Interview Handbook";
let count = 0;
count += 1;
console.log(name, count);
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between var, let, and const?",
        difficulty: "Easy",
        hint: "var is function scoped, while let and const are block scoped. var can be redeclared and reassigned. let can be reassigned but cannot be redeclared in the same scope. const cannot be reassigned after initialization. In modern JavaScript, we mostly use const, and use let only when the value needs to change.",
      },
    ],
  },
  {
    id: "hoisting",
    title: "Hoisting",
    slug: "hoisting",
    icon: "ArrowUpDown",
    difficulty: "Beginner",
    description:
      "Understand how JavaScript hoists declarations — and why var, let, and const behave differently before their declaration line.",
    concept: {
      explanation:
        "About var hoisting:\n\n```\nconsole.log(a);\nvar a = 10;\n```\n\nOutput: undefined\n\nWhy? JavaScript internally treats it like this:\n\n```\nvar a;          // declaration is hoisted\nconsole.log(a); // undefined\na = 10;         // assignment stays in place\n```\n\nOnly the declaration moves to the top. The assignment does not move.\n\nAbout let hoisting:\n\n```\nconsole.log(a);\nlet a = 10;\n```\n\nOutput: ReferenceError: Cannot access 'a' before initialization\n\nWhy? Both var and let are hoisted. The difference is:\n\nvar → hoisted and initialized with undefined\nlet → hoisted but NOT initialized\n\nThe period between the start of the scope and the declaration line is called the Temporal Dead Zone (TDZ). The variable exists, but JavaScript does not allow you to access it.\n\nImportant: Hoisting happens for var, let, and const. The difference is that var gets initialized with undefined, while let and const stay uninitialized (in the TDZ) until their declaration line is executed.\n\nAbout function scope + hoisting:\n\n```\nvar a = 10;\nfunction test() {\n  console.log(a);\n  var a = 20;\n}\ntest();\n```\n\nOutput: undefined\n\nWhy? Inside the function, var a is hoisted. JavaScript sees:\n\n```\nfunction test() {\n  var a;          // hoisted inside the function\n  console.log(a); // undefined\n  a = 20;\n}\n```\n\nThe local variable a shadows (hides) the global a. JavaScript always looks in the nearest scope first.\n\nCompare:\n\n```\nvar a = 10;\nfunction test() {\n  console.log(a);\n}\ntest();\n```\n\nOutput: 10 — because there is no local a, so JavaScript looks up the scope chain and finds the global a.\n\nQuick table:\n\nVariable | Hoisted | Initial Value | Access Before Declaration\n--- | --- | --- | ---\nvar      | Yes     | undefined      | Allowed\nlet      | Yes     | Uninitialized  | Error (TDZ)\nconst    | Yes     | Uninitialized  | Error (TDZ)",
      realLifeAnalogy:
        "Think of hoisting like a building elevator. var is like a package that is already placed on the ground floor (undefined) before you arrive — you can grab it anytime. let and const are like packages that exist in the building but are locked in a room on the 5th floor — you cannot touch them until the elevator reaches that floor (the declaration line). The Temporal Dead Zone is the ride up — the package exists but is not accessible yet.",
      keyPoints: [
        "Hoisting moves declarations, not assignments, to the top of their scope",
        "var is hoisted and initialized with undefined",
        "let and const are hoisted but NOT initialized — they stay in the Temporal Dead Zone",
        "Accessing let/const before declaration throws ReferenceError",
        "Inside a function, a local var shadows the global variable",
        "JavaScript looks up the scope chain when a variable is not found locally",
        "The TDZ ends when the declaration line is executed",
      ],
    },
    code: {
      language: "javascript",
      files: [
        {
          name: "var-hoisting.js",
          language: "javascript",
          content: `// Question: What will be the output?
console.log(a);
var a = 10;

// Output: undefined
// Why? JavaScript sees this:
// var a;          // declaration hoisted
// console.log(a); // undefined
// a = 10;         // assignment stays`,
        },
        {
          name: "let-hoisting.js",
          language: "javascript",
          content: `// Question: What will be the output?
console.log(a);
let a = 10;

// Output: ReferenceError: Cannot access 'a' before initialization
// Why? let is hoisted but stays in the Temporal Dead Zone
// until the declaration line is reached.`,
        },
        {
          name: "function-scope.js",
          language: "javascript",
          content: `// Question: What will be the output?
var a = 10;

function test() {
  console.log(a);
  var a = 20;
}

test();

// Output: undefined
// Why? Inside test(), var a is hoisted locally.
// The local a shadows the global a.
// JavaScript sees:
// function test() {
//   var a;          // hoisted, value = undefined
//   console.log(a); // undefined
//   a = 20;
// }`,
        },
      ],
      defaultCode: `// ===== Hoisting Examples =====

// 1. var hoisting
console.log(a);
var a = 10;

// 2. let hoisting (TDZ)
// console.log(b);
// let b = 10;

// 3. Function scope + hoisting
var x = 10;
function test() {
  console.log(x);
  var x = 20;
}
test();
`,
    },
    interviewQuestions: [
      {
        question: "What will be the output? console.log(a); var a = 10;",
        difficulty: "Easy",
        hint: "undefined. var declarations are hoisted to the top and initialized with undefined. The assignment a = 10 stays in place. JavaScript sees: var a; console.log(a); a = 10;",
      },
      {
        question: "What will be the output? console.log(a); let a = 10;",
        difficulty: "Easy",
        hint: "ReferenceError: Cannot access 'a' before initialization. let is hoisted but stays in the Temporal Dead Zone until the declaration line is executed.",
      },
      {
        question: "Does hoisting happen with let and const?",
        difficulty: "Medium",
        hint: "Yes. Many candidates say no, but the correct answer is yes — let and const are hoisted. The difference is they stay in the Temporal Dead Zone (uninitialized) until their declaration line, unlike var which is initialized with undefined.",
      },
      {
        question: "What will be the output? var a = 10; function test() { console.log(a); var a = 20; } test();",
        difficulty: "Medium",
        hint: "undefined. Inside the function, var a is hoisted locally and shadows the global a. JavaScript sees: var a; console.log(a); a = 20; — so it prints undefined, not 10.",
      },
      {
        question: "What will be the output? var a = 10; function test() { console.log(a); } test();",
        difficulty: "Easy",
        hint: "10. The function has no local variable a, so JavaScript looks up the scope chain and finds the global a = 10.",
      },
    ],
  },
  {
    id: "closures",
    title: "Closures",
    slug: "closures",
    icon: "Lock",
    difficulty: "Intermediate",
    description:
      "Understand closures — how inner functions remember variables from their outer scope even after the outer function has finished executing.",
    concept: {
      explanation:
        "About closures — simple definition:\n\nA closure is created when an inner function can access variables from its outer function even after the outer function has finished executing.\n\n```\nfunction outer() {\n  let count = 10;\n\n  function inner() {\n    console.log(count);\n  }\n\n  return inner;\n}\n\nconst fn = outer();\nfn(); // 10\n```\n\nWhy is this special? Normally when a function finishes, its local variables disappear. But in a closure, the inner function remembers the outer variables.\n\nAbout closure counter:\n\n```\nfunction outer() {\n  let count = 0;\n\n  return function inner() {\n    count++;\n    console.log(count);\n  };\n}\n\nconst counter = outer();\n\ncounter(); // 1\ncounter(); // 2\ncounter(); // 3\n```\n\nWhy? outer() runs only once, creating count = 0. The returned inner function remembers count via closure. Each call to counter() increments the same count.\n\nImportant difference:\n\n```\n// outer() runs ONCE — closure preserves count\nconst counter = outer();\ncounter(); // 1\ncounter(); // 2\ncounter(); // 3\n\n// outer() runs EACH TIME — new count every time\nouter()(); // 1\nouter()(); // 1\nouter()(); // 1\n```\n\nAbout the classic setTimeout + var trap:\n\n```\nfor (var i = 1; i <= 3; i++) {\n  setTimeout(() => {\n    console.log(i);\n  }, 1000);\n}\n// Output: 4 4 4\n```\n\nWhy? var is function-scoped. All callbacks share the same i. By the time they execute, the loop has finished and i = 4.\n\nFix with let:\n\n```\nfor (let i = 1; i <= 3; i++) {\n  setTimeout(() => {\n    console.log(i);\n  }, 1000);\n}\n// Output: 1 2 3\n```\n\nWhy? let is block-scoped — each iteration gets its own i.",
      realLifeAnalogy:
        "Think of a closure like a backpack. When you create a function inside another function, the inner function packs a backpack with all the outer variables it needs. Even after the outer function finishes and leaves, the inner function still carries its backpack with those variables inside.",
      keyPoints: [
        "A closure is created when an inner function accesses variables from its outer scope after the outer function has finished",
        "The inner function 'remembers' the outer variables — this remembered environment is the closure",
        "Closures are used in counters, private variables, event handlers, React hooks, and callbacks",
        "With var in a loop, all callbacks share the same variable — output is 4 4 4",
        "With let in a loop, each iteration gets its own variable — output is 1 2 3",
        "outer()() calls outer each time, creating a new closure each time",
        "const counter = outer(); calls outer once — all counter() calls share the same closure",
      ],
    },
    code: {
      language: "javascript",
      files: [
        {
          name: "basic-closure.js",
          language: "javascript",
          content: `// Basic closure example
function outer() {
  let count = 10;

  function inner() {
    console.log(count);
  }

  return inner;
}

const fn = outer();
fn(); // 10 — count is remembered via closure`,
        },
        {
          name: "counter-closure.js",
          language: "javascript",
          content: `// Closure counter — outer() runs ONCE
function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();

counter(); // 1
counter(); // 2
counter(); // 3

// Each call increments the SAME count`,
        },
        {
          name: "counter-vs-fresh.js",
          language: "javascript",
          content: `// Compare: one closure vs fresh each time

// outer() runs ONCE — shared closure
function outer() {
  let count = 0;
  return function () { count++; console.log(count); };
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3

// outer() runs EACH TIME — new count each time
outer()(); // 1
outer()(); // 1
outer()(); // 1`,
        },
        {
          name: "settimeout-trap.js",
          language: "javascript",
          content: `// Classic interview trap — var vs let in loops

// With var — all share the same i
for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log('var:', i);
  }, 1000);
}
// Output: var: 4, var: 4, var: 4

// With let — each iteration gets its own i
for (let j = 1; j <= 3; j++) {
  setTimeout(() => {
    console.log('let:', j);
  }, 1000);
}
// Output: let: 1, let: 2, let: 3`,
        },
      ],
      defaultCode: `// ===== Closures =====

// 1. Basic closure
function outer() {
  let count = 10;
  return function inner() {
    console.log(count);
  };
}
const fn = outer();
fn();

// 2. Counter closure
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}
const counter = makeCounter();
counter();
counter();
counter();
`,
    },
    interviewQuestions: [
      {
        question: "What is a closure?",
        difficulty: "Easy",
        hint: "A closure is created when an inner function can access variables from its outer function even after the outer function has finished executing. The inner function 'remembers' the outer variables — this remembered environment is called a closure.",
      },
      {
        question: "What will be the output? function outer() { let count = 0; return function() { count++; console.log(count); }; } const c = outer(); c(); c(); c();",
        difficulty: "Medium",
        hint: "1, 2, 3. outer() runs only once creating count = 0. The returned function remembers count via closure. Each call increments the same count.",
      },
      {
        question: "What will be the output? function outer() { let count = 0; return function() { count++; console.log(count); }; } outer()(); outer()(); outer()();",
        difficulty: "Medium",
        hint: "1, 1, 1. outer() runs each time, creating a new count = 0 each time. Each call gets its own fresh closure.",
      },
      {
        question: "What will be the output? for (var i = 1; i <= 3; i++) { setTimeout(() => console.log(i), 1000); }",
        difficulty: "Hard",
        hint: "4, 4, 4. var is function-scoped — all callbacks share the same i. By the time they execute, the loop has finished and i = 4.",
      },
      {
        question: "What will be the output? for (let i = 1; i <= 3; i++) { setTimeout(() => console.log(i), 1000); }",
        difficulty: "Medium",
        hint: "1, 2, 3. let is block-scoped — each iteration creates a new i variable. Each callback gets its own i.",
      },
    ],
  },
  {
    id: "callbacks",
    title: "Callbacks & Event Loop",
    slug: "callbacks",
    icon: "RefreshCw",
    difficulty: "Intermediate",
    description:
      "Understand callback functions, how setTimeout works, and the JavaScript event loop — a core concept for interviews.",
    concept: {
      explanation:
        "About callbacks — simple definition:\n\nA callback function is a function that is passed as an argument to another function and is executed later.\n\n```\nfunction greet(name, callback) {\n  console.log(\"Hello \" + name);\n  callback();\n}\n\nfunction sayBye() {\n  console.log(\"Bye\");\n}\n\ngreet(\"Sai\", sayBye);\n// Output:\n// Hello Sai\n// Bye\n```\n\nHere, sayBye is passed as a callback. Inside greet, callback() becomes sayBye().\n\nReact example:\n\n```\nfunction Parent() {\n  function handleClick() {\n    console.log(\"Clicked\");\n  }\n\n  return <Child onClick={handleClick} />;\n}\n```\n\nonClick={handleClick} — handleClick is a callback function passed as a prop.\n\nAbout setTimeout + Event Loop:\n\n```\nconsole.log(\"Start\");\n\nsetTimeout(() => {\n  console.log(\"Timeout\");\n}, 0);\n\nconsole.log(\"End\");\n```\n\nOutput:\n\nStart\nEnd\nTimeout\n\nWhy? setTimeout(fn, 0) does NOT mean execute immediately. It means: execute as soon as the call stack becomes empty.\n\nStep 1: console.log(\"Start\") runs → Output: Start\nStep 2: setTimeout(..., 0) — the callback is put aside in the Web APIs / callback queue\nStep 3: console.log(\"End\") runs → Output: End\nStep 4: Main code finishes. Call stack is empty. Event loop moves the callback into the call stack → Output: Timeout\n\nAbout multiple timers:\n\n```\nconsole.log(1);\n\nsetTimeout(() => {\n  console.log(2);\n}, 1000);\n\nsetTimeout(() => {\n  console.log(3);\n}, 0);\n\nconsole.log(4);\n```\n\nOutput:\n\n1\n4\n3\n2\n\nWhy? Synchronous code (1, 4) runs first. Then the 0ms timer (3) executes. After 1 second, the 1000ms timer (2) executes.\n\nImportant rule: setTimeout(fn, 0) means run after the current code finishes, not immediately.",
      realLifeAnalogy:
        "Think of JavaScript like a single waiter at a restaurant. The waiter takes orders (synchronous code) one at a time. When a customer says 'I'll decide later' (setTimeout), the waiter notes it and continues serving other customers. Only after all current orders are taken does the waiter come back to the 'decide later' customer — even if they said 'I'll decide in 0 seconds'.",
      keyPoints: [
        "A callback is a function passed as an argument to another function and executed later",
        "setTimeout(fn, 0) does NOT execute immediately — it waits for the call stack to be empty",
        "Synchronous code always runs before asynchronous callbacks",
        "The event loop moves callbacks from the queue to the call stack only when the stack is empty",
        "Smaller delay timers execute before larger delay timers",
        "React uses callbacks everywhere — onClick, onChange, useEffect, etc.",
        "Callbacks are the foundation of asynchronous JavaScript",
      ],
    },
    code: {
      language: "javascript",
      files: [
        {
          name: "basic-callback.js",
          language: "javascript",
          content: `// Basic callback example
function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

function sayBye() {
  console.log("Bye");
}

greet("Sai", sayBye);
// Output:
// Hello Sai
// Bye`,
        },
        {
          name: "settimeout-0.js",
          language: "javascript",
          content: `// setTimeout with 0ms — classic interview question
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");

// Output:
// Start
// End
// Timeout
// Why? setTimeout(0) waits for call stack to be empty`,
        },
        {
          name: "multiple-timers.js",
          language: "javascript",
          content: `// Multiple timers — event loop order
console.log(1);

setTimeout(() => {
  console.log(2);
}, 1000);

setTimeout(() => {
  console.log(3);
}, 0);

console.log(4);

// Output:
// 1
// 4
// 3
// 2
// Synchronous first, then 0ms timer, then 1000ms timer`,
        },
        {
          name: "event-loop-quiz.js",
          language: "javascript",
          content: `// Quick event loop quiz
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
console.log("D");

// What will be the output?
// A, C, D, B
// Synchronous code runs first (A, C, D)
// Then the 0ms callback (B)`,
        },
      ],
      defaultCode: `// ===== Callbacks & Event Loop =====

// 1. Basic callback
function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}
function sayBye() {
  console.log("Bye");
}
greet("Sai", sayBye);

// 2. setTimeout with 0ms
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
console.log("End");
`,
    },
    interviewQuestions: [
      {
        question: "What is a callback function?",
        difficulty: "Easy",
        hint: "A callback function is a function that is passed as an argument to another function and is executed later. For example, in React, onClick={handleClick} passes handleClick as a callback.",
      },
      {
        question: "What will be the output? console.log('Start'); setTimeout(() => console.log('Timeout'), 0); console.log('End');",
        difficulty: "Medium",
        hint: "Start, End, Timeout. setTimeout(fn, 0) does not execute immediately. The callback waits until the call stack becomes empty. Synchronous code runs first.",
      },
      {
        question: "What will be the output? console.log(1); setTimeout(() => console.log(2), 1000); setTimeout(() => console.log(3), 0); console.log(4);",
        difficulty: "Medium",
        hint: "1, 4, 3, 2. Synchronous code (1, 4) runs first. Then the 0ms timer (3). After 1 second, the 1000ms timer (2).",
      },
      {
        question: "Does setTimeout(fn, 0) execute immediately?",
        difficulty: "Easy",
        hint: "No. setTimeout(fn, 0) means execute as soon as the call stack becomes empty. All synchronous code must finish first before the callback runs.",
      },
      {
        question: "What is the event loop?",
        difficulty: "Medium",
        hint: "The event loop is a mechanism that continuously checks if the call stack is empty. When it is, it moves callbacks from the callback queue into the call stack for execution. This is how JavaScript handles asynchronous operations despite being single-threaded.",
      },
    ],
  },
  {
    id: "promises-async-await",
    title: "Promises & Async/Await",
    slug: "promises-async-await",
    icon: "Zap",
    difficulty: "Intermediate",
    description:
      "Understand Promises, async/await, and how JavaScript handles asynchronous operations — essential for React interviews.",
    concept: {
      explanation:
        "About Promises — what and why:\n\nA Promise is an object that represents the eventual completion or failure of an asynchronous operation. It promises to give either a success value or an error value in the future.\n\nWhy do we need Promises? Operations like API calls, database queries, and timers take time. JavaScript cannot block the main thread while waiting, so it returns a Promise immediately and resolves it later.\n\n```\nconst promise = new Promise((resolve, reject) => {\n  const success = true;\n\n  if (success) {\n    resolve(\"Data received\");\n  } else {\n    reject(\"Something went wrong\");\n  }\n});\n\npromise\n  .then((data) => console.log(data))\n  .catch((error) => console.log(error));\n```\n\nAbout Promise states:\n\nA Promise has three states:\n- Pending — the operation is still running\n- Fulfilled (Resolved) — the operation succeeded, data is returned\n- Rejected — the operation failed, an error is returned\n\nAbout Promises vs Callbacks:\n\nBefore Promises, nested callbacks created \"Callback Hell\":\n\n```\ngetUser(function(user) {\n  getOrders(user, function(orders) {\n    getPayment(orders, function(payment) {\n      // ...\n    });\n  });\n});\n```\n\nPromises made it cleaner:\n\n```\ngetUser()\n  .then(getOrders)\n  .then(getPayment)\n  .catch(handleError);\n```\n\nAbout async/await:\n\nasync/await is syntactic sugar over Promises. It makes asynchronous code look synchronous and is easier to read.\n\n```\n// Promise style\nfetchUsers()\n  .then((users) => console.log(users))\n  .catch((error) => console.log(error));\n\n// async/await style\nasync function getUsers() {\n  const users = await fetchUsers();\n  console.log(users);\n}\n```\n\nImportant: An async function always returns a Promise, even if you return a normal value.\n\n```\nasync function test() {\n  return 10;\n}\n\nconsole.log(test()); // Promise { 10 }\n\nasync function run() {\n  const result = await test();\n  console.log(result); // 10\n}\n```\n\nYou cannot use await without async — the function must be marked async.",
      realLifeAnalogy:
        "Think of a Promise like ordering food online. You place the order (start an async operation). The restaurant says 'We'll deliver your food' (Promise). Three possibilities: waiting for the food (Pending), food arrives (Fulfilled), or restaurant cancels (Rejected). async/await is like using a food tracker that lets you wait for the delivery without constantly checking — you just await the delivery and then eat.",
      keyPoints: [
        "A Promise represents the future result of an asynchronous operation",
        "Three states: Pending, Fulfilled (Resolved), Rejected",
        "Promises solve Callback Hell by providing a cleaner chain with .then() and .catch()",
        "async/await is syntactic sugar over Promises — makes async code look synchronous",
        "An async function always returns a Promise, even for normal values",
        "await can only be used inside an async function",
        "In React, Promises are most commonly used with fetch() for API calls",
      ],
    },
    code: {
      language: "javascript",
      files: [
        {
          name: "basic-promise.js",
          language: "javascript",
          content: `// Basic Promise example
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Data received");
  } else {
    reject("Something went wrong");
  }
});

promise
  .then((data) => console.log(data))
  .catch((error) => console.log(error));`,
        },
        {
          name: "promise-with-timer.js",
          language: "javascript",
          content: `// Promise with setTimeout
const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Success after 2 seconds");
  }, 2000);
});

promise.then((data) => console.log(data));
// After 2 seconds: "Success after 2 seconds"`,
        },
        {
          name: "async-return.js",
          language: "javascript",
          content: `// async function always returns a Promise
async function test() {
  return 10;
}

console.log(test());
// Output: Promise { 10 }

// To get the value, use await
async function run() {
  const result = await test();
  console.log(result); // 10
}

run();`,
        },
        {
          name: "async-await-vs-then.js",
          language: "javascript",
          content: `// Compare .then() vs async/await

// Promise style
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data loaded"), 1000);
  });
}

fetchData().then((data) => console.log(data));

// async/await style (cleaner)
async function loadData() {
  const data = await fetchData();
  console.log(data);
}

loadData();`,
        },
      ],
      defaultCode: `// ===== Promises & Async/Await =====

// 1. Basic Promise
const promise = new Promise((resolve) => {
  resolve("Hello from Promise");
});

promise.then((data) => console.log(data));

// 2. async function returns Promise
async function test() {
  return 42;
}

console.log(test());

// 3. Using await
async function run() {
  const value = await test();
  console.log(value);
}

run();
`,
    },
    interviewQuestions: [
      {
        question: "What is a Promise?",
        difficulty: "Easy",
        hint: "A Promise is an object that represents the eventual completion or failure of an asynchronous operation. It promises to give either a success value or an error value in the future. Three states: Pending, Fulfilled (Resolved), Rejected.",
      },
      {
        question: "What are the three states of a Promise?",
        difficulty: "Easy",
        hint: "Pending — the operation is still running. Fulfilled (Resolved) — the operation succeeded. Rejected — the operation failed.",
      },
      {
        question: "What is the difference between Promises and async/await?",
        difficulty: "Medium",
        hint: "async/await is syntactic sugar over Promises. It makes asynchronous code easier to read and write because it looks like synchronous code. The await keyword pauses the function execution until the Promise is resolved.",
      },
      {
        question: "Can we use await without async?",
        difficulty: "Easy",
        hint: "No. The function must be marked as async. Otherwise, JavaScript throws a syntax error. await can only be used inside an async function.",
      },
      {
        question: "What will be the output? async function test() { return 10; } console.log(test());",
        difficulty: "Medium",
        hint: "Promise { 10 }. An async function always returns a Promise, even if you return a normal value. To get the value, you must use await.",
      },
      {
        question: "Why do we need Promises when we already have callbacks?",
        difficulty: "Medium",
        hint: "Promises solve Callback Hell — deeply nested callbacks that are hard to read and maintain. Promises provide a cleaner chain with .then() and .catch(), and async/await makes it even more readable.",
      },
    ],
  },
  {
    id: "array-methods",
    title: "Array Methods",
    slug: "array-methods",
    icon: "List",
    difficulty: "Beginner",
    description:
      "Master JavaScript array methods — map, filter, reduce, forEach, and more — essential for React interviews.",
    concept: {
      explanation:
        "About map():\n\nmap() transforms each element of an array and returns a new array of the same length. It does NOT modify the original array.\n\n```\nconst arr = [1, 2, 3];\nconst doubled = arr.map(num => num * 2);\n// arr: [1, 2, 3] (unchanged)\n// doubled: [2, 4, 6]\n```\n\nAbout filter():\n\nfilter() returns elements that satisfy a condition. The length of the new array may be smaller than the original.\n\n```\nconst arr = [1, 2, 3, 4, 5];\nconst evens = arr.filter(num => num % 2 === 0);\n// evens: [2, 4]\n```\n\nAbout reduce():\n\nreduce() reduces an array into a single value — such as a sum, object, or count.\n\n```\nconst arr = [1, 2, 3, 4, 5];\nconst sum = arr.reduce((acc, num) => acc + num, 0);\n// sum: 15\n```\n\nAbout forEach():\n\nforEach() executes a function for each element but does NOT return a new array. It is used for side effects like logging or mutating external variables.\n\n```\nconst arr = [1, 2, 3];\narr.forEach(num => console.log(num));\n// 1, 2, 3\n// returns undefined\n```\n\nKey difference: map() returns a new array, forEach() returns undefined.\n\nAbout find():\n\nfind() returns the first element that satisfies a condition, or undefined if none match.\n\n```\nconst arr = [1, 2, 3, 4];\nconst firstEven = arr.find(num => num % 2 === 0);\n// firstEven: 2\n```\n\nAbout some() and every():\n\nsome() returns true if at least one element satisfies the condition. every() returns true if ALL elements satisfy the condition.\n\n```\nconst arr = [1, 2, 3, 4];\narr.some(num => num > 3);  // true\narr.every(num => num > 0); // true\n```",
      realLifeAnalogy:
        "Think of array methods like kitchen tools. map() is like a blender — you put in fruits and get a smoothie (transformed items, same quantity). filter() is like a strainer — you pour pasta and water, only the pasta stays (items that pass the test). reduce() is like a juicer — you put in many oranges and get one glass of juice (many items → one result). forEach() is like tasting each dish — you check each one but don't change anything.",
      keyPoints: [
        "map() transforms each element and returns a new array of the same length — does NOT mutate the original",
        "filter() returns elements that satisfy a condition — length may change",
        "reduce() reduces an array into a single value (sum, object, count, etc.)",
        "forEach() executes a function for each element but returns undefined — used for side effects",
        "find() returns the first matching element or undefined",
        "some() returns true if at least one element matches; every() returns true if all match",
        "In React, map() is used extensively to render lists: items.map(item => <Component key={item.id} />)",
      ],
    },
    code: {
      language: "javascript",
      files: [
        {
          name: "map-vs-foreach.js",
          language: "javascript",
          content: `// map() vs forEach()

const arr = [1, 2, 3];

// map() — returns a new array
const doubled = arr.map(num => num * 2);
console.log("map result:", doubled); // [2, 4, 6]
console.log("original:", arr);        // [1, 2, 3] (unchanged)

// forEach() — returns undefined, used for side effects
const result = arr.forEach(num => console.log("forEach:", num));
console.log("forEach return:", result); // undefined`,
        },
        {
          name: "filter.js",
          language: "javascript",
          content: `// filter() — returns matching elements

const arr = [1, 2, 3, 4, 5, 6];

const evens = arr.filter(num => num % 2 === 0);
console.log("evens:", evens); // [2, 4, 6]

const greaterThanThree = arr.filter(num => num > 3);
console.log("> 3:", greaterThanThree); // [4, 5, 6]

console.log("original:", arr); // [1, 2, 3, 4, 5, 6] (unchanged)`,
        },
        {
          name: "reduce.js",
          language: "javascript",
          content: `// reduce() — single value from an array

const arr = [1, 2, 3, 4, 5];

// Sum
const sum = arr.reduce((acc, num) => acc + num, 0);
console.log("sum:", sum); // 15

// Count occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log("count:", count); // { apple: 3, banana: 2, orange: 1 }`,
        },
        {
          name: "find-some-every.js",
          language: "javascript",
          content: `// find(), some(), every()

const arr = [1, 2, 3, 4, 5];

// find() — first match
const firstEven = arr.find(num => num % 2 === 0);
console.log("first even:", firstEven); // 2

const firstNegative = arr.find(num => num < 0);
console.log("first negative:", firstNegative); // undefined

// some() — at least one match
const hasEven = arr.some(num => num % 2 === 0);
console.log("has even:", hasEven); // true

// every() — all match
const allPositive = arr.every(num => num > 0);
console.log("all positive:", allPositive); // true

const allEven = arr.every(num => num % 2 === 0);
console.log("all even:", allEven); // false`,
        },
      ],
      defaultCode: `// ===== Array Methods =====

const numbers = [1, 2, 3, 4, 5];

// map
const doubled = numbers.map(n => n * 2);
console.log("map:", doubled);

// filter
const evens = numbers.filter(n => n % 2 === 0);
console.log("filter:", evens);

// reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("reduce:", sum);

// forEach
numbers.forEach(n => console.log("forEach:", n));
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between map() and forEach()?",
        difficulty: "Easy",
        hint: "map() transforms each element and returns a new array of the same length. forEach() executes a function for each element but returns undefined. map() is used for transformation, forEach() for side effects like logging.",
      },
      {
        question: "What does filter() return?",
        difficulty: "Easy",
        hint: "filter() returns a new array containing only the elements that satisfy the condition. The length may be smaller than the original. It does not mutate the original array.",
      },
      {
        question: "What does reduce() do?",
        difficulty: "Medium",
        hint: "reduce() reduces an array into a single value. It takes a reducer function and an initial value. Common uses: sum of numbers, counting occurrences, flattening arrays, building objects.",
      },
      {
        question: "What is the difference between find() and filter()?",
        difficulty: "Easy",
        hint: "find() returns the first element that matches the condition (or undefined). filter() returns ALL matching elements in a new array. find() stops at the first match; filter() checks every element.",
      },
      {
        question: "What do some() and every() do?",
        difficulty: "Easy",
        hint: "some() returns true if at least one element satisfies the condition. every() returns true only if ALL elements satisfy the condition. Both return a boolean.",
      },
    ],
  },
  {
    id: "dot-vs-bracket",
    title: "Dot vs Bracket Notation",
    slug: "dot-vs-bracket",
    icon: "Braces",
    difficulty: "Beginner",
    description:
      "Understand the difference between dot notation and bracket notation for accessing object properties in JavaScript.",
    concept: {
      explanation:
        "About dot notation vs bracket notation:\n\n```\nconst user = {\n  name: \"Sai\"\n};\n\nconst key = \"name\";\n\nconsole.log(user.key);  // undefined\nconsole.log(user[key]); // \"Sai\"\n```\n\nWhy? Dot notation looks for the literal property name \"key\". Bracket notation evaluates the expression inside the brackets first, then uses that value as the property name.\n\nDot notation:\n\nuser.name → looks for property literally named \"name\"\nuser.key → looks for property literally named \"key\" (doesn't exist → undefined)\n\nBracket notation:\n\nuser[key] → key = \"name\", so user[\"name\"] → \"Sai\"\nuser[\"name\"] → looks for property \"name\" directly\n\nEasy rule:\n\nDot notation is used for fixed property names.\nBracket notation is used for dynamic property names stored in variables.\n\nReal React example:\n\n```\nconst field = \"email\";\nconst value = user[field]; // dynamically access user.email\n```\n\nThis is why APIs and dynamic forms often use bracket notation — the property name is not known until runtime.",
      realLifeAnalogy:
        "Think of dot notation like calling someone by their actual name — 'Hey Sai' — you know exactly who you're addressing. Bracket notation is like pointing to a name on a list and saying 'call that person' — the name depends on where you're pointing (the variable's value).",
      keyPoints: [
        "Dot notation (user.name) looks for the literal property name",
        "Bracket notation (user[key]) evaluates the variable first, then uses its value as the property name",
        "user.key looks for a property literally named 'key' — not the value of variable key",
        "user[key] where key = 'name' becomes user['name'] — dynamic access",
        "Use dot notation for known, fixed property names",
        "Use bracket notation for dynamic property names from variables or API responses",
        "Bracket notation is essential in React forms and dynamic data handling",
      ],
    },
    code: {
      language: "javascript",
      files: [
        {
          name: "dot-vs-bracket.js",
          language: "javascript",
          content: `// Dot vs Bracket Notation

const user = {
  name: "Sai",
  age: 25,
  email: "sai@example.com"
};

const key = "name";

// Dot notation — looks for literal "key"
console.log("user.key:", user.key); // undefined

// Bracket notation — evaluates key first
console.log("user[key]:", user[key]); // "Sai"

// Dynamic access with bracket notation
const fields = ["name", "age", "email"];
fields.forEach(field => {
  console.log(field + ":", user[field]);
});
// name: Sai
// age: 25
// email: sai@example.com`,
        },
      ],
      defaultCode: `// ===== Dot vs Bracket Notation =====

const user = { name: "Sai", age: 25 };

const key = "name";

console.log("user.key:", user.key);
console.log("user[key]:", user[key]);

// Try it with different keys
const properties = ["name", "age"];
properties.forEach(prop => {
  console.log(prop + ":", user[prop]);
});
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between dot notation and bracket notation in JavaScript?",
        difficulty: "Easy",
        hint: "Dot notation (user.name) looks for the literal property name. Bracket notation (user[key]) evaluates the variable first, then uses its value as the property name. Dot notation is for fixed names; bracket notation is for dynamic names.",
      },
      {
        question: "What will be the output? const user = { name: 'Sai' }; const key = 'name'; console.log(user.key); console.log(user[key]);",
        difficulty: "Easy",
        hint: "undefined then 'Sai'. user.key looks for a property literally named 'key' (doesn't exist). user[key] evaluates key = 'name', so it becomes user['name'] which is 'Sai'.",
      },
      {
        question: "When would you use bracket notation over dot notation?",
        difficulty: "Medium",
        hint: "Bracket notation is used when the property name is dynamic — stored in a variable, comes from an API response, or contains special characters or spaces. For example: user[field] where field = 'email'.",
      },
    ],
  },
  {
    id: "nextjs-basics",
    title: "Next.js Basics",
    slug: "nextjs-basics",
    icon: "Globe",
    difficulty: "Intermediate",
    description:
      "Understand Next.js fundamentals — SSR, CSR, SSG, Server Components, Client Components, and hydration.",
    concept: {
      explanation:
        "About Next.js:\n\nNext.js is a React framework that provides file-based routing, server-side rendering, static generation, API routes, and performance optimizations.\n\nAbout CSR (Client Side Rendering):\n\nData is fetched in the browser. The browser loads JavaScript, makes API calls, and updates the UI.\n\n```\n\"use client\";\n\nuseEffect(() => {\n  fetchUsers();\n}, []);\n```\n\nExamples: Dashboards, Admin panels, Gmail.\n\nAbout SSR (Server Side Rendering):\n\nThe server fetches data and generates HTML before sending it to the browser.\n\n```\nexport default async function Page() {\n  const users = await fetchUsers();\n  return <Users users={users} />;\n}\n```\n\nExamples: E-commerce, News websites, Product pages.\n\nAbout SSG (Static Site Generation):\n\nPages are generated at build time. Users receive pre-built HTML.\n\nExamples: Blogs, Documentation, Portfolio websites.\n\nCSR vs SSR vs SSG:\n\nCSR — data fetched in browser\nSSR — data fetched on each server request\nSSG — data fetched at build time\n\nAbout \"use client\":\n\n\"use client\" marks a component as a Client Component. Server Components (default in App Router) cannot use useState, useEffect, onClick, window, or localStorage.\n\n```\n\"use client\";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}\n```\n\nAbout Server Components:\n\nServer Components run on the server. They can be async and fetch data directly. They cannot use hooks or browser APIs.\n\n```\nexport default async function Page() {\n  const users = await fetch(\"https://api.example.com/users\");\n  const data = await users.json();\n  return <div>{data.length} users</div>;\n}\n```\n\nAbout Hydration:\n\nThe server sends HTML. The browser receives it and React attaches event handlers. This process is called hydration.\n\nIf server renders <h1>10:00</h1> and browser renders <h1>10:01</h1>, React throws a hydration error because the content doesn't match.",
      realLifeAnalogy:
        "CSR is like ordering a pizza kit — you get the ingredients and cook it yourself. SSR is like ordering a cooked pizza — it arrives ready to eat. SSG is like buying a frozen pizza from the store — pre-made, just heat it up. Hydration is like adding toppings to a pre-baked pizza base — the structure is there, you just add the interactive bits.",
      keyPoints: [
        "Next.js is a React framework with file-based routing, SSR, SSG, and API routes",
        "CSR: data fetched in browser — for interactive apps like dashboards",
        "SSR: data fetched on server per request — for dynamic content like e-commerce",
        "SSG: data fetched at build time — for static content like blogs",
        "\"use client\" marks a component as a Client Component (can use hooks, events, browser APIs)",
        "Server Components are the default — they can be async but cannot use hooks or browser APIs",
        "Hydration is the process of attaching React event handlers to server-rendered HTML",
        "Hydration errors occur when server and client HTML don't match",
      ],
    },
    code: {
      language: "javascript",
      files: [
        {
          name: "server-component.tsx",
          language: "javascript",
          content: `// Server Component (default in App Router)
// Can be async — fetches data on the server

export default async function Page() {
  const res = await fetch("https://api.example.com/users");
  const users = await res.json();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
}`,
        },
        {
          name: "client-component.tsx",
          language: "javascript",
          content: `// Client Component — needs "use client"
// Can use hooks, events, and browser APIs

"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`,
        },
      ],
      defaultCode: `// ===== Next.js Basics =====

// Server Component (default)
export default async function Page() {
  const data = await fetch("https://api.example.com/data");
  const json = await data.json();
  return <div>{JSON.stringify(json)}</div>;
}

// Client Component
"use client";
import { useState } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
`,
    },
    interviewQuestions: [
      {
        question: "What is Next.js?",
        difficulty: "Easy",
        hint: "Next.js is a React framework that provides file-based routing, server-side rendering, static generation, API routes, and performance optimizations like image optimization and code splitting.",
      },
      {
        question: "What is the difference between CSR, SSR, and SSG?",
        difficulty: "Medium",
        hint: "CSR: data fetched in browser after page loads. SSR: data fetched on server per request, HTML generated server-side. SSG: pages generated at build time, served as static HTML.",
      },
      {
        question: "What is 'use client' in Next.js?",
        difficulty: "Easy",
        hint: "'use client' marks a component as a Client Component. It allows using React hooks (useState, useEffect), event handlers (onClick), and browser APIs (window, localStorage). Server Components (default) cannot use these.",
      },
      {
        question: "Can Server Components be async?",
        difficulty: "Easy",
        hint: "Yes. Server Components can be async and directly await data fetching. Client Components cannot be async because they must render immediately.",
      },
      {
        question: "What is hydration in Next.js?",
        difficulty: "Medium",
        hint: "Hydration is the process where React attaches event handlers to server-rendered HTML in the browser. If the server and client HTML don't match, React throws a hydration error.",
      },
    ],
  },
  {
    id: "nextjs-routing",
    title: "Next.js Routing & Navigation",
    slug: "nextjs-routing",
    icon: "Route",
    difficulty: "Intermediate",
    description:
      "Understand Next.js App Router — useRouter, useParams, useSearchParams, dynamic routes, and navigation patterns.",
    concept: {
      explanation:
        "About useRouter:\n\nuseRouter provides navigation methods in Next.js App Router.\n\n```\nconst router = useRouter();\n\nrouter.push(\"/dashboard\");  // navigate to page\nrouter.replace(\"/login\");   // replace current history entry\nrouter.back();               // go back\nrouter.refresh();            // refresh server components\n```\n\nrouter.push vs window.location:\n\nrouter.push(\"/users\") — client-side navigation, no full page refresh\nwindow.location.href = \"/users\" — full page refresh\n\nAbout useParams:\n\nuseParams reads dynamic route segments from the URL path.\n\nFolder: app/users/[id]/page.tsx\nURL: /users/25\n\n```\nconst params = useParams();\nconsole.log(params.id); // \"25\"\n```\n\nAbout useSearchParams:\n\nuseSearchParams reads query parameters from the URL.\n\nURL: /users?page=2&search=sai\n\n```\nconst searchParams = useSearchParams();\nsearchParams.get(\"page\");   // \"2\"\nsearchParams.get(\"search\"); // \"sai\"\n```\n\nuseParams vs useSearchParams:\n\nuseParams — reads from URL path (/users/25 → 25)\nuseSearchParams — reads from query string (?page=2 → 2)\n\nAbout Dynamic Routes:\n\nFolder structure determines routes:\n\napp/course/[id] → /course/1, /course/100\napp/blog/[slug] → /blog/my-post\n\nReal project examples:\n\nTable filters: ?page=2&search=sai&status=ACTIVE\nNavigation: router.push(\"/participants\")\nDynamic page: /participant/123",
      realLifeAnalogy:
        "useRouter is like a GPS — you tell it where to go (push), replace the destination (replace), or go back (back). useParams reads the street address from the path, while useSearchParams reads the apartment number from the query string.",
      keyPoints: [
        "useRouter provides push, replace, back, and refresh for navigation",
        "router.push does client-side navigation without full page refresh",
        "useParams reads dynamic route segments from the URL path",
        "useSearchParams reads query parameters from the URL",
        "Dynamic routes use folder naming: [id], [slug], etc.",
        "useParams for path values; useSearchParams for query string values",
        "Search params are commonly used for filters, pagination, and sorting",
      ],
    },
    code: {
      language: "javascript",
      files: [
        {
          name: "navigation-example.tsx",
          language: "javascript",
          content: `// Navigation with useRouter
"use client";

import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/dashboard")}>
        Go to Dashboard
      </button>
      <button onClick={() => router.back()}>
        Go Back
      </button>
      <button onClick={() => router.refresh()}>
        Refresh Data
      </button>
    </div>
  );
}`,
        },
        {
          name: "params-example.tsx",
          language: "javascript",
          content: `// useParams and useSearchParams
"use client";

import { useParams, useSearchParams } from "next/navigation";

// URL: /users/25?page=2&search=sai
export default function UserPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // From path: /users/25
  console.log(params.id); // "25"

  // From query: ?page=2&search=sai
  console.log(searchParams.get("page"));   // "2"
  console.log(searchParams.get("search")); // "sai"

  return <div>User {params.id}</div>;
}`,
        },
      ],
      defaultCode: `// ===== Next.js Routing =====

"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  return (
    <div>
      <button onClick={() => router.push("/")}>Home</button>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between router.push and window.location.href?",
        difficulty: "Medium",
        hint: "router.push does client-side navigation without a full page refresh. window.location.href causes a full page reload. router.push is faster and preserves React state.",
      },
      {
        question: "What is the difference between useParams and useSearchParams?",
        difficulty: "Easy",
        hint: "useParams reads dynamic route segments from the URL path (e.g., /users/25 → id = 25). useSearchParams reads query parameters from the URL (e.g., ?page=2 → page = 2).",
      },
      {
        question: "How do you create a dynamic route in Next.js App Router?",
        difficulty: "Easy",
        hint: "Create a folder with square brackets: app/users/[id]/. The URL /users/25 will make params.id available as '25'.",
      },
      {
        question: "What are common use cases for useSearchParams?",
        difficulty: "Medium",
        hint: "Filters, pagination, sorting, and preserving UI state after page refresh. Example: ?page=2&search=sai&status=ACTIVE for a table with filters.",
      },
    ],
  },
  {
    id: "ts-basics",
    title: "TypeScript Basics",
    slug: "ts-basics",
    icon: "FileCode",
    difficulty: "Beginner",
    description:
      "Understand TypeScript fundamentals — interface, type, union types, generics, keyof, typeof, optional chaining, and nullish coalescing.",
    concept: {
      explanation:
        "About TypeScript:\n\nTypeScript is JavaScript with static typing. It helps detect errors at compile time and improves IntelliSense.\n\n```\nlet age: number = 10;\nage = \"Sai\"; // Error: Type 'string' is not assignable to type 'number'\n```\n\nAbout Interface:\n\nInterfaces define object structures — commonly used for API responses and props.\n\n```\ninterface User {\n  id: string;\n  name: string;\n  age: number;\n}\n\nconst user: User = { id: \"1\", name: \"Sai\", age: 23 };\n```\n\nAbout Type:\n\nTypes are similar to interfaces but more flexible — they can define union types, primitives, and more.\n\n```\ntype User = { id: string; name: string };\ntype Status = \"ACTIVE\" | \"INACTIVE\";\n```\n\nInterface vs Type:\n\nInterface — object structures, API models, props\nType — union types, primitive aliases, more flexible\n\nAbout Union Types:\n\n```\ntype Status = \"ACTIVE\" | \"INACTIVE\";\nlet s: Status = \"ACTIVE\"; // valid\ns = \"PENDING\"; // Error\n```\n\nAbout Generics:\n\nGenerics create reusable type-safe code. The caller decides the type.\n\n```\nfunction identity<T>(value: T): T {\n  return value;\n}\n\nidentity(\"Sai\"); // T is string\nidentity(10);    // T is number\n```\n\nGeneric vs any: any removes type safety; generics preserve the actual type.\n\nAbout keyof:\n\nkeyof gets the property names of a type as a union.\n\n```\ninterface User { name: string; age: number }\ntype Keys = keyof User; // \"name\" | \"age\"\n```\n\nAbout typeof:\n\ntypeof gets the type from a variable.\n\n```\nconst user = { name: \"Sai\", age: 23 };\ntype UserType = typeof user;\n```\n\nAbout Optional Chaining (?.) and Nullish Coalescing (??):\n\nOptional chaining prevents 'Cannot read property' errors:\n\n```\nuser?.profile?.name\n```\n\nNullish coalescing provides fallback only for null/undefined:\n\n```\nconst name = user.name ?? \"Guest\";\n// 0 ?? 10 → 0 (not null/undefined)\n// null ?? 10 → 10\n```",
      realLifeAnalogy:
        "TypeScript is like a spell-checker for your code — it catches mistakes before you run it. Interfaces are like application forms with required fields. Generics are like a vending machine that works with any item — the machine (function) is the same, but what goes in and out depends on what you select (the type).",
      keyPoints: [
        "TypeScript adds static typing to JavaScript — catches errors at compile time",
        "Interface defines object structure; Type is more flexible (unions, primitives)",
        "Union types restrict a value to a set of options: type Status = 'A' | 'B'",
        "Generics create reusable type-safe code — caller decides the type",
        "any removes type safety; generics preserve the actual type",
        "keyof gets property names as a union type",
        "typeof gets the type from an existing variable",
        "Optional chaining (?.) safely accesses nested properties",
        "Nullish coalescing (??) provides fallback only for null/undefined (not falsy values)",
      ],
    },
    code: {
      language: "javascript",
      files: [
        {
          name: "interface-vs-type.ts",
          language: "javascript",
          content: `// Interface vs Type

// Interface — for object structures
interface User {
  id: string;
  name: string;
  age: number;
}

// Type — more flexible
type Status = "ACTIVE" | "INACTIVE";
type Point = { x: number; y: number };

// Generics
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstUser = getFirst<User>([{ id: "1", name: "Sai", age: 23 }]);
const firstNum = getFirst([1, 2, 3]);`,
        },
        {
          name: "keyof-typeof.ts",
          language: "javascript",
          content: `// keyof and typeof

interface User {
  name: string;
  age: number;
  email: string;
}

// keyof — gets property names
type UserKeys = keyof User; // "name" | "age" | "email"

function getValue(user: User, key: keyof User) {
  return user[key];
}

// typeof — gets type from variable
const config = { theme: "dark", lang: "en" };
type Config = typeof config; // { theme: string; lang: string }`,
        },
      ],
      defaultCode: `// ===== TypeScript Basics =====

interface User {
  id: string;
  name: string;
}

type Status = "ACTIVE" | "INACTIVE";

function greet<T>(user: T): T {
  console.log(user);
  return user;
}

const user = greet<User>({ id: "1", name: "Sai" });
`,
    },
    interviewQuestions: [
      {
        question: "What is TypeScript and why use it?",
        difficulty: "Easy",
        hint: "TypeScript is JavaScript with static typing. It catches errors at compile time, improves IntelliSense, and makes code more maintainable.",
      },
      {
        question: "What is the difference between interface and type?",
        difficulty: "Easy",
        hint: "Interface is used for object structures (API models, props). Type is more flexible — it can define union types, primitive aliases, and intersections. Both can define objects.",
      },
      {
        question: "What are generics in TypeScript?",
        difficulty: "Medium",
        hint: "Generics create reusable type-safe code. The caller decides the type. Example: function identity<T>(value: T): T. Unlike any, generics preserve the actual type.",
      },
      {
        question: "What is the difference between any and generics?",
        difficulty: "Medium",
        hint: "any removes type safety entirely — you lose IntelliSense and type checking. Generics preserve the actual type — TypeScript knows what type is being used.",
      },
      {
        question: "What is the difference between optional chaining (?.) and nullish coalescing (??)?",
        difficulty: "Easy",
        hint: "Optional chaining (?.) safely accesses nested properties without throwing if intermediate values are null/undefined. Nullish coalescing (??) provides a fallback only when the value is null or undefined (not for other falsy values like 0 or '').",
      },
    ],
  },
  {
    id: "ts-utility-types",
    title: "TypeScript Utility Types",
    slug: "ts-utility-types",
    icon: "Boxes",
    difficulty: "Intermediate",
    description:
      "Master TypeScript utility types — Partial, Pick, Omit, and Record — for type-safe React and API code.",
    concept: {
      explanation:
        "About Partial:\n\nPartial<T> makes all properties of T optional. Useful for update operations where you only send changed fields.\n\n```\ninterface User {\n  name: string;\n  age: number;\n}\n\ntype UpdateUser = Partial<User>;\n// { name?: string; age?: number }\n\nupdateUser({ name: \"Sai\" }); // valid — only name provided\n```\n\nAbout Pick:\n\nPick<T, K> selects specific properties from T.\n\n```\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n  password: string;\n}\n\ntype Profile = Pick<User, \"name\" | \"email\">;\n// { name: string; email: string }\n```\n\nAbout Omit:\n\nOmit<T, K> removes specific properties from T.\n\n```\ntype SafeUser = Omit<User, \"password\">;\n// { id: string; name: string; email: string }\n```\n\nAbout Record:\n\nRecord<K, V> creates an object type with keys K and values V.\n\n```\ntype Status = \"ACTIVE\" | \"INACTIVE\" | \"PENDING\";\n\nconst statusColors: Record<Status, string> = {\n  ACTIVE: \"green\",\n  INACTIVE: \"red\",\n  PENDING: \"yellow\"\n};\n```\n\nRecord ensures all keys are present — if you miss one, TypeScript throws an error.\n\nReal React example:\n\n```\ntype Status = \"ACTIVE\" | \"INACTIVE\";\n\nconst badgeColors: Record<Status, string> = {\n  ACTIVE: \"green\",\n  INACTIVE: \"red\"\n};\n\nreturn <Badge color={badgeColors[status]}>{status}</Badge>;\n```\n\nUtility Types Summary:\n\nPartial<T> — make all fields optional\nPick<T, K> — select specific fields\nOmit<T, K> — remove specific fields\nRecord<K, V> — create key-value object type",
      realLifeAnalogy:
        "Partial is like a form where every field is optional — you can fill in just what you want to update. Pick is like selecting specific columns from a table. Omit is like hiding sensitive columns (like passwords) from a query result. Record is like a dictionary where every word in your list must have a definition.",
      keyPoints: [
        "Partial<T> makes all properties optional — useful for update APIs",
        "Pick<T, K> selects only the specified properties from T",
        "Omit<T, K> removes the specified properties from T",
        "Record<K, V> creates an object type with keys K and values V — all keys must be present",
        "Record is commonly used for mapping statuses to colors, labels, or configs",
        "These utility types help create type-safe React components and API functions",
      ],
    },
    code: {
      language: "javascript",
      files: [
        {
          name: "partial-pick-omit.ts",
          language: "javascript",
          content: `// Partial, Pick, Omit

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Partial — all fields optional
type UpdateUser = Partial<User>;
// { id?: string; name?: string; email?: string; password?: string }

// Pick — select specific fields
type Profile = Pick<User, "name" | "email">;
// { name: string; email: string }

// Omit — remove specific fields
type SafeUser = Omit<User, "password">;
// { id: string; name: string; email: string }`,
        },
        {
          name: "record-example.ts",
          language: "javascript",
          content: `// Record — key-value object type

type Status = "ACTIVE" | "INACTIVE" | "PENDING";

// All keys must be present — TypeScript enforces this
const statusColors: Record<Status, string> = {
  ACTIVE: "green",
  INACTIVE: "red",
  PENDING: "yellow"
};

// Real React example
type BadgeVariant = "success" | "warning" | "error";

const badgeConfig: Record<BadgeVariant, { color: string; icon: string }> = {
  success: { color: "green", icon: "✓" },
  warning: { color: "yellow", icon: "!" },
  error: { color: "red", icon: "✗" }
};`,
        },
      ],
      defaultCode: `// ===== TypeScript Utility Types =====

interface User {
  id: string;
  name: string;
  email: string;
}

// Partial — all optional
type PartialUser = Partial<User>;

// Pick — select fields
type NameAndEmail = Pick<User, "name" | "email">;

// Omit — remove fields
type WithoutEmail = Omit<User, "email">;

// Record — key-value object
type Role = "admin" | "user";
const roles: Record<Role, string> = {
  admin: "Administrator",
  user: "Regular User"
};
`,
    },
    interviewQuestions: [
      {
        question: "What is Partial<T> in TypeScript?",
        difficulty: "Easy",
        hint: "Partial<T> makes all properties of T optional. It is commonly used for update APIs where you only send the fields that changed.",
      },
      {
        question: "What is the difference between Pick and Omit?",
        difficulty: "Easy",
        hint: "Pick<T, K> selects specific properties from T. Omit<T, K> removes specific properties from T. Pick is 'keep these'; Omit is 'remove these'.",
      },
      {
        question: "What is Record<K, V> in TypeScript?",
        difficulty: "Medium",
        hint: "Record<K, V> creates an object type where keys are K and values are V. It ensures all keys in K are present. Example: Record<Status, string> for mapping statuses to colors.",
      },
    ],
  },
  {
    id: "debouncing-throttling",
    title: "Debouncing & Throttling",
    slug: "debouncing-throttling",
    icon: "Timer",
    difficulty: "Intermediate",
    description:
      "Understand debouncing and throttling — performance optimization techniques for search inputs, scroll events, and API calls.",
    concept: {
      explanation:
        "About Debouncing:\n\nDebouncing delays the execution of a function until the user stops performing an action for a specified amount of time.\n\nExample — search input without debounce:\n\nUser types: s, sa, sai, sait, saite\nAPI calls: API(s), API(sa), API(sai), API(sait), API(saite) — 5 calls\n\nWith debounce (500ms):\n\nUser types: s, sa, sai, sait, saite (stops typing)\nWait 500ms → API(saite) — only 1 call\n\nImportant: Debounce is different from minimum character check.\n\nMinimum character check:\n\nif (search.length >= 3) { fetchUsers(); }\n\nThis prevents calls for 's' and 'sa' but still fires on every keystroke after 3 chars.\n\nDebounce waits until the user stops typing entirely.\n\nReal project example:\n\nif (search.length >= 3) { debouncedSearch(search); }\n\nCommon uses: search box, autocomplete, filters, API calls.\n\nAbout Throttling:\n\nThrottling limits the execution of a function to once within a specified interval.\n\nExample — scroll without throttling:\n\nUser scrolls continuously → hundreds of events fired.\n\nWith throttle (1 second):\n\nScroll continuously → API fires once per second.\n\nCommon uses: window scroll, infinite scrolling, window resize, mouse movement, button spam prevention.\n\nDebounce vs Throttle:\n\nDebounce — wait until user stops. Use for: search input, autocomplete, API search.\nThrottle — limit execution frequency. Use for: scroll events, resize, infinite scroll.\n\nEasy trick to remember:\n\nDebounce = STOP — wait until the user stops.\nThrottle = LIMIT — allow execution only every X milliseconds.",
      realLifeAnalogy:
        "Debouncing is like a waiter who only goes to the kitchen after the customer stops adding items to their order. Throttling is like a bus that leaves every 10 minutes — no matter how many people are waiting, it only departs at fixed intervals.",
      keyPoints: [
        "Debouncing delays execution until the user stops an action — reduces unnecessary calls",
        "Throttling limits execution to once per interval — controls frequency",
        "Debounce is for search inputs, autocomplete, filters",
        "Throttle is for scroll events, resize, infinite scrolling",
        "Debounce + minimum character check is a common pattern for search APIs",
        "Debounce = wait until stop; Throttle = limit frequency",
        "Both improve performance by reducing API calls and event handler executions",
      ],
    },
    code: {
      language: "javascript",
      files: [
        {
          name: "debounce-example.js",
          language: "javascript",
          content: `// Debouncing — wait until user stops typing

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  console.log("API call for:", query);
  // fetch("/api/search?q=" + query);
}, 500);

// Simulate typing
debouncedSearch("s");
debouncedSearch("sa");
debouncedSearch("sai");
debouncedSearch("sait");
debouncedSearch("saite");
// Only "saite" fires after 500ms pause`,
        },
        {
          name: "throttle-example.js",
          language: "javascript",
          content: `// Throttling — limit execution frequency

function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

// Usage
const handleScroll = throttle(() => {
  console.log("Scroll event fired at", new Date().toISOString());
}, 1000);

// Simulate continuous scrolling
handleScroll(); // fires
handleScroll(); // ignored
handleScroll(); // ignored
setTimeout(() => handleScroll(), 1000); // fires after 1s`,
        },
        {
          name: "debounce-vs-throttle.js",
          language: "javascript",
          content: `// Debounce vs Throttle comparison

// Debounce — fires after pause
const debounce = (fn, d) => {
  let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); };
};

// Throttle — fires at most once per interval
const throttle = (fn, l) => {
  let s = false; return (...a) => { if (!s) { fn(...a); s = true; setTimeout(() => s = false, l); } };
};

// Test
const log = (msg) => console.log(msg);

const d = debounce(log, 500);
const t = throttle(log, 1000);

console.log("--- Debounce (rapid calls) ---");
d("A"); d("B"); d("C"); // Only "C" after 500ms

console.log("--- Throttle (rapid calls) ---");
t("1"); t("2"); t("3"); // "1" fires, "2" and "3" ignored for 1s`,
        },
      ],
      defaultCode: `// ===== Debouncing & Throttling =====

// Debounce — waits for pause
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Throttle — limits frequency
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

const log = (msg) => console.log(msg);
const d = debounce(log, 500);
const t = throttle(log, 1000);

d("debounced");
t("throttled");
`,
    },
    interviewQuestions: [
      {
        question: "What is debouncing?",
        difficulty: "Medium",
        hint: "Debouncing delays the execution of a function until the user stops performing an action for a specified amount of time. It is commonly used for search inputs and autocomplete to reduce API calls.",
      },
      {
        question: "What is throttling?",
        difficulty: "Medium",
        hint: "Throttling limits the execution of a function to once within a specified interval. It is commonly used for scroll events, window resize, and infinite scrolling to control execution frequency.",
      },
      {
        question: "What is the difference between debouncing and throttling?",
        difficulty: "Medium",
        hint: "Debouncing waits until the user stops an action before executing (search inputs). Throttling limits execution to once per interval regardless of how many times the event fires (scroll events). Debounce = wait until stop; Throttle = limit frequency.",
      },
      {
        question: "When would you use debouncing vs throttling?",
        difficulty: "Medium",
        hint: "Use debouncing for search inputs, autocomplete, and API calls where you want to wait until the user finishes typing. Use throttling for scroll events, resize events, and infinite scrolling where you want to limit how often a function executes.",
      },
    ],
  },
];
