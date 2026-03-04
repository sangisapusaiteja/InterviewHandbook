export interface HTMLTopic {
  id: string;
  title: string;
  slug: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  concept: HTMLTopicConcept;
  code: HTMLTopicCode;
  interviewQuestions: HTMLInterviewQuestion[];
}

export interface HTMLTopicConcept {
  explanation: string;
  realLifeAnalogy: string;
  keyPoints: string[];
}

export interface HTMLTopicCode {
  defaultCode: string;
  language: string;
}

export interface HTMLInterviewQuestion {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  hint: string;
}

export interface HTMLModule {
  id: string;
  level: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  topicIds: string[];
}
