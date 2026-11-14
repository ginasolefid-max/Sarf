export type Language = 'ar' | 'en' | 'tl';

export interface TrilingualText {
  ar: string;
  en: string;
  tl: string;
}

export type VerificationStatus = 'verified' | 'needs_review' | 'corrected' | 'unverified';

export interface AcademicMeta {
  status: VerificationStatus;
  sources: string[];
  qiyasiVsSamaai?: 'قياسي' | 'سماعي' | 'قياسي وسماعي';
  scholarlyNote?: TrilingualText;
}

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
  | 'QII';

export type VerbClassification =
  | 'sound'
  | 'mahmuz_fa'
  | 'mahmuz_ayn'
  | 'mahmuz_lam'
  | 'mudaaf'
  | 'mithal_wawi'
  | 'mithal_yayi'
  | 'ajwaf_wawi'
  | 'ajwaf_yayi'
  | 'naqis_wawi'
  | 'naqis_yayi'
  | 'lafif_mafruq'
  | 'lafif_maqrun';

export type FormIBab =
  | 'فَعَلَ يَفْعُلُ'
  | 'فَعَلَ يَفْعِلُ'
  | 'فَعَلَ يَفْعَلُ'
  | 'فَعِلَ يَفْعَلُ'
  | 'فَعِلَ يَفْعِلُ'
  | 'فَعُلَ يَفْعُلُ';

export type VerbTransitivity = 'mutaaddi' | 'lazim' | 'both';

export interface VerbEntry {
  id: string;
  root: string;
  radicals: string[];
  past: string;
  present: string;
  imperative: string;
  masdar: string;
  ismFail?: string;
  ismMaful?: string;
  ismZamanMakan?: string;
  ismAlah?: string;
  ismTafdil?: string;
  form: VerbForm;
  bab?: FormIBab;
  classification: VerbClassification;
  transitivity: VerbTransitivity;
  meaning: TrilingualText;
  example: TrilingualText;
  morphologicalNotes?: TrilingualText;
  meta: AcademicMeta;
}

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

export type ConjugationCategory =
  | 'madhi'
  | 'mudhari'
  | 'amr'
  | 'nahy'
  | 'mansub'
  | 'majzum'
  | 'passive_madhi'
  | 'passive_mudhari';

export interface ConjugatedCell {
  pronounKey: PronounKey;
  pronounAr: string;
  pronounLabelEn: string;
  pronounLabelTl: string;
  person: '3rd' | '2nd' | '1st';
  gender: 'M' | 'F' | 'M/F';
  number: 'Singular' | 'Dual' | 'Plural';
  arabic: string;
  transliteration: string;
  meaningEn: string;
  meaningTl: string;
  ruleNote: string;
  applicable: boolean;
}

export interface DerivedNounResult {
  category: 'masdar' | 'ism_fail' | 'ism_maful' | 'ism_zaman' | 'ism_makan' | 'ism_alah' | 'ism_tafdil';
  arabicTitle: string;
  englishTitle: string;
  filipinoTitle: string;
  form: string;
  pattern: string;
  applicable: boolean;
  verified: boolean;
  note: TrilingualText;
}

export interface TasreefOutput {
  verb: VerbEntry;
  tables: Record<ConjugationCategory, ConjugatedCell[]>;
  derived: DerivedNounResult[];
  transformationSteps: TrilingualText[];
  isConfidenceVerified: boolean;
  verificationNotice?: TrilingualText;
}

export interface ChapterExample {
  arabic: string;
  transliteration: string;
  translation: TrilingualText;
  analysis: TrilingualText;
  highlightTerm?: string;
}

export interface PatternItem {
  pattern: string;
  example: string;
  meaning: TrilingualText;
  rule: TrilingualText;
}

export interface ClassificationItem {
  titleAr: string;
  titleEn: string;
  titleTl: string;
  description: TrilingualText;
  examples: string[];
}

export interface ChapterExercise {
  id: string;
  prompt: TrilingualText;
  arabicPrompt?: string;
  answer: string;
  explanation: TrilingualText;
}

export type QuestionDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuizQuestion {
  id: string;
  chapterId: string;
  discipline: 'sarf' | 'nahu';
  category: string;
  difficulty: QuestionDifficulty;
  format: 'mcq' | 'tf' | 'fill' | 'correction';
  question: TrilingualText;
  arabicText?: string;
  options: string[];
  correctIndex: number;
  explanation: TrilingualText;
  wrongOptionNotes?: string[];
  meta: AcademicMeta;
}

export interface TextbookChapter {
  id: string;
  number: number;
  discipline: 'sarf' | 'nahu';
  level: QuestionDifficulty;
  titleAr: string;
  titleEn: string;
  titleTl: string;
  objectives: TrilingualText[];
  introduction: TrilingualText;
  definition: {
    arabicTerm: string;
    text: TrilingualText;
  };
  explanation: TrilingualText;
  rules: TrilingualText[];
  classifications: ClassificationItem[];
  patterns: PatternItem[];
  examples: ChapterExample[];
  exceptions: TrilingualText[];
  commonMistakes: TrilingualText[];
  comparison: TrilingualText;
  practicalExercises: ChapterExercise[];
  summary: TrilingualText;
  furtherReading: string[];
  meta: AcademicMeta;
}

export interface NahuTermEntry {
  id: string;
  termAr: string;
  transliteration: string;
  category: string;
  meaningEn: string;
  meaningTl: string;
  definitionAr: string;
  ruleExplanation: TrilingualText;
  example: TrilingualText;
  relatedTerms: string[];
  meta: AcademicMeta;
}

export type VocabCategory =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'particle'
  | 'preposition'
  | 'adverb'
  | 'pronoun'
  | 'demonstrative'
  | 'relative'
  | 'expression';

export interface VocabEntry {
  id: string;
  arabic: string;
  root?: string;
  pluralOrForm?: string;
  category: VocabCategory;
  meaningEn: string;
  meaningTl: string;
  definition: TrilingualText;
  example: TrilingualText;
  relatedWords: string[];
  meta: AcademicMeta;
}

export type IrabState = 'مرفوع' | 'منصوب' | 'مجرور' | 'مجزوم' | 'مبني' | 'غير معرب';

export interface IrabTokenAnalysis {
  index: number;
  word: string;
  normalized: string;
  posAr: string;
  posEn: string;
  roleAr: string;
  roleEn: string;
  roleTl: string;
  irabState: IrabState;
  irabClassification: 'لفظي' | 'تقديري' | 'محلي' | 'مبني';
  markerAr: string;
  markerEn: string;
  amilAr: string;
  amilEn: string;
  relationNote: TrilingualText;
  explanation: TrilingualText;
  confidence: 'deterministic' | 'ambiguous' | 'manual_needed';
  alternatives?: string[];
}

export interface IrabSentenceResult {
  sentence: string;
  sentenceTypeAr: 'جملة فعلية' | 'جملة اسمية' | 'تركيب شرطي' | 'جملة غير مكتملة' | 'تركيب نحوي';
  sentenceTypeEn: string;
  translation: TrilingualText;
  tokens: IrabTokenAnalysis[];
  structuralOverview: TrilingualText;
  hasAmbiguity: boolean;
  limitationNote?: TrilingualText;
  isVerifiedPreset: boolean;
}

export interface SRSCard {
  id: string;
  deck: 'vocab' | 'conjugation' | 'grammar' | 'irab' | 'particles' | 'mistakes';
  frontAr: string;
  frontHint?: string;
  backEn: string;
  backTl: string;
  backAr: string;
  exampleAr?: string;
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  nextReviewAt: number;
  lastReviewedAt?: number;
}

export interface ExamAttempt {
  id: string;
  mode: string;
  discipline: 'sarf' | 'nahu' | 'combined';
  score: number;
  total: number;
  percentage: number;
  weakTopics: string[];
  completedAt: number;
}

export interface BookmarkItem {
  id: string;
  type: 'chapter' | 'verb' | 'nahu_term' | 'vocab' | 'sentence';
  refId: string;
  titleAr: string;
  subtitle: string;
  savedAt: number;
}

export interface AppSettings {
  language: Language;
  theme: 'light' | 'dark';
  showHarakat: boolean;
  showTransliteration: boolean;
  arabicFontSize: 'normal' | 'large' | 'xlarge';
}

export interface UserProgress {
  schemaVersion: number;
  completedChapters: string[];
  quizScores: Record<string, { best: number; total: number; attempts: number }>;
  incorrectQuestionIds: string[];
  weakTopics: Record<string, number>;
  strongTopics: Record<string, number>;
  streakDays: number;
  lastStudyDate: string;
  recentActivities: { id: string; title: string; type: string; timestamp: number }[];
  examHistory: ExamAttempt[];
  bookmarks: BookmarkItem[];
  favoriteVerbIds: string[];
  srsCards: Record<string, SRSCard>;
  settings: AppSettings;
}
