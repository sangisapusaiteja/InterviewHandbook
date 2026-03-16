export interface PythonProblemTopic {
  id: string;
  title: string;
  slug: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  concept: PythonProblemConcept;
  code: PythonProblemCode;
  interviewQuestions: PythonProblemQuestion[];
}

export interface PythonProblemConcept {
  explanation: string;
  realLifeAnalogy: string;
  keyPoints: string[];
}

export interface PythonProblemCode {
  defaultCode: string;
  language: string;
}

export interface PythonProblemQuestion {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  hint: string;
}

export interface PythonProblemModule {
  id: string;
  level: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  topicIds: string[];
}
