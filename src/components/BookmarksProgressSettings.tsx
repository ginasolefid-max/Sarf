import { useState } from 'react';
import {
  Download,
  Moon,
  Star,
  Sun,
  Trash2,
  Upload,
} from 'lucide-react';
import { AppSettings, Language, UserProgress } from '../types/arabic';
import { SARF_CHAPTERS } from '../data/sarfChapters';
import { NAHU_CHAPTERS } from '../data/nahuChapters';
import { VERBS_DATABASE } from '../data/verbsDatabase';
import { NavSection, t } from '../i18n/translations';
import { exportProgressJSON } from '../db/storage';
import { formatArabicDisplay } from './ArabicKeyboardHelper';

interface BookmarksViewProps {
  progress: UserProgress;
  onRemoveBookmark: (id: string) => void;
  onNavigate: (section: NavSection, refId?: string) => void;
}

export function BookmarksView({
  progress,
  onRemoveBookmark,
  onNavigate,
}: BookmarksViewProps) {
  const lang = progress.settings.language;
  const showHarakat = progress.settings.showHarakat;
  const favVerbs = VERBS_DATABASE.filter((v) =>
    progress.favoriteVerbIds.includes(v.id)
  );

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-3">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
          {t('bookmarks', lang)} ({progress.bookmarks.length})
        </h2>
        {progress.bookmarks.length === 0 ? (
          <p className="text-sm text-stone-500 dark:text-stone-400">
            No saved bookmarks yet. Save any textbook chapter, Nahu term, vocabulary card, or parsed sentence.
          </p>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {progress.bookmarks.map((bm) => (
              <div key={bm.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {bm.type.replace(/_/g, ' ')}
                  </span>
                  <div className="font-arabic text-lg font-bold text-stone-900 dark:text-stone-100">
                    {formatArabicDisplay(bm.titleAr, showHarakat)}
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    {bm.subtitle}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {bm.type === 'chapter' && (
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate(
                          bm.refId.startsWith('sarf') ? 'sarf_textbook' : 'nahu_textbook',
                          bm.refId
                        )
                      }
                      className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                    >
                      Open
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onRemoveBookmark(bm.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600"
                    aria-label="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-3">
        <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Favorite Verbs ({favVerbs.length})</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {favVerbs.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => onNavigate('tasreef', v.id)}
              className="text-left rounded-lg border border-stone-200 p-3 hover:border-emerald-700 dark:border-stone-800"
            >
              <div className="font-arabic text-xl font-bold text-stone-900 dark:text-stone-100">
                {formatArabicDisplay(v.past, showHarakat)} / {formatArabicDisplay(v.present, showHarakat)}
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400">
                {v.root} · {v.meaning.en}
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ProgressView({ progress }: { progress: UserProgress }) {
  const lang = progress.settings.language;
  const doneSet = new Set(progress.completedChapters);
  const sarfDone = SARF_CHAPTERS.filter((c) => doneSet.has(c.id)).length;
  const nahuDone = NAHU_CHAPTERS.filter((c) => doneSet.has(c.id)).length;

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-4">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
          {t('progress', lang)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-stone-200 p-4 dark:border-stone-800">
            <div className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
              {t('sarfProgress', lang)}
            </div>
            <div className="mt-1 text-2xl font-bold tabular-nums text-stone-900 dark:text-stone-100">
              {sarfDone} / {SARF_CHAPTERS.length} Chapters
            </div>
          </div>
          <div className="rounded-lg border border-stone-200 p-4 dark:border-stone-800">
            <div className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
              {t('nahuProgress', lang)}
            </div>
            <div className="mt-1 text-2xl font-bold tabular-nums text-stone-900 dark:text-stone-100">
              {nahuDone} / {NAHU_CHAPTERS.length} Chapters
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90">
          <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-2">
            Strong Topics
          </h3>
          {Object.keys(progress.strongTopics).length === 0 ? (
            <p className="text-xs text-stone-500">Complete quizzes to build your strength profile.</p>
          ) : (
            <ul className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              {Object.entries(progress.strongTopics)
                .sort((a, b) => b[1] - a[1])
                .map(([k, v]) => (
                  <li key={k} className="py-2 flex justify-between">
                    <span className="capitalize">{k.replace(/_/g, ' ')}</span>
                    <span className="tabular-nums text-emerald-700 dark:text-emerald-400 font-semibold">{v} correct</span>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90">
          <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 mb-2">
            Chapter Quiz Best Scores
          </h3>
          {Object.keys(progress.quizScores).length === 0 ? (
            <p className="text-xs text-stone-500">No chapter quizzes scored yet.</p>
          ) : (
            <ul className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              {Object.entries(progress.quizScores).map(([cid, sc]) => (
                <li key={cid} className="py-2 flex justify-between">
                  <span className="font-mono text-xs">{cid}</span>
                  <span className="tabular-nums font-semibold">
                    {sc.best}/{sc.total} ({sc.attempts} tries)
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

interface SettingsViewProps {
  progress: UserProgress;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  onImportProgress: (jsonText: string) => boolean;
  onResetProgress: () => void;
}

export function SettingsView({
  progress,
  onUpdateSettings,
  onImportProgress,
  onResetProgress,
}: SettingsViewProps) {
  const s = progress.settings;
  const [confirmReset, setConfirmReset] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleDownloadBackup = () => {
    const data = exportProgressJSON(progress);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sarf-companion-v6-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg('Backup JSON downloaded.');
  };

  const handleUploadBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? '');
      const ok = onImportProgress(text);
      setStatusMsg(ok ? 'Backup imported and migrated successfully.' : 'Invalid backup JSON file.');
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <section className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/90 space-y-5">
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
          {t('settings', s.language)}
        </h2>

        {/* Language */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Explanation & UI Language
            </div>
            <div className="text-xs text-stone-500">Arabic · English · Filipino (Tagalog)</div>
          </div>
          <div className="flex gap-1.5">
            {(
              [
                { id: 'ar', label: 'العربية' },
                { id: 'en', label: 'English' },
                { id: 'tl', label: 'Filipino' },
              ] as { id: Language; label: string }[]
            ).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => onUpdateSettings({ language: l.id })}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
                  s.language === l.id
                    ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">Theme</div>
            <div className="text-xs text-stone-500">Warm Manuscript Light or Deep Slate Dark</div>
          </div>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => onUpdateSettings({ theme: 'light' })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                s.theme === 'light'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              Light
            </button>
            <button
              type="button"
              onClick={() => onUpdateSettings({ theme: 'dark' })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                s.theme === 'dark'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              Dark
            </button>
          </div>
        </div>

        {/* Harakat & Transliteration */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Show Harakat (التشكيل)
            </div>
            <div className="text-xs text-stone-500">Display full Arabic short vowels across textbooks and tables</div>
          </div>
          <input
            type="checkbox"
            checked={s.showHarakat}
            onChange={(e) => onUpdateSettings({ showHarakat: e.target.checked })}
            className="w-4 h-4 accent-emerald-700"
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Show Transliteration
            </div>
            <div className="text-xs text-stone-500">Latin phonetic reading alongside Arabic forms</div>
          </div>
          <input
            type="checkbox"
            checked={s.showTransliteration}
            onChange={(e) => onUpdateSettings({ showTransliteration: e.target.checked })}
            className="w-4 h-4 accent-emerald-700"
          />
        </div>

        {/* Arabic Font Size */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Arabic Script Scale
            </div>
            <div className="text-xs text-stone-500">Adjust Amiri Naskh script readability</div>
          </div>
          <div className="flex gap-1.5">
            {(['normal', 'large', 'xlarge'] as const).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => onUpdateSettings({ arabicFontSize: sz })}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${
                  s.arabicFontSize === sz
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Data Backup & Reset */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/90 space-y-4">
        <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
          Offline Data & Schema Migration (v{progress.schemaVersion})
        </h3>
        {statusMsg && (
          <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            {statusMsg}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleDownloadBackup}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-800 text-white hover:bg-emerald-700 dark:bg-emerald-600"
          >
            <Download className="w-3.5 h-3.5" />
            Export Progress JSON
          </button>
          <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-stone-300 text-stone-800 hover:bg-stone-50 cursor-pointer dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800">
            <Upload className="w-3.5 h-3.5" />
            Import Backup JSON
            <input type="file" accept="application/json" onChange={handleUploadBackup} className="hidden" />
          </label>
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-rose-300 text-rose-700 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300"
            >
              Reset Progress
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                  setStatusMsg('Local progress reset to defaults.');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white"
              >
                Confirm Reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-3 py-1.5 rounded-lg text-xs border border-stone-300 dark:border-stone-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
