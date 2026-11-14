import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Search,
  Star,
  Volume2,
} from 'lucide-react';
import {
  NahuTermEntry,
  UserProgress,
  VerbEntry,
  VocabCategory,
  VocabEntry,
} from '../types/arabic';
import { VERBS_DATABASE } from '../data/verbsDatabase';
import {
  NAHU_DICTIONARY,
  PARTICLES_REFERENCE,
  VOCAB_DICTIONARY,
} from '../data/dictionaries';
import { pickText, t } from '../i18n/translations';
import { formatArabicDisplay } from './ArabicKeyboardHelper';

interface SarfDictionaryViewProps {
  progress: UserProgress;
  onOpenInTasreef: (verbId: string) => void;
  onToggleFavoriteVerb: (verbId: string) => void;
}

export function SarfDictionaryView({
  progress,
  onOpenInTasreef,
  onToggleFavoriteVerb,
}: SarfDictionaryViewProps) {
  const lang = progress.settings.language;
  const showHarakat = progress.settings.showHarakat;
  const [query, setQuery] = useState('');
  const [formFilter, setFormFilter] = useState('all');
  const [clsFilter, setClsFilter] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VERBS_DATABASE.filter((v) => {
      if (formFilter !== 'all' && v.form !== formFilter) return false;
      if (clsFilter !== 'all' && !v.classification.includes(clsFilter)) return false;
      if (!q) return true;
      return (
        v.past.includes(query.trim()) ||
        v.root.includes(query.trim()) ||
        v.meaning.en.toLowerCase().includes(q) ||
        v.meaning.tl.toLowerCase().includes(q) ||
        v.meaning.ar.includes(query.trim())
      );
    });
  }, [query, formFilter, clsFilter]);

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-3">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
          {t('sarf_dict', lang)} ({filtered.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder', lang)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
            />
          </div>
          <select
            value={formFilter}
            onChange={(e) => setFormFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-stone-300 bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          >
            <option value="all">All Forms (I–X, QI–QII)</option>
            {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'QI', 'QII'].map((f) => (
              <option key={f} value={f}>Form {f}</option>
            ))}
          </select>
          <select
            value={clsFilter}
            onChange={(e) => setClsFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-stone-300 bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          >
            <option value="all">All Verb Types</option>
            <option value="sound">Sound (سالم)</option>
            <option value="mithal">Mithal (مثال)</option>
            <option value="ajwaf">Ajwaf (أجوف)</option>
            <option value="naqis">Naqis (ناقص)</option>
            <option value="lafif">Lafif (لفيف)</option>
            <option value="mudaaf">Muda'af (مضعف)</option>
            <option value="mahmuz">Mahmuz (مهموز)</option>
          </select>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((verb: VerbEntry) => {
          const isFav = progress.favoriteVerbIds.includes(verb.id);
          return (
            <div
              key={verb.id}
              className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900/90 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      Form {verb.form} · {verb.classification.replace(/_/g, ' ')} · {verb.root}
                    </div>
                    <h3 className="font-arabic text-2xl font-bold text-stone-900 dark:text-stone-50 mt-1">
                      {formatArabicDisplay(verb.past, showHarakat)} —{' '}
                      {formatArabicDisplay(verb.present, showHarakat)} —{' '}
                      {formatArabicDisplay(verb.imperative, showHarakat)}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleFavoriteVerb(verb.id)}
                    className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                    aria-label="Favorite verb"
                  >
                    <Star className={`w-4 h-4 ${isFav ? 'fill-amber-500 text-amber-500' : 'text-stone-400'}`} />
                  </button>
                </div>
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400 mt-1">
                  {pickText(verb.meaning, lang)}
                </p>
                <div className="mt-2 text-xs text-stone-600 dark:text-stone-400 font-arabic">
                  المصدر: {formatArabicDisplay(verb.masdar, showHarakat)}
                  {verb.ismFail ? ` · الفاعل: ${formatArabicDisplay(verb.ismFail, showHarakat)}` : ''}
                  {verb.ismMaful ? ` · المفعول: ${formatArabicDisplay(verb.ismMaful, showHarakat)}` : ''}
                </div>
                <p className="mt-2 font-arabic text-sm text-stone-800 dark:text-stone-200">
                  {formatArabicDisplay(verb.example.ar, showHarakat)}
                </p>
                {lang !== 'ar' && (
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {pickText(verb.example, lang)}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">{verb.meta.sources[0]}</span>
                <button
                  type="button"
                  onClick={() => onOpenInTasreef(verb.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:underline dark:text-emerald-400"
                >
                  <span>{lang === 'ar' ? 'صرِّف الفعل' : 'Conjugate in Tasreef'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface NahuDictionaryViewProps {
  progress: UserProgress;
  onToggleBookmarkTerm: (term: NahuTermEntry) => void;
}

export function NahuDictionaryView({
  progress,
  onToggleBookmarkTerm,
}: NahuDictionaryViewProps) {
  const lang = progress.settings.language;
  const showHarakat = progress.settings.showHarakat;
  const [tab, setTab] = useState<'terms' | 'particles'>('terms');
  const [query, setQuery] = useState('');

  const filteredTerms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NAHU_DICTIONARY.filter((item) => {
      if (!q) return true;
      return (
        item.termAr.includes(query.trim()) ||
        item.meaningEn.toLowerCase().includes(q) ||
        item.meaningTl.toLowerCase().includes(q) ||
        item.definitionAr.includes(query.trim())
      );
    });
  }, [query]);

  const filteredParticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PARTICLES_REFERENCE.filter((p) => {
      if (!q) return true;
      return (
        p.arabic.includes(query.trim()) ||
        p.group.includes(query.trim()) ||
        p.groupEn.toLowerCase().includes(q) ||
        p.effectEn.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            {t('nahu_dict', lang)}
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTab('terms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                tab === 'terms'
                  ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                  : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {lang === 'ar' ? `المصطلحات النحوية (${NAHU_DICTIONARY.length})` : `Grammatical Terms (${NAHU_DICTIONARY.length})`}
            </button>
            <button
              type="button"
              onClick={() => setTab('particles')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                tab === 'particles'
                  ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                  : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {lang === 'ar' ? `دليل الحروف والأدوات (${PARTICLES_REFERENCE.length})` : `Particles Reference (${PARTICLES_REFERENCE.length})`}
            </button>
          </div>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder', lang)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          />
        </div>
      </section>

      {tab === 'terms' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((term) => {
            const saved = progress.bookmarks.some((b) => b.id === `bm-term-${term.id}`);
            return (
              <div
                key={term.id}
                className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900/90 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-stone-500">
                      {term.category}
                    </div>
                    <h3 className="font-arabic text-2xl font-bold text-stone-900 dark:text-stone-50">
                      {formatArabicDisplay(term.termAr, showHarakat)}
                    </h3>
                    <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                      {lang === 'tl' ? term.meaningTl : term.meaningEn} · {term.transliteration}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleBookmarkTerm(term)}
                    className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    {saved ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4 text-stone-400" />}
                  </button>
                </div>
                <p className="font-arabic text-sm text-stone-800 dark:text-stone-200">
                  {formatArabicDisplay(term.definitionAr, showHarakat)}
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  {pickText(term.ruleExplanation, lang)}
                </p>
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 font-arabic text-sm text-stone-800 dark:text-stone-200">
                  {formatArabicDisplay(term.example.ar, showHarakat)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredParticles.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900/90 space-y-2"
            >
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                {p.group} · {p.groupEn}
              </div>
              <div className="font-arabic text-xl font-bold text-stone-900 dark:text-stone-50">
                {formatArabicDisplay(p.arabic, showHarakat)}
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300">
                {lang === 'ar' ? p.effectAr : lang === 'tl' ? p.effectTl : p.effectEn}
              </p>
              <div className="font-arabic text-sm text-stone-600 dark:text-stone-400 pt-1 border-t border-stone-100 dark:border-stone-800">
                {formatArabicDisplay(p.exampleAr, showHarakat)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface VocabDictionaryViewProps {
  progress: UserProgress;
  onToggleBookmarkVocab: (entry: VocabEntry) => void;
}

const VOCAB_CATS: { id: 'all' | VocabCategory; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'noun', label: 'Nouns (أسماء)' },
  { id: 'verb', label: 'Verbs (أفعال)' },
  { id: 'adjective', label: 'Adjectives (صفات)' },
  { id: 'particle', label: 'Particles (حروف)' },
  { id: 'preposition', label: 'Prepositions (حروف جر)' },
  { id: 'adverb', label: 'Adverbs (ظروف)' },
  { id: 'pronoun', label: 'Pronouns (ضمائر)' },
  { id: 'demonstrative', label: 'Demonstratives (إشارة)' },
  { id: 'relative', label: 'Relative (موصول)' },
  { id: 'expression', label: 'Expressions (تعبيرات)' },
];

export function VocabDictionaryView({
  progress,
  onToggleBookmarkVocab,
}: VocabDictionaryViewProps) {
  const lang = progress.settings.language;
  const showHarakat = progress.settings.showHarakat;
  const [query, setQuery] = useState('');
  const [catFilter, setCatFilter] = useState<'all' | VocabCategory>('all');
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VOCAB_DICTIONARY.filter((w) => {
      if (catFilter !== 'all' && w.category !== catFilter) return false;
      if (!q) return true;
      return (
        w.arabic.includes(query.trim()) ||
        w.meaningEn.toLowerCase().includes(q) ||
        w.meaningTl.toLowerCase().includes(q)
      );
    });
  }, [query, catFilter]);

  const speakArabic = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeechNotice('Speech synthesis is unavailable in this browser.');
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ar-SA';
      utter.rate = 0.85;
      window.speechSynthesis.speak(utter);
      setSpeechNotice(null);
    } catch {
      setSpeechNotice('Unable to start audio playback.');
    }
  };

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            {t('vocab_dict', lang)} ({filtered.length})
          </h2>
          {speechNotice && <span className="text-xs text-amber-700 dark:text-amber-400">{speechNotice}</span>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder', lang)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
            />
          </div>
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value as 'all' | VocabCategory)}
            className="px-3 py-2 text-xs rounded-lg border border-stone-300 bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          >
            {VOCAB_CATS.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((w) => {
          const saved = progress.bookmarks.some((b) => b.id === `bm-voc-${w.id}`);
          return (
            <div
              key={w.id}
              className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900/90 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500">
                    {w.category} {w.root ? `· ${w.root}` : ''}
                  </div>
                  <h3 className="font-arabic text-2xl font-bold text-stone-900 dark:text-stone-50">
                    {formatArabicDisplay(w.arabic, showHarakat)}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => speakArabic(w.arabic)}
                    className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Pronounce Arabic"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleBookmarkVocab(w)}
                    className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Bookmark word"
                  >
                    {saved ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4 text-stone-400" />}
                  </button>
                </div>
              </div>
              <div className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">
                {lang === 'tl' ? w.meaningTl : w.meaningEn}
              </div>
              {w.pluralOrForm && (
                <div className="font-arabic text-xs text-stone-500 dark:text-stone-400">
                  {formatArabicDisplay(w.pluralOrForm, showHarakat)}
                </div>
              )}
              <p className="text-xs text-stone-600 dark:text-stone-400">
                {pickText(w.definition, lang)}
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="font-arabic text-sm text-stone-900 dark:text-stone-100">
                  {formatArabicDisplay(w.example.ar, showHarakat)}
                </div>
                {lang !== 'ar' && (
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    {pickText(w.example, lang)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
