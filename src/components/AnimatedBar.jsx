import { useEffect, useState } from 'react'

/**
 * AnimatedBar — fills from 0 to `value` on mount.
 * @param {number} value  — 0-100
 * @param {string} color  — tailwind bg class or 'teal'|'amber'|'red'
 */
export default function AnimatedBar({ value = 0, color = 'teal' }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 60)
    return () => clearTimeout(t)
  }, [value])

  const colorMap = {
    teal: 'bg-teal-600',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    green: 'bg-emerald-500',
    blue: 'bg-blue-500',
  }
  const bgClass = colorMap[color] ?? colorMap.teal

  return (
    <div className="bar-track">
      <div
        className={`bar-fill ${bgClass}`}
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
