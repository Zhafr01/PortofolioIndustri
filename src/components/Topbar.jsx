import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home, Menu, Bell, Check, ExternalLink, X } from 'lucide-react'

const initialNotifs = [
  { id: 1, title: 'Anomali Sensor Getaran', desc: 'Roller Coaster Alpha mencatat 5.1g', time: '5 mnt lalu', unread: true, link: '/alerts' },
  { id: 2, title: 'Proposal Ekspansi Baru', desc: 'Jatim Park 3 mengajukan proposal Q4', time: '1 jam lalu', unread: true, link: '/expansion-approval' },
  { id: 3, title: 'Kepadatan Smart Gate', desc: 'Pintu Masuk B melebihi 85% kapasitas', time: '2 jam lalu', unread: false, link: '/e-monitoring' },
]

export default function Topbar({ title, breadcrumb = [], onMenuClick, actions, notifCount = 2 }) {
  const [showNotif, setShowNotif] = useState(false)
  const [notifs, setNotifs] = useState(initialNotifs)
  const notifRef = useRef(null)

  const unreadCount = notifs.filter(n => n.unread).length

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })))
  }

  return (
    <header className="bg-white border-b border-slate-100 px-5 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition-colors flex-shrink-0"
            aria-label="Buka menu"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="min-w-0">
          {breadcrumb.length > 0 && (
            <nav className="flex items-center gap-1 text-xs text-slate-400 mb-0.5">
              <Link to="/" className="hover:text-teal-600 flex items-center gap-1 transition-colors">
                <Home size={11} />
              </Link>
              {breadcrumb.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  <ChevronRight size={11} className="text-slate-300" />
                  {crumb.to
                    ? <Link to={crumb.to} className="hover:text-teal-600 transition-colors">{crumb.label}</Link>
                    : <span className="text-slate-600 font-medium">{crumb.label}</span>}
                </span>
              ))}
            </nav>
          )}
          <h1 className="font-display text-xl text-slate-900 leading-tight truncate">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {actions}

        {/* Real Working Notification Center */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotif(v => !v)}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md relative transition-colors"
            aria-label="Notifikasi sistem"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Pemberitahuan</p>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-semibold">
                      {unreadCount} Baru
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                  >
                    <Check size={12} /> Tandai Dibaca
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifs.map(n => (
                  <Link
                    key={n.id}
                    to={n.link}
                    onClick={() => setShowNotif(false)}
                    className={`block px-4 py-3 hover:bg-slate-50 transition-colors ${
                      n.unread ? 'bg-teal-50/40' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-0.5">
                      <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">{n.desc}</p>
                  </Link>
                ))}
              </div>

              <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                <Link
                  to="/alerts"
                  onClick={() => setShowNotif(false)}
                  className="text-xs text-teal-600 hover:text-teal-700 font-semibold inline-flex items-center gap-1"
                >
                  Lihat Semua Alert <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
