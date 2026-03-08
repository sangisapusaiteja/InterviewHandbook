export interface PostgreSQLTopic {
  id: string;
  title: string;
  slug: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  concept: PostgreSQLTopicConcept;
  code: PostgreSQLTopicCode;
  interviewQuestions: PostgreSQLInterviewQuestion[];
}

export interface PostgreSQLTopicConcept {
  explanation: string;
  realLifeAnalogy: string;
  keyPoints: string[];
}

export interface PostgreSQLTopicCode {
  defaultCode: string;
  language: string;
}

export interface PostgreSQLInterviewQuestion {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  hint: string;
}

export interface PostgreSQLModule {
  id: string;
  level: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  topicIds: string[];
}
