import { useState } from 'react'
import { ArrowLeft, FileText, Download, CheckCircle, XCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import AnimatedBar from '../components/AnimatedBar'

const factors = [
  { label:'Pertumbuhan Pengunjung', value:90 },
  { label:'Tingkat Okupansi',       value:88 },
  { label:'Sentimen Positif',       value:82 },
  { label:'Potensi Ekonomi',        value:85 },
  { label:'Aksesibilitas',          value:84 },
  { label:'Keunikan Konsep',        value:88 },
]

const incidents = [
  { tanggal:'28 Okt 2026', tipe:'Teknis', severity:'Rendah',  status:'Selesai' },
  { tanggal:'15 Okt 2026', tipe:'Medis',  severity:'Rendah',  status:'Selesai' },
  { tanggal:'2 Okt 2026',  tipe:'Teknis', severity:'Sedang',  status:'Selesai' },
]

export default function ExpansionApproval() {
  const navigate = useNavigate()
  const [catatan,  setCatatan]  = useState('')
  const [decision, setDecision] = useState(null) // null | 'approved' | 'rejected'

  function handleDecide(type) {
    setDecision(type)
    setTimeout(() => navigate('/gov-admin'), 2200)
  }

  return (
    <PageWrapper role="gov" active="/expansion-approval">
      {({ toggleSidebar }) => (
        <>
          <Topbar title="Telaah Proposal"
            breadcrumb={[{label:'Dashboard Pemerintah',to:'/gov-admin'},{label:'Telaah Proposal'}]}
            onMenuClick={toggleSidebar} />
          <main className="p-4 sm:p-6">
            <div className="grid md:grid-cols-9 gap-6">
              {/* Left: proposal detail */}
              <div className="md:col-span-5 flex flex-col gap-6">
                <div className="bg-white border border-slate-200 rounded-md p-6">
                  <p className="text-xs text-teal-600 uppercase tracking-widest font-semibold mb-2">PRO-2026-047</p>
                  <h1 className="font-display text-2xl text-slate-900 mb-1">Pembangunan Wahana Ekstrem Baru</h1>
                  <p className="text-slate-500 text-sm mb-5">Jatim Park 3 — Diajukan: 28 Oktober 2026 oleh Branch Admin</p>

                  <div className="flex flex-col gap-4 text-sm text-slate-700 leading-relaxed">
                    <p>Jatim Park 3 mengajukan permohonan dukungan pembangunan satu unit wahana ekstrem kategori roller coaster dengan ketinggian trek 32 meter dan kecepatan maksimum 90 km/jam. Wahana ini direncanakan beroperasi pada Q3 2027 dan dirancang untuk meningkatkan kapasitas kunjungan harian sebesar 320 orang.</p>
                    <p>Berdasarkan data kunjungan dua tahun terakhir, Jatim Park 3 mencatat tren pertumbuhan rata-rata 14% per tahun dengan tingkat kepuasan pengunjung 88% pada wahana ekstrem yang sudah ada. Penambahan wahana baru diproyeksikan meningkatkan pendapatan destinasi sebesar Rp 1,8 miliar per tahun.</p>
                    <p>Dukungan yang dimohonkan meliputi kemudahan perizinan pembangunan, koordinasi dengan Dinas PUPR untuk perkuatan infrastruktur jalan akses, serta fasilitasi untuk mendatangkan kontraktor wahana berlisensi internasional.</p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    {[
                      { label:'Estimasi Biaya', value:'Rp 4,2 M' },
                      { label:'Proyeksi Pendapatan', value:'Rp 1,8 M/thn' },
                      { label:'Payback Period', value:'2.3 tahun' },
                      { label:'Kapasitas Tambahan', value:'+320 org/hari' },
                      { label:'Investasi Infrastruktur', value:'Rp 1,1 M' },
                      { label:'Timeline Konstruksi', value:'18 bulan' },
                    ].map((f, i) => (
                      <div key={i} className="bg-slate-50 rounded px-3 py-2.5">
                        <p className="text-xs text-slate-500 mb-0.5">{f.label}</p>
                        <p className="font-semibold text-slate-900">{f.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Dokumen Lampiran</p>
                    <div className="flex flex-col gap-2">
                      {['Studi Kelayakan Wahana Ekstrem 2026.pdf', 'RAB Konstruksi Jatim Park 3.xlsx', 'Desain Teknis Roller Coaster.pdf'].map((doc, i) => (
                        <div key={i} className="flex items-center justify-between gap-3 bg-slate-50 rounded px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <FileText size={14} className="text-slate-400 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{doc}</span>
                          </div>
                          <button className="text-teal-600 hover:text-teal-700"><Download size={14} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: score + decision */}
              <div className="md:col-span-4 flex flex-col gap-5">
                {/* Score */}
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-1">Analisis Skor Ekspansi</p>
                  <p className="text-xs text-slate-500 mb-4">Jatim Park 3 — Q4 2026</p>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-display text-4xl sm:text-5xl text-teal-600">86.2</span>
                    <div>
                      <p className="text-xs text-slate-500">dari 100 poin</p>
                      <p className="text-xs font-semibold text-emerald-700 mt-1">Peringkat #1 dari 7</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {factors.map((f, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">{f.label}</span>
                          <span className="font-semibold text-teal-600">{f.value}</span>
                        </div>
                        <AnimatedBar value={f.value} color="teal" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Incidents */}
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Riwayat Insiden 30 Hari</p>
                  <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-left">
                      {['Tanggal','Tipe','Severity','Status'].map(h => <th key={h} className="pb-2 pr-3 font-semibold">{h}</th>)}
                    </tr></thead>
                    <tbody>{incidents.map((r, i) => (
                      <tr key={i} className="border-b border-slate-50 last:border-0">
                        <td className="py-1.5 pr-3 text-slate-500">{r.tanggal}</td>
                        <td className="py-1.5 pr-3 text-slate-700">{r.tipe}</td>
                        <td className="py-1.5 pr-3 text-slate-600">{r.severity}</td>
                        <td className="py-1.5"><span className="text-xs text-emerald-700 font-semibold">{r.status}</span></td>
                      </tr>
                    ))}</tbody>
                  </table>
                  </div>
                </div>

                {/* Decision */}
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Keputusan Evaluasi</p>
                  <div className="mb-4">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Catatan Evaluasi <span className="text-red-500">*</span></label>
                    <textarea value={catatan} onChange={e=>setCatatan(e.target.value)} rows={3}
                      placeholder="Tuliskan catatan dan pertimbangan evaluasi..."
                      className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500 resize-none" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => handleDecide('approved')}
                      className="w-full bg-teal-600 text-white text-sm font-semibold py-2.5 rounded hover:bg-teal-700 flex items-center justify-center gap-2">
                      <CheckCircle size={16} /> Setujui Proposal
                    </button>
                    <button onClick={() => handleDecide('rejected')}
                      className="w-full border border-red-300 text-red-600 text-sm font-semibold py-2.5 rounded hover:bg-red-50 flex items-center justify-center gap-2">
                      <XCircle size={16} /> Tolak Proposal
                    </button>
                  </div>
                  {decision && (
                    <div className={`mt-3 text-sm font-medium text-center py-2 rounded ${decision==='approved'?'bg-emerald-50 text-emerald-700':'bg-red-50 text-red-700'}`}>
                      {decision==='approved' ? 'Proposal disetujui. Mengalihkan...' : 'Proposal ditolak. Mengalihkan...'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </PageWrapper>
  )
}

