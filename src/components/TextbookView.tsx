import { useMemo, useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Search,
  ShieldCheck,
} from 'lucide-react';
import {
  Language,
  QuestionDifficulty,
  QuizQuestion,
  TextbookChapter,
  UserProgress,
} from '../types/arabic';
import { pickText, t } from '../i18n/translations';
import { getChapterQuiz } from '../data/quizzesData';
import {
  arabicSizeClass,
  formatArabicDisplay,
  verificationLabel,
} from './ArabicKeyboardHelper';

interface TextbookViewProps {
  discipline: 'sarf' | 'nahu';
  chapters: TextbookChapter[];
  selectedChapterId?: string;
  progress: UserProgress;
  onSelectChapter: (chapterId: string) => void;
  onToggleComplete: (chapterId: string) => void;
  onToggleBookmark: (chapter: TextbookChapter) => void;
  onQuizComplete: (chapterId: string, score: number, total: number, outcomes: { q: QuizQuestion; ok: boolean }[]) => void;
}

export function TextbookView({
  discipline,
  chapters,
  selectedChapterId,
  progress,
  onSelectChapter,
  onToggleComplete,
  onToggleBookmark,
  onQuizComplete,
}: TextbookViewProps) {
  const lang: Language = progress.settings.language;
  const showHarakat = progress.settings.showHarakat;
  const showTranslit = progress.settings.showTransliteration;
  const fontSize = progress.settings.arabicFontSize;

  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | QuestionDifficulty>('all');
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz'>('lesson');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [revealedExercises, setRevealedExercises] = useState<Record<string, boolean>>({});
  const [showSources, setShowSources] = useState(false);

  // Chapter quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const filteredChapters = useMemo(() => {
    const q = search.trim().toLowerCase();
    return chapters.filter((c) => {
      if (levelFilter !== 'all' && c.level !== levelFilter) return false;
      if (!q) return true;
      return (
        c.titleAr.includes(search.trim()) ||
        c.titleEn.toLowerCase().includes(q) ||
        c.titleTl.toLowerCase().includes(q) ||
        c.definition.arabicTerm.includes(search.trim())
      );
    });
  }, [chapters, search, levelFilter]);

  const activeChapter =
    chapters.find((c) => c.id === selectedChapterId) ??
    filteredChapters[0] ??
    chapters[0];

  const chapterQuestions = useMemo(
    () => getChapterQuiz(activeChapter.id),
    [activeChapter.id]
  );

  const isCompleted = progress.completedChapters.includes(activeChapter.id);
  const isBookmarked = progress.bookmarks.some((b) => b.id === `bm-ch-${activeChapter.id}`);

  const toggleSection = (key: string) => {
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectChapter = (id: string) => {
    onSelectChapter(id);
    setActiveTab('lesson');
    setQuizAnswers({});
    setQuizSubmitted(false);
    setRevealedExercises({});
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    const outcomes = chapterQuestions.map((q) => {
      const ok = quizAnswers[q.id] === q.correctIndex;
      if (ok) score++;
      return { q, ok };
    });
    setQuizSubmitted(true);
    onQuizComplete(activeChapter.id, score, chapterQuestions.length, outcomes);
  };

  const renderSection = (
    key: string,
    indexLabel: string,
    titleAr: string,
    titleEn: string,
    content: React.ReactNode
  ) => {
    const isCollapsed = !!collapsedSections[key];
    return (
      <section
        key={key}
        className="rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/90 overflow-hidden"
      >
        <button
          type="button"
          onClick={() => toggleSection(key)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-mono text-stone-400 tabular-nums shrink-0">
              {indexLabel}
            </span>
            <div className="min-w-0">
              <span className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                {lang === 'ar' ? titleAr : `${titleEn} — ${titleAr}`}
              </span>
            </div>
          </div>
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
          ) : (
            <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
          )}
        </button>
        {!isCollapsed && (
          <div className="px-5 pb-5 pt-2 border-t border-stone-100 dark:border-stone-800/80 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            {content}
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Chapter Index Sidebar */}
      <aside className="lg:col-span-4 xl:col-span-3 space-y-3">
        <div className="rounded-xl border border-stone-200 bg-white p-3.5 dark:border-stone-800 dark:bg-stone-900/90 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('searchPlaceholder', lang)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 bg-stone-50 text-stone-900 focus:outline-none focus:border-emerald-700 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevelFilter(lvl)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium capitalize transition-colors ${
                  levelFilter === lvl
                    ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="max-h-[540px] overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800 pr-1">
            {filteredChapters.map((ch) => {
              const done = progress.completedChapters.includes(ch.id);
              const active = ch.id === activeChapter.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSelectChapter(ch.id)}
                  className={`w-full text-left py-2.5 px-2.5 rounded-lg my-0.5 flex items-start gap-2.5 transition-colors ${
                    active
                      ? 'bg-emerald-50 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-100'
                      : 'hover:bg-stone-50 dark:hover:bg-stone-800/50 text-stone-800 dark:text-stone-200'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-300 dark:text-stone-600" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                      <span className="tabular-nums">
                        {discipline === 'sarf' ? 'Ṣarf' : 'Naḥw'} {ch.number}
                      </span>
                      <span className="capitalize">{ch.level}</span>
                    </div>
                    <div className="font-arabic text-base font-bold leading-snug">
                      {formatArabicDisplay(ch.titleAr, showHarakat)}
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 truncate">
                      {lang === 'tl' ? ch.titleTl : ch.titleEn}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Textbook Content */}
      <div className="lg:col-span-8 xl:col-span-9 space-y-4">
        {/* Chapter Masthead */}
        <header className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/90">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <span className="uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400">
                {discipline === 'sarf' ? 'علم الصرف · Ṣarf' : 'علم النحو · Naḥw'} {activeChapter.number}
              </span>
              <span>·</span>
              <span className="capitalize">{activeChapter.level}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                {verificationLabel(activeChapter.meta.status, lang)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleBookmark(activeChapter)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
              >
                {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{isBookmarked ? t('saved', lang) : t('saveFavorite', lang)}</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleComplete(activeChapter.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isCompleted
                    ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                    : 'border border-stone-300 text-stone-800 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isCompleted ? t('completed', lang) : t('markCompleted', lang)}</span>
              </button>
            </div>
          </div>

          <h2 className={`font-arabic mt-3 font-bold text-stone-900 dark:text-stone-50 ${arabicSizeClass(fontSize, 'lg')}`}>
            {formatArabicDisplay(activeChapter.titleAr, showHarakat)}
          </h2>
          <p className="mt-1 text-base font-medium text-stone-700 dark:text-stone-300">
            {activeChapter.titleEn} · <span className="text-stone-500 dark:text-stone-400">{activeChapter.titleTl}</span>
          </p>

          {/* Classical Sources Disclosure */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowSources((s) => !s)}
              className="text-xs text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 underline underline-offset-2"
            >
              {showSources
                ? lang === 'ar' ? 'إخفاء المصادر التراثية' : 'Hide classical references'
                : lang === 'ar' ? 'عرض المصادر التراثية الموثقة' : `Classical sources (${activeChapter.meta.sources.length})`}
            </button>
            {showSources && (
              <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-400 font-arabic">
                المصادر: {activeChapter.meta.sources.join(' · ')}
              </p>
            )}
          </div>

          {/* Lesson / Quiz Mode Switcher */}
          <div className="mt-5 flex items-center gap-2 border-t border-stone-100 dark:border-stone-800 pt-4">
            <button
              type="button"
              onClick={() => setActiveTab('lesson')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'lesson'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {lang === 'ar' ? 'متن الدرس (١٧ محورًا)' : 'Textbook Lesson (17 Sections)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'quiz'
                  ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {t('chapterQuiz', lang)} ({chapterQuestions.length})
            </button>
          </div>
        </header>

        {activeTab === 'lesson' ? (
          <div className="space-y-3">
            {renderSection(
              '01',
              '01',
              'أهداف التعلم',
              'Learning Objectives',
              <ul className="list-disc pl-5 space-y-1.5">
                {activeChapter.objectives.map((o, i) => (
                  <li key={i}>
                    <p className="font-arabic text-base text-stone-900 dark:text-stone-100">{formatArabicDisplay(o.ar, showHarakat)}</p>
                    {lang !== 'ar' && <p className="text-xs text-stone-600 dark:text-stone-400">{pickText(o, lang)}</p>}
                  </li>
                ))}
              </ul>
            )}

            {renderSection(
              '02',
              '02',
              'مقدمة تمهيدية',
              'Introduction',
              <div className="space-y-2">
                <p className="font-arabic text-base text-stone-900 dark:text-stone-100">{formatArabicDisplay(activeChapter.introduction.ar, showHarakat)}</p>
                {lang !== 'ar' && <p className="text-sm text-stone-700 dark:text-stone-300">{pickText(activeChapter.introduction, lang)}</p>}
              </div>
            )}

            {renderSection(
              '03',
              '03',
              'التعريف الاصطلاحي',
              'Definition',
              <div className="space-y-2">
                <div className="font-arabic text-xl font-bold text-emerald-800 dark:text-emerald-400">
                  {formatArabicDisplay(activeChapter.definition.arabicTerm, showHarakat)}
                </div>
                <p className="font-arabic text-base text-stone-900 dark:text-stone-100">{formatArabicDisplay(activeChapter.definition.text.ar, showHarakat)}</p>
                {lang !== 'ar' && <p className="text-sm text-stone-700 dark:text-stone-300">{pickText(activeChapter.definition.text, lang)}</p>}
              </div>
            )}

            {renderSection(
              '04',
              '04',
              'الشرح العلمي المفصّل',
              'Detailed Explanation',
              <div className="space-y-2">
                <p className="font-arabic text-base text-stone-900 dark:text-stone-100">{formatArabicDisplay(activeChapter.explanation.ar, showHarakat)}</p>
                {lang !== 'ar' && <p className="text-sm text-stone-700 dark:text-stone-300">{pickText(activeChapter.explanation, lang)}</p>}
              </div>
            )}

            {renderSection(
              '05',
              '05',
              'القواعد والضوابط',
              'Core Rules',
              <ol className="list-decimal pl-5 space-y-2">
                {activeChapter.rules.map((r, i) => (
                  <li key={i}>
                    <p className="font-arabic text-base text-stone-900 dark:text-stone-100">{formatArabicDisplay(r.ar, showHarakat)}</p>
                    {lang !== 'ar' && <p className="text-xs text-stone-600 dark:text-stone-400">{pickText(r, lang)}</p>}
                  </li>
                ))}
              </ol>
            )}

            {renderSection(
              '06',
              '06',
              'التقسيمات والتصنيفات',
              'Classifications',
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeChapter.classifications.map((cls, i) => (
                  <div key={i} className="rounded-lg border border-stone-200 bg-stone-50/70 p-3.5 dark:border-stone-800 dark:bg-stone-950/60">
                    <div className="font-arabic text-lg font-bold text-stone-900 dark:text-stone-100">
                      {formatArabicDisplay(cls.titleAr, showHarakat)}
                    </div>
                    <div className="text-xs font-medium text-emerald-800 dark:text-emerald-400">
                      {lang === 'tl' ? cls.titleTl : cls.titleEn}
                    </div>
                    <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-400">
                      {pickText(cls.description, lang)}
                    </p>
                    <div className="mt-2 font-arabic text-sm text-stone-800 dark:text-stone-200">
                      {cls.examples.map((ex) => formatArabicDisplay(ex, showHarakat)).join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {renderSection(
              '07',
              '07',
              'الأوزان والصيغ القياسية',
              'Patterns & Formulas',
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-700 text-xs uppercase text-stone-500">
                      <th className="py-2 pr-3">Pattern</th>
                      <th className="py-2 pr-3">Example</th>
                      <th className="py-2 pr-3">Meaning</th>
                      <th className="py-2">Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    {activeChapter.patterns.map((p, i) => (
                      <tr key={i}>
                        <td className="py-2.5 pr-3 font-arabic text-lg font-bold text-emerald-800 dark:text-emerald-400">
                          {formatArabicDisplay(p.pattern, showHarakat)}
                        </td>
                        <td className="py-2.5 pr-3 font-arabic text-base text-stone-900 dark:text-stone-100">
                          {formatArabicDisplay(p.example, showHarakat)}
                        </td>
                        <td className="py-2.5 pr-3 text-xs text-stone-700 dark:text-stone-300">
                          {pickText(p.meaning, lang)}
                        </td>
                        <td className="py-2.5 text-xs text-stone-600 dark:text-stone-400">
                          {pickText(p.rule, lang)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {renderSection(
              '08',
              '08',
              'الأمثلة التطبيقية والإعرابية',
              'Annotated Examples',
              <div className="space-y-3">
                {activeChapter.examples.map((ex, i) => (
                  <div key={i} className="rounded-lg border border-stone-200 p-3.5 dark:border-stone-800">
                    <div className={`font-arabic font-bold text-stone-900 dark:text-stone-50 ${arabicSizeClass(fontSize, 'md')}`}>
                      {formatArabicDisplay(ex.arabic, showHarakat)}
                    </div>
                    {showTranslit && (
                      <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-0.5">
                        {ex.transliteration}
                      </div>
                    )}
                    <div className="mt-1 text-sm text-stone-800 dark:text-stone-200">
                      {pickText(ex.translation, lang)}
                    </div>
                    <div className="mt-1.5 text-xs text-stone-600 dark:text-stone-400">
                      <span className="font-semibold text-emerald-800 dark:text-emerald-400">
                        {lang === 'ar' ? 'التحليل: ' : 'Analysis: '}
                      </span>
                      {pickText(ex.analysis, lang)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {renderSection(
              '09',
              '09',
              'الشواذ والاستثناءات',
              'Exceptions & Special Cases',
              <ul className="list-disc pl-5 space-y-1.5">
                {activeChapter.exceptions.map((e, i) => (
                  <li key={i}>
                    <p className="font-arabic text-base text-stone-900 dark:text-stone-100">{formatArabicDisplay(e.ar, showHarakat)}</p>
                    {lang !== 'ar' && <p className="text-xs text-stone-600 dark:text-stone-400">{pickText(e, lang)}</p>}
                  </li>
                ))}
              </ul>
            )}

            {renderSection(
              '10',
              '10',
              'الأخطاء الشائعة وتصحيحها',
              'Common Mistakes',
              <ul className="list-disc pl-5 space-y-1.5">
                {activeChapter.commonMistakes.map((m, i) => (
                  <li key={i}>
                    <p className="font-arabic text-base text-amber-900 dark:text-amber-200">{formatArabicDisplay(m.ar, showHarakat)}</p>
                    {lang !== 'ar' && <p className="text-xs text-stone-600 dark:text-stone-400">{pickText(m, lang)}</p>}
                  </li>
                ))}
              </ul>
            )}

            {renderSection(
              '11',
              '11',
              'الموازنة والمقارنة العلمية',
              'Linguistic Comparison',
              <div>
                <p className="font-arabic text-base text-stone-900 dark:text-stone-100">{formatArabicDisplay(activeChapter.comparison.ar, showHarakat)}</p>
                {lang !== 'ar' && <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">{pickText(activeChapter.comparison, lang)}</p>}
              </div>
            )}

            {renderSection(
              '12',
              '12',
              'تدريبات الفصل التفاعلية',
              'Practical Exercises',
              <div className="space-y-3">
                {activeChapter.practicalExercises.map((ex) => {
                  const revealed = !!revealedExercises[ex.id];
                  return (
                    <div key={ex.id} className="rounded-lg border border-stone-200 p-3.5 dark:border-stone-800">
                      <p className="font-medium text-stone-900 dark:text-stone-100">
                        {pickText(ex.prompt, lang)}
                      </p>
                      {ex.arabicPrompt && (
                        <p className="font-arabic text-lg font-bold text-emerald-800 dark:text-emerald-400 mt-1">
                          {formatArabicDisplay(ex.arabicPrompt, showHarakat)}
                        </p>
                      )}
                      <div className="mt-2.5">
                        <button
                          type="button"
                          onClick={() =>
                            setRevealedExercises((prev) => ({ ...prev, [ex.id]: !prev[ex.id] }))
                          }
                          className="px-3 py-1 rounded text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200"
                        >
                          {revealed
                            ? lang === 'ar' ? 'إخفاء الإجابة' : 'Hide Answer'
                            : lang === 'ar' ? 'اعرض الإجابة والشرح' : 'Reveal Answer & Rationale'}
                        </button>
                      </div>
                      {revealed && (
                        <div className="mt-2.5 pt-2.5 border-t border-stone-100 dark:border-stone-800">
                          <div className="font-arabic text-lg font-bold text-emerald-700 dark:text-emerald-400">
                            {formatArabicDisplay(ex.answer, showHarakat)}
                          </div>
                          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                            {pickText(ex.explanation, lang)}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {renderSection(
              '13',
              '13',
              'ملخص الباب',
              'Chapter Summary',
              <div>
                <p className="font-arabic text-base text-stone-900 dark:text-stone-100">{formatArabicDisplay(activeChapter.summary.ar, showHarakat)}</p>
                {lang !== 'ar' && <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">{pickText(activeChapter.summary, lang)}</p>}
              </div>
            )}

            {renderSection(
              '14',
              '14–17',
              'المراجع والتوسع والتوثيق الأكاديمي',
              'Further Reading & Academic Attribution',
              <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Classical Sources: </span>
                  {activeChapter.meta.sources.join(' · ')}
                </div>
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Recommended Study: </span>
                  {activeChapter.furtherReading.join(' · ')}
                </div>
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Verification Status: </span>
                  {verificationLabel(activeChapter.meta.status, lang)}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Integrated Chapter Quiz */
          <div className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/90 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  {t('chapterQuiz', lang)} — {activeChapter.titleAr}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {chapterQuestions.length} {lang === 'ar' ? 'أسئلة' : 'questions'} ·{' '}
                  {progress.quizScores[activeChapter.id]
                    ? `Best: ${progress.quizScores[activeChapter.id].best}/${progress.quizScores[activeChapter.id].total}`
                    : 'Not yet scored'}
                </p>
              </div>
              {quizSubmitted && (
                <button
                  type="button"
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-stone-300 hover:bg-stone-50 dark:border-stone-700 dark:hover:bg-stone-800"
                >
                  {lang === 'ar' ? 'إعادة الاختبار' : 'Retake Quiz'}
                </button>
              )}
            </div>

            <div className="space-y-4">
              {chapterQuestions.map((q, idx) => {
                const chosen = quizAnswers[q.id];
                return (
                  <div
                    key={q.id}
                    className="rounded-lg border border-stone-200 p-4 dark:border-stone-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="tabular-nums font-semibold">Q{idx + 1}</span>
                      <span className="capitalize">{q.difficulty}</span>
                    </div>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                      {pickText(q.question, lang)}
                    </p>
                    {q.arabicText && (
                      <div className="font-arabic text-xl font-bold text-emerald-800 dark:text-emerald-400">
                        {formatArabicDisplay(q.arabicText, showHarakat)}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, oi) => {
                        const isSelected = chosen === oi;
                        const isCorrect = q.correctIndex === oi;
                        let style =
                          'border-stone-200 bg-stone-50/50 text-stone-800 hover:border-emerald-700/60 dark:border-stone-800 dark:bg-stone-950/60 dark:text-stone-200';
                        if (quizSubmitted) {
                          if (isCorrect) {
                            style =
                              'border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/70 dark:text-emerald-100';
                          } else if (isSelected && !isCorrect) {
                            style =
                              'border-rose-500 bg-rose-50 text-rose-950 dark:border-rose-500 dark:bg-rose-950/70 dark:text-rose-100';
                          }
                        } else if (isSelected) {
                          style =
                            'border-emerald-700 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-100';
                        }

                        return (
                          <button
                            key={oi}
                            type="button"
                            disabled={quizSubmitted}
                            onClick={() =>
                              setQuizAnswers((prev) => ({ ...prev, [q.id]: oi }))
                            }
                            className={`text-left px-3.5 py-2.5 rounded-lg border text-sm font-arabic transition-colors ${style}`}
                          >
                            {formatArabicDisplay(opt, showHarakat)}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="text-xs text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
                        {pickText(q.explanation, lang)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!quizSubmitted && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-800 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                  {t('checkAnswer', lang)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
