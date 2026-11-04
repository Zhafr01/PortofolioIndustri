import {
  ResponsiveContainer, XAxis, YAxis,
  CartesianGrid, Tooltip, Area, AreaChart
} from 'recharts'

export default function LineChartWidget({ data = [], color = '#0D9488', title, yLabel, subtitle }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      {title && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      )}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.12} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 11, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
            label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', fontSize: 10, fill: '#94A3B8' } : undefined}
          />
          <Tooltip
            contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            labelStyle={{ color: '#1E293B', fontWeight: 600 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill="url(#lineAreaGrad)"
            dot={false}
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
