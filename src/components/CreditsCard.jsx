import React, { useEffect, useState } from 'react'
import { Coins, CheckCircle, XCircle } from 'lucide-react'
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
      .select('credits, is_active, days_active')
      .eq('coupon', state.code)
      .maybeSingle()
      .then(({ data: row }) => {
        setData(row || { credits: 0, is_active: false, days_active: 0 })
        setLoading(false)
      })
  }, [state.code])

  if (!state.code) return null

  const credits    = data?.credits    ?? 0
  const isActive   = data?.is_active  ?? false
  const daysActive = data?.days_active ?? 0

  return (
    <div className="mx-auto max-w-lg w-full px-4 pt-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Thin accent line on top */}
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #0d7377, #1b6ca8)' }} />

        <div className="px-4 py-3 flex items-center gap-3">

          {/* Icon */}
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #e8f4f8 0%, #d4edda 100%)' }}>
            <Coins size={17} style={{ color: '#0d7377' }} />
          </div>

          {/* Label + details */}
          <div className="flex-1 min-w-0">
            <p className="text-gray-400 text-[11px] leading-none mb-0.5">הקרדיטים שלך</p>
            {loading ? (
              <div className="h-5 w-24 bg-gray-100 rounded animate-pulse mt-1" />
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-gray-800" style={{ fontSize: '1.15rem' }}>
                  {credits.toLocaleString('he-IL')}
                </span>
                <span className="text-xs font-medium" style={{ color: '#0d7377' }}>קרדיט</span>
              </div>
            )}
            {!loading && (
              <p className="text-gray-400 text-[10px] mt-0.5">
                {daysActive} ימים · +10 ביום · 🎁 100 בונוס הצטרפות
              </p>
            )}
          </div>

          {/* Status badge */}
          {loading ? (
            <div className="h-5 w-14 bg-gray-100 rounded-full animate-pulse" />
          ) : isActive ? (
            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5 flex-shrink-0">
              <CheckCircle size={10} className="text-emerald-500" />
              <span className="text-emerald-600 text-[10px] font-semibold">פעיל</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-red-50 border border-red-100 rounded-full px-2 py-0.5 flex-shrink-0">
              <XCircle size={10} className="text-red-400" />
              <span className="text-red-500 text-[10px] font-semibold">לא פעיל</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
