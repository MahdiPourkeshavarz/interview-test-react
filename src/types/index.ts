export interface topicData {
  name: string;
  quantity: number;
  timeUnit: number;
}

export interface userData {
  email: string;
  password: string;
  username: string;
}

export interface questionData {
  topic: string;
  title: string;
  right: string;
  a: string;
  b: string;
  c: string;
  d: string;
  id?: number;
}

export interface resultData {
  username: string;
  topic: string;
  result: Result;
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
}
