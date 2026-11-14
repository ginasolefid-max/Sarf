import { IrabSentenceResult, IrabState, IrabTokenAnalysis } from '../types/arabic';
import { stripDiacritics } from './tasreefEngine';

export const PRESET_IRAB_SENTENCES: IrabSentenceResult[] = [
  {
    sentence: 'كَتَبَ الطَّالِبُ الدَّرْسَ',
    sentenceTypeAr: 'جملة فعلية',
    sentenceTypeEn: 'Verbal Sentence (Active)',
    translation: {
      ar: 'جملة فعلية تامة من فعل ماضٍ وفاعل ومفعول به.',
      en: 'The student wrote the lesson.',
      tl: 'Isinulat ng mag-aaral ang aralin.',
    },
    hasAmbiguity: false,
    isVerifiedPreset: true,
    structuralOverview: {
      ar: 'جملة فعلية تتكون من الفعل الماضي (كَتَبَ)، والفاعل المرفوع (الطَّالِبُ)، والمفعول به المنصوب (الدَّرْسَ).',
      en: 'A standard active verbal sentence (VSO): Verb (كَتَبَ) governs the nominative subject (الطَّالِبُ) and the accusative direct object (الدَّرْسَ).',
      tl: 'Karaniwang pangungusap na pandiwa (VSO): Ang pandiwa (كَتَبَ) ang namamahala sa paksa (الطَّالِبُ, Marfu) at sa tuwirang layon (الدَّرْسَ, Mansub).',
    },
    tokens: [
      {
        index: 0,
        word: 'كَتَبَ',
        normalized: 'كتب',
        posAr: 'فعل ماضٍ',
        posEn: 'Past Verb',
        roleAr: 'فعل ماضٍ',
        roleEn: 'Past Tense Verb',
        roleTl: 'Pandiwang Pangnakaraan',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني على الفتح الظاهر',
        markerEn: 'Built on explicit Fatha',
        amilAr: 'مبني لا عامل له (عامل في غيره)',
        amilEn: 'Indeclinable; acts as governor (Amil) for Fa\'il & Maf\'ul',
        relationNote: {
          ar: 'يرفع الفاعل (الطَّالِبُ) وينصب المفعول به (الدَّرْسَ).',
          en: 'Governs الطَّالِبُ in Raf\' and الدَّرْسَ in Nasb.',
          tl: 'Nagbibigay ng Raf\' sa الطَّالِبُ at Nasb sa الدَّرْسَ.',
        },
        explanation: {
          ar: 'فعل ماضٍ مبني على الفتح الظاهر على آخره لعدم اتصاله بضمير رفع متحرك أو واو الجماعة.',
          en: 'Past tense verb built on Fatha because no consonant subject suffix or plural Waw is attached.',
          tl: 'Pandiwang pangnakaraan na nakapirmi sa Fatha.',
        },
        confidence: 'deterministic',
      },
      {
        index: 1,
        word: 'الطَّالِبُ',
        normalized: 'الطالب',
        posAr: 'اسم معرفة (بأل)',
        posEn: 'Definite Noun',
        roleAr: 'فاعل',
        roleEn: 'Subject (Fa\'il)',
        roleTl: 'Simuno / Gumaganap (Fa\'il)',
        irabState: 'مرفوع',
        irabClassification: 'لفظي',
        markerAr: 'علامة رفعه الضمة الظاهرة',
        markerEn: 'Explicit Damma (ُ)',
        amilAr: 'الفعل (كَتَبَ)',
        amilEn: 'Governed by the verb كَتَبَ',
        relationNote: {
          ar: 'من قام بالفعل (كَتَبَ).',
          en: 'Performer of the action كَتَبَ.',
          tl: 'Ang gumagawa ng kilos na كَتَبَ.',
        },
        explanation: {
          ar: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره لأنه اسم مفرد صحيح الآخر.',
          en: 'Subject (Fa\'il) in the nominative case (Marfu\'), marked by explicit Damma because it is a singular sound noun.',
          tl: 'Fa\'il na nasa kasong Marfu\'; ang palatandaan ay malinaw na Damma.',
        },
        confidence: 'deterministic',
      },
      {
        index: 2,
        word: 'الدَّرْسَ',
        normalized: 'الدرس',
        posAr: 'اسم معرفة (بأل)',
        posEn: 'Definite Noun',
        roleAr: 'مفعول به',
        roleEn: 'Direct Object (Maf\'ul Bihi)',
        roleTl: 'Tuwirang Layon (Maf\'ul Bihi)',
        irabState: 'منصوب',
        irabClassification: 'لفظي',
        markerAr: 'علامة نصبه الفتحة الظاهرة',
        markerEn: 'Explicit Fatha (َ)',
        amilAr: 'الفعل المتعدي (كَتَبَ)',
        amilEn: 'Governed by the transitive verb كَتَبَ',
        relationNote: {
          ar: 'وقع عليه فعل الفاعل.',
          en: 'Direct receiver of the writing action.',
          tl: 'Direktang tumatanggap ng kilos.',
        },
        explanation: {
          ar: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره.',
          en: 'Direct object (Maf\'ul Bihi) in the accusative case (Mansub), marked by explicit Fatha.',
          tl: 'Maf\'ul Bihi na nasa kasong Mansub; ang palatandaan ay malinaw na Fatha.',
        },
        confidence: 'deterministic',
      },
    ],
  },
  {
    sentence: 'إِنَّ الطَّالِبَ مُجْتَهِدٌ',
    sentenceTypeAr: 'جملة اسمية',
    sentenceTypeEn: 'Nominal Sentence with Inna',
    translation: {
      ar: 'جملة اسمية دخلت عليها (إِنَّ) للتوكيد.',
      en: 'Indeed, the student is diligent.',
      tl: 'Katotohanan, ang mag-aaral ay masipag.',
    },
    hasAmbiguity: false,
    isVerifiedPreset: true,
    structuralOverview: {
      ar: 'دخل الحرف الناسخ (إِنَّ) على المبتدأ والخبر، فنصب المبتدأ اسمًا له (الطَّالِبَ) ورفع الخبر خبرًا له (مُجْتَهِدٌ).',
      en: 'The emphatic particle إِنَّ enters a nominal sentence, changing the Mubtada to Mansub (اسم إنّ) and keeping the Khabar Marfu\' (خبر إنّ).',
      tl: 'Pinasok ng إِنَّ ang pangungusap kaya naging Mansub ang الطَّالِبَ at nanatiling Marfu\' ang مُجْتَهِدٌ.',
    },
    tokens: [
      {
        index: 0,
        word: 'إِنَّ',
        normalized: 'ان',
        posAr: 'حرف توكيد ونصب ناسخ',
        posEn: 'Emphatic Accusative Particle',
        roleAr: 'حرف ناسخ',
        roleEn: 'Particle of Emphasis (Harf Nasikh)',
        roleTl: 'Katagang Nagpapabago ng Kaso (إِنَّ)',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني على الفتح لا محل له من الإعراب',
        markerEn: 'Built on Fatha, no I\'rab position',
        amilAr: 'عامل ينصب الاسم ويرفع الخبر',
        amilEn: 'Governs Ism Inna (Nasb) and Khabar Inna (Raf\')',
        relationNote: {
          ar: 'ينصب (الطَّالِبَ) ويرفع (مُجْتَهِدٌ).',
          en: 'Turns الطَّالِبَ accusative and keeps مُجْتَهِدٌ nominative.',
          tl: 'Ginagawang Mansub ang الطَّالِبَ at Marfu\' ang مُجْتَهِدٌ.',
        },
        explanation: {
          ar: 'حرف توكيد ونصب مبني على الفتح لا محل له من الإعراب.',
          en: 'Particle of emphasis and accusative governance, indeclinable on Fatha.',
          tl: 'Katagang nagbibigay-diin na nakapirmi sa Fatha.',
        },
        confidence: 'deterministic',
      },
      {
        index: 1,
        word: 'الطَّالِبَ',
        normalized: 'الطالب',
        posAr: 'اسم',
        posEn: 'Noun',
        roleAr: 'اسم إنَّ',
        roleEn: 'Noun of Inna (Ism Inna)',
        roleTl: 'Pangngalan ng Inna',
        irabState: 'منصوب',
        irabClassification: 'لفظي',
        markerAr: 'علامة نصبه الفتحة الظاهرة',
        markerEn: 'Explicit Fatha (َ)',
        amilAr: 'الحرف الناسخ (إِنَّ)',
        amilEn: 'Governed by إِنَّ',
        relationNote: {
          ar: 'أصله مبتدأ نُصب بدخول (إِنَّ).',
          en: 'Originally Mubtada, rendered Mansub by إِنَّ.',
          tl: 'Orihinal na Mubtada na naging Mansub dahil sa إِنَّ.',
        },
        explanation: {
          ar: 'اسم إِنَّ منصوب وعلامة نصبه الفتحة الظاهرة على آخره.',
          en: 'Ism Inna in the accusative case (Mansub) with explicit Fatha.',
          tl: 'Ism Inna na nasa kasong Mansub na may malinaw na Fatha.',
        },
        confidence: 'deterministic',
      },
      {
        index: 2,
        word: 'مُجْتَهِدٌ',
        normalized: 'مجتهد',
        posAr: 'اسم مشتق (اسم فاعل)',
        posEn: 'Active Participle Noun',
        roleAr: 'خبر إنَّ',
        roleEn: 'Predicate of Inna (Khabar Inna)',
        roleTl: 'Panaguri ng Inna (Khabar Inna)',
        irabState: 'مرفوع',
        irabClassification: 'لفظي',
        markerAr: 'علامة رفعه الضمة الظاهرة',
        markerEn: 'Explicit Damma (ٌ)',
        amilAr: 'الحرف الناسخ (إِنَّ)',
        amilEn: 'Governed by إِنَّ',
        relationNote: {
          ar: 'يتمم معنى الجملة مع اسم إِنَّ.',
          en: 'Completes the predication about الطَّالِبَ.',
          tl: 'Bumubuo sa kahulugan ng pangungusap.',
        },
        explanation: {
          ar: 'خبر إِنَّ مرفوع وعلامة رفعه الضمة الظاهرة على آخره.',
          en: 'Khabar Inna in the nominative case (Marfu\') with explicit Damma.',
          tl: 'Khabar Inna na nasa kasong Marfu\' na may malinaw na Damma.',
        },
        confidence: 'deterministic',
      },
    ],
  },
  {
    sentence: 'كَانَ الْجَوُّ جَمِيلًا',
    sentenceTypeAr: 'جملة اسمية',
    sentenceTypeEn: 'Nominal Sentence with Kana',
    translation: {
      ar: 'جملة اسمية دخل عليها الفعل الناسخ (كَانَ).',
      en: 'The weather was beautiful.',
      tl: 'Naging maganda ang panahon.',
    },
    hasAmbiguity: false,
    isVerifiedPreset: true,
    structuralOverview: {
      ar: 'دخل الفعل الماضي الناقص (كَانَ) فرفع المبتدأ اسمًا له (الْجَوُّ) ونصب الخبر خبرًا له (جَمِيلًا) — عكس عمل (إِنَّ).',
      en: 'The deficient verb كَانَ keeps the subject Marfu\' (اسم كان) and turns the predicate Mansub (خبر كان) — the inverse of إِنَّ.',
      tl: 'Pinapanatili ng كَانَ na Marfu\' ang الْجَوُّ at ginagawang Mansub ang جَمِيلًا.',
    },
    tokens: [
      {
        index: 0,
        word: 'كَانَ',
        normalized: 'كان',
        posAr: 'فعل ماضٍ ناقص ناسخ',
        posEn: 'Deficient Past Verb',
        roleAr: 'فعل ماضٍ ناقص',
        roleEn: 'Deficient Copular Verb (Kana)',
        roleTl: 'Pandiwang Kanasikh (كَانَ)',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني على الفتح الظاهر',
        markerEn: 'Built on Fatha',
        amilAr: 'عامل يرفع الاسم وينصب الخبر',
        amilEn: 'Governs Ism Kana (Raf\') and Khabar Kana (Nasb)',
        relationNote: {
          ar: 'يرفع (الْجَوُّ) وينصب (جَمِيلًا).',
          en: 'Governs الْجَوُّ in Raf\' and جَمِيلًا in Nasb.',
          tl: 'Ginagawang Marfu\' ang الْجَوُّ at Mansub ang جَمِيلًا.',
        },
        explanation: {
          ar: 'فعل ماضٍ ناقص ناسخ مبني على الفتح، يرفع المبتدأ وينصب الخبر.',
          en: 'Deficient past verb built on Fatha; raises Ism Kana and puts Khabar Kana in Nasb.',
          tl: 'Pandiwang pangnakaraan na nakapirmi sa Fatha na nagbabago ng panaguri sa Mansub.',
        },
        confidence: 'deterministic',
      },
      {
        index: 1,
        word: 'الْجَوُّ',
        normalized: 'الجو',
        posAr: 'اسم',
        posEn: 'Noun',
        roleAr: 'اسم كان',
        roleEn: 'Noun of Kana (Ism Kana)',
        roleTl: 'Pangngalan ng Kana',
        irabState: 'مرفوع',
        irabClassification: 'لفظي',
        markerAr: 'علامة رفعه الضمة الظاهرة',
        markerEn: 'Explicit Damma (ُ)',
        amilAr: 'الفعل الناقص (كَانَ)',
        amilEn: 'Governed by كَانَ',
        relationNote: {
          ar: 'المُسند إليه في جملة كان.',
          en: 'Subject of the state described by كَانَ.',
          tl: 'Ang paksa ng kalagayan sa كَانَ.',
        },
        explanation: {
          ar: 'اسم كان مرفوع وعلامة رفعه الضمة الظاهرة على آخره.',
          en: 'Ism Kana in the nominative case (Marfu\'), marked by explicit Damma.',
          tl: 'Ism Kana na nasa kasong Marfu\'.',
        },
        confidence: 'deterministic',
      },
      {
        index: 2,
        word: 'جَمِيلًا',
        normalized: 'جميلا',
        posAr: 'اسم (صفة مشبهة)',
        posEn: 'Adjectival Noun',
        roleAr: 'خبر كان',
        roleEn: 'Predicate of Kana (Khabar Kana)',
        roleTl: 'Panaguri ng Kana',
        irabState: 'منصوب',
        irabClassification: 'لفظي',
        markerAr: 'علامة نصبه الفتحة الظاهرة',
        markerEn: 'Explicit Fatha (ً)',
        amilAr: 'الفعل الناقص (كَانَ)',
        amilEn: 'Governed by كَانَ',
        relationNote: {
          ar: 'خبر منصوب يتمم معنى جملة كان.',
          en: 'Accusative predicate completing كَانَ.',
          tl: 'Panaguring Mansub ng كَانَ.',
        },
        explanation: {
          ar: 'خبر كان منصوب وعلامة نصبه الفتحة الظاهرة على آخره.',
          en: 'Khabar Kana in the accusative case (Mansub), marked by explicit Fatha.',
          tl: 'Khabar Kana na nasa kasong Mansub na may malinaw na Fatha.',
        },
        confidence: 'deterministic',
      },
    ],
  },
  {
    sentence: 'ذَهَبَ مُحَمَّدٌ إِلَى الْمَدْرَسَةِ',
    sentenceTypeAr: 'جملة فعلية',
    sentenceTypeEn: 'Verbal Sentence with Prepositional Phrase',
    translation: {
      ar: 'جملة فعلية من فعل لازم وفاعل وجار ومجرور.',
      en: 'Muhammad went to the school.',
      tl: 'Pumunta si Muhammad sa paaralan.',
    },
    hasAmbiguity: false,
    isVerifiedPreset: true,
    structuralOverview: {
      ar: 'فعل ماضٍ لازم (ذَهَبَ) رفع الفاعل (مُحَمَّدٌ)، وتعدى إلى المكان بحرف الجر (إِلَى) الذي جرَّ الاسم بعده (الْمَدْرَسَةِ).',
      en: 'Intransitive verb ذَهَبَ governs Fa\'il مُحَمَّدٌ, while preposition إِلَى governs الْمَدْرَسَةِ in Jarr.',
      tl: 'Ang pandiwang ذَهَبَ ay namamahala sa Fa\'il na مُحَمَّدٌ, at ang pang-ukol na إِلَى ay nagbibigay ng Jarr sa الْمَدْرَسَةِ.',
    },
    tokens: [
      {
        index: 0,
        word: 'ذَهَبَ',
        normalized: 'ذهب',
        posAr: 'فعل ماضٍ لازم',
        posEn: 'Intransitive Past Verb',
        roleAr: 'فعل ماضٍ',
        roleEn: 'Past Tense Verb',
        roleTl: 'Pandiwang Pangnakaraan',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني على الفتح الظاهر',
        markerEn: 'Built on Fatha',
        amilAr: 'عامل في الفاعل (مُحَمَّدٌ)',
        amilEn: 'Governs Fa\'il مُحَمَّدٌ',
        relationNote: {
          ar: 'يرفع الفاعل ويتعلق به الجار والمجرور.',
          en: 'Takes Fa\'il مُحَمَّدٌ and connects to the prepositional phrase.',
          tl: 'Kumukuha ng Fa\'il at nauugnay sa pariralang pang-ukol.',
        },
        explanation: {
          ar: 'فعل ماضٍ مبني على الفتح الظاهر على آخره لا محل له من الإعراب.',
          en: 'Past verb built on explicit Fatha.',
          tl: 'Pandiwang pangnakaraan na nakapirmi sa Fatha.',
        },
        confidence: 'deterministic',
      },
      {
        index: 1,
        word: 'مُحَمَّدٌ',
        normalized: 'محمد',
        posAr: 'اسم علم',
        posEn: 'Proper Noun',
        roleAr: 'فاعل',
        roleEn: 'Subject (Fa\'il)',
        roleTl: 'Simuno (Fa\'il)',
        irabState: 'مرفوع',
        irabClassification: 'لفظي',
        markerAr: 'علامة رفعه الضمة الظاهرة',
        markerEn: 'Explicit Damma (ٌ)',
        amilAr: 'الفعل (ذَهَبَ)',
        amilEn: 'Governed by ذَهَبَ',
        relationNote: {
          ar: 'من قام بالذهاب.',
          en: 'The one who went.',
          tl: 'Ang gumawa ng pagpunta.',
        },
        explanation: {
          ar: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.',
          en: 'Subject (Fa\'il) in Raf\', marked by explicit Damma.',
          tl: 'Fa\'il na nasa kasong Marfu\'.',
        },
        confidence: 'deterministic',
      },
      {
        index: 2,
        word: 'إِلَى',
        normalized: 'الى',
        posAr: 'حرف جر',
        posEn: 'Preposition',
        roleAr: 'حرف جر',
        roleEn: 'Preposition (Harf Jarr)',
        roleTl: 'Pang-ukol (Harf Jarr)',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني على السكون لا محل له من الإعراب',
        markerEn: 'Built on Sukun (Alif Maqsura)',
        amilAr: 'عامل يجر الاسم بعده',
        amilEn: 'Governs الْمَدْرَسَةِ in Jarr',
        relationNote: {
          ar: 'يجرّ الاسم (الْمَدْرَسَةِ) ويدل على انتهاء الغاية المكانية.',
          en: 'Puts الْمَدْرَسَةِ into Jarr indicating destination.',
          tl: 'Nagbibigay ng Jarr sa الْمَدْرَسَةِ.',
        },
        explanation: {
          ar: 'حرف جر مبني على السكون على الألف المقصورة لا محل له من الإعراب.',
          en: 'Preposition built on Sukun with no I\'rab position.',
          tl: 'Pang-ukol na nakapirmi sa Sukun.',
        },
        confidence: 'deterministic',
      },
      {
        index: 3,
        word: 'الْمَدْرَسَةِ',
        normalized: 'المدرسة',
        posAr: 'اسم مكان معرفة',
        posEn: 'Noun of Place',
        roleAr: 'اسم مجرور',
        roleEn: 'Genitive Noun (Ism Majrur)',
        roleTl: 'Pangngalang nasa Jarr',
        irabState: 'مجرور',
        irabClassification: 'لفظي',
        markerAr: 'علامة جره الكسرة الظاهرة',
        markerEn: 'Explicit Kasra (ِ)',
        amilAr: 'حرف الجر (إِلَى)',
        amilEn: 'Governed by إِلَى',
        relationNote: {
          ar: 'الاسم المجرور متعلق بالفعل (ذَهَبَ).',
          en: 'Prepositional phrase linked semantically to ذَهَبَ.',
          tl: 'Nakaugnay sa pandiwang ذَهَبَ.',
        },
        explanation: {
          ar: 'اسم مجرور بحرف الجر (إِلَى) وعلامة جره الكسرة الظاهرة، والجار والمجرور متعلقان بالفعل (ذَهَبَ).',
          en: 'Genitive noun governed by إِلَى, marked by explicit Kasra.',
          tl: 'Pangngalang Majrur dahil sa إِلَى, may malinaw na Kasra.',
        },
        confidence: 'deterministic',
      },
    ],
  },
  {
    sentence: 'لَمْ يَكْتُبْ الطَّالِبُ الدَّرْسَ',
    sentenceTypeAr: 'جملة فعلية',
    sentenceTypeEn: 'Negated Jussive Verbal Sentence',
    translation: {
      ar: 'جملة فعلية منفية بـ(لَمْ) الجازمة.',
      en: 'The student did not write the lesson.',
      tl: 'Hindi isinulat ng mag-aaral ang aralin.',
    },
    hasAmbiguity: false,
    isVerifiedPreset: true,
    structuralOverview: {
      ar: 'حرف الجزم (لَمْ) جزم الفعل المضارع (يَكْتُبْ) بالسكون وقلب زمنه إلى الماضي؛ وملاحظة التجويد/الوصل: عند الوصل يُكسر السكون لالتقاء الساكنين (لَمْ يَكْتُبِ الطَّالِبُ).',
      en: 'The jussive particle لَمْ puts Mudhari يَكْتُبْ into Jazm (marked by Sukun) and shifts its time meaning to the past. Note: in connected speech, Sukun becomes Kasra before alif-lam (يَكْتُبِ الطَّالِبُ).',
      tl: 'Ginagawang Majzum ng لَمْ ang يَكْتُبْ (marka: Sukun) at inililipat ang kahulugan nito sa nakaraan.',
    },
    tokens: [
      {
        index: 0,
        word: 'لَمْ',
        normalized: 'لم',
        posAr: 'حرف نفي وجزم وقلب',
        posEn: 'Jussive Negation Particle',
        roleAr: 'حرف جزم',
        roleEn: 'Jussive Particle (Harf Jazm)',
        roleTl: 'Katagang Jussive (لَمْ)',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني على السكون لا محل له من الإعراب',
        markerEn: 'Built on Sukun',
        amilAr: 'عامل يجزم المضارع',
        amilEn: 'Governs يَكْتُبْ in Jazm',
        relationNote: {
          ar: 'يجزم (يَكْتُبْ) ويقلب معناه للماضي.',
          en: 'Places يَكْتُبْ in Jazm and shifts tense to past.',
          tl: 'Nagbibigay ng Jazm sa يَكْتُبْ.',
        },
        explanation: {
          ar: 'حرف نفي وجزم وقلب مبني على السكون لا محل له من الإعراب.',
          en: 'Particle of negation, jussive governance, and past-tense shift.',
          tl: 'Katagang nagtatanggi at nagbibigay ng Jazm.',
        },
        confidence: 'deterministic',
      },
      {
        index: 1,
        word: 'يَكْتُبْ',
        normalized: 'يكتب',
        posAr: 'فعل مضارع',
        posEn: 'Present Verb (Jussive)',
        roleAr: 'فعل مضارع مجزوم',
        roleEn: 'Jussive Present Verb',
        roleTl: 'Pandiwang Majzum',
        irabState: 'مجزوم',
        irabClassification: 'لفظي',
        markerAr: 'علامة جزمه السكون الظاهر',
        markerEn: 'Explicit Sukun (ْ)',
        amilAr: 'أداة الجزم (لَمْ)',
        amilEn: 'Governed by لَمْ',
        relationNote: {
          ar: 'جُزم بـ(لَمْ) ويرفع الفاعل (الطَّالِبُ) وينصب (الدَّرْسَ).',
          en: 'Jussive by لَمْ; still governs Fa\'il and Maf\'ul Bihi.',
          tl: 'Majzum dahil sa لَمْ; namamahala sa Fa\'il at Maf\'ul Bihi.',
        },
        explanation: {
          ar: 'فعل مضارع مجزوم بـ(لَمْ) وعلامة جزمه السكون الظاهر (ويُكسر في الوصل لالتقاء الساكنين: لَمْ يَكْتُبِ الطَّالِبُ).',
          en: 'Present tense verb in Jazm governed by لَمْ, marked by Sukun (vocalized with Kasra in connected reading before الـ).',
          tl: 'Pandiwang Majzum dahil sa لَمْ na may markang Sukun.',
        },
        confidence: 'deterministic',
      },
      {
        index: 2,
        word: 'الطَّالِبُ',
        normalized: 'الطالب',
        posAr: 'اسم',
        posEn: 'Noun',
        roleAr: 'فاعل',
        roleEn: 'Subject (Fa\'il)',
        roleTl: 'Simuno (Fa\'il)',
        irabState: 'مرفوع',
        irabClassification: 'لفظي',
        markerAr: 'علامة رفعه الضمة الظاهرة',
        markerEn: 'Explicit Damma (ُ)',
        amilAr: 'الفعل (يَكْتُبْ)',
        amilEn: 'Governed by يَكْتُبْ',
        relationNote: {
          ar: 'الفاعل للفعل (يَكْتُبْ).',
          en: 'Subject of the verb يَكْتُبْ.',
          tl: 'Simuno ng يَكْتُبْ.',
        },
        explanation: {
          ar: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.',
          en: 'Subject (Fa\'il) in Raf\', marked by explicit Damma.',
          tl: 'Fa\'il na nasa kasong Marfu\'.',
        },
        confidence: 'deterministic',
      },
      {
        index: 3,
        word: 'الدَّرْسَ',
        normalized: 'الدرس',
        posAr: 'اسم',
        posEn: 'Noun',
        roleAr: 'مفعول به',
        roleEn: 'Direct Object (Maf\'ul Bihi)',
        roleTl: 'Tuwirang Layon (Maf\'ul Bihi)',
        irabState: 'منصوب',
        irabClassification: 'لفظي',
        markerAr: 'علامة نصبه الفتحة الظاهرة',
        markerEn: 'Explicit Fatha (َ)',
        amilAr: 'الفعل (يَكْتُبْ)',
        amilEn: 'Governed by يَكْتُبْ',
        relationNote: {
          ar: 'مفعول به للفعل (يَكْتُبْ).',
          en: 'Direct object of يَكْتُبْ.',
          tl: 'Tuwirang layon ng يَكْتُبْ.',
        },
        explanation: {
          ar: 'مفعول به منصوب وعلامة نصبه الفتحة الظاهرة على آخره.',
          en: 'Direct object in Nasb, marked by explicit Fatha.',
          tl: 'Maf\'ul Bihi na nasa kasong Mansub.',
        },
        confidence: 'deterministic',
      },
    ],
  },
  {
    sentence: 'كُتِبَ الدَّرْسُ',
    sentenceTypeAr: 'جملة فعلية',
    sentenceTypeEn: 'Passive Verbal Sentence',
    translation: {
      ar: 'جملة فعلية مبنية للمجهول.',
      en: 'The lesson was written.',
      tl: 'Isinulat ang aralin (Passive).',
    },
    hasAmbiguity: false,
    isVerifiedPreset: true,
    structuralOverview: {
      ar: 'بُني الفعل الماضي للمجهول (كُتِبَ) فحُذف الفاعل وناب عنه المفعول به مرفوعًا (الدَّرْسُ: نائب فاعل).',
      en: 'Passive past verb كُتِبَ omits the agent and promotes the object الدَّرْسُ to Na\'ib al-Fa\'il (deputy subject, Marfu\').',
      tl: 'Sa passive na pandiwang كُتِبَ, tinatanggal ang gumawa at ang الدَّرْسُ ay nagiging Na\'ib al-Fa\'il (Marfu\').',
    },
    tokens: [
      {
        index: 0,
        word: 'كُتِبَ',
        normalized: 'كتب',
        posAr: 'فعل ماضٍ مبني للمجهول',
        posEn: 'Passive Past Verb',
        roleAr: 'فعل ماضٍ مبني للمجهول',
        roleEn: 'Passive Past Verb',
        roleTl: 'Pandiwang Passive (Pangnakaraan)',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني على الفتح الظاهر',
        markerEn: 'Built on Fatha',
        amilAr: 'عامل يرفع نائب الفاعل',
        amilEn: 'Governs Na\'ib al-Fa\'il (الدَّرْسُ)',
        relationNote: {
          ar: 'يرفع (الدَّرْسُ) نائبًا عن الفاعل.',
          en: 'Raises الدَّرْسُ as deputy subject.',
          tl: 'Itinataas ang الدَّرْسُ bilang Na\'ib al-Fa\'il.',
        },
        explanation: {
          ar: 'فعل ماضٍ مبني للمجهول (مضموم الأول مكسور ما قبل الآخر) مبني على الفتح.',
          en: 'Passive past verb (pattern فُعِلَ), built on Fatha.',
          tl: 'Pandiwang passive (huwarang فُعِلَ) na nakapirmi sa Fatha.',
        },
        confidence: 'deterministic',
      },
      {
        index: 1,
        word: 'الدَّرْسُ',
        normalized: 'الدرس',
        posAr: 'اسم',
        posEn: 'Noun',
        roleAr: 'نائب فاعل',
        roleEn: 'Deputy Subject (Na\'ib al-Fa\'il)',
        roleTl: 'Panghalili sa Simuno (Na\'ib al-Fa\'il)',
        irabState: 'مرفوع',
        irabClassification: 'لفظي',
        markerAr: 'علامة رفعه الضمة الظاهرة',
        markerEn: 'Explicit Damma (ُ)',
        amilAr: 'الفعل المبني للمجهول (كُتِبَ)',
        amilEn: 'Governed by passive verb كُتِبَ',
        relationNote: {
          ar: 'أصله مفعول به حلَّ محل الفاعل وأخذ حكمه في الرفع.',
          en: 'Originally the direct object; promoted to Marfu\' in place of the omitted Fa\'il.',
          tl: 'Orihinal na layon na naging Marfu\' bilang kapalit ng Fa\'il.',
        },
        explanation: {
          ar: 'نائب فاعل مرفوع وعلامة رفعه الضمة الظاهرة على آخره.',
          en: 'Deputy subject (Na\'ib al-Fa\'il) in Raf\', marked by explicit Damma.',
          tl: 'Na\'ib al-Fa\'il na nasa kasong Marfu\'.',
        },
        confidence: 'deterministic',
      },
    ],
  },
  {
    sentence: 'أَكْرَمَ الْمُعَلِّمُ الْمُجْتَهِدِينَ',
    sentenceTypeAr: 'جملة فعلية',
    sentenceTypeEn: 'Verbal Sentence with Sound Masculine Plural',
    translation: {
      ar: 'جملة فعلية مفعولها جمع مذكر سالم منصوب بالياء.',
      en: 'The teacher honored the diligent students.',
      tl: 'Pinarangalan ng guro ang mga masisipag.',
    },
    hasAmbiguity: false,
    isVerifiedPreset: true,
    structuralOverview: {
      ar: 'تُظهر هذه الجملة علامة الإعراب الفرعية: جمع المذكر السالم (الْمُجْتَهِدِينَ) يُنصب وعلامة نصبه الياء نيابةً عن الفتحة.',
      en: 'Demonstrates substitute I\'rab markers: Sound Masculine Plural (الْمُجْتَهِدِينَ) takes Ya (ي) as its Nasb marker instead of Fatha.',
      tl: 'Ipinapakita ang kapalit na marka: ang Sound Masculine Plural ay gumagamit ng Ya (ي) para sa Nasb sa halip na Fatha.',
    },
    tokens: [
      {
        index: 0,
        word: 'أَكْرَمَ',
        normalized: 'اكرم',
        posAr: 'فعل ماضٍ (وزن أَفْعَلَ)',
        posEn: 'Form IV Past Verb',
        roleAr: 'فعل ماضٍ',
        roleEn: 'Past Verb',
        roleTl: 'Pandiwa (Form IV)',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني على الفتح',
        markerEn: 'Built on Fatha',
        amilAr: 'عامل في الفاعل والمفعول به',
        amilEn: 'Governs Fa\'il and Maf\'ul Bihi',
        relationNote: { ar: 'فعل متعدٍّ يرفع الفاعل وينصب المفعول.', en: 'Transitive verb.', tl: 'Transitive na pandiwa.' },
        explanation: { ar: 'فعل ماضٍ مبني على الفتح الظاهر.', en: 'Form IV past verb built on Fatha.', tl: 'Pandiwa sa Form IV na nakapirmi sa Fatha.' },
        confidence: 'deterministic',
      },
      {
        index: 1,
        word: 'الْمُعَلِّمُ',
        normalized: 'المعلم',
        posAr: 'اسم فاعل',
        posEn: 'Noun (Active Participle)',
        roleAr: 'فاعل',
        roleEn: 'Subject (Fa\'il)',
        roleTl: 'Simuno (Fa\'il)',
        irabState: 'مرفوع',
        irabClassification: 'لفظي',
        markerAr: 'علامة رفعه الضمة الظاهرة',
        markerEn: 'Explicit Damma',
        amilAr: 'الفعل (أَكْرَمَ)',
        amilEn: 'Governed by أَكْرَمَ',
        relationNote: { ar: 'فاعل مرفوع بالضمة.', en: 'Performer of honoring.', tl: 'Ang gumagawa ng pagpaparangal.' },
        explanation: { ar: 'فاعل مرفوع وعلامة رفعه الضمة الظاهرة.', en: 'Subject in Raf\' with explicit Damma.', tl: 'Fa\'il na Marfu\'.' },
        confidence: 'deterministic',
      },
      {
        index: 2,
        word: 'الْمُجْتَهِدِينَ',
        normalized: 'المجتهدين',
        posAr: 'جمع مذكر سالم',
        posEn: 'Sound Masculine Plural',
        roleAr: 'مفعول به',
        roleEn: 'Direct Object (Maf\'ul Bihi)',
        roleTl: 'Tuwirang Layon',
        irabState: 'منصوب',
        irabClassification: 'لفظي',
        markerAr: 'علامة نصبه الياء نيابةً عن الفتحة (جمع مذكر سالم)',
        markerEn: 'Ya (ي) substitute marker for Fatha',
        amilAr: 'الفعل (أَكْرَمَ)',
        amilEn: 'Governed by أَكْرَمَ',
        relationNote: { ar: 'مفعول به منصوب بعلامة فرعية هي الياء.', en: 'Object marked with Ya instead of Fatha.', tl: 'Layon na may markang Ya dahil plural.' },
        explanation: {
          ar: 'مفعول به منصوب وعلامة نصبه الياء لأنه جمع مذكر سالم، والنون عوض عن التنوين في الاسم المفرد.',
          en: 'Direct object in Nasb marked by Ya (because it is Sound Masculine Plural); the Nun replaces singular Tanwin.',
          tl: 'Maf\'ul Bihi na Mansub; ang marka ay Ya dahil Sound Masculine Plural.',
        },
        confidence: 'deterministic',
      },
    ],
  },
  {
    sentence: 'بَابُ الْمَسْجِدِ مَفْتُوحٌ',
    sentenceTypeAr: 'جملة اسمية',
    sentenceTypeEn: 'Nominal Sentence with Idafa',
    translation: {
      ar: 'جملة اسمية مبتدؤها مضاف.',
      en: 'The door of the mosque is open.',
      tl: 'Ang pinto ng mosque ay bukas.',
    },
    hasAmbiguity: false,
    isVerifiedPreset: true,
    structuralOverview: {
      ar: 'جملة اسمية: (بَابُ) مبتدأ وهو مضاف، و(الْمَسْجِدِ) مضاف إليه مجرور بالكسرة، و(مَفْتُوحٌ) خبر المبتدأ مرفوع.',
      en: 'Nominal sentence where the Mubtada (بَابُ) forms an Idafa genitive chain with الْمَسْجِدِ (Mudaf Ilayh, Majrur), followed by predicate مَفْتُوحٌ.',
      tl: 'Pangungusap na pangngalan: Ang بَابُ ay Mubtada at Mudaf, ang الْمَسْجِدِ ay Mudaf Ilayh (Majrur), at ang مَفْتُوحٌ ay Khabar.',
    },
    tokens: [
      {
        index: 0,
        word: 'بَابُ',
        normalized: 'باب',
        posAr: 'اسم (مضاف)',
        posEn: 'Noun (Mudaf)',
        roleAr: 'مبتدأ (وهو مضاف)',
        roleEn: 'Subject (Mubtada & Mudaf)',
        roleTl: 'Simuno (Mubtada at Mudaf)',
        irabState: 'مرفوع',
        irabClassification: 'لفظي',
        markerAr: 'علامة رفعه الضمة الظاهرة (بدون تنوين للإضافة)',
        markerEn: 'Explicit Damma (no Tanwin due to Idafa)',
        amilAr: 'الابتداء (عامل معنوي)',
        amilEn: 'Initial position (Ibtida)',
        relationNote: { ar: 'مضاف إلى (الْمَسْجِدِ) ومسند إليه بـ(مَفْتُوحٌ).', en: 'Possessed noun in Idafa; subject of مَفْتُوحٌ.', tl: 'Mudaf sa الْمَسْجِدِ.' },
        explanation: { ar: 'مبتدأ مرفوع وعلامة رفعه الضمة الظاهرة، وحُذف تنوينه للإضافة.', en: 'Mubtada in Raf\' with Damma; Tanwin is omitted because it is Mudaf.', tl: 'Mubtada na Marfu\'; tinanggal ang Tanwin dahil sa Idafa.' },
        confidence: 'deterministic',
      },
      {
        index: 1,
        word: 'الْمَسْجِدِ',
        normalized: 'المسجد',
        posAr: 'اسم معرفة',
        posEn: 'Definite Noun',
        roleAr: 'مضاف إليه',
        roleEn: 'Genitive Possessor (Mudaf Ilayh)',
        roleTl: 'Mudaf Ilayh (Majrur)',
        irabState: 'مجرور',
        irabClassification: 'لفظي',
        markerAr: 'علامة جره الكسرة الظاهرة',
        markerEn: 'Explicit Kasra (ِ)',
        amilAr: 'الإضافة (المضاف: بَابُ)',
        amilEn: 'Governed by Idafa (بَابُ)',
        relationNote: { ar: 'يعرِّف المضاف (بَابُ) ويخصصه.', en: 'Defines and specifies بَابُ.', tl: 'Nagbibigay-linaw sa بَابُ.' },
        explanation: { ar: 'مضاف إليه مجرور وعلامة جره الكسرة الظاهرة على آخره.', en: 'Mudaf Ilayh always in Jarr, marked here by explicit Kasra.', tl: 'Mudaf Ilayh na palaging Majrur.' },
        confidence: 'deterministic',
      },
      {
        index: 2,
        word: 'مَفْتُوحٌ',
        normalized: 'مفتوح',
        posAr: 'اسم مفعول',
        posEn: 'Passive Participle',
        roleAr: 'خبر المبتدأ',
        roleEn: 'Predicate (Khabar)',
        roleTl: 'Panaguri (Khabar)',
        irabState: 'مرفوع',
        irabClassification: 'لفظي',
        markerAr: 'علامة رفعه الضمة الظاهرة',
        markerEn: 'Explicit Damma (ٌ)',
        amilAr: 'المبتدأ (بَابُ)',
        amilEn: 'Governed by Mubtada',
        relationNote: { ar: 'يخبر عن (بَابُ الْمَسْجِدِ).', en: 'Predicates state of the mosque door.', tl: 'Naglalarawan sa pinto ng mosque.' },
        explanation: { ar: 'خبر المبتدأ مرفوع وعلامة رفعه الضمة الظاهرة.', en: 'Khabar in Raf\' marked by explicit Damma.', tl: 'Khabar na Marfu\' na may malinaw na Damma.' },
        confidence: 'deterministic',
      },
    ],
  },
];

// Offline lexical tables for rule-based Arabic sentence parsing
const PREPOSITIONS = new Set(['من', 'إلى', 'الى', 'عن', 'على', 'في', 'ب', 'ك', 'ل', 'حتى', 'منذ', 'مذ', 'رب']);
const NASB_PARTICLES = new Set(['أن', 'ان', 'لن', 'كي', 'لكي', 'إذن', 'اذن']);
const JAZM_PARTICLES = new Set(['لم', 'لما', 'إن', 'ان']);
const INNA_SISTERS = new Set(['إن', 'أن', 'كأن', 'لكن', 'ليت', 'لعل']);
const KANA_SISTERS = new Set(['كان', 'أصبح', 'أضحى', 'ظل', 'أمسى', 'بات', 'صار', 'ليس', 'مازال', 'مادام']);
const CONJUNCTIONS = new Set(['و', 'ف', 'ثم', 'أو', 'أم', 'بل', 'لكن']);
const VOCATIVE_PARTICLES = new Set(['يا', 'أيا', 'هيا', 'أي']);
const EXCEPTION_PARTICLES = new Set(['إلا', 'غير', 'سوى']);
const PRONOUNS_SET = new Set(['هو', 'هما', 'هم', 'هي', 'هن', 'أنت', 'أنتما', 'أنتم', 'أنتن', 'أنا', 'نحن']);
const DEMONSTRATIVES = new Set(['هذا', 'هذه', 'هذان', 'هتان', 'هؤلاء', 'ذلك', 'تلك', 'أولئك']);
const RELATIVES = new Set(['الذي', 'التي', 'اللذان', 'اللتان', 'الذين', 'اللواتي', 'اللاتي']);
const KNOWN_PAST_VERBS = new Set(['كتب', 'قرأ', 'ذهب', 'جلس', 'فتح', 'نصر', 'ضرب', 'علم', 'فهم', 'أكل', 'أخذ', 'سأل', 'قال', 'باع', 'وعد', 'وجد', 'وصل', 'دعا', 'رمى', 'سعى', 'حضر', 'أكرم', 'علم', 'تعلم', 'استغفر', 'وقف', 'جاء', 'نجح', 'شرب', 'خرج', 'دخل']);
const KNOWN_PASSIVE_PAST = new Set(['كُتِبَ', 'قُرِئَ', 'فُتِحَ', 'نُصِرَ', 'ضُرِبَ', 'عُلِمَ', 'فُهِمَ', 'أُكِلَ', 'أُخِذَ', 'سُئِلَ', 'قِيلَ', 'بِيعَ']);

function getFinalEndingInfo(word: string): {
  caseGuess: IrabState | null;
  markerAr: string;
  markerEn: string;
  hasExplicitHarakat: boolean;
} {
  const last = word.slice(-1);
  const lastTwo = word.slice(-2);
  const norm = stripDiacritics(word);

  if (last === '\u064F' || last === '\u064C') {
    return { caseGuess: 'مرفوع', markerAr: 'الضمة الظاهرة', markerEn: 'Explicit Damma', hasExplicitHarakat: true };
  }
  if (last === '\u064E' || last === '\u064B' || lastTwo === '\u064Bا' || lastTwo === 'ا\u064B') {
    return { caseGuess: 'منصوب', markerAr: 'الفتحة الظاهرة', markerEn: 'Explicit Fatha', hasExplicitHarakat: true };
  }
  if (last === '\u0650' || last === '\u064D') {
    return { caseGuess: 'مجرور', markerAr: 'الكسرة الظاهرة', markerEn: 'Explicit Kasra', hasExplicitHarakat: true };
  }
  if (last === '\u0652') {
    return { caseGuess: 'مجزوم', markerAr: 'السكون الظاهر', markerEn: 'Explicit Sukun', hasExplicitHarakat: true };
  }
  if (norm.endsWith('ون') && norm.length > 3) {
    return { caseGuess: 'مرفوع', markerAr: 'الواو (جمع مذكر سالم) أو ثبوت النون', markerEn: 'Waw (SMP) or Nun (Five Verbs)', hasExplicitHarakat: false };
  }
  if (norm.endsWith('ان') && norm.length > 3 && !norm.startsWith('ال')) {
    return { caseGuess: 'مرفوع', markerAr: 'الألف (مثنى) أو ثبوت النون', markerEn: 'Alif (Dual) or Nun (Five Verbs)', hasExplicitHarakat: false };
  }
  return { caseGuess: null, markerAr: 'غير مضبوط بالشكل النهائي', markerEn: 'Unvocalized ending', hasExplicitHarakat: false };
}

function looksLikeMudhari(norm: string): boolean {
  return (
    norm.length >= 4 &&
    (norm.startsWith('ي') || norm.startsWith('ت') || norm.startsWith('أ') || norm.startsWith('ن')) &&
    !norm.startsWith('ال')
  );
}

export function analyzeArabicSentence(rawInput: string): IrabSentenceResult {
  const cleaned = rawInput.trim().replace(/[،.؟!؛:«»"()]/g, ' ').replace(/\s+/g, ' ');
  if (!cleaned) {
    return {
      sentence: '',
      sentenceTypeAr: 'جملة غير مكتملة',
      sentenceTypeEn: 'Empty Input',
      translation: { ar: 'أدخل جملة عربية لتحليلها.', en: 'Enter an Arabic sentence to analyze.', tl: 'Maglagay ng pangungusap sa Arabic.' },
      tokens: [],
      structuralOverview: { ar: '', en: '', tl: '' },
      hasAmbiguity: false,
      isVerifiedPreset: false,
    };
  }

  // 1. Exact or diacritic-insensitive match against verified corpus
  const normInput = stripDiacritics(cleaned);
  const preset = PRESET_IRAB_SENTENCES.find(
    (s) => s.sentence === cleaned || stripDiacritics(s.sentence) === normInput
  );
  if (preset) {
    return preset;
  }

  // 2. Rule-based offline syntactic analyzer
  const rawWords = cleaned.split(' ').filter(Boolean);
  const tokens: IrabTokenAnalysis[] = [];
  let clauseType: IrabSentenceResult['sentenceTypeAr'] = 'تركيب نحوي';
  let expectPrepObject = false;
  let expectNasbVerb = false;
  let expectJazmVerb = false;
  let innaActive = false;
  let innaNameAssigned = false;
  let kanaActive = false;
  let kanaNameAssigned = false;
  let verbSeen = false;
  let passiveVerbSeen = false;
  let failSeen = false;
  let mubtadaSeen = false;
  let hasAmbiguity = false;
  let prevWordWasMudafCandidate = false;
  let lastAmil = 'السياق النحوي';
  let lastAmilEn = 'Syntactic context';

  for (let i = 0; i < rawWords.length; i++) {
    const word = rawWords[i];
    const norm = stripDiacritics(word);
    const ending = getFinalEndingInfo(word);

    // A. Prepositions
    if (PREPOSITIONS.has(norm)) {
      expectPrepObject = true;
      lastAmil = `حرف الجر (${word})`;
      lastAmilEn = `Preposition (${word})`;
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: 'حرف جر',
        posEn: 'Preposition',
        roleAr: 'حرف جر',
        roleEn: 'Preposition (Harf Jarr)',
        roleTl: 'Pang-ukol (Harf Jarr)',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني لا محل له من الإعراب',
        markerEn: 'Indeclinable particle',
        amilAr: 'عامل يجر الاسم الذي يليه',
        amilEn: 'Governs following noun in Jarr',
        relationNote: { ar: 'يجر الاسم بعده.', en: 'Places the next noun in Jarr.', tl: 'Nagbibigay ng Jarr sa susunod na pangngalan.' },
        explanation: { ar: 'حرف جر مبني لا محل له من الإعراب، يجر الاسم الظاهر بعده.', en: 'Preposition that places the following noun in the genitive case (Jarr).', tl: 'Pang-ukol na nagbibigay ng Jarr sa kasunod na pangngalan.' },
        confidence: 'deterministic',
      });
      prevWordWasMudafCandidate = false;
      continue;
    }

    // B. Inna & Sisters (distinguish إِنَّ vs إِنْ if vocalized)
    if (word.startsWith('إِنَّ') || word.startsWith('أَنَّ') || (INNA_SISTERS.has(norm) && norm !== 'إن' && norm !== 'أن')) {
      clauseType = 'جملة اسمية';
      innaActive = true;
      innaNameAssigned = false;
      lastAmil = `الحرف الناسخ (${word})`;
      lastAmilEn = `Inna-sister (${word})`;
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: 'حرف ناسخ من أخوات إنَّ',
        posEn: 'Inna-sister Particle',
        roleAr: 'حرف ناسخ',
        roleEn: 'Inna-sister (Harf Nasikh)',
        roleTl: 'Katagang Inna',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني لا محل له من الإعراب',
        markerEn: 'Indeclinable particle',
        amilAr: 'ينصب الاسم ويرفع الخبر',
        amilEn: 'Governs Ism (Nasb) & Khabar (Raf\')',
        relationNote: { ar: 'يدخل على الجملة الاسمية فينصب المبتدأ ويرفع الخبر.', en: 'Governs Ism Inna in Nasb and Khabar Inna in Raf\'.', tl: 'Ginagawang Mansub ang Ism at Marfu\' ang Khabar.' },
        explanation: { ar: 'حرف مشبه بالفعل مبني لا محل له من الإعراب.', en: 'Inna-sister particle, indeclinable.', tl: 'Katagang Inna na nakapirmi.' },
        confidence: 'deterministic',
      });
      prevWordWasMudafCandidate = false;
      continue;
    }

    // C. Kana & Sisters
    if (KANA_SISTERS.has(norm)) {
      clauseType = 'جملة اسمية';
      kanaActive = true;
      kanaNameAssigned = false;
      lastAmil = `الفعل الناقص (${word})`;
      lastAmilEn = `Kana-sister (${word})`;
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: 'فعل ماضٍ ناقص ناسخ',
        posEn: 'Deficient Verb (Kana-sister)',
        roleAr: 'فعل ماضٍ ناقص',
        roleEn: 'Kana-sister Verb',
        roleTl: 'Pandiwang Kana',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني على الفتح',
        markerEn: 'Built on Fatha',
        amilAr: 'يرفع الاسم وينصب الخبر',
        amilEn: 'Governs Ism (Raf\') & Khabar (Nasb)',
        relationNote: { ar: 'يرفع المبتدأ اسمًا له وينصب الخبر خبرًا له.', en: 'Keeps Ism Kana Marfu\' and makes Khabar Kana Mansub.', tl: 'Pinapanatili na Marfu\' ang Ism at Mansub ang Khabar.' },
        explanation: { ar: 'فعل ماضٍ ناقص مبني على الفتح.', en: 'Deficient copular verb built on Fatha.', tl: 'Pandiwang Kana na nakapirmi sa Fatha.' },
        confidence: 'deterministic',
      });
      prevWordWasMudafCandidate = false;
      continue;
    }

    // D. Nasb & Jazm particles
    if (NASB_PARTICLES.has(norm) && norm !== 'ان') {
      expectNasbVerb = true;
      lastAmil = `أداة النصب (${word})`;
      lastAmilEn = `Subjunctive particle (${word})`;
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: 'حرف نصب',
        posEn: 'Subjunctive Particle',
        roleAr: 'حرف نصب',
        roleEn: 'Subjunctive Particle (Harf Nasb)',
        roleTl: 'Katagang Panubali (Nasb)',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني على السكون لا محل له من الإعراب',
        markerEn: 'Built on Sukun',
        amilAr: 'ينصب الفعل المضارع بعده',
        amilEn: 'Governs next Mudhari in Nasb',
        relationNote: { ar: 'ينصب الفعل المضارع.', en: 'Places following Mudhari in Nasb.', tl: 'Nagbibigay ng Nasb sa susunod na pandiwa.' },
        explanation: { ar: 'حرف نصب ومصدر/نفي واستقبال مبني على السكون.', en: 'Subjunctive particle governing present verbs in Nasb.', tl: 'Katagang Nasb na nakapirmi.' },
        confidence: 'deterministic',
      });
      continue;
    }

    if (JAZM_PARTICLES.has(norm) && norm !== 'ان') {
      expectJazmVerb = true;
      lastAmil = `أداة الجزم (${word})`;
      lastAmilEn = `Jussive particle (${word})`;
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: 'حرف جزم',
        posEn: 'Jussive Particle',
        roleAr: 'حرف جزم',
        roleEn: 'Jussive Particle (Harf Jazm)',
        roleTl: 'Katagang Jussive',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني على السكون لا محل له من الإعراب',
        markerEn: 'Built on Sukun',
        amilAr: 'يجزم الفعل المضارع بعده',
        amilEn: 'Governs next Mudhari in Jazm',
        relationNote: { ar: 'يجزم الفعل المضارع.', en: 'Places following Mudhari in Jazm.', tl: 'Nagbibigay ng Jazm sa susunod na pandiwa.' },
        explanation: { ar: 'حرف نفي وجزم وقلب مبني على السكون.', en: 'Jussive particle governing Mudhari in Jazm.', tl: 'Katagang Jussive.' },
        confidence: 'deterministic',
      });
      continue;
    }

    // E. Conjunctions, Vocatives, Exception
    if (CONJUNCTIONS.has(norm) || VOCATIVE_PARTICLES.has(norm) || EXCEPTION_PARTICLES.has(norm)) {
      const isVoc = VOCATIVE_PARTICLES.has(norm);
      const isExc = EXCEPTION_PARTICLES.has(norm);
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: isVoc ? 'أداة نداء' : isExc ? 'أداة استثناء' : 'حرف عطف',
        posEn: isVoc ? 'Vocative Particle' : isExc ? 'Exception Particle' : 'Conjunction',
        roleAr: isVoc ? 'حرف نداء' : isExc ? 'أداة استثناء' : 'حرف عطف',
        roleEn: isVoc ? 'Vocative Particle' : isExc ? 'Exception Particle' : 'Conjunction',
        roleTl: isVoc ? 'Pantawag' : isExc ? 'Katagang Pagbubukod' : 'Pang-ugnay',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني لا محل له من الإعراب',
        markerEn: 'Indeclinable particle',
        amilAr: isVoc ? 'ينصب المنادى أو يبنيه' : 'أداة ربط',
        amilEn: isVoc ? 'Governs vocative noun' : 'Connective particle',
        relationNote: { ar: 'يربط أو يوجه التركيب النحوي.', en: 'Connects or frames clause structure.', tl: 'Nag-uugnay ng bahagi ng pangungusap.' },
        explanation: { ar: 'حرف مبني لا محل له من الإعراب.', en: 'Indeclinable functional particle.', tl: 'Katagang nakapirmi.' },
        confidence: 'deterministic',
      });
      prevWordWasMudafCandidate = false;
      continue;
    }

    // F. Pronouns, Demonstratives, Relatives
    if (PRONOUNS_SET.has(norm) || DEMONSTRATIVES.has(norm) || RELATIVES.has(norm)) {
      const isFirstNominal = i === 0 && !verbSeen;
      if (isFirstNominal) {
        clauseType = 'جملة اسمية';
        mubtadaSeen = true;
      }
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: PRONOUNS_SET.has(norm) ? 'ضمير منفصل' : DEMONSTRATIVES.has(norm) ? 'اسم إشارة' : 'اسم موصول',
        posEn: PRONOUNS_SET.has(norm) ? 'Detached Pronoun' : DEMONSTRATIVES.has(norm) ? 'Demonstrative' : 'Relative Pronoun',
        roleAr: isFirstNominal ? 'في محل رفع مبتدأ' : 'اسم مبني (محلي)',
        roleEn: isFirstNominal ? 'Mubtada (Local Raf\')' : 'Indeclinable Nominal (Local I\'rab)',
        roleTl: isFirstNominal ? 'Mubtada (Local Raf\')' : 'Pangngalang Nakapirmi',
        irabState: 'مبني',
        irabClassification: 'محلي',
        markerAr: isFirstNominal ? 'مبني في محل رفع مبتدأ' : 'مبني في محل رفع/نصب/جر حسب موقعه',
        markerEn: isFirstNominal ? 'Indeclinable, in local position of Raf\' (Mubtada)' : 'Indeclinable, local I\'rab position',
        amilAr: isFirstNominal ? 'الابتداء' : lastAmil,
        amilEn: isFirstNominal ? 'Initial position' : lastAmilEn,
        relationNote: { ar: 'الأسماء المبنية يكون إعرابها محليًّا.', en: 'Indeclinable nominals carry Local I\'rab (إعراب محلي).', tl: 'Ang mga nakapirming pangngalan ay may Local I\'rab.' },
        explanation: { ar: 'اسم مبني يُعرب في محل (رفع أو نصب أو جر) بحسب موقعه في الجملة.', en: 'Indeclinable noun assigned a local syntactic position (Mahalli).', tl: 'Nakapirming pangngalan na sinusuri ayon sa posisyon.' },
        confidence: isFirstNominal ? 'deterministic' : 'ambiguous',
        alternatives: isFirstNominal ? undefined : ['مبتدأ مؤخر', 'فاعل', 'مفعول به', 'اسم مجرور'],
      });
      continue;
    }

    // G. Prepositional object expected
    if (expectPrepObject) {
      expectPrepObject = false;
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: 'اسم',
        posEn: 'Noun',
        roleAr: 'اسم مجرور',
        roleEn: 'Genitive Noun (Ism Majrur)',
        roleTl: 'Pangngalang Majrur',
        irabState: 'مجرور',
        irabClassification: norm.endsWith('ى') || norm.endsWith('ا') ? 'تقديري' : 'لفظي',
        markerAr: ending.caseGuess === 'مجرور' ? 'علامة جره الكسرة الظاهرة' : 'مجرور (بالكسرة أو الياء)',
        markerEn: ending.caseGuess === 'مجرور' ? 'Explicit Kasra' : 'Jarr (Kasra or Ya)',
        amilAr: lastAmil,
        amilEn: lastAmilEn,
        relationNote: { ar: 'مجرور بحرف الجر السابق.', en: 'Governed in Jarr by preceding preposition.', tl: 'Pinamamahalaan ng naunang pang-ukol.' },
        explanation: { ar: 'اسم مجرور بحرف الجر، وعلامة جره الكسرة الظاهرة أو المقدرة أو الياء في المثنى والجمع.', en: 'Genitive noun governed by the preceding preposition.', tl: 'Pangngalang nasa kasong Majrur dahil sa pang-ukol.' },
        confidence: 'deterministic',
      });
      prevWordWasMudafCandidate = true;
      continue;
    }

    // H. Mudhari verb (especially after Nasb/Jazm or verb-like)
    if (expectNasbVerb || expectJazmVerb || (looksLikeMudhari(norm) && !mubtadaSeen && i <= 1)) {
      const state: IrabState = expectJazmVerb ? 'مجزوم' : expectNasbVerb ? 'منصوب' : 'مرفوع';
      const amilText = expectJazmVerb || expectNasbVerb ? lastAmil : 'التجرد من الناصب والجازم';
      const amilTextEn = expectJazmVerb || expectNasbVerb ? lastAmilEn : 'Absence of Nasb/Jazm governors';
      expectNasbVerb = false;
      expectJazmVerb = false;
      verbSeen = true;
      if (clauseType === 'تركيب نحوي') clauseType = 'جملة فعلية';
      lastAmil = `الفعل (${word})`;
      lastAmilEn = `Verb (${word})`;
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: 'فعل مضارع',
        posEn: 'Present Verb',
        roleAr: `فعل مضارع ${state}`,
        roleEn: `Present Verb (${state === 'مرفوع' ? 'Marfu\'' : state === 'منصوب' ? 'Mansub' : 'Majzum'})`,
        roleTl: `Pandiwang Pangkasalukuyan (${state})`,
        irabState: state,
        irabClassification: 'لفظي',
        markerAr: state === 'مرفوع' ? 'الضمة أو ثبوت النون' : state === 'منصوب' ? 'الفتحة أو حذف النون' : 'السكون أو حذف النون/حرف العلة',
        markerEn: state === 'مرفوع' ? 'Damma or Nun' : state === 'منصوب' ? 'Fatha or dropped Nun' : 'Sukun or dropped Nun/weak letter',
        amilAr: amilText,
        amilEn: amilTextEn,
        relationNote: { ar: 'فعل مضارع معرب يعمل فيما بعده.', en: 'Declinable Mudhari verb governing its arguments.', tl: 'Nagbabagong pandiwang Mudhari.' },
        explanation: { ar: `فعل مضارع ${state} لتأثره بـ(${amilText}).`, en: `Present verb in ${state} state due to ${amilTextEn}.`, tl: `Pandiwang Mudhari na nasa kasong ${state}.` },
        confidence: 'deterministic',
      });
      prevWordWasMudafCandidate = false;
      continue;
    }

    // I. Past verb detection (known lexicon or passive pattern)
    const isPassivePast = KNOWN_PASSIVE_PAST.has(word);
    const isKnownPast = KNOWN_PAST_VERBS.has(norm) || isPassivePast;
    if (isKnownPast && !mubtadaSeen && i === 0) {
      verbSeen = true;
      passiveVerbSeen = isPassivePast;
      clauseType = 'جملة فعلية';
      lastAmil = `الفعل (${word})`;
      lastAmilEn = `Verb (${word})`;
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: isPassivePast ? 'فعل ماضٍ مبني للمجهول' : 'فعل ماضٍ',
        posEn: isPassivePast ? 'Passive Past Verb' : 'Past Tense Verb',
        roleAr: isPassivePast ? 'فعل ماضٍ مبني للمجهول' : 'فعل ماضٍ',
        roleEn: isPassivePast ? 'Passive Past Verb' : 'Past Tense Verb',
        roleTl: isPassivePast ? 'Pandiwang Passive' : 'Pandiwang Pangnakaraan',
        irabState: 'مبني',
        irabClassification: 'مبني',
        markerAr: 'مبني على الفتح',
        markerEn: 'Built on Fatha',
        amilAr: isPassivePast ? 'يرفع نائب الفاعل' : 'يرفع الفاعل وينصب المفعول به',
        amilEn: isPassivePast ? 'Governs Na\'ib al-Fa\'il' : 'Governs Fa\'il & Maf\'ul Bihi',
        relationNote: { ar: 'رأس الجملة الفعلية.', en: 'Head of the verbal sentence.', tl: 'Puno ng pangungusap na pandiwa.' },
        explanation: { ar: isPassivePast ? 'فعل ماضٍ مبني للمجهول مبني على الفتح.' : 'فعل ماضٍ مبني على الفتح.', en: isPassivePast ? 'Passive past verb built on Fatha.' : 'Active past verb built on Fatha.', tl: 'Pandiwang pangnakaraan na nakapirmi sa Fatha.' },
        confidence: 'deterministic',
      });
      prevWordWasMudafCandidate = false;
      continue;
    }

    // J. Nominal roles under Inna / Kana / Verbal / Nominal clauses
    if (innaActive) {
      if (!innaNameAssigned) {
        innaNameAssigned = true;
        tokens.push({
          index: i,
          word,
          normalized: norm,
          posAr: 'اسم',
          posEn: 'Noun',
          roleAr: 'اسم إنَّ',
          roleEn: 'Ism Inna',
          roleTl: 'Pangngalan ng Inna',
          irabState: 'منصوب',
          irabClassification: 'لفظي',
          markerAr: ending.hasExplicitHarakat ? ending.markerAr : 'منصوب بالفتحة أو الياء',
          markerEn: ending.hasExplicitHarakat ? ending.markerEn : 'Mansub (Fatha/Ya)',
          amilAr: lastAmil,
          amilEn: lastAmilEn,
          relationNote: { ar: 'اسم الحرف الناسخ.', en: 'Subject of Inna.', tl: 'Paksa ng Inna.' },
          explanation: { ar: 'اسم إِنَّ منصوب.', en: 'Ism Inna in the accusative case.', tl: 'Ism Inna na Mansub.' },
          confidence: ending.caseGuess === 'منصوب' || !ending.hasExplicitHarakat ? 'deterministic' : 'ambiguous',
        });
        prevWordWasMudafCandidate = !norm.startsWith('ال');
        continue;
      } else {
        tokens.push({
          index: i,
          word,
          normalized: norm,
          posAr: 'اسم',
          posEn: 'Noun / Adjective',
          roleAr: 'خبر إنَّ',
          roleEn: 'Khabar Inna',
          roleTl: 'Panaguri ng Inna',
          irabState: 'مرفوع',
          irabClassification: 'لفظي',
          markerAr: ending.hasExplicitHarakat ? ending.markerAr : 'مرفوع بالضمة',
          markerEn: ending.hasExplicitHarakat ? ending.markerEn : 'Marfu\' (Damma)',
          amilAr: lastAmil,
          amilEn: lastAmilEn,
          relationNote: { ar: 'خبر الحرف الناسخ.', en: 'Predicate of Inna.', tl: 'Panaguri ng Inna.' },
          explanation: { ar: 'خبر إِنَّ مرفوع.', en: 'Khabar Inna in the nominative case.', tl: 'Khabar Inna na Marfu\'.' },
          confidence: ending.hasExplicitHarakat ? 'deterministic' : 'ambiguous',
        });
        continue;
      }
    }

    if (kanaActive) {
      if (!kanaNameAssigned) {
        kanaNameAssigned = true;
        tokens.push({
          index: i,
          word,
          normalized: norm,
          posAr: 'اسم',
          posEn: 'Noun',
          roleAr: 'اسم كان',
          roleEn: 'Ism Kana',
          roleTl: 'Pangngalan ng Kana',
          irabState: 'مرفوع',
          irabClassification: 'لفظي',
          markerAr: ending.hasExplicitHarakat ? ending.markerAr : 'مرفوع بالضمة',
          markerEn: ending.hasExplicitHarakat ? ending.markerEn : 'Marfu\' (Damma)',
          amilAr: lastAmil,
          amilEn: lastAmilEn,
          relationNote: { ar: 'اسم الفعل الناسخ.', en: 'Subject of Kana.', tl: 'Paksa ng Kana.' },
          explanation: { ar: 'اسم كان مرفوع.', en: 'Ism Kana in the nominative case.', tl: 'Ism Kana na Marfu\'.' },
          confidence: 'deterministic',
        });
        continue;
      } else {
        tokens.push({
          index: i,
          word,
          normalized: norm,
          posAr: 'اسم',
          posEn: 'Noun / Adjective',
          roleAr: 'خبر كان',
          roleEn: 'Khabar Kana',
          roleTl: 'Panaguri ng Kana',
          irabState: 'منصوب',
          irabClassification: 'لفظي',
          markerAr: ending.hasExplicitHarakat ? ending.markerAr : 'منصوب بالفتحة',
          markerEn: ending.hasExplicitHarakat ? ending.markerEn : 'Mansub (Fatha)',
          amilAr: lastAmil,
          amilEn: lastAmilEn,
          relationNote: { ar: 'خبر الفعل الناسخ.', en: 'Predicate of Kana.', tl: 'Panaguri ng Kana.' },
          explanation: { ar: 'خبر كان منصوب.', en: 'Khabar Kana in the accusative case.', tl: 'Khabar Kana na Mansub.' },
          confidence: 'deterministic',
        });
        continue;
      }
    }

    // K. Verbal clause nouns
    if (verbSeen) {
      if (!failSeen && (ending.caseGuess === 'مرفوع' || !ending.hasExplicitHarakat)) {
        failSeen = true;
        if (!ending.hasExplicitHarakat) hasAmbiguity = true;
        tokens.push({
          index: i,
          word,
          normalized: norm,
          posAr: 'اسم',
          posEn: 'Noun',
          roleAr: passiveVerbSeen ? 'نائب فاعل' : 'فاعل',
          roleEn: passiveVerbSeen ? 'Deputy Subject (Na\'ib al-Fa\'il)' : 'Subject (Fa\'il)',
          roleTl: passiveVerbSeen ? 'Na\'ib al-Fa\'il' : 'Simuno (Fa\'il)',
          irabState: 'مرفوع',
          irabClassification: 'لفظي',
          markerAr: ending.hasExplicitHarakat ? ending.markerAr : 'يُرجَّح الرفع (لم تُضبط الحركة)',
          markerEn: ending.hasExplicitHarakat ? ending.markerEn : 'Expected Raf\' (unvocalized ending)',
          amilAr: lastAmil,
          amilEn: lastAmilEn,
          relationNote: { ar: 'مرفوع بالفعل السابق.', en: 'Nominative argument of the verb.', tl: 'Marfu\' dahil sa pandiwa.' },
          explanation: { ar: passiveVerbSeen ? 'نائب فاعل مرفوع.' : 'فاعل مرفوع.', en: passiveVerbSeen ? 'Deputy subject in Raf\'.' : 'Subject (Fa\'il) in Raf\'.', tl: 'Simuno na nasa kasong Marfu\'.' },
          confidence: ending.hasExplicitHarakat ? 'deterministic' : 'ambiguous',
          alternatives: ending.hasExplicitHarakat ? undefined : ['فاعل مرفوع', 'مفعول به مقدّم منصوب'],
        });
        prevWordWasMudafCandidate = !norm.startsWith('ال');
        continue;
      }

      if (ending.caseGuess === 'مجرور' || (prevWordWasMudafCandidate && norm.startsWith('ال') && !ending.hasExplicitHarakat)) {
        if (!ending.hasExplicitHarakat) hasAmbiguity = true;
        tokens.push({
          index: i,
          word,
          normalized: norm,
          posAr: 'اسم',
          posEn: 'Noun',
          roleAr: 'مضاف إليه',
          roleEn: 'Mudaf Ilayh',
          roleTl: 'Mudaf Ilayh (Majrur)',
          irabState: 'مجرور',
          irabClassification: 'لفظي',
          markerAr: ending.hasExplicitHarakat ? ending.markerAr : 'الكسرة (مضاف إليه محتمل)',
          markerEn: ending.hasExplicitHarakat ? ending.markerEn : 'Kasra (candidate Mudaf Ilayh)',
          amilAr: 'الإضافة',
          amilEn: 'Idafa construction',
          relationNote: { ar: 'مضاف إليه مجرور بعد اسم نكرة.', en: 'Genitive possessor following indefinite noun.', tl: 'Kasunod ng di-tiyak na pangngalan sa Idafa.' },
          explanation: { ar: 'مضاف إليه مجرور وعلامة جره الكسرة.', en: 'Mudaf Ilayh in Jarr.', tl: 'Mudaf Ilayh na nasa kasong Majrur.' },
          confidence: ending.hasExplicitHarakat ? 'deterministic' : 'ambiguous',
          alternatives: ending.hasExplicitHarakat ? undefined : ['مضاف إليه مجرور', 'مفعول به منصوب'],
        });
        prevWordWasMudafCandidate = false;
        continue;
      }

      // Otherwise Maf'ul Bihi or Na't
      if (!ending.hasExplicitHarakat) hasAmbiguity = true;
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: 'اسم',
        posEn: 'Noun / Modifier',
        roleAr: ending.caseGuess === 'مرفوع' ? 'نعت مرفوع أو بدل' : 'مفعول به',
        roleEn: ending.caseGuess === 'مرفوع' ? 'Nominative Adjective (Na\'t)' : 'Direct Object (Maf\'ul Bihi)',
        roleTl: ending.caseGuess === 'مرفوع' ? 'Pang-uri (Na\'t)' : 'Tuwirang Layon (Maf\'ul Bihi)',
        irabState: ending.caseGuess ?? 'منصوب',
        irabClassification: 'لفظي',
        markerAr: ending.hasExplicitHarakat ? ending.markerAr : 'غير مضبوط (يُرجَّح النصب)',
        markerEn: ending.hasExplicitHarakat ? ending.markerEn : 'Unvocalized (likely Nasb)',
        amilAr: lastAmil,
        amilEn: lastAmilEn,
        relationNote: { ar: 'مكمل في الجملة الفعلية.', en: 'Complement in the verbal clause.', tl: 'Kaganapan ng pandiwa.' },
        explanation: { ar: 'مفعول به منصوب إذا وقع عليه الفعل، أو تابع إذا وافق ما قبله.', en: 'Direct object in Nasb (or appositive modifier if agreeing in case).', tl: 'Tuwirang layon na Mansub.' },
        confidence: ending.hasExplicitHarakat ? 'deterministic' : 'ambiguous',
        alternatives: ['مفعول به منصوب', 'نعت', 'حال منصوب', 'مفعول مطلق'],
      });
      continue;
    }

    // L. Nominal Sentence fallback (Mubtada / Mudaf Ilayh / Khabar)
    if (!mubtadaSeen) {
      mubtadaSeen = true;
      clauseType = 'جملة اسمية';
      if (!ending.hasExplicitHarakat) hasAmbiguity = true;
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: 'اسم',
        posEn: 'Noun',
        roleAr: 'مبتدأ',
        roleEn: 'Subject (Mubtada)',
        roleTl: 'Simuno (Mubtada)',
        irabState: 'مرفوع',
        irabClassification: 'لفظي',
        markerAr: ending.hasExplicitHarakat ? ending.markerAr : 'الضمة (بحسب الابتداء)',
        markerEn: ending.hasExplicitHarakat ? ending.markerEn : 'Damma (initial nominal)',
        amilAr: 'الابتداء',
        amilEn: 'Initial position (Ibtida)',
        relationNote: { ar: 'يحتاج إلى خبر يتمم المعنى.', en: 'Requires a Khabar predicate.', tl: 'Nangangailangan ng Khabar.' },
        explanation: { ar: 'مبتدأ مرفوع وعلامة رفعه الضمة.', en: 'Subject of a nominal sentence (Mubtada) in Raf\'.', tl: 'Mubtada na nasa kasong Marfu\'.' },
        confidence: ending.hasExplicitHarakat ? 'deterministic' : 'ambiguous',
        alternatives: ending.hasExplicitHarakat ? undefined : ['مبتدأ مرفوع', 'فعل ماضٍ (إذا كانت الكلمة فعلًا غير مشكول)'],
      });
      prevWordWasMudafCandidate = !norm.startsWith('ال');
      continue;
    }

    if (prevWordWasMudafCandidate && norm.startsWith('ال')) {
      prevWordWasMudafCandidate = false;
      tokens.push({
        index: i,
        word,
        normalized: norm,
        posAr: 'اسم معرفة',
        posEn: 'Definite Noun',
        roleAr: 'مضاف إليه',
        roleEn: 'Genitive Possessor (Mudaf Ilayh)',
        roleTl: 'Mudaf Ilayh (Majrur)',
        irabState: 'مجرور',
        irabClassification: 'لفظي',
        markerAr: ending.hasExplicitHarakat ? ending.markerAr : 'الكسرة',
        markerEn: ending.hasExplicitHarakat ? ending.markerEn : 'Kasra',
        amilAr: 'الإضافة',
        amilEn: 'Idafa construction',
        relationNote: { ar: 'مجرور بالإضافة.', en: 'Governed in Jarr by Idafa.', tl: 'Majrur sa Idafa.' },
        explanation: { ar: 'مضاف إليه مجرور وعلامة جره الكسرة.', en: 'Mudaf Ilayh in Jarr.', tl: 'Mudaf Ilayh na Majrur.' },
        confidence: ending.hasExplicitHarakat ? 'deterministic' : 'ambiguous',
      });
      continue;
    }

    hasAmbiguity = true;
    tokens.push({
      index: i,
      word,
      normalized: norm,
      posAr: 'اسم / كلمة',
      posEn: 'Noun / Predicate Candidate',
      roleAr: ending.caseGuess === 'مرفوع' ? 'خبر المبتدأ' : 'يحتاج تحليلًا يدويًّا',
      roleEn: ending.caseGuess === 'مرفوع' ? 'Predicate (Khabar)' : 'Requires manual verification',
      roleTl: ending.caseGuess === 'مرفوع' ? 'Khabar' : 'Kailangan ng manwal na pagsusuri',
      irabState: ending.caseGuess ?? 'مرفوع',
      irabClassification: 'لفظي',
      markerAr: ending.markerAr,
      markerEn: ending.markerEn,
      amilAr: 'التركيب الاسمي / السياق',
      amilEn: 'Nominal predication / Context',
      relationNote: { ar: 'يُرجَّح أنه خبر أو تابع، ويمكنك تعديله في وضع التحليل اليدوي.', en: 'Likely Khabar or appositive; refine in Manual Parsing mode.', tl: 'Malamang na Khabar; maaaring i-edit sa Manual Mode.' },
      explanation: { ar: 'تحليل أولي مبني على القواعد؛ قد تتعدد الأوجه الإعرابية عند غياب الشكل أو تعدد المعاني.', en: 'Rule-based parse; multiple grammatical readings may exist without full diacritics or lexicon context.', tl: 'Pagsusuring batay sa tuntunin; maaaring may iba pang tamang pagsusuri.' },
      confidence: ending.hasExplicitHarakat ? 'ambiguous' : 'manual_needed',
      alternatives: ['خبر مرفوع', 'نعت', 'بدل', 'مفعول به', 'تمييز'],
    });
  }

  return {
    sentence: cleaned,
    sentenceTypeAr: clauseType,
    sentenceTypeEn: clauseType === 'جملة فعلية' ? 'Verbal Sentence' : clauseType === 'جملة اسمية' ? 'Nominal Sentence' : 'Grammatical Construction',
    translation: {
      ar: 'تم التحليل آليًّا بمحرك القواعد المحلي غير المتصل.',
      en: 'Analyzed offline by the rule-based Arabic grammar engine.',
      tl: 'Sinuri offline gamit ang rule-based na makina ng gramatika.',
    },
    tokens,
    hasAmbiguity,
    isVerifiedPreset: false,
    limitationNote: hasAmbiguity
      ? {
          ar: 'تنبيه علمي: التحليل الآلي غير المتصل يعتمد على القواعد الصرفية الظاهرة والحركات؛ قد تتعدد الأوجه الإعرابية إذا خلت الكلمات من الشكل، لذا يمكنك التبديل إلى «وضع التحليل اليدوي» لتدقيق كل كلمة.',
          en: 'Linguistic Note: Offline rule-based parsing relies on visible Harakat and recognized governors. Unvocalized or complex sentences may admit multiple valid parses—use Manual Parsing Mode to inspect or refine any word.',
          tl: 'Paalala: Ang offline parser ay nakabatay sa nakikitang Harakat at tuntunin. Para sa walang tuldik o kumplikadong pangungusap, gamitin ang Manual Parsing Mode.',
        }
      : undefined,
    structuralOverview: {
      ar: `نوع التركيب المرصود: ${clauseType} (${tokens.length} كلمات). اضغط على أي كلمة لعرض موقعها الإعرابي وعاملها.`,
      en: `Detected structure: ${clauseType === 'جملة فعلية' ? 'Verbal Sentence' : 'Nominal Sentence'} (${tokens.length} words). Select any word to inspect its role, I'rab state, and Amil.`,
      tl: `Natukoy na istraktura: ${clauseType} (${tokens.length} salita). Pindutin ang bawat salita para makita ang detalye.`,
    },
  };
}
