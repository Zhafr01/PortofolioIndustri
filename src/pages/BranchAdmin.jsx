import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import StatBlock from '../components/StatBlock'
import AnimatedBar from '../components/AnimatedBar'
import LineChartWidget from '../components/LineChartWidget'
import VisitorCounter from '../components/VisitorCounter'
import { ArrowUpRight } from 'lucide-react'

const trendData = [
  { name: 'Sen', value: 2103 }, { name: 'Sel', value: 2341 },
  { name: 'Rab', value: 1956 }, { name: 'Kam', value: 2615 },
  { name: 'Jum', value: 2847 }, { name: 'Sab', value: 3102 },
  { name: 'Min', value: 2890 },
]

const wahanaStatus = [
  { name: 'Roller Coaster Alpha', status: 'Beroperasi', pct: 92 },
  { name: 'Bianglala Raksasa', status: 'Beroperasi', pct: 78 },
  { name: 'Flying Fox Highland', status: 'Beroperasi', pct: 85 },
  { name: 'Arung Jeram Express', status: 'Maintenance', pct: 0 },
  { name: 'Drop Tower Vertigo', status: 'Beroperasi', pct: 88 },
  { name: 'Mini Train Junior', status: 'Beroperasi', pct: 65 },
]

const statusColor = {
  'Beroperasi': 'text-emerald-700 bg-emerald-50',
  'Maintenance': 'text-amber-700 bg-amber-50',
  'Tutup': 'text-red-700 bg-red-50',
}

const alerts = [
  { waktu: '14:32', tipe: 'Teknis-Sensor', lokasi: 'Roller Coaster Alpha', status: 'Dilaporkan', petugas: 'Rudi H.' },
  { waktu: '13:15', tipe: 'Teknis-Manual', lokasi: 'Bianglala Raksasa', status: 'Dalam Proses', petugas: 'Bowo N.' },
  { waktu: '11:40', tipe: 'Medis', lokasi: 'Area Parkir', status: 'Selesai', petugas: 'Sari I.' },
]

const feedbacks = [
  { time: '14:20', wahana: 'Roller Coaster', sentiment: 'Positif', text: 'Wahana keren dan seru banget, pengalaman tak terlupakan!' },
  { time: '12:45', wahana: 'Flying Fox', sentiment: 'Negatif', text: 'Antrian terlalu panjang, kurang efisien.' },
  { time: '11:30', wahana: 'Bianglala', sentiment: 'Positif', text: 'Pemandangannya bagus sekali dari atas.' },
  { time: '10:15', wahana: 'Food Court', sentiment: 'Netral', text: 'Makanan standar, tidak terlalu istimewa.' },
]

const sentimentColor = {
  Positif: 'text-emerald-600 bg-emerald-50',
  Negatif: 'text-red-600 bg-red-50',
  Netral: 'text-slate-500 bg-slate-100',
}

const alertStatusClass = {
  'Dilaporkan': 'bg-red-50 text-red-700',
  'Dalam Proses': 'bg-amber-50 text-amber-700',
  'Selesai': 'bg-slate-100 text-slate-500',
}

export default function BranchAdmin() {
  return (
    <PageWrapper role="branch" active="/branch-admin">
      {({ toggleSidebar }) => (
        <>
          <Topbar
            title="Dashboard"
            breadcrumb={[{ label: 'Dashboard' }]}
            onMenuClick={toggleSidebar}
            actions={
              <span className="text-xs text-slate-400">Jatim Park 2 — Senin, 4 Nov 2026</span>
            }
          />
          <main className="p-4 sm:p-6 flex flex-col gap-6">

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <StatBlock label="Pengunjung Hari Ini" color="green" sub="Naik 12% dari kemarin">
                <VisitorCounter target={2847} className="font-display text-3xl text-emerald-700 leading-none" />
              </StatBlock>
              <StatBlock label="Wahana Aktif" color="teal" sub="4 dalam maintenance">
                <span className="font-display text-3xl text-teal-600 leading-none">18/22</span>
                <AnimatedBar value={82} color="teal" />
              </StatBlock>
              <StatBlock label="Alert Aktif" value="3" color="red" sub="Memerlukan perhatian" />
              <StatBlock label="Skor Ekspansi" color="default" sub="dari 100 poin">
                <span className="font-display text-3xl text-slate-900 leading-none">76.3</span>
                <AnimatedBar value={76} color="teal" />
              </StatBlock>
            </div>

            {/* Chart + Wahana status */}
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3">
                <LineChartWidget data={trendData} title="Tren Kunjungan 7 Hari Terakhir" yLabel="Pengunjung" />
              </div>
              <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Status Wahana</p>
                  <Link to="/wahana" className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-0.5 transition-colors">
                    Kelola <ArrowUpRight size={12} />
                  </Link>
                </div>
                <div className="flex flex-col gap-3.5">
                  {wahanaStatus.map((w, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-700 font-medium truncate pr-2">{w.name}</span>
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-sm flex-shrink-0 ${statusColor[w.status]}`}>
                          {w.status}
                        </span>
                      </div>
                      {w.pct > 0
                        ? <AnimatedBar value={w.pct} color={w.status === 'Beroperasi' ? 'teal' : 'amber'} />
                        : <div className="bar-track"><div className="bar-fill bg-slate-200" style={{ width: '100%' }} /></div>
                      }
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <p className="text-xs font-semibold text-slate-700 mb-2.5">Fasilitas</p>
                  {[['Parkir', 'Tersedia', 'emerald'], ['Toilet', 'Tersedia', 'emerald'], ['Food Court', 'Ramai', 'amber']].map(([k, v, c]) => (
                    <div key={k} className="flex justify-between text-xs py-1.5 border-b border-slate-50 last:border-0">
                      <span className="text-slate-500">{k}</span>
                      <span className={`text-${c}-600 font-semibold`}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alerts + Feedback */}
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-900">Alert Terbaru</p>
                  <Link to="/alerts" className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-0.5 transition-colors">
                    Lihat semua <ArrowUpRight size={12} />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Waktu</th>
                        <th>Tipe</th>
                        <th>Lokasi</th>
                        <th>Status</th>
                        <th>Petugas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alerts.map((a, i) => (
                        <tr key={i}>
                          <td className="text-slate-400 font-mono text-xs">{a.waktu}</td>
                          <td className="font-medium text-slate-800">{a.tipe}</td>
                          <td className="text-slate-500">{a.lokasi}</td>
                          <td>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${alertStatusClass[a.status]}`}>
                              {a.status}
                            </span>
                          </td>
                          <td className="text-slate-500">{a.petugas}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-900">Kritik &amp; Saran</p>
                  <Link to="/feedback" className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-0.5 transition-colors">
                    Lihat semua <ArrowUpRight size={12} />
                  </Link>
                </div>
                <div className="flex flex-col divide-y divide-slate-50 px-5">
                  {feedbacks.map((f, i) => (
                    <div key={i} className="py-3.5 first:pt-4 last:pb-4">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs text-slate-400">
                          {f.time} · <span className="text-teal-600 font-medium">{f.wahana}</span>
                        </span>
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-sm ${sentimentColor[f.sentiment]}`}>
                          {f.sentiment}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{f.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </PageWrapper>
  )
}
