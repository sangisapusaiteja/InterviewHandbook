import type { DSATopic, CategoryInfo } from "@/types/dsa";

export const dsaTopics: DSATopic[] = [
  // ─────────────────────────────────────────────
  // 0. Variables & Data Types
  // ─────────────────────────────────────────────
  {
    id: "variables-and-data-types",
    title: "Variables & Data Types",
    slug: "variables-and-data-types",
    icon: "Boxes",
    difficulty: "Beginner",
    description:
      "Understand how JavaScript stores information using variables (let, const) and the core primitive data types: Number, String, Boolean, null, and undefined.",
    concept: {
      explanation:
        "Variables are named containers that hold values in memory. In modern JavaScript you declare them with let (re-assignable) or const (fixed binding). Every value has a data type that determines what operations are valid on it. JavaScript has six primitive types: Number (covers both integers and floats), String (text), Boolean (true/false), null (intentional absence), undefined (not yet assigned), and Symbol. Understanding types prevents bugs like '1' + 1 === '11' (string concatenation) vs 1 + 1 === 2 (addition).",
      realLifeAnalogy:
        "Think of variables as labelled boxes in a warehouse. 'let' boxes can be repacked with anything at any time. 'const' boxes are sealed — you can still rearrange items inside a box (mutate an object), but you cannot replace the box itself. The data type is like the contents category stamped on each box: numbers go in one kind, text in another, true/false switches in another.",
      keyPoints: [
        "Use const by default; switch to let only when you need to reassign",
        "var is function-scoped and hoisted — avoid it in modern code",
        "JavaScript is dynamically typed: a variable can hold any type at any time",
        "typeof returns the type as a string — e.g. typeof 42 === 'number'",
        "null and undefined both mean 'no value' but for different reasons: null is intentional, undefined is the engine's default",
        "typeof null === 'object' is a historical bug in the language — null is NOT an object",
        "Number covers integers and floats; use Number.isInteger() to distinguish them",
        "Template literals (backtick strings) allow embedded expressions via ${expression}",
      ],
      timeComplexity: "N/A — variable assignment and type checks are O(1)",
      spaceComplexity: "O(1) per primitive value stored",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Variables & Data Types in JavaScript =====

// ── let vs const ──────────────────────────────
let score = 0;          // can be reassigned
score = 100;
console.log("score:", score);           // 100

const MAX_SCORE = 999;  // cannot be reassigned
// MAX_SCORE = 1000;    // ❌ TypeError
console.log("MAX_SCORE:", MAX_SCORE);   // 999

// ── Number (integer) ──────────────────────────
let age = 25;
let negative = -7;
console.log("\\nNumber (int):");
console.log("  age:", age, "| type:", typeof age);
console.log("  Is integer?", Number.isInteger(age));   // true

// ── Number (float) ────────────────────────────
let price = 9.99;
let pi    = 3.14159;
console.log("\\nNumber (float):");
console.log("  price:", price, "| type:", typeof price);
console.log("  Is integer?", Number.isInteger(price)); // false
console.log("  0.1 + 0.2 =", 0.1 + 0.2);              // floating-point quirk

// ── String ────────────────────────────────────
let firstName = "Alice";
let lastName  = 'Smith';
let greeting  = \`Hello, \${firstName} \${lastName}!\`;   // template literal
console.log("\\nString:");
console.log(" ", greeting);
console.log("  length:", firstName.length);
console.log("  type:", typeof firstName);

// ── Boolean ───────────────────────────────────
let isLoggedIn = true;
let hasError   = false;
console.log("\\nBoolean:");
console.log("  isLoggedIn:", isLoggedIn, "| type:", typeof isLoggedIn);
console.log("  !isLoggedIn:", !isLoggedIn);

// ── null ──────────────────────────────────────
let selectedUser = null;    // intentionally empty
console.log("\\nnull:");
console.log("  selectedUser:", selectedUser);
console.log("  typeof null:", typeof selectedUser); // "object" (JS quirk ⚠️)
console.log("  Is null?", selectedUser === null);

// ── undefined ─────────────────────────────────
let pendingValue;           // declared but not assigned
console.log("\\nundefined:");
console.log("  pendingValue:", pendingValue);
console.log("  type:", typeof pendingValue);

// ── Type coercion gotchas ─────────────────────
console.log("\\nType coercion:");
console.log("  '5' + 3  =", '5' + 3);   // "53"  (string concat)
console.log("  '5' - 3  =", '5' - 3);   // 2     (numeric coercion)
console.log("  null == undefined:", null == undefined);   // true (loose)
console.log("  null === undefined:", null === undefined); // false (strict)
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the difference between let, const, and var in JavaScript?",
        difficulty: "Easy",
        hint: "Focus on scope (block vs function), hoisting behaviour, and whether the binding can be reassigned. var is function-scoped and hoisted with value undefined; let and const are block-scoped and in the TDZ until their declaration.",
      },
      {
        question:
          "Why does typeof null return 'object'? Is null actually an object?",
        difficulty: "Easy",
        hint: "This is a historical bug from the very first version of JavaScript. The original type tags used 000 to represent objects, and null's bit pattern was also 000. null is NOT an object — it is its own primitive type. Use strict equality (=== null) to check for null.",
      },
      {
        question:
          "What is the difference between null and undefined? When would you use each?",
        difficulty: "Medium",
        hint: "undefined is the engine's default for uninitialised variables and missing function arguments. null is an explicit programmer signal meaning 'no value here'. Use null when you want to intentionally clear a variable; let the engine assign undefined naturally.",
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 1. Operators
  // ─────────────────────────────────────────────
  {
    id: "operators",
    title: "Operators",
    slug: "operators",
    icon: "Calculator",
    difficulty: "Beginner",
    description:
      "Master JavaScript operators — arithmetic, comparison, logical, and increment/decrement — and understand how type coercion affects == vs ===.",
    concept: {
      explanation:
        "Operators are symbols that tell JavaScript how to combine, compare, or transform values. Arithmetic operators (+, -, *, /, %) perform math. Comparison operators (==, ===, >, <) return a boolean by comparing two values — strict equality (===) checks both value and type without coercion, while loose equality (==) converts types first, which can cause subtle bugs. Logical operators (&&, ||, !) combine boolean expressions and short-circuit: && stops at the first falsy value, || stops at the first truthy value. Increment/decrement (++, --) provide shorthand for adding or subtracting 1, but prefix and postfix variants differ in what value they return.",
      realLifeAnalogy:
        "Think of operators as verbs in a sentence. Arithmetic operators are like a calculator. Comparison operators are like a judge asking 'are these the same?' — strict equality is a strict judge who considers both appearance and identity (type + value), while loose equality is a lenient judge who accepts look-alikes (type coercion). Logical && is like requiring all lights to be green before proceeding; || is like needing any one light green.",
      keyPoints: [
        "Always prefer === over == to avoid unexpected type coercion bugs",
        "% (modulus) gives the remainder — useful for checking even/odd: n % 2 === 0",
        "&& short-circuits: if the left side is falsy, the right side is never evaluated",
        "|| short-circuits: if the left side is truthy, the right side is never evaluated",
        "?? (nullish coalescing) is like || but only triggers on null or undefined — not on 0 or ''",
        "x++ returns the old value then increments; ++x increments first then returns the new value",
        "Compound assignment operators (+=, -=, *=) are shorthand for x = x op value",
        "String + anything coerces to string: '5' + 3 === '53', but '5' - 3 === 2",
      ],
      timeComplexity: "O(1) — all operator evaluations are constant time",
      spaceComplexity: "O(1)",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Operators in JavaScript =====

// ── Arithmetic ─────────────────────────────────
let a = 10, b = 3;
console.log("Arithmetic:");
console.log("  a + b =", a + b);   // 13
console.log("  a - b =", a - b);   // 7
console.log("  a * b =", a * b);   // 30
console.log("  a / b =", a / b);   // 3.333...
console.log("  a % b =", a % b);   // 1  ← remainder

// Modulus use-case: even/odd check
for (let i = 1; i <= 6; i++) {
  console.log(\`  \${i} is \${i % 2 === 0 ? "even" : "odd"}\`);
}

// ── String concatenation vs addition ───────────
console.log("\\nType coercion with +:");
console.log("  '5' + 3 =", '5' + 3);   // "53"  (string concat)
console.log("  '5' - 3 =", '5' - 3);   // 2     (numeric coercion)
console.log("  '5' * 2 =", '5' * 2);   // 10

// ── Comparison ─────────────────────────────────
console.log("\\nComparison (== vs ===):");
console.log("  5 ==  '5' →", 5 ==  '5');   // true  (coerced)
console.log("  5 === '5' →", 5 === '5');   // false (strict) ✅
console.log("  null == undefined →", null == undefined);   // true
console.log("  null === undefined →", null === undefined); // false
console.log("  0 == false →", 0 == false);   // true  ← surprise!
console.log("  0 === false →", 0 === false); // false ← safe ✅

// ── Logical ────────────────────────────────────
console.log("\\nLogical operators:");
console.log("  true && false →", true && false);  // false
console.log("  true || false →", true || false);  // true
console.log("  !true →", !true);                  // false

// Short-circuit
let user = null;
console.log("  user && user.name →", user && user.name); // null
console.log("  user || 'Guest'   →", user || 'Guest');   // "Guest"
console.log("  user ?? 'Anon'    →", user ?? 'Anon');    // "Anon"

let zero = 0;
console.log("  zero || 'fallback' →", zero || 'fallback'); // "fallback" (0 is falsy)
console.log("  zero ?? 'fallback' →", zero ?? 'fallback'); // 0 (?? ignores 0)

// ── Increment / Decrement ──────────────────────
console.log("\\nIncrement / Decrement:");
let x = 5;
console.log("  x =", x);
console.log("  x++ returns:", x++, "| x is now:", x); // 5, then 6
console.log("  ++x returns:", ++x, "| x is now:", x); // 7, then 7
console.log("  x-- returns:", x--, "| x is now:", x); // 7, then 6
console.log("  --x returns:", --x, "| x is now:", x); // 5, then 5

// Compound assignment
let score = 100;
score += 25;  console.log("\\n  score += 25 →", score); // 125
score -= 10;  console.log("  score -= 10 →", score);  // 115
score *= 2;   console.log("  score *= 2  →", score);  // 230
score /= 5;   console.log("  score /= 5  →", score);  // 46
score %= 7;   console.log("  score %= 7  →", score);  // 4
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the difference between == and === in JavaScript? When should you use each?",
        difficulty: "Easy",
        hint: "== performs type coercion before comparing (loose equality), while === compares both value and type without coercion (strict equality). Always prefer === to avoid subtle bugs like 0 == false being true. Use == only when you explicitly want null == undefined to be true.",
      },
      {
        question:
          "What does the % (modulus) operator return, and what are common interview uses?",
        difficulty: "Easy",
        hint: "It returns the remainder of integer division. Common uses: even/odd check (n % 2 === 0), cycling through indices (i % arr.length), clock arithmetic, and finding if a number is divisible by another (n % k === 0).",
      },
      {
        question:
          "Explain short-circuit evaluation in && and ||. How does it differ from the ?? operator?",
        difficulty: "Medium",
        hint: "&&  returns the first falsy value or the last value if all are truthy. || returns the first truthy value or the last if all are falsy. ?? (nullish coalescing) only short-circuits on null or undefined — unlike ||, it treats 0, '', and false as valid values and does NOT use the fallback for them.",
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 2. Loops in JavaScript
  // ─────────────────────────────────────────────
  {
    id: "loops",
    title: "Loops in JavaScript",
    slug: "loops",
    icon: "Repeat",
    difficulty: "Beginner",
    description:
      "Master all five loop constructs in JavaScript -- for, while, do-while, for...of, and for...in -- and apply them to classic problems: sum of natural numbers, Fibonacci sequence, and reversing a number.",
    concept: {
      explanation:
        "Loops let you execute a block of code repeatedly. JavaScript has five loop constructs. The for loop is best when you know the exact number of iterations: it has init, condition, and update in one line. The while loop keeps running as long as a condition is true — it may never execute if the condition starts false. The do-while loop always runs at least once because it checks the condition after the body. The for...of loop iterates over the values of any iterable (array, string, Set, Map). The for...in loop enumerates the enumerable property keys of an object (avoid it on arrays). Choosing the right loop makes code more readable and avoids bugs.",
      realLifeAnalogy:
        "A for loop is a scheduled workout: 'I will do exactly 10 reps.' A while loop is running until tired: 'Keep going as long as I have energy.' A do-while loop is eating at least one bite before deciding if you are full. for...of is flipping through every page of a book one by one. for...in is reading every label on items in a drawer.",
      keyPoints: [
        "for loop: best when the iteration count is known ahead of time",
        "while loop: best when the stop condition depends on runtime state",
        "do...while: guaranteed at least one execution — great for user-input retry loops",
        "for...of: iterates values of iterables (arrays, strings, Sets, Maps) — no index by default",
        "for...in: iterates enumerable keys of an object — avoid on arrays (also enumerates prototype keys)",
        "Use break to exit early, continue to skip the current iteration",
        "Nested loops: outer O(n) × inner O(m) = O(n*m) total — watch for hidden quadratic complexity",
        "Practice: Sum 1…n uses for; Fibonacci uses do...while; Reverse number uses while",
      ],
      timeComplexity:
        "Single loop: O(n) | Nested loop: O(n²) | Fixed iterations: O(1)",
      spaceComplexity:
        "O(1) for counting loops | O(n) when building a result array (e.g. Fibonacci)",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Loops in JavaScript =====

// ── for loop ──────────────────────────────────
// Practice: Sum of natural numbers
function sumOfNaturalNumbers(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
console.log("Sum 1..10  =", sumOfNaturalNumbers(10));   // 55
console.log("Sum 1..100 =", sumOfNaturalNumbers(100));  // 5050
// Formula check: n*(n+1)/2
console.log("Formula    =", 100 * 101 / 2);             // 5050

// ── do...while loop ───────────────────────────
// Practice: Print Fibonacci sequence
function fibonacci(count) {
  const result = [];
  let a = 0, b = 1, i = 0;
  do {
    result.push(a);
    const next = a + b;
    a = b;
    b = next;
    i++;
  } while (i < count);
  return result;
}
console.log("\\nFibonacci(10):", fibonacci(10).join(", "));
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

// ── while loop ────────────────────────────────
// Practice: Reverse a number (no string conversion)
function reverseNumber(num) {
  let n = Math.abs(num);
  let reversed = 0;
  while (n > 0) {
    const digit = n % 10;          // extract last digit
    reversed = reversed * 10 + digit;
    n = Math.floor(n / 10);        // remove last digit
  }
  return num < 0 ? -reversed : reversed;
}
console.log("\\nreverse(1234)  =", reverseNumber(1234));   // 4321
console.log("reverse(12300) =", reverseNumber(12300));  // 321
console.log("reverse(-456)  =", reverseNumber(-456));   // -654

// Bonus: check palindrome using reverse
function isPalindrome(num) {
  return num === reverseNumber(num);
}
console.log("\\nisPalindrome(121)  =", isPalindrome(121));   // true
console.log("isPalindrome(123)  =", isPalindrome(123));   // false
console.log("isPalindrome(1221) =", isPalindrome(1221));  // true

// ── for...of loop ─────────────────────────────
console.log("\\nfor...of (array values):");
const fruits = ["Apple", "Banana", "Cherry"];
for (const fruit of fruits) {
  console.log(" ", fruit);
}

// for...of with index using entries()
console.log("\\nfor...of with index:");
for (const [index, fruit] of fruits.entries()) {
  console.log(\`  [\${index}] \${fruit}\`);
}

// ── for...in loop ─────────────────────────────
console.log("\\nfor...in (object keys):");
const user = { name: "Alice", age: 25, role: "Dev" };
for (const key in user) {
  console.log(\`  \${key}: \${user[key]}\`);
}
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the difference between for...of and for...in? When would you use each?",
        difficulty: "Easy",
        hint: "for...of iterates over the values of an iterable (array, string, Set, Map). for...in iterates over the enumerable property keys of an object. Avoid for...in on arrays — it may also enumerate inherited prototype properties and does not guarantee order. Use for...of for arrays and for...in for plain objects.",
      },
      {
        question:
          "How would you reverse a number using a while loop without converting it to a string?",
        difficulty: "Medium",
        hint: "Use a while loop that runs while n > 0. Each iteration: extract the last digit with n % 10, push it into the result with reversed = reversed * 10 + digit, then strip the last digit with Math.floor(n / 10). Handle negatives and leading-zero edge cases separately.",
      },
      {
        question:
          "What is the difference between a while loop and a do-while loop? When would you prefer do-while?",
        difficulty: "Easy",
        hint: "A while loop checks the condition before the body — it may never execute. A do-while always runs the body at least once, then checks the condition. Use do-while when at least one execution is required, such as reading the first Fibonacci term before deciding to continue, or prompting a user for input until it is valid.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Functions
  // ─────────────────────────────────────────────
  {
    id: "functions",
    title: "Functions",
    slug: "functions",
    icon: "FunctionSquare",
    difficulty: "Beginner",
    description:
      "Understand how to define and call functions in JavaScript using normal and arrow syntax, pass parameters, and return values.",
    concept: {
      explanation:
        "A function is a named, reusable block of code that performs a specific task. You define it once and call it as many times as needed. JavaScript has two main syntaxes: function declarations (function name() {}) are hoisted — you can call them before they appear in the file. Arrow functions (const name = () => {}) are not hoisted and have no own 'this' binding, making them ideal for callbacks and short expressions. Parameters are the named placeholders in the function definition; arguments are the actual values passed when calling the function. The return keyword sends a value back to the caller; without it, the function returns undefined.",
      realLifeAnalogy:
        "A function is like a recipe. The recipe title is the function name. The ingredient list is the parameters. Following the steps is executing the body. The finished dish is the return value. You write the recipe once and use it whenever you want, passing in different ingredients (arguments) each time to get a customised result.",
      keyPoints: [
        "function declarations are hoisted — arrow functions and function expressions are not",
        "Arrow functions with a single expression can omit {} and return: (x) => x * 2",
        "Parameters are local to the function — changes inside do not affect outer variables (for primitives)",
        "A function without a return statement implicitly returns undefined",
        "You can provide default parameter values: function greet(name = 'World') {}",
        "Rest parameters (...args) collect all extra arguments into an array",
        "Arrow functions inherit 'this' from the surrounding scope — normal functions have their own 'this'",
        "Functions are first-class values — they can be assigned to variables, passed as arguments, and returned",
      ],
      timeComplexity:
        "O(1) to call a function — the body's complexity depends on what it does",
      spaceComplexity:
        "O(n) for the call stack when functions are nested or recursive",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Functions in JavaScript =====

// ── Normal function (hoisted) ──────────────────
function add(a, b) {
  return a + b;
}
console.log("add(3, 4) =", add(3, 4)); // 7

// Can call before definition because of hoisting
console.log("square(5) =", square(5)); // 25
function square(n) {
  return n * n;
}

// ── Arrow function ─────────────────────────────
const multiply = (a, b) => a * b;          // implicit return
const cube     = (n)    => n * n * n;
const greet    = (name) => \`Hello, \${name}!\`;

console.log("\\nmultiply(4, 5) =", multiply(4, 5)); // 20
console.log("cube(3)        =", cube(3));          // 27
console.log("greet('Alice') =", greet("Alice"));   // Hello, Alice!

// Multi-line arrow function (needs {} and return)
const divide = (a, b) => {
  if (b === 0) return "Cannot divide by zero";
  return a / b;
};
console.log("divide(10, 3) =", divide(10, 3)); // 3.333...
console.log("divide(5, 0)  =", divide(5, 0));  // Cannot divide by zero

// ── Parameters & defaults ──────────────────────
function power(base, exponent = 2) {  // default parameter
  return Math.pow(base, exponent);
}
console.log("\\npower(3)    =", power(3));     // 9  (exponent defaults to 2)
console.log("power(2, 10) =", power(2, 10));  // 1024

// ── Rest parameters ───────────────────────────
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log("\\nsum(1,2,3)      =", sum(1, 2, 3));        // 6
console.log("sum(10,20,30,40) =", sum(10, 20, 30, 40));  // 100

// ── Return values ──────────────────────────────
function minMax(arr) {
  return { min: Math.min(...arr), max: Math.max(...arr) };
}
const { min, max } = minMax([3, 1, 7, 2, 9, 4]);
console.log("\\nArray: [3,1,7,2,9,4]");
console.log("min =", min, "| max =", max); // 1 | 9

// ── Functions as values (first-class) ─────────
function applyTwice(fn, value) {
  return fn(fn(value));
}
console.log("\\napplyTwice(square, 3)   =", applyTwice(square, 3));   // 81
console.log("applyTwice(cube, 2)     =", applyTwice(cube, 2));       // 512
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the difference between a function declaration and a function expression (or arrow function)?",
        difficulty: "Easy",
        hint: "Function declarations are hoisted — you can call them before they appear in the code. Function expressions and arrow functions are not hoisted; accessing them before their line throws a ReferenceError (TDZ). Arrow functions also lack their own 'this' and cannot be used as constructors.",
      },
      {
        question:
          "When would you use an arrow function over a normal function?",
        difficulty: "Easy",
        hint: "Use arrow functions for short callbacks and when you want to inherit 'this' from the surrounding scope (e.g. inside class methods or event handlers). Use normal functions when you need 'this' binding, the arguments object, or when defining methods that will be called with 'new'.",
      },
      {
        question:
          "What does a function return if it has no return statement? What is the difference between returning undefined and returning null?",
        difficulty: "Medium",
        hint: "A function without a return statement (or with a bare return;) returns undefined — the engine's signal for 'no value assigned'. Returning null is an explicit programmer choice meaning 'intentionally empty'. Both are falsy, but undefined means the function did not produce a value, while null means it deliberately returned nothing.",
      },
    ],
  },
  // ─────────────────────────────────────────────
  // 3. Arrays
  // ─────────────────────────────────────────────
  {
    id: "arrays",
    title: "Arrays",
    slug: "arrays",
    icon: "LayoutGrid",
    difficulty: "Beginner",
    description:
      "Master JavaScript's most important data structure — arrays. Learn the 9 essential built-in methods (push, pop, shift, unshift, slice, splice, map, filter, reduce) and solve core practice problems: reverse, find max, and remove duplicates.",
    concept: {
      explanation:
        "An array is an ordered collection of elements stored at contiguous indices starting from 0. In JavaScript, arrays are dynamic — they grow and shrink automatically. Every array method falls into one of two categories: mutating methods (push, pop, shift, unshift, splice) change the original array in place; non-mutating methods (slice, map, filter, reduce) leave the original untouched and return a new value. Knowing which category a method belongs to prevents subtle bugs. The higher-order methods — map, filter, reduce — are essential for writing clean, functional-style code without loops.",
      realLifeAnalogy:
        "An array is like a numbered ticket line. push/pop work at the back of the line (fast — O(1)). shift/unshift work at the front — everyone has to shuffle to make room (slow — O(n)). slice is like taking a photo of a section of the line (no one moves). splice is a bouncer who removes specific people and can insert new ones in their place. map hands everyone in line a new ticket with a different number. filter sends some people home. reduce counts the total remaining.",
      keyPoints: [
        "push(x) — adds x to the end, returns new length — O(1)",
        "pop() — removes and returns the last element — O(1)",
        "shift() — removes and returns the first element — O(n) (all indices shift)",
        "unshift(x) — adds x to the front — O(n) (all indices shift)",
        "slice(start, end) — returns a new sub-array from start to end (exclusive), original unchanged",
        "splice(start, deleteCount, ...items) — removes deleteCount elements and optionally inserts items in place",
        "map(fn) — returns a new array where every element is transformed by fn",
        "filter(fn) — returns a new array with only the elements where fn returns true",
        "reduce(fn, init) — reduces the array to a single value by accumulating with fn",
        "Practice: Reverse array (two-pointer), Find max (linear scan), Remove duplicates (Set lookup O(1))",
      ],
      timeComplexity:
        "push/pop: O(1) | shift/unshift: O(n) | slice/map/filter/reduce: O(n) | Access by index: O(1) | Search: O(n)",
      spaceComplexity:
        "O(1) for push/pop/shift/unshift (in-place) | O(n) for slice/map/filter (new array)",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Arrays — All Essential Methods + Practice =====

const arr = [3, 7, 1, 9, 4, 6];
console.log("Original:", arr);

// ── Mutating methods ───────────────────────────
arr.push(10);
console.log("\\npush(10):", arr);         // adds to end

const popped = arr.pop();
console.log("pop():", popped, "| arr:", arr); // removes from end

const shifted = arr.shift();
console.log("shift():", shifted, "| arr:", arr); // removes from front

arr.unshift(0);
console.log("unshift(0):", arr);         // adds to front

// splice(start, deleteCount, ...insert)
const removed = arr.splice(2, 2, 99, 100);
console.log("splice(2, 2, 99, 100):", arr, "| removed:", removed);

// ── Non-mutating methods ───────────────────────
const original = [3, 7, 1, 9, 4, 6];
console.log("\\nWorking with:", original);

const sliced = original.slice(1, 4);
console.log("slice(1, 4):", sliced);           // [7, 1, 9]  original unchanged

const doubled = original.map(x => x * 2);
console.log("map(x => x*2):", doubled);        // [6, 14, 2, 18, 8, 12]

const evens = original.filter(x => x % 2 === 0);
console.log("filter(even):", evens);           // [4, 6]

const sum = original.reduce((acc, x) => acc + x, 0);
console.log("reduce(sum):", sum);              // 30

// ── Practice 1: Reverse array (two-pointer) ───
function reverseArray(arr) {
  const a = [...arr];
  let l = 0, r = a.length - 1;
  while (l < r) {
    [a[l], a[r]] = [a[r], a[l]];
    l++; r--;
  }
  return a;
}
console.log("\\nReverse [3,7,1,9,4,6]:", reverseArray([3, 7, 1, 9, 4, 6]));

// ── Practice 2: Find max element ──────────────
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
console.log("findMax([3,7,1,9,4,6]):", findMax([3, 7, 1, 9, 4, 6])); // 9

// Using built-in:
console.log("Math.max(...arr):", Math.max(...[3, 7, 1, 9, 4, 6]));   // 9

// ── Practice 3: Remove duplicates ─────────────
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
console.log("\\nRemove duplicates [1,2,2,3,4,4,5]:", removeDuplicates([1, 2, 2, 3, 4, 4, 5]));

// Manual approach with Set for O(n):
function removeDuplicatesManual(arr) {
  const seen = new Set();
  return arr.filter(x => {
    if (seen.has(x)) return false;
    seen.add(x);
    return true;
  });
}
console.log("Manual dedupe [5,1,5,3,1]:", removeDuplicatesManual([5, 1, 5, 3, 1]));
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the difference between slice and splice? Which one mutates the original array?",
        difficulty: "Easy",
        hint: "slice(start, end) returns a new sub-array and never changes the original. splice(start, deleteCount, ...items) mutates the original array by removing elements and optionally inserting new ones in their place. Remember: splice is destructive, slice is safe.",
      },
      {
        question:
          "How do map, filter, and reduce differ? Write a single reduce that does what filter + map would do.",
        difficulty: "Medium",
        hint: "map transforms every element (same length). filter keeps only elements matching a condition (shorter or equal). reduce accumulates into any shape. A single reduce can do both: reduce((acc, x) => { if (condition(x)) acc.push(transform(x)); return acc; }, []). This avoids two full passes over the array.",
      },
      {
        question:
          "How would you remove duplicates from an array efficiently? What is the time and space complexity of using a Set?",
        difficulty: "Medium",
        hint: "Use [...new Set(arr)] — Set uses a hash table so each lookup/insert is O(1) average. Total time: O(n), space: O(n) for the Set. This is optimal since you must read every element at least once. The naive double-loop approach is O(n²) — avoid it in interviews.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Strings
  // ─────────────────────────────────────────────
  {
    id: "strings",
    title: "Strings",
    slug: "strings",
    icon: "Type",
    difficulty: "Beginner",
    description:
      "Master the 5 essential string methods — .length, .toLowerCase(), .split(), .replace(), .includes() — and solve core string problems: Palindrome, Count Vowels, and Reverse String.",
    concept: {
      explanation:
        "A string is an immutable sequence of characters in JavaScript. Once created, you cannot change individual characters — every method that seems to modify a string actually returns a new one. The five most-used string methods are: .length (character count), .toLowerCase() (case normalisation), .split(sep) (breaks string into an array), .replace(search, rep) (substitution), and .includes(sub) (existence check). These five cover the vast majority of string manipulation you will encounter in both everyday coding and coding interviews.",
      realLifeAnalogy:
        "Think of a string like a printed book. .length is like counting the pages. .toLowerCase() is reprinting the book in all lowercase — the original is unchanged. .split() tears the book at every separator into individual cards. .replace() uses correction fluid to swap the first matching word. .includes() answers 'does this book contain the word X anywhere?'",
      keyPoints: [
        "Strings are immutable — every method returns a new string, the original is untouched",
        ".length is a property (no parentheses): str.length → number of characters — O(1)",
        ".toLowerCase() returns all characters as lowercase — ideal for case-insensitive comparisons",
        ".split(sep) turns a string into an array: 'a,b,c'.split(',') → ['a','b','c']",
        ".replace(search, rep) replaces only the FIRST match — use regex /pattern/g to replace all",
        ".includes(sub) returns true/false — O(n) scan through the string",
        "Palindrome: clean the string, compare characters from both ends with two pointers — O(n)",
        "Count vowels: iterate each character and check against 'aeiouAEIOU' — O(n)",
        "Reverse string: split → two-pointer swap → join — O(n) time, O(n) space",
      ],
      timeComplexity:
        ".length: O(1) | .toLowerCase() / .split() / .replace() / .includes(): O(n)",
      spaceComplexity: "O(n) — all methods create a new string or array",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Strings — 5 Essential Methods + Practice =====

const str = "Hello, World!";
console.log("Original:", str);

// ── .length ───────────────────────────────────
console.log("\n.length (property, not a function):");
console.log("  str.length:", str.length);           // 13

// ── .toLowerCase() ────────────────────────────
console.log("\n.toLowerCase():");
console.log("  result:", str.toLowerCase());         // "hello, world!"
console.log("  original unchanged:", str);           // still "Hello, World!"

// ── .split() ──────────────────────────────────
console.log("\n.split():");
const words = str.split(" ");
console.log("  split by space:", words);
const chars = "abc".split("");
console.log('  split by "" :', chars);

// ── .replace() ────────────────────────────────
console.log("\n.replace():");
console.log("  replace 1st 'l':", str.replace("l", "*"));
console.log("  replace all 'l':", str.replace(/l/g, "*"));

// ── .includes() ───────────────────────────────
console.log("\n.includes():");
console.log("  includes 'World':", str.includes("World"));   // true
console.log("  includes 'world':", str.includes("world"));   // false

// ── Practice 1: Palindrome (two-pointer) ──────
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let l = 0, r = clean.length - 1;
  while (l < r) {
    if (clean[l] !== clean[r]) return false;
    l++; r--;
  }
  return true;
}
console.log("\nisPalindrome('racecar'):", isPalindrome("racecar")); // true
console.log("isPalindrome('hello'):",   isPalindrome("hello"));     // false

// ── Practice 2: Count Vowels ──────────────────
function countVowels(s) {
  let count = 0;
  for (const ch of s) {
    if ("aeiouAEIOU".includes(ch)) count++;
  }
  return count;
}
console.log("\ncountVowels('Hello World'):", countVowels("Hello World")); // 3

// ── Practice 3: Reverse String (two-pointer) ──
function reverseString(s) {
  const chars = s.split("");
  let l = 0, r = chars.length - 1;
  while (l < r) {
    [chars[l], chars[r]] = [chars[r], chars[l]];
    l++; r--;
  }
  return chars.join("");
}
console.log("\nreverseString('hello'):", reverseString("hello")); // "olleh"
`,
    },
    interviewQuestions: [
      {
        question:
          "Why are strings immutable in JavaScript and what does that mean for string operations?",
        difficulty: "Easy",
        hint: "Immutability means you cannot change individual characters after creation. Methods like replace(), toLowerCase(), slice() all return NEW strings — they never modify the original. This means str[0] = 'X' silently fails. It also means building a string by concatenating in a loop is O(n²) — prefer an array of parts joined at the end.",
      },
      {
        question:
          "What is the difference between .replace('x', 'y') and .replace(/x/g, 'y')?",
        difficulty: "Easy",
        hint: ".replace('x', 'y') with a string argument replaces only the FIRST occurrence. To replace all occurrences use a regex with the global flag: .replace(/x/g, 'y'). In modern JS (ES2021+) you can also use .replaceAll('x', 'y').",
      },
      {
        question:
          "How would you check if a string is a palindrome while ignoring spaces and punctuation?",
        difficulty: "Medium",
        hint: "First clean: s.toLowerCase().replace(/[^a-z0-9]/g, '') removes everything that is not a letter or digit. Then use two pointers: l=0 and r=length-1, compare and move inward. If any pair mismatches return false; if all match return true. Time: O(n), Space: O(n) for the cleaned copy.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Objects
  // ─────────────────────────────────────────────
  {
    id: "objects",
    title: "Objects",
    slug: "objects",
    icon: "Box",
    difficulty: "Beginner",
    description:
      "Master JavaScript objects — key-value pairs, property access with dot & bracket notation, and looping techniques like for...in and Object.entries().",
    concept: {
      explanation:
        "An object is a collection of key-value pairs. Keys are strings (or Symbols) and values can be any type — numbers, strings, arrays, even other objects. Objects let you group related data under one variable and look up any piece of data instantly by name.",
      realLifeAnalogy:
        "Think of an object like a contact card. Each field (name, phone, email) is a key, and the information stored in that field is the value. You can look up any detail by its label, add new fields, change existing ones, or remove fields you no longer need.",
      keyPoints: [
        "Create an object with curly braces: const obj = { key: value }",
        "Dot notation for known keys: obj.name — fast and readable",
        "Bracket notation for dynamic keys: obj[\'key\'] or obj[variable]",
        "Add a property: obj.newKey = value",
        "Delete a property: delete obj.key",
        "for...in iterates over all enumerable string keys of an object",
        "Object.keys(obj) returns an array of all keys",
        "Object.values(obj) returns an array of all values",
        "Object.entries(obj) returns [key, value] pairs — great for loops and transformations",
      ],
      timeComplexity:
        "Get / Set / Delete by key: O(1) average | Object.keys / values / entries: O(n) | Searching for a value: O(n)",
      spaceComplexity: "O(n) where n is the number of key-value pairs",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Objects =====

// --- Key-Value Pairs ---
const person = {
  name: "Alice",
  age: 28,
  city: "New York",
};
console.log("Object:", person);

// Add & delete properties
person.email = "alice@example.com";
delete person.city;
console.log("After add/delete:", person);

// --- Accessing Properties ---
console.log("\\nDot notation:     person.name  →", person.name);
console.log("Bracket notation: person[\'age\'] →", person["age"]);

const field = "email";
console.log("Dynamic access:   person[field] →", person[field]);

// --- Looping Objects ---
const scores = { math: 95, science: 88, english: 92 };

console.log("\\nfor...in:");
for (const key in scores) {
  console.log(\`  \${key}: \${scores[key]}\`);
}

console.log("Object.keys():   ", Object.keys(scores));
console.log("Object.values():  ", Object.values(scores));
console.log("Object.entries():", Object.entries(scores));

// --- Practice Problems ---

// 1. Word Frequency
function wordFrequency(sentence) {
  const freq = {};
  for (const word of sentence.split(" ")) {
    freq[word] = (freq[word] || 0) + 1;
  }
  return freq;
}
console.log("\\nWord frequency:", wordFrequency("the cat sat on the mat the cat"));

// 2. Invert Object
function invertObject(obj) {
  const inv = {};
  for (const [k, v] of Object.entries(obj)) {
    inv[v] = k;
  }
  return inv;
}
console.log("Inverted:", invertObject({ a: 1, b: 2, c: 3 }));

// 3. Find Key by Value
function findKeyByValue(obj, target) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === target) return k;
  }
  return null;
}
const capitals = { France: "Paris", Japan: "Tokyo", India: "Delhi" };
console.log("Find key for \'Tokyo\':", findKeyByValue(capitals, "Tokyo"));`,
    },
    interviewQuestions: [
      {
        question:
          "What is the difference between dot notation and bracket notation when accessing object properties?",
        difficulty: "Easy",
        hint: "Dot notation (obj.key) works when you know the key name at write time and it is a valid identifier. Bracket notation (obj[\'key\'] or obj[variable]) is needed when the key is dynamic (stored in a variable), contains spaces, or starts with a number.",
      },
      {
        question:
          "What is the difference between for...in and Object.keys() for iterating over an object?",
        difficulty: "Easy",
        hint: "for...in iterates over all enumerable properties including inherited ones from the prototype chain. Object.keys() returns only the object\'s own enumerable string keys as an array. In practice, use Object.keys() to avoid accidentally iterating over prototype properties.",
      },
      {
        question:
          "How would you count the frequency of each word in a sentence using an object?",
        difficulty: "Medium",
        hint: "Split the sentence by spaces to get words. Loop over the words array. For each word, check if it is already a key: freq[word] = (freq[word] || 0) + 1. This runs in O(n) time and O(k) space where k is the number of unique words.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Map
  // ─────────────────────────────────────────────
  {
    id: "map",
    title: "Map",
    slug: "map",
    icon: "Hash",
    difficulty: "Intermediate",
    description:
      "Master JavaScript Map — a key-value data structure that outperforms plain objects for DSA problems. Any key type, guaranteed insertion order, and O(1) lookups.",
    concept: {
      explanation:
        "A Map is a collection of key-value pairs where keys can be ANY type — numbers, objects, booleans, or strings. Unlike plain objects, Maps maintain insertion order, have a built-in .size property, and avoid prototype chain issues. Maps are one of the most important tools in DSA interviews: they power frequency counters, Two Sum, sliding window, and grouping problems.",
      realLifeAnalogy:
        "Think of a Map like a real dictionary with sticky tabs. Each tab (key) can be ANY shape — a word, a number, or even a photo. The page it points to is the value. You can instantly flip to any tab, add new ones, remove old ones, or count how many tabs you have — all in O(1).",
      keyPoints: [
        "new Map() or new Map([[key, val], ...]) — create a Map",
        "map.set(key, value) — add or update; returns the Map (chainable)",
        "map.get(key) — retrieve value; returns undefined if not found",
        "map.has(key) — returns true/false; O(1) check",
        "map.delete(key) — removes entry; returns true if key existed",
        "map.size — number of entries as a property, not a function; O(1)",
        "map.clear() — removes all entries",
        "map.keys(), map.values(), map.entries() — return iterators",
        "map.forEach((value, key) => {}) — note value comes FIRST",
        "for (const [key, val] of map) — cleanest way to iterate",
        "new Map(Object.entries(obj)) — convert object to Map",
        "Object.fromEntries(map) — convert Map back to plain object",
        "Map vs Object: Map accepts any key type; plain objects coerce keys to strings",
      ],
      timeComplexity:
        "set / get / has / delete: O(1) average | Iteration: O(n) | map.size: O(1)",
      spaceComplexity: "O(n) where n is the number of key-value pairs",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Map =====

// --- Creating ---
const map = new Map();
map.set("name", "Alice");
map.set("age", 28);
map.set(42, "number key");     // any key type!
map.set(true, "boolean key");
console.log("size:", map.size);     // 4 (property, not function)

// --- get / has ---
console.log(map.get("name"));  // "Alice"
console.log(map.get("x"));    // undefined
console.log(map.has("age"));   // true
console.log(map.has("x"));     // false

// --- delete / clear ---
map.delete("age");
console.log("after delete, size:", map.size);   // 3
// map.clear(); → size becomes 0

// --- Iterating ---
const scores = new Map([["math", 95], ["science", 88], ["english", 92]]);

for (const [key, val] of scores) {
  console.log(\`\${key}: \${val}\`);
}

// forEach — value is FIRST, key is SECOND!
scores.forEach((val, key) => console.log(key, "→", val));

console.log([...scores.keys()]);    // ["math","science","english"]
console.log([...scores.values()]);  // [95, 88, 92]
console.log([...scores.entries()]); // [["math",95], ...]

// --- Converting ---
const obj = { x: 1, y: 2 };
const mapFromObj = new Map(Object.entries(obj));
const backToObj = Object.fromEntries(scores);
console.log("Map → Object:", backToObj);

// --- Map vs Object (key coercion) ---
const o = {};
o[1] = "num"; o["1"] = "str";
console.log("obj[1]:", o[1]);        // "str" — coerced!

const m = new Map();
m.set(1, "num"); m.set("1", "str");
console.log("map.get(1):", m.get(1));    // "num" ✅
console.log("map.get('1'):", m.get("1")); // "str" ✅

// --- Practice: Character Frequency ---
function charFrequency(str) {
  const freq = new Map();
  for (const ch of str) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }
  return [...freq.entries()].sort((a, b) => b[1] - a[1]);
}
console.log("charFreq('hello'):", charFrequency("hello"));

// --- Practice: Two Sum with Map ---
function twoSum(nums, target) {
  const seen = new Map(); // { value → index }
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return null;
}
console.log("twoSum([2,7,11,15], 9):", twoSum([2, 7, 11, 15], 9));

// --- Practice: First Non-Repeating Character ---
function firstNonRepeating(str) {
  const freq = new Map();
  for (const ch of str) freq.set(ch, (freq.get(ch) || 0) + 1);
  for (const ch of str) {
    if (freq.get(ch) === 1) return ch;
  }
  return null;
}
console.log("firstNonRepeating('leetcode'):", firstNonRepeating("leetcode"));`,
    },
    interviewQuestions: [
      {
        question:
          "Why would you use a Map instead of a plain object for frequency counting in a DSA problem?",
        difficulty: "Easy",
        hint: "Maps allow any key type (including numbers and objects), have a .size property for O(1) count, maintain insertion order, and avoid prototype chain issues (e.g., a key named 'constructor' or 'toString' would clash in a plain object but not in a Map).",
      },
      {
        question:
          "Solve Two Sum in O(n) using a Map. Explain why Map gives a better solution than nested loops.",
        difficulty: "Medium",
        hint: "For each nums[i], compute complement = target - nums[i]. Check if seen.has(complement) — if yes, return [seen.get(complement), i]. Otherwise, seen.set(nums[i], i). Map lookup is O(1), making the overall solution O(n) vs O(n²) for nested loops.",
      },
      {
        question:
          "How would you find the first non-repeating character in a string using a Map?",
        difficulty: "Medium",
        hint: "First pass: build a frequency Map — for each character, freq.set(ch, (freq.get(ch) || 0) + 1). Second pass: iterate the original string and return the first character where freq.get(ch) === 1. Two passes = O(n), Map lookups = O(1).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Set
  // ─────────────────────────────────────────────
  {
    id: "set",
    title: "Set",
    slug: "set",
    icon: "CircleDot",
    difficulty: "Intermediate",
    description:
      "Master JavaScript Set — a collection of unique values with O(1) lookups. Essential for removing duplicates, checking existence, and set math (union, intersection, difference).",
    concept: {
      explanation:
        "A Set is a collection that stores unique values of any type. It automatically ignores duplicate insertions, making it perfect for deduplication. The key power of Set is its O(1) .has() method — unlike an array's .includes() which is O(n). Sets also support mathematical set operations: union, intersection, and difference.",
      realLifeAnalogy:
        "Think of a Set like a guest list at an exclusive party. Each guest's name appears exactly once — you can quickly check 'is this person on the list?' (has), add new names (add), cross someone off (delete), or count how many are on the list (size). Trying to add a duplicate name just does nothing.",
      keyPoints: [
        "new Set() or new Set([...iterable]) — create a Set; duplicates are ignored",
        "set.add(value) — adds value and returns the Set (chainable); ignored if already present",
        "set.has(value) — O(1) membership check; true/false",
        "set.delete(value) — removes value; returns true if it existed, false otherwise",
        "set.size — number of unique values; a property, not a function",
        "set.clear() — removes all values",
        "for (const val of set) — iterates in insertion order",
        "set.forEach((value) => {}) — forEach callback receives (value, value, set)",
        "set.keys(), set.values(), set.entries() — all return iterators (keys === values in a Set)",
        "[...set] or Array.from(set) — convert Set to array",
        "Union: new Set([...a, ...b])",
        "Intersection: new Set([...a].filter(x => b.has(x)))",
        "Difference: new Set([...a].filter(x => !b.has(x)))",
        "Set.has() is O(1) vs Array.includes() which is O(n) — prefer Set for repeated lookups",
      ],
      timeComplexity:
        "add / has / delete: O(1) average | Iteration: O(n) | set.size: O(1)",
      spaceComplexity: "O(n) where n is the number of unique values",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Set =====

// --- Creating ---
const set = new Set([1, 2, 3, 3, 4, 4, 5]); // duplicates ignored
console.log("size:", set.size);  // 5 (property, not function)
console.log([...set]);           // [1, 2, 3, 4, 5]

// --- add / has / delete / clear ---
set.add(6);         // returns the Set (chainable)
set.add(3);         // ignored — 3 already exists
console.log("after add(6) and add(3):", [...set]);

console.log(set.has(3));   // true
console.log(set.has(99));  // false

set.delete(1);
console.log("after delete(1):", [...set]);

// set.clear(); → size becomes 0

// --- Iterating ---
const fruits = new Set(["apple", "banana", "cherry"]);

for (const val of fruits) {
  console.log(val);
}

// forEach — (value, value, set) — value appears twice!
fruits.forEach((val) => console.log(val));

// Convert to array
console.log([...fruits]);
console.log(Array.from(fruits));

// keys(), values(), entries() — keys === values in a Set
console.log([...fruits.values()]);
console.log([...fruits.entries()]); // [["apple","apple"], ...]

// --- Set Operations ---
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

// Union (A ∪ B)
const union = new Set([...a, ...b]);
console.log("Union:        ", [...union]);

// Intersection (A ∩ B)
const intersection = new Set([...a].filter(x => b.has(x)));
console.log("Intersection: ", [...intersection]);

// Difference (A − B)
const difference = new Set([...a].filter(x => !b.has(x)));
console.log("Difference:   ", [...difference]);

// --- Why Set over Array for lookups? ---
const arr = [1, 2, 3, 4, 5];
const s = new Set(arr);

console.log("\\nArray.includes(3):", arr.includes(3));  // O(n)
console.log("Set.has(3):       ", s.has(3));           // O(1) ✅

// --- Practice: Remove Duplicates ---
const nums = [1, 2, 3, 2, 1, 4, 3, 5];
const unique = [...new Set(nums)];
console.log("\\nRemove duplicates:", unique);

// --- Practice: Contains Duplicate ---
function containsDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}
console.log("containsDuplicate([1,2,3,1]):", containsDuplicate([1, 2, 3, 1]));
console.log("containsDuplicate([1,2,3,4]):", containsDuplicate([1, 2, 3, 4]));

// --- Practice: Array Intersection ---
function arrayIntersection(arr1, arr2) {
  const setA = new Set(arr1);
  return [...new Set(arr2.filter(x => setA.has(x)))];
}
console.log("Intersection [1,2,3] ∩ [2,3,4]:", arrayIntersection([1,2,3], [2,3,4]));`,
    },
    interviewQuestions: [
      {
        question:
          "Why is Set.has() preferred over Array.includes() in DSA problems? Give an example.",
        difficulty: "Easy",
        hint: "Array.includes() is O(n) — it scans every element. Set.has() is O(1) — instant hash-based lookup. In problems like 'Contains Duplicate' or 'Two Sum', if you use an array for lookups, the solution is O(n²). Switching to a Set makes it O(n).",
      },
      {
        question:
          "How would you find the intersection of two large arrays efficiently using Set?",
        difficulty: "Medium",
        hint: "Convert arr1 to a Set (O(n)). Then filter arr2, keeping only elements that the Set has (O(m)). Wrap in a Set to remove duplicates. Total: O(n+m). Without Set, nested loops would be O(n*m). Code: const s = new Set(arr1); return [...new Set(arr2.filter(x => s.has(x)))].",
      },
      {
        question:
          "How would you check if an array contains any duplicate values in O(n) time?",
        difficulty: "Easy",
        hint: "Use a Set. For each element, check if seen.has(element) — if yes, return true immediately. Otherwise, seen.add(element). If you finish the loop without finding a duplicate, return false. Alternatively, return arr.length !== new Set(arr).size.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. Objects vs Map
  // ─────────────────────────────────────────────
  {
    id: "objects-vs-map",
    title: "Objects vs Map",
    slug: "objects-vs-map",
    icon: "Scale",
    difficulty: "Intermediate",
    description:
      "Understand when to use a plain Object versus a Map: key types, insertion-order guarantees, .size, prototype safety, and performance trade-offs.",
    concept: {
      explanation:
        "Both Object and Map store key-value pairs, but they have important differences. An Object's keys are always coerced to strings (or Symbols), has no built-in .size, inherits prototype properties that can collide with your data, and sorts integer-like keys numerically. A Map accepts any value as a key (objects, functions, numbers), provides an O(1) .size property, guarantees strict insertion order for all keys, has no prototype chain to worry about, and is optimised by JavaScript engines for frequent add/delete operations.",
      realLifeAnalogy:
        "An Object is like a paper form with pre-printed field names — you fill in string labels and their values. A Map is like a notebook where you can write any label you want: numbers, sticky-note references, or even other objects. The notebook also tells you instantly how many entries it has, and entries always appear in the order you wrote them.",
      keyPoints: [
        "Object keys are always strings or Symbols; Map keys can be any value",
        "map.size is O(1); Object.keys(obj).length is O(n)",
        "Map guarantees insertion order for all keys; Object sorts integer-like keys first",
        "'key' in obj checks the prototype chain; map.has(key) does not",
        "Map is faster for frequent additions and deletions (engine-optimised hash map)",
        "Use Object for static config, JSON serialisation, or when keys are known strings",
        "Use Map when keys are dynamic, non-string, or order must be preserved",
        "JSON.stringify works on Object directly; Map needs [...map] conversion first",
      ],
      timeComplexity: "get/set/has/delete: O(1) average for both",
      spaceComplexity: "O(n) for n entries in both",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Objects vs Map — key differences =====

// ── 1. Key types ──────────────────────────────
const obj = {};
const map = new Map();

const keyObj = { id: 1 };   // object as key
obj[keyObj] = "value";       // coerced → "[object Object]"
map.set(keyObj, "value");    // stored as reference ✅

console.log("obj key:", Object.keys(obj)[0]); // "[object Object]"
console.log("map key:", map.has(keyObj));      // true

// ── 2. Size ───────────────────────────────────
const scores = { alice: 90, bob: 80, carol: 95 };
const scoreMap = new Map([["alice",90],["bob",80],["carol",95]]);

console.log("\nSize (Object):", Object.keys(scores).length); // O(n)
console.log("Size (Map):",    scoreMap.size);                // O(1) ✅

// ── 3. Iteration order (integer-like keys) ────
const o = {}; o["10"]="ten"; o["1"]="one"; o["2"]="two"; o["name"]="Alice";
const m = new Map();
m.set("10","ten"); m.set("1","one"); m.set("2","two"); m.set("name","Alice");

console.log("\nObject keys:", Object.keys(o));  // ["1","2","10","name"] ⚠️
console.log("Map keys:  ", [...m.keys()]);      // ["10","1","2","name"] ✅

// ── 4. Prototype safety ───────────────────────
const danger = {};
console.log("\n'constructor' in obj:", "constructor" in danger); // true ⚠️
console.log("map.has('constructor'):", m.has("constructor"));    // false ✅
`,
    },
    interviewQuestions: [
      {
        question: "Why is Map preferred over Object for a frequency counter?",
        difficulty: "Easy",
        hint: "Three reasons: (1) map.size gives the count of distinct keys in O(1) vs Object.keys(freq).length which is O(n); (2) map.has(key) is prototype-safe — you won't accidentally match 'constructor', 'toString', etc.; (3) Map is optimised by JS engines for frequent set/get operations. The pattern: map.set(key, (map.get(key) ?? 0) + 1).",
      },
      {
        question:
          "Can you use an object as a key in a Map? What happens if you try the same with a plain Object?",
        difficulty: "Medium",
        hint: "Yes — Map stores keys by reference (identity), so two different objects with identical properties are treated as different keys. With a plain Object, any non-string/Symbol key is coerced via toString(), so {} becomes '[object Object]'. All object keys collapse to the same string. This makes Map essential when you need a lookup table keyed by DOM nodes, class instances, or other reference types.",
      },
      {
        question:
          "When would you still choose a plain Object over a Map?",
        difficulty: "Medium",
        hint: "Choose Object when: (1) you need JSON serialisation (JSON.stringify handles Object natively; Map requires [...map] then manual conversion); (2) keys are static, well-known strings — literal object syntax { name: 'Alice' } is far more readable than a Map; (3) you use destructuring, spread, or rest on the data; (4) you pass data to APIs that expect plain objects (React state, Next.js props, etc.). Objects also have slightly lower memory overhead for small numbers of fixed keys.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 11. WeakMap
  // ─────────────────────────────────────────────
  {
    id: "weakmap",
    title: "WeakMap",
    slug: "weakmap",
    icon: "Ghost",
    difficulty: "Intermediate",
    description:
      "A Map variant that holds weak references to object keys — when the key object is garbage collected, the entry disappears automatically. Perfect for private class data and caching.",
    concept: {
      explanation:
        "A WeakMap is a collection of key-value pairs where keys must be objects (or non-registered Symbols). Unlike a regular Map, WeakMap holds only a weak reference to each key — if no other code holds a reference to that key object, the JavaScript garbage collector can reclaim it and the WeakMap entry silently disappears. This makes WeakMap invisible to the GC graph and prevents memory leaks. The trade-off: WeakMap is not iterable, has no .size, and you cannot enumerate its entries — because the set of live entries is indeterminate at any point in time.",
      realLifeAnalogy:
        "Imagine attaching a sticky note to a physical document. A regular Map is like storing the note in a filing cabinet that also keeps a copy of the document — the document can never be thrown away while the cabinet holds it. A WeakMap is like gluing the note directly to the document — if the document is shredded (GC'd), the note goes with it automatically. Nobody keeps a list of all documents with notes; you just check the document you already have.",
      keyPoints: [
        "Keys must be objects (or non-registered Symbols) — primitives throw TypeError",
        "Weak references: keys are GC'd when no other reference exists",
        "No .size, not iterable, no .forEach / .keys / .values / .entries",
        "Supported methods: .set(key, val), .get(key), .has(key), .delete(key)",
        "Primary use case 1: storing truly private class data outside the instance",
        "Primary use case 2: memoising / caching results keyed by object inputs",
        "Primary use case 3: attaching metadata to DOM nodes without leaking memory",
        "Use a regular Map when you need .size, iteration, or primitive keys",
      ],
      timeComplexity: "get/set/has/delete: O(1) average",
      spaceComplexity: "O(n) entries; entries auto-free when keys are GC'd",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== WeakMap =====

// ── 1. Basic API ──────────────────────────────
const wm = new WeakMap();
const key1 = { name: "Alice" };   // keys MUST be objects
const key2 = { name: "Bob" };

wm.set(key1, { role: "admin",  score: 95 });
wm.set(key2, { role: "viewer", score: 72 });

console.log(wm.has(key1));         // true
console.log(wm.get(key1).role);    // "admin"
wm.delete(key2);
console.log(wm.has(key2));         // false

// wm.size   → undefined  (no .size)
// [...wm]   → TypeError  (not iterable)

// ── 2. Private class data ─────────────────────
const _private = new WeakMap();

class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    _private.set(this, { balance }); // truly private!
  }
  deposit(amount) {
    _private.get(this).balance += amount;
  }
  getBalance() { return _private.get(this).balance; }
}

const acct = new BankAccount("Alice", 1000);
acct.deposit(500);
console.log("\nacct.getBalance():", acct.getBalance()); // 1500
console.log("acct.balance:    ", acct.balance);         // undefined ✅

// ── 3. Memoisation cache ──────────────────────
const cache = new WeakMap();

function processData(obj) {
  if (cache.has(obj)) { console.log("\nCache hit!"); return cache.get(obj); }
  const result = obj.values.reduce((a, b) => a + b, 0);
  cache.set(obj, result);
  return result;
}

const data = { values: [1, 2, 3, 4, 5] };
console.log("\nFirst call: ", processData(data)); // computed: 15
console.log("Second call:", processData(data));  // Cache hit!  15
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between a Map and a WeakMap?",
        difficulty: "Easy",
        hint: "Four key differences: (1) Keys — Map accepts any value; WeakMap requires object (or non-reg. Symbol) keys. (2) GC — Map holds strong references, preventing key GC; WeakMap holds weak references, allowing the key object to be collected. (3) Size/iteration — Map has .size and is iterable; WeakMap has neither (non-deterministic live entry count). (4) Use case — Map for general KV storage; WeakMap for private class data, DOM metadata, or memoisation caches where you don't want to prevent GC.",
      },
      {
        question: "Why can't WeakMap have primitive keys like strings or numbers?",
        difficulty: "Medium",
        hint: "Weak references only make sense for values that have an identity managed by the GC heap — i.e., objects. Primitives in JavaScript are value types: two strings '42' are indistinguishable; there is no single heap allocation whose lifetime could be tracked. Because the GC cannot observe 'when the last reference to the string 42 is gone', weak semantics are undefined for primitives. The spec therefore throws a TypeError if you try to set a primitive key.",
      },
      {
        question:
          "Describe the private-class-data pattern with WeakMap. How does it compare to # private fields?",
        difficulty: "Hard",
        hint: "WeakMap pattern: declare `const _priv = new WeakMap()` in module scope; in the constructor call `_priv.set(this, { secret })`. Instance methods retrieve via `_priv.get(this).secret`. Advantages: the private data cannot be reached via the instance at all — even with Object.getOwnPropertyNames or Proxy; and when the instance is GC'd, the WeakMap entry is freed too. Disadvantage: verbose, and subclasses can't easily inherit. ES2022 # private fields (`this.#secret`) are simpler, engine-optimised, and block-scoped, but they are stored on the object itself — a Proxy can intercept access. WeakMap is still preferred when you need truly off-instance storage or when supporting older transpilation targets.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Time Complexity (Big-O)
  // ─────────────────────────────────────────────
  {
    id: "time-complexity",
    title: "Time Complexity (Big-O)",
    slug: "time-complexity",
    icon: "TrendingUp",
    difficulty: "Intermediate",
    description:
      "Understand Big-O notation — the language used to describe how an algorithm's runtime grows as input size increases. Learn O(1), O(n), O(log n), and O(n²) with real examples.",
    concept: {
      explanation:
        "Big-O notation describes the worst-case growth rate of an algorithm as the input size n grows. It answers: 'If I double the input, how much slower does my code get?' O(1) means the algorithm always takes the same number of steps regardless of input size — constant time. O(n) means it scales linearly: double the input, double the work. O(log n) means it halves the problem each step — very efficient, seen in binary search. O(n²) means it scales quadratically: 10× input → 100× work, seen in nested loops. Big-O ignores constants and smaller terms: O(2n + 5) simplifies to O(n).",
      realLifeAnalogy:
        "O(1) is like looking up a word in a dictionary using its page number — instant. O(n) is like reading every page to find a word — slower as the book grows. O(log n) is like using the alphabet index to jump to the right section — you halve the search space each time. O(n²) is like comparing every person in a room to every other person — if 10 people means 100 comparisons, 100 people means 10,000.",
      keyPoints: [
        "O(1) — Constant: array index access, hash map get/set, push/pop from a stack",
        "O(n) — Linear: single loop, linear search, map/filter/reduce over an array",
        "O(log n) — Logarithmic: binary search, balanced BST operations — halves the problem each step",
        "O(n log n) — Linearithmic: efficient sorting algorithms like merge sort and quick sort",
        "O(n²) — Quadratic: nested loops comparing all pairs — bubble sort, selection sort",
        "Big-O describes the worst case — actual runtime may be better but never worse",
        "Drop constants: O(3n) → O(n). Drop smaller terms: O(n² + n) → O(n²)",
        "Space complexity uses the same notation — O(n) extra space means your memory usage scales linearly",
        "Prefer O(n) over O(n²) and O(log n) over O(n) whenever possible in interviews",
      ],
      timeComplexity:
        "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) — from best to worst",
      spaceComplexity:
        "O(1) for in-place algorithms | O(n) when auxiliary data structures scale with input",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Time Complexity (Big-O) =====

// ── O(1) — Constant Time ───────────────────────
function getFirst(arr) {
  return arr[0]; // always 1 step
}
const m = new Map([["a", 1], ["b", 2]]);
console.log("O(1) getFirst:", getFirst([10, 20, 30]));   // 10
console.log("O(1) mapLookup:", m.get("b"));              // 2

// ── O(n) — Linear Time ────────────────────────
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
console.log("\\nO(n) linearSearch:", linearSearch([3, 7, 1, 9, 4], 9)); // 3

// ── O(log n) — Logarithmic Time ───────────────
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
const sorted = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log("\\nO(log n) binarySearch for 13:", binarySearch(sorted, 13)); // 6

// ── O(n²) — Quadratic Time ────────────────────
function hasDuplicateNaive(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
// O(n) version using Set:
function hasDuplicateFast(arr) {
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}
console.log("\\nO(n²) hasDuplicateNaive:", hasDuplicateNaive([1, 2, 3, 2])); // true
console.log("O(n)  hasDuplicateFast: ", hasDuplicateFast([1, 2, 3, 2]));    // true

// ── Growth comparison ─────────────────────────
console.log("\\n--- Growth at different n ---");
for (const n of [10, 100, 1000]) {
  console.log(\`n=\${n}: O(1)=1  O(log n)=\${Math.round(Math.log2(n))}  O(n)=\${n}  O(n²)=\${n * n}\`);
}
`,
    },
    interviewQuestions: [
      {
        question:
          "What is Big-O notation and why do we drop constants and smaller terms?",
        difficulty: "Easy",
        hint: "Big-O describes the growth rate in the worst case as n → ∞. Constants become irrelevant at large scale: O(100n) and O(n) both double when input doubles. Smaller terms like n in O(n² + n) are negligible compared to n² for large n.",
      },
      {
        question:
          "What is the time complexity of binary search and why is it O(log n)?",
        difficulty: "Easy",
        hint: "Binary search halves the search space each iteration. Starting with n elements: after 1 step → n/2, after k steps → n/2ᵏ. It stops when n/2ᵏ = 1, so k = log₂n. You only need about 17 comparisons for a million elements.",
      },
      {
        question:
          "How would you improve an O(n²) 'contains duplicate' solution to O(n)?",
        difficulty: "Medium",
        hint: "The O(n²) approach compares every pair. Switch to a Set: iterate once (O(n)), and for each element check if seen.has(x) — O(1). Add it if not found. This gives O(n) time and O(n) space. Trading space for time is a classic DSA optimization pattern.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Linear Search
  // ─────────────────────────────────────────────
  {
    id: "linear-search",
    title: "Linear Search",
    slug: "linear-search",
    icon: "Search",
    difficulty: "Beginner",
    description:
      "Learn the simplest searching algorithm — scan every element from left to right until you find the target or exhaust the array. The foundation for understanding more advanced search techniques.",
    concept: {
      explanation:
        "Linear search (also called sequential search) checks each element of an array one by one from the beginning until it finds the target value or reaches the end. It makes no assumptions about the order of the array — it works on both sorted and unsorted data. The algorithm returns the index of the first match, or -1 if the target is not found. Because it may need to visit every element, its worst-case time complexity is O(n). Despite its simplicity, linear search is the right tool when the array is small, unsorted, or when you only search once (sorting first would cost more than just scanning).",
      realLifeAnalogy:
        "Imagine looking for a specific song in a stack of unlabelled CDs. You pick up each CD one by one, check the label, and stop when you find the right one. In the worst case you check every CD. That's linear search — simple, reliable, no preparation needed.",
      keyPoints: [
        "Works on both sorted and unsorted arrays — no preprocessing required",
        "Time complexity: O(n) worst case (target at the end or not present)",
        "Time complexity: O(1) best case (target is the first element)",
        "Space complexity: O(1) — only a loop counter is needed",
        "Returns the index of the first match, or -1 if not found",
        "Prefer binary search O(log n) when the array is sorted and large",
        "Use linear search when n is small or when you search only once",
        "Can be extended: find all indices, count occurrences, find last occurrence",
      ],
      timeComplexity: "O(n) worst/average case | O(1) best case",
      spaceComplexity: "O(1) — no extra space needed",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Linear Search =====

// ── Basic: find first occurrence ──────────────
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;  // found — return index
  }
  return -1;                          // not found
}

const arr = [3, 7, 1, 9, 4, 6, 2];
console.log("Array:", arr);
console.log("Search 9  →", linearSearch(arr, 9));   //  3
console.log("Search 6  →", linearSearch(arr, 6));   //  5
console.log("Search 10 →", linearSearch(arr, 10));  // -1

// ── Find all indices ───────────────────────────
function findAllIndices(arr, target) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) result.push(i);
  }
  return result;
}

const nums = [1, 2, 3, 2, 4, 2];
console.log("\\nFind all 2s in [1,2,3,2,4,2]:", findAllIndices(nums, 2)); // [1,3,5]

// ── Count occurrences ──────────────────────────
function countOccurrences(arr, target) {
  let count = 0;
  for (const val of arr) {
    if (val === target) count++;
  }
  return count;
}

console.log("Count 2s:", countOccurrences(nums, 2)); // 3

// ── Find last occurrence ───────────────────────
function findLast(arr, target) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === target) return i;
  }
  return -1;
}

console.log("Last index of 2:", findLast(nums, 2)); // 5

// ── Complexity reminder ────────────────────────
// n = arr.length
// Best:  O(1)  — target is arr[0]
// Worst: O(n)  — target at end or not found
// Space: O(1)  — only loop variable i
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the time complexity of linear search and when would you prefer it over binary search?",
        difficulty: "Easy",
        hint: "Linear search is O(n) worst case. Prefer it when the array is unsorted (binary search requires sorted data), when n is small (overhead of sorting outweighs the benefit), or when you only search once. If you search many times on a large sorted array, binary search O(log n) is better.",
      },
      {
        question:
          "How would you modify linear search to find the last occurrence of a value instead of the first?",
        difficulty: "Easy",
        hint: "Iterate from the end of the array backwards (i = arr.length - 1 down to 0) and return the first index where arr[i] === target. Alternatively, scan forward but don't return immediately — save the index and keep going, returning the saved index at the end.",
      },
      {
        question:
          "Given an unsorted array, find if any two numbers sum to a target value. How does your approach compare to a brute-force O(n²) nested loop?",
        difficulty: "Medium",
        hint: "Brute force: for every pair (i, j) check arr[i] + arr[j] === target — O(n²). Better: use a Set. For each element x, check if (target - x) is already in the Set — O(1) lookup. Add x to the Set after checking. Total: O(n) time, O(n) space. This trades space for time, a classic DSA pattern.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Binary Search
  // ─────────────────────────────────────────────
  {
    id: "binary-search",
    title: "Binary Search",
    slug: "binary-search",
    icon: "Divide",
    difficulty: "Intermediate",
    description:
      "Master the divide-and-conquer search algorithm that halves the search space each step, achieving O(log n) time on sorted arrays — the foundation for dozens of advanced interview problems.",
    concept: {
      explanation:
        "Binary search works on a sorted array by repeatedly halving the search space. It compares the target against the middle element: if they match, the search ends; if the target is smaller, the right half is discarded; if larger, the left half is discarded. This halving means 1,000,000 elements requires at most 20 comparisons (log₂1,000,000 ≈ 20). The critical requirement is that the array must be sorted. The two core variables are lo (left boundary) and hi (right boundary); mid = Math.floor((lo + hi) / 2) is the pivot each iteration. The loop ends when lo > hi, meaning the target is not present.",
      realLifeAnalogy:
        "Think of guessing a number between 1 and 1000. A smart guesser always guesses the midpoint — 500. If too high, the range becomes 1–499; if too low, 501–1000. Each guess eliminates half the remaining possibilities. After 10 guesses you have narrowed 1000 options to 1. That's binary search — systematic halving.",
      keyPoints: [
        "Requires a sorted array — binary search on unsorted data gives wrong results",
        "Time complexity: O(log n) — halves the search space each iteration",
        "Space complexity: O(1) for iterative | O(log n) for recursive (call stack)",
        "lo, hi, mid are the three key variables — mid = Math.floor((lo + hi) / 2)",
        "Loop condition: while (lo <= hi) — stops when the range is empty",
        "Return -1 when lo > hi — target not found",
        "Avoid integer overflow: use mid = lo + Math.floor((hi - lo) / 2) in languages with fixed integers",
        "Template extends to: find first/last occurrence, insert position, search in rotated array",
        "A million elements → at most 20 comparisons; a billion → at most 30",
      ],
      timeComplexity: "O(log n) — halves the problem every step",
      spaceComplexity: "O(1) iterative | O(log n) recursive",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Binary Search =====

// ── Classic: find target index ─────────────────
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);

    if (arr[mid] === target) return mid;       // found
    else if (arr[mid] < target) lo = mid + 1; // search right half
    else                        hi = mid - 1; // search left half
  }
  return -1; // not found
}

const sorted = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log("Array:", sorted);
console.log("Search 13 →", binarySearch(sorted, 13)); //  6
console.log("Search  7 →", binarySearch(sorted,  7)); //  3
console.log("Search  6 →", binarySearch(sorted,  6)); // -1

// ── Find insertion position ────────────────────
function searchInsertPosition(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else                        hi = mid - 1;
  }
  return lo;
}

console.log("\nInsert 6  →", searchInsertPosition(sorted, 6));  // 3
console.log("Insert 20 →", searchInsertPosition(sorted, 20)); // 10

// ── Find first occurrence (duplicates) ────────
function findFirst(arr, target) {
  let lo = 0, hi = arr.length - 1, result = -1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) { result = mid; hi = mid - 1; }
    else if (arr[mid] < target) lo = mid + 1;
    else                        hi = mid - 1;
  }
  return result;
}

const dups = [1, 2, 2, 2, 3, 4, 5];
console.log("\nFirst 2 in [1,2,2,2,3,4,5]:", findFirst(dups, 2)); // 1

// n=1,000,000 → max 20 comparisons  ✅
`,
    },
    interviewQuestions: [
      {
        question:
          "Why must the array be sorted for binary search to work? What happens if it isn't?",
        difficulty: "Easy",
        hint: "Binary search discards half the array based on the assumption that all elements in the left half are smaller and all in the right half are larger. If the array is unsorted, this assumption is wrong — you might discard the half that actually contains the target, giving an incorrect result or missing the element entirely.",
      },
      {
        question:
          "How do you find the insertion position of a target in a sorted array using binary search?",
        difficulty: "Easy",
        hint: "Run standard binary search. If found, return mid. If not found, when the loop ends (lo > hi), lo points to the correct insertion position — all elements to its left are smaller, all to its right are larger. This is the 'left boundary' pattern used in LeetCode 35 (Search Insert Position).",
      },
      {
        question:
          "How would you modify binary search to find the first and last occurrence of a target in a sorted array with duplicates?",
        difficulty: "Medium",
        hint: "For first occurrence: when arr[mid] === target, record mid as result but continue searching left (hi = mid - 1). For last occurrence: when arr[mid] === target, record mid as result but continue searching right (lo = mid + 1). Each runs in O(log n). The count of occurrences = lastIdx - firstIdx + 1.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Bubble Sort
  // ─────────────────────────────────────────────
  {
    id: "bubble-sort",
    title: "Bubble Sort",
    slug: "bubble-sort",
    icon: "ArrowUpDown",
    difficulty: "Beginner",
    description:
      "Learn the classic comparison-based sorting algorithm that repeatedly swaps adjacent elements — the perfect starting point for understanding how sorting works and why O(n²) matters.",
    concept: {
      explanation:
        "Bubble sort repeatedly steps through the array, compares each pair of adjacent elements, and swaps them if they're in the wrong order. After each full pass, the largest unsorted element has 'bubbled up' to its correct position at the end — like a heavy bubble rising to the surface. With n elements, at most n-1 passes are needed. An optimized version short-circuits when no swaps occur in a pass, achieving O(n) best-case on an already-sorted array. Despite its O(n²) average/worst case making it impractical for large data, bubble sort is ideal for learning: it's easy to visualize, implement, and reason about.",
      realLifeAnalogy:
        "Imagine a row of people sorted by height. You walk from left to right and whenever two adjacent people are out of order, you swap them. After one full walk, the tallest person has moved to the far right. You repeat the walk for the remaining people, each time the next-tallest settles into place. Each walk is one 'pass' of bubble sort.",
      keyPoints: [
        "Compare adjacent pairs and swap if out of order — repeat for n-1 passes",
        "After pass k, the last k elements are in their final sorted positions",
        "Time complexity: O(n²) worst/average case — nested loops",
        "Time complexity: O(n) best case — already sorted, with the 'swapped' flag optimization",
        "Space complexity: O(1) — sorts in-place with only a swap temp variable",
        "Stable sort — equal elements maintain their relative order",
        "Optimization: if no swaps occur in a full pass, the array is sorted — stop early",
        "In practice, use built-in sort (TimSort) — bubble sort is for learning, not production",
      ],
      timeComplexity: "O(n²) worst/average | O(n) best (optimized, already sorted)",
      spaceComplexity: "O(1) — in-place, only constant extra space",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Bubble Sort =====

// ── Basic bubble sort ─────────────────────────
function bubbleSort(arr) {
  const a = [...arr]; // copy — don't mutate original
  const n = a.length;

  for (let pass = 0; pass < n - 1; pass++) {
    for (let i = 0; i < n - 1 - pass; i++) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]]; // swap
      }
    }
  }
  return a;
}

console.log(bubbleSort([5, 3, 8, 4, 2])); // [2, 3, 4, 5, 8]
console.log(bubbleSort([1, 5, 2, 9, 3])); // [1, 2, 3, 5, 9]

// ── Optimized: stop early if already sorted ───
function bubbleSortOpt(arr) {
  const a = [...arr];
  const n = a.length;

  for (let pass = 0; pass < n - 1; pass++) {
    let swapped = false;

    for (let i = 0; i < n - 1 - pass; i++) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
      }
    }

    if (!swapped) break; // array is sorted — stop early  ✅
  }
  return a;
}

console.log("\nOptimized:");
console.log(bubbleSortOpt([1, 2, 3, 4, 5])); // already sorted → 1 pass only
console.log(bubbleSortOpt([5, 1, 4, 2, 8])); // [1, 2, 4, 5, 8]

// ── Count swaps ───────────────────────────────
function countSwaps(arr) {
  const a = [...arr];
  let swaps = 0;
  for (let pass = 0; pass < a.length - 1; pass++) {
    for (let i = 0; i < a.length - 1 - pass; i++) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swaps++;
      }
    }
  }
  return swaps;
}

console.log("\nSwaps needed for [5,3,8,4,2]:", countSwaps([5, 3, 8, 4, 2])); // 7

// ── Complexity ────────────────────────────────
// Worst (reverse sorted): O(n²) comparisons & swaps
// Best  (already sorted): O(n)  comparisons, 0 swaps
// Space: O(1) — only the swap uses extra memory
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the time complexity of bubble sort and why is it O(n²)?",
        difficulty: "Easy",
        hint: "Bubble sort uses two nested loops. The outer loop runs n-1 times (passes). The inner loop runs n-1-pass times per pass. Total comparisons: (n-1) + (n-2) + … + 1 = n(n-1)/2 ≈ n²/2, which simplifies to O(n²). Doubling the input quadruples the work.",
      },
      {
        question:
          "How do you optimize bubble sort to achieve O(n) best case? When does the optimization trigger?",
        difficulty: "Easy",
        hint: "Add a boolean `swapped = false` before each inner loop pass. Set it to true whenever a swap occurs. After the inner loop, if swapped is still false, no swaps happened — the array is already sorted — so break out early. This gives O(n) on an already-sorted array (one pass, zero swaps detected).",
      },
      {
        question:
          "Is bubble sort a stable sort? Why does stability matter in practice?",
        difficulty: "Medium",
        hint: "Yes — bubble sort is stable because it only swaps adjacent elements when one is strictly greater (not equal). Equal elements never cross each other. Stability matters when sorting objects by one key while preserving existing order from another key — e.g., sorting employees by salary while keeping alphabetical order within same-salary groups.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Selection Sort
  // ─────────────────────────────────────────────
  {
    id: "selection-sort",
    title: "Selection Sort",
    slug: "selection-sort",
    icon: "Target",
    difficulty: "Beginner",
    description:
      "Understand how selection sort finds the minimum element in the unsorted portion and places it at the front — building the sorted section one element at a time from left to right.",
    concept: {
      explanation:
        "Selection sort divides the array into a sorted portion (left) and an unsorted portion (right). On each pass it scans the entire unsorted portion to find the minimum element, then swaps it into the first unsorted position. After k passes, the k smallest elements are in their final sorted positions on the left. Unlike bubble sort, selection sort always makes exactly n-1 swaps in the worst case regardless of input — this can be an advantage when swaps are expensive. The downside: it's not adaptive — it always does O(n²) comparisons even if the array is already sorted.",
      realLifeAnalogy:
        "Imagine sorting playing cards held face-up on a table. You scan all cards, pick the smallest, and move it to the leftmost slot. Then scan the remaining cards, pick the next smallest, move it to slot 2. Repeat until every card is in place. Each scan is a 'pass', and each move is a 'swap'.",
      keyPoints: [
        "Each pass selects the minimum from the unsorted portion and places it at the front",
        "After pass k, the k smallest elements are in their correct final positions (left side)",
        "Time complexity: O(n²) always — n(n-1)/2 comparisons regardless of input order",
        "Space complexity: O(1) — in-place, only index variables needed",
        "Not adaptive — cannot short-circuit like optimized bubble sort on sorted input",
        "Not stable in the standard implementation — a swap can move equal elements past each other",
        "Advantage over bubble sort: exactly n-1 swaps worst case (vs O(n²) swaps for bubble)",
        "In practice, use built-in sort — selection sort is for learning, not production",
      ],
      timeComplexity: "O(n²) always — no best case improvement",
      spaceComplexity: "O(1) — in-place",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Selection Sort =====

// ── Basic selection sort ──────────────────────
function selectionSort(arr) {
  const a = [...arr]; // copy — don't mutate original
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i; // assume first unsorted element is minimum

    // find actual minimum in unsorted portion [i+1 .. n-1]
    for (let j = i + 1; j < n; j++) {
      if (a[j] < a[minIdx]) minIdx = j;
    }

    // swap minimum into position i (only if needed)
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
  }
  return a;
}

console.log(selectionSort([5, 3, 8, 4, 2])); // [2, 3, 4, 5, 8]
console.log(selectionSort([1, 5, 2, 9, 3])); // [1, 2, 3, 5, 9]

// ── Find minimum index in range ───────────────
function findMinIndex(arr, start) {
  let minIdx = start;
  for (let j = start + 1; j < arr.length; j++) {
    if (arr[j] < arr[minIdx]) minIdx = j;
  }
  return minIdx;
}

const arr = [5, 3, 8, 4, 2];
console.log("\nMin index in full array:", findMinIndex(arr, 0)); // 4 (value=2)
console.log("Min index from index 1:", findMinIndex(arr, 1));  // 4 (value=2)

// ── Comparison count ──────────────────────────
function countComparisons(n) {
  // always n*(n-1)/2 regardless of input
  return (n * (n - 1)) / 2;
}

console.log("\nComparisons for n=5:", countComparisons(5));   // 10
console.log("Comparisons for n=10:", countComparisons(10)); // 45

// ── Complexity ────────────────────────────────
// Comparisons: always n*(n-1)/2  →  O(n²)
// Swaps:       at most n-1       →  O(n)
// Space:       O(1) — only index variables i, j, minIdx
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the key difference between selection sort and bubble sort in terms of swaps?",
        difficulty: "Easy",
        hint: "Bubble sort can make O(n²) swaps in the worst case because it swaps adjacent pairs on every comparison. Selection sort makes at most n-1 swaps — one per pass — because it first finds the minimum, then does a single swap to place it. When swaps are expensive (e.g. writing to flash memory), selection sort's O(n) swap count is an advantage.",
      },
      {
        question:
          "Why is selection sort not adaptive? How does it differ from optimized bubble sort on a sorted array?",
        difficulty: "Easy",
        hint: "Selection sort always scans the entire unsorted portion on every pass — it does n*(n-1)/2 comparisons even if the array is already sorted. Optimized bubble sort detects no-swap passes and stops early, giving O(n) on sorted input. Selection sort has no equivalent early-stop mechanism.",
      },
      {
        question:
          "Is selection sort stable? How would you make it stable without changing the O(n²) time complexity?",
        difficulty: "Medium",
        hint: "Standard selection sort is NOT stable — swapping the minimum into position can jump it over equal elements, changing their relative order. To make it stable, instead of swapping, shift all elements between i and minIdx one position right, then insert the minimum at position i (like insertion sort's shift technique). This preserves relative order of equals at O(n²) time and O(1) space.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Insertion Sort
  // ─────────────────────────────────────────────
  {
    id: "insertion-sort",
    title: "Insertion Sort",
    slug: "insertion-sort",
    icon: "ListPlus",
    difficulty: "Beginner",
    description:
      "Learn how insertion sort builds a sorted array one element at a time — like sorting cards in your hand — and why it's efficient for small or nearly-sorted datasets.",
    concept: {
      explanation:
        "Insertion sort grows a sorted portion on the left side of the array, one element at a time. For each element (the 'key'), it scans backwards through the sorted portion and shifts larger elements one position to the right, creating a slot where the key belongs — then drops the key in. This is exactly how you sort playing cards in your hand: pick up the next card, slide it left past every card that's bigger, and place it. The algorithm is adaptive: if the array is already nearly sorted, there's little shifting to do, giving O(n) performance. Worst case (reverse-sorted input) requires O(n²) shifts.",
      realLifeAnalogy:
        "Imagine sorting books on a shelf alphabetically, one at a time. You pick up the next book, then slide every book to its right that comes after it alphabetically, creating a gap in the right place, and insert the book there. The left part of the shelf is always sorted; you just keep extending it.",
      keyPoints: [
        "Builds a sorted portion from left to right — invariant: arr[0..i-1] is always sorted",
        "Each step: pick arr[i] as 'key', shift arr[i-1..j] right while arr[j] > key, insert key",
        "Time complexity: O(n²) worst/average (reverse sorted) | O(n) best (already sorted)",
        "Space complexity: O(1) — in-place, only the key variable is extra space",
        "Adaptive — fewer operations when input is partially sorted (real-world advantage)",
        "Stable sort — equal elements maintain their relative order (shift uses strict >)",
        "Online algorithm — can sort a stream of data as it arrives, no need to see all input first",
        "Preferred over bubble/selection sort for small n or nearly-sorted arrays",
        "TimSort (used in JS/Python) uses insertion sort for small subarrays within merge sort",
      ],
      timeComplexity: "O(n²) worst/average | O(n) best (nearly sorted)",
      spaceComplexity: "O(1) — in-place",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Insertion Sort =====

// ── Basic insertion sort ──────────────────────
function insertionSort(arr) {
  const a = [...arr]; // copy — don't mutate original

  for (let i = 1; i < a.length; i++) {
    const key = a[i]; // element to insert
    let j = i - 1;

    // shift elements larger than key one position right
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }

    a[j + 1] = key; // drop key into its correct slot
  }
  return a;
}

console.log(insertionSort([5, 3, 8, 4, 2])); // [2, 3, 4, 5, 8]
console.log(insertionSort([1, 5, 2, 9, 3])); // [1, 2, 3, 5, 9]

// ── Already sorted — O(n) ────────────────────
// 0 shifts occur: inner while loop never executes
const sorted = [1, 2, 3, 4, 5];
console.log("\nAlready sorted:", insertionSort(sorted)); // [1,2,3,4,5] — O(n)

// ── Reverse sorted — O(n²) ───────────────────
// Maximum shifts: 0+1+2+...+(n-1) = n*(n-1)/2
const reversed = [5, 4, 3, 2, 1];
console.log("Reverse sorted:", insertionSort(reversed)); // [1,2,3,4,5] — O(n²)

// ── Insert into sorted array ─────────────────
function insertSorted(sortedArr, val) {
  const a = [...sortedArr, val];
  let j = a.length - 2;
  while (j >= 0 && a[j] > val) {
    a[j + 1] = a[j];
    j--;
  }
  a[j + 1] = val;
  return a;
}

console.log("\nInsert 4 into [1,2,3,5,6]:", insertSorted([1,2,3,5,6], 4));

// ── Complexity ────────────────────────────────
// Comparisons: O(n²) worst | O(n) best
// Shifts:      O(n²) worst | O(1) best (0 shifts if already sorted)
// Space:       O(1) — only 'key' and 'j' are extra
`,
    },
    interviewQuestions: [
      {
        question:
          "Why is insertion sort O(n) on a nearly-sorted array? Give a concrete example.",
        difficulty: "Easy",
        hint: "In each pass, the inner while loop only shifts elements larger than the key. If the array is nearly sorted, each key needs at most 1–2 shifts — the while loop terminates almost immediately. For a fully sorted array, the while condition `arr[j] > key` is always false: 0 shifts per pass, total n-1 passes = O(n). Example: [1,2,3,5,4] — only the last element (4) needs one shift.",
      },
      {
        question:
          "How does insertion sort compare to selection sort in terms of swaps vs shifts?",
        difficulty: "Easy",
        hint: "Selection sort does at most n-1 swaps but always O(n²) comparisons. Insertion sort does O(n²) shifts in the worst case but only O(n) comparisons in the best case. Shifts move one element one slot (cheap), while swaps require three assignments (temp, A=B, B=temp). For nearly-sorted data, insertion sort wins on both comparisons and shifts.",
      },
      {
        question:
          "Why is insertion sort used inside TimSort for small subarrays, even though merge sort is asymptotically faster?",
        difficulty: "Medium",
        hint: "For very small n (typically n ≤ 32–64), insertion sort's O(n²) is actually faster in practice than merge sort's O(n log n) due to lower constant factors and no memory allocation (merge sort needs O(n) extra space). Real-world subarrays are also often partially sorted, giving insertion sort its O(n) best case. TimSort hybridizes merge sort for large n with insertion sort for small subarrays.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Merge Sort
  // ─────────────────────────────────────────────
  {
    id: "merge-sort",
    title: "Merge Sort",
    slug: "merge-sort",
    icon: "GitMerge",
    difficulty: "Intermediate",
    description:
      "Master the divide-and-conquer sorting algorithm that achieves O(n log n) in all cases — the gold standard for stable sorting of large datasets and the basis of TimSort.",
    concept: {
      explanation:
        "Merge sort splits the array into two halves, recursively sorts each half, then merges them back in sorted order. The merge step compares the front of each sorted half, picks the smaller element, and repeats until both halves are exhausted. Because splitting takes O(log n) levels and merging each level costs O(n), the total is always O(n log n) — regardless of input order. Unlike bubble/insertion/selection sort, merge sort maintains this guarantee even on the worst possible input. The trade-off is O(n) extra space for the temporary merge buffer.",
      realLifeAnalogy:
        "Imagine sorting two separate stacks of already-sorted index cards by merging them: hold both stacks face-up and repeatedly take whichever card is smaller from the top. The stacks shrink as you build one merged stack. That's one merge step. Merge sort just applies this idea recursively — split everything into individual cards, then merge pairs, then merge pairs-of-pairs, until done.",
      keyPoints: [
        "Divide: split array in half recursively until subarrays have 1 element (base case)",
        "Conquer: merge two sorted halves by comparing front elements and picking the smaller",
        "Time complexity: O(n log n) always — best, average, and worst case",
        "Space complexity: O(n) — extra buffer array needed for the merge step",
        "Stable sort — equal elements maintain their original relative order",
        "Not in-place — requires additional memory proportional to input size",
        "Preferred for linked lists (no random access needed) and external sorting (data on disk)",
        "TimSort (used in JavaScript Array.sort, Python sorted) uses merge sort for large runs",
        "n log n is optimal for comparison-based sorting — no comparison sort can beat this",
      ],
      timeComplexity: "O(n log n) always — best, average, and worst case",
      spaceComplexity: "O(n) — merge buffer; O(log n) call stack for recursion",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Merge Sort =====

// ── Merge two sorted arrays ───────────────────
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else                     result.push(right[j++]);
  }

  // append remaining elements
  while (i < left.length)  result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}

// ── Recursive merge sort ──────────────────────
function mergeSort(arr) {
  if (arr.length <= 1) return arr;        // base case

  const mid   = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid));  // sort left half
  const right = mergeSort(arr.slice(mid));     // sort right half

  return merge(left, right);              // merge sorted halves
}

console.log(mergeSort([5, 3, 8, 4, 2])); // [2, 3, 4, 5, 8]
console.log(mergeSort([1, 5, 2, 9, 3])); // [1, 2, 3, 5, 9]

// ── Merge two sorted arrays (practice) ───────
const a = [1, 3, 5, 7];
const b = [2, 4, 6, 8];
console.log("\nMerge", a, "+", b, "→", merge(a, b));

// ── Count inversions (merge sort application) ─
// An inversion is a pair (i, j) where i < j but arr[i] > arr[j]
function countInversions(arr) {
  if (arr.length <= 1) return { sorted: arr, count: 0 };

  const mid = Math.floor(arr.length / 2);
  const { sorted: left,  count: lc } = countInversions(arr.slice(0, mid));
  const { sorted: right, count: rc } = countInversions(arr.slice(mid));

  let count = lc + rc, i = 0, j = 0;
  const merged = [];

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      merged.push(left[i++]);
    } else {
      count += left.length - i; // all remaining left elements form inversions
      merged.push(right[j++]);
    }
  }
  while (i < left.length)  merged.push(left[i++]);
  while (j < right.length) merged.push(right[j++]);
  return { sorted: merged, count };
}

const { count } = countInversions([5, 3, 8, 4, 2]);
console.log("\nInversions in [5,3,8,4,2]:", count); // 7
`,
    },
    interviewQuestions: [
      {
        question:
          "Why is merge sort O(n log n) and why can't comparison-based sorting do better?",
        difficulty: "Easy",
        hint: "Merge sort creates log₂n levels of splitting (each halving doubles the number of subarrays). At each level, merging all subarrays costs O(n) total. So total = O(n) × O(log n) = O(n log n). The theoretical lower bound for comparison-based sorting is Ω(n log n) — proven by counting the number of distinct orderings (n!) that must be distinguishable via binary comparisons: log₂(n!) ≈ n log n by Stirling's approximation.",
      },
      {
        question:
          "How would you merge two sorted arrays in O(n) time? Walk through the algorithm.",
        difficulty: "Easy",
        hint: "Use two pointers i and j starting at the front of each array. Compare arr1[i] and arr2[j]; push the smaller one into the result and advance that pointer. Repeat until one array is exhausted, then append all remaining elements from the other. Total operations = n1 + n2 = O(n). This is exactly the merge step inside merge sort.",
      },
      {
        question:
          "How do you count the number of inversions in an array using merge sort? What is an inversion?",
        difficulty: "Hard",
        hint: "An inversion is a pair (i, j) where i < j but arr[i] > arr[j] — a measure of how 'unsorted' the array is. During the merge step, whenever right[j] < left[i], all remaining elements in the left half (left.length - i of them) are also greater than right[j], forming inversions. Count those all at once: count += left.length - i. Total time: O(n log n) — same as merge sort itself.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 16. Quick Sort
  // ─────────────────────────────────────────────
  {
    id: "quick-sort",
    title: "Quick Sort",
    slug: "quick-sort",
    icon: "Zap",
    difficulty: "Intermediate",
    description:
      "Partition an array around a pivot so elements smaller than the pivot go left and larger go right, then recursively sort each side. Average O(n log n), in-place.",
    concept: {
      explanation:
        "Quick sort picks a pivot element and rearranges the array so that every element less than the pivot ends up to its left and every element greater ends up to its right — this is called partitioning. The pivot is now in its final sorted position. Quick sort then recursively applies the same process to the left and right sub-arrays. Unlike merge sort, no extra array is needed: partitioning is done in-place by swapping elements. The choice of pivot matters: picking the last element (Lomuto scheme) is simple to implement; picking the median-of-three reduces worst-case odds significantly.",
      realLifeAnalogy:
        "Imagine sorting a deck of playing cards by choosing one card (the pivot) and splitting the rest into two piles — cards lower than the pivot on the left, higher on the right. The pivot card is now in its correct slot. Repeat the same process on each pile. You never need a second table; everything is rearranged on the same surface.",
      keyPoints: [
        "Pick a pivot, partition around it, recurse on each half",
        "Lomuto partition: pivot = last element, single i pointer scanning left to right",
        "Hoare partition: two converging pointers — fewer swaps in practice",
        "Average case O(n log n); worst case O(n²) when array is already sorted and pivot is always min/max",
        "Randomised pivot selection or median-of-three nearly eliminates the worst case",
        "In-place: O(log n) stack space on average for recursion",
        "Not stable — equal elements may change relative order",
        "Fastest in practice for most inputs due to excellent cache behaviour",
      ],
      timeComplexity: "Average O(n log n) | Worst O(n²) | Best O(n log n)",
      spaceComplexity: "O(log n) average stack space (in-place partitioning)",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Quick Sort (Lomuto partition) =====

function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const p = partition(arr, lo, hi);
    quickSort(arr, lo, p - 1);   // sort left of pivot
    quickSort(arr, p + 1, hi);   // sort right of pivot
  }
  return arr;
}

// Lomuto: pivot = arr[hi], place it in final position
function partition(arr, lo, hi) {
  const pivot = arr[hi];
  let i = lo - 1;               // boundary of "less-than" region

  for (let j = lo; j < hi; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];   // swap into left region
    }
  }
  [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]]; // place pivot
  return i + 1;                 // pivot's final index
}

const arr = [5, 3, 8, 4, 2, 7, 1, 6];
console.log("Before:", [...arr]);
console.log("After: ", quickSort(arr));
console.log("Sorted?", arr.every((v, i, a) => i === 0 || a[i - 1] <= v));
`,
    },
    interviewQuestions: [
      {
        question:
          "Explain the Lomuto partition scheme. What does it return and why?",
        difficulty: "Easy",
        hint: "Lomuto picks arr[hi] as the pivot and uses a single index i that tracks the boundary of elements already confirmed ≤ pivot. A scan pointer j walks from lo to hi-1; whenever arr[j] ≤ pivot, i is incremented and arr[i] is swapped with arr[j]. After the loop, the pivot is swapped into position i+1 — guaranteed to have only smaller elements to its left and only larger elements to its right. The function returns i+1 as the pivot's final (sorted) index.",
      },
      {
        question:
          "When does quick sort degrade to O(n²) and how do you prevent it?",
        difficulty: "Medium",
        hint: "The worst case occurs when every partition is maximally unbalanced — one side gets n-1 elements and the other gets 0. This happens when the pivot is always the minimum or maximum (e.g., already-sorted input with last-element pivot). Prevention strategies: (1) randomise pivot selection — swap a random element with arr[hi] before each partition; (2) median-of-three — compare first, middle, and last elements and use the median as pivot; (3) three-way partitioning (Dutch National Flag) handles arrays with many duplicate keys efficiently.",
      },
      {
        question:
          "How does quick sort compare to merge sort in practice? When would you choose one over the other?",
        difficulty: "Hard",
        hint: "Quick sort is usually faster in practice despite the same average O(n log n) because it is in-place (better cache locality, no auxiliary array allocation) and the constant factor in its inner loop is small. Merge sort advantages: (1) guaranteed O(n log n) worst case; (2) stable sort; (3) better for linked lists (no random access needed); (4) better for external sorting (merging large disk chunks). JavaScript's Array.prototype.sort uses TimSort (hybrid merge+insertion) for stability guarantees. Choose quick sort for in-memory arrays where stability does not matter; choose merge sort when you need stability or a worst-case guarantee.",
      },
    ],
  },

  // ─── Linked List ─────────────────────────────────────────────────────────
  {
    id: "linked-list",
    title: "Linked List Basics",
    slug: "linked-list",
    icon: "Link2",
    difficulty: "Intermediate",
    description:
      "Understand singly linked list node structure, pointer manipulation, and O(1) head insertion vs O(n) tail traversal.",
    concept: {
      explanation:
        "A linked list is a chain of nodes where each node stores a value and a reference (pointer) to the next node. Unlike arrays, nodes live anywhere in memory — there is no index-based O(1) random access, but head insertions and deletions are O(1) without any shifting. The list is accessed exclusively through the `head` reference; lose `head` and you lose the entire list.",
      realLifeAnalogy:
        "Think of a treasure hunt where each clue card tells you the value (the clue) and the location of the next card. To reach clue #5 you must follow every card in order from the start — you cannot skip straight to card #5 like you could with an indexed array.",
      keyPoints: [
        "Each node: { val, next } — next is null for the last node",
        "insertHead: O(1) — point new node to old head, update head",
        "insertTail: O(n) — traverse to last node, append",
        "deleteHead: O(1) — advance head to head.next",
        "deleteValue: O(n) — find predecessor node, bypass target",
        "No random access — must traverse from head each time",
        "Dynamic size — grows/shrinks without reallocation",
        "Space: O(n) — one node object per element",
      ],
      timeComplexity:
        "insertHead O(1) | insertTail O(n) | deleteHead O(1) | deleteValue O(n) | search O(n)",
      spaceComplexity: "O(n) — one node per element",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() { this.head = null; }

  insertHead(val) {
    this.head = new ListNode(val, this.head);
  }

  insertTail(val) {
    const node = new ListNode(val);
    if (!this.head) { this.head = node; return; }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  }

  deleteHead() {
    if (!this.head) return;
    this.head = this.head.next;
  }

  deleteValue(val) {
    if (!this.head) return;
    if (this.head.val === val) { this.head = this.head.next; return; }
    let cur = this.head;
    while (cur.next && cur.next.val !== val) cur = cur.next;
    if (cur.next) cur.next = cur.next.next;
  }

  toArray() {
    const out = [];
    let cur = this.head;
    while (cur) { out.push(cur.val); cur = cur.next; }
    return out;
  }
}

const list = new LinkedList();
list.insertHead(3);
list.insertHead(1);  // [1, 3]
list.insertTail(7);  // [1, 3, 7]
list.deleteHead();   // [3, 7]
list.deleteValue(7); // [3]
console.log(list.toArray()); // [3]`,
    },
    interviewQuestions: [
      {
        question: "How do you find the middle node of a linked list in one pass?",
        difficulty: "Easy",
        hint: "Use two pointers — slow moves one step, fast moves two steps. When fast reaches the end, slow is at the middle. For even-length lists this lands on the second middle node.",
      },
      {
        question: "How do you detect a cycle in a linked list?",
        difficulty: "Medium",
        hint: "Floyd's cycle detection: slow moves +1, fast moves +2. If they ever meet, a cycle exists. If fast reaches null, no cycle. This is O(n) time and O(1) space.",
      },
      {
        question: "How do you find the Nth node from the end in one pass?",
        difficulty: "Medium",
        hint: "Advance a 'leader' pointer N steps ahead, then move both leader and follower together. When leader reaches null, follower is at the Nth from the end.",
      },
    ],
  },

  // ─── Middle of Linked List ────────────────────────────────────────────────
  {
    id: "middle-linked-list",
    title: "Middle of Linked List",
    slug: "middle-linked-list",
    icon: "Milestone",
    difficulty: "Intermediate",
    description:
      "Master the slow/fast two-pointer technique to find the middle node in one pass, and apply it to palindrome checking, reordering, and deletion.",
    concept: {
      explanation:
        "Move a `slow` pointer one step at a time and a `fast` pointer two steps at a time. When `fast` can no longer advance (fast.next is null), `slow` is sitting exactly at the middle node. For even-length lists this yields the second of the two middle nodes, which is the convention used by LeetCode 876. This O(n) single-pass trick underpins at least four common interview problems: find middle, palindrome check, reorder list, and delete middle node.",
      realLifeAnalogy:
        "Imagine two people starting a walk from the same point. One walks at normal speed, the other jogs at double speed. When the jogger reaches the end of the path, the walker is exactly halfway — that is the middle.",
      keyPoints: [
        "slow advances +1, fast advances +2 each iteration",
        "Loop condition: while (fast.next !== null) — stop when fast can't jump two more",
        "Odd length n: slow lands on exact middle index n/2",
        "Even length n: slow lands on second middle index n/2 (LeetCode convention)",
        "O(n) time, O(1) space — no extra data structures needed",
        "Core of: palindrome check (234), reorder list (143), delete middle (876)",
        "For delete-middle, offset fast by one step so slow stops at the predecessor",
        "For palindrome/reorder, reverse the second half in-place after finding the middle",
      ],
      timeComplexity: "O(n) — single pass with two pointers",
      spaceComplexity: "O(1) — only two pointer variables",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Middle of Linked List =====

// ── Find middle node (LeetCode 876) ───────────────────────
function middleNode(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow; // second middle for even-length lists
}

// ── Palindrome Linked List (LeetCode 234) ─────────────────
function isPalindrome(head) {
  // 1. find middle
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // 2. reverse second half
  let prev = null, cur = slow;
  while (cur) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  // 3. compare
  let left = head, right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}`,
    },
    interviewQuestions: [
      {
        question:
          "Why does the slow/fast pointer find the middle in exactly one pass?",
        difficulty: "Easy",
        hint: "When fast has travelled the full length n, slow has travelled n/2 steps. Since fast moves at 2x the speed of slow and they both start at head, slow is always at the halfway point when fast reaches the end.",
      },
      {
        question:
          "How does the middle differ for odd vs even length lists, and why does it matter for palindrome checking?",
        difficulty: "Easy",
        hint: "Odd (n=5): slow stops at index 2, the exact centre. Even (n=4): slow stops at index 2, the second of the two middles. For palindrome, reversing from the second middle works correctly either way because the first half is always <= the second half in length.",
      },
      {
        question:
          "How do you delete the middle node of a linked list using slow/fast pointers?",
        difficulty: "Medium",
        hint: "Use a modified slow start: initialise slow = head and fast = head.next (offset by one). This way when fast reaches the end, slow points to the predecessor of the middle node, so you can set slow.next = slow.next.next to bypass it.",
      },
    ],
  },

  // ─── Linked List Cycle ────────────────────────────────────────────────────
  {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    slug: "linked-list-cycle",
    icon: "RefreshCw",
    difficulty: "Intermediate",
    description:
      "Detect cycles with Floyd's slow/fast pointer algorithm, find the cycle entry node, measure cycle length, and remove the cycle — all in O(n) time and O(1) space.",
    concept: {
      explanation:
        "Floyd's cycle detection uses two pointers: `slow` advances one step at a time while `fast` advances two. If there is a cycle, fast will eventually lap slow and they will meet inside the cycle. Once a meeting point is found, resetting slow to the head and advancing both pointers by one step at a time guarantees they next meet exactly at the cycle entry node. This elegant math follows from the distance invariant: the distance from head to the entry equals the distance from the meeting point to the entry (travelling around the cycle).",
      realLifeAnalogy:
        "Two runners on a circular track — one runs twice as fast. They will always meet inside the loop. Once they meet, have the slow runner restart from the beginning at the same speed as the fast runner; wherever they meet again is the exact start of the loop.",
      keyPoints: [
        "slow +1, fast +2 each iteration — if they meet, a cycle exists",
        "No cycle: fast reaches null — return false in O(n)",
        "Cycle entry: after meeting, reset slow=head, advance both +1 until they meet again",
        "Cycle length: after meeting, keep one fixed, count steps until the other laps it",
        "Remove cycle: find entry, walk to find the tail (cur.next === entry), set cur.next = null",
        "All operations: O(n) time, O(1) space — no hash set needed",
        "Hash set approach is O(n) time but O(n) space — know both approaches",
        "Cycle entry proof: head-to-entry distance === meeting-point-to-entry distance (mod cycle length)",
      ],
      timeComplexity: "O(n) — fast pointer laps slow within at most n steps",
      spaceComplexity: "O(1) — only two pointer variables",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Linked List Cycle — Floyd's Algorithm =====

// ── Detect cycle (LeetCode 141) ───────────────────────────
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;  // met inside cycle
  }
  return false; // fast hit null — no cycle
}

// ── Find cycle entry node (LeetCode 142) ──────────────────
function detectCycle(head) {
  let slow = head, fast = head;
  // Phase 1: find meeting point
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  if (fast === null || fast.next === null) return null; // no cycle
  // Phase 2: reset slow to head, advance both +1
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow; // cycle entry node
}`,
    },
    interviewQuestions: [
      {
        question:
          "Why does Floyd's algorithm guarantee slow and fast will meet inside the cycle?",
        difficulty: "Easy",
        hint: "Once fast enters the cycle it never leaves. From that point on, each iteration reduces the gap between fast and slow by exactly 1 (fast gains +2, slow gains +1 on the cycle). So the gap decreases to 0 within at most (cycle length) iterations — they will always meet.",
      },
      {
        question:
          "Explain the math behind why resetting slow to head (after the first meeting) causes both pointers to meet exactly at the cycle entry.",
        difficulty: "Hard",
        hint: "Let F = distance from head to entry, C = cycle length, k = distance from entry to meeting point inside cycle. The meeting condition is: F + k + m*C = 2*(F + k + n*C) for integers m, n. Simplifying: F = C - k (mod C), which means the distance from head to entry equals the distance from the meeting point back to the entry (going forward in the cycle). So resetting slow to head and advancing both +1 makes them cover these equal distances and collide at the entry.",
      },
      {
        question:
          "When would you use a hash set instead of Floyd's algorithm to detect a cycle?",
        difficulty: "Medium",
        hint: "Floyd's is always preferable for memory (O(1) vs O(n)). A hash set is simpler to code and useful when you also need to return the cycle entry immediately without the two-phase approach, or when working with graph traversal (not just linked lists) where two-pointer logic doesn't apply.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Stack using Array
  // ─────────────────────────────────────────────
  {
    id: "stack-array",
    title: "Stack using Array",
    slug: "stack-array",
    icon: "Layers",
    difficulty: "Intermediate",
    description:
      "Implement a Stack data structure using a JavaScript array. Understand LIFO (Last In, First Out), push, pop, peek, and solve classic stack problems.",
    concept: {
      explanation:
        "A Stack is a linear data structure that follows LIFO — the last element pushed is the first one popped. In JavaScript the built-in Array already supports push() and pop() at the end, making it a natural backing store. You wrap these in a Stack class to give a clean push/pop/peek/isEmpty interface. The key insight: every recursive algorithm, every undo/redo system, and every bracket-matching problem relies on a stack under the hood.",
      realLifeAnalogy:
        "Think of a stack of dinner plates. You always add a new plate on top and take from the top. You never insert or remove from the middle. The last plate placed is the first one used — that is LIFO.",
      keyPoints: [
        "push(val) → array.push(val)   O(1) amortized",
        "pop()     → array.pop()       O(1)",
        "peek()    → array.at(-1)      O(1) — read top without removing",
        "isEmpty() → array.length === 0",
        "JavaScript arrays are dynamic so the stack grows automatically",
        "Space complexity O(n) where n = number of elements",
        "Stacks power recursion (the call stack), undo/redo, DFS traversal, and expression parsing",
        "array.at(-1) is the modern way to read the last element (replaces arr[arr.length-1])",
      ],
      timeComplexity: "push O(1) · pop O(1) · peek O(1) · search O(n)",
      spaceComplexity: "O(n) — one slot per element",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Stack using JavaScript Array =====

class Stack {
  constructor() {
    this.items = [];          // backing array
  }

  push(val) {
    this.items.push(val);     // O(1) amortised
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();  // O(1)
  }

  peek() {
    return this.items.at(-1) ?? null; // O(1)
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  // Helper: display stack (bottom → top)
  toString() {
    return "[" + this.items.join(", ") + "]  ← top";
  }
}

// ── Demo ──────────────────────────────────────────────
const s = new Stack();

s.push(10);
s.push(20);
s.push(30);

console.log("stack :", s.toString());        // [10, 20, 30]  ← top
console.log("peek  :", s.peek());            // 30
console.log("pop   :", s.pop());             // 30
console.log("pop   :", s.pop());             // 20
console.log("size  :", s.size());            // 1
console.log("isEmpty:", s.isEmpty());        // false
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between a stack and a queue?",
        difficulty: "Easy",
        hint: "Stack = LIFO (Last In First Out). Queue = FIFO (First In First Out). Plates vs a checkout line.",
      },
      {
        question: "How would you implement getMin() in O(1) time alongside a normal stack?",
        difficulty: "Medium",
        hint: "Maintain a parallel 'min stack' where each slot stores the minimum value seen so far. On push, record min(val, current_min). On pop, pop both stacks in sync. This is LeetCode #155.",
      },
      {
        question: "Why is the call stack in JavaScript a stack, and what happens on stack overflow?",
        difficulty: "Medium",
        hint: "Each function call pushes a frame (local vars + return address) onto the call stack. Recursion without a base case keeps pushing frames until the engine's stack limit is exceeded, throwing a 'Maximum call stack size exceeded' RangeError.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Stack using Linked List
  // ─────────────────────────────────────────────
  {
    id: "stack-linked-list",
    title: "Stack using Linked List",
    slug: "stack-linked-list",
    icon: "Network",
    difficulty: "Intermediate",
    description:
      "Implement a Stack using a singly linked list. The head node is always the top — push prepends, pop removes the head. No resizing overhead.",
    concept: {
      explanation:
        "Instead of an array, we back the stack with a singly linked list. The head node represents the top of the stack. push(val) creates a new node whose .next points to the current head, then sets head = newNode. pop() reads head.val, then sets head = head.next. Both are true O(1) with no amortized concern — there is no underlying array to resize. The trade-off is extra memory per node (the .next pointer) and no random access.",
      realLifeAnalogy:
        "Imagine a chain of wagons where each new wagon is attached to the front. To add one, hook it at the front and redirect the locomotive. To remove one, detach the front wagon. The locomotive always points to the current front — that is the head pointer playing the role of the stack top.",
      keyPoints: [
        "head = top of stack — always maintained",
        "push: newNode.next = head; head = newNode   O(1) — no resizing",
        "pop: val = head.val; head = head.next        O(1)",
        "peek: return head?.val                       O(1)",
        "Linked-list stack never needs to copy elements (unlike array reallocation at capacity)",
        "Extra O(n) memory for .next pointers compared to a packed array",
        "Useful when max stack size is unknown at compile time",
        "Implementing a queue from two stacks (LC 232) is a classic interview question",
      ],
      timeComplexity: "push O(1) · pop O(1) · peek O(1)",
      spaceComplexity: "O(n) — one Node object per element",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Stack using Linked List =====

class Node {
  constructor(val) {
    this.val  = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.head  = null;   // head = top of stack
    this._size = 0;
  }

  push(val) {            // prepend new head  O(1)
    const node = new Node(val);
    node.next  = this.head;
    this.head  = node;
    this._size++;
  }

  pop() {               // remove head  O(1)
    if (!this.head) return null;
    const val = this.head.val;
    this.head  = this.head.next;
    this._size--;
    return val;
  }

  peek() {
    return this.head ? this.head.val : null;
  }

  isEmpty() { return this.head === null; }
  size()    { return this._size; }

  // Print: HEAD → ... → null
  toString() {
    const parts = [];
    let cur = this.head;
    while (cur) { parts.push(cur.val); cur = cur.next; }
    return parts.join(" → ") + " → null";
  }
}

// ── Demo ──────────────────────────────────────────────
const s = new Stack();
s.push(10);
s.push(20);
s.push(30);

console.log("list :", s.toString()); // 30 → 20 → 10 → null
console.log("peek :", s.peek());     // 30
console.log("pop  :", s.pop());      // 30
console.log("size :", s.size());     // 2
`,
    },
    interviewQuestions: [
      {
        question: "What advantage does a linked-list stack have over an array-based stack?",
        difficulty: "Easy",
        hint: "True O(1) push/pop with no resizing overhead. An array-based stack occasionally doubles its backing array (amortized O(1) but with spikes). A linked-list stack also has no fixed capacity.",
      },
      {
        question: "How do you implement a Queue using two Stacks? (LeetCode 232)",
        difficulty: "Medium",
        hint: "Use one 'inbox' stack for enqueue and one 'outbox' stack for dequeue. On dequeue, if outbox is empty, pour all elements from inbox to outbox (reverses order). Amortized O(1) per operation.",
      },
      {
        question: "How would you sort a stack using only one additional stack?",
        difficulty: "Medium",
        hint: "Pop from source; while temp-stack top > current element, move temp-stack top back to source; push current onto temp stack. Repeat. Result is a sorted temp stack (ascending from top).",
      },
    ],
  },

];

export const categories: CategoryInfo[] = [
  {
    id: "html",
    title: "HTML",
    icon: "FileCode",
    description:
      "Master semantic HTML, accessibility, forms, and modern HTML5 APIs.",
    topicCount: 0,
    color: "from-amber-400 to-orange-400",
    available: false,
  },
  {
    id: "css",
    title: "CSS",
    icon: "Palette",
    description:
      "Deep dive into CSS layouts, animations, responsive design, Flexbox, Grid.",
    topicCount: 0,
    color: "from-sky-400 to-blue-400",
    available: false,
  },
  {
    id: "javascript",
    title: "JavaScript",
    icon: "Braces",
    description:
      "Understand closures, prototypes, async/await, event loop, ES6+ features.",
    topicCount: 0,
    color: "from-yellow-300 to-amber-400",
    available: false,
  },
  {
    id: "dsa",
    title: "DSA using JavaScript",
    icon: "Code",
    description:
      "Learn data structures and algorithms with JavaScript -- arrays, linked lists, stacks, queues, sorting, searching, and more.",
    topicCount: 23,
    color: "from-emerald-400 to-teal-500",
    available: true,
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: "Globe",
    description:
      "Explore server-side rendering, static generation, API routes, and the App Router.",
    topicCount: 0,
    color: "from-slate-500 to-slate-600",
    available: false,
  },
  {
    id: "nestjs",
    title: "NestJS",
    icon: "Server",
    description: "Build scalable server-side applications with NestJS.",
    topicCount: 0,
    color: "from-rose-400 to-pink-500",
    available: false,
  },
  {
    id: "postgresql",
    title: "PostgreSQL",
    icon: "Database",
    description: "Master relational databases with PostgreSQL.",
    topicCount: 0,
    color: "from-violet-400 to-indigo-500",
    available: false,
  },
];
