import React from 'react'
import { CheckCircle2, Award, TrendingUp, Users, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'

export default function AboutDentalChakir() {
  const { state } = useApp()
  const tr = translations[state.language]
  const ab = tr.about

  return (
    <div className="pt-5 pb-4 animate-fade-in">

      <div className="mb-5">
        <h1 className="section-title">{ab.title}</h1>
        <p className="section-subtitle">{ab.subtitle}</p>
      </div>

      {/* Hero banner */}
      <div className="relative bg-gradient-to-br from-brand-800 to-teal-700 rounded-2xl p-6
        text-white mb-5 overflow-hidden shadow-lg">
        <div className="absolute top-0 end-0 w-32 h-32 rounded-full bg-white/5 -translate-y-8 translate-x-8" />
        <div className="relative z-10">
          <div className="text-4xl mb-3">🦷✨</div>
          <h2 className="text-xl font-black leading-tight mb-2">
            {['he','ar'].includes(state.language)
              ? "דנטל צ'אקיר"
              : 'Dental Chakir'}
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">{ab.whoText}</p>
        </div>
      </div>

      {/* Who we are */}
      <div className="card mb-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
            <Award size={20} className="text-brand-600" />
          </div>
          <h2 className="font-bold text-brand-900 text-lg">{ab.whoTitle}</h2>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{ab.whoText}</p>
      </div>

      {/* Why AI */}
      <div className="card mb-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <TrendingUp size={20} className="text-teal-600" />
          </div>
          <h2 className="font-bold text-brand-900 text-lg">{ab.whyTitle}</h2>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{ab.whyText}</p>
      </div>

      {/* Stats */}
      <div className="mb-5">
        <h2 className="font-bold text-brand-900 text-lg mb-4">{ab.statsTitle}</h2>
        <div className="grid grid-cols-2 gap-3">
          {ab.stats.map((s, i) => (
            <div key={i}
              className="card text-center py-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <p className="text-3xl font-black text-brand-700 mb-1">{s.value}</p>
              <p className="text-xs text-gray-500 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
            <Users size={20} className="text-yellow-600" />
          </div>
          <h2 className="font-bold text-brand-900 text-lg">{ab.trustTitle}</h2>
        </div>
        <ul className="space-y-3">
          {ab.trustItems.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-teal-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
