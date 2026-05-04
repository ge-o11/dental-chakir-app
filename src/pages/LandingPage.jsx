import React from 'react'
import { Brain, Users, Star, Zap, ArrowLeft, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'

const ICON_MAP = { Brain, Users, Star, Zap }

export default function LandingPage() {
  const { state, actions } = useApp()
  const tr = translations[state.language]
  const isRTL = ['he', 'ar'].includes(state.language)
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col" dir={tr.dir}>

      {/* Top bar */}
      <div className="flex justify-end px-5 pt-4">
        <LanguageSwitcher />
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">

        {/* Animated logo */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-sm border border-white/30
            flex items-center justify-center shadow-2xl animate-scale-in">
            <span className="text-5xl">🦷</span>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-teal-400
            flex items-center justify-center animate-pulse-soft">
            <Brain size={12} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="animate-slide-up">
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-2">
            {tr.landing.headline}
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-teal-300 mb-3">
            {tr.landing.subheadline}
          </h2>
          <p className="text-white/60 text-sm tracking-widest uppercase mb-6">
            {tr.landing.tagline}
          </p>
        </div>

        {/* Description card */}
        <div className="max-w-sm w-full bg-white/10 backdrop-blur-sm rounded-2xl p-5
          border border-white/20 mb-6 animate-fade-in">
          <p className="text-white font-bold text-lg mb-1">{tr.landing.welcome}</p>
          <p className="text-white/80 text-sm leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{tr.landing.description}</p>
        </div>

        {/* CTA */}
        <button
          onClick={() => actions.setPage('code-entry')}
          className="w-full max-w-sm flex items-center justify-center gap-3
            bg-white text-brand-800 font-bold text-lg py-4 px-8 rounded-2xl
            shadow-2xl shadow-brand-900/30 hover:bg-brand-50 active:scale-95
            transition-all duration-200 animate-slide-up mb-6"
        >
          <span>{tr.landing.cta}</span>
          <ArrowIcon size={20} />
        </button>

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-3 max-w-sm w-full mb-8 animate-fade-in">
          {tr.landing.features.map((f, i) => {
            const Icon = ICON_MAP[f.icon] || Star
            return (
              <div key={i}
                className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5
                  border border-white/15 text-white text-sm font-medium">
                <Icon size={16} className="text-teal-300 flex-shrink-0" />
                <span>{f.text}</span>
              </div>
            )
          })}
        </div>

        {/* Divider waves */}
        <div className="mt-10 flex gap-2 items-center opacity-30">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`bg-white rounded-full w-1 ${
              i === 2 ? 'h-5' : i === 1 || i === 3 ? 'h-3' : 'h-1.5'
            }`} />
          ))}
        </div>
      </div>
    </div>
  )
}
