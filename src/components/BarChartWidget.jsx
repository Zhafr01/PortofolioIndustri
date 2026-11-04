import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell
} from 'recharts'

export default function BarChartWidget({ data = [], color = '#0D9488', title, layout = 'horizontal' }) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-6">
      {title && <p className="text-sm font-semibold text-slate-900 mb-4">{title}</p>}
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 4, right: 8, left: layout === 'vertical' ? 80 : -8, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          {layout === 'vertical' ? (
            <>
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} width={80} />
            </>
          ) : (
            <>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            </>
          )}
          <Tooltip
            contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 4, fontSize: 12 }}
          />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} animationDuration={1000}>
            {data.map((_, i) => <Cell key={i} fill={color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

