<div align="center">
  <img src="./public/favicon.png" alt="Interview Handbook" width="80" height="80" />
  <h1 align="center">Interview Handbook</h1>
  <p align="center">
    Your complete guide to cracking technical interviews.
    <br />
    Learn concepts, visualize algorithms, and practice coding — all in one place.
  </p>
  <p>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js 14" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss" alt="Tailwind CSS" /></a>
    <br />
    <a href="#features">Features</a> •
    <a href="#topics-covered">Topics</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-structure">Structure</a> •
    <a href="#tech-stack">Tech Stack</a>
  </p>
</div>

---

## Features

- **400+ Topics** across 9 categories — HTML, CSS, JavaScript, DSA, Python, PostgreSQL, React, System Design, and Technical Questions
- **Interactive Visualizations** — Step-by-step animated walkthroughs for algorithms (Two Sum, Dijkstra, Flood Fill, Merge Sort, and 60+ more)
- **Built-in Code Editor** — Monaco-powered editor with syntax highlighting to write and run code
- **PostgreSQL Sandbox** — Run SQL queries directly in the browser with PGLite
- **Progress Tracking** — Mark topics as complete and monitor your learning journey
- **Dark / Light Mode** — Seamless theme switching with next-themes
- **AI Topic Assistant** — Ask questions and get explanations for any topic
- **Responsive Design** — Optimized for desktop and mobile devices
- **LeetCode Integration** — Direct links to practice problems for each DSA topic

## Topics Covered

| Category | Topics | What You'll Learn |
|----------|-------|-------------------|
| **HTML** | 72 | Semantic HTML, accessibility (ARIA), forms, HTML5 APIs, SEO meta tags |
| **CSS** | 68 | Flexbox, Grid, animations, responsive design, specificity, custom properties |
| **JavaScript** | 80 | Closures, prototypes, event loop, async/await, promises, ES6+, DOM, Web APIs |
| **DSA (JavaScript)** | 64 | Arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, DP |
| **Python** | 78 | Data structures, OOP, decorators, generators, file I/O, standard library |
| **PostgreSQL** | 76 | Queries, joins, indexes, normalization, transactions, window functions, CTEs |
| **React** | 15 | Components, state, props, hooks, context, custom hooks, performance |
| **System Design** | — | Design principles, scalability, databases, caching, load balancing |
| **Technical Questions** | — | Framework-specific Q&A (Next.js, Node.js, general engineering) |

Each topic includes:
- Clear concept explanations with real-life analogies
- Interactive visualizations with step-by-step controls
- Code examples with live editor
- Common interview questions with hints

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) (App Router) | Framework |
| [TypeScript](https://www.typescriptlang.org/) | Language |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) | Component library |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide React](https://lucide.dev/) | Icons |
| [Monaco Editor](https://microsoft.github.io/monaco-editor/) | Code editor |
| [PGLite](https://pglite.dev/) | In-browser PostgreSQL |
| [Clerk](https://clerk.com/) | Authentication |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme switching |
| [Vitest](https://vitest.dev/) | Testing |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/sangisapusaiteja/InterviewHandbook.git
cd InterviewHandbook
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app will auto-reload on edits.

### Production Build

```bash
npm run build
npm run start
```

### Testing

```bash
npm test
```

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── (auth)/               # Sign-in / Sign-up
│   ├── (main)/               # Main app pages (all categories)
│   └── api/                  # API routes (progress, preferences, assistant)
├── components/               # React components
│   ├── css/visualizations/   # 68 CSS interactive visualizations
│   ├── dsa/visualizations/   # 67 DSA algorithm visualizations
│   ├── dsa/stepcharts/       # Step-by-step code execution charts
│   ├── html/visualizations/  # 52 HTML visualizations
│   ├── javascript/visualizations/  # 86 JavaScript visualizations
│   ├── python/visualizations/     # 78 Python visualizations
│   ├── postgresql/visualizations/ # 83 PostgreSQL visualizations
│   ├── react/visualizations/      # 15 React visualizations
│   ├── layout/               # Navbar, sidebar, search
│   └── ui/                   # shadcn/ui primitives
├── data/                     # Topic content definitions
├── types/                    # TypeScript type definitions
├── hooks/                    # Custom React hooks
├── contexts/                 # React context providers
├── lib/                      # Utilities (Clerk theme, Supabase, search)
├── providers/                # Theme provider
└── test/                     # Test setup and data tests
```

## Screenshots

<!-- Add screenshots here once available -->

| Dashboard | Topic Page | Visualization |
|-----------|------------|--------------|
| *Coming soon* | *Coming soon* | *Coming soon* |

## Roadmap

- [x] 400+ topics across 9 categories
- [x] Interactive algorithm visualizations
- [x] Code editor with live execution
- [x] PostgreSQL in-browser sandbox
- [x] Progress tracking
- [ ] Spaced repetition review mode
- [ ] Daily interview questions
- [ ] Flashcards for quick review
- [ ] Offline mode (PWA)
- [ ] Community discussion per topic

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is for educational purposes.
