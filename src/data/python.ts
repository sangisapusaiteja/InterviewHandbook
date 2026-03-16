import type { PythonTopic, PythonModule } from "@/types/python";

export const pythonTopics: PythonTopic[] = [
  // ─── Level 1: Python Fundamentals ──────────────────────────────────────────
  {
    id: "introduction-to-python",
    title: "Introduction to Python",
    slug: "introduction-to-python",
    icon: "Code",
    difficulty: "Beginner",
    description:
      "Understand what Python is, why it is popular, and where it is used — from web development to data science and automation.",
    concept: {
      explanation:
        "Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum and released in 1991. It emphasizes code readability with significant indentation. Python supports procedural, object-oriented, and functional programming. It has a huge standard library and ecosystem (pip/PyPI). Python is dynamically typed, garbage collected, and cross-platform. It is widely used in web development (Django, Flask), data science (pandas, NumPy), machine learning (TensorFlow, PyTorch), and automation. Python 3 is the current version — Python 2 reached end of life in 2020.",
      realLifeAnalogy:
        "If programming languages were vehicles, Python would be an automatic car with GPS. Easy to learn and drive (simple syntax), gets you places quickly (rapid development), and comes loaded with features (standard library). It may not win a race against a sports car (C/C++ in raw speed), but it is the perfect daily driver for most journeys.",
      keyPoints: [
        "Created by Guido van Rossum, first released in 1991",
        "Uses indentation instead of braces for code blocks",
        "Dynamically typed — no need to declare variable types",
        "Interpreted — no compilation step needed",
        "Batteries included — huge standard library",
        "Cross-platform — runs on Windows, macOS, Linux",
        "Used in web dev, data science, ML, automation, and scripting",
        "Python 3 is the current version; Python 2 is end-of-life",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Introduction to Python =====

# Python is known for its simple, readable syntax.

# 1. Output to console
print("Hello, Python!")

# 2. Python can do math
print("2 + 3 =", 2 + 3)
print("10 * 5 =", 10 * 5)
print("2 ** 10 =", 2 ** 10)  # Exponentiation

# 3. Python can work with text
print("Welcome to " + "Python!")

# 4. Python can make decisions
age = 18
if age >= 18:
    print("You are an adult!")
else:
    print("You are a minor!")

# 5. Python uses indentation (not braces)
for i in range(5):
    print(f"Count: {i}")

# 6. Python has built-in data structures
fruits = ["apple", "banana", "cherry"]
print("Fruits:", fruits)

# 7. Python is dynamically typed
x = 10          # x is an int
x = "hello"     # now x is a string
print("x is now:", x, "| type:", type(x).__name__)
`,
    },
    interviewQuestions: [
      {
        question: "What are the key differences between Python 2 and Python 3?",
        difficulty: "Easy",
        hint: "print is a function in Python 3 (print()), a statement in Python 2 (print 'hello'). Integer division: 3/2 = 1.5 in Python 3, 1 in Python 2. Python 3 strings are Unicode by default. range() returns an iterator in Python 3, a list in Python 2. Python 2 is end-of-life since January 2020.",
      },
      {
        question: "Why is Python called an interpreted language?",
        difficulty: "Medium",
        hint: "Python code is executed line by line by the interpreter — no separate compilation to machine code. However, Python does compile to bytecode (.pyc files) which runs on the Python Virtual Machine (PVM). CPython is the reference implementation. Other implementations: PyPy (JIT compiled), Jython (JVM), IronPython (.NET).",
      },
      {
        question: "What is the Global Interpreter Lock (GIL) in Python?",
        difficulty: "Hard",
        hint: "The GIL is a mutex in CPython that allows only one thread to execute Python bytecode at a time, even on multi-core CPUs. It simplifies memory management but limits true parallelism for CPU-bound tasks. Workarounds: multiprocessing, asyncio (for I/O-bound), C extensions. Python 3.13+ is exploring removing the GIL (PEP 703).",
      },
    ],
  },
  {
    id: "python-installation-setup",
    title: "Python Installation and Setup",
    slug: "python-installation-setup",
    icon: "Settings",
    difficulty: "Beginner",
    description:
      "Set up Python on your machine — install Python, use the REPL, run scripts, and configure your development environment.",
    concept: {
      explanation:
        "Python can be downloaded from python.org or installed via package managers (brew on macOS, apt on Linux). The installation includes the Python interpreter, the standard library, and pip (package manager). After installation, you can run Python in interactive mode (REPL) by typing 'python' or 'python3' in the terminal, or run scripts with 'python script.py'. Virtual environments (venv) isolate project dependencies. Popular IDEs: VS Code (with Python extension), PyCharm, Jupyter Notebook. pip installs packages from PyPI: 'pip install requests'. Always use Python 3.8+ for new projects.",
      realLifeAnalogy:
        "Installing Python is like setting up a workshop. You install the workbench (Python interpreter), which comes with basic tools (standard library). pip is your hardware store — need a special tool (library)? Run 'pip install' and it arrives instantly. Virtual environments are like separate workbenches for each project — the tools on one bench don't interfere with another project's tools.",
      keyPoints: [
        "Download from python.org or use a package manager",
        "python3 --version to check the installed version",
        "REPL: interactive mode for quick testing (type python3)",
        "Run scripts: python3 script.py",
        "pip: package manager — pip install package_name",
        "venv: virtual environments isolate project dependencies",
        "python3 -m venv myenv to create a virtual environment",
        "IDEs: VS Code, PyCharm, Jupyter Notebook are popular choices",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Python Installation and Setup =====

# After installing Python, you can run this file with:
# python3 this_file.py

# ── Check Python version ────────────────────────
import sys
print("Python version:", sys.version)
print("Version info:", sys.version_info.major, sys.version_info.minor)

# ── Where is Python installed? ───────────────────
print("\\nPython executable:", sys.executable)
print("Python path:", sys.prefix)

# ── Using pip (package manager) ──────────────────
# In terminal:
# pip install requests      → install a package
# pip list                  → see installed packages
# pip freeze > requirements.txt → save dependencies
# pip install -r requirements.txt → install from file

# ── Virtual environments ─────────────────────────
# python3 -m venv myproject_env   → create
# source myproject_env/bin/activate  → activate (macOS/Linux)
# myproject_env\\Scripts\\activate    → activate (Windows)
# deactivate                        → deactivate

print("\\n--- Environment Info ---")
print("Platform:", sys.platform)

# ── Running Python interactively ─────────────────
# Type 'python3' in terminal to open REPL:
# >>> 2 + 3
# 5
# >>> print("Hello!")
# Hello!
# >>> exit()

print("\\n--- Import Check ---")
import os
print("Current directory:", os.getcwd())
print("Python is set up and ready to go!")
`,
    },
    interviewQuestions: [
      {
        question: "What is a virtual environment and why should you use one?",
        difficulty: "Easy",
        hint: "A virtual environment is an isolated Python environment with its own packages, independent of the global Python installation. Created with 'python3 -m venv env_name'. It prevents dependency conflicts between projects — Project A might need requests 2.0 while Project B needs requests 3.0. Each has its own pip and site-packages directory. Activated with 'source env/bin/activate' on macOS/Linux.",
      },
      {
        question: "What is the difference between pip and conda?",
        difficulty: "Medium",
        hint: "pip is Python's default package manager, installing from PyPI. It installs Python packages only. conda is a cross-language package manager from Anaconda that manages Python packages AND non-Python dependencies (C libraries, system tools). conda also manages environments (like venv). pip uses requirements.txt; conda uses environment.yml. For data science, conda is preferred because it handles complex binary dependencies. For web dev, pip + venv is standard.",
      },
      {
        question: "How does Python find and load modules when you use import?",
        difficulty: "Hard",
        hint: "Python searches in this order: 1) sys.modules cache (already imported), 2) built-in modules, 3) sys.path list which includes: current directory, PYTHONPATH env variable, site-packages (pip installs here), standard library path. You can inspect with 'import sys; print(sys.path)'. If not found, ImportError is raised. .pyc compiled bytecode files are cached in __pycache__ for faster loading. Relative imports use dots: 'from . import module'.",
      },
    ],
  },
  {
    id: "python-syntax",
    title: "Python Syntax",
    slug: "python-syntax",
    icon: "AlignLeft",
    difficulty: "Beginner",
    description:
      "Learn Python's syntax rules — indentation, colons, line continuation, and how Python code is structured differently from other languages.",
    concept: {
      explanation:
        "Python uses indentation (whitespace) to define code blocks instead of curly braces {}. This is mandatory — incorrect indentation causes IndentationError. The standard is 4 spaces per level. Statements end at the newline — no semicolons needed. The colon : introduces a new block (if, for, def, class). Python is case-sensitive. Line continuation uses \\ or implicit continuation inside (), [], {}. Multiple statements on one line use semicolons (rarely used). The pass keyword serves as a no-op placeholder for empty blocks.",
      realLifeAnalogy:
        "Python's syntax is like an outline in a document. Main headings are at the left margin, sub-points indented once, sub-sub-points indented twice. The indentation IS the grouping — no need for extra markers like braces. If you mess up the indentation, the outline (code) doesn't make sense, just like Python throws an error.",
      keyPoints: [
        "Indentation defines code blocks — 4 spaces is the standard",
        "No curly braces {} — indentation IS the syntax",
        "Colon : starts a new block (if, for, while, def, class)",
        "Semicolons are optional and rarely used",
        "Line continuation: \\ at end of line or implicit inside (), [], {}",
        "Python is case-sensitive: myVar and myvar are different",
        "pass is a no-op placeholder for empty blocks",
        "The standard style guide is PEP 8",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Python Syntax =====

# ── Indentation is structure ─────────────────────
print("--- Indentation ---")
x = 10
if x > 5:
    print("x is greater than 5")    # 4 spaces = inside if
    if x > 8:
        print("x is also > 8")      # 8 spaces = nested block
print("Outside the if block")       # Back to base level

# ── Colon starts a block ────────────────────────
print("\\n--- Colons & Blocks ---")
for i in range(3):        # colon starts the loop block
    print(f"  i = {i}")   # indented = inside the loop

def greet(name):          # colon starts the function body
    return f"Hello, {name}!"

print(greet("Alice"))

# ── Line continuation ───────────────────────────
print("\\n--- Line Continuation ---")
# Backslash continuation
total = 1 + 2 + 3 + \\
        4 + 5 + 6
print("Total:", total)

# Implicit continuation inside parentheses
numbers = (
    1 + 2 + 3 +
    4 + 5 + 6
)
print("Numbers:", numbers)

# Lists, dicts, function calls can span lines
colors = [
    "red",
    "green",
    "blue",
]
print("Colors:", colors)

# ── Case sensitivity ────────────────────────────
print("\\n--- Case Sensitivity ---")
name = "Alice"
Name = "Bob"
print(f"name={name}, Name={Name}")   # Different variables!

# ── pass keyword ─────────────────────────────────
print("\\n--- pass keyword ---")
def placeholder_function():
    pass  # Empty function — no error

class EmptyClass:
    pass  # Empty class — no error

print("pass lets you write empty blocks without errors")

# ── Multiple statements on one line ──────────────
a = 1; b = 2; c = 3  # Works but not recommended
print(f"a={a}, b={b}, c={c}")
`,
    },
    interviewQuestions: [
      {
        question: "Why does Python use indentation instead of braces?",
        difficulty: "Easy",
        hint: "Guido van Rossum chose indentation to enforce readable code. In brace-based languages, developers can write messy indentation that compiles fine but is hard to read. Python makes good formatting mandatory — the visual structure IS the code structure. This reduces bugs and makes code consistently readable across different developers.",
      },
      {
        question: "What happens if you mix tabs and spaces in Python 3?",
        difficulty: "Medium",
        hint: "Python 3 raises a TabError if tabs and spaces are mixed within the same block. PEP 8 recommends 4 spaces per level and never mixing. Most editors can be configured to insert spaces when Tab is pressed. Python 2 was more lenient but could produce subtle bugs. In Python 3 this is always an error — a deliberate design choice.",
      },
      {
        question: "What is PEP 8 and why is it important?",
        difficulty: "Hard",
        hint: "PEP 8 is the official Python style guide. It covers: 4 spaces for indentation, max 79 chars per line, snake_case for variables/functions, CamelCase for classes, UPPER_CASE for constants, blank lines between functions/classes, imports at the top. Following PEP 8 makes code consistent and readable. Tools like flake8, pylint, and black auto-format to PEP 8. 'A foolish consistency is the hobgoblin of little minds' — PEP 8 itself says to break rules when readability demands it.",
      },
    ],
  },
  {
    id: "python-variables",
    title: "Python Variables",
    slug: "python-variables",
    icon: "Variable",
    difficulty: "Beginner",
    description:
      "Learn how Python variables work — assignment, naming rules, dynamic typing, and how variables reference objects in memory.",
    concept: {
      explanation:
        "In Python, variables are created by assignment — no declaration keyword needed (no var, let, or const). Python is dynamically typed: a variable can hold any type and change type anytime. Variables are names (labels) that reference objects in memory — they don't contain values, they point to them. Naming rules: must start with a letter or underscore, can contain letters, numbers, underscores. Convention: snake_case for variables and functions, UPPER_CASE for constants (by convention only — Python has no true constants). Multiple assignment: a, b, c = 1, 2, 3. Swap: a, b = b, a.",
      realLifeAnalogy:
        "Python variables are like name tags at a party. The tag (variable name) can be moved from person to person (different objects). When you write x = 5, you put a tag 'x' on the integer 5. Then x = 'hello' moves the tag to a string. The old integer 5 still exists until garbage collected. Variables are references to objects, not containers holding values.",
      keyPoints: [
        "No declaration keyword — just assign: x = 10",
        "Dynamically typed — type can change anytime",
        "Variables are references (labels) to objects",
        "Must start with a letter or underscore",
        "Cannot start with a number or use special characters",
        "snake_case for variables (PEP 8 convention)",
        "UPPER_CASE for constants (convention only, not enforced)",
        "Multiple assignment: a, b, c = 1, 2, 3",
        "Swap trick: a, b = b, a",
        "Use type() to check variable type",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Python Variables =====

# ── Creating variables ───────────────────────────
print("--- Creating Variables ---")
name = "Alice"
age = 25
height = 5.7
is_student = True

print(f"name = {name}")
print(f"age = {age}")
print(f"height = {height}")
print(f"is_student = {is_student}")

# ── Dynamic typing ──────────────────────────────
print("\\n--- Dynamic Typing ---")
x = 42
print(f"x = {x}, type: {type(x).__name__}")

x = "now a string"
print(f"x = {x}, type: {type(x).__name__}")

x = [1, 2, 3]
print(f"x = {x}, type: {type(x).__name__}")

# ── Naming rules ─────────────────────────────────
print("\\n--- Naming Rules ---")
my_variable = "valid"
_private = "starts with underscore"
name2 = "has a number"
# 2name = "invalid"  # SyntaxError: can't start with number
# my-var = "invalid"  # SyntaxError: no hyphens

print(f"my_variable = {my_variable}")
print(f"_private = {_private}")

# ── Constants (convention only) ──────────────────
print("\\n--- Constants (Convention) ---")
PI = 3.14159
MAX_SIZE = 100
print(f"PI = {PI}, MAX_SIZE = {MAX_SIZE}")
# Python doesn't enforce constants — you CAN change them
# PI = 0  # This works but violates convention

# ── Multiple assignment ──────────────────────────
print("\\n--- Multiple Assignment ---")
a, b, c = 1, 2, 3
print(f"a={a}, b={b}, c={c}")

# Same value to multiple variables
x = y = z = 0
print(f"x={x}, y={y}, z={z}")

# ── Swap variables ───────────────────────────────
print("\\n--- Swap ---")
a, b = 10, 20
print(f"Before: a={a}, b={b}")
a, b = b, a
print(f"After:  a={a}, b={b}")

# ── Checking type ────────────────────────────────
print("\\n--- Type Checking ---")
print(f"type(42) = {type(42).__name__}")
print(f"type('hi') = {type('hi').__name__}")
print(f"type(3.14) = {type(3.14).__name__}")
print(f"type(True) = {type(True).__name__}")
print(f"isinstance(42, int) = {isinstance(42, int)}")
`,
    },
    interviewQuestions: [
      {
        question: "How are Python variables different from variables in C or Java?",
        difficulty: "Easy",
        hint: "In C/Java, variables are typed containers: 'int x = 5' reserves memory for an integer. In Python, variables are references (pointers) to objects. 'x = 5' creates an integer object 5 in memory and makes x point to it. This is why you don't declare types and why x can point to different types. Python variables are like labels on objects, not boxes holding values.",
      },
      {
        question: "Explain the difference between == and 'is' in Python.",
        difficulty: "Medium",
        hint: "== checks value equality (calls __eq__). 'is' checks identity — same object in memory (compares id()). a = [1,2]; b = [1,2]; a == b is True (same values), a is b is False (different objects). For None, always use 'is None'. CPython caches small integers (-5 to 256) so a = 5; b = 5; a is b is True — but this is an implementation detail.",
      },
      {
        question: "What happens in memory when you do x = 10 then x = 20?",
        difficulty: "Hard",
        hint: "x = 10 creates an int object 10 and makes x reference it. x = 20 creates an int object 20 and reassigns x to reference it. The old object 10 loses a reference. If nothing else references 10, it becomes eligible for garbage collection. For small integers (-5 to 256), CPython caches them so they're never garbage collected. id(x) shows the memory address. Variables never 'contain' values — they always reference objects.",
      },
    ],
  },
  {
    id: "python-data-types",
    title: "Data Types",
    slug: "python-data-types",
    icon: "Boxes",
    difficulty: "Beginner",
    description:
      "Explore Python's built-in data types — int, float, str, bool, None, list, tuple, dict, and set.",
    concept: {
      explanation:
        "Python has several built-in data types. Numeric: int (arbitrary precision integers), float (64-bit doubles), complex (a + bj). Text: str (immutable Unicode strings). Boolean: bool (True/False — subclass of int). Null: None (NoneType). Sequence: list (mutable, ordered), tuple (immutable, ordered). Mapping: dict (key-value pairs). Set: set (mutable, unordered, unique), frozenset (immutable). Use type() to check, isinstance() to verify type hierarchy. Everything in Python is an object — even integers and functions.",
      realLifeAnalogy:
        "Data types are like different kinds of containers. An int is a simple number counter. A str is a necklace of character beads (immutable — can't change a bead). A list is a shopping list (mutable — add, remove, reorder). A tuple is a sealed envelope (immutable — can't change contents). A dict is an address book (look up by name/key). A set is a bag of unique marbles (no duplicates allowed).",
      keyPoints: [
        "int: arbitrary precision — 2**1000 works fine",
        "float: 64-bit double — 0.1 + 0.2 != 0.3",
        "str: immutable Unicode strings",
        "bool: True/False — subclass of int (True == 1)",
        "None: null value — only instance of NoneType",
        "list: mutable, ordered — [1, 2, 3]",
        "tuple: immutable, ordered — (1, 2, 3)",
        "dict: key-value pairs — {'a': 1, 'b': 2}",
        "set: unique values, unordered — {1, 2, 3}",
        "type() returns the type; isinstance() checks type hierarchy",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Python Data Types =====

# ── Numeric types ────────────────────────────────
print("--- Numeric ---")
integer = 42
floating = 3.14
big_int = 2 ** 100  # Arbitrary precision!
print(f"int: {integer}, type: {type(integer).__name__}")
print(f"float: {floating}, type: {type(floating).__name__}")
print(f"big int: {big_int}")

# ── String ───────────────────────────────────────
print("\\n--- String ---")
name = "Hello, Python!"
print(f"str: {name}, length: {len(name)}")
print(f"Upper: {name.upper()}")
print(f"Slice: {name[0:5]}")

# ── Boolean ──────────────────────────────────────
print("\\n--- Boolean ---")
is_active = True
is_empty = False
print(f"True + True = {True + True}")   # bool is subclass of int
print(f"isinstance(True, int) = {isinstance(True, int)}")

# ── None ─────────────────────────────────────────
print("\\n--- None ---")
result = None
print(f"result: {result}")
print(f"result is None: {result is None}")
print(f"type: {type(result).__name__}")

# ── List (mutable, ordered) ─────────────────────
print("\\n--- List ---")
fruits = ["apple", "banana", "cherry"]
fruits.append("date")
print(f"List: {fruits}")
print(f"First: {fruits[0]}, Last: {fruits[-1]}")

# ── Tuple (immutable, ordered) ───────────────────
print("\\n--- Tuple ---")
point = (10, 20)
print(f"Tuple: {point}")
print(f"x={point[0]}, y={point[1]}")
# point[0] = 5  # TypeError — tuples are immutable

# ── Dictionary (key-value pairs) ─────────────────
print("\\n--- Dict ---")
person = {"name": "Alice", "age": 30, "city": "NYC"}
print(f"Dict: {person}")
print(f"Name: {person['name']}")
person["email"] = "alice@example.com"
print(f"Updated: {person}")

# ── Set (unique, unordered) ──────────────────────
print("\\n--- Set ---")
numbers = {1, 2, 3, 2, 1}  # Duplicates removed
print(f"Set: {numbers}")
numbers.add(4)
print(f"After add: {numbers}")
print(f"3 in numbers: {3 in numbers}")

# ── Type summary ─────────────────────────────────
print("\\n--- All Types ---")
values = [42, 3.14, "hello", True, None, [1], (1,), {"a": 1}, {1, 2}]
for v in values:
    print(f"  {str(v):>15} → {type(v).__name__}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between a list and a tuple?",
        difficulty: "Easy",
        hint: "Lists are mutable (can add, remove, change items): [1, 2, 3]. Tuples are immutable (cannot be changed after creation): (1, 2, 3). Tuples are hashable (can be dict keys), faster, and use less memory. Use lists when you need to modify the collection. Use tuples for fixed data, function return values, and dict keys. A single-element tuple needs a comma: (1,) not (1).",
      },
      {
        question: "What does 'everything is an object' mean in Python?",
        difficulty: "Medium",
        hint: "Every value in Python is an object — integers, strings, functions, classes, modules, even None. Objects have id (identity), type, and value. Variables reference objects, not hold them. This means: (42).bit_length() works, functions have attributes (func.__name__), classes are objects too. This is different from languages like Java where primitives (int, char) are not objects.",
      },
      {
        question: "What is the difference between mutable and immutable types?",
        difficulty: "Hard",
        hint: "Immutable: int, float, str, tuple, frozenset, bool, None — cannot be changed in place. Mutable: list, dict, set — can be modified. Immutable objects are hashable (usable as dict keys). When you 'modify' a string, you create a new object. Mutable defaults in functions are dangerous: def f(items=[]) shares the SAME list across calls. Understanding mutability is crucial for avoiding bugs with aliasing: a = [1,2]; b = a; b.append(3) also modifies a.",
      },
    ],
  },
  {
    id: "python-type-casting",
    title: "Type Casting",
    slug: "python-type-casting",
    icon: "RefreshCw",
    difficulty: "Beginner",
    description:
      "Convert between Python types — implicit coercion, explicit casting with int(), float(), str(), bool(), and understanding truthy/falsy values.",
    concept: {
      explanation:
        "Python supports implicit (automatic) and explicit (manual) type conversion. Implicit: Python auto-converts in mixed expressions (int + float → float). Explicit: use constructor functions: int(), float(), str(), bool(), list(), tuple(), set(). int() truncates floats (doesn't round): int(3.9) = 3. str() works on any object. bool() converts based on truthiness. Falsy values: None, False, 0, 0.0, '', [], {}, set(). Everything else is truthy. Type conversion can raise ValueError (int('abc')) or TypeError.",
      realLifeAnalogy:
        "Type casting is like currency exchange. You can convert dollars to euros (int to float) but might lose precision (int(3.9) = 3). Some conversions are automatic (implicit, like int + float), others need a teller (explicit, like str(42)). Not all conversions work — you can't exchange a photograph for money (int('hello') fails). Truthiness is asking 'is there anything here?' — empty wallet is falsy, anything with content is truthy.",
      keyPoints: [
        "Implicit: int + float → float automatically",
        "Explicit: int(), float(), str(), bool()",
        "int() truncates floats: int(3.9) = 3 (not rounding!)",
        "int('42') works; int('3.5') raises ValueError",
        "Falsy: None, False, 0, 0.0, '', [], {}, set()",
        "Everything else is truthy",
        "str() works on everything — calls __str__",
        "TypeError for impossible conversions",
        "ord() and chr() for character ↔ code point",
        "list(), tuple(), set() convert between collections",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Type Casting =====

# ── Implicit conversion ──────────────────────────
print("--- Implicit Conversion ---")
result = 5 + 3.0    # int + float → float
print(f"5 + 3.0 = {result}, type: {type(result).__name__}")

result = True + 5   # bool + int → int (True = 1)
print(f"True + 5 = {result}, type: {type(result).__name__}")

# ── Explicit conversion ──────────────────────────
print("\\n--- Explicit Conversion ---")

# int()
print(f"int(3.9) = {int(3.9)}")       # 3 — truncates!
print(f"int('42') = {int('42')}")
print(f"int(True) = {int(True)}")      # 1

# float()
print(f"float(5) = {float(5)}")
print(f"float('3.14') = {float('3.14')}")

# str()
print(f"str(42) = '{str(42)}'")
print(f"str([1,2,3]) = '{str([1,2,3])}'")

# bool()
print(f"bool(0) = {bool(0)}")
print(f"bool(42) = {bool(42)}")
print(f"bool('') = {bool('')}")
print(f"bool('hello') = {bool('hello')}")

# list(), tuple(), set()
print(f"list('abc') = {list('abc')}")
print(f"tuple([1,2,3]) = {tuple([1,2,3])}")
print(f"set([1,2,2,3]) = {set([1,2,2,3])}")

# ── Truthy & Falsy ───────────────────────────────
print("\\n--- Truthy & Falsy ---")
falsy_values = [None, False, 0, 0.0, "", [], {}, set()]
for val in falsy_values:
    print(f"  bool({str(val):>8}) = {bool(val)}")

print("\\nTruthy examples:")
truthy_values = [1, -1, "hello", [0], {"a": 1}]
for val in truthy_values:
    print(f"  bool({str(val):>12}) = {bool(val)}")

# ── Error handling ───────────────────────────────
print("\\n--- Conversion Errors ---")
try:
    int("hello")
except ValueError as e:
    print(f"ValueError: {e}")

try:
    int([1, 2, 3])
except TypeError as e:
    print(f"TypeError: {e}")
`,
    },
    interviewQuestions: [
      {
        question: "What are falsy values in Python?",
        difficulty: "Easy",
        hint: "Falsy values evaluate to False in boolean context: None, False, 0, 0.0, 0j, empty string '', empty list [], empty tuple (), empty dict {}, empty set set(), and objects where __bool__() returns False or __len__() returns 0. Everything else is truthy. Used in if statements: 'if my_list:' checks non-empty.",
      },
      {
        question: "Why does int(3.9) return 3 and not 4?",
        difficulty: "Medium",
        hint: "int() truncates toward zero — removes the decimal part without rounding. int(3.9) = 3, int(-3.9) = -3. For rounding: round(3.9) = 4, math.ceil(3.9) = 4, math.floor(3.9) = 3. Note: int('3.9') raises ValueError — use int(float('3.9')) for string-to-int conversion of decimal strings.",
      },
      {
        question: "How does Python handle implicit type conversion vs explicit?",
        difficulty: "Hard",
        hint: "Python does minimal implicit conversion: int+float → float, bool+int → int. It does NOT implicitly convert str+int (TypeError, unlike JavaScript). This is by design — 'Explicit is better than implicit' (Zen of Python). You must explicitly cast: str(42) or int('42'). This prevents subtle bugs. Python also won't implicitly narrow types (float to int) — only widens. For custom classes, implement __int__(), __float__(), __str__(), __bool__() for conversion support.",
      },
    ],
  },
  {
    id: "python-comments",
    title: "Python Comments",
    slug: "python-comments",
    icon: "MessageSquare",
    difficulty: "Beginner",
    description:
      "Write clear comments in Python — single-line comments, multi-line comments, docstrings, and best practices for documenting code.",
    concept: {
      explanation:
        "Python comments start with # — everything after # on that line is ignored by the interpreter. Python has no dedicated multi-line comment syntax; use multiple # lines or triple-quoted strings ('''...''' or \"\"\"...\"\"\"). Docstrings are triple-quoted strings as the first statement in a module, class, or function — they're stored as __doc__ and accessible via help(). Docstrings are documentation, not just comments. Comments explain 'why', docstrings explain 'what'. PEP 257 defines docstring conventions. Good comments add context, not narrate obvious code.",
      realLifeAnalogy:
        "Comments are like sticky notes on your code. A # comment is a quick yellow sticky — only you see it, the machine ignores it. A docstring is like the instruction manual for a function — it's part of the product and users can read it (via help()). The best sticky notes explain WHY you did something unusual, not WHAT the code does (the code itself shows that).",
      keyPoints: [
        "# starts a single-line comment",
        "No multi-line comment syntax — use multiple # lines",
        "Triple quotes (''' or \"\"\") can serve as multi-line 'comments'",
        "Docstrings: first string in a module/class/function",
        "Docstrings are stored as __doc__ attribute",
        "Access docstrings via help(function_name)",
        "Comments explain WHY; docstrings explain WHAT",
        "PEP 257 defines docstring conventions",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Python Comments =====

# ── Single-line comments ─────────────────────────
print("--- Single-line Comments ---")

# This is a comment — Python ignores it
x = 10  # Inline comment after code
print(f"x = {x}")

# Comments are great for explaining WHY
# not WHAT (the code shows what)
threshold = 0.85  # Based on A/B test results from Q3

# ── Multi-line comments ──────────────────────────
print("\\n--- Multi-line Comments ---")

# Python has no multi-line comment syntax.
# Use multiple # lines like this.
# This is the recommended approach.

"""
Triple-quoted strings can be used as
multi-line comments when not assigned
to anything. Python evaluates but discards them.
"""

print("Comments don't affect execution")

# ── Docstrings ───────────────────────────────────
print("\\n--- Docstrings ---")

def calculate_area(length, width):
    """Calculate the area of a rectangle.

    Args:
        length: The length of the rectangle.
        width: The width of the rectangle.

    Returns:
        The area as a float.
    """
    return length * width

# Access the docstring
print(f"Function: {calculate_area.__name__}")
print(f"Docstring: {calculate_area.__doc__}")

area = calculate_area(5, 3)
print(f"Area: {area}")

# ── Class docstring ──────────────────────────────
print("\\n--- Class Docstring ---")

class Dog:
    """A simple Dog class.

    Attributes:
        name: The dog's name.
        age: The dog's age in years.
    """

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        """Make the dog bark."""
        return f"{self.name} says Woof!"

dog = Dog("Rex", 3)
print(dog.bark())
print(f"Class doc: {Dog.__doc__.strip().split(chr(10))[0]}")

# ── Good vs Bad comments ────────────────────────
print("\\n--- Comment Best Practices ---")

# BAD: x = x + 1  # Increment x by 1 (obvious!)

# GOOD: Retry with exponential backoff (max 3 attempts)
# because the API rate-limits at 100 req/min
retry_count = 3

print("Good comments explain WHY, not WHAT")
print(f"retry_count = {retry_count}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between a comment and a docstring?",
        difficulty: "Easy",
        hint: "Comments (#) are ignored by the interpreter — for human readers only. Docstrings (triple-quoted strings as the first statement in a module/class/function) are stored as the __doc__ attribute and accessible at runtime via help() or obj.__doc__. Docstrings are part of the program. Comments explain 'why'; docstrings explain 'what' a function/class does.",
      },
      {
        question: "What are the PEP 257 conventions for docstrings?",
        difficulty: "Medium",
        hint: "PEP 257 says: one-line docstrings should be on a single line with triple quotes. Multi-line docstrings should have a summary line, a blank line, then elaboration. Use \"\"\" not '''. The closing \"\"\" should be on its own line for multi-line. Document parameters, return values, and exceptions. Popular formats: Google style (Args:, Returns:), NumPy style (:param x:), Sphinx/reST style. Tools like Sphinx can generate documentation from docstrings.",
      },
      {
        question: "Why are triple-quoted strings not true multi-line comments?",
        difficulty: "Hard",
        hint: "Triple-quoted strings are actual string objects — Python creates them in memory even if not assigned. They're only 'comments' if at module/class/function level (where they become docstrings). In other positions, they create string objects that are immediately discarded — wasting memory briefly. True comments (#) are completely stripped during compilation. For multi-line comments, multiple # lines are recommended. Some tools (linters, type checkers) may process triple-quoted strings differently than # comments.",
      },
    ],
  },
  {
    id: "python-input-output",
    title: "Input and Output",
    slug: "python-input-output",
    icon: "Terminal",
    difficulty: "Beginner",
    description:
      "Handle user input with input() and format output with print() — including f-strings, sep, end, and string formatting.",
    concept: {
      explanation:
        "print() outputs to the console with automatic newline. It accepts multiple arguments (separated by spaces), and keyword arguments: sep (separator between items), end (line ending, default '\\n'), file (output stream), flush (force flush). input(prompt) reads a line from the user — always returns a string, so convert with int() or float() as needed. F-strings (f'...{expr}...') are the modern way to format output (Python 3.6+). Format specs control alignment, padding, and precision: f'{value:width.precision}'.",
      realLifeAnalogy:
        "print() is like a speaker announcement — it broadcasts information. sep is the pause between words, end is what happens after the announcement. input() is like asking someone a question and waiting — they always answer in text (string), so you interpret it yourself (convert to number if needed). F-strings are fill-in-the-blank templates.",
      keyPoints: [
        "print() adds newline by default; use end='' to prevent",
        "print(a, b, c) separates with spaces; sep=',' to change",
        "input(prompt) always returns a string",
        "Convert input: int(input('Age: ')), float(input('Price: '))",
        "F-strings: f'{name} is {age}' (Python 3.6+)",
        "Format specs: f'{3.14:.2f}', f'{42:05d}', f'{\"hi\":>10}'",
        "Alignment: :< left, :> right, :^ center",
        "Number formatting: :, for commas, :% for percent",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Input and Output =====

# ── Basic print ──────────────────────────────────
print("--- Basic print ---")
print("Hello, World!")
print("Multiple", "arguments", "joined", "by", "spaces")

# ── sep and end ──────────────────────────────────
print("\\n--- sep and end ---")
print("a", "b", "c", sep=" -> ")
print("No newline", end=" ")
print("...same line!")
print("a", "b", "c", sep="\\n")  # Each on new line

# ── F-strings (Python 3.6+) ─────────────────────
print("\\n--- F-Strings ---")
name = "Alice"
age = 30
print(f"My name is {name} and I am {age} years old.")
print(f"Next year: {age + 1}")
print(f"Uppercase: {name.upper()}")

# ── Format specifications ────────────────────────
print("\\n--- Format Specs ---")
pi = 3.14159

# Decimal places
print(f"Pi: {pi:.2f}")           # 3.14

# Width and alignment
print(f"{'Left':<15} | {'Center':^15} | {'Right':>15}")
print(f"{42:<15} | {42:^15} | {42:>15}")

# Number formatting
print(f"Commas: {1000000:,}")    # 1,000,000
print(f"Percent: {0.856:.1%}")   # 85.6%
print(f"Zero-pad: {42:06d}")     # 000042
print(f"Binary: {255:08b}")      # 11111111
print(f"Hex: {255:#x}")          # 0xff

# ── input() ──────────────────────────────────────
print("\\n--- input() ---")
# Simulated input (normally you'd use input())
user_name = "Bob"        # input("Enter name: ")
user_age = "25"          # input("Enter age: ")

age_int = int(user_age)  # Convert string to int
print(f"Hello {user_name}, next year you'll be {age_int + 1}")

# Multiple values from one input
data = "10 20 30"  # input("Enter 3 numbers: ")
numbers = list(map(int, data.split()))
print(f"Numbers: {numbers}, Sum: {sum(numbers)}")

# ── Pretty table ─────────────────────────────────
print("\\n--- Pretty Table ---")
items = [("Python", 3.12), ("Java", 21), ("Rust", 1.75)]
print(f"{'Language':<12} {'Version':>8}")
print("-" * 21)
for lang, ver in items:
    print(f"{lang:<12} {ver:>8.2f}")
`,
    },
    interviewQuestions: [
      {
        question: "What does input() return and how do you handle numeric input?",
        difficulty: "Easy",
        hint: "input() always returns a string. For integer: age = int(input('Age: ')). For float: price = float(input('Price: ')). Wrap in try-except for safety: try: n = int(input()) except ValueError: print('Invalid'). For multiple values: a, b = map(int, input().split()). In Python 2, input() evaluated expressions (dangerous) — raw_input() was safe. Python 3 removed this distinction.",
      },
      {
        question: "What are the different ways to format strings in Python?",
        difficulty: "Medium",
        hint: "1) F-strings (3.6+): f'{name} is {age}' — fastest and most readable. 2) .format(): '{} is {}'.format(name, age). 3) %-formatting: '%s is %d' % (name, age) — old style. 4) Template strings: Template('$name is $age').substitute(). F-strings are recommended for new code — evaluated at runtime, support expressions, and are fastest.",
      },
      {
        question: "How can you redirect print() output to a file?",
        difficulty: "Hard",
        hint: "Method 1: print('data', file=open('out.txt', 'w')). Method 2: with open('out.txt', 'w') as f: print('data', file=f). Method 3: Redirect sys.stdout. Method 4: contextlib.redirect_stdout. print() writes to sys.stdout by default — any object with a write() method works as the file argument. Use flush=True for immediate writing. For logging, prefer the logging module.",
      },
    ],
  },
  {
    id: "python-keywords",
    title: "Python Keywords",
    slug: "python-keywords",
    icon: "FileText",
    difficulty: "Beginner",
    description:
      "Learn Python's reserved keywords — words with special meaning that cannot be used as variable names.",
    concept: {
      explanation:
        "Python has 35 reserved keywords (as of 3.12) that have special meaning and cannot be used as variable names, function names, or identifiers. They include: control flow (if, elif, else, for, while, break, continue, pass), logical (and, or, not, is, in), function/class (def, return, class, lambda), exception handling (try, except, finally, raise), variable scope (global, nonlocal), import (import, from, as), context manager (with), async (async, await), boolean/null (True, False, None), assertion (assert), deletion (del), and yield. Use 'import keyword; keyword.kwlist' to see all keywords.",
      realLifeAnalogy:
        "Keywords are like reserved words in a language. You can name your child almost anything, but you can't name them 'The' or 'Is' — those words have fixed meanings in English. Similarly, you can't name a variable 'if' or 'for' because Python has already assigned meaning to them. They're the grammar of the language — the building blocks that make code structure possible.",
      keyPoints: [
        "35 reserved keywords in Python 3.12",
        "Cannot be used as variable, function, or class names",
        "Case-sensitive: True is a keyword, true is not",
        "import keyword; keyword.kwlist — lists all keywords",
        "keyword.iskeyword('for') — checks if a word is a keyword",
        "Soft keywords (match, case) — context-dependent (3.10+)",
        "Built-in functions (print, len) are NOT keywords — can be overridden",
        "Using a keyword as a name raises SyntaxError",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Python Keywords =====

# ── List all keywords ────────────────────────────
print("--- All Python Keywords ---")
import keyword
print(f"Total keywords: {len(keyword.kwlist)}")
for i, kw in enumerate(keyword.kwlist, 1):
    print(f"  {i:2}. {kw}")

# ── Check if a word is a keyword ─────────────────
print("\\n--- Checking Keywords ---")
words = ["for", "while", "print", "hello", "True", "true"]
for word in words:
    status = "keyword" if keyword.iskeyword(word) else "not a keyword"
    print(f"  '{word}' → {status}")

# ── Control flow keywords ────────────────────────
print("\\n--- Control Flow ---")
# if, elif, else
x = 10
if x > 5:
    print("x > 5")
elif x > 0:
    print("x > 0")
else:
    print("x <= 0")

# for, while, break, continue, pass
for i in range(5):
    if i == 2:
        continue      # Skip 2
    if i == 4:
        break         # Stop at 4
    print(f"  i = {i}")

# ── Logical keywords ────────────────────────────
print("\\n--- Logical Keywords ---")
# and, or, not
print(f"True and False: {True and False}")
print(f"True or False: {True or False}")
print(f"not True: {not True}")

# is, in
items = [1, 2, 3]
print(f"2 in items: {2 in items}")
print(f"None is None: {None is None}")

# ── Function keywords ────────────────────────────
print("\\n--- Function Keywords ---")
# def, return, lambda
def add(a, b):
    return a + b

multiply = lambda a, b: a * b

print(f"add(3, 4) = {add(3, 4)}")
print(f"multiply(3, 4) = {multiply(3, 4)}")

# ── Exception keywords ──────────────────────────
print("\\n--- Exception Keywords ---")
# try, except, finally, raise
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Caught: {e}")
finally:
    print("Finally always runs")

# ── Scope keywords ───────────────────────────────
print("\\n--- Scope Keywords ---")
# global, nonlocal
count = 0
def increment():
    global count
    count += 1

increment()
print(f"Global count: {count}")

# ── Keywords vs Built-ins ────────────────────────
print("\\n--- Keywords vs Built-ins ---")
print("'print' is a built-in, NOT a keyword")
print(f"keyword.iskeyword('print'): {keyword.iskeyword('print')}")
# You CAN override built-ins (bad idea!)
# print = 42  # This would break print()!
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between keywords and built-in functions?",
        difficulty: "Easy",
        hint: "Keywords (if, for, def, class) are reserved — you CANNOT use them as names (SyntaxError). Built-in functions (print, len, type, range) are pre-defined but CAN be overridden: print = 42 is valid (but breaks print). Keywords are part of the syntax; built-ins are pre-loaded names in the builtins module. keyword.iskeyword('print') returns False because print is a built-in, not a keyword.",
      },
      {
        question: "What are soft keywords in Python 3.10+?",
        difficulty: "Medium",
        hint: "Soft keywords (match, case, type) are context-dependent — they're only keywords in specific contexts (like match-case statements). Outside those contexts, they can be used as variable names: match = 5 is valid. This was done to avoid breaking existing code that used 'match' or 'case' as names. Regular keywords (if, for) are always keywords regardless of context. This is why keyword.iskeyword('match') returns False even though match is used in pattern matching.",
      },
      {
        question: "Explain the difference between 'is' and '==' keywords.",
        difficulty: "Hard",
        hint: "'==' checks value equality (calls __eq__). 'is' checks identity — whether two names reference the exact same object in memory (compares id()). a = [1,2]; b = [1,2]; a == b is True (same values), a is b is False (different objects). CPython caches small integers (-5 to 256) and interned strings, so a = 5; b = 5; a is b might be True. Always use 'is' for None comparisons (x is None), never == for None.",
      },
    ],
  },
  {
    id: "python-operators",
    title: "Python Operators",
    slug: "python-operators",
    icon: "Calculator",
    difficulty: "Beginner",
    description:
      "Master Python operators — arithmetic, comparison, logical, assignment, bitwise, membership (in), and identity (is).",
    concept: {
      explanation:
        "Python provides a rich set of operators. Arithmetic: +, -, *, / (true division), // (floor division), % (modulo), ** (exponent). Comparison: ==, !=, <, >, <=, >= (return bool). Logical: and, or, not (short-circuit evaluation). Assignment: =, +=, -=, *=, etc. Membership: 'in' and 'not in'. Identity: 'is' and 'is not'. Bitwise: &, |, ^, ~, <<, >>. Python supports chained comparisons: 1 < x < 10. The walrus operator := (Python 3.8+) assigns in expressions. Operators can be overloaded via dunder methods (__add__, __eq__, etc.).",
      realLifeAnalogy:
        "Operators are tools in a toolbox. Arithmetic (+, -, *) are your measuring tools. Comparison (==, <, >) are like a ruler — they compare sizes. Logical (and, or, not) are switches that combine conditions. The 'in' operator searches: 'Is Alice in the contact list?' The 'is' operator checks fingerprints — are these the SAME person, not just someone who looks alike?",
      keyPoints: [
        "/ is true division: 7 / 2 = 3.5",
        "// is floor division: 7 // 2 = 3",
        "** is exponentiation: 2 ** 10 = 1024",
        "and, or, not — words, not symbols",
        "'in' checks membership: 'a' in 'abc' → True",
        "'is' checks identity (same object), not equality",
        "Chained comparisons: 1 < x < 10",
        "Walrus operator := assigns in expressions (3.8+)",
        "Short-circuit: and returns first falsy; or returns first truthy",
        "Operators are dunder methods: a + b calls a.__add__(b)",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Python Operators =====

# ── Arithmetic ───────────────────────────────────
print("--- Arithmetic ---")
print(f"7 + 3 = {7 + 3}")
print(f"7 - 3 = {7 - 3}")
print(f"7 * 3 = {7 * 3}")
print(f"7 / 3 = {7 / 3}")       # True division → float
print(f"7 // 3 = {7 // 3}")     # Floor division → int
print(f"7 % 3 = {7 % 3}")       # Modulo
print(f"2 ** 10 = {2 ** 10}")    # Power

# ── Comparison ───────────────────────────────────
print("\\n--- Comparison ---")
print(f"5 == 5: {5 == 5}")
print(f"5 != 3: {5 != 3}")
print(f"5 > 3: {5 > 3}")
print(f"5 <= 3: {5 <= 3}")

# Chained comparison
x = 5
print(f"1 < {x} < 10: {1 < x < 10}")

# ── Logical ──────────────────────────────────────
print("\\n--- Logical ---")
print(f"True and False: {True and False}")
print(f"True or False: {True or False}")
print(f"not True: {not True}")

# Short-circuit evaluation
print(f"0 or 'default': {0 or 'default'}")
print(f"'hello' and 'world': {'hello' and 'world'}")

# ── Assignment ───────────────────────────────────
print("\\n--- Assignment ---")
x = 10
x += 5     # x = x + 5
print(f"x += 5: {x}")
x *= 2     # x = x * 2
print(f"x *= 2: {x}")
x //= 3
print(f"x //= 3: {x}")

# ── Membership ───────────────────────────────────
print("\\n--- Membership (in) ---")
fruits = ["apple", "banana", "cherry"]
print(f"'banana' in fruits: {'banana' in fruits}")
print(f"'grape' not in fruits: {'grape' not in fruits}")
print(f"'a' in 'abc': {'a' in 'abc'}")

# ── Identity ─────────────────────────────────────
print("\\n--- Identity (is) ---")
a = [1, 2, 3]
b = [1, 2, 3]
c = a
print(f"a == b: {a == b}")   # Same value
print(f"a is b: {a is b}")   # Different objects
print(f"a is c: {a is c}")   # Same object

# ── Walrus operator := (3.8+) ────────────────────
print("\\n--- Walrus Operator ---")
data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
if (n := len(data)) > 5:
    print(f"List is long: {n} elements")

# ── Operator precedence ──────────────────────────
print("\\n--- Precedence ---")
result = 2 + 3 * 4    # * before +
print(f"2 + 3 * 4 = {result}")
result = (2 + 3) * 4  # () first
print(f"(2 + 3) * 4 = {result}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between / and // in Python?",
        difficulty: "Easy",
        hint: "/ is true division — always returns float: 7 / 2 = 3.5, 6 / 3 = 2.0. // is floor division — rounds DOWN: 7 // 2 = 3, -7 // 2 = -4 (toward negative infinity, not toward zero). In Python 2, / on integers was floor division, which was a common bug. Python 3 changed / to always be true division.",
      },
      {
        question: "How does short-circuit evaluation work with and/or?",
        difficulty: "Medium",
        hint: "'and' returns the first falsy value, or the last value if all truthy: 0 and 5 → 0; 3 and 5 → 5. 'or' returns the first truthy value, or the last if all falsy: 0 or 5 → 5; 0 or '' → ''. They return actual values, not True/False. Common pattern: 'x or default'. Falsy: None, False, 0, '', [], {}.",
      },
      {
        question: "What is the walrus operator and when would you use it?",
        difficulty: "Hard",
        hint: "The walrus operator := (PEP 572, Python 3.8+) assigns and returns a value in expressions. Without: data = get_data(); if data: process(data). With: if (data := get_data()): process(data). Uses: while loops (while chunk := file.read(8192)), comprehensions with filtering ([y for x in data if (y := f(x)) > 0]). Reduces duplication of expensive calls.",
      },
    ],
  },

  // ─── Level 2: Control Flow ──────────────────────────────────────────────────
  {
    id: "python-if-statements",
    title: "if Statements",
    slug: "python-if-statements",
    icon: "GitBranch",
    difficulty: "Beginner",
    description:
      "Learn how to execute code conditionally using if statements — the most basic decision-making construct in Python.",
    concept: {
      explanation:
        "The if statement evaluates a condition (any expression that resolves to True or False) and executes the indented block only when the condition is truthy. Python considers the following falsy: False, None, 0, 0.0, empty string '', empty list [], empty dict {}, empty set set(), and empty tuple (). Everything else is truthy. The condition does not need parentheses (though you can use them for clarity). The block must be indented consistently — typically 4 spaces per PEP 8. You can use comparison operators (==, !=, <, >, <=, >=), membership operators (in, not in), identity operators (is, is not), and logical operators (and, or, not) in conditions.",
      realLifeAnalogy:
        "An if statement is like a bouncer at a club entrance. The bouncer checks your age (condition). If you are 21 or older (condition is True), you are allowed in (code block executes). If not, nothing happens — you just walk past the entrance. The bouncer only lets people through when the specific condition is met.",
      keyPoints: [
        "if condition: followed by an indented block",
        "No parentheses required around the condition",
        "Block must be indented (4 spaces by convention)",
        "Condition can be any expression that evaluates to truthy/falsy",
        "Falsy values: False, None, 0, '', [], {}, set(), ()",
        "Can combine conditions with and, or, not",
        "Comparison operators: ==, !=, <, >, <=, >=",
        "Membership: in, not in; Identity: is, is not",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Basic if statement
age = 20

if age >= 18:
    print("You are an adult")

# Using comparison operators
temperature = 35

if temperature > 30:
    print("It's hot outside!")

# Truthy / Falsy values
name = "Alice"

if name:
    print(f"Hello, {name}!")

empty_list = []

if not empty_list:
    print("The list is empty")

# Combining conditions with and/or
score = 85
attendance = 90

if score >= 80 and attendance >= 75:
    print("Eligible for honors")

# Membership operator
fruits = ["apple", "banana", "cherry"]

if "banana" in fruits:
    print("We have bananas!")
`,
    },
    interviewQuestions: [
      {
        question: "What values does Python consider falsy?",
        difficulty: "Easy",
        hint: "Python considers these falsy: False, None, 0 (int), 0.0 (float), 0j (complex), '' (empty string), [] (empty list), {} (empty dict), set() (empty set), () (empty tuple), and range(0). Custom objects are falsy if they define __bool__() returning False or __len__() returning 0. Everything else is truthy, including empty custom objects without these methods.",
      },
      {
        question: "What is the difference between == and is in an if condition?",
        difficulty: "Medium",
        hint: "== checks value equality — do two objects have the same value? 'is' checks identity — are they the exact same object in memory? [1,2] == [1,2] is True (same value), but [1,2] is [1,2] is False (different objects). Use 'is' only for None, True, False singletons: if x is None. Python caches small integers (-5 to 256) and interned strings, so 'is' may accidentally work for those but should not be relied on.",
      },
      {
        question: "How does short-circuit evaluation affect if conditions?",
        difficulty: "Hard",
        hint: "'and' stops at the first falsy value — if the left side is False, the right side is never evaluated. 'or' stops at the first truthy value. This matters for side effects and performance: if x and x.method() won't call method() when x is None. Common pattern: if d and d.get('key') avoids AttributeError. Order conditions from cheapest to most expensive for performance.",
      },
    ],
  },
  {
    id: "python-if-else",
    title: "if else Statements",
    slug: "python-if-else",
    icon: "GitBranch",
    difficulty: "Beginner",
    description:
      "Handle two-way decisions with if-else — execute one block when the condition is true and another when it is false.",
    concept: {
      explanation:
        "The if-else statement provides a two-way branch. If the condition is True, the if-block runs; otherwise the else-block runs. Exactly one of the two blocks always executes — never both, never neither. The else keyword is followed by a colon and its own indented block. Python also supports a ternary expression (conditional expression): value = a if condition else b, which is useful for simple assignments. The else block has no condition — it is the catch-all for when the if condition is False.",
      realLifeAnalogy:
        "An if-else is like a fork in the road with exactly two paths. If you see a 'Road Closed' sign (condition is True), you take the detour (if-block). Otherwise (else), you continue on the main road. You always take one path or the other — you never stand still or take both.",
      keyPoints: [
        "if condition: ... else: ... — exactly one block runs",
        "else has no condition — it catches everything the if misses",
        "Ternary syntax: value = x if condition else y",
        "The else block must be at the same indentation level as if",
        "Useful for binary decisions: pass/fail, even/odd, yes/no",
        "Avoid unnecessary else after return (early return pattern)",
        "Ternary is for expressions, not statements",
        "Nested if-else is possible but prefer elif for readability",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Basic if-else
age = 16

if age >= 18:
    print("You can vote")
else:
    print("You cannot vote yet")

# Even or Odd check
number = 7

if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")

# Ternary (conditional) expression
score = 75
result = "Pass" if score >= 60 else "Fail"
print(f"Score: {score} — {result}")

# String check
password = "secret123"

if len(password) >= 8:
    print("Password length OK")
else:
    print("Password too short (min 8 chars)")

# Using with functions
def is_positive(n):
    if n > 0:
        return True
    else:
        return False

print(f"Is 5 positive? {is_positive(5)}")
print(f"Is -3 positive? {is_positive(-3)}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the ternary operator in Python and how does it differ from other languages?",
        difficulty: "Easy",
        hint: "Python's ternary is: value = a if condition else b. Unlike C/Java's condition ? a : b, Python reads more like English. It is an expression (returns a value), not a statement. Can be nested but shouldn't be for readability: x if a else (y if b else z). Common use: default values, min/max, conditional formatting. Cannot contain statements like print or assignments inside.",
      },
      {
        question: "When should you use early return instead of if-else?",
        difficulty: "Medium",
        hint: "Early return (guard clause) handles edge cases first and returns immediately, reducing nesting. Instead of: if valid: (big block) else: return error, use: if not valid: return error; (big block). Benefits: less indentation, easier to read, clear preconditions. Common in validation: if not data: return None. Reduces cognitive load — the reader doesn't need to track which branch they are in.",
      },
      {
        question: "How does Python handle truthiness in if-else compared to explicit comparisons?",
        difficulty: "Hard",
        hint: "Pythonic: 'if my_list:' (truthy check) vs non-Pythonic: 'if len(my_list) > 0:'. PEP 8 recommends truthy checks for sequences and None checks with 'is'. But explicit comparison is needed when 0 is a valid value: 'if x is not None:' vs 'if x:' (would miss 0, '', []). For booleans, 'if flag:' not 'if flag == True:'. __bool__ and __len__ control custom class truthiness.",
      },
    ],
  },
  {
    id: "python-elif",
    title: "elif Statements",
    slug: "python-elif",
    icon: "GitBranch",
    difficulty: "Beginner",
    description:
      "Chain multiple conditions with elif to handle more than two cases in a clean, readable way.",
    concept: {
      explanation:
        "The elif (short for 'else if') keyword lets you check multiple conditions in sequence. Python evaluates conditions top to bottom and executes the first block whose condition is True, then skips all remaining elif/else blocks. You can have as many elif branches as needed. An optional else at the end catches anything not matched above. Unlike chained if statements, elif is mutually exclusive — only one branch runs. This is Python's alternative to switch/case (though Python 3.10+ also has match/case).",
      realLifeAnalogy:
        "elif is like a grading system at school. The teacher checks your score from highest to lowest: 90+ is an A, 80+ is a B, 70+ is a C, 60+ is a D, and everything else is an F. Once you match a grade, the teacher stops checking — a student with 95 gets A and is not also checked for B, C, D, or F.",
      keyPoints: [
        "elif = else if — checks another condition if the previous was False",
        "Conditions are evaluated top to bottom; first True wins",
        "Only one block executes in an if/elif/else chain",
        "Can have unlimited elif branches",
        "Optional else at the end as a catch-all",
        "More readable than nested if-else chains",
        "Order matters — put most specific/common conditions first",
        "Python 3.10+ also has match/case for structural pattern matching",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Grade calculator with elif
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Score: {score} -> Grade: {grade}")

# Day of the week
day = "Wednesday"

if day == "Monday":
    print("Start of work week")
elif day == "Friday":
    print("TGIF!")
elif day == "Saturday" or day == "Sunday":
    print("Weekend!")
else:
    print(f"{day} — regular work day")

# Temperature ranges
temp = 22

if temp < 0:
    weather = "Freezing"
elif temp < 10:
    weather = "Cold"
elif temp < 20:
    weather = "Cool"
elif temp < 30:
    weather = "Warm"
else:
    weather = "Hot"

print(f"{temp}°C is {weather}")

# BMI calculator
weight = 70  # kg
height = 1.75  # meters
bmi = weight / (height ** 2)

if bmi < 18.5:
    category = "Underweight"
elif bmi < 25:
    category = "Normal"
elif bmi < 30:
    category = "Overweight"
else:
    category = "Obese"

print(f"BMI: {bmi:.1f} -> {category}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between multiple if statements and if/elif?",
        difficulty: "Easy",
        hint: "Multiple if statements are independent — each condition is checked regardless of others. If/elif is mutually exclusive — only the first True branch runs. Example: x=95. Three separate ifs (>=90, >=80, >=70) would match ALL three. if/elif would match only >=90. Use if/elif when conditions are mutually exclusive. Use separate ifs when you need to check independent conditions.",
      },
      {
        question: "How does Python's match/case differ from if/elif chains?",
        difficulty: "Medium",
        hint: "match/case (Python 3.10+, PEP 634) is structural pattern matching, not just value comparison. It can destructure sequences/mappings: match point: case (0, 0): origin; case (x, 0): on x-axis. Supports guards: case x if x > 0. Uses _ as wildcard. Key difference: match/case pattern-matches structure, while if/elif just tests boolean conditions. match/case cannot replace all if/elif — only when matching against patterns/values.",
      },
      {
        question: "How would you refactor a long if/elif chain for better maintainability?",
        difficulty: "Hard",
        hint: "Options: 1) Dictionary mapping: grades = {range(90,101): 'A', ...} — O(1) lookup for exact values. 2) match/case for pattern matching (3.10+). 3) Strategy pattern: dict of functions. 4) For ranges, use bisect module: breakpoints = [60,70,80,90]; grades = 'FDCBA'; grade = grades[bisect(breakpoints, score)]. 5) Polymorphism for type-based branching. Choose based on complexity and readability.",
      },
    ],
  },
  {
    id: "python-nested-conditions",
    title: "Nested Conditions",
    slug: "python-nested-conditions",
    icon: "GitBranch",
    difficulty: "Beginner",
    description:
      "Place if statements inside other if statements to handle complex, multi-level decision making.",
    concept: {
      explanation:
        "Nested conditions are if/elif/else blocks placed inside other if/elif/else blocks. Each level of nesting adds another layer of decision making. The inner condition is only checked when the outer condition is True. While nesting is sometimes necessary, deep nesting (more than 2-3 levels) makes code hard to read and maintain. Prefer flattening with 'and' operators, early returns (guard clauses), or extracting logic into helper functions. Python's indentation makes deep nesting especially visible and arguably harder to follow than in brace-based languages.",
      realLifeAnalogy:
        "Nested conditions are like airport security checkpoints. First, they check your boarding pass (outer if). If valid, you proceed to the baggage scanner (inner if). If your bag passes, you go to the body scanner (deeper nested if). Each check only happens if you passed the previous one. Too many checkpoints (deep nesting) makes the process slow and confusing — better to combine some checks.",
      keyPoints: [
        "An if inside another if creates a nested condition",
        "Inner blocks are indented further (4 + 4 = 8 spaces)",
        "Inner condition only evaluates if outer condition is True",
        "Avoid nesting deeper than 2-3 levels for readability",
        "Flatten with logical operators: if a and b instead of nested ifs",
        "Use early returns / guard clauses to reduce nesting",
        "Extract complex logic into helper functions",
        "Each nesting level increases cognitive complexity",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Basic nested condition
age = 25
has_license = True

if age >= 18:
    if has_license:
        print("You can drive")
    else:
        print("You need a license first")
else:
    print("You are too young to drive")

# Login system
username = "admin"
password = "secret123"
is_active = True

if username == "admin":
    if password == "secret123":
        if is_active:
            print("Login successful!")
        else:
            print("Account is deactivated")
    else:
        print("Wrong password")
else:
    print("User not found")

# Flattened version (better!)
print("\\n--- Flattened version ---")
if username == "admin" and password == "secret123" and is_active:
    print("Login successful!")
elif username != "admin":
    print("User not found")
elif password != "secret123":
    print("Wrong password")
else:
    print("Account is deactivated")

# Number classifier
num = -7

if num != 0:
    if num > 0:
        if num % 2 == 0:
            print(f"{num} is positive and even")
        else:
            print(f"{num} is positive and odd")
    else:
        print(f"{num} is negative")
else:
    print("Number is zero")
`,
    },
    interviewQuestions: [
      {
        question: "Why is deeply nested code considered bad practice?",
        difficulty: "Easy",
        hint: "Deep nesting increases cognitive complexity — readers must track multiple conditions mentally. Each level adds a condition to remember. It makes code harder to test (many paths), debug (hard to trace which branch ran), and modify (adding conditions increases nesting further). PEP 20: 'Flat is better than nested.' Linters like flake8 flag high nesting. Aim for max 2-3 levels.",
      },
      {
        question: "How do you refactor nested conditions using guard clauses?",
        difficulty: "Medium",
        hint: "Guard clauses check for invalid/edge cases first and return early. Instead of: if valid: if has_perm: if active: do_thing(), use: if not valid: return; if not has_perm: return; if not active: return; do_thing(). Benefits: flat structure, clear preconditions, each guard is independent. Works in functions (return), loops (continue), and error handling (raise). The 'happy path' (main logic) stays at the lowest indentation level.",
      },
      {
        question: "When is nesting actually the right choice over flattening?",
        difficulty: "Hard",
        hint: "Nesting is appropriate when: 1) Inner conditions depend on outer results (checking attributes of a found object). 2) Different logic needed at each level (not just validation). 3) The nested structure mirrors the problem domain (decision trees). 4) Flattening would require repeating expensive operations. 5) Using with/try blocks that naturally nest. The key is 'essential' vs 'accidental' complexity — nest when the problem is inherently hierarchical.",
      },
    ],
  },
  {
    id: "python-for-loop",
    title: "for Loop",
    slug: "python-for-loop",
    icon: "Repeat",
    difficulty: "Beginner",
    description:
      "Iterate over sequences like lists, strings, ranges, and dictionaries using Python's powerful for loop.",
    concept: {
      explanation:
        "Python's for loop iterates over any iterable — lists, strings, tuples, dicts, sets, ranges, files, generators, and custom iterables. The syntax is: for variable in iterable: block. Unlike C-style for loops, Python's for is actually a 'for-each' loop. The range() function generates number sequences: range(stop), range(start, stop), range(start, stop, step). Use enumerate() to get both index and value, zip() to iterate over multiple sequences, and reversed()/sorted() for order control. The for loop also supports an optional else clause that runs when the loop completes without hitting a break.",
      realLifeAnalogy:
        "A for loop is like a teacher taking attendance from a class list. The teacher goes through each name on the list (iterable), one by one (iteration), calls out the name (loop variable), and marks attendance (loop body). The teacher doesn't skip anyone and stops when the list is done. range() is like saying 'count from 1 to 30' instead of having a written list.",
      keyPoints: [
        "for variable in iterable: — iterates over any iterable",
        "range(n) generates 0, 1, ..., n-1",
        "range(start, stop, step) for custom sequences",
        "enumerate() gives (index, value) pairs",
        "zip() iterates over multiple iterables in parallel",
        "Strings, lists, tuples, dicts, sets are all iterable",
        "for-else: else block runs if no break occurred",
        "Use _ as variable name when value is unused",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Iterate over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Using range()
print("\\nCounting 1-5:")
for i in range(1, 6):
    print(i, end=" ")
print()

# Iterate over a string
print("\\nLetters in 'Python':")
for char in "Python":
    print(char, end=" ")
print()

# enumerate() — index + value
print("\\nWith index:")
colors = ["red", "green", "blue"]
for idx, color in enumerate(colors):
    print(f"  {idx}: {color}")

# zip() — parallel iteration
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# Dictionary iteration
print("\\nDictionary:")
person = {"name": "Alice", "age": 30, "city": "NYC"}
for key, value in person.items():
    print(f"  {key}: {value}")

# Nested for loop — multiplication table
print("\\n3x3 Table:")
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i*j:4}", end="")
    print()
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between range() and list(range())?",
        difficulty: "Easy",
        hint: "range() returns a range object — a lazy iterable that generates numbers on demand without storing them all in memory. list(range()) materializes all numbers into an actual list in memory. range(1_000_000) uses constant memory regardless of size; list(range(1_000_000)) uses ~8MB. range objects support indexing, slicing, len(), in, and iteration. Always prefer range() in for loops — never do for i in list(range(n)).",
      },
      {
        question: "How does the for-else construct work?",
        difficulty: "Medium",
        hint: "The else block after a for loop runs only if the loop completed normally (no break). If break is hit, else is skipped. Common use: searching — for item in items: if match: break; else: print('not found'). Think of else as 'no-break'. It's a Pythonic pattern that avoids flag variables. Without for-else, you'd need: found = False; for ...: if match: found = True; break; if not found: handle_missing.",
      },
      {
        question: "What is the difference between iterables and iterators in Python?",
        difficulty: "Hard",
        hint: "An iterable has __iter__() that returns an iterator (list, str, dict, range). An iterator has __next__() that returns the next value and raises StopIteration when done. Lists are iterable but not iterators — iter([1,2,3]) creates a list_iterator. Iterators are single-pass and stateful; iterables can be iterated multiple times. Generators are iterators. for loop calls iter() on the iterable, then repeatedly calls next() on the iterator. This protocol enables lazy evaluation.",
      },
    ],
  },
  {
    id: "python-while-loop",
    title: "while Loop",
    slug: "python-while-loop",
    icon: "Repeat",
    difficulty: "Beginner",
    description:
      "Repeat a block of code as long as a condition remains true — ideal for loops where the number of iterations is unknown.",
    concept: {
      explanation:
        "The while loop repeatedly executes a block as long as its condition is True. Unlike for loops (which iterate over a known sequence), while loops are used when you don't know how many iterations you need in advance. The condition is checked before each iteration — if False initially, the body never runs. You must ensure the condition eventually becomes False to avoid infinite loops. Common patterns include counting loops (while i < n), sentinel loops (while input != 'quit'), and convergence loops (while error > threshold). Like for loops, while also supports an optional else clause.",
      realLifeAnalogy:
        "A while loop is like a fisherman at a lake. He keeps casting his line (loop body) as long as he hasn't caught a fish yet (condition is True). He checks after each cast whether he caught one. He might catch one on the first try or the hundredth. If the lake has no fish (condition never met), he could be there forever — that's an infinite loop. He needs a backup plan: leave after 2 hours regardless (adding a counter or break condition).",
      keyPoints: [
        "while condition: — repeats as long as condition is True",
        "Condition checked before each iteration (pre-test loop)",
        "If condition is False initially, body never executes",
        "Must modify something to eventually make condition False",
        "Infinite loop: while True: ... break (common pattern)",
        "while-else: else runs when condition becomes False (no break)",
        "Use for loops when iterating over a known sequence",
        "Use while loops when iterations depend on a runtime condition",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Basic countdown
count = 5
while count > 0:
    print(count, end=" ")
    count -= 1
print("Go!")

# Sum until threshold
print("\\n--- Sum until >= 100 ---")
total = 0
num = 1
while total < 100:
    total += num
    num += 1
print(f"Sum = {total}, needed {num - 1} numbers")

# Input simulation (sentinel value)
commands = ["start", "process", "save", "quit", "ignored"]
i = 0
print("\\n--- Command processor ---")
while i < len(commands):
    cmd = commands[i]
    i += 1
    if cmd == "quit":
        print("Exiting...")
        break
    print(f"Running: {cmd}")

# while True + break pattern
print("\\n--- Guess the number ---")
secret = 7
guesses = [3, 5, 7]
attempt = 0
while True:
    guess = guesses[attempt]
    attempt += 1
    if guess == secret:
        print(f"Correct! Got it in {attempt} tries")
        break
    print(f"Guess {guess} is wrong")

# while-else
print("\\n--- while-else ---")
n = 10
while n > 0:
    n -= 3
    print(n, end=" ")
else:
    print("\\nLoop ended normally (no break)")
`,
    },
    interviewQuestions: [
      {
        question: "When should you use a while loop vs a for loop?",
        difficulty: "Easy",
        hint: "Use for when iterating over a known sequence (list, range, string) or when you know the number of iterations. Use while when the number of iterations is unknown and depends on a condition: user input, convergence algorithms, reading until EOF, game loops. Rule of thumb: if you can express it as 'for each item in collection', use for. If it's 'keep going until X happens', use while.",
      },
      {
        question: "How do you prevent infinite loops and what causes them?",
        difficulty: "Medium",
        hint: "Causes: forgetting to update the loop variable, condition that can never be False, off-by-one errors. Prevention: 1) Always modify the condition variable in the body. 2) Add a max-iteration safety counter. 3) Use while True + break for complex exit conditions. 4) Consider using for with range as a bounded alternative. Debug: add print(condition_var) in loop body. In production, use timeouts or watchdog patterns.",
      },
      {
        question: "How does Python's while-else differ from try-else?",
        difficulty: "Hard",
        hint: "while-else: else runs when condition becomes False naturally (no break). try-else: else runs when no exception was raised. Both use else as 'nothing went wrong' clause. while-else is useful for search patterns: while items: if found: break; else: not_found(). try-else separates 'might fail' from 'only if succeeded'. In both cases, else means 'the normal/happy path completed'. break skips while-else; exceptions skip try-else.",
      },
    ],
  },
  {
    id: "python-break-continue",
    title: "break and continue",
    slug: "python-break-continue",
    icon: "SkipForward",
    difficulty: "Beginner",
    description:
      "Control loop execution flow with break to exit early and continue to skip to the next iteration.",
    concept: {
      explanation:
        "break and continue are loop control statements. break immediately terminates the innermost loop and continues with the statement after the loop. continue skips the rest of the current iteration and jumps to the next iteration (back to the condition check in while, or the next item in for). Both work in for and while loops. In nested loops, they only affect the innermost loop. break is commonly used for early exit when a condition is met (search found). continue is used to skip certain items (filter pattern). Overuse of break/continue can make loops harder to follow — consider refactoring with functions or comprehensions.",
      realLifeAnalogy:
        "Imagine reading a book chapter by chapter. 'continue' is like flipping past a chapter you already know — you skip it and go to the next one. 'break' is like finding exactly what you were looking for in chapter 5 — you close the book entirely, no need to read chapters 6-10. In both cases, you are controlling how you move through the book, not changing the book itself.",
      keyPoints: [
        "break — exits the innermost loop immediately",
        "continue — skips remaining body, goes to next iteration",
        "Both work in for and while loops",
        "In nested loops, they only affect the innermost loop",
        "break skips the else clause of for/while loops",
        "continue does NOT skip the else clause",
        "Common break pattern: search and exit early",
        "Common continue pattern: skip invalid items (filter)",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# break — exit loop early
print("--- break example ---")
for num in range(1, 11):
    if num == 6:
        print(f"Found {num}, stopping!")
        break
    print(num, end=" ")
print()

# continue — skip iteration
print("\\n--- continue: skip even numbers ---")
for num in range(1, 11):
    if num % 2 == 0:
        continue
    print(num, end=" ")
print()

# Search with break + for-else
print("\\n--- Search with break ---")
names = ["Alice", "Bob", "Charlie", "Diana"]
target = "Charlie"
for name in names:
    if name == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} not found")

# continue to filter
print("\\n--- Skip negative numbers ---")
numbers = [10, -5, 3, -1, 8, -2, 6]
total = 0
for n in numbers:
    if n < 0:
        continue
    total += n
print(f"Sum of positives: {total}")

# break in while loop
print("\\n--- Password attempts ---")
passwords = ["wrong1", "wrong2", "correct", "wrong3"]
attempt = 0
while attempt < len(passwords):
    pw = passwords[attempt]
    attempt += 1
    if pw == "correct":
        print(f"Access granted on attempt {attempt}")
        break
    print(f"Attempt {attempt}: wrong password")
`,
    },
    interviewQuestions: [
      {
        question: "What happens to the for-else clause when break is used vs continue?",
        difficulty: "Easy",
        hint: "break causes the else clause to be SKIPPED — the loop did not complete normally. continue does NOT affect the else clause — the loop still completes normally (continue just skips the rest of the current iteration, not the whole loop). So: for x in items: if found: break; else: not_found() — else only runs if break was never hit. This is the primary use case for for-else.",
      },
      {
        question: "How do break and continue work in nested loops?",
        difficulty: "Medium",
        hint: "break and continue only affect the INNERMOST loop. To break out of multiple nested loops, use: 1) A flag variable. 2) Extract into a function and use return. 3) Use exceptions (for deeply nested or complex cases). 4) itertools.product() to flatten nested loops. Python has no labeled break (unlike Java). Example: for i in range(3): for j in range(3): if condition: break — only breaks the j loop.",
      },
      {
        question: "When should you avoid break/continue and what alternatives exist?",
        difficulty: "Hard",
        hint: "Avoid when: 1) Multiple break/continue make flow hard to trace. 2) The logic is better expressed as a comprehension: [x for x in items if x > 0] replaces continue pattern. 3) any()/all() replace break-on-found: any(is_valid(x) for x in items). 4) itertools.takewhile/dropwhile for prefix/suffix patterns. 5) next(iter, default) for finding first match. Prefer declarative style over imperative control flow when possible.",
      },
    ],
  },
  {
    id: "python-pass-statement",
    title: "pass Statement",
    slug: "python-pass-statement",
    icon: "MinusCircle",
    difficulty: "Beginner",
    description:
      "Use pass as a placeholder in empty code blocks — essential for stubs, interfaces, and incremental development.",
    concept: {
      explanation:
        "The pass statement is a null operation — it does absolutely nothing. It is used as a placeholder where Python syntax requires a statement but no action is needed. Without pass, an empty if/for/while/function/class body would cause an IndentationError or SyntaxError. Common uses include: empty function/class stubs during development, empty except blocks (catch and ignore exceptions), placeholder implementations in abstract base classes, and empty loop bodies. The ellipsis literal (...) is sometimes used as an alternative to pass in type stubs and abstract methods, though it has a slightly different semantic meaning.",
      realLifeAnalogy:
        "pass is like a 'Reserved' sign on a restaurant table. The table exists and has a place in the restaurant (valid syntax), but nobody is sitting there yet (no code). It tells the restaurant (Python interpreter) that this spot is intentionally left empty, not accidentally forgotten. You will fill it later when the guests (actual code) arrive.",
      keyPoints: [
        "pass is a null operation — does nothing at all",
        "Required where syntax demands a statement but no action is needed",
        "Common in empty functions, classes, if/for/while blocks",
        "Prevents IndentationError in empty blocks",
        "Used as a TODO placeholder during development",
        "Empty except: pass — catches and silently ignores exceptions",
        "Ellipsis (...) is an alternative in type stubs",
        "pass in production code may indicate incomplete implementation",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Empty function stub
def calculate_tax():
    pass  # TODO: implement later

# Empty class stub
class Animal:
    pass

# Using pass in conditionals
age = 15

if age >= 18:
    pass  # handle adult — not implemented yet
else:
    print(f"Age {age}: minor — this part works!")

# pass in a loop
print("\\n--- Skip even, print odd ---")
for i in range(1, 6):
    if i % 2 == 0:
        pass  # do nothing for even numbers
    else:
        print(f"Odd: {i}")

# Empty except (catch and ignore)
try:
    result = 10 / 0
except ZeroDivisionError:
    pass  # silently ignore the error

print("\\nProgram continues after ignored error")

# Using pass vs ellipsis
class Shape:
    def area(self):
        pass  # placeholder

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

c = Circle(5)
print(f"\\nCircle area: {c.area():.2f}")

# Demonstrating that pass truly does nothing
print("\\nBefore pass")
pass
print("After pass — nothing happened in between!")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between pass and continue?",
        difficulty: "Easy",
        hint: "pass does nothing — execution continues to the next statement. continue skips the rest of the loop body and jumps to the next iteration. In a loop: 'for x in items: if cond: pass; print(x)' — pass does nothing, print STILL runs. 'for x in items: if cond: continue; print(x)' — continue skips print for that iteration. pass is a no-op; continue is a control flow statement.",
      },
      {
        question: "When is using pass in except blocks acceptable vs dangerous?",
        difficulty: "Medium",
        hint: "Acceptable: 1) Ignoring specific, expected exceptions: except FileNotFoundError: pass. 2) Optional features: try: import ujson; except: import json. Dangerous: 1) Bare except: pass — silently catches ALL errors including KeyboardInterrupt, SystemExit. 2) Hiding bugs by ignoring unexpected exceptions. Best practice: log the exception even if you don't re-raise it. Use except SpecificError: pass, never bare except: pass.",
      },
      {
        question: "What is the difference between pass and the Ellipsis literal (...)?",
        difficulty: "Hard",
        hint: "pass is a statement (no-op). Ellipsis (...) is a value (the Ellipsis singleton). Both work as placeholders in function/class bodies, but ... is preferred in type stubs (.pyi files) and abstract methods. ... has additional uses: type hints (Callable[..., int]), NumPy slicing (arr[..., 0]), and as a sentinel value. 'def f(): pass' vs 'def f(): ...' — both valid, ... is more 'type stub style'. In production code, pass is more conventional.",
      },
    ],
  },

  // ─── Level 3: Functions ─────────────────────────────────────────────────────
  {
    id: "python-functions",
    title: "Python Functions",
    slug: "python-functions",
    icon: "FunctionSquare",
    difficulty: "Beginner",
    description:
      "Learn how to define and call functions — reusable blocks of code that organize your program into logical units.",
    concept: {
      explanation:
        "A function is a named block of reusable code defined with the def keyword. Functions accept inputs (parameters), perform operations, and optionally return outputs. They follow the DRY principle (Don't Repeat Yourself) by encapsulating logic that can be called multiple times. Every function in Python returns something — if no explicit return, it returns None. Functions are first-class objects in Python, meaning they can be assigned to variables, passed as arguments, and returned from other functions. Function names follow snake_case convention per PEP 8.",
      realLifeAnalogy:
        "A function is like a recipe in a cookbook. The recipe name is the function name, the ingredients list is the parameters, the cooking steps are the function body, and the finished dish is the return value. You write the recipe once and follow it whenever you want to make that dish — you don't rewrite the instructions each time.",
      keyPoints: [
        "Defined with def function_name(parameters):",
        "Function body is indented (4 spaces)",
        "Call with function_name(arguments)",
        "Returns None if no explicit return statement",
        "Functions are first-class objects in Python",
        "Use snake_case for function names (PEP 8)",
        "Docstrings describe what the function does",
        "Functions create their own local scope",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Define a simple function
def greet(name):
    """Greet a person by name."""
    print(f"Hello, {name}!")

# Call the function
greet("Alice")
greet("Bob")

# Function with multiple statements
def describe_pet(name, animal_type):
    """Display info about a pet."""
    print(f"\\nI have a {animal_type}.")
    print(f"My {animal_type}'s name is {name}.")

describe_pet("Max", "dog")
describe_pet("Whiskers", "cat")

# Function that returns None implicitly
def say_hello():
    print("Hello!")

result = say_hello()
print(f"Return value: {result}")

# Function with docstring
def calculate_area(length, width):
    """Calculate the area of a rectangle.

    Args:
        length: The length of the rectangle.
        width: The width of the rectangle.

    Returns:
        The area as a float.
    """
    return length * width

area = calculate_area(5, 3)
print(f"\\nArea: {area}")
print(f"Docstring: {calculate_area.__doc__.strip().split(chr(10))[0]}")
`,
    },
    interviewQuestions: [
      {
        question: "What happens when a function has no return statement?",
        difficulty: "Easy",
        hint: "Every Python function returns something. If there is no explicit return statement, or if return is used without a value, the function returns None. This is implicit — result = my_func() will be None. You can verify with print(my_func()) or type(my_func()). This is different from languages like C where a void function returns nothing.",
      },
      {
        question: "What are first-class functions and how does Python support them?",
        difficulty: "Medium",
        hint: "First-class means functions are treated as objects: they can be assigned to variables (f = len), passed as arguments (map(str, items)), returned from functions (def make_adder(n): return lambda x: x+n), stored in data structures ([len, str, int]), and have attributes (__name__, __doc__). This enables functional patterns: decorators, callbacks, strategy pattern. All functions in Python are first-class — there's no special syntax needed.",
      },
      {
        question: "How do Python's scoping rules (LEGB) affect functions?",
        difficulty: "Hard",
        hint: "LEGB = Local, Enclosing, Global, Built-in. Python searches for names in this order. Local: variables inside the current function. Enclosing: variables in outer functions (closures). Global: module-level variables. Built-in: Python built-ins (print, len). Use 'global' keyword to modify global vars from a function. Use 'nonlocal' to modify enclosing scope vars. Without these keywords, assignment creates a NEW local variable (won't modify outer scope).",
      },
    ],
  },
  {
    id: "python-function-arguments",
    title: "Function Arguments",
    slug: "python-function-arguments",
    icon: "FunctionSquare",
    difficulty: "Beginner",
    description:
      "Understand how to pass data to functions using positional arguments, and the difference between parameters and arguments.",
    concept: {
      explanation:
        "Parameters are the variable names in a function definition; arguments are the actual values passed when calling the function. Positional arguments are matched left to right — the first argument goes to the first parameter, the second to the second, and so on. The number of arguments must match the number of parameters (unless defaults are used). Python evaluates arguments before passing them to the function. Arguments are passed by assignment — the parameter name is bound to the argument object. For mutable objects (lists, dicts), changes inside the function affect the original object.",
      realLifeAnalogy:
        "Parameters are like empty boxes with labels on a factory assembly line. Arguments are the actual items you place into those boxes. The first item goes in the first box, the second in the second box. If you have 3 labeled boxes but only bring 2 items, the factory (Python) complains — every box needs to be filled.",
      keyPoints: [
        "Parameters: names in the function definition",
        "Arguments: values passed in the function call",
        "Positional arguments matched left to right",
        "Must pass the correct number of arguments",
        "Arguments are passed by assignment (object reference)",
        "Mutable objects can be modified inside the function",
        "Immutable objects cannot be changed (new local binding)",
        "Use descriptive parameter names for clarity",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Parameters vs Arguments
def add(a, b):        # a, b are parameters
    return a + b

result = add(3, 5)    # 3, 5 are arguments
print(f"3 + 5 = {result}")

# Positional arguments — order matters
def power(base, exponent):
    return base ** exponent

print(f"2^3 = {power(2, 3)}")
print(f"3^2 = {power(3, 2)}")  # Different result!

# Multiple arguments
def introduce(first_name, last_name, age):
    print(f"I'm {first_name} {last_name}, age {age}")

introduce("Alice", "Smith", 30)

# Mutable vs Immutable argument passing
def modify_list(my_list):
    my_list.append(4)  # Modifies the original!

def modify_number(n):
    n = n + 10  # Creates new local binding

numbers = [1, 2, 3]
modify_list(numbers)
print(f"\\nList after modify: {numbers}")

x = 5
modify_number(x)
print(f"Number after modify: {x}")  # Unchanged!

# Wrong number of arguments
# add(1)       # TypeError: missing 1 required argument
# add(1, 2, 3) # TypeError: takes 2 positional arguments
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between parameters and arguments?",
        difficulty: "Easy",
        hint: "Parameters are variables listed in the function definition — they are placeholders. Arguments are the actual values passed to the function when calling it. def greet(name): — 'name' is a parameter. greet('Alice') — 'Alice' is an argument. Think: parameters are the parking spaces, arguments are the cars. Some use 'formal parameters' and 'actual parameters' as synonyms.",
      },
      {
        question: "Is Python pass-by-value or pass-by-reference?",
        difficulty: "Medium",
        hint: "Neither — Python uses 'pass by assignment' (or 'pass by object reference'). The parameter becomes a new reference to the same object. For immutable objects (int, str, tuple), you can't modify the original — reassignment creates a new local object. For mutable objects (list, dict, set), you CAN modify the original through the reference (append, update). But reassigning the parameter itself (my_list = []) only rebinds the local name.",
      },
      {
        question: "How can you prevent a function from modifying a mutable argument?",
        difficulty: "Hard",
        hint: "Options: 1) Pass a copy: func(my_list.copy()) or func(my_list[:]). 2) Use copy.deepcopy() for nested structures. 3) Convert to immutable: func(tuple(my_list)). 4) Copy inside the function: local = list(param). 5) Use frozen types (frozenset). 6) Type hints + conventions (don't enforce but document). For dicts: func(dict(my_dict)) or {**my_dict}. The key principle: defensive copying at the boundary.",
      },
    ],
  },
  {
    id: "python-default-arguments",
    title: "Default Arguments",
    slug: "python-default-arguments",
    icon: "FunctionSquare",
    difficulty: "Beginner",
    description:
      "Set default values for function parameters so callers can omit arguments when the default is acceptable.",
    concept: {
      explanation:
        "Default arguments let you specify a fallback value for a parameter. If the caller doesn't provide that argument, the default is used. Parameters with defaults must come AFTER parameters without defaults in the function definition. Default values are evaluated only ONCE at function definition time — this is a critical gotcha with mutable defaults. Using a mutable default (like a list or dict) is a common Python bug because all calls share the same object. The convention is to use None as default and create the mutable object inside the function.",
      realLifeAnalogy:
        "Default arguments are like a coffee order with customization options. If you just say 'coffee', you get the default: medium size, regular milk, no sugar. But you can override any of those: 'large coffee with oat milk'. The defaults save you from specifying every detail when the standard options work fine.",
      keyPoints: [
        "def func(param=default_value): sets a default",
        "Defaults must come after non-default parameters",
        "Caller can override the default or omit the argument",
        "Defaults are evaluated ONCE at definition time",
        "NEVER use mutable defaults (list, dict, set)",
        "Use None as default for mutable types, create inside",
        "Default values stored in func.__defaults__",
        "Common pattern: def func(items=None): items = items or []",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Basic default arguments
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Uses default
greet("Bob", "Hey")         # Overrides default

# Multiple defaults
def create_profile(name, age=25, city="Unknown"):
    print(f"{name}, age {age}, from {city}")

print("\\n--- Profiles ---")
create_profile("Alice")
create_profile("Bob", 30)
create_profile("Charlie", 28, "NYC")

# DANGER: Mutable default argument
def bad_append(item, my_list=[]):
    my_list.append(item)
    return my_list

print("\\n--- Mutable default bug ---")
print(bad_append(1))  # [1]
print(bad_append(2))  # [1, 2] — Bug! Same list!
print(bad_append(3))  # [1, 2, 3] — Keeps growing!

# CORRECT: Use None pattern
def good_append(item, my_list=None):
    if my_list is None:
        my_list = []
    my_list.append(item)
    return my_list

print("\\n--- None pattern (correct) ---")
print(good_append(1))  # [1]
print(good_append(2))  # [2] — Fresh list each time!
print(good_append(3))  # [3]

# Check where defaults are stored
print(f"\\nDefaults: {greet.__defaults__}")
`,
    },
    interviewQuestions: [
      {
        question: "Why are mutable default arguments dangerous in Python?",
        difficulty: "Easy",
        hint: "Default values are evaluated ONCE when the function is defined, not each time it's called. So def f(lst=[]): creates ONE list object shared by ALL calls. Each call that mutates the default (append, update) permanently changes it. Fix: use None as default and create the object inside: def f(lst=None): lst = lst if lst is not None else []. This is one of the most common Python gotchas.",
      },
      {
        question: "How does Python store and evaluate default argument values?",
        difficulty: "Medium",
        hint: "Defaults are stored in __defaults__ (positional) and __kwdefaults__ (keyword-only) tuples on the function object. They are evaluated left-to-right at def time. This means: def f(x=time.time()): always returns the SAME timestamp. You can inspect them: f.__defaults__. This is by design — it enables caching patterns (def f(cache={})). But it's a trap for mutable types. Late binding alternative: use None sentinel + internal creation.",
      },
      {
        question: "Can a default argument depend on a previous parameter?",
        difficulty: "Hard",
        hint: "No — default values cannot reference other parameters because defaults are evaluated at definition time, not call time. def f(a, b=a) is a NameError. Workaround: use None and resolve inside: def f(a, b=None): b = b if b is not None else a. In Python 3.12+, PEP 671 proposes late-bound defaults (def f(a, b=>a)) but it's not yet accepted. For now, the None sentinel pattern is the standard approach.",
      },
    ],
  },
  {
    id: "python-keyword-arguments",
    title: "Keyword Arguments",
    slug: "python-keyword-arguments",
    icon: "FunctionSquare",
    difficulty: "Beginner",
    description:
      "Call functions using named arguments for clarity and flexibility — specify which parameter gets which value.",
    concept: {
      explanation:
        "Keyword arguments are passed using the parameter name: func(name='Alice'). They can be in any order, making code more readable. You can mix positional and keyword arguments, but positional must come first. Python also supports keyword-only parameters (after * in the definition) that MUST be passed by name. The / separator marks positional-only parameters (before /). These enforce how callers use the function, improving API design.",
      realLifeAnalogy:
        "Keyword arguments are like filling out a form with labeled fields. Instead of writing values in a strict order (positional), you write the field name next to each value: 'Name: Alice, Age: 30, City: NYC'. The order doesn't matter because each value is clearly labeled. Some fields might be required (positional-only), some must be filled by name (keyword-only).",
      keyPoints: [
        "Syntax: func(param_name=value)",
        "Can be passed in any order",
        "Positional arguments must come before keyword arguments",
        "Keyword-only params: after * in definition",
        "Positional-only params: before / in definition (Python 3.8+)",
        "Improves readability for functions with many params",
        "Prevents confusion about argument order",
        "Can combine with default values",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Keyword arguments — any order
def describe(name, age, city):
    print(f"{name}, {age} years old, from {city}")

describe(name="Alice", age=30, city="NYC")
describe(city="London", name="Bob", age=25)  # Any order!

# Mixing positional and keyword
describe("Charlie", city="Paris", age=28)

# Keyword-only parameters (after *)
def connect(host, port, *, timeout=30, verbose=False):
    print(f"Connecting to {host}:{port}")
    print(f"  timeout={timeout}, verbose={verbose}")

print("\\n--- Keyword-only params ---")
connect("localhost", 8080)
connect("localhost", 8080, timeout=60, verbose=True)
# connect("localhost", 8080, 60)  # TypeError!

# Positional-only parameters (before /)
def divide(a, b, /):
    return a / b

print(f"\\n10 / 3 = {divide(10, 3):.2f}")
# divide(a=10, b=3)  # TypeError: positional-only!

# Combined: positional-only / regular * keyword-only
def create_user(id, /, name, *, role="user"):
    print(f"User #{id}: {name} ({role})")

print("\\n--- Combined ---")
create_user(1, "Alice")
create_user(2, name="Bob", role="admin")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between positional and keyword arguments?",
        difficulty: "Easy",
        hint: "Positional: matched by position (order matters). func(1, 2) — 1 goes to first param, 2 to second. Keyword: matched by name (order doesn't matter). func(b=2, a=1). You can mix them: func(1, b=2) but positional must come first. func(a=1, 2) is a SyntaxError. Use keyword args when: many parameters, boolean flags, or when order is confusing.",
      },
      {
        question: "What are keyword-only and positional-only parameters?",
        difficulty: "Medium",
        hint: "Keyword-only: params after * in definition. def f(a, *, b): — b MUST be passed as f(1, b=2), not f(1, 2). Useful for boolean flags and config. Positional-only: params before / (Python 3.8+). def f(a, /): — a MUST be passed as f(1), not f(a=1). Useful when param names are implementation details. Combined: def f(pos, /, normal, *, kw): — pos is positional-only, normal is either, kw is keyword-only.",
      },
      {
        question: "How do / and * interact in function signatures and why use them?",
        difficulty: "Hard",
        hint: "def f(a, b, /, c, d, *, e, f): — a,b positional-only; c,d either; e,f keyword-only. Why /: prevents callers from depending on parameter names (can rename without breaking API), enables kwargs to use those names: def f(name, /, **kwargs): kwargs can have 'name' key. Why *: forces explicitness for boolean flags (readable=True vs True), prevents positional arg confusion. Both are API design tools — see Python's own builtins: len(obj, /) uses positional-only.",
      },
    ],
  },
  {
    id: "python-args-kwargs",
    title: "*args and **kwargs",
    slug: "python-args-kwargs",
    icon: "FunctionSquare",
    difficulty: "Intermediate",
    description:
      "Accept a variable number of arguments with *args (positional) and **kwargs (keyword) for flexible function signatures.",
    concept: {
      explanation:
        "*args collects extra positional arguments into a tuple. **kwargs collects extra keyword arguments into a dictionary. Together, they let a function accept any number of arguments. The names 'args' and 'kwargs' are convention — the * and ** prefixes are what matter. The order in a function definition must be: regular params, *args, keyword-only params, **kwargs. You can also use * and ** to unpack sequences and dicts when calling functions: func(*my_list, **my_dict).",
      realLifeAnalogy:
        "*args is like a 'and anything else you want to add' option on a pizza order — you can add as many extra toppings as you want. **kwargs is like a 'special instructions' field where you write labeled requests: 'extra cheese: yes, well done: true'. Together, they make the order form accept anything the customer wants.",
      keyPoints: [
        "*args collects extra positional args as a tuple",
        "**kwargs collects extra keyword args as a dict",
        "Names are convention — * and ** are the operators",
        "Order: params, *args, keyword-only, **kwargs",
        "*list unpacks a list into positional arguments",
        "**dict unpacks a dict into keyword arguments",
        "Useful for decorators, wrappers, and flexible APIs",
        "Can combine with regular and default parameters",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# *args — variable positional arguments
def add_all(*args):
    print(f"args = {args} (type: {type(args).__name__})")
    return sum(args)

print(f"Sum: {add_all(1, 2, 3)}")
print(f"Sum: {add_all(10, 20, 30, 40)}")

# **kwargs — variable keyword arguments
def print_info(**kwargs):
    print(f"kwargs = {kwargs}")
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

print("\\n--- kwargs ---")
print_info(name="Alice", age=30, city="NYC")

# Combining regular, *args, and **kwargs
def log(level, *args, **kwargs):
    print(f"[{level}] {' '.join(str(a) for a in args)}")
    if kwargs:
        for k, v in kwargs.items():
            print(f"  {k}={v}")

print("\\n--- Combined ---")
log("INFO", "Server started", port=8080, debug=True)

# Unpacking with * and **
def greet(first, last, greeting="Hello"):
    print(f"{greeting}, {first} {last}!")

print("\\n--- Unpacking ---")
names = ["Alice", "Smith"]
greet(*names)  # Unpacks list into positional args

config = {"first": "Bob", "last": "Jones", "greeting": "Hey"}
greet(**config)  # Unpacks dict into keyword args

# Forwarding arguments (decorator pattern)
def wrapper(func):
    def inner(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return inner

@wrapper
def multiply(a, b):
    return a * b

print(f"\\n{multiply(3, 4)}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between *args and **kwargs?",
        difficulty: "Easy",
        hint: "*args collects extra POSITIONAL arguments into a TUPLE. **kwargs collects extra KEYWORD arguments into a DICTIONARY. func(1, 2, name='Alice'): args=(1,2), kwargs={'name':'Alice'}. The names are convention — *numbers and **options work too. They must appear in order: def f(a, *args, **kwargs). You can't have **kwargs before *args.",
      },
      {
        question: "How do * and ** work for unpacking in function calls?",
        difficulty: "Medium",
        hint: "*iterable unpacks into positional args: f(*[1,2,3]) = f(1,2,3). **dict unpacks into keyword args: f(**{'a':1,'b':2}) = f(a=1,b=2). Can combine: f(*args, **kwargs). Can unpack multiple: f(*list1, *list2). Since Python 3.5+ (PEP 448), can use in literals too: [*a, *b], {**d1, **d2}. This is how decorators forward arguments: def wrapper(*args, **kwargs): return func(*args, **kwargs).",
      },
      {
        question: "What is the complete parameter order in a Python function signature?",
        difficulty: "Hard",
        hint: "Full order: def f(pos_only, /, normal, default=val, *args, kw_only, kw_default=val, **kwargs). 1) Positional-only (before /). 2) Regular positional-or-keyword. 3) Regular with defaults. 4) *args (collects remaining positional). 5) Keyword-only (after * or *args). 6) Keyword-only with defaults. 7) **kwargs (collects remaining keyword). Example: def f(a, /, b, c=1, *args, d, e=2, **kwargs). Not all are needed — use what makes your API clear.",
      },
    ],
  },
  {
    id: "python-return-values",
    title: "Return Values",
    slug: "python-return-values",
    icon: "FunctionSquare",
    difficulty: "Beginner",
    description:
      "Control what your functions send back to the caller using return statements — including multiple values and early returns.",
    concept: {
      explanation:
        "The return statement exits the function and sends a value back to the caller. You can return any type: numbers, strings, lists, dicts, functions, or even None. Python can return multiple values using tuple packing: return a, b, c (which the caller can unpack). A function can have multiple return statements (early returns for guard clauses). Code after return is unreachable. If no return is hit, the function returns None. The return value can be used in expressions, assignments, or ignored entirely.",
      realLifeAnalogy:
        "A return value is like the output of a vending machine. You put in your selection (arguments), the machine processes it (function body), and delivers your item (return value). Some machines give you one item, some give you an item plus change (multiple returns), and some just do something without giving anything back (printing a receipt = side effect, returns None).",
      keyPoints: [
        "return exits the function and sends a value back",
        "Can return any type (int, str, list, dict, function, etc.)",
        "return a, b returns a tuple (multiple values)",
        "Caller unpacks with x, y = func()",
        "No return or bare return → returns None",
        "Early return: exit function before reaching the end",
        "Code after return is unreachable (dead code)",
        "Can return in a loop to exit both loop and function",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Basic return
def square(n):
    return n ** 2

result = square(5)
print(f"5² = {result}")

# Return multiple values (tuple)
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([3, 1, 7, 2, 9])
print(f"Min: {low}, Max: {high}")

# Return different types based on condition
def divide_safe(a, b):
    if b == 0:
        return None  # Can't divide by zero
    return a / b

print(f"\\n10 / 3 = {divide_safe(10, 3):.2f}")
print(f"10 / 0 = {divide_safe(10, 0)}")

# Early return (guard clause)
def get_grade(score):
    if score < 0 or score > 100:
        return "Invalid score"
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    if score >= 70:
        return "C"
    return "F"

print(f"\\n85 -> {get_grade(85)}")
print(f"92 -> {get_grade(92)}")
print(f"150 -> {get_grade(150)}")

# Return a function
def make_multiplier(factor):
    def multiply(n):
        return n * factor
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)
print(f"\\ndouble(5) = {double(5)}")
print(f"triple(5) = {triple(5)}")
`,
    },
    interviewQuestions: [
      {
        question: "How does Python return multiple values from a function?",
        difficulty: "Easy",
        hint: "Python uses tuple packing: 'return a, b, c' creates a tuple (a, b, c). The caller can unpack: x, y, z = func(). You can also return a list, dict, or namedtuple for more structure. Under the hood, 'return 1, 2' is the same as 'return (1, 2)'. You can use _ to ignore values: _, max_val = min_max(data). With Python 3.8+, walrus operator can capture the whole tuple too.",
      },
      {
        question: "What is the difference between return and print?",
        difficulty: "Medium",
        hint: "return sends a value to the caller — it can be stored, used in expressions, and passed to other functions. print displays text to the console — it always returns None. result = func() stores the return value. print is a side effect. In interactive Python, both show output, which confuses beginners. Key test: can you do math with it? square(5) * 2 works (return). A function that prints but doesn't return makes its result unusable by other code.",
      },
      {
        question: "How do early returns improve code quality and what are the tradeoffs?",
        difficulty: "Hard",
        hint: "Early returns (guard clauses) flatten code by handling edge cases first: if invalid: return error. Benefits: reduced nesting, clearer preconditions, each return is a clear exit point. Tradeoffs: 1) Multiple returns can be harder to trace in complex functions. 2) Resource cleanup may be missed (use try/finally or context managers). 3) Some teams/linters prefer single-return style. Best practice: use early returns for validation/guards, but keep core logic with one clear return path. Functions should be small enough that multiple returns are easy to follow.",
      },
    ],
  },
  {
    id: "python-lambda-functions",
    title: "Lambda Functions",
    slug: "python-lambda-functions",
    icon: "Zap",
    difficulty: "Intermediate",
    description:
      "Write small anonymous functions with lambda — single-expression functions perfect for quick operations and callbacks.",
    concept: {
      explanation:
        "A lambda is an anonymous (unnamed) function defined with the lambda keyword. It can take any number of arguments but only contains a single expression (no statements, no assignments, no multi-line logic). The expression's result is automatically returned. Lambdas are most useful as short callbacks for functions like sorted(), map(), filter(), and reduce(). They should be used for simple operations — if the logic needs more than one expression, use a regular def function. Assigning a lambda to a variable is discouraged by PEP 8 — use def instead.",
      realLifeAnalogy:
        "A lambda is like a sticky note with a quick instruction. Instead of writing a full page of instructions (a def function) and filing it in a binder, you write a quick one-liner on a sticky note for immediate use: 'double this number'. It's for simple, one-time tasks where a full document would be overkill.",
      keyPoints: [
        "Syntax: lambda params: expression",
        "Returns the expression result automatically",
        "Can take any number of arguments",
        "Only ONE expression — no statements or multi-line",
        "Anonymous — no name required",
        "Best for short callbacks (sorted, map, filter)",
        "PEP 8: don't assign lambda to a variable, use def",
        "Can access variables from enclosing scope (closures)",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Basic lambda
square = lambda x: x ** 2  # PEP 8 discourages this
print(f"square(5) = {square(5)}")

# Lambda with sorted()
students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]
by_score = sorted(students, key=lambda s: s[1])
print(f"By score: {by_score}")

by_name = sorted(students, key=lambda s: s[0])
print(f"By name: {by_name}")

# Lambda with map()
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))
print(f"\\nDoubled: {doubled}")

# Lambda with filter()
evens = list(filter(lambda x: x % 2 == 0, range(1, 11)))
print(f"Evens: {evens}")

# Multiple arguments
add = lambda a, b: a + b
print(f"\\nadd(3, 4) = {add(3, 4)}")

# Lambda in a dictionary
ops = {
    "+": lambda a, b: a + b,
    "-": lambda a, b: a - b,
    "*": lambda a, b: a * b,
    "/": lambda a, b: a / b if b != 0 else "Error",
}
print(f"\\n5 + 3 = {ops['+'](5, 3)}")
print(f"5 * 3 = {ops['*'](5, 3)}")

# Conditional in lambda
classify = lambda x: "positive" if x > 0 else "negative" if x < 0 else "zero"
print(f"\\n5 -> {classify(5)}")
print(f"-3 -> {classify(-3)}")
print(f"0 -> {classify(0)}")
`,
    },
    interviewQuestions: [
      {
        question: "What are the limitations of lambda functions?",
        difficulty: "Easy",
        hint: "Lambdas can only contain a single expression — no statements (no if blocks, loops, print, assignments, raise). No annotations or docstrings. No multiple lines. Cannot use walrus operator (:=). The expression is automatically returned. If you need any of these, use def. Lambdas also can't be pickled reliably. PEP 8 says: if you need to name it, use def. Lambdas are for inline, throwaway functions only.",
      },
      {
        question: "When should you use lambda vs a regular function?",
        difficulty: "Medium",
        hint: "Use lambda: 1) Short callbacks for sorted/map/filter: sorted(items, key=lambda x: x.name). 2) Simple dict-based dispatch: ops = {'+': lambda a,b: a+b}. 3) Default factory for defaultdict: defaultdict(lambda: 'N/A'). Use def: 1) Anything needing more than one expression. 2) Reusable functions. 3) Functions needing docstrings. 4) Named functions (PEP 8). 5) Complex logic. In modern Python, list comprehensions often replace map+lambda.",
      },
      {
        question: "How do closures work with lambda functions?",
        difficulty: "Hard",
        hint: "Lambdas capture variables from enclosing scope by reference (late binding). Classic gotcha: [lambda: i for i in range(3)] — all return 2 (last value of i). Fix: [lambda i=i: i for i in range(3)] — default arg captures current value. Same issue with def. This is because closures close over variables, not values. The lambda doesn't evaluate 'i' until called. Default argument trick forces evaluation at definition time. Alternative: functools.partial.",
      },
    ],
  },
  {
    id: "python-recursive-functions",
    title: "Recursive Functions",
    slug: "python-recursive-functions",
    icon: "RefreshCw",
    difficulty: "Intermediate",
    description:
      "Write functions that call themselves to solve problems by breaking them into smaller, identical sub-problems.",
    concept: {
      explanation:
        "Recursion is when a function calls itself to solve a smaller version of the same problem. Every recursive function needs a base case (stopping condition) and a recursive case (where it calls itself with a smaller input). Without a base case, recursion continues forever and hits Python's recursion limit (default 1000). Recursion is elegant for tree traversal, divide-and-conquer algorithms, and mathematical sequences. However, Python doesn't optimize tail recursion, so deep recursion can cause stack overflow. For performance-critical code, iterative solutions or memoization may be preferred.",
      realLifeAnalogy:
        "Recursion is like Russian nesting dolls (matryoshka). To find the smallest doll (base case), you open each doll and find a smaller one inside (recursive call). You keep opening until you reach the smallest doll that doesn't open (base case). Then you 'unwind' — putting each doll back inside the previous one (returning results up the call stack).",
      keyPoints: [
        "A function that calls itself is recursive",
        "Must have a base case to stop recursion",
        "Each recursive call should progress toward the base case",
        "Python's default recursion limit is 1000",
        "Call stack grows with each recursive call",
        "Python does NOT optimize tail recursion",
        "Memoization can dramatically improve performance",
        "Can convert any recursion to iteration (with a stack)",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Factorial — classic recursion
def factorial(n):
    if n <= 1:        # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

print(f"5! = {factorial(5)}")
print(f"10! = {factorial(10)}")

# Fibonacci
def fibonacci(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

print(f"\\nFibonacci sequence:")
for i in range(8):
    print(f"  F({i}) = {fibonacci(i)}")

# Sum of a list
def sum_list(lst):
    if not lst:       # Base case: empty list
        return 0
    return lst[0] + sum_list(lst[1:])

print(f"\\nSum of [1,2,3,4,5] = {sum_list([1, 2, 3, 4, 5])}")

# Countdown
def countdown(n):
    if n <= 0:
        print("Go!")
        return
    print(n, end=" ")
    countdown(n - 1)

print("\\nCountdown: ", end="")
countdown(5)

# Power function
def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)

print(f"\\n2^10 = {power(2, 10)}")

# Recursion limit
import sys
print(f"\\nRecursion limit: {sys.getrecursionlimit()}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the base case and why is it essential in recursion?",
        difficulty: "Easy",
        hint: "The base case is the condition that stops recursion — it returns a value without making another recursive call. Without it, the function calls itself forever until hitting Python's recursion limit (RecursionError). Example: factorial(0) = 1 is the base case. Each recursive call must move TOWARD the base case. Common mistake: wrong base case or not reducing the problem size. Every recursive function needs at least one base case.",
      },
      {
        question: "What is the time complexity of naive recursive Fibonacci and how to improve it?",
        difficulty: "Medium",
        hint: "Naive Fibonacci is O(2^n) — exponential! Each call branches into two, creating a binary tree of calls. fib(40) makes ~2 billion calls. Improvements: 1) Memoization (cache results): from functools import lru_cache; @lru_cache; def fib(n): ... — becomes O(n). 2) Bottom-up iteration: O(n) time, O(1) space. 3) Matrix exponentiation: O(log n). Python's lru_cache is the easiest fix — just add a decorator.",
      },
      {
        question: "Why doesn't Python optimize tail recursion and what alternatives exist?",
        difficulty: "Hard",
        hint: "Tail recursion = recursive call is the last operation. Languages like Scheme optimize this to reuse the stack frame (Tail Call Optimization). Python's Guido explicitly rejected TCO because: 1) It destroys stack traces (bad for debugging). 2) Python's philosophy prefers explicit iteration. 3) Tracebacks are fundamental to Python's debugging experience. Alternatives: 1) Convert to iteration with a loop. 2) Use an explicit stack (for tree traversal). 3) Use sys.setrecursionlimit() carefully. 4) Use trampolining pattern. 5) Use itertools for sequence generation.",
      },
    ],
  },
  {
    id: "python-higher-order-functions",
    title: "Higher Order Functions",
    slug: "python-higher-order-functions",
    icon: "Layers",
    difficulty: "Intermediate",
    description:
      "Master functions that take other functions as arguments or return functions — the foundation of functional programming in Python.",
    concept: {
      explanation:
        "A higher-order function (HOF) either takes a function as an argument, returns a function, or both. Python's built-in HOFs include map(), filter(), sorted(), reduce(), and min()/max() with key. Decorators are HOFs that take a function and return a modified version. HOFs enable composition, abstraction, and the strategy pattern. In modern Python, list comprehensions and generator expressions often replace map() and filter() for readability, but understanding HOFs is essential for decorators, callbacks, and functional programming patterns.",
      realLifeAnalogy:
        "A higher-order function is like a manager who delegates tasks. The manager (HOF) doesn't do the work directly — they accept a worker (function argument) and tell them what to process. 'Apply this discount (function) to each item (data)' is like map(). 'Keep only items that pass this quality check (function)' is like filter(). The manager organizes the workflow; the workers do the specific task.",
      keyPoints: [
        "Takes a function as argument and/or returns a function",
        "Built-in HOFs: map(), filter(), sorted(), reduce()",
        "map(func, iterable) applies func to each item",
        "filter(func, iterable) keeps items where func returns True",
        "sorted(iterable, key=func) sorts using func for comparison",
        "reduce(func, iterable) accumulates a single result",
        "Decorators are HOFs that wrap functions",
        "List comprehensions often preferred over map/filter",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Function as argument
def apply(func, value):
    return func(value)

print(f"apply(abs, -5) = {apply(abs, -5)}")
print(f"apply(str, 42) = {apply(str, 42)}")

# map() — transform each item
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, numbers))
print(f"\\nSquares: {squares}")

# filter() — keep matching items
evens = list(filter(lambda x: x % 2 == 0, range(1, 11)))
print(f"Evens: {evens}")

# sorted() with key function
words = ["banana", "apple", "cherry", "date"]
by_length = sorted(words, key=len)
print(f"By length: {by_length}")

# reduce() — accumulate
from functools import reduce
product = reduce(lambda a, b: a * b, [1, 2, 3, 4, 5])
print(f"\\nProduct: {product}")

# Return a function (function factory)
def make_power(n):
    def power(x):
        return x ** n
    return power

square = make_power(2)
cube = make_power(3)
print(f"\\nsquare(4) = {square(4)}")
print(f"cube(3) = {cube(3)}")

# Simple decorator (HOF)
def log_call(func):
    def wrapper(*args, **kwargs):
        print(f"  Calling {func.__name__}{args}")
        result = func(*args, **kwargs)
        print(f"  Returned: {result}")
        return result
    return wrapper

@log_call
def add(a, b):
    return a + b

print("\\nWith decorator:")
add(3, 4)

# Comprehension vs map/filter
print(f"\\nMap:  {list(map(lambda x: x*2, [1,2,3]))}")
print(f"Comp: {[x*2 for x in [1,2,3]]}")
`,
    },
    interviewQuestions: [
      {
        question: "What is a higher-order function? Give examples.",
        difficulty: "Easy",
        hint: "A higher-order function takes a function as argument and/or returns a function. Python built-ins: sorted(items, key=len), map(str, numbers), filter(bool, items), max(items, key=lambda x: x.score). Custom: decorators (@log_call), function factories (make_adder(5)), callbacks (button.on_click(handler)). Even simple ones count: def apply_twice(f, x): return f(f(x)).",
      },
      {
        question: "When should you use map/filter vs list comprehensions?",
        difficulty: "Medium",
        hint: "List comprehensions are generally preferred in Python (PEP 8): [x*2 for x in items] is clearer than list(map(lambda x: x*2, items)). Use map/filter when: 1) You already have a named function: map(str, items) is cleaner than [str(x) for x in items]. 2) Lazy evaluation needed (map returns an iterator). 3) Functional composition chains. Use comprehensions when: 1) Using lambda (cleaner as comprehension). 2) Need conditions: [x for x in items if x > 0]. 3) Python team consensus — comprehensions are more Pythonic.",
      },
      {
        question: "How do decorators work as higher-order functions?",
        difficulty: "Hard",
        hint: "@decorator is syntactic sugar for: func = decorator(func). The decorator (HOF) takes a function, creates a wrapper that adds behavior, and returns the wrapper. Pattern: def decorator(func): def wrapper(*args, **kwargs): ... return func(*args, **kwargs); return wrapper. Use @functools.wraps(func) to preserve the original function's __name__, __doc__, __module__. Decorators can be stacked (@a @b @c = a(b(c(func)))). Decorators with arguments need another layer: def decorator(arg): def actual_decorator(func): def wrapper(...): ...; return wrapper; return actual_decorator.",
      },
    ],
  },

  // ─── Level 4: Data Structures ───────────────────────────────────────────────
  {
    id: "python-lists",
    title: "Lists",
    slug: "python-lists",
    icon: "LayoutGrid",
    difficulty: "Beginner",
    description:
      "Master Python's most versatile data structure — ordered, mutable collections that can hold any type of element.",
    concept: {
      explanation:
        "A list is an ordered, mutable sequence of elements enclosed in square brackets []. Lists can contain items of any type, including other lists (nested lists). They support indexing (0-based), negative indexing (-1 for last), slicing (list[start:stop:step]), and iteration. Lists are dynamic — they grow and shrink as you add or remove items. Because lists are mutable, modifying a list in place affects all references to it. Lists are the most commonly used data structure in Python and are ideal when you need an ordered collection that may change over time.",
      realLifeAnalogy:
        "A list is like a numbered shopping list. Each item has a position (index), you can add items at the end or insert in the middle, cross out (remove) items, replace items, and rearrange the order. Unlike a fixed menu (tuple), your shopping list is always changing. You can even have sub-lists — like grouping dairy items together inside the main list.",
      keyPoints: [
        "Created with [] or list() constructor",
        "Ordered — elements maintain insertion order",
        "Mutable — can add, remove, and change elements",
        "Allows duplicate values",
        "0-based indexing; negative indexing from the end",
        "Slicing: list[start:stop:step]",
        "Can contain mixed types (int, str, list, etc.)",
        "Dynamic size — grows and shrinks as needed",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Creating lists
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]
empty = []

print(f"Fruits: {fruits}")
print(f"Mixed: {mixed}")

# Indexing and negative indexing
print(f"\\nFirst fruit: {fruits[0]}")
print(f"Last fruit: {fruits[-1]}")

# Slicing
print(f"\\nFirst two: {numbers[:2]}")
print(f"Last three: {numbers[-3:]}")
print(f"Every other: {numbers[::2]}")
print(f"Reversed: {numbers[::-1]}")

# Modifying lists
fruits[1] = "blueberry"
print(f"\\nModified: {fruits}")

# Adding elements
fruits.append("date")
fruits.insert(1, "avocado")
print(f"After add: {fruits}")

# Removing elements
fruits.remove("cherry")
popped = fruits.pop()
print(f"After remove: {fruits}")
print(f"Popped: {popped}")

# List operations
a = [1, 2, 3]
b = [4, 5, 6]
print(f"\\nConcatenate: {a + b}")
print(f"Repeat: {a * 2}")
print(f"Length: {len(a)}")
print(f"3 in a: {3 in a}")

# Nested lists
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(f"\\nMatrix[1][2]: {matrix[1][2]}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the time complexity of common list operations?",
        difficulty: "Easy",
        hint: "append(): O(1) amortized. insert(i, x): O(n) — shifts elements. pop(): O(1) from end, O(n) from beginning. remove(x): O(n) — searches then shifts. index[i]: O(1) — direct access. 'in' operator: O(n) — linear search. sort(): O(n log n) — Timsort. extend(): O(k) where k is length of added iterable. Lists are implemented as dynamic arrays — fast random access, slow insertion/deletion in the middle.",
      },
      {
        question: "What is the difference between shallow copy and deep copy for lists?",
        difficulty: "Medium",
        hint: "Shallow copy (list.copy(), list[:], list(original)): creates a new list but elements are references to the same objects. For nested lists, inner lists are shared. Deep copy (copy.deepcopy()): recursively copies everything — nested objects get their own copies. Example: a = [[1,2],[3,4]]; b = a.copy(); b[0].append(5) — a is also modified! With deepcopy, a would be unaffected. Use shallow for flat lists of immutables, deep for nested mutable structures.",
      },
      {
        question: "How are Python lists implemented internally and why does that matter?",
        difficulty: "Hard",
        hint: "Python lists are dynamic arrays — contiguous blocks of pointers to PyObject. They over-allocate space (growth factor ~1.125) to make append() amortized O(1). Each 'element' is actually a pointer (8 bytes on 64-bit), regardless of the element's actual size. This means: O(1) random access (pointer arithmetic), O(n) insert/delete middle (shift pointers), O(n) search. For large numeric data, use array.array or numpy.ndarray for contiguous typed storage. collections.deque is better for frequent insert/delete at both ends.",
      },
    ],
  },
  {
    id: "python-list-methods",
    title: "List Methods",
    slug: "python-list-methods",
    icon: "LayoutGrid",
    difficulty: "Beginner",
    description:
      "Explore the full toolkit of list methods — append, extend, insert, remove, sort, reverse, and more.",
    concept: {
      explanation:
        "Python lists come with a rich set of built-in methods for adding, removing, searching, and transforming elements. Methods that modify the list in place (append, extend, insert, remove, sort, reverse, clear) return None — they change the original list. Methods that return information (index, count, copy) don't modify the list. The sort() method uses Timsort (hybrid merge sort + insertion sort) and is stable. Understanding which methods mutate vs return new values is crucial for avoiding bugs.",
      realLifeAnalogy:
        "List methods are like the tools in a toolbox for managing your shopping list. append() is like adding an item at the bottom. insert() is squeezing an item between existing ones. remove() is crossing out a specific item. sort() is reorganizing items alphabetically. pop() is tearing off the last item. Each tool does one specific job on your list.",
      keyPoints: [
        "append(x) — add one item to end",
        "extend(iterable) — add all items from iterable",
        "insert(i, x) — insert at position i",
        "remove(x) — remove first occurrence of x",
        "pop(i) — remove and return item at index (default: last)",
        "sort(key, reverse) — sort in place, returns None",
        "reverse() — reverse in place, returns None",
        "index(x), count(x), copy(), clear()",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Start with a list
nums = [3, 1, 4, 1, 5, 9, 2, 6]
print(f"Original: {nums}")

# append vs extend
nums.append(7)
print(f"append(7): {nums}")

nums.extend([8, 0])
print(f"extend([8,0]): {nums}")

# insert
nums.insert(0, 99)
print(f"insert(0, 99): {nums}")

# remove and pop
nums.remove(99)
print(f"remove(99): {nums}")

last = nums.pop()
print(f"pop(): {last}, list: {nums}")

third = nums.pop(2)
print(f"pop(2): {third}, list: {nums}")

# sort and reverse
nums.sort()
print(f"\\nsort(): {nums}")

nums.sort(reverse=True)
print(f"sort(reverse=True): {nums}")

nums.reverse()
print(f"reverse(): {nums}")

# Sorting with key
words = ["banana", "apple", "cherry", "date"]
words.sort(key=len)
print(f"\\nsort by length: {words}")

# sorted() returns NEW list (doesn't modify original)
original = [3, 1, 2]
new_sorted = sorted(original)
print(f"\\noriginal: {original}")
print(f"sorted(): {new_sorted}")

# Search methods
letters = ["a", "b", "c", "b", "a"]
print(f"\\nindex('b'): {letters.index('b')}")
print(f"count('a'): {letters.count('a')}")

# copy
copy = letters.copy()
copy.append("z")
print(f"\\noriginal: {letters}")
print(f"copy: {copy}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between append() and extend()?",
        difficulty: "Easy",
        hint: "append(x) adds x as a SINGLE element: [1,2].append([3,4]) → [1,2,[3,4]]. extend(iterable) adds EACH element from the iterable: [1,2].extend([3,4]) → [1,2,3,4]. append is O(1), extend is O(k) where k is the length of the iterable. Use append for a single item, extend for merging sequences. += is equivalent to extend: a += [3,4] is the same as a.extend([3,4]).",
      },
      {
        question: "What is the difference between sort() and sorted()?",
        difficulty: "Medium",
        hint: "sort() modifies the list IN PLACE and returns None. sorted() returns a NEW sorted list, leaving the original unchanged. sort() only works on lists. sorted() works on any iterable (list, tuple, dict, generator). Both accept key= and reverse= parameters. Both use Timsort (O(n log n), stable). Use sort() when you don't need the original order. Use sorted() when you need both or when working with non-list iterables.",
      },
      {
        question: "How does Python's Timsort algorithm work?",
        difficulty: "Hard",
        hint: "Timsort is a hybrid stable sort combining merge sort and insertion sort, designed by Tim Peters for Python. It finds naturally occurring sorted subsequences ('runs'), extends short runs with insertion sort (efficient for small/nearly-sorted data), then merges runs using a merge strategy that maintains stability. Worst case: O(n log n) time, O(n) space. Best case: O(n) for already sorted data. It exploits real-world patterns where data is often partially sorted. Used by Python, Java, Android, Swift.",
      },
    ],
  },
  {
    id: "python-tuples",
    title: "Tuples",
    slug: "python-tuples",
    icon: "Lock",
    difficulty: "Beginner",
    description:
      "Learn about immutable ordered sequences — tuples are like lists that cannot be changed, perfect for fixed data.",
    concept: {
      explanation:
        "A tuple is an ordered, immutable sequence defined with parentheses () or just commas. Once created, you cannot add, remove, or change elements. Tuples support indexing, slicing, and iteration just like lists, but not mutation. They are used for fixed collections (coordinates, RGB colors, database rows), function return values (return x, y), dictionary keys (since they are hashable), and as a signal that data should not be modified. Tuples are slightly faster and use less memory than lists. A single-element tuple requires a trailing comma: (42,) not (42).",
      realLifeAnalogy:
        "A tuple is like a printed receipt from a store. Once printed, you cannot change the items, prices, or total — it is a permanent, fixed record. You can read any line (indexing), photocopy it (copying), but you cannot modify it. If you want to change something, you need a new receipt (create a new tuple). This immutability is what makes it reliable for record-keeping.",
      keyPoints: [
        "Created with () or tuple() constructor",
        "Ordered — maintains element order",
        "Immutable — cannot add, remove, or change elements",
        "Allows duplicates",
        "Single element needs trailing comma: (42,)",
        "Supports indexing, slicing, iteration",
        "Hashable — can be used as dict keys",
        "Faster and smaller than lists in memory",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Creating tuples
point = (3, 4)
colors = ("red", "green", "blue")
single = (42,)  # Trailing comma required!
empty = ()
no_parens = 1, 2, 3  # Packing without parentheses

print(f"Point: {point}")
print(f"Single: {single}, type: {type(single)}")
print(f"No parens: {no_parens}")

# Indexing and slicing (same as lists)
print(f"\\nFirst color: {colors[0]}")
print(f"Last color: {colors[-1]}")
print(f"Slice: {colors[1:]}")

# Tuple unpacking
x, y = point
print(f"\\nUnpacked: x={x}, y={y}")

# Extended unpacking
first, *rest = (1, 2, 3, 4, 5)
print(f"first={first}, rest={rest}")

# Immutability
# point[0] = 10  # TypeError: tuple doesn't support assignment

# Tuple methods (only 2!)
nums = (1, 2, 3, 2, 1, 2)
print(f"\\ncount(2): {nums.count(2)}")
print(f"index(3): {nums.index(3)}")

# Tuples as dict keys (hashable)
locations = {
    (40.7, -74.0): "New York",
    (51.5, -0.1): "London",
}
print(f"\\n(40.7, -74.0) -> {locations[(40.7, -74.0)]}")

# Named tuples for clarity
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(f"\\nNamedTuple: {p}, x={p.x}, y={p.y}")

# Tuple vs List performance
import sys
lst = [1, 2, 3, 4, 5]
tup = (1, 2, 3, 4, 5)
print(f"\\nList size: {sys.getsizeof(lst)} bytes")
print(f"Tuple size: {sys.getsizeof(tup)} bytes")
`,
    },
    interviewQuestions: [
      {
        question: "Why would you use a tuple instead of a list?",
        difficulty: "Easy",
        hint: "Use tuples when: 1) Data shouldn't change (coordinates, config, constants). 2) Dict keys — tuples are hashable, lists aren't. 3) Function return values — return x, y creates a tuple. 4) Performance — tuples are faster to create, iterate, and use less memory. 5) Safety — prevents accidental modification. 6) As elements in sets. Rule of thumb: use tuples for heterogeneous fixed data (name, age, city), lists for homogeneous mutable collections (list of names).",
      },
      {
        question: "Can a tuple containing mutable objects be modified?",
        difficulty: "Medium",
        hint: "The tuple itself is immutable — you can't add/remove/replace elements. But if an element is mutable (like a list), that element CAN be modified in place. t = ([1,2], [3,4]); t[0].append(5) works — t becomes ([1,2,5], [3,4]). But t[0] = [9,9] fails — you can't replace the reference. This means tuples containing mutable objects are NOT hashable: hash(t) raises TypeError. The immutability is shallow — the tuple's structure is fixed, not its elements' contents.",
      },
      {
        question: "What are named tuples and when should you use them?",
        difficulty: "Hard",
        hint: "collections.namedtuple creates tuple subclasses with named fields: Point = namedtuple('Point', ['x','y']); p = Point(3,4); p.x. Benefits over plain tuples: self-documenting (p.x vs p[0]), compatible with tuple operations, immutable, lightweight (less memory than a class). typing.NamedTuple (Python 3.6+) adds type hints: class Point(NamedTuple): x: float; y: float. Use when: fixed structure, need field names, don't need methods. Consider dataclass(frozen=True) for more features (defaults, methods, __post_init__).",
      },
    ],
  },
  {
    id: "python-sets",
    title: "Sets",
    slug: "python-sets",
    icon: "CircleDot",
    difficulty: "Beginner",
    description:
      "Store unique, unordered elements with sets — ideal for membership testing, removing duplicates, and mathematical operations.",
    concept: {
      explanation:
        "A set is an unordered collection of unique elements, defined with curly braces {} or set(). Sets automatically discard duplicate values. They support fast membership testing (O(1) average), and mathematical set operations: union (|), intersection (&), difference (-), and symmetric difference (^). Sets are mutable (add/remove elements), but elements must be hashable (no lists or dicts inside sets). For an immutable set, use frozenset(). Sets are ideal when you care about uniqueness and fast lookups but not order.",
      realLifeAnalogy:
        "A set is like a bag of unique marbles. You can add marbles (but duplicates are automatically rejected), remove marbles, and check if a specific marble is in the bag. You can combine two bags (union), find marbles common to both bags (intersection), or find marbles in one bag but not the other (difference). The marbles have no particular order in the bag.",
      keyPoints: [
        "Created with {} or set() — note: {} creates a dict, not a set!",
        "Unordered — no indexing or slicing",
        "No duplicates — automatically deduplicates",
        "Elements must be hashable (immutable types)",
        "O(1) average time for membership testing (in)",
        "Union |, Intersection &, Difference -, Symmetric ^",
        "Mutable: add(), remove(), discard()",
        "frozenset() for immutable sets",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Creating sets
fruits = {"apple", "banana", "cherry"}
numbers = set([1, 2, 3, 2, 1])  # Duplicates removed
empty = set()  # NOT {} — that's a dict!

print(f"Fruits: {fruits}")
print(f"Numbers: {numbers}")

# Duplicates automatically removed
dupes = {1, 2, 2, 3, 3, 3}
print(f"\\nDupes removed: {dupes}")

# Fast membership testing
print(f"\\n'apple' in fruits: {'apple' in fruits}")
print(f"'grape' in fruits: {'grape' in fruits}")

# Set operations
a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

print(f"\\na = {a}")
print(f"b = {b}")
print(f"Union (a | b): {a | b}")
print(f"Intersection (a & b): {a & b}")
print(f"Difference (a - b): {a - b}")
print(f"Symmetric diff (a ^ b): {a ^ b}")

# Subset and superset
small = {1, 2}
print(f"\\n{small} subset of {a}: {small <= a}")
print(f"{a} superset of {small}: {a >= small}")

# Removing duplicates from a list
names = ["Alice", "Bob", "Alice", "Charlie", "Bob"]
unique = list(set(names))
print(f"\\nUnique names: {unique}")

# Add and remove
fruits.add("date")
fruits.discard("banana")  # No error if missing
print(f"\\nModified: {fruits}")

# Set comprehension
evens = {x for x in range(10) if x % 2 == 0}
print(f"Even set: {evens}")
`,
    },
    interviewQuestions: [
      {
        question: "Why is 'in' faster on sets than on lists?",
        difficulty: "Easy",
        hint: "Sets use a hash table internally. 'in' computes the hash of the element and checks the bucket — O(1) average. Lists use linear search — check each element sequentially — O(n). For 1 million elements: set lookup is instant, list lookup scans up to 1 million items. Use sets when you frequently test membership. Convert list to set first if you need many lookups: my_set = set(my_list); if x in my_set.",
      },
      {
        question: "What is the difference between remove() and discard()?",
        difficulty: "Medium",
        hint: "remove(x) raises KeyError if x is not in the set. discard(x) does nothing if x is not found — no error. Use remove() when the element MUST exist (indicates a bug if missing). Use discard() when the element might not exist (defensive). pop() removes and returns an arbitrary element (unordered!). clear() removes all elements. There's no way to pop a specific element — use discard/remove for that.",
      },
      {
        question: "How does Python implement sets internally and what are the implications?",
        difficulty: "Hard",
        hint: "Sets use a hash table (open addressing with probing). Each element is hashed to find a bucket; collisions use probing. This means: 1) Elements must be hashable (immutable: int, str, tuple — not list, dict, set). 2) O(1) average lookup/insert/delete, O(n) worst case (many collisions). 3) No order guarantee (CPython 3.7+ preserves insertion order for dicts but NOT sets). 4) Memory overhead: ~50-60 bytes per element. 5) frozenset is hashable and can be used as dict key or set element.",
      },
    ],
  },
  {
    id: "python-set-methods",
    title: "Set Methods",
    slug: "python-set-methods",
    icon: "CircleDot",
    difficulty: "Beginner",
    description:
      "Master the full range of set operations — add, remove, union, intersection, difference, and subset testing.",
    concept: {
      explanation:
        "Python sets provide two ways to perform operations: operators (|, &, -, ^) and methods (union, intersection, difference, symmetric_difference). The key difference is that methods accept any iterable as argument while operators require both operands to be sets. Update methods modify the set in place: update() (|=), intersection_update() (&=), difference_update() (-=), symmetric_difference_update() (^=). Comparison methods check relationships: issubset() (<=), issuperset() (>=), isdisjoint() (no common elements). These operations form the foundation of many algorithms: deduplication, finding common elements, computing differences between datasets.",
      realLifeAnalogy:
        "Set methods are like Venn diagram operations. Union is combining two circles — all elements from both. Intersection is the overlap area — elements in both. Difference is one circle minus the overlap — elements in only one set. issubset checks if one circle fits entirely inside another. isdisjoint checks if the circles don't overlap at all. These are the same operations you learned in math class, now as Python code.",
      keyPoints: [
        "add(x), remove(x), discard(x), pop(), clear()",
        "union() / | — all elements from both sets",
        "intersection() / & — elements in both sets",
        "difference() / - — elements in first but not second",
        "symmetric_difference() / ^ — elements in one but not both",
        "update methods modify in place: |=, &=, -=, ^=",
        "issubset() <=, issuperset() >=, isdisjoint()",
        "Methods accept any iterable; operators need sets",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Setup
python_devs = {"Alice", "Bob", "Charlie", "Diana"}
js_devs = {"Charlie", "Diana", "Eve", "Frank"}

print(f"Python devs: {python_devs}")
print(f"JS devs: {js_devs}")

# Union — who knows either language
all_devs = python_devs.union(js_devs)
print(f"\\nAll devs (union): {all_devs}")

# Intersection — who knows both
both = python_devs.intersection(js_devs)
print(f"Both languages: {both}")

# Difference — Python only
python_only = python_devs.difference(js_devs)
js_only = js_devs.difference(python_devs)
print(f"Python only: {python_only}")
print(f"JS only: {js_only}")

# Symmetric difference — one but not both
exclusive = python_devs.symmetric_difference(js_devs)
print(f"Exclusive: {exclusive}")

# Methods accept any iterable (operators don't)
new_langs = python_devs.union(["Grace", "Henry"])
print(f"\\nWith list: {new_langs}")

# Update (modify in place)
team = {"Alice", "Bob"}
team.update(["Charlie", "Diana"])
print(f"\\nAfter update: {team}")

# Subset and superset
small = {"Alice", "Bob"}
big = {"Alice", "Bob", "Charlie"}
print(f"\\n{small} subset of {big}: {small.issubset(big)}")
print(f"{big} superset of {small}: {big.issuperset(small)}")
print(f"Disjoint: {small.isdisjoint({'Eve', 'Frank'})}")

# Practical: find common and unique items
list1 = [1, 2, 3, 4, 5, 3, 2]
list2 = [4, 5, 6, 7, 8, 5, 6]
common = set(list1) & set(list2)
unique_to_1 = set(list1) - set(list2)
print(f"\\nCommon: {common}")
print(f"Only in list1: {unique_to_1}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between union() method and the | operator?",
        difficulty: "Easy",
        hint: "Functionally identical for sets — both return a new set with all elements from both sets. Key difference: the | operator requires both operands to be sets. The union() method accepts any iterable: {1,2}.union([3,4]) works, but {1,2} | [3,4] raises TypeError. Same applies to all set operations: intersection/&, difference/-, symmetric_difference/^. Use methods when working with mixed types, operators for cleaner syntax with sets.",
      },
      {
        question: "How would you find elements common to multiple sets efficiently?",
        difficulty: "Medium",
        hint: "Use intersection with multiple args: set1.intersection(set2, set3, set4) or set1 & set2 & set3 & set4. For a list of sets: result = sets[0].intersection(*sets[1:]). Or use reduce: from functools import reduce; reduce(set.intersection, sets). Optimization: start with the smallest set to minimize comparisons. Time complexity: O(min(len(s)) * number_of_sets) for hash table lookups. For large datasets, consider sorted arrays with merge-based intersection.",
      },
      {
        question: "When would you use frozenset and how does it differ from set?",
        difficulty: "Hard",
        hint: "frozenset is an immutable, hashable version of set. Same operations (union, intersection, etc.) but no mutation (no add, remove, update). Use cases: 1) Dict keys: {frozenset({1,2}): 'value'}. 2) Elements of another set: {frozenset({1,2}), frozenset({3,4})}. 3) Function parameters that shouldn't be modified. 4) Caching/memoization keys. Created with frozenset(iterable). Operations return frozenset, not set. Cannot be modified after creation — thread-safe by nature.",
      },
    ],
  },
  {
    id: "python-dictionaries",
    title: "Dictionaries",
    slug: "python-dictionaries",
    icon: "Hash",
    difficulty: "Beginner",
    description:
      "Store and retrieve data with key-value pairs — dictionaries are Python's built-in mapping type for fast lookups.",
    concept: {
      explanation:
        "A dictionary (dict) is an ordered (Python 3.7+) collection of key-value pairs, defined with curly braces {key: value}. Keys must be hashable (immutable), values can be anything. Dicts provide O(1) average time for lookups, insertions, and deletions by key. They are the most important data structure in Python — used internally for namespaces, object attributes, keyword arguments, and more. Since Python 3.7, dictionaries maintain insertion order as an implementation detail (guaranteed since 3.7). Use dicts when you need to associate values with unique keys for fast retrieval.",
      realLifeAnalogy:
        "A dictionary is like a phone book or contact list. Each contact name (key) maps to a phone number (value). You look up someone by name instantly — you don't scan through every entry. Names must be unique (no duplicate keys), but multiple people can share the same phone number (duplicate values allowed). You can add new contacts, update numbers, or delete entries.",
      keyPoints: [
        "Created with {} or dict() constructor",
        "Key-value pairs: {key: value}",
        "Keys must be hashable (str, int, tuple — not list, dict)",
        "Values can be any type",
        "O(1) average lookup, insert, delete by key",
        "Ordered (insertion order preserved since Python 3.7)",
        "Access: d[key] (KeyError if missing) or d.get(key, default)",
        "No duplicate keys — last assignment wins",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Creating dictionaries
person = {"name": "Alice", "age": 30, "city": "NYC"}
scores = dict(math=95, science=88, english=92)
empty = {}

print(f"Person: {person}")
print(f"Scores: {scores}")

# Accessing values
print(f"\\nName: {person['name']}")
print(f"Math: {scores.get('math')}")
print(f"History: {scores.get('history', 'N/A')}")

# Adding and updating
person["email"] = "alice@example.com"
person["age"] = 31
print(f"\\nUpdated: {person}")

# Removing entries
del person["email"]
age = person.pop("age")
print(f"After remove: {person}")
print(f"Popped age: {age}")

# Iterating
print("\\n--- Iteration ---")
data = {"a": 1, "b": 2, "c": 3}
for key in data:
    print(f"  {key}: {data[key]}")

print("\\nItems:")
for key, value in data.items():
    print(f"  {key} -> {value}")

print(f"\\nKeys: {list(data.keys())}")
print(f"Values: {list(data.values())}")

# Merging dicts (Python 3.9+)
defaults = {"color": "blue", "size": "M"}
custom = {"size": "L", "font": "Arial"}
merged = {**defaults, **custom}  # Works in 3.5+
print(f"\\nMerged: {merged}")

# Nested dicts
users = {
    "alice": {"age": 30, "role": "admin"},
    "bob": {"age": 25, "role": "user"},
}
print(f"\\nAlice's role: {users['alice']['role']}")

# Check existence
print(f"\\n'name' in person: {'name' in person}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between d[key] and d.get(key)?",
        difficulty: "Easy",
        hint: "d[key] raises KeyError if key doesn't exist. d.get(key) returns None if key doesn't exist. d.get(key, default) returns default if missing. Use d[key] when the key MUST exist (indicates a bug otherwise). Use d.get() when the key might not exist (optional fields, user input). There's also d.setdefault(key, default) which returns the value AND inserts the default if missing. For nested access, consider collections.defaultdict.",
      },
      {
        question: "How do you merge two dictionaries in Python?",
        difficulty: "Medium",
        hint: "Multiple ways: 1) d1 | d2 (Python 3.9+) — returns new dict. 2) {**d1, **d2} — unpacking (3.5+). 3) d1.update(d2) — modifies d1 in place. 4) d1 |= d2 (3.9+) — in-place merge. 5) dict(d1, **d2) — only works if d2 has string keys. In all cases, d2's values win on conflicts. For deep merging (nested dicts), you need a custom recursive function or a library like deepmerge. Order of precedence: last value wins for duplicate keys.",
      },
      {
        question: "How are Python dicts implemented and why are they ordered since 3.7?",
        difficulty: "Hard",
        hint: "Python 3.6+ dicts use a compact implementation with two arrays: 1) A hash table (sparse) storing indices. 2) A dense array of (hash, key, value) entries in insertion order. Lookup: hash key → find index in sparse table → access dense array. This design: uses 20-25% less memory than Python 3.5, preserves insertion order as a side effect (guaranteed since 3.7, implementation detail in 3.6). Average O(1) for get/set/delete. Worst case O(n) with hash collisions. Resizes at 2/3 full. Keys must be hashable — __hash__ and __eq__ must be defined.",
      },
    ],
  },
  {
    id: "python-dictionary-methods",
    title: "Dictionary Methods",
    slug: "python-dictionary-methods",
    icon: "Hash",
    difficulty: "Beginner",
    description:
      "Master the essential dictionary methods — get, update, setdefault, keys, values, items, and more.",
    concept: {
      explanation:
        "Python dictionaries offer a comprehensive set of methods for accessing, modifying, and transforming key-value data. Key access methods: get() (safe lookup with default), setdefault() (get or insert), keys(), values(), items() (views). Modification methods: update() (merge), pop() (remove and return), popitem() (remove last), clear(). The dict views (keys(), values(), items()) are dynamic — they reflect changes to the dict. collections module adds specialized dicts: defaultdict (auto-default), OrderedDict (comparison-sensitive order), Counter (counting), ChainMap (layered lookups).",
      realLifeAnalogy:
        "Dictionary methods are like the operations on a filing cabinet. get() is looking for a specific file and returning 'not found' if it's missing. update() is merging files from another cabinet into yours. setdefault() is checking if a folder exists — if not, creating it. keys() is reading all the folder labels. items() is pulling out each folder with its contents. pop() is removing a specific folder and handing it to you.",
      keyPoints: [
        "get(key, default) — safe access without KeyError",
        "setdefault(key, default) — get or insert if missing",
        "update(other) — merge another dict or iterable",
        "pop(key, default) — remove and return value",
        "popitem() — remove and return last (key, value)",
        "keys(), values(), items() — dynamic view objects",
        "fromkeys(keys, value) — create dict with same value",
        "collections: defaultdict, Counter, OrderedDict",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# get() — safe access
config = {"host": "localhost", "port": 8080}
print(f"host: {config.get('host')}")
print(f"debug: {config.get('debug', False)}")

# setdefault() — get or insert
counts = {}
for char in "hello world":
    counts.setdefault(char, 0)
    counts[char] += 1
print(f"\\nChar counts: {counts}")

# update() — merge
config.update({"debug": True, "port": 3000})
print(f"Updated config: {config}")

# pop() and popitem()
port = config.pop("port")
print(f"\\nPopped port: {port}")
last = config.popitem()
print(f"Last item: {last}")
print(f"Remaining: {config}")

# keys(), values(), items() — views
data = {"a": 1, "b": 2, "c": 3}
print(f"\\nKeys: {list(data.keys())}")
print(f"Values: {list(data.values())}")
print(f"Items: {list(data.items())}")

# Views are dynamic
keys_view = data.keys()
data["d"] = 4
print(f"After adding 'd': {list(keys_view)}")

# fromkeys()
defaults = dict.fromkeys(["name", "age", "city"], "N/A")
print(f"\\nDefaults: {defaults}")

# collections.defaultdict
from collections import defaultdict
word_count = defaultdict(int)
for word in "the cat sat on the mat".split():
    word_count[word] += 1
print(f"\\nWord count: {dict(word_count)}")

# collections.Counter
from collections import Counter
letter_count = Counter("mississippi")
print(f"Letter count: {dict(letter_count)}")
print(f"Most common: {letter_count.most_common(3)}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between setdefault() and defaultdict?",
        difficulty: "Easy",
        hint: "setdefault(key, default) checks if key exists; if not, inserts it with the default value and returns it. Used per-access. defaultdict(factory) automatically calls factory() for any missing key on access. Used at dict creation. defaultdict(int) returns 0, defaultdict(list) returns []. setdefault is a regular dict method; defaultdict is a specialized subclass. defaultdict is cleaner for accumulation patterns. setdefault is a one-off; defaultdict applies to all missing keys.",
      },
      {
        question: "What are dictionary view objects and how are they useful?",
        difficulty: "Medium",
        hint: "keys(), values(), items() return view objects — lightweight, dynamic representations that reflect changes to the dict without copying. Views support: len(), iteration, 'in' membership. keys() and items() views support set operations (|, &, -, ^) because keys are unique. Views avoid creating lists — memory efficient for large dicts. dict_keys and dict_items are set-like. dict_values is not (values aren't unique). In Python 2, these returned lists — views are a Python 3 improvement.",
      },
      {
        question: "How does Counter work and what are its unique operations?",
        difficulty: "Hard",
        hint: "Counter is a dict subclass for counting hashable objects. Counter('aab') → {'a':2,'b':1}. Unique features: most_common(n) returns top n. elements() returns iterator of elements repeated by count. Arithmetic: Counter + Counter adds counts, - subtracts (drops zero/negative). & gives min counts, | gives max. subtract() modifies in place. Missing keys return 0 (not KeyError). Can count from any iterable. Used for: frequency analysis, histograms, multiset operations, bag data structure.",
      },
    ],
  },
  {
    id: "python-list-comprehension",
    title: "List Comprehension",
    slug: "python-list-comprehension",
    icon: "Zap",
    difficulty: "Intermediate",
    description:
      "Write concise, Pythonic code to create lists from existing iterables using list comprehensions — a powerful one-liner syntax.",
    concept: {
      explanation:
        "List comprehension is a concise syntax for creating lists: [expression for item in iterable if condition]. It combines a for loop, an optional condition, and a transformation into a single readable line. Comprehensions are faster than equivalent for-loop-append patterns because they are optimized at the bytecode level. They can be nested (for matrix operations), include multiple for clauses, and use complex expressions. However, overly complex comprehensions hurt readability — use regular loops if the comprehension exceeds one line or is hard to understand.",
      realLifeAnalogy:
        "A list comprehension is like a factory assembly line with quality control. Items come in on a conveyor belt (iterable), a quality check decides which items pass (if condition), and accepted items get transformed (expression) before going into the output box (new list). 'Give me the square of each number that is even' = [n**2 for n in numbers if n % 2 == 0].",
      keyPoints: [
        "Syntax: [expression for item in iterable if condition]",
        "Faster than for-loop + append pattern",
        "if clause is optional (filtering)",
        "Can include if-else in the expression part",
        "Nested comprehensions for multi-dimensional data",
        "Multiple for clauses for cartesian products",
        "Generator expression: (expr for item in iter) — lazy",
        "Keep comprehensions simple — use loops for complex logic",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Basic list comprehension
squares = [x**2 for x in range(1, 6)]
print(f"Squares: {squares}")

# With condition (filter)
evens = [x for x in range(1, 11) if x % 2 == 0]
print(f"Evens: {evens}")

# With if-else (transform)
labels = ["even" if x % 2 == 0 else "odd" for x in range(1, 6)]
print(f"Labels: {labels}")

# String operations
words = ["hello", "WORLD", "Python"]
lower = [w.lower() for w in words]
print(f"\\nLower: {lower}")

lengths = [len(w) for w in words]
print(f"Lengths: {lengths}")

# Nested comprehension (flatten)
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(f"\\nFlattened: {flat}")

# Create a matrix
grid = [[i * 3 + j + 1 for j in range(3)] for i in range(3)]
print(f"Grid: {grid}")

# Multiple conditions
fizzbuzz = [
    f"{n}: {'Fizz'*(n%3==0)}{'Buzz'*(n%5==0)}" or f"{n}"
    for n in range(1, 16)
    if n % 3 == 0 or n % 5 == 0
]
print(f"\\nFizzBuzz: {fizzbuzz}")

# Comprehension vs loop
# Loop version:
result_loop = []
for x in range(10):
    if x % 2 == 0:
        result_loop.append(x ** 2)

# Comprehension version:
result_comp = [x**2 for x in range(10) if x % 2 == 0]
print(f"\\nBoth equal: {result_loop == result_comp}")

# Generator expression (lazy — uses less memory)
total = sum(x**2 for x in range(1000))
print(f"Sum of squares: {total}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between a list comprehension and a generator expression?",
        difficulty: "Easy",
        hint: "List comprehension [x for x in range(n)] creates the entire list in memory at once. Generator expression (x for x in range(n)) produces values lazily — one at a time, on demand. Generators use O(1) memory regardless of size; lists use O(n). Use generators when: processing large datasets, only iterating once, passing to functions like sum/max/any. Generators can only be iterated once. Lists can be indexed, sliced, and iterated multiple times.",
      },
      {
        question: "Where does the if-else go in a list comprehension?",
        difficulty: "Medium",
        hint: "Two different positions: 1) Filter (after for): [x for x in items IF condition] — includes only matching items. 2) Transform (before for): [x IF condition ELSE y for x in items] — transforms every item. Cannot combine both syntaxes directly in one clause. Example: [x**2 for x in range(10) if x % 2 == 0] (filter evens). ['even' if x%2==0 else 'odd' for x in range(5)] (label all). For both: ['even' if x%2==0 else 'odd' for x in range(10) if x > 3] — filter then transform.",
      },
      {
        question: "When should you NOT use a list comprehension?",
        difficulty: "Hard",
        hint: "Avoid comprehensions when: 1) Side effects only (no new list needed) — use a for loop. 2) Complex logic (multiple statements, try/except) — hard to read. 3) The comprehension is longer than 79 chars or needs multiple lines. 4) You only need to iterate once — use a generator. 5) The logic requires state between iterations (running total). 6) Nested comprehensions with 3+ levels. PEP 8: readability counts. A clear for loop is better than a clever one-liner. Walrus operator (:=) in comprehensions can help but adds complexity.",
      },
    ],
  },
  {
    id: "python-dictionary-comprehension",
    title: "Dictionary Comprehension",
    slug: "python-dictionary-comprehension",
    icon: "Zap",
    difficulty: "Intermediate",
    description:
      "Create dictionaries concisely from iterables using dictionary comprehensions — transform and filter key-value pairs in one line.",
    concept: {
      explanation:
        "Dictionary comprehension creates a dict with {key_expr: value_expr for item in iterable if condition}. It is the dict equivalent of list comprehension. Common use cases include inverting a dict, transforming keys or values, filtering entries, creating lookups from lists, and converting between data formats. Like list comprehensions, they can include conditions and nested loops. Set comprehension uses the same syntax with {} but without the colon: {expr for item in iterable}. Keep dict comprehensions readable — complex ones should be regular loops.",
      realLifeAnalogy:
        "A dictionary comprehension is like creating a phone book from a guest list. You go through each guest (iterable), and for each one, you write their name as the label (key expression) and their phone number as the entry (value expression). You can skip guests without phone numbers (if condition). The result is a complete, organized phone book built in one systematic pass.",
      keyPoints: [
        "Syntax: {key: value for item in iterable if condition}",
        "Creates a new dictionary from any iterable",
        "Can transform both keys and values",
        "Optional if clause for filtering",
        "Can invert a dict: {v: k for k, v in d.items()}",
        "Can create from two lists with zip()",
        "Set comprehension: {expr for item in iterable}",
        "Nested dict comprehension for complex structures",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Basic dict comprehension
squares = {x: x**2 for x in range(1, 6)}
print(f"Squares: {squares}")

# From two lists with zip
keys = ["name", "age", "city"]
values = ["Alice", 30, "NYC"]
person = {k: v for k, v in zip(keys, values)}
print(f"Person: {person}")

# Filtering
scores = {"Alice": 85, "Bob": 42, "Charlie": 91, "Diana": 67}
passed = {k: v for k, v in scores.items() if v >= 60}
print(f"\\nPassed: {passed}")

# Transforming values
upper_scores = {k.upper(): v for k, v in scores.items()}
print(f"Upper keys: {upper_scores}")

graded = {k: ("A" if v>=90 else "B" if v>=80 else "C" if v>=70 else "F")
          for k, v in scores.items()}
print(f"Grades: {graded}")

# Inverting a dictionary
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(f"\\nOriginal: {original}")
print(f"Inverted: {inverted}")

# Word frequency counter
sentence = "the cat sat on the mat the cat"
freq = {}
for word in sentence.split():
    freq[word] = freq.get(word, 0) + 1
print(f"\\nFrequency: {freq}")

# Same with comprehension
from collections import Counter
freq2 = dict(Counter(sentence.split()))
print(f"Counter: {freq2}")

# Nested dict comprehension
matrix = {
    f"row{i}": {f"col{j}": i * 3 + j for j in range(3)}
    for i in range(3)
}
print(f"\\nMatrix: {matrix}")

# Set comprehension
unique_lengths = {len(word) for word in "the quick brown fox".split()}
print(f"\\nUnique lengths: {unique_lengths}")
`,
    },
    interviewQuestions: [
      {
        question: "How do you create a dictionary from two lists?",
        difficulty: "Easy",
        hint: "Use zip() with dict comprehension: {k: v for k, v in zip(keys, values)}. Or simply: dict(zip(keys, values)). zip pairs elements by position. If lists are different lengths, zip stops at the shortest. Use itertools.zip_longest for different-length lists with a fillvalue. For an enumerated dict: {i: v for i, v in enumerate(values)}. These patterns are extremely common for data transformation.",
      },
      {
        question: "How do you invert a dictionary and what are the pitfalls?",
        difficulty: "Medium",
        hint: "Basic inversion: {v: k for k, v in d.items()}. Pitfall 1: duplicate values — later entries overwrite earlier ones. If values aren't unique, collect into lists: from collections import defaultdict; inv = defaultdict(list); for k,v in d.items(): inv[v].append(k). Pitfall 2: values must be hashable (can't invert {1: [1,2]}). Pitfall 3: one-to-many vs many-to-one relationships change direction. Always consider whether inversion is meaningful for your data.",
      },
      {
        question: "What is the difference between dict, set, and list comprehension syntax?",
        difficulty: "Hard",
        hint: "List: [expr for x in iter]. Dict: {key: val for x in iter}. Set: {expr for x in iter}. The {} is ambiguous — with colon it's dict, without it's set. Empty {} is dict (use set() for empty set). Generator: (expr for x in iter) — not a tuple comprehension. All support if filtering and nested for. Performance: comprehensions are compiled to optimized bytecode, faster than equivalent loop+append. Nesting: [... for x in [...for y in ...]] — inner comprehension creates the iterable for the outer one.",
      },
    ],
  },
  // ─── Level 5: Strings & Built-in Functions ──────────────────────────────────
  {
    id: "python-strings",
    title: "Python Strings",
    slug: "python-strings",
    icon: "Type",
    difficulty: "Beginner",
    description:
      "Understand Python strings — creation, indexing, slicing, immutability, escape characters, and common operations.",
    concept: {
      explanation:
        "Strings in Python are immutable sequences of Unicode characters. They can be created with single quotes, double quotes, or triple quotes (for multi-line). Strings support indexing (s[0]), negative indexing (s[-1]), and slicing (s[1:4]). Since strings are immutable, operations like concatenation and replacement return new strings. Common operations include concatenation (+), repetition (*), membership (in), and length (len()). Strings are iterable, so you can loop over characters. Raw strings (r'...') treat backslashes literally, useful for regex and file paths.",
      realLifeAnalogy:
        "A string is like a row of beads on a wire. Each bead is a character with a fixed position. You can look at any bead by its position (indexing), take a section of beads (slicing), but you cannot change a bead in place — you must create a new row. Triple-quoted strings are like a bead arrangement that spans multiple rows.",
      keyPoints: [
        "Created with single, double, or triple quotes",
        "Immutable — cannot change characters in place",
        "Support indexing (s[0]) and slicing (s[1:4])",
        "Negative indexing: s[-1] is the last character",
        "Concatenation (+) and repetition (*)",
        "Membership test: 'abc' in 'abcdef' → True",
        "Escape characters: \\n, \\t, \\\\, \\'",
        "Raw strings (r'...') ignore escape sequences",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Python Strings =====

# Creating strings
single = 'Hello'
double = "World"
triple = """This is
a multi-line
string"""
print(single, double)
print(triple)

# Indexing and slicing
text = "Python"
print(f"\\nFirst: {text[0]}")       # P
print(f"Last: {text[-1]}")          # n
print(f"Slice: {text[1:4]}")        # yth
print(f"Every 2nd: {text[::2]}")    # Pto
print(f"Reversed: {text[::-1]}")    # nohtyP

# String operations
greeting = "Hello" + " " + "World"
print(f"\\nConcat: {greeting}")
print(f"Repeat: {'ha' * 3}")        # hahaha
print(f"Length: {len(greeting)}")    # 11
print(f"'lo' in greeting: {'lo' in greeting}")  # True

# Escape characters
print(f"\\nTab:\\there")
print(f"Newline:\\nhere")
print(f"Backslash: \\\\")

# Raw string
path = r"C:\\Users\\name\\docs"
print(f"\\nRaw: {path}")

# Immutability demo
s = "hello"
# s[0] = 'H'  # TypeError!
s = 'H' + s[1:]  # Create new string
print(f"New string: {s}")

# Iterating
for char in "Hi!":
    print(char, end=" ")
print()
`,
    },
    interviewQuestions: [
      {
        question: "Why are Python strings immutable?",
        difficulty: "Easy",
        hint: "Immutability means string objects cannot be changed after creation. Benefits: 1) Strings can be used as dictionary keys and set elements (hashable). 2) Thread safety — no locks needed for shared strings. 3) Memory optimization — Python can intern/cache common strings. 4) Security — strings used for file paths, SQL queries, URLs can't be accidentally modified. To 'change' a string, you create a new one: s = 'H' + s[1:]. Methods like upper(), replace() return new strings. Use list(s) to get a mutable character list, then ''.join(list).",
      },
      {
        question: "Explain string slicing with all three parameters.",
        difficulty: "Medium",
        hint: "Syntax: s[start:stop:step]. start is inclusive (default 0), stop is exclusive (default len), step is the increment (default 1). Negative indices count from end: s[-3:] gets last 3 chars. Negative step reverses: s[::-1] reverses the string. s[::2] gets every other character. Slicing never raises IndexError — it silently handles out-of-range indices. s[1:100] on a 5-char string returns s[1:5]. Slicing returns a new string (since strings are immutable).",
      },
      {
        question: "What is string interning and when does Python do it?",
        difficulty: "Hard",
        hint: "String interning is an optimization where Python reuses existing string objects instead of creating new ones. CPython automatically interns: 1) String literals at compile time. 2) Strings that look like identifiers (alphanumeric + underscore). 3) Strings used as variable/function/attribute names. The is operator checks identity, not equality — interned strings may pass is, but always use == for comparison. sys.intern() forces interning. Interning saves memory for repeated strings and speeds up comparisons (pointer comparison vs char-by-char).",
      },
    ],
  },
  {
    id: "python-string-methods",
    title: "String Methods",
    slug: "python-string-methods",
    icon: "Type",
    difficulty: "Beginner",
    description:
      "Master Python's rich string methods — case conversion, searching, splitting, joining, stripping, and replacing.",
    concept: {
      explanation:
        "Python strings have 40+ built-in methods. Case methods: upper(), lower(), title(), capitalize(), swapcase(). Search methods: find(), index(), count(), startswith(), endswith(). Modification methods: replace(), strip(), lstrip(), rstrip(). Split/join: split(), rsplit(), splitlines(), join(). Checking methods: isalpha(), isdigit(), isalnum(), isspace(), isupper(), islower(). All string methods return new strings (immutability). The join() method is especially important — it is called on the separator string with an iterable: ','.join(list).",
      realLifeAnalogy:
        "String methods are like text editing tools. upper() is the CAPS LOCK key. strip() is an eraser for whitespace margins. split() is scissors cutting text at every space. join() is glue that puts pieces back together with something between them. replace() is Find & Replace. Each tool gives you a fresh copy — the original text stays untouched.",
      keyPoints: [
        "Case: upper(), lower(), title(), capitalize()",
        "Search: find(), index(), count(), startswith(), endswith()",
        "Modify: replace(), strip(), lstrip(), rstrip()",
        "Split/Join: split(), join(), splitlines()",
        "Check: isalpha(), isdigit(), isalnum(), isspace()",
        "All methods return NEW strings (immutable)",
        "find() returns -1 if not found; index() raises ValueError",
        "join() is called on separator: ','.join(['a','b','c'])",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== String Methods =====

text = "  Hello, World!  "

# Case methods
print(text.strip().upper())      # HELLO, WORLD!
print(text.strip().lower())      # hello, world!
print("hello world".title())     # Hello World
print("hello".capitalize())      # Hello

# Strip whitespace
print(f"'{text}'")
print(f"'{text.strip()}'")       # Remove both sides
print(f"'{text.lstrip()}'")      # Remove left
print(f"'{text.rstrip()}'")      # Remove right

# Find and search
s = "Python is awesome and Python is fun"
print(f"\\nfind 'Python': {s.find('Python')}")    # 0
print(f"rfind 'Python': {s.rfind('Python')}")     # 22
print(f"count 'Python': {s.count('Python')}")     # 2
print(f"starts with 'Py': {s.startswith('Py')}")  # True

# Replace
print(f"\\n{s.replace('Python', 'Java')}")

# Split and join
words = "apple,banana,cherry".split(",")
print(f"\\nSplit: {words}")
print(f"Join: {' | '.join(words)}")

csv_line = "  Alice , 30 , NYC  "
fields = [f.strip() for f in csv_line.split(",")]
print(f"Clean split: {fields}")

# Check methods
print(f"\\n'abc'.isalpha(): {'abc'.isalpha()}")
print(f"'123'.isdigit(): {'123'.isdigit()}")
print(f"'abc123'.isalnum(): {'abc123'.isalnum()}")
print(f"'   '.isspace(): {'   '.isspace()}")

# Method chaining
result = "  hello world  ".strip().title().replace(" ", "-")
print(f"\\nChained: {result}")  # Hello-World
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between find() and index()?",
        difficulty: "Easy",
        hint: "Both search for a substring and return the position of the first occurrence. Key difference: find() returns -1 if not found, while index() raises ValueError. Use find() when missing substring is expected (check result != -1). Use index() when missing substring is a bug (let it crash). Both accept optional start/end parameters. rfind()/rindex() search from the right. For simple existence checks, use 'in' operator: 'sub' in string.",
      },
      {
        question: "Explain the difference between split() and partition().",
        difficulty: "Medium",
        hint: "split(sep) divides string at ALL occurrences and returns a list. partition(sep) splits at the FIRST occurrence and returns a 3-tuple: (before, sep, after). split(',', 1) also splits at first occurrence but returns 2 items. split() with no args splits on any whitespace and removes empty strings. partition always returns exactly 3 elements — if separator not found, returns (string, '', ''). rpartition splits at the last occurrence.",
      },
      {
        question: "Why is join() a string method rather than a list method?",
        difficulty: "Hard",
        hint: "join() is on str because: 1) It works with ANY iterable (list, tuple, generator, set), not just lists — putting it on list would miss other iterables. 2) The separator is the key context — ','.join(items) reads as 'join items with comma'. 3) The result is always a string, regardless of input type. 4) It follows Python's design principle: methods belong to the return type. Performance: join() is O(n) — it pre-calculates total length and copies once. Using + in a loop is O(n²) because each concatenation creates a new string. Always use join() for combining multiple strings.",
      },
    ],
  },
  {
    id: "python-string-formatting",
    title: "String Formatting",
    slug: "python-string-formatting",
    icon: "Type",
    difficulty: "Beginner",
    description:
      "Learn Python's string formatting methods — % operator, str.format(), template strings, and when to use each approach.",
    concept: {
      explanation:
        "Python has several string formatting methods that evolved over time. The % operator (printf-style): 'Hello %s, you are %d' % (name, age). str.format(): 'Hello {}, you are {}'.format(name, age). format() supports positional args, named args, format specs (alignment, padding, precision). Format spec mini-language: {value:width.precisiontype} — e.g., {price:.2f} for 2 decimal places. Template strings (string.Template): safe for user-provided templates. While f-strings (Python 3.6+) are now preferred, understanding format() is essential for dynamic format strings and compatibility.",
      realLifeAnalogy:
        "String formatting is like filling in a Mad Libs form. The % operator is the original form with numbered blanks. str.format() is an improved version where blanks can be named or numbered. It is like having a template letter where you fill in {name}, {date}, {amount} — the structure stays the same, only the values change.",
      keyPoints: [
        "% operator: 'Hello %s' % name (oldest style)",
        "str.format(): 'Hello {}'.format(name)",
        "Positional: '{0} and {1}'.format('a', 'b')",
        "Named: '{name} is {age}'.format(name='Al', age=30)",
        "Format spec: {value:width.precisiontype}",
        "Alignment: {:<10} left, {:>10} right, {:^10} center",
        "Number formatting: {:,.2f} → 1,234.56",
        "Template strings: safe for untrusted input",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== String Formatting =====

name = "Alice"
age = 30
price = 49.99

# 1. % operator (old style)
print("Hello %s, you are %d years old" % (name, age))
print("Price: $%.2f" % price)
print("Hex: %x, Oct: %o, Bin: %s" % (255, 255, bin(255)))

# 2. str.format() method
print("\\n{} is {} years old".format(name, age))
print("{0} likes {1}. {0} is cool.".format(name, "Python"))
print("{name} is {age}".format(name="Bob", age=25))

# 3. Format spec mini-language
# Alignment and padding
print(f"\\n{'Left':<15}|")    # Left-aligned
print(f"{'Right':>15}|")      # Right-aligned
print(f"{'Center':^15}|")     # Center-aligned
print(f"{'Padded':*^15}|")    # Custom fill char

# Number formatting
big_num = 1234567.891
print(f"\\nDefault: {big_num}")
print(f"Comma: {big_num:,.2f}")       # 1,234,567.89
print(f"Percent: {0.856:.1%}")        # 85.6%
print(f"Scientific: {big_num:.2e}")   # 1.23e+06

# Width and precision
for item, cost in [("Coffee", 4.5), ("Sandwich", 8.99), ("Cake", 12.0)]:
    print(f"  {item:<12} \${cost:>6.2f}")

# 4. Template strings (safe for user input)
from string import Template
t = Template("Hello $name, you have $$$\${amount}")
print(f"\\n{t.substitute(name='Alice', amount=100)}")

# Dynamic format strings (where format() shines over f-strings)
fmt = "Name: {name:<10} Score: {score:>5}"
for data in [{"name": "Alice", "score": 95}, {"name": "Bob", "score": 87}]:
    print(fmt.format(**data))
`,
    },
    interviewQuestions: [
      {
        question: "What are the different string formatting methods in Python?",
        difficulty: "Easy",
        hint: "Four methods: 1) % operator (printf-style, oldest): '%s is %d' % (name, age). 2) str.format(): '{} is {}'.format(name, age). 3) f-strings (Python 3.6+): f'{name} is {age}'. 4) Template strings (string.Template): Template('$name').substitute(name='A'). f-strings are fastest and most readable for most cases. str.format() is needed for dynamic format strings. Template strings are safest for user-provided templates. % operator is legacy but still seen in logging.",
      },
      {
        question: "Explain the format specification mini-language.",
        difficulty: "Medium",
        hint: "Syntax: [[fill]align][sign][z][#][0][width][grouping][.precision][type]. Align: < left, > right, ^ center, = pad after sign. Sign: + always, - negative only, space for space-or-minus. Types: d int, f float, e scientific, % percentage, b binary, o octal, x hex, s string. Examples: {:>10.2f} right-align float with 2 decimals in 10 chars. {:,} adds thousand separators. {:#x} hex with 0x prefix. {:05d} zero-pad to 5 digits.",
      },
      {
        question: "When would you use str.format() over f-strings?",
        difficulty: "Hard",
        hint: "Use str.format() when: 1) The format string is dynamic/stored: fmt = config['format']; fmt.format(**data). 2) Reusing the same template: t = '{}: {}'; t.format(k, v). 3) Python < 3.6 compatibility. 4) Deferred formatting (logging module uses %-style). 5) When the format string comes from external source (but use Template for untrusted input). f-strings cannot be stored as templates — they evaluate immediately. str.format_map(dict) is useful for defaultdict fallbacks. Performance: f-strings > format() > % in most benchmarks.",
      },
    ],
  },
  {
    id: "python-f-strings",
    title: "f-Strings",
    slug: "python-f-strings",
    icon: "Type",
    difficulty: "Beginner",
    description:
      "Master f-strings (formatted string literals) — Python's most readable and efficient string formatting with inline expressions.",
    concept: {
      explanation:
        "f-strings (formatted string literals), introduced in Python 3.6, allow embedding expressions inside string literals using {expression}. They are prefixed with f or F. Any valid Python expression can go inside the braces — variables, arithmetic, function calls, method calls, conditionals, and even comprehensions. f-strings support the same format spec as str.format(): f'{value:.2f}'. Python 3.8 added the = specifier for debugging: f'{x=}' prints 'x=42'. Python 3.12 allows nested f-strings and multiline expressions. f-strings are the fastest string formatting method because they are compiled at parse time.",
      realLifeAnalogy:
        "f-strings are like writing a letter where you can directly embed live data in the text. Instead of writing 'Dear [NAME]' and filling it in later, you write f'Dear {name}' and Python fills it in immediately as it reads the line. The f prefix is like telling Python: 'this text has live slots — fill them in right now.'",
      keyPoints: [
        "Prefix with f or F: f'Hello {name}'",
        "Any expression inside {}: f'{2 + 2}', f'{s.upper()}'",
        "Format spec: f'{price:.2f}', f'{num:,}'",
        "Debug specifier (3.8+): f'{x=}' prints 'x=value'",
        "Multiline with triple quotes: f'''...'''",
        "Fastest formatting method (compiled at parse time)",
        "Supports conditionals: f'{\"yes\" if x else \"no\"}'",
        "Nested f-strings allowed in Python 3.12+",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== f-Strings =====

name = "Alice"
age = 30

# Basic usage
print(f"Hello, {name}!")
print(f"{name} is {age} years old")

# Expressions inside braces
print(f"\\n2 + 3 = {2 + 3}")
print(f"Uppercase: {name.upper()}")
print(f"Length: {len(name)}")

# Conditionals
score = 85
print(f"\\nGrade: {'Pass' if score >= 60 else 'Fail'}")

# Format spec
pi = 3.14159265
print(f"\\nPi: {pi:.2f}")          # 3.14
print(f"Price: \${49.99:>10.2f}")   # Right-aligned
print(f"Big: {1234567:,}")         # 1,234,567
print(f"Pct: {0.856:.1%}")        # 85.6%
print(f"Bin: {42:b}")              # 101010
print(f"Hex: {255:#x}")            # 0xff

# Debug specifier (Python 3.8+)
x = 42
items = [1, 2, 3]
print(f"\\n{x=}")                   # x=42
print(f"{len(items)=}")            # len(items)=3
print(f"{name.lower()=}")          # name.lower()='alice'

# Multiline f-strings
user = {"name": "Bob", "role": "admin", "active": True}
info = f"""
User Report
-----------
Name:   {user['name']}
Role:   {user['role'].title()}
Status: {'Active' if user['active'] else 'Inactive'}
"""
print(info)

# Practical: table formatting
products = [("Coffee", 4.50), ("Sandwich", 8.99), ("Cake", 12.00)]
print(f"{'Product':<12} {'Price':>8}")
print("-" * 21)
for name, price in products:
    print(f"{name:<12} \${price:>7.2f}")
total = sum(p for _, p in products)
print(f"{'Total':<12} \${total:>7.2f}")
`,
    },
    interviewQuestions: [
      {
        question: "What are f-strings and why are they preferred?",
        difficulty: "Easy",
        hint: "f-strings (formatted string literals, Python 3.6+) embed expressions in strings: f'{expr}'. Preferred because: 1) Most readable — the value is right where it's used. 2) Fastest — compiled at parse time, not runtime string manipulation. 3) Any expression allowed — function calls, arithmetic, methods. 4) Same format spec support as .format(). 5) Debugging with = specifier (3.8+): f'{x=}'. Limitations: can't be used as templates (evaluated immediately), need backslash workarounds for some characters in expressions.",
      },
      {
        question: "How does the f-string debug specifier (=) work?",
        difficulty: "Medium",
        hint: "Added in Python 3.8, f'{expr=}' prints both the expression text and its value. f'{x=}' → 'x=42'. Works with any expression: f'{len(items)=}' → 'len(items)=3'. Preserves spaces: f'{x = }' → 'x = 42'. Can combine with format spec: f'{x=:.2f}' → 'x=42.00'. Extremely useful for debugging — replaces print(f'x={x}'). Also works with repr: f'{s=!r}' uses repr() on the value.",
      },
      {
        question: "What are the performance differences between formatting methods?",
        difficulty: "Hard",
        hint: "f-strings are fastest because they compile to efficient bytecode (FORMAT_VALUE opcode) at parse time — no method call overhead. str.format() is next — involves method lookup and parsing the format string at runtime. % operator is similar to format() in speed. Template strings are slowest (regex-based substitution). Benchmarks typically show: f-string ~2x faster than format(), ~3x faster than %. For string concatenation: + is fast for 2-3 strings, join() for many. In tight loops, the difference matters; for most code, readability wins.",
      },
    ],
  },
  {
    id: "python-builtin-functions",
    title: "Built-in Functions",
    slug: "python-builtin-functions",
    icon: "Zap",
    difficulty: "Intermediate",
    description:
      "Explore Python's essential built-in functions — print, len, range, type, isinstance, sorted, reversed, abs, round, and more.",
    concept: {
      explanation:
        "Python has ~70 built-in functions available without any import. Key categories: I/O: print(), input(). Type conversion: int(), float(), str(), bool(), list(), tuple(), set(), dict(). Math: abs(), round(), min(), max(), sum(), pow(), divmod(). Iteration: range(), len(), sorted(), reversed(), enumerate(), zip(), map(), filter(). Type checking: type(), isinstance(), issubclass(). Object: id(), hash(), dir(), vars(), getattr(), setattr(), hasattr(). Other: any(), all(), callable(), repr(), format(), chr(), ord(). Understanding these eliminates the need for many common utility functions.",
      realLifeAnalogy:
        "Built-in functions are like the basic tools in a kitchen that come standard: a knife (len — measure things), a stove (print — output results), a scale (type — check what something is), and a strainer (filter — keep only what you want). You don't need to buy these separately — they are always available when you start cooking (coding).",
      keyPoints: [
        "~70 built-in functions, always available",
        "Type conversion: int(), float(), str(), bool(), list()",
        "Math: abs(), round(), min(), max(), sum()",
        "Iteration: range(), len(), sorted(), reversed()",
        "Type checking: type(), isinstance()",
        "Inspection: dir(), vars(), help(), id()",
        "Boolean: any(), all()",
        "sorted() returns new list; .sort() modifies in place",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Built-in Functions =====

# Type conversion
print(int("42"))           # 42
print(float("3.14"))       # 3.14
print(str(100))            # "100"
print(bool(0), bool(1))   # False True
print(list("abc"))         # ['a', 'b', 'c']

# Math functions
print(f"\\nabs(-7): {abs(-7)}")
print(f"round(3.567, 1): {round(3.567, 1)}")
print(f"pow(2, 10): {pow(2, 10)}")
print(f"divmod(17, 5): {divmod(17, 5)}")  # (3, 2)

nums = [3, 1, 4, 1, 5, 9, 2, 6]
print(f"\\nmin: {min(nums)}")
print(f"max: {max(nums)}")
print(f"sum: {sum(nums)}")
print(f"sorted: {sorted(nums)}")
print(f"reversed: {list(reversed(nums))}")

# any() and all()
print(f"\\nany([0, '', None, 42]): {any([0, '', None, 42])}")  # True
print(f"all([1, 'hi', True]): {all([1, 'hi', True])}")         # True
print(f"all([1, 0, True]): {all([1, 0, True])}")               # False

# Type checking
x = 42
print(f"\\ntype(x): {type(x)}")
print(f"isinstance(x, int): {isinstance(x, int)}")
print(f"isinstance(x, (int, float)): {isinstance(x, (int, float))}")

# range
print(f"\\nrange(5): {list(range(5))}")
print(f"range(2,8): {list(range(2, 8))}")
print(f"range(0,10,3): {list(range(0, 10, 3))}")

# chr() and ord()
print(f"\\nchr(65): {chr(65)}")     # 'A'
print(f"ord('A'): {ord('A')}")     # 65

# dir() — see object attributes
print(f"\\nList methods: {[m for m in dir([]) if not m.startswith('_')]}")

# Practical: input validation
def safe_int(value, default=0):
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

print(f"\\nsafe_int('42'): {safe_int('42')}")
print(f"safe_int('abc'): {safe_int('abc')}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between type() and isinstance()?",
        difficulty: "Easy",
        hint: "type(obj) returns the exact type object. isinstance(obj, cls) returns True if obj is an instance of cls or any subclass. isinstance() is preferred for type checking because it supports inheritance: isinstance(True, int) → True (bool is subclass of int), but type(True) == int → False. isinstance() also accepts a tuple of types: isinstance(x, (int, float)). type() is useful for exact type comparison and metaclass programming.",
      },
      {
        question: "Explain how sorted() works with the key parameter.",
        difficulty: "Medium",
        hint: "sorted(iterable, key=func, reverse=bool) returns a new sorted list. The key function is called on each element to extract a comparison key. Examples: sorted(words, key=len) sorts by length. sorted(words, key=str.lower) case-insensitive sort. sorted(dicts, key=lambda d: d['age']) sort dicts by value. sorted() uses Timsort — stable, O(n log n). key is called once per element (not on every comparison). operator.itemgetter() and operator.attrgetter() are faster alternatives to lambdas.",
      },
      {
        question: "What is the difference between any()/all() and how are they used?",
        difficulty: "Hard",
        hint: "any(iterable) returns True if ANY element is truthy (short-circuits on first True). all(iterable) returns True if ALL elements are truthy (short-circuits on first False). Both return True for empty iterables (all) or False (any). Common patterns: any(x > 10 for x in nums) — check if any match. all(isinstance(x, int) for x in items) — validate all items. They work with generators for lazy evaluation. Implementation: any is like chained 'or', all is like chained 'and'. De Morgan's: not any(items) == all(not x for x in items).",
      },
    ],
  },
  {
    id: "python-enumerate",
    title: "enumerate()",
    slug: "python-enumerate",
    icon: "Hash",
    difficulty: "Intermediate",
    description:
      "Learn how enumerate() adds automatic counters to iterables — the Pythonic way to track indices in loops.",
    concept: {
      explanation:
        "enumerate(iterable, start=0) wraps an iterable and yields (index, element) tuples. It is the Pythonic replacement for manually tracking indices with a counter variable or using range(len(...)). enumerate returns a lazy iterator, so it is memory-efficient. You can customize the starting index with the start parameter. It works with any iterable — lists, strings, files, generators. Common patterns: for i, item in enumerate(items), creating numbered dictionaries, and finding indices of matching elements.",
      realLifeAnalogy:
        "enumerate() is like a librarian adding shelf numbers to books as they place them on a shelf. Instead of first numbering the shelves and then putting books there (range + index), the librarian numbers each position as they go — book in hand, number assigned, placed on shelf. The numbering happens naturally with each step.",
      keyPoints: [
        "Yields (index, value) pairs from any iterable",
        "Default start is 0; customize with start=n",
        "Returns a lazy enumerate object (memory efficient)",
        "Replaces range(len(x)) anti-pattern",
        "Works with tuple unpacking: for i, val in enumerate(x)",
        "Can convert to list/dict: dict(enumerate(items))",
        "Works with any iterable: lists, strings, files",
        "Commonly used for numbered output and index tracking",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== enumerate() =====

fruits = ["apple", "banana", "cherry", "date"]

# Without enumerate (anti-pattern)
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# With enumerate (Pythonic)
print("\\nWith enumerate:")
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Custom start index
print("\\nStarting from 1:")
for num, fruit in enumerate(fruits, start=1):
    print(f"{num}. {fruit}")

# enumerate is lazy (returns an iterator)
e = enumerate(fruits)
print(f"\\nType: {type(e)}")
print(f"next: {next(e)}")
print(f"next: {next(e)}")

# Convert to list of tuples or dict
print(f"\\nAs list: {list(enumerate(fruits))}")
print(f"As dict: {dict(enumerate(fruits))}")

# Practical: find all indices of a value
text = "the cat sat on the mat"
words = text.split()
the_indices = [i for i, w in enumerate(words) if w == "the"]
print(f"\\n'the' found at indices: {the_indices}")

# Practical: numbered menu
menu = ["Start Game", "Load Save", "Settings", "Quit"]
print("\\n=== Main Menu ===")
for i, option in enumerate(menu, 1):
    print(f"  [{i}] {option}")

# With strings
word = "Python"
for i, char in enumerate(word):
    print(f"  Index {i}: '{char}'")

# Parallel tracking with enumerate
scores = [85, 92, 78, 95, 88]
best_idx, best_score = max(enumerate(scores), key=lambda x: x[1])
print(f"\\nHighest score: {best_score} at index {best_idx}")
`,
    },
    interviewQuestions: [
      {
        question: "Why is enumerate() preferred over range(len())?",
        difficulty: "Easy",
        hint: "range(len(x)) is considered an anti-pattern in Python because: 1) Less readable — for i in range(len(items)): items[i] vs for i, item in enumerate(items). 2) More error-prone — manual indexing can cause off-by-one errors. 3) Doesn't work with all iterables — only sequences with len(). enumerate() works with any iterable. 4) Pythonic — follows 'there should be one obvious way to do it'. 5) Same performance. The only time range(len()) is needed: when you need to modify list elements in place by index.",
      },
      {
        question: "How does enumerate() work internally?",
        difficulty: "Medium",
        hint: "enumerate is a built-in class (not a function) that implements the iterator protocol. Roughly equivalent to: def enumerate(iterable, start=0): n = start; for elem in iterable: yield n, elem; n += 1. It is lazy — generates one (index, value) pair at a time without storing all pairs in memory. It calls iter() on the input and next() in __next__(). The start parameter only affects the counter, not which elements are yielded. Since it's a class, enumerate objects have __iter__ and __next__ methods.",
      },
      {
        question: "How would you implement your own enumerate function?",
        difficulty: "Hard",
        hint: "Generator version: def my_enumerate(iterable, start=0): index = start; for item in iterable: yield index, item; index += 1. Class version: class MyEnumerate: def __init__(self, iterable, start=0): self.iterator = iter(iterable); self.index = start. def __iter__(self): return self. def __next__(self): value = next(self.iterator); index = self.index; self.index += 1; return index, value. Key details: must call iter() on input (supports any iterable), StopIteration propagates from inner iterator, start doesn't skip elements.",
      },
    ],
  },
  {
    id: "python-zip",
    title: "zip()",
    slug: "python-zip",
    icon: "GitMerge",
    difficulty: "Intermediate",
    description:
      "Master zip() for combining multiple iterables in parallel — pairing, transposing, and creating dictionaries from parallel lists.",
    concept: {
      explanation:
        "zip(*iterables) combines elements from multiple iterables into tuples, pairing elements by position. zip('abc', [1,2,3]) yields ('a',1), ('b',2), ('c',3). By default, zip stops at the shortest iterable. itertools.zip_longest fills missing values with a fillvalue. zip returns a lazy iterator. Common uses: creating dicts from key/value lists, iterating multiple lists in parallel, transposing matrices (zip(*matrix)), and unzipping with zip(*zipped). zip is fundamental to Pythonic code for parallel iteration.",
      realLifeAnalogy:
        "zip() is like a zipper on a jacket — it takes two separate sides (iterables) and interlocks them tooth by tooth (element by element). Just like a real zipper stops at the shorter side, zip() stops at the shortest iterable. Unzipping (zip(*pairs)) is like opening the zipper — separating the interlocked pairs back into two separate sides.",
      keyPoints: [
        "Combines elements from multiple iterables by position",
        "Returns lazy iterator of tuples",
        "Stops at shortest iterable by default",
        "itertools.zip_longest for unequal lengths",
        "Unzip with zip(*zipped_data)",
        "Create dicts: dict(zip(keys, values))",
        "Transpose matrix: list(zip(*matrix))",
        "Python 3.10+: strict=True raises on unequal lengths",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== zip() =====

names = ["Alice", "Bob", "Charlie"]
ages = [30, 25, 35]
cities = ["NYC", "LA", "Chicago"]

# Basic zip
for name, age in zip(names, ages):
    print(f"{name} is {age}")

# Zip three iterables
print("\\nThree lists:")
for name, age, city in zip(names, ages, cities):
    print(f"  {name}, {age}, {city}")

# Create dictionary from two lists
person = dict(zip(names, ages))
print(f"\\nDict: {person}")

# Stops at shortest
short = [1, 2]
long = ['a', 'b', 'c', 'd']
print(f"\\nShortest: {list(zip(short, long))}")  # [(1,'a'), (2,'b')]

# zip_longest for unequal lengths
from itertools import zip_longest
print(f"Longest: {list(zip_longest(short, long, fillvalue='-'))}")

# Unzipping
pairs = [("a", 1), ("b", 2), ("c", 3)]
letters, numbers = zip(*pairs)
print(f"\\nLetters: {letters}")
print(f"Numbers: {numbers}")

# Transpose a matrix
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
transposed = [list(row) for row in zip(*matrix)]
print(f"\\nOriginal:   {matrix}")
print(f"Transposed: {transposed}")

# Practical: parallel comparison
scores_a = [85, 92, 78]
scores_b = [80, 95, 82]
print("\\nComparison:")
for i, (a, b) in enumerate(zip(scores_a, scores_b), 1):
    winner = "A" if a > b else "B" if b > a else "Tie"
    print(f"  Round {i}: {a} vs {b} → {winner}")

# Practical: moving average
data = [10, 20, 30, 40, 50]
pairs = zip(data, data[1:])
diffs = [b - a for a, b in pairs]
print(f"\\nData: {data}")
print(f"Diffs: {diffs}")
`,
    },
    interviewQuestions: [
      {
        question: "What does zip() return and how does it handle unequal lengths?",
        difficulty: "Easy",
        hint: "zip() returns a lazy iterator of tuples, pairing elements by position. By default, it stops at the shortest iterable — extra elements from longer iterables are silently ignored. Use itertools.zip_longest(a, b, fillvalue=None) to pad shorter iterables. Python 3.10+ added strict=True parameter: zip(a, b, strict=True) raises ValueError if lengths differ. Always be aware of silent truncation — it can cause subtle bugs.",
      },
      {
        question: "How do you unzip a list of tuples and how does it work?",
        difficulty: "Medium",
        hint: "Unzip with zip(*pairs). If pairs = [('a',1), ('b',2), ('c',3)], then zip(*pairs) unpacks to zip(('a',1), ('b',2), ('c',3)), which yields ('a','b','c') and (1,2,3). The * unpacks the outer list as separate arguments. Result is tuples, not lists — convert with [list(x) for x in zip(*pairs)]. This is essentially a matrix transpose. Common for separating columns from rows of data. Note: zip(*[]) returns empty iterator.",
      },
      {
        question: "How can you use zip() to transpose a matrix?",
        difficulty: "Hard",
        hint: "matrix = [[1,2,3],[4,5,6],[7,8,9]]. zip(*matrix) unpacks rows as args: zip([1,2,3],[4,5,6],[7,8,9]). This yields (1,4,7), (2,5,8), (3,6,9) — the columns. transposed = [list(row) for row in zip(*matrix)]. For ragged arrays (different row lengths), zip truncates to shortest — use zip_longest to preserve all values. NumPy alternative: np.array(matrix).T. This works because zip pairs the nth element of each row, creating columns as rows. It is a common interview question testing understanding of both zip and unpacking.",
      },
    ],
  },
  {
    id: "python-map-filter-reduce",
    title: "map() filter() reduce()",
    slug: "python-map-filter-reduce",
    icon: "Zap",
    difficulty: "Intermediate",
    description:
      "Learn functional programming tools — map() for transforming, filter() for selecting, and reduce() for accumulating values.",
    concept: {
      explanation:
        "map(), filter(), and reduce() are functional programming tools for processing iterables. map(func, iterable) applies func to every element and returns a lazy iterator. filter(func, iterable) returns elements where func returns True. functools.reduce(func, iterable, initial) accumulates a single result by applying func to pairs of elements. map and filter are built-in; reduce is in functools. All three return lazy iterators (except reduce which returns a single value). While list comprehensions and generator expressions often replace map/filter in modern Python, understanding these is essential for functional programming patterns.",
      realLifeAnalogy:
        "Imagine a factory assembly line. map() is the transformation station — every item gets processed the same way (like painting every widget blue). filter() is the quality control station — items that pass inspection continue, rejects are removed. reduce() is the packaging station at the end — all items are combined into a single box (like summing all weights into a total).",
      keyPoints: [
        "map(func, iterable) — transform every element",
        "filter(func, iterable) — keep elements where func is True",
        "reduce(func, iterable) — accumulate to single value",
        "map and filter return lazy iterators",
        "reduce is in functools module",
        "filter(None, iterable) removes falsy values",
        "List comprehensions often preferred over map/filter",
        "Can use lambda or named functions",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== map(), filter(), reduce() =====
from functools import reduce

# ── map() ─────────────────────────────────
nums = [1, 2, 3, 4, 5]

# Square every number
squared = list(map(lambda x: x**2, nums))
print(f"Squared: {squared}")

# Convert types
str_nums = ["1", "2", "3", "4"]
int_nums = list(map(int, str_nums))
print(f"Converted: {int_nums}")

# Multiple iterables
a = [1, 2, 3]
b = [10, 20, 30]
sums = list(map(lambda x, y: x + y, a, b))
print(f"Sums: {sums}")

# ── filter() ──────────────────────────────
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens = list(filter(lambda x: x % 2 == 0, nums))
print(f"\\nEvens: {evens}")

# filter(None, ...) removes falsy values
mixed = [0, 1, "", "hello", None, 42, [], [1,2]]
truthy = list(filter(None, mixed))
print(f"Truthy: {truthy}")

# With named function
def is_prime(n):
    if n < 2: return False
    return all(n % i != 0 for i in range(2, int(n**0.5) + 1))

primes = list(filter(is_prime, range(20)))
print(f"Primes: {primes}")

# ── reduce() ──────────────────────────────
nums = [1, 2, 3, 4, 5]

# Sum (equivalent to sum())
total = reduce(lambda a, b: a + b, nums)
print(f"\\nSum: {total}")

# Product
product = reduce(lambda a, b: a * b, nums)
print(f"Product: {product}")

# Find max (equivalent to max())
maximum = reduce(lambda a, b: a if a > b else b, nums)
print(f"Max: {maximum}")

# Flatten nested lists
nested = [[1, 2], [3, 4], [5, 6]]
flat = reduce(lambda a, b: a + b, nested)
print(f"Flattened: {flat}")

# ── Comparison with comprehensions ────────
print("\\n--- map vs comprehension ---")
# These are equivalent:
print(list(map(lambda x: x**2, range(5))))
print([x**2 for x in range(5)])

# These are equivalent:
print(list(filter(lambda x: x > 2, range(5))))
print([x for x in range(5) if x > 2])

# Chaining map + filter
result = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, range(10))))
result2 = [x**2 for x in range(10) if x % 2 == 0]
print(f"\\nChained: {result}")
print(f"Comprehension: {result2}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between map() and a list comprehension?",
        difficulty: "Easy",
        hint: "map(func, iterable) applies func to each element. Equivalent list comprehension: [func(x) for x in iterable]. Key differences: 1) map returns a lazy iterator; comprehension creates a list immediately. 2) Comprehensions are more Pythonic and readable, especially with complex expressions. 3) map is slightly faster for simple built-in functions (map(int, strings)). 4) Comprehensions can filter (if clause) — map cannot. 5) map with lambda is usually less readable than comprehension. PEP 8 prefers comprehensions for clarity.",
      },
      {
        question: "How does filter(None, iterable) work?",
        difficulty: "Medium",
        hint: "When None is passed as the function, filter uses the truthiness of each element. filter(None, items) keeps only truthy values — equivalent to filter(bool, items) or [x for x in items if x]. Falsy values removed: 0, 0.0, '', [], {}, set(), None, False. This is a common idiom for cleaning data. Example: filter(None, ['', 'hello', None, 'world']) → ['hello', 'world']. Note: 0 is falsy, so filter(None, [0, 1, 2]) loses 0.",
      },
      {
        question: "When should you use reduce() vs a for loop or built-in?",
        difficulty: "Hard",
        hint: "reduce(func, iterable, initial) applies func cumulatively. Prefer built-ins when available: sum() over reduce(add), max() over reduce with comparison. Use reduce for: 1) Custom accumulation (no built-in equivalent). 2) Composing functions: reduce(lambda f,g: lambda x: f(g(x)), funcs). 3) Flattening: reduce(operator.concat, lists). Avoid reduce when: logic is complex (use explicit loop), performance matters (loop can be faster), readability suffers. Guido van Rossum himself advocated against reduce — it was moved from builtins to functools in Python 3.",
      },
    ],
  },
  // ─── Level 6: Object-Oriented Programming ───────────────────────────────────
  {
    id: "python-classes-objects",
    title: "Classes and Objects",
    slug: "python-classes-objects",
    icon: "Box",
    difficulty: "Intermediate",
    description:
      "Understand the foundation of OOP in Python — defining classes, creating objects, and understanding the relationship between them.",
    concept: {
      explanation:
        "A class is a blueprint for creating objects. It defines attributes (data) and methods (behavior). An object is an instance of a class. In Python, everything is an object — integers, strings, functions, even classes themselves. You define a class with the class keyword. When you call ClassName(), Python creates a new instance, calls __init__ to initialize it, and returns the object. Classes create a namespace for attributes and methods. The self parameter refers to the current instance. Python supports single and multiple inheritance, and uses Method Resolution Order (MRO) to resolve method calls.",
      realLifeAnalogy:
        "A class is like an architectural blueprint for a house. The blueprint defines the structure (rooms, doors, windows) but is not a house itself. Each house built from that blueprint is an object (instance). Every house has the same layout (class definition) but can have different paint colors and furniture (instance attributes). You can build many houses from one blueprint.",
      keyPoints: [
        "class keyword defines a new class",
        "Objects are instances created by calling the class",
        "__init__ is called automatically on creation",
        "self refers to the current instance",
        "Attributes store data, methods define behavior",
        "Everything in Python is an object",
        "type() returns the class, isinstance() checks membership",
        "Classes are themselves objects (instances of type)",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Classes and Objects =====

# Define a class
class Dog:
    # Class attribute (shared by all instances)
    species = "Canis familiaris"

    # Constructor (initializer)
    def __init__(self, name, age):
        # Instance attributes (unique to each instance)
        self.name = name
        self.age = age

    # Instance method
    def bark(self):
        return f"{self.name} says Woof!"

    def description(self):
        return f"{self.name} is {self.age} years old"

# Create objects (instances)
dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)

print(dog1.bark())          # Buddy says Woof!
print(dog2.description())   # Max is 5 years old

# Access attributes
print(f"\\n{dog1.name}, {dog1.species}")
print(f"{dog2.name}, {dog2.species}")

# Check types
print(f"\\ntype(dog1): {type(dog1)}")
print(f"isinstance: {isinstance(dog1, Dog)}")

# Each instance is independent
dog1.age = 4
print(f"\\n{dog1.name}: {dog1.age}")
print(f"{dog2.name}: {dog2.age}")

# Objects are mutable
dog1.color = "brown"  # Dynamic attribute
print(f"{dog1.name}'s color: {dog1.color}")
# print(dog2.color)  # AttributeError
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between a class and an object?",
        difficulty: "Easy",
        hint: "A class is a blueprint/template that defines attributes and methods. An object is a specific instance created from that class. Class: defines the structure (Dog has name, age, bark()). Object: a concrete entity (dog1 = Dog('Buddy', 3)). You can create many objects from one class, each with its own attribute values. Analogy: class is a cookie cutter, objects are the cookies. In Python, classes are also objects (instances of type).",
      },
      {
        question: "What is self in Python and why is it needed?",
        difficulty: "Medium",
        hint: "self is a reference to the current instance of the class. It is the first parameter of every instance method. When you call dog1.bark(), Python passes dog1 as self automatically: Dog.bark(dog1). self is needed because: 1) Python needs to know which instance's data to access. 2) It makes the instance explicit (Zen of Python: explicit > implicit). 3) It distinguishes instance attributes from local variables. self is a convention, not a keyword — you could use any name, but self is universal. Class methods use cls instead, and static methods use neither.",
      },
      {
        question: "How does Python's object model differ from other languages?",
        difficulty: "Hard",
        hint: "Python's object model is unique: 1) Everything is an object — int, str, functions, classes, modules. 2) Classes are first-class objects (instances of type). 3) No access modifiers (public/private/protected) — uses naming conventions (_protected, __private with name mangling). 4) Dynamic attributes — can add/remove at runtime. 5) Duck typing over strict type hierarchies. 6) Multiple inheritance with C3 linearization MRO. 7) Metaclasses control class creation. 8) __slots__ can restrict dynamic attributes. 9) Descriptors protocol powers property, classmethod, staticmethod.",
      },
    ],
  },
  {
    id: "python-constructors",
    title: "Constructors",
    slug: "python-constructors",
    icon: "Settings",
    difficulty: "Intermediate",
    description:
      "Learn about Python constructors — __init__ for initialization, __new__ for creation, and how object construction works.",
    concept: {
      explanation:
        "In Python, object construction involves two methods: __new__ and __init__. __new__ is the actual constructor — it creates and returns a new instance. __init__ is the initializer — it sets up the instance's attributes after creation. In practice, you almost always only override __init__. __new__ is rarely overridden except for immutable types (str, int, tuple) or singleton patterns. The construction flow is: obj = MyClass(args) → __new__(cls, args) creates instance → __init__(self, args) initializes it → obj is returned. __init__ must return None.",
      realLifeAnalogy:
        "Think of building a car. __new__ is the factory that creates the physical car body (allocates the object). __init__ is the customization shop that adds the paint color, interior, and accessories (sets attributes). Most of the time, the factory process is standard and you only customize the shop. You rarely need to change how the car body is manufactured (__new__), but you always decide the color and options (__init__).",
      keyPoints: [
        "__init__ initializes the instance (most common)",
        "__new__ creates the instance (rarely overridden)",
        "__init__ receives self (the new instance)",
        "__new__ receives cls (the class itself)",
        "__init__ must return None",
        "__new__ must return an instance",
        "Call super().__init__() in subclass constructors",
        "Use __new__ for singletons and immutable types",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Constructors =====

# Basic __init__ constructor
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print(f"Created: {self.name}")

    def greet(self):
        return f"Hi, I'm {self.name}, {self.age}y/o"

p = Person("Alice", 30)
print(p.greet())

# Default values in constructor
class Config:
    def __init__(self, host="localhost", port=8080, debug=False):
        self.host = host
        self.port = port
        self.debug = debug

    def __repr__(self):
        return f"Config({self.host}:{self.port}, debug={self.debug})"

c1 = Config()
c2 = Config("0.0.0.0", 3000, True)
print(f"\\n{c1}")
print(f"{c2}")

# Constructor with validation
class Temperature:
    def __init__(self, celsius):
        if celsius < -273.15:
            raise ValueError("Below absolute zero!")
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return self.celsius * 9/5 + 32

t = Temperature(100)
print(f"\\n{t.celsius}°C = {t.fahrenheit}°F")

# __new__ vs __init__
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            print("Creating new instance")
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        print("Initializing")

s1 = Singleton()
s2 = Singleton()
print(f"\\nSame object? {s1 is s2}")  # True

# Subclass constructor
class Student(Person):
    def __init__(self, name, age, grade):
        super().__init__(name, age)  # Call parent __init__
        self.grade = grade

    def greet(self):
        return f"{super().greet()}, grade {self.grade}"

s = Student("Bob", 15, "10th")
print(f"\\n{s.greet()}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between __init__ and __new__?",
        difficulty: "Easy",
        hint: "__new__ creates the instance (constructor), __init__ initializes it (initializer). __new__ takes cls (the class) as first arg and must return an instance. __init__ takes self (the new instance) and must return None. Flow: MyClass() → __new__(cls) → __init__(self). __new__ is called before __init__. Usually only override __init__. Override __new__ for: singletons, immutable types (int, str, tuple), caching, metaclass patterns. If __new__ returns a different type, __init__ is NOT called.",
      },
      {
        question: "Why should you call super().__init__() in subclass constructors?",
        difficulty: "Medium",
        hint: "super().__init__() calls the parent class constructor, ensuring parent attributes are properly initialized. Without it, parent __init__ is skipped and parent attributes won't exist. Example: class Student(Person): def __init__(self, name, grade): super().__init__(name) — this sets self.name via Person.__init__. In multiple inheritance, super() follows MRO (Method Resolution Order). Always call super().__init__() unless you intentionally want to skip parent initialization. Python 3 super() needs no arguments; Python 2 required super(Class, self).",
      },
      {
        question: "How would you implement the Singleton pattern in Python?",
        difficulty: "Hard",
        hint: "Multiple approaches: 1) __new__ override: store instance in class variable, return existing if set. 2) Metaclass: class SingletonMeta(type): def __call__(cls, *args): if not hasattr(cls, '_instance'): cls._instance = super().__call__(*args); return cls._instance. 3) Module-level instance (Pythonic — modules are singletons). 4) @functools.lru_cache on __new__. 5) Borg pattern: shared __dict__ instead of shared instance. Caveats: threading needs locks, subclasses may share parent's singleton, makes testing harder. Prefer dependency injection over singletons.",
      },
    ],
  },
  {
    id: "python-instance-class-variables",
    title: "Instance vs Class Variables",
    slug: "python-instance-class-variables",
    icon: "Variable",
    difficulty: "Intermediate",
    description:
      "Understand the difference between instance variables and class variables — scope, behavior, and common pitfalls.",
    concept: {
      explanation:
        "Instance variables are defined in __init__ with self.var and belong to each individual object. Class variables are defined at the class level and shared by all instances. When you access an attribute, Python first checks the instance namespace, then the class namespace (then parent classes via MRO). Assigning to self.var always creates/modifies an instance variable, even if a class variable with the same name exists. Mutable class variables (lists, dicts) are a common pitfall — mutating them affects all instances. Use __slots__ to restrict attributes and save memory.",
      realLifeAnalogy:
        "Think of a school class. The class variable is like the classroom number — shared by all students. Instance variables are like each student's name and grades — unique to each person. If you change the classroom number, it changes for everyone. But changing a student's grade only affects that student. The danger: if the class has a shared supply box (mutable class variable), any student taking items affects everyone.",
      keyPoints: [
        "Class variables: defined at class level, shared by all instances",
        "Instance variables: defined with self.var, unique per object",
        "Python checks instance → class → parent classes (MRO)",
        "Assigning to self.var creates an instance variable",
        "Mutable class variables are shared (common pitfall!)",
        "Use ClassName.var to modify class variables",
        "__dict__ shows instance attributes",
        "__slots__ restricts and optimizes attribute storage",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Instance vs Class Variables =====

class Dog:
    # Class variable (shared)
    species = "Canis familiaris"
    count = 0

    def __init__(self, name):
        # Instance variable (unique)
        self.name = name
        Dog.count += 1  # Modify class var via class name

d1 = Dog("Buddy")
d2 = Dog("Max")

print(f"d1.species: {d1.species}")
print(f"d2.species: {d2.species}")
print(f"Dog.count: {Dog.count}")

# Shadowing: assigning creates instance var
d1.species = "Wolf"  # Creates INSTANCE var on d1
print(f"\\nd1.species: {d1.species}")  # Wolf (instance)
print(f"d2.species: {d2.species}")     # Canis familiaris (class)
print(f"Dog.species: {Dog.species}")   # Canis familiaris (class)

# Check namespaces
print(f"\\nd1.__dict__: {d1.__dict__}")
print(f"d2.__dict__: {d2.__dict__}")

# ⚠️ Mutable class variable pitfall
class Student:
    grades = []  # SHARED mutable! (Bug)

    def __init__(self, name):
        self.name = name

    def add_grade(self, grade):
        self.grades.append(grade)  # Mutates shared list

s1 = Student("Alice")
s2 = Student("Bob")
s1.add_grade(90)
print(f"\\ns1.grades: {s1.grades}")
print(f"s2.grades: {s2.grades}")  # [90] -- Both affected!

# ✅ Correct: instance variable
class StudentFixed:
    def __init__(self, name):
        self.name = name
        self.grades = []  # Instance var (unique)

    def add_grade(self, grade):
        self.grades.append(grade)

s1 = StudentFixed("Alice")
s2 = StudentFixed("Bob")
s1.add_grade(90)
print(f"\\ns1.grades: {s1.grades}")  # [90]
print(f"s2.grades: {s2.grades}")     # [] -- Independent!
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between instance and class variables?",
        difficulty: "Easy",
        hint: "Class variables are defined at class level and shared by all instances. Instance variables are defined in __init__ with self.var and unique to each object. Access order: instance → class → parent classes. Assigning to self.var creates an instance variable (even if class var with same name exists). Use ClassName.var to modify class variables. Class variables are useful for constants, counters, and defaults shared across instances.",
      },
      {
        question: "What is the mutable default class variable pitfall?",
        difficulty: "Medium",
        hint: "If a class variable is mutable (list, dict, set), all instances share the same object. Mutating it (append, update) affects all instances. Example: class Foo: items = [] — all instances share the same list. Fix: initialize mutable attributes in __init__ as instance variables: self.items = []. This is one of the most common Python bugs. Same pitfall exists for mutable default arguments in functions. Immutable class variables (str, int, tuple) are safe because reassignment creates a new object.",
      },
      {
        question: "What are __slots__ and when should you use them?",
        difficulty: "Hard",
        hint: "__slots__ = ('x', 'y') restricts instances to only those attributes and eliminates __dict__. Benefits: 1) ~30-40% memory savings per instance. 2) Faster attribute access. 3) Prevents typos in attribute names. Trade-offs: 1) No dynamic attributes (can't add arbitrary attrs). 2) No __dict__ (can't use vars()). 3) Must redeclare in subclasses. 4) Breaks with multiple inheritance if both parents use __slots__. Use when: many instances (millions), fixed attributes, performance-critical. Don't use when: flexibility needed, few instances, prototyping.",
      },
    ],
  },
  {
    id: "python-instance-methods",
    title: "Instance Methods",
    slug: "python-instance-methods",
    icon: "FunctionSquare",
    difficulty: "Intermediate",
    description:
      "Master the three types of methods in Python classes — instance methods, class methods (@classmethod), and static methods (@staticmethod).",
    concept: {
      explanation:
        "Python classes have three types of methods. Instance methods take self as the first parameter and can access/modify instance and class state. Class methods use @classmethod decorator, take cls as the first parameter, and can access/modify class state but not instance state — commonly used as alternative constructors. Static methods use @staticmethod, take no special first parameter, and cannot access instance or class state — they are utility functions scoped to the class. Understanding when to use each type is key to writing clean OOP code.",
      realLifeAnalogy:
        "In a restaurant: instance methods are like a waiter serving a specific table (works with one customer's order). Class methods are like the restaurant manager setting policies that affect all tables (works with the whole restaurant). Static methods are like a calculator on the wall — anyone can use it, it doesn't know about tables or the restaurant, but it's conveniently located there.",
      keyPoints: [
        "Instance methods: take self, access instance + class state",
        "Class methods: @classmethod, take cls, access class state",
        "Static methods: @staticmethod, no self/cls, utility functions",
        "Class methods are common for alternative constructors",
        "Instance methods can call class and static methods",
        "Class methods can be inherited and overridden",
        "Static methods are namespace-scoped utility functions",
        "Use property decorator for getter/setter pattern",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Instance, Class, and Static Methods =====

class Employee:
    raise_pct = 1.05  # Class variable
    count = 0

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.count += 1

    # Instance method — operates on a specific instance
    def apply_raise(self):
        self.salary = int(self.salary * self.raise_pct)

    def __repr__(self):
        return f"Employee('{self.name}', {self.salary})"

    # Class method — operates on the class itself
    @classmethod
    def set_raise_pct(cls, pct):
        cls.raise_pct = pct

    # Class method as alternative constructor
    @classmethod
    def from_string(cls, emp_str):
        name, salary = emp_str.split("-")
        return cls(name, int(salary))

    # Static method — utility, no access to cls/self
    @staticmethod
    def is_workday(day):
        return day.weekday() < 5

# Instance method
e1 = Employee("Alice", 50000)
e1.apply_raise()
print(f"After raise: {e1}")

# Class method — alternative constructor
e2 = Employee.from_string("Bob-60000")
print(f"From string: {e2}")

# Class method — modify class state
Employee.set_raise_pct(1.10)
print(f"\\nNew raise: {Employee.raise_pct}")

# Static method
from datetime import date
today = date.today()
print(f"Is workday? {Employee.is_workday(today)}")

# Property — getter/setter pattern
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius must be positive")
        self._radius = value

    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2

c = Circle(5)
print(f"\\nRadius: {c.radius}")
print(f"Area: {c.area:.2f}")
c.radius = 10
print(f"New area: {c.area:.2f}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between instance, class, and static methods?",
        difficulty: "Easy",
        hint: "Instance methods: first param is self, can access instance and class state. Class methods: @classmethod, first param is cls, can only access class state — commonly used for alternative constructors. Static methods: @staticmethod, no special first param, cannot access instance or class state — utility functions. Example: Date class might have instance method format(), class method from_string(s), static method is_valid_date(d). Call: obj.method(), Class.classmethod(), Class.staticmethod().",
      },
      {
        question: "What are alternative constructors and why use @classmethod?",
        difficulty: "Medium",
        hint: "Alternative constructors are class methods that create instances in different ways. Example: Date.from_string('2024-01-15'), dict.fromkeys(['a','b'], 0), int.from_bytes(b'\\x00\\x01'). Use @classmethod (not @staticmethod) because: 1) cls parameter ensures proper subclass creation — if SubClass inherits from_string, cls is SubClass, not parent. 2) Follows the factory method pattern. 3) More Pythonic than multiple __init__ with type checking. Convention: name with from_ prefix (from_json, from_dict, from_csv).",
      },
      {
        question: "How does the @property decorator work?",
        difficulty: "Hard",
        hint: "@property creates a descriptor that lets you define getter/setter/deleter for an attribute. Usage: @property for getter, @name.setter for setter, @name.deleter for deleter. Internally uses the descriptor protocol (__get__, __set__, __delete__). Benefits: 1) Access like an attribute (obj.x) but runs code. 2) Add validation without changing API. 3) Computed properties (area from radius). 4) Encapsulation without Java-style getters/setters. Under the hood: property(fget, fset, fdel, doc). Cached property: @functools.cached_property computes once and stores.",
      },
    ],
  },
  {
    id: "python-inheritance",
    title: "Inheritance",
    slug: "python-inheritance",
    icon: "GitFork",
    difficulty: "Intermediate",
    description:
      "Learn single inheritance in Python — extending classes, overriding methods, using super(), and understanding the is-a relationship.",
    concept: {
      explanation:
        "Inheritance allows a class (child/subclass) to inherit attributes and methods from another class (parent/superclass). The child class can add new functionality or override inherited methods. Use super() to call parent methods. Inheritance models an 'is-a' relationship: a Dog is an Animal. Python uses Method Resolution Order (MRO) to determine which method to call. All classes implicitly inherit from object. isinstance() checks if an object is an instance of a class or its subclasses. issubclass() checks the class hierarchy.",
      realLifeAnalogy:
        "Inheritance is like a family tree. A child inherits traits from parents (eye color, height) but can also develop their own unique traits. In programming, a SportsCar inherits from Car (has engine, wheels, can drive) but adds turbo boost. The child doesn't need to redefine everything — it inherits the basics and adds or overrides what's different.",
      keyPoints: [
        "class Child(Parent): inherits from Parent",
        "Child inherits all attributes and methods",
        "Child can add new methods and attributes",
        "Child can override parent methods",
        "super() calls the parent implementation",
        "isinstance(obj, Class) checks inheritance chain",
        "issubclass(Child, Parent) checks class hierarchy",
        "All classes inherit from object",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Inheritance =====

class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name} says {self.sound}!"

    def __repr__(self):
        return f"{type(self).__name__}('{self.name}')"

# Single inheritance
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Woof")  # Call parent __init__
        self.breed = breed

    def fetch(self, item):
        return f"{self.name} fetches the {item}!"

class Cat(Animal):
    def __init__(self, name, indoor=True):
        super().__init__(name, "Meow")
        self.indoor = indoor

    def purr(self):
        return f"{self.name} purrs..."

# Create instances
dog = Dog("Buddy", "Golden Retriever")
cat = Cat("Whiskers")

# Inherited methods work
print(dog.speak())    # Buddy says Woof!
print(cat.speak())    # Whiskers says Meow!

# Child-specific methods
print(dog.fetch("ball"))
print(cat.purr())

# isinstance checks
print(f"\\ndog is Animal? {isinstance(dog, Animal)}")  # True
print(f"dog is Dog? {isinstance(dog, Dog)}")           # True
print(f"dog is Cat? {isinstance(dog, Cat)}")           # False

# issubclass checks
print(f"\\nDog subclass of Animal? {issubclass(Dog, Animal)}")
print(f"Dog subclass of object? {issubclass(Dog, object)}")

# Method Resolution Order
print(f"\\nDog MRO: {[c.__name__ for c in Dog.__mro__]}")

# Multi-level inheritance
class Puppy(Dog):
    def __init__(self, name, breed):
        super().__init__(name, breed)
        self.trained = False

    def train(self):
        self.trained = True
        return f"{self.name} is now trained!"

pup = Puppy("Rex", "Lab")
print(f"\\n{pup.speak()}")      # Inherited from Animal
print(pup.fetch("stick"))       # Inherited from Dog
print(pup.train())              # Own method
print(f"MRO: {[c.__name__ for c in Puppy.__mro__]}")
`,
    },
    interviewQuestions: [
      {
        question: "What is inheritance and what are its types in Python?",
        difficulty: "Easy",
        hint: "Inheritance lets a child class reuse code from a parent class. Types: 1) Single — one parent: class Dog(Animal). 2) Multiple — multiple parents: class FlyingFish(Fish, Bird). 3) Multi-level — chain: class Puppy(Dog(Animal)). 4) Hierarchical — multiple children from one parent. 5) Hybrid — combination of above. Python supports all types. Use inheritance for 'is-a' relationships. Prefer composition ('has-a') when inheritance doesn't model the domain well.",
      },
      {
        question: "How does super() work and why should you use it?",
        difficulty: "Medium",
        hint: "super() returns a proxy object that delegates method calls to the parent class. In single inheritance: super().__init__() calls parent's __init__. In multiple inheritance: super() follows MRO (Method Resolution Order) — it calls the NEXT class in the MRO chain, not necessarily the direct parent. Benefits: 1) Avoids hardcoding parent class name. 2) Works correctly with multiple inheritance. 3) Supports cooperative multiple inheritance. Python 3: super() with no args. Python 2: super(ClassName, self). Always use super() instead of ParentClass.method(self).",
      },
      {
        question: "What is the Method Resolution Order (MRO) and how does it work?",
        difficulty: "Hard",
        hint: "MRO determines the order Python searches for methods in a class hierarchy. Python uses C3 linearization algorithm. Rules: 1) Child before parent. 2) Parents in order listed. 3) Consistent — no contradictions. View with ClassName.__mro__ or ClassName.mro(). Example: class D(B, C) where B(A) and C(A): MRO is D → B → C → A → object. C3 ensures each class appears once and respects the inheritance order. If linearization is impossible (contradictory hierarchy), Python raises TypeError. super() follows MRO, not the direct parent.",
      },
    ],
  },
  {
    id: "python-multiple-inheritance",
    title: "Multiple Inheritance",
    slug: "python-multiple-inheritance",
    icon: "GitMerge",
    difficulty: "Intermediate",
    description:
      "Understand multiple inheritance in Python — inheriting from multiple classes, MRO, diamond problem, and mixins.",
    concept: {
      explanation:
        "Multiple inheritance allows a class to inherit from two or more parent classes: class Child(Parent1, Parent2). Python resolves method conflicts using C3 linearization (MRO). The diamond problem occurs when two parents share a common ancestor — Python's MRO ensures each class is called only once. Mixins are small classes designed to add specific functionality through multiple inheritance without being standalone classes. Cooperative multiple inheritance uses super() to chain method calls through the entire MRO. Always check MRO with ClassName.__mro__ when using multiple inheritance.",
      realLifeAnalogy:
        "Multiple inheritance is like a child with talents from both parents — a musician mother and an athlete father. The child can play music AND sports. The diamond problem is like both parents having learned cooking from the same grandmother — the child should learn grandmother's recipe once, not twice. Mixins are like skill patches — a 'SwimmingMixin' can be added to any person class to give them swimming ability.",
      keyPoints: [
        "class Child(Parent1, Parent2): inherits from multiple classes",
        "Method resolution follows C3 linearization (MRO)",
        "Diamond problem: resolved by calling each class once",
        "super() follows MRO chain, not just direct parent",
        "Mixins: small classes for adding specific functionality",
        "Check MRO: ClassName.__mro__ or ClassName.mro()",
        "Cooperative inheritance: all classes use super()",
        "Prefer composition over complex multiple inheritance",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Multiple Inheritance =====

# Basic multiple inheritance
class Flyer:
    def fly(self):
        return f"{self.name} is flying!"

class Swimmer:
    def swim(self):
        return f"{self.name} is swimming!"

class Duck(Flyer, Swimmer):
    def __init__(self, name):
        self.name = name

    def quack(self):
        return f"{self.name} says Quack!"

duck = Duck("Donald")
print(duck.fly())     # From Flyer
print(duck.swim())    # From Swimmer
print(duck.quack())   # Own method
print(f"MRO: {[c.__name__ for c in Duck.__mro__]}")

# Diamond Problem
class Animal:
    def __init__(self, name):
        self.name = name
        print(f"Animal.__init__({name})")

    def speak(self):
        return "..."

class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)
        print(f"Dog.__init__({name})")

    def speak(self):
        return "Woof!"

class Pet(Animal):
    def __init__(self, name):
        super().__init__(name)
        self.is_pet = True
        print(f"Pet.__init__({name})")

class PetDog(Dog, Pet):
    def __init__(self, name):
        super().__init__(name)  # Follows MRO
        print(f"PetDog.__init__({name})")

print("\\n--- Diamond Problem ---")
pd = PetDog("Buddy")
print(f"MRO: {[c.__name__ for c in PetDog.__mro__]}")
print(f"is_pet: {pd.is_pet}")

# Mixins — small focused classes
class JsonMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class LogMixin:
    def log(self, msg):
        print(f"[{type(self).__name__}] {msg}")

class User(JsonMixin, LogMixin):
    def __init__(self, name, email):
        self.name = name
        self.email = email

u = User("Alice", "alice@example.com")
print(f"\\nJSON: {u.to_json()}")
u.log("User created")
`,
    },
    interviewQuestions: [
      {
        question: "What is the diamond problem and how does Python solve it?",
        difficulty: "Easy",
        hint: "The diamond problem occurs when class D inherits from B and C, which both inherit from A — forming a diamond shape. The issue: should A's methods be called once or twice? Python solves it with C3 linearization MRO — each class appears exactly once in the resolution order. With cooperative super() calls, A.__init__ is called only once. MRO for D(B, C) where B(A) and C(A): D → B → C → A → object. View with D.__mro__.",
      },
      {
        question: "What are mixins and when should you use them?",
        difficulty: "Medium",
        hint: "Mixins are small classes that add specific functionality through multiple inheritance. Conventions: 1) Name ends with 'Mixin' (JsonMixin, LogMixin). 2) Not meant to be instantiated alone. 3) Don't define __init__ (or call super().__init__). 4) Provide a single, focused capability. Examples: SerializerMixin (to_json), TimestampMixin (created_at), ValidatorMixin. Use when: multiple unrelated classes need the same functionality. Prefer mixins over deep inheritance hierarchies. Common in Django (LoginRequiredMixin) and Flask.",
      },
      {
        question: "How does C3 linearization work?",
        difficulty: "Hard",
        hint: "C3 linearization computes MRO by merging parent MROs. Algorithm for class C(B1, B2, ...): L[C] = C + merge(L[B1], L[B2], ..., [B1, B2, ...]). merge: take first head that doesn't appear in any tail; repeat until empty. Rules enforced: 1) Monotonicity — child before parent. 2) Local precedence — parents in listed order. 3) Consistency — if impossible, TypeError. Example: class D(B, C), B(A), C(A): L[B]=[B,A,obj], L[C]=[C,A,obj]. merge([B,A,obj],[C,A,obj],[B,C]): take B (not in tails), C, A, obj → D,B,C,A,obj. This prevents calling A twice.",
      },
    ],
  },
  {
    id: "python-method-overriding",
    title: "Method Overriding",
    slug: "python-method-overriding",
    icon: "RefreshCw",
    difficulty: "Intermediate",
    description:
      "Learn method overriding — redefining parent methods in child classes, calling super(), and understanding polymorphic behavior.",
    concept: {
      explanation:
        "Method overriding occurs when a child class defines a method with the same name as a parent class method. The child's version replaces the parent's for instances of the child class. Use super().method() to call the parent's version from the overridden method. This is fundamental to polymorphism — different classes can have methods with the same name but different behavior. Python doesn't have method overloading (same name, different parameters) — use default arguments or *args/**kwargs instead. The @override decorator (Python 3.12+) helps catch errors when the parent method doesn't exist.",
      realLifeAnalogy:
        "Method overriding is like a family recipe that each generation modifies. Grandma's cookie recipe (parent method) makes chocolate chip cookies. Mom overrides it to add walnuts. You can still access grandma's original recipe (super()) and build on it, or replace it entirely with your own version. Each family member who follows 'the recipe' gets a different result based on whose version they use.",
      keyPoints: [
        "Child redefines parent method with same name",
        "Child's version is used for child instances",
        "super().method() calls the parent's version",
        "Enables polymorphism — same interface, different behavior",
        "Python has no method overloading (use defaults/*args)",
        "@override decorator (Python 3.12+) for safety",
        "Can extend parent behavior (call super + add more)",
        "Can completely replace parent behavior",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Method Overriding =====

class Shape:
    def __init__(self, color="red"):
        self.color = color

    def area(self):
        return 0

    def describe(self):
        return f"{self.color} {type(self).__name__}"

class Rectangle(Shape):
    def __init__(self, width, height, color="blue"):
        super().__init__(color)
        self.width = width
        self.height = height

    # Override area() — completely replace
    def area(self):
        return self.width * self.height

    # Override describe() — extend parent behavior
    def describe(self):
        return f"{super().describe()}: {self.width}x{self.height}"

class Circle(Shape):
    def __init__(self, radius, color="green"):
        super().__init__(color)
        self.radius = radius

    def area(self):
        import math
        return math.pi * self.radius ** 2

    def describe(self):
        return f"{super().describe()}: r={self.radius}"

# Polymorphism in action
shapes = [Rectangle(4, 5), Circle(3), Rectangle(2, 8, "yellow")]
print("Shape areas:")
for s in shapes:
    print(f"  {s.describe()} → area = {s.area():.2f}")

# Override __str__ and __repr__
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        return f"{self.name} (\${self.price:.2f})"

    def __repr__(self):
        return f"Product('{self.name}', {self.price})"

    def __eq__(self, other):
        if not isinstance(other, Product):
            return NotImplemented
        return self.name == other.name and self.price == other.price

p1 = Product("Coffee", 4.99)
p2 = Product("Coffee", 4.99)
print(f"\\nstr: {p1}")
print(f"repr: {repr(p1)}")
print(f"Equal? {p1 == p2}")

# Calling super() in chain
class A:
    def greet(self):
        return "Hello from A"

class B(A):
    def greet(self):
        return f"{super().greet()} → B"

class C(B):
    def greet(self):
        return f"{super().greet()} → C"

print(f"\\nChain: {C().greet()}")
`,
    },
    interviewQuestions: [
      {
        question: "What is method overriding vs method overloading?",
        difficulty: "Easy",
        hint: "Overriding: child class redefines a parent method with the SAME signature. The child version is used for child instances. Overloading: same method name with DIFFERENT parameters. Python doesn't support traditional overloading — define one method with defaults, *args, **kwargs, or use @singledispatch for type-based dispatch. Overriding is runtime polymorphism (decided at runtime based on object type). Overloading in other languages is compile-time polymorphism. In Python, the last definition wins if you define the same method twice.",
      },
      {
        question: "When should you call super() in an overridden method?",
        difficulty: "Medium",
        hint: "Call super() when: 1) Extending behavior — you want parent's logic PLUS additional logic. Example: super().__init__(name) then self.extra = value. 2) Cooperative multiple inheritance — everyone calls super() to chain correctly. Don't call super() when: 1) Completely replacing the behavior. 2) Parent method is irrelevant to child. Pattern: call super() first (pre-setup), do child work, optionally call after (post-process). For __init__, almost always call super().__init__() to ensure proper initialization up the MRO chain.",
      },
      {
        question: "How does Python determine which method to call at runtime?",
        difficulty: "Hard",
        hint: "Python uses the instance's type and MRO (Method Resolution Order) at runtime: 1) Look in instance.__dict__. 2) Look in type(instance).__dict__. 3) Walk up the MRO chain. This is dynamic dispatch — the actual type of the object determines the method, not the variable type. Example: animals: list[Animal] = [Dog(), Cat()] — calling a.speak() calls Dog.speak() or Cat.speak() based on actual type. This is polymorphism. Descriptors (__get__) are invoked during lookup. Metaclasses can customize __getattribute__ to change lookup behavior.",
      },
    ],
  },
  {
    id: "python-encapsulation",
    title: "Encapsulation",
    slug: "python-encapsulation",
    icon: "Lock",
    difficulty: "Intermediate",
    description:
      "Understand encapsulation in Python — access control with naming conventions, name mangling, properties, and data hiding.",
    concept: {
      explanation:
        "Encapsulation bundles data and methods together and restricts direct access to internal state. Python uses naming conventions instead of access modifiers: public (name), protected (_name, convention only), and private (__name, triggers name mangling to _ClassName__name). Properties (@property) provide controlled access to attributes with getters, setters, and deleters. Unlike Java/C++, Python follows 'we are all consenting adults' — conventions are respected but not enforced. Name mangling prevents accidental override in subclasses. Use properties to add validation, computed values, or lazy loading without changing the public API.",
      realLifeAnalogy:
        "Encapsulation is like a bank account. Your balance (private data) isn't directly accessible. You interact through deposit() and withdraw() methods (public interface) that validate transactions. The internal accounting system (implementation) is hidden. Python's approach is like a house with unlocked doors and a 'Private' sign — the sign is respected by convention, but doors aren't locked. Name mangling (__balance) is like hiding the key in a predictable spot.",
      keyPoints: [
        "public: name — accessible everywhere",
        "protected: _name — convention, 'internal use'",
        "private: __name — name mangling to _Class__name",
        "Name mangling prevents accidental subclass conflicts",
        "@property for controlled attribute access",
        "Getter, setter, deleter with @property",
        "Python relies on convention, not enforcement",
        "'We are all consenting adults' philosophy",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Encapsulation =====

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner         # Public
        self._bank = "MyBank"      # Protected (convention)
        self.__balance = balance   # Private (name mangling)

    # Public interface
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount
        return self.__balance

    def withdraw(self, amount):
        if amount > self.__balance:
            raise ValueError("Insufficient funds")
        self.__balance -= amount
        return self.__balance

    @property
    def balance(self):
        return self.__balance

    def __repr__(self):
        return f"BankAccount('{self.owner}', balance={self.__balance})"

acc = BankAccount("Alice", 1000)
print(acc)

# Public — accessible
print(f"Owner: {acc.owner}")

# Protected — accessible but signals "internal"
print(f"Bank: {acc._bank}")

# Private — name mangled
# print(acc.__balance)  # AttributeError!
print(f"Balance (property): {acc.balance}")

# Name mangling: __balance → _BankAccount__balance
print(f"Mangled access: {acc._BankAccount__balance}")

# Use the public interface
acc.deposit(500)
acc.withdraw(200)
print(f"\\nAfter transactions: {acc.balance}")

# Property with validation
class Temperature:
    def __init__(self, celsius=0):
        self.celsius = celsius  # Uses setter!

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

t = Temperature(100)
print(f"\\n{t.celsius}°C = {t.fahrenheit}°F")
t.fahrenheit = 32
print(f"{t.celsius}°C = {t.fahrenheit}°F")

# Encapsulation prevents subclass conflicts
class Base:
    def __init__(self):
        self.__x = 10  # _Base__x

class Child(Base):
    def __init__(self):
        super().__init__()
        self.__x = 20  # _Child__x (different!)

c = Child()
print(f"\\nChild.__dict__: {c.__dict__}")
`,
    },
    interviewQuestions: [
      {
        question: "How does Python implement access control?",
        difficulty: "Easy",
        hint: "Python uses naming conventions, not access modifiers: 1) public (name) — no restriction. 2) protected (_name) — convention meaning 'internal, don't access directly'. Still accessible. 3) private (__name) — name mangling to _ClassName__name. Prevents accidental access but still reachable. Python doesn't enforce access control — it trusts developers ('we are all consenting adults'). Use _prefix for internal APIs, __prefix to avoid subclass conflicts, and @property for controlled access.",
      },
      {
        question: "What is name mangling and why does Python use it?",
        difficulty: "Medium",
        hint: "Name mangling: __attr becomes _ClassName__attr. Python does this at compile time for any name starting with __ (double underscore) and not ending with __. Purpose: prevent accidental override in subclasses, NOT security. Example: class Base: __x = 1 → _Base__x. class Child(Base): __x = 2 → _Child__x. Both coexist without conflict. You can still access mangled names: obj._ClassName__attr. Mangling does NOT apply to: __dunder__ methods, names in functions, or names with only leading underscores (_x).",
      },
      {
        question: "How would you implement immutable objects in Python?",
        difficulty: "Hard",
        hint: "Several approaches: 1) @dataclass(frozen=True) — simplest, generates __setattr__ that raises FrozenInstanceError. 2) Override __setattr__: raise AttributeError after init. 3) NamedTuple — inherently immutable (tuple subclass). 4) __slots__ + property (read-only properties). 5) Override __delattr__ too. Challenges: mutable attributes inside (lists) aren't frozen — need deep freezing. For dicts: types.MappingProxyType gives read-only view. __hash__ should be implemented for frozen objects (needed for sets/dict keys). Frozen dataclasses auto-generate __hash__.",
      },
    ],
  },
  {
    id: "python-polymorphism",
    title: "Polymorphism",
    slug: "python-polymorphism",
    icon: "Shapes",
    difficulty: "Intermediate",
    description:
      "Master polymorphism in Python — duck typing, method overriding, operator overloading, and abstract base classes.",
    concept: {
      explanation:
        "Polymorphism means 'many forms' — the same interface works with different types. Python supports polymorphism through: 1) Duck typing — if it walks like a duck and quacks like a duck, it's a duck. No need for explicit interfaces. 2) Method overriding — child classes provide different implementations. 3) Operator overloading — defining __add__, __eq__, etc. 4) Abstract Base Classes (ABCs) — from abc module, enforce interface contracts. Python's duck typing is more flexible than Java/C++ polymorphism because it doesn't require inheritance — any object with the right methods works.",
      realLifeAnalogy:
        "Polymorphism is like a USB port — it accepts any USB device (mouse, keyboard, drive) without knowing the specific device. The port provides a standard interface, and each device responds differently. Duck typing is like hiring: you don't check if someone has a 'Chef' degree — if they can cook well, they're hired. It's about what you can DO, not what you ARE.",
      keyPoints: [
        "Duck typing: 'if it quacks, it's a duck'",
        "No explicit interfaces needed (unlike Java)",
        "Method overriding: same method, different behavior",
        "Operator overloading: __add__, __eq__, __lt__, etc.",
        "ABC (Abstract Base Class) enforces interfaces",
        "len(), str(), iter() work via polymorphism",
        "isinstance() checks type, but duck typing preferred",
        "Protocol classes (Python 3.8+) for structural typing",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Polymorphism =====

# 1. Duck Typing — no inheritance needed
class Duck:
    def speak(self):
        return "Quack!"

    def swim(self):
        return "Duck swimming"

class Person:
    def speak(self):
        return "Hello!"

    def swim(self):
        return "Person swimming"

# Same function works with any object that has speak()
def make_speak(entity):
    print(entity.speak())

make_speak(Duck())    # Quack!
make_speak(Person())  # Hello!

# 2. Method overriding polymorphism
class Shape:
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, r):
        self.r = r
    def area(self):
        import math
        return math.pi * self.r ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h
    def area(self):
        return self.w * self.h

shapes = [Circle(5), Rectangle(4, 6), Circle(3)]
print("\\nAreas:")
for s in shapes:
    print(f"  {type(s).__name__}: {s.area():.2f}")

# 3. Operator overloading
class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(f"\\n{v1} + {v2} = {v1 + v2}")
print(f"{v1} * 3 = {v1 * 3}")
print(f"{v1} == {v2}: {v1 == v2}")

# 4. Abstract Base Class
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

    @abstractmethod
    def move(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"
    def move(self):
        return "Runs on 4 legs"

class Bird(Animal):
    def speak(self):
        return "Tweet!"
    def move(self):
        return "Flies with wings"

# animal = Animal()  # TypeError: Can't instantiate abstract class
dog = Dog()
bird = Bird()
print(f"\\nDog: {dog.speak()}, {dog.move()}")
print(f"Bird: {bird.speak()}, {bird.move()}")
`,
    },
    interviewQuestions: [
      {
        question: "What is duck typing in Python?",
        difficulty: "Easy",
        hint: "Duck typing: 'If it walks like a duck and quacks like a duck, it's a duck.' Python doesn't check an object's type — it checks if the object has the required methods/attributes. Example: any object with __iter__ and __next__ is iterable, regardless of its class. Benefits: more flexible than interface-based languages, promotes loose coupling. Drawback: errors occur at runtime, not compile time. Use hasattr() or try/except for safety. EAFP (Easier to Ask Forgiveness) over LBYL (Look Before You Leap).",
      },
      {
        question: "What is the difference between duck typing and abstract base classes?",
        difficulty: "Medium",
        hint: "Duck typing: implicit contract — any object with the right methods works. No formal interface. Errors at runtime. ABC: explicit contract — @abstractmethod forces subclasses to implement methods. TypeError at instantiation if methods missing. Duck typing is more Pythonic and flexible. ABCs are useful for: 1) Framework design (enforcing plugin interfaces). 2) isinstance() checks. 3) Documentation of expected interface. 4) Early error detection. Python 3.8+ Protocol classes offer structural typing — ABCs without inheritance: class Drawable(Protocol): def draw(self): ...",
      },
      {
        question: "How does operator overloading work in Python?",
        difficulty: "Hard",
        hint: "Define magic methods to overload operators: __add__(+), __sub__(-), __mul__(*), __truediv__(/), __eq__(==), __lt__(<), __len__(len()), __getitem__([]), __contains__(in). Reflected versions for right-side: __radd__, __rsub__. In-place: __iadd__(+=). Return NotImplemented (not NotImplementedError) to let Python try the other operand's method. @functools.total_ordering: define __eq__ and one comparison, get all six. Example: 1 + v calls int.__add__(1, v) → NotImplemented → v.__radd__(1).",
      },
    ],
  },
  {
    id: "python-magic-methods",
    title: "Magic Methods",
    slug: "python-magic-methods",
    icon: "Zap",
    difficulty: "Intermediate",
    description:
      "Master Python's magic (dunder) methods — customize object behavior for printing, comparison, arithmetic, containers, and context managers.",
    concept: {
      explanation:
        "Magic methods (dunder methods, __name__) are special methods that Python calls implicitly. __init__ is called on object creation, __str__ by str()/print(), __repr__ by repr(), __len__ by len(), __getitem__ by obj[key]. Categories: Construction (__init__, __new__, __del__). String (__str__, __repr__, __format__). Comparison (__eq__, __lt__, __le__, __gt__, __ge__, __ne__). Arithmetic (__add__, __sub__, __mul__, __truediv__). Container (__len__, __getitem__, __setitem__, __contains__, __iter__). Context manager (__enter__, __exit__). Callable (__call__). They enable your classes to integrate seamlessly with Python's syntax and built-in functions.",
      realLifeAnalogy:
        "Magic methods are like social protocols. When you meet someone (__init__), you introduce yourself (__str__). When asked 'are you equal?' you compare IDs (__eq__). When someone asks 'how big are you?', you answer with your size (__len__). These protocols let your custom objects participate naturally in Python's world, just like social conventions let people interact in society.",
      keyPoints: [
        "__str__: human-readable string (print, str())",
        "__repr__: developer string (repr(), debugging)",
        "__eq__, __lt__, __le__: comparison operators",
        "__add__, __sub__, __mul__: arithmetic operators",
        "__len__, __getitem__, __contains__: container protocol",
        "__iter__, __next__: iterator protocol",
        "__enter__, __exit__: context manager (with)",
        "__call__: make instances callable",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Magic Methods =====

class Playlist:
    """A custom container demonstrating magic methods."""

    def __init__(self, name, songs=None):
        self.name = name
        self._songs = list(songs) if songs else []

    # String representation
    def __str__(self):
        return f"Playlist '{self.name}' ({len(self)} songs)"

    def __repr__(self):
        return f"Playlist('{self.name}', {self._songs})"

    # Container protocol
    def __len__(self):
        return len(self._songs)

    def __getitem__(self, index):
        return self._songs[index]

    def __setitem__(self, index, value):
        self._songs[index] = value

    def __contains__(self, song):
        return song in self._songs

    # Iteration
    def __iter__(self):
        return iter(self._songs)

    # Arithmetic — combine playlists
    def __add__(self, other):
        return Playlist(
            f"{self.name} + {other.name}",
            self._songs + other._songs
        )

    # Comparison
    def __eq__(self, other):
        return self._songs == other._songs

    def __lt__(self, other):
        return len(self) < len(other)

    # Make it callable
    def __call__(self, song):
        self._songs.append(song)
        return self

# Create playlists
rock = Playlist("Rock", ["Bohemian Rhapsody", "Stairway to Heaven"])
pop = Playlist("Pop", ["Shape of You", "Blinding Lights"])

# __str__
print(rock)

# __len__
print(f"Songs: {len(rock)}")

# __getitem__ (indexing and slicing)
print(f"First: {rock[0]}")

# __contains__ (in operator)
print(f"Has song? {'Shape of You' in pop}")

# __iter__ (for loop)
print("\\nAll songs:")
for song in rock:
    print(f"  ♪ {song}")

# __add__ (+ operator)
combined = rock + pop
print(f"\\n{combined}")

# __call__ (callable)
rock("Hotel California")
print(f"After add: {rock}")

# Context manager example
class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self

    def __exit__(self, *args):
        import time
        self.elapsed = time.time() - self.start
        print(f"Elapsed: {self.elapsed:.4f}s")

with Timer() as t:
    total = sum(range(1_000_000))
print(f"Result: {total}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between __str__ and __repr__?",
        difficulty: "Easy",
        hint: "__str__: human-readable, informal string. Called by str(), print(), f-strings. Target audience: end users. __repr__: unambiguous, developer-oriented string. Called by repr(), debugger, interactive console. Should ideally be a valid Python expression that recreates the object. If only one is defined, define __repr__ — Python falls back to __repr__ when __str__ is missing. Convention: repr(obj) should look like a constructor call: Product('Coffee', 4.99). str(obj) should be readable: Coffee ($4.99).",
      },
      {
        question: "How do you make a custom class work with len(), iteration, and indexing?",
        difficulty: "Medium",
        hint: "Implement the container protocol: __len__ for len(), __getitem__ for obj[i] (also enables iteration if __iter__ not defined), __setitem__ for obj[i] = val, __delitem__ for del obj[i], __contains__ for 'in' operator. For iteration: __iter__ returns an iterator, __next__ returns next value (raise StopIteration when done). For full sequence: inherit from collections.abc.Sequence (requires __getitem__ and __len__, provides index(), count(), iteration, reversed()). For mapping: collections.abc.Mapping.",
      },
      {
        question: "Explain the context manager protocol (__enter__ and __exit__).",
        difficulty: "Hard",
        hint: "Context managers support the 'with' statement: with obj as x: .... __enter__(self): called on entering with block, return value assigned to 'as' variable. __exit__(self, exc_type, exc_val, exc_tb): called on exit. If no exception: all three args are None. If exception: contains exception info. Return True to suppress the exception, False/None to propagate. Use cases: resource management (files, locks, connections), timing, temporary state changes. contextlib.contextmanager: decorator that turns a generator into a context manager. contextlib.suppress: ignore specific exceptions.",
      },
    ],
  },
  // ─── Level 7: Error & File Handling ─────────────────────────────────────────
  {
    id: "python-exceptions",
    title: "Python Exceptions",
    slug: "python-exceptions",
    icon: "AlertTriangle",
    difficulty: "Intermediate",
    description:
      "Understand Python's exception hierarchy — what exceptions are, common built-in exceptions, and how error handling works.",
    concept: {
      explanation:
        "Exceptions are events that disrupt the normal flow of a program. Python has a rich hierarchy of built-in exceptions rooted at BaseException. The common base for user-catchable exceptions is Exception. Key built-in exceptions: ValueError (wrong value), TypeError (wrong type), KeyError (missing dict key), IndexError (bad list index), AttributeError (missing attribute), FileNotFoundError, ZeroDivisionError, ImportError, NameError, StopIteration. Exceptions propagate up the call stack until caught. Uncaught exceptions terminate the program with a traceback. Understanding the exception hierarchy helps you catch specific errors without silencing unexpected ones.",
      realLifeAnalogy:
        "Exceptions are like warning lights on a car dashboard. Each light (exception type) signals a specific problem — low fuel (FileNotFoundError), engine overheating (MemoryError), door ajar (ValueError). If you ignore all warnings (bare except), you might miss a critical issue. The best practice is to watch for specific warnings you can handle and let truly unexpected ones alert you immediately.",
      keyPoints: [
        "Exceptions disrupt normal program flow",
        "BaseException is the root; Exception is the common base",
        "Common: ValueError, TypeError, KeyError, IndexError",
        "FileNotFoundError, ZeroDivisionError, AttributeError",
        "Exceptions propagate up the call stack",
        "Uncaught exceptions show a traceback",
        "Use specific exceptions, not bare except",
        "Exception hierarchy enables grouped catching",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Python Exceptions =====

# Common exceptions
# ValueError
try:
    num = int("abc")
except ValueError as e:
    print(f"ValueError: {e}")

# TypeError
try:
    result = "hello" + 5
except TypeError as e:
    print(f"TypeError: {e}")

# KeyError
try:
    d = {"a": 1}
    val = d["b"]
except KeyError as e:
    print(f"KeyError: {e}")

# IndexError
try:
    lst = [1, 2, 3]
    val = lst[10]
except IndexError as e:
    print(f"IndexError: {e}")

# ZeroDivisionError
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"ZeroDivisionError: {e}")

# FileNotFoundError
try:
    f = open("nonexistent.txt")
except FileNotFoundError as e:
    print(f"FileNotFoundError: {e}")

# Exception hierarchy
print("\\n--- Exception Hierarchy ---")
print(f"ValueError bases: {ValueError.__bases__}")
print(f"Exception bases: {Exception.__bases__}")
print(f"BaseException bases: {BaseException.__bases__}")

# Check hierarchy with issubclass
print(f"\\nValueError is Exception? {issubclass(ValueError, Exception)}")
print(f"KeyboardInterrupt is Exception? {issubclass(KeyboardInterrupt, Exception)}")

# Raising exceptions
def validate_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0 or age > 150:
        raise ValueError(f"Invalid age: {age}")
    return age

try:
    validate_age(-5)
except ValueError as e:
    print(f"\\nValidation: {e}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the Python exception hierarchy?",
        difficulty: "Easy",
        hint: "BaseException is the root. Its children: Exception (most catchable errors), KeyboardInterrupt (Ctrl+C), SystemExit (sys.exit()), GeneratorExit. Under Exception: ValueError, TypeError, KeyError, IndexError, AttributeError, OSError (parent of FileNotFoundError, PermissionError), RuntimeError, StopIteration. Never catch BaseException or KeyboardInterrupt unless you re-raise. Catching Exception is acceptable as a last resort but catching specific exceptions is preferred.",
      },
      {
        question: "What is the difference between syntax errors and exceptions?",
        difficulty: "Medium",
        hint: "Syntax errors (SyntaxError) are detected at parse time before code runs — invalid Python syntax like missing colons, mismatched parentheses. They cannot be caught with try/except in the same scope. Exceptions occur at runtime — valid Python code that fails during execution (dividing by zero, accessing missing key). Exceptions can be caught and handled. IndentationError is a subclass of SyntaxError. Some 'syntax' issues like undefined names (NameError) are runtime exceptions, not syntax errors.",
      },
      {
        question: "Why should you avoid bare except clauses?",
        difficulty: "Hard",
        hint: "Bare 'except:' catches ALL exceptions including SystemExit, KeyboardInterrupt, and GeneratorExit. Problems: 1) Silences unexpected errors — hides bugs. 2) Catches Ctrl+C — user can't interrupt. 3) Catches sys.exit() — program won't stop. 4) Makes debugging impossible. Use 'except Exception:' at minimum (doesn't catch SystemExit/KeyboardInterrupt). Better: catch specific exceptions. PEP 8: 'bare except is equivalent to except BaseException'. If you must catch broadly, log the exception and consider re-raising. except Exception as e: logger.error(e); raise.",
      },
    ],
  },
  {
    id: "python-try-except",
    title: "try except",
    slug: "python-try-except",
    icon: "AlertTriangle",
    difficulty: "Intermediate",
    description:
      "Master try/except blocks — catching exceptions, handling multiple exception types, and the else clause.",
    concept: {
      explanation:
        "The try/except block handles exceptions gracefully. Code that might raise an exception goes in the try block. If an exception occurs, Python checks except clauses in order. You can catch specific exceptions, multiple exceptions in a tuple, use 'as' to bind the exception object, and chain multiple except blocks. The else clause runs only if no exception was raised. EAFP (Easier to Ask Forgiveness than Permission) is Pythonic: try the operation and catch failure, rather than checking preconditions (LBYL). Nested try/except blocks and exception chaining (raise ... from ...) handle complex scenarios.",
      realLifeAnalogy:
        "try/except is like a safety net at a circus. The acrobat (code in try) performs a risky move. If they fall (exception), the safety net (except) catches them at the right level. Different nets catch different falls — one for slips (ValueError), another for equipment failure (TypeError). If no fall happens, the audience cheers (else clause). The show always ends with cleanup (finally).",
      keyPoints: [
        "try: code that might fail",
        "except ExceptionType: handle specific errors",
        "except (Type1, Type2): catch multiple types",
        "except Exception as e: bind error object",
        "else: runs if NO exception occurred",
        "Multiple except blocks checked in order",
        "EAFP > LBYL in Python (try first, ask forgiveness)",
        "Bare except catches everything (avoid!)",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== try / except =====

# Basic try/except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catch with error object
try:
    num = int("not_a_number")
except ValueError as e:
    print(f"Error: {e}")

# Multiple except blocks
def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("Division by zero!")
        return None
    except TypeError:
        print("Invalid types!")
        return None

print(f"\\n10/3 = {safe_divide(10, 3):.2f}")
safe_divide(10, 0)
safe_divide("10", 3)

# Catch multiple exceptions in one block
try:
    data = {"key": [1, 2]}
    val = data["missing"][10]
except (KeyError, IndexError) as e:
    print(f"\\nCaught: {type(e).__name__}: {e}")

# else clause — runs if NO exception
print("\\n--- else clause ---")
def parse_int(s):
    try:
        result = int(s)
    except ValueError:
        print(f"  '{s}' is not a valid integer")
        return None
    else:
        print(f"  '{s}' parsed successfully: {result}")
        return result

parse_int("42")
parse_int("abc")

# EAFP vs LBYL
d = {"name": "Alice", "age": 30}

# LBYL (Look Before You Leap) — less Pythonic
if "email" in d:
    email = d["email"]
else:
    email = "N/A"
print(f"\\nLBYL: {email}")

# EAFP (Easier to Ask Forgiveness) — Pythonic
try:
    email = d["email"]
except KeyError:
    email = "N/A"
print(f"EAFP: {email}")

# Even simpler: dict.get()
email = d.get("email", "N/A")
print(f"get(): {email}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between try/except/else?",
        difficulty: "Easy",
        hint: "try: code that might raise an exception. except: runs if an exception IS raised. else: runs only if NO exception was raised. Why use else instead of putting code in try? 1) Keeps the try block minimal — only code that might fail. 2) Exceptions in else are NOT caught by the except. 3) Makes intent clear: 'do this if the risky part succeeded.' Example: try: f = open(path) except IOError: handle_error() else: process(f.read()). The else separates 'risky code' from 'success code.'",
      },
      {
        question: "What is EAFP vs LBYL?",
        difficulty: "Medium",
        hint: "EAFP (Easier to Ask Forgiveness than Permission): try the operation, catch exceptions if it fails. LBYL (Look Before You Leap): check conditions before acting. Python prefers EAFP because: 1) Race conditions — checking then acting isn't atomic. 2) Duck typing — checking type defeats the purpose. 3) Often faster — exceptions are rare in the happy path. 4) Cleaner code — fewer nested ifs. LBYL is better when: failure is common (exceptions have overhead), side effects are hard to undo, or the check is cheap and informative.",
      },
      {
        question: "How does exception chaining work with 'raise from'?",
        difficulty: "Hard",
        hint: "Exception chaining connects related exceptions. Implicit: if an exception occurs in an except block, Python automatically chains it (__context__). Explicit: raise NewException() from original — sets __cause__. 'raise X from Y' means 'X was directly caused by Y.' 'raise X from None' suppresses context. Traceback shows: 'The above exception was the direct cause...' (explicit) or 'During handling of the above exception...' (implicit). Use explicit chaining when translating between exception types: except DBError as e: raise AppError('DB failed') from e.",
      },
    ],
  },
  {
    id: "python-finally",
    title: "finally",
    slug: "python-finally",
    icon: "AlertTriangle",
    difficulty: "Intermediate",
    description:
      "Learn the finally clause — guaranteed cleanup code that runs whether an exception occurred or not.",
    concept: {
      explanation:
        "The finally clause always executes, regardless of whether an exception was raised, caught, or the try block completed normally. It runs even if there's a return, break, or continue in the try block. finally is used for cleanup: closing files, releasing locks, disconnecting from databases, restoring state. The full try syntax is: try/except/else/finally. finally runs after else (if no exception) or after except (if exception). If both except and finally are present, finally runs last. Context managers (with statement) are often preferred over try/finally for resource management.",
      realLifeAnalogy:
        "finally is like the 'always lock the door when leaving' rule. Whether you had a great day at work (no exception), dealt with a crisis (caught exception), or the building caught fire (uncaught exception), you ALWAYS lock the door on the way out. It's the guaranteed last action regardless of what happened inside.",
      keyPoints: [
        "finally ALWAYS runs, exception or not",
        "Runs even after return, break, continue",
        "Used for cleanup: close files, release locks",
        "Full syntax: try/except/else/finally",
        "finally runs after else or except",
        "If finally has a return, it overrides try's return",
        "Context managers (with) often replace try/finally",
        "finally runs even if except re-raises",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== finally =====

# Basic finally
print("--- Basic finally ---")
try:
    print("try block")
    result = 10 / 2
except ZeroDivisionError:
    print("except block")
finally:
    print("finally ALWAYS runs")

# finally with exception
print("\\n--- With exception ---")
try:
    print("try block")
    result = 10 / 0
except ZeroDivisionError:
    print("except caught it")
finally:
    print("finally STILL runs")

# finally with uncaught exception
print("\\n--- Cleanup pattern ---")
def read_file(path):
    f = None
    try:
        f = open(path)
        return f.read()
    except FileNotFoundError:
        print(f"File not found: {path}")
        return None
    finally:
        if f:
            f.close()
            print("File closed in finally")

read_file("nonexistent.txt")

# finally runs even with return
print("\\n--- finally with return ---")
def get_value():
    try:
        return "from try"
    finally:
        print("finally runs before return!")

result = get_value()
print(f"Got: {result}")

# ⚠️ finally return overrides try return
def tricky():
    try:
        return "try"
    finally:
        return "finally"  # This wins!

print(f"\\nTricky: {tricky()}")

# Full try/except/else/finally
print("\\n--- Full syntax ---")
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("  except: division by zero")
        return None
    except TypeError:
        print("  except: invalid types")
        return None
    else:
        print(f"  else: success, result = {result}")
        return result
    finally:
        print("  finally: cleanup done")

divide(10, 3)
print()
divide(10, 0)

# Prefer: context manager over try/finally
print("\\n--- Context manager (preferred) ---")
# Instead of try/finally for files:
# with open("file.txt") as f:
#     data = f.read()
# File automatically closed!
print("with statement handles cleanup automatically")
`,
    },
    interviewQuestions: [
      {
        question: "What is the purpose of the finally clause?",
        difficulty: "Easy",
        hint: "finally contains cleanup code that ALWAYS runs regardless of what happens in try. It runs if: 1) try succeeds normally. 2) except catches an exception. 3) Exception is re-raised. 4) try has a return statement. 5) break or continue in a loop. Use for: closing files/connections, releasing locks, restoring state. The full order is: try → except (if error) OR else (if no error) → finally (always). Context managers (with statement) are often cleaner for resource management.",
      },
      {
        question: "What happens if both try and finally have return statements?",
        difficulty: "Medium",
        hint: "The finally return OVERRIDES the try return. This is a Python gotcha: def f(): try: return 1; finally: return 2 → returns 2. The try return is evaluated but discarded. Similarly, if try raises and finally returns, the exception is silently suppressed. This is almost always a bug. PEP 8 discourages return in finally. Best practice: use finally only for cleanup (close, release, restore), never for return values or exception handling. Linters like pylint warn about return-in-finally.",
      },
      {
        question: "When should you use try/finally vs a context manager?",
        difficulty: "Hard",
        hint: "Context managers (with statement) are preferred for resource management because: 1) Cleaner syntax — with open(f) as file vs try/f=open/finally/close. 2) Exception-safe — __exit__ always called. 3) Reusable — define once, use everywhere. 4) Composable — with a, b: handles both. Use try/finally when: 1) Cleanup doesn't fit the context manager pattern. 2) Custom non-resource cleanup (restoring global state). 3) Legacy code. Create custom context managers with @contextmanager decorator or __enter__/__exit__ methods. contextlib provides: suppress, redirect_stdout, ExitStack.",
      },
    ],
  },
  {
    id: "python-custom-exceptions",
    title: "Custom Exceptions",
    slug: "python-custom-exceptions",
    icon: "AlertTriangle",
    difficulty: "Intermediate",
    description:
      "Learn to create custom exception classes — designing exception hierarchies for your applications.",
    concept: {
      explanation:
        "Custom exceptions inherit from Exception (or a more specific built-in exception). They make error handling more precise and meaningful. Define a base exception for your application, then create specific subclasses. Custom exceptions can carry additional data (error codes, context). Best practices: name with 'Error' suffix, inherit from Exception (not BaseException), keep simple (often just pass in the body), create hierarchies for related errors. Custom exceptions make your code self-documenting and allow callers to catch errors at different granularity levels.",
      realLifeAnalogy:
        "Custom exceptions are like specialized alarm systems. A generic alarm just screams 'something's wrong.' But a custom system has specific alarms: 'fire on floor 3' (FireAlarmError), 'intruder in lobby' (SecurityBreachError), 'water leak in basement' (FloodAlertError). Each alarm triggers the right response team. The hierarchy lets you respond to 'any emergency' or a specific type.",
      keyPoints: [
        "Inherit from Exception (not BaseException)",
        "Name with 'Error' suffix by convention",
        "Create a base exception for your app/library",
        "Add specific subclasses for different error types",
        "Can carry extra data (error code, context)",
        "Keep simple — often just 'pass' in body",
        "Hierarchies allow grouped or specific catching",
        "Document when your functions raise custom exceptions",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Custom Exceptions =====

# Simple custom exception
class ValidationError(Exception):
    pass

try:
    raise ValidationError("Invalid email format")
except ValidationError as e:
    print(f"Caught: {e}")

# Custom exception with extra data
class HttpError(Exception):
    def __init__(self, status_code, message, url=None):
        self.status_code = status_code
        self.message = message
        self.url = url
        super().__init__(f"HTTP {status_code}: {message}")

try:
    raise HttpError(404, "Not Found", "/api/users")
except HttpError as e:
    print(f"\\nStatus: {e.status_code}")
    print(f"Message: {e.message}")
    print(f"URL: {e.url}")

# Exception hierarchy for an application
class AppError(Exception):
    """Base exception for our application."""
    pass

class DatabaseError(AppError):
    pass

class ConnectionError(DatabaseError):
    pass

class QueryError(DatabaseError):
    pass

class AuthError(AppError):
    pass

class PermissionDeniedError(AuthError):
    pass

# Catch at different levels
def handle_error(error):
    try:
        raise error
    except PermissionDeniedError:
        print(f"  Permission denied: {error}")
    except AuthError:
        print(f"  Auth error: {error}")
    except DatabaseError:
        print(f"  DB error: {error}")
    except AppError:
        print(f"  App error: {error}")

print("\\n--- Exception hierarchy ---")
handle_error(PermissionDeniedError("Admin only"))
handle_error(QueryError("Invalid SQL"))
handle_error(ConnectionError("Timeout"))

# Practical: input validation
class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

def validate_user(data):
    errors = []
    if not data.get("name"):
        errors.append(ValidationError("name", "required"))
    if not data.get("email") or "@" not in data.get("email", ""):
        errors.append(ValidationError("email", "invalid format"))
    if data.get("age", 0) < 0:
        errors.append(ValidationError("age", "must be positive"))
    return errors

print("\\n--- Validation ---")
errors = validate_user({"name": "", "email": "bad", "age": -1})
for e in errors:
    print(f"  {e.field}: {e.message}")
`,
    },
    interviewQuestions: [
      {
        question: "How do you create a custom exception in Python?",
        difficulty: "Easy",
        hint: "Inherit from Exception: class MyError(Exception): pass. Convention: end name with 'Error'. Can add __init__ for extra data: class HttpError(Exception): def __init__(self, code, msg): self.code = code; super().__init__(msg). Always call super().__init__() to preserve standard behavior. Keep it simple — most custom exceptions just need pass. Create a base exception for your app, then subclass: class AppError(Exception): pass; class DBError(AppError): pass.",
      },
      {
        question: "Why should you create exception hierarchies?",
        difficulty: "Medium",
        hint: "Hierarchies allow catching at different granularity: except AppError catches all app errors, except DBError catches only database errors, except ConnectionError catches only connection issues. Benefits: 1) Callers choose how specific to be. 2) Self-documenting — hierarchy shows error relationships. 3) Future-proof — new exceptions fit into the hierarchy. 4) Cleaner except blocks. Example: requests library has RequestException → ConnectionError, Timeout, HTTPError. Design: one base per package/app, specific subclasses for each failure mode.",
      },
      {
        question: "When should you create custom exceptions vs using built-in ones?",
        difficulty: "Hard",
        hint: "Use built-in when: 1) The error matches a built-in exactly (ValueError for bad input). 2) Simple scripts or internal code. 3) Standard library conventions. Create custom when: 1) Building a library/framework (callers need to catch your errors specifically). 2) Errors carry domain-specific data (error codes, retry info). 3) You need a hierarchy of related errors. 4) Multiple error types in the same domain. Anti-patterns: creating exceptions that are never caught, too many fine-grained exceptions, inheriting from BaseException. Good practice: document which exceptions each function raises.",
      },
    ],
  },
  {
    id: "python-file-handling",
    title: "File Handling Basics",
    slug: "python-file-handling",
    icon: "FileText",
    difficulty: "Intermediate",
    description:
      "Learn the basics of file handling — opening, closing, modes, and the with statement for safe file operations.",
    concept: {
      explanation:
        "File handling in Python uses the built-in open() function. open(path, mode) returns a file object. Modes: 'r' (read, default), 'w' (write, truncates), 'a' (append), 'x' (create, fails if exists), 'b' (binary), 't' (text, default), '+' (read and write). Always close files after use — or better, use the 'with' statement (context manager) which closes automatically. The with statement is strongly preferred: with open('file.txt') as f: data = f.read(). File objects are iterators — you can loop over lines. encoding parameter specifies text encoding (default varies by OS, use 'utf-8' explicitly).",
      realLifeAnalogy:
        "File handling is like visiting a library. open() is checking out a book. The mode determines what you can do: 'r' means reading only, 'w' means writing (erases current content), 'a' means adding notes to the end. close() is returning the book. The 'with' statement is like an automatic return system — the book goes back on the shelf when you leave the reading area, even if you get interrupted.",
      keyPoints: [
        "open(path, mode) returns a file object",
        "Modes: r (read), w (write), a (append), x (create)",
        "Binary: rb, wb; Text: rt, wt (default is text)",
        "Always close files: f.close() or use 'with'",
        "with open(...) as f: — auto-closes (preferred)",
        "encoding='utf-8' for consistent text handling",
        "File objects are iterators (loop over lines)",
        "'w' mode truncates existing files!",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== File Handling Basics =====
import os
import tempfile

# Create a temp directory for our examples
tmp = tempfile.mkdtemp()
filepath = os.path.join(tmp, "example.txt")

# Writing a file (creates or truncates)
with open(filepath, "w") as f:
    f.write("Hello, World!\\n")
    f.write("Python file handling\\n")
    f.write("Line three\\n")
print(f"File written: {filepath}")

# Reading entire file
with open(filepath, "r") as f:
    content = f.read()
print(f"\\nFull content:\\n{content}")

# Reading line by line (memory efficient)
print("Line by line:")
with open(filepath, "r") as f:
    for line in f:
        print(f"  {line.strip()}")

# Append mode
with open(filepath, "a") as f:
    f.write("Appended line\\n")

# Read all lines as a list
with open(filepath, "r") as f:
    lines = f.readlines()
print(f"\\nAll lines: {lines}")

# File modes overview
modes = {
    "r": "Read (default, file must exist)",
    "w": "Write (creates/truncates)",
    "a": "Append (creates/adds to end)",
    "x": "Create (fails if exists)",
    "rb": "Read binary",
    "wb": "Write binary",
}
print("\\nFile modes:")
for mode, desc in modes.items():
    print(f"  '{mode}': {desc}")

# Check if file exists
print(f"\\nExists? {os.path.exists(filepath)}")
print(f"Size: {os.path.getsize(filepath)} bytes")

# Using encoding explicitly
with open(filepath, "r", encoding="utf-8") as f:
    data = f.read()
    print(f"UTF-8 read: {len(data)} chars")

# Cleanup
os.remove(filepath)
os.rmdir(tmp)
print("\\nCleaned up temp files")
`,
    },
    interviewQuestions: [
      {
        question: "Why should you use 'with' statement for file handling?",
        difficulty: "Easy",
        hint: "The 'with' statement (context manager) guarantees the file is closed when the block exits, even if an exception occurs. Without it: f = open('file'); f.read(); f.close() — if read() raises, close() is never called (resource leak). With: with open('file') as f: f.read() — file closed automatically. Also: cleaner syntax, no need for try/finally. The 'with' statement calls __enter__ (opens file) and __exit__ (closes file). Multiple files: with open(a) as f1, open(b) as f2: ...",
      },
      {
        question: "What is the difference between the file modes?",
        difficulty: "Medium",
        hint: "'r': read only, file must exist. 'w': write only, creates or TRUNCATES (erases content!). 'a': append only, creates or adds to end. 'x': exclusive create, fails if file exists (safe creation). 'r+': read and write, file must exist. 'w+': read and write, truncates. 'a+': read and append. Add 'b' for binary (rb, wb). Text mode (default): handles encoding, newline translation. Binary mode: raw bytes, no translation. Always specify encoding='utf-8' for text to avoid platform-specific defaults.",
      },
      {
        question: "How do you handle large files efficiently in Python?",
        difficulty: "Hard",
        hint: "Don't read entire file into memory. Techniques: 1) Iterate line by line: for line in f: (file is an iterator, reads one line at a time). 2) Read in chunks: while chunk := f.read(8192): process(chunk). 3) Use readline(): line = f.readline(). 4) For binary: read fixed chunks. 5) Memory-mapped files: mmap module for random access. 6) Generator pattern: def read_chunks(f, size): while chunk := f.read(size): yield chunk. Memory usage stays constant regardless of file size. For CSV: use csv.reader (lazy). For JSON: use ijson for streaming.",
      },
    ],
  },
  {
    id: "python-reading-files",
    title: "Reading Files",
    slug: "python-reading-files",
    icon: "FileText",
    difficulty: "Intermediate",
    description:
      "Master different ways to read files — read(), readline(), readlines(), iteration, and efficient reading patterns.",
    concept: {
      explanation:
        "Python offers multiple ways to read files. read() reads the entire file as a string. read(n) reads n characters. readline() reads one line. readlines() reads all lines into a list. Iterating over the file object reads line by line (most memory efficient). The file position is tracked by a cursor — tell() returns position, seek() moves it. For large files, iterate or read in chunks. For binary files, use 'rb' mode and read bytes. pathlib.Path provides convenient read_text() and read_bytes() methods. Always handle encoding explicitly with encoding='utf-8'.",
      realLifeAnalogy:
        "Reading a file is like reading a book. read() is reading the entire book cover to cover in one sitting. readline() is reading one line at a time. readlines() is photocopying every page into separate sheets. Iterating is reading one page, processing it, then moving to the next (most efficient — you don't need to hold the whole book). seek() is bookmarking and flipping to a specific page.",
      keyPoints: [
        "read() — entire file as one string",
        "read(n) — read n characters/bytes",
        "readline() — one line at a time",
        "readlines() — all lines as a list",
        "for line in f: — iterate (most efficient)",
        "tell() — current position, seek() — move cursor",
        "pathlib.Path.read_text() — convenient one-liner",
        "Always specify encoding='utf-8'",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Reading Files =====
import os, tempfile
from pathlib import Path

# Setup: create a sample file
tmp = tempfile.mkdtemp()
filepath = os.path.join(tmp, "sample.txt")
with open(filepath, "w", encoding="utf-8") as f:
    f.write("Line 1: Hello Python\\n")
    f.write("Line 2: File reading\\n")
    f.write("Line 3: Is easy\\n")
    f.write("Line 4: And fun!\\n")

# 1. read() — entire file
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()
print(f"read():\\n{content}")

# 2. read(n) — partial read
with open(filepath, "r") as f:
    first_10 = f.read(10)
    next_10 = f.read(10)
print(f"First 10: '{first_10}'")
print(f"Next 10: '{next_10}'")

# 3. readline() — one line at a time
print("\\nreadline():")
with open(filepath, "r") as f:
    print(f"  {f.readline().strip()}")
    print(f"  {f.readline().strip()}")

# 4. readlines() — list of all lines
with open(filepath, "r") as f:
    lines = f.readlines()
print(f"\\nreadlines(): {lines}")

# 5. Iterate (best for large files)
print("Iteration:")
with open(filepath, "r") as f:
    for i, line in enumerate(f, 1):
        print(f"  Line {i}: {line.strip()}")

# 6. tell() and seek()
print("\\ntell/seek:")
with open(filepath, "r") as f:
    print(f"  Position: {f.tell()}")
    f.read(10)
    print(f"  After read(10): {f.tell()}")
    f.seek(0)  # Back to start
    print(f"  After seek(0): {f.tell()}")

# 7. pathlib — modern approach
p = Path(filepath)
content = p.read_text(encoding="utf-8")
print(f"\\npathlib read_text(): {len(content)} chars")

# 8. List comprehension pattern
with open(filepath) as f:
    stripped = [line.strip() for line in f]
print(f"Stripped lines: {stripped}")

# 9. Reading with filter
with open(filepath) as f:
    python_lines = [l.strip() for l in f if "Python" in l]
print(f"Lines with 'Python': {python_lines}")

# Cleanup
os.remove(filepath)
os.rmdir(tmp)
`,
    },
    interviewQuestions: [
      {
        question: "What are the different methods to read a file in Python?",
        difficulty: "Easy",
        hint: "read(): entire file as string. read(n): n characters. readline(): one line (includes \\n). readlines(): list of all lines. for line in file: iterate line by line (best for large files, memory efficient). Also: pathlib.Path('file').read_text(). Each read advances the file cursor. readline() returns '' (empty string) at EOF. readlines() loads everything into memory. Iteration is lazy — one line at a time. Use read() for small files, iteration for large ones.",
      },
      {
        question: "How do tell() and seek() work?",
        difficulty: "Medium",
        hint: "tell() returns the current byte position in the file (0-based). seek(offset, whence) moves the cursor. whence: 0 = from start (default), 1 = from current, 2 = from end. seek(0) goes to start (reset for re-reading). seek(0, 2) goes to end. In text mode, only seek(0) and seek(tell_value) are portable — arbitrary seeks may break multi-byte characters. In binary mode, all seeks work. Common pattern: pos = f.tell(); process(); f.seek(pos) — save and restore position.",
      },
      {
        question: "How would you read a file in reverse (last line first)?",
        difficulty: "Hard",
        hint: "Several approaches: 1) readlines() then reversed(): lines = f.readlines(); for line in reversed(lines) — simple but loads all in memory. 2) For large files, read from end in chunks: seek to end, read backwards in blocks, split by newlines. 3) collections.deque with maxlen for last N lines. 4) Linux: subprocess.run(['tac', filename]). 5) For truly large files: mmap + rfind(b'\\n'). The chunk approach: seek to end, read 4KB backwards, find newlines, yield lines. Libraries: file-read-backwards package. Most practical: readlines() + reversed() unless file is huge.",
      },
    ],
  },
  {
    id: "python-writing-files",
    title: "Writing Files",
    slug: "python-writing-files",
    icon: "FileText",
    difficulty: "Intermediate",
    description:
      "Learn to write files — write(), writelines(), append mode, and safe writing patterns.",
    concept: {
      explanation:
        "Writing files uses open() with mode 'w' (write/truncate), 'a' (append), or 'x' (exclusive create). write(string) writes a string and returns the number of characters written. writelines(list) writes a list of strings (no newlines added automatically). 'w' mode truncates the file — previous content is erased! Use 'a' to add to existing content. For safe writing, write to a temp file first, then rename (atomic operation). print() can write to files with file= parameter. flush() forces buffered data to disk. pathlib.Path provides write_text() and write_bytes() methods.",
      realLifeAnalogy:
        "Writing to a file is like writing in a notebook. 'w' mode gives you a blank page (erases everything). 'a' mode lets you continue writing after the last entry. 'x' mode is like a new notebook — fails if one already exists. writelines() is like pasting multiple sticky notes at once. Safe writing (temp file + rename) is like writing a draft, proofreading it, then replacing the original — if something goes wrong, the original is still intact.",
      keyPoints: [
        "'w' mode: creates or TRUNCATES (erases content!)",
        "'a' mode: creates or appends to end",
        "'x' mode: creates, fails if file exists",
        "write(str): writes string, returns char count",
        "writelines(list): writes list of strings (no \\n added)",
        "print('text', file=f): write with print formatting",
        "flush(): force write buffer to disk",
        "Safe write: temp file + os.rename (atomic)",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Writing Files =====
import os, tempfile
from pathlib import Path

tmp = tempfile.mkdtemp()

# 1. Basic write (creates/truncates)
filepath = os.path.join(tmp, "output.txt")
with open(filepath, "w", encoding="utf-8") as f:
    chars = f.write("Hello, World!\\n")
    f.write("Second line\\n")
print(f"Wrote {chars} chars")

# Verify
with open(filepath) as f:
    print(f.read())

# 2. ⚠️ 'w' mode TRUNCATES!
with open(filepath, "w") as f:
    f.write("This replaces everything!\\n")
with open(filepath) as f:
    print(f"After 'w': {f.read().strip()}")

# 3. Append mode
with open(filepath, "a") as f:
    f.write("Appended line 1\\n")
    f.write("Appended line 2\\n")
with open(filepath) as f:
    print(f"\\nAfter 'a':\\n{f.read()}")

# 4. writelines() — no newlines added!
lines_path = os.path.join(tmp, "lines.txt")
lines = ["Line A\\n", "Line B\\n", "Line C\\n"]
with open(lines_path, "w") as f:
    f.writelines(lines)
with open(lines_path) as f:
    print(f"writelines: {f.readlines()}")

# 5. print() to file
print_path = os.path.join(tmp, "printed.txt")
with open(print_path, "w") as f:
    print("Name:", "Alice", file=f)
    print("Age:", 30, file=f)
    print("Scores:", [90, 85, 92], file=f)
with open(print_path) as f:
    print(f"\\nprint() to file:\\n{f.read()}")

# 6. Exclusive create ('x')
new_path = os.path.join(tmp, "new.txt")
with open(new_path, "x") as f:
    f.write("Created safely\\n")
try:
    with open(new_path, "x") as f:  # Fails!
        pass
except FileExistsError:
    print("FileExistsError: file already exists!")

# 7. pathlib — modern approach
p = Path(tmp) / "pathlib.txt"
p.write_text("Written with pathlib!\\n", encoding="utf-8")
print(f"\\npathlib: {p.read_text()}")

# 8. Writing multiple data formats
data_path = os.path.join(tmp, "data.txt")
records = [("Alice", 30), ("Bob", 25), ("Charlie", 35)]
with open(data_path, "w") as f:
    f.write("Name,Age\\n")
    for name, age in records:
        f.write(f"{name},{age}\\n")
with open(data_path) as f:
    print(f"CSV-like:\\n{f.read()}")

# Cleanup
import shutil
shutil.rmtree(tmp)
print("Cleaned up!")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between write() and writelines()?",
        difficulty: "Easy",
        hint: "write(string): writes a single string to the file. Returns number of characters written. writelines(iterable): writes a list/iterable of strings. Does NOT add newlines — you must include \\n in each string. writelines(['a\\n', 'b\\n']) writes two lines. writelines(['a', 'b']) writes 'ab' (no separation). writelines is essentially: for s in iterable: f.write(s). Neither method adds automatic newlines. Use print(text, file=f) if you want automatic newline.",
      },
      {
        question: "How do you safely write to a file without data loss?",
        difficulty: "Medium",
        hint: "Write to a temp file in the same directory, then rename (atomic on same filesystem). Pattern: import tempfile, os; with tempfile.NamedTemporaryFile('w', dir=dir, delete=False) as tmp: tmp.write(data); tmp_name = tmp.name; os.rename(tmp_name, target_path). This ensures: if write fails, original is intact. If rename succeeds, data is complete. Also: flush() + os.fsync(f.fileno()) to ensure data reaches disk. For databases: use transactions. For config: write .tmp then rename. shutil.move for cross-device.",
      },
      {
        question: "How does file buffering work in Python?",
        difficulty: "Hard",
        hint: "Python buffers file writes for performance. Buffering modes (open(f, buffering=n)): 0 = unbuffered (binary only), 1 = line buffered (text mode, flush on \\n), >1 = buffer size in bytes, -1 = default (usually 8KB for files, line-buffered for interactive). flush() forces buffer to OS. os.fsync(f.fileno()) forces OS to write to disk. Buffers are also flushed on close() and when full. In 'with' blocks, flush happens on __exit__. For real-time logging: use line buffering or explicit flush(). For crash safety: flush() + fsync() after critical writes.",
      },
    ],
  },
  {
    id: "python-csv-json",
    title: "Working with CSV and JSON",
    slug: "python-csv-json",
    icon: "FileCode",
    difficulty: "Intermediate",
    description:
      "Learn to read and write CSV and JSON files — the most common data exchange formats in Python.",
    concept: {
      explanation:
        "CSV (Comma-Separated Values) and JSON (JavaScript Object Notation) are the most common data formats. Python's csv module handles CSV: csv.reader for reading, csv.writer for writing, csv.DictReader/DictWriter for dict-based access. Python's json module handles JSON: json.load/dump for files, json.loads/dumps for strings. CSV is ideal for tabular data; JSON for nested/hierarchical data. Both modules handle edge cases (commas in fields, Unicode, nested structures). For large CSV files, use csv.reader (streaming) instead of loading all into memory. For large JSON, consider ijson for streaming.",
      realLifeAnalogy:
        "CSV is like a spreadsheet — data in rows and columns, simple and flat. JSON is like a filing cabinet with nested folders — it can represent complex hierarchical relationships. The csv module is your spreadsheet reader, and the json module is your filing cabinet organizer. Both convert between Python objects (dicts, lists) and text files that other programs can understand.",
      keyPoints: [
        "csv.reader/writer: basic CSV operations",
        "csv.DictReader/DictWriter: dict-based access",
        "json.load(file) / json.dump(data, file): file I/O",
        "json.loads(string) / json.dumps(data): string I/O",
        "json.dumps(indent=2): pretty printing",
        "CSV: flat/tabular data; JSON: nested/hierarchical",
        "Both handle encoding with encoding='utf-8'",
        "Use csv.reader for streaming large files",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Working with CSV and JSON =====
import csv
import json
import os
import tempfile

tmp = tempfile.mkdtemp()

# ── CSV ────────────────────────────────

# Writing CSV
csv_path = os.path.join(tmp, "people.csv")
with open(csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "age", "city"])
    writer.writerow(["Alice", 30, "NYC"])
    writer.writerow(["Bob", 25, "LA"])
    writer.writerow(["Charlie", 35, "Chicago"])
print("CSV written!")

# Reading CSV
print("\\n--- csv.reader ---")
with open(csv_path, "r") as f:
    reader = csv.reader(f)
    header = next(reader)
    print(f"Header: {header}")
    for row in reader:
        print(f"  {row}")

# DictReader — access by column name
print("\\n--- DictReader ---")
with open(csv_path, "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"  {row['name']} is {row['age']} from {row['city']}")

# DictWriter
dict_csv = os.path.join(tmp, "dict_out.csv")
data = [
    {"product": "Coffee", "price": 4.99, "qty": 10},
    {"product": "Tea", "price": 2.99, "qty": 25},
]
with open(dict_csv, "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["product", "price", "qty"])
    writer.writeheader()
    writer.writerows(data)
print("\\nDictWriter output:")
with open(dict_csv) as f:
    print(f"  {f.read().strip()}")

# ── JSON ───────────────────────────────

# Writing JSON
json_path = os.path.join(tmp, "data.json")
data = {
    "name": "Alice",
    "age": 30,
    "hobbies": ["reading", "coding", "hiking"],
    "address": {"city": "NYC", "zip": "10001"},
}
with open(json_path, "w") as f:
    json.dump(data, f, indent=2)
print("\\nJSON written!")

# Reading JSON
with open(json_path, "r") as f:
    loaded = json.load(f)
print(f"Loaded: {loaded['name']}, {loaded['address']['city']}")
print(f"Hobbies: {loaded['hobbies']}")

# JSON strings
json_str = json.dumps(data, indent=2)
print(f"\\nJSON string:\\n{json_str}")

parsed = json.loads(json_str)
print(f"\\nParsed back: {parsed['name']}")

# JSON with custom types
from datetime import datetime
class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

event = {"name": "Meeting", "date": datetime(2024, 6, 15, 10, 30)}
print(f"\\nCustom: {json.dumps(event, cls=DateEncoder)}")

# Cleanup
import shutil
shutil.rmtree(tmp)
print("\\nCleaned up!")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between json.load and json.loads?",
        difficulty: "Easy",
        hint: "json.load(file_object): reads JSON from a FILE object and parses it. json.loads(string): parses a JSON STRING. The 's' stands for 'string.' Similarly: json.dump(data, file): writes to file. json.dumps(data): returns a string. Mnemonic: with 's' = string, without 's' = file. Common pattern: with open('data.json') as f: data = json.load(f). For strings: data = json.loads('{\"key\": \"value\"}').",
      },
      {
        question: "How do you handle CSV files with special characters?",
        difficulty: "Medium",
        hint: "csv module handles quoting automatically: fields with commas, quotes, or newlines are quoted. csv.QUOTE_MINIMAL (default): quote only when needed. csv.QUOTE_ALL: quote everything. csv.QUOTE_NONNUMERIC: quote non-numbers. For encoding: open(path, encoding='utf-8-sig') for Excel-compatible UTF-8 CSV (BOM prefix). For custom delimiters: csv.reader(f, delimiter='\\t') for TSV. For embedded quotes: csv uses double-quoting by default ('\"\"' inside fields). Always use newline='' on Windows to prevent double newlines.",
      },
      {
        question: "How do you serialize custom Python objects to JSON?",
        difficulty: "Hard",
        hint: "JSON only supports: str, int, float, bool, None, list, dict. For custom objects: 1) Custom encoder: class MyEncoder(json.JSONEncoder): def default(self, obj): ... Return a serializable version. 2) default function: json.dumps(data, default=str). 3) __dict__ attribute: json.dumps(obj.__dict__). 4) dataclasses.asdict() for dataclasses. 5) Custom serialization method: class Foo: def to_json(self): return {...}. For deserialization: object_hook parameter: json.loads(s, object_hook=from_dict). For datetime: ISO format string. For sets: convert to list. For complex objects: consider pickle (Python-only) or protocol buffers.",
      },
    ],
  },
  // ─── Level 8: Modules and Libraries ─────────────────────────────────────────
  {
    id: "python-modules",
    title: "Python Modules",
    slug: "python-modules",
    icon: "Boxes",
    difficulty: "Intermediate",
    description:
      "Understand how Python organizes code into modules — reusable files that can be imported and shared across projects.",
    concept: {
      explanation:
        "A module is simply a Python file (.py) containing definitions — functions, classes, and variables. Modules let you organize code into logical units, avoid name collisions using namespaces, and share code across projects. When you import a module, Python executes it once and caches it in sys.modules. Every Python file is a module. The __name__ variable equals '__main__' when run directly or the module name when imported. You can create your own modules by saving code in .py files. Python searches for modules in: current directory, PYTHONPATH, standard library paths, and site-packages (sys.path).",
      realLifeAnalogy:
        "Modules are like chapters in a book. Each chapter (module) covers a specific topic and can reference other chapters. You don't need to read the whole book — just import the chapter you need. The table of contents (sys.path) tells Python where to find each chapter. Writing your own module is like adding a new chapter to the book.",
      keyPoints: [
        "A module is any .py file with Python code",
        "__name__ == '__main__' when run directly",
        "import executes the module once and caches it",
        "sys.path determines where Python looks for modules",
        "Modules provide namespaces to avoid name collisions",
        "dir(module) lists everything in a module",
        "reload() from importlib re-executes a module",
        "Standard library has 200+ built-in modules",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Python Modules =====

# Every .py file is a module
# Let's explore how modules work

import sys

# 1. sys.path — where Python looks for modules
print("Module search paths:")
for i, path in enumerate(sys.path[:4]):
    print(f"  {i}: {path}")

# 2. Creating and using a module concept
# If you had a file called 'mymath.py':
# def add(a, b): return a + b
# PI = 3.14159
# Then: import mymath; mymath.add(2, 3)

# 3. __name__ variable
print(f"\\nThis module's name: {__name__}")
# When run directly: __main__
# When imported: the module name

# 4. Checking loaded modules
print(f"\\nLoaded modules (sample):")
loaded = [m for m in sys.modules if not m.startswith('_')]
for mod in sorted(loaded)[:8]:
    print(f"  {mod}")

# 5. dir() — explore module contents
import math
print(f"\\nmath module contents (sample):")
print([x for x in dir(math) if not x.startswith('_')][:10])

# 6. Module attributes
print(f"\\nmath.__name__: {math.__name__}")
print(f"math.__doc__: {math.__doc__[:50]}...")

# 7. The if __name__ == '__main__' pattern
def main():
    print("\\nThis runs only when executed directly")

if __name__ == '__main__':
    main()
`,
    },
    interviewQuestions: [
      {
        question: "What is the purpose of if __name__ == '__main__'?",
        difficulty: "Easy",
        hint: "When Python runs a file directly, __name__ is set to '__main__'. When a file is imported as a module, __name__ is the module name. The if __name__ == '__main__' guard lets you write code that only runs when the file is executed directly, not when imported. This is useful for: testing code in the module, providing a CLI interface, running demos. Without it, import mymodule would execute ALL code in the file, including test prints and function calls.",
      },
      {
        question: "How does Python's module import system work internally?",
        difficulty: "Medium",
        hint: "When you import a module: 1) Python checks sys.modules cache — if found, returns cached version. 2) If not cached, searches sys.path in order: current dir, PYTHONPATH, stdlib, site-packages. 3) Once found, creates a new module object. 4) Executes the module code in the module's namespace. 5) Stores in sys.modules cache. 6) Binds the name in the importing module. Subsequent imports return the cached version — module code runs only ONCE. Use importlib.reload() to force re-execution.",
      },
      {
        question: "What are circular imports and how do you resolve them?",
        difficulty: "Hard",
        hint: "Circular imports occur when module A imports B and B imports A. Python handles this partially — the first module to start importing gets an incomplete module object. Solutions: 1) Move imports inside functions (lazy import). 2) Restructure code to eliminate the cycle — extract shared code to a third module. 3) Use import at the bottom of the file. 4) Import the module, not specific names (import a vs from a import x). Best practice: design clear module hierarchies with one-way dependencies. Use tools like pylint or mypy to detect cycles.",
      },
    ],
  },
  {
    id: "python-import-statements",
    title: "Import Statements",
    slug: "python-import-statements",
    icon: "GitMerge",
    difficulty: "Intermediate",
    description:
      "Master all forms of Python import — import, from...import, aliases, relative imports, and best practices for organizing imports.",
    concept: {
      explanation:
        "Python provides several import forms: 'import module' imports the whole module; 'from module import name' imports specific items; 'import module as alias' creates a short name; 'from module import *' imports everything (avoid this). Relative imports use dots: 'from . import sibling' or 'from ..parent import name'. PEP 8 recommends grouping imports: standard library, third-party, local — separated by blank lines. Each import form affects the namespace differently. The __all__ variable controls what 'from module import *' exports.",
      realLifeAnalogy:
        "Import statements are like ordering from a restaurant menu. 'import kitchen' gets you access to everything but you must say 'kitchen.pizza'. 'from kitchen import pizza' puts pizza directly on your table. 'import kitchen as k' gives the kitchen a nickname. 'from kitchen import *' dumps everything on your table — messy and you might not know where things came from.",
      keyPoints: [
        "import module — access via module.name",
        "from module import name — direct access to name",
        "import module as alias — short convenient name",
        "from module import * — imports all (avoid in production)",
        "__all__ controls wildcard import exports",
        "Relative imports: from . import, from .. import",
        "PEP 8 order: stdlib, third-party, local",
        "Imports are executed once and cached in sys.modules",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Import Statements =====

# 1. Basic import — full module access
import math
print(f"math.pi: {math.pi}")
print(f"math.sqrt(16): {math.sqrt(16)}")

# 2. from...import — specific items
from collections import Counter, defaultdict
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
print(f"\\nCounter: {Counter(words)}")

# 3. Import with alias
import datetime as dt
now = dt.datetime.now()
print(f"\\nNow: {now.strftime('%Y-%m-%d %H:%M')}")

# 4. from...import with alias
from collections import OrderedDict as OD
od = OD(a=1, b=2, c=3)
print(f"OrderedDict: {od}")

# 5. Multiple imports
from os.path import (
    join,
    exists,
    basename,
    dirname,
)
print(f"\\nbasename('/home/user/file.py'): {basename('/home/user/file.py')}")
print(f"dirname('/home/user/file.py'): {dirname('/home/user/file.py')}")

# 6. Import everything (NOT recommended)
# from math import *  # Pollutes namespace!

# 7. Conditional import
try:
    import ujson as json
    print("\\nUsing ujson (fast)")
except ImportError:
    import json
    print("\\nUsing standard json")

# 8. Checking what's available
import string
print(f"\\nstring module exports:")
print([x for x in dir(string) if not x.startswith('_')][:8])

# 9. PEP 8 import order example
# Standard library
import os
import sys
# Third-party (would be: import numpy as np)
# Local (would be: from mypackage import utils)

print(f"\\nPython version: {sys.version.split()[0]}")
print(f"Current dir: {os.getcwd()[:40]}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between import module and from module import name?",
        difficulty: "Easy",
        hint: "'import math' loads the math module and binds the name 'math' in your namespace. Access via math.pi, math.sqrt(). 'from math import pi, sqrt' loads math but only binds pi and sqrt directly — you use pi not math.pi. Trade-offs: 'import math' is explicit (clear where pi comes from), avoids name collisions. 'from math import pi' is shorter but risks shadowing local names. Best practice: use 'import module' for large modules; 'from module import name' for frequently used items.",
      },
      {
        question: "What does 'from module import *' do and why should you avoid it?",
        difficulty: "Medium",
        hint: "It imports all public names from the module into your namespace. If __all__ is defined, it imports only those names; otherwise, all names not starting with '_'. Problems: 1) Namespace pollution — you don't know what names are imported. 2) Name collisions — silently overwrites existing names. 3) Hard to debug — where did 'foo' come from? 4) Tools can't detect unused imports. 5) Makes code harder to read and maintain. Exception: sometimes OK in interactive interpreter. Alternative: import the specific names you need.",
      },
      {
        question: "Explain relative vs absolute imports and when to use each.",
        difficulty: "Hard",
        hint: "Absolute imports use the full path: 'from mypackage.submodule import func'. Relative imports use dots: 'from . import sibling' (same package), 'from .. import parent_module' (parent package), 'from ..other import func' (sibling package). Relative imports only work inside packages (not in __main__). PEP 8 recommends absolute imports as default — they're clearer and work everywhere. Use relative imports for: intra-package references where absolute paths are very long, making packages more self-contained and relocatable. Python 3 removed implicit relative imports — all imports are absolute by default.",
      },
    ],
  },
  {
    id: "python-packages",
    title: "Python Packages",
    slug: "python-packages",
    icon: "Boxes",
    difficulty: "Intermediate",
    description:
      "Organize modules into packages with __init__.py — create hierarchical namespaces and distribute reusable code.",
    concept: {
      explanation:
        "A package is a directory containing Python modules and an __init__.py file (which can be empty). Packages let you organize related modules hierarchically: mypackage/utils.py, mypackage/models.py. Sub-packages are nested directories with their own __init__.py. Since Python 3.3, namespace packages (without __init__.py) are also supported. __init__.py runs when the package is imported — use it to expose a clean API. setup.py or pyproject.toml configures distribution. pip installs packages from PyPI (Python Package Index) which has 400,000+ packages.",
      realLifeAnalogy:
        "A package is like a filing cabinet. Each drawer (sub-package) contains folders (modules), and each folder contains documents (functions, classes). The __init__.py is the cabinet's label and table of contents. When you open the cabinet (import the package), the label tells you what's inside. PyPI is like a library where you can borrow cabinets other people have built.",
      keyPoints: [
        "A package is a directory with __init__.py",
        "__init__.py runs on import — define package API here",
        "Sub-packages are nested directories with __init__.py",
        "Namespace packages (3.3+) don't need __init__.py",
        "pip installs from PyPI (Python Package Index)",
        "setup.py or pyproject.toml for distribution",
        "Virtual environments isolate package installations",
        "__all__ in __init__.py controls wildcard exports",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Python Packages =====

# Package structure example:
# myproject/
#   __init__.py          <- Makes it a package
#   utils.py             <- Module
#   models.py            <- Module
#   database/
#     __init__.py        <- Sub-package
#     connection.py      <- Module
#     queries.py         <- Module

# 1. How packages work
import json  # json is a package in stdlib
print(f"json package path: {json.__path__[0][:50]}...")
print(f"json package file: {json.__file__[-20:]}")

# 2. Importing from packages
from os.path import join, exists
from collections.abc import Mapping
print(f"\\njoin('a', 'b'): {join('a', 'b')}")
print(f"Mapping is abstract: {Mapping.__abstractmethods__}")

# 3. Package vs module
import os
import math
print(f"\\nos is a package: {hasattr(os, '__path__')}")
print(f"math is a module: {not hasattr(math, '__path__')}")

# 4. __init__.py concept
# mypackage/__init__.py:
# from .utils import helper_func
# from .models import User
# __all__ = ['helper_func', 'User']
#
# Then users can do:
# from mypackage import helper_func, User

# 5. Virtual environments
import sys
print(f"\\nPython executable: {sys.executable[-30:]}")
print(f"Prefix: {sys.prefix[-30:]}")

# 6. Installed packages
import pkg_resources
installed = [(d.project_name, d.version)
             for d in pkg_resources.working_set]
print(f"\\nInstalled packages (sample):")
for name, ver in sorted(installed)[:6]:
    print(f"  {name} == {ver}")

# 7. Package metadata
print(f"\\njson version: {json.__version__ if hasattr(json, '__version__') else 'N/A'}")

# 8. Creating distributable packages
# pyproject.toml (modern):
# [project]
# name = "mypackage"
# version = "1.0.0"
# dependencies = ["requests>=2.28"]
print("\\nModern packaging uses pyproject.toml")
print("Install with: pip install .")
`,
    },
    interviewQuestions: [
      {
        question: "What is __init__.py and why is it needed?",
        difficulty: "Easy",
        hint: "__init__.py marks a directory as a Python package. It runs when the package is imported. Uses: 1) Initialize package-level variables. 2) Import sub-modules to expose a clean API: 'from .utils import func'. 3) Define __all__ for wildcard imports. 4) Package-level documentation in docstrings. Can be empty — just marks the directory. Since Python 3.3, namespace packages work without __init__.py but regular packages (with it) are more common and explicit.",
      },
      {
        question: "How do virtual environments work and why use them?",
        difficulty: "Medium",
        hint: "Virtual environments create isolated Python installations. 'python -m venv myenv' creates one. It copies/symlinks the Python binary and creates a local site-packages directory. Activating it modifies PATH to use the local Python/pip. Benefits: 1) Project isolation — different projects can use different package versions. 2) No sudo needed — install to local directory. 3) Reproducibility — pip freeze > requirements.txt. 4) Clean testing environment. Tools: venv (built-in), virtualenv (faster), conda (data science), poetry/pipenv (dependency management).",
      },
      {
        question: "Explain the Python package distribution process.",
        difficulty: "Hard",
        hint: "Steps: 1) Structure code as a package with __init__.py. 2) Create pyproject.toml (PEP 621) or setup.py with metadata (name, version, dependencies). 3) Build with 'python -m build' — creates sdist (.tar.gz) and wheel (.whl). 4) Upload to PyPI with 'twine upload dist/*'. 5) Users install with 'pip install yourpackage'. Wheel format is preferred — pre-built, faster install. setup.cfg is declarative config. entry_points for CLI tools. classifiers for PyPI categorization. Use TestPyPI for testing before real upload.",
      },
    ],
  },
  {
    id: "python-standard-library",
    title: "Standard Library Overview",
    slug: "python-standard-library",
    icon: "Layers",
    difficulty: "Intermediate",
    description:
      "Explore Python's batteries-included standard library — 200+ modules for text, math, files, networking, and more.",
    concept: {
      explanation:
        "Python's standard library ('batteries included') provides 200+ modules that come pre-installed. Key categories: Text processing (string, re, textwrap), Data types (datetime, collections, enum), Math (math, statistics, decimal, fractions), File/OS (os, pathlib, shutil, glob), Data formats (json, csv, xml, html), Networking (urllib, http, socket, email), Concurrency (threading, multiprocessing, asyncio), Testing (unittest, doctest), and Debugging (logging, pdb, traceback). The standard library avoids external dependencies and is extensively tested, making it reliable for production use.",
      realLifeAnalogy:
        "The standard library is like a well-equipped workshop that comes free with Python. Instead of buying individual tools (installing packages), you already have a hammer (os), wrench (json), measuring tape (math), clock (datetime), and filing cabinet (pathlib). A professional may still buy specialized power tools (third-party packages), but the built-in toolkit handles most everyday tasks.",
      keyPoints: [
        "200+ modules included with every Python installation",
        "Text: string, re, textwrap, unicodedata",
        "Data: collections, datetime, enum, dataclasses",
        "Math: math, statistics, decimal, random",
        "Files: os, pathlib, shutil, glob, tempfile",
        "Formats: json, csv, xml, configparser",
        "Network: urllib, http, socket, email",
        "Testing: unittest, doctest, logging, pdb",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Standard Library Overview =====

# Python's "batteries included" philosophy
# These all come pre-installed — no pip needed!

# 1. collections — advanced data structures
from collections import Counter, defaultdict, deque
words = "the cat sat on the mat the cat".split()
print(f"Counter: {Counter(words).most_common(3)}")

dd = defaultdict(list)
dd["fruits"].append("apple")
dd["fruits"].append("banana")
print(f"defaultdict: {dict(dd)}")

# 2. itertools — efficient iteration
import itertools
print(f"\\nPermutations of [1,2,3]:")
for p in itertools.permutations([1, 2, 3]):
    print(f"  {p}")

# 3. functools — function tools
from functools import reduce, lru_cache
total = reduce(lambda a, b: a + b, [1, 2, 3, 4, 5])
print(f"\\nreduce sum: {total}")

# 4. pathlib — modern file paths
from pathlib import Path
p = Path(".")
print(f"\\nCurrent dir files (sample): {[f.name for f in p.iterdir()][:5]}")

# 5. textwrap — text formatting
import textwrap
long_text = "Python standard library provides over 200 modules for common tasks."
print(f"\\nWrapped:\\n{textwrap.fill(long_text, width=30)}")

# 6. re — regular expressions
import re
email = "user@example.com"
pattern = r'^[\\w.+-]+@[\\w-]+\\.[\\w.]+$'
print(f"\\n'{email}' is valid email: {bool(re.match(pattern, email))}")

# 7. enum — enumerations
from enum import Enum
class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3
print(f"\\nColor.RED: {Color.RED}, value: {Color.RED.value}")

# 8. dataclasses — structured data
from dataclasses import dataclass
@dataclass
class Point:
    x: float
    y: float
p = Point(3.0, 4.0)
print(f"\\nDataclass: {p}")

# Quick reference of key modules
modules = {
    "os": "OS interface",
    "sys": "System parameters",
    "json": "JSON encoding",
    "re": "Regular expressions",
    "datetime": "Date and time",
    "pathlib": "File paths",
    "collections": "Containers",
    "itertools": "Iteration tools",
}
print("\\nKey stdlib modules:")
for mod, desc in modules.items():
    print(f"  {mod:15} — {desc}")
`,
    },
    interviewQuestions: [
      {
        question: "Name 5 useful standard library modules and their purpose.",
        difficulty: "Easy",
        hint: "1) collections — Counter, defaultdict, deque, OrderedDict for advanced data structures. 2) os / pathlib — file system operations, paths, environment variables. 3) json — read/write JSON data. 4) re — regular expressions for pattern matching. 5) datetime — date/time manipulation. Others: itertools (efficient iteration), functools (function tools like lru_cache), logging (application logging), unittest (testing), math (mathematical functions), csv (CSV files), sys (system info).",
      },
      {
        question: "When should you use the standard library vs third-party packages?",
        difficulty: "Medium",
        hint: "Use stdlib when: 1) It fully meets your needs — no extra dependency. 2) Stability matters — stdlib is well-tested. 3) Deployment simplicity — no pip install needed. 4) Security — fewer supply chain risks. Use third-party when: 1) Stdlib is too low-level (requests vs urllib). 2) Performance critical (ujson vs json, numpy vs math). 3) Domain-specific needs (pandas, Django, pytest). 4) Better API design (pathlib was stdlib, but arrow > datetime for some). Rule: start with stdlib, upgrade to third-party when you hit limitations.",
      },
      {
        question: "How do collections.defaultdict and collections.Counter work internally?",
        difficulty: "Hard",
        hint: "defaultdict subclasses dict. It overrides __missing__(key) — when a key isn't found, calls the factory function (e.g., list, int, set) and stores the result. d = defaultdict(list); d['a'].append(1) — 'a' missing, creates list(), then appends. Counter subclasses dict. Counter(iterable) iterates and counts via __missing__ returning 0. most_common(n) uses heapq.nlargest. Supports arithmetic: Counter1 + Counter2 (union), Counter1 - Counter2 (difference). elements() returns iterator of repeated elements. Both are O(1) for lookups.",
      },
    ],
  },
  {
    id: "python-datetime-module",
    title: "datetime Module",
    slug: "python-datetime-module",
    icon: "Clock",
    difficulty: "Intermediate",
    description:
      "Work with dates, times, and durations using Python's datetime module — formatting, parsing, arithmetic, and timezones.",
    concept: {
      explanation:
        "The datetime module provides classes for manipulating dates and times. Key classes: date (year, month, day), time (hour, minute, second, microsecond), datetime (date + time combined), timedelta (duration/difference), timezone (UTC offset). datetime.now() gets the current date/time. strftime() formats to string; strptime() parses from string. timedelta enables date arithmetic: datetime + timedelta = new datetime. For timezone-aware code, use datetime.now(timezone.utc). The module handles leap years, month lengths, and calendar math automatically.",
      realLifeAnalogy:
        "The datetime module is like a smart calendar and clock combined. date is a page in the calendar. time is a clock reading. datetime is both together — 'Tuesday March 4th at 2:30 PM.' timedelta is a duration — 'in 3 days and 5 hours.' strftime is writing the date on a letter (formatting), strptime is reading a date from a letter (parsing). Timezone is which clock on the wall you're reading — New York vs Tokyo.",
      keyPoints: [
        "date(year, month, day) for calendar dates",
        "time(hour, minute, second) for clock times",
        "datetime combines date and time",
        "timedelta for durations and arithmetic",
        "strftime() formats datetime to string",
        "strptime() parses string to datetime",
        "timezone.utc for timezone-aware datetimes",
        "datetime.now() vs datetime.utcnow() (prefer now(tz))",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== datetime Module =====
from datetime import datetime, date, time, timedelta, timezone

# 1. Current date and time
now = datetime.now()
today = date.today()
print(f"Now: {now}")
print(f"Today: {today}")

# 2. Creating specific dates/times
birthday = date(1995, 6, 15)
meeting = datetime(2024, 12, 25, 14, 30, 0)
print(f"\\nBirthday: {birthday}")
print(f"Meeting: {meeting}")

# 3. Accessing components
print(f"\\nYear: {now.year}, Month: {now.month}, Day: {now.day}")
print(f"Hour: {now.hour}, Minute: {now.minute}")
print(f"Weekday: {now.strftime('%A')}")

# 4. String formatting (strftime)
print(f"\\nFormatted: {now.strftime('%B %d, %Y')}")
print(f"ISO format: {now.isoformat()}")
print(f"Custom: {now.strftime('%I:%M %p on %m/%d/%Y')}")

# 5. String parsing (strptime)
date_str = "2024-03-15 14:30:00"
parsed = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
print(f"\\nParsed: {parsed}")

# 6. Date arithmetic with timedelta
tomorrow = today + timedelta(days=1)
next_week = today + timedelta(weeks=1)
print(f"\\nTomorrow: {tomorrow}")
print(f"Next week: {next_week}")

# Time difference
age = today - birthday
print(f"\\nAge in days: {age.days}")
print(f"Age in years: {age.days // 365}")

# 7. Comparing dates
deadline = date(2025, 12, 31)
if today < deadline:
    remaining = deadline - today
    print(f"\\n{remaining.days} days until deadline")

# 8. Timezone-aware datetime
utc_now = datetime.now(timezone.utc)
est = timezone(timedelta(hours=-5))
est_now = utc_now.astimezone(est)
print(f"\\nUTC: {utc_now.strftime('%H:%M %Z')}")
print(f"EST: {est_now.strftime('%H:%M %Z')}")

# 9. Common format codes reference
codes = {
    "%Y": "4-digit year", "%m": "Month (01-12)",
    "%d": "Day (01-31)", "%H": "Hour 24h",
    "%I": "Hour 12h", "%M": "Minute",
    "%S": "Second", "%p": "AM/PM",
}
print("\\nFormat codes:")
for code, desc in codes.items():
    print(f"  {code}: {desc}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between strftime() and strptime()?",
        difficulty: "Easy",
        hint: "strftime() = 'string format time' — converts datetime object TO a formatted string. strptime() = 'string parse time' — parses a string INTO a datetime object. Example: dt.strftime('%Y-%m-%d') → '2024-03-15'. datetime.strptime('2024-03-15', '%Y-%m-%d') → datetime object. Mnemonic: f = format (output), p = parse (input). Both use the same format codes (%Y, %m, %d, %H, %M, %S, etc.).",
      },
      {
        question: "How do you handle timezones correctly in Python?",
        difficulty: "Medium",
        hint: "Always use timezone-aware datetimes: datetime.now(timezone.utc) instead of datetime.utcnow(). Store as UTC internally, convert to local for display. datetime.astimezone(tz) converts between zones. Built-in: timezone(timedelta(hours=offset)) for fixed offsets. For named timezones (America/New_York), use third-party: pytz or zoneinfo (3.9+). Common pitfall: naive datetimes (no timezone) mixed with aware ones raises TypeError. Best practice: make all datetimes timezone-aware from creation.",
      },
      {
        question: "How does timedelta work and what are its limitations?",
        difficulty: "Hard",
        hint: "timedelta stores days, seconds, and microseconds internally (all others are converted). timedelta(weeks=1, hours=2) = timedelta(days=7, seconds=7200). Supports arithmetic: datetime ± timedelta = datetime; timedelta ± timedelta = timedelta; timedelta * int = timedelta. Limitations: no months or years (variable length!). For month arithmetic, use dateutil.relativedelta: relativedelta(months=1) correctly handles Feb→Mar. timedelta resolution is microseconds. Max value: ~9999 years. total_seconds() returns float. Division: timedelta / timedelta = float.",
      },
    ],
  },
  {
    id: "python-math-module",
    title: "math Module",
    slug: "python-math-module",
    icon: "Calculator",
    difficulty: "Intermediate",
    description:
      "Use Python's math module for mathematical operations — trigonometry, logarithms, factorials, constants, and more.",
    concept: {
      explanation:
        "The math module provides mathematical functions and constants for real numbers. Constants: math.pi, math.e, math.inf, math.nan, math.tau (2π). Functions include: ceil/floor (rounding), sqrt/pow (powers), log/log2/log10 (logarithms), sin/cos/tan (trigonometry), factorial/comb/perm (combinatorics), gcd/lcm (number theory), isnan/isinf/isclose (comparisons). All functions work with floats. For complex numbers, use cmath. For arrays of numbers, use numpy. math is implemented in C, making it fast for scalar operations.",
      realLifeAnalogy:
        "The math module is like a scientific calculator. It has buttons for common operations (sqrt, sin, cos), built-in constants (π, e), and special functions (factorial, logarithms). Just like you pick up a calculator for math that's hard to do in your head, you import math for calculations beyond basic arithmetic. The calculator is fast and precise — just like the C-implemented math functions.",
      keyPoints: [
        "Constants: pi, e, inf, nan, tau",
        "Rounding: ceil(), floor(), trunc()",
        "Powers: sqrt(), pow(), exp()",
        "Logarithms: log(), log2(), log10()",
        "Trigonometry: sin(), cos(), tan(), radians()",
        "Combinatorics: factorial(), comb(), perm()",
        "Number theory: gcd(), lcm(), isqrt()",
        "Comparison: isnan(), isinf(), isclose()",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== math Module =====
import math

# 1. Constants
print("=== Constants ===")
print(f"pi: {math.pi}")
print(f"e:  {math.e}")
print(f"tau (2pi): {math.tau}")
print(f"inf: {math.inf}")
print(f"nan: {math.nan}")

# 2. Rounding
print("\\n=== Rounding ===")
print(f"ceil(4.2):  {math.ceil(4.2)}")    # 5
print(f"floor(4.8): {math.floor(4.8)}")   # 4
print(f"trunc(4.8): {math.trunc(4.8)}")   # 4
print(f"trunc(-4.8): {math.trunc(-4.8)}") # -4

# 3. Powers and roots
print("\\n=== Powers & Roots ===")
print(f"sqrt(144): {math.sqrt(144)}")
print(f"pow(2, 10): {math.pow(2, 10)}")
print(f"exp(1): {math.exp(1)}")       # e^1
print(f"isqrt(10): {math.isqrt(10)}") # Integer sqrt

# 4. Logarithms
print("\\n=== Logarithms ===")
print(f"log(e):    {math.log(math.e)}")     # Natural log
print(f"log2(1024): {math.log2(1024)}")
print(f"log10(1000): {math.log10(1000)}")
print(f"log(8, 2): {math.log(8, 2)}")       # Log base 2

# 5. Trigonometry
print("\\n=== Trigonometry ===")
angle = math.radians(45)  # Convert degrees to radians
print(f"sin(45°): {math.sin(angle):.4f}")
print(f"cos(45°): {math.cos(angle):.4f}")
print(f"tan(45°): {math.tan(angle):.4f}")
print(f"degrees(pi): {math.degrees(math.pi)}")

# 6. Combinatorics
print("\\n=== Combinatorics ===")
print(f"5!: {math.factorial(5)}")
print(f"C(10,3): {math.comb(10, 3)}")  # Combinations
print(f"P(10,3): {math.perm(10, 3)}")  # Permutations

# 7. Number theory
print("\\n=== Number Theory ===")
print(f"gcd(48, 36): {math.gcd(48, 36)}")
print(f"lcm(12, 18): {math.lcm(12, 18)}")

# 8. Special comparisons
print("\\n=== Comparisons ===")
print(f"isnan(nan): {math.isnan(float('nan'))}")
print(f"isinf(inf): {math.isinf(float('inf'))}")
print(f"isclose(0.1+0.2, 0.3): {math.isclose(0.1 + 0.2, 0.3)}")

# 9. Practical: distance between points
def distance(x1, y1, x2, y2):
    return math.hypot(x2 - x1, y2 - y1)

print(f"\\nDistance (0,0)→(3,4): {distance(0, 0, 3, 4)}")
`,
    },
    interviewQuestions: [
      {
        question: "Why does 0.1 + 0.2 != 0.3 in Python and how do you handle it?",
        difficulty: "Easy",
        hint: "Floating-point numbers use binary representation (IEEE 754). 0.1 and 0.2 can't be represented exactly in binary, so there's a tiny rounding error: 0.1 + 0.2 = 0.30000000000000004. Solutions: 1) math.isclose(a, b) — checks approximate equality. 2) decimal.Decimal('0.1') + Decimal('0.2') == Decimal('0.3') — exact decimal arithmetic. 3) Round before comparing: round(0.1 + 0.2, 1) == 0.3. 4) For money: use integers (cents) or Decimal. Never compare floats with ==.",
      },
      {
        question: "What is the difference between math.pow() and the ** operator?",
        difficulty: "Medium",
        hint: "math.pow(x, y) always returns a float: math.pow(2, 3) = 8.0. The ** operator preserves types: 2**3 = 8 (int), 2.0**3 = 8.0 (float). ** also handles big integers: 2**1000 works. math.pow converts to C double — overflow for very large numbers. ** calls __pow__ — supports custom types. For integer exponents, use **. For float math (especially with fractional exponents), math.pow is fine. Built-in pow(base, exp, mod) supports modular exponentiation: pow(2, 10, 1000) = 24 — very efficient for cryptography.",
      },
      {
        question: "When should you use math vs numpy vs decimal?",
        difficulty: "Hard",
        hint: "math: scalar operations on individual numbers. Fast C implementation. Functions like sqrt, sin, factorial. Limited to float precision. numpy: array/matrix operations on many numbers at once. Vectorized — much faster than loops. ndarray, broadcasting, linear algebra. Use for data science, ML, scientific computing. decimal: arbitrary-precision decimal arithmetic. Exact representation of decimal fractions. Use for financial calculations where precision matters. Configurable precision via getcontext().prec. Slower than float but exact. Summary: math for single values, numpy for arrays, decimal for money.",
      },
    ],
  },
  {
    id: "python-random-module",
    title: "random Module",
    slug: "python-random-module",
    icon: "Zap",
    difficulty: "Intermediate",
    description:
      "Generate random numbers, make random selections, and shuffle data using Python's random module.",
    concept: {
      explanation:
        "The random module generates pseudo-random numbers using the Mersenne Twister algorithm. Key functions: random() returns [0.0, 1.0), randint(a, b) returns integer in [a, b], uniform(a, b) returns float in [a, b], choice(seq) picks one item, choices(seq, k=n) picks n with replacement, sample(seq, k=n) picks n without replacement, shuffle(list) randomizes in place. seed(n) initializes the generator for reproducible results. For cryptographic randomness (passwords, tokens), use the secrets module instead — random is predictable if the seed is known.",
      realLifeAnalogy:
        "The random module is like a bag of tools for games of chance. random() is a spinning wheel from 0 to 1. randint() is rolling a die. choice() is drawing a card from a deck. shuffle() is shuffling the deck. sample() is drawing multiple cards without putting them back. seed() is like rigging the game — same seed always gives the same 'random' sequence. For real security, use secrets — it's like using a casino-grade random number generator instead of a toy.",
      keyPoints: [
        "random() — float in [0.0, 1.0)",
        "randint(a, b) — integer in [a, b] inclusive",
        "uniform(a, b) — float in [a, b]",
        "choice(seq) — pick one random element",
        "choices(seq, k=n) — pick n with replacement",
        "sample(seq, k=n) — pick n without replacement",
        "shuffle(list) — randomize in place",
        "seed(n) — reproducible results; secrets for crypto",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== random Module =====
import random

# Set seed for reproducible results
random.seed(42)

# 1. Basic random numbers
print("=== Random Numbers ===")
print(f"random():    {random.random():.4f}")      # [0.0, 1.0)
print(f"randint(1,6): {random.randint(1, 6)}")     # Dice roll
print(f"uniform(1,10): {random.uniform(1, 10):.2f}") # Float range

# 2. Random selection
colors = ["red", "green", "blue", "yellow", "purple"]
print(f"\\n=== Selection ===")
print(f"choice: {random.choice(colors)}")
print(f"choices(k=3): {random.choices(colors, k=3)}")  # With replacement
print(f"sample(k=3):  {random.sample(colors, k=3)}")   # Without replacement

# 3. Shuffle
deck = list(range(1, 11))
print(f"\\n=== Shuffle ===")
print(f"Before: {deck}")
random.shuffle(deck)
print(f"After:  {deck}")

# 4. Weighted random
outcomes = ["win", "lose", "draw"]
weights = [0.2, 0.5, 0.3]
results = random.choices(outcomes, weights=weights, k=10)
print(f"\\n=== Weighted Choices ===")
print(f"Results: {results}")

# 5. Random distributions
print(f"\\n=== Distributions ===")
print(f"gauss(0, 1): {random.gauss(0, 1):.4f}")
print(f"triangular(1, 10, 5): {random.triangular(1, 10, 5):.2f}")

# 6. Practical: generate password
import string
chars = string.ascii_letters + string.digits + "!@#$"
password = ''.join(random.choices(chars, k=12))
print(f"\\nRandom password: {password}")
print("(Use secrets module for real passwords!)")

# 7. Practical: simulate dice rolls
rolls = [random.randint(1, 6) for _ in range(1000)]
from collections import Counter
dist = Counter(rolls)
print(f"\\n1000 dice rolls distribution:")
for face in sorted(dist):
    bar = "█" * (dist[face] // 10)
    print(f"  {face}: {dist[face]:3d} {bar}")

# 8. Reproducibility with seed
random.seed(123)
a = [random.random() for _ in range(3)]
random.seed(123)
b = [random.random() for _ in range(3)]
print(f"\\nSame seed, same results: {a == b}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between choice(), choices(), and sample()?",
        difficulty: "Easy",
        hint: "choice(seq) picks ONE random element. choices(seq, k=n) picks n elements WITH replacement — same element can be picked multiple times. sample(seq, k=n) picks n elements WITHOUT replacement — each element picked at most once, k must be ≤ len(seq). Example with [1,2,3]: choice → 2. choices(k=5) → [1,3,1,2,1] (repeats ok). sample(k=3) → [3,1,2] (no repeats). choices also supports weights parameter for non-uniform probability.",
      },
      {
        question: "Why shouldn't you use random for security-sensitive code?",
        difficulty: "Medium",
        hint: "random uses the Mersenne Twister algorithm — it's pseudo-random, not truly random. Given enough output values (~624 32-bit numbers), an attacker can predict ALL future and past values. Never use it for: passwords, tokens, session IDs, encryption keys, nonces. Instead use: secrets module (secrets.token_hex(), secrets.choice()), os.urandom(), or random.SystemRandom() — these use the OS's cryptographic random number generator (/dev/urandom on Linux). secrets.token_urlsafe(32) for API tokens.",
      },
      {
        question: "How does random.seed() work and when would you use it?",
        difficulty: "Hard",
        hint: "seed() initializes the Mersenne Twister's internal state (624 32-bit integers). Same seed → same sequence of random numbers. Default seed: os.urandom() or current time. Use cases: 1) Testing — reproduce random behavior for debugging. 2) Scientific experiments — reproducible results. 3) ML training — reproducible model training (also set numpy.random.seed, torch.manual_seed). Warning: setting seed in production reduces randomness! seed(None) re-initializes from OS entropy. The state can be saved/restored with getstate()/setstate() for checkpointing.",
      },
    ],
  },
  {
    id: "python-os-module",
    title: "os Module",
    slug: "python-os-module",
    icon: "HardDrive",
    difficulty: "Intermediate",
    description:
      "Interact with the operating system using Python's os module — files, directories, environment variables, and system commands.",
    concept: {
      explanation:
        "The os module provides a portable way to interact with the operating system. File operations: os.rename(), os.remove(), os.stat(). Directory operations: os.mkdir(), os.makedirs(), os.listdir(), os.walk(). Path operations: os.path.join(), os.path.exists(), os.path.splitext() (prefer pathlib for new code). Environment: os.environ, os.getenv(). Process: os.getpid(), os.system(), os.popen(). The os module abstracts OS differences — the same code works on Windows, macOS, and Linux. For subprocesses, prefer subprocess over os.system().",
      realLifeAnalogy:
        "The os module is like a universal remote control for your computer. It can open and close folders (directories), move and rename files, check what's inside folders, read your computer's settings (environment variables), and even run other programs. Just like a universal remote works with any TV brand, os works the same on Windows, Mac, and Linux.",
      keyPoints: [
        "os.path.join() for cross-platform paths",
        "os.listdir() and os.walk() for directory traversal",
        "os.mkdir() / os.makedirs() to create directories",
        "os.remove() / os.rmdir() to delete files/dirs",
        "os.environ / os.getenv() for environment variables",
        "os.path.exists(), isfile(), isdir() for checks",
        "os.rename() to move/rename files",
        "Prefer pathlib for new code; subprocess over os.system()",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== os Module =====
import os
import os.path

# 1. Current directory
cwd = os.getcwd()
print(f"Current directory: {cwd[:50]}")

# 2. List directory contents
entries = os.listdir(".")
print(f"\\nDirectory contents ({len(entries)} items):")
for entry in sorted(entries)[:8]:
    kind = "DIR " if os.path.isdir(entry) else "FILE"
    print(f"  [{kind}] {entry}")

# 3. Path operations
filepath = "/home/user/documents/report.pdf"
print(f"\\n=== Path Operations ===")
print(f"basename: {os.path.basename(filepath)}")
print(f"dirname:  {os.path.dirname(filepath)}")
print(f"splitext: {os.path.splitext(filepath)}")
print(f"join:     {os.path.join('home', 'user', 'file.txt')}")

# 4. Check existence
print(f"\\n=== Existence Checks ===")
print(f"'.' exists: {os.path.exists('.')}")
print(f"'.' is dir: {os.path.isdir('.')}")

# 5. Environment variables
print(f"\\n=== Environment ===")
print(f"HOME: {os.getenv('HOME', 'N/A')}")
print(f"PATH (first entry): {os.getenv('PATH', '').split(':')[0]}")
print(f"USER: {os.getenv('USER', 'N/A')}")

# 6. File information
stat = os.stat(".")
print(f"\\n=== File Stats ===")
print(f"Size: {stat.st_size} bytes")
print(f"Mode: {oct(stat.st_mode)}")

# 7. Walk directory tree
print(f"\\n=== Directory Walk (first 3) ===")
count = 0
for root, dirs, files in os.walk("."):
    level = root.replace(".", "").count(os.sep)
    indent = "  " * level
    print(f"{indent}{os.path.basename(root)}/  ({len(files)} files)")
    count += 1
    if count >= 3:
        print("  ...")
        break

# 8. Platform info
print(f"\\n=== Platform ===")
print(f"OS name: {os.name}")
print(f"CPU count: {os.cpu_count()}")
print(f"PID: {os.getpid()}")

# 9. os.path vs pathlib comparison
from pathlib import Path
# Old way: os.path.join(os.path.expanduser("~"), "docs")
# New way: Path.home() / "docs"
print(f"\\nHome (pathlib): {Path.home()}")
print(f"Home (os):      {os.path.expanduser('~')}")

# 10. Common patterns
# Create directory if not exists
# os.makedirs("output/logs", exist_ok=True)

# Remove file safely
# if os.path.exists("temp.txt"):
#     os.remove("temp.txt")

print("\\nTip: Use pathlib for new code — cleaner API!")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between os.path and pathlib?",
        difficulty: "Easy",
        hint: "os.path uses strings and functions: os.path.join('a', 'b'), os.path.exists(path). pathlib uses objects: Path('a') / 'b', path.exists(). pathlib (3.4+) is more Pythonic: uses / operator for joining, methods on path objects, supports method chaining. os.path is older but still widely used. pathlib covers most os.path needs plus more: Path.home(), path.read_text(), path.mkdir(parents=True). Some libraries still need strings — use str(path) to convert. Recommendation: use pathlib for new code.",
      },
      {
        question: "How do you safely handle file and directory operations?",
        difficulty: "Medium",
        hint: "1) Check before acting: os.path.exists() before remove. 2) Use exist_ok: os.makedirs(path, exist_ok=True). 3) Use try/except for race conditions: try: os.remove(f) except FileNotFoundError: pass. 4) shutil for recursive operations: shutil.rmtree() for non-empty dirs. 5) tempfile for temp files: tempfile.NamedTemporaryFile(). 6) Always use os.path.join() or pathlib / for paths — never string concatenation. 7) Use 'with' for file handles. 8) os.replace() for atomic rename (overwrites target).",
      },
      {
        question: "Explain os.walk() and how to use it for recursive file operations.",
        difficulty: "Hard",
        hint: "os.walk(top) yields (dirpath, dirnames, filenames) for each directory in the tree. It walks top-down by default (can set topdown=False). dirpath is the current directory path. dirnames is a list of subdirectories. filenames is a list of files. Modifying dirnames in-place controls traversal: dirnames[:] = [d for d in dirnames if d != '.git'] skips .git. Full file path: os.path.join(dirpath, filename). Use case: find all .py files: for root, dirs, files in os.walk('.'): for f in files: if f.endswith('.py'): ... . Alternative: pathlib.Path.rglob('*.py').",
      },
    ],
  },
  // ─── Level 9: Advanced Python Concepts ──────────────────────────────────────
  {
    id: "python-iterators",
    title: "Iterators",
    slug: "python-iterators",
    icon: "Repeat",
    difficulty: "Advanced",
    description:
      "Understand the iterator protocol — __iter__ and __next__ — to build lazy, memory-efficient sequences in Python.",
    concept: {
      explanation:
        "An iterator is an object that implements the iterator protocol: __iter__() returns the iterator itself, and __next__() returns the next value or raises StopIteration when exhausted. Every for loop in Python uses iterators behind the scenes. iter(iterable) creates an iterator from any iterable (list, string, dict, file). Iterators are lazy — they produce one value at a time, making them memory-efficient for large datasets. You can create custom iterators by defining a class with __iter__ and __next__. The itertools module provides powerful iterator combinators. Iterators are one-pass — once exhausted, you must create a new one.",
      realLifeAnalogy:
        "An iterator is like a bookmark in a book. Each time you call next(), you read the next page and move the bookmark forward. You can only move forward, never backward. When you reach the last page, StopIteration is raised. An iterable (like a list) is the entire book — you can create a new bookmark anytime. A generator is like a storyteller who makes up each page on the fly, never keeping the whole book in memory.",
      keyPoints: [
        "__iter__() returns the iterator object",
        "__next__() returns the next value or raises StopIteration",
        "iter(iterable) creates an iterator from any iterable",
        "for loops call iter() then next() repeatedly",
        "Iterators are lazy — compute values on demand",
        "One-pass only — cannot reset or go backward",
        "Custom iterators via classes with __iter__/__next__",
        "itertools provides powerful iterator tools",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Iterators =====

# 1. How for loops use iterators
nums = [10, 20, 30]
it = iter(nums)  # Create iterator
print(next(it))  # 10
print(next(it))  # 20
print(next(it))  # 30
# next(it) would raise StopIteration

# 2. Behind the scenes of a for loop
print("\\nFor loop equivalent:")
it = iter(nums)
while True:
    try:
        val = next(it)
        print(f"  {val}")
    except StopIteration:
        break

# 3. Custom iterator — countdown
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        val = self.current
        self.current -= 1
        return val

print("\\nCountdown:")
for n in Countdown(5):
    print(f"  {n}", end=" ")
print()

# 4. Custom iterator — infinite counter
class Counter:
    def __init__(self, start=0):
        self.n = start

    def __iter__(self):
        return self

    def __next__(self):
        val = self.n
        self.n += 1
        return val

counter = Counter(1)
print(f"\\nFirst 5 from infinite counter:")
for _ in range(5):
    print(f"  {next(counter)}", end=" ")
print()

# 5. Iterators are one-pass
data = [1, 2, 3]
it = iter(data)
print(f"\\nFirst pass:  {list(it)}")
print(f"Second pass: {list(it)}")  # Empty!

# 6. Checking if something is iterable
from collections.abc import Iterable, Iterator
print(f"\\nlist is Iterable: {isinstance([], Iterable)}")
print(f"list is Iterator: {isinstance([], Iterator)}")
print(f"iter(list) is Iterator: {isinstance(iter([]), Iterator)}")

# 7. zip, enumerate, map all return iterators
z = zip([1, 2], ['a', 'b'])
print(f"\\nzip is Iterator: {isinstance(z, Iterator)}")
print(f"zip values: {list(z)}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between an iterable and an iterator?",
        difficulty: "Easy",
        hint: "An iterable has __iter__() that returns an iterator (list, dict, str, set, tuple). An iterator has both __iter__() (returns self) and __next__(). All iterators are iterables, but not all iterables are iterators. A list is iterable but not an iterator — you call iter(list) to get one. Key difference: iterators maintain state (current position), iterables don't. You can create multiple iterators from one iterable. iter() + next() is the protocol; for loops use it automatically.",
      },
      {
        question: "Why are iterators memory-efficient compared to lists?",
        difficulty: "Medium",
        hint: "Iterators produce values lazily — one at a time on demand. A list stores ALL values in memory simultaneously. Example: range(1_000_000) is an iterable that creates values on-the-fly — uses ~48 bytes regardless of size. list(range(1_000_000)) stores all million integers — uses ~8MB. File iterators read line by line instead of loading entire file. Use iterators when: processing large datasets, streaming data, infinite sequences, pipeline processing. Trade-off: can't index or go backward.",
      },
      {
        question: "How do you create a custom iterator that supports reset/reuse?",
        difficulty: "Hard",
        hint: "Separate the iterable from the iterator. The iterable class implements __iter__() returning a NEW iterator each time. The iterator class tracks state and implements __next__(). Example: class Range: __iter__ returns RangeIterator(self.n). class RangeIterator: tracks current position, implements __next__. Each for loop creates a fresh iterator via __iter__. Alternative: implement __iter__ as a generator method: def __iter__(self): for i in range(self.n): yield i — simpler and automatically reusable since each call creates a new generator.",
      },
    ],
  },
  {
    id: "python-generators",
    title: "Generators",
    slug: "python-generators",
    icon: "Zap",
    difficulty: "Advanced",
    description:
      "Create lazy sequences with generator functions (yield) and generator expressions — powerful, memory-efficient iteration.",
    concept: {
      explanation:
        "Generators are a simple way to create iterators. A generator function uses yield instead of return — it pauses execution and produces a value, resuming where it left off on the next call. Generator expressions use syntax like (x**2 for x in range(10)) — similar to list comprehensions but lazy. Generators maintain their local state between yields. yield from delegates to a sub-generator. Generators support send(), throw(), and close() for advanced coroutine patterns. They're ideal for pipelines, large data processing, and infinite sequences.",
      realLifeAnalogy:
        "A generator is like a baker who makes bread one loaf at a time to order, rather than baking 1000 loaves and storing them. Each time a customer calls next(), the baker makes one loaf (yield), pauses, and waits. The baker remembers exactly where they were in the recipe. This saves storage space (memory) and avoids waste (unused computation). yield from is like the baker delegating to a pastry chef for desserts.",
      keyPoints: [
        "yield pauses function and produces a value",
        "Generator functions return generator objects",
        "Lazy evaluation — values computed on demand",
        "Generator expressions: (expr for x in iterable)",
        "yield from delegates to sub-generator",
        "send() sends value into generator",
        "Generators are single-use iterators",
        "Ideal for pipelines and large data processing",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Generators =====

# 1. Generator function
def countdown(n):
    print(f"Starting countdown from {n}")
    while n > 0:
        yield n
        n -= 1
    print("Done!")

print("Creating generator:")
gen = countdown(5)
print(f"Type: {type(gen)}")
print(f"First: {next(gen)}")
print(f"Second: {next(gen)}")
print("Rest:", list(gen))

# 2. Generator expression
squares = (x**2 for x in range(10))
print(f"\\nGenerator expr type: {type(squares)}")
print(f"Sum of squares: {sum(squares)}")

# 3. Memory comparison
import sys
list_comp = [x**2 for x in range(1000)]
gen_expr = (x**2 for x in range(1000))
print(f"\\nList size: {sys.getsizeof(list_comp)} bytes")
print(f"Generator size: {sys.getsizeof(gen_expr)} bytes")

# 4. Infinite generator
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
print(f"\\nFirst 10 Fibonacci:")
print([next(fib) for _ in range(10)])

# 5. yield from — delegation
def inner():
    yield 1
    yield 2

def outer():
    yield "start"
    yield from inner()
    yield "end"

print(f"\\nyield from: {list(outer())}")

# 6. Generator pipeline
def read_data():
    yield from [
        "Alice,85", "Bob,92", "Charlie,78",
        "Diana,95", "Eve,88"
    ]

def parse_records(lines):
    for line in lines:
        name, score = line.split(",")
        yield {"name": name, "score": int(score)}

def high_scorers(records, threshold=90):
    for rec in records:
        if rec["score"] >= threshold:
            yield rec

# Pipeline: read -> parse -> filter
pipeline = high_scorers(parse_records(read_data()))
print("\\nHigh scorers (pipeline):")
for student in pipeline:
    print(f"  {student['name']}: {student['score']}")

# 7. send() — sending values into generator
def accumulator():
    total = 0
    while True:
        value = yield total
        if value is None:
            break
        total += value

acc = accumulator()
next(acc)  # Prime the generator
print(f"\\nAccumulator:")
print(f"  Send 10: {acc.send(10)}")
print(f"  Send 20: {acc.send(20)}")
print(f"  Send 5:  {acc.send(5)}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between yield and return?",
        difficulty: "Easy",
        hint: "return terminates the function and sends back a value — function state is lost. yield pauses the function and sends back a value — function state is preserved. On the next next() call, execution resumes after yield. A function with yield becomes a generator function — calling it returns a generator object (doesn't execute the body). Multiple yields are allowed. return in a generator raises StopIteration. yield makes functions lazy — values produced one at a time.",
      },
      {
        question: "When should you use generators vs list comprehensions?",
        difficulty: "Medium",
        hint: "Use generators when: 1) Dataset is large — don't want all values in memory. 2) You only need to iterate once. 3) Building a pipeline of transformations. 4) Working with infinite sequences. 5) Early termination is possible (only need first few matches). Use lists when: 1) Need random access (indexing, slicing). 2) Need to iterate multiple times. 3) Need len(). 4) Dataset is small. 5) Need to store results. Performance: generators use O(1) memory regardless of size; lists use O(n). Generators are slightly slower per-element due to yield overhead.",
      },
      {
        question: "Explain generator pipelines and how they process data lazily.",
        difficulty: "Hard",
        hint: "Generator pipelines chain generators where each stage processes one item at a time. Example: lines = read_file(path) → parsed = parse_csv(lines) → filtered = filter_rows(parsed) → result = aggregate(filtered). Each stage yields one item, pulls from previous stage on demand. Benefits: 1) O(1) memory regardless of file size. 2) First result available immediately (no waiting for full processing). 3) Composable — add/remove stages easily. 4) Only processes what's needed (early termination). Like Unix pipes: cat file | grep pattern | sort. yield from connects sub-pipelines. itertools provides reusable pipeline stages.",
      },
    ],
  },
  {
    id: "python-decorators",
    title: "Decorators",
    slug: "python-decorators",
    icon: "Layers",
    difficulty: "Advanced",
    description:
      "Wrap and enhance functions with decorators — @syntax, closures, functools.wraps, and practical patterns used in frameworks.",
    concept: {
      explanation:
        "A decorator is a function that takes another function as input and returns a modified version. The @decorator syntax is syntactic sugar: @timer before def func() is equivalent to func = timer(func). Decorators use closures — the wrapper function captures the original function. functools.wraps preserves the original function's metadata (__name__, __doc__). Decorators can accept arguments (decorator factories), be stacked, and be applied to classes. Common uses: logging, timing, authentication, caching (@lru_cache), rate limiting, and input validation. They're fundamental to Flask, Django, and other Python frameworks.",
      realLifeAnalogy:
        "A decorator is like gift wrapping. The gift (original function) stays the same, but the wrapper adds something extra — a bow (logging), a card (timing), or security tape (authentication). You can stack multiple layers of wrapping. The @syntax is like telling someone 'wrap this gift before giving it out.' The gift's name tag (functools.wraps) ensures people know what's inside despite the wrapping.",
      keyPoints: [
        "@decorator is sugar for func = decorator(func)",
        "Decorators are functions that wrap other functions",
        "Use functools.wraps to preserve metadata",
        "Decorator factories accept arguments: @decorator(arg)",
        "Closures capture the original function",
        "Can stack multiple decorators: @a @b def f()",
        "Common: logging, timing, auth, caching, validation",
        "Used extensively in Flask, Django, pytest",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Decorators =====
import functools
import time

# 1. Basic decorator
def uppercase(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

@uppercase
def greet(name):
    return f"hello, {name}"

print(f"Decorated: {greet('Alice')}")
print(f"Function name: {greet.__name__}")

# 2. Timer decorator
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"  {func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    total = sum(range(1_000_000))
    return total

print(f"\\nResult: {slow_function()}")

# 3. Decorator with arguments (factory)
def repeat(n):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(n):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(3)
def roll_dice():
    import random
    return random.randint(1, 6)

print(f"\\n3 dice rolls: {roll_dice()}")

# 4. Stacking decorators
def bold(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return f"**{func(*args, **kwargs)}**"
    return wrapper

def italic(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return f"_{func(*args, **kwargs)}_"
    return wrapper

@bold
@italic
def format_text(text):
    return text

print(f"\\nStacked: {format_text('Hello')}")
# bold(italic(format_text))

# 5. Practical: validate arguments
def validate_positive(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        for arg in args:
            if isinstance(arg, (int, float)) and arg < 0:
                raise ValueError(f"Negative value: {arg}")
        return func(*args, **kwargs)
    return wrapper

@validate_positive
def square_root(x):
    return x ** 0.5

print(f"\\nsqrt(25): {square_root(25)}")
try:
    square_root(-4)
except ValueError as e:
    print(f"Error: {e}")

# 6. Class-based decorator
class CountCalls:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        return self.func(*args, **kwargs)

@CountCalls
def say_hello():
    return "Hello!"

say_hello()
say_hello()
say_hello()
print(f"\\nsay_hello called {say_hello.count} times")
`,
    },
    interviewQuestions: [
      {
        question: "What is a decorator and how does the @syntax work?",
        difficulty: "Easy",
        hint: "A decorator is a function that takes a function and returns a modified function. @timer above def process() is syntactic sugar for process = timer(process). The decorator typically defines a wrapper function inside that calls the original function, possibly adding behavior before/after. @functools.wraps(func) on the wrapper preserves the original function's __name__, __doc__, and __module__. Without it, introspection shows the wrapper's metadata instead.",
      },
      {
        question: "How do you create a decorator that accepts arguments?",
        difficulty: "Medium",
        hint: "You need a decorator factory — a function that returns a decorator. Three levels of nesting: 1) Outer function takes decorator arguments. 2) Middle function (decorator) takes the function. 3) Inner function (wrapper) takes function arguments. Example: def retry(times): def decorator(func): @wraps(func) def wrapper(*args, **kwargs): for i in range(times): try: return func(*args, **kwargs) except: if i == times-1: raise. return wrapper. return decorator. @retry(3) def api_call(): ... . The outer call retry(3) returns the actual decorator.",
      },
      {
        question: "In what order are stacked decorators applied?",
        difficulty: "Hard",
        hint: "@a @b @c def f(): is equivalent to f = a(b(c(f))). Decorators are applied bottom-up (closest to function first), but execute top-down when called. c wraps f first, then b wraps that, then a wraps the outermost. When you call f(), execution goes: a's wrapper → b's wrapper → c's wrapper → original f → c returns → b returns → a returns. Think of it as layers of an onion: bottom decorator is innermost, top is outermost. This matters for: order of logging, authentication before processing, timing the inner function vs the whole chain.",
      },
    ],
  },
  {
    id: "python-context-managers",
    title: "Context Managers",
    slug: "python-context-managers",
    icon: "Lock",
    difficulty: "Advanced",
    description:
      "Manage resources safely with context managers and the 'with' statement — __enter__, __exit__, and contextlib patterns.",
    concept: {
      explanation:
        "Context managers ensure proper resource cleanup using the 'with' statement. They implement __enter__() (setup, returns resource) and __exit__() (cleanup, handles exceptions). The with statement guarantees __exit__ runs even if exceptions occur — perfect for files, locks, database connections, and temporary state. contextlib.contextmanager lets you write context managers as generator functions using yield. contextlib provides suppress (ignore exceptions), redirect_stdout, closing, and ExitStack (manage multiple resources). Custom context managers are essential for writing robust, leak-free Python code.",
      realLifeAnalogy:
        "A context manager is like checking into a hotel. __enter__ is check-in (you get your room key). The with block is your stay. __exit__ is checkout — it happens automatically whether your stay was great or terrible (exception). The hotel guarantees the room gets cleaned up. You don't have to remember to check out. contextlib.contextmanager is like a simpler booking app that handles check-in and checkout around your trip (yield).",
      keyPoints: [
        "'with' ensures cleanup even if exceptions occur",
        "__enter__() sets up and returns the resource",
        "__exit__() cleans up, can suppress exceptions",
        "@contextmanager simplifies with yield",
        "Multiple resources: with open() as f, lock:",
        "contextlib.suppress() ignores specific exceptions",
        "ExitStack for dynamic resource management",
        "Essential for files, locks, connections, temp state",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Context Managers =====
from contextlib import contextmanager, suppress
import time

# 1. Basic context manager class
class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        print("Timer started")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"Timer stopped: {self.elapsed:.4f}s")
        return False  # Don't suppress exceptions

with Timer() as t:
    total = sum(range(1_000_000))
    print(f"  Sum: {total}")

# 2. @contextmanager decorator (simpler!)
@contextmanager
def tag(name):
    print(f"<{name}>")
    yield name
    print(f"</{name}>")

print("\\n@contextmanager:")
with tag("div") as t:
    print(f"  Content inside {t}")

# 3. Exception handling in __exit__
class SafeDB:
    def __enter__(self):
        print("\\nDB connection opened")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            print(f"  Rolling back due to: {exc_val}")
        else:
            print("  Committing changes")
        print("  Connection closed")
        return True  # Suppress the exception

with SafeDB() as db:
    print("  Inserting data...")
    raise ValueError("Duplicate key!")
print("Continued after suppressed exception")

# 4. contextlib.suppress
print("\\nUsing suppress:")
with suppress(FileNotFoundError):
    # Would raise error, but suppressed
    open("nonexistent_file.txt")
print("  No crash!")

# 5. @contextmanager with error handling
@contextmanager
def managed_resource(name):
    print(f"  Acquiring {name}")
    resource = {"name": name, "active": True}
    try:
        yield resource
    except Exception as e:
        print(f"  Error: {e}")
    finally:
        resource["active"] = False
        print(f"  Released {name}")

print("\\nManaged resource:")
with managed_resource("lock") as r:
    print(f"  Using {r['name']}, active: {r['active']}")
print(f"  After: active = {r['active']}")

# 6. Nested context managers
@contextmanager
def indent(level=1):
    prefix = "  " * level
    print(f"{prefix}Entering level {level}")
    yield prefix
    print(f"{prefix}Exiting level {level}")

print("\\nNested:")
with indent(1) as p1:
    print(f"{p1}Work at level 1")
    with indent(2) as p2:
        print(f"{p2}Work at level 2")
`,
    },
    interviewQuestions: [
      {
        question: "What does the 'with' statement do and why use it?",
        difficulty: "Easy",
        hint: "The 'with' statement ensures resources are properly cleaned up. It calls __enter__() on entry and guarantees __exit__() runs on exit — even if an exception occurs. Common uses: files (auto-close), locks (auto-release), database connections (auto-commit/rollback). Without 'with': you must use try/finally to guarantee cleanup. 'with open(file) as f:' is equivalent to: f = open(file); try: ... finally: f.close(). The 'as' clause binds the return value of __enter__().",
      },
      {
        question: "How do you create a context manager using @contextmanager?",
        difficulty: "Medium",
        hint: "Use @contextlib.contextmanager on a generator function with exactly one yield. Code before yield = __enter__ (setup). The yielded value = what 'as' binds to. Code after yield = __exit__ (cleanup). Wrap yield in try/finally for guaranteed cleanup: @contextmanager def cm(): setup(); try: yield resource; finally: cleanup(). Exceptions in the with block appear at the yield point. To suppress: catch the exception in the generator. Simpler than writing a class with __enter__/__exit__.",
      },
      {
        question: "How does __exit__ handle exceptions and what does its return value mean?",
        difficulty: "Hard",
        hint: "__exit__(self, exc_type, exc_val, exc_tb) receives exception info if one occurred (all None if no exception). If __exit__ returns True, the exception is SUPPRESSED — execution continues after the with block. If it returns False/None, the exception propagates. This enables: transaction rollback on error, logging errors while re-raising, or completely swallowing specific exceptions. Example: suppress FileNotFoundError but let ValueError propagate: return isinstance(exc_type, FileNotFoundError). __exit__ always runs, making it reliable for cleanup. ExitStack manages multiple cleanup callbacks dynamically.",
      },
    ],
  },
  {
    id: "python-multithreading",
    title: "Multithreading Basics",
    slug: "python-multithreading",
    icon: "GitMerge",
    difficulty: "Advanced",
    description:
      "Run concurrent tasks with threads — threading module, GIL implications, synchronization, and I/O-bound parallelism.",
    concept: {
      explanation:
        "Multithreading runs multiple threads within a single process, sharing memory. Python's threading module provides Thread, Lock, Event, Semaphore, and more. The Global Interpreter Lock (GIL) prevents true parallel execution of Python bytecode — only one thread runs at a time. However, threads are excellent for I/O-bound tasks (network requests, file I/O, database queries) because threads release the GIL during I/O operations. Use concurrent.futures.ThreadPoolExecutor for simple thread management. Synchronization primitives (Lock, RLock, Condition) prevent race conditions when threads share data.",
      realLifeAnalogy:
        "Multithreading is like a chef (CPU) with multiple orders (threads) in a kitchen with one stove (GIL). The chef can only cook on one burner at a time, but while one dish is in the oven (I/O wait), the chef switches to prepare another. This keeps the kitchen busy. For CPU-intensive cooking (chopping, mixing), one stove is the bottleneck. Locks are like 'reserved' signs on shared ingredients — only one chef can use the salt at a time to prevent conflicts.",
      keyPoints: [
        "threading.Thread(target=func, args=()) creates threads",
        "thread.start() begins execution, thread.join() waits",
        "GIL limits to one thread executing Python at a time",
        "Threads excel at I/O-bound tasks (network, files)",
        "Lock prevents race conditions on shared data",
        "ThreadPoolExecutor simplifies thread management",
        "daemon=True threads die when main thread exits",
        "Use multiprocessing for CPU-bound parallelism",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Multithreading Basics =====
import threading
import time
from concurrent.futures import ThreadPoolExecutor

# 1. Basic threading
def worker(name, duration):
    print(f"  {name} starting")
    time.sleep(duration)
    print(f"  {name} done ({duration}s)")

print("=== Basic Threads ===")
threads = []
for i in range(3):
    t = threading.Thread(target=worker, args=(f"Thread-{i}", 0.5))
    threads.append(t)
    t.start()

for t in threads:
    t.join()
print("All threads complete\\n")

# 2. Thread with return values
results = {}

def compute(name, n):
    total = sum(range(n))
    results[name] = total

threads = [
    threading.Thread(target=compute, args=("A", 1_000_000)),
    threading.Thread(target=compute, args=("B", 500_000)),
]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(f"=== Results ===\\n  {results}")

# 3. Race condition demo
counter = 0

def increment(n):
    global counter
    for _ in range(n):
        counter += 1  # NOT thread-safe!

counter = 0
threads = [threading.Thread(target=increment, args=(100_000,)) for _ in range(5)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(f"\\n=== Race Condition ===")
print(f"  Expected: 500000, Got: {counter}")

# 4. Fix with Lock
lock = threading.Lock()
safe_counter = 0

def safe_increment(n):
    global safe_counter
    for _ in range(n):
        with lock:
            safe_counter += 1

safe_counter = 0
threads = [threading.Thread(target=safe_increment, args=(100_000,)) for _ in range(5)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(f"  With Lock: {safe_counter}")

# 5. ThreadPoolExecutor
print(f"\\n=== ThreadPoolExecutor ===")
def fetch_url(url):
    time.sleep(0.3)  # Simulate network
    return f"Data from {url}"

urls = ["api/users", "api/posts", "api/comments"]
with ThreadPoolExecutor(max_workers=3) as pool:
    futures = pool.map(fetch_url, urls)
    for result in futures:
        print(f"  {result}")

# 6. Thread info
print(f"\\n=== Thread Info ===")
print(f"  Active threads: {threading.active_count()}")
print(f"  Current thread: {threading.current_thread().name}")
`,
    },
    interviewQuestions: [
      {
        question: "What is the GIL and how does it affect multithreading?",
        difficulty: "Easy",
        hint: "The Global Interpreter Lock (GIL) is a mutex in CPython that allows only one thread to execute Python bytecode at a time. This means threads can't achieve true CPU parallelism. However, the GIL is released during I/O operations (file reads, network requests, sleep), so threads ARE useful for I/O-bound tasks. For CPU-bound work, use multiprocessing (separate processes, each with own GIL) or C extensions. The GIL simplifies memory management and C extension development. Other implementations (Jython, IronPython) don't have the GIL.",
      },
      {
        question: "How do you prevent race conditions in multithreaded code?",
        difficulty: "Medium",
        hint: "Race conditions occur when threads access shared data concurrently. Solutions: 1) threading.Lock — mutual exclusion: with lock: shared_data += 1. 2) threading.RLock — reentrant lock (same thread can acquire multiple times). 3) Queue — thread-safe data exchange (producer/consumer). 4) threading.local() — thread-local storage (each thread has its own copy). 5) Immutable data — no modification needed. 6) Atomic operations — some operations are inherently thread-safe. Best practice: minimize shared state; prefer message passing (Queue) over shared memory with locks.",
      },
      {
        question: "Compare threading.Thread vs concurrent.futures.ThreadPoolExecutor.",
        difficulty: "Hard",
        hint: "Thread: low-level, manual management, start/join each thread, no built-in return values, full control. ThreadPoolExecutor: high-level, manages a pool of reusable threads, submit() returns Future objects with result()/exception(), map() for bulk operations, context manager for cleanup. Executor advantages: 1) Limits concurrent threads (max_workers). 2) Reuses threads (less overhead). 3) Easy result collection via futures. 4) as_completed() for processing results as they arrive. 5) Exception handling via future.exception(). Use Thread for simple cases; Executor for production code with many tasks.",
      },
    ],
  },
  {
    id: "python-multiprocessing",
    title: "Multiprocessing Basics",
    slug: "python-multiprocessing",
    icon: "Cpu",
    difficulty: "Advanced",
    description:
      "Achieve true parallelism with multiprocessing — bypass the GIL for CPU-bound tasks using separate processes.",
    concept: {
      explanation:
        "The multiprocessing module spawns separate OS processes, each with its own Python interpreter and GIL. This enables true parallel execution on multiple CPU cores — ideal for CPU-bound tasks. Process is similar to Thread but runs in a separate process. ProcessPoolExecutor from concurrent.futures provides high-level management. Inter-process communication uses Queue, Pipe, or shared memory (Value, Array). Pool.map() distributes work across processes. Processes have higher overhead than threads (memory, startup time) but achieve real parallelism. Use multiprocessing for computation; threading for I/O.",
      realLifeAnalogy:
        "Multiprocessing is like hiring multiple chefs, each with their own kitchen (process) and stove (GIL). They can truly cook simultaneously — real parallelism. The downside: each kitchen needs its own ingredients (memory), and passing dishes between kitchens (inter-process communication) takes effort. Threading is one chef multitasking in one kitchen. Multiprocessing is multiple chefs in multiple kitchens — slower to set up but faster for big jobs.",
      keyPoints: [
        "Each process has its own Python interpreter and GIL",
        "True parallelism on multiple CPU cores",
        "Process(target=func, args=()) like Thread",
        "ProcessPoolExecutor for high-level management",
        "Queue and Pipe for inter-process communication",
        "Value and Array for shared memory",
        "Pool.map() distributes work across processes",
        "Higher overhead than threads — use for CPU-bound tasks",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Multiprocessing Basics =====
import multiprocessing as mp
import os
import time

# 1. Basic process creation
def worker(name):
    pid = os.getpid()
    print(f"  {name} running in process {pid}")
    time.sleep(0.3)
    print(f"  {name} done")

print("=== Basic Processes ===")
print(f"Main process: {os.getpid()}")
processes = []
for i in range(3):
    p = mp.Process(target=worker, args=(f"Worker-{i}",))
    processes.append(p)
    p.start()

for p in processes:
    p.join()
print("All processes complete")

# 2. CPU-bound comparison
def cpu_task(n):
    """Heavy computation"""
    return sum(i * i for i in range(n))

# Sequential
print(f"\\n=== Sequential vs Parallel ===")
start = time.perf_counter()
results = [cpu_task(2_000_000) for _ in range(4)]
seq_time = time.perf_counter() - start
print(f"Sequential: {seq_time:.3f}s")

# Parallel with Pool
start = time.perf_counter()
with mp.Pool(processes=4) as pool:
    results = pool.map(cpu_task, [2_000_000] * 4)
par_time = time.perf_counter() - start
print(f"Parallel:   {par_time:.3f}s")
print(f"Speedup:    {seq_time / par_time:.1f}x")

# 3. Sharing data with Queue
def producer(queue, items):
    for item in items:
        queue.put(item)
    queue.put(None)  # Sentinel

def consumer(queue):
    results = []
    while True:
        item = queue.get()
        if item is None:
            break
        results.append(item * 2)
    return results

print(f"\\n=== Queue Communication ===")
q = mp.Queue()
q.put(10)
q.put(20)
q.put(30)
print(f"  Queue items: {q.get()}, {q.get()}, {q.get()}")

# 4. Shared memory
print(f"\\n=== Shared Memory ===")
counter = mp.Value('i', 0)  # Shared integer
lock = mp.Lock()

def safe_increment(shared_val, lk, n):
    for _ in range(n):
        with lk:
            shared_val.value += 1

procs = [mp.Process(target=safe_increment, args=(counter, lock, 10000)) for _ in range(4)]
for p in procs:
    p.start()
for p in procs:
    p.join()
print(f"  Shared counter: {counter.value}")

# 5. Pool methods
print(f"\\n=== Pool Methods ===")
with mp.Pool(2) as pool:
    # map — ordered results
    squares = pool.map(lambda x: x**2, range(5))
    print(f"  map: {squares}")

    # apply_async — single task
    future = pool.apply_async(cpu_task, (100_000,))
    print(f"  apply_async: {future.get()}")

# 6. CPU info
print(f"\\n=== System Info ===")
print(f"  CPU count: {mp.cpu_count()}")
print(f"  Main PID: {os.getpid()}")
`,
    },
    interviewQuestions: [
      {
        question: "When should you use multiprocessing vs threading?",
        difficulty: "Easy",
        hint: "Use multiprocessing for CPU-bound tasks: number crunching, image processing, ML training — where you need true parallelism across cores. Use threading for I/O-bound tasks: network requests, file operations, database queries — where threads release the GIL during I/O. Multiprocessing has higher overhead: separate memory spaces, slower to start, more complex communication. Threading is lighter but limited by the GIL for CPU work. Rule of thumb: if your bottleneck is waiting (I/O), use threads. If it's computing (CPU), use processes.",
      },
      {
        question: "How do processes communicate with each other?",
        difficulty: "Medium",
        hint: "Processes don't share memory by default. Communication methods: 1) Queue — thread/process-safe FIFO queue, most common. 2) Pipe — two-way communication between two processes. 3) Value/Array — shared memory for simple types (must use Lock for safety). 4) Manager — proxy objects that can be shared (dict, list, Namespace). 5) shared_memory (3.8+) — direct memory sharing for large data. Queue is simplest for producer/consumer patterns. Pipe is fastest for two processes. Manager for complex shared state. Avoid shared memory unless performance-critical.",
      },
      {
        question: "What happens to shared state when you fork a process?",
        difficulty: "Hard",
        hint: "On Unix (fork): child process gets a COPY of parent's memory (copy-on-write). Changes in child don't affect parent and vice versa. On Windows/macOS (spawn): new Python interpreter starts fresh, module is re-imported. Implications: 1) Global variables are NOT shared — each process has its own copy. 2) Must use explicit IPC (Queue, Pipe, Value). 3) Arguments to Process must be picklable (serializable). 4) Lambdas, nested functions, and some objects can't be pickled. 5) if __name__ == '__main__' guard is required on Windows to prevent infinite process spawning. Use mp.set_start_method('spawn'/'fork'/'forkserver') to control behavior.",
      },
    ],
  },
  {
    id: "python-virtual-environments",
    title: "Virtual Environments",
    slug: "python-virtual-environments",
    icon: "Box",
    difficulty: "Advanced",
    description:
      "Isolate project dependencies with virtual environments — venv, pip, requirements.txt, and modern tools like poetry.",
    concept: {
      explanation:
        "Virtual environments create isolated Python installations for each project. python -m venv myenv creates one with its own Python binary and site-packages directory. Activating it (source myenv/bin/activate) modifies PATH to use the local Python/pip. Each project can have different package versions without conflicts. pip freeze > requirements.txt records dependencies; pip install -r requirements.txt reproduces them. Modern alternatives: poetry (dependency resolution + packaging), pipenv (Pipfile + virtualenv), conda (data science). Virtual environments are essential for reproducible builds and avoiding 'works on my machine' problems.",
      realLifeAnalogy:
        "Virtual environments are like separate workbenches in a workshop. Each workbench (venv) has its own set of tools (packages) at specific versions. Project A's workbench has screwdriver v2.0, Project B has v3.0 — no conflict. Without virtual environments, all projects share one messy workbench where upgrading a tool for one project might break another. requirements.txt is the parts list — anyone can set up an identical workbench from it.",
      keyPoints: [
        "python -m venv myenv creates a virtual environment",
        "source myenv/bin/activate (Unix) to activate",
        "pip install installs to the virtual env only",
        "pip freeze > requirements.txt records dependencies",
        "pip install -r requirements.txt reproduces env",
        "deactivate returns to system Python",
        ".gitignore should include the venv directory",
        "Modern tools: poetry, pipenv, conda, uv",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Virtual Environments =====
import sys
import os

# 1. Check current environment
print("=== Current Environment ===")
print(f"Python: {sys.executable}")
print(f"Version: {sys.version.split()[0]}")
print(f"Prefix: {sys.prefix[-40:]}")

# Is this a virtual environment?
in_venv = sys.prefix != sys.base_prefix
print(f"In virtual env: {in_venv}")

# 2. How to create and use venv (shell commands)
print("\\n=== Creating Virtual Environments ===")
commands = [
    ("Create venv", "python -m venv myproject_env"),
    ("Activate (Linux/Mac)", "source myproject_env/bin/activate"),
    ("Activate (Windows)", "myproject_env\\\\Scripts\\\\activate"),
    ("Deactivate", "deactivate"),
    ("Delete", "rm -rf myproject_env"),
]
for desc, cmd in commands:
    print(f"  {desc:25s} {cmd}")

# 3. Package management
print("\\n=== Package Management ===")
pip_commands = [
    ("Install package", "pip install requests"),
    ("Install specific ver", "pip install requests==2.31.0"),
    ("Install from file", "pip install -r requirements.txt"),
    ("Freeze deps", "pip freeze > requirements.txt"),
    ("List installed", "pip list"),
    ("Show package info", "pip show requests"),
    ("Upgrade package", "pip install --upgrade requests"),
    ("Uninstall", "pip uninstall requests"),
]
for desc, cmd in pip_commands:
    print(f"  {desc:20s} {cmd}")

# 4. requirements.txt format
print("\\n=== requirements.txt Format ===")
req_example = \"\"\"# Pinned versions (recommended)
requests==2.31.0
flask==3.0.0
sqlalchemy==2.0.23

# Version ranges
numpy>=1.24,<2.0
pandas~=2.1.0

# From git
# git+https://github.com/user/repo.git@main\"\"\"
for line in req_example.strip().split("\\n"):
    print(f"  {line}")

# 5. Modern tools comparison
print("\\n=== Modern Tools ===")
tools = {
    "venv + pip": "Built-in, simple, manual management",
    "poetry": "Dependency resolver, lock file, packaging",
    "pipenv": "Pipfile, auto-creates virtualenv",
    "conda": "Data science, non-Python deps, environments",
    "uv": "Fast Rust-based pip/venv replacement",
}
for tool, desc in tools.items():
    print(f"  {tool:15s} {desc}")

# 6. sys.path in virtual environments
print(f"\\n=== Module Search Paths ===")
for i, path in enumerate(sys.path[:5]):
    tag = " (venv)" if "site-packages" in path else ""
    print(f"  {i}: {path[-50:]}{tag}")

# 7. Best practices
print("\\n=== Best Practices ===")
practices = [
    "Always use virtual environments per project",
    "Add venv/ to .gitignore",
    "Pin exact versions in requirements.txt",
    "Use separate dev/prod requirements",
    "Document Python version in README",
]
for i, p in enumerate(practices, 1):
    print(f"  {i}. {p}")
`,
    },
    interviewQuestions: [
      {
        question: "Why are virtual environments important?",
        difficulty: "Easy",
        hint: "Virtual environments solve dependency conflicts. Without them: Project A needs Django 3.2, Project B needs Django 4.1 — they can't coexist in system Python. With venvs: each project has isolated packages. Benefits: 1) No version conflicts between projects. 2) No sudo/admin needed to install. 3) Reproducible builds via requirements.txt. 4) Clean testing environments. 5) Easy to delete and recreate. Always use a venv for every project. Never install project packages globally (except tools like pip, black, mypy).",
      },
      {
        question: "Compare venv, virtualenv, poetry, and conda.",
        difficulty: "Medium",
        hint: "venv: built into Python 3.3+, creates basic virtual environments. virtualenv: third-party, faster, more features (supports Python 2). poetry: modern dependency management + packaging + lock file (poetry.lock ensures reproducible installs), auto-creates venvs. conda: language-agnostic (C, R, Python), manages non-Python dependencies, great for data science (numpy, scipy with C binaries). pipenv: combines pip + virtualenv with Pipfile. uv: Rust-based, extremely fast pip replacement. For most Python projects: poetry or pip+venv. For data science: conda. For speed: uv.",
      },
      {
        question: "How do you manage different dependency sets (dev, test, prod)?",
        difficulty: "Hard",
        hint: "With pip: separate files: requirements.txt (prod), requirements-dev.txt (dev extras like pytest, black), requirements-test.txt. Use -r for composition: '-r requirements.txt\\npytest==7.4' in requirements-dev.txt. With poetry: [tool.poetry.group.dev.dependencies] and [tool.poetry.group.test.dependencies]. Install groups: poetry install --with dev,test. With setup.cfg/pyproject.toml: extras_require = {'dev': ['pytest'], 'docs': ['sphinx']}. Install extras: pip install -e '.[dev]'. Best practices: pin all versions, use lock files, separate CI/CD requirements, use dependabot/renovate for updates.",
      },
    ],
  },
  {
    id: "python-performance-tips",
    title: "Python Performance Tips",
    slug: "python-performance-tips",
    icon: "TrendingUp",
    difficulty: "Advanced",
    description:
      "Optimize Python code — profiling, data structure choices, caching, comprehensions, and avoiding common performance pitfalls.",
    concept: {
      explanation:
        "Python performance optimization starts with measuring: use timeit for micro-benchmarks, cProfile for profiling, and line_profiler for line-by-line analysis. Key strategies: choose the right data structure (set for membership, deque for queues), use built-in functions (sum, map, any) over loops, prefer comprehensions over loops, leverage caching (functools.lru_cache), avoid string concatenation in loops (use join), minimize global variable lookups, use generators for large data. For critical paths: numpy for numeric arrays, C extensions, or Cython. Remember: premature optimization is the root of all evil — profile first, optimize bottlenecks.",
      realLifeAnalogy:
        "Optimizing Python is like optimizing a kitchen workflow. First, find the bottleneck — is it chopping (CPU), waiting for the oven (I/O), or running out of counter space (memory)? Use the right tools: a food processor (built-in function) instead of a knife (manual loop). Batch similar tasks (comprehensions). Prep ingredients in advance (caching). Don't optimize stirring technique when the oven is the bottleneck — profile first, then fix the slowest part.",
      keyPoints: [
        "Profile first: timeit, cProfile, line_profiler",
        "Use sets for O(1) membership testing, not lists",
        "List comprehensions are faster than for loops",
        "functools.lru_cache for expensive repeated calls",
        "''.join(list) instead of string concatenation",
        "Built-in functions (sum, map, any) are C-optimized",
        "Generators for memory-efficient large data",
        "Avoid premature optimization — measure first",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# ===== Python Performance Tips =====
import time
import sys
from functools import lru_cache

def benchmark(name, func, *args, runs=100):
    start = time.perf_counter()
    for _ in range(runs):
        result = func(*args)
    elapsed = (time.perf_counter() - start) / runs
    print(f"  {name:30s} {elapsed*1000:.3f}ms")
    return result

# 1. List vs Set for membership testing
print("=== Membership Testing ===")
data_list = list(range(10000))
data_set = set(range(10000))

benchmark("list (in)",  lambda: 9999 in data_list, runs=1000)
benchmark("set  (in)",  lambda: 9999 in data_set, runs=1000)

# 2. List comprehension vs loop
print("\\n=== Comprehension vs Loop ===")

def with_loop():
    result = []
    for i in range(1000):
        result.append(i ** 2)
    return result

def with_comp():
    return [i ** 2 for i in range(1000)]

benchmark("for loop + append", with_loop)
benchmark("list comprehension", with_comp)

# 3. String concatenation
print("\\n=== String Building ===")

def concat_plus():
    s = ""
    for i in range(1000):
        s += str(i)
    return s

def concat_join():
    return "".join(str(i) for i in range(1000))

benchmark("string += (bad)", concat_plus)
benchmark("''.join()  (good)", concat_join)

# 4. Caching with lru_cache
print("\\n=== Caching ===")

def fib_slow(n):
    if n < 2:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)

@lru_cache(maxsize=None)
def fib_cached(n):
    if n < 2:
        return n
    return fib_cached(n - 1) + fib_cached(n - 2)

benchmark("fib(25) no cache",  fib_slow, 25, runs=10)
benchmark("fib(25) lru_cache", fib_cached, 25, runs=10)

# 5. Built-in functions vs manual
print("\\n=== Built-in vs Manual ===")
nums = list(range(10000))

def manual_sum():
    total = 0
    for n in nums:
        total += n
    return total

benchmark("manual sum loop", manual_sum)
benchmark("built-in sum()",  lambda: sum(nums))

# 6. Dictionary operations
print("\\n=== Dict Tips ===")
data = {"a": 1, "b": 2, "c": 3}

benchmark("dict.get(k, default)", lambda: data.get("z", 0), runs=10000)

# 7. Memory comparison
print("\\n=== Memory Usage ===")
list_data = [i for i in range(10000)]
gen_data = (i for i in range(10000))
set_data = set(range(10000))

print(f"  list(10000): {sys.getsizeof(list_data):>8} bytes")
print(f"  generator:   {sys.getsizeof(gen_data):>8} bytes")
print(f"  set(10000):  {sys.getsizeof(set_data):>8} bytes")

# 8. Quick tips summary
print("\\n=== Quick Tips ===")
tips = [
    "Use sets for membership: O(1) vs O(n) for lists",
    "List comprehensions > for loops with append",
    "''.join() > string concatenation in loops",
    "@lru_cache for expensive repeated computations",
    "Use generators for large data pipelines",
    "Built-in sum/min/max/any/all are C-optimized",
    "Local variables are faster than globals",
    "Profile with cProfile before optimizing",
]
for i, tip in enumerate(tips, 1):
    print(f"  {i}. {tip}")
`,
    },
    interviewQuestions: [
      {
        question: "Why are list comprehensions faster than for loops?",
        difficulty: "Easy",
        hint: "List comprehensions are optimized at the bytecode level. The loop and append happen in C code internally, avoiding Python-level function call overhead for .append(). A for loop: each iteration calls list.append() — a Python method call with attribute lookup, function call overhead. Comprehension: uses LIST_APPEND bytecode instruction — direct C-level operation. Typically 20-30% faster. Also more readable and Pythonic. Same applies to dict/set comprehensions and generator expressions.",
      },
      {
        question: "How do you profile Python code to find bottlenecks?",
        difficulty: "Medium",
        hint: "1) timeit — micro-benchmark specific expressions: python -m timeit 'sum(range(1000))'. 2) cProfile — function-level profiling: python -m cProfile script.py. Shows cumulative time, call count per function. 3) line_profiler — line-by-line timing with @profile decorator: kernprof -l -v script.py. 4) memory_profiler — memory usage per line. 5) py-spy — sampling profiler for production (no code changes). 6) snakeviz — visual cProfile viewer. Workflow: cProfile to find slow functions → line_profiler on those functions → optimize → re-profile. Always profile before optimizing!",
      },
      {
        question: "What are the most impactful Python performance optimizations?",
        difficulty: "Hard",
        hint: "Highest impact: 1) Right data structure — set/dict for lookups (O(1) vs O(n) list). 2) Algorithm improvement — O(n log n) vs O(n²) matters more than micro-optimization. 3) Caching — @lru_cache for expensive repeated calls, avoid recomputation. 4) C extensions — numpy for numeric arrays (100x faster than Python loops), built-in functions. 5) Avoid unnecessary work — lazy evaluation, generators, early returns. 6) String interning — join() for concatenation. 7) Local over global variables (faster bytecode). 8) concurrent.futures for I/O parallelism. 9) For true CPU parallelism: multiprocessing, Cython, or PyPy. The biggest gains come from algorithmic changes, not micro-optimizations.",
      },
    ],
  },

  // ─── Practice Problems ──────────────────────────────────────────────────────
  {
    id: "python-practice-sum-average",
    title: "Sum and Average of Three Numbers",
    slug: "python-practice-sum-average",
    icon: "Calculator",
    difficulty: "Beginner",
    description:
      "Ask the user for three numbers, then calculate and print their total and average.",
    concept: {
      explanation:
        "This problem introduces variables, user input via input(), type conversion with float(), and arithmetic operations. You store each user-entered value in its own variable, compute the sum, divide by 3 to get the average, and display both results.",
      realLifeAnalogy:
        "Think of a teacher recording three test scores for a student. She adds them up to get the total marks, then divides by 3 to find the average grade — exactly what this program does.",
      keyPoints: [
        "Use input() three times to read each number separately.",
        "Convert each input to a number using float() so you can do arithmetic.",
        "total = num1 + num2 + num3 sums all three values.",
        "average = total / 3 divides the sum by the count.",
        "print() displays both results to the user.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 1: Sum and Average of Three Numbers

num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))
num3 = float(input("Enter third number: "))

total = num1 + num2 + num3
average = total / 3

print("Total:", total)
print("Average:", average)
`,
    },
    interviewQuestions: [
      {
        question: "Why do we use float() instead of int() for user input?",
        difficulty: "Easy",
        hint: "Think about what happens when the user types a decimal number like 4.5.",
      },
      {
        question:
          "How would you modify the program to handle any number of inputs, not just three?",
        difficulty: "Medium",
        hint: "Consider using a loop and keeping a running total.",
      },
      {
        question:
          "What will happen if the user enters a non-numeric value like 'abc'?",
        difficulty: "Easy",
        hint: "Python raises a ValueError. You can guard against it with try/except.",
      },
    ],
  },
  {
    id: "python-practice-for-loop-sequence",
    title: "Print Number Sequence with For Loop",
    slug: "python-practice-for-loop-sequence",
    icon: "List",
    difficulty: "Beginner",
    description:
      "Use a for loop with range() to print the sequence 8, 11, 14, 17, … up to 89.",
    concept: {
      explanation:
        "Python's range(start, stop, step) generates a sequence of numbers starting at start, incrementing by step, and stopping before stop. Here start=8, stop=90 (exclusive), step=3 produces 8, 11, 14, …, 89. The for loop iterates over every value that range() yields.",
      realLifeAnalogy:
        "Imagine a bus that starts at stop 8 and picks up passengers every 3 stops: stop 8, 11, 14, … until it reaches the last stop at 89. The range() function is your timetable, and the for loop is the bus moving from stop to stop.",
      keyPoints: [
        "range(start, stop, step) — start is inclusive, stop is exclusive.",
        "To include 89, set stop=90 (one past the last value you want).",
        "step=3 means each iteration adds 3 to the current value.",
        "The loop variable (e.g., i) holds the current number on each iteration.",
        "print(i, end=' ') keeps all numbers on one line (optional style choice).",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 2: Print 8, 11, 14, ..., 89

for i in range(8, 90, 3):
    print(i)
`,
    },
    interviewQuestions: [
      {
        question:
          "What is the third argument to range() called, and what does it control?",
        difficulty: "Easy",
        hint: "It controls how much the value grows on each step of the loop.",
      },
      {
        question:
          "Why is the stop value 90 instead of 89 in range(8, 90, 3)?",
        difficulty: "Easy",
        hint: "range() stops before it reaches the stop value — it is exclusive.",
      },
      {
        question:
          "How would you print the same sequence in reverse (89, 86, …, 8)?",
        difficulty: "Medium",
        hint: "Use range(89, 7, -3) — a negative step goes backwards.",
      },
    ],
  },
  {
    id: "python-practice-negative-numbers",
    title: "Negative Numbers with Interval of 2",
    slug: "python-practice-negative-numbers",
    icon: "Minus",
    difficulty: "Beginner",
    description:
      "Use a for loop to print negative numbers with an interval of 2 (e.g., -2, -4, -6, …).",
    concept: {
      explanation:
        "By combining a negative start with a negative step, range() counts downward. range(-2, -21, -2) starts at -2, moves by -2 each time, and stops before -20, producing -2, -4, -6, …, -20. This demonstrates that range() works equally well with negative numbers.",
      realLifeAnalogy:
        "Picture a thermometer dropping from -2°C. Every hour the temperature falls by another 2 degrees: -2, -4, -6, and so on. The for loop 'reads' the thermometer at each hourly snapshot.",
      keyPoints: [
        "A negative step makes range() count downward.",
        "range(-2, -21, -2): start=-2, stop=-21 (exclusive), step=-2.",
        "The stop value must be lower than the start when the step is negative.",
        "You can choose any range: range(0, -11, -2) gives 0, -2, -4, …, -10.",
        "Each loop iteration, the variable decreases by the absolute value of step.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 3: Negative numbers with interval of 2

for i in range(-2, -21, -2):
    print(i)
`,
    },
    interviewQuestions: [
      {
        question:
          "What happens if you accidentally write range(-2, -20, 2) with a positive step?",
        difficulty: "Easy",
        hint: "When start is less than stop but step is positive, range() produces an empty sequence.",
      },
      {
        question: "How would you print 0, -2, -4, …, -20 starting from zero?",
        difficulty: "Easy",
        hint: "Change the start to 0: range(0, -21, -2).",
      },
      {
        question:
          "How can you collect all these negative numbers into a list instead of just printing them?",
        difficulty: "Medium",
        hint: "Use list(range(-2, -21, -2)) or a list comprehension.",
      },
    ],
  },
  {
    id: "python-practice-print-name",
    title: "Print Name N Times",
    slug: "python-practice-print-name",
    icon: "Repeat",
    difficulty: "Beginner",
    description:
      "Ask the user for their name and how many times to print it, then print the name that many times.",
    concept: {
      explanation:
        "This problem combines input(), int() conversion, and a for loop with range(). The user provides a name (string) and a count (integer). range(count) generates count iterations, and inside the loop you print the name each time.",
      realLifeAnalogy:
        "Like a coach calling a player's name to keep them motivated: 'Alex! Alex! Alex!' — the coach decides how many times to call, and the loop does the repeating.",
      keyPoints: [
        "Read the name as a plain string — no conversion needed.",
        "Read the count with int(input(...)) because range() requires an integer.",
        "range(n) produces n iterations: 0, 1, 2, …, n-1.",
        "The loop variable can be named _ when you don't need its value.",
        "Each pass through the loop calls print(name) once.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 4: Print name N times

name = input("Enter your name: ")
times = int(input("How many times to print? "))

for _ in range(times):
    print(name)
`,
    },
    interviewQuestions: [
      {
        question: "Why do we use int() to convert the 'times' input?",
        difficulty: "Easy",
        hint: "range() only accepts integers; passing a string would raise a TypeError.",
      },
      {
        question:
          "What does the underscore _ as a loop variable signify in Python?",
        difficulty: "Easy",
        hint: "It is a convention meaning 'I don't need this variable's value inside the loop.'",
      },
      {
        question:
          "How would you print the name along with its iteration number (e.g., '1. Alice')?",
        difficulty: "Medium",
        hint: "Use enumerate() or replace _ with i and print with f'{i+1}. {name}'.",
      },
    ],
  },
  {
    id: "python-practice-even-odd",
    title: "Even and Odd Number Checker",
    slug: "python-practice-even-odd",
    icon: "SplitSquareHorizontal",
    difficulty: "Beginner",
    description:
      "Ask the user for a number and use if/else to identify whether it is even or odd.",
    concept: {
      explanation:
        "The modulo operator % returns the remainder of a division. Any integer divided by 2 has a remainder of either 0 (even) or 1 (odd). An if/else statement branches to the correct message based on that remainder, demonstrating the fundamental conditional structure in Python.",
      realLifeAnalogy:
        "Think of distributing items into two bins: every time you pick an item, you put the first in bin A, the second in bin B, the third back in A, and so on. Items that go into bin A are at even positions; items in bin B are at odd positions.",
      keyPoints: [
        "number % 2 computes the remainder when dividing by 2.",
        "If the remainder is 0, the number is even; otherwise it is odd.",
        "if number % 2 == 0: is the condition to test for evenness.",
        "else: handles all remaining cases (the odd branch).",
        "Convert the input to int() so arithmetic works correctly.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 5: Even and Odd Number Checker

number = int(input("Enter a number: "))

if number % 2 == 0:
    print(number, "is Even")
else:
    print(number, "is Odd")
`,
    },
    interviewQuestions: [
      {
        question: "What does the % (modulo) operator do?",
        difficulty: "Easy",
        hint: "It returns the remainder after dividing the left number by the right number.",
      },
      {
        question: "How would you check if a number is divisible by 3 instead of 2?",
        difficulty: "Easy",
        hint: "Change the condition to number % 3 == 0.",
      },
      {
        question:
          "How would you extend this program to classify numbers as positive-even, positive-odd, negative-even, or negative-odd?",
        difficulty: "Medium",
        hint: "Combine the % 2 check with number > 0 and number < 0 using nested if/elif/else.",
      },
    ],
  },
  {
    id: "python-practice-converging-triangle",
    title: "Converging Triangle Pattern",
    slug: "python-practice-converging-triangle",
    icon: "Triangle",
    difficulty: "Beginner",
    description:
      "Use a for loop to print two # symbols per row that converge toward each other as rows increase.",
    concept: {
      explanation:
        "This pattern uses string multiplication and arithmetic to position two # characters on each row. As the row index i increases, the left indent grows by 1 space and the inner gap shrinks by 2 spaces. The result is two columns of # that start apart and move closer together.",
      realLifeAnalogy:
        "Imagine two people walking toward each other from opposite ends of a hallway. With each step (row), they get closer together — until they nearly meet at the bottom.",
      keyPoints: [
        "' ' * i creates i leading spaces (the left indent).",
        "' ' * (2 * (h - i - 1)) creates the inner gap between the two #.",
        "As i increases the left indent grows and the inner gap shrinks.",
        "On the last row (i = h - 1) the gap is 0, so the two # are adjacent.",
        "String concatenation builds each row: indent + '#' + gap + '#'.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 6: Converging Triangle

h = int(input("Enter height: "))

for i in range(h):
    print(" " * i + "#" + " " * (2 * (h - i - 1)) + "#")
`,
    },
    interviewQuestions: [
      {
        question: "What happens to the inner gap as i increases in the loop?",
        difficulty: "Easy",
        hint: "The expression 2*(h-i-1) decreases by 2 on each iteration.",
      },
      {
        question: "How would you make the two lines diverge (open upward) instead of converge?",
        difficulty: "Medium",
        hint: "Reverse the formula: indent = h-1-i and gap = 2*i.",
      },
      {
        question: "How would you print only a single # on the last row when the gap becomes 0?",
        difficulty: "Medium",
        hint: "Add an if/else: if i == h-1: print one #, else print two with gap.",
      },
    ],
  },
  {
    id: "python-practice-centered-triangle",
    title: "Centered Triangle (Pyramid)",
    slug: "python-practice-centered-triangle",
    icon: "Triangle",
    difficulty: "Beginner",
    description:
      "Use a for loop to print a centered pyramid of * characters that grows wider from top to bottom.",
    concept: {
      explanation:
        "Each row i (0-indexed) has 2*i+1 stars and (h-1-i) leading spaces. The leading spaces center the odd number of stars. Row 0 has 1 star with the most spaces; the last row has 2*h-1 stars with no spaces.",
      realLifeAnalogy:
        "Think of stacking layers of a wedding cake: each layer is wider than the one above, but they're all centered on the same axis.",
      keyPoints: [
        "Row i has 2*i+1 stars — always an odd number.",
        "Leading spaces = h - 1 - i, which decreases by 1 each row.",
        "The combination keeps everything centered.",
        "range(h) iterates h times, producing h rows.",
        "String multiplication ' ' * n and '*' * n build each row efficiently.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 7: Centered Pyramid

h = int(input("Enter height: "))

for i in range(h):
    print(" " * (h - 1 - i) + "*" * (2 * i + 1))
`,
    },
    interviewQuestions: [
      {
        question: "Why does the number of stars on each row always be odd?",
        difficulty: "Easy",
        hint: "2*i+1 is always odd because 2*i is even and adding 1 makes it odd.",
      },
      {
        question: "How would you print the pyramid upside-down?",
        difficulty: "Easy",
        hint: "Iterate with range(h-1, -1, -1) to go from h-1 down to 0.",
      },
      {
        question: "How would you add a hollow center to the pyramid (only the border stars)?",
        difficulty: "Hard",
        hint: "On inner rows (not first or last), print one * + spaces + one * instead of a full row.",
      },
    ],
  },
  {
    id: "python-practice-left-triangle",
    title: "Left-Aligned Triangle",
    slug: "python-practice-left-triangle",
    icon: "Triangle",
    difficulty: "Beginner",
    description:
      "Use a for loop to print a left-aligned triangle of * characters that widens from top to bottom.",
    concept: {
      explanation:
        "The simplest triangle pattern. Row i (0-indexed) prints 2*i+1 stars with no leading spaces. Row 0 has 1 star, row 1 has 3, and so on. Each row always starts at the leftmost column.",
      realLifeAnalogy:
        "Like stacking bricks on the floor, each layer wider than the last but all pushed against the left wall.",
      keyPoints: [
        "No leading spaces — the triangle is flush left.",
        "Row i prints 2*i+1 stars.",
        "The first row (i=0) prints 1 star: 2*0+1 = 1.",
        "The last row (i=h-1) prints 2*(h-1)+1 = 2h-1 stars.",
        "This is the simplest version of the triangle pattern.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 8: Left-Aligned Triangle

h = int(input("Enter height: "))

for i in range(h):
    print("*" * (2 * i + 1))
`,
    },
    interviewQuestions: [
      {
        question: "How many stars does the last row have for a height-4 triangle?",
        difficulty: "Easy",
        hint: "Plug i=3 into 2*i+1: 2*3+1 = 7.",
      },
      {
        question: "How would you print just stars with no formula — using nested loops instead?",
        difficulty: "Medium",
        hint: "Use an outer loop for rows and an inner loop that runs 2*i+1 times, printing '*' without newline each time, then print() for the newline.",
      },
      {
        question: "How would you print the same triangle with only the border stars (hollow)?",
        difficulty: "Hard",
        hint: "On the first and last row print all stars; on middle rows print one star, then spaces, then one star.",
      },
    ],
  },
  {
    id: "python-practice-right-triangle",
    title: "Right-Aligned Triangle",
    slug: "python-practice-right-triangle",
    icon: "Triangle",
    difficulty: "Beginner",
    description:
      "Use a for loop to print a right-aligned triangle of * characters that widens toward the left.",
    concept: {
      explanation:
        "Similar to the centered pyramid, but the stars are right-aligned instead of centered. Row i has 2*i+1 stars and (h-1-i)*2 leading spaces. The last row fills the full width with no spaces.",
      realLifeAnalogy:
        "Like a staircase going down on the right side — each new step extends further to the left while the right edge stays fixed.",
      keyPoints: [
        "Leading spaces = (h - 1 - i) * 2, shrinking by 2 each row.",
        "Stars = 2*i+1, growing by 2 each row.",
        "The right edge of all rows aligns because spaces + stars = constant.",
        "Total width of each row = (h-1-i)*2 + (2*i+1) = 2h-1 characters.",
        "The last row has 0 spaces and 2*h-1 stars.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 9: Right-Aligned Triangle

h = int(input("Enter height: "))

for i in range(h):
    print(" " * ((h - 1 - i) * 2) + "*" * (2 * i + 1))
`,
    },
    interviewQuestions: [
      {
        question: "Why does the total row width stay the same for every row?",
        difficulty: "Medium",
        hint: "spaces + stars = (h-1-i)*2 + (2*i+1) = 2h-2-2i + 2i+1 = 2h-1, which is constant.",
      },
      {
        question: "What is the difference between this pattern and the centered pyramid (Problem 7)?",
        difficulty: "Easy",
        hint: "The centered pyramid uses (h-1-i) spaces; this one uses (h-1-i)*2 spaces — twice as many.",
      },
      {
        question: "How would you combine this with Problem 7 to create a diamond shape?",
        difficulty: "Hard",
        hint: "Print the pyramid (problems 7) then an inverted version: iterate range(h-2, -1, -1).",
      },
    ],
  },
  {
    id: "python-practice-inverted-triangle",
    title: "Inverted Triangle Pattern",
    slug: "python-practice-inverted-triangle",
    icon: "Triangle",
    difficulty: "Beginner",
    description:
      "Use a for loop to print an inverted triangle of * characters — wide at the top, narrowing to a point.",
    concept: {
      explanation:
        "This is the reverse of the left-aligned triangle. Row i (0-indexed) has i leading spaces and 2*(h-i)-1 stars. Row 0 starts with the most stars and no spaces; the last row has 1 star with the most spaces.",
      realLifeAnalogy:
        "Like melting ice — starts wide at the top and tapers to a single drip at the bottom.",
      keyPoints: [
        "Leading spaces = i (increases by 1 each row).",
        "Stars = 2*(h-i)-1 (decreases by 2 each row).",
        "Row 0: 0 spaces and 2*h-1 stars (widest).",
        "Last row (i=h-1): h-1 spaces and 1 star (narrowest).",
        "Total width of row 0 sets the visual width: 2*h-1 characters.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 10: Inverted Triangle

h = int(input("Enter height: "))

for i in range(h):
    print(" " * i + "*" * (2 * (h - i) - 1))
`,
    },
    interviewQuestions: [
      {
        question: "How many stars are on the very last row?",
        difficulty: "Easy",
        hint: "Plug i=h-1: 2*(h-(h-1))-1 = 2*1-1 = 1.",
      },
      {
        question: "How would you combine Problems 8 and 10 to make a full diamond?",
        difficulty: "Medium",
        hint: "Print the left-aligned triangle (Problem 8), then start Problem 10 from row 1 (i=1) to skip the duplicate middle row.",
      },
      {
        question: "How would you center the inverted triangle (so it looks like an upside-down centered pyramid)?",
        difficulty: "Medium",
        hint: "Change leading spaces from i to (h-1-i)... wait, that reverses it. Actually use range(h-1, -1, -1) on Problem 7.",
      },
    ],
  },

  // ─── Problems 11-20 ─────────────────────────────────────────────────────────
  {
    id: "python-practice-list-properties",
    title: "List Properties",
    slug: "python-practice-list-properties",
    icon: "List",
    difficulty: "Beginner",
    description: "Write a program to check whether lists can be ordered, indexed, mutable and nested.",
    concept: {
      explanation:
        "Python lists have four key properties. Ordered means insertion order is preserved — the sequence you add items is the sequence you get them back. Indexed means each item can be accessed by a numeric position (0-based). Mutable means you can change, add, or remove items after creation. Nested means a list can contain other lists (or any object) as elements.",
      realLifeAnalogy:
        "Think of a list as a numbered shopping cart. The items stay in the order you added them (ordered), you can pick item #3 directly (indexed), you can swap or remove any item (mutable), and you can put a whole bag of items as a single entry (nested).",
      keyPoints: [
        "Ordered: print([3,1,2]) always outputs [3,1,2] — order is maintained.",
        "Indexed: my_list[0] gives the first element; negative indices count from the end.",
        "Mutable: my_list[0] = 99 and my_list.append(5) both modify the list in place.",
        "Nested: [[1,2],[3,4]] is valid; access inner items with my_list[0][1].",
        "Lists are created with square brackets [] or list().",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 11: List Properties

my_list = [10, 20, 30, 40, 50]

# 1. Ordered – insertion order is preserved
print("1. ORDERED")
print("Original:", my_list)

# 2. Indexed – access by position
print("\\n2. INDEXED")
print("First element  (index 0):", my_list[0])
print("Last element   (index -1):", my_list[-1])
print("Third element  (index 2):", my_list[2])

# 3. Mutable – can change elements
print("\\n3. MUTABLE")
my_list[0] = 99
my_list.append(60)
my_list.remove(30)
print("After changes:", my_list)

# 4. Nested – can contain other lists
print("\\n4. NESTED")
nested = [1, [2, 3], [4, [5, 6]]]
print("Nested list:", nested)
print("Access nested [1][0]:", nested[1][0])
print("Access deep   [2][1][0]:", nested[2][1][0])
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between a list and a tuple in Python?",
        difficulty: "Easy",
        hint: "Tuples use () and are immutable; lists use [] and are mutable.",
      },
      {
        question: "How can you check if a list is ordered in Python?",
        difficulty: "Easy",
        hint: "Lists always maintain insertion order — you can verify by printing the list after creation.",
      },
      {
        question: "What happens when you do my_list[10] on a list with only 5 elements?",
        difficulty: "Medium",
        hint: "Python raises an IndexError. Always check len(my_list) before accessing by index.",
      },
    ],
  },
  {
    id: "python-practice-dict-properties",
    title: "Dictionary Properties",
    slug: "python-practice-dict-properties",
    icon: "BookOpen",
    difficulty: "Beginner",
    description: "Write a program to check whether dictionaries can be ordered, indexed, mutable and nested.",
    concept: {
      explanation:
        "Python dictionaries (since 3.7) maintain insertion order. They are NOT accessed by numeric index but by keys. They are mutable — key-value pairs can be added, changed, or deleted. They support nesting — values can themselves be dictionaries or lists.",
      realLifeAnalogy:
        "A dictionary is like a contact book: entries stay in the order you added them (ordered), you look people up by name not by page number (keyed, not indexed), you can add/edit/delete contacts (mutable), and each contact can have a nested 'addresses' list (nested).",
      keyPoints: [
        "Ordered (Python 3.7+): insertion order is preserved.",
        "NOT indexed by position — accessed by key: my_dict['name'].",
        "Mutable: my_dict['age'] = 30 and del my_dict['key'] both work.",
        "Nested: values can be any type including dicts, lists, or other objects.",
        "Keys must be immutable (strings, numbers, tuples); values can be anything.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 12: Dictionary Properties

my_dict = {"name": "Alice", "age": 25, "city": "NYC"}

# 1. Ordered (Python 3.7+)
print("1. ORDERED")
print("Dict:", my_dict)
print("Keys in order:", list(my_dict.keys()))

# 2. NOT indexed by position – accessed by KEY
print("\\n2. KEYED (not positional index)")
print("Name:", my_dict["name"])
print("Age:", my_dict["age"])
# my_dict[0]  # This would raise a KeyError!

# 3. Mutable
print("\\n3. MUTABLE")
my_dict["age"] = 26
my_dict["email"] = "alice@example.com"
del my_dict["city"]
print("After changes:", my_dict)

# 4. Nested
print("\\n4. NESTED")
nested = {
    "student": {
        "name": "Bob",
        "grades": [90, 85, 92],
        "address": {"city": "LA", "zip": "90001"}
    }
}
print("Nested dict:", nested)
print("Name:", nested["student"]["name"])
print("First grade:", nested["student"]["grades"][0])
print("City:", nested["student"]["address"]["city"])
`,
    },
    interviewQuestions: [
      {
        question: "Can you access a dictionary value by its numeric position like dict[0]?",
        difficulty: "Easy",
        hint: "No — dicts are keyed. dict[0] works only if 0 is an actual key. Use list(dict.values())[0] for positional access.",
      },
      {
        question: "What is the difference between dict.get('key') and dict['key']?",
        difficulty: "Medium",
        hint: "dict['key'] raises KeyError if the key doesn't exist; dict.get('key') returns None (or a default you specify).",
      },
      {
        question: "Are dictionary keys ordered in Python 2?",
        difficulty: "Medium",
        hint: "No — ordering was only guaranteed from Python 3.7 onward. Before that, use collections.OrderedDict.",
      },
    ],
  },
  {
    id: "python-practice-vowel-checker",
    title: "Vowel Checker",
    slug: "python-practice-vowel-checker",
    icon: "Search",
    difficulty: "Beginner",
    description: "Ask the user to enter a word and print whether that word contains any vowels.",
    concept: {
      explanation:
        "Iterate over each character in the input word and check if it is in the vowels string 'aeiouAEIOU'. Collect all matching characters. If any are found, print them; otherwise report no vowels.",
      realLifeAnalogy:
        "Like scanning a word letter by letter with a highlighter — whenever you hit a, e, i, o, or u you mark it. At the end you report how many marks you made.",
      keyPoints: [
        "The in operator checks membership: 'a' in 'aeiou' returns True.",
        "Iterating over a string gives each character one by one.",
        "Collect found vowels in a list, then use set() to remove duplicates.",
        "Handle both uppercase and lowercase by including both in the vowels string.",
        "A single if/else at the end decides which message to print.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 13: Vowel Checker

word = input("Enter a word: ")
vowels = "aeiouAEIOU"
found = []

for char in word:
    if char in vowels:
        found.append(char)

if found:
    unique = list(dict.fromkeys(found))   # preserve order, remove duplicates
    print(f"'{word}' contains vowels: {', '.join(unique)}")
    print(f"Total vowel count: {len(found)}")
else:
    print(f"'{word}' contains no vowels.")
`,
    },
    interviewQuestions: [
      {
        question: "How would you count the exact number of vowels (including duplicates)?",
        difficulty: "Easy",
        hint: "Use len(found) after collecting all vowels (without deduplication).",
      },
      {
        question: "How would you rewrite this using a list comprehension?",
        difficulty: "Medium",
        hint: "found = [c for c in word if c in 'aeiouAEIOU']",
      },
      {
        question: "How would you check for vowels without being case-sensitive?",
        difficulty: "Easy",
        hint: "Convert the word to lowercase first: word.lower(), then check against 'aeiou'.",
      },
    ],
  },
  {
    id: "python-practice-string-alternator",
    title: "Alternate Characters of Two Strings",
    slug: "python-practice-string-alternator",
    icon: "ArrowLeftRight",
    difficulty: "Beginner",
    description: "Enter two strings of equal length and interleave their characters (e.g. abcde + ABCDE → AaBbCcDdEe).",
    concept: {
      explanation:
        "First check that both strings have the same length; if not, print an error and stop. Otherwise, loop through each index i and append str2[i] then str1[i] to a result string. This creates the interleaved output.",
      realLifeAnalogy:
        "Like shuffling two decks of cards together — one card from deck A, one from deck B, alternating until both are merged into a single combined deck.",
      keyPoints: [
        "len(str1) != len(str2) checks for mismatched lengths.",
        "Loop with range(len(str1)) to visit each index.",
        "Concatenation order str2[i] + str1[i] places the second string first (as per the example).",
        "The result string starts empty and grows by 2 characters per iteration.",
        "You can also use a list and ''.join() for better performance on long strings.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 14: Alternate Characters of Two Strings

str1 = input("Enter first string:  ")
str2 = input("Enter second string: ")

if len(str1) != len(str2):
    print(f"Strings have different lengths ({len(str1)} vs {len(str2)}). Exiting.")
else:
    result = ""
    for i in range(len(str1)):
        result += str2[i] + str1[i]
    print("Alternated:", result)
`,
    },
    interviewQuestions: [
      {
        question: "How would you rewrite the alternation using zip()?",
        difficulty: "Medium",
        hint: "result = ''.join(b + a for a, b in zip(str1, str2))",
      },
      {
        question: "What if the strings are different lengths but you still want to interleave them?",
        difficulty: "Medium",
        hint: "Use zip_longest from itertools with a fillvalue='' to handle the leftover characters.",
      },
      {
        question: "How would you reverse the order so str1 comes first in each pair?",
        difficulty: "Easy",
        hint: "Change result += str2[i] + str1[i] to result += str1[i] + str2[i].",
      },
    ],
  },
  {
    id: "python-practice-american-comma",
    title: "American Comma Formatting",
    slug: "python-practice-american-comma",
    icon: "Hash",
    difficulty: "Beginner",
    description: "Ask the user for a large integer and format it with American-style commas (e.g. 1000000 → 1,000,000).",
    concept: {
      explanation:
        "American comma formatting groups digits into sets of 3 from the right: 1,000,000. Python's built-in f-string format specifier {:,} does this automatically. Alternatively you can manually reverse the string, insert commas every 3 digits, then reverse again.",
      realLifeAnalogy:
        "Like reading a price tag in a US store — every three digits from the right get separated by a comma so large numbers are easy to read at a glance.",
      keyPoints: [
        "f'{number:,}' is the simplest way to format with American commas.",
        "The comma format specifier works for both int and float.",
        "Manual approach: reverse digits, insert comma after every 3rd, reverse result.",
        "Always strip any existing commas from input before parsing: num_str.replace(',', '').",
        "Use try/except to handle non-numeric input gracefully.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 15: American Comma Formatting

num_str = input("Enter a large integer: ")
num_str = num_str.replace(",", "")   # strip existing commas

try:
    number = int(num_str)
    formatted = f"{number:,}"
    print("American format:", formatted)
except ValueError:
    print("Invalid number entered.")
`,
    },
    interviewQuestions: [
      {
        question: "What does the {:,} format specifier do in an f-string?",
        difficulty: "Easy",
        hint: "It inserts commas as thousands separators in the American convention.",
      },
      {
        question: "How would you format a float with 2 decimal places AND commas (e.g. 1,234,567.89)?",
        difficulty: "Medium",
        hint: "Use f'{number:,.2f}'.",
      },
      {
        question: "How would you implement American comma formatting manually without format specifiers?",
        difficulty: "Hard",
        hint: "Reverse the digit string, join chunks of 3 with commas, then reverse the result.",
      },
    ],
  },
  {
    id: "python-practice-indian-comma",
    title: "Indian Comma Formatting",
    slug: "python-practice-indian-comma",
    icon: "Hash",
    difficulty: "Intermediate",
    description: "Format a large integer with Indian-style commas (e.g. 1000000 → 10,00,000).",
    concept: {
      explanation:
        "Indian comma formatting groups the last 3 digits, then groups every 2 digits to the left: 10,00,000. There is no built-in Python formatter for this, so it must be implemented manually by slicing the digit string.",
      realLifeAnalogy:
        "Like reading prices in Indian newspapers — the last three digits form hundreds/thousands, then pairs of digits represent lakhs and crores.",
      keyPoints: [
        "Separate the last 3 digits: s[-3:].",
        "Then repeatedly take 2 digits from the right of the remaining string: s[-2:].",
        "Build the result from right to left, prepending each group with a comma.",
        "Handle negative numbers by checking n < 0 and prepending '-' at the end.",
        "10,00,000 = 10 lakhs; 1,00,00,000 = 1 crore.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 16: Indian Comma Formatting

def indian_format(n):
    s = str(abs(n))
    if len(s) <= 3:
        return ("-" if n < 0 else "") + s
    result = s[-3:]
    s = s[:-3]
    while s:
        result = s[-2:] + "," + result
        s = s[:-2]
    return ("-" if n < 0 else "") + result

num_str = input("Enter a large integer: ")
try:
    number = int(num_str.replace(",", ""))
    print("Indian format:", indian_format(number))
except ValueError:
    print("Invalid number entered.")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between American and Indian comma formats for 10 million?",
        difficulty: "Easy",
        hint: "American: 10,000,000 (groups of 3). Indian: 1,00,00,000 (last 3, then pairs).",
      },
      {
        question: "What is 1 crore in American notation?",
        difficulty: "Easy",
        hint: "1 crore = 10,000,000 (ten million in American notation).",
      },
      {
        question: "How would you extend the function to also handle decimal numbers?",
        difficulty: "Hard",
        hint: "Split on '.', format only the integer part with indian_format(), then re-join with the decimal portion.",
      },
    ],
  },
  {
    id: "python-practice-try-except",
    title: "Try / Except / Else / Finally",
    slug: "python-practice-try-except",
    icon: "ShieldAlert",
    difficulty: "Beginner",
    description: "Write a program to demonstrate try, except, else, and finally blocks in Python.",
    concept: {
      explanation:
        "Python exception handling uses four blocks: try (code that might fail), except (runs if an error occurs), else (runs only if no error occurred), finally (always runs regardless). This lets you handle errors gracefully without crashing.",
      realLifeAnalogy:
        "Like a bank transaction: try to process payment (try), if the card is declined handle the error (except), if payment succeeded send a receipt (else), and always print a transaction summary regardless (finally).",
      keyPoints: [
        "try: contains the risky code.",
        "except ExceptionType: catches specific errors — always be specific when possible.",
        "else: runs only when the try block succeeded with no exception.",
        "finally: always runs — use for cleanup (closing files, releasing resources).",
        "You can have multiple except blocks for different error types.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 17: Try / Except / Else / Finally

def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("  [except] Error: Cannot divide by zero!")
    except TypeError:
        print("  [except] Error: Both arguments must be numbers!")
    else:
        print(f"  [else]   {a} / {b} = {result}")
        return result
    finally:
        print("  [finally] Division attempt complete.")
        print()

print("Test 1: 10 / 2")
safe_divide(10, 2)

print("Test 2: 10 / 0")
safe_divide(10, 0)

print("Test 3: 'abc' / 2")
safe_divide("abc", 2)

print("Test 4: 7 / 3")
safe_divide(7, 3)
`,
    },
    interviewQuestions: [
      {
        question: "When does the else block run in a try/except structure?",
        difficulty: "Easy",
        hint: "The else block only runs when the try block completes without raising any exception.",
      },
      {
        question: "What is the difference between catching Exception and BaseException?",
        difficulty: "Medium",
        hint: "Exception catches most errors; BaseException also catches SystemExit and KeyboardInterrupt — usually avoid catching BaseException.",
      },
      {
        question: "Is it a good practice to use a bare except: (no exception type)?",
        difficulty: "Medium",
        hint: "No — bare except catches everything including SystemExit and KeyboardInterrupt, making it hard to stop the program. Always specify the exception type.",
      },
    ],
  },
  {
    id: "python-practice-pandas-excel",
    title: "Pandas: Load & Modify Data",
    slug: "python-practice-pandas-excel",
    icon: "Table",
    difficulty: "Intermediate",
    description: "Load a DataFrame (simulating Excel data), modify columns and rows, and perform simple operations using pandas.",
    concept: {
      explanation:
        "Pandas is Python's primary data analysis library. A DataFrame is a 2D table of rows and columns — like an Excel sheet. You can create, filter, add columns, compute statistics, and export data. In practice you load real Excel files with pd.read_excel(); here we create data in a dict and pass it to pd.DataFrame().",
      realLifeAnalogy:
        "Think of pandas as a super-powered spreadsheet inside Python. Instead of clicking cells, you write code that processes thousands of rows in milliseconds.",
      keyPoints: [
        "pd.DataFrame(dict) creates a table from a dictionary.",
        "df['new_col'] = expression adds a computed column.",
        "df[df['col'] > value] filters rows by condition.",
        "df.describe() gives count, mean, std, min, max for numeric columns.",
        "pd.read_excel('file.xlsx') loads a real Excel file; pd.to_excel() saves one.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 18: Pandas – DataFrame Operations
# Note: run this in a local Python environment with pandas installed
# pip install pandas

import pandas as pd

# Create a DataFrame (simulating Excel data)
data = {
    "Name":    ["Alice", "Bob", "Charlie", "Diana"],
    "Math":    [85, 92, 78, 95],
    "Science": [90, 88, 82, 97],
    "English": [78, 85, 91, 88],
}
df = pd.DataFrame(data)
print("Original DataFrame:")
print(df)

# Add computed columns
df["Total"]   = df["Math"] + df["Science"] + df["English"]
df["Average"] = (df["Total"] / 3).round(2)
print("\\nWith Total and Average:")
print(df)

# Filter rows
print("\\nStudents with Average > 88:")
print(df[df["Average"] > 88][["Name", "Average"]])

# Modify a row value
df.loc[df["Name"] == "Bob", "Math"] = 95
print("\\nAfter updating Bob's Math score:")
print(df[["Name", "Math"]])

# Basic statistics
print("\\nBasic Statistics:")
print(df[["Math", "Science", "English"]].describe())

# Save to Excel (uncomment to use)
# df.to_excel("students.xlsx", index=False)
# print("Saved to students.xlsx")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between df.loc[] and df.iloc[]?",
        difficulty: "Medium",
        hint: "loc uses label-based indexing (column names, index labels); iloc uses integer position-based indexing (0, 1, 2...).",
      },
      {
        question: "How do you read an actual Excel file into a DataFrame?",
        difficulty: "Easy",
        hint: "Use pd.read_excel('filename.xlsx'). You may need to install openpyxl: pip install openpyxl.",
      },
      {
        question: "How do you drop rows with missing values in a DataFrame?",
        difficulty: "Medium",
        hint: "Use df.dropna() to remove rows with any NaN values, or df.fillna(0) to replace them.",
      },
    ],
  },
  {
    id: "python-practice-matplotlib",
    title: "Matplotlib: Bar, Line & Scatter Charts",
    slug: "python-practice-matplotlib",
    icon: "BarChart2",
    difficulty: "Intermediate",
    description: "Draw bar charts, line charts, and scatter plots using the matplotlib library.",
    concept: {
      explanation:
        "Matplotlib is Python's core plotting library. plt.bar() creates bar charts, plt.plot() creates line charts, and plt.scatter() creates scatter plots. You can customize titles, labels, colors, and legends. plt.show() displays the chart interactively; plt.savefig() saves it to a file.",
      realLifeAnalogy:
        "Like using Excel's chart wizard, but in code — you describe what your chart looks like (what data, what color, what labels) and matplotlib renders it for you.",
      keyPoints: [
        "import matplotlib.pyplot as plt is the standard import.",
        "plt.bar(x, y) — bar chart; plt.plot(x, y) — line chart; plt.scatter(x, y) — scatter.",
        "plt.title(), plt.xlabel(), plt.ylabel() add labels.",
        "plt.legend() shows the legend when multiple series are plotted.",
        "plt.tight_layout() prevents label overlap; plt.show() or plt.savefig() renders.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 19: Matplotlib – Bar, Line & Scatter Charts
# Note: run this in a local Python environment with matplotlib installed
# pip install matplotlib

import matplotlib.pyplot as plt

months = ['Jan', 'Feb', 'Mar', 'Apr', 'May']
sales  = [120, 145, 132, 168, 155]
costs  = [80,  95,  88, 102,  98]

fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# 1. Bar Chart
axes[0].bar(months, sales, color='steelblue', edgecolor='white')
axes[0].set_title('Monthly Sales (Bar)')
axes[0].set_ylabel('Units Sold')

# 2. Line Chart
axes[1].plot(months, sales, 'b-o', label='Sales')
axes[1].plot(months, costs, 'r--s', label='Costs')
axes[1].set_title('Sales vs Costs (Line)')
axes[1].set_ylabel('Amount')
axes[1].legend()

# 3. Scatter Plot
axes[2].scatter(costs, sales, color='green', s=100, zorder=5)
for i, m in enumerate(months):
    axes[2].annotate(m, (costs[i], sales[i]), textcoords="offset points",
                     xytext=(5, 5), fontsize=8)
axes[2].set_xlabel('Costs')
axes[2].set_ylabel('Sales')
axes[2].set_title('Costs vs Sales (Scatter)')

plt.tight_layout()
plt.savefig('charts.png', dpi=100)
print("Charts saved to charts.png")
print("In interactive mode use: plt.show()")
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between plt.show() and plt.savefig()?",
        difficulty: "Easy",
        hint: "show() opens an interactive window; savefig() writes the chart to an image file without displaying it.",
      },
      {
        question: "How do you plot multiple lines on the same axes?",
        difficulty: "Easy",
        hint: "Call plt.plot() (or axes.plot()) multiple times before plt.show(). Add plt.legend() to distinguish them.",
      },
      {
        question: "What does plt.subplots(1, 3) return and what do the numbers mean?",
        difficulty: "Medium",
        hint: "It returns a (fig, axes) tuple. 1 row and 3 columns of subplots — axes is an array of 3 Axes objects.",
      },
    ],
  },
  {
    id: "python-practice-numpy",
    title: "NumPy: Array & Mathematical Operations",
    slug: "python-practice-numpy",
    icon: "Calculator",
    difficulty: "Intermediate",
    description: "Perform basic mathematical operations over arrays and series using the NumPy library.",
    concept: {
      explanation:
        "NumPy provides fast multi-dimensional arrays (ndarray) and mathematical functions that operate on entire arrays at once — called vectorized operations. Instead of looping, you write a + b and NumPy adds every element pair in a fraction of the time a Python loop would take.",
      realLifeAnalogy:
        "Using NumPy is like hiring an entire team instead of one worker. Asking the team to 'multiply everything by 2' gets done instantly by all members at once, versus telling each worker one at a time.",
      keyPoints: [
        "np.array([...]) creates a 1D array; np.array([[...]]) creates a 2D matrix.",
        "Arithmetic operators +, -, *, / work element-wise on arrays.",
        "np.sum(), np.mean(), np.max(), np.min(), np.std() compute statistics.",
        "array.reshape(rows, cols) changes dimensions without copying data.",
        "np.dot() or @ performs matrix multiplication.",
      ],
    },
    code: {
      language: "python",
      defaultCode: `# Problem 20: NumPy – Array Operations
# Note: NumPy is pre-installed in most Python environments
# pip install numpy  (if needed)

import numpy as np

# Create arrays
a = np.array([1, 2, 3, 4, 5])
b = np.array([10, 20, 30, 40, 50])
print("Array a:", a)
print("Array b:", b)

# Element-wise arithmetic
print("\\nElement-wise Operations:")
print("  a + b  =", a + b)
print("  b - a  =", b - a)
print("  a * b  =", a * b)
print("  b / a  =", b / a)
print("  a ** 2 =", a ** 2)

# Statistics
print("\\nStatistics on array a:")
print("  Sum:    ", np.sum(a))
print("  Mean:   ", np.mean(a))
print("  Max:    ", np.max(a))
print("  Min:    ", np.min(a))
print("  Std Dev:", np.std(a).round(4))

# 2D matrix
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])
print("\\n2D Matrix:")
print(matrix)
print("Transpose:")
print(matrix.T)
print("Row sums:", matrix.sum(axis=1))
print("Col sums:", matrix.sum(axis=0))
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between np.array and a Python list?",
        difficulty: "Easy",
        hint: "NumPy arrays are homogeneous (all same type), fixed-size, and support vectorized operations. Python lists can hold mixed types but have no built-in math operations.",
      },
      {
        question: "What does axis=0 vs axis=1 mean in numpy operations like sum()?",
        difficulty: "Medium",
        hint: "axis=0 collapses rows (operates down columns); axis=1 collapses columns (operates across rows).",
      },
      {
        question: "How is np.dot(A, B) different from A * B for 2D arrays?",
        difficulty: "Medium",
        hint: "A * B is element-wise multiplication; np.dot(A, B) is true matrix multiplication (each row of A dotted with each column of B).",
      },
    ],
  },
];

export const pythonModules: PythonModule[] = [
  {
    id: "python-fundamentals",
    level: 1,
    title: "Python Fundamentals",
    difficulty: "Beginner",
    description:
      "The foundation of Python — learn installation, syntax, variables, data types, operators, and basic I/O.",
    topicIds: [
      "introduction-to-python",
      "python-installation-setup",
      "python-syntax",
      "python-variables",
      "python-data-types",
      "python-type-casting",
      "python-comments",
      "python-input-output",
      "python-keywords",
      "python-operators",
    ],
  },
  {
    id: "python-control-flow",
    level: 2,
    title: "Control Flow",
    difficulty: "Beginner",
    description:
      "Master decision making and looping — if/elif/else, for and while loops, break, continue, and pass.",
    topicIds: [
      "python-if-statements",
      "python-if-else",
      "python-elif",
      "python-nested-conditions",
      "python-for-loop",
      "python-while-loop",
      "python-break-continue",
      "python-pass-statement",
    ],
  },
  {
    id: "python-functions",
    level: 3,
    title: "Functions",
    difficulty: "Beginner",
    description:
      "Define reusable code with functions — arguments, defaults, *args/**kwargs, lambdas, recursion, and higher-order functions.",
    topicIds: [
      "python-functions",
      "python-function-arguments",
      "python-default-arguments",
      "python-keyword-arguments",
      "python-args-kwargs",
      "python-return-values",
      "python-lambda-functions",
      "python-recursive-functions",
      "python-higher-order-functions",
    ],
  },
  {
    id: "python-data-structures",
    level: 4,
    title: "Data Structures",
    difficulty: "Beginner",
    description:
      "Master Python's built-in collections — lists, tuples, sets, dictionaries, and powerful comprehension syntax.",
    topicIds: [
      "python-lists",
      "python-list-methods",
      "python-tuples",
      "python-sets",
      "python-set-methods",
      "python-dictionaries",
      "python-dictionary-methods",
      "python-list-comprehension",
      "python-dictionary-comprehension",
    ],
  },
  {
    id: "python-strings-builtins",
    level: 5,
    title: "Strings & Built-in Functions",
    difficulty: "Intermediate",
    description:
      "Master Python strings, formatting, f-strings, and essential built-in functions like enumerate, zip, map, filter, and reduce.",
    topicIds: [
      "python-strings",
      "python-string-methods",
      "python-string-formatting",
      "python-f-strings",
      "python-builtin-functions",
      "python-enumerate",
      "python-zip",
      "python-map-filter-reduce",
    ],
  },
  {
    id: "python-oop",
    level: 6,
    title: "Object-Oriented Programming",
    difficulty: "Intermediate",
    description:
      "Master OOP in Python — classes, constructors, inheritance, encapsulation, polymorphism, and magic methods.",
    topicIds: [
      "python-classes-objects",
      "python-constructors",
      "python-instance-class-variables",
      "python-instance-methods",
      "python-inheritance",
      "python-multiple-inheritance",
      "python-method-overriding",
      "python-encapsulation",
      "python-polymorphism",
      "python-magic-methods",
    ],
  },
  {
    id: "python-error-file-handling",
    level: 7,
    title: "Error & File Handling",
    difficulty: "Intermediate",
    description:
      "Handle errors gracefully with try/except/finally, create custom exceptions, and master file operations with CSV and JSON.",
    topicIds: [
      "python-exceptions",
      "python-try-except",
      "python-finally",
      "python-custom-exceptions",
      "python-file-handling",
      "python-reading-files",
      "python-writing-files",
      "python-csv-json",
    ],
  },
  {
    id: "python-modules-libraries",
    level: 8,
    title: "Modules & Libraries",
    difficulty: "Intermediate",
    description:
      "Understand Python modules, packages, imports, and essential standard library modules — datetime, math, random, and os.",
    topicIds: [
      "python-modules",
      "python-import-statements",
      "python-packages",
      "python-standard-library",
      "python-datetime-module",
      "python-math-module",
      "python-random-module",
      "python-os-module",
    ],
  },
  {
    id: "python-advanced-concepts",
    level: 9,
    title: "Advanced Python Concepts",
    difficulty: "Advanced",
    description:
      "Master advanced Python — iterators, generators, decorators, context managers, concurrency, virtual environments, and performance optimization.",
    topicIds: [
      "python-iterators",
      "python-generators",
      "python-decorators",
      "python-context-managers",
      "python-multithreading",
      "python-multiprocessing",
      "python-virtual-environments",
      "python-performance-tips",
    ],
  },
  {
    id: "python-practice-problems",
    level: 10,
    title: "Practice Problems",
    difficulty: "Beginner",
    description:
      "Hands-on beginner Python problems covering variables, input/output, loops, and conditionals.",
    topicIds: [
      "python-practice-sum-average",
      "python-practice-for-loop-sequence",
      "python-practice-negative-numbers",
      "python-practice-print-name",
      "python-practice-even-odd",
      "python-practice-converging-triangle",
      "python-practice-centered-triangle",
      "python-practice-left-triangle",
      "python-practice-right-triangle",
      "python-practice-inverted-triangle",
      "python-practice-list-properties",
      "python-practice-dict-properties",
      "python-practice-vowel-checker",
      "python-practice-string-alternator",
      "python-practice-american-comma",
      "python-practice-indian-comma",
      "python-practice-try-except",
      "python-practice-pandas-excel",
      "python-practice-matplotlib",
      "python-practice-numpy",
    ],
  },
];
