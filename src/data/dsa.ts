import type { DSATopic, DSAModule } from "@/types/dsa";

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
  // Queue using Array
  // ─────────────────────────────────────────────
  {
    id: "queue-array",
    title: "Queue using Array",
    slug: "queue-array",
    icon: "Layers",
    difficulty: "Intermediate",
    description:
      "Implement a FIFO Queue backed by a JavaScript array. Learn why shift() is O(n), and how a head-pointer turns dequeue into O(1) amortized.",
    concept: {
      explanation:
        "A queue is a First-In-First-Out (FIFO) data structure — the element added first is the first to leave. The simplest implementation uses a JavaScript array: enqueue() appends to the rear with push() in O(1), while dequeue() removes from the front. The naive way to dequeue is shift(), but shift() is O(n) because JavaScript must re-index every remaining element. A smarter approach tracks a `head` index that advances on each dequeue, keeping dequeue O(1). The backing array is compacted periodically (e.g., when half its length is wasted), keeping memory usage bounded.",
      realLifeAnalogy:
        "Think of a ticket queue at a movie theater. People join at the back (push). With naive shift(), every person physically shuffles forward one step when the front person leaves — slow for a crowd. The head-pointer trick is like drawing a chalk mark for 'current front': only the mark moves, not the people. Much faster.",
      keyPoints: [
        "FIFO: First-In-First-Out — the element enqueued first is dequeued first",
        "enqueue: push() to rear — O(1) always",
        "dequeue naive: shift() from front — O(n), avoid in interviews",
        "dequeue optimized: advance a head index — O(1) amortized",
        "Compact the backing array when head > items.length / 2 to reclaim memory",
        "peek(): return items[head] — O(1)",
        "isEmpty(): head >= items.length",
        "For fixed-size queues with no wasted memory, prefer the Circular Queue",
      ],
      timeComplexity:
        "enqueue O(1) · dequeue O(n) naive / O(1) head-pointer · peek O(1)",
      spaceComplexity: "O(n)",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Queue using Array =====

// ── Naive (illustrative only — shift is O(n)) ─
class NaiveQueue {
  constructor() { this.items = []; }
  enqueue(val) { this.items.push(val); }
  dequeue()    { return this.items.length ? this.items.shift() : null; }
  peek()       { return this.items[0] ?? null; }
  isEmpty()    { return this.items.length === 0; }
  size()       { return this.items.length; }
}

// ── Optimized: head pointer — dequeue O(1) ────
class Queue {
  constructor() {
    this.items = [];
    this.head  = 0;   // index of the current front element
  }

  enqueue(val) { this.items.push(val); }

  dequeue() {
    if (this.isEmpty()) return null;
    const val = this.items[this.head];
    this.head++;
    // Reclaim memory when the wasted front is > half the array
    if (this.head > this.items.length / 2) {
      this.items = this.items.slice(this.head);
      this.head  = 0;
    }
    return val;
  }

  peek()    { return this.isEmpty() ? null : this.items[this.head]; }
  isEmpty() { return this.head >= this.items.length; }
  size()    { return this.items.length - this.head; }
  toArray() { return this.items.slice(this.head); }
}

// ── Demo ──────────────────────────────────────
const q = new Queue();
q.enqueue(10);
q.enqueue(20);
q.enqueue(30);

console.log("Queue   :", q.toArray());   // [10, 20, 30]
console.log("peek    :", q.peek());      // 10
console.log("dequeue :", q.dequeue());   // 10
console.log("dequeue :", q.dequeue());   // 20
console.log("Queue   :", q.toArray());   // [30]
console.log("size    :", q.size());      // 1

// ── LeetCode 933: Number of Recent Calls ──────
class RecentCounter {
  constructor() { this.q = new Queue(); }
  ping(t) {
    this.q.enqueue(t);
    while (this.q.peek() < t - 3000) this.q.dequeue();
    return this.q.size();
  }
}

const rc = new RecentCounter();
console.log("\nRecentCounter pings:");
console.log(rc.ping(1));     // 1
console.log(rc.ping(100));   // 2
console.log(rc.ping(3001));  // 3
console.log(rc.ping(3002));  // 3  (ping(1) slides out of the 3000ms window)
`,
    },
    interviewQuestions: [
      {
        question:
          "Why is using shift() for dequeue bad, and how do you fix it?",
        difficulty: "Easy",
        hint: "shift() is O(n) because JavaScript must decrement the index of every remaining element after removing index 0. Fix it with a head pointer: track the front index, increment it on dequeue, and periodically compact the backing array. This gives O(1) amortized dequeue.",
      },
      {
        question:
          "Implement a Recent Calls counter that returns the number of requests in the last 3000 ms. (LeetCode 933)",
        difficulty: "Easy",
        hint: "Use a queue. On each ping(t), enqueue t, then dequeue any t' where t' < t − 3000. The queue size is the answer. O(1) amortized per call because each ping is enqueued and dequeued exactly once.",
      },
      {
        question:
          "How does an array-based queue waste memory, and when should you prefer a Circular Queue?",
        difficulty: "Medium",
        hint: "Even with a head pointer, dequeued slots at the front accumulate over time. In a long-running system with continuous enqueue/dequeue cycles the backing array grows unbounded. A circular queue reuses those freed slots via modulo arithmetic, keeping memory fixed at the declared capacity.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Queue using Linked List
  // ─────────────────────────────────────────────
  {
    id: "queue-linked-list",
    title: "Queue using Linked List",
    slug: "queue-linked-list",
    icon: "Network",
    difficulty: "Intermediate",
    description:
      "Build a Queue with a singly linked list using head and tail pointers. Both enqueue and dequeue are true O(1) — no amortized cost, no wasted slots.",
    concept: {
      explanation:
        "A linked-list queue maintains two pointers: head (front) and tail (rear). enqueue() appends a new node at the tail in O(1). dequeue() removes the head node in O(1). Both are true O(1) with no amortized cost and no memory waste from old slots — a dequeued node is immediately eligible for garbage collection. The only trade-off over an array queue is the extra .next pointer per node (one word of overhead per element).",
      realLifeAnalogy:
        "Picture a buffet serving line where kitchen staff attach new trays to the back (enqueue at tail) and the first guest takes from the front (dequeue from head). Both ends work independently and instantly — no one has to shuffle, no slots sit empty.",
      keyPoints: [
        "head = front of queue — dequeue removes head, head = head.next",
        "tail = rear of queue  — enqueue appends to tail, tail = newNode",
        "When dequeuing the last element, set both head and tail to null",
        "Both enqueue and dequeue are true O(1) — no amortized spikes",
        "No wasted slots — dequeued nodes are immediately garbage-collected",
        "Extra memory cost: one .next pointer per node vs a packed array",
        "Ideal for BFS, task scheduling, and any queue of unknown size",
        "Foundation for more advanced structures: deque, priority queue",
      ],
      timeComplexity: "enqueue O(1) · dequeue O(1) · peek O(1)",
      spaceComplexity: "O(n)",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Queue using Linked List =====

class Node {
  constructor(val) {
    this.val  = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head  = null;  // front — dequeue here
    this.tail  = null;  // rear  — enqueue here
    this._size = 0;
  }

  enqueue(val) {
    const node = new Node(val);
    if (!this.tail) {
      this.head = this.tail = node;   // first element
    } else {
      this.tail.next = node;
      this.tail      = node;
    }
    this._size++;
  }

  dequeue() {
    if (!this.head) return null;
    const val = this.head.val;
    this.head = this.head.next;
    if (!this.head) this.tail = null; // queue is now empty — clear tail too!
    this._size--;
    return val;
  }

  peek()    { return this.head ? this.head.val : null; }
  isEmpty() { return this.head === null; }
  size()    { return this._size; }

  toArray() {
    const out = [];
    let cur = this.head;
    while (cur) { out.push(cur.val); cur = cur.next; }
    return out;
  }
}

// ── Demo ──────────────────────────────────────
const q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log("Queue   :", q.toArray());   // [1, 2, 3]
console.log("peek    :", q.peek());      // 1
console.log("dequeue :", q.dequeue());   // 1
console.log("dequeue :", q.dequeue());   // 2
console.log("Queue   :", q.toArray());   // [3]
console.log("size    :", q.size());      // 1

// ── BFS using Queue ───────────────────────────
function bfs(graph, start) {
  const visited = new Set([start]);
  const q       = new Queue();
  const order   = [];
  q.enqueue(start);

  while (!q.isEmpty()) {
    const node = q.dequeue();
    order.push(node);
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        q.enqueue(neighbor);
      }
    }
  }
  return order;
}

const graph = { A: ["B", "C"], B: ["D"], C: ["D", "E"], D: [], E: [] };
console.log("\nBFS from A:", bfs(graph, "A")); // ["A", "B", "C", "D", "E"]
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the advantage of a linked-list queue over an array-based queue?",
        difficulty: "Easy",
        hint: "Linked-list gives true O(1) enqueue and dequeue — no amortized spikes and no wasted memory slots. Array queues either pay O(n) for shift() or accumulate wasted head slots. The downside is slightly more memory per element due to the .next pointer.",
      },
      {
        question:
          "What bug occurs if you forget to set tail = null when dequeuing the last element?",
        difficulty: "Easy",
        hint: "tail still points to the now-deleted node. The next enqueue will set tail.next on a stale reference and then update tail to the new node — but head is still null. The queue reports size 1 but peek()/dequeue() return null because head was never updated. Always set both head and tail to null when the last element is removed.",
      },
      {
        question:
          "Implement BFS (Breadth-First Search) on a graph using a queue.",
        difficulty: "Medium",
        hint: "Enqueue the source node, mark it visited. Loop: dequeue a node, record it, then enqueue all unvisited neighbors and mark them visited. The FIFO order ensures nodes are explored level by level. Time O(V + E), Space O(V) for the visited set and queue.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Circular Queue
  // ─────────────────────────────────────────────
  {
    id: "circular-queue",
    title: "Circular Queue",
    slug: "circular-queue",
    icon: "RefreshCw",
    difficulty: "Intermediate",
    description:
      "A fixed-size ring buffer where rear and front pointers wrap around with modulo arithmetic — no wasted slots, O(1) enqueue and dequeue. The foundation of OS I/O buffers and streaming pipelines.",
    concept: {
      explanation:
        "A circular queue (ring buffer) is a fixed-capacity array where the rear and front indices wrap around using modulo arithmetic. When rear reaches the last index, it wraps to 0, reusing slots freed by earlier dequeues. enqueue: store value at rear, then rear = (rear + 1) % capacity. dequeue: read value at front, then front = (front + 1) % capacity. The queue is full when (rear + 1) % capacity === front, and empty when front === -1 (or tracked via a separate size counter).",
      realLifeAnalogy:
        "Imagine a conveyor belt with a fixed number of slots and no end — it loops back on itself. Items are placed at the rear marker and removed from the front marker. When the rear marker completes a revolution, it reuses the emptied slots at the front. The belt never wastes a slot.",
      keyPoints: [
        "Fixed capacity — size is set at construction and never changes",
        "enqueue: data[rear] = val; rear = (rear + 1) % capacity",
        "dequeue: front = (front + 1) % capacity",
        "Full: (rear + 1) % capacity === front   (or size === capacity)",
        "Empty: front === -1   (or size === 0)",
        "No wasted slots — every freed slot is immediately reusable",
        "Real-world uses: OS keyboard/I-O buffers, audio/video streaming, producer-consumer rings",
        "LeetCode 622: Design Circular Queue",
      ],
      timeComplexity: "enqueue O(1) · dequeue O(1) · Front O(1) · Rear O(1)",
      spaceComplexity: "O(capacity) — fixed array allocated at construction",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Circular Queue / Ring Buffer (LeetCode 622) =====

class CircularQueue {
  constructor(k) {
    this.data     = new Array(k);
    this.capacity = k;
    this.front    = -1;  // -1 signals empty
    this.rear     = -1;
    this._size    = 0;
  }

  enqueue(val) {
    if (this.isFull()) return false;
    if (this.isEmpty()) this.front = 0;   // first element
    this.rear            = (this.rear + 1) % this.capacity;
    this.data[this.rear] = val;
    this._size++;
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return false;
    if (this.front === this.rear) {        // removing the last element
      this.front = this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.capacity;
    }
    this._size--;
    return true;
  }

  Front()   { return this.isEmpty() ? -1 : this.data[this.front]; }
  Rear()    { return this.isEmpty() ? -1 : this.data[this.rear]; }
  isEmpty() { return this._size === 0; }
  isFull()  { return this._size === this.capacity; }
  size()    { return this._size; }
}

// ── Demo ──────────────────────────────────────
const cq = new CircularQueue(4);

console.log("enqueue 1 :", cq.enqueue(1));  // true
console.log("enqueue 2 :", cq.enqueue(2));  // true
console.log("enqueue 3 :", cq.enqueue(3));  // true
console.log("enqueue 4 :", cq.enqueue(4));  // true
console.log("enqueue 5 :", cq.enqueue(5));  // false — full
console.log("Front     :", cq.Front());     // 1
console.log("Rear      :", cq.Rear());      // 4

console.log("\ndequeue   :", cq.dequeue()); // true  (removes 1, slot 0 freed)
console.log("enqueue 5 :", cq.enqueue(5)); // true  (slot 0 reused via wrap-around!)
console.log("Front     :", cq.Front());    // 2
console.log("Rear      :", cq.Rear());     // 5
console.log("size      :", cq.size());     // 4

// ── Visualize the wrap-around ─────────────────
//  capacity = 4, indices 0..3
//
//  After enqueue(1,2,3,4):   data = [1, 2, 3, 4]  front=0  rear=3
//  After dequeue():          data = [_, 2, 3, 4]  front=1  rear=3
//  After enqueue(5):         data = [5, 2, 3, 4]  front=1  rear=0  ← wrapped!
//
//  Reading in order from front: 2, 3, 4, 5 ✓
`,
    },
    interviewQuestions: [
      {
        question:
          "Implement Design Circular Queue (LeetCode 622). What is the full/empty detection formula?",
        difficulty: "Medium",
        hint: "Track a size counter alongside front and rear. isFull: size === capacity. isEmpty: size === 0. On enqueue: rear = (rear + 1) % capacity, increment size. On dequeue: front = (front + 1) % capacity, decrement size. Reset front and rear to -1 when size reaches 0 (optional but cleaner).",
      },
      {
        question:
          "What are real-world uses of a circular queue / ring buffer?",
        difficulty: "Easy",
        hint: "Ring buffers are ubiquitous in systems programming: OS keyboard and I/O buffers, audio and video streaming pipelines (each frame occupies the next slot), network packet queues, and producer-consumer problems with a fixed buffer. The circular layout means no memory allocation after initialization — old slots are overwritten.",
      },
      {
        question:
          "How does a circular queue solve the 'false full' problem of a linear array queue?",
        difficulty: "Easy",
        hint: "A linear array queue with a head pointer becomes falsely full when rear reaches the end of the array even though earlier indices (before head) are empty. A circular queue wraps rear back to 0 via (rear + 1) % capacity, reusing those freed slots. Memory utilization stays at 100% up to capacity.",
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

  // ─────────────────────────────────────────────
  // Queue using Stack
  // ─────────────────────────────────────────────
  {
    id: "queue-using-stack",
    title: "Queue using Stack",
    slug: "queue-using-stack",
    icon: "GitMerge",
    difficulty: "Intermediate",
    description:
      "Simulate a FIFO queue with two LIFO stacks. Pouring one stack into another reverses order, converting LIFO to FIFO. Amortized O(1) per operation. Classic LeetCode 232.",
    concept: {
      explanation:
        "You maintain two stacks: inbox (receives all enqueues) and outbox (serves all dequeues). enqueue always pushes onto inbox. dequeue pops from outbox; if outbox is empty, all elements from inbox are transferred to outbox by popping one by one — this reversal converts LIFO order into FIFO order. Each element moves at most twice (once into inbox, once into outbox), so the amortized cost per operation is O(1) even though a single dequeue can cost O(n) in the worst case.",
      realLifeAnalogy:
        "Imagine two stacks of plates: inbox (dirty plates stacked up) and outbox (plates ready to serve). Guests always add dirty plates to the inbox. When the outbox is empty and someone needs a plate, a worker flips all inbox plates into the outbox — reversing their order. The first plate dirtied (bottom of inbox) is now on top of outbox, served first. That is FIFO from two stacks.",
      keyPoints: [
        "inbox stack: receives all enqueues via push()",
        "outbox stack: serves all dequeues and peeks via pop()",
        "Transfer: when outbox is empty, pour entire inbox into outbox — this reverses order",
        "Reversal converts LIFO (stack) order into FIFO (queue) order",
        "Each element moves at most twice → O(1) amortized dequeue",
        "Worst-case single dequeue: O(n) when outbox is empty and inbox has n items",
        "peek() uses the same transfer-if-empty logic as dequeue()",
        "LeetCode 232: Implement Queue using Stacks",
      ],
      timeComplexity:
        "enqueue O(1) · dequeue O(1) amortized / O(n) worst case · peek O(1) amortized",
      spaceComplexity: "O(n)",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Queue using Two Stacks (LeetCode 232) =====

class MyQueue {
  constructor() {
    this.inbox  = [];   // all enqueues go here
    this.outbox = [];   // all dequeues come from here
  }

  enqueue(val) {
    this.inbox.push(val);
  }

  // Transfer inbox → outbox only when outbox is empty
  _transfer() {
    if (this.outbox.length === 0) {
      while (this.inbox.length) {
        this.outbox.push(this.inbox.pop()); // pop reverses order → FIFO!
      }
    }
  }

  dequeue() {
    this._transfer();
    return this.outbox.length ? this.outbox.pop() : null;
  }

  peek() {
    this._transfer();
    return this.outbox.length
      ? this.outbox[this.outbox.length - 1]
      : null;
  }

  isEmpty() { return this.inbox.length === 0 && this.outbox.length === 0; }
  size()    { return this.inbox.length + this.outbox.length; }
}

// ── Demo ──────────────────────────────────────
const q = new MyQueue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log("peek    :", q.peek());       // 1  (first in = first out)
console.log("dequeue :", q.dequeue());    // 1
console.log("dequeue :", q.dequeue());    // 2
q.enqueue(4);
q.enqueue(5);
console.log("peek    :", q.peek());       // 3
console.log("size    :", q.size());       // 3
console.log("dequeue :", q.dequeue());    // 3
console.log("dequeue :", q.dequeue());    // 4
console.log("dequeue :", q.dequeue());    // 5
console.log("isEmpty :", q.isEmpty());    // true

// ── How the transfer works ────────────────────
//
//  After enqueue(1, 2, 3):
//    inbox  = [1, 2, 3]  top → 3
//    outbox = []
//
//  dequeue() → outbox empty, so transfer:
//    pop 3 from inbox → push to outbox
//    pop 2 from inbox → push to outbox
//    pop 1 from inbox → push to outbox
//    inbox  = []
//    outbox = [3, 2, 1]  top → 1  ← reversed = FIFO ✓
//
//  pop from outbox → 1  (first in, first out) ✓
//  next dequeue()  → outbox still [3, 2], pop → 2 ✓
`,
    },
    interviewQuestions: [
      {
        question:
          "Why does pouring the inbox stack into the outbox produce FIFO order?",
        difficulty: "Easy",
        hint: "A stack is LIFO, so the first element pushed onto inbox sits at the bottom; the last is at the top. Popping inbox into outbox reverses this: the last-pushed element goes to the bottom of outbox and the first-pushed element ends up at the top. Popping from outbox now gives the original first-in order — exactly FIFO.",
      },
      {
        question:
          "What is the amortized O(1) cost of dequeue? Explain with the accounting method.",
        difficulty: "Medium",
        hint: "Each element is pushed and popped exactly twice: once onto inbox (enqueue) and once onto outbox (transfer). Assign 2 credits to each enqueue — 1 for the inbox push, 1 stored as credit. When the transfer fires, each element uses its stored credit to pay for the pop-from-inbox and push-to-outbox. Total: 2 operations per element → O(1) amortized, even though a single dequeue can be O(n) worst-case.",
      },
      {
        question: "How would you implement a Stack using two Queues?",
        difficulty: "Hard",
        hint: "Maintain one main queue. On push(val): enqueue val, then rotate the queue (dequeue every existing element and re-enqueue them) so the new val is at the front. pop()/top() simply dequeue from the front. push is O(n), pop is O(1). Alternatively keep two queues: on push, enqueue val to the empty queue, pour all of the full queue into it (so val is at the front), then swap queue names.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LEVEL 10 – Binary Trees
  // ─────────────────────────────────────────────
  {
    id: "binary-tree-basics",
    title: "Binary Tree Basics",
    slug: "binary-tree-basics",
    icon: "GitFork",
    difficulty: "Intermediate",
    description:
      "Understand the foundational structure of binary trees — nodes, children, root, leaves, height, and depth — and master the universal recursive pattern that powers every tree interview problem.",
    concept: {
      explanation:
        "A binary tree is a hierarchical, non-linear data structure where each node stores a value and holds references to at most two child nodes: left and right. The topmost node with no parent is called the root; every other node is reachable by exactly one path from the root. A node with no children is a leaf. All other nodes are internal nodes. The height of a tree is the maximum number of edges from the root to any leaf — an empty tree has height -1 by convention; a single-node tree has height 0. The depth of a node is its distance (in edges) from the root: the root has depth 0, its children have depth 1, and so on. Height and depth are related but opposite: height measures downward from a node (how far its subtree extends), depth measures upward to the root. Every recursive tree function follows a universal three-step pattern: (1) handle the null base case, (2) process the current node, (3) recurse on left and right children. Mastering this pattern lets you solve the vast majority of binary tree interview problems.",
      realLifeAnalogy:
        "Picture a company org-chart where every manager oversees at most two direct reports. The CEO at the top is the root — the single entry point. Employees with no reports are leaf nodes. The company height counts how many management levels exist from CEO to the most junior employee. An employee's depth is how many levels of management sit between them and the CEO. If you want to reach any employee you always start at the CEO and follow the chain of command — you cannot skip directly to a lower level, just as tree traversal always starts at the root.",
      keyPoints: [
        "Each node: { val, left, right } — left and right are null for leaf nodes",
        "Root: the only node with no parent; depth = 0; every tree has exactly one root",
        "Leaf: node where both left and right are null; height of a leaf = 0",
        "Height of a node: longest edge-path from that node to any leaf — height(null) = -1",
        "Depth of a node: number of edges from root to that node — root depth = 0",
        "Universal recursion pattern: if (!node) return base; process node; recurse left + right",
        "Balanced tree height = O(log n); skewed (degenerate) tree height = O(n) — same as a linked list",
        "In a full binary tree, leaf count = internal node count + 1",
      ],
      timeComplexity:
        "countNodes O(n) | height O(n) | depthOf O(n) | countLeaves O(n) | level-order insert O(n)",
      spaceComplexity:
        "O(n) to store the tree | O(h) call-stack per recursive call — O(log n) balanced, O(n) skewed",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Binary Tree Basics =====

// ── Node definition ─────────────────────────────────────
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val   = val;    // value stored at this node
    this.left  = left;   // left child  (TreeNode | null)
    this.right = right;  // right child (TreeNode | null)
  }
}

// ── Build a tree manually ────────────────────────────────
//
//          1          ← root     (depth 0)
//        /   \
//       2     3       ← internal (depth 1)
//      / \   / \
//     4   5 6   7     ← depth 2
//    /
//   8                 ← leaf     (depth 3)
//
// Height = 3  (path 1→2→4→8)   |   Leaves: 5, 6, 7, 8

const root = new TreeNode(1);
root.left              = new TreeNode(2);
root.right             = new TreeNode(3);
root.left.left         = new TreeNode(4);
root.left.right        = new TreeNode(5);
root.right.left        = new TreeNode(6);
root.right.right       = new TreeNode(7);
root.left.left.left    = new TreeNode(8);

// ── Count all nodes — O(n) ──────────────────────────────
// Universal pattern: handle null → process → recurse left + right
function countNodes(node) {
  if (!node) return 0;                              // null → 0 nodes
  return 1 + countNodes(node.left) + countNodes(node.right);
}
console.log("Nodes:", countNodes(root));            // 8

// ── Height — O(n) ───────────────────────────────────────
// height(null) = -1  so that height(single leaf) = 0
function height(node) {
  if (!node) return -1;
  return 1 + Math.max(height(node.left), height(node.right));
}
console.log("Height:", height(root));              // 3

// ── Depth of a value — O(n) ─────────────────────────────
function depthOf(node, target, d = 0) {
  if (!node) return -1;                             // not found in this path
  if (node.val === target) return d;
  const left = depthOf(node.left,  target, d + 1);
  if (left !== -1) return left;                     // found in left subtree
  return depthOf(node.right, target, d + 1);
}
console.log("Depth of root (1):", depthOf(root, 1));  // 0
console.log("Depth of node 5: ", depthOf(root, 5));   // 2
console.log("Depth of node 8: ", depthOf(root, 8));   // 3

// ── Leaf detection — O(1) ───────────────────────────────
const isLeaf = (node) => node !== null && !node.left && !node.right;

// ── Count leaf nodes — O(n) ─────────────────────────────
function countLeaves(node) {
  if (!node) return 0;
  if (isLeaf(node)) return 1;
  return countLeaves(node.left) + countLeaves(node.right);
}
console.log("Leaves:", countLeaves(root));          // 4  (nodes 5, 6, 7, 8)

// ── Level-order insertion (complete binary tree) ─────────
// Fills first available slot left-to-right per level using a queue
function insert(root, val) {
  const node = new TreeNode(val);
  if (!root) return node;
  const queue = [root];
  while (queue.length) {
    const cur = queue.shift();
    if (!cur.left)  { cur.left  = node; return root; }
    else queue.push(cur.left);
    if (!cur.right) { cur.right = node; return root; }
    else queue.push(cur.right);
  }
  return root;
}

// Insert 1–7 → perfect binary tree of height 2
let complete = null;
for (let i = 1; i <= 7; i++) complete = insert(complete, i);
console.log("Complete tree height:", height(complete)); // 2

// ── Tree summary ─────────────────────────────────────────
const n = countNodes(root), h = height(root), l = countLeaves(root);
console.log("\n--- Tree Summary ---");
console.log("Total nodes  :", n);                  // 8
console.log("Height       :", h);                  // 3
console.log("Leaves       :", l);                  // 4
console.log("Internal     :", n - l);               // 4
console.log("Balanced?    :", h <= Math.floor(Math.log2(n))); // false (skewed left)
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the difference between height and depth in a binary tree?",
        difficulty: "Easy",
        hint: "Height is a property of a subtree — it measures the longest path going downward from a given node to a leaf. Depth is a property of an individual node — it measures how far that node is from the root going upward. height(leaf) = 0, depth(root) = 0. They are opposite directions: height looks down, depth looks up. For the root specifically, depth = 0 and height = overall tree height.",
      },
      {
        question:
          "Write a recursive function to find the height of a binary tree. What is the base case and why is it -1?",
        difficulty: "Easy",
        hint: "Base case: height(null) = -1. This convention ensures that a single leaf node (both children null) returns 1 + max(-1, -1) = 0, which correctly means zero edges below it. The recursive case: height(node) = 1 + max(height(node.left), height(node.right)). The +1 counts the edge from the current node to its taller child. Using 0 for the null case would inflate every node's height by 1.",
      },
      {
        question:
          "What is the relationship between number of nodes and height in a balanced vs. skewed binary tree?",
        difficulty: "Medium",
        hint: "A perfectly balanced binary tree with n nodes has height floor(log₂n) — each level doubles the node count, so you only need log₂n levels for n nodes. A completely skewed tree (all nodes in one direction, like a linked list) has height n-1. This is why BST search is O(log n) when balanced but degrades to O(n) when skewed. A balanced tree with height h can hold up to 2^(h+1) - 1 nodes; at minimum it holds h+1 nodes (completely skewed).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LEVEL 10 – Tree Traversals
  // ─────────────────────────────────────────────
  {
    id: "tree-traversals",
    title: "Tree Traversals",
    slug: "tree-traversals",
    icon: "Route",
    difficulty: "Intermediate",
    description:
      "Master all four fundamental binary tree traversal strategies — Inorder, Preorder, Postorder (DFS), and Level Order (BFS) — and understand when and why to choose each one.",
    concept: {
      explanation:
        "Tree traversal is the systematic process of visiting every node in a binary tree exactly once. There are two major strategies: Depth-First Search (DFS) and Breadth-First Search (BFS). DFS dives as deep as possible before backtracking, and comes in three orderings depending on when you process the current node relative to its children. Inorder (Left → Node → Right) visits the left subtree, processes the current node, then visits the right subtree — this ordering produces a sorted sequence for Binary Search Trees. Preorder (Node → Left → Right) processes the current node first, then recurses — ideal for copying or serializing a tree because the root is always output first. Postorder (Left → Right → Node) processes children before the parent — used for deleting a tree (children freed before the parent) or evaluating expression trees (operands evaluated before the operator). Level Order (BFS) uses a queue to visit nodes level by level from root to leaves — essential for problems that ask about levels, minimum depth, zigzag traversal, or connecting nodes at the same depth. Every DFS traversal has both a recursive form (clean, uses the call stack as the implicit stack) and an iterative form (uses an explicit stack/queue, avoids stack-overflow on very deep trees).",
      realLifeAnalogy:
        "Imagine exploring a city built as a branching road network. Preorder is like a tour guide who announces 'We are at landmark X' before sending you down any side streets — you always know where you are before going deeper. Inorder is like reading every sign strictly left-to-right as you walk, so you always finish the entire left district before coming back to the city centre and then heading right. Postorder is like a building inspector who must inspect every floor's rooms before certifying the floor — children are verified before the parent. Level Order is like evacuating a building floor by floor: everyone on floor 1 leaves first, then floor 2, then floor 3, regardless of which wing or branch they are in.",
      keyPoints: [
        "Inorder (L→N→R): produces sorted output for a BST; use for BST problems requiring ascending order",
        "Preorder (N→L→R): root always comes first; use to serialise/copy a tree or find root-to-leaf paths",
        "Postorder (L→R→N): children processed before parent; use for tree deletion, expression evaluation, bottom-up aggregation",
        "Level Order (BFS): uses a queue; processes nodes breadth-first; use for level-related problems (min depth, right side view, zigzag)",
        "All four run in O(n) time — every node is visited exactly once",
        "DFS space: O(h) call stack — O(log n) balanced, O(n) skewed; BFS space: O(w) where w is max level width ≈ O(n/2) for the last level",
        "Iterative inorder uses an explicit stack and a 'current' pointer; iterative level order uses a queue with a level-size snapshot",
        "To separate levels in BFS output, snapshot queue.length at the start of each iteration as the level boundary",
      ],
      timeComplexity: "O(n) — all four traversals visit each of the n nodes exactly once",
      spaceComplexity:
        "O(h) for DFS (call-stack depth equals tree height) | O(w) for BFS (queue holds at most one full level — up to n/2 nodes)",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Binary Tree Traversals =====

// ── Node definition ─────────────────────────────────────
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val   = val;
    this.left  = left;
    this.right = right;
  }
}

// ── Build sample tree ────────────────────────────────────
//
//          1
//        /   \
//       2     3
//      / \     \
//     4   5     6
//
// Inorder:    [4, 2, 5, 1, 3, 6]
// Preorder:   [1, 2, 4, 5, 3, 6]
// Postorder:  [4, 5, 2, 6, 3, 1]
// LevelOrder: [[1], [2,3], [4,5,6]]

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, null,            new TreeNode(6)));

// ── 1. Inorder  (Left → Node → Right) ──────────────────
// Key property: gives sorted output for a BST.
function inorder(node, result = []) {
  if (!node) return result;
  inorder(node.left, result);   // recurse left
  result.push(node.val);        // visit node
  inorder(node.right, result);  // recurse right
  return result;
}
console.log("Inorder   :", inorder(root));   // [4, 2, 5, 1, 3, 6]

// ── 2. Preorder (Node → Left → Right) ──────────────────
// Root appears first → good for serialisation / path tracking.
function preorder(node, result = []) {
  if (!node) return result;
  result.push(node.val);          // visit node first
  preorder(node.left, result);
  preorder(node.right, result);
  return result;
}
console.log("Preorder  :", preorder(root));  // [1, 2, 4, 5, 3, 6]

// ── 3. Postorder (Left → Right → Node) ─────────────────
// Children fully processed before parent → deletion, eval trees.
function postorder(node, result = []) {
  if (!node) return result;
  postorder(node.left, result);
  postorder(node.right, result);
  result.push(node.val);          // visit node last
  return result;
}
console.log("Postorder :", postorder(root)); // [4, 5, 2, 6, 3, 1]

// ── 4. Level Order — BFS (queue-based) ─────────────────
// Returns an array of levels; each level is an array of values.
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue  = [root];
  while (queue.length) {
    const levelSize = queue.length; // snapshot: nodes on this level
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
console.log("LevelOrder:", JSON.stringify(levelOrder(root)));
// [[1],[2,3],[4,5,6]]

// ── 5. Iterative Inorder (explicit stack) ───────────────
// Avoids recursion limit on deeply skewed trees.
function inorderIterative(root) {
  const result  = [];
  const stack   = [];
  let   current = root;
  while (current || stack.length) {
    while (current) {             // go as far left as possible
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();        // backtrack to last unvisited node
    result.push(current.val);     // visit
    current = current.right;      // pivot to right subtree
  }
  return result;
}
console.log("Inorder(I):", inorderIterative(root)); // [4, 2, 5, 1, 3, 6]

// ── Summary ──────────────────────────────────────────────
console.log("\n--- When to use each ---");
console.log("Inorder    → sorted BST output, kth smallest");
console.log("Preorder   → copy/serialise tree, path sum");
console.log("Postorder  → delete tree, bottom-up aggregation");
console.log("LevelOrder → min depth, right side view, zigzag");
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the difference between Inorder, Preorder, and Postorder traversals? Give the output for a simple tree.",
        difficulty: "Easy",
        hint: "Inorder is L→N→R (sorted for BST). Preorder is N→L→R (root first). Postorder is L→R→N (root last). For a tree with root 1, left child 2, right child 3: Inorder = [2,1,3], Preorder = [1,2,3], Postorder = [2,3,1]. The key is the position of N (the current node) in the pattern — before (Pre), between (In), or after (Post) the children.",
      },
      {
        question:
          "How does Level Order traversal work? What data structure does it use and why?",
        difficulty: "Easy",
        hint: "Level Order uses a queue (FIFO). You enqueue the root, then repeatedly dequeue a node, record its value, and enqueue its left and right children. The FIFO property ensures that all nodes at depth d are processed before any node at depth d+1. To separate levels, snapshot queue.length at the start of each iteration — that count tells you how many nodes belong to the current level.",
      },
      {
        question:
          "Write an iterative inorder traversal without recursion. Explain the role of the stack and the 'current' pointer.",
        difficulty: "Medium",
        hint: "Maintain a stack and a 'current' pointer starting at root. First, drive current all the way left, pushing each node onto the stack. When current is null, pop from the stack (the leftmost unvisited node), record its value, then set current = node.right to explore the right subtree. The stack simulates the call stack of the recursive version — it saves nodes we have seen but not yet processed while we went left.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LEVEL 10 – Binary Search Tree
  // ─────────────────────────────────────────────
  {
    id: "binary-search-tree",
    title: "Binary Search Tree",
    slug: "binary-search-tree",
    icon: "Search",
    difficulty: "Intermediate",
    description:
      "Learn how Binary Search Trees maintain the ordering invariant at every node, enabling O(log n) insert and search on balanced trees — and master the validation algorithm using propagated min/max bounds.",
    concept: {
      explanation:
        "A Binary Search Tree (BST) is a binary tree that enforces a strict ordering invariant at every single node: all values in a node's left subtree must be strictly less than the node's value, and all values in its right subtree must be strictly greater. This invariant holds recursively — it is not just about a node and its immediate children, but about every node in every subtree. This property enables a powerful divide-and-conquer search: at each node, compare the target to the current value — if equal, you have found it; if the target is smaller, it can only exist in the left subtree, so you ignore the right; if larger, you ignore the left. Each comparison eliminates roughly half the remaining search space (assuming a balanced tree), giving O(log n) search. Insertion works identically to search: follow the same left/right decisions until you find an empty (null) slot, then place the new node there. Validation is the classic BST interview problem — a common wrong answer checks only that each node's immediate children satisfy the invariant, missing cases like a node in the right subtree of an ancestor that is actually less than that ancestor. The correct approach passes a [min, max] range down to every node: a node is valid only if its value strictly falls inside its allowed range, and it recursively tightens the range for each child.",
      realLifeAnalogy:
        "A BST is like a well-organized library filing system where every shelf has a sign saying 'all books to my left have titles earlier in the alphabet; all books to my right come later.' When you search for a book, you never have to check the wrong side — you just follow the signs. Inserting a new book is equally guided: keep walking in the right direction until you find an empty slot. The validation problem is like an auditor who must verify that not only is each shelf's immediate left-right split correct, but also that no book has been accidentally placed in the wrong section of a higher-level category.",
      keyPoints: [
        "BST invariant: left subtree values < node.val < right subtree values — applies recursively to ALL descendants, not just immediate children",
        "Search: compare target to current node → go left if smaller, go right if larger → O(log n) balanced, O(n) degenerate",
        "Insert: follow the search path until a null slot is found → always creates a new leaf → O(log n) average",
        "Inorder traversal of a valid BST always produces a strictly sorted ascending sequence",
        "Validation: pass [min, max] bounds down the recursion — wrong approach is checking only immediate children",
        "Duplicates: classic BST rejects them (strictly < and >); some variants store count or route duplicates right",
        "Self-balancing BSTs (AVL, Red-Black) maintain O(log n) height automatically — vanilla BST can degrade to O(n)",
        "Deleting a node with two children: replace with inorder successor (smallest in right subtree) or inorder predecessor",
      ],
      timeComplexity:
        "Search O(log n) avg / O(n) worst | Insert O(log n) avg / O(n) worst | Validate O(n) — must visit all nodes",
      spaceComplexity:
        "O(h) for recursion stack — O(log n) balanced, O(n) skewed",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Binary Search Tree: Insert, Search, Validate =====

// ── Node definition ─────────────────────────────────────
class BSTNode {
  constructor(val) {
    this.val   = val;
    this.left  = null;
    this.right = null;
  }
}

// ── Insert ───────────────────────────────────────────────
// Follow BST order to find the correct null slot, then insert.
// Returns the (possibly new) root.
function insert(root, val) {
  if (!root) return new BSTNode(val);        // empty slot → place here
  if (val < root.val)
    root.left  = insert(root.left,  val);    // smaller → go left
  else if (val > root.val)
    root.right = insert(root.right, val);    // larger  → go right
  // if val === root.val: ignore duplicate
  return root;
}

// Build BST by inserting [5, 3, 7, 2, 4, 6, 8]:
//
//         5
//        / \
//       3   7
//      / \ / \
//     2  4 6  8
//
let bst = null;
[5, 3, 7, 2, 4, 6, 8].forEach(v => bst = insert(bst, v));

// ── Search ───────────────────────────────────────────────
// At each node: if val matches → found.
// If target < val → search left only.
// If target > val → search right only.
function search(root, target) {
  if (!root) return false;                   // exhausted → not found
  if (root.val === target) return true;      // match!
  if (target < root.val)
    return search(root.left,  target);       // can only be in left subtree
  return   search(root.right, target);       // can only be in right subtree
}

console.log("Search 4:", search(bst, 4));    // true
console.log("Search 9:", search(bst, 9));    // false
console.log("Search 1:", search(bst, 1));    // false

// ── Validate BST ─────────────────────────────────────────
// WRONG approach: only checking left < root && right > root
// misses cases where a deep descendant violates an ancestor's bound.
//
// CORRECT approach: pass allowed (min, max) range to every node.
// Each node's value must be strictly inside its range.
// Going left  → upper bound becomes the current node's value.
// Going right → lower bound becomes the current node's value.
function isValidBST(node, min = -Infinity, max = Infinity) {
  if (!node) return true;                          // null is always valid
  if (node.val <= min || node.val >= max)
    return false;                                  // out of allowed range!
  return isValidBST(node.left,  min, node.val)    // left:  must be < val
      && isValidBST(node.right, node.val, max);   // right: must be > val
}

console.log("\nValid BST:", isValidBST(bst));   // true

// Build a subtly INVALID BST:
//     5
//    / \
//   3   7
//    \
//     6   ← 6 > 5, so it CANNOT be anywhere in the left subtree of 5
//
const bad = new BSTNode(5);
bad.left         = new BSTNode(3);
bad.right        = new BSTNode(7);
bad.left.right   = new BSTNode(6); // violates: 6 must be < 5 to live left of 5
console.log("Invalid BST:", isValidBST(bad)); // false

// ── BST Inorder = sorted output ──────────────────────────
function inorder(node, res = []) {
  if (!node) return res;
  inorder(node.left, res);
  res.push(node.val);
  inorder(node.right, res);
  return res;
}
console.log("\nBST Inorder (must be sorted):", inorder(bst));
// [2, 3, 4, 5, 6, 7, 8]  ✓

// ── Min / Max in BST ─────────────────────────────────────
// Min: keep going left | Max: keep going right
function bstMin(root) {
  while (root.left) root = root.left;
  return root.val;
}
function bstMax(root) {
  while (root.right) root = root.right;
  return root.val;
}
console.log("\nMin:", bstMin(bst)); // 2
console.log("Max:", bstMax(bst)); // 8
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the BST invariant, and why is it recursive (not just about immediate children)?",
        difficulty: "Easy",
        hint: "The BST invariant states that for every node N, ALL values in N's left subtree are strictly less than N.val, and ALL values in its right subtree are strictly greater. 'All' means every descendant, not just direct children. Example violation: a right child has a left subtree node that is smaller than the grandparent — it satisfies the immediate child's BST rule but violates the grandparent's rule. This is why validation must pass min/max bounds down the entire tree.",
      },
      {
        question:
          "Why does checking only immediate children fail to validate a BST? Show an example.",
        difficulty: "Medium",
        hint: "Consider root=5, left=3, and left.right=6. Checking immediately: 3 < 5 (OK), 6 > 3 (OK at that local level). But 6 > 5 means it cannot be anywhere in the left subtree of 5 — it violates the root's invariant. The immediate-child check misses this because it only compares 6 to its direct parent (3), not to its grandparent (5). The correct fix: pass (min=-Inf, max=5) to the left subtree, so 6 fails the max=5 check.",
      },
      {
        question:
          "What is the time complexity of BST search, and when does it degrade to O(n)?",
        difficulty: "Medium",
        hint: "Average case: O(log n) because a balanced BST halves the search space at each node (like binary search on a sorted array). Worst case: O(n) when the tree is completely skewed — e.g., inserting [1,2,3,4,5] in sorted order builds a right-only chain, effectively a linked list. The BST invariant is maintained but there is no balance. Self-balancing trees (AVL, Red-Black) prevent this degradation by rotating nodes after insertions.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LEVEL 10 – Diameter of Binary Tree
  // ─────────────────────────────────────────────
  {
    id: "diameter-binary-tree",
    title: "Diameter of Binary Tree",
    slug: "diameter-binary-tree",
    icon: "Ruler",
    difficulty: "Intermediate",
    description:
      "Find the length of the longest path between any two nodes in a binary tree — the diameter — using a single post-order DFS that computes height and updates the global maximum simultaneously.",
    concept: {
      explanation:
        "The diameter of a binary tree is defined as the number of edges in the longest path between any two nodes. The path does not have to pass through the root — it can connect any two leaf nodes through any common ancestor. This makes the problem non-trivial: a naive approach that only considers paths through the root will miss longer paths that lie entirely within a subtree. The key insight is that the longest path through any particular node N is the sum of the height of N's left subtree and the height of N's right subtree, plus 2 (the two edges connecting N to the tops of each subtree). Formally: diameterAt(N) = height(N.left) + 1 + height(N.right) + 1. The global diameter is the maximum of this value across every node. The elegant implementation combines height calculation with diameter tracking in a single post-order DFS: recurse to the children first (post-order), get their heights, compute the candidate diameter at the current node, update a global maximum, and return the current node's height to the parent. This achieves O(n) time by computing both values in one pass, avoiding the naive O(n²) approach of calling a separate height function at each node.",
      realLifeAnalogy:
        "Imagine a tree-shaped subway network where stations are nodes and tracks are edges. The diameter is the longest direct trip you can take without any transfers (no backtracking — a simple path). Most trips go through the central hub (root), but some long routes might loop through a branch station that serves as the pivot for two long arms. To find the longest trip efficiently, a surveyor visits each station once (DFS), measures how far the left and right arms extend from that station, records the total arm span at each station, and reports the maximum arm span found anywhere in the network.",
      keyPoints: [
        "Diameter = longest edge-path between any two nodes; path may or may not pass through the root",
        "At each node N: candidate diameter = height(N.left) + height(N.right) + 2 (using height(null) = -1)",
        "Global answer is the max of all candidate diameters across every node in the tree",
        "Efficient solution: combine height computation and diameter update in one post-order DFS → O(n)",
        "Naive solution: call height() separately at every node to compute diameter → O(n²) — avoid this",
        "Single-node tree: height = 0, diameter = 0 (no edges); empty tree: diameter = 0",
        "The diameter can also be expressed as the max number of NODES on the longest path: edges + 1",
        "This post-order DFS + global variable pattern is reused in many tree problems: max path sum, longest path, etc.",
      ],
      timeComplexity:
        "O(n) — each node is visited exactly once in the combined DFS",
      spaceComplexity:
        "O(h) for recursion call stack — O(log n) balanced, O(n) skewed",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Diameter of Binary Tree =====

// ── Node definition ─────────────────────────────────────
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val   = val;
    this.left  = left;
    this.right = right;
  }
}

// ── Build sample tree ────────────────────────────────────
//
//          1
//        /   \
//       2     3
//      / \
//     4   5
//    /
//   6
//
// Longest path: 6 → 4 → 2 → 1 → 3  (4 edges)
// Diameter = 4

const root = new TreeNode(1);
root.left           = new TreeNode(2);
root.right          = new TreeNode(3);
root.left.left      = new TreeNode(4);
root.left.right     = new TreeNode(5);
root.left.left.left = new TreeNode(6);

// ── Efficient O(n) solution ──────────────────────────────
// Single post-order DFS: compute height AND update diameter together.
// height(null) = -1  →  height(leaf) = 1 + max(-1,-1) = 0
// At each node: candidate = leftH + rightH + 2 edges
function diameterOfBinaryTree(root) {
  let maxDiameter = 0;

  function height(node) {
    if (!node) return -1;                    // base: null height = -1
    const leftH  = height(node.left);        // recurse left first (post-order)
    const rightH = height(node.right);       // recurse right

    // Longest path pivoting through this node:
    // (leftH + 1) edges going down-left + (rightH + 1) edges going down-right
    const candidate = leftH + rightH + 2;
    maxDiameter = Math.max(maxDiameter, candidate);

    return 1 + Math.max(leftH, rightH);      // this node's own height
  }

  height(root);
  return maxDiameter;
}

console.log("Diameter:", diameterOfBinaryTree(root)); // 4

// ── Edge cases ───────────────────────────────────────────
// Single node
console.log("Single node:", diameterOfBinaryTree(new TreeNode(42))); // 0

// Linear tree (skewed) — like a linked list: 1 → 2 → 3 → 4 (3 edges)
let linear = new TreeNode(1);
linear.right = new TreeNode(2);
linear.right.right = new TreeNode(3);
linear.right.right.right = new TreeNode(4);
console.log("Linear tree:", diameterOfBinaryTree(linear)); // 3

// Balanced tree — diameter passes through root
//      1
//     / \
//    2   3
//   /     \
//  4       5
// Path: 4 → 2 → 1 → 3 → 5  (4 edges)
const balanced = new TreeNode(1);
balanced.left         = new TreeNode(2);
balanced.right        = new TreeNode(3);
balanced.left.left    = new TreeNode(4);
balanced.right.right  = new TreeNode(5);
console.log("Balanced tree:", diameterOfBinaryTree(balanced)); // 4

// ── Why naive O(n²) is slow ──────────────────────────────
// Bad idea: for every node call a separate height() → O(n) per node → O(n²) total.
// The efficient solution computes height ONCE per node during the diameter DFS.
console.log("\n--- Key insight ---");
console.log("Candidate at node N = height(left) + height(right) + 2");
console.log("Track global max across ALL nodes — not just the root.");
`,
    },
    interviewQuestions: [
      {
        question:
          "Why might the diameter of a binary tree NOT pass through the root? Give an example.",
        difficulty: "Easy",
        hint: "Consider a tree where the root has a single-node right subtree, but the left subtree contains two long arms. The longest path is entirely within the left subtree and never touches the root. More concretely: root=1, root.right=2 (short), root.left is a subtree with depth 3 on both sides — the diameter of that left subtree (6 edges) exceeds any path that goes through root=1 (at most 3+1+0 = 4 edges). This is why we must track maxDiameter at EVERY node, not just at the root.",
      },
      {
        question:
          "Why do we use height(null) = -1 rather than 0? What happens if you use 0?",
        difficulty: "Medium",
        hint: "Using height(null) = -1 ensures a leaf node returns height 0: 1 + max(-1, -1) = 0, meaning zero edges below the leaf. If you used height(null) = 0, a leaf would return height 1, inflating every node's height by 1. The diameter calculation leftH + rightH + 2 relies on heights being edge-counts. With -1 convention at null: a leaf's candidate = -1 + -1 + 2 = 0 (correct — a single node has no connecting edges). With 0: a leaf's candidate = 0 + 0 + 2 = 2, which incorrectly counts the two null children as real edges.",
      },
      {
        question:
          "What is the time complexity of the naive diameter algorithm vs the optimised one? How does the optimised version achieve O(n)?",
        difficulty: "Medium",
        hint: "Naive: for each of the n nodes, call a separate height() function that itself runs in O(n) → total O(n²). Optimised: merge the height computation INTO the diameter DFS. Instead of calling height() as a separate function, compute leftH and rightH as part of the same recursion that updates maxDiameter. Each node is visited exactly once, each visit does O(1) work → total O(n). The trick is that height() is a natural post-order DFS, and the diameter update (comparing leftH + rightH + 2 to maxDiameter) is just O(1) work piggybacked onto each node visit.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LEVEL 10 – Lowest Common Ancestor
  // ─────────────────────────────────────────────
  {
    id: "lowest-common-ancestor",
    title: "Lowest Common Ancestor",
    slug: "lowest-common-ancestor",
    icon: "GitMerge",
    difficulty: "Intermediate",
    description:
      "Given a binary tree and two nodes p and q, find their Lowest Common Ancestor — the deepest node that is an ancestor of both — using a single elegant recursive DFS that works for both general trees and BSTs.",
    concept: {
      explanation:
        "The Lowest Common Ancestor (LCA) of two nodes p and q in a binary tree is the deepest node in the tree that has both p and q as descendants, where a node is considered a descendant of itself. This self-inclusion is important: if p is an ancestor of q, then p itself is the LCA. The elegant recursive solution leverages a beautiful observation: if you recurse into the tree and a function call returns a non-null value, it means it found at least one of the targets in its subtree. When we are at a given node, we recurse into the left and right subtrees. If both the left and right recursive calls return non-null, it means p is in one subtree and q is in the other — the current node is their meeting point and is the LCA. If only one side returns non-null, either both targets are in that subtree (one was the ancestor of the other), or only one was found and the other is still higher up — either way we propagate the non-null result upward. Base cases: if the current node is null, return null; if the current node IS p or q, return it immediately (no need to search deeper, since either it is the LCA itself or it will be propagated up to its parent which has both p and q on different sides). For BSTs specifically, a more efficient O(log n) solution exists: if both p and q are less than the current node, the LCA is in the left subtree; if both are greater, it is in the right subtree; otherwise the current node is the LCA.",
      realLifeAnalogy:
        "Imagine a large corporation's org-chart tree. Two employees — Alice and Bob — want to find their closest common manager (the LCA). The HR system runs a query starting from the CEO: at each manager, it asks 'do Alice or Bob report into my left division or my right division?' If Alice reports into the left division and Bob reports into the right, this manager is their closest common boss. If both report into the same division, the query recurses deeper into that division. If one of them IS a manager in the chain, they might even be their own and the other's closest common ancestor — because a manager is considered their own ancestor.",
      keyPoints: [
        "LCA = deepest node that is an ancestor of both p and q; a node is its own ancestor",
        "Base cases: return null if node is null; return node immediately if node.val equals p or q",
        "If left and right recursive calls both return non-null → current node is the LCA (p and q split here)",
        "If only one side is non-null → propagate it upward (both nodes are in that subtree, or only one found so far)",
        "Works correctly when p is an ancestor of q: p is returned immediately before finding q deeper",
        "BST LCA: both < root → go left; both > root → go right; otherwise root is LCA → O(h) = O(log n) balanced",
        "Time: O(n) for general binary tree | O(h) for BST — O(log n) balanced, O(n) skewed",
        "Classic use cases: distance between two nodes, path between nodes, ancestor queries in file systems",
      ],
      timeComplexity:
        "O(n) for general binary tree | O(h) for BST — O(log n) balanced, O(n) skewed",
      spaceComplexity:
        "O(h) recursion stack — O(log n) balanced tree, O(n) skewed tree",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Lowest Common Ancestor (LCA) =====

// ── Node definition ─────────────────────────────────────
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val   = val;
    this.left  = left;
    this.right = right;
  }
}

// ── Build sample tree ────────────────────────────────────
//
//           3
//         /   \
//        5     1
//       / \   / \
//      6   2 0   8
//         / \
//        7   4
//
// LCA(5,1) = 3   (different sides of root)
// LCA(5,4) = 5   (5 is ancestor of 4)
// LCA(6,4) = 5   (6 and 4 are both under 5)
// LCA(7,8) = 3   (7 is deep left; 8 is deep right)

const root = new TreeNode(3);
root.left               = new TreeNode(5);
root.right              = new TreeNode(1);
root.left.left          = new TreeNode(6);
root.left.right         = new TreeNode(2);
root.right.left         = new TreeNode(0);
root.right.right        = new TreeNode(8);
root.left.right.left    = new TreeNode(7);
root.left.right.right   = new TreeNode(4);

// ── LCA for general binary tree ──────────────────────────
// Returns the LCA node (or null if neither p nor q is found).
//
// Logic at each node:
//  1. null  → return null  (didn't find either target here)
//  2. node.val === p OR q  → return node  (found a target!)
//  3. Recurse left and right
//  4. Both non-null → current node is the LCA (split point)
//  5. One non-null  → propagate it upward
function lowestCommonAncestor(root, p, q) {
  if (!root) return null;                       // base: not found
  if (root.val === p || root.val === q)
    return root;                                // base: found a target

  const left  = lowestCommonAncestor(root.left,  p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;               // p and q are on different sides
  return left || right;                         // found at most one side
}

const lca1 = lowestCommonAncestor(root, 5, 1);
console.log("LCA(5,1):", lca1.val);   // 3

const lca2 = lowestCommonAncestor(root, 5, 4);
console.log("LCA(5,4):", lca2.val);   // 5  ← 5 is its own ancestor w.r.t. 4

const lca3 = lowestCommonAncestor(root, 6, 4);
console.log("LCA(6,4):", lca3.val);   // 5

const lca4 = lowestCommonAncestor(root, 7, 8);
console.log("LCA(7,8):", lca4.val);   // 3

// ── LCA for BST (optimised O(log n)) ────────────────────
// Uses BST ordering to skip entire subtrees.
//
//      6
//     / \
//    2   8
//   / \ / \
//  0  4 7  9
//    / \
//   3   5
const bst = new TreeNode(6);
bst.left             = new TreeNode(2);
bst.right            = new TreeNode(8);
bst.left.left        = new TreeNode(0);
bst.left.right       = new TreeNode(4);
bst.right.left       = new TreeNode(7);
bst.right.right      = new TreeNode(9);
bst.left.right.left  = new TreeNode(3);
bst.left.right.right = new TreeNode(5);

function lcaBST(root, p, q) {
  if (!root) return null;
  if (p < root.val && q < root.val)
    return lcaBST(root.left,  p, q);   // both smaller → go left
  if (p > root.val && q > root.val)
    return lcaBST(root.right, p, q);   // both larger  → go right
  return root;                          // split point  → this IS the LCA
}

console.log("\nBST LCA(2,8):", lcaBST(bst, 2, 8).val); // 6
console.log("BST LCA(2,4):", lcaBST(bst, 2, 4).val);   // 2
console.log("BST LCA(3,5):", lcaBST(bst, 3, 5).val);   // 4
`,
    },
    interviewQuestions: [
      {
        question:
          "Explain the recursive LCA algorithm. Why do we return the node immediately when it equals p or q?",
        difficulty: "Medium",
        hint: "We return the node immediately when it equals p or q because: (1) The problem states a node can be its own ancestor, so if the current node is p or q, it might be the LCA (e.g., if the other target is in its subtree). (2) We don't need to search deeper — either the other target is in this node's subtree (making this node the LCA), or it is above in the tree (in which case the parent will see this node returned from one side and the other target from the other side, correctly identifying the parent as the LCA). Searching deeper would still work but is unnecessary — the parent's logic handles both cases correctly.",
      },
      {
        question:
          "What happens in the LCA algorithm when one node is an ancestor of the other (e.g., LCA(5, 4) where 4 is in 5's subtree)?",
        difficulty: "Medium",
        hint: "When we arrive at node 5 (which equals p=5), we immediately return it without recursing further. Node 4 (q) is in 5's subtree, but we never find it. The caller (parent of 5) sees 5 returned from one side and null from the other side, so it propagates 5 upward. This keeps propagating until it reaches the root, which returns it as the final answer. The answer is correct — 5 IS the LCA of 5 and 4 because 5 is its own ancestor and is an ancestor of 4. The self-ancestor rule is why this elegant shortcut works correctly.",
      },
      {
        question:
          "How does the BST LCA algorithm differ from the general binary tree LCA, and why is it more efficient?",
        difficulty: "Medium",
        hint: "General binary tree LCA: O(n) time because we may need to search the entire tree — we cannot skip any subtree since we have no ordering information. BST LCA: O(h) time — O(log n) for balanced BST. We exploit the BST property: if both p and q are less than root, they must both be in the left subtree so we discard the entire right subtree immediately; if both are greater, we discard the left subtree. The split point (one value on each side, or root equals one of them) is the LCA. Each step eliminates roughly half the remaining nodes, giving logarithmic time — the same reason BST search is O(log n).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // LEVEL 10 – Maximum Path Sum
  // ─────────────────────────────────────────────
  {
    id: "maximum-path-sum",
    title: "Maximum Path Sum",
    slug: "maximum-path-sum",
    icon: "TrendingUp",
    difficulty: "Advanced",
    description:
      "Find the maximum sum of values along any path in a binary tree — where nodes can have negative values and the path can connect any two nodes — using a post-order DFS that separates the gain returned upward from the candidate path pivoting through the node.",
    concept: {
      explanation:
        "The Maximum Path Sum problem asks you to find the path in a binary tree whose node values sum to the highest possible total. A path is a sequence of nodes connected by edges where no node appears more than once. The path does not need to pass through the root, and it can start and end at any node — even two leaf nodes deep in the tree. The presence of negative-valued nodes makes this significantly harder than a simple tree maximum: sometimes you want to ignore an entire subtree rather than include its negative-sum path. The core algorithmic insight is to separate two concepts at each node: (1) the 'gain' this node contributes to a path going upward to its parent — this can only use the node's value plus the better of its two children (since a path cannot fork), and if the best contribution is negative we return 0 (meaning the parent ignores this node's subtree entirely); and (2) the 'candidate path sum' through this node — this can use both children simultaneously (left branch + node + right branch) since the path passes through this node as the pivot and does not need to continue upward. We compute both values during a single post-order DFS, updating a global maximum with every candidate path sum. This achieves O(n) time. The separation of 'gain upward' (one arm) vs 'path through node' (both arms) is the key insight that many candidates miss.",
      realLifeAnalogy:
        "Imagine hiking trails on a mountain shaped like a tree. Each trail segment has a 'enjoyment score' — positive means a scenic segment, negative means a miserable swamp you would rather skip. You want to find the single most enjoyable hiking route — any continuous path, starting and ending anywhere. At each trail junction (node), you have a choice: use this junction as a scenic overlook (pivot) where hikers come up one arm and leave down the other, maximising the total enjoyment at this spot. Or pick the better of the two arms to pass upward to the higher junction. If both arms are miserable (negative), skip them entirely and just stand at the junction alone. You scout every junction this way (DFS), recording the best overlook at each, and the answer is the best overlook across the entire mountain.",
      keyPoints: [
        "Path: any sequence of connected nodes with no repeated nodes; can start/end anywhere; no forking allowed",
        "Key separation: 'gain returned to parent' (one arm only) vs 'candidate sum through node' (both arms as pivot)",
        "Gain = node.val + max(leftGain, rightGain), but take max(0, gain) to skip negative subtrees",
        "Candidate at node = node.val + leftGain + rightGain — can use both arms since this node is the path's pivot",
        "Global answer = max candidate across all nodes; updated during post-order DFS via a closure variable",
        "Taking max(gain, 0) handles negative subtrees — exclude them by treating their contribution as 0",
        "Single-node tree with negative value: candidate = node.val, which is still correctly returned as maxSum",
        "Common mistake: returning the candidate (both arms) to the parent — that would create a forked (Y-shaped) illegal path",
      ],
      timeComplexity: "O(n) — each node visited exactly once in the DFS",
      spaceComplexity:
        "O(h) recursion stack — O(log n) balanced, O(n) skewed tree",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Maximum Path Sum in Binary Tree =====

// ── Node definition ─────────────────────────────────────
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val   = val;
    this.left  = left;
    this.right = right;
  }
}

// ── Build sample tree 1 ──────────────────────────────────
//
//        -10
//        /  \
//       9    20
//           /  \
//          15   7
//
// Best path: 15 → 20 → 7  =  42
// (-10 and 9 not included — they would lower the sum)
const root1 = new TreeNode(-10);
root1.left         = new TreeNode(9);
root1.right        = new TreeNode(20);
root1.right.left   = new TreeNode(15);
root1.right.right  = new TreeNode(7);

// ── Core algorithm ───────────────────────────────────────
//
// maxGain(node) returns the maximum gain this node can add
// to a path that continues UPWARD to the parent.
// Gain uses only ONE arm (left OR right) — paths cannot fork.
//
// WHILE computing gain, we ALSO check the path using BOTH arms
// through this node (leftGain + node.val + rightGain).
// That candidate is compared to the global maxSum.
//
function maxPathSum(root) {
  let maxSum = -Infinity;   // handles all-negative trees correctly

  function maxGain(node) {
    if (!node) return 0;    // null contributes nothing

    // Gain from each child — if negative, take 0 (skip that subtree)
    const leftGain  = Math.max(0, maxGain(node.left));
    const rightGain = Math.max(0, maxGain(node.right));

    // Candidate path that PIVOTS through this node (uses BOTH arms).
    // This node is the highest point on this path — it won't go further up.
    const pathThroughNode = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, pathThroughNode); // update global best

    // Return the gain to the parent: node.val + the BETTER single arm.
    // Parent can only extend the path in ONE direction.
    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}

console.log("Tree 1 max path sum:", maxPathSum(root1)); // 42

// ── Sample tree 2 ────────────────────────────────────────
//
//    1
//   / \
//  2   3
//
// Best path: 2 → 1 → 3  = 6
const root2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log("Tree 2 max path sum:", maxPathSum(root2)); // 6

// ── All-negative tree ────────────────────────────────────
// Best path: just the single node itself  = -3
console.log("All-negative:", maxPathSum(new TreeNode(-3))); // -3

// ── Mixed positive/negative tree ─────────────────────────
//
//       2
//      / \
//    -1   3
//    /
//  -2
//
// At -2: candidate = -2                 → maxSum = -2
// At -1: leftGain = max(0,-2) = 0
//        candidate = -1+0+0 = -1        → maxSum = -1
//        gain returned = -1 + max(0,0) = -1
// At  3: candidate = 3                  → maxSum = 3
//        gain = 3
// At  2: leftGain  = max(0,-1) = 0   (left arm is negative, skip)
//        rightGain = max(0, 3) = 3
//        candidate = 2 + 0 + 3 = 5     → maxSum = 5
// Answer = 5  (path: 2 → 3, left subtree skipped)
const root3 = new TreeNode(2);
root3.left      = new TreeNode(-1);
root3.right     = new TreeNode(3);
root3.left.left = new TreeNode(-2);
console.log("Mixed tree:", maxPathSum(root3)); // 5  (path: 2 → 3)

// ── Key rules summary ────────────────────────────────────
console.log("\n--- Key rules ---");
console.log("1. leftGain  = max(0, maxGain(node.left))  → drop negative arms");
console.log("2. rightGain = max(0, maxGain(node.right)) → drop negative arms");
console.log("3. candidate = node.val + leftGain + rightGain → pivot (both arms)");
console.log("4. gain up   = node.val + max(leftGain, rightGain) → one arm to parent");
`,
    },
    interviewQuestions: [
      {
        question:
          "Why is the 'gain returned to the parent' different from the 'candidate path sum at the current node'? What would go wrong if you mixed them up?",
        difficulty: "Hard",
        hint: "The gain returned upward can only use ONE arm (left OR right) because the path must be a simple non-branching sequence — if the parent extends the path further upward, it can only enter this node from one direction. The candidate at the current node uses BOTH arms (left + node + right) because this node is the path's PIVOT — the path goes left-down and right-down, and since it stops here (does not continue to the parent), branching is allowed. Mixing them up: if you return leftGain + node.val + rightGain to the parent, the parent would build a path with a fork (Y-shape), which is not a valid simple path. This is the most common bug in solutions to this problem.",
      },
      {
        question:
          "Why do we take max(0, childGain) instead of just childGain? What kind of tree does this handle correctly?",
        difficulty: "Medium",
        hint: "Taking max(0, childGain) means we only include a child subtree if it contributes positively to the sum. If a subtree's best gain is negative, we prefer to not include it (effectively removing that branch from the path). This correctly handles trees where some or all node values are negative. Example: if node.left has a maximum gain of -5, including it would decrease our path sum, so we treat leftGain as 0 (ignore the left subtree). Without max(0,...), you would always include both children even when they decrease the total, producing a wrong (lower) answer. All-negative trees still work: each node's own value is always included in its candidate, we just skip both negative children.",
      },
      {
        question:
          "The problem says the path can start and end at any node. How does the algorithm guarantee it finds paths that don't pass through the root?",
        difficulty: "Hard",
        hint: "The algorithm updates maxSum at EVERY node during the DFS, not just at the root. Each node acts as a potential pivot: the candidate path = leftGain + node.val + rightGain is computed and compared to maxSum independently for every node in the tree. So if the optimal path is deep in the left subtree, the algorithm finds it when the DFS reaches that subtree's root node — it computes the candidate there and updates maxSum. By the time the DFS returns to the tree's root, maxSum already holds the globally optimal value. The fact that we use maxSum (not the return value of maxGain(root)) as the final answer is what enables this: the return value only passes gain upward, while the actual answer accumulates globally.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Graph Representation
  // ─────────────────────────────────────────────
  {
    id: "graph-representation",
    title: "Graph Representation",
    slug: "graph-representation",
    icon: "Network",
    difficulty: "Intermediate",
    description:
      "Understand how graphs are stored in memory using Adjacency Lists and Adjacency Matrices, and know when to choose each representation.",
    concept: {
      explanation:
        "A graph G = (V, E) consists of a set of vertices (nodes) and edges (connections between nodes). Graphs can be directed or undirected, weighted or unweighted, cyclic or acyclic. There are two primary ways to represent a graph in code. An Adjacency List stores, for each vertex, a list of its neighbors — in JavaScript, a Map or an array of arrays. An Adjacency Matrix is a 2D grid of size V×V where matrix[i][j] = 1 (or the edge weight) if there is an edge from i to j, and 0 otherwise. The choice depends on the graph's density: sparse graphs favor adjacency lists for memory and traversal speed, while dense graphs may use matrices when O(1) edge-existence checks are important.",
      realLifeAnalogy:
        "Think of a city's road network. The Adjacency List is like a directory where each city lists only its direct roads — compact and fast for 'where can I go from here?'. The Adjacency Matrix is a big grid with every city pair — O(1) to check 'is there a direct road between X and Y?', but wastes space when most city pairs have no direct road.",
      keyPoints: [
        "Adjacency List: Space O(V + E) — ideal for sparse graphs",
        "Adjacency Matrix: Space O(V²) — wastes memory for sparse graphs but O(1) edge lookup",
        "Adjacency List: Edge exists check → O(degree(u)). Adjacency Matrix: O(1)",
        "Adjacency List: Iterate all edges → O(V + E). Matrix: O(V²)",
        "In interviews, default to adjacency list unless O(1) edge queries are required",
        "For weighted graphs: adjacency list stores {node, weight} pairs; matrix stores weights instead of 1/0",
        "Directed graph: adj[u] only contains u's outgoing neighbors",
        "Undirected graph: add both adj[u].push(v) and adj[v].push(u)",
      ],
      timeComplexity:
        "Adj List: Add vertex O(1), Add edge O(1), Neighbors O(deg(v)) | Adj Matrix: Add edge O(1), Edge exists O(1), Neighbors O(V)",
      spaceComplexity: "Adj List: O(V + E) | Adj Matrix: O(V²)",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Graph Representation in JavaScript =====

// ── Adjacency List ─────────────────────────────
class GraphList {
  constructor() { this.adj = new Map(); }

  addVertex(v) {
    if (!this.adj.has(v)) this.adj.set(v, []);
  }

  addEdge(u, v) {           // undirected
    this.addVertex(u); this.addVertex(v);
    this.adj.get(u).push(v);
    this.adj.get(v).push(u);
  }

  addDirectedEdge(u, v) {   // directed
    this.addVertex(u); this.addVertex(v);
    this.adj.get(u).push(v);
  }

  neighbors(v) { return this.adj.get(v) ?? []; }
  hasEdge(u, v) { return this.adj.get(u)?.includes(v) ?? false; }

  print() {
    for (const [v, nbrs] of this.adj)
      console.log("  " + v + " → [" + nbrs.join(", ") + "]");
  }
}

const gl = new GraphList();
[[0,1],[0,2],[1,3],[2,3],[2,4],[3,4]].forEach(([u,v]) => gl.addEdge(u,v));

console.log("Adjacency List:");
gl.print();
// 0 → [1, 2]   1 → [0, 3]   2 → [0, 3, 4]   3 → [1, 2, 4]   4 → [2, 3]

console.log("hasEdge(0,1):", gl.hasEdge(0, 1)); // true
console.log("hasEdge(0,3):", gl.hasEdge(0, 3)); // false


// ── Adjacency Matrix ───────────────────────────
class GraphMatrix {
  constructor(size) {
    this.size = size;
    this.mat  = Array.from({ length: size }, () => new Array(size).fill(0));
  }

  addEdge(u, v) { this.mat[u][v] = 1; this.mat[v][u] = 1; }
  hasEdge(u, v) { return this.mat[u][v] === 1; }
  neighbors(v)  { return this.mat[v].map((w,i) => w ? i : -1).filter(i => i !== -1); }

  print() {
    const hdr = "     " + [...Array(this.size).keys()].join("  ");
    console.log(hdr);
    this.mat.forEach((row, i) => console.log("  " + i + "  [" + row.join(", ") + "]"));
  }
}

const gm = new GraphMatrix(5);
[[0,1],[0,2],[1,3],[2,3],[2,4],[3,4]].forEach(([u,v]) => gm.addEdge(u,v));

console.log("\nAdjacency Matrix (5×5):");
gm.print();
// row 0: [0,1,1,0,0]  row 1: [1,0,0,1,0]  row 2: [1,0,0,1,1]

console.log("hasEdge(0,1):", gm.hasEdge(0, 1)); // true
console.log("hasEdge(0,3):", gm.hasEdge(0, 3)); // false
console.log("neighbors(2):", gm.neighbors(2));  // [0, 3, 4]
`,
    },
    interviewQuestions: [
      {
        question:
          "When would you choose an Adjacency Matrix over an Adjacency List?",
        difficulty: "Easy",
        hint: "Use a matrix when you need O(1) edge-existence queries and the graph is dense (many edges, close to V² total). For sparse graphs (roads, dependency trees, typical interview problems), lists are preferred because they save O(V²) space and iterate neighbors in O(degree) not O(V).",
      },
      {
        question:
          "How would you represent a weighted directed graph as an adjacency list in JavaScript?",
        difficulty: "Medium",
        hint: "Instead of storing plain neighbor IDs, store objects: adj.get(u).push({ to: v, weight: w }). For the matrix version, store the weight value instead of 1, and use 0 or Infinity to indicate 'no edge'. For Dijkstra, the adjacency list with {to, weight} pairs is the standard.",
      },
      {
        question:
          "Given an adjacency list representation, how do you find the number of edges in an undirected graph?",
        difficulty: "Medium",
        hint: "Sum the lengths of all neighbor lists and divide by 2 (each undirected edge is counted once for each endpoint): edges = sum(adj[v].length for all v) / 2. For a directed graph, don't divide — each directed edge appears exactly once in the list of its source node.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Graph DFS
  // ─────────────────────────────────────────────
  {
    id: "graph-dfs",
    title: "Graph DFS",
    slug: "graph-dfs",
    icon: "GitFork",
    difficulty: "Intermediate",
    description:
      "Traverse a graph depth-first — exploring as far as possible along each branch before backtracking — using both recursive and iterative (stack-based) approaches.",
    concept: {
      explanation:
        "Depth-First Search (DFS) on a graph explores as deep as possible along each path before backtracking. Unlike tree DFS, graph DFS must track a visited set to avoid processing the same node twice (graphs can have cycles). The recursive implementation marks the current node visited, then recursively visits each unvisited neighbor. The iterative version uses an explicit stack — push the start node, then loop: pop a node, if not visited mark it and push all its unvisited neighbors. DFS is used to detect cycles, find connected components, perform topological sort, and solve maze/path problems. Time complexity is O(V + E) because every vertex and edge is processed exactly once.",
      realLifeAnalogy:
        "DFS is like exploring a cave system with a torch. You always pick the first unexplored tunnel and go as deep as you can, dropping a breadcrumb at every junction. When you hit a dead end, you retrace your steps to the last junction with unexplored tunnels. The breadcrumbs prevent you from going in circles. This 'go deep first, backtrack later' strategy is exactly how the call stack manages recursive DFS.",
      keyPoints: [
        "Always maintain a visited set to avoid infinite loops in cyclic graphs",
        "Time: O(V + E) — each vertex and edge is processed once",
        "Space: O(V) for the visited set + O(V) recursion stack depth",
        "Recursive DFS risks stack overflow on very large graphs — prefer iterative for production code",
        "DFS order depends on which neighbor is visited first (adjacency list order)",
        "Back edges in the DFS tree indicate cycles",
        "Connected components: run DFS from each unvisited node, count starts",
        "Iterative DFS uses a stack (LIFO); swapping it for a queue gives BFS (FIFO)",
      ],
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V) — visited set + recursion stack or explicit stack",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Graph DFS in JavaScript =====
// Directed graph: 0→1, 0→2, 1→3, 1→4, 2→4, 3→4

const adj = { 0:[1,2], 1:[3,4], 2:[4], 3:[4], 4:[] };

// ── Recursive DFS ──────────────────────────────
function dfsRecursive(graph, start) {
  const visited = new Set();
  const order   = [];

  function dfs(node) {
    visited.add(node);
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) dfs(neighbor);
    }
  }

  dfs(start);
  return order;
}

console.log("Recursive DFS from 0:", dfsRecursive(adj, 0));
// [0, 1, 3, 4, 2]


// ── Iterative DFS (explicit stack) ────────────
function dfsIterative(graph, start) {
  const visited = new Set();
  const order   = [];
  const stack   = [start];

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    // Push neighbors in reverse so left-most is processed first
    for (const neighbor of [...graph[node]].reverse()) {
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }
  return order;
}

console.log("Iterative DFS from 0:", dfsIterative(adj, 0));
// [0, 1, 3, 4, 2]


// ── DFS on undirected graph ────────────────────
const undirected = {
  A:["B","C"], B:["A","D","E"], C:["A","F"],
  D:["B"],     E:["B","F"],    F:["C","E"],
};
console.log("\nDFS from A:", dfsRecursive(undirected, "A"));
// A, B, D, E, F, C


// ── Count connected components ────────────────
function countComponents(graph) {
  const visited = new Set();
  let count = 0;

  function dfs(node) {
    visited.add(node);
    for (const nbr of graph[node])
      if (!visited.has(nbr)) dfs(nbr);
  }

  for (const node of Object.keys(graph)) {
    if (!visited.has(node)) { dfs(node); count++; }
  }
  return count;
}

const disc = { 0:[1], 1:[0], 2:[3], 3:[2], 4:[] };
console.log("\nConnected components:", countComponents(disc)); // 3
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between DFS on a tree vs DFS on a graph?",
        difficulty: "Easy",
        hint: "In a tree there are no cycles, so you never revisit a node — no visited set needed. In a graph, cycles exist, so without a visited set DFS would loop infinitely. Also, trees have a natural root while graph DFS can start from any node and may need multiple DFS calls to cover a disconnected graph.",
      },
      {
        question:
          "Why might recursive DFS fail on a large graph, and how do you fix it?",
        difficulty: "Medium",
        hint: "Recursive DFS uses the call stack — one frame per node in the deepest path. JavaScript engines have a call stack limit (~10,000–15,000 frames). A chain graph of 100,000 nodes will throw 'Maximum call stack size exceeded'. Fix: use iterative DFS with an explicit stack in heap memory — no engine-imposed depth limit.",
      },
      {
        question: "How do you find all connected components in an undirected graph?",
        difficulty: "Medium",
        hint: "Maintain a global visited set. Iterate all vertices. When you find an unvisited vertex, run DFS from it — this explores its entire component. Count each DFS start as one component. O(V + E) total. To group nodes, pass a component ID and label each visited node.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Graph BFS
  // ─────────────────────────────────────────────
  {
    id: "graph-bfs",
    title: "Graph BFS",
    slug: "graph-bfs",
    icon: "Layers",
    difficulty: "Intermediate",
    description:
      "Traverse a graph breadth-first — visiting all neighbors at the current distance before going deeper — and use it to find shortest paths in unweighted graphs.",
    concept: {
      explanation:
        "Breadth-First Search (BFS) explores a graph level by level: all nodes at distance 1 first, then distance 2, and so on. It uses a queue (FIFO) instead of a stack. BFS requires a visited set to avoid revisiting nodes. It is the algorithm of choice for shortest paths in unweighted graphs — nodes are always discovered in order of increasing distance from the source. The level of discovery can be recorded by tracking which queue pass a node was first reached. BFS also finds connected components and can test bipartiteness. Time complexity is O(V + E) — identical to DFS — but space can be higher since the queue may hold an entire level at once.",
      realLifeAnalogy:
        "BFS is like a ripple when you drop a stone in a pond. The wave expands outward in rings, reaching all points at distance 1 first, then distance 2. In a social network, BFS from a person first finds all direct friends, then friends-of-friends. This is how 'degrees of separation' is computed and why BFS is the natural choice for shortest-path problems.",
      keyPoints: [
        "BFS guarantees the shortest path (fewest edges) in an unweighted graph",
        "Uses a queue (FIFO) — dequeue from front, enqueue neighbors at back",
        "Mark nodes visited WHEN ENQUEUING, not when dequeuing, to avoid duplicates",
        "Time: O(V + E). Space: O(V)",
        "BFS level = shortest distance from source — track a dist[] array alongside the queue",
        "BFS tree: edges used to discover new nodes form a shortest-path tree",
        "For weighted shortest paths, use Dijkstra (BFS only works for unit-weight edges)",
        "Use a head-pointer trick for O(1) dequeue instead of shift()",
      ],
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V) — queue + visited set",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Graph BFS in JavaScript =====
// Directed graph: 0→1, 0→2, 1→3, 1→4, 2→4, 3→4

const adj = { 0:[1,2], 1:[3,4], 2:[4], 3:[4], 4:[] };

// ── Basic BFS ──────────────────────────────────
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue   = [start];
  const order   = [];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);   // mark WHEN enqueuing
        queue.push(neighbor);
      }
    }
  }
  return order;
}

console.log("BFS from 0:", bfs(adj, 0));
// [0, 1, 2, 3, 4]


// ── BFS with shortest distances ────────────────
function bfsDistance(graph, start) {
  const dist  = { [start]: 0 };
  const queue = [start];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    for (const neighbor of graph[node]) {
      if (dist[neighbor] === undefined) {
        dist[neighbor] = dist[node] + 1;
        queue.push(neighbor);
      }
    }
  }
  return dist;
}

console.log("\nShortest distances from 0:", bfsDistance(adj, 0));
// { 0:0, 1:1, 2:1, 3:2, 4:2 }


// ── BFS shortest path reconstruction ──────────
function bfsShortestPath(graph, start, end) {
  if (start === end) return [start];
  const prev    = {};
  const visited = new Set([start]);
  const queue   = [start];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    for (const nbr of graph[node]) {
      if (!visited.has(nbr)) {
        visited.add(nbr);
        prev[nbr] = node;
        if (nbr === end) {
          const path = [];
          for (let v = end; v !== undefined; v = prev[v]) path.unshift(v);
          return path;
        }
        queue.push(nbr);
      }
    }
  }
  return null;
}

const undirected = {
  0:[1,2], 1:[0,3,4], 2:[0,4], 3:[1,4], 4:[1,2,3],
};
console.log("\nShortest path 0→4:", bfsShortestPath(undirected, 0, 4));
// [0, 1, 4]
console.log("Shortest path 0→3:", bfsShortestPath(undirected, 0, 3));
// [0, 1, 3]
`,
    },
    interviewQuestions: [
      {
        question:
          "Why is BFS preferred over DFS for finding the shortest path in an unweighted graph?",
        difficulty: "Easy",
        hint: "BFS explores nodes in order of increasing distance — all nodes at distance 1 before distance 2. The first time BFS reaches the target, it has taken the fewest possible edges. DFS explores deep paths first and might reach the target via a long path before trying shorter ones, so it cannot guarantee the shortest path without exhaustive search.",
      },
      {
        question:
          "Why must you mark nodes visited when ENQUEUING rather than when DEQUEUING?",
        difficulty: "Medium",
        hint: "If you mark visited on dequeue, the same node can be added to the queue multiple times by different neighbors before it's dequeued. In dense graphs this causes O(E) extra queue entries and duplicated work. Marking on enqueue: once a node is in the queue, all future encounters are ignored immediately, keeping queue size O(V).",
      },
      {
        question:
          "How would you use BFS to find the number of levels (diameter) in a tree?",
        difficulty: "Medium",
        hint: "Run BFS from any node; the max distance in the result is the eccentricity of the start node. To find the true diameter: BFS from any node, find the farthest node u; BFS from u, find the farthest node v; dist(u,v) is the diameter. This two-BFS trick works in O(V + E).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Cycle Detection
  // ─────────────────────────────────────────────
  {
    id: "cycle-detection",
    title: "Cycle Detection",
    slug: "cycle-detection",
    icon: "RefreshCw",
    difficulty: "Advanced",
    description:
      "Detect cycles in both undirected graphs (parent-tracking DFS) and directed graphs (three-color DFS), and understand why the approaches differ.",
    concept: {
      explanation:
        "A cycle in a graph is a path that starts and ends at the same vertex. Cycle detection applies to deadlock detection, dependency resolution, and validating that a graph is a DAG. The strategy differs between undirected and directed graphs. For undirected graphs: run DFS and track the parent of each node. If you reach a neighbor that is already visited AND is not the node's direct parent, a back edge exists — a cycle. For directed graphs: use a three-color scheme — white (unvisited), gray (in the current DFS call stack), black (fully processed). If DFS encounters a gray neighbor, that neighbor is an ancestor in the current path, forming a back edge and a cycle.",
      realLifeAnalogy:
        "Cycle detection in undirected graphs: if hiking trails, you reach a marked junction you didn't just come from, you've found a loop. For directed graphs, think of task dependencies: if Task A requires B, B requires C, and C requires A — a circular dependency prevents any task from starting. The three-color DFS maps exactly: gray means 'I'm in the middle of this task,' and encountering a gray node means 'this task is waiting for itself.'",
      keyPoints: [
        "Undirected: DFS with parent tracking — visited neighbor ≠ parent → cycle",
        "Directed: 3-color DFS — gray neighbor encountered → back edge → cycle",
        "Why parent tracking fails for directed graphs: u→v doesn't imply v→u",
        "Undirected cycle detection also works with Union-Find (DSU) — O(α(V)) per edge",
        "No cycle in a directed graph ↔ topological sort succeeds",
        "Back edge in DFS tree = cycle; tree/forward/cross edges do not",
        "Handle disconnected graphs by running DFS from every unvisited node",
        "Cycle in directed graph → cannot topologically sort → report circular dependency error",
      ],
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V) — color array + recursion stack",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Cycle Detection in JavaScript =====

// ── Undirected: DFS with parent tracking ──────
// Graph: 0-1, 1-2, 2-3, 3-0  (square → has cycle)
const undirected = { 0:[1,3], 1:[0,2], 2:[1,3], 3:[2,0] };

function hasCycleUndirected(graph) {
  const visited = new Set();

  function dfs(node, parent) {
    visited.add(node);
    for (const nbr of graph[node]) {
      if (!visited.has(nbr)) {
        if (dfs(nbr, node)) return true;
      } else if (nbr !== parent) {
        return true;  // visited AND not parent → back edge → cycle
      }
    }
    return false;
  }

  for (const node of Object.keys(graph))
    if (!visited.has(node) && dfs(node, null)) return true;

  return false;
}

console.log("Undirected cycle (square):", hasCycleUndirected(undirected)); // true
const tree = { 0:[1,2], 1:[0], 2:[0,3], 3:[2] };
console.log("Undirected cycle (tree):  ", hasCycleUndirected(tree));  // false


// ── Directed: 3-color DFS ──────────────────────
// Colors: 0=white, 1=gray (in stack), 2=black (done)
// Graph: 0→1, 1→2, 2→3, 3→1  (cycle 1→2→3→1)
const directed = { 0:[1], 1:[2], 2:[3], 3:[1] };

function hasCycleDirected(graph) {
  const color = Object.fromEntries(Object.keys(graph).map(k => [k, 0]));

  function dfs(node) {
    color[node] = 1; // gray
    for (const nbr of graph[node]) {
      if (color[nbr] === 1) return true; // gray → back edge → cycle
      if (color[nbr] === 0 && dfs(nbr)) return true;
    }
    color[node] = 2; // black
    return false;
  }

  for (const node of Object.keys(graph))
    if (color[node] === 0 && dfs(node)) return true;

  return false;
}

console.log("\nDirected cycle (1→2→3→1):", hasCycleDirected(directed)); // true
const dag = { 0:[1,2], 1:[3], 2:[3], 3:[] };
console.log("Directed cycle (DAG):     ", hasCycleDirected(dag));  // false


// ── Union-Find (undirected, bonus) ────────────
class DSU {
  constructor(n) { this.p = Array.from({length:n},(_,i)=>i); }
  find(x) { return this.p[x]===x ? x : (this.p[x]=this.find(this.p[x])); }
  union(a,b) {
    const [ra,rb]=[this.find(a),this.find(b)];
    if(ra===rb) return false; // already connected → cycle
    this.p[ra]=rb; return true;
  }
}

function hasCycleDSU(n, edges) {
  const dsu = new DSU(n);
  for (const [u,v] of edges) if (!dsu.union(u,v)) return true;
  return false;
}

console.log("\nDSU cycle:", hasCycleDSU(4,[[0,1],[1,2],[2,3],[3,0]])); // true
console.log("DSU no cycle:", hasCycleDSU(4,[[0,1],[0,2],[2,3]]));     // false
`,
    },
    interviewQuestions: [
      {
        question:
          "Why does parent tracking for undirected graphs not work for directed graphs?",
        difficulty: "Medium",
        hint: "In an undirected graph edge (u,v) exists in both directions — DFS going u→v will 'see' u as v's neighbor, appearing as a cycle without parent tracking. In a directed graph, u→v doesn't imply v→u, so the parent trick doesn't apply. More importantly, a directed cycle requires following edge directions. The three-color approach detects exactly this: a gray node in the current DFS stack means we've found a directed path back to it.",
      },
      {
        question:
          "What does a cycle in a directed graph mean practically, and what algorithms break?",
        difficulty: "Medium",
        hint: "A directed cycle makes topological sort impossible — no valid linear ordering exists. Algorithms assuming a DAG (Kahn's topo sort, dependency resolution, DAG shortest-path DP) will fail or loop. In practice: package managers detect circular dependencies, build systems report 'circular imports', and OS deadlock detectors flag circular wait chains.",
      },
      {
        question:
          "How would you detect a cycle in a linked list? Is this a graph problem?",
        difficulty: "Easy",
        hint: "A linked list is a directed graph where each node has at most one outgoing edge (its next pointer). Floyd's Cycle Detection (tortoise and hare) uses two pointers moving at different speeds: if they ever meet, there's a cycle. This is O(1) space vs O(n) for a visited set. It's the same graph problem but specialized — the singly-linked structure allows the pointer trick.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Topological Sort
  // ─────────────────────────────────────────────
  {
    id: "topological-sort",
    title: "Topological Sort",
    slug: "topological-sort",
    icon: "ArrowUpDown",
    difficulty: "Advanced",
    description:
      "Order the vertices of a DAG so every directed edge points from an earlier vertex to a later one — the foundation of dependency resolution, build systems, and scheduling.",
    concept: {
      explanation:
        "Topological Sort produces a linear ordering of vertices of a Directed Acyclic Graph (DAG) such that for every edge u→v, u appears before v. It is only possible on DAGs — a cycle makes it impossible. Two classical algorithms exist. Kahn's Algorithm (BFS-based): compute in-degrees for all vertices, enqueue all zero-in-degree nodes, repeatedly dequeue a node, append to result, decrement neighbors' in-degrees and enqueue any that reach zero. If the result has fewer than V nodes, a cycle exists. DFS-based: run DFS; when a node is completely finished (all descendants processed), push it onto a stack; reverse the stack to get topological order.",
      realLifeAnalogy:
        "Imagine getting dressed: put on socks before shoes, underwear before pants, shirt before jacket. These are dependencies — some tasks must come before others. Topological sort finds a valid order. If there's a circular constraint (A before B, B before C, C before A), no schedule exists — that's the cycle.",
      keyPoints: [
        "Only works on DAGs — any cycle makes topological sort impossible",
        "Kahn's (BFS): compute in-degrees, remove zero-in-degree nodes repeatedly — O(V + E)",
        "DFS-based: push node to stack AFTER all descendants are visited; reverse — O(V + E)",
        "Kahn's result with < V nodes → cycle detected",
        "Multiple valid orderings can exist — Kahn's gives a BFS-like order",
        "LeetCode 207 (Can Finish) and 210 (Course Order) are canonical problems",
        "Applications: build systems, package managers, task scheduling",
        "Every tree's pre-order DFS traversal is a topological ordering",
      ],
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V) — in-degree array + queue",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Topological Sort in JavaScript =====
// DAG: 0→1, 0→2, 1→3, 2→3, 3→4
// Valid orders: [0,1,2,3,4] or [0,2,1,3,4]

const N = 5;
const edges = [[0,1],[0,2],[1,3],[2,3],[3,4]];

// ── Kahn's Algorithm (BFS-based) ──────────────
function topoSortKahn(n, edges) {
  const adj      = Array.from({length:n}, ()=>[]);
  const inDegree = new Array(n).fill(0);

  for (const [u,v] of edges) { adj[u].push(v); inDegree[v]++; }

  const queue = [];
  for (let i=0; i<n; i++) if (inDegree[i]===0) queue.push(i);

  const result = [];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    result.push(node);
    for (const nbr of adj[node]) {
      inDegree[nbr]--;
      if (inDegree[nbr]===0) queue.push(nbr);
    }
  }

  return result.length===n ? result : null; // null = cycle
}

console.log("Kahn's:", topoSortKahn(N, edges));
// [0, 1, 2, 3, 4]


// ── DFS-based Topological Sort ─────────────────
function topoSortDFS(n, edges) {
  const adj     = Array.from({length:n}, ()=>[]);
  const visited = new Set();
  const inStack = new Set();
  const stack   = [];
  let cycle     = false;

  for (const [u,v] of edges) adj[u].push(v);

  function dfs(node) {
    if (cycle) return;
    inStack.add(node); visited.add(node);
    for (const nbr of adj[node]) {
      if (inStack.has(nbr)) { cycle=true; return; }
      if (!visited.has(nbr)) dfs(nbr);
    }
    inStack.delete(node);
    stack.push(node); // push AFTER all descendants
  }

  for (let i=0; i<n; i++) if (!visited.has(i)) dfs(i);
  return cycle ? null : stack.reverse();
}

console.log("DFS:   ", topoSortDFS(N, edges));
// [0, 2, 1, 3, 4]  (order may vary)


// ── LeetCode 207 & 210 ────────────────────────
function canFinish(numCourses, prerequisites) {
  return topoSortKahn(numCourses, prerequisites) !== null;
}
function findOrder(numCourses, prerequisites) {
  return topoSortKahn(numCourses, prerequisites) ?? [];
}

console.log("\ncanFinish [cycle]:",  canFinish(3, [[1,0],[2,1],[0,2]])); // false
console.log("canFinish [DAG]:  ",  canFinish(4, [[1,0],[2,0],[3,1]])); // true
console.log("findOrder:        ", findOrder(4, [[1,0],[2,0],[3,1],[3,2]]));
// [0, 1, 2, 3]
`,
    },
    interviewQuestions: [
      {
        question:
          "How does Kahn's algorithm detect a cycle while computing topological sort?",
        difficulty: "Medium",
        hint: "If the graph has a cycle, those nodes never reach in-degree 0 — each is blocked by another in the cycle. Kahn's only processes zero-in-degree nodes. When done, if result.length < V, the unprocessed nodes form cycles. This is why we check result.length === n and return null on failure — exactly what LeetCode 207 asks.",
      },
      {
        question:
          "In the DFS-based approach, why do we push a node to the result stack AFTER visiting all its neighbors?",
        difficulty: "Medium",
        hint: "In topological order, a node must appear BEFORE everything it points to. DFS explores all of a node's dependencies recursively before returning. When DFS finishes with a node, all its outgoing paths are explored — so pushing it now gives 'this comes before everything it points to.' Reversing the stack produces correct topological order.",
      },
      {
        question:
          "Can a graph have multiple valid topological orderings?",
        difficulty: "Easy",
        hint: "Yes — any time two nodes have in-degree 0 simultaneously in Kahn's, either can be processed first. For example A→C and B→C (no A↔B edge): both [A,B,C] and [B,A,C] are valid. To enumerate all orderings, use backtracking: try each zero-in-degree node, recurse, then undo. Exponential worst case but complete.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Dijkstra's Algorithm
  // ─────────────────────────────────────────────
  {
    id: "dijkstra",
    title: "Dijkstra's Algorithm",
    slug: "dijkstra",
    icon: "Target",
    difficulty: "Advanced",
    description:
      "Find the shortest path from a source to all other vertices in a weighted graph with non-negative edge weights using a greedy priority-queue approach.",
    concept: {
      explanation:
        "Dijkstra's algorithm finds the shortest path from a source vertex to all others in a graph with non-negative edge weights. It is greedy: at each step it processes the unvisited vertex with the smallest known distance. The dist[] array is initialized to infinity for all vertices except the source (dist[src] = 0). A min-priority queue drives the process: extract the vertex with minimum distance, then 'relax' all its outgoing edges — if going through this vertex gives a shorter path to a neighbor, update the neighbor's distance and re-add it to the queue. In JavaScript, a true min-heap gives O((V + E) log V) performance.",
      realLifeAnalogy:
        "Dijkstra's is like expanding a 'settled zone' of cities with known shortest distances. You start at the source with distance 0. At every step, pick the nearest unsettled city, mark it settled, and update distances to all cities reachable from it. Think of Google Maps: it expands outward from your current location, always choosing the nearest unvisited checkpoint until it reaches your destination.",
      keyPoints: [
        "Requires non-negative edge weights — negative edges break the greedy assumption",
        "Greedy: once a vertex is finalized (popped from PQ), its distance never decreases",
        "dist[] starts as [0, ∞, ∞, ...∞] for source = 0",
        "Relaxation: if dist[u] + w(u,v) < dist[v], update dist[v] and push to PQ",
        "Lazy deletion: if popped distance > dist[v], it's stale — skip it",
        "Time O((V + E) log V) with binary heap; O(V²) with simple array",
        "For negative weights use Bellman-Ford O(VE); for DAGs use DP in topo order O(V+E)",
        "Dijkstra is BFS on weighted graphs — BFS is Dijkstra where all weights = 1",
      ],
      timeComplexity: "O((V + E) log V) with binary heap | O(V²) with array PQ",
      spaceComplexity: "O(V + E)",
    },
    code: {
      language: "javascript",
      defaultCode: String.raw`// ===== Dijkstra's Algorithm in JavaScript =====
// Graph: 0→1(4), 0→2(1), 2→1(2), 2→3(5), 1→3(1), 3→4(3)
// Shortest from 0: 0→2(1)→1(3)→3(4)→4(7)

// ── MinHeap ────────────────────────────────────
class MinHeap {
  constructor() { this.h=[]; }
  push(x) { this.h.push(x); this._up(this.h.length-1); }
  pop()  {
    const top=this.h[0], last=this.h.pop();
    if(this.h.length){ this.h[0]=last; this._dn(0); }
    return top;
  }
  get size(){ return this.h.length; }
  _up(i){
    while(i>0){
      const p=(i-1)>>1;
      if(this.h[p][0]<=this.h[i][0]) break;
      [this.h[p],this.h[i]]=[this.h[i],this.h[p]]; i=p;
    }
  }
  _dn(i){
    const n=this.h.length;
    while(true){
      let m=i,l=2*i+1,r=2*i+2;
      if(l<n&&this.h[l][0]<this.h[m][0])m=l;
      if(r<n&&this.h[r][0]<this.h[m][0])m=r;
      if(m===i) break;
      [this.h[m],this.h[i]]=[this.h[i],this.h[m]]; i=m;
    }
  }
}

// ── Dijkstra ───────────────────────────────────
function dijkstra(n, edges, src) {
  const adj = Array.from({length:n}, ()=>[]);
  for (const [u,v,w] of edges) adj[u].push([v,w]);

  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;

  const pq = new MinHeap();
  pq.push([0, src]); // [dist, node]

  while (pq.size > 0) {
    const [d, u] = pq.pop();
    if (d > dist[u]) continue; // stale — skip

    for (const [v, w] of adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
}

const edges = [[0,1,4],[0,2,1],[2,1,2],[2,3,5],[1,3,1],[3,4,3]];
const dist  = dijkstra(5, edges, 0);
console.log("Shortest distances from 0:", dist);
// [0, 3, 1, 4, 7]
// 0→1: 3  (via 0→2→1: 1+2, better than direct 4)
// 0→3: 4  (via 0→2→1→3: 1+2+1)
// 0→4: 7  (via 0→2→1→3→4: 1+2+1+3)


// ── Dijkstra with path reconstruction ─────────
function dijkstraPath(n, edges, src, dst) {
  const adj  = Array.from({length:n}, ()=>[]);
  for (const [u,v,w] of edges) adj[u].push([v,w]);

  const dist = new Array(n).fill(Infinity);
  const prev = new Array(n).fill(-1);
  dist[src]  = 0;

  const pq = new MinHeap();
  pq.push([0, src]);

  while (pq.size > 0) {
    const [d, u] = pq.pop();
    if (d > dist[u]) continue;
    for (const [v, w] of adj[u]) {
      if (dist[u]+w < dist[v]) {
        dist[v]=dist[u]+w; prev[v]=u; pq.push([dist[v],v]);
      }
    }
  }

  if (dist[dst]===Infinity) return null;
  const path=[];
  for(let v=dst; v!==-1; v=prev[v]) path.unshift(v);
  return { path, cost: dist[dst] };
}

console.log("\nPath 0→4:", dijkstraPath(5, edges, 0, 4));
// { path: [0, 2, 1, 3, 4], cost: 7 }
`,
    },
    interviewQuestions: [
      {
        question: "Why does Dijkstra fail with negative edge weights?",
        difficulty: "Medium",
        hint: "Dijkstra's greedy assumption: once a node is finalized (popped from PQ), its distance won't improve. Negative edges break this — a path through a negative edge discovered later could give a shorter distance to an already-finalized node. For negative weights, use Bellman-Ford O(VE). For negative cycles (where shortest path is -∞), even Bellman-Ford can't give a finite answer.",
      },
      {
        question:
          "What is the 'lazy deletion' technique in Dijkstra, and why is it needed?",
        difficulty: "Medium",
        hint: "When we find a shorter path to node v already in the PQ, we push a new (shorter_dist, v) entry instead of updating in-place (complex). The old stale entry remains. When it's later popped, we check: if popped distance > dist[v], skip it — it's stale. This keeps the algorithm correct while allowing O(E) total PQ entries, still O((V+E) log V) overall.",
      },
      {
        question:
          "Network Delay Time (LeetCode 743): find the time for all nodes to receive a signal from node k.",
        difficulty: "Hard",
        hint: "Run Dijkstra from source k. The answer is the maximum value in dist[] (the last node to receive the signal). If any dist[i] is still Infinity, return -1 (some node is unreachable). This is the canonical Dijkstra LeetCode problem — the maximum shortest-path distance is when the signal reaches the farthest node.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Practice Problems
  // ─────────────────────────────────────────────
  {
    id: "find-largest-element",
    title: "Majority Element",
    slug: "find-largest-element",
    icon: "Crown",
    difficulty: "Beginner",
    description:
      "Return the element that appears more than floor(n / 2) times. LeetCode 169, explained here with a frequency map approach.",
    leetcodeLink: "https://leetcode.com/problems/majority-element/",
    concept: {
      explanation:
        "The Majority Element problem asks you to find the value that appears more than floor(n / 2) times in the array. In this version, we solve it with a frequency map: scan the array once, count how many times each number appears, and the moment any count becomes greater than n / 2, return that number. This works because the input guarantees that a majority element exists, so one of the counts must cross the threshold. The approach is direct, easy to reason about, and great for beginners because it turns the problem into simple counting.",
      realLifeAnalogy:
        "Imagine you are counting votes in a classroom election. Every time you hear a name, you add one tally mark next to that student on a board. As soon as one student's tally becomes more than half the class size, you already know they are the winner, so you can stop early. You do not need to finish building a perfect sorted list of votes, just keep running counts.",
      keyPoints: [
        "Use a Map where key = number and value = frequency",
        "For each number, update its count with (map.get(num) ?? 0) + 1",
        "If frequency > nums.length / 2, return immediately",
        "Because a majority element is guaranteed, some value must cross the threshold",
        "Time complexity is O(n) because each element is processed once",
        "Space complexity is O(n) in the worst case because the map may store many distinct values",
        "The Boyer-Moore Voting Algorithm solves the follow-up in O(1) space",
        "LeetCode 169: https://leetcode.com/problems/majority-element/",
      ],
      timeComplexity: "O(n) — one pass through the array",
      spaceComplexity: "O(n) — map stores frequencies of seen values",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Majority Element (LeetCode 169) =====

function majorityElement(nums) {
  const length = nums.length;
  const map = new Map();

  for (let i = 0; i < length; i++) {
    const frequency = (map.get(nums[i]) ?? 0) + 1;
    map.set(nums[i], frequency);

    if (frequency > length / 2) {
      return nums[i];
    }
  }

  return nums[0];
}

console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2

console.log("\\n--- Step-by-step trace ---");
function majorityElementVerbose(nums) {
  const length = nums.length;
  const map = new Map();

  for (let i = 0; i < length; i++) {
    const frequency = (map.get(nums[i]) ?? 0) + 1;
    map.set(nums[i], frequency);
    console.log(
      \`i=\${i}, num=\${nums[i]}, frequency=\${frequency}, threshold=\${Math.floor(length / 2)}\`
    );

    if (frequency > length / 2) {
      console.log(\`Majority found: \${nums[i]}\`);
      return nums[i];
    }
  }

  return nums[0];
}

majorityElementVerbose([2, 2, 1, 1, 1, 2, 2]);
`,
    },
    interviewQuestions: [
      {
        question: "Find the majority element using a hash map.",
        difficulty: "Easy",
        hint: "Count frequencies in a Map while scanning. Return as soon as one count becomes greater than n / 2.",
      },
      {
        question: "What changes if the majority element is not guaranteed to exist?",
        difficulty: "Medium",
        hint: "You can still use the map, but after the loop you must verify whether any count is actually greater than n / 2 before returning a result.",
      },
      {
        question: "Could you solve the follow-up in linear time and O(1) extra space?",
        difficulty: "Medium",
        hint: "Yes. Use Boyer-Moore Voting: keep a candidate and a count, cancel out different elements, then verify if the guarantee does not exist.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Remove Element
  // ─────────────────────────────────────────────
  {
    id: "remove-element",
    title: "Remove Element",
    slug: "remove-element",
    icon: "Trash2",
    difficulty: "Beginner",
    description:
      "Given an array and a value, remove all instances of that value in-place and return the new length. LeetCode 27.",
    leetcodeLink: "https://leetcode.com/problems/remove-element/",
    concept: {
      explanation:
        "The Remove Element problem asks you to modify an array in-place so that all occurrences of a given value are removed, and return the new length. The trick is to use a two-pointer technique: a slow pointer (k) tracks where the next non-target value should go, while a fast pointer (i) scans every element. When arr[i] !== val, you copy it to arr[k] and increment k. At the end, k is the new length and arr[0..k-1] contains only the kept elements. The order of remaining elements is preserved. This is O(n) time and O(1) space — no extra array needed.",
      realLifeAnalogy:
        "Imagine you have a row of books on a shelf and you want to remove all the red books. Instead of pulling each red book out (which shifts everything), you use a smarter approach: you walk along the shelf with two fingers. Your left finger marks the 'write position' — where the next keeper goes. Your right finger scans each book. Every time your right finger finds a non-red book, you move it to the left finger's position and advance the left finger. At the end, all non-red books are packed to the left, and you know exactly how many remain.",
      keyPoints: [
        "Two-pointer technique: slow pointer (k) for write position, fast pointer (i) for scanning",
        "Only copy elements that are NOT equal to the target value",
        "O(n) time — single pass through the array",
        "O(1) space — modifies array in-place, no extra storage",
        "The returned value k is the count of remaining elements",
        "Elements beyond index k don't matter (can be anything)",
        "Order of remaining elements is preserved",
        "LeetCode 27: https://leetcode.com/problems/remove-element/",
      ],
      timeComplexity: "O(n) — one pass through the array",
      spaceComplexity: "O(1) — in-place modification",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Remove Element (LeetCode 27) =====

// ── Two-pointer approach ────────────────────────
function removeElement(nums, val) {
  let k = 0; // slow pointer — write position
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
}

// ── Test case 1 ─────────────────────────────────
let nums1 = [3, 2, 2, 3];
let val1 = 3;
console.log("Input:", JSON.stringify(nums1), "| Remove:", val1);
let k1 = removeElement(nums1, val1);
console.log("New length:", k1);
console.log("Result:", JSON.stringify(nums1.slice(0, k1)));  // [2, 2]

// ── Test case 2 ─────────────────────────────────
let nums2 = [0, 1, 2, 2, 3, 0, 4, 2];
let val2 = 2;
console.log("\\nInput:", JSON.stringify(nums2), "| Remove:", val2);
let k2 = removeElement(nums2, val2);
console.log("New length:", k2);
console.log("Result:", JSON.stringify(nums2.slice(0, k2)));  // [0, 1, 3, 0, 4]

// ── Step-by-step trace ──────────────────────────
console.log("\\n--- Step-by-step trace ---");
function removeElementVerbose(nums, val) {
  let k = 0;
  console.log("Start: k = 0, val =", val);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      console.log(\`  i=\${i}: nums[\${i}]=\${nums[i]} ≠ \${val} → copy to position \${k}\`);
      nums[k] = nums[i];
      k++;
    } else {
      console.log(\`  i=\${i}: nums[\${i}]=\${nums[i]} === \${val} → skip\`);
    }
  }
  console.log("Final k =", k, "| Result:", JSON.stringify(nums.slice(0, k)));
  return k;
}
removeElementVerbose([0, 1, 2, 2, 3, 0, 4, 2], 2);
`,
    },
    interviewQuestions: [
      {
        question: "Remove all occurrences of a value from an array in-place and return the new length.",
        difficulty: "Easy",
        hint: "Use two pointers: a slow write pointer k and a fast scan pointer i. When nums[i] !== val, copy it to nums[k] and increment k. Return k at the end.",
      },
      {
        question: "What if you want to minimize the number of copy operations? (Hint: when there are few elements to remove)",
        difficulty: "Medium",
        hint: "Swap the element to remove with the last element and shrink the array size. This way you only do one operation per removal, but the order of elements is not preserved. Useful when removals are rare.",
      },
      {
        question: "Remove Duplicates from Sorted Array (LeetCode 26) — how does it differ?",
        difficulty: "Medium",
        hint: "Same two-pointer pattern, but instead of comparing against a fixed val, compare nums[i] with nums[k-1]. If they differ, it's a new unique element — copy it to position k. Works because the array is sorted, so duplicates are adjacent.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Best Time to Buy and Sell Stock
  // ─────────────────────────────────────────────
  {
    id: "best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-sell-stock",
    icon: "TrendingUp",
    difficulty: "Beginner",
    description:
      "Given an array of stock prices, find the maximum profit from one buy and one sell. LeetCode 121.",
    leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    concept: {
      explanation:
        "You're given an array where prices[i] is the stock price on day i. You want to maximize profit by choosing one day to buy and a later day to sell. The key insight is: as you scan left to right, track the minimum price seen so far (minPrice). At each day, the best you could do if you sold today is prices[i] - minPrice. Track the maximum of all such differences. This is a classic 'track the best so far' DP pattern — your state is the minimum price, and your decision at each step is whether selling today beats your previous best profit. One pass, O(n) time, O(1) space.",
      realLifeAnalogy:
        "Imagine you have a time machine but can only use it once. You look at a stock's price history on a chart. You slide your finger from left to right. Your left eye remembers the lowest price you've seen so far (the best day to have bought). Your right eye looks at today's price and calculates: 'If I bought at that lowest point and sold today, how much would I make?' You keep a mental note of the best profit. By the time your finger reaches the end of the chart, you know the perfect buy-sell pair — no sorting, no nested loops, just one smooth scan.",
      keyPoints: [
        "Track minPrice (lowest seen so far) and maxProfit as you scan",
        "At each price: profit = prices[i] - minPrice; update maxProfit",
        "Update minPrice if current price is lower",
        "O(n) time — single pass; O(1) space — two variables",
        "If prices only decrease, maxProfit stays 0 (don't buy at all)",
        "This is Kadane's algorithm adapted for stock prices",
        "Cannot sell before buying — scan left to right enforces this",
        "LeetCode 121: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      ],
      timeComplexity: "O(n) — single pass through the prices array",
      spaceComplexity: "O(1) — only two variables: minPrice and maxProfit",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Best Time to Buy and Sell Stock (LeetCode 121) =====

function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];       // new lowest buy price
    } else {
      const profit = prices[i] - minPrice;
      if (profit > maxProfit) {
        maxProfit = profit;       // new best profit
      }
    }
  }
  return maxProfit;
}

// ── Test case 1 ─────────────────────────────────
let prices1 = [7, 1, 5, 3, 6, 4];
console.log("Prices:", JSON.stringify(prices1));
console.log("Max Profit:", maxProfit(prices1));  // 5 (buy@1, sell@6)

// ── Test case 2 (declining prices) ──────────────
let prices2 = [7, 6, 4, 3, 1];
console.log("\\nPrices:", JSON.stringify(prices2));
console.log("Max Profit:", maxProfit(prices2));  // 0 (no profit possible)

// ── Test case 3 ─────────────────────────────────
let prices3 = [2, 4, 1, 7, 5, 3, 6];
console.log("\\nPrices:", JSON.stringify(prices3));
console.log("Max Profit:", maxProfit(prices3));  // 6 (buy@1, sell@7)

// ── Step-by-step trace ──────────────────────────
console.log("\\n--- Step-by-step trace ---");
function maxProfitVerbose(prices) {
  let minPrice = Infinity;
  let best = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
      console.log(\`Day \${i}: price=\${prices[i]} → new min! minPrice=\${minPrice}\`);
    } else {
      const profit = prices[i] - minPrice;
      if (profit > best) best = profit;
      console.log(\`Day \${i}: price=\${prices[i]} - min=\${minPrice} = profit \${profit} | best=\${best}\`);
    }
  }
  return best;
}
maxProfitVerbose([7, 1, 5, 3, 6, 4]);
`,
    },
    interviewQuestions: [
      {
        question: "Find the maximum profit from buying and selling a stock once.",
        difficulty: "Easy",
        hint: "Track minPrice and maxProfit in one pass. At each price, compute profit = price - minPrice, update maxProfit if larger. Update minPrice if current price is lower. Return maxProfit.",
      },
      {
        question: "What if you could buy and sell multiple times (LeetCode 122)?",
        difficulty: "Medium",
        hint: "Greedy: add up every upward move. If prices[i] > prices[i-1], add the difference to profit. You're capturing every 'valley to peak' gain. Still O(n) time, O(1) space.",
      },
      {
        question: "What if there's a cooldown of 1 day after selling (LeetCode 309)?",
        difficulty: "Hard",
        hint: "Use three DP states: hold (own stock), sold (just sold today, must cool down tomorrow), rest (no stock, free to buy). Transitions: hold = max(hold, rest - price), sold = hold + price, rest = max(rest, sold). Track these three values as you scan through prices.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Squares of a Sorted Array
  // ─────────────────────────────────────────────
  {
    id: "squares-of-sorted-array",
    title: "Squares of a Sorted Array",
    slug: "squares-of-sorted-array",
    icon: "ArrowUpDown",
    difficulty: "Beginner",
    description:
      "Given a sorted array of integers, return an array of the squares of each number, also sorted. LeetCode 977.",
    leetcodeLink: "https://leetcode.com/problems/squares-of-a-sorted-array/",
    concept: {
      explanation:
        "You're given an integer array sorted in non-decreasing order (may include negatives). You need to return the squares of each number, sorted. The naive approach is to square everything and sort — O(n log n). The optimal approach uses two pointers: one at the start (largest negative) and one at the end (largest positive). Since squares of large negatives can be bigger than squares of small positives, you compare absolute values from both ends, place the larger square at the end of the result array, and move the pointer inward. This fills the result from right to left in one pass — O(n) time, O(n) space for the output.",
      realLifeAnalogy:
        "Imagine two runners on a number line — one starting from the far left (negative side) and one from the far right (positive side). Both are shouting their distances from zero. A judge at the finish line writes down the larger distance first, working backwards to fill a scoreboard. Since both runners move inward, the judge always picks the bigger remaining distance without re-sorting anything.",
      keyPoints: [
        "Two-pointer technique: left at index 0, right at index n-1",
        "Compare Math.abs(arr[left]) vs Math.abs(arr[right])",
        "Place the larger square at the end of the result array, fill right to left",
        "O(n) time — single pass; O(n) space for the result array",
        "Handles negative numbers naturally — their squares can be large",
        "Naive approach: square all, then sort → O(n log n) — suboptimal",
        "LeetCode 977: https://leetcode.com/problems/squares-of-a-sorted-array/",
      ],
      timeComplexity: "O(n) — single pass with two pointers",
      spaceComplexity: "O(n) — for the output array",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Squares of a Sorted Array (LeetCode 977) =====

// ── Optimal: Two-pointer approach ───────────────
function sortedSquares(nums) {
  const n = nums.length;
  const result = new Array(n);
  let left = 0, right = n - 1;
  let pos = n - 1; // fill from the end

  while (left <= right) {
    const leftSq = nums[left] * nums[left];
    const rightSq = nums[right] * nums[right];
    if (leftSq > rightSq) {
      result[pos] = leftSq;
      left++;
    } else {
      result[pos] = rightSq;
      right--;
    }
    pos--;
  }
  return result;
}

// ── Test cases ──────────────────────────────────
console.log("Input: [-4, -1, 0, 3, 10]");
console.log("Output:", JSON.stringify(sortedSquares([-4, -1, 0, 3, 10])));
// [0, 1, 9, 16, 100]

console.log("\\nInput: [-7, -3, 2, 3, 11]");
console.log("Output:", JSON.stringify(sortedSquares([-7, -3, 2, 3, 11])));
// [4, 9, 9, 49, 121]

console.log("\\nInput: [1, 2, 3, 4, 5]");
console.log("Output:", JSON.stringify(sortedSquares([1, 2, 3, 4, 5])));
// [1, 4, 9, 16, 25]

// ── Step-by-step trace ──────────────────────────
console.log("\\n--- Step-by-step trace ---");
function sortedSquaresVerbose(nums) {
  const n = nums.length;
  const result = new Array(n);
  let left = 0, right = n - 1, pos = n - 1;
  while (left <= right) {
    const lSq = nums[left] ** 2;
    const rSq = nums[right] ** 2;
    if (lSq > rSq) {
      console.log(\`left=\${nums[left]}² = \${lSq} > right=\${nums[right]}² = \${rSq} → result[\${pos}] = \${lSq}\`);
      result[pos] = lSq; left++;
    } else {
      console.log(\`right=\${nums[right]}² = \${rSq} >= left=\${nums[left]}² = \${lSq} → result[\${pos}] = \${rSq}\`);
      result[pos] = rSq; right--;
    }
    pos--;
  }
  console.log("Result:", JSON.stringify(result));
  return result;
}
sortedSquaresVerbose([-4, -1, 0, 3, 10]);
`,
    },
    interviewQuestions: [
      {
        question: "Return sorted squares of a sorted array in O(n) time.",
        difficulty: "Easy",
        hint: "Two pointers at both ends. Compare absolute values, place the larger square at the back of the result array, and move the pointer inward. Fill result right-to-left.",
      },
      {
        question: "Can you solve it without allocating a new array (in-place)?",
        difficulty: "Medium",
        hint: "Not really — squaring in-place destroys the sorted order of negatives. You'd need the output array. However, if all values are non-negative, you can square in-place since the order is preserved.",
      },
      {
        question: "What if the input is sorted in non-increasing order instead?",
        difficulty: "Medium",
        hint: "Reverse the pointer logic — the smallest absolute values are at the ends, and the largest are in the middle. Use two pointers starting from both ends moving inward, but fill the result left-to-right with the smaller square.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Remove Duplicates from Sorted Array
  // ─────────────────────────────────────────────
  {
    id: "remove-duplicates-sorted-array",
    title: "Remove Duplicates from Sorted Array",
    slug: "remove-duplicates-sorted-array",
    icon: "ListFilter",
    difficulty: "Beginner",
    description:
      "Given a sorted array, remove duplicates in-place and return the count of unique elements. LeetCode 26.",
    leetcodeLink: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    concept: {
      explanation:
        "Given a sorted integer array, remove duplicates in-place so each element appears only once, and return the new length. The two-pointer technique works perfectly here: a slow pointer (k) marks the position of the last unique element, while a fast pointer (i) scans forward. Since the array is sorted, duplicates are adjacent. When nums[i] !== nums[k], you've found a new unique element — copy it to position k+1 and advance k. At the end, k+1 is the count of unique elements. O(n) time, O(1) space.",
      realLifeAnalogy:
        "Imagine you're organizing a line of students sorted by height. Some students have the exact same height and are standing next to each other. Your job is to keep one student from each height group and send the rest home. You walk down the line with a clipboard (slow pointer). Each time you spot a student taller than the last one on your list, you wave them forward to stand next in the 'unique' line. Same-height students behind them get sent home.",
      keyPoints: [
        "Two-pointer: k (write position for last unique), i (scanner)",
        "Since array is sorted, duplicates are always adjacent",
        "When nums[i] !== nums[k], it's a new unique element → copy to k+1",
        "O(n) time — single pass; O(1) space — in-place",
        "Return k + 1 as the count of unique elements",
        "Elements beyond the returned length don't matter",
        "Very similar to Remove Element (LeetCode 27) but comparison differs",
        "LeetCode 26: https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
      ],
      timeComplexity: "O(n) — single pass through the array",
      spaceComplexity: "O(1) — in-place modification",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Remove Duplicates from Sorted Array (LeetCode 26) =====

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let k = 0; // position of last unique element
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k]) {
      k++;
      nums[k] = nums[i];
    }
  }
  return k + 1; // count of unique elements
}

// ── Test case 1 ─────────────────────────────────
let nums1 = [1, 1, 2];
console.log("Input:", JSON.stringify(nums1));
let k1 = removeDuplicates(nums1);
console.log("Unique count:", k1);
console.log("Result:", JSON.stringify(nums1.slice(0, k1)));  // [1, 2]

// ── Test case 2 ─────────────────────────────────
let nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log("\\nInput:", JSON.stringify(nums2));
let k2 = removeDuplicates(nums2);
console.log("Unique count:", k2);
console.log("Result:", JSON.stringify(nums2.slice(0, k2)));  // [0, 1, 2, 3, 4]

// ── Test case 3 (all same) ──────────────────────
let nums3 = [5, 5, 5, 5];
console.log("\\nInput:", JSON.stringify(nums3));
let k3 = removeDuplicates(nums3);
console.log("Unique count:", k3);
console.log("Result:", JSON.stringify(nums3.slice(0, k3)));  // [5]

// ── Step-by-step trace ──────────────────────────
console.log("\\n--- Step-by-step trace ---");
function removeDuplicatesVerbose(nums) {
  let k = 0;
  console.log("Start: k=0, nums[0]=" + nums[0] + " (first unique)");
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k]) {
      k++;
      nums[k] = nums[i];
      console.log(\`  i=\${i}: nums[\${i}]=\${nums[i]} ≠ nums[\${k-1}] → new unique at position \${k}\`);
    } else {
      console.log(\`  i=\${i}: nums[\${i}]=\${nums[i]} === nums[\${k}] → skip (duplicate)\`);
    }
  }
  console.log("Unique count:", k + 1, "| Result:", JSON.stringify(nums.slice(0, k + 1)));
  return k + 1;
}
removeDuplicatesVerbose([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
`,
    },
    interviewQuestions: [
      {
        question: "Remove duplicates from a sorted array in-place and return the unique count.",
        difficulty: "Easy",
        hint: "Two pointers: k tracks the last unique position, i scans forward. When nums[i] !== nums[k], increment k and copy nums[i] there. Return k + 1.",
      },
      {
        question: "What if duplicates are allowed at most twice (LeetCode 80)?",
        difficulty: "Medium",
        hint: "Change the comparison: instead of nums[i] !== nums[k], check nums[i] !== nums[k-1]. This allows up to 2 of each value. The slow pointer k still tracks the write position, but you compare against the element two positions back.",
      },
      {
        question: "How would you remove duplicates from an unsorted array in O(n) time?",
        difficulty: "Medium",
        hint: "Use a Set to track seen values. Iterate with two pointers — only copy to the write position if the element hasn't been seen. The Set gives O(1) lookup. Total: O(n) time, O(n) space for the Set.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Sort Colors (Dutch National Flag)
  // ─────────────────────────────────────────────
  {
    id: "sort-colors",
    title: "Sort Colors (Dutch National Flag)",
    slug: "sort-colors",
    icon: "Palette",
    difficulty: "Intermediate",
    description:
      "Sort an array of 0s, 1s, and 2s in-place in a single pass. LeetCode 75.",
    leetcodeLink: "https://leetcode.com/problems/sort-colors/",
    concept: {
      explanation:
        "The Sort Colors problem (also known as the Dutch National Flag problem, invented by Dijkstra) asks you to sort an array containing only 0, 1, and 2. The optimal solution uses three pointers: low (boundary for 0s), mid (current scanner), and high (boundary for 2s). When mid sees a 0, swap it with low and advance both. When mid sees a 1, just advance mid. When mid sees a 2, swap it with high and shrink high (don't advance mid — the swapped element needs checking). This partitions the array into three regions: [0...0 | 1...1 | 2...2] in a single pass. O(n) time, O(1) space.",
      realLifeAnalogy:
        "Imagine you're sorting a deck of cards into three piles: red, white, and blue. You have three markers on a table — a left marker, a middle marker, and a right marker. You flip cards one by one at the middle position. Red card? Swap it to the left pile and move both the left and middle markers right. White card? It's already in the right place — just advance the middle marker. Blue card? Swap it to the right pile and move the right marker left (but keep middle where it is, since the swapped card hasn't been checked yet).",
      keyPoints: [
        "Three pointers: low (next 0 position), mid (scanner), high (next 2 position)",
        "If nums[mid] === 0: swap(low, mid), low++, mid++",
        "If nums[mid] === 1: mid++ (already in correct region)",
        "If nums[mid] === 2: swap(mid, high), high-- (don't advance mid!)",
        "Loop continues while mid <= high",
        "Single pass — O(n) time, O(1) space",
        "Don't advance mid after swapping with high — the swapped value is unchecked",
        "LeetCode 75: https://leetcode.com/problems/sort-colors/",
      ],
      timeComplexity: "O(n) — single pass through the array",
      spaceComplexity: "O(1) — in-place with three pointers",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Sort Colors / Dutch National Flag (LeetCode 75) =====

function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
      // don't advance mid — swapped value needs checking
    }
  }
}

// ── Test case 1 ─────────────────────────────────
let nums1 = [2, 0, 2, 1, 1, 0];
console.log("Input:", JSON.stringify(nums1));
sortColors(nums1);
console.log("Output:", JSON.stringify(nums1));  // [0, 0, 1, 1, 2, 2]

// ── Test case 2 ─────────────────────────────────
let nums2 = [2, 0, 1];
console.log("\\nInput:", JSON.stringify(nums2));
sortColors(nums2);
console.log("Output:", JSON.stringify(nums2));  // [0, 1, 2]

// ── Test case 3 ─────────────────────────────────
let nums3 = [0];
console.log("\\nInput:", JSON.stringify(nums3));
sortColors(nums3);
console.log("Output:", JSON.stringify(nums3));  // [0]

// ── Step-by-step trace ──────────────────────────
console.log("\\n--- Step-by-step trace ---");
function sortColorsVerbose(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  console.log("Start:", JSON.stringify(nums), "low=0 mid=0 high=" + high);
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      console.log(\`mid=\${mid} is 0 → swap(\${low},\${mid}) → [\${nums}] low=\${low+1} mid=\${mid+1}\`);
      low++; mid++;
    } else if (nums[mid] === 1) {
      console.log(\`mid=\${mid} is 1 → skip → mid=\${mid+1}\`);
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      console.log(\`mid=\${mid} is 2 → swap(\${mid},\${high}) → [\${nums}] high=\${high-1}\`);
      high--;
    }
  }
  console.log("Result:", JSON.stringify(nums));
}
sortColorsVerbose([2, 0, 2, 1, 1, 0]);
`,
    },
    interviewQuestions: [
      {
        question: "Sort an array of 0s, 1s, and 2s in a single pass without using a sorting algorithm.",
        difficulty: "Easy",
        hint: "Dutch National Flag: three pointers — low, mid, high. Swap 0s to the front (low), leave 1s in the middle, swap 2s to the back (high). Key: don't advance mid after swapping with high.",
      },
      {
        question: "Why don't we advance mid after swapping with high?",
        difficulty: "Medium",
        hint: "When we swap nums[mid] with nums[high], the value that comes from high hasn't been examined yet — it could be 0, 1, or 2. If we advance mid, we'd skip checking it. After swapping with low, both values are known (low region is processed), so advancing mid is safe.",
      },
      {
        question: "How would you extend this to sort 4 colors (0, 1, 2, 3)?",
        difficulty: "Hard",
        hint: "Use four pointers: p0, p1, p2, p3. Or think of it as two passes of the Dutch National Flag: first partition around value 1 (0s left, rest right), then partition the right portion around value 2. Each pass is O(n), so total is still O(n).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Running Sum of 1D Array
  // ─────────────────────────────────────────────
  {
    id: "running-sum",
    title: "Running Sum of 1D Array",
    slug: "running-sum",
    icon: "TrendingUp",
    difficulty: "Beginner",
    description:
      "Return a running sum of an array where each element is the sum of all elements up to that index. LeetCode 1480.",
    leetcodeLink: "https://leetcode.com/problems/running-sum-of-1d-array/",
    concept: {
      explanation:
        "The running sum (also called prefix sum) of an array transforms each element into the cumulative total up to that index. For an array [1, 2, 3, 4], the running sum is [1, 3, 6, 10]. The approach is simple: iterate from index 1 onward, and at each position set nums[i] = nums[i] + nums[i-1]. This works because nums[i-1] already contains the cumulative sum up to that point. Prefix sums are a foundational technique in dynamic programming — they let you compute the sum of any subarray in O(1) time after an O(n) preprocessing step.",
      realLifeAnalogy:
        "Imagine you're tracking your monthly savings. In January you save $100, February $200, March $150. Your running total after each month is: $100, $300, $450. At any point, you know your total savings without re-adding everything — you just take last month's total and add this month's amount. That's exactly what a prefix sum does.",
      keyPoints: [
        "In-place: nums[i] += nums[i-1] for i from 1 to n-1",
        "O(n) time — single pass; O(1) extra space (modifies in-place)",
        "Prefix sums enable O(1) range sum queries: sum(i,j) = prefix[j] - prefix[i-1]",
        "Foundation for many DP problems (subarray sums, range queries)",
        "Can also be built into a separate prefix array to keep original data",
        "LeetCode 1480: https://leetcode.com/problems/running-sum-of-1d-array/",
      ],
      timeComplexity: "O(n) — single pass",
      spaceComplexity: "O(1) — in-place modification",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Running Sum of 1D Array (LeetCode 1480) =====

function runningSum(nums) {
  for (let i = 1; i < nums.length; i++) {
    nums[i] += nums[i - 1];
  }
  return nums;
}

// ── Test cases ──────────────────────────────────
console.log("Input: [1, 2, 3, 4]");
console.log("Output:", JSON.stringify(runningSum([1, 2, 3, 4])));
// [1, 3, 6, 10]

console.log("\\nInput: [1, 1, 1, 1, 1]");
console.log("Output:", JSON.stringify(runningSum([1, 1, 1, 1, 1])));
// [1, 2, 3, 4, 5]

console.log("\\nInput: [3, 1, 2, 10, 1]");
console.log("Output:", JSON.stringify(runningSum([3, 1, 2, 10, 1])));
// [3, 4, 6, 16, 17]

// ── Step-by-step trace ──────────────────────────
console.log("\\n--- Step-by-step trace ---");
function runningSumVerbose(nums) {
  console.log("Start:", JSON.stringify(nums));
  for (let i = 1; i < nums.length; i++) {
    const prev = nums[i];
    nums[i] += nums[i - 1];
    console.log(\`  i=\${i}: \${prev} + \${nums[i-1] - prev + prev} = \${nums[i]}\`);
  }
  console.log("Result:", JSON.stringify(nums));
  return nums;
}
runningSumVerbose([1, 2, 3, 4]);
`,
    },
    interviewQuestions: [
      {
        question: "Compute the running sum of an array.",
        difficulty: "Easy",
        hint: "Iterate from index 1: nums[i] += nums[i-1]. Each element becomes the cumulative sum up to that index.",
      },
      {
        question: "Given a prefix sum array, find the sum of elements between indices i and j in O(1).",
        difficulty: "Medium",
        hint: "sum(i, j) = prefix[j] - prefix[i-1]. For i=0, just use prefix[j]. This is the core power of prefix sums.",
      },
      {
        question: "How would you compute a 2D prefix sum for a matrix?",
        difficulty: "Hard",
        hint: "Use inclusion-exclusion: prefix[i][j] = matrix[i][j] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]. Then any rectangle sum is computed in O(1).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Find Pivot Index
  // ─────────────────────────────────────────────
  {
    id: "find-pivot-index",
    title: "Find Pivot Index",
    slug: "find-pivot-index",
    icon: "Crosshair",
    difficulty: "Beginner",
    description:
      "Find the index where the sum of elements to the left equals the sum of elements to the right. LeetCode 724.",
    leetcodeLink: "https://leetcode.com/problems/find-pivot-index/",
    concept: {
      explanation:
        "The pivot index is the index where the sum of all elements strictly to the left equals the sum of all elements strictly to the right. The approach: first compute the total sum. Then iterate left to right, maintaining a leftSum. At each index i, rightSum = totalSum - leftSum - nums[i]. If leftSum === rightSum, you've found the pivot. Then add nums[i] to leftSum and continue. This is O(n) time with O(1) extra space — a classic prefix sum application.",
      realLifeAnalogy:
        "Imagine a seesaw with weighted blocks placed along it. You're looking for the balance point — the position where the weight on the left equals the weight on the right. Instead of recalculating from scratch each time, you slide the fulcrum one position at a time: move one block from the 'right side' to the 'left side' and check if it balances.",
      keyPoints: [
        "First pass: compute totalSum",
        "Second pass: track leftSum, compute rightSum = totalSum - leftSum - nums[i]",
        "If leftSum === rightSum, return i",
        "O(n) time, O(1) space — two passes",
        "If no pivot exists, return -1",
        "Edge case: pivot at index 0 means leftSum = 0",
        "LeetCode 724: https://leetcode.com/problems/find-pivot-index/",
      ],
      timeComplexity: "O(n) — two passes through the array",
      spaceComplexity: "O(1) — only two variables",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Find Pivot Index (LeetCode 724) =====

function pivotIndex(nums) {
  const totalSum = nums.reduce((a, b) => a + b, 0);
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    const rightSum = totalSum - leftSum - nums[i];
    if (leftSum === rightSum) return i;
    leftSum += nums[i];
  }
  return -1;
}

// ── Test cases ──────────────────────────────────
console.log("Input: [1, 7, 3, 6, 5, 6]");
console.log("Pivot Index:", pivotIndex([1, 7, 3, 6, 5, 6]));  // 3

console.log("\\nInput: [1, 2, 3]");
console.log("Pivot Index:", pivotIndex([1, 2, 3]));  // -1

console.log("\\nInput: [2, 1, -1]");
console.log("Pivot Index:", pivotIndex([2, 1, -1]));  // 0

// ── Step-by-step trace ──────────────────────────
console.log("\\n--- Step-by-step trace ---");
function pivotIndexVerbose(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  console.log("Total sum:", total);
  for (let i = 0; i < nums.length; i++) {
    const rightSum = total - leftSum - nums[i];
    console.log(\`  i=\${i}: left=\${leftSum}, right=\${rightSum}\${leftSum === rightSum ? " ✅ PIVOT!" : ""}\`);
    if (leftSum === rightSum) return i;
    leftSum += nums[i];
  }
  return -1;
}
pivotIndexVerbose([1, 7, 3, 6, 5, 6]);
`,
    },
    interviewQuestions: [
      {
        question: "Find the pivot index where left sum equals right sum.",
        difficulty: "Easy",
        hint: "Compute total sum first. Then scan left to right with leftSum. At each index: rightSum = total - leftSum - nums[i]. If equal, return i.",
      },
      {
        question: "What if there are multiple pivot indices? Return the leftmost one.",
        difficulty: "Medium",
        hint: "The algorithm already returns the leftmost pivot because it scans left to right and returns immediately on the first match.",
      },
      {
        question: "Can you find a pivot in a circular array?",
        difficulty: "Hard",
        hint: "For a circular array, the total sum stays the same. Try each index as a potential pivot, but compute left/right sums wrapping around. Or duplicate the array and use a sliding window approach.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Subarray Sum Equals K
  // ─────────────────────────────────────────────
  {
    id: "subarray-sum-equals-k",
    title: "Subarray Sum Equals K",
    slug: "subarray-sum-equals-k",
    icon: "Hash",
    difficulty: "Intermediate",
    description:
      "Count the number of contiguous subarrays whose elements sum to k. LeetCode 560.",
    leetcodeLink: "https://leetcode.com/problems/subarray-sum-equals-k/",
    concept: {
      explanation:
        "Given an array and a target k, count how many contiguous subarrays sum to k. The brute force checks all pairs — O(n²). The optimal approach uses a prefix sum + hash map. As you scan, maintain a running sum (prefix). If prefix - k exists in the map, it means there's a subarray ending at the current index that sums to k. The map stores how many times each prefix sum has occurred. Key insight: sum(i..j) = prefix[j] - prefix[i-1], so if prefix[j] - k = prefix[i-1], we found a valid subarray. Initialize the map with {0: 1} to handle subarrays starting from index 0.",
      realLifeAnalogy:
        "You're walking along a trail with distance markers. You want to find how many sections of the trail are exactly 5 km long. Instead of measuring every possible start-end pair, you keep a notebook of all distances you've been at. At each marker, you check: 'Have I been at a point that's exactly 5 km behind me?' If yes, the trail between that point and here is exactly 5 km. The notebook is your hash map of prefix sums.",
      keyPoints: [
        "Prefix sum + hash map approach — O(n) time, O(n) space",
        "Running sum: prefix += nums[i] at each step",
        "Check if (prefix - k) exists in the map → found a valid subarray",
        "Map stores frequency of each prefix sum seen so far",
        "Initialize map with {0: 1} to handle subarrays starting at index 0",
        "Works with negative numbers (unlike sliding window)",
        "Cannot use sliding window because array may contain negatives",
        "LeetCode 560: https://leetcode.com/problems/subarray-sum-equals-k/",
      ],
      timeComplexity: "O(n) — single pass with hash map lookups",
      spaceComplexity: "O(n) — hash map of prefix sums",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Subarray Sum Equals K (LeetCode 560) =====

function subarraySum(nums, k) {
  const prefixMap = new Map();
  prefixMap.set(0, 1); // empty subarray
  let prefix = 0;
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];
    if (prefixMap.has(prefix - k)) {
      count += prefixMap.get(prefix - k);
    }
    prefixMap.set(prefix, (prefixMap.get(prefix) || 0) + 1);
  }
  return count;
}

// ── Test cases ──────────────────────────────────
console.log("Input: [1,1,1], k=2");
console.log("Count:", subarraySum([1, 1, 1], 2));  // 2

console.log("\\nInput: [1,2,3], k=3");
console.log("Count:", subarraySum([1, 2, 3], 3));  // 2

console.log("\\nInput: [1,-1,0], k=0");
console.log("Count:", subarraySum([1, -1, 0], 0));  // 3

// ── Step-by-step trace ──────────────────────────
console.log("\\n--- Step-by-step trace ---");
function subarraySumVerbose(nums, k) {
  const map = new Map(); map.set(0, 1);
  let prefix = 0, count = 0;
  console.log("Target k =", k);
  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];
    const need = prefix - k;
    const found = map.get(need) || 0;
    if (found > 0) { count += found; console.log(\`  i=\${i}: prefix=\${prefix}, need=\${need} found \${found}x → count=\${count}\`); }
    else { console.log(\`  i=\${i}: prefix=\${prefix}, need=\${need} not in map\`); }
    map.set(prefix, (map.get(prefix) || 0) + 1);
  }
  console.log("Total subarrays:", count);
  return count;
}
subarraySumVerbose([1, 1, 1], 2);
`,
    },
    interviewQuestions: [
      {
        question: "Count subarrays that sum to k.",
        difficulty: "Easy",
        hint: "Prefix sum + hash map. Track running sum; at each step check if (prefix - k) exists in the map. Initialize map with {0: 1}.",
      },
      {
        question: "Why can't we use a sliding window for this problem?",
        difficulty: "Medium",
        hint: "Sliding window assumes adding elements increases the sum and removing decreases it. With negative numbers, this assumption breaks — shrinking the window might increase the sum. Prefix sum + map works regardless of sign.",
      },
      {
        question: "Find the longest subarray with sum equal to k.",
        difficulty: "Hard",
        hint: "Similar prefix sum approach, but instead of counting, store the first index where each prefix sum occurs. When prefix - k is found, the subarray length is i - firstIndex. Track the maximum length.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Contains Duplicate
  // ─────────────────────────────────────────────
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    slug: "contains-duplicate",
    icon: "Copy",
    difficulty: "Beginner",
    description:
      "Determine if any value appears at least twice in the array. LeetCode 217.",
    leetcodeLink: "https://leetcode.com/problems/contains-duplicate/",
    concept: {
      explanation:
        "Given an integer array, return true if any value appears at least twice. The brute force uses nested loops — O(n²). Sorting first lets you check adjacent elements — O(n log n). The optimal approach uses a Set: iterate through the array, and for each element check if it's already in the Set. If yes, return true. Otherwise, add it. If you finish without finding a duplicate, return false. O(n) time, O(n) space.",
      realLifeAnalogy:
        "Imagine you're a bouncer at a club checking IDs. You have a guest list (your Set). Each person shows their ID — if they're already on the list, you catch them trying to enter twice. If not, you add their name. By the end of the line, you know if anyone tried to sneak in a second time.",
      keyPoints: [
        "Use a Set for O(1) lookup — check if element exists before adding",
        "Return true immediately when a duplicate is found (early exit)",
        "O(n) time — single pass; O(n) space for the Set",
        "Alternative: sort first, then check adjacent pairs — O(n log n) time, O(1) space",
        "Brute force: nested loops — O(n²), avoid this",
        "LeetCode 217: https://leetcode.com/problems/contains-duplicate/",
      ],
      timeComplexity: "O(n) — single pass with Set",
      spaceComplexity: "O(n) — Set stores up to n elements",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Contains Duplicate (LeetCode 217) =====

function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}

// ── Test cases ──────────────────────────────────
console.log("Input: [1, 2, 3, 1]");
console.log("Contains duplicate:", containsDuplicate([1, 2, 3, 1]));  // true

console.log("\\nInput: [1, 2, 3, 4]");
console.log("Contains duplicate:", containsDuplicate([1, 2, 3, 4]));  // false

console.log("\\nInput: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]");
console.log("Contains duplicate:", containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]));  // true

// ── Alternative: Sort approach ──────────────────
function containsDuplicateSort(nums) {
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) return true;
  }
  return false;
}
console.log("\\n--- Sort approach ---");
console.log("Contains duplicate:", containsDuplicateSort([1, 2, 3, 1]));  // true

// ── Step-by-step trace ──────────────────────────
console.log("\\n--- Step-by-step trace ---");
function containsDuplicateVerbose(nums) {
  const seen = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(nums[i])) {
      console.log(\`  i=\${i}: \${nums[i]} already in Set → DUPLICATE!\`);
      return true;
    }
    seen.add(nums[i]);
    console.log(\`  i=\${i}: \${nums[i]} added to Set → {\${[...seen].join(", ")}}\`);
  }
  return false;
}
containsDuplicateVerbose([1, 2, 3, 1]);
`,
    },
    interviewQuestions: [
      {
        question: "Check if an array contains any duplicates.",
        difficulty: "Easy",
        hint: "Use a Set. For each element, check if it's already in the Set. If yes, return true. Otherwise add it. O(n) time.",
      },
      {
        question: "Contains Duplicate II (LeetCode 219): duplicates within distance k.",
        difficulty: "Medium",
        hint: "Use a sliding window Set of size k. Add nums[i] to the Set; if Set size exceeds k, remove nums[i-k]. If nums[i] is already in the Set before adding, return true.",
      },
      {
        question: "Contains Duplicate III (LeetCode 220): elements within distance k with value difference ≤ t.",
        difficulty: "Hard",
        hint: "Use bucket sort with bucket size t+1. Each bucket holds values in range [bucket*size, (bucket+1)*size). Check current bucket and adjacent buckets. Maintain a sliding window of k buckets.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Missing Number
  // ─────────────────────────────────────────────
  {
    id: "missing-number",
    title: "Missing Number",
    slug: "missing-number",
    icon: "Search",
    difficulty: "Beginner",
    description:
      "Given an array containing n distinct numbers from 0 to n, find the one missing. LeetCode 268.",
    leetcodeLink: "https://leetcode.com/problems/missing-number/",
    concept: {
      explanation:
        "Given n distinct numbers from the range [0, n], one number is missing. Find it. There are multiple elegant solutions: (1) Math: expected sum = n*(n+1)/2, actual sum = sum of array. Missing = expected - actual. O(n) time, O(1) space. (2) XOR: XOR all numbers 0..n with all array elements. Pairs cancel out, leaving the missing number. O(n) time, O(1) space. (3) Set: put all elements in a Set, then check which number 0..n is missing. O(n) time, O(n) space. The math approach is simplest and most interview-friendly.",
      realLifeAnalogy:
        "Imagine 100 students are assigned jersey numbers 0 to 100. One student is absent. To find who's missing, you don't need to call roll for everyone. Just add up all the jersey numbers present and subtract from the expected total (0+1+2+...+100 = 5050). The difference is the missing student's number. Quick, elegant, no extra equipment needed.",
      keyPoints: [
        "Math approach: missing = n*(n+1)/2 - sum(nums)",
        "XOR approach: XOR all indices and values; duplicates cancel, missing remains",
        "O(n) time, O(1) space for both math and XOR approaches",
        "Set approach works but uses O(n) extra space",
        "Gauss's formula: sum of 0 to n = n*(n+1)/2",
        "LeetCode 268: https://leetcode.com/problems/missing-number/",
      ],
      timeComplexity: "O(n) — single pass",
      spaceComplexity: "O(1) — math/XOR approach",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Missing Number (LeetCode 268) =====

// ── Approach 1: Math (Gauss formula) ────────────
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = n * (n + 1) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}

console.log("Input: [3, 0, 1]");
console.log("Missing:", missingNumber([3, 0, 1]));  // 2

console.log("\\nInput: [0, 1]");
console.log("Missing:", missingNumber([0, 1]));  // 2

console.log("\\nInput: [9,6,4,2,3,5,7,0,1]");
console.log("Missing:", missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));  // 8

// ── Approach 2: XOR ─────────────────────────────
function missingNumberXOR(nums) {
  let xor = nums.length;
  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];
  }
  return xor;
}

console.log("\\n--- XOR approach ---");
console.log("Missing:", missingNumberXOR([3, 0, 1]));  // 2

// ── Step-by-step trace ──────────────────────────
console.log("\\n--- Step-by-step trace (Math) ---");
function missingNumberVerbose(nums) {
  const n = nums.length;
  const expected = n * (n + 1) / 2;
  const actual = nums.reduce((a, b) => a + b, 0);
  console.log(\`  n = \${n}\`);
  console.log(\`  Expected sum (0..\${n}) = \${expected}\`);
  console.log(\`  Actual sum = \${actual}\`);
  console.log(\`  Missing = \${expected} - \${actual} = \${expected - actual}\`);
  return expected - actual;
}
missingNumberVerbose([3, 0, 1]);
`,
    },
    interviewQuestions: [
      {
        question: "Find the missing number from 0 to n.",
        difficulty: "Easy",
        hint: "Gauss formula: expected = n*(n+1)/2. Subtract the actual sum. The difference is the missing number.",
      },
      {
        question: "What if there are two missing numbers?",
        difficulty: "Medium",
        hint: "Sum gives you missing1 + missing2. XOR gives you missing1 XOR missing2. Use the XOR result to find a differing bit, then partition numbers into two groups based on that bit. XOR each group separately to find both missing numbers.",
      },
      {
        question: "Find the missing number in a stream of n-1 numbers (you can only read once).",
        difficulty: "Medium",
        hint: "Use either the sum or XOR approach — both work in a single pass. XOR is preferred to avoid integer overflow for very large n.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Merge Intervals
  // ─────────────────────────────────────────────
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    slug: "merge-intervals",
    icon: "GitMerge",
    difficulty: "Intermediate",
    description:
      "Given an array of intervals, merge all overlapping intervals. LeetCode 56.",
    leetcodeLink: "https://leetcode.com/problems/merge-intervals/",
    concept: {
      explanation:
        "Given an array of intervals [start, end], merge all overlapping intervals. First, sort intervals by start time. Then iterate: if the current interval overlaps with the last merged interval (current.start <= lastMerged.end), extend the last merged interval's end to max(lastMerged.end, current.end). Otherwise, push the current interval as a new non-overlapping entry. Sorting ensures you only need to compare with the most recently merged interval — no need to look back further. O(n log n) time due to sorting, O(n) space for the result.",
      realLifeAnalogy:
        "Imagine you're a calendar app merging overlapping meetings. First, sort all meetings by start time. Then walk through them: if the next meeting starts before the current one ends, they overlap — extend the current block to cover both. If the next meeting starts after the current one ends, it's a separate block. By the end, you have the minimum set of non-overlapping time blocks.",
      keyPoints: [
        "Sort intervals by start time first — O(n log n)",
        "Iterate: compare current interval with last merged interval",
        "Overlap condition: current.start <= lastMerged.end",
        "If overlapping: extend end to max(lastMerged.end, current.end)",
        "If not overlapping: push current as new merged interval",
        "O(n log n) time (sorting dominates), O(n) space for result",
        "Edge case: single interval, already sorted, fully nested intervals",
        "LeetCode 56: https://leetcode.com/problems/merge-intervals/",
      ],
      timeComplexity: "O(n log n) — sorting dominates",
      spaceComplexity: "O(n) — for the merged result array",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Merge Intervals (LeetCode 56) =====

function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const curr = intervals[i];

    if (curr[0] <= last[1]) {
      // Overlapping — extend the end
      last[1] = Math.max(last[1], curr[1]);
    } else {
      // Non-overlapping — push new interval
      merged.push(curr);
    }
  }
  return merged;
}

// ── Test cases ──────────────────────────────────
console.log("Input: [[1,3],[2,6],[8,10],[15,18]]");
console.log("Output:", JSON.stringify(merge([[1,3],[2,6],[8,10],[15,18]])));
// [[1,6],[8,10],[15,18]]

console.log("\\nInput: [[1,4],[4,5]]");
console.log("Output:", JSON.stringify(merge([[1,4],[4,5]])));
// [[1,5]]

console.log("\\nInput: [[1,4],[0,4]]");
console.log("Output:", JSON.stringify(merge([[1,4],[0,4]])));
// [[0,4]]

// ── Step-by-step trace ──────────────────────────
console.log("\\n--- Step-by-step trace ---");
function mergeVerbose(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  console.log("Sorted:", JSON.stringify(intervals));
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const curr = intervals[i];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
      console.log(\`  [\${curr}] overlaps [\${last[0]},\${last[1]}] → merge to [\${last}]\`);
    } else {
      merged.push(curr);
      console.log(\`  [\${curr}] no overlap → add new interval\`);
    }
  }
  console.log("Result:", JSON.stringify(merged));
  return merged;
}
mergeVerbose([[1,3],[2,6],[8,10],[15,18]]);
`,
    },
    interviewQuestions: [
      {
        question: "Merge all overlapping intervals.",
        difficulty: "Easy",
        hint: "Sort by start time. Iterate and compare with last merged: if overlapping, extend end; otherwise push new interval.",
      },
      {
        question: "Insert a new interval into a sorted non-overlapping list and merge (LeetCode 57).",
        difficulty: "Medium",
        hint: "Three phases: (1) add all intervals ending before new interval starts, (2) merge all overlapping intervals with the new one, (3) add remaining intervals. Or just push the new interval, re-sort, and use the standard merge.",
      },
      {
        question: "Given a list of meetings, find the minimum number of conference rooms needed (LeetCode 253).",
        difficulty: "Hard",
        hint: "Separate starts and ends into two sorted arrays. Use two pointers: if next event is a start, increment rooms; if it's an end, decrement. Track the maximum rooms needed at any point.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Practice Problems — batch 3
  // ─────────────────────────────────────────────
  {
    id: "maximum-average-subarray",
    title: "Maximum Average Subarray I",
    slug: "maximum-average-subarray",
    icon: "BarChart3",
    difficulty: "Beginner",
    description:
      "Find a contiguous subarray of length k that has the maximum average value. LeetCode 643.",
    leetcodeLink: "https://leetcode.com/problems/maximum-average-subarray-i/",
    concept: {
      explanation:
        "Given an integer array nums and an integer k, find the contiguous subarray of length k that has the maximum average value. Instead of recalculating the sum from scratch for each window position, use the sliding window technique: compute the sum of the first k elements, then slide the window by adding the next element and removing the element that just left the window. Track the maximum sum seen so far and divide by k at the end.",
      realLifeAnalogy:
        "Imagine you run a café and track daily sales. You want the best consecutive 4-day period. Rather than re-adding 4 numbers every time, you keep a running total — when a new day enters the window, add its sales; when an old day drops off, subtract it. You always know the current 4-day total instantly.",
      keyPoints: [
        "Sliding window avoids O(n·k) brute force by reusing the previous sum",
        "Initialize window sum with the first k elements",
        "Slide: windowSum = windowSum + nums[i] - nums[i - k]",
        "Track maxSum separately; answer = maxSum / k",
        "LeetCode 643: https://leetcode.com/problems/maximum-average-subarray-i/",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Maximum Average Subarray I (LeetCode 643) =====

function findMaxAverage(nums, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += nums[i];
  let maxSum = windowSum;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum / k;
}

// ── Example ──
console.log(findMaxAverage([1,12,-5,-6,50,3], 4)); // 12.75

// ── Step-by-step trace ──
function findMaxAverageVerbose(nums, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += nums[i];
  console.log(\`Initial window [0..\${k-1}] sum = \${windowSum}\`);
  let maxSum = windowSum;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    console.log(\`Slide to [\${i-k+1}..\${i}]: +\${nums[i]} -\${nums[i-k]} → sum=\${windowSum}\`);
    maxSum = Math.max(maxSum, windowSum);
  }
  console.log(\`Max average = \${maxSum} / \${k} = \${maxSum/k}\`);
  return maxSum / k;
}
findMaxAverageVerbose([1,12,-5,-6,50,3], 4);
`,
    },
    interviewQuestions: [
      {
        question: "Find the maximum average of any subarray of length k.",
        difficulty: "Easy",
        hint: "Sliding window: compute sum of first k elements, then slide by adding/removing one element at a time. Track the max sum.",
      },
      {
        question: "Find the smallest subarray with sum >= target (LeetCode 209).",
        difficulty: "Medium",
        hint: "Variable-length sliding window: expand right to increase sum, shrink left while sum >= target, track minimum length.",
      },
      {
        question: "Longest substring without repeating characters (LeetCode 3).",
        difficulty: "Hard",
        hint: "Sliding window with a Set or Map. Expand right; if duplicate found, shrink left until no duplicate. Track max window size.",
      },
    ],
  },
  {
    id: "move-zeroes",
    title: "Move Zeroes",
    slug: "move-zeroes",
    icon: "ArrowRight",
    difficulty: "Beginner",
    description:
      "Move all zeroes to the end of the array while maintaining relative order of non-zero elements. LeetCode 283.",
    leetcodeLink: "https://leetcode.com/problems/move-zeroes/",
    concept: {
      explanation:
        "Use two pointers: a write pointer (writePos) tracks where the next non-zero should go, and a scan pointer (i) walks through the array. When nums[i] is non-zero, swap it with nums[writePos] and advance both. When nums[i] is zero, only advance i. After one pass all non-zero elements are in front in original order and all zeroes are at the end.",
      realLifeAnalogy:
        "Imagine a line of people where some hold empty boxes (zeroes). A manager walks down the line: every time they find someone with a real item, they wave that person to the front of the 'valid' section. Empty-box holders drift to the back naturally.",
      keyPoints: [
        "Two-pointer / read-write approach — same pattern as Remove Element",
        "writePos stays at the first zero (or next write position)",
        "Swap ensures non-zero order is preserved",
        "Single pass, in-place, stable",
        "LeetCode 283: https://leetcode.com/problems/move-zeroes/",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Move Zeroes (LeetCode 283) =====

function moveZeroes(nums) {
  let writePos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[writePos], nums[i]] = [nums[i], nums[writePos]];
      writePos++;
    }
  }
  return nums;
}

// ── Example ──
console.log(JSON.stringify(moveZeroes([0,1,0,3,12]))); // [1,3,12,0,0]

// ── Step-by-step trace ──
function moveZeroesVerbose(nums) {
  let writePos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[writePos], nums[i]] = [nums[i], nums[writePos]];
      console.log(\`swap(\${writePos},\${i}) → [\${nums}] writePos=\${writePos+1}\`);
      writePos++;
    } else {
      console.log(\`nums[\${i}]=0 → skip, writePos stays \${writePos}\`);
    }
  }
  console.log("Result:", JSON.stringify(nums));
  return nums;
}
moveZeroesVerbose([0,1,0,3,12]);
`,
    },
    interviewQuestions: [
      {
        question: "Move all zeroes to the end while maintaining order of non-zero elements.",
        difficulty: "Easy",
        hint: "Two pointers: writePos for next non-zero position, i scans. Swap nums[writePos] and nums[i] when non-zero.",
      },
      {
        question: "Remove Element in-place (LeetCode 27).",
        difficulty: "Easy",
        hint: "Same two-pointer pattern but skip elements equal to val instead of zero.",
      },
      {
        question: "Sort an array of 0s, 1s, and 2s in-place (Dutch National Flag).",
        difficulty: "Medium",
        hint: "Three pointers: low, mid, high. Swap 0s to low, 2s to high, 1s stay in middle.",
      },
    ],
  },
  {
    id: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    slug: "longest-consecutive-sequence",
    icon: "Link",
    difficulty: "Intermediate",
    description:
      "Find the length of the longest consecutive elements sequence in an unsorted array. LeetCode 128.",
    leetcodeLink: "https://leetcode.com/problems/longest-consecutive-sequence/",
    concept: {
      explanation:
        "Put all numbers into a Set for O(1) lookup. For each number, check if it's the start of a sequence (num - 1 is NOT in the set). If it is, count consecutive numbers (num+1, num+2, …) that exist in the set. Track the longest streak found. This runs in O(n) because each number is visited at most twice.",
      realLifeAnalogy:
        "Imagine numbered puzzle pieces scattered on a table. You pick up a piece and check: is there a piece numbered one less? If not, you're at the start of a chain. Then you look for the next number, and the next, building the chain until it breaks. You record the chain length and move on. The Set is like having all pieces face-up so you can instantly spot any number.",
      keyPoints: [
        "Use a HashSet for O(1) contains checks",
        "Only start counting from sequence heads (num - 1 not in set)",
        "This avoids O(n²) — each element is part of exactly one chain",
        "Alternative: sort first in O(n log n) and scan for consecutive runs",
        "LeetCode 128: https://leetcode.com/problems/longest-consecutive-sequence/",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(n) — for the Set",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Longest Consecutive Sequence (LeetCode 128) =====

function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longest = 0;
  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let current = num;
      let streak = 1;
      while (numSet.has(current + 1)) {
        current++;
        streak++;
      }
      longest = Math.max(longest, streak);
    }
  }
  return longest;
}

// ── Example ──
console.log(longestConsecutive([100,4,200,1,3,2])); // 4

// ── Step-by-step trace ──
function longestConsecutiveVerbose(nums) {
  const numSet = new Set(nums);
  console.log("Set:", [...numSet]);
  let longest = 0;
  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let current = num, streak = 1;
      while (numSet.has(current + 1)) { current++; streak++; }
      console.log(\`Sequence start \${num} → length \${streak}\`);
      longest = Math.max(longest, streak);
    } else {
      console.log(\`\${num}: \${num-1} exists → skip (not a start)\`);
    }
  }
  console.log("Longest:", longest);
  return longest;
}
longestConsecutiveVerbose([100,4,200,1,3,2]);
`,
    },
    interviewQuestions: [
      {
        question: "Find the length of the longest consecutive sequence in O(n).",
        difficulty: "Easy",
        hint: "Put all into a Set. For each num where num-1 is not in set, count forward. Track max streak.",
      },
      {
        question: "Can you solve it without extra space (O(1) space)?",
        difficulty: "Medium",
        hint: "Sort the array in O(n log n), then walk through counting consecutive unique elements. Time becomes O(n log n).",
      },
      {
        question: "Find the longest consecutive sequence and return the actual sequence, not just length.",
        difficulty: "Medium",
        hint: "Same approach but also record the starting number of the best streak. Then generate start..start+length-1.",
      },
    ],
  },
  {
    id: "two-sum",
    title: "Two Sum",
    slug: "two-sum",
    icon: "PlusCircle",
    difficulty: "Beginner",
    description:
      "Find two numbers in an array that add up to a target. Return their indices. LeetCode 1.",
    leetcodeLink: "https://leetcode.com/problems/two-sum/",
    concept: {
      explanation:
        "Use a hash map to store each number's index as you iterate. For each element, compute the complement (target - nums[i]) and check if it already exists in the map. If it does, you've found the pair. If not, store the current number and its index. This gives O(n) time with a single pass.",
      realLifeAnalogy:
        "You're at a party looking for someone whose age plus yours equals 100. Instead of asking everyone twice, you keep a guest list as people arrive. When a new guest walks in, you check the list for someone whose age is (100 - new guest's age). If found, you have your pair instantly.",
      keyPoints: [
        "Hash map stores {value → index} for O(1) complement lookup",
        "Single pass: check complement first, then store current",
        "Brute force is O(n²) — nested loops checking all pairs",
        "If the array is sorted, two-pointer approach also works in O(n)",
        "LeetCode 1: https://leetcode.com/problems/two-sum/",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(n) — for the hash map",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Two Sum (LeetCode 1) =====

function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// ── Example ──
console.log(JSON.stringify(twoSum([2,7,11,15], 9))); // [0, 1]

// ── Step-by-step trace ──
function twoSumVerbose(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    console.log(\`i=\${i}: nums[\${i}]=\${nums[i]}, need \${complement}\`);
    if (map.has(complement)) {
      console.log(\`  Found! map[\${complement}]=\${map.get(complement)} → [\${map.get(complement)}, \${i}]\`);
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
    console.log(\`  Not found. Map: {\${[...map.entries()].map(e=>e[0]+':'+e[1]).join(', ')}}\`);
  }
  return [];
}
twoSumVerbose([2,7,11,15], 9);
`,
    },
    interviewQuestions: [
      {
        question: "Find two numbers that add up to a target and return their indices.",
        difficulty: "Easy",
        hint: "Hash map: for each num, check if (target - num) is in the map. If yes, return both indices.",
      },
      {
        question: "What if the array is sorted? Can you solve it in O(1) space?",
        difficulty: "Medium",
        hint: "Two pointers from both ends. If sum < target, move left pointer right. If sum > target, move right pointer left.",
      },
      {
        question: "Find all unique pairs that sum to target (no duplicates).",
        difficulty: "Medium",
        hint: "Sort + two pointers. After finding a pair, skip duplicate values on both sides.",
      },
    ],
  },
  {
    id: "find-disappeared-numbers",
    title: "Find All Disappeared Numbers",
    slug: "find-disappeared-numbers",
    icon: "Search",
    difficulty: "Beginner",
    description:
      "Find all numbers in [1, n] missing from an array of n integers. LeetCode 448.",
    leetcodeLink: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
    concept: {
      explanation:
        "Use the array itself as a hash table. For each number nums[i], mark the element at index (|nums[i]| - 1) as negative. After marking, any index that still has a positive value means (index + 1) was never present in the array. This avoids extra space beyond the result array.",
      realLifeAnalogy:
        "Imagine numbered lockers 1 through n. Students are assigned locker numbers but some lockers are assigned to multiple students while others are skipped. Walk through the roster: for each assigned number, flip that locker's light on. After processing, any locker with its light still off was never assigned — those are your missing numbers.",
      keyPoints: [
        "Use the sign of array elements as markers — negative = present",
        "Index mapping: number v maps to index |v| - 1",
        "Second pass collects indices that are still positive → missing numbers",
        "O(n) time, O(1) extra space (not counting output)",
        "LeetCode 448: https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) extra (output not counted)",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Find All Disappeared Numbers (LeetCode 448) =====

function findDisappearedNumbers(nums) {
  for (let i = 0; i < nums.length; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) nums[idx] = -nums[idx];
  }
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) result.push(i + 1);
  }
  return result;
}

// ── Example ──
console.log(JSON.stringify(findDisappearedNumbers([4,3,2,7,8,2,3,1]))); // [5, 6]

// ── Step-by-step trace ──
function findDisappearedVerbose(nums) {
  console.log("Input:", [...nums]);
  for (let i = 0; i < nums.length; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) {
      nums[idx] = -nums[idx];
      console.log(\`Mark index \${idx} negative → [\${nums}]\`);
    } else {
      console.log(\`Index \${idx} already marked\`);
    }
  }
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) result.push(i + 1);
  }
  console.log("Missing:", result);
  return result;
}
findDisappearedVerbose([4,3,2,7,8,2,3,1]);
`,
    },
    interviewQuestions: [
      {
        question: "Find all missing numbers from [1, n] in O(n) time and O(1) extra space.",
        difficulty: "Easy",
        hint: "Negate the value at index |nums[i]|-1. After marking, positive indices reveal missing numbers.",
      },
      {
        question: "Find the single missing number from [0, n] (LeetCode 268).",
        difficulty: "Easy",
        hint: "Use Gauss formula: expected = n*(n+1)/2, subtract actual sum.",
      },
      {
        question: "Find all duplicates in the array (LeetCode 442) using the same marking trick.",
        difficulty: "Medium",
        hint: "Same negative-marking approach. If nums[|val|-1] is already negative when you visit val, then val is a duplicate.",
      },
    ],
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    slug: "container-with-most-water",
    icon: "Droplets",
    difficulty: "Intermediate",
    description:
      "Find two lines that together with the x-axis form a container holding the most water. LeetCode 11.",
    leetcodeLink: "https://leetcode.com/problems/container-with-most-water/",
    concept: {
      explanation:
        "Use two pointers starting at the leftmost and rightmost lines. Compute the area formed between them: min(height[left], height[right]) × (right - left). Then move the pointer pointing to the shorter line inward, because moving the taller line can never increase the area (the width decreases and the height is limited by the shorter side). Repeat until the pointers meet.",
      realLifeAnalogy:
        "Imagine two walls at opposite ends of a yard with water between them. The water level is limited by the shorter wall. If you could slide the walls inward, you'd always move the shorter wall — keeping the taller wall fixed can't help because the shorter wall still limits the water level, and you're losing width.",
      keyPoints: [
        "Two pointers from both ends, moving inward",
        "Area = min(height[L], height[R]) × (R - L)",
        "Always move the shorter side — moving the taller side can only decrease or maintain area",
        "Greedy approach is optimal because we start with maximum width",
        "LeetCode 11: https://leetcode.com/problems/container-with-most-water/",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Container With Most Water (LeetCode 11) =====

function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxWater = 0;
  while (left < right) {
    const w = right - left;
    const h = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, w * h);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxWater;
}

// ── Example ──
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49

// ── Step-by-step trace ──
function maxAreaVerbose(height) {
  let left = 0, right = height.length - 1, maxWater = 0;
  while (left < right) {
    const w = right - left;
    const h = Math.min(height[left], height[right]);
    const area = w * h;
    maxWater = Math.max(maxWater, area);
    console.log(\`L=\${left}(h=\${height[left]}) R=\${right}(h=\${height[right]}) → area=\${w}×\${h}=\${area} max=\${maxWater}\`);
    if (height[left] < height[right]) left++;
    else right--;
  }
  console.log("Max area:", maxWater);
  return maxWater;
}
maxAreaVerbose([1,8,6,2,5,4,8,3,7]);
`,
    },
    interviewQuestions: [
      {
        question: "Find two lines forming a container with the most water.",
        difficulty: "Easy",
        hint: "Two pointers from ends. Area = min(heights) × width. Move the shorter side inward.",
      },
      {
        question: "Why does moving the shorter line guarantee we don't miss the optimal?",
        difficulty: "Medium",
        hint: "Moving the taller line can only decrease or maintain area (width shrinks, height stays limited by the shorter line). So skipping those states is safe.",
      },
      {
        question: "Trapping Rain Water (LeetCode 42) — similar but different.",
        difficulty: "Hard",
        hint: "Two pointers with leftMax and rightMax. Water at each position = min(leftMax, rightMax) - height[i]. Process from the side with the smaller max.",
      },
    ],
  },
  {
    id: "flood-fill",
    title: "Flood Fill",
    slug: "flood-fill",
    icon: "Paintbrush",
    difficulty: "Beginner",
    description:
      "Perform a flood fill on an image starting from a given pixel. LeetCode 733.",
    leetcodeLink: "https://leetcode.com/problems/flood-fill/",
    concept: {
      explanation:
        "Starting from pixel (sr, sc), change its color to newColor and recursively do the same for all 4-directionally connected pixels that share the same original color. This is essentially a DFS or BFS on a grid. Base cases: out of bounds, already the new color, or different from the original color.",
      realLifeAnalogy:
        "Think of the paint bucket tool in an image editor. Click on a pixel and it fills all connected same-colored pixels with the new color. It spreads in four directions (up, down, left, right) and stops at borders where the color is different.",
      keyPoints: [
        "DFS/BFS on a 2D grid — classic graph traversal on implicit graph",
        "Base cases: out of bounds, wrong color, already painted",
        "If startColor === newColor, return immediately (avoid infinite loop)",
        "4-directional connectivity (up, down, left, right)",
        "LeetCode 733: https://leetcode.com/problems/flood-fill/",
      ],
      timeComplexity: "O(m × n) — each pixel visited at most once",
      spaceComplexity: "O(m × n) — recursion stack in worst case",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Flood Fill (LeetCode 733) =====

function floodFill(image, sr, sc, color) {
  const startColor = image[sr][sc];
  if (startColor === color) return image;

  function dfs(r, c) {
    if (r < 0 || r >= image.length) return;
    if (c < 0 || c >= image[0].length) return;
    if (image[r][c] !== startColor) return;
    image[r][c] = color;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  dfs(sr, sc);
  return image;
}

// ── Example ──
const img = [[1,1,1],[1,1,0],[1,0,1]];
console.log(JSON.stringify(floodFill(img, 1, 1, 2)));
// [[2,2,2],[2,2,0],[2,0,1]]

// ── Step-by-step trace ──
function floodFillVerbose(image, sr, sc, color) {
  const startColor = image[sr][sc];
  if (startColor === color) return image;
  function dfs(r, c) {
    if (r < 0 || r >= image.length || c < 0 || c >= image[0].length) return;
    if (image[r][c] !== startColor) return;
    image[r][c] = color;
    console.log(\`Fill (\${r},\${c}) → \${color}  grid: [\${image.map(r=>r.join(",")).join(" | ")}]\`);
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  dfs(sr, sc);
  return image;
}
floodFillVerbose([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2);
`,
    },
    interviewQuestions: [
      {
        question: "Perform flood fill from a starting pixel.",
        difficulty: "Easy",
        hint: "DFS/BFS from (sr, sc). Change color if same as start. Check bounds and avoid revisiting.",
      },
      {
        question: "Number of Islands (LeetCode 200).",
        difficulty: "Medium",
        hint: "Iterate grid. When you find a '1', run flood fill to mark all connected '1's as visited. Count how many times you start a fill.",
      },
      {
        question: "Surrounded Regions (LeetCode 130).",
        difficulty: "Medium",
        hint: "Flood fill from border 'O's to mark them safe. Then flip remaining 'O's to 'X'.",
      },
    ],
  },
  {
    id: "island-perimeter",
    title: "Island Perimeter",
    slug: "island-perimeter",
    icon: "Square",
    difficulty: "Beginner",
    description:
      "Calculate the perimeter of a single island in a grid. LeetCode 463.",
    leetcodeLink: "https://leetcode.com/problems/island-perimeter/",
    concept: {
      explanation:
        "For each land cell (value 1), it contributes 4 edges. But for each adjacent land cell (up, down, left, right), one edge is shared — subtract 1 per adjacent land neighbor. Alternatively, count edges that touch water or the grid boundary. Single pass through the grid.",
      realLifeAnalogy:
        "Imagine a Lego island built on a blue baseplate. Each 1×1 block has 4 sides. When two blocks are next to each other, their touching sides are interior walls, not perimeter. Walk around the island — the perimeter is the total number of exposed edges.",
      keyPoints: [
        "Each land cell contributes 4 minus (number of land neighbors)",
        "Or: for each land cell, add 1 for each side that faces water or boundary",
        "No DFS/BFS needed — simple iteration works since there's one island",
        "Grid boundary counts as water",
        "LeetCode 463: https://leetcode.com/problems/island-perimeter/",
      ],
      timeComplexity: "O(m × n)",
      spaceComplexity: "O(1)",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Island Perimeter (LeetCode 463) =====

function islandPerimeter(grid) {
  let perimeter = 0;
  const rows = grid.length, cols = grid[0].length;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        perimeter += 4;
        if (r > 0 && grid[r-1][c] === 1) perimeter -= 2;
        if (c > 0 && grid[r][c-1] === 1) perimeter -= 2;
      }
    }
  }
  return perimeter;
}

// ── Example ──
const grid = [
  [0,1,0,0],
  [1,1,1,0],
  [0,1,0,0],
  [1,1,0,0]
];
console.log(islandPerimeter(grid)); // 16

// ── Step-by-step trace ──
function islandPerimeterVerbose(grid) {
  let perimeter = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 1) {
        let edges = 4;
        if (r > 0 && grid[r-1][c] === 1) edges -= 2;
        if (c > 0 && grid[r][c-1] === 1) edges -= 2;
        perimeter += edges;
        console.log(\`(\${r},\${c}): +\${edges} edges → perimeter=\${perimeter}\`);
      }
    }
  }
  console.log("Total perimeter:", perimeter);
  return perimeter;
}
islandPerimeterVerbose(grid);
`,
    },
    interviewQuestions: [
      {
        question: "Calculate the perimeter of a single island.",
        difficulty: "Easy",
        hint: "Each land cell = 4 edges. Subtract 2 for each pair of adjacent land cells (they share a wall).",
      },
      {
        question: "Max area of an island (LeetCode 695).",
        difficulty: "Medium",
        hint: "DFS/BFS from each unvisited land cell, counting cells. Track maximum area found.",
      },
      {
        question: "Number of distinct islands (LeetCode 694).",
        difficulty: "Hard",
        hint: "DFS each island, record the shape as a normalized set of relative coordinates. Use a Set of serialized shapes.",
      },
    ],
  },
  {
    id: "spiral-matrix",
    title: "Spiral Matrix",
    slug: "spiral-matrix",
    icon: "RotateCw",
    difficulty: "Intermediate",
    description:
      "Return all elements of a matrix in spiral order. LeetCode 54.",
    leetcodeLink: "https://leetcode.com/problems/spiral-matrix/",
    concept: {
      explanation:
        "Use four boundaries: top, bottom, left, right. Traverse right along the top row, then down the right column, then left along the bottom row, then up the left column. After each traversal, shrink the corresponding boundary. Continue until all elements are visited.",
      realLifeAnalogy:
        "Imagine mowing a rectangular lawn in a spiral pattern. Start along the top edge going right, turn down the right side, then left along the bottom, then up the left side. Each pass mows one outer ring, and the remaining unmowed area shrinks inward until everything is cut.",
      keyPoints: [
        "Four boundaries: top, bottom, left, right — shrink after each pass",
        "Four traversals per layer: right → down → left → up",
        "Check boundary validity before each traversal (handles non-square matrices)",
        "Result array grows to m × n elements total",
        "LeetCode 54: https://leetcode.com/problems/spiral-matrix/",
      ],
      timeComplexity: "O(m × n)",
      spaceComplexity: "O(1) extra (output not counted)",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Spiral Matrix (LeetCode 54) =====

function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
      left++;
    }
  }
  return result;
}

// ── Example ──
console.log(JSON.stringify(spiralOrder([[1,2,3],[4,5,6],[7,8,9]])));
// [1,2,3,6,9,8,7,4,5]

// ── Step-by-step trace ──
function spiralVerbose(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);
    console.log(\`→ top row \${top}: [\${result}]\`);
    top++;
    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
    console.log(\`↓ right col \${right}: [\${result}]\`);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
      console.log(\`← bottom row \${bottom}: [\${result}]\`);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
      console.log(\`↑ left col \${left}: [\${result}]\`);
      left++;
    }
  }
  console.log("Spiral:", result);
  return result;
}
spiralVerbose([[1,2,3],[4,5,6],[7,8,9]]);
`,
    },
    interviewQuestions: [
      {
        question: "Return all elements of a matrix in spiral order.",
        difficulty: "Easy",
        hint: "Use four boundaries (top/bottom/left/right). Traverse each edge, then shrink the boundary.",
      },
      {
        question: "Generate an n × n matrix filled with elements 1 to n² in spiral order (LeetCode 59).",
        difficulty: "Medium",
        hint: "Same boundary approach but instead of reading, write values 1, 2, 3… into the matrix.",
      },
      {
        question: "Rotate a matrix 90° clockwise in-place (LeetCode 48).",
        difficulty: "Medium",
        hint: "Transpose the matrix (swap matrix[i][j] with matrix[j][i]), then reverse each row.",
      },
    ],
  },
  {
    id: "can-place-flowers",
    title: "Can Place Flowers",
    slug: "can-place-flowers",
    icon: "Flower2",
    difficulty: "Beginner",
    description:
      "Determine if n new flowers can be planted in a flowerbed without violating no-adjacent-flowers rule. LeetCode 605.",
    leetcodeLink: "https://leetcode.com/problems/can-place-flowers/",
    concept: {
      explanation:
        "Scan the flowerbed left to right. At each empty plot (0), check if both neighbors are also empty (or the plot is at the boundary). If so, plant a flower (set to 1) and decrement n. Return true when n reaches 0. This greedy approach works because planting as early as possible never blocks a later valid placement.",
      realLifeAnalogy:
        "Imagine a row of chairs at a social-distancing event — every other chair must stay empty. Walk along the row: if a chair is empty and neither neighbor is taken, sit down. Greedy seating from left to right fills the maximum number of valid spots.",
      keyPoints: [
        "Greedy: plant at the first valid spot and continue",
        "A spot is valid if: flowerbed[i] === 0, left neighbor is 0 or boundary, right neighbor is 0 or boundary",
        "Modify in-place (set to 1) so future checks see the planted flower",
        "Early return once n <= 0",
        "LeetCode 605: https://leetcode.com/problems/can-place-flowers/",
      ],
      timeComplexity: "O(n) — single pass through the flowerbed",
      spaceComplexity: "O(1)",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Can Place Flowers (LeetCode 605) =====

function canPlaceFlowers(flowerbed, n) {
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0) {
      const leftEmpty = i === 0 || flowerbed[i - 1] === 0;
      const rightEmpty = i === flowerbed.length - 1 || flowerbed[i + 1] === 0;
      if (leftEmpty && rightEmpty) {
        flowerbed[i] = 1;
        n--;
        if (n <= 0) return true;
      }
    }
  }
  return n <= 0;
}

// ── Example ──
console.log(canPlaceFlowers([1,0,0,0,1], 1)); // true
console.log(canPlaceFlowers([1,0,0,0,1], 2)); // false

// ── Step-by-step trace ──
function canPlaceVerbose(flowerbed, n) {
  const fb = [...flowerbed];
  for (let i = 0; i < fb.length; i++) {
    if (fb[i] === 0) {
      const leftOk = i === 0 || fb[i-1] === 0;
      const rightOk = i === fb.length-1 || fb[i+1] === 0;
      if (leftOk && rightOk) {
        fb[i] = 1; n--;
        console.log(\`Plant at \${i} → [\${fb}] remaining=\${n}\`);
        if (n <= 0) { console.log("Done!"); return true; }
      } else {
        console.log(\`Skip \${i}: neighbor occupied\`);
      }
    }
  }
  console.log(n <= 0 ? "Can place all" : "Not enough room");
  return n <= 0;
}
canPlaceVerbose([1,0,0,0,1], 1);
`,
    },
    interviewQuestions: [
      {
        question: "Can n flowers be planted without adjacent planting?",
        difficulty: "Easy",
        hint: "Greedy scan: if current and both neighbors are empty, plant and decrement n.",
      },
      {
        question: "What if the flowerbed is circular (first and last are neighbors)?",
        difficulty: "Medium",
        hint: "Handle wrap-around: treat index 0's left neighbor as the last element and vice versa.",
      },
      {
        question: "Maximum number of flowers that can be planted?",
        difficulty: "Easy",
        hint: "Same greedy — just count how many times you can plant instead of comparing to n.",
      },
    ],
  },
  {
    id: "majority-element",
    title: "Majority Element (Boyer-Moore)",
    slug: "majority-element",
    icon: "Crown",
    difficulty: "Beginner",
    description:
      "Find the element that appears more than n/2 times. LeetCode 169.",
    leetcodeLink: "https://leetcode.com/problems/majority-element/",
    concept: {
      explanation:
        "Boyer-Moore Voting Algorithm: maintain a candidate and a count. Walk through the array: if count is 0, set the current element as candidate. If the current element equals the candidate, increment count; otherwise decrement. The majority element always survives because it appears more than n/2 times — it can't be fully 'cancelled out' by other elements.",
      realLifeAnalogy:
        "Imagine an election where one candidate has more than half the votes. Pair up voters who voted differently and send both home. After all cancellations, the remaining group must be the majority — because there are simply more of them than everyone else combined.",
      keyPoints: [
        "Boyer-Moore Voting: O(n) time, O(1) space",
        "Candidate changes only when count drops to 0",
        "Works only when a majority element is guaranteed to exist (> n/2)",
        "Alternative: sort and pick middle element — O(n log n)",
        "LeetCode 169: https://leetcode.com/problems/majority-element/",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Majority Element (LeetCode 169) =====

function majorityElement(nums) {
  let candidate = nums[0];
  let count = 0;
  for (const num of nums) {
    if (count === 0) candidate = num;
    count += num === candidate ? 1 : -1;
  }
  return candidate;
}

// ── Example ──
console.log(majorityElement([2,2,1,1,1,2,2])); // 2

// ── Step-by-step trace ──
function majorityVerbose(nums) {
  let candidate = nums[0], count = 0;
  for (const num of nums) {
    if (count === 0) { candidate = num; console.log(\`Count=0 → new candidate: \${num}\`); }
    count += num === candidate ? 1 : -1;
    console.log(\`  num=\${num} candidate=\${candidate} count=\${count}\`);
  }
  console.log("Majority:", candidate);
  return candidate;
}
majorityVerbose([2,2,1,1,1,2,2]);
`,
    },
    interviewQuestions: [
      {
        question: "Find the majority element (appears > n/2 times).",
        difficulty: "Easy",
        hint: "Boyer-Moore Voting: track candidate and count. When count=0, switch candidate. Increment for match, decrement otherwise.",
      },
      {
        question: "Find elements appearing more than n/3 times (LeetCode 229).",
        difficulty: "Medium",
        hint: "Extended Boyer-Moore with two candidates and two counts. At most 2 elements can appear > n/3 times. Verify candidates with a second pass.",
      },
      {
        question: "What if no majority element is guaranteed? How do you verify?",
        difficulty: "Medium",
        hint: "Run Boyer-Moore to find a candidate, then do a second pass to count its occurrences. Return it only if count > n/2.",
      },
    ],
  },
  {
    id: "three-sum",
    title: "3Sum",
    slug: "three-sum",
    icon: "Triangle",
    difficulty: "Intermediate",
    description:
      "Find all unique triplets in the array that sum to zero. LeetCode 15.",
    leetcodeLink: "https://leetcode.com/problems/3sum/",
    concept: {
      explanation:
        "Sort the array first. Fix one element (nums[i]), then use two pointers (left = i+1, right = n-1) to find pairs that sum to -nums[i]. Skip duplicates at all three positions to avoid duplicate triplets. The sort enables both the two-pointer technique and easy duplicate skipping.",
      realLifeAnalogy:
        "Imagine balancing a seesaw. You pick one weight (fixed element) and need to find two others from opposite ends of a sorted shelf that balance it to zero. Slide the lighter weight right or heavier weight left until balanced. Skip identical weights to avoid repeating the same combination.",
      keyPoints: [
        "Sort first: enables two-pointer and duplicate skipping",
        "Fix nums[i], find pairs summing to -nums[i] using two pointers",
        "Skip duplicate values for i, left, and right to ensure unique triplets",
        "Early termination: if nums[i] > 0, no valid triplet possible (sorted array)",
        "LeetCode 15: https://leetcode.com/problems/3sum/",
      ],
      timeComplexity: "O(n²) — sort is O(n log n), then O(n) per fixed element",
      spaceComplexity: "O(1) extra (output not counted, sort may use O(log n))",
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== 3Sum (LeetCode 15) =====

function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] > 0) break;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return result;
}

// ── Example ──
console.log(JSON.stringify(threeSum([-1,0,1,2,-1,-4])));
// [[-1,-1,2],[-1,0,1]]

// ── Step-by-step trace ──
function threeSumVerbose(nums) {
  nums.sort((a, b) => a - b);
  console.log("Sorted:", JSON.stringify(nums));
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) { console.log(\`Skip dup i=\${i}\`); continue; }
    if (nums[i] > 0) break;
    let l = i+1, r = nums.length-1;
    while (l < r) {
      const s = nums[i]+nums[l]+nums[r];
      console.log(\`  i=\${i}(\${nums[i]}) L=\${l}(\${nums[l]}) R=\${r}(\${nums[r]}) sum=\${s}\`);
      if (s === 0) {
        result.push([nums[i],nums[l],nums[r]]);
        while (l<r && nums[l]===nums[l+1]) l++;
        while (l<r && nums[r]===nums[r-1]) r--;
        l++; r--;
      } else if (s < 0) l++;
      else r--;
    }
  }
  console.log("Triplets:", JSON.stringify(result));
  return result;
}
threeSumVerbose([-1,0,1,2,-1,-4]);
`,
    },
    interviewQuestions: [
      {
        question: "Find all unique triplets that sum to zero.",
        difficulty: "Easy",
        hint: "Sort, fix one element, two pointers for the other two. Skip duplicates.",
      },
      {
        question: "4Sum — find all unique quadruplets summing to target (LeetCode 18).",
        difficulty: "Medium",
        hint: "Add another outer loop: fix two elements, then two-pointer for the remaining pair. O(n³).",
      },
      {
        question: "3Sum Closest — find triplet with sum closest to target (LeetCode 16).",
        difficulty: "Medium",
        hint: "Same sort + fix + two-pointer approach. Track the minimum |sum - target| seen.",
      },
    ],
  },

];

export const dsaModules: DSAModule[] = [
  {
    id: "js-foundations",
    level: 1,
    title: "JavaScript Foundations",
    difficulty: "Beginner",
    description: "Core language primitives required before writing any algorithm.",
    topicIds: ["variables-and-data-types", "operators", "loops", "functions"],
  },
  {
    id: "complexity",
    level: 2,
    title: "Complexity Analysis",
    difficulty: "Beginner",
    description: "The vocabulary needed to evaluate every algorithm you write.",
    topicIds: ["time-complexity"],
  },
  {
    id: "arrays-strings",
    level: 3,
    title: "Arrays & Strings",
    difficulty: "Beginner",
    description: "The two most interview-frequent data structures.",
    topicIds: ["arrays", "strings"],
  },
  {
    id: "hashing",
    level: 4,
    title: "Hashing",
    difficulty: "Intermediate",
    description: "O(1) lookup structures and classic hash-map patterns.",
    topicIds: ["objects", "map", "set", "objects-vs-map", "weakmap"],
  },
  {
    id: "searching",
    level: 5,
    title: "Searching Algorithms",
    difficulty: "Intermediate",
    description: "Linear scan as baseline; binary search on sorted data.",
    topicIds: ["linear-search", "binary-search"],
  },
  {
    id: "sorting",
    level: 6,
    title: "Sorting Algorithms",
    difficulty: "Intermediate",
    description: "From naive O(n²) sorts to divide-and-conquer O(n log n).",
    topicIds: [
      "bubble-sort",
      "selection-sort",
      "insertion-sort",
      "merge-sort",
      "quick-sort",
    ],
  },
  {
    id: "linked-lists",
    level: 7,
    title: "Linked Lists",
    difficulty: "Intermediate",
    description: "Pointer-based linear structure — build, traverse, detect, mutate.",
    topicIds: ["linked-list", "middle-linked-list", "linked-list-cycle"],
  },
  {
    id: "stacks",
    level: 8,
    title: "Stacks",
    difficulty: "Intermediate",
    description: "LIFO structure implemented two ways, plus a canonical application.",
    topicIds: ["stack-array", "stack-linked-list"],
  },
  {
    id: "queues",
    level: 9,
    title: "Queues",
    difficulty: "Intermediate",
    description: "FIFO structure in four flavours — array, linked list, circular, two-stack.",
    topicIds: ["queue-array", "queue-linked-list", "circular-queue", "queue-using-stack"],
  },
  {
    id: "trees",
    level: 10,
    title: "Binary Trees",
    difficulty: "Advanced",
    description: "Hierarchical recursive structure — traversals, BST, and hard problems.",
    topicIds: [
      "binary-tree-basics",
      "tree-traversals",
      "binary-search-tree",
      "diameter-binary-tree",
      "lowest-common-ancestor",
      "maximum-path-sum",
    ],
  },
  {
    id: "graphs",
    level: 11,
    title: "Graphs",
    difficulty: "Advanced",
    description: "Networks as vertices + edges — traversal, cycles, shortest paths.",
    topicIds: [
      "graph-representation",
      "graph-dfs",
      "graph-bfs",
      "cycle-detection",
      "topological-sort",
      "dijkstra",
    ],
  },
  {
    id: "practice-problems",
    level: 12,
    title: "Practice Problems",
    difficulty: "Intermediate",
    description: "Solve popular LeetCode problems covering arrays, strings, hash maps, two pointers, and more.",
    topicIds: ["find-largest-element", "remove-element", "best-time-to-buy-sell-stock", "squares-of-sorted-array", "remove-duplicates-sorted-array", "sort-colors", "running-sum", "find-pivot-index", "subarray-sum-equals-k", "contains-duplicate", "missing-number", "merge-intervals", "maximum-average-subarray", "move-zeroes", "longest-consecutive-sequence", "two-sum", "find-disappeared-numbers", "container-with-most-water", "flood-fill", "island-perimeter", "spiral-matrix", "can-place-flowers", "majority-element", "three-sum"],
  },
  {
    id: "interview-patterns",
    level: 13,
    title: "Interview Patterns",
    difficulty: "Advanced",
    description: "Cross-cutting algorithmic templates and mock interview capstone.",
    topicIds: [],
  },
];
