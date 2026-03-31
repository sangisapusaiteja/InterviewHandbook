export interface Topic {
  id: string;
  title: string;
  slug: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  leetcodeLink?: string;
  concept: TopicConcept;
  code: TopicCode;
  interviewQuestions: InterviewQuestion[];
}

export interface TopicConcept {
  explanation: string;
  realLifeAnalogy: string;
  keyPoints: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
}

export interface TopicCode {
  defaultCode: string;
  language: string;
  files?: TopicCodeFile[];
}

export interface TopicCodeFile {
  name: string;
  language: string;
  content: string;
}

export interface InterviewQuestion {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  hint: string;
}

export interface CategoryInfo {
  id: string;
  title: string;
  icon: string;
  description: string;
  topicCount: number;
  color: string;
  available: boolean;
}

export interface ProgressState {
  completedTopics: string[];
  lastVisited?: string;
}

export interface TopicModule {
  id: string;
  level: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  topicIds: string[];
}
