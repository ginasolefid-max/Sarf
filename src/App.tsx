import { useEffect, useState } from 'react';
import {
  BarChart3,
  Bookmark,
  BookMarked,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Home,
  Languages,
  Layers,
  Library,
  Menu,
  Moon,
  RefreshCw,
  ScrollText,
  Settings,
  Sun,
  Target,
  X,
} from 'lucide-react';
import {
  AppSettings,
  ExamAttempt,
  NahuTermEntry,
  QuizQuestion,
  TextbookChapter,
  UserProgress,
  VocabEntry,
} from './types/arabic';
import { NavSection, t } from './i18n/translations';
import {
  appendActivity,
  getDefaultProgress,
  importProgressJSON,
  loadProgressFromIDB,
  loadProgressSync,
  recordExamResult,
  recordQuestionOutcome,
  saveProgress,
  scheduleSRSCard,
  toggleBookmarkItem,
  updateStudyStreak,
} from './db/storage';
import { SARF_CHAPTERS } from './data/sarfChapters';
import { NAHU_CHAPTERS } from './data/nahuChapters';
import { ConnectivityCaption, OfflineIndicator, PWAInstallButton } from './components/PWAComponents';
import { DashboardView } from './components/DashboardView';
import { TextbookView } from './components/TextbookView';
import { TasreefEngineView } from './components/TasreefEngineView';
import { IrabAnalyzerView } from './components/IrabAnalyzerView';
import {
  NahuDictionaryView,
  SarfDictionaryView,
  VocabDictionaryView,
} from './components/DictionariesView';
import { PracticeCenterView } from './components/PracticeCenterView';
import { ExaminationsView } from './components/ExaminationsView';
import { ReviewSRSView } from './components/ReviewSRSView';
import {
  BookmarksView,
  ProgressView,
  SettingsView,
} from './components/BookmarksProgressSettings';

const NAV_ITEMS: { id: NavSection; icon: typeof Home }[] = [
  { id: 'dashboard', icon: Home },
  { id: 'sarf_textbook', icon: BookOpen },
  { id: 'nahu_textbook', icon: BookMarked },
  { id: 'tasreef', icon: Layers },
  { id: 'irab', icon: ScrollText },
  { id: 'sarf_dict', icon: Library },
  { id: 'nahu_dict', icon: GraduationCap },
  { id: 'vocab_dict', icon: Languages },
  { id: 'practice', icon: Target },
  { id: 'exams', icon: ClipboardCheck },
  { id: 'review', icon: RefreshCw },
  { id: 'bookmarks', icon: Bookmark },
  { id: 'progress', icon: BarChart3 },
  { id: 'settings', icon: Settings },
];

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgressSync());
  const [activeNav, setActiveNav] = useState<NavSection>('dashboard');
  const [selectedSarfChapter, setSelectedSarfChapter] = useState<string>(SARF_CHAPTERS[0].id);
  const [selectedNahuChapter, setSelectedNahuChapter] = useState<string>(NAHU_CHAPTERS[0].id);
  const [tasreefVerbId, setTasreefVerbId] = useState<string | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hydrate from IndexedDB if newer/available
  useEffect(() => {
    let active = true;
    loadProgressFromIDB().then((idbState) => {
      if (active && idbState) {
        setProgress(idbState);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Sync theme class on document root & persist state
  useEffect(() => {
    const root = document.documentElement;
    if (progress.settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    void saveProgress(progress);
  }, [progress]);

  const lang = progress.settings.language;

  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => updater(prev));
  };

  const handleNavigate = (section: NavSection, refId?: string) => {
    setActiveNav(section);
    setMobileMenuOpen(false);
    if (refId) {
      if (section === 'sarf_textbook') setSelectedSarfChapter(refId);
      else if (section === 'nahu_textbook') setSelectedNahuChapter(refId);
      else if (section === 'tasreef') setTasreefVerbId(refId);
    }
  };

  const handleToggleChapterComplete = (chapterId: string) => {
    updateProgress((prev) => {
      const exists = prev.completedChapters.includes(chapterId);
      const completedChapters = exists
        ? prev.completedChapters.filter((id) => id !== chapterId)
        : [...prev.completedChapters, chapterId];
      const next = updateStudyStreak({ ...prev, completedChapters });
      return exists ? next : appendActivity(next, `Completed ${chapterId}`, 'chapter');
    });
  };

  const handleToggleBookmarkChapter = (ch: TextbookChapter) => {
    updateProgress((prev) =>
      toggleBookmarkItem(prev, {
        id: `bm-ch-${ch.id}`,
        type: 'chapter',
        refId: ch.id,
        titleAr: ch.titleAr,
        subtitle: `${ch.discipline.toUpperCase()} Ch. ${ch.number} · ${ch.titleEn}`,
      })
    );
  };

  const handleChapterQuizComplete = (
    chapterId: string,
    score: number,
    total: number,
    outcomes: { q: QuizQuestion; ok: boolean }[]
  ) => {
    updateProgress((prev) => {
      let next = prev;
      for (const item of outcomes) {
        next = recordQuestionOutcome(next, item.q, item.ok);
      }
      const prevScore = next.quizScores[chapterId];
      const best = Math.max(prevScore?.best ?? 0, score);
      const attempts = (prevScore?.attempts ?? 0) + 1;
      next = {
        ...next,
        quizScores: {
          ...next.quizScores,
          [chapterId]: { best, total, attempts },
        },
      };
      return appendActivity(next, `Quiz ${chapterId}: ${score}/${total}`, 'quiz');
    });
  };

  const handleToggleFavoriteVerb = (verbId: string) => {
    updateProgress((prev) => {
      const exists = prev.favoriteVerbIds.includes(verbId);
      const favoriteVerbIds = exists
        ? prev.favoriteVerbIds.filter((id) => id !== verbId)
        : [...prev.favoriteVerbIds, verbId];
      return { ...prev, favoriteVerbIds };
    });
  };

  const handleToggleBookmarkSentence = (sentence: string, translation: string) => {
    updateProgress((prev) =>
      toggleBookmarkItem(prev, {
        id: `bm-sent-${sentence}`,
        type: 'sentence',
        refId: sentence,
        titleAr: sentence,
        subtitle: translation,
      })
    );
  };

  const handleToggleBookmarkTerm = (term: NahuTermEntry) => {
    updateProgress((prev) =>
      toggleBookmarkItem(prev, {
        id: `bm-term-${term.id}`,
        type: 'nahu_term',
        refId: term.id,
        titleAr: term.termAr,
        subtitle: `${term.meaningEn} · ${term.transliteration}`,
      })
    );
  };

  const handleToggleBookmarkVocab = (w: VocabEntry) => {
    updateProgress((prev) =>
      toggleBookmarkItem(prev, {
        id: `bm-voc-${w.id}`,
        type: 'vocab',
        refId: w.id,
        titleAr: w.arabic,
        subtitle: `${w.meaningEn} · ${w.meaningTl}`,
      })
    );
  };

  const handleFinishExam = (
    attempt: ExamAttempt,
    outcomes: { q: QuizQuestion; ok: boolean }[]
  ) => {
    updateProgress((prev) => {
      let next = prev;
      for (const item of outcomes) {
        next = recordQuestionOutcome(next, item.q, item.ok);
      }
      return recordExamResult(next, attempt);
    });
  };

  const handleRateSRS = (cardId: string, quality: 1 | 2 | 3 | 4) => {
    updateProgress((prev) => {
      const card = prev.srsCards[cardId];
      if (!card) return prev;
      const updated = scheduleSRSCard(card, quality);
      return updateStudyStreak({
        ...prev,
        srsCards: { ...prev.srsCards, [cardId]: updated },
      });
    });
  };

  const handleUpdateSettings = (patch: Partial<AppSettings>) => {
    updateProgress((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...patch },
    }));
  };

  const handleImportProgress = (jsonText: string): boolean => {
    try {
      const migrated = importProgressJSON(jsonText);
      setProgress(migrated);
      return true;
    } catch {
      return false;
    }
  };

  const handleResetProgress = () => {
    setProgress(getDefaultProgress());
  };

  const dueCount = Object.values(progress.srsCards).filter(
    (c) => c.nextReviewAt <= Date.now()
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <OfflineIndicator lang={lang} />

      {/* Minimalist Top Bar (Clean 3-Zone Header) */}
      <header className="no-print sticky top-0 z-30 h-14 border-b border-stone-200 bg-white/95 backdrop-blur px-4 flex items-center justify-between gap-3 dark:border-stone-800 dark:bg-stone-950/95">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden p-1.5 rounded-lg border border-stone-200 text-stone-700 dark:border-stone-800 dark:text-stone-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={() => handleNavigate('dashboard')}
            className="flex items-center gap-2.5 text-left min-w-0"
          >
            <span className="font-arabic text-xl font-bold text-emerald-800 dark:text-emerald-400 shrink-0">
              صرف
            </span>
            <span className="font-bold text-sm sm:text-base truncate text-stone-900 dark:text-stone-50">
              {t('appName', lang)}
            </span>
          </button>
        </div>

        <div className="hidden md:flex items-center">
          <ConnectivityCaption lang={lang} />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <PWAInstallButton lang={lang} />

          {/* Language Switcher */}
          <div className="inline-flex rounded-lg border border-stone-200 dark:border-stone-800 overflow-hidden text-xs">
            {(['ar', 'en', 'tl'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => handleUpdateSettings({ language: l })}
                className={`px-2 py-1 font-semibold uppercase transition-colors ${
                  lang === l
                    ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                    : 'bg-white text-stone-600 hover:bg-stone-100 dark:bg-stone-900 dark:text-stone-300'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              handleUpdateSettings({
                theme: progress.settings.theme === 'dark' ? 'light' : 'dark',
              })
            }
            className="p-2 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800"
            aria-label="Toggle Light/Dark Theme"
          >
            {progress.settings.theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="no-print hidden lg:flex lg:flex-col w-60 shrink-0 border-r border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950 p-3">
          <nav className="space-y-1 flex-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                      : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-900'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{t(item.id, lang)}</span>
                  </span>
                  {item.id === 'review' && dueCount > 0 && (
                    <span className={`tabular-nums text-[11px] ${active ? 'text-emerald-100' : 'text-emerald-700 dark:text-emerald-400'}`}>
                      {dueCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="no-print fixed inset-0 z-40 lg:hidden flex">
            <div
              className="fixed inset-0 bg-stone-950/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="relative z-10 w-64 max-w-full bg-white dark:bg-stone-950 border-r border-stone-200 dark:border-stone-800 p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-sm">Navigation</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold ${
                        active
                          ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                          : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-900'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{t(item.id, lang)}</span>
                      </span>
                      {item.id === 'review' && dueCount > 0 && (
                        <span className="tabular-nums text-[11px]">{dueCount}</span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main View Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 max-w-7xl mx-auto w-full">
          {activeNav === 'dashboard' && (
            <DashboardView progress={progress} onNavigate={handleNavigate} />
          )}

          {activeNav === 'sarf_textbook' && (
            <TextbookView
              discipline="sarf"
              chapters={SARF_CHAPTERS}
              selectedChapterId={selectedSarfChapter}
              progress={progress}
              onSelectChapter={setSelectedSarfChapter}
              onToggleComplete={handleToggleChapterComplete}
              onToggleBookmark={handleToggleBookmarkChapter}
              onQuizComplete={handleChapterQuizComplete}
            />
          )}

          {activeNav === 'nahu_textbook' && (
            <TextbookView
              discipline="nahu"
              chapters={NAHU_CHAPTERS}
              selectedChapterId={selectedNahuChapter}
              progress={progress}
              onSelectChapter={setSelectedNahuChapter}
              onToggleComplete={handleToggleChapterComplete}
              onToggleBookmark={handleToggleBookmarkChapter}
              onQuizComplete={handleChapterQuizComplete}
            />
          )}

          {activeNav === 'tasreef' && (
            <TasreefEngineView
              initialVerbId={tasreefVerbId}
              progress={progress}
              onToggleFavoriteVerb={handleToggleFavoriteVerb}
              onRecordActivity={(title, type) =>
                updateProgress((prev) => appendActivity(prev, title, type))
              }
            />
          )}

          {activeNav === 'irab' && (
            <IrabAnalyzerView
              progress={progress}
              onToggleBookmarkSentence={handleToggleBookmarkSentence}
              onRecordActivity={(title, type) =>
                updateProgress((prev) => appendActivity(prev, title, type))
              }
            />
          )}

          {activeNav === 'sarf_dict' && (
            <SarfDictionaryView
              progress={progress}
              onOpenInTasreef={(verbId) => handleNavigate('tasreef', verbId)}
              onToggleFavoriteVerb={handleToggleFavoriteVerb}
            />
          )}

          {activeNav === 'nahu_dict' && (
            <NahuDictionaryView
              progress={progress}
              onToggleBookmarkTerm={handleToggleBookmarkTerm}
            />
          )}

          {activeNav === 'vocab_dict' && (
            <VocabDictionaryView
              progress={progress}
              onToggleBookmarkVocab={handleToggleBookmarkVocab}
            />
          )}

          {activeNav === 'practice' && (
            <PracticeCenterView
              progress={progress}
              onRecordOutcome={(q, ok) =>
                updateProgress((prev) => recordQuestionOutcome(prev, q, ok))
              }
            />
          )}

          {activeNav === 'exams' && (
            <ExaminationsView
              progress={progress}
              onFinishExam={handleFinishExam}
            />
          )}

          {activeNav === 'review' && (
            <ReviewSRSView progress={progress} onRateCard={handleRateSRS} />
          )}

          {activeNav === 'bookmarks' && (
            <BookmarksView
              progress={progress}
              onRemoveBookmark={(id) =>
                updateProgress((prev) => ({
                  ...prev,
                  bookmarks: prev.bookmarks.filter((b) => b.id !== id),
                }))
              }
              onNavigate={handleNavigate}
            />
          )}

          {activeNav === 'progress' && <ProgressView progress={progress} />}

          {activeNav === 'settings' && (
            <SettingsView
              progress={progress}
              onUpdateSettings={handleUpdateSettings}
              onImportProgress={handleImportProgress}
              onResetProgress={handleResetProgress}
            />
          )}
        </main>
      </div>
    </div>
  );
}
