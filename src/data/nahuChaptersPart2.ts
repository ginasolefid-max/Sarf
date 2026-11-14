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

export const NAHU_CHAPTERS_PART2: TextbookChapter[] = [
  makeNahuChapter(12, 'nahu-12', 'beginner', 'الفاعل ونائب الفاعل (المرفوعات في الجملة الفعلية)', 'Active Subject (Fa\'il) & Deputy Subject (Na\'ib al-Fa\'il)', 'Ang Gumagawa (Fa\'il) at Panghalili (Na\'ib al-Fa\'il)', {
    objectives: [
      { ar: 'تمييز الفاعل بأنواعه (الظاهر، الضمير، المؤول) وأحكام تأنيث الفعل.', en: 'Identify overt, pronominal, and clausal Fa\'il plus verb gender agreement rules.', tl: 'Matukoy ang Fa\'il at ang kasarian ng pandiwa.' },
      { ar: 'فهم كيفية إنابة المفعول أو الجار والمجرور أو الظرف في نائب الفاعل.', en: 'Master Na\'ib al-Fa\'il promotion rules in passive clauses.', tl: 'Matutunan kung paano nabubuo ang Na\'ib al-Fa\'il sa passive.' },
    ],
    introduction: {
      ar: 'كل فعل مبني للمعلوم لا بد له من فاعل، وكل فعل مبني للمجهول لا بد له من نائب فاعل؛ وكلاهما مرفوع دائمًا ولا يتقدم الفاعل على فعله في الإعراب البصري.',
      en: 'Every active Arabic verb requires a Marfu\' Fa\'il, and every passive verb requires a Marfu\' Na\'ib al-Fa\'il; in Basran grammar, the subject never precedes its verb (if fronted, it becomes Mubtada!).',
      tl: 'Bawat aktibong pandiwa ay may Marfu\' Fa\'il, at bawat passive na pandiwa ay may Marfu\' Na\'ib al-Fa\'il.',
    },
    definition: { arabicTerm: 'الفاعل ونائب الفاعل', text: { ar: 'الفاعل اسم مرفوع تقدمه فعل تام مبني للمعلوم، ونائب الفاعل اسم مرفوع حلَّ محل الفاعل بعد حذفه مع فعل مبني للمجهول.', en: 'Fa\'il is the Marfu\' agent following an active verb; Na\'ib al-Fa\'il is the Marfu\' substitute promoted after omitting the agent in a passive verb.', tl: 'Ang Fa\'il ay ang gumagawa ng aktibong pandiwa; ang Na\'ib al-Fa\'il ay ang panghalili sa passive.' } },
    explanation: {
      ar: 'الفاعل يبقى فعله مفردًا دائمًا وإن كان الفاعل مثنى أو جمعًا (حَضَرَ الطَّالِبَانِ، حَضَرَ الطُّلَّابُ) — وهي قاعدة مهمة خلافًا للجملة الاسمية (الطَّالِبَانِ حَضَرَا). وتُلحق تاء التأنيث بالفعل وجوبًا إذا كان الفاعل مؤنثًا حقيقيًّا متصلًا أو ضميرًا مستترًا عائدًا على مؤنث (كَتَبَتْ فَاطِمَةُ). أما نائب الفاعل فينوب عن الفاعل المفعولُ به أولًا، فإن لم يوجد نابت عنه شبه الجملة (جُلِسَ عَلَى الْكُرْسِيِّ) أو المصدر المتصرف (سُيِرَ سَيْرٌ شَدِيدٌ).',
      en: 'Crucial Agreement Rule: When the verb precedes an overt dual/plural Fa\'il, the verb stays SINGULAR (كَتَبَ الطَّالِبَانِ, كَتَبَ الطُّلَّابُ)! Feminine تْ attaches obligatorily for an adjacent real feminine noun (ذَهَبَتْ هِنْدُ) or hidden feminine pronoun. For Na\'ib al-Fa\'il, first promote Maf\'ul Bihi; if intransitive, promote Shibh Jumla (جُلِسَ فِي الْمَجْلِسِ) or cognate Masdar.',
      tl: 'Mahalagang Tuntunin: Kapag nauna ang pandiwa sa hayag na dual/plural Fa\'il, nananatiling ISAHAN ang pandiwa (حَضَرَ الطَّالِبَانِ, حَضَرَ الطُّلَّابُ)!',
    },
    rules: [
      { ar: 'يلزم الفعلُ الإفرادَ إذا جاء الفاعلُ أو نائب الفاعل اسمًا ظاهرًا مثنًّى أو جمعًا.', en: 'VSO word order keeps the verb singular regardless of subject number.', tl: 'Sa VSO, nananatiling isahan ang pandiwa kahit maramihan ang simuno.' },
      { ar: 'إذا تقدم الفاعل على الفعل صار مبتدأً والجملة بعده خبرًا: الطُّلَّابُ كَتَبُوا الدَّرْسَ.', en: 'If the subject precedes the verb, it is Mubtada, and the verb takes plural pronoun suffix (الطُّلَّابُ كَتَبُوا).', tl: 'Kung mauuna ang simuno, ito ay Mubtada at nagiging maramihan ang pandiwa (الطُّلَّابُ كَتَبُوا).' },
    ],
    classifications: [
      { titleAr: 'صور الفاعل', titleEn: 'Forms of Fa\'il', titleTl: 'Mga Anyo ng Fa\'il', description: { ar: 'اسم ظاهر، ضمير بارز، ضمير مستتر، مصدر مؤول.', en: 'Overt noun, attached pronoun, hidden pronoun, Masdar Mu\'awwal.', tl: 'Hayag na pangngalan, panghalip, nakatago, o Masdar Mu\'awwal.' }, examples: ['قَامَ زَيْدٌ', 'قُمْتُ', 'يُسْعِدُنِي أَنْ تَنْجَحَ'] },
      { titleAr: 'ما ينوب عن الفاعل', titleEn: 'What Becomes Na\'ib al-Fa\'il', titleTl: 'Mga Maaaring Maging Na\'ib al-Fa\'il', description: { ar: 'المفعول به، الجار والمجرور، الظرف، المصدر.', en: 'Direct object, prepositional phrase, adverbial, or Masdar.', tl: 'Layon, pariralang pang-ukol, pang-abay, o Masdar.' }, examples: ['قُرِئَ الْكِتَابُ', 'نُظِرَ فِي الْأَمْرِ', 'صِيمَ رَمَضَانُ'] },
    ],
    patterns: [
      { pattern: 'فعل مفرد + فاعل مثنى/جمع', example: 'نَجَحَ الْمُجْتَهِدُونَ', meaning: { ar: 'إفراد الفعل مع الظاهر', en: 'Singular verb before plural overt subject', tl: 'Isahang pandiwa bago ang maramihang simuno' }, rule: { ar: 'الواو علامة رفع الفاعل في الْمُجْتَهِدُونَ، ولا نضع واوًا في الفعل', en: 'Do NOT write *نَجَحُوا الْمُجْتَهِدُونَ in standard Arabic', tl: 'Huwag lagyan ng وا ang pandiwa bago ang hayag na simuno' } },
    ],
    examples: [{ arabic: 'شُرِحَتِ الْمَسْأَلَةُ شَرْحًا وَاضِحًا', transliteration: 'shuriḥati al-mas\'alatu sharḥan wāḍiḥan', translation: { ar: 'نائب الفاعل المؤنث', en: 'The issue was explained clearly', tl: 'Naipaliwanag nang malinaw ang usapin' }, analysis: { ar: 'شُرِحَتْ فعل مجهول، الْمَسْأَلَةُ نائب فاعل مرفوع.', en: 'الْمَسْأَلَةُ is Na\'ib al-Fa\'il (Marfu\'); verb takes feminine تْ (vocalized kasra before الـ).', tl: 'Ang الْمَسْأَلَةُ ay Na\'ib al-Fa\'il (Marfu\').' } }],
    exceptions: [{ ar: 'يجوز تذكير الفعل وتأنيثه إذا كان الفاعل مؤنثًا مجازيًّا (طَلَعَ/طَلَعَتِ الشَّمْسُ) أو جمع تكسير (حَضَرَ/حَضَرَتِ الطُّلَّابُ) أو فُصل عن فعله بفاصل (حَضَرَ الْيَوْمَ فَاطِمَةُ).', en: 'Feminine verb marking is optional for figurative feminine nouns (الشَّمْسُ), broken plurals, or when separated from the verb.', tl: 'Opsyonal ang pambabaeng تْ sa di-literal na pambabae (الشَّمْسُ) o broken plural.' }],
    commonMistakes: [{ ar: 'إلحاق واو الجماعة أو ألف الاثنين بالفعل قبل الفاعل الظاهر (*حضروا الطلابُ) — وتسمى عند النحاة لغة "أكلوني البراغيث" ولا تُستعمل في الفصحى المعيارية.', en: 'Attaching plural وا/ا before an overt subject (*حَضَرُوا الطُّلَّابُ); standard prose keeps the verb singular.', tl: 'Pagkakamali ng *حَضَرُوا الطُّلَّابُ sa halip na حَضَرَ الطُّلَّابُ.' }],
    comparison: { ar: 'الفاعل يقع بعد فعل معلوم ويدل على مَن فعل؛ ونائب الفاعل يقع بعد فعل مجهول ويدل على مَن وقع عليه الفعل.', en: 'Fa\'il = agent of active verb; Na\'ib al-Fa\'il = patient/promoted element of passive verb.', tl: 'Fa\'il = gumawa sa aktibong pandiwa; Na\'ib al-Fa\'il = tumanggap sa passive.' },
    practicalExercises: [{ id: 'ex-n12-1', prompt: { ar: 'ابنِ الجملة للمجهول: كَافَأَ الْمُدِيرُ الْمُتَفَوِّقِينَ.', en: 'Convert to passive: كَافَأَ الْمُدِيرُ الْمُتَفَوِّقِينَ.', tl: 'Gawing passive: كَافَأَ الْمُدِيرُ الْمُتَفَوِّقِينَ.' }, arabicPrompt: 'كَافَأَ الْمُدِيرُ الْمُتَفَوِّقِينَ', answer: 'كُوفِئَ الْمُتَفَوِّقُونَ', explanation: { ar: 'قُلبت الألف واوًا في كُوفِئَ، ورُفع نائب الفاعل بالواو (الْمُتَفَوِّقُونَ).', en: 'Verb becomes كُوفِئَ; object promotes to Marfu\' الْمُتَفَوِّقُونَ.', tl: 'Naging كُوفِئَ ang pandiwa at naging Marfu\' ang الْمُتَفَوِّقُونَ.' } }],
    summary: { ar: 'الفاعل ونائب الفاعل هما عمدة الجملة الفعلية، ولكلٍّ منهما أحكام دقيقة في الرفع والمطابقة.', en: 'Fa\'il and Na\'ib al-Fa\'il anchor the verbal clause with strict VSO singular agreement.', tl: 'Ang Fa\'il at Na\'ib al-Fa\'il ang haligi ng pangungusap na pandiwa.' },
    furtherReading: N_AJRUMIYYA,
    meta: { status: 'verified', sources: N_AJRUMIYYA },
  }),

  makeNahuChapter(13, 'nahu-13', 'intermediate', 'المفعول به والمفعول المطلق والمفعول لأجله', 'Direct (Bihi), Cognate (Mutlaq) & Causative (li-Ajlihi) Objects', 'Maf\'ul Bihi, Maf\'ul Mutlaq at Maf\'ul li-Ajlihi', {
    objectives: [
      { ar: 'تمييز أنواع المفاعيل الثلاثة المنصوبة وإعرابها.', en: 'Distinguish Direct, Cognate, and Causative objects cleanly.', tl: 'Mapagkaiba ang Maf\'ul Bihi, Maf\'ul Mutlaq, at Maf\'ul li-Ajlihi.' },
    ],
    introduction: {
      ar: 'تبدأ باب المنصوبات بالمفاعيل، وأولها وأشهرها المفعول به، والمفعول المطلق المؤكِّد أو المبيِّن، والمفعول لأجله المعلِّل لسبب الفعل.',
      en: 'The Mansubat begin with the core accusative objects: Maf\'ul Bihi (patient), Maf\'ul Mutlaq (cognate verbal noun), and Maf\'ul li-Ajlihi (purpose/motive).',
      tl: 'Nagsisimula ang Mansubat sa tatlong layon: Bihi, Mutlaq, at li-Ajlihi.',
    },
    definition: { arabicTerm: 'المفاعيل الثلاثة', text: { ar: 'المفعول به من وقع عليه الفعل، والمفعول المطلق مصدر من لفظ الفعل لتوكيده أو بيان نوعه أو عدده، والمفعول لأجله مصدر قلبي يبين سبب الفعل.', en: 'Bihi receives the action; Mutlaq is a cognate Masdar emphasizing/specifying the verb; li-Ajlihi is a mental/emotional Masdar giving the reason.', tl: 'Bihi: tumatanggap ng kilos; Mutlaq: katugmang Masdar; li-Ajlihi: dahilan ng kilos.' } },
    explanation: {
      ar: '١- المفعول به: يقع بعد الفعل المتعدي، وقد يتقدم على الفاعل إذا دل دليل (ضَرَبَ الْكَسُولَ الْمُعَلِّمُ — أو قَرَأَ الْكِتَابَ زَيْدٌ) بل يجب تقديمه إذا اتصل بالفاعل ضمير يعود على المفعول (إِبْرَاهِيمَ رَبُّهُ) أو كان المفعول ضميرًا متصلًا والفاعل ظاهرًا (عَلَّمَنِي الْأُسْتَاذُ). ٢- المفعول المطلق: إما مؤكد للفعل (فَهِمْتُ فَهْمًا)، أو مبين للنوع (سِرْتُ سَيْرَ الْوَاثِقِ / دَرَسْتُ دِرَاسَةً جَادَّةً)، أو مبين للعدد (دُرْتُ دَوْرَتَيْنِ). وقد ينوب عنه (كُلّ، بَعْض، جِدًّا، سَرِيعًا، عَدَد، آلَة). ٣- المفعول لأجله: مصدر قلبي منصوب يُشترط فيه اتحاده مع الفعل في الزمن والفاعل (وَقَفْتُ احْتِرَامًا لِلْعَالِمِ) وإلا جُر باللام (جِئْتُ لِلْعِلْمِ).',
      en: '1. Maf\'ul Bihi: direct object; may precede Fa\'il (obligatory if it’s an attached pronoun + overt Fa\'il: أَكْرَمَنِي زَيْدٌ). 2. Maf\'ul Mutlaq: cognate Masdar for Emphasis (فَهِمْتُ فَهْمًا), Manner (قَرَأْتُ قِرَاءَةً جَيِّدَةً), or Count (ضَرَبْتُ ضَرْبَتَيْنِ); words like كُلَّ / جِدًّا / كَثِيرًا can act as Na\'ib \'an al-Maf\'ul al-Mutlaq! 3. Maf\'ul li-Ajlihi: inner motive Masdar sharing time & agent (قُمْتُ إِجْلَالًا لَهُ).',
      tl: '1. Bihi: tuwirang layon. 2. Mutlaq: Masdar ng parehong pandiwa para sa diin, paraan, o bilang (at maaaring palitan ng كُلَّ/كَثِيرًا). 3. li-Ajlihi: Masdar ng damdamin na nagpapaliwanag ng dahilan.',
    },
    rules: [
      { ar: 'ما ينوب عن المفعول المطلق مثل (أُحِبُّكَ كُلَّ الْحُبِّ / نَجَحْتُ كَثِيرًا / فَرِحْتُ جِدًّا) يُعرب نائبًا عن المفعول المطلق منصوبًا.', en: 'Quantifiers/adjectives replacing the cognate Masdar (كَثِيرًا، جِدًّا، كُلَّ الْـ...) parse as Na\'ib \'an al-Maf\'ul al-Mutlaq.', tl: 'Ang mga salitang tulad ng كَثِيرًا at جِدًّا na pumapalit sa Masdar ay Na\'ib \'an al-Maf\'ul al-Mutlaq.' },
    ],
    classifications: [
      { titleAr: 'أغراض المفعول المطلق', titleEn: 'Functions of Maf\'ul Mutlaq', titleTl: 'Gamit ng Maf\'ul Mutlaq', description: { ar: 'التوكيد، بيان النوع، بيان العدد.', en: 'Emphasis, Manner, Count.', tl: 'Diin, Paraan, Bilang.' }, examples: ['نَجَحْتُ نَجَاحًا (مؤكد)', 'وَقَفَ وُقُوفَ الْأَسَدِ (مبين للنوع)', 'سَجَدْتُ سَجْدَتَيْنِ (مبين للعدد)'] },
    ],
    patterns: [
      { pattern: 'فعل + مصدر قلبي منصوب', example: 'أَذْكُرُ اللَّهَ طَمَعًا فِي رَحْمَتِهِ', meaning: { ar: 'المفعول لأجله', en: 'Causative object', tl: 'Maf\'ul li-Ajlihi' }, rule: { ar: 'يجيب عن سؤال: لِمَاذَا؟', en: 'Answers "Why?" using a feeling/thought Masdar', tl: 'Sumasagot sa tanong na "Bakit?"' } },
    ],
    examples: [{ arabic: 'اِجْتَهَدَ الطَّالِبُ اجْتِهَادًا عَظِيمًا رَغْبَةً فِي النَّجَاحِ', transliteration: 'ijtahada aṭ-ṭālibu ijtihādan \'aẓīman raghbatan fī an-najāḥi', translation: { ar: 'اجتماع المفعول المطلق والمفعول لأجله', en: 'The student strove with great effort out of desire for success', tl: 'Nagsumikap ang mag-aaral nang matindi dahil sa hangaring magtagumpay' }, analysis: { ar: 'اجْتِهَادًا مفعول مطلق مبين للنوع، ورَغْبَةً مفعول لأجله منصوب.', en: 'اجْتِهَادًا = Maf\'ul Mutlaq; رَغْبَةً = Maf\'ul li-Ajlihi.', tl: 'اجْتِهَادًا = Maf\'ul Mutlaq; رَغْبَةً = Maf\'ul li-Ajlihi.' } }],
    exceptions: [{ ar: 'إذا فَقَدَ المفعول لأجله شرط المصدرية القلبية أو اتحاد الزمن وَجَبَ جَرُّه بحرف التعليل مثل (سَافَرْتُ لِلطِّبِّ).', en: 'Non-emotional nouns or different timeframes require a preposition (سَافَرْتُ لِلْعِلْمِ) rather than accusative li-Ajlihi.', tl: 'Kung hindi pandamdaming Masdar, gumamit ng pang-ukol na لِـ.' }],
    commonMistakes: [{ ar: 'إعراب (سَافَرْتُ لِلْعِلْمِ) مفعولًا لأجله؛ والصواب جار ومجرور متعلق بالفعل، أما المفعول لأجله فيكون منصوبًا غير مجرور.', en: 'Calling لِلْعِلْمِ a Maf\'ul li-Ajlihi; it is simply Jarr & Majrur (Maf\'ul li-Ajlihi is Mansub!).', tl: 'Ang لِلْعِلْمِ ay pang-ukol + pangngalan; ang Maf\'ul li-Ajlihi ay dapat Mansub.' }],
    comparison: { ar: 'المفعول المطلق يشتمل على حروف الفعل نفسه، بينما المفعول لأجله مصدر من غير لفظ الفعل يبين علته.', en: 'Mutlaq shares the verb’s root; li-Ajlihi uses a distinct mental Masdar to explain motivation.', tl: 'Ang Mutlaq ay mula sa parehong ugat ng pandiwa; ang li-Ajlihi ay ibang Masdar na nagpapaliwanag ng dahilan.' },
    practicalExercises: [{ id: 'ex-n13-1', prompt: { ar: 'أعرب (جِدًّا) في: أُحِبُّ الْعَرَبِيَّةَ جِدًّا.', en: 'Parse جِدًّا in أُحِبُّ الْعَرَبِيَّةَ جِدًّا.', tl: 'Suriin ang جِدًّا sa أُحِبُّ الْعَرَبِيَّةَ جِدًّا.' }, arabicPrompt: 'أُحِبُّ الْعَرَبِيَّةَ جِدًّا', answer: 'نائب عن المفعول المطلق منصوب وعلامة نصبه الفتحة', explanation: { ar: 'أصلها أُحِبُّها حُبًّا جِدًّا ثم حُذف المصدر ونابت صفته.', en: 'Adjective/modifier substituting for the omitted cognate Masdar.', tl: 'Pumapalit sa tinanggal na Maf\'ul Mutlaq.' } }],
    summary: { ar: 'المفعول به والمطلق ولأجله تشكل قلب المنصوبات المرتبطة بالفعل.', en: 'Direct, Cognate, and Causative objects convey patient, intensity/manner, and motive in Nasb.', tl: 'Ang tatlong layon ay nagpapahayag ng tumatanggap, paraan/diin, at dahilan.' },
    furtherReading: N_AJRUMIYYA,
    meta: { status: 'verified', sources: N_AJRUMIYYA },
  }),

  makeNahuChapter(14, 'nahu-14', 'intermediate', 'المفعول فيه (الظرف) والمفعول معه', 'Adverbials of Time/Place (Maf\'ul Fihi) & Accompaniment (Maf\'ul Ma\'ahu)', 'Maf\'ul Fihi (Pang-abay) at Maf\'ul Ma\'ahu (Kasama)', {
    objectives: [
      { ar: 'تمييز ظرف الزمان والمكان المتصرف وغير المتصرف.', en: 'Distinguish Zarf Zaman & Makan (declinable vs strictly adverbial).', tl: 'Mapagkaiba ang Zarf Zaman at Zarf Makan.' },
      { ar: 'التفريق بين واو المعية (في المفعول معه) وواو العطف.', en: 'Distinguish Waw al-Ma\'iyyah (governing Nasb) from Waw al-\'Atf.', tl: 'Mapagkaiba ang Waw al-Ma\'iyyah sa Waw ng pag-uugnay.' },
    ],
    introduction: {
      ar: 'يُكمل هذا الفصل المفاعيل الخمسة ببيان المفعول فيه الدال على زمان الفعل أو مكانه بمعنى (فِي)، والمفعول معه الواقع بعد واو بمعنى (مَعَ).',
      en: 'Rounding out the Five Objects: Maf\'ul Fihi (time/place adverbial carrying implied "in/at") and Maf\'ul Ma\'ahu (noun in Nasb after "with"-Waw).',
      tl: 'Kinukumpleto nito ang Limang Layon: Maf\'ul Fihi (panahon/lugar) at Maf\'ul Ma\'ahu (kasama pagkatapos ng وَ).',
    },
    definition: { arabicTerm: 'المفعول فيه والمفعول معه', text: { ar: 'المفعول فيه اسم منصوب يذكر لبيان زمان الفعل أو مكانه بتقدير (فِي)، والمفعول معه اسم منصوب بعد واو بمعنى (مَعَ) مسبوقة بجملة.', en: 'Fihi is an accusative noun denoting time/place with implied فِي; Ma\'ahu follows Waw meaning "alongside/with" after a clause.', tl: 'Fihi: panahon/lugar na may kahulugang "sa"; Ma\'ahu: pangngalang Mansub pagkatapos ng وَ na may kahulugang "kasabay".' } },
    explanation: {
      ar: '١- المفعول فيه: ينقسم إلى ظرف زمان (يَوْم، لَيْلَة، صَبَاحًا، مَسَاءً، أَبَدًا، قَطُّ، أَمْسِ) وظرف مكان (أَمَامَ، خَلْفَ، فَوْقَ، تَحْتَ، عِنْدَ، بَيْنَ، يَمِينَ). ويشترط فيه تضمن معنى (فِي)؛ فإن جاء اسم المكان/الزمان غير متضمن معنى (فِي) أُعرب حسب موقعه كالفاعل والمبتدأ (يَوْمُ الْجُمُعَةِ مُبَارَكٌ ← مبتدأ!). ٢- المفعول معه: يأتي بعد واو تدل على المصاحبة دون اشتراك في الفعل: سِرْتُ وَالنِّيلَ (فالنيل لا يسير!).',
      en: '1. Maf\'ul Fihi: requires implied "in/at" — if يَوْم appears as subject (يَوْمُ الْجُمُعَةِ جَمِيلٌ), it is NOT a Zarf, it is Mubtada! Some Zarfs are Mabni (أَمْسِ on Kasra, الْآنَ on Fatha, حَيْثُ on Damma, قَطُّ on Damma). 2. Maf\'ul Ma\'ahu: follows Waw al-Ma\'iyyah when sharing the verb is impossible or unintended (سِرْتُ وَالشَّاطِئَ — I walked alongside the shore).',
      tl: '1. Maf\'ul Fihi: dapat may kahulugang "sa loob ng/tuwing". Kung ginamit na simuno (يَوْمُ الْجُمُعَةِ), ito ay Mubtada! 2. Maf\'ul Ma\'ahu: kasunod ng وَ ("kasabay ng") kung saan hindi gumagawa ng kilos ang pangngalan.',
    },
    rules: [
      { ar: 'أسماء المكان المختصة المحدودة مثل (الْمَدْرَسَة، الْمَسْجِد، الدَّار) لا تُنصب على الظرفية إلا بعد حروف الجر (ذَهَبْتُ إِلَى الْمَدْرَسَةِ، لا *ذَهَبْتُ الْمَدْرَسَةَ).', en: 'Bounded places (الْمَدْرَسَة، الْبَيْت) require a preposition (إِلَى / فِي) and cannot be bare accusative Zarf Makan!', tl: 'Ang mga tiyak na lugar (الْمَدْرَسَة) ay nangangailangan ng pang-ukol (إِلَى/فِي) at hindi maaaring gawing Zarf nang mag-isa.' },
    ],
    classifications: [
      { titleAr: 'الظرف المتصرف vs غير المتصرف', titleEn: 'Declinable vs Strictly Adverbial Zarf', titleTl: 'Metasarrif vs Di-Metasarrif na Zarf', description: { ar: 'المتصرف يُعرب ظرفًا أو غيره (يَوْم، شَهْر)؛ غير المتصرف يلزم الظرفية أو الجر بـ(مِنْ) مثل (قَبْلَ، بَعْدَ، عِنْدَ، فَوْقَ).', en: 'يَوْم can be subject or Zarf; عِنْدَ/فَوْقَ/قَبْلَ are only Zarf or after مِنْ.', tl: 'Ang يَوْم ay maaaring simuno o Zarf; ang عِنْدَ/فَوْقَ ay laging Zarf o pagkatapos ng مِنْ.' }, examples: ['سَافَرْتُ يَوْمَ الْخَمِيسِ', 'الْكِتَابُ فَوْقَ الْمَكْتَبِ'] },
    ],
    patterns: [
      { pattern: 'جملة + وَ + اسم منصوب (معية)', example: 'اِسْتَيْقَظَ الطَّالِبُ وَطُلُوعَ الْفَجْرِ', meaning: { ar: 'المفعول معه', en: 'The student woke up with dawn’s breaking', tl: 'Nagising ang mag-aaral kasabay ng pagsikat ng bukang-liwayway' }, rule: { ar: 'الواو للمعية وطُلُوعَ مفعول معه منصوب', en: 'Dawn did not wake up, so Waw = "alongside"', tl: 'Hindi gumising ang bukang-liwayway, kaya ito ay Maf\'ul Ma\'ahu' } },
    ],
    examples: [{ arabic: 'جَلَسْتُ أَمَامَ الشَّيْخِ صَبَاحًا وَتَحْتَ السَّقْفِ', transliteration: 'jalastu amāma ash-shaykhi ṣabāḥan wa taḥta as-saqfi', translation: { ar: 'ظرفا المكان والزمان', en: 'I sat in front of the shaykh in the morning under the roof', tl: 'Umupo ako sa harap ng guro sa umaga sa ilalim ng bubong' }, analysis: { ar: 'أَمَامَ وتَحْتَ ظرفا مكان منصوبان، وصَبَاحًا ظرف زمان منصوب.', en: 'أَمَامَ & تَحْتَ = Zarf Makan; صَبَاحًا = Zarf Zaman.', tl: 'أَمَامَ at تَحْتَ = Zarf Makan; صَبَاحًا = Zarf Zaman.' } }],
    exceptions: [{ ar: 'يُبنى (قَبْلُ) و(بَعْدُ) على الضم إذا قُطعا عن الإضافة لفظًا ونُوي معناهما (لِلَّهِ الْأَمْرُ مِنْ قَبْلُ وَمِنْ بَعْدُ).', en: 'قَبْلُ and بَعْدُ become Mabni on Damma when their Mudaf Ilayh is omitted with implied meaning (مِنْ قَبْلُ وَمِنْ بَعْدُ).', tl: 'Ang قَبْلُ at بَعْدُ ay nakapirmi sa Damma kapag tinanggal ang Mudaf Ilayh.' }],
    commonMistakes: [{ ar: 'إعراب الاسم بعد الظرف نعتًا أو مفعولًا به؛ الصواب أن الاسم الواقع بعد (أمام، خلف، فوق، تحت، عند، بين) يُعرب مضافًا إليه مجرورًا دائمًا!', en: 'Forgetting that the noun immediately after Zarf (فَوْقَ الطَّاوِلَةِ) is ALWAYS Mudaf Ilayh (Majrur)!', tl: 'Ang pangngalan pagkatapos ng Zarf (فَوْقَ الطَّاوِلَةِ) ay palaging Mudaf Ilayh (Majrur).' }],
    comparison: { ar: 'إذا صح مشاركة ما بعد الواو لما قبلها في الفعل جاز العطف (حَضَرَ مُحَمَّدٌ وَخَالِدٌ) وإذا امتنع وجب النصب على المعية (مَشَيْتُ وَالْجَبَلَ).', en: 'If both nouns share the action, use Conjunction (\'Atf); if only one acts alongside the other, use Ma\'iyyah (Nasb).', tl: 'Kung parehong gumagawa ng kilos, gumamit ng \'Atf; kung hindi, gumamit ng Maf\'ul Ma\'ahu (Mansub).' },
    practicalExercises: [{ id: 'ex-n14-1', prompt: { ar: 'أعرب (أَمْسِ) و(الْيَوْمَ) في: ذَهَبْتُ أَمْسِ وَسَأَعُودُ الْيَوْمَ.', en: 'Parse أَمْسِ and الْيَوْمَ in ذَهَبْتُ أَمْسِ وَسَأَعُودُ الْيَوْمَ.', tl: 'Suriin ang أَمْسِ at الْيَوْمَ.' }, arabicPrompt: 'ذَهَبْتُ أَمْسِ وَسَأَعُودُ الْيَوْمَ', answer: 'أَمْسِ: ظرف زمان مبني على الكسر في محل نصب — الْيَوْمَ: ظرف زمان منصوب بالفتحة', explanation: { ar: 'أَمْسِ مبني على الكسر، بينما الْيَوْمَ معرب منصوب.', en: 'أَمْسِ is Mabni on Kasra; الْيَوْمَ is Mu\'rab Mansub.', tl: 'Ang أَمْسِ ay Mabni sa Kasra; ang الْيَوْمَ ay Mansub.' } }],
    summary: { ar: 'المفعول فيه والمفعول معه يكملان المفاعيل الخمسة ويوضحان زمان الفعل ومكانه ومصاحبه.', en: 'Maf\'ul Fihi and Maf\'ul Ma\'ahu complete the 5 Arabic accusative objects.', tl: 'Kinukumpleto ng Maf\'ul Fihi at Maf\'ul Ma\'ahu ang 5 layon sa wikang Arabe.' },
    furtherReading: N_AJRUMIYYA,
    meta: { status: 'verified', sources: N_AJRUMIYYA },
  }),

  makeNahuChapter(15, 'nahu-15', 'intermediate', 'الحال والتمييز والفرق بينهما', 'Circumstantial Expression (Hal) & Specification (Tamyiz)', 'Kalagayan (Hal) at Paglilinaw (Tamyiz)', {
    objectives: [
      { ar: 'تحديد الحال وصاحب الحال وأنواع الحال (مفرد، جملة، شبه جملة).', en: 'Identify Hal, Sahib al-Hal, and all 3 Hal forms (word, clause, Shibh Jumla).', tl: 'Matukoy ang Hal, Sahib al-Hal, at ang 3 anyo ng Hal.' },
      { ar: 'تمييز تمييز الذات (الملفوظ) وتمييز النسبة (الملحوظ) وحكمهما.', en: 'Master Tamyiz of weight/measure/number vs Tamyiz of relation/comparison.', tl: 'Matutunan ang Tamyiz ng sukat/bilang at Tamyiz ng relasyon.' },
    ],
    introduction: {
      ar: 'الحال والتمييز اسمان نكرتان منصوبان في الأصل؛ فالحال يبيّن هيئة صاحبه عند وقوع الفعل، والتمييز يزيل إبهام اسم مفرد أو نسبة في الجملة.',
      en: 'Both Hal and Tamyiz are normally indefinite Mansub nouns: Hal describes the condition/state of a definite participant during an action, whereas Tamyiz clarifies an ambiguous measure or relation.',
      tl: 'Parehong di-tiyak at Mansub ang Hal at Tamyiz: inilalarawan ng Hal ang kalagayan; nililinaw ng Tamyiz ang dami o relasyon.',
    },
    definition: { arabicTerm: 'الحال والتمييز', text: { ar: 'الحال وصف فضلة نكرة منصوب يبيّن هيئة صاحبه المعرفة غالبًا، والتمييز اسم نكرة جامد يفسّر مبهمًا من ذات أو نسبة.', en: 'Hal is a derived indefinite Mansub state-descriptor; Tamyiz is a primitive indefinite Mansub noun resolving ambiguity of quantity or relation.', tl: 'Hal: naglalarawan ng kondisyon; Tamyiz: nagbibigay-linaw sa malabong sukat o ugnayan.' } },
    explanation: {
      ar: '١- الحال: يكون نكرةً مشتقةً، وصاحبه معرفةً (جَاءَ الطَّالِبُ مُبْتَسِمًا). وتقع الحال جملةً بشرط الرابط (الواو أو الضمير أو كليهما: خَرَجْتُ وَالشَّمْسُ طَالِعَةٌ) أو شبه جملة (رَأَيْتُ الْعُصْفُورَ فَوْقَ الشَّجَرَةِ). القاعدة المشهورة: "الجمل بعد المعارف أحوال، وبعد النكرات صفات". ٢- التمييز: نوعان — تمييز ملفوظ بعد الوزن والكيل والمساحة والعدد (اِشْتَرَيْتُ رِطْلًا عَسَلًا، قَرَأْتُ عِشْرِينَ كِتَابًا)، وتمييز ملحوظ محول عن الفاعل أو المفعول أو المبتدأ بعد أفعال الزيادة والتفضيل (اِزْدَادَ الطَّالِبُ عِلْمًا، أَنَا أَكْثَرُ مِنْكَ مَالًا).',
      en: '1. Hal: derived adjective (مُسْرِعًا, ضَاحِكًا) describing a definite noun. Clausal Hal connects via Waw al-Hal, a pronoun, or both (دَخَلْتُ وَأَنَا فَرِحٌ). Golden Rule: "Clauses after definites are Hal; after indefinites are Na\'t." 2. Tamyiz: Explicit (after weights, measures, numbers 11–99: عِشْرُونَ طَالِبًا) or Implicit (after comparatives and verbs of increase/fullness: طَابَ مُحَمَّدٌ نَفْسًا, اِمْتَلَأَ الْكُوبُ مَاءً).',
      tl: '1. Hal: naglalarawan sa tiyak na pangngalan. Gintong Tuntunin: "Ang sugnay pagkatapos ng tiyak ay Hal; pagkatapos ng di-tiyak ay Na\'t." 2. Tamyiz: pagkatapos ng sukat/bilang (عِشْرُونَ كِتَابًا) o pahambing (أَكْثَرُ عِلْمًا).',
    },
    rules: [
      { ar: 'الجمل وأشباه الجمل بعد المعارف أحوال، وبعد النكرات المحضة نعوت.', en: 'Clauses after definite nouns = Hal (local Nasb); after pure indefinites = Na\'t (matches antecedent).', tl: 'Sugnay pagkatapos ng tiyak = Hal; pagkatapos ng di-tiyak = Na\'t.' },
      { ar: 'اسم التفضيل (أَكْثَرُ، أَفْضَلُ، أَشَدُّ) الاسم النكرة المنصوب بعده الذي لا يصح جعله خبرًا يُعرب تمييزًا منصوبًا.', en: 'An indefinite Mansub noun clarifying a comparative (أَكْثَرُ مَالًا, أَحْسَنُ خُلُقًا) is Tamyiz.', tl: 'Ang di-tiyak at Mansub na pangngalan pagkatapos ng أَفْضَلُ/أَكْثَرُ ay Tamyiz.' },
    ],
    classifications: [
      { titleAr: 'أنواع الحال', titleEn: 'Types of Hal', titleTl: 'Mga Uri ng Hal', description: { ar: 'مفرد، جملة اسمية/فعلية، شبه جملة.', en: 'Single word, clause, prepositional/adverbial.', tl: 'Isang salita, sugnay, pariralang pang-ukol.' }, examples: ['عَادَ الْجَيْشُ مُنْتَصِرًا', 'دَخَلَ وَهُوَ يَبْتَسِمُ'] },
      { titleAr: 'أنواع التمييز', titleEn: 'Types of Tamyiz', titleTl: 'Mga Uri ng Tamyiz', description: { ar: 'ملفوظ (مقدار/عدد) وملحوظ (نسبة).', en: 'Explicit (measure/number) & Implicit (relation).', tl: 'Hayag (sukat/bilang) at di-hayag (relasyon).' }, examples: ['مِتْرٌ حَرِيرًا', 'خَمْسَةَ عَشَرَ قَلَمًا', 'زَادَ الْمَاءُ عُمْقًا'] },
    ],
    patterns: [
      { pattern: 'فعل + معرفة + نكرة مشتقة منصوبة', example: 'رَجَعَ مُحَمَّدٌ مَسْرُورًا', meaning: { ar: 'الحال المفردة', en: 'Single-word Hal', tl: 'Isahang Hal' }, rule: { ar: 'تُجيب عن سؤال: كَيْفَ؟', en: 'Answers "How / in what state?"', tl: 'Sumasagot sa tanong na "Paano / sa anong kalagayan?"' } },
    ],
    examples: [{ arabic: 'طَابَ الطَّالِبُ نَفْسًا حِينَ حَضَرَ الدَّرْسَ مُنْتَبِهًا', transliteration: 'ṭāba aṭ-ṭālibu nafsan ḥīna ḥaḍara ad-darsa muntabihan', translation: { ar: 'اجتماع التمييز والحال', en: 'The student felt at ease in soul when he attended the lesson attentively', tl: 'Naging panatag ang kalooban ng mag-aaral nang dumalo siya nang may pag-iingat' }, analysis: { ar: 'نَفْسًا تمييز نسبة ملحوظ، ومُنْتَبِهًا حال مفردة من فاعل حَضَرَ.', en: 'نَفْسًا = Tamyiz (not describing how he appeared, but specifying what felt good); مُنْتَبِهًا = Hal.', tl: 'نَفْسًا = Tamyiz; مُنْتَبِهًا = Hal.' } }],
    exceptions: [{ ar: 'يجوز جر تمييز الوزن والكيل والمساحة بالإضافة أو بـ(مِنْ): رِطْلُ عَسَلٍ / رِطْلٌ مِنْ عَسَلٍ.', en: 'Explicit measure Tamyiz may alternatively appear in Jarr via Idafa or مِنْ (كُوبُ مَاءٍ).', tl: 'Maaari ring gawing Majrur ang sukat na Tamyiz gamit ang Idafa o مِنْ.' }],
    commonMistakes: [{ ar: 'نصب المفعول به الثاني لظنّ وإعرابه حالًا، أو الخلط بين النعت المنصوب والحال (الحال نكرة لصاحب معرفة، أما النعت فيطابق منعوته تعريفًا وتنكيرًا!).', en: 'Confusing a Mansub Na\'t (which matches a Mansub definite/indefinite noun) with Hal (which is ALWAYS indefinite for a definite owner).', tl: 'Pagkakamali ng Mansub Na\'t at Hal.' }],
    comparison: { ar: 'الحال مشتقة غالبًا وتُجيب عن (كَيْفَ) وتتعدد، بينما التمييز جامد غالبًا ويُجيب عن (مَاذَا من جهة البيان) ولا يتعدد بغير عطف.', en: 'Hal is derived, answers "How?", and can stack; Tamyiz is primitive, answers "In respect to what?", and resolves ambiguity.', tl: 'Hal: sagot sa "Paano?"; Tamyiz: sagot sa "Sa anong aspeto?".' },
    practicalExercises: [{ id: 'ex-n15-1', prompt: { ar: 'بيّن الموقع الإعرابي لجملة (يَجْتَهِدُ) في: رَأَيْتُ طَالِبًا يَجْتَهِدُ vs رَأَيْتُ الطَّالِبَ يَجْتَهِدُ.', en: 'Compare يَجْتَهِدُ after indefinite طَالِبًا vs definite الطَّالِبَ.', tl: 'Ihambing ang يَجْتَهِدُ pagkatapos ng طَالِبًا vs الطَّالِبَ.' }, arabicPrompt: 'رَأَيْتُ طَالِبًا يَجْتَهِدُ / الطَّالِبَ يَجْتَهِدُ', answer: 'الأولى في محل نصب نعت — الثانية في محل نصب حال', explanation: { ar: 'بعد النكرة نعت، وبعد المعرفة حال.', en: 'Clause after indefinite = Na\'t; after definite = Hal.', tl: 'Pagkatapos ng di-tiyak = Na\'t; pagkatapos ng tiyak = Hal.' } }],
    summary: { ar: 'التمييز الدقيق بين الحال والنعت والتمييز يمنح الطالب قدرة عالية على تحليل المنصوبات.', en: 'Differentiating Hal, Na\'t, and Tamyiz sharpens syntactic precision across complex Arabic prose.', tl: 'Ang pag-iiba sa Hal, Na\'t, at Tamyiz ay nagpapalinaw sa pagsusuri ng pangungusap.' },
    furtherReading: N_AQIL,
    meta: { status: 'verified', sources: N_AQIL },
  }),

  makeNahuChapter(16, 'nahu-16', 'advanced', 'الاستثناء والمنادى وأحكامهما', 'Exception (Istithna\') & Vocative (Munada) Constructions', 'Pagbubukod (Istithna\') at Pagtawag (Munada)', {
    objectives: [
      { ar: 'إعراب المستثنى بعد (إِلَّا) في أحواله الثلاث: التام المثبت، التام المنفي، الناقص المنفي.', en: 'Master the 3 Mustathna states after إِلَّا, plus غَيْر/سِوَى and خَلَا/عَدَا.', tl: 'Maisaulo ang 3 kalagayan pagkatapos ng إِلَّا at ang غَيْر/سِوَى.' },
      { ar: 'ضبط أنواع المنادى الخمسة: المعرب المنصوب (٣) والمبني على ما يُرفع به (٢).', en: 'Master the 5 Munada types (3 Mansub vs 2 Mabni on Raf\' marker).', tl: 'Matutunan ang 5 uri ng Munada (3 Mansub at 2 Mabni).' },
    ],
    introduction: {
      ar: 'الاستثناء والمنادى من أهم المنصوبات، غير أن لكلٍّ منهما حالاتٍ يُبنى فيها أو يتبع ما قبله أو يُجر بالإضافة.',
      en: 'Exception and Vocative belong to the Mansubat family, each exhibiting special rules for negation, apposition, and Mabni vocatives.',
      tl: 'Ang Istithna\' at Munada ay kabilang sa Mansubat na may mga tiyak na eksepsiyon.',
    },
    definition: { arabicTerm: 'الاستثناء والنداء', text: { ar: 'الاستثناء إخراج ما بعد الأداة من حكم ما قبلها، والنداء طلب إقبال المخاطَب بحرف من أحرف النداء (يَا، أَيَا، هَيَا، أَيْ، الهمزة).', en: 'Istithna\' excludes an item via إِلَّا/غَيْر/سِوَى; Nida\' summons an addressee via يَا or its sisters.', tl: 'Istithna\': pagbubukod gamit ang إِلَّا/غَيْر; Nida\': pagtawag gamit ang يَا.' } },
    explanation: {
      ar: '١- المستثنى بـ(إِلَّا): (أ) التام المثبت: واجب النصب (حَضَرَ الطُّلَّابُ إِلَّا خَالِدًا). (ب) التام المنفي: يجوز النصب على الاستثناء أو الإتباع على البدلية (مَا حَضَرَ الطُّلَّابُ إِلَّا خَالِدًا / خَالِدٌ). (ج) الناقص المنفي (المفرّغ): تُلغى إِلَّا ويُعرب ما بعدها حسب موقعه (مَا نَجَحَ إِلَّا الْمُجْتَهِدُ ← فاعل!). وما بعد (غَيْر / سِوَى) مجرور بالإضافة دائمًا وتأخذ غَيْر/سِوَى حكم الاسم بعد إِلَّا. ٢- المنادى: يُنصب إذا كان مضافًا (يَا طَالِبَ الْعِلْمِ)، أو شبيهًا بالمضاف (يَا طَالِعًا جَبَلًا)، أو نكرةً غير مقصودة (يَا غَافِلًا تَنَبَّهْ). ويُبنى على ما يُرفع به في محل نصب إذا كان علمًا مفردًا (يَا مُحَمَّدُ، يَا زَيْدَانِ) أو نكرةً مقصودةً (يَا طَالِبُ). ولنداء المعرف بـ(أل) نأتي بـ(أَيُّهَا / أَيَّتُهَا): يَا أَيُّهَا النَّاسُ.',
      en: '1. Mustathna with إِلَّا: (A) Complete Affirmative → obligatory Nasb (إِلَّا خَالِدًا). (B) Complete Negative → Nasb OR Badal matching antecedent (إِلَّا خَالِدًا / خَالِدٌ). (C) Incomplete Negative (Mufarragh) → ignore إِلَّا and parse normally (مَا قَالَ إِلَّا الْحَقَّ = Maf\'ul Bihi). With غَيْر/سِوَى, the following noun is ALWAYS Mudaf Ilayh (Jarr), while غَيْر itself takes the Mustathna case! 2. Munada: Mansub if Mudaf (يَا عَبْدَ اللَّهِ), Shabih (يَا كَرِيمًا خُلُقُهُ), or Unintended Indefinite (يَا رَجُلًا); Mabni on its Raf\' marker if Proper Name (يَا مُحَمَّدُ) or Intended Indefinite (يَا طَالِبُ). Use يَا أَيُّهَا/أَيَّتُهَا before الـ-nouns.',
      tl: '1. Istithna\' sa إِلَّا: (A) Buo at Positibo → laging Mansub; (B) Buo at Negatibo → Mansub o Badal; (C) Kulang at Negatibo → normal na I\'rab. Sa غَيْر/سِوَى, laging Majrur ang kasunod. 2. Munada: Mansub (Mudaf, Shabih, Di-tiyak) o Mabni sa marka ng Raf\' (Pangngalang Pantangi, Tiyak).',
    },
    rules: [
      { ar: 'لمعرفة إعراب المستثنى المفرّغ: احذف أداة النفي وأداة الاستثناء واقرأ الجملة، فما صح به الإعراب هو إعراب ما بعد إِلَّا.', en: 'Quick test for Mufarragh: cover the negation and إِلَّا — parse what remains!', tl: 'Para sa Mufarragh, alisin lamang ang pananggi at ang إِلَّا upang makita ang tamang I\'rab.' },
      { ar: 'ترخيم (اللَّهُمَّ): أصله يَا اللَّهُ حُذفت ياء النداء وعُوِّض عنها ميم مشددة في آخره.', en: 'اللَّهُمَّ stands for يَا اللَّهُ with يَا replaced by final ـمَّ.', tl: 'Ang اللَّهُمَّ ay mula sa يَا اللَّهُ.' },
    ],
    classifications: [
      { titleAr: 'المستثنى بـ(غَيْر / سِوَى)', titleEn: 'Exception via Ghayr / Siwa', titleTl: 'Ghayr at Siwa', description: { ar: 'تأخذان إعراب المستثنى وما بعدهما مضاف إليه.', en: 'Ghayr/Siwa carry the case; following noun is Majrur.', tl: 'Ang Ghayr/Siwa ang tumatanggap ng kaso; ang kasunod ay Majrur.' }, examples: ['حَضَرُوا غَيْرَ زَيْدٍ', 'مَا حَضَرَ غَيْرُ زَيْدٍ'] },
      { titleAr: 'المنادى المعرب والمبني', titleEn: 'Mansub vs Mabni Munada', titleTl: 'Mansub vs Mabni Munada', description: { ar: 'المضاف والمنوّن منصوب، والمفرد العلم والنكرة المقصودة مبني.', en: 'Mudaf/Shabih/Non-specific = Mansub; Proper/Specific = Mabni.', tl: 'Mudaf/Shabih = Mansub; Pangngalang Pantangi/Tiyak = Mabni.' }, examples: ['يَا رَسُولَ اللَّهِ', 'يَا أَحْمَدُ', 'يَا مُسْلِمُونَ'] },
    ],
    patterns: [
      { pattern: 'يَا + أَيُّهَا + اسم بأل (مرفوع)', example: 'يَا أَيُّهَا الطَّالِبُ', meaning: { ar: 'نداء المعرف بأل', en: 'Calling a definite الـ-noun', tl: 'Pagtawag sa may الـ' }, rule: { ar: 'أَيُّ منادى مبني على الضم، والهاء للتنبيه، والطَّالِبُ نعت مرفوع (أو بدل)', en: 'أَيُّ is Mabni on Damma; الطَّالِبُ is Marfu\' Na\'t/Badal', tl: 'أَيُّ ay Mabni sa Damma; الطَّالِبُ ay Marfu\'' } },
    ],
    examples: [{ arabic: 'مَا جَاءَ إِلَّا عَمْرٌو وَيَا طَالِبَ الْعِلْمِ اجْتَهِدْ', transliteration: 'mā jā\'a illā \'amrun wa yā ṭāliba al-\'ilmi ijtahid', translation: { ar: 'استثناء مفرغ ومنادى مضاف', en: 'None came except \'Amr; and O seeker of knowledge, strive!', tl: 'Walang dumating kundi si \'Amr; at O naghahanap ng kaalaman, magsumikap ka!' }, analysis: { ar: 'عَمْرٌو فاعل مرفوع لأن الكلام ناقص منفي، وطَالِبَ منادى مضاف منصوب.', en: '\'Amrun = Fa\'il (Mufarragh); طَالِبَ = Mudaf Munada (Mansub).', tl: 'عَمْرٌو = Fa\'il; طَالِبَ = Mansub Munada.' } }],
    exceptions: [{ ar: 'بعد (خَلَا / عَدَا / حَاشَا) يجوز جرّ المستثنى (على الحرفية) أو نصبه (على الفعلية)، وإذا سبقتها (مَا) وجب النصب (مَا خَلَا زَيْدًا).', en: 'خَلَا / عَدَا / حَاشَا allow either Jarr or Nasb; when preceded by مَا (مَا خَلَا), ONLY Nasb is permitted.', tl: 'Ang خَلَا/عَدَا ay maaaring Jarr o Nasb; kung may مَا (مَا خَلَا), laging Nasb.' }],
    commonMistakes: [{ ar: 'نصب الاسم المقصود المفرد في النداء (*يا أحمدًا / *يا خالدًا)؛ والصواب بناؤه على الضم بلا تنوين (يَا أَحْمَدُ، يَا خَالِدُ).', en: 'Saying *يَا خَالِدًا instead of يَا خَالِدُ (proper names in Nida\' never take Tanwin!).', tl: 'Paglalagay ng Tanwin sa *يَا خَالِدًا; dapat ay يَا خَالِدُ.' }],
    comparison: { ar: 'الفرق بين (يَا رَجُلُ) و(يَا رَجُلًا): الأول يقصد رجلًا معينًا أمامه (نكرة مقصودة مبنية على الضم)، والثاني نداء عام كقول الأعمى: يَا رَجُلًا خُذْ بِيَدِي.', en: 'يَا رَجُلُ addresses a specific visible man (Mabni on Damma); يَا رَجُلًا calls any unspecified person (Mansub).', tl: 'Ang يَا رَجُلُ ay tiyak na tao; ang يَا رَجُلًا ay kahit sino.' },
    practicalExercises: [{ id: 'ex-n16-1', prompt: { ar: 'أعرب (مُحَمَّدٍ) في: مَا نَجَحَ غَيْرُ مُحَمَّدٍ.', en: 'Parse غَيْرُ and مُحَمَّدٍ in مَا نَجَحَ غَيْرُ مُحَمَّدٍ.', tl: 'Suriin ang غَيْرُ at مُحَمَّدٍ.' }, arabicPrompt: 'مَا نَجَحَ غَيْرُ مُحَمَّدٍ', answer: 'غَيْرُ: فاعل مرفوع بالضمة (وهو مضاف) — مُحَمَّدٍ: مضاف إليه مجرور بالكسرة', explanation: { ar: 'الاستثناء مفرغ فتُعرب غَيْرُ فاعلًا وما بعدها مضاف إليه.', en: 'Mufarragh assigns Fa\'il to غَيْرُ; مُحَمَّدٍ is Mudaf Ilayh.', tl: 'غَيْرُ ay Fa\'il; مُحَمَّدٍ ay Mudaf Ilayh.' } }],
    summary: { ar: 'قواعد الاستثناء الثلاث وقواعد المنادى الخمس من أدق أبواب النحو وأكثرها حضورًا في الأساليب الرفيعة.', en: 'The 3 Istithna\' states and 5 Munada classes govern classical exception and address syntax.', tl: 'Ang 3 kalagayan ng Istithna\' at 5 uri ng Munada ang namamahala sa pagbubukod at pagtawag.' },
    furtherReading: N_AQIL,
    meta: { status: 'verified', sources: N_AQIL },
  }),

  makeNahuChapter(17, 'nahu-17', 'beginner', 'المجرورات: المجرور بحرف الجر والمجرور بالإضافة', 'Genitives (Majrurat): Prepositions & Idafa Construction', 'Mga Majrur: Pang-ukol at Idafa', {
    objectives: [
      { ar: 'حصر حروف الجر ومعانيها وعملها.', en: 'Learn Arabic prepositions, their meanings, and Jarr governance.', tl: 'Maisaulo ang mga pang-ukol at ang kanilang kahulugan.' },
      { ar: 'إتقان تركيب الإضافة (حذف النون والتنوين، والتعريف والتخصيص، وأنواع الإضافة).', en: 'Master Idafa rules: dropping Tanwin/Nun, definiteness transfer, and semantic types.', tl: 'Matutunan ang Idafa: pagtanggal ng Tanwin/Nun at pagbibigay-katiyakan.' },
    ],
    introduction: {
      ar: 'الجر خصيصة من خصائص الأسماء، ولا يُجر الاسم في العربية إلا بأحد أسباب ثلاثة: حرف الجر، أو الإضافة، أو التبعية لمجرور.',
      en: 'Jarr (genitive case) belongs exclusively to nouns and arises from exactly three causes: a Preposition, Idafa (genitive annexation), or Apposition (Tawabi\').',
      tl: 'Ang Jarr ay para lamang sa pangngalan at nangyayari dahil sa Pang-ukol, Idafa, o pagsunod sa naunang Majrur.',
    },
    definition: { arabicTerm: 'المجرورات', text: { ar: 'كل اسم وقع بعد حرف جر، أو أُضيف إليه اسم قبله، أو تبع اسمًا مجرورًا.', en: 'A noun governed in Jarr by a Harf Jarr, by serving as Mudaf Ilayh in Idafa, or by agreeing with a preceding Majrur.', tl: 'Pangngalang nasa kasong Jarr dahil sa pang-ukol, Idafa, o pagsang-ayon.' } },
    explanation: {
      ar: '١- حروف الجر: مِنْ (الابتداء والتبعيض)، إِلَى (الانتهاء)، عَنْ (المجاوزة)، عَلَى (الاستعلاء)، فِي (الظرفية)، رُبَّ (التقليل/التكثير — تدخل على النكرة)، الباء (الاستعانة والسببية والإلصاق)، الكاف (التشبيه)، اللَّام (الملك والتعليل)، حروف القسم (الواو، الباء، التاء)، مُذْ/مُنْذُ، حَتَّى. ٢- الإضافة: نسبة بين اسمين (المضاف + المضاف إليه). يُجر المضاف إليه دائمًا، ويُحذف من المضاف التنوين ونون المثنى وجمع المذكر السالم و(أل) التعريف. وتأتي الإضافة بمعنى اللام (كِتَابُ الطَّالِبِ)، أو بمعنى مِنْ (خَاتَمُ ذَهَبٍ)، أو بمعنى فِي (سَهَرُ اللَّيْلِ).',
      en: '1. Prepositions: مِنْ (from/part of), إِلَى (to), عَنْ (about/away from), عَلَى (on), فِي (in), بِـ (with/by), كَـ (like), لِـ (for/belonging to), حَتَّى (until), مُنْذُ (since), plus Oath particles وَ/بِـ/تَـ. 2. Idafa (Mudaf + Mudaf Ilayh): Mudaf drops الـ, Tanwin, and Dual/SMP Nun; Mudaf Ilayh is ALWAYS Majrur. Semantic meanings of Idafa: possession (لِـ: بَيْتُ زَيْدٍ), material (مِنْ: ثَوْبُ حَرِيرٍ), or time/place (فِي: صَلَاةُ الْفَجْرِ).',
      tl: '1. Pang-ukol: مِنْ, إِلَى, عَنْ, عَلَى, فِي, بِـ, كَـ, لِـ. 2. Idafa: Tinatanggal ang الـ, Tanwin, at น ng Dual/SMP sa Mudaf; ang Mudaf Ilayh ay palaging Majrur.',
    },
    rules: [
      { ar: 'كل ضمير يتصل بالاسم يُعرب ضميرًا متصلًا مبنيًّا في محل جر مضاف إليه.', en: 'Any pronoun attached directly to a noun is ALWAYS Mudaf Ilayh (e.g. كِتَابُهُ, بَيْتُكُمْ).', tl: 'Anumang panghalip na nakakabit sa pangngalan ay palaging Mudaf Ilayh.' },
      { ar: 'الاسم بعد الظروف (قَبْلَ، بَعْدَ، أَمَامَ، خَلْفَ، عِنْدَ، بَيْنَ) وبعد (كُلّ، بَعْض، غَيْر، سِوَى، ذُو) مضاف إليه مجرور.', en: 'Nouns following Zarfs (عِنْدَ, أَمَامَ) or quantifiers (كُلُّ, بَعْضُ, غَيْرُ, ذُو) are Majrur Mudaf Ilayh.', tl: 'Ang pangngalan pagkatapos ng Zarf o كُلُّ/بَعْضُ/غَيْرُ ay Majrur Mudaf Ilayh.' },
    ],
    classifications: [
      { titleAr: 'الإضافة المحضة (المعنوية)', titleEn: 'Pure (Semantic) Idafa', titleTl: 'Tunay na Idafa', description: { ar: 'تفيد التعريف أو التخصيص.', en: 'Transfers definiteness or specificity to Mudaf.', tl: 'Nagbibigay ng katiyakan sa Mudaf.' }, examples: ['بَابُ الْمَسْجِدِ', 'قَلَمُ طَالِبٍ'] },
      { titleAr: 'الإضافة غير المحضة (اللفظية)', titleEn: 'Verbal/Formal Idafa', titleTl: 'Idafa ng Mga Hinangong Salita', description: { ar: 'أن يكون المضاف مشتقًا مضافًا لمعموله (اسم فاعل/مفعول/صفة مشبهة)، ولا تفيد تعريفًا.', en: 'Derived adjective + its argument (حَسَنُ الْخُلُقِ, كَاتِبُ الدَّرْسِ); allows الـ on Mudaf if Mudaf Ilayh has الـ (الْحَسَنُ الْخُلُقِ)!', tl: 'Hindi nagbibigay ng katiyakan; halimbawa: حَسَنُ الْخُلُقِ.' }, examples: ['حَسَنُ الْوَجْهِ', 'مَحْمُودُ السِّيرَةِ'] },
    ],
    patterns: [
      { pattern: 'مُفْرَد/مُثَنَّى/جَمْع (بلا نون وتنوين) + مُضَاف إِلَيْهِ (مَجْرُور)', example: 'مُعَلِّمَا الْمَدْرَسَةِ / مُدَرِّسُو اللُّغَةِ', meaning: { ar: 'حذف النون للإضافة', en: 'Nun-deletion in Idafa', tl: 'Pagtanggal ng Nun sa Idafa' }, rule: { ar: 'تُحذف نون المثنى والجمع السالم عند الإضافة', en: 'Dual & SMP drop final Nun before Mudaf Ilayh', tl: 'Tinatanggal ang Nun ng Dual at SMP sa Idafa' } },
    ],
    examples: [{ arabic: 'جَلَسْتُ فِي مَكْتَبَةِ الْمَعْهَدِ مَعَ مُعَلِّمِي اللُّغَةِ الْعَرَبِيَّةِ', transliteration: 'jalastu fī maktabati al-ma\'hadi ma\'a mu\'allimī al-lughati al-\'arabiyyati', translation: { ar: 'اجتماع الجر بالحرف والإضافة والتبعية', en: 'I sat in the institute’s library with the teachers of the Arabic language', tl: 'Umupo ako sa aklatan ng institusyon kasama ang mga guro ng wikang Arabe' }, analysis: { ar: 'مَكْتَبَةِ مجرور بـ(فِي)، الْمَعْهَدِ مضاف إليه، مُعَلِّمِي مضاف إليه مجرور بالياء وحُذفت نونه للإضافة، اللُّغَةِ مضاف إليه، الْعَرَبِيَّةِ نعت مجرور.', en: 'Shows Jarr via Harf (فِي), Idafa chain, SMP Mudaf dropping Nun (مُعَلِّمِي), and Tawabi\' (الْعَرَبِيَّةِ).', tl: 'Makikita ang Jarr sa pang-ukol, Idafa, at Na\'t.' } }],
    exceptions: [{ ar: 'بعض الكلمات تلزم الإضافة إلى الجمل مثل (إِذْ، إِذَا، حَيْثُ)، وبعضها يلازم الإضافة إلى المفرد مثل (عِنْدَ، لَدَى، سِوَى، ذُو).', en: 'Words like حَيْثُ and إِذْ annex to whole clauses; عِنْدَ and ذُو annex strictly to nouns/pronouns.', tl: 'Ang حَيْثُ at إِذْ ay nakakabit sa sugnay; ang عِنْدَ at ذُو ay sa pangngalan.' }],
    commonMistakes: [{ ar: 'وضع نعت للمضاف بين المضاف والمضاف إليه؛ والصواب تأخير النعت بعد تمام المتضايفين (سَيَّارَةُ الْمُدِيرِ الْجَدِيدَةُ).', en: 'Placing an adjective between Mudaf and Mudaf Ilayh; nothing can separate Mudaf from Mudaf Ilayh!', tl: 'Paglalagay ng pang-uri sa pagitan ng Mudaf at Mudaf Ilayh.' }],
    comparison: { ar: 'المضاف يُعرب حسب موقعه في الجملة (رفعًا أو نصبًا أو جرًّا)، أما المضاف إليه فمجرور دائمًا.', en: 'Mudaf takes whatever case its clause position demands; Mudaf Ilayh is ALWAYS Majrur.', tl: 'Nagbabago ang kaso ng Mudaf ayon sa posisyon; ang Mudaf Ilayh ay palaging Majrur.' },
    practicalExercises: [{ id: 'ex-n17-1', prompt: { ar: 'أضف كلمة (مُهَنْدِسُونَ) إلى (الْمَشْرُوعُ) في جملة مرفوعة.', en: 'Combine مُهَنْدِسُونَ + الْمَشْرُوعُ as a Marfu\' Idafa.', tl: 'Pagsamahin ang مُهَنْدِسُونَ + الْمَشْرُوعُ.' }, arabicPrompt: 'مُهَنْدِسُونَ + الْمَشْرُوعُ', answer: 'حَضَرَ مُهَنْدِسُو الْمَشْرُوعِ', explanation: { ar: 'تُحذف النون للإضافة ويُجر الْمَشْرُوعِ.', en: 'Drop final Nun of مُهَنْدِسُونَ and put الْمَشْرُوعِ in Jarr.', tl: 'Tanggalin ang Nun ng مُهَنْدِسُونَ at gawing Majrur ang الْمَشْرُوعِ.' } }],
    summary: { ar: 'المجرورات بحروف الجر وبالإضافة تحكم الترابط الاسمي والظرفي في كل جملة عربية.', en: 'Prepositions and Idafa form the structural glue of Arabic noun phrases.', tl: 'Ang mga pang-ukol at Idafa ang nag-uugnay sa mga pariralang pangngalan.' },
    furtherReading: N_AJRUMIYYA,
    meta: { status: 'verified', sources: N_AJRUMIYYA },
  }),

  makeNahuChapter(18, 'nahu-18', 'intermediate', 'التوابع الأربعة: النعت والعطف والتوكيد والبدل', 'The Four Appositives (Tawabi\'): Na\'t, \'Atf, Tawkid & Badal', 'Ang Apat na Tagasunod (Tawabi\'): Na\'t, \'Atf, Tawkid, Badal', {
    objectives: [
      { ar: 'فهم سبب تسمية التوابع وتبعيتها في الإعراب رفعًا ونصبًا وجرًّا.', en: 'Understand why Tawabi\' mirror their antecedent’s I\'rab case.', tl: 'Maunawaan kung bakit sumusunod ang Tawabi\' sa kaso ng naunang salita.' },
      { ar: 'التمييز بين النعت الحقيقي والسببي، وألفاظ التوكيد، وأنواع البدل، ومعاني حروف العطف.', en: 'Distinguish Real vs Sababi Na\'t, Tawkid types, Badal types, and \'Atf conjunctions.', tl: 'Mauri ang Na\'t, Tawkid, Badal, at \'Atf.' },
    ],
    introduction: {
      ar: 'التوابع كلمات ليس لها إعراب مستقل بذاتها، وإنما تتبع ما قبلها (المتبوع) في الرفع والنصب والجر، وهي أربعة: النعت، والعطف، والتوكيد، والبدل.',
      en: 'Tawabi\' (Appositives) lack an independent case governor; they inherit Raf\', Nasb, or Jarr (and for Verbs in \'Atf, Jazm!) from their antecedent.',
      tl: 'Ang Tawabi\' ay walang sariling tagapagbigay ng kaso kundi sumusunod sa naunang salita.',
    },
    definition: { arabicTerm: 'التوابع', text: { ar: 'الأسماء (أو الأفعال في العطف) المشاركة لما قبلها في إعرابه مطلقًا: النعت، والعطف، والتوكيد، والبدل.', en: 'Four syntactic followers inheriting the case/mood of their head: Adjective (Na\'t), Conjunction (\'Atf), Emphasis (Tawkid), and Substitute (Badal).', tl: 'Apat na sumusunod sa kaso ng naunang salita: Na\'t, \'Atf, Tawkid, at Badal.' } },
    explanation: {
      ar: '١- النعت الحقيقي يطابق المنعوت في ٤ من ١٠ (الإعراب، النوع، العدد، التعريف/التنكير)، أما النعت السببي فيطابقه في الإعراب والتعريف/التنكير فقط ويلزم الإفراد ويُطابق الاسم الذي بعده في التذكير والتأنيث (جَاءَ رَجُلٌ كَرِيمَةٌ أُمُّهُ). ٢- العطف بحروفه التسعة: الواو، الفاء، ثم، أو، أم، بل، لا، لكنْ، حتى. ٣- التوكيد: لفظي بتكرار اللفظ، ومعنوي بألفاظ (نَفْس، عَيْن، كِلَا، كِلْتَا، كُلّ، جَمِيع) بشرط اتصالها بضمير يطابق المؤكَّد. ٤- البدل: مطابق (جَاءَ أَخُوكَ زَيْدٌ)، وبعض من كل (قَرَأْتُ الْكِتَابَ نِصْفَهُ)، واشتمال (أَعْجَبَنِي الطَّالِبُ ذَكَاؤُهُ).',
      en: '1. Na\'t: Real Na\'t agrees in Case, Definiteness, Gender, and Number (note: non-human plurals take feminine singular adjectives: كُتُبٌ مُفِيدَةٌ!). Sababi Na\'t agrees in Case & Definiteness only, and matches the following noun in gender. 2. \'Atf: 9 conjunctions (وَ، فَـ، ثُمَّ، أَوْ، أَمْ، بَلْ، لَا، لَكِنْ، حَتَّى). 3. Tawkid: Verbal repetition OR 6 semantic words (نَفْس، عَيْن، كُلّ، جَمِيع، كِلَا، كِلْتَا) WITH a matching pronoun suffix (الطُّلَّابُ كُلُّهُمْ). 4. Badal: Whole-for-whole (الْخَلِيفَةُ عُمَرُ), Part-of-whole (أَكَلْتُ الرَّغِيفَ ثُلُثَهُ), or Inclusive quality (نَفَعَنِي الْمُعَلِّمُ عِلْمُهُ).',
      tl: '1. Na\'t: sumasang-ayon sa kaso, katiyakan, kasarian, at bilang (ang maraming walang buhay na bagay ay gumagamit ng pambabaeng isahan: كُتُبٌ مُفِيدَةٌ). 2. \'Atf: pag-uugnay. 3. Tawkid: pag-uulit o كُلُّهُمْ/نَفْسُهُ. 4. Badal: pamalit.',
    },
    rules: [
      { ar: 'جمع التكسير لغير العاقل (كُتُب، مَسَاجِد، أَيَّام) يُنعت غالبًا بالمفردة المؤنثة (كُتُبٌ نَافِعَةٌ، مَسَاجِدُ وَاسِعَةٌ).', en: 'Non-human broken plurals almost always take feminine singular adjectives (أَبْوَابٌ مَفْتُوحَةٌ).', tl: 'Ang broken plural ng walang buhay ay laging pambabaeng isahan ang pang-uri.' },
    ],
    classifications: [
      { titleAr: 'النعت والعطف', titleEn: 'Adjective & Conjunction', titleTl: 'Na\'t at \'Atf', description: { ar: 'الوصف والربط.', en: 'Modification & coordination.', tl: 'Paglalarawan at pag-uugnay.' }, examples: ['الطَّالِبُ الذَّكِيُّ', 'حَضَرَ مُحَمَّدٌ ثُمَّ عَلِيٌّ'] },
      { titleAr: 'التوكيد والبدل', titleEn: 'Emphasis & Substitute', titleTl: 'Tawkid at Badal', description: { ar: 'التقوية والإبدال.', en: 'Corroboration & apposition.', tl: 'Pagpapatibay at pagpapalit.' }, examples: ['حَضَرَ الْمُدِيرُ نَفْسُهُ', 'كَتَبَ أَخُوكَ مُحَمَّدٌ'] },
    ],
    patterns: [
      { pattern: 'كِلَا / كِلْتَا + ضمير', example: 'نَجَحَ الطَّالِبَانِ كِلَاهُمَا', meaning: { ar: 'توكيد المثنى', en: 'Dual Tawkid', tl: 'Tawkid para sa Dual' }, rule: { ar: 'يُعرب إعراب المثنى بالألف والياء إذا أُضيف لضمير، وبحركات مقدرة إذا أُضيف لاسم ظاهر (كِلَا الطَّالِبَيْنِ)', en: 'Inflects with ا/ي when attached to pronoun; implicit vowels before an overt noun!', tl: 'ا/ي kapag may panghalip; nakatago kapag hayag na pangngalan' } },
    ],
    examples: [{ arabic: 'قَرَأْتُ الْكِتَابَ كُلَّهُ وَعَرَفْتُ مَعَانِيَهُ الدَّقِيقَةَ', transliteration: 'qara\'tu al-kitāba kullahu wa \'araftu ma\'āniyahu ad-daqīqata', translation: { ar: 'توكيد ونعت غير العاقل', en: 'I read the entire book and understood its subtle meanings', tl: 'Binasa ko ang buong aklat at naunawaan ang mga detalyadong kahulugan nito' }, analysis: { ar: 'كُلَّهُ توكيد معنوي منصوب، والدَّقِيقَةَ نعت منصوب لجمع غير العاقل مَعَانِيَهُ.', en: 'كُلَّهُ = Tawkid Mansub; الدَّقِيقَةَ = fem. sg. Na\'t Mansub for non-human plural مَعَانِي.', tl: 'كُلَّهُ = Tawkid; الدَّقِيقَةَ = Na\'t ng broken plural.' } }],
    exceptions: [{ ar: 'ألفاظ (نَفْس، عَيْن، كُلّ) إذا خلت من الضمير أو تقدمت أُعربت حسب موقعها لا توكيدًا (حَضَرَ كُلُّ الطُّلَّابِ ← فاعل).', en: 'Without a matching pronoun suffix, كُلّ/نَفْس are NOT Tawkid — they take normal clause roles (كُلُّ الطُّلَّابِ = Fa\'il/Mudaf).', tl: 'Kung walang nakakabit na panghalip, hindi Tawkid ang كُلّ/نَفْس.' }],
    commonMistakes: [{ ar: 'تأكيد المفرد بـ(كُلّ) حين لا يتجزأ (*جاء محمدٌ كلُّه)؛ فكُلّ للجمع أو ما يتجزأ، وللمفرد (نَفْسُهُ / عَيْنُهُ).', en: 'Using كُلُّهُ on an indivisible singular person; use نَفْسُهُ / عَيْنُهُ.', tl: 'Paggamit ng كُلُّهُ sa iisang tao; gamitin ang نَفْسُهُ.' }],
    comparison: { ar: 'في (جَاءَ الطَّالِبُ نَفْسُهُ) نَفْسُهُ توكيد، بينما في (جَاءَتْ نَفْسُ الطَّالِبِ) نَفْسُ فاعل! والسرّ في الضمير العائد.', en: 'الطَّالِبُ نَفْسُهُ (pronoun after noun) = Tawkid; نَفْسُ الطَّالِبِ (Mudaf before noun) = Fa\'il.', tl: 'الطَّالِبُ نَفْسُهُ = Tawkid; نَفْسُ الطَّالِبِ = Fa\'il.' },
    practicalExercises: [{ id: 'ex-n18-1', prompt: { ar: 'أعرب (عُمَرُ) و(جَمِيعُهُمْ) في: سَلَّمْتُ عَلَى الْخَلِيفَةِ عُمَرَ وَالطُّلَّابِ جَمِيعِهِمْ.', en: 'Parse عُمَرَ and جَمِيعِهِمْ.', tl: 'Suriin ang عُمَرَ at جَمِيعِهِمْ.' }, arabicPrompt: 'سَلَّمْتُ عَلَى الْخَلِيفَةِ عُمَرَ وَالطُّلَّابِ جَمِيعِهِمْ', answer: 'عُمَرَ: بدل مجرور بالفتحة لأنه ممنوع من الصرف — جَمِيعِهِمْ: توكيد معنوي مجرور بالكسرة', explanation: { ar: 'كلاهما تابع للمجرور، وعمر ممنوع من الصرف للعلمية والعدل.', en: 'عُمَرَ = Badal Majrur (Fatha as diptote); جَمِيعِهِمْ = Tawkid Majrur (Kasra).', tl: 'عُمَرَ = Badal (Fatha); جَمِيعِهِمْ = Tawkid (Kasra).' } }],
    summary: { ar: 'التوابع الأربعة تجعل الجملة العربية متماسكة في الإعراب والمعنى عبر النسق اللفظي.', en: 'The 4 Tawabi\' maintain case harmony across modifiers, coordinates, emphatics, and substitutes.', tl: 'Pinapanatili ng apat na Tawabi\' ang pagkakaisa ng kaso sa pangungusap.' },
    furtherReading: N_AJRUMIYYA,
    meta: { status: 'verified', sources: N_AJRUMIYYA },
  }),

  makeNahuChapter(19, 'nahu-19', 'intermediate', 'إعراب الفعل المضارع: النواصب والجوازم وأدوات الشرط', 'Moods of Mudhari: Subjunctive, Jussive & Conditional Clauses', 'Mga Mood ng Mudhari: Nasb, Jazm at Pasubali', {
    objectives: [
      { ar: 'حفظ أدوات النصب (أَنْ، لَنْ، إِذَنْ، كَيْ، لام التعليل، فاء السببية، حتى).', en: 'Master Subjunctive particles governing Mudhari in Nasb.', tl: 'Maisaulo ang mga katagang nagbibigay ng Nasb sa Mudhari.' },
      { ar: 'التمييز بين الجوازم التي تجزم فعلًا واحدًا والتي تجزم فعلين (أدوات الشرط الجازمة وغير الجازمة).', en: 'Distinguish 1-verb Jazm particles from 2-verb Conditional tools (jazim vs non-jazim).', tl: 'Mapagkaiba ang nagbibigay ng Jazm sa 1 pandiwa at sa 2 pandiwa.' },
    ],
    introduction: {
      ar: 'الفعل المضارع معرب ما لم تتصل به نون النسوة أو نون التوكيد: يُرفع للتجرد، ويُنصب بعد النواصب، ويُجزم بعد الجوازم في فعل واحد أو في جملتي الشرط والجواب.',
      en: 'Mudhari is the sole declinable verb: Marfu\' by default, Mansub after Nawasib, and Majzum after Jawazim (single-verb or 2-clause conditionals).',
      tl: 'Ang Mudhari ay Marfu\' kung walang panlapi, Mansub pagkatapos ng Nawasib, at Majzum pagkatapos ng Jawazim.',
    },
    definition: { arabicTerm: 'نواصب المضارع وجوازمه', text: { ar: 'النواصب حروف تنصب المضارع (أَنْ، لَنْ، كَيْ، إِذَنْ...)، والجوازم أدوات تجزم فعلًا واحدًا (لَمْ، لَمَّا، لام الأمر، لا الناهية) أو فعلين (إِنْ، مَنْ، مَا، مَتَى...).', en: 'Nawasib govern Mudhari in Nasb; Jawazim govern either 1 Mudhari or 2 verbs (Protasis & Apodosis).', tl: 'Nawasib: nagbibigay ng Nasb; Jawazim: nagbibigay ng Jazm sa 1 o 2 pandiwa.' } },
    explanation: {
      ar: '١- النواصب: أَنْ، لَنْ، إِذَنْ، كَيْ (بنفسها)، ولام التعليل، ولام الجحود (مسبوقة بكون منفي: مَا كَانَ اللَّهُ لِيُعَذِّبَهُمْ)، وحَتَّى، وفَاء السببية (مسبوقة بنفي أو طلب: اِجْتَهِدْ فَتَنْجَحَ). ٢- جوازم فعل واحد: لَمْ، لَمَّا، لام الأمر (لِيَجْتَهِدْ)، لا الناهية (لَا تَكْسَلْ). ٣- جوازم فعلين (أدوات الشرط الجازمة): إِنْ (حرف)، مَنْ، مَا، مَهْمَا، مَتَى، أَيَّانَ، أَيْنَ، أَيْنَمَا، حَيْثُمَا، كَيْفَمَا، أَيُّ. ٤- أدوات الشرط غير الجازمة: إِذَا، لَوْ، لَوْلَا، كُلَّمَا، لَمَّا الحينية. ويقترن جواب الشرط بالفاء وجوبًا إذا كان جملة اسمية أو طلبية أو مسبوقة بـ(قَدْ/مَا/لَنْ/السين/سَوْفَ): مَنْ يَجْتَهِدْ فَسَيَنْجَحُ.',
      en: '1. Nawasib: أَنْ، لَنْ، كَيْ، إِذَنْ، plus لِـ (purpose), لام الجحود (after مَا كَانَ), حَتَّى, and فَاء السببية (after command/negation). 2. Single-verb Jawazim: لَمْ، لَمَّا، لِـ (command), لَا (prohibition). 3. Two-verb Jazim Conditionals: إِنْ (particle) & nouns مَنْ، مَا، مَهْمَا، مَتَى، أَيْنَمَا، أَيُّ — putting BOTH condition verb and result verb into Jazm! 4. Non-Jazim Conditionals: إِذَا، لَوْ، لَوْلَا، كُلَّمَا. When the result clause cannot take Jazm directly (nominal, command, لَنْ/قَدْ/سَـ), prefix فـ (فاء الجزاء)!',
      tl: '1. Nawasib: أَنْ, لَنْ, كَيْ, إِذَنْ, حَتَّى. 2. 1-verb Jawazim: لَمْ, لَمَّا, لِـ, لَا. 3. 2-verb Jazim Conditionals: إِنْ, مَنْ, مَا, مَتَى, أَيْنَمَا. 4. Non-Jazim Conditionals: إِذَا, لَوْ, لَوْلَا.',
    },
    rules: [
      { ar: 'بيت جمع شروط اقتران جواب الشرط بالفاء: اسْمِيَّةٌ طَلَبِيَّةٌ وَبِجَامِدٍ * وَبِمَا وَلَنْ وَبِقَدْ وَبِالتَّنْفِيسِ.', en: 'Prefix فـ to the conditional result clause if it is: Nominal, Imperative/Prohibitive, Rigid verb (نِعْمَ/لَيْسَ), or starts with مَا، لَنْ، قَدْ، سَـ/سَوْفَ.', tl: 'Lagyan ng فـ ang resulta ng pasubali kung ito ay pangngalan, pautos, o nagsisimula sa مَا/لَنْ/قَدْ/سَـ/سَوْفَ.' },
    ],
    classifications: [
      { titleAr: 'أدوات الشرط الجازمة', titleEn: 'Jussive Conditionals', titleTl: 'Jazim na Pasubali', description: { ar: 'تجزم فعل الشرط وجواب الشرط.', en: 'Govern both verbs in Jazm.', tl: 'Nagbibigay ng Jazm sa parehong pandiwa.' }, examples: ['إِنْ تَدْرُسْ تَنْجَحْ', 'مَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا'] },
      { titleAr: 'أدوات الشرط غير الجازمة', titleEn: 'Non-Jussive Conditionals', titleTl: 'Hindi-Jazim na Pasubali', description: { ar: 'تربط الشرط بالجواب دون جزم.', en: 'Do not induce Jazm.', tl: 'Walang Jazm.' }, examples: ['إِذَا جَاءَ الصَّيْفُ سَافَرْنَا', 'لَوْ اجْتَهَدَ لَنَجَحَ'] },
    ],
    patterns: [
      { pattern: 'إِنْ + فعل شرط مجزوم + جواب شرط مجزوم', example: 'مَتَى تَقْرَأْ تَسْتَفِدْ', meaning: { ar: 'جزم الفعلين', en: 'Two Jussive verbs', tl: 'Dalawang Majzum na pandiwa' }, rule: { ar: 'تَقْرَأْ مجزوم بالسكون وتَسْتَفِدْ مجزوم بالسكون وحُذفت الياء لالتقاء الساكنين', en: 'Both verbs Majzum (تَسْتَفِدْ drops medial Ya before sukun)', tl: 'Parehong Majzum ang dalawang pandiwa' } },
    ],
    examples: [{ arabic: 'إِنْ تَنْصُرُوا اللَّهَ يَنْصُرْكُمْ', transliteration: 'in tanṣurū Allāha yanṣurkum', translation: { ar: 'الشرط بالأفعال الخمسة والسالم', en: 'If you support God, He will support you', tl: 'Kung tutulungan ninyo ang Diyos, tutulungan Niya kayo' }, analysis: { ar: 'تَنْصُرُوا فعل الشرط مجزوم بحذف النون، ويَنْصُرْ جواب الشرط مجزوم بالسكون.', en: 'تَنْصُرُوا = Majzum (dropped Nun); يَنْصُرْ = Majzum (Sukun).', tl: 'تَنْصُرُوا = Majzum (walang Nun); يَنْصُرْ = Majzum (Sukun).' } }],
    exceptions: [{ ar: 'يُجزم المضارع جوازًا إذا وقع جوابًا لطلب (أمر أو نهي) دون فاء السببية: اِجْتَهِدْ تَنْجَحْ.', en: 'Mudhari as the result of a command/prohibition (without فـ) becomes Majzum: ذَاكِرْ تَنْجَحْ!', tl: 'Nagiging Majzum ang Mudhari bilang resulta ng pautos kung walang فـ: اِجْتَهِدْ تَنْجَحْ.' }],
    commonMistakes: [{ ar: 'جزم المضارع بعد (إِذَا)؛ فإِذَا أداة شرط غير جازمة فيبقى المضارع بعدها مرفوعًا (إِذَا تَجْتَهِدُ تَنْجَحُ).', en: 'Putting Mudhari in Jazm after إِذَا; إِذَا is non-jussive!', tl: 'Pagbibigay ng Jazm pagkatapos ng إِذَا; ang إِذَا ay hindi Jazim.' }],
    comparison: { ar: 'إذا اقترن جواب الشرط الجازم بالفاء (فَسَوْفَ يَنْجَحُ) كان الفعل مرفوعًا والجملة كلها في محل جزم جواب الشرط.', en: 'When فـ precedes the result verb (فَسَيَنْجَحُ), the verb itself stays Marfu\', while the whole clause sits in local Jazm!', tl: 'Kapag may فـ sa resulta (فَسَيَنْجَحُ), nananatiling Marfu\' ang pandiwa ngunit ang buong sugnay ay nasa posisyong Majzum.' },
    practicalExercises: [{ id: 'ex-n19-1', prompt: { ar: 'اربط بين الجملتين بأداة شرط جازمة: يَسْعَى فِي الْخَيْرِ — يَنَالُ الرِّضَا.', en: 'Combine with a jussive conditional: يَسْعَى فِي الْخَيْرِ — يَنَالُ الرِّضَا.', tl: 'Pagdugtungin gamit ang Jazim conditional.' }, arabicPrompt: 'يَسْعَى / يَنَالُ', answer: 'مَنْ يَسْعَ فِي الْخَيْرِ يَنَلْ الرِّضَا', explanation: { ar: 'يَسْعَ بحذف الألف المقصورة، ويَنَلْ بالسكون وحذف الألف لالتقاء الساكنين.', en: 'يَسْعَ drops ى; يَنَلْ drops medial Alif before sukun.', tl: 'يَسْعَ (tinanggal ang ى); يَنَلْ (tinanggal ang Alif).' } }],
    summary: { ar: 'ضبط النواصب والجوازم وأدوات الشرط يكمل إتقان إعراب الأفعال في العربية.', en: 'Subjunctive, Jussive, and Conditional rules complete the Arabic verbal syntax system.', tl: 'Kinukumpleto ng Nawasib, Jawazim, at Conditional ang sintaks ng pandiwa.' },
    furtherReading: N_AQIL,
    meta: { status: 'verified', sources: N_AQIL },
  }),

  makeNahuChapter(20, 'nahu-20', 'advanced', 'حروف المعاني والأدوات المتشابهة في النحو', 'Complete Particles & Commonly Confused Grammatical Tools', 'Mga Kataga (Huruf al-Ma\'ani) at mga Magkakahawig na Salita', {
    objectives: [
      { ar: 'التمييز الدقيق بين: إِنْ / أَنْ / إِنَّ / أَنَّ.', en: 'Distinguish إِنْ, أَنْ, إِنَّ, and أَنَّ by vocalization and function.', tl: 'Mapagkaiba ang إِنْ, أَنْ, إِنَّ, at أَنَّ.' },
      { ar: 'التفريق بين لَا النَّاهِيَة ولَا النَّافِيَة، وبين لَمْ ولَمَّا ولَنْ.', en: 'Contrast La al-Nahiyah vs Nafiyah, and Lam vs Lamma vs Lan.', tl: 'Mapagkaiba ang La al-Nahiyah sa Nafiyah, at ang لَمْ, لَمَّا, at لَنْ.' },
    ],
    introduction: {
      ar: 'تتشابه بعض الحروف العربية في الرسم وتختلف اختلافًا جذريًّا في الإعراب والمعنى؛ والخلط بينها من أبرز أسباب الخطأ النحوي.',
      en: 'Many high-frequency Arabic particles share nearly identical consonantal skeletons while exerting completely different syntactic governance.',
      tl: 'Maraming katagang Arabe ang magkahawig sa hitsura ngunit magkaiba ang epekto sa I\'rab.',
    },
    definition: { arabicTerm: 'الأدوات المتشابهة', text: { ar: 'حروف المعاني التي تتقارب رسمًا وتفترق ضبطًا وعملًا، كرباعية (إن/أن) وثنائية (لا) وأدوات النفي (لم/لما/لن).', en: 'Particles differing in vowelization and governance despite orthographic similarity.', tl: 'Mga katagang magkahawig sa baybay ngunit iba-iba ang patinig at gampanin.' } },
    explanation: {
      ar: '١- رباعية (إن/أن): (إِنْ) شرطية جازمة للمضارع (إِنْ تَدْرُسْ تَنْجَحْ) أو نافية بمعنى ما؛ (أَنْ) مصدرية ناصبة للمضارع (أُرِيدُ أَنْ أَتَعَلَّمَ)؛ (إِنَّ) و(أَنَّ) ناسختان تنصبان الاسم وترفعان الخبر. ٢- لَا النَّاهِيَة vs لَا النَّافِيَة: لا الناهية تدخل على المضارع لطلب الترك وتجزمه (لَا تَهْمِلْ)، ولا النافية تنفي وقوع الفعل ولا عمل لها في المضارع فيبقى مرفوعًا (لَا يَهْمِلُ الطَّالِبُ). ٣- لَمْ vs لَمَّا vs لَنْ: لَمْ تنفي الماضي المنقطع وتجزم، ولَمَّا تنفي الماضي المتصل بالحال وتجزم (وَتُفيد توقع الحدوث)، ولَنْ تنفي المستقبل وتنصب المضارع.',
      en: '1. Fourfold In/An: إِنْ = Jussive "if" (verb); أَنْ = Subjunctive "to" (verb); إِنَّ / أَنَّ = Emphatic "indeed/that" (noun + Nasb). 2. La al-Nahiyah = "Don’t!" (Jussive: لَا تَكْتُبْ); La al-Nafiyah = "does not" (Marfu\': لَا يَكْتُبُ). 3. Negation Trio: لَمْ + Jazm = negated past ("did not"); لَمَّا + Jazm = "not yet" (expects occurrence); لَنْ + Nasb = negated future ("will never").',
      tl: '1. إِنْ ("kung" + Jazm), أَنْ ("upang" + Nasb), إِنَّ/أَنَّ ("katotohanan/na" + pangngalan). 2. لَا النَّاهِيَة ("Huwag!" + Jazm) vs لَا النَّافِيَة ("Hindi" + Marfu\'). 3. لَمْ (nakaraan + Jazm), لَمَّا ("hindi pa" + Jazm), لَنْ (hinaharap + Nasb).',
    },
    rules: [
      { ar: 'إِنْ وأَنْ (ساكنتا النون) تختصان بالأفعال غالبًا (جزم ونصب)، بينما إِنَّ وأَنَّ (مشددتا النون) تختصان بالأسماء (نصب الاسم ورفع الخبر).', en: 'Light إِنْ/أَنْ govern verbs; heavy (Shadda) إِنَّ/أَنَّ govern nominal clauses.', tl: 'Ang إِنْ/أَنْ ay para sa pandiwa; ang إِنَّ/أَنَّ ay para sa pangngalan.' },
    ],
    classifications: [
      { titleAr: 'رباعية إن وأن', titleEn: 'إِنْ / أَنْ / إِنَّ / أَنَّ', titleTl: 'Apat na In/An', description: { ar: 'أربع أدوات بأربعة أحكام.', en: 'Four particles, four grammatical rules.', tl: 'Apat na kataga, apat na tuntunin.' }, examples: ['إِنْ تَصْدُقْ تَسْلَمْ', 'يُسْعِدُنِي أَنْ تَصْدُقَ', 'إِنَّ الصِّدْقَ نَجَاةٌ', 'عَلِمْتُ أَنَّ الصِّدْقَ نَجَاةٌ'] },
      { titleAr: 'أدوات النفي الثلاث', titleEn: 'لَمْ / لَمَّا / لَنْ', titleTl: 'Tatlong Pananggi', description: { ar: 'الأوليان للجزم والثالثة للنصب.', en: 'Two Jussive past negators, one Subjunctive future negator.', tl: 'Dalawang Jazm, isang Nasb.' }, examples: ['لَمْ يَحْضُرْ', 'لَمَّا يَحْضُرْ', 'لَنْ يَحْضُرَ'] },
    ],
    patterns: [
      { pattern: 'لَا النَّاهِيَة (جزم) vs لَا النَّافِيَة (رفع)', example: 'أَنْتَ لَا تَكْذِبُ (خبر) vs لَا تَكْذِبْ (طلب)', meaning: { ar: 'الفرق الإعرابي والمعنوي لـ(لَا)', en: 'Statement (Marfu\') vs Prohibition (Majzum)', tl: 'Pahayag (Marfu\') vs Pagbabawal (Majzum)' }, rule: { ar: 'الضمة على الباء في النفي، والسكون في النهي', en: 'Damma in Nafiyah; Sukun in Nahiyah', tl: 'Damma sa Nafiyah; Sukun sa Nahiyah' } },
    ],
    examples: [{ arabic: 'إِنَّ الْعَالِمَ لَا يَكْتُمُ عِلْمَهُ وَإِنْ يُسْأَلْ يُجِبْ', transliteration: 'inna al-\'ālima lā yaktumu \'ilmahu wa in yus\'al yujib', translation: { ar: 'اجتماع إِنَّ ولا النافية وإِنْ الشرطية', en: 'Indeed the scholar does not conceal his knowledge, and if asked, he answers', tl: 'Katotohanan, hindi itinatago ng iskolar ang kanyang kaalaman, at kung tatanungin, siya ay sumasagot' }, analysis: { ar: 'إِنَّ ناسخة، لَا نافية فيَكْتُمُ مرفوع، وإِنْ شرطية فيُسْأَلْ ويُجِبْ مجزومان.', en: 'إِنَّ (Inna-nasikh), لَا (Nafiyah → Marfu\'), إِنْ (Conditional → both verbs Majzum).', tl: 'إِنَّ (nasikh), لَا (Nafiyah → Marfu\'), إِنْ (Pasubali → Majzum).' } }],
    exceptions: [{ ar: 'قد تأتي (أَنْ) مخففةً من الثقيلة (أَنَّ) بعد أفعال العلم والظن (عَلِمَ أَنْ سَيَكُونُ مِنْكُمْ مَرْضَى) فلا تنصب المضارع بعدها بل يرفع!', en: 'Lightened أَنْ (from أَنَّ) after knowledge verbs leaves the following Mudhari Marfu\' (عَلِمَ أَنْ سَيَكُونُ)!', tl: 'Ang pinaikling أَنْ pagkatapos ng pandiwa ng kaalaman ay nagpapanatiling Marfu\' sa pandiwa.' }],
    commonMistakes: [{ ar: 'جزم المضارع بعد (لا النافية) في نحو (*المؤمنُ لا يكذبْ)؛ والصواب الرفع (لَا يَكْذِبُ).', en: 'Putting Jazm after informative La (*المؤمنُ لا يكذبْ); informative La leaves the verb Marfu\'!', tl: 'Pagbibigay ng Jazm pagkatapos ng La al-Nafiyah.' }],
    comparison: { ar: 'تُختبر (لَا) بالسياق: فإن أفادت طلب الكف فهي ناهية جازمة، وإن أفادت الإخبار والنفي فهي نافية غير عاملة في المضارع.', en: 'Ask: is it telling someone "Stop/Don\'t"? → Nahiyah (Jazm). Is it stating a fact "does not"? → Nafiyah (Marfu\').', tl: 'Kung nagbabawal ("Huwag"), ito ay Nahiyah (Jazm); kung nagsasaad lamang ng "hindi", ito ay Nafiyah (Marfu\').' },
    practicalExercises: [{ id: 'ex-n20-1', prompt: { ar: 'اضبط آخر الفعل (تَتَأَخَّر) في الجملتين: أَنْتَ لَا تَتَأَخَّر — يَا أَخِي لَا تَتَأَخَّر.', en: 'Vocalize تَتَأَخَّر in: أَنْتَ لَا تَتَأَخَّر vs يَا أَخِي لَا تَتَأَخَّر.', tl: 'Lagyan ng tuldik ang تَتَأَخَّر sa dalawang pangungusap.' }, arabicPrompt: 'أَنْتَ لَا تَتَأَخَّر / يَا أَخِي لَا تَتَأَخَّر', answer: 'أَنْتَ لَا تَتَأَخَّرُ (نافية مرفوع) — يَا أَخِي لَا تَتَأَخَّرْ (ناهية مجزوم)', explanation: { ar: 'الأولى إخبار والثانية نهي.', en: 'Statement vs prohibition.', tl: 'Pahayag vs pagbabawal.' } }],
    summary: { ar: 'التمييز بين الأدوات المتشابهة يحسم ضبط أواخر الأفعال والأسماء ويكشف دقة المعنى.', en: 'Distinguishing look-alike particles prevents the most common syntax errors in Arabic.', tl: 'Ang pag-iiba sa magkakahawig na kataga ang pumipigil sa mga karaniwang pagkakamali.' },
    furtherReading: N_AQIL,
    meta: { status: 'verified', sources: N_AQIL },
  }),

  makeNahuChapter(21, 'nahu-21', 'advanced', 'العدد والمعدود: تذكيرًا وتأنيثًا وإعرابًا وتمييزًا', 'Complete Number Grammar (Al-\'Adad wal-Ma\'dud: 1–1000+)', 'Gramatika ng mga Numero (Al-\'Adad wal-Ma\'dud)', {
    objectives: [
      { ar: 'ضبط قواعد تذكير العدد وتأنيثه من ١ إلى ١٠٠٠ ومضاعفاتها.', en: 'Master gender agreement and polarity across numbers 1–2, 3–10, 11–12, 13–19, 20–99, and 100–1000.', tl: 'Maisaulo ang kasarian ng bilang mula 1 hanggang 1000.' },
      { ar: 'ضبط إعراب العدد وإعراب تمييز المعدود (مفردًا وجمعًا، مجرورًا ومنصوبًا).', en: 'Master number I\'rab (including Mabni 11–19 except 12) and Ma\'dud case/number.', tl: 'Matutunan ang I\'rab ng numero at ng binibilang na pangngalan.' },
    ],
    introduction: {
      ar: 'يُعدّ باب العدد والمعدود من أدق أبواب النحو العربي؛ إذ يجمع بين قواعد المطابقة والمخالفة في الجنس، والبناء والإعراب في الأعداد المركبة، وتمييز المعدود جرًّا ونصبًا وإفرادًا وجمعًا.',
      en: 'Arabic Number Grammar integrates three systems simultaneously: gender agreement/polarity, case/Mabni inflection of the number, and singular/plural/case of the counted noun (Tamyiz).',
      tl: 'Pinagsasama ng Al-\'Adad wal-Ma\'dud ang kasarian, I\'rab ng numero, at anyo ng binibilang na pangngalan.',
    },
    definition: { arabicTerm: 'العدد والمعدود', text: { ar: 'العدد اللفظ الدال على الكمية، والمعدود (التمييز) الاسم المفسّر للعدد، ولكل مرتبة عددية حكمها الخاص في الجنس والإعراب.', en: 'Al-\'Adad is the numeral and Al-Ma\'dud is the counted noun whose gender, number, and case depend on the numeral tier.', tl: 'Ang Al-\'Adad ay ang bilang at ang Al-Ma\'dud ay ang binibilang.' } },
    explanation: {
      ar: '١- العددان (١ و٢): يوافقان المعدود تذكيرًا وتأنيثًا بعده (كِتَابٌ وَاحِدٌ، قِصَّتَانِ اثْنَتَانِ). ٢- الأعداد (٣ إلى ١٠): تخالف المعدود في الجنس (تُذكر مع المؤنث وتُؤنث مع المذكر)، ومعدودها جمع مجرور بالإضافة (ثَلَاثَةُ كُتُبٍ، أَرْبَعُ مَجَلَّاتٍ). ٣- العددان (١١ و١٢): يوافقان المعدود بجزأيهما (أَحَدَ عَشَرَ كَوْكَبًا، اِثْنَتَا عَشْرَةَ عَيْنًا). ٤- الأعداد (١٣ إلى ١٩): الجزء الأول يخالف المعدود والثاني (عشر) يوافقه، وتُبنى على فتح الجزأين (سَبْعَةَ عَشَرَ طَالِبًا، تِسْعَ عَشْرَةَ طَالِبَةً) — ما عدا (١٢) فيُعرب صدره إعراب المثنى (اِثْنَا/اِثْنَيْ). ٥- ألفاظ العقود (٢٠ إلى ٩٠): تلزم صورة واحدة وتُعرب إعراب جمع المذكر السالم (عِشْرُونَ/عِشْرِينَ). ٦- المعطوف (٢١ إلى ٩٩): الأول يأخذ حكم ١–٩، والعقد يعطف عليه (خَمْسَةٌ وَعِشْرُونَ طَالِبًا). وتمييز (١١ إلى ٩٩) مفرد منصوب دائمًا! ٧- المئة والألف: تلزمان صورة واحدة، وتمييزهما مفرد مجرور بالإضافة (مِئَةُ كِتَابٍ، أَلْفُ طَالِبَةٍ).',
      en: '• 1–2: Follow noun & match gender (طَالِبٌ وَاحِدٌ, طَالِبَتَانِ اثْنَتَانِ). • 3–10: Reverse gender of singular noun + Plural Majrur (ثَلَاثَةُ طُلَّابٍ, خَمْسُ طَالِبَاتٍ). • 11–12: Both parts match gender; 11 is Mabni on double Fatha (أَحَدَ عَشَرَ), while 12 inflects part 1 as Dual (اِثْنَا/اِثْنَيْ عَشَرَ). • 13–19: Part 1 reverses gender, Part 2 matches; Mabni on double Fatha (ثَلَاثَ عَشْرَةَ طَالِبَةً). • 20–90: Invariant gender, SMP case (عِشْرُونَ/عِشْرِينَ). • 21–99: Compounded with وَ (وِاحِدٌ وَثَلَاثُونَ). Tamyiz of ALL 11–99 is Singular Mansub! • 100 & 1000+: Invariant gender, Singular Majrur (مِئَةُ كِتَابٍ, أَلْفُ سَنَةٍ).',
      tl: '• 1–2: Sumasang-ayon sa kasarian. • 3–10: Baliktad sa kasarian ng isahan + Maramihang Majrur (ثَلَاثَةُ كُتُبٍ). • 11–12: Parehong bahagi sumasang-ayon. • 13–19: Baliktad ang una, tugma ang pangalawa; nakapirmi sa dalawang Fatha. • 11–99: Ang binibilang ay Isahang Mansub! • 100–1000: Isahang Majrur.',
    },
    rules: [
      { ar: 'الميزان السريع للعدد (٣ إلى ١٠) و(١٣ إلى ١٩): انظر إلى مفرد المعدود لا جمعه! فـ(سِجِلَّات) مفرده (سِجِلّ) مذكر فتقول: ثَلَاثَةُ سِجِلَّاتٍ، و(مَسَاجِد) مفرده (مَسْجِد) مذكر فتقول: خَمْسَةُ مَسَاجِدَ.', en: 'Always check the SINGULAR gender of the counted noun: جُنَيْهَات → sg. جُنَيْه (masc.), so ثَلَاثَةُ جُنَيْهَاتٍ!', tl: 'Tingnan palagi ang ISAHANG kasarian ng binibilang na salita.' },
      { ar: 'تمييز (٣–١٠) جمع مجرور، وتمييز (١١–٩٩) مفرد منصوب، وتمييز (١٠٠ و١٠٠٠) مفرد مجرور.', en: 'Tamyiz formula: 3–10 = Plural Majrur; 11–99 = Singular Mansub; 100/1000 = Singular Majrur.', tl: 'Pormula ng Tamyiz: 3–10 = Maramihang Majrur; 11–99 = Isahang Mansub; 100/1000 = Isahang Majrur.' },
    ],
    classifications: [
      { titleAr: 'الأعداد المفردة (١–١٠، ١٠٠، ١٠٠٠)', titleEn: 'Simple Numerals', titleTl: 'Payak na Numero', description: { ar: 'تُعرب بالحركات (ما عدا ٢ كالمثنى).', en: 'Declinable simple numbers.', tl: 'Payak na nagbabagong numero.' }, examples: ['سَبْعُ لَيَالٍ وَثَمَانِيَةُ أَيَّامٍ', 'مِئَةُ طَالِبٍ'] },
      { titleAr: 'الأعداد المركبة (١١–١٩)', titleEn: 'Compound Numerals (11–19)', titleTl: 'Tambalang Numero (11–19)', description: { ar: 'مبنية على فتح الجزأين في محل رفع/نصب/جر (عدا ١٢).', en: 'Mabni on double Fatha (except 12).', tl: 'Mabni sa dalawang Fatha (maliban sa 12).' }, examples: ['حَضَرَ ثَلَاثَةَ عَشَرَ طَالِبًا', 'قَرَأْتُ اثْنَتَيْ عَشْرَةَ صَفْحَةً'] },
      { titleAr: 'العقود والمعطوفة (٢٠–٩٩)', titleEn: 'Decades & Conjoined (20–99)', titleTl: 'Sampuan at Pinag-ugnay (20–99)', description: { ar: 'جمع مذكر سالم ملحق.', en: 'Takes SMP endings ونَ/ينَ.', tl: 'Sumusunod sa Sound Masc. Plural.' }, examples: ['عِشْرُونَ دَرْسًا', 'خَمْسٌ وَأَرْبَعُونَ دَقِيقَةً'] },
    ],
    patterns: [
      { pattern: '٣-٩ (تاء التأنيث مع المذكر) + جمع مجرور', example: 'قَرَأْتُ أَرْبَعَةَ كُتُبٍ وَأَرْبَعَ رِوَايَاتٍ', meaning: { ar: 'المخالفة في ٣–١٠', en: 'Gender polarity in 3–10', tl: 'Kabaligtarang kasarian sa 3–10' }, rule: { ar: 'كِتَاب مذكر ← أَرْبَعَةَ؛ رِوَايَة مؤنث ← أَرْبَعَ', en: 'Masc. كِتَاب takes أَرْبَعَةَ; Fem. رِوَايَة takes أَرْبَعَ', tl: 'Panlalaki → أَرْبَعَةَ; Pambabae → أَرْبَعَ' } },
    ],
    examples: [{ arabic: 'فِي الْفَصْلِ خَمْسَةَ عَشَرَ طَالِبًا وَاثْنَتَا عَشْرَةَ طَالِبَةً وَعِشْرُونَ مَقْعَدًا', transliteration: 'fī al-faṣli khamsata \'ashara ṭāliban wathnatā \'ashrata ṭālibatan wa \'ishrūna maq\'adan', translation: { ar: 'تطبيق الأعداد المركبة والعقود', en: 'In the classroom are 15 male students, 12 female students, and 20 seats', tl: 'Sa silid-aralan ay may 15 lalaking mag-aaral, 12 babaeng mag-aaral, at 20 upuan' }, analysis: { ar: 'خَمْسَةَ عَشَرَ مبني على فتح الجزأين في محل رفع مبتدأ مؤخر، اِثْنَتَا معطوف مرفوع بالألف، عِشْرُونَ مرفوع بالواو، وكل المعدودات مفرد منصوب.', en: 'خَمْسَةَ عَشَرَ = Mabni in local Raf\'; اِثْنَتَا = Alif; عِشْرُونَ = Waw; all three counted nouns = Singular Mansub Tamyiz.', tl: 'Lahat ng binibilang (11–99) ay Isahang Mansub.' } }],
    exceptions: [{ ar: 'تُسكن شين (عَشَرَة) أو تُفتح مع المؤنث (عَشْرَة)، وتُفتح مع المذكر (عَشَرَ). و(ثَمَانِي) تُعامل معاملة المنقوص (ثَمَانِيَ عَشْرَةَ / ثَمَانٍ).', en: 'عَشْرَة takes Sukun on ش with feminine counted nouns and Fatha (عَشَرَ) with masculine ones.', tl: 'Ang عَشْرَة ay may Sukun sa ش para sa pambabae at Fatha (عَشَرَ) para sa panlalaki.' }],
    commonMistakes: [{ ar: 'جمع تمييز (١١–٩٩) أو (١٠٠/١٠٠٠) مثل (*خمسون كتبٍ / *مئة طلابٍ)؛ والصواب الإفراد دائمًا (خَمْسُونَ كِتَابًا، مِئَةُ طَالِبٍ).', en: 'Using a plural noun after 11+ or 100/1000 (*عِشْرُونَ كُتُبٍ, *مِئَةُ طُلَّابٍ).', tl: 'Paggamit ng maramihan pagkatapos ng 11+ o 100/1000.' }],
    comparison: { ar: 'العدد الترتيبي (الْأَوَّلُ، الثَّانِي، الثَّالِثُ... الْحَادِي عَشَرَ) يوافق المعدود دائمًا في التذكير والتأنيث خلافًا لقاعدة المخالفة في ٣–٩.', en: 'Ordinal numbers (الْثَّالِثُ، الرَّابِعَةُ، الْخَامِسَ عَشَرَ) ALWAYS agree in gender (no polarity!).', tl: 'Ang mga ordinal (الْثَّالِثُ، الرَّابِعَةُ) ay palaging sumasang-ayon sa kasarian.' },
    practicalExercises: [{ id: 'ex-n21-1', prompt: { ar: 'اكتب الرقم بالحروف: حَضَرَ (14) طَالِبَةً وَ(7) مَعَلِّمِينَ.', en: 'Write in Arabic words: حَضَرَ (14) طَالِبَةً وَ(7) مُعَلِّمِينَ.', tl: 'Isulat sa salitang Arabe: (14) طَالِبَةً at (7) مُعَلِّمِينَ.' }, arabicPrompt: '14 طَالِبَةً / 7 مُعَلِّمِينَ', answer: 'حَضَرَتْ أَرْبَعَ عَشْرَةَ طَالِبَةً وَسَبْعَةُ مُعَلِّمِينَ', explanation: { ar: '١٤: ٤ يخالف و١٠ يوافق؛ ٧: يخالف المفرد (مُعَلِّم).', en: '14: 4 masc. + 10 fem. (طَالِبَة); 7: fem. سَبْعَةُ (مُعَلِّم).', tl: '14: أَرْبَعَ عَشْرَةَ; 7: سَبْعَةُ.' } }],
    summary: { ar: 'تطبيق جدول العدد (الموافقة في ١–٢ و١١–١٢، المخالفة في ٣–١٠، والعكس في ١٣–١٩) يزيل كل لبس في قراءة الأرقام العربية.', en: 'Applying the 3-tier gender and Tamyiz table eliminates ambiguity in Arabic numerals.', tl: 'Ang paggamit ng talahanayan ng kasarian at Tamyiz ay nag-aalis ng kalituhan sa mga numero.' },
    furtherReading: N_AQIL,
    meta: { status: 'verified', sources: N_AQIL },
  }),

  makeNahuChapter(22, 'nahu-22', 'advanced', 'الأساليب النحوية المتقدمة (الاشتغال والتنازع والاختصاص والتحذير والقسم)', 'Advanced Syntax: Ishtighal, Tanazu\', Ikhtisas, Ighra\'/Tahdhir, Qasam & Ellipsis', 'Mga Advanced na Estruktura: Ishtighal, Tanazu\', Ikhtisas, Ighra\', Qasam', {
    objectives: [
      { ar: 'فهم أساليب الاشتغال والتنازع والتقديم والتأخير والحذف والتقدير.', en: 'Analyze Ishtighal, Tanazu\', word-order inversion (Taqdim/Ta\'khir), and Ellipsis (Hadhf).', tl: 'Maunawaan ang Ishtighal, Tanazu\', pagpapalit ng ayos, at pagkakaltas.' },
      { ar: 'إعراب الاختصاص والإغراء والتحذير والقسم وجواب القسم.', en: 'Parse Ikhtisas, Ighra\', Tahdhir, and Oaths (Qasam + Jawab al-Qasam).', tl: 'Masuri ang Ikhtisas, Ighra\', Tahdhir, at Panunumpa (Qasam).' },
    ],
    introduction: {
      ar: 'يشتمل النحو المتقدم على أساليب بلاغية ونحوية دقيقة تتجاوز التركيب المباشر، مثل أسلوب الاختصاص والإغراء والتحذير والاشتغال والتنازع والقسم وتقدير المحذوفات.',
      en: 'Advanced Arabic syntax covers high-register rhetorical structures where verbs are elided by convention or two governors compete over a single argument.',
      tl: 'Sinasaklaw ng advanced na Nahu ang mga mas mataas na estruktura tulad ng Ikhtisas, Ighra\', Tahdhir, Ishtighal, Tanazu\', at Qasam.',
    },
    definition: { arabicTerm: 'الأساليب النحوية المتقدمة', text: { ar: 'تراكيب نحوية مخصوصة تعتمد على إضمار العامل وجوبًا (الاختصاص والإغراء والتحذير) أو تنازع العاملين أو تقدّم المعمول على عامله المشتغل بضميره.', en: 'Specialized syntactic patterns featuring obligatory elided verbs (Ikhtisas, Ighra\', Tahdhir), competing governors (Tanazu\'), pronoun resumption (Ishtighal), and oath-response clauses.', tl: 'Mga espesyal na estruktura na may nakatagong pandiwa o naglalabang Amil.' } },
    explanation: {
      ar: '١- الاشتغال: أن يتقدم اسم ويتأخر عنه فعل اشتغل بنصب ضميره (زَيْدًا ضَرَبْتُهُ ← يجوز نصب زَيْدًا بفعل محذوف يفسره المذكور، أو رفعه بالابتداء). ٢- التنازع: أن يتقدم عاملان على معمول واحد نحو (قَامَ وَقَعَدَ أَخُوكَ). ٣- التقديم والتأخير: للحصر والاهتمام نحو (إِيَّاكَ نَعْبُدُ) و(لِلَّهِ الْأَمْرُ). ٤- الحذف والتقدير: مثل حذف الخبر وجوبًا بعد لَوْلَا (لَوْلَا الْعِلْمُ لَضَلَّ النَّاسُ — التقدير: مَوْجُودٌ). ٥- الاختصاص: اسم ظاهر منصوب بفعل محذوف وجوبًا تقديره (أَخُصُّ) بعد ضمير متكلم أو مخاطب: نَحْنُ — الْعَرَبَ — نُكْرِمُ الضَّيْفَ. ٦- الإغراء والتحذير: نصب المغرى به أو المحذر منه بفعل محذوف (اِلْزَمِ الصِّدْقَ، إِيَّاكَ وَالْكَذِبَ). ٧- القسم وجوابه: وَاللَّهِ لَأَجْتَهِدَنَّ (الواو حرف جر وقسم، ولفظ الجلالة مقسم به مجرور، والجملة بعده جواب القسم لا محل لها).',
      en: '1. Ishtighal: زَيْدًا أَكْرَمْتُهُ (fronted noun resumed by object pronoun; Nasb via implied verb or Raf\' as Mubtada). 2. Tanazu\': two verbs share one noun (حَضَرَ وَسَلَّمَ زَيْدٌ). 3. Taqdim/Ta\'khir: rhetorical fronting (إِيَّاكَ نَعْبُدُ). 4. Hadhf/Taqdir: obligatory ellipsis like Khabar after لَوْلَا (لَوْلَا الْعِلْمُ [مَوْجُودٌ] لَضَلُّوا). 5. Ikhtisas: pronoun + Mansub noun clarifying group (نَحْنُ الطُّلَّابَ نَجْتَهِدُ — governed by implied أَخُصُّ). 6. Ighra\' (urging: الصِّدْقَ الصِّدْقَ = implied اِلْزَمْ) & Tahdhir (warning: إِيَّاكَ وَالْكَسَلَ = implied أُحَذِّرُ). 7. Qasam: oath phrase (وَاللَّهِ) + Jawab al-Qasam (no I\'rab slot).',
      tl: '1. Ishtighal: زَيْدًا أَكْرَمْتُهُ. 2. Tanazu\': dalawang pandiwang nag-aagawan sa isang pangngalan. 3. Ikhtisas: نَحْنُ الطُّلَّابَ نَجْتَهِدُ (Mansub dahil sa nakatagong أَخُصُّ). 4. Ighra\' (paghikayat: الصِّدْقَ الصِّدْقَ) at Tahdhir (babala: إِيَّاكَ وَالْكَسَلَ). 5. Qasam: panunumpa (وَاللَّهِ).',
    },
    rules: [
      { ar: 'يميز أسلوب الاختصاص عن الخبر بوجود ضمير متكلم (نَحْنُ) واسم ظاهر معرفة أو مضاف لمعرفة منصوب بفتحة وسط الجملة: نَحْنُ الْمُعَلِّمِينَ نَبْنِي الْأَجْيَالَ.', en: 'In Ikhtisas, the Mansub noun after نَحْنُ/أَنَا is definite (with الـ or Idafa), unlike a Khabar which is Marfu\': نَحْنُ الطُّلَّابَ (Mansub) vs نَحْنُ طُلَّابٌ (Marfu\' Khabar)!', tl: 'Sa Ikhtisas, ang pangngalan pagkatapos ng نَحْنُ ay may الـ at Mansub (نَحْنُ الطُّلَّابَ), hindi tulad ng Khabar na Marfu\' (نَحْنُ طُلَّابٌ).' },
    ],
    classifications: [
      { titleAr: 'الاختصاص والإغراء والتحذير', titleEn: 'Ikhtisas, Ighra\' & Tahdhir', titleTl: 'Ikhtisas, Ighra\' & Tahdhir', description: { ar: 'منصوبات بفعل محذوف وجوبًا عند التكرار أو العطف أو بعد الضمير.', en: 'Accusatives governed by obligatorily elided verbs.', tl: 'Mga Mansub na pinamamahalaan ng nakatagong pandiwa.' }, examples: ['نَحْنُ — الْعُلَمَاءَ — وَرَثَةُ الْأَنْبِيَاءِ', 'اَلْأَمَانَةَ الْأَمَانَةَ', 'إِيَّاكَ وَالْغِيبَةَ'] },
      { titleAr: 'القسم وجوابه', titleEn: 'Oaths & Responses', titleTl: 'Panunumpa at Sagot', description: { ar: 'تأكيد الجواب باللام وقد/إنّ/النون.', en: 'Affirmative verbal answers use لَـ + نَّ or قَدْ.', tl: 'Ang positibong sagot sa panunumpa ay gumagamit ng لَـ + نَّ o قَدْ.' }, examples: ['وَاللَّهِ إِنَّ الْحَقَّ وَاضِحٌ', 'تَاللَّهِ لَأَصْدُقَنَّ'] },
    ],
    patterns: [
      { pattern: 'نَحْنُ + (الـ / مضاف) منصوب + خبر مرفوع', example: 'نَحْنُ طُلَّابَ الْعِلْمِ مُجْتَهِدُونَ', meaning: { ar: 'أسلوب الاختصاص', en: 'Ikhtisas construction', tl: 'Estrukturang Ikhtisas' }, rule: { ar: 'طُلَّابَ مفعول به لفعل محذوف وجوبًا تقديره أَخُصُّ، ومُجْتَهِدُونَ خبر نَحْنُ', en: 'طُلَّابَ = Maf\'ul Bihi for elided أَخُصُّ; مُجْتَهِدُونَ = Khabar of نَحْنُ', tl: 'طُلَّابَ = Mansub (nakatagong أَخُصُّ); مُجْتَهِدُونَ = Khabar ng نَحْنُ' } },
    ],
    examples: [{ arabic: 'لَوْلَا الصَّبْرُ لَضَاعَتِ الْآدَابُ، فَالْأَدَبَ الْأَدَبَ يَا طَالِبُ', transliteration: 'lawlā aṣ-ṣabru laḍā\'ati al-ādābu, fal-adaba al-adaba yā ṭālibu', translation: { ar: 'الحذف والتقدير وأسلوب الإغراء', en: 'Were it not for patience, manners would be lost — so adhere to good manners, O student!', tl: 'Kung hindi dahil sa pagtitiis, mawawala ang mabuting asal — kaya panghawakan ang magandang asal, O mag-aaral!' }, analysis: { ar: 'خبر الصَّبْرُ محذوف وجوبًا تقديره (موجود)، والأَدَبَ مفعول به لفعل محذوف تقديره (الزم).', en: 'Khabar of الصَّبْرُ is obligatorily elided (مَوْجُودٌ); الْأَدَبَ is Ighra\' object of elided اِلْزَمِ.', tl: 'Nakatago ang Khabar ng الصَّبْرُ; ang الْأَدَبَ ay Ighra\'.' } }],
    exceptions: [{ ar: 'إذا اجتمع شرط وقسم في جملة (وَاللَّهِ إِنْ دَرَسْتَ...) فالجواب للسابق منهما، إلا إذا تقدمهما مبتدأ فالجواب للشرط غالبًا.', en: 'When both an Oath and a Conditional appear, the response clause belongs to whichever came first!', tl: 'Kapag magkasama ang Panunumpa at Pasubali, ang sagot ay para sa nauna.' }],
    commonMistakes: [{ ar: 'رفع الاسم المختص بعد الضمير في مثل (*نحنُ المدرسونَ نبني الوطنَ) إذا قُصد به الاختصاص؛ فالمختص منصوب دائمًا (نَحْنُ الْمُدَرِّسِينَ).', en: 'Putting the Ikhtisas noun in Raf\' (*نَحْنُ الْمُدَرِّسُونَ نَبْنِي); when functioning as specification after نَحْنُ it must be Mansub: نَحْنُ الْمُدَرِّسِينَ.', tl: 'Paglalagay ng Raf\' sa Ikhtisas (*نَحْنُ الْمُدَرِّسُونَ); dapat ay Mansub (نَحْنُ الْمُدَرِّسِينَ).' }],
    comparison: { ar: 'في أسلوب التحذير (إِيَّاكَ وَالنِّفَاقَ): إِيَّاكَ مفعول به لفعل محذوف (أُحَذِّرُ)، والنِّفَاقَ مفعول به لفعل محذوف (اِحْذَرْ) أو معطوف.', en: 'In إِيَّاكَ وَالْكَذِبَ, both إِيَّاكَ and الْكَذِبَ are Mansub under implied warning verbs.', tl: 'Sa إِيَّاكَ وَالْكَذِبَ, parehong Mansub ang dalawang bahagi.' },
    practicalExercises: [{ id: 'ex-n22-1', prompt: { ar: 'أعرب (الْمُسْلِمِينَ) في: نَحْنُ الْمُسْلِمِينَ نُحِبُّ السَّلَامَ.', en: 'Parse الْمُسْلِمِينَ in نَحْنُ الْمُسْلِمِينَ نُحِبُّ السَّلَامَ.', tl: 'Suriin ang الْمُسْلِمِينَ.' }, arabicPrompt: 'نَحْنُ الْمُسْلِمِينَ نُحِبُّ السَّلَامَ', answer: 'مفعول به منصوب على الاختصاص لفعل محذوف وجوبًا تقديره (أَخُصُّ) وعلامة نصبه الياء', explanation: { ar: 'المختص يُنصب بالياء لأنه جمع مذكر سالم.', en: 'Mansub with Ya on Ikhtisas (elided أَخُصُّ).', tl: 'Mansub sa Ya bilang Ikhtisas.' } }],
    summary: { ar: 'الأساليب النحوية المتقدمة تربط بين النحو والبلاغة وتُفسّر أسمى تراكيب الفصحى.', en: 'Advanced syntactic constructions reveal how ellipsis, fronting, and emphasis shape eloquent Arabic.', tl: 'Ipinapakita ng mga advanced na estruktura kung paano pinagyayaman ng ellipsis at pagbibigay-diin ang wikang Arabe.' },
    furtherReading: N_AQIL,
    meta: { status: 'verified', sources: N_AQIL },
  }),
];
