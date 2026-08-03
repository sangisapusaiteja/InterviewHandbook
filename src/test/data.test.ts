import { describe, it, expect } from "vitest";
import { categories } from "@/data/categories";
import { technicalTopics, technicalModules } from "@/data/technical";

describe("categories", () => {
  it("has all required fields", () => {
    for (const cat of categories) {
      expect(cat.id).toBeTruthy();
      expect(cat.title).toBeTruthy();
      expect(cat.icon).toBeTruthy();
      expect(cat.color).toMatch(/^from-/);
      expect(typeof cat.available).toBe("boolean");
      expect(cat.group).toBeTruthy();
    }
  });

  it("has no empty topic counts for available categories", () => {
    for (const cat of categories) {
      if (cat.available) {
        expect(cat.topicCount).toBeGreaterThan(0);
      }
    }
  });
});

describe("technical topics", () => {
  it("has no modules with empty topicIds", () => {
    for (const mod of technicalModules) {
      expect(mod.topicIds.length).toBeGreaterThan(0);
    }
  });

  it("every module topicId has a matching topic", () => {
    const topicIds = new Set(technicalTopics.map((t) => t.id));
    for (const mod of technicalModules) {
      for (const id of mod.topicIds) {
        expect(topicIds.has(id)).toBe(true);
      }
    }
  });

  it("every topic has required fields", () => {
    for (const topic of technicalTopics) {
      expect(topic.id).toBeTruthy();
      expect(topic.slug).toBeTruthy();
      expect(topic.title).toBeTruthy();
      expect(topic.difficulty).toMatch(/^(Beginner|Intermediate|Advanced)$/);
      expect(topic.concept.explanation).toBeTruthy();
      expect(topic.concept.realLifeAnalogy).toBeTruthy();
      expect(topic.concept.keyPoints.length).toBeGreaterThan(0);
      expect(topic.code.defaultCode).toBeTruthy();
      expect(topic.interviewQuestions.length).toBeGreaterThan(0);
    }
  });
});
