import type { BookChapter } from './bookChaptersPart1';

export const BOOK_CHAPTERS_PART_5: BookChapter[] = [
  {
    id: 'nahw-01-introduction',
    number: 25,
    subject: 'nahw',
    title: 'Nahw: Introduction',
    arabicTitle: 'مُقَدِّمَةٌ فِي عِلْمِ النَّحْوِ',
    summary: 'What Nahw is, who founded it, how it differs from Sarf, and the meaning of Kalima, Kalam and Jumla.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'What Is Nahw?',
        arabicBody: 'النَّحْوُ عِلْمٌ بِأُصُولٍ يُعْرَفُ بِهَا أَحْوَالُ أَوَاخِرِ الْكَلِمَاتِ الْعَرَبِيَّةِ مِنْ إِعْرَابٍ وَبِنَاءٍ، وَغَايَتُهُ صِيَانَةُ اللِّسَانِ مِنَ اللَّحْنِ وَفَهْمُ الْكَلَامِ فَهْمًا صَحِيحًا.',
        body: 'Ilm al-Nahw (عِلْمُ النَّحْوِ) is the science of Arabic syntax. It studies how words combine into sentences, and how the ending of each word changes according to its job in the sentence (this change is called I\u02BFrab). Its aim is to protect speech and writing from error (اللَّحْنُ) and to let you identify the role of every word: doer, object, predicate, modifier and so on.',
        examples: [
          { ar: 'ضَرَبَ زَيْدٌ عَمْرًا', translit: 'ḍaraba zaydun ʿamran', en: 'Zayd hit Amr. The endings show who did the hitting.' },
          { ar: 'ضَرَبَ زَيْدًا عَمْرٌ', translit: 'ḍaraba zaydan ʿamrun', en: 'Amr hit Zayd. Only the endings changed the meaning.' },
        ],
      },
      {
        heading: 'Founders and Classic Books',
        arabicBody: 'تُنْسَبُ نَشْأَةُ النَّحْوِ إِلَى أَبِي الْأَسْوَدِ الدُّؤَلِيِّ، ثُمَّ نَضَجَ عَلَى يَدِ الْخَلِيلِ بْنِ أَحْمَدَ وَتِلْمِيذِهِ سِيبَوَيْهِ صَاحِبِ «الْكِتَابِ».',
        body: 'Abu al-Aswad al-Du\u2019ali is credited with starting Nahw, after errors in reciting the Quran spread. Al-Khalil ibn Ahmad and his student Sibawayh (author of al-Kitab) built the science. Later, Ibn Ajurrum wrote al-Ajurrumiyya for beginners, and Ibn Malik wrote the Alfiyya, a thousand-line poem that covers the whole subject.',
      },
      {
        heading: 'Sarf Versus Nahw',
        arabicBody: 'الصَّرْفُ يَبْحَثُ فِي بِنْيَةِ الْكَلِمَةِ الْمُفْرَدَةِ وَأَوْزَانِهَا، وَالنَّحْوُ يَبْحَثُ فِي أَحْوَالِ الْكَلِمَاتِ إِذَا رُكِّبَتْ فِي الْجُمَلِ.',
        body: 'Sarf studies the form of a single word: its root, pattern, tenses and plurals. Nahw studies words in a sentence: their order, their relationships and their endings. You need both: Sarf builds the word, and Nahw places it.',
        table: {
          headers: ['', 'Sarf (morphology)', 'Nahw (syntax)'],
          rows: [
            ['Studies', 'A single word', 'Words inside a sentence'],
            ['Asks', 'What is its root and pattern?', 'What is its role and ending?'],
            ['Example topic', 'Form II of كَتَبَ', 'Why is الطَّالِبُ marfu\u02BF?'],
          ],
        },
      },
      {
        heading: 'Kalima, Kalam and Jumla',
        arabicBody: 'الْكَلِمَةُ لَفْظٌ وُضِعَ لِمَعْنًى مُفْرَدٍ، وَالْكَلَامُ هُوَ اللَّفْظُ الْمُرَكَّبُ الْمُفِيدُ فَائِدَةً يَحْسُنُ السُّكُوتُ عَلَيْهَا.',
        body: 'A Kalima (كَلِمَةٌ) is a single meaningful word. A Kalam (كَلَامٌ) is a composed, useful utterance whose meaning is complete: اللَّفْظُ الْمُرَكَّبُ الْمُفِيدُ. A Jumla (جُمْلَةٌ) is a sentence or clause. "The student" is not Kalam, because it leaves you waiting. "The student is diligent" is Kalam.',
        examples: [
          { ar: 'الطَّالِبُ', translit: 'aṭ-ṭālibu', en: 'Kalima only: incomplete meaning.' },
          { ar: 'الطَّالِبُ مُجْتَهِدٌ', translit: 'aṭ-ṭālibu mujtahidun', en: 'Kalam: complete meaning.' },
        ],
      },
    ],
    quiz: [
      {
        id: 'nahw01-q1',
        prompt: 'What is the main aim of Nahw?',
        options: ['To build verb forms', 'To protect against errors in word endings and sentence structure', 'To teach vocabulary', 'To explain handwriting'],
        correctIndex: 1,
        explanation: 'Nahw prevents Lahn (errors) and defines each word\u2019s role and ending.',
      },
      {
        id: 'nahw01-q2',
        prompt: 'Which science studies a single word\u2019s root and pattern?',
        options: ['Nahw', 'Sarf', 'Balagha', 'Tajwid'],
        correctIndex: 1,
        explanation: 'Sarf studies the internal form of a word. Nahw studies words in a sentence.',
      },
      {
        id: 'nahw01-q3',
        prompt: 'Which of these is a complete Kalam?',
        options: ['الطَّالِبُ', 'فِي الْبَيْتِ', 'الْعِلْمُ نُورٌ', 'كِتَابُ الطَّالِبِ'],
        correctIndex: 2,
        explanation: 'الْعِلْمُ نُورٌ is a complete sentence. The others leave the meaning unfinished.',
      },
    ],
  },
  {
    id: 'nahw-02-parts-of-speech',
    number: 26,
    subject: 'nahw',
    title: 'The Three Parts of Speech',
    arabicTitle: 'أَقْسَامُ الْكَلِمَةِ',
    summary: 'Ism, Fi\u02BFl and Harf, how to recognise each, and the three kinds of verb.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Ism, Fi\u02BFl, Harf',
        arabicBody: 'الْكَلِمَةُ ثَلَاثَةُ أَقْسَامٍ: اسْمٌ وَفِعْلٌ وَحَرْفٌ. فَالِاسْمُ مَا دَلَّ عَلَى مَعْنًى فِي نَفْسِهِ غَيْرِ مُقْتَرِنٍ بِزَمَنٍ، وَالْفِعْلُ مَا دَلَّ عَلَى مَعْنًى فِي نَفْسِهِ وَاقْتَرَنَ بِزَمَنٍ، وَالْحَرْفُ مَا دَلَّ عَلَى مَعْنًى فِي غَيْرِهِ.',
        body: 'Every Arabic word is one of three kinds. An Ism (اِسْمٌ, noun) names a person, thing, place, idea or quality. A Fi\u02BFl (فِعْلٌ, verb) names an action or state tied to a time. A Harf (حَرْفٌ, particle) has no full meaning alone and needs an Ism or Fi\u02BFl to complete it.',
        table: {
          headers: ['Kind', 'Signs that identify it', 'Example'],
          rows: [
            ['اِسْمٌ', 'Tanwin, ال, jarr (genitive), the call يَا, being the subject of a sentence', 'كِتَابٌ · الْبَيْتُ'],
            ['فِعْلٌ', 'قَدْ, سَـ or سَوْفَ, تَاءُ التَّأْنِيثِ السَّاكِنَةُ (كَتَبَتْ), تَاءُ الْفَاعِلِ (كَتَبْتُ)', 'كَتَبَ · يَكْتُبُ'],
            ['حَرْفٌ', 'Has none of the signs of Ism or Fi\u02BFl', 'فِي · لَمْ · وَ'],
          ],
        },
      },
      {
        heading: 'Three Kinds of Verb',
        arabicBody: 'الْفِعْلُ ثَلَاثَةُ أَقْسَامٍ: مَاضٍ وَمُضَارِعٌ وَأَمْرٌ. فَالْمَاضِي مَا دَلَّ عَلَى حَدَثٍ وَقَعَ وَانْقَضَى، وَالْمُضَارِعُ مَا دَلَّ عَلَى حَدَثٍ يَقَعُ فِي الْحَالِ أَوِ الِاسْتِقْبَالِ، وَالْأَمْرُ طَلَبُ حُصُولِ الْفِعْلِ مِنَ الْمُخَاطَبِ.',
        body: 'The Madi (مَاضٍ, past) is always Mabni. The Mudari\u02BF (مُضَارِعٌ, present or future) begins with أ ن ي ت and is usually Mu\u02BFrab. The Amr (أَمْرٌ, command) asks for an action and is Mabni. Mabni and Mu\u02BFrab are explained in the next chapter.',
        examples: [
          { ar: 'كَتَبَ', translit: 'kataba', en: 'Madi: he wrote' },
          { ar: 'يَكْتُبُ', translit: 'yaktubu', en: 'Mudari\u02BF: he writes' },
          { ar: 'اُكْتُبْ', translit: 'uktub', en: 'Amr: write!' },
        ],
      },
      {
        heading: 'How Verbs Are Built',
        body: 'The Madi is built on fatha (كَتَبَ), on damma before the plural waw (كَتَبُوا), and on sukun before the doer\u2019s ta (كَتَبْتُ). The Amr is built on sukun (اُكْتُبْ), on removal of nun in the five verbs (اُكْتُبُوا) and on removal of the weak last letter (اِرْمِ). The Mudari\u02BF is Mabni only when it joins the feminine plural nun (يَكْتُبْنَ, on sukun) or the emphatic nun (لَيَكْتُبَنَّ, on fatha).',
      },
    ],
    quiz: [
      {
        id: 'nahw02-q1',
        prompt: 'Which sign identifies an Ism?',
        options: ['قَدْ', 'Tanwin', 'سَوْفَ', 'تَاءُ الْفَاعِلِ'],
        correctIndex: 1,
        explanation: 'Tanwin, ال, jarr and the call يَا are signs of the noun.',
      },
      {
        id: 'nahw02-q2',
        prompt: 'In which category is لَمْ?',
        options: ['Ism', 'Fi\u02BFl', 'Harf', 'Masdar'],
        correctIndex: 2,
        explanation: 'لَمْ has no sign of Ism or Fi\u02BFl, so it is a Harf.',
      },
      {
        id: 'nahw02-q3',
        prompt: 'The Amr verb is:',
        options: ['Always Mu\u02BFrab', 'Mabni', 'Always Marfu\u02BF', 'A kind of Ism'],
        correctIndex: 1,
        explanation: 'The command verb is Mabni, for example اُكْتُبْ is built on sukun.',
      },
    ],
  },
  {
    id: 'nahw-03-irab-basics',
    number: 27,
    subject: 'nahw',
    title: 'I\u02BFrab and Bina: The Four States',
    arabicTitle: 'الْإِعْرَابُ وَالْبِنَاءُ',
    summary: 'Mu\u02BFrab versus Mabni, the four states, their original markers and the estimated endings.',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Mu\u02BFrab and Mabni',
        arabicBody: 'الْمُعْرَبُ مَا تَغَيَّرَ آخِرُهُ بِاخْتِلَافِ الْعَوَامِلِ الدَّاخِلَةِ عَلَيْهِ لَفْظًا أَوْ تَقْدِيرًا، وَالْمَبْنِيُّ مَا لَزِمَ آخِرُهُ حَالَةً وَاحِدَةً.',
        body: 'A Mu\u02BFrab (مُعْرَبٌ) word changes its ending because of a governing word, called the \u02BFAmil (عَامِلٌ). The word that is affected is the Ma\u02BFmul (مَعْمُولٌ). A Mabni (مَبْنِيٌّ) word keeps one fixed ending wherever it appears. Most nouns and the present verb are Mu\u02BFrab. All particles, past verbs, commands, pronouns, demonstratives and relative pronouns are Mabni.',
      },
      {
        heading: 'The Four States',
        arabicBody: 'أَنْوَاعُ الْإِعْرَابِ أَرْبَعَةٌ: الرَّفْعُ وَالنَّصْبُ وَالْجَرُّ وَالْجَزْمُ؛ فَلِلْأَسْمَاءِ الرَّفْعُ وَالنَّصْبُ وَالْجَرُّ وَلَا جَزْمَ فِيهَا، وَلِلْأَفْعَالِ الرَّفْعُ وَالنَّصْبُ وَالْجَزْمُ وَلَا جَرَّ فِيهَا.',
        body: 'There are four states (حَالَاتُ الْإِعْرَابِ). Nouns have three: Raf\u02BF, Nasb and Jarr. The present verb has three: Raf\u02BF, Nasb and Jazm. Jarr belongs only to nouns, and Jazm belongs only to verbs.',
        table: {
          headers: ['State', 'Original marker', 'Applies to', 'Typical jobs'],
          rows: [
            ['الرَّفْعُ (nominative)', 'Damma ـُ', 'Nouns, present verb', 'Fa\u02BFil, Mubtada\u2019, Khabar'],
            ['النَّصْبُ (accusative)', 'Fatha ـَ', 'Nouns, present verb', 'Maf\u02BFul, Hal, Tamyiz, Zarf'],
            ['الْجَرُّ (genitive)', 'Kasra ـِ', 'Nouns only', 'After a preposition, Mudaf Ilayh'],
            ['الْجَزْمُ (jussive)', 'Sukun ـْ', 'Present verb only', 'After لَمْ, لَا النَّاهِيَةِ, conditionals'],
          ],
        },
        examples: [
          { ar: 'جَاءَ الطَّالِبُ', translit: 'jāʾa aṭ-ṭālibu', en: 'Raf\u02BF: the student came' },
          { ar: 'رَأَيْتُ الطَّالِبَ', translit: 'raʾaytu aṭ-ṭāliba', en: 'Nasb: I saw the student' },
          { ar: 'مَرَرْتُ بِالطَّالِبِ', translit: 'marartu biṭ-ṭālibi', en: 'Jarr: I passed by the student' },
        ],
      },
      {
        heading: 'Estimated Endings (Muqaddar)',
        arabicBody: 'الْإِعْرَابُ التَّقْدِيرِيُّ مَا لَا تَظْهَرُ عَلَامَتُهُ عَلَى آخِرِ الْكَلِمَةِ لِتَعَذُّرٍ أَوْ ثِقَلٍ.',
        body: 'Sometimes the marker cannot be pronounced, so it is only estimated. Words ending in alif maqsura (الْفَتَى) carry all three states on the alif, estimated because it is impossible to pronounce a vowel on it. Words ending in a weak ya (الْقَاضِي) show an estimated damma and kasra, because they are heavy, while the fatha appears. In your analysis, write "the marker is estimated on the last letter".',
        examples: [
          { ar: 'جَاءَ الْفَتَى', translit: 'jāʾa al-fatā', en: 'Raf\u02BF, estimated on alif' },
          { ar: 'جَاءَ الْقَاضِي', translit: 'jāʾa al-qāḍī', en: 'Raf\u02BF, estimated damma on ya' },
          { ar: 'رَأَيْتُ الْقَاضِيَ', translit: 'raʾaytu al-qāḍiya', en: 'Nasb, fatha is shown' },
        ],
      },
    ],
    quiz: [
      {
        id: 'nahw03-q1',
        prompt: 'Which state belongs only to verbs?',
        options: ['Raf\u02BF', 'Nasb', 'Jarr', 'Jazm'],
        correctIndex: 3,
        explanation: 'Jazm belongs only to the present verb. Jarr belongs only to nouns.',
      },
      {
        id: 'nahw03-q2',
        prompt: 'What is the original marker of Nasb?',
        options: ['Damma', 'Fatha', 'Kasra', 'Sukun'],
        correctIndex: 1,
        explanation: 'The original marker of Nasb is the fatha.',
      },
      {
        id: 'nahw03-q3',
        prompt: 'Which of these is always Mabni?',
        options: ['كِتَابٌ', 'يَكْتُبُ', 'كَتَبَ', 'الْبَيْتُ'],
        correctIndex: 2,
        explanation: 'The past verb is always Mabni.',
      },
      {
        id: 'nahw03-q4',
        prompt: 'In جَاءَ الْفَتَى, why is the damma not shown?',
        options: ['It is Mabni', 'It is estimated on the alif', 'It is Jarr', 'It is a verb'],
        correctIndex: 1,
        explanation: 'A vowel cannot be pronounced on alif maqsura, so the marker is estimated.',
      },
    ],
  },
  {
    id: 'nahw-04-substitute-markers',
    number: 28,
    subject: 'nahw',
    title: 'Substitute Markers',
    arabicTitle: 'عَلَامَاتُ الْإِعْرَابِ الْفَرْعِيَّةُ',
    summary: 'The five nouns, dual, sound plurals, diptotes, the five verbs and weak verbs.',
    readingMinutes: 8,
    sections: [
      {
        heading: 'Overview',
        arabicBody: 'لِلْإِعْرَابِ عَلَامَاتٌ أَصْلِيَّةٌ هِيَ الضَّمَّةُ وَالْفَتْحَةُ وَالْكَسْرَةُ وَالسُّكُونُ، وَعَلَامَاتٌ فَرْعِيَّةٌ تَنُوبُ عَنْهَا هِيَ الْوَاوُ وَالْأَلِفُ وَالْيَاءُ وَالنُّونُ وَحَذْفُ حَرْفِ الْعِلَّةِ وَحَذْفُ النُّونِ.',
        body: 'Some words show their state with letters instead of the original damma, fatha and kasra. These are the substitute markers (الْعَلَامَاتُ الْفَرْعِيَّةُ). Learn them as a set.',
        table: {
          headers: ['Word type', 'Raf\u02BF', 'Nasb', 'Jarr'],
          rows: [
            ['Five nouns (الْأَسْمَاءُ الْخَمْسَةُ)', 'waw: أَبُوكَ', 'alif: أَبَاكَ', 'ya: أَبِيكَ'],
            ['Dual (الْمُثَنَّى)', 'alif: الْمُسْلِمَانِ', 'ya: الْمُسْلِمَيْنِ', 'ya: الْمُسْلِمَيْنِ'],
            ['Sound masc. plural', 'waw: الْمُسْلِمُونَ', 'ya: الْمُسْلِمِينَ', 'ya: الْمُسْلِمِينَ'],
            ['Sound fem. plural', 'damma: الْمُسْلِمَاتُ', 'kasra: الْمُسْلِمَاتِ', 'kasra: الْمُسْلِمَاتِ'],
            ['Diptote (مَمْنُوعٌ مِنَ الصَّرْفِ)', 'damma: أَحْمَدُ', 'fatha: أَحْمَدَ', 'fatha: أَحْمَدَ'],
            ['Five verbs (الْأَفْعَالُ الْخَمْسَةُ)', 'nun stays', 'nun dropped', 'nun dropped (jazm)'],
          ],
        },
      },
      {
        heading: 'The Five Nouns',
        arabicBody: 'الْأَسْمَاءُ الْخَمْسَةُ تُرْفَعُ بِالْوَاوِ وَتُنْصَبُ بِالْأَلِفِ وَتُجَرُّ بِالْيَاءِ، بِشَرْطِ أَنْ تُضَافَ إِلَى غَيْرِ يَاءِ الْمُتَكَلِّمِ.',
        body: 'The five nouns are أَبٌ (father), أَخٌ (brother), حَمٌ (father-in-law), فُو (mouth) and ذُو (owner of). They use waw, alif and ya only when they are annexed (Mudaf) to a noun or pronoun other than the ya of the speaker.',
        examples: [
          { ar: 'جَاءَ أَبُو مُحَمَّدٍ', translit: 'jāʾa abū muḥammadin', en: 'Raf\u02BF with waw: Muhammad\u2019s father came' },
          { ar: 'رَأَيْتُ أَخَاكَ', translit: 'raʾaytu akhāka', en: 'Nasb with alif: I saw your brother' },
          { ar: 'مَرَرْتُ بِذِي مَالٍ', translit: 'marartu bi-dhī mālin', en: 'Jarr with ya: I passed an owner of wealth' },
        ],
      },
      {
        heading: 'Dual and Sound Plurals',
        arabicBody: 'الْمُثَنَّى مَا دَلَّ عَلَى اثْنَيْنِ بِزِيَادَةِ أَلِفٍ وَنُونٍ أَوْ يَاءٍ وَنُونٍ، وَجَمْعُ الْمُذَكَّرِ السَّالِمُ مَا دَلَّ عَلَى أَكْثَرَ مِنِ اثْنَيْنِ بِزِيَادَةِ وَاوٍ وَنُونٍ أَوْ يَاءٍ وَنُونٍ، وَجَمْعُ الْمُؤَنَّثِ السَّالِمُ مَا زِيدَ فِي آخِرِهِ أَلِفٌ وَتَاءٌ.',
        body: 'The dual ends with ـانِ in Raf\u02BF and ـيْنِ in Nasb and Jarr. The sound masculine plural ends with ـونَ in Raf\u02BF and ـينَ in Nasb and Jarr, with a fatha on the nun. The sound feminine plural keeps the damma in Raf\u02BF, and takes the kasra in both Nasb and Jarr instead of the fatha. When these words become Mudaf, they lose the final nun: كِتَابَا الطَّالِبِ and مُسْلِمُو مِصْرَ.',
      },
      {
        heading: 'Diptotes',
        arabicBody: 'الْمَمْنُوعُ مِنَ الصَّرْفِ اسْمٌ لَا يَقْبَلُ التَّنْوِينَ، وَيُجَرُّ بِالْفَتْحَةِ نِيَابَةً عَنِ الْكَسْرَةِ مَا لَمْ يُضَفْ أَوْ تَدْخُلْ عَلَيْهِ «أَلْ».',
        body: 'A diptote takes no tanwin, and takes a fatha in Jarr instead of the kasra. It returns to the kasra when it carries ال or is the first word of an idafa. Chapter 17 earlier in this book lists the categories.',
        examples: [
          { ar: 'صَلَّيْتُ فِي مَسَاجِدَ كَثِيرَةٍ', translit: 'ṣallaytu fī masājida kathīratin', en: 'I prayed in many mosques (fatha, no tanwin)' },
          { ar: 'صَلَّيْتُ فِي الْمَسَاجِدِ', translit: 'ṣallaytu fī al-masājidi', en: 'With ال, the kasra returns' },
        ],
      },
      {
        heading: 'The Five Verbs and Weak Verbs',
        arabicBody: 'الْأَفْعَالُ الْخَمْسَةُ كُلُّ فِعْلٍ مُضَارِعٍ اتَّصَلَتْ بِهِ أَلِفُ الِاثْنَيْنِ أَوْ وَاوُ الْجَمَاعَةِ أَوْ يَاءُ الْمُخَاطَبَةِ؛ تُرْفَعُ بِثُبُوتِ النُّونِ وَتُنْصَبُ وَتُجْزَمُ بِحَذْفِهَا.',
        body: 'The five verbs are the present forms that end with the dual alif, the plural waw or the feminine ya: يَفْعَلَانِ، تَفْعَلَانِ، يَفْعَلُونَ، تَفْعَلُونَ، تَفْعَلِينَ. They are Marfu\u02BF with the nun, and Mansub or Majzum by removing it. A weak-ending present verb is Majzum by removing its last letter.',
        examples: [
          { ar: 'الطُّلَّابُ يَكْتُبُونَ', translit: 'aṭ-ṭullābu yaktubūna', en: 'Raf\u02BF: nun stays' },
          { ar: 'لَنْ يَكْتُبُوا', translit: 'lan yaktubū', en: 'Nasb: nun dropped' },
          { ar: 'لَمْ يَدْعُ', translit: 'lam yadʿu', en: 'Jazm of a weak verb: the waw is dropped' },
        ],
      },
    ],
    quiz: [
      {
        id: 'nahw04-q1',
        prompt: 'What is the Nasb marker of أَبٌ when annexed (e.g. your father)?',
        options: ['Waw', 'Alif', 'Ya', 'Fatha only'],
        correctIndex: 1,
        explanation: 'The five nouns take waw, alif and ya: أَبُوكَ، أَبَاكَ، أَبِيكَ.',
      },
      {
        id: 'nahw04-q2',
        prompt: 'The Jarr marker of the sound feminine plural is:',
        options: ['Fatha', 'Kasra', 'Ya', 'Alif'],
        correctIndex: 1,
        explanation: 'Sound feminine plurals take the kasra in both Nasb and Jarr.',
      },
      {
        id: 'nahw04-q3',
        prompt: 'How is يَكْتُبُونَ made Majzum?',
        options: ['By adding sukun', 'By dropping the nun', 'By dropping the waw', 'By adding a fatha'],
        correctIndex: 1,
        explanation: 'The five verbs are Mansub and Majzum by dropping the final nun: لَمْ يَكْتُبُوا.',
      },
      {
        id: 'nahw04-q4',
        prompt: 'A diptote in Jarr takes:',
        options: ['Kasra and tanwin', 'Fatha without tanwin', 'Damma', 'Sukun'],
        correctIndex: 1,
        explanation: 'Diptotes take a fatha instead of a kasra and have no tanwin, unless they carry ال or are annexed.',
      },
    ],
  },
  {
    id: 'nahw-05-nominal-sentence',
    number: 29,
    subject: 'nahw',
    title: 'The Nominal Sentence',
    arabicTitle: 'الْجُمْلَةُ الِاسْمِيَّةُ',
    summary: 'Mubtada\u2019 and Khabar: their types, agreement and word order.',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Mubtada\u2019 and Khabar',
        arabicBody: 'الْمُبْتَدَأُ اسْمٌ مَرْفُوعٌ يُبْتَدَأُ بِهِ الْكَلَامُ وَيُخْبَرُ عَنْهُ، وَالْخَبَرُ هُوَ الْجُزْءُ الَّذِي تَتِمُّ بِهِ الْفَائِدَةُ مَعَ الْمُبْتَدَأِ، وَهُمَا مَرْفُوعَانِ.',
        body: 'A nominal sentence begins with a noun. Its two pillars are the Mubtada\u2019 (مُبْتَدَأٌ, the topic) and the Khabar (خَبَرٌ, the information about it). Both are Marfu\u02BF. The Mubtada\u2019 is normally definite, and the Khabar is normally indefinite. Arabic needs no word for "is" in the present tense.',
        examples: [
          { ar: 'الْعِلْمُ نُورٌ', translit: 'al-ʿilmu nūrun', en: 'Knowledge is light.' },
          { ar: 'اللَّهُ غَفُورٌ رَحِيمٌ', translit: 'allāhu ghafūrun raḥīmun', en: 'Allah is Forgiving, Merciful.' },
        ],
      },
      {
        heading: 'Types of Khabar',
        arabicBody: 'الْخَبَرُ ثَلَاثَةُ أَنْوَاعٍ: مُفْرَدٌ، وَجُمْلَةٌ فِعْلِيَّةٌ أَوِ اسْمِيَّةٌ، وَشِبْهُ جُمْلَةٍ (جَارٌّ وَمَجْرُورٌ أَوْ ظَرْفٌ).',
        body: 'The Khabar has three types. A Mufrad (مُفْرَدٌ) is a single word, such as مُجْتَهِدٌ. A Jumla (جُمْلَةٌ) is a full sentence, either verbal or nominal. A Shibh Jumla (شِبْهُ جُمْلَةٍ) is a prepositional phrase or an adverb. When the Khabar is a sentence, it needs a pronoun that points back to the Mubtada\u2019.',
        table: {
          headers: ['Type', 'Example', 'Meaning'],
          rows: [
            ['Mufrad', 'الطَّالِبُ مُجْتَهِدٌ', 'The student is diligent.'],
            ['Jumla fi\u02BFliyya', 'الطَّالِبُ يَكْتُبُ الدَّرْسَ', 'The student writes the lesson.'],
            ['Jumla ismiyya', 'الطَّالِبُ أَبُوهُ كَرِيمٌ', 'The student, his father is generous.'],
            ['Shibh jumla', 'الْكِتَابُ عَلَى الطَّاوِلَةِ', 'The book is on the table.'],
          ],
        },
      },
      {
        heading: 'Agreement',
        arabicBody: 'يُطَابِقُ الْخَبَرُ الْمُبْتَدَأَ فِي التَّذْكِيرِ وَالتَّأْنِيثِ وَفِي الْإِفْرَادِ وَالتَّثْنِيَةِ وَالْجَمْعِ.',
        body: 'The Khabar agrees with the Mubtada\u2019 in gender and number: الطَّالِبَانِ مُجْتَهِدَانِ and الطَّالِبَاتُ مُجْتَهِدَاتٌ. A plural of a non-human noun takes a feminine singular Khabar: الْكُتُبُ مُفِيدَةٌ.',
      },
      {
        heading: 'Indefinite Mubtada\u2019 and Word Order',
        arabicBody: 'الْأَصْلُ فِي الْمُبْتَدَأِ أَنْ يَكُونَ مَعْرِفَةً، وَلَا يُبْتَدَأُ بِالنَّكِرَةِ إِلَّا إِذَا حَصَلَتْ بِهَا فَائِدَةٌ.',
        body: 'The Mubtada\u2019 may be indefinite when the sentence gives useful information, for example when the Khabar is a Shibh Jumla that comes first, or when the noun is described. The Khabar must come first in this case: فِي الدَّارِ رَجُلٌ (In the house is a man). It also comes first when it is an interrogative word: مَنْ أَنْتَ؟',
        examples: [
          { ar: 'فِي الدَّارِ رَجُلٌ', translit: 'fī ad-dāri rajulun', en: 'There is a man in the house.' },
          { ar: 'عِلْمٌ نَافِعٌ خَيْرٌ مِنْ مَالٍ', translit: 'ʿilmun nāfiʿun khayrun min mālin', en: 'Useful knowledge is better than wealth.' },
        ],
      },
    ],
    quiz: [
      {
        id: 'nahw05-q1',
        prompt: 'The Mubtada\u2019 is normally:',
        options: ['Indefinite and Mansub', 'Definite and Marfu\u02BF', 'Definite and Majrur', 'A verb'],
        correctIndex: 1,
        explanation: 'The Mubtada\u2019 is normally definite and always Marfu\u02BF.',
      },
      {
        id: 'nahw05-q2',
        prompt: 'الْكِتَابُ عَلَى الطَّاوِلَةِ has a Khabar of which type?',
        options: ['Mufrad', 'Jumla', 'Shibh Jumla', 'None'],
        correctIndex: 2,
        explanation: 'عَلَى الطَّاوِلَةِ is a prepositional phrase, which is a Shibh Jumla.',
      },
      {
        id: 'nahw05-q3',
        prompt: 'Which is correct for a non-human plural?',
        options: ['الْكُتُبُ مُفِيدُونَ', 'الْكُتُبُ مُفِيدَةٌ', 'الْكُتُبُ مُفِيدٌ', 'الْكُتُبُ مُفِيدَانِ'],
        correctIndex: 1,
        explanation: 'A non-human plural takes a feminine singular Khabar.',
      },
    ],
  },
  {
    id: 'nahw-06-verbal-sentence',
    number: 30,
    subject: 'nahw',
    title: 'The Verbal Sentence',
    arabicTitle: 'الْجُمْلَةُ الْفِعْلِيَّةُ',
    summary: 'Fi\u02BFl, Fa\u02BFil, Na\u2019ib al-Fa\u02BFil and the direct object.',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Structure',
        arabicBody: 'الْجُمْلَةُ الْفِعْلِيَّةُ هِيَ الَّتِي تَبْدَأُ بِفِعْلٍ، وَرُكْنَاهَا الْفِعْلُ وَالْفَاعِلُ، وَالْفَاعِلُ اسْمٌ مَرْفُوعٌ يَدُلُّ عَلَى مَنْ فَعَلَ الْفِعْلَ.',
        body: 'A verbal sentence begins with a verb and normally follows the order Fi\u02BFl, then Fa\u02BFil, then Maf\u02BFul. The Fa\u02BFil (فَاعِلٌ) is the doer and is always Marfu\u02BF. The Maf\u02BFul Bihi (مَفْعُولٌ بِهِ) is the receiver and is always Mansub.',
        examples: [
          { ar: 'كَتَبَ الطَّالِبُ الدَّرْسَ', translit: 'kataba aṭ-ṭālibu ad-darsa', en: 'The student wrote the lesson.' },
        ],
      },
      {
        heading: 'Forms of the Fa\u02BFil',
        arabicBody: 'يَأْتِي الْفَاعِلُ اسْمًا ظَاهِرًا أَوْ ضَمِيرًا مُتَّصِلًا أَوْ ضَمِيرًا مُسْتَتِرًا.',
        body: 'The Fa\u02BFil can be an explicit noun (الطَّالِبُ), an attached pronoun (كَتَبْتُ, the doer is the ta) or a hidden pronoun (يَكْتُبُ, the doer is "he" implied). The verb stays singular even when the Fa\u02BFil is dual or plural: جَاءَ الرِّجَالُ and جَاءَ الرَّجُلَانِ.',
      },
      {
        heading: 'Gender Agreement',
        arabicBody: 'يُؤَنَّثُ الْفِعْلُ إِذَا كَانَ الْفَاعِلُ مُؤَنَّثًا حَقِيقِيًّا مُتَّصِلًا بِالْفِعْلِ، وَيَجُوزُ التَّذْكِيرُ وَالتَّأْنِيثُ فِي غَيْرِ ذَلِكَ.',
        body: 'The verb takes the feminine ta when the Fa\u02BFil is a real feminine noun that follows directly: جَاءَتْ فَاطِمَةُ. The feminine marker is optional when the Fa\u02BFil is separated from the verb or is a broken plural or a non-human plural: قَالَ الْأَعْرَابُ and قَالَتِ الْأَعْرَابُ are both found.',
      },
      {
        heading: 'Transitive Verbs',
        arabicBody: 'الْفِعْلُ الْمُتَعَدِّي مَا يَحْتَاجُ إِلَى مَفْعُولٍ بِهِ، وَاللَّازِمُ مَا يَكْتَفِي بِفَاعِلِهِ.',
        body: 'A verb may need no object (جَلَسَ), one object (كَتَبَ), or two objects (أَعْطَى). With two objects, both are Mansub.',
        examples: [
          { ar: 'جَلَسَ الْوَلَدُ', translit: 'jalasa al-waladu', en: 'No object: the boy sat.' },
          { ar: 'أَعْطَيْتُ الْفَقِيرَ مَالًا', translit: 'aʿṭaytu al-faqīra mālan', en: 'Two objects: I gave the poor man money.' },
        ],
      },
      {
        heading: 'Na\u2019ib al-Fa\u02BFil (the Passive)',
        arabicBody: 'نَائِبُ الْفَاعِلِ اسْمٌ مَرْفُوعٌ يَحُلُّ مَحَلَّ الْفَاعِلِ بَعْدَ حَذْفِهِ، وَيُبْنَى الْفِعْلُ مَعَهُ لِلْمَجْهُولِ.',
        body: 'When the doer is dropped, the object comes forward and is called Na\u2019ib al-Fa\u02BFil (نَائِبُ الْفَاعِلِ). It becomes Marfu\u02BF. The past verb takes a damma on its first letter and a kasra before its last letter: كُتِبَ. The present verb takes a damma on the prefix and a fatha before the last letter: يُكْتَبُ.',
        examples: [
          { ar: 'كُتِبَ الدَّرْسُ', translit: 'kutiba ad-darsu', en: 'The lesson was written.' },
          { ar: 'يُكْتَبُ الدَّرْسُ', translit: 'yuktabu ad-darsu', en: 'The lesson is written.' },
        ],
      },
    ],
    quiz: [
      {
        id: 'nahw06-q1',
        prompt: 'What is the case of the Fa\u02BFil?',
        options: ['Marfu\u02BF', 'Mansub', 'Majrur', 'Majzum'],
        correctIndex: 0,
        explanation: 'The doer is always Marfu\u02BF.',
      },
      {
        id: 'nahw06-q2',
        prompt: 'Which is correct?',
        options: ['جَاءُوا الرِّجَالُ', 'جَاءَ الرِّجَالُ', 'جَاءَتْ الرَّجُلُ', 'جَاءَا الرِّجَالُ'],
        correctIndex: 1,
        explanation: 'The verb before an explicit plural Fa\u02BFil stays singular.',
      },
      {
        id: 'nahw06-q3',
        prompt: 'What is the passive of كَتَبَ?',
        options: ['كَتِبَ', 'كُتِبَ', 'كُتَبَ', 'كَتَبْ'],
        correctIndex: 1,
        explanation: 'Damma on the first letter and kasra before the last: كُتِبَ.',
      },
    ],
  },
  {
    id: 'nahw-07-kana',
    number: 31,
    subject: 'nahw',
    title: 'Kana and Her Sisters',
    arabicTitle: 'كَانَ وَأَخَوَاتُهَا',
    summary: 'The verbs that enter a nominal sentence and put the predicate in Nasb.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'The Rule',
        arabicBody: 'كَانَ وَأَخَوَاتُهَا أَفْعَالٌ نَاقِصَةٌ تَدْخُلُ عَلَى الْجُمْلَةِ الِاسْمِيَّةِ فَتَرْفَعُ الْمُبْتَدَأَ وَيُسَمَّى اسْمَهَا، وَتَنْصِبُ الْخَبَرَ وَيُسَمَّى خَبَرَهَا.',
        body: 'Kana and her sisters enter a nominal sentence. The Mubtada\u2019 stays Marfu\u02BF and is now called the Ism of Kana. The Khabar becomes Mansub and is called the Khabar of Kana. These verbs are called Nawasikh (نَوَاسِخُ), meaning "cancelling" operators.',
        examples: [
          { ar: 'كَانَ الْجَوُّ جَمِيلًا', translit: 'kāna al-jawwu jamīlan', en: 'The weather was beautiful.' },
          { ar: 'لَيْسَ الْكَسُولُ نَاجِحًا', translit: 'laysa al-kasūlu nājiḥan', en: 'The lazy person is not successful.' },
        ],
      },
      {
        heading: 'The Sisters by Meaning',
        body: 'The sisters are grouped by their meaning.',
        table: {
          headers: ['Meaning', 'Verbs', 'Example'],
          rows: [
            ['Past or being', 'كَانَ', 'كَانَ الْوَلَدُ مَرِيضًا'],
            ['Becoming, by time of day', 'أَصْبَحَ · أَمْسَى · أَضْحَى · ظَلَّ · بَاتَ', 'أَصْبَحَ الطَّقْسُ بَارِدًا'],
            ['Transformation', 'صَارَ', 'صَارَ الْمَاءُ بُخَارًا'],
            ['Negation', 'لَيْسَ', 'لَيْسَ الْأَمْرُ سَهْلًا'],
            ['Continuity (after a negative)', 'مَا زَالَ · مَا بَرِحَ · مَا فَتِئَ · مَا اِنْفَكَّ', 'مَا زَالَ الْعِلْمُ نَافِعًا'],
            ['Duration', 'مَا دَامَ', 'أَعِيشُ مَا دُمْتُ حَيًّا'],
          ],
        },
      },
      {
        heading: 'Notes',
        body: 'These verbs conjugate like other verbs: كُنْتُ طَالِبًا (I was a student) and يَكُونُ، كُنْ، كَائِنٌ are also used. The Khabar may be a Shibh Jumla or a sentence, in which case it is Mansub in position: كَانَ الْوَلَدُ فِي الْبَيْتِ. The sisters of continuity need a negative before them to carry their meaning.',
      },
    ],
    quiz: [
      {
        id: 'nahw07-q1',
        prompt: 'In كَانَ الْجَوُّ جَمِيلًا, what is the case of جَمِيلًا?',
        options: ['Marfu\u02BF', 'Mansub', 'Majrur', 'Majzum'],
        correctIndex: 1,
        explanation: 'The Khabar of Kana is Mansub.',
      },
      {
        id: 'nahw07-q2',
        prompt: 'Which verb means "to become" (transformation)?',
        options: ['ظَلَّ', 'بَاتَ', 'صَارَ', 'لَيْسَ'],
        correctIndex: 2,
        explanation: 'صَارَ expresses transformation.',
      },
      {
        id: 'nahw07-q3',
        prompt: 'مَا زَالَ is a sister of Kana that means:',
        options: ['was not', 'still continues', 'as long as', 'became'],
        correctIndex: 1,
        explanation: 'مَا زَالَ means "still" and shows continuity.',
      },
    ],
  },
  {
    id: 'nahw-08-inna',
    number: 32,
    subject: 'nahw',
    title: 'Inna and Her Sisters',
    arabicTitle: 'إِنَّ وَأَخَوَاتُهَا',
    summary: 'The particles that put the subject in Nasb, with the rule for choosing إِنَّ or أَنَّ.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'The Rule',
        arabicBody: 'إِنَّ وَأَخَوَاتُهَا حُرُوفٌ تَدْخُلُ عَلَى الْجُمْلَةِ الِاسْمِيَّةِ فَتَنْصِبُ الْمُبْتَدَأَ وَيُسَمَّى اسْمَهَا، وَتَرْفَعُ الْخَبَرَ وَيُسَمَّى خَبَرَهَا.',
        body: 'Inna and her sisters are particles that enter a nominal sentence. They do the opposite of Kana: the Mubtada\u2019 becomes Mansub (the Ism of Inna) and the Khabar stays Marfu\u02BF (the Khabar of Inna).',
        table: {
          headers: ['Particle', 'Meaning', 'Example'],
          rows: [
            ['إِنَّ', 'Indeed (emphasis)', 'إِنَّ الْعِلْمَ نُورٌ'],
            ['أَنَّ', 'That (emphasis)', 'عَلِمْتُ أَنَّ الْوَقْتَ ضَيِّقٌ'],
            ['كَأَنَّ', 'As if', 'كَأَنَّ الْمَاءَ مِرْآةٌ'],
            ['لَكِنَّ', 'But', 'لَكِنَّ الْعَمَلَ شَاقٌّ'],
            ['لَيْتَ', 'If only', 'لَيْتَ الشَّبَابَ يَعُودُ'],
            ['لَعَلَّ', 'Perhaps, hopefully', 'لَعَلَّ الْفَرَجَ قَرِيبٌ'],
          ],
        },
      },
      {
        heading: 'Word Order',
        body: 'The Ism of Inna normally comes first. When the Khabar is a Shibh Jumla and the Ism is indefinite, the Khabar must come first: إِنَّ فِي الدَّارِ رَجُلًا (Indeed, in the house is a man).',
      },
      {
        heading: 'إِنَّ or أَنَّ?',
        body: 'Use إِنَّ with a kasra at the start of a sentence, after قَالَ, after حَيْثُ and after a relative pronoun. Use أَنَّ with a fatha when the clause after it can be replaced by a Masdar. Compare يُعْجِبُنِي أَنَّكَ مُجْتَهِدٌ (I like that you are diligent, meaning "your diligence") with قَالَ إِنَّكَ مُجْتَهِدٌ (He said: You are diligent).',
      },
      {
        heading: 'Ma al-Kaffa',
        body: 'When مَا is added, it stops the particle from working, and a nominal sentence follows as normal: إِنَّمَا اللَّهُ إِلَهٌ وَاحِدٌ. This is called Ma al-Kaffa (مَا الْكَافَّةُ).',
      },
    ],
    quiz: [
      {
        id: 'nahw08-q1',
        prompt: 'In إِنَّ الْعِلْمَ نُورٌ, what is the case of نُورٌ?',
        options: ['Nasb', 'Raf\u02BF', 'Jarr', 'Jazm'],
        correctIndex: 1,
        explanation: 'The Khabar of Inna stays Marfu\u02BF, while the Ism becomes Mansub.',
      },
      {
        id: 'nahw08-q2',
        prompt: 'Which particle means "if only"?',
        options: ['لَكِنَّ', 'كَأَنَّ', 'لَيْتَ', 'لَعَلَّ'],
        correctIndex: 2,
        explanation: 'لَيْتَ expresses a wish: "if only".',
      },
      {
        id: 'nahw08-q3',
        prompt: 'When do you use أَنَّ with a fatha?',
        options: ['At the start of a sentence', 'After قَالَ', 'When the clause can become a Masdar', 'After حَيْثُ'],
        correctIndex: 2,
        explanation: 'Use أَنَّ when the clause can be replaced by a Masdar.',
      },
    ],
  },
  {
    id: 'nahw-09-other-nawasikh',
    number: 33,
    subject: 'nahw',
    title: 'Zanna, Kada and La al-Nafiya',
    arabicTitle: 'ظَنَّ وَكَادَ وَلَا النَّافِيَةُ لِلْجِنْسِ',
    summary: 'The remaining Nawasikh: verbs of thinking, verbs of near occurrence and the negation of a whole class.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Zanna and Her Sisters',
        arabicBody: 'ظَنَّ وَأَخَوَاتُهَا أَفْعَالٌ تَدْخُلُ عَلَى الْمُبْتَدَأِ وَالْخَبَرِ فَتَنْصِبُهُمَا مَفْعُولَيْنِ لَهَا.',
        body: 'These verbs enter a nominal sentence and put both parts in Nasb. They become two objects of the verb, and the doer is Marfu\u02BF. Verbs of certainty and opinion: ظَنَّ، حَسِبَ، خَالَ، زَعَمَ، عَلِمَ، وَجَدَ، رَأَى. Verbs of transformation: جَعَلَ، صَيَّرَ، اِتَّخَذَ.',
        examples: [
          { ar: 'ظَنَنْتُ الْأَمْرَ سَهْلًا', translit: 'ẓanantu al-amra sahlan', en: 'I thought the matter easy.' },
          { ar: 'وَجَدْتُ الصَّدَقَ نَافِعًا', translit: 'wajadtu aṣ-ṣidqa nāfiʿan', en: 'I found truthfulness beneficial.' },
        ],
      },
      {
        heading: 'Kada and Her Sisters',
        arabicBody: 'كَادَ وَأَخَوَاتُهَا أَفْعَالٌ تَرْفَعُ الْمُبْتَدَأَ اسْمًا لَهَا وَتَنْصِبُ الْخَبَرَ، وَيَكُونُ خَبَرُهَا جُمْلَةً فِعْلِيَّةً فِعْلُهَا مُضَارِعٌ.',
        body: 'These verbs enter a nominal sentence. The Mubtada\u2019 becomes the Ism, which is Marfu\u02BF, and the Khabar must be a present verb in Nasb in position. There are three groups: verbs of near occurrence (كَادَ، أَوْشَكَ، كَرَبَ), a verb of hope (عَسَى), and verbs of beginning (شَرَعَ، طَفِقَ، جَعَلَ).',
        examples: [
          { ar: 'كَادَ الْمَطَرُ يَنْزِلُ', translit: 'kāda al-maṭaru yanzilu', en: 'The rain almost fell.' },
          { ar: 'عَسَى اللَّهُ أَنْ يَهْدِيَنَا', translit: 'ʿasā allāhu an yahdiyanā', en: 'Perhaps Allah will guide us.' },
        ],
      },
      {
        heading: 'La al-Nafiya lil-Jins',
        arabicBody: 'لَا النَّافِيَةُ لِلْجِنْسِ حَرْفٌ يَنْفِي الْحُكْمَ عَنِ الْجِنْسِ كُلِّهِ، وَتَعْمَلُ عَمَلَ إِنَّ.',
        body: 'This La negates a whole class (لَا النَّافِيَةُ لِلْجِنْسِ). It acts like Inna. When the Ism is a single noun, it is built on the marker it would take in Nasb, usually fatha. When it is annexed, it is Mansub. The Khabar is Marfu\u02BF.',
        examples: [
          { ar: 'لَا رَيْبَ فِيهِ', translit: 'lā rayba fīhi', en: 'There is no doubt in it.' },
          { ar: 'لَا طَالِبَ فِي الْفَصْلِ', translit: 'lā ṭāliba fī al-faṣli', en: 'There is no student in the class.' },
        ],
      },
    ],
    quiz: [
      {
        id: 'nahw09-q1',
        prompt: 'In ظَنَنْتُ الْأَمْرَ سَهْلًا, how are الْأَمْرَ and سَهْلًا?',
        options: ['Both Marfu\u02BF', 'Both Mansub', 'Marfu\u02BF and Mansub', 'Both Majrur'],
        correctIndex: 1,
        explanation: 'With Zanna and her sisters, both words are Mansub.',
      },
      {
        id: 'nahw09-q2',
        prompt: 'What must the Khabar of كَادَ be?',
        options: ['A noun', 'A present verb', 'A particle', 'A Masdar only'],
        correctIndex: 1,
        explanation: 'The Khabar of Kada is a present verb, as in كَادَ الْمَطَرُ يَنْزِلُ.',
      },
      {
        id: 'nahw09-q3',
        prompt: 'لَا رَيْبَ فِيهِ means:',
        options: ['There may be doubt', 'There is no doubt in it', 'He doubted', 'Do not doubt'],
        correctIndex: 1,
        explanation: 'لَا النَّافِيَةُ لِلْجِنْسِ negates the whole class of doubt.',
      },
    ],
  },
];
