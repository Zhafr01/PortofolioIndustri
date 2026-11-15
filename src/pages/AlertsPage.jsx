import { useState } from 'react'
import { ChevronDown, CheckCircle2, Clock, MapPin, User, ShieldAlert, X } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import StatBlock from '../components/StatBlock'

const initialAlerts = [
  { id:'AL-001', waktu:'14:32', tipe:'Teknis', subtipe:'Sensor', lokasi:'Roller Coaster Alpha', pelapor:'Sensor IoT (Getaran 5.1g)', penerima:'Rudi H.', status:'Dilaporkan', detail:'Sensor akselerometer bearing 3 mencatat lonjakan getaran abnormal 5.1g di atas batas normal 4.0g.', catatan:'' },
  { id:'AL-002', waktu:'13:15', tipe:'Teknis', subtipe:'Manual', lokasi:'Bianglala Raksasa',    pelapor:'Dewi W. (Penjaga)',     penerima:'Bowo N.', status:'Dalam Proses', detail:'Pintu pengunci gondola nomor 12 mengalami penurunan tekanan hidrolik penutup.', catatan:'Teknisi sedang melakukan penggantian seal hidrolik.' },
  { id:'AL-003', waktu:'11:40', tipe:'Keamanan', subtipe:'Manual', lokasi:'Area Parkir',        pelapor:'Pengunjung',           penerima:'Agus P.', status:'Selesai', detail:'Laporan barang tertinggal tas ransel hitam di dekat loket parkir mobil.', catatan:'Barang telah diamankan di pos keamanan dan diserahkan ke pemilik yang sah.' },
  { id:'AL-004', waktu:'10:22', tipe:'Keamanan', subtipe:'Manual', lokasi:'Pintu Masuk B',      pelapor:'Pengunjung',           penerima:'Agus P.', status:'Selesai', detail:'Penumpukan antrian masuk karena kendala pembacaan QR tiket manual.', catatan:'Petugas membuka gerbang cadangan B2, antrian kembali lancar.' },
  { id:'AL-005', waktu:'09:55', tipe:'Teknis', subtipe:'Sensor', lokasi:'Drop Tower Vertigo',    pelapor:'Sensor IoT (Suhu 48°C)', penerima:'Rudi H.', status:'Diakui', detail:'Sensor suhu sistem pengereman magnetik mendekati batas ambang 50°C.', catatan:'Pemeriksaan sirkulasi pendingin blower.' },
  { id:'AL-006', waktu:'09:30', tipe:'Keamanan', subtipe:'Manual', lokasi:'Wahana Anak',        pelapor:'Pengunjung',           penerima:'Fajar H.', status:'Selesai', detail:'Anak usia 5 tahun terpisah dari orang tua di area mandi bola.', catatan:'Anak berhasil dipertemukan kembali dengan ibunya dalam 4 menit.' },
  { id:'AL-007', waktu:'08:45', tipe:'Keamanan', subtipe:'Manual', lokasi:'Area Parkir',        pelapor:'Pengunjung',           penerima:'Fajar H.', status:'Selesai', detail:'Mobil menghalangi akses jalur shuttle bus.', catatan:'Pengemudi telah dipanggil via paging dan memindahkan kendaraan.' },
  { id:'AL-008', waktu:'08:10', tipe:'Teknis', subtipe:'Manual', lokasi:'Arung Jeram Express',   pelapor:'Lestari M. (Penjaga)',  penerima:'Bowo N.', status:'Selesai', detail:'Sensor pelampung level air kolam penampungan perlu kalibrasi.', catatan:'Kalibrasi selesai, debit air normal.' },
]

const statusClass = {
  'Dilaporkan':  'bg-red-50 text-red-700 border border-red-200',
  'Diakui':      'bg-blue-50 text-blue-700 border border-blue-200',
  'Dalam Proses':'bg-amber-50 text-amber-700 border border-amber-200',
  'Selesai':     'bg-slate-100 text-slate-600 border border-slate-200',
}

const tabs = ['Semua','Teknis','Keamanan']
const statusOptions = ['Dilaporkan', 'Diakui', 'Dalam Proses', 'Selesai']
const staffOptions = ['Rudi H.', 'Bowo N.', 'Agus P.', 'Fajar H.', 'Sari I.']

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('Semua')
  const [accordionOpen, setAccordionOpen] = useState(false)
  const [alerts, setAlerts] = useState(initialAlerts)
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [tempStatus, setTempStatus] = useState('')
  const [tempPenerima, setTempPenerima] = useState('')
  const [tempCatatan, setTempCatatan] = useState('')
  const [savedSuccess, setSavedSuccess] = useState(false)

  const filtered = alerts.filter(a => activeTab === 'Semua' || a.tipe === activeTab)

  const activeCount = alerts.filter(a => a.status !== 'Selesai').length
  const completedToday = alerts.filter(a => a.status === 'Selesai').length

  function openDetail(alert) {
    setSelectedAlert(alert)
    setTempStatus(alert.status)
    setTempPenerima(alert.penerima)
    setTempCatatan(alert.catatan || '')
    setSavedSuccess(false)
  }

  function handleSaveDetail() {
    if (!selectedAlert) return
    setAlerts(prev => prev.map(a => {
      if (a.id === selectedAlert.id) {
        return {
          ...a,
          status: tempStatus,
          penerima: tempPenerima,
          catatan: tempCatatan
        }
      }
      return a
    }))
    setSavedSuccess(true)
    setTimeout(() => {
      setSelectedAlert(null)
    }, 1200)
  }

  return (
    <PageWrapper role="branch" active="/alerts">
      {({ toggleSidebar }) => (
        <>
          <Topbar title="Alert &amp; Insiden"
            breadcrumb={[{label:'Dashboard',to:'/branch-admin'},{label:'Alert & Insiden'}]}
            onMenuClick={toggleSidebar} notifCount={activeCount} />
          <main className="p-4 sm:p-6 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatBlock label="Alert Aktif" value={activeCount.toString()} sub="Memerlukan tindakan" color="red" />
              <StatBlock label="Selesai Hari Ini" value={completedToday.toString()} sub="Rata-rata 4.2 menit" color="green" />
              <StatBlock label="Rata-rata Respons" value="4.2 mnt" sub="Semua tipe alert" />
            </div>

            {/* Filter tabs */}
            <div className="flex border-b border-slate-200 gap-6 overflow-x-auto pb-px scrollbar-thin">
              {tabs.map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={`pb-2 text-sm font-medium transition-colors ${activeTab===t ? 'border-b-2 border-teal-600 text-teal-600' : 'text-slate-500 hover:text-slate-800'}`}>
                  {t}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-md overflow-x-auto shadow-xs">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-xs text-left bg-slate-50">
                  {['ID','Waktu','Tipe','Lokasi','Pelapor','Penerima','Status','Aksi'].map(h =>
                    <th key={h} className="px-4 py-2.5 font-semibold whitespace-nowrap">{h}</th>
                  )}
                </tr></thead>
                <tbody>{filtered.map((a) => (
                  <tr key={a.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-slate-500">{a.id}</td>
                    <td className="px-4 py-3 text-slate-500">{a.waktu}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{a.tipe}{a.subtipe ? ` / ${a.subtipe}` : ''}</td>
                    <td className="px-4 py-3 text-slate-600">{a.lokasi}</td>
                    <td className="px-4 py-3 text-slate-600">{a.pelapor}</td>
                    <td className="px-4 py-3 text-slate-600 font-medium">{a.penerima}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${statusClass[a.status]}`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openDetail(a)}
                        className="text-xs font-semibold text-teal-600 hover:text-white border border-teal-200 hover:bg-teal-600 px-3 py-1 rounded transition-colors"
                      >
                        Detail &amp; Aksi
                      </button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>

            {/* Accordion */}
            <div className="bg-white border border-slate-200 rounded-md">
              <button onClick={() => setAccordionOpen(v=>!v)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                Panduan Alur Alert &amp; Eskalasi Otomatis
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${accordionOpen?'rotate-180':''}`} />
              </button>
              {accordionOpen && (
                <div className="px-5 pb-5 text-sm text-slate-600 space-y-3 border-t border-slate-100 pt-4">
                  <p>Setiap alert berjalan melalui empat status berjenjang:</p>
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    {['Dilaporkan','Diakui','Dalam Proses','Selesai'].map((s, i, arr) => (
                      <span key={s} className="flex items-center gap-2">
                        <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-1 rounded-sm">{s}</span>
                        {i < arr.length - 1 && <span className="text-slate-300">→</span>}
                      </span>
                    ))}
                  </div>
                  <p><strong>Auto-escalation:</strong> Jika alert tidak berubah dari <em>Dilaporkan</em> menjadi <em>Diakui</em> dalam 3 menit, sistem otomatis mengirimkan notifikasi eskalasi ke Branch Admin.</p>
                </div>
              )}
            </div>
          </main>

          {/* Real Alert Detail & Action Modal */}
          {selectedAlert && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-2xl relative flex flex-col gap-4 animate-in fade-in duration-150">
                <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-mono font-bold text-teal-600">{selectedAlert.id}</span>
                    <h3 className="font-display text-xl text-slate-900 mt-0.5">{selectedAlert.lokasi}</h3>
                    <p className="text-xs text-slate-500">{selectedAlert.tipe} / {selectedAlert.subtipe} • Dilaporkan pukul {selectedAlert.waktu} WIB</p>
                  </div>
                  <button
                    onClick={() => setSelectedAlert(null)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded"
                    aria-label="Tutup"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="bg-slate-50 p-3 rounded border border-slate-100 text-xs text-slate-700">
                  <p className="font-semibold text-slate-900 mb-1">Kronologi / Laporan Temuan:</p>
                  <p className="text-slate-600 leading-relaxed">{selectedAlert.detail}</p>
                  <p className="text-[11px] text-slate-400 mt-2">Pelapor: <span className="font-medium text-slate-600">{selectedAlert.pelapor}</span></p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tugaskan Petugas:</label>
                    <select
                      value={tempPenerima}
                      onChange={e => setTempPenerima(e.target.value)}
                      className="w-full border border-slate-200 rounded px-2.5 py-2 bg-white text-slate-800"
                    >
                      {staffOptions.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Perbarui Status Insiden:</label>
                    <select
                      value={tempStatus}
                      onChange={e => setTempStatus(e.target.value)}
                      className="w-full border border-slate-200 rounded px-2.5 py-2 bg-white font-medium text-slate-800"
                    >
                      {statusOptions.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 text-xs block mb-1">Catatan Tindakan Petugas:</label>
                  <textarea
                    rows={3}
                    value={tempCatatan}
                    onChange={e => setTempCatatan(e.target.value)}
                    placeholder="Tambahkan catatan penanganan teknis / keamanan..."
                    className="w-full border border-slate-200 rounded p-2 text-xs text-slate-800 resize-none focus:outline-none focus:border-teal-500"
                  />
                </div>

                {savedSuccess && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs flex items-center gap-1.5 font-medium">
                    <CheckCircle2 size={14} /> Perubahan status berhasil disimpan dan tercatat di audit log.
                  </div>
                )}

                <div className="flex gap-2 justify-end pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedAlert(null)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveDetail}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded transition-colors shadow-xs"
                  >
                    Simpan Perubahan
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
