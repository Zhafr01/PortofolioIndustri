import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import StatBlock from '../components/StatBlock'
import BarChartWidget from '../components/BarChartWidget'

const sentimentData = [
  { name:'Positif', value:71 }, { name:'Negatif', value:18 }, { name:'Netral', value:11 }
]
const COLORS = ['#059669','#DC2626','#64748B']

const topWahana = [
  { name:'Roller Coaster', value:67 }, { name:'Bianglala', value:48 },
  { name:'Flying Fox', value:41 }, { name:'Drop Tower', value:35 }, { name:'Mini Train', value:28 },
]

const ratings = [
  { name:'Roller Coaster Alpha', score:4.6 },
  { name:'Flying Fox Highland',  score:4.4 },
  { name:'Drop Tower Vertigo',   score:4.3 },
  { name:'Bianglala Raksasa',    score:4.1 },
  { name:'Mini Train Junior',    score:3.9 },
]

const feedbacks = [
  { waktu:'04 Nov 14:20', user:'Andi S.', wahana:'Roller Coaster Alpha', tipe:'Saran',  sentimen:'Positif', text:'Wahana keren dan seru banget!' },
  { waktu:'04 Nov 12:45', user:'Rina K.', wahana:'Flying Fox Highland',  tipe:'Kritik', sentimen:'Negatif', text:'Antrian terlalu panjang, kurang efisien.' },
  { waktu:'04 Nov 11:30', user:'Budi M.', wahana:'Bianglala Raksasa',    tipe:'Saran',  sentimen:'Positif', text:'Pemandangannya bagus sekali dari atas.' },
  { waktu:'04 Nov 10:15', user:'Ani P.', wahana:'Food Court',           tipe:'Kritik', sentimen:'Netral',  text:'Makanan standar, harga cukup wajar.' },
  { waktu:'04 Nov 09:40', user:'Dani L.', wahana:'Mini Train Junior',    tipe:'Saran',  sentimen:'Positif', text:'Anak-anak sangat senang, tambah jadwal!' },
  { waktu:'04 Nov 09:10', user:'Siti H.', wahana:'Drop Tower Vertigo',   tipe:'Kritik', sentimen:'Negatif', text:'Petugas kurang ramah saat briefing.' },
  { waktu:'03 Nov 17:30', user:'Hendra W.', wahana:'Arung Jeram',       tipe:'Saran',  sentimen:'Positif', text:'Menantang dan menyegarkan!' },
  { waktu:'03 Nov 16:00', user:'Maya T.', wahana:'Roller Coaster Alpha', tipe:'Kritik', sentimen:'Netral',  text:'Tinggi minimum perlu diperjelas di pintu.' },
  { waktu:'03 Nov 14:20', user:'Rio F.', wahana:'Flying Fox Highland',  tipe:'Saran',  sentimen:'Positif', text:'Instruktur sangat profesional.' },
  { waktu:'03 Nov 13:00', user:'Nita S.', wahana:'Bianglala Raksasa',   tipe:'Kritik', sentimen:'Negatif', text:'Gondola terasa agak goyah, perlu cek.' },
]

const sentimentColor = { Positif:'text-emerald-700', Negatif:'text-red-700', Netral:'text-slate-500' }

function Stars({ score }) {
  return (
    <span className="text-amber-400 text-sm">
      {'★'.repeat(Math.floor(score))}{'☆'.repeat(5 - Math.floor(score))}
    </span>
  )
}

export default function FeedbackPage() {
  const [tipeF, setTipeF] = useState('')
  const [sentF, setSentF] = useState('')

  const filtered = feedbacks.filter(f =>
    (!tipeF || f.tipe === tipeF) && (!sentF || f.sentimen === sentF)
  )

  return (
    <PageWrapper role="branch" active="/feedback">
      {({ toggleSidebar }) => (
        <>
          <Topbar title="Kritik & Saran"
            breadcrumb={[{label:'Dashboard',to:'/branch-admin'},{label:'Kritik & Saran'}]}
            onMenuClick={toggleSidebar} />
          <main className="p-4 sm:p-6 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatBlock label="Total Masukan Bulan Ini" value="234" sub="Semua tipe" />
              <StatBlock label="Sentimen Positif" value="71%" sub="dari total masukan" color="green" />
              <StatBlock label="Rating Rata-rata" value="4.2/5" sub="Semua wahana" color="teal" />
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 flex flex-col gap-6">
                {/* Donut */}
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Distribusi Sentimen</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={sentimentData} dataKey="value" cx="50%" cy="50%"
                        innerRadius={55} outerRadius={85} paddingAngle={3}
                        animationDuration={1200} label={({ name, value }) => `${name} ${value}%`} labelLine>
                        {sentimentData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                      </Pie>
                      <Tooltip formatter={(v) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex gap-4 mt-2">
                    {sentimentData.map((s, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: COLORS[i] }} />
                        {s.name} {s.value}%
                      </div>
                    ))}
                  </div>
                </div>
                {/* Bar */}
                <BarChartWidget data={topWahana} title="Wahana Paling Sering Dikomentari" layout="vertical" />
              </div>

              <div className="md:col-span-2 bg-white border border-slate-200 rounded-md p-5">
                <p className="text-sm font-semibold text-slate-900 mb-4">Rating Rata-rata per Wahana</p>
                <div className="flex flex-col gap-4">
                  {ratings.map((r, i) => (
                    <div key={i} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-teal-600 font-bold text-sm flex-shrink-0">{i+1}</span>
                        <span className="text-sm text-slate-700 truncate">{r.name}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Stars score={r.score} />
                        <span className="text-sm font-semibold text-slate-700">{r.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feed table */}
            <div className="bg-white border border-slate-200 rounded-md">
              <div className="flex flex-wrap gap-3 p-5 border-b border-slate-100">
                <select value={tipeF} onChange={e=>setTipeF(e.target.value)} className="text-sm border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-teal-500">
                  <option value="">Semua Tipe</option><option>Kritik</option><option>Saran</option>
                </select>
                <select value={sentF} onChange={e=>setSentF(e.target.value)} className="text-sm border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-teal-500">
                  <option value="">Semua Sentimen</option><option>Positif</option><option>Negatif</option><option>Netral</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-left bg-slate-50">
                    {['Waktu','Pengunjung','Wahana','Tipe','Sentimen','Pesan'].map(h =>
                      <th key={h} className="px-4 py-2.5 font-semibold whitespace-nowrap">{h}</th>
                    )}
                  </tr></thead>
                  <tbody>{filtered.map((f, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                      <td className="px-4 py-2.5 text-slate-400 whitespace-nowrap">{f.waktu}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-700">{f.user}</td>
                      <td className="px-4 py-2.5 text-teal-600">{f.wahana}</td>
                      <td className="px-4 py-2.5 text-slate-600">{f.tipe}</td>
                      <td className="px-4 py-2.5"><span className={`font-semibold ${sentimentColor[f.sentimen]}`}>{f.sentimen}</span></td>
                      <td className="px-4 py-2.5 text-slate-600 max-w-xs truncate">{f.text}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          </main>
        </>
      )}
    </PageWrapper>
  )
}

