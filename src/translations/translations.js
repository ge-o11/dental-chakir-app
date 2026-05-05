// ============================================================
//  TRANSLATIONS — all UI strings for all 4 supported languages
// ============================================================

export const translations = {

  // ─── HEBREW ────────────────────────────────────────────────
  he: {
    dir: 'rtl',
    langName: 'עברית',
    flag: '🇮🇱',

    nav: {
      workshopDetails:      'פרטי הסדנה',
      workshopRegistration: 'הרשמה לסדנה',
      about:                'על דנטל צ\'אקיר',
      products:             'מוצרים לחברי הקהילה',
      location:             'הגעה לסדנה',
      contact:              'צור קשר',
      faq:                  'שאלות נפוצות',
      benefits:             'הטבות לחברי הקהילה',
    },

    landing: {
      headline:    "קהילת דנטל צ'אקיר",
      subheadline: "בקידמת ה-AI הדנטלי",
      tagline:     'חדשנות • מקצועיות • עתיד הדנטיסטריה',
      welcome:     'ברוכים הבאים!',
      description: 'קהילה יחודית לתחום רפואת השיניים בחזית הטכנולוגיה הדנטלית\nהעולם החדש של AI בדנטיסטריה.',
      cta:         'כניסה לסדנה באמצעות הקוד החינמי',
      features: [
        { icon: 'Brain',   text: 'בינה מלאכותית מתקדמת' },
        { icon: 'Users',   text: 'קהילה מקצועית' },
        { icon: 'Star',    text: 'הטבות בלעדיות' },
        { icon: 'Zap',     text: 'טכנולוגיה חדישה' },
      ],
    },

    codeEntry: {
      title:       'כניסה לקהילה',
      subtitle:    'הזן את הקוד האישי שקיבלת',
      label:       'קוד אישי',
      placeholder: 'הזן את הקוד שלך...',
      submit:      'כניסה',
      validating:  'מאמת קוד...',
      freeMessage: 'הסדנה בשווי {price}₪ ניתנת לך בחינם כחבר קהילה באמצעות הקוד שקיבלת.',
      yourCode:    'הקוד שלך:',
      copyCode:    'העתק קוד',
      copied:      '✓ הועתק!',
      continueBtn: 'המשך לכניסה',
      noCodeBtn:   'כניסה ללא קוד קופון',
      noCodeNote:  'הסדנה תהיה בתשלום של {price}',
      errors: {
        required: 'יש להזין קוד',
        invalid:  'קוד שגוי, נא לנסות שנית.',
      },
    },

    login: {
      title:           'כניסה',
      subtitle:        'הזן מספר טלפון וסיסמה להשלמת הכניסה',
      phoneLbl:        'מספר טלפון',
      phonePlaceholder:'05X-XXX-XXXX',
      passLbl:         'סיסמה',
      passPlaceholder: 'צור סיסמה (6+ תווים)',
      submit:          'כניסה לאפליקציה',
      logging:         'כניסה...',
      codeReminder:    'הקוד שלך:',
      errors: {
        phoneRequired:   'יש להזין מספר טלפון',
        phoneInvalid:    'מספר טלפון לא תקין',
        passRequired:    'יש להזין סיסמה',
        passShort:       'הסיסמה חייבת להכיל לפחות 6 תווים',
      },
    },

    workshopDetails: {
      title:        'פרטי הסדנה',
      subtitle:     'סדנה מקצועית לרופאי שיניים',
      freeFor:      'חינם לחברי הקהילה!',
      regularPrice: 'מחיר רגיל:',
      date:         'תאריך:',
      time:         'שעה:',
      location:     'מיקום:',
      duration:     'משך:',
      hours:        'שעות',

      learnTitle:   'מה תלמד בסדנה?',
      learnItems: [
        'יסודות הבינה המלאכותית בדנטיסטריה המודרנית',
        'ניתוח צילומי רנטגן אוטומטי – כיצד AI מגביר דיוק אבחנה',
        'תכנון טיפול חכם: מ-X-ray לתוכנית טיפול בדקות',
        'פלטפורמות AI לניהול מרפאה וחיסכון בזמן',
        'שיפור חוויית המטופל באמצעות אוטומציה חכמה',
        'הדגמות LIVE על כלי AI מובילים',
        'שאלות ותשובות עם מומחים מהשוק',
      ],

      benefitsTitle: 'למה AI בדנטיסטריה?',
      benefitItems: [
        { icon: 'Target',    title: 'דיוק אבחנה גבוה',      desc: 'AI מזהה בעיות שהעין האנושית עשויה להחמיץ' },
        { icon: 'Clock',     title: 'חיסכון בזמן',          desc: 'אוטומציה של משימות חוזרות מפנה זמן לטיפול' },
        { icon: 'TrendingUp',title: 'הגדלת הכנסות',         desc: 'אבחון מדויק יותר = טיפולים מדויקים = מטופלים מרוצים' },
        { icon: 'Shield',    title: 'הגנה מקצועית',         desc: 'תיעוד דיגיטלי מלא ואנליזה מבוססת נתונים' },
      ],

      cta: 'הרשמה לסדנה',
    },

    workshopRegistration: {
      title:          'הרשמה לסדנה',
      subtitle:       'כל הפרטים ממולאים אוטומטית עבורך',
      freeBadge:      'כניסה חינמית לחברי קהילה',
      fullNameLbl:    'שם מלא',
      fullNamePh:     'שם פרטי ומשפחה',
      phoneLbl:       'מספר טלפון',
      codeLbl:        'קוד אישי',
      clinicLbl:      'שם המרפאה',
      clinicPh:       'שם המרפאה שלך',
      emailLbl:       'כתובת אימייל',
      emailPh:        'example@clinic.co.il',
      langLbl:        'שפה מועדפת בסדנה',
      langOptions: {
        he: 'עברית',
        ar: 'عربية',
        ru: 'Русский',
        en: 'English',
      },
      submit:         'שלח הרשמה',
      submitting:     'שולח...',
      successTitle:   'נרשמת בהצלחה!',
      successText:    'תודה! ההרשמה שלך לסדנה התקבלה. תקבל/י אישור ב-WhatsApp בקרוב.',
      errors: {
        nameRequired:  'יש להזין שם מלא',
        emailInvalid:  'כתובת אימייל לא תקינה',
        clinicRequired:'יש להזין שם מרפאה',
      },
    },

    about: {
      title:      "על דנטל צ'אקיר",
      subtitle:   'מובילים את המהפכה הטכנולוגית בדנטיסטריה',

      whoTitle:   'מי אנחנו?',
      whoText:    "דנטל צ'אקיר היא חברה מובילה בהטמעת פתרונות בינה מלאכותית לרפואת שיניים בישראל. אנו מחברים בין הידע הקליני העמוק של רופאי שיניים לבין הטכנולוגיות המתקדמות ביותר בעולם, ויוצרים קהילה מקצועית שמניעה את עתיד הדנטיסטריה.",

      whyTitle:   'למה AI בדנטיסטריה?',
      whyText:    'הבינה המלאכותית אינה עוד חזון עתידי – היא כבר כאן. מרפאות שיניים שאימצו טכנולוגיות AI מדווחות על שיפור של 40% בדיוק אבחון, חיסכון של 15+ שעות שבועיות ועלייה משמעותית בשביעות רצון המטופלים.',

      statsTitle: 'המספרים מדברים',
      stats: [
        { value: '500+', label: 'רופאי שיניים בקהילה' },
        { value: '97%',  label: 'דיוק ניתוח AI' },
        { value: '40%',  label: 'שיפור באבחון' },
        { value: '15+',  label: 'שעות שנחסכות שבועית' },
      ],

      trustTitle: 'מדוע לסמוך עלינו?',
      trustItems: [
        'ניסיון של 8+ שנים בטכנולוגיה דנטלית',
        'שיתופי פעולה עם בתי חולים מובילים',
        'הכשרה ותמיכה מלאה לכל חבר קהילה',
        'עדכונים שוטפים לפי חדשות הענף',
        'קהילה תומכת של אנשי מקצוע',
      ],
    },

    products: {
      title:          'מוצרים לחברי הקהילה',
      subtitle:       'מחירים מיוחדים בלעדיים לחברי הקהילה',
      regularPrice:   'מחיר רגיל:',
      memberPrice:    'מחיר חבר קהילה:',
      inquire:        'פנייה בוואטסאפ',
      badge:          'מחיר חבר קהילה',
    },

    location: {
      title:     'הגעה לסדנה',
      subtitle:  'כל הכלים להגיע בקלות',
      address:   'כתובת:',
      date:      'תאריך ושעה:',
      waze:      'נווט עם Waze',
      gmaps:     'נווט עם Google Maps',
      gcal:      'שמור ביומן Google',
      outlook:   'שמור ביומן Outlook',
      mapNote:   'לחץ על אחד מכפתורי הניווט לקבלת הנחיות',
    },

    contact: {
      title:        'צור קשר',
      subtitle:     'מיטל כאן בשבילך',
      nameLabel:    'מיטל',
      hoursLabel:   'שעות פעילות:',
      hours:        '09:00 – 16:00',
      callBtn:      'התקשר למיטל',
      waBtn:        'וואטסאפ למיטל',
      offHoursMsg:  'השאר הודעה בוואטסאפ ומיטל תחזור אליך בשעות הפעילות.',
      onlineStatus: 'זמינה עכשיו',
      offlineStatus:'לא זמינה כרגע',
    },

    faq: {
      title:    'שאלות נפוצות',
      subtitle: 'תשובות לשאלות הנפוצות ביותר',
      items: [
        {
          q: 'מה זה הקוד האישי שקיבלתי?',
          a: 'הקוד האישי הוא מפתח הכניסה הייחודי שלך לקהילה ולסדנה. שמור אותו – הוא מעניק לך גישה לסדנה בחינם בשווי 300₪ וגם לכל הטבות חברי הקהילה.',
        },
        {
          q: 'האם הסדנה באמת בחינם עבורי?',
          a: 'כן! כחבר קהילת צ\'אקיר, הסדנה בשווי 300₪ ניתנת לך בחינם לחלוטין. הכניסה כלולה בהטבות חברות הקהילה ולא נדרש תשלום.',
        },
        {
          q: 'כיצד אני נרשם לסדנה?',
          a: 'לאחר כניסה לאפליקציה עם הקוד שלך, לחץ על "הרשמה לסדנה" בתפריט. הטלפון והקוד שלך יתמלאו אוטומטית – פשוט השלם את הפרטים החסרים ושלח.',
        },
        {
          q: 'איפה מתקיימת הסדנה?',
          a: 'הסדנה מתקיימת ברחוב הטכנולוגיה 12, תל אביב. ניתן לקבל הנחיות ניווט דרך Waze או Google Maps דרך הסעיף "הגעה לסדנה" בתפריט.',
        },
        {
          q: 'כמה זמן נמשכת הסדנה?',
          a: 'הסדנה נמשכת כ-3 שעות (18:00–21:00), כולל הדגמות מעשיות, הפסקת קפה ושאלות ותשובות.',
        },
        {
          q: 'מה אלמד בסדנה?',
          a: 'תלמד כיצד AI משנה את עולם רפואת השיניים: ניתוח צילומי רנטגן אוטומטי, תכנון טיפול חכם, ניהול מרפאה יעיל, ותוכל לראות הדגמות LIVE של הכלים המובילים בשוק.',
        },
        {
          q: 'אילו הטבות נוספות מגיעות לי כחבר קהילה?',
          a: 'כחבר קהילה אתה זכאי לסדנה חינמית, מחירים מיוחדים על מוצרי AI דנטלי, עדכונים שוטפים על חדשנות בדנטיסטריה, וגישה מוקדמת לאירועים ומוצרים חדשים.',
        },
        {
          q: 'איך אני יוצר קשר אם יש לי שאלות?',
          a: 'ניתן ליצור קשר עם מיטל דרך "צור קשר" בתפריט – טלפון או WhatsApp בשעות 09:00–16:00.',
        },
        {
          q: 'האם הסדנה מתאימה לכל רופאי השיניים?',
          a: 'כן! הסדנה מיועדת לרופאי שיניים בכל הרמות – גם אם אין לך ניסיון עם AI. נתאים את התוכן לרמת הידע שלך.',
        },
      ],
    },

    benefits: {
      title:    'הטבות לחברי הקהילה',
      subtitle: 'מה מגיע לך כחבר קהילת צ\'אקיר',
      items: [
        {
          icon:  'Gift',
          title: 'סדנה חינמית',
          desc:  'הסדנה המקצועית בשווי 300₪ ניתנת לך בחינם לחלוטין. פשוט הצג את הקוד האישי שקיבלת.',
          badge: 'הטבה מיידית',
        },
        {
          icon:  'Tag',
          title: 'מחירים מיוחדים',
          desc:  'גישה למחירים בלעדיים על מוצרי AI דנטלי – חיסכון של עד 40% לעומת מחיר השוק.',
          badge: 'חיסכון שוטף',
        },
        {
          icon:  'Rss',
          title: 'עדכונים שוטפים',
          desc:  'קבל עדכונים בזמן אמת על הטכנולוגיות החדשות ביותר בדנטיסטריה ישירות ל-WhatsApp שלך.',
          badge: 'מידע בלעדי',
        },
        {
          icon:  'Zap',
          title: 'גישה מוקדמת',
          desc:  'כחבר קהילה אתה הראשון לשמוע על מוצרים ואירועים חדשים לפני הפרסום הכללי.',
          badge: 'Early Access',
        },
        {
          icon:  'Users',
          title: 'קהילה מקצועית',
          desc:  'הצטרף לרשת של 500+ רופאי שיניים, שתף ידע וצור קשרים מקצועיים בעולם ה-AI הדנטלי.',
          badge: '500+ חברים',
        },
        {
          icon:  'Headphones',
          title: 'תמיכה אישית',
          desc:  'גישה ישירה לצוות המומחים שלנו לכל שאלה, ייעוץ או בעיה טכנית. תמיד כאן בשבילך.',
          badge: 'תמיכה מלאה',
        },
      ],
      cta: 'הרשמה לסדנה',
    },

    common: {
      back:        'חזור',
      loading:     'טוען...',
      error:       'שגיאה',
      success:     'הצלחה!',
      close:       'סגור',
      copy:        'העתק',
      openMenu:    'פתח תפריט',
      closeMenu:   'סגור תפריט',
      logout:      'יציאה',
      free:        'חינם!',
    },
  },

  // ─── ARABIC ────────────────────────────────────────────────
  ar: {
    dir: 'rtl',
    langName: 'العربية',
    flag: '🇸🇦',

    nav: {
      workshopDetails:      'تفاصيل الورشة',
      workshopRegistration: 'التسجيل في الورشة',
      about:                'عن دنتال شاكير',
      products:             'منتجات أعضاء المجتمع',
      location:             'الوصول إلى الورشة',
      contact:              'تواصل معنا',
      faq:                  'الأسئلة الشائعة',
      benefits:             'مزايا أعضاء المجتمع',
    },

    landing: {
      headline:    'مجتمع شاكير',
      subheadline: 'في طليعة الذكاء الاصطناعي لطب الأسنان',
      tagline:     'ابتكار • احترافية • مستقبل طب الأسنان',
      welcome:     'مرحباً بكم!',
      description: 'مجتمع حصري لأطباء الأسنان في طليعة التكنولوجيا. أدخل رمزك الشخصي واكتشف عالم الذكاء الاصطناعي الجديد في طب الأسنان.',
      cta:         'الدخول برمز شخصي',
      features: [
        { icon: 'Brain',   text: 'ذكاء اصطناعي متقدم' },
        { icon: 'Users',   text: 'مجتمع المهنيين' },
        { icon: 'Star',    text: 'مزايا حصرية' },
        { icon: 'Zap',     text: 'تقنية حديثة' },
      ],
    },

    codeEntry: {
      title:       'الدخول إلى المجتمع',
      subtitle:    'أدخل الرمز الشخصي الذي تلقيته',
      label:       'الرمز الشخصي',
      placeholder: 'أدخل رمزك هنا...',
      submit:      'دخول',
      validating:  'جاري التحقق...',
      freeMessage: 'تُمنح لك ورشة العمل بقيمة {price}₪ مجاناً كعضو في المجتمع باستخدام الرمز الذي تلقيته.',
      yourCode:    'رمزك:',
      copyCode:    'نسخ الرمز',
      copied:      '✓ تم النسخ!',
      continueBtn: 'متابعة تسجيل الدخول',
      noCodeBtn:   'الدخول بدون رمز كوبون',
      noCodeNote:  'ستكون ورشة العمل بسعر {price}',
      errors: {
        required: 'يجب إدخال الرمز',
        invalid:  'رمز غير صالح. يرجى التحقق من الرمز الذي تلقيته.',
      },
    },

    login: {
      title:           'تسجيل الدخول',
      subtitle:        'أدخل رقم هاتفك وكلمة المرور لإتمام الدخول',
      phoneLbl:        'رقم الهاتف',
      phonePlaceholder:'05X-XXX-XXXX',
      passLbl:         'كلمة المرور',
      passPlaceholder: 'أنشئ كلمة مرور (6+ أحرف)',
      submit:          'الدخول إلى التطبيق',
      logging:         'جارٍ الدخول...',
      codeReminder:    'رمزك:',
      errors: {
        phoneRequired:   'يجب إدخال رقم الهاتف',
        phoneInvalid:    'رقم الهاتف غير صالح',
        passRequired:    'يجب إدخال كلمة المرور',
        passShort:       'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل',
      },
    },

    workshopDetails: {
      title:        'تفاصيل الورشة',
      subtitle:     'ورشة مهنية لأطباء الأسنان',
      freeFor:      'مجاني لأعضاء المجتمع!',
      regularPrice: 'السعر العادي:',
      date:         'التاريخ:',
      time:         'الوقت:',
      location:     'الموقع:',
      duration:     'المدة:',
      hours:        'ساعات',

      learnTitle:   'ماذا ستتعلم في الورشة؟',
      learnItems: [
        'أساسيات الذكاء الاصطناعي في طب الأسنان الحديث',
        'تحليل الأشعة السينية التلقائي – كيف يعزز الذكاء الاصطناعي دقة التشخيص',
        'التخطيط الذكي للعلاج: من الأشعة إلى خطة العلاج في دقائق',
        'منصات الذكاء الاصطناعي لإدارة العيادة وتوفير الوقت',
        'تحسين تجربة المريض عبر الأتمتة الذكية',
        'عروض توضيحية LIVE لأدوات الذكاء الاصطناعي الرائدة',
        'أسئلة وأجوبة مع خبراء السوق',
      ],

      benefitsTitle: 'لماذا الذكاء الاصطناعي في طب الأسنان؟',
      benefitItems: [
        { icon: 'Target',    title: 'دقة تشخيصية عالية',   desc: 'يكتشف الذكاء الاصطناعي مشاكل قد تفوت العين البشرية' },
        { icon: 'Clock',     title: 'توفير الوقت',          desc: 'أتمتة المهام المتكررة تتيح الوقت للرعاية الصحية' },
        { icon: 'TrendingUp',title: 'زيادة الإيرادات',      desc: 'تشخيص أدق = علاجات أدق = مرضى أكثر رضا' },
        { icon: 'Shield',    title: 'الحماية المهنية',       desc: 'توثيق رقمي كامل وتحليل قائم على البيانات' },
      ],

      cta: 'التسجيل في الورشة',
    },

    workshopRegistration: {
      title:          'التسجيل في الورشة',
      subtitle:       'جميع التفاصيل تُملأ تلقائياً لك',
      freeBadge:      'دخول مجاني لأعضاء المجتمع',
      fullNameLbl:    'الاسم الكامل',
      fullNamePh:     'الاسم الأول واسم العائلة',
      phoneLbl:       'رقم الهاتف',
      codeLbl:        'الرمز الشخصي',
      clinicLbl:      'اسم العيادة',
      clinicPh:       'اسم عيادتك',
      emailLbl:       'عنوان البريد الإلكتروني',
      emailPh:        'example@clinic.com',
      langLbl:        'اللغة المفضلة في الورشة',
      langOptions: {
        he: 'עברית',
        ar: 'عربية',
        ru: 'Русский',
        en: 'English',
      },
      submit:         'إرسال التسجيل',
      submitting:     'جارٍ الإرسال...',
      successTitle:   'تم التسجيل بنجاح!',
      successText:    'شكراً! تم استلام تسجيلك في الورشة. ستتلقى تأكيداً عبر WhatsApp قريباً.',
      errors: {
        nameRequired:  'يجب إدخال الاسم الكامل',
        emailInvalid:  'عنوان البريد الإلكتروني غير صالح',
        clinicRequired:'يجب إدخال اسم العيادة',
      },
    },

    about: {
      title:      'عن دنتال شاكير',
      subtitle:   'نقود الثورة التكنولوجية في طب الأسنان',
      whoTitle:   'من نحن؟',
      whoText:    'دنتال شاكير هي شركة رائدة في دمج حلول الذكاء الاصطناعي في طب الأسنان في إسرائيل. نربط بين المعرفة السريرية لأطباء الأسنان وأحدث التقنيات في العالم.',
      whyTitle:   'لماذا الذكاء الاصطناعي في طب الأسنان؟',
      whyText:    'الذكاء الاصطناعي لم يعد رؤية مستقبلية – إنه هنا الآن. تُفيد عيادات الأسنان التي اعتمدت تقنيات الذكاء الاصطناعي بتحسن 40% في دقة التشخيص وتوفير أكثر من 15 ساعة أسبوعياً.',
      statsTitle: 'الأرقام تتحدث',
      stats: [
        { value: '500+', label: 'طبيب أسنان في المجتمع' },
        { value: '97%',  label: 'دقة تحليل الذكاء الاصطناعي' },
        { value: '40%',  label: 'تحسن في التشخيص' },
        { value: '15+',  label: 'ساعة موفرة أسبوعياً' },
      ],
      trustTitle: 'لماذا تثق بنا؟',
      trustItems: [
        'خبرة تزيد على 8 سنوات في تقنيات طب الأسنان',
        'شراكات مع مستشفيات رائدة',
        'تدريب ودعم كامل لكل عضو في المجتمع',
        'تحديثات منتظمة وفق آخر أخبار الصناعة',
        'مجتمع داعم من المهنيين',
      ],
    },

    products: {
      title:         'منتجات أعضاء المجتمع',
      subtitle:      'أسعار خاصة حصرية لأعضاء المجتمع',
      regularPrice:  'السعر العادي:',
      memberPrice:   'سعر عضو المجتمع:',
      inquire:       'استفسار عبر واتساب',
      badge:         'سعر العضو',
    },

    location: {
      title:    'الوصول إلى الورشة',
      subtitle: 'جميع الأدوات للوصول بسهولة',
      address:  'العنوان:',
      date:     'التاريخ والوقت:',
      waze:     'الملاحة بـ Waze',
      gmaps:    'الملاحة بـ Google Maps',
      gcal:     'حفظ في تقويم Google',
      outlook:  'حفظ في تقويم Outlook',
      mapNote:  'انقر على أحد أزرار الملاحة للحصول على الاتجاهات',
    },

    contact: {
      title:        'تواصل معنا',
      subtitle:     'ميتال هنا من أجلك',
      nameLabel:    'ميتال',
      hoursLabel:   'ساعات العمل:',
      hours:        '09:00 – 16:00',
      callBtn:      'الاتصال بميتال',
      waBtn:        'واتساب ميتال',
      offHoursMsg:  'اترك رسالة على واتساب وستعود إليك ميتال خلال ساعات العمل.',
      onlineStatus: 'متاحة الآن',
      offlineStatus:'غير متاحة حالياً',
    },

    faq: {
      title:    'الأسئلة الشائعة',
      subtitle: 'إجابات على الأسئلة الأكثر شيوعاً',
      items: [
        { q: 'ما هو الرمز الشخصي الذي تلقيته؟', a: 'الرمز الشخصي هو مفتاح دخولك الفريد إلى المجتمع والورشة. احتفظ به – فهو يمنحك دخولاً مجانياً لورشة بقيمة 300₪.' },
        { q: 'هل الورشة مجانية حقاً؟', a: 'نعم! كعضو في مجتمع شاكير، تُمنح لك ورشة بقيمة 300₪ مجاناً تماماً.' },
        { q: 'كيف أسجل في الورشة؟', a: 'بعد الدخول إلى التطبيق برمزك، انتقل إلى "التسجيل في الورشة". ستُملأ تفاصيلك تلقائياً.' },
        { q: 'أين تُقام الورشة؟', a: 'تُقام الورشة في شارع التكنولوجيا 12، تل أبيب. يمكنك الحصول على التوجيهات عبر Waze أو Google Maps.' },
        { q: 'كم تستغرق الورشة؟', a: 'تستغرق الورشة حوالي 3 ساعات (18:00–21:00) بما في ذلك العروض التوضيحية واستراحة القهوة.' },
        { q: 'ماذا سأتعلم في الورشة؟', a: 'ستتعلم كيف يغير الذكاء الاصطناعي طب الأسنان: تحليل الأشعة التلقائي، التخطيط الذكي للعلاج، وإدارة العيادة.' },
        { q: 'ما الفوائد الإضافية لعضوية المجتمع؟', a: 'تشمل الفوائد: ورشة مجانية، أسعار خاصة على المنتجات، تحديثات منتظمة، والوصول المبكر إلى الأحداث والمنتجات الجديدة.' },
        { q: 'كيف أتواصل إذا كان لدي أسئلة؟', a: 'يمكنك التواصل مع ميتال عبر "تواصل معنا" في القائمة – هاتف أو واتساب من 09:00 إلى 16:00.' },
      ],
    },

    benefits: {
      title:    'مزايا أعضاء المجتمع',
      subtitle: 'ما تحصل عليه كعضو في مجتمع شاكير',
      items: [
        { icon: 'Gift',       title: 'ورشة مجانية',          desc: 'ورشة احترافية بقيمة 300₪ مجاناً. فقط قدّم رمزك الشخصي.', badge: 'فائدة فورية' },
        { icon: 'Tag',        title: 'أسعار خاصة',           desc: 'أسعار حصرية على منتجات الذكاء الاصطناعي – وفر حتى 40%.', badge: 'توفير مستمر' },
        { icon: 'Rss',        title: 'تحديثات منتظمة',       desc: 'تلقَّ تحديثات فورية عبر واتساب حول أحدث التقنيات.', badge: 'معلومات حصرية' },
        { icon: 'Zap',        title: 'الوصول المبكر',         desc: 'كن أول من يعلم بالمنتجات والأحداث الجديدة.', badge: 'Early Access' },
        { icon: 'Users',      title: 'مجتمع مهني',            desc: 'انضم لشبكة من 500+ طبيب أسنان وشارك المعرفة.', badge: '500+ أعضاء' },
        { icon: 'Headphones', title: 'دعم شخصي',             desc: 'وصول مباشر لفريق الخبراء لأي سؤال أو مشكلة.', badge: 'دعم كامل' },
      ],
      cta: 'التسجيل في الورشة',
    },

    common: {
      back:        'رجوع',
      loading:     'جارٍ التحميل...',
      error:       'خطأ',
      success:     'نجاح!',
      close:       'إغلاق',
      copy:        'نسخ',
      openMenu:    'فتح القائمة',
      closeMenu:   'إغلاق القائمة',
      logout:      'خروج',
      free:        'مجاني!',
    },
  },

  // ─── RUSSIAN ───────────────────────────────────────────────
  ru: {
    dir: 'ltr',
    langName: 'Русский',
    flag: '🇷🇺',

    nav: {
      workshopDetails:      'Детали воркшопа',
      workshopRegistration: 'Запись на воркшоп',
      about:                'О Dental Chakir',
      products:             'Товары для членов',
      location:             'Как добраться',
      contact:              'Контакты',
      faq:                  'Вопросы и ответы',
      benefits:             'Преимущества членства',
    },

    landing: {
      headline:    'Сообщество Чакир',
      subheadline: 'на передовой ИИ в стоматологии',
      tagline:     'Инновации • Профессионализм • Будущее стоматологии',
      welcome:     'Добро пожаловать!',
      description: 'Эксклюзивное сообщество стоматологов на передовой технологий. Введите ваш персональный код и откройте новый мир ИИ в стоматологии.',
      cta:         'Войти с личным кодом',
      features: [
        { icon: 'Brain',   text: 'Передовой ИИ' },
        { icon: 'Users',   text: 'Сообщество профессионалов' },
        { icon: 'Star',    text: 'Эксклюзивные преимущества' },
        { icon: 'Zap',     text: 'Современные технологии' },
      ],
    },

    codeEntry: {
      title:       'Вход в сообщество',
      subtitle:    'Введите личный код, который вы получили',
      label:       'Личный код',
      placeholder: 'Введите ваш код...',
      submit:      'Войти',
      validating:  'Проверка кода...',
      freeMessage: 'Воркшоп стоимостью {price}₪ предоставляется вам бесплатно как члену сообщества по полученному коду.',
      yourCode:    'Ваш код:',
      copyCode:    'Скопировать код',
      copied:      '✓ Скопировано!',
      continueBtn: 'Продолжить вход',
      noCodeBtn:   'Войти без купон-кода',
      noCodeNote:  'Воркшоп будет платным — {price}',
      errors: {
        required: 'Необходимо ввести код',
        invalid:  'Недействительный код. Проверьте код, который вы получили.',
      },
    },

    login: {
      title:           'Вход',
      subtitle:        'Введите номер телефона и пароль для завершения входа',
      phoneLbl:        'Номер телефона',
      phonePlaceholder:'05X-XXX-XXXX',
      passLbl:         'Пароль',
      passPlaceholder: 'Создайте пароль (6+ символов)',
      submit:          'Войти в приложение',
      logging:         'Вход...',
      codeReminder:    'Ваш код:',
      errors: {
        phoneRequired:   'Необходимо ввести номер телефона',
        phoneInvalid:    'Неверный номер телефона',
        passRequired:    'Необходимо ввести пароль',
        passShort:       'Пароль должен содержать не менее 6 символов',
      },
    },

    workshopDetails: {
      title:        'Детали воркшопа',
      subtitle:     'Профессиональный воркшоп для стоматологов',
      freeFor:      'Бесплатно для членов сообщества!',
      regularPrice: 'Обычная цена:',
      date:         'Дата:',
      time:         'Время:',
      location:     'Место:',
      duration:     'Продолжительность:',
      hours:        'часа',

      learnTitle:   'Чему вы научитесь на воркшопе?',
      learnItems: [
        'Основы искусственного интеллекта в современной стоматологии',
        'Автоматический анализ рентгенограмм – как ИИ повышает точность диагностики',
        'Умное планирование лечения: от рентгена до плана лечения за минуты',
        'ИИ-платформы для управления клиникой и экономии времени',
        'Улучшение опыта пациента с помощью умной автоматизации',
        'Демонстрации LIVE ведущих ИИ-инструментов',
        'Вопросы и ответы с экспертами рынка',
      ],

      benefitsTitle: 'Почему ИИ в стоматологии?',
      benefitItems: [
        { icon: 'Target',    title: 'Высокая точность диагностики', desc: 'ИИ обнаруживает проблемы, которые может пропустить человеческий глаз' },
        { icon: 'Clock',     title: 'Экономия времени',             desc: 'Автоматизация рутинных задач освобождает время для лечения' },
        { icon: 'TrendingUp',title: 'Увеличение дохода',             desc: 'Точная диагностика = точное лечение = довольные пациенты' },
        { icon: 'Shield',    title: 'Профессиональная защита',       desc: 'Полная цифровая документация и анализ на основе данных' },
      ],

      cta: 'Записаться на воркшоп',
    },

    workshopRegistration: {
      title:          'Запись на воркшоп',
      subtitle:       'Все данные заполняются автоматически',
      freeBadge:      'Бесплатный вход для членов сообщества',
      fullNameLbl:    'Полное имя',
      fullNamePh:     'Имя и фамилия',
      phoneLbl:       'Номер телефона',
      codeLbl:        'Личный код',
      clinicLbl:      'Название клиники',
      clinicPh:       'Название вашей клиники',
      emailLbl:       'Адрес электронной почты',
      emailPh:        'example@clinic.com',
      langLbl:        'Предпочтительный язык на воркшопе',
      langOptions: {
        he: 'עברית',
        ar: 'عربية',
        ru: 'Русский',
        en: 'English',
      },
      submit:         'Отправить заявку',
      submitting:     'Отправка...',
      successTitle:   'Вы успешно зарегистрированы!',
      successText:    'Спасибо! Ваша заявка на воркшоп получена. Вы получите подтверждение в WhatsApp в ближайшее время.',
      errors: {
        nameRequired:  'Необходимо ввести полное имя',
        emailInvalid:  'Неверный адрес электронной почты',
        clinicRequired:'Необходимо ввести название клиники',
      },
    },

    about: {
      title:      'О Dental Chakir',
      subtitle:   'Мы возглавляем технологическую революцию в стоматологии',
      whoTitle:   'Кто мы?',
      whoText:    'Dental Chakir — ведущая компания по внедрению решений искусственного интеллекта в стоматологию Израиля. Мы объединяем клинические знания стоматологов с самыми передовыми технологиями в мире.',
      whyTitle:   'Почему ИИ в стоматологии?',
      whyText:    'Искусственный интеллект — это уже не будущее, это настоящее. Стоматологические клиники, принявшие технологии ИИ, сообщают об улучшении точности диагностики на 40% и экономии более 15 часов в неделю.',
      statsTitle: 'Цифры говорят сами за себя',
      stats: [
        { value: '500+', label: 'стоматологов в сообществе' },
        { value: '97%',  label: 'точность ИИ-анализа' },
        { value: '40%',  label: 'улучшение диагностики' },
        { value: '15+',  label: 'часов экономии в неделю' },
      ],
      trustTitle: 'Почему доверяют нам?',
      trustItems: [
        '8+ лет опыта в стоматологических технологиях',
        'Партнёрства с ведущими больницами',
        'Полное обучение и поддержка каждого члена',
        'Регулярные обновления по новостям отрасли',
        'Поддерживающее сообщество профессионалов',
      ],
    },

    products: {
      title:         'Товары для членов сообщества',
      subtitle:      'Специальные цены эксклюзивно для членов сообщества',
      regularPrice:  'Обычная цена:',
      memberPrice:   'Цена для членов:',
      inquire:       'Запрос в WhatsApp',
      badge:         'Цена для членов',
    },

    location: {
      title:    'Как добраться до воркшопа',
      subtitle: 'Все инструменты для удобного прибытия',
      address:  'Адрес:',
      date:     'Дата и время:',
      waze:     'Навигация Waze',
      gmaps:    'Навигация Google Maps',
      gcal:     'Сохранить в Google Календарь',
      outlook:  'Сохранить в Outlook',
      mapNote:  'Нажмите на одну из кнопок навигации для получения маршрута',
    },

    contact: {
      title:        'Контакты',
      subtitle:     'Мейтал здесь для вас',
      nameLabel:    'Мейтал',
      hoursLabel:   'Рабочее время:',
      hours:        '09:00 – 16:00',
      callBtn:      'Позвонить Мейтал',
      waBtn:        'WhatsApp Мейтал',
      offHoursMsg:  'Оставьте сообщение в WhatsApp, и Мейтал свяжется с вами в рабочее время.',
      onlineStatus: 'Онлайн сейчас',
      offlineStatus:'Недоступна сейчас',
    },

    faq: {
      title:    'Вопросы и ответы',
      subtitle: 'Ответы на наиболее часто задаваемые вопросы',
      items: [
        { q: 'Что такое личный код, который я получил?', a: 'Личный код — это ваш уникальный ключ для входа в сообщество и на воркшоп. Сохраните его — он даёт вам бесплатный доступ на воркшоп стоимостью 300₪.' },
        { q: 'Воркшоп действительно бесплатный?', a: 'Да! Как член сообщества Чакир, воркшоп стоимостью 300₪ предоставляется вам совершенно бесплатно.' },
        { q: 'Как записаться на воркшоп?', a: 'После входа в приложение с вашим кодом перейдите в раздел "Запись на воркшоп". Ваши данные заполнятся автоматически.' },
        { q: 'Где проводится воркшоп?', a: 'Воркшоп проводится на улице ХаТехнология 12, Тель-Авив. Направления доступны через Waze или Google Maps.' },
        { q: 'Сколько длится воркшоп?', a: 'Воркшоп длится около 3 часов (18:00–21:00), включая практические демонстрации и кофе-паузу.' },
        { q: 'Чему я научусь на воркшопе?', a: 'Вы узнаете, как ИИ меняет стоматологию: автоматический анализ рентгенограмм, умное планирование лечения и управление клиникой.' },
        { q: 'Какие ещё преимущества даёт членство?', a: 'Преимущества включают: бесплатный воркшоп, специальные цены на продукты, регулярные обновления и ранний доступ к новинкам.' },
        { q: 'Как связаться при наличии вопросов?', a: 'Свяжитесь с Мейтал через раздел "Контакты" в меню — телефон или WhatsApp с 09:00 до 16:00.' },
      ],
    },

    benefits: {
      title:    'Преимущества членства',
      subtitle: 'Что вы получаете как член сообщества Чакир',
      items: [
        { icon: 'Gift',       title: 'Бесплатный воркшоп',        desc: 'Профессиональный воркшоп за 300₪ совершенно бесплатно.', badge: 'Немедленная выгода' },
        { icon: 'Tag',        title: 'Специальные цены',           desc: 'Эксклюзивные цены на ИИ-продукты — экономия до 40%.', badge: 'Постоянная экономия' },
        { icon: 'Rss',        title: 'Регулярные обновления',      desc: 'Получайте обновления в реальном времени через WhatsApp.', badge: 'Эксклюзивная информация' },
        { icon: 'Zap',        title: 'Ранний доступ',              desc: 'Первыми узнавайте о новых продуктах и событиях.', badge: 'Early Access' },
        { icon: 'Users',      title: 'Профессиональное сообщество', desc: 'Присоединяйтесь к сети 500+ стоматологов.', badge: '500+ членов' },
        { icon: 'Headphones', title: 'Персональная поддержка',     desc: 'Прямой доступ к команде экспертов по любому вопросу.', badge: 'Полная поддержка' },
      ],
      cta: 'Записаться на воркшоп',
    },

    common: {
      back:        'Назад',
      loading:     'Загрузка...',
      error:       'Ошибка',
      success:     'Успех!',
      close:       'Закрыть',
      copy:        'Скопировать',
      openMenu:    'Открыть меню',
      closeMenu:   'Закрыть меню',
      logout:      'Выйти',
      free:        'Бесплатно!',
    },
  },

  // ─── ENGLISH ───────────────────────────────────────────────
  en: {
    dir: 'ltr',
    langName: 'English',
    flag: '🇬🇧',

    nav: {
      workshopDetails:      'Workshop Details',
      workshopRegistration: 'Register for Workshop',
      about:                'About Dental Chakir',
      products:             'Member Products',
      location:             'Workshop Location',
      contact:              'Contact',
      faq:                  'FAQ',
      benefits:             'Member Benefits',
    },

    landing: {
      headline:    'Chakir Community',
      subheadline: 'Advancing Dental AI',
      tagline:     'Innovation • Professionalism • The Future of Dentistry',
      welcome:     'Welcome!',
      description: 'An exclusive community for dentists at the forefront of technology. Enter your personal code and discover the new world of AI in dentistry.',
      cta:         'Enter with Personal Code',
      features: [
        { icon: 'Brain',   text: 'Advanced AI Technology' },
        { icon: 'Users',   text: 'Professional Community' },
        { icon: 'Star',    text: 'Exclusive Benefits' },
        { icon: 'Zap',     text: 'Cutting-edge Tools' },
      ],
    },

    codeEntry: {
      title:       'Community Entry',
      subtitle:    'Enter the personal code you received',
      label:       'Personal Code',
      placeholder: 'Enter your code here...',
      submit:      'Enter',
      validating:  'Validating code...',
      freeMessage: 'The {price}₪ workshop is FREE for you as a community member using the code you received.',
      yourCode:    'Your code:',
      copyCode:    'Copy Code',
      copied:      '✓ Copied!',
      continueBtn: 'Continue to Login',
      noCodeBtn:   'Enter without coupon code',
      noCodeNote:  'The workshop will be at full price — {price}',
      errors: {
        required: 'Please enter your code',
        invalid:  'Invalid code. Please check the code you received.',
      },
    },

    login: {
      title:           'Login',
      subtitle:        'Enter your phone number and password to complete login',
      phoneLbl:        'Phone Number',
      phonePlaceholder:'05X-XXX-XXXX',
      passLbl:         'Password',
      passPlaceholder: 'Create a password (6+ characters)',
      submit:          'Enter the App',
      logging:         'Logging in...',
      codeReminder:    'Your code:',
      errors: {
        phoneRequired:   'Please enter your phone number',
        phoneInvalid:    'Invalid phone number',
        passRequired:    'Please enter a password',
        passShort:       'Password must be at least 6 characters',
      },
    },

    workshopDetails: {
      title:        'Workshop Details',
      subtitle:     'Professional workshop for dentists',
      freeFor:      'Free for community members!',
      regularPrice: 'Regular price:',
      date:         'Date:',
      time:         'Time:',
      location:     'Location:',
      duration:     'Duration:',
      hours:        'hours',

      learnTitle:   'What will you learn?',
      learnItems: [
        'AI fundamentals in modern dentistry',
        'Automated X-ray analysis – how AI enhances diagnostic accuracy',
        'Smart treatment planning: from X-ray to treatment plan in minutes',
        'AI platforms for clinic management and time savings',
        'Improving patient experience through smart automation',
        'LIVE demos of leading AI tools',
        'Q&A with industry experts',
      ],

      benefitsTitle: 'Why AI in Dentistry?',
      benefitItems: [
        { icon: 'Target',    title: 'High Diagnostic Accuracy', desc: 'AI detects issues the human eye might miss' },
        { icon: 'Clock',     title: 'Time Savings',             desc: 'Automating repetitive tasks frees time for care' },
        { icon: 'TrendingUp',title: 'Revenue Growth',           desc: 'More accurate diagnosis = better outcomes = happier patients' },
        { icon: 'Shield',    title: 'Professional Protection',  desc: 'Complete digital documentation and data-driven analysis' },
      ],

      cta: 'Register for Workshop',
    },

    workshopRegistration: {
      title:          'Workshop Registration',
      subtitle:       'All details are pre-filled automatically for you',
      freeBadge:      'Free entry for community members',
      fullNameLbl:    'Full Name',
      fullNamePh:     'First and last name',
      phoneLbl:       'Phone Number',
      codeLbl:        'Personal Code',
      clinicLbl:      'Clinic Name',
      clinicPh:       'Your clinic name',
      emailLbl:       'Email Address',
      emailPh:        'example@clinic.com',
      langLbl:        'Preferred Language at Workshop',
      langOptions: {
        he: 'עברית',
        ar: 'عربية',
        ru: 'Русский',
        en: 'English',
      },
      submit:         'Submit Registration',
      submitting:     'Submitting...',
      successTitle:   'Successfully Registered!',
      successText:    'Thank you! Your workshop registration has been received. You will receive confirmation on WhatsApp shortly.',
      errors: {
        nameRequired:  'Please enter your full name',
        emailInvalid:  'Invalid email address',
        clinicRequired:'Please enter your clinic name',
      },
    },

    about: {
      title:      'About Dental Chakir',
      subtitle:   'Leading the technological revolution in dentistry',
      whoTitle:   'Who Are We?',
      whoText:    "Dental Chakir is Israel's leading company for integrating AI solutions into dentistry. We bridge the deep clinical knowledge of dentists with the world's most advanced technologies.",
      whyTitle:   'Why AI in Dentistry?',
      whyText:    'Artificial intelligence is no longer a future vision — it\'s here now. Dental clinics that adopted AI technologies report a 40% improvement in diagnostic accuracy and savings of 15+ hours per week.',
      statsTitle: 'The Numbers Speak',
      stats: [
        { value: '500+', label: 'dentists in the community' },
        { value: '97%',  label: 'AI analysis accuracy' },
        { value: '40%',  label: 'improvement in diagnosis' },
        { value: '15+',  label: 'hours saved weekly' },
      ],
      trustTitle: 'Why Trust Us?',
      trustItems: [
        '8+ years of experience in dental technology',
        'Partnerships with leading hospitals',
        'Full training and support for every member',
        'Regular updates according to industry news',
        'Supportive community of professionals',
      ],
    },

    products: {
      title:         'Community Member Products',
      subtitle:      'Special prices exclusively for community members',
      regularPrice:  'Regular price:',
      memberPrice:   'Member price:',
      inquire:       'Inquire via WhatsApp',
      badge:         'Member Price',
    },

    location: {
      title:    'Getting to the Workshop',
      subtitle: 'All the tools to get there easily',
      address:  'Address:',
      date:     'Date & Time:',
      waze:     'Navigate with Waze',
      gmaps:    'Navigate with Google Maps',
      gcal:     'Save to Google Calendar',
      outlook:  'Save to Outlook',
      mapNote:  'Click a navigation button for directions',
    },

    contact: {
      title:        'Contact',
      subtitle:     'Meital is here for you',
      nameLabel:    'Meital',
      hoursLabel:   'Working Hours:',
      hours:        '09:00 – 16:00',
      callBtn:      'Call Meital',
      waBtn:        'WhatsApp Meital',
      offHoursMsg:  'Leave a WhatsApp message and Meital will get back to you during working hours.',
      onlineStatus: 'Available now',
      offlineStatus:'Currently unavailable',
    },

    faq: {
      title:    'Frequently Asked Questions',
      subtitle: 'Answers to the most common questions',
      items: [
        { q: 'What is the personal code I received?', a: 'Your personal code is your unique key to the community and workshop. Keep it — it gives you free access to the 300₪ workshop and all community member benefits.' },
        { q: 'Is the workshop really free for me?', a: 'Yes! As a Chakir community member, the 300₪ workshop is completely free for you.' },
        { q: 'How do I register for the workshop?', a: 'After logging into the app with your code, go to "Register for Workshop". Your details will be automatically filled in.' },
        { q: 'Where is the workshop held?', a: 'The workshop is at 12 HaTechnologia St, Tel Aviv. Get directions via Waze or Google Maps in the "Workshop Location" section.' },
        { q: 'How long does the workshop last?', a: 'The workshop lasts about 3 hours (18:00–21:00), including live demos, a coffee break, and Q&A.' },
        { q: 'What will I learn at the workshop?', a: 'You will learn how AI is transforming dentistry: automated X-ray analysis, smart treatment planning, and efficient clinic management.' },
        { q: 'What other benefits come with membership?', a: 'Benefits include: free workshop, special prices on AI products, regular updates, and early access to new events and products.' },
        { q: 'How do I get in touch if I have questions?', a: 'Contact Meital via "Contact" in the menu — phone or WhatsApp between 09:00–16:00.' },
      ],
    },

    benefits: {
      title:    'Community Member Benefits',
      subtitle: 'What you get as a Chakir community member',
      items: [
        { icon: 'Gift',       title: 'Free Workshop',           desc: 'A professional workshop worth 300₪ — completely free.', badge: 'Immediate Benefit' },
        { icon: 'Tag',        title: 'Special Prices',          desc: 'Exclusive prices on AI dental products — save up to 40%.', badge: 'Ongoing Savings' },
        { icon: 'Rss',        title: 'Regular Updates',         desc: 'Get real-time updates via WhatsApp on latest technologies.', badge: 'Exclusive Info' },
        { icon: 'Zap',        title: 'Early Access',            desc: 'Be first to hear about new products and events.', badge: 'Early Access' },
        { icon: 'Users',      title: 'Professional Network',    desc: 'Join a network of 500+ dentists and share knowledge.', badge: '500+ Members' },
        { icon: 'Headphones', title: 'Personal Support',        desc: 'Direct access to our expert team for any question.', badge: 'Full Support' },
      ],
      cta: 'Register for Workshop',
    },

    common: {
      back:        'Back',
      loading:     'Loading...',
      error:       'Error',
      success:     'Success!',
      close:       'Close',
      copy:        'Copy',
      openMenu:    'Open menu',
      closeMenu:   'Close menu',
      logout:      'Logout',
      free:        'Free!',
    },
  },
}

export const t = (lang, path) => {
  const keys = path.split('.')
  let result = translations[lang] || translations.he
  for (const key of keys) {
    result = result?.[key]
    if (result === undefined) return path
  }
  return result
}
