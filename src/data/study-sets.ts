import { StudyCard, StudySet, StudySetCategory } from '@/types';

// ============================================================================
// VERBS WITH PREPOSITIONS (Verben mit festen Präpositionen)
// ============================================================================

const verbsWithPrepositionsCards: StudyCard[] = [
  {
    id: 'vp-1',
    category: 'verbs-with-prepositions',
    front: 'sich freuen',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich freue mich auf die Ferien.', fa: 'من منتظر تعطیلات هستم.' },
        { de: 'Sie freut sich auf das Wochenende.', fa: 'او منتظر آخر هفته است.' },
      ],
      meanings: ['منتظر چیزی بودن (با شوق)', 'مشتاق چیزی بودن'],
    },
  },
  {
    id: 'vp-2',
    category: 'verbs-with-prepositions',
    front: 'warten',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich warte auf den Bus.', fa: 'من منتظر اتوبوس هستم.' },
        { de: 'Warten Sie bitte auf mich!', fa: 'لطفا منتظر من باشید!' },
      ],
      meanings: ['منتظر چیزی/کسی بودن'],
    },
  },
  {
    id: 'vp-3',
    category: 'verbs-with-prepositions',
    front: 'denken',
    back: {
      preposition: 'an',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich denke oft an dich.', fa: 'من اغلب به تو فکر می‌کنم.' },
        { de: 'Denk an die Prüfung morgen!', fa: 'به امتحان فردا فکر کن!' },
      ],
      meanings: ['به چیزی/کسی فکر کردن'],
    },
  },
  {
    id: 'vp-4',
    category: 'verbs-with-prepositions',
    front: 'sich interessieren',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Sie interessiert sich für Kunst.', fa: 'او به هنر علاقه‌مند است.' },
        { de: 'Interessierst du dich für Musik?', fa: 'آیا به موسیقی علاقه داری؟' },
      ],
      meanings: ['علاقه‌مند به چیزی بودن'],
    },
  },
  {
    id: 'vp-5',
    category: 'verbs-with-prepositions',
    front: 'sich bedanken',
    back: {
      preposition: 'bei / für',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Ich bedanke mich bei dir für deine Hilfe.', fa: 'از تو برای کمکت تشکر می‌کنم.' },
        { de: 'Er bedankte sich bei seinem Lehrer.', fa: 'او از معلمش تشکر کرد.' },
      ],
      meanings: ['تشکر کردن از کسی (bei) / برای چیزی (für)'],
    },
  },
  {
    id: 'vp-6',
    category: 'verbs-with-prepositions',
    front: 'sich beschäftigen',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Ich beschäftige mich mit diesem Thema.', fa: 'من با این موضوع سر و کار دارم.' },
        { de: 'Sie beschäftigt sich mit Literatur.', fa: 'او به ادبیات می‌پردازد.' },
      ],
      meanings: ['به چیزی پرداختن', 'با چیزی سرگرم بودن'],
    },
  },
  {
    id: 'vp-7',
    category: 'verbs-with-prepositions',
    front: 'sich bewerben',
    back: {
      preposition: 'um / bei',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Er bewirbt sich um eine Stelle bei BMW.', fa: 'او برای یک موقعیت شغلی در BMW درخواست می‌دهد.' },
        { de: 'Sie hat sich bei der Firma beworben.', fa: 'او به شرکت درخواست داده است.' },
      ],
      meanings: ['درخواست دادن برای (um) / نزد (bei)'],
    },
  },
  {
    id: 'vp-8',
    category: 'verbs-with-prepositions',
    front: 'sich erinnern',
    back: {
      preposition: 'an',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich erinnere mich gut an diesen Tag.', fa: 'من این روز را به خوبی به یاد می‌آورم.' },
        { de: 'Erinnerst du dich an unsere Reise?', fa: 'سفرمان را به یاد می‌آوری؟' },
      ],
      meanings: ['چیزی را به یاد آوردن'],
    },
  },
  {
    id: 'vp-9',
    category: 'verbs-with-prepositions',
    front: 'sich kümmern',
    back: {
      preposition: 'um',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich kümmere mich um die Kinder.', fa: 'من از بچه‌ها مراقبت می‌کنم.' },
        { de: 'Wer kümmert sich um das Problem?', fa: 'چه کسی رسیدگی به مشکل می‌کند؟' },
      ],
      meanings: ['از چیزی/کسی مراقبت کردن', 'به چیزی رسیدگی کردن'],
    },
  },
  {
    id: 'vp-10',
    category: 'verbs-with-prepositions',
    front: 'sich unterhalten',
    back: {
      preposition: 'über / mit',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Wir unterhalten uns über Politik.', fa: 'ما درباره سیاست صحبت می‌کنیم.' },
        { de: 'Ich habe mich mit ihm unterhalten.', fa: 'من با او صحبت کردم.' },
      ],
      meanings: ['درباره چیزی (über) / با کسی (mit) صحبت کردن'],
    },
  },
  {
    id: 'vp-11',
    category: 'verbs-with-prepositions',
    front: 'sich vorbereiten',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bereite mich auf die Prüfung vor.', fa: 'من برای امتحان آماده می‌شوم.' },
        { de: 'Sie bereitet sich auf das Interview vor.', fa: 'او برای مصاحبه آماده می‌شود.' },
      ],
      meanings: ['برای چیزی آماده شدن'],
    },
  },
  {
    id: 'vp-12',
    category: 'verbs-with-prepositions',
    front: 'achten',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Achte auf die Verkehrsschilder!', fa: 'به علائم راهنمایی توجه کن!' },
        { de: 'Sie achtet sehr auf ihre Gesundheit.', fa: 'او خیلی به سلامتی‌اش توجه می‌کند.' },
      ],
      meanings: ['به چیزی توجه کردن', 'مراقب چیزی بودن'],
    },
  },
  {
    id: 'vp-13',
    category: 'verbs-with-prepositions',
    front: 'anfangen',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Wann fängst du mit der Arbeit an?', fa: 'کی کار را شروع می‌کنی؟' },
        { de: 'Ich fange mit dem Studium an.', fa: 'من تحصیل را شروع می‌کنم.' },
      ],
      meanings: ['چیزی را شروع کردن'],
    },
  },
  {
    id: 'vp-14',
    category: 'verbs-with-prepositions',
    front: 'sich ärgern',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich ärgere mich über den Fehler.', fa: 'من از اشتباه عصبانی هستم.' },
        { de: 'Sie ärgert sich über ihren Chef.', fa: 'او از رئیسش عصبانی است.' },
      ],
      meanings: ['از چیزی عصبانی بودن', 'از چیزی ناراحت بودن'],
    },
  },
  {
    id: 'vp-15',
    category: 'verbs-with-prepositions',
    front: 'bitten',
    back: {
      preposition: 'um',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bitte dich um Hilfe.', fa: 'من از تو کمک می‌خواهم.' },
        { de: 'Er bat um Entschuldigung.', fa: 'او عذرخواهی کرد.' },
      ],
      meanings: ['از کسی چیزی خواستن', 'درخواست کردن'],
    },
  },
  {
    id: 'vp-16',
    category: 'verbs-with-prepositions',
    front: 'gehören',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Das Buch gehört zu meiner Sammlung.', fa: 'این کتاب جزء مجموعه من است.' },
        { de: 'Er gehört zu den besten Schülern.', fa: 'او جزء بهترین دانش‌آموزان است.' },
      ],
      meanings: ['متعلق به چیزی بودن', 'جزء چیزی بودن'],
    },
  },
  {
    id: 'vp-17',
    category: 'verbs-with-prepositions',
    front: 'hoffen',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich hoffe auf gutes Wetter.', fa: 'من امیدوار به هوای خوب هستم.' },
        { de: 'Wir hoffen auf eine Lösung.', fa: 'ما امیدوار به یک راه‌حل هستیم.' },
      ],
      meanings: ['امیدوار به چیزی بودن'],
    },
  },
  {
    id: 'vp-18',
    category: 'verbs-with-prepositions',
    front: 'teilnehmen',
    back: {
      preposition: 'an',
      case: 'Dativ',
      examples: [
        { de: 'Ich nehme an dem Kurs teil.', fa: 'من در دوره شرکت می‌کنم.' },
        { de: 'Sie nimmt an der Konferenz teil.', fa: 'او در کنفرانس شرکت می‌کند.' },
      ],
      meanings: ['در چیزی شرکت کردن'],
    },
  },
  {
    id: 'vp-19',
    category: 'verbs-with-prepositions',
    front: 'träumen',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Ich träume von einem neuen Auto.', fa: 'من رویای یک ماشین جدید را دارم.' },
        { de: 'Sie träumt von einer Weltreise.', fa: 'او رویای یک سفر دور دنیا را دارد.' },
      ],
      meanings: ['رویای چیزی را دیدن', 'آرزوی چیزی را داشتن'],
    },
  },
  {
    id: 'vp-20',
    category: 'verbs-with-prepositions',
    front: 'sich entscheiden',
    back: {
      preposition: 'für / gegen',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich habe mich für dieses Angebot entschieden.', fa: 'من این پیشنهاد را انتخاب کرده‌ام.' },
        { de: 'Er hat sich gegen den Plan entschieden.', fa: 'او با طرح مخالفت کرده است.' },
      ],
      meanings: ['به نفع چیزی تصمیم گرفتن (für)', 'علیه چیزی تصمیم گرفتن (gegen)'],
    },
  },
];

// ============================================================================
// PREPOSITIONS WITH CASES (Präpositionen mit Kasus)
// ============================================================================

const prepositionsWithCasesCards: StudyCard[] = [
  // DATIV PREPOSITIONS
  {
    id: 'pc-d-1',
    category: 'prepositions-with-cases',
    subcategory: 'Dativ',
    front: 'ab',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Ab nächster Woche bin ich im Urlaub.', fa: 'از هفته بعد در تعطیلات هستم.' },
        { de: 'Ab dem ersten Januar.', fa: 'از اول ژانویه.' },
      ],
      meanings: ['از (زمان)', 'از ... به بعد'],
    },
  },
  {
    id: 'pc-d-2',
    category: 'prepositions-with-cases',
    subcategory: 'Dativ',
    front: 'aus',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Ich komme aus dem Iran.', fa: 'من از ایران می‌آیم.' },
        { de: 'Das Glas ist aus Kristall.', fa: 'لیوان از کریستال است.' },
      ],
      meanings: ['از (مکان/منشأ)', 'از جنس'],
    },
  },
  {
    id: 'pc-d-3',
    category: 'prepositions-with-cases',
    subcategory: 'Dativ',
    front: 'bei',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Ich wohne bei meinen Eltern.', fa: 'من نزد والدینم زندگی می‌کنم.' },
        { de: 'Er arbeitet bei BMW.', fa: 'او در BMW کار می‌کند.' },
        { de: 'Beim Essen sprechen wir nicht.', fa: 'هنگام غذا خوردن صحبت نمی‌کنیم.' },
      ],
      meanings: ['نزد', 'در (شرکت)', 'هنگام'],
    },
  },
  {
    id: 'pc-d-4',
    category: 'prepositions-with-cases',
    subcategory: 'Dativ',
    front: 'mit',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Ich fahre mit dem Bus.', fa: 'من با اتوبوس می‌روم.' },
        { de: 'Sie spricht mit ihrer Freundin.', fa: 'او با دوستش صحبت می‌کند.' },
      ],
      meanings: ['با (وسیله)', 'با (همراهی)'],
    },
  },
  {
    id: 'pc-d-5',
    category: 'prepositions-with-cases',
    subcategory: 'Dativ',
    front: 'nach',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Ich fahre nach Berlin.', fa: 'من به برلین می‌روم.' },
        { de: 'Nach dem Essen gehe ich spazieren.', fa: 'بعد از غذا پیاده‌روی می‌کنم.' },
        { de: 'Nach meiner Meinung ist das falsch.', fa: 'به نظر من این اشتباه است.' },
      ],
      meanings: ['به (شهر/کشور بدون artikel)', 'بعد از', 'به نظر'],
    },
  },
  {
    id: 'pc-d-6',
    category: 'prepositions-with-cases',
    subcategory: 'Dativ',
    front: 'seit',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Ich wohne seit drei Jahren in Deutschland.', fa: 'من سه سال است که در آلمان زندگی می‌کنم.' },
        { de: 'Seit wann lernst du Deutsch?', fa: 'از کی دارای آلمانی یاد می‌گیری؟' },
      ],
      meanings: ['از ... (مدت زمان)', 'از وقتی که'],
    },
  },
  {
    id: 'pc-d-7',
    category: 'prepositions-with-cases',
    subcategory: 'Dativ',
    front: 'von',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Das Buch ist von Goethe.', fa: 'کتاب از گوته است.' },
        { de: 'Ich komme gerade vom Arzt.', fa: 'من همین الان از دکتر می‌آیم.' },
        { de: 'Von 9 bis 17 Uhr.', fa: 'از ساعت 9 تا 17.' },
      ],
      meanings: ['از (نویسنده/سازنده)', 'از (مکان)', 'از (شروع زمان)'],
    },
  },
  {
    id: 'pc-d-8',
    category: 'prepositions-with-cases',
    subcategory: 'Dativ',
    front: 'zu',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Ich gehe zum Arzt.', fa: 'من به دکتر می‌روم.' },
        { de: 'Kommst du zu mir?', fa: 'نزد من می‌آیی؟' },
        { de: 'Zum Geburtstag gratuliere ich dir.', fa: 'برای تولدت به تو تبریک می‌گویم.' },
      ],
      meanings: ['به/نزد', 'برای (مناسبت)'],
    },
  },
  {
    id: 'pc-d-9',
    category: 'prepositions-with-cases',
    subcategory: 'Dativ',
    front: 'gegenüber',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Die Bank liegt gegenüber dem Park.', fa: 'بانک روبروی پارک قرار دارد.' },
        { de: 'Mir gegenüber war er sehr freundlich.', fa: 'او در برابر من بسیار مهربان بود.' },
      ],
      meanings: ['روبروی', 'در برابر'],
    },
  },

  // AKKUSATIV PREPOSITIONS
  {
    id: 'pc-a-1',
    category: 'prepositions-with-cases',
    subcategory: 'Akkusativ',
    front: 'bis',
    back: {
      case: 'Akkusativ (ohne Artikel)',
      examples: [
        { de: 'Bis nächste Woche!', fa: 'تا هفته بعد!' },
        { de: 'Von 9 bis 17 Uhr.', fa: 'از ساعت 9 تا 17.' },
        { de: 'Bis Berlin sind es 200 km.', fa: 'تا برلین 200 کیلومتر است.' },
      ],
      meanings: ['تا (زمان)', 'تا (مکان)'],
    },
  },
  {
    id: 'pc-a-2',
    category: 'prepositions-with-cases',
    subcategory: 'Akkusativ',
    front: 'durch',
    back: {
      case: 'Akkusativ',
      examples: [
        { de: 'Wir gehen durch den Park.', fa: 'ما از پارک عبور می‌کنیم.' },
        { de: 'Durch Übung wird man besser.', fa: 'با تمرین بهتر می‌شویم.' },
      ],
      meanings: ['از میان', 'از طریق', 'به واسطه'],
    },
  },
  {
    id: 'pc-a-3',
    category: 'prepositions-with-cases',
    subcategory: 'Akkusativ',
    front: 'für',
    back: {
      case: 'Akkusativ',
      examples: [
        { de: 'Das Geschenk ist für dich.', fa: 'هدیه برای تو است.' },
        { de: 'Ich lerne für die Prüfung.', fa: 'من برای امتحان درس می‌خوانم.' },
        { de: 'Für mich ist das wichtig.', fa: 'برای من این مهم است.' },
      ],
      meanings: ['برای', 'به نفع'],
    },
  },
  {
    id: 'pc-a-4',
    category: 'prepositions-with-cases',
    subcategory: 'Akkusativ',
    front: 'gegen',
    back: {
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bin gegen den Plan.', fa: 'من با طرح مخالفم.' },
        { de: 'Das Auto fuhr gegen den Baum.', fa: 'ماشین به درخت برخورد کرد.' },
        { de: 'Gegen Abend wird es kalt.', fa: 'نزدیک عصر هوا سرد می‌شود.' },
      ],
      meanings: ['علیه', 'به/با (برخورد)', 'حدود (زمان)'],
    },
  },
  {
    id: 'pc-a-5',
    category: 'prepositions-with-cases',
    subcategory: 'Akkusativ',
    front: 'ohne',
    back: {
      case: 'Akkusativ',
      examples: [
        { de: 'Ich gehe ohne dich.', fa: 'من بدون تو می‌روم.' },
        { de: 'Ohne Fleiß kein Preis.', fa: 'بدون تلاش موفقیتی نیست.' },
      ],
      meanings: ['بدون'],
    },
  },
  {
    id: 'pc-a-6',
    category: 'prepositions-with-cases',
    subcategory: 'Akkusativ',
    front: 'um',
    back: {
      case: 'Akkusativ',
      examples: [
        { de: 'Der Unterricht beginnt um 9 Uhr.', fa: 'کلاس ساعت 9 شروع می‌شود.' },
        { de: 'Wir sitzen um den Tisch.', fa: 'ما دور میز نشسته‌ایم.' },
      ],
      meanings: ['در/ساعت (زمان دقیق)', 'دور', 'حدود'],
    },
  },
  {
    id: 'pc-a-7',
    category: 'prepositions-with-cases',
    subcategory: 'Akkusativ',
    front: 'entlang',
    back: {
      case: 'Akkusativ (nachgestellt)',
      examples: [
        { de: 'Wir gehen die Straße entlang.', fa: 'ما در امتداد خیابان می‌رویم.' },
        { de: 'Der Fluss entlang gibt es viele Bäume.', fa: 'در امتداد رودخانه درختان زیادی وجود دارد.' },
      ],
      meanings: ['در امتداد', 'در طول'],
      notes: ['معمولاً بعد از اسم می‌آید'],
    },
  },

  // GENITIV PREPOSITIONS
  {
    id: 'pc-g-1',
    category: 'prepositions-with-cases',
    subcategory: 'Genitiv',
    front: 'angesichts',
    back: {
      case: 'Genitiv',
      examples: [
        { de: 'Angesichts der Situation müssen wir handeln.', fa: 'با توجه به وضعیت باید عمل کنیم.' },
      ],
      meanings: ['با توجه به', 'در برابر'],
    },
  },
  {
    id: 'pc-g-2',
    category: 'prepositions-with-cases',
    subcategory: 'Genitiv',
    front: 'anhand',
    back: {
      case: 'Genitiv',
      examples: [
        { de: 'Anhand dieser Beispiele erkläre ich das Problem.', fa: 'به کمک این مثال‌ها مشکل را توضیح می‌دهم.' },
      ],
      meanings: ['به کمک', 'با استفاده از'],
    },
  },
  {
    id: 'pc-g-3',
    category: 'prepositions-with-cases',
    subcategory: 'Genitiv',
    front: 'anlässlich',
    back: {
      case: 'Genitiv',
      examples: [
        { de: 'Anlässlich seines Geburtstags geben wir eine Party.', fa: 'به مناسبت تولدش یک مهمانی می‌دهیم.' },
      ],
      meanings: ['به مناسبت'],
    },
  },
  {
    id: 'pc-g-4',
    category: 'prepositions-with-cases',
    subcategory: 'Genitiv',
    front: 'anstelle / statt',
    back: {
      case: 'Genitiv',
      examples: [
        { de: 'Anstelle des Chefs kommt sein Stellvertreter.', fa: 'به جای رئیس، معاونش می‌آید.' },
        { de: 'Statt meines Bruders bin ich gekommen.', fa: 'به جای برادرم من آمدم.' },
      ],
      meanings: ['به جای', 'بجای'],
    },
  },
  {
    id: 'pc-g-5',
    category: 'prepositions-with-cases',
    subcategory: 'Genitiv',
    front: 'aufgrund',
    back: {
      case: 'Genitiv',
      examples: [
        { de: 'Aufgrund des schlechten Wetters fällt das Spiel aus.', fa: 'به دلیل هوای بد بازی لغو می‌شود.' },
      ],
      meanings: ['به دلیل', 'بر اساس'],
    },
  },
  {
    id: 'pc-g-6',
    category: 'prepositions-with-cases',
    subcategory: 'Genitiv',
    front: 'außerhalb',
    back: {
      case: 'Genitiv',
      examples: [
        { de: 'Außerhalb der Stadt ist es ruhiger.', fa: 'خارج از شهر آرام‌تر است.' },
      ],
      meanings: ['خارج از', 'بیرون از'],
    },
  },
  {
    id: 'pc-g-7',
    category: 'prepositions-with-cases',
    subcategory: 'Genitiv',
    front: 'innerhalb',
    back: {
      case: 'Genitiv',
      examples: [
        { de: 'Innerhalb einer Woche bekommst du eine Antwort.', fa: 'ظرف یک هفته پاسخ دریافت می‌کنی.' },
      ],
      meanings: ['داخل', 'ظرف (زمان)'],
    },
  },
  {
    id: 'pc-g-8',
    category: 'prepositions-with-cases',
    subcategory: 'Genitiv',
    front: 'trotz',
    back: {
      case: 'Genitiv',
      examples: [
        { de: 'Trotz des Regens gehe ich spazieren.', fa: 'با وجود باران پیاده‌روی می‌کنم.' },
        { de: 'Trotz seiner Krankheit arbeitet er.', fa: 'با وجود بیماری‌اش کار می‌کند.' },
      ],
      meanings: ['با وجود', 'علیرغم'],
    },
  },
  {
    id: 'pc-g-9',
    category: 'prepositions-with-cases',
    subcategory: 'Genitiv',
    front: 'während',
    back: {
      case: 'Genitiv (schriftsprachlich + Genitiv)',
      examples: [
        { de: 'Während des Unterrichts darf man nicht sprechen.', fa: 'در طول کلاس نباید حرف زد.' },
        { de: 'Während der Ferien bleibe ich zu Hause.', fa: 'در طول تعطیلات خانه می‌مانم.' },
      ],
      meanings: ['در طول', 'حین'],
      notes: ['در زبان گفتار اغلب با Dativ استفاده می‌شود'],
    },
  },
  {
    id: 'pc-g-10',
    category: 'prepositions-with-cases',
    subcategory: 'Genitiv',
    front: 'wegen',
    back: {
      case: 'Genitiv (schriftsprachlich + Genitiv)',
      examples: [
        { de: 'Wegen des Unfalls kam ich zu spät.', fa: 'به خاطر تصادف دیر رسیدم.' },
        { de: 'Wegen dir habe ich Probleme.', fa: 'به خاطر تو مشکل دارم.' },
      ],
      meanings: ['به خاطر', 'به دلیل'],
      notes: ['در زبان گفتار اغلب با Dativ استفاده می‌شود'],
    },
  },
];

// ============================================================================
// IRREGULAR VERBS (Unregelmäßige Verben nach Vokalen geordnet)
// ============================================================================

const irregularVerbsCards: StudyCard[] = [
  // e → a → e pattern
  {
    id: 'iv-1',
    category: 'irregular-verbs',
    subcategory: 'e→a→e',
    front: 'geben',
    back: {
      verb_forms: {
        infinitiv: 'geben',
        praeteritum: 'gab',
        perfekt: 'hat gegeben',
      },
      examples: [
        { de: 'Ich gebe dir das Buch.', fa: 'من کتاب را به تو می‌دهم.' },
        { de: 'Er gab mir einen Rat.', fa: 'او به من نصیحت کرد.' },
      ],
      meanings: ['دادن'],
    },
  },
  {
    id: 'iv-2',
    category: 'irregular-verbs',
    subcategory: 'e→a→e',
    front: 'lesen',
    back: {
      verb_forms: {
        infinitiv: 'lesen',
        praeteritum: 'las',
        perfekt: 'hat gelesen',
      },
      examples: [
        { de: 'Ich lese ein Buch.', fa: 'من کتاب می‌خوانم.' },
        { de: 'Sie las die Zeitung.', fa: 'او روزنامه خواند.' },
      ],
      meanings: ['خواندن'],
    },
  },
  {
    id: 'iv-3',
    category: 'irregular-verbs',
    subcategory: 'e→a→e',
    front: 'sehen',
    back: {
      verb_forms: {
        infinitiv: 'sehen',
        praeteritum: 'sah',
        perfekt: 'hat gesehen',
      },
      examples: [
        { de: 'Ich sehe einen Film.', fa: 'من فیلم می‌بینم.' },
        { de: 'Wir sahen das Haus.', fa: 'ما خانه را دیدیم.' },
      ],
      meanings: ['دیدن'],
    },
  },
  {
    id: 'iv-4',
    category: 'irregular-verbs',
    subcategory: 'e→a→e',
    front: 'essen',
    back: {
      verb_forms: {
        infinitiv: 'essen',
        praeteritum: 'aß',
        perfekt: 'hat gegessen',
      },
      examples: [
        { de: 'Ich esse gerne Pizza.', fa: 'من دوست دارم پیتزا بخورم.' },
        { de: 'Er aß schnell.', fa: 'او سریع خورد.' },
      ],
      meanings: ['خوردن'],
    },
  },

  // i → a → u pattern
  {
    id: 'iv-5',
    category: 'irregular-verbs',
    subcategory: 'i→a→u',
    front: 'finden',
    back: {
      verb_forms: {
        infinitiv: 'finden',
        praeteritum: 'fand',
        perfekt: 'hat gefunden',
      },
      examples: [
        { de: 'Ich finde den Schlüssel nicht.', fa: 'من کلید را پیدا نمی‌کنم.' },
        { de: 'Sie fand die Lösung.', fa: 'او راه‌حل را پیدا کرد.' },
      ],
      meanings: ['پیدا کردن', 'فکر کردن'],
    },
  },
  {
    id: 'iv-6',
    category: 'irregular-verbs',
    subcategory: 'i→a→u',
    front: 'singen',
    back: {
      verb_forms: {
        infinitiv: 'singen',
        praeteritum: 'sang',
        perfekt: 'hat gesungen',
      },
      examples: [
        { de: 'Sie singt ein Lied.', fa: 'او آهنگ می‌خواند.' },
        { de: 'Wir sangen zusammen.', fa: 'ما با هم آواز خواندیم.' },
      ],
      meanings: ['آواز خواندن'],
    },
  },
  {
    id: 'iv-7',
    category: 'irregular-verbs',
    subcategory: 'i→a→u',
    front: 'trinken',
    back: {
      verb_forms: {
        infinitiv: 'trinken',
        praeteritum: 'trank',
        perfekt: 'hat getrunken',
      },
      examples: [
        { de: 'Ich trinke Wasser.', fa: 'من آب می‌نوشم.' },
        { de: 'Er trank Kaffee.', fa: 'او قهوه نوشید.' },
      ],
      meanings: ['نوشیدن'],
    },
  },
  {
    id: 'iv-8',
    category: 'irregular-verbs',
    subcategory: 'i→a→u',
    front: 'beginnen',
    back: {
      verb_forms: {
        infinitiv: 'beginnen',
        praeteritum: 'begann',
        perfekt: 'hat begonnen',
      },
      examples: [
        { de: 'Der Kurs beginnt um 9 Uhr.', fa: 'دوره ساعت 9 شروع می‌شود.' },
        { de: 'Das Konzert begann pünktlich.', fa: 'کنسرت به موقع شروع شد.' },
      ],
      meanings: ['شروع کردن'],
    },
  },

  // ei → ie → ie pattern
  {
    id: 'iv-9',
    category: 'irregular-verbs',
    subcategory: 'ei→ie→ie',
    front: 'bleiben',
    back: {
      verb_forms: {
        infinitiv: 'bleiben',
        praeteritum: 'blieb',
        perfekt: 'ist geblieben',
      },
      examples: [
        { de: 'Ich bleibe zu Hause.', fa: 'من خانه می‌مانم.' },
        { de: 'Er blieb drei Tage.', fa: 'او سه روز ماند.' },
      ],
      meanings: ['ماندن'],
    },
  },
  {
    id: 'iv-10',
    category: 'irregular-verbs',
    subcategory: 'ei→ie→ie',
    front: 'schreiben',
    back: {
      verb_forms: {
        infinitiv: 'schreiben',
        praeteritum: 'schrieb',
        perfekt: 'hat geschrieben',
      },
      examples: [
        { de: 'Ich schreibe einen Brief.', fa: 'من نامه می‌نویسم.' },
        { de: 'Sie schrieb eine E-Mail.', fa: 'او ایمیل نوشت.' },
      ],
      meanings: ['نوشتن'],
    },
  },

  // a → u → a pattern
  {
    id: 'iv-11',
    category: 'irregular-verbs',
    subcategory: 'a→u→a',
    front: 'fahren',
    back: {
      verb_forms: {
        infinitiv: 'fahren',
        praeteritum: 'fuhr',
        perfekt: 'ist/hat gefahren',
      },
      examples: [
        { de: 'Ich fahre nach Berlin.', fa: 'من به برلین می‌روم.' },
        { de: 'Er fuhr mit dem Auto.', fa: 'او با ماشین رفت.' },
      ],
      meanings: ['رانندگی کردن', 'رفتن (با وسیله)'],
    },
  },
  {
    id: 'iv-12',
    category: 'irregular-verbs',
    subcategory: 'a→u→a',
    front: 'schlafen',
    back: {
      verb_forms: {
        infinitiv: 'schlafen',
        praeteritum: 'schlief',
        perfekt: 'hat geschlafen',
      },
      examples: [
        { de: 'Ich schlafe acht Stunden.', fa: 'من هشت ساعت می‌خوابم.' },
        { de: 'Das Baby schlief tief.', fa: 'بچه عمیق خوابیده بود.' },
      ],
      meanings: ['خوابیدن'],
    },
  },

  // e → o → o pattern
  {
    id: 'iv-13',
    category: 'irregular-verbs',
    subcategory: 'e→o→o',
    front: 'nehmen',
    back: {
      verb_forms: {
        infinitiv: 'nehmen',
        praeteritum: 'nahm',
        perfekt: 'hat genommen',
      },
      examples: [
        { de: 'Ich nehme den Bus.', fa: 'من اتوبوس را می‌گیرم.' },
        { de: 'Sie nahm das Buch.', fa: 'او کتاب را گرفت.' },
      ],
      meanings: ['گرفتن'],
    },
  },
  {
    id: 'iv-14',
    category: 'irregular-verbs',
    subcategory: 'e→o→o',
    front: 'sprechen',
    back: {
      verb_forms: {
        infinitiv: 'sprechen',
        praeteritum: 'sprach',
        perfekt: 'hat gesprochen',
      },
      examples: [
        { de: 'Ich spreche Deutsch.', fa: 'من آلمانی صحبت می‌کنم.' },
        { de: 'Er sprach mit dem Chef.', fa: 'او با رئیس صحبت کرد.' },
      ],
      meanings: ['صحبت کردن'],
    },
  },

  // Completely irregular
  {
    id: 'iv-15',
    category: 'irregular-verbs',
    subcategory: 'Komplett unregelmäßig',
    front: 'sein',
    back: {
      verb_forms: {
        infinitiv: 'sein',
        praeteritum: 'war',
        perfekt: 'ist gewesen',
      },
      examples: [
        { de: 'Ich bin Student.', fa: 'من دانشجو هستم.' },
        { de: 'Er war gestern hier.', fa: 'او دیروز اینجا بود.' },
      ],
      meanings: ['بودن'],
    },
  },
  {
    id: 'iv-16',
    category: 'irregular-verbs',
    subcategory: 'Komplett unregelmäßig',
    front: 'haben',
    back: {
      verb_forms: {
        infinitiv: 'haben',
        praeteritum: 'hatte',
        perfekt: 'hat gehabt',
      },
      examples: [
        { de: 'Ich habe Zeit.', fa: 'من وقت دارم.' },
        { de: 'Sie hatte Glück.', fa: 'او شانس آورد.' },
      ],
      meanings: ['داشتن'],
    },
  },
  {
    id: 'iv-17',
    category: 'irregular-verbs',
    subcategory: 'Komplett unregelmäßig',
    front: 'werden',
    back: {
      verb_forms: {
        infinitiv: 'werden',
        praeteritum: 'wurde',
        perfekt: 'ist geworden',
      },
      examples: [
        { de: 'Ich werde Arzt.', fa: 'من دکتر می‌شوم.' },
        { de: 'Es wurde kalt.', fa: 'سرد شد.' },
      ],
      meanings: ['شدن'],
    },
  },
  {
    id: 'iv-18',
    category: 'irregular-verbs',
    subcategory: 'Komplett unregelmäßig',
    front: 'gehen',
    back: {
      verb_forms: {
        infinitiv: 'gehen',
        praeteritum: 'ging',
        perfekt: 'ist gegangen',
      },
      examples: [
        { de: 'Ich gehe zur Schule.', fa: 'من به مدرسه می‌روم.' },
        { de: 'Sie ging nach Hause.', fa: 'او به خانه رفت.' },
      ],
      meanings: ['رفتن (پیاده)'],
    },
  },
  {
    id: 'iv-19',
    category: 'irregular-verbs',
    subcategory: 'Komplett unregelmäßig',
    front: 'kommen',
    back: {
      verb_forms: {
        infinitiv: 'kommen',
        praeteritum: 'kam',
        perfekt: 'ist gekommen',
      },
      examples: [
        { de: 'Ich komme aus dem Iran.', fa: 'من از ایران می‌آیم.' },
        { de: 'Er kam zu spät.', fa: 'او دیر آمد.' },
      ],
      meanings: ['آمدن'],
    },
  },
  {
    id: 'iv-20',
    category: 'irregular-verbs',
    subcategory: 'Komplett unregelmäßig',
    front: 'wissen',
    back: {
      verb_forms: {
        infinitiv: 'wissen',
        praeteritum: 'wusste',
        perfekt: 'hat gewusst',
      },
      examples: [
        { de: 'Ich weiß die Antwort nicht.', fa: 'من جواب را نمی‌دانم.' },
        { de: 'Er wusste es nicht.', fa: 'او آن را نمی‌دانست.' },
      ],
      meanings: ['دانستن'],
    },
  },
];

// ============================================================================
// VERBS/ADJECTIVES WITH DATIV/GENITIV
// ============================================================================

const verbsAdjectivesWithCasesCards: StudyCard[] = [
  // Verbs with Dativ
  {
    id: 'va-d-1',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Verben mit Dativ',
    front: 'helfen',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Ich helfe dir gern.', fa: 'من با کمال میل به تو کمک می‌کنم.' },
        { de: 'Er hilft seiner Mutter.', fa: 'او به مادرش کمک می‌کند.' },
      ],
      meanings: ['به کسی کمک کردن'],
    },
  },
  {
    id: 'va-d-2',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Verben mit Dativ',
    front: 'danken',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Ich danke Ihnen herzlich.', fa: 'از شما صمیمانه تشکر می‌کنم.' },
        { de: 'Wir danken dem Lehrer.', fa: 'ما از معلم تشکر می‌کنیم.' },
      ],
      meanings: ['از کسی تشکر کردن'],
    },
  },
  {
    id: 'va-d-3',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Verben mit Dativ',
    front: 'gefallen',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Das Buch gefällt mir.', fa: 'کتاب مورد پسند من است.' },
        { de: 'Die Stadt gefällt ihr sehr.', fa: 'شهر خیلی برایش دلپذیر است.' },
      ],
      meanings: ['مورد پسند کسی بودن'],
    },
  },
  {
    id: 'va-d-4',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Verben mit Dativ',
    front: 'gehören',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Das Auto gehört meinem Vater.', fa: 'ماشین متعلق به پدرم است.' },
        { de: 'Dieses Buch gehört mir.', fa: 'این کتاب مال من است.' },
      ],
      meanings: ['متعلق به کسی بودن'],
    },
  },
  {
    id: 'va-d-5',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Verben mit Dativ',
    front: 'gratulieren',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Ich gratuliere dir zum Geburtstag!', fa: 'تولدت را به تو تبریک می‌گویم!' },
        { de: 'Wir gratulieren ihm zur bestandenen Prüfung.', fa: 'ما او را برای قبولی در امتحان تبریک می‌گوییم.' },
      ],
      meanings: ['به کسی تبریک گفتن'],
    },
  },
  {
    id: 'va-d-6',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Verben mit Dativ',
    front: 'glauben',
    back: {
      case: 'Dativ (Person) / an + Akk. (Sache)',
      examples: [
        { de: 'Ich glaube dir.', fa: 'من به تو اعتقاد دارم.' },
        { de: 'Sie glaubt an Gott.', fa: 'او به خدا اعتقاد دارد.' },
      ],
      meanings: ['به کسی/چیزی اعتقاد داشتن'],
    },
  },
  {
    id: 'va-d-7',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Verben mit Dativ',
    front: 'schmecken',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Das Essen schmeckt mir gut.', fa: 'غذا برای من خوشمزه است.' },
        { de: 'Wie schmeckt dir der Kuchen?', fa: 'کیک چطور برات؟' },
      ],
      meanings: ['خوشمزه بودن برای کسی'],
    },
  },
  {
    id: 'va-d-8',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Verben mit Dativ',
    front: 'folgen',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Folge mir bitte!', fa: 'لطفا دنبال من بیا!' },
        { de: 'Der Hund folgt seinem Herrn.', fa: 'سگ از صاحبش پیروی می‌کند.' },
      ],
      meanings: ['دنبال کسی رفتن', 'از کسی پیروی کردن'],
    },
  },

  // Adjectives with Dativ
  {
    id: 'va-d-9',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Adjektive mit Dativ',
    front: 'ähnlich',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Sie ist ihrer Mutter ähnlich.', fa: 'او شبیه مادرش است.' },
        { de: 'Das ist meiner Meinung ähnlich.', fa: 'این شبیه نظر من است.' },
      ],
      meanings: ['شبیه به کسی/چیزی'],
    },
  },
  {
    id: 'va-d-10',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Adjektive mit Dativ',
    front: 'bekannt',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Dieser Name ist mir bekannt.', fa: 'این اسم برای من آشنا است.' },
        { de: 'Die Regel war ihm nicht bekannt.', fa: 'قانون برای او شناخته شده نبود.' },
      ],
      meanings: ['برای کسی شناخته شده', 'آشنا'],
    },
  },
  {
    id: 'va-d-11',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Adjektive mit Dativ',
    front: 'dankbar',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Ich bin dir sehr dankbar.', fa: 'من از تو بسیار سپاسگزارم.' },
        { de: 'Sie war ihm dankbar für seine Hilfe.', fa: 'او از او برای کمکش سپاسگزار بود.' },
      ],
      meanings: ['سپاسگزار کسی', 'ممنون از کسی'],
    },
  },
  {
    id: 'va-d-12',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Adjektive mit Dativ',
    front: 'fremd',
    back: {
      case: 'Dativ',
      examples: [
        { de: 'Diese Stadt ist mir fremd.', fa: 'این شهر برای من غریبه است.' },
        { de: 'Das Konzept war uns fremd.', fa: 'مفهوم برای ما ناآشنا بود.' },
      ],
      meanings: ['غریبه برای کسی', 'ناآشنا'],
    },
  },

  // Verbs with Genitiv (formal, rare)
  {
    id: 'va-g-1',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Verben mit Genitiv',
    front: 'sich erinnern',
    back: {
      case: 'Genitiv (veraltet/formal), an + Akkusativ (modern)',
      examples: [
        { de: 'Ich erinnere mich des Tages. (formal)', fa: 'من آن روز را به یاد می‌آورم.' },
        { de: 'Ich erinnere mich an den Tag. (modern)', fa: 'من آن روز را به یاد می‌آورم.' },
      ],
      meanings: ['چیزی را به یاد آوردن'],
      notes: ['استفاده از an + Akkusativ در زبان مدرن رایج‌تر است'],
    },
  },
  {
    id: 'va-g-2',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Verben mit Genitiv',
    front: 'gedenken',
    back: {
      case: 'Genitiv',
      examples: [
        { de: 'Wir gedenken der Opfer.', fa: 'ما به یاد قربانیان هستیم.' },
        { de: 'Man gedachte seiner mit Respekt.', fa: 'به او با احترام یاد کردند.' },
      ],
      meanings: ['یاد کسی/چیزی را گرامی داشتن'],
      notes: ['استفاده رسمی و ادبی'],
    },
  },

  // Adjectives with Genitiv (formal)
  {
    id: 'va-g-3',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Adjektive mit Genitiv',
    front: 'würdig',
    back: {
      case: 'Genitiv',
      examples: [
        { de: 'Er ist des Vertrauens würdig.', fa: 'او شایسته اعتماد است.' },
        { de: 'Diese Leistung ist des Lobes würdig.', fa: 'این عملکرد شایسته تحسین است.' },
      ],
      meanings: ['شایسته چیزی'],
      notes: ['استفاده رسمی'],
    },
  },
  {
    id: 'va-g-4',
    category: 'verbs-adjectives-with-cases',
    subcategory: 'Adjektive mit Genitiv',
    front: 'bewusst',
    back: {
      case: 'Genitiv (formal) / sich bewusst sein + Genitiv',
      examples: [
        { de: 'Ich bin mir der Gefahr bewusst.', fa: 'من از خطر آگاه هستم.' },
        { de: 'Er war sich des Problems bewusst.', fa: 'او از مشکل آگاه بود.' },
      ],
      meanings: ['آگاه از چیزی'],
      notes: ['با sich bewusst sein استفاده می‌شود'],
    },
  },
];

// ============================================================================
// STUDY SETS METADATA
// ============================================================================

export const studySets: StudySet[] = [
  {
    id: 'verbs-with-prepositions',
    title: 'Verben mit Präpositionen',
    titleFa: 'افعال با حروف اضافه ثابت',
    description: 'Fixed verb-preposition combinations with their required cases',
    descriptionFa: 'ترکیبات ثابت فعل و حرف اضافه با حالت‌های دستوری مورد نیاز',
    icon: '🔗',
    cardCount: verbsWithPrepositionsCards.length,
  },
  {
    id: 'prepositions-with-cases',
    title: 'Präpositionen mit Kasus',
    titleFa: 'حروف اضافه با حالت‌های دستوری',
    description: 'Prepositions organized by their grammatical cases',
    descriptionFa: 'حروف اضافه دسته‌بندی شده بر اساس حالت‌های دستوری',
    icon: '📐',
    cardCount: prepositionsWithCasesCards.length,
    subcategories: [
      { id: 'Dativ', title: 'Dativ', titleFa: 'داتیو' },
      { id: 'Akkusativ', title: 'Akkusativ', titleFa: 'آکوزاتیو' },
      { id: 'Genitiv', title: 'Genitiv', titleFa: 'گنیتیو' },
    ],
  },
  {
    id: 'irregular-verbs',
    title: 'Unregelmäßige Verben',
    titleFa: 'افعال بی‌قاعده',
    description: 'Irregular verbs organized by vowel change patterns',
    descriptionFa: 'افعال بی‌قاعده دسته‌بندی شده بر اساس الگوی تغییر صدادار',
    icon: '🔄',
    cardCount: irregularVerbsCards.length,
    subcategories: [
      { id: 'e→a→e', title: 'e → a → e', titleFa: 'e → a → e' },
      { id: 'i→a→u', title: 'i → a → u', titleFa: 'i → a → u' },
      { id: 'ei→ie→ie', title: 'ei → ie → ie', titleFa: 'ei → ie → ie' },
      { id: 'a→u→a', title: 'a → u → a', titleFa: 'a → u → a' },
      { id: 'e→o→o', title: 'e → o → o', titleFa: 'e → o → o' },
      { id: 'Komplett unregelmäßig', title: 'Komplett unregelmäßig', titleFa: 'کاملاً بی‌قاعده' },
    ],
  },
  {
    id: 'verbs-adjectives-with-cases',
    title: 'Verben/Adjektive mit Kasus',
    titleFa: 'افعال و صفات با حالت‌های دستوری',
    description: 'Verbs and adjectives requiring Dativ or Genitiv',
    descriptionFa: 'افعال و صفاتی که به داتیو یا گنیتیو نیاز دارند',
    icon: '📝',
    cardCount: verbsAdjectivesWithCasesCards.length,
    subcategories: [
      { id: 'Verben mit Dativ', title: 'Verben mit Dativ', titleFa: 'افعال با داتیو' },
      { id: 'Adjektive mit Dativ', title: 'Adjektive mit Dativ', titleFa: 'صفات با داتیو' },
      { id: 'Verben mit Genitiv', title: 'Verben mit Genitiv', titleFa: 'افعال با گنیتیو' },
      { id: 'Adjektive mit Genitiv', title: 'Adjektive mit Genitiv', titleFa: 'صفات با گنیتیو' },
    ],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getAllStudyCards(): StudyCard[] {
  return [
    ...verbsWithPrepositionsCards,
    ...prepositionsWithCasesCards,
    ...irregularVerbsCards,
    ...verbsAdjectivesWithCasesCards,
  ];
}

export function getStudyCardsByCategory(category: StudySetCategory): StudyCard[] {
  return getAllStudyCards().filter((card) => card.category === category);
}

export function getStudyCardsBySubcategory(
  category: StudySetCategory,
  subcategory: string
): StudyCard[] {
  return getStudyCardsByCategory(category).filter(
    (card) => card.subcategory === subcategory
  );
}

export function getStudySet(category: StudySetCategory): StudySet | undefined {
  return studySets.find((set) => set.id === category);
}
