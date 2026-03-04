export interface CSSTopic {
  id: string;
  title: string;
  slug: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  concept: CSSTopicConcept;
  code: CSSTopicCode;
  interviewQuestions: CSSInterviewQuestion[];
}

export interface CSSTopicConcept {
  explanation: string;
  realLifeAnalogy: string;
  keyPoints: string[];
}

export interface CSSTopicCode {
  defaultCode: string;
  language: string;
}

export interface CSSInterviewQuestion {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  hint: string;
}

export interface CSSModule {
  id: string;
  level: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  topicIds: string[];
}
