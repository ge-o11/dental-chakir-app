import React, { useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext.jsx'
import { translations } from './translations/translations.js'

import LandingPage      from './pages/LandingPage.jsx'
import CodeEntryPage    from './pages/CodeEntryPage.jsx'
import LoginPage        from './pages/LoginPage.jsx'
import DashboardLayout  from './pages/DashboardLayout.jsx'

function Router() {
  const { state } = useApp()
  const tr = translations[state.language]

  // Sync dir on language change
  useEffect(() => {
    document.documentElement.dir  = tr.dir
    document.documentElement.lang = state.language
  }, [state.language, tr.dir])

  switch (state.currentPage) {
    case 'code-entry': return <CodeEntryPage />
    case 'login':      return <LoginPage />
    case 'dashboard':  return <DashboardLayout />
    default:           return <LandingPage />
  }
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}
