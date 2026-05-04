import React from 'react'
import { MessageCircle, Tag, Package } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import { config } from '../config/config.js'

function buildWhatsAppLink(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
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
        <Tag size={20} className="text-white flex-shrink-0" />
        <p className="text-white font-bold text-sm">{pr.badge}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {config.products.map(product => {
          const name = isRTL ? product.nameHe : product.nameEn
          const desc = isRTL ? product.descHe : product.descEn
          const waLink = buildWhatsAppLink(
            config.contact.meital.whatsappNumber,
            product.whatsappMsg,
          )

          return (
            <div key={product.id}
              className="card-hover overflow-hidden">

              {/* Product image / placeholder */}
              <div className="h-28 bg-gradient-to-br from-brand-50 to-teal-50 rounded-xl mb-4
                flex flex-col items-center justify-center border border-brand-100">
                {product.image
                  ? <img src={product.image} alt={name} className="w-full h-full object-cover rounded-xl" />
                  : (
                    <div className="text-center">
                      <Package size={32} className="text-brand-300 mx-auto mb-1" />
                      <p className="text-brand-400 text-xs font-medium">{name}</p>
                    </div>
                  )
                }
              </div>

              <h3 className="font-bold text-gray-900 text-base mb-1">{name}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">{desc}</p>

              {/* Pricing */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-400 line-through">{pr.regularPrice} {product.regularPrice}</p>
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-brand-600" />
                    <p className="font-black text-brand-700 text-lg">{product.memberPrice}</p>
                  </div>
                </div>
                <span className="badge-teal text-xs">{pr.badge}</span>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full text-sm py-2.5"
              >
                <MessageCircle size={16} />
                <span>{pr.inquire}</span>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
