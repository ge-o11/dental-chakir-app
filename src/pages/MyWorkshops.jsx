import React from 'react'
import {
  Calendar, Clock, MapPin, CheckCircle2, ClipboardList,
  ArrowLeft, ArrowRight, Sparkles, Timer,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { storage } from '../context/AppContext.jsx'
import { config } from '../config/config.js'

export default function MyWorkshops() {
  const { state, actions } = useApp()
  const isRTL    = ['he', 'ar'].includes(state.language)
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  const savedReg = storage.get('chakir_registration')
  const isRegistered = !!(savedReg && (
    (state.code        && savedReg.code  === state.code) ||
    (state.user?.phone && savedReg.phone === state.user?.phone)
  ))

  const formatDate = (d) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('he-IL', { year:'numeric', month:'long', day:'numeric' })
  }

  return (
    <div className="pb-8 animate-fade-in">

      {/* Title */}
      <div className="mb-5">
        <h1 className="section-title">{isRTL ? 'הרשמות לסדנאות' : 'Workshop Registrations'}</h1>
        <p className="section-subtitle">
          {isRTL ? 'הסדנאות שנרשמת אליהן וסדנאות עתידיות' : 'Your registrations and upcoming workshops'}
        </p>
      </div>

      {/* ── Current workshop ── */}
      <div className="mb-3">
        <p className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-3 px-1">
          {isRTL ? 'הסדנה הקרובה' : 'Upcoming Workshop'}
        </p>
      </div>

      <div className="rounded-3xl overflow-hidden shadow-lg mb-6 border border-brand-100">

        {/* Header */}
        <div className="bg-gradient-to-br from-brand-800 to-teal-600 px-5 pt-5 pb-4 relative overflow-hidden">
          <div className="absolute top-0 end-0 w-28 h-28 rounded-full bg-white/5 -translate-y-10 translate-x-10 pointer-events-none" />
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-white/70 text-xs font-medium mb-1">
                {isRTL ? 'קהילת דנטל ישראל' : 'Dental Israel Community'}
              </p>
              <h2 className="text-white font-extrabold text-lg leading-tight">
                {isRTL ? 'סדנת AI דנטלי' : 'Dental AI Workshop'}
              </h2>
            </div>
            {isRegistered ? (
              <div className="flex items-center gap-1.5 bg-green-400/20 border border-green-300/30
                text-green-200 text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0">
                <CheckCircle2 size={12} />
                {isRTL ? 'רשום' : 'Registered'}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-white/15 border border-white/20
                text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0">
                {isRTL ? 'לא רשום' : 'Not registered'}
              </div>
            )}
          </div>
        </div>

        {/* Details grid */}
        <div className="bg-white px-5 py-4 grid grid-cols-2 gap-3">
          {[
            { icon: Calendar, label: isRTL ? 'תאריך'    : 'Date',     value: config.workshop.dateDisplay },
            { icon: Clock,    label: isRTL ? 'שעה'      : 'Time',     value: config.workshop.timeDisplay },
            { icon: MapPin,   label: isRTL ? 'מיקום'    : 'Location', value: config.workshop.address.city },
            { icon: Timer,    label: isRTL ? 'משך'      : 'Duration', value: `${config.workshop.durationHours} ${isRTL ? 'שעות' : 'hours'}` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                <Icon size={14} className="text-brand-600" />
              </div>
              <div>
                <p className="text-gray-400 text-[10px]">{label}</p>
                <p className="text-gray-800 font-semibold text-xs leading-tight">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Registration details (if registered) */}
        {isRegistered && savedReg && (
          <div className="bg-brand-50 border-t border-brand-100 px-5 py-4 space-y-2">
            <p className="text-xs font-bold text-brand-700 mb-2">
              {isRTL ? 'פרטי ההרשמה שלך' : 'Your Registration Details'}
            </p>
            {[
              { label: isRTL ? 'שם'       : 'Name',     value: savedReg.fullName },
              { label: isRTL ? 'מרפאה'    : 'Clinic',   value: savedReg.clinic },
              { label: isRTL ? 'טלפון'    : 'Phone',    value: savedReg.phone, ltr: true },
              { label: isRTL ? 'נרשם ב-'  : 'Reg. date',value: formatDate(savedReg.timestamp) },
            ].filter(r => r.value).map(({ label, value, ltr }) => (
              <div key={label} className="flex justify-between gap-2 text-sm pb-1 border-b border-brand-100/60 last:border-0">
                <span className="text-gray-400 shrink-0 text-xs">{label}</span>
                <span className="font-semibold text-gray-800 text-xs text-end truncate"
                  dir={ltr ? 'ltr' : undefined}>{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Register CTA (if not registered) */}
        {!isRegistered && (
          <div className="bg-white border-t border-gray-100 px-5 py-4">
            <button
              onClick={() => actions.setSection('workshop-registration')}
              className="btn-primary w-full py-3 text-sm gap-2"
            >
              <ClipboardList size={16} />
              <span>{isRTL ? 'הרשמה לסדנה' : 'Register for Workshop'}</span>
              <ArrowIcon size={16} />
            </button>
            {state.hasCode && (
              <p className="text-center text-xs text-teal-600 font-semibold mt-2">
                🎁 {isRTL ? 'הסדנה חינמית עבורך!' : 'This workshop is free for you!'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Future workshops ── */}
      <div className="mb-3">
        <p className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-3 px-1">
          {isRTL ? 'סדנאות עתידיות' : 'Future Workshops'}
        </p>
      </div>

      <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/50 px-6 py-8
        flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center">
          <Sparkles size={22} className="text-brand-500" />
        </div>
        <p className="font-bold text-brand-800 text-sm">
          {isRTL ? 'סדנאות נוספות בקרוב!' : 'More workshops coming soon!'}
        </p>
        <p className="text-gray-400 text-xs leading-relaxed max-w-[220px]">
          {isRTL
            ? 'סדנאות AI דנטלי נוספות יפורסמו כאן ברגע שיהיו זמינות'
            : 'Additional dental AI workshops will appear here when available'}
        </p>
      </div>

    </div>
  )
}
