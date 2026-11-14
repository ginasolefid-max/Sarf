import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  Layers,
  RefreshCw,
  ScrollText,
  Sparkles,
  Target,
} from 'lucide-react';
import { UserProgress } from '../types/arabic';
import { NavSection, t } from '../i18n/translations';
import { SARF_CHAPTERS } from '../data/sarfChapters';
import { NAHU_CHAPTERS } from '../data/nahuChapters';

interface DashboardViewProps {
  progress: UserProgress;
  onNavigate: (section: NavSection, chapterId?: string) => void;
}

export function DashboardView({ progress, onNavigate }: DashboardViewProps) {
  const lang = progress.settings.language;
  const completedSet = new Set(progress.completedChapters);

  const sarfCompleted = SARF_CHAPTERS.filter((c) => completedSet.has(c.id)).length;
  const nahuCompleted = NAHU_CHAPTERS.filter((c) => completedSet.has(c.id)).length;
  const sarfPct = Math.round((sarfCompleted / SARF_CHAPTERS.length) * 100);
  const nahuPct = Math.round((nahuCompleted / NAHU_CHAPTERS.length) * 100);

  const nextSarf = SARF_CHAPTERS.find((c) => !completedSet.has(c.id)) ?? SARF_CHAPTERS[0];
  const nextNahu = NAHU_CHAPTERS.find((c) => !completedSet.has(c.id)) ?? NAHU_CHAPTERS[0];

  const now = Date.now();
  const dueSrsCount = Object.values(progress.srsCards).filter((c) => c.nextReviewAt <= now).length;

  const weakEntries = Object.entries(progress.weakTopics)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const avgExam =
    progress.examHistory.length > 0
      ? Math.round(
          progress.examHistory.reduce((acc, e) => acc + e.percentage, 0) /
            progress.examHistory.length
        )
      : null;

  return (
    <div className="space-y-6">
      {/* Top Academic Header & Summary Metrics */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/90">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              {lang === 'ar'
                ? 'منهج الصرف والنحو الأكاديمي المتكامل'
                : lang === 'tl'
                  ? 'Komprehensibong Kurikulum ng Sarf at Nahu'
                  : 'Classical & Modern Standard Arabic Curriculum'}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50">
              {t('continueLearning', lang)}
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              {lang === 'ar'
                ? `${SARF_CHAPTERS.length} بابًا في علم الصرف و${NAHU_CHAPTERS.length} بابًا في علم النحو مع محرك تصريف ومحلل إعراب ومراجعة متباعدة.`
                : lang === 'tl'
                  ? `${SARF_CHAPTERS.length} kabanata sa Sarf at ${NAHU_CHAPTERS.length} kabanata sa Nahu na may Tasreef Engine at I'rab Analyzer.`
                  : `${SARF_CHAPTERS.length} Sarf chapters & ${NAHU_CHAPTERS.length} Nahu chapters paired with deterministic Tasreef, I'rab parsing, and SM-2 retention.`}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 px-3.5 py-2.5 dark:border-stone-800 dark:bg-stone-950/60">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{lang === 'ar' ? 'السلسلة' : lang === 'tl' ? 'Streak' : 'Streak'}</span>
              </div>
              <p className="mt-1 text-xl font-bold tabular-nums text-stone-900 dark:text-stone-100">
                {progress.streakDays} {lang === 'ar' ? 'يوم' : 'd'}
              </p>
            </div>

            <div className="rounded-lg border border-stone-200 bg-stone-50/70 px-3.5 py-2.5 dark:border-stone-800 dark:bg-stone-950/60">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>{t('dailyReview', lang)}</span>
              </div>
              <p className="mt-1 text-xl font-bold tabular-nums text-stone-900 dark:text-stone-100">
                {dueSrsCount}
              </p>
            </div>

            <div className="rounded-lg border border-stone-200 bg-stone-50/70 px-3.5 py-2.5 dark:border-stone-800 dark:bg-stone-950/60">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>{lang === 'ar' ? 'الأبواب' : 'Chapters'}</span>
              </div>
              <p className="mt-1 text-xl font-bold tabular-nums text-stone-900 dark:text-stone-100">
                {sarfCompleted + nahuCompleted}/{SARF_CHAPTERS.length + NAHU_CHAPTERS.length}
              </p>
            </div>

            <div className="rounded-lg border border-stone-200 bg-stone-50/70 px-3.5 py-2.5 dark:border-stone-800 dark:bg-stone-950/60">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                <ClipboardCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>{lang === 'ar' ? 'معدل الاختبار' : 'Exam Avg'}</span>
              </div>
              <p className="mt-1 text-xl font-bold tabular-nums text-stone-900 dark:text-stone-100">
                {avgExam !== null ? `${avgExam}%` : '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Separate Sarf and Nahu Mastery Bars */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pt-5 border-t border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-semibold text-stone-800 dark:text-stone-200">{t('sarfProgress', lang)}</span>
              <span className="tabular-nums text-xs text-stone-600 dark:text-stone-400">
                {sarfCompleted}/{SARF_CHAPTERS.length} · {sarfPct}%
              </span>
            </div>
            <div className="h-2.5 w-full rounded bg-stone-200 dark:bg-stone-800 overflow-hidden">
              <div
                className="h-full bg-emerald-700 dark:bg-emerald-500 transition-all"
                style={{ width: `${sarfPct}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-semibold text-stone-800 dark:text-stone-200">{t('nahuProgress', lang)}</span>
              <span className="tabular-nums text-xs text-stone-600 dark:text-stone-400">
                {nahuCompleted}/{NAHU_CHAPTERS.length} · {nahuPct}%
              </span>
            </div>
            <div className="h-2.5 w-full rounded bg-stone-200 dark:bg-stone-800 overflow-hidden">
              <div
                className="h-full bg-amber-600 dark:bg-amber-500 transition-all"
                style={{ width: `${nahuPct}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Today's Suggested Lessons (Sarf + Nahu) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
              <span>{lang === 'ar' ? 'درس الصرف المقترح اليوم' : "Today's Suggested Sarf Lesson"}</span>
              <span>#{nextSarf.number} · {nextSarf.level}</span>
            </div>
            <h3 className="font-arabic mt-2 text-2xl font-bold text-stone-900 dark:text-stone-50">
              {nextSarf.titleAr}
            </h3>
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {lang === 'tl' ? nextSarf.titleTl : nextSarf.titleEn}
            </p>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
              {nextSarf.introduction[lang]}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {nextSarf.meta.sources[0]}
            </span>
            <button
              type="button"
              onClick={() => onNavigate('sarf_textbook', nextSarf.id)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-800 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors"
            >
              <span>{lang === 'ar' ? 'افتح الدرس' : 'Open Lesson'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
              <span>{lang === 'ar' ? 'درس النحو المقترح اليوم' : "Today's Suggested Nahu Lesson"}</span>
              <span>#{nextNahu.number} · {nextNahu.level}</span>
            </div>
            <h3 className="font-arabic mt-2 text-2xl font-bold text-stone-900 dark:text-stone-50">
              {nextNahu.titleAr}
            </h3>
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
              {lang === 'tl' ? nextNahu.titleTl : nextNahu.titleEn}
            </p>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
              {nextNahu.introduction[lang]}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {nextNahu.meta.sources[0]}
            </span>
            <button
              type="button"
              onClick={() => onNavigate('nahu_textbook', nextNahu.id)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
            >
              <span>{lang === 'ar' ? 'افتح الدرس' : 'Open Lesson'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Interactive Engines & Practice Launchers */}
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3">
          {t('quickTools', lang)}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {[
            {
              nav: 'tasreef' as NavSection,
              icon: Layers,
              title: t('tasreef', lang),
              sub: lang === 'ar' ? 'تصريف الأفعال والضمائر الـ ١٤' : '14-pronoun engine · Forms I–X & Q',
            },
            {
              nav: 'irab' as NavSection,
              icon: ScrollText,
              title: t('irab', lang),
              sub: lang === 'ar' ? 'تحليل الجمل والعوامل الإعرابية' : 'Sentence parsing & manual mode',
            },
            {
              nav: 'practice' as NavSection,
              icon: Target,
              title: t('practice', lang),
              sub: lang === 'ar' ? '١٥ مسارًا للتدريب العملي' : '15 interactive grammar drills',
            },
            {
              nav: 'review' as NavSection,
              icon: Sparkles,
              title: t('review', lang),
              sub: lang === 'ar' ? `${dueSrsCount} بطاقة مستحقة الآن` : `${dueSrsCount} cards due for SM-2 review`,
            },
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.nav}
                type="button"
                onClick={() => onNavigate(tool.nav)}
                className="text-left rounded-xl border border-stone-200 bg-white p-4 hover:border-emerald-700/50 dark:border-stone-800 dark:bg-stone-900/90 dark:hover:border-emerald-500/50 transition-colors"
              >
                <Icon className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <div className="mt-2.5 font-semibold text-sm text-stone-900 dark:text-stone-100">
                  {tool.title}
                </div>
                <div className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                  {tool.sub}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Weak Subjects + Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-stone-900 dark:text-stone-100">
              {t('weakSubjects', lang)}
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('practice')}
              className="text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400"
            >
              {lang === 'ar' ? 'تدرّب الآن' : 'Practice Now'}
            </button>
          </div>
          {weakEntries.length === 0 ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {lang === 'ar'
                ? 'لم تُسجَّل نقاط ضعف بعد. أتمّ اختبارات الفصول أو التمارين لرصد المحاور المحتاجة للتعزيز.'
                : 'No weak areas flagged yet. Complete chapter quizzes or drills to surface targeted focus topics.'}
            </p>
          ) : (
            <ul className="divide-y divide-stone-100 dark:divide-stone-800">
              {weakEntries.map(([topic, count]) => (
                <li key={topic} className="py-2.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-stone-800 dark:text-stone-200 capitalize">
                    {topic.replace(/_/g, ' ')}
                  </span>
                  <span className="tabular-nums text-xs text-amber-700 dark:text-amber-400">
                    {count} {lang === 'ar' ? 'أخطاء' : 'missed'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-stone-900 dark:text-stone-100">
              {lang === 'ar' ? 'أحدث الأنشطة' : 'Recent Study Activity'}
            </h3>
            <BookOpen className="w-4 h-4 text-stone-400" />
          </div>
          {progress.recentActivities.length === 0 ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {lang === 'ar'
                ? 'ابدأ بقراءة باب من كتاب الصرف أو النحو أو جرّب محرك التصريف لتسجيل نشاطك.'
                : 'Open a textbook chapter, conjugate a verb, or parse a sentence to start tracking your study log.'}
            </p>
          ) : (
            <ul className="divide-y divide-stone-100 dark:divide-stone-800">
              {progress.recentActivities.slice(0, 5).map((act) => (
                <li key={act.id} className="py-2 flex items-center justify-between gap-3 text-sm">
                  <span className="truncate text-stone-800 dark:text-stone-200">{act.title}</span>
                  <span className="text-xs text-stone-400 shrink-0">
                    {new Date(act.timestamp).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
