export interface JavaScriptTopic {
  id: string;
  title: string;
  slug: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  concept: JavaScriptTopicConcept;
  code: JavaScriptTopicCode;
  interviewQuestions: JavaScriptInterviewQuestion[];
}

export interface JavaScriptTopicConcept {
  explanation: string;
  realLifeAnalogy: string;
  keyPoints: string[];
}

export interface JavaScriptTopicCode {
  defaultCode: string;
  language: string;
}

export interface JavaScriptInterviewQuestion {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  hint: string;
}

export interface JavaScriptModule {
  id: string;
  level: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  topicIds: string[];
}
