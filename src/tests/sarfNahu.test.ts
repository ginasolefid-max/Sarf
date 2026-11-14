import { describe, expect, it } from 'vitest';
import { SARF_CHAPTERS } from '../data/sarfChapters';
import { NAHU_CHAPTERS } from '../data/nahuChapters';
import { VERBS_DATABASE } from '../data/verbsDatabase';
import {
  NAHU_DICTIONARY,
  PARTICLES_REFERENCE,
  VOCAB_DICTIONARY,
} from '../data/dictionaries';
import {
  buildExamQuestions,
  getChapterQuiz,
  PRACTICE_CATEGORIES,
} from '../data/quizzesData';
import { conjugateVerb } from '../engine/tasreefEngine';
import { analyzeArabicSentence, PRESET_IRAB_SENTENCES } from '../engine/irabEngine';
import {
  CURRENT_SCHEMA_VERSION,
  migrateProgress,
  scheduleSRSCard,
} from '../db/storage';

describe('Sarf & Nahu Curriculum Integrity', () => {
  it('provides 24 Sarf chapters and 22 Nahu chapters with 10+ quiz questions each', () => {
    expect(SARF_CHAPTERS.length).toBe(24);
    expect(NAHU_CHAPTERS.length).toBe(22);

    for (const ch of [...SARF_CHAPTERS, ...NAHU_CHAPTERS]) {
      expect(ch.titleAr.length).toBeGreaterThan(0);
      expect(ch.objectives.length).toBeGreaterThan(0);
      expect(ch.meta.sources.length).toBeGreaterThan(0);
      const quiz = getChapterQuiz(ch.id);
      expect(quiz.length).toBeGreaterThanOrEqual(10);
    }
  });

  it('includes all 15 practice categories, 7 exam modes, and all 3 dictionaries', () => {
    expect(PRACTICE_CATEGORIES.length).toBe(15);
    expect(VERBS_DATABASE.length).toBeGreaterThanOrEqual(30);
    expect(NAHU_DICTIONARY.length).toBeGreaterThanOrEqual(20);
    expect(VOCAB_DICTIONARY.length).toBeGreaterThanOrEqual(30);
    expect(PARTICLES_REFERENCE.length).toBeGreaterThanOrEqual(10);

    const modes = ['sarf', 'nahu', 'combined', 'conjugation', 'irab', 'vocabulary', 'advanced'] as const;
    for (const m of modes) {
      const qs = buildExamQuestions(m, 10);
      expect(qs.length).toBe(10);
    }
  });
});

describe('Tasreef Conjugation Engine (Sarf)', () => {
  it('conjugates sound Form I verb كَتَبَ across all 14 pronouns, active & passive, Amr & Nahy', () => {
    const out = conjugateVerb({ root: 'ك-ت-ب', form: 'I', bab: 'فَعَلَ يَفْعُلُ' });
    expect(out.isConfidenceVerified).toBe(true);
    expect(out.tables.madhi).toHaveLength(14);
    expect(out.tables.mudhari).toHaveLength(14);
    expect(out.tables.madhi[0].arabic).toBe('كَتَبَ');
    expect(out.tables.madhi[12].arabic).toBe('كَتَبْتُ');
    expect(out.tables.mudhari[0].arabic).toBe('يَكْتُبُ');
    expect(out.tables.amr[6].arabic).toBe('اُكْتُبْ');
    expect(out.tables.nahy[6].arabic).toBe('لَا تَكْتُبْ');
    expect(out.tables.passive_madhi[0].arabic).toBe('كُتِبَ');
    expect(out.tables.passive_mudhari[0].arabic).toBe('يُكْتَبُ');
  });

  it('handles weak verbs accurately: Mithal (وَعَدَ), Ajwaf (قَالَ/كَانَ/بَاعَ), Naqis (دَعَا/رَمَى), Lafif (وَقَى), Mudaaf (مَدَّ), Mahmuz (أَخَذَ)', () => {
    const waada = conjugateVerb({ root: 'و-ع-د', form: 'I', bab: 'فَعَلَ يَفْعِلُ' });
    const waadaVerified = conjugateVerb(VERBS_DATABASE.find((v) => v.root === 'و-ع-د')!);
    expect(waadaVerified.tables.mudhari[0].arabic).toBe('يَعِدُ');
    expect(waadaVerified.tables.amr[6].arabic).toBe('عِدْ');
    expect(waada.tables.madhi[0].arabic).toBe('وَعَدَ');

    const qala = conjugateVerb(VERBS_DATABASE.find((v) => v.root === 'ق-و-ل')!);
    expect(qala.tables.madhi[0].arabic).toBe('قَالَ');
    expect(qala.tables.madhi[12].arabic).toBe('قُلْتُ');
    expect(qala.tables.majzum[0].arabic).toBe('يَقُلْ');
    expect(qala.tables.amr[6].arabic).toBe('قُلْ');
    expect(qala.tables.passive_madhi[0].arabic).toBe('قِيلَ');

    const baa = conjugateVerb(VERBS_DATABASE.find((v) => v.root === 'ب-ي-ع')!);
    expect(baa.tables.madhi[12].arabic).toBe('بِعْتُ');
    expect(baa.tables.amr[6].arabic).toBe('بِعْ');

    const daa = conjugateVerb(VERBS_DATABASE.find((v) => v.root === 'د-ع-و')!);
    expect(daa.tables.mudhari[0].arabic).toBe('يَدْعُو');
    expect(daa.tables.majzum[0].arabic).toBe('يَدْعُ');
    expect(daa.tables.amr[6].arabic).toBe('اُدْعُ');

    const rama = conjugateVerb(VERBS_DATABASE.find((v) => v.root === 'ر-م-ي')!);
    expect(rama.tables.mudhari[0].arabic).toBe('يَرْمِي');
    expect(rama.tables.majzum[0].arabic).toBe('يَرْمِ');
    expect(rama.tables.amr[6].arabic).toBe('اِرْمِ');

    const waqa = conjugateVerb(VERBS_DATABASE.find((v) => v.root === 'و-ق-ي')!);
    expect(waqa.tables.mudhari[0].arabic).toBe('يَقِي');
    expect(waqa.tables.amr[6].arabic).toBe('قِ');

    const madda = conjugateVerb(VERBS_DATABASE.find((v) => v.root === 'م-د-د')!);
    expect(madda.tables.madhi[0].arabic.normalize('NFC')).toBe('مَدَّ'.normalize('NFC'));
    expect(madda.tables.madhi[12].arabic).toBe('مَدَدْتُ');

    const akhadha = conjugateVerb(VERBS_DATABASE.find((v) => v.root === 'أ-خ-ذ')!);
    expect(akhadha.tables.amr[6].arabic).toBe('خُذْ');
    expect(akhadha.tables.mudhari[12].arabic).toBe('آخُذُ');
  });

  it('supports Forms II-X and Quadriliterals QI/QII and flags custom unverified Form I Masdars honestly', () => {
    const fX = conjugateVerb(VERBS_DATABASE.find((v) => v.form === 'X' && v.root === 'غ-ف-ر')!);
    expect(fX.tables.madhi[0].arabic).toBe('اِسْتَغْفَرَ');
    expect(fX.tables.mudhari[0].arabic).toBe('يَسْتَغْفِرُ');
    expect(fX.tables.amr[6].arabic).toBe('اِسْتَغْفِرْ');

    const qi = conjugateVerb(VERBS_DATABASE.find((v) => v.form === 'QI')!);
    expect(qi.tables.madhi[0].arabic).toBe('تَرْجَمَ');
    expect(qi.tables.mudhari[0].arabic).toBe('يُتَرْجِمُ');

    const custom = conjugateVerb({ root: 'ز-ر-ع', form: 'I', bab: 'فَعَلَ يَفْعَلُ' });
    expect(custom.isConfidenceVerified).toBe(false);
    expect(custom.verificationNotice).toBeDefined();
  });
});

describe("I'rab Analyzer Engine (Nahu)", () => {
  it('returns verified full parses for all preset sentences', () => {
    expect(PRESET_IRAB_SENTENCES.length).toBeGreaterThanOrEqual(6);
    for (const preset of PRESET_IRAB_SENTENCES) {
      const parsed = analyzeArabicSentence(preset.sentence);
      expect(parsed.isVerifiedPreset).toBe(true);
      expect(parsed.tokens.length).toBeGreaterThan(0);
    }
  });

  it('parses Inna, Kana, Prepositions, and Jazm accurately and flags ambiguity on unvocalized text', () => {
    const innaParse = analyzeArabicSentence('إِنَّ الطَّالِبَ مُجْتَهِدٌ');
    expect(innaParse.tokens[1].roleAr).toContain('اسم');
    expect(innaParse.tokens[1].irabState).toBe('منصوب');
    expect(innaParse.tokens[2].irabState).toBe('مرفوع');

    const kanaParse = analyzeArabicSentence('كَانَ الْجَوُّ جَمِيلًا');
    expect(kanaParse.tokens[1].irabState).toBe('مرفوع');
    expect(kanaParse.tokens[2].irabState).toBe('منصوب');

    const prepParse = analyzeArabicSentence('ذَهَبَ مُحَمَّدٌ إِلَى الْمَدْرَسَةِ');
    expect(prepParse.tokens[2].irabState).toBe('مبني');
    expect(prepParse.tokens[3].irabState).toBe('مجرور');

    const unvocalized = analyzeArabicSentence('كتب الولد الرسالة');
    expect(unvocalized.isVerifiedPreset).toBe(false);
    expect(unvocalized.hasAmbiguity).toBe(true);
    expect(unvocalized.limitationNote).toBeDefined();
  });
});

describe('Storage Migration & SM-2 Spaced Repetition', () => {
  it('migrates partial legacy v5 progress backward-compatibly into v6 schema', () => {
    const legacy = {
      completedChapters: ['sarf-01', 'nahu-01'],
      streakDays: 5,
      language: 'tl',
      theme: 'dark',
    };
    const migrated = migrateProgress(legacy);
    expect(migrated.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
    expect(migrated.completedChapters).toEqual(['sarf-01', 'nahu-01']);
    expect(migrated.streakDays).toBe(5);
    expect(migrated.settings.language).toBe('tl');
    expect(migrated.settings.theme).toBe('dark');
    expect(Object.keys(migrated.srsCards).length).toBeGreaterThan(20);
  });

  it('schedules SRS cards following SM-2 intervals', () => {
    const migrated = migrateProgress({});
    const first = Object.values(migrated.srsCards)[0];
    const step1 = scheduleSRSCard(first, 3, 1_000_000);
    expect(step1.repetitions).toBe(1);
    expect(step1.intervalDays).toBe(1);

    const step2 = scheduleSRSCard(step1, 3, 2_000_000);
    expect(step2.repetitions).toBe(2);
    expect(step2.intervalDays).toBe(6);

    const reset = scheduleSRSCard(step2, 1, 3_000_000);
    expect(reset.repetitions).toBe(0);
    expect(reset.intervalDays).toBe(1);
  });
});
