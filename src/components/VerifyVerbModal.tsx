import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Check, Clock, Cloud, Loader2, Plus, RefreshCw, Trash2, WifiOff, X } from 'lucide-react';
import { db, toStoredVerb } from '../db/database';
import { verifyVerbWithGemini } from '../lib/geminiVerify';
import { normalizeRoot } from '../lib/arabicUtils';
import type { Transitivity, VerbEntry, VerbForm, VerbType } from '../types/sarf';

interface VerifyVerbModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOnline: boolean;
  apiKey: string;
  modelName: string;
  onOpenSettings: () => void;
  onVerbSaved: (verb: VerbEntry) => void;
}

const FORMS: VerbForm[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'QI', 'QII', 'QIII', 'QIV'];
const TYPES: VerbType[] = ['sound', 'hollow', 'defective', 'assimilated', 'doubled', 'hamzated'];

export const VerifyVerbModal: React.FC<VerifyVerbModalProps> = ({
  isOpen,
  onClose,
  isOnline,
  apiKey,
  modelName,
  onOpenSettings,
  onVerbSaved,
}) => {
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState<VerbEntry | null>(null);
  const [queuedNotice, setQueuedNotice] = useState('');

  // Manual form state
  const [mRoot, setMRoot] = useState('');
  const [mMadhi, setMMadhi] = useState('');
  const [mMudhari, setMMudhari] = useState('');
  const [mMasdar, setMMasdar] = useState('');
  const [mFail, setMFail] = useState('');
  const [mMaful, setMMaful] = useState('');
  const [mAmr, setMAmr] = useState('');
  const [mNahy, setMNahy] = useState('');
  const [mForm, setMForm] = useState<VerbForm>('I');
  const [mType, setMType] = useState<VerbType>('sound');
  const [mTrans, setMTrans] = useState<Transitivity>('transitive');
  const [mBab, setMBab] = useState('فَعَلَ يَفْعُلُ');
  const [mMeanings, setMMeanings] = useState('');
  const [mExAr, setMExAr] = useState('');
  const [mExEn, setMExEn] = useState('');

  const queueItems = useLiveQuery(() => db.verifyQueue.orderBy('createdAt').reverse().toArray(), []) || [];

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setError('');
    setQueuedNotice('');

    if (!isOnline) {
      await db.verifyQueue.add({
        query: trimmed,
        status: 'pending',
        createdAt: Date.now(),
      });
      setQuery('');
      setQueuedNotice(`"${trimmed}" queued. It will verify automatically when you return online.`);
      return;
    }

    if (!apiKey.trim()) {
      setError('Add your Gemini API key in Settings to verify verbs online, or use Manual Add.');
      return;
    }

    setLoading(true);
    try {
      const result = await verifyVerbWithGemini(trimmed, apiKey, modelName);
      setDraft(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!draft) return;
    await db.verbs.put(toStoredVerb(draft));
    onVerbSaved(draft);
    setDraft(null);
    setQuery('');
    onClose();
  };

  const handleSaveManual = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const norm = normalizeRoot(mRoot);
    if (!norm || !mMadhi.trim() || !mMudhari.trim() || !mMeanings.trim()) {
      setError('Please fill in Root, Madhi, Mudhari, and at least one English meaning.');
      return;
    }
    const lettersCount = norm.split('-').length === 4 ? 4 : 3;
    const entry: VerbEntry = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      root: norm,
      madhi: mMadhi.trim(),
      mudhari: mMudhari.trim(),
      masdar: mMasdar.trim() || '—',
      ismFail: mFail.trim() || '—',
      ismMaful: mMaful.trim() || '',
      amr: mAmr.trim() || '',
      nahy: mNahy.trim() || '',
      form: mForm,
      letters: lettersCount,
      bab: mBab.trim() || 'فَعَلَ يَفْعُلُ',
      verbType: mType,
      transitivity: mTrans,
      meanings: mMeanings.split(',').map((s) => s.trim()).filter(Boolean),
      examples: mExAr.trim() ? [{ ar: mExAr.trim(), en: mExEn.trim() }] : [],
      tags: ['custom'],
      source: 'user',
      createdAt: Date.now(),
    };
    await db.verbs.put(toStoredVerb(entry));
    onVerbSaved(entry);
    onClose();
  };

  const handleProcessPendingNow = async () => {
    if (!isOnline || !apiKey.trim()) return;
    const pending = queueItems.filter((item) => item.status === 'pending' || item.status === 'error');
    for (const item of pending) {
      if (!item.id) continue;
      await db.verifyQueue.update(item.id, { status: 'processing', error: undefined });
      try {
        const res = await verifyVerbWithGemini(item.query, apiKey, modelName);
        await db.verifyQueue.update(item.id, { status: 'ready', result: res });
      } catch (err) {
        await db.verifyQueue.update(item.id, {
          status: 'error',
          error: err instanceof Error ? err.message : 'Failed',
        });
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Verify or Add Verb
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isOnline ? 'Online — Gemini verification available' : 'Offline — requests queue until online'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setMode('ai')}
            className={`min-h-[40px] rounded-lg text-xs font-medium transition-colors ${
              mode === 'ai'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Verify Online (Gemini)
          </button>
          <button
            type="button"
            onClick={() => setMode('manual')}
            className={`min-h-[40px] rounded-lg text-xs font-medium transition-colors ${
              mode === 'manual'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Manual Add (Offline)
          </button>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 p-3 text-xs text-red-700 dark:text-red-300 flex items-center justify-between gap-2">
            <span>{error}</span>
            {!apiKey.trim() && mode === 'ai' && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSettings();
                }}
                className="underline font-semibold whitespace-nowrap"
              >
                Open Settings
              </button>
            )}
          </div>
        )}

        {queuedNotice && (
          <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40 p-3 text-xs text-amber-800 dark:text-amber-300">
            {queuedNotice}
          </div>
        )}

        {mode === 'ai' ? (
          <div className="space-y-5">
            {!draft ? (
              <form onSubmit={handleVerify} className="space-y-3">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Enter an Arabic verb (e.g. اِسْتَيْقَظَ) or English verb (e.g. "to translate")
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="اِسْتَفْهَمَ or to hesitate..."
                    className="flex-1 min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="min-h-[44px] px-4 rounded-xl bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 disabled:opacity-50 inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isOnline ? (
                      <Cloud className="w-4 h-4" />
                    ) : (
                      <WifiOff className="w-4 h-4" />
                    )}
                    <span>{isOnline ? 'Verify' : 'Queue'}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    Review Verified Verb
                  </span>
                  <button
                    type="button"
                    onClick={() => setDraft(null)}
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    Discard
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <label className="text-xs text-slate-500">Madhi</label>
                    <input
                      value={draft.madhi}
                      onChange={(e) => setDraft({ ...draft, madhi: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 arabic-text text-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Mudhari</label>
                    <input
                      value={draft.mudhari}
                      onChange={(e) => setDraft({ ...draft, mudhari: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 arabic-text text-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Root</label>
                    <input
                      value={draft.root}
                      onChange={(e) => setDraft({ ...draft, root: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 arabic-text text-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Masdar</label>
                    <input
                      value={draft.masdar}
                      onChange={(e) => setDraft({ ...draft, masdar: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 arabic-text text-lg"
                    />
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <p>
                    <strong>Form {draft.form}</strong> · {draft.verbType} · {draft.transitivity} · {draft.bab}
                  </p>
                  <p>
                    <strong>Meanings:</strong> {draft.meanings.join(', ')}
                  </p>
                  {draft.examples[0] && (
                    <p className="pt-1">
                      <span className="arabic-text text-base block">{draft.examples[0].ar}</span>
                      <span className="text-slate-500">{draft.examples[0].en}</span>
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="w-full min-h-[44px] rounded-xl bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 inline-flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save to Offline Dictionary
                </button>
              </div>
            )}

            {/* Offline Queue Section */}
            {queueItems.length > 0 && (
              <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Offline Verification Queue ({queueItems.length})
                  </h3>
                  {isOnline && apiKey.trim() && queueItems.some((q) => q.status === 'pending' || q.status === 'error') && (
                    <button
                      type="button"
                      onClick={handleProcessPendingNow}
                      className="text-xs font-medium text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1 hover:underline"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Process Queue
                    </button>
                  )}
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {queueItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 dark:border-slate-800 p-2.5 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 dark:text-slate-200 truncate">
                          {item.query}
                        </p>
                        <p className="text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.status}</span>
                          {item.error && <span className="text-red-500">· {item.error}</span>}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {item.status === 'ready' && item.result && (
                          <button
                            type="button"
                            onClick={async () => {
                              setDraft(item.result!);
                              if (item.id) await db.verifyQueue.delete(item.id);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-700 text-white font-medium"
                          >
                            Review
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => item.id && db.verifyQueue.delete(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600"
                          aria-label="Remove queued verb"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSaveManual} className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Root (e.g. ك-ت-ب) *</label>
                <input
                  value={mRoot}
                  onChange={(e) => setMRoot(e.target.value)}
                  placeholder="ك-ت-ب"
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 arabic-text text-lg"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Form</label>
                <select
                  value={mForm}
                  onChange={(e) => setMForm(e.target.value as VerbForm)}
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm"
                >
                  {FORMS.map((f) => (
                    <option key={f} value={f}>Form {f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Madhi (الماضي) *</label>
                <input
                  value={mMadhi}
                  onChange={(e) => setMMadhi(e.target.value)}
                  placeholder="كَتَبَ"
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 arabic-text text-lg"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Mudhari (المضارع) *</label>
                <input
                  value={mMudhari}
                  onChange={(e) => setMMudhari(e.target.value)}
                  placeholder="يَكْتُبُ"
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 arabic-text text-lg"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Masdar</label>
                <input
                  value={mMasdar}
                  onChange={(e) => setMMasdar(e.target.value)}
                  placeholder="كِتَابَةٌ"
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 arabic-text text-lg"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Verb Type</label>
                <select
                  value={mType}
                  onChange={(e) => setMType(e.target.value as VerbType)}
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm"
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Ism Fa&apos;il</label>
                <input
                  value={mFail}
                  onChange={(e) => setMFail(e.target.value)}
                  placeholder="كَاتِبٌ"
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 arabic-text text-lg"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Ism Maf&apos;ul</label>
                <input
                  value={mMaful}
                  onChange={(e) => setMMaful(e.target.value)}
                  placeholder="مَكْتُوبٌ"
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 arabic-text text-lg"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Amr</label>
                <input
                  value={mAmr}
                  onChange={(e) => setMAmr(e.target.value)}
                  placeholder="اُكْتُبْ"
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 arabic-text text-lg"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Nahy</label>
                <input
                  value={mNahy}
                  onChange={(e) => setMNahy(e.target.value)}
                  placeholder="لَا تَكْتُبْ"
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 arabic-text text-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Bab / Pattern</label>
                <input
                  value={mBab}
                  onChange={(e) => setMBab(e.target.value)}
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 arabic-text text-base"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Transitivity</label>
                <select
                  value={mTrans}
                  onChange={(e) => setMTrans(e.target.value as Transitivity)}
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm"
                >
                  <option value="transitive">Transitive</option>
                  <option value="intransitive">Intransitive</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-600 dark:text-slate-400">English meanings (comma-separated) *</label>
              <input
                value={mMeanings}
                onChange={(e) => setMMeanings(e.target.value)}
                placeholder="to write, to record"
                className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">Arabic example</label>
                <input
                  value={mExAr}
                  onChange={(e) => setMExAr(e.target.value)}
                  placeholder="كَتَبَ الطَّالِبُ الدَّرْسَ."
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 arabic-text text-base"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">English translation</label>
                <input
                  value={mExEn}
                  onChange={(e) => setMExEn(e.target.value)}
                  placeholder="The student wrote the lesson."
                  className="mt-1 w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full min-h-[44px] rounded-xl bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 inline-flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Save Custom Verb
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
