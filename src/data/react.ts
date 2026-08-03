import type { ReactTopic, ReactModule } from "@/types/react";

export const reactModules: ReactModule[] = [
  {
    id: "react-fundamentals",
    level: 1,
    title: "React Fundamentals",
    difficulty: "Beginner",
    description: "What is React, Virtual DOM, JSX, component architecture, one-way data flow.",
    topicIds: ["react-introduction"],
    category: "React",
  },
  {
    id: "react-components",
    level: 2,
    title: "Components",
    difficulty: "Beginner",
    description: "Functional components, composition, HOC, render props, smart vs dumb components.",
    topicIds: ["react-components"],
    category: "React",
  },
  {
    id: "react-props",
    level: 3,
    title: "Props",
    difficulty: "Beginner",
    description: "Passing props, default props, children, prop drilling, destructuring, callback props.",
    topicIds: ["react-props"],
    category: "React",
  },
  {
    id: "react-state-events",
    level: 4,
    title: "State & Events",
    difficulty: "Beginner",
    description: "useState, functional updates, state batching, onClick, onChange, onSubmit, event bubbling.",
    topicIds: ["react-state", "react-events"],
    category: "React",
  },
  {
    id: "react-rendering-lists",
    level: 5,
    title: "Conditional Rendering & Lists",
    difficulty: "Beginner",
    description: "if, ternary, &&, switch, map with keys, why not index.",
    topicIds: ["react-conditional-rendering", "react-lists-keys"],
    category: "React",
  },
  {
    id: "react-forms",
    level: 6,
    title: "Forms & Refs",
    difficulty: "Intermediate",
    description: "Controlled vs uncontrolled components, form validation, useRef.",
    topicIds: ["react-forms"],
    category: "React",
  },
  {
    id: "react-useeffect",
    level: 7,
    title: "useEffect & Lifecycle",
    difficulty: "Intermediate",
    description: "Mount, update, unmount, cleanup, dependency array, API calls, infinite loops.",
    topicIds: ["react-useeffect"],
    category: "React",
  },
  {
    id: "react-context-hooks",
    level: 8,
    title: "useContext & Custom Hooks",
    difficulty: "Intermediate",
    description: "createContext, Provider, useContext, custom hooks, prop drilling solutions.",
    topicIds: ["react-usecontext", "react-custom-hooks"],
    category: "React",
  },
  {
    id: "react-performance",
    level: 9,
    title: "Performance Optimization",
    difficulty: "Intermediate",
    description: "useMemo, useCallback, React.memo, lazy loading, code splitting, Suspense.",
    topicIds: ["react-usememo", "react-usecallback", "react-memo"],
    category: "React",
  },
  {
    id: "react-routing",
    level: 10,
    title: "Routing",
    difficulty: "Intermediate",
    description: "React Router, BrowserRouter, Routes, Link, useNavigate, useParams, nested routes, protected routes.",
    topicIds: ["react-routing"],
    category: "React",
  },
  {
    id: "react-api",
    level: 11,
    title: "API Calls & State Management",
    difficulty: "Intermediate",
    description: "fetch, axios, loading states, error handling, retry, cancellation, Context API, Redux Toolkit, Zustand.",
    topicIds: ["react-api-calls", "react-state-management"],
    category: "React",
  },
  {
    id: "react-advanced",
    level: 12,
    title: "Advanced React",
    difficulty: "Advanced",
    description: "Error boundaries, reconciliation, React patterns, compound components, React 19 concepts.",
    topicIds: ["react-advanced"],
    category: "React",
  },
];

export const reactTopics: ReactTopic[] = [
  {
    id: "react-introduction",
    title: "React Fundamentals",
    slug: "react-introduction",
    icon: "Atom",
    difficulty: "Beginner",
    description: "What is React, Virtual DOM vs Real DOM, JSX, component architecture, one-way data flow, rendering process.",
    concept: {
      explanation:
        "About React:\n\nReact is a JavaScript library for building user interfaces. It was created by Facebook and is maintained by Meta.\n\nAbout Virtual DOM:\n\nThe Virtual DOM is a lightweight JavaScript representation of the Real DOM. When state changes, React creates a new Virtual DOM tree, compares it with the previous one (diffing), and updates only the changed parts in the Real DOM (reconciliation).\n\n```\nVirtual DOM → Diffing → Reconciliation → Real DOM updates\n```\n\nAbout JSX:\n\nJSX is a syntax extension for JavaScript that looks like HTML. It is transpiled by Babel into React.createElement calls.\n\n```jsx\nconst element = <h1>Hello</h1>;\n// Transpiles to:\nconst element = React.createElement('h1', null, 'Hello');\n```\n\nAbout Component Architecture:\n\nReact apps are built from components — reusable, isolated pieces of UI. Components accept inputs (props) and return React elements describing what should appear on screen.\n\nAbout One-Way Data Flow:\n\nData flows from parent to child via props. Children communicate back via callback props. This makes the app predictable and easier to debug.\n\nAbout Rendering Process:\n\n1. State/props change\n2. React calls the component function\n3. Virtual DOM is created\n4. Diffing with previous Virtual DOM\n5. Minimal Real DOM updates",
      realLifeAnalogy:
        "React is like a restaurant kitchen. The Virtual DOM is the order slip — lightweight and easy to modify. The Real DOM is the actual food being plated. Instead of re-cooking everything when an order changes, React compares the old and new order slips (diffing) and only adjusts what's needed (reconciliation). JSX is like shorthand notation on the order slip — 'CB' instead of 'Cheeseburger'.",
      keyPoints: [
        "React is a UI library, not a framework",
        "Virtual DOM is a lightweight copy of the Real DOM",
        "JSX is syntactic sugar for React.createElement",
        "Components are reusable, isolated pieces of UI",
        "Data flows one way: parent to child via props",
        "Reconciliation is the diffing algorithm that updates only changed parts",
        "React uses a declarative approach — you describe what you want, not how to do it",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== React Fundamentals =====

function App() {
  const name = "React";
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h1>Welcome to {name}</h1>
      <p>Virtual DOM: A lightweight copy of the Real DOM</p>
      <p>JSX: HTML-like syntax transpiled to React.createElement</p>
      <p>Data flows one way: parent → child via props</p>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What is React?",
        difficulty: "Easy",
        hint: "React is a JavaScript library for building user interfaces, created by Facebook. It uses a component-based architecture and a Virtual DOM for efficient updates.",
      },
      {
        question: "What is the Virtual DOM?",
        difficulty: "Easy",
        hint: "The Virtual DOM is a lightweight JavaScript copy of the Real DOM. React compares old and new Virtual DOM trees (diffing) and updates only the changed parts in the Real DOM (reconciliation).",
      },
      {
        question: "What is JSX?",
        difficulty: "Easy",
        hint: "JSX is a syntax extension for JavaScript that looks like HTML. It is transpiled by Babel into React.createElement calls. It makes React code more readable.",
      },
      {
        question: "Explain one-way data flow in React.",
        difficulty: "Easy",
        hint: "Data flows from parent to child via props. Children communicate back via callback props. This makes the app predictable and easier to debug compared to two-way binding.",
      },
    ],
  },
  {
    id: "react-components",
    title: "Components",
    slug: "react-components",
    icon: "Boxes",
    difficulty: "Beginner",
    description: "Functional components, class components, component composition, HOC, render props, smart vs dumb components.",
    concept: {
      explanation:
        "About Functional Components:\n\nFunctional components are plain JavaScript functions that return JSX. They are the modern way to write React components.\n\n```jsx\nfunction Welcome({ name }) {\n  return <h1>Hello, {name}</h1>;\n}\n```\n\nAbout Class Components:\n\nClass components use ES6 classes. They have access to lifecycle methods and 'this'. With hooks, functional components can do everything class components can.\n\n```jsx\nclass Welcome extends React.Component {\n  render() {\n    return <h1>Hello, {this.props.name}</h1>;\n  }\n}\n```\n\nAbout Component Composition:\n\nComposition means combining smaller components to build larger ones. Instead of inheritance, React uses composition.\n\n```jsx\nfunction Page() {\n  return (\n    <div>\n      <Header />\n      <Content />\n      <Footer />\n    </div>\n  );\n}\n```\n\nAbout Higher-Order Components (HOC):\n\nA HOC is a function that takes a component and returns a new component with additional props or behavior.\n\n```jsx\nfunction withAuth(Component) {\n  return function AuthenticatedComponent(props) {\n    const user = useAuth();\n    return user ? <Component {...props} /> : <Login />;\n  };\n}\n```\n\nAbout Render Props:\n\nA render prop is a function prop that a component uses to know what to render.\n\n```jsx\n<DataProvider render={data => <UserList data={data} />} />\n```\n\nAbout Smart vs Dumb Components:\n\nSmart (container) components manage state and logic. Dumb (presentational) components only render UI based on props.",
      realLifeAnalogy:
        "Components are like LEGO bricks. Each brick has a specific shape and purpose. You combine them to build complex structures. HOC is like a paint booth — you pass a brick through and it comes out with a new property (color). Render props are like instruction slots — the brick tells you 'put whatever you want here'.",
      keyPoints: [
        "Functional components are the modern standard",
        "Class components use lifecycle methods and 'this'",
        "Composition over inheritance — combine small components",
        "HOC: function that takes a component and returns an enhanced one",
        "Render props: a function prop that controls what to render",
        "Smart components manage state; dumb components render UI",
        "React.memo is a built-in HOC for performance",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Components =====

function Header() {
  return <h2>Header Component</h2>;
}

function Content({ children }) {
  return <div style={{ padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>{children}</div>;
}

function Footer() {
  return <p style={{ color: "#6b7280", fontSize: "12px" }}>Footer Component</p>;
}

function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <Header />
      <Content>
        <p>This is composed content</p>
      </Content>
      <Footer />
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between functional and class components?",
        difficulty: "Easy",
        hint: "Functional components are plain functions that return JSX. Class components use ES6 classes with lifecycle methods and 'this'. With hooks, functional components can do everything class components can.",
      },
      {
        question: "What is a Higher-Order Component (HOC)?",
        difficulty: "Medium",
        hint: "A HOC is a function that takes a component and returns a new component with additional props or behavior. Example: withAuth(Component) that checks authentication before rendering.",
      },
      {
        question: "What is component composition?",
        difficulty: "Easy",
        hint: "Composition means combining smaller components to build larger ones. Instead of inheritance, React uses composition. Example: a Page component composed of Header, Content, and Footer.",
      },
    ],
  },
  {
    id: "react-props",
    title: "Props",
    slug: "react-props",
    icon: "ArrowRightLeft",
    difficulty: "Beginner",
    description: "Passing props, default props, children, prop drilling, destructuring, callback props.",
    concept: {
      explanation:
        "About Props:\n\nProps (properties) are read-only data passed from a parent component to a child component.\n\n```jsx\nfunction Button({ title, onClick, variant = 'primary' }) {\n  return (\n    <button onClick={onClick} className={variant}>\n      {title}\n    </button>\n  );\n}\n\n<Button title=\"Click Me\" onClick={handleClick} />\n```\n\nAbout Children Props:\n\nchildren is a special prop that represents anything passed between the opening and closing tags.\n\n```jsx\nfunction Card({ children }) {\n  return <div className=\"card\">{children}</div>;\n}\n\n<Card>\n  <h2>Title</h2>\n  <p>Content</p>\n</Card>\n```\n\nAbout Prop Drilling:\n\nProp drilling is passing props through multiple component levels to reach a deeply nested component. It can make code hard to maintain. Solutions include Context API and state management libraries.\n\nAbout Callback Props:\n\nFunctions passed as props allow children to communicate back to parents.\n\n```jsx\nfunction Parent() {\n  const handleChildClick = (data) => console.log(data);\n  return <Child onAction={handleChildClick} />;\n}\n```\n\nAbout Default Props:\n\nDefault values for props when none are provided. Can be done via default parameters or defaultProps.",
      realLifeAnalogy:
        "Props are like a TV remote — the parent gives it to the child, and the child can only use it, not change it. Children props are like a gift box — you don't know what's inside, you just pass it along. Prop drilling is like passing a message through 10 people in a line — it works but is inefficient.",
      keyPoints: [
        "Props are read-only — children cannot modify them",
        "children is a special prop for nested content",
        "Prop drilling is passing props through many levels",
        "Callback props let children communicate back to parents",
        "Default props provide fallback values",
        "Destructure props for cleaner code",
        "Props can be any JavaScript value: strings, numbers, objects, functions",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Props =====

function Button({ title, onClick, color = "#3b82f6" }) {
  return (
    <button
      onClick={() => onClick(title)}
      style={{ background: color, color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", margin: "4px" }}
    >
      {title}
    </button>
  );
}

function Card({ children, title }) {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "16px", margin: "8px 0" }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <Card title="Props Demo">
        <p>This content is passed via children prop</p>
        <Button title="Click A" onClick={(t) => alert(t + " clicked")} />
        <Button title="Click B" color="#22c55e" onClick={(t) => alert(t + " clicked")} />
      </Card>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What are props in React?",
        difficulty: "Easy",
        hint: "Props are read-only data passed from parent to child. They are like function arguments for components. Children cannot modify props.",
      },
      {
        question: "What is prop drilling?",
        difficulty: "Medium",
        hint: "Prop drilling is passing props through multiple component levels to reach a deeply nested component. Solutions: Context API, Zustand, Redux, or component composition.",
      },
      {
        question: "What is the children prop?",
        difficulty: "Easy",
        hint: "children is a special prop that represents anything passed between the opening and closing tags of a component. It enables component composition.",
      },
    ],
  },
  {
    id: "react-state",
    title: "State & useState",
    slug: "react-state",
    icon: "FileText",
    difficulty: "Beginner",
    description: "useState, updating state, functional updates, immutable updates, state batching, updating objects and arrays.",
    concept: {
      explanation:
        "About useState:\n\nuseState is a hook that adds state to functional components. It returns an array with the current state value and a function to update it.\n\n```jsx\nconst [count, setCount] = useState(0);\n```\n\nAbout Updating State:\n\nState updates trigger a re-render. Never mutate state directly — always use the setter function.\n\n```jsx\n// Wrong — mutating directly\nstate.count = 1;\n\n// Correct\nsetState({ ...state, count: 1 });\n```\n\nAbout Functional Updates:\n\nWhen the new state depends on the previous state, use a functional update.\n\n```jsx\nsetCount(prev => prev + 1);\n```\n\nAbout State Batching:\n\nReact batches multiple setState calls into a single update for performance.\n\n```jsx\nsetCount(1);\nsetCount(2);\nsetCount(3);\n// Result: 3 — only last value applies\n\nsetCount(count + 1);\nsetCount(count + 1);\nsetCount(count + 1);\n// Result: 1 — stale closure, count is still original value\n\nsetCount(prev => prev + 1);\nsetCount(prev => prev + 1);\nsetCount(prev => prev + 1);\n// Result: 3 — functional update uses latest value\n```\n\nAbout Updating Objects:\n\nAlways create a new object when updating state.\n\n```jsx\nconst [user, setUser] = useState({ name: '', age: 0 });\nsetUser({ ...user, name: 'Sai' });\n```\n\nAbout Updating Arrays:\n\nUse spread or array methods that return new arrays.\n\n```jsx\n// Add\nsetItems([...items, newItem]);\n// Remove\nsetItems(items.filter(i => i.id !== id));\n// Update\nsetItems(items.map(i => i.id === id ? { ...i, name: 'new' } : i));\n```",
      realLifeAnalogy:
        "State is like a whiteboard. You write a value, and when you change it, everyone in the room sees the update (re-render). Mutating state directly is like erasing part of a word without telling anyone — the board still looks the same to others. Functional updates are like saying 'add 1 to whatever is currently on the board' — it works even if someone else changed it.",
      keyPoints: [
        "useState returns [value, setter]",
        "Never mutate state directly — always use the setter",
        "Functional updates: setCount(prev => prev + 1)",
        "React batches multiple setState calls",
        "For objects: create a new copy with spread",
        "For arrays: use methods that return new arrays (map, filter, spread)",
        "State updates trigger re-renders",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== State & useState =====

function App() {
  const [count, setCount] = React.useState(0);
  const [user, setUser] = React.useState({ name: "Sai", age: 25 });
  const [items, setItems] = React.useState(["A", "B", "C"]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>useState Demo</h2>

      <h3>Counter</h3>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={() => setCount(c => c + 1)}
        style={{ background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
        +1
      </button>

      <h3>Object State</h3>
      <p>{user.name}, Age: {user.age}</p>
      <button onClick={() => setUser(u => ({ ...u, age: u.age + 1 }))}
        style={{ background: "#22c55e", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
        Birthday!
      </button>

      <h3>Array State</h3>
      <p>Items: {items.join(", ")}</p>
      <button onClick={() => setItems(i => [...i, String.fromCharCode(65 + i.length)])}
        style={{ background: "#f59e0b", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
        Add Item
      </button>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What is useState?",
        difficulty: "Easy",
        hint: "useState is a React hook that adds state to functional components. It returns an array with the current state value and a function to update it. Example: const [count, setCount] = useState(0).",
      },
      {
        question: "Why shouldn't you mutate state directly?",
        difficulty: "Easy",
        hint: "Mutating state directly doesn't trigger a re-render. React compares previous and new state using reference equality. Always use the setter function or create a new object/array.",
      },
      {
        question: "What is state batching?",
        difficulty: "Medium",
        hint: "React batches multiple setState calls into a single update. setCount(1); setCount(2); setCount(3) results in 3. Use functional updates to get the latest value: setCount(prev => prev + 1).",
      },
      {
        question: "How do you update objects and arrays in state?",
        difficulty: "Medium",
        hint: "For objects: setUser({ ...user, name: 'new' }). For arrays: use spread to add, filter to remove, map to update. Always create new references, never mutate.",
      },
    ],
  },
  {
    id: "react-events",
    title: "Events",
    slug: "react-events",
    icon: "Zap",
    difficulty: "Beginner",
    description: "onClick, onChange, onSubmit, keyboard events, mouse events, prevent default, event bubbling.",
    concept: {
      explanation:
        "About Events in React:\n\nReact events are named using camelCase (onClick, onChange, onSubmit) and pass functions as event handlers, not strings.\n\n```jsx\n<button onClick={handleClick}>Click</button>\n<input onChange={e => setValue(e.target.value)} />\n<form onSubmit={handleSubmit}>...</form>\n```\n\nAbout Prevent Default:\n\nUse e.preventDefault() to prevent default browser behavior (like form submission).\n\n```jsx\nfunction handleSubmit(e) {\n  e.preventDefault();\n  // process form\n}\n```\n\nAbout Event Bubbling:\n\nEvents bubble up from the target element to the root. Use e.stopPropagation() to stop bubbling.\n\n```jsx\nfunction handleChildClick(e) {\n  e.stopPropagation();\n  // only child handler runs\n}\n```\n\nAbout Keyboard Events:\n\n```jsx\n<input onKeyDown={e => {\n  if (e.key === 'Enter') submit();\n  if (e.key === 'Escape') cancel();\n}} />\n```\n\nAbout Mouse Events:\n\nonClick, onDoubleClick, onMouseEnter, onMouseLeave, onMouseMove.",
      realLifeAnalogy:
        "Event handling in React is like a restaurant bell. onClick is like pressing the bell — the kitchen responds. onChange is like a waiter watching your water glass — every time it changes, they refill. Event bubbling is like a rumor spreading from a person to the whole room — you can stop it by not passing it on (stopPropagation).",
      keyPoints: [
        "React events use camelCase: onClick, onChange, onSubmit",
        "Pass function references, not strings: onClick={handleClick}",
        "e.preventDefault() stops default browser behavior",
        "e.stopPropagation() stops event bubbling",
        "SyntheticEvent is React's cross-browser wrapper",
        "Keyboard events: onKeyDown, onKeyUp, onKeyPress",
        "Form submission: use onSubmit on the form element",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Events =====

function App() {
  const [value, setValue] = React.useState("");
  const [clicked, setClicked] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Submitted: " + value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") alert("Enter pressed!");
    if (e.key === "Escape") setValue("");
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>Events Demo</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter"
          style={{ border: "1px solid #d1d5db", padding: "8px", borderRadius: "6px", width: "200px" }}
        />
        <button type="submit"
          style={{ marginLeft: "8px", background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
          Submit
        </button>
      </form>

      <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
        <button onClick={() => setClicked("Button 1")}
          style={{ background: "#22c55e", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
          Button 1
        </button>
        <button onClick={() => setClicked("Button 2")}
          style={{ background: "#f59e0b", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
          Button 2
        </button>
      </div>
      {clicked && <p>Last clicked: <strong>{clicked}</strong></p>}
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "How are events different in React vs vanilla JavaScript?",
        difficulty: "Easy",
        hint: "React events use camelCase (onClick), pass function references (not strings), and use SyntheticEvent — a cross-browser wrapper around native events.",
      },
      {
        question: "How do you prevent default behavior in React?",
        difficulty: "Easy",
        hint: "Call e.preventDefault() in the event handler. For example, in a form submit handler to prevent page reload.",
      },
      {
        question: "What is event bubbling and how do you stop it?",
        difficulty: "Medium",
        hint: "Events bubble from the target element up to the root. Call e.stopPropagation() to prevent the event from triggering parent handlers.",
      },
    ],
  },
  {
    id: "react-conditional-rendering",
    title: "Conditional Rendering",
    slug: "react-conditional-rendering",
    icon: "GitBranch",
    difficulty: "Beginner",
    description: "if statements, ternary operator, logical &&, switch statements, conditional rendering patterns.",
    concept: {
      explanation:
        "About Conditional Rendering:\n\nReact allows you to render different UI based on conditions using regular JavaScript.\n\nAbout if/else:\n\n```jsx\nfunction Greeting({ isLoggedIn }) {\n  if (isLoggedIn) {\n    return <UserDashboard />;\n  }\n  return <LoginPage />;\n}\n```\n\nAbout Ternary Operator:\n\n```jsx\n{isLoggedIn ? <Home /> : <Login />}\n```\n\nAbout Logical &&:\n\nWhen the condition is true, the element after && is rendered. When false, React ignores it.\n\n```jsx\n{isAdmin && <AdminPanel />}\n```\n\nAbout Switch/Case:\n\n```jsx\nfunction Status({ status }) {\n  switch (status) {\n    case 'loading': return <Spinner />;\n    case 'error': return <Error />;\n    case 'success': return <Data />;\n    default: return null;\n  }\n}\n```\n\nImportant: Falsy values like 0, empty string, and NaN are rendered by React. Always ensure the condition is boolean.\n\n```jsx\n// Wrong — renders '0' if items.length is 0\n{items.length && <List items={items} />}\n\n// Correct\n{items.length > 0 && <List items={items} />}\n```",
      realLifeAnalogy:
        "Conditional rendering is like a traffic light. If green (condition true), go. If red (condition false), stop. The ternary operator is like a fork in the road — one path or the other. Logical && is like a door that only opens when the key is present — if no key, nothing happens.",
      keyPoints: [
        "Use if/else for complex conditions outside JSX",
        "Use ternary for simple inline conditions",
        "Use && to conditionally render an element or nothing",
        "Use switch for multiple conditions",
        "Ensure conditions are boolean — avoid rendering falsy values like 0",
        "You can assign conditional content to variables",
        "null, undefined, and false render nothing in React",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Conditional Rendering =====

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [role, setRole] = React.useState("user");

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>Conditional Rendering</h2>

      <button onClick={() => setIsLoggedIn(!isLoggedIn)}
        style={{ background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
        {isLoggedIn ? "Log Out" : "Log In"}
      </button>

      {/* Ternary */}
      {isLoggedIn ? (
        <div style={{ marginTop: "12px", padding: "12px", background: "#f0fdf4", borderRadius: "8px" }}>
          <p>Welcome back! <strong>Dashboard</strong></p>
        </div>
      ) : (
        <div style={{ marginTop: "12px", padding: "12px", background: "#fef2f2", borderRadius: "8px" }}>
          <p>Please <strong>log in</strong> to continue</p>
        </div>
      )}

      {/* Logical AND */}
      {isLoggedIn && (
        <div style={{ marginTop: "8px" }}>
          <button onClick={() => setRole(r => r === "admin" ? "user" : "admin")}
            style={{ background: "#f59e0b", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
            Toggle Admin
          </button>
          {role === "admin" && <p style={{ color: "#f59e0b" }}>Admin Panel Visible</p>}
        </div>
      )}
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What are the different ways to conditionally render in React?",
        difficulty: "Easy",
        hint: "if/else statements, ternary operator (condition ? A : B), logical AND (condition && element), switch statements, and conditional assignment to variables.",
      },
      {
        question: "Why should you avoid {items.length && <List />}?",
        difficulty: "Medium",
        hint: "If items.length is 0, React renders '0' because 0 is a valid React node. Always use a boolean condition: {items.length > 0 && <List />}.",
      },
    ],
  },
  {
    id: "react-lists-keys",
    title: "Lists & Keys",
    slug: "react-lists-keys",
    icon: "List",
    difficulty: "Beginner",
    description: "Rendering lists with map, why keys are needed, why not to use array index as key.",
    concept: {
      explanation:
        "About Rendering Lists:\n\nUse the map() method to render arrays of data.\n\n```jsx\nconst users = [\n  { id: 1, name: 'Alice' },\n  { id: 2, name: 'Bob' },\n];\n\nreturn (\n  <ul>\n    {users.map(user => (\n      <li key={user.id}>{user.name}</li>\n    ))}\n  </ul>\n);\n```\n\nAbout Keys:\n\nKeys help React identify which items have changed, been added, or removed. They should be unique and stable.\n\n```jsx\n// Correct — unique ID\n{items.map(item => <Item key={item.id} />)}\n\n// Wrong — array index\n{items.map((item, index) => <Item key={index} />)}\n```\n\nWhy not index?\n\nIf items are added, removed, or reordered, indexes shift. React re-renders more than necessary and can cause UI bugs (e.g., wrong item animates, input focus lost, wrong data displayed).\n\nExample of the problem:\n\n```\nInitial: [{id:'a'}, {id:'b'}]  → keys: 0, 1\nAfter adding at beginning: [{id:'c'}, {id:'a'}, {id:'b'}] → keys: 0, 1, 2\n// 'a' now has key 1 instead of 0 — React thinks it's a different item\n```\n\nWhen is index acceptable?\n\nOnly when the list is static (never reordered, filtered, or has items added/removed) and items have no state or inputs.",
      realLifeAnalogy:
        "Keys are like name tags on luggage at an airport. Without name tags, the baggage handlers have to guess which suitcase belongs to whom. If you use index as key, it's like labeling suitcases by position in line — when someone cuts in line, all the labels are wrong. With unique IDs, each suitcase is always correctly identified.",
      keyPoints: [
        "Use map() to render lists",
        "Keys must be unique among siblings",
        "Keys should be stable — use unique IDs, not array index",
        "Index as key causes issues with add/remove/reorder",
        "React uses keys for reconciliation and efficient updates",
        "Keys help preserve component state during re-renders",
        "Index as key is only acceptable for static, non-sorted lists",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Lists & Keys =====

function App() {
  const [items, setItems] = React.useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a project" },
    { id: 3, text: "Practice interviews" },
  ]);

  function addItem() {
    const id = Date.now();
    setItems(i => [{ id, text: "New task " + id }, ...i]);
  }

  function removeItem(id) {
    setItems(i => i.filter(item => item.id !== id));
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>Lists & Keys Demo</h2>
      <button onClick={addItem}
        style={{ background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginBottom: "12px" }}>
        Add Item at Beginning
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map(item => (
          <li key={item.id}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px", borderBottom: "1px solid #e5e7eb" }}>
            <span>{item.text}</span>
            <button onClick={() => removeItem(item.id)}
              style={{ background: "#ef4444", color: "white", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p style={{ fontSize: "12px", color: "#6b7280" }}>
        Each item has a unique key (id). React tracks them correctly even when items are added or removed.
      </p>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "Why are keys important in React lists?",
        difficulty: "Easy",
        hint: "Keys help React identify which items have changed, been added, or removed. They enable efficient reconciliation and prevent UI bugs.",
      },
      {
        question: "Why should you not use array index as a key?",
        difficulty: "Medium",
        hint: "Indexes shift when items are added, removed, or reordered. React re-renders more than necessary and can cause bugs like lost focus, wrong animations, or incorrect data display.",
      },
      {
        question: "When is it acceptable to use index as key?",
        difficulty: "Medium",
        hint: "Only when the list is static — never reordered, filtered, or has items added/removed — and items have no state, inputs, or component instances.",
      },
    ],
  },
  {
    id: "react-forms",
    title: "Forms & Refs",
    slug: "react-forms",
    icon: "Input",
    difficulty: "Intermediate",
    description: "Controlled components, uncontrolled components, form validation, useRef with forms.",
    concept: {
      explanation:
        "About Controlled Components:\n\nReact controls the input value via state. Every keystroke updates state, and state updates the input value.\n\n```jsx\nconst [name, setName] = useState('');\n<input value={name} onChange={e => setName(e.target.value)} />\n```\n\nAbout Uncontrolled Components:\n\nThe browser controls the input value. React accesses the value via ref when needed.\n\n```jsx\nconst inputRef = useRef(null);\n<input ref={inputRef} />\n// Access: inputRef.current.value\n```\n\nAbout useRef:\n\nuseRef stores a mutable value that persists across renders without causing re-renders.\n\n```jsx\nconst countRef = useRef(0);\ncountRef.current += 1; // no re-render\n```\n\nCommon useRef use cases:\n1. DOM access (ref attribute)\n2. Storing previous values\n3. Storing mutable values that shouldn't trigger re-render\n4. Timer/interval IDs\n\nAbout Form Validation:\n\n```jsx\nfunction validateEmail(email) {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);\n}\n\nfunction LoginForm() {\n  const [email, setEmail] = useState('');\n  const [error, setError] = useState('');\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (!validateEmail(email)) {\n      setError('Invalid email');\n      return;\n    }\n    // submit\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={email} onChange={e => setEmail(e.target.value)} />\n      {error && <p style={{color: 'red'}}>{error}</p>}\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}\n```",
      realLifeAnalogy:
        "Controlled components are like a teacher writing on a whiteboard — every change is immediately reflected and controlled. Uncontrolled components are like a student writing in a notebook — the teacher only sees it when they ask (ref). useRef is like a sticky note on your desk — you can read and write to it, but it doesn't ring any bells (no re-render).",
      keyPoints: [
        "Controlled: React manages input value via state (value + onChange)",
        "Uncontrolled: Browser manages input value, accessed via ref",
        "useRef persists across renders without causing re-renders",
        "useRef is commonly used for DOM references (ref attribute)",
        "useRef can store previous values, timers, and mutable data",
        "Form validation should prevent submission and show errors",
        "Controlled components are the React-recommended approach",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Forms & Refs =====

function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function validate() {
    const errs = {};
    if (!email.includes("@")) errs.email = "Invalid email";
    if (password.length < 6) errs.password = "Min 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) alert("Form submitted!\\nEmail: " + email);
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px", maxWidth: "400px" }}>
      <h2>Form Demo</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Email:</label>
          <input ref={inputRef} value={email} onChange={e => setEmail(e.target.value)}
            style={{ display: "block", width: "100%", border: "1px solid #d1d5db", padding: "8px", borderRadius: "6px", marginTop: "4px" }} />
          {errors.email && <p style={{ color: "#ef4444", fontSize: "12px" }}>{errors.email}</p>}
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            style={{ display: "block", width: "100%", border: "1px solid #d1d5db", padding: "8px", borderRadius: "6px", marginTop: "4px" }} />
          {errors.password && <p style={{ color: "#ef4444", fontSize: "12px" }}>{errors.password}</p>}
        </div>
        <button type="submit"
          style={{ background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between controlled and uncontrolled components?",
        difficulty: "Easy",
        hint: "Controlled: React manages the input value via state (value + onChange). Uncontrolled: the browser manages the value, accessed via ref. Controlled is the React-recommended approach.",
      },
      {
        question: "What is useRef and when would you use it?",
        difficulty: "Medium",
        hint: "useRef stores mutable values that persist across renders without causing re-renders. Uses: DOM access (ref attribute), storing previous values, timer IDs, and mutable data.",
      },
      {
        question: "How do you handle form validation in React?",
        difficulty: "Medium",
        hint: "Use controlled components with state. Validate on submit or onChange. Show error messages conditionally. Prevent default form submission with e.preventDefault().",
      },
    ],
  },
  {
    id: "react-useeffect",
    title: "useEffect & Lifecycle",
    slug: "react-useeffect",
    icon: "Zap",
    difficulty: "Intermediate",
    description: "Mount, update, unmount, cleanup function, dependency array, API calls, infinite loops, AbortController.",
    concept: {
      explanation:
        "About useEffect:\n\nuseEffect performs side effects in React components. Side effects include API calls, timers, event listeners, and DOM manipulation.\n\n```jsx\nuseEffect(() => {\n  document.title = 'Page loaded';\n}, []);\n```\n\nAbout the Dependency Array:\n\nEmpty array [] — runs once on mount\nNo array — runs after every render\nWith values [count] — runs when count changes\n\n```jsx\n// Runs once on mount\nuseEffect(() => { fetchUsers(); }, []);\n\n// Runs after every render\nuseEffect(() => { console.log('rendered'); });\n\n// Runs when count changes\nuseEffect(() => { console.log('count:', count); }, [count]);\n```\n\nAbout Cleanup Function:\n\nThe cleanup function runs on unmount and before the effect re-runs. It is used for removing event listeners, clearing timers, and aborting API calls.\n\n```jsx\nuseEffect(() => {\n  const controller = new AbortController();\n\n  fetch(url, { signal: controller.signal });\n\n  return () => {\n    controller.abort(); // cleanup on unmount\n  };\n}, [url]);\n```\n\nAbout Lifecycle with Hooks:\n\n| Lifecycle | Hook |\n|-----------|------|\n| Mount | useEffect(() => {}, []) |\n| Update | useEffect(() => {}, [dep]) |\n| Unmount | Cleanup function |\n\nAbout Infinite Loops:\n\nIf you update state inside useEffect without specifying dependencies, it causes an infinite loop.\n\n```jsx\n// Infinite loop!\nuseEffect(() => {\n  setCount(count + 1);\n});\n```\n\nFix: add the dependency or use functional update.\n\nAbout API Calls:\n\n```jsx\nuseEffect(() => {\n  const controller = new AbortController();\n\n  async function fetchData() {\n    try {\n      const res = await fetch('/api/data', { signal: controller.signal });\n      const data = await res.json();\n      setData(data);\n    } catch (err) {\n      if (err.name !== 'AbortError') setError(err.message);\n    }\n  }\n\n  fetchData();\n\n  return () => controller.abort();\n}, []);\n```",
      realLifeAnalogy:
        "useEffect is like setting up a tent. You arrive (mount), set up the tent (effect), and when you leave (unmount), you pack it up (cleanup). If the weather changes (dependency changes), you pack up the old tent and set up a new one. The dependency array is like the weather forecast — you only repack when the forecast changes.",
      keyPoints: [
        "useEffect runs after render, not during",
        "Empty deps [] — runs once on mount",
        "No deps — runs after every render",
        "With deps [val] — runs when val changes",
        "Cleanup runs on unmount and before re-running the effect",
        "Use AbortController to cancel API calls on cleanup",
        "Avoid infinite loops by specifying deps correctly",
        "useEffect is for side effects, not for derived state",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== useEffect & Lifecycle =====

function App() {
  const [count, setCount] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  // Mount effect — runs once
  React.useEffect(() => {
    console.log("Component mounted");
  }, []);

  // Update effect — runs when count changes
  React.useEffect(() => {
    console.log("Count changed to:", count);
  }, [count]);

  // Timer with cleanup
  React.useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
      console.log("Timer cleaned up");
    };
  }, [isRunning]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>useEffect Demo</h2>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={() => setIsRunning(!isRunning)}
        style={{ background: isRunning ? "#ef4444" : "#22c55e", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginRight: "8px" }}>
        {isRunning ? "Stop Timer" : "Start Timer"}
      </button>
      <button onClick={() => { setCount(0); setIsRunning(false); }}
        style={{ background: "#6b7280", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
        Reset
      </button>
      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
        Open console to see lifecycle logs
      </p>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What is useEffect used for?",
        difficulty: "Easy",
        hint: "useEffect performs side effects in React components — API calls, timers, event listeners, and DOM manipulation. It runs after the component renders.",
      },
      {
        question: "What is the difference between useEffect with [] and without any dependency array?",
        difficulty: "Medium",
        hint: "Empty array [] — runs once on mount. No array — runs after every render. With values [count] — runs when count changes.",
      },
      {
        question: "What is the cleanup function in useEffect?",
        difficulty: "Medium",
        hint: "The cleanup function runs on unmount and before the effect re-runs. It is used for removing event listeners, clearing timers, and aborting API calls with AbortController.",
      },
      {
        question: "How do you prevent infinite loops in useEffect?",
        difficulty: "Medium",
        hint: "Specify the correct dependency array. If you update state inside useEffect without deps, it causes an infinite loop. Use functional updates or add the state variable as a dependency.",
      },
      {
        question: "How do you cancel an API call in useEffect?",
        difficulty: "Hard",
        hint: "Use AbortController. Create a controller, pass signal.signal to fetch, and call controller.abort() in the cleanup function. This prevents state updates on unmounted components.",
      },
    ],
  },
  {
    id: "react-usecontext",
    title: "useContext & Custom Hooks",
    slug: "react-usecontext",
    icon: "Share2",
    difficulty: "Intermediate",
    description: "createContext, Provider, useContext, custom hooks, prop drilling solutions.",
    concept: {
      explanation:
        "About useContext:\n\nuseContext provides global state without prop drilling. It works with React's Context API.\n\n```jsx\nconst ThemeContext = React.createContext('light');\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <Child />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Child() {\n  const theme = React.useContext(ThemeContext);\n  return <div className={theme}>Content</div>;\n}\n```\n\nAbout createContext:\n\nCreates a context object. Accepts a default value used when a component is not wrapped in a Provider.\n\nAbout Provider:\n\nWraps components that need access to the context. Accepts a value prop.\n\nAbout useContext:\n\nA hook that consumes the nearest Provider's value. If no Provider is found, returns the default value from createContext.\n\nAbout Custom Hooks:\n\nCustom hooks are reusable functions that start with 'use' and encapsulate stateful logic.\n\n```jsx\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch(url)\n      .then(res => res.json())\n      .then(data => {\n        setData(data);\n        setLoading(false);\n      });\n  }, [url]);\n\n  return { data, loading };\n}\n\n// Usage\nfunction UserList() {\n  const { data, loading } = useFetch('/api/users');\n  if (loading) return <Spinner />;\n  return <List items={data} />;\n}\n```\n\nCustom hooks enable logic reuse across components and make code more readable.",
      realLifeAnalogy:
        "useContext is like a company-wide announcement board — anyone can read it without passing messages through managers (prop drilling). createContext is like creating the board. Provider is like posting the announcement. useContext is like reading it. Custom hooks are like power tools — you build a specialized tool once and use it everywhere instead of manually doing the same work each time.",
      keyPoints: [
        "useContext provides global state without prop drilling",
        "createContext creates a context with an optional default value",
        "Provider wraps components and provides the context value",
        "Without Provider, useContext returns the default value",
        "Custom hooks start with 'use' and encapsulate reusable logic",
        "Custom hooks can use other hooks internally",
        "Context is not a replacement for all state management — use it for shared global state",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== useContext & Custom Hooks =====

const ThemeContext = React.createContext("light");
const UserContext = React.createContext(null);

function useFetch(url) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [url]);

  return { data, loading };
}

function Profile() {
  const theme = React.useContext(ThemeContext);
  const user = React.useContext(UserContext);
  const { data, loading } = useFetch("https://jsonplaceholder.typicode.com/todos/1");

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>Context & Custom Hooks</h2>
      <p>Theme: <strong>{theme}</strong></p>
      {user && <p>User: {user.name}</p>}
      <p>API Data: {loading ? "Loading..." : JSON.stringify(data)}</p>
    </div>
  );
}

function App() {
  const [theme, setTheme] = React.useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={{ name: "Sai" }}>
        <div style={{ background: theme === "dark" ? "#1f2937" : "white", color: theme === "dark" ? "white" : "black", minHeight: "100vh" }}>
          <Profile />
          <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
            style={{ margin: "16px", background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
            Toggle Theme
          </button>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What is useContext and how does it work?",
        difficulty: "Medium",
        hint: "useContext provides global state without prop drilling. You create a context with createContext(), wrap components with Provider, and consume with useContext(). Without Provider, it returns the default value.",
      },
      {
        question: "What is prop drilling and how do you solve it?",
        difficulty: "Medium",
        hint: "Prop drilling is passing props through multiple component levels. Solutions: Context API for simple cases, Zustand or Redux for complex state management.",
      },
      {
        question: "What are custom hooks?",
        difficulty: "Easy",
        hint: "Custom hooks are reusable functions that start with 'use' and encapsulate stateful logic. Example: useFetch(url) that returns { data, loading }. They enable logic reuse across components.",
      },
    ],
  },
  {
    id: "react-usememo",
    title: "useMemo",
    slug: "react-usememo",
    icon: "Cpu",
    difficulty: "Intermediate",
    description: "Memoize expensive calculations, dependency array, when to use useMemo.",
    concept: {
      explanation:
        "About useMemo:\n\nuseMemo caches the result of a calculation. It only recomputes when dependencies change.\n\n```jsx\nconst total = useMemo(() => {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}, [items]);\n```\n\nWhen to use useMemo:\n\n1. Expensive calculations (large data transformations, complex math)\n2. Maintaining referential equality for objects passed to child components\n3. Preventing unnecessary re-renders when used with React.memo\n\nWhen NOT to use useMemo:\n\n1. Simple calculations (addition, string concatenation)\n2. Every value — the overhead of memoization can be more than the calculation\n3. Premature optimization — profile first, then optimize\n\nExample:\n\n```jsx\nfunction UserList({ users, search }) {\n  // Without useMemo — recalculates on every render\n  const filtered = users.filter(u =>\n    u.name.toLowerCase().includes(search.toLowerCase())\n  );\n\n  // With useMemo — only recalculates when users or search changes\n  const filteredMemo = useMemo(() =>\n    users.filter(u =>\n      u.name.toLowerCase().includes(search.toLowerCase())\n    ),\n    [users, search]\n  );\n\n  return <List items={filteredMemo} />;\n}\n```",
      realLifeAnalogy:
        "useMemo is like a calculator that remembers the last result. If you ask 'what is 5 x 5?' it calculates and shows 25. If you ask again with the same inputs, it shows the saved answer without recalculating. But if you change the inputs to '6 x 6', it recalculates. Using useMemo for simple addition is like using a supercomputer to add 2+2 — overkill.",
      keyPoints: [
        "useMemo caches a computed value",
        "Only recalculates when dependencies change",
        "Use for expensive calculations and referential equality",
        "Don't over-optimize — profile first",
        "useMemo is for values, useCallback is for functions",
        "Can be used with React.memo to prevent child re-renders",
        "The dependency array determines when to recalculate",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== useMemo =====

function App() {
  const [count, setCount] = React.useState(0);
  const [items, setItems] = React.useState([1, 2, 3, 4, 5]);

  // Expensive calculation — memoized
  const total = React.useMemo(() => {
    console.log("Calculating total...");
    let sum = 0;
    for (const item of items) sum += item;
    return sum;
  }, [items]);

  const doubled = React.useMemo(() => count * 2, [count]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>useMemo Demo</h2>
      <p>Count: <strong>{count}</strong></p>
      <p>Doubled (memoized): <strong>{doubled}</strong></p>
      <p>Items total (memoized): <strong>{total}</strong></p>
      <button onClick={() => setCount(c => c + 1)}
        style={{ background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginRight: "8px" }}>
        Change Count
      </button>
      <button onClick={() => setItems(i => [...i, i.length + 1])}
        style={{ background: "#22c55e", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
        Add Item
      </button>
      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
        Check console — total only recalculates when items change
      </p>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What is useMemo?",
        difficulty: "Medium",
        hint: "useMemo caches a computed value and only recalculates when dependencies change. It's used for expensive calculations and maintaining referential equality.",
      },
      {
        question: "When should you use useMemo?",
        difficulty: "Medium",
        hint: "Use for expensive calculations (large data transformations), maintaining referential equality for objects passed to child components, and with React.memo. Don't over-optimize — profile first.",
      },
      {
        question: "What is the difference between useMemo and useCallback?",
        difficulty: "Medium",
        hint: "useMemo caches a computed value. useCallback caches a function reference. Both prevent unnecessary recalculations/recreations when dependencies haven't changed.",
      },
    ],
  },
  {
    id: "react-usecallback",
    title: "useCallback",
    slug: "react-usecallback",
    icon: "Zap",
    difficulty: "Intermediate",
    description: "Memoize functions, dependency array, useCallback vs useMemo, when to use useCallback.",
    concept: {
      explanation:
        "About useCallback:\n\nuseCallback caches a function reference. It only creates a new function when dependencies change.\n\n```jsx\nconst handleClick = useCallback(() => {\n  setCount(c => c + 1);\n}, []);\n```\n\nWhy use useCallback?\n\nIn React, a new function is created on every render. If you pass a function as a prop to a child wrapped in React.memo, the child re-renders because the function reference changed. useCallback prevents this.\n\n```jsx\n// Without useCallback — new function every render\n<Child onClick={() => setCount(c => c + 1)} />\n\n// With useCallback — same function reference\nconst handleClick = useCallback(() => {\n  setCount(c => c + 1);\n}, []);\n<Child onClick={handleClick} />\n```\n\nuseCallback vs useMemo:\n\nuseCallback — memoizes functions\nuseMemo — memoizes values\n\n```jsx\nconst fn = useCallback(() => {}, []);    // returns the function\nconst val = useMemo(() => 42, []);       // returns 42\n\n// useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)\n```\n\nWhen to use useCallback:\n\n1. Passing callbacks to child components wrapped in React.memo\n2. When the function is a dependency of another hook (useEffect)\n3. When the function is expensive to create (rare)\n\nWhen NOT to use useCallback:\n\n1. Every function — the overhead of memoization can be more than the function creation\n2. Premature optimization",
      realLifeAnalogy:
        "useCallback is like saving a phone contact. Instead of dialing the number from scratch every time (creating a new function), you save it as a contact (memoize the reference) and call the contact. useMemo is like saving a calculation result. useCallback saves the phone number itself; useMemo saves what happens when you call it.",
      keyPoints: [
        "useCallback caches a function reference",
        "Only creates a new function when dependencies change",
        "Prevents unnecessary child re-renders with React.memo",
        "useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)",
        "Use when passing callbacks to memoized children",
        "Use when function is a dependency of another hook",
        "Don't over-optimize — profile first",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== useCallback =====

function App() {
  const [count, setCount] = React.useState(0);
  const [other, setOther] = React.useState(0);

  // Memoized — same reference unless deps change
  const handleIncrement = React.useCallback(() => {
    setCount(c => c + 1);
  }, []);

  // Not memoized — new reference every render
  function handleOther() {
    setOther(o => o + 1);
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>useCallback Demo</h2>
      <p>Count: <strong>{count}</strong></p>
      <p>Other: <strong>{other}</strong></p>
      <button onClick={handleIncrement}
        style={{ background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginRight: "8px" }}>
        Increment (memoized)
      </button>
      <button onClick={handleOther}
        style={{ background: "#f59e0b", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
        Other (not memoized)
      </button>
      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
        useCallback preserves the function reference. With React.memo, the child won't re-render unnecessarily.
      </p>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What is useCallback?",
        difficulty: "Medium",
        hint: "useCallback caches a function reference and only creates a new function when dependencies change. It prevents unnecessary re-renders when passing callbacks to memoized child components.",
      },
      {
        question: "What is the difference between useMemo and useCallback?",
        difficulty: "Medium",
        hint: "useMemo caches a computed value. useCallback caches a function reference. useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).",
      },
      {
        question: "When should you use useCallback?",
        difficulty: "Medium",
        hint: "Use when passing callbacks to child components wrapped in React.memo, when the function is a dependency of another hook (useEffect), or when the function is expensive to create. Don't over-optimize.",
      },
    ],
  },
  {
    id: "react-memo",
    title: "React.memo",
    slug: "react-memo",
    icon: "Shield",
    difficulty: "Intermediate",
    description: "Prevent unnecessary re-renders, shallow comparison, when to use React.memo.",
    concept: {
      explanation:
        "About React.memo:\n\nReact.memo is a higher-order component that prevents unnecessary re-renders. It only re-renders the component if its props have changed (shallow comparison).\n\n```jsx\nconst Child = React.memo(function Child({ name }) {\n  console.log('Child rendered');\n  return <h1>{name}</h1>;\n});\n```\n\nAbout Shallow Comparison:\n\nReact.memo compares props using ===. For primitive values (string, number, boolean), this works perfectly. For objects and arrays, it compares references, not values.\n\n```jsx\n// This creates a new object every render — React.memo won't help\n<Child user={{ name: 'Sai' }} />\n\n// Fix: memoize the object\nconst user = useMemo(() => ({ name: 'Sai' }), []);\n<Child user={user} />\n```\n\nWhen to use React.memo:\n\n1. Pure components that render often with the same props\n2. Components that are expensive to render\n3. Leaf components in the component tree\n\nWhen NOT to use React.memo:\n\n1. Components that always receive different props\n2. Components with few children or cheap renders\n3. Premature optimization\n\nReact.memo vs useMemo vs useCallback:\n\nReact.memo — memoizes components (prevents re-render)\nuseMemo — memoizes values\nuseCallback — memoizes functions",
      realLifeAnalogy:
        "React.memo is like a doorman who checks if the delivery is the same before letting the package in. If the package (props) is the same as last time, the doorman says 'no need to go in' (no re-render). But if the package is wrapped in new paper every time (new object reference), the doorman sees a different package and lets it in. Shallow comparison is like checking the label, not the contents.",
      keyPoints: [
        "React.memo prevents re-render if props haven't changed (shallow comparison)",
        "Shallow comparison works for primitives, not for objects/arrays",
        "Objects create new references every render — React.memo won't help",
        "Fix: memoize objects with useMemo or use stable references",
        "Use React.memo for pure, frequently-rendered components",
        "Don't over-optimize — profile first",
        "React.memo is a HOC, useMemo is a hook, useCallback is a hook",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== React.memo =====

const ExpensiveChild = React.memo(function ExpensiveChild({ name, onClick }) {
  console.log("ExpensiveChild rendered:", name);
  return (
    <div style={{ padding: "12px", border: "1px solid #e5e7eb", borderRadius: "8px", margin: "8px 0" }}>
      <p>Name: <strong>{name}</strong></p>
      <button onClick={onClick}
        style={{ background: "#3b82f6", color: "white", border: "none", padding: "4px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}>
        Click
      </button>
    </div>
  );
});

function App() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("Sai");

  const handleClick = React.useCallback(() => {
    alert("Clicked!");
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>React.memo Demo</h2>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={() => setCount(c => c + 1)}
        style={{ background: "#f59e0b", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginRight: "8px" }}>
        Re-render Parent
      </button>
      <button onClick={() => setName(n => n === "Sai" ? "John" : "Sai")}
        style={{ background: "#22c55e", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
        Change Name
      </button>
      <ExpensiveChild name={name} onClick={handleClick} />
      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>
        Check console — child only re-renders when name changes, not when count changes
      </p>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What is React.memo?",
        difficulty: "Medium",
        hint: "React.memo is a higher-order component that prevents unnecessary re-renders if props haven't changed (shallow comparison). It's used for pure components that render often with the same props.",
      },
      {
        question: "Will React.memo prevent re-render if you pass <Child user={{ name: 'Sai' }} />?",
        difficulty: "Hard",
        hint: "No. Objects create a new reference every render, so React.memo's shallow comparison sees a different prop. The child will still re-render. To fix, memoize the object with useMemo or use a stable reference.",
      },
      {
        question: "What is the difference between React.memo, useMemo, and useCallback?",
        difficulty: "Medium",
        hint: "React.memo memoizes components (prevents re-render). useMemo memoizes values. useCallback memoizes functions. All three prevent unnecessary work when dependencies haven't changed.",
      },
    ],
  },
  {
    id: "react-custom-hooks",
    title: "Custom Hooks",
    slug: "react-custom-hooks",
    icon: "Code",
    difficulty: "Intermediate",
    description: "Creating custom hooks, use cases, examples like useFetch, useLocalStorage, useDebounce.",
    concept: {
      explanation:
        "About Custom Hooks:\n\nCustom hooks are JavaScript functions that start with 'use' and can call other hooks. They encapsulate reusable logic.\n\n```jsx\nfunction useDocumentTitle(title) {\n  useEffect(() => {\n    document.title = title;\n  }, [title]);\n}\n\n// Usage\nfunction Home() {\n  useDocumentTitle('Home Page');\n  return <h1>Home</h1>;\n}\n```\n\nCommon Custom Hook Examples:\n\n1. useFetch — data fetching with loading/error states\n\n```jsx\nfunction useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const controller = new AbortController();\n\n    fetch(url, { signal: controller.signal })\n      .then(res => res.json())\n      .then(data => { setData(data); setLoading(false); })\n      .catch(err => {\n        if (err.name !== 'AbortError') {\n          setError(err);\n          setLoading(false);\n        }\n      });\n\n    return () => controller.abort();\n  }, [url]);\n\n  return { data, loading, error };\n}\n```\n\n2. useLocalStorage — persist state to localStorage\n\n```jsx\nfunction useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const stored = localStorage.getItem(key);\n    return stored ? JSON.parse(stored) : initialValue;\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue];\n}\n```\n\n3. useDebounce — debounce a value\n\n```jsx\nfunction useDebounce(value, delay) {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n\n  return debounced;\n}\n```\n\nRules of Custom Hooks:\n1. Must start with 'use'\n2. Can only call hooks at the top level (not inside conditions or loops)\n3. Can call other hooks\n4. Can return any value (object, array, primitive)",
      realLifeAnalogy:
        "Custom hooks are like power tools in a workshop. Instead of manually screwing every screw (repeating code), you build a power drill (custom hook) once and use it everywhere. useFetch is like a drill that also has a built-in level (loading state) and a safety switch (error handling). useLocalStorage is like a toolbox that automatically puts tools back where they belong.",
      keyPoints: [
        "Custom hooks start with 'use' and encapsulate reusable logic",
        "They can call other hooks (useState, useEffect, etc.)",
        "They enable logic reuse across components",
        "They make code more readable and testable",
        "Common examples: useFetch, useLocalStorage, useDebounce",
        "Custom hooks follow the same rules as React hooks",
        "They can return any value — objects, arrays, primitives",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Custom Hooks =====

function useCounter(initialValue = 0) {
  const [count, setCount] = React.useState(initialValue);
  const increment = React.useCallback(() => setCount(c => c + 1), []);
  const decrement = React.useCallback(() => setCount(c => c - 1), []);
  const reset = React.useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, decrement, reset };
}

function useWindowWidth() {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function App() {
  const { count, increment, decrement, reset } = useCounter(0);
  const width = useWindowWidth();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>Custom Hooks Demo</h2>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={increment}
        style={{ background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginRight: "4px" }}>
        +
      </button>
      <button onClick={decrement}
        style={{ background: "#f59e0b", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginRight: "4px" }}>
        -
      </button>
      <button onClick={reset}
        style={{ background: "#6b7280", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
        Reset
      </button>
      <p>Window width: <strong>{width}px</strong></p>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What are custom hooks?",
        difficulty: "Easy",
        hint: "Custom hooks are reusable functions that start with 'use' and encapsulate stateful logic. They can call other hooks and enable logic reuse across components.",
      },
      {
        question: "What are the rules for creating custom hooks?",
        difficulty: "Medium",
        hint: "Must start with 'use'. Can only call hooks at the top level. Can call other hooks. Can return any value. Follow the same rules as React hooks.",
      },
      {
        question: "Give an example of a useful custom hook.",
        difficulty: "Medium",
        hint: "useFetch(url) returns { data, loading, error } and handles API calls with AbortController. useLocalStorage(key, initial) persists state to localStorage. useDebounce(value, delay) debounces a value.",
      },
    ],
  },
  {
    id: "react-routing",
    title: "Routing",
    slug: "react-routing",
    icon: "Globe",
    difficulty: "Intermediate",
    description: "React Router, BrowserRouter, Routes, Route, Link, NavLink, useNavigate, useParams, nested routes, protected routes.",
    concept: {
      explanation:
        "About React Router:\n\nReact Router is the standard routing library for React applications. It enables navigation between different views without page reload.\n\nAbout BrowserRouter:\n\nWraps the application and enables routing using the HTML5 History API.\n\n```jsx\n<BrowserRouter>\n  <App />\n</BrowserRouter>\n```\n\nAbout Routes and Route:\n\nRoutes defines the routing structure. Route maps a path to a component.\n\n```jsx\n<Routes>\n  <Route path=\"/\" element={<Home />} />\n  <Route path=\"/about\" element={<About />} />\n  <Route path=\"/users/:id\" element={<UserDetail />} />\n</Routes>\n```\n\nAbout Link and NavLink:\n\nLink navigates to a route. NavLink is a Link with active state styling.\n\n```jsx\n<Link to=\"/about\">About</Link>\n<NavLink to=\"/home\" className={({ isActive }) => isActive ? 'active' : ''}>\n  Home\n</NavLink>\n```\n\nAbout useNavigate:\n\nProgrammatic navigation.\n\n```jsx\nconst navigate = useNavigate();\nnavigate('/dashboard');\nnavigate(-1); // go back\n```\n\nAbout useParams:\n\nAccess route parameters.\n\n```jsx\n// Route: /users/:id\nfunction UserDetail() {\n  const { id } = useParams();\n  return <h1>User {id}</h1>;\n}\n```\n\nAbout Nested Routes:\n\n```jsx\n<Route path=\"/dashboard\" element={<Dashboard />}>\n  <Route path=\"settings\" element={<Settings />} />\n  <Route path=\"profile\" element={<Profile />} />\n</Route>\n```\n\nAbout Protected Routes:\n\n```jsx\nfunction ProtectedRoute({ children }) {\n  const user = useAuth();\n  if (!user) return <Navigate to=\"/login\" />;\n  return children;\n}\n\n<Route path=\"/dashboard\" element={\n  <ProtectedRoute><Dashboard /></ProtectedRoute>\n} />\n```",
      realLifeAnalogy:
        "React Router is like a GPS for your app. BrowserRouter is the GPS device. Routes are the map. Route is a specific destination. Link is like tapping a destination on the screen. useNavigate is like saying 'take me home' — programmatic navigation. useParams is like reading the street sign when you arrive. Protected routes are like a bouncer checking ID before letting you in.",
      keyPoints: [
        "React Router enables client-side navigation without page reload",
        "BrowserRouter uses the HTML5 History API",
        "Route maps a path to a component",
        "Link for navigation, NavLink for active state styling",
        "useNavigate for programmatic navigation",
        "useParams for accessing route parameters",
        "Nested routes create layouts with shared UI",
        "Protected routes redirect unauthenticated users",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Routing =====
// Note: This demo shows the concepts.
// React Router requires BrowserRouter wrapping the app.

function App() {
  const [page, setPage] = React.useState("home");
  const [user, setUser] = React.useState(null);

  function navigate(to) {
    setPage(to);
  }

  const routes = {
    home: <Home navigate={navigate} />,
    about: <About navigate={navigate} />,
    login: <Login onLogin={() => { setUser({ name: "Sai" }); navigate("home"); }} />,
    dashboard: user ? <Dashboard user={user} /> : <Login onLogin={() => { setUser({ name: "Sai" }); navigate("dashboard"); }} />,
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <nav style={{ display: "flex", gap: "12px", marginBottom: "16px", borderBottom: "1px solid #e5e7eb", paddingBottom: "8px" }}>
        <button onClick={() => navigate("home")}
          style={{ background: page === "home" ? "#3b82f6" : "transparent", color: page === "home" ? "white" : "#374151", border: "none", padding: "4px 12px", borderRadius: "4px", cursor: "pointer" }}>
          Home
        </button>
        <button onClick={() => navigate("about")}
          style={{ background: page === "about" ? "#3b82f6" : "transparent", color: page === "about" ? "white" : "#374151", border: "none", padding: "4px 12px", borderRadius: "4px", cursor: "pointer" }}>
          About
        </button>
        <button onClick={() => navigate(user ? "dashboard" : "login")}
          style={{ background: page === "dashboard" || page === "login" ? "#3b82f6" : "transparent", color: page === "dashboard" || page === "login" ? "white" : "#374151", border: "none", padding: "4px 12px", borderRadius: "4px", cursor: "pointer" }}>
          {user ? "Dashboard" : "Login"}
        </button>
      </nav>
      {routes[page]}
    </div>
  );
}

function Home({ navigate }) {
  return <div><h2>Home Page</h2><p>Welcome to the app!</p></div>;
}

function About({ navigate }) {
  return <div><h2>About Page</h2><p>This demonstrates routing concepts.</p></div>;
}

function Login({ onLogin }) {
  return <div><h2>Login</h2><button onClick={onLogin}
    style={{ background: "#22c55e", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
    Log In
  </button></div>;
}

function Dashboard({ user }) {
  return <div><h2>Dashboard</h2><p>Welcome, {user.name}! (Protected route)</p></div>;
}
`,
    },
    interviewQuestions: [
      {
        question: "What is React Router?",
        difficulty: "Medium",
        hint: "React Router is the standard routing library for React. It enables navigation between views without page reload using the HTML5 History API.",
      },
      {
        question: "What is the difference between Link and NavLink?",
        difficulty: "Easy",
        hint: "Both navigate to routes. NavLink provides active state styling via className or style props. Link is simpler — just navigation without active state.",
      },
      {
        question: "How do you create a protected route?",
        difficulty: "Medium",
        hint: "Create a wrapper component that checks authentication. If not authenticated, redirect to login using <Navigate to='/login' />. Wrap protected routes with this component.",
      },
    ],
  },
  {
    id: "react-api-calls",
    title: "API Calls & Data Fetching",
    slug: "react-api-calls",
    icon: "Server",
    difficulty: "Intermediate",
    description: "fetch, axios, loading states, error handling, retry, request cancellation with AbortController.",
    concept: {
      explanation:
        "About API Calls in React:\n\nAPI calls are side effects and should be made inside useEffect or event handlers.\n\nAbout fetch:\n\n```jsx\nuseEffect(() => {\n  const controller = new AbortController();\n\n  fetch('/api/users', { signal: controller.signal })\n    .then(res => {\n      if (!res.ok) throw new Error('Network error');\n      return res.json();\n    })\n    .then(data => setData(data))\n    .catch(err => {\n      if (err.name !== 'AbortError') setError(err.message);\n    });\n\n  return () => controller.abort();\n}, []);\n```\n\nAbout Loading States:\n\nAlways handle loading, success, and error states.\n\n```jsx\nif (loading) return <Spinner />;\nif (error) return <Error message={error} />;\nreturn <Data data={data} />;\n```\n\nAbout Retry:\n\n```jsx\nfunction useFetchWithRetry(url, retries = 3) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  const fetchData = useCallback(async (attempt = 0) => {\n    setLoading(true);\n    setError(null);\n    try {\n      const res = await fetch(url);\n      if (!res.ok) throw new Error('Failed to fetch');\n      const data = await res.json();\n      setData(data);\n    } catch (err) {\n      if (attempt < retries) {\n        setTimeout(() => fetchData(attempt + 1), 1000 * (attempt + 1));\n      } else {\n        setError(err.message);\n      }\n    } finally {\n      setLoading(false);\n    }\n  }, [url, retries]);\n\n  return { data, loading, error, refetch: () => fetchData() };\n}\n```\n\nAbout Axios:\n\nAxios provides a cleaner API with automatic JSON parsing and request cancellation.\n\n```jsx\nimport axios from 'axios';\n\nconst CancelToken = axios.CancelToken;\nconst source = CancelToken.source();\n\naxios.get('/api/users', { cancelToken: source.token })\n  .then(res => setData(res.data))\n  .catch(err => {\n    if (!axios.isCancel(err)) setError(err.message);\n  });\n\n// Cleanup\nreturn () => source.cancel();\n```",
      realLifeAnalogy:
        "API calls are like ordering food delivery. You place an order (request), wait for it (loading), receive it (success), or get a cancellation (error). AbortController is like calling the restaurant to cancel the order if you change your mind. Retry logic is like calling again if the delivery doesn't arrive — you try a few times before giving up.",
      keyPoints: [
        "API calls are side effects — use useEffect or event handlers",
        "Always handle loading, success, and error states",
        "Use AbortController to cancel requests on unmount",
        "fetch requires manual error handling (check res.ok)",
        "Axios provides automatic JSON parsing and cleaner cancellation",
        "Implement retry logic for transient failures",
        "Extract API logic into custom hooks for reusability",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== API Calls =====

function useFetch(url) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const d = await res.json();
      setData(d);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

function App() {
  const { data, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>API Calls Demo</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "#ef4444" }}>Error: {error}</p>}
      {data && (
        <pre style={{ background: "#f3f4f6", padding: "12px", borderRadius: "8px" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      <button onClick={refetch}
        style={{ marginTop: "8px", background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
        Refetch
      </button>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "How do you make API calls in React?",
        difficulty: "Medium",
        hint: "Use useEffect for initial data fetching, or event handlers for user-triggered calls. Always handle loading, success, and error states. Use AbortController for cancellation.",
      },
      {
        question: "How do you handle API errors in React?",
        difficulty: "Medium",
        hint: "Use try/catch blocks. Check res.ok for fetch errors. Set error state and display it conditionally. Use AbortController to ignore errors from cancelled requests.",
      },
      {
        question: "What is AbortController and why use it?",
        difficulty: "Hard",
        hint: "AbortController cancels in-flight API requests. Use it in useEffect cleanup to prevent state updates on unmounted components and avoid race conditions.",
      },
    ],
  },
  {
    id: "react-state-management",
    title: "State Management",
    slug: "react-state-management",
    icon: "Layers",
    difficulty: "Intermediate",
    description: "Context API, Redux Toolkit, Zustand, store, slice, actions, reducer, dispatch, selectors.",
    concept: {
      explanation:
        "About State Management:\n\nAs apps grow, managing state across components becomes complex. State management solutions help organize and share state.\n\nAbout Context API:\n\nBuilt into React. Good for simple global state (theme, user, locale).\n\n```jsx\nconst AuthContext = createContext();\n\nfunction App() {\n  const [user, setUser] = useState(null);\n  return (\n    <AuthContext.Provider value={{ user, setUser }}>\n      <App />\n    </AuthContext.Provider>\n  );\n}\n```\n\nWhen to use Context: simple global state, few updates, small to medium apps.\n\nAbout Redux Toolkit:\n\nRedux Toolkit is the modern way to write Redux. It reduces boilerplate.\n\n```jsx\nimport { createSlice, configureStore } from '@reduxjs/toolkit';\n\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: (state) => { state.value += 1; },\n    decrement: (state) => { state.value -= 1; },\n  },\n});\n\nexport const { increment, decrement } = counterSlice.actions;\nexport const store = configureStore({\n  reducer: { counter: counterSlice.reducer },\n});\n```\n\nKey Redux concepts:\nStore — holds the entire state tree\nSlice — a portion of the store with its own reducers\nActions — plain objects describing what happened\nReducer — pure function that updates state based on action\nDispatch — sends actions to the store\nSelectors — functions that extract data from the store\n\nAbout Zustand:\n\nZustand is a minimal state management library. It's simpler than Redux.\n\n```jsx\nimport { create } from 'zustand';\n\nconst useStore = create((set) => ({\n  count: 0,\n  increment: () => set((state) => ({ count: state.count + 1 })),\n  decrement: () => set((state) => ({ count: state.count - 1 })),\n}));\n\nfunction Counter() {\n  const { count, increment } = useStore();\n  return <button onClick={increment}>{count}</button>;\n}\n```\n\nWhen to use what:\n\nContext API — simple global state, small apps\nRedux Toolkit — complex state, large apps, team projects\nZustand — medium apps, simpler alternative to Redux",
      realLifeAnalogy:
        "State management is like organizing a library. Context API is like a small bookshelf in your living room — good for a few books you access often. Redux Toolkit is like a full library catalog system — organized, scalable, but requires setup. Zustand is like a well-organized desk drawer — simple, accessible, and gets the job done without the overhead of a full catalog system.",
      keyPoints: [
        "Context API is built-in, good for simple global state",
        "Redux Toolkit reduces Redux boilerplate with createSlice",
        "Store holds all state, slices organize related state",
        "Actions describe events, reducers update state",
        "Dispatch sends actions, selectors extract data",
        "Zustand is a simpler alternative to Redux",
        "Choose based on app complexity and team size",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== State Management =====

// Simulating Zustand-like store with plain React
function createStore(initialState) {
  const store = { ...initialState };
  const listeners = new Set();

  return {
    getState: () => store,
    setState: (updater) => {
      Object.assign(store, typeof updater === "function" ? updater(store) : updater);
      listeners.forEach(l => l());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const store = createStore({ count: 0, user: null });

function App() {
  const [count, setCount] = React.useState(store.getState().count);

  React.useEffect(() => {
    return store.subscribe(() => setCount(store.getState().count));
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>State Management Concepts</h2>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={() => store.setState(s => ({ count: s.count + 1 }))}
        style={{ background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
        Increment
      </button>
      <div style={{ marginTop: "16px", padding: "12px", background: "#f3f4f6", borderRadius: "8px", fontSize: "12px" }}>
        <p><strong>Key Concepts:</strong></p>
        <p>Store: holds all state</p>
        <p>Actions: describe what happened</p>
        <p>Reducers: update state based on actions</p>
        <p>Dispatch: sends actions to the store</p>
        <p>Selectors: extract specific data</p>
      </div>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between Context API and Redux?",
        difficulty: "Medium",
        hint: "Context API is built-in, good for simple global state. Redux Toolkit is more powerful for complex state with devtools, middleware, and predictable updates. Use Context for small apps, Redux for large ones.",
      },
      {
        question: "What are the key concepts of Redux?",
        difficulty: "Medium",
        hint: "Store (holds state), Slice (portion of store), Actions (describe events), Reducers (pure functions that update state), Dispatch (sends actions), Selectors (extract data).",
      },
      {
        question: "What is Zustand and how is it different from Redux?",
        difficulty: "Medium",
        hint: "Zustand is a minimal state management library. It's simpler than Redux — no boilerplate, no providers, no action types. Good for medium-sized apps where Redux would be overkill.",
      },
    ],
  },
  {
    id: "react-advanced",
    title: "Advanced React",
    slug: "react-advanced",
    icon: "BrainCircuit",
    difficulty: "Advanced",
    description: "Error boundaries, reconciliation, React patterns, compound components, React 19 concepts, Suspense, concurrent rendering.",
    concept: {
      explanation:
        "About Error Boundaries:\n\nError boundaries catch JavaScript errors in their child component tree and display a fallback UI.\n\n```jsx\nclass ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n\n  componentDidCatch(error, errorInfo) {\n    console.error(error, errorInfo);\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return <h1>Something went wrong.</h1>;\n    }\n    return this.props.children;\n  }\n}\n```\n\nNote: Error boundaries must be class components. They catch errors in render, lifecycle methods, and constructors.\n\nAbout Reconciliation:\n\nReconciliation is React's algorithm for comparing two Virtual DOM trees and determining the minimal set of changes to apply to the Real DOM.\n\nAbout React Patterns:\n\n1. Lifting State Up — moving state to a common ancestor\n2. Composition — combining components via children prop\n3. Compound Components — components that work together (like <Select> and <Select.Option>)\n4. Controlled vs Uncontrolled — state managed by React vs DOM\n\nAbout React 19 Concepts:\n\n1. Server Components — components that run on the server, reducing client JS\n2. Suspense — declarative loading states for async operations\n3. Concurrent Rendering — React can interrupt rendering to handle higher-priority updates\n4. useTransition — mark state updates as non-urgent\n5. useDeferredValue — defer updating a part of the UI\n6. React Compiler — automatically memoizes components (no need for useMemo/useCallback manually)\n\nAbout Code Splitting:\n\n```jsx\nconst Dashboard = React.lazy(() => import('./Dashboard'));\n\n<Suspense fallback={<Spinner />}>\n  <Dashboard />\n</Suspense>\n```\n\nAbout Re-render Triggers:\n\nReact re-renders when: state changes, props change, context changes, or parent re-renders.\nReact does NOT re-render when: ref.current changes, or normal variables change.",
      realLifeAnalogy:
        "Error boundaries are like airbags in a car — when something goes wrong, they deploy to protect the passengers (rest of the app). Reconciliation is like a smart painter who only repaints the parts of the wall that changed instead of repainting the entire room. Suspense is like a loading spinner at a restaurant — it tells you 'your food is coming' while the kitchen prepares it.",
      keyPoints: [
        "Error boundaries catch errors in child components (class components only)",
        "Reconciliation is the diffing algorithm for efficient DOM updates",
        "Lifting state up shares state between sibling components",
        "Compound components provide a flexible API (e.g., <Select><Option />)</Select>",
        "React 19: Server Components, Suspense, concurrent rendering",
        "useTransition and useDeferredValue for prioritizing updates",
        "React Compiler will auto-memoize in the future",
        "Code splitting with React.lazy + Suspense reduces bundle size",
      ],
    },
    code: {
      language: "javascript",
      defaultCode: `// ===== Advanced React =====

function App() {
  const [value, setValue] = React.useState("");
  const [items, setItems] = React.useState(["A", "B", "C"]);

  function addItem() {
    const newItem = String.fromCharCode(65 + items.length);
    setItems([newItem, ...items]);
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "16px" }}>
      <h2>Advanced React Concepts</h2>

      <h3>Controlled Component</h3>
      <input value={value} onChange={e => setValue(e.target.value)}
        placeholder="Type something..."
        style={{ border: "1px solid #d1d5db", padding: "8px", borderRadius: "6px", width: "200px" }} />
      <p>Value: <strong>{value}</strong></p>

      <h3>Keys in Lists</h3>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        {items.map(item => (
          <div key={item}
            style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #3b82f6", borderRadius: "8px", fontWeight: "bold" }}>
            {item}
          </div>
        ))}
      </div>
      <button onClick={addItem}
        style={{ background: "#22c55e", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
        Add Item
      </button>

      <h3>Error Boundary (Concept)</h3>
      <div style={{ padding: "8px", background: "#fef2f2", borderRadius: "6px", fontSize: "12px", color: "#991b1b" }}>
        Error boundaries catch JS errors in child components and show fallback UI.
        They must be class components.
      </div>
    </div>
  );
}
`,
    },
    interviewQuestions: [
      {
        question: "What are error boundaries?",
        difficulty: "Hard",
        hint: "Error boundaries catch JavaScript errors in their child component tree and display a fallback UI. They must be class components using getDerivedStateFromError and componentDidCatch.",
      },
      {
        question: "What is reconciliation?",
        difficulty: "Hard",
        hint: "Reconciliation is React's algorithm for comparing two Virtual DOM trees and determining the minimal set of changes to apply to the Real DOM. It uses keys to identify elements efficiently.",
      },
      {
        question: "What causes a React component to re-render?",
        difficulty: "Easy",
        hint: "State changes, props changes, context changes, or parent re-renders. ref.current changes and normal variables do NOT cause re-renders.",
      },
      {
        question: "What is React.lazy and Suspense?",
        difficulty: "Medium",
        hint: "React.lazy enables code-splitting by loading components only when needed. Suspense provides a fallback UI (like a loader) while the lazy component is loading.",
      },
      {
        question: "What are React Server Components?",
        difficulty: "Hard",
        hint: "Server Components run on the server, reducing client-side JavaScript. They can access databases and file systems directly. They cannot use hooks or browser APIs.",
      },
    ],
  },
];
