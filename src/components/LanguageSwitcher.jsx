import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import { config } from '../config/config.js'

export default function LanguageSwitcher() {
  const { state, actions } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const currentLang = translations[state.language]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25
          text-white font-medium text-sm transition-all duration-150 border border-white/20"
        aria-label="Switch language"
      >
        <Globe size={14} />
        <span className="hidden sm:inline">{currentLang.langName}</span>
        <span className="text-base leading-none">{currentLang.flag}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute top-full mt-1 end-0 z-50 bg-white rounded-xl shadow-xl border border-brand-100
            overflow-hidden animate-scale-in min-w-[140px]"
        >
          {config.languages.map(lang => {
            const info = translations[lang]
            const isActive = lang === state.language
            return (
              <button
                key={lang}
                onClick={() => { actions.setLanguage(lang); setOpen(false) }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-start
                  transition-colors duration-150
                  ${isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <span className="text-base leading-none">{info.flag}</span>
                <span>{info.langName}</span>
                {isActive && (
                  <span className="ms-auto w-1.5 h-1.5 rounded-full bg-brand-600" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
