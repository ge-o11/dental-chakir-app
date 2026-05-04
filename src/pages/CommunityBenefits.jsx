import React from 'react'
import { Gift, Tag, Rss, Zap, Users, Headphones, ArrowLeft, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'

const ICON_MAP = { Gift, Tag, Rss, Zap, Users, Headphones }

const ICON_COLORS = [
  'bg-brand-50 text-brand-600',
  'bg-yellow-50 text-yellow-600',
  'bg-sky-50 text-sky-600',
  'bg-teal-50 text-teal-600',
  'bg-purple-50 text-purple-600',
  'bg-green-50 text-green-600',
]

const BADGE_COLORS = [
  'bg-brand-100 text-brand-700',
  'bg-yellow-100 text-yellow-700',
  'bg-sky-100 text-sky-700',
  'bg-teal-100 text-teal-700',
  'bg-purple-100 text-purple-700',
  'bg-green-100 text-green-700',
]

export default function CommunityBenefits() {
  const { state, actions } = useApp()
  const tr = translations[state.language]
  const be = tr.benefits
  const isRTL = ['he', 'ar'].includes(state.language)
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="pt-5 pb-4 animate-fade-in">

      <div className="mb-5">
        <h1 className="section-title">{be.title}</h1>
        <p className="section-subtitle">{be.subtitle}</p>
      </div>

      {/* Hero banner */}
      <div className="bg-gradient-to-br from-brand-800 to-teal-700 rounded-2xl p-6
        text-white mb-6 relative overflow-hidden shadow-xl shadow-brand-800/20">
        <div className="absolute top-0 end-0 w-40 h-40 rounded-full bg-white/5 -translate-y-12 translate-x-12" />
        <div className="relative z-10 text-center">
          <div className="text-5xl mb-3">🎁</div>
          <h2 className="font-black text-xl mb-2">
            {isRTL ? 'ברוכים הבאים לקהילה!' : 'Welcome to the Community!'}
          </h2>
          <p className="text-white/75 text-sm">
            {isRTL
              ? 'כחבר קהילה אתה זכאי לכל ההטבות הבאות'
              : 'As a community member, you are entitled to all the following benefits'}
          </p>
        </div>
      </div>

      {/* Benefits grid */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {be.items.map((item, i) => {
          const Icon = ICON_MAP[item.icon] || Gift
          return (
            <div key={i}
              className="card-hover flex items-start gap-4 py-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center
                flex-shrink-0 ${ICON_COLORS[i % ICON_COLORS.length]}`}>
                <Icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                  <span className={`badge text-xs flex-shrink-0 ${BADGE_COLORS[i % BADGE_COLORS.length]}`}>
                    {item.badge}
                  </span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <button
        onClick={() => actions.setSection('workshop-registration')}
        className="btn-primary w-full py-4 text-base gap-2"
      >
        <span>{be.cta}</span>
        <ArrowIcon size={20} />
      </button>
    </div>
  )
}
