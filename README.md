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

- **500+ Topics** across 9 categories — HTML, CSS, JavaScript, DSA, Python, PostgreSQL, React, System Design, and Technical Questions
- **Interactive Visualizations** — Step-by-step animated walkthroughs for algorithms (Two Sum, Dijkstra, Flood Fill, Merge Sort, and 60+ more)
- **Built-in Code Editor** — Monaco-powered editor with syntax highlighting to write and run code
- **PostgreSQL Sandbox** — Run SQL queries directly in the browser with PGLite
- **Progress Tracking** — Mark topics as complete and monitor your learning journey
- **Progress Analytics** — Streaks, activity heatmap, and badges on the progress dashboard
- **Dark / Light Mode** — Seamless theme switching with next-themes
- **AI Topic Assistant (AJet)** — Ask questions and get explanations for any topic
- **Username + Password Accounts** — Custom auth backed by Supabase (no third-party provider)
- **Responsive Design** — Optimized for desktop and mobile devices
- **LeetCode Integration** — Direct links to practice problems for each DSA topic

## Topics Covered

| Category | Topics | What You'll Learn |
|----------|-------|-------------------|
| **HTML** | 49 | Semantic HTML, accessibility (ARIA), forms, HTML5 APIs, SEO meta tags |
| **CSS** | 52 | Flexbox, Grid, animations, responsive design, specificity, custom properties |
| **JavaScript** | 80 | Closures, prototypes, event loop, async/await, promises, ES6+, DOM, Web APIs |
| **DSA (JavaScript)** | 64 | Arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, DP |
| **Python** | 98 | Data structures, OOP, decorators, generators, file I/O, standard library |
| **PostgreSQL** | 76 | Queries, joins, indexes, normalization, transactions, window functions, CTEs |
| **React** | 18 | Components, state, props, hooks, context, custom hooks, performance |
| **System Design** | 52 | Design principles, scalability, databases, caching, load balancing |
| **Technical Questions** | 12 | Framework-specific Q&A (JavaScript, React, TypeScript, Next.js) |

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
| [Supabase](https://supabase.com/) | Accounts, progress sync & preferences |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme switching |
| [Vitest](https://vitest.dev/) | Testing |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- A [Supabase](https://supabase.com/) project (for accounts, progress sync, and preferences)

### Installation

```bash
git clone https://github.com/sangisapusaiteja/InterviewHandbook.git
cd InterviewHandbook
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key (server-side only) |
| `GEMINI_API_KEY` | Google AI Studio key for the AJet assistant |
| `GEMINI_MODEL` | Optional — defaults to `gemini-2.5-flash-lite` |

### Database Setup

Run the SQL in [`supabase/schema.sql`](./supabase/schema.sql) in the Supabase SQL Editor. This creates the `auth_users`, `auth_sessions`, `user_topic_progress`, and `user_preferences` tables.

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
│   └── api/                  # API routes (auth, progress, preferences, assistant)
├── components/               # React components
│   ├── css/visualizations/   # CSS interactive visualizations
│   ├── dsa/visualizations/    # DSA algorithm visualizations
│   ├── dsa/stepcharts/       # Step-by-step code execution charts
│   ├── html/visualizations/  # HTML visualizations
│   ├── javascript/visualizations/  # JavaScript visualizations
│   ├── python/visualizations/       # Python visualizations
│   ├── postgresql/visualizations/  # PostgreSQL visualizations
│   ├── react/visualizations/       # React visualizations
│   ├── layout/               # Navbar, sidebar, search, user menu
│   └── ui/                   # shadcn/ui primitives
├── data/                     # Topic content definitions
├── types/                    # TypeScript type definitions
├── hooks/                    # Custom React hooks
├── contexts/                 # React context providers (auth, sidebar)
├── lib/                      # Utilities (auth, Supabase, progress, search)
├── providers/                # Theme provider
└── test/                     # Test setup and data tests
```

## Screenshots

<!-- Add screenshots here once available -->

| Dashboard | Topic Page | Visualization |
|-----------|------------|--------------|
| *Coming soon* | *Coming soon* | *Coming soon* |

## Roadmap

- [x] 500+ topics across 9 categories
- [x] Interactive algorithm visualizations
- [x] Code editor with live execution
- [x] PostgreSQL in-browser sandbox
- [x] Progress tracking & analytics
- [x] Username + password accounts (Supabase)
- [ ] Spaced repetition review mode
- [ ] Daily interview questions
- [ ] Flashcards for quick review
- [ ] Offline mode (PWA)
- [ ] Community discussion per topic

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is for educational purposes.
