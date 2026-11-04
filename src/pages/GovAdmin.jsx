import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import StatBlock from '../components/StatBlock'
import AnimatedBar from '../components/AnimatedBar'
import BarChartWidget from '../components/BarChartWidget'

const monthData6 = [
  { name:'Jan', value:38200 }, { name:'Feb', value:41500 }, { name:'Mar', value:39800 },
  { name:'Apr', value:44200 }, { name:'Mei', value:47100 }, { name:'Jun', value:48291 },
]
const monthData12 = [
  ...monthData6,
  { name:'Jul', value:51000 }, { name:'Agu', value:53200 }, { name:'Sep', value:49800 },
  { name:'Okt', value:52100 }, { name:'Nov', value:47300 }, { name:'Des', value:44200 },
]

const destinations = [
  { name:'Jatim Park 3',       score:86.2 },
  { name:'BNS',                score:81.4 },
  { name:'Santerra',           score:78.9 },
  { name:'Jatim Park 2',       score:76.3 },
  { name:'Selecta',            score:71.8 },
  { name:'Jatim Park 1',       score:68.5 },
  { name:'Kusuma Agrowisata',  score:61.2 },
]

const proposals = [
  { dest:'Jatim Park 3', jenis:'Pembangunan Wahana Baru', tanggal:'28 Okt 2026', prioritas:'Tinggi',  status:'Menunggu' },
  { dest:'Selecta',       jenis:'Perbaikan Akses Jalan',  tanggal:'1 Nov 2026',  prioritas:'Sedang',  status:'Menunggu' },
]

const mapNodes = [
  { name:'Jatim Park 1', x:120, y:200, occ:'Sedang'    },
  { name:'Jatim Park 2', x:200, y:150, occ:'Ramai'     },
  { name:'Jatim Park 3', x:280, y:180, occ:'Sangat Ramai' },
  { name:'BNS',          x:350, y:120, occ:'Ramai'     },
  { name:'Selecta',      x:160, y:280, occ:'Lengang'   },
  { name:'Santerra',     x:300, y:260, occ:'Sedang'    },
  { name:'Kusuma',       x:80,  y:300, occ:'Lengang'   },
]
const occColor = { 'Lengang':'#059669', 'Sedang':'#0D9488', 'Ramai':'#D97706', 'Sangat Ramai':'#DC2626' }

const rangeTabs = ['6 Bulan','1 Tahun']

export default function GovAdmin() {
  const [range, setRange] = useState('6 Bulan')
  const chartData = range === '6 Bulan' ? monthData6 : monthData12

  return (
    <PageWrapper role="gov" active="/gov-admin">
      {({ toggleSidebar }) => (
        <>
          <Topbar title="Dashboard Pemerintah"
            breadcrumb={[{ label:'Dashboard Pemerintah' }]}
            onMenuClick={toggleSidebar} notifCount={2} />
          <main className="p-4 sm:p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatBlock label="Total Destinasi Aktif"       value="7"      sub="Wilayah Kota Batu" />
              <StatBlock label="Total Kunjungan Bulan Ini"   value="48.291" sub="Data agregat real-time" />
              <StatBlock label="Proposal Menunggu Review"    value="2"      sub="Perlu ditindaklanjuti" color="red" />
              <StatBlock label="Rata-rata Skor Ekspansi"     value="72.1"   sub="Semua destinasi" />
            </div>

            {/* Chart + ranking */}
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 flex flex-col gap-3">
                <BarChartWidget data={chartData} title={`Tren Kunjungan Agregat — ${range}`} />
                <div className="flex gap-2">
                  {rangeTabs.map(t => (
                    <button key={t} onClick={()=>setRange(t)}
                      className={`text-xs font-medium px-3 py-1 rounded border ${range===t?'bg-teal-600 text-white border-teal-600':'border-slate-200 text-slate-600 hover:border-teal-400'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 bg-white border border-slate-200 rounded-md p-5">
                <p className="text-sm font-semibold text-slate-900 mb-4">Ranking Skor Ekspansi</p>
                <div className="flex flex-col gap-4">
                  {destinations.map((d, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="font-display text-teal-600 text-lg w-5 flex-shrink-0">{i+1}</span>
                        <span className="text-sm text-slate-700 flex-1 truncate">{d.name}</span>
                        <span className="text-sm font-semibold text-slate-900">{d.score}</span>
                      </div>
                      <AnimatedBar value={d.score} color="teal" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Proposals */}
            <div className="bg-white border border-slate-200 rounded-md">
              <div className="px-5 py-4 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-900">Proposal Ekspansi Menunggu Review</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-xs text-left bg-slate-50">
                    {['Destinasi','Jenis Proposal','Tanggal Masuk','Prioritas','Status','Aksi'].map(h =>
                      <th key={h} className="px-4 py-2.5 font-semibold whitespace-nowrap">{h}</th>
                    )}
                  </tr></thead>
                  <tbody>{proposals.map((p, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-800">{p.dest}</td>
                      <td className="px-4 py-3 text-slate-600">{p.jenis}</td>
                      <td className="px-4 py-3 text-slate-500">{p.tanggal}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${p.prioritas==='Tinggi'?'bg-red-50 text-red-700':'bg-amber-50 text-amber-700'}`}>{p.prioritas}</span>
                      </td>
                      <td className="px-4 py-3"><span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-sm">{p.status}</span></td>
                      <td className="px-4 py-3">
                        <Link to="/expansion-approval" className="text-xs text-teal-600 border border-teal-200 px-2.5 py-1 rounded hover:bg-teal-50">Telaah</Link>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>

            {/* SVG Map */}
            <div className="bg-white border border-slate-200 rounded-md p-5">
              <p className="text-sm font-semibold text-slate-900 mb-4">Peta Sebaran Destinasi — Kota Batu</p>
              <div className="overflow-x-auto">
                <svg viewBox="0 0 480 360" className="w-full max-w-xl" aria-label="Peta destinasi wisata Kota Batu">
                  <rect width="480" height="360" rx="6" fill="#F8FAFC" />
                  {mapNodes.map((n, i) => (
                    <g key={i}>
                      <circle cx={n.x} cy={n.y} r={16} fill={occColor[n.occ]} opacity={0.85} />
                      <text x={n.x} y={n.y + 28} textAnchor="middle" fontSize={9} fill="#334155" fontFamily="system-ui">{n.name}</text>
                      <text x={n.x} y={n.y + 38} textAnchor="middle" fontSize={8} fill="#64748B" fontFamily="system-ui">{n.occ}</text>
                    </g>
                  ))}
                </svg>
              </div>
              <div className="flex flex-wrap gap-4 mt-3">
                {Object.entries(occColor).map(([label, color]) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-slate-600">
                    <span className="w-3 h-3 rounded-full" style={{ background: color }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </>
      )}
    </PageWrapper>
  )
}

