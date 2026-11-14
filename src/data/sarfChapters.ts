import { TextbookChapter } from '../types/arabic';

const S_SHADHA = ['شذا العرف في فن الصرف', 'متن البناء', 'لامية الأفعال'];
const S_MAQSUD = ['نظم المقصود', 'شذا العرف في فن الصرف'];

function makeSarfChapter(
  number: number,
  id: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  titleAr: string,
  titleEn: string,
  titleTl: string,
  spec: Omit<TextbookChapter, 'id' | 'number' | 'discipline' | 'level' | 'titleAr' | 'titleEn' | 'titleTl'>
): TextbookChapter {
  return {
    id,
    number,
    discipline: 'sarf',
    level,
    titleAr,
    titleEn,
    titleTl,
    ...spec,
  };
}

export const SARF_CHAPTERS: TextbookChapter[] = [
  makeSarfChapter(1, 'sarf-01', 'beginner', 'الميزان الصرفي', 'The Morphological Scale (Al-Mizan al-Sarfi)', 'Ang Timbangan ng Salita (Al-Mizan al-Sarfi)', {
    objectives: [
      { ar: 'فهم وظيفة الميزان الصرفي (ف ع ل) في وزن الكلمات العربية.', en: 'Understand how the ف-ع-ل scale measures Arabic word patterns.', tl: 'Maunawaan kung paano sinusukat ng ف-ع-ل ang mga salitang Arabe.' },
      { ar: 'التمييز بين الأحرف الأصلية والأحرف الزائدة والحذف والقلب المكاني.', en: 'Distinguish root letters, augmented letters, deletions, and metathesis.', tl: 'Makilala ang mga ugat na letra, dagdag na letra, at pagkakaltas.' },
    ],
    introduction: {
      ar: 'وضع علماء الصرف ميزانًا من ثلاثة أحرف (ف ع ل) لأن أكثر كلمات اللغة العربية ثلاثية الأصول، ليعرف الطالب به بنية الكلمة وما طرأ عليها من زيادة أو حذف أو إعلال.',
      en: 'Classical morphologists chose the three-letter scale ف-ع-ل (fa-a-la) because the majority of Arabic words derive from triliteral roots, enabling learners to track root radicals, affixes, and deletions.',
      tl: 'Pinili ng mga iskolar ang tatlong letrang sukatan na ف-ع-ل dahil karamihan sa mga salitang Arabe ay may tatlong ugat na letra.',
    },
    definition: {
      arabicTerm: 'الميزان الصرفي',
      text: {
        ar: 'مقياس اصطلح عليه الصرفيون من حروف (ف ع ل) لمعرفة أصول الكلمات وأبنيتها وما يطرأ عليها من زيادة أو حذف أو إعلال أو إبدال.',
        en: 'A standard template composed of ف (1st radical), ع (2nd radical), and ل (3rd radical) used to represent the exact morphological structure and vocalization of Arabic words.',
        tl: 'Isang pamantayang hulwaran na binubuo ng ف, ع, at ل upang masukat ang estruktura ng mga salita.',
      },
    },
    explanation: {
      ar: 'يقابل الحرف الأصلي الأول بالفاء، والثاني بالعين، والثالث باللام مع ضبط الميزان بنفس حركات الموزون وسكونه. وإذا كانت الكلمة رباعية الأصول زيدت لام ثانية (فَعْلَلَ)، وإذا زيدت أحرف من حروف الزيادة (سألتمونيها) نُزلت كما هي في الميزان، وإذا كان الزائد بتضعيف حرف أصلي ضُعِّف ما يقابله في الميزان (عَلَّمَ = فَعَّلَ).',
      en: 'Each root radical maps to ف, ع, and ل while copying the exact vowels and sukuns of the word. Quadriliteral roots add a second ل (فَعْلَلَ). Non-root affixes from سَأَلْتُمُونِيهَا appear verbatim in the scale, whereas geminated radicals double the corresponding scale letter (عَلَّمَ → فَعَّلَ).',
      tl: 'Bawat ugat na letra ay tumutugma sa ف, ع, at ل na may parehong patinig. Ang apat na ugat na letra ay gumagamit ng فَعْلَلَ, at ang mga dagdag na letra ay inilalagay nang direkta sa timbangan.',
    },
    rules: [
      { ar: 'تُقابل الأصول الثلاثة بـ(ف ع ل) مع مطابقة الحركات والسكنات.', en: 'Map the 3 root letters to ف-ع-ل with identical vowelization.', tl: 'Itugma ang 3 ugat na letra sa ف-ع-ل nang may parehong tuldik.' },
      { ar: 'إذا حُذف حرف أصلي حُذف ما يقابله في الميزان (قُلْ = فُلْ، عِدْ = عِلْ).', en: 'If a root letter is deleted, its counterpart is deleted from the scale (قُلْ = فُلْ, عِدْ = عِلْ).', tl: 'Kapag nabura ang ugat na letra, binubura rin ang katumbas nito sa sukatan (قُلْ = فُلْ).' },
      { ar: 'الأحرف الزائدة العشرة مجموعة في كلمة (سَأَلْتُمُونِيهَا) وتُذكر بلفظها في الميزان.', en: 'The 10 possible augment letters (سَأَلْتُمُونِيهَا) appear as themselves in the pattern.', tl: 'Ang 10 dagdag na letra (سَأَلْتُمُونِيهَا) ay isinusulat nang direkta sa pattern.' },
    ],
    classifications: [
      {
        titleAr: 'الميزان الثلاثي المجرد',
        titleEn: 'Triliteral Scale',
        titleTl: 'Tatluhang Ugat',
        description: { ar: 'الأصل القياسي للكلمات الثلاثية.', en: 'Standard scale for 3-radical words.', tl: 'Pamantayang sukatan para sa 3-letrang ugat.' },
        examples: ['كَتَبَ = فَعَلَ', 'عَلِمَ = فَعِلَ', 'كَرُمَ = فَعُلَ'],
      },
      {
        titleAr: 'الميزان الرباعي المجرد',
        titleEn: 'Quadriliteral Scale',
        titleTl: 'Apatang Ugat',
        description: { ar: 'يزاد فيه لام ثانية لمقابلة الأصل الرابع.', en: 'Adds a second ل for the 4th radical.', tl: 'Nagdadagdag ng pangalawang ل para sa ika-4 na ugat.' },
        examples: ['دَحْرَجَ = فَعْلَلَ', 'تَرْجَمَ = فَعْلَلَ', 'زَلْزَلَ = فَعْلَلَ'],
      },
    ],
    patterns: [
      { pattern: 'فَعَلَ', example: 'كَتَبَ', meaning: { ar: 'وزن الماضي الثلاثي المفتوح العين', en: 'Basic triliteral past', tl: 'Payak na nakaraang pandiwa' }, rule: { ar: 'كل حرف أصلي يقابل ف ع ل', en: 'Direct 1-to-1 mapping', tl: 'Direktang pagtutugma' } },
      { pattern: 'اِسْتَفْعَلَ', example: 'اِسْتَغْفَرَ', meaning: { ar: 'مزيد ثلاثي بثلاثة أحرف', en: 'Form X augmented pattern', tl: 'Form X na hulwaran' }, rule: { ar: 'تُزاد الهمزة والسين والتاء في مواضعها', en: 'Prefix اِسْتَ added verbatim', tl: 'Idinadagdag ang اِسْتَ' } },
      { pattern: 'عِلْ', example: 'عِدْ / صِلْ', meaning: { ar: 'أمر المثال المحذوف الفاء', en: 'Imperative of Mithal with dropped Waw', tl: 'Pautos na walang unang Waw' }, rule: { ar: 'حُذفت الفاء لمقابلة الواو المحذوفة', en: 'ف dropped matching deleted و', tl: 'Tinanggal ang ف bilang katumbas ng و' } },
    ],
    examples: [
      { arabic: 'مَكْتُوبٌ ← مَفْعُولٌ', transliteration: 'maktūbun → maf\'ūlun', translation: { ar: 'اسم مفعول من كتب', en: 'Written (Passive Participle)', tl: 'Nakasulat' }, analysis: { ar: 'الميم والواو زائدتان، والكاف والتاء والباء تقابل الفاء والعين واللام.', en: 'م and و are affixes; ك-ت-ب map to ف-ع-ل.', tl: 'Ang م at و ay dagdag; ك-ت-ب ay ف-ع-ل.' } },
      { arabic: 'قِ ← عِ', transliteration: 'qi → \'i', translation: { ar: 'أمر من وَقَى', en: 'Protect! (from وَقَى)', tl: 'Magprotekta!' }, analysis: { ar: 'حُذفت الفاء (الواو) واللام (الياء)، ولم يبق إلا العين المكسورة.', en: 'Both ف (و) and ل (ي) dropped, leaving only عِ.', tl: 'Nabura ang ف at ل kaya عِ lamang ang natira.' } },
    ],
    exceptions: [
      { ar: 'في القلب المكاني يُقلب الميزان كذلك؛ فوزن (أَيْسَ) مقلوب (يَئِسَ) هو (عَفِلَ) لا (فَعِلَ)، ووزن (حَادِي) من الوَحدة هو (عَالِف).', en: 'In metathesis (القلب المكاني), the scale mirrors the swapped radicals: أَيْسَ (from يَئِسَ) weighs عَفِلَ.', tl: 'Sa pagpapalit-puwesto ng letra (metathesis), sumasabay din ang sukatan.' },
    ],
    commonMistakes: [
      { ar: 'الخطأ في وزن (قُلْ) على (فُلْ) بظنها (فَعْل)؛ الصواب حذف العين لأن المحذوف هو الواو عين الكلمة.', en: 'Mistakenly weighing قُلْ as فَعْل instead of فُلْ; the dropped letter is the middle radical (ع).', tl: 'Maling pagsusukat sa قُلْ bilang فَعْل sa halip na فُلْ.' },
    ],
    comparison: {
      ar: 'الميزان الصرفي يدرس بنية المفردة من حيث أصولها وزوائدها، بينما الإعراب يدرس حركة آخر الكلمة تبعًا لموقعها في الجملة.',
      en: 'Al-Mizan al-Sarfi analyzes internal word structure, whereas I\'rab analyzes the syntactic ending within a sentence.',
      tl: 'Sinusuri ng Mizan ang loob ng salita, samantalang ang I\'rab ay ang dulo ng salita sa pangungusap.',
    },
    practicalExercises: [
      { id: 'ex-s01-1', prompt: { ar: 'ما وزن كلمة (اِنْطَلَقَ)؟', en: 'What is the morphological pattern of اِنْطَلَقَ?', tl: 'Ano ang pattern ng اِنْطَلَقَ?' }, arabicPrompt: 'اِنْطَلَقَ', answer: 'اِنْفَعَلَ', explanation: { ar: 'الأصل ط-ل-ق، والهمزة والنون زائدتان.', en: 'Root is ط-ل-ق; اِ and نْ are augmented.', tl: 'Ang ugat ay ط-ل-ق; ang اِ at نْ ay dagdag.' } },
      { id: 'ex-s01-2', prompt: { ar: 'ما وزن كلمة (نَمْ) من نَامَ يَنَامُ؟', en: 'What is the scale of نَمْ (Sleep!)?', tl: 'Ano ang sukatan ng نَمْ?' }, arabicPrompt: 'نَمْ', answer: 'فَلْ', explanation: { ar: 'أصلها نَوَمَ، وحُذفت الألف (العين) لالتقاء الساكنين.', en: 'Root ن-و-م; the middle radical (ع) dropped before sukun.', tl: 'Ugat na ن-و-م; nawala ang gitnang letra (ع).' } },
    ],
    summary: {
      ar: 'الميزان الصرفي (ف ع ل) هو المفتاح الأساس لعلم الصرف؛ به تُعرف الأصول والزوائد والمحذوفات.',
      en: 'The ف-ع-ل scale is the foundational key of Sarf for identifying roots, affixes, and deletions.',
      tl: 'Ang sukatan na ف-ع-ل ang susi sa pag-unawa ng mga ugat at dagdag na letra sa Sarf.',
    },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA, qiyasiVsSamaai: 'قياسي' },
  }),

  makeSarfChapter(2, 'sarf-02', 'beginner', 'المجرد والمزيد من الأفعال', 'Root (Mujarrad) & Augmented (Mazid) Verbs', 'Mga Pandiwang Payak (Mujarrad) at Pinalawak (Mazid)', {
    objectives: [
      { ar: 'التمييز بين الفعل الثلاثي المجرد والرباعي المجرد.', en: 'Distinguish triliteral and quadriliteral bare verbs.', tl: 'Makilala ang tatluhan at apatang payak na pandiwa.' },
      { ar: 'حفظ أوزان المزيد الثلاثي (بحرف، بحرفين، بثلاثة) والمزيد الرباعي.', en: 'Master all 10 triliteral forms and quadriliteral augmented patterns.', tl: 'Maisaulo ang mga pinalawak na porma ng pandiwa.' },
    ],
    introduction: {
      ar: 'ينقسم الفعل العربي باعتبار عدد حروفه الأصلية إلى مجرد ومزيد، وأكثر الأفعال دورانًا في العربية هي الثلاثية المجردة ثم المزيدة بأوزانها القياسية.',
      en: 'Arabic verbs are classified as bare (Mujarrad — containing only root letters) or augmented (Mazid — adding 1, 2, or 3 letters to express nuanced meanings).',
      tl: 'Nahahati ang pandiwang Arabe sa Mujarrad (purong ugat) at Mazid (may dagdag na letra).',
    },
    definition: {
      arabicTerm: 'المجرد والمزيد',
      text: {
        ar: 'المجرد ما كانت جميع حروفه أصلية لا يسقط حرف منها في تصاريف الكلمة لغير علة، والمزيد ما زيد فيه حرف أو أكثر على حروفه الأصلية.',
        en: 'Mujarrad consists exclusively of root radicals; Mazid adds one to three augment letters (up to a maximum of 6 letters for verbs).',
        tl: 'Ang Mujarrad ay binubuo ng purong ugat; ang Mazid ay may dagdag na isa hanggang tatlong letra.',
      },
    },
    explanation: {
      ar: 'الثلاثي المزيد يكون بحرف (أَفْعَلَ، فَعَّلَ، فَاعَلَ)، أو بحرفين (اِنْفَعَلَ، اِفْتَعَلَ، اِفْعَلَّ، تَفَعَّلَ، تَفَاعَلَ)، أو بثلاثة أحرف (اِسْتَفْعَلَ، اِفْعَوْعَلَ، اِفْعَالَّ، اِفْعَوَّلَ). والرباعي المجرد وزنه (فَعْلَلَ)، ويزاد بحرف (تَفَعْلَلَ) أو بحرفين (اِفْعَنْلَلَ، اِفْعَلَلَّ).',
      en: 'Triliteral Mazid expands by 1 letter (Forms II, III, IV), 2 letters (Forms V–IX), or 3 letters (Form X and rare Forms XI–XV). Quadriliteral Mujarrad (فَعْلَلَ) expands by 1 letter (تَفَعْلَلَ) or 2 letters (اِفْعَلَلَّ like اِطْمَأَنَّ).',
      tl: 'Ang tatluhang Mazid ay nadaragdagan ng 1 letra (Forms II–IV), 2 letra (Forms V–IX), o 3 letra (Form X).',
    },
    rules: [
      { ar: 'لا يقل الفعل المجرد في العربية عن ثلاثة أحرف ولا يزيد المزيد عن ستة أحرف.', en: 'No Arabic verb has fewer than 3 letters or more than 6 letters.', tl: 'Walang pandiwang Arabe na mas mababa sa 3 letra o higit sa 6 na letra.' },
      { ar: 'حروف المضارعة (أنيت) وتاء التأنيث والضمائر المتصلة لا تُعدّ من حروف الزيادة التصريفية في عدّ المجرد والمزيد.', en: 'Mudhari prefixes, feminine ت, and attached pronouns do not count as Form-augment letters.', tl: 'Ang mga panlapi ng Mudhari at panghalip ay hindi binibilang na dagdag sa Form.' },
    ],
    classifications: [
      { titleAr: 'المزيد بحرف (ثلاثة أوزان)', titleEn: 'Augmented by 1 Letter (Forms II, III, IV)', titleTl: 'May Dagdag na 1 Letra', description: { ar: 'فَعَّلَ، فَاعَلَ، أَفْعَلَ.', en: 'Doubled middle, long Alif, or prefix Hamza.', tl: 'Mga pormang فَعَّلَ, فَاعَلَ, أَفْعَلَ.' }, examples: ['عَلَّمَ', 'جَاهَدَ', 'أَكْرَمَ'] },
      { titleAr: 'المزيد بحرفين (خمسة أوزان)', titleEn: 'Augmented by 2 Letters (Forms V–IX)', titleTl: 'May Dagdag na 2 Letra', description: { ar: 'تَفَعَّلَ، تَفَاعَلَ، اِنْفَعَلَ، اِفْتَعَلَ، اِفْعَلَّ.', en: 'Five core two-letter augmented forms.', tl: 'Limang pangunahing porma.' }, examples: ['تَعَلَّمَ', 'تَعَاوَنَ', 'اِنْكَسَرَ', 'اِجْتَمَعَ', 'اِحْمَرَّ'] },
      { titleAr: 'المزيد بثلاثة أحرف', titleEn: 'Augmented by 3 Letters (Form X+)', titleTl: 'May Dagdag na 3 Letra', description: { ar: 'أشهرها اِسْتَفْعَلَ.', en: 'Most common is Form X اِسْتَفْعَلَ.', tl: 'Pinakakaraniwan ang اِسْتَفْعَلَ.' }, examples: ['اِسْتَغْفَرَ', 'اِسْتَقَامَ', 'اِعْشَوْشَبَ'] },
    ],
    patterns: [
      { pattern: 'فَعَّلَ (II)', example: 'عَلَّمَ', meaning: { ar: 'التعدية والتكثير', en: 'Causative / Intensive', tl: 'Pagpapagawa / Pagpapatindi' }, rule: { ar: 'تضعيف عين الفعل', en: 'Doubles 2nd radical', tl: 'Dinodoble ang gitnang letra' } },
      { pattern: 'أَفْعَلَ (IV)', example: 'أَخْرَجَ', meaning: { ar: 'التعدية والدخول', en: 'Causative', tl: 'Nagdudulot ng kilos' }, rule: { ar: 'همزة قطع مفتوحة في أوله', en: 'Prefix Hamzat al-Qat\'', tl: 'May Hamzat al-Qat\' sa unahan' } },
      { pattern: 'اِسْتَفْعَلَ (X)', example: 'اِسْتَخْرَجَ', meaning: { ar: 'الطلب أو الصيرورة', en: 'Seeking / Considering', tl: 'Paghiling / Paghingi' }, rule: { ar: 'زيادة الهمزة والسين والتاء', en: 'Prefix اِسْتَ', tl: 'Panlaping اِسْتَ' } },
    ],
    examples: [
      { arabic: 'أَنْزَلَ اللَّهُ الْمَطَرَ', transliteration: 'anzala Allāhu al-maṭara', translation: { ar: 'أنزل: ثلاثي مزيد بحرف (الهمزة)', en: 'God sent down the rain (Form IV)', tl: 'Pinababa ng Diyos ang ulan' }, analysis: { ar: 'أصله (نَزَلَ) لازم، فصارت همزة أفعل منه متعديًا.', en: 'Root ن-ز-ل is intransitive; Form IV Hamza makes it transitive.', tl: 'Ginawang transitive ng Form IV ang نَزَلَ.' } },
    ],
    exceptions: [
      { ar: 'بعض الأفعال الرباعية الملحقة مثل (جَلْبَبَ، حَوْقَلَ، بَيْطَرَ) هي ثلاثية أصلًا أُلحقت بالرباعي بزيادة حرف.', en: 'Quasi-quadriliterals (ملحق بالرباعي) like جَلْبَبَ or حَوْقَلَ have a 3-letter root with an added letter behaving like 4-letter roots.', tl: 'May mga salitang mukhang 4-letter root ngunit 3-letter root lamang sa pinagmulan.' },
    ],
    commonMistakes: [
      { ar: 'ظنّ أن (تَعْلَمُ) مزيد بالتاء؛ والصواب أنه مضارع (عَلِمَ) المجرد، والتاء للمضارعة.', en: 'Confusing تَعْلَمُ (Mudhari of Form I عَلِمَ) with Form V تَعَلَّمَ.', tl: 'Pagkakamali ng تَعْلَمُ (Form I) bilang Form V.' },
    ],
    comparison: {
      ar: 'المزيد الثلاثي يرتقي إلى ستة أحرف بحد أقصى، بينما الرباعي المجرد أربعة ويصل بالمزيد إلى ستة كذلك (اِطْمَأَنَّ، اِقْشَعَرَّ).',
      en: 'Both triliteral and quadriliteral verbs cap at 6 letters total when augmented.',
      tl: 'Parehong hanggang 6 na letra lamang ang maaaring haba ng pandiwa.',
    },
    practicalExercises: [
      { id: 'ex-s02-1', prompt: { ar: 'حدّد نوع الفعل (اِجْتَهَدَ) من حيث التجرد والزيادة.', en: 'Classify اِجْتَهَدَ as Mujarrad or Mazid.', tl: 'Uriin ang اِجْتَهَدَ.' }, arabicPrompt: 'اِجْتَهَدَ', answer: 'ثلاثي مزيد بحرفين (الهمزة والتاء) على وزن اِفْتَعَلَ', explanation: { ar: 'الجذر ج-ه-د.', en: 'Root is ج-ه-د with prefix اِ and infix ت.', tl: 'Ugat na ج-ه-د na may dagdag na اِ at ت.' } },
    ],
    summary: { ar: 'التفريق بين الحروف الأصلية والزائدة أساس فهم معاني الأفعال وتصريفاتها.', en: 'Distinguishing root from augment letters unlocks verb meanings and conjugation.', tl: 'Ang pagkilala sa ugat at dagdag na letra ang susi sa kahulugan ng pandiwa.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(3, 'sarf-03', 'beginner', 'أبواب الفعل الثلاثي المجرد الستة', 'The Six Abwab of Form I Verbs', 'Ang Anim na Kabanata (Abwab) ng Form I', {
    objectives: [
      { ar: 'معرفة الأبواب الستة للثلاثي المجرد بحسب حركة العين ماضيًا ومضارعًا.', en: 'Identify the six classical Form I patterns by middle-radical vowel shifts.', tl: 'Makilala ang anim na pattern ng Form I ayon sa gitnang patinig.' },
      { ar: 'فهم سبب غلبة الفتح في باب فَعَلَ يَفْعَلُ (حروف الحلق).', en: 'Understand guttural-letter influence in Bab Fataha-Yaftahu.', tl: 'Maunawaan ang epekto ng letrang panglalamunan sa Bab Fataha.' },
    ],
    introduction: {
      ar: 'يختلف ضبط عين الفعل الثلاثي المجرد بين الماضي والمضارع في ستة أبواب مشهورة تُسمى أبواب الصرف، وتُعرَف بالسماع والرجوع إلى المعاجم مع وجود ضوابط مساعدة.',
      en: 'Form I verbs vary in the vowel of the 2nd radical between Past and Present across six classical Abwab, captured in the mnemonic: فَتْحُ ضَمٍّ فَتْحُ كَسْرٍ فَتْحَتَانِ * كَسْرُ فَتْحٍ ضَمُّ ضَمٍّ كَسْرَتَانِ.',
      tl: 'Nagkakaiba ang mga pandiwang Form I sa patinig ng gitnang letra sa anim na klasikong Abwab.',
    },
    definition: {
      arabicTerm: 'أبواب الثلاثي الستة',
      text: {
        ar: 'الصيغ الست الناتجة من تقابل حركة عين الماضي (الفتح والكسر والضم) مع حركة عين المضارع (الضم والفتح والكسر).',
        en: 'The six attested pairings of middle-radical vowels across Past (فَعَلَ / فَعِلَ / فَعُلَ) and Present (يَفْعُلُ / يَفْعِلُ / يَفْعَلُ).',
        tl: 'Ang anim na pares ng gitnang patinig sa Past at Present.',
      },
    },
    explanation: {
      ar: 'الأبواب الستة مرتبة حسب كثرتها: ١- نَصَرَ يَنْصُرُ (فَعَلَ يَفْعُلُ)، ٢- ضَرَبَ يَضْرِبُ (فَعَلَ يَفْعِلُ)، ٣- فَتَحَ يَفْتَحُ (فَعَلَ يَفْعَلُ — وشرطه غالبًا وجود حرف حلق في العين أو اللام)، ٤- عَلِمَ يَعْلَمُ (فَعِلَ يَفْعَلُ)، ٥- كَرُمَ يَكْرُمُ (فَعُلَ يَفْعُلُ — للطباع ولازم دائمًا)، ٦- حَسِبَ يَحْسِبُ (فَعِلَ يَفْعِلُ — وهو أقلها).',
      en: 'Ranked by frequency: (1) فَعَلَ يَفْعُلُ (نَصَرَ), (2) فَعَلَ يَفْعِلُ (ضَرَبَ), (3) فَعَلَ يَفْعَلُ (فَتَحَ — usually requires a guttural letter ء هـ ع ح غ خ in 2nd or 3rd position), (4) فَعِلَ يَفْعَلُ (عَلِمَ), (5) فَعُلَ يَفْعُلُ (كَرُمَ — inherent qualities, always intransitive), (6) فَعِلَ يَفْعِلُ (حَسِبَ — rarest).',
      tl: 'Anim na pangkat: (1) نَصَرَ يَنْصُرُ, (2) ضَرَبَ يَضْرِبُ, (3) فَتَحَ يَفْتَحُ, (4) عَلِمَ يَعْلَمُ, (5) كَرُمَ يَكْرُمُ, at (6) حَسِبَ يَحْسِبُ.',
    },
    rules: [
      { ar: 'باب فَعُلَ يَفْعُلُ لا يكون إلا لازمًا ويدل على الغرائز والصفات الثابتة.', en: 'Bab Fa\'ula-Yaf\'ulu is strictly intransitive and denotes permanent traits.', tl: 'Ang Bab Fa\'ula-Yaf\'ulu ay palaging Lazim.' },
      { ar: 'باب فَعَلَ يَفْعَلُ يغلب فيه وجود أحد حروف الحلق الستة (ء، هـ، ع، ح، غ، خ) في موضع العين أو اللام.', en: 'Bab Fa\'ala-Yaf\'alu typically features a guttural letter in 2nd or 3rd radical.', tl: 'Ang Bab Fa\'ala-Yaf\'alu ay karaniwang may letrang panglalamunan.' },
    ],
    classifications: [
      { titleAr: 'الأبواب السماعية الستة', titleEn: 'The Six Patterns', titleTl: 'Anim na Pattern', description: { ar: 'تجمعها أمثلة: نَصَرَ، ضَرَبَ، فَتَحَ، عَلِمَ، حَسِبَ، كَرُمَ.', en: 'Represented by Nasara, Daraba, Fataha, Alima, Hasiba, Karuma.', tl: 'Nasara, Daraba, Fataha, Alima, Hasiba, Karuma.' }, examples: ['نَصَرَ يَنْصُرُ', 'ضَرَبَ يَضْرِبُ', 'فَتَحَ يَفْتَحُ', 'عَلِمَ يَعْلَمُ', 'حَسِبَ يَحْسِبُ', 'كَرُمَ يَكْرُمُ'] },
    ],
    patterns: [
      { pattern: 'فَعَلَ يَفْعُلُ', example: 'كَتَبَ يَكْتُبُ', meaning: { ar: 'فتح فضم', en: 'Fatha → Damma', tl: 'Fatha → Damma' }, rule: { ar: 'تُضَم همزة الأمر (اُكْتُبْ)', en: 'Amr Hamzat al-Wasl takes Damma', tl: 'Damma sa Amr' } },
      { pattern: 'فَعَلَ يَفْعِلُ', example: 'جَلَسَ يَجْلِسُ', meaning: { ar: 'فتح فكسر', en: 'Fatha → Kasra', tl: 'Fatha → Kasra' }, rule: { ar: 'تُكسر همزة الأمر (اِجْلِسْ)', en: 'Amr Hamzat al-Wasl takes Kasra', tl: 'Kasra sa Amr' } },
      { pattern: 'فَعِلَ يَفْعَلُ', example: 'فَهِمَ يَفْهَمُ', meaning: { ar: 'كسر ففتح', en: 'Kasra → Fatha', tl: 'Kasra → Fatha' }, rule: { ar: 'تُكسر همزة الأمر (اِفْهَمْ)', en: 'Amr Hamzat al-Wasl takes Kasra', tl: 'Kasra sa Amr' } },
    ],
    examples: [
      { arabic: 'كَرُمَ الرَّجُلُ وَحَسُنَ خُلُقُهُ', transliteration: 'karuma ar-rajulu wa ḥasuna khuluquhu', translation: { ar: 'أفعال السجايا من باب فَعُلَ', en: 'The man was noble and his character became good', tl: 'Naging marangal ang lalaki' }, analysis: { ar: 'كلا الفعلين لازم من باب كَرُمَ يَكْرُمُ.', en: 'Both verbs are intransitive Bab Fa\'ula-Yaf\'ulu.', tl: 'Parehong Lazim sa Bab Fa\'ula.' } },
    ],
    exceptions: [
      { ar: 'أفعال قليلة جاءت على (فَعَلَ يَفْعَلُ) دون حرف حلق مثل: أَبَى يَأْبَى، ورَكَنَ يَرْكَنُ، وقَلَى يَقْلَى.', en: 'Rare verbs like أَبَى يَأْبَى occur in فَعَلَ يَفْعَلُ without a guttural letter (سماعي).', tl: 'May iilang pandiwa tulad ng أَبَى يَأْبَى na walang letrang panglalamunan.' },
    ],
    commonMistakes: [
      { ar: 'نطق مضارع (دَرَسَ) بالفتح (يَدْرَسُ) أو الكسر، والصواب (يَدْرُسُ) بالضم.', en: 'Mispronouncing يَدْرُسُ with Fatha instead of Damma.', tl: 'Maling pagbigkas ng يَدْرُسُ.' },
    ],
    comparison: {
      ar: 'ثلاثة أبواب نظريًا مستحيلة أو مهملة في الصرف، أشهرها (فَعُلَ يَفْعِلُ) و(فَعُلَ يَفْعَلُ) لثقل الانتقال.',
      en: 'Combinations like فَعُلَ يَفْعِلُ do not exist in standard Arabic due to articulatory heaviness.',
      tl: 'Hindi umiiral ang فَعُلَ يَفْعِلُ sa wikang Arabe.',
    },
    practicalExercises: [
      { id: 'ex-s03-1', prompt: { ar: 'من أي باب الفعل (شَرِبَ يَشْرَبُ)؟', en: 'Which Bab does شَرِبَ يَشْرَبُ belong to?', tl: 'Anong Bab ang شَرِبَ يَشْرَبُ?' }, arabicPrompt: 'شَرِبَ يَشْرَبُ', answer: 'الباب الرابع: فَعِلَ يَفْعَلُ (عَلِمَ يَعْلَمُ)', explanation: { ar: 'العين مكسورة في الماضي ومفتوحة في المضارع.', en: 'Kasra in past, Fatha in present.', tl: 'Kasra sa Past, Fatha sa Present.' } },
    ],
    summary: { ar: 'تحديد باب الفعل الثلاثي المجرد يُعرَف بالمعجم لأن حركة عين المضارع سماعية.', en: 'Form I Bab is lexical (Sama\'i) and anchors Mudhari and Amr vocalization.', tl: 'Ang Bab ng Form I ay batay sa diksiyonaryo at nagtatakda ng patinig sa Mudhari at Amr.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA, qiyasiVsSamaai: 'سماعي' },
  }),

  makeSarfChapter(4, 'sarf-04', 'intermediate', 'معاني صيغ الزوائد (أوزان الأفعال المزيدة)', 'Meanings of Augmented Verb Forms II–X', 'Mga Kahulugan ng Pinalawak na Porma (II–X)', {
    objectives: [
      { ar: 'معرفة الدلالات المعنوية لكل وزن من أوزان المزيد.', en: 'Learn the semantic functions of Forms II through X.', tl: 'Matutunan ang mga kahulugang semantiko ng Forms II–X.' },
    ],
    introduction: {
      ar: 'الزيادة في المبنى تدل على زيادة في المعنى؛ فانتقال الجذر من (فَعَلَ) إلى (فَعَّلَ) أو (أَفْعَلَ) أو (تَفَاعَلَ) يولّد معاني التعدية والمشاركة والطلب والمطاوعة.',
      en: 'In Arabic morphology, an addition in form signals an addition in meaning: transforming a root across Forms II–X conveys causation, mutuality, reflexivity, or seeking.',
      tl: 'Sa morpolohiyang Arabe, ang dagdag na letra sa porma ay nagdadala ng dagdag na kahulugan.',
    },
    definition: { arabicTerm: 'معاني الزيادة', text: { ar: 'الدلالات الصرفية التي تضيفها حروف الزيادة على أصل معنى الجذر الثلاثي.', en: 'The systematic semantic shifts imparted by each augmented verb pattern.', tl: 'Ang mga pagbabago sa kahulugan na dulot ng bawat dagdag na pattern.' } },
    explanation: {
      ar: 'فَعَّلَ للتكثير والتعدية (كَسَّرَ، عَلَّمَ)، فَاعَلَ للمشاركة بين اثنين (قَاتَلَ، نَاقَشَ)، أَفْعَلَ للتعدية والصيرورة (أَخْرَجَ، أَثْمَرَ)، تَفَعَّلَ للمطاوعة والتكلف (تَعَلَّمَ، تَشَجَّعَ)، تَفَاعَلَ للاشتراك والتظاهر (تَعَاوَنَ، تَمَارَضَ)، اِنْفَعَلَ للمطاوعة المحضة (اِنْكَسَرَ)، اِفْتَعَلَ للاتخاذ والاجتهاد (اِكْتَتَبَ، اِجْتَهَدَ)، اِفْعَلَّ للألوان والعيوب (اِحْمَرَّ)، اِسْتَفْعَلَ للطلب والاعتقاد (اِسْتَغْفَرَ، اِسْتَحْسَنَ).',
      en: 'Form II: intensification/causation; Form III: mutual/directed action; Form IV: causation; Form V: reflexive of II or gradual effort; Form VI: mutual participation or feigning; Form VII: pure reflexive/resultative; Form VIII: adopting/striving; Form IX: colors/defects; Form X: seeking/deeming.',
      tl: 'Form II: pagpapagawa; Form III: pagtutugon; Form IV: pagdudulot; Form V/VII: reflexive; Form VI: pagtutulungan; Form IX: kulay; Form X: paghiling.',
    },
    rules: [
      { ar: 'تتعدد معاني الصيغة الواحدة ويُحدّد المقصود بالسياق اللغوي.', en: 'A single form can carry several potential meanings determined by context.', tl: 'Ang konteksto ang nagtatakda ng eksaktong kahulugan ng porma.' },
    ],
    classifications: [
      { titleAr: 'التعدية', titleEn: 'Causativity (II & IV)', titleTl: 'Pagdudulot ng Kilos', description: { ar: 'تحويل اللازم إلى متعدٍّ.', en: 'Turns intransitive to transitive.', tl: 'Ginagawang transitive ang Lazim.' }, examples: ['خَرَجَ ← أَخْرَجَ', 'فَرِحَ ← فَرَّحَ'] },
      { titleAr: 'المشاركة', titleEn: 'Reciprocity (III & VI)', titleTl: 'Pagtutulungan', description: { ar: 'فعل يشترك فيه طرفان.', en: 'Action involving two parties.', tl: 'Kilos sa pagitan ng dalawa.' }, examples: ['حَاوَرَ', 'تَعَاوَنَ'] },
    ],
    patterns: [
      { pattern: 'اِنْفَعَلَ', example: 'اِنْفَتَحَ', meaning: { ar: 'المطاوعة', en: 'Resultative passive-like', tl: 'Kinalabasan ng kilos' }, rule: { ar: 'لا يُبنى إلا من الأفعال العلاجية الحسية غالبًا', en: 'Usually from physical transitive verbs', tl: 'Mula sa pisikal na kilos' } },
      { pattern: 'اِسْتَفْعَلَ', example: 'اِسْتَفْهَمَ', meaning: { ar: 'طلب الفهم', en: 'Seeking understanding', tl: 'Paghingi ng paliwanag' }, rule: { ar: 'يدل على الطلب أو الاعتقاد (اِسْتَعْظَمَ)', en: 'Seeking or deeming', tl: 'Paghiling o pagturing' } },
    ],
    examples: [
      { arabic: 'كَسَرْتُ الزُّجَاجَ فَانْكَسَرَ', transliteration: 'kasartu az-zujāja fankasara', translation: { ar: 'انكسر مطاوعة لكَسَرَ', en: 'I broke the glass, and so it broke', tl: 'Binasag ko ang salamin kaya nabasag ito' }, analysis: { ar: 'اِنْكَسَرَ يدل على أثر كَسَرَ.', en: 'Form VII expresses the result of Form I.', tl: 'Ipinapakita ng Form VII ang resulta ng Form I.' } },
    ],
    exceptions: [{ ar: 'ترد بعض الأفعال المزيدة لمعانٍ سماعية لا تُحمل على القاعدة الغالبة مثل (سَافَرَ) الذي لا يدل على المشاركة بل الوجهة.', en: 'Some verbs like سَافَرَ (to travel) are lexicalized in Form III without reciprocal meaning.', tl: 'Ang ilang pandiwa tulad ng سَافَرَ ay walang mutual na kahulugan kahit nasa Form III.' }],
    commonMistakes: [{ ar: 'حصر معنى (أَفْعَلَ) في التعدية فقط وإهمال معنى الدخول في الزمان/المكان مثل (أَصْبَحَ، أَشْأَمَ).', en: 'Assuming Form IV is always causative (missing meanings like entering time/place: أَصْبَحَ).', tl: 'Pag-aakalang laging causative ang Form IV.' }],
    comparison: { ar: 'فَعَّلَ يدل على التدرج والتكثير، بينما أَفْعَلَ يدل على وقوع الفعل دفعةً واحدة غالبًا (عَلَّمَ vs أَعْلَمَ).', en: 'Form II often implies gradual/intensive action (عَلَّمَ to teach), while Form IV implies immediate notification (أَعْلَمَ to inform).', tl: 'Ang Form II (عَلَّمَ) ay unti-unting pagtuturo; ang Form IV (أَعْلَمَ) ay agarang pagpapaalam.' },
    practicalExercises: [{ id: 'ex-s04-1', prompt: { ar: 'ما المعنى المستفاد من صيغة (تَنَاوَمَ)؟', en: 'What nuance does Form VI تَنَاوَمَ express?', tl: 'Ano ang kahulugan ng تَنَاوَمَ?' }, arabicPrompt: 'تَنَاوَمَ', answer: 'التظاهر بالنوم', explanation: { ar: 'من معاني تَفَاعَلَ التظاهر بالفعل دون حقيقته.', en: 'Form VI can express pretending (feigning sleep).', tl: 'Pagkukunwaring natutulog.' } }],
    summary: { ar: 'معاني الصيغ تمنح العربية ثراءً تعبيريًّا دقيقًا من الجذر الواحد.', en: 'Augmented verb meanings unlock nuanced expression from a single root.', tl: 'Nagbibigay ng mayamang kahulugan ang mga porma mula sa iisang ugat.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(5, 'sarf-05', 'beginner', 'تقسيم الفعل إلى صحيح ومعتل', 'Sound (Sahih) vs. Weak (Mu\'tall) Verbs', 'Mga Pandiwang Malusog (Sahih) at Mahina (Mu\'tall)', {
    objectives: [
      { ar: 'تصنيف الأفعال إلى أقسام الصحيح الثلاثة وأقسام المعتل الأربعة.', en: 'Classify every verb into the 3 Sahih and 4 Mu\'tall categories.', tl: 'Mauri ang pandiwa sa 3 Sahih at 4 Mu\'tall na kategorya.' },
    ],
    introduction: {
      ar: 'ينظر الصرفيون إلى حروف الجذر الثلاثي؛ فإن خلت من الواو والألف والياء فالفعل صحيح، وإن احتوت على حرف علة أو أكثر فالفعل معتل.',
      en: 'Verb morphology divides roots based on whether any of the three root radicals is a weak letter (و، ا، ي).',
      tl: 'Inuuri ang mga pandiwa kung may mahinang letra (و، ا، ي) sa ugat nito o wala.',
    },
    definition: { arabicTerm: 'الصحيح والمعتل', text: { ar: 'الصحيح ما خلت أصوله من أحرف العلة (و، ا، ي)، والمعتل ما كان في أصوله حرف علة أو أكثر.', en: 'Sahih lacks weak root letters; Mu\'tall contains one or two weak letters in its root.', tl: 'Ang Sahih ay walang mahinang letra sa ugat; ang Mu\'tall ay may isa o dalawa.' } },
    explanation: {
      ar: 'أقسام الصحيح ثلاثة: السالم (كَتَبَ)، المهموز (أَخَذَ، سَأَلَ، قَرَأَ)، المضعف (مَدَّ، زَلْزَلَ). وأقسام المعتل أربعة: المثال (وَعَدَ)، الأجوف (قَالَ)، الناقص (دَعَا، رَمَى)، واللفيف بنوعيه: المفروق (وَقَى) والمقرون (طَوَى).',
      en: 'Sahih: Salim (sound), Mahmuz (contains ء), Muda\'af (doubled radical). Mu\'tall: Mithal (1st weak), Ajwaf (2nd weak), Naqis (3rd weak), Lafif Mafruq (1st & 3rd weak), Lafif Maqrun (2nd & 3rd weak).',
      tl: 'Sahih: Salim, Mahmuz, Muda\'af. Mu\'tall: Mithal, Ajwaf, Naqis, Lafif Mafruq, Lafif Maqrun.',
    },
    rules: [
      { ar: 'العبرة بالحروف الأصلية في الماضي الثلاثي المجرد، لا بحروف الزيادة؛ فالفعل (قَاتَلَ) صحيح سالم رغم وجود الألف الزائدة!', en: 'Classification depends strictly on the ROOT letters: قَاتَلَ (root ق-ت-ل) is Salim despite the augmented Alif!', tl: 'Nakabatay ang uri sa UGAT na letra: ang قَاتَلَ ay Salim kahit may dagdag na Alif!' },
    ],
    classifications: [
      { titleAr: 'أقسام الصحيح (٣)', titleEn: 'Sound Subtypes', titleTl: 'Mga Uri ng Sahih', description: { ar: 'السالم والمهموز والمضعف.', en: 'Salim, Mahmuz, Muda\'af.', tl: 'Salim, Mahmuz, Muda\'af.' }, examples: ['نَصَرَ (سالم)', 'سَأَلَ (مهموز)', 'شَدَّ (مضعف)'] },
      { titleAr: 'أقسام المعتل (٤)', titleEn: 'Weak Subtypes', titleTl: 'Mga Uri ng Mu\'tall', description: { ar: 'المثال والأجوف والناقص واللفيف.', en: 'Mithal, Ajwaf, Naqis, Lafif.', tl: 'Mithal, Ajwaf, Naqis, Lafif.' }, examples: ['وَجَدَ (مثال)', 'بَاعَ (أجوف)', 'سَعَى (ناقص)', 'وَعَى (لفيف مفروق)', 'نَوَى (لفيف مقرون)'] },
    ],
    patterns: [
      { pattern: 'فَعَلَ (أجوف)', example: 'قَالَ', meaning: { ar: 'أصله قَوَلَ', en: 'Root ق-و-ل', tl: 'Ugat ق-و-ل' }, rule: { ar: 'الألف في الأجوف منقلبة عن واو أو ياء دائمًا', en: 'Medial Alif always derives from و or ي', tl: 'Ang Alif sa gitna ay galing sa و o ي' } },
    ],
    examples: [
      { arabic: 'أَكْرَمَ وَوَعَدَ وَطَوَى', transliteration: 'akrama wa wa\'ada wa ṭawā', translation: { ar: 'مقارنة بين الصحيح والمعتل', en: 'He honored (Sahih), promised (Mithal), and folded (Lafif Maqrun)', tl: 'Pinarangalan, nangako, at tinupi' }, analysis: { ar: 'أَكْرَمَ جذره ك-ر-م صحيح سالم رغم همزة أفعل.', en: 'أَكْرَمَ is Salim because root ك-ر-م has no Hamza or weak letter.', tl: 'Ang أَكْرَمَ ay Salim dahil ك-ر-م ang ugat.' } },
    ],
    exceptions: [{ ar: 'تُسمى همزة المهموز حرفًا صحيحًا لكنها تُلحق بالمعتل أحيانًا لما يطرأ عليها من تخفيف وإبدال.', en: 'Hamza is technically a consonant, not a weak letter, though it undergoes special easing rules.', tl: 'Ang Hamza ay katinig ngunit may mga espesyal na tuntunin sa pagbigkas.' }],
    commonMistakes: [{ ar: 'عدّ الفعل (أَخْرَجَ) مهموزًا أو (نَاقَشَ) أجوفًا؛ والواجب النظر إلى الجذر الثلاثي المجرد فقط.', en: 'Misclassifying أَخْرَجَ as Mahmuz or نَاقَشَ as Ajwaf because of augmented letters.', tl: 'Pagkakamali sa pag-uri ng أَخْرَجَ o نَاقَشَ dahil sa dagdag na letra.' }],
    comparison: { ar: 'الفعل الصحيح السالم لا يتغير في تصريفه، بينما المعتل تطرأ عليه قواعد الإعلال بالقلب والإسكان والحذف.', en: 'Salim verbs keep all radicals intact; Mu\'tall verbs undergo I\'lal transformations.', tl: 'Hindi nagbabago ang mga ugat sa Salim; ang Mu\'tall ay sumasailalim sa I\'lal.' },
    practicalExercises: [{ id: 'ex-s05-1', prompt: { ar: 'صنّف الفعل (اِسْتَقَامَ) من حيث الصحة والاعتلال.', en: 'Classify اِسْتَقَامَ (root ق-و-م).', tl: 'Uriin ang اِسْتَقَامَ.' }, arabicPrompt: 'اِسْتَقَامَ', answer: 'أجوف واوي مزيد بثلاثة أحرف', explanation: { ar: 'الجذر ق-و-م عينه واو.', en: 'The root ق-و-م has medial Waw.', tl: 'Ang ugat na ق-و-م ay may gitnang Waw.' } }],
    summary: { ar: 'أول خطوة لتصريف أي فعل تصريفًا صحيحًا هي تجريده لمعرفة نوعه من الصحيح أو المعتل.', en: 'Strip a verb to its 3-letter root first to identify its Sahih/Mu\'tall class.', tl: 'Ibalik muna ang pandiwa sa 3-letrang ugat nito upang malaman ang tamang kategorya.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(6, 'sarf-06', 'beginner', 'تصريف الفعل الماضي (المعلوم والمجهول)', 'Past Tense Conjugation: Active & Passive', 'Pagbabanghay ng Nakaraang Pandiwa (Aktibo at Pasibo)', {
    objectives: [
      { ar: 'إسناد الفعل الماضي إلى الضمائر الأربعة عشر.', en: 'Conjugate the Past tense across all 14 pronouns.', tl: 'Maibanghay ang nakaraang pandiwa sa 14 na panghalip.' },
      { ar: 'تحويل الماضي من المعلوم إلى المجهول بدقة.', en: 'Form Passive Madhi accurately across Sound and Weak verbs.', tl: 'Mabuo ang Passive Madhi nang tama.' },
    ],
    introduction: {
      ar: 'يدل الفعل الماضي على حدث وقع قبل زمن التكلم، ويتصل آخره بضمائر الرفع المتحركة والساكنة، كما يُصاغ للمجهول عند حذف الفاعل وإقامة المفعول به مقامه.',
      en: 'Al-Madhi denotes a completed action. It inflects via suffixes for 14 pronouns and shifts to Passive (فُعِلَ) when the agent is omitted.',
      tl: 'Ang Al-Madhi ay nagpapakita ng kilos na tapos na at nagbabago gamit ang mga hulapi para sa 14 na panghalip.',
    },
    definition: { arabicTerm: 'الماضي المعلوم والمجهول', text: { ar: 'الماضي المعلوم ما ذُكر فاعله، والماضي المجهول ما حُذف فاعله وأُنيب عنه مفعوله بتغيير صيغة الفعل إلى ضم أوله وكسر ما قبل آخره.', en: 'Active Madhi pairs with a named Fa\'il; Passive Madhi shifts internal vowels to Damma on the start and Kasra before the final radical (فُعِلَ).', tl: 'Ang Active ay may binanggit na gumawa; ang Passive ay gumagamit ng huwarang فُعِلَ.' } },
    explanation: {
      ar: 'يُبنى الماضي المعلوم على الفتح (كَتَبَ، كَتَبَا، كَتَبَتْ)، وعلى الضم مع واو الجماعة (كَتَبُوا)، وعلى السكون مع ضمائر الرفع المتحركة (كَتَبْنَ، كَتَبْتُ، كَتَبْنَا). وللمجهول يُضم أوله ويُكسر ما قبل آخره في الثلاثي (كُتِبَ)، وتُضم التاء الأولى والثاني في تَفَعَّلَ وتَفَاعَلَ (تُعُلِّمَ، تُقُوتِلَ)، وتُقلب الألف واوًا في فَاعَلَ (قُوتِلَ).',
      en: 'Active Madhi takes Fatha (كَتَبَ), Damma before plural Waw (كَتَبُوا), and Sukun before consonant suffixes (كَتَبْتُ, كَتَبْنَ). Passive: Damma on initial vowel + Kasra before last radical (كُتِبَ, أُكْرِمَ, عُلِّمَ, اُسْتُغْفِرَ).',
      tl: 'Sa Passive Madhi, ginagawang Damma ang simula at Kasra ang patinig bago ang huling letra (كُتِبَ).',
    },
    rules: [
      { ar: 'قاعدة بناء الماضي للمجهول: ضم كل متحرك قبل ما قبل الآخر وكسر ما قبل الآخر.', en: 'Passive Madhi rule: Kasra before the final radical, and Damma on all preceding vowelized letters.', tl: 'Kasra bago ang huling letra, at Damma sa mga naunang may patinig na letra.' },
      { ar: 'الفعل اللازم المحض لا يُبنى للمجهول إلا إذا تعدى بحرف جر أو ظرف أو مصدر (جُلِسَ فِي الْمَجْلِسِ).', en: 'Intransitive verbs only take an impersonal passive with a prepositional phrase (جُلِسَ فِيهِ).', tl: 'Ang pandiwang Lazim ay nangangailangan ng pariralang pang-ukol para sa passive.' },
    ],
    classifications: [
      { titleAr: 'ضمائر الرفع الساكنة', titleEn: 'Vowel-initial/Silent Suffixes', titleTl: 'Mga Hulaping Patinig', description: { ar: 'ألف الاثنين، واو الجماعة.', en: 'ا، وا (no consonant clash).', tl: 'ا at وا.' }, examples: ['كَتَبَا', 'كَتَبُوا'] },
      { titleAr: 'ضمائر الرفع المتحركة', titleEn: 'Consonant-initial Suffixes', titleTl: 'Mga Hulaping Katinig', description: { ar: 'تاء الفاعل، نا الفاعلين، نون النسوة.', en: 'تَ/تِ/تُ/تُمَا/تُمْ/تُنَّ، نَا، نَ (trigger Sukun on 3rd radical).', tl: 'Nagdudulot ng Sukun sa huling ugat.' }, examples: ['كَتَبْتُ', 'كَتَبْنَا', 'كَتَبْنَ'] },
    ],
    patterns: [
      { pattern: 'فَعَلَ → فُعِلَ', example: 'نَصَرَ ← نُصِرَ', meaning: { ar: 'مجهول الثلاثي', en: 'Form I Passive', tl: 'Form I Passive' }, rule: { ar: 'ضم الأول وكسر الثاني', en: 'Damma-Kasra', tl: 'Damma-Kasra' } },
      { pattern: 'فَاعَلَ → فُوعِلَ', example: 'شَاهَدَ ← شُوهِدَ', meaning: { ar: 'مجهول فاعل', en: 'Form III Passive', tl: 'Form III Passive' }, rule: { ar: 'تُقلب الألف واوًا لانضمام ما قبلها', en: 'Alif turns to Waw after Damma', tl: 'Nagiging Waw ang Alif' } },
    ],
    examples: [
      { arabic: 'قُوتِلَ الْعَدُوُّ', transliteration: 'qūtila al-\'aduwwu', translation: { ar: 'بني للمجهول بقلب الألف واوًا', en: 'The enemy was fought', tl: 'Nilabanan ang kaaway' }, analysis: { ar: 'العدوّ نائب فاعل مرفوع.', en: 'Al-\'aduwwu is Na\'ib al-Fa\'il (Marfu\').', tl: 'Ang الْعَدُوُّ ay Na\'ib al-Fa\'il.' } },
    ],
    exceptions: [{ ar: 'في الأجوف الثلاثي يُكسر أوله وتُقلب عينه ياءً في المجهول (قِيلَ، بِيعَ) ويجوز الإشمام في الفصيح.', en: 'Hollow Form I verbs form Passive as قِيلَ and بِيعَ (Kasra + Ya) instead of *قُوِلَ.', tl: 'Ang mga pandiwang Ajwaf sa Passive ay nagiging قِيلَ at بِيعَ.' }],
    commonMistakes: [{ ar: 'ترك التاء الثانية مفتوحة في مجهول تَعَلَّمَ؛ والصواب ضم الأول والثاني معًا: تُعُلِّمَ.', en: 'Forgetting to Damma the second letter in Form V/VI passives (تُعُلِّمَ, not *تَعُلِّمَ).', tl: 'Pagkalimot sa Damma sa pangalawang letra ng تُعُلِّمَ.' }],
    comparison: { ar: 'الماضي مبني دائمًا في كل حالاته، بخلاف المضارع المعرب.', en: 'Madhi is always indeclinable (Mabni), unlike Mudhari.', tl: 'Ang Madhi ay palaging Mabni.' },
    practicalExercises: [{ id: 'ex-s06-1', prompt: { ar: 'ابنِ الفعل (اِسْتَخْرَجَ) للمجهول وأسنده إلى (هُمْ).', en: 'Make اِسْتَخْرَجَ passive for هُمْ (3mp).', tl: 'Gawing passive ang اِسْتَخْرَجَ para sa هُمْ.' }, arabicPrompt: 'اِسْتَخْرَجَ', answer: 'اُسْتُخْرِجُوا', explanation: { ar: 'تُضم همزة الوصل والتاء وتُكسر الراء.', en: 'Prefix vowels become Damma and pre-final becomes Kasra.', tl: 'Damma sa simula at Kasra bago ang huli.' } }],
    summary: { ar: 'أحكام الماضي المعلوم والمجهول تنضبط بـ14 ضميرًا مع مراعاة التقاء الساكنين في المعتل.', en: 'Master the 14 pronoun suffixes and vowel-shift rules for Active and Passive Madhi.', tl: 'Kabisaduhin ang 14 na hulapi at pagbabago ng patinig sa Active at Passive Madhi.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(7, 'sarf-07', 'beginner', 'تصريف الفعل المضارع (المرفوع والمنصوب والمجزوم والمجهول)', 'Present Tense (Mudhari): Moods & Passive', 'Pangkasalukuyang Pandiwa (Mudhari): Mga Mood at Pasibo', {
    objectives: [
      { ar: 'تصريف المضارع في حالات الرفع والنصب والجزم.', en: 'Conjugate Mudhari across Indicative, Subjunctive, and Jussive moods.', tl: 'Maibanghay ang Mudhari sa Marfu\', Mansub, at Majzum.' },
      { ar: 'صياغة المضارع المبني للمجهول.', en: 'Form Passive Mudhari across all verb forms.', tl: 'Mabuo ang Passive Mudhari.' },
    ],
    introduction: {
      ar: 'الفعل المضارع يدل على الحال أو الاستقبال ويُفتتح بأحد أحرف (أنيت)، وهو الفعل المعرب الوحيد في العربية إلا إذا اتصل بنون النسوة أو نون التوكيد.',
      en: 'Al-Mudhari begins with one of أ-ن-ي-ت and is uniquely declinable (Mu\'rab) across Marfu\', Mansub, and Majzum moods.',
      tl: 'Ang Al-Mudhari ay nagsisimula sa أ-ن-ي-ت at nagbabago ng dulo ayon sa Marfu\', Mansub, at Majzum.',
    },
    definition: { arabicTerm: 'المضارع وحالاته', text: { ar: 'فعل يدل على الحاضر أو المستقبل، ويُرفع إذا تجرد، ويُنصب بعد أدوات النصب، ويُجزم بعد أدوات الجزم، ويُبنى للمجهول بضم أوله وفتح ما قبل آخره.', en: 'Present/future verb inflecting for Indicative, Subjunctive, and Jussive; Passive Mudhari takes Damma on the prefix and Fatha before the final radical (يُفْعَلُ).', tl: 'Pandiwang nagbabago sa Marfu\', Mansub, at Majzum; ang Passive nito ay يُفْعَلُ.' } },
    explanation: {
      ar: 'حرف المضارعة يُفتح في الثلاثي والخماسي والسداسي (يَكْتُبُ، يَنْطَلِقُ، يَسْتَغْفِرُ) ويُضم في الرباعي (يُعَلِّمُ، يُجَاهِدُ، يُكْرِمُ، يُتَرْجِمُ). الأفعال الخمسة (يَفْعَلَانِ، تَفْعَلَانِ، يَفْعَلُونَ، تَفْعَلُونَ، تَفْعَلِينَ) تُرفع بثبوت النون وتُنصب وتُجزم بحذفها. أما نون النسوة (يَكْتُبْنَ) فمبنية على السكون.',
      en: 'Mudhari prefix takes Damma ONLY for 4-letter past stems (Forms II, III, IV, QI) and Fatha for all others. The Five Verbs (dual, 3mp/2mp, 2fs) mark Raf\' with Nun and Nasb/Jazm by dropping Nun.',
      tl: 'Ang panlapi ng Mudhari ay Damma para sa mga pandiwang may 4 na letra sa nakaraan (II, III, IV, QI). Ang Five Verbs ay nagtatanggal ng Nun sa Nasb at Jazm.',
    },
    rules: [
      { ar: 'بناء المضارع للمجهول: ضم حرف المضارعة وفتح ما قبل الآخر (يُكْتَبُ، يُعَلَّمُ، يُسْتَخْرَجُ).', en: 'Passive Mudhari: Damma on prefix + Fatha before final radical.', tl: 'Passive Mudhari: Damma sa panlapi + Fatha bago ang huling letra.' },
      { ar: 'نونا النسوة (يَكْتُبْنَ / تَكْتُبْنَ) مبنيتان على السكون لا تتغيران في الرفع والنصب والجزم.', en: 'Feminine plural forms (يَكْتُبْنَ / تَكْتُبْنَ) are Mabni on Sukun across all moods.', tl: 'Ang 3fp at 2fp ay nakapirmi sa Sukun sa lahat ng mood.' },
    ],
    classifications: [
      { titleAr: 'المرفوع', titleEn: 'Indicative (Marfu\')', titleTl: 'Marfu\'', description: { ar: 'بالضمة أو ثبوت النون.', en: 'Damma or retained Nun.', tl: 'Damma o may Nun.' }, examples: ['يَكْتُبُ', 'يَكْتُبُونَ', 'تَكْتُبِينَ'] },
      { titleAr: 'المنصوب', titleEn: 'Subjunctive (Mansub)', titleTl: 'Mansub', description: { ar: 'بالفتحة أو حذف النون بعد أَنْ/لَنْ/كَيْ.', en: 'Fatha or dropped Nun after أَنْ/لَنْ/كَيْ.', tl: 'Fatha o walang Nun.' }, examples: ['لَنْ يَكْتُبَ', 'لَنْ يَكْتُبُوا'] },
      { titleAr: 'المجزوم', titleEn: 'Jussive (Majzum)', titleTl: 'Majzum', description: { ar: 'بالسكون أو حذف النون أو حذف حرف العلة.', en: 'Sukun, dropped Nun, or dropped weak letter.', tl: 'Sukun, walang Nun, o walang mahinang letra.' }, examples: ['لَمْ يَكْتُبْ', 'لَمْ يَكْتُبُوا', 'لَمْ يَدْعُ'] },
    ],
    patterns: [
      { pattern: 'يُفْعَلُ', example: 'يُكْتَبُ', meaning: { ar: 'مضارع مجهول ثلاثي', en: 'Passive present Form I', tl: 'Passive present Form I' }, rule: { ar: 'ضم الأول وفتح ما قبل الآخر', en: 'Damma prefix, Fatha penult', tl: 'Damma sa unahan, Fatha bago ang huli' } },
    ],
    examples: [
      { arabic: 'لَنْ يَنْجَحَ الْمُهْمِلُونَ وَلَمْ يَدْرُسُوا', transliteration: 'lan yanjaḥa al-muhmilūna wa lam yadrusū', translation: { ar: 'مضارع منصوب ومضارع مجزوم', en: 'The negligent will not succeed, and they did not study', tl: 'Hindi magtatagumpay ang pabaya at hindi sila nag-aral' }, analysis: { ar: 'يَنْجَحَ منصوب بالفتحة بعد لَنْ، ويَدْرُسُوا مجزوم بحذف النون بعد لَمْ.', en: 'يَنْجَحَ is Mansub (Fatha); يَدْرُسُوا is Majzum (dropped Nun).', tl: 'Mansub ang يَنْجَحَ; Majzum ang يَدْرُسُوا.' } },
    ],
    exceptions: [{ ar: 'الأجوف المجهول في المضارع تُقلب عينه ألفًا (يُقَالُ، يُبَاعُ) والناقص تُقلب لامه ألفًا مقصورة (يُدْعَى، يُرْمَى).', en: 'Passive Mudhari of Ajwaf shows Alif (يُقَالُ) and Naqis shows Alif Maqsura (يُدْعَى).', tl: 'Sa Passive Mudhari, ang Ajwaf ay may Alif (يُقَالُ) at ang Naqis ay Alif Maqsura (يُدْعَى).' }],
    commonMistakes: [{ ar: 'كتابة ألف فارقة بعد واو الفعل المفرد مثل (يدعوا)؛ الصواب (يَدْعُو) بدون ألف، والألف الفارقة خاصة بواو الجماعة (لَمْ يَكْتُبُوا).', en: 'Adding silent Alif after singular يَدْعُو; Alif Fariqa belongs only to plural Waw (يَكْتُبُوا).', tl: 'Paglalagay ng Alif pagkatapos ng isahang يَدْعُو.' }],
    comparison: { ar: 'علامات جزم المضارع ثلاث: السكون (للسالم)، وحذف النون (للأفعال الخمسة)، وحذف حرف العلة (للمعتل الآخر).', en: 'Jussive has three markers: Sukun, dropped Nun, or dropped weak final radical.', tl: 'May tatlong marka ang Jazm: Sukun, pagtanggal ng Nun, at pagtanggal ng mahinang letra.' },
    practicalExercises: [{ id: 'ex-s07-1', prompt: { ar: 'حوّل (يَرْمُونَ) إلى حالة الجزم بعد (لَمْ).', en: 'Put يَرْمُونَ into Jussive after لَمْ.', tl: 'Gawing Majzum ang يَرْمُونَ.' }, arabicPrompt: 'لَمْ ___', answer: 'لَمْ يَرْمُوا', explanation: { ar: 'من الأفعال الخمسة فيُجزم بحذف النون.', en: 'One of the Five Verbs: drops Nun and adds silent Alif.', tl: 'Tinatanggal ang Nun.' } }],
    summary: { ar: 'ضبط حركة حرف المضارعة وعلامات الإعراب الثلاث أساس تصريف المضارع.', en: 'Master Mudhari prefix vowels and the three mood inflection systems.', tl: 'Mahalaga ang tamang patinig ng panlapi at ang tatlong mood ng Mudhari.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(8, 'sarf-08', 'beginner', 'تصريف فعل الأمر والفعل المنهي', 'Imperative (Amr) & Prohibitive (Nahy) Conjugation', 'Pagbabanghay ng Pautos (Amr) at Pagbabawal (Nahy)', {
    objectives: [
      { ar: 'اشتقاق فعل الأمر من المضارع المجزوم للمخاطبين الستة.', en: 'Derive Amr from Jussive Mudhari across the 6 second-person pronouns.', tl: 'Mabuo ang Amr mula sa Majzum para sa 6 na panghalip.' },
      { ar: 'التمييز بين همزة الوصل وهمزة القطع في الأمر، وصياغة النهي بـ(لا الناهية).', en: 'Apply Hamzat al-Wasl vs Qat\' in Amr and construct Nahy with La.', tl: 'Gamitin ang tamang Hamza sa Amr at bumuo ng Nahy.' },
    ],
    introduction: {
      ar: 'يُشتق فعل الأمر من المضارع المجزوم بحذف حرف المضارعة، فإن سكن ما بعده أُتي بهمزة وصل (إلا في وزن أَفْعَلَ فهمزته قطع)، وأما النهي فيتكون من (لا الناهية) + المضارع المجزوم.',
      en: 'Amr is derived directly from 2nd-person Jussive Mudhari by removing تَـ/تُـ. If the next letter is vowelless, Hamzat al-Wasl is prefixed (except Form IV, which restores its Hamzat al-Qat\'). Nahy simply pairs لا الناهية with Jussive Mudhari.',
      tl: 'Nabubuo ang Amr mula sa Majzum sa pamamagitan ng pagtanggal ng تَـ/تُـ. Ang Nahy ay لا + Majzum.',
    },
    definition: { arabicTerm: 'الأمر والنهي', text: { ar: 'الأمر صيغة يُطلب بها حصول الفعل في المستقبل، والنهي طلب الكف عن الفعل بـ(لا) الجازمة.', en: 'Amr commands an action (built on Jazm markers); Nahy prohibits an action using jussive لا.', tl: 'Ang Amr ay nag-uutos; ang Nahy ay nagbabawal gamit ang لا.' } },
    explanation: {
      ar: 'في الثلاثي المجرد تُضم همزة الوصل إذا كانت عين المضارع مضمومة (اُكْتُبْ) وتُكسر إذا كانت مفتوحة أو مكسورة (اِفْتَحْ، اِجْلِسْ). في الرباعي (أَفْعَلَ) تُرد همزة القطع المفتوحة (أَكْرِمْ). وفي (فَعَّلَ، فَاعَلَ، تَفَعَّلَ، تَفَاعَلَ) يتحرك ما بعد التاء فلا نحتاج لهمزة (عَلِّمْ، جَاهِدْ، تَعَلَّمْ).',
      en: 'Form I Amr Hamzat al-Wasl takes Damma if Mudhari penult has Damma (اُكْتُبْ), and Kasra otherwise (اِفْتَحْ, اِضْرِبْ). Form IV takes Hamzat al-Qat\' with Fatha (أَكْرِمْ). Forms II, III, V, VI start with a vowelized consonant and take no Hamza.',
      tl: 'Ang Form I Amr ay may Damma kung Damma sa Mudhari (اُكْتُبْ), at Kasra kung hindi (اِجْلِسْ). Ang Form IV ay may أَ (أَكْرِمْ).',
    },
    rules: [
      { ar: 'فعل الأمر يُبنى على ما يُجزم به مضارعه: السكون (اُكْتُبْ)، أو حذف النون (اُكْتُبُوا)، أو حذف حرف العلة (اُدْعُ، اِرْمِ).', en: 'Amr is built on whatever marks its Jussive: Sukun, dropped Nun, or dropped weak letter.', tl: 'Ang Amr ay nakapirmi sa palatandaan ng Majzum nito.' },
    ],
    classifications: [
      { titleAr: 'أمر يحتاج همزة وصل', titleEn: 'Needs Hamzat al-Wasl', titleTl: 'Nangangailangan ng Hamzat al-Wasl', description: { ar: 'الثلاثي الساكن الثاني، وانفعل، وافتعل، وافعلّ، واستفعل.', en: 'Form I (when 1st radical has sukun) & Forms VII, VIII, IX, X.', tl: 'Form I, VII, VIII, IX, X.' }, examples: ['اُدْرُسْ', 'اِنْطَلِقْ', 'اِجْتَهِدْ', 'اِسْتَغْفِرْ'] },
      { titleAr: 'أمر لا يحتاج همزة', titleEn: 'No Hamza Needed', titleTl: 'Walang Hamza', description: { ar: 'المثال المحذوف الفاء، والأجوف، وفَعَّلَ، وفَاعَلَ، وتَفَعَّلَ، وتَفَاعَلَ.', en: 'Mithal (عِدْ), Ajwaf (قُلْ), and Forms II, III, V, VI.', tl: 'عِدْ, قُلْ, at Forms II, III, V, VI.' }, examples: ['عِدْ', 'قُلْ', 'عَلِّمْ', 'تَعَلَّمْ'] },
    ],
    patterns: [
      { pattern: 'اُفْعُلْ', example: 'اُنْصُرْ', meaning: { ar: 'أمر من فَعَلَ يَفْعُلُ', en: 'Imperative of Bab Nasara', tl: 'Pautos ng Bab Nasara' }, rule: { ar: 'همزة وصل مضمومة', en: 'Damma on Wasl', tl: 'Damma sa Wasl' } },
      { pattern: 'لَا تَفْعَلْ', example: 'لَا تَكْتُبْ', meaning: { ar: 'النهي للمفرد المخاطب', en: 'Prohibition (2ms)', tl: 'Pagbabawal (2ms)' }, rule: { ar: 'لا الناهية + المضارع المجزوم', en: 'Prohibitive La + Jussive', tl: 'La + Majzum' } },
    ],
    examples: [{ arabic: 'قُلِ الْحَقَّ وَلَا تَخَفْ', transliteration: 'quli al-ḥaqqa wa lā takhaf', translation: { ar: 'أمر ونهي من الأجوف', en: 'Speak the truth and do not fear', tl: 'Sabihin ang totoo at huwag matakot' }, analysis: { ar: 'قُلْ مبني على السكون (حُرّك بالكسر لالتقاء الساكنين)، و(تَخَفْ) مجزوم بالسكون.', en: 'قُلْ is Amr (kasra avoids double sukun); تَخَفْ is Jussive after لا.', tl: 'قُلْ ay Amr; تَخَفْ ay Majzum.' } }],
    exceptions: [{ ar: 'تُحذف الهمزة سماعًا في أمر: أَخَذَ (خُذْ)، أَكَلَ (كُلْ)، أَمَرَ (مُرْ).', en: 'Irregular Amr deletion in أَخَذَ → خُذْ, أَكَلَ → كُلْ, أَمَرَ → مُرْ.', tl: 'Eksepsiyon: أَخَذَ → خُذْ, أَكَلَ → كُلْ, أَمَرَ → مُرْ.' }],
    commonMistakes: [{ ar: 'كتابة همزة قطع على أمر الثلاثي مثل (*إكتب) أو الخماسي (*إجتمع)؛ الصواب وصل بلا همزة.', en: 'Writing Hamza above/below Alif on Form I/VII/VIII/X imperatives (*إكتب); they use unhamzated Hamzat al-Wasl (اكتب).', tl: 'Paglalagay ng Hamza sa اكتب; dapat ay walang tuldik sa Alif.' }],
    comparison: { ar: 'الأمر للمخاطب فقط (٦ صيغ)، أما الأمر للغائب أو المتكلم فيكون بـ(لام الأمر + المضارع المجزوم): لِيَكْتُبْ، لِنَكْتُبْ.', en: 'True Amr is 2nd-person only (6 forms); 3rd/1st person commands use Lam al-Amr + Jussive (لِيَكْتُبْ).', tl: 'Ang Amr ay para sa 2nd person lamang; para sa 3rd/1st person, gumamit ng لِـ + Majzum.' },
    practicalExercises: [{ id: 'ex-s08-1', prompt: { ar: 'صغ الأمر للمفردة المخاطبة (أَنْتِ) من (اِسْتَقَامَ).', en: 'Form 2fs imperative (أَنْتِ) of اِسْتَقَامَ.', tl: 'Buuin ang pautos (أَنْتِ) ng اِسْتَقَامَ.' }, arabicPrompt: 'اِسْتَقَامَ (أَنْتِ)', answer: 'اِسْتَقِيمِي', explanation: { ar: 'تعود الياء في المثنى والجمع والمخاطبة لتحرك اللام.', en: 'The medial Ya returns because the final radical is vowelized by ي.', tl: 'Bumabalik ang Ya dahil may patinig na ang huling letra.' } }],
    summary: { ar: 'الأمر والنهي متلازمان في البناء والجزم وتعود حروف العلة فيهما مع الضمائر المتصلة.', en: 'Amr and Nahy mirror Jussive endings across all 6 second-person pronouns.', tl: 'Magkatugma ang mga palatandaan ng Amr at Nahy sa 6 na panghalip.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(9, 'sarf-09', 'intermediate', 'الفعل المتعدي والفعل اللازم', 'Transitive (Muta\'addi) & Intransitive (Lazim) Verbs', 'Mga Pandiwang Transitive (Muta\'addi) at Intransitive (Lazim)', {
    objectives: [
      { ar: 'التمييز بين اللازم والمتعدي لمفعول أو مفعولين أو ثلاثة.', en: 'Differentiate Lazim verbs from single, double, and triple-object Muta\'addi verbs.', tl: 'Makilala ang Lazim at Muta\'addi (1, 2, o 3 layon).' },
      { ar: 'معرفة وسائل تعدية الفعل اللازم (الهمزة، التضعيف، حرف الجر).', en: 'Apply causativization methods to make Lazim verbs transitive.', tl: 'Matutunan kung paano gawing transitive ang pandiwang Lazim.' },
    ],
    introduction: {
      ar: 'يتعلق تقسيم الفعل إلى لازم ومتعدٍّ بالصرف والنحو معًا؛ لأنه يؤثر في اشتقاق اسم المفعول وبناء الفعل للمجهول وتعدي الجمل.',
      en: 'Transitivity bridges Sarf and Nahu: it governs whether a verb takes direct objects, passive voice, and a direct Ism Maf\'ul.',
      tl: 'Ang pagiging Lazim o Muta\'addi ay mahalaga sa parehong Sarf at Nahu.',
    },
    definition: { arabicTerm: 'المتعدي واللازم', text: { ar: 'اللازم ما اكتفى بفاعله ولم يحتج إلى مفعول به، والمتعدي ما جاوز الفاعل إلى مفعول به أو أكثر.', en: 'Lazim completes its meaning with Fa\'il alone; Muta\'addi requires one or more direct objects.', tl: 'Ang Lazim ay sapat na sa Fa\'il; ang Muta\'addi ay nangangailangan ng layon.' } },
    explanation: {
      ar: 'يُعدَّى الفعل اللازم بهمزة التعدية (جَلَسَ ← أَجْلَسَ)، أو بتضعيف العين (فَرِحَ ← فَرَّحَ)، أو بألف المفاعلة، أو بحرف الجر (ذَهَبَ بِـ). كما قد يصبح المتعدي لازمًا بوزن اِنْفَعَلَ أو تَفَعَّلَ (كَسَرَ ← اِنْكَسَرَ).',
      en: 'Make Lazim transitive via Form IV Hamza (جَلَسَ → أَجْلَسَ), Form II doubling (فَرِحَ → فَرَّحَ), or a preposition (ذَهَبَ بِـ). Make Muta\'addi intransitive via Form VII (اِنْكَسَرَ).',
      tl: 'Nagiging transitive ang Lazim sa tulong ng Form IV (أَ), Form II (pagdodoble), o pang-ukol (بِـ).',
    },
    rules: [
      { ar: 'علامة المتعدي: قبول هاء الضمير العائدة على غير المصدر (كَتَبَهُ)، وصياغة اسم مفعول تام منه (مَكْتُوبٌ).', en: 'Diagnostic test: Muta\'addi accepts an attached object pronoun (-هُ) directly.', tl: 'Pagsusuri: Tumatanggap ang Muta\'addi ng nakakabit na panghalip (-هُ).' },
    ],
    classifications: [
      { titleAr: 'متعدٍّ لمفعول واحد', titleEn: 'Monotransitive', titleTl: 'Isang Layon', description: { ar: 'مثل: قَرَأَ، فَهِمَ، أَكَلَ.', en: 'Takes one Maf\'ul Bihi.', tl: 'May isang tuwirang layon.' }, examples: ['قَرَأَ الطَّالِبُ الْكِتَابَ'] },
      { titleAr: 'متعدٍّ لمفعولين', titleEn: 'Ditransitive', titleTl: 'Dalawang Layon', description: { ar: 'أفعال العطاء (أَعْطَى، مَنَحَ) وأفعال القلوب والتحويل (ظَنَّ، جَعَلَ).', en: 'Giving verbs (أَعْطَى) and mental perception verbs (ظَنَّ).', tl: 'Mga pandiwa ng pagbibigay at pag-iisip.' }, examples: ['أَعْطَى الْمُعَلِّمُ الطَّالِبَ جَائِزَةً'] },
    ],
    patterns: [
      { pattern: 'فَعَلَ (لازم) ← أَفْعَلَ (متعدٍّ)', example: 'نَزَلَ ← أَنْزَلَ', meaning: { ar: 'التعدية بالهمزة', en: 'Causative Hamza', tl: 'Causative na Hamza' }, rule: { ar: 'الهمزة تنقل الفاعل إلى مفعول به', en: 'Adds one argument slot', tl: 'Nagdaragdag ng layon' } },
    ],
    examples: [{ arabic: 'عَلِمْتُ الصِّدْقَ مُنْجِيًا', transliteration: '\'alimtu aṣ-ṣidqa munjiyan', translation: { ar: 'متعدٍّ لمفعولين أصلهما مبتدأ وخبر', en: 'I knew truthfulness to be saving', tl: 'Nalaman kong ang katapatan ay nakapagliligtas' }, analysis: { ar: 'الصِّدْقَ مفعول أول، ومُنْجِيًا مفعول ثانٍ.', en: 'Two objects originally Mubtada and Khabar.', tl: 'Dalawang layon mula sa Mubtada at Khabar.' } }],
    exceptions: [{ ar: 'بعض الأفعال تستعمل لازمةً ومتعديةً معًا مثل (شَكَرَ، نَصَحَ، زَادَ).', en: 'Some verbs like زَادَ and نَصَحَ function both transitively and intransitively.', tl: 'May mga pandiwang parehong gumagana bilang Lazim at Muta\'addi.' }],
    commonMistakes: [{ ar: 'تعدية الفعل (أثَّرَ) بنفسه؛ والصواب تعديته بـ(فِي) أو (عَلَى): أثَّرَ فِيهِ.', en: 'Using أثَّرَ without في/على.', tl: 'Paggamit ng أثَّرَ nang walang في o على.' }],
    comparison: { ar: 'أفعال مثل (أَعْلَمَ، أَرَى، أَنْبَأَ) تتعدى إلى ثلاثة مفاعيل.', en: 'Causatives of mental verbs (أَعْلَمَ، أَرَى) can take three objects!', tl: 'Ang mga pandiwang tulad ng أَعْلَمَ ay maaaring kumuha ng tatlong layon.' },
    practicalExercises: [{ id: 'ex-s09-1', prompt: { ar: 'عدِّ الفعل اللازم (خَرَجَ) بطريقتين.', en: 'Make the intransitive verb خَرَجَ transitive in two ways.', tl: 'Gawing transitive ang خَرَجَ sa dalawang paraan.' }, arabicPrompt: 'خَرَجَ', answer: 'أَخْرَجَ (بالهمزة) أو خَرَّجَ (بالتضعيف) أو خَرَجَ بِهِ', explanation: { ar: 'بالهمزة أو التضعيف أو الباء.', en: 'Via Form IV, Form II, or preposition بِـ.', tl: 'Gamit ang Form IV, Form II, o بِـ.' } }],
    summary: { ar: 'معرفة اللزوم والتعدي ضرورية لبناء المجهول وضبط المفعولات.', en: 'Transitivity governs object count, passive eligibility, and causative morphology.', tl: 'Ang pagiging Lazim o Muta\'addi ay nagtatakda ng passive at bilang ng layon.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(10, 'sarf-10', 'intermediate', 'الفعل المثال وأحكامه', 'Assimilated Weak Verbs (Al-Mithal)', 'Mga Pandiwang Mithal (Mahina sa Unahan)', {
    objectives: [
      { ar: 'فهم قاعدة حذف الواو من المثال الواوي في المضارع والأمر.', en: 'Master why initial Waw drops in Mudhari and Amr of Mithal Wawi.', tl: 'Maunawaan kung bakit tinatanggal ang Waw sa Mudhari at Amr.' },
      { ar: 'تتبع سلوك المثال في الأوزان المزيدة (خصوصًا اِفْتَعَلَ: اِتَّصَلَ).', en: 'Understand Mithal Ibdal in Form VIII (وَصَلَ → اِتَّصَلَ).', tl: 'Maunawaan ang pagbabago ng Mithal sa Form VIII (اِتَّصَلَ).' },
    ],
    introduction: {
      ar: 'المثال ما كانت فاؤه حرف علة (واوًا أو ياءً)، وسمي مثالًا لأنه يماثل الصحيح في خلوّ ماضيه من الإعلال.',
      en: 'Al-Mithal has و or ي as its first radical. Its Madhi conjugates exactly like a Sound verb, while its active Mudhari/Amr and Form VIII show systematic rules.',
      tl: 'Ang Al-Mithal ay may و o ي sa unang letra. Sa Madhi, ito ay tulad ng Sahih.',
    },
    definition: { arabicTerm: 'الفعل المثال', text: { ar: 'الفعل الذي فاؤه واو أو ياء، نحو: وَعَدَ ويَسَرَ.', en: 'A verb whose 1st radical (Fa al-Kalimah) is Waw or Ya.', tl: 'Pandiwang may Waw o Ya sa unang ugat.' } },
    explanation: {
      ar: 'تُحذف الواو من المثال الواوي في المضارع المعلوم والأمر بشرطين: أن يكون الماضي مفتوح الفاء والعين (فَعَلَ) وأن تكون عين المضارع مكسورة (يَعِدُ ← أصلها يَوْعِدُ) أو مفتوحة لأجل حرف حلق (يَضَعُ، يَقَعُ). وتعود الواو في المضارع المجهول (يُوعَدُ) وفي المصدر إذا لم يُعوَّض عنها بالتاء (وَعْد، صِلَة). وفي باب اِفْتَعَلَ تُبدَل الواو والياء تاءً وتُدغَم في تاء الافتعال: اِوْتَعَدَ ← اِتَّعَدَ، اِوْتَصَلَ ← اِتَّصَلَ!',
      en: 'Initial Waw drops in active Mudhari/Amr when Bab is فَعَلَ يَفْعِلُ (وَعَدَ → يَعِدُ → عِدْ) or guttural فَعَلَ يَفْعَلُ (وَضَعَ → يَضَعُ → ضَعْ). Waw returns in Passive (يُوعَدُ). In Form VIII, initial و/ي assimilates into ت: اِوْتَصَلَ → اِتَّصَلَ!',
      tl: 'Nawawala ang Waw sa يَعِدُ at عِدْ, ngunit bumabalik sa يُوعَدُ. Sa Form VIII, ang و/ي ay nagiging ت (اِتَّصَلَ).',
    },
    rules: [
      { ar: 'تُحذف واو المثال الواوي في يَفْعِلُ ويَفْعَلُ الحلقي فقط، وتثبت في يَفْعُلُ (وَجُهَ يَوْجُهُ) وفي المثال اليائي (يَسَرَ يَيْسِرُ).', en: 'Waw drops in يَفْعِلُ and guttural يَفْعَلُ; Mithal Yayi keeps its Ya (يَيْسِرُ).', tl: 'Nananatili ang Ya sa Mithal Yayi (يَيْسِرُ).' },
      { ar: 'في اِفْتَعَلَ من المثال: تُبدَل الفاء تاءً وتُدغم في تاء افتعل (اِتَّصَلَ، اِتَّسَرَ).', en: 'In Form VIII, Mithal و/ي turns to ت and merges (اِتَّصَلَ, اِتَّفَقَ).', tl: 'Sa Form VIII, nagiging ت ang و/ي at nagsasanib (اِتَّصَلَ).' },
    ],
    classifications: [
      { titleAr: 'مثال واوي محذوف الفاء', titleEn: 'Waw-dropping Mithal', titleTl: 'Mithal na Nagtatanggal ng Waw', description: { ar: 'باب ضَرَبَ أو فَتَحَ الحلقي.', en: 'Bab Daraba or guttural Fataha.', tl: 'Bab Daraba o Fataha.' }, examples: ['وَعَدَ — يَعِدُ — عِدْ', 'وَجَدَ — يَجِدُ — جِدْ', 'وَضَعَ — يَضَعُ — ضَعْ'] },
      { titleAr: 'مثال يائي', titleEn: 'Mithal Yayi', titleTl: 'Mithal Yayi', description: { ar: 'تثبت ياؤه في المضارع.', en: 'Keeps Ya in Mudhari; turns to Waw after Damma (مُوسِر).', tl: 'Nananatili ang Ya sa Mudhari.' }, examples: ['يَسَرَ — يَيْسِرُ', 'يَبِسَ — يَيْبَسُ'] },
    ],
    patterns: [
      { pattern: 'وَعَلَ — يَعِلُ — عِلْ', example: 'وَصَلَ — يَصِلُ — صِلْ', meaning: { ar: 'حذف الواو في المضارع والأمر', en: 'Waw deletion pattern', tl: 'Pattern ng pagkawala ng Waw' }, rule: { ar: 'لوقوع الواو بين الياء والكسرة', en: 'Waw trapped between Ya and Kasra', tl: 'Nasa pagitan ng Ya at Kasra' } },
    ],
    examples: [{ arabic: 'لَمْ يَجِدْ وَعْدًا صَادِقًا', transliteration: 'lam yajid wa\'dan ṣādiqan', translation: { ar: 'المثال في الجزم والمصدر', en: 'He did not find a true promise', tl: 'Hindi siya nakahanap ng totoong pangako' }, analysis: { ar: 'يَجِدْ مجزوم بالسكون والواو محذوفة، بينما ظهرت الواو في المصدر وَعْدًا.', en: 'Waw is dropped in يَجِدْ, visible in Masdar وَعْدًا.', tl: 'Nawala ang Waw sa يَجِدْ ngunit nasa وَعْدًا.' } }],
    exceptions: [{ ar: 'تثبت الواو في نحو (وَجِلَ يَوْجَلُ) لأن ماضيه مكسور العين (فَعِلَ) لا مفتوحها.', en: 'وَجِلَ يَوْجَلُ retains Waw because its past is فَعِلَ.', tl: 'Nananatili ang Waw sa وَجِلَ يَوْجَلُ.' }],
    commonMistakes: [{ ar: 'البحث عن (اِتَّصَلَ) في باب التاء؛ وجذره الحقيقي (و-ص-ل)!', en: 'Looking up اِتَّصَلَ under root ت-ص-ل instead of و-ص-ل.', tl: 'Paghahanap ng اِتَّصَلَ sa ت sa halip na و-ص-ل.' }],
    comparison: { ar: 'تُعوض التاء عن الواو المحذوفة في كثير من مصادر المثال مثل: وَعَدَ ← عِدَة، وَصَلَ ← صِلَة، وَزَنَ ← زِنَة.', en: 'Many Mithal Masdars drop Waw and add Ta Marbuta compensation: صِلَة، عِدَة، ثِقَة.', tl: 'Maraming Mithal Masdar ang nagtatanggal ng Waw at nagdaragdag ng ة (صِلَة، عِدَة).' },
    practicalExercises: [{ id: 'ex-s10-1', prompt: { ar: 'ما أصل الفعل (اِتَّقَى) وما جذره؟', en: 'What is the root of اِتَّقَى?', tl: 'Ano ang ugat ng اِتَّقَى?' }, arabicPrompt: 'اِتَّقَى', answer: 'الجذر (و-ق-ي) على وزن اِفْتَعَلَ (أصله اِوْتَقَى)', explanation: { ar: 'أُبدلت الواو تاءً وأُدغمت في تاء افتعل.', en: 'Initial Waw became Ta and assimilated into Form VIII infix.', tl: 'Naging ت ang Waw.' } }],
    summary: { ar: 'تحفظ المثال القواعد الواضحة: حذف الواو في يَعِدُ وعِدْ، وعودتها في يُوعَدُ، وإبدالها تاءً في اِفْتَعَلَ.', en: 'Mithal highlights clean I\'lal: Waw drops in يَعِدُ/عِدْ, returns in يُوعَدُ, and assimilates to تَّ in Form VIII.', tl: 'Malinaw ang Mithal: nawawala sa يَعِدُ/عِدْ, bumabalik sa يُوعَدُ, at nagiging تَّ sa Form VIII.' },
    furtherReading: S_MAQSUD,
    meta: { status: 'verified', sources: S_MAQSUD, qiyasiVsSamaai: 'قياسي' },
  }),

  makeSarfChapter(11, 'sarf-11', 'intermediate', 'الفعل الأجوف وتحولاته في المجرد والمزيد', 'Hollow Weak Verbs (Al-Ajwaf) Across Forms I–X', 'Mga Pandiwang Ajwaf sa Form I at Pinalawak na Porma', {
    objectives: [
      { ar: 'فهم علل الإعلال الثلاث في الأجوف: القلب والنقل والحذف.', en: 'Master the 3 Ajwaf rules: inversion (Alif), vowel transfer, and deletion.', tl: 'Matutunan ang 3 tuntunin ng Ajwaf: pagpapalit, paglilipat, at pagtanggal.' },
      { ar: 'تصريف (قَالَ — يَقُولُ — قُلْ) و(كَانَ — يَكُونُ — كُنْ) و(بَاعَ — يَبِيعُ — بِعْ) و(أَقَامَ / اِخْتَارَ / اِسْتَقَامَ).', en: 'Conjugate Ajwaf across Form I and Forms IV, VII, VIII, X.', tl: 'Maibanghay ang Ajwaf sa Form I at sa Forms IV, VII, VIII, X.' },
    ],
    introduction: {
      ar: 'الأجوف ما كانت عينه حرف علة (واوًا أو ياءً)، وتظهر فيه أشهر قواعد الإعلال في اللغة العربية مثل قَالَ يَقُولُ قُلْ، وكَانَ يَكُونُ كُنْ، وبَاعَ يَبِيعُ بِعْ.',
      en: 'Al-Ajwaf contains و or ي as its middle radical. It showcases Arabic’s clearest morphophonemic rules across active, passive, jussive, and imperative forms.',
      tl: 'Ang Al-Ajwaf ay may و o ي sa gitna at nagpapakita ng malinaw na pagbabago ng patinig.',
    },
    definition: { arabicTerm: 'الفعل الأجوف', text: { ar: 'كل فعل كانت عينه واوًا أو ياءً، مثل: قَالَ (قَوَلَ) وبَاعَ (بَيَعَ) وخَافَ (خَوِفَ).', en: 'A verb whose 2nd radical is Waw or Ya.', tl: 'Pandiwang may Waw o Ya bilang gitnang ugat.' } },
    explanation: {
      ar: '١- الإعلال بالقلب: قَوَلَ ← قَالَ، بَيَعَ ← بَاعَ (تحرك حرف العلة وانفتح ما قبله فقُلب ألفًا). ٢- الإعلال بالنقل: يَقْوُلُ ← يَقُولُ، يَبْيِعُ ← يَبِيعُ، يَخْوَفُ ← يَخَافُ. ٣- الإعلال بالحذف (التقاء الساكنين): عند سكون اللام في الماضي (قُلْتُ، بِعْتُ، خِفْتُ) أو في الجزم (لَمْ يَقُلْ، لَمْ يَبِعْ) أو الأمر (قُلْ، بِعْ، كُنْ). وتُضم الفاء في قُلْتُ دلالةً على الواو، وتُكسر في بِعْتُ دلالةً على الياء وفي خِفْتُ دلالةً على كسر عينه الأصلي. وفي الأوزان المزيدة: تصح العين في فَعَّلَ وتَفَعَّلَ وفَاعَلَ وتَفَاعَلَ (قَوَّمَ، تَعَاوَنَ)، وتُعلّ في أَفْعَلَ وافْتَعَلَ وانْفَعَلَ واسْتَفْعَلَ (أَقَامَ يُقِيمُ أَقِمْ، اِخْتَارَ يَخْتَارُ اِخْتَرْ، اِسْتَقَامَ يَسْتَقِيمُ اِسْتَقِمْ).',
      en: 'Step 1 (Inversion): قَوَلَ → قَالَ. Step 2 (Transfer): يَقْوُلُ → يَقُولُ. Step 3 (Sukun Deletion): whenever the 3rd radical takes Sukun, the medial weak letter drops (قُلْتُ، لَمْ يَقُلْ، قُلْ، كُنْ). In Forms II/III/V/VI the medial stays sound (تَعَاوَنَ، قَوَّمَ); in Forms IV/VII/VIII/X it undergoes I\'lal (أَقَامَ → أَقِمْ، اِسْتَقَامَ → اِسْتَقِمْ).',
      tl: 'Kapag nagka-Sukun ang huling letra, nawawala ang gitnang mahinang letra (قُلْتُ, لَمْ يَقُلْ, قُلْ, كُنْ). Sa Forms II/III/V/VI nananatili ang و/ي; sa IV/VII/VIII/X nagkakaroon ng I\'lal.',
    },
    rules: [
      { ar: 'إذا اتصل الأجوف بضمير رفع متحرك حُذفت عينه وكُسرت فاؤه إن كانت يائية أو مكسورة العين أصلًا (بِعْتُ، خِفْتُ) وضُمَّت إن كانت واوية مضمومة العين (قُلْتُ، كُنْتُ).', en: 'Before consonant suffixes: Damma if Waw-root of Fa\'ala (قُلْتُ), Kasra if Ya-root or Fa\'ila (بِعْتُ, خِفْتُ).', tl: 'Damma sa قُلْتُ; Kasra sa بِعْتُ at خِفْتُ.' },
      { ar: 'في الجزم والأمر المفرد تُحذف العين لالتقاء الساكنين وتعود إذا تحركت اللام (قُلْ ← قُولُوا، لَمْ يَكُنْ ← لَمْ يَكُونُوا).', en: 'Medial drops in singular Jussive/Amr (قُلْ, كُنْ) and returns when suffixes vocalize the 3rd radical (قُولُوا).', tl: 'Nawawala sa isahang Majzum/Amr (قُلْ) at bumabalik sa maramihan (قُولُوا).' },
    ],
    classifications: [
      { titleAr: 'أجوف واوي', titleEn: 'Hollow Waw', titleTl: 'Ajwaf Wawi', description: { ar: 'أصل عينه واو.', en: 'Middle radical is و.', tl: 'Gitnang letra ay و.' }, examples: ['قَالَ يَقُولُ قُلْ', 'كَانَ يَكُونُ كُنْ', 'صَامَ يَصُومُ صُمْ'] },
      { titleAr: 'أجوف يائي', titleEn: 'Hollow Ya', titleTl: 'Ajwaf Yayi', description: { ar: 'أصل عينه ياء.', en: 'Middle radical is ي.', tl: 'Gitnang letra ay ي.' }, examples: ['بَاعَ يَبِيعُ بِعْ', 'سَارَ يَسِيرُ سِرْ', 'عَاشَ يَعِيشُ عِشْ'] },
    ],
    patterns: [
      { pattern: 'أَفْعَلَ (أجوف)', example: 'أَقَامَ — يُقِيمُ — أَقِمْ', meaning: { ar: 'أصله أَقْوَمَ', en: 'Form IV Hollow', tl: 'Form IV Ajwaf' }, rule: { ar: 'نُقلت حركة الواو وقُلبت ألفًا ثم ياءً، ومصدره إِقَامَة بتعويض التاء', en: 'Masdar takes compensatory ة (إِقَامَة)', tl: 'May ة sa Masdar (إِقَامَة)' } },
      { pattern: 'اِسْتَفْعَلَ (أجوف)', example: 'اِسْتَقَامَ — يَسْتَقِيمُ — اِسْتَقِمْ', meaning: { ar: 'أصله اِسْتَقْوَمَ', en: 'Form X Hollow', tl: 'Form X Ajwaf' }, rule: { ar: 'تُحذف الياء في الأمر المفرد: اِسْتَقِمْ', en: 'Medial drops in 2ms Amr: اِسْتَقِمْ', tl: 'Nawawala ang gitna sa اِسْتَقِمْ' } },
    ],
    examples: [{ arabic: 'قَالَ لَهُ صَاحِبُهُ: كُنْ صَادِقًا وَلَا تَقُلْ إِلَّا الْحَقَّ', transliteration: 'qāla lahu ṣāḥibuhu: kun ṣādiqan wa lā taqul illā al-ḥaqqa', translation: { ar: 'تحولات قَالَ وكَانَ', en: 'His companion said to him: Be truthful and say nothing except the truth', tl: 'Sinabi ng kanyang kasama: Maging tapat ka at huwag magsabi kundi ng katotohanan' }, analysis: { ar: 'قَالَ بالألف المفتوحة، وكُنْ وتَقُلْ بحذف الواو لالتقاء الساكنين.', en: 'قَالَ retains Alif; كُنْ and تَقُلْ drop medial Waw before sukun.', tl: 'May Alif ang قَالَ; walang Waw ang كُنْ at تَقُلْ.' } }],
    exceptions: [{ ar: 'تصح العين في أفعال شاذة مثل (عَوِرَ يَعْوَرُ) و(صَيِدَ البعير) لأن معناه في قوة اِعْوَرَّ.', en: 'A few verbs like عَوِرَ retain Waw because they denote colors/defects akin to Form IX.', tl: 'Nananatili ang Waw sa عَوِرَ dahil ito ay katangiang pisikal.' }],
    commonMistakes: [{ ar: 'قول (*أَنَا قَالْتُ) أو (*خُفْتُ بالضم)؛ والصواب قُلْتُ بالضم وخِفْتُ بالكسر.', en: 'Saying *خُفْتُ instead of خِفْتُ (since خَافَ comes from خَوِفَ with Kasra!).', tl: 'Pagsasabi ng *خُفْتُ sa halip na خِفْتُ.' }],
    comparison: { ar: 'يَتحد مظهر قَالَ وبَاعَ في الغائب المفرد، ويكشف المضارعُ والمصدرُ وضميرُ المتكلم أصلَ العين (قُلْتُ vs بِعْتُ).', en: '3ms Madhi hides whether the root is و or ي; Mudhari, Masdar, and 1s Madhi reveal it immediately.', tl: 'Sa 3ms Madhi hindi halata kung و o ي ang ugat, ngunit makikita ito sa Mudhari at 1s Madhi.' },
    practicalExercises: [{ id: 'ex-s11-1', prompt: { ar: 'صغ المضارع المجزوم من (أَرَادَ) بعد (لَمْ).', en: 'Conjugate أَرَادَ in Jussive after لَمْ (3ms).', tl: 'Ibanghay ang أَرَادَ sa Majzum pagkatapos ng لَمْ.' }, arabicPrompt: 'لَمْ ___', answer: 'لَمْ يُرِدْ', explanation: { ar: 'يُرِيدُ ← تُحذف الياء لالتقاء الساكنين عند جزم الدال.', en: 'يُرِيدُ loses medial Ya before jussive sukun: لَمْ يُرِدْ.', tl: 'Nawawala ang Ya bago ang sukun: لَمْ يُرِدْ.' } }],
    summary: { ar: 'قاعدة الأجوف الذهبية: كلما سكنت اللام، سقطت العين لالتقاء الساكنين.', en: 'Golden Ajwaf rule: whenever the 3rd radical gets Sukun, the medial weak letter drops.', tl: 'Gintong tuntunin ng Ajwaf: kapag may Sukun ang huling letra, nawawala ang gitnang letra.' },
    furtherReading: S_MAQSUD,
    meta: { status: 'verified', sources: S_MAQSUD, qiyasiVsSamaai: 'قياسي' },
  }),

  makeSarfChapter(12, 'sarf-12', 'intermediate', 'الفعل الناقص وأحكامه في المجرد والمزيد', 'Defective Weak Verbs (Al-Naqis) & Transformations', 'Mga Pandiwang Naqis (Mahina sa Dulo)', {
    objectives: [
      { ar: 'التفريق بين الناقص الواوي (دَعَا) واليائي (رَمَى) ومكسور العين (رَضِيَ).', en: 'Contrast Naqis Wawi (دَعَا), Naqis Yayi (رَمَى), and Fa\'ila Naqis (رَضِيَ).', tl: 'Mapaghambing ang دَعَا, رَمَى, at رَضِيَ.' },
      { ar: 'ضبط حذف حرف العلة عند الاتصال بتاء التأنيث وواو الجماعة وفي الجزم والأمر.', en: 'Apply final-radical deletion in 3fs, 3mp, Jussive, and Amr.', tl: 'Maisagawa ang pagtanggal ng huling letra sa 3fs, 3mp, Majzum, at Amr.' },
    ],
    introduction: {
      ar: 'الناقص ما كانت لامه حرف علة (واوًا أو ياءً)، وسمي ناقصًا لنقصان آخره في الجزم والأمر ومع بعض الضمائر.',
      en: 'Al-Naqis ends with a weak radical (و or ي) in its 3-letter root, exhibiting systematic changes at word boundaries.',
      tl: 'Ang Al-Naqis ay nagtatapos sa mahinang letra (و o ي) at nagbabago sa dulo.',
    },
    definition: { arabicTerm: 'الفعل الناقص', text: { ar: 'ما كانت لامه واوًا أو ياءً، مثل: دَعَا يَدْعُو، رَمَى يَرْمِي، رَضِيَ يَرْضَى.', en: 'A verb whose 3rd radical (Lam al-Kalimah) is Waw or Ya.', tl: 'Pandiwang may Waw o Ya sa ikatlong ugat.' } },
    explanation: {
      ar: 'في الماضي (فَعَلَ): تُكتب الألف طويلةً إن كان أصلها واوًا (دَعَا ← دَعَوَا) ومقصورةً إن كان أصلها ياءً (رَمَى ← رَمَيَا). وتُحذف الألف مع تاء التأنيث (دَعَتْ، رَمَتْ) ومع واو الجماعة مع بقاء الفتحة (دَعَوْا، رَمَوْا). وفي المضارع (يَدْعُو / يَرْمِي): يُرفع بضمة مقدرة للثقل، وتظهر الفتحة في النصب (لَنْ يَدْعُوَ / لَنْ يَرْمِيَ)، ويُجزم بحذف حرف العلة (لَمْ يَدْعُ / لَمْ يَرْمِ). أما المزيد من الناقص (أَعْطَى، رَبَّى، اِشْتَرَى) فتُكتب لامه ألفًا مقصورةً دائمًا وتُقلب ياءً في المضارع.',
      en: 'In Form I Madhi: Waw-origin writes tall Alif (دَعَا), Ya-origin writes Alif Maqsura (رَمَى); both drop before تْ (دَعَتْ) and وا (دَعَوْا). In Mudhari: Raf\' has implicit Damma, Nasb shows explicit Fatha on و/ي (لَنْ يَدْعُوَ, لَنْ يَرْمِيَ), and Jazm drops the weak letter (لَمْ يَدْعُ, لَمْ يَرْمِ). In all Augmented Forms (أَعْطَى, رَبَّى, اِشْتَرَى), Madhi writes ى and Mudhari uses ي.',
      tl: 'Sa Madhi: mahabang Alif kung Waw (دَعَا), Alif Maqsura kung Ya (رَمَى). Sa Nasb, nakikita ang Fatha (يَدْعُوَ, يَرْمِيَ); sa Jazm, tinatanggal ang huling letra.',
    },
    rules: [
      { ar: 'في (دَعَوْا) و(رَمَوْا) واو الجماعة مفتوح ما قبلها، أما في (رَضُوا) ومضارع (يَدْعُونَ) فما قبل الواو مضموم.', en: 'Notice vowel before 3mp Waw: Fatha in دَعَوْا/رَمَوْا vs Damma in رَضُوا and يَدْعُونَ.', tl: 'Pansinin ang patinig bago ang وا: Fatha sa دَعَوْا/رَمَوْا, Damma sa رَضُوا.' },
      { ar: 'الأمر من الناقص يُبنى على حذف حرف العلة: اُدْعُ، اِرْمِ، اِرْضَ، أَعْطِ، رَبِّ.', en: 'Singular Amr drops the final weak letter: اُدْعُ, اِرْمِ, اِرْضَ, أَعْطِ, رَبِّ.', tl: 'Tinatanggal ang huling letra sa isahang Amr: اُدْعُ, اِرْمِ, اِرْضَ.' },
    ],
    classifications: [
      { titleAr: 'ناقص واوي', titleEn: 'Naqis Wawi', titleTl: 'Naqis Wawi', description: { ar: 'ألفه طويلة في الثلاثي.', en: 'Tall Alif in Form I Madhi.', tl: 'Mahabang Alif sa Madhi.' }, examples: ['دَعَا — يَدْعُو — اُدْعُ', 'نَجَا — يَنْجُو — اُنْجُ'] },
      { titleAr: 'ناقص يائي', titleEn: 'Naqis Yayi', titleTl: 'Naqis Yayi', description: { ar: 'ألفه مقصورة في الثلاثي.', en: 'Alif Maqsura in Form I Madhi.', tl: 'Alif Maqsura sa Madhi.' }, examples: ['رَمَى — يَرْمِي — اِرْمِ', 'سَعَى — يَسْعَى — اِسْعَ'] },
    ],
    patterns: [
      { pattern: 'أَفْعَلَ (ناقص)', example: 'أَعْطَى — يُعْطِي — أَعْطِ', meaning: { ar: 'الرباعي الناقص', en: 'Form IV Defective', tl: 'Form IV Naqis' }, rule: { ar: 'تنقلب كل لام واوية ياءً في المزيد', en: 'All final weak letters become Ya in augmented forms', tl: 'Nagiging Ya sa lahat ng pinalawak na porma' } },
    ],
    examples: [{ arabic: 'أَنْتُمْ تَدْعُونَ وَأَنْتُنَّ تَدْعُونَ', transliteration: 'antum tad\'ūna wa antunna tad\'ūna', translation: { ar: 'الفرق الصرفي بين تَدْعُونَ للذكور والإناث', en: 'You (mp) call and you (fp) call', tl: 'Kayong mga lalaki ay tumatawag at kayong mga babae ay tumatawag' }, analysis: { ar: 'الأول على وزن (تَفْعُونَ) بواو الجماعة، والثاني على وزن (تَفْعُلْنَ) بلام الفعل ونون النسوة!', en: '2mp تَدْعُونَ weighs تَفْعُونَ (plural Waw + Nun), whereas 2fp تَدْعُونَ weighs تَفْعُلْنَ (root Waw + feminine Nun)!', tl: 'Ang 2mp ay تَفْعُونَ (tinanggal ang ugat na Waw); ang 2fp ay تَفْعُلْنَ (nanatili ang ugat na Waw).' } }],
    exceptions: [{ ar: 'تُثبت الياء وتُظهر الفتحة في (رَضِيَ) ولا تُحذف إلا مع واو الجماعة (رَضُوا).', en: 'In رَضِيَ, Ya stays intact in all Madhi persons except 3mp (رَضُوا).', tl: 'Sa رَضِيَ, nananatili ang Ya maliban sa رَضُوا.' }],
    commonMistakes: [{ ar: 'الجمع بين حرف العلة وعلامة الجزم أو الأمر فيقال خطأً: (*لَمْ يَدْعُو / *اِرْمِي للمذكر / *صَلِّي للمذكر).', en: 'Writing *لَمْ يَدْعُو or *اِرْمِي for masculine singular (forgetting to drop the weak final letter!).', tl: 'Hindi pagtanggal ng mahinang letra sa Majzum at isahang lalaking Amr.' }],
    comparison: { ar: 'في (أَنْتِ تَدْعِينَ) الوزن (تَفْعِينَ)، بينما في (أَنْتُنَّ تَدْعُونَ) الوزن (تَفْعُلْنَ).', en: '2fs تَدْعِينَ drops root Waw (تَفْعِينَ), while 2fp تَدْعُونَ keeps root Waw (تَفْعُلْنَ).', tl: 'Sa 2fs تَدْعِينَ nawawala ang ugat na Waw; sa 2fp تَدْعُونَ nananatili ito.' },
    practicalExercises: [{ id: 'ex-s12-1', prompt: { ar: 'اذكر الوزن الصرفي لكلمة (أَعْطِ).', en: 'What is the pattern of أَعْطِ?', tl: 'Ano ang pattern ng أَعْطِ?' }, arabicPrompt: 'أَعْطِ', answer: 'أَفْعِ', explanation: { ar: 'حُذفت لام الكلمة لبناء الأمر على حذف حرف العلة.', en: 'Final radical ل dropped in Amr.', tl: 'Tinanggal ang huling letra sa Amr.' } }],
    summary: { ar: 'تصريف الناقص يدور على التمييز بين واو الفعل وواو الجماعة، وحذف حرف العلة في الجزم والأمر.', en: 'Naqis conjugation balances root weak letters against pronoun suffixes and Jussive/Amr drops.', tl: 'Ang Naqis ay nakatuon sa huling mahinang letra sa Majzum, Amr, at panghalip.' },
    furtherReading: S_MAQSUD,
    meta: { status: 'verified', sources: S_MAQSUD, qiyasiVsSamaai: 'قياسي' },
  }),

  makeSarfChapter(13, 'sarf-13', 'advanced', 'اللفيف المفروق واللفيف المقرون', 'Doubly Weak Verbs (Al-Lafif al-Mafruq & al-Maqrun)', 'Mga Pandiwang May Dalawang Mahinang Letra (Lafif)', {
    objectives: [
      { ar: 'تصريف اللفيف المفروق مثل (وَقَى — يَقِي — قِ) و(وَفَى — يَفِي — فِ).', en: 'Conjugate Lafif Mafruq (وَفَى, وَقَى) including its 1-letter imperative.', tl: 'Maibanghay ang Lafif Mafruq kabilang ang 1-letrang pautos.' },
      { ar: 'تصريف اللفيف المقرون مثل (طَوَى — يَطْوِي — اِطْوِ).', en: 'Conjugate Lafif Maqrun (طَوَى, نَوَى) where medial Waw remains intact.', tl: 'Maibanghay ang Lafif Maqrun.' },
    ],
    introduction: {
      ar: 'اللفيف ما اجتمع فيه حرفا علة أصليان: فإن فرَّق بينهما حرف صحيح فهو المفروق، وإن تجاورا في موضع العين واللام فهو المقرون.',
      en: 'Al-Lafif contains two weak root letters: Mafruq separates them (1st & 3rd radicals), while Maqrun places them side by side (2nd & 3rd radicals).',
      tl: 'Ang Al-Lafif ay may dalawang mahinang letra: magkahiwalay sa Mafruq, magkatabi sa Maqrun.',
    },
    definition: { arabicTerm: 'اللفيف بنوعيه', text: { ar: 'اجتماع حرفي علة في جذر واحد: مفروق (فاؤه ولامه معتلتان) ومقرون (عينه ولامه معتلتان).', en: 'A triliteral verb with two weak radicals: Mafruq (C1 & C3) or Maqrun (C2 & C3).', tl: 'Pandiwang may dalawang mahinang letra sa ugat.' } },
    explanation: {
      ar: 'اللفيف المفروق (مثل وَقَى، وَعَى، وَفَى) تُعامل فاؤه معاملة المثال الواوي فتُحذف في المضارع والأمر، وتُعامل لامه معاملة الناقص اليائي فتُحذف في الجزم والأمر؛ فيبقى الأمر المفرد على حرف واحد مكسور: قِ، عِ، فِ (وتُضاف هاء السكت عند الوقف: قِهْ، عِهْ، فِهْ). أما اللفيف المقرون (طَوَى، شَوَى، رَوَى) فتبقى عينه صحيحة دون قلب لئلا يتوالى إعلالان في كلمة واحدة، وتُعامل لامه معاملة الناقص.',
      en: 'Lafif Mafruq applies Mithal rules to C1 and Naqis rules to C3: وَقَى → يَقِي → قِ (1-letter imperative, or قِهْ in pause!). Lafif Maqrun keeps C2 intact (to avoid consecutive I\'lals) and treats C3 like Naqis: طَوَى → يَطْوِي → اِطْوِ.',
      tl: 'Sa Lafif Mafruq, nawawala ang una at huling letra sa pautos (وَقَى → قِ). Sa Lafif Maqrun, nananatili ang gitna at sumusunod ang dulo sa Naqis (طَوَى → اِطْوِ).',
    },
    rules: [
      { ar: 'اللفيف المفروق يجمع حكمي المثال والناقص.', en: 'Mafruq combines Mithal + Naqis rules.', tl: 'Pinagsasama ng Mafruq ang Mithal at Naqis.' },
      { ar: 'اللفيف المقرون لا تُعلّ عينه بل يُعامل معاملة الناقص فقط.', en: 'Maqrun never alters its middle Waw; it behaves purely like Naqis.', tl: 'Hindi nagbabago ang gitnang Waw ng Maqrun.' },
    ],
    classifications: [
      { titleAr: 'اللفيف المفروق', titleEn: 'Separated Doubly Weak', titleTl: 'Lafif Mafruq', description: { ar: 'مثل: وَقَى، وَعَى، وَفَى.', en: 'C1 and C3 weak.', tl: 'Una at huling letra ang mahina.' }, examples: ['وَقَى — يَقِي — قِ', 'وَفَى — يَفِي — فِ'] },
      { titleAr: 'اللفيف المقرون', titleEn: 'Adjacent Doubly Weak', titleTl: 'Lafif Maqrun', description: { ar: 'مثل: طَوَى، نَوَى، رَوَى.', en: 'C2 and C3 weak.', tl: 'Gitna at huling letra ang mahina.' }, examples: ['طَوَى — يَطْوِي — اِطْوِ', 'حَيِيَ — يَحْيَا'] },
    ],
    patterns: [
      { pattern: 'فَعَلَ — يَفْعِلُ — عِ', example: 'وَعَى — يَعِي — عِ', meaning: { ar: 'أمر المفروق', en: '1-letter imperative', tl: '1-letrang pautos' }, rule: { ar: 'حُذفت الفاء واللام وبقيت العين وحدها', en: 'Only middle radical remains', tl: 'Gitnang letra lamang ang natira' } },
    ],
    examples: [{ arabic: 'فِ بِوَعْدِكَ وَاطْوِ صَفْحَةَ الْخِلَافِ', transliteration: 'fi bi-wa\'dika waṭwi ṣafḥata al-khilāfi', translation: { ar: 'تطبيق المفروق والمقرون', en: 'Fulfill your promise and fold the page of dispute', tl: 'Tuparin ang iyong pangako at isara ang pahina ng alitan' }, analysis: { ar: 'فِ أمر من وَفَى، واِطْوِ أمر من طَوَى.', en: 'فِ (from وَفَى) and اِطْوِ (from طَوَى).', tl: 'فِ mula sa وَفَى at اِطْوِ mula sa طَوَى.' } }],
    exceptions: [{ ar: 'في (حَيِيَ) يجوز الإدغام والفك في الماضي والمضارع (حَيَّ / حَيِيَ، يَحْيَا / يَحْيِيّ).', en: 'حَيِيَ (root ح-ي-ي) permits both separated حَيِيَ and geminated حَيَّ.', tl: 'Ang حَيِيَ ay maaaring isulat bilang حَيِيَ o حَيَّ.' }],
    commonMistakes: [{ ar: 'إعلال الواو في (طَوَى) بقلبها ألفًا؛ والصواب ثبوت الواو مفتوحةً لئلا يجتمع إعلالان.', en: 'Altering the middle Waw in طَوَى; it stays intact.', tl: 'Pagbabago sa gitnang Waw ng طَوَى.' }],
    comparison: { ar: 'أمر المفروق للمفرد (قِ) حرف واحد، وللجمع (قُوا) وللمؤنثة (قِي) وللمثنى (قِيَا) وللنسوة (قِينَ).', en: 'Imperative of وَقَى: قِ (2ms), قِيَا (2d), قُوا (2mp), قِي (2fs), قِينَ (2fp).', tl: 'Pautos ng وَقَى: قِ, قِيَا, قُوا, قِي, قِينَ.' },
    practicalExercises: [{ id: 'ex-s13-1', prompt: { ar: 'صغ الأمر للجمع المذكر (أَنْتُمْ) من (وَفَى).', en: 'Form 2mp imperative of وَفَى.', tl: 'Buuin ang 2mp Amr ng وَفَى.' }, arabicPrompt: 'وَفَى (أَنْتُمْ)', answer: 'فُوا', explanation: { ar: 'تُحذف الواو وتُثبت الفاء المضمومة مع واو الجماعة.', en: 'C1 Waw drops; C2 ف takes Damma before plural وا.', tl: 'Nawawala ang Waw at nagiging فُوا.' } }],
    summary: { ar: 'اللفيف يبرهن على إحكام الصرف العربي حيث تندمج قوانين المثال والناقص بانتظام دقيق.', en: 'Lafif demonstrates the modular precision of Arabic morphology.', tl: 'Pinapakita ng Lafif ang maayos na pagsasanib ng mga tuntunin ng Mithal at Naqis.' },
    furtherReading: S_MAQSUD,
    meta: { status: 'verified', sources: S_MAQSUD },
  }),

  makeSarfChapter(14, 'sarf-14', 'intermediate', 'الفعل المضعف والفعل المهموز', 'Geminate (Muda\'af) & Hamzated (Mahmuz) Verbs', 'Mga Pandiwang Muda\'af at Mahmuz', {
    objectives: [
      { ar: 'إتقان مواضع الإدغام الوجوبي وفك الإدغام في المضعف.', en: 'Master obligatory Idgham and Fakk al-Idgham in geminate verbs.', tl: 'Matutunan ang pagsasanib (Idgham) at paghihiwalay (Fakk) sa Muda\'af.' },
      { ar: 'تطبيق قواعد الهمزة في المهموز وأوجه تخفيفها.', en: 'Apply Hamza spelling/easing rules and irregular Mahmuz imperatives.', tl: 'Maisagawa ang mga tuntunin sa Hamza at mga eksepsiyon sa Mahmuz.' },
    ],
    introduction: {
      ar: 'رغم أن المضعف والمهموز يُعدّان من الأفعال الصحيحة، فلهما أحكام خاصة عند التقاء المثلين أو تلاقي الهمزتين.',
      en: 'Although classified as Sahih, Muda\'af (doubled C2=C3) and Mahmuz (Hamza radical) follow crucial morphophonemic rules.',
      tl: 'Bagaman kabilang sa Sahih, may mga espesyal na tuntunin ang Muda\'af at Mahmuz.',
    },
    definition: { arabicTerm: 'المضعف والمهموز', text: { ar: 'المضعف الثلاثي ما كانت عينه ولامه من جنس واحد (مَدَّ)، والمهموز ما كان أحد أصوله همزة (أَخَذَ، سَأَلَ، قَرَأَ).', en: 'Muda\'af has C2=C3; Mahmuz has Hamza as C1, C2, or C3.', tl: 'Ang Muda\'af ay may magkaparehong C2 at C3; ang Mahmuz ay may Hamza sa ugat.' } },
    explanation: {
      ar: 'في المضعف: يجب الإدغام إذا تحرك الحرف الثاني (مَدَّ، يَمُدُّ)، ويجب الفك إذا سكن الثاني لاتصاله بضمير رفع متحرك (مَدَدْتُ، مَدَدْنَ، يَمْدُدْنَ)، ويجوز الوجهان في الجزم المفرد (لَمْ يَمُدَّ / لَمْ يَمْدُدْ) والأمر المفرد (مُدَّ / اُمْدُدْ). في المهموز: إذا اجتمعت همزتان أولاهما مفتوحة وثانيتهما ساكنة قُلبت الثانية مدًّا (أَأْخُذُ ← آخُذُ). وفي أمر سَأَلَ يجوز اِسْأَلْ وسَلْ.',
      en: 'Muda\'af: Idgham is obligatory when C3 is vowelized (مَدَّ, يَمُدُّ); Fakk al-Idgham is obligatory when C3 takes sukun before consonant suffixes (مَدَدْتُ, يَمْدُدْنَ); both forms are valid in singular Jussive/Amr (لَمْ يَمُدَّ or لَمْ يَمْدُدْ). Mahmuz: أَأْ merges into آ (آخُذُ); أَخَذَ/أَكَلَ/أَمَرَ drop Hamza in Amr (خُذْ/كُلْ/مُرْ).',
      tl: 'Sa Muda\'af, naghihiwalay ang letra sa مَدَدْتُ at يَمْدُدْنَ. Sa Mahmuz, nagiging آ ang أَأْ (آخُذُ) at nawawala ang Hamza sa خُذْ, كُلْ, مُرْ.',
    },
    rules: [
      { ar: 'فك الإدغام واجب مع تاء الفاعل ونا الفاعلين ونون النسوة.', en: 'Split doubled radicals before ت، نَا، نَ.', tl: 'Paghiwalayin ang dobleng letra bago ang ت, نَا, at نَ.' },
      { ar: 'كل همزتين في أول الكلمة ثانية ساكنة تُبدل الثانية مدًّا من جنس حركة الأولى (أَأْ ← آ، أُؤْ ← أُو، إِئْ ← إِي).', en: 'Two consecutive Hamzas (vowel + sukun) lengthen into آ / أُو / إِي.', tl: 'Ang dalawang magkasunod na Hamza ay nagiging mahabang tunog (آ / أُو / إِي).' },
    ],
    classifications: [
      { titleAr: 'مضعف ثلاثي', titleEn: 'Triliteral Geminate', titleTl: 'Tatluhang Muda\'af', description: { ar: 'عينه ولامه متماثلان.', en: 'C2 and C3 identical.', tl: 'Magkapareho ang C2 at C3.' }, examples: ['مَدَّ — يَمُدُّ', 'فَرَّ — يَفِرُّ', 'عَضَّ — يَعَضُّ'] },
      { titleAr: 'مهموز الفاء والعين واللام', titleEn: 'Initial/Medial/Final Hamza', titleTl: 'Mahmuz sa Una/Gitna/Dulo', description: { ar: 'أَخَذَ، سَأَلَ، قَرَأَ.', en: 'Hamza in position 1, 2, or 3.', tl: 'Hamza sa posisyon 1, 2, o 3.' }, examples: ['أَخَذَ (خُذْ)', 'سَأَلَ (اِسْأَلْ)', 'قَرَأَ (اِقْرَأْ)'] },
    ],
    patterns: [
      { pattern: 'فَعَّ ← فَعَلْتُ', example: 'رَدَّ ← رَدَدْتُ', meaning: { ar: 'فك التضعيف', en: 'Geminate split', tl: 'Paghihiwalay ng dobleng letra' }, rule: { ar: 'لتجنب التقاء الساكنين', en: 'Avoids sukun cluster', tl: 'Iniiwasan ang magkasunod na sukun' } },
    ],
    examples: [{ arabic: 'خُذِ الْكِتَابَ وَاقْرَأْ مَا فِيهِ', transliteration: 'khudhi al-kitāba waqra\' mā fīhi', translation: { ar: 'اجتماع مهموز الفاء ومهموز اللام', en: 'Take the book and read what is in it', tl: 'Kunin ang aklat at basahin ang nilalaman nito' }, analysis: { ar: 'خُذْ حُذفت همزته سماعًا، واِقْرَأْ أُثبتت فيه الهمزة.', en: 'خُذْ drops initial Hamza exceptionally; اِقْرَأْ retains final Hamza.', tl: 'Tinanggal ang Hamza sa خُذْ; nanatili sa اِقْرَأْ.' } }],
    exceptions: [{ ar: 'إبقاء همزة (أَمَرَ) جائز إذا سُبق بواو أو فاء نحو: وَأْمُرْ أَهْلَكَ، بينما بدونها يُقال مُرْ.', en: 'أَمَرَ restores Hamza after conjunctions وَ/فَ (وَأْمُرْ), whereas standalone is مُرْ.', tl: 'Bumabalik ang Hamza sa وَأْمُرْ kapag may وَ/فَ.' }],
    commonMistakes: [{ ar: 'كتابة (*آخذت) بالمد في الماضي؛ المد خاص بالمضارع (أَنَا آخُذُ) لا الماضي (أَخَذْتُ).', en: 'Writing Madda on 1s Madhi (*آخَذْتُ); Madda occurs in 1s Mudhari (آخُذُ), while Madhi is أَخَذْتُ.', tl: 'Ang آ ay sa 1s Mudhari (آخُذُ), hindi sa Madhi (أَخَذْتُ).' }],
    comparison: { ar: 'المضعف الرباعي مثل (زَلْزَلَ) لا يُدغم لأن المثلين غير متجاورين.', en: 'Quadriliteral reduplicated verbs (زَلْزَلَ) never merge because identical letters are separated.', tl: 'Ang apatang reduplicated na pandiwa (زَلْزَلَ) ay hindi nagsasanib.' },
    practicalExercises: [{ id: 'ex-s14-1', prompt: { ar: 'أسند الفعل (ظَنَّ) إلى الضمير (هُنَّ) في الماضي والمضارع.', en: 'Conjugate ظَنَّ for هُنَّ (3fp) in Madhi and Mudhari.', tl: 'Ibanghay ang ظَنَّ para sa هُنَّ.' }, arabicPrompt: 'ظَنَّ (هُنَّ)', answer: 'ظَنَنَّ — يَظْنُنَّ', explanation: { ar: 'يفك الإدغام مع نون النسوة.', en: 'Doubled ن splits before feminine plural suffix.', tl: 'Naghihiwalay ang dobleng ن bago ang نون النسوة.' } }],
    summary: { ar: 'فك الإدغام وتخفيف الهمزة يجريان على قواعد صوتية مضبوطة تمنع الثقل والساكنين.', en: 'Fakk al-Idgham and Hamza rules prevent consonant clashes and articulatory heaviness.', tl: 'Iniiwasan ng Fakk al-Idgham at tuntunin ng Hamza ang mabigat na pagbigkas.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(15, 'sarf-15', 'intermediate', 'المصادر: الأصلي والقياسي والسماعي والميمي', 'Masdar Studies: Original, Qiyasi, Sama\'i & Mimi', 'Pag-aaral ng Masdar: Orihinal, Qiyasi, Sama\'i at Mimi', {
    objectives: [
      { ar: 'التمييز بين المصدر الأصلي واسم المصدر والمصدر الميمي.', en: 'Distinguish Original Masdar, Ism Masdar, and Masdar Mimi.', tl: 'Makilala ang pagkakaiba ng Masdar, Ism Masdar, at Masdar Mimi.' },
      { ar: 'التمييز بين السماعي في الثلاثي والقياسي في بعض أبوابه.', en: 'Distinguish Sama\'i (lexical) from Qiyasi (analogical) Form I Masdars.', tl: 'Makilala ang Sama\'i at Qiyasi sa Form I Masdar.' },
    ],
    introduction: {
      ar: 'المصدر هو الاسم الدال على الحدث المجرد من الزمان، وهو أصل المشتقات عند البصريين.',
      en: 'Al-Masdar denotes the pure verbal concept stripped of tense; according to the Basran school, it is the origin from which verbs and participles derive.',
      tl: 'Ang Al-Masdar ay pangngalan ng kilos na walang panahunan.',
    },
    definition: { arabicTerm: 'المصدر والمصدر الميمي', text: { ar: 'المصدر اسم يدل على الحدث غير مقترن بزمان، والمصدر الميمي مصدر مبدوء بميم زائدة لغير المفاعلة على وزن مَفْعَل أو مَفْعِل.', en: 'Masdar is the tenseless verbal noun; Masdar Mimi begins with an augmented مـ (مَفْعَل / مَفْعِل) carrying the same meaning.', tl: 'Ang Masdar ay pangngalang pandiwa; ang Masdar Mimi ay nagsisimula sa مـ.' } },
    explanation: {
      ar: 'أكثر مصادر الثلاثي المجرد سماعية (عِلْم، كِتَابَة، نَصْر، جُلُوس) غير أن الصرفيين وضعوا ضوابط غالبية: فالحرف على فِعَالَة (زِرَاعَة، تِجَارَة)، والأمراض على فُعَال (صُدَاع، سُعَال)، والأصوات على فُعَال أو فَعِيل (صُرَاخ، صَهِيل)، والامتناع على فِعَال (إِبَاء، نِفَار). أما اسم المصدر فما نقصت حروفه عن حروف فعله دون تعويض مثل: عَطَاء (من أَعْطَى، ومصدره إِعْطَاء) وسَلَام (من سَلَّمَ، ومصدره تَسْلِيم). والمصدر الميمي من الثلاثي على مَفْعَل (مَشْرَب، مَقْتَل) إلا المثال الواوي المكسور العين في المضارع فعلى مَفْعِل (مَوْعِد).',
      en: 'Form I Masdars are predominantly Sama\'i, though semantic tendencies exist (crafts فِعَالَة, ailments فُعَال, sounds فَعِيل/فُعَال). Ism Masdar has fewer letters than its verb’s regular Masdar (عَطَاء vs إِعْطَاء; سَلَام vs تَسْلِيم). Masdar Mimi weighs مَفْعَل (or مَفْعِل for Mithal Wawi like مَوْعِد) in Form I, and matches Ism Maf\'ul in Forms II–X (مُكْرَم, مُنْطَلَق).',
      tl: 'Ang Form I Masdar ay karaniwang Sama\'i. Ang Ism Masdar ay mas maikli (عَطَاء vs إِعْطَاء). Ang Masdar Mimi ay nagsisimula sa مـ (مَفْعَل/مَفْعِل).',
    },
    rules: [
      { ar: 'مصدر الثلاثي سماعي في الأصل، لا يُقاس إلا عند عدم السماع بضوابط فَعْل وفُعُول وفَعَالَة.', en: 'Do not invent Form I Masdars by guessing; verify Sama\'i forms in a dictionary.', tl: 'Iwasan ang panghuhula ng Form I Masdar; tiyakin ito sa diksiyonaryo.' },
      { ar: 'يُصاغ المصدر الميمي من غير الثلاثي على وزن اسم المفعول (مُنْطَلَق، مُقَام).', en: 'Masdar Mimi of Forms II–X equals the Passive Participle pattern.', tl: 'Ang Masdar Mimi ng Forms II–X ay katulad ng Ism Maf\'ul.' },
    ],
    classifications: [
      { titleAr: 'المصدر السماعي والقياسي في الثلاثي', titleEn: 'Lexical vs Semantic Tendencies', titleTl: 'Sama\'i vs Qiyasi', description: { ar: 'فِعَالَة للحرف، فُعَال للأمراض، فَعَلَان للتقلب.', en: 'Crafts (فِعَالَة), ailments (فُعَال), motion (فَعَلَان).', tl: 'Hanapbuhay (فِعَالَة), sakit (فُعَال).' }, examples: ['خِيَاطَة', 'زُكَام', 'غَلَيَان'] },
      { titleAr: 'اسم المصدر vs المصدر', titleEn: 'Ism Masdar vs Masdar', titleTl: 'Ism Masdar vs Masdar', description: { ar: 'نقص حروف اسم المصدر عن فعله.', en: 'Ism Masdar omits an augment letter without replacement.', tl: 'Mas maikli ang Ism Masdar.' }, examples: ['تَوَضَّأَ ← وُضُوء (اسم مصدر) vs تَوَضُّؤ (مصدر)', 'أَعْطَى ← عَطَاء vs إِعْطَاء'] },
    ],
    patterns: [
      { pattern: 'مَفْعَل / مَفْعِل', example: 'مَوْعِد / مَقَال', meaning: { ar: 'المصدر الميمي الثلاثي', en: 'Form I Masdar Mimi', tl: 'Form I Masdar Mimi' }, rule: { ar: 'مَفْعِل للمثال الواوي الصحيح اللام', en: 'مَفْعِل for sound-ended Mithal Wawi', tl: 'مَفْعِل para sa Mithal Wawi' } },
    ],
    examples: [{ arabic: 'مَوْعِدُ الصَّادِقِ مُحْتَرَمٌ (أَي وَعْدُهُ)', transliteration: 'maw\'idu aṣ-ṣādiqi muḥtaramun', translation: { ar: 'المصدر الميمي بمعنى المصدر الأصلي', en: 'The promise of the truthful is respected', tl: 'Ang pangako ng matapat ay iginagalang' }, analysis: { ar: 'مَوْعِد هنا مصدر ميمي إذا أُريد به الوعد نفسه لا زمانه أو مكانه.', en: 'مَوْعِد acts as Masdar Mimi when meaning the act of promising itself.', tl: 'Masdar Mimi ang مَوْعِد kung tumutukoy sa mismong pangako.' } }],
    exceptions: [{ ar: 'تُزاد تاء في آخر بعض المصادر الميمية سماعًا مثل: مَحَبَّة، مَوَدَّة، مَعْرِفَة، مَغْفِرَة.', en: 'Some frequent Masdar Mimi words take a feminine ة: مَحَبَّة, مَعْرِفَة, مَغْفِرَة.', tl: 'May ilang Masdar Mimi na may ة sa dulo tulad ng مَحَبَّة at مَعْرِفَة.' }],
    commonMistakes: [{ ar: 'قياس مصدر كل ثلاثي على (فَعْل) دون الرجوع إلى المعجم.', en: 'Assuming every Form I verb takes فَعْل as its Masdar.', tl: 'Pag-aakalang lahat ng Form I ay فَعْل ang Masdar.' }],
    comparison: { ar: 'المصدر الميمي يؤكد المعنى كالمصدر الأصلي ويمتاز بميم زائدة في أوله، ويُفرَّق بينه وبين اسم الزمان والمكان بالسياق.', en: 'Context distinguishes Masdar Mimi from Ism Zaman/Makan when they share مَفْعَل.', tl: 'Konteksto ang nag-iiba sa Masdar Mimi at Ism Zaman/Makan.' },
    practicalExercises: [{ id: 'ex-s15-1', prompt: { ar: 'ميّز بين المصدر واسم المصدر للفعل (سَلَّمَ).', en: 'Distinguish the Masdar and Ism Masdar of سَلَّمَ.', tl: 'Ipagkaiba ang Masdar at Ism Masdar ng سَلَّمَ.' }, arabicPrompt: 'سَلَّمَ', answer: 'تَسْلِيم (مصدر) — سَلَام (اسم مصدر)', explanation: { ar: 'تَسْلِيم على وزن تَفْعِيل القياسي، وسَلَام نقصت حروفه.', en: 'تَسْلِيم is the regular Form II Masdar; سَلَام is Ism Masdar.', tl: 'تَسْلِيم ang Masdar; سَلَام ang Ism Masdar.' } }],
    summary: { ar: 'ثلاثية المصادر (الأصلي والميمي واسم المصدر) تمكّنك من فهم أصل الاشتقاق بدقة.', en: 'Distinguishing Original Masdar, Ism Masdar, and Masdar Mimi deepens lexical mastery.', tl: 'Ang pag-unawa sa mga uri ng Masdar ay nagpapalalim ng kaalaman sa mga ugat ng salita.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA, qiyasiVsSamaai: 'قياسي وسماعي' },
  }),

  makeSarfChapter(16, 'sarf-16', 'advanced', 'مصادر المرة والهيئة والمؤول والصناعي والمزيد', 'Instance, Manner, Interpreted, Artificial & Augmented Masdars', 'Masdar al-Marrah, Hay\'ah, Mu\'awwal, Sina\'i at ng Mazid', {
    objectives: [
      { ar: 'صياغة اسم المرة واسم الهيئة من الثلاثي وغيره.', en: 'Form Masdar al-Marrah (once) and al-Hay\'ah (manner).', tl: 'Mabuo ang Masdar al-Marrah at al-Hay\'ah.' },
      { ar: 'فهم المصدر المؤول والمصدر الصناعي ومصادر الرباعي والمزيد.', en: 'Analyze Masdar Mu\'awwal, Masdar Sina\'i, and regular Form II–X/Quadriliteral Masdars.', tl: 'Maunawaan ang Masdar Mu\'awwal, Sina\'i, at regular na Masdar ng II–X.' },
    ],
    introduction: {
      ar: 'تتسع منظومة المصادر لتشمل التعبير عن عدد مرات الفعل (المرة)، وصفته (الهيئة)، والمصدر المسبوك من الحرف والصلة (المؤول)، والمصدر الدال على الصفات المجردة (الصناعي)، فضلًا عن المصادر القياسية للمزيد والرباعي.',
      en: 'Arabic extends the Masdar system to express single occurrence (Marrah), manner (Hay\'ah), clausal nominalization (Mu\'awwal), abstract nouns (Sina\'i), and completely regular augmented Masdars.',
      tl: 'Sinasaklaw ng sistema ng Masdar ang bilang ng beses (Marrah), paraan (Hay\'ah), sugnay (Mu\'awwal), at abstraktong pangngalan (Sina\'i).',
    },
    definition: { arabicTerm: 'أنواع المصادر القياسية', text: { ar: 'مصدر المرة (فَعْلَة)، ومصدر الهيئة (فِعْلَة)، والمؤول (حرف مصدري + جملة)، والصناعي (اسم + يَّة).', en: 'Marrah (فَعْلَة), Hay\'ah (فِعْلَة), Mu\'awwal (أَنْ/أَنَّ/مَا + clause), Sina\'i (-iyyah abstract noun).', tl: 'Marrah (فَعْلَة), Hay\'ah (فِعْلَة), Mu\'awwal, at Sina\'i (-iyyah).' } },
    explanation: {
      ar: '١- اسم المرة من الثلاثي على فَعْلَة (ضَرْبَة، جَلْسَة)، ومن غير الثلاثي بزيادة تاء على المصدر (اِنْطِلَاقَة) وإذا كان المصدر الأصلي مختومًا بالتاء وُصف بـ(واحدة): إِقَامَة وَاحِدَة. ٢- اسم الهيئة من الثلاثي على فِعْلَة بكسر الفاء (جِلْسَة الْمُتَأَدِّب، مِشْيَة الْفَخُور). ٣- المصدر المؤول: يُسبك من (أَنْ + المضارع)، أو (أَنَّ + اسمها وخبرها)، أو (مَا + الماضي) ويأخذ محلًّا إعرابيًّا (يُسْعِدُنِي أَنْ تَنْجَحَ = نَجَاحُكَ). ٤- المصدر الصناعي: بزيادة ياء مشددة وتاء مربوطة بشرط ألا يكون نعتًا (الْحُرِّيَّة، الْإِنْسَانِيَّة، الِاشْتِرَاكِيَّة)؛ فإن وقع نعتًا صار اسمًا منسوبًا. ٥- مصادر المزيد والرباعي قياسية مطردة (تَفْعِيل، مُفَاعَلَة، إِفْعَال، تَفَعُّل، تَفَاعُل، اِنْفِعَال، اِفْتِعَال، اِفْعِلَال، اِسْتِفْعَال، فَعْلَلَة، تَفَعْلُل).',
      en: '1. Marrah: فَعْلَة in Form I; regular Masdar + ة in II–X (use وَاحِدَة if Masdar already ends in ة like إِقَامَة وَاحِدَة). 2. Hay\'ah: فِعْلَة in Form I (جِلْسَة, مِشْيَة). 3. Mu\'awwal: أَنْ/أَنَّ/مَا + clause acting as a single noun slot in I\'rab. 4. Sina\'i: noun + ـيَّة when NOT acting as an adjective (otherwise it is Nisbah!). 5. Forms II–X and Quadriliterals have 100% regular Masdars.',
      tl: '1. Marrah: فَعْلَة (isang beses). 2. Hay\'ah: فِعْلَة (paraan). 3. Mu\'awwal: sugnay na may أَنْ/أَنَّ. 4. Sina\'i: -iyyah na pangngalan (hindi pang-uri). 5. Regular ang Masdar ng Forms II–X.',
    },
    rules: [
      { ar: 'الفرق بين المصدر الصناعي والاسم المنسوب: إذا أُعرب نعتًا أو معطوفًا على نعت فهو منسوب (الْحَيَاةُ الْإِنْسَانِيَّةُ)، وإذا لم يكن نعتًا فهو مصدر صناعي (الْإِنْسَانِيَّةُ فِطْرَةٌ).', en: 'Sina\'i vs Nisbah: if it functions as an adjective (Na\'t), it is Nisbah; otherwise, it is Masdar Sina\'i.', tl: 'Kung ginamit na pang-uri, ito ay Nisbah; kung hindi, Masdar Sina\'i.' },
    ],
    classifications: [
      { titleAr: 'المصدر المؤول', titleEn: 'Interpreted Clause Masdar', titleTl: 'Masdar Mu\'awwal', description: { ar: 'يتأول بمصدر صريح في الإعراب.', en: 'Acts syntactically as a single noun.', tl: 'Gumaganap bilang iisang pangngalan sa I\'rab.' }, examples: ['أَنْ تَصُومُوا خَيْرٌ (صِيَامُكُمْ)', 'عَلِمْتُ أَنَّكَ قَادِمٌ (قُدُومَكَ)'] },
      { titleAr: 'مصادر المزيد والرباعي', titleEn: 'Augmented & Quad Masdars', titleTl: 'Masdar ng Mazid at Ruba\'i', description: { ar: 'أوزان قياسية ثابتة.', en: 'Predictable Qiyasi patterns.', tl: 'Regular na mga pattern.' }, examples: ['عَلَّمَ ← تَعْلِيمًا', 'دَحْرَجَ ← دَحْرَجَةً', 'اِسْتَقْبَلَ ← اِسْتِقْبَالًا'] },
    ],
    patterns: [
      { pattern: 'فَعْلَة / فِعْلَة', example: 'وَقْفَة / وِقْفَة', meaning: { ar: 'مرة / هيئة', en: 'One standing / manner of standing', tl: 'Isang pagtayo / paraan ng pagtayo' }, rule: { ar: 'الفتح للمرة والكسر للهيئة', en: 'Fatha = once; Kasra = manner', tl: 'Fatha = beses; Kasra = paraan' } },
      { pattern: 'تَفْعِلَة (ناقص II)', example: 'رَبَّى ← تَرْبِيَةً', meaning: { ar: 'مصدر فَعَّلَ الناقص', en: 'Form II Naqis Masdar', tl: 'Masdar ng Form II Naqis' }, rule: { ar: 'تُبدل الياء تاءً في تَفْعِيل الناقص والمهموز غالبًا', en: 'Takes تَفْعِلَة instead of تَفْعِيل', tl: 'Nagiging تَفْعِلَة' } },
    ],
    examples: [{ arabic: 'أَعْجَبَتْنِي جِلْسَةُ الْعَالِمِ وَتَسْبِيحَةُ الصَّبَاحِ', transliteration: 'a\'jabatnī jilsatu al-\'ālimi wa tasbīḥatu aṣ-ṣabāḥi', translation: { ar: 'اجتماع الهيئة والمرة', en: 'The scholar’s manner of sitting and one morning glorification amazed me', tl: 'Pinahanga ako ng paraan ng pag-upo ng iskolar' }, analysis: { ar: 'جِلْسَة على فِعْلَة (هيئة)، وتَسْبِيحَة بزيادة التاء على تَسْبِيح (مرة).', en: 'جِلْسَة = Hay\'ah; تَسْبِيحَة = Marrah of Form II.', tl: 'جِلْسَة = Hay\'ah; تَسْبِيحَة = Marrah.' } }],
    exceptions: [{ ar: 'إذا كان المصدر الأصلي للثلاثي على فَعْلَة مثل (رَحْمَة) وُصف بـ(واحدة) للمرة.', en: 'If Form I Masdar naturally ends in ة (رَحْمَة), add وَاحِدَة for Marrah.', tl: 'Kung may ة na ang Masdar (رَحْمَة), idagdag ang وَاحِدَة.' }],
    commonMistakes: [{ ar: 'كسر الفاء عند إرادة المرة؛ والصواب فتح الفاء للمرة (نَظْرَة) وكسرها للهيئة (نِظْرَة).', en: 'Confusing فَعْلَة (instance) with فِعْلَة (manner).', tl: 'Pagkalito sa فَعْلَة (beses) at فِعْلَة (paraan).' }],
    comparison: { ar: 'مصدر أَفْعَلَ المعتل العين أو الفاء أو اللام: أَقَامَ ← إِقَامَة (تعويض التاء)، أَعْطَى ← إِعْطَاء (قلب الياء همزة)، أَوْجَدَ ← إِيجَاد (قلب الواو ياءً).', en: 'Form IV Masdar variations: Ajwaf (إِقَامَة), Mithal Wawi (إِيجَاد), Naqis (إِعْطَاء).', tl: 'Iba-ibang anyo ng Form IV Masdar para sa mahinang ugat.' },
    practicalExercises: [{ id: 'ex-s16-1', prompt: { ar: 'حول المصدر المؤول في (يَسُرُّنِي أَنْ تَجْتَهِدَ) إلى مصدر صريح وأعربه.', en: 'Convert أَنْ تَجْتَهِدَ into an explicit Masdar.', tl: 'Palitan ang أَنْ تَجْتَهِدَ ng tuwirang Masdar.' }, arabicPrompt: 'يَسُرُّنِي أَنْ تَجْتَهِدَ', answer: 'يَسُرُّنِي اجْتِهَادُكَ (في محل رفع فاعل)', explanation: { ar: 'الفعل يَسُرُّ يرفع ما يسرُّ فاعلًا.', en: 'The clause acts as Fa\'il of يَسُرُّ.', tl: 'Ang sugnay ay gumaganap bilang Fa\'il.' } }],
    summary: { ar: 'استيعاب المصادر السبعة يجعل المتعلم قادرًا على توليد الأسماء المجردة والمؤولات بدقة بلاغية ونحوية.', en: 'Mastering all Masdar categories empowers accurate derivation and sentence nominalization.', tl: 'Ang pagkabisado ng lahat ng uri ng Masdar ay nagpapahusay sa paggawa ng pangungusap.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA, qiyasiVsSamaai: 'قياسي' },
  }),

  makeSarfChapter(17, 'sarf-17', 'intermediate', 'الاسم الجامد والمشتق: اسم الفاعل وصيغ المبالغة', 'Primitive vs. Derived Nouns, Active Participle & Intensive Forms', 'Ism Jamid vs Mushtaq, Ism Fa\'il at Siyagh al-Mubalaghah', {
    objectives: [
      { ar: 'التفريق بين الاسم الجامد (الذات والمعنى) والاسم المشتق.', en: 'Distinguish Ism Jamid (non-derived) from Ism Mushtaq (derived).', tl: 'Makilala ang pagkakaiba ng Ism Jamid at Ism Mushtaq.' },
      { ar: 'صياغة اسم الفاعل من الثلاثي وغيره (بما في ذلك المعتل) وصيغ المبالغة القياسية.', en: 'Form Ism Fa\'il across Sound, Weak, and Augmented verbs plus the 5 Mubalaghah patterns.', tl: 'Mabuo ang Ism Fa\'il at ang 5 pattern ng Siyagh al-Mubalaghah.' },
    ],
    introduction: {
      ar: 'الأسماء في الصرف نوعان: جامد لم يُؤخذ من غيره (كَرَجُل وعِلْم)، ومشتق أُخذ من غيره ودل على ذات متصفة بمعنى، وأول المشتقات وأكثرها دورانًا اسم الفاعل وصيغ المبالغة.',
      en: 'Nouns split into Jamid (primitive: e.g. رَجُل, شَمْس) and Mushtaq (derived from a verb/masdar). Ism Fa\'il denotes the doer, and Siyagh al-Mubalaghah denote intensity or habit.',
      tl: 'Nahahati ang pangngalan sa Jamid (hindi hinango) at Mushtaq (hinango). Ang Ism Fa\'il ay ang gumagawa; ang Mubalaghah ay nagpapakita ng kasidhian.',
    },
    definition: { arabicTerm: 'اسم الفاعل وصيغ المبالغة', text: { ar: 'اسم الفاعل اسم مشتق يدل على من قام بالفعل أو اتصف به، وصيغ المبالغة أسماء محولة عنه للدلالة على الكثرة والمبالغة.', en: 'Ism Fa\'il is the active participle (فَاعِل / مُـ...ـِـ); Siyagh al-Mubalaghah are intensive forms emphasizing repetition or abundance.', tl: 'Ang Ism Fa\'il ay gumaganap ng kilos; ang Mubalaghah ay nagbibigay-diin sa madalas o matinding paggawa.' } },
    explanation: {
      ar: 'يُصاغ اسم الفاعل من الثلاثي على وزن فَاعِل: كَاتِب، وفي الأجوف تُقلب العين همزة: قَائِل، بَائِع، وفي الناقص تُحذف ياؤه رفعًا وجرًّا وتُنوَّن بالكسر (قَاضٍ، دَاعٍ) وتثبت مع أل أو النصب (الْقَاضِي، قَاضِيًا). ومن غير الثلاثي على وزن المضارع بإبدال حرف المضارعة ميمًا مضمومة وكسر ما قبل الآخر: مُعَلِّم، مُسْتَغْفِر، مُخْتَار (بشذوذ أو تقدير الكسرة). وصيغ المبالغة القياسية خمس: فَعَّال (غَفَّار)، مِفْعَال (مِعْطَاء)، فَعُول (شَكُور)، فَعِيل (رَحِيم)، فَعِل (حَذِر).',
      en: 'Form I Ism Fa\'il: فَاعِل (Ajwaf uses Hamza: قَائِل; Naqis drops Ya in indefinite Raf\'/Jarr: دَاعٍ vs الدَّاعِي; Muda\'af keeps Shadda: مَادٌّ). Forms II–X: replace Mudhari prefix with مُـ and Kasra before last radical (مُعَلِّم). 5 Mubalaghah patterns: فَعَّال، مِفْعَال، فَعُول، فَعِيل، فَعِل.',
      tl: 'Form I Ism Fa\'il: فَاعِل (Ajwaf: قَائِل; Naqis: دَاعٍ; Muda\'af: مَادٌّ). Forms II–X: مُـ + kasra bago ang huling letra. 5 Mubalaghah: فَعَّال، مِفْعَال، فَعُول، فَعِيل، فَعِل.',
    },
    rules: [
      { ar: 'اسم الفاعل من الناقص (الاسم المنقوص) تُحذف ياؤه إذا تجرد من أل والإضافة في حالتي الرفع والجر فقط.', en: 'Naqis Ism Fa\'il (like قَاضٍ) drops final Ya when indefinite in Raf\' and Jarr, keeping it in Nasb (قَاضِيًا) and with الـ (الْقَاضِي).', tl: 'Sa قَاضٍ, nawawala ang Ya kapag walang الـ sa Raf\' at Jarr, ngunit nananatili sa Nasb (قَاضِيًا).' },
    ],
    classifications: [
      { titleAr: 'الجامد', titleEn: 'Primitive Noun (Jamid)', titleTl: 'Ism Jamid', description: { ar: 'اسم ذات (قَلَم) أو اسم معنى (شَجَاعَة).', en: 'Concrete entity (قَلَم) or abstract Masdar (عِلْم).', tl: 'Bagay (قَلَم) o diwa (عِلْم).' }, examples: ['شَمْس', 'أَسَد', 'فَهْم'] },
      { titleAr: 'صيغ المبالغة الخمس', titleEn: '5 Intensive Patterns', titleTl: '5 Pattern ng Mubalaghah', description: { ar: 'تدل على التكثير والمبالغة.', en: 'Indicate intensive or habitual action.', tl: 'Nagpapakita ng dalas o tindi.' }, examples: ['عَلَّام', 'مِقْدَام', 'غَفُور', 'عَلِيم', 'فَطِن'] },
    ],
    patterns: [
      { pattern: 'فَاعِلٌ', example: 'كَاتِبٌ / قَائِلٌ / رَامٍ', meaning: { ar: 'اسم الفاعل الثلاثي', en: 'Form I Active Participle', tl: 'Form I Ism Fa\'il' }, rule: { ar: 'قلب عين الأجوف همزة وحذف ياء المنقوص تنوينًا', en: 'Ajwaf → Hamza; Naqis → Tanwin Kasr', tl: 'Ajwaf → Hamza; Naqis → Kasratan' } },
    ],
    examples: [{ arabic: 'إِنَّ اللَّهَ سَمِيعٌ عَلِيمٌ وَغَفُورٌ رَحِيمٌ', transliteration: 'inna Allāha samī\'un \'alīmun wa ghafūrun raḥīmun', translation: { ar: 'أمثلة لصيغ المبالغة', en: 'Indeed God is All-Hearing, All-Knowing, Most Forgiving, Most Merciful', tl: 'Katotohanan, ang Diyos ay Nakaririnig, Maalam, Mapagpatawad, at Maawain' }, analysis: { ar: 'سَمِيع وعَلِيم ورَحِيم على وزن فَعِيل، وغَفُور على وزن فَعُول.', en: 'فَعِيل and فَعُول intensive patterns.', tl: 'Mga pattern na فَعِيل at فَعُول.' } }],
    exceptions: [{ ar: 'تساوي اسم الفاعل واسم المفعول لفظًا في نحو (مُخْتَار، مُحْتَاج، مُعْتَاد، مُشْتَقّ) ويُميَّز بالسياق.', en: 'Form VIII Ajwaf/Muda\'af (مُخْتَار، مُحْتَاج) shares the same form for Ism Fa\'il and Ism Maf\'ul.', tl: 'Pareho ang anyo ng Ism Fa\'il at Ism Maf\'ul sa مُخْتَار at مُحْتَاج.' }],
    commonMistakes: [{ ar: 'إثبات ياء المنقوص النكرة المرفوعة مثل (*جاء قاضيٌ)؛ والصواب (جَاءَ قَاضٍ).', en: 'Writing *جَاءَ قَاضِيٌ instead of جَاءَ قَاضٍ.', tl: 'Pagsulat ng *جَاءَ قَاضِيٌ sa halip na جَاءَ قَاضٍ.' }],
    comparison: { ar: 'اسم الفاعل يدل على أصل الفعل دون زيادة كثرة، بينما صيغة المبالغة تدل على الكثرة، وكلاهما قد يعمل عمل فعله بشروط.', en: 'Both Ism Fa\'il and Mubalaghah can govern an object like a verb when defined by الـ or supported by a clause.', tl: 'Parehong nakapagbibigay ng layon ang Ism Fa\'il at Mubalaghah tulad ng pandiwa.' },
    practicalExercises: [{ id: 'ex-s17-1', prompt: { ar: 'هات اسم الفاعل من: (دَعَا، أَكْرَمَ، اِسْتَقَامَ).', en: 'Derive Ism Fa\'il from: دَعَا, أَكْرَمَ, اِسْتَقَامَ.', tl: 'Buuin ang Ism Fa\'il ng: دَعَا, أَكْرَمَ, اِسْتَقَامَ.' }, arabicPrompt: 'دَعَا / أَكْرَمَ / اِسْتَقَامَ', answer: 'دَاعٍ — مُكْرِمٌ — مُسْتَقِيمٌ', explanation: { ar: 'الثلاثي الناقص دَاعٍ، والرباعي مُكْرِم، والسداسي الأجوف مُسْتَقِيم.', en: 'دَاعٍ (Naqis), مُكْرِمٌ (Form IV), مُسْتَقِيمٌ (Form X).', tl: 'دَاعٍ, مُكْرِمٌ, مُسْتَقِيمٌ.' } }],
    summary: { ar: 'إتقان اسم الفاعل وصيغ المبالغة يغطي جانبًا رئيسًا من المشتقات العاملة.', en: 'Active Participles and Mubalaghah forms are vital building blocks of Arabic adjectives and agents.', tl: 'Ang Ism Fa\'il at Mubalaghah ay pangunahing bahagi ng mga hinangong pangngalan.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(18, 'sarf-18', 'intermediate', 'اسم المفعول والصفة المشبهة', 'Passive Participle (Ism Maf\'ul) & Resembling Adjective (Sifah Mushabbahah)', 'Ism Maf\'ul at Sifah Mushabbahah', {
    objectives: [
      { ar: 'صياغة اسم المفعول من الصحيح والأجوف والناقص والمزيد.', en: 'Derive Ism Maf\'ul accurately from Sound, Ajwaf, Naqis, and Augmented verbs.', tl: 'Mabuo ang Ism Maf\'ul mula sa mga pandiwang Sahih, Ajwaf, Naqis, at Mazid.' },
      { ar: 'التمييز بين اسم الفاعل والصفة المشبهة الدالة على الثبوت.', en: 'Distinguish Sifah Mushabbahah (permanent traits) from Ism Fa\'il.', tl: 'Mapagkaiba ang Sifah Mushabbahah sa Ism Fa\'il.' },
    ],
    introduction: {
      ar: 'يدل اسم المفعول على من وقع عليه الفعل، وتدل الصفة المشبهة باسم الفاعل على صفة ثابتة في الموصوف مشتقة من اللازم غالبًا.',
      en: 'Ism Maf\'ul names what undergoes the action; Sifah Mushabbahah expresses enduring qualities derived mainly from intransitive verbs.',
      tl: 'Ang Ism Maf\'ul ay tumutukoy sa tumanggap ng kilos; ang Sifah Mushabbahah ay permanente o likas na katangian.',
    },
    definition: { arabicTerm: 'اسم المفعول والصفة المشبهة', text: { ar: 'اسم المفعول اسم مشتق من الفعل المبني للمجهول للدلالة على من وقع عليه الفعل؛ والصفة المشبهة اسم مشتق من اللازم للدلالة على الثبوت.', en: 'Ism Maf\'ul derives from the passive verb (مَفْعُول / مُـ...ـَـ); Sifah Mushabbahah expresses stable attributes.', tl: 'Ang Ism Maf\'ul ay mula sa passive verb; ang Sifah Mushabbahah ay naglalarawan ng permanenteng katangian.' } },
    explanation: {
      ar: 'من الثلاثي على مَفْعُول (مَكْتُوب)، وفي الأجوف الواوي تُحذف واو مفعول (مَقُول ← أصلها مَقْوُول) وفي الأجوف اليائي تُقلب واوه وتُحذف وتُكسر الفاء (مَبِيع ← أصلها مَبْيُوع). وفي الناقص الواوي تُدغم الواوان (مَدْعُوّ) وفي اليائي تُقلب الواو ياءً وتُدغم (مَرْمِيّ). ومن غير الثلاثي بضم حرف المضارعة وفتح ما قبل الآخر (مُكْرَم، مُسْتَخْرَج). أما الصفة المشبهة فأشهر أوزانها: أَفْعَل فَعْلَاء (أَحْمَر حَمْرَاء)، فَعْلَان فَعْلَى (عَطْشَان عَطْشَى)، فَعِيل (كَرِيم، جَمِيل)، فَعْل (سَهْل، صَعْب)، فَعَل (حَسَن، بَطَل)، فُعَال (شُجَاع).',
      en: 'Form I Ism Maf\'ul: مَفْعُول (Sound: مَكْتُوب; Ajwaf Wawi: مَقُول; Ajwaf Yayi: مَبِيع; Naqis Wawi: مَدْعُوّ; Naqis Yayi: مَرْمِيّ). Forms II–X: مُـ + Fatha before last radical (مُكْرَم). Sifah Mushabbahah patterns: أَفْعَل/فَعْلَاء (colors/defects), فَعْلَان/فَعْلَى (temporary states), فَعِيل (كَرِيم), فَعْل (سَهْل), فَعَل (حَسَن).',
      tl: 'Form I Ism Maf\'ul: مَكْتُوب, مَقُول, مَبِيع, مَدْعُوّ, مَرْمِيّ. Forms II–X: مُـ + Fatha bago ang huli. Mga pattern ng Sifah Mushabbahah: أَفْعَل/فَعْلَاء, فَعْلَان/فَعْلَى, فَعِيل, فَعْل, فَعَل.',
    },
    rules: [
      { ar: 'تختلف الصفة المشبهة عن اسم الفاعل في دلالتها على الثبوت واللزوم، وفي جواز إضافة مرفوعها إليها (حَسَنُ الْخُلُقِ).', en: 'Sifah Mushabbahah indicates permanence and allows genitive annexation to its subject (حَسَنُ الْخُلُقِ).', tl: 'Nagpapakita ng katatagan ang Sifah Mushabbahah at maaaring isama sa Idafa.' },
    ],
    classifications: [
      { titleAr: 'اسم المفعول من المعتل', titleEn: 'Weak-Verb Ism Maf\'ul', titleTl: 'Ism Maf\'ul ng Mahinang Pandiwa', description: { ar: 'الأجوف والناقص.', en: 'Hollow & Defective rules.', tl: 'Mga tuntunin sa Ajwaf at Naqis.' }, examples: ['قَالَ ← مَقُول', 'بَاعَ ← مَبِيع', 'دَعَا ← مَدْعُوّ', 'رَمَى ← مَرْمِيّ'] },
      { titleAr: 'أوزان الصفة المشبهة', titleEn: 'Sifah Mushabbahah Patterns', titleTl: 'Mga Pattern ng Sifah Mushabbahah', description: { ar: 'تُقاس من فَعِلَ اللازم وفَعُلَ.', en: 'Derived from Fa\'ila (Lazim) and Fa\'ula.', tl: 'Hinango sa Fa\'ila at Fa\'ula.' }, examples: ['أَخْضَر / خَضْرَاء', 'غَضْبَان / غَضْبَى', 'كَرِيم', 'حَسَن'] },
    ],
    patterns: [
      { pattern: 'مَفْعُول (أجوف)', example: 'مَقُول / مَبِيع', meaning: { ar: 'محذوف الواو', en: 'Shortened passive participle', tl: 'Pinaikling Ism Maf\'ul' }, rule: { ar: 'نقل الحركة ثم حذف إحدى الساكنتين', en: 'Transfer vowel then drop one weak letter', tl: 'Paglipat ng patinig at pagtanggal ng letra' } },
    ],
    examples: [{ arabic: 'هُوَ رَجُلٌ كَرِيمٌ مَحْمُودُ السِّيرَةِ', transliteration: 'huwa rajulun karīmun maḥmūdu as-sīrati', translation: { ar: 'اجتماع الصفة المشبهة واسم المفعول', en: 'He is a noble man of praised conduct', tl: 'Siya ay marangal na lalaking may kapuri-puring asal' }, analysis: { ar: 'كَرِيم صفة مشبهة من كَرُمَ، ومَحْمُود اسم مفعول من حُمِدَ.', en: 'كَرِيم is Sifah Mushabbahah; مَحْمُود is Ism Maf\'ul.', tl: 'Ang كَرِيم ay Sifah Mushabbahah; ang مَحْمُود ay Ism Maf\'ul.' } }],
    exceptions: [{ ar: 'تُستعمل صيغة (فَعِيل) أحيانًا بمعنى مَفْعُول سماعًا نحو: قَتِيل (مَقْتُول) وجَرِيح (مَجْرُوح) وكَحِيل.', en: 'Some فَعِيل forms act as passive adjectives lexically (قَتِيل = مَقْتُول, جَرِيح = مَجْرُوح).', tl: 'May ilang فَعِيل na kasingkahulugan ng مَفْعُول (قَتِيل = pinatay).' }],
    commonMistakes: [{ ar: 'قول (*مَبْيُوع) أو (*مَقْوُول) في الأجوف؛ والصواب في الفصحى (مَبِيع) و(مَقُول).', en: 'Saying *مَبْيُوع or *مَقْوُول; standard Arabic mandates مَبِيع and مَقُول.', tl: 'Pagsasabi ng *مَبْيُوع sa halip na مَبِيع.' }],
    comparison: { ar: 'اسم الفاعل يدل على التجدد والحدوث، والصفة المشبهة على الثبوت والدوام.', en: 'Ism Fa\'il denotes transient action; Sifah Mushabbahah denotes permanent quality.', tl: 'Ang Ism Fa\'il ay pansamantalang kilos; ang Sifah Mushabbahah ay permanenteng katangian.' },
    practicalExercises: [{ id: 'ex-s18-1', prompt: { ar: 'صغ اسم المفعول من: (صَانَ، بَنَى، اُحْتُرِمَ).', en: 'Derive Ism Maf\'ul of: صَانَ, بَنَى, اِحْتَرَمَ.', tl: 'Buuin ang Ism Maf\'ul ng: صَانَ, بَنَى, اِحْتَرَمَ.' }, arabicPrompt: 'صَانَ / بَنَى / اِحْتَرَمَ', answer: 'مَصُونٌ — مَبْنِيٌّ — مُحْتَرَمٌ', explanation: { ar: 'صَانَ يصون مَصُون، وبنى يبني مَبْنِيّ، واحترم مُحْتَرَم.', en: 'Ajwaf Wawi مَصُون, Naqis Yayi مَبْنِيّ, Form VIII مُحْتَرَم.', tl: 'مَصُون, مَبْنِيّ, مُحْتَرَم.' } }],
    summary: { ar: 'اسم المفعول والصفة المشبهة يعتمدان على دقة الضبط الصرفي لتمييزهما عن اسم الفاعل.', en: 'Accurate vowelization distinguishes Ism Maf\'ul and Sifah Mushabbahah from Active Participles.', tl: 'Ang tamang patinig ang nagpapakita ng kaibahan ng Ism Maf\'ul at Sifah Mushabbahah.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(19, 'sarf-19', 'intermediate', 'اسم التفضيل وشروطه السبعة', 'The Elative / Comparative & Superlative (Ism al-Tafdil)', 'Pang-uring Pahambing at Pasukdol (Ism al-Tafdil)', {
    objectives: [
      { ar: 'حفظ شروط صياغة أفعل التفضيل مباشرةً.', en: 'Master the 7 classical conditions for direct أَفْعَلُ derivation.', tl: 'Maisaulo ang 7 kondisyon ng direktang أَفْعَلُ.' },
      { ar: 'التعبير عن التفضيل من الأفعال غير المستوفية للشروط.', en: 'Construct indirect comparatives using أَشَدُّ / أَكْثَرُ + Masdar.', tl: 'Makabuo ng pahambing gamit ang أَشَدُّ / أَكْثَرُ + Masdar.' },
    ],
    introduction: {
      ar: 'اسم التفضيل اسم مشتق على وزن (أَفْعَل) ومؤنثه (فُعْلَى) للدلالة على أن شيئين اشتركا في صفة وزاد أحدهما على الآخر فيها.',
      en: 'Ism al-Tafdil (pattern أَفْعَلُ, fem. فُعْلَى) compares two entities sharing a quality where one surpasses the other.',
      tl: 'Ang Ism al-Tafdil (أَفْعَلُ) ay ginagamit sa paghahambing ng dalawang bagay.',
    },
    definition: { arabicTerm: 'اسم التفضيل', text: { ar: 'اسم مصوغ على وزن أَفْعَل للدلالة على زيادة الموصوف في صفة مشتركة، ومؤنثه فُعْلَى (أَكْبَر — كُبْرَى).', en: 'Elative noun weighing أَفْعَلُ (masculine) / فُعْلَى (feminine) indicating comparative or superlative degree.', tl: 'Pang-uring nasa pattern na أَفْعَلُ (panlalaki) at فُعْلَى (pambabae).' } },
    explanation: {
      ar: 'يُصاغ مباشرةً على (أَفْعَل) إذا كان الفعل: ١- ثلاثيًّا، ٢- تامًّا، ٣- متصرفًا، ٤- مثبتًا، ٥- مبنيًّا للمعلوم، ٦- قابلًا للتفاوت، ٧- ليس الوصف منه على أَفْعَل فَعْلَاء (كالألوان والعيوب). فإن فُقد الشرط (١) أو (٧) جيء بمصدره منصوبًا على التمييز بعد اسم تفضيل مساعد: أَشَدُّ حُمْرَةً، أَكْثَرُ اجْتِهَادًا. وإن كان منفيًّا أو مجهولًا استُعمل المصدر المؤول: أَحَقُّ أَلَّا يَتَأَخَّرَ. أما الجامد (عَسَى، نِعْمَ) وغير القابل للتفاوت (مَاتَ، فَنِيَ) فلا يُصاغ منهما تفضيل مطلقًا.',
      en: 'Direct أَفْعَلُ requires 7 conditions: triliteral, complete (not كان), fully conjugable, affirmative, active, gradable, and not denoting color/defect (أحمر حمراء). If augmented or color/defect, use أَشَدُّ/أَكْثَرُ + Masdar (أَكْثَرُ اجْتِهَادًا, أَشَدُّ زُرْقَةً). If negative/passive, use أَحَقُّ/أَجْدَرُ + أَنْ clause. Non-gradable/rigid verbs (مات، نعم) never form comparatives.',
      tl: 'Kailangan ng 7 kondisyon para sa direktang أَفْعَلُ. Kung kulay o pinalawak na porma, gumamit ng أَكْثَرُ/أَشَدُّ + Masdar.',
    },
    rules: [
      { ar: 'حالتا (خَيْر) و(شَرّ) و(حَبّ): أسماء تفضيل حُذفت همزتها لكثرة الاستعمال.', en: 'خَيْرٌ (better) and شَرٌّ (worse) are elatives whose initial Hamza dropped through high frequency.', tl: 'Ang خَيْرٌ at شَرٌّ ay mga pang-uring pahambing na nawalan ng Hamza.' },
      { ar: 'يلزم التفضيل الإفراد والتذكير إذا جُرِّد من أل والإضافة أو أُضيف لنكرة (هِنْدُ أَفْضَلُ مِنْ زَيْنَبَ / هِنْدُ أَفْضَلُ طَالِبَةٍ).', en: 'With مِنْ or indefinite Idafa, أَفْعَلُ stays masculine singular regardless of subject gender/number.', tl: 'Kapag may مِنْ o indefinite Idafa, nananatiling panlalaki at isahan ang أَفْعَلُ.' },
    ],
    classifications: [
      { titleAr: 'المجرد من أل والإضافة', titleEn: 'With مِنْ', titleTl: 'May مِنْ', description: { ar: 'يلزم الإفراد والتذكير.', en: 'Always masc. sing. + مِنْ.', tl: 'Laging panlalaki at isahan.' }, examples: ['الْعُلَمَاءُ أَفْضَلُ مِنْ غَيْرِهِمْ'] },
      { titleAr: 'المقترن بأل', titleEn: 'Definite with الـ', titleTl: 'May الـ', description: { ar: 'يطابق الموصوف ولا يأتي بعده (مِنْ).', en: 'Agrees in gender & number; no مِنْ.', tl: 'Sumasang-ayon sa kasarian at bilang.' }, examples: ['الْكُبْرَى', 'الْأَفْضَلُونَ', 'الْفُضْلَيَاتُ'] },
    ],
    patterns: [
      { pattern: 'أَفْعَلُ / فُعْلَى', example: 'أَعْلَى / عُلْيَا', meaning: { ar: 'تفضيل الناقص', en: 'Defective elative', tl: 'Naqis na pahambing' }, rule: { ar: 'تُقلب الياء/الواو ألفًا مقصورة', en: 'Final weak letter becomes ى', tl: 'Nagiging ى ang dulo' } },
    ],
    examples: [{ arabic: 'الْوَرْدُ أَشَدُّ حُمْرَةً مِنَ التُّفَّاحِ', transliteration: 'al-wardu ashaddu ḥumratan mina at-tuffāḥi', translation: { ar: 'التفضيل غير المباشر للون', en: 'The rose is redder than the apple', tl: 'Mas mapula ang rosas kaysa mansanas' }, analysis: { ar: 'لم نقل (أَحْمَرُ مِنْ) لأن حَمِرَ الوصف منه على أَفْعَل فَعْلَاء، فجئنا بـ(أَشَدُّ + حُمْرَةً تمييزًا).', en: 'Colors cannot take *أَحْمَرُ مِنْ; use أَشَدُّ + Tamyiz Masdar.', tl: 'Hindi ginagamit ang *أَحْمَرُ مِنْ para sa kulay; gamitin ang أَشَدُّ + حُمْرَةً.' } }],
    exceptions: [{ ar: 'تُسند (أَفْعَل) أحيانًا في الشعر للمبني للمجهول شذوذًا ولا يُقاس عليه.', en: 'Rare poetic exceptions exist for passive bases, not to be imitated.', tl: 'Iwasan ang paggawa ng direktang أَفْعَل mula sa passive.' }],
    commonMistakes: [{ ar: 'قول (*هَذَا أَشْيَعُ) أو (*أَسْوَدُ مِنْ)؛ الصواب أَكْثَرُ شُيُوعًا وأَشَدُّ سَوَادًا.', en: 'Saying *أَسْوَدُ مِنْ for blacker; use أَشَدُّ سَوَادًا.', tl: 'Pagsasabi ng *أَسْوَدُ مِنْ sa halip na أَشَدُّ سَوَادًا.' }],
    comparison: { ar: 'أَفْعَلُ التفضيل ممنوع من الصرف للوصفية ووزن الفعل (أَفْضَلُ)، فلا يُنوَّن.', en: 'Ism al-Tafdil is a diptote (الممنوع من الصرف) and never takes Tanwin.', tl: 'Ang Ism al-Tafdil ay diptote at hindi tumatanggap ng Tanwin.' },
    practicalExercises: [{ id: 'ex-s19-1', prompt: { ar: 'فضّل بين جملتين من الفعل (اِجْتَهَدَ).', en: 'Form a comparative sentence using the Form VIII verb اِجْتَهَدَ.', tl: 'Gumawa ng paghahambing gamit ang اِجْتَهَدَ.' }, arabicPrompt: 'اِجْتَهَدَ', answer: 'زَيْدٌ أَكْثَرُ اجْتِهَادًا مِنْ عَمْرٍو', explanation: { ar: 'اِجْتَهَدَ خماسي غير ثلاثي فيُتوصل إليه بمصدره بعد أَكْثَرُ.', en: 'Form VIII is non-triliteral, requiring أَكْثَرُ + Masdar.', tl: 'Gumamit ng أَكْثَرُ + Masdar.' } }],
    summary: { ar: 'اسم التفضيل يجمع بين الدقة الصرفية (الشروط السبعة) والمطابقة النحوية (أحواله الأربع).', en: 'Ism al-Tafdil unites the 7 derivational rules with its 4 agreement states.', tl: 'Pinagsasama ng Ism al-Tafdil ang 7 kondisyon at ang mga tuntunin ng pagsang-ayon.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(20, 'sarf-20', 'intermediate', 'اسما الزمان والمكان واسم الآلة', 'Nouns of Time, Place & Instrument', 'Mga Pangngalan ng Panahon, Lugar at Kasangkapan', {
    objectives: [
      { ar: 'التمييز بين مَفْعَل (بفتح العين) ومَفْعِل (بكسر العين) في الزمان والمكان.', en: 'Distinguish مَفْعَل vs مَفْعِل for Time and Place nouns.', tl: 'Mapagkaiba ang مَفْعَل at مَفْعِل para sa Panahon at Lugar.' },
      { ar: 'حفظ أوزان اسم الآلة القياسية والحديثة.', en: 'Master classical and modern Ism al-Alah patterns.', tl: 'Maisaulo ang mga pattern ng Ism al-Alah.' },
    ],
    introduction: {
      ar: 'يُصاغ اسما الزمان والمكان للدلالة على زمن الفعل أو مكانه بصيغة واحدة يُفرَّق بينهما بالسياق، ويُصاغ اسم الآلة للدلالة على الأداة التي يقع بها الفعل.',
      en: 'Nouns of Time and Place share a single template distinguished by context; Nouns of Instrument name the tool used to perform an action.',
      tl: 'Pareho ang hulwaran ng Pangngalan ng Panahon at Lugar; ang Ism al-Alah ay para sa kasangkapan.',
    },
    definition: { arabicTerm: 'الزمان والمكان والآلة', text: { ar: 'اسما الزمان والمكان صيغتان لزمان وقوع الفعل أو مكانه (مَفْعَل / مَفْعِل)، واسم الآلة صيغة للأداة (مِفْعَل / مِفْعَال / مِفْعَلَة).', en: 'Ism Zaman/Makan (مَفْعَل / مَفْعِل) marks time or location; Ism al-Alah (مِفْعَل / مِفْعَال / مِفْعَلَة) marks an instrument.', tl: 'Ang Ism Zaman/Makan ay panahon/lugar; ang Ism al-Alah ay kasangkapan.' } },
    explanation: {
      ar: 'يُصاغ الزمان والمكان على مَفْعِل (بكسر العين) في موضعين: ١- الثلاثي الصحيح مكسور العين في المضارع (مَجْلِس، مَنْزِل)، ٢- المثال الواوي الصحيح اللام (مَوْعِد، مَوْضِع). ويُصاغ على مَفْعَل (بفتح العين) في باقي الثلاثي: مفتوح أو مضموم العين في المضارع (مَلْعَب، مَكْتَب، مَدْخَل) والناقص (مَأْوَى، مَرْمَى). ومن غير الثلاثي على وزن اسم المفعول (مُلْتَقًى، مُسْتَشْفًى). وتُزاد تاء في بعض أسماء المكان للدلالة على الكثرة (مَدْرَسَة، مَكْتَبَة). أما اسم الآلة القياسي: مِفْعَل (مِبْرَد)، مِفْعَال (مِفْتَاح)، مِفْعَلَة (مِكْنَسَة)، وأضاف المجمع اللغوي: فَعَّالَة (ثَلَّاجَة، غَسَّالَة)، فَاعِلَة (طَابِعَة)، فَعَّال (خَلَّاط).',
      en: 'Zaman/Makan takes مَفْعِل when Form I Mudhari has Kasra (مَجْلِس) or verb is Mithal Wawi (مَوْعِد); it takes مَفْعَل when Mudhari has Fatha/Damma (مَكْتَب, مَلْعَب) or verb is Naqis (مَسْعًى). Augmented forms match Ism Maf\'ul (مُسْتَشْفًى, مُلْتَقًى). Ism al-Alah classic patterns: مِفْعَل (مِقَصّ), مِفْعَال (مِفْتَاح), مِفْعَلَة (مِسْطَرَة), plus modern academy patterns فَعَّالَة (غَسَّالَة), فَاعِلَة (طَابِعَة).',
      tl: 'Zaman/Makan: مَفْعِل kung Kasra sa Mudhari o Mithal Wawi (مَجْلِس, مَوْعِد); مَفْعَل kung hindi (مَكْتَب). Ism al-Alah: مِفْعَل, مِفْعَال, مِفْعَلَة, at makabagong فَعَّالَة.',
    },
    rules: [
      { ar: 'تأتي (مَفْعَلَة) أحيانًا اسم مكان دالًّا على كثرة الشيء كـ(مَأْسَدَة، مَسْبَعَة).', en: 'Pattern مَفْعَلَة can denote a place abounding in something (مَكْتَبَة library).', tl: 'Ang مَفْعَلَة ay maaaring lugar na sagana sa isang bagay (مَكْتَبَة).' },
    ],
    classifications: [
      { titleAr: 'الزمان والمكان', titleEn: 'Time & Place', titleTl: 'Panahon at Lugar', description: { ar: 'مَفْعَل ومَفْعِل ومُفْعَل.', en: 'مَفْعَل, مَفْعِل, and augmented مُـ.', tl: 'مَفْعَل, مَفْعِل, at مُـ.' }, examples: ['مَطْبَخ', 'مَوْقِف', 'مُسْتَخْرَج'] },
      { titleAr: 'اسم الآلة', titleEn: 'Instrument', titleTl: 'Kasangkapan', description: { ar: 'المشتق القياسي والسماعي الجامد.', en: 'Derived patterns vs primitive tools (قَلَم, فَأْس).', tl: 'Hinangong pattern vs payak na gamit (قَلَم).' }, examples: ['مِفْتَاح', 'مِبْرَد', 'مِسْطَرَة', 'حَاسُوب'] },
    ],
    patterns: [
      { pattern: 'مِفْعَال', example: 'مِفْتَاح / مِنْشَار', meaning: { ar: 'اسم آلة', en: 'Key / Saw', tl: 'Susi / Lagari' }, rule: { ar: 'بكسر الميم الأولى دائمًا في الآلة تمييزًا عن مَفْعَال', en: 'Initial Kasra distinguishes Alah from Zaman/Makan', tl: 'Kasra sa مِـ para sa kasangkapan' } },
    ],
    examples: [{ arabic: 'اِلْتَقَى الطُّلَّابُ فِي الْمَلْعَبِ عِنْدَ الْمَغْرِبِ', transliteration: 'iltaqā aṭ-ṭullābu fī al-mal\'abi \'inda al-maghribi', translation: { ar: 'المكان والزمان', en: 'The students met at the playground at sunset', tl: 'Nagkita ang mga mag-aaral sa palaruan sa paglubog ng araw' }, analysis: { ar: 'الْمَلْعَب مكان (لَعِبَ يَلْعَبُ)، والْمَغْرِب شذ بالكسر رغم أن مضارعه يَغْرُبُ!', en: 'مَلْعَب is regular مَفْعَل; مَغْرِب is a classical exception taking Kasra!', tl: 'Regular ang مَلْعَب; eksepsiyon ang مَغْرِب.' } }],
    exceptions: [{ ar: 'وردت كلمات مسموعة بالكسر وقياسها الفتح مثل: مَسْجِد، مَشْرِق، مَغْرِب، مَسْكِن، مَطْلِع، مَنْبِت.', en: 'Classical Sama\'i exceptions taking مَفْعِل instead of expected مَفْعَل: مَسْجِد، مَشْرِق، مَغْرِب، مَطْلِع.', tl: 'Mga eksepsiyon na gumagamit ng مَفْعِل: مَسْجِد، مَشْرِق، مَغْرِب.' }],
    commonMistakes: [{ ar: 'فتح ميم اسم الآلة؛ والصواب كسر الميم دائمًا في أوزان مِفْعَل ومِفْعَال ومِفْعَلَة.', en: 'Pronouncing Fatha instead of Kasra on مِـ of Ism al-Alah (e.g. مِقَصّ, مِفْتَاح).', tl: 'Paggamit ng Fatha sa halip na Kasra sa مِـ ng Ism al-Alah.' }],
    comparison: { ar: 'ميم اسم الزمان والمكان الثلاثي مفتوحة (مَكْتَب)، وميم اسم الآلة مكسورة (مِفْتَاح)، وميم غير الثلاثي مضمومة (مُسْتَشْفًى).', en: 'Initial مـ vowel: Fatha (مَـ) for Form I place/time, Kasra (مِـ) for instrument, Damma (مُـ) for augmented place/time.', tl: 'Patinig ng م: Fatha (مَـ) sa lugar/panahon, Kasra (مِـ) sa kasangkapan, Damma (مُـ) sa pinalawak.' },
    practicalExercises: [{ id: 'ex-s20-1', prompt: { ar: 'صغ اسم المكان من (وَقَفَ يَقِفُ) و(سَعَى يَسْعَى).', en: 'Form Ism Makan from وَقَفَ يَقِفُ and سَعَى يَسْعَى.', tl: 'Buuin ang Ism Makan ng وَقَفَ at سَعَى.' }, arabicPrompt: 'وَقَفَ / سَعَى', answer: 'مَوْقِفٌ — مَسْعًى', explanation: { ar: 'مَوْقِف مثال واوي فجاء على مَفْعِل، ومَسْعًى ناقص فجاء على مَفْعَل.', en: 'Mithal Wawi uses مَفْعِل (مَوْقِف); Naqis uses مَفْعَل (مَسْعًى).', tl: 'مَوْقِف (Mithal Wawi) at مَسْعًى (Naqis).' } }],
    summary: { ar: 'مَفْعَل ومَفْعِل ومُفْعَل تغطي الزمان والمكان، ومِفْعَل ومِفْعَال ومِفْعَلَة تغطي الآلة.', en: 'Three vowels on مـ organize Time, Place, and Instrument nouns systematically.', tl: 'Ang tatlong patinig sa م ay nag-aayos ng mga pangngalan ng panahon, lugar, at kasangkapan.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA, qiyasiVsSamaai: 'قياسي وسماعي' },
  }),

  makeSarfChapter(21, 'sarf-21', 'intermediate', 'الاسم المقصور والمنقوص والممدود', 'Shortened (Maqsur), Defective (Manqus) & Extended (Mamdud) Nouns', 'Ism Maqsur, Manqus at Mamdud', {
    objectives: [
      { ar: 'التعريف بالمقصور والمنقوص والممدود وإعراب كلٍّ منها.', en: 'Define Maqsur, Manqus, and Mamdud nouns and their I\'rab.', tl: 'Maunawaan ang Maqsur, Manqus, at Mamdud at ang kanilang I\'rab.' },
      { ar: 'تثنيتها وجمعها جمعًا سالمًا دون خطأ.', en: 'Form duals and sound plurals of all three noun types accurately.', tl: 'Mabuo nang tama ang dual at plural ng tatlong uri ng pangngalan.' },
    ],
    introduction: {
      ar: 'كما تنقسم الأفعال إلى صحيحة ومعتلة، تنقسم الأسماء المعربة المختومة بألف أو ياء أو همزة ممدودة إلى مقصور ومنقوص وممدود، ولكلٍّ أحكامه في الإعراب والتثنية والجمع.',
      en: 'Declinable nouns ending in Alif (Maqsur), Ya (Manqus), or Alif+Hamza (Mamdud) follow specialized inflection, dual, and plural rules.',
      tl: 'Ang mga pangngalang nagtatapos sa Alif (Maqsur), Ya (Manqus), o Alif+Hamza (Mamdud) ay may mga natatanging tuntunin.',
    },
    definition: { arabicTerm: 'المقصور والمنقوص والممدود', text: { ar: 'المقصور اسم معرب آخره ألف لازمة (فَتًى، مُصْطَفًى)، والمنقوص آخره ياء لازمة مكسور ما قبلها (قَاضٍ، دَاعٍ)، والممدود آخره همزة قبلها ألف زائدة (صَحْرَاء، بِناء).', en: 'Maqsur ends in fixed Alif (عَصَا, مُسْتَشْفَى); Manqus ends in fixed Ya after Kasra (الْقَاضِي); Mamdud ends in Hamza after augmented Alif (سَمَاء, صَحْرَاء).', tl: 'Maqsur: nagtatapos sa Alif; Manqus: nagtatapos sa Ya; Mamdud: nagtatapos sa اء.' } },
    explanation: {
      ar: '١- المقصور: تُقدَّر عليه الحركات الثلاث للتعذر (جَاءَ الْفَتَى، رَأَيْتُ الْفَتَى). عند التثنية: إن كانت الألف ثالثةً رُدّت لأصلها (عَصَوَانِ، فَتَيَانِ)، وإن كانت رابعةً فأكثر قُلبت ياءً (مُسْتَشْفَيَانِ). وفي جمع المذكر السالم تُحذف الألف ويُفتح ما قبل الواو والياء (الْمُصْطَفَوْنَ، الْمُصْطَفَيْنَ). ٢- المنقوص: تُقدَّر الضمة والكسرة للثقل وتظهر الفتحة (رَأَيْتُ قَاضِيًا)، وتُحذف ياؤه إن تجرد رفعًا وجرًّا (قَاضٍ). وفي جمع المذكر تُحذف الياء (الْقَاضُونَ، الْقَاضِينَ). ٣- الممدود: همزته إما أصلية تبقى (قُرَّاء ← قُرَّاءَانِ)، أو للتأنيث فتُقلب واوًا (صَحْرَاء ← صَحْرَاوَانِ)، أو منقلبة عن أصل فيجوز الوجهان (سَمَاء ← سَمَاءَانِ / سَمَاوَانِ).',
      en: '1. Maqsur: all 3 I\'rab cases are implicit (تعذر). Dual: 3rd Alif reverts to و/ي (عَصَوَانِ, فَتَيَانِ); 4th+ becomes ي (مُصْطَفَيَانِ). Sound masc. plural drops Alif and keeps Fatha (مُصْطَفَوْنَ). 2. Manqus: implicit Raf\'/Jarr (ثقل), explicit Nasb (قَاضِيًا); drops Ya when indefinite in Raf\'/Jarr (قَاضٍ). 3. Mamdud: original Hamza stays (اِبْتِدَاءَانِ); feminine Hamza turns to Waw (صَحْرَاوَانِ); root-converted Hamza allows both (سَمَاءَانِ / سَمَاوَانِ).',
      tl: '1. Maqsur: nakatago ang lahat ng kaso; tinatanggal ang Alif sa plural (مُصْطَفَوْنَ). 2. Manqus: nakikita ang Fatha (قَاضِيًا). 3. Mamdud: nagiging Waw ang pangbabaeng Hamza (صَحْرَاوَانِ).',
    },
    rules: [
      { ar: 'الاسم المبني مثل (مَتَى، هَذَا، الَّذِي) لا يُسمى مقصورًا ولا منقوصًا لأن الشرط الإعراب.', en: 'Indeclinable words (مَتَى, الَّذِي) are excluded because Maqsur/Manqus apply only to declinable nouns.', tl: 'Hindi kabilang ang mga salitang Mabni tulad ng مَتَى o الَّذِي.' },
    ],
    classifications: [
      { titleAr: 'أنواع همزة الممدود الثلاثة', titleEn: 'Three Mamdud Hamza Types', titleTl: 'Tatlong Uri ng Hamza sa Mamdud', description: { ar: 'أصلية، منقلبة عن أصل، زائدة للتأنيث.', en: 'Original, converted (و/ي), or feminine augment.', tl: 'Orihinal, nagbago, o pambabae.' }, examples: ['إِنْشَاء (أصلية)', 'بِنَاء (منقلبة)', 'حَمْرَاء (للتأنيث)'] },
    ],
    patterns: [
      { pattern: 'أَعْلَى → أَعْلَوْنَ', example: 'الْأَعْلَوْنَ', meaning: { ar: 'جمع المقصور مذكرًا سالمًا', en: 'Sound plural of Maqsur', tl: 'Plural ng Maqsur' }, rule: { ar: 'حذف الألف وإبقاء الفتحة قبل الواو والنون', en: 'Drop Alif, retain Fatha before ونَ/ينَ', tl: 'Tanggalin ang Alif, panatilihin ang Fatha' } },
    ],
    examples: [{ arabic: 'لَا تَحْسَبَنَّ الْمُصْطَفَيْنَ مُتَسَاوِينَ فِي الشَّقْرَاوَاتِ', transliteration: 'lā taḥsabanna al-muṣṭafayna mutasāwīna', translation: { ar: 'تطبيق جمع المقصور والمنقوص والممدود', en: 'Do not think the chosen ones equal', tl: 'Huwag isiping magkakapantay ang mga pinili' }, analysis: { ar: 'المصطفين بحذف الألف وبقاء الفتح، والصحراوات بقلب همزة التأنيث واوًا.', en: 'Al-Mustafayna preserves Fatha before ي; Sahrawat turns feminine Hamza to Waw.', tl: 'Nananatili ang Fatha sa المصطفين; nagiging Waw sa صحراوات.' } }],
    exceptions: [{ ar: 'كلمة (فِي) و(عَلَى) و(إِلَى) حروف لا تدخل في المقصور والمنقوص.', en: 'Particles ending in ى/ي are never classified as Maqsur/Manqus.', tl: 'Ang mga kataga (فِي، إِلَى) ay hindi kabilang sa Maqsur/Manqus.' }],
    commonMistakes: [{ ar: 'كتابة مثنى صحراء (*صحراءان) والصواب وجوب قلب همزة التأنيث واوًا (صَحْرَاوَانِ).', en: 'Keeping feminine Hamza in duals (*صَحْرَاءَانِ); it must become Waw: صَحْرَاوَانِ.', tl: 'Pagsulat ng *صَحْرَاءَانِ sa halip na صَحْرَاوَانِ.' }],
    comparison: { ar: 'المقصور تُقدَّر عليه الحركات الثلاث للتعذر، والمنقوص تُقدَّر الضمة والكسرة للثقل وتظهر الفتحة.', en: 'Maqsur hides all 3 cases (Ta\'adhdhur); Manqus hides Damma/Kasra (Thiqal) but shows Fatha.', tl: 'Nakatago ang 3 kaso sa Maqsur; nakikita ang Fatha sa Manqus.' },
    practicalExercises: [{ id: 'ex-s21-1', prompt: { ar: 'ثنِّ الكلمات الآتية: (عَصَا، مُهْتَدٍ، خَضْرَاء).', en: 'Make duals of: عَصَا, مُهْتَدٍ, خَضْرَاء.', tl: 'Gawing dual ang: عَصَا, مُهْتَدٍ, خَضْرَاء.' }, arabicPrompt: 'عَصَا / مُهْتَدٍ / خَضْرَاء', answer: 'عَصَوَانِ — مُهْتَدِيَانِ — خَضْرَاوَانِ', explanation: { ar: 'عَصَا ثالثة أصلها واو، ومهتدٍ تُرد الياء، وخضراء للتأنيث فتُقلب واوًا.', en: 'عَصَا (Waw origin) → عَصَوَانِ; مُهْتَدٍ restores Ya; خَضْرَاء (feminine) → Waw.', tl: 'عَصَوَانِ, مُهْتَدِيَانِ, خَضْرَاوَانِ.' } }],
    summary: { ar: 'المقصور والمنقوص والممدود ركيزة الإعراب التقديري والتثنية والجمع السالم.', en: 'Maqsur, Manqus, and Mamdud govern implicit I\'rab and dual/plural inflection.', tl: 'Ang Maqsur, Manqus, at Mamdud ay mahalaga sa I\'rab at pagbuo ng dual/plural.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(22, 'sarf-22', 'intermediate', 'المثنى والجمع السالم وجمع التكسير', 'Dual, Sound Plurals & Categorized Broken Plurals', 'Dual (Muthanna), Sound Plurals at Broken Plurals (Jam\' al-Taksir)', {
    objectives: [
      { ar: 'معرفة شروط التثنية والجمع السالم والملحق بهما.', en: 'Master dual and sound plural rules plus Mulhaq words.', tl: 'Matutunan ang mga tuntunin ng dual, sound plural, at mga Mulhaq.' },
      { ar: 'تصنيف جموع التكسير إلى جموع قلة (٤) وجموع كثرة.', en: 'Categorize Jam\' al-Taksir into Plurals of Paucity (3–10) and Abundance.', tl: 'Mauri ang Jam\' al-Taksir sa Jam\' Qillah at Jam\' Kathrah.' },
    ],
    introduction: {
      ar: 'يدل الاسم العربي على الإفراد أو التثنية أو الجمع (مذكر سالم، مؤنث سالم، أو جمع تكسير تتغير فيه بنية المفرد).',
      en: 'Arabic number distinguishes Singular, Dual, Sound Masculine/Feminine Plurals, and Broken Plurals (which reshape the singular stem).',
      tl: 'Ang bilang sa Arabe ay Isahan, Dalawahan (Muthanna), at Maramihan (Sound at Broken Plurals).',
    },
    definition: { arabicTerm: 'التثنية والجموع', text: { ar: 'المثنى ما دل على اثنين بزيادة ألف ونون أو ياء ونون، والسالم ما سلم فيه بناء المفرد، والتكسير ما تغير فيه بناء المفرد.', en: 'Dual adds انِ/يْنِ; Sound plurals add ونَ/ينَ or اتٌ/اتٍ without altering the stem; Broken plurals reshape the stem.', tl: 'Ang Dual ay nagdaragdag ng انِ/يْنِ; ang Sound plural ay ونَ/ينَ o ات; ang Broken plural ay nagbabago ng ugat na anyo.' } },
    explanation: {
      ar: 'أوزان جمع القلة أربعة قياسية أو سماعية (يدل على ٣–١٠): أَفْعُل (أَنْفُس)، أَفْعَال (أَقْلَام)، أَفْعِلَة (أَطْعِمَة)، فِعْلَة (فِتْيَة). وأوزان جمع الكثرة كثيرة أشهرها: فُعُل (كُتُب)، فِعَل (دُوَل)، فُعَل (غُرَف)، فَعَلَة (كَتَبَة)، فُعْلَان (شُجْعَان)، فُعَلَاء (عُلَمَاء)، أَفْعِلَاء (أَغْنِيَاء)، فَوَاعِل (شَوَارِع)، مَفَاعِل (مَسَاجِد)، مَفَاعِيل (مَفَاتِيح). وتُجمع الصفة المؤنثة والمصادر الرباعية والخماسية جمع مؤنث سالمًا قياسًا.',
      en: 'Plurals of Paucity (Jam\' Qillah, 3–10) have 4 patterns: أَفْعُل, أَفْعَال, أَفْعِلَة, فِعْلَة. Plurals of Abundance (Kathrah, 11+ / general) include فُعُل (كُتُب), فُعَلَاء (عُلَمَاء), أَفْعِلَاء (أَصْدِقَاء), فَوَاعِل (قَوَاعِد), and Muntaha al-Jumu\' (مَسَاجِد, مَفَاتِيح — which are diptotes!). Broken plurals are largely Sama\'i in Form I nouns, while Muntaha al-Jumu\' follows Qiyasi rules for 4+ letter nouns.',
      tl: 'Ang Jam\' Qillah (3–10) ay may 4 na pattern: أَفْعُل, أَفْعَال, أَفْعِلَة, فِعْلَة. Ang Jam\' Kathrah ay kinabibilangan ng كُتُب, عُلَمَاء, مَسَاجِد, at مَفَاتِيح.',
    },
    rules: [
      { ar: 'صيغة منتهى الجموع (كل جمع تكسير بعد ألف تكسيره حرفان أو ثلاثة أوسطها ساكن مثل مَسَاجِد ومَصَابِيح) ممنوعة من الصرف قياسًا.', en: 'Muntaha al-Jumu\' (2 letters or 3 with middle ي after plural Alif: مَسَاجِد, مَفَاتِيح) is always a diptote.', tl: 'Ang Muntaha al-Jumu\' ay palaging diptote (walang Tanwin).' },
      { ar: 'تُحذف نون المثنى وجمع المذكر السالم عند الإضافة (كِتَابَا الطَّالِبِ، مُعَلِّمُو الْمَدْرَسَةِ).', en: 'Dual & Sound Masculine Plural drop final ن when Mudaf.', tl: 'Tinatanggal ang ن ng Dual at Sound Masculine Plural kapag Mudaf.' },
    ],
    classifications: [
      { titleAr: 'جموع القلة (٤)', titleEn: 'Plurals of Paucity', titleTl: 'Jam\' Qillah', description: { ar: 'تُستعمل غالبًا للعدد من ٣ إلى ١٠.', en: 'Four classic paucity patterns.', tl: 'Apat na pattern ng Qillah.' }, examples: ['أَنْفُس (أَفْعُل)', 'أَعْمَال (أَفْعَال)', 'أَسْئِلَة (أَفْعِلَة)', 'إِخْوَة (فِعْلَة)'] },
      { titleAr: 'صيغة منتهى الجموع', titleEn: 'Ultimate Broken Plurals', titleTl: 'Muntaha al-Jumu\'', description: { ar: 'مَفَاعِل، مَفَاعِيل، فَوَاعِل، فَعَائِل.', en: 'Quad/augmented broken plural patterns (Qiyasi).', tl: 'Regular na mga broken plural.' }, examples: ['مَدَارِس', 'تَعَالِيم', 'قَوَاعِد', 'رَسَائِل'] },
    ],
    patterns: [
      { pattern: 'فُعَلَاء / أَفْعِلَاء', example: 'عُلَمَاء / أَذْكِيَاء', meaning: { ar: 'جمع فَعِيل وصفًا للعاقل', en: 'Broken plural of rational فَعِيل', tl: 'Plural ng فَعِيل' }, rule: { ar: 'فَعِيل الصحيح على فُعَلَاء والمعتل/المضعف على أَفْعِلَاء', en: 'Sound فَعِيل → فُعَلَاء; Weak/geminate → أَفْعِلَاء', tl: 'Sahih → فُعَلَاء; Mahina → أَفْعِلَاء' } },
    ],
    examples: [{ arabic: 'حَضَرَ مُعَلِّمُو الْمَدْرَسَةِ إِلَى مَسَاجِدِ الْمَدِينَةِ', transliteration: 'ḥaḍara mu\'allimū al-madrasati ilā masājidi al-madīnati', translation: { ar: 'حذف النون للإضافة وصيغة منتهى الجموع', en: 'The school’s teachers attended the city’s mosques', tl: 'Pumunta ang mga guro ng paaralan sa mga mosque ng lungsod' }, analysis: { ar: 'مُعَلِّمُو حُذفت نونه للإضافة، ومَسَاجِدِ جُر بالكسرة لأنه أُضيف!', en: 'مُعَلِّمُو drops Nun as Mudaf; مَسَاجِدِ takes Kasra only because it is Mudaf here!', tl: 'Tinanggal ang ن sa مُعَلِّمُو; tumanggap ng Kasra ang مَسَاجِدِ dahil Mudaf ito.' } }],
    exceptions: [{ ar: 'من الملحق بجمع المذكر السالم: أُولُو، عَالَمُونَ، بَنُونَ، سِنُونَ، وألفاظ العقود (عِشْرُونَ إلى تِسْعُونَ).', en: 'Mulhaq (treated like Sound Masc. Plural): أُولُو, عَالَمُونَ, بَنُونَ, سِنُونَ, and decades 20–90.', tl: 'Mulhaq sa Sound Masculine Plural: عِشْرُونَ–تِسْعُونَ, بَنُونَ, سِنُونَ.' }],
    commonMistakes: [{ ar: 'جمع الصفة المؤنثة أو المؤنث المعنوي جمع مذكر سالمًا، أو إبقاء النون عند الإضافة (*مُعَلِّمُونَ الْمَدْرَسَةِ).', en: 'Retaining Nun before Mudaf Ilayh (*مُعَلِّمُونَ الْمَدْرَسَةِ).', tl: 'Pagpapanatili ng Nun bago ang Mudaf Ilayh.' }],
    comparison: { ar: 'أوزان جمع التكسير الثلاثية يغلب عليها السماع، بينما صيغة منتهى الجموع وجمع المؤنث السالم في غير الثلاثي قياسيان.', en: 'Short broken plurals are mostly Sama\'i; Muntaha al-Jumu\' and augmented feminine sound plurals are Qiyasi.', tl: 'Sama\'i ang maiikling broken plural; Qiyasi ang Muntaha al-Jumu\'.' },
    practicalExercises: [{ id: 'ex-s22-1', prompt: { ar: 'اجمع الكلمات: (مِفْتَاح، شَاعِر، دَفْتَر) جمع تكسير.', en: 'Give the broken plural of: مِفْتَاح, شَاعِر, دَفْتَر.', tl: 'Ibigay ang broken plural ng: مِفْتَاح, شَاعِر, دَفْتَر.' }, arabicPrompt: 'مِفْتَاح / شَاعِر / دَفْتَر', answer: 'مَفَاتِيح — شُعَرَاء — دَفَاتِر', explanation: { ar: 'مَفَاعِيل، فُعَلَاء، فَعَالِل.', en: 'Qiyasi Muntaha al-Jumu\' and rational plural patterns.', tl: 'Mga pattern ng broken plural.' } }],
    summary: { ar: 'تمييز السالم والتكسير والقلة والكثرة يضبط الجمع والإعراب بالحروف والحركات.', en: 'Understanding Dual, Sound, and Broken plural categories ensures accurate morphology and case marking.', tl: 'Ang pag-unawa sa Dual, Sound, at Broken plural ay nagsisiguro ng tamang kaso at anyo.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA, qiyasiVsSamaai: 'قياسي وسماعي' },
  }),

  makeSarfChapter(23, 'sarf-23', 'advanced', 'التصغير والنسبة والتذكير والتأنيث والممنوع من الصرف', 'Diminutive (Tasghir), Nisbah, Gender & Diptotes', 'Tasghir, Nisbah, Kasarian at Mamnu\' min al-Sarf', {
    objectives: [
      { ar: 'تطبيق أوزان التصغير الثلاثة (فُعَيْل، فُعَيْعِل، فُعَيْعِيل) وقواعد النسبة.', en: 'Apply the 3 Tasghir patterns and Nisbah suffix rules (-يّ).', tl: 'Maisagawa ang 3 pattern ng Tasghir at ang Nisbah (-يّ).' },
      { ar: 'حصر علل المنع من الصرف (علة واحدة وعلتان) وعلامات التأنيث.', en: 'Master feminine markers and all Diptote (Mamnu\' min al-Sarf) conditions.', tl: 'Maisaulo ang mga palatandaan ng pambabae at mga tuntunin ng Diptote.' },
    ],
    introduction: {
      ar: 'يضم هذا الفصل أربعة أبواب مهمة في صرف الأسماء: التصغير لتقليل الحجم أو التحبب، والنسبة لإلحاق ياء مشددة، والتأنيث وعلاماته، والممنوع من الصرف الذي لا يُنوَّن ويُجر بالفتحة.',
      en: 'This chapter covers four major nominal systems: Diminutive (Tasghir), Relational Adjectives (Nisbah), Grammatical Gender, and Diptotes (nouns barred from Tanwin and Kasra).',
      tl: 'Sinasaklaw nito ang Tasghir (pagpapaliit), Nisbah (-يّ), Kasarian, at Diptotes (walang Tanwin).',
    },
    definition: { arabicTerm: 'التصغير والنسبة والمنع من الصرف', text: { ar: 'التصغير تغيير بنية الاسم بضم أوله وفتح ثانيه وزيادة ياء ساكنة ثالثة، والنسبة إلحاق ياء مشددة مكسور ما قبلها، والممنوع من الصرف اسم معرب لا يقبل التنوين ويُجر بالفتحة نيابة عن الكسرة.', en: 'Tasghir inserts a 3rd silent ي (فُعَيْل); Nisbah suffixes ـيّ; Diptotes forbid Tanwin and take Fatha for Jarr.', tl: 'Tasghir: pagpapaliit ng salita; Nisbah: pagdagdag ng ـيّ; Diptote: walang Tanwin at Fatha sa Jarr.' } },
    explanation: {
      ar: '١- التصغير: للثلاثي فُعَيْل (قُلَيْم)، للرباعي فُعَيْعِل (دُرَيْهِم)، وللخماسي رابعه مد فُعَيْعِيل (عُصَيْفِير). ٢- النسبة: تُكسر ما قبل الياء المشددة وتُحذف تاء التأنيث (مَكَّة ← مَكِّيّ) وتُرد ألف المقصور الثالثة واوًا (فَتًى ← فَتَوِيّ) وتُحذف الرابعة (مَعْنًى ← مَعْنِيّ) وتُقلب همزة التأنيث واوًا (صَحْرَاء ← صَحْرَاوِيّ). ٣- علامات التأنيث: التاء المربوطة، وألف التأنيث المقصورة (سَلْمَى)، وألف التأنيث الممدودة (حَمْرَاء). ٤- الممنوع من الصرف: لعلة واحدة (ألف التأنيث المقصورة أو الممدودة، وصيغة منتهى الجموع)، أو لعلتين (العلمية + التأنيث/العجمة/التركيب/زيادة الألف والنون/وزن الفعل/العدل، أو الوصفية + زيادة الألف والنون/وزن الفعل/العدل). ويُجر بالكسرة إذا اقترن بأل أو أُضيف.',
      en: '1. Tasghir: فُعَيْل (3-letter: كُتَيِّب), فُعَيْعِل (4-letter: مُسَيْجِد), فُعَيْعِيل (5-letter with long 4th: عُصَيْفِير). 2. Nisbah: drop ة (مَكِّيّ), convert feminine ء to و (صَحْرَاوِيّ), keep/convert Alif according to position. 3. Feminine markers: ة, ى (سَلْمَى), اء (حَسْنَاء). 4. Diptotes take Fatha in Jarr UNLESS preceded by الـ or serving as Mudaf.',
      tl: '1. Tasghir: فُعَيْل, فُعَيْعِل, فُعَيْعِيل. 2. Nisbah: tanggalin ang ة (مَكِّيّ). 3. Diptote: Fatha sa Jarr maliban kung may الـ o kung ito ay Mudaf.',
    },
    rules: [
      { ar: 'شرط جرّ الممنوع من الصرف بالفتحة: ألا يكون مضافًا ولا مقترنًا بـ(أل).', en: 'Diptotes take Kasra in Jarr as soon as they take الـ or become Mudaf.', tl: 'Tumatanggap ng Kasra ang Diptote kapag may الـ o kapag Mudaf.' },
    ],
    classifications: [
      { titleAr: 'الممنوع من الصرف لعلة واحدة', titleEn: 'Single-Cause Diptotes', titleTl: 'Isang Dahilan ng Diptote', description: { ar: 'تقوم مقام علتين.', en: 'Feminine ى/اء or Muntaha al-Jumu\'.', tl: 'Pambabaeng ى/اء o Muntaha al-Jumu\'.' }, examples: ['سَلْمَى', 'صَحْرَاء', 'مَسَاجِد', 'مَفَاتِيح'] },
      { titleAr: 'الممنوع من الصرف لعلتين', titleEn: 'Dual-Cause Diptotes', titleTl: 'Dalawang Dahilan ng Diptote', description: { ar: 'العلمية أو الوصفية مع علة فرعية.', en: 'Proper noun or Adjective + secondary cause.', tl: 'Pangngalang pantangi o pang-uri + pangalawang dahilan.' }, examples: ['فَاطِمَة', 'إِبْرَاهِيم', 'أَحْمَد', 'عُثْمَان', 'عَطْشَان', 'أَفْضَل'] },
    ],
    patterns: [
      { pattern: 'فُعَيْل / فُعَيْعِل', example: 'كُتَيِّب / جُدَيْوِل', meaning: { ar: 'التصغير', en: 'Little book / little schedule', tl: 'Maliit na aklat' }, rule: { ar: 'ضم الأول وفتح الثاني وزيادة ياء ساكنة ثالثة', en: 'Damma-Fatha + silent Ya in 3rd slot', tl: 'Damma-Fatha + Ya sa 3rd slot' } },
    ],
    examples: [{ arabic: 'صَلَّيْتُ فِي مَسَاجِدَ كَثِيرَةٍ وَفِي الْمَسَاجِدِ الْكَبِيرَةِ', transliteration: 'ṣallaytu fī masājida kathīratin wa fī al-masājidi al-kabīrati', translation: { ar: 'إعراب الممنوع من الصرف نكرةً ومعرفةً', en: 'I prayed in many mosques and in the large mosques', tl: 'Nagdasal ako sa maraming mosque at sa malalaking mosque' }, analysis: { ar: 'مَسَاجِدَ مجرور بالفتحة لتجرده، والْمَسَاجِدِ مجرور بالكسرة لدخول (أل).', en: 'Indefinite مَسَاجِدَ takes Fatha in Jarr; definite الْمَسَاجِدِ takes Kasra.', tl: 'Fatha sa مَسَاجِدَ dahil walang الـ; Kasra sa الْمَسَاجِدِ dahil may الـ.' } }],
    exceptions: [{ ar: 'يُصرف العَلَم الأعجمي الثلاثي الساكن الوسط مثل (نُوحٌ، لُوطٌ، هُودٌ) لخفته.', en: '3-letter foreign names with middle Sukun (نُوحٌ، لُوطٌ) are triptotes and take Tanwin.', tl: 'Ang 3-letrang banyagang pangalan na may sukun sa gitna (نُوحٌ) ay tumatanggap ng Tanwin.' }],
    commonMistakes: [{ ar: 'تنوين (أَحْمَد) أو (فَاطِمَة) أو جرهما بالكسرة، أو النسبة إلى مَدِينَة بـ(*مَدِينِيّ) والصواب (مَدَنِيّ) أو مَدِينِيّ للمدينة المنورة تمييزًا.', en: 'Putting Tanwin on أَحْمَد or فَاطِمَة.', tl: 'Paglalagay ng Tanwin sa أَحْمَد o فَاطِمَة.' }],
    comparison: { ar: 'الأعلام المذكرة العربية المصروفة (مُحَمَّدٌ، زَيْدٌ، عَلِيٌّ) تُنوَّن، بينما الأعجمية الزائدة على ٣ (إِبْرَاهِيمُ، يُوسُفُ) والمختومة بتاء أو ألف ونون زائدتين (طَلْحَةُ، عُثْمَانُ) تُمنع من الصرف.', en: 'Arabic masc. names like مُحَمَّدٌ take Tanwin; foreign 4+ names and names ending in ة or انِ do not.', tl: 'May Tanwin ang مُحَمَّدٌ; walang Tanwin ang إِبْرَاهِيمُ at عُثْمَانُ.' },
    practicalExercises: [{ id: 'ex-s23-1', prompt: { ar: 'انسب إلى: (صَحْرَاء، فَرَنْسَا، تَرْبِيَة).', en: 'Form Nisbah adjectives from: صَحْرَاء, فَرَنْسَا, تَرْبِيَة.', tl: 'Buuin ang Nisbah ng: صَحْرَاء, فَرَنْسَا, تَرْبِيَة.' }, arabicPrompt: 'صَحْرَاء / فَرَنْسَا / تَرْبِيَة', answer: 'صَحْرَاوِيّ — فَرَنْسِيّ — تَرْبَوِيّ', explanation: { ar: 'قلب همزة التأنيث واوًا في صَحْرَاوِيّ، وحذف الألف الرابعة في فَرَنْسِيّ.', en: 'Feminine Hamza → Waw; 5th+ Alif drops.', tl: 'Nagiging Waw ang pambabaeng Hamza; nawawala ang huling Alif sa mahabang salita.' } }],
    summary: { ar: 'أبواب التصغير والنسبة والمنع من الصرف تضبط دقة المفردة العربية وإعرابها.', en: 'Tasghir, Nisbah, Gender, and Diptotes govern precision in nominal morphology.', tl: 'Ang Tasghir, Nisbah, at Diptotes ay nagsisiguro ng tamang anyo at I\'rab ng pangngalan.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA },
  }),

  makeSarfChapter(24, 'sarf-24', 'advanced', 'الإعلال والإبدال والإدغام وهمزتا الوصل والقطع', 'Advanced Morphophonology: I\'lal, Ibdal, Idgham & Hamza', 'I\'lal, Ibdal, Idgham at Hamzat al-Wasl vs Qat\'', {
    objectives: [
      { ar: 'التمييز بين أنواع الإعلال الثلاثة: القلب والإسكان والحذف.', en: 'Master the 3 types of I\'lal: inversion, quiescence, and deletion.', tl: 'Matutunan ang 3 uri ng I\'lal: pagpapalit, paglalagay ng sukun, at pagtanggal.' },
      { ar: 'إتقان قواعد الإبدال في (اِفْتَعَلَ) والإدغام وفكّه وهمزتي الوصل والقطع.', en: 'Master Form VIII Ibdal (ص/ض/ط/ظ → ط، د/ذ/ز → د), Idgham, and Wasl vs Qat\'.', tl: 'Maisagawa ang Ibdal sa Form VIII, Idgham, at Wasl vs Qat\'.' },
    ],
    introduction: {
      ar: 'هذا هو الباب الجامع لأسرار التغيرات الصوتية في علم الصرف: كيف تنقلب الحروف وتندغم وتُحذف لتسهيل النطق، وكيف تُميز بين همزة الوصل والقطع بدقة تامة.',
      en: 'This capstone Sarf chapter synthesizes Arabic morphophonemics: why letters shift (I\'lal), swap consonants (Ibdal), merge (Idgham), and when Hamza is pronounced or elided.',
      tl: 'Pinagsasama ng huling kabanata sa Sarf ang mga tuntunin ng I\'lal, Ibdal, Idgham, at Hamza.',
    },
    definition: { arabicTerm: 'الإعلال والإبدال والإدغام', text: { ar: 'الإعلال تغيير حرف العلة للتخفيف (قلبًا أو إسكانًا أو حذفًا)، والإبدال جعل حرف مكان آخر مطلقًا، والإدغام إدخال حرف ساكن في مثله متحركًا.', en: 'I\'lal adjusts weak letters (by change, vowellessness, or deletion); Ibdal substitutes a consonant; Idgham merges two identical consonants.', tl: 'I\'lal: pagbabago ng mahinang letra; Ibdal: pagpapalit ng katinig; Idgham: pagsasanib ng dalawang letra.' } },
    explanation: {
      ar: '١- الإعلال بالقلب: قَوَلَ ← قَالَ، بَيَعَ ← بَاعَ، رَضِو ← رَضِيَ، مِوْزَان ← مِيزَان، عَدَاو ← عَدَاء. ٢- الإعلال بالإسكان (النقل): يَقْوُلُ ← يَقُولُ، يَبْيِعُ ← يَبِيعُ، يَدْعُوُ ← يَدْعُو. ٣- الإعلال بالحذف: يَوْعِدُ ← يَعِدُ، قُلْ، اُدْعُ. ٤- الإبدال في اِفْتَعَلَ: إذا كانت الفاء (ص، ض، ط، ظ) أُبدلت تاء افتعل طاءً (اِصْطَبَرَ، اِضْطَرَبَ، اِظْطَلَمَ)، وإذا كانت (د، ذ، ز) أُبدلت التاء دالًا (اِدَّعَى، اِزْدَهَرَ)، وإذا كانت (و، ي) أُبدلت الفاء تاءً وأُدغمت (اِتَّصَلَ). ٥- همزة الوصل: في أمر الثلاثي (اُكْتُبْ)، وماضي وأمر ومصدر الخماسي والسداسي (اِنْطِلَاق، اِسْتِغْفَار)، وأسماء سماعية عشرة (اِسْم، اِبْن، اِبْنَة، اِثْنَان، اِثْنَتَان، اِمْرُؤ، اِمْرَأَة، اَيْمُن اللَّه) و(الـ). ٦- همزة القطع: في ماضي وأمر ومصدر الرباعي (أَكْرَمَ، أَكْرِمْ، إِكْرَام)، وهمزة المضارعة (أَكْتُبُ)، وكل الأسماء والحروف عدا المستثنيات.',
      en: '1. I\'lal: Inversion (قَوَلَ → قَالَ, مِوْزَان → مِيزَان), Transfer/Sukun (يَقْوُلُ → يَقُولُ), Deletion (يَوْعِدُ → يَعِدُ). 2. Form VIII Ibdal: after ص/ض/ط/ظ, infix ت becomes ط (اِصْطَبَرَ, اِضْطَرَبَ); after د/ذ/ز, ت becomes د (اِزْدَهَرَ, اِدَّعَى); و/ي becomes ت (اِتَّصَلَ). 3. Hamzat al-Wasl: Form I Amr, Forms VII/VIII/IX/X (Madhi/Amr/Masdar), الـ, and the 10 nouns (اِسْم, اِبْن, اِثْنَان, اِمْرُؤ, etc.). 4. Hamzat al-Qat\': Form IV (أَكْرَمَ/إِكْرَام), 1s Mudhari (أَكْتُبُ), all other nouns/particles.',
      tl: '1. I\'lal: pagbabago ng mahinang letra. 2. Ibdal sa Form VIII: nagiging ط pagkatapos ng ص/ض/ط/ظ (اِصْطَبَرَ), at د pagkatapos ng د/ذ/ز (اِزْدَهَرَ). 3. Hamzat al-Wasl vs Qat\'.',
    },
    rules: [
      { ar: 'امتحان همزة الوصل والقطع عمليًّا: ضع قبل الكلمة (وَ) أو (فَـ)؛ فإن نُطقت الهمزة فهي قطع (وَأَكْرَمَ) وإن سقطت في النطق فهي وصل (وَاسْتَغْفَرَ).', en: 'Practical test for Wasl vs Qat\': prefix وَـ! If the Hamza is still pronounced, it is Qat\' (وَأَكْرَمَ); if elided, it is Wasl (وَاسْتَغْفَرَ).', tl: 'Pagsusuri sa Hamza: magdagdag ng وَ sa unahan; kung binibigkas pa rin, ito ay Qat\' (وَأَكْرَمَ); kung hindi, ito ay Wasl (وَاسْتَغْفَرَ).' },
    ],
    classifications: [
      { titleAr: 'إبدال تاء افتعل طاءً', titleEn: 'Emphatic Ibdal (ت → ط)', titleTl: 'Ibdal ng ت → ط', description: { ar: 'بعد الصاد والضاد والطاء والظاء.', en: 'After ص, ض, ط, ظ.', tl: 'Pagkatapos ng ص, ض, ط, ظ.' }, examples: ['اِصْطَفَى (ص-ف-و)', 'اِضْطَرَّ (ض-ر-ر)', 'اِطَّلَعَ (ط-ل-ع)'] },
      { titleAr: 'إبدال تاء افتعل دالًا', titleEn: 'Voiced Ibdal (ت → د)', titleTl: 'Ibdal ng ت → د', description: { ar: 'بعد الدال والذال والزاي.', en: 'After د, ذ, ز.', tl: 'Pagkatapos ng د, ذ, ز.' }, examples: ['اِزْدَادَ (ز-ي-د)', 'اِدَّخَرَ (ذ-خ-ر)', 'اِدَّعَى (د-ع-و)'] },
    ],
    patterns: [
      { pattern: 'اِفْتَعَلَ ← اِفْطَعَلَ / اِفْدَعَلَ', example: 'اِضْطَرَبَ / اِزْدَهَرَ', meaning: { ar: 'المجانسة الصوتية', en: 'Phonetic assimilation in Form VIII', tl: 'Pagtutugma ng tunog sa Form VIII' }, rule: { ar: 'لتقارب المخرجين وتيسير النطق', en: 'Harmonizes voicing/emphasis with C1', tl: 'Pinapadali ang pagbigkas' } },
    ],
    examples: [{ arabic: 'اِصْطَبَرَ وَازْدَادَ عِلْمًا وَاسْتَمَرَّ فِي الْاِجْتِهَادِ', transliteration: 'iṣṭabara wazdāda \'ilman wastamarra fī al-ijtihādi', translation: { ar: 'اجتماع الإبدال وهمزات الوصل', en: 'He showed patience, increased in knowledge, and persisted in striving', tl: 'Nagtiyaga siya, nadagdagan ng kaalaman, at nagpatuloy sa pagsusumikap' }, analysis: { ar: 'اِصْطَبَرَ (ص-ب-ر) واِزْدَادَ (ز-ي-د) كلاهما على وزن اِفْتَعَلَ مع الإبدال، والهمزات كلها وصل.', en: 'اِصْطَبَرَ (root ص-ب-ر) and اِزْدَادَ (root ز-ي-د) demonstrate Form VIII Ibdal and Wasl.', tl: 'Ipinapakita ng اِصْطَبَرَ at اِزْدَادَ ang Ibdal sa Form VIII.' } }],
    exceptions: [{ ar: 'تُكتب همزة (اِسْم) وصلًا في المفرد وتتحول إلى قطع في الجمع (أَسْمَاء)، وكذلك (اِبْن ← أَبْنَاء).', en: 'Nouns like اِسْم and اِبْن use Wasl in singular, but take Qat\' in broken plurals (أَسْمَاء, أَبْنَاء).', tl: 'Ang اِسْم at اِبْن ay Wasl sa isahan ngunit nagiging Qat\' sa maramihan (أَسْمَاء, أَبْنَاء).' }],
    commonMistakes: [{ ar: 'كتابة همزة قطع على مصادر الخماسي والسداسي (*إجتماع، *إستخدام)؛ والصواب بلا همزة (اجتماع، استخدام).', en: 'Writing Hamza on Form VII/VIII/X Masdars (*إجتماع, *إستخدام); they must use plain Alif (اجتماع, استخدام).', tl: 'Paglalagay ng Hamza sa اجتماع at استخدام.' }],
    comparison: { ar: 'كل همزة قطع تُنطق وتُكتب فوق الألف أو تحتها دائمًا، بينما همزة الوصل تسقط لفظًا في درج الكلام وتُكتب ألفًا مجردة.', en: 'Hamzat al-Qat\' is always written (أ/إ) and pronounced; Hamzat al-Wasl is written as bare ا and elides mid-speech.', tl: 'Ang Qat\' ay laging isinusulat (أ/إ) at binibigkas; ang Wasl ay nawawala sa gitna ng pagbasa.' },
    practicalExercises: [{ id: 'ex-s24-1', prompt: { ar: 'أدخل وزن (اِفْتَعَلَ) على الجذرين: (ز-ح-م) و(ض-ر-ب).', en: 'Put roots ز-ح-م and ض-ر-ب into Form VIII.', tl: 'Ilagay ang ز-ح-م at ض-ر-ب sa Form VIII.' }, arabicPrompt: 'ز-ح-م / ض-ر-ب', answer: 'اِزْدَحَمَ — اِضْطَرَبَ', explanation: { ar: 'تُبدل التاء دالًا بعد الزاي، وطاءً بعد الضاد.', en: 'ز triggers ت→د; ض triggers ت→ط.', tl: 'ت→د pagkatapos ng ز; ت→ط pagkatapos ng ض.' } }],
    summary: { ar: 'الإعلال والإبدال والإدغام وهمزتا الوصل والقطع تمثل ذروة الصرف العربي ومفتاح القراءة والكتابة السليمة.', en: 'Mastering I\'lal, Ibdal, Idgham, and Wasl/Qat\' completes your Arabic morphological foundation.', tl: 'Ang pagkabisado ng I\'lal, Ibdal, Idgham, at Wasl/Qat\' ay kumukumpleto sa pundasyon ng Sarf.' },
    furtherReading: S_SHADHA,
    meta: { status: 'verified', sources: S_SHADHA, qiyasiVsSamaai: 'قياسي' },
  }),
];
