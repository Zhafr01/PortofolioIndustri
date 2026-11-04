import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import AnimatedBar from '../components/AnimatedBar'

const sensors = [
  { name: 'Roller Coaster Alpha', suhu: 42, getaran: 2.3, beban: 78 },
  { name: 'Drop Tower Vertigo',   suhu: 38, getaran: 1.8, beban: 65 },
  { name: 'Flying Fox Highland',  suhu: 35, getaran: 1.2, beban: 55 },
]

const anomaliLog = [
  { waktu: '14:32', device: 'Sensor Getaran — Roller Coaster Alpha', nilai: '5.1g', normal: '< 4.0g', status: 'Anomali' },
  { waktu: '14:10', device: 'Sensor Suhu — Drop Tower',              nilai: '48°C', normal: '< 50°C', status: 'Normal' },
  { waktu: '13:55', device: 'Smart Gate — Pintu Masuk A',            nilai: '—',    normal: '—',       status: 'Normal' },
  { waktu: '12:40', device: 'Sensor Beban — Flying Fox',             nilai: '91%',  normal: '< 90%',   status: 'Anomali' },
  { waktu: '11:20', device: 'Sensor Lingkungan — Area Outdoor',      nilai: 'AQI 42', normal: '< 100', status: 'Normal' },
]

function rand(base, pct = 5) {
  return +(base * (1 + (Math.random() - 0.5) * pct / 100)).toFixed(1)
}

export default function EMonitoring() {
  const [envData, setEnvData] = useState({ suhu: 24.1, kelembaban: 72, aqi: 38, angin: 12.4 })
  const [gate, setGate]   = useState({ dalam: 847, parkir: 213 })
  const [sensorData, setSensorData] = useState(sensors)

  useEffect(() => {
    const id = setInterval(() => {
      setEnvData(d => ({ suhu: rand(d.suhu, 3), kelembaban: rand(d.kelembaban, 2), aqi: rand(d.aqi, 5), angin: rand(d.angin, 8) }))
      setGate(g => ({ dalam: Math.max(0, g.dalam + Math.round((Math.random() - 0.5) * 20)), parkir: Math.max(0, g.parkir + Math.round((Math.random() - 0.5) * 6)) }))
      setSensorData(prev => prev.map(s => ({ ...s, suhu: rand(s.suhu, 3), getaran: rand(s.getaran, 5), beban: rand(s.beban, 4) })))
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <PageWrapper role="branch" active="/e-monitoring">
      {({ toggleSidebar }) => (
        <>
          <Topbar
            title="E-Monitoring Live"
            breadcrumb={[{ label: 'Dashboard', to: '/branch-admin' }, { label: 'E-Monitoring Live' }]}
            onMenuClick={toggleSidebar}
          />
          <main className="p-4 sm:p-6 flex flex-col gap-6">
            {/* CCTV Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Kamera CCTV</p>
                  <p className="text-xs text-slate-500 mt-0.5">Kamera Aktif: <span className="font-semibold text-teal-600">3/4</span></p>
                </div>
                <select className="text-xs border border-slate-200 rounded px-2 py-1 text-slate-700">
                  <option>Semua Zona</option><option>Wahana Utama</option><option>Parkir</option>
                </select>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Pintu Masuk A', live: true },
                  { name: 'Wahana Utama', live: true },
                  { name: 'Area Parkir',  live: true },
                  { name: 'Zona Anak',    live: false },
                ].map((cam, i) => (
                  <div key={i} className="relative rounded-md overflow-hidden aspect-video bg-slate-800">
                    {cam.live ? (
                      <>
                        <div className="absolute inset-0 opacity-10"
                          style={{ background: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0px,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 4px)' }} />
                        <span className="absolute top-2 right-2 text-red-400 text-xs font-bold tracking-widest sensor-live">LIVE</span>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs text-slate-500">Kamera Offline</span>
                      </div>
                    )}
                    <span className="absolute bottom-2 left-2 text-white text-xs bg-black/40 px-1.5 py-0.5 rounded">
                      {cam.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sensor wahana + env */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sensor wahana */}
              <div className="bg-white border border-slate-200 rounded-md p-5">
                <p className="text-sm font-semibold text-slate-900 mb-4">Sensor Wahana Real-time</p>
                <div className="flex flex-col gap-5">
                  {sensorData.map((s, i) => (
                    <div key={i}>
                      <p className="text-xs font-semibold text-slate-700 mb-2">{s.name}</p>
                      {[
                        { label: `Suhu: ${s.suhu}°C`,    pct: (s.suhu / 60) * 100, threshold: 85 },
                        { label: `Getaran: ${s.getaran}g`, pct: (s.getaran / 5) * 100, threshold: 80 },
                        { label: `Beban: ${s.beban}%`,   pct: s.beban, threshold: 90 },
                      ].map((m, j) => (
                        <div key={j} className="mb-2">
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>{m.label}</span>
                            <span className="text-slate-400">threshold {m.threshold}%</span>
                          </div>
                          <div className="relative h-2 bg-slate-100 rounded-sm">
                            <div className="absolute left-0 top-0 h-2 bg-teal-500 rounded-sm transition-all duration-700" style={{ width: `${Math.min(100, m.pct)}%` }} />
                            <div className="absolute top-0 h-2 w-px bg-red-400" style={{ left: `${m.threshold}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Env + Gate */}
              <div className="flex flex-col gap-4">
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-4">Sensor Lingkungan</p>
                  <div className="grid grid-cols-2 gap-4 min-w-0">
                    {[
                      { label: 'Suhu Udara', value: `${envData.suhu}°C` },
                      { label: 'Kelembaban', value: `${envData.kelembaban}%` },
                      { label: 'Kualitas Udara', value: `AQI ${envData.aqi}` },
                      { label: 'Kecepatan Angin', value: `${envData.angin} km/h` },
                    ].map((e, i) => (
                      <div key={i}>
                        <p className="text-xs text-slate-500 mb-1">{e.label}</p>
                        <p className="font-display text-2xl text-slate-900">{e.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Smart Gate Counter</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Pengunjung di dalam</span>
                      <span className="font-display text-2xl text-teal-600">{gate.dalam.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Kendaraan parkir</span>
                      <span className="font-display text-2xl text-slate-700">{gate.parkir}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Anomali log */}
            <div className="bg-white border border-slate-200 rounded-md p-5">
              <p className="text-sm font-semibold text-slate-900 mb-4">Log Anomali Sensor</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-left">
                    {['Waktu','Perangkat','Nilai','Normal','Status','Tindakan'].map(h => <th key={h} className="pb-2 pr-4 font-semibold">{h}</th>)}
                  </tr></thead>
                  <tbody>{anomaliLog.map((r, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0">
                      <td className="py-2 pr-4 text-slate-500">{r.waktu}</td>
                      <td className="py-2 pr-4 text-slate-700">{r.device}</td>
                      <td className="py-2 pr-4 font-medium text-slate-800">{r.nilai}</td>
                      <td className="py-2 pr-4 text-slate-500">{r.normal}</td>
                      <td className="py-2 pr-4">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${r.status === 'Anomali' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>{r.status}</span>
                      </td>
                      <td className="py-2"><Link to="/alerts" className="text-teal-600 hover:underline text-xs">Detail</Link></td>
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

