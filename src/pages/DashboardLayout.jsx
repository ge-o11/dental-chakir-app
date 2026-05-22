import React, { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import Header from '../components/Header.jsx'
import RightSideMenu from '../components/RightSideMenu.jsx'
import CreditsCard from '../components/CreditsCard.jsx'

import ProfilePage          from './ProfilePage.jsx'
import WorkshopDetails      from './WorkshopDetails.jsx'
import WorkshopRegistration from './WorkshopRegistration.jsx'
import MyWorkshops          from './MyWorkshops.jsx'
import AboutDentalChakir    from './AboutDentalChakir.jsx'
import CommunityProducts    from './CommunityProducts.jsx'
import WorkshopLocation     from './WorkshopLocation.jsx'
import ContactMeital        from './ContactMeital.jsx'
import FAQ                  from './FAQ.jsx'
import CommunityBenefits    from './CommunityBenefits.jsx'

const SECTIONS = {
  'profile':               ProfilePage,
  'workshop-details':      WorkshopDetails,
  'workshop-registration': WorkshopRegistration,
  'my-workshops':          MyWorkshops,
  'about':                 AboutDentalChakir,
  'products':              CommunityProducts,
  'location':              WorkshopLocation,
  'contact':               ContactMeital,
  'faq':                   FAQ,
  'benefits':              CommunityBenefits,
}

// ── Registration success overlay (5 s, then fades out) ──────────────────────
function RegistrationToast() {
  const { state, actions } = useApp()
  const [progress, setProgress] = useState(100)
  const [visible,  setVisible]  = useState(false)

  useEffect(() => {
    if (!state.notification) { setVisible(false); return }
    setProgress(100)
    setVisible(true)

    const DURATION = 5000
    const TICK     = 50
    let elapsed    = 0

    const interval = setInterval(() => {
      elapsed += TICK
      setProgress(Math.max(0, 100 - (elapsed / DURATION) * 100))
    }, TICK)

    const timeout = setTimeout(() => {
      setVisible(false)
      setTimeout(() => actions.clearNotification(), 400) // wait for fade-out
    }, DURATION)

    return () => { clearInterval(interval); clearTimeout(timeout) }
  }, [state.notification])

  if (!state.notification) return null

  const name = state.notification.name

  return (
    <div
      onClick={() => { setVisible(false); setTimeout(() => actions.clearNotification(), 300) }}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         200,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        background:     'rgba(10,20,40,0.72)',
        backdropFilter: 'blur(6px)',
        opacity:        visible ? 1 : 0,
        transition:     'opacity 0.4s ease',
        cursor:         'pointer',
        direction:      'rtl',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background:   'linear-gradient(145deg,#0f2744 0%,#0d5c55 100%)',
          borderRadius: 28,
          padding:      '36px 32px 28px',
          maxWidth:     340,
          width:        '90%',
          textAlign:    'center',
          boxShadow:    '0 32px 80px rgba(0,0,0,0.6)',
          border:       '1px solid rgba(255,255,255,0.1)',
          transform:    visible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(16px)',
          transition:   'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          cursor:       'default',
        }}
      >
        {/* Checkmark */}
        <div style={{
          width:        80,
          height:       80,
          borderRadius: '50%',
          background:   'linear-gradient(135deg,#22c55e,#16a34a)',
          display:      'flex',
          alignItems:   'center',
          justifyContent:'center',
          margin:       '0 auto 20px',
          boxShadow:    '0 8px 32px rgba(34,197,94,0.45)',
          fontSize:     38,
        }}>
          ✓
        </div>

        {/* Title */}
        <p style={{ color:'white', fontWeight:900, fontSize:22, marginBottom:8, lineHeight:1.2 }}>
          {state.notification?.alreadyRegistered ? '📋 כבר רשום לסדנה!' : '🎉 נרשמת לסדנה בהצלחה!'}
        </p>

        {/* Subtitle */}
        <p style={{ color:'rgba(255,255,255,0.7)', fontSize:14, marginBottom:20, lineHeight:1.7 }}>
          דוקטור {name}<br />נשמח לראות אותך בסדנה
        </p>

        {/* "Background is ready" hint */}
        <p style={{
          color:        'rgba(255,255,255,0.45)',
          fontSize:     12,
          marginBottom: 20,
          display:      'flex',
          alignItems:   'center',
          justifyContent:'center',
          gap:          6,
        }}>
          <span>📋</span> פרטי הסדנה מוכנים ברקע
        </p>

        {/* Progress bar */}
        <div style={{
          height:       4,
          borderRadius: 4,
          background:   'rgba(255,255,255,0.12)',
          overflow:     'hidden',
        }}>
          <div style={{
            height:     '100%',
            borderRadius: 4,
            background: 'linear-gradient(90deg,#22c55e,#14b8a6)',
            width:      `${progress}%`,
            transition: 'width 0.05s linear',
          }} />
        </div>

        <p style={{ color:'rgba(255,255,255,0.3)', fontSize:11, marginTop:10 }}>
          לחץ בכל מקום לסגירה
        </p>
      </div>
    </div>
  )
}

export default function DashboardLayout() {
  const { state } = useApp()
  const SectionComponent = SECTIONS[state.currentSection] || WorkshopDetails

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col" style={{ direction: 'inherit' }}>
      <Header showMenu />
      <RightSideMenu />
      <RegistrationToast />

      <main className="flex-1 pt-[64px] pb-8 max-w-lg mx-auto w-full pr-[52px]">
        {state.user?.isLoggedIn && state.currentSection !== 'workshop-registration' && <CreditsCard />}
        <div key={state.currentSection} className="page-enter px-4 pt-4">
          <SectionComponent />
        </div>
      </main>
    </div>
  )
}
