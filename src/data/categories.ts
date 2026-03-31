import type { CategoryInfo } from "@/types/topic";

export const categories: CategoryInfo[] = [
  {
    id: "html",
    title: "HTML",
    icon: "FileCode",
    description:
      "Master semantic HTML, accessibility, forms, and modern HTML5 APIs.",
    topicCount: 72,
    color: "from-amber-400 to-orange-400",
    available: true,
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
  },
  {
    id: "dsa",
    title: "DSA using JavaScript",
    icon: "Code",
    description:
      "Learn data structures and algorithms with JavaScript -- arrays, linked lists, stacks, queues, sorting, searching, and more.",
    topicCount: 49,
    color: "from-emerald-400 to-teal-500",
    available: true,
  },
  {
    id: "python",
    title: "Python",
    icon: "Code",
    description:
      "Master Python fundamentals, data structures, OOP, and Pythonic patterns.",
    topicCount: 78,
    color: "from-blue-400 to-indigo-500",
    available: true,
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
    description:
      "Learn PostgreSQL from fundamentals to advanced database concepts used in backend development and interviews.",
    topicCount: 76,
    color: "from-violet-400 to-indigo-500",
    available: true,
  },
];
