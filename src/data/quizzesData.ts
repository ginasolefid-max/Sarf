import {
  AcademicMeta,
  QuestionDifficulty,
  QuizQuestion,
  SRSCard,
  TextbookChapter,
  TrilingualText,
} from '../types/arabic';
import { SARF_CHAPTERS } from './sarfChapters';
import { NAHU_CHAPTERS } from './nahuChapters';
import { VERBS_DATABASE } from './verbsDatabase';
import { PARTICLES_REFERENCE, VOCAB_DICTIONARY } from './dictionaries';

const SRC_VERIFIED: AcademicMeta = {
  status: 'verified',
  sources: ['شذا العرف في فن الصرف', 'شرح ابن عقيل على ألفية ابن مالك', 'النحو الوافي'],
};

export interface PracticeCategoryMeta {
  id: string;
  discipline: 'sarf' | 'nahu';
  title: TrilingualText;
  description: TrilingualText;
}

export const PRACTICE_CATEGORIES: PracticeCategoryMeta[] = [
  { id: 'verb_identification', discipline: 'sarf', title: { ar: 'تمييز أنواع الأفعال', en: 'Verb Identification', tl: 'Pagkilala sa Pandiwa' }, description: { ar: 'صحيح ومعتل ومجرد ومزيد ولازم ومتعدٍّ.', en: 'Identify sound, weak, Form I–X, and transitivity.', tl: 'Kilalanin ang uri ng pandiwa at anyo.' } },
  { id: 'root_extraction', discipline: 'sarf', title: { ar: 'استخراج الجذر اللغوي', en: 'Root Extraction', tl: 'Pagkuha ng Ugat (Root)' }, description: { ar: 'تجريد الكلمة من أحرف الزيادة وردها إلى أصلها.', en: 'Strip affixes to find 3- or 4-letter roots.', tl: 'Hanapin ang ugat na letra ng salita.' } },
  { id: 'mizan', discipline: 'sarf', title: { ar: 'الميزان الصرفي', en: 'Morphological Weight (Mizan)', tl: 'Timbangan (Mizan)' }, description: { ar: 'وزن الكلمات والمحذوفات والزيادات.', en: 'Match Arabic words to ف-ع-ل morphological scales.', tl: 'Itugma ang mga salita sa ف-ع-ل scale.' } },
  { id: 'conjugation', discipline: 'sarf', title: { ar: 'تصريف الأفعال', en: 'Verb Conjugation (Tasreef)', tl: 'Pagbabanghay (Tasreef)' }, description: { ar: 'إسناد الماضي والمضارع والأمر والنهي للضمائر.', en: 'Conjugate across 14 pronouns, tenses, and moods.', tl: 'Ibanghay sa 14 panghalip at panahunan.' } },
  { id: 'weak_verbs', discipline: 'sarf', title: { ar: 'تحولات الأفعال المعتلة', en: 'Weak Verb Transformations', tl: 'Pagbabago ng Mahinang Pandiwa' }, description: { ar: 'قواعد الإعلال والحذف في المثال والأجوف والناقص واللفيف.', en: 'Master I\'lal and deletion rules in weak roots.', tl: 'Mga tuntunin sa pagbabago ng Mahinang Pandiwa.' } },
  { id: 'masdar', discipline: 'sarf', title: { ar: 'بناء المصادر', en: 'Masdar Formation', tl: 'Pagbuo ng Masdar' }, description: { ar: 'المصادر القياسية والسماعية والميمية والمرة والهيئة.', en: 'Distinguish standard, Mimi, single-instance, and manner Masdars.', tl: 'Iba-ibang uri ng Masdar at tuntunin.' } },
  { id: 'derived_nouns', discipline: 'sarf', title: { ar: 'المشتقات', en: 'Derived Nouns', tl: 'Mga Hinangong Pangngalan' }, description: { ar: 'اسم الفاعل والمفعول والمكان والزمان والآلة والتفضيل.', en: 'Form active/passive participles, nouns of place, time, and instrument.', tl: 'Pagbuo ng Ism Fa\'il, Maf\'ul, at iba pa.' } },
  { id: 'active_passive', discipline: 'sarf', title: { ar: 'المعلوم والمجهول', en: 'Active vs Passive', tl: 'Aktibo vs Pasibo' }, description: { ar: 'ضبط الفعل عند بنائه للمجهول ورفع نائب الفاعل.', en: 'Convert active verbs and clauses to passive.', tl: 'Paglipat mula aktibo patungong pasibo.' } },
  { id: 'noun_gender_number', discipline: 'sarf', title: { ar: 'التذكير والتأنيث والعدد', en: 'Noun Gender & Number', tl: 'Kasarian at Bilang ng Pangngalan' }, description: { ar: 'المفرد والمثنى والجمع والمقصور والمنقوص والممدود.', en: 'Duals, sound/broken plurals, and defective noun endings.', tl: 'Isahan, dalawahan, maramihan, at kasarian.' } },
  { id: 'sentence_type', discipline: 'nahu', title: { ar: 'الجملة الاسمية والفعلية', en: 'Sentence Type (Nominal/Verbal)', tl: 'Uri ng Pangungusap' }, description: { ar: 'تحديد نوع الجملة وأركانها الأساسية.', en: 'Classify Mubtada/Khabar vs Fi\'l/Fa\'il sentences.', tl: 'Tukuyin ang Nominal at Verbal na pangungusap.' } },
  { id: 'case_determination', discipline: 'nahu', title: { ar: 'تحديد الحالة الإعرابية', en: "Case Determination (Raf'/Nasb/Jarr/Jazm)", tl: 'Pagtukoy sa Kaso' }, description: { ar: 'معرفة سبب الرفع والنصب والجر والجزم وعلاماتها.', en: 'Identify nominative, accusative, genitive, and jussive states.', tl: 'Kilalanin ang Raf\', Nasb, Jarr, at Jazm.' } },
  { id: 'word_irab', discipline: 'nahu', title: { ar: 'الإعراب التفصيلي', en: "Word-by-word I'rab", tl: "Detalyadong I'rab" }, description: { ar: 'تحديد الوظيفة النحوية والعامل وعلامة الإعراب.', en: 'Analyze grammatical role, marker, and governor (Amil).', tl: 'Suriin ang papel, palatandaan, at Amil.' } },
  { id: 'kana_inna', discipline: 'nahu', title: { ar: 'أحكام كان وأخواتها وإنَّ وأخواتها', en: 'Kana & Inna Rules', tl: 'Tuntunin ng Kana at Inna' }, description: { ar: 'عمل النواسخ الفعلية والحرفية في المبتدأ والخبر.', en: 'Apply Nawasikh shifts on nominal subjects and predicates.', tl: 'Epekto ng Kana at Inna sa pangungusap.' } },
  { id: 'particles', discipline: 'nahu', title: { ar: 'استعمال الأدوات والحروف', en: 'Particles Usage', tl: 'Paggamit ng mga Kataga' }, description: { ar: 'أدوات النفي والشرط والاستفهام والاستثناء والجر.', en: 'Choose the right particle (لَمْ/لَنْ/إِلَّا/فِي) by context.', tl: 'Tamang paggamit ng mga katagang Arabe.' } },
  { id: 'error_correction', discipline: 'nahu', title: { ar: 'تصحيح الأخطاء النحوية والصرفية', en: 'Grammar Error Correction', tl: 'Pagwawasto ng Mali' }, description: { ar: 'كشف اللحن وتصحيح ضبط الكلمة أو صياغتها.', en: 'Spot grammatical or morphological errors and fix them.', tl: 'Hanapin at itama ang maling balarila.' } },
];

export interface ArrangementExercise {
  id: string;
  category: string;
  difficulty: QuestionDifficulty;
  prompt: TrilingualText;
  tokens: string[];
  correctSentence: string;
  explanation: TrilingualText;
}

export interface TypingExercise {
  id: string;
  category: string;
  discipline: 'sarf' | 'nahu';
  difficulty: QuestionDifficulty;
  prompt: TrilingualText;
  hintAr: string;
  acceptedAnswers: string[];
  canonicalAnswer: string;
  explanation: TrilingualText;
}

export const ARRANGEMENT_EXERCISES: ArrangementExercise[] = [
  {
    id: 'arr-01',
    category: 'sentence_type',
    difficulty: 'beginner',
    prompt: { ar: 'رتّب الكلمات لتكوين جملة فعلية صحيحة:', en: 'Arrange the words into a valid verbal sentence (VSO):', tl: 'Ayusin ang mga salita upang makabuo ng tamang pangungusap:' },
    tokens: ['الدَّرْسَ', 'كَتَبَ', 'الطَّالِبُ'],
    correctSentence: 'كَتَبَ الطَّالِبُ الدَّرْسَ',
    explanation: { ar: 'تبدأ الجملة الفعلية بالفعل (كَتَبَ) ثم الفاعل المرفوع (الطَّالِبُ) ثم المفعول به المنصوب (الدَّرْسَ).', en: 'Verbal sentences start with the verb (كَتَبَ), followed by Marfu\' subject (الطَّالِبُ) and Mansub object (الدَّرْسَ).', tl: 'Nagsisimula sa pandiwa (كَتَبَ), kasunod ang simuno (الطَّالِبُ) at layon (الدَّرْسَ).' },
  },
  {
    id: 'arr-02',
    category: 'kana_inna',
    difficulty: 'beginner',
    prompt: { ar: 'رتّب الكلمات لتكوين جملة مؤكَّدة بـ(إِنَّ):', en: 'Arrange the words into a valid sentence introduced by إِنَّ:', tl: 'Ayusin ang pangungusap na pinangungunahan ng إِنَّ:' },
    tokens: ['مُجْتَهِدٌ', 'إِنَّ', 'الطَّالِبَ'],
    correctSentence: 'إِنَّ الطَّالِبَ مُجْتَهِدٌ',
    explanation: { ar: 'تدخل (إِنَّ) أول الجملة فتنصب اسمها (الطَّالِبَ) وترفع خبرها (مُجْتَهِدٌ).', en: 'إِنَّ opens the clause, making its noun Mansub (الطَّالِبَ) and its predicate Marfu\' (مُجْتَهِدٌ).', tl: 'Binubuksan ng إِنَّ ang sugnay: Mansub ang اسم إِنَّ at Marfu\' ang خبر.' },
  },
  {
    id: 'arr-03',
    category: 'kana_inna',
    difficulty: 'intermediate',
    prompt: { ar: 'رتّب الكلمات لتكوين جملة صحيحة مع (كَانَ):', en: 'Arrange the words with the defective verb كَانَ:', tl: 'Ayusin ang pangungusap gamit ang كَانَ:' },
    tokens: ['جَمِيلًا', 'الْجَوُّ', 'كَانَ'],
    correctSentence: 'كَانَ الْجَوُّ جَمِيلًا',
    explanation: { ar: 'ترفع (كَانَ) اسمها (الْجَوُّ) وتنصب خبرها (جَمِيلًا).', en: 'كَانَ keeps its subject Marfu\' (الْجَوُّ) and puts its predicate in Nasb (جَمِيلًا).', tl: 'Pinapanatili ng كَانَ ang Marfu\' na simuno at ginagawang Mansub ang panaguri.' },
  },
  {
    id: 'arr-04',
    category: 'particles',
    difficulty: 'intermediate',
    prompt: { ar: 'رتّب جملة منفيّة في الماضي باستخدام أداة الجزم:', en: 'Arrange a past-negated sentence using the jussive particle لَمْ:', tl: 'Ayusin ang pangungusap gamit ang لَمْ:' },
    tokens: ['الطَّالِبُ', 'يَكْتُبْ', 'لَمْ', 'الدَّرْسَ'],
    correctSentence: 'لَمْ يَكْتُبْ الطَّالِبُ الدَّرْسَ',
    explanation: { ar: 'أداة الجزم (لَمْ) تسبق الفعل المضارع وتجزمه بالسكون (يَكْتُبْ).', en: 'لَمْ precedes the Mudhari verb and triggers Jazm (يَكْتُبْ).', tl: 'Ang لَمْ ay nauuna sa Mudhari at nagbibigay ng Jazm.' },
  },
  {
    id: 'arr-05',
    category: 'case_determination',
    difficulty: 'intermediate',
    prompt: { ar: 'رتّب جملة اسمية تحتوي على إضافة (مضاف ومضاف إليه):', en: 'Arrange a nominal sentence containing an Idafa phrase:', tl: 'Ayusin ang pangungusap na may Idafa:' },
    tokens: ['مَفْتُوحٌ', 'الْمَسْجِدِ', 'بَابُ'],
    correctSentence: 'بَابُ الْمَسْجِدِ مَفْتُوحٌ',
    explanation: { ar: 'المضاف (بَابُ) مبتدأ مرفوع مجرد من أل والتنوين، والمضاف إليه (الْمَسْجِدِ) مجرور، والخبر (مَفْتُوحٌ) مرفوع.', en: 'Mudaf (بَابُ) is Mubtada without Al/Tanwin, Mudaf Ilayh (الْمَسْجِدِ) is Majrur, Khabar (مَفْتُوحٌ) is Marfu\'.', tl: 'Mudaf (بَابُ), Mudaf Ilayh (الْمَسْجِدِ), at Khabar (مَفْتُوحٌ).' },
  },
  {
    id: 'arr-06',
    category: 'particles',
    difficulty: 'advanced',
    prompt: { ar: 'رتّب أسلوب شرط جازمًا:', en: 'Arrange a valid jussive conditional sentence:', tl: 'Ayusin ang kondisyonal na pangungusap:' },
    tokens: ['تَنْجَحْ', 'إِنْ', 'تَجْتَهِدْ'],
    correctSentence: 'إِنْ تَجْتَهِدْ تَنْجَحْ',
    explanation: { ar: 'أداة الشرط (إِنْ) تجزم فعل الشرط (تَجْتَهِدْ) وجواب الشرط (تَنْجَحْ).', en: 'إِنْ governs both the condition verb (تَجْتَهِدْ) and result verb (تَنْجَحْ) in Jazm.', tl: 'Parehong Majzum ang pandiwa sa kondisyon at resulta pagkatapos ng إِنْ.' },
  },
];

export const TYPING_EXERCISES: TypingExercise[] = [
  {
    id: 'typ-01',
    category: 'weak_verbs',
    discipline: 'sarf',
    difficulty: 'beginner',
    prompt: { ar: 'اكتب فعل الأمر للمفرد المذكر (أَنْتَ) من الفعل الأجوف (قَالَ - يَقُولُ):', en: 'Type the masculine singular imperative (أَنْتَ) of قَالَ (to say):', tl: 'Isulat ang pautos (أَنْتَ) ng pandiwang قَالَ:' },
    hintAr: 'الجذر: ق-و-ل (حُذفت الواو لالتقاء الساكنين)',
    acceptedAnswers: ['قُلْ', 'قل'],
    canonicalAnswer: 'قُلْ',
    explanation: { ar: 'الأصل (اقْوُلْ)، نُقلت ضمة الواو للقاف ثم حُذفت الواو لالتقاء الساكنين، واستُغني عن همزة الوصل: قُلْ.', en: 'Vowel shifts from و to ق and و drops before sukun, making the initial letter vocalized so Hamzat al-Wasl drops: قُلْ.', tl: 'Nalilipat ang Damma sa ق at nawawala ang و dahil sa dalawang sukun: قُلْ.' },
  },
  {
    id: 'typ-02',
    category: 'weak_verbs',
    discipline: 'sarf',
    difficulty: 'beginner',
    prompt: { ar: 'اكتب فعل الأمر للمفرد المذكر (أَنْتَ) من الفعل المثال (وَعَدَ - يَعِدُ):', en: 'Type the imperative (أَنْتَ) of the Mithal verb وَعَدَ (to promise):', tl: 'Isulat ang pautos (أَنْتَ) ng وَعَدَ:' },
    hintAr: 'الجذر: و-ع-د (على وزن عِلْ)',
    acceptedAnswers: ['عِدْ', 'عد'],
    canonicalAnswer: 'عِدْ',
    explanation: { ar: 'حُذفت الواو لوقوعها بين عدوّيها في المضارع (يَعِدُ)، فبقي الأمر على حرفين: عِدْ.', en: 'Initial Waw drops in Mudhari (يَعِدُ), so the imperative needs no Hamzat al-Wasl: عِدْ.', tl: 'Nabubura ang unang Waw sa Mudhari at pautos: عِدْ.' },
  },
  {
    id: 'typ-03',
    category: 'conjugation',
    discipline: 'sarf',
    difficulty: 'intermediate',
    prompt: { ar: 'صرِّف الفعل (مَدَّ) مع ضمير المتكلم (أَنَا) في الماضي:', en: 'Conjugate the doubled verb مَدَّ in Madhi for أَنَا (I):', tl: 'Ibanghay ang مَدَّ para sa أَنَا (nakaraan):' },
    hintAr: 'يجب فك الإدغام عند الاتصال بضمير رفع متحرك',
    acceptedAnswers: ['مَدَدْتُ', 'مددت'],
    canonicalAnswer: 'مَدَدْتُ',
    explanation: { ar: 'عند اتصال الفعل المضعف بضمير رفع متحرك (تاء الفاعل) يُفكّ الإدغام وجوبًا: مَدَدْتُ.', en: 'Gemination breaks (Fakk al-Idgham) before vocalized subject pronouns: مَدَدْتُ.', tl: 'Pinaghihiwalay ang dobleng katinig bago ang تاء الفاعل: مَدَدْتُ.' },
  },
  {
    id: 'typ-04',
    category: 'active_passive',
    discipline: 'sarf',
    difficulty: 'intermediate',
    prompt: { ar: 'حوِّل الفعل الماضي (قَالَ) إلى المبني للمجهول (هُوَ):', en: 'Convert active past verb قَالَ to passive (هُوَ):', tl: 'Gawing pasibo (nakaraan) ang قَالَ:' },
    hintAr: 'تُكسر فاؤه وتُقلب الألف ياءً',
    acceptedAnswers: ['قِيلَ', 'قيل'],
    canonicalAnswer: 'قِيلَ',
    explanation: { ar: 'الأصل (قُوِلَ) فنُقلت كسرة الواو إلى القاف بعد سلب حركتها وقُلبت الواو ياءً: قِيلَ.', en: 'Passive of Ajwaf Form I shifts to فِيلَ pattern: قِيلَ.', tl: 'Ang pasibong anyo ng قَالَ ay قِيلَ.' },
  },
  {
    id: 'typ-05',
    category: 'derived_nouns',
    discipline: 'sarf',
    difficulty: 'beginner',
    prompt: { ar: 'صُغ اسم المفعول من الفعل الثلاثي (كَتَبَ):', en: 'Form the passive participle (Ism Maf\'ul) of كَتَبَ:', tl: 'Buuin ang Ism Maf\'ul ng كَتَبَ:' },
    hintAr: 'على وزن مَفْعُول',
    acceptedAnswers: ['مَكْتُوبٌ', 'مَكْتُوب', 'مكتوب'],
    canonicalAnswer: 'مَكْتُوبٌ',
    explanation: { ar: 'اسم المفعول من الثلاثي يأتي قياسًا على وزن (مَفْعُول): مَكْتُوبٌ.', en: 'Form I passive participle follows the مَفْعُول pattern: مَكْتُوبٌ.', tl: 'Ang Ism Maf\'ul ng Form I ay sumusunod sa مَفْعُول: مَكْتُوبٌ.' },
  },
  {
    id: 'typ-06',
    category: 'weak_verbs',
    discipline: 'sarf',
    difficulty: 'advanced',
    prompt: { ar: 'اكتب المضارع المجزوم من (دَعَا - يَدْعُو) مسبوقًا بـ(لَمْ) دون كتابة (لم):', en: 'Type the jussive form of يَدْعُو after لَمْ (verb only):', tl: 'Isulat ang Majzum ng يَدْعُو pagkatapos ng لَمْ:' },
    hintAr: 'علامة جزم المعتل الآخر حذف حرف العلة',
    acceptedAnswers: ['يَدْعُ', 'يدع'],
    canonicalAnswer: 'يَدْعُ',
    explanation: { ar: 'الفعل المضارع المعتل الآخر يُجزم بحذف حرف العلة وتبقى الضمة دليلًا على الواو المحذوفة: لَمْ يَدْعُ.', en: 'Defective verbs drop the final weak vowel in Jazm, leaving Damma as marker of omitted و: يَدْعُ.', tl: 'Kinakaltas ang huling mahinang letra sa Jazm: يَدْعُ.' },
  },
];

// Curated Core Chapter Questions (explicit high-value items per major topic)
const CURATED_QUESTIONS: QuizQuestion[] = [
  {
    id: 'cur-s01-1',
    chapterId: 'sarf-01',
    discipline: 'sarf',
    category: 'mizan',
    difficulty: 'beginner',
    format: 'mcq',
    question: { ar: 'ما الميزان الصرفي الصحيح لفعل الأمر (قُلْ) من الجذر (ق-و-ل)؟', en: 'What is the exact morphological scale (Mizan) of the imperative قُلْ (root ق-و-ل)?', tl: 'Ano ang tamang Mizan ng pautos na قُلْ (ugat ق-و-ل)?' },
    arabicText: 'قُلْ',
    options: ['فُلْ', 'فَعْلْ', 'عِلْ', 'فُعْ'],
    correctIndex: 0,
    explanation: { ar: 'حُذفت عين الكلمة (الواو) لالتقاء الساكنين، فيُحذف ما يقابلها في الميزان (العين) لتصبح (فُلْ).', en: 'The middle radical (و = ع) was deleted before sukun, so ع is dropped from the scale leaving فُلْ.', tl: 'Nabura ang gitnang ugat (و = ع), kaya فُلْ ang natitira sa timbangan.' },
    meta: SRC_VERIFIED,
  },
  {
    id: 'cur-s01-2',
    chapterId: 'sarf-01',
    discipline: 'sarf',
    category: 'mizan',
    difficulty: 'intermediate',
    format: 'mcq',
    question: { ar: 'ما الميزان الصرفي لكلمة (اِسْتَغْفَرَ)؟', en: 'What is the morphological weight of اِسْتَغْفَرَ?', tl: 'Ano ang timbangan ng salitang اِسْتَغْفَرَ?' },
    arabicText: 'اِسْتَغْفَرَ',
    options: ['اِسْتَفْعَلَ', 'اِفْتَعَلَ', 'فَعَّلَ', 'اِنْفَعَلَ'],
    correctIndex: 0,
    explanation: { ar: 'الجذر (غ-ف-ر) يقابل (ف-ع-ل)، والألف والسين والتاء أحرف زيادة تُنزل كما هي: اِسْتَفْعَلَ.', en: 'Root غ-ف-ر maps to ف-ع-ل while prefix letters ا-س-ت appear verbatim: اِسْتَفْعَلَ.', tl: 'Ang ugat na غ-ف-ر ay ف-ع-ل at ang ا-س-ت ay dagdag na letra.' },
    meta: SRC_VERIFIED,
  },
  {
    id: 'cur-s02-1',
    chapterId: 'sarf-02',
    discipline: 'sarf',
    category: 'root_extraction',
    difficulty: 'beginner',
    format: 'mcq',
    question: { ar: 'ما الحروف الأصلية (الجذر) لكلمة (مُجْتَهِدٌ)؟', en: 'What is the 3-letter root of مُجْتَهِدٌ?', tl: 'Ano ang 3-letrang ugat ng مُجْتَهِدٌ?' },
    arabicText: 'مُجْتَهِدٌ',
    options: ['ج - هـ - د', 'م - ج - د', 'ج - ت - هـ', 'م - هـ - د'],
    correctIndex: 0,
    explanation: { ar: 'الميم للفاعل من غير الثلاثي والتاء زائدة في وزن (مُفْتَعِل)، فالأصول هي: ج-هـ-د.', en: 'مُـ and ت are affixes of the Form VIII active participle مُفْتَعِل; root is ج-ه-د.', tl: 'Ang مُ at ت ay panlapi ng Form VIII; ang ugat ay ج-ه-د.' },
    meta: SRC_VERIFIED,
  },
  {
    id: 'cur-s05-1',
    chapterId: 'sarf-05',
    discipline: 'sarf',
    category: 'conjugation',
    difficulty: 'intermediate',
    format: 'mcq',
    question: { ar: 'أيّ فعل من الأفعال الآتية مبني للمجهول ماضٍ من (كَتَبَ)؟', en: 'Which form is the passive past (Madhi Majhul) of كَتَبَ?', tl: 'Alin ang pasibong nakaraan (Madhi Majhul) ng كَتَبَ?' },
    options: ['كُتِبَ', 'يُكْتَبُ', 'كُتُبٌ', 'كَاتَبَ'],
    correctIndex: 0,
    explanation: { ar: 'الماضي الثلاثي المبني للمجهول يُضم أوله ويُكسر ما قبل آخره: كُتِبَ.', en: 'Past passive takes Damma on the 1st letter and Kasra before the last: كُتِبَ.', tl: 'Sa nakaraang pasibo, Damma sa unahan at Kasra bago ang huli: كُتِبَ.' },
    meta: SRC_VERIFIED,
  },
  {
    id: 'cur-s08-1',
    chapterId: 'sarf-08',
    discipline: 'sarf',
    category: 'weak_verbs',
    difficulty: 'intermediate',
    format: 'mcq',
    question: { ar: 'لماذا حُذفت الألف في (قُلْتُ) من الفعل (قَالَ)؟', en: 'Why does the long Alif drop in قُلْتُ (from قَالَ)?', tl: 'Bakit nawawala ang Alif sa قُلْتُ (mula sa قَالَ)?' },
    arabicText: 'قُلْتُ',
    options: [
      'لالتقاء الساكنين بعد تسكين اللام لاتصالها بضمير رفع متحرك',
      'لأن الفعل مبني للمجهول',
      'لأنه مسبوق بأداة جزم',
      'لأن الفاء همزة وصل',
    ],
    correctIndex: 0,
    explanation: { ar: 'يُبنى الماضي على السكون عند اتصاله بتاء الفاعل، فتلتقي الواو الساكنة مع اللام الساكنة، فتُحذف الواو وتُضم القاف دلالةً عليها.', en: 'Before تاء الفاعل the 3rd radical becomes sakin, creating a double sukun; the middle weak letter drops and القاف keeps Damma.', tl: 'Nagkakaroon ng dalawang sukun bago ang تاء الفاعل kaya kinakaltas ang gitnang mahinang letra.' },
    meta: SRC_VERIFIED,
  },
  {
    id: 'cur-s10-1',
    chapterId: 'sarf-10',
    discipline: 'sarf',
    category: 'weak_verbs',
    difficulty: 'advanced',
    format: 'mcq',
    question: { ar: 'ما فعل الأمر للمفرد المذكر من اللفيف المفروق (وَقَى - يَقِي)؟', en: 'What is the masculine singular imperative of the Lafif Mafruq verb وَقَى?', tl: 'Ano ang pautos (أَنْتَ) ng وَقَى?' },
    options: ['قِ', 'اِقِ', 'وَقْ', 'قِي'],
    correctIndex: 0,
    explanation: { ar: 'تُحذف الواو كالمثال (يَقِي) وتُحذف الياء في الأمر كالناقص (قِ)، ويجوز إلحاق هاء السكت في الوقف (قِهْ).', en: 'Initial و drops (like Mithal) and final ي drops in imperative (like Naqis), leaving a single vocalized letter: قِ.', tl: 'Nawawala ang unang و at huling ي kaya قِ lamang ang natitira.' },
    meta: SRC_VERIFIED,
  },
  {
    id: 'cur-n01-1',
    chapterId: 'nahu-01',
    discipline: 'nahu',
    category: 'sentence_type',
    difficulty: 'beginner',
    format: 'mcq',
    question: { ar: 'ما نوع الجملة: (الْعِلْمُ نُورٌ)؟', en: 'What type of Arabic sentence is الْعِلْمُ نُورٌ?', tl: 'Anong uri ng pangungusap ang الْعِلْمُ نُورٌ?' },
    arabicText: 'الْعِلْمُ نُورٌ',
    options: ['جملة اسمية (مبتدأ وخبر)', 'جملة فعلية (فعل وفاعل)', 'شبه جملة', 'جملة شرطية'],
    correctIndex: 0,
    explanation: { ar: 'بدأت باسم (الْعِلْمُ) وهو مبتدأ مرفوع وأُخبر عنه بـ(نُورٌ)، فهي جملة اسمية.', en: 'It begins with a noun (الْعِلْمُ = Mubtada) completed by a predicate (نُورٌ = Khabar).', tl: 'Nagsisimula sa pangngalan (الْعِلْمُ) at may panaguri (نُورٌ) kaya ito ay Jumla Ismiyyah.' },
    meta: SRC_VERIFIED,
  },
  {
    id: 'cur-n07-1',
    chapterId: 'nahu-07',
    discipline: 'nahu',
    category: 'kana_inna',
    difficulty: 'beginner',
    format: 'mcq',
    question: { ar: 'ما الإعراب الصحيح لكلمة (الطَّالِبَ) في جملة: (إِنَّ الطَّالِبَ مُجْتَهِدٌ)؟', en: "What is the I'rab of الطَّالِبَ in إِنَّ الطَّالِبَ مُجْتَهِدٌ?", tl: "Ano ang I'rab ng الطَّالِبَ sa إِنَّ الطَّالِبَ مُجْتَهِدٌ?" },
    arabicText: 'إِنَّ الطَّالِبَ مُجْتَهِدٌ',
    options: ['اسم إِنَّ منصوب بالفتحة', 'مبتدأ مرفوع بالضمة', 'فاعل مرفوع بالضمة', 'مفعول به منصوب'],
    correctIndex: 0,
    explanation: { ar: 'الحرف الناسخ (إِنَّ) ينصب المبتدأ ويُسمى اسمه، ويرفع الخبر.', en: 'إِنَّ governs the subject in Nasb as اسم إِنَّ and keeps the predicate Marfu\'.', tl: 'Ginagawa ng إِنَّ na Mansub ang simuno bilang اسم إِنَّ.' },
    meta: SRC_VERIFIED,
  },
  {
    id: 'cur-n06-1',
    chapterId: 'nahu-06',
    discipline: 'nahu',
    category: 'kana_inna',
    difficulty: 'beginner',
    format: 'mcq',
    question: { ar: 'اختر الضبط الصحيح لخبر (كَانَ) في الجملة: (كَانَ الْجَوُّ ...):', en: 'Choose the correctly inflected predicate for كَانَ الْجَوُّ ___:', tl: 'Piliin ang tamang anyo para sa خبر كَانَ sa كَانَ الْجَوُّ ___:' },
    options: ['جَمِيلًا', 'جَمِيلٌ', 'جَمِيلٍ', 'جَمِيلْ'],
    correctIndex: 0,
    explanation: { ar: 'كان وأخواتها ترفع الاسم (الْجَوُّ) وتنصب الخبر (جَمِيلًا).', en: 'Kana governs its subject in Raf\' (الْجَوُّ) and its predicate in Nasb (جَمِيلًا).', tl: 'Si Kana ay nagbibigay ng Nasb sa kanyang panaguri (جَمِيلًا).' },
    meta: SRC_VERIFIED,
  },
  {
    id: 'cur-n03-1',
    chapterId: 'nahu-03',
    discipline: 'nahu',
    category: 'case_determination',
    difficulty: 'intermediate',
    format: 'mcq',
    question: { ar: 'بمَ يُرفع جمع المذكر السالم مثل (الْمُعَلِّمُونَ)؟', en: 'How is a sound masculine plural like الْمُعَلِّمُونَ marked in Raf\'?', tl: 'Ano ang palatandaan ng Raf\' sa جمع المذكر السالم tulad ng الْمُعَلِّمُونَ?' },
    options: ['بالواو نيابة عن الضمة', 'بالضمة الظاهرة', 'بالألف نيابة عن الضمة', 'بثبوت النون'],
    correctIndex: 0,
    explanation: { ar: 'يرفع جمع المذكر السالم بالواو، وينصب ويجر بالياء.', en: 'Sound masculine plurals take Waw (و) for Raf\' and Ya (ي) for Nasb & Jarr.', tl: 'Ang جمع المذكر السالم ay gumagamit ng Waw (و) sa Raf\'.' },
    meta: SRC_VERIFIED,
  },
  {
    id: 'cur-n10-1',
    chapterId: 'nahu-10',
    discipline: 'nahu',
    category: 'word_irab',
    difficulty: 'intermediate',
    format: 'mcq',
    question: { ar: 'في جملة (فَهِمْتُ الدَّرْسَ فَهْمًا)، ما إعراب (فَهْمًا)؟', en: "In فَهِمْتُ الدَّرْسَ فَهْمًا, what is the grammatical role of فَهْمًا?", tl: 'Sa فَهِمْتُ الدَّرْسَ فَهْمًا, ano ang papel ng فَهْمًا?' },
    arabicText: 'فَهِمْتُ الدَّرْسَ فَهْمًا',
    options: ['مفعول مطلق منصوب', 'مفعول لأجله منصوب', 'حال منصوب', 'تمييز منصوب'],
    correctIndex: 0,
    explanation: { ar: 'مصدر منصوب مأخوذ من لفظ الفعل (فَهِمَ) لتوكيد المعنى، فهو مفعول مطلق.', en: 'Cognate Masdar derived from the same verb root (ف-ه-م) emphasizing the action = Maf\'ul Mutlaq.', tl: 'Masdar mula sa parehong pandiwa para sa diin = Maf\'ul Mutlaq.' },
    meta: SRC_VERIFIED,
  },
  {
    id: 'cur-n19-1',
    chapterId: 'nahu-19',
    discipline: 'nahu',
    category: 'error_correction',
    difficulty: 'intermediate',
    format: 'correction',
    question: { ar: 'صحّح الخطأ النحوي في الجملة: (لَمْ يَذْهَبُ الطَّالِبُ إِلَى الْمَدْرَسَةِ)', en: 'Identify the correct repair for the erroneous sentence: لَمْ يَذْهَبُ الطَّالِبُ إِلَى الْمَدْرَسَةِ', tl: 'Itama ang maling pangungusap: لَمْ يَذْهَبُ الطَّالِبُ إِلَى الْمَدْرَسَةِ' },
    arabicText: 'لَمْ يَذْهَبُ الطَّالِبُ',
    options: ['لَمْ يَذْهَبِ الطَّالِبُ (يجزم بالسكون ويحرك بالكسر لالتقاء الساكنين)', 'لَمْ يَذْهَبَ الطَّالِبُ', 'لَمْ ذَهَبَ الطَّالِبُ', 'لَمْ يَذْهَبُونَ الطَّالِبُ'],
    correctIndex: 0,
    explanation: { ar: 'لَمْ تجزم المضارع بالسكون (يَذْهَبْ)، ثم يُحرك بالكسر لالتقاء الساكنين مع همزة الوصل: لَمْ يَذْهَبِ الطَّالِبُ.', en: 'لَمْ triggers Jazm (يَذْهَبْ), which receives a connecting Kasra before الطَّالِبُ to avoid two sukuns: لَمْ يَذْهَبِ الطَّالِبُ.', tl: 'Nagbibigay ng Jazm ang لَمْ sa يَذْهَبْ (nagiging يَذْهَبِ bago ang الطَّالِبُ).' },
    meta: SRC_VERIFIED,
  },
];

// Deterministic question builder from each chapter's rich linguistic data so EVERY ONE of the 46 chapters has >= 10 distinct questions
function buildQuestionsForChapter(chapter: TextbookChapter, allChapters: TextbookChapter[]): QuizQuestion[] {
  const curated = CURATED_QUESTIONS.filter((q) => q.chapterId === chapter.id);
  const generated: QuizQuestion[] = [...curated];

  const siblingPool = allChapters.filter((c) => c.id !== chapter.id && c.discipline === chapter.discipline);
  const category =
    chapter.discipline === 'sarf'
      ? chapter.number <= 4
        ? 'mizan'
        : chapter.number <= 7
          ? 'conjugation'
          : chapter.number <= 12
            ? 'weak_verbs'
            : chapter.number <= 14
              ? 'masdar'
              : chapter.number <= 19
                ? 'derived_nouns'
                : 'noun_gender_number'
      : chapter.number <= 4
        ? 'case_determination'
        : chapter.number <= 7
          ? 'kana_inna'
          : chapter.number <= 14
            ? 'word_irab'
            : chapter.number <= 18
              ? 'particles'
              : 'sentence_type';

  // 1. Definition identification
  const wrongDefs = siblingPool.slice(0, 3).map((s) => `${s.titleAr} (${s.definition.arabicTerm})`);
  generated.push({
    id: `${chapter.id}-q-def`,
    chapterId: chapter.id,
    discipline: chapter.discipline,
    category,
    difficulty: chapter.level,
    format: 'mcq',
    question: {
      ar: `أيّ مصطلح يطابق التعريف الآتي: «${chapter.definition.text.ar}»؟`,
      en: `Which concept matches this definition: "${chapter.definition.text.en}"?`,
      tl: `Aling konsepto ang tumutugma sa kahulugan: "${chapter.definition.text.tl}"?`,
    },
    options: [`${chapter.titleAr} (${chapter.definition.arabicTerm})`, ...wrongDefs],
    correctIndex: 0,
    explanation: {
      ar: `هذا هو تعريف (${chapter.definition.arabicTerm}) كما ورد في مصادر الباب.`,
      en: `This accurately defines ${chapter.titleEn} (${chapter.definition.arabicTerm}).`,
      tl: `Ito ang kahulugan ng ${chapter.titleTl} (${chapter.definition.arabicTerm}).`,
    },
    meta: chapter.meta,
  });

  // 2. From practical exercises
  chapter.practicalExercises.forEach((ex, idx) => {
    const distractors: string[] = [];
    for (const pat of chapter.patterns) {
      if (pat.example !== ex.answer && !distractors.includes(pat.example)) distractors.push(pat.example);
    }
    for (const cls of chapter.classifications) {
      for (const e of cls.examples) {
        if (e !== ex.answer && !distractors.includes(e)) distractors.push(e);
      }
    }
    for (const sc of siblingPool) {
      if (sc.practicalExercises[0] && sc.practicalExercises[0].answer !== ex.answer && !distractors.includes(sc.practicalExercises[0].answer)) {
        distractors.push(sc.practicalExercises[0].answer);
      }
      if (distractors.length >= 6) break;
    }
    const opts = [ex.answer, ...distractors.slice(0, 3)];
    while (opts.length < 4) {
      opts.push(`خيار آخر (${opts.length})`);
    }
    const rotate = (chapter.number + idx) % 4;
    const rotated = [...opts.slice(rotate), ...opts.slice(0, rotate)];
    const correctIdx = rotated.indexOf(ex.answer);

    generated.push({
      id: `${chapter.id}-q-ex-${idx}`,
      chapterId: chapter.id,
      discipline: chapter.discipline,
      category,
      difficulty: idx === 0 ? 'beginner' : chapter.level,
      format: 'mcq',
      question: ex.prompt,
      arabicText: ex.arabicPrompt,
      options: rotated,
      correctIndex: correctIdx,
      explanation: ex.explanation,
      meta: chapter.meta,
    });
  });

  // 3. From patterns
  chapter.patterns.forEach((pat, idx) => {
    const otherExamples = chapter.patterns.filter((p) => p.pattern !== pat.pattern).map((p) => p.example);
    const extra = siblingPool.flatMap((s) => s.patterns.map((p) => p.example)).filter((e) => e !== pat.example && !otherExamples.includes(e));
    const distractors = [...otherExamples, ...extra].slice(0, 3);
    while (distractors.length < 3) distractors.push('مثال غير مطابق');
    const opts = [pat.example, ...distractors];
    const rotate = (idx + 1) % 4;
    const rotated = [...opts.slice(rotate), ...opts.slice(0, rotate)];

    generated.push({
      id: `${chapter.id}-q-pat-${idx}`,
      chapterId: chapter.id,
      discipline: chapter.discipline,
      category,
      difficulty: idx === 0 ? 'beginner' : 'intermediate',
      format: 'mcq',
      question: {
        ar: `أيّ مثال يُطابق الصيغة أو الحكم (${pat.pattern}) — «${pat.meaning.ar}»؟`,
        en: `Which example matches the pattern/rule "${pat.pattern}" (${pat.meaning.en})?`,
        tl: `Aling halimbawa ang tumutugma sa "${pat.pattern}" (${pat.meaning.tl})?`,
      },
      arabicText: pat.pattern,
      options: rotated,
      correctIndex: rotated.indexOf(pat.example),
      explanation: {
        ar: `${pat.example}: ${pat.rule.ar}`,
        en: `${pat.example}: ${pat.rule.en}`,
        tl: `${pat.example}: ${pat.rule.tl}`,
      },
      meta: chapter.meta,
    });
  });

  // 4. From classifications
  chapter.classifications.forEach((cls, idx) => {
    const targetExample = cls.examples[0] ?? chapter.examples[0]?.arabic ?? chapter.titleAr;
    const otherClsTitles = chapter.classifications
      .filter((c) => c.titleAr !== cls.titleAr)
      .map((c) => c.titleAr);
    const siblingTitles = siblingPool.flatMap((s) => s.classifications.map((c) => c.titleAr)).filter((t) => t !== cls.titleAr && !otherClsTitles.includes(t));
    const distractors = [...otherClsTitles, ...siblingTitles].slice(0, 3);
    while (distractors.length < 3) distractors.push(`قسم آخر (${distractors.length + 1})`);
    const opts = [cls.titleAr, ...distractors];
    const rotate = (idx + 2) % 4;
    const rotated = [...opts.slice(rotate), ...opts.slice(0, rotate)];

    generated.push({
      id: `${chapter.id}-q-cls-${idx}`,
      chapterId: chapter.id,
      discipline: chapter.discipline,
      category,
      difficulty: 'intermediate',
      format: 'mcq',
      question: {
        ar: `إلى أيّ قسم ينتمي المثال: «${targetExample}» في باب ${chapter.titleAr}؟`,
        en: `Under ${chapter.titleEn}, which category fits "${targetExample}"?`,
        tl: `Sa ilalim ng ${chapter.titleTl}, saang kategorya nabibilang ang "${targetExample}"?`,
      },
      arabicText: targetExample,
      options: rotated,
      correctIndex: rotated.indexOf(cls.titleAr),
      explanation: cls.description,
      meta: chapter.meta,
    });
  });

  // 5. From rules (True / False + Application)
  chapter.rules.forEach((rule, idx) => {
    generated.push({
      id: `${chapter.id}-q-tf-${idx}`,
      chapterId: chapter.id,
      discipline: chapter.discipline,
      category,
      difficulty: idx === 0 ? 'beginner' : 'intermediate',
      format: 'tf',
      question: {
        ar: `صح أم خطأ: ${rule.ar}`,
        en: `True or False: ${rule.en}`,
        tl: `Tama o Mali: ${rule.tl}`,
      },
      options: ['صحيح (True)', 'خطأ (False)'],
      correctIndex: 0,
      explanation: {
        ar: `العبارة صحيحة لأنها من القواعد المعتمدة في ${chapter.titleAr}.`,
        en: `True — this is an established rule in ${chapter.titleEn}.`,
        tl: `Tama — ito ay kinikilalang tuntunin sa ${chapter.titleTl}.`,
      },
      meta: chapter.meta,
    });
  });

  // 6. From common mistakes (Spot the trap / True-False false statement)
  chapter.commonMistakes.forEach((mistake, idx) => {
    generated.push({
      id: `${chapter.id}-q-err-${idx}`,
      chapterId: chapter.id,
      discipline: chapter.discipline,
      category: 'error_correction',
      difficulty: 'advanced',
      format: 'mcq',
      question: {
        ar: `أيّ تنبيه صحيح لتجنّب اللحن الشائع في باب (${chapter.titleAr})؟`,
        en: `Which statement accurately prevents a common error in ${chapter.titleEn}?`,
        tl: `Aling pahayag ang pumipigil sa karaniwang pagkakamali sa ${chapter.titleTl}?`,
      },
      options: [
        mistake.ar,
        'إهمال الحركات الإعرابية أو الصرفية في أواخر الكلمات مطلقًا',
        'عدم التفريق بين المعتل والصحيح في التصريف',
        'تطبيق علامة الرفع على المفعول به والمنصوبات',
      ],
      correctIndex: 0,
      explanation: mistake,
      meta: chapter.meta,
    });
  });

  // Ensure at least 10 questions per chapter by adding rule-check or example-analysis items if needed
  let padIdx = 0;
  while (generated.length < 10 && chapter.examples.length > 0) {
    const ex = chapter.examples[padIdx % chapter.examples.length];
    const wrongEx = siblingPool[padIdx % siblingPool.length]?.examples[0]?.analysis.ar ?? 'تحليل مخالف للباب';
    generated.push({
      id: `${chapter.id}-q-exana-${padIdx}`,
      chapterId: chapter.id,
      discipline: chapter.discipline,
      category,
      difficulty: 'advanced',
      format: 'mcq',
      question: {
        ar: `ما التحليل الصحيح للمثال: «${ex.arabic}»؟`,
        en: `Which grammatical analysis accurately explains "${ex.arabic}"?`,
        tl: `Alin ang tamang pagsusuri para sa "${ex.arabic}"?`,
      },
      arabicText: ex.arabic,
      options: [
        ex.analysis.ar,
        wrongEx,
        'لفظ جامد لا يتصرف ولا يتعلق به عامل',
        'شذوذ سماعي خارج عن قواعد العربية',
      ],
      correctIndex: 0,
      explanation: ex.analysis,
      meta: chapter.meta,
    });
    padIdx++;
  }

  return generated;
}

const ALL_CHAPTERS = [...SARF_CHAPTERS, ...NAHU_CHAPTERS];

export const CHAPTER_QUIZZES: QuizQuestion[] = ALL_CHAPTERS.flatMap((ch) =>
  buildQuestionsForChapter(ch, ALL_CHAPTERS)
);

// Additional domain-specific questions for Verbs, Particles, and Vocabulary exams
export const DOMAIN_EXTRA_QUESTIONS: QuizQuestion[] = [
  ...VERBS_DATABASE.slice(0, 12).map((v, idx): QuizQuestion => {
    const others = VERBS_DATABASE.filter((o) => o.id !== v.id).slice(idx % 5, (idx % 5) + 3);
    const opts = [v.present, ...others.map((o) => o.present)];
    const rot = idx % 4;
    const rotated = [...opts.slice(rot), ...opts.slice(0, rot)];
    return {
      id: `dom-verb-${v.id}`,
      chapterId: 'sarf-03',
      discipline: 'sarf',
      category: 'conjugation',
      difficulty: idx < 4 ? 'beginner' : idx < 8 ? 'intermediate' : 'advanced',
      format: 'mcq',
      question: {
        ar: `ما الفعل المضارع المعلوم الصحيح للفعل (${v.past}) — الجذر (${v.root})؟`,
        en: `What is the correct active Mudhari of ${v.past} (${v.meaning.en})?`,
        tl: `Ano ang tamang Mudhari ng ${v.past} (${v.meaning.tl})?`,
      },
      arabicText: v.past,
      options: rotated,
      correctIndex: rotated.indexOf(v.present),
      explanation: v.morphologicalNotes ?? {
        ar: `${v.past} ← ${v.present} (${v.classification})، والمصدر: ${v.masdar}.`,
        en: `${v.past} → ${v.present} (Form ${v.form}, ${v.classification}); Masdar: ${v.masdar}.`,
        tl: `${v.past} → ${v.present} (Form ${v.form}); Masdar: ${v.masdar}.`,
      },
      meta: v.meta,
    };
  }),
  ...PARTICLES_REFERENCE.slice(0, 6).map((p, idx): QuizQuestion => {
    const others = PARTICLES_REFERENCE.filter((o) => o.id !== p.id).slice(0, 3);
    const opts = [p.effectAr, ...others.map((o) => o.effectAr)];
    const rot = (idx + 1) % 4;
    const rotated = [...opts.slice(rot), ...opts.slice(0, rot)];
    return {
      id: `dom-part-${p.id}`,
      chapterId: 'nahu-16',
      discipline: 'nahu',
      category: 'particles',
      difficulty: 'intermediate',
      format: 'mcq',
      question: {
        ar: `ما الأثر الإعرابي لـ(${p.group}): ${p.arabic}؟`,
        en: `What is the grammatical effect of ${p.groupEn} (${p.arabic})?`,
        tl: `Ano ang epekto sa I'rab ng ${p.groupEn} (${p.arabic})?`,
      },
      arabicText: p.exampleAr,
      options: rotated,
      correctIndex: rotated.indexOf(p.effectAr),
      explanation: {
        ar: `${p.effectAr}. مثال: ${p.exampleAr}`,
        en: `${p.effectEn}. Example: ${p.exampleAr}`,
        tl: `${p.effectTl}. Halimbawa: ${p.exampleAr}`,
      },
      meta: SRC_VERIFIED,
    };
  }),
];

export function getChapterQuiz(chapterId: string): QuizQuestion[] {
  return CHAPTER_QUIZZES.filter((q) => q.chapterId === chapterId);
}

export function getAllQuestions(): QuizQuestion[] {
  return [...CHAPTER_QUIZZES, ...DOMAIN_EXTRA_QUESTIONS];
}

export function buildExamQuestions(
  mode:
    | 'sarf'
    | 'nahu'
    | 'combined'
    | 'conjugation'
    | 'irab'
    | 'vocabulary'
    | 'advanced',
  count = 15
): QuizQuestion[] {
  const all = getAllQuestions();
  let pool: QuizQuestion[] = [];

  if (mode === 'sarf') {
    pool = all.filter((q) => q.discipline === 'sarf');
  } else if (mode === 'nahu') {
    pool = all.filter((q) => q.discipline === 'nahu');
  } else if (mode === 'conjugation') {
    pool = all.filter((q) => q.category === 'conjugation' || q.category === 'weak_verbs' || q.category === 'active_passive');
  } else if (mode === 'irab') {
    pool = all.filter((q) => q.category === 'word_irab' || q.category === 'case_determination' || q.category === 'kana_inna');
  } else if (mode === 'advanced') {
    pool = all.filter((q) => q.difficulty === 'advanced' || q.category === 'error_correction');
  } else if (mode === 'vocabulary') {
    pool = VOCAB_DICTIONARY.slice(0, 15).map((w, idx): QuizQuestion => {
      const others = VOCAB_DICTIONARY.filter((o) => o.id !== w.id).slice(idx % 6, (idx % 6) + 3);
      const opts = [w.meaningEn, ...others.map((o) => o.meaningEn)];
      const rot = idx % 4;
      const rotated = [...opts.slice(rot), ...opts.slice(0, rot)];
      return {
        id: `exam-vocab-${w.id}`,
        chapterId: 'sarf-01',
        discipline: 'sarf',
        category: 'vocabulary',
        difficulty: 'beginner',
        format: 'mcq',
        question: {
          ar: `ما معنى المفردة العربية: «${w.arabic}»؟`,
          en: `Select the accurate meaning of the Arabic word "${w.arabic}":`,
          tl: `Piliin ang tamang kahulugan ng salitang Arabe na "${w.arabic}":`,
        },
        arabicText: w.arabic,
        options: rotated,
        correctIndex: rotated.indexOf(w.meaningEn),
        explanation: {
          ar: `${w.arabic} (${w.pluralOrForm ?? w.category}): ${w.definition.ar} — مثال: ${w.example.ar}`,
          en: `${w.arabic} (${w.meaningEn} / ${w.meaningTl}): ${w.example.en}`,
          tl: `${w.arabic} (${w.meaningTl}): ${w.example.tl}`,
        },
        meta: w.meta,
      };
    });
  } else {
    // combined
    const s = all.filter((q) => q.discipline === 'sarf').slice(0, 10);
    const n = all.filter((q) => q.discipline === 'nahu').slice(0, 10);
    pool = [...s, ...n];
  }

  // Deterministic spread across pool
  const selected: QuizQuestion[] = [];
  const step = Math.max(1, Math.floor(pool.length / count));
  for (let i = 0; i < pool.length && selected.length < count; i += step) {
    selected.push(pool[i]);
  }
  for (let i = 0; i < pool.length && selected.length < count; i++) {
    if (!selected.includes(pool[i])) selected.push(pool[i]);
  }
  return selected.slice(0, count);
}

export function buildInitialSRSCards(): Record<string, SRSCard> {
  const now = Date.now();
  const cards: Record<string, SRSCard> = {};

  // 1. Vocabulary Deck
  VOCAB_DICTIONARY.slice(0, 10).forEach((v) => {
    const id = `srs-vocab-${v.id}`;
    cards[id] = {
      id,
      deck: 'vocab',
      frontAr: v.arabic,
      frontHint: v.root ? `الجذر: ${v.root}` : v.category,
      backAr: v.definition.ar,
      backEn: v.meaningEn,
      backTl: v.meaningTl,
      exampleAr: v.example.ar,
      easeFactor: 2.5,
      intervalDays: 0,
      repetitions: 0,
      nextReviewAt: now,
    };
  });

  // 2. Conjugation Deck
  VERBS_DATABASE.slice(0, 8).forEach((v) => {
    const id = `srs-conj-${v.id}`;
    cards[id] = {
      id,
      deck: 'conjugation',
      frontAr: `${v.past} ← ؟ (${v.root})`,
      frontHint: `Form ${v.form} · ${v.classification}`,
      backAr: `${v.past} — ${v.present} — ${v.imperative} (مصدره: ${v.masdar})`,
      backEn: `${v.meaning.en} | Present: ${v.present}, Imp: ${v.imperative}`,
      backTl: `${v.meaning.tl} | Kasalukuyan: ${v.present}, Pautos: ${v.imperative}`,
      exampleAr: v.example.ar,
      easeFactor: 2.5,
      intervalDays: 0,
      repetitions: 0,
      nextReviewAt: now,
    };
  });

  // 3. Grammar Rules Deck
  [
    {
      id: 'srs-gram-1',
      frontAr: 'عَمَلُ كَانَ وَأَخَوَاتِهَا',
      frontHint: 'النواسخ الفعلية',
      backAr: 'ترفع المبتدأ ويسمى اسمها، وتنصب الخبر ويسمى خبرها.',
      backEn: "Kana and its sisters govern Mubtada in Raf' and Khabar in Nasb.",
      backTl: "Pinananatili ng Kana ang Marfu' na simuno at ginagawang Mansub ang panaguri.",
      exampleAr: 'كَانَ الْجَوُّ جَمِيلًا.',
    },
    {
      id: 'srs-gram-2',
      frontAr: 'عَمَلُ إِنَّ وَأَخَوَاتِهَا',
      frontHint: 'النواسخ الحرفية',
      backAr: 'تنصب المبتدأ ويسمى اسمها، وترفع الخبر ويسمى خبرها.',
      backEn: "Inna and its sisters govern Mubtada in Nasb and Khabar in Raf'.",
      backTl: "Ginagawa ng Inna na Mansub ang simuno at Marfu' ang panaguri.",
      exampleAr: 'إِنَّ الطَّالِبَ مُجْتَهِدٌ.',
    },
    {
      id: 'srs-gram-3',
      frontAr: 'علامة جزم المضارع المعتل الآخر',
      frontHint: 'الأفعال المعتلة + الجزم',
      backAr: 'يُجزم بحذف حرف العلة وتبقى الحركة المجانسة دليلًا عليه (لَمْ يَدْعُ، لَمْ يَرْمِ، لَمْ يَخْشَ).',
      backEn: 'Defective Mudhari verbs take Jazm by dropping the final weak letter.',
      backTl: 'Sa Jazm ng mahinang pandiwa sa dulo, kinakaltas ang huling mahinang letra.',
      exampleAr: 'لَمْ يَدْعُ إِلاَّ اللهَ.',
    },
    {
      id: 'srs-gram-4',
      frontAr: 'الميزان الصرفي عند الحذف',
      frontHint: 'س-أ-ل-ت-م-و-ن-ي-ه-ا / ف-ع-ل',
      backAr: 'إذا حُذف حرف أصلي من الكلمة يُحذف ما يقابله في الميزان (قُلْ = فُلْ، عِدْ = عِلْ، قِ = عِ).',
      backEn: 'Deleted root radicals are also deleted from the ف-ع-ل scale (قُلْ = فُلْ, عِدْ = عِلْ).',
      backTl: 'Kapag nabura ang ugat na letra, nabubura rin ang katumbas nito sa ف-ع-ل.',
      exampleAr: 'قُلْ الْحَقَّ (فُلْ).',
    },
  ].forEach((g) => {
    cards[g.id] = {
      ...g,
      deck: 'grammar',
      easeFactor: 2.5,
      intervalDays: 0,
      repetitions: 0,
      nextReviewAt: now,
    };
  });

  // 4. I'rab Deck
  [
    {
      id: 'srs-irab-1',
      frontAr: 'إعراب «الدَّرْسَ» في: كَتَبَ الطَّالِبُ الدَّرْسَ',
      frontHint: 'إعراب الجملة الفعلية',
      backAr: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة.',
      backEn: "Maf'ul Bihi (Direct Object), Mansub with explicit Fatha.",
      backTl: "Maf'ul Bihi (Tuwirang Layon), nasa kasong Mansub (Fatha).",
      exampleAr: 'كَتَبَ الطَّالِبُ الدَّرْسَ.',
    },
    {
      id: 'srs-irab-2',
      frontAr: 'إعراب «الدَّرْسُ» في: كُتِبَ الدَّرْسُ',
      frontHint: 'المبني للمجهول',
      backAr: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة.',
      backEn: "Na'ib al-Fa'il (Deputy Subject), Marfu' with explicit Damma.",
      backTl: "Na'ib al-Fa'il (Panghaliling Simuno), Marfu' (Damma).",
      exampleAr: 'كُتِبَ الدَّرْسُ.',
    },
    {
      id: 'srs-irab-3',
      frontAr: 'إعراب «الْمَسْجِدِ» في: بَابُ الْمَسْجِدِ مَفْتُوحٌ',
      frontHint: 'باب الإضافة',
      backAr: 'مضاف إليه مجرور وعلامة جره الكسرة الظاهرة.',
      backEn: 'Mudaf Ilayh (Possessor), Majrur with explicit Kasra.',
      backTl: 'Mudaf Ilayh, nasa kasong Majrur (Kasra).',
      exampleAr: 'بَابُ الْمَسْجِدِ مَفْتُوحٌ.',
    },
  ].forEach((ir) => {
    cards[ir.id] = {
      ...ir,
      deck: 'irab',
      easeFactor: 2.5,
      intervalDays: 0,
      repetitions: 0,
      nextReviewAt: now,
    };
  });

  // 5. Particles Deck
  PARTICLES_REFERENCE.slice(0, 6).forEach((p) => {
    const id = `srs-part-${p.id}`;
    cards[id] = {
      id,
      deck: 'particles',
      frontAr: p.arabic,
      frontHint: `${p.group} (${p.groupEn})`,
      backAr: p.effectAr,
      backEn: p.effectEn,
      backTl: p.effectTl,
      exampleAr: p.exampleAr,
      easeFactor: 2.5,
      intervalDays: 0,
      repetitions: 0,
      nextReviewAt: now,
    };
  });

  // 6. Common Mistakes Deck
  [
    {
      id: 'srs-err-1',
      frontAr: 'الخطأ: «لَمْ يَقُولُ» — ما الصواب؟',
      frontHint: 'جزم الأجوف',
      backAr: 'الصواب: «لَمْ يَقُلْ» (تجزم بالسكون وتحذف الواو لالتقاء الساكنين).',
      backEn: 'Correct: لَمْ يَقُلْ — Jazm causes sukun on ل, forcing weak و to drop.',
      backTl: 'Tama: لَمْ يَقُلْ — nabubura ang و dahil sa Jazm.',
      exampleAr: 'لَمْ يَقُلْ إِلَّا صِدْقًا.',
    },
    {
      id: 'srs-err-2',
      frontAr: 'الخطأ: «مَرَرْتُ بِطَالِبَيْنِ الْمُجْتَهِدَانِ» — ما الصواب؟',
      frontHint: 'إعراب النعت للمثنى',
      backAr: 'الصواب: «بِطَالِبَيْنِ مُجْتَهِدَيْنِ» لأن النعت يتبع المنعوت في الجر بالياء والتنكير.',
      backEn: 'Correct: بِطَالِبَيْنِ مُجْتَهِدَيْنِ — modifier matches case (Jarr with ي) and indefiniteness.',
      backTl: 'Tama: بِطَالِبَيْنِ مُجْتَهِدَيْنِ — sumusunod ang pang-uri sa Jarr.',
      exampleAr: 'سَلَّمْتُ عَلَى طَالِبَيْنِ مُجْتَهِدَيْنِ.',
    },
  ].forEach((m) => {
    cards[m.id] = {
      ...m,
      deck: 'mistakes',
      easeFactor: 2.5,
      intervalDays: 0,
      repetitions: 0,
      nextReviewAt: now,
    };
  });

  return cards;
}
