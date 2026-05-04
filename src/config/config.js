// ============================================================
//  CENTRAL CONFIGURATION — edit this file to update the app
// ============================================================

export const config = {
  community: {
    name:     "קהילת צ'אקיר בקידמת ה-AI הדנטלי",
    nameEn:   "Chakir Dental AI Community",
    tagline:  "חדשנות • מקצועיות • עתיד הדנטיסטריה",
    taglineEn:"Innovation • Professionalism • The Future of Dentistry",
    logo:     null, // path or URL to logo image
  },

  workshop: {
    price:         300,
    currency:      '₪',
    freeForMembers: true,

    // Date/time
    date:          '2026-07-01',           // YYYY-MM-DD
    time:          '18:00',                // HH:MM (24h)
    durationHours: 3,
    dateDisplay:   '1 ביולי 2026',
    timeDisplay:   '18:00 – 21:00',

    // Location
    address: {
      street:  "רחוב הטכנולוגיה 12",
      city:    "תל אביב",
      full:    "רחוב הטכנולוגיה 12, תל אביב 6971004",
      fullEn:  "12 HaTechnologia St, Tel Aviv 6971004",
    },

    // Navigation links (update with real links)
    wazeLink:       'https://waze.com/ul?q=רחוב+הטכנולוגיה+12+תל+אביב&navigate=yes',
    googleMapsLink: 'https://maps.google.com/?q=רחוב+הטכנולוגיה+12,+תל+אביב',

    // Google Calendar deeplink
    googleCalendarLink: (() => {
      const title   = encodeURIComponent("סדנת AI דנטלי – קהילת צ'אקיר");
      const details = encodeURIComponent("סדנה מקצועית לרופאי שיניים בנושא בינה מלאכותית בדנטיסטריה. כניסה חופשית לחברי הקהילה.");
      const location= encodeURIComponent("רחוב הטכנולוגיה 12, תל אביב");
      const start   = '20260701T180000';
      const end     = '20260701T210000';
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    })(),

    // Outlook / ICS download
    outlookIcsData: {
      uid:         'dental-chakir-workshop-20260701@chakir.co.il',
      summary:     "סדנת AI דנטלי – קהילת צ'אקיר",
      description: 'סדנה מקצועית לרופאי שיניים. כניסה חופשית לחברי הקהילה.',
      location:    'רחוב הטכנולוגיה 12, תל אביב',
      dtstart:     '20260701T150000Z',   // UTC (18:00 IL = 15:00 UTC)
      dtend:       '20260701T180000Z',
    },
  },

  contact: {
    meital: {
      name:      'מיטל',
      phone:     '050-123-4567',              // display format
      phoneDial: '+9725012345678',             // tel: href format (no spaces/dashes)
      whatsappNumber: '9725012345678',         // WhatsApp format (no +)
      whatsappDefaultMsg: 'שלום מיטל, אני חבר קהילת צ\'אקיר ואני מעוניין לשאול לגבי הסדנה',
      workingHours: { start: 9, end: 16 },
    },
  },

  products: [
    {
      id: 1,
      nameHe:        'מערכת ניתוח רנטגן AI',
      nameEn:        'AI X-Ray Analysis System',
      descHe:        'זיהוי אוטומטי של עששת, בעיות פריודנטליות ופתולוגיות נסתרות בצילומי רנטגן בדיוק של 97%.',
      descEn:        'Automated detection of caries, periodontal issues and hidden pathologies in X-rays with 97% accuracy.',
      memberPrice:   '199 ₪/חודש',
      regularPrice:  '299 ₪/חודש',
      image:         null,
      whatsappMsg:   'שלום, אני מעוניין לשמוע יותר על מערכת ניתוח רנטגן AI עבור חברי קהילה',
    },
    {
      id: 2,
      nameHe:        'פלטפורמת תקשורת חכמה',
      nameEn:        'Smart Patient Communication',
      descHe:        'מערכת AI לניהול תורים, תזכורות ומעקב אחרי מטופלים. חוסכת 10+ שעות שבועיות.',
      descEn:        'AI system for managing appointments, reminders and patient follow-up. Saves 10+ hours weekly.',
      memberPrice:   '120 ₪/חודש',
      regularPrice:  '180 ₪/חודש',
      image:         null,
      whatsappMsg:   'שלום, אני מעוניין לשמוע על פלטפורמת התקשורת החכמה לחברי קהילה',
    },
    {
      id: 3,
      nameHe:        'תכנון טיפול דיגיטלי',
      nameEn:        'Digital Treatment Planning',
      descHe:        'כלי AI מתקדם ליצירת תכניות טיפול מדויקות, הדמיות תלת-מימד ותיקשורת עם מטופלים.',
      descEn:        'Advanced AI tool for creating precise treatment plans, 3D visualizations and patient communication.',
      memberPrice:   '230 ₪/חודש',
      regularPrice:  '350 ₪/חודש',
      image:         null,
      whatsappMsg:   'שלום, אני מעוניין לשמוע על כלי תכנון הטיפול הדיגיטלי לחברי קהילה',
    },
    {
      id: 4,
      nameHe:        'ניתוח ביצועי מרפאה',
      nameEn:        'Clinic Performance Analytics',
      descHe:        'לוח מחוונים חכם המנתח ביצועים פיננסיים, שביעות רצון מטופלים ויעילות תפעולית.',
      descEn:        'Smart dashboard analyzing financial performance, patient satisfaction and operational efficiency.',
      memberPrice:   '150 ₪/חודש',
      regularPrice:  '240 ₪/חודש',
      image:         null,
      whatsappMsg:   'שלום, אני מעוניין לשמוע על מערכת ניתוח ביצועי המרפאה לחברי קהילה',
    },
  ],

  languages: ['he', 'ar', 'ru', 'en'],
  defaultLanguage: 'he',

  // Valid entry codes (in production replace with backend validation)
  // Set to null to accept any non-empty code
  validCodes: null,
}
