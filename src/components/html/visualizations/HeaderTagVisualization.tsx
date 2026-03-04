"use client";

import { SemanticTagVisualization } from "./SemanticTagVisualization";

export function HeaderTagVisualization() {
  return (
    <SemanticTagVisualization
      tag="<header>"
      ariaRole="banner"
      description="Contains introductory content — site logo, title, primary navigation, search bar, and login buttons. The page-level header gets the ARIA 'banner' landmark role."
      canHaveMultiple={true}
      allowedParents="Direct child of <body> for page header. Also valid inside <article> or <section> for section-specific headers."
      keyRule="Cannot nest a <header> inside another <header> or inside a <footer>."
      screenReaderAnnouncement="Banner landmark — MySite"
      benefits={[
        { category: "Accessibility", benefit: "Screen readers announce 'banner landmark' and let users jump directly to the site header" },
        { category: "Accessibility", benefit: "Users can quickly find the site navigation and branding without reading through content" },
        { category: "SEO", benefit: "Search engines identify the site branding area and navigation structure from <header>" },
        { category: "SEO", benefit: "Helps search engines understand the site hierarchy and page purpose" },
        { category: "Code Quality", benefit: "Self-documenting — <header> is immediately clear vs <div class='header'>" },
        { category: "Code Quality", benefit: "Creates a consistent pattern across pages for the introductory area" },
      ]}
      codeExample={{
        nonSemantic: `<div class="header">\n  <div class="logo">MySite</div>\n  <div class="nav">...</div>\n</div>`,
        semantic: `<header>\n  <h1>MySite</h1>\n  <nav>...</nav>\n</header>`,
      }}
    />
  );
}
