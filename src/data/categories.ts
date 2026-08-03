import type { CategoryInfo } from "@/types/topic";
import { cssTopics } from "@/data/css";
import { dsaTopics } from "@/data/dsa";
import { htmlTopics } from "@/data/html";
import { javascriptTopics } from "@/data/javascript";
import { postgresqlTopics } from "@/data/postgresql";
import { pythonTopics } from "@/data/python";
import { systemDesignTopics } from "@/data/system-design";
import { technicalTopics } from "@/data/technical";
import { reactTopics } from "@/data/react";

const nextjsTopics: unknown[] = [];
const nestjsTopics: unknown[] = [];

export const categories: CategoryInfo[] = [
  {
    id: "html",
    title: "HTML",
    icon: "FileCode",
    description:
      "Master semantic HTML, accessibility, forms, and modern HTML5 APIs.",
    topicCount: htmlTopics.length,
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
    topicCount: cssTopics.length,
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
    topicCount: javascriptTopics.length,
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
    topicCount: dsaTopics.length,
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
    topicCount: pythonTopics.length,
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
    topicCount: systemDesignTopics.length,
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
    topicCount: technicalTopics.length,
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
    topicCount: reactTopics.length,
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
    topicCount: nextjsTopics.length,
    color: "from-slate-500 to-slate-600",
    available: false,
    group: "Frameworks",
  },
  {
    id: "nestjs",
    title: "NestJS",
    icon: "Server",
    description: "Coming soon — build scalable server-side applications with NestJS.",
    topicCount: nestjsTopics.length,
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
    topicCount: postgresqlTopics.length,
    color: "from-violet-400 to-indigo-500",
    available: true,
    group: "Databases",
  },
];
