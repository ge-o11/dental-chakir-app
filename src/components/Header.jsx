import React from 'react'
import { Menu, X, LogOut, Copy, Check } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { useState } from 'react'

export default function Header({ showMenu = false }) {
  const { state, actions } = useApp()
  const tr = translations[state.language]
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(state.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* fallback: select text */
    }
  }

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-gradient-to-r from-brand-800 to-teal-600 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto gap-3">

        {/* Logo + title */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
            <span className="text-lg leading-none">🦷</span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">
              דנטל ישראל
            </p>
            {state.code && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-white/80 text-xs hover:text-white transition-colors"
              >
                <span className="font-mono">{state.code}</span>
                {copied
                  ? <Check size={10} className="text-green-300" />
                  : <Copy size={10} />
                }
              </button>
            )}
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <LanguageSwitcher />

          {state.user?.isLoggedIn && (
            <button
              onClick={actions.logout}
              className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors"
              title={tr.common.logout}
            >
              <LogOut size={14} />
            </button>
          )}

          {showMenu && (
            <button
              onClick={actions.toggleMenu}
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors"
              aria-label={state.menuOpen ? tr.common.closeMenu : tr.common.openMenu}
            >
              {state.menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
