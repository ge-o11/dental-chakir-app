import React from 'react'
import { MessageCircle, Phone, Info } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import { config } from '../config/config.js'

function buildWhatsAppLink(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

function getRep(id) {
  return config.contact.representatives.find(r => r.id === id) || config.contact.representatives[0]
}

export default function CommunityProducts() {
  const { state } = useApp()
  const tr = translations[state.language]
  const pr = tr.products
  const isRTL = ['he', 'ar'].includes(state.language)

  return (
    <div className="pt-5 pb-4 animate-fade-in">

      <div className="mb-5">
        <h1 className="section-title">{pr.title}</h1>
        <p className="section-subtitle">{pr.subtitle}</p>
      </div>

      {/* Member badge */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl px-4 py-3
        flex items-center gap-3 mb-6 shadow-md shadow-yellow-400/20">
        <Info size={20} className="text-white flex-shrink-0" />
        <p className="text-white font-bold text-sm">{pr.badge}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {config.products.map(product => {
          const name = isRTL ? product.nameHe : product.nameEn
          const desc = isRTL ? product.descHe : product.descEn
          const rep = getRep(product.representativeId)
          const waLink = buildWhatsAppLink(rep.whatsappNumber, product.whatsappMsg)
          const repName = isRTL ? rep.name : rep.nameEn
          const repSpecialty = isRTL ? rep.specialty : rep.specialtyEn

          return (
            <div key={product.id} className="card-hover overflow-hidden">

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100
                  flex items-center justify-center flex-shrink-0 text-2xl">
                  {product.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base">{name}</h3>
                  <p className="text-brand-500 text-xs mt-0.5 truncate">
                    {isRTL ? 'נציג: ' : 'Rep: '}{repName} — {repSpecialty}
                  </p>
                </div>
              </div>

              <p className="text-gray-500 text-xs leading-relaxed mb-4">{desc}</p>

              <div className="flex gap-2">
                <a
                  href={`tel:${rep.phoneDial}`}
                  className="flex-1 btn-primary py-2.5 text-sm gap-1.5 justify-center"
                >
                  <Phone size={15} />
                  <span>{pr.contactRep || (isRTL ? 'התקשר' : 'Call')}</span>
                </a>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-whatsapp py-2.5 text-sm gap-1.5 justify-center"
                >
                  <MessageCircle size={15} />
                  <span>{pr.inquire}</span>
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
