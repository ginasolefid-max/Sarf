import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, RefreshCw } from 'lucide-react';
import { SRSCard, UserProgress } from '../types/arabic';
import { scheduleSRSCard } from '../db/storage';
import { t } from '../i18n/translations';
import { formatArabicDisplay } from './ArabicKeyboardHelper';

interface ReviewSRSViewProps {
  progress: UserProgress;
  onRateCard: (cardId: string, quality: 1 | 2 | 3 | 4) => void;
}

const DECKS: { id: 'all' | SRSCard['deck']; label: string }[] = [
  { id: 'all', label: 'All Due Cards' },
  { id: 'vocab', label: 'Vocabulary' },
  { id: 'conjugation', label: 'Verb Conjugation' },
  { id: 'grammar', label: 'Grammar Rules' },
  { id: 'irab', label: "I'rab Examples" },
  { id: 'particles', label: 'Particles' },
  { id: 'mistakes', label: 'Previously Incorrect' },
];

export function ReviewSRSView({ progress, onRateCard }: ReviewSRSViewProps) {
  const lang = progress.settings.language;
  const showHarakat = progress.settings.showHarakat;

  const [deckFilter, setDeckFilter] = useState<'all' | SRSCard['deck']>('all');
  const [revealed, setRevealed] = useState(false);

  const now = Date.now();
  const allCards = useMemo(() => Object.values(progress.srsCards), [progress.srsCards]);

  const dueCards = useMemo(() => {
    return allCards
      .filter((c) => (deckFilter === 'all' ? true : c.deck === deckFilter))
      .filter((c) => c.nextReviewAt <= now)
      .sort((a, b) => a.nextReviewAt - b.nextReviewAt);
  }, [allCards, deckFilter, now]);

  const activeCard = dueCards[0];

  const handleRate = (q: 1 | 2 | 3 | 4) => {
    if (!activeCard) return;
    setRevealed(false);
    onRateCard(activeCard.id, q);
  };

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {t('review', lang)}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {lang === 'ar'
                ? 'نظام التكرار المتباعد SM-2 لتثبيت المفردات والأوزان والإعراب.'
                : 'SM-2 Spaced Repetition across vocabulary, conjugation, grammar, I\'rab, particles, and your past mistakes.'}
            </p>
          </div>
          <div className="text-xs font-semibold tabular-nums text-emerald-800 dark:text-emerald-400">
            {dueCards.length} due · {allCards.length} total cards
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {DECKS.map((d) => {
            const count = allCards.filter(
              (c) => (d.id === 'all' ? true : c.deck === d.id) && c.nextReviewAt <= now
            ).length;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setDeckFilter(d.id);
                  setRevealed(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  deckFilter === d.id
                    ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                {d.label} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {!activeCard ? (
        <section className="rounded-xl border border-stone-200 bg-white p-8 text-center dark:border-stone-800 dark:bg-stone-900/90 space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-700 dark:text-emerald-400 mx-auto" />
          <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
            {lang === 'ar' ? 'أتممت مراجعة هذا القسم!' : 'All due cards reviewed in this deck!'}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Select another deck above or return later when your scheduled SM-2 intervals become due.
          </p>
        </section>
      ) : (
        <section className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/90 space-y-5">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400">
              {activeCard.deck} · Repetitions: {activeCard.repetitions} · EF: {activeCard.easeFactor}
            </span>
            <RefreshCw className="w-3.5 h-3.5" />
          </div>

          <div className="py-6 text-center space-y-2 border-y border-stone-100 dark:border-stone-800">
            <div className="font-arabic text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50">
              {formatArabicDisplay(activeCard.frontAr, showHarakat)}
            </div>
            {activeCard.frontHint && (
              <div className="text-xs text-stone-500 dark:text-stone-400">
                {activeCard.frontHint}
              </div>
            )}
          </div>

          {!revealed ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
              >
                <Eye className="w-4 h-4" />
                <span>{lang === 'ar' ? 'اكشف الإجابة' : 'Reveal Answer'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-950/70 space-y-2 text-center">
                <p className="font-arabic text-lg font-semibold text-stone-900 dark:text-stone-100">
                  {formatArabicDisplay(activeCard.backAr, showHarakat)}
                </p>
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400">
                  {activeCard.backEn} · <span className="text-stone-600 dark:text-stone-400">{activeCard.backTl}</span>
                </p>
                {activeCard.exampleAr && (
                  <p className="font-arabic text-base text-stone-700 dark:text-stone-300 pt-1">
                    {formatArabicDisplay(activeCard.exampleAr, showHarakat)}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(
                  [
                    { q: 1 as const, label: 'Again', cls: 'border-rose-300 text-rose-800 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-950' },
                    { q: 2 as const, label: 'Hard', cls: 'border-amber-300 text-amber-800 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-950' },
                    { q: 3 as const, label: 'Good', cls: 'border-emerald-400 text-emerald-900 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-950' },
                    { q: 4 as const, label: 'Easy', cls: 'border-sky-400 text-sky-900 hover:bg-sky-50 dark:border-sky-700 dark:text-sky-300 dark:hover:bg-sky-950' },
                  ]
                ).map((btn) => {
                  const preview = scheduleSRSCard(activeCard, btn.q);
                  return (
                    <button
                      key={btn.q}
                      type="button"
                      onClick={() => handleRate(btn.q)}
                      className={`py-2.5 px-3 rounded-lg border text-center transition-colors ${btn.cls}`}
                    >
                      <div className="text-xs font-bold">{btn.label}</div>
                      <div className="text-[11px] opacity-80">
                        {btn.q === 1 ? '10m' : `${preview.intervalDays}d`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
