/**
 * StatBlock — compact KPI card with accent left-border.
 * @param {string}     label
 * @param {string|number} value
 * @param {string}     sub     — small subscript text
 * @param {string}     color   — 'default'|'red'|'amber'|'green'|'teal'
 * @param {ReactNode}  children — optional content below value (e.g. AnimatedBar)
 */
export default function StatBlock({ label, value, sub, color = 'default', children }) {
  const accentBorder = {
    default: 'border-l-slate-300',
    red:     'border-l-red-400',
    amber:   'border-l-amber-400',
    green:   'border-l-emerald-400',
    teal:    'border-l-teal-500',
  }[color] ?? 'border-l-slate-300'

  const valueColor = {
    default: 'text-slate-900',
    red:     'text-red-600',
    amber:   'text-amber-600',
    green:   'text-emerald-600',
    teal:    'text-teal-600',
  }[color] ?? 'text-slate-900'

  return (
    <div className={`bg-white border border-slate-200 border-l-4 ${accentBorder} rounded-lg p-5 shadow-sm flex flex-col gap-1`}>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{label}</span>
      {value !== undefined && (
        <span className={`font-display text-3xl leading-none ${valueColor}`}>{value}</span>
      )}
      {children && <div className="mt-1.5">{children}</div>}
      {sub && <span className="text-xs text-slate-400 mt-0.5">{sub}</span>}
    </div>
  )
}
