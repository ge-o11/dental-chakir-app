import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`card overflow-hidden transition-all duration-300
        ${open ? 'border-brand-200 shadow-md' : 'border-transparent'}`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-3 text-start"
      >
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center
            flex-shrink-0 mt-0.5 text-xs font-bold text-brand-700">
            {index + 1}
          </div>
          <p className="font-semibold text-gray-900 text-sm leading-relaxed">{item.q}</p>
        </div>
        <ChevronDown
          size={18}
          className={`text-brand-400 flex-shrink-0 mt-0.5 transition-transform duration-300
            ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="mt-4 ms-9 animate-fade-in">
          <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const { state } = useApp()
  const tr = translations[state.language]
  const fq = tr.faq

  return (
    <div className="pt-5 pb-4 animate-fade-in">

      <div className="mb-5">
        <h1 className="section-title">{fq.title}</h1>
        <p className="section-subtitle">{fq.subtitle}</p>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-brand-700 to-teal-600 rounded-2xl p-5
        flex items-center gap-4 mb-6 text-white shadow-lg shadow-brand-700/15">
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <HelpCircle size={24} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-base">{fq.title}</p>
          <p className="text-white/75 text-xs mt-0.5">{fq.subtitle}</p>
        </div>
      </div>

      <div className="space-y-3">
        {fq.items.map((item, i) => (
          <FAQItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}
