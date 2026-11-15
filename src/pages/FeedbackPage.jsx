import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import StatBlock from '../components/StatBlock'
import BarChartWidget from '../components/BarChartWidget'
import { MessageSquare, X, CheckCircle2, Send } from 'lucide-react'

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

const initialFeedbacks = [
  { id: 1, waktu:'04 Nov 14:20', user:'Andi S.', wahana:'Roller Coaster Alpha', tipe:'Saran',  sentimen:'Positif', text:'Wahana keren dan seru banget!', status: 'Belum Dibalas', balasan: '' },
  { id: 2, waktu:'04 Nov 12:45', user:'Rina K.', wahana:'Flying Fox Highland',  tipe:'Kritik', sentimen:'Negatif', text:'Antrian terlalu panjang, kurang efisien.', status: 'Belum Dibalas', balasan: '' },
  { id: 3, waktu:'04 Nov 11:30', user:'Budi M.', wahana:'Bianglala Raksasa',    tipe:'Saran',  sentimen:'Positif', text:'Pemandangannya bagus sekali dari atas.', status: 'Ditindaklanjuti', balasan: 'Terima kasih atas apresiasinya! Kami terus menjaga kebersihan kaca gondola.' },
  { id: 4, waktu:'04 Nov 10:15', user:'Ani P.', wahana:'Food Court',           tipe:'Kritik', sentimen:'Netral',  text:'Makanan standar, harga cukup wajar.', status: 'Belum Dibalas', balasan: '' },
  { id: 5, waktu:'04 Nov 09:40', user:'Dani L.', wahana:'Mini Train Junior',    tipe:'Saran',  sentimen:'Positif', text:'Anak-anak sangat senang, tambah jadwal!', status: 'Belum Dibalas', balasan: '' },
  { id: 6, waktu:'04 Nov 09:10', user:'Siti H.', wahana:'Drop Tower Vertigo',   tipe:'Kritik', sentimen:'Negatif', text:'Petugas kurang ramah saat briefing.', status: 'Ditindaklanjuti', balasan: 'Mohon maaf atas ketidaknyamanan Anda. Kami telah mengevaluasi staf terkait dalam briefing pagi.' },
  { id: 7, waktu:'03 Nov 17:30', user:'Hendra W.', wahana:'Arung Jeram',       tipe:'Saran',  sentimen:'Positif', text:'Menantang dan menyegarkan!', status: 'Belum Dibalas', balasan: '' },
  { id: 8, waktu:'03 Nov 16:00', user:'Maya T.', wahana:'Roller Coaster Alpha', tipe:'Kritik', sentimen:'Netral',  text:'Tinggi minimum perlu diperjelas di pintu.', status: 'Belum Dibalas', balasan: '' },
  { id: 9, waktu:'03 Nov 14:20', user:'Rio F.', wahana:'Flying Fox Highland',  tipe:'Saran',  sentimen:'Positif', text:'Instruktur sangat profesional.', status: 'Belum Dibalas', balasan: '' },
  { id: 10, waktu:'03 Nov 13:00', user:'Nita S.', wahana:'Bianglala Raksasa',   tipe:'Kritik', sentimen:'Negatif', text:'Gondola terasa agak goyah, perlu cek.', status: 'Ditindaklanjuti', balasan: 'Teknisi kami telah melakukan inspeksi hidrolik dan memastikan seluruh pengunci aman.' },
]

const sentimentColor = { Positif:'text-emerald-700 bg-emerald-50', Negatif:'text-red-700 bg-red-50', Netral:'text-slate-600 bg-slate-100' }

function Stars({ score }) {
  return (
    <span className="text-amber-400 text-sm">
      {'★'.repeat(Math.floor(score))}{'☆'.repeat(5 - Math.floor(score))}
    </span>
  )
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks)
  const [tipeF, setTipeF] = useState('')
  const [sentF, setSentF] = useState('')
  const [replyModal, setReplyModal] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  const filtered = feedbacks.filter(f =>
    (!tipeF || f.tipe === tipeF) && (!sentF || f.sentimen === sentF)
  )

  function openReplyModal(item) {
    setReplyModal(item)
    setReplyText(item.balasan || 'Terima kasih atas masukannya. Masukan Anda telah kami teruskan ke tim operasional terkait.')
  }

  function handleSendReply() {
    if (!replyModal) return
    setFeedbacks(prev => prev.map(f => f.id === replyModal.id ? { ...f, status: 'Ditindaklanjuti', balasan: replyText } : f))
    setToastMsg(`✓ Tanggapan berhasil dikirim ke pengunjung (${replyModal.user}).`)
    setTimeout(() => setToastMsg(''), 3000)
    setReplyModal(null)
  }

  return (
    <PageWrapper role="branch" active="/feedback">
      {({ toggleSidebar }) => (
        <>
          <Topbar title="Kritik &amp; Saran"
            breadcrumb={[{label:'Dashboard',to:'/branch-admin'},{label:'Kritik & Saran'}]}
            onMenuClick={toggleSidebar} />

          {toastMsg && (
            <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl text-xs font-medium border border-slate-700 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={16} className="text-teal-400" />
              <span>{toastMsg}</span>
            </div>
          )}

          <main className="p-4 sm:p-6 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatBlock label="Total Masukan Bulan Ini" value="234" sub="Semua tipe" />
              <StatBlock label="Sentimen Positif" value="71%" sub="dari total masukan" color="green" />
              <StatBlock label="Rating Rata-rata" value="4.2/5" sub="Semua wahana" color="teal" />
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 flex flex-col gap-6">
                {/* Donut */}
                <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Distribusi Sentimen Pengunjung</p>
                  <div className="flex items-center gap-6">
                    <div className="w-36 h-36 flex-shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={sentimentData} innerRadius={38} outerRadius={62} dataKey="value" stroke="none">
                            {sentimentData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-2">
                      {sentimentData.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                          {s.name}: <strong className="text-slate-800">{s.value}%</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Bar */}
                <BarChartWidget data={topWahana} title="Wahana Paling Sering Dikomentari" layout="vertical" />
              </div>

              <div className="md:col-span-2 bg-white border border-slate-200 rounded-md p-5 shadow-xs">
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
            <div className="bg-white border border-slate-200 rounded-md shadow-xs">
              <div className="flex flex-wrap gap-3 p-5 border-b border-slate-100 items-center justify-between">
                <div className="flex gap-2">
                  <select value={tipeF} onChange={e=>setTipeF(e.target.value)} className="text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-teal-500 bg-white">
                    <option value="">Semua Tipe</option><option>Kritik</option><option>Saran</option>
                  </select>
                  <select value={sentF} onChange={e=>setSentF(e.target.value)} className="text-xs border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-teal-500 bg-white">
                    <option value="">Semua Sentimen</option><option>Positif</option><option>Negatif</option><option>Netral</option>
                  </select>
                </div>
                <span className="text-xs text-slate-500">Menampilkan {filtered.length} masukan</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-left bg-slate-50">
                    {['Waktu','Pengunjung','Wahana','Tipe','Sentimen','Pesan Masukan','Status','Aksi'].map(h =>
                      <th key={h} className="px-4 py-2.5 font-semibold whitespace-nowrap">{h}</th>
                    )}
                  </tr></thead>
                  <tbody>{filtered.map((f) => (
                    <tr key={f.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-2.5 text-slate-400 whitespace-nowrap">{f.waktu}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-700">{f.user}</td>
                      <td className="px-4 py-2.5 text-teal-600 font-medium">{f.wahana}</td>
                      <td className="px-4 py-2.5 text-slate-600">{f.tipe}</td>
                      <td className="px-4 py-2.5">
                        <span className={`font-semibold px-2 py-0.5 rounded-sm ${sentimentColor[f.sentimen]}`}>
                          {f.sentimen}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600 max-w-xs">
                        <p className="truncate">{f.text}</p>
                        {f.balasan && <p className="text-[11px] text-teal-700 italic mt-0.5 truncate">↳ Balasan: {f.balasan}</p>}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          f.status === 'Ditindaklanjuti' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {f.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <button
                          onClick={() => openReplyModal(f)}
                          className="text-xs text-teal-600 hover:text-white border border-teal-200 hover:bg-teal-600 px-2.5 py-1 rounded transition-colors font-semibold"
                        >
                          {f.status === 'Ditindaklanjuti' ? 'Ubah Balasan' : 'Tanggapi'}
                        </button>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          </main>

          {/* Modal Tanggapi Masukan */}
          {replyModal && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl flex flex-col gap-4">
                <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-display text-xl text-slate-900">Tanggapi Masukan Pengunjung</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Pengirim: {replyModal.user} • {replyModal.wahana}</p>
                  </div>
                  <button onClick={() => setReplyModal(null)} className="text-slate-400 hover:text-slate-700">
                    <X size={18} />
                  </button>
                </div>

                <div className="bg-slate-50 p-3 rounded border border-slate-100 text-xs text-slate-700">
                  <p className="font-semibold text-slate-800 mb-1">Masukan Pengunjung:</p>
                  <p className="text-slate-600 italic">"{replyModal.text}"</p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 text-xs block mb-1">Balasan Resmi Pengelola:</label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Tuliskan respon resmi kepada pengunjung..."
                    className="w-full border border-slate-200 rounded p-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setReplyModal(null)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSendReply}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded flex items-center gap-1.5"
                  >
                    <Send size={12} /> Kirim Tanggapan
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </PageWrapper>
  )
}
