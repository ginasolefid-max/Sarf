import { TextbookChapter } from '../types/arabic';

const N_AJRUMIYYA = ['الآجرومية', 'متممة الآجرومية', 'قطر الندى وبل الصدى'];
const N_AQIL = ['شرح ابن عقيل على ألفية ابن مالك', 'قطر الندى وبل الصدى'];

function makeNahuChapter(
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
    discipline: 'nahu',
    level,
    titleAr,
    titleEn,
    titleTl,
    ...spec,
  };
}

export const NAHU_CHAPTERS_PART1: TextbookChapter[] = [
  makeNahuChapter(1, 'nahu-01', 'beginner', 'الكلام وما يتألف منه وأقسام الكلمة', 'Speech, Word Classes & Morphological Markers', 'Ang Pananalita at mga Uri ng Salita (Ism, Fi\'l, Harf)', {
    objectives: [
      { ar: 'تعريف الكلام عند النحاة وشروطه الأربعة.', en: 'Define Al-Kalam and its 4 classical conditions.', tl: 'Maunawaan ang kahulugan ng Al-Kalam at ang 4 na kondisyon nito.' },
      { ar: 'تمييز الاسم والفعل والحرف بعلامات كلٍّ منها.', en: 'Identify Ism, Fi\'l, and Harf using formal markers.', tl: 'Makilala ang Ism, Fi\'l, at Harf gamit ang mga palatandaan nito.' },
    ],
    introduction: {
      ar: 'يفتتح ابن آجروم وغيره علم النحو بتعريف الكلام وبيان أجزائه الثلاثة: الاسم والفعل والحرف؛ لأن بناء الجملة والإعراب لا يصحان إلا بعد تمييز نوع الكلمة.',
      en: 'Classical Nahu begins by defining meaningful speech (Al-Kalam) and dividing Arabic words into three exhaustive classes: Noun (Ism), Verb (Fi\'l), and Particle (Harf).',
      tl: 'Nagsisimula ang Nahu sa pagtukoy ng makabuluhang pananalita at tatlong uri ng salita: Pangngalan (Ism), Pandiwa (Fi\'l), at Kataga (Harf).',
    },
    definition: { arabicTerm: 'الكلام وأقسامه', text: { ar: 'الكلام هو اللفظ المركب المفيد بالوضع، وأقسامه ثلاثة: اسم وفعل وحرف جاء لمعنى.', en: 'Kalam is an articulated, compound, meaningful expression following Arabic convention; words are Ism, Fi\'l, or Harf.', tl: 'Ang Kalam ay binigkas na makabuluhang pangungusap na binubuo ng Ism, Fi\'l, o Harf.' } },
    explanation: {
      ar: 'يُعرَف الاسم بالجر والتنوين ودخول (أل) وحروف الخفض والنداء والإسناد إليه. ويُعرَف الفعل بـ(قد، السين، سوف، تاء التأنيث الساكنة، وتاء الفاعل، وياء المخاطبة). والحرف ما لا يقبل علامات الاسم ولا علامات الفعل (كهلْ، في، لم).',
      en: 'Ism markers: Jarr (genitive), Tanwin, الـ, prepositions, vocative, and serving as subject. Fi\'l markers: قَدْ، سَـ، سَوْفَ، feminine تْ، and subject suffixes. Harf accepts neither set of markers.',
      tl: 'Mga palatandaan ng Ism: Jarr, Tanwin, الـ. Ng Fi\'l: قَدْ, سَـ, سَوْفَ, تْ. Ang Harf ay walang kahit alin sa mga ito.',
    },
    rules: [
      { ar: 'لا تجتمع (أل) والتنوين في كلمة واحدة قياسًا (الْكِتَابُ أو كِتَابٌ، لا *الْكِتَابٌ).', en: 'Al- (الـ) and Tanwin are mutually exclusive on a standard noun.', tl: 'Hindi nagsasama ang الـ at Tanwin sa iisang pangngalan.' },
    ],
    classifications: [
      { titleAr: 'الاسم', titleEn: 'Noun (Ism)', titleTl: 'Pangngalan (Ism)', description: { ar: 'يدل على معنى في نفسه غير مقترن بزمان.', en: 'Meaningful independently, without tense.', tl: 'May sariling kahulugan at walang panahunan.' }, examples: ['الْمَدْرَسَةُ', 'رَجُلٌ', 'بِالْقَلَمِ'] },
      { titleAr: 'الفعل', titleEn: 'Verb (Fi\'l)', titleTl: 'Pandiwa (Fi\'l)', description: { ar: 'يدل على حدث مقترن بأحد الأزمنة الثلاثة.', en: 'Event anchored to past, present/future, or command.', tl: 'Kilos na may panahunan.' }, examples: ['قَدْ قَامَ', 'سَيَكْتُبُ', 'اِكْتُبِي'] },
      { titleAr: 'الحرف', titleEn: 'Particle (Harf)', titleTl: 'Kataga (Harf)', description: { ar: 'يدل على معنى في غيره.', en: 'Functional word showing relation between others.', tl: 'Nag-uugnay o nagbibigay-kahulugan sa iba.' }, examples: ['فِي', 'هَلْ', 'لَمْ'] },
    ],
    patterns: [
      { pattern: 'اسم + اسم', example: 'الْعِلْمُ نُورٌ', meaning: { ar: 'أقل ائتلاف للكلام (جملة اسمية)', en: 'Minimal nominal Kalam', tl: 'Pinakamaikling pangungusap na pangngalan' }, rule: { ar: 'مبتدأ وخبر يحققان الإفادة', en: 'Two nouns yielding complete predication', tl: 'Dalawang pangngalang bumubuo ng diwa' } },
    ],
    examples: [{ arabic: 'قَدْ أَفْلَحَ الْمُؤْمِنُونَ', transliteration: 'qad aflaḥa al-mu\'minūna', translation: { ar: 'تطبيق علامات الكلمة', en: 'Successful indeed are the believers', tl: 'Tunay na nagtagumpay ang mga mananampalataya' }, analysis: { ar: 'قَدْ حرف، أَفْلَحَ فعل لدخول قَدْ، الْمُؤْمِنُونَ اسم لدخول أل.', en: 'قَدْ = Harf; أَفْلَحَ = Fi\'l (accepts قَدْ); الْمُؤْمِنُونَ = Ism (takes الـ).', tl: 'قَدْ = Harf; أَفْلَحَ = Fi\'l; الْمُؤْمِنُونَ = Ism.' } }],
    exceptions: [{ ar: 'المفردات المفردة مثل (مُحَمَّد) أو غير المفيدة مثل (إِنْ جَاءَ زَيْدٌ) تُسمى كَلِمَة أو كَلِمًا لا كلامًا تامًّا.', en: 'Single words or incomplete conditional clauses (إِنْ قَامَ زَيْدٌ) do not qualify as complete Kalam.', tl: 'Ang iisang salita o bitin na sugnay ay hindi ganap na Kalam.' }],
    commonMistakes: [{ ar: 'عدّ (مَا) و(إِذْ) حروفًا دائمًا؛ بينما قد تكون أسماءً بحسب السياق.', en: 'Assuming words like مَا or إِذْ are always particles when they can function as nouns.', tl: 'Pag-aakalang laging kataga ang مَا o إِذْ.' }],
    comparison: { ar: 'الجملة أعمّ من الكلام؛ فكل كلام مفيد جملة، وليس كل جملة كلامًا تامَّ الإفادة (كجملة الشرط وحدها).', en: 'Every complete Kalam is a Jumla (sentence), while an incomplete subordinate Jumla is not standalone Kalam.', tl: 'Bawat Kalam ay pangungusap, ngunit hindi lahat ng sugnay ay ganap na Kalam.' },
    practicalExercises: [{ id: 'ex-n01-1', prompt: { ar: 'بيّن علامة الاسمية في (بِسْمِ اللَّهِ).', en: 'Identify the Ism markers in بِسْمِ اللَّهِ.', tl: 'Tukuyin ang palatandaan ng Ism sa بِسْمِ اللَّهِ.' }, arabicPrompt: 'بِسْمِ اللَّهِ', answer: 'الجر بالباء في (بِسْمِ)، والجر بالإضافة ودخول (أل) في لفظ الجلالة', explanation: { ar: 'الجر علامة خاصة بالأسماء.', en: 'Only nouns accept Jarr.', tl: 'Pangngalan lamang ang tumatanggap ng Jarr.' } }],
    summary: { ar: 'الكلام المفيد يقوم على تمييز الاسم والفعل والحرف بعلاماتها المنضبطة.', en: 'Recognizing Ism, Fi\'l, and Harf by formal tests is the entry gate to Arabic syntax.', tl: 'Ang pagkilala sa Ism, Fi\'l, at Harf ang unang hakbang sa Nahu.' },
    furtherReading: N_AJRUMIYYA,
    meta: { status: 'verified', sources: N_AJRUMIYYA },
  }),

  makeNahuChapter(2, 'nahu-02', 'beginner', 'المعرب والمبني من الأسماء والأفعال والحروف', 'Declinable (Mu\'rab) vs. Indeclinable (Mabni)', 'Nagbabago (Mu\'rab) vs Nakapirmi (Mabni)', {
    objectives: [
      { ar: 'حصر المبنيات من الأسماء والأفعال والحروف.', en: 'Enumerate all indeclinable categories across nouns, verbs, and particles.', tl: 'Maitala ang lahat ng uri ng Mabni sa pangngalan, pandiwa, at kataga.' },
    ],
    introduction: {
      ar: 'الكلمات في العربية إما أن تتغير حركة آخرها بتغير العوامل (المعرب) وإما أن تلزم حالة واحدة لا تتغير (المبني).',
      en: 'Every Arabic word is either Mu\'rab (its ending changes according to syntactic governors) or Mabni (its ending remains fixed regardless of position).',
      tl: 'Bawat salita ay alinman sa Mu\'rab (nagbabago ang dulo) o Mabni (nakapirmi ang dulo).',
    },
    definition: { arabicTerm: 'المعرب والمبني', text: { ar: 'المعرب ما يتغير آخره بتغير العوامل الداخلة عليه، والمبني ما لزم آخره حالةً واحدة في جميع التراكيب.', en: 'Mu\'rab shifts its case/mood ending under governors; Mabni keeps a fixed final vowel or sukun.', tl: 'Mu\'rab: nagbabago ang dulo; Mabni: nananatiling nakapirmi ang dulo.' } },
    explanation: {
      ar: 'الحروف كلها مبنية. الأفعال: الماضي مبني دائمًا (على الفتح أو الضم أو السكون)، والأمر مبني دائمًا (على ما يُجزم به مضارعه)، والمضارع معرب إلا إذا اتصل بنون النسوة (مبني على السكون) أو نون التوكيد (مبني على الفتح). الأسماء: الأصل فيها الإعراب، ويُبنى منها ستة أبواب رئيسة: الضمائر، وأسماء الإشارة (عدا هذان وهاتان)، والأسماء الموصولة (عدا اللذان واللتان)، وأسماء الاستفهام (عدا أيّ)، وأسماء الشرط (عدا أيّ)، وبعض الظروف والأعداد المركبة وأسماء الأفعال.',
      en: 'Particles: 100% Mabni. Verbs: Madhi and Amr are always Mabni; Mudhari is Mu\'rab EXCEPT with feminine plural نَ (Mabni on Sukun) or emphatic نَّ (Mabni on Fatha). Nouns: mostly Mu\'rab, EXCEPT Pronouns, Demonstratives (not duals), Relatives (not duals), Interrogatives & Conditionals (not أَيّ), compound numbers 11 & 13–19, and verbal nouns like هَيْهَاتَ.',
      tl: 'Kataga: laging Mabni. Pandiwa: Mabni ang Madhi at Amr; Mu\'rab ang Mudhari maliban sa نَ at نَّ. Pangngalan: karamihan ay Mu\'rab maliban sa panghalip, panturo, atbp.',
    },
    rules: [
      { ar: 'حالات البناء أربع: الضم (نَحْنُ، حَيْثُ)، الفتح (أَنْتَ، كَتَبَ)، الكسر (هَؤُلَاءِ، أَمْسِ)، السكون (مَنْ، كَمْ، هَلْ).', en: 'Four states of Bina\': Damma, Fatha, Kasra, and Sukun.', tl: 'Apat na kalagayan ng Mabni: Damma, Fatha, Kasra, at Sukun.' },
    ],
    classifications: [
      { titleAr: 'المبني من الأسماء', titleEn: 'Indeclinable Nouns', titleTl: 'Mga Pangngalang Mabni', description: { ar: 'تشبه الحرف في الوضع أو المعنى أو الافتقار.', en: 'Fixed nouns evaluated via Local I\'rab (في محل).', tl: 'Nakapirming pangngalan na sinusuri sa posisyon.' }, examples: ['هُوَ', 'هَذَا', 'الَّذِي', 'مَنْ', 'حَيْثُ'] },
      { titleAr: 'المبني من الأفعال', titleEn: 'Indeclinable Verbs', titleTl: 'Mga Pandiwang Mabni', description: { ar: 'الماضي والأمر، والمضارع المتصل بالنونين.', en: 'Madhi, Amr, and Mudhari + نَ / نَّ.', tl: 'Madhi, Amr, at Mudhari na may نَ / نَّ.' }, examples: ['ذَهَبْتُ', 'اِجْتَهِدْ', 'يَكْتُبْنَ', 'لَيَكْتُبَنَّ'] },
    ],
    patterns: [
      { pattern: 'مبني في محل...', example: 'جَاءَ الَّذِي نَجَحَ', meaning: { ar: 'الإعراب المحلي للمبني', en: 'Local I\'rab of a Mabni noun', tl: 'Local I\'rab ng Mabni' }, rule: { ar: 'الَّذِي: اسم موصول مبني على السكون في محل رفع فاعل', en: 'الَّذِي is Mabni on Sukun in the local position of Raf\' (Fa\'il)', tl: 'Nakapirmi sa Sukun sa posisyong Marfu\' (Fa\'il)' } },
    ],
    examples: [{ arabic: 'الطَّالِبَاتُ يَكْتُبْنَ الدَّرْسَ وَلَنْ يَتَأَخَّرْنَ', transliteration: 'aṭ-ṭālibātu yaktubna ad-darsa wa lan yata\'akhkharna', translation: { ar: 'بناء المضارع مع نون النسوة رغم أداة النصب', en: 'The female students write the lesson and will not be late', tl: 'Ang mga babaeng mag-aaral ay nagsusulat at hindi mahuhuli' }, analysis: { ar: 'يَتَأَخَّرْنَ فعل مضارع مبني على السكون في محل نصب بـ(لَنْ)!', en: 'يَتَأَخَّرْنَ stays Mabni on Sukun in local position of Nasb after لَنْ!', tl: 'Nananatiling nakapirmi sa Sukun ang يَتَأَخَّرْنَ sa posisyong Mansub.' } }],
    exceptions: [{ ar: 'تُعرب (هَذَانِ / هَاتَانِ) و(اللَّذَانِ / اللَّتَانِ) و(اِثْنَانِ) إعراب المثنى بالألف رفعًا والياء نصبًا وجرًّا.', en: 'Dual demonstratives (هَذَانِ/هَذَيْنِ) and dual relatives (اللَّذَانِ/اللَّذَيْنِ) are Mu\'rab like Duals.', tl: 'Ang mga dual tulad ng هَذَانِ at اللَّذَانِ ay nagbabago tulad ng Muthanna.' }],
    commonMistakes: [{ ar: 'قول (*مَرَرْتُ بِهَذَي) أو تحريك (حَيْثُ) بالكسرة بعد حرف الجر (*مِنْ حَيْثِ)؛ والصواب (مِنْ حَيْثُ) مبني على الضم في محل جر.', en: 'Writing *مِنْ حَيْثِ; حَيْثُ is always Mabni on Damma (مِنْ حَيْثُ).', tl: 'Pagsulat ng *مِنْ حَيْثِ sa halip na مِنْ حَيْثُ.' }],
    comparison: { ar: 'الرفع والنصب والجر والجزم ألقاب للإعراب فقط، والضم والفتح والكسر والسكون ألقاب للبناء.', en: 'Raf\'/Nasb/Jarr/Jazm name I\'rab states; Damm/Fath/Kasr/Sukun name Bina\' states.', tl: 'Raf\'/Nasb/Jarr/Jazm para sa Mu\'rab; Damm/Fath/Kasr/Sukun para sa Mabni.' },
    practicalExercises: [{ id: 'ex-n02-1', prompt: { ar: 'أعرب (هَؤُلَاءِ) في جملة: أَكْرَمْتُ هَؤُلَاءِ.', en: 'Parse هَؤُلَاءِ in أَكْرَمْتُ هَؤُلَاءِ.', tl: 'Suriin ang هَؤُلَاءِ sa أَكْرَمْتُ هَؤُلَاءِ.' }, arabicPrompt: 'أَكْرَمْتُ هَؤُلَاءِ', answer: 'اسم إشارة مبني على الكسر في محل نصب مفعول به', explanation: { ar: 'هَؤُلَاءِ يلزم الكسر دائمًا ويأخذ محل النصب.', en: 'Mabni on Kasra in local position of Nasb (Maf\'ul Bihi).', tl: 'Nakapirmi sa Kasra sa posisyong Mansub.' } }],
    summary: { ar: 'ضبط المعرب والمبني يقي الطالب من تغيير أواخر الكلمات الثابتة ويمهد للإعراب التقديري والمحلي.', en: 'Separating Mu\'rab from Mabni prevents false case endings on fixed words.', tl: 'Ang paghihiwalay ng Mu\'rab at Mabni ay pumipigil sa maling pagbabago ng dulo ng salita.' },
    furtherReading: N_AJRUMIYYA,
    meta: { status: 'verified', sources: N_AJRUMIYYA },
  }),

  makeNahuChapter(3, 'nahu-03', 'intermediate', 'الإعراب اللفظي والتقديري والمحلي', 'Explicit (Lafzi), Implicit (Taqdiri) & Local (Mahalli) I\'rab', 'I\'rab na Lafzi, Taqdiri at Mahalli', {
    objectives: [
      { ar: 'التفريق بين الإعراب اللفظي والتقديري والمحلي ومواضع كلٍّ منها.', en: 'Distinguish Explicit, Implicit, and Local I\'rab with precision.', tl: 'Mapagkaiba ang Lafzi, Taqdiri, at Mahalli I\'rab.' },
    ],
    introduction: {
      ar: 'قد تظهر علامة الإعراب على آخر الكلمة نطقًا (لفظي)، وقد يمنع من ظهورها مانع صوتي (تقديري)، وقد تكون الكلمة مبنية أو جملةً فتأخذ محلًّا إعرابيًّا (محلي).',
      en: 'Grammatical endings appear either overtly (Lafzi), covertly due to phonological constraints (Taqdiri), or via syntactic slot assignment on indeclinables/clauses (Mahalli).',
      tl: 'Ang I\'rab ay maaaring hayag (Lafzi), nakatago dahil sa tunog (Taqdiri), o batay sa posisyon (Mahalli).',
    },
    definition: { arabicTerm: 'أنواع الإعراب الثلاثة', text: { ar: 'اللفظي ما ظهرت علامته، والتقديري ما مُنعت علامته للتعذر أو الثقل أو اشتغال المحل، والمحلي ما وقع على مبني أو جملة.', en: 'Lafzi shows overt markers; Taqdiri hides markers due to Ta\'adhdhur, Thiqal, or Ishtighal; Mahalli applies to Mabni words and sentences.', tl: 'Lafzi: kita ang marka; Taqdiri: nakatago ang marka; Mahalli: para sa Mabni at buong sugnay.' } },
    explanation: {
      ar: 'أسباب الإعراب التقديري ثلاثة: ١- التعذر (استحالة النطق بالحركة على الألف في المقصور نحو الْفَتَى، والمضارع المعتل بالألف نحو يَسْعَى). ٢- الثقل (صعوبة النطق بالضمة والكسرة على الياء والواو نحو الْقَاضِي، يَدْعُو، يَرْمِي — وتظهر الفتحة لخفتها!). ٣- اشتغال المحل بحركة المناسبة عند الإضافة لياء المتكلم (كِتَابِي، أَخِي). أما الإعراب المحلي فيكون للأسماء المبنية والجمل التي لها محل من الإعراب (الخبر، الحال، النعت، المفعول به).',
      en: 'Taqdiri occurs for 3 reasons: (1) Ta\'adhdhur (impossibility on Alif: الْفَتَى, يَرْضَى — all 3 vowels hidden), (2) Thiqal (heaviness on و/ي: الْقَاضِي, يَدْعُو — hides Damma/Kasra, but Fatha appears!), (3) Ishtighal al-Mahall (before 1s possessive ـي in كِتَابِي). Mahalli governs Mabni nouns and embedded clauses.',
      tl: 'Mga dahilan ng Taqdiri: (1) Ta\'adhdhur sa Alif (الْفَتَى), (2) Thiqal sa و/ي (الْقَاضِي, يَدْعُو — nakikita ang Fatha!), at (3) bago ang ـي (كِتَابِي).',
    },
    rules: [
      { ar: 'حركة التعذر مقدرة في الرفع والنصب والجر (والنصب في الفعل)، وحركة الثقل مقدرة في الرفع والجر فقط.', en: 'Ta\'adhdhur hides all moods/cases; Thiqal hides Raf\' and Jarr only (Nasb is explicit!).', tl: 'Nakatago ang lahat sa Ta\'adhdhur; Raf\' at Jarr lamang sa Thiqal.' },
    ],
    classifications: [
      { titleAr: 'التعذر (الألف)', titleEn: 'Impossibility (Alif)', titleTl: 'Ta\'adhdhur (Alif)', description: { ar: 'يمتنع ظهور أي حركة على الألف.', en: 'Alif never carries a vowel.', tl: 'Hindi tumatanggap ng patinig ang Alif.' }, examples: ['الْهُدَى', 'عِيسَى', 'يَخْشَى'] },
      { titleAr: 'الثقل (الواو والياء)', titleEn: 'Heaviness (Waw/Ya)', titleTl: 'Thiqal (Waw/Ya)', description: { ar: 'تُقدَّر الضمة والكسرة وتظهر الفتحة.', en: 'Damma/Kasra implicit; Fatha explicit.', tl: 'Nakatago ang Damma/Kasra; kita ang Fatha.' }, examples: ['الدَّاعِي', 'يَرْمِي', 'لَنْ يَدْعُوَ'] },
      { titleAr: 'المضاف إلى ياء المتكلم', titleEn: 'Attached 1s Possessive', titleTl: 'May ـي (Akin)', description: { ar: 'اشتغال المحل بكسرة المناسبة.', en: 'All cases implicit before ـي.', tl: 'Nakatago dahil sa Kasra bago ang ـي.' }, examples: ['قَلَمِي', 'صَدِيقِي'] },
    ],
    patterns: [
      { pattern: 'ضمة مقدرة منع من ظهورها...', example: 'جَاءَ الْقَاضِي وَالْفَتَى', meaning: { ar: 'تقدير الضمة للثقل والتعذر', en: 'Implicit Damma (Thiqal & Ta\'adhdhur)', tl: 'Nakatagong Damma' }, rule: { ar: 'الْقَاضِي للثقل، والْفَتَى للتعذر', en: 'Thiqal on ي; Ta\'adhdhur on ى', tl: 'Thiqal sa ي; Ta\'adhdhur sa ى' } },
    ],
    examples: [{ arabic: 'أُحِبُّ أُسْتَاذِي الَّذِي يُعَلِّمُنِي', transliteration: 'uḥibbu ustādhī alladhī yu\'allimunī', translation: { ar: 'اجتماع التقديري والمحلي واللفظي', en: 'I love my teacher who teaches me', tl: 'Mahal ko ang aking guro na nagtuturo sa akin' }, analysis: { ar: 'أُحِبُّ لفظي، أُسْتَاذِي مفعول به بفتحة مقدرة لاشتغال المحل، الَّذِي مبني في محل نصب نعت.', en: 'أُحِبُّ = Lafzi; أُسْتَاذِي = Taqdiri (before ـي); الَّذِي = Mahalli.', tl: 'أُحِبُّ = Lafzi; أُسْتَاذِي = Taqdiri; الَّذِي = Mahalli.' } }],
    exceptions: [{ ar: 'في (مُسْلِمِيَّ) جمع المذكر السالم المضاف لياء المتكلم: يُعرب بالحروف (الياء المشددة) لا بالتقدير.', en: 'Sound Masc. Plural + ـي (مُسْلِمِيَّ) uses letter inflection (Ya), not Taqdiri.', tl: 'Ang Sound Masc. Plural na may ـي (مُسْلِمِيَّ) ay gumagamit ng Ya, hindi Taqdiri.' }],
    commonMistakes: [{ ar: 'تقدير الفتحة على المنقوص أو المضارع المعتل بالياء/الواو؛ والصواب إظهارها نحو (رَأَيْتُ الْقَاضِيَ، لَنْ يَدْعُوَ).', en: 'Thinking Fatha is hidden on الْقَاضِيَ or لَنْ يَدْعُوَ; Fatha is light and appears overtly!', tl: 'Pag-aakalang nakatago ang Fatha sa الْقَاضِيَ at لَنْ يَدْعُوَ.' }],
    comparison: { ar: 'في الإعراب التقديري الكلمة معربة أصلًا لكن منع الصوتُ ظهور الحركة، أما في المحلي فالكلمة مبنية أو جملة كاملة.', en: 'Taqdiri words are Mu\'rab with phonetically blocked endings; Mahalli units are Mabni words or clauses.', tl: 'Ang Taqdiri ay Mu\'rab ngunit pinipigilan ng tunog; ang Mahalli ay Mabni o sugnay.' },
    practicalExercises: [{ id: 'ex-n03-1', prompt: { ar: 'عيّن نوع الإعراب وسببه في (لَنْ يَرْضَى) و(لَنْ يَرْمِيَ).', en: 'Compare I\'rab of لَنْ يَرْضَى vs لَنْ يَرْمِيَ.', tl: 'Ihambing ang I\'rab ng لَنْ يَرْضَى at لَنْ يَرْمِيَ.' }, arabicPrompt: 'لَنْ يَرْضَى / لَنْ يَرْمِيَ', answer: 'يَرْضَى: فتحة مقدرة للتعذر — يَرْمِيَ: فتحة ظاهرة (لفظي)', explanation: { ar: 'الألف يتعذر تحريكها بينما الياء خفيفة مع الفتحة.', en: 'Alif blocks Fatha; Ya displays Fatha lightly.', tl: 'Hinaharang ng Alif ang Fatha; ipinapakita ng Ya ang Fatha.' } }],
    summary: { ar: 'فهم الإعراب اللفظي والتقديري والمحلي يفسّر سبب خفاء الحركة في المقصور والمنقوص والمبنيات.', en: 'Knowing Lafzi, Taqdiri, and Mahalli explains every visible and invisible Arabic case ending.', tl: 'Ipinapaliwanag ng Lafzi, Taqdiri, at Mahalli kung bakit nakikita o nakatago ang marka.' },
    furtherReading: N_AJRUMIYYA,
    meta: { status: 'verified', sources: N_AJRUMIYYA },
  }),

  makeNahuChapter(4, 'nahu-04', 'beginner', 'علامات الإعراب الأصلية والفرعية والعامل والمعمول', 'Original & Substitute I\'rab Markers, Five Nouns, Five Verbs & Amil', 'Mga Orihinal at Kapalit na Marka ng I\'rab at ang Amil', {
    objectives: [
      { ar: 'حفظ العلامات الأصلية الأربع وما ينوب عنها في الأبواب السبعة.', en: 'Master the 4 original markers and all substitute markers (including Five Nouns & Five Verbs).', tl: 'Maisaulo ang 4 na orihinal na marka at ang mga kapalit na marka.' },
      { ar: 'فهم نظرية العامل والمعمول والأثر الإعرابي.', en: 'Understand the Amil (governor) and Ma\'mul (governed) relationship.', tl: 'Maunawaan ang ugnayan ng Amil at Ma\'mul.' },
    ],
    introduction: {
      ar: 'الإعراب إما بعلامات أصلية (الضمة للرفع، الفتحة للنصب، الكسرة للجر، السكون للجزم) أو بعلامات فرعية تنوب عنها في أبواب مخصوصة من الأسماء والأفعال.',
      en: 'Arabic uses 4 original markers (Damma, Fatha, Kasra, Sukun) and systematic substitute markers across Duals, Plurals, Five Nouns, Diptotes, Five Verbs, and Weak Verbs.',
      tl: 'Gumagamit ang Arabe ng 4 na orihinal na marka (Damma, Fatha, Kasra, Sukun) at mga kapalit na marka sa ilang kategorya.',
    },
    definition: { arabicTerm: 'العلامات ونظرية العامل', text: { ar: 'العامل ما أوجب كون آخر المعمول على وجه مخصوص من رفع أو نصب أو جر أو جزم، والعلامات تنقسم إلى أصلية وفرعية.', en: 'The Amil (governor) assigns the grammatical state of the Ma\'mul (governed word), realized via original or substitute markers.', tl: 'Ang Amil ang nagtatakda ng kaso ng Ma\'mul gamit ang orihinal o kapalit na marka.' } },
    explanation: {
      ar: 'العلامات الفرعية: ١- المثنى: الألف رفعًا والياء نصبًا وجرًّا (طَالِبَانِ / طَالِبَيْنِ). ٢- جمع المذكر السالم: الواو رفعًا والياء نصبًا وجرًّا (مُعَلِّمُونَ / مُعَلِّمِينَ). ٣- جمع المؤنث السالم: الكسرة نيابةً عن الفتحة في النصب (رَأَيْتُ الْمُعَلِّمَاتِ). ٤- الأسماء الخمسة (أَبُوكَ، أَخُوكَ، حَمُوكَ، فُوكَ، ذُو مَالٍ): الواو رفعًا، الألف نصبًا، الياء جرًّا — بشروط أن تكون مفردةً مكبّرةً مضافةً لغير ياء المتكلم. ٥- الممنوع من الصرف: الفتحة نيابة عن الكسرة في الجر. ٦- الأفعال الخمسة: ثبوت النون رفعًا وحذفها نصبًا وجزمًا. ٧- المضارع المعتل الآخر: حذف حرف العلة جزمًا.',
      en: 'Substitute Markers: (1) Dual: ا/ي. (2) Sound Masc. Plural: و/ي. (3) Sound Fem. Plural: Kasra in Nasb! (4) Five Nouns (أَب، أَخ، حَم، فُو، ذُو): و (Raf\'), ا (Nasb), ي (Jarr) — when singular, un-diminished, and Mudaf to anything except ـي. (5) Diptotes: Fatha in Jarr. (6) Five Verbs: Nun vs dropped Nun. (7) Weak Mudhari: dropped weak letter in Jazm.',
      tl: 'Mga Kapalit na Marka: Dual (ا/ي), Sound Masc. Plural (و/ي), Sound Fem. Plural (Kasra sa Nasb), Five Nouns (و/ا/ي), Diptotes (Fatha sa Jarr), Five Verbs (Nun).',
    },
    rules: [
      { ar: 'علامة نصب جمع المؤنث السالم هي الكسرة نيابةً عن الفتحة (خَلَقَ اللَّهُ السَّمَاوَاتِ).', en: 'Sound Feminine Plural NEVER takes Fatha in Nasb — it takes Kasra (رَأَيْتُ الطَّالِبَاتِ).', tl: 'Ang Sound Feminine Plural ay laging Kasra sa Nasb (الطَّالِبَاتِ), hindi Fatha.' },
      { ar: 'شروط الأسماء الخمسة: مفردة، مكبّرة، مضافة، وإضافتها لغير ياء المتكلم (فأَبِي وأَخِي بالحركات المقدرة).', en: 'Five Nouns lose letter-markers if pluralized (آبَاء), diminutive (أُبَيّ), un-annexed (أَبٌ), or annexed to ـي (أَبِي).', tl: 'Nagbabago ng patinig (hindi letra) ang Five Nouns kung maramihan o nakakabit sa ـي.' },
    ],
    classifications: [
      { titleAr: 'علامات الرفع (٤)', titleEn: 'Raf\' Markers', titleTl: 'Mga Marka ng Raf\'', description: { ar: 'الضمة (أصل)، الواو، الألف، ثبوت النون.', en: 'Damma, Waw, Alif, retained Nun.', tl: 'Damma, Waw, Alif, Nun.' }, examples: ['الطَّالِبُ', 'الْمُجْتَهِدُونَ / أَبُوكَ', 'الطَّالِبَانِ', 'يَكْتُبُونَ'] },
      { titleAr: 'علامات النصب (٥)', titleEn: 'Nasb Markers', titleTl: 'Mga Marka ng Nasb', description: { ar: 'الفتحة (أصل)، الألف، الكسرة، الياء، حذف النون.', en: 'Fatha, Alif (5 Nouns), Kasra (SFP), Ya (Dual/SMP), dropped Nun.', tl: 'Fatha, Alif, Kasra, Ya, walang Nun.' }, examples: ['الدَّرْسَ', 'أَبَاكَ', 'الطَّالِبَاتِ', 'الطَّالِبَيْنِ / الْمُعَلِّمِينَ', 'لَنْ يَكْتُبُوا'] },
      { titleAr: 'علامات الجر (٣)', titleEn: 'Jarr Markers', titleTl: 'Mga Marka ng Jarr', description: { ar: 'الكسرة (أصل)، الياء، الفتحة.', en: 'Kasra, Ya, Fatha (Diptotes).', tl: 'Kasra, Ya, Fatha.' }, examples: ['الْمَدْرَسَةِ', 'أَبِيكَ / الطَّالِبَيْنِ', 'مَسَاجِدَ'] },
      { titleAr: 'علامات الجزم (٣)', titleEn: 'Jazm Markers', titleTl: 'Mga Marka ng Jazm', description: { ar: 'السكون (أصل)، حذف النون، حذف حرف العلة.', en: 'Sukun, dropped Nun, dropped weak letter.', tl: 'Sukun, walang Nun, walang mahinang letra.' }, examples: ['لَمْ يَكْتُبْ', 'لَمْ يَكْتُبُوا', 'لَمْ يَدْعُ'] },
    ],
    patterns: [
      { pattern: 'أَبُو / أَبَا / أَبِي + مضاف إليه', example: 'جَاءَ أَبُوكَ — رَأَيْتُ أَبَاكَ — مَرَرْتُ بِأَبِيكَ', meaning: { ar: 'إعراب الأسماء الخمسة', en: 'Five Nouns across Raf\', Nasb, Jarr', tl: 'Five Nouns sa Raf\', Nasb, Jarr' }, rule: { ar: 'تُعرب بالحروف بشروطها الأربعة', en: 'Letters و/ا/ي act as case markers', tl: 'Ang mga letrang و/ا/ي ang marka ng kaso' } },
    ],
    examples: [{ arabic: 'حَضَرَ أَخُوكَ وَالطَّالِبَانِ وَشَاهَدْتُ الْمُعَلِّمَاتِ', transliteration: 'ḥaḍara akhūka waṭ-ṭālibāni wa shāhadtu al-mu\'allimāti', translation: { ar: 'تطبيق العلامات الفرعية', en: 'Your brother and the two students attended, and I saw the female teachers', tl: 'Dumating ang iyong kapatid at ang dalawang mag-aaral, at nakita ko ang mga babaeng guro' }, analysis: { ar: 'أَخُوكَ مرفوع بالواو، والطَّالِبَانِ مرفوع بالألف، والْمُعَلِّمَاتِ منصوب بالكسرة.', en: 'أَخُوكَ (Waw), الطَّالِبَانِ (Alif), الْمُعَلِّمَاتِ (Kasra in Nasb).', tl: 'أَخُوكَ (Waw), الطَّالِبَانِ (Alif), الْمُعَلِّمَاتِ (Kasra).' } }],
    exceptions: [{ ar: 'كلمة (فُو) إذا لحقتها الميم (فَمٌ) أُعربت بالحركات الأصلية لا بالحروف.', en: 'فَمٌ (with م) takes normal vowels; only فُو/فَا/فِي without م behaves as one of the Five Nouns.', tl: 'Ang فَمٌ na may م ay gumagamit ng patinig; ang فُو ay letra.' }],
    commonMistakes: [{ ar: 'نصب جمع المؤنث السالم بالفتحة (*رأيتُ الطالباتَ)؛ والصواب الكسرة (الطَّالِبَاتِ).', en: 'Putting Fatha on Sound Feminine Plural objects (*الطَّالِبَاتَ).', tl: 'Paglalagay ng Fatha sa Sound Feminine Plural (*الطَّالِبَاتَ).' }],
    comparison: { ar: 'لا يدخل الجر الأفعال أبدًا، ولا يدخل الجزم الأسماء أبدًا؛ فالرفع والنصب مشتركان بينهما.', en: 'Raf\' & Nasb apply to both nouns and Mudhari verbs; Jarr is exclusively nominal, and Jazm is exclusively verbal.', tl: 'Ang Raf\' at Nasb ay pareho sa pangngalan at pandiwa; ang Jarr ay sa pangngalan lamang, ang Jazm ay sa pandiwa lamang.' },
    practicalExercises: [{ id: 'ex-n04-1', prompt: { ar: 'أدخل (إِنَّ) على: أَبُوكَ ذُو عِلْمٍ.', en: 'Insert إِنَّ before أَبُوكَ ذُو عِلْمٍ.', tl: 'Ilagay ang إِنَّ sa unahan ng أَبُوكَ ذُو عِلْمٍ.' }, arabicPrompt: 'أَبُوكَ ذُو عِلْمٍ', answer: 'إِنَّ أَبَاكَ ذُو عِلْمٍ', explanation: { ar: 'إِنَّ تنصب اسمها (أَبَاكَ بالألف) وترفع خبرها (ذُو بالواو).', en: 'Ism Inna takes Alif (أَبَاكَ); Khabar Inna keeps Waw (ذُو).', tl: 'Mansub ang أَبَاكَ (Alif); Marfu\' ang ذُو (Waw).' } }],
    summary: { ar: 'جدول العلامات الأصلية والفرعية هو البوصلة الرئيسة للإعراب الصحيح.', en: 'Mastering the 4 original and 7 substitute marker systems makes I\'rab completely systematic.', tl: 'Ang tsart ng mga orihinal at kapalit na marka ang gabay sa tamang I\'rab.' },
    furtherReading: N_AJRUMIYYA,
    meta: { status: 'verified', sources: N_AJRUMIYYA },
  }),

  makeNahuChapter(5, 'nahu-05', 'beginner', 'النكرة والمعرفة وأنواع المعارف السبعة', 'Indefinite (Nakirah) vs. Definite (Ma\'rifah) & The 7 Definite Classes', 'Di-tiyak (Nakirah) at Tiyak (Ma\'rifah)', {
    objectives: [
      { ar: 'التمييز الدقيق بين النكرة والمعرفة.', en: 'Distinguish Nakirah from Ma\'rifah accurately.', tl: 'Mapagkaiba ang Nakirah at Ma\'rifah.' },
      { ar: 'حفظ أنواع المعارف السبعة وترتيبها في القوة.', en: 'Learn all 7 classes of definite nouns and their definiteness hierarchy.', tl: 'Matutunan ang 7 uri ng Ma\'rifah.' },
    ],
    introduction: {
      ar: 'ينقسم الاسم من حيث التعيين إلى نكرة شائعة في جنسها، ومعرفة تدل على شيء معين بأحد طرق التعريف السبعة.',
      en: 'Nouns are either indefinite (Nakirah, denoting an unspecified member of a class) or definite (Ma\'rifah, denoting a specific referent via 7 grammatical categories).',
      tl: 'Ang pangngalan ay maaaring Nakirah (di-tiyak) o Ma\'rifah (tiyak).',
    },
    definition: { arabicTerm: 'النكرة والمعرفة', text: { ar: 'النكرة كل اسم شائع في جنسه لا يختص به واحد دون آخر، والمعرفة ما وُضع ليستعمل في شيء بعينه.', en: 'Nakirah denotes an unspecified member of a class (accepts رُبَّ or الـ); Ma\'rifah designates a specific entity.', tl: 'Ang Nakirah ay tumutukoy sa di-tiyak na bagay; ang Ma\'rifah ay tiyak.' } },
    explanation: {
      ar: 'المعارف سبعة مرتبةً في القوة غالبًا: ١- الضمير (أَنَا، هُوَ — أعرف المعارف)، ٢- العَلَم (مُحَمَّد، مَكَّة)، ٣- اسم الإشارة (هَذَا، تِلْكَ)، ٤- الاسم الموصول (الَّذِي، الَّتِي)، ٥- المعرف بـ(أل) (الْكِتَاب)، ٦- المضاف إلى معرفة (كِتَابُ الطَّالِبِ، قَلَمِي)، ٧- النكرة المقصودة في النداء (يَا طَالِبُ).',
      en: 'The 7 Ma\'rifah classes: (1) Pronouns (أَنَا, هُوَ), (2) Proper Nouns (مُحَمَّد, مَكَّة), (3) Demonstratives (هَذَا), (4) Relatives (الَّذِي), (5) Definite with الـ (الْكِتَابُ), (6) Mudaf annexed to a definite noun (كِتَابُ الطَّالِبِ), (7) Intended Indefinite Vocative (يَا رَجُلُ).',
      tl: '7 uri ng Ma\'rifah: (1) Panghalip, (2) Pangngalang Pantangi, (3) Panturo, (4) Pamanggit, (5) May الـ, (6) Nakakabit sa Ma\'rifah sa Idafa, (7) Tiyak na pantawag (يَا طَالِبُ).',
    },
    rules: [
      { ar: 'النكرة المضافة إلى نكرة تبقى نكرة وتفيد التخصيص لا التعريف (كِتَابُ طَالِبٍ)، أما المضافة إلى معرفة فتصير معرفة (كِتَابُ الطَّالِبِ).', en: 'Annexing to an indefinite noun only specifies (still Nakirah: كِتَابُ طَالِبٍ); annexing to a definite noun makes the Mudaf definite (كِتَابُ الطَّالِبِ).', tl: 'Ang Idafa sa Nakirah ay nananatiling Nakirah; ang Idafa sa Ma\'rifah ay nagiging Ma\'rifah.' },
    ],
    classifications: [
      { titleAr: 'المعارف المبنية', titleEn: 'Indeclinable Definites', titleTl: 'Mga Mabning Ma\'rifah', description: { ar: 'الضمائر والإشارة والموصول.', en: 'Pronouns, Demonstratives, Relatives.', tl: 'Panghalip, Panturo, Pamanggit.' }, examples: ['أَنَا', 'ذَلِكَ', 'الَّذِينَ'] },
      { titleAr: 'المعارف المعربة', titleEn: 'Declinable Definites', titleTl: 'Mga Mu\'rab na Ma\'rifah', description: { ar: 'العلم والمعرف بأل والمضاف لمعرفة.', en: 'Proper names, الـ-nouns, and definite Idafa.', tl: 'Pangngalang pantangi, may الـ, at tiyak na Idafa.' }, examples: ['زَيْدٌ', 'الْمَسْجِدُ', 'بَابُ الْمَسْجِدِ'] },
    ],
    patterns: [
      { pattern: 'نكرة + معرفة = معرفة', example: 'قَلَمُ مُحَمَّدٍ', meaning: { ar: 'التعريف بالإضافة', en: 'Definiteness by Idafa', tl: 'Katiyakan sa pamamagitan ng Idafa' }, rule: { ar: 'لا تدخل (أل) على المضاف بل يتعرف بالمضاف إليه', en: 'Mudaf takes no الـ; inherits definiteness from Mudaf Ilayh', tl: 'Walang الـ ang Mudaf; nakukuha ang katiyakan sa Mudaf Ilayh' } },
    ],
    examples: [{ arabic: 'أَعْطَانِي صَدِيقِي هَذَا الْكِتَابَ الْمُفِيدَ', transliteration: 'a\'ṭānī ṣadīqī hādhā al-kitāba al-mufīda', translation: { ar: 'اجتماع عدة أنواع من المعارف', en: 'My friend gave me this useful book', tl: 'Ibinigay sa akin ng kaibigan ko ang kapaki-pakinabang na aklat na ito' }, analysis: { ar: 'الياء ضمير، صَدِيقِي مضاف لضمير، هَذَا إشارة، الْكِتَابَ معرف بأل.', en: 'Combines pronoun, definite Idafa, demonstrative, and الـ-noun.', tl: 'Pinagsasama ang panghalip, tiyak na Idafa, panturo, at may الـ.' } }],
    exceptions: [{ ar: 'بعض الألفاظ المتوغلة في الإبهام مثل (غَيْر، مِثْل، شِبْه) لا تتعرف بالإضافة غالبًا إلا إذا تَمحَّض معناها.', en: 'Words like غَيْر and مِثْل normally stay indefinite even when annexed to a definite noun (unless uniquely contrasted).', tl: 'Ang غَيْر at مِثْل ay karaniwang nananatiling di-tiyak kahit sa Idafa.' }],
    commonMistakes: [{ ar: 'تعريف المضاف والمضاف إليه بـ(أل) معًا (*الْبَابُ الْمَسْجِدِ)؛ الصواب حذف أل والتنوين من المضاف (بَابُ الْمَسْجِدِ).', en: 'Putting الـ on Mudaf (*الْبَابُ الْمَسْجِدِ).', tl: 'Paglalagay ng الـ sa Mudaf (*الْبَابُ الْمَسْجِدِ).' }],
    comparison: { ar: 'تُفيد المعرفة في تحديد المبتدأ والمنعوت المعرفة، بينما النكرة هي الأصل في الخبر والحال والتمييز.', en: 'Mubtada favors Ma\'rifah; Khabar, Hal, and Tamyiz favor Nakirah.', tl: 'Ang Mubtada ay karaniwang Ma\'rifah; ang Khabar, Hal, at Tamyiz ay karaniwang Nakirah.' },
    practicalExercises: [{ id: 'ex-n05-1', prompt: { ar: 'هل عبارة (طَالِبُ عِلْمٍ) معرفة أم نكرة؟ ولماذا؟', en: 'Is طَالِبُ عِلْمٍ definite or indefinite? Why?', tl: 'Tiyak ba o di-tiyak ang طَالِبُ عِلْمٍ?' }, arabicPrompt: 'طَالِبُ عِلْمٍ', answer: 'نكرة مخصَّصة (لأنها أُضيفت إلى نكرة)', explanation: { ar: 'المضاف يكتسب التعريف من المضاف إليه إذا كان معرفةً فقط.', en: 'Annexing to an indefinite noun yields specificity, not definiteness.', tl: 'Ang Idafa sa Nakirah ay nananatiling Nakirah.' } }],
    summary: { ar: 'المعارف السبعة تحدد صلاحية الاسم للابتداء والنعت والحال.', en: 'Knowing the 7 definite noun types determines subjecthood, agreement, and clause structure.', tl: 'Ang 7 uri ng Ma\'rifah ang nagtatakda ng tamang pagsang-ayon sa pangungusap.' },
    furtherReading: N_AJRUMIYYA,
    meta: { status: 'verified', sources: N_AJRUMIYYA },
  }),

  makeNahuChapter(6, 'nahu-06', 'intermediate', 'الضمائر: المنفصلة والمتصلة والمستترة ومحلها الإعرابي', 'Pronouns: Detached, Attached & Hidden (Mustatir) + I\'rab Positions', 'Mga Panghalip (Dama\'ir): Hiwalay, Nakakabit at Nakatago', {
    objectives: [
      { ar: 'تصنيف الضمائر إلى بارز (منفصل ومتصل) ومستتر (وجوبًا وجوازًا).', en: 'Classify Detached, Attached, and Hidden (obligatory vs permissible) pronouns.', tl: 'Mauri ang hiwalay, nakakabit, at nakatagong panghalip.' },
      { ar: 'تحديد المحل الإعرابي للضمائر المتصلة (الرفع والنصب والجر).', en: 'Determine the I\'rab position of every attached pronoun.', tl: 'Matukoy ang posisyong I\'rab ng bawat nakakabit na panghalip.' },
    ],
    introduction: {
      ar: 'الضمائر أعرف المعارف وأشدّها اختصارًا، وهي مبنية دائمًا ولها محل إعرابي دقيق بحسب نوعها واتصالها بالفعل أو الاسم أو الحرف.',
      en: 'Pronouns are the most definite nominal class. Always Mabni, each pronoun occupies a specific local I\'rab slot (Raf\', Nasb, or Jarr).',
      tl: 'Ang mga panghalip ay laging Mabni at may tiyak na posisyong Raf\', Nasb, o Jarr.',
    },
    definition: { arabicTerm: 'الضمير وأقسامه', text: { ar: 'اسم جامد مبني يدل على متكلم أو مخاطب أو غائب، وينقسم إلى بارز (منفصل ومتصل) ومستتر.', en: 'An indeclinable noun denoting 1st, 2nd, or 3rd person; either overt (detached/attached) or implicit (Mustatir).', tl: 'Nakapirming pangngalan na kumakatawan sa nagsasalita, kausap, o pinag-uusapan.' } },
    explanation: {
      ar: '١- المنفصلة: ضمائر الرفع (أَنَا، نَحْنُ، أَنْتَ...، هُوَ...) وتُعرب غالبًا مبتدأً أو فاعلًا بعد إلّا. وضمائر النصب المنفصلة (إِيَّايَ، إِيَّانَا، إِيَّاكَ...، إِيَّاهُ...) وتُعرب مفعولًا به مقدمًا (إِيَّاكَ نَعْبُدُ). ٢- المتصلة: ضمائر رفع فقط (تاء الفاعل، ألف الاثنين، واو الجماعة، نون النسوة، ياء المخاطبة — تُعرب فاعلًا أو نائب فاعل أو اسم كان)، وضمائر نصب وجر (هاء الغائب، كاف الخطاب، ياء المتكلم — مع الفعل مفعول به، ومع إنّ اسم إنّ، ومع الاسم مضاف إليه، ومع حرف الجر اسم مجرور). و(نا) يشترك في الرفع والنصب والجر (كَرَمْنَا / أَكْرَمَنَا / كِتَابُنَا). ٣- المستترة: يستتر الضمير وجوبًا في أمر المفرد المذكر (اُكْتُبْ = أَنْتَ)، والمضارع المبدوء بالهمزة (أَكْتُبُ = أَنَا) والنون (نَكْتُبُ = نَحْنُ) والتاء للمخاطب (تَكْتُبُ = أَنْتَ)؛ ويستتر جوازًا في نحو (زَيْدٌ كَتَبَ = هُوَ) و(هِنْدُ تَكْتُبُ = هِيَ).',
      en: 'Detached: 12 Raf\' pronouns (هُوَ..نَحْنُ) + 12 Nasb pronouns (إِيَّاهُ..إِيَّانَا). Attached: Raf\'-only (تُ، ا، وا، نَ، ي — always Fa\'il/Na\'ib/Ism Kana), Nasb/Jarr (ه، ك، ي — Maf\'ul Bihi on verbs, Ism Inna on Inna, Mudaf Ilayh on nouns, Majrur on prepositions), and universal نَا (Raf\' in كَتَبْنَا, Nasb in عَلَّمَنَا, Jarr in رَبُّنَا). Mustatir is obligatory in 2ms Amr and 1s/1p/2ms Mudhari, and permissible in 3ms/3fs.',
      tl: 'Hiwalay: 12 Raf\' (هُوَ..نَحْنُ) at 12 Nasb (إِيَّاكَ..). Nakakabit: Raf\'-only (تُ, ا, وا, نَ, ي), Nasb/Jarr (ه, ك, ي), at نَا (para sa lahat). Mustatir: nakatagong paksa.',
    },
    rules: [
      { ar: 'ياء المتكلم مع الفعل يلزم معها نون الوقاية لحماية الفعل من الكسر (عَلَّمَنِي، يُكْرِمُنِي).', en: 'Verb + 1s object pronoun requires Nun al-Wiqayah (نِـ): عَلَّمَنِي (not *عَلَّمِي).', tl: 'Kailangan ng نِـ (Nun al-Wiqayah) bago ang ـي sa pandiwa: عَلَّمَنِي.' },
    ],
    classifications: [
      { titleAr: 'ضمائر الرفع المتصلة', titleEn: 'Attached Nominative Pronouns', titleTl: 'Nakakabit na Raf\'', description: { ar: 'تُجمع في (توانينا): التاء، الواو، الألف، النون، الياء، نا.', en: 'Subject/copular subject suffixes.', tl: 'Mga panlaping simuno.' }, examples: ['كَتَبْتُ', 'كَتَبُوا', 'تَكْتُبِينَ'] },
      { titleAr: 'ضمائر النصب والجر المتصلة', titleEn: 'Attached Accusative/Genitive', titleTl: 'Nakakabit na Nasb/Jarr', description: { ar: 'تُجمع في (ناهيك): نا، الهاء، الياء، الكاف.', en: 'Role depends on host word (Verb/Inna = Nasb; Noun/Prep = Jarr).', tl: 'Depende sa kinakabitang salita.' }, examples: ['سَأَلَهُ (نصب)', 'كِتَابُهُ (جر)', 'إِنَّكَ (نصب)', 'لَكَ (جر)'] },
    ],
    patterns: [
      { pattern: 'فِعْل + نَا الفاعلين vs نَا المفعولين', example: 'نَصَرْنَا (سكون الراء) vs نَصَرَنَا (فتح الراء)', meaning: { ar: 'الفرق الدقيق بين الفاعل والمفعول بـ(نَا)', en: 'Sukun before نَا = We helped; Fatha before نَا = He helped us!', tl: 'Sukun bago ang نَا = Kami ang gumawa; Fatha = Kami ang tumanggap!' }, rule: { ar: 'حركة آخر الفعل تكشف موقع (نَا) الإعرابي!', en: 'The vowel before نَا reveals whether نَا is Fa\'il or Maf\'ul Bihi.', tl: 'Ang patinig bago ang نَا ang nagpapakita ng papel nito.' } },
    ],
    examples: [{ arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', transliteration: 'iyyāka na\'budu wa iyyāka nasta\'īnu', translation: { ar: 'ضمير النصب المنفصل والمستتر وجوبًا', en: 'You alone we worship, and You alone we ask for help', tl: 'Ikaw lamang ang aming sinasamba at sa Iyo lamang kami humihingi ng tulong' }, analysis: { ar: 'إِيَّاكَ ضمير منفصل مبني في محل نصب مفعول به مقدم، وفاعل نَعْبُدُ مستتر وجوبًا تقديره (نَحْنُ).', en: 'إِيَّاكَ = fronted Maf\'ul Bihi; subject of نَعْبُدُ is obligatorily hidden (نَحْنُ).', tl: 'إِيَّاكَ = naunang Maf\'ul Bihi; nakatagong simuno ang نَحْنُ.' } }],
    exceptions: [{ ar: 'ضمير الفصل (العماد) مثل (زَيْدٌ هُوَ الْفَائِزُ) قد يُعرب مبتدأ ثانيًا أو حرف فصل لا محل له.', en: 'Pronoun of separation (ضمير الفصل) can either be parsed as a second Mubtada or a non-inflecting separator for emphasis.', tl: 'Ang panghalip na naghihiwalay (هُوَ sa زَيْدٌ هُوَ الْفَائِزُ) ay nagbibigay-diin.' }],
    commonMistakes: [{ ar: 'إعراب الضمير المتصل بالاسم مفعولًا به؛ الصواب أن كل ضمير يتصل بالاسم في محل جر مضاف إليه دائمًا.', en: 'Calling the pronoun on a noun (كِتَابُكَ) an object; noun + pronoun is ALWAYS Mudaf Ilayh (Jarr).', tl: 'Pagsasabing layon ang panghalip sa pangngalan; ito ay palaging Mudaf Ilayh (Jarr).' }],
    comparison: { ar: 'لا يُعدل إلى الضمير المنفصل إذا أمكن الاتصال إلا للتقديم والحصر مثل (إِيَّاكَ نَعْبُدُ).', en: 'Arabic prefers attached pronouns whenever possible; detached Nasb pronouns are used for fronting/exclusivity.', tl: 'Mas pinipili ang nakakabit na panghalip maliban kung inilalagay sa unahan para sa diin.' },
    practicalExercises: [{ id: 'ex-n06-1', prompt: { ar: 'فرّق في الإعراب بين (عَلَّمْنَا) و(عَلَّمَنَا).', en: 'Contrast the I\'rab of نَا in عَلَّمْنَا vs عَلَّمَنَا.', tl: 'Paghambingin ang نَا sa عَلَّمْنَا at عَلَّمَنَا.' }, arabicPrompt: 'عَلَّمْنَا / عَلَّمَنَا', answer: 'في الأولى: نَا في محل رفع فاعل — في الثانية: نَا في محل نصب مفعول به', explanation: { ar: 'سكون الميم يثبت الفاعلية وفتحها يثبت المفعولية.', en: 'Sukun signals subject نَا; Fatha signals object نَا.', tl: 'Sukun = simuno; Fatha = layon.' } }],
    summary: { ar: 'فهم الضمائر الثلاثة ومحالها الإعرابية يحل أكثر إشكالات الإعراب في النصوص العربية.', en: 'Mastering detached, attached, and hidden pronouns unlocks accurate parsing of real Arabic texts.', tl: 'Ang pag-unawa sa lahat ng uri ng panghalip ay susi sa tamang pagsusuri ng mga teksto.' },
    furtherReading: N_AQIL,
    meta: { status: 'verified', sources: N_AQIL },
  }),

  makeNahuChapter(7, 'nahu-07', 'intermediate', 'أسماء الإشارة والموصول والاستفهام والشرط', 'Demonstratives, Relatives, Interrogatives & Conditionals', 'Mga Panturo, Pamanggit, Pananong at Pasubali', {
    objectives: [
      { ar: 'معرفة أسماء الإشارة للقريب والمتوسط والبعيد وإعرابها.', en: 'Master near/distant Demonstratives and their declinable duals.', tl: 'Matutunan ang mga panturo (malapit at malayo).' },
      { ar: 'إتقان الأسماء الموصولة الخاصة والمشتركة (مَنْ، مَا) وصلة الموصول، وأسماء الاستفهام والشرط.', en: 'Master Relative pronouns + Silah, Interrogatives, and Conditional nouns.', tl: 'Maisaulo ang mga pamanggit, pananong, at pasubali.' },
    ],
    introduction: {
      ar: 'تجتمع هذه الأبواب الأربعة في كونها أسماءً مبنيةً في معظمها (عدا المثنى وأَيّ) وتفتقر في دلالتها إلى مشارٍ إليه أو صلة أو جواب.',
      en: 'Demonstratives, Relatives, Interrogatives, and Conditional nouns are predominantly Mabni (except duals and أَيّ) and carry relational syntactic roles.',
      tl: 'Ang mga panturo, pamanggit, pananong, at pasubaling pangngalan ay karaniwang Mabni (maliban sa dual at أَيّ).',
    },
    definition: { arabicTerm: 'الأسماء الموصولة والإشارة', text: { ar: 'اسم الإشارة ما دل على معين بإشارة حسية أو معنوية، والموصول ما افتقر إلى جملة صلة وعائد يربطها به.', en: 'Demonstratives point to a referent; Relatives require a relative clause (Silah) containing a resumptive pronoun (A\'id).', tl: 'Ang Panturo ay tumutukoy sa bagay; ang Pamanggit ay nangangailangan ng sugnay (Silah).' } },
    explanation: {
      ar: '١- أسماء الإشارة: هَذَا، هَذِهِ، هَذَانِ/هَذَيْنِ، هَاتَانِ/هَاتَيْنِ، هَؤُلَاءِ (للقريب)، ذَلِكَ، تِلْكَ، أُولَئِكَ (للبعيد)، هُنَا، هُنَاكَ، ثَمَّ (للمكان). والاسم المعرف بأل بعد اسم الإشارة المشار إليه يُعرب بدلًا غالبًا (هَذَا الطَّالِبُ). ٢- الموصولات: خاصة (الَّذِي، الَّتِي، اللَّذَانِ، اللَّتَانِ، الَّذِينَ، اللَّاتِي/اللَّائِي) ومشتركة (مَنْ للعاقل، مَا لغير العاقل). وجملة الصلة لا محل لها من الإعراب. ٣- أسماء الاستفهام (مَنْ، مَا، مَتَى، أَيْنَ، كَيْفَ، كَمْ، أَيَّانَ، أَيُّ) وأسماء الشرط (مَنْ، مَا، مَهْمَا، مَتَى، أَيْنَمَا، حَيْثُمَا، كَيْفَمَا، أَيُّ) — وكلها مبنية ما عدا (أَيُّ) فهي معربة بالحركات.',
      en: '1. Demonstratives: هَذَا, هَذِهِ, هَؤُلَاءِ, ذَلِكَ, تِلْكَ, أُولَئِكَ (plus duals هَذَانِ/هَذَيْنِ). An الـ-noun after a demonstrative is usually Badal (substitute: هَذَا الْكِتَابُ). 2. Relatives: الَّذِي, الَّتِي, الَّذِينَ, اللَّاتِي + universal مَنْ (rational) / مَا (non-rational); the Silah clause has NO I\'rab position. 3. Interrogatives & Conditionals: all Mabni EXCEPT أَيُّ/أَيَّ/أَيِّ which is fully Mu\'rab.',
      tl: '1. Panturo: هَذَا, هَذِهِ, ذَلِكَ, تِلْكَ (ang kasunod na may الـ ay karaniwang Badal). 2. Pamanggit: الَّذِي, الَّتِي, مَنْ, مَا. 3. Pananong/Pasubali: lahat Mabni maliban sa أَيُّ.',
    },
    rules: [
      { ar: 'الاسم المعرف بـ(أل) الواقع بعد اسم الإشارة ويُشار به إليه يُعرب بدلًا مطابقًا يتبع اسم الإشارة في المحل (أُحِبُّ هَذَا الْكِتَابَ).', en: 'A definite noun pointed to by a demonstrative takes Badal agreeing with the demonstrative’s I\'rab position.', tl: 'Ang tiyak na pangngalan pagkatapos ng panturo ay Badal na sumusunod sa kaso nito.' },
    ],
    classifications: [
      { titleAr: 'أسماء الاستفهام والشرط', titleEn: 'Interrogative & Conditional Nouns', titleTl: 'Pananong at Pasubali', description: { ar: 'مَنْ، مَا، أَيْنَ، مَتَى، أَيّ.', en: 'Distinguish nominal مَنْ/مَا from particles هَلْ/أَ/إِنْ.', tl: 'Ipagkaiba ang pangngalan (مَنْ, مَا) sa kataga (هَلْ, أَ, إِنْ).' }, examples: ['مَنْ يَجْتَهِدْ يَنْجَحْ', 'أَيُّ كِتَابٍ تَقْرَأْ أَقْرَأْهُ'] },
    ],
    patterns: [
      { pattern: 'اسم إشارة + الـ...', example: 'جَاءَ هَذَا الْمُعَلِّمُ', meaning: { ar: 'إعراب البدل بعد الإشارة', en: 'Badal after Demonstrative', tl: 'Badal pagkatapos ng Panturo' }, rule: { ar: 'الْمُعَلِّمُ بدل مرفوع من هَذَا (المبني في محل رفع)', en: 'الْمُعَلِّمُ is Marfu\' Badal matching هَذَا’s local Raf\'', tl: 'Marfu\' Badal ang الْمُعَلِّمُ' } },
    ],
    examples: [{ arabic: 'جَاءَ الَّذِي كَرَّمْتُهُ فِي هَذَا الْمَعْهَدِ', transliteration: 'jā\'a alladhī karramtuhu fī hādhā al-ma\'hadi', translation: { ar: 'الموصول والصلة والبدل', en: 'The one whom I honored in this institute came', tl: 'Dumating ang pinarangalan ko sa institusyong ito' }, analysis: { ar: 'الَّذِي فاعل محلي، وكَرَّمْتُهُ صلة الموصول لا محل لها، والْمَعْهَدِ بدل مجرور من هَذَا.', en: 'الَّذِي = local Fa\'il; كَرَّمْتُهُ = Silah (no I\'rab); الْمَعْهَدِ = Badal Majrur.', tl: 'الَّذِي = Fa\'il; كَرَّمْتُهُ = Silah; الْمَعْهَدِ = Badal.' } }],
    exceptions: [{ ar: 'إذا سُبق اسم الإشارة بأداة نداء (يَا هَذَا الطَّالِبُ) أُعرب المعرف بأل نعتًا لا بدلًا.', en: 'After vocative يَا (يَا هَذَا الرَّجُلُ), the الـ-noun is parsed as Na\'t rather than Badal.', tl: 'Pagkatapos ng يَا (يَا هَذَا الرَّجُلُ), ang may الـ ay Na\'t.' }],
    commonMistakes: [{ ar: 'كتابة ألف بعد الهاء في (هَذَا، هَذِهِ، هَؤُلَاءِ، ذَلِكَ)؛ تُنطق ولا تُكتب رسمًا.', en: 'Writing an explicit Alif in *هاذا or *ذالك.', tl: 'Pagsulat ng Alif sa *هاذا o *ذالك.' }],
    comparison: { ar: 'هَلْ والهمزة (أَ) حرفا استفهام لا محل لهما، بينما (مَنْ، مَا، مَتَى، أَيْنَ، كَيْفَ، كَمْ، أَيُّ) أسماء لها محل من الإعراب.', en: 'هَلْ and أَ are particles (no I\'rab slot); مَنْ, مَا, كَمْ, أَيُّ are nouns occupying an I\'rab slot!', tl: 'Ang هَلْ at أَ ay kataga; ang مَنْ, مَا, كَمْ, أَيُّ ay mga pangngalan na may posisyong I\'rab.' },
    practicalExercises: [{ id: 'ex-n07-1', prompt: { ar: 'أعرب (مَنْ) في: مَنْ يَزْرَعْ يَحْصُدْ.', en: 'Parse مَنْ in مَنْ يَزْرَعْ يَحْصُدْ.', tl: 'Suriin ang مَنْ sa مَنْ يَزْرَعْ يَحْصُدْ.' }, arabicPrompt: 'مَنْ يَزْرَعْ يَحْصُدْ', answer: 'اسم شرط جازم مبني على السكون في محل رفع مبتدأ', explanation: { ar: 'لوقوع فعل لازم أو مستوفٍ مفعوله أو في البداية قبل الشرط.', en: 'Conditional noun in local position of Mubtada.', tl: 'Pangngalang pasubali sa posisyon ng Mubtada.' } }],
    summary: { ar: 'تتقن هذه الأسماء بتحديد بنائها (أو إعراب مثنّاها وأيّ) ومعرفة محلها داخل الجملة.', en: 'Identify Mabni vs Mu\'rab (duals & أَيّ) and trace the local I\'rab role of each pronoun/particle.', tl: 'Alamin ang Mabni vs Mu\'rab (dual at أَيّ) at ang lokal na posisyon nito.' },
    furtherReading: N_AQIL,
    meta: { status: 'verified', sources: N_AQIL },
  }),

  makeNahuChapter(8, 'nahu-08', 'beginner', 'المبتدأ والخبر وأحكام الجملة الاسمية', 'Nominal Sentence: Mubtada & Khabar (Types & Rules)', 'Pangungusap na Pangngalan: Mubtada at Khabar', {
    objectives: [
      { ar: 'تحديد المبتدأ والخبر وإعرابهما ومطابقتهما.', en: 'Identify Mubtada and Khabar and their agreement rules.', tl: 'Matukoy ang Mubtada, Khabar, at ang pagsang-ayon nila.' },
      { ar: 'تمييز أنواع الخبر الثلاثة: المفرد والجملة وشبه الجملة.', en: 'Analyze the 3 Khabar types: Single Word, Clause, and Prepositional/Adverbial.', tl: 'Mauri ang 3 uri ng Khabar: Isang Salita, Sugnay, at Shibh al-Jumla.' },
    ],
    introduction: {
      ar: 'الجملة الاسمية هي التي تبدأ باسم غالبًا، وركناها الأساسيان هما المبتدأ (المُسند إليه) والخبر (المُسند)، وكلاهما مرفوعان.',
      en: 'The Arabic Nominal Sentence (Jumla Ismiyyah) has two Marfu\' pillars: Mubtada (topic/subject) and Khabar (comment/predicate).',
      tl: 'Ang Pangungusap na Pangngalan ay may dalawang pangunahing bahagi na parehong Marfu\': Mubtada at Khabar.',
    },
    definition: { arabicTerm: 'المبتدأ والخبر', text: { ar: 'المبتدأ اسم مرفوع عارٍ عن العوامل اللفظية، والخبر الجزء المتمم الفائدة مع المبتدأ.', en: 'Mubtada is a Marfu\' noun free of verbal governors; Khabar completes the predicate.', tl: 'Ang Mubtada ay Marfu\' na simuno; ang Khabar ang panaguri na nagbibigay ng buong diwa.' } },
    explanation: {
      ar: 'ينقسم الخبر إلى: ١- مفرد (ما ليس جملةً ولا شبه جملة، وإن كان مثنى أو جمعًا: الطَّالِبَانِ مُجْتَهِدَانِ). ٢- جملة اسمية أو فعلية (يشترط وجود رابط يربطها بالمبتدأ: الْعِلْمُ نَفْعُهُ عَظِيمٌ، الطَّالِبُ يَكْتُبُ الدَّرْسَ). ٣- شبه جملة (جار ومجرور أو ظرف: الْكِتَابُ فِي الْحَقِيبَةِ، السَّفَرُ غَدًا). ويجب تقديم الخبر إذا كان شبه جملة والمبتدأ نكرة محضة (فِي الدَّارِ رَجُلٌ) أو في المبتدأ ضمير يعود على بعض الخبر.',
      en: 'Three Khabar forms: (1) Mufrad (single word, even if dual/plural: الطَّالِبَانِ مُجْتَهِدَانِ); (2) Clause (Jumla Ismiyyah/Fi\'liyyah with a pronoun link, in local Raf\'); (3) Shibh al-Jumla (prep phrase or adverbial). Khabar must precede Mubtada when Khabar is Shibh Jumla and Mubtada is pure indefinite (فِي الصَّفِّ طَالِبٌ).',
      tl: '3 uri ng Khabar: (1) Mufrad (isang salita kahit dual/plural), (2) Sugnay (may panghalip na nag-uugnay), at (3) Shibh al-Jumla (pariralang pang-ukol o pang-abay).',
    },
    rules: [
      { ar: 'الأصل في المبتدأ التعريف، ولا يبتدأ بالنكرة إلا بمسوغ (تقدم الخبر شبه جملة، أو النفي/الاستفهام، أو الوصف/الإضافة).', en: 'Mubtada is normally definite; an indefinite Mubtada requires a licensor (e.g. fronted Shibh Jumla, negation, or adjective).', tl: 'Karaniwang tiyak ang Mubtada; kailangan ng dahilan kung di-tiyak.' },
    ],
    classifications: [
      { titleAr: 'خبر مفرد', titleEn: 'Single-Word Khabar', titleTl: 'Khabar Mufrad', description: { ar: 'يطابق المبتدأ في النوع والعدد.', en: 'Agrees in gender & number.', tl: 'Sumasang-ayon sa kasarian at bilang.' }, examples: ['الْحَقُّ وَاضِحٌ', 'الْمُؤْمِنُونَ إِخْوَةٌ'] },
      { titleAr: 'خبر جملة', titleEn: 'Clausal Khabar', titleTl: 'Khabar Sugnay', description: { ar: 'في محل رفع خبر المبتدأ مع رابط.', en: 'In local position of Raf\' with pronoun link.', tl: 'Nasa posisyong Marfu\' at may panghalip na nag-uugnay.' }, examples: ['الْمَدِينَةُ شَوَارِعُهَا وَاسِعَةٌ', 'الْمُعَلِّمُ يَشْرَحُ الدَّرْسَ'] },
      { titleAr: 'خبر شبه جملة', titleEn: 'Prepositional / Adverbial Khabar', titleTl: 'Khabar Shibh al-Jumla', description: { ar: 'جار ومجرور أو ظرف في محل رفع.', en: 'Prep phrase or adverbial.', tl: 'Pariralang pang-ukol o pang-abay.' }, examples: ['الْخَيْرُ فِي الصِّدْقِ', 'الْعُصْفُورُ فَوْقَ الشَّجَرَةِ'] },
    ],
    patterns: [
      { pattern: 'شبه جملة مقدم + مبتدأ نكرة مؤخر', example: 'فِي الْمَكْتَبَةِ كُتُبٌ قَيِّمَةٌ', meaning: { ar: 'تقديم الخبر وجوبًا', en: 'Obligatory fronted Khabar', tl: 'Sapilitang naunang Khabar' }, rule: { ar: 'فِي الْمَكْتَبَةِ خبر مقدم، وكُتُبٌ مبتدأ مؤخر مرفوع', en: 'فِي الْمَكْتَبَةِ = fronted Khabar; كُتُبٌ = delayed Mubtada', tl: 'فِي الْمَكْتَبَةِ = Khabar; كُتُبٌ = Mubtada' } },
    ],
    examples: [{ arabic: 'الطَّالِبُ خُلُقُهُ حَسَنٌ', transliteration: 'aṭ-ṭālibu khuluquhu ḥasanun', translation: { ar: 'خبر الجملة الاسمية', en: 'The student — his character is good', tl: 'Ang mag-aaral ay mabuti ang pag-uugali' }, analysis: { ar: 'الطَّالِبُ مبتدأ أول، خُلُقُ مبتدأ ثانٍ، الهاء مضاف إليه، حَسَنٌ خبر المبتدأ الثاني، والجملة خبر الأول.', en: 'Nested nominal sentence: خُلُقُهُ حَسَنٌ is in local Raf\' as Khabar of الطَّالِبُ.', tl: 'Magkapatong na nominal sentence: ang خُلُقُهُ حَسَنٌ ang Khabar ng الطَّالِبُ.' } }],
    exceptions: [{ ar: 'تتعدد أخبار المبتدأ الواحد دون عطف نحو: الرُّمَّانُ حُلْوٌ حَامِضٌ.', en: 'A single Mubtada may take multiple consecutive Khabars without a conjunction.', tl: 'Maaaring magkaroon ng higit sa isang Khabar ang iisang Mubtada.' }],
    commonMistakes: [{ ar: 'نصب الخبر المفرد في الجملة الاسمية الخالية من النواسخ (*الطَّالِبُ مُجْتَهِدًا)؛ والصواب الرفع (مُجْتَهِدٌ).', en: 'Putting a bare Khabar in Nasb (*الطَّالِبُ مُجْتَهِدًا); Khabar is Marfu\' unless governed by Kana!', tl: 'Paglalagay ng Nasb sa Khabar (*الطَّالِبُ مُجْتَهِدًا) nang walang كَانَ.' }],
    comparison: { ar: 'إذا دخلت (كَانَ) نصبت الخبر، وإذا دخلت (إِنَّ) نصبت المبتدأ.', en: 'Bare Mubtada & Khabar are both Marfu\'; Kana makes Khabar Mansub, while Inna makes Mubtada Mansub.', tl: 'Parehong Marfu\' ang Mubtada at Khabar; ginagawang Mansub ng كَانَ ang Khabar at ng إِنَّ ang Mubtada.' },
    practicalExercises: [{ id: 'ex-n08-1', prompt: { ar: 'حدّد المبتدأ والخبر ونوع الخبر في: الْعُلَمَاءُ يَرْفَعُونَ شَأْنَ الْأُمَّةِ.', en: 'Identify Mubtada, Khabar, and Khabar type in الْعُلَمَاءُ يَرْفَعُونَ شَأْنَ الْأُمَّةِ.', tl: 'Tukuyin ang Mubtada at uri ng Khabar.' }, arabicPrompt: 'الْعُلَمَاءُ يَرْفَعُونَ شَأْنَ الْأُمَّةِ', answer: 'المبتدأ: الْعُلَمَاءُ — الخبر: جملة (يَرْفَعُونَ شَأْنَ الْأُمَّةِ) نوعه جملة فعلية', explanation: { ar: 'الجملة الفعلية في محل رفع خبر المبتدأ.', en: 'The verbal clause serves as clausal Khabar in local Raf\'.', tl: 'Sugnay na pandiwa bilang Khabar.' } }],
    summary: { ar: 'المبتدأ والخبر هما قطبا الجملة الاسمية، وفهم أنواع الخبر الثلاثة أساس لفهم النواسخ.', en: 'Mastery of Mubtada and the 3 Khabar types prepares you directly for Kana and Inna.', tl: 'Ang kaalaman sa Mubtada at 3 uri ng Khabar ay paghahanda para sa Kana at Inna.' },
    furtherReading: N_AJRUMIYYA,
    meta: { status: 'verified', sources: N_AJRUMIYYA },
  }),

  makeNahuChapter(9, 'nahu-09', 'intermediate', 'كان وأخواتها وكاد وأخواتها (الأفعال الناسخة)', 'Kana & Sisters + Verbs of Approximation (Kada & Sisters)', 'Kana at mga Kapatid Nito + Kada at mga Kapatid', {
    objectives: [
      { ar: 'معرفة عمل كان وأخواتها الثلاث عشرة وتصرفها.', en: 'Master the 13 Kana-sisters and how they alter Mubtada/Khabar.', tl: 'Maisaulo ang 13 Kana-sisters at ang epekto nito sa pangungusap.' },
      { ar: 'فهم كاد وأخواتها وشرط كون خبرها جملة فعلية فعلها مضارع.', en: 'Learn Kada-sisters (approximation, hope, inception) requiring a Mudhari Khabar.', tl: 'Matutunan ang Kada-sisters na nangangailangan ng Mudhari bilang Khabar.' },
    ],
    introduction: {
      ar: 'تدخل الأفعال الناسخة (كان وأخواتها، وكاد وأخواتها) على الجملة الاسمية فترفع المبتدأ اسمًا لها وتنصب الخبر خبرًا لها.',
      en: 'Copular verbs (Kana & Sisters) and verbs of approximation/inception (Kada & Sisters) enter nominal sentences, keeping the subject Marfu\' and rendering the predicate Mansub.',
      tl: 'Pumapasok ang Kana at Kada sa pangungusap, pinapanatiling Marfu\' ang simuno at ginagawang Mansub ang panaguri.',
    },
    definition: { arabicTerm: 'الأفعال الناسخة', text: { ar: 'أفعال ناقصة تدخل على المبتدأ والخبر فترفع الأول اسمًا لها وتنصب الثاني خبرًا لها.', en: 'Deficient verbs governing a nominal clause: Ism is Marfu\' and Khabar is Mansub.', tl: 'Mga pandiwang nagpapanatili ng Marfu\' sa Ism at nagbibigay ng Mansub sa Khabar.' } },
    explanation: {
      ar: 'أخوات كان: كَانَ، أَصْبَحَ، أَضْحَى، ظَلَّ، أَمْسَى، بَاتَ، صَارَ، لَيْسَ (جامد)، مَا زَالَ، مَا بَرِحَ، مَا فَتِئَ، مَا انْفَكَّ (تُسبق بنفي أو شبهه)، مَا دَامَ (تُسبق بـ"ما" المصدرية الظرفية). أما كاد وأخواتها: ١- المقاربة (كَادَ، كَرَبَ، أَوْشَكَ)، ٢- الرجاء (عَسَى، حَرَى، اِخْلَوْلَقَ)، ٣- الشروع (شَرَعَ، بَدَأَ، أَخَذَ، جَعَلَ، طَفِقَ) — ويُشترط في خبر كاد وأخواتها أن يكون جملة فعلية فعلها مضارع (كَادَ الطَّالِبُ يَفْهَمُ).',
      en: 'Kana-sisters: كَانَ، أَصْبَحَ، أَضْحَى، ظَلَّ، أَمْسَى، بَاتَ، صَارَ، لَيْسَ (never conjugates), مَا زَالَ/بَرِحَ/فَتِئَ/انْفَكَّ (require negation), مَا دَامَ. Kada-sisters: Approximation (كَادَ, أَوْشَكَ), Hope (عَسَى), Inception (بَدَأَ, أَخَذَ, شَرَعَ). Kada’s Khabar MUST be a present-tense verbal clause (with/without أَنْ).',
      tl: 'Kana-sisters: كَانَ, أَصْبَحَ, صَارَ, لَيْسَ, مَا زَالَ, مَا دَامَ. Kada-sisters: كَادَ, عَسَى, بَدَأَ — ang Khabar nito ay dapat sugnay na may Mudhari.',
    },
    rules: [
      { ar: 'يمتنع اقتران خبر أفعال الشروع بـ(أَنْ) لأن الشروع للحال و(أَنْ) للاستقبال: بَدَأَ الطَّالِبُ يَكْتُبُ (لا *أَنْ يَكْتُبَ).', en: 'Inception verbs (بَدَأَ، أَخَذَ، شَرَعَ) FORBID أَنْ before their Mudhari Khabar.', tl: 'Bawal ang أَنْ sa Khabar ng mga pandiwang nagsisimula (بَدَأَ، شَرَعَ).' },
    ],
    classifications: [
      { titleAr: 'كان التامة vs الناقصة', titleEn: 'Complete vs Deficient Kana', titleTl: 'Buo vs Kulang na Kana', description: { ar: 'التامة تكتفي بفاعلها بمعنى (وُجِدَ/حَصَلَ).', en: 'Complete Kana takes a normal Fa\'il meaning "existed/happened".', tl: 'Ang buong Kana ay nangangahulugang "umiral" at kumukuha ng Fa\'il.' }, examples: ['اِتَّقِ اللَّهَ حَيْثُمَا كُنْتَ (التاء فاعل)'] },
      { titleAr: 'أقسام كاد وأخواتها', titleEn: 'Kada Subclasses', titleTl: 'Mga Uri ng Kada', description: { ar: 'المقاربة، والرجاء، والشروع.', en: 'Approximation, Hope, Inception.', tl: 'Paglapit, Pag-asa, Pagsisimula.' }, examples: ['أَوْشَكَ الْفَجْرُ أَنْ يَطْلُعَ', 'عَسَى اللَّهُ أَنْ يَأْتِيَ', 'شَرَعَ الْمُعَلِّمُ يَشْرَحُ'] },
    ],
    patterns: [
      { pattern: 'كان + اسم مرفوع + خبر منصوب', example: 'أَصْبَحَ الطَّالِبَانِ نَشِيطَيْنِ', meaning: { ar: 'عمل كان في المثنى', en: 'Kana with Duals', tl: 'Kana sa Dual' }, rule: { ar: 'اسم أصبح مرفوع بالألف، وخبرها منصوب بالياء', en: 'Ism takes Alif; Khabar takes Ya', tl: 'Alif sa Ism; Ya sa Khabar' } },
    ],
    examples: [{ arabic: 'لَيْسَ الْكَسُولُ نَاجِحًا وَمَا زَالَ الْعِلْمُ نَافِعًا', transliteration: 'laysa al-kasūlu nājiḥan wa mā zāla al-\'ilmu nāfi\'an', translation: { ar: 'لَيْسَ ومَا زَالَ', en: 'The lazy one is not successful, and knowledge continues to be beneficial', tl: 'Ang tamad ay hindi matagumpay, at ang kaalaman ay patuloy na kapaki-pakinabang' }, analysis: { ar: 'نَاجِحًا خبر ليس منصوب، ونَافِعًا خبر ما زال منصوب.', en: 'Both predicates are Mansub.', tl: 'Parehong Mansub ang mga panaguri.' } }],
    exceptions: [{ ar: 'يجوز تقديم خبر كان وأخواتها على اسمها إذا كان شبه جملة أو مفردًا، ولا يتقدم خبر (ما دام) عليها.', en: 'Khabar Kana can precede Ism Kana (كَانَ فِي الْفَصْلِ طَالِبٌ), though not before مَا دَامَ.', tl: 'Maaaring mauna ang Khabar Kana sa Ism Kana.' }],
    commonMistakes: [{ ar: 'رفع خبر كان أو ليس (*ليس الطالبُ ناجحٌ) أو إدخال (أَنْ) بعد بَدَأَ (*بدأ المطرُ أن ينزل).', en: 'Leaving Khabar Laysa Marfu\' (*لَيْسَ الطَّالِبُ نَاجِحٌ) or adding أَنْ after بَدَأَ.', tl: 'Pag-iwan na Marfu\' ng Khabar ng Laysa o paglalagay ng أَنْ pagkatapos ng بَدَأَ.' }],
    comparison: { ar: 'عمل كان وأخواتها (رفع الأول ونصب الثاني) عكس عمل إنّ وأخواتها (نصب الأول ورفع الثاني).', en: 'Kana = Raf\' then Nasb; Inna = Nasb then Raf\'.', tl: 'Kana = Raf\' muna bago Nasb; Inna = Nasb muna bago Raf\'.' },
    practicalExercises: [{ id: 'ex-n09-1', prompt: { ar: 'أدخل (صَارَ) على: الْمُعَلِّمُونَ مُجْتَمِعُونَ.', en: 'Insert صَارَ before الْمُعَلِّمُونَ مُجْتَمِعُونَ.', tl: 'Ilagay ang صَارَ bago ang الْمُعَلِّمُونَ مُجْتَمِعُونَ.' }, arabicPrompt: 'الْمُعَلِّمُونَ مُجْتَمِعُونَ', answer: 'صَارَ الْمُعَلِّمُونَ مُجْتَمِعِينَ', explanation: { ar: 'اسم صار مرفوع بالواو، وخبرها منصوب بالياء.', en: 'Ism Sara stays Marfu\' (ونَ); Khabar Sara becomes Mansub (ينَ).', tl: 'Nananatiling ونَ ang Ism; nagiging ينَ ang Khabar.' } }],
    summary: { ar: 'كان وكاد تتحكمان في زمن الجملة الاسمية وتنقلان الخبر من الرفع إلى النصب.', en: 'Kana and Kada infuse tense and aspect into nominal sentences while putting predicates in Nasb.', tl: 'Nagbibigay ng panahunan ang Kana at Kada at ginagawang Mansub ang panaguri.' },
    furtherReading: N_AQIL,
    meta: { status: 'verified', sources: N_AQIL },
  }),

  makeNahuChapter(10, 'nahu-10', 'intermediate', 'إنَّ وأخواتها ولا النافية للجنس', 'Inna & Sisters + Categorical Negation (La al-Nafiyah lil-Jins)', 'Inna at mga Kapatid + La al-Nafiyah lil-Jins', {
    objectives: [
      { ar: 'إتقان معاني وعمل الأحرف الناسخة الستة (إنَّ، أنَّ، كأنَّ، لكنَّ، ليتَ، لعلَّ).', en: 'Master the 6 Inna-sisters and their semantic nuances.', tl: 'Maisaulo ang 6 na Inna-sisters at ang mga kahulugan nito.' },
      { ar: 'فهم شروط عمل لا النافية للجنس وأحوال اسمها الثلاثة.', en: 'Master La al-Nafiyah lil-Jins and the 3 states of its Ism.', tl: 'Matutunan ang La al-Nafiyah lil-Jins at ang 3 anyo ng pangngalan nito.' },
    ],
    introduction: {
      ar: 'الأحرف الناسخة تدخل على الجملة الاسمية فتنصب المبتدأ ويسمى اسمها، وترفع الخبر ويسمى خبرها، وتُلحق بها (لا النافية للجنس) بشروط مخصوصة.',
      en: 'Inna & Sisters reverse Kana’s governance: they render the Mubtada Mansub (Ism Inna) and keep the Khabar Marfu\' (Khabar Inna). La of categorical negation follows the same governance under strict conditions.',
      tl: 'Pinapalitan ng Inna at mga Kapatid ang Mubtada bilang Mansub at pinapanatiling Marfu\' ang Khabar.',
    },
    definition: { arabicTerm: 'إنَّ وأخواتها ولا النافية للجنس', text: { ar: 'حروف ناسخة تنصب الاسم وترفع الخبر، ولا النافية للجنس تنفي الخبر عن جميع أفراد جنس الاسم.', en: 'Particles governing Ism in Nasb and Khabar in Raf\'; La al-Nafiyah negates the predicate across the entire genus.', tl: 'Mga katagang nagbibigay ng Nasb sa Ism at Raf\' sa Khabar.' } },
    explanation: {
      ar: 'الأحرف الستة: إِنَّ وأَنَّ (للتوكيد)، كَأَنَّ (للتشبيه)، لَكِنَّ (للاستدراك)، لَيْتَ (للتمني)، لَعَلَّ (للترجي). إذا اتصلت بها (ما) الكافة بطل عملها (إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ) ما عدا لَيْتَ فيجوز الوجهان. أما لا النافية للجنس فتعمل بشرط أن يكون اسمها وخبرها نكرتين وألا يفصل بينها وبين اسمها فاصل وألا تُسبق بحرف جر؛ واسمها إما مضاف منصوب (لَا طَالِبَ عِلْمٍ مَهْمَلٌ) أو شبيه بالمضاف منصوب (لَا طَالِعًا جَبَلًا حَاضِرٌ) أو مفرد مبني على ما يُنصب به (لَا رَجُلَ فِي الدَّارِ).',
      en: 'The 6 sisters: إِنَّ/أَنَّ (emphasis), كَأَنَّ (simile), لَكِنَّ (contrast), لَيْتَ (wish), لَعَلَّ (expectation). Attaching مَا الكافة cancels governance (إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ), except with لَيْتَمَا where both are allowed. La al-Nafiyah requires indefinite Ism & Khabar, adjacency, and no preposition: Mudaf/Shabih are Mansub (لَا طَالِبَ عِلْمٍ), while single-word Ism La is Mabni on its Nasb marker without Tanwin (لَا رَجُلَ، لَا رَجُلَيْنِ).',
      tl: 'Ang 6 na kapatid: إِنَّ/أَنَّ, كَأَنَّ, لَكِنَّ, لَيْتَ, لَعَلَّ. Kapag may مَا (إِنَّمَا), nawawala ang epekto nito sa kaso. Ang La al-Nafiyah ay walang Tanwin sa isahang Ism (لَا رَجُلَ).',
    },
    rules: [
      { ar: 'يجب كسر همزة (إِنَّ) في أول الكلام، وبعد القول (قَالَ إِنِّي)، وبعد القسم، وفي أول الصلة والصفة والحال.', en: 'Use إِنَّ (with Kasra) at sentence start, after قَالَ, after an oath, and after relative pronouns.', tl: 'Gamitin ang إِنَّ (Kasra) sa simula ng pangungusap at pagkatapos ng قَالَ.' },
      { ar: 'تُفتح همزة (أَنَّ) إذا صحّ تأويلها مع اسمها وخبرها بمصدر صريح (عَلِمْتُ أَنَّكَ مُجْتَهِدٌ = اجْتِهَادَكَ).', en: 'Use أَنَّ (with Fatha) whenever أَنَّ + clause collapses into a single Masdar noun slot.', tl: 'Gamitin ang أَنَّ (Fatha) kapag ito ay bumubuo ng Masdar Mu\'awwal.' },
    ],
    classifications: [
      { titleAr: 'أحوال اسم لا النافية للجنس', titleEn: '3 States of Ism La', titleTl: '3 Anyo ng Ism La', description: { ar: 'مبني (مفرد)، منصوب (مضاف أو شبيه بالمضاف).', en: 'Mabni (single) vs Mansub (Mudaf/Shabih).', tl: 'Mabni vs Mansub.' }, examples: ['لَا إِلَهَ إِلَّا اللَّهُ (مبني على الفتح)', 'لَا طَالِبَ عِلْمٍ كَسْلَانُ (مضاف منصوب)', 'لَا مُقَصِّرِينَ نَاجِحُونَ (مبني على الياء)'] },
    ],
    patterns: [
      { pattern: 'إِنَّمَا + مبتدأ + خبر', example: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ', meaning: { ar: 'كفّ إنّ عن العمل بدخول ما', en: 'Ma al-Kaffah neutralizes Inna', tl: 'Pinipigilan ng مَا ang Inna' }, rule: { ar: 'ما الكافة تكف إنّ فتعود الجملة مبتدأً وخبرًا مرفوعين', en: 'Returns sentence to Marfu\' Mubtada + Khabar', tl: 'Nagiging Marfu\' Mubtada ulit' } },
    ],
    examples: [{ arabic: 'لَا رَيْبَ فِيهِ وَلَكِنَّ الْغَافِلِينَ مُعْرِضُونَ', transliteration: 'lā rayba fīhi wa lākinna al-ghāfilīna mu\'riḍūna', translation: { ar: 'لا النافية للجنس ولكنّ', en: 'There is no doubt in it, but the heedless turn away', tl: 'Walang pag-aalinlangan dito, ngunit ang mga pabaya ay umiiwas' }, analysis: { ar: 'رَيْبَ اسم لا مبني على الفتح في محل نصب، والْغَافِلِينَ اسم لكنّ منصوب بالياء.', en: 'رَيْبَ is Mabni on Fatha (no Tanwin!); الْغَافِلِينَ is Ism Lakinna Mansub with Ya.', tl: 'رَيْبَ ay Mabni sa Fatha; الْغَافِلِينَ ay Mansub sa Ya.' } }],
    exceptions: [{ ar: 'إذا فُصل بين (لا) واسمها أو دخلت على معرفة وَجَبَ إهمالها وتكرارها: لَا فِي الدَّارِ رَجُلٌ وَلَا امْرَأَةٌ.', en: 'If separated from its noun or followed by a definite noun, La becomes inactive and must be repeated.', tl: 'Kapag nahiwalay o sinundan ng tiyak na pangngalan, nawawala ang epekto ng La at inuulit ito.' }],
    commonMistakes: [{ ar: 'تنوين اسم لا المفرد (*لا رجلٌ أو *لا رجلاً في الدار)؛ والصواب بناؤه على الفتح بلا تنوين (لَا رَجُلَ).', en: 'Putting Tanwin on single-word Ism La (*لَا رَجُلًا); it must be un-nunated: لَا رَجُلَ.', tl: 'Paglalagay ng Tanwin sa isahang Ism La (*لَا رَجُلًا).' }],
    comparison: { ar: 'لا النافية للجنس تنفي الجنس كله (لَا طَالِبَ غَائِبٌ)، بينما لا المشبهة بليس تنفي الواحد (لَا رَجُلٌ حَاضِرًا بَلْ رَجُلَانِ).', en: 'La al-Nafiyah lil-Jins negates the entire category absolutely.', tl: 'Ang La al-Nafiyah lil-Jins ay ganap na pagtanggi sa buong kategorya.' },
    practicalExercises: [{ id: 'ex-n10-1', prompt: { ar: 'أدخل (لَعَلَّ) على: الطَّالِبَانِ نَاجِحَانِ.', en: 'Insert لَعَلَّ before الطَّالِبَانِ نَاجِحَانِ.', tl: 'Ilagay ang لَعَلَّ bago ang الطَّالِبَانِ نَاجِحَانِ.' }, arabicPrompt: 'الطَّالِبَانِ نَاجِحَانِ', answer: 'لَعَلَّ الطَّالِبَيْنِ نَاجِحَانِ', explanation: { ar: 'اسم لعل منصوب بالياء وخبرها مرفوع بالألف.', en: 'Ism La\'alla Mansub (ي); Khabar Marfu\' (ا).', tl: 'Mansub sa ي ang Ism; Marfu\' sa ا ang Khabar.' } }],
    summary: { ar: 'إنّ وأخواتها ولا النافية للجنس تنصب الاسم وترفع الخبر، مع تميز همزة إنّ وأنّ.', en: 'Inna-sisters and La al-Nafiyah regulate nominal emphasis and categorical negation cleanly.', tl: 'Kinokontrol ng Inna-sisters at La al-Nafiyah ang pagbibigay-diin at ganap na pagtanggi.' },
    furtherReading: N_AQIL,
    meta: { status: 'verified', sources: N_AQIL },
  }),

  makeNahuChapter(11, 'nahu-11', 'intermediate', 'ظنَّ وأخواتها (الأفعال الناسخة الناصبة لمفعولين)', 'Zanna & Sisters (Mental Perception & Transformation Verbs)', 'Zanna at mga Kapatid Nito (Dalawang Layon)', {
    objectives: [
      { ar: 'حفظ أفعال اليقين والرجحان والتحويل التي تنصب مفعولين أصلهما مبتدأ وخبر.', en: 'Master Zanna-sisters (certainty, probability, transformation) governing two objects.', tl: 'Maisaulo ang mga pandiwang Zanna na kumukuha ng dalawang layon.' },
    ],
    introduction: {
      ar: 'بخلاف كان (التي ترفع الأول وتنصب الثاني) وإنّ (التي تنصب الأول وترفع الثاني)، تدخل ظنَّ وأخواتها على المبتدأ والخبر فتنصبهما معًا مفعولين.',
      en: 'Unlike Kana and Inna, Zanna & Sisters take a complete Mubtada + Khabar pair and render BOTH Mansub as two direct objects.',
      tl: 'Hindi tulad ng Kana at Inna, ginagawang Mansub ng Zanna at mga kapatid nito ang parehong Mubtada at Khabar bilang dalawang layon.',
    },
    definition: { arabicTerm: 'ظنَّ وأخواتها', text: { ar: 'أفعال تامة تدخل على الجملة الاسمية فتنسخ حكم المبتدأ والخبر وتنصبهما مفعولًا أول ومفعولًا ثانيًا.', en: 'Transitive verbs of mental attitude or transformation taking two Mansub objects originally forming a nominal sentence.', tl: 'Mga pandiwang pangkaisipan o pagbabago na kumukuha ng dalawang Mansub na layon.' } },
    explanation: {
      ar: 'تنقسم إلى قسمين: ١- أفعال القلوب: اليقين (عَلِمَ، رَأَى القلبية، وَجَدَ، دَرَى، أَلْفَى) والرجحان/الظن (ظَنَّ، خَالَ، حَسِبَ، زَعَمَ، عَدَّ). ٢- أفعال التحويل/التصيير: جَعَلَ، صَيَّرَ، رَدَّ، تَرَكَ، اِتَّخَذَ. ويطرأ على أفعال القلوب الإلغاء (إذا توسطت أو تأخرت) والتعليق (إذا دخل بعدَها لام الابتداء أو نفي أو استفهام).',
      en: 'Two groups: (1) Mental Verbs: Certainty (عَلِمَ, وَجَدَ, abstract رَأَى) and Supposition (ظَنَّ, خَالَ, حَسِبَ, زَعَمَ); (2) Transformation Verbs: جَعَلَ, صَيَّرَ, اِتَّخَذَ, تَرَكَ. Note: Mental verbs can be suspended (التعليق) by interrogatives, negation, or Lam al-Ibtida (عَلِمْتُ لَزَيْدٌ قَائِمٌ).',
      tl: 'Dalawang grupo: (1) Pangkaisipan: katiyakan (عَلِمَ, وَجَدَ) at hinala (ظَنَّ, حَسِبَ); (2) Pagbabago (جَعَلَ, صَيَّرَ, اِتَّخَذَ).',
    },
    rules: [
      { ar: 'شرط نصب مفعولين في (رَأَى) و(وَجَدَ) أن تكون قلبيةً علميةً لا بصريةً أو بمعنى العثور؛ فإن كانت بصريةً نصبت مفعولًا واحدًا فقط (رَأَيْتُ الْقَمَرَ مُنِيرًا ← حال!).', en: 'Visual رَأَى (to see with eyes) takes ONE object (plus Hal); mental رَأَى (to perceive/deem) takes TWO objects.', tl: 'Ang pisikal na رَأَى ay isang layon lamang; ang pangkaisipang رَأَى ay dalawang layon.' },
    ],
    classifications: [
      { titleAr: 'أفعال اليقين والرجحان', titleEn: 'Certainty & Supposition', titleTl: 'Katiyakan at Hinala', description: { ar: 'عَلِمَ، وَجَدَ، ظَنَّ، حَسِبَ.', en: 'Mental judgment over two arguments.', tl: 'Pangkaisipang paghatol.' }, examples: ['ظَنَنْتُ الْاِمْتِحَانَ سَهْلًا', 'وَجَدْتُ الصِّدْقَ نَجَاةً'] },
      { titleAr: 'أفعال التحويل', titleEn: 'Transformation', titleTl: 'Pagbabago', description: { ar: 'جَعَلَ، صَيَّرَ، اِتَّخَذَ.', en: 'Change of state.', tl: 'Pagbabago ng anyo o katayuan.' }, examples: ['جَعَلَ النَّجَّارُ الْخَشَبَ بَابًا', 'وَاتَّخَذَ اللَّهُ إِبْرَاهِيمَ خَلِيلًا'] },
    ],
    patterns: [
      { pattern: 'ظَنَّ + فاعل + مفعول١ (منصوب) + مفعول٢ (منصوب)', example: 'حَسِبَ الطَّالِبُ الْوَقْتَ طَوِيلًا', meaning: { ar: 'نصب المفعولين', en: 'Two Mansub objects', tl: 'Dalawang Mansub na layon' }, rule: { ar: 'أصلهما: الْوَقْتُ طَوِيلٌ', en: 'Underlying clause: الْوَقْتُ طَوِيلٌ', tl: 'Orihinal na sugnay: الْوَقْتُ طَوِيلٌ' } },
    ],
    examples: [{ arabic: 'جَعَلَ الْعِلْمُ الْعَالَمَ قَرْيَةً صَغِيرَةً', transliteration: 'ja\'ala al-\'ilmu al-\'ālama qaryatan ṣaghīratan', translation: { ar: 'فعل التحويل جَعَلَ', en: 'Knowledge made the world a small village', tl: 'Ginawa ng kaalaman ang mundo na isang maliit na nayon' }, analysis: { ar: 'الْعِلْمُ فاعل، الْعَالَمَ مفعول به أول، قَرْيَةً مفعول به ثانٍ، صَغِيرَةً نعت.', en: 'Two direct objects: الْعَالَمَ and قَرْيَةً.', tl: 'Dalawang tuwirang layon: الْعَالَمَ at قَرْيَةً.' } }],
    exceptions: [{ ar: 'تُفرق (جَعَلَ) الناصبة لمفعولين عن (جَعَلَ) من أخوات كاد بمعنى (بَدَأَ) التي خبرها مضارع (جَعَلَ يَكْتُبُ).', en: 'Distinguish transitive جَعَلَ (to turn X into Y) from inceptive جَعَلَ (began to: جَعَلَ يَكْتُبُ).', tl: 'Ipagkaiba ang جَعَلَ (ginawa) sa جَعَلَ (nagsimulang...).' }],
    commonMistakes: [{ ar: 'الخلط بين مفعولي ظنّ (أصلهما مبتدأ وخبر) ومفعولي أَعْطَى (ليس أصلهما مبتدأً وخبرًا، نحو أَعْطَيْتُكَ كِتَابًا).', en: 'Confusing Zanna’s two objects (which form a valid sentence) with أَعْطَى’s two objects (كَ and كِتَابًا do not form a sentence).', tl: 'Pagkakamali ng mga layon ng ظَنَّ at أَعْطَى.' }],
    comparison: { ar: 'كل النواسخ الثلاثة تعمل على المبتدأ والخبر: كان ترفع وتنصب، إنّ تنصب وترفع، وظنّ تنصبهما معًا.', en: 'All 3 Nawasikh transform Mubtada+Khabar: Kana (R/N), Inna (N/R), Zanna (N/N).', tl: 'Kana (R/N), Inna (N/R), Zanna (N/N).' },
    practicalExercises: [{ id: 'ex-n11-1', prompt: { ar: 'أدخل (عَلِمْتُ) على: الْحَقُّ مُنْتَصِرٌ.', en: 'Insert عَلِمْتُ before الْحَقُّ مُنْتَصِرٌ.', tl: 'Ilagay ang عَلِمْتُ bago ang الْحَقُّ مُنْتَصِرٌ.' }, arabicPrompt: 'الْحَقُّ مُنْتَصِرٌ', answer: 'عَلِمْتُ الْحَقَّ مُنْتَصِرًا', explanation: { ar: 'يُنصب المبتدأ مفعولًا أول والخبر مفعولًا ثانيًا.', en: 'Both become Mansub objects.', tl: 'Parehong naging Mansub na layon.' } }],
    summary: { ar: 'ظنَّ وأخواتها تُكمل منظومة النواسخ الثلاثة وتنصب ركني الجملة الاسمية معًا.', en: 'Zanna & Sisters complete the Nawasikh triad by putting both nominal pillars in Nasb.', tl: 'Kinukumpleto ng Zanna at mga kapatid nito ang tatlong Nawasikh.' },
    furtherReading: N_AQIL,
    meta: { status: 'verified', sources: N_AQIL },
  }),
];
