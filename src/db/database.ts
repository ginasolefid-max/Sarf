import Dexie, { type Table } from 'dexie';
import { normalizeArabic, normalizeRoot } from '../lib/arabicUtils';
import type {
  BookProgress,
  FlashcardProgress,
  OfflineVerifyQueueItem,
  SearchHistoryItem,
  StudyStat,
  VerbEntry,
  VerbNote,
} from '../types/sarf';

export interface StoredVerb extends VerbEntry {
  madhiNorm: string;
  mudhariNorm: string;
  rootNorm: string;
}

export interface FavoriteRecord {
  verbId: string;
  addedAt: number;
}

class SarfDatabase extends Dexie {
  verbs!: Table<StoredVerb, string>;
  favorites!: Table<FavoriteRecord, string>;
  flashcards!: Table<FlashcardProgress, string>;
  notes!: Table<VerbNote, string>;
  history!: Table<SearchHistoryItem, number>;
  bookProgress!: Table<BookProgress, string>;
  verifyQueue!: Table<OfflineVerifyQueueItem, number>;
  studyStats!: Table<StudyStat, string>;

  constructor() {
    super('SarfCompanionDB');
    this.version(1).stores({
      verbs: 'id, root, rootNorm, madhiNorm, mudhariNorm, form, letters, verbType, source, *tags',
      favorites: 'verbId, addedAt',
      flashcards: 'verbId, nextReview',
      notes: 'verbId, updatedAt',
      history: '++id, query, verbId, timestamp',
      bookProgress: 'chapterId, read, bookmarked',
      verifyQueue: '++id, status, createdAt',
      studyStats: 'date',
    });
  }
}

export const db = new SarfDatabase();

export function toStoredVerb(verb: VerbEntry): StoredVerb {
  return {
    ...verb,
    madhiNorm: normalizeArabic(verb.madhi),
    mudhariNorm: normalizeArabic(verb.mudhari),
    rootNorm: normalizeRoot(verb.root).replace(/-/g, ''),
  };
}

const SEED_VERSION_KEY = 'sarf_seed_version_v1';
const CURRENT_SEED_VERSION = '1.1.0';

export async function seedDatabaseIfNeeded(): Promise<{ seeded: boolean; count: number }> {
  const existingCount = await db.verbs.count();
  const storedVersion = localStorage.getItem(SEED_VERSION_KEY);

  if (existingCount > 0 && storedVersion === CURRENT_SEED_VERSION) {
    return { seeded: false, count: existingCount };
  }

  const response = await fetch('./data/verbs.json');
  if (!response.ok) {
    if (existingCount > 0) return { seeded: false, count: existingCount };
    throw new Error(`Failed to load seed verbs (${response.status})`);
  }

  const rawVerbs: VerbEntry[] = await response.json();
  const storedVerbs = rawVerbs.map(toStoredVerb);

  await db.verbs.bulkPut(storedVerbs);
  localStorage.setItem(SEED_VERSION_KEY, CURRENT_SEED_VERSION);

  const finalCount = await db.verbs.count();
  return { seeded: true, count: finalCount };
}

export async function recordStudyActivity(type: 'reviews' | 'quizzes' | 'drills'): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const existing = await db.studyStats.get(today);
  if (existing) {
    await db.studyStats.update(today, { [type]: existing[type] + 1 });
  } else {
    await db.studyStats.put({
      date: today,
      reviews: type === 'reviews' ? 1 : 0,
      quizzes: type === 'quizzes' ? 1 : 0,
      drills: type === 'drills' ? 1 : 0,
    });
  }
}

export async function computeStreak(): Promise<number> {
  const stats = await db.studyStats.orderBy('date').reverse().toArray();
  if (stats.length === 0) return 0;

  const activeDates = new Set(
    stats
      .filter((s) => s.reviews + s.quizzes + s.drills > 0)
      .map((s) => s.date)
  );

  let streak = 0;
  const cursor = new Date();
  const todayStr = cursor.toISOString().slice(0, 10);

  // Allow streak if today or yesterday was active
  if (!activeDates.has(todayStr)) {
    cursor.setDate(cursor.getDate() - 1);
    if (!activeDates.has(cursor.toISOString().slice(0, 10))) {
      return 0;
    }
  }

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (activeDates.has(key)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export interface BackupPayload {
  exportedAt: string;
  version: number;
  customVerbs: VerbEntry[];
  favorites: FavoriteRecord[];
  flashcards: FlashcardProgress[];
  notes: VerbNote[];
  bookProgress: BookProgress[];
  studyStats: StudyStat[];
}

export async function exportUserData(): Promise<BackupPayload> {
  const customVerbs = await db.verbs.where('source').notEqual('seed').toArray();
  const favorites = await db.favorites.toArray();
  const flashcards = await db.flashcards.toArray();
  const notes = await db.notes.toArray();
  const bookProgress = await db.bookProgress.toArray();
  const studyStats = await db.studyStats.toArray();

  return {
    exportedAt: new Date().toISOString(),
    version: 1,
    customVerbs,
    favorites,
    flashcards,
    notes,
    bookProgress,
    studyStats,
  };
}

export async function importUserData(payload: BackupPayload): Promise<void> {
  await db.transaction(
    'rw',
    [db.verbs, db.favorites, db.flashcards, db.notes, db.bookProgress, db.studyStats],
    async () => {
      if (Array.isArray(payload.customVerbs) && payload.customVerbs.length > 0) {
        await db.verbs.bulkPut(payload.customVerbs.map(toStoredVerb));
      }
      if (Array.isArray(payload.favorites)) {
        await db.favorites.bulkPut(payload.favorites);
      }
      if (Array.isArray(payload.flashcards)) {
        await db.flashcards.bulkPut(payload.flashcards);
      }
      if (Array.isArray(payload.notes)) {
        await db.notes.bulkPut(payload.notes);
      }
      if (Array.isArray(payload.bookProgress)) {
        await db.bookProgress.bulkPut(payload.bookProgress);
      }
      if (Array.isArray(payload.studyStats)) {
        await db.studyStats.bulkPut(payload.studyStats);
      }
    }
  );
}
