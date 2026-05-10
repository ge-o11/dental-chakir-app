import React, { useState, useEffect } from 'react'
import { Send, User, Phone, KeyRound, Building2, Mail, Globe,
         Calendar, Clock, MapPin, Sparkles, Star } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import { config } from '../config/config.js'
import { storage } from '../context/AppContext.jsx'
import { supabase } from '../lib/supabase.js'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const isRTL = (lang) => ['he', 'ar'].includes(lang)

export default function WorkshopRegistration() {
  const { state, actions } = useApp()
  const tr  = translations[state.language]
  const w   = tr.workshopRegistration
  const rtl = isRTL(state.language)

  const savedReg = storage.get('chakir_registration')
  const wasAlreadyRegistered = !!(savedReg && (
    (state.code       && savedReg.code  === state.code) ||
    (state.user?.phone && savedReg.phone === state.user?.phone)
  ))

  const [form, setForm] = useState({
    fullName: savedReg?.fullName || state.user?.name  || '',
    phone:    savedReg?.phone    || state.user?.phone || '',
    code:     savedReg?.code     || state.code        || '',
    clinic:   savedReg?.clinic   || '',
    email:    savedReg?.email    || '',
    lang:     state.language,
  })
  const [errors,     setErrors]     = useState({})
  const [submitting, setSubmitting] = useState(false)

  // If already registered → skip the form, go straight to workshop-details with toast
  useEffect(() => {
    if (!wasAlreadyRegistered) return
    actions.setNotification({ name: form.fullName.trim(), alreadyRegistered: true })
    actions.setSection('workshop-details')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const update = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.fullName.trim())                    errs.fullName = w.errors.nameRequired
    if (form.email && !validateEmail(form.email)) errs.email    = w.errors.emailInvalid
    if (!form.clinic.trim())                      errs.clinic   = w.errors.clinicRequired
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    storage.set('chakir_registration', {
      ...form,
      timestamp:    new Date().toISOString(),
      workshopDate: config.workshop.date,
    })
    if (form.fullName.trim()) {
      actions.setUserName(form.fullName.trim())
      if (state.user?.phone) {
        supabase.from('members_codes')
          .update({ name: form.fullName.trim() })
          .eq('phone', state.user.phone)
          .then(() => {})
      }
    }
    setSubmitting(false)
    // Navigate immediately to workshop-details; toast appears on top
    actions.setNotification({ name: form.fullName.trim() })
    actions.setSection('workshop-details')
  }

  const fieldCls = (k) =>
    `input-field ${errors[k] ? 'border-red-400 focus:border-red-400 ring-2 ring-red-200' : ''}`

  return (
    <div className="pb-6 animate-fade-in">

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden rounded-3xl mb-5
        bg-gradient-to-br from-brand-950 via-brand-800 to-teal-600
        shadow-2xl shadow-brand-900/40">
        <div className="absolute top-0 start-0 w-40 h-40 rounded-full
          bg-white/5 -translate-x-16 -translate-y-16 pointer-events-none" />
        <div className="absolute bottom-0 end-0 w-32 h-32 rounded-full
          bg-teal-400/10 translate-x-10 translate-y-10 pointer-events-none" />
        <div className="absolute top-1/2 start-1/2 w-24 h-24 rounded-full
          bg-brand-600/20 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 px-5 pt-6 pb-5">
          {state.hasCode ? (
            <div className="inline-flex items-center gap-1.5 bg-emerald-400/20 border border-emerald-300/30
              text-emerald-200 text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wide">
              <Sparkles size={12} />
              {rtl ? 'כניסה חינמית לחברי קהילה' : w.freeBadge}
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-300/30
              text-amber-200 text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wide">
              💳 {config.workshop.price}{config.workshop.currency}
            </div>
          )}

          <h1 className="text-2xl font-extrabold text-white leading-tight mb-1">{w.title}</h1>
          <p className="text-brand-200 text-sm mb-4">{w.subtitle}</p>

          <div className="flex flex-wrap gap-2">
            {[
              { icon: Calendar, text: config.workshop.dateDisplay },
              { icon: Clock,    text: config.workshop.timeDisplay },
              { icon: MapPin,   text: config.workshop.address.city },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm
                rounded-full px-3 py-1.5 text-white text-xs font-medium">
                <Icon size={12} className="opacity-80 shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stars ── */}
      <div className="flex items-center gap-2 mb-5 px-1">
        <div className="flex">
          {[1,2,3,4,5].map(i => (
            <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
        <span className="text-xs text-gray-400 font-medium">
          {rtl ? 'מעל 500 רופאי שיניים נרשמו' : '500+ dentists already registered'}
        </span>
      </div>

      {/* ── Form ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-brand-100/60 p-5">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {w.fullNameLbl} <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User size={16} className="absolute top-1/2 -translate-y-1/2 start-3.5 text-brand-400 pointer-events-none" />
              <input type="text" value={form.fullName}
                onChange={e => update('fullName', e.target.value)}
                placeholder={w.fullNamePh}
                className={`${fieldCls('fullName')} ps-10`} />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>⚠</span> {errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{w.phoneLbl}</label>
            <div className="relative">
              <Phone size={16} className="absolute top-1/2 -translate-y-1/2 start-3.5 text-brand-400 pointer-events-none" />
              <input type="tel" value={form.phone}
                onChange={e => update('phone', e.target.value)}
                className="input-field ps-10 bg-brand-50/50 font-mono" dir="ltr" />
            </div>
          </div>

          {form.code ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{w.codeLbl}</label>
              <div className="relative">
                <KeyRound size={16} className="absolute top-1/2 -translate-y-1/2 start-3.5 text-brand-400 pointer-events-none" />
                <input type="text" value={form.code} readOnly
                  className="input-field ps-10 bg-brand-50/50 font-mono tracking-widest cursor-default" dir="ltr" />
              </div>
            </div>
          ) : null}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {w.clinicLbl} <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Building2 size={16} className="absolute top-1/2 -translate-y-1/2 start-3.5 text-brand-400 pointer-events-none" />
              <input type="text" value={form.clinic}
                onChange={e => update('clinic', e.target.value)}
                placeholder={w.clinicPh}
                className={`${fieldCls('clinic')} ps-10`} />
            </div>
            {errors.clinic && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>⚠</span> {errors.clinic}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{w.emailLbl}</label>
            <div className="relative">
              <Mail size={16} className="absolute top-1/2 -translate-y-1/2 start-3.5 text-brand-400 pointer-events-none" />
              <input type="email" value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder={w.emailPh}
                className={`${fieldCls('email')} ps-10`} dir="ltr" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>⚠</span> {errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{w.langLbl}</label>
            <div className="relative">
              <Globe size={16} className="absolute top-1/2 -translate-y-1/2 start-3.5 text-brand-400 pointer-events-none" />
              <select value={form.lang}
                onChange={e => update('lang', e.target.value)}
                className="input-field ps-10 appearance-none cursor-pointer">
                {Object.entries(w.langOptions).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" disabled={submitting}
              className="relative w-full py-4 rounded-2xl font-bold text-base text-white
                bg-gradient-to-r from-brand-700 to-teal-600
                shadow-xl shadow-brand-700/30
                hover:from-brand-600 hover:to-teal-500
                active:scale-95 transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 overflow-hidden group">
              {!submitting && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              )}
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{w.submitting}</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>{w.submit}</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4 px-2">
        {rtl
          ? '🔒 הפרטים שלך מאובטחים ולא יועברו לצד שלישי'
          : '🔒 Your details are secure and will not be shared'}
      </p>
    </div>
  )
}
