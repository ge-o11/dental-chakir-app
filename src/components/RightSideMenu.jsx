import React, { useEffect, useState } from 'react'
import {
  BookOpen, ClipboardList, Info, ShoppingBag,
  MapPin, Phone, HelpCircle, Gift, X, Coins, Globe, Sparkles,
} from 'lucide-react'

const FacebookIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import { supabase } from '../lib/supabase.js'

const MENU_ITEMS = [
  { key: 'workshop-details',      icon: BookOpen,       navKey: 'workshopDetails' },
  { key: 'workshop-registration', icon: ClipboardList,  navKey: 'workshopRegistration' },
  { key: 'about',                 icon: Info,           navKey: 'about' },
  { key: 'products',              icon: ShoppingBag,    navKey: 'products' },
  { key: 'location',              icon: MapPin,         navKey: 'location' },
  { key: 'contact',               icon: Phone,          navKey: 'contact' },
  { key: 'faq',                   icon: HelpCircle,     navKey: 'faq' },
  { key: 'benefits',              icon: Gift,           navKey: 'benefits' },
]

export default function RightSideMenu() {
  const { state, actions } = useApp()
  const tr = translations[state.language]
  const isRTL = ['he', 'ar'].includes(state.language)
  const [credits,       setCredits]       = useState(null)
  const [isActive,      setIsActive]      = useState(true)
  const [creditsLoaded, setCreditsLoaded] = useState(false)

  useEffect(() => {
    if (!state.menuOpen) return
    // Reset on each open so stale data doesn't flash
    setCredits(null)
    setCreditsLoaded(false)

    const byPhone = !state.code && state.user?.phone
    if (!state.code && !byPhone) { setCreditsLoaded(true); return }

    const q = byPhone
      ? supabase.from('members_credits').select('credits, is_active').eq('phone', state.user.phone)
      : supabase.from('members_credits').select('credits, is_active').eq('coupon', state.code)

    q.maybeSingle().then(({ data }) => {
      if (data) { setCredits(data.credits); setIsActive(data.is_active) }
      setCreditsLoaded(true)
    })
  }, [state.code, state.menuOpen, state.user?.phone])

  return (
    <>
      {/* Backdrop */}
      {state.menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm menu-overlay"
          onClick={actions.closeMenu}
        />
      )}

      {/* Drawer — always on the right side visually */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl
          flex flex-col transition-transform duration-300 ease-in-out
          ${state.menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer header */}
        <div className="bg-gradient-to-r from-brand-800 to-teal-600 px-5 pt-14 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-base leading-tight">
                {isRTL ? "תפריט" : "Menu"}
              </p>
              {state.user?.name && (
                <p className="text-white/75 text-xs mt-0.5 truncate max-w-[160px]">
                  {state.user.name}
                </p>
              )}
            </div>
            <button
              onClick={actions.closeMenu}
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Code display in menu */}
          {state.code && (
            <div className="mt-3 px-3 py-2 rounded-lg bg-white/15 border border-white/25">
              <p className="text-white/70 text-xs mb-0.5">
                {isRTL ? 'הקוד שלך:' : 'Your code:'}
              </p>
              <p className="text-white font-mono font-bold text-sm tracking-wider">
                {state.code}
              </p>
            </div>
          )}

          {/* Credits box — community members only */}
          {state.user && (!creditsLoaded || credits !== null) && (
            <div className="mt-3 rounded-xl overflow-hidden border border-yellow-400/30"
              style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0d7377 100%)' }}>
              <div className="px-3 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                  <Coins size={20} className="text-yellow-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-xs">{isRTL ? 'הקרדיטים שלך' : 'Your credits'}</p>
                  {credits === null ? (
                    <div className="h-5 w-16 bg-white/20 rounded animate-pulse mt-0.5" />
                  ) : (
                    <p className="text-white font-black text-xl leading-tight">
                      {credits.toLocaleString()}
                      <span className="text-yellow-300 text-xs font-semibold mr-1"> קרדיט</span>
                    </p>
                  )}
                </div>
              </div>
              <div className={`px-3 py-1.5 text-center text-xs font-medium ${isActive ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {isActive ? '✅ צובר 10 קרדיט ביום' : '⛔ לא צובר קרדיטים'}
              </div>
            </div>
          )}

          {/* Join community CTA — for non-members */}
          {state.user && creditsLoaded && credits === null && (
            <div className="mt-3 rounded-xl overflow-hidden border border-teal-400/30"
              style={{ background: 'linear-gradient(135deg, #0f2744 0%, #0d5c55 100%)' }}>
              <div className="px-3 pt-3 pb-2 flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={17} className="text-teal-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm leading-snug">
                    {isRTL ? 'הצטרף לקהילה!' : 'Join the community!'}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5 leading-relaxed">
                    {isRTL
                      ? 'חברי קהילה מקבלים 100 קרדיט ומצברים עוד 10 כל יום'
                      : 'Members get 100 credits + earn 10 more every day'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { actions.setSection('contact'); actions.closeMenu() }}
                className="w-full py-2 text-center text-xs font-bold text-teal-200
                  bg-teal-500/20 hover:bg-teal-500/35 active:bg-teal-500/50
                  transition-colors border-t border-teal-400/20"
              >
                {isRTL ? '✨ צור קשר להצטרפות' : '✨ Contact us to join'}
              </button>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {MENU_ITEMS.map(({ key, icon: Icon, navKey }) => {
            const isActive = state.currentSection === key
            return (
              <button
                key={key}
                onClick={() => actions.setSection(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-start
                  transition-all duration-150 font-medium text-sm
                  ${isActive
                    ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <Icon
                  size={18}
                  className={isActive ? 'text-brand-600' : 'text-gray-400'}
                />
                <span className="flex-1">{tr.nav[navKey]}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-600 flex-shrink-0" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Free badge + Social links */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="bg-gradient-to-r from-brand-50 to-teal-50 rounded-xl p-3 border border-brand-100">
            <p className="text-brand-700 font-bold text-xs text-center">
              {isRTL ? '🎁 הסדנה חינמית לחברי קהילה!' : '🎁 Free workshop for members!'}
            </p>
          </div>

          {/* External links */}
          <div className="flex gap-2">
            <a
              href="https://www.dentalchakir.co.il/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                bg-brand-50 border border-brand-100 text-brand-700
                hover:bg-brand-100 active:scale-95 transition-all duration-150
                text-xs font-semibold"
            >
              <Globe size={13} />
              <span>{isRTL ? 'האתר' : 'Website'}</span>
            </a>
            <a
              href="https://www.facebook.com/dentalchakir"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                bg-blue-50 border border-blue-100 text-blue-700
                hover:bg-blue-100 active:scale-95 transition-all duration-150
                text-xs font-semibold"
            >
              <FacebookIcon size={13} />
              <span>{isRTL ? 'פייסבוק' : 'Facebook'}</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}
