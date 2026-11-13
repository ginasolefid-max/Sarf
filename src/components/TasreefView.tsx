import React, { useEffect, useMemo, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  ArrowLeft,
  Download,
  Eye,
  FileText,
  Layers,
  Save,
  Star,
  Volume2,
} from 'lucide-react';
import { db } from '../db/database';
import { conjugateVerb, PRONOUNS, AMR_PRONOUN_KEYS } from '../lib/sarfEngine';
import { exportTasreefToPDF } from '../lib/pdfExport';
import { speakArabic } from '../lib/tts';
import type { AppSettings, VerbEntry } from '../types/sarf';
import { ArabicWord } from './ArabicWord';

interface TasreefViewProps {
  verb: VerbEntry | null;
  settings: AppSettings;
  onBackToDictionary: () => void;
  onSelectVerb: (verb: VerbEntry) => void;
  onSpeakError: (msg: string) => void;
}

export const TasreefView: React.FC<TasreefViewProps> = ({
  verb,
  settings,
  onBackToDictionary,
  onSelectVerb,
  onSpeakError,
}) => {
  const [highlightRoot, setHighlightRoot] = useState(true);
  const [activeMoodTab, setActiveMoodTab] = useState<'all' | 'madhi' | 'mudhari' | 'mansub' | 'majzum'>('all');
  const [noteText, setNoteText] = useState('');
  const [noteSavedMsg, setNoteSavedMsg] = useState('');
  const [exportingPdf, setExportingPdf] = useState(false);

  const allVerbs = useLiveQuery(() => db.verbs.toArray(), []) || [];
  const activeVerb = verb || allVerbs[0] || null;

  const isFav = useLiveQuery(
    () => (activeVerb ? db.favorites.get(activeVerb.id) : undefined),
    [activeVerb?.id]
  );

  const existingNote = useLiveQuery(
    () => (activeVerb ? db.notes.get(activeVerb.id) : undefined),
    [activeVerb?.id]
  );

  useEffect(() => {
    setNoteText(existingNote?.note || '');
    setNoteSavedMsg('');
  }, [existingNote?.note, activeVerb?.id]);

  const table = useMemo(() => {
    if (!activeVerb) return null;
    return conjugateVerb(activeVerb);
  }, [activeVerb]);

  const siblingVerbs = useMemo(() => {
    if (!activeVerb) return [];
    return allVerbs.filter((v) => v.root === activeVerb.root && v.id !== activeVerb.id);
  }, [allVerbs, activeVerb]);

  if (!activeVerb || !table) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-300">Loading conjugation engine...</p>
      </div>
    );
  }

  const handleToggleFav = async () => {
    if (isFav) {
      await db.favorites.delete(activeVerb.id);
    } else {
      await db.favorites.put({ verbId: activeVerb.id, addedAt: Date.now() });
    }
  };

  const handleSaveNote = async () => {
    await db.notes.put({
      verbId: activeVerb.id,
      note: noteText,
      updatedAt: Date.now(),
    });
    setNoteSavedMsg('Saved offline');
    setTimeout(() => setNoteSavedMsg(''), 2000);
  };

  const handleExportPdf = async () => {
    setExportingPdf(true);
    try {
      await exportTasreefToPDF(activeVerb, table, settings.arabicFont);
    } finally {
      setExportingPdf(false);
    }
  };

  const renderCell = (arabicWord: string, label?: string) => (
    <div className="flex items-center justify-between gap-2">
      {label && <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>}
      <div className="flex items-center gap-1.5 ml-auto">
        <ArabicWord
          text={arabicWord}
          root={activeVerb.root}
          form={activeVerb.form}
          highlight={highlightRoot}
          scalable
          showSpeaker
          ttsRate={settings.ttsRate}
          ttsRepeat={settings.ttsRepeat}
          onSpeakError={onSpeakError}
          className="font-semibold text-slate-900 dark:text-slate-100"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Action Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToDictionary}
          className="min-h-[44px] px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 inline-flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dictionary</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setHighlightRoot((prev) => !prev)}
            className={`min-h-[44px] px-3.5 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${
              highlightRoot
                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Highlight Root &amp; Affixes</span>
          </button>

          <button
            type="button"
            onClick={handleToggleFav}
            className="min-h-[44px] px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium inline-flex items-center gap-1.5"
          >
            <Star className={`w-4 h-4 ${isFav ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>{isFav ? 'Saved' : 'Favorite'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportPdf}
            disabled={exportingPdf}
            className="min-h-[44px] px-3.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium inline-flex items-center gap-1.5 hover:opacity-90 disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            <span>{exportingPdf ? 'Exporting...' : 'PDF'}</span>
          </button>
        </div>
      </div>

      {/* Verb Header Summary Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                Form {activeVerb.form}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activeVerb.letters}-letter root</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{activeVerb.verbType}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{activeVerb.transitivity}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-slate-100">
              {activeVerb.meanings.join(', ')}
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Root: <span className="arabic-text text-base font-bold text-emerald-700 dark:text-emerald-400">{activeVerb.root}</span>
              <span className="mx-2">·</span>
              Bab / Pattern: <span className="arabic-text text-base text-slate-700 dark:text-slate-200">{activeVerb.bab}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-start">
            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <ArabicWord
                  text={activeVerb.madhi}
                  root={activeVerb.root}
                  form={activeVerb.form}
                  highlight={highlightRoot}
                  showSpeaker
                  ttsRate={settings.ttsRate}
                  ttsRepeat={settings.ttsRepeat}
                  onSpeakError={onSpeakError}
                  className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="mt-1">
                <ArabicWord
                  text={activeVerb.mudhari}
                  root={activeVerb.root}
                  form={activeVerb.form}
                  highlight={highlightRoot}
                  showSpeaker
                  ttsRate={settings.ttsRate}
                  ttsRepeat={settings.ttsRepeat}
                  onSpeakError={onSpeakError}
                  className="text-2xl text-slate-600 dark:text-slate-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Color legend when highlight is active */}
        {highlightRoot && (
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">Green letters</span>
              <span>= Root radicals ({activeVerb.root})</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="font-semibold text-amber-700 dark:text-amber-400">Amber letters</span>
              <span>= Added prefixes, infixes &amp; suffixes</span>
            </span>
          </div>
        )}

        {/* Example sentences */}
        {activeVerb.examples && activeVerb.examples.length > 0 && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            {activeVerb.examples.map((ex, i) => (
              <div key={i} className="flex items-start justify-between gap-3">
                <div>
                  <p lang="ar" dir="rtl" className="arabic-scalable text-slate-900 dark:text-slate-100">
                    {ex.ar}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{ex.en}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    speakArabic(ex.ar, {
                      rate: settings.ttsRate,
                      repeat: settings.ttsRepeat,
                      onError: onSpeakError,
                    })
                  }
                  aria-label="Speak example sentence"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Sibling verbs sharing same root */}
        {siblingVerbs.length > 0 && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 font-medium text-slate-500 dark:text-slate-400">
              <Layers className="w-3.5 h-3.5" />
              Same root:
            </span>
            {siblingVerbs.map((sv) => (
              <button
                key={sv.id}
                type="button"
                onClick={() => onSelectVerb(sv)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-600 text-slate-700 dark:text-slate-200"
              >
                <span className="arabic-text text-sm font-semibold">{sv.madhi}</span>
                <span className="mx-1 text-slate-400">·</span>
                <span>Form {sv.form}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Derived Nouns Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Derived Forms &amp; Participles (المشتقات)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { title: 'Masdar', arTitle: 'المصدر', val: table.derived.masdar },
            { title: "Ism Fa'il", arTitle: 'اسم الفاعل', val: table.derived.ismFail },
            { title: "Ism Maf'ul", arTitle: 'اسم المفعول', val: table.derived.ismMaful || '—' },
            { title: 'Zaman / Makan', arTitle: 'اسم الزمان والمكان', val: table.derived.ismZamanMakan || '—' },
            { title: 'Ism Alah', arTitle: 'اسم الآلة', val: table.derived.ismAlah || '—' },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{item.title}</span>
                <span className="arabic-text text-xs">{item.arTitle}</span>
              </div>
              {item.val !== '—' ? (
                <ArabicWord
                  text={item.val}
                  root={activeVerb.root}
                  form={activeVerb.form}
                  highlight={highlightRoot}
                  scalable
                  showSpeaker
                  ttsRate={settings.ttsRate}
                  ttsRepeat={settings.ttsRepeat}
                  onSpeakError={onSpeakError}
                  className="font-bold text-slate-900 dark:text-slate-100"
                />
              ) : (
                <span className="text-sm text-slate-400">—</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 14-Pronoun Conjugation Table */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            14-Pronoun Conjugation Table (التصريف الكامل)
          </h2>

          {/* Mobile tense selector */}
          <div className="flex lg:hidden items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-x-auto">
            {(
              [
                ['all', 'Madhi + Mudhari'],
                ['madhi', 'Madhi'],
                ['mudhari', 'Mudhari'],
                ['mansub', 'Mansub'],
                ['majzum', 'Majzum'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveMoodTab(id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  activeMoodTab === id
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop full 4-column table */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <th className="py-3 px-4">Pronoun (الضمير)</th>
                <th className="py-3 px-4 text-right">Past · الماضي</th>
                <th className="py-3 px-4 text-right">Present · المضارع</th>
                <th className="py-3 px-4 text-right">Subjunctive · المنصوب</th>
                <th className="py-3 px-4 text-right">Jussive · المجزوم</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {PRONOUNS.map((p) => (
                <tr key={p.key} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <span className="arabic-text text-lg font-bold text-slate-900 dark:text-slate-100 w-12">
                        {p.ar}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {p.label}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4">{renderCell(table.madhi[p.key])}</td>
                  <td className="py-2.5 px-4">{renderCell(table.mudhari[p.key])}</td>
                  <td className="py-2.5 px-4">{renderCell(table.mansub[p.key])}</td>
                  <td className="py-2.5 px-4">{renderCell(table.majzum[p.key])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="lg:hidden space-y-2.5">
          {PRONOUNS.map((p) => (
            <div
              key={p.key}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 space-y-2"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {p.label} ({p.translit})
                </span>
                <span className="arabic-text text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  {p.ar}
                </span>
              </div>
              {(activeMoodTab === 'all' || activeMoodTab === 'madhi') &&
                renderCell(table.madhi[p.key], 'Past (الماضي)')}
              {(activeMoodTab === 'all' || activeMoodTab === 'mudhari') &&
                renderCell(table.mudhari[p.key], 'Present (المضارع)')}
              {activeMoodTab === 'mansub' &&
                renderCell(table.mansub[p.key], 'Subjunctive (المنصوب)')}
              {activeMoodTab === 'majzum' &&
                renderCell(table.majzum[p.key], 'Jussive (المجزوم)')}
            </div>
          ))}
        </div>
      </div>

      {/* Imperative & Prohibitive (Amr & Nahy) */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Imperative &amp; Prohibitive (الأمر والنهي)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {AMR_PRONOUN_KEYS.map((pk) => {
            const meta = PRONOUNS.find((p) => p.key === pk)!;
            return (
              <div
                key={pk}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                  <span>{meta.label}</span>
                  <span className="arabic-text text-base font-bold text-slate-800 dark:text-slate-200">
                    {meta.ar}
                  </span>
                </div>
                {renderCell(table.amr[pk], 'Command (الأمر)')}
                {renderCell(table.nahy[pk], 'Prohibition (النهي)')}
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Notes */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 inline-flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Personal Study Notes</span>
          </h2>
          {noteSavedMsg && (
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              {noteSavedMsg}
            </span>
          )}
        </div>
        <textarea
          rows={3}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write personal reminders, Quranic occurrences, or irregular stem notes here (saved offline)..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSaveNote}
            className="min-h-[40px] px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium inline-flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};
