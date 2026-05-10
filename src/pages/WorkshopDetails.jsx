import React from 'react'
import {
  Calendar, Clock, MapPin, Timer, CheckCircle2,
  Target, TrendingUp, Shield, ArrowLeft, ArrowRight,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import { config } from '../config/config.js'

const ICON_MAP = { Target, Clock, TrendingUp, Shield }

export default function WorkshopDetails() {
  const { state, actions } = useApp()
  const tr = translations[state.language]
  const w  = tr.workshopDetails
  const isRTL = ['he', 'ar'].includes(state.language)
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  const workshopPrice = `${config.workshop.price}${config.workshop.currency}`
  const isFree = state.hasCode

  return (
    <div className="pt-5 pb-4 animate-fade-in">

      {/* Page title */}
      <div className="mb-5">
        <h1 className="section-title">{w.title}</h1>
        <p className="section-subtitle">{w.subtitle}</p>
      </div>

      {/* Hero price card */}
      <div className="relative bg-gradient-to-br from-brand-700 to-teal-600 rounded-2xl p-5
        text-white mb-5 overflow-hidden shadow-lg shadow-brand-700/20">
        <div className="absolute top-0 end-0 w-24 h-24 rounded-full bg-white/5 -translate-y-6 translate-x-6" />
        <div className="absolute bottom-0 start-0 w-16 h-16 rounded-full bg-white/5 translate-y-4 -translate-x-4" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div>
              {isFree ? (
                <>
                  <p className="text-white/70 text-sm mb-0.5">{w.regularPrice}</p>
                  <p className="text-white/50 line-through text-xl font-bold">{workshopPrice}</p>
                </>
              ) : (
                <>
                  <p className="text-white/70 text-sm mb-0.5">{w.regularPrice}</p>
                  <p className="text-white font-black text-2xl">{workshopPrice}</p>
                </>
              )}
            </div>
            {isFree && (
              <div className="bg-yellow-400 text-yellow-900 font-black text-sm px-3 py-1.5
                rounded-full shadow-lg animate-pulse-soft">
                {w.freeFor}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex items-center gap-2 bg-white/10 rounded-xl p-2.5">
              <Calendar size={16} className="text-teal-300 flex-shrink-0" />
              <div>
                <p className="text-white/60 text-xs">{w.date}</p>
                <p className="text-white font-semibold text-sm">{config.workshop.dateDisplay}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-xl p-2.5">
              <Clock size={16} className="text-teal-300 flex-shrink-0" />
              <div>
                <p className="text-white/60 text-xs">{w.time}</p>
                <p className="text-white font-semibold text-sm">{config.workshop.timeDisplay}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-xl p-2.5">
              <MapPin size={16} className="text-teal-300 flex-shrink-0" />
              <div>
                <p className="text-white/60 text-xs">{w.location}</p>
                <p className="text-white font-semibold text-sm leading-tight">
                  {config.workshop.address.city}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-xl p-2.5">
              <Timer size={16} className="text-teal-300 flex-shrink-0" />
              <div>
                <p className="text-white/60 text-xs">{w.duration}</p>
                <p className="text-white font-semibold text-sm">
                  {config.workshop.durationHours} {w.hours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What you'll learn */}
      <div className="card mb-5">
        <h2 className="font-bold text-brand-900 text-lg mb-4">{w.learnTitle}</h2>
        <ul className="space-y-3">
          {w.learnItems.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-teal-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Why AI */}
      <div className="mb-6">
        <h2 className="font-bold text-brand-900 text-lg mb-4">{w.benefitsTitle}</h2>
        <div className="grid grid-cols-1 gap-3">
          {w.benefitItems.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Target
            return (
              <div key={i} className="card-hover flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-brand-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
