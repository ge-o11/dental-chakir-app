import React, { useState } from 'react'
import { Phone, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, LogIn } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'

function validatePhone(phone) {
  const cleaned = phone.replace(/[\s\-().]/g, '')
  return /^(\+972|0)(5[0-9])\d{7}$/.test(cleaned)
}

export default function LoginPage() {
  const { state, actions } = useApp()
  const tr = translations[state.language]
  const isRTL = ['he', 'ar'].includes(state.language)

  const [phone,    setPhone]    = useState('')
  const [pass,     setPass]     = useState('')
  const [showPass, setShowPass] = useState(false)
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight
  const BackIcon  = isRTL ? ArrowRight : ArrowLeft

  function validate() {
    const errs = {}
    if (!phone.trim())           errs.phone = tr.login.errors.phoneRequired
    else if (!validatePhone(phone)) errs.phone = tr.login.errors.phoneInvalid
    if (!pass)                   errs.pass  = tr.login.errors.passRequired
    else if (pass.length < 6)    errs.pass  = tr.login.errors.passShort
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    actions.login({ phone: phone.trim(), isLoggedIn: true })
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col" dir={tr.dir}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-4">
        <button
          onClick={() => actions.setPage('code-entry')}
          className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm transition-colors"
        >
          <BackIcon size={16} />
          <span>{tr.common.back}</span>
        </button>
        <LanguageSwitcher />
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-sm animate-slide-up">

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-brand-700 to-teal-600 px-6 pt-8 pb-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30
                flex items-center justify-center mx-auto mb-4 shadow-lg">
                <LogIn size={28} className="text-white" />
              </div>
              <h1 className="text-white font-bold text-2xl">{tr.login.title}</h1>
              <p className="text-white/80 text-sm mt-1">{tr.login.subtitle}</p>

              {/* Code reminder */}
              {state.code && (
                <div className="mt-3 mx-auto max-w-[200px] px-3 py-1.5 bg-white/15 rounded-xl
                  border border-white/25 text-xs text-white/80">
                  {tr.login.codeReminder}{' '}
                  <span className="font-mono font-bold text-white">{state.code}</span>
                </div>
              )}
            </div>

            <div className="h-5 -mt-5 bg-white rounded-t-3xl" />

            <form onSubmit={handleSubmit} noValidate className="px-6 pb-8">

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {tr.login.phoneLbl}
                </label>
                <div className="relative">
                  <Phone size={16}
                    className="absolute top-1/2 -translate-y-1/2 start-3.5 text-gray-400 pointer-events-none" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: '' })) }}
                    placeholder={tr.login.phonePlaceholder}
                    className={`input-field ps-10 ${errors.phone ? 'border-red-400' : ''}`}
                    dir="ltr"
                    autoComplete="tel"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {tr.login.passLbl}
                </label>
                <div className="relative">
                  <Lock size={16}
                    className="absolute top-1/2 -translate-y-1/2 start-3.5 text-gray-400 pointer-events-none" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={pass}
                    onChange={e => { setPass(e.target.value); setErrors(p => ({ ...p, pass: '' })) }}
                    placeholder={tr.login.passPlaceholder}
                    className={`input-field ps-10 pe-10 ${errors.pass ? 'border-red-400' : ''}`}
                    dir="ltr"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="absolute top-1/2 -translate-y-1/2 end-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.pass && <p className="text-red-500 text-xs mt-1.5">{errors.pass}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-base disabled:opacity-60"
              >
                {loading ? tr.login.logging : tr.login.submit}
                {!loading && <ArrowIcon size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
