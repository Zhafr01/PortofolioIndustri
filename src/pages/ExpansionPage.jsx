import { useState } from 'react'
import { Send } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import StatBlock from '../components/StatBlock'
import AnimatedBar from '../components/AnimatedBar'

const factors = [
  { label: 'Pertumbuhan Pengunjung', value: 79 },
  { label: 'Tingkat Okupansi', value: 82 },
  { label: 'Sentimen Positif', value: 71 },
  { label: 'Potensi Ekonomi', value: 74 },
  { label: 'Aksesibilitas', value: 80 },
  { label: 'Keunikan Konsep', value: 72 },
]

const history = [
  { periode: 'Q4 2026 (saat ini)', skor: 76.3, rank: '#4', delta: '+3.2', up: true },
  { periode: 'Q3 2026', skor: 73.1, rank: '#4', delta: '+1.8', up: true },
  { periode: 'Q2 2026', skor: 71.3, rank: '#5', delta: '+2.1', up: true },
  { periode: 'Q1 2026', skor: 69.2, rank: '#5', delta: '-0.5', up: false },
  { periode: 'Q4 2025 (Hist.)', skor: 69.7, rank: '#4', delta: '+1.2', up: true },
]

export default function ExpansionPage() {
  const [judul, setJudul] = useState('')
  const [jenis, setJenis] = useState('Pembangunan Wahana Baru')
  const [biaya, setBiaya] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit() {
    if (!judul.trim()) { setError('Judul proposal tidak boleh kosong.'); return }
    setError('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 4000)
    setJudul(''); setBiaya(''); setDeskripsi('')
  }

  return (
    <PageWrapper role="branch" active="/expansion">
      {({ toggleSidebar }) => (
        <>
          <Topbar title="Prediksi Ekspansi"
            breadcrumb={[{ label: 'Dashboard', to: '/branch-admin' }, { label: 'Prediksi Ekspansi' }]}
            onMenuClick={toggleSidebar} />
          <main className="p-4 sm:p-6 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatBlock label="Skor Ekspansi" value="76.3" sub="dari 100 poin" color="teal" />
              <StatBlock label="Peringkat Regional" value="#4" sub="dari 7 destinasi" />
              <StatBlock label="Periode Penilaian" value="Q4 2026" sub="Diperbarui Okt 2026" />
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 flex flex-col gap-6">
                {/* Score hero */}
                <div className="bg-slate-900 rounded-md p-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Jatim Park 2 — Skor Ekspansi</p>
                    <p className="font-display text-5xl sm:text-6xl text-teal-400">76.3</p>
                    <p className="text-slate-400 text-sm mt-1">/ 100 poin</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-300 text-sm">Peringkat <span className="text-teal-400 font-bold">#4</span> dari 7</p>
                    <p className="text-slate-500 text-xs mt-1">Potensi: <span className="text-emerald-400 font-semibold">Baik</span></p>
                    <p className="text-slate-500 text-xs mt-1">Tren: Naik 3.2 poin dari Q3</p>
                  </div>
                </div>

                {/* Factors */}
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Rincian Faktor Skor</p>
                  <div className="bg-teal-50 border border-teal-100 rounded px-3 py-2 text-xs text-teal-800 mb-4">
                    Skor dihitung menggunakan model AHP (Analytical Hierarchy Process). Data bersumber dari smart gate counter, sentimen ulasan, dan histori kunjungan.
                  </div>
                  <div className="flex flex-col gap-3.5">
                    {factors.map((f, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-700 font-medium">{f.label}</span>
                          <span className="text-teal-600 font-semibold">{f.value} / 100</span>
                        </div>
                        <AnimatedBar value={f.value} color="teal" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* History */}
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Riwayat Skor per Kuartal</p>
                  <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wide text-left">
                      {['Periode', 'Skor', 'Peringkat', 'Perubahan'].map(h => <th key={h} className="pb-2 pr-4 font-semibold">{h}</th>)}
                    </tr></thead>
                    <tbody>{history.map((h, i) => (
                      <tr key={i} className="border-b border-slate-50 last:border-0">
                        <td className="py-2 pr-4 text-slate-700">{h.periode}</td>
                        <td className="py-2 pr-4 font-semibold text-teal-600">{h.skor}</td>
                        <td className="py-2 pr-4 text-slate-600">{h.rank}</td>
                        <td className={`py-2 font-semibold ${h.up ? 'text-emerald-600' : 'text-red-500'}`}>{h.delta}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col gap-5">
                {/* Proposal form */}
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-1">Ajukan Proposal Ekspansi</p>
                  <p className="text-xs text-slate-500 mb-4">Proposal akan ditelaah oleh Dinas Pariwisata Kota Batu berdasarkan skor ekspansi destinasi Anda.</p>

                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Judul Proposal</label>
                      <input value={judul} onChange={e => { setJudul(e.target.value); setError('') }}
                        placeholder="cth: Pembangunan Wahana Baru 2027"
                        className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500" />
                      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Jenis Proposal</label>
                      <select value={jenis} onChange={e => setJenis(e.target.value)} className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500">
                        <option>Pembangunan Wahana Baru</option>
                        <option>Perbaikan Fasilitas</option>
                        <option>Bantuan Infrastruktur Jalan</option>
                        <option>Pengembangan Area Parkir</option>
                        <option>Lainnya</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Estimasi Biaya (Rp)</label>
                      <input value={biaya} onChange={e => setBiaya(e.target.value)} placeholder="cth: 2.500.000.000"
                        className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Deskripsi Proposal</label>
                      <textarea value={deskripsi} onChange={e => setDeskripsi(e.target.value)} rows={4} placeholder="Jelaskan rencana dan justifikasi proposal..."
                        className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500 resize-none" />
                    </div>
                    <button onClick={handleSubmit}
                      className="flex items-center justify-center gap-2 bg-teal-600 text-white text-sm font-semibold px-4 py-2.5 rounded hover:bg-teal-700">
                      <Send size={14} /> Kirim Proposal
                    </button>
                    {success && (
                      <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-3 py-2">
                        Proposal berhasil dikirim. Anda akan menerima notifikasi ketika proposal ditinjau.
                      </p>
                    )}
                  </div>
                </div>

                {/* History */}
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Riwayat Proposal</p>
                  <div className="flex flex-col gap-3 text-sm">
                    {[
                      { title: 'Perbaikan Sistem Drainase Area Air', date: '15 Sep 2026', status: 'Disetujui', color: 'teal' },
                      { title: 'Penambahan Kapasitas Parkir Barat', date: '2 Jul 2026', status: 'Dalam Telaah', color: 'slate' },
                    ].map((p, i) => (
                      <div key={i} className={`pl-3 border-l-2 ${p.color === 'teal' ? 'border-teal-500' : 'border-slate-200'}`}>
                        <p className="font-medium text-slate-800">{p.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{p.date}</p>
                        <p className={`text-xs font-semibold mt-1 ${p.color === 'teal' ? 'text-teal-600' : 'text-amber-600'}`}>{p.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </PageWrapper>
  )
}

