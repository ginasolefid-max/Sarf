import React, { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  Award,
  Check,
  Flame,
  HelpCircle,
  Layers,
  RefreshCw,
  RotateCcw,
  Target,
  Volume2,
  X,
} from 'lucide-react';
import { computeStreak, db, recordStudyActivity } from '../db/database';
import { normalizeArabic } from '../lib/arabicUtils';
import { conjugateVerb, PRONOUNS } from '../lib/sarfEngine';
import { speakArabic } from '../lib/tts';
import type { AppSettings, PronounKey, VerbEntry, VerbForm, VerbType } from '../types/sarf';

interface PracticeViewProps {
  settings: AppSettings;
  onOpenTasreef: (verb: VerbEntry) => void;
  onSpeakError: (msg: string) => void;
}

type PracticeMode = 'flashcards' | 'quiz' | 'drill';
type QuizType = 'conjugate' | 'root' | 'form' | 'meaning';

function applySM2(
  prev: { easeFactor: number; interval: number; repetitions: number } | undefined,
  quality: 1 | 3 | 4 | 5
) {
  let easeFactor = prev?.easeFactor ?? 2.5;
  let repetitions = prev?.repetitions ?? 0;
  let interval = prev?.interval ?? 0;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  }

  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  return {
    easeFactor,
    repetitions,
    interval,
    nextReview: Date.now() + interval * 24 * 60 * 60 * 1000,
    lastReviewed: Date.now(),
  };
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  settings,
  onOpenTasreef,
  onSpeakError,
}) => {
  const [mode, setMode] = useState<PracticeMode>('flashcards');
  const [streak, setStreak] = useState(0);

  // Flashcards state
  const [fcFilter, setFcFilter] = useState<'due' | 'favorites' | 'all'>('due');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Quiz state
  const [quizType, setQuizType] = useState<QuizType>('conjugate');
  const [quizSeed, setQuizSeed] = useState(0);
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  // Drill state
  const [drillFormFilter, setDrillFormFilter] = useState<'ALL' | VerbForm>('ALL');
  const [drillTypeFilter, setDrillTypeFilter] = useState<'all' | VerbType>('all');
  const [drillTense, setDrillTense] = useState<'madhi' | 'mudhari'>('mudhari');
  const [drillSeed, setDrillSeed] = useState(0);
  const [drillInput, setDrillInput] = useState('');
  const [drillResult, setDrillResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [drillStats, setDrillStats] = useState({ correct: 0, total: 0 });

  const verbs = useLiveQuery(() => db.verbs.toArray(), []) || [];
  const favorites = useLiveQuery(() => db.favorites.toArray(), []) || [];
  const flashcards = useLiveQuery(() => db.flashcards.toArray(), []) || [];
  const statsRows = useLiveQuery(() => db.studyStats.toArray(), []) || [];

  useEffect(() => {
    computeStreak().then(setStreak);
  }, [statsRows.length, flashcards.length]);

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayStats = statsRows.find((s) => s.date === todayStr);
  const todayTotal = (todayStats?.reviews || 0) + (todayStats?.quizzes || 0) + (todayStats?.drills || 0);

  const flashMap = useMemo(() => {
    const m = new Map<string, (typeof flashcards)[0]>();
    flashcards.forEach((f) => m.set(f.verbId, f));
    return m;
  }, [flashcards]);

  const favSet = useMemo(() => new Set(favorites.map((f) => f.verbId)), [favorites]);
  const masteredCount = useMemo(
    () => flashcards.filter((f) => f.repetitions >= 3 && f.interval >= 6).length,
    [flashcards]
  );

  const deck = useMemo(() => {
    const now = Date.now();
    if (fcFilter === 'favorites') {
      const favs = verbs.filter((v) => favSet.has(v.id));
      return favs.length > 0 ? favs : verbs.slice(0, 20);
    }
    if (fcFilter === 'due') {
      const dueList = verbs.filter((v) => {
        const fc = flashMap.get(v.id);
        return !fc || fc.nextReview <= now;
      });
      return dueList.slice(0, 30);
    }
    return verbs.slice(0, 50);
  }, [verbs, fcFilter, favSet, flashMap]);

  const currentCard = deck[cardIndex % Math.max(1, deck.length)] || null;

  const handleRateCard = async (quality: 1 | 3 | 4 | 5) => {
    if (!currentCard) return;
    const prev = flashMap.get(currentCard.id);
    const next = applySM2(prev, quality);
    await db.flashcards.put({
      verbId: currentCard.id,
      ...next,
    });
    await recordStudyActivity('reviews');
    setFlipped(false);
    setCardIndex((prevIdx) => prevIdx + 1);
  };

  // Quiz Generator
  const currentQuiz = useMemo(() => {
    if (verbs.length < 4) return null;
    const idx = (quizSeed * 37 + 13) % verbs.length;
    const target = verbs[idx];
    const table = conjugateVerb(target);

    const pickDistractors = (excludeVal: string, extractor: (v: VerbEntry) => string): string[] => {
      const set = new Set<string>();
      let cursor = idx + 1;
      let guard = 0;
      while (set.size < 3 && guard < verbs.length * 2) {
        const cand = verbs[cursor % verbs.length];
        const val = extractor(cand);
        if (val && val !== excludeVal) set.add(val);
        cursor += 7;
        guard++;
      }
      return Array.from(set);
    };

    let prompt = '';
    let arabicCue = '';
    let correct = '';
    let distractors: string[] = [];

    if (quizType === 'conjugate') {
      const pIdx = (quizSeed * 5 + 3) % PRONOUNS.length;
      const pron = PRONOUNS[pIdx];
      const tense = quizSeed % 2 === 0 ? 'madhi' : 'mudhari';
      prompt = `Conjugate in ${tense === 'madhi' ? 'Past (الماضي)' : 'Present (المضارع)'} for ${pron.ar} (${pron.label}):`;
      arabicCue = `${target.madhi} / ${target.mudhari}`;
      correct = table[tense][pron.key];
      distractors = PRONOUNS.filter((p) => p.key !== pron.key && table[tense][p.key] !== correct)
        .slice(0, 3)
        .map((p) => table[tense][p.key]);
    } else if (quizType === 'root') {
      prompt = `Identify the root (الجذر) of this word:`;
      arabicCue = target.ismFail || target.madhi;
      correct = target.root;
      distractors = pickDistractors(correct, (v) => v.root);
    } else if (quizType === 'form') {
      prompt = `Which morphological Form (الوزن) does this verb belong to?`;
      arabicCue = `${target.madhi} — ${target.mudhari}`;
      correct = `Form ${target.form}`;
      const formsPool: VerbForm[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'X', 'QI'];
      distractors = formsPool
        .filter((f) => `Form ${f}` !== correct)
        .slice(0, 3)
        .map((f) => `Form ${f}`);
    } else {
      prompt = `Select the English meaning of:`;
      arabicCue = `${target.madhi} — ${target.mudhari}`;
      correct = target.meanings.join(', ');
      distractors = pickDistractors(correct, (v) => v.meanings.join(', '));
    }

    const options = [correct, ...distractors];
    // Deterministic shuffle per seed
    const rot = quizSeed % options.length;
    const rotated = [...options.slice(rot), ...options.slice(0, rot)];
    const correctIndex = rotated.indexOf(correct);

    return { target, prompt, arabicCue, options: rotated, correctIndex };
  }, [verbs, quizType, quizSeed]);

  const handleAnswerQuiz = async (idx: number) => {
    if (quizChoice !== null || !currentQuiz) return;
    setQuizChoice(idx);
    const isRight = idx === currentQuiz.correctIndex;
    setQuizScore((prev) => ({
      correct: prev.correct + (isRight ? 1 : 0),
      total: prev.total + 1,
    }));
    await recordStudyActivity('quizzes');
  };

  // Conjugation Drill Generator
  const currentDrill = useMemo(() => {
    let pool = verbs;
    if (drillFormFilter !== 'ALL') pool = pool.filter((v) => v.form === drillFormFilter);
    if (drillTypeFilter !== 'all') pool = pool.filter((v) => v.verbType === drillTypeFilter);
    if (pool.length === 0) pool = verbs;
    if (pool.length === 0) return null;

    const verb = pool[(drillSeed * 19 + 5) % pool.length];
    const pronoun = PRONOUNS[(drillSeed * 11 + 2) % PRONOUNS.length];
    const table = conjugateVerb(verb);
    const expected = table[drillTense][pronoun.key as PronounKey];

    return { verb, pronoun, expected };
  }, [verbs, drillFormFilter, drillTypeFilter, drillTense, drillSeed]);

  const handleCheckDrill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDrill || !drillInput.trim()) return;
    const ok = normalizeArabic(drillInput) === normalizeArabic(currentDrill.expected);
    setDrillResult(ok ? 'correct' : 'wrong');
    setDrillStats((prev) => ({
      correct: prev.correct + (ok ? 1 : 0),
      total: prev.total + 1,
    }));
    await recordStudyActivity('drills');
  };

  return (
    <div className="space-y-6">
      {/* Study Streak & Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Study Streak</span>
          </div>
          <p className="mt-1 text-2xl font-bold font-mono-num text-slate-900 dark:text-slate-100">
            {streak} day{streak === 1 ? '' : 's'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Target className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Today&apos;s Activity</span>
          </div>
          <p className="mt-1 text-2xl font-bold font-mono-num text-slate-900 dark:text-slate-100">
            {todayTotal}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Mastered Cards</span>
          </div>
          <p className="mt-1 text-2xl font-bold font-mono-num text-slate-900 dark:text-slate-100">
            {masteredCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Layers className="w-4 h-4 text-slate-500" />
            <span>Cards Studied</span>
          </div>
          <p className="mt-1 text-2xl font-bold font-mono-num text-slate-900 dark:text-slate-100">
            {flashcards.length}
          </p>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit">
        {(
          [
            ['flashcards', 'SM-2 Flashcards'],
            ['quiz', 'Multi-Mode Quiz'],
            ['drill', 'Conjugation Drill'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`min-h-[40px] px-3.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              mode === id
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* MODE 1: SM-2 FLASHCARDS */}
      {mode === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {(['due', 'favorites', 'all'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFcFilter(f);
                    setCardIndex(0);
                    setFlipped(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium capitalize ${
                    fcFilter === f
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <span className="text-xs font-mono-num text-slate-500">
              Deck: {deck.length} cards
            </span>
          </div>

          {currentCard ? (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  Form {currentCard.form} · {currentCard.verbType}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    speakArabic(`${currentCard.madhi}، ${currentCard.mudhari}`, {
                      rate: settings.ttsRate,
                      repeat: settings.ttsRepeat,
                      onError: onSpeakError,
                    })
                  }
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                  aria-label="Pronounce card"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center py-4 space-y-2">
                <p lang="ar" dir="rtl" className="arabic-text text-5xl font-bold text-slate-900 dark:text-slate-100">
                  {currentCard.madhi}
                </p>
                <p lang="ar" dir="rtl" className="arabic-text text-2xl text-emerald-700 dark:text-emerald-400">
                  {currentCard.mudhari}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                  Root: <span className="arabic-text text-base">{currentCard.root}</span>
                </p>
              </div>

              {!flipped ? (
                <button
                  type="button"
                  onClick={() => setFlipped(true)}
                  className="w-full min-h-[48px] rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium hover:opacity-90"
                >
                  Show Meaning &amp; Forms
                </button>
              ) : (
                <div className="space-y-5 border-t border-slate-100 dark:border-slate-800 pt-5">
                  <div className="text-center space-y-1">
                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {currentCard.meanings.join(', ')}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Masdar: <span className="arabic-text text-base text-slate-800 dark:text-slate-200">{currentCard.masdar}</span>
                      <span className="mx-2">·</span>
                      Fa&apos;il: <span className="arabic-text text-base text-slate-800 dark:text-slate-200">{currentCard.ismFail}</span>
                      <span className="mx-2">·</span>
                      Amr: <span className="arabic-text text-base text-slate-800 dark:text-slate-200">{currentCard.amr}</span>
                    </p>
                  </div>

                  {currentCard.examples[0] && (
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-center">
                      <p lang="ar" dir="rtl" className="arabic-text text-lg text-slate-900 dark:text-slate-100">
                        {currentCard.examples[0].ar}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {currentCard.examples[0].en}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                      Rate recall (SM-2 scheduling)
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => handleRateCard(1)}
                        className="min-h-[44px] rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 text-xs font-semibold text-red-700 dark:text-red-300"
                      >
                        Again
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRateCard(3)}
                        className="min-h-[44px] rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 text-xs font-semibold text-amber-800 dark:text-amber-300"
                      >
                        Hard
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRateCard(4)}
                        className="min-h-[44px] rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 text-xs font-semibold text-emerald-800 dark:text-emerald-300"
                      >
                        Good
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRateCard(5)}
                        className="min-h-[44px] rounded-xl bg-emerald-700 text-xs font-semibold text-white"
                      >
                        Easy
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => onOpenTasreef(currentCard)}
                      className="text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      View full 14-pronoun Tasreef
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                All due cards reviewed for today! Switch to &ldquo;All&rdquo; to continue practicing.
              </p>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: MULTI-MODE QUIZ */}
      {mode === 'quiz' && currentQuiz && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  ['conjugate', 'Conjugate'],
                  ['root', 'Identify Root'],
                  ['form', 'Identify Form'],
                  ['meaning', 'Match Meaning'],
                ] as const
              ).map(([qt, label]) => (
                <button
                  key={qt}
                  type="button"
                  onClick={() => {
                    setQuizType(qt);
                    setQuizChoice(null);
                    setQuizSeed((s) => s + 1);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${
                    quizType === qt
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono-num text-slate-600 dark:text-slate-300">
              Score: {quizScore.correct}/{quizScore.total}
            </span>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 inline-flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{currentQuiz.prompt}</span>
                </p>
                <p lang="ar" dir="rtl" className="arabic-scalable font-bold text-slate-900 dark:text-slate-100">
                  {currentQuiz.arabicCue}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  speakArabic(currentQuiz.target.madhi, {
                    rate: settings.ttsRate,
                    repeat: settings.ttsRepeat,
                    onError: onSpeakError,
                  })
                }
                aria-label="Pronounce quiz cue"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:text-emerald-700"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentQuiz.options.map((opt, idx) => {
                const chosen = quizChoice === idx;
                const isCorrect = idx === currentQuiz.correctIndex;
                const showCorrect = quizChoice !== null && isCorrect;
                const showWrong = chosen && !isCorrect;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAnswerQuiz(idx)}
                    className={`min-h-[52px] px-4 py-2.5 rounded-2xl border text-left transition-colors flex items-center justify-between gap-2 ${
                      showCorrect
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-semibold'
                        : showWrong
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300'
                        : 'border-slate-200 dark:border-slate-800 hover:border-emerald-600/50 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className={/[\u0600-\u06FF]/.test(opt) ? 'arabic-text text-xl' : 'text-sm'}>
                      {opt}
                    </span>
                    {showCorrect && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                    {showWrong && <X className="w-4 h-4 text-red-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {quizChoice !== null && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => onOpenTasreef(currentQuiz.target)}
                  className="text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  Inspect {currentQuiz.target.madhi} Tasreef
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuizChoice(null);
                    setQuizSeed((s) => s + 1);
                  }}
                  className="min-h-[42px] px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Next Question</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 3: CONJUGATION DRILL */}
      {mode === 'drill' && currentDrill && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={drillFormFilter}
                onChange={(e) => setDrillFormFilter(e.target.value as 'ALL' | VerbForm)}
                className="min-h-[38px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs"
              >
                <option value="ALL">All Forms</option>
                {(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'QI'] as VerbForm[]).map((f) => (
                  <option key={f} value={f}>Form {f}</option>
                ))}
              </select>

              <select
                value={drillTypeFilter}
                onChange={(e) => setDrillTypeFilter(e.target.value as 'all' | VerbType)}
                className="min-h-[38px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs capitalize"
              >
                <option value="all">All Verb Types</option>
                {(['sound', 'hollow', 'defective', 'assimilated', 'doubled', 'hamzated'] as VerbType[]).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                value={drillTense}
                onChange={(e) => setDrillTense(e.target.value as 'madhi' | 'mudhari')}
                className="min-h-[38px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs"
              >
                <option value="mudhari">Present (المضارع)</option>
                <option value="madhi">Past (الماضي)</option>
              </select>
            </div>

            <span className="text-xs font-mono-num text-slate-600 dark:text-slate-300">
              Drill: {drillStats.correct}/{drillStats.total}
            </span>
          </div>

          <form
            onSubmit={handleCheckDrill}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5"
          >
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                Form {currentDrill.verb.form} · {currentDrill.verb.verbType} · {currentDrill.verb.meanings[0]}
              </span>
              <span className="arabic-text text-base">{currentDrill.verb.root}</span>
            </div>

            <div className="text-center space-y-2">
              <p lang="ar" dir="rtl" className="arabic-text text-4xl font-bold text-slate-900 dark:text-slate-100">
                {currentDrill.verb.madhi} — {currentDrill.verb.mudhari}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Conjugate for{' '}
                <strong className="arabic-text text-xl text-emerald-700 dark:text-emerald-400 mx-1">
                  {currentDrill.pronoun.ar}
                </strong>{' '}
                ({currentDrill.pronoun.label}) in{' '}
                <strong>{drillTense === 'madhi' ? 'Past' : 'Present'}</strong>
              </p>
            </div>

            <input
              type="text"
              dir="rtl"
              lang="ar"
              value={drillInput}
              onChange={(e) => setDrillInput(e.target.value)}
              placeholder="اكتب الفعل المصرف هنا (مع أو بدون تشكيل)..."
              className="w-full min-h-[54px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 text-center arabic-text text-2xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />

            {drillResult !== 'idle' && (
              <div
                className={`rounded-2xl p-3.5 text-sm flex items-center justify-between ${
                  drillResult === 'correct'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                }`}
              >
                <span>
                  {drillResult === 'correct' ? 'Correct! ' : 'Expected form: '}
                  <strong lang="ar" dir="rtl" className="arabic-text text-2xl mx-1">
                    {currentDrill.expected}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    speakArabic(currentDrill.expected, {
                      rate: settings.ttsRate,
                      repeat: settings.ttsRepeat,
                      onError: onSpeakError,
                    })
                  }
                  className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl"
                  aria-label="Hear correct conjugation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              {drillResult === 'idle' ? (
                <button
                  type="submit"
                  disabled={!drillInput.trim()}
                  className="flex-1 min-h-[46px] rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium disabled:opacity-50"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setDrillInput('');
                    setDrillResult('idle');
                    setDrillSeed((s) => s + 1);
                  }}
                  className="flex-1 min-h-[46px] rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium inline-flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Next Verb</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
