import React, { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Eye,
  Volume2,
} from 'lucide-react';
import { BOOK_CHAPTERS, type BookChapter } from '../data/bookChapters';
import { db } from '../db/database';
import { speakArabic } from '../lib/tts';
import type { AppSettings } from '../types/sarf';

interface BookViewProps {
  settings: AppSettings;
  onSpeakError: (msg: string) => void;
}

export const BookView: React.FC<BookViewProps> = ({ settings, onSpeakError }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'bookmarked' | 'unread'>('all');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const progressRows = useLiveQuery(() => db.bookProgress.toArray(), []) || [];

  const progressMap = useMemo(() => {
    const map = new Map<string, { read: boolean; bookmarked: boolean; quizScore?: number }>();
    progressRows.forEach((p) => {
      map.set(p.chapterId, { read: p.read, bookmarked: p.bookmarked, quizScore: p.quizScore });
    });
    return map;
  }, [progressRows]);

  const readCount = useMemo(
    () => BOOK_CHAPTERS.filter((ch) => progressMap.get(ch.id)?.read).length,
    [progressMap]
  );

  const activeChapter: BookChapter | null = useMemo(() => {
    if (!selectedId) return null;
    return BOOK_CHAPTERS.find((c) => c.id === selectedId) || null;
  }, [selectedId]);

  const toggleRead = async (chapterId: string) => {
    const existing = progressMap.get(chapterId);
    await db.bookProgress.put({
      chapterId,
      read: !existing?.read,
      bookmarked: existing?.bookmarked ?? false,
      quizScore: existing?.quizScore,
      updatedAt: Date.now(),
    });
  };

  const toggleBookmark = async (chapterId: string) => {
    const existing = progressMap.get(chapterId);
    await db.bookProgress.put({
      chapterId,
      read: existing?.read ?? false,
      bookmarked: !existing?.bookmarked,
      quizScore: existing?.quizScore,
      updatedAt: Date.now(),
    });
  };

  const handleSelectOption = async (chapter: BookChapter, qId: string, optionIdx: number) => {
    const next = { ...selectedAnswers, [qId]: optionIdx };
    setSelectedAnswers(next);

    // Save quiz score if all questions answered
    const answeredCount = chapter.quiz.filter((q) => next[q.id] !== undefined).length;
    if (answeredCount === chapter.quiz.length) {
      const correctCount = chapter.quiz.filter((q) => next[q.id] === q.correctIndex).length;
      const existing = progressMap.get(chapter.id);
      await db.bookProgress.put({
        chapterId: chapter.id,
        read: existing?.read ?? false,
        bookmarked: existing?.bookmarked ?? false,
        quizScore: Math.round((correctCount / chapter.quiz.length) * 100),
        updatedAt: Date.now(),
      });
    }
  };

  const filteredChapters = useMemo(() => {
    return BOOK_CHAPTERS.filter((ch) => {
      const p = progressMap.get(ch.id);
      if (filterMode === 'bookmarked') return Boolean(p?.bookmarked);
      if (filterMode === 'unread') return !p?.read;
      return true;
    });
  }, [filterMode, progressMap]);

  if (activeChapter) {
    const chapterIndex = BOOK_CHAPTERS.findIndex((c) => c.id === activeChapter.id);
    const prevChapter = chapterIndex > 0 ? BOOK_CHAPTERS[chapterIndex - 1] : null;
    const nextChapter =
      chapterIndex < BOOK_CHAPTERS.length - 1 ? BOOK_CHAPTERS[chapterIndex + 1] : null;
    const p = progressMap.get(activeChapter.id);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="min-h-[44px] px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Table of Contents</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleBookmark(activeChapter.id)}
              className={`min-h-[44px] px-3.5 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${
                p?.bookmarked
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${p?.bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{p?.bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleRead(activeChapter.id)}
              className={`min-h-[44px] px-3.5 rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${
                p?.read
                  ? 'bg-emerald-700 text-white'
                  : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-emerald-600'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{p?.read ? 'Read' : 'Mark as Read'}</span>
            </button>
          </div>
        </div>

        {/* Chapter Header */}
        <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-8">
          <header className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                Chapter {activeChapter.number} of {BOOK_CHAPTERS.length}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activeChapter.readingMinutes} min read</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-slate-100 text-balance">
              {activeChapter.title}
            </h1>
            <p lang="ar" dir="rtl" className="arabic-scalable font-bold text-emerald-700 dark:text-emerald-400">
              {activeChapter.arabicTitle}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
              {activeChapter.summary}
            </p>
          </header>

          {/* Sections */}
          <div className="space-y-8">
            {activeChapter.sections.map((sec, sIdx) => (
              <section key={sIdx} className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {sec.heading}
                </h2>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {sec.body}
                </p>

                {sec.examples && sec.examples.length > 0 && (
                  <div className="space-y-2.5">
                    {sec.examples.map((ex, eIdx) => (
                      <div
                        key={eIdx}
                        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-3.5 flex items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {ex.translit} · {ex.en}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span lang="ar" dir="rtl" className="arabic-scalable font-bold text-slate-900 dark:text-slate-100">
                            {ex.ar}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              speakArabic(ex.ar, {
                                rate: settings.ttsRate,
                                repeat: settings.ttsRepeat,
                                onError: onSpeakError,
                              })
                            }
                            aria-label={`Pronounce ${ex.ar}`}
                            className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {sec.table && (
                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold">
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-2.5 px-3.5">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="text-slate-700 dark:text-slate-300">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-2.5 px-3.5 leading-relaxed">
                                {/[\u0600-\u06FF]/.test(cell) ? (
                                  <span className="arabic-text text-lg text-slate-900 dark:text-slate-100">
                                    {cell}
                                  </span>
                                ) : (
                                  cell
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Chapter Quiz */}
          <section className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Chapter Check Quiz
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Test your grasp of Chapter {activeChapter.number} offline.
              </p>
            </div>

            <div className="space-y-5">
              {activeChapter.quiz.map((q, qIdx) => {
                const chosen = selectedAnswers[q.id];
                const revealed = revealedAnswers[q.id];
                const isCorrect = chosen === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {qIdx + 1}. {q.prompt}
                      </p>
                      {q.arabicCue && (
                        <span lang="ar" dir="rtl" className="arabic-text text-xl font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
                          {q.arabicCue}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = chosen === oIdx;
                        const showAsCorrect = (revealed || chosen !== undefined) && oIdx === q.correctIndex;
                        const showAsWrong = isSelected && oIdx !== q.correctIndex;

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectOption(activeChapter, q.id, oIdx)}
                            className={`min-h-[44px] px-3.5 py-2 rounded-xl border text-left text-xs sm:text-sm transition-colors ${
                              showAsCorrect
                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-medium'
                                : showAsWrong
                                ? 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {/[\u0600-\u06FF]/.test(opt) ? (
                              <span className="arabic-text text-base">{opt}</span>
                            ) : (
                              opt
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          setRevealedAnswers((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                        }
                        className="text-xs font-medium text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1 hover:underline"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{revealed ? 'Hide answer' : 'Show answer'}</span>
                      </button>

                      {chosen !== undefined && (
                        <span
                          className={`text-xs font-semibold ${
                            isCorrect
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-amber-700 dark:text-amber-400'
                          }`}
                        >
                          {isCorrect ? 'Correct' : 'Review explanation'}
                        </span>
                      )}
                    </div>

                    {(revealed || chosen !== undefined) && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 leading-relaxed">
                        {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Chapter Navigation Footer */}
          <footer className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            {prevChapter ? (
              <button
                type="button"
                onClick={() => {
                  setSelectedId(prevChapter.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="min-h-[44px] px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="truncate max-w-[140px] sm:max-w-xs">Ch {prevChapter.number}: {prevChapter.title}</span>
              </button>
            ) : (
              <div />
            )}

            {nextChapter && (
              <button
                type="button"
                onClick={() => {
                  setSelectedId(nextChapter.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="min-h-[44px] px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium inline-flex items-center gap-1.5"
              >
                <span className="truncate max-w-[140px] sm:max-w-xs">Next: {nextChapter.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </footer>
        </article>
      </div>
    );
  }

  // Table of Contents View
  const progressPct = Math.round((readCount / BOOK_CHAPTERS.length) * 100);

  return (
    <div className="space-y-6">
      {/* Book Overview & Progress */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <BookOpen className="w-4 h-4" />
              <span>Interactive Sarf Textbook · Offline Ready</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-slate-100">
              Arabic Morphology (عِلْمُ الصَّرْفِ)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Fourteen structured chapters from alphabet &amp; harakat to weak-verb I&apos;lal, broken plurals, and passive voice.
            </p>
          </div>

          <div className="shrink-0 sm:text-right space-y-1">
            <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-slate-100">
              {readCount} / {BOOK_CHAPTERS.length}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Chapters completed ({progressPct}%)
            </div>
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-emerald-700 dark:bg-emerald-500 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* TOC filter tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit">
          {(
            [
              ['all', 'All Chapters'],
              ['bookmarked', 'Bookmarked'],
              ['unread', 'Unread'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilterMode(id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterMode === id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredChapters.map((ch) => {
          const p = progressMap.get(ch.id);
          return (
            <div
              key={ch.id}
              onClick={() => setSelectedId(ch.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedId(ch.id);
              }}
              className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 flex flex-col justify-between gap-3 hover:border-emerald-600/60 transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-num font-semibold text-emerald-700 dark:text-emerald-400">
                      {String(ch.number).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{ch.readingMinutes} min</span>
                    {p?.quizScore !== undefined && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-num">Quiz {p.quizScore}%</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {p?.bookmarked && (
                      <Bookmark className="w-4 h-4 fill-amber-500 text-amber-500" />
                    )}
                    {p?.read && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    )}
                  </div>
                </div>

                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {ch.title}
                </h2>
                <p lang="ar" dir="rtl" className="arabic-text text-lg text-emerald-700 dark:text-emerald-400">
                  {ch.arabicTitle}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {ch.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <span>{p?.read ? 'Review chapter' : 'Read chapter'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
