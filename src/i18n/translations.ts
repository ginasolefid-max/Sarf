import { Language } from '../types/arabic';

export type NavSection =
  | 'dashboard'
  | 'sarf_textbook'
  | 'nahu_textbook'
  | 'tasreef'
  | 'irab'
  | 'sarf_dict'
  | 'nahu_dict'
  | 'vocab_dict'
  | 'practice'
  | 'exams'
  | 'review'
  | 'bookmarks'
  | 'progress'
  | 'settings';

export const UI_LABELS: Record<string, Record<Language, string>> = {
  appName: {
    ar: 'رفيق الصرف والنحو — الإصدار السادس',
    en: 'Sarf Companion V6',
    tl: 'Sarf Companion V6',
  },
  dashboard: { ar: 'لوحة التعلم', en: 'Dashboard', tl: 'Dashboard' },
  sarf_textbook: { ar: 'كتاب الصرف', en: 'Sarf Textbook', tl: 'Aklat ng Sarf' },
  nahu_textbook: { ar: 'كتاب النحو', en: 'Nahu Textbook', tl: 'Aklat ng Nahu' },
  tasreef: { ar: 'محرك التصريف', en: 'Tasreef Engine', tl: 'Tasreef Engine' },
  irab: { ar: 'محلل الإعراب', en: "I'rab Analyzer", tl: "I'rab Analyzer" },
  sarf_dict: { ar: 'معجم الصرف', en: 'Sarf Dictionary', tl: 'Diksiyonaryo ng Sarf' },
  nahu_dict: { ar: 'معجم النحو', en: 'Nahu Dictionary', tl: 'Diksiyonaryo ng Nahu' },
  vocab_dict: { ar: 'معجم المفردات', en: 'Arabic Vocabulary', tl: 'Bokabularyo' },
  practice: { ar: 'مركز التدريب', en: 'Practice Center', tl: 'Sentro ng Pagsasanay' },
  exams: { ar: 'الاختبارات', en: 'Examinations', tl: 'Mga Pagsusulit' },
  review: { ar: 'المراجعة المتباعدة', en: 'Daily Review (SRS)', tl: 'Araw-araw na Rebyu' },
  bookmarks: { ar: 'المحفوظات', en: 'Bookmarks', tl: 'Mga Bookmark' },
  progress: { ar: 'التقدم الدراسي', en: 'Progress', tl: 'Progreso' },
  settings: { ar: 'الإعدادات', en: 'Settings', tl: 'Mga Setting' },
  continueLearning: { ar: 'تابع التعلم', en: 'Continue Learning', tl: 'Ipagpatuloy ang Pag-aaral' },
  sarfProgress: { ar: 'تقدم علم الصرف', en: 'Sarf Mastery', tl: 'Progreso sa Sarf' },
  nahuProgress: { ar: 'تقدم علم النحو', en: 'Nahu Mastery', tl: 'Progreso sa Nahu' },
  dailyReview: { ar: 'المراجعة اليومية', en: 'Due for Review', tl: 'Nakatakdang Rebyu' },
  weakSubjects: { ar: 'موضوعات تحتاج تعزيزًا', en: 'Focus Areas', tl: 'Mga Paksang Kailangan ng Pagsasanay' },
  quickTools: { ar: 'أدوات التحليل المباشر', en: 'Interactive Analyzers', tl: 'Mga Interactive Tool' },
  verified: { ar: 'موثق علميًا', en: 'Verified', tl: 'Beripikado' },
  needsReview: { ar: 'بحاجة لمراجعة', en: 'Needs Review', tl: 'Kailangan ng Pagsusuri' },
  corrected: { ar: 'مصحح', en: 'Corrected', tl: 'Itinama' },
  unverified: { ar: 'غير موثق', en: 'Unverified', tl: 'Hindi pa Beripikado' },
  exportPdf: { ar: 'تصدير PDF / طباعة', en: 'Export PDF / Print', tl: 'I-export bilang PDF' },
  saveFavorite: { ar: 'حفظ في المفضلة', en: 'Bookmark', tl: 'I-bookmark' },
  saved: { ar: 'محفوظ', en: 'Bookmarked', tl: 'Naka-bookmark' },
  searchPlaceholder: { ar: 'ابحث بالعربية أو الإنجليزية أو التاغالوغية...', en: 'Search Arabic, English, or Filipino...', tl: 'Maghanap sa Arabic, English, o Filipino...' },
  chapterQuiz: { ar: 'اختبار الفصل', en: 'Chapter Quiz', tl: 'Pagsusulit sa Kabanata' },
  markCompleted: { ar: 'تحديد كمكتمل', en: 'Mark Completed', tl: 'Markahan bilang Tapos' },
  completed: { ar: 'مكتمل', en: 'Completed', tl: 'Tapos na' },
  checkAnswer: { ar: 'تحقق من الإجابة', en: 'Check Answer', tl: 'Suriin ang Sagot' },
  nextQuestion: { ar: 'السؤال التالي', en: 'Next Question', tl: 'Susunod na Tanong' },
  installApp: { ar: 'تثبيت التطبيق', en: 'Install App', tl: 'I-install ang App' },
  offlineBadge: { ar: 'وضع عدم الاتصال — يعمل بكامل البيانات المحلية', en: 'Offline Mode — All local curricula & engines active', tl: 'Offline Mode — Gumagana nang walang internet' },
};

export function t(key: string, lang: Language): string {
  return UI_LABELS[key]?.[lang] ?? UI_LABELS[key]?.en ?? key;
}

export function pickText(text: { ar: string; en: string; tl: string }, lang: Language): string {
  return text[lang] || text.en || text.ar;
}
