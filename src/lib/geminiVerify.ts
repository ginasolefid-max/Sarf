import { GoogleGenAI, Type } from '@google/genai';
import type { VerbEntry, VerbForm, VerbType, Transitivity } from '../types/sarf';
import { normalizeRoot } from './arabicUtils';

const VALID_FORMS: VerbForm[] = [
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'QI', 'QII', 'QIII', 'QIV',
];

const VALID_TYPES: VerbType[] = [
  'sound', 'hollow', 'defective', 'assimilated', 'doubled', 'hamzated',
];

const VALID_TRANS: Transitivity[] = ['transitive', 'intransitive', 'both'];


// Models tried in order when the chosen one is overloaded (503) or rate-limited (429).
const FALLBACK_MODELS = ['gemini-flash-latest', 'gemini-flash-lite-latest'];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function isBusyError(err: unknown): boolean {
  const msg = String((err as any)?.message ?? err ?? '').toLowerCase();
  return (
    msg.includes('503') ||
    msg.includes('429') ||
    msg.includes('unavailable') ||
    msg.includes('high demand') ||
    msg.includes('overloaded') ||
    msg.includes('resource_exhausted')
  );
}

async function generateWithFallback(ai: GoogleGenAI, primary: string, params: any) {
  const models = [primary, ...FALLBACK_MODELS.filter((m) => m !== primary)];
  let lastErr: unknown;
  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        return await ai.models.generateContent({ model, ...params });
      } catch (err) {
        lastErr = err;
        if (!isBusyError(err)) throw err; // bad key, bad request, etc.
        await sleep(1500 * (attempt + 1));
      }
    }
  }
  throw new Error(
    'Gemini is busy right now. Please try again in a minute. (' +
      String((lastErr as any)?.message ?? lastErr).slice(0, 120) +
      ')'
  );
}

export async function verifyVerbWithGemini(
  query: string,
  apiKey: string,
  modelName = 'gemini-4-hydrogen'
): Promise<VerbEntry> {
  if (!apiKey.trim()) {
    throw new Error('Please enter your Gemini API key in Settings first.');
  }

  const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

  const prompt = `Analyze the Arabic verb (or find the most common Arabic verb matching the query): "${query.trim()}".
Return a complete, accurately vocalized (with full harakat/tashkeel) morphological dictionary entry in JSON.
Rules:
- root must use hyphen-separated Arabic radical letters (3 or 4 radicals), e.g. "ك-ت-ب" or "ت-ر-ج-م".
- madhi (3ms past), mudhari (3ms present), masdar (verbal noun), ismFail (active participle), ismMaful (passive participle, or empty string if strictly intransitive), amr (2ms imperative), nahy (2ms prohibitive starting with "لَا ").
- form must be one of: I, II, III, IV, V, VI, VII, VIII, IX, X, QI, QII, QIII, QIV.
- letters must be 3 or 4.
- bab must show the Arabic pattern name, e.g. "فَعَلَ يَفْعُلُ" or "اِفْتَعَلَ يَفْتَعِلُ".
- verbType must be one of: sound, hollow, defective, assimilated, doubled, hamzated.
- transitivity must be one of: transitive, intransitive, both.
- Include 2-4 concise English meanings, 1-2 vocalized Arabic example sentences with English translations, and 1-3 tags.`;

  const response = await generateWithFallback(ai, modelName || 'gemini-4-hydrogen', {
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          root: { type: Type.STRING },
          madhi: { type: Type.STRING },
          mudhari: { type: Type.STRING },
          masdar: { type: Type.STRING },
          ismFail: { type: Type.STRING },
          ismMaful: { type: Type.STRING },
          amr: { type: Type.STRING },
          nahy: { type: Type.STRING },
          ismZamanMakan: { type: Type.STRING },
          ismAlah: { type: Type.STRING },
          form: { type: Type.STRING },
          letters: { type: Type.INTEGER },
          bab: { type: Type.STRING },
          verbType: { type: Type.STRING },
          transitivity: { type: Type.STRING },
          meanings: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          examples: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                ar: { type: Type.STRING },
                en: { type: Type.STRING },
              },
              required: ['ar', 'en'],
            },
          },
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: [
          'root',
          'madhi',
          'mudhari',
          'masdar',
          'ismFail',
          'amr',
          'nahy',
          'form',
          'letters',
          'bab',
          'verbType',
          'transitivity',
          'meanings',
          'examples',
        ],
      },
    },
  });

  const text = (response.text || '').trim();
  if (!text) {
    throw new Error('Gemini returned an empty response.');
  }

  const parsed = JSON.parse(text);
  const normRoot = normalizeRoot(parsed.root || '');
  const letterCount = normRoot.split('-').filter(Boolean).length === 4 ? 4 : 3;
  const form: VerbForm = VALID_FORMS.includes(parsed.form) ? parsed.form : 'I';
  const verbType: VerbType = VALID_TYPES.includes(parsed.verbType) ? parsed.verbType : 'sound';
  const transitivity: Transitivity = VALID_TRANS.includes(parsed.transitivity)
    ? parsed.transitivity
    : 'transitive';

  return {
    id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    root: normRoot || parsed.root,
    madhi: parsed.madhi || '',
    mudhari: parsed.mudhari || '',
    masdar: parsed.masdar || '',
    ismFail: parsed.ismFail || '',
    ismMaful: parsed.ismMaful || '',
    amr: parsed.amr || '',
    nahy: parsed.nahy || '',
    ismZamanMakan: parsed.ismZamanMakan || undefined,
    ismAlah: parsed.ismAlah || undefined,
    form,
    letters: parsed.letters === 4 ? 4 : letterCount,
    bab: parsed.bab || '',
    verbType,
    transitivity,
    meanings: Array.isArray(parsed.meanings) ? parsed.meanings : [],
    examples: Array.isArray(parsed.examples) ? parsed.examples : [],
    tags: Array.isArray(parsed.tags) && parsed.tags.length > 0 ? parsed.tags : ['verified'],
    source: 'online-verified',
    createdAt: Date.now(),
  };
}
