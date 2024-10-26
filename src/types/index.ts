export interface topicData {
  name: string;
  timeUnit: string;
  imgSrc?: string;
  participants?: string;
  id?: number;
}

export interface userData {
  email: string;
  password: string;
  username: string;
  createpassword?: string;
  repeatpassword?: string;
}

export interface questionData {
  topic: string;
  title: string;
  right: string;
  options: string[];
  id?: number;
}

export interface resultData {
  username: string;
  topic: string;
  numberofquestions: string;
  result: Result;
  id?: number;
}

export interface Result {
  right?: questionData[] | null;
  wrong?: questionData[] | null;
  withoutAnswer?: questionData[] | null;
}

export interface StoreState {
  theme: string;
  toggleTheme: () => void;
  activeNav: string;
  setActiveNav: (link: string) => void;
  clearStore: () => void;
  username: string;
  setUsername: (name: string) => void;
  currentTest: TestData | null;
  setCurrentTest: (testData: TestData | null) => void;
}

interface TestData {
  answers: string[];
  questions?: questionData[];
}
