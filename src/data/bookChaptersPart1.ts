export interface BookExample {
  ar: string;
  translit: string;
  en: string;
}

export interface BookTable {
  headers: string[];
  rows: string[][];
}

export interface BookSection {
  heading: string;
  body: string;
  examples?: BookExample[];
  table?: BookTable;
}

export interface BookQuizQuestion {
  id: string;
  prompt: string;
  arabicCue?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BookChapter {
  id: string;
  number: number;
  title: string;
  arabicTitle: string;
  summary: string;
  readingMinutes: number;
  sections: BookSection[];
  quiz: BookQuizQuestion[];
  subject?: 'sarf' | 'nahw';
}

export const BOOK_CHAPTERS_PART_1: BookChapter[] = [
  {
    id: 'ch-01-alphabet-harakat',
    number: 1,
    title: 'Arabic Alphabet, Harakat & Syllables',
    arabicTitle: 'الحروف الهجائية والحركات',
    summary: 'Master the 28 consonants, short vowels (harakat), sukun, shadda, tanwin, and long vowels that form the foundation of Arabic morphology.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'The 28 Consonants & Weak Letters',
        body: 'Arabic is written from right to left using 28 letters. Twenty-five are pure consonants, while three letters — Alif (ا), Waw (و), and Ya (ي) — serve double duty as consonants/glides and long vowels. In Sarf, these three are called Huruf al-Illah (حُرُوفُ الْعِلَّةِ, weak letters) because they shift, merge, or drop during conjugation.',
        examples: [
          { ar: 'كَتَبَ', translit: 'kataba', en: 'Sound verb: three strong consonants' },
          { ar: 'قَالَ — يَقُولُ', translit: 'qāla — yaqūlu', en: 'Weak middle letter shifts between ا and و' },
        ],
      },
      {
        heading: 'Harakat, Sukun & Shadda',
        body: 'Short vowels are written above or below consonants: Fatha (ـَ = a), Kasra (ـِ = i), and Damma (ـُ = u). Sukun (ـْ) marks the absence of a vowel on a consonant, closing a syllable. Shadda (ـّ) doubles a consonant (first sakin, second vocalized). Tanwin (ـً ـٍ ـٌ) adds an "-n" sound at the end of indefinite nouns.',
        table: {
          headers: ['Mark', 'Arabic Name', 'Sound / Role', 'Example'],
          rows: [
            ['ـَ', 'فَتْحَة (Fatḥa)', 'Short "a"', 'كَتَبَ (kataba)'],
            ['ـِ', 'كَسْرَة (Kasra)', 'Short "i"', 'عَلِمَ (ʿalima)'],
            ['ـُ', 'ضَمَّة (Ḍamma)', 'Short "u"', 'كَرُمَ (karuma)'],
            ['ـْ', 'سُكُون (Sukūn)', 'No vowel (closed syllable)', 'يَكْتُبْ (yaktub)'],
            ['ـّ', 'شَدَّة (Shadda)', 'Gemination (doubled consonant)', 'عَلَّمَ (ʿallama)'],
          ],
        },
      },
      {
        heading: 'Sun Letters & Moon Letters',
        body: 'When the definite article الـ precedes a noun, the Lām assimilates into 14 "Sun letters" (الحُرُوفُ الشَّمْسِيَّة: ت ث د ذ ر ز س ش ص ض ط ظ ل ن) producing a shadda, while remaining pronounced before the 14 "Moon letters" (الحُرُوفُ الْقَمَرِيَّة).',
        examples: [
          { ar: 'الشَّمْسُ', translit: 'ash-shamsu', en: 'Sun letter assimilation' },
          { ar: 'الْقَمَرُ', translit: 'al-qamaru', en: 'Moon letter clear lam' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q1-1',
        prompt: 'Which three Arabic letters are known as Huruf al-Illah (weak letters)?',
        options: ['ا، و، ي', 'ب، ت، ث', 'س، أ، ل', 'م، ن، ه'],
        correctIndex: 0,
        explanation: 'Alif (ا), Waw (و), and Ya (ي) are the three weak letters that undergo phonetic shifts in Sarf.',
      },
      {
        id: 'q1-2',
        prompt: 'What does a Shadda (ـّ) represent morphologically?',
        arabicCue: 'عَلَّمَ',
        options: ['A long vowel', 'Two identical consonants: first with sukun, second vocalized', 'An omitted letter', 'Indefinite nunation'],
        correctIndex: 1,
        explanation: 'In عَلَّمَ, the doubled Lām stands for لْ + لَ (ʿal-lama).',
      },
      {
        id: 'q1-3',
        prompt: 'Which mark indicates the absence of any vowel on a consonant?',
        options: ['Fatha', 'Tanwin', 'Sukun', 'Kasra'],
        correctIndex: 2,
        explanation: 'Sukun (ـْ) indicates a vowelless consonant.',
      },
    ],
  },
  {
    id: 'ch-02-root-pattern',
    number: 2,
    title: 'The Root & Pattern System',
    arabicTitle: 'الجذر والوزن (الميزان الصرفي)',
    summary: 'Understand Al-Mizan al-Sarfi (ف-ع-ل), how Arabic encodes core meaning in 3 or 4 root consonants, and how patterns build nouns and verbs.',
    readingMinutes: 6,
    sections: [
      {
        heading: 'The Morphological Scale: ف - ع - ل',
        body: 'Classical grammarians chose the three-letter root ف-ع-ل ("to do") as a universal measuring scale (المِيزَانُ الصَّرْفِيُّ). The first root radical is called Fāʾ al-Kalima (فَاءُ الْكَلِمَةِ), the second is ʿAyn al-Kalima (عَيْنُ الْكَلِمَةِ), and the third is Lām al-Kalima (لَامُ الْكَلِمَةِ). Any vowel, sukun, or added letter on a word is mirrored identically on the ف-ع-ل scale.',
        examples: [
          { ar: 'كَتَبَ ← فَعَلَ', translit: 'kataba ← faʿala', en: 'ك is ف, ت is ع, ب is ل' },
          { ar: 'مَكْتُوبٌ ← مَفْعُولٌ', translit: 'maktūbun ← mafʿūlun', en: 'Added م and و are preserved in the pattern' },
          { ar: 'اِسْتَخْرَجَ ← اِسْتَفْعَلَ', translit: 'istakhraja ← istafʿala', en: 'Added ا س ت remain literal in the scale' },
        ],
      },
      {
        heading: 'The Ten Added Letters (سَأَلْتُمُونِيهَا)',
        body: 'Every letter that can be added to a root as a prefix, infix, or suffix belongs to a set of 10 letters memorized in the mnemonic word سَأَلْتُمُونِيهَا ("you asked me for it"): س، أ، ل، ت، م، و، ن، ي، هـ، ا. When analyzing an unfamiliar Arabic word, mentally strip away candidate letters from this set to uncover the 3- or 4-letter root.',
        table: {
          headers: ['Word', 'Pattern (الوزن)', 'Root (الجذر)', 'Word Class'],
          rows: [
            ['كَاتِبٌ', 'فَاعِلٌ', 'ك-ت-ب', 'Active participle (writer)'],
            ['مَكْتَبَةٌ', 'مَفْعَلَةٌ', 'ك-ت-ب', 'Noun of place (library)'],
            ['مُعَلِّمٌ', 'مُفَعِّلٌ', 'ع-ل-م', 'Active participle (teacher)'],
            ['مِفْتَاحٌ', 'مِفْعَالٌ', 'ف-ت-ح', 'Instrument noun (key)'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'q2-1',
        prompt: 'What is the morphological pattern (الوزن) of مَسْجِدٌ (mosque)?',
        arabicCue: 'مَسْجِدٌ',
        options: ['مَفْعَلٌ', 'مَفْعِلٌ', 'فَاعِلٌ', 'مِفْعَالٌ'],
        correctIndex: 1,
        explanation: 'Root س-ج-د maps onto ف-ع-ل; keeping the prefix مَ and the kasra on ع gives مَفْعِلٌ.',
      },
      {
        id: 'q2-2',
        prompt: 'What is the root of اِسْتِغْفَارٌ (seeking forgiveness)?',
        arabicCue: 'اِسْتِغْفَارٌ',
        options: ['س-غ-ف', 'غ-ف-ر', 'ت-غ-ف', 'ف-غ-ر'],
        correctIndex: 1,
        explanation: 'Stripping the Form X prefixes ا س ت and the infixed ا leaves the triliteral root غ-ف-ر.',
      },
    ],
  },
  {
    id: 'ch-03-triliteral-quadriliteral',
    number: 3,
    title: 'Triliteral vs. Quadriliteral Verbs',
    arabicTitle: 'الثلاثي والرباعي (المجرد والمزيد)',
    summary: 'Compare 3-radical (Thulathi) and 4-radical (Ruba\'i) verbs, both unaugmented (Mujarrad) and augmented (Mazid).',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Mujarrad (Bare) vs. Mazid (Augmented)',
        body: 'An Arabic verb root has either 3 radicals (ثُلَاثِيّ — ~95% of Arabic verbs) or 4 radicals (رُبَاعِيّ). When a verb contains ONLY its root letters in the past 3ms (هُوَ), it is Mujarrad (مُجَرَّد). When 1, 2, or 3 extra letters are added to modify meaning, it is Mazid (مَزِيد).',
        examples: [
          { ar: 'كَتَبَ', translit: 'kataba', en: 'Thulathi Mujarrad (3 root letters, bare)' },
          { ar: 'كَاتَبَ', translit: 'kātaba', en: 'Thulathi Mazid (+1 letter: ا)' },
          { ar: 'دَحْرَجَ', translit: 'daḥraja', en: 'Ruba\'i Mujarrad (4 root letters: د-ح-ر-ج)' },
          { ar: 'تَرْجَمَ', translit: 'tarjama', en: 'Ruba\'i Mujarrad (4 root letters: ت-ر-ج-م)' },
        ],
      },
      {
        heading: 'The Four Quadriliteral Patterns (QI–QIV)',
        body: 'In the morphological scale for 4-letter roots, a second Lām is added: فَعْلَلَ (faʿlala). Quadriliterals have 1 bare form (QI) and 3 augmented forms (QII–QIV). Notice that in تَرْجَمَ (to translate), the initial ت is part of the 4-letter root ت-ر-ج-م, not a prefix!',
        table: {
          headers: ['Form', 'Pattern (Past / Present)', 'Meaning Nuance', 'Example'],
          rows: [
            ['QI', 'فَعْلَلَ / يُفَعْلِلُ', 'Base 4-letter action', 'دَحْرَجَ يُدَحْرِجُ (to roll) · تَرْجَمَ (to translate)'],
            ['QII', 'تَفَعْلَلَ / يَتَفَعْلَلُ', 'Reflexive of QI', 'تَدَحْرَجَ يَتَدَحْرَجُ (to roll itself)'],
            ['QIII', 'اِفْعَنْلَلَ / يَفْعَنْلِلُ', 'Gathering / intensity', 'اِحْرَنْجَمَ (to crowd together)'],
            ['QIV', 'اِفْعَلَلَّ / يَفْعَلِلُّ', 'Strong internal state', 'اِطْمَأَنَّ يَطْمَئِنُّ (to feel tranquil)'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'q3-1',
        prompt: 'What is the root of تَرْجَمَ (to translate)?',
        arabicCue: 'تَرْجَمَ',
        options: ['ر-ج-م', 'ت-ر-ج-م', 'ج-ر-م', 'ت-ج-م'],
        correctIndex: 1,
        explanation: 'تَرْجَمَ is a Quadriliteral Form I (فَعْلَلَ) verb whose four root letters are ت-ر-ج-م.',
      },
      {
        id: 'q3-2',
        prompt: 'Which verb belongs to Quadriliteral Form IV (اِفْعَلَلَّ)?',
        options: ['تَدَحْرَجَ', 'دَحْرَجَ', 'اِطْمَأَنَّ', 'تَرْجَمَ'],
        correctIndex: 2,
        explanation: 'اِطْمَأَنَّ follows the pattern اِفْعَلَلَّ from the 4-letter root ط-م-أ-ن.',
      },
    ],
  },
  {
    id: 'ch-04-ten-forms',
    number: 4,
    title: 'The Ten Triliteral Forms (I–X)',
    arabicTitle: 'الأوزان العشرة للفعل الثلاثي',
    summary: 'Explore how Forms I through X systematically transform a single 3-letter root into causative, intensive, reciprocal, reflexive, and desiderative meanings.',
    readingMinutes: 8,
    sections: [
      {
        heading: 'How Derived Forms Shift Meaning',
        body: 'While Form I carries the base lexical meaning of a root, Forms II–X act like semantic multipliers. For instance, from ع-ل-م (knowing): عَلِمَ (to know), عَلَّمَ (to teach), أَعْلَمَ (to inform), تَعَلَّمَ (to learn), اِسْتَعْلَمَ (to inquire).',
        table: {
          headers: ['Form', 'Past / Present', 'Primary Semantic Value', 'Example'],
          rows: [
            ['I', 'فَعَلَ / يَفْعُلُ', 'Base action or state', 'كَتَبَ (write) · عَلِمَ (know)'],
            ['II', 'فَعَّلَ / يُفَعِّلُ', 'Causative / intensive / declarative', 'عَلَّمَ (teach) · كَسَّرَ (shatter)'],
            ['III', 'فَاعَلَ / يُفَاعِلُ', 'Mutual / directed at someone', 'سَاعَدَ (help) · كَاتَبَ (correspond)'],
            ['IV', 'أَفْعَلَ / يُفْعِلُ', 'Causative / entering a state', 'أَخْرَجَ (bring out) · أَسْلَمَ (submit)'],
            ['V', 'تَفَعَّلَ / يَتَفَعَّلُ', 'Reflexive of Form II / gradual', 'تَعَلَّمَ (learn) · تَكَلَّمَ (speak)'],
            ['VI', 'تَفَاعَلَ / يَتَفَاعَلُ', 'Reciprocal / mutual action', 'تَعَاوَنَ (cooperate) · تَفَاهَمَ (understand each other)'],
            ['VII', 'اِنْفَعَلَ / يَنْفَعِلُ', 'Passive / reflexive of Form I', 'اِنْكَسَرَ (get broken) · اِنْفَتَحَ (open up)'],
            ['VIII', 'اِفْتَعَلَ / يَفْتَعِلُ', 'Reflexive / effort / personal gain', 'اِجْتَهَدَ (strive) · اِجْتَمَعَ (gather)'],
            ['IX', 'اِفْعَلَّ / يَفْعَلُّ', 'Colors and physical defects', 'اِحْمَرَّ (turn red) · اِخْضَرَّ (turn green)'],
            ['X', 'اِسْتَفْعَلَ / يَسْتَفْعِلُ', 'Seeking / considering something to be', 'اِسْتَغْفَرَ (seek forgiveness) · اِسْتَخْرَجَ (extract)'],
          ],
        },
      },
      {
        heading: 'Present Prefix Vowels Across the Forms',
        body: 'Notice a golden rule for Mudhari prefix vowels: Forms II, III, IV (and Quadriliteral QI) ALWAYS take a Damma on the present prefix (يُفَعِّلُ، يُفَاعِلُ، يُفْعِلُ، يُفَعْلِلُ). Every other form (I, V, VI, VII, VIII, IX, X) takes a Fatha (يَفْعَلُ، يَتَفَعَّلُ، يَسْتَفْعِلُ).',
        examples: [
          { ar: 'يُعَلِّمُ · يُسَافِرُ · يُرْسِلُ', translit: 'yuʿallimu · yusāfiru · yursilu', en: 'Forms II, III, IV take Damma (يُـ)' },
          { ar: 'يَكْتُبُ · يَتَعَلَّمُ · يَسْتَخْرِجُ', translit: 'yaktubu · yataʿallamu · yastakhriju', en: 'All other forms take Fatha (يَـ)' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q4-1',
        prompt: 'Which three triliteral forms take a Damma (ـُ) on their Mudhari prefix?',
        options: ['I, V, VI', 'II, III, IV', 'VII, VIII, X', 'V, VI, IX'],
        correctIndex: 1,
        explanation: 'Forms II (يُفَعِّلُ), III (يُفَاعِلُ), and IV (يُفْعِلُ) have 4-letter past stems and always take Damma on the present prefix.',
      },
      {
        id: 'q4-2',
        prompt: 'Which form commonly expresses seeking or requesting an action?',
        options: ['Form VII (اِنْفَعَلَ)', 'Form IX (اِفْعَلَّ)', 'Form X (اِسْتَفْعَلَ)', 'Form II (فَعَّلَ)'],
        correctIndex: 2,
        explanation: 'Form X (اِسْتَفْعَلَ) characteristically denotes seeking (e.g., اِسْتَغْفَرَ = to seek forgiveness).',
      },
    ],
  },
  {
    id: 'ch-05-six-babs',
    number: 5,
    title: 'The Six Babs of Form I',
    arabicTitle: 'أبواب الثلاثي المجرد الستة',
    summary: 'Learn the six vowel pairings between Madhi and Mudhari for Form I verbs and how scholars remember them.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Why Form I Needs a Dictionary Bab',
        body: 'In Forms II–X, the middle root vowel in Past and Present is 100% predictable. In Form I, however, the middle letter (عَيْنُ الْفِعْلِ) can carry Fatha, Kasra, or Damma in the Past and Present. Out of 9 mathematical combinations, classical Arabic uses 6 Babs (أَبْوَاب), summarized by the mnemonic verse: فَتْحُ ضَمٍّ، فَتْحُ كَسْرٍ، فَتْحَتَانِ؛ كَسْرُ فَتْحٍ، ضَمُّ ضَمٍّ، كَسْرَتَانِ.',
        table: {
          headers: ['Bab', 'Pattern', 'Model Verb', 'Typical Tendency'],
          rows: [
            ['1', 'فَعَلَ يَفْعُلُ', 'نَصَرَ يَنْصُرُ', 'Most common; often transitive or hollow-waw'],
            ['2', 'فَعَلَ يَفْعِلُ', 'ضَرَبَ يَضْرِبُ', 'Very common; includes many assimilated & hollow-ya'],
            ['3', 'فَعَلَ يَفْعَلُ', 'فَتَحَ يَفْتَحُ', 'Usually contains a guttural letter (ء ه ع ح غ خ) as C2 or C3'],
            ['4', 'فَعِلَ يَفْعَلُ', 'عَلِمَ يَعْلَمُ', 'Colors, emotions, temporary states, cognition'],
            ['5', 'فَعُلَ يَفْعُلُ', 'كَرُمَ يَكْرُمُ', 'Always intransitive; permanent traits/qualities'],
            ['6', 'فَعِلَ يَفْعِلُ', 'حَسِبَ يَحْسِبُ', 'Rare; includes some assimilated verbs like وَرِثَ يَرِثُ'],
          ],
        },
      },
    ],
    quiz: [
      {
        id: 'q5-1',
        prompt: 'Which Bab is always intransitive and describes permanent qualities or traits?',
        options: ['Bab 1 (فَعَلَ يَفْعُلُ)', 'Bab 3 (فَعَلَ يَفْعَلُ)', 'Bab 5 (فَعُلَ يَفْعُلُ)', 'Bab 2 (فَعَلَ يَفْعِلُ)'],
        correctIndex: 2,
        explanation: 'Bab 5 (فَعُلَ يَفْعُلُ, like كَرُمَ، حَسُنَ، سَهُلَ) is strictly intransitive and denotes inherent qualities.',
      },
      {
        id: 'q5-2',
        prompt: 'Bab 3 (فَعَلَ يَفْعَلُ) most commonly features what phonetic clue?',
        options: ['Initial Waw', 'Doubled C2 and C3', 'A guttural letter in C2 or C3', 'Final Alif'],
        correctIndex: 2,
        explanation: 'Verbs like فَتَحَ، ذَهَبَ، قَطَعَ، سَأَلَ have a throat/guttural consonant (ء ه ع ح غ خ) as their 2nd or 3rd radical.',
      },
    ],
  },
  {
    id: 'ch-06-tenses-moods',
    number: 6,
    title: 'Madhi, Mudhari, Amr & Nahy',
    arabicTitle: 'الماضي والمضارع والأمر والنهي',
    summary: 'Learn how Arabic conjugates across all 14 pronouns, shifts Mudhari moods (Marfu, Mansub, Majzum), and derives the Imperative (Amr).',
    readingMinutes: 6,
    sections: [
      {
        heading: 'The 14 Pronouns & Tense Structure',
        body: 'Madhi (الْمَاضِي) marks person/gender/number purely via suffixes (e.g., كَتَبْتُ، كَتَبُوا، كَتَبْنَ). Mudhari (الْمُضَارِعُ) combines 4 prefixes (أَ نَ يَ تَ — mnemonic أَنَيْتُ) with suffixes for duals, plurals, and 2nd feminine singular.',
        examples: [
          { ar: 'كَتَبَ · كَتَبَتْ · كَتَبْتُمْ', translit: 'kataba · katabat · katabtum', en: 'Madhi uses suffixes only' },
          { ar: 'يَكْتُبُ · تَكْتُبِينَ · يَكْتُبُونَ', translit: 'yaktubu · taktubīna · yaktubūna', en: 'Mudhari uses prefix + suffix' },
        ],
      },
      {
        heading: 'Moods of Mudhari & Deriving Amr',
        body: 'Mudhari has three grammatical moods: Marfuʿ (Indicative, ending in ـُ or ـنَ), Mansub (Subjunctive after أَنْ / لَنْ / كَيْ, ending in ـَ or dropping the ن), and Majzum (Jussive after لَمْ / لَا الناهية, ending in ـْ or dropping the ن / weak letter). To form Amr (Imperative): take the 2nd-person Majzum, drop the prefix تَـ; if the next letter has sukun, add Hamzatul Wasl (اُ if C2 has damma, اِ otherwise).',
        examples: [
          { ar: 'تَكْتُبُ ← لَمْ تَكْتُبْ ← كْتُبْ ← اُكْتُبْ', translit: 'taktubu → lam taktub → uktub', en: 'Damma on ت → اُكْتُبْ' },
          { ar: 'تَجْلِسُ ← لَمْ تَجْلِسْ ← جْلِسْ ← اِجْلِسْ', translit: 'tajlisu → lam tajlis → ijlis', en: 'Kasra on ل → اِجْلِسْ' },
          { ar: 'تُعَلِّمُ ← لَمْ تُعَلِّمْ ← عَلِّمْ', translit: 'tuʿallimu → lam tuʿallim → ʿallim', en: 'Next letter is vocalized → no hamza needed' },
        ],
      },
    ],
    quiz: [
      {
        id: 'q6-1',
        prompt: 'Why does اُكْتُبْ start with a Damma on the initial Alif while اِفْتَحْ starts with a Kasra?',
        options: [
          'Because كَتَبَ is transitive',
          'Because the middle radical in يَكْتُبُ carries Damma (يَكْتُبُ), whereas يَفْتَحُ carries Fatha',
          'Because اُكْتُبْ is Form IV',
          'It is purely random',
        ],
        correctIndex: 1,
        explanation: 'In Form I imperatives, Hamzatul Wasl takes Damma if the middle radical in Mudhari has Damma, and Kasra if it has Fatha or Kasra.',
      },
      {
        id: 'q6-2',
        prompt: 'What happens to the final ن in يَكْتُبُونَ when preceded by لَنْ or لَمْ?',
        options: ['It becomes doubled', 'It is dropped (لَنْ يَكْتُبُوا / لَمْ يَكْتُبُوا)', 'It changes to ت', 'Nothing changes'],
        correctIndex: 1,
        explanation: 'The Five Verbs (الأفعال الخمسة) drop their final Nun in both Mansub and Majzum.',
      },
    ],
  },
  {
    id: 'ch-07-masdar-types',
    number: 7,
    title: 'The Verbal Noun (Masdar)',
    arabicTitle: 'المصدر وأنواعه',
    summary: 'Distinguish between lexical (Sama\'i) Form I masdars and regular (Qiyasi) masdars of Forms II–X, plus Masdar Mimi and Masdar Sina\'i.',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Form I vs. Derived Form Masdars',
        body: 'The Masdar (الْمَصْدَرُ) names the abstract action itself (e.g., "writing", "entering"). For Form I, masdars are Samaʿī (سَمَاعِيّ — learned from dictionaries) though patterns like فَعْلٌ (ضَرْبٌ), فُعُولٌ (دُخُولٌ), فِعَالَةٌ (كِتَابَةٌ), and فَعَلٌ (فَرَحٌ) are common. For Forms II–X and Quadriliterals, masdars are 100% Qiyāsī (قِيَاسِيّ — rule-governed).',
        table: {
          headers: ['Form', 'Masdar Pattern', 'Example'],
          rows: [
            ['II', 'تَفْعِيلٌ (or تَفْعِلَةٌ)', 'تَعْلِيمٌ (teaching) · تَرْبِيَةٌ (upbringing)'],
            ['III', 'مُفَاعَلَةٌ / فِعَالٌ', 'مُسَاعَدَةٌ (helping) · دِفَاعٌ (defending)'],
            ['IV', 'إِفْعَالٌ', 'إِرْسَالٌ (sending) · إِسْلَامٌ (submitting)'],
            ['V', 'تَفَعُّلٌ', 'تَعَلُّمٌ (learning) · تَقَدُّمٌ (progressing)'],
            ['VI', 'تَفَاعُلٌ', 'تَعَاوُنٌ (cooperating) · تَبَادُلٌ (exchanging)'],
            ['VII', 'اِنْفِعَالٌ', 'اِنْكِسَارٌ (breaking) · اِنْفِتَاحٌ (opening)'],
            ['VIII', 'اِفْتِعَالٌ', 'اِجْتِمَاعٌ (gathering) · اِجْتِهَادٌ (striving)'],
            ['IX', 'اِفْعِلَالٌ', 'اِحْمِرَارٌ (reddening)'],
            ['X', 'اِسْتِفْعَالٌ', 'اِسْتِخْرَاجٌ (extracting) · اِسْتِغْفَارٌ (seeking pardon)'],
          ],
        },
      },
      {
        heading: 'Masdar Mimi & Industrial Masdar',
        body: 'Masdar Mīmī begins with an extra مَـ (مَفْعَلٌ / مَفْعِلٌ, e.g., مَوْعِدٌ, مَقَالٌ) and carries the exact same meaning as the regular masdar. Masdar Ṣināʿī adds ـِيَّةٌ to a noun to form an abstract concept (e.g., إِنْسَانِيَّةٌ humanity, حُرِّيَّةٌ freedom).',
      },
    ],
    quiz: [
      {
        id: 'q7-1',
        prompt: 'Which pattern is the standard Qiyasi masdar for Form IV (أَفْعَلَ)?',
        options: ['تَفْعِيلٌ', 'إِفْعَالٌ', 'اِنْفِعَالٌ', 'اِسْتِفْعَالٌ'],
        correctIndex: 1,
        explanation: 'Form IV (أَفْعَلَ) always forms its regular masdar on the pattern إِفْعَالٌ (e.g., أَكْمَلَ ← إِكْمَالٌ).',
      },
      {
        id: 'q7-2',
        prompt: 'Why are Form I masdars called Sama\'i?',
        options: [
          'They have only one pattern',
          'They are heard/inherited from usage and must be verified in a lexicon',
          'They always start with م',
          'They are only used in poetry',
        ],
        correctIndex: 1,
        explanation: 'Form I verbs exhibit dozens of masdar patterns (كِتَابَة، دُخُول، عِلْم، شُكْر), so each verb\'s masdar is learned from dictionaries.',
      },
    ],
  },
];
