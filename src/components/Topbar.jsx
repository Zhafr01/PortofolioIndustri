import { Link } from 'react-router-dom'
import { ChevronRight, Home, Menu } from 'lucide-react'

/**
 * Topbar — page header with breadcrumb, hamburger, and optional actions.
 * @param {string}     title
 * @param {Array}      breadcrumb  — [{label, to}]
 * @param {function}   onMenuClick — mobile hamburger callback
 * @param {ReactNode}  actions     — optional right-side slot
 * @param {number}     notifCount  — badge count on bell (unused here, kept for compat)
 */
export default function Topbar({ title, breadcrumb = [], onMenuClick, actions }) {
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
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </header>
  )
}
