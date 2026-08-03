# Interview Handbook

A comprehensive, beginner-friendly interview preparation handbook for software developers. Master key concepts through simple explanations, real-life analogies, interactive visualizations, and curated interview questions.

## Topics Covered

| Category | Topics | Description |
|----------|--------|-------------|
| **HTML** | 72     | Semantic HTML, accessibility, forms, HTML5 APIs |
| **CSS**  | 68     | Layouts, animations, responsive design, Flexbox, Grid |
| **JavaScript**    | 80 | Closures, prototypes, async/await, event loop, ES6+ |
| **DSA (JavaScript)** | 64 | Arrays, linked lists, trees, graphs, sorting, searching, practice problems |
| **Python** | 78 | Fundamentals, data structures, OOP, Pythonic patterns |
| **PostgreSQL** | 76 | Queries, joins, indexing, database design, advanced features |

**400+ topics** across 6 categories, each with:
- Clear concept explanations
- Real-life analogies
- Interactive step-by-step visualizations
- Code examples with built-in editor
- Common interview questions with hints

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Code Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Database (PostgreSQL sandbox):** [PGLite](https://pglite.dev/)
- **Theme:** Dark/Light mode via [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                  # Next.js pages & routes
│   ├── dsa/[topic]/      # DSA topic pages
│   ├── html/[topic]/     # HTML topic pages
│   ├── css/[topic]/      # CSS topic pages
│   ├── javascript/[topic]/ # JavaScript topic pages
│   ├── python/[topic]/   # Python topic pages
│   └── postgresql/[topic]/ # PostgreSQL topic pages
├── components/
│   ├── dsa/              # DSA-specific components
│   │   └── visualizations/ # Interactive algorithm visualizations
│   ├── layout/           # Sidebar, navigation
│   └── ui/               # shadcn/ui components
├── data/                 # Topic content & data
├── types/                # TypeScript type definitions
├── hooks/                # Custom React hooks
├── contexts/             # React context providers
└── lib/                  # Utility functions
```

## Features

- **Interactive Visualizations** — Step-by-step animated algorithm walkthroughs for DSA topics (Two Sum, 3Sum, Flood Fill, Spiral Matrix, and more)
- **Built-in Code Editor** — Monaco-powered editor to write and run JavaScript code
- **Progress Tracking** — Mark topics as complete and track your progress
- **Dark Mode** — Toggle between light and dark themes
- **Responsive** — Desktop sidebar navigation + mobile-friendly layout
- **LeetCode Links** — Direct links to practice problems on LeetCode

## License

This project is for educational purposes.
