export type ReflexResult = {
  transcript: string;
  score: number;
  matched: boolean;
  provider: string;
  phrase: {
    id: string;
    vietnamese: string;
    chinese: string;
    pinyin: string;
  };
};

export const PASS_THRESHOLD = 75;

export type SummaryError = {
  said: string;
  shouldSay: string;
  explanationVi: string;
};

export type SummaryPractice = {
  zh: string;
  pinyin: string;
  vi: string;
};

export type SpeakingSummary = {
  provider: string;
  overview: string;
  strengths: string;
  topErrors: SummaryError[];
  practice: SummaryPractice[];
  encouragement: string;
};
