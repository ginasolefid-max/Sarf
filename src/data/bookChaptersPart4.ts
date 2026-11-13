import type { BookChapter } from './bookChaptersPart1';

export const BOOK_CHAPTERS_PART_4: BookChapter[] = [
  {
    id: 'ch-19-thulathi-mujarrad',
    number: 19,
    title: 'Thulathi Mujarrad: The Six Abwab',
    arabicTitle: 'الثُّلَاثِيُّ الْمُجَرَّدُ وَأَبْوَابُهُ السِّتَّةُ',
    summary: 'Bare three-letter verbs and their six babs, from Bab Awwal to Bab Sadis, with examples.',
    readingMinutes: 9,
    sections: [
      {
        heading: 'What Is Thulathi Mujarrad?',
        body: 'The Thulathi Mujarrad (ثُلَاثِيٌّ مُجَرَّدٌ) is a verb with exactly three root letters and no added letters. Its six abwab (singular: bab) are named after the vowel on the middle radical (ʿayn al-fiʿl) in the past tense and the present tense. Learn the bab with each verb, because the vowel of the present tense cannot always be predicted.',
        table: {
          headers: ['Bab', 'Pattern (past / present)', 'Example', 'Masdar'],
          rows: [
            ['1 · Awwal', 'فَعَلَ يَفْعُلُ', 'نَصَرَ يَنْصُرُ (to help)', 'نَصْرٌ'],
            ['2 · Thani', 'فَعَلَ يَفْعِلُ', 'ضَرَبَ يَضْرِبُ (to hit)', 'ضَرْبٌ'],
            ['3 · Thalith', 'فَعَلَ يَفْعَلُ', 'فَتَحَ يَفْتَحُ (to open)', 'فَتْحٌ'],
            ['4 · Rabiʿ', 'فَعِلَ يَفْعَلُ', 'سَمِعَ يَسْمَعُ (to hear)', 'سَمْعٌ'],
            ['5 · Khamis', 'فَعُلَ يَفْعُلُ', 'كَرُمَ يَكْرُمُ (to be generous)', 'كَرَمٌ'],
            ['6 · Sadis', 'فَعِلَ يَفْعِلُ', 'حَسِبَ يَحْسِبُ (to think)', 'حِسْبَانٌ'],
          ],
        },
      },
      {
        heading: 'Bab 1 and Bab 2: فَعَلَ يَفْعُلُ and فَعَلَ يَفْعِلُ',
        body: 'Bab 1 (Awwal) has a fatha in the past and a damma in the present. It is mostly transitive, but also includes intransitive verbs such as قَعَدَ يَقْعُدُ. Bab 2 (Thani) has a fatha in the past and a kasra in the present, and it can be transitive (ضَرَبَ) or intransitive (جَلَسَ يَجْلِسُ). Both babs are very common and have no fixed condition.',
        examples: [
          { ar: 'نَصَرَ يَنْصُرُ', translit: 'naṣara yanṣuru', en: 'Bab 1: to help' },
          { ar: 'دَخَلَ يَدْخُلُ', translit: 'dakhala yadkhulu', en: 'Bab 1: to enter' },
          { ar: 'ضَرَبَ يَضْرِبُ', translit: 'ḍaraba yaḍribu', en: 'Bab 2: to hit' },
          { ar: 'جَلَسَ يَجْلِسُ', translit: 'jalasa yajlisu', en: 'Bab 2: to sit' },
        ],
      },
      {
        heading: 'Bab 3: فَعَلَ يَفْعَلُ',
        body: 'In Bab 3 (Thalith) both vowels are fatha. The usual condition is that the middle or last radical is a throat letter (حُرُوفُ الْحَلْقِ): ء ه ع ح غ خ. A few verbs fall outside this rule, such as أَبَى يَأْبَى and رَكَنَ يَرْكَنُ.',
        examples: [
          { ar: 'فَتَحَ يَفْتَحُ', translit: 'fataḥa yaftaḥu', en: 'to open (last radical ح)' },
          { ar: 'ذَهَبَ يَذْهَبُ', translit: 'dhahaba yadhhabu', en: 'to go (middle radical ه)' },
          { ar: 'سَأَلَ يَسْأَلُ', translit: 'saʾala yasʾalu', en: 'to ask (middle radical ء)' },
          { ar: 'مَنَعَ يَمْنَعُ', translit: 'manaʿa yamnaʿu', en: 'to prevent (last radical ع)' },
        ],
      },
      {
        heading: 'Bab 4, Bab 5 and Bab 6',
        body: 'Bab 4 (Rabiʿ) فَعِلَ يَفْعَلُ is the home of states and emotions, mostly intransitive: فَرِحَ (to be glad), حَزِنَ (to be sad), شَرِبَ (to drink), and also عَلِمَ (to know). Bab 5 (Khamis) فَعُلَ يَفْعُلُ is always intransitive and describes natural qualities: كَرُمَ, حَسُنَ, شَرُفَ. Its masdar often follows فَعَالَةٌ or فُعُولَةٌ. Bab 6 (Sadis) فَعِلَ يَفْعِلُ is rare. It includes most verbs beginning with waw, such as وَرِثَ يَرِثُ and وَثِقَ يَثِقُ, plus حَسِبَ يَحْسِبُ.',
        examples: [
          { ar: 'فَرِحَ يَفْرَحُ', translit: 'fariḥa yafraḥu', en: 'Bab 4: to be glad' },
          { ar: 'كَرُمَ يَكْرُمُ', translit: 'karuma yakrumu', en: 'Bab 5: to be generous' },
          { ar: 'وَرِثَ يَرِثُ', translit: 'warītha yarithu', en: 'Bab 6: to inherit' },
        ],
      },
      {
        heading: 'Masdar of the Bare Verb',
        body: 'The masdar of Thulathi Mujarrad is samāʿī, meaning it is learned from usage and has no single pattern. Common patterns include فَعْلٌ (ضَرْبٌ), فُعُولٌ (دُخُولٌ), فِعَالَةٌ (كِتَابَةٌ), فَعَلٌ (فَرَحٌ) and فِعْلٌ (عِلْمٌ). Always learn the masdar with the verb.',
      },
    ],
    quiz: [
      {
        id: 'ch19-q1',
        prompt: 'What is the pattern of Bab Awwal (Bab 1)?',
        options: ['فَعَلَ يَفْعُلُ', 'فَعَلَ يَفْعِلُ', 'فَعِلَ يَفْعَلُ', 'فَعُلَ يَفْعُلُ'],
        correctIndex: 0,
        explanation: 'Bab 1 is فَعَلَ يَفْعُلُ, as in نَصَرَ يَنْصُرُ.',
      },
      {
        id: 'ch19-q2',
        prompt: 'Which bab usually requires a throat letter in the verb?',
        options: ['Bab 1', 'Bab 2', 'Bab 3', 'Bab 5'],
        correctIndex: 2,
        explanation: 'Bab 3 (فَعَلَ يَفْعَلُ) usually has a throat letter in the middle or at the end.',
      },
      {
        id: 'ch19-q3',
        prompt: 'Which bab is always intransitive and describes natural qualities?',
        options: ['Bab 4', 'Bab 5', 'Bab 6', 'Bab 2'],
        correctIndex: 1,
        explanation: 'Bab 5 (فَعُلَ يَفْعُلُ) describes permanent qualities, like كَرُمَ.',
      },
      {
        id: 'ch19-q4',
        prompt: 'In which bab is وَرِثَ يَرِثُ found?',
        options: ['Bab 3', 'Bab 4', 'Bab 5', 'Bab 6'],
        correctIndex: 3,
        explanation: 'وَرِثَ يَرِثُ follows فَعِلَ يَفْعِلُ, which is Bab 6.',
      },
    ],
  },
  {
    id: 'ch-20-mazid-one-letter',
    number: 20,
    title: 'Thulathi Mazid: One Added Letter',
    arabicTitle: 'الثُّلَاثِيُّ الْمَزِيدُ بِحَرْفٍ وَاحِدٍ',
    summary: 'Forms IV, II and III with full patterns, meanings and examples.',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Overview',
        body: 'The Thulathi Mazid (ثُلَاثِيٌّ مَزِيدٌ) is a three-letter verb with extra letters added to the root. Three forms add one letter: Form IV adds a hamza, Form II doubles the middle radical, and Form III adds a long alif after the first radical.',
        table: {
          headers: ['Form', 'Past / present', 'Command', 'Masdar', 'Example'],
          rows: [
            ['IV', 'أَفْعَلَ يُفْعِلُ', 'أَفْعِلْ', 'إِفْعَالٌ', 'أَكْرَمَ يُكْرِمُ'],
            ['II', 'فَعَّلَ يُفَعِّلُ', 'فَعِّلْ', 'تَفْعِيلٌ', 'عَلَّمَ يُعَلِّمُ'],
            ['III', 'فَاعَلَ يُفَاعِلُ', 'فَاعِلْ', 'مُفَاعَلَةٌ / فِعَالٌ', 'كَاتَبَ يُكَاتِبُ'],
          ],
        },
      },
      {
        heading: 'Form IV: أَفْعَلَ',
        body: 'Form IV usually makes the verb causative or transitive: خَرَجَ (he went out) becomes أَخْرَجَ (he took out). Its hamza is a hamzat al-qaṭʿ, so it is pronounced in the command (أَكْرِمْ). In the present tense the hamza drops and the prefix takes damma: يُكْرِمُ.',
        examples: [
          { ar: 'أَكْرَمَ يُكْرِمُ إِكْرَامًا', translit: 'akrama yukrimu ikrāman', en: 'to honour' },
          { ar: 'أَخْرَجَ يُخْرِجُ إِخْرَاجًا', translit: 'akhraja yukhriju ikhrājan', en: 'to take out' },
          { ar: 'أَرْسَلَ يُرْسِلُ إِرْسَالًا', translit: 'arsala yursilu irsālan', en: 'to send' },
        ],
      },
      {
        heading: 'Form II: فَعَّلَ',
        body: 'Form II doubles the middle radical with shaddah. It often means intensity (كَسَّرَ to smash), causing (فَرَّحَ to make glad) or making someone do the action (عَلَّمَ to teach). The usual masdar is تَفْعِيلٌ. For weak last radicals the masdar becomes تَفْعِلَةٌ, as in زَكَّى تَزْكِيَةً.',
        examples: [
          { ar: 'عَلَّمَ يُعَلِّمُ تَعْلِيمًا', translit: 'ʿallama yuʿallimu taʿlīman', en: 'to teach' },
          { ar: 'كَسَّرَ يُكَسِّرُ تَكْسِيرًا', translit: 'kassara yukassiru taksīran', en: 'to smash' },
          { ar: 'فَرَّحَ يُفَرِّحُ تَفْرِيحًا', translit: 'farraḥa yufarriḥu tafrīḥan', en: 'to make glad' },
        ],
      },
      {
        heading: 'Form III: فَاعَلَ',
        body: 'Form III adds an alif after the first radical and shows an action directed at, or shared with, another person. Its masdar is either مُفَاعَلَةٌ or فِعَالٌ.',
        examples: [
          { ar: 'كَاتَبَ يُكَاتِبُ مُكَاتَبَةً', translit: 'kātaba yukātibu mukātabatan', en: 'to correspond with' },
          { ar: 'قَاتَلَ يُقَاتِلُ قِتَالًا', translit: 'qātala yuqātilu qitālan', en: 'to fight' },
          { ar: 'سَاعَدَ يُسَاعِدُ مُسَاعَدَةً', translit: 'sāʿada yusāʿidu musāʿadatan', en: 'to help' },
        ],
      },
    ],
    quiz: [
      {
        id: 'ch20-q1',
        prompt: 'Which form adds a hamza to the root?',
        options: ['Form II', 'Form III', 'Form IV', 'Form V'],
        correctIndex: 2,
        explanation: 'Form IV is أَفْعَلَ.',
      },
      {
        id: 'ch20-q2',
        prompt: 'The masdar of عَلَّمَ is:',
        options: ['إِعْلَامٌ', 'تَعْلِيمٌ', 'مُعَالَمَةٌ', 'تَعَلُّمٌ'],
        correctIndex: 1,
        explanation: 'Form II masdar is تَفْعِيلٌ, so تَعْلِيمٌ.',
      },
      {
        id: 'ch20-q3',
        prompt: 'Which form often means doing something with or towards another person?',
        options: ['Form II', 'Form III', 'Form IV', 'Form IX'],
        correctIndex: 1,
        explanation: 'Form III (فَاعَلَ) expresses participation or interaction.',
      },
    ],
  },
  {
    id: 'ch-21-mazid-two-letters',
    number: 21,
    title: 'Thulathi Mazid: Two Added Letters',
    arabicTitle: 'الثُّلَاثِيُّ الْمَزِيدُ بِحَرْفَيْنِ',
    summary: 'Forms V, VI, VII, VIII and IX, including the ta changes in Form VIII.',
    readingMinutes: 9,
    sections: [
      {
        heading: 'Overview',
        body: 'Five forms add two letters to the root. Forms V and VI add a ta prefix to Forms II and III. Forms VII and VIII add a hamzat al-waṣl with nun or ta. Form IX adds a hamzat al-waṣl and doubles the last radical.',
        table: {
          headers: ['Form', 'Past / present', 'Masdar', 'Example'],
          rows: [
            ['V', 'تَفَعَّلَ يَتَفَعَّلُ', 'تَفَعُّلٌ', 'تَعَلَّمَ يَتَعَلَّمُ'],
            ['VI', 'تَفَاعَلَ يَتَفَاعَلُ', 'تَفَاعُلٌ', 'تَكَاتَبَ يَتَكَاتَبُ'],
            ['VII', 'اِنْفَعَلَ يَنْفَعِلُ', 'اِنْفِعَالٌ', 'اِنْكَسَرَ يَنْكَسِرُ'],
            ['VIII', 'اِفْتَعَلَ يَفْتَعِلُ', 'اِفْتِعَالٌ', 'اِجْتَمَعَ يَجْتَمِعُ'],
            ['IX', 'اِفْعَلَّ يَفْعَلُّ', 'اِفْعِلَالٌ', 'اِحْمَرَّ يَحْمَرُّ'],
          ],
        },
      },
      {
        heading: 'Form V and Form VI',
        body: 'Form V (تَفَعَّلَ) is often the reflexive of Form II: عَلَّمَ (he taught) gives تَعَلَّمَ (he learned). Form VI (تَفَاعَلَ) is often reciprocal: two or more people do the action to each other. It can also mean pretending, as in تَمَارَضَ (he pretended to be ill).',
        examples: [
          { ar: 'تَعَلَّمَ يَتَعَلَّمُ تَعَلُّمًا', translit: 'taʿallama yataʿallamu taʿallumān', en: 'to learn' },
          { ar: 'تَقَدَّمَ يَتَقَدَّمُ تَقَدُّمًا', translit: 'taqaddama yataqaddamu taqaddumān', en: 'to advance' },
          { ar: 'تَعَاوَنَ يَتَعَاوَنُ تَعَاوُنًا', translit: 'taʿāwana yataʿāwanu taʿāwunān', en: 'to cooperate' },
          { ar: 'تَكَاتَبَ يَتَكَاتَبُ تَكَاتُبًا', translit: 'takātaba yatakātabu takātubān', en: 'to write to each other' },
        ],
      },
      {
        heading: 'Form VII: اِنْفَعَلَ',
        body: 'Form VII adds a nun and a hamzat al-waṣl. It gives a passive or reflexive meaning and is only made from transitive verbs, so it has no passive participle: كَسَرَ (he broke) gives اِنْكَسَرَ (it broke). The hamza of this form is dropped when something comes before it in speech.',
        examples: [
          { ar: 'اِنْكَسَرَ يَنْكَسِرُ اِنْكِسَارًا', translit: 'inkasara yankasiru inkisāran', en: 'to be broken' },
          { ar: 'اِنْفَصَلَ يَنْفَصِلُ اِنْفِصَالًا', translit: 'infaṣala yanfaṣilu infiṣālan', en: 'to be separated' },
        ],
      },
      {
        heading: 'Form VIII: اِفْتَعَلَ and the Ta Changes',
        body: 'Form VIII inserts a ta after the first radical. It is often reflexive or middle. The ta changes with the first radical: after ص ض ط ظ it becomes ط (اِصْطَبَرَ from ص-ب-ر); after د ذ ز it becomes د (اِزْدَحَمَ from ز-ح-م and اِدَّكَرَ from ذ-ك-ر); and after a weak first radical و or ي the two letters merge into a doubled ta (اِتَّصَلَ from و-ص-ل, اِتَّفَقَ from و-ف-ق).',
        table: {
          headers: ['First radical', 'Change', 'Example'],
          rows: [
            ['ص ض ط ظ', 'ta becomes ط', 'اِصْطَبَرَ · اِضْطَرَبَ'],
            ['د ذ ز', 'ta becomes د', 'اِزْدَحَمَ · اِدَّكَرَ'],
            ['و ي (weak)', 'merges as تّ', 'اِتَّصَلَ · اِتَّفَقَ'],
          ],
        },
        examples: [
          { ar: 'اِجْتَمَعَ يَجْتَمِعُ اِجْتِمَاعًا', translit: 'ijtamaʿa yajtamiʿu ijtimāʿan', en: 'to meet' },
          { ar: 'اِنْتَظَرَ يَنْتَظِرُ اِنْتِظَارًا', translit: 'intaẓara yantaẓiru intiẓāran', en: 'to wait' },
        ],
      },
      {
        heading: 'Form IX: اِفْعَلَّ',
        body: 'Form IX is used for colours and bodily defects, and it is intransitive. The last radical is doubled: اِحْمَرَّ (to become red), اِخْضَرَّ (to become green), اِصْفَرَّ (to become yellow). Its masdar is اِفْعِلَالٌ, as in اِحْمِرَارٌ.',
        examples: [
          { ar: 'اِحْمَرَّ يَحْمَرُّ اِحْمِرَارًا', translit: 'iḥmarra yaḥmarru iḥmirāran', en: 'to turn red' },
          { ar: 'اِخْضَرَّ يَخْضَرُّ اِخْضِرَارًا', translit: 'ikhḍarra yakhḍarru ikhḍirāran', en: 'to turn green' },
        ],
      },
    ],
    quiz: [
      {
        id: 'ch21-q1',
        prompt: 'Which form is used for colours such as اِحْمَرَّ?',
        options: ['Form VI', 'Form VII', 'Form VIII', 'Form IX'],
        correctIndex: 3,
        explanation: 'Form IX (اِفْعَلَّ) describes colours and defects.',
      },
      {
        id: 'ch21-q2',
        prompt: 'What does the ta become after the first radical ص in Form VIII?',
        options: ['ت', 'د', 'ط', 'ظ'],
        correctIndex: 2,
        explanation: 'After ص ض ط ظ the ta changes to ط, as in اِصْطَبَرَ.',
      },
      {
        id: 'ch21-q3',
        prompt: 'Why does Form VII not have a passive participle?',
        options: [
          'It is made from transitive verbs and is already passive in meaning',
          'It has no masdar',
          'It always has a weak root',
          'It is only for colours',
        ],
        correctIndex: 0,
        explanation: 'Form VII has a passive or reflexive meaning itself, so it behaves as intransitive.',
      },
      {
        id: 'ch21-q4',
        prompt: 'Which form is usually reciprocal?',
        options: ['Form V', 'Form VI', 'Form VII', 'Form IX'],
        correctIndex: 1,
        explanation: 'Form VI (تَفَاعَلَ) usually means doing something to each other.',
      },
    ],
  },
  {
    id: 'ch-22-mazid-three-letters',
    number: 22,
    title: 'Thulathi Mazid: Three Added Letters',
    arabicTitle: 'الثُّلَاثِيُّ الْمَزِيدُ بِثَلَاثَةِ أَحْرُفٍ',
    summary: 'Form X in depth, plus the rare forms اِفْعَوْعَلَ, اِفْعَالَّ and اِفْعَوَّلَ.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Form X: اِسْتَفْعَلَ',
        body: 'Form X adds three letters (اِسْتَ) before the root. It is the most common form with three added letters. Its main meanings are asking for something (اِسْتَغْفَرَ to ask forgiveness), considering something to be so (اِسْتَحْسَنَ to consider good), and becoming (اِسْتَحْجَرَ to turn to stone). The masdar is اِسْتِفْعَالٌ.',
        table: {
          headers: ['Past / present', 'Command', 'Masdar', 'Active / passive participle'],
          rows: [
            ['اِسْتَفْعَلَ يَسْتَفْعِلُ', 'اِسْتَفْعِلْ', 'اِسْتِفْعَالٌ', 'مُسْتَفْعِلٌ / مُسْتَفْعَلٌ'],
          ],
        },
        examples: [
          { ar: 'اِسْتَغْفَرَ يَسْتَغْفِرُ اِسْتِغْفَارًا', translit: 'istaghfara yastaghfiru istighfāran', en: 'to seek forgiveness' },
          { ar: 'اِسْتَخْرَجَ يَسْتَخْرِجُ اِسْتِخْرَاجًا', translit: 'istakhraja yastakhriju istikhrājan', en: 'to extract' },
          { ar: 'اِسْتَعْمَلَ يَسْتَعْمِلُ اِسْتِعْمَالًا', translit: 'istaʿmala yastaʿmilu istiʿmālan', en: 'to use' },
        ],
      },
      {
        heading: 'Rare Three-Letter Additions',
        body: 'Three more forms add three letters but are rare and mostly classical. They are intensive versions of the simpler forms.',
        table: {
          headers: ['Pattern', 'Masdar', 'Example', 'Meaning'],
          rows: [
            ['اِفْعَوْعَلَ يَفْعَوْعِلُ', 'اِفْعِيعَالٌ', 'اِخْشَوْشَنَ', 'to become very rough'],
            ['اِفْعَالَّ يَفْعَالُّ', 'اِفْعِيلَالٌ', 'اِحْمَارَّ', 'to turn deep red'],
            ['اِفْعَوَّلَ يَفْعَوِّلُ', 'اِفْعِوَّالٌ', 'اِجْلَوَّذَ', 'to move fast'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'ch22-q1',
        prompt: 'What is the masdar pattern of Form X?',
        options: ['إِفْعَالٌ', 'اِسْتِفْعَالٌ', 'تَفَعُّلٌ', 'اِفْتِعَالٌ'],
        correctIndex: 1,
        explanation: 'Form X masdar is اِسْتِفْعَالٌ.',
      },
      {
        id: 'ch22-q2',
        prompt: 'اِسْتَغْفَرَ means:',
        options: ['to forgive', 'to ask forgiveness', 'to be forgiven', 'to sin'],
        correctIndex: 1,
        explanation: 'Form X often means asking for the root meaning: غَفَرَ (forgive) gives اِسْتَغْفَرَ (ask forgiveness).',
      },
    ],
  },
  {
    id: 'ch-23-ruba-i',
    number: 23,
    title: "Ruba'i: Four-Letter Verbs",
    arabicTitle: 'الرُّبَاعِيُّ الْمُجَرَّدُ وَالْمَزِيدُ',
    summary: 'Bare and extended four-radical verbs, with their patterns and masdars.',
    readingMinutes: 6,
    sections: [
      {
        heading: "Ruba'i Mujarrad: فَعْلَلَ",
        body: 'A Ruba\'i verb has four root letters. The bare form has one pattern, فَعْلَلَ يُفَعْلِلُ, with the masdar فَعْلَلَةٌ or فِعْلَالٌ. Its command form is فَعْلِلْ.',
        examples: [
          { ar: 'دَحْرَجَ يُدَحْرِجُ دَحْرَجَةً', translit: 'daḥraja yudaḥriju daḥrajatan', en: 'to roll' },
          { ar: 'تَرْجَمَ يُتَرْجِمُ تَرْجَمَةً', translit: 'tarjama yutarjimu tarjamatan', en: 'to translate' },
          { ar: 'زَلْزَلَ يُزَلْزِلُ زِلْزَالًا', translit: 'zalzala yuzalzilu zilzālan', en: 'to shake' },
        ],
      },
      {
        heading: "Ruba'i Mazid: Three Patterns",
        body: 'The extended four-letter verbs add letters to the bare pattern.',
        table: {
          headers: ['Pattern', 'Masdar', 'Example', 'Meaning'],
          rows: [
            ['تَفَعْلَلَ يَتَفَعْلَلُ', 'تَفَعْلُلٌ', 'تَدَحْرَجَ', 'to roll (by itself)'],
            ['اِفْعَنْلَلَ يَفْعَنْلِلُ', 'اِفْعِنْلَالٌ', 'اِحْرَنْجَمَ', 'to crowd together'],
            ['اِفْعَلَلَّ يَفْعَلِلُّ', 'اِفْعِلْلَالٌ', 'اِقْشَعَرَّ', 'to shiver'],
          ],
        },
      },
      {
        heading: 'Mulhaq bi-Ruba\u2019i',
        body: 'Some three-radical verbs are shaped like four-letter verbs by adding a letter. They are called Mulhaq (ملحق), meaning "attached". Examples are جَوْرَبَ (to put socks on), بَيْطَرَ (to practise veterinary medicine) and جَلْبَبَ (to clothe in a jilbab). They conjugate like فَعْلَلَ.',
      },
    ],
    quiz: [
      {
        id: 'ch23-q1',
        prompt: "What is the pattern of the Ruba'i Mujarrad verb?",
        options: ['فَعَّلَ', 'فَعْلَلَ', 'أَفْعَلَ', 'تَفَعْلَلَ'],
        correctIndex: 1,
        explanation: 'The bare four-letter pattern is فَعْلَلَ يُفَعْلِلُ.',
      },
      {
        id: 'ch23-q2',
        prompt: 'تَدَحْرَجَ follows which pattern?',
        options: ['تَفَعْلَلَ', 'اِفْعَنْلَلَ', 'اِفْعَلَلَّ', 'فَاعَلَ'],
        correctIndex: 0,
        explanation: 'تَدَحْرَجَ is تَفَعْلَلَ, the reflexive of دَحْرَجَ.',
      },
    ],
  },
  {
    id: 'ch-24-abwab-index-study-path',
    number: 24,
    title: 'Complete Index of Abwab and Study Path',
    arabicTitle: 'فِهْرِسُ الْأَبْوَابِ',
    summary: 'Every bab of Sarf in one list, plus a beginner-to-advanced study path.',
    readingMinutes: 7,
    sections: [
      {
        heading: 'All Abwab at a Glance',
        body: 'This is the complete list of verb abwab covered in this app: six bare three-letter babs, the extended three-letter forms, and the four-letter forms.',
        table: {
          headers: ['#', 'Category', 'Pattern', 'Example'],
          rows: [
            ['1', 'Mujarrad · Bab 1', 'فَعَلَ يَفْعُلُ', 'نَصَرَ يَنْصُرُ'],
            ['2', 'Mujarrad · Bab 2', 'فَعَلَ يَفْعِلُ', 'ضَرَبَ يَضْرِبُ'],
            ['3', 'Mujarrad · Bab 3', 'فَعَلَ يَفْعَلُ', 'فَتَحَ يَفْتَحُ'],
            ['4', 'Mujarrad · Bab 4', 'فَعِلَ يَفْعَلُ', 'سَمِعَ يَسْمَعُ'],
            ['5', 'Mujarrad · Bab 5', 'فَعُلَ يَفْعُلُ', 'كَرُمَ يَكْرُمُ'],
            ['6', 'Mujarrad · Bab 6', 'فَعِلَ يَفْعِلُ', 'حَسِبَ يَحْسِبُ'],
            ['7', 'Mazid 1 letter · IV', 'أَفْعَلَ يُفْعِلُ', 'أَكْرَمَ يُكْرِمُ'],
            ['8', 'Mazid 1 letter · II', 'فَعَّلَ يُفَعِّلُ', 'عَلَّمَ يُعَلِّمُ'],
            ['9', 'Mazid 1 letter · III', 'فَاعَلَ يُفَاعِلُ', 'كَاتَبَ يُكَاتِبُ'],
            ['10', 'Mazid 2 letters · V', 'تَفَعَّلَ يَتَفَعَّلُ', 'تَعَلَّمَ يَتَعَلَّمُ'],
            ['11', 'Mazid 2 letters · VI', 'تَفَاعَلَ يَتَفَاعَلُ', 'تَعَاوَنَ يَتَعَاوَنُ'],
            ['12', 'Mazid 2 letters · VII', 'اِنْفَعَلَ يَنْفَعِلُ', 'اِنْكَسَرَ يَنْكَسِرُ'],
            ['13', 'Mazid 2 letters · VIII', 'اِفْتَعَلَ يَفْتَعِلُ', 'اِجْتَمَعَ يَجْتَمِعُ'],
            ['14', 'Mazid 2 letters · IX', 'اِفْعَلَّ يَفْعَلُّ', 'اِحْمَرَّ يَحْمَرُّ'],
            ['15', 'Mazid 3 letters · X', 'اِسْتَفْعَلَ يَسْتَفْعِلُ', 'اِسْتَغْفَرَ يَسْتَغْفِرُ'],
            ['16', 'Mazid 3 letters · rare', 'اِفْعَوْعَلَ يَفْعَوْعِلُ', 'اِخْشَوْشَنَ'],
            ['17', 'Mazid 3 letters · rare', 'اِفْعَالَّ يَفْعَالُّ', 'اِحْمَارَّ'],
            ['18', 'Mazid 3 letters · rare', 'اِفْعَوَّلَ يَفْعَوِّلُ', 'اِجْلَوَّذَ'],
            ['19', "Ruba'i Mujarrad", 'فَعْلَلَ يُفَعْلِلُ', 'دَحْرَجَ يُدَحْرِجُ'],
            ['20', "Ruba'i Mazid", 'تَفَعْلَلَ يَتَفَعْلَلُ', 'تَدَحْرَجَ يَتَدَحْرَجُ'],
            ['21', "Ruba'i Mazid", 'اِفْعَنْلَلَ يَفْعَنْلِلُ', 'اِحْرَنْجَمَ يَحْرَنْجِمُ'],
            ['22', "Ruba'i Mazid", 'اِفْعَلَلَّ يَفْعَلِلُّ', 'اِقْشَعَرَّ يَقْشَعِرُّ'],
          ],
        },
      },
      {
        heading: 'Study Path: Beginner to Advanced',
        body: 'Follow this order. Beginner: chapters 1–3 (letters, roots, three and four letters). Foundation: chapters 4–7 and 19–22 (the ten forms, the six abwab, tenses, masdars). Intermediate: chapters 8, 14 and 20–23 (derived nouns, transitivity, one, two and three added letters, four-letter verbs). Advanced: chapters 9–13 and 15–17 (weak verbs and iʿlāl, ibdāl and idghām, hamza, number and declension, broken plurals, diminutive, nisba, diptotes). Use chapter 18 and this index for revision, and search each verb in the Dictionary to practise.',
      },
    ],
    quiz: [
      {
        id: 'ch24-q1',
        prompt: 'How many bare three-letter abwab are there?',
        options: ['Four', 'Five', 'Six', 'Ten'],
        correctIndex: 2,
        explanation: 'The Thulathi Mujarrad has six abwab.',
      },
      {
        id: 'ch24-q2',
        prompt: 'Which pattern is Form VIII?',
        options: ['اِفْتَعَلَ', 'اِنْفَعَلَ', 'اِسْتَفْعَلَ', 'تَفَاعَلَ'],
        correctIndex: 0,
        explanation: 'Form VIII is اِفْتَعَلَ يَفْتَعِلُ.',
      },
    ],
  },
];
