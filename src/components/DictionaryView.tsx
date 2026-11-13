import React, { useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  ArrowRight,
  Bookmark,
  History,
  Layers,
  Plus,
  Search,
  Sparkles,
  Star,
  Volume2,
  X,
} from 'lucide-react';
import { db, type StoredVerb } from '../db/database';
import { isArabicText, levenshtein, normalizeArabic, normalizeRoot } from '../lib/arabicUtils';
import { speakArabic } from '../lib/tts';
import type { AppSettings, VerbEntry, VerbForm, VerbType } from '../types/sarf';

interface DictionaryViewProps {
  settings: AppSettings;
  onSelectTasreef: (verb: VerbEntry) => void;
  onOpenVerify: () => void;
  onSpeakError: (msg: string) => void;
}

const FORM_FILTERS: Array<'ALL' | VerbForm> = [
  'ALL', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'QI', 'QII', 'QIII', 'QIV',
];

const TYPE_FILTERS: Array<'all' | VerbType> = [
  'all', 'sound', 'hollow', 'defective', 'assimilated', 'doubled', 'hamzated',
];

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  settings,
  onSelectTasreef,
  onOpenVerify,
  onSpeakError,
}) => {
  const [query, setQuery] = useState('');
  const [formFilter, setFormFilter] = useState<'ALL' | VerbForm>('ALL');
  const [typeFilter, setTypeFilter] = useState<'all' | VerbType>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [explorerRoot, setExplorerRoot] = useState<string | null>(null);

  const verbs = useLiveQuery(() => db.verbs.toArray(), []) || [];
  const favorites = useLiveQuery(() => db.favorites.toArray(), []) || [];
  const history = useLiveQuery(
    () => db.history.orderBy('timestamp').reverse().limit(8).toArray(),
    []
  ) || [];

  const favSet = useMemo(() => new Set(favorites.map((f) => f.verbId)), [favorites]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    verbs.forEach((v) => v.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [verbs]);

  // Deterministic Word of the Day based on calendar day
  const wordOfDay = useMemo(() => {
    if (verbs.length === 0) return null;
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
    return verbs[dayOfYear % verbs.length];
  }, [verbs]);

  const filteredVerbs = useMemo(() => {
    let list: StoredVerb[] = verbs;

    if (explorerRoot) {
      const targetRootNorm = normalizeRoot(explorerRoot).replace(/-/g, '');
      list = list.filter((v) => v.rootNorm === targetRootNorm);
    }

    if (formFilter !== 'ALL') {
      list = list.filter((v) => v.form === formFilter);
    }
    if (typeFilter !== 'all') {
      list = list.filter((v) => v.verbType === typeFilter);
    }
    if (tagFilter !== 'all') {
      list = list.filter((v) => v.tags?.includes(tagFilter));
    }
    if (favoritesOnly) {
      list = list.filter((v) => favSet.has(v.id));
    }

    const q = query.trim();
    if (!q) {
      return list.slice(0, 80);
    }

    const isAr = isArabicText(q);
    const qNorm = normalizeArabic(q);
    const qRootNorm = normalizeRoot(q).replace(/-/g, '');
    const qLower = q.toLowerCase();

    const scored: Array<{ verb: StoredVerb; score: number }> = [];

    for (const v of list) {
      let score = 0;

      if (isAr) {
        const masdarNorm = normalizeArabic(v.masdar || '');
        const failNorm = normalizeArabic(v.ismFail || '');
        const mafulNorm = normalizeArabic(v.ismMaful || '');
        const amrNorm = normalizeArabic(v.amr || '');

        if (v.madhiNorm === qNorm || v.mudhariNorm === qNorm) score = 100;
        else if (v.rootNorm === qRootNorm && qRootNorm.length >= 2) score = 95;
        else if (
          v.madhiNorm.startsWith(qNorm) ||
          v.mudhariNorm.startsWith(qNorm) ||
          amrNorm === qNorm
        )
          score = 88;
        else if (
          v.madhiNorm.includes(qNorm) ||
          v.mudhariNorm.includes(qNorm) ||
          masdarNorm.includes(qNorm) ||
          failNorm.includes(qNorm) ||
          mafulNorm.includes(qNorm) ||
          v.rootNorm.includes(qRootNorm)
        )
          score = 72;
        else if (qNorm.length >= 3) {
          const dist = Math.min(
            levenshtein(qNorm, v.madhiNorm),
            levenshtein(qNorm, v.mudhariNorm)
          );
          if (dist <= 1) score = 55;
          else if (dist === 2 && qNorm.length >= 4) score = 38;
        }
      } else {
        // English meaning / tag / bab search with fuzzy fallback
        const meaningsJoined = v.meanings.join(' ').toLowerCase();
        const exactMeaning = v.meanings.some((m) => m.toLowerCase() === qLower || m.toLowerCase() === `to ${qLower}`);
        if (exactMeaning) score = 100;
        else if (v.meanings.some((m) => m.toLowerCase().includes(qLower))) score = 85;
        else if (meaningsJoined.includes(qLower) || v.tags.some((t) => t.toLowerCase().includes(qLower)))
          score = 70;
        else if (qLower.length >= 4) {
          const words = meaningsJoined.replace(/[^a-z\s]/g, '').split(/\s+/);
          for (const w of words) {
            if (w.length >= 4 && levenshtein(qLower, w) <= 1) {
              score = 50;
              break;
            }
          }
        }
      }

      if (score > 0) {
        scored.push({ verb: v, score });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 80).map((s) => s.verb);
  }, [verbs, explorerRoot, formFilter, typeFilter, tagFilter, favoritesOnly, favSet, query]);

  const toggleFavorite = async (verbId: string) => {
    if (favSet.has(verbId)) {
      await db.favorites.delete(verbId);
    } else {
      await db.favorites.put({ verbId, addedAt: Date.now() });
    }
  };

  const handleOpenTasreef = async (verb: VerbEntry) => {
    if (query.trim()) {
      await db.history.add({
        query: query.trim(),
        verbId: verb.id,
        timestamp: Date.now(),
      });
    }
    onSelectTasreef(verb);
  };

  const rootExplorerVerbs = useMemo(() => {
    if (!explorerRoot) return [];
    const target = normalizeRoot(explorerRoot).replace(/-/g, '');
    return verbs.filter((v) => v.rootNorm === target);
  }, [explorerRoot, verbs]);

  return (
    <div className="space-y-6">
      {/* Top Search + Verify Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Arabic (with/without harakat), root (ك-ت-ب), or English..."
            aria-label="Search verbs"
            className="w-full min-h-[48px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-10 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 absolute right-2 top-1/2 -translate-y-1/2"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onOpenVerify}
          className="min-h-[48px] px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Verify / Add Verb</span>
        </button>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={formFilter}
          onChange={(e) => setFormFilter(e.target.value as 'ALL' | VerbForm)}
          aria-label="Filter by verb form"
          className="min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs font-medium text-slate-700 dark:text-slate-200"
        >
          {FORM_FILTERS.map((f) => (
            <option key={f} value={f}>
              {f === 'ALL' ? 'All Forms (I–X, QI–IV)' : `Form ${f}`}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as 'all' | VerbType)}
          aria-label="Filter by verb type"
          className="min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs font-medium text-slate-700 dark:text-slate-200 capitalize"
        >
          {TYPE_FILTERS.map((t) => (
            <option key={t} value={t}>
              {t === 'all' ? 'All Verb Types' : `${t.charAt(0).toUpperCase() + t.slice(1)}`}
            </option>
          ))}
        </select>

        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          aria-label="Filter by tag"
          className="min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs font-medium text-slate-700 dark:text-slate-200"
        >
          <option value="all">All Topics</option>
          {allTags.map((t) => (
            <option key={t} value={t}>
              #{t}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setFavoritesOnly((prev) => !prev)}
          className={`min-h-[40px] px-3 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 transition-colors whitespace-nowrap ${
            favoritesOnly
              ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-amber-500 text-amber-500' : ''}`} />
          <span>Favorites ({favorites.length})</span>
        </button>

        {explorerRoot && (
          <button
            type="button"
            onClick={() => setExplorerRoot(null)}
            className="min-h-[40px] px-3 rounded-xl border border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium inline-flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Root: {explorerRoot}</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Root Explorer Banner if active */}
      {explorerRoot && (
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Root Explorer — <span className="arabic-text text-lg text-emerald-700 dark:text-emerald-400">{explorerRoot}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {rootExplorerVerbs.length} derived verb{rootExplorerVerbs.length === 1 ? '' : 's'} &amp; nouns found offline
              </p>
            </div>
            <button
              type="button"
              onClick={() => setExplorerRoot(null)}
              className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            >
              Show all verbs
            </button>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-300">
            {rootExplorerVerbs.map((rv) => (
              <button
                key={rv.id}
                type="button"
                onClick={() => handleOpenTasreef(rv)}
                className="rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-1.5 hover:border-emerald-600 transition-colors text-left"
              >
                <span className="arabic-text text-base font-bold text-slate-900 dark:text-slate-100">{rv.madhi}</span>
                <span className="mx-1.5 text-slate-400">·</span>
                <span>Form {rv.form}</span>
                <span className="mx-1.5 text-slate-400">·</span>
                <span className="arabic-text text-sm text-emerald-700 dark:text-emerald-400">{rv.masdar}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Word of the Day + Recent History when search is empty */}
      {!query && !explorerRoot && formFilter === 'ALL' && typeFilter === 'all' && !favoritesOnly && wordOfDay && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Word of the Day</span>
                  <span aria-hidden="true">·</span>
                  <span>Form {wordOfDay.form}</span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{wordOfDay.verbType}</span>
                </div>
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {wordOfDay.meanings.join(', ')}
                </p>
                {wordOfDay.examples[0] && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span className="arabic-text text-base text-slate-700 dark:text-slate-200 block">
                      {wordOfDay.examples[0].ar}
                    </span>
                    {wordOfDay.examples[0].en}
                  </p>
                )}
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      speakArabic(`${wordOfDay.madhi}، ${wordOfDay.mudhari}`, {
                        rate: settings.ttsRate,
                        repeat: settings.ttsRepeat,
                        onError: onSpeakError,
                      })
                    }
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/60"
                    aria-label="Pronounce word of the day"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span lang="ar" dir="rtl" className="arabic-scalable font-bold text-slate-900 dark:text-slate-100">
                    {wordOfDay.madhi}
                  </span>
                </div>
                <p className="arabic-text text-lg text-slate-500 dark:text-slate-400">
                  {wordOfDay.mudhari}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setExplorerRoot(wordOfDay.root)}
                className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400"
              >
                Root: <span className="arabic-text text-base">{wordOfDay.root}</span>
              </button>
              <button
                type="button"
                onClick={() => handleOpenTasreef(wordOfDay)}
                className="min-h-[40px] px-4 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium inline-flex items-center gap-1.5 hover:opacity-90"
              >
                <span>Open Tasreef</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 inline-flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                <span>Recent Searches</span>
              </h3>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={() => db.history.clear()}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Search any Arabic verb, triliteral/quadriliteral root, or English meaning. All {verbs.length} verbs load instantly offline.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {history.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setQuery(h.query)}
                    className="min-h-[34px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:border-emerald-600"
                  >
                    {h.query}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="font-mono-num">
          Showing {filteredVerbs.length} of {verbs.length} verbs in IndexedDB
        </span>
        <span>Tap a root to explore related words</span>
      </div>

      {/* Verb Cards Grid */}
      {filteredVerbs.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-3">
          <Bookmark className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            No matching verbs found locally
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try removing diacritics or filters, or verify &amp; add this verb using Gemini or Manual Add.
          </p>
          <button
            type="button"
            onClick={onOpenVerify}
            className="min-h-[44px] px-4 rounded-xl bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-800 inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Verify / Add &ldquo;{query || 'New Verb'}&rdquo;</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {filteredVerbs.map((verb) => {
            const isFav = favSet.has(verb.id);
            return (
              <div
                key={verb.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between gap-3 hover:border-emerald-600/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        Form {verb.form}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{verb.verbType}</span>
                      {verb.source !== 'seed' && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-700 dark:text-amber-400">{verb.source}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
                      {verb.meanings.join(', ')}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <button
                        type="button"
                        onClick={() => setExplorerRoot(verb.root)}
                        className="hover:text-emerald-700 dark:hover:text-emerald-400 underline underline-offset-2"
                        title="Explore all words from this root"
                      >
                        <span className="arabic-text text-sm">{verb.root}</span>
                      </button>
                      <span aria-hidden="true">·</span>
                      <span className="arabic-text text-sm truncate">{verb.masdar}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          speakArabic(`${verb.madhi}، ${verb.mudhari}`, {
                            rate: settings.ttsRate,
                            repeat: settings.ttsRepeat,
                            onError: onSpeakError,
                          })
                        }
                        aria-label={`Pronounce ${verb.madhi}`}
                        className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/60"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <span
                        lang="ar"
                        dir="rtl"
                        className="arabic-scalable font-bold text-slate-900 dark:text-slate-100"
                      >
                        {verb.madhi}
                      </span>
                    </div>
                    <p lang="ar" dir="rtl" className="arabic-text text-base text-slate-500 dark:text-slate-400">
                      {verb.mudhari}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(verb.id)}
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    className="min-h-[40px] px-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center gap-1.5"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        isFav ? 'fill-amber-500 text-amber-500' : 'text-slate-400'
                      }`}
                    />
                    <span>{isFav ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenTasreef(verb)}
                    className="min-h-[40px] px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <span>Tasreef</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
