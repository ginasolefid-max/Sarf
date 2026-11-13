import type { BookChapter } from './bookChaptersPart1';

export const BOOK_CHAPTERS_PART_2: BookChapter[] = [
  {
    id: 'ch-08-derived-nouns',
    number: 8,
    title: 'Derived Nouns (Al-Mushtaqqat)',
    arabicTitle: 'المشتقات السبعة',
    summary: 'Explore Ism Fa\'il, Ism Maf\'ul, Ism Zaman/Makan, Ism Alah, Sighat al-Mubalagha, Sifa Mushabbaha, and Ism Tafdil.',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Participles: Ism Fa\'il & Ism Maf\'ul',
        body: 'From Form I, the Active Participle (اِسْمُ الْفَاعِلِ — doer) follows فَاعِلٌ (كَاتِبٌ), and the Passive Participle (اِسْمُ الْمَفْعُولِ — receiver) follows مَفْعُولٌ (مَكْتُوبٌ). From Forms II–X and Quadriliterals, replace the Mudhari prefix with مُـ (mu-), place a kasra before the final letter for Ism Fa\'il (مُعَلِّمٌ), and a fatha before the final letter for Ism Maf\'ul (مُعَلَّمٌ).',
        examples: [
          { ar: 'كَاتِبٌ / مَكْتُوبٌ', translit: 'kātibun / maktūbun', en: 'Form I Active & Passive Participles' },
          { ar: 'مُسْتَخْرِجٌ / مُسْتَخْرَجٌ', translit: 'mustakhrijun / mustakhrajun', en: 'Form X Active (kasra) & Passive (fatha)' },
        ],
      },
      {
        heading: 'Time/Place, Instrument, Intensive, Adjective & Comparative',
        body: 'Arabic derives five more rich noun families from verb roots:',
        table: {
          headers: ['Derived Noun', 'Common Patterns', 'Example'],
          rows: [
            ['Ism Zaman / Makan (Time/Place)', 'مَفْعَلٌ · مَفْعِلٌ · مُفْتَعَلٌ', 'مَكْتَبٌ (office) · مَسْجِدٌ (mosque) · مُسْتَشْفًى (hospital)'],
            ['Ism Alah (Instrument)', 'مِفْعَلٌ · مِفْعَالٌ · مِفْعَلَةٌ', 'مِفْتَاحٌ (key) · مِبْرَدٌ (file) · مِكْنَسَةٌ (broom)'],
            ['Sighat al-Mubalagha (Intensive)', 'فَعَّالٌ · فَعُولٌ · مِفْعَالٌ · فَعِيلٌ', 'غَفَّارٌ (oft-forgiving) · صَبُورٌ (very patient)'],
            ['Sifa Mushabbaha (Permanent trait)', 'فَعِيلٌ · فَعْلَانُ · أَفْعَلُ', 'كَرِيمٌ (noble) · عَطْشَانُ (thirsty) · أَحْمَرُ (red)'],
            ['Ism Tafdil (Comparative/Superlative)', 'أَفْعَلُ (fem. فُعْلَى)', 'أَكْبَرُ (greater/greatest) · كُبْرَى'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'q8-1',
        prompt: 'What distinguishes Ism Fa\'il from Ism Maf\'ul in Forms II–X?',
        arabicCue: 'مُعَلِّمٌ vs مُعَلَّمٌ',
        options: [
          'The prefix letters differ',
          'Kasra before the last letter for Fa\'il, Fatha for Maf\'ul',
          'One ends in ون and the other in ات',
          'Only Form I has Ism Maf\'ul',
        ],
        correctIndex: 1,
        explanation: 'Both start with مُـ; Ism Fa\'il has Kasra on the penultimate letter (مُعَلِّمٌ = teacher), while Ism Maf\'ul has Fatha (مُعَلَّمٌ = taught).',
      },
      {
        id: 'q8-2',
        prompt: 'Which category does مِفْتَاحٌ (key) belong to?',
        options: ['Ism Zaman', 'Ism Alah', 'Ism Tafdil', 'Sifa Mushabbaha'],
        correctIndex: 1,
        explanation: 'مِفْعَالٌ is one of the classic patterns for Ism Alah (noun of instrument).',
      },
    ],
  },
  {
    id: 'ch-09-weak-verbs-ilal',
    number: 9,
    title: 'Sound vs. Weak Verbs & I\'lal Rules',
    arabicTitle: 'الصحيح والمعتل وقواعد الإعلال',
    summary: 'Classify the 7 sub-types of Sound and Weak verbs and learn the three golden I\'lal transformations: Qalb, Iskan, and Hadhf.',
    readingMinutes: 8,
    sections: [
      {
        heading: 'Classification of Arabic Verbs',
        body: 'A verb with NO weak letters (ا و ي) is Ṣaḥīḥ (صَحِيح): Sālim (completely sound, كَتَبَ), Mahmūz (contains hamza, أَكَلَ / سَأَلَ / قَرَأَ), or Muḍāʿaf (C2 = C3, مَدَّ). A verb WITH a weak letter is Muʿtall (مُعْتَلّ): Mithāl (weak C1, وَعَدَ), Ajwaf (weak C2, قَالَ), Nāqiṣ (weak C3, دَعَا / رَمَى), or Lafīf (two weak letters, وَقَى / رَوَى).',
        table: {
          headers: ['Category', 'Position of Weakness', 'Example', 'Key Behavior'],
          rows: [
            ['Mithal (Assimilated)', 'C1 (و or ي)', 'وَعَدَ يَعِدُ', 'Waw drops in Mudhari & Amr (عِدْ)'],
            ['Ajwaf (Hollow)', 'C2 (و or ي)', 'قَالَ يَقُولُ · بَاعَ يَبِيعُ', 'Shortens before consonant suffixes (قُلْتُ · بِعْتُ)'],
            ['Naqis (Defective)', 'C3 (و or ي)', 'دَعَا يَدْعُو · رَمَى يَرْمِي', 'Final weak letter drops in Majzum & Amr (لَمْ يَدْعُ · اِرْمِ)'],
            ['Lafif Mafruq / Maqrun', 'C1+C3 or C2+C3', 'وَقَى يَقِي · رَوَى يَرْوِي', 'Combines Mithal/Naqis or stays strong in C2 (قِ)'],
          ],
        },
      },
      {
        heading: 'The Three I\'lal Rules (الإعلال)',
        body: 'Iʿlāl (الإِعْلَالُ) explains WHY weak verbs look irregular on the surface while remaining 100% logical underneath: (1) Qalb (الْقَلْبُ — transformation): vocalized و or ي after fatha turns into ا (قَوَلَ ← قَالَ, بَيَعَ ← بَاعَ). (2) Iskān (الإِسْكَانُ — silencing): a heavy damma or kasra on و/ي shifts to the preceding consonant or drops (يَقْوُلُ ← يَقُولُ). (3) Ḥadhf (الْحَذْفُ — deletion): two sukun-letters cannot meet in Arabic (التقاء الساكنين), so the weak letter drops (قُولْ ← قُلْ, وَقَوْلْتُ ← قُلْتُ).',
        examples: [
          { ar: 'قَوَلَ ← قَالَ', translit: 'qawala → qāla', en: 'I\'lal bil-Qalb: vocalized waw after fatha turns to alif' },
          { ar: 'يَقْوُلُ ← يَقُولُ', translit: 'yaqwulu → yaqūlu', en: 'I\'lal bil-Iskan: damma moves from waw to qaf' },
          { ar: 'يَقُولْ ← قُلْ', translit: 'yaqūl → qul', en: 'I\'lal bil-Hadhf: alif/waw drops when two sukuns meet' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q9-1',
        prompt: 'Why does the long vowel disappear in قُلْتُ (I said) and قُلْ (say!)?',
        arabicCue: 'قَالَ ← قُلْتُ',
        options: [
          'Because Arabic prohibits two consecutive vowelless letters (التقاء الساكنين)',
          'Because قَالَ is Form IV',
          'To distinguish masculine from feminine',
          'Because of Hamzatul Wasl',
        ],
        correctIndex: 0,
        explanation: 'When adding ـتُ or placing sukun on لْ, the weak وْ and لْ would both be vowelless; deleting the weak letter yields قُلْتُ and قُلْ.',
      },
      {
        id: 'q9-2',
        prompt: 'Which verb is an example of Lafif Mafruq (weak at both C1 and C3)?',
        options: ['رَمَى', 'وَقَى', 'رَوَى', 'قَالَ'],
        correctIndex: 1,
        explanation: 'وَقَى (root و-ق-ي) has weak C1 (و) and weak C3 (ي) separated by a strong consonant (ق). Its imperative is simply قِ!',
      },
    ],
  },
  {
    id: 'ch-10-ibdal-idgham',
    number: 10,
    title: 'Ibdal & Idgham',
    arabicTitle: 'الإبدال والإدغام',
    summary: 'Learn how Form VIII infixed ت changes into ط or د next to emphatic or voiced consonants (Ibdal) and when doubled consonants merge or split (Idgham).',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Ibdal in Form VIII (اِفْتَعَلَ)',
        body: 'Ibdāl (الإِبْدَالُ) replaces one consonant with another for smooth articulation. In Form VIII (اِفْتَعَلَ), the infixed ت adjusts to the first root letter (R1): after emphatic ص ض ط ظ, ت becomes ط (اِصْطَبَرَ, اِضْطَرَبَ, اِطَّلَعَ); after د ذ ز, ت becomes د (اِزْدَادَ, اِدَّعَى); and when R1 is و, ي, or ء (in أَخَذَ), R1 turns into ت and merges as تّ (اِتَّصَلَ, اِتَّفَقَ, اِتَّخَذَ).',
        table: {
          headers: ['Root', 'Underlying Form VIII', 'Surface Form (after Ibdal)', 'Rule'],
          rows: [
            ['ص-ب-ر', 'اِصْتَبَرَ', 'اِصْطَبَرَ', 'ت → ط after ص ض ط ظ'],
            ['ز-ي-د', 'اِزْتَادَ', 'اِزْدَادَ', 'ت → د after د ذ ز'],
            ['و-ص-ل', 'اِوْتَصَلَ', 'اِتَّصَلَ', 'و → ت + ت → تّ'],
            ['أ-خ-ذ', 'اِئْتَخَذَ', 'اِتَّخَذَ', 'ء → ت + ت → تّ'],
          ],
        },
      },
      {
        heading: 'Idgham (Geminate Merging & Splitting)',
        body: 'Idghām (الإِدْغَامُ) merges two identical adjacent consonants when the second is vocalized: مَدَدَ ← مَدَّ, يَمْدُدُ ← يَمُدُّ. However, whenever the second identical consonant must take a mandatory sukun (because of a consonant-initial pronoun suffix like ـتُ or ـنَ), Idgham MUST break (فَكُّ الإِدْغَامِ): مَدَدْتُ، مَدَدْنَ، يَمْدُدْنَ.',
        examples: [
          { ar: 'مَدَّ · مَدُّوا · مَدَّتْ', translit: 'madda · maddū · maddat', en: 'Idgham kept before vowel-initial suffixes' },
          { ar: 'مَدَدْتُ · مَدَدْنَ · يَمْدُدْنَ', translit: 'madadtu · madadna · yamdudna', en: 'Idgham breaks before consonant suffixes' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q10-1',
        prompt: 'What is the true triliteral root of اِتَّصَلَ (to contact)?',
        arabicCue: 'اِتَّصَلَ',
        options: ['ت-ص-ل', 'و-ص-ل', 'ا-ت-ص', 'ص-ل-ل'],
        correctIndex: 1,
        explanation: 'The root is و-ص-ل; in Form VIII (اِوْتَصَلَ), the initial و changes to ت and merges with the Form VIII infix ت into تّ.',
      },
      {
        id: 'q10-2',
        prompt: 'Which conjugation correctly breaks Idgham for مَدَّ (to extend)?',
        options: ['مَدْتُ', 'مَدَدْتُ', 'مَدَّتُ', 'مَدُّتُ'],
        correctIndex: 1,
        explanation: 'Before the pronoun suffix ـتُ, the geminate دّ splits back into two separate letters: مَدَدْتُ.',
      },
    ],
  },
  {
    id: 'ch-11-hamza-wasl-qat',
    number: 11,
    title: 'Hamzatul Wasl vs. Hamzatul Qat\'',
    arabicTitle: 'همزة الوصل وهمزة القطع',
    summary: 'Know when an initial Alif carries a written hamza (أ / إ) that is always pronounced vs. a connecting Alif (ا) that drops in continuous speech.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'The Two Initial Hamzas',
        body: 'Hamzatul Qaṭʿ (هَمْزَةُ الْقَطْعِ) is written with a hamza sign (أَ، أُ، إِ) and is ALWAYS pronounced whether at the start or middle of speech. Hamzatul Waṣl (هَمْزَةُ الْوَصْلِ) is written as a bare Alif (ا) without a hamza glyph: it is pronounced only when starting an utterance and elided when connected to a preceding word.',
        table: {
          headers: ['Type', 'Where it Appears in Verbs', 'Examples'],
          rows: [
            ['Hamzatul Qat\' (أ / إ)', 'Form I 3-letter hamza roots · ALL Form IV verbs & masdars · 1st sg. Mudhari (أَنَا)', 'أَكَلَ · أَرْسَلَ · إِرْسَالٌ · أَكْتُبُ'],
            ['Hamzatul Wasl (ا)', 'Form I Amr · Forms VII, VIII, IX, X past, imperative, & masdars · Definite الـ', 'اُكْتُبْ · اِنْكَسَرَ · اِجْتِمَاعٌ · اِسْتَغْفِرْ'],
          ],
        },
      },
      {
        heading: 'Connected Reading Test',
        body: 'To test any initial Alif quickly, place وَ ("and") before it! If you naturally pronounce the glottal stop (وَأَرْسَلَ wa-arsala), it is Qatʿ; if it glides smoothly past the Alif (وَاسْتَخْرَجَ was-takhraja), it is Waṣl.',
        examples: [
          { ar: 'وَأَكْرَمَ', translit: 'wa-akrama', en: 'Form IV: glottal stop pronounced (Qat\')' },
          { ar: 'وَاجْتَمَعَ', translit: 'wajtamaʿa', en: 'Form VIII: Alif elided in speech (Wasl)' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q11-1',
        prompt: 'Which verb requires Hamzatul Qat\' (أَ) rather than Hamzatul Wasl (ا)?',
        options: ['اِسْتَخْرَجَ (Form X)', 'أَخْرَجَ (Form IV)', 'اِنْكَسَرَ (Form VII)', 'اِجْتَمَعَ (Form VIII)'],
        correctIndex: 1,
        explanation: 'All Form IV past verbs, imperatives, and masdars use Hamzatul Qat\' (أَخْرَجَ، أَخْرِجْ، إِخْرَاجٌ).',
      },
    ],
  },
  {
    id: 'ch-12-number-declension',
    number: 12,
    title: 'Number & Declension Patterns',
    arabicTitle: 'المفرد والمثنى والجمع والإعراب',
    summary: 'Review singular, dual, sound masculine plural, and sound feminine plural endings across nominative, accusative, and genitive cases.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Three Grammatical Numbers & Three Cases',
        body: 'Arabic distinguishes Singular (مُفْرَد), Dual (مُثَنًّى — exactly two), and Plural (جَمْع — three or more). Nouns inflect across three cases: Rafʿ (رَفْع — nominative/subject), Naṣb (نَصْب — accusative/object), and Jarr (جَرّ — genitive/after prepositions).',
        table: {
          headers: ['Number / Type', 'Raf\' (Nom.)', 'Nasb (Acc.)', 'Jarr (Gen.)'],
          rows: [
            ['Singular (مُفْرَد)', 'كَاتِبٌ (ـُ)', 'كَاتِبًا (ـَ)', 'كَاتِبٍ (ـِ)'],
            ['Dual (مُثَنًّى)', 'كَاتِبَانِ (ـَانِ)', 'كَاتِبَيْنِ (ـَيْنِ)', 'كَاتِبَيْنِ (ـَيْنِ)'],
            ['Sound Masc. Plural', 'كَاتِبُونَ (ـُونَ)', 'كَاتِبِينَ (ـِينَ)', 'كَاتِبِينَ (ـِينَ)'],
            ['Sound Fem. Plural', 'كَاتِبَاتٌ (ـَاتٌ)', 'كَاتِبَاتٍ (ـَاتٍ)', 'كَاتِبَاتٍ (ـَاتٍ)'],
          ],
        },
      },
      {
        heading: 'Notice the Feminine Plural & Dual Nuance',
        body: 'Sound Feminine Plurals (جَمْعُ الْمُؤَنَّثِ السَّالِمُ) NEVER take a fatha in the accusative — both Naṣb and Jarr use Kasra (رَأَيْتُ الْمُعَلِّمَاتِ). Duals and Sound Masculine Plurals drop their final ن when they serve as Muḍāf in a possessive construct (مُعَلِّمُو الْمَدْرَسَةِ).',
      },
    ],
    quiz: [
      {
        id: 'q12-1',
        prompt: 'What is the accusative (Nasb) form of مُسْلِمَاتٌ (sound feminine plural)?',
        options: ['مُسْلِمَاتَ', 'مُسْلِمَاتٍ', 'مُسْلِمَاتُونَ', 'مُسْلِمَتَيْنِ'],
        correctIndex: 1,
        explanation: 'Sound feminine plurals take Kasra in both Nasb and Jarr (مُسْلِمَاتٍ / الْمُسْلِمَاتِ).',
      },
    ],
  },
  {
    id: 'ch-13-broken-plurals',
    number: 13,
    title: 'Broken Plurals (Jam\' Taksir)',
    arabicTitle: 'جمع التكسير وأوزانه',
    summary: 'Discover the internal vowel-breaking patterns of Arabic broken plurals, separating Plurals of Paucity (3–10) from Plurals of Abundance.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'How Broken Plurals Work',
        body: 'Unlike English "-s", Arabic frequently forms plurals by reshaping the internal vowel skeleton around the root letters — called Jamʿ Taksīr (جَمْعُ التَّكْسِيرِ, broken plural). Think of كِتَابٌ → كُتُبٌ or قَلَمٌ → أَقْلَامٌ. Broken plurals decline just like singular nouns with ـُ / ـَ / ـِ.',
        table: {
          headers: ['Plural Group', 'Pattern', 'Singular → Plural Examples'],
          rows: [
            ['Paucity (قِلَّة: 3–10)', 'أَفْعَالٌ · أَفْعُلٌ · أَفْعِلَةٌ', 'قَلَمٌ ← أَقْلَامٌ · نَهْرٌ ← أَنْهُرٌ · طَعَامٌ ← أَطْعِمَةٌ'],
            ['Abundance (كَثْرَة)', 'فُعُولٌ · فِعَالٌ · فُعُلٌ', 'بَيْتٌ ← بُيُوتٌ · جَبَلٌ ← جِبَالٌ · كِتَابٌ ← كُتُبٌ'],
            ['4-Consonant / Muntaha al-Jumu\'', 'مَفَاعِلُ · مَفَاعِيلُ · فَوَاعِلُ', 'مَسْجِدٌ ← مَسَاجِدُ · مِفْتَاحٌ ← مَفَاتِيحُ · قَاعِدَةٌ ← قَوَاعِدُ'],
          ],
        },
      },
      {
        heading: 'Diptotes (الممنوع من الصرف)',
        body: 'Notice that patterns like مَسَاجِدُ and مَفَاتِيحُ (known as صِيغَةُ مُنْتَهَى الْجُمُوعِ) do NOT take tanwin and mark Jarr with a fatha unless definite (فِي مَسَاجِدَ كَثِيرَةٍ vs فِي الْمَسَاجِدِ).',
      },
    ],
    quiz: [
      {
        id: 'q13-1',
        prompt: 'Which pattern does مَسَاجِدُ (plural of مَسْجِدٌ) follow?',
        options: ['أَفْعَالٌ', 'فُعُولٌ', 'مَفَاعِلُ', 'فَعَالِيلُ'],
        correctIndex: 2,
        explanation: 'مَسَاجِدُ follows مَفَاعِلُ, a classic Muntaha al-Jumu\' pattern for 4-letter nouns.',
      },
    ],
  },
  {
    id: 'ch-14-transitivity-voice',
    number: 14,
    title: 'Transitivity & Passive Voice',
    arabicTitle: 'اللازم والمتعدي والمبني للمجهول',
    summary: 'Distinguish intransitive (Lazim) from transitive (Muta\'addi) verbs, see how Forms increase or decrease valency, and form Passive Voice (Majhul).',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Lazim vs. Muta\'addi & Valency Shifts',
        body: 'An intransitive verb (لَازِمٌ) needs only a subject (جَلَسَ الطَّالِبُ). A transitive verb (مُتَعَدٍّ) takes 1, 2, or even 3 direct objects (كَتَبَ الرِّسَالَةَ، أَعْطَى الطَّالِبَ كِتَابًا). Adding Hamza (Form IV) or doubling C2 (Form II) turns an intransitive verb transitive (خَرَجَ "went out" ← أَخْرَجَ "brought out"). Conversely, Form VII (اِنْفَعَلَ) turns a transitive verb intransitive (كَسَرَ ← اِنْكَسَرَ).',
        examples: [
          { ar: 'دَخَلَ الزَّائِرُ ← أَدْخَلَ الْمُضِيفُ الزَّائِرَ', translit: 'dakhala → adkhala', en: 'Form I intransitive → Form IV transitive' },
          { ar: 'فَتَحَ الْبَابَ ← اِنْفَتَحَ الْبَابُ', translit: 'fataḥa → infataḥa', en: 'Form I transitive → Form VII reflexive/intransitive' },
        ],
      },
      {
        heading: 'Forming Passive Voice (المَبْنِيُّ لِلْمَجْهُولِ)',
        body: 'Arabic forms the passive purely by changing internal short vowels! In Madhi: Damma on the first vocalized letter (and every preceding vowel) + Kasra before the final root letter (ضُمَّ أَوَّلُهُ وَكُسِرَ مَا قَبْلَ آخِرِهِ): كَتَبَ ← كُتِبَ, اِسْتَخْرَجَ ← اُسْتُخْرِجَ. In Mudhari: Damma on the prefix + Fatha before the final root letter (ضُمَّ أَوَّلُهُ وَفُتِحَ مَا قَبْلَ آخِرِهِ): يَكْتُبُ ← يُكْتَبُ, يَسْتَخْرِجُ ← يُسْتَخْرَجُ.',
        examples: [
          { ar: 'كَتَبَ ← كُتِبَ · يَكْتُبُ ← يُكْتَبُ', translit: 'kataba → kutiba · yaktubu → yuktabu', en: 'Past: u-i-a · Present: yu-a-u' },
          { ar: 'قَالَ ← قِيلَ · يَقُولُ ← يُقَالُ', translit: 'qāla → qīla · yaqūlu → yuqālu', en: 'Hollow verb passive shifts' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q14-1',
        prompt: 'What is the passive voice (المجهول) of يَسْتَخْرِجُ (he extracts)?',
        arabicCue: 'يَسْتَخْرِجُ',
        options: ['يَسْتَخْرَجُ', 'يُسْتَخْرَجُ', 'يُسْتَخْرِجُ', 'اُسْتُخْرِجَ'],
        correctIndex: 1,
        explanation: 'In Mudhari passive, place Damma on the prefix (يُـ) and Fatha before the final consonant (ـرَـ): يُسْتَخْرَجُ.',
      },
      {
        id: 'q14-2',
        prompt: 'Which derived form regularly converts a transitive Form I verb into an intransitive/reflexive one?',
        options: ['Form II (فَعَّلَ)', 'Form IV (أَفْعَلَ)', 'Form VII (اِنْفَعَلَ)', 'Form X (اِسْتَفْعَلَ)'],
        correctIndex: 2,
        explanation: 'Form VII (اِنْفَعَلَ, e.g. كَسَرَ ← اِنْكَسَرَ) is known as مطاوعة and produces an intransitive resultative verb.',
      },
    ],
  },
];
