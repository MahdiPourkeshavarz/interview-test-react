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
}

export interface resultData {
  user: string;
  topic: string;
  result: Result;
}
export interface Result {
  right?: questionData[] | null;
  wrong?: questionData[] | null;
  withoutAnswer?: questionData[] | null;
}
