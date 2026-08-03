"use client";

import { SemanticTagVisualization } from "./SemanticTagVisualization";

export function ArticleTagVisualization() {
  return (
    <SemanticTagVisualization
      tag="<article>"
      ariaRole="article"
      description="Self-contained, independently distributable content. Test: would it make sense in an RSS feed or on another site? Blog posts, news articles, comments, product cards, forum posts."
      canHaveMultiple={true}
      allowedParents="Inside <main>, <section>, or nested inside another <article> (e.g., comments inside a blog post)."
      keyRule="Content must be self-contained — it should make sense if extracted and displayed independently, such as in an RSS feed."
      screenReaderAnnouncement="Article — Why Semantic HTML Matters"
      benefits={[
        { category: "Accessibility", benefit: "Screen readers announce 'article' — users know this is independent, self-contained content" },
        { category: "Accessibility", benefit: "Users can navigate between articles on a page (blog list, comment threads)" },
        { category: "SEO", benefit: "Google identifies <article> content for featured snippets and Google News" },
        { category: "SEO", benefit: "Content inside <article> gets higher ranking weight than generic <div> content" },
        { category: "Code Quality", benefit: "Clear intent — <article> means 'this stands on its own' vs vague <div class='post'>" },
        { category: "Code Quality", benefit: "Can have its own <header> and <footer> for metadata — clean self-contained structure" },
      ]}
      codeExample={{
        nonSemantic: `<div class="blog-post">\n  <div class="post-title">Title</div>\n  <div class="post-body">...</div>\n</div>`,
        semantic: `<article>\n  <header>\n    <h2>Title</h2>\n    <time>March 4, 2026</time>\n  </header>\n  <p>...</p>\n</article>`,
      }}
    />
  );
}
