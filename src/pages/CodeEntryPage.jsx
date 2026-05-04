import React, { useState } from 'react'
import { KeyRound, ArrowLeft, ArrowRight, Copy, Check, Gift, ChevronLeft, UserCircle2 } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import { config } from '../config/config.js'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'

function validateCode(code) {
  if (!code.trim()) return 'required'
  if (config.validCodes && !config.validCodes.includes(code.trim().toUpperCase())) return 'invalid'
  return null
}

export default function CodeEntryPage() {
  const { state, actions } = useApp()
  const tr = translations[state.language]
  const isRTL = ['he', 'ar'].includes(state.language)

  const [code, setCode]           = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [validated, setValidated] = useState(false)
  const [copied, setCopied]       = useState(false)

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight
  const BackIcon  = isRTL ? ArrowRight : ArrowLeft

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validateCode(code)
    if (err) { setError(tr.codeEntry.errors[err]); return }
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    actions.validateCode(code.trim().toUpperCase())
    setValidated(true)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim().toUpperCase())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const freeMsg = tr.codeEntry.freeMessage.replace(
    '{price}', `${config.workshop.price}${config.workshop.currency}`
  )

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col" dir={tr.dir}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-4">
        <button
          onClick={() => actions.setPage('landing')}
          className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm transition-colors"
        >
          <BackIcon size={16} />
          <span>{tr.common.back}</span>
        </button>
        <LanguageSwitcher />
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-sm">

          {/* ── Main card: enter with code ── */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up mb-4">

            {/* Card header */}
            <div className="bg-gradient-to-r from-brand-700 to-teal-600 px-6 pt-8 pb-10 text-center relative">
              <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30
                flex items-center justify-center mx-auto mb-4 shadow-lg">
                <KeyRound size={28} className="text-white" />
              </div>
              <h1 className="text-white font-bold text-2xl">{tr.codeEntry.title}</h1>
              <p className="text-white/80 text-sm mt-1">{tr.codeEntry.subtitle}</p>
            </div>

            <div className="h-5 -mt-5 bg-white rounded-t-3xl" />

            <div className="px-6 pb-8">
              {!validated ? (
                <form onSubmit={handleSubmit} noValidate>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {tr.codeEntry.label}
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={e => { setCode(e.target.value.toUpperCase()); setError('') }}
                    placeholder={tr.codeEntry.placeholder}
                    className={`input-field font-mono text-center text-lg tracking-widest uppercase
                      ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
                    autoComplete="off"
                    spellCheck="false"
                    maxLength={20}
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-2">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full mt-5 py-3.5 text-base disabled:opacity-60"
                  >
                    {loading ? tr.codeEntry.validating : tr.codeEntry.submit}
                  </button>
                </form>
              ) : (
                <div className="animate-scale-in">
                  {/* Free workshop message */}
                  <div className="bg-gradient-to-br from-brand-50 to-teal-50 rounded-2xl p-4
                    border border-brand-100 mb-5 text-center">
                    <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-3">
                      <Gift size={22} className="text-brand-600" />
                    </div>
                    <p className="text-brand-800 font-semibold text-sm leading-relaxed">{freeMsg}</p>
                  </div>

                  {/* Code display */}
                  <div className="mb-5">
                    <p className="text-xs text-gray-500 font-medium mb-1.5">{tr.codeEntry.yourCode}</p>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl border border-gray-200 p-3">
                      <code className="flex-1 font-mono font-bold text-brand-700 text-xl tracking-widest text-center">
                        {code}
                      </code>
                      <button
                        onClick={handleCopy}
                        className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200
                          ${copied
                            ? 'bg-green-100 text-green-600'
                            : 'bg-brand-100 text-brand-600 hover:bg-brand-200'}`}
                        title={tr.codeEntry.copyCode}
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                    {copied && (
                      <p className="text-center text-green-600 text-xs mt-1.5 font-medium">
                        {tr.codeEntry.copied}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => actions.setPage('login')}
                    className="btn-primary w-full py-3.5 text-base gap-2"
                  >
                    <span>{tr.codeEntry.continueBtn}</span>
                    <ArrowIcon size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Divider ── */}
          {!validated && (
            <>
              <div className="flex items-center gap-3 px-2 mb-4">
                <div className="flex-1 h-px bg-white/25" />
                <span className="text-white/60 text-sm font-medium">
                  {isRTL ? 'או' : 'or'}
                </span>
                <div className="flex-1 h-px bg-white/25" />
              </div>

              {/* ── No-code entry card ── */}
              <button
                onClick={actions.skipCode}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/25
                  rounded-2xl px-5 py-4 flex items-center gap-4 transition-all duration-200
                  active:scale-95 text-start animate-fade-in"
              >
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <UserCircle2 size={22} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">
                    {tr.codeEntry.noCodeBtn}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5 leading-snug">
                    {tr.codeEntry.noCodeNote
                      .replace('{price}', `${config.workshop.price}${config.workshop.currency}`)}
                  </p>
                </div>
                <ArrowIcon size={18} className="text-white/50 flex-shrink-0" />
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
