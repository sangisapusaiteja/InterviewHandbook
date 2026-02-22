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
    topicCount: 15,
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
