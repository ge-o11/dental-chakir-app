import React, { useEffect, Component } from 'react'
import { AppContext } from '../context/AppContext.jsx'

import LandingPage     from './LandingPage.jsx'
import CodeEntryPage   from './CodeEntryPage.jsx'
import LoginPage       from './LoginPage.jsx'
import DashboardLayout from './DashboardLayout.jsx'

// ─── Phone dimensions & scales ────────────────────────────────────────────────
const PW = 390
const PH = 820

const SC_AUTH = 0.42
const SC_HUB  = 0.45
const SC_SEC  = 0.37

// ─── Colours ──────────────────────────────────────────────────────────────────
const ARROW      = '#175ab1'
const CANVAS     = '#dde5f0'
const BADGE_GRAD = 'linear-gradient(135deg,#175ab1 0%,#0d9488 100%)'

// ─── Error boundary (catches component crashes per-preview) ───────────────────
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { err: null } }
  static getDerivedStateFromError(e) { return { err: e.message || String(e) } }
  render() {
    if (this.state.err) return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '100%', background: '#fef2f2',
        gap: 8, padding: 16, textAlign: 'center',
      }}>
        <span style={{ fontSize: 24 }}>⚠️</span>
        <span style={{ fontSize: 10, color: '#ef4444' }}>{this.state.err}</span>
      </div>
    )
    return this.props.children
  }
}

// ─── Mock context ─────────────────────────────────────────────────────────────
const NOOP = () => {}
const MOCK_ACTIONS = {
  setLanguage: NOOP, toggleMenu: NOOP, closeMenu: NOOP,
  setPage:     NOOP, setSection: NOOP, validateCode: NOOP,
  skipCode:    NOOP, login:      NOOP, logout:       NOOP,
  setUserName: NOOP,
}

function MockProvider({ state, children }) {
  return (
    <AppContext.Provider value={{ state, actions: MOCK_ACTIONS }}>
      {children}
    </AppContext.Provider>
  )
}

// ─── Phone shell + scaled render ──────────────────────────────────────────────
function Phone({ state, children, sc }) {
  const vw = Math.round(PW * sc)
  const vh = Math.round(PH * sc)
  const b  = 9

  return (
    <div style={{
      width:        vw + b * 2,
      height:       vh + b * 2,
      background:   '#101c2e',
      borderRadius: Math.round(28 * sc),
      padding:      b,
      boxShadow:    '0 20px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)',
      position:     'relative',
      flexShrink:   0,
    }}>
      {/* Notch */}
      <div style={{
        position:     'absolute',
        top:          b + 4,
        left:         '50%',
        transform:    'translateX(-50%)',
        width:        Math.round(54 * sc),
        height:       Math.round(10 * sc),
        background:   '#080f1a',
        borderRadius: 6,
        zIndex:       999,
        pointerEvents:'none',
      }} />

      {/* Screen clip */}
      <div style={{
        width:        vw,
        height:       vh,
        borderRadius: Math.round(20 * sc),
        overflow:     'hidden',
        position:     'relative',
      }}>
        {/* transform:scale makes position:fixed children use this div as their
            containing block — so the sticky Header appears at the top of each
            phone preview instead of attaching to the viewport */}
        <div style={{
          position:        'absolute',
          top:             0,
          left:            0,
          width:           PW,
          height:          PH,
          transform:       `scale(${sc})`,
          transformOrigin: 'top left',
          pointerEvents:   'none',
        }}>
          <MockProvider state={state}>
            <ErrorBoundary>
              <div style={{ width: PW, height: PH, overflow: 'hidden' }}>
                {children}
              </div>
            </ErrorBoundary>
          </MockProvider>
        </div>
      </div>
    </div>
  )
}

// ─── Arrow / connector components ─────────────────────────────────────────────
function Chip({ children }) {
  return (
    <div style={{
      background:   '#eef9ff',
      border:       '1px solid #bce8ff',
      borderRadius: 8,
      padding:      '3px 10px',
      fontSize:     10,
      color:        '#156fdb',
      fontWeight:   600,
      whiteSpace:   'nowrap',
      direction:    'rtl',
    }}>{children}</div>
  )
}

function ArrowRight({ label }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5, padding:'0 8px' }}>
      {label && <Chip>{label}</Chip>}
      <div style={{ display:'flex', alignItems:'center' }}>
        <div style={{ width:40, height:2.5, background:ARROW, borderRadius:2 }} />
        <div style={{ width:0, height:0,
          borderTop:'6px solid transparent', borderBottom:'6px solid transparent',
          borderLeft:`10px solid ${ARROW}` }} />
      </div>
    </div>
  )
}

function ArrowDown({ label, h = 52 }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5, padding:'2px 0' }}>
      <div style={{ width:2.5, height:h/2, background:ARROW, borderRadius:2 }} />
      {label && <Chip>{label}</Chip>}
      <div style={{ width:2.5, height:h/2, background:ARROW, borderRadius:2 }} />
      <div style={{ width:0, height:0,
        borderLeft:'6px solid transparent', borderRight:'6px solid transparent',
        borderTop:`10px solid ${ARROW}` }} />
    </div>
  )
}

// Fan from centre-of-hub down to 3 column centres of the section grid
function FanToGrid({ gridW, colW, colGap }) {
  const nCols = 3
  const stemH = 36
  const armH  = 28

  // x-centres of the 3 columns relative to the SVG left edge
  const centres = Array.from({ length: nCols }, (_, i) =>
    i * (colW + colGap) + colW / 2
  )
  const midX = gridW / 2

  return (
    <svg
      width={gridW}
      height={stemH + armH + 10}
      style={{ display:'block', overflow:'visible', flexShrink:0 }}
    >
      {/* Stem from hub down */}
      <line x1={midX} y1={0} x2={midX} y2={stemH}
        stroke={ARROW} strokeWidth={2.5} strokeLinecap="round" />
      {/* Horizontal bar across 3 column centres */}
      <line x1={centres[0]} y1={stemH} x2={centres[2]} y2={stemH}
        stroke={ARROW} strokeWidth={2.5} strokeLinecap="round" />
      {/* Arms down to each column */}
      {centres.map((cx, i) => (
        <g key={i}>
          <line x1={cx} y1={stemH} x2={cx} y2={stemH + armH}
            stroke={ARROW} strokeWidth={2} strokeLinecap="round" />
          <polygon
            points={`${cx-5},${stemH+armH} ${cx+5},${stemH+armH} ${cx},${stemH+armH+8}`}
            fill={ARROW}
          />
        </g>
      ))}
    </svg>
  )
}

// ─── Screen node ──────────────────────────────────────────────────────────────
function Node({ name, route, desc, state, children, sc }) {
  const [hov, setHov] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           10,
        transform:     hov ? 'translateY(-4px)' : 'none',
        transition:    'transform 0.2s ease',
      }}
    >
      <Phone state={state} sc={sc}>{children}</Phone>

      <div style={{
        background:   'white',
        borderRadius: 12,
        padding:      '8px 12px',
        textAlign:    'center',
        boxShadow:    hov ? '0 6px 20px rgba(21,111,219,0.2)' : '0 2px 8px rgba(0,0,0,0.08)',
        border:       `1px solid ${hov ? '#bce8ff' : '#d9f1ff'}`,
        transition:   'all 0.2s ease',
        maxWidth:     Math.round(PW * sc) + 18,
      }}>
        <div style={{ fontWeight:700, fontSize:13, color:'#194d8b', lineHeight:1.2 }}>{name}</div>
        {route && (
          <code style={{
            display:'block', marginTop:3, fontSize:10, color:'#156fdb',
            direction:'ltr', background:'#eef9ff', borderRadius:4, padding:'1px 6px',
          }}>{route}</code>
        )}
        {desc && (
          <div style={{ marginTop:4, fontSize:10.5, color:'#64748b', lineHeight:1.45, direction:'rtl' }}>{desc}</div>
        )}
      </div>
    </div>
  )
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ emoji, title, sub }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, marginBottom:28 }}>
      <div style={{
        background:   BADGE_GRAD,
        color:        'white',
        fontWeight:   800,
        fontSize:     16,
        borderRadius: 12,
        padding:      '8px 22px',
        direction:    'rtl',
        letterSpacing:'-0.3px',
      }}>
        {emoji} {title}
      </div>
      {sub && <div style={{ fontSize:12, color:'#64748b', direction:'rtl' }}>{sub}</div>}
    </div>
  )
}

function Divider() {
  return (
    <div style={{
      width:'80%', maxWidth:900, height:1,
      background:'rgba(21,111,219,0.12)', margin:'8px auto',
    }} />
  )
}

// ─── Preset mock states ───────────────────────────────────────────────────────
const S0 = {
  language:'he', currentPage:'landing', currentSection:'workshop-details',
  menuOpen:false, code:'', codeValidated:false, hasCode:false, user:null,
}

const DASH = {
  language:'he', currentPage:'dashboard', currentSection:'workshop-details',
  menuOpen:false, code:'CODE123', codeValidated:true, hasCode:true,
  user:{ phone:'0521234567', name:'ד״ר ישראל ישראלי', isLoggedIn:true },
}

// ─── Dashboard section nodes ──────────────────────────────────────────────────
const SECTIONS = [
  { name:'פרופיל',         route:'dashboard → profile',               desc:'פרטי משתמש, קרדיטים וסטטוס חברות',   sec:'profile' },
  { name:'פרטי הסדנה',    route:'dashboard → workshop-details',      desc:'מחיר, תאריך, מה תלמד',               sec:'workshop-details' },
  { name:'הרשמה לסדנה',   route:'dashboard → workshop-registration', desc:'טופס הרשמה מלא לסדנה',               sec:'workshop-registration' },
  { name:'מיקום הסדנה',   route:'dashboard → location',              desc:'מפה, ניווט ויצוא ליומן',             sec:'location' },
  { name:'אודות',          route:'dashboard → about',                 desc:'מידע על דנטל צ׳אקיר',               sec:'about' },
  { name:'מוצרים',         route:'dashboard → products',              desc:'מוצרי AI בהנחת חברות',               sec:'products' },
  { name:'הטבות חברות',   route:'dashboard → benefits',              desc:'כל הטבות חברות הקהילה',             sec:'benefits' },
  { name:'יצירת קשר',     route:'dashboard → contact',               desc:'פנייה למיטל · סטטוס זמינות',         sec:'contact' },
  { name:'שאלות נפוצות',  route:'dashboard → faq',                   desc:'אקורדיון שאלות ותשובות',            sec:'faq' },
]

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ScreenMap() {
  const SEC_VW  = Math.round(PW * SC_SEC)
  const SHELL_B = 9
  const COL_W   = SEC_VW + SHELL_B * 2   // phone frame total width
  const COL_GAP = 36
  const GRID_W  = 3 * COL_W + 2 * COL_GAP

  useEffect(() => {
    // Set RTL so Tailwind direction-aware utilities work inside phone previews
    document.documentElement.dir  = 'rtl'
    document.documentElement.lang = 'he'

    const el = document.createElement('style')
    el.id = 'sm-print'
    el.textContent = `
      @media print {
        @page { size: A2 landscape; margin: 6mm; }
        body { background: #dde5f0 !important; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        #sm-hdr { position: static !important; box-shadow: none !important; }
        #sm-pdf, #sm-back { display: none !important; }
      }
    `
    document.head.appendChild(el)
    return () => el.remove()
  }, [])

  return (
    <div style={{ minHeight:'100vh', background:CANVAS, fontFamily:'Heebo, Rubik, system-ui, sans-serif' }}>

      {/* ── Sticky header ── */}
      <div id="sm-hdr" style={{
        background:  BADGE_GRAD,
        padding:     '16px 28px',
        position:    'sticky', top:0, zIndex:100,
        boxShadow:   '0 2px 20px rgba(21,111,219,0.35)',
      }}>
        <div style={{ maxWidth:1600, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16, flexWrap:'wrap' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:26 }}>🦷</span>
            <div>
              <div style={{ color:'white', fontWeight:800, fontSize:20, direction:'rtl' }}>תרשים זרימה · מפת מסכים</div>
              <div style={{ color:'rgba(255,255,255,0.65)', fontSize:12 }}>כל מסכי האפליקציה עם זרימת הניווט · דנטל צ׳אקיר AI</div>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
            <span style={{ background:'rgba(255,255,255,0.18)', borderRadius:20, padding:'5px 14px', color:'white', fontSize:13, fontWeight:600 }}>13 מסכים</span>
            <button id="sm-pdf" onClick={() => window.print()}
              style={{ background:'white', border:'none', borderRadius:10, padding:'7px 18px', color:'#156fdb', fontSize:13, fontFamily:'Heebo,sans-serif', fontWeight:700, cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.15)' }}>
              ⬇ הורד כ-PDF
            </button>
            <a id="sm-back" href="/"
              style={{ background:'rgba(255,255,255,0.18)', borderRadius:10, padding:'6px 16px', color:'white', fontSize:13, fontWeight:600, textDecoration:'none', border:'1px solid rgba(255,255,255,0.3)' }}>
              ← חזרה
            </a>
          </div>
        </div>
      </div>

      {/* ── Scrollable canvas ── */}
      <div style={{ overflowX:'auto', overflowY:'visible' }}>
        <div style={{ minWidth:1100, padding:'48px 60px 72px', display:'flex', flexDirection:'column', alignItems:'center', gap:0 }}>

          {/* ════════ 1. AUTH FLOW ════════ */}
          <SectionHeader emoji="①" title="זרימת כניסה" sub="המשתמש עובר בין שלושת המסכים האלה לפני שנכנס לאפליקציה" />

          <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>

            <Node name="דף הבית" route="/" desc="מסך ראשי · לוגו · CTA"
              state={S0} sc={SC_AUTH}>
              <LandingPage />
            </Node>

            <ArrowRight label="לחיצה על כניסה לסדנה" />

            <Node name="הזנת קוד" route="/code-entry" desc="אימות קוד גישה · דילוג אפשרי"
              state={{ ...S0, currentPage:'code-entry' }} sc={SC_AUTH}>
              <CodeEntryPage />
            </Node>

            <ArrowRight label="לאחר הזנה / דילוג" />

            <Node name="כניסה" route="/login" desc="טלפון + סיסמה · הרשמה אוטומטית"
              state={{ ...S0, currentPage:'login', code:'CODE123', codeValidated:true }} sc={SC_AUTH}>
              <LoginPage />
            </Node>

          </div>

          {/* ▼ auth → dashboard */}
          <ArrowDown label="כניסה מוצלחת" h={64} />

          <Divider />

          {/* ════════ 2. DASHBOARD HUB ════════ */}
          <SectionHeader emoji="②" title="לוח הבקרה — מרכז הניווט" sub="לאחר הכניסה המשתמש מגיע לכאן. מפה ניתן לנווט לכל מסך." />

          <Node
            name="לוח הבקרה + תפריט פתוח"
            route="/dashboard"
            desc="מסגרת ראשית עם תפריט ניווט פתוח"
            state={{ ...DASH, menuOpen:true }}
            sc={SC_HUB}
          >
            <DashboardLayout />
          </Node>

          {/* ▼ fan connector → 3 columns of sections */}
          <div style={{ marginTop:14, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
            <Chip>בחירה דרך תפריט הניווט</Chip>
            <FanToGrid gridW={GRID_W} colW={COL_W} colGap={COL_GAP} />
          </div>

          <Divider />

          {/* ════════ 3. DASHBOARD SECTIONS ════════ */}
          <SectionHeader emoji="③" title="מסכי לוח הבקרה — 9 מסכים" sub="כל אחד מהמסכים הבאים נגיש דרך תפריט הניווט" />

          <div style={{
            display:             'grid',
            gridTemplateColumns: `repeat(3, ${COL_W}px)`,
            gap:                 `${COL_GAP}px`,
          }}>
            {SECTIONS.map(({ name, route, desc, sec }) => (
              <Node
                key={sec}
                name={name}
                route={route}
                desc={desc}
                state={{ ...DASH, currentSection:sec, menuOpen:false }}
                sc={SC_SEC}
              >
                <DashboardLayout />
              </Node>
            ))}
          </div>

          {/* Footer */}
          <div style={{ marginTop:52, color:'#8898aa', fontSize:11, direction:'rtl', textAlign:'center' }}>
            תרשים זרימה · דנטל צ׳אקיר AI · 13 מסכים · /screen-map
          </div>

        </div>
      </div>
    </div>
  )
}
