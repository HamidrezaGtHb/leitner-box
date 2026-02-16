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
        { de: 'Nach monatelanger Vorbereitung freue ich mich endlich auf die Präsentation meines Projekts vor dem Vorstand.', fa: 'بعد از ماه‌ها آماده‌سازی، بالاخره مشتاق ارائه پروژه‌ام به هیئت مدیره هستم.' },
        { de: 'Die Mitarbeiter freuen sich auf die Einführung der flexiblen Arbeitszeiten im nächsten Quartal.', fa: 'کارمندان مشتاق معرفی ساعات کاری انعطاف‌پذیر در سه‌ماهه بعدی هستند.' },
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
        { de: 'Wir warten noch auf die endgültige Genehmigung der Geschäftsführung, bevor wir mit dem Projekt beginnen können.', fa: 'ما هنوز منتظر تأیید نهایی مدیریت هستیم قبل از اینکه بتوانیم پروژه را شروع کنیم.' },
        { de: 'Die Vertragsunterzeichnung muss auf die Zustimmung aller Beteiligten warten.', fa: 'امضای قرارداد باید منتظر موافقت همه طرف‌های درگیر بماند.' },
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
        { de: 'Bei strategischen Entscheidungen muss man immer an die langfristigen Konsequenzen für das Unternehmen denken.', fa: 'در تصمیمات استراتژیک باید همیشه به پیامدهای بلندمدت برای شرکت فکر کرد.' },
        { de: 'Der Teamleiter denkt ständig an die Work-Life-Balance seiner Mitarbeiter.', fa: 'سرپرست تیم دائماً به تعادل کار-زندگی کارمندانش فکر می‌کند.' },
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
        { de: 'Als Softwareentwickler interessiere ich mich besonders für innovative KI-Technologien und deren praktische Anwendung im Gesundheitswesen.', fa: 'به عنوان توسعه‌دهنده نرم‌افزار، من به‌ویژه به فناوری‌های نوآورانه هوش مصنوعی و کاربرد عملی آن در بخش سلامت علاقه‌مندم.' },
        { de: 'Unser Unternehmen interessiert sich für nachhaltige Geschäftsmodelle und soziale Verantwortung.', fa: 'شرکت ما به مدل‌های کسب‌وکار پایدار و مسئولیت اجتماعی علاقه‌مند است.' },
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
        { de: 'Ich möchte mich herzlich bei Ihnen für die konstruktive Zusammenarbeit während des gesamten Projektverlaufs bedanken.', fa: 'می‌خواهم صمیمانه از شما برای همکاری سازنده در طول کل پروژه تشکر کنم.' },
        { de: 'Die Geschäftsführung bedankte sich bei allen Mitarbeitern für ihr außergewöhnliches Engagement in der Krise.', fa: 'مدیریت از تمام کارمندان برای تعهد فوق‌العاده‌شان در بحران تشکر کرد.' },
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
        { de: 'Unsere Rechtsabteilung beschäftigt sich derzeit intensiv mit den neuen EU-Datenschutzrichtlinien und deren Umsetzung.', fa: 'بخش حقوقی ما در حال حاضر به‌طور فشرده با دستورالعمل‌های جدید حفاظت از داده‌های اتحادیه اروپا و اجرای آن سروکار دارد.' },
        { de: 'In meiner Dissertation beschäftige ich mich mit den sozioökonomischen Auswirkungen der Digitalisierung auf den Arbeitsmarkt.', fa: 'در رساله دکترایم با تأثیرات اجتماعی-اقتصادی دیجیتالی‌سازی بر بازار کار می‌پردازم.' },
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
        { de: 'Nach fünf Jahren Berufserfahrung im Projektmanagement bewerbe ich mich nun um die Position als Senior Product Manager bei einem internationalen Tech-Konzern.', fa: 'بعد از پنج سال تجربه حرفه‌ای در مدیریت پروژه، اکنون برای موقعیت مدیر ارشد محصول در یک شرکت بین‌المللی فناوری درخواست می‌دهم.' },
        { de: 'Aufgrund der attraktiven Unternehmenskultur und der Möglichkeiten zur beruflichen Weiterentwicklung hat sie sich bei diesem innovativen Startup beworben.', fa: 'به دلیل فرهنگ سازمانی جذاب و امکانات پیشرفت حرفه‌ای، او به این استارتاپ نوآور درخواست داده است.' },
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
        { de: 'Ich erinnere mich noch genau an das Vorstellungsgespräch, bei dem der Personalleiter die unternehmerische Vision so überzeugend dargelegt hat.', fa: 'من هنوز دقیقاً مصاحبه شغلی را به یاد می‌آورم که مدیر منابع انسانی در آن چشم‌انداز کارآفرینانه را به‌طور قانع‌کننده‌ای بیان کرد.' },
        { de: 'Viele Mitarbeiter erinnern sich noch an die herausfordernde Phase während der Unternehmensrestrukturierung.', fa: 'بسیاری از کارمندان هنوز مرحله چالش‌برانگیز را در طول بازسازی شرکت به یاد می‌آورند.' },
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
        { de: 'Als Projektkoordinator kümmere ich mich um die termingerechte Umsetzung aller Meilensteine und die Kommunikation zwischen den verschiedenen Abteilungen.', fa: 'به عنوان هماهنگ‌کننده پروژه، من از اجرای به‌موقع تمام نقاط عطف و ارتباط بین بخش‌های مختلف مراقبت می‌کنم.' },
        { de: 'Die IT-Abteilung kümmert sich umgehend um die Behebung kritischer Sicherheitslücken im System.', fa: 'بخش فناوری اطلاعات فوراً به رفع آسیب‌پذیری‌های امنیتی حیاتی در سیستم رسیدگی می‌کند.' },
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
        { de: 'Während der Kaffeepause unterhalten wir uns oft über die neuesten Entwicklungen in der künstlichen Intelligenz und deren ethische Implikationen.', fa: 'در طول استراحت قهوه، ما اغلب درباره آخرین پیشرفت‌ها در هوش مصنوعی و پیامدهای اخلاقی آن صحبت می‌کنیم.' },
        { de: 'Ich habe mich gestern ausführlich mit der Abteilungsleiterin über die strategische Neuausrichtung des Teams unterhalten.', fa: 'من دیروز به‌طور مفصل با رئیس بخش درباره جهت‌گیری استراتژیک جدید تیم صحبت کردم.' },
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
        { de: 'Das gesamte Entwicklungsteam bereitet sich intensiv auf den Launch der neuen Plattform und die damit verbundenen Kundenpräsentationen vor.', fa: 'کل تیم توسعه به‌طور فشرده برای راه‌اندازی پلتفرم جدید و ارائه‌های مربوط به مشتری آماده می‌شوند.' },
        { de: 'Wir müssen uns gründlich auf die Verhandlungen mit den internationalen Investoren vorbereiten.', fa: 'ما باید به‌طور کامل برای مذاکرات با سرمایه‌گذاران بین‌المللی آماده شویم.' },
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
        { de: 'Bei der Vertragsgestaltung muss man besonders auf die rechtlichen Formulierungen und mögliche Haftungsrisiken achten.', fa: 'در تنظیم قرارداد باید به‌ویژه به صورت‌بندی‌های حقوقی و خطرات احتمالی مسئولیت توجه کرد.' },
        { de: 'Moderne Unternehmen achten zunehmend auf ökologische Nachhaltigkeit und soziale Verantwortung in ihrer Lieferkette.', fa: 'شرکت‌های مدرن به‌طور فزاینده‌ای به پایداری زیست‌محیطی و مسئولیت اجتماعی در زنجیره تأمین خود توجه می‌کنند.' },
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
        { de: 'Nachdem alle Genehmigungen vorlagen, konnten wir endlich mit der Implementierung der komplexen Softwarearchitektur anfangen.', fa: 'پس از اینکه تمام مجوزها در دست بود، بالاخره توانستیم اجرای معماری نرم‌افزار پیچیده را شروع کنیم.' },
        { de: 'Das Startup fängt nächstes Quartal mit der Expansion in den europäischen Markt an.', fa: 'استارتاپ سه‌ماهه بعد گسترش به بازار اروپا را شروع می‌کند.' },
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
        { de: 'Das Management ärgert sich über die verzögerte Markteinführung und die dadurch entstandenen Wettbewerbsnachteile.', fa: 'مدیریت از راه‌اندازی به تأخیر افتاده بازار و معایب رقابتی ناشی از آن عصبانی است.' },
        { de: 'Viele Mitarbeiter ärgern sich über die mangelnde Transparenz bei der Entscheidungsfindung im Unternehmen.', fa: 'بسیاری از کارمندان از کمبود شفافیت در تصمیم‌گیری در شرکت ناراحت هستند.' },
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
        { de: 'Angesichts der komplexen Rechtslage bitten wir Sie um eine schriftliche Stellungnahme und rechtliche Einschätzung des Falls.', fa: 'با توجه به وضعیت حقوقی پیچیده، از شما برای اظهارنظر کتبی و ارزیابی حقوقی پرونده درخواست می‌کنیم.' },
        { de: 'Der Projektleiter bat die Geschäftsführung um zusätzliche Ressourcen und eine Verlängerung der Projektlaufzeit.', fa: 'مدیر پروژه از مدیریت برای منابع اضافی و تمدید مدت زمان پروژه درخواست کرد.' },
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
        { de: 'Kontinuierliche Weiterbildung und Anpassungsfähigkeit gehören zu den wichtigsten Eigenschaften erfolgreicher Führungskräfte.', fa: 'آموزش مستمر و سازگاری به مهم‌ترین ویژگی‌های مدیران موفق تعلق دارند.' },
        { de: 'Diese innovative Technologie gehört zu den vielversprechendsten Entwicklungen im Bereich der erneuerbaren Energien.', fa: 'این فناوری نوآورانه جزء امیدوارکننده‌ترین پیشرفت‌ها در زمینه انرژی‌های تجدیدپذیر است.' },
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
        { de: 'Die Investoren hoffen auf eine deutliche Wertsteigerung nach der geplanten Fusion mit dem Marktführer.', fa: 'سرمایه‌گذاران امیدوار به افزایش قابل توجه ارزش پس از ادغام برنامه‌ریزی شده با رهبر بازار هستند.' },
        { de: 'Nach mehreren Rückschlägen hoffen wir auf einen erfolgreichen Abschluss der Produktentwicklung im nächsten Quartal.', fa: 'بعد از چندین شکست، ما امیدوار به خاتمه موفقیت‌آمیز توسعه محصول در سه‌ماهه بعدی هستیم.' },
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
        { de: 'Als Vertreter unserer Abteilung nehme ich an der internationalen Fachkonferenz über nachhaltige Unternehmensführung teil.', fa: 'به عنوان نماینده بخش ما، در کنفرانس تخصصی بین‌المللی درباره مدیریت پایدار شرکت شرکت می‌کنم.' },
        { de: 'Alle Führungskräfte werden an dem zweitägigen Workshop zur agilen Transformation des Unternehmens teilnehmen.', fa: 'تمام مدیران در کارگاه دو روزه تحول چابک شرکت شرکت خواهند کرد.' },
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
        { de: 'Viele junge Unternehmer träumen von einem erfolgreichen Exit und der Verwirklichung ihrer innovativen Geschäftsidee.', fa: 'بسیاری از کارآفرینان جوان رویای خروج موفق و تحقق ایده نوآورانه کسب‌وکار خود را دارند.' },
        { de: 'Das Team träumt von einer bahnbrechenden technologischen Entwicklung, die den gesamten Markt revolutionieren könnte.', fa: 'تیم رویای یک توسعه فناوری پیشگامانه را دارد که می‌تواند کل بازار را متحول کند.' },
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
        { de: 'Nach monatelanger Marktanalyse hat sich der Vorstand schließlich für die Übernahme des kleineren Konkurrenten entschieden.', fa: 'بعد از ماه‌ها تحلیل بازار، هیئت مدیره بالاخره تصمیم به خرید رقیب کوچکتر گرفت.' },
        { de: 'Die Geschäftsführung hat sich gegen eine weitere Expansion entschieden, um zunächst die bestehenden Prozesse zu optimieren.', fa: 'مدیریت تصمیم به عدم گسترش بیشتر گرفت تا ابتدا فرآیندهای موجود را بهینه‌سازی کند.' },
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
        { de: 'Trotz zahlreicher Warnungen konnte niemand den CEO von seiner riskanten Expansionsstrategie abbringen.', fa: 'علی‌رغم هشدارهای متعدد، هیچ کس نتوانست مدیر عامل را از استراتژی پرخطر گسترش منصرف کند.' },
        { de: 'Die überzeugenden Argumente der Berater konnten das Management nicht von der geplanten Restrukturierung abbringen.', fa: 'استدلال‌های قانع‌کننده مشاوران نتوانست مدیریت را از بازسازی برنامه‌ریزی شده منصرف کند.' },
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
        { de: 'Der Erfolg unseres Projekts hängt maßgeblich von der Zustimmung der Stakeholder und der rechtzeitigen Verfügbarkeit der Ressourcen ab.', fa: 'موفقیت پروژه ما عمدتاً به موافقت ذینفعان و در دسترس بودن به‌موقع منابع بستگی دارد.' },
        { de: 'Die Markteinführung hängt vollständig von der finalen Qualitätssicherung und den regulatorischen Genehmigungen ab.', fa: 'راه‌اندازی بازار کاملاً به تضمین کیفیت نهایی و مجوزهای نظارتی بستگی دارد.' },
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
        { de: 'Das ausführliche Strategiepapier ist direkt an den Vorstand adressiert und behandelt die langfristigen Wachstumsziele.', fa: 'سند استراتژی جامع مستقیماً به هیئت مدیره آدرس شده و اهداف رشد بلندمدت را بررسی می‌کند.' },
        { de: 'Ihre Beschwerde sollte an die Personalabteilung adressiert werden, die für solche Angelegenheiten zuständig ist.', fa: 'شکایت شما باید به بخش منابع انسانی که مسئول چنین موضوعاتی است، آدرس داده شود.' },
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
        { de: 'Wir müssen dringend etwas an unserer Unternehmenskultur ändern, um talentierte Fachkräfte langfristig zu halten.', fa: 'ما فوراً باید چیزی در فرهنگ سازمانی‌مان تغییر دهیم تا نیروهای متخصص با استعداد را بلندمدت حفظ کنیم.' },
        { de: 'Das Management möchte grundlegende Aspekte an der Organisationsstruktur ändern, um effizienter zu werden.', fa: 'مدیریت می‌خواهد جنبه‌های اساسی ساختار سازمانی را تغییر دهد تا کاراتر شود.' },
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
        { de: 'Die innovativen Vorträge auf der Konferenz regten die Teilnehmer zu intensiven Diskussionen über die Zukunft der Branche an.', fa: 'سخنرانی‌های نوآورانه در کنفرانس، شرکت‌کنندگان را به بحث‌های فشرده درباره آینده صنعت تحریک کرد.' },
        { de: 'Das neue Innovationsprogramm soll Mitarbeiter dazu anregen, kreative Lösungen für bestehende Probleme zu entwickeln.', fa: 'برنامه نوآوری جدید باید کارمندان را به توسعه راه‌حل‌های خلاقانه برای مشکلات موجود ترغیب کند.' },
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
        { de: 'Aufgrund seiner herausragenden Leistungen sehen wir ihn als potentiellen Nachfolger für die Geschäftsführung an.', fa: 'به دلیل عملکرد برجسته‌اش، او را به‌عنوان جانشین بالقوه برای مدیریت در نظر می‌گیریم.' },
        { de: 'Die Investoren sehen dieses Projekt als Schlüssel für die zukünftige Marktposition des Unternehmens an.', fa: 'سرمایه‌گذاران این پروژه را به‌عنوان کلید موقعیت آینده بازار شرکت در نظر می‌گیرند.' },
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
        { de: 'Bei technischen Problemen sollten Sie umgehend bei unserem IT-Support anrufen, der rund um die Uhr erreichbar ist.', fa: 'در صورت مشکلات فنی، باید فوراً به پشتیبانی فناوری اطلاعات ما که ۲۴ ساعته در دسترس است، تلفن کنید.' },
        { de: 'Ich werde morgen früh bei der Rechtsabteilung anrufen, um die vertraglichen Details zu klären.', fa: 'من فردا صبح به بخش حقوقی زنگ خواهم زد تا جزئیات قراردادی را روشن کنم.' },
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
        { de: 'Unser Kundenservice antwortet innerhalb von 24 Stunden auf alle eingehenden Anfragen und Beschwerden.', fa: 'خدمات مشتریان ما در عرض ۲۴ ساعت به تمام درخواست‌ها و شکایات دریافتی پاسخ می‌دهد.' },
        { de: 'Die Marketingabteilung muss strategisch auf die Kampagne der Konkurrenz antworten, um Marktanteile zu sichern.', fa: 'بخش بازاریابی باید به‌طور استراتژیک به کمپین رقبا پاسخ دهد تا سهم بازار را تضمین کند.' },
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
        { de: 'Unser cross-funktionales Team arbeitet derzeit an einer komplexen Cloud-Migration, die die gesamte IT-Infrastruktur modernisieren wird.', fa: 'تیم چندوظیفه‌ای ما در حال حاضر روی یک مهاجرت پیچیده ابری کار می‌کند که کل زیرساخت فناوری اطلاعات را مدرن خواهد کرد.' },
        { de: 'Seit meinem Masterabschluss arbeite ich bei einem führenden Fintech-Unternehmen im Bereich digitale Zahlungssysteme.', fa: 'از زمان فارغ‌التحصیلی کارشناسی ارشد، در یک شرکت پیشرو فین‌تک در حوزه سیستم‌های پرداخت دیجیتال کار می‌کنم.' },
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
        { de: 'Der Vorstandsvorsitzende forderte alle Abteilungsleiter zur verstärkten Zusammenarbeit und zum Abbau von Silo-Strukturen auf.', fa: 'رئیس هیئت مدیره از تمام مدیران بخش‌ها برای همکاری تقویت‌شده و حذف ساختارهای جداافتاده دعوت کرد.' },
        { de: 'Die Geschäftsführung fordert die Mitarbeiter zu kontinuierlicher Weiterbildung und Anpassung an neue Technologien auf.', fa: 'مدیریت از کارمندان برای آموزش مستمر و سازگاری با فناوری‌های جدید دعوت می‌کند.' },
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
        { de: 'Das Unternehmen muss dringend mit den veralteten Arbeitsmethoden aufhören und moderne agile Prozesse einführen.', fa: 'شرکت باید فوراً روش‌های کاری قدیمی را متوقف کند و فرآیندهای چابک مدرن را معرفی کند.' },
        { de: 'Nach der erfolgreichen Digitalisierung können wir mit den zeitraubenden manuellen Prozessen aufhören.', fa: 'بعد از دیجیتالی‌سازی موفق، می‌توانیم فرآیندهای دستی وقت‌گیر را متوقف کنیم.' },
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
        { de: 'Bei der Vertragsverhandlung müssen Sie besonders auf die Klauseln zur Haftungsbeschränkung und Kündigungsfristen aufpassen.', fa: 'در مذاکره قرارداد باید به‌ویژه مواظب بندهای محدودیت مسئولیت و مهلت‌های اخطار باشید.' },
        { de: 'Das Compliance-Team passt streng auf die Einhaltung aller regulatorischen Vorschriften auf.', fa: 'تیم انطباق به‌طور دقیق مواظب رعایت تمام مقررات نظارتی است.' },
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
        { de: 'Wir gehen davon aus, dass die Markteinführung planmäßig im dritten Quartal erfolgen kann und alle Genehmigungen vorliegen.', fa: 'ما فرض می‌کنیم که راه‌اندازی بازار طبق برنامه در سه‌ماهه سوم انجام می‌شود و تمام مجوزها در دست است.' },
        { de: 'Die Finanzanalysten gehen von einem moderaten Wachstum und stabilen Umsatzentwicklung im nächsten Geschäftsjahr aus.', fa: 'تحلیلگران مالی از رشد معتدل و توسعه فروش پایدار در سال مالی بعدی نتیجه می‌گیرند.' },
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
        { de: 'Unsere strategische Entscheidung basiert auf umfangreichen Marktanalysen, Kundenbefragungen und Wettbewerbsbeobachtungen.', fa: 'تصمیم استراتژیک ما بر تحلیل‌های گسترده بازار، نظرسنجی‌های مشتری و مشاهدات رقابتی مبتنی است.' },
        { de: 'Das innovative Geschäftsmodell basiert auf einer nachhaltigen Kreislaufwirtschaft und digitalen Plattformtechnologien.', fa: 'مدل کسب‌وکار نوآورانه بر اقتصاد گردشی پایدار و فناوری‌های پلتفرم دیجیتال مبتنی است.' },
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
        { de: 'Aufgrund ihrer herausragenden Leistungen und Führungsqualitäten wurde sie zur Senior Vice President befördert.', fa: 'به دلیل عملکرد برجسته و ویژگی‌های رهبری‌اش، او به معاون ارشد ارتقا یافت.' },
        { de: 'Nach erfolgreicher Projektleitung wurde er zum Director of Operations befördert und leitet nun ein Team von 50 Mitarbeitern.', fa: 'بعد از رهبری موفق پروژه، او به مدیر عملیات ارتقا یافت و اکنون یک تیم ۵۰ نفره را رهبری می‌کند.' },
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
        { de: 'Das gesamte Management beglückwünschte das Entwicklungsteam zum erfolgreichen Abschluss des anspruchsvollen Digitalisierungsprojekts.', fa: 'کل مدیریت تیم توسعه را به خاتمه موفقیت‌آمیز پروژه دیجیتالی‌سازی چالش‌برانگیز تبریک گفت.' },
        { de: 'Ich möchte Sie herzlich zur Übernahme der strategisch wichtigen Führungsposition beglückwünschen.', fa: 'می‌خواهم صمیمانه شما را به پذیرش موقعیت رهبری از نظر استراتژیک مهم تبریک بگویم.' },
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
        { de: 'Trotz intensiver Verhandlungen beharrt der Lieferant auf seinen ursprünglichen Vertragsbedingungen und Preisvorstellungen.', fa: 'علی‌رغم مذاکرات فشرده، تأمین‌کننده بر شرایط قراردادی و انتظارات قیمت اولیه خود پافشاری می‌کند.' },
        { de: 'Die Gewerkschaft beharrt auf einer deutlichen Lohnerhöhung und verbesserten Arbeitsbedingungen für alle Angestellten.', fa: 'اتحادیه بر افزایش قابل توجه دستمزد و بهبود شرایط کاری برای تمام کارمندان پافشاری می‌کند.' },
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
        { de: 'Innovative Technologien und effiziente Prozesse tragen maßgeblich zur Wettbewerbsfähigkeit und Profitabilität des Unternehmens bei.', fa: 'فناوری‌های نوآورانه و فرآیندهای کارآمد به‌طور قابل توجهی به رقابت‌پذیری و سودآوری شرکت کمک می‌کنند.' },
        { de: 'Die Mitarbeiterschulungen tragen erheblich zur Steigerung der Produktivität und Mitarbeiterzufriedenheit bei.', fa: 'آموزش‌های کارمندان به‌طور قابل توجهی به افزایش بهره‌وری و رضایت کارمندان کمک می‌کنند.' },
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
        { de: 'Die Personalabteilung bemüht sich intensiv um die Gewinnung hochqualifizierter Fachkräfte aus dem internationalen Talentpool.', fa: 'بخش منابع انسانی به‌طور فشرده برای جذب نیروهای متخصص بسیار واجد شرایط از استخر استعدادهای بین‌المللی تلاش می‌کند.' },
        { de: 'Das Unternehmen bemüht sich um eine nachhaltige Reduzierung des CO2-Ausstoßes und klimaneutrale Produktion.', fa: 'شرکت برای کاهش پایدار انتشار CO2 و تولید خنثی از نظر اقلیمی تلاش می‌کند.' },
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
        { de: 'Der Projektleiter berichtet monatlich über den Fortschritt, die Budgetentwicklung und potenzielle Risiken an das Steering Committee.', fa: 'مدیر پروژه ماهانه درباره پیشرفت، توسعه بودجه و خطرات احتمالی به کمیته راهبری گزارش می‌دهد.' },
        { de: 'Die Fachmedien berichten ausführlich von den neuesten Entwicklungen in der künstlichen Intelligenz und Quantencomputing.', fa: 'رسانه‌های تخصصی به‌طور مفصل از آخرین پیشرفت‌ها در هوش مصنوعی و محاسبات کوانتومی گزارش می‌دهند.' },
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
        { de: 'Die Wirtschaftsanalysten beschreiben die aktuelle Marktsituation als herausfordernd, aber mit erheblichem Wachstumspotenzial.', fa: 'تحلیلگران اقتصادی وضعیت فعلی بازار را چالش‌برانگیز اما با پتانسیل رشد قابل توجه توصیف می‌کنند.' },
        { de: 'Branchenexperten beschreiben diese technologische Innovation als bahnbrechend für die gesamte Industrie.', fa: 'کارشناسان صنعت این نوآوری فناوری را به‌عنوان پیشگامانه برای کل صنعت توصیف می‌کنند.' },
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
        { de: 'Der Kunde besteht auf einer detaillierten Dokumentation aller Projektphasen und regelmäßigen Qualitätskontrollen.', fa: 'مشتری بر مستندسازی دقیق تمام مراحل پروژه و کنترل‌های منظم کیفیت پافشاری می‌کند.' },
        { de: 'Unser integriertes Managementsystem besteht aus mehreren miteinander verbundenen Modulen für verschiedene Geschäftsprozesse.', fa: 'سیستم مدیریت یکپارچه ما از چندین ماژول به‌هم‌پیوسته برای فرآیندهای مختلف کسب‌وکار ساخته شده است.' },
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
        { de: 'Branchenkenner bezeichnen diese Fusion als wegweisend für die zukünftige Marktkonsolidierung.', fa: 'کارشناسان صنعت این ادغام را به‌عنوان راهگشا برای تحکیم بازار آینده می‌نامند.' },
        { de: 'Das Wirtschaftsmagazin bezeichnet unser Startup als eines der innovativsten Unternehmen des Jahres.', fa: 'مجله اقتصادی استارتاپ ما را به‌عنوان یکی از نوآورترین شرکت‌های سال می‌نامد.' },
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
        { de: 'In meiner Antwort beziehe ich mich auf Ihre ausführliche Anfrage vom letzten Monat bezüglich der Vertragskonditionen.', fa: 'در پاسخم به درخواست جامع شما از ماه گذشته در مورد شرایط قرارداد اشاره می‌کنم.' },
        { de: 'Diese Analyse bezieht sich auf umfangreiche Marktdaten der letzten drei Geschäftsjahre.', fa: 'این تحلیل به داده‌های گسترده بازار از سه سال مالی گذشته اشاره دارد.' },
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
        { de: 'Die unerwarteten Quartalsergebnisse brachten den CFO zum Überdenken der ursprünglichen Finanzstrategie.', fa: 'نتایج غیرمنتظره سه‌ماهه مدیر مالی را به بازنگری استراتژی مالی اولیه وادار کرد.' },
        { de: 'Diese Entwicklung könnte das Management dazu bringen, die Expansionspläne grundlegend zu überarbeiten.', fa: 'این توسعه می‌تواند مدیریت را به بازنگری اساسی برنامه‌های گسترش وادار کند.' },
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
        { de: 'Nach intensiven Beratungen hat sich der Vorstand zu einer strategischen Neuausrichtung des Unternehmens entschlossen.', fa: 'بعد از مشاوره‌های فشرده، هیئت مدیره تصمیم به جهت‌گیری استراتژیک جدید شرکت گرفته است.' },
        { de: 'Aufgrund der Marktentwicklung haben wir uns zu einer vorzeitigen Produkteinführung entschlossen.', fa: 'به دلیل توسعه بازار، ما تصمیم به راه‌اندازی زودهنگام محصول گرفته‌ایم.' },
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
        { de: 'Das Unternehmen entschuldigt sich bei allen betroffenen Kunden für die technischen Störungen und die entstandenen Unannehmlichkeiten.', fa: 'شرکت از تمام مشتریان آسیب‌دیده برای اختلالات فنی و ناراحتی‌های ایجاد شده عذرخواهی می‌کند.' },
        { de: 'Ich möchte mich aufrichtig bei Ihnen für die Verzögerung in der Projektabwicklung entschuldigen.', fa: 'می‌خواهم صمیمانه از شما برای تأخیر در اجرای پروژه عذرخواهی کنم.' },
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
        { de: 'Das kleine Startup hat sich innerhalb von fünf Jahren zu einem führenden Anbieter im Bereich Cloud-Computing entwickelt.', fa: 'استارتاپ کوچک در عرض پنج سال به یک ارائه‌دهنده پیشرو در حوزه محاسبات ابری تبدیل شده است.' },
        { de: 'Diese Technologie entwickelt sich zunehmend zu einem unverzichtbaren Bestandteil moderner Produktionsprozesse.', fa: 'این فناوری به‌طور فزاینده‌ای به یک جزء ضروری فرآیندهای تولید مدرن تبدیل می‌شود.' },
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
        { de: 'Die Wirtschaft erholt sich nur langsam von den Auswirkungen der globalen Finanzkrise und strukturellen Veränderungen.', fa: 'اقتصاد تنها به‌کندی از تأثیرات بحران مالی جهانی و تغییرات ساختاری بهبود می‌یابد.' },
        { de: 'Das Unternehmen konnte sich erstaunlich schnell von den Produktionsausfällen erholen und die Lieferketten stabilisieren.', fa: 'شرکت توانست به‌طرز شگفت‌انگیزی سریع از اختلالات تولید بهبود یابد و زنجیره‌های تأمین را تثبیت کند.' },
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
        { de: 'Man erkennt erfolgreiche Führungskräfte an ihrer Fähigkeit, Teams zu motivieren und strategische Visionen umzusetzen.', fa: 'رهبران موفق را از توانایی‌شان در ایجاد انگیزه در تیم‌ها و اجرای چشم‌اندازهای استراتژیک می‌شناسند.' },
        { de: 'Die Qualität eines Produkts erkennt man oft an den verwendeten Materialien und der Verarbeitungspräzision.', fa: 'کیفیت یک محصول را اغلب از مواد استفاده‌شده و دقت پردازش می‌شناسند.' },
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
        { de: 'Bitte erkundigen Sie sich bei der Personalabteilung nach den genauen Einstellungsvoraussetzungen und dem Bewerbungsverfahren.', fa: 'لطفاً از بخش منابع انسانی درباره شرایط دقیق استخدام و روند درخواست پرس‌وجو کنید.' },
        { de: 'Ich habe mich bereits bei mehreren Lieferanten nach den aktuellen Marktpreisen und Lieferbedingungen erkundigt.', fa: 'من قبلاً از چندین تأمین‌کننده درباره قیمت‌های فعلی بازار و شرایط تحویل پرس‌وجو کرده‌ام.' },
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
        { de: 'Das Unternehmen ernährt sich hauptsächlich von langfristigen Serviceverträgen und wiederkehrenden Abonnementeinnahmen.', fa: 'شرکت عمدتاً از قراردادهای خدماتی بلندمدت و درآمدهای تکراری اشتراک تغذیه می‌کند.' },
        { de: 'In der Anfangsphase ernährte sich das Startup ausschließlich von Risikokapital und strategischen Investitionen.', fa: 'در مرحله اولیه، استارتاپ منحصراً از سرمایه ریسک‌پذیر و سرمایه‌گذاری‌های استراتژیک تأمین می‌شد.' },
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
        { de: 'Das Management ist über die dramatischen Umsatzrückgänge im letzten Quartal und die verschlechterte Marktposition erschrocken.', fa: 'مدیریت از کاهش چشمگیر فروش در سه‌ماهه گذشته و موقعیت بدتر شده بازار شوکه شده است.' },
        { de: 'Viele Investoren sind vor der Volatilität der Märkte und den geopolitischen Unsicherheiten erschrocken.', fa: 'بسیاری از سرمایه‌گذاران از نوسانات بازارها و عدم قطعیت‌های ژئوپلیتیک ترسیده‌اند.' },
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
        { de: 'Was erwarten Sie von einem idealen Arbeitgeber in Bezug auf Work-Life-Balance und Karriereentwicklung?', fa: 'از یک کارفرمای ایده‌آل در رابطه با تعادل کار-زندگی و توسعه شغلی چه انتظاری دارید؟' },
        { de: 'Die Aktionäre erwarten von der neuen Geschäftsführung konkrete Maßnahmen zur Umsatzsteigerung und Kostenoptimierung.', fa: 'سهامداران از مدیریت جدید اقدامات مشخص برای افزایش فروش و بهینه‌سازی هزینه‌ها انتظار دارند.' },
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
        { de: 'Der Projektleiter erzählte begeistert von den innovativen Lösungen, die das Team während der Entwicklungsphase erarbeitet hat.', fa: 'مدیر پروژه با شور درباره راه‌حل‌های نوآورانه‌ای که تیم در طول مرحله توسعه ایجاد کرده، تعریف کرد.' },
        { de: 'In seinem Vortrag erzählte er ausführlich über die Herausforderungen der digitalen Transformation in traditionellen Branchen.', fa: 'در سخنرانی‌اش، او به‌طور مفصل درباره چالش‌های تحول دیجیتال در صنایع سنتی تعریف کرد.' },
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
        { de: 'Moderne Bildungseinrichtungen sollten junge Menschen zu kritischem Denken und unternehmerischer Selbstständigkeit erziehen.', fa: 'موسسات آموزشی مدرن باید جوانان را به تفکر انتقادی و استقلال کارآفرینانه تربیت کنند.' },
        { de: 'Das Führungskräfte-Entwicklungsprogramm erzieht Nachwuchstalente zu verantwortungsbewussten Entscheidungsträgern.', fa: 'برنامه توسعه رهبری، استعدادهای نوظهور را به تصمیم‌گیرندگان مسئولیت‌پذیر تربیت می‌کند.' },
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
        { de: 'In dieser Verhandlung geht es um weitreichende strategische Partnerschaften und langfristige Marktpositionen.', fa: 'در این مذاکره موضوع مشارکت‌های استراتژیک گسترده و موقعیت‌های بلندمدت بازار است.' },
        { de: 'Bei der Digitalisierung geht es nicht nur um Technologie, sondern vor allem um kulturellen Wandel und Prozessoptimierung.', fa: 'در دیجیتالی‌سازی فقط درباره فناوری نیست، بلکه بیش از همه درباره تغییر فرهنگی و بهینه‌سازی فرآیند است.' },
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
        { de: 'Bei diesem Projekt handelt es sich um eine umfassende Modernisierung der gesamten IT-Infrastruktur und Geschäftsprozesse.', fa: 'این پروژه یک نوسازی جامع کل زیرساخت فناوری اطلاعات و فرآیندهای کسب‌وکار است.' },
        { de: 'Es handelt sich hierbei um eine strategisch wichtige Entscheidung mit erheblichen Auswirkungen auf die Unternehmensentwicklung.', fa: 'این یک تصمیم از نظر استراتژیک مهم با تأثیرات قابل توجه بر توسعه شرکت است.' },
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
        { de: 'Bei erfolgreicher Projektdurchführung kommt es vor allem auf effektive Kommunikation, präzise Planung und flexibles Risikomanagement an.', fa: 'برای اجرای موفق پروژه، بیش از همه به ارتباطات مؤثر، برنامه‌ریزی دقیق و مدیریت ریسک انعطاف‌پذیر بستگی دارد.' },
        { de: 'In Verhandlungen kommt es entscheidend auf strategisches Geschick und fundiertes Fachwissen an.', fa: 'در مذاکرات، به‌طور تعیین‌کننده به مهارت استراتژیک و دانش تخصصی مستدل بستگی دارد.' },
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
        { de: 'Viele Unternehmen fliehen vor hohen Steuern und strengen Regulierungen in wirtschaftsfreundlichere Standorte.', fa: 'بسیاری از شرکت‌ها از مالیات‌های بالا و مقررات سختگیرانه به مکان‌های مناسب‌تر برای کسب‌وکار فرار می‌کنند.' },
        { de: 'Investoren fliehen zunehmend vor volatilen Märkten und suchen nach stabileren Anlageformen.', fa: 'سرمایه‌گذاران به‌طور فزاینده‌ای از بازارهای نوسانی فرار می‌کنند و به دنبال اشکال سرمایه‌گذاری پایدارتر هستند.' },
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
        { de: 'Qualifizierte Fachkräfte flüchten vor unsicheren Beschäftigungsverhältnissen und suchen stabile Karrieremöglichkeiten im Ausland.', fa: 'نیروهای متخصص واجد شرایط از روابط شغلی ناامن فرار می‌کنند و به دنبال فرصت‌های شغلی پایدار در خارج از کشور هستند.' },
        { de: 'Startups flüchten vor überregulierten Märkten in innovationsfreundlichere Wirtschaftsräume.', fa: 'استارتاپ‌ها از بازارهای بیش‌از‌حد تنظیم‌شده به فضاهای اقتصادی سازگارتر با نوآوری فرار می‌کنند.' },
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
        { de: 'Die Aufsichtsbehörde fordert von allen Finanzinstituten eine umfassende Offenlegung der Risikostrukturen.', fa: 'مقامات نظارتی از تمام موسسات مالی افشای جامع ساختارهای ریسک را مطالبه می‌کنند.' },
        { de: 'Was fordern die Aktionäre vom neuen Vorstandsvorsitzenden in Bezug auf die Unternehmensausrichtung?', fa: 'سهامداران از رئیس جدید هیئت مدیره در رابطه با جهت‌گیری شرکت چه مطالبه می‌کنند?' },
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
        { de: 'Potenzielle Kandidaten fragen zunehmend nach flexiblen Arbeitsmodellen, Weiterbildungsmöglichkeiten und Work-Life-Balance.', fa: 'نامزدهای بالقوه به‌طور فزاینده‌ای درباره مدل‌های کاری انعطاف‌پذیر، فرصت‌های آموزش و تعادل کار-زندگی سوال می‌کنند.' },
        { de: 'Investoren fragen verstärkt nach ESG-Kriterien und der Nachhaltigkeitsstrategie des Unternehmens.', fa: 'سرمایه‌گذاران به‌طور فزاینده درباره معیارهای ESG و استراتژی پایداری شرکت سوال می‌کنند.' },
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
        { de: 'Mangelnde Kommunikation zwischen Abteilungen führt häufig zu ineffizienten Prozessen und Projektverzögerungen.', fa: 'کمبود ارتباط بین بخش‌ها اغلب به فرآیندهای ناکارآمد و تأخیرهای پروژه منجر می‌شود.' },
        { de: 'Die erfolgreiche Digitalisierung führt zu erheblichen Wettbewerbsvorteilen und Kosteneinsparungen.', fa: 'دیجیتالی‌سازی موفق به مزایای رقابتی قابل توجه و صرفه‌جویی در هزینه‌ها منجر می‌شود.' },
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
        { de: 'Viele etablierte Unternehmen fürchten sich vor disruptiven Technologien und agilen Marktkonkurrenten.', fa: 'بسیاری از شرکت‌های مستقر از فناوری‌های مخرب و رقبای چابک بازار می‌ترسند.' },
        { de: 'Mittelständische Betriebe fürchten sich zunehmend vor dem Fachkräftemangel und steigenden Produktionskosten.', fa: 'کسب‌وکارهای متوسط به‌طور فزاینده‌ای از کمبود نیروی متخصص و افزایش هزینه‌های تولید می‌ترسند.' },
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
        { de: 'Neue Mitarbeiter müssen sich an die dynamische Unternehmenskultur und die agilen Arbeitsmethoden gewöhnen.', fa: 'کارمندان جدید باید به فرهنگ سازمانی پویا و روش‌های کاری چابک عادت کنند.' },
        { de: 'Die gesamte Belegschaft gewöhnt sich allmählich an die digitalen Kollaborationstools und Remote-Arbeit.', fa: 'کل نیروی کار به‌تدریج به ابزارهای همکاری دیجیتال و کار از راه دور عادت می‌کنند.' },
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
        { de: 'Die umfassende Marktanalyse gliedert sich in fünf Hauptbereiche: Wettbewerb, Kundenverhalten, Trends, Risiken und Chancen.', fa: 'تحلیل جامع بازار به پنج حوزه اصلی تقسیم می‌شود: رقابت، رفتار مشتری، روندها، ریسک‌ها و فرصت‌ها.' },
        { de: 'Das Entwicklungsprojekt gliedert sich in mehrere zeitlich versetzte Phasen mit definierten Meilensteinen.', fa: 'پروژه توسعه به چندین مرحله زمان‌بندی‌شده با نقاط عطف تعریف‌شده تقسیم می‌شود.' },
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
        { de: 'Branchenexperten halten die geplante Fusion für strategisch sinnvoll und wirtschaftlich vielversprechend.', fa: 'کارشناسان صنعت ادغام برنامه‌ریزی‌شده را از نظر استراتژیک منطقی و از نظر اقتصادی امیدوارکننده می‌دانند.' },
        { de: 'Was halten Sie von der vorgeschlagenen Organisationsrestrukturierung und den damit verbundenen Änderungen?', fa: 'درباره بازسازی سازمانی پیشنهادی و تغییرات مرتبط با آن چه فکر می‌کنید؟' },
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
        { de: 'Der ausführliche Geschäftsbericht handelt von strategischen Herausforderungen, Marktentwicklungen und Zukunftsaussichten.', fa: 'گزارش کسب‌وکار جامع درباره چالش‌های استراتژیک، توسعه‌های بازار و چشم‌انداز آینده است.' },
        { de: 'Unser Unternehmen handelt mit hochspezialisierten Industriekomponenten und technologischen Systemlösungen.', fa: 'شرکت ما در قطعات صنعتی بسیار تخصصی و راه‌حل‌های سیستمی فناوری معامله می‌کند.' },
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
        { de: 'Erfolgreiche Führungskräfte hören aufmerksam auf das Feedback ihrer Mitarbeiter und die Signale des Marktes.', fa: 'رهبران موفق با دقت به بازخورد کارمندان و سیگنال‌های بازار گوش می‌دهند.' },
        { de: 'Das Management sollte mehr auf die Bedenken der Betriebsräte und die Bedürfnisse der Belegschaft hören.', fa: 'مدیریت باید بیشتر به نگرانی‌های شوراهای کارگری و نیازهای نیروی کار گوش دهد.' },
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
        { de: 'Innovative Startups kämpfen für Marktanteile und gegen etablierte Konzerne, während sie um Risikokapital und talentierte Mitarbeiter kämpfen.', fa: 'استارتاپ‌های نوآور برای سهم بازار و علیه شرکت‌های مستقر مبارزه می‌کنند، در حالی که برای سرمایه ریسک‌پذیر و کارمندان با استعداد مبارزه می‌کنند.' },
        { de: 'Gewerkschaften kämpfen für bessere Arbeitsbedingungen und gegen prekäre Beschäftigungsverhältnisse.', fa: 'اتحادیه‌ها برای شرایط کاری بهتر و علیه روابط شغلی ناپایدار مبارزه می‌کنند.' },
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
        { de: 'Viele Mittelständler klagen über bürokratische Hürden, Fachkräftemangel und steigende Energiekosten.', fa: 'بسیاری از کسب‌وکارهای متوسط از موانع بوروکراتیک، کمبود نیروی متخصص و افزایش هزینه‌های انرژی شکایت می‌کنند.' },
        { de: 'Kunden klagen zunehmend über lange Lieferzeiten und unzureichenden Kundenservice.', fa: 'مشتریان به‌طور فزاینده‌ای از زمان‌های تحویل طولانی و خدمات مشتری ناکافی شکایت می‌کنند.' },
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
        { de: 'Das Unternehmen konzentriert sich künftig auf Kernkompetenzen und strategisch relevante Geschäftsfelder.', fa: 'شرکت در آینده بر شایستگی‌های اصلی و حوزه‌های کسب‌وکار مرتبط با استراتژی تمرکز می‌کند.' },
        { de: 'In dieser kritischen Projektphase müssen wir uns ausschließlich auf die Qualitätssicherung und termingerechte Lieferung konzentrieren.', fa: 'در این مرحله حیاتی پروژه، باید منحصراً بر تضمین کیفیت و تحویل به‌موقع تمرکز کنیم.' },
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
        { de: 'Man sollte über eigene Fehler lachen können und daraus konstruktiv lernen, statt sie zu verdrängen.', fa: 'باید بتوان به اشتباهات خودمان خندید و به‌طور سازنده از آن‌ها یاد گرفت، به جای سرکوب کردن آن‌ها.' },
        { de: 'Manche Wettbewerber lachten anfangs über unser disruptives Geschäftsmodell, bis wir Marktführer wurden.', fa: 'برخی رقبا ابتدا به مدل کسب‌وکار مخرب ما خندیدند، تا اینکه ما رهبر بازار شدیم.' },
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
        { de: 'Zahlreiche Unternehmen leiden an ineffizienten Prozessen und mangelnder digitaler Infrastruktur.', fa: 'شرکت‌های متعددی از فرآیندهای ناکارآمد و کمبود زیرساخت دیجیتال رنج می‌برند.' },
        { de: 'Die Mitarbeiter leiden unter permanentem Zeitdruck, ständigen Reorganisationen und unklaren Zuständigkeiten.', fa: 'کارمندان از فشار زمانی دائمی، بازسازی‌های مداوم و مسئولیت‌های نامشخص رنج می‌برند.' },
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
        { de: 'Der Projekterfolg liegt hauptsächlich an der hervorragenden Teamarbeit und dem engagierten Projektmanagement.', fa: 'موفقیت پروژه عمدتاً به دلیل کار تیمی عالی و مدیریت پروژه متعهد است.' },
        { de: 'Die Verzögerung liegt an ungeklärten Vertragsbedingungen und fehlenden behördlichen Genehmigungen.', fa: 'تأخیر به دلیل شرایط قراردادی روشن‌نشده و کمبود مجوزهای اداری است.' },
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
        { de: 'Das Management denkt intensiv über strategische Neuausrichtungen und mögliche Geschäftsmodellinnovationen nach.', fa: 'مدیریت به‌طور فشرده درباره جهت‌گیری‌های استراتژیک جدید و نوآوری‌های احتمالی مدل کسب‌وکار فکر می‌کند.' },
        { de: 'Wir sollten gründlich über die langfristigen Konsequenzen dieser Investitionsentscheidung nachdenken.', fa: 'ما باید به‌طور کامل درباره پیامدهای بلندمدت این تصمیم سرمایه‌گذاری فکر کنیم.' },
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
        { de: 'Unerfahrene Projektmanager neigen zu unrealistischen Zeitplanungen und Ressourcenunterschätzungen.', fa: 'مدیران پروژه بی‌تجربه تمایل به برنامه‌ریزی زمانی غیرواقعی و دست‌کم گرفتن منابع دارند.' },
        { de: 'In Krisenzeiten neigen Entscheidungsträger oft zu kurzfristigen Lösungen statt strategischem Denken.', fa: 'در زمان‌های بحران، تصمیم‌گیرندگان اغلب تمایل به راه‌حل‌های کوتاه‌مدت به جای تفکر استراتژیک دارند.' },
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
        { de: 'Die Unternehmensphilosophie des Startups passt perfekt zur innovativen und agilen Arbeitsweise unseres Teams.', fa: 'فلسفه شرکت استارتاپ کاملاً با روش کار نوآورانه و چابک تیم ما می‌خواند.' },
        { de: 'Diese Investitionsstrategie passt nicht zu unseren langfristigen Nachhaltigkeitszielen und Risikoprofilen.', fa: 'این استراتژی سرمایه‌گذاری با اهداف پایداری بلندمدت و پروفایل‌های ریسک ما سازگار نیست.' },
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
        { de: 'Umweltaktivisten protestieren vehement gegen umweltschädliche Produktionsmethoden und mangelnde Corporate Responsibility.', fa: 'فعالان محیط‌زیست به شدت علیه روش‌های تولید مضر برای محیط‌زیست و کمبود مسئولیت‌پذیری شرکتی اعتراض می‌کنند.' },
        { de: 'Arbeitnehmervertreter protestieren gegen geplante Standortschließungen und massive Stellenstreichungen.', fa: 'نمایندگان کارگران علیه تعطیلی برنامه‌ریزی‌شده مکان‌ها و کاهش گسترده مشاغل اعتراض می‌کنند.' },
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
        { de: 'Unternehmensberater raten zu umfassender Digitalisierung, agilen Strukturen und kontinuierlicher Mitarbeiterentwicklung.', fa: 'مشاوران کسب‌وکار به دیجیتالی‌سازی جامع، ساختارهای چابک و توسعه مستمر کارمندان توصیه می‌کنند.' },
        { de: 'Ich rate Ihnen dringend zu einer sorgfältigen Due-Diligence-Prüfung vor der finalen Investitionsentscheidung.', fa: 'اکیداً به شما توصیه می‌کنم قبل از تصمیم سرمایه‌گذاری نهایی، بررسی دقیق سررسید انجام دهید.' },
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
        { de: 'Wie reagieren Sie auf konstruktive Kritik und Verbesserungsvorschläge im beruflichen Kontext?', fa: 'شما چگونه به انتقاد سازنده و پیشنهادات بهبود در زمینه حرفه‌ای واکنش نشان می‌دهید؟' },
        { de: 'Das Unternehmen muss flexibel auf veränderte Marktbedingungen und evolvierende Kundenbedürfnisse reagieren können.', fa: 'شرکت باید بتواند به‌طور انعطاف‌پذیر به شرایط تغییریافته بازار و نیازهای در حال تکامل مشتری واکنش نشان دهد.' },
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
        { de: 'Wir müssen offen mit allen Stakeholdern über die strategischen Herausforderungen und Zukunftspläne reden.', fa: 'ما باید به‌طور باز با تمام ذینفعان درباره چالش‌های استراتژیک و برنامه‌های آینده صحبت کنیم.' },
        { de: 'In der Führungsebene redet man selten über gescheiterte Projekte, dabei könnten wir daraus viel lernen.', fa: 'در سطح رهبری به ندرت درباره پروژه‌های شکست‌خورده صحبت می‌کنند، در حالی که می‌توانیم از آن‌ها زیاد یاد بگیریم.' },
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
        { de: 'Erfahrene Investoren riechen oft nach faulen Geschäften, bevor alle Fakten auf dem Tisch liegen.', fa: 'سرمایه‌گذاران با تجربه اغلب معاملات مشکوک را قبل از اینکه تمام حقایق روی میز باشد، حس می‌کنند.' },
        { de: 'Die ganze Situation riecht nach mangelnder Transparenz und unzureichender Due Diligence.', fa: 'کل وضعیت بوی کمبود شفافیت و بررسی ناکافی را می‌دهد.' },
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
        { de: 'Angesichts der kritischen Sicherheitslücke ruft das IT-Team sofort nach externer Unterstützung durch Cybersecurity-Spezialisten.', fa: 'با توجه به آسیب‌پذیری امنیتی حیاتی، تیم فناوری اطلاعات فوراً از متخصصان امنیت سایبری کمک می‌خواهد.' },
        { de: 'Der Markt ruft zunehmend nach nachhaltigen und ethisch vertretbaren Produktionsmethoden.', fa: 'بازار به‌طور فزاینده‌ای درخواست روش‌های تولید پایدار و قابل دفاع از نظر اخلاقی دارد.' },
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
        { de: 'Bitte schicken Sie die vollständigen Vertragsunterlagen und Compliance-Dokumente an unsere Rechtsabteilung.', fa: 'لطفاً اسناد قرارداد کامل و مدارک انطباق را به بخش حقوقی ما بفرستید.' },
        { de: 'Das Headquarter schickt regelmäßig erfahrene Berater an internationale Niederlassungen zur Prozessoptimierung.', fa: 'دفتر مرکزی به‌طور منظم مشاوران با تجربه را به شعب بین‌المللی برای بهینه‌سازی فرآیند می‌فرستد.' },
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
        { de: 'Viele Kunden schimpfen auf lange Wartezeiten und umständliche Bestellprozesse in unserem Online-Shop.', fa: 'بسیاری از مشتریان از زمان‌های انتظار طولانی و فرآیندهای سفارش پیچیده در فروشگاه آنلاین ما شکایت می‌کنند.' },
        { de: 'Mitarbeiter schimpfen über fehlende Entscheidungsbefugnisse und bürokratische Genehmigungsverfahren.', fa: 'کارمندان از کمبود اختیارات تصمیم‌گیری و رویه‌های تأیید بوروکراتیک شکایت می‌کنند.' },
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
        { de: 'Diese Übernahmestrategie schmeckt verdächtig nach kurzfristigem Profitdenken ohne Rücksicht auf Nachhaltigkeit.', fa: 'این استراتژی تصاحب به‌طور مشکوکی طعم تفکر سود کوتاه‌مدت بدون توجه به پایداری را می‌دهد.' },
        { de: 'Die vorgeschlagenen Maßnahmen schmecken nach Kostenreduzierung auf Kosten der Mitarbeiterzufriedenheit.', fa: 'اقدامات پیشنهادی طعم کاهش هزینه به قیمت رضایت کارمندان را دارد.' },
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
        { de: 'Die Geschäftsführung ängstigt sich um die Wettbewerbsfähigkeit des Unternehmens in Zeiten rasanter technologischer Disruption.', fa: 'مدیریت نگران رقابت‌پذیری شرکت در زمان‌های اختلال فناوری سریع است.' },
        { de: 'Viele Arbeitnehmer ängstigen sich um ihre Arbeitsplätze angesichts zunehmender Automatisierung und KI-Integration.', fa: 'بسیاری از کارکنان نگران شغل خود در مواجهه با افزایش اتوماسیون و یکپارچگی هوش مصنوعی هستند.' },
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
        { de: 'Erfolgreiche Unternehmen müssen sich kontinuierlich an dynamische Marktveränderungen und evolvierende Kundenbedürfnisse anpassen.', fa: 'شرکت‌های موفق باید به‌طور مستمر خود را با تغییرات پویای بازار و نیازهای در حال تکامل مشتری وفق دهند.' },
        { de: 'Führungskräfte sollten sich an verschiedene Kulturen und Arbeitsstile anpassen können, besonders in internationalen Teams.', fa: 'رهبران باید بتوانند خود را با فرهنگ‌ها و سبک‌های کاری مختلف وفق دهند، به‌ویژه در تیم‌های بین‌المللی.' },
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
        { de: 'Es bringt nichts, sich über Dinge aufzuregen, die außerhalb unseres Einflussbereichs liegen - besser konstruktiv handeln.', fa: 'فایده‌ای ندارد که از چیزهایی که خارج از حوزه نفوذ ما هستند عصبانی شویم - بهتر است سازنده عمل کنیم.' },
        { de: 'Das Management regt sich über sinkende Produktivitätszahlen auf, statt die systematischen Ursachen zu analysieren.', fa: 'مدیریت از کاهش اعداد بهره‌وری عصبانی می‌شود، به جای تحلیل علل سیستماتیک.' },
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
        { de: 'Als Projektleiter muss ich mich intensiv mit komplexen technischen Anforderungen und widersprüchlichen Stakeholder-Interessen auseinandersetzen.', fa: 'به‌عنوان مدیر پروژه، باید به‌طور فشرده با الزامات فنی پیچیده و منافع متناقض ذینفعان درگیر شوم.' },
        { de: 'Die Rechtsabteilung setzt sich gründlich mit den neuen EU-Regulierungen und deren Auswirkungen auf unser Geschäftsmodell auseinander.', fa: 'بخش حقوقی به‌طور کامل با مقررات جدید اتحادیه اروپا و تأثیرات آن بر مدل کسب‌وکار ما درگیر می‌شود.' },
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
        { de: 'Ich möchte mich herzlich bei Ihnen für die konstruktive Zusammenarbeit während des gesamten Projektverlaufs bedanken.', fa: 'می‌خواهم صمیمانه از شما برای همکاری سازنده در طول کل پروژه تشکر کنم.' },
        { de: 'Die Geschäftsführung bedankt sich bei allen Mitarbeitern für ihr außergewöhnliches Engagement in der Krise.', fa: 'مدیریت از تمام کارمندان برای تعهد فوق‌العاده‌شان در بحران تشکر می‌کند.' },
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
        { de: 'Das Unternehmen muss sich von veralteten Denkmustern und rigiden hierarchischen Strukturen befreien, um innovativ zu bleiben.', fa: 'شرکت باید خود را از الگوهای فکری قدیمی و ساختارهای سلسله‌مراتبی سخت رها کند تا نوآور باقی بماند.' },
        { de: 'Viele Führungskräfte können sich nicht von Mikromanagement und Kontrollzwang befreien, was die Teamautonomie einschränkt.', fa: 'بسیاری از رهبران نمی‌توانند خود را از مدیریت جزئی و اجبار کنترل رها کنند که استقلال تیم را محدود می‌کند.' },
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
        { de: 'Mitarbeiter beklagen sich bei der Personalabteilung über unfaire Leistungsbeurteilungen und intransparente Beförderungskriterien.', fa: 'کارمندان نزد بخش منابع انسانی از ارزیابی‌های عملکرد ناعادلانه و معیارهای ارتقا غیرشفاف شکایت می‌کنند.' },
        { de: 'Kunden beklagen sich zunehmend beim Kundenservice über mangelnde Produktqualität und unzureichende Garantieleistungen.', fa: 'مشتریان به‌طور فزاینده‌ای نزد خدمات مشتری از کیفیت ناکافی محصول و خدمات گارانتی ناکافی شکایت می‌کنند.' },
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
        { de: 'Ich habe mich formal beim Projektmanager über die unklare Aufgabenverteilung und fehlende Kommunikation beschwert.', fa: 'من به‌طور رسمی نزد مدیر پروژه از تقسیم وظایف نامشخص و کمبود ارتباطات شکایت کرده‌ام.' },
        { de: 'Lieferanten beschweren sich beim Einkauf über verzögerte Zahlungen und einseitige Vertragsänderungen.', fa: 'تأمین‌کنندگان نزد بخش خرید از پرداخت‌های تأخیری و تغییرات یک‌طرفه قرارداد شکایت می‌کنند.' },
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
        { de: 'Nach fünf Jahren Berufserfahrung im Projektmanagement bewerbe ich mich nun um die Position als Senior Product Manager bei einem internationalen Tech-Konzern.', fa: 'بعد از پنج سال تجربه حرفه‌ای در مدیریت پروژه، اکنون برای موقعیت مدیر ارشد محصول در یک شرکت بین‌المللی فناوری درخواست می‌دهم.' },
        { de: 'Aufgrund der attraktiven Unternehmenskultur und der Möglichkeiten zur beruflichen Weiterentwicklung hat sie sich bei diesem innovativen Startup beworben.', fa: 'به دلیل فرهنگ سازمانی جذاب و امکانات پیشرفت حرفه‌ای، او به این استارتاپ نوآور درخواست داده است.' },
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
        { de: 'In meiner Antwort beziehe ich mich auf Ihre ausführliche Anfrage vom letzten Monat bezüglich der Vertragskonditionen.', fa: 'در پاسخم به درخواست جامع شما از ماه گذشته در مورد شرایط قرارداد اشاره می‌کنم.' },
        { de: 'Diese Analyse bezieht sich auf umfangreiche Marktdaten der letzten drei Geschäftsjahre.', fa: 'این تحلیل به داده‌های گسترده بازار از سه سال مالی گذشته اشاره دارد.' },
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
        { de: 'Eine gut funktionierende Personalabteilung sorgt für angemessene Arbeitsbedingungen, faire Vergütung und kontinuierliche Mitarbeiterentwicklung.', fa: 'یک بخش منابع انسانی که به‌خوبی کار می‌کند، شرایط کاری مناسب، جبران خدمات عادلانه و توسعه مستمر کارمندان را تأمین می‌کند.' },
        { de: 'Das Qualitätsmanagement sorgt dafür, dass alle Produkte höchsten Standards entsprechen und Kundenzufriedenheit gewährleistet ist.', fa: 'مدیریت کیفیت اطمینان می‌دهد که تمام محصولات با بالاترین استانداردها مطابقت دارند و رضایت مشتری تضمین می‌شود.' },
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
        { de: 'Investoren sorgen sich um die langfristige Rentabilität und Marktposition des Unternehmens in einem zunehmend volatilen Umfeld.', fa: 'سرمایه‌گذاران نگران سودآوری بلندمدت و موقعیت بازار شرکت در یک محیط به‌طور فزاینده نوسانی هستند.' },
        { de: 'Viele Fachkräfte sorgen sich um ihre berufliche Zukunft angesichts rapider technologischer Veränderungen und Branchendisruptionen.', fa: 'بسیاری از نیروهای متخصص نگران آینده حرفه‌ای خود در مواجهه با تغییرات فناوری سریع و اختلالات صنعتی هستند.' },
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
        { de: 'Ich muss dringend mit der Geschäftsleitung über die strategische Ausrichtung und die notwendigen Investitionen sprechen.', fa: 'باید فوراً با مدیریت درباره جهت‌گیری استراتژیک و سرمایه‌گذاری‌های لازم صحبت کنم.' },
        { de: 'In der Branche spricht man viel von digitaler Transformation, aber nur wenige Unternehmen setzen sie konsequent um.', fa: 'در صنعت زیاد درباره تحول دیجیتال صحبت می‌شود، اما تنها تعداد کمی از شرکت‌ها آن را به‌طور مداوم اجرا می‌کنند.' },
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
        { de: 'Diese innovative Technologie stammt aus unserer unternehmenseigenen Forschungs- und Entwicklungsabteilung.', fa: 'این فناوری نوآورانه از بخش تحقیق و توسعه داخلی شرکت ما ریشه دارد.' },
        { de: 'Die meisten unserer erfolgreichen Geschäftsideen stammen von direktem Kundenfeedback und Marktbeobachtungen.', fa: 'بیشتر ایده‌های تجاری موفق ما از بازخورد مستقیم مشتری و مشاهدات بازار ریشه می‌گیرند.' },
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
        { de: 'Branchenexperten staunen über die beeindruckende Wachstumsgeschwindigkeit und Marktdurchdringung des Startups.', fa: 'کارشناسان صنعت از سرعت رشد چشمگیر و نفوذ بازار استارتاپ شگفت‌زده هستند.' },
        { de: 'Investoren staunen über die innovative Geschäftsmodelle und disruptiven Technologien im FinTech-Sektor.', fa: 'سرمایه‌گذاران از مدل‌های کسب‌وکار نوآورانه و فناوری‌های مخرب در بخش فین‌تک شگفت‌زده هستند.' },
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
        { de: 'Viele traditionelle Geschäftsmodelle sterben an ihrer mangelnden Anpassungsfähigkeit und Innovationsresistenz.', fa: 'بسیاری از مدل‌های کسب‌وکار سنتی به دلیل کمبود قابلیت سازگاری و مقاومت در برابر نوآوری از بین می‌روند.' },
        { de: 'Zahlreiche vielversprechende Startups sterben an unzureichender Finanzierung und fehlendem Marktzugang.', fa: 'استارتاپ‌های امیدوارکننده متعدد به دلیل تأمین مالی ناکافی و کمبود دسترسی به بازار شکست می‌خورند.' },
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
        { de: 'Der Aufsichtsrat stimmte mit großer Mehrheit für die vorgeschlagene Restrukturierung und strategische Neuausrichtung.', fa: 'شورای نظارت با اکثریت بزرگ به نفع بازسازی پیشنهادی و جهت‌گیری استراتژیک جدید رأی داد.' },
        { de: 'Die Aktionäre stimmten gegen den Übernahmevorschlag, da die Bewertung als zu niedrig eingeschätzt wurde.', fa: 'سهامداران علیه پیشنهاد تصاحب رأی دادند، چون ارزیابی بسیار پایین تخمین زده شد.' },
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
        { de: 'Das Management streitet heftig über die richtige Strategie zur Marktpositionierung und Ressourcenallokation.', fa: 'مدیریت به‌شدت درباره استراتژی صحیح برای موقعیت‌یابی بازار و تخصیص منابع دعوا می‌کند.' },
        { de: 'Die Abteilungen streiten sich mit dem Controlling um Budgetfreigaben und Investitionsprioritäten.', fa: 'بخش‌ها با کنترل درباره تأیید بودجه و اولویت‌های سرمایه‌گذاری دعوا می‌کنند.' },
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
        { de: 'Das Unternehmen sucht verzweifelt nach qualifizierten Fachkräften, erfahrenen Führungspersönlichkeiten und innovativen Talenten.', fa: 'شرکت به‌طور ناامیدانه به دنبال نیروهای متخصص واجد شرایط، شخصیت‌های رهبری با تجربه و استعدادهای نوآور است.' },
        { de: 'Investoren suchen ständig nach profitablen Geschäftsmodellen mit nachhaltigen Wettbewerbsvorteilen.', fa: 'سرمایه‌گذاران دائماً به دنبال مدل‌های کسب‌وکار سودآور با مزایای رقابتی پایدار هستند.' },
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
        { de: 'Wir müssen die Investoren von der Tragfähigkeit unseres innovativen Geschäftsmodells und dem Marktpotenzial überzeugen.', fa: 'ما باید سرمایه‌گذاران را از پایداری مدل کسب‌وکار نوآورانه و پتانسیل بازار متقاعد کنیم.' },
        { de: 'Der Vertrieb konnte den Großkunden von den überlegenen Produkteigenschaften und dem ausgezeichneten Preis-Leistungs-Verhältnis überzeugen.', fa: 'فروش توانست مشتری بزرگ را از ویژگی‌های محصول برتر و نسبت قیمت-عملکرد عالی متقاعد کند.' },
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
        { de: 'Ich habe mich mit dem Geschäftspartner für nächste Woche verabredet, um die Vertragsdetails zu finalisieren.', fa: 'من با شریک تجاری برای هفته بعد قرار گذاشته‌ام تا جزئیات قرارداد را نهایی کنیم.' },
        { de: 'Die Projektleiter verabreden sich regelmäßig mit den Stakeholdern, um den Fortschritt zu besprechen.', fa: 'مدیران پروژه به‌طور منظم با ذینفعان قرار می‌گذارند تا پیشرفت را بحث کنند.' },
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
        { de: 'In kritischen Projektsituationen kann man sich vollständig auf die Expertise und Zuverlässigkeit des erfahrenen Teams verlassen.', fa: 'در موقعیت‌های حیاتی پروژه، می‌توان کاملاً به تخصص و قابلیت اعتماد تیم با تجربه تکیه کرد.' },
        { de: 'Erfolgreiche Unternehmen verlassen sich auf datenbasierte Entscheidungen und kontinuierliche Marktanalysen.', fa: 'شرکت‌های موفق به تصمیمات مبتنی بر داده و تحلیل‌های مستمر بازار تکیه می‌کنند.' },
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
        { de: 'Viele Unternehmer verlieben sich in ihre Geschäftsidee und verlieren dabei manchmal den Blick für die Marktrealit ät.', fa: 'بسیاری از کارآفرینان عاشق ایده کسب‌وکار خود می‌شوند و گاهی دید نسبت به واقعیت بازار را از دست می‌دهند.' },
        { de: 'Talentierte Mitarbeiter verlieben sich oft in innovative Projekte mit technologischen Herausforderungen.', fa: 'کارمندان با استعداد اغلب عاشق پروژه‌های نوآورانه با چالش‌های فناوری می‌شوند.' },
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
        { de: 'Unser technischer Direktor versteht sich ausgezeichnet auf komplexe Systemarchitekturen und Cloud-Infrastrukturen.', fa: 'مدیر فنی ما به‌طور عالی در معماری‌های سیستم پیچیده و زیرساخت‌های ابری مهارت دارد.' },
        { de: 'Erfahrene Berater verstehen sich auf Changemanagement-Prozesse und organisatorische Transformation.', fa: 'مشاوران با تجربه در فرآیندهای مدیریت تغییر و تحول سازمانی مهارت دارند.' },
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
        { de: 'Das Management vertraut auf die Fähigkeiten der Mitarbeiter und fördert eigenverantwortliches Arbeiten.', fa: 'مدیریت به توانایی‌های کارمندان اعتماد دارد و کار خودمختار را ترویج می‌کند.' },
        { de: 'Investoren vertrauen auf fundierte Marktanalysen, transparente Geschäftsmodelle und nachweisbare Erfolge.', fa: 'سرمایه‌گذاران به تحلیل‌های مستدل بازار، مدل‌های کسب‌وکار شفاف و موفقیت‌های قابل اثبات اعتماد دارند.' },
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
        { de: 'In der Krise musste das Unternehmen auf geplante Expansionen und kostspielige Investitionsprojekte verzichten.', fa: 'در بحران، شرکت مجبور شد از گسترش‌های برنامه‌ریزی‌شده و پروژه‌های سرمایه‌گذاری پرهزینه صرف‌نظر کند.' },
        { de: 'Viele Startups verzichten bewusst auf kurzfristige Profite zugunsten langfristigen Wachstums und Marktanteilen.', fa: 'بسیاری از استارتاپ‌ها آگاهانه از سودهای کوتاه‌مدت به نفع رشد بلندمدت و سهم بازار صرف‌نظر می‌کنند.' },
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
        { de: 'Branchenexperten warnen vor überstürzten Investitionsentscheidungen ohne gründliche Marktanalyse und Due Diligence.', fa: 'کارشناسان صنعت از تصمیمات سرمایه‌گذاری عجولانه بدون تحلیل کامل بازار و بررسی دقیق هشدار می‌دهند.' },
        { de: 'Das Risikomanagement warnt vor potentiellen Cyberbedrohungen und Datenschutzverletzungen.', fa: 'مدیریت ریسک از تهدیدات بالقوه سایبری و نقض حفاظت از داده‌ها هشدار می‌دهد.' },
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
        { de: 'Die Aktionärsversammlung wählte sie aufgrund ihrer herausragenden Führungsqualitäten zur neuen Vorstandsvorsitzenden.', fa: 'مجمع سهامداران به دلیل ویژگی‌های رهبری برجسته‌اش، او را به عنوان رئیس هیئت مدیره جدید انتخاب کردند.' },
        { de: 'Das Board wählte ihn zum Chief Innovation Officer, um die digitale Transformation voranzutreiben.', fa: 'هیئت مدیره او را به عنوان مدیر ارشد نوآوری انتخاب کرد تا تحول دیجیتال را پیش ببرد.' },
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
        { de: 'Es bringt nichts, über verpasste Geschäftschancen zu weinen - besser daraus lernen und nach vorne schauen.', fa: 'فایده‌ای ندارد که بر فرصت‌های تجاری از دست رفته گریه کنیم - بهتر است از آن‌ها یاد بگیریم و به جلو نگاه کنیم.' },
        { de: 'Viele Unternehmer weinen über regulatorische Hürden, statt innovative Lösungen zu entwickeln.', fa: 'بسیاری از کارآفرینان بر موانع نظارتی گریه می‌کنند، به جای توسعه راه‌حل‌های نوآورانه.' },
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
        { de: 'Die Marketingabteilung wirbt intensiv für das neue Produkt mit innovativen Kampagnen über alle digitalen Kanäle.', fa: 'بخش بازاریابی به‌طور فشرده برای محصول جدید با کمپین‌های نوآورانه در تمام کانال‌های دیجیتال تبلیغ می‌کند.' },
        { de: 'Erfolgreiche Unternehmen werben für ihre Arbeitgebermarke, um talentierte Fachkräfte anzuziehen.', fa: 'شرکت‌های موفق برای برند کارفرمایی خود تبلیغ می‌کنند تا نیروهای متخصص با استعداد را جذب کنند.' },
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
        { de: 'Eine positive Unternehmenskultur wirkt motivierend auf die Mitarbeiter und fördert Innovation und Engagement.', fa: 'فرهنگ سازمانی مثبت به‌طور انگیزشی بر کارمندان تأثیر می‌گذارد و نوآوری و تعهد را ترویج می‌دهد.' },
        { de: 'Die wirtschaftliche Unsicherheit wirkt sich negativ auf Investitionsentscheidungen und Geschäftsplanungen aus.', fa: 'عدم قطعیت اقتصادی به‌طور منفی بر تصمیمات سرمایه‌گذاری و برنامه‌ریزی‌های تجاری تأثیر می‌گذارد.' },
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
        { de: 'Wussten Sie von den geplanten Restrukturierungsmaßnahmen und deren potentiellen Auswirkungen auf die Belegschaft?', fa: 'آیا از اقدامات بازسازی برنامه‌ریزی‌شده و تأثیرات بالقوه آن بر نیروی کار اطلاع داشتید؟' },
        { de: 'Das Management muss umfassend über Marktentwicklungen, Wettbewerbsstrategien und Kundenbedürfnisse Bescheid wissen.', fa: 'مدیریت باید به‌طور جامع درباره توسعه‌های بازار، استراتژی‌های رقابتی و نیازهای مشتری اطلاع داشته باشد.' },
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
        { de: 'Viele Branchenbeobachter wundern sich über die aggressive Expansionsstrategie trotz angespannter Marktlage.', fa: 'بسیاری از ناظران صنعت از استراتژی گسترش تهاجمی علی‌رغم وضعیت تنش بازار تعجب می‌کنند.' },
        { de: 'Ich wundere mich über die mangelnde Innovationsbereitschaft etablierter Unternehmen angesichts des digitalen Wandels.', fa: 'من از کمبود آمادگی نوآوری شرکت‌های مستقر در مواجهه با تحول دیجیتال تعجب می‌کنم.' },
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
        { de: 'Unsere Marketingstrategie zielt auf eine jüngere, technologieaffine Zielgruppe mit hoher Kaufkraft.', fa: 'استراتژی بازاریابی ما بر یک گروه هدف جوان‌تر و علاقه‌مند به فناوری با قدرت خرید بالا هدف می‌گیرد.' },
        { de: 'Die Produktentwicklung zielt auf maximale Benutzererfahrung und nahtlose Integration in bestehende Systeme.', fa: 'توسعه محصول بر حداکثر تجربه کاربر و یکپارچگی یکپارچه در سیستم‌های موجود هدف می‌گیرد.' },
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
        { de: 'In dynamischen Märkten sollte man nicht zu lange mit strategischen Entscheidungen zögern, um Wettbewerbsvorteile nicht zu verlieren.', fa: 'در بازارهای پویا نباید خیلی طولانی با تصمیمات استراتژیک تردید کرد تا مزایای رقابتی را از دست ندهیم.' },
        { de: 'Das Unternehmen zögerte mit notwendigen Investitionen in digitale Infrastruktur und verlor dadurch Marktanteile.', fa: 'شرکت با سرمایه‌گذاری‌های ضروری در زیرساخت دیجیتال تردید کرد و در نتیجه سهم بازار را از دست داد.' },
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
        { de: 'Der intensive Wettbewerbsdruck zwingt viele Unternehmen zu radikalen Effizienzsteigerungen und Prozessoptimierungen.', fa: 'فشار رقابتی شدید بسیاری از شرکت‌ها را به افزایش کارایی رادیکال و بهینه‌سازی فرآیند مجبور می‌کند.' },
        { de: 'Regulatorische Anforderungen zwingen Finanzinstitute zu umfassenden Compliance-Maßnahmen und Transparenzstandards.', fa: 'الزامات نظارتی موسسات مالی را به اقدامات جامع انطباق و استانداردهای شفافیت مجبور می‌کند.' },
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
        { de: 'Der Projekterfolg ist stark abhängig von der rechtzeitigen Verfügbarkeit qualifizierter Fachkräfte und ausreichender Budgetmittel.', fa: 'موفقیت پروژه به‌شدت وابسته به در دسترس بودن به‌موقع نیروهای متخصص واجد شرایط و بودجه کافی است.' },
        { de: 'Viele mittelständische Unternehmen sind zu sehr abhängig von einzelnen Großkunden und sollten ihre Kundenstruktur diversifizieren.', fa: 'بسیاری از شرکت‌های متوسط بیش از حد به مشتریان بزرگ منفرد وابسته هستند و باید ساختار مشتری خود را متنوع کنند.' },
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
        { de: 'In komplexen Projektsituationen sind wir auf die Expertise externer Berater und spezialisierter Dienstleister angewiesen.', fa: 'در موقعیت‌های پیچیده پروژه، ما به تخصص مشاوران خارجی و ارائه‌دهندگان خدمات تخصصی نیازمندیم.' },
        { de: 'Startups sind in der Anfangsphase stark auf Risikokapital und strategische Investoren angewiesen.', fa: 'استارتاپ‌ها در مرحله اولیه به‌شدت به سرمایه ریسک‌پذیر و سرمایه‌گذاران استراتژیک نیازمندند.' },
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
        { de: 'Die Region ist arm an qualifizierten Arbeitskräften und innovativen Unternehmen, was die wirtschaftliche Entwicklung hemmt.', fa: 'منطقه فقیر از نیروی کار واجد شرایط و شرکت‌های نوآور است که توسعه اقتصادی را مهار می‌کند.' },
        { de: 'Traditionelle Organisationsstrukturen sind oft arm an Flexibilität und Anpassungsfähigkeit an dynamische Marktveränderungen.', fa: 'ساختارهای سازمانی سنتی اغلب فقیر از انعطاف‌پذیری و قابلیت سازگاری با تغییرات پویای بازار هستند.' },
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
        { de: 'Investoren sind begeistert von dem innovativen Geschäftsmodell und dem disruptiven Marktpotenzial des Startups.', fa: 'سرمایه‌گذاران از مدل کسب‌وکار نوآورانه و پتانسیل مخرب بازار استارتاپ هیجان‌زده هستند.' },
        { de: 'Das Team ist begeistert über die erfolgreiche Projektabwicklung und die positiven Kundenrückmeldungen.', fa: 'تیم از اجرای موفق پروژه و بازخوردهای مثبت مشتری هیجان‌زده است.' },
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
        { de: 'Das Unternehmen ist bekannt für seine innovativen Produktlösungen, exzellente Qualität und nachhaltigen Produktionsmethoden.', fa: 'شرکت به خاطر راه‌حل‌های محصول نوآورانه، کیفیت عالی و روش‌های تولید پایدار مشهور است.' },
        { de: 'Ich bin bereits mit den gängigen Projektmanagement-Methoden und agilen Frameworks bekannt.', fa: 'من قبلاً با روش‌های رایج مدیریت پروژه و چارچوب‌های چابک آشنا هستم.' },
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
        { de: 'Das Managementteam ist bereit zu weitreichenden Veränderungen und grundlegenden Restrukturierungsmaßnahmen.', fa: 'تیم مدیریت آماده تغییرات گسترده و اقدامات بازسازی اساسی است.' },
        { de: 'Erfolgreiche Unternehmen sind stets bereit zur Anpassung an neue Marktbedingungen und technologische Entwicklungen.', fa: 'شرکت‌های موفق همیشه آماده سازگاری با شرایط جدید بازار و توسعه‌های فناوری هستند.' },
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
        { de: 'Kunden sind zurecht böse auf den unzureichenden Kundenservice und die mangelnde Reaktionsfähigkeit des Unternehmens.', fa: 'مشتریان به‌حق از خدمات مشتری ناکافی و کمبود واکنش‌پذیری شرکت عصبانی هستند.' },
        { de: 'Mitarbeiter sind böse auf die intransparente Kommunikation und unvorhersehbare Entscheidungen des Managements.', fa: 'کارمندان از ارتباطات غیرشفاف و تصمیمات غیرقابل پیش‌بینی مدیریت عصبانی هستند.' },
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
        { de: 'Wir sind sehr dankbar für Ihre konstruktive Zusammenarbeit, wertvollen Impulse und das entgegengebrachte Vertrauen.', fa: 'ما بسیار سپاسگزار همکاری سازنده، انگیزه‌های ارزشمند و اعتماد ابراز شده شما هستیم.' },
        { de: 'Das Team ist dankbar für die Möglichkeit, an diesem innovativen Projekt mitzuwirken und wertvolle Erfahrungen zu sammeln.', fa: 'تیم برای فرصت مشارکت در این پروژه نوآورانه و کسب تجربیات ارزشمند سپاسگزار است.' },
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
        { de: 'Manche Wettbewerber sind eifersüchtig auf unseren Markterfolg und die starke Kundenbindung.', fa: 'برخی رقبا به موفقیت بازار ما و وفاداری قوی مشتری حسادت می‌کنند.' },
        { de: 'Einige Teammitglieder sind eifersüchtig auf die Beförderung und Anerkennung ihrer Kollegen.', fa: 'برخی اعضای تیم به ارتقا و شناخت همکاران خود حسادت می‌کنند.' },
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
        { de: 'Sind Sie mit den vorgeschlagenen Vertragsbedingungen, dem Zeitplan und der Ressourcenallokation einverstanden?', fa: 'آیا شما با شرایط قرارداد پیشنهادی، جدول زمانی و تخصیص منابع موافق هستید؟' },
        { de: 'Das Management ist mit der strategischen Neuausrichtung und den geplanten Restrukturierungsmaßnahmen einverstanden.', fa: 'مدیریت با جهت‌گیری استراتژیک جدید و اقدامات بازسازی برنامه‌ریزی شده موافق است.' },
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
        { de: 'Investoren sind enttäuscht von den schwachen Quartalsergebnissen und der unzureichenden strategischen Neuausrichtung.', fa: 'سرمایه‌گذاران از نتایج ضعیف سه‌ماهه و جهت‌گیری استراتژیک ناکافی ناامید هستند.' },
        { de: 'Das Team ist enttäuscht über die mangelnde Wertschätzung und fehlende Entwicklungsmöglichkeiten im Unternehmen.', fa: 'تیم از کمبود قدردانی و فقدان فرصت‌های توسعه در شرکت ناامید است.' },
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
        { de: 'Branchenexperten sind erstaunt über die beeindruckende Wachstumsdynamik und schnelle Marktdurchdringung des Startups.', fa: 'کارشناسان صنعت از پویایی رشد چشمگیر و نفوذ سریع بازار استارتاپ شگفت‌زده هستند.' },
        { de: 'Ich bin erstaunt über die innovative Herangehensweise und die pragmatischen Problemlösungsfähigkeiten des neuen Teams.', fa: 'من از رویکرد نوآورانه و توانایی‌های حل مسئله عملی تیم جدید شگفت‌زده هستم.' },
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
        { de: 'Das erfahrene Management ist fähig zu mutigen strategischen Entscheidungen und weitreichenden Transformationsprozessen.', fa: 'مدیریت با تجربه قادر به تصمیمات استراتژیک جسورانه و فرآیندهای تحول گسترده است.' },
        { de: 'Hochqualifizierte Teams sind fähig zu außergewöhnlichen Innovationsleistungen unter anspruchsvollen Projektbedingungen.', fa: 'تیم‌های بسیار واجد شرایط قادر به عملکردهای نوآوری فوق‌العاده تحت شرایط پروژه چالش‌برانگیز هستند.' },
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
        { de: 'Sind Sie bereits fertig mit der umfassenden Marktanalyse und der Ausarbeitung der Wettbewerbsstrategie?', fa: 'آیا شما قبلاً با تحلیل جامع بازار و تدوین استراتژی رقابتی تمام کرده‌اید؟' },
        { de: 'Das Entwicklungsteam ist endlich fertig mit der Implementierung aller kritischen Features und der Qualitätssicherung.', fa: 'تیم توسعه بالاخره با اجرای تمام ویژگی‌های حیاتی و تضمین کیفیت تمام کرده است.' },
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
        { de: 'Wir sind sehr froh über den erfolgreichen Projektabschluss, die positiven Kundenbewertungen und die gewonnenen Erkenntnisse.', fa: 'ما بسیار خوشحال از خاتمه موفق پروژه، ارزیابی‌های مثبت مشتری و دانش کسب‌شده هستیم.' },
        { de: 'Das Management ist froh über die stabile Geschäftsentwicklung trotz herausfordernder Marktbedingungen.', fa: 'مدیریت از توسعه کسب‌وکار پایدار علی‌رغم شرایط چالش‌برانگیز بازار خوشحال است.' },
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
        { de: 'Die gesamte Branche ist gespannt auf die Produktvorstellung und die damit verbundenen technologischen Innovationen.', fa: 'کل صنعت منتظر معرفی محصول و نوآوری‌های فناوری مرتبط با آن است.' },
        { de: 'Investoren sind gespannt auf die Quartalszahlen und die strategischen Zukunftspläne des Unternehmens.', fa: 'سرمایه‌گذاران منتظر اعداد سه‌ماهه و برنامه‌های استراتژیک آینده شرکت هستند.' },
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
        { de: 'Erfahrene Mitarbeiter sind gewöhnt an dynamische Marktveränderungen, hohen Arbeitsdruck und komplexe Projektsituationen.', fa: 'کارمندان با تجربه به تغییرات پویای بازار، فشار کاری بالا و موقعیت‌های پیچیده پروژه عادت کرده‌اند.' },
        { de: 'Das internationale Team ist gewöhnt an virtuelle Zusammenarbeit, interkulturelle Kommunikation und flexible Arbeitsmodelle.', fa: 'تیم بین‌المللی به همکاری مجازی، ارتباطات بین‌فرهنگی و مدل‌های کاری انعطاف‌پذیر عادت کرده است.' },
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
        { de: 'Potenzielle Investoren sind sehr interessiert an unserem innovativen Geschäftsmodell und dem Skalierungspotenzial.', fa: 'سرمایه‌گذاران بالقوه بسیار به مدل کسب‌وکار نوآورانه و پتانسیل مقیاس‌پذیری ما علاقه‌مندند.' },
        { de: 'Wir sind besonders interessiert an langfristigen strategischen Partnerschaften und synergetischen Kooperationsmöglichkeiten.', fa: 'ما به‌ویژه به مشارکت‌های استراتژیک بلندمدت و فرصت‌های همکاری هم‌افزا علاقه‌مندیم.' },
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
        { de: 'Einige Wettbewerber sind neidisch auf unsere starke Markenpositionierung und hohe Kundenloyalität.', fa: 'برخی رقبا به موقعیت‌یابی قوی برند و وفاداری بالای مشتری ما حسادت می‌کنند.' },
        { de: 'Manche Teammitglieder sind neidisch auf die schnelle Karriereentwicklung und Anerkennung ihrer Kollegen.', fa: 'برخی اعضای تیم به توسعه شغلی سریع و شناخت همکاران خود حسادت می‌کنند.' },
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
        { de: 'Das Management ist neugierig auf die Marktreaktionen, Kundenfeedbacks und Wettbewerbsantworten nach dem Produktlaunch.', fa: 'مدیریت کنجکاو واکنش‌های بازار، بازخوردهای مشتری و پاسخ‌های رقابتی پس از راه‌اندازی محصول است.' },
        { de: 'Branchenbeobachter sind sehr neugierig auf die strategische Ausrichtung und geplanten Innovationen des Unternehmens.', fa: 'ناظران صنعت بسیار کنجکاو جهت‌گیری استراتژیک و نوآوری‌های برنامه‌ریزی‌شده شرکت هستند.' },
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
        { de: 'Diese analytischen Tools und Methoden sind äußerst nützlich für datenbasierte Entscheidungsfindung und Strategieentwicklung.', fa: 'این ابزارها و روش‌های تحلیلی بسیار مفید برای تصمیم‌گیری مبتنی بر داده و توسعه استراتژی هستند.' },
        { de: 'Praktische Erfahrungen in agilen Projekten sind sehr nützlich für die berufliche Weiterentwicklung und Karriereplanung.', fa: 'تجربیات عملی در پروژه‌های چابک برای پیشرفت حرفه‌ای و برنامه‌ریزی شغلی بسیار مفید هستند.' },
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
        { de: 'Die Region ist reich an hochqualifizierten Fachkräften, innovativen Unternehmen und exzellenter Forschungsinfrastruktur.', fa: 'منطقه غنی از نیروهای متخصص بسیار واجد شرایط، شرکت‌های نوآور و زیرساخت تحقیقاتی عالی است.' },
        { de: 'Unser Team ist reich an vielfältigen Kompetenzen, internationaler Erfahrung und kreativen Problemlösungsfähigkeiten.', fa: 'تیم ما غنی از شایستگی‌های متنوع، تجربه بین‌المللی و توانایی‌های خلاقانه حل مسئله است.' },
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
        { de: 'Das gesamte Team ist stolz auf die erfolgreiche Projektabwicklung, die innovative Problemlösung und die hervorragenden Kundenbewertungen.', fa: 'کل تیم به اجرای موفق پروژه، حل مسئله نوآورانه و ارزیابی‌های عالی مشتری مفتخر است.' },
        { de: 'Wir sind stolz auf unsere nachhaltige Unternehmensphilosophie und soziale Verantwortung.', fa: 'ما به فلسفه شرکت پایدار و مسئولیت اجتماعی‌مان مفتخریم.' },
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
        { de: 'Das Management ist traurig über den Verlust wertvoller Mitarbeiter und den damit verbundenen Know-how-Abfluss.', fa: 'مدیریت از از دست دادن کارمندان ارزشمند و خروج دانش مرتبط با آن غمگین است.' },
        { de: 'Viele Mitarbeiter sind traurig über die Schließung des traditionsreichen Standorts und den Abbau langjähriger Teams.', fa: 'بسیاری از کارمندان از بسته شدن مکان سنتی و حذف تیم‌های چندساله غمگین هستند.' },
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
        { de: 'Kurzsichtiges Profitdenken und mangelnde Innovationsbereitschaft sind typisch für traditionelle Unternehmensstrukturen.', fa: 'تفکر سود کوتاه‌بینانه و کمبود آمادگی نوآوری برای ساختارهای شرکتی سنتی معمول است.' },
        { de: 'Agile Arbeitsmethoden, flache Hierarchien und hohe Mitarbeiterbeteiligung sind typisch für moderne Startups.', fa: 'روش‌های کار چابک، سلسله‌مراتب صاف و مشارکت بالای کارمندان برای استارتاپ‌های مدرن معمول است.' },
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
        { de: 'Ich bin fest überzeugt von der Tragfähigkeit unseres Geschäftsmodells und dem langfristigen Marktpotenzial.', fa: 'من کاملاً از پایداری مدل کسب‌وکار ما و پتانسیل بلندمدت بازار متقاعد شده‌ام.' },
        { de: 'Die Investoren sind überzeugt von der Expertise des Managementteams und der Innovationskraft des Unternehmens.', fa: 'سرمایه‌گذاران از تخصص تیم مدیریت و قدرت نوآوری شرکت متقاعد شده‌اند.' },
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
        { de: 'Als Projektleiter bin ich verantwortlich für die termingerechte Umsetzung, Budgeteinhaltung und Qualitätssicherung.', fa: 'به‌عنوان مدیر پروژه، من مسئول اجرای به‌موقع، رعایت بودجه و تضمین کیفیت هستم.' },
        { de: 'Die Geschäftsführung ist verantwortlich für die strategische Ausrichtung, Unternehmenskultur und nachhaltige Entwicklung.', fa: 'مدیریت مسئول جهت‌گیری استراتژیک، فرهنگ شرکت و توسعه پایدار است.' },
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
        { de: 'Viele Unternehmer sind zu sehr verliebt in ihre ursprüngliche Geschäftsidee und ignorieren wichtiges Marktfeedback.', fa: 'بسیاری از کارآفرینان بیش از حد به ایده اولیه کسب‌وکار خود عاشق هستند و بازخورد مهم بازار را نادیده می‌گیرند.' },
        { de: 'Innovatoren sind oft verliebt in technologische Lösungen, ohne die tatsächlichen Kundenbedürfnisse ausreichend zu berücksichtigen.', fa: 'نوآوران اغلب عاشق راه‌حل‌های فناوری هستند، بدون اینکه نیازهای واقعی مشتری را به اندازه کافی در نظر بگیرند.' },
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
        { de: 'Als CEO ist man praktisch verheiratet mit dem Unternehmen und trägt ständige Verantwortung für dessen Erfolg.', fa: 'به‌عنوان مدیر عامل، عملاً با شرکت ازدواج کرده‌اید و دائماً مسئولیت موفقیت آن را دارید.' },
        { de: 'Viele Führungskräfte sind so stark verheiratet mit ihrer Arbeit, dass Work-Life-Balance zur Herausforderung wird.', fa: 'بسیاری از رهبران آن‌قدر قوی با کارشان متاهل هستند که تعادل کار-زندگی به چالش تبدیل می‌شود.' },
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
        { de: 'Dieses innovative Geschäftsmodell ist eng verwandt mit erfolgreichen Plattformstrategien aus anderen Branchen.', fa: 'این مدل کسب‌وکار نوآورانه از نزدیک با استراتژی‌های پلتفرم موفق از صنایع دیگر مرتبط است.' },
        { de: 'Moderne agile Methoden sind thematisch verwandt mit lean Management-Prinzipien und kontinuierlichen Verbesserungsansätzen.', fa: 'روش‌های چابک مدرن از نظر موضوعی با اصول مدیریت ناب و رویکردهای بهبود مستمر مرتبط هستند.' },
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
        { de: 'Kontinuierliche Innovation und Anpassungsfähigkeit sind entscheidend wichtig für langfristigen Unternehmenserfolg.', fa: 'نوآوری مستمر و سازگاری برای موفقیت بلندمدت شرکت تعیین‌کننده است.' },
        { de: 'Transparente Kommunikation und Vertrauenskultur sind besonders wichtig für effektive Teamzusammenarbeit.', fa: 'ارتباطات شفاف و فرهنگ اعتماد به‌ویژه برای همکاری مؤثر تیم مهم است.' },
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
        { de: 'Sind Sie zufrieden mit dem Projektverlauf, den Zwischenergebnissen und der Teamleistung bis hierhin?', fa: 'آیا شما از پیشرفت پروژه، نتایج میانی و عملکرد تیم تا اینجا راضی هستید؟' },
        { de: 'Die Geschäftsführung ist sehr zufrieden mit der Umsatzentwicklung, Profitabilität und strategischen Marktpositionierung.', fa: 'مدیریت از توسعه فروش، سودآوری و موقعیت‌یابی استراتژیک بازار بسیار راضی است.' },
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
