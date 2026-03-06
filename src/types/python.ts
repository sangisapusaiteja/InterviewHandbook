export interface PythonTopic {
  id: string;
  title: string;
  slug: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  concept: PythonTopicConcept;
  code: PythonTopicCode;
  interviewQuestions: PythonInterviewQuestion[];
}

export interface PythonTopicConcept {
  explanation: string;
  realLifeAnalogy: string;
  keyPoints: string[];
}

export interface PythonTopicCode {
  defaultCode: string;
  language: string;
}

export interface PythonInterviewQuestion {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  hint: string;
}

export interface PythonModule {
  id: string;
  level: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  topicIds: string[];
}
