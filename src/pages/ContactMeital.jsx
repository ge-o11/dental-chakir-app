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

  return (
    <div className="pt-5 pb-4 animate-fade-in">

      <div className="mb-5">
        <h1 className="section-title">{co.title}</h1>
        <p className="section-subtitle">{co.subtitle}</p>
      </div>

      {/* Working hours banner */}
      <div className="bg-gradient-to-br from-brand-700 to-teal-600 rounded-2xl p-4
        text-white mb-5 shadow-lg shadow-brand-700/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Clock size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white/70 text-xs">{co.hoursLabel}</p>
            <p className="text-white font-bold">{co.hours}</p>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            online ? 'bg-green-400/30 text-green-200' : 'bg-red-400/30 text-red-200'
          }`}>
            {online
              ? <CheckCircle size={12} />
              : <XCircle size={12} />
            }
            <span>{online ? co.onlineStatus : co.offlineStatus}</span>
          </div>
        </div>
      </div>

      {/* Contact note */}
      {co.contactNote && (
        <div className="bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 mb-5">
          <p className="text-brand-700 text-sm leading-relaxed">{co.contactNote}</p>
        </div>
      )}

      {/* Representatives */}
      <div className="space-y-4">
        {config.contact.representatives.map(rep => {
          const waMsg = encodeURIComponent(rep.whatsappDefaultMsg)
          const waLink = `https://wa.me/${rep.whatsappNumber}?text=${waMsg}`
          const specialty = isRTL ? rep.specialty : rep.specialtyEn

          return (
            <div key={rep.id} className="card-hover">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100
                  flex items-center justify-center flex-shrink-0 text-2xl">
                  {rep.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base">{rep.name}</h3>
                  <p className="text-brand-600 text-xs font-medium leading-relaxed mt-0.5">
                    {specialty}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5 font-mono" dir="ltr">
                    {rep.phone}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {online && (
                  <a
                    href={`tel:${rep.phoneDial}`}
                    className="flex-1 btn-primary py-2.5 text-sm gap-2 justify-center"
                  >
                    <Phone size={15} />
                    <span>{co.callBtn}</span>
                  </a>
                )}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-whatsapp py-2.5 text-sm gap-2 justify-center"
                >
                  <MessageCircle size={15} />
                  <span>{co.waBtn}</span>
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* Off-hours note */}
      {!online && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
          <Clock size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm leading-relaxed">{co.offHoursMsg}</p>
        </div>
      )}
    </div>
  )
}
