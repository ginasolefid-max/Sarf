import { useEffect, useState } from 'react';
import { Award, Clock, Play } from 'lucide-react';
import { ExamAttempt, QuizQuestion, UserProgress } from '../types/arabic';
import { buildExamQuestions } from '../data/quizzesData';
import { pickText, t } from '../i18n/translations';
import { formatArabicDisplay } from './ArabicKeyboardHelper';

interface ExaminationsViewProps {
  progress: UserProgress;
  onFinishExam: (
    attempt: ExamAttempt,
    outcomes: { q: QuizQuestion; ok: boolean }[]
  ) => void;
}

type ExamModeKey =
  | 'sarf'
  | 'nahu'
  | 'combined'
  | 'conjugation'
  | 'irab'
  | 'vocabulary'
  | 'advanced';

const EXAM_MODES: {
  id: ExamModeKey;
  discipline: 'sarf' | 'nahu' | 'combined';
  titleAr: string;
  titleEn: string;
  titleTl: string;
  desc: string;
}[] = [
  { id: 'sarf', discipline: 'sarf', titleAr: 'اختبار علم الصرف', titleEn: 'Sarf Exam', titleTl: 'Pagsusulit sa Sarf', desc: 'Mizan, Verb Forms I–X, Weak Verbs, Masdar & Derived Nouns' },
  { id: 'nahu', discipline: 'nahu', titleAr: 'اختبار علم النحو', titleEn: 'Nahu Exam', titleTl: 'Pagsusulit sa Nahu', desc: 'Sentence structure, Raf\'/Nasb/Jarr/Jazm, Kana/Inna, Idafa' },
  { id: 'combined', discipline: 'combined', titleAr: 'الاختبار الشامل (صرف ونحو)', titleEn: 'Combined Exam', titleTl: 'Pinagsamang Pagsusulit', desc: 'Balanced assessment across Arabic morphology and syntax' },
  { id: 'conjugation', discipline: 'sarf', titleAr: 'اختبار تصريف الأفعال', titleEn: 'Verb Conjugation Exam', titleTl: 'Pagsusulit sa Pagbabanghay', desc: 'Pronoun inflection, weak verb transformations, active & passive' },
  { id: 'irab', discipline: 'nahu', titleAr: 'اختبار الإعراب', titleEn: "I'rab Exam", titleTl: "Pagsusulit sa I'rab", desc: 'Grammatical roles, governors (Amil), markers & Nawasikh' },
  { id: 'vocabulary', discipline: 'sarf', titleAr: 'اختبار المفردات', titleEn: 'Vocabulary Exam', titleTl: 'Pagsusulit sa Bokabularyo', desc: 'Core Arabic nouns, verbs, adjectives, particles & idioms' },
  { id: 'advanced', discipline: 'combined', titleAr: 'اختبار القواعد المتقدمة', titleEn: 'Advanced Grammar Exam', titleTl: 'Masusing Balarila', desc: 'Complex I\'lal, error correction, particles, and clauses' },
];

export function ExaminationsView({
  progress,
  onFinishExam,
}: ExaminationsViewProps) {
  const lang = progress.settings.language;
  const showHarakat = progress.settings.showHarakat;

  const [activeMode, setActiveMode] = useState<ExamModeKey | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timed, setTimed] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(600);

  useEffect(() => {
    if (!activeMode || !timed || submitted) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [activeMode, timed, submitted]);

  const startExam = (mode: ExamModeKey) => {
    const qs = buildExamQuestions(mode, 15);
    setActiveMode(mode);
    setQuestions(qs);
    setAnswers({});
    setSubmitted(false);
    setSecondsLeft(600);
  };

  const handleSubmit = () => {
    if (!activeMode) return;
    const meta = EXAM_MODES.find((m) => m.id === activeMode)!;
    let score = 0;
    const weakSet = new Set<string>();
    const outcomes = questions.map((q) => {
      const ok = answers[q.id] === q.correctIndex;
      if (ok) score++;
      else weakSet.add(q.category);
      return { q, ok };
    });
    const pct = Math.round((score / Math.max(1, questions.length)) * 100);
    const attempt: ExamAttempt = {
      id: `exam-${Date.now()}`,
      mode: lang === 'ar' ? meta.titleAr : meta.titleEn,
      discipline: meta.discipline,
      score,
      total: questions.length,
      percentage: pct,
      weakTopics: Array.from(weakSet),
      completedAt: Date.now(),
    };
    setSubmitted(true);
    onFinishExam(attempt, outcomes);
  };

  if (!activeMode) {
    return (
      <div className="space-y-5">
        <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {t('exams', lang)}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {lang === 'ar'
                ? '٧ أنماط اختبارات تقييمية شاملة مع حفظ النتائج وتحليل نقاط الضعف.'
                : '7 specialized examination modes with optional 10-minute timer and score analytics.'}
            </p>
          </div>
          <label className="inline-flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-stone-300 cursor-pointer">
            <input
              type="checkbox"
              checked={timed}
              onChange={(e) => setTimed(e.target.checked)}
              className="rounded border-stone-300 text-emerald-700"
            />
            <span>10-min Timer Enabled</span>
          </label>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {EXAM_MODES.map((m) => (
            <div
              key={m.id}
              className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400">
                  {m.discipline} · 15 Questions
                </div>
                <h3 className="font-arabic text-xl font-bold text-stone-900 dark:text-stone-50 mt-1">
                  {m.titleAr}
                </h3>
                <div className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                  {lang === 'tl' ? m.titleTl : m.titleEn}
                </div>
                <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-400">
                  {m.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => startExam(m.id)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-800 text-white hover:bg-emerald-700 dark:bg-emerald-600"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'ابدأ الاختبار' : 'Start Exam'}</span>
              </button>
            </div>
          ))}
        </div>

        {progress.examHistory.length > 0 && (
          <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90">
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-3">
              {lang === 'ar' ? 'سجل الاختبارات السابقة' : 'Recent Exam Results'}
            </h3>
            <div className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              {progress.examHistory.slice(0, 6).map((ex) => (
                <div key={ex.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium text-stone-900 dark:text-stone-100">{ex.mode}</div>
                    <div className="text-xs text-stone-500">
                      {new Date(ex.completedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right tabular-nums">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      {ex.percentage}%
                    </span>{' '}
                    <span className="text-xs text-stone-500">
                      ({ex.score}/{ex.total})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  const scoreCount = questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const pct = Math.round((scoreCount / Math.max(1, questions.length)) * 100);
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900/90 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-base text-stone-900 dark:text-stone-100">
            {EXAM_MODES.find((m) => m.id === activeMode)?.titleEn}
          </h2>
          <p className="text-xs text-stone-500">
            Answered: {Object.keys(answers).length}/{questions.length}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {timed && !submitted && (
            <span className="inline-flex items-center gap-1.5 text-sm font-mono font-semibold text-amber-700 dark:text-amber-400 tabular-nums">
              <Clock className="w-4 h-4" />
              {mins}:{secs}
            </span>
          )}
          <button
            type="button"
            onClick={() => setActiveMode(null)}
            className="px-3 py-1.5 rounded-lg text-xs border border-stone-300 dark:border-stone-700"
          >
            Back to Exams
          </button>
        </div>
      </div>

      {submitted && (
        <div className="rounded-xl border border-emerald-600/40 bg-emerald-50/70 p-5 dark:border-emerald-600/40 dark:bg-emerald-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-7 h-7 text-emerald-700 dark:text-emerald-400" />
            <div>
              <div className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Score: {scoreCount}/{questions.length} ({pct}%)
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400">
                Results saved to your local Progress history.
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => startExam(activeMode)}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-800 text-white dark:bg-emerald-600"
          >
            Retake
          </button>
        </div>
      )}

      <div className="space-y-3">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-2.5"
          >
            <div className="text-xs text-stone-500">
              Q{idx + 1} · {q.category.replace(/_/g, ' ')}
            </div>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
              {pickText(q.question, lang)}
            </p>
            {q.arabicText && (
              <div className="font-arabic text-xl font-bold text-emerald-800 dark:text-emerald-400">
                {formatArabicDisplay(q.arabicText, showHarakat)}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, oi) => {
                const chosen = answers[q.id] === oi;
                const isCorrect = q.correctIndex === oi;
                let cls =
                  'border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-950/60';
                if (submitted) {
                  if (isCorrect) cls = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/70';
                  else if (chosen) cls = 'border-rose-500 bg-rose-50 dark:bg-rose-950/70';
                } else if (chosen) {
                  cls = 'border-emerald-700 bg-emerald-50 dark:bg-emerald-950/60';
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers((p) => ({ ...p, [q.id]: oi }))}
                    className={`text-left px-3.5 py-2.5 rounded-lg border font-arabic text-sm ${cls}`}
                  >
                    {formatArabicDisplay(opt, showHarakat)}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="text-xs text-stone-600 dark:text-stone-400 pt-1">
                {pickText(q.explanation, lang)}
              </p>
            )}
          </div>
        ))}
      </div>

      {!submitted && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-emerald-800 text-white hover:bg-emerald-700 dark:bg-emerald-600"
          >
            Submit Exam
          </button>
        </div>
      )}
    </div>
  );
}
