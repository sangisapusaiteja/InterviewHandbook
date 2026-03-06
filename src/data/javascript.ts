import type { JavaScriptTopic, JavaScriptModule } from "@/types/javascript";

export const javascriptTopics: JavaScriptTopic[] = [
  // ─────────────────────────────────────────────
  // 1. Introduction to JavaScript
  // ─────────────────────────────────────────────
  {
    id: "introduction-to-javascript",
    title: "Introduction to JavaScript",
    slug: "introduction-to-javascript",
    icon: "Braces",
    difficulty: "Beginner",
    description:
      "Understand what JavaScript is, where it runs, and why it is the most popular programming language for the web.",
    concept: {
      explanation:
        "JavaScript is a high-level, interpreted programming language originally created in 1995 by Brendan Eich at Netscape. It was designed to add interactivity to web pages — things like form validation, animations, and dynamic content updates. Today JavaScript runs everywhere: in browsers (client-side), on servers (Node.js), in mobile apps (React Native), and even on IoT devices. It is single-threaded, dynamically typed, and supports multiple paradigms including object-oriented, functional, and event-driven programming. JavaScript is standardised under the name ECMAScript (ES), with ES6 (2015) introducing major features like arrow functions, classes, template literals, and modules. Every modern web application relies on JavaScript, making it essential for any developer to learn.",
      realLifeAnalogy:
        "If a web page were a person, HTML would be the skeleton (structure), CSS would be the clothing and appearance (style), and JavaScript would be the brain and muscles (behaviour). Without JavaScript the person can stand there and look nice, but cannot move, react, or think. JavaScript is what makes web pages come alive — responding to clicks, fetching data, and updating the screen in real time.",
      keyPoints: [
        "JavaScript was created in 1995 by Brendan Eich at Netscape in just 10 days",
        "It is the only programming language that runs natively in all web browsers",
        "JavaScript is dynamically typed — you do not declare types for variables",
        "ECMAScript (ES) is the official specification; ES6 (2015) was a major update",
        "JavaScript is single-threaded but uses an event loop for asynchronous operations",
        "It runs on the client side (browser) and server side (Node.js)",
        "JavaScript supports object-oriented, functional, and event-driven programming styles",
        "It is the most popular programming language according to Stack Overflow surveys",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Introduction to JavaScript =====

// JavaScript is the language of the web.
// Let's start with the basics!

// 1. Output to console
console.log("Hello, JavaScript!");

// 2. JavaScript can do math
console.log("2 + 3 =", 2 + 3);
console.log("10 * 5 =", 10 * 5);

// 3. JavaScript can work with text
console.log("Welcome to " + "JavaScript!");

// 4. JavaScript can make decisions
let age = 18;
if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}

// 5. JavaScript can repeat tasks
for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}

// 6. JavaScript can store collections
let fruits = ["apple", "banana", "cherry"];
console.log("\\nFruits:", fruits);
console.log("First fruit:", fruits[0]);

// Try modifying the code above and run it!
`,
    },
    interviewQuestions: [
      {
        question: "What is JavaScript and how is it different from Java?",
        difficulty: "Easy",
        hint: "Despite the similar names, JavaScript and Java are completely different languages. JavaScript was named to ride Java's popularity in the 1990s. Java is statically typed and compiled; JavaScript is dynamically typed and interpreted. They have different use cases and ecosystems.",
      },
      {
        question:
          "What does it mean that JavaScript is single-threaded? How does it handle asynchronous operations?",
        difficulty: "Medium",
        hint: "Single-threaded means JavaScript executes one piece of code at a time on a single call stack. It handles async operations through the event loop, callback queue, and Web APIs (like setTimeout, fetch). The event loop checks if the call stack is empty before pushing queued callbacks onto it.",
      },
      {
        question:
          "What is ECMAScript and how does it relate to JavaScript?",
        difficulty: "Easy",
        hint: "ECMAScript is the official specification that JavaScript follows. JavaScript is an implementation of ECMAScript. ES6 (ES2015) was a major revision that introduced let/const, arrow functions, classes, template literals, destructuring, and modules. New versions are released yearly.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. JavaScript Syntax
  // ─────────────────────────────────────────────
  {
    id: "javascript-syntax",
    title: "JavaScript Syntax",
    slug: "javascript-syntax",
    icon: "FileCode",
    difficulty: "Beginner",
    description:
      "Learn the basic rules and structure of writing JavaScript code — statements, expressions, semicolons, and case sensitivity.",
    concept: {
      explanation:
        "JavaScript syntax is the set of rules that define how programs are written. A JavaScript program is a sequence of statements, each of which is an instruction the engine executes. Statements can contain values, operators, expressions, keywords, and comments. Expressions produce a value (like 2 + 3 or 'hello'.toUpperCase()), while statements perform an action (like declaring a variable or running a loop). JavaScript is case-sensitive — myVar and myvar are different identifiers. Semicolons mark the end of a statement, though JavaScript has Automatic Semicolon Insertion (ASI) that adds them in many cases. Identifiers (variable and function names) must start with a letter, underscore (_), or dollar sign ($), and cannot be reserved keywords like if, for, or return. Whitespace and indentation do not affect execution but are crucial for readability.",
      realLifeAnalogy:
        "JavaScript syntax is like the grammar rules of a language. Just as English requires sentences to start with a capital letter and end with a period, JavaScript has its own rules — statements end with semicolons, blocks are wrapped in curly braces, and certain words are reserved. If you break the grammar rules, the browser cannot understand your instructions, just like a reader cannot understand a sentence with jumbled grammar.",
      keyPoints: [
        "JavaScript is case-sensitive: myVariable and myvariable are different",
        "Statements are instructions that the engine executes one by one",
        "Expressions produce a value; statements perform an action",
        "Semicolons end statements — ASI adds them automatically in many cases, but explicit semicolons are recommended",
        "Identifiers must start with a letter, _, or $ — they cannot start with a number",
        "Reserved keywords (if, for, return, class, etc.) cannot be used as variable names",
        "Code blocks are grouped with curly braces { }",
        "Whitespace is ignored by the engine but essential for human readability",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== JavaScript Syntax =====

// 1. Statements — each line is an instruction
let message = "Hello, World!";
console.log(message);

// 2. Expressions — produce a value
let sum = 10 + 20;            // 10 + 20 is an expression
console.log("Sum:", sum);

let greeting = "Hi, " + "there!"; // string concatenation expression
console.log(greeting);

// 3. Case sensitivity
let myName = "Alice";
let myname = "Bob";
console.log("\\nmyName:", myName);
console.log("myname:", myname);  // different variable!

// 4. Semicolons
let a = 5;   // semicolon ends the statement
let b = 10;  // each statement on its own line
let c = a + b;
console.log("\\na + b =", c);

// 5. Code blocks with curly braces
let score = 85;
if (score >= 80) {
  console.log("\\nGrade: A");
  console.log("Great job!");
}

// 6. Valid and invalid identifiers
let _private = "valid";      // starts with _
let $price = 9.99;           // starts with $
let firstName = "Valid";     // starts with letter
// let 2fast = "invalid";   // ERROR: cannot start with number
// let for = "invalid";     // ERROR: reserved keyword

console.log("\\nIdentifiers:");
console.log("_private:", _private);
console.log("$price:", $price);
console.log("firstName:", firstName);

// 7. Expressions vs Statements
// Expression: produces a value
let result = 3 > 2;  // true
console.log("\\n3 > 2 is an expression:", result);

// Statement: performs an action
for (let i = 0; i < 3; i++) {
  console.log("Loop iteration:", i);
}
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the difference between an expression and a statement in JavaScript?",
        difficulty: "Easy",
        hint: "An expression is any piece of code that produces a value — like 2 + 3, a function call, or a variable reference. A statement is an instruction that performs an action — like a variable declaration, an if block, or a loop. Expressions can be part of statements.",
      },
      {
        question:
          "What is Automatic Semicolon Insertion (ASI) in JavaScript? Can it cause bugs?",
        difficulty: "Medium",
        hint: "ASI is the JavaScript engine's ability to automatically insert semicolons where it thinks they should be. It can cause bugs — for example, a return statement followed by a newline before the value will return undefined because ASI inserts a semicolon after return. Best practice is to always use explicit semicolons.",
      },
      {
        question: "Why is JavaScript case-sensitive and what implications does this have?",
        difficulty: "Easy",
        hint: "JavaScript treats uppercase and lowercase letters as different characters. This means 'myVar' and 'myvar' are two separate identifiers. Built-in keywords must be lowercase (if, not IF). Constructor functions conventionally start with uppercase (Date, Array). This is important for consistent naming conventions.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Variables (var, let, const)
  // ─────────────────────────────────────────────
  {
    id: "javascript-variables",
    title: "Variables (var, let, const)",
    slug: "javascript-variables",
    icon: "Boxes",
    difficulty: "Beginner",
    description:
      "Learn the three ways to declare variables in JavaScript — var, let, and const — and understand their scoping, hoisting, and reassignment rules.",
    concept: {
      explanation:
        "Variables are named containers that store data values. JavaScript provides three keywords to declare variables: var, let, and const. var is the original way (ES5 and earlier) — it is function-scoped and hoisted to the top of its function with an initial value of undefined. let (introduced in ES6) is block-scoped and hoisted but not initialised — accessing it before declaration throws a ReferenceError (the Temporal Dead Zone). const is also block-scoped and must be initialised at declaration — the binding cannot be reassigned, but object/array contents can still be mutated. Modern JavaScript best practice is to use const by default and let only when you need to reassign. Avoid var entirely in new code.",
      realLifeAnalogy:
        "Think of variables as labelled storage boxes. var is like an old-style filing cabinet where files are accessible from anywhere in the room (function scope) — even before you officially put them there (hoisting). let is a modern locker that only works within its specific section (block scope) and is locked until you officially set it up (TDZ). const is a sealed display case — once you place an item inside, you cannot replace it with a different item, but you can rearrange or modify what is inside (object mutation).",
      keyPoints: [
        "Use const by default; switch to let only when reassignment is needed",
        "Avoid var in modern code — it has confusing scoping and hoisting behaviour",
        "var is function-scoped; let and const are block-scoped",
        "var is hoisted with value undefined; let/const are hoisted but in the Temporal Dead Zone",
        "const must be initialised at declaration — you cannot declare it without a value",
        "const prevents reassignment of the binding, not mutation of the value",
        "A const array or object can still have its contents modified",
        "Variable names should be descriptive and use camelCase convention",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Variables: var, let, const =====

// ── const (default choice) ──────────────────
const PI = 3.14159;
const appName = "Interview Handbook";
console.log("PI:", PI);
console.log("App:", appName);
// PI = 3.14;  // TypeError: Assignment to constant variable

// const with objects — contents CAN be modified
const user = { name: "Alice", age: 25 };
user.age = 26;       // allowed! modifying property
console.log("\\nUser:", user);
// user = {};         // TypeError: can't reassign the binding

// ── let (when you need to reassign) ─────────
let score = 0;
console.log("\\nInitial score:", score);
score = 100;
console.log("Updated score:", score);

let count = 1;
count += 5;
console.log("Count:", count);

// ── var (avoid in modern code) ──────────────
var oldStyle = "I am function-scoped";
console.log("\\nvar:", oldStyle);

// ── Scoping differences ─────────────────────
console.log("\\n--- Scoping ---");

// Block scope with let/const
if (true) {
  let blockLet = "I exist only in this block";
  const blockConst = "Me too";
  var blockVar = "I escape the block!";
  console.log("Inside block (let):", blockLet);
  console.log("Inside block (const):", blockConst);
}
// console.log(blockLet);    // ReferenceError
// console.log(blockConst);  // ReferenceError
console.log("Outside block (var):", blockVar); // works!

// ── Hoisting differences ────────────────────
console.log("\\n--- Hoisting ---");

// var is hoisted with value undefined
console.log("hoisted var:", typeof hoistedVar); // "undefined"
var hoistedVar = "now I have a value";
console.log("after declaration:", hoistedVar);

// let/const are in the Temporal Dead Zone (TDZ)
// console.log(hoistedLet);  // ReferenceError: Cannot access before initialization
let hoistedLet = "I was in the TDZ";
console.log("let after declaration:", hoistedLet);

// ── const with arrays ───────────────────────
console.log("\\n--- const with arrays ---");
const fruits = ["apple", "banana"];
fruits.push("cherry");          // allowed
fruits[0] = "avocado";          // allowed
console.log("Modified array:", fruits);
// fruits = ["new", "array"];   // TypeError
`,
    },
    interviewQuestions: [
      {
        question:
          "What are the differences between var, let, and const?",
        difficulty: "Easy",
        hint: "var is function-scoped and hoisted with undefined. let is block-scoped, hoisted but in the TDZ. const is block-scoped, must be initialised, and cannot be reassigned. Both let and const were introduced in ES6. Use const by default, let when needed, and avoid var.",
      },
      {
        question: "What is the Temporal Dead Zone (TDZ)?",
        difficulty: "Medium",
        hint: "The TDZ is the time between entering a scope where a let/const variable is declared and the actual declaration line. Accessing the variable in this zone throws a ReferenceError. It exists because let/const are hoisted but not initialised — unlike var which is hoisted with undefined.",
      },
      {
        question:
          "If const prevents reassignment, how can you modify a const object or array?",
        difficulty: "Medium",
        hint: "const prevents reassigning the variable binding (the reference), not mutating the value it points to. A const object can have properties added, changed, or deleted. A const array can be pushed to, popped, or have elements modified. To truly freeze an object, use Object.freeze().",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Data Types
  // ─────────────────────────────────────────────
  {
    id: "javascript-data-types",
    title: "Data Types",
    slug: "javascript-data-types",
    icon: "Database",
    difficulty: "Beginner",
    description:
      "Explore JavaScript's primitive and reference data types — number, string, boolean, null, undefined, symbol, bigint, and objects.",
    concept: {
      explanation:
        "JavaScript has two categories of data types: primitives and reference types. Primitives are immutable values stored directly in the variable — there are seven: Number (integers and floats), String (text), Boolean (true/false), null (intentional absence of value), undefined (not yet assigned), Symbol (unique identifiers), and BigInt (arbitrarily large integers). Reference types (objects, arrays, functions) store a reference (memory address) to the actual data on the heap. This distinction matters: primitives are compared by value, while objects are compared by reference. JavaScript is dynamically typed, meaning variables can hold any type at any time. The typeof operator reveals a value's type at runtime.",
      realLifeAnalogy:
        "Primitives are like sticky notes — each note holds a simple piece of information (a number, a name). If you copy a sticky note, you get an independent copy; changing one does not affect the other. Reference types are like business cards pointing to an office address — if two people have cards pointing to the same office, any change made inside that office is seen by both. The office (object) is shared; the cards (references) just point to it.",
      keyPoints: [
        "JavaScript has 7 primitive types: Number, String, Boolean, null, undefined, Symbol, BigInt",
        "Reference types include Objects, Arrays, Functions, Maps, Sets, and more",
        "Primitives are immutable and compared by value",
        "Objects are mutable and compared by reference",
        "typeof returns a string indicating the type — but typeof null is 'object' (historical bug)",
        "typeof function returns 'function' even though functions are objects",
        "NaN (Not a Number) is of type number — use Number.isNaN() to check for it",
        "Dynamic typing means a variable can change types: let x = 5; x = 'hello'; is valid",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== JavaScript Data Types =====

// ── Primitive Types ─────────────────────────

// Number (integers and floats)
let integer = 42;
let float = 3.14;
let negative = -10;
let infinity = Infinity;
let notANumber = NaN;
console.log("Number examples:");
console.log("  integer:", integer, "| type:", typeof integer);
console.log("  float:", float, "| type:", typeof float);
console.log("  NaN:", notANumber, "| type:", typeof notANumber);
console.log("  NaN === NaN:", NaN === NaN);  // false!
console.log("  Number.isNaN(NaN):", Number.isNaN(NaN));

// String
let single = 'Hello';
let double = "World";
let template = \`\${single}, \${double}!\`;
console.log("\\nString examples:");
console.log("  template:", template);
console.log("  length:", template.length);
console.log("  type:", typeof template);

// Boolean
let isActive = true;
let isDeleted = false;
console.log("\\nBoolean examples:");
console.log("  isActive:", isActive, "| type:", typeof isActive);

// null
let empty = null;
console.log("\\nnull:");
console.log("  value:", empty);
console.log("  typeof null:", typeof empty);  // "object" (bug!)
console.log("  empty === null:", empty === null);

// undefined
let notAssigned;
console.log("\\nundefined:");
console.log("  value:", notAssigned);
console.log("  typeof:", typeof notAssigned);

// Symbol
let sym1 = Symbol("id");
let sym2 = Symbol("id");
console.log("\\nSymbol:");
console.log("  sym1:", sym1.toString());
console.log("  sym1 === sym2:", sym1 === sym2);  // false — always unique

// BigInt
let bigNumber = 9007199254740991n;
console.log("\\nBigInt:");
console.log("  value:", bigNumber.toString());
console.log("  type:", typeof bigNumber);

// ── Reference Types ─────────────────────────
console.log("\\n--- Reference Types ---");

// Object
let person = { name: "Alice", age: 25 };
console.log("Object:", person);

// Array
let colors = ["red", "green", "blue"];
console.log("Array:", colors);
console.log("  typeof array:", typeof colors);     // "object"
console.log("  Array.isArray:", Array.isArray(colors)); // true

// Function
function greet(name) {
  return "Hello, " + name;
}
console.log("Function:", typeof greet);  // "function"
console.log("  greet('Bob'):", greet("Bob"));

// ── Value vs Reference ──────────────────────
console.log("\\n--- Value vs Reference ---");

// Primitives: copied by value
let a = 10;
let b = a;
b = 20;
console.log("a:", a, "b:", b);  // a is still 10

// Objects: copied by reference
let obj1 = { x: 1 };
let obj2 = obj1;
obj2.x = 99;
console.log("obj1:", obj1, "obj2:", obj2);  // both show x: 99
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the difference between primitive and reference types in JavaScript?",
        difficulty: "Easy",
        hint: "Primitives (number, string, boolean, null, undefined, symbol, bigint) are immutable, stored directly in the variable, and compared by value. Reference types (objects, arrays, functions) store a pointer to the data in memory and are compared by reference. Copying a primitive creates an independent copy; copying an object copies the reference, not the data.",
      },
      {
        question: "Why does typeof null return 'object'? Is null an object?",
        difficulty: "Easy",
        hint: "This is a historical bug from JavaScript's first implementation. The original type tagging system used bit patterns, and null's bit pattern matched the one used for objects. null is NOT an object — it is its own primitive type. This bug has never been fixed because changing it would break existing code.",
      },
      {
        question: "What is the difference between null and undefined?",
        difficulty: "Medium",
        hint: "undefined means a variable has been declared but not assigned a value — the engine sets it automatically. null is an intentional assignment meaning 'no value' — the developer sets it explicitly. Both represent absence of value but for different reasons. null == undefined is true (loose equality), but null === undefined is false (strict equality).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Operators
  // ─────────────────────────────────────────────
  {
    id: "javascript-operators",
    title: "Operators",
    slug: "javascript-operators",
    icon: "Calculator",
    difficulty: "Beginner",
    description:
      "Master JavaScript operators — arithmetic, assignment, comparison, logical, and ternary — and understand operator precedence.",
    concept: {
      explanation:
        "Operators are symbols that tell JavaScript to perform specific operations on values. Arithmetic operators (+, -, *, /, %, **) perform math. Assignment operators (=, +=, -=, *=, /=) store values in variables. Comparison operators (==, ===, !=, !==, >, <, >=, <=) compare two values and return a boolean. Strict equality (===) checks both value and type without coercion, while loose equality (==) converts types first. Logical operators (&&, ||, !) combine boolean expressions — && and || short-circuit, meaning they stop evaluating as soon as the result is determined. The nullish coalescing operator (??) returns the right operand only if the left is null or undefined. The ternary operator (condition ? a : b) is a concise if-else expression.",
      realLifeAnalogy:
        "Operators are like the action verbs in a recipe. Arithmetic operators are 'add 2 cups', 'divide in half'. Comparison operators are the chef tasting and asking 'is this sweet enough?' (true/false). Logical operators combine checks: 'if the oven is hot AND the timer has gone off, take out the cake'. The ternary operator is a quick decision: 'is it raining? take an umbrella : wear sunglasses'.",
      keyPoints: [
        "Always prefer === over == to avoid unexpected type coercion",
        "+ with strings performs concatenation: '5' + 3 gives '53'",
        "** is the exponentiation operator: 2 ** 3 gives 8",
        "&& returns the first falsy value or the last value if all are truthy",
        "|| returns the first truthy value or the last value if all are falsy",
        "?? (nullish coalescing) only triggers on null or undefined, not on 0 or ''",
        "The ternary operator is an expression — it returns a value",
        "Operator precedence determines evaluation order — use parentheses when unsure",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== JavaScript Operators =====

// ── Arithmetic Operators ────────────────────
console.log("--- Arithmetic ---");
console.log("5 + 3 =", 5 + 3);     // 8
console.log("10 - 4 =", 10 - 4);   // 6
console.log("3 * 7 =", 3 * 7);     // 21
console.log("15 / 4 =", 15 / 4);   // 3.75
console.log("15 % 4 =", 15 % 4);   // 3 (remainder)
console.log("2 ** 3 =", 2 ** 3);   // 8 (exponentiation)

// ── Assignment Operators ────────────────────
console.log("\\n--- Assignment ---");
let x = 10;
x += 5;   console.log("x += 5:", x);   // 15
x -= 3;   console.log("x -= 3:", x);   // 12
x *= 2;   console.log("x *= 2:", x);   // 24
x /= 4;   console.log("x /= 4:", x);   // 6
x %= 4;   console.log("x %= 4:", x);   // 2

// ── Comparison Operators ────────────────────
console.log("\\n--- Comparison ---");
console.log("5 == '5':", 5 == '5');    // true (loose — coerces types)
console.log("5 === '5':", 5 === '5');  // false (strict — different types)
console.log("5 != '5':", 5 != '5');    // false
console.log("5 !== '5':", 5 !== '5');  // true
console.log("10 > 5:", 10 > 5);       // true
console.log("10 <= 10:", 10 <= 10);    // true

// ── Logical Operators ───────────────────────
console.log("\\n--- Logical ---");
console.log("true && false:", true && false);   // false
console.log("true || false:", true || false);   // true
console.log("!true:", !true);                   // false

// Short-circuit evaluation
let user = null;
let name = user && user.name;     // null (short-circuits)
console.log("Short-circuit &&:", name);

let fallback = null || "default";  // "default"
console.log("Short-circuit ||:", fallback);

// ── Nullish Coalescing (??) ─────────────────
console.log("\\n--- Nullish Coalescing ---");
let value1 = null ?? "fallback";
let value2 = 0 ?? "fallback";
let value3 = "" ?? "fallback";
console.log("null ??:", value1);    // "fallback"
console.log("0 ??:", value2);      // 0 (not null/undefined)
console.log("'' ??:", value3);     // "" (not null/undefined)

// Compare with ||
console.log("0 ||:", 0 || "fallback");   // "fallback" (0 is falsy)

// ── Ternary Operator ────────────────────────
console.log("\\n--- Ternary ---");
let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log("Age", age, "is:", status);

let score = 85;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
console.log("Score", score, "grade:", grade);
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the difference between == and === in JavaScript?",
        difficulty: "Easy",
        hint: "== (loose equality) performs type coercion before comparing — it converts both values to the same type. === (strict equality) compares both value AND type without any conversion. 5 == '5' is true but 5 === '5' is false. Always prefer === to avoid unexpected coercion bugs.",
      },
      {
        question:
          "What is short-circuit evaluation with && and || operators?",
        difficulty: "Medium",
        hint: "&& stops at the first falsy value and returns it (or the last value if all truthy). || stops at the first truthy value and returns it (or the last value if all falsy). This is used for patterns like: obj && obj.method() (safe access) and value || 'default' (fallback values).",
      },
      {
        question:
          "What is the difference between || and ?? operators?",
        difficulty: "Medium",
        hint: "|| returns the right operand for any falsy left operand (false, 0, '', null, undefined, NaN). ?? returns the right operand ONLY if the left is null or undefined. So 0 || 'default' gives 'default', but 0 ?? 'default' gives 0. Use ?? when 0 or '' are valid values.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Type Conversion
  // ─────────────────────────────────────────────
  {
    id: "javascript-type-conversion",
    title: "Type Conversion",
    slug: "javascript-type-conversion",
    icon: "ArrowLeftRight",
    difficulty: "Beginner",
    description:
      "Understand implicit (coercion) and explicit type conversion between strings, numbers, and booleans in JavaScript.",
    concept: {
      explanation:
        "Type conversion is changing a value from one type to another. JavaScript has two kinds: explicit conversion (you intentionally convert using functions like Number(), String(), Boolean()) and implicit coercion (the engine automatically converts types during operations). Implicit coercion is one of JavaScript's most confusing features. The + operator with a string converts the other operand to a string ('5' + 3 gives '53'). Arithmetic operators other than + convert strings to numbers ('5' - 3 gives 2). Comparison with == triggers coercion while === does not. Every value has a 'truthy' or 'falsy' nature: falsy values are false, 0, -0, '', null, undefined, and NaN — everything else is truthy. Understanding type conversion prevents subtle bugs.",
      realLifeAnalogy:
        "Type conversion is like currency exchange. Explicit conversion is going to an exchange counter and deliberately changing dollars to euros — you know exactly what you are doing. Implicit coercion is like visiting a country where the shopkeeper silently converts your dollars to local currency at their rate — sometimes convenient, sometimes surprising. You might hand over $5 and a receipt '3' and get back '53' (concatenation) instead of 8 (addition). Knowing the 'exchange rules' prevents nasty surprises.",
      keyPoints: [
        "Explicit conversion: Number('5') gives 5, String(123) gives '123', Boolean(0) gives false",
        "Number('') gives 0, Number(null) gives 0, Number(undefined) gives NaN",
        "The + operator with a string triggers string concatenation, not addition",
        "Other arithmetic operators (-, *, /) convert strings to numbers",
        "Falsy values: false, 0, -0, '', null, undefined, NaN — everything else is truthy",
        "Boolean([]) is true and Boolean({}) is true — empty arrays and objects are truthy",
        "parseInt() and parseFloat() parse numbers from strings: parseInt('42px') gives 42",
        "Use === to avoid implicit coercion in comparisons",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Type Conversion in JavaScript =====

// ── Explicit Conversion ─────────────────────
console.log("--- Explicit Conversion ---");

// To Number
console.log("Number('42'):", Number("42"));         // 42
console.log("Number('3.14'):", Number("3.14"));     // 3.14
console.log("Number(''):", Number(""));             // 0
console.log("Number('hello'):", Number("hello"));   // NaN
console.log("Number(true):", Number(true));         // 1
console.log("Number(false):", Number(false));       // 0
console.log("Number(null):", Number(null));         // 0
console.log("Number(undefined):", Number(undefined)); // NaN

// To String
console.log("\\nString(42):", String(42));           // "42"
console.log("String(true):", String(true));         // "true"
console.log("String(null):", String(null));         // "null"
console.log("String(undefined):", String(undefined)); // "undefined"

// To Boolean
console.log("\\nBoolean(1):", Boolean(1));           // true
console.log("Boolean(0):", Boolean(0));             // false
console.log("Boolean(''):", Boolean(""));           // false
console.log("Boolean('hello'):", Boolean("hello")); // true
console.log("Boolean(null):", Boolean(null));       // false
console.log("Boolean([]):", Boolean([]));           // true (!)
console.log("Boolean({}):", Boolean({}));           // true (!)

// ── Implicit Coercion (Automatic) ───────────
console.log("\\n--- Implicit Coercion ---");

// + with string = concatenation
console.log("'5' + 3:", '5' + 3);           // "53"
console.log("'5' + true:", '5' + true);     // "5true"

// Other operators convert to number
console.log("'10' - 3:", '10' - 3);         // 7
console.log("'6' * 2:", '6' * 2);           // 12
console.log("'8' / 2:", '8' / 2);           // 4
console.log("true + 1:", true + 1);         // 2
console.log("false + 1:", false + 1);       // 1

// ── Truthy and Falsy ────────────────────────
console.log("\\n--- Falsy Values ---");
let falsyValues = [false, 0, -0, "", null, undefined, NaN];
falsyValues.forEach((val, i) => {
  console.log(\`  \${i}. \${String(val)} is falsy:\`, !val);
});

console.log("\\n--- Truthy Surprises ---");
console.log("Boolean('0'):", Boolean("0"));       // true (non-empty string)
console.log("Boolean('false'):", Boolean("false")); // true (non-empty string)
console.log("Boolean([]):", Boolean([]));           // true (object)
console.log("Boolean({}):", Boolean({}));           // true (object)

// ── parseInt and parseFloat ─────────────────
console.log("\\n--- parseInt / parseFloat ---");
console.log("parseInt('42px'):", parseInt("42px"));       // 42
console.log("parseInt('0xFF', 16):", parseInt("0xFF", 16)); // 255
console.log("parseFloat('3.14m'):", parseFloat("3.14m")); // 3.14
console.log("parseInt('hello'):", parseInt("hello"));     // NaN
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the difference between implicit and explicit type conversion?",
        difficulty: "Easy",
        hint: "Explicit conversion is when you intentionally convert types using functions like Number(), String(), Boolean(). Implicit coercion happens automatically when the engine needs to convert types during an operation — like '5' + 3 becoming '53'. Explicit is predictable and clear; implicit can cause bugs.",
      },
      {
        question: "What are falsy values in JavaScript? Name all of them.",
        difficulty: "Easy",
        hint: "There are exactly 7 falsy values: false, 0, -0, '' (empty string), null, undefined, and NaN. Everything else is truthy — including empty arrays [], empty objects {}, and the string '0'. This is important for conditional checks and Boolean coercion.",
      },
      {
        question:
          "Why does '5' + 3 give '53' but '5' - 3 give 2?",
        difficulty: "Medium",
        hint: "The + operator is overloaded in JavaScript — it does both addition and string concatenation. If either operand is a string, + concatenates. The - operator only does subtraction, so it converts both operands to numbers. '5' + 3 triggers string concatenation giving '53'. '5' - 3 triggers numeric conversion giving 2.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. JavaScript Comments
  // ─────────────────────────────────────────────
  {
    id: "javascript-comments",
    title: "JavaScript Comments",
    slug: "javascript-comments",
    icon: "MessageSquare",
    difficulty: "Beginner",
    description:
      "Learn how to use single-line and multi-line comments in JavaScript to document code, disable code temporarily, and write clear explanations.",
    concept: {
      explanation:
        "Comments are notes in your code that the JavaScript engine completely ignores during execution. They exist solely for humans — to explain what the code does, why a decision was made, or to temporarily disable code during debugging. JavaScript supports two types of comments: single-line comments start with // and continue to the end of the line; multi-line comments start with /* and end with */ and can span multiple lines. A special variant, JSDoc comments (/** ... */), is used to document functions with structured annotations like @param and @returns that tools can parse. Good comments explain why, not what — the code itself should be readable enough to explain what it does. Over-commenting obvious code adds noise; under-commenting complex logic makes code hard to maintain.",
      realLifeAnalogy:
        "Comments are like sticky notes on a recipe. The recipe instructions (code) tell you what to do. The sticky notes (comments) explain why you are doing it: 'Grandma says this step is crucial for flavour' or 'Skip this if using almond flour'. You would not put a sticky note saying 'add sugar' right next to the instruction that says 'add sugar' — that is over-commenting. But you would add a note saying 'do NOT use metal bowl here — it reacts with the acid' because that is not obvious from the instructions.",
      keyPoints: [
        "Single-line comments use // — everything after it on that line is ignored",
        "Multi-line comments use /* ... */ — they can span multiple lines",
        "Comments are completely ignored by the JavaScript engine",
        "Good comments explain WHY, not WHAT — the code should explain what",
        "Use comments to document complex logic, workarounds, and business rules",
        "JSDoc comments (/** ... */) provide structured documentation for functions",
        "Avoid commented-out code in production — use version control instead",
        "Too many comments can make code harder to read — comment thoughtfully",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== JavaScript Comments =====

// ── Single-Line Comments ────────────────────
// This is a single-line comment
let name = "Alice";  // inline comment after code
console.log("Name:", name);

// ── Multi-Line Comments ─────────────────────
/*
  This is a multi-line comment.
  It can span across several lines.
  Useful for longer explanations.
*/
let score = 95;
console.log("Score:", score);

/* You can also use multi-line syntax on one line */
let grade = "A";
console.log("Grade:", grade);

// ── Comments for Documentation ──────────────
/**
 * Calculates the area of a rectangle.
 * @param {number} width - The width of the rectangle
 * @param {number} height - The height of the rectangle
 * @returns {number} The area of the rectangle
 */
function calculateArea(width, height) {
  return width * height;
}
console.log("\\nArea (5x3):", calculateArea(5, 3));

// ── Good vs Bad Comments ────────────────────

// BAD: States the obvious
let count = 0; // set count to 0

// GOOD: Explains WHY
let retryLimit = 3; // API is flaky; 3 retries covers 99.7% of transient failures

// BAD: Repeats the code
// increment count by 1
count = count + 1;

// GOOD: Explains business logic
// Users get a 15-day grace period after subscription expires
let gracePeriodDays = 15;
console.log("Grace period:", gracePeriodDays, "days");

// ── Commenting Out Code for Debugging ───────
let total = 100;
// let discount = 20;   // temporarily disabled for testing
// total = total - discount;
console.log("\\nTotal:", total);

// ── Nested Comments (not allowed) ───────────
// /* This /* will */ cause problems */
// The inner */ ends the comment early — avoid nesting multi-line comments

console.log("\\nComments do not appear in the output!");
console.log("They are for developers, not for the browser.");
`,
    },
    interviewQuestions: [
      {
        question:
          "What are the types of comments in JavaScript and when should you use each?",
        difficulty: "Easy",
        hint: "JavaScript has single-line comments (//) for brief notes and inline explanations, and multi-line comments (/* */) for longer explanations. JSDoc comments (/** */) are a special multi-line format for documenting functions with @param and @returns tags. Use comments to explain why, not what.",
      },
      {
        question:
          "What is JSDoc and why is it useful?",
        difficulty: "Easy",
        hint: "JSDoc is a documentation syntax using /** */ comments with special tags like @param, @returns, @type, and @example. It allows IDEs to provide autocomplete and type hints. Tools can generate documentation websites from JSDoc comments. It serves as a lightweight type system for plain JavaScript.",
      },
      {
        question: "What makes a good comment vs a bad comment?",
        difficulty: "Easy",
        hint: "Good comments explain WHY something is done, document non-obvious behaviour, explain business logic, and warn about potential gotchas. Bad comments restate what the code does (obvious from reading it), are outdated or wrong, or are large blocks of commented-out code (use version control instead).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. JavaScript Input and Output
  // ─────────────────────────────────────────────
  {
    id: "javascript-input-output",
    title: "JavaScript Input and Output",
    slug: "javascript-input-output",
    icon: "Terminal",
    difficulty: "Beginner",
    description:
      "Learn how JavaScript handles output (console.log, alert, document.write) and input (prompt, confirm) in both browser and Node.js environments.",
    concept: {
      explanation:
        "JavaScript provides several ways to display output and receive input. For output: console.log() prints to the developer console and is the primary debugging tool; console.warn() and console.error() print with different severity levels; console.table() displays data in a table format; alert() shows a popup dialog in the browser; document.write() writes directly into the HTML document (rarely used in modern code). For input: prompt() shows a dialog asking the user for text input and returns a string (or null if cancelled); confirm() shows a Yes/No dialog and returns a boolean. In Node.js, input is handled differently through readline or process.stdin. The console object has many useful methods beyond log — including time/timeEnd for performance measurement, group/groupEnd for nested output, and assert for conditional logging.",
      realLifeAnalogy:
        "Think of output methods as different ways to communicate. console.log() is like writing in a personal notebook (the developer console) — only you see it. alert() is like shouting through a megaphone — everyone notices, and everything stops until you are done. document.write() is like painting directly on a wall — it works but is messy and overwrites what was there. prompt() is like handing someone a form to fill out. confirm() is like asking a yes-or-no question.",
      keyPoints: [
        "console.log() is the most common way to output data for debugging",
        "console.warn() and console.error() show messages with different severity levels",
        "console.table() displays arrays and objects as formatted tables",
        "alert() pauses execution and shows a popup — avoid in production code",
        "prompt() returns user input as a string, or null if cancelled",
        "confirm() returns true (OK) or false (Cancel)",
        "document.write() overwrites the entire page if called after loading — avoid it",
        "console.time() and console.timeEnd() measure code execution time",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== JavaScript Input and Output =====

// ── console.log — Primary Output ────────────
console.log("Hello, JavaScript!");
console.log("Multiple values:", 42, true, [1, 2, 3]);
console.log("Template literal:", \`2 + 3 = \${2 + 3}\`);

// ── console.warn and console.error ──────────
console.warn("This is a warning message");
console.error("This is an error message");

// ── console.table — Display Data ────────────
let students = [
  { name: "Alice", grade: "A" },
  { name: "Bob", grade: "B" },
  { name: "Charlie", grade: "A" },
];
console.log("\\nStudent data:");
console.table(students);

// ── console.group — Nested Output ───────────
console.group("User Details");
console.log("Name: Alice");
console.log("Age: 25");
console.log("Role: Developer");
console.groupEnd();

// ── console.time — Performance ──────────────
console.time("loop");
let sum = 0;
for (let i = 0; i < 100000; i++) {
  sum += i;
}
console.timeEnd("loop");
console.log("Sum:", sum);

// ── console.assert — Conditional Logging ────
console.assert(5 > 3, "This won't show because 5 > 3 is true");
console.assert(5 < 3, "This WILL show because 5 < 3 is false");

// ── console.count — Counting ────────────────
for (let i = 0; i < 3; i++) {
  console.count("loop iteration");
}

// ── String Formatting ───────────────────────
console.log("\\n--- Formatting ---");
let price = 9.99;
console.log("Price: $" + price.toFixed(2));
console.log(\`Formatted: \${price.toLocaleString("en-US", { style: "currency", currency: "USD" })}\`);

// ── typeof with output ──────────────────────
console.log("\\n--- Type Checking Output ---");
let values = [42, "hello", true, null, undefined, [], {}];
values.forEach(val => {
  console.log(\`  \${String(val)} -> \${typeof val}\`);
});

// Note: prompt(), confirm(), and alert() work in browsers
// but not in this code editor. They are browser-only APIs.
// Example (browser only):
// let userName = prompt("What is your name?");
// let isConfirmed = confirm("Are you sure?");
// alert("Hello, " + userName);
`,
    },
    interviewQuestions: [
      {
        question:
          "What are the different console methods in JavaScript and when would you use each?",
        difficulty: "Easy",
        hint: "console.log() for general output, console.warn() for warnings (yellow), console.error() for errors (red), console.table() for tabular data, console.time()/timeEnd() for performance, console.group()/groupEnd() for nested output, console.assert() for conditional logging, console.count() for counting occurrences.",
      },
      {
        question:
          "What is the difference between prompt(), confirm(), and alert()?",
        difficulty: "Easy",
        hint: "alert() displays a message with OK button — no return value. prompt() displays a message with a text input field — returns the entered string or null if cancelled. confirm() displays a message with OK and Cancel buttons — returns true or false. All three block JavaScript execution until dismissed. They are browser-only APIs.",
      },
      {
        question: "Why should you avoid document.write() in modern JavaScript?",
        difficulty: "Medium",
        hint: "document.write() writes directly to the HTML document stream. If called after the page has finished loading, it overwrites the entire document content. It cannot be used with XHTML, it blocks page rendering, and it interferes with the DOM. Modern alternatives are DOM manipulation methods like textContent, innerHTML, or createElement().",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. JavaScript Statements
  // ─────────────────────────────────────────────
  {
    id: "javascript-statements",
    title: "JavaScript Statements",
    slug: "javascript-statements",
    icon: "List",
    difficulty: "Beginner",
    description:
      "Understand the different types of JavaScript statements — declarations, conditionals, loops, and control flow — and how the engine executes them.",
    concept: {
      explanation:
        "A JavaScript program is a sequence of statements — instructions that the engine executes one by one, top to bottom. There are several categories of statements: Declaration statements (let, const, var, function) create identifiers. Expression statements evaluate an expression and discard the result (like a function call). Conditional statements (if/else, switch) choose which code to execute based on a condition. Loop statements (for, while, do...while, for...of, for...in) repeat code. Jump statements (break, continue, return, throw) alter the flow of execution. Block statements group multiple statements inside { } — they do not create a new scope for var but do for let/const. Understanding statement types helps you structure programs logically and predict how JavaScript will execute your code.",
      realLifeAnalogy:
        "Statements are like steps in a recipe. Declaration statements are gathering your ingredients ('Get flour, sugar, eggs'). Conditional statements are decision points ('If the batter is too thick, add more milk'). Loop statements are repetitions ('Stir 50 times'). Jump statements change the flow ('If it burns, stop immediately and start over'). The engine follows the recipe line by line, making decisions and repeating steps as instructed.",
      keyPoints: [
        "JavaScript executes statements top to bottom, one at a time",
        "Declaration statements: let, const, var, function, class",
        "Conditional statements: if/else, switch, ternary (expression)",
        "Loop statements: for, while, do...while, for...of, for...in",
        "Jump statements: break, continue, return, throw",
        "Block statements { } group code — they create scope for let/const but not var",
        "An empty statement is just a semicolon: ;",
        "Expression statements are expressions used as statements (like function calls)",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== JavaScript Statements =====

// ── Declaration Statements ──────────────────
let age = 25;                    // variable declaration
const name = "Alice";            // constant declaration
function greet(n) { return "Hi, " + n; }  // function declaration
console.log("Declaration:", greet(name));

// ── Expression Statements ───────────────────
console.log("\\n--- Expression Statements ---");
Math.max(10, 20);   // function call (result discarded)
let result = Math.max(10, 20);   // result stored
console.log("Max:", result);

// ── Conditional Statements ──────────────────
console.log("\\n--- if/else ---");
let score = 85;
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}

// switch statement
console.log("\\n--- switch ---");
let day = "Monday";
switch (day) {
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
  case "Friday":
    console.log(day, "is a weekday");
    break;
  case "Saturday":
  case "Sunday":
    console.log(day, "is a weekend");
    break;
  default:
    console.log("Unknown day");
}

// ── Loop Statements ─────────────────────────
console.log("\\n--- for loop ---");
for (let i = 1; i <= 5; i++) {
  console.log("  Count:", i);
}

console.log("\\n--- while loop ---");
let count = 3;
while (count > 0) {
  console.log("  Countdown:", count);
  count--;
}

console.log("\\n--- do...while ---");
let num = 0;
do {
  console.log("  do...while:", num);
  num++;
} while (num < 3);

console.log("\\n--- for...of (arrays) ---");
let fruits = ["apple", "banana", "cherry"];
for (let fruit of fruits) {
  console.log("  Fruit:", fruit);
}

console.log("\\n--- for...in (objects) ---");
let person = { name: "Bob", age: 30, role: "Dev" };
for (let key in person) {
  console.log(\`  \${key}: \${person[key]}\`);
}

// ── Jump Statements ─────────────────────────
console.log("\\n--- break ---");
for (let i = 1; i <= 10; i++) {
  if (i === 5) break;  // exit the loop
  console.log("  i:", i);
}

console.log("\\n--- continue ---");
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;  // skip this iteration
  console.log("  i:", i);
}
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between for...of and for...in loops?",
        difficulty: "Easy",
        hint: "for...of iterates over the VALUES of an iterable (arrays, strings, Maps, Sets). for...in iterates over the KEYS (property names) of an object. Use for...of for arrays and for...in for objects. Using for...in on arrays can produce unexpected results because it iterates over all enumerable properties, including inherited ones.",
      },
      {
        question:
          "What is the difference between break and continue?",
        difficulty: "Easy",
        hint: "break exits the loop entirely — no more iterations. continue skips the rest of the current iteration and moves to the next one. Both can be used with labels to affect outer loops in nested loop scenarios.",
      },
      {
        question:
          "When should you use a switch statement vs if/else chains?",
        difficulty: "Medium",
        hint: "Use switch when comparing a single variable against multiple discrete values — it is cleaner and can be faster due to jump table optimisation. Use if/else for range comparisons, complex conditions, or when each condition tests different variables. Remember that switch uses strict comparison (===) and requires break statements to prevent fall-through.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. Strict Mode
  // ─────────────────────────────────────────────
  {
    id: "javascript-strict-mode",
    title: "Strict Mode",
    slug: "javascript-strict-mode",
    icon: "ShieldCheck",
    difficulty: "Beginner",
    description:
      "Learn about JavaScript's strict mode — what it does, how to enable it, and why it helps you write safer, cleaner code.",
    concept: {
      explanation:
        "Strict mode is a way to opt in to a restricted variant of JavaScript that catches common coding mistakes and prevents certain unsafe actions. You enable it by adding the string 'use strict' at the top of a script or function. In strict mode: assigning to an undeclared variable throws a ReferenceError (instead of silently creating a global); assigning to read-only properties throws a TypeError; deleting undeletable properties throws; duplicate parameter names are not allowed; octal literals (like 010) are not allowed; the with statement is forbidden; and this in functions called without an object is undefined (not the global object). ES6 modules and classes are automatically in strict mode. Strict mode helps you catch bugs early, makes code more optimisable by engines, and is considered best practice for all new JavaScript code.",
      realLifeAnalogy:
        "Strict mode is like having a strict teacher in a classroom. Without strict mode, the teacher (JavaScript engine) is lenient — if you make a spelling mistake on a variable name, they quietly assume you meant to create a new one. With strict mode, the teacher immediately points out every mistake: 'You did not declare that variable!', 'You cannot delete that!', 'You used duplicate parameter names!'. Strict mode forces you to write clean, intentional code.",
      keyPoints: [
        "Enable with 'use strict'; at the top of a script or function body",
        "Prevents accidental global variables — undeclared assignments throw ReferenceError",
        "Makes assignments to read-only properties throw TypeError",
        "Forbids duplicate function parameter names",
        "Disallows the with statement",
        "this is undefined in functions called without context (not the global object)",
        "ES6 modules and classes are automatically in strict mode",
        "Strict mode makes code easier for engines to optimise",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== JavaScript Strict Mode =====

// Enable strict mode for the entire script
"use strict";

// ── 1. Must declare variables ───────────────
console.log("--- Must Declare Variables ---");
let properlyDeclared = "I am declared with let";
console.log(properlyDeclared);

// Without strict mode, this would silently create a global:
// undeclaredVar = "oops";  // ReferenceError in strict mode!
// console.log("This line won't run if above is uncommented");

// ── 2. Read-only properties ─────────────────
console.log("\\n--- Read-only Properties ---");
let obj = {};
Object.defineProperty(obj, "readOnly", {
  value: 42,
  writable: false,
});
console.log("readOnly:", obj.readOnly);
// obj.readOnly = 100;  // TypeError in strict mode!
console.log("Cannot reassign read-only properties");

// ── 3. Deleting undeletable properties ──────
console.log("\\n--- Deleting Built-ins ---");
// delete Object.prototype;  // TypeError in strict mode!
console.log("Cannot delete Object.prototype");

// ── 4. Duplicate parameters (not allowed) ───
console.log("\\n--- No Duplicate Parameters ---");
// This would be an error in strict mode:
// function add(a, a) { return a + a; }  // SyntaxError!

// Correct way:
function add(a, b) { return a + b; }
console.log("add(3, 5):", add(3, 5));

// ── 5. 'this' in functions ──────────────────
console.log("\\n--- 'this' in strict mode ---");
function showThis() {
  // In strict mode, 'this' is undefined when called without context
  // In non-strict mode, 'this' would be the global object (window)
  console.log("this is:", typeof this);  // "undefined"
}
showThis();

// With an object, 'this' still works normally
let user = {
  name: "Alice",
  greet: function() {
    console.log("Hello, I am", this.name);
  }
};
user.greet();  // "Hello, I am Alice"

// ── 6. Octal literals ──────────────────────
console.log("\\n--- Octal Literals ---");
// let octal = 010;  // SyntaxError in strict mode!
let octal = 0o10;    // Use 0o prefix for octals (ES6 syntax)
console.log("0o10 =", octal);  // 8

// ── 7. Function-level strict mode ───────────
function nonStrict() {
  // This function follows the script-level strict mode
  // But you can also add "use strict" to individual functions
  console.log("\\nFunction-level strict mode works too");
}
nonStrict();

// ── 8. Why use strict mode? ─────────────────
console.log("\\n--- Benefits ---");
console.log("1. Catches common coding mistakes early");
console.log("2. Prevents accidental global variables");
console.log("3. Makes 'this' safer in functions");
console.log("4. Forbids confusing syntax (with, octals)");
console.log("5. Helps engines optimise code better");
console.log("6. ES6 modules use strict mode by default");
`,
    },
    interviewQuestions: [
      {
        question: "What is strict mode in JavaScript and how do you enable it?",
        difficulty: "Easy",
        hint: "Strict mode is a restricted variant of JavaScript that catches common mistakes. Enable it by adding 'use strict'; at the top of a script file or function body. It must be the first statement (after comments). ES6 modules and classes are automatically in strict mode.",
      },
      {
        question:
          "What happens to 'this' in strict mode when a function is called without an explicit context?",
        difficulty: "Medium",
        hint: "In strict mode, 'this' is undefined when a function is called without an object context (plain function call). In non-strict mode, 'this' defaults to the global object (window in browsers, global in Node.js). This strict behaviour prevents accidental modification of the global object.",
      },
      {
        question:
          "Name three things that strict mode prevents or disallows.",
        difficulty: "Easy",
        hint: "1) Using undeclared variables (throws ReferenceError instead of creating globals). 2) Assigning to read-only or non-writable properties (throws TypeError). 3) Duplicate function parameter names (throws SyntaxError). Also: deleting undeletable properties, using the 'with' statement, and octal literal syntax.",
      },
    ],
  },

  // ═════════════════════════════════════════════
  // LEVEL 2 — Control Flow
  // ═════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 11. if else Statements
  // ─────────────────────────────────────────────
  {
    id: "if-else-statements",
    title: "if else Statements",
    slug: "if-else-statements",
    icon: "GitBranch",
    difficulty: "Beginner",
    description:
      "Learn how to make decisions in JavaScript using if, else if, and else — the most fundamental control flow structure.",
    concept: {
      explanation:
        "The if statement evaluates a condition (any expression that resolves to truthy or falsy) and executes a block of code only when that condition is true. You can chain else if to test additional conditions in order, and use a final else as a catch-all when none of the previous conditions matched. JavaScript evaluates the conditions top to bottom and enters the FIRST block whose condition is truthy — all remaining else if / else blocks are skipped. The condition inside the parentheses is automatically coerced to a boolean, so values like 0, '', null, undefined, and NaN are all falsy. You can nest if statements inside each other, but deep nesting hurts readability — consider early returns or guard clauses instead.",
      realLifeAnalogy:
        "Think of if/else like a traffic light system. The controller checks conditions in order: 'Is it time for green? Then let traffic through. Else if it is time for yellow? Warn drivers. Else (it must be red), stop traffic.' Only one light is active at a time, and the system checks from top to bottom. Just like JavaScript, once a condition matches, the rest are skipped.",
      keyPoints: [
        "if checks a condition — if truthy, the block runs; if falsy, it is skipped",
        "else if adds additional conditions checked in order (first match wins)",
        "else is the fallback — runs only when all previous conditions were false",
        "The condition is coerced to boolean — 0, '', null, undefined, NaN are falsy",
        "Only ONE branch executes in an if/else if/else chain",
        "Curly braces { } are optional for single statements but always recommended",
        "Avoid deep nesting — use early returns or guard clauses for cleaner code",
        "Combine conditions with && (and), || (or), ! (not) for complex checks",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== if / else if / else Statements =====

// ── Basic if ────────────────────────────────
let temperature = 35;

if (temperature > 30) {
  console.log("It's hot outside!");
}

// ── if / else ───────────────────────────────
let age = 17;

if (age >= 18) {
  console.log("You can vote.");
} else {
  console.log("You cannot vote yet.");
}

// ── if / else if / else ─────────────────────
let score = 75;
console.log("\\nScore:", score);

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}

// ── Multiple conditions with && and || ──────
let hour = 14;
let isWeekend = true;
console.log("\\nHour:", hour, "| Weekend:", isWeekend);

if (hour >= 9 && hour <= 17 && !isWeekend) {
  console.log("Office is open.");
} else {
  console.log("Office is closed.");
}

// ── Truthy / Falsy checks ───────────────────
let username = "Alice";
console.log("\\nUsername:", username);

if (username) {
  console.log("Welcome,", username);
} else {
  console.log("Please log in.");
}

// ── Guard clause pattern ────────────────────
function processOrder(order) {
  if (!order) {
    console.log("\\nNo order provided.");
    return;
  }
  if (!order.items || order.items.length === 0) {
    console.log("Order has no items.");
    return;
  }
  console.log("Processing", order.items.length, "items...");
}

processOrder(null);
processOrder({ items: [] });
processOrder({ items: ["book", "pen"] });
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between if/else and multiple separate if statements?",
        difficulty: "Easy",
        hint: "An if/else if/else chain is mutually exclusive — only the first matching branch runs. Separate if statements are independent — each one is evaluated regardless of whether a previous if was true. Use if/else when only one branch should execute; use separate if's when multiple conditions can be true simultaneously.",
      },
      {
        question: "What values are considered falsy in an if condition?",
        difficulty: "Easy",
        hint: "There are 7 falsy values: false, 0, -0, '' (empty string), null, undefined, and NaN. Everything else is truthy, including empty arrays [], empty objects {}, and the string '0'.",
      },
      {
        question: "What are guard clauses and why should you use them?",
        difficulty: "Medium",
        hint: "Guard clauses are early returns at the top of a function that handle edge cases or invalid inputs. Instead of nesting the main logic inside multiple if blocks, you check for failure conditions first and return early. This keeps the main logic at the top indentation level and makes the function easier to read.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 12. Switch Statements
  // ─────────────────────────────────────────────
  {
    id: "switch-statements",
    title: "Switch Statements",
    slug: "switch-statements",
    icon: "ListTree",
    difficulty: "Beginner",
    description:
      "Learn how to use switch for cleaner multi-way branching when comparing a single value against many possible cases.",
    concept: {
      explanation:
        "The switch statement evaluates an expression once and compares the result against multiple case values using strict equality (===). When a match is found, the code in that case block runs. The break statement exits the switch — without it, execution 'falls through' to the next case. A default case runs when no other case matches, similar to else in an if chain. Switch is ideal when you are comparing a single variable against many discrete values (like days of the week, menu options, or status codes). It can be more readable than long if/else if chains and may be optimised by the engine using jump tables.",
      realLifeAnalogy:
        "A switch statement is like a vending machine. You press a button (the expression), and the machine checks each slot label (case) to find a match. When it finds the right slot, it dispenses that item. The break is like the machine stopping after dispensing — without it, the machine would keep dispensing items from the slots below (fall-through). The default case is what happens when you press an invalid button: 'Item not found'.",
      keyPoints: [
        "switch uses strict equality (===) to compare — no type coercion",
        "Always include break to prevent fall-through (unless intentional)",
        "The default case is optional but recommended as a catch-all",
        "Fall-through can be intentional — group cases that share the same code",
        "switch only works well for discrete value comparisons, not ranges",
        "Each case value must be a constant or literal — no complex expressions",
        "switch is often cleaner than long if/else if chains for many discrete values",
        "You can declare variables inside case blocks using { } to create block scope",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Switch Statements =====

// ── Basic switch ────────────────────────────
let day = "Wednesday";
console.log("Day:", day);

switch (day) {
  case "Monday":
    console.log("Start of the work week");
    break;
  case "Tuesday":
    console.log("Second day");
    break;
  case "Wednesday":
    console.log("Midweek!");
    break;
  case "Thursday":
    console.log("Almost Friday");
    break;
  case "Friday":
    console.log("TGIF!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Invalid day");
}

// ── Fall-through (grouping cases) ───────────
console.log("\\n--- Seasons ---");
let month = "March";

switch (month) {
  case "December":
  case "January":
  case "February":
    console.log(month, "-> Winter");
    break;
  case "March":
  case "April":
  case "May":
    console.log(month, "-> Spring");
    break;
  case "June":
  case "July":
  case "August":
    console.log(month, "-> Summer");
    break;
  case "September":
  case "October":
  case "November":
    console.log(month, "-> Autumn");
    break;
  default:
    console.log("Unknown month");
}

// ── Switch with numbers ─────────────────────
console.log("\\n--- HTTP Status ---");
let status = 404;

switch (status) {
  case 200:
    console.log("OK — Request successful");
    break;
  case 301:
    console.log("Moved Permanently");
    break;
  case 404:
    console.log("Not Found — Resource missing");
    break;
  case 500:
    console.log("Internal Server Error");
    break;
  default:
    console.log("Status:", status);
}

// ── Switch vs if/else comparison ────────────
console.log("\\n--- When to use switch ---");
console.log("Use switch: discrete values (days, codes, types)");
console.log("Use if/else: ranges, complex conditions, boolean checks");

// Example: switch cannot do ranges easily
let score = 85;
// This requires if/else, not switch:
if (score >= 90) console.log("Grade A");
else if (score >= 80) console.log("Score", score, "-> Grade B");
else console.log("Below B");
`,
    },
    interviewQuestions: [
      {
        question: "What happens if you forget the break statement in a switch case?",
        difficulty: "Easy",
        hint: "Without break, execution 'falls through' to the next case and keeps running until it hits a break or the end of the switch. This can cause unintended behaviour. However, fall-through can be intentional — it is used to group multiple cases that should run the same code.",
      },
      {
        question: "When should you use switch instead of if/else?",
        difficulty: "Easy",
        hint: "Use switch when comparing a single variable against multiple discrete values (like status codes, day names, menu options). Use if/else for range comparisons (score >= 90), complex conditions (a && b || c), or when each condition tests different variables. Switch uses === strict comparison.",
      },
      {
        question: "Does switch use loose (==) or strict (===) equality?",
        difficulty: "Easy",
        hint: "Switch uses strict equality (===). This means case '5' will NOT match the number 5. The type must match exactly. This is different from if (x == value) which uses loose equality and coerces types.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 13. Ternary Operator
  // ─────────────────────────────────────────────
  {
    id: "ternary-operator",
    title: "Ternary Operator",
    slug: "ternary-operator",
    icon: "HelpCircle",
    difficulty: "Beginner",
    description:
      "Learn the concise conditional expression syntax — condition ? valueIfTrue : valueIfFalse — and when to use it instead of if/else.",
    concept: {
      explanation:
        "The ternary operator (? :) is JavaScript's only operator that takes three operands. It evaluates a condition and returns one of two values: the first if the condition is truthy, the second if falsy. Unlike if/else which is a statement, the ternary is an expression — it produces a value, so you can use it inside variable assignments, function arguments, template literals, and JSX. The syntax is: condition ? expressionIfTrue : expressionIfFalse. Keep ternaries simple — they shine for short, straightforward conditions. Nesting ternaries is possible but reduces readability; prefer if/else for complex logic.",
      realLifeAnalogy:
        "The ternary operator is like a quick yes-or-no decision card: 'Is it raining? Take umbrella : Wear sunglasses'. It is a one-liner decision maker. An if/else statement is like writing out a full decision document with paragraphs. When the decision is simple, the card (ternary) is faster and cleaner. When the decision is complex with multiple considerations, the document (if/else) is better.",
      keyPoints: [
        "Syntax: condition ? valueIfTrue : valueIfFalse",
        "It is an EXPRESSION (returns a value), unlike if/else which is a STATEMENT",
        "Perfect for simple conditional assignments: let status = age >= 18 ? 'adult' : 'minor'",
        "Can be used inside template literals: `Hello ${isAdmin ? 'Admin' : 'User'}`",
        "Widely used in React/JSX for conditional rendering",
        "Avoid nesting ternaries — they become hard to read quickly",
        "Do not use ternary for side effects (function calls) — use if/else instead",
        "The ternary always needs both branches — there is no 'ternary without else'",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Ternary Operator =====

// ── Basic usage ─────────────────────────────
let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log("Age:", age, "->", status);

// ── Comparison with if/else ─────────────────
// if/else version (statement):
let greeting1;
if (age >= 18) {
  greeting1 = "Welcome, adult!";
} else {
  greeting1 = "Welcome, youngster!";
}

// Ternary version (expression):
let greeting2 = age >= 18 ? "Welcome, adult!" : "Welcome, youngster!";
console.log(greeting1);
console.log(greeting2);  // same result, shorter code

// ── Inside template literals ────────────────
let isLoggedIn = true;
console.log(\`\\nUser is \${isLoggedIn ? "logged in" : "logged out"}\`);

// ── Conditional function arguments ──────────
let score = 85;
console.log("Result:", score >= 60 ? "PASS" : "FAIL");

// ── Assigning based on conditions ───────────
let hour = 14;
let period = hour < 12 ? "AM" : "PM";
let timeOfDay = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
console.log(\`\\nIt's \${hour}:00 \${period} — Good \${timeOfDay}!\`);

// ── Nested ternary (use sparingly!) ─────────
let grade = score >= 90 ? "A"
          : score >= 80 ? "B"
          : score >= 70 ? "C"
          : score >= 60 ? "D"
          : "F";
console.log("Score:", score, "-> Grade:", grade);

// ── When NOT to use ternary ─────────────────
console.log("\\n--- When to avoid ternary ---");

// BAD: Side effects in ternary
// isLoggedIn ? showDashboard() : redirectToLogin();  // Use if/else instead

// BAD: Complex logic
// a > b ? (c > d ? doX() : doY()) : (e > f ? doZ() : doW());

// GOOD: Simple value selection
let color = status === "adult" ? "green" : "orange";
console.log("Badge color:", color);

// ── Nullish fallback with ternary ───────────
let userName = null;
let displayName = userName ? userName : "Guest";
console.log("\\nDisplay name:", displayName);

// Better: use ?? operator for null/undefined
let displayName2 = userName ?? "Guest";
console.log("Display name (??): ", displayName2);
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between the ternary operator and an if/else statement?",
        difficulty: "Easy",
        hint: "The ternary is an expression — it returns a value and can be used inside assignments, template literals, and function arguments. if/else is a statement — it performs actions but does not return a value. Use ternary for simple value selection; use if/else for complex logic or side effects.",
      },
      {
        question: "When should you avoid using the ternary operator?",
        difficulty: "Easy",
        hint: "Avoid ternary when: the logic is complex or has multiple steps, you need to execute side effects (like function calls with no return), or when nesting ternaries would reduce readability. If a ternary is hard to read at a glance, switch to if/else.",
      },
      {
        question: "Can you use a ternary operator without the else part?",
        difficulty: "Easy",
        hint: "No — the ternary always requires both branches (condition ? trueValue : falseValue). If you only need the 'if' part, use a regular if statement or the short-circuit pattern: condition && doSomething().",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 14. for Loop
  // ─────────────────────────────────────────────
  {
    id: "for-loop",
    title: "for Loop",
    slug: "for-loop",
    icon: "Repeat",
    difficulty: "Beginner",
    description:
      "Master the for loop — JavaScript's most versatile loop for iterating a known number of times with initialization, condition, and update expressions.",
    concept: {
      explanation:
        "The for loop is the most common loop in JavaScript. It has three parts in its header: initialization (runs once before the loop starts), condition (checked before each iteration — loop continues while truthy), and update (runs after each iteration). The syntax is: for (init; condition; update) { body }. The for loop is ideal when you know how many times to iterate — counting, iterating arrays by index, or generating sequences. JavaScript also provides for...of (iterates values of iterables like arrays) and for...in (iterates keys of objects). The classic for loop gives you full control over the index, direction, and step size.",
      realLifeAnalogy:
        "A for loop is like doing laps around a track. Before you start, you set your lap counter to 0 (initialization). Before each lap, you check: 'Have I completed all 10 laps?' (condition). After each lap, you increment your counter (update). When the counter hits 10, you stop. You have full control over how many laps, which direction, and how fast you go — unlike a while loop where you might not know when to stop.",
      keyPoints: [
        "Syntax: for (initialization; condition; update) { body }",
        "Initialization runs ONCE before the first iteration",
        "Condition is checked BEFORE each iteration — loop stops when falsy",
        "Update runs AFTER each iteration's body completes",
        "Use let in the initializer — var leaks the variable outside the loop",
        "for...of iterates VALUES of arrays, strings, Maps, Sets",
        "for...in iterates KEYS (property names) of objects",
        "All three parts of the header are optional: for (;;) creates an infinite loop",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== for Loop =====

// ── Basic for loop ──────────────────────────
console.log("--- Basic counting ---");
for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}

// ── Counting backwards ──────────────────────
console.log("\\n--- Countdown ---");
for (let i = 5; i >= 1; i--) {
  console.log("  ", i);
}
console.log("  Go!");

// ── Step by 2 ───────────────────────────────
console.log("\\n--- Even numbers ---");
for (let i = 0; i <= 10; i += 2) {
  console.log("  ", i);
}

// ── Iterating an array by index ─────────────
console.log("\\n--- Array iteration ---");
let fruits = ["apple", "banana", "cherry", "date"];
for (let i = 0; i < fruits.length; i++) {
  console.log(\`  [\${i}] \${fruits[i]}\`);
}

// ── for...of (values) ───────────────────────
console.log("\\n--- for...of ---");
let colors = ["red", "green", "blue"];
for (let color of colors) {
  console.log("  Color:", color);
}

// for...of with strings
console.log("\\n--- String characters ---");
for (let char of "Hello") {
  console.log("  Char:", char);
}

// ── for...in (keys/properties) ──────────────
console.log("\\n--- for...in (object) ---");
let person = { name: "Alice", age: 25, role: "Developer" };
for (let key in person) {
  console.log(\`  \${key}: \${person[key]}\`);
}

// ── Building a string with a loop ───────────
console.log("\\n--- Building output ---");
let stars = "";
for (let i = 1; i <= 5; i++) {
  stars += "*";
  console.log(stars);
}

// ── Sum of numbers ──────────────────────────
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log("\\nSum of 1–100:", sum);

// ── Iterating with index using for...of ─────
console.log("\\n--- entries() for index + value ---");
for (let [index, fruit] of fruits.entries()) {
  console.log(\`  \${index}: \${fruit}\`);
}
`,
    },
    interviewQuestions: [
      {
        question: "What are the three parts of a for loop header and what does each do?",
        difficulty: "Easy",
        hint: "Initialization (runs once before the loop starts — typically declares the counter), Condition (evaluated before each iteration — loop continues while truthy), Update (runs after each iteration — typically increments/decrements the counter). All three are optional.",
      },
      {
        question: "What is the difference between for...of and for...in?",
        difficulty: "Easy",
        hint: "for...of iterates over VALUES of iterables (arrays, strings, Maps, Sets). for...in iterates over KEYS (property names) of objects. Use for...of for arrays; use for...in for object properties. for...in on arrays can include inherited properties and doesn't guarantee order.",
      },
      {
        question: "Why should you use let instead of var in a for loop?",
        difficulty: "Medium",
        hint: "let creates a new binding for each iteration (block-scoped), while var creates a single variable that is shared across all iterations (function-scoped). This matters with closures: setTimeout inside a var loop will log the final value for all callbacks, while let preserves each iteration's value.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 15. while Loop
  // ─────────────────────────────────────────────
  {
    id: "while-loop",
    title: "while Loop",
    slug: "while-loop",
    icon: "RefreshCw",
    difficulty: "Beginner",
    description:
      "Learn the while loop — a loop that repeats as long as a condition remains true, ideal when the number of iterations is unknown.",
    concept: {
      explanation:
        "The while loop checks a condition BEFORE each iteration. If the condition is truthy, the body runs; if falsy, the loop stops. Unlike the for loop where you typically know the iteration count upfront, the while loop is best when you do not know how many times to iterate — you loop until some condition changes. Common uses include reading user input until valid, processing a queue until empty, or searching for a value. The key risk with while loops is infinite loops: if the condition never becomes falsy, the program hangs. Always ensure something inside the loop eventually makes the condition false.",
      realLifeAnalogy:
        "A while loop is like fishing. You cast your line and check: 'Did I catch a fish?' No? Cast again. Keep fishing WHILE you haven't caught anything. You don't know how many casts it will take — could be 1, could be 100. The while loop keeps going until the condition changes (you catch a fish). If you forget to check your line (no exit condition), you will be there forever — that is an infinite loop.",
      keyPoints: [
        "Syntax: while (condition) { body } — condition checked BEFORE each iteration",
        "Use when you don't know the number of iterations in advance",
        "Always update the condition variable inside the loop to avoid infinite loops",
        "A while (true) loop runs forever — use break inside to exit when needed",
        "The body may never execute if the condition is false initially",
        "Common patterns: processing queues, reading input, searching algorithms",
        "for loops can always be rewritten as while loops (but not always vice versa)",
        "Be careful with off-by-one errors — track your condition variable carefully",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== while Loop =====

// ── Basic while loop ────────────────────────
console.log("--- Basic countdown ---");
let count = 5;
while (count > 0) {
  console.log("  Countdown:", count);
  count--;
}
console.log("  Go!");

// ── Summing until a limit ───────────────────
console.log("\\n--- Sum until > 50 ---");
let sum = 0;
let num = 1;
while (sum <= 50) {
  sum += num;
  console.log(\`  Added \${num}, sum = \${sum}\`);
  num++;
}
console.log("  Final sum:", sum);

// ── Finding a value ─────────────────────────
console.log("\\n--- Find first multiple of 7 > 50 ---");
let n = 1;
while (n * 7 <= 50) {
  n++;
}
console.log("  n =", n, "-> n * 7 =", n * 7);

// ── Processing a queue ──────────────────────
console.log("\\n--- Processing queue ---");
let queue = ["task1", "task2", "task3", "task4"];
while (queue.length > 0) {
  let task = queue.shift();  // remove first item
  console.log("  Processing:", task);
}
console.log("  Queue empty:", queue.length === 0);

// ── Collatz conjecture (3n+1 problem) ───────
console.log("\\n--- Collatz sequence (start: 12) ---");
let x = 12;
let steps = 0;
let sequence = [x];
while (x !== 1) {
  if (x % 2 === 0) {
    x = x / 2;
  } else {
    x = 3 * x + 1;
  }
  sequence.push(x);
  steps++;
}
console.log("  Sequence:", sequence.join(" -> "));
console.log("  Steps to reach 1:", steps);

// ── while vs for comparison ─────────────────
console.log("\\n--- while vs for ---");

// for: when you know the count
for (let i = 0; i < 3; i++) {
  console.log("  for:", i);
}

// while: when you don't know the count
let random = 10;
let attempts = 0;
while (random > 2) {
  random = Math.floor(random / 2);
  attempts++;
}
console.log("  while: halved to", random, "in", attempts, "attempts");
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between a while loop and a for loop?",
        difficulty: "Easy",
        hint: "A for loop is best when you know the number of iterations upfront (it has init, condition, and update in the header). A while loop is best when you don't know how many iterations are needed — you loop until a condition changes. Any for loop can be rewritten as a while loop, but while loops are more natural for unknown iteration counts.",
      },
      {
        question: "How do you prevent an infinite while loop?",
        difficulty: "Easy",
        hint: "Ensure that something inside the loop body changes the condition variable so it eventually becomes falsy. Common strategies: increment/decrement a counter, remove items from a collection, update a flag variable, or use break to exit. Always ask: 'Will this condition eventually become false?'",
      },
      {
        question: "When is a while loop a better choice than a for loop?",
        difficulty: "Easy",
        hint: "Use while when: reading input until valid, processing items until a queue is empty, searching for something (unknown iterations), implementing game loops, or when the exit condition depends on runtime calculations rather than a simple counter.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 16. do while Loop
  // ─────────────────────────────────────────────
  {
    id: "do-while-loop",
    title: "do while Loop",
    slug: "do-while-loop",
    icon: "RotateCw",
    difficulty: "Beginner",
    description:
      "Learn the do...while loop — a variant that always executes the body at least once before checking the condition.",
    concept: {
      explanation:
        "The do...while loop is similar to the while loop but with one critical difference: it checks the condition AFTER executing the body, not before. This means the body always runs at least once, even if the condition is false from the start. The syntax is: do { body } while (condition); — note the semicolon after the closing parenthesis. Use do...while when you need the action to happen before the check — like showing a menu before asking 'continue?', or validating input that must be collected at least once. It is less common than while and for, but essential in specific scenarios.",
      realLifeAnalogy:
        "A do...while loop is like a restaurant experience. You sit down and the waiter brings you the menu (the body runs first). Then they ask, 'Would you like to order more?' (condition check). If yes, they bring the menu again. If no, you stop. You always see the menu at least once — unlike a while loop where the waiter might check 'Are you hungry?' before even showing you the menu (and if you say no, you never see it).",
      keyPoints: [
        "Syntax: do { body } while (condition); — note the semicolon at the end",
        "The body ALWAYS executes at least once, regardless of the condition",
        "Condition is checked AFTER each execution of the body",
        "Use when the action must happen before the condition is evaluated",
        "Common use cases: menu systems, input validation, retry logic",
        "Less common than while and for — only use when 'at least once' is needed",
        "Can always be rewritten as a while loop with the body duplicated before it",
        "The condition still needs to eventually become false to avoid infinite loops",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== do...while Loop =====

// ── Basic do...while ────────────────────────
console.log("--- Basic do...while ---");
let count = 1;
do {
  console.log("  Count:", count);
  count++;
} while (count <= 5);

// ── Runs at least once (key difference!) ────
console.log("\\n--- At least once ---");

// while: body may never execute
let x = 10;
console.log("while (x < 5) with x =", x);
while (x < 5) {
  console.log("  This never runs");
  x++;
}
console.log("  while body did NOT run");

// do...while: body always runs once
let y = 10;
console.log("\\ndo...while (y < 5) with y =", y);
do {
  console.log("  This runs once! y =", y);
  y++;
} while (y < 5);
console.log("  do...while body ran ONCE");

// ── Menu simulation ─────────────────────────
console.log("\\n--- Menu simulation ---");
let options = ["View Profile", "Settings", "Help", "Exit"];
let choice = 0;

do {
  console.log("  Selected:", options[choice]);
  choice++;
} while (choice < options.length - 1);  // stop before "Exit"
console.log("  Reached: Exit");

// ── Number guessing logic ───────────────────
console.log("\\n--- Guess the number ---");
let secret = 7;
let guesses = [3, 5, 7];
let attempt = 0;
let found = false;

do {
  let guess = guesses[attempt];
  console.log(\`  Attempt \${attempt + 1}: guessed \${guess}\`);
  if (guess === secret) {
    console.log("  Correct!");
    found = true;
  }
  attempt++;
} while (!found && attempt < guesses.length);

// ── Summing digits of a number ──────────────
console.log("\\n--- Sum digits of 9473 ---");
let number = 9473;
let digitSum = 0;
let temp = number;

do {
  let digit = temp % 10;
  digitSum += digit;
  console.log(\`  Digit: \${digit}, running sum: \${digitSum}\`);
  temp = Math.floor(temp / 10);
} while (temp > 0);

console.log("  Sum of digits of", number, "=", digitSum);

// ── Comparison summary ──────────────────────
console.log("\\n--- Loop comparison ---");
console.log("for:       know the count, clean syntax");
console.log("while:     unknown count, check BEFORE");
console.log("do while:  unknown count, run AT LEAST ONCE");
`,
    },
    interviewQuestions: [
      {
        question: "What is the key difference between while and do...while loops?",
        difficulty: "Easy",
        hint: "A while loop checks the condition BEFORE each iteration — the body may never execute if the condition is initially false. A do...while loop checks the condition AFTER each iteration — the body always executes at least once. Use do...while when you need guaranteed first execution.",
      },
      {
        question: "Give a real-world example where do...while is better than while.",
        difficulty: "Easy",
        hint: "Input validation is a classic example: you need to get input from the user at least once before you can check if it is valid. A menu system: show the menu first, then ask if they want to continue. Retry logic: try the operation once, then decide if you need to retry.",
      },
      {
        question: "Can a do...while loop cause an infinite loop?",
        difficulty: "Easy",
        hint: "Yes — just like any loop, if the condition never becomes false, it runs forever. The do...while guarantee is only about the FIRST execution. After that, it behaves like a while loop. You must still ensure the condition variable changes inside the body.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 17. break and continue
  // ─────────────────────────────────────────────
  {
    id: "break-and-continue",
    title: "break and continue",
    slug: "break-and-continue",
    icon: "SkipForward",
    difficulty: "Beginner",
    description:
      "Learn how to control loop execution with break (exit the loop entirely) and continue (skip to the next iteration).",
    concept: {
      explanation:
        "break and continue are jump statements that alter the normal flow of loops. break immediately exits the entire loop — no more iterations run, and execution continues after the loop. continue skips the rest of the current iteration and jumps to the next one (back to the condition check). Both work in for, while, and do...while loops. For nested loops, break and continue only affect the innermost loop by default. You can use labelled loops with break and continue to target a specific outer loop. break is also used in switch statements to prevent fall-through. Use these sparingly — they can make code harder to follow if overused, but they are invaluable for early exits and filtering within loops.",
      realLifeAnalogy:
        "Imagine you are checking items on a conveyor belt. break is like pressing the emergency stop button — the entire belt stops and you walk away. continue is like seeing a defective item and pressing a 'skip' button — that item falls off the belt, but the belt keeps moving and the next item comes along. You use break when you have found what you need or something is wrong. You use continue when you want to skip certain items but keep processing the rest.",
      keyPoints: [
        "break exits the ENTIRE loop immediately — no more iterations",
        "continue skips the REST of the current iteration and moves to the next",
        "Both work in for, while, and do...while loops",
        "In nested loops, they only affect the INNERMOST loop by default",
        "Use labels (outerLoop: for...) to break/continue outer loops in nested scenarios",
        "break is also used in switch statements to prevent fall-through",
        "Use break for early exit when you have found what you need",
        "Use continue to skip unwanted items but keep processing the rest",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== break and continue =====

// ── break: exit the loop ────────────────────
console.log("--- break ---");
for (let i = 1; i <= 10; i++) {
  if (i === 6) {
    console.log("  Found 6 — breaking!");
    break;  // exit the loop
  }
  console.log("  i:", i);
}
console.log("  Loop ended\\n");

// ── continue: skip current iteration ────────
console.log("--- continue (skip odds) ---");
for (let i = 1; i <= 8; i++) {
  if (i % 2 !== 0) {
    continue;  // skip odd numbers
  }
  console.log("  Even:", i);
}

// ── break to find first match ───────────────
console.log("\\n--- Find first negative ---");
let numbers = [5, 12, -3, 8, -7, 20];
let firstNeg = null;
for (let num of numbers) {
  if (num < 0) {
    firstNeg = num;
    break;  // found it, stop looking
  }
}
console.log("  First negative:", firstNeg);

// ── continue to filter while processing ─────
console.log("\\n--- Process only strings ---");
let mixed = [1, "hello", true, "world", 42, "JS"];
for (let item of mixed) {
  if (typeof item !== "string") {
    continue;  // skip non-strings
  }
  console.log("  String found:", item.toUpperCase());
}

// ── break in while loop ─────────────────────
console.log("\\n--- break in while ---");
let sum = 0;
let n = 1;
while (true) {  // infinite loop
  sum += n;
  if (sum > 20) {
    console.log(\`  sum exceeded 20 at n=\${n}, sum=\${sum}\`);
    break;
  }
  n++;
}

// ── Labelled break (nested loops) ───────────
console.log("\\n--- Labelled break ---");
outerLoop:
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      console.log(\`  Breaking outer at i=\${i}, j=\${j}\`);
      break outerLoop;  // exits BOTH loops
    }
    console.log(\`  i=\${i}, j=\${j}\`);
  }
}

// ── Labelled continue ───────────────────────
console.log("\\n--- Labelled continue ---");
outer:
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) {
      continue outer;  // skip rest of inner, go to next i
    }
    console.log(\`  i=\${i}, j=\${j}\`);
  }
}
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between break and continue?",
        difficulty: "Easy",
        hint: "break exits the entire loop immediately — no more iterations run. continue skips the rest of the current iteration and jumps to the next one. break says 'stop everything'; continue says 'skip this one, keep going'.",
      },
      {
        question: "How do break and continue work in nested loops?",
        difficulty: "Medium",
        hint: "By default, break and continue only affect the innermost loop they are inside. To affect an outer loop, you need to use a label: label the outer loop (outerLoop: for...) and then use 'break outerLoop' or 'continue outerLoop'. Without labels, there is no way to break out of multiple nested loops at once.",
      },
      {
        question: "When should you use break vs returning from a function?",
        difficulty: "Medium",
        hint: "If the loop is inside a function and you want to exit both the loop and the function, use return. If you want to exit the loop but continue executing code after it, use break. Return is often cleaner than break because it avoids having to check state after the loop.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 18. Nested Loops
  // ─────────────────────────────────────────────
  {
    id: "nested-loops",
    title: "Nested Loops",
    slug: "nested-loops",
    icon: "Layers",
    difficulty: "Beginner",
    description:
      "Understand how loops inside loops work, when to use them, and how to avoid performance pitfalls with nested iteration.",
    concept: {
      explanation:
        "A nested loop is a loop inside another loop. The inner loop completes ALL its iterations for EACH single iteration of the outer loop. If the outer loop runs n times and the inner loop runs m times, the inner body executes n * m times total. Nested loops are essential for working with 2D data (matrices, grids, tables), generating combinations or pairs, pattern printing, and comparing elements against each other. The time complexity of nested loops is typically O(n * m) or O(n^2) if both loops iterate the same collection. Be cautious with deeply nested loops (3+ levels) — they can be slow for large inputs and are harder to read. Consider using array methods like map, filter, or flatMap as alternatives when possible.",
      realLifeAnalogy:
        "Nested loops are like a clock. The minute hand (inner loop) goes around 60 times for each single movement of the hour hand (outer loop). In 12 hours, the minute hand completes 12 * 60 = 720 revolutions. Similarly, if you are checking every student (outer) against every question (inner) on a test, the total checks are students * questions. The inner loop always fully completes before the outer loop advances one step.",
      keyPoints: [
        "The inner loop completes ALL iterations for EACH iteration of the outer loop",
        "Total iterations = outer count * inner count (e.g., 5 * 5 = 25)",
        "Common for 2D arrays, grids, matrices, and generating combinations",
        "Time complexity is typically O(n * m) or O(n^2) for same-size loops",
        "Avoid deeply nested loops (3+) — they hurt performance and readability",
        "Use break with labels to exit outer loops from inside inner loops",
        "Consider array methods (map, filter, flatMap) as cleaner alternatives",
        "Each loop level multiplies the work — be mindful with large datasets",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Nested Loops =====

// ── Basic nested loop ───────────────────────
console.log("--- Multiplication Table (1-5) ---");
for (let i = 1; i <= 5; i++) {
  let row = "";
  for (let j = 1; j <= 5; j++) {
    row += String(i * j).padStart(4);
  }
  console.log(row);
}

// ── Pattern: Right triangle ─────────────────
console.log("\\n--- Star Triangle ---");
for (let i = 1; i <= 5; i++) {
  let line = "";
  for (let j = 1; j <= i; j++) {
    line += "* ";
  }
  console.log("  " + line);
}

// ── 2D Array (Matrix) ───────────────────────
console.log("\\n--- 2D Array ---");
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

for (let row = 0; row < matrix.length; row++) {
  let line = "  ";
  for (let col = 0; col < matrix[row].length; col++) {
    line += String(matrix[row][col]).padStart(3);
  }
  console.log(line);
}

// ── Finding pairs that sum to target ────────
console.log("\\n--- Pairs summing to 10 ---");
let nums = [1, 3, 5, 7, 9, 2, 8];
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === 10) {
      console.log(\`  \${nums[i]} + \${nums[j]} = 10\`);
    }
  }
}

// ── Generating combinations ─────────────────
console.log("\\n--- Color + Size combos ---");
let colors = ["Red", "Blue"];
let sizes = ["S", "M", "L"];
let combos = 0;

for (let color of colors) {
  for (let size of sizes) {
    console.log(\`  \${color}-\${size}\`);
    combos++;
  }
}
console.log("  Total combinations:", combos);

// ── Iteration count awareness ───────────────
console.log("\\n--- Iteration counts ---");
let totalOps = 0;

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 3; j++) {
    totalOps++;
  }
}
console.log("  4 x 3 nested loop:", totalOps, "operations");

// ── Flattening a 2D array ───────────────────
console.log("\\n--- Flatten 2D -> 1D ---");
let grid = [[1, 2], [3, 4], [5, 6]];
let flat = [];
for (let row of grid) {
  for (let val of row) {
    flat.push(val);
  }
}
console.log("  Flattened:", flat);
console.log("  Better way:", grid.flat());
`,
    },
    interviewQuestions: [
      {
        question: "What is the time complexity of a nested loop?",
        difficulty: "Easy",
        hint: "If the outer loop runs n times and the inner loop runs m times, the total operations are n * m, giving O(n * m) time complexity. If both iterate the same collection of size n, it is O(n^2). Adding another nested loop makes it O(n^3). Each level of nesting multiplies the complexity.",
      },
      {
        question: "How do you break out of a nested loop from the inner loop?",
        difficulty: "Medium",
        hint: "Use a labelled break. Label the outer loop (e.g., 'outer: for (...)') and then use 'break outer;' inside the inner loop. Without a label, break only exits the innermost loop. Alternatively, extract the nested loops into a function and use return to exit everything.",
      },
      {
        question: "What are alternatives to nested loops for better readability?",
        difficulty: "Medium",
        hint: "Array methods like flatMap, map with nested map, filter, and reduce can replace many nested loop patterns. For finding pairs, use a Set or Map for O(n) lookup instead of O(n^2) nested loops. For 2D arrays, use flat() to flatten first, then process with a single loop.",
      },
    ],
  },

  // ═════════════════════════════════════════════
  // LEVEL 3 — Functions
  // ═════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 19. Function Declaration
  // ─────────────────────────────────────────────
  {
    id: "function-declaration",
    title: "Function Declaration",
    slug: "function-declaration",
    icon: "FunctionSquare",
    difficulty: "Beginner",
    description:
      "Learn how to define reusable blocks of code with the function keyword — the most traditional way to create functions in JavaScript.",
    concept: {
      explanation:
        "A function declaration creates a named function using the function keyword. It consists of the function name, a list of parameters in parentheses, and a body enclosed in curly braces. Function declarations are hoisted — the entire function (not just the name) is moved to the top of its scope, so you can call the function before its declaration in the code. This is different from function expressions which are NOT hoisted. Functions are one of the fundamental building blocks of JavaScript — they let you write code once and reuse it with different inputs. A function that does not explicitly return a value returns undefined. Functions create their own scope — variables declared inside are not accessible outside.",
      realLifeAnalogy:
        "A function is like a recipe card in a kitchen. You write the recipe once (declare the function), giving it a name like 'makePancakes'. The recipe lists what ingredients you need (parameters) and the steps to follow (body). Whenever you want pancakes, you grab the card and follow it with the specific ingredients you have (arguments). You do not rewrite the recipe each time — you just call it. The finished pancakes are the return value.",
      keyPoints: [
        "Syntax: function name(params) { body }",
        "Function declarations are HOISTED — callable before their declaration",
        "Parameters are the names listed in the function definition",
        "Arguments are the actual values passed when calling the function",
        "A function without a return statement returns undefined",
        "Functions create their own scope — local variables stay local",
        "Function names should be verbs or verb phrases: calculateTotal, getUserName",
        "Functions can call other functions, enabling modular code design",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Function Declaration =====

// ── Basic function ──────────────────────────
function greet() {
  console.log("Hello, World!");
}
greet();

// ── Function with parameters ────────────────
function greetUser(name) {
  console.log("Hello, " + name + "!");
}
greetUser("Alice");
greetUser("Bob");

// ── Function with return value ──────────────
function add(a, b) {
  return a + b;
}
let sum = add(10, 20);
console.log("\\n10 + 20 =", sum);

// ── Hoisting: call before declaration ───────
console.log("\\n--- Hoisting ---");
console.log("Square of 5:", square(5));  // works!

function square(n) {
  return n * n;
}

// ── Real application: price calculator ──────
console.log("\\n--- Price Calculator ---");
function calculateTotal(price, quantity, taxRate) {
  let subtotal = price * quantity;
  let tax = subtotal * taxRate;
  let total = subtotal + tax;
  return total;
}

let total = calculateTotal(29.99, 3, 0.08);
console.log("3 items @ $29.99 + 8% tax = $" + total.toFixed(2));

// ── Real application: validation ────────────
console.log("\\n--- Email Validator ---");
function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

console.log("test@mail.com:", isValidEmail("test@mail.com"));
console.log("invalid:", isValidEmail("invalid"));

// ── Functions calling functions ─────────────
console.log("\\n--- Composing Functions ---");
function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

function getOrderSummary(items) {
  let total = 0;
  for (let item of items) {
    total += item.price * item.qty;
  }
  return "Total: " + formatCurrency(total);
}

let order = [
  { name: "Book", price: 12.99, qty: 2 },
  { name: "Pen", price: 1.50, qty: 5 },
];
console.log(getOrderSummary(order));
`,
    },
    interviewQuestions: [
      {
        question: "What is function hoisting in JavaScript?",
        difficulty: "Easy",
        hint: "Function declarations are fully hoisted — the entire function definition is moved to the top of its scope during compilation. This means you can call a function before its declaration appears in the code. Function expressions and arrow functions are NOT hoisted — only the variable declaration is hoisted (with undefined for var, TDZ for let/const).",
      },
      {
        question: "What happens if a function does not have a return statement?",
        difficulty: "Easy",
        hint: "A function without a return statement (or with an empty return) returns undefined. This is important to remember when using the result of a function call — if you assign it to a variable, you get undefined. Functions that are called for their side effects (like console.log) do not need return values.",
      },
      {
        question: "What is the difference between parameters and arguments?",
        difficulty: "Easy",
        hint: "Parameters are the variable names listed in the function definition — they are placeholders. Arguments are the actual values passed to the function when it is called. function add(a, b) — a and b are parameters. add(3, 5) — 3 and 5 are arguments.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 20. Function Expressions
  // ─────────────────────────────────────────────
  {
    id: "function-expressions",
    title: "Function Expressions",
    slug: "function-expressions",
    icon: "Variable",
    difficulty: "Beginner",
    description:
      "Learn how to assign functions to variables — creating anonymous or named function expressions for flexible code patterns.",
    concept: {
      explanation:
        "A function expression creates a function and assigns it to a variable. Unlike function declarations, function expressions are NOT hoisted — you cannot call them before they are defined. The function can be anonymous (no name) or named (useful for recursion and stack traces). Function expressions are powerful because functions in JavaScript are first-class citizens — they can be assigned to variables, passed as arguments, returned from other functions, and stored in data structures. This flexibility enables patterns like callbacks, event handlers, IIFEs (Immediately Invoked Function Expressions), and functional programming.",
      realLifeAnalogy:
        "A function expression is like writing instructions on a sticky note and placing it in a specific drawer (variable). Anyone who opens that drawer can follow the instructions. Unlike a recipe card pinned on the wall (function declaration — always visible), the sticky note only exists after you write it and put it in the drawer. You can also move the note to a different drawer (reassign), hand it to someone else (pass as argument), or tear it up (let it be garbage collected).",
      keyPoints: [
        "Function expressions are NOT hoisted — must be defined before use",
        "Can be anonymous: const greet = function() { }",
        "Can be named: const greet = function sayHello() { } (useful for recursion)",
        "Functions are first-class citizens — treated like any other value",
        "Can be passed as arguments, returned from functions, stored in arrays/objects",
        "const prevents reassignment of the function variable",
        "Named function expressions have the name available inside the function body only",
        "IIFEs use function expressions to create private scope: (function() { })()",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Function Expressions =====

// ── Anonymous function expression ───────────
const greet = function(name) {
  return "Hello, " + name + "!";
};
console.log(greet("Alice"));

// ── Named function expression ───────────────
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);  // name 'fact' available inside
};
console.log("5! =", factorial(5));
// console.log(fact(5));  // ReferenceError: fact is not defined outside

// ── NOT hoisted (unlike declarations) ───────
console.log("\\n--- Not Hoisted ---");
// console.log(multiply(3, 4));  // TypeError: multiply is not a function
const multiply = function(a, b) {
  return a * b;
};
console.log("3 * 4 =", multiply(3, 4));

// ── Functions as values ─────────────────────
console.log("\\n--- Functions as Values ---");
const operations = {
  add: function(a, b) { return a + b; },
  subtract: function(a, b) { return a - b; },
  multiply: function(a, b) { return a * b; },
};

console.log("add(5, 3):", operations.add(5, 3));
console.log("subtract(5, 3):", operations.subtract(5, 3));
console.log("multiply(5, 3):", operations.multiply(5, 3));

// ── Storing functions in arrays ─────────────
console.log("\\n--- Function Array ---");
const validators = [
  function(val) { return val.length > 0; },
  function(val) { return val.includes("@"); },
  function(val) { return val.includes("."); },
];

let email = "user@mail.com";
let allPassed = validators.every(fn => fn(email));
console.log(email, "valid:", allPassed);

// ── IIFE (Immediately Invoked) ──────────────
console.log("\\n--- IIFE ---");
const result = (function() {
  let secret = "hidden";
  return "The secret is: " + secret;
})();
console.log(result);
// console.log(secret);  // ReferenceError: secret is not defined

// ── Real app: event handler pattern ─────────
console.log("\\n--- Event Handler Pattern ---");
function createCounter() {
  let count = 0;
  return {
    increment: function() { count++; return count; },
    decrement: function() { count--; return count; },
    getCount: function() { return count; },
  };
}

const counter = createCounter();
console.log("Increment:", counter.increment());
console.log("Increment:", counter.increment());
console.log("Decrement:", counter.decrement());
console.log("Count:", counter.getCount());
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between function declarations and function expressions?",
        difficulty: "Easy",
        hint: "Function declarations are hoisted (callable before definition) and always named. Function expressions are NOT hoisted and can be anonymous. Declarations use 'function name()' syntax; expressions assign a function to a variable: 'const name = function() {}'.",
      },
      {
        question: "What does it mean that functions are 'first-class citizens' in JavaScript?",
        difficulty: "Medium",
        hint: "First-class means functions are treated like any other value. They can be: assigned to variables, passed as arguments to other functions, returned from functions, stored in arrays and objects, and have properties. This enables callbacks, higher-order functions, closures, and functional programming patterns.",
      },
      {
        question: "What is an IIFE and why would you use one?",
        difficulty: "Medium",
        hint: "IIFE (Immediately Invoked Function Expression) is a function that runs immediately after definition: (function() { })() or (() => { })(). It creates a private scope — variables inside are not accessible outside. Used for encapsulation, avoiding global pollution, and module patterns. Less common now with ES6 modules and block scoping.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 21. Arrow Functions
  // ─────────────────────────────────────────────
  {
    id: "arrow-functions",
    title: "Arrow Functions",
    slug: "arrow-functions",
    icon: "MoveRight",
    difficulty: "Beginner",
    description:
      "Master the concise ES6 arrow function syntax — shorter function expressions with lexical 'this' binding.",
    concept: {
      explanation:
        "Arrow functions (=>) are a concise syntax introduced in ES6 for writing function expressions. They are shorter than traditional function expressions and have important differences: they do NOT have their own 'this' — they inherit 'this' from the enclosing scope (lexical this). They also cannot be used as constructors (no new keyword), do not have an 'arguments' object, and cannot be used as generators. For single expressions, you can omit curly braces and the return keyword (implicit return). Arrow functions are ideal for short callbacks, array methods (map, filter, reduce), and any situation where you want to preserve the outer 'this' context.",
      realLifeAnalogy:
        "Arrow functions are like text message abbreviations vs formal letters. A traditional function is a formal letter: 'Dear Sir, I would like to inform you that the sum is...' An arrow function is a text: 'sum = a + b'. Same message, much shorter. But just like texting is not appropriate for every situation (legal documents, formal complaints), arrow functions are not always the right choice (methods that need their own 'this', constructors).",
      keyPoints: [
        "Syntax: (params) => expression  or  (params) => { statements }",
        "Single parameter: parentheses optional — x => x * 2",
        "No parameters: empty parentheses required — () => 'hello'",
        "Single expression: implicit return (no braces or return keyword needed)",
        "Multiple statements: use braces and explicit return",
        "Arrow functions do NOT have their own 'this' — they inherit from parent scope",
        "Cannot be used with 'new' — they are not constructors",
        "No 'arguments' object — use rest parameters (...args) instead",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Arrow Functions =====

// ── Basic arrow function ────────────────────
const greet = (name) => "Hello, " + name + "!";
console.log(greet("Alice"));

// ── Single parameter (no parens needed) ─────
const double = x => x * 2;
console.log("Double 5:", double(5));

// ── No parameters ───────────────────────────
const getTimestamp = () => Date.now();
console.log("Timestamp:", getTimestamp());

// ── Multi-line with braces ──────────────────
const calculateBMI = (weight, height) => {
  const bmi = weight / (height * height);
  const category = bmi < 18.5 ? "underweight"
    : bmi < 25 ? "normal"
    : bmi < 30 ? "overweight"
    : "obese";
  return { bmi: bmi.toFixed(1), category };
};
console.log("\\nBMI:", calculateBMI(70, 1.75));

// ── With array methods (most common use) ────
console.log("\\n--- Array Methods ---");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);

const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);

// ── Chaining array methods ──────────────────
console.log("\\n--- Chaining ---");
const products = [
  { name: "Laptop", price: 999, inStock: true },
  { name: "Phone", price: 699, inStock: false },
  { name: "Tablet", price: 499, inStock: true },
  { name: "Watch", price: 299, inStock: true },
];

const affordableInStock = products
  .filter(p => p.inStock)
  .filter(p => p.price < 500)
  .map(p => p.name);
console.log("Affordable & in stock:", affordableInStock);

// ── Returning objects (wrap in parens) ──────
const makeUser = (name, age) => ({ name, age, active: true });
console.log("\\nUser:", makeUser("Bob", 30));

// ── Arrow vs traditional: 'this' ───────────
console.log("\\n--- Lexical 'this' ---");
const team = {
  name: "Dev Team",
  members: ["Alice", "Bob", "Charlie"],

  // Arrow inherits 'this' from team object's method
  listMembers: function() {
    this.members.forEach(member => {
      console.log(\`  \${member} is in \${this.name}\`);
    });
  }
};
team.listMembers();

// ── Short callbacks ─────────────────────────
console.log("\\n--- Short Callbacks ---");
const words = ["hello", "world", "javascript"];
const capitalized = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));
console.log("Capitalized:", capitalized);

const sorted = [...numbers].sort((a, b) => b - a);
console.log("Sorted desc:", sorted);
`,
    },
    interviewQuestions: [
      {
        question: "What are the differences between arrow functions and regular functions?",
        difficulty: "Medium",
        hint: "Arrow functions: no own 'this' (lexical), no 'arguments' object, cannot be constructors (no new), shorter syntax, implicit return for single expressions. Regular functions: own 'this' (dynamic), have 'arguments', can be constructors, always need explicit return, can be generators.",
      },
      {
        question: "Why do arrow functions not have their own 'this'?",
        difficulty: "Medium",
        hint: "Arrow functions use lexical 'this' — they inherit 'this' from the enclosing scope at the time they are defined. This was designed to solve the common problem where 'this' inside callbacks refers to the wrong object. Before arrow functions, developers used var self = this or .bind(this) to work around this issue.",
      },
      {
        question: "When should you NOT use arrow functions?",
        difficulty: "Medium",
        hint: "Don't use arrow functions as: object methods (they won't have the right 'this'), constructors (cannot use 'new'), prototype methods, event handlers that need 'this' to refer to the element, or functions that need the 'arguments' object. Use regular functions in these cases.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 22. Parameters and Arguments
  // ─────────────────────────────────────────────
  {
    id: "parameters-and-arguments",
    title: "Parameters and Arguments",
    slug: "parameters-and-arguments",
    icon: "Settings",
    difficulty: "Beginner",
    description:
      "Understand how functions receive input — parameter naming, argument passing, and how JavaScript handles missing or extra arguments.",
    concept: {
      explanation:
        "Parameters are the variable names in a function definition; arguments are the values passed when calling it. JavaScript is flexible with arguments: if you pass fewer arguments than parameters, the missing ones are undefined. If you pass more, the extras are silently ignored (but accessible via the arguments object in regular functions). JavaScript passes primitives by value (a copy) and objects by reference (a pointer to the same object). This means modifying an object parameter inside a function affects the original object. Understanding these rules prevents bugs around missing data, unexpected mutations, and parameter ordering.",
      realLifeAnalogy:
        "Think of a function as a form at a government office. The form has labelled fields (parameters): Name, Age, Address. When you fill it out, you write your actual information (arguments) in those fields. If you leave a field blank (missing argument), it shows as 'N/A' (undefined). If you write extra notes in the margins (extra arguments), the clerk might ignore them. If you hand over your house key (object reference) instead of a photo of your house (primitive value), the clerk could actually enter your house and rearrange furniture.",
      keyPoints: [
        "Parameters = names in definition; Arguments = values in the call",
        "Missing arguments default to undefined (no error thrown)",
        "Extra arguments are silently ignored (accessible via arguments object)",
        "Primitives are passed by value — changes inside don't affect the original",
        "Objects are passed by reference — changes inside DO affect the original",
        "The arguments object is array-like but NOT an array (no map, filter, etc.)",
        "Use descriptive parameter names — they serve as documentation",
        "Parameter order matters — consider using an options object for many parameters",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Parameters and Arguments =====

// ── Basic parameters ────────────────────────
function introduce(name, age, role) {
  console.log(\`\${name}, \${age}, \${role}\`);
}
introduce("Alice", 25, "Developer");

// ── Missing arguments = undefined ───────────
console.log("\\n--- Missing Arguments ---");
introduce("Bob", 30);  // role is undefined
introduce("Charlie");  // age and role undefined

// ── Extra arguments are ignored ─────────────
console.log("\\n--- Extra Arguments ---");
function add(a, b) {
  return a + b;
}
console.log("add(3, 5, 100):", add(3, 5, 100));  // 100 is ignored

// ── The arguments object (regular functions) ─
console.log("\\n--- arguments object ---");
function showArgs() {
  console.log("  Length:", arguments.length);
  for (let i = 0; i < arguments.length; i++) {
    console.log(\`  [\${i}]: \${arguments[i]}\`);
  }
}
showArgs("hello", 42, true);

// ── Pass by value (primitives) ──────────────
console.log("\\n--- Pass by Value ---");
let score = 100;
function tryToChange(val) {
  val = 999;
  console.log("  Inside function:", val);
}
tryToChange(score);
console.log("  Outside (unchanged):", score);

// ── Pass by reference (objects) ─────────────
console.log("\\n--- Pass by Reference ---");
let user = { name: "Alice", score: 0 };
function addPoints(player, points) {
  player.score += points;  // modifies the original!
  console.log("  Inside:", player.score);
}
addPoints(user, 50);
console.log("  Outside (changed!):", user.score);

// ── Preventing mutation ─────────────────────
console.log("\\n--- Safe Copy ---");
function safeUpdate(original, updates) {
  let copy = { ...original, ...updates };  // spread = shallow copy
  return copy;
}
let original = { name: "Bob", age: 25 };
let updated = safeUpdate(original, { age: 26 });
console.log("  Original:", original);
console.log("  Updated:", updated);

// ── Options object pattern ──────────────────
console.log("\\n--- Options Object ---");
function createUser({ name, age, role = "user", active = true }) {
  return { name, age, role, active };
}

let newUser = createUser({ name: "Dana", age: 28, role: "admin" });
console.log("  User:", newUser);

// No need to remember parameter order!
let anotherUser = createUser({ age: 22, name: "Eve" });
console.log("  User:", anotherUser);
`,
    },
    interviewQuestions: [
      {
        question: "Is JavaScript pass-by-value or pass-by-reference?",
        difficulty: "Medium",
        hint: "JavaScript is always pass-by-value, but for objects the 'value' is a reference (memory address). Primitives: a copy of the value is passed — changes inside don't affect the original. Objects: a copy of the reference is passed — the function can modify the object's properties, but reassigning the parameter itself doesn't affect the original variable.",
      },
      {
        question: "What happens when you pass fewer or more arguments than parameters?",
        difficulty: "Easy",
        hint: "Fewer arguments: missing parameters are set to undefined (no error). More arguments: extras are silently ignored but accessible via the 'arguments' object in regular functions. Arrow functions don't have 'arguments' — use rest parameters (...args) instead.",
      },
      {
        question: "Why use an options object instead of multiple parameters?",
        difficulty: "Medium",
        hint: "An options object ({ name, age, role }) is better when: there are many parameters, parameters are optional, order doesn't matter, and the call site is self-documenting. Compare: createUser('Alice', 25, true, 'admin') vs createUser({ name: 'Alice', role: 'admin' }).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 23. Return Statement
  // ─────────────────────────────────────────────
  {
    id: "return-statement",
    title: "Return Statement",
    slug: "return-statement",
    icon: "CornerDownLeft",
    difficulty: "Beginner",
    description:
      "Understand how functions send values back to the caller — single returns, early returns, and returning different data types.",
    concept: {
      explanation:
        "The return statement ends function execution and sends a value back to the caller. When JavaScript encounters return, it immediately exits the function — any code after it in the same block is unreachable. A function can have multiple return statements (commonly in conditionals), but only one executes per call. If a function has no return statement or uses 'return;' without a value, it returns undefined. You can return any data type: numbers, strings, booleans, objects, arrays, and even other functions. Early returns (guard clauses) are a powerful pattern for handling edge cases at the top of a function, keeping the main logic clean and unindented.",
      realLifeAnalogy:
        "The return statement is like the cashier at a store handing you your receipt and change. Once they hand it over (return), the transaction is done — they move on to the next customer. If they find a problem mid-transaction (early return), they immediately hand you an error slip and stop. The receipt (return value) is what you take away from the interaction. If they just say 'Have a nice day' without giving you anything (no return), you walk away empty-handed (undefined).",
      keyPoints: [
        "return exits the function immediately and sends a value to the caller",
        "Code after return in the same block is unreachable (dead code)",
        "A function without return (or bare return;) returns undefined",
        "You can return any type: primitives, objects, arrays, functions",
        "Multiple returns are common with conditionals (if/else)",
        "Early returns (guard clauses) handle edge cases at the top",
        "Return an object literal: wrap in parens for arrow functions => ({ key: value })",
        "Returning a function enables closures and factory patterns",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Return Statement =====

// ── Basic return ────────────────────────────
function add(a, b) {
  return a + b;
}
let result = add(10, 20);
console.log("10 + 20 =", result);

// ── Code after return is unreachable ────────
function test() {
  return "reached";
  console.log("This never runs");  // dead code
}
console.log("test():", test());

// ── No return = undefined ───────────────────
function sayHi(name) {
  console.log("\\nHi, " + name + "!");
  // no return statement
}
let value = sayHi("Alice");
console.log("Return value:", value);  // undefined

// ── Multiple returns with conditions ────────
console.log("\\n--- Grade Calculator ---");
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}
console.log("95 ->", getGrade(95));
console.log("82 ->", getGrade(82));
console.log("55 ->", getGrade(55));

// ── Early returns (guard clauses) ───────────
console.log("\\n--- Guard Clauses ---");
function divide(a, b) {
  if (b === 0) return "Cannot divide by zero";
  if (typeof a !== "number") return "Invalid input";
  return a / b;
}
console.log("10 / 3:", divide(10, 3));
console.log("10 / 0:", divide(10, 0));

// ── Returning objects ───────────────────────
console.log("\\n--- Return Objects ---");
function createUser(name, email) {
  return {
    name,
    email,
    createdAt: new Date().toISOString().split("T")[0],
    active: true,
  };
}
console.log(createUser("Bob", "bob@mail.com"));

// ── Returning arrays ────────────────────────
console.log("\\n--- Return Arrays ---");
function getMinMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)];
}
let [min, max] = getMinMax([5, 2, 9, 1, 7]);
console.log("Min:", min, "Max:", max);

// ── Returning functions (closures) ──────────
console.log("\\n--- Return Functions ---");
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
const triple = createMultiplier(3);
const tenX = createMultiplier(10);
console.log("triple(5):", triple(5));
console.log("tenX(5):", tenX(5));

// ── Real app: API response handler ──────────
console.log("\\n--- Response Handler ---");
function processResponse(response) {
  if (!response) return { error: "No response" };
  if (response.status !== 200) return { error: "Status: " + response.status };
  return { data: response.body, success: true };
}
console.log(processResponse({ status: 200, body: "OK" }));
console.log(processResponse({ status: 404 }));
console.log(processResponse(null));
`,
    },
    interviewQuestions: [
      {
        question: "What does a function return if there is no return statement?",
        difficulty: "Easy",
        hint: "undefined. If a function has no return statement, or uses 'return;' without a value, JavaScript returns undefined to the caller. Constructor functions called with 'new' are an exception — they implicitly return the new object.",
      },
      {
        question: "What are guard clauses and why are they better than nested if/else?",
        difficulty: "Medium",
        hint: "Guard clauses are early returns at the start of a function that handle invalid cases first. Instead of wrapping the main logic in deeply nested if/else blocks, you check for problems and return early. This keeps the happy path at the lowest indentation level and makes the function easier to read.",
      },
      {
        question: "Can a function return multiple values?",
        difficulty: "Easy",
        hint: "Not directly — a function can only return one value. However, you can return an array or object containing multiple values and destructure them: function getMinMax() { return [1, 10]; } const [min, max] = getMinMax(); This is a common pattern in JavaScript.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 24. Default Parameters
  // ─────────────────────────────────────────────
  {
    id: "default-parameters",
    title: "Default Parameters",
    slug: "default-parameters",
    icon: "ToggleLeft",
    difficulty: "Beginner",
    description:
      "Learn how to set fallback values for function parameters when arguments are not provided or are undefined.",
    concept: {
      explanation:
        "Default parameters (ES6) let you specify fallback values in the function signature. If an argument is not passed or is explicitly undefined, the default value is used. The syntax is: function name(param = defaultValue). Default values can be any expression — literals, variables, function calls, or even references to previous parameters. Before ES6, developers used the pattern param = param || defaultValue, but this fails for falsy values like 0 or ''. Default parameters only trigger on undefined, not on null or other falsy values. They are evaluated at call time, not at definition time — so each call gets a fresh default value.",
      realLifeAnalogy:
        "Default parameters are like a restaurant menu with standard options. When you order a burger, it comes with lettuce, tomato, and ketchup by default. You can customize (pass arguments) — 'no tomato, add mustard'. But if you do not specify, you get the defaults. The chef does not ask about every single ingredient — only the ones you want to change. This makes ordering (function calls) simpler and less error-prone.",
      keyPoints: [
        "Syntax: function name(param = defaultValue) { }",
        "Default is used when argument is undefined (not passed or explicitly undefined)",
        "null does NOT trigger the default — only undefined does",
        "Defaults can be expressions, function calls, or references to earlier params",
        "Defaults are evaluated at CALL time, not definition time (fresh each call)",
        "Before ES6: param = param || fallback (buggy with 0, '', false)",
        "Place parameters with defaults AFTER required parameters",
        "Destructured parameters can also have defaults: { name = 'Guest' }",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Default Parameters =====

// ── Basic defaults ──────────────────────────
function greet(name = "Guest") {
  console.log("Hello, " + name + "!");
}
greet("Alice");   // "Hello, Alice!"
greet();          // "Hello, Guest!"
greet(undefined); // "Hello, Guest!" (undefined triggers default)

// ── null does NOT trigger default ───────────
console.log("\\n--- null vs undefined ---");
function show(val = "default") {
  console.log("  Value:", val);
}
show(undefined);  // "default"
show(null);       // null (not the default!)
show(0);          // 0
show("");         // ""

// ── Multiple defaults ───────────────────────
console.log("\\n--- Multiple Defaults ---");
function createCard(title = "Untitled", color = "blue", size = "medium") {
  return { title, color, size };
}
console.log(createCard());
console.log(createCard("My Card"));
console.log(createCard("My Card", "red"));
console.log(createCard("My Card", "red", "large"));

// ── Expressions as defaults ─────────────────
console.log("\\n--- Expression Defaults ---");
function getID(prefix = "user", id = Math.floor(Math.random() * 1000)) {
  return prefix + "-" + id;
}
console.log(getID());
console.log(getID("admin"));
console.log(getID("admin", 42));

// ── Using earlier params in defaults ────────
console.log("\\n--- Param References ---");
function createRange(start, end, step = (end > start ? 1 : -1)) {
  let result = [];
  if (step > 0) {
    for (let i = start; i <= end; i += step) result.push(i);
  } else {
    for (let i = start; i >= end; i += step) result.push(i);
  }
  return result;
}
console.log("1 to 5:", createRange(1, 5));
console.log("5 to 1:", createRange(5, 1));
console.log("0 to 10 by 2:", createRange(0, 10, 2));

// ── Destructured defaults ───────────────────
console.log("\\n--- Destructured Defaults ---");
function setupUser({ name = "Guest", role = "viewer", theme = "light" } = {}) {
  return { name, role, theme };
}
console.log(setupUser({ name: "Alice", role: "admin" }));
console.log(setupUser({ name: "Bob" }));
console.log(setupUser());  // works because of = {} default

// ── Real app: API request with defaults ─────
console.log("\\n--- API Request Config ---");
function fetchData(url, { method = "GET", headers = {}, timeout = 5000 } = {}) {
  console.log(\`  \${method} \${url} (timeout: \${timeout}ms)\`);
  console.log("  Headers:", JSON.stringify(headers));
}
fetchData("/api/users");
fetchData("/api/users", { method: "POST", timeout: 10000 });
`,
    },
    interviewQuestions: [
      {
        question: "When are default parameter values used?",
        difficulty: "Easy",
        hint: "Default values are used only when the argument is undefined — either not passed at all or explicitly passed as undefined. null, 0, '', and false do NOT trigger defaults. This is different from the old || pattern which treats all falsy values as missing.",
      },
      {
        question: "What is the difference between default parameters and the || fallback pattern?",
        difficulty: "Medium",
        hint: "Default parameters (param = default) only activate on undefined. The || pattern (param = param || default) activates on ANY falsy value (0, '', false, null, undefined). So greet(0) with || would use the default, but with default parameters, 0 would be kept. Default parameters are safer and more predictable.",
      },
      {
        question: "Are default parameter values evaluated at definition time or call time?",
        difficulty: "Medium",
        hint: "Call time. Each function call evaluates the default expression fresh. This means function getID(id = Math.random()) gives a different default each call. It also means you can reference previous parameters: function rect(w, h = w) uses w's value at call time.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 25. Rest Parameters
  // ─────────────────────────────────────────────
  {
    id: "rest-parameters",
    title: "Rest Parameters",
    slug: "rest-parameters",
    icon: "MoreHorizontal",
    difficulty: "Beginner",
    description:
      "Learn how to accept an indefinite number of arguments using the rest parameter syntax (...args) — a real JavaScript array.",
    concept: {
      explanation:
        "The rest parameter syntax (...paramName) collects all remaining arguments into a real JavaScript array. Unlike the old 'arguments' object (array-like but not an array), rest parameters give you a genuine Array with full access to map, filter, reduce, and other array methods. The rest parameter must be the LAST parameter in the function definition — you can have named parameters before it, and the rest collects everything else. Rest parameters work in both regular and arrow functions. The spread operator (...) uses the same syntax but does the opposite: it expands an array into individual values. Together, rest and spread are essential tools for flexible function signatures.",
      realLifeAnalogy:
        "Rest parameters are like a 'take a number' system at a deli. The first few customers might have reservations (named parameters), but the rest (...everyone) just takes a number and joins the queue (array). No matter how many people show up, they all get collected into one organized line. The old 'arguments' way was like a crowd with no queue — everyone was there but hard to work with. Rest parameters bring order.",
      keyPoints: [
        "Syntax: function name(a, b, ...rest) { } — rest is a real Array",
        "Must be the LAST parameter — only one rest parameter allowed",
        "Collects ALL remaining arguments into an array",
        "Unlike 'arguments': it is a real Array with map, filter, reduce, etc.",
        "Works in arrow functions (arguments does not)",
        "If no extra arguments, rest is an empty array []",
        "Spread (...) is the opposite: expands an array into arguments",
        "Common pattern: function log(level, ...messages) { }",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Rest Parameters =====

// ── Basic rest parameter ────────────────────
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log("sum(1,2,3):", sum(1, 2, 3));
console.log("sum(10,20,30,40):", sum(10, 20, 30, 40));

// ── Rest is a real array ────────────────────
console.log("\\n--- Real Array ---");
function showType(...args) {
  console.log("  Is array:", Array.isArray(args));
  console.log("  Length:", args.length);
  console.log("  Values:", args);
}
showType("a", "b", "c");

// ── Named params + rest ─────────────────────
console.log("\\n--- Named + Rest ---");
function log(level, ...messages) {
  const prefix = "[" + level.toUpperCase() + "]";
  messages.forEach(msg => console.log("  " + prefix, msg));
}
log("info", "Server started", "Listening on port 3000");
log("error", "Connection failed");

// ── Rest vs arguments ───────────────────────
console.log("\\n--- Rest vs arguments ---");

// Old way (arguments object — not a real array)
function oldWay() {
  // arguments.map() would fail — it's not an array
  let arr = Array.from(arguments);  // must convert first
  console.log("  arguments converted:", arr);
}
oldWay(1, 2, 3);

// New way (rest — already an array)
const newWay = (...args) => {
  let doubled = args.map(n => n * 2);  // works directly!
  console.log("  rest doubled:", doubled);
};
newWay(1, 2, 3);

// ── Real app: flexible event emitter ────────
console.log("\\n--- Event Emitter ---");
function emit(event, ...data) {
  console.log(\`  Event: "\${event}" with \${data.length} arg(s)\`);
  console.log("  Data:", data);
}
emit("click", { x: 100, y: 200 });
emit("submit", "form1", { name: "Alice" }, true);

// ── Spread operator (opposite of rest) ──────
console.log("\\n--- Spread (opposite) ---");
const nums = [5, 2, 8, 1, 9];
console.log("  Max:", Math.max(...nums));  // spread array into args

function multiply(a, b, c) {
  return a * b * c;
}
const values = [2, 3, 4];
console.log("  multiply:", multiply(...values));

// ── Real app: merge & collect ───────────────
console.log("\\n--- Merge Arrays ---");
function mergeUnique(...arrays) {
  return [...new Set(arrays.flat())];
}
console.log(mergeUnique([1, 2, 3], [3, 4, 5], [5, 6, 1]));

// ── Destructuring with rest ─────────────────
console.log("\\n--- Destructuring + Rest ---");
const [first, second, ...remaining] = [10, 20, 30, 40, 50];
console.log("  First:", first);
console.log("  Second:", second);
console.log("  Rest:", remaining);
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between rest parameters and the arguments object?",
        difficulty: "Easy",
        hint: "Rest parameters (...args) produce a real Array with full array methods (map, filter, reduce). The arguments object is array-like (has length and indices) but is NOT a real array. Rest works in arrow functions; arguments does not. Rest only collects 'remaining' args; arguments collects all args.",
      },
      {
        question: "What is the difference between rest and spread operators?",
        difficulty: "Easy",
        hint: "Both use ... syntax but do opposite things. Rest COLLECTS multiple elements into an array (in function parameters or destructuring). Spread EXPANDS an array into individual elements (in function calls or array/object literals). Rest: function sum(...nums). Spread: Math.max(...nums).",
      },
      {
        question: "Can you have multiple rest parameters in a function?",
        difficulty: "Easy",
        hint: "No. You can only have ONE rest parameter and it must be the LAST parameter. function fn(a, ...b, c) is a SyntaxError. This is because the rest parameter collects ALL remaining arguments — there would be no way to determine where one rest ends and another begins.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 26. Callback Functions
  // ─────────────────────────────────────────────
  {
    id: "callback-functions",
    title: "Callback Functions",
    slug: "callback-functions",
    icon: "PhoneCall",
    difficulty: "Intermediate",
    description:
      "Learn the callback pattern — passing functions as arguments to other functions for asynchronous operations and custom behavior.",
    concept: {
      explanation:
        "A callback is a function passed as an argument to another function, to be called (called back) at a later time. Callbacks are fundamental to JavaScript because JS is single-threaded — instead of blocking while waiting for operations like timers, network requests, or file reads, JavaScript continues executing and calls the callback when the operation completes. Synchronous callbacks run immediately during the execution of the function (like forEach, map, filter). Asynchronous callbacks run later, after some event or operation finishes (like setTimeout, event listeners, fetch). The callback pattern was the primary way to handle async operations before Promises and async/await.",
      realLifeAnalogy:
        "A callback is like leaving your phone number at a restaurant when there is a wait. You say: 'Here is my number (callback function) — call me when my table is ready (async operation completes).' You do not stand there waiting (blocking) — you go shopping, browse your phone, do other things. When the table is ready, they call you back. The restaurant (JavaScript engine) handles many customers this way — taking numbers, preparing tables, calling people back in order.",
      keyPoints: [
        "A callback is a function passed as an argument to another function",
        "Synchronous callbacks run immediately (forEach, map, filter, sort)",
        "Asynchronous callbacks run later (setTimeout, event listeners, fetch)",
        "Callbacks enable non-blocking code in single-threaded JavaScript",
        "Callback hell: deeply nested callbacks that are hard to read",
        "Promises and async/await were created to solve callback hell",
        "Error-first callbacks: convention where first arg is error (Node.js pattern)",
        "Always handle errors in callbacks — unhandled errors can crash the app",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Callback Functions =====

// ── Basic callback ──────────────────────────
function processData(data, callback) {
  let result = data.toUpperCase();
  callback(result);
}
processData("hello", function(processed) {
  console.log("Processed:", processed);
});

// ── Synchronous callbacks (array methods) ───
console.log("\\n--- Sync Callbacks ---");
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(function(num) {
  console.log("  forEach:", num);
});

const doubled = numbers.map(function(num) {
  return num * 2;
});
console.log("  map:", doubled);

const evens = numbers.filter(function(num) {
  return num % 2 === 0;
});
console.log("  filter:", evens);

// ── Callback with arrow functions ───────────
console.log("\\n--- Arrow Callbacks ---");
const sorted = [...numbers].sort((a, b) => b - a);
console.log("  Sorted desc:", sorted);

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("  Sum:", sum);

// ── Custom higher-order function ────────────
console.log("\\n--- Custom Repeat ---");
function repeat(times, action) {
  for (let i = 0; i < times; i++) {
    action(i);
  }
}
repeat(3, (i) => console.log("  Iteration:", i));

// ── Async callback (setTimeout) ─────────────
console.log("\\n--- Async Callbacks ---");
console.log("  Before setTimeout");
setTimeout(function() {
  console.log("  Inside setTimeout (after 0ms)");
}, 0);
console.log("  After setTimeout (runs first!)");

// ── Real app: data transformation pipeline ──
console.log("\\n--- Data Pipeline ---");
const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 17, active: true },
  { name: "Charlie", age: 30, active: false },
  { name: "Diana", age: 22, active: true },
];

const result = users
  .filter(u => u.active)
  .filter(u => u.age >= 18)
  .map(u => u.name)
  .sort();
console.log("  Active adults:", result);

// ── Error-first callback (Node.js pattern) ──
console.log("\\n--- Error-First Pattern ---");
function readFile(filename, callback) {
  if (!filename) {
    callback(new Error("Filename required"), null);
    return;
  }
  // Simulate successful read
  callback(null, "File contents of " + filename);
}

readFile("data.txt", (err, data) => {
  if (err) {
    console.log("  Error:", err.message);
    return;
  }
  console.log("  Success:", data);
});

readFile("", (err, data) => {
  if (err) {
    console.log("  Error:", err.message);
    return;
  }
  console.log("  Success:", data);
});

// ── Callback hell preview ───────────────────
console.log("\\n--- Callback Hell (avoid this!) ---");
console.log("  step1 -> step2 -> step3 -> done");
console.log("  Solution: use Promises or async/await");
`,
    },
    interviewQuestions: [
      {
        question: "What is a callback function and why are they used in JavaScript?",
        difficulty: "Easy",
        hint: "A callback is a function passed as an argument to another function, called at a later time. They are used because JavaScript is single-threaded — callbacks allow non-blocking async operations. Instead of waiting for a timer/request to complete, JS continues executing and calls the callback when the operation finishes.",
      },
      {
        question: "What is callback hell and how do you avoid it?",
        difficulty: "Medium",
        hint: "Callback hell is deeply nested callbacks that form a pyramid shape, making code hard to read and maintain. Solutions: 1) Name your callbacks instead of nesting anonymous functions. 2) Use Promises with .then() chains. 3) Use async/await for flat, synchronous-looking async code. 4) Break callbacks into separate named functions.",
      },
      {
        question: "What is the error-first callback pattern?",
        difficulty: "Medium",
        hint: "A Node.js convention where the callback's first argument is an error (null if success) and the second is the data. callback(error, data). The caller always checks if error is truthy first. This standardizes error handling across async operations. Example: fs.readFile('file', (err, data) => { if (err) handle(err); }).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 27. Higher Order Functions
  // ─────────────────────────────────────────────
  {
    id: "higher-order-functions",
    title: "Higher Order Functions",
    slug: "higher-order-functions",
    icon: "Workflow",
    difficulty: "Intermediate",
    description:
      "Master functions that take functions as arguments or return functions — the foundation of functional programming in JavaScript.",
    concept: {
      explanation:
        "A higher-order function (HOF) is a function that either takes one or more functions as arguments, returns a function, or both. JavaScript's built-in array methods (map, filter, reduce, forEach, sort, find, some, every) are all higher-order functions because they accept callback functions. HOFs enable powerful patterns: function composition (combining simple functions into complex ones), currying (transforming multi-argument functions into chains of single-argument functions), and creating reusable abstractions. The ability to return functions creates closures — functions that remember the environment they were created in, even after that environment is gone.",
      realLifeAnalogy:
        "A higher-order function is like a manager who delegates work. The manager (HOF) does not do the specific task — they take in a specialist (callback function) and coordinate the work. map is like a manager who says 'apply this transformation to every item'. filter is a manager who says 'keep only the items that pass this test'. The manager provides the structure; the specialist provides the specific logic. This separation makes both more flexible and reusable.",
      keyPoints: [
        "HOF: takes functions as arguments, returns functions, or both",
        "Built-in HOFs: map, filter, reduce, forEach, sort, find, some, every",
        "map: transforms every element -> new array of same length",
        "filter: keeps elements that pass a test -> new array (possibly shorter)",
        "reduce: accumulates all elements into a single value",
        "Returning functions enables closures and factory patterns",
        "Function composition: combining simple functions into complex operations",
        "HOFs make code more declarative — describe WHAT, not HOW",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Higher Order Functions =====

// ── Functions that TAKE functions ───────────
console.log("--- Built-in HOFs ---");
const products = [
  { name: "Laptop", price: 999, category: "electronics" },
  { name: "Book", price: 15, category: "education" },
  { name: "Phone", price: 699, category: "electronics" },
  { name: "Course", price: 49, category: "education" },
  { name: "Tablet", price: 499, category: "electronics" },
];

// map: transform each element
const names = products.map(p => p.name);
console.log("Names:", names);

// filter: keep elements passing test
const electronics = products.filter(p => p.category === "electronics");
console.log("Electronics:", electronics.map(p => p.name));

// reduce: accumulate into single value
const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
console.log("Total: $" + totalPrice);

// find: first match
const found = products.find(p => p.price < 20);
console.log("Under $20:", found?.name);

// some & every
console.log("Any under $10?", products.some(p => p.price < 10));
console.log("All under $1000?", products.every(p => p.price < 1000));

// ── Custom HOF ──────────────────────────────
console.log("\\n--- Custom HOFs ---");
function applyOperation(numbers, operation) {
  return numbers.map(operation);
}

const nums = [1, 2, 3, 4, 5];
console.log("Squared:", applyOperation(nums, n => n ** 2));
console.log("Negated:", applyOperation(nums, n => -n));

// ── Functions that RETURN functions ─────────
console.log("\\n--- Factory Functions ---");
function createGreeter(greeting) {
  return function(name) {
    return greeting + ", " + name + "!";
  };
}

const hello = createGreeter("Hello");
const hola = createGreeter("Hola");
console.log(hello("Alice"));
console.log(hola("Bob"));

// ── Multiplier factory ──────────────────────
function createMultiplier(factor) {
  return n => n * factor;
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log("\\nDouble [1,2,3]:", [1, 2, 3].map(double));
console.log("Triple [1,2,3]:", [1, 2, 3].map(triple));

// ── Function composition ────────────────────
console.log("\\n--- Composition ---");
const trim = str => str.trim();
const lower = str => str.toLowerCase();
const exclaim = str => str + "!";

function compose(...fns) {
  return (value) => fns.reduce((acc, fn) => fn(acc), value);
}

const cleanAndExclaim = compose(trim, lower, exclaim);
console.log(cleanAndExclaim("  Hello World  "));

// ── Real app: data pipeline ─────────────────
console.log("\\n--- Data Pipeline ---");
const orders = [
  { item: "Laptop", price: 999, qty: 1 },
  { item: "Mouse", price: 25, qty: 3 },
  { item: "Keyboard", price: 75, qty: 2 },
  { item: "Cable", price: 10, qty: 5 },
];

const report = orders
  .map(o => ({ ...o, total: o.price * o.qty }))
  .filter(o => o.total > 50)
  .sort((a, b) => b.total - a.total)
  .map(o => \`\${o.item}: $\${o.total}\`);

console.log("High-value orders:");
report.forEach(r => console.log("  " + r));

// ── Real app: validator builder ─────────────
console.log("\\n--- Validator Builder ---");
function createValidator(rules) {
  return function(value) {
    return rules.every(rule => rule(value));
  };
}

const isValidPassword = createValidator([
  pwd => pwd.length >= 8,
  pwd => /[A-Z]/.test(pwd),
  pwd => /[0-9]/.test(pwd),
]);

console.log("Abc12345:", isValidPassword("Abc12345"));
console.log("weak:", isValidPassword("weak"));
`,
    },
    interviewQuestions: [
      {
        question: "What is a higher-order function? Give examples.",
        difficulty: "Easy",
        hint: "A HOF takes functions as arguments or returns functions. Built-in examples: map, filter, reduce, forEach, sort, find, some, every. Custom example: function createMultiplier(factor) { return n => n * factor; } — it returns a function. HOFs enable abstraction, composition, and reusable patterns.",
      },
      {
        question: "Explain map, filter, and reduce with examples.",
        difficulty: "Medium",
        hint: "map: transforms each element, returns new array of same length. [1,2,3].map(n => n*2) -> [2,4,6]. filter: keeps elements passing a test, returns new array. [1,2,3].filter(n => n>1) -> [2,3]. reduce: accumulates elements into single value. [1,2,3].reduce((sum,n) => sum+n, 0) -> 6. None modify the original array.",
      },
      {
        question: "What is function composition and why is it useful?",
        difficulty: "Hard",
        hint: "Function composition combines simple functions into complex operations by passing the output of one function as the input to the next. compose(f, g)(x) = g(f(x)). It promotes: reusable small functions, readable pipelines, separation of concerns, and testability. Instead of one big function, you chain small focused ones.",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  // Level 4 — Arrays and Objects
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "javascript-arrays",
    title: "JavaScript Arrays",
    slug: "javascript-arrays",
    icon: "LayoutGrid",
    difficulty: "Beginner",
    description:
      "Learn how to create, access, and manipulate arrays — the most commonly used data structure in JavaScript.",
    concept: {
      explanation:
        "An array is an ordered collection of values stored under a single variable name. Arrays in JavaScript are zero-indexed, meaning the first element is at index 0. Unlike many languages, JavaScript arrays are dynamic — they can grow or shrink, and can hold mixed types (though you should generally keep types consistent). Arrays are objects under the hood, with numeric keys and a special length property. They are passed by reference, not by value — assigning an array to a new variable does not create a copy. Arrays are one of the most interview-tested topics because almost every coding challenge involves array manipulation.",
      realLifeAnalogy:
        "An array is like a numbered locker row in a school hallway. Each locker has a number starting from 0, and you can store anything inside. You can quickly access locker 5, add a new locker at the end, or remove the last locker. The row can grow longer or shorter as needed, and you always know the total count of lockers.",
      keyPoints: [
        "Create with literal: const arr = [1, 2, 3]",
        "Access by index: arr[0] is the first element",
        "Arrays are zero-indexed — first index is 0, last is arr.length - 1",
        "arr.length returns the number of elements",
        "push() adds to end, pop() removes from end",
        "unshift() adds to start, shift() removes from start",
        "Arrays are reference types — assigning copies the reference, not the data",
        "typeof [] returns 'object' — use Array.isArray() to check",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== JavaScript Arrays =====

// ── Creating arrays ────────────────────────────
const fruits = ["Apple", "Banana", "Cherry"];
console.log("fruits:", fruits);
console.log("length:", fruits.length);

// ── Accessing elements ─────────────────────────
console.log("\\nFirst:", fruits[0]);
console.log("Last:", fruits[fruits.length - 1]);

// ── Adding and removing ────────────────────────
fruits.push("Date");         // add to end
console.log("\\nAfter push:", fruits);
fruits.pop();                // remove from end
console.log("After pop:", fruits);

fruits.unshift("Avocado");   // add to start
console.log("After unshift:", fruits);
fruits.shift();              // remove from start
console.log("After shift:", fruits);

// ── splice: insert/remove at index ────────────
const nums = [1, 2, 3, 4, 5];
nums.splice(2, 1);          // remove 1 element at index 2
console.log("\\nAfter splice(2,1):", nums);
nums.splice(1, 0, 10, 20);  // insert at index 1
console.log("After splice(1,0,10,20):", nums);

// ── Array.isArray ──────────────────────────────
console.log("\\ntypeof []:", typeof []);
console.log("Array.isArray([]):", Array.isArray([]));

// ── Interview: find two numbers that sum to target ──
function twoSum(arr, target) {
  const seen = {};
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (complement in seen) return [seen[complement], i];
    seen[arr[i]] = i;
  }
  return [];
}
console.log("\\ntwoSum([2,7,11,15], 9):", twoSum([2,7,11,15], 9));
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between push/pop and unshift/shift?",
        difficulty: "Easy",
        hint: "push/pop work at the end (O(1)). unshift/shift work at the beginning (O(n) because all elements must be re-indexed). In performance-critical code, prefer push/pop.",
      },
      {
        question: "How do you check if a variable is an array?",
        difficulty: "Easy",
        hint: "Use Array.isArray(val). typeof returns 'object' for arrays, which is misleading. instanceof Array works but fails across frames/iframes. Array.isArray() is the most reliable method.",
      },
      {
        question: "Explain the difference between slice() and splice().",
        difficulty: "Medium",
        hint: "slice(start, end) returns a shallow copy of a portion without modifying the original. splice(start, deleteCount, ...items) modifies the original array by removing/replacing/adding elements. slice is pure, splice mutates.",
      },
    ],
  },
  {
    id: "array-methods",
    title: "Array Methods (map, filter, reduce)",
    slug: "array-methods",
    icon: "Zap",
    difficulty: "Intermediate",
    description:
      "Master the three most important array methods — map, filter, and reduce — used in nearly every JavaScript interview.",
    concept: {
      explanation:
        "map, filter, and reduce are higher-order array methods that let you transform, filter, and aggregate data without mutating the original array. map() creates a new array by transforming every element. filter() creates a new array with only elements that pass a test. reduce() accumulates all elements into a single value (number, string, object, or array). These three methods form the backbone of functional-style JavaScript. They can be chained together: arr.filter(...).map(...).reduce(...). They are used everywhere — in React components, data processing, API response handling, and are among the most asked topics in interviews.",
      realLifeAnalogy:
        "Imagine a factory assembly line with three stations. map is like a painting station — every item passes through and gets a new coat of paint (transformed). filter is like a quality control inspector — only items meeting standards continue. reduce is like a packaging station — all items are combined into a single box (aggregated). You can chain these stations in any order to process your products.",
      keyPoints: [
        "map(fn): transforms each element, returns new array of same length",
        "filter(fn): keeps elements where fn returns true, returns new array",
        "reduce(fn, initial): accumulates elements into a single value",
        "None of these methods mutate the original array",
        "They can be chained: arr.filter().map().reduce()",
        "map callback receives (element, index, array)",
        "reduce callback receives (accumulator, current, index, array)",
        "Always provide an initial value to reduce() to avoid edge cases",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== map, filter, reduce =====

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ── map: transform each element ────────────────
const doubled = numbers.map(n => n * 2);
console.log("doubled:", doubled);

const users = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 35 },
];
const names = users.map(u => u.name);
console.log("names:", names);

// ── filter: keep matching elements ─────────────
const evens = numbers.filter(n => n % 2 === 0);
console.log("\\nevens:", evens);

const adults = users.filter(u => u.age >= 25);
console.log("adults:", adults.map(u => u.name));

// ── reduce: accumulate into one value ──────────
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("\\nsum:", sum);

const oldest = users.reduce((max, u) =>
  u.age > max.age ? u : max
);
console.log("oldest:", oldest.name);

// ── Chaining: real interview pattern ───────────
// Get total price of items over $10
const cart = [
  { item: "Shirt", price: 25 },
  { item: "Socks", price: 5 },
  { item: "Pants", price: 40 },
  { item: "Hat", price: 8 },
];

const total = cart
  .filter(p => p.price > 10)
  .map(p => p.price)
  .reduce((sum, price) => sum + price, 0);

console.log("\\nTotal (items > $10):", "$" + total);

// ── Interview: group by category ───────────────
const products = [
  { name: "Apple", cat: "fruit" },
  { name: "Carrot", cat: "veggie" },
  { name: "Banana", cat: "fruit" },
  { name: "Broccoli", cat: "veggie" },
];

const grouped = products.reduce((groups, item) => {
  (groups[item.cat] = groups[item.cat] || []).push(item.name);
  return groups;
}, {});
console.log("\\ngrouped:", grouped);
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between map() and forEach()?",
        difficulty: "Easy",
        hint: "map() returns a new array with transformed elements. forEach() returns undefined — it is for side effects only. Use map() when you need the result, forEach() when you just need to iterate (like logging).",
      },
      {
        question: "Implement Array.prototype.map using reduce.",
        difficulty: "Hard",
        hint: "arr.reduce((result, item, index) => { result.push(callback(item, index, arr)); return result; }, []). This shows reduce is the most powerful — you can implement map and filter with it.",
      },
      {
        question: "How would you group an array of objects by a property?",
        difficulty: "Medium",
        hint: "Use reduce: arr.reduce((groups, item) => { const key = item[prop]; (groups[key] = groups[key] || []).push(item); return groups; }, {}). This is a very common interview pattern and also available as Object.groupBy() in modern JS.",
      },
    ],
  },
  {
    id: "array-iteration-methods",
    title: "Array Iteration Methods",
    slug: "array-iteration-methods",
    icon: "Repeat",
    difficulty: "Intermediate",
    description:
      "Learn every, some, find, findIndex, includes, and other iteration methods that make array searching effortless.",
    concept: {
      explanation:
        "Beyond map/filter/reduce, JavaScript arrays have several specialized iteration methods. find() returns the first element matching a condition. findIndex() returns its index. some() checks if at least one element passes a test. every() checks if all elements pass. includes() checks for value existence. indexOf/lastIndexOf find element positions. flat() flattens nested arrays. flatMap() maps then flattens in one step. These methods replace manual loops, making code more readable and less error-prone. Interviewers test these to see if you know the right tool for each job.",
      realLifeAnalogy:
        "Think of a classroom of students. find() is like a teacher scanning for the first student wearing red — they stop after finding one. some() is checking if ANY student passed the exam. every() is checking if ALL students passed. includes() is calling a name during attendance. findIndex() is finding which seat number a particular student sits in.",
      keyPoints: [
        "find(fn): returns first element where fn is true, or undefined",
        "findIndex(fn): returns index of first match, or -1",
        "some(fn): returns true if ANY element passes the test",
        "every(fn): returns true if ALL elements pass the test",
        "includes(val): returns true if array contains the value (uses ===)",
        "indexOf(val): returns first index of value, or -1",
        "flat(depth): flattens nested arrays to specified depth",
        "flatMap(fn): maps then flattens one level — more efficient than map().flat()",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Array Iteration Methods =====

const users = [
  { id: 1, name: "Alice", active: true, score: 85 },
  { id: 2, name: "Bob", active: false, score: 42 },
  { id: 3, name: "Charlie", active: true, score: 91 },
  { id: 4, name: "Diana", active: true, score: 78 },
];

// ── find: first match ──────────────────────────
const bob = users.find(u => u.name === "Bob");
console.log("find Bob:", bob);

// ── findIndex: index of first match ────────────
const idx = users.findIndex(u => u.score > 90);
console.log("findIndex (score > 90):", idx, "->", users[idx].name);

// ── some: does ANY element match? ──────────────
const hasInactive = users.some(u => !u.active);
console.log("\\nsome inactive?", hasInactive);

// ── every: do ALL elements match? ──────────────
const allActive = users.every(u => u.active);
console.log("every active?", allActive);

// ── includes / indexOf ─────────────────────────
const nums = [10, 20, 30, 40, 50];
console.log("\\nincludes 30?", nums.includes(30));
console.log("indexOf 40:", nums.indexOf(40));
console.log("indexOf 99:", nums.indexOf(99));

// ── flat: flatten nested arrays ────────────────
const nested = [1, [2, 3], [4, [5, 6]]];
console.log("\\nflat(1):", nested.flat(1));
console.log("flat(Infinity):", nested.flat(Infinity));

// ── flatMap ────────────────────────────────────
const sentences = ["Hello world", "Goodbye moon"];
const words = sentences.flatMap(s => s.split(" "));
console.log("\\nflatMap:", words);

// ── Interview: remove duplicates ───────────────
const dupes = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(dupes)];
console.log("\\nunique:", unique);
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between find() and filter()?",
        difficulty: "Easy",
        hint: "find() returns the FIRST matching element (or undefined). filter() returns ALL matching elements in a new array. find() stops after the first match (more efficient when you only need one).",
      },
      {
        question: "How do you remove duplicates from an array?",
        difficulty: "Medium",
        hint: "[...new Set(arr)] is the simplest. Alternatively: arr.filter((val, idx, self) => self.indexOf(val) === idx). For objects, use a Map keyed by unique property: [...new Map(arr.map(o => [o.id, o])).values()].",
      },
      {
        question: "What is the difference between some() and every()?",
        difficulty: "Easy",
        hint: "some() returns true if at least ONE element passes the test (logical OR). every() returns true only if ALL elements pass (logical AND). Both short-circuit: some stops at first true, every stops at first false.",
      },
    ],
  },
  {
    id: "spread-operator",
    title: "Spread Operator",
    slug: "spread-operator",
    icon: "Expand",
    difficulty: "Intermediate",
    description:
      "Master the spread operator (...) for copying, merging, and expanding arrays and objects — a must-know for interviews.",
    concept: {
      explanation:
        "The spread operator (...) expands an iterable (array, string, object) into individual elements. It is used to copy arrays/objects, merge them, pass array elements as function arguments, and convert iterables to arrays. Spread creates shallow copies — nested objects still share references. In objects, spread copies own enumerable properties; later properties overwrite earlier ones (useful for merging with defaults). The spread operator is one of the most versatile ES6+ features and appears in nearly every modern JavaScript codebase. It is essential for immutable state updates in React.",
      realLifeAnalogy:
        "Spread is like unpacking a suitcase. If you have a suitcase (array) of clothes and you spread them out on a bed, each item is now separate. You can then pick some items, add new ones, and repack them into a new suitcase. The original suitcase is unchanged. For objects, it is like photocopying a form and then writing over some fields on the copy.",
      keyPoints: [
        "Array spread: [...arr] creates a shallow copy",
        "Merge arrays: [...arr1, ...arr2]",
        "Function args: Math.max(...numbers)",
        "Object spread: {...obj} creates a shallow copy",
        "Merge objects: {...defaults, ...userConfig}",
        "Later properties overwrite earlier ones in object spread",
        "Spread is SHALLOW — nested objects are still references",
        "String spread: [...'hello'] → ['h','e','l','l','o']",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Spread Operator =====

// ── Array copy and merge ───────────────────────
const a = [1, 2, 3];
const b = [4, 5, 6];
const copy = [...a];
const merged = [...a, ...b];
console.log("copy:", copy);
console.log("merged:", merged);

// ── Insert in middle ───────────────────────────
const middle = [1, 2, ...["a", "b"], 3, 4];
console.log("middle:", middle);

// ── Function arguments ─────────────────────────
const nums = [5, 12, 8, 130, 44];
console.log("\\nmax:", Math.max(...nums));

// ── Object copy and merge ──────────────────────
const defaults = { theme: "light", lang: "en", debug: false };
const userPrefs = { theme: "dark", lang: "en" };
const config = { ...defaults, ...userPrefs };
console.log("\\nconfig:", config);

// ── Immutable update (React pattern) ───────────
const user = { name: "Alice", age: 25, role: "dev" };
const updated = { ...user, age: 26 };
console.log("\\noriginal:", user);
console.log("updated:", updated);

// ── Shallow copy warning ───────────────────────
const original = { name: "Alice", scores: [90, 85] };
const cloned = { ...original };
cloned.scores.push(100);
console.log("\\noriginal.scores:", original.scores);
console.log("cloned.scores:", cloned.scores);
console.log("Same reference!", original.scores === cloned.scores);

// ── Interview: merge without duplicates ────────
const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5];
const unique = [...new Set([...arr1, ...arr2])];
console.log("\\nunique merge:", unique);
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between spread and rest?",
        difficulty: "Easy",
        hint: "Same syntax (...) but opposite purpose. Spread EXPANDS: [...arr] unpacks elements. Rest COLLECTS: function(...args) gathers arguments into an array. Spread is used in calls/literals, rest in definitions/destructuring.",
      },
      {
        question: "Does spread create a deep copy?",
        difficulty: "Medium",
        hint: "No, spread creates a SHALLOW copy. Top-level primitives are copied by value, but nested objects/arrays are copied by reference. For deep copy use structuredClone(obj), JSON.parse(JSON.stringify(obj)), or a library like lodash.cloneDeep().",
      },
      {
        question: "How do you merge two objects with spread, handling conflicts?",
        difficulty: "Medium",
        hint: "Later properties win: {...obj1, ...obj2} — obj2's properties overwrite obj1's. For deep merging nested objects, spread only merges one level. You need a recursive merge or structuredClone + spread for nested properties.",
      },
    ],
  },
  {
    id: "javascript-objects",
    title: "JavaScript Objects",
    slug: "javascript-objects",
    icon: "Box",
    difficulty: "Beginner",
    description:
      "Understand JavaScript objects — key-value pairs that form the basis of nearly everything in JavaScript.",
    concept: {
      explanation:
        "An object is an unordered collection of key-value pairs (properties). Keys are strings (or Symbols), and values can be any type. Objects are JavaScript's most fundamental data structure — arrays, functions, dates, and regex are all objects. You create objects with literal syntax {}, constructors, or Object.create(). Access properties with dot notation (obj.name) or bracket notation (obj['name']). Objects are passed by reference — modifying a passed object affects the original. Bracket notation is needed for dynamic keys, keys with spaces, or computed property names. Understanding objects is critical because they are used for data modeling, configuration, API responses, and state management.",
      realLifeAnalogy:
        "An object is like an ID card. It has labeled fields — name, age, address, photo — each holding a specific value. You can look up any field by its label, add new fields, or update existing ones. Every person's ID card follows the same structure but with different values, just like objects created from the same template.",
      keyPoints: [
        "Create with literal: const obj = { key: value }",
        "Dot access: obj.name — clean but key must be valid identifier",
        "Bracket access: obj['key'] — works with any string, variables, expressions",
        "Add properties: obj.newKey = value",
        "Delete properties: delete obj.key",
        "Check existence: 'key' in obj or obj.hasOwnProperty('key')",
        "Object.keys(obj), Object.values(obj), Object.entries(obj)",
        "Objects are reference types — assignment copies the reference",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== JavaScript Objects =====

// ── Creating objects ───────────────────────────
const user = {
  name: "Alice",
  age: 28,
  isAdmin: true,
  hobbies: ["reading", "coding"],
};
console.log("user:", user);

// ── Accessing properties ───────────────────────
console.log("\\nDot:", user.name);
console.log("Bracket:", user["age"]);

// Dynamic key with bracket notation
const key = "isAdmin";
console.log("Dynamic:", user[key]);

// ── Modifying objects ──────────────────────────
user.email = "alice@example.com";   // add
user.age = 29;                      // update
delete user.isAdmin;                // delete
console.log("\\nModified:", user);

// ── Checking existence ─────────────────────────
console.log("\\n'name' in user:", "name" in user);
console.log("'phone' in user:", "phone" in user);

// ── Object.keys / values / entries ────────────
const car = { make: "Toyota", model: "Camry", year: 2023 };
console.log("\\nkeys:", Object.keys(car));
console.log("values:", Object.values(car));
console.log("entries:", Object.entries(car));

// ── Shorthand properties ───────────────────────
const name = "Bob";
const age = 30;
const person = { name, age };   // same as { name: name, age: age }
console.log("\\nshorthand:", person);

// ── Computed property names ────────────────────
const field = "score";
const obj = { [field]: 100, [\`\${field}Label\`]: "points" };
console.log("computed:", obj);

// ── Interview: count character frequency ───────
function charFreq(str) {
  return [...str].reduce((freq, ch) => {
    freq[ch] = (freq[ch] || 0) + 1;
    return freq;
  }, {});
}
console.log("\\ncharFreq('hello'):", charFreq("hello"));
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between dot and bracket notation?",
        difficulty: "Easy",
        hint: "Dot notation (obj.key) is cleaner but requires a valid identifier (no spaces, no starting with numbers). Bracket notation (obj['key']) accepts any string, variables, and expressions. Use bracket for dynamic keys: obj[variable], obj['multi word'], obj[computedKey].",
      },
      {
        question: "How do you iterate over an object's properties?",
        difficulty: "Easy",
        hint: "for...in loop (includes inherited). Object.keys(obj).forEach() for own keys only. Object.entries(obj) for [key, value] pairs. Object.keys/values/entries only return own enumerable properties, while for...in also iterates inherited ones.",
      },
      {
        question: "What is the difference between 'in' operator and hasOwnProperty?",
        difficulty: "Medium",
        hint: "'key' in obj checks own AND inherited properties. obj.hasOwnProperty('key') checks ONLY own properties. Example: 'toString' in {} is true (inherited from Object.prototype), {}.hasOwnProperty('toString') is false. Modern: Object.hasOwn(obj, 'key').",
      },
    ],
  },
  {
    id: "object-methods",
    title: "Object Methods",
    slug: "object-methods",
    icon: "Settings",
    difficulty: "Intermediate",
    description:
      "Learn essential Object static methods — assign, freeze, seal, keys, entries — and how to define methods on objects.",
    concept: {
      explanation:
        "Object methods fall into two categories: instance methods (functions defined on your objects) and static methods on the Object constructor. Instance methods are defined as properties whose values are functions — with ES6 shorthand you can write greet() { } instead of greet: function() { }. Inside methods, 'this' refers to the object (with regular functions). Static methods include Object.assign() for merging, Object.freeze() for immutability, Object.seal() to prevent adding/removing properties, Object.keys()/values()/entries() for iteration, and Object.fromEntries() to convert entries back to an object. These are critical for state management, configuration, and interview questions about immutability.",
      realLifeAnalogy:
        "Instance methods are like a TV remote's buttons — each button (method) does something specific to that TV (object). Static Object methods are like tools in a workshop — Object.freeze() is like encasing something in resin (can't change it), Object.assign() is like a copy machine that duplicates properties, and Object.keys() is like reading the labels on all the drawers.",
      keyPoints: [
        "Method shorthand: { greet() { } } instead of { greet: function() { } }",
        "'this' in methods refers to the object (regular functions only)",
        "Object.assign(target, ...sources): copies properties, mutates target",
        "Object.freeze(obj): no add, remove, or modify — shallow!",
        "Object.seal(obj): no add or remove, but CAN modify existing values",
        "Object.keys/values/entries: own enumerable properties only",
        "Object.fromEntries(): converts [key, value] pairs back to an object",
        "Object.getOwnPropertyNames(): includes non-enumerable properties",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Object Methods =====

// ── Defining methods ───────────────────────────
const calculator = {
  value: 0,
  add(n) { this.value += n; return this; },
  subtract(n) { this.value -= n; return this; },
  result() { return this.value; },
};

// Method chaining
const answer = calculator.add(10).add(5).subtract(3).result();
console.log("calculator:", answer);

// ── Object.assign: merge/copy ──────────────────
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const merged = Object.assign({}, target, source);
console.log("\\nassign:", merged);

// ── Object.freeze vs Object.seal ───────────────
const frozen = Object.freeze({ name: "Alice", age: 25 });
frozen.age = 30;        // silently fails
frozen.email = "a@b.c"; // silently fails
console.log("\\nfrozen:", frozen);
console.log("isFrozen:", Object.isFrozen(frozen));

const sealed = Object.seal({ name: "Bob", age: 30 });
sealed.age = 31;          // ✅ allowed
sealed.email = "b@c.d";   // silently fails
console.log("sealed:", sealed);
console.log("isSealed:", Object.isSealed(sealed));

// ── Object.fromEntries ─────────────────────────
const entries = [["name", "Charlie"], ["age", 35]];
const obj = Object.fromEntries(entries);
console.log("\\nfromEntries:", obj);

// ── Interview: invert an object ────────────────
function invertObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [v, k])
  );
}
console.log("\\ninverted:", invertObject({ a: 1, b: 2, c: 3 }));

// ── Interview: pick specific keys ──────────────
function pick(obj, keys) {
  return Object.fromEntries(
    keys.filter(k => k in obj).map(k => [k, obj[k]])
  );
}
const user = { name: "Alice", age: 28, role: "dev", email: "a@b.c" };
console.log("pick:", pick(user, ["name", "email"]));
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between Object.freeze() and Object.seal()?",
        difficulty: "Medium",
        hint: "freeze(): cannot add, remove, or modify properties — fully immutable (shallow). seal(): cannot add or remove properties, but CAN modify existing values. Both are shallow — nested objects are not affected. Use Object.freeze() for constants, Object.seal() when structure is fixed but values may change.",
      },
      {
        question: "How does 'this' work inside object methods?",
        difficulty: "Medium",
        hint: "In regular function methods, 'this' refers to the object that called the method. In arrow function methods, 'this' is inherited from the enclosing scope (usually not the object). This is why arrow functions should NOT be used as object methods. Method calls: obj.method() — 'this' is obj.",
      },
      {
        question: "How do you create an immutable object in JavaScript?",
        difficulty: "Hard",
        hint: "Object.freeze() for shallow immutability. For deep freeze, recursively freeze all nested objects. const only prevents reassignment, not mutation. Libraries like Immer provide efficient immutable updates. structuredClone + freeze for deep immutable copies.",
      },
    ],
  },
  {
    id: "object-destructuring",
    title: "Object Destructuring",
    slug: "object-destructuring",
    icon: "Minimize",
    difficulty: "Intermediate",
    description:
      "Learn destructuring — the elegant way to extract values from objects and arrays into distinct variables.",
    concept: {
      explanation:
        "Destructuring is a syntax that unpacks values from arrays or properties from objects into distinct variables. Object destructuring uses { } and matches property names. Array destructuring uses [ ] and matches position. You can set default values, rename variables (aliases), use rest patterns, and nest destructuring for deep objects. Destructuring is used everywhere in modern JavaScript — function parameters, import statements, React hooks (useState returns [value, setter]), API responses, and configuration objects. It is cleaner than accessing properties one by one and is a common interview topic.",
      realLifeAnalogy:
        "Destructuring is like unpacking a gift box. Instead of reaching into the box each time you need something, you take everything out at once and label each item. Object destructuring is like reading a packing list — you pick out items by name. Array destructuring is like unpacking items in order — first item, second item, etc.",
      keyPoints: [
        "Object: const { name, age } = person",
        "Rename: const { name: userName } = person",
        "Defaults: const { role = 'user' } = person",
        "Nested: const { address: { city } } = person",
        "Array: const [first, second] = arr",
        "Skip elements: const [, , third] = arr",
        "Rest: const { name, ...rest } = person",
        "In function params: function greet({ name, age }) { }",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Object Destructuring =====

// ── Basic destructuring ────────────────────────
const user = { name: "Alice", age: 28, role: "developer" };
const { name, age, role } = user;
console.log(name, age, role);

// ── Renaming (alias) ───────────────────────────
const { name: userName, role: userRole } = user;
console.log("\\nRenamed:", userName, userRole);

// ── Default values ─────────────────────────────
const { email = "not set", age: userAge = 0 } = user;
console.log("Default:", email, "Age:", userAge);

// ── Rest pattern ───────────────────────────────
const { name: n, ...rest } = user;
console.log("\\nRest:", rest);

// ── Nested destructuring ───────────────────────
const company = {
  name: "TechCorp",
  address: { city: "Seattle", state: "WA", zip: "98101" },
};
const { address: { city, state } } = company;
console.log("\\nNested:", city, state);

// ── Array destructuring ────────────────────────
const [first, second, ...remaining] = [10, 20, 30, 40, 50];
console.log("\\nArray:", first, second, remaining);

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log("Swapped:", a, b);

// ── Function parameter destructuring ───────────
function createUser({ name, age, role = "user" }) {
  return \`\${name} (\${age}) - \${role}\`;
}
console.log("\\n" + createUser({ name: "Bob", age: 30 }));

// ── Interview: extract nested API response ─────
const response = {
  data: {
    users: [
      { id: 1, profile: { displayName: "Alice" } },
      { id: 2, profile: { displayName: "Bob" } },
    ],
  },
  status: 200,
};

const { data: { users } } = response;
const names2 = users.map(({ profile: { displayName } }) => displayName);
console.log("\\nExtracted names:", names2);
`,
    },
    interviewQuestions: [
      {
        question: "What happens if you destructure a property that doesn't exist?",
        difficulty: "Easy",
        hint: "The variable gets undefined. Use default values to handle this: const { missing = 'default' } = obj. For nested destructuring, if the parent is undefined it throws TypeError — guard with defaults: const { address: { city } = {} } = obj.",
      },
      {
        question: "How do you swap two variables without a temp variable?",
        difficulty: "Easy",
        hint: "[a, b] = [b, a]. Array destructuring swaps in one line. This works because the right side creates a new array [b, a] before destructuring assigns back to a and b. Clean, readable, and commonly asked.",
      },
      {
        question: "Explain the difference between rest in destructuring vs spread.",
        difficulty: "Medium",
        hint: "Rest (...rest) in destructuring COLLECTS remaining properties/elements into a new object/array. Spread (...obj) EXPANDS an object/array into individual elements. Rest: const {a, ...rest} = obj (rest gets everything except a). Spread: const copy = {...obj} (expands obj into new object).",
      },
    ],
  },
  {
    id: "json-basics",
    title: "JSON Basics",
    slug: "json-basics",
    icon: "FileCode",
    difficulty: "Beginner",
    description:
      "Understand JSON — the universal data format for APIs, configuration files, and data exchange in web applications.",
    concept: {
      explanation:
        "JSON (JavaScript Object Notation) is a lightweight text-based data format used for transmitting data between a server and client. Despite its name, JSON is language-independent and used by virtually every programming language. JSON.stringify() converts a JavaScript value to a JSON string. JSON.parse() converts a JSON string back to a JavaScript value. JSON supports strings, numbers, booleans, null, arrays, and objects — but NOT undefined, functions, Symbol, Infinity, NaN, or Date objects (dates become strings). JSON keys MUST be double-quoted strings. Understanding JSON is essential because every API you interact with uses it.",
      realLifeAnalogy:
        "JSON is like a standardized shipping label format. When you send a package (data) between countries (systems), everyone agrees on how the label should look. JSON.stringify() is like writing the label in the standard format before shipping. JSON.parse() is like reading the label when the package arrives. Some things can't go on the label (like functions) — only simple data.",
      keyPoints: [
        "JSON.stringify(value): JS value → JSON string",
        "JSON.parse(string): JSON string → JS value",
        "JSON keys must be double-quoted strings",
        "Supports: string, number, boolean, null, object, array",
        "Does NOT support: undefined, function, Symbol, NaN, Infinity",
        "Date objects become strings when stringified",
        "JSON.stringify(val, null, 2) for pretty printing",
        "JSON.stringify(val, replacer) for custom serialization",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== JSON Basics =====

// ── JSON.stringify ─────────────────────────────
const user = { name: "Alice", age: 28, active: true };
const json = JSON.stringify(user);
console.log("Stringified:", json);
console.log("Type:", typeof json);

// Pretty print with indentation
console.log("\\nPretty:");
console.log(JSON.stringify(user, null, 2));

// ── JSON.parse ─────────────────────────────────
const parsed = JSON.parse(json);
console.log("\\nParsed:", parsed);
console.log("Type:", typeof parsed);
console.log("Name:", parsed.name);

// ── What JSON ignores ──────────────────────────
const tricky = {
  name: "test",
  fn: function() {},     // ignored
  undef: undefined,      // ignored
  sym: Symbol("s"),      // ignored
  valid: "kept",
};
console.log("\\nIgnored:", JSON.stringify(tricky));

// ── Replacer function ──────────────────────────
const data = { name: "Alice", password: "secret123", email: "a@b.c" };
const safe = JSON.stringify(data, (key, val) => {
  if (key === "password") return undefined;  // exclude
  return val;
});
console.log("\\nFiltered:", safe);

// ── Reviver function ───────────────────────────
const withDate = '{"name":"Event","date":"2024-01-15T10:00:00.000Z"}';
const event = JSON.parse(withDate, (key, val) => {
  if (key === "date") return new Date(val);
  return val;
});
console.log("\\nRevived date:", event.date instanceof Date);
console.log("Date:", event.date.toLocaleDateString());

// ── Deep clone trick ───────────────────────────
const original = { a: 1, b: { c: 2, d: [3, 4] } };
const clone = JSON.parse(JSON.stringify(original));
clone.b.c = 99;
console.log("\\nOriginal:", original.b.c);
console.log("Clone:", clone.b.c);
console.log("Independent copies!");
`,
    },
    interviewQuestions: [
      {
        question: "What are the limitations of JSON.parse(JSON.stringify()) for deep cloning?",
        difficulty: "Medium",
        hint: "Loses: undefined, functions, Symbol, Date (becomes string), RegExp (becomes {}), Map/Set (becomes {}), circular references (throws). Better alternative: structuredClone() which handles Dates, RegExp, Map, Set, ArrayBuffer, and even circular references.",
      },
      {
        question: "How do you handle dates in JSON?",
        difficulty: "Medium",
        hint: "Dates become ISO strings when stringified. To restore them, use a reviver: JSON.parse(json, (key, val) => { if (isDateKey(key)) return new Date(val); return val; }). Common convention: use ISO 8601 format (toISOString()).",
      },
      {
        question: "What is the difference between a JavaScript object and JSON?",
        difficulty: "Easy",
        hint: "JSON is a TEXT FORMAT (string). JS object is an in-memory data structure. JSON keys must be double-quoted. JSON cannot contain functions, undefined, comments, or trailing commas. JSON is a subset of JavaScript object literal syntax.",
      },
    ],
  },
  {
    id: "shallow-vs-deep-copy",
    title: "Shallow vs Deep Copy",
    slug: "shallow-vs-deep-copy",
    icon: "GitFork",
    difficulty: "Intermediate",
    description:
      "Understand the critical difference between shallow and deep copies — one of the most common sources of bugs in JavaScript.",
    concept: {
      explanation:
        "In JavaScript, objects and arrays are reference types — assigning them to a new variable copies the reference, not the data. A shallow copy creates a new top-level object but nested objects still share references with the original. A deep copy recursively copies everything, creating completely independent objects at every level. Methods for shallow copy: spread operator, Object.assign(), Array.from(), slice(). Methods for deep copy: structuredClone() (modern), JSON.parse(JSON.stringify()) (with limitations), or libraries like lodash.cloneDeep(). This distinction is critical for avoiding bugs where modifying a 'copy' accidentally changes the original — especially in state management (React, Redux).",
      realLifeAnalogy:
        "Shallow copy is like photocopying a document that references other documents. The photocopy has its own text, but the references still point to the same original documents. If someone edits a referenced document, both copies see the change. Deep copy is like photocopying every referenced document too — you get a completely independent set of papers.",
      keyPoints: [
        "Assignment (=) copies the REFERENCE, not the data",
        "Shallow copy: new top-level object, shared nested references",
        "Shallow methods: {...obj}, Object.assign(), [...arr], arr.slice()",
        "Deep copy: completely independent at every nesting level",
        "structuredClone(obj): modern deep copy (handles most types)",
        "JSON parse/stringify: deep copy but loses functions, dates, undefined",
        "Primitives (string, number, boolean) are always copied by value",
        "This is the #1 source of mutation bugs in React/Redux state",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Shallow vs Deep Copy =====

// ── Reference copy (no copy at all) ────────────
const original = { name: "Alice", scores: [90, 85, 92] };
const ref = original;
ref.name = "Bob";
console.log("Reference copy:");
console.log("original.name:", original.name); // "Bob" — same object!

// ── Shallow copy ───────────────────────────────
const user = { name: "Alice", address: { city: "Seattle" } };
const shallow = { ...user };

shallow.name = "Bob";           // independent
shallow.address.city = "NYC";   // shared reference!

console.log("\\nShallow copy:");
console.log("user.name:", user.name);             // "Alice" ✅
console.log("user.address.city:", user.address.city); // "NYC" ❌ mutated!

// ── Deep copy with structuredClone ─────────────
const data = {
  name: "Alice",
  scores: [90, 85],
  address: { city: "Seattle", zip: "98101" },
};

const deep = structuredClone(data);
deep.scores.push(100);
deep.address.city = "Portland";

console.log("\\nDeep copy (structuredClone):");
console.log("original scores:", data.scores);
console.log("deep scores:", deep.scores);
console.log("original city:", data.address.city);
console.log("deep city:", deep.address.city);

// ── JSON trick (limited deep copy) ─────────────
const obj = { a: 1, b: { c: 2 } };
const jsonClone = JSON.parse(JSON.stringify(obj));
jsonClone.b.c = 99;
console.log("\\nJSON clone:");
console.log("original.b.c:", obj.b.c);
console.log("clone.b.c:", jsonClone.b.c);

// ── Comparison table ───────────────────────────
console.log("\\n=== Method Comparison ===");
console.log("= (assign):      reference only");
console.log("{...obj}:         shallow copy");
console.log("Object.assign():  shallow copy");
console.log("JSON trick:       deep but lossy");
console.log("structuredClone:  deep & reliable");

// ── Interview: check if two objects are equal ──
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object") return false;
  if (a === null || b === null) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(key => deepEqual(a[key], b[key]));
}

console.log("\\ndeepEqual({a:1},{a:1}):", deepEqual({a:1},{a:1}));
console.log("deepEqual({a:1},{a:2}):", deepEqual({a:1},{a:2}));
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between shallow copy and deep copy?",
        difficulty: "Easy",
        hint: "Shallow copy: new object at top level, but nested objects share references. Changing nested data in the copy affects the original. Deep copy: completely independent clone at every level. Spread/Object.assign = shallow. structuredClone = deep.",
      },
      {
        question: "What are the different ways to deep copy an object?",
        difficulty: "Medium",
        hint: "1) structuredClone(obj) — best modern option, handles circular refs, Date, Map, Set. 2) JSON.parse(JSON.stringify(obj)) — loses undefined, functions, Date, RegExp. 3) Manual recursive clone. 4) Libraries: lodash.cloneDeep(). Avoid JSON trick for objects with special types.",
      },
      {
        question: "Why is understanding copy types important in React?",
        difficulty: "Hard",
        hint: "React uses reference equality (===) to detect state changes. If you mutate an existing object, React won't re-render because the reference hasn't changed. You must create NEW objects/arrays for state updates: setState({...state, key: newValue}). Spread creates shallow copies — for nested state, you need nested spreads or structuredClone.",
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  // Level 5 — DOM Manipulation
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: "what-is-dom",
    title: "What is the DOM",
    slug: "what-is-dom",
    icon: "Network",
    difficulty: "Beginner",
    description:
      "Understand the Document Object Model — the tree-like interface that lets JavaScript interact with HTML pages.",
    concept: {
      explanation:
        "The DOM (Document Object Model) is a programming interface for HTML documents. When a browser loads a page, it parses the HTML and creates a tree of objects — the DOM tree. Every HTML element becomes a node in this tree. The document object is the entry point. Nodes have types: element nodes (tags), text nodes (text content), attribute nodes, and comment nodes. The DOM is NOT the HTML source — it is a live, in-memory representation that JavaScript can read and modify. When you change the DOM, the browser re-renders the page. Understanding the DOM is essential because all front-end frameworks (React, Vue, Angular) are abstractions over DOM manipulation. In interviews, you need to understand how the DOM works under the hood.",
      realLifeAnalogy:
        "The DOM is like a family tree. The <html> element is the ancestor at the top. It has children (<head> and <body>), who have their own children (paragraphs, divs, etc.). Each family member (node) knows their parent, siblings, and children. When you want to make a change — like changing someone's name tag — you navigate the tree to find them, then modify their properties. The browser's job is to keep the visual display in sync with this family tree.",
      keyPoints: [
        "DOM = Document Object Model — a tree of JavaScript objects representing the page",
        "The browser creates the DOM by parsing the HTML source",
        "document is the root entry point for DOM access",
        "Node types: Element (1), Text (3), Comment (8), Document (9)",
        "The DOM is LIVE — changes update the rendered page immediately",
        "DOM !== HTML source — the DOM reflects the current state",
        "window.document gives you access to the entire DOM tree",
        "The DOM API is standardized by the W3C and WHATWG",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== What is the DOM =====
// Note: These examples show browser DOM APIs.
// In a real browser, you'd see live results.

// ── The document object ────────────────────────
console.log("document.title:", document.title);
console.log("document.URL:", document.URL);
console.log("document.doctype:", document.doctype?.name);

// ── DOM tree structure ─────────────────────────
console.log("\\n--- DOM Tree ---");
console.log("document.documentElement:", document.documentElement.tagName);
console.log("document.head:", document.head.tagName);
console.log("document.body:", document.body.tagName);

// ── Node types ─────────────────────────────────
console.log("\\n--- Node Types ---");
const div = document.createElement("div");
div.textContent = "Hello";
console.log("Element nodeType:", div.nodeType);           // 1
console.log("Text nodeType:", div.firstChild.nodeType);   // 3
console.log("Element nodeName:", div.nodeName);           // DIV

// ── Children count ─────────────────────────────
console.log("\\n--- Body Children ---");
console.log("body.children.length:", document.body.children.length);
console.log("body.childNodes.length:", document.body.childNodes.length);

// ── Live nature of DOM ─────────────────────────
console.log("\\n--- DOM is Live ---");
const p = document.createElement("p");
p.textContent = "I was added by JavaScript!";
document.body.appendChild(p);
console.log("Added <p> to body");
console.log("New children count:", document.body.children.length);

// ── Interview: difference between DOM and HTML ─
console.log("\\n--- Key Insight ---");
console.log("HTML is the source text you write");
console.log("DOM is the live object tree the browser builds");
console.log("JS can modify the DOM without changing the HTML file");
`,
    },
    interviewQuestions: [
      {
        question: "What is the DOM and how does it relate to HTML?",
        difficulty: "Easy",
        hint: "The DOM is a tree-shaped programming interface built by the browser from HTML source. HTML is static text. The DOM is a live, in-memory object model that JS can read/modify. Changes to the DOM update the page but don't change the .html file. The DOM may differ from HTML (e.g., JS-added elements, browser corrections).",
      },
      {
        question: "What is the difference between children and childNodes?",
        difficulty: "Medium",
        hint: "children returns only Element nodes (HTMLCollection). childNodes returns ALL nodes including text and comment nodes (NodeList). Example: <div> text <span>hi</span> </div> — children has 1 (span), childNodes has 3 (text, span, text).",
      },
      {
        question: "What is the difference between the DOM and the Virtual DOM?",
        difficulty: "Hard",
        hint: "The real DOM is the browser's live tree — manipulating it triggers reflows/repaints (expensive). The Virtual DOM (React) is a lightweight JS copy. React diffs the old and new virtual DOM, then batch-updates only the changed parts of the real DOM. This minimizes expensive DOM operations.",
      },
    ],
  },
  {
    id: "selecting-elements",
    title: "Selecting Elements",
    slug: "selecting-elements",
    icon: "MousePointerClick",
    difficulty: "Beginner",
    description:
      "Learn all the ways to find and select HTML elements in the DOM — from getElementById to querySelectorAll.",
    concept: {
      explanation:
        "Before you can modify an element, you need to select it. JavaScript provides several methods: getElementById() is the fastest — returns a single element by its id attribute. getElementsByClassName() and getElementsByTagName() return live HTMLCollections. querySelector() uses CSS selectors and returns the first match. querySelectorAll() returns all matches as a static NodeList. The key distinction is live vs static collections: live collections (getElementsBy*) automatically update when the DOM changes, while static ones (querySelectorAll) are snapshots. In modern code, querySelector/querySelectorAll are preferred because they accept any CSS selector, making them the most flexible.",
      realLifeAnalogy:
        "Selecting elements is like finding people in a building. getElementById is like calling someone by their unique badge number — instant and exact. getElementsByClassName is like asking 'everyone wearing blue shirts, raise your hand' — you get a live group that changes as people enter/leave. querySelector is like using a detailed description: 'the first person in room 3 wearing a red hat' — very flexible. querySelectorAll gets everyone matching that description.",
      keyPoints: [
        "getElementById('id'): returns single element or null — fastest",
        "getElementsByClassName('class'): returns live HTMLCollection",
        "getElementsByTagName('tag'): returns live HTMLCollection",
        "querySelector('css'): returns first match or null",
        "querySelectorAll('css'): returns static NodeList of all matches",
        "Live collections auto-update; static NodeLists are snapshots",
        "querySelectorAll returns NodeList — use forEach or spread to iterate",
        "querySelector accepts any valid CSS selector: #id, .class, div > p, [data-x]",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Selecting Elements =====
// Browser DOM API examples

// ── getElementById ─────────────────────────────
const header = document.getElementById("main-header");
console.log("getElementById:", header);

// ── getElementsByClassName (live collection) ───
const items = document.getElementsByClassName("item");
console.log("getElementsByClassName:", items.length, "items");

// ── getElementsByTagName ───────────────────────
const paragraphs = document.getElementsByTagName("p");
console.log("getElementsByTagName:", paragraphs.length, "paragraphs");

// ── querySelector (first match) ────────────────
const firstBtn = document.querySelector(".btn.primary");
console.log("\\nquerySelector:", firstBtn);

// Complex CSS selectors
const navLink = document.querySelector("nav > ul > li:first-child a");
console.log("Complex selector:", navLink);

// ── querySelectorAll (all matches) ─────────────
const allBtns = document.querySelectorAll("button");
console.log("\\nquerySelectorAll:", allBtns.length, "buttons");

// Iterate NodeList
allBtns.forEach((btn, i) => {
  console.log(\`  Button \${i}: \${btn.textContent}\`);
});

// ── Attribute selectors ────────────────────────
const dataItems = document.querySelectorAll("[data-active='true']");
console.log("\\nData attribute:", dataItems.length, "active items");

// ── Live vs Static ─────────────────────────────
console.log("\\n--- Live vs Static ---");
const liveList = document.getElementsByClassName("item");
const staticList = document.querySelectorAll(".item");
console.log("Before add — live:", liveList.length, "static:", staticList.length);

const newItem = document.createElement("div");
newItem.className = "item";
document.body.appendChild(newItem);

console.log("After add — live:", liveList.length, "static:", staticList.length);
// live count increases, static stays the same!

// ── Interview: select and count ────────────────
console.log("\\n--- Cheat Sheet ---");
console.log("By ID:    document.getElementById('x')");
console.log("By CSS:   document.querySelector('.x')");
console.log("All CSS:  document.querySelectorAll('.x')");
console.log("By class: document.getElementsByClassName('x')");
console.log("By tag:   document.getElementsByTagName('x')");
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between querySelector and getElementById?",
        difficulty: "Easy",
        hint: "getElementById only selects by id, returns one element, and is slightly faster. querySelector accepts any CSS selector (#id, .class, div > p, [attr]), returns first match. querySelector is more flexible; getElementById is more performant for id lookups.",
      },
      {
        question: "What is the difference between HTMLCollection and NodeList?",
        difficulty: "Medium",
        hint: "HTMLCollection (getElementsBy*) is LIVE and auto-updates. NodeList (querySelectorAll) is STATIC — a snapshot. HTMLCollection only contains elements. NodeList can contain any node type. NodeList supports forEach(); HTMLCollection needs Array.from() to iterate with array methods.",
      },
      {
        question: "How would you select all checked checkboxes on a page?",
        difficulty: "Medium",
        hint: "document.querySelectorAll('input[type=\"checkbox\"]:checked'). This uses the CSS :checked pseudo-class. Returns a static NodeList. You can convert to array with [...nodeList] or Array.from(nodeList) for map/filter.",
      },
    ],
  },
  {
    id: "modifying-html-content",
    title: "Modifying HTML Content",
    slug: "modifying-html-content",
    icon: "FileText",
    difficulty: "Beginner",
    description:
      "Learn how to read and change the text and HTML content of elements using innerHTML, textContent, and more.",
    concept: {
      explanation:
        "Once you select an element, you can modify its content. textContent gets/sets the raw text of an element and all its descendants — it ignores HTML tags. innerHTML gets/sets the HTML markup inside an element — it parses HTML strings. innerText is similar to textContent but respects CSS visibility (hidden elements are excluded) and triggers a reflow. outerHTML includes the element itself. For attributes, use getAttribute/setAttribute, or direct property access (element.id, element.className, element.src). classList provides add/remove/toggle/contains for CSS classes. dataset gives access to data-* attributes. Security warning: never use innerHTML with user input — it creates XSS vulnerabilities. Use textContent for user-provided text.",
      realLifeAnalogy:
        "Think of an element as a picture frame on a wall. textContent is like reading/changing the text on a sign inside the frame. innerHTML is like replacing the entire artwork inside the frame — you can put in a complex collage (HTML) or a simple text card. outerHTML is like replacing the frame AND the artwork. Attributes are like labels on the frame — you can read them, change them, or add new ones.",
      keyPoints: [
        "textContent: gets/sets raw text — safe, no HTML parsing",
        "innerHTML: gets/sets HTML markup — parses HTML tags",
        "innerText: like textContent but respects CSS visibility",
        "outerHTML: includes the element's own tag in the markup",
        "getAttribute/setAttribute: read/write any HTML attribute",
        "classList.add/remove/toggle/contains: manage CSS classes",
        "dataset: access data-* attributes as camelCase properties",
        "NEVER use innerHTML with user input — XSS vulnerability!",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Modifying HTML Content =====

// ── textContent vs innerHTML ───────────────────
const div = document.createElement("div");
div.innerHTML = "<strong>Hello</strong> <em>World</em>";

console.log("innerHTML:", div.innerHTML);
console.log("textContent:", div.textContent);
console.log("innerText:", div.innerText);

// Setting content
div.textContent = "Safe plain text <b>not bold</b>";
console.log("\\nAfter textContent set:", div.innerHTML);
// The <b> tag is escaped, not parsed!

div.innerHTML = "<b>Bold</b> and <i>italic</i>";
console.log("After innerHTML set:", div.innerHTML);

// ── Attributes ─────────────────────────────────
const img = document.createElement("img");
img.setAttribute("src", "photo.jpg");
img.setAttribute("alt", "A photo");
img.id = "hero-image";

console.log("\\nsrc:", img.getAttribute("src"));
console.log("alt:", img.alt);
console.log("id:", img.id);
console.log("has src?", img.hasAttribute("src"));

// ── classList ──────────────────────────────────
const btn = document.createElement("button");
btn.classList.add("btn", "primary");
console.log("\\nclasses:", btn.className);

btn.classList.toggle("active");
console.log("after toggle:", btn.className);

btn.classList.remove("primary");
console.log("after remove:", btn.className);
console.log("has 'btn'?", btn.classList.contains("btn"));

// ── dataset (data-* attributes) ────────────────
const card = document.createElement("div");
card.dataset.userId = "42";
card.dataset.role = "admin";
console.log("\\ndataset.userId:", card.dataset.userId);
console.log("HTML:", card.outerHTML);

// ── Interview: sanitize user input ─────────────
function safeInsert(element, userText) {
  // NEVER: element.innerHTML = userText  (XSS!)
  element.textContent = userText;  // Safe!
}

const output = document.createElement("div");
safeInsert(output, '<script>alert("hacked")</script>');
console.log("\\nSafe output:", output.innerHTML);
// Script tag is escaped, not executed
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between textContent and innerHTML?",
        difficulty: "Easy",
        hint: "textContent: gets/sets raw text, ignores HTML, is safe from XSS. innerHTML: gets/sets HTML markup, parses tags, can create XSS if used with user input. textContent is faster (no HTML parsing). Use textContent for user data, innerHTML only for trusted HTML.",
      },
      {
        question: "What is an XSS attack and how do you prevent it?",
        difficulty: "Hard",
        hint: "XSS (Cross-Site Scripting): attacker injects malicious scripts via user input. If you use innerHTML with unsanitized input, scripts execute. Prevention: use textContent instead of innerHTML, sanitize input, use Content Security Policy headers, encode HTML entities. React auto-escapes by default.",
      },
      {
        question: "What is the difference between className and classList?",
        difficulty: "Easy",
        hint: "className is a string of all classes ('btn primary active'). classList is a DOMTokenList with methods: add(), remove(), toggle(), contains(), replace(). classList is preferred — it lets you manage individual classes without string manipulation.",
      },
    ],
  },
  {
    id: "modifying-css-styles",
    title: "Modifying CSS Styles",
    slug: "modifying-css-styles",
    icon: "Paintbrush",
    difficulty: "Beginner",
    description:
      "Learn how to dynamically change element styles using JavaScript — from inline styles to CSS custom properties.",
    concept: {
      explanation:
        "JavaScript can modify CSS styles in several ways. The style property sets inline styles directly: element.style.color = 'red'. Property names use camelCase (backgroundColor, not background-color). getComputedStyle() returns the actual computed styles after all CSS rules are applied — it is read-only. For toggling visual states, classList.toggle() with predefined CSS classes is cleaner than inline styles. CSS custom properties (variables) can be set/read via setProperty/getPropertyValue. The style property only reads inline styles, not stylesheet rules — use getComputedStyle for the final computed value. Best practice: prefer toggling classes over setting inline styles, as it keeps style logic in CSS where it belongs.",
      realLifeAnalogy:
        "Modifying styles is like dressing a mannequin in a store window. element.style is like pinning a note directly to the mannequin saying 'wear red' (inline styles — highest priority). classList.toggle is like swapping the entire outfit to a pre-designed set (CSS class). getComputedStyle is like asking 'what is the mannequin actually wearing right now?' after all outfit rules have been resolved.",
      keyPoints: [
        "element.style.property = value: sets inline styles",
        "Use camelCase: backgroundColor, not background-color",
        "element.style only reads INLINE styles, not computed styles",
        "getComputedStyle(element): returns all computed styles (read-only)",
        "classList.toggle('class'): preferred for toggling visual states",
        "style.cssText: set multiple styles at once as a string",
        "CSS variables: element.style.setProperty('--color', 'red')",
        "Prefer class toggling over inline styles for maintainability",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Modifying CSS Styles =====

// ── Inline styles via .style ───────────────────
const box = document.createElement("div");
box.style.width = "200px";
box.style.height = "100px";
box.style.backgroundColor = "#3b82f6";
box.style.borderRadius = "8px";
box.style.padding = "16px";
box.style.color = "white";

console.log("width:", box.style.width);
console.log("bg:", box.style.backgroundColor);

// ── Multiple styles with cssText ───────────────
const card = document.createElement("div");
card.style.cssText = \`
  padding: 20px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 12px;
\`;
console.log("\\ncssText:", card.style.cssText);

// ── getComputedStyle ───────────────────────────
document.body.appendChild(box);
const computed = getComputedStyle(box);
console.log("\\nComputed width:", computed.width);
console.log("Computed display:", computed.display);
console.log("Computed padding:", computed.padding);

// ── Class toggling (preferred approach) ────────
const btn = document.createElement("button");
btn.textContent = "Toggle Me";
btn.className = "btn";

// Simulating toggle
btn.classList.add("active");
console.log("\\nAfter add 'active':", btn.className);
btn.classList.toggle("active");
console.log("After toggle:", btn.className);
btn.classList.toggle("active");
console.log("After toggle again:", btn.className);

// ── CSS Custom Properties ──────────────────────
const root = document.documentElement;
root.style.setProperty("--primary-color", "#3b82f6");
root.style.setProperty("--spacing", "16px");

const primary = getComputedStyle(root).getPropertyValue("--primary-color");
console.log("\\nCSS var --primary-color:", primary.trim());

// ── Interview: theme switcher pattern ──────────
function setTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.style.setProperty("--bg", "#1a1a2e");
    root.style.setProperty("--text", "#eee");
  } else {
    root.style.setProperty("--bg", "#ffffff");
    root.style.setProperty("--text", "#333");
  }
  console.log("Theme set to:", theme);
}

setTheme("dark");
setTheme("light");
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between element.style and getComputedStyle?",
        difficulty: "Easy",
        hint: "element.style reads/writes INLINE styles only (what's in the style attribute). getComputedStyle(el) returns the FINAL computed value after all CSS rules cascade — it's read-only. element.style.color may be '' even if the element is red from a stylesheet.",
      },
      {
        question: "Why should you prefer classList over inline styles?",
        difficulty: "Medium",
        hint: "Separation of concerns: styles stay in CSS, logic stays in JS. Class toggling is more performant (browser batches repaints). Inline styles have highest specificity (hard to override). Classes are reusable, testable, and can leverage CSS transitions/animations. Only use inline styles for truly dynamic values (e.g., calculated positions).",
      },
      {
        question: "How do you implement a dark mode toggle with JavaScript?",
        difficulty: "Medium",
        hint: "Best approach: toggle a class on <html> or <body> (document.documentElement.classList.toggle('dark')). Define styles with .dark .element selectors in CSS. Or use CSS custom properties: set variables on :root and override in .dark. Store preference in localStorage. Check prefers-color-scheme media query for system default.",
      },
    ],
  },
  {
    id: "creating-removing-elements",
    title: "Creating and Removing Elements",
    slug: "creating-removing-elements",
    icon: "ListPlus",
    difficulty: "Intermediate",
    description:
      "Learn to dynamically create, insert, clone, and remove DOM elements — the foundation of dynamic web applications.",
    concept: {
      explanation:
        "JavaScript can dynamically create and remove elements. createElement() creates a new element. After creating, you set its content/attributes, then insert it into the DOM with appendChild(), append(), prepend(), or insertBefore(). append() is newer and can insert multiple nodes and strings. before() and after() insert adjacent to an element. insertAdjacentHTML() parses HTML and inserts at specific positions. remove() removes an element. cloneNode(true) creates a deep copy. DocumentFragment lets you build a tree off-DOM and insert it all at once (better performance). For building lists or tables, always use fragments or build the tree before inserting — each DOM insertion triggers a reflow.",
      realLifeAnalogy:
        "Creating elements is like building with LEGO. createElement is getting a new brick from the box. Setting properties is painting/customizing it. appendChild is snapping it onto your structure. DocumentFragment is like building a mini-structure on your desk first, then placing the whole thing onto the main model at once — much faster than placing bricks one by one.",
      keyPoints: [
        "document.createElement('tag'): creates a new element",
        "parent.appendChild(child): adds to end of parent",
        "parent.append(child, 'text'): adds multiple nodes/strings",
        "parent.prepend(child): adds to beginning",
        "element.before(node) / element.after(node): insert adjacent",
        "element.remove(): removes from DOM",
        "element.cloneNode(true): deep clone with all children",
        "DocumentFragment: build off-DOM, insert once for performance",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Creating and Removing Elements =====

// ── Create and configure ───────────────────────
const card = document.createElement("div");
card.className = "card";
card.id = "user-card";

const title = document.createElement("h2");
title.textContent = "Alice Johnson";

const desc = document.createElement("p");
desc.textContent = "Frontend Developer";

// ── Append to build tree ───────────────────────
card.appendChild(title);
card.appendChild(desc);
document.body.appendChild(card);
console.log("Created card:", card.outerHTML);

// ── append vs appendChild ──────────────────────
const list = document.createElement("ul");
const li1 = document.createElement("li");
li1.textContent = "Item 1";
const li2 = document.createElement("li");
li2.textContent = "Item 2";

list.append(li1, li2, "text node too!");  // multiple args OK
console.log("\\nList:", list.innerHTML);

// ── prepend, before, after ─────────────────────
const li0 = document.createElement("li");
li0.textContent = "Item 0 (prepended)";
list.prepend(li0);
console.log("After prepend:", list.innerHTML);

// ── insertAdjacentHTML ─────────────────────────
card.insertAdjacentHTML("beforeend", '<span class="badge">Pro</span>');
console.log("\\nAfter insertAdjacent:", card.outerHTML);

// ── cloneNode ──────────────────────────────────
const clone = card.cloneNode(true);
clone.id = "cloned-card";
console.log("\\nClone:", clone.outerHTML);

// ── remove ─────────────────────────────────────
desc.remove();
console.log("After remove:", card.outerHTML);

// ── DocumentFragment (performance) ─────────────
const fragment = document.createDocumentFragment();
for (let i = 0; i < 5; i++) {
  const li = document.createElement("li");
  li.textContent = \`Fragment item \${i}\`;
  fragment.appendChild(li);
}
list.appendChild(fragment);  // single DOM insertion
console.log("\\nWith fragment:", list.children.length, "items total");

// ── Interview: build a table from data ─────────
function buildTable(data) {
  const table = document.createElement("table");
  data.forEach(row => {
    const tr = document.createElement("tr");
    Object.values(row).forEach(val => {
      const td = document.createElement("td");
      td.textContent = val;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  return table;
}

const users = [
  { name: "Alice", role: "Dev" },
  { name: "Bob", role: "Designer" },
];
console.log("\\nTable:", buildTable(users).outerHTML);
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between append() and appendChild()?",
        difficulty: "Easy",
        hint: "appendChild: takes ONE Node, returns the node. append: takes multiple Nodes AND strings, returns undefined. append is newer (no IE support) and more flexible. Both add to the end. There's also prepend() for the beginning.",
      },
      {
        question: "What is a DocumentFragment and why use it?",
        difficulty: "Medium",
        hint: "A DocumentFragment is a lightweight container that exists in memory, not in the DOM. You can append many elements to it, then insert the fragment into the DOM in one operation. This triggers only ONE reflow instead of one per element. Essential for performance when adding many elements (lists, tables).",
      },
      {
        question: "How do you efficiently render a list of 10,000 items?",
        difficulty: "Hard",
        hint: "1) Use DocumentFragment to batch inserts. 2) Virtual scrolling: only render visible items (react-window, react-virtualized). 3) requestAnimationFrame chunking: add items in batches across frames. 4) Off-screen rendering: build in a detached element, then swap. Never append 10,000 elements one by one — each triggers a reflow.",
      },
    ],
  },
  {
    id: "dom-traversal",
    title: "DOM Traversal",
    slug: "dom-traversal",
    icon: "Route",
    difficulty: "Intermediate",
    description:
      "Navigate the DOM tree — move between parent, child, and sibling elements to find and manipulate related nodes.",
    concept: {
      explanation:
        "DOM traversal means navigating between nodes using their relationships. Every node knows its parent (parentNode/parentElement), children (childNodes/children, firstChild/firstElementChild, lastChild/lastElementChild), and siblings (nextSibling/nextElementSibling, previousSibling/previousElementSibling). The *Element* versions skip text/comment nodes and only return element nodes — usually what you want. closest() walks UP the tree to find the nearest ancestor matching a CSS selector — extremely useful for event delegation. contains() checks if a node is a descendant. Traversal is important for event delegation, finding related elements, and understanding how frameworks traverse the component tree.",
      realLifeAnalogy:
        "DOM traversal is like navigating a family tree. parentElement is asking 'who is my parent?' children is asking 'who are my kids?' nextElementSibling is 'who sits next to me?' closest('.grandparent') is walking up asking 'who is my nearest ancestor that is a grandparent?' You can navigate in any direction — up, down, or sideways.",
      keyPoints: [
        "parentNode / parentElement: go up one level",
        "children / childNodes: all direct children (elements vs all nodes)",
        "firstElementChild / lastElementChild: first/last element child",
        "nextElementSibling / previousElementSibling: adjacent elements",
        "closest('selector'): walks UP to find nearest matching ancestor",
        "contains(node): checks if node is a descendant",
        "Use *Element* versions to skip text/comment nodes",
        "closest() is essential for event delegation patterns",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== DOM Traversal =====

// Build a sample tree
const container = document.createElement("div");
container.id = "container";
container.innerHTML = \`
  <header class="header">
    <h1>Title</h1>
    <nav>
      <ul class="menu">
        <li class="item">Home</li>
        <li class="item active">About</li>
        <li class="item">Contact</li>
      </ul>
    </nav>
  </header>
  <main class="content">
    <p>Hello World</p>
  </main>
\`;
document.body.appendChild(container);

// ── Parent traversal ───────────────────────────
const activeItem = container.querySelector(".active");
console.log("Active:", activeItem.textContent);
console.log("Parent:", activeItem.parentElement.tagName);
console.log("Grandparent:", activeItem.parentElement.parentElement.tagName);

// ── closest: walk UP the tree ──────────────────
const nearestDiv = activeItem.closest("div");
console.log("\\nclosest div:", nearestDiv?.id);
const nearestHeader = activeItem.closest(".header");
console.log("closest .header:", nearestHeader?.tagName);

// ── Children ───────────────────────────────────
const menu = container.querySelector(".menu");
console.log("\\nchildren count:", menu.children.length);
console.log("first child:", menu.firstElementChild.textContent);
console.log("last child:", menu.lastElementChild.textContent);

// ── Sibling traversal ──────────────────────────
const aboutItem = menu.children[1];
console.log("\\ncurrent:", aboutItem.textContent);
console.log("prev sibling:", aboutItem.previousElementSibling.textContent);
console.log("next sibling:", aboutItem.nextElementSibling.textContent);

// ── contains ───────────────────────────────────
const header = container.querySelector(".header");
console.log("\\nheader contains menu?", header.contains(menu));
console.log("menu contains header?", menu.contains(header));

// ── Iterate all children ───────────────────────
console.log("\\n--- Menu items ---");
[...menu.children].forEach((child, i) => {
  console.log(\`  [\${i}] \${child.textContent} (class: \${child.className})\`);
});

// ── Interview: find all ancestors ──────────────
function getAncestors(element) {
  const ancestors = [];
  let current = element.parentElement;
  while (current) {
    ancestors.push(current.tagName.toLowerCase());
    current = current.parentElement;
  }
  return ancestors;
}
console.log("\\nAncestors of .active:", getAncestors(activeItem));
`,
    },
    interviewQuestions: [
      {
        question: "What does closest() do and when would you use it?",
        difficulty: "Medium",
        hint: "closest(selector) traverses UP from the element through its ancestors and returns the first one matching the CSS selector. Returns null if none found. Key use case: event delegation — e.target.closest('.card') finds the card a clicked button belongs to, even if the click was on a nested element.",
      },
      {
        question: "What is the difference between parentNode and parentElement?",
        difficulty: "Easy",
        hint: "Usually identical. The difference: document.documentElement.parentNode returns the document (node type 9). document.documentElement.parentElement returns null (because document is not an element). For most practical purposes they are interchangeable.",
      },
      {
        question: "How do you get all siblings of an element?",
        difficulty: "Medium",
        hint: "[...element.parentElement.children].filter(child => child !== element). This gets all children of the parent, then filters out the element itself. You can also loop with nextElementSibling/previousElementSibling, but the spread approach is cleaner.",
      },
    ],
  },
  {
    id: "event-listeners",
    title: "Event Listeners",
    slug: "event-listeners",
    icon: "Zap",
    difficulty: "Intermediate",
    description:
      "Master addEventListener — the gateway to making web pages interactive with clicks, inputs, and keyboard events.",
    concept: {
      explanation:
        "Events are signals that something happened — a click, keypress, form submit, page load, etc. addEventListener(type, handler, options) attaches a function to run when an event occurs. You can add multiple listeners for the same event. removeEventListener removes them (requires the same function reference). The event handler receives an Event object with properties: type, target (element that triggered), currentTarget (element with the listener), preventDefault() (stop default behavior), and stopPropagation() (stop bubbling). Common events: click, input, change, submit, keydown, keyup, focus, blur, mouseover, mouseout, load, DOMContentLoaded. Always use addEventListener over inline handlers (onclick) for separation of concerns.",
      realLifeAnalogy:
        "Event listeners are like a hotel's front desk. You leave instructions: 'When a guest named click arrives at room #button, call this function.' Multiple people can leave instructions for the same event. removeEventListener is like canceling the instruction. The Event object is like the guest's information card — it tells you who arrived (target), what type of guest (type), and you can stop them from going further (stopPropagation).",
      keyPoints: [
        "element.addEventListener('event', handler): attach a listener",
        "element.removeEventListener('event', handler): requires same function reference",
        "event.target: the element that triggered the event",
        "event.currentTarget: the element the listener is attached to",
        "event.preventDefault(): stop default behavior (form submit, link navigation)",
        "Common: click, input, change, submit, keydown, focus, blur",
        "{ once: true } option: listener fires only once then auto-removes",
        "Always prefer addEventListener over onclick attributes",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Event Listeners =====

// ── Basic click listener ───────────────────────
const btn = document.createElement("button");
btn.textContent = "Click me";
btn.id = "myBtn";

btn.addEventListener("click", function(event) {
  console.log("Clicked!", event.type);
  console.log("Target:", event.target.id);
});

// Simulate click
btn.click();

// ── Multiple listeners on same element ─────────
function logOne() { console.log("\\nListener 1 fired"); }
function logTwo() { console.log("Listener 2 fired"); }

btn.addEventListener("click", logOne);
btn.addEventListener("click", logTwo);
btn.click();  // both fire

// ── Remove listener ────────────────────────────
btn.removeEventListener("click", logOne);
btn.click();
console.log("(logOne removed, only logTwo fires)");

// ── Event object properties ────────────────────
const input = document.createElement("input");
input.type = "text";

input.addEventListener("input", function(e) {
  console.log("\\nInput value:", e.target.value);
  console.log("Event type:", e.type);
});

// Simulate typing
input.value = "Hello";
input.dispatchEvent(new Event("input"));

// ── preventDefault ─────────────────────────────
const form = document.createElement("form");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log("\\nForm submit prevented!");
});
form.dispatchEvent(new Event("submit"));

// ── { once: true } ────────────────────────────
const oneTimeBtn = document.createElement("button");
oneTimeBtn.addEventListener("click", () => {
  console.log("\\nThis fires only once!");
}, { once: true });

oneTimeBtn.click();  // fires
oneTimeBtn.click();  // does NOT fire

// ── Keyboard events ────────────────────────────
document.addEventListener("keydown", function(e) {
  console.log("\\nKey:", e.key, "Code:", e.code);
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    console.log("Ctrl+S intercepted!");
  }
});

// ── Interview: debounced input ─────────────────
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = document.createElement("input");
search.addEventListener("input", debounce(function(e) {
  console.log("\\nSearch:", e.target.value);
}, 300));
console.log("\\nDebounce: waits 300ms after last keystroke");
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between event.target and event.currentTarget?",
        difficulty: "Medium",
        hint: "event.target is the ACTUAL element that triggered the event (the deepest element clicked). event.currentTarget is the element the listener is ATTACHED to. They differ when events bubble — click a <span> inside a <button> with the listener: target=span, currentTarget=button.",
      },
      {
        question: "Why can't you remove an anonymous function listener?",
        difficulty: "Medium",
        hint: "removeEventListener requires the SAME function reference. Anonymous functions create new references each time: el.addEventListener('click', () => {}); el.removeEventListener('click', () => {}) — these are two different function objects. Solution: store the function in a variable first.",
      },
      {
        question: "What is debouncing and when would you use it?",
        difficulty: "Medium",
        hint: "Debouncing delays execution until a pause in events. If events keep firing, the timer resets. Use for: search-as-you-type (wait until user stops typing), window resize handlers, auto-save. Implementation: clearTimeout/setTimeout in a closure. Throttling is different — it fires at regular intervals.",
      },
    ],
  },
  {
    id: "event-propagation",
    title: "Event Propagation",
    slug: "event-propagation",
    icon: "GitMerge",
    difficulty: "Intermediate",
    description:
      "Understand how events travel through the DOM — capturing, target, and bubbling phases — and how to control them.",
    concept: {
      explanation:
        "When an event fires, it travels through the DOM in three phases: 1) Capturing phase — the event travels DOWN from the window to the target element. 2) Target phase — the event reaches the target element. 3) Bubbling phase — the event travels back UP from the target to the window. By default, listeners fire during the bubbling phase. To listen during capture, pass { capture: true } as the third argument. stopPropagation() stops the event from continuing to the next element. stopImmediatePropagation() also prevents other listeners on the same element. Most events bubble, but some don't (focus, blur, load, scroll). Understanding propagation is essential for event delegation and debugging unexpected handler behavior.",
      realLifeAnalogy:
        "Event propagation is like a message in a company hierarchy. Capturing phase: the CEO receives the message first, passes it down through VPs, managers, until it reaches the target employee. Target phase: the employee reads the message. Bubbling phase: the message report goes back up — employee to manager to VP to CEO. stopPropagation() is like the manager saying 'I'll handle this, no need to inform the CEO.'",
      keyPoints: [
        "Three phases: Capturing (down) → Target → Bubbling (up)",
        "Default listeners fire during BUBBLING phase",
        "{ capture: true }: listen during capturing phase instead",
        "event.stopPropagation(): stops the event from continuing",
        "event.stopImmediatePropagation(): also blocks same-element listeners",
        "event.eventPhase: 1=capturing, 2=target, 3=bubbling",
        "Some events don't bubble: focus, blur, load, scroll, mouseenter",
        "event.bubbles: check if an event type bubbles",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Event Propagation =====

// Build nested structure
const outer = document.createElement("div");
outer.id = "outer";
const middle = document.createElement("div");
middle.id = "middle";
const inner = document.createElement("div");
inner.id = "inner";
inner.textContent = "Click me";

outer.appendChild(middle);
middle.appendChild(inner);
document.body.appendChild(outer);

// ── Bubbling (default) ─────────────────────────
console.log("=== Bubbling Phase ===");
outer.addEventListener("click", () => console.log("outer (bubble)"));
middle.addEventListener("click", () => console.log("middle (bubble)"));
inner.addEventListener("click", () => console.log("inner (bubble)"));

inner.click();
// Output: inner → middle → outer (bottom up)

// ── Capturing ──────────────────────────────────
console.log("\\n=== Capturing Phase ===");
const outer2 = outer.cloneNode(true);
outer2.id = "outer2";
document.body.appendChild(outer2);

const mid2 = outer2.querySelector("#middle");
const inn2 = outer2.querySelector("#inner");

outer2.addEventListener("click", () => console.log("outer (capture)"), true);
mid2.addEventListener("click", () => console.log("middle (capture)"), true);
inn2.addEventListener("click", () => console.log("inner (target)"));

inn2.click();
// Output: outer → middle (top down) → inner (target)

// ── stopPropagation ────────────────────────────
console.log("\\n=== stopPropagation ===");
const a = document.createElement("div");
a.id = "A";
const b = document.createElement("div");
b.id = "B";
a.appendChild(b);
document.body.appendChild(a);

a.addEventListener("click", () => console.log("A heard click"));
b.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("B heard click (stopped propagation)");
});

b.click();
// Only B fires — A never hears it

// ── Event phases ───────────────────────────────
console.log("\\n=== Phase Numbers ===");
const phaseNames = { 1: "CAPTURING", 2: "TARGET", 3: "BUBBLING" };

const wrap = document.createElement("div");
const child = document.createElement("div");
wrap.appendChild(child);
document.body.appendChild(wrap);

function logPhase(e) {
  console.log(\`\${e.currentTarget.tagName || "DIV"} - Phase: \${phaseNames[e.eventPhase]}\`);
}

wrap.addEventListener("click", logPhase, true);   // capture
wrap.addEventListener("click", logPhase, false);  // bubble
child.addEventListener("click", logPhase);         // target

child.click();

// ── Interview insight ──────────────────────────
console.log("\\n--- Key Takeaway ---");
console.log("Events go: window → target (capture)");
console.log("Then:      target → window (bubble)");
console.log("Default listeners fire on BUBBLE phase");
`,
    },
    interviewQuestions: [
      {
        question: "What are the three phases of event propagation?",
        difficulty: "Easy",
        hint: "1) Capturing: event travels DOWN from window to target. 2) Target: event reaches the clicked element. 3) Bubbling: event travels back UP from target to window. Listeners fire on bubble by default. Use { capture: true } for capture phase.",
      },
      {
        question: "What is the difference between stopPropagation and preventDefault?",
        difficulty: "Medium",
        hint: "stopPropagation: stops the event from traveling to other elements (stops bubbling/capturing). preventDefault: stops the browser's default action (form submit, link navigation, checkbox toggle). They are independent — you can use either or both. stopPropagation doesn't prevent default, preventDefault doesn't stop propagation.",
      },
      {
        question: "Which events do NOT bubble?",
        difficulty: "Hard",
        hint: "focus, blur, mouseenter, mouseleave, load, unload, scroll, resize. These fire only on the target. Use focusin/focusout instead of focus/blur if you need bubbling. Check event.bubbles to verify. This matters for event delegation — you can't delegate non-bubbling events.",
      },
    ],
  },
  {
    id: "event-delegation",
    title: "Event Delegation",
    slug: "event-delegation",
    icon: "Share2",
    difficulty: "Intermediate",
    description:
      "Learn event delegation — a powerful pattern that uses bubbling to handle events efficiently on dynamic content.",
    concept: {
      explanation:
        "Event delegation is a pattern where you attach ONE event listener to a parent element instead of individual listeners on each child. When a child is clicked, the event bubbles up to the parent, where you check event.target to identify which child was clicked. This is powerful because: 1) It works with dynamically added elements (no need to attach new listeners). 2) It uses less memory (one listener vs hundreds). 3) It simplifies code. The pattern: parent.addEventListener('click', (e) => { if (e.target.matches('.child-class')) { handle(e.target); } }). Use closest() for complex nested children. Event delegation is used internally by React, jQuery, and every major framework.",
      realLifeAnalogy:
        "Event delegation is like a receptionist at a company. Instead of giving every employee their own phone line (individual listeners), you have one receptionist (parent listener) who answers all calls, asks 'who is this for?' (checks event.target), and routes accordingly. When new employees join, they automatically get coverage — no new phone lines needed.",
      keyPoints: [
        "Attach ONE listener to parent instead of many on children",
        "Use event.target to identify which child was clicked",
        "event.target.matches('selector'): check if target matches",
        "event.target.closest('selector'): find nearest matching ancestor",
        "Works with dynamically added elements automatically",
        "Uses less memory — one listener vs N listeners",
        "Pattern: parent.addEventListener → check target → handle",
        "Used internally by React, jQuery, and all major frameworks",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Event Delegation =====

// ── Problem: individual listeners ──────────────
// BAD: attaching listener to each item
const list = document.createElement("ul");
list.id = "todo-list";
["Buy groceries", "Walk the dog", "Write code"].forEach(text => {
  const li = document.createElement("li");
  li.textContent = text;
  li.className = "todo-item";
  list.appendChild(li);
});
document.body.appendChild(list);

// ── Solution: event delegation ─────────────────
list.addEventListener("click", function(e) {
  // Check if a todo-item was clicked
  const item = e.target.closest(".todo-item");
  if (!item) return;  // clicked on list itself, not an item

  item.classList.toggle("completed");
  console.log("Toggled:", item.textContent);
});

// Simulate clicks
list.children[0].click();
list.children[2].click();
console.log("Completed:", list.querySelectorAll(".completed").length);

// ── Dynamic elements work automatically ────────
const newItem = document.createElement("li");
newItem.textContent = "Read a book (added dynamically)";
newItem.className = "todo-item";
list.appendChild(newItem);

newItem.click();  // Works without adding new listener!
console.log("\\nDynamic item works!");

// ── Using matches() for filtering ──────────────
const toolbar = document.createElement("div");
toolbar.className = "toolbar";
toolbar.innerHTML = \`
  <button class="btn save">Save</button>
  <button class="btn delete">Delete</button>
  <button class="btn edit">Edit</button>
  <span class="label">Status: ready</span>
\`;
document.body.appendChild(toolbar);

toolbar.addEventListener("click", function(e) {
  if (e.target.matches(".btn.save")) {
    console.log("\\nSave clicked");
  } else if (e.target.matches(".btn.delete")) {
    console.log("Delete clicked");
  } else if (e.target.matches(".btn.edit")) {
    console.log("Edit clicked");
  }
  // Clicks on .label or toolbar itself are ignored
});

toolbar.querySelector(".save").click();
toolbar.querySelector(".delete").click();

// ── Performance comparison ─────────────────────
console.log("\\n--- Performance ---");
console.log("Without delegation: 100 items = 100 listeners");
console.log("With delegation:    100 items = 1 listener");
console.log("Adding new items:   0 new listeners needed");

// ── Interview: delegated form validation ───────
function delegatedValidation(form) {
  form.addEventListener("input", function(e) {
    const field = e.target;
    if (field.matches("[required]") && !field.value.trim()) {
      field.style.borderColor = "red";
      console.log(\`\\n\${field.name} is required!\`);
    } else {
      field.style.borderColor = "green";
      console.log(\`\\n\${field.name} is valid\`);
    }
  });
}

const myForm = document.createElement("form");
const nameInput = document.createElement("input");
nameInput.name = "username";
nameInput.required = true;
myForm.appendChild(nameInput);
delegatedValidation(myForm);

nameInput.value = "";
nameInput.dispatchEvent(new Event("input", { bubbles: true }));
nameInput.value = "Alice";
nameInput.dispatchEvent(new Event("input", { bubbles: true }));
`,
    },
    interviewQuestions: [
      {
        question: "What is event delegation and why is it useful?",
        difficulty: "Easy",
        hint: "Attach one listener to a parent instead of many on children. Uses event bubbling — check event.target to identify which child was clicked. Benefits: works with dynamic elements, uses less memory, simpler code. Pattern: parent.addEventListener('click', e => { if (e.target.matches('.x')) handle(e.target); });",
      },
      {
        question: "How does React use event delegation internally?",
        difficulty: "Hard",
        hint: "React attaches event listeners to the root container, not individual DOM elements. When you write onClick on a component, React delegates it. Events bubble up to root where React's synthetic event system dispatches to the correct handler. This is why event.nativeEvent is the real DOM event and React events are synthetic wrappers.",
      },
      {
        question: "How do you handle event delegation with nested elements?",
        difficulty: "Medium",
        hint: "Use closest() instead of checking target directly. If a button contains a <span> icon and user clicks the icon, target is the span, not the button. e.target.closest('.btn') walks up and finds the button. Always use closest() for reliable delegation with nested markup.",
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // Level 6 — Asynchronous JavaScript
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "sync-vs-async",
    title: "Synchronous vs Asynchronous",
    slug: "sync-vs-async",
    icon: "ArrowLeftRight",
    difficulty: "Beginner",
    description:
      "Understand the fundamental difference between synchronous (blocking) and asynchronous (non-blocking) code execution in JavaScript.",
    concept: {
      explanation:
        "JavaScript is single-threaded — it has ONE call stack and executes ONE thing at a time. Synchronous code runs line by line, each line waiting for the previous one to finish (blocking). Asynchronous code lets you START a task and CONTINUE running other code while that task completes in the background. When the async task finishes, a callback is placed in the task queue and executed when the call stack is empty. This is managed by the EVENT LOOP. Real-world examples: fetching data from an API (async), reading files (async), setTimeout (async), while a for-loop or Math.sqrt() are synchronous. Understanding sync vs async is fundamental to writing performant JavaScript that doesn't freeze the UI.",
      realLifeAnalogy:
        "Synchronous is like standing in a single checkout line at a store — you wait for each person ahead to finish before you move. Asynchronous is like ordering at a restaurant — you place your order (start async task), sit down and chat (continue running code), and the waiter brings your food when it's ready (callback). You don't stand in the kitchen watching them cook.",
      keyPoints: [
        "JavaScript is single-threaded with ONE call stack",
        "Synchronous: code runs line by line, each line blocks the next",
        "Asynchronous: start a task, continue running, handle result later",
        "The Event Loop moves tasks from the queue to the call stack",
        "Browser APIs (setTimeout, fetch, DOM events) are asynchronous",
        "Blocking the main thread freezes the UI — async prevents this",
        "console.log() is sync; setTimeout() is async",
        "Understanding sync vs async is key to debugging timing issues",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Synchronous vs Asynchronous =====

// ── Synchronous: runs top to bottom ─────────────
console.log("1. Start");
console.log("2. Middle");
console.log("3. End");
// Output: 1, 2, 3 — always in order

// ── Asynchronous: non-blocking ──────────────────
console.log("\\n--- Async Example ---");
console.log("A. Start");

setTimeout(function() {
  console.log("B. Timeout done (after 0ms!)");
}, 0);

console.log("C. End");
// Output: A, C, B — setTimeout is async even with 0ms!

// ── Why? The Event Loop ─────────────────────────
// 1. "A. Start" → call stack → runs immediately
// 2. setTimeout → sends callback to Web API → timer starts
// 3. "C. End" → call stack → runs immediately
// 4. Timer done → callback moves to task queue
// 5. Call stack empty → event loop pushes callback → "B" runs

// ── Synchronous blocking example ────────────────
console.log("\\n--- Blocking ---");
function heavyTask() {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
}
console.log("Before heavy task");
const result = heavyTask();  // BLOCKS until done
console.log("After heavy task. Sum:", result);

// ── Real-world async patterns ───────────────────
console.log("\\n--- Real World ---");

// Simulating an API call
console.log("Fetching user data...");
setTimeout(() => {
  console.log("User data received: { name: 'Alice' }");
}, 100);
console.log("Doing other work while waiting...");

// Simulating file read
setTimeout(() => {
  console.log("File read complete!");
}, 200);

// ── Interview: predict the output ───────────────
console.log("\\n--- Predict Output ---");
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1, 4, 3, 2
// Why? Microtasks (Promises) run before macrotasks (setTimeout)
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between synchronous and asynchronous code in JavaScript?",
        difficulty: "Easy",
        hint: "Synchronous code executes line by line — each operation must complete before the next starts (blocking). Asynchronous code allows operations to start and then continues executing without waiting for them to finish. Results are handled later via callbacks, promises, or async/await. JS uses the event loop to manage async operations.",
      },
      {
        question: "Why does setTimeout with 0ms delay still run after synchronous code?",
        difficulty: "Medium",
        hint: "setTimeout(fn, 0) doesn't mean 'run immediately'. It means 'run as soon as possible AFTER the current call stack is empty'. The callback goes to the Web API, then to the task queue. The event loop only moves it to the call stack when it's empty. So all synchronous code runs first, then the timeout callback.",
      },
      {
        question: "What is the difference between microtasks and macrotasks?",
        difficulty: "Hard",
        hint: "Microtasks (Promise.then, queueMicrotask, MutationObserver) run after the current task but before the next macrotask. Macrotasks (setTimeout, setInterval, I/O, UI rendering) run one at a time. After each macrotask, ALL pending microtasks are drained. This is why Promise.resolve().then() runs before setTimeout(fn, 0).",
      },
    ],
  },
  {
    id: "set-timeout-set-interval",
    title: "setTimeout and setInterval",
    slug: "set-timeout-set-interval",
    icon: "Timer",
    difficulty: "Beginner",
    description:
      "Learn to schedule code execution with setTimeout (once) and setInterval (repeatedly) — the building blocks of timed async operations.",
    concept: {
      explanation:
        "setTimeout schedules a function to run ONCE after a specified delay (in milliseconds). setInterval schedules a function to run REPEATEDLY at a fixed interval. Both return an ID you can use to cancel them with clearTimeout or clearInterval. Key gotchas: 1) The delay is a MINIMUM, not a guarantee — if the call stack is busy, it waits. 2) setInterval doesn't account for execution time, so intervals can overlap. 3) Use recursive setTimeout for more predictable timing. 4) In the browser, minimum delay is ~4ms (clamped). These are fundamental tools for animations, polling, debouncing, and any time-based logic.",
      realLifeAnalogy:
        "setTimeout is like setting a kitchen timer — it rings once after the set time, and you do something when it goes off. setInterval is like an alarm clock that rings every morning — it keeps going until you turn it off (clearInterval). But if you're in the shower when it rings (call stack busy), you'll only hear it after you get out (delayed execution).",
      keyPoints: [
        "setTimeout(fn, delay): runs fn once after delay ms",
        "setInterval(fn, delay): runs fn repeatedly every delay ms",
        "Both return a numeric ID for cancellation",
        "clearTimeout(id) / clearInterval(id) to cancel",
        "Delay is a MINIMUM — actual timing depends on call stack",
        "Recursive setTimeout is more predictable than setInterval",
        "Minimum browser delay is ~4ms (clamped for nested timers)",
        "Always clear intervals in cleanup (memory leak prevention)",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== setTimeout and setInterval =====

// ── setTimeout: run once after delay ────────────
console.log("Start");

setTimeout(function() {
  console.log("Runs after 1 second");
}, 1000);

// With arrow function
setTimeout(() => console.log("Runs after 2 seconds"), 2000);

// ── Cancelling a timeout ────────────────────────
const timeoutId = setTimeout(() => {
  console.log("This will NOT run");
}, 5000);
clearTimeout(timeoutId);
console.log("Timeout cancelled!");

// ── setTimeout with 0ms ─────────────────────────
console.log("\\n--- Zero delay ---");
console.log("Before");
setTimeout(() => console.log("setTimeout 0"), 0);
console.log("After");
// Output: Before, After, setTimeout 0

// ── setInterval: repeat at interval ─────────────
console.log("\\n--- setInterval ---");
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log("Tick:", count);
  if (count >= 3) {
    clearInterval(intervalId);
    console.log("Interval stopped!");
  }
}, 1000);

// ── Passing arguments ───────────────────────────
setTimeout((name, age) => {
  console.log("\\nHello", name, "age", age);
}, 100, "Alice", 25);

// ── Recursive setTimeout (better than setInterval) ──
console.log("\\n--- Recursive setTimeout ---");
let step = 0;
function recurse() {
  step++;
  console.log("Step:", step);
  if (step < 3) {
    setTimeout(recurse, 1000);  // Schedule next after completion
  } else {
    console.log("Done!");
  }
}
setTimeout(recurse, 100);

// ── Real-world: countdown timer ─────────────────
function countdown(seconds) {
  console.log("\\nCountdown started!");
  let remaining = seconds;
  const id = setInterval(() => {
    console.log(remaining + "...");
    remaining--;
    if (remaining < 0) {
      clearInterval(id);
      console.log("Time's up!");
    }
  }, 1000);
  return id;
}
countdown(3);

// ── Real-world: debounce ────────────────────────
function debounce(fn, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = debounce((query) => {
  console.log("\\nSearching for:", query);
}, 300);

// Simulate rapid typing
search("h");
search("he");
search("hel");
search("hello");  // Only this one fires after 300ms
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between setTimeout and setInterval?",
        difficulty: "Easy",
        hint: "setTimeout runs a function ONCE after a delay. setInterval runs a function REPEATEDLY at the given interval until cleared. Both accept (callback, delay) and return an ID for cancellation. Use clearTimeout/clearInterval to stop them.",
      },
      {
        question: "Why is recursive setTimeout preferred over setInterval?",
        difficulty: "Medium",
        hint: "setInterval fires at fixed intervals regardless of execution time — if the callback takes longer than the interval, executions overlap. Recursive setTimeout schedules the NEXT call only AFTER the current one completes, guaranteeing at least 'delay' ms between executions. This gives predictable spacing.",
      },
      {
        question: "Implement a debounce function using setTimeout.",
        difficulty: "Hard",
        hint: "function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; } Each call clears the previous timer and sets a new one. The function only executes after the user stops calling for 'delay' ms. Used for search inputs, resize handlers, etc.",
      },
    ],
  },
  {
    id: "callbacks",
    title: "Callbacks",
    slug: "callbacks",
    icon: "PhoneCall",
    difficulty: "Beginner",
    description:
      "Understand callbacks — functions passed as arguments to other functions, the original way to handle asynchronous operations in JavaScript.",
    concept: {
      explanation:
        "A callback is simply a function passed as an argument to another function, to be 'called back' later. Callbacks are the foundation of async JavaScript. When you pass a function to setTimeout, addEventListener, or Array.map, you're using callbacks. There are two patterns: 1) Synchronous callbacks — called immediately (Array.forEach, map, filter). 2) Asynchronous callbacks — called later when an operation completes (setTimeout, file I/O, API requests). The Node.js convention is error-first callbacks: callback(error, result). While callbacks are powerful, deeply nested callbacks lead to 'callback hell', which is why Promises and async/await were introduced.",
      realLifeAnalogy:
        "A callback is like leaving your phone number at a restaurant when there's a wait. You give them your number (pass the callback), go do other things (continue execution), and they call you back when your table is ready (async operation completes). You don't stand there waiting — you gave them a way to reach you when the time is right.",
      keyPoints: [
        "A callback is a function passed as an argument to another function",
        "Synchronous callbacks: Array.map, forEach, filter — called immediately",
        "Asynchronous callbacks: setTimeout, fetch, fs.readFile — called later",
        "Node.js pattern: error-first callback(err, result)",
        "Callbacks enable non-blocking code execution",
        "addEventListener uses callbacks for event handling",
        "Deeply nested callbacks = 'callback hell' (readability issue)",
        "Modern alternative: Promises and async/await",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Callbacks =====

// ── What is a callback? ─────────────────────────
function greet(name, callback) {
  console.log("Hello, " + name + "!");
  callback();
}

greet("Alice", function() {
  console.log("Greeting complete!");
});

// ── Synchronous callbacks ───────────────────────
console.log("\\n--- Sync Callbacks ---");
const numbers = [1, 2, 3, 4, 5];

// forEach — callback runs for each element
numbers.forEach(function(num) {
  console.log("Item:", num);
});

// map — callback transforms each element
const doubled = numbers.map(num => num * 2);
console.log("Doubled:", doubled);

// filter — callback decides what to keep
const evens = numbers.filter(num => num % 2 === 0);
console.log("Evens:", evens);

// ── Asynchronous callbacks ──────────────────────
console.log("\\n--- Async Callbacks ---");
console.log("Before setTimeout");

setTimeout(function() {
  console.log("Inside timeout callback");
}, 100);

console.log("After setTimeout");
// Output: Before, After, Inside — async!

// ── Simulating API call with callback ───────────
function fetchUser(userId, callback) {
  console.log("\\nFetching user " + userId + "...");
  setTimeout(function() {
    const user = { id: userId, name: "Alice", email: "alice@example.com" };
    callback(null, user);  // error-first pattern
  }, 100);
}

fetchUser(1, function(error, user) {
  if (error) {
    console.log("Error:", error);
    return;
  }
  console.log("Got user:", user.name);
});

// ── Error-first callback pattern (Node.js) ──────
function readFile(path, callback) {
  setTimeout(() => {
    if (path === "missing.txt") {
      callback(new Error("File not found"));
      return;
    }
    callback(null, "File contents here");
  }, 50);
}

readFile("data.txt", (err, data) => {
  if (err) {
    console.log("\\nError:", err.message);
  } else {
    console.log("\\nData:", data);
  }
});

readFile("missing.txt", (err, data) => {
  if (err) {
    console.log("Error:", err.message);
  } else {
    console.log("Data:", data);
  }
});

// ── Callbacks with custom logic ─────────────────
function processArray(arr, processor, done) {
  const results = [];
  arr.forEach(item => {
    results.push(processor(item));
  });
  done(results);
}

processArray(
  [1, 2, 3],
  (n) => n * n,
  (results) => console.log("\\nSquared:", results)
);
`,
    },
    interviewQuestions: [
      {
        question: "What is a callback function in JavaScript?",
        difficulty: "Easy",
        hint: "A callback is a function passed as an argument to another function, to be executed later. Example: setTimeout(myFunction, 1000) — myFunction is the callback. Callbacks can be synchronous (Array.map) or asynchronous (setTimeout, fetch). They're the original way JS handles async operations.",
      },
      {
        question: "What is the error-first callback pattern?",
        difficulty: "Medium",
        hint: "A Node.js convention where callbacks receive (error, result) as arguments. If an error occurred, the first argument is an Error object and result is undefined. If successful, error is null and result contains the data. Always check error first: if (err) { handle error } else { use result }.",
      },
      {
        question: "What are the drawbacks of using callbacks for async code?",
        difficulty: "Medium",
        hint: "1) Callback hell — deeply nested callbacks become unreadable. 2) Inversion of control — you trust external code to call your callback correctly. 3) Error handling is manual and easy to forget. 4) No built-in way to handle multiple async operations. Promises solve these: chainable, built-in error propagation, Promise.all for parallel ops.",
      },
    ],
  },
  {
    id: "callback-hell",
    title: "Callback Hell",
    slug: "callback-hell",
    icon: "AlertTriangle",
    difficulty: "Intermediate",
    description:
      "Understand callback hell (pyramid of doom) — why deeply nested callbacks are problematic and how to escape them.",
    concept: {
      explanation:
        "Callback hell (also called the 'pyramid of doom') occurs when you have multiple asynchronous operations that depend on each other, leading to deeply nested callbacks. Each async operation needs the result of the previous one, so you nest callbacks inside callbacks inside callbacks. The code forms a pyramid shape, becomes hard to read, hard to debug, and hard to maintain. Error handling is scattered across each level. Solutions: 1) Named functions — extract each callback into a named function. 2) Modularize — split into separate modules. 3) Use Promises — chain with .then() instead of nesting. 4) Use async/await — write async code that looks synchronous. Understanding callback hell motivates learning Promises and async/await.",
      realLifeAnalogy:
        "Callback hell is like giving someone increasingly nested instructions: 'Go to the store, and when you arrive, call me. When I answer, I'll tell you what to buy, and when you find it, text me. When I reply, go to checkout, and when you pay, send me the receipt, and when I confirm...' Each step depends on the previous, and the instructions become impossibly complex. Better approach: give them a simple list (Promise chain) they can follow step by step.",
      keyPoints: [
        "Callback hell = deeply nested callbacks forming a pyramid shape",
        "Occurs when async operations depend on each other",
        "Also called 'pyramid of doom' due to rightward drift",
        "Problems: hard to read, debug, maintain, and handle errors",
        "Solution 1: extract named functions (flatten the nesting)",
        "Solution 2: use Promises with .then() chaining",
        "Solution 3: use async/await for synchronous-looking code",
        "Understanding this motivates learning Promises and async/await",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Callback Hell =====

// ── Simulated async operations ──────────────────
function getUser(userId, callback) {
  setTimeout(() => {
    console.log("Got user");
    callback(null, { id: userId, name: "Alice" });
  }, 100);
}

function getOrders(userId, callback) {
  setTimeout(() => {
    console.log("Got orders");
    callback(null, [{ id: 101, item: "Laptop", userId }]);
  }, 100);
}

function getOrderDetails(orderId, callback) {
  setTimeout(() => {
    console.log("Got order details");
    callback(null, { id: orderId, price: 999, status: "Shipped" });
  }, 100);
}

function getShipping(orderId, callback) {
  setTimeout(() => {
    console.log("Got shipping info");
    callback(null, { tracking: "TRACK123", eta: "Tomorrow" });
  }, 100);
}

// ── THE PROBLEM: Callback Hell ──────────────────
console.log("--- Callback Hell (Pyramid of Doom) ---");
getUser(1, function(err, user) {
  if (err) { console.log("Error:", err); return; }
  getOrders(user.id, function(err, orders) {
    if (err) { console.log("Error:", err); return; }
    getOrderDetails(orders[0].id, function(err, details) {
      if (err) { console.log("Error:", err); return; }
      getShipping(details.id, function(err, shipping) {
        if (err) { console.log("Error:", err); return; }
        console.log("\\nFinal result:");
        console.log("User:", user.name);
        console.log("Order:", orders[0].item);
        console.log("Price:", details.price);
        console.log("Tracking:", shipping.tracking);
        // Imagine more nesting...
      });
    });
  });
});

// ── SOLUTION 1: Named Functions ─────────────────
console.log("\\n--- Solution 1: Named Functions ---");
function handleShipping(user, order, details, err, shipping) {
  if (err) { console.log("Error:", err); return; }
  console.log("Result:", user.name, order.item, shipping.tracking);
}

function handleDetails(user, order, err, details) {
  if (err) { console.log("Error:", err); return; }
  getShipping(details.id, (e, s) => handleShipping(user, order, details, e, s));
}

function handleOrders(user, err, orders) {
  if (err) { console.log("Error:", err); return; }
  getOrderDetails(orders[0].id, (e, d) => handleDetails(user, orders[0], e, d));
}

function handleUser(err, user) {
  if (err) { console.log("Error:", err); return; }
  getOrders(user.id, (e, o) => handleOrders(user, e, o));
}

getUser(1, handleUser);

// ── SOLUTION 2: Promisified version ─────────────
console.log("\\n--- Solution 2: Promises ---");
function getUserP(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, name: "Alice" }), 50);
  });
}

function getOrdersP(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 101, item: "Laptop", userId }]), 50);
  });
}

function getDetailsP(orderId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: orderId, price: 999 }), 50);
  });
}

// Flat chain instead of nested pyramid
getUserP(1)
  .then(user => {
    console.log("User:", user.name);
    return getOrdersP(user.id);
  })
  .then(orders => {
    console.log("Order:", orders[0].item);
    return getDetailsP(orders[0].id);
  })
  .then(details => {
    console.log("Price:", details.price);
  })
  .catch(err => console.log("Error:", err));

// ── SOLUTION 3: async/await ─────────────────────
async function getFullOrder() {
  console.log("\\n--- Solution 3: async/await ---");
  const user = await getUserP(1);
  console.log("User:", user.name);
  const orders = await getOrdersP(user.id);
  console.log("Order:", orders[0].item);
  const details = await getDetailsP(orders[0].id);
  console.log("Price:", details.price);
  console.log("Clean and readable!");
}
getFullOrder();
`,
    },
    interviewQuestions: [
      {
        question: "What is callback hell and why is it a problem?",
        difficulty: "Easy",
        hint: "Callback hell is deeply nested callbacks that form a pyramid/triangle shape in code. It happens when async operations depend on each other. Problems: hard to read (rightward drift), hard to maintain, error handling scattered at each level, hard to debug. Also called 'pyramid of doom'.",
      },
      {
        question: "How do Promises solve callback hell?",
        difficulty: "Medium",
        hint: "Promises flatten nested callbacks into a chain of .then() calls. Instead of nesting: getA(cb => getB(cb => getC())), you chain: getA().then(a => getB()).then(b => getC()). Benefits: flat structure, centralized error handling with .catch(), can run parallel ops with Promise.all(), and enables async/await syntax.",
      },
      {
        question: "Convert nested callbacks into async/await code.",
        difficulty: "Hard",
        hint: "1) Wrap each callback-based function in a Promise (new Promise((resolve, reject) => { originalFn((err, data) => err ? reject(err) : resolve(data)); })). 2) Mark the containing function as async. 3) Replace each nested callback with await: const user = await getUser(1); const orders = await getOrders(user.id); — reads like synchronous code.",
      },
    ],
  },
  {
    id: "promises",
    title: "Promises",
    slug: "promises",
    icon: "Sparkles",
    difficulty: "Intermediate",
    description:
      "Master JavaScript Promises — objects representing the eventual completion (or failure) of an asynchronous operation.",
    concept: {
      explanation:
        "A Promise is an object representing the eventual result of an asynchronous operation. It has three states: PENDING (initial, neither fulfilled nor rejected), FULFILLED (operation completed successfully), and REJECTED (operation failed). You create a Promise with new Promise((resolve, reject) => { ... }). Call resolve(value) on success, reject(error) on failure. Consume promises with .then(onFulfilled) and .catch(onRejected). Key methods: Promise.all() waits for ALL promises to resolve (fails fast if any reject). Promise.race() resolves/rejects with the first settled promise. Promise.allSettled() waits for ALL to settle regardless of result. Promise.any() resolves with the first fulfilled promise. Promises are the foundation of modern async JavaScript.",
      realLifeAnalogy:
        "A Promise is like an online order confirmation. When you place an order, you get a tracking receipt (the Promise object) immediately — the order is PENDING. Later, either the package arrives at your door (FULFILLED/resolved with the item) or you get a notification that it's lost (REJECTED with an error). You don't wait at the door — you set up delivery instructions (.then) and a complaint process (.catch) ahead of time.",
      keyPoints: [
        "Promise states: pending → fulfilled (resolved) or rejected",
        "new Promise((resolve, reject) => { ... }) to create",
        "resolve(value): mark as fulfilled; reject(error): mark as rejected",
        ".then(fn): handle fulfilled value; .catch(fn): handle rejection",
        ".finally(fn): runs regardless of outcome (cleanup)",
        "Promise.all([p1, p2]): wait for ALL, fail-fast on any rejection",
        "Promise.race([p1, p2]): first to settle wins",
        "Promise.allSettled(): wait for ALL, get all results",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Promises =====

// ── Creating a Promise ──────────────────────────
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Operation succeeded!");
  } else {
    reject(new Error("Operation failed!"));
  }
});

myPromise
  .then(result => console.log(result))
  .catch(error => console.log(error.message));

// ── Promise states ──────────────────────────────
console.log("\\n--- Promise States ---");
const pending = new Promise(() => {});  // stays pending
const fulfilled = Promise.resolve("done");
const rejected = Promise.reject(new Error("fail"));

console.log("Pending:", pending);       // Promise { <pending> }
console.log("Fulfilled:", fulfilled);   // Promise { 'done' }
rejected.catch(() => {});  // handle to avoid unhandled rejection

// ── Simulating async operations ─────────────────
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error("Invalid user ID"));
      }
      resolve({ id, name: "Alice", role: "Developer" });
    }, 100);
  });
}

fetchUser(1).then(user => console.log("\\nUser:", user.name));
fetchUser(-1).catch(err => console.log("Error:", err.message));

// ── .then(), .catch(), .finally() ───────────────
console.log("\\n--- then/catch/finally ---");
fetchUser(1)
  .then(user => {
    console.log("Got:", user.name);
    return user.role;  // pass to next .then
  })
  .then(role => console.log("Role:", role))
  .catch(err => console.log("Error:", err.message))
  .finally(() => console.log("Cleanup done!"));

// ── Promise.all — parallel execution ────────────
console.log("\\n--- Promise.all ---");
const p1 = fetchUser(1);
const p2 = Promise.resolve({ id: 2, name: "Bob" });
const p3 = new Promise(r => setTimeout(() => r({ id: 3, name: "Charlie" }), 50));

Promise.all([p1, p2, p3]).then(users => {
  console.log("All users:", users.map(u => u.name).join(", "));
});

// ── Promise.race — first to settle ──────────────
console.log("\\n--- Promise.race ---");
const fast = new Promise(r => setTimeout(() => r("Fast!"), 50));
const slow = new Promise(r => setTimeout(() => r("Slow!"), 200));
Promise.race([fast, slow]).then(result => {
  console.log("Winner:", result);  // "Fast!"
});

// ── Promise.allSettled — all results ────────────
console.log("\\n--- Promise.allSettled ---");
const tasks = [
  Promise.resolve("Task 1 done"),
  Promise.reject(new Error("Task 2 failed")),
  Promise.resolve("Task 3 done"),
];

Promise.allSettled(tasks).then(results => {
  results.forEach((r, i) => {
    console.log(\`Task \${i + 1}: \${r.status}\`);
  });
});

// ── Promise.any — first fulfilled ───────────────
const sources = [
  new Promise((_, rej) => setTimeout(() => rej("Fail 1"), 50)),
  new Promise(res => setTimeout(() => res("Source 2 OK"), 100)),
  new Promise(res => setTimeout(() => res("Source 3 OK"), 200)),
];
Promise.any(sources).then(first => {
  console.log("\\nFirst success:", first);
});
`,
    },
    interviewQuestions: [
      {
        question: "What are the three states of a Promise?",
        difficulty: "Easy",
        hint: "Pending (initial state, waiting for result), Fulfilled (resolved successfully with a value), Rejected (failed with a reason/error). A promise is 'settled' once it's either fulfilled or rejected. Once settled, it cannot change state — it's immutable.",
      },
      {
        question: "What is the difference between Promise.all, Promise.race, Promise.allSettled, and Promise.any?",
        difficulty: "Medium",
        hint: "Promise.all: resolves when ALL fulfill, rejects on FIRST rejection (fail-fast). Promise.race: settles with first to settle (fulfill or reject). Promise.allSettled: waits for ALL, returns array of {status, value/reason}. Promise.any: resolves with first to FULFILL, rejects only if ALL reject (AggregateError).",
      },
      {
        question: "How do you convert a callback-based function to return a Promise?",
        difficulty: "Hard",
        hint: "Wrap in new Promise: function readFilePromise(path) { return new Promise((resolve, reject) => { fs.readFile(path, (err, data) => { if (err) reject(err); else resolve(data); }); }); } Node.js also provides util.promisify(fn) to auto-convert error-first callback functions.",
      },
    ],
  },
  {
    id: "promise-chaining",
    title: "Promise Chaining",
    slug: "promise-chaining",
    icon: "Link2",
    difficulty: "Intermediate",
    description:
      "Learn to chain promises with .then() to handle sequential async operations in a flat, readable way.",
    concept: {
      explanation:
        "Promise chaining is the technique of connecting multiple .then() calls in sequence. Each .then() receives the return value of the previous .then(). If a .then() returns a Promise, the next .then() waits for it to resolve before running. This creates a flat chain instead of nested callbacks. Key rules: 1) .then() always returns a new Promise. 2) Returning a value wraps it in a resolved Promise. 3) Returning a Promise chains it — next .then() waits. 4) Throwing an error skips to the nearest .catch(). 5) .catch() also returns a Promise, so chaining can continue after error recovery. This is how you handle sequential async operations cleanly.",
      realLifeAnalogy:
        "Promise chaining is like an assembly line in a factory. Each station (.then) receives the product from the previous station, does its work, and passes it to the next. If any station finds a defect, it goes to quality control (.catch). The assembly line is flat and linear — much easier to follow than workers handing things back and forth in a tangled web (nested callbacks).",
      keyPoints: [
        ".then() always returns a NEW Promise",
        "Return a value → wraps in resolved Promise → next .then() gets it",
        "Return a Promise → next .then() waits for it to settle",
        "Throw an error → skips to nearest .catch()",
        ".catch() returns a Promise too — chain continues after recovery",
        "Each .then() is flat (no nesting) — reads top to bottom",
        "Common mistake: forgetting to return inside .then()",
        ".finally() runs after chain completes (success or error)",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Promise Chaining =====

// ── Basic chaining ──────────────────────────────
console.log("--- Basic Chain ---");
Promise.resolve(1)
  .then(val => {
    console.log("Step 1:", val);  // 1
    return val + 10;
  })
  .then(val => {
    console.log("Step 2:", val);  // 11
    return val * 2;
  })
  .then(val => {
    console.log("Step 3:", val);  // 22
  });

// ── Chaining async operations ───────────────────
function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Alice" }), 50);
  });
}

function getOrders(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([
      { id: 101, item: "Laptop", price: 999 },
      { id: 102, item: "Mouse", price: 29 },
    ]), 50);
  });
}

function getReviews(orderId) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ orderId, rating: 5, text: "Excellent!" }), 50);
  });
}

console.log("\\n--- Sequential Async Chain ---");
getUser(1)
  .then(user => {
    console.log("User:", user.name);
    return getOrders(user.id);  // return Promise!
  })
  .then(orders => {
    console.log("Orders:", orders.length);
    console.log("First order:", orders[0].item);
    return getReviews(orders[0].id);  // return Promise!
  })
  .then(review => {
    console.log("Review:", review.rating, "stars -", review.text);
  })
  .catch(err => console.log("Error:", err.message));

// ── Common mistake: forgetting to return ────────
console.log("\\n--- Forgetting Return ---");
Promise.resolve("start")
  .then(val => {
    console.log("Got:", val);
    // OOPS: forgot 'return'
    Promise.resolve("lost value");
  })
  .then(val => {
    console.log("Next got:", val);  // undefined!
  });

// Fixed version
Promise.resolve("start")
  .then(val => {
    console.log("Got:", val);
    return Promise.resolve("kept value");  // return it!
  })
  .then(val => {
    console.log("Next got:", val);  // "kept value"
  });

// ── Error handling in chains ────────────────────
console.log("\\n--- Error Handling ---");
Promise.resolve("data")
  .then(val => {
    console.log("Processing:", val);
    throw new Error("Something broke!");
  })
  .then(val => {
    console.log("This is SKIPPED");  // never runs
  })
  .catch(err => {
    console.log("Caught:", err.message);
    return "recovered";  // recovery value
  })
  .then(val => {
    console.log("After recovery:", val);  // "recovered"
  });

// ── Real-world: API data pipeline ───────────────
console.log("\\n--- Data Pipeline ---");
function fetchJSON(url) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 50);
  });
}

fetchJSON("/api/numbers")
  .then(response => response.data)
  .then(numbers => numbers.filter(n => n > 2))
  .then(filtered => filtered.map(n => n * 10))
  .then(result => console.log("Pipeline result:", result))
  .catch(err => console.log("Pipeline error:", err));

// ── Returning vs not returning ──────────────────
console.log("\\n--- Return Values ---");
Promise.resolve(5)
  .then(n => n * 2)           // return 10
  .then(n => n + 3)           // return 13
  .then(n => console.log("Final:", n))  // 13
  .then(n => console.log("After log:", n));  // undefined (console.log returns undefined)
`,
    },
    interviewQuestions: [
      {
        question: "How does Promise chaining work?",
        difficulty: "Easy",
        hint: ".then() always returns a new Promise. Whatever you return from .then() becomes the resolved value of that new Promise. If you return a Promise, the chain waits for it. This lets you chain: fetch().then(parse).then(process).catch(handleError). Each step gets the previous step's result.",
      },
      {
        question: "What happens if you forget to return a value in .then()?",
        difficulty: "Medium",
        hint: "The next .then() receives undefined. Common bug: getUser().then(user => { getOrders(user.id); }).then(orders => { /* orders is undefined! */ }). Fix: add 'return' before getOrders. Without return, the Promise from getOrders is created but not chained — the next .then() runs immediately with undefined.",
      },
      {
        question: "How does error propagation work in Promise chains?",
        difficulty: "Hard",
        hint: "Errors (thrown or rejected) skip all .then() handlers until a .catch() is found. .catch(fn) is sugar for .then(undefined, fn). After .catch(), the chain continues normally with whatever .catch() returns. If .catch() throws, the error propagates further. This gives you centralized error handling at the end of the chain.",
      },
    ],
  },
  {
    id: "async-await",
    title: "Async Await",
    slug: "async-await",
    icon: "Clock",
    difficulty: "Intermediate",
    description:
      "Learn async/await — syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code.",
    concept: {
      explanation:
        "async/await is syntactic sugar built on top of Promises. The 'async' keyword before a function makes it always return a Promise. The 'await' keyword can only be used inside an async function — it pauses execution until the Promise resolves, then returns the resolved value. This lets you write asynchronous code that reads like synchronous code — no .then() chains needed. Error handling uses familiar try/catch blocks instead of .catch(). Under the hood, async/await uses Promises and the microtask queue. Key points: await pauses the async function (not the entire thread), multiple awaits run sequentially (use Promise.all for parallel), and top-level await works in ES modules.",
      realLifeAnalogy:
        "async/await is like a cookbook recipe with clear steps. Without await (raw Promises), the recipe says 'start boiling water, and when done, THEN add pasta, and when done, THEN drain.' With await, it reads naturally: 'boil water (wait), add pasta (wait), drain (wait).' Each step clearly waits for the previous one, but the kitchen (event loop) can handle other tasks while you wait.",
      keyPoints: [
        "async function always returns a Promise",
        "await pauses the function until Promise resolves",
        "await can only be used inside async functions (or top-level in modules)",
        "Error handling: use try/catch instead of .catch()",
        "Multiple awaits run SEQUENTIALLY — use Promise.all for parallel",
        "Async functions return their return value wrapped in Promise.resolve()",
        "Throwing in async function = returning Promise.reject()",
        "Top-level await works in ES modules",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Async / Await =====

// ── Basic async function ────────────────────────
async function greet() {
  return "Hello!";  // automatically wrapped in Promise.resolve()
}

greet().then(msg => console.log(msg));  // "Hello!"

// ── Using await ─────────────────────────────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log("\\n--- Await Demo ---");
  console.log("Start");
  await delay(100);
  console.log("After 100ms");
  await delay(100);
  console.log("After 200ms");
  console.log("Done!");
}
demo();

// ── Fetching data with async/await ──────────────
function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Alice", role: "Dev" }), 50);
  });
}

function fetchOrders(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([
      { id: 1, item: "Laptop" },
      { id: 2, item: "Mouse" },
    ]), 50);
  });
}

async function getUserData() {
  console.log("\\n--- Sequential Await ---");
  const user = await fetchUser(1);
  console.log("User:", user.name);

  const orders = await fetchOrders(user.id);
  console.log("Orders:", orders.map(o => o.item).join(", "));

  return { user, orders };
}
getUserData().then(data => console.log("Total orders:", data.orders.length));

// ── Error handling with try/catch ───────────────
function riskyOp(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("Something went wrong!"));
      else resolve("Success!");
    }, 50);
  });
}

async function handleErrors() {
  console.log("\\n--- Try/Catch ---");
  try {
    const result = await riskyOp(false);
    console.log("Result:", result);

    const bad = await riskyOp(true);
    console.log("This won't run");
  } catch (error) {
    console.log("Caught:", error.message);
  } finally {
    console.log("Cleanup done!");
  }
}
handleErrors();

// ── Sequential vs Parallel ──────────────────────
async function sequential() {
  console.log("\\n--- Sequential (slow) ---");
  const start = Date.now();
  const a = await delay(100);
  const b = await delay(100);
  console.log("Sequential:", Date.now() - start, "ms");  // ~200ms
}

async function parallel() {
  console.log("\\n--- Parallel (fast) ---");
  const start = Date.now();
  const [a, b] = await Promise.all([delay(100), delay(100)]);
  console.log("Parallel:", Date.now() - start, "ms");  // ~100ms
}

sequential().then(() => parallel());

// ── Async with array methods ────────────────────
async function processItems() {
  console.log("\\n--- Async Loop ---");
  const ids = [1, 2, 3];

  // Sequential processing
  for (const id of ids) {
    const user = await fetchUser(id);
    console.log("Processed:", user.name, id);
  }

  // Parallel processing
  const users = await Promise.all(ids.map(id => fetchUser(id)));
  console.log("All users:", users.length);
}
processItems();

// ── Returning from async ────────────────────────
async function getNumber() {
  return 42;  // same as: return Promise.resolve(42)
}

async function throwError() {
  throw new Error("Oops");  // same as: return Promise.reject(...)
}

getNumber().then(n => console.log("\\nNumber:", n));
throwError().catch(e => console.log("Error:", e.message));
`,
    },
    interviewQuestions: [
      {
        question: "What does the async keyword do to a function?",
        difficulty: "Easy",
        hint: "The async keyword makes a function always return a Promise. If the function returns a value, it's wrapped in Promise.resolve(). If it throws, it's wrapped in Promise.reject(). This enables the use of 'await' inside the function body.",
      },
      {
        question: "How do you run async operations in parallel with async/await?",
        difficulty: "Medium",
        hint: "Use Promise.all() with await. Instead of: const a = await fetchA(); const b = await fetchB(); (sequential, slow), do: const [a, b] = await Promise.all([fetchA(), fetchB()]); (parallel, fast). Both promises start simultaneously, and you wait for all to complete.",
      },
      {
        question: "What are the pitfalls of using await inside loops?",
        difficulty: "Hard",
        hint: "Using await in a for loop runs operations sequentially (each waits for the previous). For parallel: use Promise.all(arr.map(async item => await process(item))). forEach with await doesn't work as expected — it doesn't wait. for...of with await works but is sequential. Choose based on whether operations are independent (parallel) or dependent (sequential).",
      },
    ],
  },
  {
    id: "error-handling-try-catch",
    title: "Error Handling with try catch",
    slug: "error-handling-try-catch",
    icon: "ShieldCheck",
    difficulty: "Intermediate",
    description:
      "Learn robust error handling in JavaScript — try/catch/finally, custom errors, and handling async errors gracefully.",
    concept: {
      explanation:
        "try/catch/finally is JavaScript's mechanism for handling runtime errors gracefully. The try block contains code that might throw an error. If an error occurs, execution jumps to the catch block, which receives the error object. The finally block runs regardless of success or failure — perfect for cleanup. You can throw custom errors with 'throw new Error(message)' or create custom error classes. For async code: try/catch works with async/await. For Promises, use .catch(). Common patterns: validation errors, network errors, JSON parsing errors. Best practices: catch specific errors, don't swallow errors silently, always clean up resources, use custom error types for different error categories.",
      realLifeAnalogy:
        "try/catch is like a safety net at a circus. The acrobat performs (try block), and if they fall (error thrown), the safety net catches them (catch block). Regardless of whether they fell or performed perfectly, the crew cleans up afterward (finally block). Without the net, a fall would be catastrophic (unhandled exception crashes the program).",
      keyPoints: [
        "try: code that might throw an error",
        "catch(error): handles the error, receives error object",
        "finally: always runs — cleanup code goes here",
        "throw new Error('message'): manually throw errors",
        "Error types: Error, TypeError, RangeError, SyntaxError, ReferenceError",
        "Custom errors: class MyError extends Error { ... }",
        "async/await: wrap await in try/catch for error handling",
        "Never silently swallow errors — always log or rethrow",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Error Handling with try/catch =====

// ── Basic try/catch ─────────────────────────────
console.log("--- Basic try/catch ---");
try {
  const result = JSON.parse('{"name": "Alice"}');
  console.log("Parsed:", result.name);
} catch (error) {
  console.log("Error:", error.message);
}

// Error caught!
try {
  const bad = JSON.parse("not valid json");
} catch (error) {
  console.log("Caught:", error.message);
}

// ── try/catch/finally ───────────────────────────
console.log("\\n--- Finally ---");
function readDatabase() {
  let connection = null;
  try {
    connection = "connected";
    console.log("DB:", connection);
    // Simulate error
    throw new Error("Query failed!");
  } catch (error) {
    console.log("Caught:", error.message);
  } finally {
    // Always runs — perfect for cleanup
    connection = null;
    console.log("Connection closed (finally)");
  }
}
readDatabase();

// ── Throwing custom errors ──────────────────────
console.log("\\n--- Custom Errors ---");
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Arguments must be numbers");
  }
  if (b === 0) {
    throw new RangeError("Cannot divide by zero");
  }
  return a / b;
}

try {
  console.log(divide(10, 2));
  console.log(divide(10, 0));
} catch (error) {
  console.log(error.constructor.name + ":", error.message);
}

// ── Custom Error class ──────────────────────────
console.log("\\n--- Custom Error Class ---");
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NotFoundError extends Error {
  constructor(resource) {
    super(resource + " not found");
    this.name = "NotFoundError";
    this.resource = resource;
  }
}

function validateUser(user) {
  if (!user.name) throw new ValidationError("name", "Name is required");
  if (user.age < 0) throw new ValidationError("age", "Age must be positive");
  return true;
}

try {
  validateUser({ name: "", age: 25 });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation:", error.field, "-", error.message);
  } else {
    throw error;  // rethrow unknown errors
  }
}

// ── Error handling with async/await ─────────────
console.log("\\n--- Async Error Handling ---");
function fetchData(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("Network error"));
      else resolve({ data: "Success!" });
    }, 50);
  });
}

async function loadData() {
  try {
    const result = await fetchData(false);
    console.log("Data:", result.data);

    const bad = await fetchData(true);
  } catch (error) {
    console.log("Async error caught:", error.message);
  } finally {
    console.log("Loading complete");
  }
}
loadData();

// ── Promise .catch() vs try/catch ───────────────
console.log("\\n--- Promise .catch() ---");
fetchData(true)
  .then(data => console.log(data))
  .catch(err => console.log("Promise catch:", err.message));

// ── Error handling patterns ─────────────────────
console.log("\\n--- Patterns ---");

// Pattern 1: Wrapper function for async error handling
async function tryCatch(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

async function usingWrapper() {
  const [err, data] = await tryCatch(fetchData(false));
  if (err) {
    console.log("Error:", err.message);
  } else {
    console.log("Wrapper result:", data.data);
  }
}
usingWrapper();

// Pattern 2: Global error handler
if (typeof process !== "undefined") {
  // Node.js
  process.on("unhandledRejection", (reason) => {
    console.log("Unhandled:", reason);
  });
}
`,
    },
    interviewQuestions: [
      {
        question: "What is the purpose of the finally block?",
        difficulty: "Easy",
        hint: "The finally block always executes regardless of whether an error was thrown or caught. It's used for cleanup: closing database connections, releasing file handles, hiding loading spinners, etc. It runs after try (if no error) or after catch (if error). Even if try or catch has a return statement, finally still runs.",
      },
      {
        question: "How do you create custom error types in JavaScript?",
        difficulty: "Medium",
        hint: "Extend the Error class: class CustomError extends Error { constructor(msg) { super(msg); this.name = 'CustomError'; } }. Add custom properties for context. Use instanceof to catch specific errors: catch(e) { if (e instanceof CustomError) { ... } }. Common pattern: ValidationError, NotFoundError, AuthError.",
      },
      {
        question: "What is the difference between error handling with Promises (.catch) vs async/await (try/catch)?",
        difficulty: "Hard",
        hint: "Functionally equivalent — both handle rejected promises. .catch() is chainable and can recover mid-chain. try/catch with async/await reads more like synchronous code and can wrap multiple await statements. Key difference: unhandled rejection in .then() chain needs .catch() at the end; in async/await, uncaught errors become unhandled promise rejections. Best practice: always handle errors in both patterns.",
      },
    ],
  },
  {
    id: "fetch-api",
    title: "Fetch API",
    slug: "fetch-api",
    icon: "Database",
    difficulty: "Intermediate",
    description:
      "Master the Fetch API — the modern, Promise-based way to make HTTP requests and interact with web APIs in JavaScript.",
    concept: {
      explanation:
        "The Fetch API is the modern replacement for XMLHttpRequest (XHR). It provides a clean, Promise-based interface for making HTTP requests. fetch(url, options) returns a Promise that resolves to a Response object. Key points: 1) fetch() only rejects on NETWORK errors, not HTTP errors (404, 500 still resolve). 2) You must check response.ok or response.status. 3) Response body methods: .json(), .text(), .blob(), .formData() — each returns a Promise and can only be called ONCE. 4) Options: method (GET/POST/PUT/DELETE), headers, body (for POST/PUT). 5) Use AbortController to cancel requests. 6) Fetch is available in browsers and Node.js 18+. This is the primary way modern JavaScript communicates with servers.",
      realLifeAnalogy:
        "The Fetch API is like ordering food through a delivery app. You tap 'Order' (call fetch()), get a confirmation immediately (Promise). Later, the delivery arrives (Response). But you still need to open the bag and check the order (.json()). The delivery can arrive but the food might be wrong (HTTP 404/500 — response received but not ok). Only if the delivery service is completely down (network error) does the order truly fail (reject).",
      keyPoints: [
        "fetch(url) returns a Promise<Response>",
        "Only rejects on network errors — NOT on 404/500",
        "Check response.ok or response.status for HTTP errors",
        ".json(), .text(), .blob(): parse response body (returns Promise)",
        "Response body can only be consumed ONCE",
        "POST: fetch(url, { method: 'POST', body: JSON.stringify(data), headers })",
        "AbortController: cancel in-flight requests",
        "Available in all modern browsers and Node.js 18+",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Fetch API =====

// NOTE: These examples use simulated fetch for demonstration
// In a real app, you'd call actual URLs

// ── Simulated fetch for demo ────────────────────
function simulateFetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes("error")) {
        reject(new Error("Network error"));
        return;
      }

      const responses = {
        "/api/users": [
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ],
        "/api/users/1": { id: 1, name: "Alice", email: "alice@test.com" },
        "/api/posts": [
          { id: 1, title: "Hello World" },
          { id: 2, title: "Async JS" },
        ],
      };

      const status = url.includes("404") ? 404 : 200;
      const data = responses[url] || { message: "Created" };

      resolve({
        ok: status >= 200 && status < 300,
        status,
        statusText: status === 200 ? "OK" : "Not Found",
        json: () => Promise.resolve(data),
        text: () => Promise.resolve(JSON.stringify(data)),
        headers: { get: (h) => h === "content-type" ? "application/json" : null },
      });
    }, 50);
  });
}

// ── Basic GET request ───────────────────────────
console.log("--- Basic GET ---");
simulateFetch("/api/users")
  .then(response => response.json())
  .then(users => console.log("Users:", JSON.stringify(users)))
  .catch(err => console.log("Error:", err.message));

// ── With async/await ────────────────────────────
async function getUsers() {
  console.log("\\n--- Async/Await GET ---");
  try {
    const response = await simulateFetch("/api/users");
    const users = await response.json();
    console.log("Users:", users.map(u => u.name).join(", "));
  } catch (error) {
    console.log("Error:", error.message);
  }
}
getUsers();

// ── Checking response status ────────────────────
async function fetchWithCheck(url) {
  const response = await simulateFetch(url);

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }

  return response.json();
}

async function demo404() {
  console.log("\\n--- Error Handling ---");
  try {
    const data = await fetchWithCheck("/api/users/1");
    console.log("User:", data.name);
  } catch (err) {
    console.log("Error:", err.message);
  }

  try {
    await fetchWithCheck("/api/404");
  } catch (err) {
    console.log("Caught:", err.message);
  }
}
demo404();

// ── POST request ────────────────────────────────
async function createPost() {
  console.log("\\n--- POST Request ---");
  const response = await simulateFetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "New Post",
      content: "Hello from Fetch API!",
    }),
  });

  const data = await response.json();
  console.log("Created:", JSON.stringify(data));
}
createPost();

// ── Parallel requests with Promise.all ──────────
async function fetchParallel() {
  console.log("\\n--- Parallel Fetches ---");
  const [usersRes, postsRes] = await Promise.all([
    simulateFetch("/api/users"),
    simulateFetch("/api/posts"),
  ]);

  const users = await usersRes.json();
  const posts = await postsRes.json();

  console.log("Users:", users.length);
  console.log("Posts:", posts.length);
}
fetchParallel();

// ── Reusable fetch wrapper ──────────────────────
async function api(url, options = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  const response = await simulateFetch(url, config);

  if (!response.ok) {
    const error = new Error(\`API Error: \${response.status}\`);
    throw error;
  }

  return response.json();
}

async function useWrapper() {
  console.log("\\n--- Reusable Wrapper ---");
  const users = await api("/api/users");
  console.log("Via wrapper:", users.map(u => u.name).join(", "));
}
useWrapper();

// ── Real Fetch API syntax reference ─────────────
console.log("\\n--- Real Fetch Syntax ---");
console.log("GET:  fetch('/api/data')");
console.log("POST: fetch('/api/data', { method: 'POST', body: JSON.stringify(data) })");
console.log("PUT:  fetch('/api/data/1', { method: 'PUT', body: ... })");
console.log("DELETE: fetch('/api/data/1', { method: 'DELETE' })");
`,
    },
    interviewQuestions: [
      {
        question: "Why doesn't fetch reject on HTTP error status codes like 404 or 500?",
        difficulty: "Easy",
        hint: "fetch() only rejects on network failures (no internet, DNS error, CORS blocked). HTTP error responses (404, 500) are still valid responses from the server — the request succeeded, the server just returned an error status. You must check response.ok (true for 200-299) or response.status manually to handle HTTP errors.",
      },
      {
        question: "How would you implement request timeout with the Fetch API?",
        difficulty: "Medium",
        hint: "Use AbortController: const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 5000); fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timeout)). When aborted, fetch rejects with an AbortError. This lets you cancel requests that take too long.",
      },
      {
        question: "How do you handle concurrent API requests efficiently?",
        difficulty: "Hard",
        hint: "Use Promise.all for parallel requests: const [users, posts] = await Promise.all([fetch('/users'), fetch('/posts')]). For error tolerance, use Promise.allSettled to get all results even if some fail. For rate limiting, process in batches or use a queue. For caching, check a Map before fetching. Always handle individual response errors within the array.",
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // Level 7 — Modern JavaScript (ES6+)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "template-literals",
    title: "Template Literals",
    slug: "template-literals",
    icon: "Terminal",
    difficulty: "Beginner",
    description:
      "Master template literals — backtick strings with embedded expressions, multi-line support, and tagged templates.",
    concept: {
      explanation:
        "Template literals (introduced in ES6) use backticks (`) instead of quotes. They support: 1) String interpolation — embed expressions with ${expression}. 2) Multi-line strings — no need for \\n or concatenation. 3) Tagged templates — pass a template literal to a function for custom processing. Inside ${}, you can put any JavaScript expression: variables, function calls, math, ternaries, even other template literals. Template literals are the modern standard for building strings in JavaScript — used everywhere in React JSX, SQL queries, HTML generation, logging, and more.",
      realLifeAnalogy:
        "Template literals are like a fill-in-the-blank form. Instead of cutting and pasting separate pieces of paper together (string concatenation), you have a single form with blank spaces (${}) that get filled in automatically. Multi-line support is like the form spanning multiple lines naturally, without taping pages together.",
      keyPoints: [
        "Use backticks (`) instead of single or double quotes",
        "${expression} embeds any JS expression inside the string",
        "Multi-line strings work naturally — no \\n needed",
        "Tagged templates: myTag`Hello ${name}` — custom processing",
        "Expressions can be: variables, function calls, ternaries, math",
        "Nesting: `${`inner ${value}`}` works fine",
        "Common in React JSX, CSS-in-JS, SQL, logging",
        "Replaces string concatenation: 'Hello ' + name + '!'",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Template Literals =====

// ── Basic interpolation ─────────────────────────
const name = "Alice";
const age = 25;

// Old way: concatenation
console.log("Hello, " + name + "! You are " + age + " years old.");

// New way: template literals
console.log(\`Hello, \${name}! You are \${age} years old.\`);

// ── Expressions inside \${} ─────────────────────
const price = 29.99;
const qty = 3;
console.log(\`\\nTotal: $\${(price * qty).toFixed(2)}\`);
console.log(\`Status: \${age >= 18 ? "Adult" : "Minor"}\`);
console.log(\`Uppercase: \${name.toUpperCase()}\`);

// ── Multi-line strings ──────────────────────────
console.log("\\n--- Multi-line ---");
const html = \`
<div class="card">
  <h2>\${name}</h2>
  <p>Age: \${age}</p>
</div>\`;
console.log(html);

// Old way needed concatenation or \\n
const oldHtml = "<div>\\n  <h2>" + name + "</h2>\\n</div>";
console.log(oldHtml);

// ── Nested template literals ────────────────────
console.log("\\n--- Nesting ---");
const items = ["Apple", "Banana", "Cherry"];
const list = \`<ul>
\${items.map(item => \`  <li>\${item}</li>\`).join("\\n")}
</ul>\`;
console.log(list);

// ── Tagged templates ────────────────────────────
console.log("\\n--- Tagged Templates ---");
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? \`【\${values[i]}】\` : "");
  }, "");
}

const lang = "JavaScript";
const year = 2015;
console.log(highlight\`\${lang} got template literals in \${year}!\`);

// ── Real-world: SQL-like query builder ──────────
function sql(strings, ...values) {
  const sanitized = values.map(v =>
    typeof v === "string" ? \`'\${v.replace(/'/g, "''")}'\` : v
  );
  return strings.reduce((q, str, i) =>
    q + str + (sanitized[i] !== undefined ? sanitized[i] : ""), ""
  );
}

const table = "users";
const id = 42;
console.log("\\n" + sql\`SELECT * FROM \${table} WHERE id = \${id}\`);

// ── Real-world: CSS-in-JS pattern ───────────────
const theme = { primary: "#3b82f6", radius: "8px" };
const styles = \`
  .button {
    background: \${theme.primary};
    border-radius: \${theme.radius};
    padding: 8px 16px;
    color: white;
  }
\`;
console.log("\\n--- CSS-in-JS ---" + styles);
`,
    },
    interviewQuestions: [
      {
        question: "What are template literals and how do they differ from regular strings?",
        difficulty: "Easy",
        hint: "Template literals use backticks (`) instead of quotes. They support: 1) String interpolation with ${expression}. 2) Multi-line strings without \\n. 3) Tagged templates for custom processing. Regular strings need concatenation (+) for expressions and \\n for new lines.",
      },
      {
        question: "What are tagged templates and when would you use them?",
        difficulty: "Medium",
        hint: "Tagged templates call a function with the template: tag`Hello ${name}`. The function receives an array of string parts and the interpolated values. Use cases: CSS-in-JS (styled-components), SQL query sanitization, i18n/localization, syntax highlighting. The tag function can transform, sanitize, or format the template.",
      },
      {
        question: "How would you use template literals to prevent SQL injection?",
        difficulty: "Hard",
        hint: "Create a tagged template that automatically sanitizes values: function sql(strings, ...values) { return strings.reduce((q, s, i) => q + s + (values[i] ? escape(values[i]) : ''), ''); }. The key is that strings (static parts) and values (dynamic parts) are separated, so you can sanitize values before interpolation. This is the pattern used by libraries like sql-template-strings.",
      },
    ],
  },
  {
    id: "destructuring-assignment",
    title: "Destructuring",
    slug: "destructuring-assignment",
    icon: "Minimize",
    difficulty: "Beginner",
    description:
      "Learn destructuring — the ES6 syntax for extracting values from arrays and properties from objects into distinct variables.",
    concept: {
      explanation:
        "Destructuring is an ES6 syntax that lets you unpack values from arrays or properties from objects into separate variables in a single statement. Array destructuring uses [a, b] = array and works by position. Object destructuring uses {name, age} = object and works by property name. You can: set default values ({name = 'Anonymous'} = obj), rename variables ({name: firstName} = obj), use rest patterns ({a, ...rest} = obj), nest destructuring ({address: {city}} = obj), and skip array elements ([, , third] = arr). Destructuring is used everywhere in modern JS: function parameters, import statements, React hooks (useState), API responses, and more.",
      realLifeAnalogy:
        "Destructuring is like opening a gift box and taking out specific items. Instead of saying 'let me grab the box, then reach into it for the first item, then reach in again for the second item', you say 'give me the first and second items directly'. For objects, it's like a mail sorter — you name which letters (properties) you want, and they're pulled out and placed in labeled slots automatically.",
      keyPoints: [
        "Array: const [a, b] = [1, 2] — by position",
        "Object: const {name, age} = obj — by property name",
        "Default values: const {name = 'Anon'} = obj",
        "Rename: const {name: firstName} = obj",
        "Rest: const {a, ...rest} = obj — collect remaining",
        "Nested: const {address: {city}} = obj",
        "Skip elements: const [, , third] = arr",
        "In function params: function({name, age}) { ... }",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Destructuring =====

// ── Array Destructuring ─────────────────────────
const colors = ["red", "green", "blue", "yellow"];

const [first, second] = colors;
console.log("First:", first);   // "red"
console.log("Second:", second); // "green"

// Skip elements
const [, , third] = colors;
console.log("Third:", third);   // "blue"

// Rest pattern
const [primary, ...others] = colors;
console.log("Primary:", primary);  // "red"
console.log("Others:", others);    // ["green", "blue", "yellow"]

// Default values
const [a, b, c, d, e = "purple"] = colors;
console.log("Default:", e);  // "purple" (no 5th element)

// Swap variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log("\\nSwapped:", x, y);  // 2, 1

// ── Object Destructuring ────────────────────────
console.log("\\n--- Object Destructuring ---");
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  address: { city: "NYC", zip: "10001" },
};

const { name, age } = user;
console.log("Name:", name);  // "Alice"
console.log("Age:", age);    // 25

// Rename variables
const { name: userName, email: userEmail } = user;
console.log("Renamed:", userName, userEmail);

// Default values
const { role = "User", name: n } = user;
console.log("Default role:", role);  // "User"

// Nested destructuring
const { address: { city, zip } } = user;
console.log("City:", city);  // "NYC"

// Rest in objects
const { name: _, ...rest } = user;
console.log("Rest:", Object.keys(rest));

// ── Function Parameter Destructuring ────────────
console.log("\\n--- Function Params ---");
function greet({ name, age, role = "Guest" }) {
  console.log(\`Hello \${name}, age \${age}, role: \${role}\`);
}
greet(user);

// Array param destructuring
function sum([a, b, c = 0]) {
  return a + b + c;
}
console.log("Sum:", sum([10, 20]));

// ── Real-world: React-style hooks ───────────────
console.log("\\n--- Real World ---");
function useState(initial) {
  let state = initial;
  const setState = (newVal) => { state = newVal; };
  return [state, setState];
}
const [count, setCount] = useState(0);
console.log("Count:", count);

// ── Real-world: API response ────────────────────
const response = {
  data: { users: [{ id: 1, name: "Alice" }] },
  status: 200,
  headers: {},
};
const { data: { users: [firstUser] }, status } = response;
console.log("API User:", firstUser.name, "Status:", status);

// ── Real-world: import-like pattern ─────────────
const utils = { formatDate: () => "2024-01-01", parseJSON: (s) => JSON.parse(s) };
const { formatDate, parseJSON } = utils;
console.log("Date:", formatDate());
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between array and object destructuring?",
        difficulty: "Easy",
        hint: "Array destructuring extracts by POSITION: const [a, b] = [1, 2]. Object destructuring extracts by PROPERTY NAME: const {name, age} = obj. Array uses [], object uses {}. Array order matters; object order doesn't. Both support defaults, rest patterns, and nesting.",
      },
      {
        question: "How do you rename variables during object destructuring?",
        difficulty: "Medium",
        hint: "Use colon syntax: const { name: firstName, age: userAge } = user. Left side is the property name, right side is the new variable name. You can combine with defaults: const { name: firstName = 'Anonymous' } = user. Common when property names conflict with existing variables.",
      },
      {
        question: "Explain nested destructuring with default values in function parameters.",
        difficulty: "Hard",
        hint: "function render({ title, config: { theme = 'light', lang = 'en' } = {} } = {}) { ... }. The outer = {} means the whole argument defaults to empty object. config: { ... } = {} means config defaults to empty object. theme = 'light' is a nested default. This prevents TypeError when properties are missing at any level.",
      },
    ],
  },
  {
    id: "es6-default-parameters",
    title: "Default Parameters",
    slug: "es6-default-parameters",
    icon: "Settings",
    difficulty: "Beginner",
    description:
      "Master ES6 default parameters — set fallback values for function arguments that are undefined or not provided.",
    concept: {
      explanation:
        "Default parameters (ES6) let you set fallback values for function parameters. If an argument is undefined or not passed, the default is used. Syntax: function greet(name = 'World') { }. Key details: 1) Only undefined triggers the default — null, 0, '' do NOT. 2) Defaults are evaluated at CALL TIME, not definition time (unlike Python). 3) Earlier params can be used in later defaults: f(a, b = a * 2). 4) Default can be any expression: function calls, conditionals, etc. 5) Works with destructuring: function({name = 'Anon'} = {}). Before ES6, the pattern was: name = name || 'default' — but this fails on falsy values like 0, '', false.",
      realLifeAnalogy:
        "Default parameters are like a coffee order with preferences. If you say 'I want a coffee' (no arguments), you get your default: medium size, regular milk. If you say 'I want a large' (one argument), you get large with default milk. You only override the defaults you explicitly specify.",
      keyPoints: [
        "function f(x = defaultValue) — set fallback for undefined",
        "Only undefined triggers defaults — null, 0, '' do NOT",
        "Defaults evaluated at CALL TIME, not definition time",
        "Earlier params available in later defaults: f(a, b = a * 2)",
        "Works with destructuring: ({name = 'Anon'} = {})",
        "Can use expressions: f(x = Date.now())",
        "Replaces old pattern: x = x || default (which fails on falsy)",
        "arguments object not affected by defaults",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== ES6 Default Parameters =====

// ── Basic defaults ──────────────────────────────
function greet(name = "World") {
  console.log(\`Hello, \${name}!\`);
}

greet("Alice");    // "Hello, Alice!"
greet();           // "Hello, World!"
greet(undefined);  // "Hello, World!" — undefined triggers default

// ── null does NOT trigger default ───────────────
greet(null);       // "Hello, null!" — only undefined triggers
greet("");         // "Hello, !" — empty string is not undefined
greet(0);          // "Hello, 0!" — zero is not undefined

// ── Multiple defaults ───────────────────────────
console.log("\\n--- Multiple Defaults ---");
function createUser(name = "Anonymous", role = "User", active = true) {
  console.log(\`\${name} | \${role} | active: \${active}\`);
}
createUser("Alice", "Admin");        // Alice | Admin | active: true
createUser("Bob");                    // Bob | User | active: true
createUser();                         // Anonymous | User | active: true
createUser(undefined, "Mod", false);  // Anonymous | Mod | active: false

// ── Using earlier params in later defaults ──────
console.log("\\n--- Param References ---");
function multiply(a, b = a * 2) {
  return a * b;
}
console.log("multiply(3):", multiply(3));      // 3 * 6 = 18
console.log("multiply(3, 4):", multiply(3, 4)); // 3 * 4 = 12

// ── Expression defaults ─────────────────────────
console.log("\\n--- Expression Defaults ---");
function generateId(prefix = "id", num = Math.floor(Math.random() * 1000)) {
  return \`\${prefix}_\${num}\`;
}
console.log(generateId());
console.log(generateId("user"));
console.log(generateId("order", 42));

// ── Default with destructuring ──────────────────
console.log("\\n--- With Destructuring ---");
function configure({ theme = "light", lang = "en", debug = false } = {}) {
  console.log(\`Theme: \${theme}, Lang: \${lang}, Debug: \${debug}\`);
}
configure({ theme: "dark" });    // dark, en, false
configure({});                    // light, en, false
configure();                      // light, en, false (outer = {} prevents error)

// ── Old pattern vs new ──────────────────────────
console.log("\\n--- Old vs New ---");
// OLD (broken for falsy values)
function oldWay(count) {
  count = count || 10;  // Bug: 0 becomes 10!
  console.log("Old count:", count);
}
oldWay(0);   // 10 — WRONG!
oldWay(5);   // 5

// NEW (correct)
function newWay(count = 10) {
  console.log("New count:", count);
}
newWay(0);   // 0 — Correct!
newWay(5);   // 5

// ── Real-world: API wrapper ─────────────────────
console.log("\\n--- Real World ---");
function fetchData(
  url,
  method = "GET",
  headers = { "Content-Type": "application/json" },
  timeout = 5000
) {
  console.log(\`\${method} \${url} (timeout: \${timeout}ms)\`);
  console.log("Headers:", JSON.stringify(headers));
}
fetchData("/api/users");
fetchData("/api/users", "POST");
`,
    },
    interviewQuestions: [
      {
        question: "How do ES6 default parameters differ from the old || pattern?",
        difficulty: "Easy",
        hint: "Old: x = x || default — triggers on ALL falsy values (0, '', false, null, undefined). New: function(x = default) — triggers ONLY on undefined. This means 0, '', false, and null are preserved as valid arguments with ES6 defaults but get overwritten with the || pattern.",
      },
      {
        question: "When are default parameter expressions evaluated?",
        difficulty: "Medium",
        hint: "Default parameters are evaluated at CALL TIME, each time the function is called. This is different from Python where defaults are evaluated once at definition time. This means function(arr = []) creates a new array each call (safe!), and function(time = Date.now()) gets a fresh timestamp each call.",
      },
      {
        question: "How do default parameters interact with the arguments object?",
        difficulty: "Hard",
        hint: "In sloppy mode, arguments mirrors parameter changes. But with default parameters, the function uses strict mode behavior: arguments reflects what was actually passed, NOT the default values. So function(a = 1) { return arguments[0]; } called with no args returns undefined (not 1). The arguments object and default parameters are effectively disconnected.",
      },
    ],
  },
  {
    id: "modules-import-export",
    title: "Modules (import/export)",
    slug: "modules-import-export",
    icon: "FileCode",
    difficulty: "Intermediate",
    description:
      "Understand JavaScript modules — import and export syntax for organizing code into reusable, maintainable pieces.",
    concept: {
      explanation:
        "ES6 modules let you split code into separate files, each with its own scope. Use 'export' to make things available and 'import' to use them. Named exports: export { foo, bar } or export const foo = ... — you import specific items by name. Default export: export default MyClass — one per file, import with any name. Key points: 1) Modules are automatically in strict mode. 2) Imports are hoisted. 3) Imports are live bindings (read-only references). 4) Modules are singletons — imported once, cached. 5) Dynamic import(): import('./module.js') returns a Promise for code-splitting. All modern frameworks (React, Vue, Angular) use ES modules as the standard way to organize code.",
      realLifeAnalogy:
        "Modules are like a warehouse with labeled shipping docks. Each dock (export) has a specific product available. To get something, you send an order form (import) listing exactly what you need from which warehouse. Default export is like the warehouse's flagship product — you can rename it however you like. Named exports are specific items you order by their exact catalog name.",
      keyPoints: [
        "Named export: export const foo = ... or export { foo, bar }",
        "Default export: export default MyClass (one per file)",
        "Named import: import { foo, bar } from './module'",
        "Default import: import MyClass from './module'",
        "Rename: import { foo as myFoo } from './module'",
        "Import all: import * as utils from './module'",
        "Dynamic import: const mod = await import('./module') — code splitting",
        "Modules are strict mode, singleton, and have own scope",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Modules (import/export) =====
// Note: Module syntax requires a bundler or <script type="module">
// These examples show the patterns — run mentally or in a module context

// ── Named Exports (math.js) ────────────────────
// export const PI = 3.14159;
// export function add(a, b) { return a + b; }
// export function multiply(a, b) { return a * b; }
console.log("--- Named Exports ---");
console.log("export const PI = 3.14159;");
console.log("export function add(a, b) { return a + b; }");

// ── Named Imports (app.js) ──────────────────────
// import { PI, add, multiply } from './math.js';
console.log("import { PI, add } from './math.js';");
console.log("PI:", 3.14159);
console.log("add(2, 3):", 5);

// ── Rename on import ────────────────────────────
// import { add as sum } from './math.js';
console.log("\\nimport { add as sum } from './math.js';");
console.log("sum(2, 3):", 5);

// ── Import all ──────────────────────────────────
// import * as math from './math.js';
// math.add(2, 3);  math.PI;
console.log("\\nimport * as math from './math.js';");
console.log("math.PI:", 3.14159);

// ── Default Export (User.js) ────────────────────
console.log("\\n--- Default Export ---");
// export default class User {
//   constructor(name) { this.name = name; }
// }
console.log("export default class User { ... }");

// import User from './User.js';          // any name works
// import MyUser from './User.js';        // renamed freely
console.log("import User from './User.js';");
console.log("import MyUser from './User.js'; // any name!");

// ── Mixed exports ───────────────────────────────
console.log("\\n--- Mixed Exports ---");
// export default function main() { ... }
// export const VERSION = '1.0';
// export function helper() { ... }
console.log("export default function main() {}");
console.log("export const VERSION = '1.0';");

// import main, { VERSION, helper } from './module';
console.log("import main, { VERSION, helper } from './module';");

// ── Re-exports ──────────────────────────────────
console.log("\\n--- Re-exports (barrel files) ---");
// // index.js — barrel file
// export { default as User } from './User.js';
// export { add, multiply } from './math.js';
// export * from './utils.js';
console.log("export { default as User } from './User.js';");
console.log("export * from './utils.js';");

// ── Dynamic import (code splitting) ─────────────
console.log("\\n--- Dynamic Import ---");
// async function loadModule() {
//   const { add } = await import('./math.js');
//   console.log(add(2, 3));
// }
console.log("const { add } = await import('./math.js');");
console.log("// Returns a Promise — great for lazy loading");

// ── CommonJS vs ES Modules ──────────────────────
console.log("\\n--- CommonJS vs ESM ---");
console.log("CommonJS: const x = require('./x'); module.exports = x;");
console.log("ESM:      import x from './x'; export default x;");
console.log("CommonJS: synchronous, Node.js default");
console.log("ESM:      async, tree-shakeable, modern standard");

// ── Real-world: React component pattern ─────────
console.log("\\n--- React Pattern ---");
console.log("// Button.tsx");
console.log("export function Button({ children }) { return <button>{children}</button>; }");
console.log("// App.tsx");
console.log("import { Button } from './Button';");
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between named exports and default exports?",
        difficulty: "Easy",
        hint: "Named exports: multiple per file, imported by exact name in curly braces { }. Default export: one per file, imported with any name, no curly braces. Named: export const foo; import { foo }. Default: export default foo; import anyName. You can have both in one file.",
      },
      {
        question: "What are the benefits of ES modules over CommonJS?",
        difficulty: "Medium",
        hint: "ES modules: static analysis enables tree-shaking (dead code elimination), async loading, strict mode by default, live bindings (always up-to-date), and standard across browsers and Node.js. CommonJS: synchronous require(), no tree-shaking, dynamic (can require inside if-blocks), Node.js native. ESM is the modern standard.",
      },
      {
        question: "How does dynamic import() work and when should you use it?",
        difficulty: "Hard",
        hint: "import('./module.js') returns a Promise<Module>. Use it for: 1) Code splitting — load heavy modules only when needed. 2) Conditional imports — load polyfills only if needed. 3) Lazy loading routes in SPAs. The module is fetched, compiled, and returned asynchronously. Bundlers (Webpack, Vite) split dynamic imports into separate chunks. Pattern: const { default: Component } = await import('./HeavyComponent');",
      },
    ],
  },
  {
    id: "optional-chaining",
    title: "Optional Chaining",
    slug: "optional-chaining",
    icon: "HelpCircle",
    difficulty: "Beginner",
    description:
      "Learn optional chaining (?.) — safely access deeply nested properties without worrying about null or undefined errors.",
    concept: {
      explanation:
        "Optional chaining (?.) lets you safely access nested properties, methods, and array elements without checking each level for null/undefined. If any part of the chain is null or undefined, the entire expression short-circuits and returns undefined (instead of throwing a TypeError). Syntax: obj?.property, obj?.[expr], obj?.method(), arr?.[index]. Before optional chaining, you needed verbose checks: user && user.address && user.address.city. Now: user?.address?.city. It works with: property access (?.prop), bracket notation (?.[key]), method calls (?.method()), and array indexing (?.[0]). Combined with nullish coalescing (??), it's incredibly powerful: user?.address?.city ?? 'Unknown'.",
      realLifeAnalogy:
        "Optional chaining is like asking for directions in a chain: 'Is there a building? If yes, is there a floor 3? If yes, is there room 5?' Without ?., if any answer is 'no', you'd crash. With ?., if any answer is 'no', you simply get 'unknown' and move on safely. You're checking each door before trying to walk through it.",
      keyPoints: [
        "obj?.prop — returns undefined if obj is null/undefined",
        "obj?.[expr] — bracket notation with optional chaining",
        "obj?.method() — call method only if it exists",
        "arr?.[index] — safe array access",
        "Short-circuits: a?.b?.c — if a is null, returns undefined immediately",
        "Returns undefined, not null, when short-circuiting",
        "Combine with ??: user?.name ?? 'Anonymous'",
        "Replaces: user && user.address && user.address.city",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Optional Chaining (?.) =====

// ── The Problem ─────────────────────────────────
const user = {
  name: "Alice",
  address: {
    city: "NYC",
    zip: "10001",
  },
  getFullName() {
    return "Alice Smith";
  },
};

const guest = { name: "Guest" };  // no address!

// Old way: verbose null checks
const cityOld = guest && guest.address && guest.address.city;
console.log("Old way:", cityOld);  // undefined (safe but ugly)

// New way: optional chaining
const cityNew = guest?.address?.city;
console.log("New way:", cityNew);  // undefined (clean!)

// Without ?., this would throw:
// guest.address.city → TypeError: Cannot read properties of undefined

// ── Property access ─────────────────────────────
console.log("\\n--- Property Access ---");
console.log("User city:", user?.address?.city);      // "NYC"
console.log("Guest city:", guest?.address?.city);     // undefined
console.log("Deep:", user?.address?.country?.code);   // undefined

// ── Method calls ────────────────────────────────
console.log("\\n--- Method Calls ---");
console.log("User method:", user?.getFullName?.());   // "Alice Smith"
console.log("Guest method:", guest?.getFullName?.()); // undefined

// ── Bracket notation ────────────────────────────
console.log("\\n--- Bracket Notation ---");
const key = "city";
console.log("Dynamic:", user?.address?.[key]);  // "NYC"

// Array indexing
const data = { items: ["a", "b", "c"] };
const empty = {};
console.log("Array:", data?.items?.[1]);   // "b"
console.log("Empty:", empty?.items?.[1]);  // undefined

// ── With nullish coalescing ─────────────────────
console.log("\\n--- With ?? ---");
const city = guest?.address?.city ?? "Unknown City";
console.log("City:", city);  // "Unknown City"

const theme = user?.settings?.theme ?? "light";
console.log("Theme:", theme);  // "light" (default)

// ── Real-world: API response handling ───────────
console.log("\\n--- API Response ---");
const response = {
  data: {
    user: { name: "Alice", posts: [{ title: "Hello" }] },
  },
};
const errorResponse = { data: null };

console.log("Post:", response?.data?.user?.posts?.[0]?.title);  // "Hello"
console.log("Error:", errorResponse?.data?.user?.posts?.[0]?.title);  // undefined

// ── Real-world: Config access ───────────────────
function getConfig(config) {
  return {
    theme: config?.ui?.theme ?? "light",
    lang: config?.i18n?.locale ?? "en",
    debug: config?.dev?.debug ?? false,
  };
}
console.log("\\nFull config:", getConfig({ ui: { theme: "dark" } }));
console.log("Empty config:", getConfig({}));
console.log("No config:", getConfig(undefined));

// ── Chaining with function calls ────────────────
console.log("\\n--- Function Chains ---");
const map = new Map();
map.set("users", [{ name: "Alice" }]);
console.log("Map:", map.get("users")?.[0]?.name);      // "Alice"
console.log("Missing:", map.get("admins")?.[0]?.name);  // undefined
`,
    },
    interviewQuestions: [
      {
        question: "What is optional chaining and what problem does it solve?",
        difficulty: "Easy",
        hint: "Optional chaining (?.) safely accesses nested properties. If any part is null/undefined, it returns undefined instead of throwing TypeError. Solves the problem of deeply nested access: user?.address?.city replaces user && user.address && user.address.city. Works with properties, methods (?.()), and brackets (?.[]).",
      },
      {
        question: "What is the difference between optional chaining (?.) and the logical AND (&&) pattern?",
        difficulty: "Medium",
        hint: "?. short-circuits on null/undefined only, returning undefined. && short-circuits on any falsy value (0, '', false, null, undefined). So user?.name works correctly when name is '' or 0. But user && user.name would short-circuit on name = '' (falsy). Optional chaining is more precise and readable.",
      },
      {
        question: "How do optional chaining and nullish coalescing work together?",
        difficulty: "Medium",
        hint: "?. safely navigates, ?? provides defaults. Pattern: obj?.deeply?.nested?.value ?? 'default'. If any step is null/undefined, ?. returns undefined, then ?? catches it and returns 'default'. This replaces: (obj && obj.deeply && obj.deeply.nested && obj.deeply.nested.value) || 'default' — which also replaces falsy values like 0 or ''.",
      },
    ],
  },
  {
    id: "nullish-coalescing",
    title: "Nullish Coalescing",
    slug: "nullish-coalescing",
    icon: "ToggleLeft",
    difficulty: "Beginner",
    description:
      "Learn the nullish coalescing operator (??) — provide default values only for null and undefined, not other falsy values.",
    concept: {
      explanation:
        "The nullish coalescing operator (??) returns the right operand when the left is null or undefined, and the left operand otherwise. Unlike || (logical OR) which triggers on ANY falsy value (0, '', false, null, undefined), ?? only triggers on null and undefined. This makes it perfect for default values where 0, '', or false are valid. Example: count ?? 10 returns 0 if count is 0, but 10 if count is null/undefined. The || equivalent (count || 10) incorrectly returns 10 when count is 0. The nullish coalescing assignment (??=) only assigns if the variable is null/undefined. You cannot mix ?? with && or || without parentheses — it's a syntax error to prevent confusion.",
      realLifeAnalogy:
        "Nullish coalescing is like a backup plan that only kicks in when something is truly MISSING (null/undefined), not just empty or zero. If you ask 'what's the temperature?' and get 0, that's a valid answer (??). But if the sensor is broken and returns nothing (null), use the backup value. The || operator would treat 0 as 'no answer' and use the backup — which is wrong for temperature!",
      keyPoints: [
        "a ?? b — returns b only if a is null or undefined",
        "Unlike ||, which returns b for ANY falsy a (0, '', false)",
        "0 ?? 'default' → 0 (preserves zero)",
        "'' ?? 'default' → '' (preserves empty string)",
        "false ?? 'default' → false (preserves false)",
        "null ?? 'default' → 'default'",
        "undefined ?? 'default' → 'default'",
        "Cannot mix with && or || without parentheses",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Nullish Coalescing (??) =====

// ── The Problem with || ─────────────────────────
console.log("--- || vs ?? ---");

// || treats ALL falsy values as "missing"
console.log("0 || 10:", 0 || 10);           // 10 — WRONG! 0 is valid
console.log("'' || 'hello':", "" || "hello"); // "hello" — WRONG! '' is valid
console.log("false || true:", false || true);  // true — WRONG! false is valid

// ?? only triggers on null/undefined
console.log("\\n0 ?? 10:", 0 ?? 10);           // 0 — correct!
console.log("'' ?? 'hello':", "" ?? "hello"); // "" — correct!
console.log("false ?? true:", false ?? true);  // false — correct!

// ── null and undefined ──────────────────────────
console.log("\\n--- null/undefined ---");
console.log("null ?? 'default':", null ?? "default");       // "default"
console.log("undefined ?? 'default':", undefined ?? "default"); // "default"

let value;  // undefined
console.log("unset ?? 'fallback':", value ?? "fallback");  // "fallback"

// ── Real-world: configuration ───────────────────
console.log("\\n--- Configuration ---");
function createConfig(options = {}) {
  return {
    port: options.port ?? 3000,
    host: options.host ?? "localhost",
    debug: options.debug ?? false,
    timeout: options.timeout ?? 5000,
    retries: options.retries ?? 3,
  };
}

// Port 0 is valid! || would break this
console.log("Default:", createConfig());
console.log("Custom:", createConfig({ port: 0, debug: true, retries: 0 }));

// ── With optional chaining ──────────────────────
console.log("\\n--- With ?. ---");
const user = {
  name: "Alice",
  settings: { theme: "dark", fontSize: 0 },
};
const guest = {};

// Safe access + default
const theme = user?.settings?.theme ?? "light";
const fontSize = user?.settings?.fontSize ?? 16;
console.log("Theme:", theme);     // "dark"
console.log("FontSize:", fontSize); // 0 (not 16!)

const guestTheme = guest?.settings?.theme ?? "light";
console.log("Guest theme:", guestTheme); // "light"

// ── Nullish assignment (??=) ────────────────────
console.log("\\n--- ??= Assignment ---");
let a = null;
let b = 0;
let c = "hello";

a ??= "default";  // a was null → assigned
b ??= 99;         // b was 0 → NOT assigned (0 is not nullish)
c ??= "world";    // c was "hello" → NOT assigned

console.log("a:", a);  // "default"
console.log("b:", b);  // 0
console.log("c:", c);  // "hello"

// ── Cannot mix with && or || ────────────────────
console.log("\\n--- Mixing Rules ---");
// This is a SyntaxError:
// const x = a || b ?? c;  // Error!
// Must use parentheses:
const x = (null || undefined) ?? "fallback";
console.log("With parens:", x);

// ── Comparison table ────────────────────────────
console.log("\\n--- Comparison ---");
const values = [0, "", false, null, undefined, NaN, "hello"];
values.forEach(val => {
  const orResult = val || "default";
  const qqResult = val ?? "default";
  if (orResult !== qqResult) {
    console.log(\`\${String(val).padEnd(10)} || → \${orResult}, ?? → \${qqResult}\`);
  }
});

// ── Real-world: API response defaults ───────────
console.log("\\n--- API Defaults ---");
function processResponse(response) {
  const page = response?.meta?.page ?? 1;
  const perPage = response?.meta?.perPage ?? 20;
  const total = response?.meta?.total ?? 0;
  console.log(\`Page \${page}, showing \${perPage}, total: \${total}\`);
}
processResponse({ meta: { page: 0, total: 100 } });  // page 0 preserved!
processResponse({});  // defaults used
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between ?? and ||?",
        difficulty: "Easy",
        hint: "|| returns the right side for ANY falsy value: 0, '', false, null, undefined, NaN. ?? returns the right side ONLY for null and undefined. So 0 ?? 10 gives 0 (correct for counts), but 0 || 10 gives 10 (incorrect). Use ?? when 0, '', or false are valid values.",
      },
      {
        question: "Why can't you mix ?? with && or || without parentheses?",
        difficulty: "Medium",
        hint: "It's a syntax error by design to prevent ambiguity. Does 'a || b ?? c' mean '(a || b) ?? c' or 'a || (b ?? c)'? These give different results. The spec requires explicit parentheses so the intent is clear. This prevents subtle bugs from operator precedence confusion.",
      },
      {
        question: "What is the nullish assignment operator (??=) and when is it useful?",
        difficulty: "Medium",
        hint: "a ??= b assigns b to a only if a is null or undefined. It's shorthand for: a = a ?? b (or: if (a == null) a = b). Useful for: initializing missing config values, setting defaults on objects, lazy initialization. Unlike ||= which assigns on any falsy value, ??= preserves 0, '', and false.",
      },
    ],
  },
  {
    id: "spread-and-rest",
    title: "Spread and Rest Operators",
    slug: "spread-and-rest",
    icon: "MoreHorizontal",
    difficulty: "Intermediate",
    description:
      "Master the spread (...) and rest (...) operators — expanding iterables and collecting arguments into arrays and objects.",
    concept: {
      explanation:
        "The ... syntax serves two purposes: SPREAD (expands) and REST (collects). Spread operator: expands an iterable (array, object, string) into individual elements. Used in: function calls f(...args), array literals [...arr1, ...arr2], object literals {...obj1, ...obj2}. Rest operator: collects remaining elements into an array or object. Used in: function parameters function(a, ...rest), array destructuring [first, ...rest], object destructuring {a, ...rest}. Key: spread = unpack/expand, rest = pack/collect. Spread creates SHALLOW copies. Object spread merges properties (last wins). Rest must be the last element. These are used constantly in modern JS: React state updates, Redux reducers, function utilities, and more.",
      realLifeAnalogy:
        "Spread is like unpacking a suitcase — you take all items out and lay them individually. Rest is like packing a suitcase — you grab all remaining items and put them into one container. Spread: 'here are all my items: shirt, pants, socks'. Rest: 'take the first item, and put everything else in this bag'.",
      keyPoints: [
        "Spread in arrays: [...arr1, ...arr2] — merge/copy arrays",
        "Spread in objects: {...obj1, ...obj2} — merge/copy objects (last wins)",
        "Spread in function calls: Math.max(...numbers)",
        "Rest in params: function(first, ...rest) — collect remaining args",
        "Rest in destructuring: const [a, ...rest] = arr",
        "Rest must be LAST: (...rest, last) is invalid",
        "Spread creates SHALLOW copies (not deep)",
        "Common in React: setState({...state, key: value})",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Spread and Rest Operators =====

// ── SPREAD: Array spreading ─────────────────────
console.log("--- Spread (Arrays) ---");
const nums = [1, 2, 3];
const more = [4, 5, 6];

// Copy array
const copy = [...nums];
console.log("Copy:", copy);

// Merge arrays
const merged = [...nums, ...more];
console.log("Merged:", merged);

// Add elements
const withExtra = [0, ...nums, 4];
console.log("With extra:", withExtra);

// ── SPREAD: Object spreading ────────────────────
console.log("\\n--- Spread (Objects) ---");
const user = { name: "Alice", age: 25 };
const settings = { theme: "dark", lang: "en" };

// Copy object
const userCopy = { ...user };
console.log("Copy:", userCopy);

// Merge objects (last wins for duplicates)
const full = { ...user, ...settings };
console.log("Merged:", full);

// Override properties
const updated = { ...user, age: 26, role: "Admin" };
console.log("Updated:", updated);

// ── SPREAD: Function calls ──────────────────────
console.log("\\n--- Spread (Calls) ---");
const numbers = [5, 1, 8, 3, 9, 2];
console.log("Max:", Math.max(...numbers));  // 9
console.log("Min:", Math.min(...numbers));  // 1

// String spread
const chars = [..."Hello"];
console.log("Chars:", chars);

// ── REST: Function parameters ───────────────────
console.log("\\n--- Rest (Params) ---");
function sum(first, ...rest) {
  console.log("First:", first);
  console.log("Rest:", rest);
  return first + rest.reduce((a, b) => a + b, 0);
}
console.log("Sum:", sum(1, 2, 3, 4));

// Rest collects into a real array (not arguments-like)
function logArgs(...args) {
  console.log("Is array:", Array.isArray(args));  // true
  console.log("Args:", args);
}
logArgs("a", "b", "c");

// ── REST: Destructuring ─────────────────────────
console.log("\\n--- Rest (Destructuring) ---");
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log("Head:", head);  // 1
console.log("Tail:", tail);  // [2, 3, 4, 5]

const { name, ...rest } = { name: "Alice", age: 25, role: "Dev" };
console.log("Name:", name);
console.log("Rest:", rest);  // { age: 25, role: "Dev" }

// ── Real-world: React state update ──────────────
console.log("\\n--- React Pattern ---");
const state = { count: 0, items: ["a"], loading: false };
const newState = { ...state, count: state.count + 1, loading: true };
console.log("Old:", state);
console.log("New:", newState);

// ── Real-world: Remove property immutably ───────
console.log("\\n--- Remove Property ---");
const { age: _, ...withoutAge } = user;
console.log("Without age:", withoutAge);  // { name: "Alice" }

// ── Real-world: Function wrapper ────────────────
function withLogging(fn) {
  return function(...args) {
    console.log("\\nCalling with:", args);
    const result = fn(...args);
    console.log("Result:", result);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(3, 4);

// ── Shallow copy warning ────────────────────────
console.log("\\n--- Shallow Copy ---");
const original = { a: 1, nested: { b: 2 } };
const shallow = { ...original };
shallow.nested.b = 99;
console.log("Original.nested.b:", original.nested.b);  // 99! Same reference!
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between spread and rest operators?",
        difficulty: "Easy",
        hint: "Both use ... syntax but serve opposite purposes. Spread EXPANDS: [...arr] unpacks elements, {...obj} unpacks properties, f(...args) expands into arguments. Rest COLLECTS: function(...args) collects arguments into array, [a, ...rest] collects remaining elements, {a, ...rest} collects remaining properties. Spread = unpack, Rest = pack.",
      },
      {
        question: "Why does spread create a shallow copy and what are the implications?",
        difficulty: "Medium",
        hint: "Spread copies one level deep. Primitive values are copied by value. Nested objects/arrays are copied by reference (same pointer). So {...obj} where obj has nested objects — modifying the nested object affects both copies. For deep copy use structuredClone(obj) or JSON.parse(JSON.stringify(obj)). This is a common React state management bug.",
      },
      {
        question: "How do you use spread to immutably update nested state?",
        difficulty: "Hard",
        hint: "Spread at each nesting level: setState({...state, user: {...state.user, address: {...state.user.address, city: 'NYC'}}}). Each level creates a new object reference while preserving unchanged data. This is why Redux/React immutable updates are verbose. Libraries like Immer solve this with produce(state, draft => { draft.user.address.city = 'NYC'; }).",
      },
    ],
  },
  {
    id: "short-circuiting",
    title: "Short Circuiting",
    slug: "short-circuiting",
    icon: "SkipForward",
    difficulty: "Beginner",
    description:
      "Understand short-circuit evaluation with &&, ||, and ?? — powerful patterns for conditional logic and default values.",
    concept: {
      explanation:
        "Short-circuit evaluation means logical operators stop evaluating as soon as the result is determined. || (OR): returns the FIRST truthy value, or the last value if all are falsy. && (AND): returns the FIRST falsy value, or the last value if all are truthy. ?? (nullish coalescing): returns the FIRST non-nullish value. These operators return the actual VALUE, not true/false. This enables powerful patterns: default values (name || 'Anonymous'), conditional execution (isAdmin && deleteUser()), guard clauses (data && data.length), and React conditional rendering ({isLoggedIn && <Profile />}). Understanding short-circuiting is essential for writing concise, idiomatic JavaScript.",
      realLifeAnalogy:
        "Short-circuiting is like checking multiple conditions at a security checkpoint. OR (||): 'Do you have a badge OR a ticket OR an invitation?' — the guard stops checking as soon as you show one valid item. AND (&&): 'Do you have a badge AND a ticket AND an invitation?' — the guard stops at the first missing item. No need to check everything if the answer is already clear.",
      keyPoints: [
        "|| returns first truthy value: 0 || '' || 'hello' → 'hello'",
        "&& returns first falsy value: 1 && 0 && 'hello' → 0",
        "?? returns first non-nullish: null ?? undefined ?? 'hi' → 'hi'",
        "They return VALUES, not booleans",
        "|| for defaults: name || 'Anonymous'",
        "&& for conditional execution: isAdmin && doAction()",
        "React pattern: {show && <Component />}",
        "Evaluation stops as soon as result is known",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Short Circuiting =====

// ── || (OR) — returns first truthy ──────────────
console.log("--- OR (||) ---");
console.log("'hello' || 'world':", "hello" || "world");  // "hello"
console.log("'' || 'fallback':", "" || "fallback");       // "fallback"
console.log("0 || 42:", 0 || 42);                         // 42
console.log("null || 'default':", null || "default");      // "default"
console.log("undefined || false || 'last':", undefined || false || "last"); // "last"

// Default values pattern
const username = "" || "Anonymous";
console.log("Username:", username);  // "Anonymous" (careful with empty string!)

// ── && (AND) — returns first falsy ──────────────
console.log("\\n--- AND (&&) ---");
console.log("'hello' && 'world':", "hello" && "world");  // "world"
console.log("'' && 'world':", "" && "world");             // ""
console.log("0 && 'hello':", 0 && "hello");               // 0
console.log("1 && 2 && 3:", 1 && 2 && 3);                 // 3 (all truthy → last)
console.log("1 && 0 && 3:", 1 && 0 && 3);                 // 0 (first falsy)

// Conditional execution pattern
const isAdmin = true;
isAdmin && console.log("\\nAdmin access granted!");

const isGuest = false;
isGuest && console.log("This won't run");

// ── ?? (Nullish) — returns first non-nullish ────
console.log("\\n--- Nullish (??) ---");
console.log("0 ?? 42:", 0 ?? 42);             // 0 (preserves 0!)
console.log("'' ?? 'hi':", "" ?? "hi");       // "" (preserves '')
console.log("null ?? 'default':", null ?? "default");       // "default"
console.log("undefined ?? 'default':", undefined ?? "default"); // "default"

// ── Comparison: || vs ?? ────────────────────────
console.log("\\n--- || vs ?? ---");
const count = 0;
console.log("count || 10:", count || 10);   // 10 (wrong!)
console.log("count ?? 10:", count ?? 10);   // 0 (correct!)

const title = "";
console.log("title || 'Untitled':", title || "Untitled"); // "Untitled"
console.log("title ?? 'Untitled':", title ?? "Untitled"); // ""

// ── Real-world patterns ─────────────────────────
console.log("\\n--- Patterns ---");

// Pattern 1: Safe property access + default
const user = { name: "Alice", settings: { theme: "dark" } };
const theme = user && user.settings && user.settings.theme || "light";
console.log("Theme:", theme);

// Modern: optional chaining + nullish coalescing
const themeModern = user?.settings?.theme ?? "light";
console.log("Modern:", themeModern);

// Pattern 2: Conditional function call
function notify(message) { console.log("Notification:", message); }
const shouldNotify = true;
shouldNotify && notify("Task complete!");

// Pattern 3: First available value
function getDisplayName(user) {
  return user.displayName || user.username || user.email || "Anonymous";
}
console.log("\\n" + getDisplayName({ email: "alice@test.com" }));

// Pattern 4: Guard clause
function processItems(items) {
  if (!items || !items.length) {
    console.log("No items to process");
    return;
  }
  console.log("Processing", items.length, "items");
}
processItems(null);
processItems([1, 2, 3]);

// ── Assignment operators ────────────────────────
console.log("\\n--- Assignment ---");
let a = null;
let b = 0;
let c = "";

a ||= "default";   // null is falsy → assigned
b ||= 99;          // 0 is falsy → assigned (maybe unwanted!)
c ??= "fallback";  // "" is NOT nullish → NOT assigned

console.log("a:", a);  // "default"
console.log("b:", b);  // 99
console.log("c:", c);  // ""

// ── React rendering pattern ─────────────────────
console.log("\\n--- React Pattern ---");
const isLoggedIn = true;
const items = ["A", "B", "C"];
// {isLoggedIn && <Profile />}
console.log("Show profile:", isLoggedIn && "✓ <Profile />");
// {items.length > 0 && <List items={items} />}
console.log("Show list:", items.length > 0 && "✓ <List />");
// {error && <Error message={error} />}
const error = null;
console.log("Show error:", error && "✓ <Error />");  // null (no render)
`,
    },
    interviewQuestions: [
      {
        question: "How does short-circuit evaluation work with && and ||?",
        difficulty: "Easy",
        hint: "|| returns the first truthy value (or the last value). It stops evaluating when it finds truthy. && returns the first falsy value (or the last value). It stops evaluating when it finds falsy. Both return the actual VALUE, not a boolean. Examples: 'hello' || 'world' → 'hello'. '' && 'world' → ''. 1 && 2 && 3 → 3.",
      },
      {
        question: "What is the difference between || and ?? for default values?",
        difficulty: "Medium",
        hint: "|| treats all falsy values as 'missing': 0, '', false, null, undefined, NaN. ?? only treats null and undefined as 'missing'. Use ?? when 0, '', or false are valid values. Example: form input count: count ?? 10 preserves 0, but count || 10 replaces 0 with 10.",
      },
      {
        question: "Why can {count && <Component />} be a bug in React?",
        difficulty: "Hard",
        hint: "If count is 0, the expression evaluates to 0 (the first falsy value). React renders 0 as text on screen, showing a literal '0' instead of nothing. Fix: use {count > 0 && <Component />} or {Boolean(count) && <Component />} or {count ? <Component /> : null}. The && pattern is safe when the left side is a boolean, but dangerous with numbers.",
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // Level 8 — Advanced JavaScript Concepts
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "execution-context",
    title: "Execution Context",
    slug: "execution-context",
    icon: "Cpu",
    difficulty: "Advanced",
    description:
      "Understand execution contexts — the environments where JavaScript code is evaluated and executed.",
    concept: {
      explanation:
        "An execution context is the environment in which JavaScript code is evaluated. Every time JS runs code, it creates an execution context. There are three types: 1) Global Execution Context (GEC) — created when the script first runs, creates the global object (window/global) and sets 'this' to it. Only ONE exists. 2) Function Execution Context (FEC) — created each time a function is called. Each call gets its own context. 3) Eval Execution Context — created inside eval() (rarely used). Each context has two phases: CREATION phase (sets up scope chain, creates variables/functions in memory via hoisting, determines 'this') and EXECUTION phase (assigns values, runs code line by line). Contexts are managed via the Call Stack — pushed when created, popped when done.",
      realLifeAnalogy:
        "An execution context is like a workspace setup. The Global context is like your main office — always there, has default supplies (global object). Every function call is like entering a meeting room — it has its own whiteboard (variables), its own agenda (code to run), and when the meeting ends, you leave the room (context is popped). The creation phase is setup (putting name tags and agendas), the execution phase is the actual meeting.",
      keyPoints: [
        "Three types: Global, Function, and Eval execution contexts",
        "Global EC: created first, sets up global object and 'this'",
        "Function EC: created on each function call, has own scope",
        "Creation phase: hoisting (var/function declarations), scope chain, 'this' binding",
        "Execution phase: assigns values, runs code line by line",
        "Each context has: Variable Environment, Lexical Environment, this binding",
        "Managed by the Call Stack (LIFO — last in, first out)",
        "Understanding this is key to understanding hoisting, scope, and closures",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Execution Context =====

// ── Global Execution Context ────────────────────
// When this script runs, a Global EC is created:
// 1. Creation phase: var a = undefined, function greet is hoisted
// 2. Execution phase: a = 10, code runs

var a = 10;
let b = 20;
const c = 30;

console.log("--- Global EC ---");
console.log("a:", a);  // 10
console.log("b:", b);  // 20
console.log("this === globalThis:", typeof window !== 'undefined' ? "browser" : "node");

// ── Function Execution Context ──────────────────
function greet(name) {
  // New Function EC created:
  // Creation: name = "Alice" (param), greeting = undefined
  // Execution: greeting = "Hello, Alice!"
  var greeting = "Hello, " + name + "!";
  console.log(greeting);
  return greeting;
}

console.log("\\n--- Function EC ---");
greet("Alice");  // Creates Function EC, executes, then pops off

// ── Nested Execution Contexts ───────────────────
console.log("\\n--- Nested ECs ---");
var x = "global";

function outer() {
  var x = "outer";
  console.log("outer x:", x);

  function inner() {
    var x = "inner";
    console.log("inner x:", x);
  }

  inner();  // New EC pushed
  // inner's EC popped here
  console.log("back in outer x:", x);
}

outer();  // New EC pushed
// outer's EC popped here
console.log("global x:", x);

// ── Creation Phase: Hoisting Demo ───────────────
console.log("\\n--- Creation Phase (Hoisting) ---");
console.log("hoisted var:", hoisted);  // undefined (created in creation phase)
// console.log(notHoisted);  // Would throw ReferenceError (let/const)

var hoisted = "I'm hoisted!";
console.log("after assignment:", hoisted);

// Functions are fully hoisted
console.log("\\nCalling before declaration:", sayHi());
function sayHi() { return "Hi!"; }

// ── Variable Environment vs Lexical Environment ─
console.log("\\n--- Environments ---");
function demo() {
  var funcScoped = "var";      // Variable Environment
  let blockScoped = "let";     // Lexical Environment
  const alsoBlock = "const";   // Lexical Environment

  if (true) {
    var innerVar = "var leaks!";  // Same Variable Environment
    let innerLet = "let stays";    // New Lexical Environment for block
    console.log("Inside block:", innerLet);
  }

  console.log("var leaks:", innerVar);  // Accessible!
  // console.log(innerLet);  // ReferenceError — block scoped
}
demo();

// ── Execution Context Lifecycle ─────────────────
console.log("\\n--- EC Lifecycle ---");
console.log("1. Global EC created");
console.log("2. Code runs top to bottom");

function first() {
  console.log("3. first() EC created & pushed");
  second();
  console.log("5. first() EC about to be popped");
}

function second() {
  console.log("4. second() EC created & pushed, then popped");
}

first();
console.log("6. Back in Global EC");
`,
    },
    interviewQuestions: [
      {
        question: "What is an execution context in JavaScript?",
        difficulty: "Medium",
        hint: "An execution context is the environment where JS code is evaluated. It has two phases: Creation (hoists declarations, sets up scope chain, binds 'this') and Execution (assigns values, runs code). Three types: Global (one, creates global object), Function (per function call), and Eval. Managed by the call stack.",
      },
      {
        question: "What happens during the creation phase of an execution context?",
        difficulty: "Hard",
        hint: "1) Creates the Variable Environment — var declarations set to undefined (hoisting). 2) Creates the Lexical Environment — let/const in TDZ. 3) Function declarations fully hoisted with their body. 4) Sets up the scope chain (outer environment reference). 5) Determines 'this' binding. This all happens BEFORE any code executes.",
      },
      {
        question: "What is the difference between Variable Environment and Lexical Environment?",
        difficulty: "Hard",
        hint: "Variable Environment stores var declarations and function declarations — function-scoped. Lexical Environment stores let and const — block-scoped. In ES6+, each block { } creates a new Lexical Environment but shares the Variable Environment with its parent function. This is why var leaks out of blocks but let/const don't.",
      },
    ],
  },
  {
    id: "call-stack",
    title: "Call Stack",
    slug: "call-stack",
    icon: "Layers",
    difficulty: "Advanced",
    description:
      "Understand the call stack — JavaScript's mechanism for tracking function execution and managing execution contexts.",
    concept: {
      explanation:
        "The call stack is a LIFO (Last In, First Out) data structure that tracks which function is currently executing. When a function is called, its execution context is PUSHED onto the stack. When it returns, it's POPPED off. JavaScript is single-threaded — it has ONE call stack, executing ONE thing at a time. The Global EC is always at the bottom. If the stack gets too deep (infinite recursion), you get a 'Maximum call stack size exceeded' error (stack overflow). The call stack works with the Event Loop: when the stack is empty, the event loop pushes callbacks from the task queue. Understanding the call stack is essential for debugging, understanding async behavior, and reading stack traces.",
      realLifeAnalogy:
        "The call stack is like a stack of plates in a cafeteria. You can only add (push) a plate on top, and you can only remove (pop) from the top. When function A calls function B, B's plate goes on top. B must finish (pop) before A can continue. If you keep stacking without removing (infinite recursion), the stack topples over (stack overflow). The bottom plate (Global EC) stays until the restaurant closes (program ends).",
      keyPoints: [
        "LIFO structure: Last In, First Out",
        "Function call → push EC; function return → pop EC",
        "JavaScript has ONE call stack (single-threaded)",
        "Global EC is always at the bottom of the stack",
        "Stack overflow: too many frames (infinite recursion)",
        "Stack traces show the call stack at the point of error",
        "Event Loop pushes callbacks only when stack is empty",
        "Blocking the stack = blocking the entire thread (UI freezes)",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Call Stack =====

// ── Basic call stack ────────────────────────────
console.log("--- Call Stack ---");

function third() {
  console.log("  third() running");  // Stack: [Global, first, second, third]
  // third returns → popped
}

function second() {
  console.log(" second() running");  // Stack: [Global, first, second]
  third();
  console.log(" second() done");     // Stack: [Global, first, second]
}

function first() {
  console.log("first() running");    // Stack: [Global, first]
  second();
  console.log("first() done");      // Stack: [Global, first]
}

// Stack starts: [Global]
first();
console.log("Back to Global");      // Stack: [Global]

// ── Stack trace visualization ───────────────────
console.log("\\n--- Stack at Each Point ---");
function a() {
  console.log("Stack: Global → a()");
  b();
}
function b() {
  console.log("Stack: Global → a() → b()");
  c();
}
function c() {
  console.log("Stack: Global → a() → b() → c()  ← TOP");
  // c returns, stack unwinds:
  // b resumes, then returns
  // a resumes, then returns
}
a();
console.log("Stack: Global  (unwound)");

// ── Stack Overflow ──────────────────────────────
console.log("\\n--- Stack Overflow ---");
function recurse(n) {
  if (n <= 0) return "done";
  return recurse(n - 1);
}

// Safe recursion
console.log("Safe:", recurse(5));

// Stack overflow (commented out — would crash)
// function infinite() { infinite(); }
// infinite(); // RangeError: Maximum call stack size exceeded
console.log("Infinite recursion → RangeError: Maximum call stack size exceeded");

// ── Call stack and errors ───────────────────────
console.log("\\n--- Error Stack Trace ---");
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero!");
  return a / b;
}

function calculate(x) {
  return divide(x, 0);
}

function process() {
  return calculate(10);
}

try {
  process();
} catch (e) {
  console.log("Error:", e.message);
  // Stack trace would show: divide → calculate → process → Global
  console.log("Stack trace: divide → calculate → process → Global");
}

// ── Call stack and async ────────────────────────
console.log("\\n--- Stack and Async ---");
console.log("1. Synchronous (stack)");

setTimeout(() => {
  console.log("3. Callback (pushed when stack was empty)");
}, 0);

console.log("2. Synchronous (stack)");
// Order: 1, 2, 3 — callback waits for empty stack

// ── Measuring stack depth ───────────────────────
console.log("\\n--- Stack Depth ---");
function measureStack(depth) {
  try {
    return measureStack(depth + 1);
  } catch (e) {
    return depth;
  }
}
const maxDepth = measureStack(0);
console.log("Max stack depth: ~" + maxDepth);
`,
    },
    interviewQuestions: [
      {
        question: "What is the call stack and how does it work?",
        difficulty: "Medium",
        hint: "The call stack is a LIFO data structure tracking function execution. When a function is called, its execution context is pushed on top. When it returns, it's popped off. JS has one call stack (single-threaded). Global context sits at the bottom. Stack overflow happens with infinite recursion. Stack traces in errors show the call stack at the point of failure.",
      },
      {
        question: "What causes a stack overflow and how do you prevent it?",
        difficulty: "Medium",
        hint: "Stack overflow occurs when the call stack exceeds its maximum size, usually from infinite/deep recursion without a base case. Prevention: 1) Always have a base case in recursive functions. 2) Use iteration instead of recursion for large datasets. 3) Use tail call optimization (limited support). 4) Use trampolining pattern to convert recursion to iteration.",
      },
      {
        question: "How does the call stack relate to the event loop?",
        difficulty: "Hard",
        hint: "The event loop checks: is the call stack empty? If yes, take the next callback from the task queue (macrotask) or microtask queue and push it onto the stack. setTimeout(fn, 0) doesn't run immediately — fn goes to the task queue and waits until the stack is empty. This is why synchronous code always runs before callbacks, even with 0ms delay.",
      },
    ],
  },
  {
    id: "hoisting",
    title: "Hoisting",
    slug: "hoisting",
    icon: "ArrowUpDown",
    difficulty: "Advanced",
    description:
      "Understand hoisting — how JavaScript moves declarations to the top of their scope during the creation phase.",
    concept: {
      explanation:
        "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during the creation phase of the execution context. But NOT all declarations are hoisted equally: var declarations are hoisted and initialized to undefined. Function declarations are fully hoisted (you can call them before they appear). let and const are hoisted BUT placed in a Temporal Dead Zone (TDZ) — accessing them before declaration throws a ReferenceError. Function expressions and arrow functions follow the rules of their variable keyword (var/let/const). Class declarations are hoisted but in TDZ (like let). Understanding hoisting explains why you can call functions before declaring them, why var gives undefined instead of ReferenceError, and why let/const have the TDZ.",
      realLifeAnalogy:
        "Hoisting is like a meeting preparation. Before the meeting starts (execution), the organizer (JS engine) scans the agenda (code) and writes all participant names on the whiteboard (declarations). var participants get a blank name tag (undefined). Function declarations get their full agenda printed. let/const participants are on the list but behind a velvet rope (TDZ) — you can't talk to them until they officially arrive (reach their declaration line).",
      keyPoints: [
        "var: hoisted and initialized to undefined",
        "let/const: hoisted but in Temporal Dead Zone (TDZ) until declaration",
        "Function declarations: fully hoisted (body and all)",
        "Function expressions: follow their variable's hoisting rules",
        "Arrow functions: same as function expressions",
        "Class declarations: hoisted but in TDZ (like let)",
        "TDZ: accessing let/const before declaration → ReferenceError",
        "Hoisting happens during the creation phase of execution context",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Hoisting =====

// ── var hoisting ────────────────────────────────
console.log("--- var Hoisting ---");
console.log("before:", x);  // undefined (hoisted, initialized to undefined)
var x = 10;
console.log("after:", x);   // 10

// What JS sees:
// var x = undefined;  ← creation phase
// console.log(x);     ← undefined
// x = 10;             ← execution phase

// ── let/const — Temporal Dead Zone ──────────────
console.log("\\n--- TDZ (let/const) ---");
// console.log(y);  // ReferenceError: Cannot access 'y' before initialization
let y = 20;
console.log("let y:", y);  // 20

// The TDZ exists from the start of the scope to the declaration
// let y is hoisted (JS knows about it) but NOT initialized

// ── Function declaration hoisting ───────────────
console.log("\\n--- Function Declaration ---");
console.log("Before:", sayHello());  // Works! Fully hoisted

function sayHello() {
  return "Hello!";
}

console.log("After:", sayHello());

// ── Function expression — NOT fully hoisted ─────
console.log("\\n--- Function Expression ---");
// console.log(sayBye());  // TypeError: sayBye is not a function
var sayBye = function() {
  return "Bye!";
};
console.log("After:", sayBye());

// With var: sayBye is hoisted as undefined (not a function)
// With let: sayBye would be in TDZ (ReferenceError)

// ── Arrow function hoisting ─────────────────────
console.log("\\n--- Arrow Function ---");
// Same as function expression — follows variable rules
// greet();  // TypeError (var) or ReferenceError (let)
var greet = () => "Hi there!";
console.log("Arrow:", greet());

// ── Class hoisting ──────────────────────────────
console.log("\\n--- Class Hoisting ---");
// const p = new Person("Alice");  // ReferenceError: TDZ
class Person {
  constructor(name) { this.name = name; }
}
const p = new Person("Alice");
console.log("Class:", p.name);

// ── Hoisting priority ───────────────────────────
console.log("\\n--- Priority ---");
// Function declarations are hoisted above var
console.log(typeof myFunc);  // "function" (not "undefined")
var myFunc = "string";
function myFunc() { return "function"; }
console.log(typeof myFunc);  // "string" (assignment overrides)

// ── Practical interview question ────────────────
console.log("\\n--- Interview: Predict Output ---");
var a = 1;
function outer() {
  console.log("a:", a);  // undefined (var a below is hoisted)
  var a = 2;
  console.log("a:", a);  // 2
}
outer();
console.log("global a:", a);  // 1 (different scope)

// ── TDZ in detail ───────────────────────────────
console.log("\\n--- TDZ Detail ---");
{
  // TDZ starts here for 'temp'
  // console.log(temp);  // ReferenceError
  const temp = "I'm available now!";
  console.log(temp);
  // TDZ ends at the declaration
}

// ── Summary ─────────────────────────────────────
console.log("\\n--- Summary ---");
console.log("var:      hoisted + initialized (undefined)");
console.log("let/const: hoisted + TDZ (ReferenceError)");
console.log("function: fully hoisted (callable before declaration)");
console.log("class:    hoisted + TDZ (like let)");
console.log("expression: follows its variable keyword's rules");
`,
    },
    interviewQuestions: [
      {
        question: "What is hoisting in JavaScript?",
        difficulty: "Easy",
        hint: "Hoisting is JS moving declarations to the top of their scope during the creation phase. var is hoisted and set to undefined. Function declarations are fully hoisted. let/const are hoisted but put in the Temporal Dead Zone (TDZ) — accessing them before declaration throws ReferenceError. It's not physical movement, but how the engine processes code.",
      },
      {
        question: "What is the Temporal Dead Zone (TDZ)?",
        difficulty: "Medium",
        hint: "The TDZ is the period between entering a scope and reaching the let/const declaration. During TDZ, the variable exists (is hoisted) but is uninitialized — accessing it throws ReferenceError: 'Cannot access before initialization'. The TDZ starts at the beginning of the block and ends at the declaration line. This prevents using variables before they're defined.",
      },
      {
        question: "What is the output of: var x = 1; function f() { console.log(x); var x = 2; } f();",
        difficulty: "Hard",
        hint: "Output: undefined. Inside f(), var x is hoisted to the top of the function scope and initialized to undefined. So when console.log(x) runs, it finds the LOCAL x (undefined) rather than the global x (1). The local var x shadows the global x. After the log, x is assigned 2. This is a classic hoisting interview question.",
      },
    ],
  },
  {
    id: "scope-and-lexical-scope",
    title: "Scope and Lexical Scope",
    slug: "scope-and-lexical-scope",
    icon: "Eye",
    difficulty: "Advanced",
    description:
      "Master scope and lexical scoping — how JavaScript determines where variables are accessible in your code.",
    concept: {
      explanation:
        "Scope determines where variables are accessible. JavaScript has three scope types: 1) Global scope — accessible everywhere. 2) Function scope — var is accessible only within its function. 3) Block scope — let/const are accessible only within their { } block. Lexical scope (static scope) means scope is determined by WHERE you write the code, not where you call it. A function can access variables from its own scope and all outer (parent) scopes — this chain of scopes is the Scope Chain. When JS looks up a variable, it checks: local scope → parent scope → ... → global scope. If not found anywhere: ReferenceError. Closures work because of lexical scoping — an inner function remembers its lexical environment even after the outer function returns.",
      realLifeAnalogy:
        "Scope is like office access levels. Global scope is the lobby — everyone has access. Function scope is a department floor — only employees of that department can enter. Block scope is a meeting room — only people in that specific meeting. Lexical scope means your access card is issued based on WHERE your desk is (where the code is written), not where you're currently visiting (where it's called).",
      keyPoints: [
        "Global scope: accessible everywhere in the program",
        "Function scope: var is scoped to its containing function",
        "Block scope: let/const are scoped to their { } block",
        "Lexical scope: scope determined by code position, not call position",
        "Scope chain: local → parent → ... → global",
        "Variable lookup walks UP the scope chain",
        "ReferenceError if variable not found in any scope",
        "Closures are a direct result of lexical scoping",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Scope and Lexical Scope =====

// ── Global Scope ────────────────────────────────
var globalVar = "I'm global";
let globalLet = "I'm also global";

console.log("--- Global Scope ---");
console.log(globalVar);
console.log(globalLet);

// ── Function Scope ──────────────────────────────
console.log("\\n--- Function Scope ---");
function myFunction() {
  var funcVar = "function scoped";
  let funcLet = "also function scoped";
  console.log("Inside:", funcVar, funcLet);
}
myFunction();
// console.log(funcVar);  // ReferenceError
// console.log(funcLet);  // ReferenceError

// ── Block Scope ─────────────────────────────────
console.log("\\n--- Block Scope ---");
if (true) {
  var blockVar = "var leaks out!";
  let blockLet = "let stays in block";
  const blockConst = "const stays too";
  console.log("Inside block:", blockLet, blockConst);
}
console.log("Outside block:", blockVar);  // Works! var ignores blocks
// console.log(blockLet);  // ReferenceError — block scoped

// ── Lexical Scope ───────────────────────────────
console.log("\\n--- Lexical Scope ---");
const outer = "outer variable";

function outerFn() {
  const middle = "middle variable";

  function innerFn() {
    const inner = "inner variable";
    // Can access ALL outer scopes (lexical)
    console.log(inner);   // own scope
    console.log(middle);  // parent scope
    console.log(outer);   // grandparent scope
  }

  innerFn();
  // console.log(inner);  // ReferenceError — can't go inward
}
outerFn();

// ── Scope Chain Lookup ──────────────────────────
console.log("\\n--- Scope Chain ---");
const name = "Global";

function level1() {
  // name not found here → check parent (Global) → found!
  console.log("level1 sees:", name);  // "Global"

  function level2() {
    const name = "Level2";
    console.log("level2 sees:", name);  // "Level2" (own scope)

    function level3() {
      // name not here → check level2 → found!
      console.log("level3 sees:", name);  // "Level2"
    }
    level3();
  }
  level2();
}
level1();

// ── Lexical vs Dynamic scope ────────────────────
console.log("\\n--- Lexical vs Dynamic ---");
const value = "global";

function showValue() {
  // Lexical scope: looks where showValue is DEFINED
  // NOT where it's CALLED
  console.log(value);
}

function wrapper() {
  const value = "wrapper";
  showValue();  // Still prints "global" — lexical scope!
}
wrapper();

// ── var vs let in loops ─────────────────────────
console.log("\\n--- Loop Scope ---");

// var — shared across iterations (function scoped)
var funcs = [];
for (var i = 0; i < 3; i++) {
  funcs.push(() => console.log("var i:", i));
}
funcs.forEach(f => f());  // 3, 3, 3 — all reference same i!

// let — new binding each iteration (block scoped)
var funcsLet = [];
for (let j = 0; j < 3; j++) {
  funcsLet.push(() => console.log("let j:", j));
}
funcsLet.forEach(f => f());  // 0, 1, 2 — each has own j!

// ── Shadowing ───────────────────────────────────
console.log("\\n--- Shadowing ---");
const x = 10;
function shadow() {
  const x = 20;  // Shadows outer x
  console.log("Inner x:", x);  // 20
  {
    const x = 30;  // Shadows again
    console.log("Block x:", x);  // 30
  }
  console.log("Back to:", x);  // 20
}
shadow();
console.log("Global x:", x);  // 10
`,
    },
    interviewQuestions: [
      {
        question: "What are the different types of scope in JavaScript?",
        difficulty: "Easy",
        hint: "Three types: 1) Global scope — accessible everywhere. 2) Function scope — var is scoped to the function. 3) Block scope — let/const are scoped to the { } block. var ignores blocks (leaks out of if/for). let/const respect blocks. Scope chain: JS looks up from local → parent → global.",
      },
      {
        question: "What is lexical scope and how does it differ from dynamic scope?",
        difficulty: "Medium",
        hint: "Lexical (static) scope: determined by WHERE the function is WRITTEN in the source code. Dynamic scope: determined by WHERE the function is CALLED. JavaScript uses lexical scope. So function f() that references variable x will look for x where f is defined, not where f is called. This is why closures work — they capture their lexical environment.",
      },
      {
        question: "Why does var in a for loop cause all closures to share the same value?",
        difficulty: "Hard",
        hint: "var is function-scoped, not block-scoped. In for(var i=0; i<3; i++), there's ONE i shared across all iterations. Closures capture a reference to i, not its value. By the time callbacks run, i is 3. Fix: use let (creates new binding per iteration), or use IIFE: (function(j){ ... })(i) to capture each value. This is the most classic JS closure interview question.",
      },
    ],
  },
  {
    id: "closures",
    title: "Closures",
    slug: "closures",
    icon: "Lock",
    difficulty: "Advanced",
    description:
      "Master closures — one of the most important and commonly asked JavaScript concepts in frontend interviews.",
    concept: {
      explanation:
        "A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned. When a function is created, it forms a closure over its lexical environment — it 'remembers' the variables that were in scope at the time of creation. This happens because: 1) Functions in JS are first-class (can be returned, passed around). 2) JS uses lexical scoping (scope determined by code position). 3) Inner functions maintain a reference to their outer scope. Closures enable: data privacy (module pattern), function factories, partial application/currying, maintaining state in callbacks, and React hooks (useState uses closures internally). They're one of the most tested concepts in frontend interviews.",
      realLifeAnalogy:
        "A closure is like a person who grew up in a specific city. Even after they move away (outer function returns), they still remember everything about their hometown (outer scope variables). They carry those memories wherever they go. If two people grew up in the same city (same outer function call), they share those memories. But people from different cities (different calls) have separate memories.",
      keyPoints: [
        "A closure = function + its lexical environment",
        "Inner function retains access to outer variables after outer returns",
        "Each function call creates a NEW closure with its own variables",
        "Closures enable data privacy (encapsulation)",
        "Used in: module pattern, factories, callbacks, React hooks",
        "Common pitfall: closures in loops with var (share same variable)",
        "Closures hold REFERENCES, not copies of values",
        "Garbage collection: closed-over variables persist as long as closure exists",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Closures =====

// ── Basic Closure ───────────────────────────────
console.log("--- Basic Closure ---");
function outer() {
  const message = "Hello from outer!";

  function inner() {
    console.log(message);  // Accesses outer's variable
  }

  return inner;  // Return the function
}

const myFunc = outer();  // outer() returns inner
myFunc();  // "Hello from outer!" — still has access!
// outer() has returned, but inner still remembers 'message'

// ── Counter with closure ────────────────────────
console.log("\\n--- Counter ---");
function createCounter() {
  let count = 0;  // Private variable

  return {
    increment() { return ++count; },
    decrement() { return --count; },
    getCount() { return count; },
  };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.decrement());  // 1
console.log(counter.getCount());   // 1
// count is private — can't access directly!
// console.log(counter.count);  // undefined

// ── Each call creates a NEW closure ─────────────
console.log("\\n--- Separate Closures ---");
const counter1 = createCounter();
const counter2 = createCounter();
counter1.increment();
counter1.increment();
counter2.increment();
console.log("Counter1:", counter1.getCount());  // 2
console.log("Counter2:", counter2.getCount());  // 1 (independent!)

// ── Function Factory ────────────────────────────
console.log("\\n--- Function Factory ---");
function multiply(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiply(2);
const triple = multiply(3);
console.log("double(5):", double(5));  // 10
console.log("triple(5):", triple(5));  // 15

// ── Data Privacy (Module Pattern) ───────────────
console.log("\\n--- Module Pattern ---");
const bankAccount = (function() {
  let balance = 0;  // Private!

  return {
    deposit(amount) {
      balance += amount;
      console.log(\`Deposited \${amount}. Balance: \${balance}\`);
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log("Insufficient funds!");
        return;
      }
      balance -= amount;
      console.log(\`Withdrew \${amount}. Balance: \${balance}\`);
    },
    getBalance() { return balance; },
  };
})();

bankAccount.deposit(100);
bankAccount.withdraw(30);
console.log("Balance:", bankAccount.getBalance());
// bankAccount.balance → undefined (private!)

// ── Closure in loops (classic pitfall) ──────────
console.log("\\n--- Loop Pitfall ---");
// WRONG: var shares one variable
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 10);
}
// Prints: 3, 3, 3

// FIX 1: Use let (new binding per iteration)
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 20);
}
// Prints: 0, 1, 2

// FIX 2: IIFE creates new scope
for (var k = 0; k < 3; k++) {
  (function(k) {
    setTimeout(() => console.log("IIFE:", k), 30);
  })(k);
}

// ── Real-world: Event handler ───────────────────
console.log("\\n--- Practical Uses ---");
function setupButton(name) {
  let clicks = 0;
  return function onClick() {
    clicks++;
    console.log(\`\${name} clicked \${clicks} times\`);
  };
}
const handler = setupButton("Submit");
handler(); handler(); handler();

// ── Real-world: Memoization ─────────────────────
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log("(cached)");
      return cache[key];
    }
    cache[key] = fn(...args);
    return cache[key];
  };
}

const expensiveAdd = memoize((a, b) => a + b);
console.log("\\n" + expensiveAdd(1, 2));  // Computed
console.log(expensiveAdd(1, 2));           // Cached!
`,
    },
    interviewQuestions: [
      {
        question: "What is a closure in JavaScript?",
        difficulty: "Medium",
        hint: "A closure is a function bundled with its lexical environment — it retains access to variables from its outer scope even after the outer function has returned. Created whenever a function is defined inside another function. The inner function 'closes over' the outer variables. Used for data privacy, factories, callbacks, and state management.",
      },
      {
        question: "How do closures enable data privacy?",
        difficulty: "Medium",
        hint: "Variables in the outer function are only accessible through the returned inner functions — they act as private variables. The module pattern: const mod = (function(){ let private = 0; return { get() { return private; }, set(v) { private = v; } }; })(). No external code can access 'private' directly — only through the exposed methods. This is encapsulation via closures.",
      },
      {
        question: "Explain the classic closure-in-loop problem and how to fix it.",
        difficulty: "Hard",
        hint: "for(var i=0; i<3; i++) { setTimeout(() => console.log(i), 100); } prints 3,3,3 because var has function scope — all callbacks close over the SAME i, which is 3 after the loop. Fixes: 1) Use let instead of var (block-scoped, new binding per iteration). 2) IIFE: (function(j){ setTimeout(()=>console.log(j),100) })(i). 3) setTimeout third arg: setTimeout(fn, 100, i).",
      },
    ],
  },
  {
    id: "this-keyword",
    title: "this Keyword",
    slug: "this-keyword",
    icon: "Target",
    difficulty: "Advanced",
    description:
      "Master the 'this' keyword — one of the most confusing and interview-critical concepts in JavaScript.",
    concept: {
      explanation:
        "The 'this' keyword refers to the object that is executing the current function. Unlike most languages, 'this' in JavaScript is NOT determined by where a function is defined, but by HOW it is called. Rules (in priority order): 1) new binding: this = the newly created object. 2) Explicit binding: call(thisArg), apply(thisArg), bind(thisArg) — this = thisArg. 3) Implicit binding: obj.method() — this = obj (the object before the dot). 4) Default binding: standalone function call — this = window (sloppy mode) or undefined (strict mode). Arrow functions are special: they DON'T have their own 'this' — they inherit 'this' from their enclosing lexical scope. This is why arrow functions are great for callbacks but bad as methods.",
      realLifeAnalogy:
        "The 'this' keyword is like the word 'I' in English. Who 'I' refers to depends on WHO IS SPEAKING, not where the sentence was written. If Alice says 'I am happy', 'I' = Alice. If Bob reads Alice's sentence aloud, 'I' still means the speaker (Bob), not Alice. Similarly, 'this' depends on who CALLS the function, not who wrote it. Arrow functions are like a tape recording — 'I' always refers to the original speaker.",
      keyPoints: [
        "this is determined by HOW a function is CALLED, not where it's defined",
        "new Foo(): this = new object",
        "call/apply/bind: this = explicitly provided object",
        "obj.method(): this = obj (object before the dot)",
        "standalone call: this = window (sloppy) or undefined (strict)",
        "Arrow functions: NO own this — inherits from lexical scope",
        "Arrow functions: great for callbacks, bad as object methods",
        "Common pitfall: losing 'this' when passing methods as callbacks",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== this Keyword =====

// ── Rule 1: Default binding ─────────────────────
console.log("--- Default Binding ---");
function showThis() {
  "use strict";
  console.log("strict this:", typeof this);  // undefined
}
showThis();

function showThisSloppy() {
  console.log("sloppy this:", typeof this);  // object (window/global)
}
showThisSloppy();

// ── Rule 2: Implicit binding (dot rule) ─────────
console.log("\\n--- Implicit Binding ---");
const user = {
  name: "Alice",
  greet() {
    console.log("Hello, I'm " + this.name);
  },
};
user.greet();  // this = user → "Alice"

// Losing 'this' — common pitfall!
const greetFn = user.greet;
// greetFn();  // this = undefined (strict) or window → NOT "Alice"

// ── Rule 3: Explicit binding ────────────────────
console.log("\\n--- Explicit Binding ---");
function introduce(greeting) {
  console.log(greeting + ", I'm " + this.name);
}

const alice = { name: "Alice" };
const bob = { name: "Bob" };

introduce.call(alice, "Hi");     // this = alice
introduce.call(bob, "Hey");      // this = bob
introduce.apply(alice, ["Hello"]); // apply uses array for args

// bind creates a new function with fixed 'this'
const aliceIntro = introduce.bind(alice);
aliceIntro("Howdy");  // Always this = alice

// ── Rule 4: new binding ─────────────────────────
console.log("\\n--- new Binding ---");
function Person(name) {
  // this = {} (new empty object)
  this.name = name;
  this.greet = function() {
    console.log("I'm " + this.name);
  };
  // return this (implicit)
}

const charlie = new Person("Charlie");
charlie.greet();  // this = charlie

// ── Arrow functions: NO own this ────────────────
console.log("\\n--- Arrow Functions ---");
const team = {
  name: "Dev Team",
  members: ["Alice", "Bob"],

  // Arrow function inherits 'this' from team object context
  showMembers() {
    // 'this' = team (implicit binding)
    this.members.forEach((member) => {
      // Arrow function: 'this' = team (inherited!)
      console.log(member + " is in " + this.name);
    });
  },

  // Regular function would lose 'this'
  showMembersBroken() {
    this.members.forEach(function(member) {
      // Regular function: 'this' = undefined (strict) or window
      console.log(member + " in " + (this?.name || "undefined"));
    });
  },
};

team.showMembers();      // Works! Arrow inherits 'this'
team.showMembersBroken(); // Broken! Regular function loses 'this'

// ── Arrow function as method (BAD) ──────────────
console.log("\\n--- Arrow as Method ---");
const obj = {
  name: "MyObj",
  regularMethod() {
    console.log("regular:", this.name);  // "MyObj"
  },
  arrowMethod: () => {
    console.log("arrow:", typeof this);  // NOT MyObj! (lexical this)
  },
};
obj.regularMethod();
obj.arrowMethod();

// ── Fixing 'this' in callbacks ──────────────────
console.log("\\n--- Fixing this ---");
const button = {
  text: "Click me",
  handleClick() {
    console.log("Clicked:", this.text);
  },
};

// Fix 1: bind
const boundHandler = button.handleClick.bind(button);
boundHandler();

// Fix 2: arrow function wrapper
const arrowHandler = () => button.handleClick();
arrowHandler();

// Fix 3: Use arrow function in class
class Timer {
  constructor() {
    this.seconds = 0;
  }
  // Arrow function auto-binds 'this'
  tick = () => {
    this.seconds++;
    console.log("Seconds:", this.seconds);
  }
}
const timer = new Timer();
const tickRef = timer.tick;
tickRef();  // Works! Arrow bound to instance
tickRef();
`,
    },
    interviewQuestions: [
      {
        question: "How is 'this' determined in JavaScript?",
        difficulty: "Medium",
        hint: "By how the function is called, in priority order: 1) new — this is the new object. 2) call/apply/bind — this is the explicit argument. 3) obj.method() — this is the object before the dot. 4) Regular call — this is window (sloppy) or undefined (strict). Arrow functions don't have their own this — they inherit from the enclosing scope.",
      },
      {
        question: "Why do arrow functions not have their own 'this'?",
        difficulty: "Medium",
        hint: "Arrow functions lexically bind 'this' — they inherit it from the surrounding scope where they are defined. This makes them perfect for callbacks (no need to bind), but bad as object methods (they won't get the object as 'this'). In class methods, arrow functions auto-bind to the instance, which is why React class components used them.",
      },
      {
        question: "What is the output: const obj = { x: 1, getX: () => this.x }; console.log(obj.getX());",
        difficulty: "Hard",
        hint: "Output: undefined. Arrow functions don't have their own 'this'. The arrow function's 'this' is the enclosing lexical scope — in this case, the global/module scope, NOT obj. obj.getX() doesn't set 'this' to obj for arrow functions. Fix: use a regular function: getX() { return this.x; }. This is a common interview trap.",
      },
    ],
  },
  {
    id: "prototypes",
    title: "Prototypes",
    slug: "prototypes",
    icon: "GitFork",
    difficulty: "Advanced",
    description:
      "Understand prototypes — JavaScript's mechanism for inheritance and shared behavior between objects.",
    concept: {
      explanation:
        "Every JavaScript object has a hidden internal property called [[Prototype]] (accessible via __proto__ or Object.getPrototypeOf()). When you access a property on an object and it doesn't exist, JS looks up the prototype chain — checking the object's prototype, then its prototype's prototype, until it finds the property or reaches null. This is prototypal inheritance. Functions have a .prototype property — when you use 'new', the created object's [[Prototype]] links to the constructor's .prototype. This is how methods are shared: all instances share the same prototype methods instead of each having their own copy. Object.create(proto) creates a new object with the specified prototype. Understanding prototypes is key to understanding how JS classes, inheritance, and the 'instanceof' operator work under the hood.",
      realLifeAnalogy:
        "Prototypes are like a family tree. If you (an object) don't know how to do something (property not found), you ask your parent (prototype). If they don't know, they ask their parent. This chain continues until you reach the eldest ancestor (Object.prototype) or nobody knows (null). Methods on the prototype are like family recipes — every family member can use them without each person writing them down separately.",
      keyPoints: [
        "Every object has a [[Prototype]] (internal link to another object)",
        "__proto__: accessor for [[Prototype]] (deprecated but common)",
        "Object.getPrototypeOf(obj): proper way to get prototype",
        "Function.prototype: object that becomes [[Prototype]] of instances",
        "Property lookup: own properties → prototype → prototype's prototype → null",
        "Object.create(proto): create object with specified prototype",
        "Shared methods: defined once on prototype, used by all instances",
        "Object.prototype is the top of most prototype chains",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Prototypes =====

// ── Every object has a prototype ────────────────
console.log("--- Object Prototype ---");
const obj = { name: "Alice" };
console.log(Object.getPrototypeOf(obj) === Object.prototype);  // true
console.log(obj.toString());  // Works! Inherited from Object.prototype
console.log(obj.hasOwnProperty("name"));  // true — inherited method!

// ── Constructor function + prototype ────────────
console.log("\\n--- Constructor Prototype ---");
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Add methods to prototype (shared by all instances)
Person.prototype.greet = function() {
  return "Hi, I'm " + this.name;
};

Person.prototype.isAdult = function() {
  return this.age >= 18;
};

const alice = new Person("Alice", 25);
const bob = new Person("Bob", 17);

console.log(alice.greet());     // "Hi, I'm Alice"
console.log(bob.greet());       // "Hi, I'm Bob"
console.log(alice.isAdult());   // true

// Methods are SHARED (same reference)
console.log("Same method?", alice.greet === bob.greet);  // true!

// ── Own vs prototype properties ─────────────────
console.log("\\n--- Own vs Prototype ---");
console.log("Own 'name':", alice.hasOwnProperty("name"));      // true
console.log("Own 'greet':", alice.hasOwnProperty("greet"));     // false (on prototype)
console.log("Has 'greet':", "greet" in alice);                   // true (found via chain)

// ── Object.create ───────────────────────────────
console.log("\\n--- Object.create ---");
const animal = {
  type: "Animal",
  speak() {
    return this.name + " says " + this.sound;
  },
};

const dog = Object.create(animal);
dog.name = "Rex";
dog.sound = "Woof!";
console.log(dog.speak());  // "Rex says Woof!"
console.log(dog.type);     // "Animal" (from prototype)

// ── Prototype vs own properties ─────────────────
console.log("\\n--- Property Lookup ---");
const parent = { x: 1, y: 2 };
const child = Object.create(parent);
child.x = 10;  // Own property (shadows parent's x)

console.log("child.x:", child.x);  // 10 (own)
console.log("child.y:", child.y);  // 2 (from parent prototype)

// Deleting own property reveals prototype's
delete child.x;
console.log("after delete child.x:", child.x);  // 1 (from parent)

// ── Prototype chain inspection ──────────────────
console.log("\\n--- Chain Inspection ---");
console.log("alice → Person.prototype:", Object.getPrototypeOf(alice) === Person.prototype);
console.log("Person.prototype → Object.prototype:", Object.getPrototypeOf(Person.prototype) === Object.prototype);
console.log("Object.prototype → null:", Object.getPrototypeOf(Object.prototype) === null);

// ── instanceof ──────────────────────────────────
console.log("\\n--- instanceof ---");
console.log("alice instanceof Person:", alice instanceof Person);    // true
console.log("alice instanceof Object:", alice instanceof Object);    // true
console.log("[] instanceof Array:", [] instanceof Array);             // true
console.log("[] instanceof Object:", [] instanceof Object);           // true

// ── Performance: prototype vs constructor ───────
console.log("\\n--- Performance ---");
function BadPerson(name) {
  this.name = name;
  this.greet = function() { return "Hi " + this.name; };  // NEW function per instance!
}

function GoodPerson(name) {
  this.name = name;
}
GoodPerson.prototype.greet = function() { return "Hi " + this.name; };

const bad1 = new BadPerson("A");
const bad2 = new BadPerson("B");
console.log("Bad: same greet?", bad1.greet === bad2.greet);   // false (wasteful!)

const good1 = new GoodPerson("A");
const good2 = new GoodPerson("B");
console.log("Good: same greet?", good1.greet === good2.greet); // true (shared!)
`,
    },
    interviewQuestions: [
      {
        question: "What is a prototype in JavaScript?",
        difficulty: "Medium",
        hint: "Every object has a [[Prototype]] — a hidden link to another object. When you access a property that doesn't exist on the object, JS follows the prototype chain to find it. Constructor functions have a .prototype property. When you use 'new', the instance's [[Prototype]] links to Constructor.prototype. Methods on the prototype are shared by all instances (memory efficient).",
      },
      {
        question: "Why should methods be defined on the prototype instead of in the constructor?",
        difficulty: "Medium",
        hint: "In the constructor, each instance gets its OWN copy of the method (new function object per instance). On the prototype, all instances share ONE copy. For 1000 instances: constructor = 1000 function objects, prototype = 1 function object. Same behavior, dramatically less memory. This is why classes put methods on the prototype automatically.",
      },
      {
        question: "How does instanceof work internally?",
        difficulty: "Hard",
        hint: "a instanceof B checks if B.prototype exists anywhere in a's prototype chain. It walks: a.__proto__ === B.prototype? If not, a.__proto__.__proto__ === B.prototype? And so on until null. This is why [] instanceof Array AND [] instanceof Object are both true — Array.prototype is in the chain, and Object.prototype is further up. You can customize with Symbol.hasInstance.",
      },
    ],
  },
  {
    id: "prototype-chain",
    title: "Prototype Chain",
    slug: "prototype-chain",
    icon: "ListTree",
    difficulty: "Advanced",
    description:
      "Understand the prototype chain — JavaScript's inheritance mechanism that enables property lookup across linked objects.",
    concept: {
      explanation:
        "The prototype chain is the chain of linked objects that JavaScript traverses when looking up a property. When you access obj.property: 1) Check obj's own properties. 2) Check obj's [[Prototype]]. 3) Check the prototype's [[Prototype]]. 4) Continue until null is reached (end of chain). Object.prototype is typically at the top (its [[Prototype]] is null). For arrays: arr → Array.prototype → Object.prototype → null. For instances: instance → Constructor.prototype → Object.prototype → null. For inheritance: child → Child.prototype → Parent.prototype → Object.prototype → null. The chain enables: inheritance, method sharing, property shadowing, and the 'in' operator. Understanding the chain is crucial for debugging property access and implementing inheritance.",
      realLifeAnalogy:
        "The prototype chain is like a chain of command in a military. A private (instance) has a question. First, they check their own knowledge (own properties). If they don't know, they ask their sergeant (Constructor.prototype). The sergeant asks their lieutenant (parent prototype). This goes up until the general (Object.prototype). If even the general doesn't know (null), the answer is 'undefined'. Orders (methods) flow down, questions flow up.",
      keyPoints: [
        "Property lookup traverses the chain: own → prototype → ... → null",
        "Object.prototype is at the top of most chains (its proto is null)",
        "Array chain: arr → Array.prototype → Object.prototype → null",
        "Inheritance chain: child → Child.proto → Parent.proto → Object.proto → null",
        "Property shadowing: own property hides prototype's same-named property",
        "'in' operator checks the entire chain; hasOwnProperty checks only own",
        "Object.create(null) creates object with NO prototype (no toString, etc.)",
        "Modifying a prototype affects ALL objects linked to it",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Prototype Chain =====

// ── Visualizing the chain ───────────────────────
console.log("--- The Chain ---");

function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return this.name + " makes a sound";
};

function Dog(name, breed) {
  Animal.call(this, name);  // Call parent constructor
  this.breed = breed;
}

// Set up inheritance chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return this.name + " barks!";
};

const rex = new Dog("Rex", "Labrador");

// Chain: rex → Dog.prototype → Animal.prototype → Object.prototype → null
console.log(rex.bark());    // Own chain: Dog.prototype
console.log(rex.speak());   // Inherited: Animal.prototype
console.log(rex.toString()); // Inherited: Object.prototype

// ── Walking the chain ───────────────────────────
console.log("\\n--- Walking the Chain ---");
let proto = rex;
let chain = [];
while (proto !== null) {
  chain.push(proto.constructor?.name || "null");
  proto = Object.getPrototypeOf(proto);
}
console.log("Chain:", chain.join(" → "));

// ── Built-in chains ─────────────────────────────
console.log("\\n--- Built-in Chains ---");
const arr = [1, 2, 3];
// arr → Array.prototype → Object.prototype → null
console.log("arr.push:", typeof arr.push);           // from Array.prototype
console.log("arr.toString:", typeof arr.toString);   // from Object.prototype (overridden by Array)
console.log("arr.hasOwnProperty:", typeof arr.hasOwnProperty);  // from Object.prototype

const str = "hello";
// str (boxed) → String.prototype → Object.prototype → null
console.log("\\nstr.toUpperCase:", typeof str.toUpperCase);  // String.prototype
console.log("str.valueOf:", typeof str.valueOf);              // String.prototype

// ── Property shadowing ──────────────────────────
console.log("\\n--- Shadowing ---");
const parent = { x: 1, greet() { return "parent"; } };
const child = Object.create(parent);
child.greet = function() { return "child"; };  // Shadows parent.greet

console.log("child.greet():", child.greet());  // "child" (own)
console.log("child.x:", child.x);              // 1 (from parent)

delete child.greet;
console.log("after delete:", child.greet());   // "parent" (revealed)

// ── hasOwnProperty vs in ────────────────────────
console.log("\\n--- Own vs Chain ---");
console.log("'name' in rex:", "name" in rex);                // true (own)
console.log("'bark' in rex:", "bark" in rex);                // true (prototype)
console.log("'speak' in rex:", "speak" in rex);              // true (prototype chain)

console.log("rex.hasOwn name:", rex.hasOwnProperty("name"));  // true
console.log("rex.hasOwn bark:", rex.hasOwnProperty("bark"));  // false
console.log("rex.hasOwn speak:", rex.hasOwnProperty("speak")); // false

// ── Object.create(null) — no chain ──────────────
console.log("\\n--- No Prototype ---");
const bare = Object.create(null);
bare.key = "value";
console.log("bare.key:", bare.key);
// bare.toString();  // TypeError! No Object.prototype in chain
console.log("Has toString?", "toString" in bare);  // false

// ── Modifying prototype affects all instances ───
console.log("\\n--- Live Chain ---");
function Cat(name) { this.name = name; }
const kitty = new Cat("Whiskers");
const fluffy = new Cat("Fluffy");

// Add method AFTER creating instances
Cat.prototype.meow = function() { return this.name + " meows!"; };

console.log(kitty.meow());  // Works! Chain is live
console.log(fluffy.meow()); // Works!

// ── Class-based inheritance (same chain!) ───────
console.log("\\n--- Class Syntax (same chain) ---");
class Vehicle {
  constructor(make) { this.make = make; }
  start() { return this.make + " starting..."; }
}

class Car extends Vehicle {
  constructor(make, model) {
    super(make);
    this.model = model;
  }
  drive() { return \`Driving \${this.make} \${this.model}\`; }
}

const car = new Car("Toyota", "Camry");
console.log(car.drive());   // Car.prototype
console.log(car.start());   // Vehicle.prototype
console.log(car instanceof Car);      // true
console.log(car instanceof Vehicle);  // true
`,
    },
    interviewQuestions: [
      {
        question: "How does property lookup work in the prototype chain?",
        difficulty: "Medium",
        hint: "When accessing obj.prop: 1) Check obj's own properties. 2) If not found, check obj.__proto__ (prototype). 3) Continue up the chain. 4) If reaching null (end), return undefined. For methods, 'this' still refers to the original object, not the prototype where the method was found. hasOwnProperty checks only own properties; 'in' checks the entire chain.",
      },
      {
        question: "How do you set up inheritance using prototypes (without classes)?",
        difficulty: "Hard",
        hint: "function Child() { Parent.call(this, args); } // Call parent constructor. Child.prototype = Object.create(Parent.prototype); // Link prototypes. Child.prototype.constructor = Child; // Fix constructor reference. This creates: instance → Child.prototype → Parent.prototype → Object.prototype → null. ES6 classes do this automatically with 'extends' and 'super'.",
      },
      {
        question: "What happens when you modify a built-in prototype like Array.prototype?",
        difficulty: "Hard",
        hint: "Adding/modifying methods on Array.prototype affects ALL arrays in the entire application (monkey patching). Array.prototype.myMethod = fn means every [].myMethod works. This is dangerous: 1) Can break other code/libraries. 2) May conflict with future JS features. 3) for...in loops would include the added properties. The only safe pattern is polyfilling missing standard methods after checking they don't exist.",
      },
    ],
  },
  {
    id: "javascript-classes",
    title: "JavaScript Classes",
    slug: "javascript-classes",
    icon: "Box",
    difficulty: "Advanced",
    description:
      "Master JavaScript classes — syntactic sugar over prototypes for creating objects with shared behavior and inheritance.",
    concept: {
      explanation:
        "ES6 classes are syntactic sugar over JavaScript's prototype-based inheritance. They provide a cleaner, more familiar syntax but work the same way under the hood. Key features: constructor() for initialization, methods (automatically on prototype), static methods (on the class itself), getters/setters, inheritance with extends and super, private fields (#field), and public class fields. Classes are NOT hoisted like function declarations (they're in TDZ). typeof MyClass is 'function'. class methods are non-enumerable and use strict mode automatically. Under the hood: methods go on Class.prototype, static methods go on the Class itself, extends sets up the prototype chain. Understanding classes is essential for React class components and modern JS development.",
      realLifeAnalogy:
        "A class is like a blueprint for a house. The blueprint (class) defines the structure: how many rooms (properties), what functions the house has (methods). Each house built from the blueprint (instance) is a separate physical house with its own address (data), but they all share the same design. Inheritance (extends) is like building a mansion blueprint based on the basic house blueprint — it includes everything from the house plus additional features.",
      keyPoints: [
        "class is syntactic sugar over prototypes (same mechanism)",
        "constructor(): initializes new instances",
        "Methods: automatically placed on Class.prototype",
        "static methods: called on the class, not instances",
        "extends: sets up prototype chain for inheritance",
        "super(): calls parent constructor; super.method(): calls parent method",
        "#privateField: truly private (not accessible outside class)",
        "Classes are NOT hoisted — they're in TDZ (like let/const)",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== JavaScript Classes =====

// ── Basic class ─────────────────────────────────
console.log("--- Basic Class ---");
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hi, I'm \${this.name}, age \${this.age}\`;
  }

  isAdult() {
    return this.age >= 18;
  }
}

const alice = new Person("Alice", 25);
console.log(alice.greet());
console.log("Adult?", alice.isAdult());
console.log("Type:", typeof Person);  // "function" — sugar over prototypes!

// ── Getters and setters ─────────────────────────
console.log("\\n--- Getters/Setters ---");
class Temperature {
  #celsius;  // Private field

  constructor(celsius) {
    this.#celsius = celsius;
  }

  get fahrenheit() {
    return this.#celsius * 9/5 + 32;
  }

  set fahrenheit(f) {
    this.#celsius = (f - 32) * 5/9;
  }

  get celsius() { return this.#celsius; }
  set celsius(c) { this.#celsius = c; }
}

const temp = new Temperature(100);
console.log("Celsius:", temp.celsius);       // 100
console.log("Fahrenheit:", temp.fahrenheit); // 212
temp.fahrenheit = 32;
console.log("After set F=32, C:", temp.celsius);  // 0

// ── Static methods ──────────────────────────────
console.log("\\n--- Static Methods ---");
class MathUtils {
  static add(a, b) { return a + b; }
  static multiply(a, b) { return a * b; }
  static PI = 3.14159;
}

console.log(MathUtils.add(2, 3));       // 5 (called on class)
console.log(MathUtils.PI);              // 3.14159
// const m = new MathUtils(); m.add(2,3);  // TypeError — static!

// ── Inheritance with extends ────────────────────
console.log("\\n--- Inheritance ---");
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // MUST call super() first!
    this.breed = breed;
  }

  speak() {
    return \`\${this.name} barks!\`;  // Override parent
  }

  fetch(item) {
    return \`\${this.name} fetches \${item}\`;
  }
}

class Cat extends Animal {
  speak() {
    return \`\${this.name} meows! (also: \${super.speak()})\`;  // Call parent
  }
}

const dog = new Dog("Rex", "Labrador");
const cat = new Cat("Whiskers");

console.log(dog.speak());   // "Rex barks!" (overridden)
console.log(dog.fetch("ball"));
console.log(cat.speak());   // Uses super.speak()

console.log("dog instanceof Dog:", dog instanceof Dog);
console.log("dog instanceof Animal:", dog instanceof Animal);

// ── Private fields ──────────────────────────────
console.log("\\n--- Private Fields ---");
class BankAccount {
  #balance = 0;  // Private!
  #owner;

  constructor(owner, initial = 0) {
    this.#owner = owner;
    this.#balance = initial;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid amount");
    this.#balance += amount;
    return this;
  }

  get balance() { return this.#balance; }
  get owner() { return this.#owner; }

  toString() {
    return \`\${this.#owner}: $\${this.#balance}\`;
  }
}

const account = new BankAccount("Alice", 100);
account.deposit(50).deposit(25);
console.log(account.toString());
console.log("Balance:", account.balance);
// console.log(account.#balance);  // SyntaxError! Private

// ── Class fields ────────────────────────────────
console.log("\\n--- Class Fields ---");
class Counter {
  count = 0;  // Public field (each instance gets own copy)

  // Arrow function auto-binds 'this'
  increment = () => {
    this.count++;
    return this.count;
  }
}

const c = new Counter();
const inc = c.increment;  // Detached from object
console.log(inc());  // 1 — still works (arrow bound)
console.log(inc());  // 2

// ── Under the hood: same as prototypes ──────────
console.log("\\n--- Under the Hood ---");
console.log("Person.prototype.greet:", typeof Person.prototype.greet);
console.log("Dog.prototype → Animal.prototype:", Object.getPrototypeOf(Dog.prototype) === Animal.prototype);
`,
    },
    interviewQuestions: [
      {
        question: "Are JavaScript classes real classes or syntactic sugar?",
        difficulty: "Medium",
        hint: "Syntactic sugar over prototypes. class Person { greet() {} } is equivalent to: function Person() {} Person.prototype.greet = function() {}. typeof class is 'function'. extends sets up prototype chain. Methods go on Constructor.prototype. The 'new' keyword works the same way. Classes just provide cleaner syntax — the underlying mechanism is prototypal inheritance.",
      },
      {
        question: "What is the difference between public, private, and static class members?",
        difficulty: "Medium",
        hint: "Public (default): accessible everywhere. Private (#field): only accessible inside the class body — true privacy, not convention. Static: belongs to the class itself, not instances — called as Class.method(), not instance.method(). Static is useful for utility functions, factory methods, and constants. Private is enforced by the engine — accessing #field outside throws SyntaxError.",
      },
      {
        question: "Why must super() be called before 'this' in a derived constructor?",
        difficulty: "Hard",
        hint: "In a class that extends another, 'this' doesn't exist until super() is called. The parent constructor creates and returns the object that becomes 'this'. If you access 'this' before super(), you get ReferenceError: 'Must call super constructor before accessing this'. After super(), you can add properties with this.x = y. This is different from ES5 where you could use 'this' immediately.",
      },
    ],
  },
  {
    id: "garbage-collection",
    title: "Garbage Collection",
    slug: "garbage-collection",
    icon: "RotateCcw",
    difficulty: "Advanced",
    description:
      "Understand garbage collection — how JavaScript automatically manages memory and common causes of memory leaks.",
    concept: {
      explanation:
        "Garbage collection (GC) is JavaScript's automatic memory management. The engine allocates memory when objects are created and frees it when they're no longer reachable. The primary algorithm is 'mark-and-sweep': starting from roots (global object, call stack variables), the GC marks all reachable objects, then sweeps (frees) unreachable ones. V8 uses generational GC: 'young generation' (short-lived objects, collected frequently) and 'old generation' (survived several GCs, collected less often). Common memory leaks: 1) Forgotten global variables. 2) Forgotten timers/intervals. 3) Closures holding large data. 4) Detached DOM nodes. 5) Forgotten event listeners. Understanding GC helps write memory-efficient code and debug memory leaks — critical for long-running applications like SPAs.",
      realLifeAnalogy:
        "Garbage collection is like a library system. Books (objects) are checked out (referenced). The librarian (GC) periodically checks: is each book still checked out to someone (reachable)? If a book has no borrower and no reservation (no references), it goes back to the shelf (memory freed). Memory leaks are like forgetting to return books — you don't read them anymore, but they're still checked out in your name, preventing others from using that shelf space.",
      keyPoints: [
        "Automatic: JS engine handles allocation and deallocation",
        "Mark-and-sweep: mark reachable objects from roots, sweep the rest",
        "Roots: global object, call stack variables, active closures",
        "Reachable = kept; unreachable = garbage collected",
        "V8: generational GC (young gen + old gen)",
        "Memory leaks: globals, timers, closures, detached DOM, event listeners",
        "WeakRef / WeakMap / WeakSet: allow GC of referenced objects",
        "Use DevTools Memory tab to profile and find leaks",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Garbage Collection =====

// ── Basic reachability ──────────────────────────
console.log("--- Reachability ---");
let user = { name: "Alice", data: new Array(1000) };
console.log("user exists:", user.name);

user = null;  // Object is now unreachable → eligible for GC
console.log("user = null → object can be garbage collected");

// ── References ──────────────────────────────────
console.log("\\n--- References ---");
let a = { name: "Object A" };
let b = a;  // Two references to same object

a = null;  // Object still has one reference (b)
console.log("a=null, b still holds:", b.name);  // Still alive!

b = null;  // Now zero references → GC can collect
console.log("b=null → object eligible for GC");

// ── Circular references ─────────────────────────
console.log("\\n--- Circular References ---");
function createCircular() {
  const objA = {};
  const objB = {};
  objA.ref = objB;
  objB.ref = objA;
  // Both reference each other, but after function returns,
  // neither is reachable from roots → GC collects both!
  return "done";
}
createCircular();
console.log("Circular refs: collected when unreachable from roots");
console.log("(mark-and-sweep handles this correctly)");

// ── LEAK 1: Accidental globals ──────────────────
console.log("\\n--- Leak: Globals ---");
function leakyFunction() {
  // BAD: missing 'let/const' creates global variable!
  // leakedVar = "I'm global now!";  // Memory leak!
  let properVar = "I'm local";  // Correct — GC'd after function
  console.log("Use let/const to avoid global leaks");
}
leakyFunction();

// ── LEAK 2: Forgotten timers ────────────────────
console.log("\\n--- Leak: Timers ---");
function setupTimer() {
  const bigData = new Array(10000).fill("data");

  const timerId = setInterval(() => {
    // This closure keeps bigData alive as long as interval runs!
    console.log("Timer running, holding", bigData.length, "items");
  }, 60000);

  // FIX: clear when done
  // clearInterval(timerId);
  clearInterval(timerId);
  console.log("Timer cleared → bigData can be GC'd");
}
setupTimer();

// ── LEAK 3: Closures holding references ─────────
console.log("\\n--- Leak: Closures ---");
function createClosure() {
  const hugeArray = new Array(100000).fill("x");

  return function() {
    // Even if we don't USE hugeArray, the closure captures it
    return "I exist";
  };
}

let closure = createClosure();
console.log(closure());
closure = null;  // Now closure AND hugeArray can be GC'd
console.log("Closure nulled → captured data can be freed");

// ── WeakRef and WeakMap ─────────────────────────
console.log("\\n--- WeakRef/WeakMap ---");

// WeakMap: keys are weakly held (GC can collect them)
const cache = new WeakMap();
let obj = { id: 1, data: "important" };
cache.set(obj, "cached result");
console.log("WeakMap has obj:", cache.has(obj));  // true

obj = null;  // Object can be GC'd despite being in WeakMap!
console.log("obj=null → WeakMap entry can be GC'd too");

// Regular Map would prevent GC:
const regularMap = new Map();
let obj2 = { id: 2 };
regularMap.set(obj2, "value");
obj2 = null;  // Object NOT GC'd — Map still references it!
console.log("Map size:", regularMap.size);  // Still 1!

// ── Memory-efficient patterns ───────────────────
console.log("\\n--- Best Practices ---");

// 1. Nullify references when done
let tempData = { big: "data" };
// ... use tempData ...
tempData = null;
console.log("1. Nullify when done ✓");

// 2. Remove event listeners
// element.removeEventListener('click', handler);
console.log("2. Remove event listeners ✓");

// 3. Clear timers
// clearInterval(id); clearTimeout(id);
console.log("3. Clear timers ✓");

// 4. Use WeakMap/WeakSet for caches
console.log("4. Use WeakMap for caches ✓");

// 5. Avoid closures over large data
console.log("5. Minimize closure captures ✓");

// ── How to detect leaks ─────────────────────────
console.log("\\n--- Detecting Leaks ---");
console.log("Chrome DevTools → Memory tab");
console.log("1. Take heap snapshot");
console.log("2. Perform actions");
console.log("3. Take another snapshot");
console.log("4. Compare → find growing allocations");
console.log("5. Performance.memory API for programmatic checks");
`,
    },
    interviewQuestions: [
      {
        question: "How does garbage collection work in JavaScript?",
        difficulty: "Medium",
        hint: "JS uses mark-and-sweep algorithm. Starting from 'roots' (global object, call stack, active closures), the GC traverses all reachable objects and marks them. Unmarked objects are unreachable and their memory is freed. Modern engines like V8 use generational GC: young generation (frequent, fast scans) and old generation (infrequent, thorough scans). GC runs automatically — you can't trigger it manually.",
      },
      {
        question: "What are common causes of memory leaks in JavaScript?",
        difficulty: "Hard",
        hint: "1) Accidental globals (missing var/let/const). 2) Forgotten timers (setInterval without clearInterval). 3) Closures capturing large data they don't need. 4) Detached DOM nodes (removed from DOM but still referenced in JS). 5) Event listeners not removed (especially in SPAs). 6) Growing data structures (Maps/arrays that only grow). Use Chrome DevTools Memory tab to profile.",
      },
      {
        question: "What is the difference between WeakMap and Map regarding garbage collection?",
        difficulty: "Hard",
        hint: "Map holds strong references to keys — objects used as keys won't be GC'd even if no other references exist. WeakMap holds weak references — if the key object has no other references, it CAN be garbage collected (and the entry disappears). WeakMap keys must be objects. Trade-off: WeakMap is not iterable and has no .size. Use WeakMap for caches where you don't want to prevent GC of the cached objects.",
      },
    ],
  },
  // ─── Level 9: Browser APIs ─────────────────────────────────────────────────
  {
    id: "local-storage",
    title: "Local Storage",
    slug: "local-storage",
    icon: "HardDrive",
    difficulty: "Intermediate",
    description:
      "Learn how to persist data in the browser using localStorage — a synchronous key-value store that survives page reloads and browser restarts.",
    concept: {
      explanation:
        "localStorage is a Web Storage API that lets you store key-value pairs in the browser with no expiration. Data persists even after the browser is closed and reopened. It stores strings only (use JSON.stringify/parse for objects). Each origin gets ~5MB of storage. It's synchronous and blocks the main thread, so avoid storing large amounts of data. Common uses: user preferences, theme settings, form drafts, shopping cart data. Unlike cookies, localStorage data is never sent to the server automatically.",
      realLifeAnalogy:
        "localStorage is like a notebook you keep in your desk drawer. You can write notes (setItem), read them later (getItem), erase specific notes (removeItem), or tear out all pages (clear). The notebook stays in the drawer even when you leave and come back the next day. But it only works at THIS desk (same origin) — you can't read it from another desk (different domain).",
      keyPoints: [
        "Stores key-value pairs as strings",
        "Persists across page reloads and browser restarts",
        "~5MB storage limit per origin",
        "Synchronous API — blocks main thread",
        "Same-origin policy: only accessible from the same domain",
        "Use JSON.stringify/parse for objects and arrays",
        "No expiration — data stays until explicitly removed",
        "storage event fires when another tab modifies localStorage",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Local Storage =====

// ── Basic operations ────────────────────────────
console.log("--- Basic Operations ---");

// Set items
localStorage.setItem("username", "Alice");
localStorage.setItem("theme", "dark");
console.log("Stored username and theme");

// Get items
const username = localStorage.getItem("username");
console.log("Username:", username);  // "Alice"

// Check non-existent key
const missing = localStorage.getItem("nonexistent");
console.log("Missing key:", missing);  // null

// ── Storing objects with JSON ───────────────────
console.log("\\n--- Storing Objects ---");

const user = {
  name: "Bob",
  age: 25,
  preferences: { theme: "dark", lang: "en" }
};

localStorage.setItem("user", JSON.stringify(user));
const retrieved = JSON.parse(localStorage.getItem("user"));
console.log("Retrieved user:", retrieved.name, "age:", retrieved.age);

// ── Storing arrays ──────────────────────────────
console.log("\\n--- Storing Arrays ---");

const todos = ["Buy groceries", "Walk dog", "Read book"];
localStorage.setItem("todos", JSON.stringify(todos));
const savedTodos = JSON.parse(localStorage.getItem("todos"));
console.log("Todos:", savedTodos.join(", "));

// ── Remove and clear ────────────────────────────
console.log("\\n--- Remove & Clear ---");

localStorage.removeItem("theme");
console.log("After removeItem('theme'):", localStorage.getItem("theme"));

console.log("Keys before clear:", localStorage.length);
localStorage.clear();
console.log("Keys after clear:", localStorage.length);
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between localStorage and sessionStorage?",
        difficulty: "Easy",
        hint: "localStorage persists until explicitly deleted — data survives browser close. sessionStorage is cleared when the tab/window is closed. Both share the same API (setItem, getItem, removeItem, clear) and same ~5MB limit. sessionStorage is per-tab — opening a new tab creates a new session. localStorage is shared across all tabs of the same origin.",
      },
      {
        question: "Why should you use JSON.stringify and JSON.parse with localStorage?",
        difficulty: "Medium",
        hint: "localStorage only stores strings. If you store an object directly, it becomes '[object Object]'. JSON.stringify converts objects/arrays to JSON strings for storage. JSON.parse converts them back when reading. Always wrap getItem in a try-catch since JSON.parse throws on invalid JSON. Also note: functions, undefined, and symbols are lost during JSON serialization.",
      },
      {
        question: "What are the security considerations of using localStorage?",
        difficulty: "Hard",
        hint: "Never store sensitive data (passwords, tokens, PII) in localStorage — it's accessible to any JavaScript on the same origin (XSS vulnerability). It has no built-in encryption. It's synchronous and blocks the main thread. No data integrity guarantees. For auth tokens, prefer httpOnly cookies. For sensitive data, use server-side sessions. localStorage is best for non-sensitive preferences and cached UI state.",
      },
    ],
  },
  {
    id: "session-storage",
    title: "Session Storage",
    slug: "session-storage",
    icon: "Clock",
    difficulty: "Intermediate",
    description:
      "Learn sessionStorage — browser storage that persists only for the duration of a page session (tab lifetime).",
    concept: {
      explanation:
        "sessionStorage is identical to localStorage in API, but data is cleared when the tab or window is closed. Each tab has its own isolated sessionStorage — opening the same page in two tabs creates two separate storage areas. Data survives page reloads and browser back/forward navigation within the same tab. Common uses: temporary form data, wizard/multi-step form state, single-session preferences, one-time notifications. It's also synchronous and limited to ~5MB per origin.",
      realLifeAnalogy:
        "sessionStorage is like a whiteboard in a meeting room. You can write notes during the meeting (session), and they stay even if you step out for coffee (page reload). But once the meeting ends and you leave the room (close the tab), the whiteboard is wiped clean. Each meeting room (tab) has its own whiteboard — you can't see another room's notes.",
      keyPoints: [
        "Same API as localStorage (setItem, getItem, removeItem, clear)",
        "Data cleared when the tab/window is closed",
        "Survives page reloads within the same tab",
        "Each tab has isolated sessionStorage",
        "~5MB storage limit per origin",
        "Not shared across tabs — unlike localStorage",
        "Ideal for temporary, per-session data",
        "Duplicating a tab copies sessionStorage to the new tab",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Session Storage =====

// ── Basic operations ────────────────────────────
console.log("--- Basic Operations ---");

// Store data for this session
sessionStorage.setItem("currentStep", "2");
sessionStorage.setItem("formDraft", JSON.stringify({
  name: "Alice",
  email: "alice@example.com"
}));
console.log("Stored step and form draft");

// Retrieve
const step = sessionStorage.getItem("currentStep");
console.log("Current step:", step);

const draft = JSON.parse(sessionStorage.getItem("formDraft"));
console.log("Draft name:", draft.name);

// ── Tab isolation ───────────────────────────────
console.log("\\n--- Tab Isolation ---");
console.log("Each tab has its own sessionStorage");
console.log("Tab A sets 'color' = 'red'");
console.log("Tab B sets 'color' = 'blue'");
console.log("They don't interfere with each other!");

// ── Counting items ──────────────────────────────
console.log("\\n--- Storage Info ---");
console.log("Items stored:", sessionStorage.length);

// Loop through all keys
for (let i = 0; i < sessionStorage.length; i++) {
  const key = sessionStorage.key(i);
  console.log(\`  [\${i}] \${key} = \${sessionStorage.getItem(key)}\`);
}

// ── Cleanup ─────────────────────────────────────
console.log("\\n--- Cleanup ---");
sessionStorage.removeItem("currentStep");
console.log("Removed currentStep");
console.log("Remaining items:", sessionStorage.length);

sessionStorage.clear();
console.log("Cleared all. Items:", sessionStorage.length);
`,
    },
    interviewQuestions: [
      {
        question: "When would you use sessionStorage over localStorage?",
        difficulty: "Easy",
        hint: "Use sessionStorage for data that should not persist beyond the current session: multi-step form wizards (lose progress on tab close), one-time notifications, temporary UI state, sensitive data that shouldn't linger. Use localStorage for data that should persist: user preferences, theme choice, cached data. Rule of thumb: if the user would expect to see the data after reopening the browser, use localStorage.",
      },
      {
        question: "What happens to sessionStorage when you duplicate a tab?",
        difficulty: "Medium",
        hint: "When you duplicate a tab (Ctrl+Shift+T or right-click > Duplicate), the new tab gets a COPY of the original tab's sessionStorage at that moment. After duplication, the two tabs are independent — changes in one don't affect the other. This is different from localStorage which is shared. Opening a link in a new tab (target='_blank') also copies sessionStorage in most browsers.",
      },
      {
        question: "How would you implement a cross-tab communication using storage events?",
        difficulty: "Hard",
        hint: "The 'storage' event fires on OTHER tabs when localStorage changes (not sessionStorage). Listen with window.addEventListener('storage', callback). The event provides: key, oldValue, newValue, url, storageArea. Pattern: Tab A writes to localStorage, Tab B's storage listener fires. For real-time cross-tab communication, you can use BroadcastChannel API or SharedWorker instead. sessionStorage doesn't trigger storage events across tabs since it's tab-isolated.",
      },
    ],
  },
  {
    id: "geolocation-api",
    title: "Geolocation API",
    slug: "geolocation-api",
    icon: "MapPin",
    difficulty: "Intermediate",
    description:
      "Access the user's geographic location using the Geolocation API — learn to get coordinates, handle errors, and watch position changes.",
    concept: {
      explanation:
        "The Geolocation API allows web applications to access the user's geographic position. It requires explicit user permission (the browser shows a prompt). It provides latitude, longitude, altitude, speed, and heading. Two main methods: getCurrentPosition() for a one-time read, and watchPosition() for continuous tracking. It's asynchronous and uses callbacks (success + error). Works over HTTPS only in modern browsers. Accuracy depends on the device — GPS on mobile is precise, IP-based on desktop is approximate. Common uses: maps, location-based search, weather apps, delivery tracking.",
      realLifeAnalogy:
        "The Geolocation API is like asking your phone for directions. First, it asks permission ('Allow this app to access your location?'). If you agree, it can tell you exactly where you are (getCurrentPosition) or keep tracking you as you move (watchPosition). If you're indoors or GPS is weak, the answer might be less accurate. And you can always revoke permission later.",
      keyPoints: [
        "Requires user permission — browser shows a prompt",
        "navigator.geolocation.getCurrentPosition() for one-time location",
        "navigator.geolocation.watchPosition() for continuous tracking",
        "Returns: latitude, longitude, accuracy, altitude, speed, heading",
        "Asynchronous with success and error callbacks",
        "HTTPS required in modern browsers",
        "Error codes: PERMISSION_DENIED, POSITION_UNAVAILABLE, TIMEOUT",
        "clearWatch() to stop watching position",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Geolocation API =====

// ── Check support ───────────────────────────────
console.log("--- Geolocation API ---");

if ("geolocation" in navigator) {
  console.log("Geolocation is supported!");
} else {
  console.log("Geolocation is NOT supported");
}

// ── Get current position ────────────────────────
console.log("\\n--- getCurrentPosition ---");

navigator.geolocation.getCurrentPosition(
  // Success callback
  (position) => {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
    console.log("Accuracy:", position.coords.accuracy, "meters");
    console.log("Timestamp:", new Date(position.timestamp));
  },
  // Error callback
  (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied location access");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location unavailable");
        break;
      case error.TIMEOUT:
        console.log("Request timed out");
        break;
    }
  },
  // Options
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  }
);

// ── Watch position (continuous) ─────────────────
console.log("\\n--- watchPosition ---");

const watchId = navigator.geolocation.watchPosition(
  (pos) => {
    console.log("Updated:", pos.coords.latitude, pos.coords.longitude);
  },
  (err) => console.log("Watch error:", err.message)
);

// Stop watching after some time
// navigator.geolocation.clearWatch(watchId);
console.log("Watch ID:", watchId);
console.log("Call clearWatch(watchId) to stop tracking");
`,
    },
    interviewQuestions: [
      {
        question: "How does the Geolocation API handle user privacy?",
        difficulty: "Easy",
        hint: "The browser always asks for user permission before sharing location. The permission prompt shows the origin requesting access. Users can Allow, Block, or dismiss. Once blocked, the site can't ask again (user must change it in browser settings). The API only works on secure origins (HTTPS). There's no way to silently access location — it's always opt-in. The Permissions API can check the current permission state.",
      },
      {
        question: "What is the difference between getCurrentPosition and watchPosition?",
        difficulty: "Medium",
        hint: "getCurrentPosition() makes a single request — it calls the success callback once with the current position, then stops. watchPosition() registers a handler that's called every time the position changes — it returns a watch ID used to stop tracking via clearWatch(). Both accept the same parameters: successCallback, errorCallback, and options (enableHighAccuracy, timeout, maximumAge). Use getCurrentPosition for static location needs (weather, nearby stores); use watchPosition for tracking (navigation, fitness apps).",
      },
      {
        question: "How would you implement a fallback when geolocation fails or is denied?",
        difficulty: "Hard",
        hint: "Graceful degradation strategy: 1) Check if API exists ('geolocation' in navigator). 2) Handle all error codes in the error callback. 3) For PERMISSION_DENIED: show manual location input or use IP-based geolocation as fallback. 4) For TIMEOUT: retry with longer timeout or lower accuracy. 5) For POSITION_UNAVAILABLE: fall back to IP geolocation API. 6) Always provide a manual location search option. 7) Cache the last known location in localStorage for offline use.",
      },
    ],
  },
  {
    id: "drag-and-drop-api",
    title: "Drag and Drop API",
    slug: "drag-and-drop-api",
    icon: "GripVertical",
    difficulty: "Intermediate",
    description:
      "Build interactive drag-and-drop interfaces using the HTML5 Drag and Drop API — handle drag events, transfer data, and create drop zones.",
    concept: {
      explanation:
        "The HTML5 Drag and Drop API enables dragging elements and dropping them onto targets. Make elements draggable with the draggable='true' attribute. Key events on the dragged element: dragstart (begin), drag (during), dragend (finished). Key events on drop targets: dragenter (enters target), dragover (hovering — must call preventDefault to allow drop), dragleave (exits target), drop (released). Use the DataTransfer object to pass data between drag source and drop target. Common uses: file uploads, sortable lists, kanban boards, image galleries.",
      realLifeAnalogy:
        "Drag and Drop is like moving sticky notes on a whiteboard. You pick up a note (dragstart), carry it across the board (drag/dragover), and place it in a new column (drop). The whiteboard columns are drop zones — they light up when you hover over them (dragenter) and dim when you leave (dragleave). If you change your mind and put the note back, that's dragend without a drop.",
      keyPoints: [
        "Add draggable='true' to make elements draggable",
        "dragstart: set data with event.dataTransfer.setData()",
        "dragover: must call preventDefault() to allow dropping",
        "drop: read data with event.dataTransfer.getData()",
        "DataTransfer object carries data between source and target",
        "dragenter/dragleave for visual feedback on drop zones",
        "dragend fires on the source element when dragging ends",
        "Works with files dragged from the desktop too",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Drag and Drop API =====

// ── Making elements draggable ───────────────────
console.log("--- Drag and Drop Setup ---");

// HTML: <div id="item" draggable="true">Drag me</div>
// HTML: <div id="dropZone">Drop here</div>

const item = document.getElementById("item");
const dropZone = document.getElementById("dropZone");

// ── Drag source events ──────────────────────────
console.log("\\n--- Drag Events ---");

item.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.dataTransfer.effectAllowed = "move";
  console.log("Drag started:", e.target.id);
});

item.addEventListener("dragend", (e) => {
  console.log("Drag ended. Drop effect:", e.dataTransfer.dropEffect);
});

// ── Drop target events ──────────────────────────
console.log("\\n--- Drop Zone Events ---");

dropZone.addEventListener("dragenter", (e) => {
  e.preventDefault();
  dropZone.classList.add("highlight");
  console.log("Entered drop zone");
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();  // REQUIRED to allow drop!
  e.dataTransfer.dropEffect = "move";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("highlight");
  console.log("Left drop zone");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const itemId = e.dataTransfer.getData("text/plain");
  const draggedEl = document.getElementById(itemId);
  dropZone.appendChild(draggedEl);
  dropZone.classList.remove("highlight");
  console.log("Dropped:", itemId);
});

console.log("Drag and drop handlers registered!");
`,
    },
    interviewQuestions: [
      {
        question: "Why do you need to call preventDefault() on the dragover event?",
        difficulty: "Easy",
        hint: "By default, most elements don't allow dropping — the browser's default behavior is to reject the drop. Calling e.preventDefault() in the dragover handler signals that this element accepts drops. Without it, the drop event will never fire. You should also call preventDefault() in the drop handler to prevent the browser's default handling (like opening a link). This is the most common mistake when implementing drag and drop.",
      },
      {
        question: "How does the DataTransfer object work in drag and drop?",
        difficulty: "Medium",
        hint: "DataTransfer is the bridge between drag source and drop target. In dragstart, call e.dataTransfer.setData(format, data) to attach data — format is a MIME type like 'text/plain' or 'application/json'. In drop, call e.dataTransfer.getData(format) to retrieve it. You can set multiple formats. effectAllowed (on source) and dropEffect (on target) control the cursor icon and allowed operations (copy, move, link). For file drops from desktop, access e.dataTransfer.files.",
      },
      {
        question: "How would you implement a sortable list using the Drag and Drop API?",
        difficulty: "Hard",
        hint: "1) Make all list items draggable='true'. 2) On dragstart, store the dragged item's index. 3) On dragover of each item, determine if the cursor is in the top or bottom half (using e.clientY and getBoundingClientRect). 4) Insert a visual placeholder showing where the item will land. 5) On drop, reorder the array and re-render. Challenges: performance with many items, touch device support (DnD API doesn't work on mobile — need a polyfill or touch events). Libraries like dnd-kit or react-beautiful-dnd handle these edge cases.",
      },
    ],
  },
  {
    id: "clipboard-api",
    title: "Clipboard API",
    slug: "clipboard-api",
    icon: "FileText",
    difficulty: "Intermediate",
    description:
      "Read from and write to the system clipboard using the modern async Clipboard API — copy text, images, and rich content programmatically.",
    concept: {
      explanation:
        "The Clipboard API provides async methods to read from and write to the system clipboard. navigator.clipboard.writeText() copies text, and navigator.clipboard.readText() reads it. For rich content (images, HTML), use write() and read() with ClipboardItem objects. It requires user permission and a secure context (HTTPS). The API is Promise-based, unlike the older document.execCommand('copy'). Writing usually works without explicit permission; reading always requires it. The API is designed to be safe — it can't silently read clipboard contents without user interaction.",
      realLifeAnalogy:
        "The Clipboard API is like a shared notepad between apps. You can write a note on it (writeText) or read what someone else wrote (readText). But there's a security guard — before you can READ someone else's note, you need permission. Writing is usually allowed because you're sharing YOUR content. The notepad can hold text, images, or even formatted documents (ClipboardItem).",
      keyPoints: [
        "navigator.clipboard.writeText(text) — copy text to clipboard",
        "navigator.clipboard.readText() — read text from clipboard",
        "navigator.clipboard.write() — copy rich content (images, HTML)",
        "navigator.clipboard.read() — read rich content",
        "Async/Promise-based API",
        "Requires HTTPS (secure context)",
        "Reading requires user permission; writing usually doesn't",
        "ClipboardItem for handling multiple MIME types",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Clipboard API =====

// ── Copy text ───────────────────────────────────
console.log("--- Copy Text ---");

async function copyText() {
  try {
    await navigator.clipboard.writeText("Hello, World!");
    console.log("Text copied to clipboard!");
  } catch (err) {
    console.log("Copy failed:", err.message);
  }
}

// ── Read text ───────────────────────────────────
console.log("\\n--- Read Text ---");

async function pasteText() {
  try {
    const text = await navigator.clipboard.readText();
    console.log("Clipboard contains:", text);
  } catch (err) {
    console.log("Read failed:", err.message);
  }
}

// ── Copy button pattern ─────────────────────────
console.log("\\n--- Copy Button Pattern ---");

function setupCopyButton(buttonEl, textToCopy) {
  buttonEl.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      buttonEl.textContent = "Copied!";
      setTimeout(() => {
        buttonEl.textContent = "Copy";
      }, 2000);
    } catch (err) {
      buttonEl.textContent = "Failed";
    }
  });
  console.log("Copy button ready!");
}

// ── Copy rich content (HTML/images) ─────────────
console.log("\\n--- Rich Content ---");

async function copyHTML() {
  const htmlBlob = new Blob(
    ["<b>Bold text</b> and <i>italic</i>"],
    { type: "text/html" }
  );
  const textBlob = new Blob(
    ["Bold text and italic"],
    { type: "text/plain" }
  );

  const item = new ClipboardItem({
    "text/html": htmlBlob,
    "text/plain": textBlob,
  });

  await navigator.clipboard.write([item]);
  console.log("Rich content copied!");
}

console.log("Functions defined: copyText, pasteText, copyHTML");
`,
    },
    interviewQuestions: [
      {
        question: "Why does the Clipboard API require a secure context?",
        difficulty: "Easy",
        hint: "Clipboard access is sensitive — malicious scripts could read passwords, credit card numbers, or other sensitive data from the clipboard. HTTPS ensures the page hasn't been tampered with (man-in-the-middle attacks). The browser also requires user interaction (click, keypress) to trigger clipboard operations — you can't silently read/write on page load. The Permissions API manages clipboard-read and clipboard-write permissions separately.",
      },
      {
        question: "What is the difference between the Clipboard API and document.execCommand?",
        difficulty: "Medium",
        hint: "document.execCommand('copy'/'paste') is the legacy synchronous API — it's deprecated but still widely used. It works by selecting text in the DOM and copying the selection. The Clipboard API (navigator.clipboard) is modern, async (Promise-based), doesn't require DOM selection, supports rich content via ClipboardItem, and has a cleaner permission model. execCommand works in more browsers but is being phased out. The Clipboard API is the recommended approach for new code.",
      },
      {
        question: "How would you implement a 'copy code snippet' button for a documentation site?",
        difficulty: "Hard",
        hint: "1) Add a copy button to each code block. 2) On click, get the code text from the <pre>/<code> element. 3) Use navigator.clipboard.writeText(codeText). 4) Show visual feedback: change button text to 'Copied!' with a checkmark, revert after 2s. 5) Handle errors: fall back to document.execCommand('copy') by creating a temporary textarea, selecting its content, and calling execCommand. 6) Consider: stripping HTML tags, preserving indentation, and handling special characters.",
      },
    ],
  },
  {
    id: "history-api",
    title: "History API",
    slug: "history-api",
    icon: "Route",
    difficulty: "Intermediate",
    description:
      "Navigate and manipulate the browser's session history using the History API — build SPAs with client-side routing and custom back/forward behavior.",
    concept: {
      explanation:
        "The History API lets you manipulate the browser's session history (the back/forward stack). history.pushState() adds a new entry without reloading the page — this is how SPAs (Single Page Applications) work. history.replaceState() modifies the current entry. history.back(), history.forward(), and history.go() navigate the stack. The popstate event fires when the user clicks back/forward. pushState takes three arguments: state object (serializable data), title (mostly ignored), and URL. This is the foundation of client-side routers like React Router and Next.js routing.",
      realLifeAnalogy:
        "The History API is like a trail of breadcrumbs in a forest. As you walk (navigate), you drop breadcrumbs (pushState). You can go back along the trail (history.back) or forward (history.forward). replaceState is like picking up the last breadcrumb and moving it — changing where you are without adding a new point. SPAs use this to make it look like you're visiting new pages, when really you're just rearranging the breadcrumbs.",
      keyPoints: [
        "history.pushState(state, title, url) — add history entry without reload",
        "history.replaceState(state, title, url) — modify current entry",
        "history.back() / history.forward() / history.go(n) — navigate",
        "popstate event fires on back/forward navigation",
        "state object is available via history.state or event.state",
        "URL must be same-origin (can't push to a different domain)",
        "Foundation of client-side routing in SPAs",
        "history.length gives the number of entries in the stack",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== History API =====

// ── Push new history entries ────────────────────
console.log("--- pushState ---");

// Add entries without page reload
history.pushState({ page: "home" }, "", "/home");
console.log("Pushed /home");
console.log("Current state:", JSON.stringify(history.state));

history.pushState({ page: "about" }, "", "/about");
console.log("Pushed /about");
console.log("History length:", history.length);

// ── Replace current entry ───────────────────────
console.log("\\n--- replaceState ---");

history.replaceState({ page: "about", version: 2 }, "", "/about");
console.log("Replaced current state");
console.log("State now:", JSON.stringify(history.state));

// ── Listen for back/forward ─────────────────────
console.log("\\n--- popstate Event ---");

window.addEventListener("popstate", (event) => {
  console.log("Navigation detected!");
  console.log("State:", JSON.stringify(event.state));
  // Update UI based on the state
});
console.log("popstate listener registered");

// ── Simple SPA router ───────────────────────────
console.log("\\n--- Simple Router ---");

function navigate(path, data = {}) {
  history.pushState(data, "", path);
  // Render the correct view
  console.log("Navigated to:", path);
}

navigate("/products", { category: "electronics" });
navigate("/products/123", { id: 123, name: "Laptop" });

console.log("Final state:", JSON.stringify(history.state));
console.log("Total history entries:", history.length);
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between pushState and replaceState?",
        difficulty: "Easy",
        hint: "pushState ADDS a new entry to the history stack — the user can press back to return to the previous state. replaceState MODIFIES the current entry — it doesn't add a new one, so back goes to whatever was before. Use pushState for navigation (user expects back to work). Use replaceState for updates that shouldn't create history (like updating query params for filters, or redirects where back to the old URL doesn't make sense).",
      },
      {
        question: "How do client-side routers like React Router use the History API?",
        difficulty: "Medium",
        hint: "React Router intercepts link clicks (prevents default navigation), calls history.pushState() to update the URL without a page reload, then renders the matching component based on the new URL. It listens for popstate events to handle back/forward buttons. The state object can carry route params and data. React Router wraps this in a <BrowserRouter> component. The key insight: the URL changes (so users can bookmark/share), but the page never actually reloads — only the component tree updates.",
      },
      {
        question: "What are the limitations and gotchas of the History API?",
        difficulty: "Hard",
        hint: "1) URL must be same-origin — can't pushState to a different domain. 2) State object must be serializable (no functions, DOM nodes). 3) Title parameter is largely ignored by browsers. 4) popstate doesn't fire on pushState/replaceState — only on back/forward/go. 5) Server must handle the pushed URLs (return index.html for all routes in SPAs). 6) State size limit varies by browser (~2-16MB). 7) Hard refresh on a pushed URL requires server-side routing config. 8) hash-based routing (#) is a simpler alternative that avoids server config issues.",
      },
    ],
  },
  {
    id: "web-workers",
    title: "Web Workers",
    slug: "web-workers",
    icon: "Workflow",
    difficulty: "Advanced",
    description:
      "Run JavaScript in background threads using Web Workers — offload heavy computations without blocking the UI.",
    concept: {
      explanation:
        "Web Workers run JavaScript in a background thread, separate from the main UI thread. This prevents heavy computations from freezing the page. Communication between main thread and worker happens via postMessage() and the message event. Workers don't have access to the DOM, window, or document — they're isolated. They can use fetch, setTimeout, importScripts, and IndexedDB. Types: Dedicated Workers (one-to-one), Shared Workers (shared across tabs), Service Workers (proxy for network requests/offline). Common uses: data processing, image manipulation, complex calculations, parsing large files.",
      realLifeAnalogy:
        "A Web Worker is like hiring an assistant to handle paperwork while you attend meetings. You (main thread) can't be in two places at once — if you try to process a huge spreadsheet during a meeting, the meeting freezes. So you hand it to your assistant (worker) via a memo (postMessage). They work on it in another room (background thread) and send back the results (message event). They can't attend your meeting (no DOM access), but they can do the heavy lifting.",
      keyPoints: [
        "Runs JavaScript in a background thread (no UI blocking)",
        "Communication via postMessage() and message event",
        "No access to DOM, window, or document",
        "Can use fetch, XMLHttpRequest, setTimeout, IndexedDB",
        "Workers run in a separate file (or Blob URL)",
        "Transferable objects for zero-copy data transfer",
        "terminate() to stop a worker from the main thread",
        "self.close() to stop from within the worker",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Web Workers =====

// ── Creating a worker (main thread) ─────────────
console.log("--- Web Worker Setup ---");

// worker.js would contain the worker code
// const worker = new Worker("worker.js");

// Using inline worker with Blob URL
const workerCode = \`
  self.addEventListener("message", (e) => {
    const { type, data } = e.data;

    if (type === "fibonacci") {
      function fib(n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
      }
      const result = fib(data);
      self.postMessage({ type: "result", value: result });
    }

    if (type === "sort") {
      const sorted = [...data].sort((a, b) => a - b);
      self.postMessage({ type: "sorted", value: sorted });
    }
  });
\`;

const blob = new Blob([workerCode], { type: "text/javascript" });
const worker = new Worker(URL.createObjectURL(blob));

// ── Sending messages to worker ──────────────────
console.log("\\n--- Communication ---");

worker.addEventListener("message", (e) => {
  console.log("Worker replied:", e.data.type, e.data.value);
});

worker.addEventListener("error", (e) => {
  console.log("Worker error:", e.message);
});

// Send task to worker
worker.postMessage({ type: "fibonacci", data: 10 });
console.log("Sent fibonacci(10) to worker");
console.log("Main thread is NOT blocked!");

// Send another task
worker.postMessage({
  type: "sort",
  data: [5, 3, 8, 1, 9, 2]
});
console.log("Sent sort task to worker");

// ── Cleanup ─────────────────────────────────────
console.log("\\n--- Cleanup ---");
// worker.terminate();  // Stop the worker
console.log("Call worker.terminate() when done");
`,
    },
    interviewQuestions: [
      {
        question: "Why can't Web Workers access the DOM?",
        difficulty: "Easy",
        hint: "The DOM is not thread-safe — if multiple threads modified the DOM simultaneously, it would cause race conditions and corruption (two threads adding/removing the same element). JavaScript's single-threaded model guarantees DOM operations happen sequentially. Workers run on separate threads, so they're intentionally isolated from the DOM. Communication via postMessage serializes data, preventing shared-state bugs. Workers CAN compute data and send it to the main thread, which then safely updates the DOM.",
      },
      {
        question: "What are Transferable Objects and when would you use them?",
        difficulty: "Medium",
        hint: "By default, postMessage copies data (structured clone). For large data (ArrayBuffers, ImageBitmaps), copying is slow. Transferable objects MOVE data instead of copying — ownership transfers to the receiving thread, and the sending thread can no longer access it. Usage: worker.postMessage(data, [arrayBuffer]). The second argument lists transferable objects. This gives zero-copy performance for large binary data (images, audio, video frames). After transfer, the original ArrayBuffer has byteLength 0.",
      },
      {
        question: "What is the difference between Dedicated Workers, Shared Workers, and Service Workers?",
        difficulty: "Hard",
        hint: "Dedicated Worker: one-to-one with a single page/script. Created with new Worker(). Most common type. Shared Worker: can be accessed by multiple tabs/windows of the same origin. Created with new SharedWorker(). Uses ports for communication. Less browser support. Service Worker: acts as a proxy between the app and network. Enables offline support, push notifications, background sync. Has a lifecycle (install, activate, fetch events). Lives beyond page lifetime. Registered via navigator.serviceWorker.register(). Each serves different purposes: computation, cross-tab sharing, and offline/caching respectively.",
      },
    ],
  },
  {
    id: "intersection-observer",
    title: "Intersection Observer",
    slug: "intersection-observer",
    icon: "Eye",
    difficulty: "Advanced",
    description:
      "Efficiently detect when elements enter or leave the viewport using the Intersection Observer API — implement lazy loading, infinite scroll, and scroll animations.",
    concept: {
      explanation:
        "Intersection Observer asynchronously watches for changes in the intersection of a target element with an ancestor element or the viewport. Unlike scroll event listeners, it's highly performant — the browser optimizes observation internally without blocking the main thread. You create an observer with a callback and options (root, rootMargin, threshold), then observe elements. The callback fires with IntersectionObserverEntry objects that tell you isIntersecting, intersectionRatio, and boundingClientRect. Common uses: lazy loading images, infinite scroll, scroll-triggered animations, ad viewability tracking, sticky headers.",
      realLifeAnalogy:
        "Intersection Observer is like a security camera at a store entrance. Instead of an employee constantly watching the door (scroll events), the camera automatically detects when someone enters (isIntersecting: true) or leaves (isIntersecting: false). It can even tell you how much of the person is visible (intersectionRatio). You can set the sensitivity — trigger when they're 50% visible (threshold: 0.5) or give advance warning when they're 100px away (rootMargin: '100px').",
      keyPoints: [
        "Async, performant alternative to scroll event listeners",
        "Callback fires when element visibility changes",
        "threshold: at what visibility ratio to trigger (0 to 1)",
        "rootMargin: extends/shrinks the observation area",
        "root: ancestor element (default: viewport)",
        "isIntersecting: whether element is visible",
        "intersectionRatio: how much of the element is visible (0-1)",
        "observer.unobserve(el) to stop watching; observer.disconnect() to stop all",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Intersection Observer =====

// ── Basic usage ─────────────────────────────────
console.log("--- Basic Intersection Observer ---");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log(
        entry.target.id,
        entry.isIntersecting ? "VISIBLE" : "HIDDEN",
        "ratio:", entry.intersectionRatio.toFixed(2)
      );
    });
  },
  {
    root: null,       // viewport
    rootMargin: "0px",
    threshold: 0.5    // trigger at 50% visibility
  }
);

// Observe elements
// observer.observe(document.querySelector("#section1"));

// ── Lazy loading images ─────────────────────────
console.log("\\n--- Lazy Loading ---");

function lazyLoadImages() {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;  // Load actual image
        img.classList.add("loaded");
        imgObserver.unobserve(img);  // Stop watching
        console.log("Loaded image:", img.dataset.src);
      }
    });
  }, { rootMargin: "100px" });  // Start loading 100px before visible

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imgObserver.observe(img);
  });
  console.log("Lazy loading initialized");
}

// ── Infinite scroll ─────────────────────────────
console.log("\\n--- Infinite Scroll ---");

function setupInfiniteScroll(sentinel, loadMore) {
  const scrollObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      console.log("Sentinel visible — loading more...");
      loadMore();
    }
  });

  scrollObserver.observe(sentinel);
  console.log("Infinite scroll ready");
  return scrollObserver;
}

// ── Scroll animations ───────────────────────────
console.log("\\n--- Scroll Animations ---");

function animateOnScroll() {
  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          console.log("Animating:", entry.target.className);
        }
      });
    },
    { threshold: 0.2 }  // Trigger at 20% visible
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    animObserver.observe(el);
  });
  console.log("Scroll animations initialized");
}

console.log("\\nAll observers set up!");
`,
    },
    interviewQuestions: [
      {
        question: "Why is Intersection Observer better than scroll event listeners?",
        difficulty: "Easy",
        hint: "Scroll events fire on EVERY pixel of scrolling (potentially 60+ times per second), blocking the main thread. Even with throttling/debouncing, you're running getBoundingClientRect() which triggers layout recalculation (layout thrashing). Intersection Observer is asynchronous — the browser batches observations and runs callbacks off the main thread. It's also simpler: no manual scroll position math, no throttling, no cleanup of scroll listeners. It handles edge cases like CSS transforms and nested scrolling automatically.",
      },
      {
        question: "How would you implement lazy loading images with Intersection Observer?",
        difficulty: "Medium",
        hint: "1) Use <img data-src='actual.jpg' src='placeholder.jpg'> in HTML. 2) Create an observer with rootMargin: '200px' (preload before visible). 3) In the callback, when isIntersecting is true: set img.src = img.dataset.src. 4) Call observer.unobserve(img) after loading (observe once). 5) Add a load event listener for fade-in transition. 6) Handle errors with img.onerror fallback. Modern approach: use loading='lazy' attribute natively, but IO gives more control over rootMargin and animations.",
      },
      {
        question: "Explain the threshold and rootMargin options in Intersection Observer.",
        difficulty: "Hard",
        hint: "threshold: defines at what visibility ratio the callback fires. Single value: 0.5 fires at 50% visible. Array: [0, 0.25, 0.5, 1] fires at each threshold crossing (both entering and leaving). 0 = any pixel visible; 1 = fully visible. rootMargin: CSS-style margin around the root (viewport). '100px' expands the observation zone 100px in all directions (fire 100px BEFORE the element is visible — good for preloading). '-50px' shrinks it (element must be 50px inside viewport). Accepts '10px 20px 30px 40px' like CSS margin. Both options work together for precise control.",
      },
    ],
  },
];

export const javascriptModules: JavaScriptModule[] = [
  {
    id: "javascript-fundamentals",
    level: 1,
    title: "JavaScript Fundamentals",
    difficulty: "Beginner",
    description:
      "The foundation of JavaScript — learn the language basics, syntax rules, variables, data types, and how JavaScript executes code.",
    topicIds: [
      "introduction-to-javascript",
      "javascript-syntax",
      "javascript-variables",
      "javascript-data-types",
      "javascript-operators",
      "javascript-type-conversion",
      "javascript-comments",
      "javascript-input-output",
      "javascript-statements",
      "javascript-strict-mode",
    ],
  },
  {
    id: "control-flow",
    level: 2,
    title: "Control Flow",
    difficulty: "Beginner",
    description:
      "Master decision-making and repetition — learn conditionals, loops, and how to control the flow of your JavaScript programs.",
    topicIds: [
      "if-else-statements",
      "switch-statements",
      "ternary-operator",
      "for-loop",
      "while-loop",
      "do-while-loop",
      "break-and-continue",
      "nested-loops",
    ],
  },
  {
    id: "functions",
    level: 3,
    title: "Functions",
    difficulty: "Intermediate",
    description:
      "Understand how to define, invoke, and compose functions — the building blocks of reusable JavaScript code.",
    topicIds: [
      "function-declaration",
      "function-expressions",
      "arrow-functions",
      "parameters-and-arguments",
      "return-statement",
      "default-parameters",
      "rest-parameters",
      "callback-functions",
      "higher-order-functions",
    ],
  },
  {
    id: "arrays-and-objects",
    level: 4,
    title: "Arrays and Objects",
    difficulty: "Intermediate",
    description:
      "Master arrays, objects, destructuring, JSON, and copy semantics — the core data structures used in every JavaScript application.",
    topicIds: [
      "javascript-arrays",
      "array-methods",
      "array-iteration-methods",
      "spread-operator",
      "javascript-objects",
      "object-methods",
      "object-destructuring",
      "json-basics",
      "shallow-vs-deep-copy",
    ],
  },
  {
    id: "dom-manipulation",
    level: 5,
    title: "DOM Manipulation",
    difficulty: "Intermediate",
    description:
      "Learn to interact with the browser's Document Object Model — select elements, modify content, handle events, and build dynamic interfaces.",
    topicIds: [
      "what-is-dom",
      "selecting-elements",
      "modifying-html-content",
      "modifying-css-styles",
      "creating-removing-elements",
      "dom-traversal",
      "event-listeners",
      "event-propagation",
      "event-delegation",
    ],
  },
  {
    id: "async-javascript",
    level: 6,
    title: "Asynchronous JavaScript",
    difficulty: "Intermediate",
    description:
      "Master async programming — understand the event loop, callbacks, Promises, async/await, and how to fetch data from APIs.",
    topicIds: [
      "sync-vs-async",
      "set-timeout-set-interval",
      "callbacks",
      "callback-hell",
      "promises",
      "promise-chaining",
      "async-await",
      "error-handling-try-catch",
      "fetch-api",
    ],
  },
  {
    id: "modern-javascript",
    level: 7,
    title: "Modern JavaScript (ES6+)",
    difficulty: "Intermediate",
    description:
      "Master modern JavaScript features — template literals, destructuring, modules, optional chaining, nullish coalescing, and more ES6+ syntax used in every real application.",
    topicIds: [
      "template-literals",
      "destructuring-assignment",
      "es6-default-parameters",
      "modules-import-export",
      "optional-chaining",
      "nullish-coalescing",
      "spread-and-rest",
      "short-circuiting",
    ],
  },
  {
    id: "advanced-javascript",
    level: 8,
    title: "Advanced JavaScript Concepts",
    difficulty: "Advanced",
    description:
      "Deep dive into execution context, call stack, closures, prototypes, the 'this' keyword, and other core concepts frequently asked in frontend interviews.",
    topicIds: [
      "execution-context",
      "call-stack",
      "hoisting",
      "scope-and-lexical-scope",
      "closures",
      "this-keyword",
      "prototypes",
      "prototype-chain",
      "javascript-classes",
      "garbage-collection",
    ],
  },
  {
    id: "browser-apis",
    level: 9,
    title: "Browser APIs",
    difficulty: "Advanced",
    description:
      "Master essential browser APIs — localStorage, geolocation, drag and drop, clipboard, history, web workers, and intersection observer for building rich web applications.",
    topicIds: [
      "local-storage",
      "session-storage",
      "geolocation-api",
      "drag-and-drop-api",
      "clipboard-api",
      "history-api",
      "web-workers",
      "intersection-observer",
    ],
  },
];
