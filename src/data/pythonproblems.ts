import type { PythonProblemTopic, PythonProblemModule } from "@/types/pythonproblems";

export const pythonProblemTopics: PythonProblemTopic[] = [
  {
    id: "sum-and-average",
    title: "Sum and Average of Three Numbers",
    slug: "sum-and-average",
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
    id: "for-loop-sequence",
    title: "Print Number Sequence with For Loop",
    slug: "for-loop-sequence",
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
    id: "negative-numbers-loop",
    title: "Negative Numbers with Interval of 2",
    slug: "negative-numbers-loop",
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
    id: "print-name-loop",
    title: "Print Name N Times",
    slug: "print-name-loop",
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
    id: "even-odd-checker",
    title: "Even and Odd Number Checker",
    slug: "even-odd-checker",
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
];

export const pythonProblemModules: PythonProblemModule[] = [
  {
    id: "python-basics-problems",
    level: 1,
    title: "Python Basics Practice",
    difficulty: "Beginner",
    description:
      "Hands-on problems covering variables, input/output, loops, and conditionals.",
    topicIds: [
      "sum-and-average",
      "for-loop-sequence",
      "negative-numbers-loop",
      "print-name-loop",
      "even-odd-checker",
    ],
  },
];
