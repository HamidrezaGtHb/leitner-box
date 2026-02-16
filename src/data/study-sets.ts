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
  {
    id: 'vp-21',
    category: 'verbs-with-prepositions',
    front: 'abbringen',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Niemand kann mich von meiner Meinung abbringen.', fa: 'هیچ کس نمی‌تواند من را از نظرم منصرف کند.' },
      ],
      meanings: ['منصرف کردن از'],
    },
  },
  {
    id: 'vp-22',
    category: 'verbs-with-prepositions',
    front: 'abhängen',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Das hängt vom Wetter ab.', fa: 'این بستگی به هوا دارد.' },
      ],
      meanings: ['بستگی داشتن به'],
    },
  },
  {
    id: 'vp-23',
    category: 'verbs-with-prepositions',
    front: 'adressieren',
    back: {
      preposition: 'an',
      case: 'Akkusativ',
      examples: [
        { de: 'Der Brief ist an den Chef adressiert.', fa: 'نامه به رئیس آدرس شده است.' },
      ],
      meanings: ['آدرس دادن به', 'خطاب کردن به'],
    },
  },
  {
    id: 'vp-24',
    category: 'verbs-with-prepositions',
    front: 'ändern',
    back: {
      preposition: 'an',
      case: 'Dativ',
      examples: [
        { de: 'Ich möchte etwas an meinem Plan ändern.', fa: 'می‌خواهم چیزی در برنامه‌ام تغییر دهم.' },
      ],
      meanings: ['چیزی را تغییر دادن'],
    },
  },
  {
    id: 'vp-25',
    category: 'verbs-with-prepositions',
    front: 'anregen',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Das Buch regt zum Nachdenken an.', fa: 'کتاب به فکر کردن برمی‌انگیزد.' },
      ],
      meanings: ['تحریک کردن به', 'ترغیب کردن به'],
    },
  },
  {
    id: 'vp-26',
    category: 'verbs-with-prepositions',
    front: 'ansehen',
    back: {
      preposition: 'als',
      case: '-',
      examples: [
        { de: 'Ich sehe ihn als Freund an.', fa: 'من او را به عنوان دوست می‌بینم.' },
      ],
      meanings: ['به عنوان ... در نظر گرفتن'],
    },
  },
  {
    id: 'vp-27',
    category: 'verbs-with-prepositions',
    front: 'anrufen',
    back: {
      preposition: 'bei',
      case: 'Dativ',
      examples: [
        { de: 'Ich rufe bei der Firma an.', fa: 'من به شرکت زنگ می‌زنم.' },
      ],
      meanings: ['به ... تلفن کردن'],
    },
  },
  {
    id: 'vp-28',
    category: 'verbs-with-prepositions',
    front: 'antworten',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich antworte auf deine Frage.', fa: 'من به سوالت پاسخ می‌دهم.' },
      ],
      meanings: ['پاسخ دادن به'],
    },
  },
  {
    id: 'vp-29',
    category: 'verbs-with-prepositions',
    front: 'arbeiten',
    back: {
      preposition: 'an / bei',
      case: 'Dativ',
      examples: [
        { de: 'Ich arbeite an einem Projekt.', fa: 'من روی یک پروژه کار می‌کنم.' },
        { de: 'Er arbeitet bei Siemens.', fa: 'او در زیمنس کار می‌کند.' },
      ],
      meanings: ['روی چیزی کار کردن (an)', 'در ... کار کردن (bei)'],
    },
  },
  {
    id: 'vp-30',
    category: 'verbs-with-prepositions',
    front: 'auffordern',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Ich fordere dich zum Handeln auf.', fa: 'من تو را به عمل فرا می‌خوانم.' },
      ],
      meanings: ['دعوت کردن به', 'فرا خواندن به'],
    },
  },
  {
    id: 'vp-31',
    category: 'verbs-with-prepositions',
    front: 'aufhören',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Hör endlich mit dem Lärm auf!', fa: 'دیگه سر و صدا کردن را تمام کن!' },
      ],
      meanings: ['دست برداشتن از', 'تمام کردن'],
    },
  },
  {
    id: 'vp-32',
    category: 'verbs-with-prepositions',
    front: 'aufpassen',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Pass auf die Kinder auf!', fa: 'مواظب بچه‌ها باش!' },
      ],
      meanings: ['مواظب چیزی/کسی بودن'],
    },
  },
  {
    id: 'vp-33',
    category: 'verbs-with-prepositions',
    front: 'ausgehen',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Ich gehe davon aus, dass du kommst.', fa: 'من فرض می‌کنم که می‌آیی.' },
      ],
      meanings: ['فرض کردن', 'از چیزی نتیجه گرفتن'],
    },
  },
  {
    id: 'vp-34',
    category: 'verbs-with-prepositions',
    front: 'basieren',
    back: {
      preposition: 'auf',
      case: 'Dativ',
      examples: [
        { de: 'Diese Theorie basiert auf Fakten.', fa: 'این تئوری بر اساس واقعیت‌هاست.' },
      ],
      meanings: ['بر پایه چیزی بودن', 'مبتنی بر ... بودن'],
    },
  },
  {
    id: 'vp-35',
    category: 'verbs-with-prepositions',
    front: 'befördern',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Er wurde zum Manager befördert.', fa: 'او به مدیر ارتقا یافت.' },
      ],
      meanings: ['ارتقا دادن به'],
    },
  },
  {
    id: 'vp-36',
    category: 'verbs-with-prepositions',
    front: 'beglückwünschen',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Ich beglückwünsche dich zum Erfolg.', fa: 'من تو را به موفقیت تبریک می‌گویم.' },
      ],
      meanings: ['تبریک گفتن به'],
    },
  },
  {
    id: 'vp-37',
    category: 'verbs-with-prepositions',
    front: 'beharren',
    back: {
      preposition: 'auf',
      case: 'Dativ',
      examples: [
        { de: 'Er beharrt auf seiner Meinung.', fa: 'او بر نظرش پافشاری می‌کند.' },
      ],
      meanings: ['پافشاری کردن بر'],
    },
  },
  {
    id: 'vp-38',
    category: 'verbs-with-prepositions',
    front: 'beitragen',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Sport trägt zur Gesundheit bei.', fa: 'ورزش به سلامتی کمک می‌کند.' },
      ],
      meanings: ['سهم داشتن در', 'کمک کردن به'],
    },
  },
  {
    id: 'vp-39',
    category: 'verbs-with-prepositions',
    front: 'sich bemühen',
    back: {
      preposition: 'um',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bemühe mich um eine Lösung.', fa: 'من در تلاش برای یک راه‌حل هستم.' },
      ],
      meanings: ['تلاش کردن برای'],
    },
  },
  {
    id: 'vp-40',
    category: 'verbs-with-prepositions',
    front: 'berichten',
    back: {
      preposition: 'über / von',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Er berichtet über seine Reise.', fa: 'او درباره سفرش گزارش می‌دهد.' },
      ],
      meanings: ['گزارش دادن درباره'],
    },
  },
  {
    id: 'vp-41',
    category: 'verbs-with-prepositions',
    front: 'beschreiben',
    back: {
      preposition: 'als',
      case: '-',
      examples: [
        { de: 'Sie beschreibt ihn als nett.', fa: 'او را مهربان توصیف می‌کند.' },
      ],
      meanings: ['به عنوان ... توصیف کردن'],
    },
  },
  {
    id: 'vp-42',
    category: 'verbs-with-prepositions',
    front: 'bestehen',
    back: {
      preposition: 'auf / aus',
      case: 'Dativ',
      examples: [
        { de: 'Ich bestehe auf meinem Recht.', fa: 'من بر حق خود پافشاری می‌کنم.' },
        { de: 'Das Haus besteht aus Holz.', fa: 'خانه از چوب ساخته شده است.' },
      ],
      meanings: ['پافشاری کردن بر (auf)', 'ساخته شده از (aus)'],
    },
  },
  {
    id: 'vp-43',
    category: 'verbs-with-prepositions',
    front: 'bezeichnen',
    back: {
      preposition: 'als',
      case: '-',
      examples: [
        { de: 'Man bezeichnet ihn als Experten.', fa: 'او را به عنوان متخصص نامیده می‌شود.' },
      ],
      meanings: ['نامیدن به عنوان'],
    },
  },
  {
    id: 'vp-44',
    category: 'verbs-with-prepositions',
    front: 'sich beziehen',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich beziehe mich auf Ihren Brief.', fa: 'من به نامه شما اشاره می‌کنم.' },
      ],
      meanings: ['اشاره کردن به', 'مربوط بودن به'],
    },
  },
  {
    id: 'vp-45',
    category: 'verbs-with-prepositions',
    front: 'bringen',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Das bringt mich zum Lachen.', fa: 'این من را به خنده می‌اندازد.' },
      ],
      meanings: ['وادار کردن به'],
    },
  },
  {
    id: 'vp-46',
    category: 'verbs-with-prepositions',
    front: 'sich entschließen',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Ich habe mich zu einer Reise entschlossen.', fa: 'من تصمیم به سفر گرفتم.' },
      ],
      meanings: ['تصمیم گرفتن به'],
    },
  },
  {
    id: 'vp-47',
    category: 'verbs-with-prepositions',
    front: 'sich entschuldigen',
    back: {
      preposition: 'bei / für',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Ich entschuldige mich bei dir für den Fehler.', fa: 'من از تو برای اشتباه عذرخواهی می‌کنم.' },
      ],
      meanings: ['عذرخواهی کردن از (bei) / برای (für)'],
    },
  },
  {
    id: 'vp-48',
    category: 'verbs-with-prepositions',
    front: 'sich entwickeln',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Er entwickelt sich zu einem guten Spieler.', fa: 'او به یک بازیکن خوب تبدیل می‌شود.' },
      ],
      meanings: ['تبدیل شدن به', 'رشد کردن به'],
    },
  },
  {
    id: 'vp-49',
    category: 'verbs-with-prepositions',
    front: 'sich erholen',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Ich erhole mich von der Krankheit.', fa: 'من از بیماری بهبود می‌یابم.' },
      ],
      meanings: ['بهبود یافتن از'],
    },
  },
  {
    id: 'vp-50',
    category: 'verbs-with-prepositions',
    front: 'erkennen',
    back: {
      preposition: 'an',
      case: 'Dativ',
      examples: [
        { de: 'Ich erkenne ihn an seiner Stimme.', fa: 'من او را از صدایش می‌شناسم.' },
      ],
      meanings: ['شناختن از روی'],
    },
  },
  {
    id: 'vp-51',
    category: 'verbs-with-prepositions',
    front: 'sich erkundigen',
    back: {
      preposition: 'bei / nach',
      case: 'Dativ',
      examples: [
        { de: 'Ich erkundige mich bei ihm nach dem Weg.', fa: 'من از او درباره راه پرس و جو می‌کنم.' },
      ],
      meanings: ['از (bei) ... درباره (nach) ... پرس و جو کردن'],
    },
  },
  {
    id: 'vp-52',
    category: 'verbs-with-prepositions',
    front: 'sich ernähren',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Er ernährt sich von Gemüse.', fa: 'او از سبزیجات تغذیه می‌کند.' },
      ],
      meanings: ['تغذیه کردن از'],
    },
  },
  {
    id: 'vp-53',
    category: 'verbs-with-prepositions',
    front: 'erschrecken',
    back: {
      preposition: 'über / vor',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Ich bin über die Nachricht erschrocken.', fa: 'من از خبر ترسیدم.' },
      ],
      meanings: ['از چیزی ترسیدن', 'از چیزی شوکه شدن'],
    },
  },
  {
    id: 'vp-54',
    category: 'verbs-with-prepositions',
    front: 'erwarten',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Was erwartest du von mir?', fa: 'از من چه انتظاری داری؟' },
      ],
      meanings: ['انتظار داشتن از'],
    },
  },
  {
    id: 'vp-55',
    category: 'verbs-with-prepositions',
    front: 'erzählen',
    back: {
      preposition: 'von / über',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Er erzählt von seiner Reise.', fa: 'او از سفرش تعریف می‌کند.' },
      ],
      meanings: ['تعریف کردن از/درباره'],
    },
  },
  {
    id: 'vp-56',
    category: 'verbs-with-prepositions',
    front: 'erziehen',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Kinder zu Selbstständigkeit erziehen.', fa: 'بچه‌ها را به استقلال تربیت کردن.' },
      ],
      meanings: ['تربیت کردن به'],
    },
  },
  {
    id: 'vp-57',
    category: 'verbs-with-prepositions',
    front: 'es geht',
    back: {
      preposition: 'um',
      case: 'Akkusativ',
      examples: [
        { de: 'Es geht um Leben und Tod.', fa: 'موضوع مرگ و زندگی است.' },
      ],
      meanings: ['موضوع ... است', 'درباره ... است'],
    },
  },
  {
    id: 'vp-58',
    category: 'verbs-with-prepositions',
    front: 'es handelt sich',
    back: {
      preposition: 'um',
      case: 'Akkusativ',
      examples: [
        { de: 'Es handelt sich um ein Missverständnis.', fa: 'این یک سوءتفاهم است.' },
      ],
      meanings: ['موضوع/مسئله ... است'],
    },
  },
  {
    id: 'vp-59',
    category: 'verbs-with-prepositions',
    front: 'es kommt ... an',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Es kommt auf dich an.', fa: 'بستگی به تو دارد.' },
      ],
      meanings: ['بستگی به ... داشتن'],
    },
  },
  {
    id: 'vp-60',
    category: 'verbs-with-prepositions',
    front: 'fliehen',
    back: {
      preposition: 'vor',
      case: 'Dativ',
      examples: [
        { de: 'Sie fliehen vor der Gefahr.', fa: 'آنها از خطر فرار می‌کنند.' },
      ],
      meanings: ['فرار کردن از'],
    },
  },
  {
    id: 'vp-61',
    category: 'verbs-with-prepositions',
    front: 'flüchten',
    back: {
      preposition: 'vor',
      case: 'Dativ',
      examples: [
        { de: 'Sie flüchteten vor dem Krieg.', fa: 'آنها از جنگ فرار کردند.' },
      ],
      meanings: ['فرار کردن از'],
    },
  },
  {
    id: 'vp-62',
    category: 'verbs-with-prepositions',
    front: 'fordern',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Was forderst du von mir?', fa: 'از من چه می‌خواهی؟' },
      ],
      meanings: ['درخواست کردن از', 'مطالبه کردن از'],
    },
  },
  {
    id: 'vp-63',
    category: 'verbs-with-prepositions',
    front: 'fragen',
    back: {
      preposition: 'nach',
      case: 'Dativ',
      examples: [
        { de: 'Ich frage nach dem Weg.', fa: 'من درباره راه سوال می‌کنم.' },
      ],
      meanings: ['پرسیدن درباره'],
    },
  },
  {
    id: 'vp-64',
    category: 'verbs-with-prepositions',
    front: 'führen',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Das führt zu Problemen.', fa: 'این به مشکلات منجر می‌شود.' },
      ],
      meanings: ['منجر شدن به'],
    },
  },
  {
    id: 'vp-65',
    category: 'verbs-with-prepositions',
    front: 'sich fürchten',
    back: {
      preposition: 'vor',
      case: 'Dativ',
      examples: [
        { de: 'Das Kind fürchtet sich vor der Dunkelheit.', fa: 'بچه از تاریکی می‌ترسد.' },
      ],
      meanings: ['ترسیدن از'],
    },
  },
  {
    id: 'vp-66',
    category: 'verbs-with-prepositions',
    front: 'sich gewöhnen',
    back: {
      preposition: 'an',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich gewöhne mich an das Klima.', fa: 'من به آب و هوا عادت می‌کنم.' },
      ],
      meanings: ['عادت کردن به'],
    },
  },
  {
    id: 'vp-67',
    category: 'verbs-with-prepositions',
    front: 'gliedern',
    back: {
      preposition: 'in',
      case: 'Akkusativ',
      examples: [
        { de: 'Der Text gliedert sich in drei Teile.', fa: 'متن به سه بخش تقسیم می‌شود.' },
      ],
      meanings: ['تقسیم کردن به'],
    },
  },
  {
    id: 'vp-68',
    category: 'verbs-with-prepositions',
    front: 'halten',
    back: {
      preposition: 'für / von',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Ich halte ihn für ehrlich.', fa: 'من او را صادق می‌دانم.' },
        { de: 'Was hältst du von der Idee?', fa: 'درباره این ایده چه فکر می‌کنی؟' },
      ],
      meanings: ['به حساب آوردن (für)', 'نظر داشتن درباره (von)'],
    },
  },
  {
    id: 'vp-69',
    category: 'verbs-with-prepositions',
    front: 'handeln',
    back: {
      preposition: 'mit / von',
      case: 'Dativ',
      examples: [
        { de: 'Das Buch handelt vom Krieg.', fa: 'کتاب درباره جنگ است.' },
        { de: 'Er handelt mit Autos.', fa: 'او در ماشین معامله می‌کند.' },
      ],
      meanings: ['درباره ... بودن (von)', 'معامله کردن با (mit)'],
    },
  },
  {
    id: 'vp-70',
    category: 'verbs-with-prepositions',
    front: 'hören',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Hör auf mich!', fa: 'به حرف من گوش کن!' },
      ],
      meanings: ['گوش دادن به'],
    },
  },
  {
    id: 'vp-71',
    category: 'verbs-with-prepositions',
    front: 'kämpfen',
    back: {
      preposition: 'für / gegen / um',
      case: 'Akkusativ',
      examples: [
        { de: 'Wir kämpfen für Gerechtigkeit.', fa: 'ما برای عدالت مبارزه می‌کنیم.' },
        { de: 'Sie kämpfen gegen Armut.', fa: 'آنها علیه فقر مبارزه می‌کنند.' },
      ],
      meanings: ['مبارزه کردن برای/علیه/برای کسب'],
    },
  },
  {
    id: 'vp-72',
    category: 'verbs-with-prepositions',
    front: 'klagen',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Er klagt über Kopfschmerzen.', fa: 'او از سردرد شکایت می‌کند.' },
      ],
      meanings: ['شکایت کردن از'],
    },
  },
  {
    id: 'vp-73',
    category: 'verbs-with-prepositions',
    front: 'sich konzentrieren',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Konzentrier dich auf die Arbeit!', fa: 'روی کار تمرکز کن!' },
      ],
      meanings: ['تمرکز کردن روی'],
    },
  },
  {
    id: 'vp-74',
    category: 'verbs-with-prepositions',
    front: 'lachen',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Wir lachen über den Witز.', fa: 'ما از شوخی می‌خندیم.' },
      ],
      meanings: ['خندیدن به/از'],
    },
  },
  {
    id: 'vp-75',
    category: 'verbs-with-prepositions',
    front: 'leiden',
    back: {
      preposition: 'an / unter',
      case: 'Dativ',
      examples: [
        { de: 'Er leidet an einer Krankheit.', fa: 'او از بیماری رنج می‌برد.' },
        { de: 'Sie leidet unter Stress.', fa: 'او از استرس رنج می‌برد.' },
      ],
      meanings: ['رنج بردن از'],
    },
  },
  {
    id: 'vp-76',
    category: 'verbs-with-prepositions',
    front: 'liegen',
    back: {
      preposition: 'an',
      case: 'Dativ',
      examples: [
        { de: 'Das liegt an dir.', fa: 'این بستگی به تو دارد.' },
      ],
      meanings: ['دلیلش ... است', 'بستگی داشتن به'],
    },
  },
  {
    id: 'vp-77',
    category: 'verbs-with-prepositions',
    front: 'nachdenken',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich denke über das Problem nach.', fa: 'من درباره مشکل فکر می‌کنم.' },
      ],
      meanings: ['فکر کردن درباره'],
    },
  },
  {
    id: 'vp-78',
    category: 'verbs-with-prepositions',
    front: 'neigen',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Er neigt zu Übertreibungen.', fa: 'او تمایل به اغراق دارد.' },
      ],
      meanings: ['تمایل داشتن به'],
    },
  },
  {
    id: 'vp-79',
    category: 'verbs-with-prepositions',
    front: 'passen',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Die Schuhe passen nicht zu meinem Kleid.', fa: 'کفش‌ها با لباسم نمی‌خوانند.' },
      ],
      meanings: ['مناسب بودن برای'],
    },
  },
  {
    id: 'vp-80',
    category: 'verbs-with-prepositions',
    front: 'protestieren',
    back: {
      preposition: 'gegen',
      case: 'Akkusativ',
      examples: [
        { de: 'Sie protestieren gegen die Regierung.', fa: 'آنها علیه دولت اعتراض می‌کنند.' },
      ],
      meanings: ['اعتراض کردن علیه'],
    },
  },
  {
    id: 'vp-81',
    category: 'verbs-with-prepositions',
    front: 'raten',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Ich rate dir zu mehr Sport.', fa: 'من به تو توصیه می‌کنم بیشتر ورزش کنی.' },
      ],
      meanings: ['توصیه کردن به'],
    },
  },
  {
    id: 'vp-82',
    category: 'verbs-with-prepositions',
    front: 'reagieren',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Wie reagierst du auf Kritik?', fa: 'به انتقاد چگونه واکنش نشان می‌دهی؟' },
      ],
      meanings: ['واکنش نشان دادن به'],
    },
  },
  {
    id: 'vp-83',
    category: 'verbs-with-prepositions',
    front: 'reden',
    back: {
      preposition: 'mit / über',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Ich rede mit ihm über Politik.', fa: 'من با او درباره سیاست صحبت می‌کنم.' },
      ],
      meanings: ['صحبت کردن با (mit) / درباره (über)'],
    },
  },
  {
    id: 'vp-84',
    category: 'verbs-with-prepositions',
    front: 'riechen',
    back: {
      preposition: 'nach',
      case: 'Dativ',
      examples: [
        { de: 'Es riecht nach Essen.', fa: 'بوی غذا می‌آید.' },
      ],
      meanings: ['بو دادن'],
    },
  },
  {
    id: 'vp-85',
    category: 'verbs-with-prepositions',
    front: 'rufen',
    back: {
      preposition: 'nach',
      case: 'Dativ',
      examples: [
        { de: 'Sie ruft nach Hilfe.', fa: 'او کمک می‌خواهد.' },
      ],
      meanings: ['صدا زدن', 'درخواست کردن'],
    },
  },
  {
    id: 'vp-86',
    category: 'verbs-with-prepositions',
    front: 'schicken',
    back: {
      preposition: 'an',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich schicke den Brief an meinen Freund.', fa: 'من نامه را برای دوستم می‌فرستم.' },
      ],
      meanings: ['فرستادن به'],
    },
  },
  {
    id: 'vp-87',
    category: 'verbs-with-prepositions',
    front: 'schimpfen',
    back: {
      preposition: 'auf / über / mit',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Sie schimpft auf das Wetter.', fa: 'او از هوا شکایت می‌کند.' },
      ],
      meanings: ['غر زدن از', 'شکایت کردن از'],
    },
  },
  {
    id: 'vp-88',
    category: 'verbs-with-prepositions',
    front: 'schmecken',
    back: {
      preposition: 'nach',
      case: 'Dativ',
      examples: [
        { de: 'Das schmeckt nach Zitrone.', fa: 'این طعم لیمو می‌دهد.' },
      ],
      meanings: ['طعم ... دادن'],
    },
  },
  {
    id: 'vp-89',
    category: 'verbs-with-prepositions',
    front: 'sich ängstigen',
    back: {
      preposition: 'um',
      case: 'Akkusativ',
      examples: [
        { de: 'Sie ängstigt sich um ihre Kinder.', fa: 'او نگران فرزندانش است.' },
      ],
      meanings: ['نگران بودن درباره'],
    },
  },
  {
    id: 'vp-90',
    category: 'verbs-with-prepositions',
    front: 'sich anpassen',
    back: {
      preposition: 'an',
      case: 'Akkusativ',
      examples: [
        { de: 'Man muss sich an neue Situationen anpassen.', fa: 'باید خود را با موقعیت‌های جدید وفق داد.' },
      ],
      meanings: ['وفق دادن با', 'سازگار شدن با'],
    },
  },
  {
    id: 'vp-91',
    category: 'verbs-with-prepositions',
    front: 'sich aufregen',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Reg dich nicht über Kleinigkeiten auf!', fa: 'سر چیزهای کوچک عصبانی نشو!' },
      ],
      meanings: ['عصبانی شدن از', 'هیجان‌زده شدن از'],
    },
  },
  {
    id: 'vp-92',
    category: 'verbs-with-prepositions',
    front: 'sich auseinandersetzen',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Ich setze mich mit dem Thema auseinander.', fa: 'من با موضوع درگیر می‌شوم.' },
      ],
      meanings: ['با چیزی درگیر شدن', 'به چیزی پرداختن'],
    },
  },
  {
    id: 'vp-93',
    category: 'verbs-with-prepositions',
    front: 'sich bedanken',
    back: {
      preposition: 'bei / für',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Ich bedanke mich bei dir für die Hilfe.', fa: 'من از تو برای کمک تشکر می‌کنم.' },
      ],
      meanings: ['تشکر کردن از (bei) / برای (für)'],
    },
  },
  {
    id: 'vp-94',
    category: 'verbs-with-prepositions',
    front: 'sich befreien',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Er befreite sich von seinen Ängsten.', fa: 'او خود را از ترس‌هایش رها کرد.' },
      ],
      meanings: ['رها شدن از'],
    },
  },
  {
    id: 'vp-95',
    category: 'verbs-with-prepositions',
    front: 'sich beklagen',
    back: {
      preposition: 'bei / über',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Sie beklagt sich beim Chef über die Arbeit.', fa: 'او نزد رئیس از کار شکایت می‌کند.' },
      ],
      meanings: ['شکایت کردن نزد (bei) / از (über)'],
    },
  },
  {
    id: 'vp-96',
    category: 'verbs-with-prepositions',
    front: 'sich beschweren',
    back: {
      preposition: 'bei / über',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Ich beschwere mich beim Manager über den Service.', fa: 'من نزد مدیر از سرویس شکایت می‌کنم.' },
      ],
      meanings: ['شکایت کردن نزد (bei) / از (über)'],
    },
  },
  {
    id: 'vp-97',
    category: 'verbs-with-prepositions',
    front: 'sich bewerben',
    back: {
      preposition: 'um / bei',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Ich bewerbe mich um die Stelle bei BMW.', fa: 'من برای شغل در BMW درخواست می‌دهم.' },
      ],
      meanings: ['درخواست دادن برای (um) / نزد (bei)'],
    },
  },
  {
    id: 'vp-98',
    category: 'verbs-with-prepositions',
    front: 'sich beziehen',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich beziehe mich auf Ihre E-Mail.', fa: 'من به ایمیل شما اشاره می‌کنم.' },
      ],
      meanings: ['اشاره کردن به', 'مربوط بودن به'],
    },
  },
  {
    id: 'vp-99',
    category: 'verbs-with-prepositions',
    front: 'sorgen',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich sorge für meine Familie.', fa: 'من از خانواده‌ام مراقبت می‌کنم.' },
      ],
      meanings: ['مراقبت کردن از', 'تامین کردن'],
    },
  },
  {
    id: 'vp-100',
    category: 'verbs-with-prepositions',
    front: 'sich sorgen',
    back: {
      preposition: 'um',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich sorge mich um deine Gesundheit.', fa: 'من نگران سلامتی تو هستم.' },
      ],
      meanings: ['نگران بودن درباره'],
    },
  },
  {
    id: 'vp-101',
    category: 'verbs-with-prepositions',
    front: 'sprechen',
    back: {
      preposition: 'mit / über / von',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Ich spreche mit ihm über das Thema.', fa: 'من با او درباره موضوع صحبت می‌کنم.' },
      ],
      meanings: ['صحبت کردن با (mit) / درباره (über/von)'],
    },
  },
  {
    id: 'vp-102',
    category: 'verbs-with-prepositions',
    front: 'stammen',
    back: {
      preposition: 'aus / von',
      case: 'Dativ',
      examples: [
        { de: 'Er stammt aus Berlin.', fa: 'او اهل برلین است.' },
      ],
      meanings: ['اهل ... بودن', 'ریشه داشتن از'],
    },
  },
  {
    id: 'vp-103',
    category: 'verbs-with-prepositions',
    front: 'staunen',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich staune über seine Leistung.', fa: 'من از عملکردش شگفت‌زده شدم.' },
      ],
      meanings: ['شگفت‌زده شدن از'],
    },
  },
  {
    id: 'vp-104',
    category: 'verbs-with-prepositions',
    front: 'sterben',
    back: {
      preposition: 'an',
      case: 'Dativ',
      examples: [
        { de: 'Er starb an einer Krankheit.', fa: 'او بر اثر بیماری مرد.' },
      ],
      meanings: ['مردن بر اثر'],
    },
  },
  {
    id: 'vp-105',
    category: 'verbs-with-prepositions',
    front: 'stimmen',
    back: {
      preposition: 'für / gegen',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich stimme für diesen Vorschlag.', fa: 'من به نفع این پیشنهاد رای می‌دهم.' },
      ],
      meanings: ['رای دادن به نفع/علیه'],
    },
  },
  {
    id: 'vp-106',
    category: 'verbs-with-prepositions',
    front: 'streiten',
    back: {
      preposition: 'über / um / mit',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Sie streiten über Politik.', fa: 'آنها درباره سیاست دعوا می‌کنند.' },
        { de: 'Ich streite mich mit meinem Bruder.', fa: 'من با برادرم دعوا می‌کنم.' },
      ],
      meanings: ['دعوا کردن درباره/با'],
    },
  },
  {
    id: 'vp-107',
    category: 'verbs-with-prepositions',
    front: 'suchen',
    back: {
      preposition: 'nach',
      case: 'Dativ',
      examples: [
        { de: 'Ich suche nach einer Lösung.', fa: 'من به دنبال راه‌حل هستم.' },
      ],
      meanings: ['جستجو کردن', 'دنبال چیزی بودن'],
    },
  },
  {
    id: 'vp-108',
    category: 'verbs-with-prepositions',
    front: 'überzeugen',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Ich überzeuge ihn von meiner Idee.', fa: 'من او را از ایده‌ام متقاعد می‌کنم.' },
      ],
      meanings: ['متقاعد کردن از'],
    },
  },
  {
    id: 'vp-109',
    category: 'verbs-with-prepositions',
    front: 'sich verabreden',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Ich verabrede mich mit ihr für morgen.', fa: 'من با او برای فردا قرار می‌گذارم.' },
      ],
      meanings: ['قرار گذاشتن با'],
    },
  },
  {
    id: 'vp-110',
    category: 'verbs-with-prepositions',
    front: 'sich verlassen',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Du kannst dich auf mich verlassen.', fa: 'می‌توانی روی من حساب کنی.' },
      ],
      meanings: ['تکیه کردن به', 'اعتماد کردن به'],
    },
  },
  {
    id: 'vp-111',
    category: 'verbs-with-prepositions',
    front: 'sich verlieben',
    back: {
      preposition: 'in',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich habe mich in sie verliebt.', fa: 'من عاشق او شدم.' },
      ],
      meanings: ['عاشق شدن'],
    },
  },
  {
    id: 'vp-112',
    category: 'verbs-with-prepositions',
    front: 'sich verstehen',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Er versteht sich auf Computer.', fa: 'او در کامپیوتر مهارت دارد.' },
      ],
      meanings: ['در چیزی مهارت داشتن'],
    },
  },
  {
    id: 'vp-113',
    category: 'verbs-with-prepositions',
    front: 'vertrauen',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich vertraue auf Gott.', fa: 'من به خدا اعتماد دارم.' },
      ],
      meanings: ['اعتماد داشتن به'],
    },
  },
  {
    id: 'vp-114',
    category: 'verbs-with-prepositions',
    front: 'verzichten',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich verzichte auf Zucker.', fa: 'من از شکر صرف‌نظر می‌کنم.' },
      ],
      meanings: ['صرف‌نظر کردن از', 'انصراف دادن از'],
    },
  },
  {
    id: 'vp-115',
    category: 'verbs-with-prepositions',
    front: 'warnen',
    back: {
      preposition: 'vor',
      case: 'Dativ',
      examples: [
        { de: 'Ich warne dich vor der Gefahr.', fa: 'من تو را از خطر هشدار می‌دهم.' },
      ],
      meanings: ['هشدار دادن از'],
    },
  },
  {
    id: 'vp-116',
    category: 'verbs-with-prepositions',
    front: 'wählen',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Sie wählten ihn zum Präsidenten.', fa: 'آنها او را به عنوان رئیس‌جمهور انتخاب کردند.' },
      ],
      meanings: ['انتخاب کردن به عنوان'],
    },
  },
  {
    id: 'vp-117',
    category: 'verbs-with-prepositions',
    front: 'weinen',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Sie weint über ihr Schicksal.', fa: 'او بر سرنوشتش گریه می‌کند.' },
      ],
      meanings: ['گریه کردن بر'],
    },
  },
  {
    id: 'vp-118',
    category: 'verbs-with-prepositions',
    front: 'werden',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Er wirbt für ein Produkt.', fa: 'او برای یک محصول تبلیغ می‌کند.' },
      ],
      meanings: ['تبلیغ کردن برای'],
    },
  },
  {
    id: 'vp-119',
    category: 'verbs-with-prepositions',
    front: 'wirken',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Musik wirkt beruhigend auf mich.', fa: 'موسیقی بر من آرامش‌بخش است.' },
      ],
      meanings: ['تاثیر گذاشتن بر'],
    },
  },
  {
    id: 'vp-120',
    category: 'verbs-with-prepositions',
    front: 'wissen',
    back: {
      preposition: 'von / über',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Ich weiß nichts von diesem Plan.', fa: 'من چیزی از این طرح نمی‌دانم.' },
      ],
      meanings: ['دانستن از/درباره'],
    },
  },
  {
    id: 'vp-121',
    category: 'verbs-with-prepositions',
    front: 'sich wundern',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich wundere mich über sein Verhalten.', fa: 'من از رفتارش تعجب می‌کنم.' },
      ],
      meanings: ['تعجب کردن از'],
    },
  },
  {
    id: 'vp-122',
    category: 'verbs-with-prepositions',
    front: 'zielen',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Er zielt auf das Tor.', fa: 'او به سمت دروازه نشانه می‌گیرد.' },
      ],
      meanings: ['نشانه گرفتن به سمت', 'هدف گرفتن'],
    },
  },
  {
    id: 'vp-123',
    category: 'verbs-with-prepositions',
    front: 'zögern',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Zögere nicht mit der Entscheidung!', fa: 'در تصمیم‌گیری تردید نکن!' },
      ],
      meanings: ['تردید کردن در'],
    },
  },
  {
    id: 'vp-124',
    category: 'verbs-with-prepositions',
    front: 'zwingen',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Man kann niemanden zum Glück zwingen.', fa: 'نمی‌توان کسی را به خوشبختی مجبور کرد.' },
      ],
      meanings: ['مجبور کردن به'],
    },
  },
];

// ============================================================================
// NOUNS WITH PREPOSITIONS (Nomen mit festen Präpositionen)
// ============================================================================

const nounsWithPrepositionsCards: StudyCard[] = [
  {
    id: 'np-1',
    category: 'nouns-with-prepositions',
    front: 'die Abhängigkeit',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Die Abhängigkeit vom Alkohol ist gefährlich.', fa: 'وابستگی به الکل خطرناک است.' },
      ],
      meanings: ['وابستگی'],
      notes: ['مشتق از فعل abhängen'],
    },
  },
  {
    id: 'np-2',
    category: 'nouns-with-prepositions',
    front: 'die Angst',
    back: {
      preposition: 'vor / um',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Die Angst vor der Prüfung ist groß.', fa: 'ترس از امتحان زیاد است.' },
        { de: 'Die Angst um die Kinder ist verständlich.', fa: 'نگرانی برای بچه‌ها قابل درک است.' },
      ],
      meanings: ['ترس', 'نگرانی'],
    },
  },
  {
    id: 'np-3',
    category: 'nouns-with-prepositions',
    front: 'die Antwort',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Antwort auf deine Frage ist schwierig.', fa: 'پاسخ به سوالت سخت است.' },
      ],
      meanings: ['پاسخ', 'جواب'],
    },
  },
  {
    id: 'np-4',
    category: 'nouns-with-prepositions',
    front: 'der Ärger',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Der Ärger über den Fehler war groß.', fa: 'عصبانیت از اشتباه زیاد بود.' },
      ],
      meanings: ['عصبانیت', 'خشم'],
    },
  },
  {
    id: 'np-5',
    category: 'nouns-with-prepositions',
    front: 'die Aufmerksamkeit',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Aufmerksamkeit auf Details ist wichtig.', fa: 'توجه به جزئیات مهم است.' },
      ],
      meanings: ['توجه', 'دقت'],
    },
  },
  {
    id: 'np-6',
    category: 'nouns-with-prepositions',
    front: 'die Bitte',
    back: {
      preposition: 'um',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Bitte um Hilfe wurde erhört.', fa: 'درخواست کمک شنیده شد.' },
      ],
      meanings: ['درخواست', 'تقاضا'],
    },
  },
  {
    id: 'np-7',
    category: 'nouns-with-prepositions',
    front: 'die Entscheidung',
    back: {
      preposition: 'für / gegen',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Entscheidung für diesen Job war richtig.', fa: 'تصمیم برای این شغل درست بود.' },
      ],
      meanings: ['تصمیم'],
      notes: ['مشتق از فعل sich entscheiden'],
    },
  },
  {
    id: 'np-8',
    category: 'nouns-with-prepositions',
    front: 'die Freude',
    back: {
      preposition: 'an / auf / über',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Die Freude am Leben ist wichtig.', fa: 'شادی از زندگی مهم است.' },
        { de: 'Die Freude auf die Ferien ist groß.', fa: 'شوق برای تعطیلات زیاد است.' },
      ],
      meanings: ['شادی', 'خوشحالی'],
    },
  },
  {
    id: 'np-9',
    category: 'nouns-with-prepositions',
    front: 'der Gedanke',
    back: {
      preposition: 'an',
      case: 'Akkusativ',
      examples: [
        { de: 'Der Gedanke an die Zukunft macht mir Sorgen.', fa: 'فکر آینده من را نگران می‌کند.' },
      ],
      meanings: ['فکر', 'اندیشه'],
    },
  },
  {
    id: 'np-10',
    category: 'nouns-with-prepositions',
    front: 'das Gespräch',
    back: {
      preposition: 'mit / über',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Das Gespräch mit ihm war interessant.', fa: 'گفتگو با او جالب بود.' },
      ],
      meanings: ['گفتگو', 'مکالمه'],
    },
  },
  {
    id: 'np-11',
    category: 'nouns-with-prepositions',
    front: 'die Hoffnung',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Hoffnung auf Frieden bleibt.', fa: 'امید به صلح باقی می‌ماند.' },
      ],
      meanings: ['امید'],
    },
  },
  {
    id: 'np-12',
    category: 'nouns-with-prepositions',
    front: 'das Interesse',
    back: {
      preposition: 'an / für',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Das Interesse an Kunst wächst.', fa: 'علاقه به هنر در حال رشد است.' },
      ],
      meanings: ['علاقه', 'علاقه‌مندی'],
    },
  },
  {
    id: 'np-13',
    category: 'nouns-with-prepositions',
    front: 'die Klage',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Klage über den Service war berechtigt.', fa: 'شکایت از سرویس موجه بود.' },
      ],
      meanings: ['شکایت'],
    },
  },
  {
    id: 'np-14',
    category: 'nouns-with-prepositions',
    front: 'die Kritik',
    back: {
      preposition: 'an',
      case: 'Dativ',
      examples: [
        { de: 'Die Kritik am System ist notwendig.', fa: 'انتقاد از سیستم ضروری است.' },
      ],
      meanings: ['انتقاد'],
    },
  },
  {
    id: 'np-15',
    category: 'nouns-with-prepositions',
    front: 'die Liebe',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Die Liebe zu Kindern ist natürlich.', fa: 'عشق به بچه‌ها طبیعی است.' },
      ],
      meanings: ['عشق', 'محبت'],
    },
  },
  {
    id: 'np-16',
    category: 'nouns-with-prepositions',
    front: 'die Lust',
    back: {
      preposition: 'auf / an / zu',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Ich habe Lust auf Eis.', fa: 'من میل به بستنی دارم.' },
      ],
      meanings: ['میل', 'اشتیاق'],
    },
  },
  {
    id: 'np-17',
    category: 'nouns-with-prepositions',
    front: 'die Nachricht',
    back: {
      preposition: 'von / über',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Die Nachricht vom Unfall war schockierend.', fa: 'خبر تصادف شوکه‌کننده بود.' },
      ],
      meanings: ['خبر', 'پیام'],
    },
  },
  {
    id: 'np-18',
    category: 'nouns-with-prepositions',
    front: 'die Neigung',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Er hat eine Neigung zu Depressionen.', fa: 'او تمایل به افسردگی دارد.' },
      ],
      meanings: ['تمایل', 'گرایش'],
    },
  },
  {
    id: 'np-19',
    category: 'nouns-with-prepositions',
    front: 'der Protest',
    back: {
      preposition: 'gegen',
      case: 'Akkusativ',
      examples: [
        { de: 'Der Protest gegen das Gesetz war massiv.', fa: 'اعتراض علیه قانون گسترده بود.' },
      ],
      meanings: ['اعتراض'],
    },
  },
  {
    id: 'np-20',
    category: 'nouns-with-prepositions',
    front: 'die Reaktion',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Reaktion auf die Nachricht war positiv.', fa: 'واکنش به خبر مثبت بود.' },
      ],
      meanings: ['واکنش'],
    },
  },
  {
    id: 'np-21',
    category: 'nouns-with-prepositions',
    front: 'das Recht',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Jeder hat das Recht auf Bildung.', fa: 'هر کسی حق آموزش دارد.' },
      ],
      meanings: ['حق'],
    },
  },
  {
    id: 'np-22',
    category: 'nouns-with-prepositions',
    front: 'die Sehnsucht',
    back: {
      preposition: 'nach',
      case: 'Dativ',
      examples: [
        { de: 'Die Sehnsucht nach Heimat ist stark.', fa: 'دلتنگی برای وطن شدید است.' },
      ],
      meanings: ['دلتنگی', 'اشتیاق'],
    },
  },
  {
    id: 'np-23',
    category: 'nouns-with-prepositions',
    front: 'die Sorge',
    back: {
      preposition: 'um',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Sorge um die Zukunft ist berechtigt.', fa: 'نگرانی برای آینده موجه است.' },
      ],
      meanings: ['نگرانی'],
    },
  },
  {
    id: 'np-24',
    category: 'nouns-with-prepositions',
    front: 'der Stolz',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Der Stolz auf die Leistung ist verständlich.', fa: 'افتخار به عملکرد قابل درک است.' },
      ],
      meanings: ['افتخار', 'غرور'],
    },
  },
  {
    id: 'np-25',
    category: 'nouns-with-prepositions',
    front: 'der Streit',
    back: {
      preposition: 'über / um',
      case: 'Akkusativ',
      examples: [
        { de: 'Der Streit über Politik war heftig.', fa: 'دعوا درباره سیاست شدید بود.' },
      ],
      meanings: ['دعوا', 'بحث'],
    },
  },
  {
    id: 'np-26',
    category: 'nouns-with-prepositions',
    front: 'die Suche',
    back: {
      preposition: 'nach',
      case: 'Dativ',
      examples: [
        { de: 'Die Suche nach Arbeit ist schwierig.', fa: 'جستجوی کار سخت است.' },
      ],
      meanings: ['جستجو'],
    },
  },
  {
    id: 'np-27',
    category: 'nouns-with-prepositions',
    front: 'der Traum',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Der Traum vom eigenen Haus ist weit verbreitet.', fa: 'رویای خانه شخصی رایج است.' },
      ],
      meanings: ['رویا', 'خواب'],
    },
  },
  {
    id: 'np-28',
    category: 'nouns-with-prepositions',
    front: 'die Überzeugung',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Die Überzeugung von der Wahrheit ist stark.', fa: 'اعتقاد به حقیقت قوی است.' },
      ],
      meanings: ['اعتقاد', 'باور'],
    },
  },
  {
    id: 'np-29',
    category: 'nouns-with-prepositions',
    front: 'das Verständnis',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Das Verständnis für andere ist wichtig.', fa: 'درک دیگران مهم است.' },
      ],
      meanings: ['درک', 'فهم'],
    },
  },
  {
    id: 'np-30',
    category: 'nouns-with-prepositions',
    front: 'das Vertrauen',
    back: {
      preposition: 'auf / in / zu',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Das Vertrauen in die Zukunft ist wichtig.', fa: 'اعتماد به آینده مهم است.' },
      ],
      meanings: ['اعتماد'],
    },
  },
  {
    id: 'np-31',
    category: 'nouns-with-prepositions',
    front: 'der Verzicht',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Der Verzicht auf Zucker ist gesund.', fa: 'صرف‌نظر از شکر سالم است.' },
      ],
      meanings: ['صرف‌نظر کردن', 'انصراف'],
    },
  },
  {
    id: 'np-32',
    category: 'nouns-with-prepositions',
    front: 'der Wunsch',
    back: {
      preposition: 'nach',
      case: 'Dativ',
      examples: [
        { de: 'Der Wunsch nach Frieden ist universal.', fa: 'آرزوی صلح جهانی است.' },
      ],
      meanings: ['آرزو', 'خواسته'],
    },
  },
  {
    id: 'np-33',
    category: 'nouns-with-prepositions',
    front: 'die Zufriedenheit',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Die Zufriedenheit mit dem Leben ist wichtig.', fa: 'رضایت از زندگی مهم است.' },
      ],
      meanings: ['رضایت'],
    },
  },
  {
    id: 'np-34',
    category: 'nouns-with-prepositions',
    front: 'der Zweifel',
    back: {
      preposition: 'an',
      case: 'Dativ',
      examples: [
        { de: 'Der Zweifel an der Wahrheit ist berechtigt.', fa: 'شک به حقیقت موجه است.' },
      ],
      meanings: ['شک', 'تردید'],
    },
  },
  {
    id: 'np-35',
    category: 'nouns-with-prepositions',
    front: 'die Bewerbung',
    back: {
      preposition: 'um / bei',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Die Bewerbung um die Stelle war erfolgreich.', fa: 'درخواست برای شغل موفق بود.' },
      ],
      meanings: ['درخواست', 'کاندیداتوری'],
      notes: ['مشتق از فعل sich bewerben'],
    },
  },
  {
    id: 'np-36',
    category: 'nouns-with-prepositions',
    front: 'der Dank',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Herzlichen Dank für Ihre Hilfe.', fa: 'تشکر صمیمانه برای کمکتان.' },
      ],
      meanings: ['تشکر', 'سپاس'],
    },
  },
  {
    id: 'np-37',
    category: 'nouns-with-prepositions',
    front: 'die Diskussion',
    back: {
      preposition: 'über / um',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Diskussion über das Thema war lebhaft.', fa: 'بحث درباره موضوع پرشور بود.' },
      ],
      meanings: ['بحث', 'گفتگو'],
    },
  },
  {
    id: 'np-38',
    category: 'nouns-with-prepositions',
    front: 'die Einladung',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Die Einladung zur Party kam überraschend.', fa: 'دعوت به مهمانی غافلگیرکننده بود.' },
      ],
      meanings: ['دعوت'],
    },
  },
  {
    id: 'np-39',
    category: 'nouns-with-prepositions',
    front: 'die Erinnerung',
    back: {
      preposition: 'an',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Erinnerung an die Kindheit ist schön.', fa: 'خاطره کودکی زیباست.' },
      ],
      meanings: ['خاطره', 'یادآوری'],
    },
  },
  {
    id: 'np-40',
    category: 'nouns-with-prepositions',
    front: 'die Frage',
    back: {
      preposition: 'nach',
      case: 'Dativ',
      examples: [
        { de: 'Die Frage nach dem Sinn des Lebens ist philosophisch.', fa: 'سوال درباره معنای زندگی فلسفی است.' },
      ],
      meanings: ['سوال', 'پرسش'],
    },
  },
  {
    id: 'np-41',
    category: 'nouns-with-prepositions',
    front: 'die Gewissheit',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Gewissheit über den Erfolg gibt Kraft.', fa: 'اطمینان از موفقیت انرژی می‌دهد.' },
      ],
      meanings: ['اطمینان', 'یقین'],
    },
  },
  {
    id: 'np-42',
    category: 'nouns-with-prepositions',
    front: 'die Hilfe',
    back: {
      preposition: 'bei',
      case: 'Dativ',
      examples: [
        { de: 'Vielen Dank für die Hilfe bei der Arbeit.', fa: 'خیلی ممنون از کمک در کار.' },
      ],
      meanings: ['کمک', 'یاری'],
    },
  },
  {
    id: 'np-43',
    category: 'nouns-with-prepositions',
    front: 'die Information',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Information über die Veranstaltung kam zu spät.', fa: 'اطلاعات درباره رویداد دیر رسید.' },
      ],
      meanings: ['اطلاعات'],
    },
  },
  {
    id: 'np-44',
    category: 'nouns-with-prepositions',
    front: 'die Kenntnis',
    back: {
      preposition: 'von / über',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Die Kenntnis von der Situation ist wichtig.', fa: 'آگاهی از موقعیت مهم است.' },
      ],
      meanings: ['آگاهی', 'دانش'],
    },
  },
  {
    id: 'np-45',
    category: 'nouns-with-prepositions',
    front: 'die Konzentration',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Konzentration auf die Aufgabe ist wichtig.', fa: 'تمرکز روی کار مهم است.' },
      ],
      meanings: ['تمرکز'],
    },
  },
  {
    id: 'np-46',
    category: 'nouns-with-prepositions',
    front: 'die Leidenschaft',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Leidenschaft für Musik ist groß.', fa: 'شور و شوق برای موسیقی زیاد است.' },
      ],
      meanings: ['شور و شوق', 'احساس شدید'],
    },
  },
  {
    id: 'np-47',
    category: 'nouns-with-prepositions',
    front: 'die Meinung',
    back: {
      preposition: 'über / von',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Was ist deine Meinung über dieses Thema?', fa: 'نظرت درباره این موضوع چیست؟' },
      ],
      meanings: ['نظر', 'عقیده'],
    },
  },
  {
    id: 'np-48',
    category: 'nouns-with-prepositions',
    front: 'die Mühe',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Ich habe Mühe mit der deutschen Grammatik.', fa: 'من با گرامر آلمانی مشکل دارم.' },
      ],
      meanings: ['مشکل', 'زحمت'],
    },
  },
  {
    id: 'np-49',
    category: 'nouns-with-prepositions',
    front: 'die Neugier',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Neugier auf Neues ist natürlich.', fa: 'کنجکاوی نسبت به چیزهای جدید طبیعی است.' },
      ],
      meanings: ['کنجکاوی'],
    },
  },
  {
    id: 'np-50',
    category: 'nouns-with-prepositions',
    front: 'der Rat',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Ein guter Rat zu diesem Problem wäre hilfreich.', fa: 'یک مشورت خوب برای این مشکل مفید خواهد بود.' },
      ],
      meanings: ['مشورت', 'نصیحت'],
    },
  },
  {
    id: 'np-51',
    category: 'nouns-with-prepositions',
    front: 'der Respekt',
    back: {
      preposition: 'vor',
      case: 'Dativ',
      examples: [
        { de: 'Der Respekt vor älteren Menschen ist wichtig.', fa: 'احترام به افراد مسن مهم است.' },
      ],
      meanings: ['احترام'],
    },
  },
  {
    id: 'np-52',
    category: 'nouns-with-prepositions',
    front: 'die Teilnahme',
    back: {
      preposition: 'an',
      case: 'Dativ',
      examples: [
        { de: 'Die Teilnahme am Kurs ist freiwillig.', fa: 'شرکت در دوره داوطلبانه است.' },
      ],
      meanings: ['شرکت', 'مشارکت'],
    },
  },
  {
    id: 'np-53',
    category: 'nouns-with-prepositions',
    front: 'der Umgang',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Der Umgang mit Menschen ist nicht immer einfach.', fa: 'رفتار با مردم همیشه آسان نیست.' },
      ],
      meanings: ['رفتار', 'برخورد'],
    },
  },
  {
    id: 'np-54',
    category: 'nouns-with-prepositions',
    front: 'die Verantwortung',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Verantwortung für die Familie ist groß.', fa: 'مسئولیت خانواده بزرگ است.' },
      ],
      meanings: ['مسئولیت'],
    },
  },
  {
    id: 'np-55',
    category: 'nouns-with-prepositions',
    front: 'die Verbindung',
    back: {
      preposition: 'mit / zu / zwischen',
      case: 'Dativ',
      examples: [
        { de: 'Die Verbindung mit ihm ist unterbrochen.', fa: 'ارتباط با او قطع شده است.' },
      ],
      meanings: ['ارتباط', 'اتصال'],
    },
  },
  {
    id: 'np-56',
    category: 'nouns-with-prepositions',
    front: 'der Verdacht',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Der Verdacht auf Betrug ist begründet.', fa: 'ظن به تقلب موجه است.' },
      ],
      meanings: ['ظن', 'شک'],
    },
  },
  {
    id: 'np-57',
    category: 'nouns-with-prepositions',
    front: 'der Vergleich',
    back: {
      preposition: 'mit / zwischen',
      case: 'Dativ',
      examples: [
        { de: 'Der Vergleich mit anderen ist nicht fair.', fa: 'مقایسه با دیگران منصفانه نیست.' },
      ],
      meanings: ['مقایسه'],
    },
  },
  {
    id: 'np-58',
    category: 'nouns-with-prepositions',
    front: 'das Verhalten',
    back: {
      preposition: 'zu / gegenüber',
      case: 'Dativ',
      examples: [
        { de: 'Sein Verhalten zu mir war respektlos.', fa: 'رفتار او با من بی‌احترامانه بود.' },
      ],
      meanings: ['رفتار'],
    },
  },
  {
    id: 'np-59',
    category: 'nouns-with-prepositions',
    front: 'das Verhältnis',
    back: {
      preposition: 'zu / zwischen',
      case: 'Dativ',
      examples: [
        { de: 'Das Verhältnis zu ihm ist gut.', fa: 'رابطه با او خوب است.' },
      ],
      meanings: ['رابطه', 'نسبت'],
    },
  },
  {
    id: 'np-60',
    category: 'nouns-with-prepositions',
    front: 'die Vorliebe',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Seine Vorliebe für Schokolade ist bekannt.', fa: 'علاقه او به شکلات معروف است.' },
      ],
      meanings: ['علاقه خاص'],
    },
  },
  {
    id: 'np-61',
    category: 'nouns-with-prepositions',
    front: 'die Warnung',
    back: {
      preposition: 'vor',
      case: 'Dativ',
      examples: [
        { de: 'Die Warnung vor der Gefahr kam zu spät.', fa: 'هشدار از خطر دیر رسید.' },
      ],
      meanings: ['هشدار'],
    },
  },
  {
    id: 'np-62',
    category: 'nouns-with-prepositions',
    front: 'das Wissen',
    back: {
      preposition: 'über / von',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Das Wissen über Geschichte ist wichtig.', fa: 'دانش درباره تاریخ مهم است.' },
      ],
      meanings: ['دانش', 'معلومات'],
    },
  },
  {
    id: 'np-63',
    category: 'nouns-with-prepositions',
    front: 'die Abhängigkeit',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Die Abhängigkeit von Technologie nimmt zu.', fa: 'وابستگی به فناوری در حال افزایش است.' },
      ],
      meanings: ['وابستگی'],
    },
  },
  {
    id: 'np-64',
    category: 'nouns-with-prepositions',
    front: 'der Ärger',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Sein Ärger über die Verspätung war verständlich.', fa: 'عصبانیت او از تاخیر قابل درک بود.' },
      ],
      meanings: ['عصبانیت', 'خشم'],
    },
  },
  {
    id: 'np-65',
    category: 'nouns-with-prepositions',
    front: 'die Begeisterung',
    back: {
      preposition: 'für / über',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Begeisterung für Sport ist groß.', fa: 'شور و شوق برای ورزش زیاد است.' },
      ],
      meanings: ['شور و شوق', 'هیجان'],
    },
  },
  {
    id: 'np-66',
    category: 'nouns-with-prepositions',
    front: 'die Bereitschaft',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Die Bereitschaft zur Hilfe ist wichtig.', fa: 'آمادگی برای کمک مهم است.' },
      ],
      meanings: ['آمادگی'],
    },
  },
  {
    id: 'np-67',
    category: 'nouns-with-prepositions',
    front: 'die Beschwerde',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Beschwerde über den Lärm wurde eingereicht.', fa: 'شکایت از سر و صدا ثبت شد.' },
      ],
      meanings: ['شکایت'],
    },
  },
  {
    id: 'np-68',
    category: 'nouns-with-prepositions',
    front: 'die Enttäuschung',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Enttäuschung über das Ergebnis war groß.', fa: 'ناامیدی از نتیجه زیاد بود.' },
      ],
      meanings: ['ناامیدی', 'سرخوردگی'],
    },
  },
  {
    id: 'np-69',
    category: 'nouns-with-prepositions',
    front: 'die Erfahrung',
    back: {
      preposition: 'mit / in',
      case: 'Dativ',
      examples: [
        { de: 'Meine Erfahrung mit diesem Produkt ist positiv.', fa: 'تجربه من با این محصول مثبت است.' },
      ],
      meanings: ['تجربه'],
    },
  },
  {
    id: 'np-70',
    category: 'nouns-with-prepositions',
    front: 'die Fähigkeit',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Die Fähigkeit zum Lernen ist wichtig.', fa: 'توانایی یادگیری مهم است.' },
      ],
      meanings: ['توانایی', 'قابلیت'],
    },
  },
  {
    id: 'np-71',
    category: 'nouns-with-prepositions',
    front: 'die Folge',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Die Folge von zu viel Arbeit ist Stress.', fa: 'نتیجه کار زیاد استرس است.' },
      ],
      meanings: ['نتیجه', 'پیامد'],
    },
  },
  {
    id: 'np-72',
    category: 'nouns-with-prepositions',
    front: 'die Geduld',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Die Geduld mit Kindern ist wichtig.', fa: 'صبر با بچه‌ها مهم است.' },
      ],
      meanings: ['صبر', 'حوصله'],
    },
  },
  {
    id: 'np-73',
    category: 'nouns-with-prepositions',
    front: 'der Grund',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Was ist der Grund für deine Entscheidung?', fa: 'دلیل تصمیمت چیست؟' },
      ],
      meanings: ['دلیل', 'علت'],
    },
  },
  {
    id: 'np-74',
    category: 'nouns-with-prepositions',
    front: 'die Leidenschaft',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Seine Leidenschaft für das Reisen ist bekannt.', fa: 'شور و شوق او برای سفر معروف است.' },
      ],
      meanings: ['شور و شوق'],
    },
  },
  {
    id: 'np-75',
    category: 'nouns-with-prepositions',
    front: 'die Lösung',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Lösung für das Problem ist einfach.', fa: 'راه‌حل برای مشکل ساده است.' },
      ],
      meanings: ['راه‌حل'],
    },
  },
  {
    id: 'np-76',
    category: 'nouns-with-prepositions',
    front: 'die Rücksicht',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Nimm Rücksicht auf andere!', fa: 'به دیگران احترام بگذار!' },
      ],
      meanings: ['احترام', 'توجه'],
    },
  },
  {
    id: 'np-77',
    category: 'nouns-with-prepositions',
    front: 'die Schwierigkeit',
    back: {
      preposition: 'mit / bei',
      case: 'Dativ',
      examples: [
        { de: 'Ich habe Schwierigkeiten mit der Aussprache.', fa: 'من مشکل با تلفظ دارم.' },
      ],
      meanings: ['مشکل', 'دشواری'],
    },
  },
  {
    id: 'np-78',
    category: 'nouns-with-prepositions',
    front: 'die Teilnahme',
    back: {
      preposition: 'an',
      case: 'Dativ',
      examples: [
        { de: 'Die Teilnahme an der Konferenz war interessant.', fa: 'شرکت در کنفرانس جالب بود.' },
      ],
      meanings: ['شرکت'],
    },
  },
  {
    id: 'np-79',
    category: 'nouns-with-prepositions',
    front: 'die Unterstützung',
    back: {
      preposition: 'bei',
      case: 'Dativ',
      examples: [
        { de: 'Vielen Dank für die Unterstützung bei der Arbeit.', fa: 'خیلی ممنون از حمایت در کار.' },
      ],
      meanings: ['حمایت', 'پشتیبانی'],
    },
  },
  {
    id: 'np-80',
    category: 'nouns-with-prepositions',
    front: 'die Vorbereitung',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Die Vorbereitung auf die Prüfung ist wichtig.', fa: 'آماده‌سازی برای امتحان مهم است.' },
      ],
      meanings: ['آماده‌سازی', 'تدارک'],
    },
  },
];

// ============================================================================
// ADJECTIVES WITH PREPOSITIONS (Adjektive mit festen Präpositionen)
// ============================================================================

const adjectivesWithPrepositionsCards: StudyCard[] = [
  {
    id: 'ap-1',
    category: 'adjectives-with-prepositions',
    front: 'abhängig',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Er ist abhängig von Alkohol.', fa: 'او به الکل وابسته است.' },
      ],
      meanings: ['وابسته به'],
      notes: ['مشتق از فعل abhängen'],
    },
  },
  {
    id: 'ap-2',
    category: 'adjectives-with-prepositions',
    front: 'angewiesen',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bin auf deine Hilfe angewiesen.', fa: 'من به کمک تو وابسته هستم.' },
      ],
      meanings: ['وابسته به', 'نیازمند'],
    },
  },
  {
    id: 'ap-3',
    category: 'adjectives-with-prepositions',
    front: 'arm',
    back: {
      preposition: 'an',
      case: 'Dativ',
      examples: [
        { de: 'Das Land ist arm an Rohstoffen.', fa: 'کشور فقیر از منابع طبیعی است.' },
      ],
      meanings: ['فقیر از', 'کم از'],
    },
  },
  {
    id: 'ap-4',
    category: 'adjectives-with-prepositions',
    front: 'begeistert',
    back: {
      preposition: 'von / über',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Ich bin begeistert von der Idee.', fa: 'من از ایده هیجان‌زده هستم.' },
      ],
      meanings: ['هیجان‌زده از', 'مشتاق'],
    },
  },
  {
    id: 'ap-5',
    category: 'adjectives-with-prepositions',
    front: 'bekannt',
    back: {
      preposition: 'für / mit',
      case: 'Akkusativ / Dativ',
      examples: [
        { de: 'Er ist bekannt für seine Filme.', fa: 'او به خاطر فیلم‌هایش مشهور است.' },
        { de: 'Ich bin mit ihm bekannt.', fa: 'من با او آشنا هستم.' },
      ],
      meanings: ['مشهور به (für)', 'آشنا با (mit)'],
    },
  },
  {
    id: 'ap-6',
    category: 'adjectives-with-prepositions',
    front: 'bereit',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Ich bin bereit zur Abreise.', fa: 'من آماده عزیمت هستم.' },
      ],
      meanings: ['آماده برای'],
    },
  },
  {
    id: 'ap-7',
    category: 'adjectives-with-prepositions',
    front: 'böse',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bin böse auf dich.', fa: 'من از دست تو عصبانی هستم.' },
      ],
      meanings: ['عصبانی از', 'ناراحت از'],
    },
  },
  {
    id: 'ap-8',
    category: 'adjectives-with-prepositions',
    front: 'dankbar',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bin dankbar für deine Hilfe.', fa: 'من برای کمکت سپاسگزارم.' },
      ],
      meanings: ['سپاسگزار برای'],
    },
  },
  {
    id: 'ap-9',
    category: 'adjectives-with-prepositions',
    front: 'eifersüchtig',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Sie ist eifersüchtig auf ihre Schwester.', fa: 'او به خواهرش حسادت می‌کند.' },
      ],
      meanings: ['حسود به'],
    },
  },
  {
    id: 'ap-10',
    category: 'adjectives-with-prepositions',
    front: 'einverstanden',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Ich bin mit dem Plan einverstanden.', fa: 'من با طرح موافق هستم.' },
      ],
      meanings: ['موافق با'],
    },
  },
  {
    id: 'ap-11',
    category: 'adjectives-with-prepositions',
    front: 'enttäuscht',
    back: {
      preposition: 'von / über',
      case: 'Dativ / Akkusativ',
      examples: [
        { de: 'Ich bin enttäuscht von dir.', fa: 'من از تو ناامید شدم.' },
      ],
      meanings: ['ناامید از'],
    },
  },
  {
    id: 'ap-12',
    category: 'adjectives-with-prepositions',
    front: 'erstaunt',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bin erstaunt über seine Leistung.', fa: 'من از عملکردش شگفت‌زده شدم.' },
      ],
      meanings: ['شگفت‌زده از'],
    },
  },
  {
    id: 'ap-13',
    category: 'adjectives-with-prepositions',
    front: 'fähig',
    back: {
      preposition: 'zu',
      case: 'Dativ',
      examples: [
        { de: 'Er ist zu großen Leistungen fähig.', fa: 'او قادر به کارهای بزرگ است.' },
      ],
      meanings: ['قادر به'],
    },
  },
  {
    id: 'ap-14',
    category: 'adjectives-with-prepositions',
    front: 'fertig',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Ich bin fertig mit der Arbeit.', fa: 'من کارم را تمام کرده‌ام.' },
      ],
      meanings: ['تمام کردن', 'آماده'],
    },
  },
  {
    id: 'ap-15',
    category: 'adjectives-with-prepositions',
    front: 'froh',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bin froh über die Nachricht.', fa: 'من از خبر خوشحالم.' },
      ],
      meanings: ['خوشحال از'],
    },
  },
  {
    id: 'ap-16',
    category: 'adjectives-with-prepositions',
    front: 'gespannt',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bin gespannt auf das Ergebnis.', fa: 'من منتظر نتیجه هستم.' },
      ],
      meanings: ['منتظر', 'مشتاق'],
    },
  },
  {
    id: 'ap-17',
    category: 'adjectives-with-prepositions',
    front: 'gewöhnt',
    back: {
      preposition: 'an',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bin an das Klima gewöhnt.', fa: 'من به آب و هوا عادت کرده‌ام.' },
      ],
      meanings: ['عادت کرده به'],
    },
  },
  {
    id: 'ap-18',
    category: 'adjectives-with-prepositions',
    front: 'interessiert',
    back: {
      preposition: 'an',
      case: 'Dativ',
      examples: [
        { de: 'Ich bin an deiner Meinung interessiert.', fa: 'من به نظر تو علاقه‌مندم.' },
      ],
      meanings: ['علاقه‌مند به'],
    },
  },
  {
    id: 'ap-19',
    category: 'adjectives-with-prepositions',
    front: 'neidisch',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Er ist neidisch auf meinen Erfolg.', fa: 'او به موفقیت من حسادت می‌کند.' },
      ],
      meanings: ['حسود به'],
    },
  },
  {
    id: 'ap-20',
    category: 'adjectives-with-prepositions',
    front: 'neugierig',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bin neugierig auf die Antwort.', fa: 'من کنجکاو پاسخ هستم.' },
      ],
      meanings: ['کنجکاو'],
    },
  },
  {
    id: 'ap-21',
    category: 'adjectives-with-prepositions',
    front: 'nützlich',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Das ist nützlich für dich.', fa: 'این برای تو مفید است.' },
      ],
      meanings: ['مفید برای'],
    },
  },
  {
    id: 'ap-22',
    category: 'adjectives-with-prepositions',
    front: 'reich',
    back: {
      preposition: 'an',
      case: 'Dativ',
      examples: [
        { de: 'Das Land ist reich an Öl.', fa: 'کشور غنی از نفت است.' },
      ],
      meanings: ['غنی از', 'سرشار از'],
    },
  },
  {
    id: 'ap-23',
    category: 'adjectives-with-prepositions',
    front: 'stolz',
    back: {
      preposition: 'auf',
      case: 'Akkusativ',
      examples: [
        { de: 'Ich bin stolz auf dich.', fa: 'من به تو افتخار می‌کنم.' },
      ],
      meanings: ['مفتخر به'],
    },
  },
  {
    id: 'ap-24',
    category: 'adjectives-with-prepositions',
    front: 'traurig',
    back: {
      preposition: 'über',
      case: 'Akkusativ',
      examples: [
        { de: 'Sie ist traurig über den Verlust.', fa: 'او از ضرر غمگین است.' },
      ],
      meanings: ['غمگین از'],
    },
  },
  {
    id: 'ap-25',
    category: 'adjectives-with-prepositions',
    front: 'typisch',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Das ist typisch für ihn.', fa: 'این برای او معمولی است.' },
      ],
      meanings: ['معمول برای', 'نمونه'],
    },
  },
  {
    id: 'ap-26',
    category: 'adjectives-with-prepositions',
    front: 'überzeugt',
    back: {
      preposition: 'von',
      case: 'Dativ',
      examples: [
        { de: 'Ich bin von seiner Ehrlichkeit überzeugt.', fa: 'من از صداقت او متقاعد شده‌ام.' },
      ],
      meanings: ['متقاعد از', 'مطمئن از'],
    },
  },
  {
    id: 'ap-27',
    category: 'adjectives-with-prepositions',
    front: 'verantwortlich',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Du bist verantwortlich für dieses Projekt.', fa: 'تو مسئول این پروژه هستی.' },
      ],
      meanings: ['مسئول'],
    },
  },
  {
    id: 'ap-28',
    category: 'adjectives-with-prepositions',
    front: 'verliebt',
    back: {
      preposition: 'in',
      case: 'Akkusativ',
      examples: [
        { de: 'Er ist verliebt in sie.', fa: 'او عاشق اوست.' },
      ],
      meanings: ['عاشق'],
    },
  },
  {
    id: 'ap-29',
    category: 'adjectives-with-prepositions',
    front: 'verheiratet',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Sie ist mit ihm verheiratet.', fa: 'او با او ازدواج کرده است.' },
      ],
      meanings: ['متاهل با'],
    },
  },
  {
    id: 'ap-30',
    category: 'adjectives-with-prepositions',
    front: 'verwandt',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Ich bin mit ihm verwandt.', fa: 'من با او خویشاوند هستم.' },
      ],
      meanings: ['خویشاوند با'],
    },
  },
  {
    id: 'ap-31',
    category: 'adjectives-with-prepositions',
    front: 'wichtig',
    back: {
      preposition: 'für',
      case: 'Akkusativ',
      examples: [
        { de: 'Das ist wichtig für mich.', fa: 'این برای من مهم است.' },
      ],
      meanings: ['مهم برای'],
    },
  },
  {
    id: 'ap-32',
    category: 'adjectives-with-prepositions',
    front: 'zufrieden',
    back: {
      preposition: 'mit',
      case: 'Dativ',
      examples: [
        { de: 'Ich bin zufrieden mit meiner Arbeit.', fa: 'من از کارم راضی هستم.' },
      ],
      meanings: ['راضی از'],
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
    id: 'nouns-with-prepositions',
    title: 'Nomen mit Präpositionen',
    titleFa: 'اسم‌ها با حروف اضافه ثابت',
    description: 'Nouns with fixed prepositions',
    descriptionFa: 'اسم‌هایی که با حروف اضافه خاص استفاده می‌شوند',
    icon: '📦',
    cardCount: nounsWithPrepositionsCards.length,
  },
  {
    id: 'adjectives-with-prepositions',
    title: 'Adjektive mit Präpositionen',
    titleFa: 'صفات با حروف اضافه ثابت',
    description: 'Adjectives with fixed prepositions',
    descriptionFa: 'صفاتی که با حروف اضافه خاص استفاده می‌شوند',
    icon: '🎨',
    cardCount: adjectivesWithPrepositionsCards.length,
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
    ...nounsWithPrepositionsCards,
    ...adjectivesWithPrepositionsCards,
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
