import type {
  AmrPronounKey,
  ConjugationTable,
  PronounKey,
  VerbEntry,
  VerbForm,
} from '../types/sarf';
import { getRootLetters, stripHarakat } from './arabicUtils';

export interface PronounMeta {
  key: PronounKey;
  ar: string;
  translit: string;
  label: string;
  group: '3rd' | '2nd' | '1st';
}

export const PRONOUNS: PronounMeta[] = [
  { key: 'huwa', ar: 'هُوَ', translit: 'huwa', label: 'he', group: '3rd' },
  { key: 'huma_m', ar: 'هُمَا', translit: 'humā (m)', label: 'they (2m)', group: '3rd' },
  { key: 'hum', ar: 'هُمْ', translit: 'hum', label: 'they (m)', group: '3rd' },
  { key: 'hiya', ar: 'هِيَ', translit: 'hiya', label: 'she', group: '3rd' },
  { key: 'huma_f', ar: 'هُمَا', translit: 'humā (f)', label: 'they (2f)', group: '3rd' },
  { key: 'hunna', ar: 'هُنَّ', translit: 'hunna', label: 'they (f)', group: '3rd' },
  { key: 'anta', ar: 'أَنْتَ', translit: 'anta', label: 'you (m)', group: '2nd' },
  { key: 'antuma_m', ar: 'أَنْتُمَا', translit: 'antumā (m)', label: 'you (2m)', group: '2nd' },
  { key: 'antum', ar: 'أَنْتُمْ', translit: 'antum', label: 'you (m.pl)', group: '2nd' },
  { key: 'anti', ar: 'أَنْتِ', translit: 'anti', label: 'you (f)', group: '2nd' },
  { key: 'antuma_f', ar: 'أَنْتُمَا', translit: 'antumā (f)', label: 'you (2f)', group: '2nd' },
  { key: 'antunna', ar: 'أَنْتُنَّ', translit: 'antunna', label: 'you (f.pl)', group: '2nd' },
  { key: 'ana', ar: 'أَنَا', translit: 'anā', label: 'I', group: '1st' },
  { key: 'nahnu', ar: 'نَحْنُ', translit: 'naḥnu', label: 'we', group: '1st' },
];

export const AMR_PRONOUN_KEYS: AmrPronounKey[] = [
  'anta',
  'antuma_m',
  'antum',
  'anti',
  'antuma_f',
  'antunna',
];

const FATHA = '\u064E';
const DAMMA = '\u064F';
const KASRA = '\u0650';
const SUKUN = '\u0652';
const SHADDA = '\u0651';

/** Extract the short vowel right after a specific consonant index in a vocalized word */
function getVowelAfterConsonant(word: string, consonantIndex: number): string {
  const letters = /[\u0621-\u064A]/;
  const vowels = new Set([FATHA, DAMMA, KASRA, SUKUN]);
  let cCount = -1;
  for (let i = 0; i < word.length; i++) {
    if (letters.test(word[i])) {
      cCount++;
      if (cCount === consonantIndex) {
        for (let j = i + 1; j < word.length; j++) {
          if (letters.test(word[j])) break;
          if (vowels.has(word[j])) return word[j];
        }
        return '';
      }
    }
  }
  return '';
}

function fixOrthography(word: string): string {
  return word
    .replace(/أَأْ/g, 'آ')
    .replace(/أَا/g, 'آ')
    .replace(/اُأْ/g, 'اُو')
    .replace(/اِأْ/g, 'اِي')
    .replace(/([َ])ء([َُِ]?)/g, 'أ$2')
    .replace(/([ُ])أ([َُْ]?)/g, '$1ؤ$2')
    .replace(/([ِ])أ([َُِْ]?)/g, '$1ئ$2')
    .replace(/([ِ])ء([َُِ]?)/g, '$1ئ$2')
    .replace(/([ُ])ء([َُ]?)/g, '$1ؤ$2')
    .replace(/يْي/g, 'يّ')
    .replace(/نْن/g, 'نّ')
    .replace(/تْت/g, 'تّ');
}

function isHamzaLetter(ch: string): boolean {
  return ch === 'أ' || ch === 'إ' || ch === 'ؤ' || ch === 'ئ' || ch === 'ء';
}

function normalizeHamzaRoot(ch: string): string {
  return isHamzaLetter(ch) ? 'أ' : ch;
}

/** Form VIII infix ت undergoes Ibdal depending on R1 */
function getForm8Consonants(r1: string): { prefix: string; r1Out: string; infix: string } {
  if ('صضطظ'.includes(r1)) {
    return { prefix: 'اِ', r1Out: r1, infix: 'ط' };
  }
  if ('دذز'.includes(r1)) {
    return { prefix: 'اِ', r1Out: r1, infix: 'د' };
  }
  if (r1 === 'و' || r1 === 'ي' || isHamzaLetter(r1)) {
    return { prefix: 'اِ', r1Out: 'ت' + SHADDA, infix: '' };
  }
  return { prefix: 'اِ', r1Out: r1, infix: 'ت' };
}

function buildMadhiSound(stem3ms: string, stemBeforeCons: string): Record<PronounKey, string> {
  // stem3ms e.g. كَتَبَ (ends with fatha or shadda+fatha)
  // Strip trailing fatha to attach suffixes
  const baseVowel = stem3ms.endsWith(FATHA) ? stem3ms.slice(0, -1) : stem3ms;
  const consBase = stemBeforeCons.endsWith(FATHA)
    ? stemBeforeCons.slice(0, -1)
    : stemBeforeCons;

  return {
    huwa: fixOrthography(stem3ms),
    huma_m: fixOrthography(baseVowel + FATHA + 'ا'),
    hum: fixOrthography(baseVowel + DAMMA + 'وا'),
    hiya: fixOrthography(baseVowel + FATHA + 'ت' + SUKUN),
    huma_f: fixOrthography(baseVowel + FATHA + 'ت' + FATHA + 'ا'),
    hunna: fixOrthography(consBase + SUKUN + 'ن' + FATHA),
    anta: fixOrthography(consBase + SUKUN + 'ت' + FATHA),
    antuma_m: fixOrthography(consBase + SUKUN + 'ت' + DAMMA + 'م' + FATHA + 'ا'),
    antum: fixOrthography(consBase + SUKUN + 'ت' + DAMMA + 'م' + SUKUN),
    anti: fixOrthography(consBase + SUKUN + 'ت' + KASRA),
    antuma_f: fixOrthography(consBase + SUKUN + 'ت' + DAMMA + 'م' + FATHA + 'ا'),
    antunna: fixOrthography(consBase + SUKUN + 'ت' + DAMMA + 'ن' + SHADDA + FATHA),
    ana: fixOrthography(consBase + SUKUN + 'ت' + DAMMA),
    nahnu: fixOrthography(consBase + SUKUN + 'ن' + FATHA + 'ا'),
  };
}

function buildMudhariSound(
  stemAfterPrefix: string, // e.g. "كْتُب" (without prefix and final mood vowel)
  prefixVowel: string // FATHA or DAMMA
): {
  mudhari: Record<PronounKey, string>;
  mansub: Record<PronounKey, string>;
  majzum: Record<PronounKey, string>;
} {
  const mk = (pfx: string, sfx: string) => fixOrthography(pfx + prefixVowel + stemAfterPrefix + sfx);

  const mudhari: Record<PronounKey, string> = {
    huwa: mk('ي', DAMMA),
    huma_m: mk('ي', FATHA + 'ان' + KASRA),
    hum: mk('ي', DAMMA + 'ون' + FATHA),
    hiya: mk('ت', DAMMA),
    huma_f: mk('ت', FATHA + 'ان' + KASRA),
    hunna: mk('ي', SUKUN + 'ن' + FATHA),
    anta: mk('ت', DAMMA),
    antuma_m: mk('ت', FATHA + 'ان' + KASRA),
    antum: mk('ت', DAMMA + 'ون' + FATHA),
    anti: mk('ت', KASRA + 'ين' + FATHA),
    antuma_f: mk('ت', FATHA + 'ان' + KASRA),
    antunna: mk('ت', SUKUN + 'ن' + FATHA),
    ana: mk('أ', DAMMA),
    nahnu: mk('ن', DAMMA),
  };

  const mansub: Record<PronounKey, string> = {
    huwa: 'لَنْ ' + mk('ي', FATHA),
    huma_m: 'لَنْ ' + mk('ي', FATHA + 'ا'),
    hum: 'لَنْ ' + mk('ي', DAMMA + 'وا'),
    hiya: 'لَنْ ' + mk('ت', FATHA),
    huma_f: 'لَنْ ' + mk('ت', FATHA + 'ا'),
    hunna: 'لَنْ ' + mk('ي', SUKUN + 'ن' + FATHA),
    anta: 'لَنْ ' + mk('ت', FATHA),
    antuma_m: 'لَنْ ' + mk('ت', FATHA + 'ا'),
    antum: 'لَنْ ' + mk('ت', DAMMA + 'وا'),
    anti: 'لَنْ ' + mk('ت', KASRA + 'ي'),
    antuma_f: 'لَنْ ' + mk('ت', FATHA + 'ا'),
    antunna: 'لَنْ ' + mk('ت', SUKUN + 'ن' + FATHA),
    ana: 'لَنْ ' + mk('أ', FATHA),
    nahnu: 'لَنْ ' + mk('ن', FATHA),
  };

  const majzum: Record<PronounKey, string> = {
    huwa: 'لَمْ ' + mk('ي', SUKUN),
    huma_m: 'لَمْ ' + mk('ي', FATHA + 'ا'),
    hum: 'لَمْ ' + mk('ي', DAMMA + 'وا'),
    hiya: 'لَمْ ' + mk('ت', SUKUN),
    huma_f: 'لَمْ ' + mk('ت', FATHA + 'ا'),
    hunna: 'لَمْ ' + mk('ي', SUKUN + 'ن' + FATHA),
    anta: 'لَمْ ' + mk('ت', SUKUN),
    antuma_m: 'لَمْ ' + mk('ت', FATHA + 'ا'),
    antum: 'لَمْ ' + mk('ت', DAMMA + 'وا'),
    anti: 'لَمْ ' + mk('ت', KASRA + 'ي'),
    antuma_f: 'لَمْ ' + mk('ت', FATHA + 'ا'),
    antunna: 'لَمْ ' + mk('ت', SUKUN + 'ن' + FATHA),
    ana: 'لَمْ ' + mk('أ', SUKUN),
    nahnu: 'لَمْ ' + mk('ن', SUKUN),
  };

  return { mudhari, mansub, majzum };
}

function buildAmrFromStem(amrBase: string): Record<AmrPronounKey, string> {
  return {
    anta: fixOrthography(amrBase + SUKUN),
    antuma_m: fixOrthography(amrBase + FATHA + 'ا'),
    antum: fixOrthography(amrBase + DAMMA + 'وا'),
    anti: fixOrthography(amrBase + KASRA + 'ي'),
    antuma_f: fixOrthography(amrBase + FATHA + 'ا'),
    antunna: fixOrthography(amrBase + SUKUN + 'ن' + FATHA),
  };
}

function buildNahyFromMajzum(majzum: Record<PronounKey, string>): Record<AmrPronounKey, string> {
  const stripLam = (s: string) => s.replace(/^لَمْ\s+/, 'لَا ');
  return {
    anta: stripLam(majzum.anta),
    antuma_m: stripLam(majzum.antuma_m),
    antum: stripLam(majzum.antum),
    anti: stripLam(majzum.anti),
    antuma_f: stripLam(majzum.antuma_f),
    antunna: stripLam(majzum.antunna),
  };
}

/** Hollow conjugation helper: takes longStem (e.g. "قَال" / "قُول") & shortStem (e.g. "قُل") */
function buildHollowMadhi(longStem: string, shortStem: string): Record<PronounKey, string> {
  return {
    huwa: fixOrthography(longStem + FATHA),
    huma_m: fixOrthography(longStem + FATHA + 'ا'),
    hum: fixOrthography(longStem + DAMMA + 'وا'),
    hiya: fixOrthography(longStem + FATHA + 'ت' + SUKUN),
    huma_f: fixOrthography(longStem + FATHA + 'ت' + FATHA + 'ا'),
    hunna: fixOrthography(shortStem + SUKUN + 'ن' + FATHA),
    anta: fixOrthography(shortStem + SUKUN + 'ت' + FATHA),
    antuma_m: fixOrthography(shortStem + SUKUN + 'ت' + DAMMA + 'م' + FATHA + 'ا'),
    antum: fixOrthography(shortStem + SUKUN + 'ت' + DAMMA + 'م' + SUKUN),
    anti: fixOrthography(shortStem + SUKUN + 'ت' + KASRA),
    antuma_f: fixOrthography(shortStem + SUKUN + 'ت' + DAMMA + 'م' + FATHA + 'ا'),
    antunna: fixOrthography(shortStem + SUKUN + 'ت' + DAMMA + 'ن' + SHADDA + FATHA),
    ana: fixOrthography(shortStem + SUKUN + 'ت' + DAMMA),
    nahnu: fixOrthography(shortStem + SUKUN + 'ن' + FATHA + 'ا'),
  };
}

function buildHollowMudhari(
  longInner: string, // e.g. "قُول" or "بِيع" or "خَاف" or "قِيم"
  shortInner: string, // e.g. "قُل" or "بِع" or "خَف" or "قِم"
  prefixVowel: string,
  amrPrefix = ''
): {
  mudhari: Record<PronounKey, string>;
  mansub: Record<PronounKey, string>;
  majzum: Record<PronounKey, string>;
  amr: Record<AmrPronounKey, string>;
} {
  const mkL = (pfx: string, sfx: string) => fixOrthography(pfx + prefixVowel + longInner + sfx);
  const mkS = (pfx: string, sfx: string) => fixOrthography(pfx + prefixVowel + shortInner + sfx);

  const mudhari: Record<PronounKey, string> = {
    huwa: mkL('ي', DAMMA),
    huma_m: mkL('ي', FATHA + 'ان' + KASRA),
    hum: mkL('ي', DAMMA + 'ون' + FATHA),
    hiya: mkL('ت', DAMMA),
    huma_f: mkL('ت', FATHA + 'ان' + KASRA),
    hunna: mkS('ي', SUKUN + 'ن' + FATHA),
    anta: mkL('ت', DAMMA),
    antuma_m: mkL('ت', FATHA + 'ان' + KASRA),
    antum: mkL('ت', DAMMA + 'ون' + FATHA),
    anti: mkL('ت', KASRA + 'ين' + FATHA),
    antuma_f: mkL('ت', FATHA + 'ان' + KASRA),
    antunna: mkS('ت', SUKUN + 'ن' + FATHA),
    ana: mkL('أ', DAMMA),
    nahnu: mkL('ن', DAMMA),
  };

  const mansub: Record<PronounKey, string> = {
    huwa: 'لَنْ ' + mkL('ي', FATHA),
    huma_m: 'لَنْ ' + mkL('ي', FATHA + 'ا'),
    hum: 'لَنْ ' + mkL('ي', DAMMA + 'وا'),
    hiya: 'لَنْ ' + mkL('ت', FATHA),
    huma_f: 'لَنْ ' + mkL('ت', FATHA + 'ا'),
    hunna: 'لَنْ ' + mkS('ي', SUKUN + 'ن' + FATHA),
    anta: 'لَنْ ' + mkL('ت', FATHA),
    antuma_m: 'لَنْ ' + mkL('ت', FATHA + 'ا'),
    antum: 'لَنْ ' + mkL('ت', DAMMA + 'وا'),
    anti: 'لَنْ ' + mkL('ت', KASRA + 'ي'),
    antuma_f: 'لَنْ ' + mkL('ت', FATHA + 'ا'),
    antunna: 'لَنْ ' + mkS('ت', SUKUN + 'ن' + FATHA),
    ana: 'لَنْ ' + mkL('أ', FATHA),
    nahnu: 'لَنْ ' + mkL('ن', FATHA),
  };

  const majzum: Record<PronounKey, string> = {
    huwa: 'لَمْ ' + mkS('ي', SUKUN),
    huma_m: 'لَمْ ' + mkL('ي', FATHA + 'ا'),
    hum: 'لَمْ ' + mkL('ي', DAMMA + 'وا'),
    hiya: 'لَمْ ' + mkS('ت', SUKUN),
    huma_f: 'لَمْ ' + mkL('ت', FATHA + 'ا'),
    hunna: 'لَمْ ' + mkS('ي', SUKUN + 'ن' + FATHA),
    anta: 'لَمْ ' + mkS('ت', SUKUN),
    antuma_m: 'لَمْ ' + mkL('ت', FATHA + 'ا'),
    antum: 'لَمْ ' + mkL('ت', DAMMA + 'وا'),
    anti: 'لَمْ ' + mkL('ت', KASRA + 'ي'),
    antuma_f: 'لَمْ ' + mkL('ت', FATHA + 'ا'),
    antunna: 'لَمْ ' + mkS('ت', SUKUN + 'ن' + FATHA),
    ana: 'لَمْ ' + mkS('أ', SUKUN),
    nahnu: 'لَمْ ' + mkS('ن', SUKUN),
  };

  const amr: Record<AmrPronounKey, string> = {
    anta: fixOrthography(amrPrefix + shortInner + SUKUN),
    antuma_m: fixOrthography(amrPrefix + longInner + FATHA + 'ا'),
    antum: fixOrthography(amrPrefix + longInner + DAMMA + 'وا'),
    anti: fixOrthography(amrPrefix + longInner + KASRA + 'ي'),
    antuma_f: fixOrthography(amrPrefix + longInner + FATHA + 'ا'),
    antunna: fixOrthography(amrPrefix + shortInner + SUKUN + 'ن' + FATHA),
  };

  return { mudhari, mansub, majzum, amr };
}

/** Defective Madhi helper */
function buildDefectiveMadhi(
  stemWithoutR3: string, // e.g. "دَع" or "رَم" or "نَس" or "صَلّ" or "أَعْط" or "اِشْتَر"
  madhiEndType: 'alif' | 'maqsura' | 'iya'
): Record<PronounKey, string> {
  if (madhiEndType === 'alif') {
    // دَعَا (C2 has fatha, weak = و)
    return {
      huwa: fixOrthography(stemWithoutR3 + FATHA + 'ا'),
      huma_m: fixOrthography(stemWithoutR3 + FATHA + 'و' + FATHA + 'ا'),
      hum: fixOrthography(stemWithoutR3 + FATHA + 'وْا'),
      hiya: fixOrthography(stemWithoutR3 + FATHA + 'تْ'),
      huma_f: fixOrthography(stemWithoutR3 + FATHA + 'تَا'),
      hunna: fixOrthography(stemWithoutR3 + FATHA + 'وْنَ'),
      anta: fixOrthography(stemWithoutR3 + FATHA + 'وْتَ'),
      antuma_m: fixOrthography(stemWithoutR3 + FATHA + 'وْتُمَا'),
      antum: fixOrthography(stemWithoutR3 + FATHA + 'وْتُمْ'),
      anti: fixOrthography(stemWithoutR3 + FATHA + 'وْتِ'),
      antuma_f: fixOrthography(stemWithoutR3 + FATHA + 'وْتُمَا'),
      antunna: fixOrthography(stemWithoutR3 + FATHA + 'وْتُنَّ'),
      ana: fixOrthography(stemWithoutR3 + FATHA + 'وْتُ'),
      nahnu: fixOrthography(stemWithoutR3 + FATHA + 'وْنَا'),
    };
  }
  if (madhiEndType === 'iya') {
    // نَسِيَ / بَقِيَ / رَضِيَ
    return {
      huwa: fixOrthography(stemWithoutR3 + KASRA + 'يَ'),
      huma_m: fixOrthography(stemWithoutR3 + KASRA + 'يَا'),
      hum: fixOrthography(stemWithoutR3 + DAMMA + 'وا'),
      hiya: fixOrthography(stemWithoutR3 + KASRA + 'يَتْ'),
      huma_f: fixOrthography(stemWithoutR3 + KASRA + 'يَتَا'),
      hunna: fixOrthography(stemWithoutR3 + KASRA + 'ينَ'),
      anta: fixOrthography(stemWithoutR3 + KASRA + 'يتَ'),
      antuma_m: fixOrthography(stemWithoutR3 + KASRA + 'يتُمَا'),
      antum: fixOrthography(stemWithoutR3 + KASRA + 'يتُمْ'),
      anti: fixOrthography(stemWithoutR3 + KASRA + 'يتِ'),
      antuma_f: fixOrthography(stemWithoutR3 + KASRA + 'يتُمَا'),
      antunna: fixOrthography(stemWithoutR3 + KASRA + 'يتُنَّ'),
      ana: fixOrthography(stemWithoutR3 + KASRA + 'يتُ'),
      nahnu: fixOrthography(stemWithoutR3 + KASRA + 'ينَا'),
    };
  }
  // maqsura: رَمَى / صَلَّى / أَعْطَى / اِشْتَرَى
  return {
    huwa: fixOrthography(stemWithoutR3 + FATHA + 'ى'),
    huma_m: fixOrthography(stemWithoutR3 + FATHA + 'يَا'),
    hum: fixOrthography(stemWithoutR3 + FATHA + 'وْا'),
    hiya: fixOrthography(stemWithoutR3 + FATHA + 'تْ'),
    huma_f: fixOrthography(stemWithoutR3 + FATHA + 'تَا'),
    hunna: fixOrthography(stemWithoutR3 + FATHA + 'يْنَ'),
    anta: fixOrthography(stemWithoutR3 + FATHA + 'يْتَ'),
    antuma_m: fixOrthography(stemWithoutR3 + FATHA + 'يْتُمَا'),
    antum: fixOrthography(stemWithoutR3 + FATHA + 'يْتُمْ'),
    anti: fixOrthography(stemWithoutR3 + FATHA + 'يْتِ'),
    antuma_f: fixOrthography(stemWithoutR3 + FATHA + 'يْتُمَا'),
    antunna: fixOrthography(stemWithoutR3 + FATHA + 'يْتُنَّ'),
    ana: fixOrthography(stemWithoutR3 + FATHA + 'يْتُ'),
    nahnu: fixOrthography(stemWithoutR3 + FATHA + 'يْنَا'),
  };
}

/** Defective Mudhari helper */
function buildDefectiveMudhari(
  innerWithoutR3: string, // e.g. "دْع" or "رْم" or "سْع" or "صَلّ" or "عْط"
  prefixVowel: string,
  endType: 'u' | 'i' | 'a',
  amrPrefix: string
): {
  mudhari: Record<PronounKey, string>;
  mansub: Record<PronounKey, string>;
  majzum: Record<PronounKey, string>;
  amr: Record<AmrPronounKey, string>;
} {
  const mk = (pfx: string, tail: string) => fixOrthography(pfx + prefixVowel + innerWithoutR3 + tail);

  if (endType === 'u') {
    // يَدْعُو
    const mudhari: Record<PronounKey, string> = {
      huwa: mk('ي', DAMMA + 'و'),
      huma_m: mk('ي', DAMMA + 'وَانِ'),
      hum: mk('ي', DAMMA + 'ونَ'),
      hiya: mk('ت', DAMMA + 'و'),
      huma_f: mk('ت', DAMMA + 'وَانِ'),
      hunna: mk('ي', DAMMA + 'ونَ'),
      anta: mk('ت', DAMMA + 'و'),
      antuma_m: mk('ت', DAMMA + 'وَانِ'),
      antum: mk('ت', DAMMA + 'ونَ'),
      anti: mk('ت', KASRA + 'ينَ'),
      antuma_f: mk('ت', DAMMA + 'وَانِ'),
      antunna: mk('ت', DAMMA + 'ونَ'),
      ana: mk('أ', DAMMA + 'و'),
      nahnu: mk('ن', DAMMA + 'و'),
    };
    const mansub: Record<PronounKey, string> = {
      huwa: 'لَنْ ' + mk('ي', DAMMA + 'وَ'),
      huma_m: 'لَنْ ' + mk('ي', DAMMA + 'وَا'),
      hum: 'لَنْ ' + mk('ي', DAMMA + 'وا'),
      hiya: 'لَنْ ' + mk('ت', DAMMA + 'وَ'),
      huma_f: 'لَنْ ' + mk('ت', DAMMA + 'وَا'),
      hunna: 'لَنْ ' + mk('ي', DAMMA + 'ونَ'),
      anta: 'لَنْ ' + mk('ت', DAMMA + 'وَ'),
      antuma_m: 'لَنْ ' + mk('ت', DAMMA + 'وَا'),
      antum: 'لَنْ ' + mk('ت', DAMMA + 'وا'),
      anti: 'لَنْ ' + mk('ت', KASRA + 'ي'),
      antuma_f: 'لَنْ ' + mk('ت', DAMMA + 'وَا'),
      antunna: 'لَنْ ' + mk('ت', DAMMA + 'ونَ'),
      ana: 'لَنْ ' + mk('أ', DAMMA + 'وَ'),
      nahnu: 'لَنْ ' + mk('ن', DAMMA + 'وَ'),
    };
    const majzum: Record<PronounKey, string> = {
      huwa: 'لَمْ ' + mk('ي', DAMMA),
      huma_m: 'لَمْ ' + mk('ي', DAMMA + 'وَا'),
      hum: 'لَمْ ' + mk('ي', DAMMA + 'وا'),
      hiya: 'لَمْ ' + mk('ت', DAMMA),
      huma_f: 'لَمْ ' + mk('ت', DAMMA + 'وَا'),
      hunna: 'لَمْ ' + mk('ي', DAMMA + 'ونَ'),
      anta: 'لَمْ ' + mk('ت', DAMMA),
      antuma_m: 'لَمْ ' + mk('ت', DAMMA + 'وَا'),
      antum: 'لَمْ ' + mk('ت', DAMMA + 'وا'),
      anti: 'لَمْ ' + mk('ت', KASRA + 'ي'),
      antuma_f: 'لَمْ ' + mk('ت', DAMMA + 'وَا'),
      antunna: 'لَمْ ' + mk('ت', DAMMA + 'ونَ'),
      ana: 'لَمْ ' + mk('أ', DAMMA),
      nahnu: 'لَمْ ' + mk('ن', DAMMA),
    };
    const amr: Record<AmrPronounKey, string> = {
      anta: fixOrthography(amrPrefix + innerWithoutR3 + DAMMA),
      antuma_m: fixOrthography(amrPrefix + innerWithoutR3 + DAMMA + 'وَا'),
      antum: fixOrthography(amrPrefix + innerWithoutR3 + DAMMA + 'وا'),
      anti: fixOrthography(amrPrefix + innerWithoutR3 + KASRA + 'ي'),
      antuma_f: fixOrthography(amrPrefix + innerWithoutR3 + DAMMA + 'وَا'),
      antunna: fixOrthography(amrPrefix + innerWithoutR3 + DAMMA + 'ونَ'),
    };
    return { mudhari, mansub, majzum, amr };
  }

  if (endType === 'i') {
    // يَرْمِي / يُصَلِّي / يُعْطِي / يَشْتَرِي
    const mudhari: Record<PronounKey, string> = {
      huwa: mk('ي', KASRA + 'ي'),
      huma_m: mk('ي', KASRA + 'يَانِ'),
      hum: mk('ي', DAMMA + 'ونَ'),
      hiya: mk('ت', KASRA + 'ي'),
      huma_f: mk('ت', KASRA + 'يَانِ'),
      hunna: mk('ي', KASRA + 'ينَ'),
      anta: mk('ت', KASRA + 'ي'),
      antuma_m: mk('ت', KASRA + 'يَانِ'),
      antum: mk('ت', DAMMA + 'ونَ'),
      anti: mk('ت', KASRA + 'ينَ'),
      antuma_f: mk('ت', KASRA + 'يَانِ'),
      antunna: mk('ت', KASRA + 'ينَ'),
      ana: mk('أ', KASRA + 'ي'),
      nahnu: mk('ن', KASRA + 'ي'),
    };
    const mansub: Record<PronounKey, string> = {
      huwa: 'لَنْ ' + mk('ي', KASRA + 'يَ'),
      huma_m: 'لَنْ ' + mk('ي', KASRA + 'يَا'),
      hum: 'لَنْ ' + mk('ي', DAMMA + 'وا'),
      hiya: 'لَنْ ' + mk('ت', KASRA + 'يَ'),
      huma_f: 'لَنْ ' + mk('ت', KASRA + 'يَا'),
      hunna: 'لَنْ ' + mk('ي', KASRA + 'ينَ'),
      anta: 'لَنْ ' + mk('ت', KASRA + 'يَ'),
      antuma_m: 'لَنْ ' + mk('ت', KASRA + 'يَا'),
      antum: 'لَنْ ' + mk('ت', DAMMA + 'وا'),
      anti: 'لَنْ ' + mk('ت', KASRA + 'ي'),
      antuma_f: 'لَنْ ' + mk('ت', KASRA + 'يَا'),
      antunna: 'لَنْ ' + mk('ت', KASRA + 'ينَ'),
      ana: 'لَنْ ' + mk('أ', KASRA + 'يَ'),
      nahnu: 'لَنْ ' + mk('ن', KASRA + 'يَ'),
    };
    const majzum: Record<PronounKey, string> = {
      huwa: 'لَمْ ' + mk('ي', KASRA),
      huma_m: 'لَمْ ' + mk('ي', KASRA + 'يَا'),
      hum: 'لَمْ ' + mk('ي', DAMMA + 'وا'),
      hiya: 'لَمْ ' + mk('ت', KASRA),
      huma_f: 'لَمْ ' + mk('ت', KASRA + 'يَا'),
      hunna: 'لَمْ ' + mk('ي', KASRA + 'ينَ'),
      anta: 'لَمْ ' + mk('ت', KASRA),
      antuma_m: 'لَمْ ' + mk('ت', KASRA + 'يَا'),
      antum: 'لَمْ ' + mk('ت', DAMMA + 'وا'),
      anti: 'لَمْ ' + mk('ت', KASRA + 'ي'),
      antuma_f: 'لَمْ ' + mk('ت', KASRA + 'يَا'),
      antunna: 'لَمْ ' + mk('ت', KASRA + 'ينَ'),
      ana: 'لَمْ ' + mk('أ', KASRA),
      nahnu: 'لَمْ ' + mk('ن', KASRA),
    };
    const amr: Record<AmrPronounKey, string> = {
      anta: fixOrthography(amrPrefix + innerWithoutR3 + KASRA),
      antuma_m: fixOrthography(amrPrefix + innerWithoutR3 + KASRA + 'يَا'),
      antum: fixOrthography(amrPrefix + innerWithoutR3 + DAMMA + 'وا'),
      anti: fixOrthography(amrPrefix + innerWithoutR3 + KASRA + 'ي'),
      antuma_f: fixOrthography(amrPrefix + innerWithoutR3 + KASRA + 'يَا'),
      antunna: fixOrthography(amrPrefix + innerWithoutR3 + KASRA + 'ينَ'),
    };
    return { mudhari, mansub, majzum, amr };
  }

  // endType === 'a': يَسْعَى / يَنْسَى / يَتَمَنَّى
  const mudhari: Record<PronounKey, string> = {
    huwa: mk('ي', FATHA + 'ى'),
    huma_m: mk('ي', FATHA + 'يَانِ'),
    hum: mk('ي', FATHA + 'وْنَ'),
    hiya: mk('ت', FATHA + 'ى'),
    huma_f: mk('ت', FATHA + 'يَانِ'),
    hunna: mk('ي', FATHA + 'يْنَ'),
    anta: mk('ت', FATHA + 'ى'),
    antuma_m: mk('ت', FATHA + 'يَانِ'),
    antum: mk('ت', FATHA + 'وْنَ'),
    anti: mk('ت', FATHA + 'يْنَ'),
    antuma_f: mk('ت', FATHA + 'يَانِ'),
    antunna: mk('ت', FATHA + 'يْنَ'),
    ana: mk('أ', FATHA + 'ى'),
    nahnu: mk('ن', FATHA + 'ى'),
  };
  const mansub: Record<PronounKey, string> = {
    huwa: 'لَنْ ' + mk('ي', FATHA + 'ى'),
    huma_m: 'لَنْ ' + mk('ي', FATHA + 'يَا'),
    hum: 'لَنْ ' + mk('ي', FATHA + 'وْا'),
    hiya: 'لَنْ ' + mk('ت', FATHA + 'ى'),
    huma_f: 'لَنْ ' + mk('ت', FATHA + 'يَا'),
    hunna: 'لَنْ ' + mk('ي', FATHA + 'يْنَ'),
    anta: 'لَنْ ' + mk('ت', FATHA + 'ى'),
    antuma_m: 'لَنْ ' + mk('ت', FATHA + 'يَا'),
    antum: 'لَنْ ' + mk('ت', FATHA + 'وْا'),
    anti: 'لَنْ ' + mk('ت', FATHA + 'يْ'),
    antuma_f: 'لَنْ ' + mk('ت', FATHA + 'يَا'),
    antunna: 'لَنْ ' + mk('ت', FATHA + 'يْنَ'),
    ana: 'لَنْ ' + mk('أ', FATHA + 'ى'),
    nahnu: 'لَنْ ' + mk('ن', FATHA + 'ى'),
  };
  const majzum: Record<PronounKey, string> = {
    huwa: 'لَمْ ' + mk('ي', FATHA),
    huma_m: 'لَمْ ' + mk('ي', FATHA + 'يَا'),
    hum: 'لَمْ ' + mk('ي', FATHA + 'وْا'),
    hiya: 'لَمْ ' + mk('ت', FATHA),
    huma_f: 'لَمْ ' + mk('ت', FATHA + 'يَا'),
    hunna: 'لَمْ ' + mk('ي', FATHA + 'يْنَ'),
    anta: 'لَمْ ' + mk('ت', FATHA),
    antuma_m: 'لَمْ ' + mk('ت', FATHA + 'يَا'),
    antum: 'لَمْ ' + mk('ت', FATHA + 'وْا'),
    anti: 'لَمْ ' + mk('ت', FATHA + 'يْ'),
    antuma_f: 'لَمْ ' + mk('ت', FATHA + 'يَا'),
    antunna: 'لَمْ ' + mk('ت', FATHA + 'يْنَ'),
    ana: 'لَمْ ' + mk('أ', FATHA),
    nahnu: 'لَمْ ' + mk('ن', FATHA),
  };
  const amr: Record<AmrPronounKey, string> = {
    anta: fixOrthography(amrPrefix + innerWithoutR3 + FATHA),
    antuma_m: fixOrthography(amrPrefix + innerWithoutR3 + FATHA + 'يَا'),
    antum: fixOrthography(amrPrefix + innerWithoutR3 + FATHA + 'وْا'),
    anti: fixOrthography(amrPrefix + innerWithoutR3 + FATHA + 'يْ'),
    antuma_f: fixOrthography(amrPrefix + innerWithoutR3 + FATHA + 'يَا'),
    antunna: fixOrthography(amrPrefix + innerWithoutR3 + FATHA + 'يْنَ'),
  };
  return { mudhari, mansub, majzum, amr };
}

/** Doubled (Muda'af) helper */
function buildDoubledVerb(
  madhiGemStem: string,   // e.g. "مَدّ" or "أَحَبّ" or "اِهْتَمّ"
  madhiSplitStem: string, // e.g. "مَدَد" or "أَحْبَب" or "اِهْتَمَم"
  mudhariGemInner: string,   // e.g. "مُدّ" or "فِرّ" or "عَضّ" or "حِبّ" or "هْتَمّ"
  mudhariSplitInner: string, // e.g. "مْدُد" or "فْرِر" or "عْضَض" or "حْبِب" or "هْتَمِم"
  prefixVowel: string,
  amrPrefix = ''
): {
  madhi: Record<PronounKey, string>;
  mudhari: Record<PronounKey, string>;
  mansub: Record<PronounKey, string>;
  majzum: Record<PronounKey, string>;
  amr: Record<AmrPronounKey, string>;
} {
  const madhi = buildMadhiSound(madhiGemStem + FATHA, madhiSplitStem + FATHA);
  const mkG = (pfx: string, sfx: string) => fixOrthography(pfx + prefixVowel + mudhariGemInner + sfx);
  const mkS = (pfx: string, sfx: string) => fixOrthography(pfx + prefixVowel + mudhariSplitInner + sfx);

  const mudhari: Record<PronounKey, string> = {
    huwa: mkG('ي', DAMMA),
    huma_m: mkG('ي', FATHA + 'انِ'),
    hum: mkG('ي', DAMMA + 'ونَ'),
    hiya: mkG('ت', DAMMA),
    huma_f: mkG('ت', FATHA + 'انِ'),
    hunna: mkS('ي', SUKUN + 'نَ'),
    anta: mkG('ت', DAMMA),
    antuma_m: mkG('ت', FATHA + 'انِ'),
    antum: mkG('ت', DAMMA + 'ونَ'),
    anti: mkG('ت', KASRA + 'ينَ'),
    antuma_f: mkG('ت', FATHA + 'انِ'),
    antunna: mkS('ت', SUKUN + 'نَ'),
    ana: mkG('أ', DAMMA),
    nahnu: mkG('ن', DAMMA),
  };

  const mansub: Record<PronounKey, string> = {
    huwa: 'لَنْ ' + mkG('ي', FATHA),
    huma_m: 'لَنْ ' + mkG('ي', FATHA + 'ا'),
    hum: 'لَنْ ' + mkG('ي', DAMMA + 'وا'),
    hiya: 'لَنْ ' + mkG('ت', FATHA),
    huma_f: 'لَنْ ' + mkG('ت', FATHA + 'ا'),
    hunna: 'لَنْ ' + mkS('ي', SUKUN + 'نَ'),
    anta: 'لَنْ ' + mkG('ت', FATHA),
    antuma_m: 'لَنْ ' + mkG('ت', FATHA + 'ا'),
    antum: 'لَنْ ' + mkG('ت', DAMMA + 'وا'),
    anti: 'لَنْ ' + mkG('ت', KASRA + 'ي'),
    antuma_f: 'لَنْ ' + mkG('ت', FATHA + 'ا'),
    antunna: 'لَنْ ' + mkS('ت', SUKUN + 'نَ'),
    ana: 'لَنْ ' + mkG('أ', FATHA),
    nahnu: 'لَنْ ' + mkG('ن', FATHA),
  };

  const majzum: Record<PronounKey, string> = {
    huwa: 'لَمْ ' + mkG('ي', FATHA),
    huma_m: 'لَمْ ' + mkG('ي', FATHA + 'ا'),
    hum: 'لَمْ ' + mkG('ي', DAMMA + 'وا'),
    hiya: 'لَمْ ' + mkG('ت', FATHA),
    huma_f: 'لَمْ ' + mkG('ت', FATHA + 'ا'),
    hunna: 'لَمْ ' + mkS('ي', SUKUN + 'نَ'),
    anta: 'لَمْ ' + mkG('ت', FATHA),
    antuma_m: 'لَمْ ' + mkG('ت', FATHA + 'ا'),
    antum: 'لَمْ ' + mkG('ت', DAMMA + 'وا'),
    anti: 'لَمْ ' + mkG('ت', KASRA + 'ي'),
    antuma_f: 'لَمْ ' + mkG('ت', FATHA + 'ا'),
    antunna: 'لَمْ ' + mkS('ت', SUKUN + 'نَ'),
    ana: 'لَمْ ' + mkG('أ', FATHA),
    nahnu: 'لَمْ ' + mkG('ن', FATHA),
  };

  const amr: Record<AmrPronounKey, string> = {
    anta: fixOrthography(mudhariGemInner + FATHA),
    antuma_m: fixOrthography(mudhariGemInner + FATHA + 'ا'),
    antum: fixOrthography(mudhariGemInner + DAMMA + 'وا'),
    anti: fixOrthography(mudhariGemInner + KASRA + 'ي'),
    antuma_f: fixOrthography(mudhariGemInner + FATHA + 'ا'),
    antunna: fixOrthography(amrPrefix + mudhariSplitInner + SUKUN + 'نَ'),
  };

  return { madhi, mudhari, mansub, majzum, amr };
}

const KASRA_HOLLOW_ROOTS = new Set([
  'خ-و-ف',
  'ن-و-م',
  'ن-ي-ل',
  'ك-و-د',
  'ه-ي-ب',
  'ز-و-ل',
  'م-و-ت',
  'ش-ي-ء',
  'ب-ي-ت',
  'ظ-ل-ل',
]);

export function conjugateVerb(verb: VerbEntry): ConjugationTable {
  const letters = getRootLetters(verb.root);
  const form: VerbForm = verb.form;
  const r1 = letters[0] || 'ف';
  const r2 = letters[1] || 'ع';
  const r3 = letters[2] || 'ل';
  const r4 = letters[3] || 'ل';

  const r1h = normalizeHamzaRoot(r1);
  const r2h = normalizeHamzaRoot(r2);
  const r3h = normalizeHamzaRoot(r3);

  const bareMadhi = stripHarakat(verb.madhi);
  const bareMudhari = stripHarakat(verb.mudhari);

  let madhi!: Record<PronounKey, string>;
  let mudhari!: Record<PronounKey, string>;
  let mansub!: Record<PronounKey, string>;
  let majzum!: Record<PronounKey, string>;
  let amr!: Record<AmrPronounKey, string>;

  // Quadriliterals QI - QIV
  if (form === 'QI' || verb.letters === 4 && form === 'I' as VerbForm) {
    const stem3ms = `${r1h}${FATHA}${r2h}${SUKUN}${r3h}${FATHA}${r4}${FATHA}`;
    madhi = buildMadhiSound(stem3ms, stem3ms);
    const mud = buildMudhariSound(`${r1h}${FATHA}${r2h}${SUKUN}${r3h}${KASRA}${r4}`, DAMMA);
    mudhari = mud.mudhari;
    mansub = mud.mansub;
    majzum = mud.majzum;
    amr = buildAmrFromStem(`${r1h}${FATHA}${r2h}${SUKUN}${r3h}${KASRA}${r4}`);
  } else if (form === 'QII') {
    const stem3ms = `ت${FATHA}${r1h}${FATHA}${r2h}${SUKUN}${r3h}${FATHA}${r4}${FATHA}`;
    madhi = buildMadhiSound(stem3ms, stem3ms);
    const mud = buildMudhariSound(`ت${FATHA}${r1h}${FATHA}${r2h}${SUKUN}${r3h}${FATHA}${r4}`, FATHA);
    mudhari = mud.mudhari;
    mansub = mud.mansub;
    majzum = mud.majzum;
    amr = buildAmrFromStem(`ت${FATHA}${r1h}${FATHA}${r2h}${SUKUN}${r3h}${FATHA}${r4}`);
  } else if (form === 'QIII') {
    const stem3ms = `ا${KASRA}${r1h}${SUKUN}${r2h}${FATHA}ن${SUKUN}${r3h}${FATHA}${r4}${FATHA}`;
    madhi = buildMadhiSound(stem3ms, stem3ms);
    const mud = buildMudhariSound(`${r1h}${SUKUN}${r2h}${FATHA}ن${SUKUN}${r3h}${KASRA}${r4}`, FATHA);
    mudhari = mud.mudhari;
    mansub = mud.mansub;
    majzum = mud.majzum;
    amr = buildAmrFromStem(`ا${KASRA}${r1h}${SUKUN}${r2h}${FATHA}ن${SUKUN}${r3h}${KASRA}${r4}`);
  } else if (form === 'QIV') {
    // اِفْعَلَلَّ / اِطْمَأَنَّ
    const d = buildDoubledVerb(
      `ا${KASRA}${r1h}${SUKUN}${r2h}${FATHA}${r3h}${FATHA}${r4}${SHADDA}`,
      `ا${KASRA}${r1h}${SUKUN}${r2h}${FATHA}${r3h}${FATHA}${r4}${FATHA}${r4}`,
      `${r1h}${SUKUN}${r2h}${FATHA}${r3h}${KASRA}${r4}${SHADDA}`,
      `${r1h}${SUKUN}${r2h}${FATHA}${r3h}${KASRA}${r4}${SUKUN}${r4}`,
      FATHA,
      'اِ'
    );
    madhi = d.madhi;
    mudhari = d.mudhari;
    mansub = d.mansub;
    majzum = d.majzum;
    amr = d.amr;
  } else if (form === 'I') {
    const isHollow =
      verb.verbType === 'hollow' ||
      ((r2 === 'و' || r2 === 'ي') && bareMadhi.length === 3 && bareMadhi[1] === 'ا');
    const isDefective =
      verb.verbType === 'defective' || r3 === 'و' || r3 === 'ي';
    const isDoubled =
      verb.verbType === 'doubled' || (r2 === r3 && bareMadhi.length === 2);
    const isAssimilated =
      verb.verbType === 'assimilated' || r1 === 'و' || r1 === 'ي';

    if (isDoubled) {
      const mudC2 = getVowelAfterConsonant(verb.mudhari, 1) || DAMMA;
      const c2v = mudC2 === KASRA ? KASRA : mudC2 === FATHA ? FATHA : DAMMA;
      const amrPfx = c2v === DAMMA ? 'اُ' : 'اِ';
      const d = buildDoubledVerb(
        `${r1h}${FATHA}${r2h}${SHADDA}`,
        `${r1h}${FATHA}${r2h}${FATHA}${r3h}`,
        `${r1h}${c2v}${r2h}${SHADDA}`,
        `${r1h}${SUKUN}${r2h}${c2v}${r3h}`,
        FATHA,
        amrPfx
      );
      madhi = d.madhi;
      mudhari = d.mudhari;
      mansub = d.mansub;
      majzum = d.majzum;
      amr = d.amr;
    } else if (isHollow && !isDefective) {
      const midMudChar = bareMudhari.length >= 3 ? bareMudhari[2] : '';
      let shortVowel = DAMMA;
      let longMid = 'و';
      if (midMudChar === 'ي') {
        longMid = 'ي';
        shortVowel = KASRA;
      } else if (midMudChar === 'ا') {
        longMid = 'ا';
        shortVowel = FATHA;
      }
      const madhiShortVowel =
        KASRA_HOLLOW_ROOTS.has(verb.root) || longMid === 'ي' || longMid === 'ا'
          ? KASRA
          : DAMMA;
      // Special check for مَاتَ يَمُوتُ -> مِتُّ / قَالَ يَقُولُ -> قُلْتُ
      const madhiShort = `${r1h}${madhiShortVowel}${r3h}`;
      const madhiLong = `${r1h}${FATHA}ا${r3h}`;
      madhi = buildHollowMadhi(madhiLong, madhiShort);

      const mudLong =
        longMid === 'و'
          ? `${r1h}${DAMMA}و${r3h}`
          : longMid === 'ي'
          ? `${r1h}${KASRA}ي${r3h}`
          : `${r1h}${FATHA}ا${r3h}`;
      const mudShort = `${r1h}${shortVowel}${r3h}`;
      const hm = buildHollowMudhari(mudLong, mudShort, FATHA, '');
      mudhari = hm.mudhari;
      mansub = hm.mansub;
      majzum = hm.majzum;
      amr = hm.amr;
    } else if (isDefective) {
      // Check Lafif Mafruq (r1 === 'و' and r3 weak, e.g. وَقَى يَقِي)
      const isLafifMafruq = (r1 === 'و' || r1 === 'ي') && bareMudhari.length === 2;
      const madhiEndType: 'alif' | 'maqsura' | 'iya' = bareMadhi.endsWith('ا')
        ? 'alif'
        : getVowelAfterConsonant(verb.madhi, 1) === KASRA
        ? 'iya'
        : 'maqsura';
      const madhiMidVowel = madhiEndType === 'iya' ? '' : '';
      const madhiBase = `${r1h}${FATHA}${r2h}${madhiMidVowel}`;
      madhi = buildDefectiveMadhi(madhiBase, madhiEndType);

      const mudEndType: 'u' | 'i' | 'a' = bareMudhari.endsWith('و')
        ? 'u'
        : bareMudhari.endsWith('ي')
        ? 'i'
        : 'a';

      if (isLafifMafruq) {
        const dm = buildDefectiveMudhari(`${r2h}`, FATHA, mudEndType, '');
        mudhari = dm.mudhari;
        mansub = dm.mansub;
        majzum = dm.majzum;
        amr = dm.amr;
      } else {
        const amrPfx = mudEndType === 'u' ? 'اُ' : 'اِ';
        const dm = buildDefectiveMudhari(`${r1h}${SUKUN}${r2h}`, FATHA, mudEndType, amrPfx);
        mudhari = dm.mudhari;
        mansub = dm.mansub;
        majzum = dm.majzum;
        amr = dm.amr;
      }
    } else {
      // Sound, Assimilated, Hamzated Form I
      const madhiV2 = getVowelAfterConsonant(verb.madhi, 1) || FATHA;
      const dropsWaw = isAssimilated && r1 === 'و' && !bareMudhari.slice(1).startsWith('و');
      const mudV2 =
        getVowelAfterConsonant(verb.mudhari, dropsWaw ? 1 : 2) ||
        (madhiV2 === KASRA ? FATHA : madhiV2 === DAMMA ? DAMMA : FATHA);

      const stem3ms = `${r1h}${FATHA}${r2h}${madhiV2}${r3h}${FATHA}`;
      madhi = buildMadhiSound(stem3ms, stem3ms);

      if (dropsWaw) {
        const mud = buildMudhariSound(`${r2h}${mudV2}${r3h}`, FATHA);
        mudhari = mud.mudhari;
        mansub = mud.mansub;
        majzum = mud.majzum;
        amr = buildAmrFromStem(`${r2h}${mudV2}${r3h}`);
      } else {
        const mud = buildMudhariSound(`${r1h}${SUKUN}${r2h}${mudV2}${r3h}`, FATHA);
        mudhari = mud.mudhari;
        mansub = mud.mansub;
        majzum = mud.majzum;
        const amrPrefix = mudV2 === DAMMA ? 'اُ' : 'اِ';
        amr = buildAmrFromStem(`${amrPrefix}${r1h}${SUKUN}${r2h}${mudV2}${r3h}`);
      }
    }
  } else {
    // Derived Forms II - X
    const isHollow = verb.verbType === 'hollow' || ((r2 === 'و' || r2 === 'ي') && (form === 'IV' || form === 'VII' || form === 'VIII' || form === 'X') && bareMadhi.includes('ا'));
    const isDefective = verb.verbType === 'defective' || r3 === 'و' || r3 === 'ي';
    const isDoubled = verb.verbType === 'doubled' || (r2 === r3 && (form === 'IV' || form === 'VII' || form === 'VIII' || form === 'X') && verb.madhi.includes(SHADDA));

    if (form === 'II') {
      if (isDefective) {
        madhi = buildDefectiveMadhi(`${r1h}${FATHA}${r2h}${SHADDA}`, 'maqsura');
        const dm = buildDefectiveMudhari(`${r1h}${FATHA}${r2h}${SHADDA}`, DAMMA, 'i', '');
        mudhari = dm.mudhari; mansub = dm.mansub; majzum = dm.majzum; amr = dm.amr;
      } else {
        const stem = `${r1h}${FATHA}${r2h}${SHADDA}${FATHA}${r3h}${FATHA}`;
        madhi = buildMadhiSound(stem, stem);
        const mud = buildMudhariSound(`${r1h}${FATHA}${r2h}${SHADDA}${KASRA}${r3h}`, DAMMA);
        mudhari = mud.mudhari; mansub = mud.mansub; majzum = mud.majzum;
        amr = buildAmrFromStem(`${r1h}${FATHA}${r2h}${SHADDA}${KASRA}${r3h}`);
      }
    } else if (form === 'III') {
      if (isDefective) {
        madhi = buildDefectiveMadhi(`${r1h}${FATHA}ا${r2h}`, 'maqsura');
        const dm = buildDefectiveMudhari(`${r1h}${FATHA}ا${r2h}`, DAMMA, 'i', '');
        mudhari = dm.mudhari; mansub = dm.mansub; majzum = dm.majzum; amr = dm.amr;
      } else {
        const stem = `${r1h}${FATHA}ا${r2h}${FATHA}${r3h}${FATHA}`;
        madhi = buildMadhiSound(stem, stem);
        const mud = buildMudhariSound(`${r1h}${FATHA}ا${r2h}${KASRA}${r3h}`, DAMMA);
        mudhari = mud.mudhari; mansub = mud.mansub; majzum = mud.majzum;
        amr = buildAmrFromStem(`${r1h}${FATHA}ا${r2h}${KASRA}${r3h}`);
      }
    } else if (form === 'IV') {
      if (isDoubled) {
        const d = buildDoubledVerb(
          `أ${FATHA}${r1h}${FATHA}${r2h}${SHADDA}`,
          `أ${FATHA}${r1h}${SUKUN}${r2h}${FATHA}${r3h}`,
          `${r1h}${KASRA}${r2h}${SHADDA}`,
          `${r1h}${SUKUN}${r2h}${KASRA}${r3h}`,
          DAMMA,
          `أ${FATHA}`
        );
        madhi = d.madhi; mudhari = d.mudhari; mansub = d.mansub; majzum = d.majzum; amr = d.amr;
      } else if (isHollow) {
        madhi = buildHollowMadhi(`أ${FATHA}${r1h}${FATHA}ا${r3h}`, `أ${FATHA}${r1h}${FATHA}${r3h}`);
        const hm = buildHollowMudhari(`${r1h}${KASRA}ي${r3h}`, `${r1h}${KASRA}${r3h}`, DAMMA, `أ${FATHA}`);
        mudhari = hm.mudhari; mansub = hm.mansub; majzum = hm.majzum; amr = hm.amr;
      } else if (isDefective) {
        madhi = buildDefectiveMadhi(`أ${FATHA}${r1h}${SUKUN}${r2h}`, 'maqsura');
        const dm = buildDefectiveMudhari(`${r1h}${SUKUN}${r2h}`, DAMMA, 'i', `أ${FATHA}`);
        mudhari = dm.mudhari; mansub = dm.mansub; majzum = dm.majzum; amr = dm.amr;
      } else {
        const stem = `أ${FATHA}${r1h}${SUKUN}${r2h}${FATHA}${r3h}${FATHA}`;
        madhi = buildMadhiSound(stem, stem);
        const mud = buildMudhariSound(`${r1h}${SUKUN}${r2h}${KASRA}${r3h}`, DAMMA);
        mudhari = mud.mudhari; mansub = mud.mansub; majzum = mud.majzum;
        amr = buildAmrFromStem(`أ${FATHA}${r1h}${SUKUN}${r2h}${KASRA}${r3h}`);
      }
    } else if (form === 'V') {
      if (isDefective) {
        madhi = buildDefectiveMadhi(`ت${FATHA}${r1h}${FATHA}${r2h}${SHADDA}`, 'maqsura');
        const dm = buildDefectiveMudhari(`ت${FATHA}${r1h}${FATHA}${r2h}${SHADDA}`, FATHA, 'a', '');
        mudhari = dm.mudhari; mansub = dm.mansub; majzum = dm.majzum; amr = dm.amr;
      } else {
        const stem = `ت${FATHA}${r1h}${FATHA}${r2h}${SHADDA}${FATHA}${r3h}${FATHA}`;
        madhi = buildMadhiSound(stem, stem);
        const mud = buildMudhariSound(`ت${FATHA}${r1h}${FATHA}${r2h}${SHADDA}${FATHA}${r3h}`, FATHA);
        mudhari = mud.mudhari; mansub = mud.mansub; majzum = mud.majzum;
        amr = buildAmrFromStem(`ت${FATHA}${r1h}${FATHA}${r2h}${SHADDA}${FATHA}${r3h}`);
      }
    } else if (form === 'VI') {
      if (isDefective) {
        madhi = buildDefectiveMadhi(`ت${FATHA}${r1h}${FATHA}ا${r2h}`, 'maqsura');
        const dm = buildDefectiveMudhari(`ت${FATHA}${r1h}${FATHA}ا${r2h}`, FATHA, 'a', '');
        mudhari = dm.mudhari; mansub = dm.mansub; majzum = dm.majzum; amr = dm.amr;
      } else {
        const stem = `ت${FATHA}${r1h}${FATHA}ا${r2h}${FATHA}${r3h}${FATHA}`;
        madhi = buildMadhiSound(stem, stem);
        const mud = buildMudhariSound(`ت${FATHA}${r1h}${FATHA}ا${r2h}${FATHA}${r3h}`, FATHA);
        mudhari = mud.mudhari; mansub = mud.mansub; majzum = mud.majzum;
        amr = buildAmrFromStem(`ت${FATHA}${r1h}${FATHA}ا${r2h}${FATHA}${r3h}`);
      }
    } else if (form === 'VII') {
      if (isDoubled) {
        const d = buildDoubledVerb(
          `ا${KASRA}ن${SUKUN}${r1h}${FATHA}${r2h}${SHADDA}`,
          `ا${KASRA}ن${SUKUN}${r1h}${FATHA}${r2h}${FATHA}${r3h}`,
          `ن${SUKUN}${r1h}${FATHA}${r2h}${SHADDA}`,
          `ن${SUKUN}${r1h}${FATHA}${r2h}${KASRA}${r3h}`,
          FATHA,
          'اِ'
        );
        madhi = d.madhi; mudhari = d.mudhari; mansub = d.mansub; majzum = d.majzum; amr = d.amr;
      } else if (isHollow) {
        madhi = buildHollowMadhi(`ا${KASRA}ن${SUKUN}${r1h}${FATHA}ا${r3h}`, `ا${KASRA}ن${SUKUN}${r1h}${FATHA}${r3h}`);
        const hm = buildHollowMudhari(`ن${SUKUN}${r1h}${FATHA}ا${r3h}`, `ن${SUKUN}${r1h}${FATHA}${r3h}`, FATHA, 'اِ');
        mudhari = hm.mudhari; mansub = hm.mansub; majzum = hm.majzum; amr = hm.amr;
      } else if (isDefective) {
        madhi = buildDefectiveMadhi(`ا${KASRA}ن${SUKUN}${r1h}${FATHA}${r2h}`, 'maqsura');
        const dm = buildDefectiveMudhari(`ن${SUKUN}${r1h}${FATHA}${r2h}`, FATHA, 'i', 'اِ');
        mudhari = dm.mudhari; mansub = dm.mansub; majzum = dm.majzum; amr = dm.amr;
      } else {
        const stem = `ا${KASRA}ن${SUKUN}${r1h}${FATHA}${r2h}${FATHA}${r3h}${FATHA}`;
        madhi = buildMadhiSound(stem, stem);
        const mud = buildMudhariSound(`ن${SUKUN}${r1h}${FATHA}${r2h}${KASRA}${r3h}`, FATHA);
        mudhari = mud.mudhari; mansub = mud.mansub; majzum = mud.majzum;
        amr = buildAmrFromStem(`ا${KASRA}ن${SUKUN}${r1h}${FATHA}${r2h}${KASRA}${r3h}`);
      }
    } else if (form === 'VIII') {
      const f8 = getForm8Consonants(r1h);
      const midPart = f8.infix ? `${f8.r1Out}${SUKUN}${f8.infix}` : `${f8.r1Out}`;
      if (isDoubled) {
        const d = buildDoubledVerb(
          `${f8.prefix}${midPart}${FATHA}${r2h}${SHADDA}`,
          `${f8.prefix}${midPart}${FATHA}${r2h}${FATHA}${r3h}`,
          `${midPart}${FATHA}${r2h}${SHADDA}`,
          `${midPart}${FATHA}${r2h}${KASRA}${r3h}`,
          FATHA,
          'اِ'
        );
        madhi = d.madhi; mudhari = d.mudhari; mansub = d.mansub; majzum = d.majzum; amr = d.amr;
      } else if (isHollow) {
        madhi = buildHollowMadhi(`${f8.prefix}${midPart}${FATHA}ا${r3h}`, `${f8.prefix}${midPart}${FATHA}${r3h}`);
        const hm = buildHollowMudhari(`${midPart}${FATHA}ا${r3h}`, `${midPart}${FATHA}${r3h}`, FATHA, 'اِ');
        mudhari = hm.mudhari; mansub = hm.mansub; majzum = hm.majzum; amr = hm.amr;
      } else if (isDefective) {
        madhi = buildDefectiveMadhi(`${f8.prefix}${midPart}${FATHA}${r2h}`, 'maqsura');
        const dm = buildDefectiveMudhari(`${midPart}${FATHA}${r2h}`, FATHA, 'i', 'اِ');
        mudhari = dm.mudhari; mansub = dm.mansub; majzum = dm.majzum; amr = dm.amr;
      } else {
        const stem = `${f8.prefix}${midPart}${FATHA}${r2h}${FATHA}${r3h}${FATHA}`;
        madhi = buildMadhiSound(stem, stem);
        const mud = buildMudhariSound(`${midPart}${FATHA}${r2h}${KASRA}${r3h}`, FATHA);
        mudhari = mud.mudhari; mansub = mud.mansub; majzum = mud.majzum;
        amr = buildAmrFromStem(`${f8.prefix}${midPart}${FATHA}${r2h}${KASRA}${r3h}`);
      }
    } else if (form === 'IX') {
      const d = buildDoubledVerb(
        `ا${KASRA}${r1h}${SUKUN}${r2h}${FATHA}${r3h}${SHADDA}`,
        `ا${KASRA}${r1h}${SUKUN}${r2h}${FATHA}${r3h}${FATHA}${r3h}`,
        `${r1h}${SUKUN}${r2h}${FATHA}${r3h}${SHADDA}`,
        `${r1h}${SUKUN}${r2h}${FATHA}${r3h}${KASRA}${r3h}`,
        FATHA,
        'اِ'
      );
      madhi = d.madhi; mudhari = d.mudhari; mansub = d.mansub; majzum = d.majzum; amr = d.amr;
    } else {
      // Form X: اِسْتَفْعَلَ
      if (isDoubled) {
        const d = buildDoubledVerb(
          `ا${KASRA}س${SUKUN}ت${FATHA}${r1h}${FATHA}${r2h}${SHADDA}`,
          `ا${KASRA}س${SUKUN}ت${FATHA}${r1h}${SUKUN}${r2h}${FATHA}${r3h}`,
          `س${SUKUN}ت${FATHA}${r1h}${KASRA}${r2h}${SHADDA}`,
          `س${SUKUN}ت${FATHA}${r1h}${SUKUN}${r2h}${KASRA}${r3h}`,
          FATHA,
          'اِ'
        );
        madhi = d.madhi; mudhari = d.mudhari; mansub = d.mansub; majzum = d.majzum; amr = d.amr;
      } else if (isHollow) {
        madhi = buildHollowMadhi(`ا${KASRA}س${SUKUN}ت${FATHA}${r1h}${FATHA}ا${r3h}`, `ا${KASRA}س${SUKUN}ت${FATHA}${r1h}${FATHA}${r3h}`);
        const hm = buildHollowMudhari(`س${SUKUN}ت${FATHA}${r1h}${KASRA}ي${r3h}`, `س${SUKUN}ت${FATHA}${r1h}${KASRA}${r3h}`, FATHA, 'اِ');
        mudhari = hm.mudhari; mansub = hm.mansub; majzum = hm.majzum; amr = hm.amr;
      } else if (isDefective) {
        madhi = buildDefectiveMadhi(`ا${KASRA}س${SUKUN}ت${FATHA}${r1h}${SUKUN}${r2h}`, 'maqsura');
        const dm = buildDefectiveMudhari(`س${SUKUN}ت${FATHA}${r1h}${SUKUN}${r2h}`, FATHA, 'i', 'اِ');
        mudhari = dm.mudhari; mansub = dm.mansub; majzum = dm.majzum; amr = dm.amr;
      } else {
        const stem = `ا${KASRA}س${SUKUN}ت${FATHA}${r1h}${SUKUN}${r2h}${FATHA}${r3h}${FATHA}`;
        madhi = buildMadhiSound(stem, stem);
        const mud = buildMudhariSound(`س${SUKUN}ت${FATHA}${r1h}${SUKUN}${r2h}${KASRA}${r3h}`, FATHA);
        mudhari = mud.mudhari; mansub = mud.mansub; majzum = mud.majzum;
        amr = buildAmrFromStem(`ا${KASRA}س${SUKUN}ت${FATHA}${r1h}${SUKUN}${r2h}${KASRA}${r3h}`);
      }
    }
  }

  // Apply classical irregular overrides by root + form
  const key = `${verb.root}:${form}`;
  if (key === 'أ-ك-ل:I') {
    amr = { anta: 'كُلْ', antuma_m: 'كُلَا', antum: 'كُلُوا', anti: 'كُلِي', antuma_f: 'كُلَا', antunna: 'كُلْنَ' };
  } else if (key === 'أ-خ-ذ:I') {
    amr = { anta: 'خُذْ', antuma_m: 'خُذَا', antum: 'خُذُوا', anti: 'خُذِي', antuma_f: 'خُذَا', antunna: 'خُذْنَ' };
  } else if (key === 'أ-م-ر:I') {
    amr = { anta: 'مُرْ', antuma_m: 'مُرَا', antum: 'مُرُوا', anti: 'مُرِي', antuma_f: 'مُرَا', antunna: 'مُرْنَ' };
  } else if (key === 'ر-أ-ي:I') {
    const dm = buildDefectiveMudhari(`ر`, FATHA, 'a', '');
    mudhari = dm.mudhari;
    mansub = dm.mansub;
    majzum = dm.majzum;
    amr = { anta: 'رَ', antuma_m: 'رَيَا', antum: 'رَوْا', anti: 'رَيْ', antuma_f: 'رَيَا', antunna: 'رَيْنَ' };
  } else if (key === 'ج-ي-ء:I') {
    madhi = buildHollowMadhi('جَاء', 'جِئ');
    const hm = buildHollowMudhari('جِيء', 'جِئ', FATHA, '');
    mudhari = hm.mudhari; mansub = hm.mansub; majzum = hm.majzum; amr = hm.amr;
  } else if (key === 'ش-ي-ء:I') {
    madhi = buildHollowMadhi('شَاء', 'شِئ');
    const hm = buildHollowMudhari('شَاء', 'شَأ', FATHA, '');
    mudhari = hm.mudhari; mansub = hm.mansub; majzum = hm.majzum; amr = hm.amr;
  }

  let nahy = buildNahyFromMajzum(majzum);

  // Merge stored overrides on the verb entry if provided
  if (verb.overrides) {
    if (verb.overrides.madhi) madhi = { ...madhi, ...verb.overrides.madhi };
    if (verb.overrides.mudhari) mudhari = { ...mudhari, ...verb.overrides.mudhari };
    if (verb.overrides.mansub) mansub = { ...mansub, ...verb.overrides.mansub };
    if (verb.overrides.majzum) majzum = { ...majzum, ...verb.overrides.majzum };
    if (verb.overrides.amr) amr = { ...amr, ...verb.overrides.amr };
    if (verb.overrides.nahy) nahy = { ...nahy, ...verb.overrides.nahy };
  }

  // Ensure 3ms madhi / mudhari / 2ms amr align with seed canonical entry if provided
  if (verb.madhi) madhi.huwa = verb.madhi;
  if (verb.mudhari) mudhari.huwa = verb.mudhari;
  if (verb.amr) amr.anta = verb.amr;
  if (verb.nahy) nahy.anta = verb.nahy;

  return {
    madhi,
    mudhari,
    mansub,
    majzum,
    amr,
    nahy,
    derived: {
      masdar: verb.masdar,
      ismFail: verb.ismFail,
      ismMaful: verb.ismMaful,
      ismZamanMakan: verb.ismZamanMakan,
      ismAlah: verb.ismAlah,
    },
  };
}
