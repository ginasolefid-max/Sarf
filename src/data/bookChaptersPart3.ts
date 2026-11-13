import type { BookChapter } from './bookChaptersPart1';

export const BOOK_CHAPTERS_PART_3: BookChapter[] = [
  {
    id: 'ch-15-tasghir',
    number: 15,
    title: 'The Diminutive (Tasghir)',
    arabicTitle: 'التَّصْغِيرُ',
    summary: 'Form small, endearing or belittling nouns with the three diminutive patterns.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'The Three Patterns',
        body: 'Tasghir changes a noun to show smallness, affection or contempt. Put a damma on the first letter, a fatha on the second, then add a sakin yaa (يْ) after it. For nouns of four or more letters, put a kasra on the letter after the yaa.',
        table: {
          headers: ['Pattern', 'Used for', 'Example'],
          rows: [
            ['فُعَيْلٌ', '3-letter nouns', 'رَجُلٌ ← رُجَيْلٌ'],
            ['فُعَيْعِلٌ', '4-letter nouns', 'دِرْهَمٌ ← دُرَيْهِمٌ'],
            ['فُعَيْعِيلٌ', '5-letter nouns with a long vowel', 'مِفْتَاحٌ ← مُفَيْتِيحٌ'],
          ],
        },
        examples: [
          { ar: 'كِتَابٌ ← كُتَيِّبٌ', translit: 'kitābun → kutayyibun', en: 'book → booklet' },
          { ar: 'بَيْتٌ ← بُيَيْتٌ', translit: 'baytun → buyaytun', en: 'house → little house' },
          { ar: 'وَلَدٌ ← وُلَيْدٌ', translit: 'waladun → wulaydun', en: 'boy → little boy' },
        ],
      },
      {
        heading: 'Feminine Nouns',
        body: 'Feminine nouns of three letters without a ة take a ة in the diminutive: شَمْسٌ ← شُمَيْسَةٌ and عَيْنٌ ← عُيَيْنَةٌ. Nouns that already end in ة keep it: مَدْرَسَةٌ ← مُدَيْرِسَةٌ.',
        examples: [
          { ar: 'شَمْسٌ ← شُمَيْسَةٌ', translit: 'shamsun → shumaysatun', en: 'sun → little sun' },
          { ar: 'مَدْرَسَةٌ ← مُدَيْرِسَةٌ', translit: 'madrasatun → mudayrisatun', en: 'school → little school' },
        ],
      },
    ],
    quiz: [
      {
        id: 'ch15-q1',
        prompt: 'Which pattern is the diminutive of a three-letter noun?',
        options: ['فُعَيْلٌ', 'فُعَيْعِلٌ', 'مَفْعَلٌ', 'فَاعِلٌ'],
        correctIndex: 0,
        explanation: 'Three-letter nouns take the pattern فُعَيْلٌ, for example رَجُلٌ ← رُجَيْلٌ.',
      },
      {
        id: 'ch15-q2',
        prompt: 'What is the diminutive of دِرْهَمٌ?',
        arabicCue: 'دِرْهَمٌ',
        options: ['دُرَيْهِمٌ', 'دُرَيْهَمٌ', 'دِرَيْهِمٌ', 'دُرْهَيْمٌ'],
        correctIndex: 0,
        explanation: 'Four-letter nouns follow فُعَيْعِلٌ: damma, fatha + yaa, then a kasra before the last letter.',
      },
      {
        id: 'ch15-q3',
        prompt: 'The diminutive of the feminine noun شَمْسٌ is:',
        options: ['شُمَيْسٌ', 'شُمَيْسَةٌ', 'شَمِيسَةٌ', 'شُمْسَيَةٌ'],
        correctIndex: 1,
        explanation: 'Feminine three-letter nouns without ة add ة in the diminutive.',
      },
    ],
  },
  {
    id: 'ch-16-nisba',
    number: 16,
    title: 'The Relative Adjective (Nisba)',
    arabicTitle: 'النِّسْبَةُ',
    summary: 'Turn nouns into adjectives of belonging using the doubled yaa ending.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'The Basic Rule',
        body: 'Add a shaddah yaa (ـِيٌّ) to the end of a noun and put a kasra on the letter before it. This makes an adjective meaning "relating to" the noun. Drop the definite article and any final ة first.',
        examples: [
          { ar: 'عَرَبٌ ← عَرَبِيٌّ', translit: "'arabun → 'arabiyyun", en: 'Arabs → Arab / Arabic' },
          { ar: 'مِصْرُ ← مِصْرِيٌّ', translit: 'miṣru → miṣriyyun', en: 'Egypt → Egyptian' },
          { ar: 'إِسْلَامٌ ← إِسْلَامِيٌّ', translit: 'islāmun → islāmiyyun', en: 'Islam → Islamic' },
        ],
      },
      {
        heading: 'Special Cases',
        body: 'Final ة is dropped: مَكَّةُ ← مَكِّيٌّ. Some words change irregularly: مَدِينَةٌ ← مَدَنِيٌّ (civil, of Madinah). Words ending in ـاءُ often change the hamza to waw: صَحْرَاءُ ← صَحْرَاوِيٌّ. Add ـِيَّةٌ to make abstract nouns: إِنْسَانٌ ← إِنْسَانِيَّةٌ (humanity).',
        examples: [
          { ar: 'مَكَّةُ ← مَكِّيٌّ', translit: 'makkatu → makkiyyun', en: 'Makkah → Makkan' },
          { ar: 'صَحْرَاءُ ← صَحْرَاوِيٌّ', translit: 'ṣaḥrā\u2019u → ṣaḥrāwiyyun', en: 'desert → desert-like' },
          { ar: 'إِنْسَانٌ ← إِنْسَانِيَّةٌ', translit: 'insānun → insāniyyatun', en: 'human → humanity' },
        ],
      },
    ],
    quiz: [
      {
        id: 'ch16-q1',
        prompt: 'What ending forms the Nisba adjective?',
        options: ['ـِيٌّ', 'ـَةٌ', 'ـُونَ', 'ـَانِ'],
        correctIndex: 0,
        explanation: 'A shaddah yaa with a kasra before it: ـِيٌّ.',
      },
      {
        id: 'ch16-q2',
        prompt: 'What is the Nisba of مَكَّةُ?',
        arabicCue: 'مَكَّةُ',
        options: ['مَكَّةِيٌّ', 'مَكِّيٌّ', 'مَكَاوِيٌّ', 'مَكَّةُيٌّ'],
        correctIndex: 1,
        explanation: 'Drop the final ة, then add ـِيٌّ.',
      },
      {
        id: 'ch16-q3',
        prompt: 'إِنْسَانِيَّةٌ means:',
        options: ['human (adj.)', 'humanity', 'humans', 'to humanize'],
        correctIndex: 1,
        explanation: 'ـِيَّةٌ makes an abstract noun from the Nisba.',
      },
    ],
  },
  {
    id: 'ch-17-diptotes',
    number: 17,
    title: 'Diptotes (Mamnu\u2019 min as-Sarf)',
    arabicTitle: 'الْمَمْنُوعُ مِنَ الصَّرْفِ',
    summary: 'Learn which nouns refuse tanwin and take a fatha in the genitive.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'What Makes a Noun a Diptote',
        body: 'A diptote takes no tanwin, and in the genitive it takes a fatha instead of a kasra. This changes when the noun is definite (with ال) or the first word of an idafa, where it takes the normal kasra.',
        table: {
          headers: ['Category', 'Example'],
          rows: [
            ['Foreign proper names', 'إِبْرَاهِيمُ'],
            ['Feminine proper names', 'فَاطِمَةُ'],
            ['Pattern أَفْعَلُ (colors, defects)', 'أَحْمَرُ'],
            ['Pattern فَعْلَانُ (feminine فَعْلَى)', 'سَكْرَانُ'],
            ['Broken plurals of pattern مَفَاعِلُ', 'مَسَاجِدُ'],
            ['Broken plurals of pattern مَفَاعِيلُ', 'مَصَابِيحُ'],
          ],
        },
        examples: [
          { ar: 'رَأَيْتُ مَسَاجِدَ كَثِيرَةً.', translit: 'ra\u2019aytu masājida kathīratan', en: 'I saw many mosques. (fatha, no tanwin)' },
          { ar: 'صَلَّيْتُ فِي مَسَاجِدَ مُخْتَلِفَةٍ.', translit: 'ṣallaytu fī masājida mukhtalifatin', en: 'I prayed in different mosques. (genitive with fatha)' },
        ],
      },
    ],
    quiz: [
      {
        id: 'ch17-q1',
        prompt: 'A diptote takes which genitive ending?',
        options: ['Kasra', 'Fatha', 'Damma', 'Sukun'],
        correctIndex: 1,
        explanation: 'Diptotes take a fatha in the genitive when indefinite.',
      },
      {
        id: 'ch17-q2',
        prompt: 'Which of these is a diptote?',
        options: ['كِتَابٌ', 'مَسَاجِدُ', 'مَدْرَسَةٌ', 'قَلَمٌ'],
        correctIndex: 1,
        explanation: 'مَسَاجِدُ follows the plural pattern مَفَاعِلُ.',
      },
    ],
  },
  {
    id: 'ch-18-forms-cheat-sheet',
    number: 18,
    title: 'Quick Reference: The Ten Forms',
    arabicTitle: 'الْأَوْزَانُ الْعَشَرَةُ',
    summary: 'One table for revision: the usual meaning, masdar and example of each form.',
    readingMinutes: 4,
    sections: [
      {
        heading: 'Revision Table',
        body: 'Use this table to review each form. Meanings are common tendencies, not rules, so always check the dictionary.',
        table: {
          headers: ['Form', 'Typical meaning', 'Masdar', 'Example'],
          rows: [
            ['I', 'Base meaning', 'varies', 'كَتَبَ'],
            ['II', 'Intensive / causative', 'تَفْعِيلٌ', 'عَلَّمَ'],
            ['III', 'Doing with / toward someone', 'مُفَاعَلَةٌ', 'كَاتَبَ'],
            ['IV', 'Causative', 'إِفْعَالٌ', 'أَكْرَمَ'],
            ['V', 'Reflexive of II', 'تَفَعُّلٌ', 'تَعَلَّمَ'],
            ['VI', 'Reciprocal', 'تَفَاعُلٌ', 'تَكَاتَبَ'],
            ['VII', 'Passive / reflexive', 'اِنْفِعَالٌ', 'اِنْكَسَرَ'],
            ['VIII', 'Reflexive / middle', 'اِفْتِعَالٌ', 'اِجْتَمَعَ'],
            ['IX', 'Colors and defects', 'اِفْعِلَالٌ', 'اِحْمَرَّ'],
            ['X', 'Asking for / considering', 'اِسْتِفْعَالٌ', 'اِسْتَغْفَرَ'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'ch18-q1',
        prompt: 'Which form usually means "asking for" something?',
        options: ['Form II', 'Form VI', 'Form VIII', 'Form X'],
        correctIndex: 3,
        explanation: 'Form X (اِسْتَفْعَلَ) often means seeking or requesting, e.g. اِسْتَغْفَرَ "asked forgiveness".',
      },
      {
        id: 'ch18-q2',
        prompt: 'What is the masdar pattern of Form II?',
        options: ['تَفْعِيلٌ', 'إِفْعَالٌ', 'تَفَاعُلٌ', 'اِنْفِعَالٌ'],
        correctIndex: 0,
        explanation: 'Form II masdar is تَفْعِيلٌ, e.g. تَعْلِيمٌ.',
      },
      {
        id: 'ch18-q3',
        prompt: 'Which form is used for colors like اِحْمَرَّ?',
        options: ['Form VII', 'Form IX', 'Form IV', 'Form III'],
        correctIndex: 1,
        explanation: 'Form IX (اِفْعَلَّ) is used for colors and physical defects.',
      },
    ],
  },
];
