import { useState } from 'react'
import { Plus, Search, X } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import StatBlock from '../components/StatBlock'
import AnimatedBar from '../components/AnimatedBar'

const wahanaList = [
  { id:'W001', nama:'Roller Coaster Alpha', kat:'Ekstrem',   kap:120, tinggi:'135 cm', jam:'09.00–17.00', status:'Beroperasi', pct:92 },
  { id:'W002', nama:'Bianglala Raksasa',    kat:'Keluarga',  kap:80,  tinggi:'Semua',  jam:'09.00–18.00', status:'Beroperasi', pct:78 },
  { id:'W003', nama:'Flying Fox Highland',  kat:'Ekstrem',   kap:60,  tinggi:'120 cm', jam:'09.00–16.00', status:'Beroperasi', pct:85 },
  { id:'W004', nama:'Arung Jeram Express',  kat:'Air',       kap:96,  tinggi:'110 cm', jam:'Ditangguhkan', status:'Maintenance', pct:0 },
  { id:'W005', nama:'Mini Train Junior',    kat:'Anak',      kap:40,  tinggi:'Semua',  jam:'09.00–17.30', status:'Beroperasi', pct:65 },
  { id:'W006', nama:'Carousel Klasik',      kat:'Keluarga',  kap:48,  tinggi:'Semua',  jam:'Ditangguhkan', status:'Maintenance', pct:0 },
  { id:'W007', nama:'Drop Tower Vertigo',   kat:'Ekstrem',   kap:32,  tinggi:'140 cm', jam:'10.00–16.00', status:'Beroperasi', pct:88 },
  { id:'W008', nama:'Kolam Renang Olimpik', kat:'Air',       kap:200, tinggi:'Semua',  jam:'Ditutup',      status:'Tutup',      pct:0 },
]

const statusClass = { 'Beroperasi':'bg-emerald-50 text-emerald-700', 'Maintenance':'bg-amber-50 text-amber-700', 'Tutup':'bg-red-50 text-red-700' }
const emptyForm = { nama:'', kat:'Ekstrem', kap:'', tinggi:'', jamBuka:'09:00', jamTutup:'17:00', status:'Beroperasi', ket:'' }

export default function WahanaManagement() {
  const [q, setQ]           = useState('')
  const [st, setSt]         = useState('')
  const [kat, setKat]       = useState('')
  const [modal, setModal]   = useState(false)
  const [form, setForm]     = useState(emptyForm)

  const filtered = wahanaList.filter(w =>
    (!q  || w.nama.toLowerCase().includes(q.toLowerCase())) &&
    (!st  || w.status === st) &&
    (!kat || w.kat === kat)
  )

  const openAdd  = () => { setForm(emptyForm); setModal(true) }
  const openEdit = (w) => { setForm({ ...w, jamBuka:'09:00', jamTutup:'17:00', ket:'' }); setModal(true) }

  return (
    <PageWrapper role="branch" active="/wahana">
      {({ toggleSidebar }) => (
        <>
          <Topbar
            title="Manajemen Wahana"
            breadcrumb={[{ label:'Dashboard', to:'/branch-admin' }, { label:'Manajemen Wahana' }]}
            onMenuClick={toggleSidebar}
          />
          <main className="p-4 sm:p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatBlock label="Total Wahana"  value="22" sub="Terdaftar" />
              <StatBlock label="Beroperasi"    value="18" sub="Aktif hari ini" color="green" />
              <StatBlock label="Maintenance"   value="3"  sub="Sedang diperbaiki" color="amber" />
              <StatBlock label="Tutup"         value="1"  sub="Tidak beroperasi" color="red" />
            </div>

            <div className="bg-white border border-slate-200 rounded-md">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-slate-100">
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari wahana..."
                      className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded w-52 focus:outline-none focus:border-teal-500" />
                  </div>
                  <select value={st} onChange={e=>setSt(e.target.value)} className="text-sm border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-teal-500">
                    <option value="">Semua Status</option>
                    <option>Beroperasi</option><option>Maintenance</option><option>Tutup</option>
                  </select>
                  <select value={kat} onChange={e=>setKat(e.target.value)} className="text-sm border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-teal-500">
                    <option value="">Semua Kategori</option>
                    <option>Ekstrem</option><option>Keluarga</option><option>Anak</option><option>Air</option>
                  </select>
                </div>
                <button onClick={openAdd} className="flex items-center gap-1.5 bg-teal-600 text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-teal-700">
                  <Plus size={14} /> Tambah Wahana
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-xs text-left bg-slate-50">
                    {['ID','Nama','Kategori','Kap./Jam','Tinggi Min.','Jam','Status','Popularitas','Aksi'].map(h =>
                      <th key={h} className="px-4 py-2.5 font-semibold whitespace-nowrap">{h}</th>
                    )}
                  </tr></thead>
                  <tbody>{filtered.map((w, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                      <td className="px-4 py-3 text-xs text-slate-400">#{w.id}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{w.nama}</td>
                      <td className="px-4 py-3 text-slate-600">{w.kat}</td>
                      <td className="px-4 py-3 text-slate-600">{w.kap} org</td>
                      <td className="px-4 py-3 text-slate-600">{w.tinggi}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{w.jam}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${statusClass[w.status]}`}>{w.status}</span>
                      </td>
                      <td className="px-4 py-3 w-32">
                        {w.pct > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="flex-1"><AnimatedBar value={w.pct} /></div>
                            <span className="text-xs text-slate-500 w-7 text-right">{w.pct}%</span>
                          </div>
                        ) : <span className="text-xs text-slate-400">–</span>}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => openEdit(w)} className="text-xs text-teal-600 border border-teal-200 px-2.5 py-1 rounded hover:bg-teal-50">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
              <div className="px-5 py-3 text-xs text-slate-500">Menampilkan {filtered.length} dari 22 wahana</div>
            </div>
          </main>

          {/* Modal */}
          {modal && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
              <div className="bg-white rounded-md w-full max-w-lg shadow-lg">
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
                  <h2 className="font-display text-lg text-slate-900">{form.id ? 'Edit Wahana' : 'Tambah Wahana Baru'}</h2>
                  <button onClick={() => setModal(false)} className="text-slate-400 hover:text-slate-700"><X size={18} /></button>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label:'Nama Wahana', key:'nama', type:'text', colSpan:2 },
                    { label:'Kategori', key:'kat', type:'select', opts:['Ekstrem','Keluarga','Anak','Air'] },
                    { label:'Status', key:'status', type:'select', opts:['Beroperasi','Maintenance','Tutup'] },
                    { label:'Kapasitas/Jam', key:'kap', type:'number' },
                    { label:'Tinggi Minimum', key:'tinggi', type:'text' },
                    { label:'Jam Buka', key:'jamBuka', type:'time' },
                    { label:'Jam Tutup', key:'jamTutup', type:'time' },
                    { label:'Keterangan', key:'ket', type:'textarea', colSpan:2 },
                  ].map(f => (
                    <div key={f.key} className={f.colSpan === 2 ? 'col-span-2' : ''}>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">{f.label}</label>
                      {f.type === 'select' ? (
                        <select value={form[f.key]} onChange={e => setForm(p => ({...p,[f.key]:e.target.value}))}
                          className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500">
                          {f.opts.map(o => <option key={o}>{o}</option>)}
                        </select>
                      ) : f.type === 'textarea' ? (
                        <textarea value={form[f.key]} onChange={e => setForm(p => ({...p,[f.key]:e.target.value}))}
                          rows={3} className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500 resize-none" />
                      ) : (
                        <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({...p,[f.key]:e.target.value}))}
                          className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100">
                  <button onClick={() => setModal(false)} className="text-sm text-slate-600 border border-slate-200 px-4 py-2 rounded hover:bg-slate-50">Batal</button>
                  <button onClick={() => setModal(false)} className="bg-teal-600 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-teal-700">Simpan</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </PageWrapper>
  )
}

