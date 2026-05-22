import React, { useEffect, useState } from 'react'
import { Coins, Phone, KeyRound, User, Calendar, CheckCircle2, XCircle, Sparkles, Info, ClipboardList, Building2, Mail } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import { supabase } from '../lib/supabase.js'
import { storage } from '../context/AppContext.jsx'

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

function RegistrationSummary({ isRTL }) {
  const [open, setOpen] = useState(false)
  const reg = storage.get('chakir_registration')
  if (!reg) return null

  const formatDate = (d) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString(isRTL ? 'he-IL' : 'en-GB', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  }

  const rows = [
    { icon: User,        label: isRTL ? 'שם מלא'          : 'Full Name',   value: reg.fullName },
    { icon: Phone,       label: isRTL ? 'טלפון'            : 'Phone',       value: reg.phone,   ltr: true },
    { icon: Building2,   label: isRTL ? 'שם המרפאה'        : 'Clinic',      value: reg.clinic },
    { icon: Mail,        label: isRTL ? 'אימייל'           : 'Email',       value: reg.email,   ltr: true },
    { icon: KeyRound,    label: isRTL ? 'קוד'              : 'Code',        value: reg.code,    ltr: true },
    { icon: Calendar,    label: isRTL ? 'תאריך הרשמה'      : 'Registered',  value: formatDate(reg.timestamp) },
  ].filter(r => r.value)

  return (
    <div className="rounded-3xl overflow-hidden border border-brand-100/60 shadow-sm bg-white">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-start"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
            <ClipboardList size={17} className="text-brand-600" />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">
              {isRTL ? 'הרשמה לסדנה' : 'Workshop Registration'}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {isRTL ? 'נרשמת בתאריך ' + formatDate(reg.timestamp) : 'Registered on ' + formatDate(reg.timestamp)}
            </p>
          </div>
        </div>
        <span className={`text-brand-600 text-lg transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ›
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100 divide-y divide-gray-100">
          {rows.map(({ icon: Icon, label, value, ltr }) => (
            <div key={label} className="flex items-center gap-4 px-5 py-3">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-brand-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400">{label}</p>
                <p className={`text-gray-800 font-semibold text-sm truncate ${ltr ? 'font-mono' : ''}`}
                  dir={ltr ? 'ltr' : undefined}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProfilePage() {
  const { state } = useApp()
  const tr = translations[state.language]
  const isRTL = ['he', 'ar'].includes(state.language)

  const [credits,       setCredits]       = useState(null)
  const [isActive,      setIsActive]      = useState(null)
  const [dateJoined,    setDateJoined]    = useState(null)
  const [daysActive,    setDaysActive]    = useState(null)
  const [loaded,        setLoaded]        = useState(false)

  useEffect(() => {
    if (!state.user?.phone) { setLoaded(true); return }

    supabase.from('members_credits')
      .select('credits, is_active, date_joined, days_active')
      .eq('phone', state.user.phone)
      .order('is_active', { ascending: false })
      .order('credits', { ascending: false })
      .limit(1)
      .then(({ data: rows }) => {
        const data = rows?.[0] || null
        if (data) {
          setCredits(data.credits)
          setIsActive(data.is_active)
          setDateJoined(data.date_joined)
          setDaysActive(data.days_active)
        }
        setLoaded(true)
      })
  }, [state.user?.phone])

  const name  = state.user?.name  || ''
  const phone = state.user?.phone || ''
  const initials = name.trim() ? name.trim().split(' ').map(w => w[0]).slice(0, 2).join('') : '👤'
  const isMember = loaded && isActive === true

  const formatDate = (d) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString(isRTL ? 'he-IL' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="pb-8 animate-fade-in space-y-4">

      {/* ── Avatar + name card ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-950 via-brand-800 to-teal-600 shadow-2xl shadow-brand-900/40 px-6 pt-8 pb-6 text-center">
        <div className="absolute top-0 start-0 w-40 h-40 rounded-full bg-white/5 -translate-x-16 -translate-y-16 pointer-events-none" />
        <div className="absolute bottom-0 end-0 w-32 h-32 rounded-full bg-teal-400/10 translate-x-10 translate-y-10 pointer-events-none" />

        {/* Avatar */}
        <div className="relative inline-flex mb-4">
          <div className="w-24 h-24 rounded-3xl bg-white/20 border-2 border-white/30 flex items-center justify-center shadow-xl">
            <span className="text-white font-black text-3xl leading-none">{initials}</span>
          </div>
          {isMember && (
            <div className={`absolute -bottom-1 -end-1 w-7 h-7 rounded-full border-2 border-brand-800 flex items-center justify-center
              ${isActive ? 'bg-green-400' : 'bg-gray-400'}`}>
              {isActive
                ? <CheckCircle2 size={14} className="text-white" />
                : <XCircle size={14} className="text-white" />}
            </div>
          )}
        </div>

        <h1 className="text-white font-black text-2xl leading-tight mb-1">
          {name || (isRTL ? 'משתמש' : 'User')}
        </h1>

        {isMember && (
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mt-1
            ${isActive
              ? 'bg-green-400/20 border border-green-300/30 text-green-200'
              : 'bg-gray-400/20 border border-gray-300/30 text-gray-200'}`}>
            {isActive
              ? (isRTL ? '✅ חבר פעיל בקהילה' : '✅ Active Member')
              : (isRTL ? '⏸ לא פעיל בקהילה' : '⏸ Inactive')}
          </span>
        )}
      </div>

      {/* ── Details card ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-brand-100/60 divide-y divide-gray-100">
        {[
          { icon: User,     label: isRTL ? 'שם מלא'        : 'Full Name',   value: name  || '—' },
          { icon: Phone,    label: isRTL ? 'מספר טלפון'    : 'Phone',       value: phone || '—', ltr: true },
          { icon: Calendar, label: isRTL ? 'תאריך הצטרפות' : 'Joined',      value: formatDate(dateJoined) },
        ].map(({ icon: Icon, label, value, ltr }) => (
          <div key={label} className="flex items-center gap-4 px-5 py-4">
            <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
              <Icon size={17} className="text-brand-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 font-medium">{label}</p>
              <p className={`text-gray-800 font-semibold text-sm mt-0.5 truncate ${ltr ? 'font-mono' : ''}`}
                dir={ltr ? 'ltr' : undefined}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Credits card (members only) ── */}
      {!loaded && (
        <div className="bg-white rounded-3xl border border-brand-100/60 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-gray-100 rounded animate-pulse w-24" />
              <div className="h-6 bg-gray-100 rounded animate-pulse w-32" />
            </div>
          </div>
        </div>
      )}

      {loaded && isMember && (
        <div className="rounded-3xl overflow-hidden shadow-sm border border-yellow-400/20"
          style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0d7377 100%)' }}>

          {/* Credits number */}
          <div className="px-6 pt-6 pb-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
              <Coins size={28} className="text-yellow-300" />
            </div>
            <div>
              <p className="text-white/60 text-xs font-medium mb-0.5">
                {isRTL ? 'הקרדיטים שלך' : 'Your Credits'}
              </p>
              <p className="text-white font-black text-4xl leading-none">
                {credits.toLocaleString()}
                <span className="text-yellow-300 text-sm font-bold mr-2">
                  {isRTL ? ' קרדיט' : ' pts'}
                </span>
              </p>
            </div>
          </div>

          {/* Status bar */}
          <div className={`px-6 py-2.5 border-t border-white/10 text-sm font-semibold
            ${isActive ? 'bg-green-500/20 text-green-300' : 'bg-orange-500/20 text-orange-300'}`}>
            {isActive
              ? (isRTL ? '✅ צובר 10 קרדיט בכל יום פעיל' : '✅ Earning 10 credits per active day')
              : (isRTL ? '⏸ לא צובר קרדיטים כרגע' : '⏸ Not earning credits currently')}
          </div>

          {/* Stats row */}
          {daysActive !== null && (
            <div className="px-6 py-3 border-t border-white/10 flex gap-6">
              <div>
                <p className="text-white/40 text-xs">{isRTL ? 'ימים פעילים' : 'Active days'}</p>
                <p className="text-white font-bold text-lg">{daysActive}</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-white/40 text-xs">{isRTL ? 'קרדיטים ממצבור' : 'From accumulation'}</p>
                <p className="text-white font-bold text-lg">{Math.max(0, credits - 100)}</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-white/40 text-xs">{isRTL ? 'בונוס הצטרפות' : 'Join bonus'}</p>
                <p className="text-white font-bold text-lg">100</p>
              </div>
            </div>
          )}

          {/* Explanation */}
          <div className="px-6 py-4 border-t border-white/10 space-y-2">
            <div className="flex items-start gap-2">
              <Info size={14} className="text-teal-300 flex-shrink-0 mt-0.5" />
              <p className="text-white/70 text-xs leading-relaxed font-medium">
                {isRTL ? 'איך עובדים הקרדיטים?' : 'How do credits work?'}
              </p>
            </div>
            {[
              isRTL ? '🎁 100 קרדיט בונוס בהצטרפות לקהילה' : '🎁 100 bonus credits when you join',
              isRTL ? '➕ 10 קרדיט לכל יום שאתה פעיל בקהילה' : '➕ 10 credits for every active day',
              isRTL ? '⏸ קרדיטים מוקפאים כשעוזבים ומתחדשים בחזרה' : '⏸ Credits freeze when you leave and resume when you return',
            ].map((text, i) => (
              <p key={i} className="text-white/50 text-xs leading-relaxed ps-5">{text}</p>
            ))}
          </div>
        </div>
      )}

      {/* ── Workshop registration summary ── */}
      <RegistrationSummary isRTL={isRTL} />

      {/* ── Non-member join CTA ── */}
      {loaded && !isMember && (
        <div className="rounded-3xl overflow-hidden border border-teal-400/30 shadow-sm"
          style={{ background: 'linear-gradient(135deg, #0f2744 0%, #0d5c55 100%)' }}>
          <div className="px-6 pt-6 pb-4 flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-400/20 flex items-center justify-center flex-shrink-0">
              <Sparkles size={24} className="text-teal-300" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">
                {isRTL ? 'הצטרף לקהילה!' : 'Join the Community!'}
              </p>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">
                {isRTL
                  ? 'קבל 100 קרדיט בהצטרפות ותמשיך לצבור 10 קרדיט ביום'
                  : 'Get 100 credits on joining and earn 10 more each day'}
              </p>
            </div>
          </div>
          <a
            href="https://chat.whatsapp.com/It6v3y6bt4B9cVim2HjJps"
            target="_blank"
            rel="noopener noreferrer"
            className="block mx-6 mb-6 py-3 text-center text-sm font-bold text-white
              bg-teal-500/30 hover:bg-teal-500/50 active:scale-95
              rounded-2xl border border-teal-400/30 transition-all duration-150"
          >
            ✨ {isRTL ? 'הצטרף לקהילה בוואטסאפ' : 'Join WhatsApp Community'}
          </a>
        </div>
      )}
    </div>
  )
}
