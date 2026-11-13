import type { VerbForm } from '../types/sarf';

const HARAKAT_REGEX = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const TATWEEL_REGEX = /\u0640/g;

export function stripHarakat(text: string): string {
  return text.replace(HARAKAT_REGEX, '').replace(TATWEEL_REGEX, '');
}

export function normalizeArabic(text: string): string {
  return stripHarakat(text)
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[ؤ]/g, 'و')
    .replace(/[ئ]/g, 'ي')
    .replace(/ء/g, '')
    .replace(/[-_\s]+/g, ' ')
    .trim();
}

export function normalizeRoot(root: string): string {
  const letters = stripHarakat(root)
    .replace(/[-_\s./]+/g, '')
    .split('')
    .filter((ch) => /[\u0621-\u064A]/.test(ch));
  return letters.join('-');
}

export function getRootLetters(root: string): string[] {
  return stripHarakat(root)
    .replace(/[-_\s./]+/g, '')
    .split('')
    .filter((ch) => /[\u0621-\u064A]/.test(ch));
}

export function isArabicText(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

/**
 * Simple Levenshtein distance for fuzzy matching when exact/substring search has no direct hit
 */
export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[] = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost);
      prev = temp;
    }
  }
  return dp[n];
}

export interface SegmentedGrapheme {
  text: string; // Base letter + attached diacritics
  role: 'root' | 'affix' | 'space';
}

const COMBINING_MARK_RE = /[\u064B-\u065F\u0670]/;

export function splitGraphemes(word: string): string[] {
  const clusters: string[] = [];
  for (const ch of word) {
    if (COMBINING_MARK_RE.test(ch) && clusters.length > 0) {
      clusters[clusters.length - 1] += ch;
    } else {
      clusters.push(ch);
    }
  }
  return clusters;
}

/**
 * Segments an Arabic conjugated verb or derived noun into root radical graphemes
 * vs prefix/infix/suffix affixes so the UI can color them distinctly.
 */
export function segmentWordByRoot(
  word: string,
  root: string,
  form: VerbForm
): SegmentedGrapheme[] {
  const rawRoots = getRootLetters(root);
  const normRoots = rawRoots.map((r) => normalizeArabicLetter(r));

  // Split by space (e.g. "لَا تَكْتُبْ", "لَمْ يَكْتُبْ", "لَنْ يَكْتُبَ")
  const tokens = word.split(' ');
  const result: SegmentedGrapheme[] = [];

  tokens.forEach((token, tokenIdx) => {
    if (tokenIdx > 0) {
      result.push({ text: ' ', role: 'space' });
    }
    // Particles like لا, لم, لن are purely affixes/particles
    const bareToken = stripHarakat(token);
    if (bareToken === 'لا' || bareToken === 'لم' || bareToken === 'لن') {
      result.push({ text: token, role: 'affix' });
      return;
    }

    const clusters = splitGraphemes(token);
    const roles: ('root' | 'affix')[] = new Array(clusters.length).fill('affix');

    // Determine prefix boundary heuristically by verb anatomy + greedy ordered root matching
    // Skip known leading prefix letters so e.g. ت in تَكْتُبُ or س in اِسْتَغْفَرَ isn't misread as root ت/س
    let startIdx = 0;
    const bareClusters = clusters.map((c) => stripHarakat(c));

    // Leading hamzatul wasl / qat / mudhari prefix
    const firstBare = bareClusters[0];
    if (
      (form === 'X' && bareClusters.slice(0, 3).join('') === 'است') ||
      (form === 'X' && bareClusters.slice(0, 3).join('') === 'يست') ||
      (form === 'X' && bareClusters.slice(0, 3).join('') === 'تست') ||
      (form === 'X' && bareClusters.slice(0, 3).join('') === 'نست') ||
      (form === 'X' && bareClusters.slice(0, 3).join('') === 'أست') ||
      (form === 'X' && bareClusters.slice(0, 3).join('') === 'مست')
    ) {
      startIdx = 3;
    } else if (
      (form === 'VII' && ['ان', 'ين', 'تن', 'نن', 'أن', 'من'].includes(bareClusters.slice(0, 2).join(''))) ||
      (form === 'V' && ['ت', 'يت', 'تت', 'نت', 'أت', 'مت'].includes(bareClusters.slice(0, 2).join(''))) ||
      (form === 'VI' && ['ت', 'يت', 'تت', 'نت', 'أت', 'مت'].includes(bareClusters.slice(0, 2).join(''))) ||
      (form === 'QII' && ['ت', 'يت', 'تت', 'نت', 'أت', 'مت'].includes(bareClusters.slice(0, 2).join('')))
    ) {
      startIdx = bareClusters[0] === 'ت' ? 1 : 2;
    } else if (
      ['ي', 'ت', 'ن', 'أ', 'م'].includes(firstBare) &&
      clusters.length > rawRoots.length &&
      !(rawRoots[0] === firstBare && bareClusters.length === rawRoots.length)
    ) {
      startIdx = 1;
    } else if (['ا', 'إ', 'أ'].includes(firstBare) && clusters.length > rawRoots.length) {
      startIdx = 1;
    }

    // Match root radicals in order from startIdx onward
    let rIdx = 0;
    for (let i = startIdx; i < clusters.length && rIdx < normRoots.length; i++) {
      const bare = bareClusters[i];
      const norm = normalizeArabicLetter(bare);
      const expectedNorm = normRoots[rIdx];
      const expectedRaw = rawRoots[rIdx];

      // In Form VIII, infix ت/ط/د appears right after R1 (so skip the infix slot if matched)
      if (form === 'VIII' && rIdx === 1 && ['ت', 'ط', 'د'].includes(bare) && norm !== expectedNorm) {
        continue;
      }
      // In Form III / VI, infix ا appears right after R1
      if ((form === 'III' || form === 'VI') && rIdx === 1 && bare === 'ا' && norm !== expectedNorm) {
        continue;
      }

      // Direct match or weak-letter transformation (و/ي <-> ا/ى/ئ/ؤ)
      const isWeakRoot = expectedRaw === 'و' || expectedRaw === 'ي' || expectedRaw === 'أ' || expectedRaw === 'ء';
      const isWeakRealization = ['ا', 'ى', 'و', 'ي', 'ئ', 'ؤ', 'أ', 'إ', 'آ', 'ء'].includes(bare);

      if (norm === expectedNorm || (isWeakRoot && isWeakRealization)) {
        roles[i] = 'root';
        rIdx++;
      } else if (
        // Handle Form VIII assimilated first radical (و + ت -> تّ)
        form === 'VIII' &&
        rIdx === 0 &&
        (expectedRaw === 'و' || expectedRaw === 'ي' || expectedRaw === 'أ') &&
        bare === 'ت'
      ) {
        roles[i] = 'root';
        rIdx++;
      }
    }

    // If doubled verb (C2 == C3) and shadda is on C2 cluster, only 2 root clusters appear in surface form
    // That's already highlighted on the geminated cluster!

    for (let i = 0; i < clusters.length; i++) {
      result.push({ text: clusters[i], role: roles[i] });
    }
  });

  return result;
}

function normalizeArabicLetter(ch: string): string {
  if ('أإآٱءئؤ'.includes(ch)) return 'أ';
  if (ch === 'ى') return 'ي';
  if (ch === 'ة') return 'ه';
  return ch;
}
