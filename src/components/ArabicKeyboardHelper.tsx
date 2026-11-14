import { Language, VerificationStatus } from '../types/arabic';
import { stripDiacritics } from '../engine/tasreefEngine';
import { t } from '../i18n/translations';

export const HARAKAT_KEYS: { char: string; label: string; name: string }[] = [
  { char: '\u064E', label: 'ـَ', name: 'Fatha' },
  { char: '\u064F', label: 'ـُ', name: 'Damma' },
  { char: '\u0650', label: 'ـِ', name: 'Kasra' },
  { char: '\u0652', label: 'ـْ', name: 'Sukun' },
  { char: '\u0651', label: 'ـّ', name: 'Shadda' },
  { char: '\u064B', label: 'ـً', name: 'Fathatan' },
  { char: '\u064C', label: 'ـٌ', name: 'Dammatan' },
  { char: '\u064D', label: 'ـٍ', name: 'Kasratan' },
  { char: 'أ', label: 'أ', name: 'Alif Hamza Above' },
  { char: 'إ', label: 'إ', name: 'Alif Hamza Below' },
  { char: 'آ', label: 'آ', name: 'Alif Madda' },
  { char: 'ء', label: 'ء', name: 'Hamza' },
  { char: 'ؤ', label: 'ؤ', name: 'Waw Hamza' },
  { char: 'ئ', label: 'ئ', name: 'Ya Hamza' },
  { char: 'ى', label: 'ى', name: 'Alif Maqsura' },
  { char: 'ة', label: 'ة', name: 'Ta Marbuta' },
];

export function formatArabicDisplay(text: string, showHarakat: boolean): string {
  if (!text) return '';
  return showHarakat ? text : stripDiacritics(text);
}

export function arabicSizeClass(size: 'normal' | 'large' | 'xlarge', base: 'sm' | 'md' | 'lg' = 'md'): string {
  if (base === 'lg') {
    if (size === 'xlarge') return 'text-3xl sm:text-4xl';
    if (size === 'large') return 'text-2xl sm:text-3xl';
    return 'text-xl sm:text-2xl';
  }
  if (base === 'sm') {
    if (size === 'xlarge') return 'text-xl';
    if (size === 'large') return 'text-lg';
    return 'text-base';
  }
  if (size === 'xlarge') return 'text-2xl';
  if (size === 'large') return 'text-xl';
  return 'text-lg';
}

export function verificationLabel(status: VerificationStatus, lang: Language): string {
  if (status === 'verified') return t('verified', lang);
  if (status === 'needs_review') return t('needsReview', lang);
  if (status === 'corrected') return t('corrected', lang);
  return t('unverified', lang);
}

interface ArabicKeyboardHelperProps {
  onInsert: (char: string) => void;
  lang: Language;
  compact?: boolean;
}

export function ArabicKeyboardHelper({ onInsert, lang, compact }: ArabicKeyboardHelperProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-2">
      <span className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 mr-1">
        {lang === 'ar' ? 'مساعد التشكيل:' : lang === 'tl' ? 'Gabay sa Harakat:' : 'Harakat & Hamza:'}
      </span>
      {HARAKAT_KEYS.slice(0, compact ? 10 : HARAKAT_KEYS.length).map((k) => (
        <button
          key={k.name}
          type="button"
          title={k.name}
          onClick={() => onInsert(k.char)}
          className="font-arabic px-2 py-0.5 min-w-[30px] text-base leading-normal rounded border border-stone-300 bg-white text-stone-800 hover:bg-emerald-50 hover:border-emerald-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-emerald-950 transition-colors"
        >
          {k.label}
        </button>
      ))}
    </div>
  );
}
