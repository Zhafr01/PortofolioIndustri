import { useState, useEffect } from 'react'
import { Camera, ChevronRight, FileText } from 'lucide-react'

const alertData = [
  { id:'AL-001', tipe:'Teknis', subtipe:'Sensor', wahana:'Roller Coaster Alpha', waktu:'14:32', age:'2 menit lalu', status:'Dilaporkan',   urgent:true },
  { id:'AL-002', tipe:'Teknis', subtipe:'Manual', wahana:'Bianglala Raksasa',    waktu:'13:15', age:'1 jam lalu',   status:'Dalam Proses', urgent:false },
  { id:'AL-005', tipe:'Teknis', subtipe:'Sensor', wahana:'Drop Tower Vertigo',   waktu:'09:55', age:'4 jam lalu',   status:'Selesai',      urgent:false },
]

const statusClass = {
  'Dilaporkan':'bg-red-50 text-red-700 border border-red-200',
  'Diakui':'bg-blue-50 text-blue-700',
  'Dalam Proses':'bg-amber-50 text-amber-700',
  'Selesai':'bg-slate-100 text-slate-500',
}

const steps = ['Dilaporkan','Diakui','Dalam Proses','Selesai']

function rand(base, pct = 5) {
  return +(base * (1 + (Math.random() - 0.5) * pct / 100)).toFixed(1)
}

export default function TechnicalApp() {
  const [tab, setTab]     = useState('alerts')
  const [filterTab, setFilterTab] = useState('Semua')
  const [screen, setScreen] = useState('list') // 'list'|'update'|'penjaga'
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [log, setLog]     = useState('')
  const [newStatus, setNewStatus] = useState('Diakui')
  const [saved, setSaved] = useState(false)
  const [reporting, setReporting] = useState(false)
  const [sensor, setSensor] = useState({ getaran:2.3, suhu:42, beban:78 })

  useEffect(() => {
    const id = setInterval(() => {
      setSensor(s => ({ getaran:rand(s.getaran,5), suhu:rand(s.suhu,3), beban:rand(s.beban,4) }))
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const filtered = filterTab === 'Semua' ? alertData : alertData.filter(a => a.tipe === filterTab)

  const filterTabs = ['Semua','Teknis','Medis','Keamanan']
  const navTabs = [
    { id:'beranda', label:'Beranda' },
    { id:'alerts',  label:'Alert (2)' },
    { id:'laporan', label:'Laporan' },
    { id:'profil',  label:'Profil' },
  ]

  function openUpdate(alert) { setSelectedAlert(alert); setScreen('update'); setSaved(false) }

  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center">
      <div className="w-full max-w-sm min-h-screen bg-white relative flex flex-col shadow-xl">

        {/* Top header */}
        <div className="bg-slate-900 px-5 py-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-display text-lg">Halo, Rudi Hartono</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-300">Teknisi Wahana</span>
                <span className="text-xs bg-teal-600 text-white font-semibold px-2 py-0.5 rounded-sm">ON DUTY</span>
              </div>
            </div>
            <div className="text-right text-xs text-slate-400">
              <p>Jatim Park 2</p>
              <p>Wahana Ekstrem</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-16">
          {/* ALERTS SCREEN */}
          {tab === 'alerts' && screen === 'list' && (
            <div className="p-4 flex flex-col gap-4">
              {/* Filter tabs */}
              <div className="flex border-b border-slate-100 gap-4">
                {filterTabs.map(t => (
                  <button key={t} onClick={() => setFilterTab(t)}
                    className={`pb-2 text-xs font-medium ${filterTab===t?'border-b-2 border-teal-600 text-teal-600':'text-slate-400'}`}>
                    {t}
                  </button>
                ))}
              </div>

              {filtered.map((a, i) => (
                <div key={i}
                  className={`border-l-4 pl-3 pr-3 py-3 rounded-r-md ${
                    a.urgent ? 'border-red-500 bg-red-50 alert-urgent'
                    : a.status === 'Selesai' ? 'border-slate-200 bg-slate-50 opacity-70'
                    : 'border-amber-400 bg-amber-50'
                  }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className={`text-xs font-bold uppercase ${a.urgent?'text-red-700':'text-amber-700'}`}>
                        {a.tipe} — {a.subtipe}
                      </p>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{a.wahana}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{a.waktu} · {a.age}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${statusClass[a.status]}`}>{a.status}</span>
                  </div>
                  {a.status !== 'Selesai' && (
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => openUpdate(a)}
                        className="flex-1 bg-teal-600 text-white text-xs font-semibold py-2 rounded">
                        {a.status === 'Dilaporkan' ? 'Akui Alert' : 'Perbarui Status'}
                      </button>
                      <button className="border border-slate-200 text-slate-600 text-xs px-3 py-2 rounded">Detail</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* STATUS UPDATE SCREEN */}
          {tab === 'alerts' && screen === 'update' && selectedAlert && (
            <div className="p-4 flex flex-col gap-5">
              <button onClick={() => setScreen('list')} className="text-sm text-teal-600 flex items-center gap-1">
                ← Kembali ke daftar
              </button>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Detail Alert</p>
                <p className="font-semibold text-slate-900">{selectedAlert.tipe} — {selectedAlert.subtipe}</p>
                <p className="text-sm text-slate-700">{selectedAlert.wahana}</p>
                <p className="text-xs text-slate-400 mt-1">{selectedAlert.waktu} · {selectedAlert.age}</p>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-3">Status Penanganan</p>
                <div className="flex flex-col gap-0">
                  {steps.map((s, i) => {
                    const idx = steps.indexOf(selectedAlert.status)
                    const done = i <= idx
                    return (
                      <div key={s} className="flex gap-3 items-start">
                        <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 ${done?'bg-teal-600 text-white':'bg-slate-100 text-slate-400'}`}>{i+1}</div>
                        <div className="pb-4">
                          <p className={`text-sm ${done?'text-teal-700 font-semibold':'text-slate-400'}`}>{s}</p>
                          {i < steps.length-1 && <div className="mt-1 ml-0 w-px h-4 bg-slate-200" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Ubah Status</label>
                <select value={newStatus} onChange={e=>setNewStatus(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500">
                  {steps.filter(s=>s!=='Dilaporkan').map(s=><option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Catatan Tindakan</label>
                <textarea value={log} onChange={e=>setLog(e.target.value)} rows={4}
                  placeholder="Deskripsikan tindakan yang dilakukan..."
                  className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500 resize-none" />
              </div>

              <button className="w-full border border-slate-200 text-slate-600 text-sm py-2.5 rounded flex items-center justify-center gap-2">
                <Camera size={16} /> Unggah Foto
              </button>

              {!saved ? (
                <button onClick={() => setSaved(true)} className="w-full bg-teal-600 text-white text-sm font-semibold py-2.5 rounded">
                  Simpan Pembaruan
                </button>
              ) : (
                <div className="bg-emerald-50 text-emerald-700 text-sm text-center py-3 rounded font-medium">
                  Status diperbarui. <button onClick={() => setScreen('list')} className="underline">Kembali</button>
                </div>
              )}
            </div>
          )}

          {/* PENJAGA WAHANA SCREEN */}
          {tab === 'beranda' && screen !== 'update' && (
            <div className="p-4 flex flex-col gap-6">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Wahana Ditugaskan</p>
                <p className="font-display text-xl text-slate-900">Roller Coaster Alpha</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-700 mb-3">Pembacaan Sensor Real-time</p>
                <div className="grid grid-cols-3 gap-4">
                  {[['Getaran', sensor.getaran+'g'], ['Suhu', sensor.suhu+'°C'], ['Beban', sensor.beban+'%']].map(([l,v]) => (
                    <div key={l} className="bg-slate-50 rounded px-3 py-3 text-center">
                      <p className="text-xs text-slate-500">{l}</p>
                      <p className="font-display text-xl text-slate-900 mt-1">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setReporting(v => !v)}
                className="w-full border-2 border-red-500 text-red-600 text-sm font-semibold py-3 rounded">
                Laporkan Masalah Teknis
              </button>

              {reporting && (
                <div className="flex flex-col gap-3 border border-slate-200 rounded-md p-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Deskripsi Masalah</label>
                    <textarea rows={3} placeholder="Jelaskan masalah yang ditemukan..."
                      className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500 resize-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Kategori</label>
                    <div className="flex gap-3">
                      {['Mekanis','Listrik','Lainnya'].map(k => (
                        <label key={k} className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer">
                          <input type="radio" name="kat" defaultChecked={k==='Mekanis'} className="accent-teal-600" />
                          {k}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setReporting(false)} className="bg-red-600 text-white text-sm font-semibold py-2.5 rounded">
                    Kirim Laporan
                  </button>
                </div>
              )}

              <div className="border-t border-slate-100 pt-4">
                <p className="text-sm font-semibold text-slate-900 mb-3">Alert Aktif</p>
                <button onClick={() => setTab('alerts')} className="w-full text-left bg-red-50 border border-red-100 rounded px-4 py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-red-700">2 alert aktif</p>
                    <p className="text-xs text-red-400">Memerlukan tindakan</p>
                  </div>
                  <ChevronRight size={16} className="text-red-400" />
                </button>
              </div>
            </div>
          )}

          {/* LAPORAN */}
          {tab === 'laporan' && (
            <div className="p-4 flex flex-col gap-5">
              <p className="font-display text-lg text-slate-900">Laporan Kerja</p>
              {[
                { label:'Laporan Harian — 4 Nov 2026', status:'Belum dikirim' },
                { label:'Laporan Mingguan — Okt W4',  status:'Terkirim' },
              ].map((r, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{r.label}</p>
                    <p className={`text-xs mt-0.5 ${r.status==='Terkirim'?'text-teal-600':'text-amber-600'}`}>{r.status}</p>
                  </div>
                  <FileText size={16} className="text-slate-400" />
                </div>
              ))}
            </div>
          )}

          {/* PROFIL */}
          {tab === 'profil' && (
            <div className="p-4 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-teal-600 rounded-md flex items-center justify-center text-white font-bold text-xl">RH</div>
                <div>
                  <p className="font-semibold text-slate-900">Rudi Hartono</p>
                  <p className="text-sm text-slate-500">Teknisi Wahana · ID: T-001</p>
                  <span className="text-xs bg-teal-100 text-teal-700 font-semibold px-2 py-0.5 rounded-sm">ON DUTY</span>
                </div>
              </div>
              {['Riwayat Alert','Jadwal Shift','Pengaturan','Bantuan'].map(item => (
                <div key={item} className="flex justify-between items-center py-3 border-b border-slate-100 text-sm text-slate-700">
                  {item} <ChevronRight size={16} className="text-slate-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm border-t border-slate-200 bg-white flex">
          {navTabs.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); if(t.id!=='alerts') setScreen('list') }}
              className={`flex-1 py-3 text-xs font-medium ${tab===t.id?'text-teal-600':'text-slate-400'}`}>
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

