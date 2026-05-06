import React from 'react'
import { useApp } from '../context/AppContext.jsx'
import Header from '../components/Header.jsx'
import RightSideMenu from '../components/RightSideMenu.jsx'
import CreditsCard from '../components/CreditsCard.jsx'

import ProfilePage          from './ProfilePage.jsx'
import WorkshopDetails      from './WorkshopDetails.jsx'
import WorkshopRegistration from './WorkshopRegistration.jsx'
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
  'about':                 AboutDentalChakir,
  'products':              CommunityProducts,
  'location':              WorkshopLocation,
  'contact':               ContactMeital,
  'faq':                   FAQ,
  'benefits':              CommunityBenefits,
}

export default function DashboardLayout() {
  const { state } = useApp()
  const SectionComponent = SECTIONS[state.currentSection] || WorkshopDetails

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col" style={{ direction: 'inherit' }}>
      <Header showMenu />
      <RightSideMenu />

      <main className="flex-1 pt-[64px] pb-8 max-w-lg mx-auto w-full">
        {state.hasCode && state.currentSection !== 'workshop-registration' && <CreditsCard />}
        <div key={state.currentSection} className="page-enter px-4 pt-4">
          <SectionComponent />
        </div>
      </main>
    </div>
  )
}
