import { useState, useEffect } from 'react'
import { Heart, Shield, QrCode, Bell, MapPin, ChevronRight } from 'lucide-react'
import AnimatedBar from '../components/AnimatedBar'

const destinations = [
  { name:'Jatim Park 2', occ:72, level:'Ramai' },
  { name:'BNS',          occ:45, level:'Sedang' },
  { name:'Selecta',      occ:28, level:'Lengang' },
]
const levelColor = { Ramai:'text-amber-600', Sedang:'text-teal-600', Lengang:'text-emerald-600' }

function SOSModal({ type, onClose }) {
  const [sent, setSent] = useState(false)
  function send() { setSent(true) }
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-t-2xl w-full max-w-sm p-6" onClick={e=>e.stopPropagation()}>
        {!sent ? (
          <>
            <p className="font-display text-xl text-slate-900 mb-2">Konfirmasi {type}</p>
            <p className="text-sm text-slate-600 mb-5">Petugas akan segera dikirim ke lokasi Anda. Lokasi: Zona Wahana Utama.</p>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded text-sm font-medium">Batalkan</button>
              <button onClick={send} className="flex-1 bg-red-600 text-white py-2.5 rounded text-sm font-semibold">Kirim Darurat</button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ChevronRight size={24} className="text-teal-600" />
            </div>
            <p className="font-semibold text-slate-900 mb-1">Petugas sedang menuju lokasi Anda</p>
            <p className="text-sm text-slate-500">Tetap tenang. Bantuan segera tiba.</p>
            <button onClick={onClose} className="mt-4 text-sm text-teal-600">Tutup</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function VisitorApp() {
  const [tab, setTab]     = useState('beranda')
  const [sos, setSos]     = useState(null) // null | 'Medis' | 'Keamanan'
  const [rating, setRating] = useState(0)
  const [tipe, setTipe]   = useState('Saran')
  const [komen, setKomen] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const tabs = [
    { id:'beranda', label:'Beranda' },
    { id:'destinasi', label:'Destinasi' },
    { id:'darurat', label:'Darurat' },
    { id:'profil', label:'Profil' },
  ]

  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center">
      {/* Phone frame at desktop */}
      <div className="w-full max-w-sm min-h-screen bg-white relative flex flex-col shadow-xl">

        {/* Screen content */}
        <div className="flex-1 overflow-y-auto pb-16">
          {/* BERANDA */}
          {tab === 'beranda' && (
            <div>
              <div className="bg-teal-600 px-5 py-5 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-display text-xl">Selamat datang, Andi</p>
                    <p className="text-teal-100 text-sm mt-0.5">Jatim Park 2 — Zona Wahana Utama</p>
                  </div>
                  <Bell size={20} className="text-teal-100" />
                </div>
              </div>

              <div className="p-5 flex flex-col gap-6">
                {/* Destinasi favorit */}
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-3">Destinasi Favorit</p>
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {[{name:'Jatim Park 2',occ:'Ramai'},{name:'BNS',occ:'Sedang'}].map((d, i) => (
                      <div key={i} className="flex-shrink-0 w-44 h-24 bg-slate-800 rounded-md relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-3">
                          <p className="text-white text-sm font-semibold">{d.name}</p>
                          <p className="text-white/70 text-xs">{d.occ}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kondisi destinasi */}
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-3">Kondisi Destinasi Hari Ini</p>
                  <div className="flex flex-col gap-3">
                    {destinations.map((d, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-700 font-medium">{d.name}</span>
                          <span className={`font-semibold ${levelColor[d.level]}`}>{d.level} ({d.occ}%)</span>
                        </div>
                        <AnimatedBar value={d.occ} color={d.occ > 60 ? 'amber' : 'teal'} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fasilitas */}
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-3">Fasilitas Terkini</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      ['Parkir Jatim Park 2','Tersedia','teal'],
                      ['Toilet Area Utama','Tersedia','teal'],
                      ['Food Court','Ramai','amber'],
                      ['Musholla','Tersedia','teal'],
                    ].map(([k, v, c]) => (
                      <div key={k} className="bg-slate-50 rounded px-3 py-2.5">
                        <p className="text-xs text-slate-500">{k}</p>
                        <p className={`text-sm font-semibold mt-0.5 ${c==='amber'?'text-amber-600':'text-teal-600'}`}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cuaca */}
                <div className="bg-slate-50 rounded-md px-4 py-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Cuaca &amp; Kondisi</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[['Suhu Udara','24°C'],['Kelembaban','72%'],['Kualitas Udara','Baik'],['Angin','12 km/h']].map(([l,v]) => (
                      <div key={l}><p className="text-xs text-slate-500">{l}</p><p className="font-display text-lg text-slate-800">{v}</p></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DARURAT */}
          {tab === 'darurat' && (
            <div className="p-5 flex flex-col gap-6">
              <div className="bg-red-50 border border-red-100 rounded px-4 py-3">
                <p className="text-sm text-red-700 font-semibold">Gunakan hanya dalam keadaan darurat nyata</p>
                <p className="text-xs text-red-500 mt-0.5">Penyalahgunaan dapat dikenai sanksi.</p>
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={() => setSos('Medis')}
                  className="w-full bg-red-600 text-white rounded-md px-5 py-5 text-left">
                  <div className="flex items-start gap-4">
                    <Heart size={28} />
                    <div>
                      <p className="font-display text-lg">Darurat Medis</p>
                      <p className="text-red-200 text-sm mt-1">Tim medis akan dikirim ke lokasi Anda segera.</p>
                    </div>
                  </div>
                </button>
                <button onClick={() => setSos('Keamanan')}
                  className="w-full bg-orange-500 text-white rounded-md px-5 py-5 text-left">
                  <div className="flex items-start gap-4">
                    <Shield size={28} />
                    <div>
                      <p className="font-display text-lg">Gangguan Keamanan</p>
                      <p className="text-orange-100 text-sm mt-1">Petugas keamanan akan segera merespons.</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="bg-slate-50 rounded-md px-4 py-3">
                <p className="text-xs text-slate-500 mb-1">Lokasi Anda Saat Ini</p>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-teal-600" />
                  <p className="text-sm font-medium text-slate-800">Zona Wahana Utama, Jatim Park 2</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-500 mb-2">Belum check-in? Pindai kode QR di area wahana untuk akurasi lokasi.</p>
                <button className="w-full border border-teal-600 text-teal-600 text-sm font-semibold py-2.5 rounded flex items-center justify-center gap-2">
                  <QrCode size={16} /> Pindai QR
                </button>
              </div>
            </div>
          )}

          {/* DESTINASI (Rating form) */}
          {tab === 'destinasi' && (
            <div className="p-5 flex flex-col gap-5">
              <p className="font-display text-lg text-slate-900">Jatim Park 2 — Roller Coaster Alpha</p>
              {!submitted ? (
                <>
                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2">Rating Wahana</p>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(s => (
                        <button key={s} onClick={() => setRating(s)}
                          className={`text-2xl ${s <= rating ? 'text-amber-400' : 'text-slate-200'}`}>★</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700 mb-2">Kategori</p>
                    <div className="flex gap-3">
                      {['Saran','Kritik'].map(t => (
                        <label key={t} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="tipe" checked={tipe===t} onChange={() => setTipe(t)} className="accent-teal-600" />
                          <span className="text-sm text-slate-700">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-2">Masukan</label>
                    <textarea value={komen} onChange={e=>setKomen(e.target.value)} rows={4}
                      placeholder="Tuliskan masukan Anda..."
                      className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500 resize-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-2">Foto (opsional)</label>
                    <div className="border-2 border-dashed border-slate-200 rounded px-4 py-5 text-center text-xs text-slate-400">
                      Ketuk untuk unggah foto
                    </div>
                  </div>
                  <button onClick={() => { if (rating && komen) setSubmitted(true) }}
                    className="w-full bg-teal-600 text-white text-sm font-semibold py-2.5 rounded hover:bg-teal-700">
                    Kirim Masukan
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="font-semibold text-teal-700 mb-2">Masukan terkirim, terima kasih!</p>
                  <button onClick={() => { setSubmitted(false); setRating(0); setKomen('') }} className="text-sm text-teal-600">Kirim lagi</button>
                </div>
              )}
            </div>
          )}

          {/* PROFIL */}
          {tab === 'profil' && (
            <div className="p-5 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-teal-600 rounded-md flex items-center justify-center text-white font-bold text-xl">A</div>
                <div>
                  <p className="font-semibold text-slate-900">Andi Pratama</p>
                  <p className="text-sm text-slate-500">Pengunjung</p>
                </div>
              </div>
              {['Riwayat Kunjungan','Masukan Saya','Pengaturan Akun','Bantuan'].map(item => (
                <div key={item} className="flex justify-between items-center py-3 border-b border-slate-100 text-sm text-slate-700">
                  {item} <ChevronRight size={16} className="text-slate-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm border-t border-slate-200 bg-white flex">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 py-3 text-xs font-medium ${tab===t.id ? 'text-teal-600' : 'text-slate-400'} ${t.id==='darurat'?'text-red-500':''}`}>
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      {sos && <SOSModal type={sos} onClose={() => setSos(null)} />}
    </div>
  )
}

