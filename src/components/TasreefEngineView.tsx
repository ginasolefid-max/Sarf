import { useMemo, useState } from 'react';
import {
  ArrowLeftRight,
  Printer,
  ShieldAlert,
  ShieldCheck,
  Star,
} from 'lucide-react';
import {
  ConjugationCategory,
  FormIBab,
  UserProgress,
  VerbClassification,
  VerbEntry,
  VerbForm,
  VerbTransitivity,
} from '../types/arabic';
import { VERBS_DATABASE } from '../data/verbsDatabase';
import { conjugateVerb } from '../engine/tasreefEngine';
import { pickText, t } from '../i18n/translations';
import {
  ArabicKeyboardHelper,
  arabicSizeClass,
  formatArabicDisplay,
} from './ArabicKeyboardHelper';

interface TasreefEngineViewProps {
  initialVerbId?: string;
  progress: UserProgress;
  onToggleFavoriteVerb: (verbId: string) => void;
  onRecordActivity: (title: string, type: string) => void;
}

const FORMS: VerbForm[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'QI', 'QII'];
const BABS: FormIBab[] = [
  'فَعَلَ يَفْعُلُ',
  'فَعَلَ يَفْعِلُ',
  'فَعَلَ يَفْعَلُ',
  'فَعِلَ يَفْعَلُ',
  'فَعِلَ يَفْعِلُ',
  'فَعُلَ يَفْعُلُ',
];

const CATEGORIES: { id: ConjugationCategory; ar: string; en: string; tl: string }[] = [
  { id: 'madhi', ar: 'الماضي المعلوم', en: 'Madhi (Active Past)', tl: 'Madhi (Nakaraan)' },
  { id: 'mudhari', ar: 'المضارع المعلوم', en: 'Mudhari (Active Present)', tl: 'Mudhari (Kasalukuyan)' },
  { id: 'amr', ar: 'فعل الأمر', en: 'Amr (Imperative)', tl: 'Amr (Pautos)' },
  { id: 'nahy', ar: 'النهي (لا الناهية)', en: 'Nahy (Prohibition)', tl: 'Nahy (Pagbabawal)' },
  { id: 'mansub', ar: 'المضارع المنصوب', en: 'Mansub (Subjunctive)', tl: 'Mansub' },
  { id: 'majzum', ar: 'المضارع المجزوم', en: 'Majzum (Jussive)', tl: 'Majzum' },
  { id: 'passive_madhi', ar: 'الماضي المجهول', en: 'Passive Past', tl: 'Pasibong Nakaraan' },
  { id: 'passive_mudhari', ar: 'المضارع المجهول', en: 'Passive Present', tl: 'Pasibong Kasalukuyan' },
];

export function TasreefEngineView({
  initialVerbId,
  progress,
  onToggleFavoriteVerb,
  onRecordActivity,
}: TasreefEngineViewProps) {
  const lang = progress.settings.language;
  const showHarakat = progress.settings.showHarakat;
  const showTranslit = progress.settings.showTransliteration;
  const fontSize = progress.settings.arabicFontSize;

  const [mode, setMode] = useState<'preset' | 'custom'>('preset');
  const [selectedVerbId, setSelectedVerbId] = useState<string>(
    initialVerbId && VERBS_DATABASE.some((v) => v.id === initialVerbId)
      ? initialVerbId
      : VERBS_DATABASE[0].id
  );
  const [customRoot, setCustomRoot] = useState('ك-ت-ب');
  const [customForm, setCustomForm] = useState<VerbForm>('I');
  const [customBab, setCustomBab] = useState<FormIBab>('فَعَلَ يَفْعُلُ');
  const [customCls, setCustomCls] = useState<VerbClassification | 'auto'>('auto');
  const [customTrans, setCustomTrans] = useState<VerbTransitivity>('mutaaddi');

  const [activeCat, setActiveCat] = useState<ConjugationCategory>('madhi');
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [compareVerbId, setCompareVerbId] = useState<string>(VERBS_DATABASE[6]?.id ?? VERBS_DATABASE[1].id);

  const selectedVerb: VerbEntry =
    VERBS_DATABASE.find((v) => v.id === selectedVerbId) ?? VERBS_DATABASE[0];

  const output = useMemo(() => {
    if (mode === 'preset') {
      return conjugateVerb(selectedVerb);
    }
    return conjugateVerb({
      root: customRoot,
      form: customForm,
      bab: customBab,
      classification: customCls === 'auto' ? undefined : customCls,
      transitivity: customTrans,
    });
  }, [mode, selectedVerb, customRoot, customForm, customBab, customCls, customTrans]);

  const compareVerb =
    VERBS_DATABASE.find((v) => v.id === compareVerbId) ?? VERBS_DATABASE[1];
  const compareOutput = useMemo(
    () => (compareEnabled ? conjugateVerb(compareVerb) : null),
    [compareEnabled, compareVerb]
  );

  const isFav = progress.favoriteVerbIds.includes(output.verb.id);
  const activeRows = output.tables[activeCat];
  const compareRows = compareOutput?.tables[activeCat];

  const handlePrint = () => {
    onRecordActivity(`Printed Tasreef: ${output.verb.past}`, 'tasreef');
    window.print();
  };

  return (
    <div className="space-y-5">
      {/* Control Panel */}
      <section className="no-print rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {t('tasreef', lang)}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {lang === 'ar'
                ? 'تصريف الأفعال الثلاثية والرباعية والمزيدة (I–X, QI–QII) للضمائر الأربعة عشر مع الإعلال والمشتقات.'
                : '14-pronoun Arabic conjugation across Forms I–X & Quadriliterals with I\'lal rules and derived nouns.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setCompareEnabled((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                compareEnabled
                  ? 'bg-amber-700 text-white border-amber-700'
                  : 'border-stone-300 text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'مقارنة فعلين' : 'Compare Side-by-Side'}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleFavoriteVerb(output.verb.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-stone-300 text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
            >
              <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isFav ? t('saved', lang) : t('saveFavorite', lang)}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('exportPdf', lang)}</span>
            </button>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex flex-wrap gap-2 border-t border-stone-100 dark:border-stone-800 pt-3">
          <button
            type="button"
            onClick={() => setMode('preset')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              mode === 'preset'
                ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
            }`}
          >
            {lang === 'ar' ? `أفعال المعجم الموثقة (${VERBS_DATABASE.length})` : `Verified Lexicon (${VERBS_DATABASE.length})`}
          </button>
          <button
            type="button"
            onClick={() => setMode('custom')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              mode === 'custom'
                ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
            }`}
          >
            {lang === 'ar' ? 'إدخال جذر ووزن مخصص' : 'Custom Root & Form'}
          </button>
        </div>

        {mode === 'preset' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                {lang === 'ar' ? 'اختر الفعل الموثق:' : 'Select Verified Verb:'}
              </label>
              <select
                value={selectedVerbId}
                onChange={(e) => setSelectedVerbId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
              >
                {VERBS_DATABASE.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.past} / {v.present} ({v.root}) — Form {v.form} · {v.meaning.en}
                  </option>
                ))}
              </select>
            </div>

            {compareEnabled && (
              <div>
                <label className="block text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">
                  {lang === 'ar' ? 'الفعل الثاني للمقارنة:' : 'Compare With Second Verb:'}
                </label>
                <select
                  value={compareVerbId}
                  onChange={(e) => setCompareVerbId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-amber-50/40 text-sm text-stone-900 dark:border-amber-700 dark:bg-stone-950 dark:text-stone-100"
                >
                  {VERBS_DATABASE.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.past} / {v.present} ({v.root}) — Form {v.form} · {v.meaning.en}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  {lang === 'ar' ? 'الجذر (3 أو 4 أحرف):' : 'Root (e.g. ك-ت-ب):'}
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={customRoot}
                  onChange={(e) => setCustomRoot(e.target.value)}
                  className="font-arabic w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 text-lg text-stone-900 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  {lang === 'ar' ? 'الباب / الوزن:' : 'Form:'}
                </label>
                <select
                  value={customForm}
                  onChange={(e) => setCustomForm(e.target.value as VerbForm)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 text-sm dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                >
                  {FORMS.map((f) => (
                    <option key={f} value={f}>
                      Form {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  {lang === 'ar' ? 'باب الثلاثي:' : 'Form I Bab:'}
                </label>
                <select
                  value={customBab}
                  disabled={customForm !== 'I'}
                  onChange={(e) => setCustomBab(e.target.value as FormIBab)}
                  className="font-arabic w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 text-base disabled:opacity-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                >
                  {BABS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  {lang === 'ar' ? 'التصنيف:' : 'Classification:'}
                </label>
                <select
                  value={customCls}
                  onChange={(e) => setCustomCls(e.target.value as VerbClassification | 'auto')}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 text-sm dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                >
                  <option value="auto">Auto-detect</option>
                  <option value="sound">Sound (صحيح سالم)</option>
                  <option value="mudaaf">Muda'af (مضعف)</option>
                  <option value="mahmuz_fa">Mahmuz Fa</option>
                  <option value="mithal_wawi">Mithal Wawi</option>
                  <option value="ajwaf_wawi">Ajwaf Wawi</option>
                  <option value="ajwaf_yayi">Ajwaf Yayi</option>
                  <option value="naqis_wawi">Naqis Wawi</option>
                  <option value="naqis_yayi">Naqis Yayi</option>
                  <option value="lafif_mafruq">Lafif Mafruq</option>
                  <option value="lafif_maqrun">Lafif Maqrun</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  {lang === 'ar' ? 'التعدي واللزوم:' : 'Transitivity:'}
                </label>
                <select
                  value={customTrans}
                  onChange={(e) => setCustomTrans(e.target.value as VerbTransitivity)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 text-sm dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                >
                  <option value="mutaaddi">Transitive (متعدٍّ)</option>
                  <option value="lazim">Intransitive (لازم)</option>
                  <option value="both">Both (متعدٍّ ولازم)</option>
                </select>
              </div>
            </div>
            <ArabicKeyboardHelper
              lang={lang}
              compact
              onInsert={(ch) => setCustomRoot((r) => r + ch)}
            />
          </div>
        )}
      </section>

      {/* Verb Summary Masthead */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                Form {output.verb.form}
              </span>
              {output.verb.bab && (
                <>
                  <span>·</span>
                  <span className="font-arabic text-sm text-stone-700 dark:text-stone-300">
                    {formatArabicDisplay(output.verb.bab, showHarakat)}
                  </span>
                </>
              )}
              <span>·</span>
              <span>{output.verb.classification.replace(/_/g, ' ')}</span>
              <span>·</span>
              <span>{output.verb.transitivity}</span>
              <span>·</span>
              {output.isConfidenceVerified ? (
                <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t('verified', lang)}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {t('unverified', lang)}
                </span>
              )}
            </div>

            <div className={`font-arabic mt-2 font-bold text-stone-900 dark:text-stone-50 ${arabicSizeClass(fontSize, 'lg')}`}>
              {formatArabicDisplay(output.verb.past, showHarakat)} —{' '}
              {formatArabicDisplay(output.verb.present, showHarakat)} —{' '}
              {formatArabicDisplay(output.verb.imperative, showHarakat)}
            </div>
            <p className="mt-1 text-sm text-stone-700 dark:text-stone-300">
              Root <span className="font-arabic font-semibold">{output.verb.root}</span> ·{' '}
              {pickText(output.verb.meaning, lang)}
            </p>
          </div>
        </div>

        {output.verificationNotice && (
          <div className="mt-3 rounded-lg border border-amber-300/70 bg-amber-50/80 px-3.5 py-2.5 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-200">
            {pickText(output.verificationNotice, lang)}
          </div>
        )}
      </section>

      {/* Conjugation Category Tabs */}
      <div className="no-print flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCat(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeCat === cat.id
                ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300'
            }`}
          >
            {lang === 'ar' ? cat.ar : lang === 'tl' ? `${cat.tl} (${cat.ar})` : `${cat.en}`}
          </button>
        ))}
      </div>

      {/* 14-Pronoun Conjugation Table */}
      <section className="rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/90 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 text-xs uppercase text-stone-500">
                <th className="py-3 px-4">Pronoun</th>
                <th className="py-3 px-4 text-right font-arabic text-sm">
                  {formatArabicDisplay(output.verb.past, showHarakat)}
                </th>
                {compareEnabled && compareOutput && (
                  <th className="py-3 px-4 text-right font-arabic text-sm text-amber-700 dark:text-amber-400">
                    {formatArabicDisplay(compareOutput.verb.past, showHarakat)}
                  </th>
                )}
                {showTranslit && <th className="py-3 px-4">Transliteration</th>}
                <th className="py-3 px-4">Meaning</th>
                <th className="py-3 px-4">Morphological Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              {activeRows.map((cell, idx) => {
                const cmp = compareRows?.[idx];
                return (
                  <tr
                    key={cell.pronounKey}
                    className={
                      cell.applicable
                        ? 'hover:bg-stone-50/70 dark:hover:bg-stone-800/40'
                        : 'opacity-45 bg-stone-50/40 dark:bg-stone-950/30'
                    }
                  >
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-arabic text-base font-bold text-stone-900 dark:text-stone-100">
                        {formatArabicDisplay(cell.pronounAr, showHarakat)}
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">
                        {lang === 'tl' ? cell.pronounLabelTl : cell.pronounLabelEn}
                      </div>
                    </td>
                    <td className={`py-3 px-4 text-right font-arabic font-bold text-emerald-900 dark:text-emerald-300 ${arabicSizeClass(fontSize, 'md')}`}>
                      {formatArabicDisplay(cell.arabic, showHarakat)}
                    </td>
                    {compareEnabled && cmp && (
                      <td className={`py-3 px-4 text-right font-arabic font-bold text-amber-800 dark:text-amber-300 ${arabicSizeClass(fontSize, 'md')}`}>
                        {formatArabicDisplay(cmp.arabic, showHarakat)}
                      </td>
                    )}
                    {showTranslit && (
                      <td className="py-3 px-4 font-mono text-xs text-stone-600 dark:text-stone-400">
                        {cell.transliteration}
                      </td>
                    )}
                    <td className="py-3 px-4 text-xs text-stone-700 dark:text-stone-300">
                      {lang === 'tl' ? cell.meaningTl : cell.meaningEn}
                    </td>
                    <td className="py-3 px-4 text-xs font-arabic text-stone-600 dark:text-stone-400">
                      {cell.ruleNote}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Morphological Transformation Breakdown & Derived Nouns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-3">
          <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
            {lang === 'ar' ? 'التحولات الصرفية والإعلال' : "Morphological Transformations & I'lal"}
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-stone-700 dark:text-stone-300">
            {output.transformationSteps.map((step, i) => (
              <li key={i}>
                <p className="font-arabic text-base text-stone-900 dark:text-stone-100">
                  {formatArabicDisplay(step.ar, showHarakat)}
                </p>
                {lang !== 'ar' && (
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    {pickText(step, lang)}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-3">
          <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
            {lang === 'ar' ? 'المصادر والمشتقات' : 'Masdar & Derived Nouns'}
          </h3>
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {output.derived.map((d) => (
              <div key={d.category} className="py-2.5 flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                    {lang === 'ar'
                      ? d.arabicTitle
                      : lang === 'tl'
                        ? `${d.filipinoTitle} (${d.arabicTitle})`
                        : `${d.englishTitle} (${d.arabicTitle})`}
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {pickText(d.note, lang)}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className={`font-arabic font-bold ${d.applicable ? 'text-emerald-800 dark:text-emerald-400 text-lg' : 'text-stone-400 text-sm'}`}>
                    {formatArabicDisplay(d.form, showHarakat)}
                  </div>
                  {d.applicable && (
                    <div className="font-arabic text-xs text-stone-500 dark:text-stone-400">
                      {d.pattern}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
