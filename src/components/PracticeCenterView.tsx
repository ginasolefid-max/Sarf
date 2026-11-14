import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import {
  QuestionDifficulty,
  QuizQuestion,
  UserProgress,
} from '../types/arabic';
import {
  ARRANGEMENT_EXERCISES,
  getAllQuestions,
  PRACTICE_CATEGORIES,
  TYPING_EXERCISES,
} from '../data/quizzesData';
import { stripDiacritics } from '../engine/tasreefEngine';
import { pickText, t } from '../i18n/translations';
import {
  ArabicKeyboardHelper,
  formatArabicDisplay,
} from './ArabicKeyboardHelper';

interface PracticeCenterViewProps {
  progress: UserProgress;
  onRecordOutcome: (q: QuizQuestion, ok: boolean) => void;
}

export function PracticeCenterView({
  progress,
  onRecordOutcome,
}: PracticeCenterViewProps) {
  const lang = progress.settings.language;
  const showHarakat = progress.settings.showHarakat;

  const [mode, setMode] = useState<'drills' | 'typing' | 'arrangement'>('drills');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [diffFilter, setDiffFilter] = useState<'all' | QuestionDifficulty>('all');

  // MCQ / TF / Correction Drill state
  const [drillIdx, setDrillIdx] = useState(0);
  const [chosenOpt, setChosenOpt] = useState<number | null>(null);
  const [checkedDrill, setCheckedDrill] = useState(false);

  // Typing drill state
  const [typingIdx, setTypingIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typingChecked, setTypingChecked] = useState(false);

  // Arrangement state
  const [arrIdx, setArrIdx] = useState(0);
  const [pickedTiles, setPickedTiles] = useState<number[]>([]);
  const [arrChecked, setArrChecked] = useState(false);

  const allQuestions = useMemo(() => getAllQuestions(), []);
  const filteredDrills = useMemo(() => {
    return allQuestions.filter((q) => {
      if (selectedCat !== 'all' && q.category !== selectedCat) return false;
      if (diffFilter !== 'all' && q.difficulty !== diffFilter) return false;
      return true;
    });
  }, [allQuestions, selectedCat, diffFilter]);

  const currentDrill = filteredDrills[drillIdx % Math.max(1, filteredDrills.length)];
  const currentTyping = TYPING_EXERCISES[typingIdx % TYPING_EXERCISES.length];
  const currentArr = ARRANGEMENT_EXERCISES[arrIdx % ARRANGEMENT_EXERCISES.length];

  const handleCheckDrill = () => {
    if (!currentDrill || chosenOpt === null) return;
    setCheckedDrill(true);
    onRecordOutcome(currentDrill, chosenOpt === currentDrill.correctIndex);
  };

  const handleNextDrill = () => {
    setChosenOpt(null);
    setCheckedDrill(false);
    setDrillIdx((i) => i + 1);
  };

  const normalizedTyped = typedText.trim();
  const isTypingCorrect =
    currentTyping.acceptedAnswers.some(
      (ans) =>
        ans === normalizedTyped ||
        stripDiacritics(ans) === stripDiacritics(normalizedTyped)
    ) && normalizedTyped.length > 0;

  const assembledSentence = pickedTiles
    .map((idx) => currentArr.tokens[idx])
    .join(' ');
  const isArrCorrect =
    stripDiacritics(assembledSentence) ===
    stripDiacritics(currentArr.correctSentence);

  return (
    <div className="space-y-5">
      {/* Header & Mode Switcher */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {t('practice', lang)}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {lang === 'ar'
                ? '١٥ مجالًا للتدريب التفاعلي: اختيار من متعدد، صح وخطأ، كتابة عربية، وترتيب الجمل.'
                : '15 grammar & morphology tracks across MCQ, True/False, Error Correction, Arabic Typing, and Sentence Arrangement.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: 'drills', en: 'Topic Drills (15 Tracks)', ar: 'تدريبات الأبواب (١٥)' },
                { id: 'typing', en: 'Arabic Typing', ar: 'كتابة وتشكيل' },
                { id: 'arrangement', en: 'Word Arrangement', ar: 'ترتيب الجمل' },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  mode === m.id
                    ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                {lang === 'ar' ? m.ar : m.en}
              </button>
            ))}
          </div>
        </div>

        {mode === 'drills' && (
          <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCat('all');
                  setDrillIdx(0);
                  setChosenOpt(null);
                  setCheckedDrill(false);
                }}
                className={`px-2.5 py-1 rounded text-xs font-medium border ${
                  selectedCat === 'all'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-100'
                    : 'border-stone-200 text-stone-600 dark:border-stone-800 dark:text-stone-400'
                }`}
              >
                All (15)
              </button>
              {PRACTICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCat(cat.id);
                    setDrillIdx(0);
                    setChosenOpt(null);
                    setCheckedDrill(false);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                    selectedCat === cat.id
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-100'
                      : 'border-stone-200 text-stone-700 hover:border-stone-400 dark:border-stone-800 dark:text-stone-300'
                  }`}
                >
                  {pickText(cat.title, lang)}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-stone-500 mr-1">Difficulty:</span>
              {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    setDiffFilter(d);
                    setDrillIdx(0);
                    setChosenOpt(null);
                    setCheckedDrill(false);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] capitalize font-semibold ${
                    diffFilter === d
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                      : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Active Drill Card */}
      {mode === 'drills' && currentDrill && (
        <section className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/90 space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span className="uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400">
              {currentDrill.discipline} · {currentDrill.category.replace(/_/g, ' ')} · {currentDrill.format.toUpperCase()}
            </span>
            <span className="tabular-nums">
              {(drillIdx % filteredDrills.length) + 1} / {filteredDrills.length}
            </span>
          </div>

          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            {pickText(currentDrill.question, lang)}
          </h3>
          {currentDrill.arabicText && (
            <div className="font-arabic text-2xl font-bold text-emerald-800 dark:text-emerald-400">
              {formatArabicDisplay(currentDrill.arabicText, showHarakat)}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentDrill.options.map((opt, idx) => {
              const selected = chosenOpt === idx;
              const isCorrect = currentDrill.correctIndex === idx;
              let cls =
                'border-stone-200 bg-stone-50/50 text-stone-800 hover:border-emerald-700/60 dark:border-stone-800 dark:bg-stone-950/60 dark:text-stone-200';
              if (checkedDrill) {
                if (isCorrect) cls = 'border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/70 dark:text-emerald-100';
                else if (selected && !isCorrect) cls = 'border-rose-500 bg-rose-50 text-rose-950 dark:border-rose-500 dark:bg-rose-950/70 dark:text-rose-100';
              } else if (selected) {
                cls = 'border-emerald-700 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-100';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={checkedDrill}
                  onClick={() => setChosenOpt(idx)}
                  className={`text-left px-4 py-3 rounded-lg border font-arabic text-base transition-colors ${cls}`}
                >
                  {formatArabicDisplay(opt, showHarakat)}
                </button>
              );
            })}
          </div>

          {checkedDrill && (
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-3.5 text-sm dark:border-stone-800 dark:bg-stone-950/70 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold">
                {chosenOpt === currentDrill.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span className="text-emerald-800 dark:text-emerald-300">Correct</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span className="text-rose-700 dark:text-rose-300">
                      Incorrect — Answer: {currentDrill.options[currentDrill.correctIndex]}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                {pickText(currentDrill.explanation, lang)}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2">
            {!checkedDrill ? (
              <button
                type="button"
                disabled={chosenOpt === null}
                onClick={handleCheckDrill}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-800 text-white disabled:opacity-40 hover:bg-emerald-700 dark:bg-emerald-600"
              >
                {t('checkAnswer', lang)}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextDrill}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
              >
                {t('nextQuestion', lang)}
              </button>
            )}
          </div>
        </section>
      )}

      {/* Arabic Typing Drill */}
      {mode === 'typing' && (
        <section className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/90 space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Arabic Production & Vocalization Drill</span>
            <span className="tabular-nums">
              {(typingIdx % TYPING_EXERCISES.length) + 1} / {TYPING_EXERCISES.length}
            </span>
          </div>
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            {pickText(currentTyping.prompt, lang)}
          </h3>
          <p className="font-arabic text-sm text-stone-500 dark:text-stone-400">
            {currentTyping.hintAr}
          </p>
          <input
            type="text"
            dir="rtl"
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="اكتب الإجابة هنا..."
            className="font-arabic w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-2xl text-stone-900 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          />
          <ArabicKeyboardHelper
            lang={lang}
            onInsert={(ch) => setTypedText((s) => s + ch)}
          />

          {typingChecked && (
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-3.5 text-sm dark:border-stone-800 dark:bg-stone-950 space-y-1">
              <div className={`font-semibold ${isTypingCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {isTypingCorrect ? 'Correct!' : `Canonical Form: ${currentTyping.canonicalAnswer}`}
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                {pickText(currentTyping.explanation, lang)}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2">
            {!typingChecked ? (
              <button
                type="button"
                disabled={!typedText.trim()}
                onClick={() => setTypingChecked(true)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-800 text-white disabled:opacity-40 dark:bg-emerald-600"
              >
                {t('checkAnswer', lang)}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setTypedText('');
                  setTypingChecked(false);
                  setTypingIdx((i) => i + 1);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
              >
                {t('nextQuestion', lang)}
              </button>
            )}
          </div>
        </section>
      )}

      {/* Word Arrangement Drill */}
      {mode === 'arrangement' && (
        <section className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/90 space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Arabic Word-Order & Syntax Construction</span>
            <span className="tabular-nums">
              {(arrIdx % ARRANGEMENT_EXERCISES.length) + 1} / {ARRANGEMENT_EXERCISES.length}
            </span>
          </div>
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            {pickText(currentArr.prompt, lang)}
          </h3>

          {/* Assembled Sentence Drop Area */}
          <div
            dir="rtl"
            className="min-h-[64px] rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 p-3 flex flex-wrap gap-2 items-center dark:border-stone-700 dark:bg-stone-950"
          >
            {pickedTiles.length === 0 ? (
              <span className="text-xs text-stone-400">
                {lang === 'ar' ? 'اضغط على الكلمات بالأسفل لترتيب الجملة...' : 'Click word tiles below in Arabic word order...'}
              </span>
            ) : (
              pickedTiles.map((tileIdx, orderIdx) => (
                <button
                  key={`${tileIdx}-${orderIdx}`}
                  type="button"
                  disabled={arrChecked}
                  onClick={() =>
                    setPickedTiles((prev) => prev.filter((_, i) => i !== orderIdx))
                  }
                  className="font-arabic text-xl font-bold px-3.5 py-1.5 rounded-lg border border-emerald-700 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-100"
                >
                  {formatArabicDisplay(currentArr.tokens[tileIdx], showHarakat)}
                </button>
              ))
            )}
          </div>

          {/* Available Tiles */}
          <div dir="rtl" className="flex flex-wrap gap-2">
            {currentArr.tokens.map((tok, idx) => {
              const used = pickedTiles.includes(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={used || arrChecked}
                  onClick={() => setPickedTiles((prev) => [...prev, idx])}
                  className="font-arabic text-xl px-3.5 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-900 disabled:opacity-30 hover:border-emerald-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
                >
                  {formatArabicDisplay(tok, showHarakat)}
                </button>
              );
            })}
          </div>

          {arrChecked && (
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-3.5 text-sm dark:border-stone-800 dark:bg-stone-950 space-y-1">
              <div className={`font-semibold ${isArrCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {isArrCorrect
                  ? 'Valid Construction!'
                  : `Expected: ${currentArr.correctSentence}`}
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                {pickText(currentArr.explanation, lang)}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setPickedTiles([]);
                setArrChecked(false);
              }}
              className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 dark:text-stone-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Tiles</span>
            </button>
            {!arrChecked ? (
              <button
                type="button"
                disabled={pickedTiles.length !== currentArr.tokens.length}
                onClick={() => setArrChecked(true)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-800 text-white disabled:opacity-40 dark:bg-emerald-600"
              >
                {t('checkAnswer', lang)}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setPickedTiles([]);
                  setArrChecked(false);
                  setArrIdx((i) => i + 1);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
              >
                {t('nextQuestion', lang)}
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
