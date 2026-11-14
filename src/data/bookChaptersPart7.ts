import type { BookChapter } from './bookChaptersPart1';

export const BOOK_CHAPTERS_PART_7: BookChapter[] = [
  {
    id: 'nahw-18-definite-gender-number',
    number: 42,
    subject: 'nahw',
    title: 'Definiteness, Gender and Number',
    arabicTitle: 'الْمَعْرِفَةُ وَالنَّكِرَةُ وَالتَّذْكِيرُ وَالتَّأْنِيثُ وَالْعَدَدُ',
    summary: 'The seven kinds of definite noun, the signs of the feminine, and singular, dual and plural.',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Nakira and Ma\u02BFrifa',
        arabicBody: 'النَّكِرَةُ مَا دَلَّ عَلَى غَيْرِ مُعَيَّنٍ، وَالْمَعْرِفَةُ مَا دَلَّ عَلَى مُعَيَّنٍ، وَالْمَعَارِفُ سَبْعَةٌ: الضَّمِيرُ، وَالْعَلَمُ، وَاسْمُ الْإِشَارَةِ، وَالِاسْمُ الْمَوْصُولُ، وَمَا دَخَلَتْ عَلَيْهِ «أَلْ»، وَالْمُضَافُ إِلَى مَعْرِفَةٍ، وَالْمُنَادَى الْمَقْصُودُ.',
        body: 'A Nakira is an unspecified noun, and a Ma\u02BFrifa is a specified one. There are seven kinds of Ma\u02BFrifa.',
        table: {
          headers: ['Kind', 'Example'],
          rows: [
            ['Pronoun (ضَمِيرٌ)', 'هُوَ · أَنَا'],
            ['Proper name (عَلَمٌ)', 'مُحَمَّدٌ · مَكَّةُ'],
            ['Demonstrative (اسْمُ إِشَارَةٍ)', 'هَذَا · ذَلِكَ'],
            ['Relative (اسْمٌ مَوْصُولٌ)', 'الَّذِي · الَّتِي'],
            ['Noun with ال', 'الْكِتَابُ'],
            ['Mudaf to a Ma\u02BFrifa', 'كِتَابُ الطَّالِبِ'],
            ['Intended vocative', 'يَا رَجُلُ'],
          ],
        },
      },
      {
        heading: 'Mudhakkar and Mu\u2019annath',
        arabicBody: 'الْمُؤَنَّثُ مَا فِيهِ عَلَامَةُ تَأْنِيثٍ لَفْظًا أَوْ تَقْدِيرًا، وَعَلَامَاتُهُ: التَّاءُ الْمَرْبُوطَةُ وَأَلِفُ التَّأْنِيثِ الْمَقْصُورَةُ وَأَلِفُ التَّأْنِيثِ الْمَمْدُودَةُ، وَمَا عَدَاهُ مُذَكَّرٌ.',
        body: 'A feminine noun carries a sign of the feminine, visible or hidden. The signs are the Ta Marbuta, the Alif Maqsura and the Alif Mamduda. Some nouns are feminine by meaning or usage even without a sign.',
        examples: [
          { ar: 'مَدْرَسَةٌ', translit: 'madrasatun', en: 'school (Ta Marbuta)' },
          { ar: 'كُبْرَى', translit: 'kubrā', en: 'greater (Alif Maqsura)' },
          { ar: 'صَحْرَاءُ', translit: 'ṣaḥrāʾu', en: 'desert (Alif Mamduda)' },
          { ar: 'شَمْسٌ · أَرْضٌ · عَيْنٌ · يَدٌ', translit: 'shams · arḍ · ʿayn · yad', en: 'feminine with no sign' },
        ],
      },
      {
        heading: 'Mufrad, Muthanna and Jam\u02BF',
        arabicBody: 'الْمُفْرَدُ مَا دَلَّ عَلَى وَاحِدٍ، وَالْمُثَنَّى مَا دَلَّ عَلَى اثْنَيْنِ، وَالْجَمْعُ مَا دَلَّ عَلَى أَكْثَرَ مِنِ اثْنَيْنِ، وَهُوَ سَالِمٌ أَوْ تَكْسِيرٌ.',
        body: 'Singular names one, dual names two, and plural names more than two. A plural is either sound (formed by adding endings) or broken (the word changes shape).',
        table: {
          headers: ['Kind', 'Example'],
          rows: [
            ['Mufrad', 'مُسْلِمٌ'],
            ['Muthanna', 'مُسْلِمَانِ / مُسْلِمَيْنِ'],
            ['Sound masculine', 'مُسْلِمُونَ / مُسْلِمِينَ'],
            ['Sound feminine', 'مُسْلِمَاتٌ'],
            ['Broken plural', 'كِتَابٌ ← كُتُبٌ'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'nahw18-q1',
        prompt: 'How many kinds of Ma\u02BFrifa are there?',
        options: ['Five', 'Six', 'Seven', 'Eight'],
        correctIndex: 2,
        explanation: 'There are seven: pronoun, proper name, demonstrative, relative, noun with ال, Mudaf to a Ma\u02BFrifa, and the intended vocative.',
      },
      {
        id: 'nahw18-q2',
        prompt: 'Which word is feminine with no visible sign?',
        options: ['شَمْسٌ', 'كِتَابٌ', 'قَلَمٌ', 'بَابٌ'],
        correctIndex: 0,
        explanation: 'شَمْسٌ is feminine by usage, with no sign.',
      },
      {
        id: 'nahw18-q3',
        prompt: 'Which is a broken plural?',
        options: ['مُسْلِمُونَ', 'مُسْلِمَاتٌ', 'كُتُبٌ', 'مُسْلِمَانِ'],
        correctIndex: 2,
        explanation: 'كُتُبٌ changes the shape of كِتَابٌ, so it is a broken plural.',
      },
    ],
  },
  {
    id: 'nahw-19-working-derivatives',
    number: 43,
    subject: 'nahw',
    title: 'Derived Nouns That Act Like Verbs',
    arabicTitle: 'عَمَلُ الْمُشْتَقَّاتِ',
    summary: 'How the active participle, passive participle, Masdar and Sifa Mushabbaha take objects and subjects.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Ism al-Fa\u02BFil',
        arabicBody: 'اسْمُ الْفَاعِلِ يَعْمَلُ عَمَلَ فِعْلِهِ إِذَا دَلَّ عَلَى الْحَالِ أَوِ الِاسْتِقْبَالِ، فَيَرْفَعُ الْفَاعِلَ وَيَنْصِبُ الْمَفْعُولَ بِهِ إِنْ كَانَ فِعْلُهُ مُتَعَدِّيًا.',
        body: 'The active participle works like its verb when it refers to the present or future. It takes a doer, and if the verb is transitive it takes a Mansub object.',
        examples: [
          { ar: 'أَنَا قَارِئٌ الْكِتَابَ غَدًا', translit: 'anā qāriʾun al-kitāba ghadan', en: 'I am going to read the book tomorrow.' },
          { ar: 'هَذَا طَالِبٌ كَاتِبٌ الدَّرْسَ', translit: 'hādhā ṭālibun kātibun ad-darsa', en: 'This is a student writing the lesson.' },
        ],
      },
      {
        heading: 'Ism al-Maf\u02BFul',
        arabicBody: 'اسْمُ الْمَفْعُولِ يَعْمَلُ عَمَلَ الْفِعْلِ الْمَبْنِيِّ لِلْمَجْهُولِ، فَيَرْفَعُ نَائِبَ الْفَاعِلِ.',
        body: 'The passive participle works like the passive verb, so it takes a deputy subject (Na\u2019ib al-Fa\u02BFil) in the nominative.',
        examples: [
          { ar: 'الطَّالِبُ مَكْتُوبٌ دَرْسُهُ', translit: 'aṭ-ṭālibu maktūbun darsuhu', en: 'The student, his lesson is written.' },
        ],
      },
      {
        heading: 'The Masdar',
        arabicBody: 'الْمَصْدَرُ يَعْمَلُ عَمَلَ فِعْلِهِ، فَيَنْصِبُ الْمَفْعُولَ بِهِ، وَيُضَافُ إِلَى فَاعِلِهِ أَوْ إِلَى مَفْعُولِهِ.',
        body: 'The Masdar works like its verb. It can be annexed to its doer or to its object, and it can take an object.',
        examples: [
          { ar: 'يُعْجِبُنِي إِكْرَامُ الطَّالِبِ الْمُعَلِّمَ', translit: 'yuʿjibunī ikrāmu aṭ-ṭālibi al-muʿallima', en: 'I like the student\u2019s honouring of the teacher.' },
        ],
      },
      {
        heading: 'Sifa Mushabbaha',
        arabicBody: 'الصِّفَةُ الْمُشَبَّهَةُ صِفَةٌ تَدُلُّ عَلَى مَعْنًى ثَابِتٍ فِي صَاحِبِهَا، وَتَرْفَعُ الْفَاعِلَ.',
        body: 'The Sifa Mushabbaha is an adjective that shows a lasting quality in its owner, and it takes a doer.',
        examples: [
          { ar: 'رَجُلٌ حَسَنٌ وَجْهُهُ', translit: 'rajulun ḥasanun wajhuhu', en: 'a man whose face is handsome' },
          { ar: 'هَذِهِ الْفَتَاةُ كَرِيمَةٌ أَخْلَاقُهَا', translit: 'hādhihi al-fatātu karīmatun akhlāquhā', en: 'This girl, her character is noble.' },
        ],
      },
    ],
    quiz: [
      {
        id: 'nahw19-q1',
        prompt: 'When does the active participle govern like its verb?',
        options: ['When it refers to the past only', 'When it refers to the present or future', 'Never', 'Only after ال'],
        correctIndex: 1,
        explanation: 'It acts like its verb when it expresses the present or future.',
      },
      {
        id: 'nahw19-q2',
        prompt: 'The passive participle takes:',
        options: ['A Maf\u02BFul Bihi', 'A Na\u2019ib al-Fa\u02BFil', 'A Hal', 'A Tamyiz'],
        correctIndex: 1,
        explanation: 'It works like the passive verb, so it takes a Na\u2019ib al-Fa\u02BFil.',
      },
      {
        id: 'nahw19-q3',
        prompt: 'A Sifa Mushabbaha describes:',
        options: ['A passing action', 'A lasting quality', 'A command', 'A number'],
        correctIndex: 1,
        explanation: 'The Sifa Mushabbaha shows a lasting quality in its owner.',
      },
    ],
  },
  {
    id: 'nahw-20-praise-wonder',
    number: 44,
    subject: 'nahw',
    title: 'Praise, Blame and Wonder',
    arabicTitle: 'نِعْمَ وَبِئْسَ وَالتَّعَجُّبُ',
    summary: 'The verbs of praise and blame, and the two forms of wonder.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Ni\u02BFma and Bi\u2019sa',
        arabicBody: 'نِعْمَ وَبِئْسَ فِعْلَانِ جَامِدَانِ لِإِنْشَاءِ الْمَدْحِ وَالذَّمِّ، وَفَاعِلُهُمَا اسْمٌ مُعَرَّفٌ بِـ«أَلْ» أَوْ مُضَافٌ إِلَى مَا فِيهِ «أَلْ»، ثُمَّ يُذْكَرُ الْمَخْصُوصُ بِالْمَدْحِ أَوِ الذَّمِّ.',
        body: 'Ni\u02BFma (what a good) and Bi\u2019sa (what a bad) are fixed verbs that express praise and blame. Their doer is a noun with ال, or a noun annexed to a noun with ال. Then the specific thing praised or blamed follows.',
        examples: [
          { ar: 'نِعْمَ الرَّجُلُ زَيْدٌ', translit: 'niʿma ar-rajulu zaydun', en: 'What a good man Zayd is.' },
          { ar: 'بِئْسَ الْخُلُقُ الْكَذِبُ', translit: 'biʾsa al-khuluqu al-kadhibu', en: 'What a bad trait lying is.' },
        ],
      },
      {
        heading: 'Ta\u02BFajjub (Wonder)',
        arabicBody: 'لِلتَّعَجُّبِ صِيغَتَانِ قِيَاسِيَّتَانِ: «مَا أَفْعَلَهُ» وَ«أَفْعِلْ بِهِ».',
        body: 'Wonder has two standard patterns. In «مَا أَفْعَلَهُ» the wondered-at noun is Mansub. In «أَفْعِلْ بِهِ» the wondered-at noun is Majrur by the particle بِ.',
        table: {
          headers: ['Pattern', 'Example', 'Meaning'],
          rows: [
            ['مَا أَفْعَلَهُ', 'مَا أَجْمَلَ السَّمَاءَ!', 'How beautiful the sky is!'],
            ['أَفْعِلْ بِهِ', 'أَجْمِلْ بِالسَّمَاءِ!', 'How beautiful the sky is!'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'nahw20-q1',
        prompt: 'Which verb expresses praise?',
        options: ['بِئْسَ', 'نِعْمَ', 'كَانَ', 'لَيْسَ'],
        correctIndex: 1,
        explanation: 'نِعْمَ expresses praise, and بِئْسَ expresses blame.',
      },
      {
        id: 'nahw20-q2',
        prompt: 'In مَا أَجْمَلَ السَّمَاءَ!, what is السَّمَاءَ?',
        options: ['Marfu\u02BF', 'Mansub', 'Majrur', 'Majzum'],
        correctIndex: 1,
        explanation: 'After مَا أَفْعَلَ the noun is Mansub.',
      },
    ],
  },
  {
    id: 'nahw-21-sentences-particles',
    number: 45,
    subject: 'nahw',
    title: 'Types of Sentence, Questions and Negation',
    arabicTitle: 'أَنْوَاعُ الْجُمَلِ وَالِاسْتِفْهَامُ وَالنَّفْيُ',
    summary: 'Sentences with and without a place in I\u02BFrab, and the particles of questions and negation.',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Sentences With a Place in I\u02BFrab',
        arabicBody: 'الْجُمَلُ الَّتِي لَهَا مَحَلٌّ مِنَ الْإِعْرَابِ هِيَ الَّتِي تَحِلُّ مَحَلَّ مُفْرَدٍ، وَمِنْهَا: الْوَاقِعَةُ خَبَرًا، وَالْوَاقِعَةُ حَالًا، وَالْوَاقِعَةُ نَعْتًا، وَالْوَاقِعَةُ مَفْعُولًا بِهِ.',
        body: 'A sentence that takes the place of a single word has a position in I\u02BFrab. It can be a Khabar, a Hal, a Na\u2019t or an object.',
        examples: [
          { ar: 'الطَّالِبُ يَكْتُبُ', translit: 'aṭ-ṭālibu yaktubu', en: 'يَكْتُبُ is a sentence in the position of a Khabar (Raf\u02BF).' },
          { ar: 'جَاءَ زَيْدٌ يَضْحَكُ', translit: 'jāʾa zaydun yaḍḥaku', en: 'يَضْحَكُ is a sentence in the position of a Hal (Nasb).' },
        ],
      },
      {
        heading: 'Sentences Without a Place',
        arabicBody: 'الْجُمَلُ الَّتِي لَا مَحَلَّ لَهَا مِنَ الْإِعْرَابِ هِيَ: الِابْتِدَائِيَّةُ، وَالِاسْتِئْنَافِيَّةُ، وَجُمْلَةُ الصِّلَةِ، وَجَوَابُ الشَّرْطِ غَيْرِ الْجَازِمِ، وَالْجُمْلَةُ التَّفْسِيرِيَّةُ.',
        body: 'Some sentences take the place of no single word, so they have no position. These are the opening sentence, the new-start sentence, the relative clause (Sila), the result of a non-jussive condition, and the explanatory sentence.',
      },
      {
        heading: 'Question Particles',
        arabicBody: 'أَدَوَاتُ الِاسْتِفْهَامِ حُرُوفٌ وَأَسْمَاءٌ يُطْلَبُ بِهَا الْفَهْمُ، وَلَهَا صَدْرُ الْكَلَامِ.',
        body: 'Question words are particles and nouns used to ask. They stand at the start of the sentence.',
        table: {
          headers: ['Word', 'Asks about', 'Example'],
          rows: [
            ['هَلْ · أَ', 'Yes or no', 'هَلْ جَاءَ الطَّالِبُ؟'],
            ['مَنْ', 'Who', 'مَنْ جَاءَ؟'],
            ['مَا · مَاذَا', 'What', 'مَاذَا قَرَأْتَ؟'],
            ['مَتَى', 'When', 'مَتَى سَافَرْتَ؟'],
            ['أَيْنَ', 'Where', 'أَيْنَ الْكِتَابُ؟'],
            ['كَيْفَ', 'How', 'كَيْفَ حَالُكَ؟'],
            ['كَمْ', 'How many', 'كَمْ كِتَابًا قَرَأْتَ؟'],
            ['لِمَاذَا', 'Why', 'لِمَاذَا تَأَخَّرْتَ؟'],
          ],
        },
      },
      {
        heading: 'Negation Particles',
        arabicBody: 'حُرُوفُ النَّفْيِ تَنْفِي وُقُوعَ الْحَدَثِ أَوْ ثُبُوتَ الصِّفَةِ، وَلِكُلِّ حَرْفٍ مِنْهَا زَمَنٌ وَعَمَلٌ.',
        body: 'Negation particles deny an action or a quality. Each has its own time and effect.',
        table: {
          headers: ['Particle', 'Use', 'Example'],
          rows: [
            ['مَا', 'Negates the past or present', 'مَا ذَهَبَ الطَّالِبُ'],
            ['لَا', 'Negates the present or future', 'لَا يَذْهَبُ الطَّالِبُ'],
            ['لَمْ', 'Negates the past, with a Majzum verb', 'لَمْ يَذْهَبْ'],
            ['لَنْ', 'Negates the future, with a Mansub verb', 'لَنْ يَذْهَبَ'],
            ['لَيْسَ', 'Negates a nominal sentence', 'لَيْسَ الْكَسُولُ نَاجِحًا'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'nahw21-q1',
        prompt: 'Which particle negates the future with a Mansub verb?',
        options: ['لَمْ', 'لَنْ', 'مَا', 'لَيْسَ'],
        correctIndex: 1,
        explanation: 'لَنْ negates the future and puts the verb in Nasb.',
      },
      {
        id: 'nahw21-q2',
        prompt: 'Which word asks "why"?',
        options: ['أَيْنَ', 'مَتَى', 'لِمَاذَا', 'كَمْ'],
        correctIndex: 2,
        explanation: 'لِمَاذَا means "why".',
      },
      {
        id: 'nahw21-q3',
        prompt: 'In جَاءَ زَيْدٌ يَضْحَكُ, the sentence يَضْحَكُ is in the place of:',
        options: ['Khabar', 'Hal', 'Na\u2019t', 'Maf\u02BFul'],
        correctIndex: 1,
        explanation: 'It describes the state of Zayd while coming, so it is a Hal in the position of Nasb.',
      },
    ],
  },
];
