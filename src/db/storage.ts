import {
  AppSettings,
  BookmarkItem,
  ExamAttempt,
  QuizQuestion,
  SRSCard,
  UserProgress,
} from '../types/arabic';
import { buildInitialSRSCards } from '../data/quizzesData';

export const CURRENT_SCHEMA_VERSION = 6;
const STORAGE_KEY = 'sarf_companion_v6_state';
const LEGACY_KEYS = ['sarf_companion_v5_state', 'sarf_companion_state'];
const IDB_NAME = 'SarfCompanionDB';
const IDB_VERSION = 1;
const IDB_STORE = 'app_state';
const IDB_RECORD_KEY = 'user_progress';

export function getDefaultSettings(): AppSettings {
  return {
    language: 'en',
    theme: 'light',
    showHarakat: true,
    showTransliteration: true,
    arabicFontSize: 'normal',
  };
}

export function getDefaultProgress(): UserProgress {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    completedChapters: [],
    quizScores: {},
    incorrectQuestionIds: [],
    weakTopics: {},
    strongTopics: {},
    streakDays: 1,
    lastStudyDate: new Date().toISOString().slice(0, 10),
    recentActivities: [],
    examHistory: [],
    bookmarks: [],
    favoriteVerbIds: ['v-kataba', 'v-qala', 'v-waada'],
    srsCards: buildInitialSRSCards(),
    settings: getDefaultSettings(),
  };
}

/**
 * Backward-compatible migration from v5 or partial/older state objects into v6 schema.
 */
export function migrateProgress(raw: unknown): UserProgress {
  const base = getDefaultProgress();
  if (!raw || typeof raw !== 'object') return base;

  const r = raw as Partial<UserProgress> & {
    language?: AppSettings['language'];
    theme?: AppSettings['theme'];
  };

  const mergedSettings: AppSettings = {
    ...base.settings,
    ...(r.settings && typeof r.settings === 'object' ? r.settings : {}),
  };
  if (r.language && !r.settings?.language) mergedSettings.language = r.language;
  if (r.theme && !r.settings?.theme) mergedSettings.theme = r.theme;

  const seedCards = buildInitialSRSCards();
  const existingCards = r.srsCards && typeof r.srsCards === 'object' ? r.srsCards : {};
  const mergedCards: Record<string, SRSCard> = {
    ...seedCards,
    ...existingCards,
  };

  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    completedChapters: Array.isArray(r.completedChapters) ? r.completedChapters : base.completedChapters,
    quizScores: r.quizScores && typeof r.quizScores === 'object' ? r.quizScores : base.quizScores,
    incorrectQuestionIds: Array.isArray(r.incorrectQuestionIds) ? r.incorrectQuestionIds : base.incorrectQuestionIds,
    weakTopics: r.weakTopics && typeof r.weakTopics === 'object' ? r.weakTopics : base.weakTopics,
    strongTopics: r.strongTopics && typeof r.strongTopics === 'object' ? r.strongTopics : base.strongTopics,
    streakDays: typeof r.streakDays === 'number' && r.streakDays >= 0 ? r.streakDays : base.streakDays,
    lastStudyDate: typeof r.lastStudyDate === 'string' && r.lastStudyDate ? r.lastStudyDate : base.lastStudyDate,
    recentActivities: Array.isArray(r.recentActivities) ? r.recentActivities.slice(0, 25) : base.recentActivities,
    examHistory: Array.isArray(r.examHistory) ? r.examHistory.slice(0, 50) : base.examHistory,
    bookmarks: Array.isArray(r.bookmarks) ? r.bookmarks : base.bookmarks,
    favoriteVerbIds: Array.isArray(r.favoriteVerbIds) ? r.favoriteVerbIds : base.favoriteVerbIds,
    srsCards: mergedCards,
    settings: mergedSettings,
  };
}

function openIDB(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(IDB_NAME, IDB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export function loadProgressSync(): UserProgress {
  if (typeof localStorage === 'undefined') return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return migrateProgress(JSON.parse(raw));
    for (const legacyKey of LEGACY_KEYS) {
      const legacyRaw = localStorage.getItem(legacyKey);
      if (legacyRaw) {
        const migrated = migrateProgress(JSON.parse(legacyRaw));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      }
    }
  } catch {
    // ignore corrupt JSON
  }
  return getDefaultProgress();
}

export async function loadProgressFromIDB(): Promise<UserProgress | null> {
  const db = await openIDB();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.get(IDB_RECORD_KEY);
      req.onsuccess = () => {
        if (req.result) resolve(migrateProgress(req.result));
        else resolve(null);
      };
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function saveProgress(progress: UserProgress): Promise<void> {
  const normalized: UserProgress = {
    ...progress,
    schemaVersion: CURRENT_SCHEMA_VERSION,
  };
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch {
      // storage quota fallback
    }
  }
  const db = await openIDB();
  if (!db) return;
  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const store = tx.objectStore(IDB_STORE);
      store.put(normalized, IDB_RECORD_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

/**
 * SM-2 Spaced Repetition Algorithm
 * quality: 1 = Again, 2 = Hard, 3 = Good, 4 = Easy
 */
export function scheduleSRSCard(card: SRSCard, quality: 1 | 2 | 3 | 4, now = Date.now()): SRSCard {
  // Map 1..4 button scale onto SM-2 q (0..5)
  const sm2q = quality === 1 ? 1 : quality === 2 ? 3 : quality === 3 ? 4 : 5;
  let repetitions = card.repetitions;
  let intervalDays = card.intervalDays;
  let easeFactor = card.easeFactor || 2.5;

  if (sm2q < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    if (repetitions === 0) intervalDays = 1;
    else if (repetitions === 1) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easeFactor);
    if (quality === 4 && repetitions >= 1) {
      intervalDays = Math.round(intervalDays * 1.3);
    }
    repetitions += 1;
  }

  easeFactor = Math.max(
    1.3,
    Number((easeFactor + (0.1 - (5 - sm2q) * (0.08 + (5 - sm2q) * 0.02))).toFixed(2))
  );

  const dayMs = 24 * 60 * 60 * 1000;
  const nextReviewAt = quality === 1 ? now + 10 * 60 * 1000 : now + intervalDays * dayMs;

  return {
    ...card,
    repetitions,
    intervalDays,
    easeFactor,
    lastReviewedAt: now,
    nextReviewAt,
  };
}

export function updateStudyStreak(progress: UserProgress, todayIso = new Date().toISOString().slice(0, 10)): UserProgress {
  if (progress.lastStudyDate === todayIso) return progress;
  const prev = new Date(progress.lastStudyDate + 'T00:00:00Z').getTime();
  const curr = new Date(todayIso + 'T00:00:00Z').getTime();
  const diffDays = Math.round((curr - prev) / (24 * 60 * 60 * 1000));
  const nextStreak = diffDays === 1 ? progress.streakDays + 1 : diffDays > 1 ? 1 : progress.streakDays;
  return {
    ...progress,
    streakDays: Math.max(1, nextStreak),
    lastStudyDate: todayIso,
  };
}

export function recordQuestionOutcome(
  progress: UserProgress,
  question: QuizQuestion,
  isCorrect: boolean
): UserProgress {
  const topic = question.category;
  const weakTopics = { ...progress.weakTopics };
  const strongTopics = { ...progress.strongTopics };
  const incorrectSet = new Set(progress.incorrectQuestionIds);
  const srsCards = { ...progress.srsCards };

  if (isCorrect) {
    strongTopics[topic] = (strongTopics[topic] ?? 0) + 1;
    if (weakTopics[topic] && weakTopics[topic] > 0) weakTopics[topic] -= 1;
    incorrectSet.delete(question.id);
  } else {
    weakTopics[topic] = (weakTopics[topic] ?? 0) + 1;
    incorrectSet.add(question.id);
    // Automatically add an SRS review card to the "mistakes" deck
    const mistakeCardId = `srs-mistake-${question.id}`;
    if (!srsCards[mistakeCardId]) {
      srsCards[mistakeCardId] = {
        id: mistakeCardId,
        deck: 'mistakes',
        frontAr: question.arabicText || question.question.ar,
        frontHint: question.question.en,
        backAr: `${question.options[question.correctIndex]} — ${question.explanation.ar}`,
        backEn: `${question.options[question.correctIndex]} — ${question.explanation.en}`,
        backTl: `${question.options[question.correctIndex]} — ${question.explanation.tl}`,
        exampleAr: question.arabicText,
        easeFactor: 2.3,
        intervalDays: 0,
        repetitions: 0,
        nextReviewAt: Date.now(),
      };
    }
  }

  return updateStudyStreak({
    ...progress,
    weakTopics,
    strongTopics,
    incorrectQuestionIds: Array.from(incorrectSet),
    srsCards,
  });
}

export function appendActivity(progress: UserProgress, title: string, type: string): UserProgress {
  const item = { id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, title, type, timestamp: Date.now() };
  return {
    ...progress,
    recentActivities: [item, ...progress.recentActivities].slice(0, 20),
  };
}

export function toggleBookmarkItem(progress: UserProgress, item: Omit<BookmarkItem, 'savedAt'>): UserProgress {
  const exists = progress.bookmarks.some((b) => b.id === item.id);
  const bookmarks = exists
    ? progress.bookmarks.filter((b) => b.id !== item.id)
    : [{ ...item, savedAt: Date.now() }, ...progress.bookmarks];
  return { ...progress, bookmarks };
}

export function recordExamResult(progress: UserProgress, attempt: ExamAttempt): UserProgress {
  return appendActivity(
    updateStudyStreak({
      ...progress,
      examHistory: [attempt, ...progress.examHistory].slice(0, 50),
    }),
    `${attempt.mode}: ${attempt.score}/${attempt.total} (${attempt.percentage}%)`,
    'exam'
  );
}

export function exportProgressJSON(progress: UserProgress): string {
  return JSON.stringify(progress, null, 2);
}

export function importProgressJSON(jsonText: string): UserProgress {
  const parsed = JSON.parse(jsonText);
  return migrateProgress(parsed);
}
