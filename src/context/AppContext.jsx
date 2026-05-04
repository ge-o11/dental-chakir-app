import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { config } from '../config/config.js'

const AppContext = createContext(null)

const STORAGE_KEYS = {
  USER:     'chakir_user',
  LANGUAGE: 'chakir_lang',
  SESSION:  'chakir_session',
}

const storage = {
  get:    (k) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null } catch { return null } },
  set:    (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} },
  remove: (k) => { try { localStorage.removeItem(k) } catch {} },
}

function loadInitialState() {
  const savedLang    = storage.get(STORAGE_KEYS.LANGUAGE)
  const savedSession = storage.get(STORAGE_KEYS.SESSION)
  const savedUser    = storage.get(STORAGE_KEYS.USER)

  return {
    language:       savedLang || config.defaultLanguage,
    currentPage:    savedSession?.isLoggedIn ? 'dashboard' : 'landing',
    currentSection: savedSession?.lastSection || 'workshop-details',
    menuOpen:       false,
    code:           savedSession?.code    || '',
    codeValidated:  savedSession?.codeValidated || false,
    hasCode:        savedSession?.hasCode || false,   // true = entered with coupon, workshop is free
    user:           savedUser || null,
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }

    case 'SET_PAGE':
      return { ...state, currentPage: action.payload, menuOpen: false }

    case 'SET_SECTION':
      return { ...state, currentSection: action.payload, menuOpen: false }

    case 'TOGGLE_MENU':
      return { ...state, menuOpen: !state.menuOpen }

    case 'CLOSE_MENU':
      return { ...state, menuOpen: false }

    case 'VALIDATE_CODE':
      return { ...state, code: action.payload, codeValidated: true, hasCode: true }

    case 'SKIP_CODE':
      // Enter without coupon — goes straight to login, no free benefit
      return { ...state, code: '', codeValidated: false, hasCode: false, currentPage: 'login' }

    case 'LOGIN':
      return {
        ...state,
        user: { ...action.payload, isLoggedIn: true },
        currentPage: 'dashboard',
        currentSection: 'workshop-registration',
        menuOpen: false,
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        code: '',
        codeValidated: false,
        hasCode: false,
        currentPage: 'landing',
        menuOpen: false,
      }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadInitialState)

  // Persist language
  useEffect(() => {
    storage.set(STORAGE_KEYS.LANGUAGE, state.language)
    document.documentElement.lang = state.language
    document.documentElement.dir  = ['he', 'ar'].includes(state.language) ? 'rtl' : 'ltr'
  }, [state.language])

  // Persist session
  useEffect(() => {
    if (state.codeValidated || state.user?.isLoggedIn) {
      storage.set(STORAGE_KEYS.SESSION, {
        code:          state.code,
        codeValidated: state.codeValidated,
        hasCode:       state.hasCode,
        isLoggedIn:    state.user?.isLoggedIn || false,
        lastSection:   state.currentSection,
      })
    }
  }, [state.code, state.codeValidated, state.hasCode, state.user, state.currentSection])

  // Persist user
  useEffect(() => {
    if (state.user) {
      storage.set(STORAGE_KEYS.USER, state.user)
    } else {
      storage.remove(STORAGE_KEYS.USER)
      storage.remove(STORAGE_KEYS.SESSION)
    }
  }, [state.user])

  const actions = {
    setLanguage:     (lang)    => dispatch({ type: 'SET_LANGUAGE', payload: lang }),
    setPage:         (page)    => dispatch({ type: 'SET_PAGE',     payload: page }),
    setSection:      (section) => dispatch({ type: 'SET_SECTION',  payload: section }),
    toggleMenu:      ()        => dispatch({ type: 'TOGGLE_MENU' }),
    closeMenu:       ()        => dispatch({ type: 'CLOSE_MENU' }),
    validateCode:    (code)    => dispatch({ type: 'VALIDATE_CODE', payload: code }),
    skipCode:        ()        => dispatch({ type: 'SKIP_CODE' }),
    login:           (userData)=> dispatch({ type: 'LOGIN',        payload: userData }),
    logout:          ()        => dispatch({ type: 'LOGOUT' }),
  }

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}

export { storage, STORAGE_KEYS }
