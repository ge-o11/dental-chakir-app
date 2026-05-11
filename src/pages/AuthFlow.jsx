import React, { useState, useRef, useEffect } from 'react'
import {
  Phone, Lock, Eye, EyeOff, User, Mail, Gift,
  ChevronDown, ChevronUp, Check, ArrowLeft, ArrowRight, Loader2, KeyRound,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import { supabase } from '../lib/supabase.js'
import { config } from '../config/config.js'

// ── helpers ──────────────────────────────────────────────────

async function hashPassword(pass) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pass))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}
function isHashed(s) { return /^[a-f0-9]{64}$/.test(s) }

function validatePhoneFormat(phone) {
  return /^(\+972|0)(5[0-9])\d{7}$/.test(phone.replace(/[\s\-().]/g, ''))
}
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) }

function formatPhoneDisplay(digits) {
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}

function buildPhoneVariants(phone) {
  const s = new Set([phone])
  const d = phone.replace(/\D/g, '')
  if (d.startsWith('0')   && d.length === 10) s.add('972' + d.slice(1))
  if (d.startsWith('972') && d.length === 12) s.add('0'   + d.slice(3))
  return [...s]
}

function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

function maskEmail(email) {
  const [user, domain] = email.split('@')
  return `${user.slice(0, 2)}****@${domain}`
}

// ─────────────────────────────────────────────────────────────

export default function AuthFlow() {
  const { state, actions } = useApp()
  const tr  = translations[state.language]
  const isRTL = ['he', 'ar'].includes(state.language)
  const ArrowIcon = isRTL ? ArrowLeft  : ArrowRight
  const BackIcon  = isRTL ? ArrowRight : ArrowLeft

  // ── login state ──
  const [step, setStep]               = useState(1)
  const [phone, setPhone]             = useState('')
  const [name,  setName]              = useState('')
  const [email, setEmail]             = useState('')
  const [pass,  setPass]              = useState('')
  const [coupon, setCoupon]           = useState('')
  const [showPass, setShowPass]       = useState(false)
  const [showCoupon, setShowCoupon]   = useState(false)
  const [couponStatus, setCouponStatus] = useState(null)
  const [userType, setUserType]       = useState(null)
  const [errors, setErrors]           = useState({})
  const [loading, setLoading]         = useState(false)
  const [shake, setShake]             = useState(false)

  // ── forgot-password state ──
  const [resetMode, setResetMode]     = useState(false)
  const [resetStep, setResetStep]     = useState('email') // 'email' | 'otp' | 'newpass'
  const [resetEmail, setResetEmail]   = useState('')
  const [otpDigits, setOtpDigits]     = useState(Array(6).fill(''))
  const [newPass,   setNewPass]       = useState('')
  const [showNewPass, setShowNewPass] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [resetErrors,  setResetErrors]  = useState({})
  const [sentTo, setSentTo]           = useState('')       // masked email shown
  const [cooldown, setCooldown]       = useState(0)

  const couponTimer  = useRef(null)
  const cooldownRef  = useRef(null)
  const otpInputs    = useRef([])

  useEffect(() => () => {
    if (couponTimer.current) clearTimeout(couponTimer.current)
    if (cooldownRef.current) clearInterval(cooldownRef.current)
  }, [])

  // ── helpers ──

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 420)
  }

  function startCooldown(secs = 60) {
    setCooldown(secs)
    clearInterval(cooldownRef.current)
    cooldownRef.current = setInterval(() => {
      setCooldown(s => { if (s <= 1) { clearInterval(cooldownRef.current); return 0 } return s - 1 })
    }, 1000)
  }

  function handlePhoneChange(e) {
    let raw = e.target.value.replace(/\D/g, '')
    if (raw.startsWith('972')) raw = '0' + raw.slice(3)
    const digits = raw.slice(0, 10)
    setPhone(formatPhoneDisplay(digits))
    setErrors(p => ({ ...p, phone: '' }))
  }

  function handleCouponChange(val) {
    const v = val.toUpperCase()
    setCoupon(v)
    setCouponStatus(null)
    if (couponTimer.current) clearTimeout(couponTimer.current)
    if (v.length < 3) return
    setCouponStatus('checking')
    couponTimer.current = setTimeout(async () => {
      const { data } = await supabase.from('members_codes').select('coupon').eq('coupon', v.trim()).maybeSingle()
      setCouponStatus(data ? 'valid' : 'invalid')
    }, 600)
  }

  // ── STEP 1: phone lookup ──

  async function handleStep1(e) {
    e.preventDefault()
    const cleaned = phone.replace(/[\s\-().]/g, '')
    if (!cleaned)                   { setErrors({ phone: tr.auth.errors.phoneRequired }); triggerShake(); return }
    if (!validatePhoneFormat(cleaned)) { setErrors({ phone: tr.auth.errors.phoneInvalid });  triggerShake(); return }

    setErrors({})
    setLoading(true)
    const { data: member } = await supabase
      .from('members_codes').select('phone, name, password, email').in('phone', buildPhoneVariants(cleaned)).maybeSingle()
    setLoading(false)

    setUserType(member ? 'returning' : 'new')
    if (member?.name)  setName(member.name)
    if (member?.email) setEmail(member.email)
    setStep(2)
  }

  // ── STEP 2: register or login ──

  async function handleStep2(e) {
    e.preventDefault()
    const errs = {}
    if (userType === 'new' && !name.trim()) errs.name = tr.auth.errors.nameRequired
    if (!pass)                errs.pass = tr.auth.errors.passRequired
    else if (pass.length < 6) errs.pass = tr.auth.errors.passShort
    if (Object.keys(errs).length) { setErrors(errs); triggerShake(); return }

    setErrors({})
    setLoading(true)
    const cleaned = phone.replace(/[\s\-().]/g, '')

    try {
      const { data: member, error: fe } = await supabase
        .from('members_codes').select('phone, name, password, email').in('phone', buildPhoneVariants(cleaned)).maybeSingle()
      if (fe) throw fe

      const hashed = await hashPassword(pass)

      if (member) {
        if (member.password) {
          const ok = isHashed(member.password) ? member.password === hashed : member.password === pass
          if (!ok) { setLoading(false); setErrors({ pass: tr.auth.errors.wrongPass }); triggerShake(); return }
          // upgrade legacy plaintext → hash silently
          if (!isHashed(member.password)) {
            await supabase.from('members_codes').update({ password: hashed }).eq('phone', member.phone)
          }
          // save email if entered and not yet stored
          if (email.trim() && !member.email) {
            await supabase.from('members_codes').update({ email: email.trim() }).eq('phone', member.phone)
          }
        } else {
          const { error: ue } = await supabase.from('members_codes')
            .update({ password: hashed, ...(name.trim() ? { name: name.trim() } : {}), ...(email.trim() ? { email: email.trim() } : {}) })
            .eq('phone', member.phone)
          if (ue) throw ue
        }
      } else {
        const { error: ie } = await supabase.from('members_codes').insert({
          phone: cleaned, password: hashed, name: name.trim(),
          email: email.trim() || null, is_active: false,
          date_joined: new Date().toISOString().split('T')[0],
        })
        if (ie) throw ie
      }

      setLoading(false)
      actions.loginFull(
        { phone: cleaned, name: name || member?.name || '', isLoggedIn: true },
        couponStatus === 'valid' ? coupon.trim() : ''
      )
    } catch {
      setLoading(false)
      setErrors({ pass: tr.auth.errors.serverError })
      triggerShake()
    }
  }

  // ── FORGOT PASSWORD: send OTP ──

  async function sendOTP(emailAddr) {
    const cleaned = phone.replace(/[\s\-().]/g, '')
    const otp     = generateOTP()
    const otpHash = await hashPassword(otp)
    const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString()

    const variants = buildPhoneVariants(cleaned)
    const { data: member } = await supabase
      .from('members_codes').select('phone, name').in('phone', variants).maybeSingle()

    const targetPhone = member?.phone || cleaned

    // Save OTP hash + expiry + email to DB
    await supabase.from('members_codes')
      .update({ reset_otp_hash: otpHash, reset_otp_expires: expires, email: emailAddr })
      .eq('phone', targetPhone)

    // Send via EmailJS
    const { error: fnError } = await supabase.functions.invoke('send-otp', {
      body: { to_email: emailAddr, otp_code: otp, user_name: member?.name || '' },
    })
    if (fnError) throw fnError

    setSentTo(maskEmail(emailAddr))
    setResetStep('otp')
    setOtpDigits(Array(6).fill(''))
    startCooldown(60)
    setTimeout(() => otpInputs.current[0]?.focus(), 100)
  }

  async function handleResetSendEmail(e) {
    e.preventDefault()
    const em = resetEmail.trim()
    if (!em)              { setResetErrors({ email: tr.forgot.errors.emailRequired }); return }
    if (!validateEmail(em)) { setResetErrors({ email: tr.forgot.errors.emailInvalid });  return }
    setResetErrors({})
    setResetLoading(true)
    try {
      await sendOTP(em)
    } catch {
      setResetErrors({ email: tr.forgot.errors.sendFailed })
    }
    setResetLoading(false)
  }

  // ── FORGOT PASSWORD: verify OTP ──

  function handleOtpDigit(i, val) {
    if (!/^\d*$/.test(val)) return
    const next = [...otpDigits]
    next[i] = val.slice(-1)
    setOtpDigits(next)
    setResetErrors({})
    if (val && i < 5) otpInputs.current[i + 1]?.focus()
    if (next.every(Boolean)) verifyOTP(next.join(''))
  }

  function handleOtpKey(i, e) {
    if (e.key === 'Backspace' && !otpDigits[i] && i > 0) {
      otpInputs.current[i - 1]?.focus()
    }
  }

  async function verifyOTP(code) {
    setResetLoading(true)
    const cleaned = phone.replace(/[\s\-().]/g, '')
    try {
      const { data: member } = await supabase
        .from('members_codes').select('reset_otp_hash, reset_otp_expires')
        .in('phone', buildPhoneVariants(cleaned)).maybeSingle()

      if (!member?.reset_otp_hash) throw new Error('no otp')
      if (new Date() > new Date(member.reset_otp_expires)) {
        setResetErrors({ otp: tr.forgot.errors.expiredOtp })
        setResetLoading(false)
        return
      }
      const inputHash = await hashPassword(code)
      if (inputHash !== member.reset_otp_hash) {
        setResetErrors({ otp: tr.forgot.errors.wrongOtp })
        setOtpDigits(Array(6).fill(''))
        setTimeout(() => otpInputs.current[0]?.focus(), 50)
        setResetLoading(false)
        return
      }
      setResetStep('newpass')
    } catch {
      setResetErrors({ otp: tr.forgot.errors.wrongOtp })
    }
    setResetLoading(false)
  }

  // ── FORGOT PASSWORD: save new password ──

  async function handleSaveNewPass(e) {
    e.preventDefault()
    if (!newPass || newPass.length < 6) { setResetErrors({ pass: tr.forgot.errors.passShort }); return }
    setResetErrors({})
    setResetLoading(true)
    const cleaned = phone.replace(/[\s\-().]/g, '')
    try {
      const hashed = await hashPassword(newPass)
      const { data: member } = await supabase
        .from('members_codes').select('phone').in('phone', buildPhoneVariants(cleaned)).maybeSingle()
      const { error } = await supabase.from('members_codes')
        .update({ password: hashed, reset_otp_hash: null, reset_otp_expires: null })
        .eq('phone', member?.phone || cleaned)
      if (error) throw error
      setResetLoading(false)
      actions.loginFull({ phone: cleaned, name: name || '', isLoggedIn: true }, '')
    } catch {
      setResetErrors({ pass: tr.forgot.errors.saveFailed })
      setResetLoading(false)
    }
  }

  // ── back / exit reset ──
  function exitReset() {
    setResetMode(false)
    setResetStep('email')
    setResetEmail('')
    setOtpDigits(Array(6).fill(''))
    setNewPass('')
    setResetErrors({})
    clearInterval(cooldownRef.current)
    setCooldown(0)
  }

  const price = config.workshop.price
  const freeLabel = tr.auth.freeWorkshop.replace('{price}', price)
  const paidLabel = tr.auth.paidWorkshop.replace('{price}', price)

  // ── render ──────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col" dir={tr.dir}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-4">
        <button
          onClick={() => {
            if (resetMode) { exitReset(); return }
            if (step === 1) actions.setPage('landing')
            else { setStep(1); setErrors({}); setUserType(null); setPass('') }
          }}
          className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm transition-colors"
        >
          <BackIcon size={16} />
          <span>{tr.common.back}</span>
        </button>
        <LanguageSwitcher />
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-sm">

          {/* Progress pills (hidden in reset mode) */}
          {!resetMode && (
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2].map(i => (
                <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i <= step ? 'bg-white w-8' : 'bg-white/30 w-4'}`} />
              ))}
              <span className="text-white/50 text-xs ms-1">{step} / 2</span>
            </div>
          )}

          {/* ════════════════════════════════════════
              RESET MODE
          ════════════════════════════════════════ */}
          {resetMode ? (
            <div className="animate-slide-up">
              <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${shake ? 'animate-shake' : ''}`}>

                {/* Header */}
                <div className="bg-gradient-to-r from-brand-700 to-teal-600 px-6 pt-8 pb-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {resetStep === 'otp'     ? <KeyRound size={28} className="text-white" />
                      : resetStep === 'newpass' ? <Lock size={28} className="text-white" />
                      : <Mail size={28} className="text-white" />}
                  </div>
                  <h1 className="text-white font-bold text-2xl">
                    {resetStep === 'otp'      ? tr.forgot.sent
                      : resetStep === 'newpass' ? tr.forgot.newPassTitle
                      : tr.forgot.trigger}
                  </h1>
                  <p className="text-white/80 text-sm mt-1">
                    {resetStep === 'otp'
                      ? tr.forgot.sentSub.replace('{email}', sentTo)
                      : resetStep === 'newpass'
                        ? ''
                        : tr.forgot.emailHint}
                  </p>
                </div>
                <div className="h-5 -mt-5 bg-white rounded-t-3xl" />

                <div className="px-6 pb-8">

                  {/* ── Email entry ── */}
                  {resetStep === 'email' && (
                    <form onSubmit={handleResetSendEmail} noValidate className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{tr.forgot.emailLabel}</label>
                        <div className="relative">
                          <Mail size={16} className="absolute top-1/2 -translate-y-1/2 start-3.5 text-gray-400 pointer-events-none" />
                          <input
                            type="email"
                            value={resetEmail}
                            onChange={e => { setResetEmail(e.target.value); setResetErrors({}) }}
                            placeholder={tr.forgot.emailPh}
                            className={`input-field ps-10 ${resetErrors.email ? 'border-red-400' : ''}`}
                            autoFocus dir="ltr"
                          />
                        </div>
                        {resetErrors.email && <p className="text-red-500 text-xs mt-1.5">{resetErrors.email}</p>}
                      </div>
                      <button type="submit" disabled={resetLoading} className="btn-primary w-full py-3.5 disabled:opacity-60">
                        {resetLoading ? <><Loader2 size={18} className="animate-spin" />{tr.forgot.sending}</>
                          : <>{tr.forgot.sendCode}<ArrowIcon size={18} /></>}
                      </button>
                      <button type="button" onClick={exitReset} className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors pt-1">
                        {tr.forgot.back}
                      </button>
                    </form>
                  )}

                  {/* ── OTP entry ── */}
                  {resetStep === 'otp' && (
                    <div className="space-y-5">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-3 text-center">{tr.forgot.otpLabel}</p>
                        <div className="flex gap-2 justify-center" dir="ltr">
                          {Array(6).fill(null).map((_, i) => (
                            <input
                              key={i}
                              ref={el => otpInputs.current[i] = el}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={otpDigits[i]}
                              onChange={e => handleOtpDigit(i, e.target.value)}
                              onKeyDown={e => handleOtpKey(i, e)}
                              className={`w-11 h-13 text-center text-xl font-bold border-2 rounded-xl outline-none transition-all
                                ${resetErrors.otp ? 'border-red-400 bg-red-50' : otpDigits[i] ? 'border-brand-500 bg-brand-50' : 'border-gray-200 focus:border-brand-400'}`}
                              style={{ height: '52px' }}
                            />
                          ))}
                        </div>
                        {resetErrors.otp && <p className="text-red-500 text-xs mt-2 text-center">{resetErrors.otp}</p>}
                        {resetLoading && <p className="text-brand-600 text-xs mt-2 text-center flex items-center justify-center gap-1"><Loader2 size={13} className="animate-spin" />{tr.forgot.verifying}</p>}
                      </div>

                      {/* Resend */}
                      <div className="text-center">
                        {cooldown > 0 ? (
                          <p className="text-xs text-gray-400">{tr.forgot.resendIn.replace('{s}', cooldown)}</p>
                        ) : (
                          <button
                            onClick={async () => {
                              setResetLoading(true)
                              try { await sendOTP(resetEmail) } catch { setResetErrors({ otp: tr.forgot.errors.sendFailed }) }
                              setResetLoading(false)
                            }}
                            className="text-sm text-brand-600 hover:text-brand-800 font-semibold transition-colors"
                          >
                            {tr.forgot.resend}
                          </button>
                        )}
                      </div>

                      <button onClick={exitReset} className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
                        {tr.forgot.back}
                      </button>
                    </div>
                  )}

                  {/* ── New password ── */}
                  {resetStep === 'newpass' && (
                    <form onSubmit={handleSaveNewPass} noValidate className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{tr.forgot.newPassLbl}</label>
                        <div className="relative">
                          <Lock size={16} className="absolute top-1/2 -translate-y-1/2 start-3.5 text-gray-400 pointer-events-none" />
                          <input
                            type={showNewPass ? 'text' : 'password'}
                            value={newPass}
                            onChange={e => { setNewPass(e.target.value); setResetErrors({}) }}
                            placeholder={tr.forgot.newPassPh}
                            className={`input-field ps-10 pe-10 ${resetErrors.pass ? 'border-red-400' : ''}`}
                            dir="ltr" autoFocus autoComplete="new-password"
                          />
                          <button type="button" onClick={() => setShowNewPass(s => !s)}
                            className="absolute top-1/2 -translate-y-1/2 end-3.5 text-gray-400 hover:text-gray-600">
                            {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {resetErrors.pass && <p className="text-red-500 text-xs mt-1.5">{resetErrors.pass}</p>}
                      </div>
                      <button type="submit" disabled={resetLoading} className="btn-primary w-full py-3.5 disabled:opacity-60">
                        {resetLoading ? <><Loader2 size={18} className="animate-spin" />{tr.forgot.saving}</>
                          : tr.forgot.save}
                      </button>
                    </form>
                  )}

                </div>
              </div>
            </div>

          ) : (
          /* ════════════════════════════════════════
             NORMAL LOGIN / REGISTER MODE
          ════════════════════════════════════════ */
            <div key={step} className="animate-slide-up">
              <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${shake ? 'animate-shake' : ''}`}>

                {/* Header */}
                <div className="bg-gradient-to-r from-brand-700 to-teal-600 px-6 pt-8 pb-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {step === 1 ? <Phone size={28} className="text-white" />
                      : userType === 'new' ? <User size={28} className="text-white" />
                      : <Lock size={28} className="text-white" />}
                  </div>
                  <h1 className="text-white font-bold text-2xl">
                    {step === 1 ? tr.auth.step1Title
                      : userType === 'new' ? tr.auth.step2TitleNew : tr.auth.step2TitleReturning}
                  </h1>
                  <p className="text-white/80 text-sm mt-1">
                    {step === 1 ? tr.auth.step1Subtitle
                      : userType === 'new' ? tr.auth.step2SubtitleNew : tr.auth.step2SubtitleReturning}
                  </p>
                  {step === 2 && (
                    <div className="mt-3 mx-auto max-w-[220px] px-3 py-1.5 bg-white/15 rounded-xl border border-white/25 text-xs text-white/90 flex items-center justify-center gap-2">
                      <span>🇮🇱</span>
                      <span className="font-mono font-bold">{phone}</span>
                    </div>
                  )}
                </div>
                <div className="h-5 -mt-5 bg-white rounded-t-3xl" />

                {/* ── STEP 1 ── */}
                {step === 1 && (
                  <form onSubmit={handleStep1} noValidate className="px-6 pb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{tr.auth.phoneLbl}</label>
                    <div className="relative">
                      <span className="absolute top-1/2 -translate-y-1/2 start-3.5 text-lg leading-none pointer-events-none select-none">🇮🇱</span>
                      <input
                        type="tel" value={phone} onChange={handlePhoneChange}
                        placeholder={tr.auth.phonePlaceholder}
                        className={`input-field ps-10 text-lg font-medium tracking-wide ${errors.phone ? 'border-red-400' : ''}`}
                        dir="ltr" autoComplete="tel" autoFocus maxLength={13}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
                    <button type="submit" disabled={loading} className="btn-primary w-full mt-6 py-3.5 text-base disabled:opacity-60">
                      {loading ? <><Loader2 size={18} className="animate-spin" />{tr.auth.checking}</>
                        : <>{tr.auth.continueBtn}<ArrowIcon size={18} /></>}
                    </button>
                  </form>
                )}

                {/* ── STEP 2 ── */}
                {step === 2 && (
                  <form onSubmit={handleStep2} noValidate className="px-6 pb-8 space-y-4">

                    {/* Phone read-only (new users) */}
                    {userType === 'new' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{tr.auth.phoneLbl}</label>
                        <div className="relative">
                          <span className="absolute top-1/2 -translate-y-1/2 start-3.5 text-lg leading-none pointer-events-none">🇮🇱</span>
                          <input type="tel" value={phone} readOnly dir="ltr"
                            className="input-field ps-10 bg-gray-50 text-gray-500 cursor-not-allowed" />
                        </div>
                      </div>
                    )}

                    {/* Name (new users) */}
                    {userType === 'new' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">{tr.auth.nameLbl}</label>
                        <div className="relative">
                          <User size={16} className="absolute top-1/2 -translate-y-1/2 start-3.5 text-gray-400 pointer-events-none" />
                          <input type="text" value={name} onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
                            placeholder={tr.auth.namePlaceholder}
                            className={`input-field ps-10 ${errors.name ? 'border-red-400' : ''}`}
                            autoComplete="name" autoFocus />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                      </div>
                    )}

                    {/* Email (new users — for password recovery) */}
                    {userType === 'new' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {tr.auth.emailLbl}
                          <span className="text-gray-400 font-normal text-xs ms-1">({tr.auth.emailOptional})</span>
                        </label>
                        <div className="relative">
                          <Mail size={16} className="absolute top-1/2 -translate-y-1/2 start-3.5 text-gray-400 pointer-events-none" />
                          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder={tr.auth.emailPh}
                            className="input-field ps-10"
                            dir="ltr" autoComplete="email" />
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{tr.auth.emailHint}</p>
                      </div>
                    )}

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{tr.auth.passLbl}</label>
                      <div className="relative">
                        <Lock size={16} className="absolute top-1/2 -translate-y-1/2 start-3.5 text-gray-400 pointer-events-none" />
                        <input
                          type={showPass ? 'text' : 'password'} value={pass}
                          onChange={e => { setPass(e.target.value); setErrors(p => ({ ...p, pass: '' })) }}
                          placeholder={userType === 'new' ? tr.auth.passPlaceholderNew : tr.auth.passPlaceholderReturning}
                          className={`input-field ps-10 pe-10 ${errors.pass ? 'border-red-400' : ''}`}
                          dir="ltr" autoComplete={userType === 'new' ? 'new-password' : 'current-password'}
                          autoFocus={userType === 'returning'}
                        />
                        <button type="button" onClick={() => setShowPass(s => !s)}
                          className="absolute top-1/2 -translate-y-1/2 end-3.5 text-gray-400 hover:text-gray-600 transition-colors">
                          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {errors.pass && <p className="text-red-500 text-xs mt-1.5">{errors.pass}</p>}
                    </div>

                    {/* Forgot password link (returning users) */}
                    {userType === 'returning' && (
                      <div className="text-end">
                        <button
                          type="button"
                          onClick={() => { setResetMode(true); setResetStep('email') }}
                          className="text-xs text-brand-600 hover:text-brand-800 font-semibold transition-colors"
                        >
                          {tr.forgot.trigger}
                        </button>
                      </div>
                    )}

                    {/* Coupon accordion */}
                    <div className="border border-gray-100 rounded-2xl overflow-hidden">
                      <button type="button" onClick={() => setShowCoupon(s => !s)}
                        className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-brand-700 hover:bg-brand-50 transition-colors">
                        <span className="flex items-center gap-2">
                          <Gift size={15} className="text-brand-500" />
                          {tr.auth.couponToggle}
                        </span>
                        {showCoupon ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
                      </button>
                      {showCoupon && (
                        <div className="px-4 pb-4 pt-1 border-t border-gray-100 animate-fade-in">
                          <div className="relative">
                            <input type="text" value={coupon} onChange={e => handleCouponChange(e.target.value)}
                              placeholder={tr.auth.couponPlaceholder}
                              className={`input-field font-mono text-center tracking-widest uppercase pe-10 ${
                                couponStatus === 'invalid' ? 'border-red-400' : couponStatus === 'valid' ? 'border-green-400' : ''}`}
                              maxLength={20} autoComplete="off" />
                            <div className="absolute top-1/2 -translate-y-1/2 end-3.5 pointer-events-none">
                              {couponStatus === 'checking' && <Loader2 size={15} className="animate-spin text-gray-400" />}
                              {couponStatus === 'valid'    && <Check size={15} className="text-green-500" />}
                              {couponStatus === 'invalid'  && <span className="text-red-400 text-sm font-bold">✕</span>}
                            </div>
                          </div>
                          {couponStatus === 'valid'   && <p className="text-green-600 text-xs mt-1.5 font-semibold text-center animate-fade-in">{tr.auth.couponValid}</p>}
                          {couponStatus === 'invalid' && <p className="text-red-500 text-xs mt-1.5 text-center">{tr.auth.errors.couponInvalid}</p>}
                        </div>
                      )}
                    </div>

                    {/* Price badge */}
                    <div className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors duration-300 ${
                      couponStatus === 'valid' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                      {couponStatus === 'valid' ? '🎉' : '💳'}
                      {couponStatus === 'valid' ? freeLabel : paidLabel}
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base disabled:opacity-60">
                      {loading ? <><Loader2 size={18} className="animate-spin" />{tr.auth.logging}</>
                        : <>{userType === 'new' ? tr.auth.submitNew : tr.auth.submitReturning}<ArrowIcon size={18} /></>}
                    </button>
                  </form>
                )}

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
