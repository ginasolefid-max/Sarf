import {
  ConjugatedCell,
  ConjugationCategory,
  DerivedNounResult,
  FormIBab,
  PronounKey,
  TasreefOutput,
  TrilingualText,
  VerbClassification,
  VerbEntry,
  VerbForm,
  VerbTransitivity,
} from '../types/arabic';
import { VERBS_DATABASE } from '../data/verbsDatabase';

export interface PronounMeta {
  key: PronounKey;
  ar: string;
  labelEn: string;
  labelTl: string;
  person: '3rd' | '2nd' | '1st';
  gender: 'M' | 'F' | 'M/F';
  number: 'Singular' | 'Dual' | 'Plural';
  meaningPrefixEn: string;
  meaningPrefixTl: string;
}

export const PRONOUNS: PronounMeta[] = [
  { key: 'huwa', ar: 'هُوَ', labelEn: 'He (3ms)', labelTl: 'Siya (L)', person: '3rd', gender: 'M', number: 'Singular', meaningPrefixEn: 'he', meaningPrefixTl: 'siya (L)' },
  { key: 'huma_m', ar: 'هُمَا (مذ)', labelEn: 'They two (3md)', labelTl: 'Silang dalawa (L)', person: '3rd', gender: 'M', number: 'Dual', meaningPrefixEn: 'they (2m)', meaningPrefixTl: 'silang dalawa (L)' },
  { key: 'hum', ar: 'هُمْ', labelEn: 'They (3mp)', labelTl: 'Sila (L)', person: '3rd', gender: 'M', number: 'Plural', meaningPrefixEn: 'they (m)', meaningPrefixTl: 'sila (L)' },
  { key: 'hiya', ar: 'هِيَ', labelEn: 'She (3fs)', labelTl: 'Siya (B)', person: '3rd', gender: 'F', number: 'Singular', meaningPrefixEn: 'she', meaningPrefixTl: 'siya (B)' },
  { key: 'huma_f', ar: 'هُمَا (مؤ)', labelEn: 'They two (3fd)', labelTl: 'Silang dalawa (B)', person: '3rd', gender: 'F', number: 'Dual', meaningPrefixEn: 'they (2f)', meaningPrefixTl: 'silang dalawa (B)' },
  { key: 'hunna', ar: 'هُنَّ', labelEn: 'They (3fp)', labelTl: 'Sila (B)', person: '3rd', gender: 'F', number: 'Plural', meaningPrefixEn: 'they (f)', meaningPrefixTl: 'sila (B)' },
  { key: 'anta', ar: 'أَنْتَ', labelEn: 'You (2ms)', labelTl: 'Ikaw (L)', person: '2nd', gender: 'M', number: 'Singular', meaningPrefixEn: 'you (m)', meaningPrefixTl: 'ikaw (L)' },
  { key: 'antuma_m', ar: 'أَنْتُمَا (مذ)', labelEn: 'You two (2md)', labelTl: 'Kayong dalawa (L)', person: '2nd', gender: 'M', number: 'Dual', meaningPrefixEn: 'you (2m)', meaningPrefixTl: 'kayong dalawa' },
  { key: 'antum', ar: 'أَنْتُمْ', labelEn: 'You all (2mp)', labelTl: 'Kayo (L)', person: '2nd', gender: 'M', number: 'Plural', meaningPrefixEn: 'you (mp)', meaningPrefixTl: 'kayo (L)' },
  { key: 'anti', ar: 'أَنْتِ', labelEn: 'You (2fs)', labelTl: 'Ikaw (B)', person: '2nd', gender: 'F', number: 'Singular', meaningPrefixEn: 'you (f)', meaningPrefixTl: 'ikaw (B)' },
  { key: 'antuma_f', ar: 'أَنْتُمَا (مؤ)', labelEn: 'You two (2fd)', labelTl: 'Kayong dalawa (B)', person: '2nd', gender: 'F', number: 'Dual', meaningPrefixEn: 'you (2f)', meaningPrefixTl: 'kayong dalawa (B)' },
  { key: 'antunna', ar: 'أَنْتُنَّ', labelEn: 'You all (2fp)', labelTl: 'Kayo (B)', person: '2nd', gender: 'F', number: 'Plural', meaningPrefixEn: 'you (fp)', meaningPrefixTl: 'kayo (B)' },
  { key: 'ana', ar: 'أَنَا', labelEn: 'I (1s)', labelTl: 'Ako', person: '1st', gender: 'M/F', number: 'Singular', meaningPrefixEn: 'I', meaningPrefixTl: 'ako' },
  { key: 'nahnu', ar: 'نَحْنُ', labelEn: 'We (1p)', labelTl: 'Kami / Tayo', person: '1st', gender: 'M/F', number: 'Plural', meaningPrefixEn: 'we', meaningPrefixTl: 'kami' },
];

const FATHA = '\u064E';
const DAMMA = '\u064F';
const KASRA = '\u0650';
const SUKUN = '\u0652';
const SHADDA = '\u0651';
const FATHATAN = '\u064B';
const DAMMATAN = '\u064C';

export function stripDiacritics(input: string): string {
  return input.replace(/[\u064B-\u065F\u0670]/g, '');
}

export function transliterateArabic(word: string): string {
  if (!word || word === '—') return '—';
  const map: Record<string, string> = {
    'ا': 'a', 'أ': "'a", 'إ': "'i", 'آ': "'aa", 'ؤ': "'", 'ئ': "'", 'ء': "'",
    'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'ḥ', 'خ': 'kh',
    'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh',
    'ص': 'ṣ', 'ض': 'ḍ', 'ط': 'ṭ', 'ظ': 'ẓ', 'ع': "'", 'غ': 'gh',
    'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
    'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'a', 'ة': 'h',
    '\u064E': 'a', '\u064F': 'u', '\u0650': 'i',
    '\u064B': 'an', '\u064C': 'un', '\u064D': 'in',
    '\u0652': '', '\u0651': '',
  };

  let out = '';
  const chars = Array.from(word);
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (c === SHADDA) {
      // double previous consonant if possible
      const prev = out.slice(-1);
      if (prev && !'aui'.includes(prev)) out += prev;
      continue;
    }
    if (c === 'ا' && i > 0 && chars[i - 1] === FATHA) {
      out += 'a';
      continue;
    }
    if (c === 'و' && i > 0 && chars[i - 1] === DAMMA) {
      out += 'u';
      continue;
    }
    if (c === 'ي' && i > 0 && chars[i - 1] === KASRA) {
      out += 'i';
      continue;
    }
    if ((c === 'أ' || c === 'إ') && i === 0) {
      out += "'";
      continue;
    }
    out += map[c] ?? c;
  }
  return out
    .replace(/aa+/g, 'ā')
    .replace(/uu+/g, 'ū')
    .replace(/ii+/g, 'ī')
    .replace(/^\s+|\s+$/g, '');
}

/**
 * Determine Hamza seat for a given vowel context
 */
function hamzaForVowel(char: string, vowel: string, prevVowel?: string): string {
  if (char !== 'أ' && char !== 'ء' && char !== 'ؤ' && char !== 'ئ') return char;
  if (vowel === KASRA || prevVowel === KASRA) return 'ئ';
  if (vowel === DAMMA || prevVowel === DAMMA) return 'ؤ';
  if (vowel === FATHA || prevVowel === FATHA) return 'أ';
  return 'ء';
}

function getBabVowels(bab: FormIBab = 'فَعَلَ يَفْعُلُ'): { past2: string; pres2: string } {
  switch (bab) {
    case 'فَعَلَ يَفْعُلُ': return { past2: FATHA, pres2: DAMMA };
    case 'فَعَلَ يَفْعِلُ': return { past2: FATHA, pres2: KASRA };
    case 'فَعَلَ يَفْعَلُ': return { past2: FATHA, pres2: FATHA };
    case 'فَعِلَ يَفْعَلُ': return { past2: KASRA, pres2: FATHA };
    case 'فَعِلَ يَفْعِلُ': return { past2: KASRA, pres2: KASRA };
    case 'فَعُلَ يَفْعُلُ': return { past2: DAMMA, pres2: DAMMA };
    default: return { past2: FATHA, pres2: DAMMA };
  }
}

export function detectClassification(radicals: string[]): VerbClassification {
  if (radicals.length < 3) return 'sound';
  const [f, a, l] = radicals;
  const isWeak = (c: string) => c === 'و' || c === 'ي' || c === 'ا' || c === 'ى';
  if (isWeak(f) && isWeak(l)) return 'lafif_mafruq';
  if (isWeak(a) && isWeak(l)) return 'lafif_maqrun';
  if (f === 'و') return 'mithal_wawi';
  if (f === 'ي') return 'mithal_yayi';
  if (a === 'و') return 'ajwaf_wawi';
  if (a === 'ي') return 'ajwaf_yayi';
  if (l === 'و') return 'naqis_wawi';
  if (l === 'ي' || l === 'ى') return 'naqis_yayi';
  if (a === l) return 'mudaaf';
  if (f === 'أ' || f === 'ء') return 'mahmuz_fa';
  if (a === 'أ' || a === 'ء') return 'mahmuz_ayn';
  if (l === 'أ' || l === 'ء') return 'mahmuz_lam';
  return 'sound';
}

const MADHI_SUFFIXES: Record<PronounKey, { suf: string; consonantInitial: boolean }> = {
  huwa: { suf: FATHA, consonantInitial: false },
  huma_m: { suf: FATHA + 'ا', consonantInitial: false },
  hum: { suf: DAMMA + 'وا', consonantInitial: false },
  hiya: { suf: FATHA + 'ت' + SUKUN, consonantInitial: false },
  huma_f: { suf: FATHA + 'تَا', consonantInitial: false },
  hunna: { suf: SUKUN + 'ن' + FATHA, consonantInitial: true },
  anta: { suf: SUKUN + 'ت' + FATHA, consonantInitial: true },
  antuma_m: { suf: SUKUN + 'تُمَا', consonantInitial: true },
  antum: { suf: SUKUN + 'تُمْ', consonantInitial: true },
  anti: { suf: SUKUN + 'ت' + KASRA, consonantInitial: true },
  antuma_f: { suf: SUKUN + 'تُمَا', consonantInitial: true },
  antunna: { suf: SUKUN + 'تُنَّ', consonantInitial: true },
  ana: { suf: SUKUN + 'ت' + DAMMA, consonantInitial: true },
  nahnu: { suf: SUKUN + 'نَا', consonantInitial: true },
};

const MUDHARI_AFFIXES: Record<
  PronounKey,
  { pre: string; sufMarfu: string; sufMansub: string; sufMajzum: string; pluralFem: boolean; needsShorteningInSukun: boolean }
> = {
  huwa: { pre: 'ي', sufMarfu: DAMMA, sufMansub: FATHA, sufMajzum: SUKUN, pluralFem: false, needsShorteningInSukun: true },
  huma_m: { pre: 'ي', sufMarfu: FATHA + 'انِ', sufMansub: FATHA + 'ا', sufMajzum: FATHA + 'ا', pluralFem: false, needsShorteningInSukun: false },
  hum: { pre: 'ي', sufMarfu: DAMMA + 'ونَ', sufMansub: DAMMA + 'وا', sufMajzum: DAMMA + 'وا', pluralFem: false, needsShorteningInSukun: false },
  hiya: { pre: 'ت', sufMarfu: DAMMA, sufMansub: FATHA, sufMajzum: SUKUN, pluralFem: false, needsShorteningInSukun: true },
  huma_f: { pre: 'ت', sufMarfu: FATHA + 'انِ', sufMansub: FATHA + 'ا', sufMajzum: FATHA + 'ا', pluralFem: false, needsShorteningInSukun: false },
  hunna: { pre: 'ي', sufMarfu: SUKUN + 'نَ', sufMansub: SUKUN + 'نَ', sufMajzum: SUKUN + 'نَ', pluralFem: true, needsShorteningInSukun: true },
  anta: { pre: 'ت', sufMarfu: DAMMA, sufMansub: FATHA, sufMajzum: SUKUN, pluralFem: false, needsShorteningInSukun: true },
  antuma_m: { pre: 'ت', sufMarfu: FATHA + 'انِ', sufMansub: FATHA + 'ا', sufMajzum: FATHA + 'ا', pluralFem: false, needsShorteningInSukun: false },
  antum: { pre: 'ت', sufMarfu: DAMMA + 'ونَ', sufMansub: DAMMA + 'وا', sufMajzum: DAMMA + 'وا', pluralFem: false, needsShorteningInSukun: false },
  anti: { pre: 'ت', sufMarfu: KASRA + 'ينَ', sufMansub: KASRA + 'ي', sufMajzum: KASRA + 'ي', pluralFem: false, needsShorteningInSukun: false },
  antuma_f: { pre: 'ت', sufMarfu: FATHA + 'انِ', sufMansub: FATHA + 'ا', sufMajzum: FATHA + 'ا', pluralFem: false, needsShorteningInSukun: false },
  antunna: { pre: 'ت', sufMarfu: SUKUN + 'نَ', sufMansub: SUKUN + 'نَ', sufMajzum: SUKUN + 'نَ', pluralFem: true, needsShorteningInSukun: true },
  ana: { pre: 'أ', sufMarfu: DAMMA, sufMansub: FATHA, sufMajzum: SUKUN, pluralFem: false, needsShorteningInSukun: true },
  nahnu: { pre: 'ن', sufMarfu: DAMMA, sufMansub: FATHA, sufMajzum: SUKUN, pluralFem: false, needsShorteningInSukun: true },
};

const SECOND_PERSON_KEYS: PronounKey[] = ['anta', 'antuma_m', 'antum', 'anti', 'antuma_f', 'antunna'];

function isGuttural(c: string): boolean {
  return ['ء', 'أ', 'ه', 'ع', 'ح', 'غ', 'خ'].includes(c);
}

/**
 * Core morphological conjugation builder for a single pronoun & category
 */
function conjugateFormI(
  verb: VerbEntry,
  p: PronounMeta,
  category: ConjugationCategory
): { arabic: string; ruleNote: string; applicable: boolean } {
  const [f, a, l] = verb.radicals;
  const cls = verb.classification;
  const bab = verb.bab ?? 'فَعَلَ يَفْعُلُ';
  const { past2, pres2 } = getBabVowels(bab);
  const key = p.key;

  if ((category === 'amr' || category === 'nahy') && !SECOND_PERSON_KEYS.includes(key)) {
    return { arabic: '—', ruleNote: 'Imperative/Prohibitive applies only to 2nd person', applicable: false };
  }

  if ((category === 'passive_madhi' || category === 'passive_mudhari') && verb.transitivity === 'lazim') {
    // Intransitive verbs cannot take direct passive without preposition
    return {
      arabic: '—',
      ruleNote: 'Intransitive (لازم): passive requires prepositional complement (المبني للمجهول بالجار والمجرور)',
      applicable: false,
    };
  }

  // 1. MITHAL (Assimilated: ف = و / ي)
  if (cls === 'mithal_wawi' || cls === 'mithal_yayi') {
    const dropWaw = cls === 'mithal_wawi' && (pres2 === KASRA || (pres2 === FATHA && isGuttural(l)));
    if (category === 'madhi') {
      return {
        arabic: f + FATHA + a + past2 + l + MADHI_SUFFIXES[key].suf,
        ruleNote: 'المثال يصح في الماضي كالسالم تمامًا',
        applicable: true,
      };
    }
    if (category === 'passive_madhi') {
      return {
        arabic: f + DAMMA + a + KASRA + l + MADHI_SUFFIXES[key].suf,
        ruleNote: 'المبني للمجهول في الماضي على وزن فُعِلَ',
        applicable: true,
      };
    }
    if (category === 'mudhari' || category === 'mansub' || category === 'majzum') {
      const aff = MUDHARI_AFFIXES[key];
      const suf = category === 'mudhari' ? aff.sufMarfu : category === 'mansub' ? aff.sufMansub : aff.sufMajzum;
      const stem = dropWaw ? a + pres2 + l : f + SUKUN + a + pres2 + l;
      return {
        arabic: aff.pre + FATHA + stem + suf,
        ruleNote: dropWaw
          ? 'حُذفت الواو لوقوعها بين الياء والكسرة (أو الفتحة العارضة لحرف الحلق)'
          : 'ثبتت فاء الكلمة لعدم وجود كسرة تحذفها',
        applicable: true,
      };
    }
    if (category === 'passive_mudhari') {
      const aff = MUDHARI_AFFIXES[key];
      return {
        arabic: aff.pre + DAMMA + f + SUKUN + a + FATHA + l + aff.sufMarfu,
        ruleNote: 'تعود الواو في المضارع المجهول لزوال الكسرة (يُوعَدُ)',
        applicable: true,
      };
    }
    if (category === 'amr') {
      const aff = MUDHARI_AFFIXES[key];
      const amrSuf = key === 'anta' ? SUKUN : key === 'antunna' ? SUKUN + 'نَ' : aff.sufMajzum;
      if (dropWaw) {
        return {
          arabic: a + pres2 + l + amrSuf,
          ruleNote: 'الأمر من المثال الواوي تُحذف منه الواو وهمزة الوصل لتحرك ما بعدها (عِدْ)',
          applicable: true,
        };
      }
      const wasl = pres2 === DAMMA ? 'اُ' : 'اِ';
      return {
        arabic: wasl + f + SUKUN + a + pres2 + l + amrSuf,
        ruleNote: 'الأمر من المثال اليائي أو غير المحذوف الفاء تُزاد له همزة وصل',
        applicable: true,
      };
    }
    if (category === 'nahy') {
      const aff = MUDHARI_AFFIXES[key];
      const stem = dropWaw ? a + pres2 + l : f + SUKUN + a + pres2 + l;
      return {
        arabic: 'لَا ' + aff.pre + FATHA + stem + aff.sufMajzum,
        ruleNote: 'النهي: لا الناهية + المضارع المجزوم',
        applicable: true,
      };
    }
  }

  // 2. AJWAF (Hollow: ع = و / ي)
  if (cls === 'ajwaf_wawi' || cls === 'ajwaf_yayi') {
    const isWawi = cls === 'ajwaf_wawi';
    const medialChar = isWawi ? 'و' : 'ي';
    const shortVowelOnF =
      past2 === KASRA ? KASRA : isWawi ? DAMMA : KASRA;
    const mudhariMedial =
      pres2 === DAMMA ? DAMMA + 'و' : pres2 === KASRA ? KASRA + 'ي' : FATHA + 'ا';
    const mudhariShortVowel =
      pres2 === DAMMA ? DAMMA : pres2 === KASRA ? KASRA : FATHA;

    if (category === 'madhi') {
      const m = MADHI_SUFFIXES[key];
      if (m.consonantInitial) {
        return {
          arabic: f + shortVowelOnF + l + m.suf,
          ruleNote: `حُذفت الألف لالتقاء الساكنين وحُرّكت الفاء بـ${shortVowelOnF === DAMMA ? 'الضمة' : 'الكسرة'} للدلالة على المحذوف`,
          applicable: true,
        };
      }
      return {
        arabic: f + FATHA + 'ا' + l + m.suf,
        ruleNote: 'تحركت الواو/الياء وانفتح ما قبلها فقُلبت ألفًا',
        applicable: true,
      };
    }
    if (category === 'passive_madhi') {
      const m = MADHI_SUFFIXES[key];
      if (m.consonantInitial) {
        return {
          arabic: f + (isWawi ? KASRA : DAMMA) + l + m.suf,
          ruleNote: 'المبني للمجهول مع الضمير المتحرك: حُذفت الياء لالتقاء الساكنين',
          applicable: true,
        };
      }
      return {
        arabic: f + KASRA + 'ي' + l + m.suf,
        ruleNote: 'قُلبت عين الأجوف ياءً وكُسر ما قبلها في الماضي المجهول (قِيلَ / بِيعَ)',
        applicable: true,
      };
    }
    if (category === 'mudhari' || category === 'mansub' || category === 'majzum') {
      const aff = MUDHARI_AFFIXES[key];
      const suf = category === 'mudhari' ? aff.sufMarfu : category === 'mansub' ? aff.sufMansub : aff.sufMajzum;
      const dropsMedial =
        aff.pluralFem || (category === 'majzum' && aff.needsShorteningInSukun);
      const body = dropsMedial ? f + mudhariShortVowel + l : f + mudhariMedial + l;
      return {
        arabic: aff.pre + FATHA + body + suf,
        ruleNote: dropsMedial
          ? 'حُذف حرف العلة لالتقاء الساكنين عند سكون اللام'
          : 'تبقى عين الأجوف ممدودة بعد نقل حركتها إلى الفاء',
        applicable: true,
      };
    }
    if (category === 'passive_mudhari') {
      const aff = MUDHARI_AFFIXES[key];
      const body = aff.pluralFem ? f + FATHA + l : f + FATHA + 'ا' + l;
      return {
        arabic: aff.pre + DAMMA + body + aff.sufMarfu,
        ruleNote: 'في المضارع المجهول للأجوف تُقلب العين ألفًا (يُقَالُ / يُبَاعُ)',
        applicable: true,
      };
    }
    if (category === 'amr') {
      const aff = MUDHARI_AFFIXES[key];
      const dropsMedial = key === 'anta' || key === 'antunna';
      const amrSuf = key === 'anta' ? SUKUN : key === 'antunna' ? SUKUN + 'نَ' : aff.sufMajzum;
      const body = dropsMedial ? f + mudhariShortVowel + l : f + mudhariMedial + l;
      return {
        arabic: body + amrSuf,
        ruleNote: dropsMedial
          ? 'حُذفت العين لالتقاء الساكنين (قُلْ / بِعْ / خَفْ)'
          : 'تعود العين الممدودة لتحرك اللام بالضمير المتصل (قُولَا / قُولُوا)',
        applicable: true,
      };
    }
    if (category === 'nahy') {
      const aff = MUDHARI_AFFIXES[key];
      const dropsMedial = aff.pluralFem || aff.needsShorteningInSukun;
      const body = dropsMedial ? f + mudhariShortVowel + l : f + mudhariMedial + l;
      return {
        arabic: 'لَا ' + aff.pre + FATHA + body + aff.sufMajzum,
        ruleNote: 'النهي: لا الناهية + المضارع المجزوم من الأجوف',
        applicable: true,
      };
    }
    void medialChar;
  }

  // 3. NAQIS & LAFIF MAQRUN & LAFIF MAFRUQ
  if (
    cls === 'naqis_wawi' ||
    cls === 'naqis_yayi' ||
    cls === 'lafif_maqrun' ||
    cls === 'lafif_mafruq'
  ) {
    const isLafifMafruq = cls === 'lafif_mafruq';
    const isWawi = cls === 'naqis_wawi';
    const weakL = isWawi ? 'و' : 'ي';
    const root2 = f + FATHA + a;

    if (category === 'madhi') {
      if (past2 === KASRA) {
        // e.g. رَضِيَ
        switch (key) {
          case 'huwa': return { arabic: f + FATHA + a + KASRA + 'ي' + FATHA, ruleNote: 'تسلم الياء لانكسار ما قبلها (رَضِيَ)', applicable: true };
          case 'huma_m': return { arabic: f + FATHA + a + KASRA + 'يَا', ruleNote: 'تبقى الياء في المثنى المذكر', applicable: true };
          case 'hum': return { arabic: f + FATHA + a + DAMMA + 'وا', ruleNote: 'حُذفت الياء لالتقاء الساكنين مع واو الجماعة وضُمَّ ما قبلها', applicable: true };
          case 'hiya': return { arabic: f + FATHA + a + KASRA + 'يَتْ', ruleNote: 'تبقى الياء مع تاء التأنيث', applicable: true };
          case 'huma_f': return { arabic: f + FATHA + a + KASRA + 'يَتَا', ruleNote: 'تبقى الياء في مثنى المؤنث', applicable: true };
          default: return { arabic: f + FATHA + a + KASRA + 'ي' + MADHI_SUFFIXES[key].suf, ruleNote: 'تُسكّن الياء مع ضمائر الرفع المتحركة', applicable: true };
        }
      }
      // فَعَلَ ناقص: دَعَا / رَمَى / وَقَى / طَوَى
      switch (key) {
        case 'huwa':
          return {
            arabic: root2 + FATHA + (isWawi ? 'ا' : 'ى'),
            ruleNote: isWawi ? 'قُلبت الواو ألفًا طويلة (دَعَا)' : 'قُلبت الياء ألفًا مقصورة (رَمَى / طَوَى)',
            applicable: true,
          };
        case 'huma_m':
          return { arabic: root2 + FATHA + weakL + 'ا', ruleNote: 'تُرد الألف إلى أصلها في المثنى', applicable: true };
        case 'hum':
          return { arabic: root2 + FATHA + 'وْا', ruleNote: 'حُذفت اللام وبقي فتح ما قبل واو الجماعة (دَعَوْا / رَمَوْا)', applicable: true };
        case 'hiya':
          return { arabic: root2 + FATHA + 'تْ', ruleNote: 'حُذفت الألف لالتقاء الساكنين مع تاء التأنيث الساكنة', applicable: true };
        case 'huma_f':
          return { arabic: root2 + FATHA + 'تَا', ruleNote: 'تبقى محذوفة مع ألف المثنى بعد تاء التأنيث', applicable: true };
        default:
          return {
            arabic: root2 + FATHA + weakL + MADHI_SUFFIXES[key].suf,
            ruleNote: 'تُرد الألف إلى أصلها الواوي أو اليائي وتُسكّن',
            applicable: true,
          };
      }
    }

    if (category === 'passive_madhi') {
      const base = f + DAMMA + a + KASRA + 'ي';
      switch (key) {
        case 'huwa': return { arabic: base + FATHA, ruleNote: 'تُقلب الواو ياءً لانكسار ما قبلها في المجهول (دُعِيَ)', applicable: true };
        case 'huma_m': return { arabic: base + 'ا', ruleNote: 'المثنى المذكر للمجهول', applicable: true };
        case 'hum': return { arabic: f + DAMMA + a + DAMMA + 'وا', ruleNote: 'حُذفت الياء وضُمَّت العين لمناسبة واو الجماعة', applicable: true };
        case 'hiya': return { arabic: base + FATHA + 'تْ', ruleNote: 'المفردة المؤنثة للمجهول', applicable: true };
        case 'huma_f': return { arabic: base + FATHA + 'تَا', ruleNote: 'المثنى المؤنث للمجهول', applicable: true };
        default: return { arabic: base + MADHI_SUFFIXES[key].suf, ruleNote: 'تسكن الياء مع ضمائر الرفع المتحركة', applicable: true };
      }
    }

    if (category === 'mudhari' || category === 'mansub' || category === 'majzum') {
      const aff = MUDHARI_AFFIXES[key];
      const stemPrefix = isLafifMafruq ? aff.pre + FATHA + a : aff.pre + FATHA + f + SUKUN + a;
      // Three Mudhari endings: يَدْعُو (pres2=DAMMA), يَرْمِي (pres2=KASRA), يَرْضَى/يَسْعَى (pres2=FATHA)
      if (pres2 === FATHA) {
        // يَرْضَى / يَسْعَى
        switch (key) {
          case 'huwa':
          case 'hiya':
          case 'anta':
          case 'ana':
          case 'nahnu':
            return {
              arabic:
                category === 'majzum'
                  ? stemPrefix + FATHA
                  : stemPrefix + FATHA + 'ى',
              ruleNote:
                category === 'majzum'
                  ? 'جُزم بحذف حرف العلة (الألف) وبقيت الفتحة دليلًا عليه'
                  : category === 'mansub'
                  ? 'نُصب بفتحة مقدرة على الألف للتعذر'
                  : 'مرفوع بضمة مقدرة على الألف للتعذر',
              applicable: true,
            };
          case 'huma_m':
          case 'huma_f':
          case 'antuma_m':
          case 'antuma_f':
            return {
              arabic: stemPrefix + FATHA + 'ي' + (category === 'mudhari' ? 'انِ' : 'ا'),
              ruleNote: 'تُقلب الألف ياءً في المثنى',
              applicable: true,
            };
          case 'hum':
          case 'antum':
            return {
              arabic: stemPrefix + FATHA + 'وْ' + (category === 'mudhari' ? 'نَ' : 'ا'),
              ruleNote: 'تُحذف الألف وتبقى الفتحة قبل واو الجماعة (يَرْضَوْنَ)',
              applicable: true,
            };
          case 'anti':
            return {
              arabic: stemPrefix + FATHA + 'يْ' + (category === 'mudhari' ? 'نَ' : ''),
              ruleNote: 'تُحذف الألف وتبقى الفتحة قبل ياء المخاطبة (تَرْضَيْنَ)',
              applicable: true,
            };
          case 'hunna':
          case 'antunna':
            return {
              arabic: stemPrefix + FATHA + 'يْنَ',
              ruleNote: 'تُقلب الألف ياءً ساكنة قبل نون النسوة',
              applicable: true,
            };
        }
      }

      // يَدْعُو (Wawi) or يَرْمِي / يَقِي / يَطْوِي (Yayi)
      const endVowel = isWawi ? DAMMA : KASRA;
      const endLetter = isWawi ? 'و' : 'ي';
      switch (key) {
        case 'huwa':
        case 'hiya':
        case 'anta':
        case 'ana':
        case 'nahnu':
          if (category === 'majzum') {
            return {
              arabic: stemPrefix + endVowel,
              ruleNote: 'جُزم بحذف حرف العلة وبقيت الحركة المجانسة دليلًا عليه',
              applicable: true,
            };
          }
          if (category === 'mansub') {
            return {
              arabic: stemPrefix + endVowel + endLetter + FATHA,
              ruleNote: 'تظهر الفتحة على الواو والياء لخفتها (لَنْ يَدْعُوَ / لَنْ يَرْمِيَ)',
              applicable: true,
            };
          }
          return {
            arabic: stemPrefix + endVowel + endLetter,
            ruleNote: 'مرفوع بضمة مقدرة للثقل',
            applicable: true,
          };
        case 'huma_m':
        case 'huma_f':
        case 'antuma_m':
        case 'antuma_f':
          return {
            arabic: stemPrefix + endVowel + endLetter + FATHA + (category === 'mudhari' ? 'انِ' : 'ا'),
            ruleNote: 'تُحرَّك اللام بالفتحة قبل ألف الاثنين',
            applicable: true,
          };
        case 'hum':
        case 'antum':
          return {
            arabic: stemPrefix + DAMMA + 'ونَ'.replace('نَ', category === 'mudhari' ? 'نَ' : 'ا').replace('وا', 'وا'),
            ruleNote: 'حُذفت لام الفعل لالتقاء الساكنين وضُمَّ ما قبل واو الجماعة (يَدْعُونَ / يَرْمُونَ)',
            applicable: true,
          };
        case 'anti':
          return {
            arabic: stemPrefix + KASRA + 'ينَ'.replace('نَ', category === 'mudhari' ? 'نَ' : ''),
            ruleNote: 'حُذفت لام الفعل وكُسر ما قبل ياء المخاطبة (تَدْعِينَ / تَرْمِينَ)',
            applicable: true,
          };
        case 'hunna':
        case 'antunna':
          return {
            arabic: stemPrefix + endVowel + endLetter + 'نَ',
            ruleNote: 'تسكن لام الفعل قبل نون النسوة دون حذف (يَدْعُونَ / يَرْمِينَ)',
            applicable: true,
          };
      }
    }

    if (category === 'passive_mudhari') {
      const aff = MUDHARI_AFFIXES[key];
      const stemPrefix = aff.pre + DAMMA + f + SUKUN + a;
      switch (key) {
        case 'huwa':
        case 'hiya':
        case 'anta':
        case 'ana':
        case 'nahnu':
          return { arabic: stemPrefix + FATHA + 'ى', ruleNote: 'تُقلب اللام ألفًا في المضارع المجهول (يُدْعَى / يُرْمَى)', applicable: true };
        case 'huma_m':
        case 'huma_f':
        case 'antuma_m':
        case 'antuma_f':
          return { arabic: stemPrefix + FATHA + 'يَانِ', ruleNote: 'المثنى في المضارع المجهول', applicable: true };
        case 'hum':
        case 'antum':
          return { arabic: stemPrefix + FATHA + 'وْنَ', ruleNote: 'الجمع المذكر في المضارع المجهول', applicable: true };
        case 'anti':
          return { arabic: stemPrefix + FATHA + 'يْنَ', ruleNote: 'المخاطبة في المضارع المجهول', applicable: true };
        default:
          return { arabic: stemPrefix + FATHA + 'يْنَ', ruleNote: 'نون النسوة في المضارع المجهول', applicable: true };
      }
    }

    if (category === 'amr') {
      const endVowel = pres2 === FATHA ? FATHA : isWawi ? DAMMA : KASRA;
      const endLetter = pres2 === FATHA ? 'ي' : isWawi ? 'و' : 'ي';
      const prefix = isLafifMafruq ? a : (pres2 === DAMMA ? 'اُ' : 'اِ') + f + SUKUN + a;
      switch (key) {
        case 'anta':
          return {
            arabic: prefix + endVowel,
            ruleNote: isLafifMafruq
              ? 'حُذفت الفاء (الواو) واللام (الياء) فبقي حرف واحد متحرك (قِ)'
              : 'بُني الأمر على حذف حرف العلة (اُدْعُ / اِرْمِ / اِرْضَ)',
            applicable: true,
          };
        case 'antuma_m':
        case 'antuma_f':
          return { arabic: prefix + endVowel + endLetter + 'ا', ruleNote: 'رد حرف العلة مع ألف الاثنين', applicable: true };
        case 'antum':
          return { arabic: prefix + (pres2 === FATHA ? FATHA + 'وْا' : DAMMA + 'وا'), ruleNote: 'الأمر للجمع المذكر', applicable: true };
        case 'anti':
          return { arabic: prefix + (pres2 === FATHA ? FATHA + 'يْ' : KASRA + 'ي'), ruleNote: 'الأمر للمخاطبة', applicable: true };
        case 'antunna':
          return { arabic: prefix + endVowel + endLetter + 'نَ', ruleNote: 'الأمر لنون النسوة', applicable: true };
      }
    }

    if (category === 'nahy') {
      const maj = conjugateFormI(verb, p, 'majzum');
      return {
        arabic: 'لَا ' + maj.arabic,
        ruleNote: 'النهي: لا الناهية + المضارع المجزوم بحذف حرف العلة',
        applicable: true,
      };
    }
  }

  // 4. MUDAAF (Geminate: ع = ل)
  if (cls === 'mudaaf') {
    if (category === 'madhi') {
      const m = MADHI_SUFFIXES[key];
      if (m.consonantInitial) {
        return {
          arabic: f + FATHA + a + past2 + l + m.suf,
          ruleNote: 'فُكَّ الإدغام وجوبًا لسكون اللام عند اتصالها بضمير رفع متحرك',
          applicable: true,
        };
      }
      return {
        arabic: f + FATHA + a + SHADDA + m.suf,
        ruleNote: 'أُدغمت العين في اللام لتوالى المثلين متحركين',
        applicable: true,
      };
    }
    if (category === 'passive_madhi') {
      const m = MADHI_SUFFIXES[key];
      if (m.consonantInitial) {
        return {
          arabic: f + DAMMA + a + KASRA + l + m.suf,
          ruleNote: 'فُكَّ الإدغام في الماضي المجهول مع الضمير المتحرك',
          applicable: true,
        };
      }
      return {
        arabic: f + DAMMA + a + SHADDA + m.suf,
        ruleNote: 'الماضي المجهول من المضعف (مُدَّ)',
        applicable: true,
      };
    }
    if (category === 'mudhari' || category === 'mansub' || category === 'majzum') {
      const aff = MUDHARI_AFFIXES[key];
      if (aff.pluralFem) {
        return {
          arabic: aff.pre + FATHA + f + SUKUN + a + pres2 + l + SUKUN + 'نَ',
          ruleNote: 'فُكَّ الإدغام وجوبًا لاتصاله بنون النسوة (يَمْدُدْنَ)',
          applicable: true,
        };
      }
      const suf =
        category === 'mudhari'
          ? aff.sufMarfu
          : category === 'mansub'
          ? aff.sufMansub
          : key === 'huwa' || key === 'hiya' || key === 'anta' || key === 'ana' || key === 'nahnu'
          ? FATHA
          : aff.sufMajzum;
      return {
        arabic: aff.pre + FATHA + f + pres2 + a + SHADDA + suf,
        ruleNote:
          category === 'majzum' && suf === FATHA
            ? 'يجوز في جزم المضعف المفرد الإدغام بالفتح (لَمْ يَمُدَّ) أو الفك (لَمْ يَمْدُدْ)'
            : 'المضعف في المضارع المدغم (يَمُدُّ / يَفِرُّ)',
        applicable: true,
      };
    }
    if (category === 'passive_mudhari') {
      const aff = MUDHARI_AFFIXES[key];
      if (aff.pluralFem) {
        return {
          arabic: aff.pre + DAMMA + f + SUKUN + a + FATHA + l + SUKUN + 'نَ',
          ruleNote: 'فك الإدغام مع نون النسوة في المجهول',
          applicable: true,
        };
      }
      return {
        arabic: aff.pre + DAMMA + f + FATHA + a + SHADDA + aff.sufMarfu,
        ruleNote: 'المضارع المجهول من المضعف (يُمَدُّ)',
        applicable: true,
      };
    }
    if (category === 'amr') {
      if (key === 'antunna') {
        const wasl = pres2 === DAMMA ? 'اُ' : 'اِ';
        return {
          arabic: wasl + f + SUKUN + a + pres2 + l + SUKUN + 'نَ',
          ruleNote: 'يفك الإدغام وجوبًا مع نون النسوة وتُزاد همزة وصل (اُمْدُدْنَ)',
          applicable: true,
        };
      }
      const aff = MUDHARI_AFFIXES[key];
      const suf = key === 'anta' ? FATHA : aff.sufMajzum;
      return {
        arabic: f + pres2 + a + SHADDA + suf,
        ruleNote: key === 'anta' ? 'الأمر المدغم يُفتح للتخلص من التقاء الساكنين (مُدَّ) ويجوز الفك (اُمْدُدْ)' : 'الأمر من المضعف',
        applicable: true,
      };
    }
    if (category === 'nahy') {
      const maj = conjugateFormI(verb, p, 'majzum');
      return {
        arabic: 'لَا ' + maj.arabic,
        ruleNote: 'النهي: لا الناهية + المجزوم (يجوز الإدغام والفك في المفرد)',
        applicable: true,
      };
    }
  }

  // 5. SOUND & MAHMUZ (الصحيح السالم والمهموز)
  const isMahmuzFa = cls === 'mahmuz_fa';
  const isIrregAmrMahmuz = isMahmuzFa && ['أَخَذَ', 'أَكَلَ', 'أَمَرَ'].includes(verb.past);
  if (category === 'madhi') {
    const fLetter = f === 'ء' ? 'أ' : f;
    const aLetter = a === 'ء' || a === 'أ' ? hamzaForVowel(a, past2, FATHA) : a;
    const m = MADHI_SUFFIXES[key];
    const lLetter = l === 'ء' || l === 'أ' ? hamzaForVowel(l, FATHA, past2) : l;
    return {
      arabic: fLetter + FATHA + aLetter + past2 + lLetter + m.suf,
      ruleNote: 'تصريف الماضي الصحيح على وزن فَعَلَ/فَعِلَ/فَعُلَ',
      applicable: true,
    };
  }
  if (category === 'passive_madhi') {
    const fLetter = f === 'ء' ? 'أ' : f;
    const aLetter = a === 'ء' || a === 'أ' ? 'ئ' : a;
    const lLetter = l === 'ء' || l === 'أ' ? 'ئ' : l;
    return {
      arabic: fLetter + DAMMA + aLetter + KASRA + lLetter + MADHI_SUFFIXES[key].suf,
      ruleNote: 'بناء الماضي للمجهول: ضم أوله وكسر ما قبل آخره',
      applicable: true,
    };
  }
  if (category === 'mudhari' || category === 'mansub' || category === 'majzum') {
    const aff = MUDHARI_AFFIXES[key];
    const suf = category === 'mudhari' ? aff.sufMarfu : category === 'mansub' ? aff.sufMansub : aff.sufMajzum;
    const aLetter = a === 'ء' || a === 'أ' ? hamzaForVowel(a, pres2, SUKUN) : a;
    const lLetter = l === 'ء' || l === 'أ' ? hamzaForVowel(l, suf[0] || SUKUN, pres2) : l;
    // 1st person singular of Mahmuz al-Fa: أَأْخُذُ -> آخُذُ
    if (isMahmuzFa && key === 'ana') {
      return {
        arabic: 'آ' + aLetter + pres2 + lLetter + suf,
        ruleNote: 'قُلبت الهمزة الثانية الساكنة مدًّا مجانسًا للهمزة المفتوحة (أَأْ ← آ)',
        applicable: true,
      };
    }
    const fLetter = isMahmuzFa ? 'أ' : f;
    return {
      arabic: aff.pre + FATHA + fLetter + SUKUN + aLetter + pres2 + lLetter + suf,
      ruleNote:
        category === 'mudhari'
          ? 'المضارع المرفوع'
          : category === 'mansub'
          ? 'المضارع المنصوب (علامة النصب الفتحة أو حذف النون)'
          : 'المضارع المجزوم (علامة الجزم السكون أو حذف النون)',
      applicable: true,
    };
  }
  if (category === 'passive_mudhari') {
    const aff = MUDHARI_AFFIXES[key];
    const fLetter = isMahmuzFa ? 'ؤ' : f;
    const aLetter = a === 'ء' || a === 'أ' ? 'أ' : a;
    const lLetter = l === 'ء' || l === 'أ' ? 'أ' : l;
    return {
      arabic: aff.pre + DAMMA + fLetter + SUKUN + aLetter + FATHA + lLetter + aff.sufMarfu,
      ruleNote: 'بناء المضارع للمجهول: ضم أوله وفتح ما قبل آخره',
      applicable: true,
    };
  }
  if (category === 'amr') {
    const aff = MUDHARI_AFFIXES[key];
    const amrSuf = key === 'anta' ? SUKUN : key === 'antunna' ? SUKUN + 'نَ' : aff.sufMajzum;
    const aLetter = a === 'ء' || a === 'أ' ? hamzaForVowel(a, pres2, SUKUN) : a;
    const lLetter = l === 'ء' || l === 'أ' ? hamzaForVowel(l, amrSuf[0] || SUKUN, pres2) : l;
    if (isIrregAmrMahmuz) {
      return {
        arabic: aLetter + pres2 + lLetter + amrSuf,
        ruleNote: 'شذوذ سماعي: حُذفت الهمزة تخفيفًا لكثرة الاستعمال (خُذْ / كُلْ / مُرْ)',
        applicable: true,
      };
    }
    const wasl = pres2 === DAMMA ? 'اُ' : 'اِ';
    const fInAmr = isMahmuzFa ? (pres2 === DAMMA ? 'ؤ' : 'ئ') : f;
    return {
      arabic: wasl + fInAmr + SUKUN + aLetter + pres2 + lLetter + amrSuf,
      ruleNote: `تُحرك همزة الوصل بـ${pres2 === DAMMA ? 'الضم' : 'الكسر'} تبعًا لحركة عين المضارع`,
      applicable: true,
    };
  }
  if (category === 'nahy') {
    const maj = conjugateFormI(verb, p, 'majzum');
    return {
      arabic: 'لَا ' + maj.arabic,
      ruleNote: 'النهي: لا الناهية + المضارع المجزوم',
      applicable: true,
    };
  }

  return { arabic: verb.past, ruleNote: '', applicable: true };
}

/**
 * Conjugation for Augmented Forms II–X and Quadriliterals (QI, QII)
 */
function conjugateAugmented(
  verb: VerbEntry,
  p: PronounMeta,
  category: ConjugationCategory
): { arabic: string; ruleNote: string; applicable: boolean } {
  const rad = verb.radicals;
  const f = rad[0] ?? 'ف';
  const a = rad[1] ?? 'ع';
  const l = rad[2] ?? 'ل';
  const l2 = rad[3] ?? 'ل';
  const cls = verb.classification;
  const form = verb.form;
  const key = p.key;

  if ((category === 'amr' || category === 'nahy') && !SECOND_PERSON_KEYS.includes(key)) {
    return { arabic: '—', ruleNote: 'Applies only to 2nd person pronouns', applicable: false };
  }

  if ((category === 'passive_madhi' || category === 'passive_mudhari') && verb.transitivity === 'lazim') {
    return {
      arabic: '—',
      ruleNote: 'Intransitive augmented form (لازم) does not form direct passive',
      applicable: false,
    };
  }

  // Handle weak augmented stems cleanly (e.g. أَقَامَ, اِسْتَقَامَ, اِخْتَارَ, أَعْطَى, اِشْتَرَى, رَبَّى, تَعَاوَنَ)
  const isAjwaf = cls === 'ajwaf_wawi' || cls === 'ajwaf_yayi';
  const isNaqis = cls === 'naqis_wawi' || cls === 'naqis_yayi' || cls === 'lafif_mafruq' || cls === 'lafif_maqrun';

  // Build stem for each form
  let pastStemActive = '';
  let pastStemShort = ''; // before consonant-initial suffix
  let pastStemPassive = '';
  let pastStemPassiveShort = '';
  let presStemActive = ''; // without prefix or suffix
  let presStemShort = ''; // when 3rd radical gets sukun (jussive / plural fem)
  let presStemPassive = '';
  let amrPrefix = '';
  let amrStem = '';
  let amrStemShort = '';
  let presPrefixVowel = DAMMA; // Forms II, III, IV, QI use Damma; V, VI, VII, VIII, IX, X, QII use Fatha!

  switch (form) {
    case 'II': {
      presPrefixVowel = DAMMA;
      if (isNaqis) {
        // e.g. رَبَّى يُرَبِّي رَبِّ
        pastStemActive = f + FATHA + a + SHADDA;
        pastStemPassive = f + DAMMA + a + SHADDA + KASRA + 'ي';
        if (category === 'madhi') {
          switch (key) {
            case 'huwa': return { arabic: pastStemActive + FATHA + 'ى', ruleNote: 'وزن فَعَّلَ الناقص', applicable: true };
            case 'huma_m': return { arabic: pastStemActive + FATHA + 'يَا', ruleNote: 'المثنى', applicable: true };
            case 'hum': return { arabic: pastStemActive + FATHA + 'وْا', ruleNote: 'واو الجماعة', applicable: true };
            case 'hiya': return { arabic: pastStemActive + FATHA + 'تْ', ruleNote: 'تاء التأنيث', applicable: true };
            case 'huma_f': return { arabic: pastStemActive + FATHA + 'تَا', ruleNote: 'مثنى المؤنث', applicable: true };
            default: return { arabic: pastStemActive + FATHA + 'ي' + MADHI_SUFFIXES[key].suf, ruleNote: 'ضمير رفع متحرك', applicable: true };
          }
        }
        if (category === 'mudhari' || category === 'mansub' || category === 'majzum') {
          const aff = MUDHARI_AFFIXES[key];
          const pfx = aff.pre + DAMMA + f + FATHA + a + SHADDA;
          if (key === 'hum' || key === 'antum') return { arabic: pfx + DAMMA + (category === 'mudhari' ? 'ونَ' : 'وا'), ruleNote: 'حذف الياء مع واو الجماعة', applicable: true };
          if (key === 'anti') return { arabic: pfx + KASRA + (category === 'mudhari' ? 'ينَ' : 'ي'), ruleNote: 'ياء المخاطبة', applicable: true };
          if (key === 'hunna' || key === 'antunna') return { arabic: pfx + KASRA + 'ينَ', ruleNote: 'نون النسوة', applicable: true };
          if (key === 'huma_m' || key === 'huma_f' || key === 'antuma_m' || key === 'antuma_f') return { arabic: pfx + KASRA + 'ي' + (category === 'mudhari' ? 'انِ' : 'ا'), ruleNote: 'المثنى', applicable: true };
          if (category === 'majzum') return { arabic: pfx + KASRA, ruleNote: 'جزم بحذف حرف العلة', applicable: true };
          if (category === 'mansub') return { arabic: pfx + KASRA + 'يَ', ruleNote: 'نصب بفتحة ظاهرة', applicable: true };
          return { arabic: pfx + KASRA + 'ي', ruleNote: 'رفع بضمة مقدرة', applicable: true };
        }
        if (category === 'amr') {
          const base = f + FATHA + a + SHADDA;
          if (key === 'anta') return { arabic: base + KASRA, ruleNote: 'أمر فَعَّلَ الناقص بحذف حرف العلة (رَبِّ)', applicable: true };
          if (key === 'antunna') return { arabic: base + KASRA + 'ينَ', ruleNote: 'نون النسوة', applicable: true };
          if (key === 'antum') return { arabic: base + DAMMA + 'وا', ruleNote: 'واو الجماعة', applicable: true };
          if (key === 'anti') return { arabic: base + KASRA + 'ي', ruleNote: 'ياء المخاطبة', applicable: true };
          return { arabic: base + KASRA + 'يَا', ruleNote: 'المثنى', applicable: true };
        }
      }
      pastStemActive = f + FATHA + a + SHADDA + FATHA + l;
      pastStemShort = pastStemActive;
      pastStemPassive = f + DAMMA + a + SHADDA + KASRA + l;
      pastStemPassiveShort = pastStemPassive;
      presStemActive = f + FATHA + a + SHADDA + KASRA + l;
      presStemShort = presStemActive;
      presStemPassive = f + FATHA + a + SHADDA + FATHA + l;
      amrStem = presStemActive;
      amrStemShort = presStemActive;
      break;
    }
    case 'III': {
      presPrefixVowel = DAMMA;
      pastStemActive = f + FATHA + 'ا' + a + FATHA + l;
      pastStemShort = pastStemActive;
      pastStemPassive = f + DAMMA + 'و' + a + KASRA + l;
      pastStemPassiveShort = pastStemPassive;
      presStemActive = f + FATHA + 'ا' + a + KASRA + l;
      presStemShort = presStemActive;
      presStemPassive = f + FATHA + 'ا' + a + FATHA + l;
      amrStem = presStemActive;
      amrStemShort = presStemActive;
      break;
    }
    case 'IV': {
      presPrefixVowel = DAMMA;
      if (isAjwaf) {
        pastStemActive = 'أَ' + f + FATHA + 'ا' + l;
        pastStemShort = 'أَ' + f + FATHA + l;
        pastStemPassive = 'أُ' + f + KASRA + 'ي' + l;
        pastStemPassiveShort = 'أُ' + f + KASRA + l;
        presStemActive = f + KASRA + 'ي' + l;
        presStemShort = f + KASRA + l;
        presStemPassive = f + FATHA + 'ا' + l;
        amrPrefix = 'أَ';
        amrStem = f + KASRA + 'ي' + l;
        amrStemShort = f + KASRA + l;
      } else if (isNaqis) {
        // أَعْطَى يُعْطِي أَعْطِ
        if (category === 'madhi') {
          const base = 'أَ' + f + SUKUN + a;
          switch (key) {
            case 'huwa': return { arabic: base + FATHA + 'ى', ruleNote: 'وزن أَفْعَلَ الناقص', applicable: true };
            case 'huma_m': return { arabic: base + FATHA + 'يَا', ruleNote: 'المثنى', applicable: true };
            case 'hum': return { arabic: base + FATHA + 'وْا', ruleNote: 'واو الجماعة', applicable: true };
            case 'hiya': return { arabic: base + FATHA + 'تْ', ruleNote: 'تاء التأنيث', applicable: true };
            case 'huma_f': return { arabic: base + FATHA + 'تَا', ruleNote: 'مثنى المؤنث', applicable: true };
            default: return { arabic: base + FATHA + 'ي' + MADHI_SUFFIXES[key].suf, ruleNote: 'ضمير رفع متحرك', applicable: true };
          }
        }
        if (category === 'mudhari' || category === 'mansub' || category === 'majzum') {
          const aff = MUDHARI_AFFIXES[key];
          const pfx = aff.pre + DAMMA + f + SUKUN + a;
          if (key === 'hum' || key === 'antum') return { arabic: pfx + DAMMA + (category === 'mudhari' ? 'ونَ' : 'وا'), ruleNote: 'واو الجماعة', applicable: true };
          if (key === 'anti') return { arabic: pfx + KASRA + (category === 'mudhari' ? 'ينَ' : 'ي'), ruleNote: 'ياء المخاطبة', applicable: true };
          if (key === 'hunna' || key === 'antunna') return { arabic: pfx + KASRA + 'ينَ', ruleNote: 'نون النسوة', applicable: true };
          if (key === 'huma_m' || key === 'huma_f' || key === 'antuma_m' || key === 'antuma_f') return { arabic: pfx + KASRA + 'ي' + (category === 'mudhari' ? 'انِ' : 'ا'), ruleNote: 'المثنى', applicable: true };
          if (category === 'majzum') return { arabic: pfx + KASRA, ruleNote: 'جزم بحذف حرف العلة', applicable: true };
          if (category === 'mansub') return { arabic: pfx + KASRA + 'يَ', ruleNote: 'نصب بفتحة ظاهرة', applicable: true };
          return { arabic: pfx + KASRA + 'ي', ruleNote: 'رفع بضمة مقدرة', applicable: true };
        }
        if (category === 'amr') {
          const base = 'أَ' + f + SUKUN + a;
          if (key === 'anta') return { arabic: base + KASRA, ruleNote: 'أمر أَفْعَلَ الناقص (أَعْطِ) بهمزة قطع', applicable: true };
          if (key === 'antunna') return { arabic: base + KASRA + 'ينَ', ruleNote: 'نون النسوة', applicable: true };
          if (key === 'antum') return { arabic: base + DAMMA + 'وا', ruleNote: 'واو الجماعة', applicable: true };
          if (key === 'anti') return { arabic: base + KASRA + 'ي', ruleNote: 'ياء المخاطبة', applicable: true };
          return { arabic: base + KASRA + 'يَا', ruleNote: 'المثنى', applicable: true };
        }
      } else {
        pastStemActive = 'أَ' + f + SUKUN + a + FATHA + l;
        pastStemShort = pastStemActive;
        pastStemPassive = 'أُ' + f + SUKUN + a + KASRA + l;
        pastStemPassiveShort = pastStemPassive;
        presStemActive = f + SUKUN + a + KASRA + l;
        presStemShort = presStemActive;
        presStemPassive = f + SUKUN + a + FATHA + l;
        amrPrefix = 'أَ';
        amrStem = presStemActive;
        amrStemShort = presStemActive;
      }
      break;
    }
    case 'V': {
      presPrefixVowel = FATHA;
      pastStemActive = 'تَ' + f + FATHA + a + SHADDA + FATHA + l;
      pastStemShort = pastStemActive;
      pastStemPassive = 'تُ' + f + DAMMA + a + SHADDA + KASRA + l;
      pastStemPassiveShort = pastStemPassive;
      presStemActive = 'تَ' + f + FATHA + a + SHADDA + FATHA + l;
      presStemShort = presStemActive;
      presStemPassive = 'تَ' + f + FATHA + a + SHADDA + FATHA + l;
      amrStem = presStemActive;
      amrStemShort = presStemActive;
      break;
    }
    case 'VI': {
      presPrefixVowel = FATHA;
      pastStemActive = 'تَ' + f + FATHA + 'ا' + a + FATHA + l;
      pastStemShort = pastStemActive;
      pastStemPassive = 'تُ' + f + DAMMA + 'و' + a + KASRA + l;
      pastStemPassiveShort = pastStemPassive;
      presStemActive = 'تَ' + f + FATHA + 'ا' + a + FATHA + l;
      presStemShort = presStemActive;
      presStemPassive = presStemActive;
      amrStem = presStemActive;
      amrStemShort = presStemActive;
      break;
    }
    case 'VII': {
      presPrefixVowel = FATHA;
      pastStemActive = 'اِنْ' + f + FATHA + a + FATHA + l;
      pastStemShort = pastStemActive;
      pastStemPassive = 'اُنْ' + f + DAMMA + a + KASRA + l;
      pastStemPassiveShort = pastStemPassive;
      presStemActive = 'نْ' + f + FATHA + a + KASRA + l;
      presStemShort = presStemActive;
      presStemPassive = 'نْ' + f + FATHA + a + FATHA + l;
      amrPrefix = 'اِ';
      amrStem = presStemActive;
      amrStemShort = presStemActive;
      break;
    }
    case 'VIII': {
      presPrefixVowel = FATHA;
      if (isAjwaf) {
        pastStemActive = 'اِ' + f + SUKUN + 'تَا' + l;
        pastStemShort = 'اِ' + f + SUKUN + 'تَ' + l;
        pastStemPassive = 'اُ' + f + SUKUN + 'تِي' + l;
        pastStemPassiveShort = 'اُ' + f + SUKUN + 'تِ' + l;
        presStemActive = f + SUKUN + 'تَا' + l;
        presStemShort = f + SUKUN + 'تَ' + l;
        presStemPassive = f + SUKUN + 'تَا' + l;
        amrPrefix = 'اِ';
        amrStem = presStemActive;
        amrStemShort = presStemShort;
      } else if (isNaqis) {
        // اِشْتَرَى يَشْتَرِي اِشْتَرِ
        if (category === 'madhi') {
          const base = 'اِ' + f + SUKUN + 'تَ' + a;
          switch (key) {
            case 'huwa': return { arabic: base + FATHA + 'ى', ruleNote: 'افْتَعَلَ الناقص', applicable: true };
            case 'huma_m': return { arabic: base + FATHA + 'يَا', ruleNote: 'المثنى', applicable: true };
            case 'hum': return { arabic: base + FATHA + 'وْا', ruleNote: 'واو الجماعة', applicable: true };
            case 'hiya': return { arabic: base + FATHA + 'تْ', ruleNote: 'تاء التأنيث', applicable: true };
            case 'huma_f': return { arabic: base + FATHA + 'تَا', ruleNote: 'مثنى المؤنث', applicable: true };
            default: return { arabic: base + FATHA + 'ي' + MADHI_SUFFIXES[key].suf, ruleNote: 'ضمير رفع متحرك', applicable: true };
          }
        }
        if (category === 'mudhari' || category === 'mansub' || category === 'majzum') {
          const aff = MUDHARI_AFFIXES[key];
          const pfx = aff.pre + FATHA + f + SUKUN + 'تَ' + a;
          if (key === 'hum' || key === 'antum') return { arabic: pfx + DAMMA + (category === 'mudhari' ? 'ونَ' : 'وا'), ruleNote: 'واو الجماعة', applicable: true };
          if (key === 'anti') return { arabic: pfx + KASRA + (category === 'mudhari' ? 'ينَ' : 'ي'), ruleNote: 'ياء المخاطبة', applicable: true };
          if (key === 'hunna' || key === 'antunna') return { arabic: pfx + KASRA + 'ينَ', ruleNote: 'نون النسوة', applicable: true };
          if (key === 'huma_m' || key === 'huma_f' || key === 'antuma_m' || key === 'antuma_f') return { arabic: pfx + KASRA + 'ي' + (category === 'mudhari' ? 'انِ' : 'ا'), ruleNote: 'المثنى', applicable: true };
          if (category === 'majzum') return { arabic: pfx + KASRA, ruleNote: 'جزم بحذف حرف العلة', applicable: true };
          if (category === 'mansub') return { arabic: pfx + KASRA + 'يَ', ruleNote: 'نصب بفتحة ظاهرة', applicable: true };
          return { arabic: pfx + KASRA + 'ي', ruleNote: 'رفع بضمة مقدرة', applicable: true };
        }
        if (category === 'amr') {
          const base = 'اِ' + f + SUKUN + 'تَ' + a;
          if (key === 'anta') return { arabic: base + KASRA, ruleNote: 'أمر افتعل الناقص بحذف حرف العلة', applicable: true };
          if (key === 'antunna') return { arabic: base + KASRA + 'ينَ', ruleNote: 'نون النسوة', applicable: true };
          if (key === 'antum') return { arabic: base + DAMMA + 'وا', ruleNote: 'واو الجماعة', applicable: true };
          if (key === 'anti') return { arabic: base + KASRA + 'ي', ruleNote: 'ياء المخاطبة', applicable: true };
          return { arabic: base + KASRA + 'يَا', ruleNote: 'المثنى', applicable: true };
        }
      } else {
        pastStemActive = 'اِ' + f + SUKUN + 'تَ' + a + FATHA + l;
        pastStemShort = pastStemActive;
        pastStemPassive = 'اُ' + f + SUKUN + 'تُ' + a + KASRA + l;
        pastStemPassiveShort = pastStemPassive;
        presStemActive = f + SUKUN + 'تَ' + a + KASRA + l;
        presStemShort = presStemActive;
        presStemPassive = f + SUKUN + 'تَ' + a + FATHA + l;
        amrPrefix = 'اِ';
        amrStem = presStemActive;
        amrStemShort = presStemActive;
      }
      break;
    }
    case 'IX': {
      presPrefixVowel = FATHA;
      // اِحْمَرَّ يَحْمَرُّ (split doubled l with consonant suffixes)
      if (category === 'madhi') {
        const m = MADHI_SUFFIXES[key];
        const base = 'اِ' + f + SUKUN + a + FATHA + l;
        return {
          arabic: m.consonantInitial ? base + FATHA + l + m.suf : base + SHADDA + m.suf,
          ruleNote: m.consonantInitial ? 'فك التضعيف مع ضمير الرفع المتحرك' : 'وزن اِفْعَلَّ للألوان والعيوب',
          applicable: true,
        };
      }
      if (category === 'mudhari' || category === 'mansub' || category === 'majzum') {
        const aff = MUDHARI_AFFIXES[key];
        const base = aff.pre + FATHA + f + SUKUN + a + FATHA + l;
        if (aff.pluralFem) return { arabic: base + FATHA + l + SUKUN + 'نَ', ruleNote: 'فك التضعيف مع نون النسوة', applicable: true };
        const suf = category === 'mudhari' ? aff.sufMarfu : category === 'mansub' ? aff.sufMansub : key === 'huwa' || key === 'hiya' || key === 'anta' || key === 'ana' || key === 'nahnu' ? FATHA : aff.sufMajzum;
        return { arabic: base + SHADDA + suf, ruleNote: 'مضارع اِفْعَلَّ (يَفْعَلُّ)', applicable: true };
      }
      if (category === 'amr') {
        const base = 'اِ' + f + SUKUN + a + FATHA + l;
        if (key === 'antunna') return { arabic: base + FATHA + l + SUKUN + 'نَ', ruleNote: 'فك التضعيف لنون النسوة', applicable: true };
        const aff = MUDHARI_AFFIXES[key];
        return { arabic: base + SHADDA + (key === 'anta' ? FATHA : aff.sufMajzum), ruleNote: 'أمر اِفْعَلَّ', applicable: true };
      }
      pastStemActive = 'اِ' + f + SUKUN + a + FATHA + l + SHADDA;
      pastStemShort = 'اِ' + f + SUKUN + a + FATHA + l + FATHA + l;
      presStemActive = f + SUKUN + a + FATHA + l + SHADDA;
      presStemShort = presStemActive;
      amrStem = pastStemActive;
      amrStemShort = pastStemShort;
      break;
    }
    case 'X': {
      presPrefixVowel = FATHA;
      if (isAjwaf) {
        pastStemActive = 'اِسْتَ' + f + FATHA + 'ا' + l;
        pastStemShort = 'اِسْتَ' + f + FATHA + l;
        pastStemPassive = 'اُسْتُ' + f + KASRA + 'ي' + l;
        pastStemPassiveShort = 'اُسْتُ' + f + KASRA + l;
        presStemActive = 'سْتَ' + f + KASRA + 'ي' + l;
        presStemShort = 'سْتَ' + f + KASRA + l;
        presStemPassive = 'سْتَ' + f + FATHA + 'ا' + l;
        amrPrefix = 'اِ';
        amrStem = presStemActive;
        amrStemShort = presStemShort;
      } else {
        pastStemActive = 'اِسْتَ' + f + SUKUN + a + FATHA + l;
        pastStemShort = pastStemActive;
        pastStemPassive = 'اُسْتُ' + f + SUKUN + a + KASRA + l;
        pastStemPassiveShort = pastStemPassive;
        presStemActive = 'سْتَ' + f + SUKUN + a + KASRA + l;
        presStemShort = presStemActive;
        presStemPassive = 'سْتَ' + f + SUKUN + a + FATHA + l;
        amrPrefix = 'اِ';
        amrStem = presStemActive;
        amrStemShort = presStemActive;
      }
      break;
    }
    case 'QI': {
      presPrefixVowel = DAMMA;
      pastStemActive = f + FATHA + a + SUKUN + l + FATHA + l2;
      pastStemShort = pastStemActive;
      pastStemPassive = f + DAMMA + a + SUKUN + l + KASRA + l2;
      pastStemPassiveShort = pastStemPassive;
      presStemActive = f + FATHA + a + SUKUN + l + KASRA + l2;
      presStemShort = presStemActive;
      presStemPassive = f + FATHA + a + SUKUN + l + FATHA + l2;
      amrStem = presStemActive;
      amrStemShort = presStemActive;
      break;
    }
    case 'QII': {
      presPrefixVowel = FATHA;
      pastStemActive = 'تَ' + f + FATHA + a + SUKUN + l + FATHA + l2;
      pastStemShort = pastStemActive;
      pastStemPassive = 'تُ' + f + DAMMA + a + SUKUN + l + KASRA + l2;
      pastStemPassiveShort = pastStemPassive;
      presStemActive = 'تَ' + f + FATHA + a + SUKUN + l + FATHA + l2;
      presStemShort = presStemActive;
      presStemPassive = presStemActive;
      amrStem = presStemActive;
      amrStemShort = presStemActive;
      break;
    }
  }

  if (category === 'madhi') {
    const m = MADHI_SUFFIXES[key];
    return {
      arabic: (m.consonantInitial ? pastStemShort : pastStemActive) + m.suf,
      ruleNote: `تصريف الماضي للوزن (${form})`,
      applicable: true,
    };
  }
  if (category === 'passive_madhi') {
    const m = MADHI_SUFFIXES[key];
    return {
      arabic: (m.consonantInitial ? pastStemPassiveShort : pastStemPassive) + m.suf,
      ruleNote: `الماضي المجهول للوزن (${form})`,
      applicable: true,
    };
  }
  if (category === 'mudhari' || category === 'mansub' || category === 'majzum') {
    const aff = MUDHARI_AFFIXES[key];
    const suf = category === 'mudhari' ? aff.sufMarfu : category === 'mansub' ? aff.sufMansub : aff.sufMajzum;
    const useShort = aff.pluralFem || (category === 'majzum' && aff.needsShorteningInSukun);
    return {
      arabic: aff.pre + presPrefixVowel + (useShort ? presStemShort : presStemActive) + suf,
      ruleNote: `المضارع (${category === 'mudhari' ? 'مرفوع' : category === 'mansub' ? 'منصوب' : 'مجزوم'}) للوزن (${form})`,
      applicable: true,
    };
  }
  if (category === 'passive_mudhari') {
    const aff = MUDHARI_AFFIXES[key];
    return {
      arabic: aff.pre + DAMMA + presStemPassive + aff.sufMarfu,
      ruleNote: `المضارع المجهول للوزن (${form})`,
      applicable: true,
    };
  }
  if (category === 'amr') {
    const aff = MUDHARI_AFFIXES[key];
    const amrSuf = key === 'anta' ? SUKUN : key === 'antunna' ? SUKUN + 'نَ' : aff.sufMajzum;
    const useShort = key === 'anta' || key === 'antunna';
    return {
      arabic: amrPrefix + (useShort ? amrStemShort : amrStem) + amrSuf,
      ruleNote: `أمر الحاضر للوزن (${form})`,
      applicable: true,
    };
  }
  if (category === 'nahy') {
    const maj = conjugateAugmented(verb, p, 'majzum');
    return {
      arabic: 'لَا ' + maj.arabic,
      ruleNote: 'النهي: لا الناهية + المضارع المجزوم',
      applicable: true,
    };
  }

  return { arabic: verb.past, ruleNote: '', applicable: true };
}

function buildDerivedNouns(verb: VerbEntry, hasVerifiedRecord: boolean): DerivedNounResult[] {
  const [f, a, l, l2] = verb.radicals;
  const cls = verb.classification;
  const bab = verb.bab ?? 'فَعَلَ يَفْعُلُ';
  const { pres2 } = getBabVowels(bab);
  const isMutaaddi = verb.transitivity !== 'lazim';
  const isFormI = verb.form === 'I';

  const derived: DerivedNounResult[] = [];

  // 1. Masdar
  let masdarForm = verb.masdar || '—';
  let masdarPattern = 'سماعي';
  let masdarVerified = hasVerifiedRecord || !isFormI;
  if (!hasVerifiedRecord && isFormI) {
    masdarForm = 'يُرجع إلى المعجم (مصدر سماعي)';
    masdarPattern = 'أوزان الثلاثي السماعية';
    masdarVerified = false;
  } else if (!verb.masdar) {
    switch (verb.form) {
      case 'II': masdarForm = 'تَ' + f + SUKUN + a + KASRA + 'ي' + l + FATHATAN + 'ا'; masdarPattern = 'تَفْعِيلًا'; break;
      case 'III': masdarForm = 'مُ' + f + FATHA + 'ا' + a + FATHA + l + FATHA + 'ةً'; masdarPattern = 'مُفَاعَلَةً'; break;
      case 'IV': masdarForm = 'إِ' + f + SUKUN + a + FATHA + 'ا' + l + FATHATAN + 'ا'; masdarPattern = 'إِفْعَالًا'; break;
      case 'V': masdarForm = 'تَ' + f + FATHA + a + SHADDA + DAMMA + l + FATHATAN + 'ا'; masdarPattern = 'تَفَعُّلًا'; break;
      case 'VI': masdarForm = 'تَ' + f + FATHA + 'ا' + a + DAMMA + l + FATHATAN + 'ا'; masdarPattern = 'تَفَاعُلًا'; break;
      case 'VII': masdarForm = 'اِنْ' + f + KASRA + a + FATHA + 'ا' + l + FATHATAN + 'ا'; masdarPattern = 'اِنْفِعَالًا'; break;
      case 'VIII': masdarForm = 'اِ' + f + SUKUN + 'تِ' + a + FATHA + 'ا' + l + FATHATAN + 'ا'; masdarPattern = 'اِفْتِعَالًا'; break;
      case 'IX': masdarForm = 'اِ' + f + SUKUN + a + KASRA + l + FATHA + 'ا' + l + FATHATAN + 'ا'; masdarPattern = 'اِفْعِلَالًا'; break;
      case 'X': masdarForm = 'اِسْتِ' + f + SUKUN + a + FATHA + 'ا' + l + FATHATAN + 'ا'; masdarPattern = 'اِسْتِفْعَالًا'; break;
      case 'QI': masdarForm = f + FATHA + a + SUKUN + l + FATHA + l2 + 'ةً'; masdarPattern = 'فَعْلَلَةً'; break;
      case 'QII': masdarForm = 'تَ' + f + FATHA + a + SUKUN + l + DAMMA + l2 + FATHATAN + 'ا'; masdarPattern = 'تَفَعْلُلًا'; break;
    }
  }
  derived.push({
    category: 'masdar',
    arabicTitle: 'المصدر',
    englishTitle: 'Verbal Noun (Masdar)',
    filipinoTitle: 'Pangngalang Pandiwa (Masdar)',
    form: masdarForm,
    pattern: masdarPattern,
    applicable: true,
    verified: masdarVerified,
    note: isFormI
      ? {
          ar: 'مصادر الأفعال الثلاثية المجردة سماعية في الأصل وتُوثَّق من المعاجم.',
          en: 'Form I Masdars are predominantly lexical (Sama\'i) and verified from classical lexicons.',
          tl: 'Ang Masdar sa Form I ay karaniwang Sama\'i (nakabatay sa diksiyonaryo).',
        }
      : {
          ar: 'مصادر الأفعال المزيدة والرباعية قياسية مطردة.',
          en: 'Augmented and quadriliteral Masdars follow regular analogical (Qiyasi) patterns.',
          tl: 'Ang Masdar ng mga pinalawak na porma ay sumusunod sa regular na hulwaran (Qiyasi).',
        },
  });

  // 2. Ism Fa'il
  let ismFail = verb.ismFail ?? '';
  if (!ismFail) {
    if (isFormI) {
      if (cls === 'ajwaf_wawi' || cls === 'ajwaf_yayi') ismFail = f + FATHA + 'ائِ' + l + DAMMATAN;
      else if (cls === 'naqis_wawi' || cls === 'naqis_yayi' || cls === 'lafif_mafruq' || cls === 'lafif_maqrun') ismFail = f + FATHA + 'ا' + a + '\u064D';
      else if (cls === 'mudaaf') ismFail = f + FATHA + 'ا' + a + SHADDA + DAMMATAN;
      else ismFail = f + FATHA + 'ا' + a + KASRA + l + DAMMATAN;
    } else {
      const dummy: VerbEntry = { ...verb };
      const sample = conjugateAugmented(dummy, PRONOUNS[0], 'mudhari').arabic;
      ismFail = 'مُ' + sample.slice(2);
    }
  }
  derived.push({
    category: 'ism_fail',
    arabicTitle: 'اسم الفاعل',
    englishTitle: 'Active Participle',
    filipinoTitle: 'Gumaganap (Ism Fa\'il)',
    form: bab === 'فَعُلَ يَفْعُلُ' && !verb.ismFail ? 'تأتي الصفة المشبهة بدلًا منه (فَعِيل)' : ismFail,
    pattern: isFormI ? 'فَاعِلٌ' : 'مُـ + كسر ما قبل الآخر',
    applicable: bab !== 'فَعُلَ يَفْعُلُ',
    verified: hasVerifiedRecord || cls === 'sound',
    note: {
      ar: bab === 'فَعُلَ يَفْعُلُ' ? 'باب فَعُلَ اللازم يشتق منه الصفة المشبهة غالباً لا اسم الفاعل' : 'يُصاغ من الثلاثي على فَاعِل ومن غيره بإبدال حرف المضارعة ميمًا مضمومة وكسر ما قبل الآخر.',
      en: bab === 'فَعُلَ يَفْعُلُ' ? 'Form I Fa\'ula verbs typically form Sifah Mushabbahah rather than Fa\'il.' : 'Derived on فَاعِلٌ for Form I; for augmented forms replace Mudhari prefix with مُـ and kasra before the last radical.',
      tl: 'Nabubuo sa فَاعِلٌ para sa Form I; sa iba ay مُـ sa simula at kasra bago ang huling letra.',
    },
  });

  // 3. Ism Maf'ul
  let ismMaful = verb.ismMaful ?? '';
  if (!ismMaful && isMutaaddi) {
    if (isFormI) {
      if (cls === 'ajwaf_wawi') ismMaful = 'مَ' + f + DAMMA + 'و' + l + DAMMATAN;
      else if (cls === 'ajwaf_yayi') ismMaful = 'مَ' + f + KASRA + 'ي' + l + DAMMATAN;
      else if (cls === 'naqis_wawi') ismMaful = 'مَ' + f + SUKUN + a + DAMMA + 'وٌّ';
      else if (cls === 'naqis_yayi' || cls === 'lafif_mafruq' || cls === 'lafif_maqrun') ismMaful = 'مَ' + f + SUKUN + a + KASRA + 'يٌّ';
      else ismMaful = 'مَ' + f + SUKUN + a + DAMMA + 'و' + l + DAMMATAN;
    } else {
      const sample = conjugateAugmented(verb, PRONOUNS[0], 'passive_mudhari').arabic;
      ismMaful = 'مُ' + sample.slice(2);
    }
  }
  derived.push({
    category: 'ism_maful',
    arabicTitle: 'اسم المفعول',
    englishTitle: 'Passive Participle',
    filipinoTitle: 'Tumatanggap ng Kilos (Ism Maf\'ul)',
    form: isMutaaddi ? ismMaful || 'يُصاغ مع الجار والمجرور' : 'غير قياسي من اللازم مباشرةً',
    pattern: isFormI ? 'مَفْعُولٌ' : 'مُـ + فتح ما قبل الآخر',
    applicable: isMutaaddi,
    verified: hasVerifiedRecord || cls === 'sound',
    note: {
      ar: isMutaaddi ? 'يدل على من وقع عليه الفعل.' : 'الفعل اللازم لا يُشتق منه اسم مفعول مباشر إلا مقترنًا بشبه جملة.',
      en: isMutaaddi ? 'Denotes the entity receiving the action.' : 'Intransitive verbs do not yield a direct Ism Maf\'ul without a prepositional phrase.',
      tl: isMutaaddi ? 'Tumutukoy sa tumatanggap ng kilos.' : 'Ang pandiwang Lazim ay hindi direktang gumagawa ng Ism Maf\'ul.',
    },
  });

  // 4 & 5. Ism Zaman / Makan
  let zamanMakan = verb.ismZamanMakan ?? '';
  if (!zamanMakan) {
    if (isFormI) {
      if (cls === 'mithal_wawi') zamanMakan = 'مَ' + f + SUKUN + a + KASRA + l + DAMMATAN;
      else if (cls === 'naqis_wawi' || cls === 'naqis_yayi') zamanMakan = 'مَ' + f + SUKUN + a + FATHA + 'ى';
      else zamanMakan = 'مَ' + f + SUKUN + a + (pres2 === KASRA ? KASRA : FATHA) + l + DAMMATAN;
    } else {
      zamanMakan = ismMaful || 'على وزن اسم المفعول';
    }
  }
  derived.push({
    category: 'ism_makan',
    arabicTitle: 'اسما الزمان والمكان',
    englishTitle: 'Noun of Time & Place',
    filipinoTitle: 'Pangngalan ng Panahon at Lugar',
    form: zamanMakan,
    pattern: isFormI ? (pres2 === KASRA || cls === 'mithal_wawi' ? 'مَفْعِلٌ' : 'مَفْعَلٌ') : 'على وزن اسم المفعول',
    applicable: true,
    verified: hasVerifiedRecord || cls === 'sound',
    note: {
      ar: 'يُصاغ على مَفْعِل إذا كان مضارعه مكسور العين أو كان مثالًا واويًّا، وعلى مَفْعَل في غير ذلك.',
      en: 'Follows مَفْعِلٌ if Mudhari middle radical is Kasra or verb is Mithal Wawi; otherwise مَفْعَلٌ.',
      tl: 'Sumusunod sa مَفْعِلٌ kung Kasra ang gitna sa Mudhari o Mithal Wawi; kung hindi ay مَفْعَلٌ.',
    },
  });

  // 6. Ism Alah
  const isNaqis = cls === 'naqis_wawi' || cls === 'naqis_yayi' || cls === 'lafif_mafruq' || cls === 'lafif_maqrun';
  const alahApplicable = isFormI && isMutaaddi && !isNaqis && cls !== 'ajwaf_wawi';
  derived.push({
    category: 'ism_alah',
    arabicTitle: 'اسم الآلة',
    englishTitle: 'Noun of Instrument',
    filipinoTitle: 'Pangngalan ng Kasangkapan',
    form: verb.ismAlah ?? (alahApplicable ? 'مِ' + f + SUKUN + a + FATHA + l + DAMMATAN : 'لا يُقاس من غير الثلاثي المتعدي'),
    pattern: 'مِفْعَلٌ / مِفْعَالٌ / مِفْعَلَةٌ',
    applicable: Boolean(verb.ismAlah) || alahApplicable,
    verified: Boolean(verb.ismAlah),
    note: {
      ar: 'يُشتق اسم الآلة القياسي من الثلاثي المتعدي ذي المعنى المحسوس.',
      en: 'Analogically derived only from Form I transitive concrete-action verbs; requires lexical attestation.',
      tl: 'Karaniwang kinukuha lamang sa Form I na pandiwang may konkretong kasangkapan.',
    },
  });

  // 7. Ism Tafdil
  const tafdilApplicable = isFormI && !['أ', 'ح', 'س'].includes('') && verb.form === 'I';
  derived.push({
    category: 'ism_tafdil',
    arabicTitle: 'اسم التفضيل',
    englishTitle: 'Elative (Comparative / Superlative)',
    filipinoTitle: 'Pang-uring Pahambing/Pasukdol',
    form: verb.ismTafdil ?? (tafdilApplicable && cls === 'sound' ? 'أَ' + f + SUKUN + a + FATHA + l + DAMMATAN : `أَشَدُّ + ${masdarForm}`),
    pattern: isFormI ? 'أَفْعَلُ' : 'أَشَدُّ / أَكْثَرُ + المصدر',
    applicable: true,
    verified: Boolean(verb.ismTafdil) || !isFormI,
    note: {
      ar: isFormI
        ? 'يُصاغ على وزن أَفْعَلُ إذا تحققت شروطه السبعة (ثلاثي، تام، مثبت، متصرف، مبني للمعلوم، قابل للتفاوت، ليس الوصف منه على أفعل فعلاء).'
        : 'لا يُصاغ أفعل التفضيل مباشرة من غير الثلاثي، بل يُؤتى بمصدره منصوبًا بعد أَشَدُّ أو أَكْثَرُ.',
      en: isFormI
        ? 'Formed on أَفْعَلُ when the 7 classical conditions hold; otherwise use أَشَدُّ + Masdar.'
        : 'Augmented verbs cannot form أَفْعَلُ directly; use auxiliary أَشَدُّ/أَكْثَرُ + Masdar.',
      tl: isFormI
        ? 'Sumusunod sa أَفْعَلُ kung natutugunan ang 7 kondisyon.'
        : 'Para sa pinalawak na porma, gumamit ng أَشَدُّ/أَكْثَرُ + Masdar.',
    },
  });

  return derived;
}

function buildTransformationSteps(verb: VerbEntry): TrilingualText[] {
  const steps: TrilingualText[] = [];
  if (verb.morphologicalNotes) {
    steps.push(verb.morphologicalNotes);
  }
  const cls = verb.classification;
  if (cls === 'sound') {
    steps.push({
      ar: `الأصل الثلاثي/الرباعي (${verb.root}) خالٍ من حروف العلة والتضعيف والهمز، فيجري تصريفه على القياس المطرد دون إعلال أو حذف.`,
      en: `The root (${verb.root}) is sound (Salim) — free of weak letters, gemination, and Hamza — so it conjugates cleanly without I'lal deletions.`,
      tl: `Ang ugat (${verb.root}) ay Salim (walang mahinang letra, pagdodoble, o Hamza) kaya direkta itong nagbabago.`,
    });
  } else if (cls === 'ajwaf_wawi' || cls === 'ajwaf_yayi') {
    steps.push({
      ar: 'قاعدة الإعلال في الأجوف: ١) قلب العين ألفًا في الماضي لتحركها وانفتاح ما قبلها، ٢) نقل حركة العين إلى الفاء في المضارع، ٣) حذف العين لالتقاء الساكنين إذا سكنت اللام (مثل قُلْتُ، يَقُلْنَ، قُلْ).',
      en: "Ajwaf I'lal steps: (1) Medial weak letter becomes Alif in Madhi, (2) vowel transfers backward to the 1st radical in Mudhari, (3) medial weak letter drops before a vowelless 3rd radical (قُلْتُ, يَقُلْ, قُلْ).",
      tl: "Mga hakbang sa Ajwaf: (1) nagiging Alif sa Madhi, (2) inililipat ang patinig sa unang letra sa Mudhari, (3) nawawala kapag sukun ang huling letra.",
    });
  } else if (cls === 'mithal_wawi') {
    steps.push({
      ar: 'قاعدة المثال الواوي: تُحذف الواو في المضارع المعلوم إذا كانت عينه مكسورة (يَعِدُ) أو مفتوحة مع حرف حلق، وتُحذف همزة الوصل من الأمر تبعًا لذلك (عِدْ)، وتعود الواو في المجهول (يُوعَدُ).',
      en: 'Mithal Wawi rule: Initial Waw drops in active Mudhari (يَعِدُ) and Amr (عِدْ), eliminating the need for Hamzat al-Wasl, and returns in passive Mudhari (يُوعَدُ).',
      tl: 'Tuntunin ng Mithal Wawi: Nawawala ang unang Waw sa aktibong Mudhari (يَعِدُ) at Amr (عِدْ), at bumabalik sa passive (يُوعَدُ).',
    });
  } else if (cls.startsWith('naqis') || cls.startsWith('lafif')) {
    steps.push({
      ar: 'قاعدة الناقص واللفيف: تتغير اللام في الماضي بقلبها ألفًا أو حذفها مع تاء التأنيث وواو الجماعة، وتُحذف في المضارع المجزوم والأمر المفرد علامةً للجزم والبناء.',
      en: 'Naqis & Lafif rule: Final weak radical shifts to Alif in 3ms Madhi, drops before 3fs/3mp suffixes, and drops in Jussive and singular Amr as the grammatical marker.',
      tl: 'Tuntunin ng Naqis at Lafif: Nagbabago ang huling mahinang letra sa Madhi at tinatanggal sa Jussive at isahang Amr.',
    });
  } else if (cls === 'mudaaf') {
    steps.push({
      ar: 'قاعدة المضعف: يُدغَم المثلان عند تحرك الثاني، ويُفكُّ الإدغام وجوبًا عند سكون الثاني لاتصاله بضمير رفع متحرك (مَدَدْتُ، يَمْدُدْنَ).',
      en: 'Muda\'af rule: Identical 2nd and 3rd radicals merge via Idgham when the 3rd is vowelized, and separate (Fakk al-Idgham) when it takes Sukun before consonant suffixes.',
      tl: 'Tuntunin ng Muda\'af: Nagsasanib ang dalawang magkaparehong letra (Idgham) at naghihiwalay kapag may sukun ang pangatlong letra.',
    });
  }
  return steps;
}

export function conjugateVerb(verbInput: VerbEntry | {
  root: string;
  form: VerbForm;
  bab?: FormIBab;
  classification?: VerbClassification;
  transitivity?: VerbTransitivity;
}): TasreefOutput {
  let verb: VerbEntry;
  let hasVerifiedRecord = false;

  if ('id' in verbInput && verbInput.id) {
    verb = verbInput;
    hasVerifiedRecord = verb.meta.status === 'verified';
  } else {
    const cleanRadicals = stripDiacritics(verbInput.root)
      .replace(/[-ـ\s]/g, '')
      .split('')
      .filter(Boolean);
    const radicals = cleanRadicals.length >= 3 ? cleanRadicals : ['ف', 'ع', 'ل'];
    const rootJoined = radicals.join('-');
    const found = VERBS_DATABASE.find(
      (v) => v.root === rootJoined && v.form === verbInput.form && (!verbInput.bab || v.bab === verbInput.bab)
    );
    if (found) {
      verb = found;
      hasVerifiedRecord = true;
    } else {
      const cls = verbInput.classification ?? detectClassification(radicals);
      verb = {
        id: `custom-${rootJoined}-${verbInput.form}`,
        root: rootJoined,
        radicals,
        past: '',
        present: '',
        imperative: '',
        masdar: '',
        form: verbInput.form,
        bab: verbInput.bab ?? 'فَعَلَ يَفْعُلُ',
        classification: cls,
        transitivity: verbInput.transitivity ?? 'mutaaddi',
        meaning: { ar: `جذر مخصّص (${rootJoined})`, en: `Custom root (${rootJoined})`, tl: `Pasadyang ugat (${rootJoined})` },
        example: { ar: '', en: '', tl: '' },
        meta: {
          status: 'unverified',
          sources: ['Rule-based Tasreef Engine'],
        },
      };
    }
  }

  const categories: ConjugationCategory[] = [
    'madhi',
    'mudhari',
    'amr',
    'nahy',
    'mansub',
    'majzum',
    'passive_madhi',
    'passive_mudhari',
  ];

  const tables = {} as Record<ConjugationCategory, ConjugatedCell[]>;
  for (const cat of categories) {
    tables[cat] = PRONOUNS.map((p) => {
      const res =
        verb.form === 'I'
          ? conjugateFormI(verb, p, cat)
          : conjugateAugmented(verb, p, cat);
      return {
        pronounKey: p.key,
        pronounAr: p.ar,
        pronounLabelEn: p.labelEn,
        pronounLabelTl: p.labelTl,
        person: p.person,
        gender: p.gender,
        number: p.number,
        arabic: res.arabic,
        transliteration: res.applicable ? transliterateArabic(res.arabic) : '—',
        meaningEn: res.applicable ? `${p.meaningPrefixEn} (${verb.meaning.en})` : '—',
        meaningTl: res.applicable ? `${p.meaningPrefixTl} (${verb.meaning.tl})` : '—',
        ruleNote: res.ruleNote,
        applicable: res.applicable,
      };
    });
  }

  // Sync past/present/imperative if custom root
  if (!verb.past) verb.past = tables.madhi[0].arabic;
  if (!verb.present) verb.present = tables.mudhari[0].arabic;
  if (!verb.imperative) verb.imperative = tables.amr[6].arabic;

  const derived = buildDerivedNouns(verb, hasVerifiedRecord);
  const transformationSteps = buildTransformationSteps(verb);

  return {
    verb,
    tables,
    derived,
    transformationSteps,
    isConfidenceVerified: hasVerifiedRecord,
    verificationNotice: hasVerifiedRecord
      ? undefined
      : {
          ar: 'تم التوليد قياسيًّا عبر محرك الصرف؛ يُنصح بالتحقق المعجمي من باب الفعل الثلاثي ومصدره السماعي.',
          en: 'Generated via rule-based morphology. Form I Bab and Sama\'i Masdar require lexical dictionary verification.',
          tl: 'Nalikha gamit ang mga tuntunin ng Sarf. Ang Bab at Sama\'i Masdar sa Form I ay nangangailangan ng pagtiyak sa diksiyonaryo.',
        },
  };
}
