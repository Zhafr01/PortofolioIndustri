import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import AnimatedBar from '../components/AnimatedBar'
import { Camera, X, Maximize2, ZoomIn, ZoomOut, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'

const sensors = [
  { name: 'Roller Coaster Alpha', suhu: 42, getaran: 2.3, beban: 78 },
  { name: 'Drop Tower Vertigo',   suhu: 38, getaran: 1.8, beban: 65 },
  { name: 'Flying Fox Highland',  suhu: 35, getaran: 1.2, beban: 55 },
]

const anomaliLog = [
  { waktu: '14:32', device: 'Sensor Getaran: Roller Coaster Alpha', nilai: '5.1g', normal: '< 4.0g', status: 'Anomali' },
  { waktu: '14:10', device: 'Sensor Suhu: Drop Tower',              nilai: '48°C', normal: '< 50°C', status: 'Normal' },
  { waktu: '13:55', device: 'Smart Gate: Pintu Masuk A',            nilai: 'Aktif', normal: 'Online', status: 'Normal' },
  { waktu: '12:40', device: 'Sensor Beban: Flying Fox',             nilai: '91%',  normal: '< 90%',   status: 'Anomali' },
  { waktu: '11:20', device: 'Sensor Lingkungan: Area Outdoor',      nilai: 'AQI 42', normal: '< 100', status: 'Normal' },
]

const initialCameras = [
  { id: 1, name: 'Pintu Masuk A', zone: 'Wahana Utama', live: true,  fps: 30, bitrate: '4.2 Mbps' },
  { id: 2, name: 'Wahana Utama',  zone: 'Wahana Utama', live: true,  fps: 30, bitrate: '5.1 Mbps' },
  { id: 3, name: 'Area Parkir',   zone: 'Parkir',       live: true,  fps: 25, bitrate: '3.8 Mbps' },
  { id: 4, name: 'Zona Anak',     zone: 'Wahana Utama', live: false, fps: 0,  bitrate: '0 Kbps' },
]

function rand(base, pct = 5) {
  return +(base * (1 + (Math.random() - 0.5) * pct / 100)).toFixed(1)
}

export default function EMonitoring() {
  const [envData, setEnvData] = useState({ suhu: 24.1, kelembaban: 72, aqi: 38, angin: 12.4 })
  const [gate, setGate] = useState({ dalam: 847, parkir: 213 })
  const [sensorData, setSensorData] = useState(sensors)
  const [zoneFilter, setZoneFilter] = useState('Semua Zona')
  const [selectedCam, setSelectedCam] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [snapshotToast, setSnapshotToast] = useState('')

  useEffect(() => {
    const id = setInterval(() => {
      setEnvData(d => ({ suhu: rand(d.suhu, 3), kelembaban: rand(d.kelembaban, 2), aqi: rand(d.aqi, 5), angin: rand(d.angin, 8) }))
      setGate(g => ({ dalam: Math.max(0, g.dalam + Math.round((Math.random() - 0.5) * 20)), parkir: Math.max(0, g.parkir + Math.round((Math.random() - 0.5) * 6)) }))
      setSensorData(prev => prev.map(s => ({ ...s, suhu: rand(s.suhu, 3), getaran: rand(s.getaran, 5), beban: rand(s.beban, 4) })))
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const filteredCameras = zoneFilter === 'Semua Zona'
    ? initialCameras
    : initialCameras.filter(c => c.zone === zoneFilter)

  function openCamModal(cam) {
    setSelectedCam(cam)
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
  }

  function handleTakeSnapshot() {
    setSnapshotToast(`Cuplikan gambar ${selectedCam.name} berhasil disimpan ke galeri audit.`)
    setTimeout(() => setSnapshotToast(''), 3000)
  }

  return (
    <PageWrapper role="branch" active="/e-monitoring">
      {({ toggleSidebar }) => (
        <>
          <Topbar
            title="E-Monitoring Live"
            breadcrumb={[{ label: 'Dashboard', to: '/branch-admin' }, { label: 'E-Monitoring Live' }]}
            onMenuClick={toggleSidebar}
          />

          {snapshotToast && (
            <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl text-xs font-medium border border-slate-700 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={16} className="text-teal-400" />
              <span>{snapshotToast}</span>
            </div>
          )}

          <main className="p-4 sm:p-6 flex flex-col gap-6">
            {/* CCTV Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Kamera CCTV Live Stream</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kamera Aktif: <span className="font-semibold text-teal-600">3/4 Online</span> • Klik kamera untuk memperbesar
                  </p>
                </div>
                <select
                  value={zoneFilter}
                  onChange={e => setZoneFilter(e.target.value)}
                  className="text-xs border border-slate-200 rounded px-2.5 py-1 text-slate-700 bg-white"
                >
                  <option value="Semua Zona">Semua Zona</option>
                  <option value="Wahana Utama">Wahana Utama</option>
                  <option value="Parkir">Parkir</option>
                </select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredCameras.map((cam) => (
                  <div
                    key={cam.id}
                    onClick={() => openCamModal(cam)}
                    className="group relative rounded-md overflow-hidden aspect-video bg-slate-900 cursor-pointer border border-slate-200 hover:border-teal-500 transition-all shadow-xs"
                  >
                    {cam.live ? (
                      <>
                        <div className="absolute inset-0 opacity-15"
                          style={{ background: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.06) 0px,rgba(255,255,255,0.06) 1px,transparent 1px,transparent 4px)' }} />
                        <span className="absolute top-2 right-2 text-red-400 text-[10px] font-bold tracking-widest bg-black/60 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" /> LIVE
                        </span>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs text-slate-500 font-medium">Kamera Offline</span>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-white text-xs">
                      <span className="bg-black/60 px-1.5 py-0.5 rounded text-[11px] font-medium truncate">
                        {cam.name}
                      </span>
                      <Maximize2 size={13} className="text-white/60 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sensor wahana + env */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sensor wahana */}
              <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
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
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">{m.label}</span>
                            <span className={m.pct > m.threshold ? 'text-red-600 font-semibold text-xs' : 'text-slate-400'}>
                              {m.pct > m.threshold ? 'Waspada' : 'Normal'}
                            </span>
                          </div>
                          <AnimatedBar value={m.pct} color={m.pct > m.threshold ? 'red' : 'teal'} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sensor Lingkungan & Smart Gate */}
              <div className="flex flex-col gap-6">
                <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
                  <p className="text-sm font-semibold text-slate-900 mb-4">Sensor Lingkungan Outdoor</p>
                  <div className="grid grid-cols-2 gap-4 min-w-0">
                    {[
                      { label: 'Suhu Udara', value: `${envData.suhu}°C` },
                      { label: 'Kelembaban', value: `${envData.kelembaban}%` },
                      { label: 'Kualitas Udara', value: `AQI ${envData.aqi}` },
                      { label: 'Kecepatan Angin', value: `${envData.angin} km/h` },
                    ].map((e, i) => (
                      <div key={i} className="bg-slate-50 p-3 rounded border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">{e.label}</p>
                        <p className="font-display text-2xl text-slate-900">{e.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Smart Gate Counter</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-100">
                      <span className="text-sm text-slate-600 font-medium">Pengunjung di dalam area</span>
                      <span className="font-display text-2xl text-teal-600">{gate.dalam.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-100">
                      <span className="text-sm text-slate-600 font-medium">Kendaraan di area parkir</span>
                      <span className="font-display text-2xl text-slate-700">{gate.parkir}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Anomali log */}
            <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-semibold text-slate-900">Log Anomali Sensor Real-time</p>
                <Link to="/alerts" className="text-xs text-teal-600 hover:underline font-semibold">Lihat Semua di Alert Center →</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-left bg-slate-50">
                    {['Waktu','Perangkat','Nilai','Normal','Status','Tindakan'].map(h => <th key={h} className="py-2.5 px-4 font-semibold">{h}</th>)}
                  </tr></thead>
                  <tbody>{anomaliLog.map((r, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-4 text-slate-500">{r.waktu}</td>
                      <td className="py-2.5 px-4 text-slate-800 font-medium">{r.device}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{r.nilai}</td>
                      <td className="py-2.5 px-4 text-slate-500">{r.normal}</td>
                      <td className="py-2.5 px-4">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${r.status === 'Anomali' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>{r.status}</span>
                      </td>
                      <td className="py-2.5 px-4">
                        <Link to="/alerts" className="text-teal-600 hover:text-teal-800 font-semibold hover:underline">
                          Inspeksi →
                        </Link>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          </main>

          {/* Enlarged CCTV Modal */}
          {selectedCam && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-slate-900 text-white rounded-lg w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-700">
                <div className="px-5 py-3 border-b border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <p className="font-semibold text-sm">CCTV Stream: {selectedCam.name} ({selectedCam.zone})</p>
                  </div>
                  <button onClick={() => setSelectedCam(null)} className="text-slate-400 hover:text-white">
                    <X size={18} />
                  </button>
                </div>

                {/* Big Screen Canvas */}
                <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                  <div
                    className="w-full h-full flex items-center justify-center transition-transform duration-200"
                    style={{
                      transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`
                    }}
                  >
                    <div className="text-center text-slate-500">
                      <Camera size={48} className="mx-auto mb-2 opacity-30 text-teal-400" />
                      <p className="text-xs font-mono">ENCODING RTSP://CAM-STREAM-{selectedCam.id}.KOTABATU.ID</p>
                      <p className="text-[10px] text-slate-600 mt-1">Bitrate: {selectedCam.bitrate} • 30 FPS • Latency: 24ms</p>
                    </div>
                  </div>

                  {/* OSD Info */}
                  <div className="absolute top-3 left-3 text-[11px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded">
                    REC [●] 2026-11-15 14:35:12 WIB
                  </div>

                  {/* Zoom Badge */}
                  {zoomLevel > 1 && (
                    <div className="absolute bottom-3 right-3 text-[11px] font-mono text-white bg-teal-600/80 px-2 py-0.5 rounded">
                      Zoom: {zoomLevel.toFixed(1)}x
                    </div>
                  )}
                </div>

                {/* PTZ Controls */}
                <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">Kontrol PTZ:</span>
                    <button
                      onClick={() => setPanOffset(p => ({ ...p, x: p.x + 20 }))}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                      aria-label="Geser Kiri"
                    >
                      <ArrowLeft size={14} />
                    </button>
                    <button
                      onClick={() => setPanOffset(p => ({ ...p, y: p.y + 20 }))}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                      aria-label="Geser Atas"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      onClick={() => setPanOffset(p => ({ ...p, y: p.y - 20 }))}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                      aria-label="Geser Bawah"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      onClick={() => setPanOffset(p => ({ ...p, x: p.x - 20 }))}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                      aria-label="Geser Kanan"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setZoomLevel(z => Math.max(1, z - 0.25))}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 flex items-center gap-1"
                    >
                      <ZoomOut size={13} /> Zoom -
                    </button>
                    <button
                      onClick={() => setZoomLevel(z => Math.min(2.5, z + 0.25))}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 flex items-center gap-1"
                    >
                      <ZoomIn size={13} /> Zoom +
                    </button>
                    <button
                      onClick={handleTakeSnapshot}
                      className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded flex items-center gap-1.5 transition-colors"
                    >
                      <Camera size={13} /> Ambil Snapshot
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </PageWrapper>
  )
}
