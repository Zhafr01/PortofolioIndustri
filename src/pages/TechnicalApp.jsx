import { useState, useEffect } from 'react'
import { Camera, ChevronRight, FileText, AlertTriangle, CheckCircle, Wrench, Shield, Activity, RefreshCw } from 'lucide-react'

const alertData = [
  { id: 'AL-001', tipe: 'Teknis', subtipe: 'Sensor', wahana: 'Roller Coaster Alpha', waktu: '14:32', age: '2 menit lalu', status: 'Dilaporkan',   urgent: true,  detail: 'Anomali getaran bearing melebihi batas 4.0g (tercatat 5.1g).' },
  { id: 'AL-002', tipe: 'Teknis', subtipe: 'Manual', wahana: 'Bianglala Raksasa',    waktu: '13:15', age: '1 jam lalu',   status: 'Dalam Proses', urgent: false, detail: 'Pengecekan hidrolik pintu gondola 12.' },
  { id: 'AL-004', tipe: 'Keamanan', subtipe: 'Manual', wahana: 'Pintu Masuk B',      waktu: '11:20', age: '3 jam lalu',   status: 'Selesai',      urgent: false, detail: 'Penertiban antrian pengunjung di gerbang tiket.' },
  { id: 'AL-005', tipe: 'Teknis', subtipe: 'Sensor', wahana: 'Drop Tower Vertigo',   waktu: '09:55', age: '4 jam lalu',   status: 'Selesai',      urgent: false, detail: 'Sensor suhu rem magnetik normal kembali pada 48°C.' },
]

const statusClass = {
  'Dilaporkan':   'bg-red-50 text-red-700 border border-red-200',
  'Diakui':       'bg-blue-50 text-blue-700 border border-blue-200',
  'Dalam Proses': 'bg-amber-50 text-amber-700 border border-amber-200',
  'Selesai':      'bg-slate-100 text-slate-600 border border-slate-200',
}

const steps = ['Dilaporkan', 'Diakui', 'Dalam Proses', 'Selesai']

function rand(base, pct = 5) {
  return +(base * (1 + (Math.random() - 0.5) * pct / 100)).toFixed(1)
}

export default function TechnicalApp() {
  const [tab, setTab] = useState('alerts')
  const [filterTab, setFilterTab] = useState('Semua')
  const [selectedAlert, setSelectedAlert] = useState(alertData[0])
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false)
  const [log, setLog] = useState('')
  const [newStatus, setNewStatus] = useState('Diakui')
  const [saved, setSaved] = useState(false)
  const [reporting, setReporting] = useState(false)
  const [sensor, setSensor] = useState({ getaran: 2.3, suhu: 42, beban: 78 })

  useEffect(() => {
    const id = setInterval(() => {
      setSensor(s => ({
        getaran: rand(s.getaran, 5),
        suhu: rand(s.suhu, 3),
        beban: rand(s.beban, 4)
      }))
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const filterTabs = ['Semua', 'Teknis', 'Keamanan']
  const filtered = filterTab === 'Semua' ? alertData : alertData.filter(a => a.tipe === filterTab)

  const navTabs = [
    { id: 'alerts',  label: 'Alert Aktif (2)' },
    { id: 'beranda', label: 'Monitoring Sensor' },
    { id: 'laporan', label: 'Laporan Tugas' },
    { id: 'profil',  label: 'Profil Teknisi' },
  ]

  function openAlertDetail(alert) {
    setSelectedAlert(alert)
    setNewStatus(alert.status === 'Dilaporkan' ? 'Diakui' : alert.status)
    setSaved(false)
    setIsMobileDetailOpen(true)
  }

  function handleSaveStatus() {
    if (selectedAlert) {
      selectedAlert.status = newStatus
      setSaved(true)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      {/* Top Header: Responsive for mobile and desktop */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-teal-600 rounded-md flex items-center justify-center font-display text-white">
                <Wrench size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm sm:text-base leading-tight">Rudi Hartono</p>
                  <span className="text-[10px] bg-teal-600 text-white font-bold px-2 py-0.5 rounded-sm">
                    ON DUTY
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Teknisi Wahana • Jatim Park 2 (Zona Ekstrem)</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navTabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    tab === t.id
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            <div className="text-right text-xs text-slate-400 hidden sm:block">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              Sistem IoT Aktif
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        {/* TAB 1: ALERTS & INCIDENT RESOLUTION */}
        {tab === 'alerts' && (
          <div className="flex flex-col gap-6">
            {/* Header info */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-display text-xl text-slate-900">Pusat Penanganan Alert &amp; Insiden</p>
                <p className="text-xs text-slate-500 mt-1">
                  Menerima pemicu otomatis dari sensor getaran/suhu dan laporan manual staf lapangan.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Filter Kategori:</span>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-md border border-slate-200">
                  {filterTabs.map(t => (
                    <button
                      key={t}
                      onClick={() => setFilterTab(t)}
                      className={`px-3 py-1 text-xs font-semibold rounded ${
                        filterTab === t ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Alert List (7 cols on lg) */}
              <div className={`lg:col-span-7 flex flex-col gap-3 ${isMobileDetailOpen ? 'hidden lg:flex' : 'flex'}`}>
                {filtered.map((a) => {
                  const isSelected = selectedAlert?.id === a.id
                  return (
                    <div
                      key={a.id}
                      onClick={() => openAlertDetail(a)}
                      className={`cursor-pointer border rounded-lg p-4 transition-all duration-200 ${
                        isSelected ? 'border-teal-600 ring-2 ring-teal-50 bg-white shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            a.urgent ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {a.tipe} : {a.subtipe}
                          </span>
                          <span className="text-xs text-slate-400">• {a.waktu} ({a.age})</span>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${statusClass[a.status]}`}>
                          {a.status}
                        </span>
                      </div>

                      <p className="font-semibold text-slate-900 text-sm">{a.wahana}</p>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{a.detail}</p>

                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
                        <span className="text-[11px] text-slate-400 font-mono">ID: {a.id}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); openAlertDetail(a) }}
                          className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                        >
                          {a.status === 'Dilaporkan' ? 'Tanggapi Alert →' : 'Perbarui Status →'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Right Column: Alert Detail & Actions (5 cols on lg) */}
              <div className={`lg:col-span-5 ${isMobileDetailOpen ? 'block' : 'hidden lg:block'}`}>
                {selectedAlert ? (
                  <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs sticky top-20 flex flex-col gap-5">
                    {/* Mobile Back Button */}
                    <div className="flex lg:hidden justify-between items-center pb-2 border-b border-slate-100">
                      <button
                        onClick={() => setIsMobileDetailOpen(false)}
                        className="text-xs font-semibold text-teal-600 flex items-center gap-1"
                      >
                        ← Kembali ke Daftar Alert
                      </button>
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          Detail Inspeksi {selectedAlert.id}
                        </span>
                        <p className="font-display text-lg text-slate-900 mt-0.5">{selectedAlert.wahana}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{selectedAlert.tipe} / {selectedAlert.subtipe} • {selectedAlert.waktu}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-sm ${statusClass[selectedAlert.status]}`}>
                        {selectedAlert.status}
                      </span>
                    </div>

                    {/* Sensor / Anomaly Info Box */}
                    <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-700">
                      <p className="font-semibold text-slate-800 mb-1">Catatan Diagnosa:</p>
                      <p className="text-slate-600 leading-relaxed">{selectedAlert.detail}</p>
                    </div>

                    {/* Timeline Audit Trail */}
                    <div>
                      <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">Status Tahapan Audit</p>
                      <div className="flex flex-col gap-2">
                        {steps.map((s, i) => {
                          const currentIdx = steps.indexOf(selectedAlert.status)
                          const isDone = i <= currentIdx
                          return (
                            <div key={s} className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                isDone ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'
                              }`}>
                                {isDone ? '✓' : i + 1}
                              </div>
                              <span className={`text-xs font-medium ${isDone ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                                {s}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Change Status Dropdown */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Perbarui Status Penanganan</label>
                      <select
                        value={newStatus}
                        onChange={e => setNewStatus(e.target.value)}
                        className="w-full text-xs border border-slate-200 rounded px-3 py-2 bg-white focus:outline-none focus:border-teal-500"
                      >
                        {steps.filter(s => s !== 'Dilaporkan').map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Action Notes */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Catatan Tindakan Lapangan</label>
                      <textarea
                        value={log}
                        onChange={e => setLog(e.target.value)}
                        rows={3}
                        placeholder="Deskripsikan tindakan penggantian part, uji coba beban, atau rekomendasi operasional..."
                        className="w-full text-xs border border-slate-200 rounded p-2.5 focus:outline-none focus:border-teal-500 resize-none"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold py-2.5 rounded flex items-center justify-center gap-1.5">
                        <Camera size={14} /> Unggah Foto Bukti
                      </button>
                      <button
                        onClick={handleSaveStatus}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 rounded transition-colors"
                      >
                        Simpan Tindakan
                      </button>
                    </div>

                    {saved && (
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded text-center font-medium flex items-center justify-center gap-1.5">
                        <CheckCircle size={14} /> Status berhasil disimpan ke audit log.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-slate-400">
                    Pilih alert di sebelah kiri untuk melihat detail penanganan.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MONITORING SENSOR */}
        {tab === 'beranda' && (
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Wahana Ditugaskan</p>
                <p className="font-display text-2xl text-slate-900 mt-0.5">Roller Coaster Alpha</p>
                <p className="text-xs text-slate-500 mt-1">Zona Wahana Ekstrem • Jatim Park 2 • Sensor Telemetri Aktif</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReporting(v => !v)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-2 transition-colors shadow-xs"
                >
                  <AlertTriangle size={14} /> Laporkan Masalah Teknis
                </button>
              </div>
            </div>

            {/* Real-time Sensor Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Sensor Getaran Bearing</span>
                  <span className="text-teal-600 font-mono">Batas: &lt; 4.0g</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="font-display text-3xl text-slate-900">{sensor.getaran}g</p>
                  <span className="text-xs text-emerald-600 font-medium">Normal</span>
                </div>
                <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full transition-all duration-500" style={{ width: `${(sensor.getaran / 5) * 100}%` }} />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Sensor Suhu Motor Penggerak</span>
                  <span className="text-teal-600 font-mono">Batas: &lt; 65°C</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="font-display text-3xl text-slate-900">{sensor.suhu}°C</p>
                  <span className="text-xs text-emerald-600 font-medium">Stabil</span>
                </div>
                <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${(sensor.suhu / 80) * 100}%` }} />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Sensor Beban Rangkaian Kereta</span>
                  <span className="text-teal-600 font-mono">Batas: &lt; 90%</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="font-display text-3xl text-slate-900">{sensor.beban}%</p>
                  <span className="text-xs text-teal-600 font-medium">Operasional</span>
                </div>
                <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full transition-all duration-500" style={{ width: `${sensor.beban}%` }} />
                </div>
              </div>
            </div>

            {/* Incident Reporting Form Toggle */}
            {reporting && (
              <div className="bg-white border-2 border-red-200 rounded-lg p-6 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <p className="font-semibold text-slate-900 text-sm">Form Laporan Masalah Teknis Manual</p>
                  <button onClick={() => setReporting(false)} className="text-xs text-slate-400 hover:text-slate-600">✕ Tutup</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Kategori Masalah</label>
                    <div className="flex gap-4">
                      {['Mekanis', 'Kelistrikan', 'Sensor IoT'].map(k => (
                        <label key={k} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium cursor-pointer">
                          <input type="radio" name="kat" defaultChecked={k === 'Mekanis'} className="accent-teal-600" />
                          {k}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Tingkat Urgensi</label>
                    <select className="w-full text-xs border border-slate-200 rounded px-3 py-2 bg-white">
                      <option>Tinggi (Hentikan sementara wahana)</option>
                      <option>Sedang (Perlu pengecekan shift berikutnya)</option>
                      <option>Rendah (Pembersihan / pelumasan)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Deskripsi Temuan Lapangan</label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan detail indikasi kelainan atau bunyi gesekan abnormal..."
                    className="w-full text-xs border border-slate-200 rounded p-2.5 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setReporting(false)} className="text-xs px-4 py-2 border border-slate-200 rounded text-slate-600">
                    Batal
                  </button>
                  <button onClick={() => setReporting(false)} className="text-xs px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700">
                    Kirim ke Branch Admin &amp; Log Insiden
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LAPORAN TUGAS */}
        {tab === 'laporan' && (
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col gap-4">
            <p className="font-display text-xl text-slate-900 mb-1">Laporan Kerja &amp; Log Perawatan</p>
            <p className="text-xs text-slate-500 mb-3">Dokumentasi hasil inspeksi rutin dan tindak lanjut perbaikan teknis.</p>

            <div className="divide-y divide-slate-100 text-xs">
              {[
                { label: 'Laporan Harian Teknisi: 4 Nov 2026', status: 'Draft (Belum Dikirim)', date: 'Hari ini, 15:00' },
                { label: 'Kalibrasi Sensor Getaran: Roller Coaster Alpha', status: 'Terkirim', date: '3 Nov 2026, 17:30' },
                { label: 'Inspeksi Berkala Motor Hidrolik: Bianglala', status: 'Terkirim', date: '1 Nov 2026, 16:45' },
                { label: 'Laporan Mingguan: Oktober Minggu ke-4', status: 'Disetujui Branch Admin', date: '30 Okt 2026, 18:00' },
              ].map((r, i) => (
                <div key={i} className="py-3.5 flex justify-between items-center hover:bg-slate-50 px-2 rounded cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-slate-400" />
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{r.label}</p>
                      <p className="text-slate-400 mt-0.5">{r.date}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                    r.status.includes('Terkirim') || r.status.includes('Disetujui') ? 'bg-teal-50 text-teal-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROFIL */}
        {tab === 'profil' && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-16 h-16 bg-slate-900 rounded-md flex items-center justify-center text-white font-bold text-2xl shadow-xs">
                RH
              </div>
              <div>
                <p className="font-display text-xl text-slate-900">Rudi Hartono</p>
                <p className="text-xs text-slate-500">ID Pegawai: T-001 • Lisensi Teknisi Madya</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-teal-600 text-white font-semibold px-2 py-0.5 rounded-sm">
                    ON DUTY
                  </span>
                  <span className="text-xs text-slate-500">Shift Pagi: 08.00 - 17.00 WIB</span>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs mt-3">
              {[
                { title: 'Wahana Penugasan', desc: 'Roller Coaster Alpha, Drop Tower Vertigo' },
                { title: 'Jadwal Shift & Piket', desc: 'Senin - Jumat (08.00 - 17.00 WIB)' },
                { title: 'SOP Penanganan Anomali Sensor', desc: 'Prosedur eskalasi otomatis 5 menit' },
                { title: 'Log Riwayat Penanganan', desc: '48 insiden terselesaikan bulan ini' },
              ].map((item, idx) => (
                <div key={idx} className="py-3.5 flex justify-between items-center hover:bg-slate-50 px-2 rounded cursor-pointer">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                    <p className="text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar: ONLY on mobile (md:hidden) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white z-40 flex shadow-lg">
        {navTabs.map(t => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setIsMobileDetailOpen(false) }}
            className={`flex-1 py-3 text-xs font-medium flex flex-col items-center justify-center ${
              tab === t.id ? 'text-teal-600 font-semibold' : 'text-slate-400'
            }`}
          >
            {t.label.split(' ')[0]}
          </button>
        ))}
      </nav>
    </div>
  )
}
