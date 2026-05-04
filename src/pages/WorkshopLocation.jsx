import React from 'react'
import { MapPin, Navigation, CalendarPlus, Download } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { translations } from '../translations/translations.js'
import { config } from '../config/config.js'

function generateICS(data) {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dental Chakir//Workshop//HE',
    'BEGIN:VEVENT',
    `UID:${data.uid}`,
    `SUMMARY:${data.summary}`,
    `DESCRIPTION:${data.description}`,
    `LOCATION:${data.location}`,
    `DTSTART:${data.dtstart}`,
    `DTEND:${data.dtend}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return ics
}

function downloadICS() {
  const ics = generateICS(config.workshop.outlookIcsData)
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'workshop-chakir.ics'
  link.click()
  URL.revokeObjectURL(url)
}

export default function WorkshopLocation() {
  const { state } = useApp()
  const tr = translations[state.language]
  const lo = tr.location
  const isRTL = ['he', 'ar'].includes(state.language)

  const address     = isRTL ? config.workshop.address.full : config.workshop.address.fullEn
  const dateDisplay = `${config.workshop.dateDisplay} | ${config.workshop.timeDisplay}`

  return (
    <div className="pt-5 pb-4 animate-fade-in">

      <div className="mb-5">
        <h1 className="section-title">{lo.title}</h1>
        <p className="section-subtitle">{lo.subtitle}</p>
      </div>

      {/* Map placeholder card */}
      <div className="relative bg-gradient-to-br from-brand-50 to-teal-50 rounded-2xl
        overflow-hidden border border-brand-100 mb-5 shadow-sm" style={{ height: 160 }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center shadow-lg">
            <MapPin size={22} className="text-white" />
          </div>
          <p className="text-brand-700 font-semibold text-sm px-4 text-center leading-tight">
            {address}
          </p>
        </div>
        {/* Decorative grid */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#175ab1" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Info card */}
      <div className="card mb-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
            <MapPin size={16} className="text-brand-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">{lo.address}</p>
            <p className="font-semibold text-gray-800 text-sm leading-relaxed">{address}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
            <CalendarPlus size={16} className="text-teal-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">{lo.date}</p>
            <p className="font-semibold text-gray-800 text-sm">{dateDisplay}</p>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <h2 className="font-bold text-brand-900 text-base mb-3">
        {isRTL ? 'ניווט' : 'Navigation'}
      </h2>
      <div className="grid grid-cols-2 gap-3 mb-5">
        <a
          href={config.workshop.wazeLink}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm
            bg-[#31D9F5] text-[#1A1A2E] hover:opacity-90 active:scale-95 transition-all shadow-md"
        >
          <span className="text-lg">🗺️</span>
          <span>{lo.waze}</span>
        </a>
        <a
          href={config.workshop.googleMapsLink}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm
            bg-[#4285F4] text-white hover:opacity-90 active:scale-95 transition-all shadow-md"
        >
          <span className="text-lg">📍</span>
          <span>{lo.gmaps}</span>
        </a>
      </div>

      {/* Calendar buttons */}
      <h2 className="font-bold text-brand-900 text-base mb-3">
        {isRTL ? 'שמור ביומן' : 'Save to Calendar'}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <a
          href={config.workshop.googleCalendarLink}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm
            bg-[#EA4335] text-white hover:opacity-90 active:scale-95 transition-all shadow-md"
        >
          <CalendarPlus size={16} />
          <span>{lo.gcal}</span>
        </a>
        <button
          onClick={downloadICS}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm
            bg-[#0078D4] text-white hover:opacity-90 active:scale-95 transition-all shadow-md"
        >
          <Download size={16} />
          <span>{lo.outlook}</span>
        </button>
      </div>

      <p className="text-center text-gray-400 text-xs mt-4">{lo.mapNote}</p>
    </div>
  )
}
