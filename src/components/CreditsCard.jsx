import React, { useEffect, useState } from 'react'
import { Coins, TrendingUp, CheckCircle, XCircle } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { supabase } from '../lib/supabase.js'

export default function CreditsCard() {
  const { state } = useApp()
  const [credits, setCredits]   = useState(null)
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    if (!state.code) return
    fetchCredits()
  }, [state.code])

  async function fetchCredits() {
    setLoading(true)
    const { data, error } = await supabase
      .from('members_credits')
      .select('credits, is_active')
      .eq('coupon', state.code)
      .maybeSingle()

    if (!error && data) {
      setCredits(data.credits)
      setIsActive(data.is_active)
    }
    setLoading(false)
  }

  if (!state.code || (!loading && credits === null)) return null

  return (
    <div className="mx-auto max-w-lg w-full px-4 pt-4">
      <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10"
        style={{ background: 'linear-gradient(135deg, #0f4c75 0%, #1b6ca8 50%, #0d7377 100%)' }}>

        <div className="px-5 py-4 flex items-center gap-4">

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0 shadow-inner">
            <Coins size={28} className="text-yellow-300" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-white/70 text-xs font-medium mb-0.5">הקרדיטים שלך</p>
            {loading ? (
              <div className="h-8 w-24 bg-white/20 rounded-lg animate-pulse" />
            ) : (
              <p className="text-white font-black text-3xl leading-none">
                {credits?.toLocaleString() ?? 0}
                <span className="text-yellow-300 text-base font-bold mr-1"> קרדיט</span>
              </p>
            )}
            <div className="flex items-center gap-1.5 mt-1.5">
              {isActive ? (
                <>
                  <CheckCircle size={12} className="text-green-400" />
                  <span className="text-green-300 text-xs font-medium">פעיל · צובר 10 קרדיט ביום</span>
                </>
              ) : (
                <>
                  <XCircle size={12} className="text-red-400" />
                  <span className="text-red-300 text-xs font-medium">לא פעיל · עזבת את הקהילה</span>
                </>
              )}
            </div>
          </div>

          {/* Right badge */}
          <div className="flex-shrink-0 text-center">
            <div className="w-12 h-12 rounded-xl bg-yellow-400/20 border border-yellow-400/40
              flex flex-col items-center justify-center">
              <TrendingUp size={16} className="text-yellow-300 mb-0.5" />
              <span className="text-yellow-300 text-xs font-bold">+10</span>
              <span className="text-yellow-200/70 text-[9px]">ליום</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-5 py-2 bg-black/20 flex items-center justify-between">
          <span className="text-white/50 text-xs">
            💡 הקרדיטים ניתנים למימוש על מוצרי הקהילה
          </span>
        </div>
      </div>
    </div>
  )
}
