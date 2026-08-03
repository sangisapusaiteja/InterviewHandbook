"use client";

import { SemanticTagVisualization } from "./SemanticTagVisualization";

export function MainTagVisualization() {
  return (
    <SemanticTagVisualization
      tag="<main>"
      ariaRole="main"
      description="The primary, unique content of the page. Excludes repeating elements (header, nav, sidebar, footer). Only ONE visible <main> per page. THE most important landmark for accessibility."
      canHaveMultiple={false}
      allowedParents="Direct child of <body>. Must NOT be inside <article>, <aside>, <footer>, <header>, or <nav>."
      keyRule="Only one visible <main> per page. Must NOT be a descendant of <article>, <aside>, <footer>, <header>, or <nav>."
      screenReaderAnnouncement="Main landmark"
      benefits={[
        { category: "Accessibility", benefit: "THE primary landmark — screen readers jump to <main> with one keystroke, skipping all navigation" },
        { category: "Accessibility", benefit: "Solves the 'skip to content' problem — keyboard users bypass header and nav instantly" },
        { category: "SEO", benefit: "Content inside <main> gets the HIGHEST ranking weight from search engines" },
        { category: "SEO", benefit: "Google focuses on <main> content for featured snippets and page topic analysis" },
        { category: "Code Quality", benefit: "Clearly separates unique page content from repeating site-wide elements" },
        { category: "Code Quality", benefit: "Forces good architecture — unique content in <main>, boilerplate outside" },
      ]}
      codeExample={{
        nonSemantic: `<div class="content">\n  <div class="page-body">\n    <h1>Page Title</h1>\n    <p>Content...</p>\n  </div>\n</div>`,
        semantic: `<main id="main-content">\n  <h1>Page Title</h1>\n  <p>Content...</p>\n</main>`,
      }}
    />
  );
}
