import React, { useEffect, useState } from 'react'
import { Coins, Star, TrendingUp, CheckCircle, XCircle, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { supabase } from '../lib/supabase.js'

export default function CreditsCard() {
  const { state } = useApp()
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!state.code) return
    setLoading(true)
    supabase
      .from('members_credits')
      .select('credits, is_active, name, days_active')
      .eq('coupon', state.code)
      .maybeSingle()
      .then(({ data: row }) => {
        setData(row || { credits: 0, is_active: false, name: null, days_active: 0 })
        setLoading(false)
      })
  }, [state.code])

  if (!state.code) return null

  const credits    = data?.credits    ?? 0
  const isActive   = data?.is_active  ?? false
  const name       = data?.name       ?? null
  const daysActive = data?.days_active ?? 0

  return (
    <div className="mx-auto max-w-lg w-full px-4 pt-4">
      <div
        className="rounded-3xl overflow-hidden shadow-xl relative"
        style={{ background: 'linear-gradient(135deg, #0a2540 0%, #0f4c75 40%, #0d7377 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #4ECDC4 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        {/* Main content */}
        <div className="relative px-5 pt-5 pb-4">

          {/* Top row: icon + status badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' }}>
                <Coins size={24} className="text-white drop-shadow" />
              </div>
              <div>
                <p className="text-white/60 text-xs leading-none mb-0.5">מערכת קרדיטים</p>
                <p className="text-white text-sm font-bold leading-none">דנטל צ'אקיר</p>
              </div>
            </div>

            {loading ? (
              <div className="h-6 w-20 bg-white/15 rounded-full animate-pulse" />
            ) : isActive ? (
              <div className="flex items-center gap-1 bg-green-500/20 border border-green-400/30 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-300 text-xs font-semibold">פעיל</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-red-500/20 border border-red-400/30 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-red-300 text-xs font-semibold">לא פעיל</span>
              </div>
            )}
          </div>

          {/* Credits number */}
          <div className="mb-4">
            <p className="text-white/50 text-xs mb-1">הקרדיטים שלך</p>
            {loading ? (
              <div className="h-12 w-36 bg-white/15 rounded-xl animate-pulse" />
            ) : (
              <div className="flex items-end gap-2">
                <p className="text-white font-black leading-none"
                  style={{ fontSize: '3.2rem' }}>
                  {credits.toLocaleString('he-IL')}
                </p>
                <span className="text-yellow-300 font-bold text-lg mb-1">קרדיט</span>
              </div>
            )}
          </div>

          {/* Bottom row: days + rate */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!loading && (
                <div className="flex items-center gap-1.5">
                  <Star size={13} className="text-yellow-400" fill="currentColor" />
                  <span className="text-white/60 text-xs">
                    {daysActive} ימים בקהילה
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 bg-yellow-400/15 border border-yellow-400/25 rounded-xl px-3 py-1.5">
                <TrendingUp size={13} className="text-yellow-300" />
                <span className="text-yellow-200 text-xs font-bold">+10 קרדיט / יום</span>
              </div>
              <span className="text-white/40 text-[10px]">🎁 +100 בונוס הצטרפות</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative px-5 py-2.5 flex items-center justify-between"
          style={{ background: 'rgba(0,0,0,0.25)' }}>
          {loading ? (
            <div className="h-4 w-48 bg-white/15 rounded animate-pulse" />
          ) : isActive ? (
            <div className="flex items-center gap-1.5">
              <CheckCircle size={13} className="text-green-400" />
              <span className="text-green-300 text-xs font-medium">צובר קרדיטים כל יום שאתה בקהילה</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <XCircle size={13} className="text-red-400" />
              <span className="text-red-300 text-xs font-medium">יצאת מהקהילה · הצבירה הופסקה</span>
            </div>
          )}
          <Sparkles size={13} className="text-white/30 flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}
