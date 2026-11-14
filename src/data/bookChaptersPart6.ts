import type { BookChapter } from './bookChaptersPart1';

export const BOOK_CHAPTERS_PART_6: BookChapter[] = [
  {
    id: 'nahw-10-mafaeel',
    number: 34,
    subject: 'nahw',
    title: 'The Five Maf\u02BFuls',
    arabicTitle: 'الْمَفَاعِيلُ',
    summary: 'The direct object, the absolute object, the object of purpose, the adverb and the object of accompaniment.',
    readingMinutes: 8,
    sections: [
      {
        heading: 'Overview',
        body: 'The Mafa\u02BFil are nouns that complete the action of the verb. Each one is Mansub.',
        table: {
          headers: ['Name', 'Meaning', 'Example'],
          rows: [
            ['مَفْعُولٌ بِهِ', 'Receiver of the action', 'قَرَأْتُ الْكِتَابَ'],
            ['مَفْعُولٌ مُطْلَقٌ', 'Masdar that emphasises, describes or counts', 'ضَرَبْتُ ضَرْبًا'],
            ['مَفْعُولٌ لِأَجْلِهِ', 'Reason for the action', 'قُمْتُ إِجْلَالًا لِلْمُعَلِّمِ'],
            ['مَفْعُولٌ فِيهِ (ظَرْفٌ)', 'Time or place of the action', 'سَافَرْتُ صَبَاحًا'],
            ['مَفْعُولٌ مَعَهُ', 'Companion of the action, after waw', 'سِرْتُ وَالنِّيلَ'],
          ],
        },
      },
      {
        heading: 'Maf\u02BFul Mutlaq',
        body: 'The Maf\u02BFul Mutlaq is a Masdar from the same verb. It has three uses. It confirms the verb (ضَرَبْتُ ضَرْبًا), it explains the kind of action (سِرْتُ سَيْرًا سَرِيعًا), or it gives the number of times (ضَرَبْتُ ضَرْبَتَيْنِ).',
        examples: [
          { ar: 'فَرِحْتُ فَرَحًا', translit: 'fariḥtu faraḥan', en: 'Emphasis: I truly rejoiced.' },
          { ar: 'جَلَسْتُ جِلْسَةَ الْمُتَعَبِ', translit: 'jalastu jilsata al-mutʿabi', en: 'Kind: I sat like a tired person.' },
          { ar: 'قَرَأْتُ الْكِتَابَ مَرَّتَيْنِ', translit: 'qaraʾtu al-kitāba marratayni', en: 'Number: I read the book twice.' },
        ],
      },
      {
        heading: 'Maf\u02BFul li-Ajlihi',
        body: 'This is a Masdar of a feeling or reason that explains why the action happened. It is Mansub, and the doer of the action and the feeling are the same, and they happen at the same time.',
        examples: [
          { ar: 'هَرَبَ الْجُنْدِيُّ خَوْفًا', translit: 'haraba al-jundiyyu khawfan', en: 'The soldier fled out of fear.' },
        ],
      },
      {
        heading: 'Maf\u02BFul Fihi (Zarf)',
        body: 'A Zarf of time answers "when": الْيَوْمَ، غَدًا، صَبَاحًا، لَيْلًا. A Zarf of place answers "where": فَوْقَ، تَحْتَ، أَمَامَ، خَلْفَ، عِنْدَ، بَيْنَ، حَوْلَ. Place words are often followed by a genitive noun.',
        examples: [
          { ar: 'جَلَسْتُ أَمَامَ الْمُعَلِّمِ', translit: 'jalastu amāma al-muʿallimi', en: 'I sat in front of the teacher.' },
          { ar: 'نَسْهَرُ لَيْلًا', translit: 'nashharu laylan', en: 'We stay up at night.' },
        ],
      },
      {
        heading: 'Maf\u02BFul Ma\u02BFahu',
        body: 'After the waw of accompaniment (وَاوُ الْمَعِيَّةِ), the noun is Mansub. It means "together with".',
        examples: [
          { ar: 'سِرْتُ وَالنِّيلَ', translit: 'sirtu wa-n-nīla', en: 'I walked along with the Nile.' },
        ],
      },
    ],
    quiz: [
      {
        id: 'nahw10-q1',
        prompt: 'ضَرَبْتُ ضَرْبَتَيْنِ contains which Maf\u02BFul?',
        options: ['Maf\u02BFul Bihi', 'Maf\u02BFul Mutlaq', 'Maf\u02BFul Ma\u02BFahu', 'Hal'],
        correctIndex: 1,
        explanation: 'A Masdar from the verb that gives the number is a Maf\u02BFul Mutlaq.',
      },
      {
        id: 'nahw10-q2',
        prompt: 'In هَرَبَ الْجُنْدِيُّ خَوْفًا, خَوْفًا is:',
        options: ['Maf\u02BFul Mutlaq', 'Maf\u02BFul li-Ajlihi', 'Zarf', 'Khabar'],
        correctIndex: 1,
        explanation: 'خَوْفًا gives the reason for the action.',
      },
      {
        id: 'nahw10-q3',
        prompt: 'Which is a Zarf of place?',
        options: ['غَدًا', 'صَبَاحًا', 'أَمَامَ', 'لَيْلًا'],
        correctIndex: 2,
        explanation: 'أَمَامَ is a Zarf of place. The others are time words.',
      },
    ],
  },
  {
    id: 'nahw-11-hal-tamyiz',
    number: 35,
    subject: 'nahw',
    title: 'Hal and Tamyiz',
    arabicTitle: 'الْحَالُ وَالتَّمْيِيزُ',
    summary: 'The state of the doer or receiver, and the noun that removes ambiguity, with the number rules.',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Hal',
        body: 'The Hal (حَالٌ) describes the state of the doer or the receiver while the action takes place. It is Mansub, usually indefinite and usually a derived word (such as a participle). Its owner is usually definite.',
        examples: [
          { ar: 'جَاءَ الطَّالِبُ مُسْرِعًا', translit: 'jāʾa aṭ-ṭālibu musriʿan', en: 'The student came hurrying.' },
          { ar: 'رَأَيْتُ الْقَمَرَ طَالِعًا', translit: 'raʾaytu al-qamara ṭāliʿan', en: 'I saw the moon rising.' },
        ],
      },
      {
        heading: 'Forms of the Hal',
        body: 'The Hal can be a single word (Mufrad), a sentence (Jumla) or a Shibh Jumla. When it is a sentence, it is Mansub in position.',
        table: {
          headers: ['Type', 'Example', 'Meaning'],
          rows: [
            ['Mufrad', 'عَادَ الْجُنْدِيُّ مُنْتَصِرًا', 'The soldier returned victorious.'],
            ['Jumla', 'جَاءَ زَيْدٌ يَضْحَكُ', 'Zayd came laughing.'],
            ['Shibh jumla', 'رَأَيْتُ الْهِلَالَ بَيْنَ السَّحَابِ', 'I saw the crescent among clouds.'],
          ],
        },
      },
      {
        heading: 'Tamyiz',
        body: 'The Tamyiz (تَمْيِيزٌ) is an indefinite Mansub noun that removes ambiguity. It explains a vague word (such as a measure or number) or a whole sentence.',
        examples: [
          { ar: 'اِشْتَرَيْتُ رِطْلًا زَيْتًا', translit: 'ishtaraytu riṭlan zaytan', en: 'I bought a pound of oil.' },
          { ar: 'طَابَ مُحَمَّدٌ نَفْسًا', translit: 'ṭāba muḥammadun nafsan', en: 'Muhammad is good in spirit.' },
          { ar: 'اِمْتَلَأَ الْكَأْسُ مَاءً', translit: 'imtalaʾa al-kaʾsu māʾan', en: 'The glass filled with water.' },
        ],
      },
      {
        heading: 'Tamyiz of Numbers',
        body: 'The noun that is counted follows a fixed rule: with 3 to 10 it is plural and Majrur, with 11 to 99 it is singular and Mansub, and with 100 and 1000 it is singular and Majrur. Numbers 3 to 10 take the opposite gender of the counted noun.',
        table: {
          headers: ['Number', 'Counted noun', 'Example'],
          rows: [
            ['3–10', 'Plural, Majrur', 'ثَلَاثَةُ كُتُبٍ'],
            ['11–99', 'Singular, Mansub', 'عِشْرُونَ كِتَابًا'],
            ['100, 1000', 'Singular, Majrur', 'مِائَةُ كِتَابٍ'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'nahw11-q1',
        prompt: 'The Hal is normally:',
        options: ['Definite and Marfu\u02BF', 'Indefinite and Mansub', 'Definite and Majrur', 'Indefinite and Majrur'],
        correctIndex: 1,
        explanation: 'The Hal is Mansub and normally indefinite.',
      },
      {
        id: 'nahw11-q2',
        prompt: 'In عِشْرُونَ كِتَابًا, كِتَابًا is:',
        options: ['Hal', 'Tamyiz', 'Fa\u02BFil', 'Mudaf Ilayh'],
        correctIndex: 1,
        explanation: 'The counted noun after 11 to 99 is a Tamyiz, singular and Mansub.',
      },
      {
        id: 'nahw11-q3',
        prompt: 'The counted noun after مِائَةٌ is:',
        options: ['Plural Mansub', 'Singular Majrur', 'Singular Mansub', 'Plural Marfu\u02BF'],
        correctIndex: 1,
        explanation: 'After 100 and 1000, the counted noun is singular and Majrur.',
      },
    ],
  },
  {
    id: 'nahw-12-idafa-jarr',
    number: 36,
    subject: 'nahw',
    title: 'Idafa and the Prepositions',
    arabicTitle: 'الْإِضَافَةُ وَحُرُوفُ الْجَرِّ',
    summary: 'The possessive construct, its two types, and the particles that put a noun in Jarr.',
    readingMinutes: 7,
    sections: [
      {
        heading: 'The Idafa',
        body: 'The Idafa (إِضَافَةٌ) joins two nouns. The first is the Mudaf (مُضَافٌ) and the second is the Mudaf Ilayh (مُضَافٌ إِلَيْهِ). The Mudaf takes the case that its role requires, loses its tanwin, loses ال and loses the final nun of the dual and the sound masculine plural. The Mudaf Ilayh is always Majrur.',
        examples: [
          { ar: 'كِتَابُ الطَّالِبِ', translit: 'kitābu aṭ-ṭālibi', en: 'the student\u2019s book' },
          { ar: 'قَرَأْتُ كِتَابَ الطَّالِبِ', translit: 'qaraʾtu kitāba aṭ-ṭālibi', en: 'I read the student\u2019s book (Mudaf is Mansub)' },
          { ar: 'مُسْلِمُو مِصْرَ', translit: 'muslimū miṣra', en: 'the Muslims of Egypt (nun dropped)' },
        ],
      },
      {
        heading: 'Two Types',
        body: 'A true Idafa (إِضَافَةٌ مَعْنَوِيَّةٌ) gives the Mudaf definiteness or specificity, and it carries a hidden meaning of لِ ("of") or مِنْ ("made of"). An Idafa of the form (إِضَافَةٌ لَفْظِيَّةٌ) joins a participle or a similar adjective to its object and adds no definiteness, only a lighter form.',
        table: {
          headers: ['Type', 'Example', 'Meaning'],
          rows: [
            ['Maʿnawiyya, with لِ', 'كِتَابُ الطَّالِبِ', 'the book of the student'],
            ['Maʿnawiyya, with مِنْ', 'خَاتَمُ حَدِيدٍ', 'a ring of iron'],
            ['Lafẓiyya', 'رَجُلٌ حَسَنُ الْوَجْهِ', 'a man good of face'],
          ],
        },
      },
      {
        heading: 'Huruf al-Jarr',
        body: 'The prepositions (حُرُوفُ الْجَرِّ) put the following noun in Jarr. The noun is called Majrur. Together they form a Shibh Jumla that attaches to a verb or a similar word.',
        table: {
          headers: ['Particle', 'Meaning', 'Example'],
          rows: [
            ['مِنْ', 'from', 'خَرَجْتُ مِنَ الْبَيْتِ'],
            ['إِلَى', 'to', 'ذَهَبْتُ إِلَى الْمَدْرَسَةِ'],
            ['عَنْ', 'about, from', 'تَحَدَّثْنَا عَنِ الْعِلْمِ'],
            ['عَلَى', 'on', 'الْكِتَابُ عَلَى الطَّاوِلَةِ'],
            ['فِي', 'in', 'نَحْنُ فِي الْفَصْلِ'],
            ['بِ', 'with, by', 'كَتَبْتُ بِالْقَلَمِ'],
            ['لِ', 'for, belonging to', 'الْحَمْدُ لِلَّهِ'],
            ['كَ', 'like', 'هُوَ كَالْأَسَدِ'],
            ['حَتَّى · مُنْذُ · مُذْ', 'until · since', 'نِمْتُ حَتَّى الصَّبَاحِ'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'nahw12-q1',
        prompt: 'The Mudaf Ilayh is always:',
        options: ['Marfu\u02BF', 'Mansub', 'Majrur', 'Majzum'],
        correctIndex: 2,
        explanation: 'The second noun in an Idafa is always Majrur.',
      },
      {
        id: 'nahw12-q2',
        prompt: 'What does the Mudaf lose?',
        options: ['The Mudaf Ilayh', 'Tanwin and ال', 'Its first letter', 'Its gender'],
        correctIndex: 1,
        explanation: 'The Mudaf loses tanwin and ال, and also the nun of the dual and sound plural.',
      },
      {
        id: 'nahw12-q3',
        prompt: 'Which particle means "on"?',
        options: ['فِي', 'عَلَى', 'مِنْ', 'إِلَى'],
        correctIndex: 1,
        explanation: 'عَلَى means "on".',
      },
    ],
  },
  {
    id: 'nahw-13-tawabi',
    number: 37,
    subject: 'nahw',
    title: 'The Four Followers (Tawabi\u02BF)',
    arabicTitle: 'التَّوَابِعُ',
    summary: 'Na\u2019t, \u02BFAtf, Tawkid and Badal, with their agreement rules.',
    readingMinutes: 8,
    sections: [
      {
        heading: 'What Are the Tawabi\u02BF?',
        body: 'The Tawabi\u02BF (التَّوَابِعُ) are words that follow another word, called the Matbu\u02BF, and share its state of Raf\u02BF, Nasb or Jarr. There are four: the adjective (النَّعْتُ), the conjunction (الْعَطْفُ), emphasis (التَّوْكِيدُ) and the substitute (الْبَدَلُ).',
      },
      {
        heading: 'Na\u2019t (Adjective)',
        body: 'The Na\u2019t describes the noun before it, which is called the Man\u02BFut. A true adjective (نَعْتٌ حَقِيقِيٌّ) agrees with the Man\u02BFut in four things: case, definiteness, gender and number. An adjective that describes something belonging to the noun (نَعْتٌ سَبَبِيٌّ) agrees in case and definiteness, but its gender follows the noun after it, and it stays singular. A non-human plural takes a feminine singular adjective.',
        examples: [
          { ar: 'جَاءَ الطَّالِبُ الْمُجْتَهِدُ', translit: 'jāʾa aṭ-ṭālibu al-mujtahidu', en: 'The diligent student came.' },
          { ar: 'مَرَرْتُ بِرَجُلٍ كَرِيمٍ أَبُوهُ', translit: 'marartu bi-rajulin karīmin abūhu', en: 'I passed a man whose father is generous (sababi).' },
          { ar: 'قَرَأْتُ كُتُبًا مُفِيدَةً', translit: 'qaraʾtu kutuban mufīdatan', en: 'I read useful books.' },
        ],
      },
      {
        heading: '\u02BFAtf (Conjunction)',
        body: 'The word after a conjunction, called the Ma\u02BFtuf, takes the case of the word before it. The common particles are وَ (and), فَ (then, at once), ثُمَّ (then, after a delay), أَوْ (or), أَمْ (or, in a question), بَلْ (rather), لَكِنْ (but) and حَتَّى (even).',
        examples: [
          { ar: 'جَاءَ زَيْدٌ وَعَمْرٌو', translit: 'jāʾa zaydun wa-ʿamrun', en: 'Zayd and Amr came.' },
          { ar: 'قَرَأْتُ الْكِتَابَ ثُمَّ كَتَبْتُ الْمُلَخَّصَ', translit: 'qaraʾtu al-kitāba thumma katabtu al-mulakhkhaṣa', en: 'I read the book, then wrote the summary.' },
        ],
      },
      {
        heading: 'Tawkid (Emphasis)',
        body: 'Tawkid (تَوْكِيدٌ) strengthens a word. A repeated word is Tawkid Lafzi (لَفْظِيٌّ). Tawkid Ma\u02BFnawi (مَعْنَوِيٌّ) uses النَّفْسُ، الْعَيْنُ، كُلٌّ، جَمِيعٌ، كِلَا and كِلْتَا, each joined to a pronoun that matches the first word. كِلَا is masculine dual and كِلْتَا is feminine dual.',
        examples: [
          { ar: 'جَاءَ الْقَوْمُ كُلُّهُمْ', translit: 'jāʾa al-qawmu kulluhum', en: 'The people all came.' },
          { ar: 'جَاءَ الْأَمِيرُ نَفْسُهُ', translit: 'jāʾa al-amīru nafsuhu', en: 'The prince himself came.' },
        ],
      },
      {
        heading: 'Badal (Substitute)',
        body: 'The Badal (بَدَلٌ) replaces or clarifies the word before it, called the Mubdal Minhu, and takes its case. It has three common types: Kull min Kull (the whole for the whole), Ba\u02BFd min Kull (a part of the whole) and Ishtimal (a quality of it).',
        table: {
          headers: ['Type', 'Example', 'Meaning'],
          rows: [
            ['Kull min kull', 'جَاءَ أَخُوكَ مُحَمَّدٌ', 'Your brother Muhammad came.'],
            ['Baʿḍ min kull', 'أَكَلْتُ الرَّغِيفَ ثُلُثَهُ', 'I ate the loaf, a third of it.'],
            ['Ishtimāl', 'أَعْجَبَنِي الْأُسْتَاذُ عِلْمُهُ', 'The teacher impressed me, his knowledge.'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'nahw13-q1',
        prompt: 'How many things must a true adjective agree on with its noun?',
        options: ['Two', 'Three', 'Four', 'Five'],
        correctIndex: 2,
        explanation: 'Case, definiteness, gender and number.',
      },
      {
        id: 'nahw13-q2',
        prompt: 'In جَاءَ الْقَوْمُ كُلُّهُمْ, كُلُّهُمْ is:',
        options: ['Na\u2019t', 'Tawkid', 'Badal', '\u02BFAtf'],
        correctIndex: 1,
        explanation: 'كُلٌّ with a matching pronoun is Tawkid Ma\u02BFnawi.',
      },
      {
        id: 'nahw13-q3',
        prompt: 'Which particle shows order with a delay?',
        options: ['وَ', 'فَ', 'ثُمَّ', 'أَوْ'],
        correctIndex: 2,
        explanation: 'ثُمَّ means "then, after a delay". فَ means "then, immediately".',
      },
      {
        id: 'nahw13-q4',
        prompt: 'Which is NOT one of the four Tawabi\u02BF?',
        options: ['Badal', 'Tamyiz', 'Tawkid', '\u02BFAtf'],
        correctIndex: 1,
        explanation: 'Tamyiz is not a follower. The four are Na\u2019t, \u02BFAtf, Tawkid and Badal.',
      },
    ],
  },
  {
    id: 'nahw-14-munada-mustathna',
    number: 38,
    subject: 'nahw',
    title: 'Munada and Mustathna',
    arabicTitle: 'الْمُنَادَى وَالِاسْتِثْنَاءُ',
    summary: 'Calling someone, and excepting someone from a ruling.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Munada (the Vocative)',
        body: 'The Munada (مُنَادًى) is the noun called with a particle, usually يَا. Its ending depends on its type.',
        table: {
          headers: ['Type', 'Ending', 'Example'],
          rows: [
            ['Proper name, single (عَلَمٌ مُفْرَدٌ)', 'Mabni on damma', 'يَا مُحَمَّدُ'],
            ['Specific unnamed noun', 'Mabni on damma', 'يَا رَجُلُ'],
            ['Mudaf', 'Mansub', 'يَا عَبْدَ اللَّهِ'],
            ['Resembling a Mudaf', 'Mansub', 'يَا طَالِعًا جَبَلًا'],
            ['Unspecific unnamed noun', 'Mansub with tanwin', 'يَا غَافِلًا تَنَبَّهْ'],
          ],
        },
      },
      {
        heading: 'Calling a Noun with ال',
        body: 'You cannot say يَا with ال directly. Use يَا أَيُّهَا for masculine and يَا أَيَّتُهَا for feminine, then the noun with ال in Raf\u02BF.',
        examples: [
          { ar: 'يَا أَيُّهَا الطَّالِبُ', translit: 'yā ayyuhā aṭ-ṭālibu', en: 'O student!' },
          { ar: 'يَا أَيَّتُهَا الطَّالِبَةُ', translit: 'yā ayyatuhā aṭ-ṭālibatu', en: 'O (female) student!' },
        ],
      },
      {
        heading: 'Mustathna (the Exception)',
        body: 'The Mustathna (مُسْتَثْنًى) is the noun excluded from a ruling by إِلَّا, غَيْرُ, سِوَى, خَلَا, عَدَا or حَاشَا. After a complete positive sentence, a noun after إِلَّا is Mansub. After a complete negative sentence, it is best as a Badal, taking the case of the first noun, though Nasb is allowed. If the first noun is not mentioned, the word after إِلَّا takes the case its role requires. After غَيْرٌ and سِوَى, the excepted noun is Majrur as a Mudaf Ilayh, and غَيْرٌ takes the case the Mustathna would take.',
        examples: [
          { ar: 'جَاءَ الطُّلَّابُ إِلَّا زَيْدًا', translit: 'jāʾa aṭ-ṭullābu illā zaydan', en: 'Positive: Mansub' },
          { ar: 'مَا جَاءَ أَحَدٌ إِلَّا زَيْدٌ', translit: 'mā jāʾa aḥadun illā zaydun', en: 'Negative: Badal, Marfu\u02BF' },
          { ar: 'جَاءَ الطُّلَّابُ غَيْرَ زَيْدٍ', translit: 'jāʾa aṭ-ṭullābu ghayra zaydin', en: 'With ghayr: ghayr is Mansub, Zayd is Majrur' },
        ],
      },
    ],
    quiz: [
      {
        id: 'nahw14-q1',
        prompt: 'What is the ending of يَا مُحَمَّدُ?',
        options: ['Mansub', 'Majrur', 'Mabni on damma', 'Majzum'],
        correctIndex: 2,
        explanation: 'A single proper name is Mabni on damma, in the position of Nasb.',
      },
      {
        id: 'nahw14-q2',
        prompt: 'In جَاءَ الطُّلَّابُ إِلَّا زَيْدًا, زَيْدًا is:',
        options: ['Fa\u02BFil', 'Mustathna, Mansub', 'Badal', 'Hal'],
        correctIndex: 1,
        explanation: 'After a positive sentence, the Mustathna of إِلَّا is Mansub.',
      },
      {
        id: 'nahw14-q3',
        prompt: 'How do you call a noun with ال?',
        options: ['يَا الطَّالِبُ', 'يَا أَيُّهَا الطَّالِبُ', 'يَا الطَّالِبَ', 'يَا طَالِبٌ ال'],
        correctIndex: 1,
        explanation: 'Use يَا أَيُّهَا before a noun with ال.',
      },
    ],
  },
  {
    id: 'nahw-15-mudari-moods',
    number: 39,
    subject: 'nahw',
    title: 'Moods of the Present Verb and Conditionals',
    arabicTitle: 'إِعْرَابُ الْمُضَارِعِ وَالشَّرْطُ',
    summary: 'The particles of Nasb and Jazm, and how conditional sentences work.',
    readingMinutes: 8,
    sections: [
      {
        heading: 'Raf\u02BF',
        body: 'The present verb is Marfu\u02BF with a damma when nothing before it puts it in Nasb or Jazm: يَكْتُبُ الطَّالِبُ الدَّرْسَ.',
      },
      {
        heading: 'Nasb Particles',
        body: 'These particles put the present verb in Nasb.',
        table: {
          headers: ['Particle', 'Meaning', 'Example'],
          rows: [
            ['أَنْ', 'that, to', 'أُرِيدُ أَنْ أَقْرَأَ'],
            ['لَنْ', 'will never', 'لَنْ أَنْسَى'],
            ['كَيْ', 'in order to', 'دَرَسْتُ كَيْ أَنْجَحَ'],
            ['إِذَنْ', 'then, in that case', 'إِذَنْ أُكْرِمَكَ'],
            ['لِ · حَتَّى (with hidden أَنْ)', 'so that · until', 'ذَاكَرْتُ لِأَنْجَحَ'],
          ],
        },
      },
      {
        heading: 'Jazm Particles',
        body: 'These particles put the present verb in Jazm: لَمْ (did not), لَمَّا (not yet), لَا النَّاهِيَةُ (do not), and لَامُ الْأَمْرِ (let him, so that he).',
        examples: [
          { ar: 'لَمْ يَكْتُبْ', translit: 'lam yaktub', en: 'He did not write.' },
          { ar: 'لَا تَكْتُبْ', translit: 'lā taktub', en: 'Do not write.' },
          { ar: 'لِيَكْتُبْ', translit: 'li-yaktub', en: 'Let him write.' },
        ],
      },
      {
        heading: 'Conditional Sentences',
        body: 'A conditional sentence has a condition (فِعْلُ الشَّرْطِ) and a result (جَوَابُ الشَّرْطِ). Conditional particles such as إِنْ and the nouns مَنْ (whoever), مَا (whatever), مَهْمَا (whatever), مَتَى (whenever), أَيْنَمَا (wherever) put both verbs in Jazm. When the result is not a verb that can be Majzum (for example a nominal sentence, a command or a negative), it begins with فَ. The particles إِذَا and لَوْ do not cause Jazm.',
        examples: [
          { ar: 'إِنْ تَدْرُسْ تَنْجَحْ', translit: 'in tadrus tanjaḥ', en: 'If you study, you will succeed.' },
          { ar: 'مَنْ يَجْتَهِدْ يَنْجَحْ', translit: 'man yajtahid yanjaḥ', en: 'Whoever strives succeeds.' },
          { ar: 'إِنْ جِئْتَ فَأَهْلًا بِكَ', translit: 'in ji\u02BEta fa-ahlan bika', en: 'If you come, you are welcome.' },
        ],
      },
    ],
    quiz: [
      {
        id: 'nahw15-q1',
        prompt: 'Which particle puts the present verb in Nasb?',
        options: ['لَمْ', 'لَنْ', 'لَا النَّاهِيَةُ', 'إِنْ'],
        correctIndex: 1,
        explanation: 'لَنْ is a particle of Nasb. The others cause Jazm.',
      },
      {
        id: 'nahw15-q2',
        prompt: 'How is يَكْتُبُ after لَمْ?',
        options: ['يَكْتُبَ', 'يَكْتُبْ', 'يَكْتُبُ', 'يَكْتُبِ'],
        correctIndex: 1,
        explanation: 'After لَمْ the verb is Majzum with sukun: لَمْ يَكْتُبْ.',
      },
      {
        id: 'nahw15-q3',
        prompt: 'When does the result of a conditional begin with فَ?',
        options: ['Always', 'When the result is a verb', 'When it cannot be Majzum, e.g. a nominal sentence', 'Never'],
        correctIndex: 2,
        explanation: 'The result starts with فَ when it is not a verb that can show Jazm, as in إِنْ جِئْتَ فَأَهْلًا بِكَ.',
      },
    ],
  },
  {
    id: 'nahw-16-mabni-nouns',
    number: 40,
    subject: 'nahw',
    title: 'Fixed Nouns: Pronouns, Demonstratives and Relatives',
    arabicTitle: 'الضَّمَائِرُ وَأَسْمَاءُ الْإِشَارَةِ وَالْمَوْصُولَاتُ',
    summary: 'The Mabni nouns every sentence uses, with their forms and rules.',
    readingMinutes: 8,
    sections: [
      {
        heading: 'Pronouns (Dama\u2019ir)',
        body: 'Pronouns are Mabni nouns. A separate pronoun (ضَمِيرٌ مُنْفَصِلٌ) stands alone, and an attached pronoun (ضَمِيرٌ مُتَّصِلٌ) joins a verb, noun or particle.',
        table: {
          headers: ['Person', 'Separate', 'Attached'],
          rows: [
            ['I', 'أَنَا', 'ـي / ـنِي / ـتُ'],
            ['We', 'نَحْنُ', 'ـنَا'],
            ['You (m.)', 'أَنْتَ', 'ـكَ / ـتَ'],
            ['You (f.)', 'أَنْتِ', 'ـكِ / ـتِ'],
            ['You (pl.)', 'أَنْتُمْ', 'ـكُمْ / ـتُمْ'],
            ['He', 'هُوَ', 'ـهُ'],
            ['She', 'هِيَ', 'ـهَا'],
            ['They (m.)', 'هُمْ', 'ـهُمْ'],
            ['They (f.)', 'هُنَّ', 'ـهُنَّ'],
          ],
        },
        examples: [
          { ar: 'كِتَابُكَ جَدِيدٌ', translit: 'kitābuka jadīdun', en: 'Your book is new (attached, Jarr in position).' },
          { ar: 'أَنْتَ مُجْتَهِدٌ', translit: 'anta mujtahidun', en: 'You are diligent (separate, Mubtada\u2019).' },
        ],
      },
      {
        heading: 'Demonstratives (Asma\u2019 al-Isharah)',
        body: 'Demonstratives point to something. The dual forms هَذَانِ and هَذَيْنِ are the exception, because they are Mu\u02BFrab (Raf\u02BF with alif, Nasb and Jarr with ya).',
        table: {
          headers: ['', 'Near', 'Far'],
          rows: [
            ['Masculine singular', 'هَذَا', 'ذَلِكَ'],
            ['Feminine singular', 'هَذِهِ', 'تِلْكَ'],
            ['Masculine dual', 'هَذَانِ / هَذَيْنِ', '—'],
            ['Feminine dual', 'هَاتَانِ / هَاتَيْنِ', '—'],
            ['Plural', 'هَؤُلَاءِ', 'أُولَئِكَ'],
            ['Place', 'هُنَا', 'هُنَاكَ'],
          ],
        },
      },
      {
        heading: 'Relative Pronouns (Mawsulat)',
        body: 'A relative pronoun is followed by a clause called the Sila (صِلَةٌ), which must contain a pronoun pointing back to it, called the \u02BFA\u2019id (عَائِدٌ). The dual forms are Mu\u02BFrab.',
        table: {
          headers: ['', 'Form'],
          rows: [
            ['Masculine singular', 'الَّذِي'],
            ['Feminine singular', 'الَّتِي'],
            ['Masculine dual', 'اللَّذَانِ / اللَّذَيْنِ'],
            ['Feminine dual', 'اللَّتَانِ / اللَّتَيْنِ'],
            ['Masculine plural', 'الَّذِينَ'],
            ['Feminine plural', 'اللَّاتِي / اللَّوَاتِي'],
            ['General', 'مَنْ (who) · مَا (what)'],
          ],
        },
        examples: [
          { ar: 'جَاءَ الَّذِي نَجَحَ', translit: 'jāʾa alladhī najaḥa', en: 'The one who succeeded came.' },
          { ar: 'هَذَا الْكِتَابُ الَّذِي قَرَأْتُهُ', translit: 'hādhā al-kitābu alladhī qaraʾtuhu', en: 'This is the book that I read.' },
        ],
      },
    ],
    quiz: [
      {
        id: 'nahw16-q1',
        prompt: 'Which demonstrative means "that" (far, feminine)?',
        options: ['هَذِهِ', 'ذَلِكَ', 'تِلْكَ', 'أُولَئِكَ'],
        correctIndex: 2,
        explanation: 'تِلْكَ is the far feminine singular demonstrative.',
      },
      {
        id: 'nahw16-q2',
        prompt: 'Which pronoun is separate?',
        options: ['ـكَ', 'هُوَ', 'ـهَا', 'ـنَا'],
        correctIndex: 1,
        explanation: 'هُوَ stands alone, so it is a separate pronoun.',
      },
      {
        id: 'nahw16-q3',
        prompt: 'What must the Sila contain?',
        options: ['A verb only', 'A pronoun referring back (\u02BFA\u2019id)', 'A question word', 'A particle of Nasb'],
        correctIndex: 1,
        explanation: 'The Sila must contain an \u02BFA\u2019id, a pronoun that refers back to the relative pronoun.',
      },
    ],
  },
  {
    id: 'nahw-17-parsing-glossary',
    number: 41,
    subject: 'nahw',
    title: 'Parsing Practice and Glossary',
    arabicTitle: 'تَطْبِيقَاتٌ فِي الْإِعْرَابِ',
    summary: 'Six worked I\u02BFrab examples and a glossary of terms for quick review.',
    readingMinutes: 9,
    sections: [
      {
        heading: 'How to Parse',
        body: 'Parse one word at a time. For each word say: what kind of word it is, its role, its state, and the marker that shows the state. If the word is Mabni, say "Mabni on" and its ending.',
      },
      {
        heading: 'Example 1: ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ',
        body: 'ذَهَبَ: past verb, Mabni on fatha. الطَّالِبُ: Fa\u02BFil, Marfu\u02BF, marker is damma. إِلَى: preposition, Mabni. الْمَدْرَسَةِ: Majrur by the preposition, marker is kasra. The phrase إِلَى الْمَدْرَسَةِ is a Shibh Jumla attached to ذَهَبَ.',
      },
      {
        heading: 'Example 2: الْعِلْمُ نُورٌ',
        body: 'الْعِلْمُ: Mubtada\u2019, Marfu\u02BF, marker is damma. نُورٌ: Khabar, Marfu\u02BF, marker is the damma with tanwin.',
      },
      {
        heading: 'Example 3: كَانَ الْجَوُّ جَمِيلًا',
        body: 'كَانَ: past verb, Mabni on fatha. الْجَوُّ: Ism of Kana, Marfu\u02BF, marker is damma. جَمِيلًا: Khabar of Kana, Mansub, marker is the fatha with tanwin.',
      },
      {
        heading: 'Example 4: إِنَّ الْعِلْمَ نَافِعٌ',
        body: 'إِنَّ: particle that makes the noun Mansub, Mabni on fatha. الْعِلْمَ: Ism of Inna, Mansub, marker is fatha. نَافِعٌ: Khabar of Inna, Marfu\u02BF, marker is damma with tanwin.',
      },
      {
        heading: 'Example 5: جَاءَ الْمُسْلِمُونَ مُسْرِعِينَ',
        body: 'جَاءَ: past verb, Mabni on fatha. الْمُسْلِمُونَ: Fa\u02BFil, Marfu\u02BF, marker is the waw, because it is a sound masculine plural. مُسْرِعِينَ: Hal, Mansub, marker is the ya, because it is a sound masculine plural.',
      },
      {
        heading: 'Example 6: لَنْ يَنْجَحَ الْكَسُولُ',
        body: 'لَنْ: particle of Nasb, Mabni on sukun. يَنْجَحَ: present verb, Mansub by لَنْ, marker is fatha. الْكَسُولُ: Fa\u02BFil, Marfu\u02BF, marker is damma.',
      },
      {
        heading: 'Glossary',
        body: 'Use this list for revision.',
        table: {
          headers: ['Term', 'Meaning'],
          rows: [
            ['إِعْرَابٌ', 'Change of endings by role; also, the analysis of a sentence'],
            ['بِنَاءٌ', 'A fixed ending that never changes'],
            ['عَامِلٌ / مَعْمُولٌ', 'The governor / the governed word'],
            ['مُبْتَدَأٌ / خَبَرٌ', 'Topic / information about it'],
            ['فَاعِلٌ', 'Doer, always Marfu\u02BF'],
            ['مَفْعُولٌ بِهِ', 'Direct object, always Mansub'],
            ['نَائِبُ الْفَاعِلِ', 'Deputy of the doer in the passive'],
            ['حَالٌ', 'State of the doer or receiver'],
            ['تَمْيِيزٌ', 'Noun that removes ambiguity'],
            ['مُضَافٌ / مُضَافٌ إِلَيْهِ', 'First noun / second noun of an Idafa'],
            ['نَعْتٌ', 'Adjective'],
            ['عَطْفٌ', 'Conjunction'],
            ['تَوْكِيدٌ', 'Emphasis'],
            ['بَدَلٌ', 'Substitute'],
            ['مُنَادًى', 'Called noun'],
            ['مُسْتَثْنًى', 'Excepted noun'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'nahw17-q1',
        prompt: 'In جَاءَ الْمُسْلِمُونَ, why is the Fa\u02BFil Marfu\u02BF with a waw?',
        options: ['It is a Mabni noun', 'It is a sound masculine plural', 'It is a diptote', 'It is a dual'],
        correctIndex: 1,
        explanation: 'Sound masculine plurals take waw in Raf\u02BF.',
      },
      {
        id: 'nahw17-q2',
        prompt: 'In لَنْ يَنْجَحَ الْكَسُولُ, why does يَنْجَحَ have a fatha?',
        options: ['It is Majzum', 'It is Mansub after لَنْ', 'It is Mabni', 'It is a past verb'],
        correctIndex: 1,
        explanation: 'لَنْ puts the present verb in Nasb.',
      },
      {
        id: 'nahw17-q3',
        prompt: 'In إِنَّ الْعِلْمَ نَافِعٌ, what is الْعِلْمَ?',
        options: ['Mubtada\u2019', 'Ism of Inna', 'Fa\u02BFil', 'Hal'],
        correctIndex: 1,
        explanation: 'The noun after إِنَّ is its Ism, and it is Mansub.',
      },
    ],
  },
];
