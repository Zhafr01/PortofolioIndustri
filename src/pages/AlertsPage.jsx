import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import StatBlock from '../components/StatBlock'

const all = [
  { id:'AL-001', waktu:'14:32', tipe:'Teknis', subtipe:'Sensor', lokasi:'Roller Coaster Alpha', pelapor:'Sensor IoT',   penerima:'Rudi H.', status:'Dilaporkan' },
  { id:'AL-002', waktu:'13:15', tipe:'Teknis', subtipe:'Manual', lokasi:'Bianglala Raksasa',    pelapor:'Dewi W.',     penerima:'Bowo N.', status:'Dalam Proses' },
  { id:'AL-003', waktu:'11:40', tipe:'Medis',  subtipe:'',       lokasi:'Area Parkir',           pelapor:'Pengunjung',  penerima:'Sari I.', status:'Selesai' },
  { id:'AL-004', waktu:'10:22', tipe:'Keamanan',subtipe:'',      lokasi:'Pintu Masuk B',         pelapor:'Pengunjung',  penerima:'Agus P.', status:'Selesai' },
  { id:'AL-005', waktu:'09:55', tipe:'Teknis', subtipe:'Sensor', lokasi:'Drop Tower Vertigo',    pelapor:'Sensor IoT',  penerima:'Rudi H.', status:'Diakui' },
  { id:'AL-006', waktu:'09:30', tipe:'Medis',  subtipe:'',       lokasi:'Wahana Anak',           pelapor:'Pengunjung',  penerima:'Nanda R.',status:'Selesai' },
  { id:'AL-007', waktu:'08:45', tipe:'Keamanan',subtipe:'',      lokasi:'Area Parkir',           pelapor:'Pengunjung',  penerima:'Fajar H.',status:'Selesai' },
  { id:'AL-008', waktu:'08:10', tipe:'Teknis', subtipe:'Manual', lokasi:'Arung Jeram Express',   pelapor:'Lestari M.', penerima:'Bowo N.', status:'Selesai' },
]

const statusClass = {
  'Dilaporkan':  'bg-red-50 text-red-700',
  'Diakui':      'bg-blue-50 text-blue-700',
  'Dalam Proses':'bg-amber-50 text-amber-700',
  'Selesai':     'bg-slate-100 text-slate-500',
}

const tabs = ['Semua','Teknis','Medis','Keamanan']

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('Semua')
  const [accordionOpen, setAccordionOpen] = useState(false)

  const filtered = all.filter(a => activeTab === 'Semua' || a.tipe === activeTab)

  return (
    <PageWrapper role="branch" active="/alerts">
      {({ toggleSidebar }) => (
        <>
          <Topbar title="Alert & Insiden"
            breadcrumb={[{label:'Dashboard',to:'/branch-admin'},{label:'Alert & Insiden'}]}
            onMenuClick={toggleSidebar} notifCount={3} />
          <main className="p-4 sm:p-6 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatBlock label="Alert Aktif" value="3" sub="Memerlukan tindakan" color="red" />
              <StatBlock label="Selesai Hari Ini" value="12" sub="Rata-rata 4.2 menit" color="green" />
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
            <div className="bg-white border border-slate-200 rounded-md overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-xs text-left bg-slate-50">
                  {['ID','Waktu','Tipe','Lokasi','Pelapor','Penerima','Status','Aksi'].map(h =>
                    <th key={h} className="px-4 py-2.5 font-semibold whitespace-nowrap">{h}</th>
                  )}
                </tr></thead>
                <tbody>{filtered.map((a, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-3 text-xs text-slate-400">{a.id}</td>
                    <td className="px-4 py-3 text-slate-500">{a.waktu}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{a.tipe}{a.subtipe ? ` — ${a.subtipe}` : ''}</td>
                    <td className="px-4 py-3 text-slate-600">{a.lokasi}</td>
                    <td className="px-4 py-3 text-slate-600">{a.pelapor}</td>
                    <td className="px-4 py-3 text-slate-600">{a.penerima}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${statusClass[a.status]}`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => alert(`Detail alert ${a.id}`)} className="text-xs text-teal-600 border border-teal-200 px-2.5 py-1 rounded hover:bg-teal-50">Detail</button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>

            {/* Accordion */}
            <div className="bg-white border border-slate-200 rounded-md">
              <button onClick={() => setAccordionOpen(v=>!v)}
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                Panduan Alur Alert
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${accordionOpen?'rotate-180':''}`} />
              </button>
              {accordionOpen && (
                <div className="px-5 pb-5 text-sm text-slate-600 space-y-3 border-t border-slate-100 pt-4">
                  <p>Setiap alert berjalan melalui empat status berjenjang:</p>
                  <div className="flex items-center gap-2 text-sm">
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
        </>
      )}
    </PageWrapper>
  )
}

