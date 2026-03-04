"use client";

import { SemanticTagVisualization } from "./SemanticTagVisualization";

export function NavTagVisualization() {
  return (
    <SemanticTagVisualization
      tag="<nav>"
      ariaRole="navigation"
      description="Wraps major navigation blocks — primary menus, breadcrumbs, pagination, sidebar navigation. Use aria-label to distinguish multiple <nav> elements."
      canHaveMultiple={true}
      allowedParents="Anywhere — inside <header>, <aside>, or standalone. Use aria-label to differentiate multiple instances."
      keyRule="Only for MAJOR navigation blocks — not every group of links needs <nav>."
      screenReaderAnnouncement="Primary navigation landmark, 4 items"
      benefits={[
        { category: "Accessibility", benefit: "Screen readers announce 'navigation landmark' — users can jump directly to menus" },
        { category: "Accessibility", benefit: "With aria-label, users distinguish 'Primary navigation' from 'Footer navigation'" },
        { category: "SEO", benefit: "Search engines identify navigation links and may exclude them from content indexing" },
        { category: "SEO", benefit: "Helps search engines understand site structure and page relationships" },
        { category: "Code Quality", benefit: "<nav> is instantly recognizable vs <div class='menu-wrapper'>" },
        { category: "Code Quality", benefit: "Pattern: <nav> → <ul> → <li> → <a> is a universally understood navigation structure" },
      ]}
      codeExample={{
        nonSemantic: `<div class="nav">\n  <div class="nav-item">\n    <a href="/">Home</a>\n  </div>\n</div>`,
        semantic: `<nav aria-label="Primary">\n  <ul>\n    <li><a href="/">Home</a></li>\n  </ul>\n</nav>`,
      }}
    />
  );
}
