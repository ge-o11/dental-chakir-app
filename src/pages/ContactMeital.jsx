import React from 'react'
import { Phone, MessageCircle, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import { config } from '../config/config.js'

function isWorkingHours() {
  const { start, end } = config.contact.meital.workingHours
  const hour = new Date().getHours()
  return hour >= start && hour < end
}

export default function ContactMeital() {
  const { state } = useApp()
  const tr = translations[state.language]
  const co = tr.contact
  const isRTL = ['he', 'ar'].includes(state.language)

  const online = isWorkingHours()
  const { meital } = config.contact

  const waLink = `https://wa.me/${meital.whatsappNumber}?text=${encodeURIComponent(meital.whatsappDefaultMsg)}`

  return (
    <div className="pt-5 pb-4 animate-fade-in">

      <div className="mb-5">
        <h1 className="section-title">{co.title}</h1>
        <p className="section-subtitle">{co.subtitle}</p>
      </div>

      {/* Contact card */}
      <div className="bg-gradient-to-br from-brand-700 to-teal-600 rounded-2xl p-6
        text-white mb-6 shadow-xl shadow-brand-700/20 relative overflow-hidden">
        <div className="absolute top-0 end-0 w-28 h-28 rounded-full bg-white/5 -translate-y-8 translate-x-8" />

        <div className="relative z-10 flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30
            flex items-center justify-center shadow-lg text-3xl flex-shrink-0">
            👩‍⚕️
          </div>
          <div>
            <h2 className="text-white font-black text-xl">{co.nameLabel}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              {online
                ? <CheckCircle size={14} className="text-green-300" />
                : <XCircle    size={14} className="text-red-300"   />
              }
              <span className={`text-sm font-medium ${online ? 'text-green-200' : 'text-red-200'}`}>
                {online ? co.onlineStatus : co.offlineStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Working hours */}
        <div className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-3">
          <Clock size={16} className="text-teal-200 flex-shrink-0" />
          <div>
            <p className="text-white/70 text-xs">{co.hoursLabel}</p>
            <p className="text-white font-bold text-sm">{co.hours}</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-3">
        {online ? (
          <>
            <a
              href={`tel:${meital.phoneDial}`}
              className="btn-primary w-full py-4 text-base gap-3"
            >
              <Phone size={20} />
              <span>{co.callBtn}</span>
              <span className="text-white/70 text-sm font-normal ms-auto" dir="ltr">
                {meital.phone}
              </span>
            </a>
            <a
              href={waLink}
              target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp w-full py-4 text-base gap-3"
            >
              <MessageCircle size={20} />
              <span>{co.waBtn}</span>
            </a>
          </>
        ) : (
          <div className="space-y-3">
            <a
              href={waLink}
              target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp w-full py-4 text-base gap-3"
            >
              <MessageCircle size={20} />
              <span>{co.waBtn}</span>
            </a>

            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
              <Clock size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm leading-relaxed">{co.offHoursMsg}</p>
            </div>
          </div>
        )}
      </div>

      {/* Phone number display */}
      <div className="mt-6 card text-center">
        <p className="text-xs text-gray-400 mb-1">{isRTL ? 'מספר ישיר' : 'Direct number'}</p>
        <p className="font-mono font-bold text-brand-700 text-xl tracking-wide" dir="ltr">
          {meital.phone}
        </p>
      </div>
    </div>
  )
}
