import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import {
  IrabState,
  IrabTokenAnalysis,
  UserProgress,
} from '../types/arabic';
import {
  analyzeArabicSentence,
  PRESET_IRAB_SENTENCES,
} from '../engine/irabEngine';
import { pickText, t } from '../i18n/translations';
import {
  ArabicKeyboardHelper,
  arabicSizeClass,
  formatArabicDisplay,
} from './ArabicKeyboardHelper';

interface IrabAnalyzerViewProps {
  progress: UserProgress;
  onToggleBookmarkSentence: (sentence: string, translation: string) => void;
  onRecordActivity: (title: string, type: string) => void;
}

const IRAB_STATES: IrabState[] = ['مرفوع', 'منصوب', 'مجرور', 'مجزوم', 'مبني', 'غير معرب'];
const COMMON_ROLES = [
  'فعل ماضٍ',
  'فعل مضارع',
  'فعل أمر',
  'فاعل',
  'نائب فاعل',
  'مفعول به',
  'مبتدأ',
  'خبر',
  'اسم كان',
  'خبر كان',
  'اسم إنَّ',
  'خبر إنَّ',
  'اسم مجرور',
  'مضاف إليه',
  'حرف جر',
  'حرف جزم',
  'حرف نصب',
  'حرف ناسخ',
];

export function IrabAnalyzerView({
  progress,
  onToggleBookmarkSentence,
  onRecordActivity,
}: IrabAnalyzerViewProps) {
  const lang = progress.settings.language;
  const showHarakat = progress.settings.showHarakat;
  const fontSize = progress.settings.arabicFontSize;

  const [inputSentence, setInputSentence] = useState(PRESET_IRAB_SENTENCES[0].sentence);
  const [selectedTokenIdx, setSelectedTokenIdx] = useState(0);
  const [mode, setMode] = useState<'analyze' | 'manual' | 'practice'>('analyze');

  // Manual overrides & practice answers per token index
  const [manualEdits, setManualEdits] = useState<
    Record<number, { roleAr: string; irabState: IrabState; markerAr: string }>
  >({});
  const [practiceChoices, setPracticeChoices] = useState<
    Record<number, { state?: IrabState; role?: string }>
  >({});
  const [practiceChecked, setPracticeChecked] = useState(false);

  const result = useMemo(() => analyzeArabicSentence(inputSentence), [inputSentence]);

  const activeToken: IrabTokenAnalysis | undefined =
    result.tokens[selectedTokenIdx] ?? result.tokens[0];

  const isBookmarked = progress.bookmarks.some(
    (b) => b.id === `bm-sent-${result.sentence}`
  );

  const loadSentence = (sent: string) => {
    setInputSentence(sent);
    setSelectedTokenIdx(0);
    setManualEdits({});
    setPracticeChoices({});
    setPracticeChecked(false);
  };

  const practiceScore = useMemo(() => {
    if (!practiceChecked) return null;
    let correct = 0;
    result.tokens.forEach((tok) => {
      const ch = practiceChoices[tok.index];
      if (ch?.state === tok.irabState) correct++;
    });
    return { correct, total: result.tokens.length };
  }, [practiceChecked, practiceChoices, result.tokens]);

  return (
    <div className="space-y-5">
      {/* Input & Presets */}
      <section className="no-print rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {t('irab', lang)}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {lang === 'ar'
                ? 'أدخل جملة عربية أو اختر نموذجًا موثقًا لتحليل الموقع الإعرابي والعلامة والعامل.'
                : 'Inspect word roles, case states, markers, and governors (Amil), or test yourself in Manual & Practice modes.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onToggleBookmarkSentence(result.sentence, pickText(result.translation, lang))
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-stone-300 text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
            >
              {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isBookmarked ? t('saved', lang) : t('saveFavorite', lang)}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onRecordActivity(`Exported I'rab: ${result.sentence}`, 'irab');
                window.print();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('exportPdf', lang)}</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
            {lang === 'ar' ? 'الجملة العربية:' : 'Arabic Sentence Input:'}
          </label>
          <input
            type="text"
            dir="rtl"
            value={inputSentence}
            onChange={(e) => loadSentence(e.target.value)}
            placeholder="كَتَبَ الطَّالِبُ الدَّرْسَ"
            className="font-arabic w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-stone-50 text-xl text-stone-900 focus:outline-none focus:border-emerald-700 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          />
          <ArabicKeyboardHelper
            lang={lang}
            compact
            onInsert={(ch) => setInputSentence((s) => s + ch)}
          />
        </div>

        {/* Verified Preset Sentences */}
        <div>
          <div className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
            {lang === 'ar' ? 'جمل إعرابية موثقة جاهزة:' : 'Verified Grammar Presets:'}
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_IRAB_SENTENCES.map((p) => (
              <button
                key={p.sentence}
                type="button"
                onClick={() => loadSentence(p.sentence)}
                className={`font-arabic px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                  result.sentence === p.sentence
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/70 dark:text-emerald-100'
                    : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-400 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200'
                }`}
              >
                {formatArabicDisplay(p.sentence, showHarakat)}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
          {(
            [
              { id: 'analyze', ar: 'التحليل الإعرابي التفاعلي', en: 'Interactive Parse' },
              { id: 'manual', ar: 'وضع الإعراب اليدوي', en: 'Manual Parsing Mode' },
              { id: 'practice', ar: 'تدريب واختبار الإعراب', en: "I'rab Practice / Quiz Mode" },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                mode === m.id
                  ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                  : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {lang === 'ar' ? m.ar : m.en}
            </button>
          ))}
        </div>
      </section>

      {/* Sentence Overview & Ambiguity Notice */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-arabic text-sm font-semibold text-emerald-800 dark:text-emerald-400">
              {result.sentenceTypeAr}
            </span>
            <span>·</span>
            <span>{result.sentenceTypeEn}</span>
          </div>
          {result.isVerifiedPreset ? (
            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t('verified', lang)}
            </span>
          ) : (
            <span className="text-stone-500">Offline Rule-Based Parser</span>
          )}
        </div>

        <p className="text-sm text-stone-700 dark:text-stone-300">
          {pickText(result.structuralOverview, lang)}
        </p>

        {result.limitationNote && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-300/70 bg-amber-50/70 px-3.5 py-2.5 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <span>{pickText(result.limitationNote, lang)}</span>
          </div>
        )}

        {/* Token Strip (RTL) */}
        <div dir="rtl" className="flex flex-wrap gap-2.5 pt-2">
          {result.tokens.map((tok) => {
            const active = tok.index === activeToken?.index;
            const manual = manualEdits[tok.index];
            return (
              <button
                key={tok.index}
                type="button"
                onClick={() => setSelectedTokenIdx(tok.index)}
                className={`px-4 py-2.5 rounded-xl border text-right transition-colors ${
                  active
                    ? 'border-emerald-700 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/70'
                    : 'border-stone-200 bg-stone-50/60 hover:border-stone-400 dark:border-stone-800 dark:bg-stone-950/60'
                }`}
              >
                <div className={`font-arabic font-bold text-stone-900 dark:text-stone-50 ${arabicSizeClass(fontSize, 'md')}`}>
                  {formatArabicDisplay(tok.word, showHarakat)}
                </div>
                {mode !== 'practice' && (
                  <div className="text-xs font-arabic text-emerald-800 dark:text-emerald-400">
                    {manual?.roleAr ?? tok.roleAr} · {manual?.irabState ?? tok.irabState}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Mode Specific Inspector */}
      {mode === 'analyze' && activeToken && (
        <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500">
                Word #{activeToken.index + 1} · {activeToken.posEn}
              </span>
              <h3 className={`font-arabic font-bold text-stone-900 dark:text-stone-50 ${arabicSizeClass(fontSize, 'lg')}`}>
                {formatArabicDisplay(activeToken.word, showHarakat)}
              </h3>
            </div>
            <div className="text-right">
              <div className="font-arabic text-base font-bold text-emerald-800 dark:text-emerald-400">
                {activeToken.roleAr} ({activeToken.irabState})
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400">
                {lang === 'tl' ? activeToken.roleTl : activeToken.roleEn}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="rounded-lg border border-stone-200 p-3 dark:border-stone-800">
              <div className="text-stone-500 dark:text-stone-400">Classification (نوع الإعراب)</div>
              <div className="mt-1 font-arabic text-base font-bold text-stone-900 dark:text-stone-100">
                {activeToken.irabClassification}
              </div>
            </div>
            <div className="rounded-lg border border-stone-200 p-3 dark:border-stone-800">
              <div className="text-stone-500 dark:text-stone-400">Marker (علامة الإعراب)</div>
              <div className="mt-1 font-arabic text-base font-bold text-stone-900 dark:text-stone-100">
                {activeToken.markerAr}
              </div>
              <div className="text-stone-500 dark:text-stone-400">{activeToken.markerEn}</div>
            </div>
            <div className="rounded-lg border border-stone-200 p-3 dark:border-stone-800">
              <div className="text-stone-500 dark:text-stone-400">Governor (العامل)</div>
              <div className="mt-1 font-arabic text-base font-bold text-stone-900 dark:text-stone-100">
                {activeToken.amilAr}
              </div>
              <div className="text-stone-500 dark:text-stone-400">{activeToken.amilEn}</div>
            </div>
            <div className="rounded-lg border border-stone-200 p-3 dark:border-stone-800">
              <div className="text-stone-500 dark:text-stone-400">Confidence</div>
              <div className="mt-1 font-semibold capitalize text-stone-900 dark:text-stone-100">
                {activeToken.confidence.replace(/_/g, ' ')}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {lang === 'ar' ? 'العلاقة في التركيب: ' : 'Structural Relation: '}
              </span>
              <span className="text-stone-700 dark:text-stone-300">
                {pickText(activeToken.relationNote, lang)}
              </span>
            </div>
            <div>
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {lang === 'ar' ? 'الإعراب التفصيلي: ' : 'Detailed Explanation: '}
              </span>
              <span className="text-stone-700 dark:text-stone-300">
                {pickText(activeToken.explanation, lang)}
              </span>
            </div>
            {activeToken.alternatives && activeToken.alternatives.length > 0 && (
              <div className="text-xs text-amber-800 dark:text-amber-300">
                Possible alternative readings: {activeToken.alternatives.join(' · ')}
              </div>
            )}
          </div>
        </section>
      )}

      {mode === 'manual' && (
        <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-4">
          <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
            {lang === 'ar' ? 'تحرير الإعراب يدويًا لكل كلمة' : 'Manual I\'rab Editor (Refine Every Word)'}
          </h3>
          <div className="space-y-3">
            {result.tokens.map((tok) => {
              const curr = manualEdits[tok.index] ?? {
                roleAr: tok.roleAr,
                irabState: tok.irabState,
                markerAr: tok.markerAr,
              };
              return (
                <div
                  key={tok.index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center rounded-lg border border-stone-200 p-3 dark:border-stone-800"
                >
                  <div className="font-arabic text-lg font-bold text-stone-900 dark:text-stone-100">
                    {formatArabicDisplay(tok.word, showHarakat)}
                  </div>
                  <select
                    value={curr.roleAr}
                    onChange={(e) =>
                      setManualEdits((prev) => ({
                        ...prev,
                        [tok.index]: { ...curr, roleAr: e.target.value },
                      }))
                    }
                    className="font-arabic px-2.5 py-1.5 rounded border border-stone-300 bg-stone-50 text-sm dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                  >
                    {!COMMON_ROLES.includes(curr.roleAr) && (
                      <option value={curr.roleAr}>{curr.roleAr}</option>
                    )}
                    {COMMON_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <select
                    value={curr.irabState}
                    onChange={(e) =>
                      setManualEdits((prev) => ({
                        ...prev,
                        [tok.index]: { ...curr, irabState: e.target.value as IrabState },
                      }))
                    }
                    className="font-arabic px-2.5 py-1.5 rounded border border-stone-300 bg-stone-50 text-sm dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                  >
                    {IRAB_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    dir="rtl"
                    value={curr.markerAr}
                    onChange={(e) =>
                      setManualEdits((prev) => ({
                        ...prev,
                        [tok.index]: { ...curr, markerAr: e.target.value },
                      }))
                    }
                    className="font-arabic px-2.5 py-1.5 rounded border border-stone-300 bg-stone-50 text-sm dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {mode === 'practice' && (
        <section className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900/90 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
              {lang === 'ar' ? 'اختر الحالة الإعرابية الصحيحة لكل كلمة:' : "Select the Correct I'rab State for Each Word:"}
            </h3>
            {practiceScore && (
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                Score: {practiceScore.correct}/{practiceScore.total}
              </span>
            )}
          </div>

          <div className="space-y-3">
            {result.tokens.map((tok) => {
              const choice = practiceChoices[tok.index]?.state;
              const isOk = choice === tok.irabState;
              return (
                <div
                  key={tok.index}
                  className="rounded-lg border border-stone-200 p-3.5 dark:border-stone-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-arabic text-xl font-bold text-stone-900 dark:text-stone-100">
                      {formatArabicDisplay(tok.word, showHarakat)}
                    </span>
                    {practiceChecked && (
                      <span className={`text-xs font-semibold ${isOk ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {isOk ? 'Correct' : `Expected: ${tok.irabState} (${tok.roleAr})`}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {IRAB_STATES.map((st) => (
                      <button
                        key={st}
                        type="button"
                        disabled={practiceChecked}
                        onClick={() =>
                          setPracticeChoices((prev) => ({
                            ...prev,
                            [tok.index]: { ...prev[tok.index], state: st },
                          }))
                        }
                        className={`font-arabic px-3 py-1 rounded text-sm border transition-colors ${
                          choice === st
                            ? 'border-emerald-700 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/70 dark:text-emerald-100'
                            : 'border-stone-200 bg-stone-50 text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-2">
            {practiceChecked ? (
              <button
                type="button"
                onClick={() => {
                  setPracticeChoices({});
                  setPracticeChecked(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold border border-stone-300 dark:border-stone-700"
              >
                Reset
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setPracticeChecked(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-800 text-white hover:bg-emerald-700 dark:bg-emerald-600"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t('checkAnswer', lang)}</span>
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
