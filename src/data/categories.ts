import type { CategoryInfo } from "@/types/topic";

// Lightweight category metadata. Topic counts are hardcoded to avoid
// importing the full topic data (which was ~2.5 MB of client bundle).
// The authoritative topic content lives in the `topics` table (Supabase).
export const categories: CategoryInfo[] = [
  {
    id: "html",
    title: "HTML",
    icon: "FileCode",
    description:
      "Master semantic HTML, accessibility, forms, and modern HTML5 APIs.",
    topicCount: 49,
    color: "from-amber-400 to-orange-400",
    available: true,
    group: "Languages",
  },
  {
    id: "css",
    title: "CSS",
    icon: "Palette",
    description:
      "Deep dive into CSS layouts, animations, responsive design, Flexbox, Grid.",
    topicCount: 68,
    color: "from-sky-400 to-blue-400",
    available: true,
    group: "Languages",
  },
  {
    id: "javascript",
    title: "JavaScript",
    icon: "Braces",
    description:
      "Understand closures, prototypes, async/await, event loop, ES6+ features.",
    topicCount: 80,
    color: "from-yellow-300 to-amber-400",
    available: true,
    group: "Languages",
  },
  {
    id: "dsa",
    title: "DSA using JavaScript",
    icon: "Code",
    description:
      "Learn data structures and algorithms with JavaScript -- arrays, linked lists, stacks, queues, sorting, searching, and more.",
    topicCount: 64,
    color: "from-emerald-400 to-teal-500",
    available: true,
    group: "Computer Science",
  },
  {
    id: "python",
    title: "Python",
    icon: "Code",
    description:
      "Master Python fundamentals, data structures, OOP, and Pythonic patterns.",
    topicCount: 98,
    color: "from-blue-400 to-indigo-500",
    available: true,
    group: "Languages",
  },
  {
    id: "system-design",
    title: "System Design",
    icon: "Server",
    description:
      "Build strong system design fundamentals across scalability, data, communication, security, and real-world case studies.",
    topicCount: 52,
    color: "from-cyan-400 to-sky-500",
    available: true,
    group: "Computer Science",
  },
  {
    id: "technical-questions",
    title: "Technical Questions",
    icon: "Cpu",
    description:
      "All kinds of interview questions in JavaScript, React, TypeScript, and NextJS.",
    topicCount: 12,
    color: "from-orange-400 to-red-400",
    available: true,
    group: "Interview Prep",
  },
  {
    id: "react",
    title: "React",
    icon: "Code",
    description:
      "Master React — props, state, hooks, context, performance optimization, and advanced patterns.",
    topicCount: 18,
    color: "from-cyan-400 to-blue-500",
    available: true,
    group: "Frameworks",
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: "Globe",
    description:
      "Coming soon — explore server-side rendering, static generation, API routes, and the App Router.",
    topicCount: 0,
    color: "from-slate-500 to-slate-600",
    available: false,
    group: "Frameworks",
  },
  {
    id: "nestjs",
    title: "NestJS",
    icon: "Server",
    description: "Coming soon — build scalable server-side applications with NestJS.",
    topicCount: 0,
    color: "from-rose-400 to-pink-500",
    available: false,
    group: "Frameworks",
  },
  {
    id: "postgresql",
    title: "PostgreSQL",
    icon: "Database",
    description:
      "Learn PostgreSQL from fundamentals to advanced database concepts used in backend development and interviews.",
    topicCount: 76,
    color: "from-violet-400 to-indigo-500",
    available: true,
    group: "Databases",
  },
];
