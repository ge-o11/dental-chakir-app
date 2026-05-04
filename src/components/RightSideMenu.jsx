import React from 'react'
import {
  BookOpen, ClipboardList, Info, ShoppingBag,
  MapPin, Phone, HelpCircle, Gift, X,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'

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

        {/* Free badge */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-brand-50 to-teal-50 rounded-xl p-3 border border-brand-100">
            <p className="text-brand-700 font-bold text-xs text-center">
              {isRTL ? '🎁 הסדנה חינמית לחברי קהילה!' : '🎁 Free workshop for members!'}
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
