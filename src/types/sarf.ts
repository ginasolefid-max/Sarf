export type VerbForm =
  | 'I'
  | 'II'
  | 'III'
  | 'IV'
  | 'V'
  | 'VI'
  | 'VII'
  | 'VIII'
  | 'IX'
  | 'X'
  | 'QI'
  | 'QII'
  | 'QIII'
  | 'QIV';

export type VerbType =
  | 'sound'
  | 'hollow'
  | 'defective'
  | 'assimilated'
  | 'doubled'
  | 'hamzated';

export type Transitivity = 'transitive' | 'intransitive' | 'both';
export type VerbSource = 'seed' | 'user' | 'online-verified';

export type PronounKey =
  | 'huwa'
  | 'huma_m'
  | 'hum'
  | 'hiya'
  | 'huma_f'
  | 'hunna'
  | 'anta'
  | 'antuma_m'
  | 'antum'
  | 'anti'
  | 'antuma_f'
  | 'antunna'
  | 'ana'
  | 'nahnu';

export type AmrPronounKey =
  | 'anta'
  | 'antuma_m'
  | 'antum'
  | 'anti'
  | 'antuma_f'
  | 'antunna';

export interface VerbExample {
  ar: string;
  en: string;
}

export interface ConjugationOverrides {
  madhi?: Partial<Record<PronounKey, string>>;
  mudhari?: Partial<Record<PronounKey, string>>;
  majzum?: Partial<Record<PronounKey, string>>;
  mansub?: Partial<Record<PronounKey, string>>;
  amr?: Partial<Record<AmrPronounKey, string>>;
  nahy?: Partial<Record<AmrPronounKey, string>>;
}

export interface VerbEntry {
  id: string;
  root: string;
  madhi: string;
  mudhari: string;
  masdar: string;
  ismFail: string;
  ismMaful: string;
  amr: string;
  nahy: string;
  ismZamanMakan?: string;
  ismAlah?: string;
  form: VerbForm;
  letters: 3 | 4;
  bab: string;
  verbType: VerbType;
  transitivity: Transitivity;
  meanings: string[];
  examples: VerbExample[];
  tags: string[];
  source: VerbSource;
  overrides?: ConjugationOverrides;
  createdAt?: number;
}

export interface ConjugationTable {
  madhi: Record<PronounKey, string>;
  mudhari: Record<PronounKey, string>;
  mansub: Record<PronounKey, string>;
  majzum: Record<PronounKey, string>;
  amr: Record<AmrPronounKey, string>;
  nahy: Record<AmrPronounKey, string>;
  derived: {
    masdar: string;
    ismFail: string;
    ismMaful: string;
    ismZamanMakan?: string;
    ismAlah?: string;
  };
}

export interface FlashcardProgress {
  verbId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: number;
  lastReviewed?: number;
}

export interface VerbNote {
  verbId: string;
  note: string;
  updatedAt: number;
}

export interface SearchHistoryItem {
  id?: number;
  query: string;
  verbId?: string;
  timestamp: number;
}

export interface BookProgress {
  chapterId: string;
  read: boolean;
  bookmarked: boolean;
  quizScore?: number;
  updatedAt: number;
}

export interface OfflineVerifyQueueItem {
  id?: number;
  query: string;
  status: 'pending' | 'processing' | 'ready' | 'error';
  result?: VerbEntry;
  error?: string;
  createdAt: number;
}

export interface StudyStat {
  date: string; // YYYY-MM-DD
  reviews: number;
  quizzes: number;
  drills: number;
}

export type ArabicFontFamily = 'amiri' | 'noto' | 'scheherazade';

export interface AppSettings {
  theme: 'light' | 'dark';
  rtlLayout: boolean;
  arabicFont: ArabicFontFamily;
  arabicFontSize: number; // 20 - 38
  ttsRate: number; // 0.5 - 1.5
  ttsRepeat: number; // 1 - 3
  geminiApiKey: string;
  geminiModel: string;
}
