import { useState } from 'react'
import { Plus, Search, X } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import StatBlock from '../components/StatBlock'
import AnimatedBar from '../components/AnimatedBar'

const stafList = [
  { id:'T-001', nama:'Rudi Hartono',    initials:'RH', role:'Teknisi',        zona:'Wahana Ekstrem',    duty:true },
  { id:'M-001', nama:'Sari Indah',      initials:'SI', role:'Tim Medis',      zona:'Pos Medis Utama',   duty:true },
  { id:'K-001', nama:'Agus Pramono',    initials:'AP', role:'Keamanan',       zona:'Pintu Masuk A',     duty:true },
  { id:'P-003', nama:'Dewi Wulandari',  initials:'DW', role:'Penjaga Wahana', zona:'Roller Coaster',    duty:true },
  { id:'T-002', nama:'Bowo Nugroho',    initials:'BN', role:'Teknisi',        zona:'Zona Air',          duty:false },
  { id:'P-004', nama:'Lestari Murni',   initials:'LM', role:'Penjaga Wahana', zona:'Bianglala Raksasa', duty:true },
  { id:'K-002', nama:'Fajar Hidayat',   initials:'FH', role:'Keamanan',       zona:'Area Parkir',       duty:true },
  { id:'M-002', nama:'Nanda Rahayu',    initials:'NR', role:'Tim Medis',      zona:'Pos Medis Wahana',  duty:false },
]

const zones = [
  { name:'Wahana Ekstrem', aktif:4, total:5 },
  { name:'Wahana Air',     aktif:2, total:4 },
  { name:'Wahana Anak',    aktif:3, total:3 },
  { name:'Pintu Masuk',    aktif:3, total:4 },
  { name:'Area Parkir',    aktif:2, total:3 },
  { name:'Pos Medis',      aktif:2, total:3 },
]

const shifts = [
  { label:'Pagi (07.00–15.00)', count:12, active:true },
  { label:'Sore (15.00–22.00)', count:6,  active:false },
  { label:'Malam (22.00–07.00)',count:3,  active:false },
]

export default function StafManagement() {
  const [q, setQ]       = useState('')
  const [rf, setRf]     = useState('')
  const [modal, setModal] = useState(false)

  const filtered = stafList.filter(s =>
    (!q  || s.nama.toLowerCase().includes(q.toLowerCase())) &&
    (!rf || s.role === rf)
  )

  return (
    <PageWrapper role="branch" active="/staf">
      {({ toggleSidebar }) => (
        <>
          <Topbar title="Manajemen Staf"
            breadcrumb={[{label:'Dashboard',to:'/branch-admin'},{label:'Manajemen Staf'}]}
            onMenuClick={toggleSidebar} />
          <main className="p-4 sm:p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <StatBlock label="Total Staf"    value="24" sub="Terdaftar" />
              <StatBlock label="Bertugas"      value="18" sub="On duty"       color="green" />
              <StatBlock label="Penjaga Wahana" value="8" sub="Di berbagai zona" />
              <StatBlock label="Tim Medis"     value="3"  sub="Siaga di pos" />
              <StatBlock label="Keamanan"      value="4"  sub="Patroli aktif" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Staff table */}
              <div className="bg-white border border-slate-200 rounded-md">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-slate-100">
                  <div className="flex flex-wrap gap-2">
                    <div className="relative">
                      <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari staf..."
                        className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded w-44 focus:outline-none focus:border-teal-500" />
                    </div>
                    <select value={rf} onChange={e=>setRf(e.target.value)} className="text-sm border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-teal-500">
                      <option value="">Semua Sub-Role</option>
                      <option>Penjaga Wahana</option><option>Teknisi</option><option>Tim Medis</option><option>Keamanan</option>
                    </select>
                  </div>
                  <button onClick={() => setModal(true)} className="flex items-center gap-1.5 bg-teal-600 text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-teal-700">
                    <Plus size={14} /> Tambah
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-xs text-left bg-slate-50">
                      {['Nama','Sub-Role','Zona','Status',''].map(h => <th key={h} className="px-4 py-2.5 font-semibold">{h}</th>)}
                    </tr></thead>
                    <tbody>{filtered.map((s, i) => (
                      <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0">{s.initials}</div>
                            <div>
                              <p className="font-medium text-slate-800 text-sm">{s.nama}</p>
                              <p className="text-xs text-slate-400">{s.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3"><span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-sm">{s.role}</span></td>
                        <td className="px-4 py-3 text-xs text-slate-600">{s.zona}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${s.duty ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                            {s.duty ? 'On Duty' : 'Off Duty'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => setModal(true)} className="text-xs text-teal-600 border border-teal-200 px-2.5 py-1 rounded hover:bg-teal-50">Edit</button>
                        </td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <div className="px-5 py-3 text-xs text-slate-500">Menampilkan {filtered.length} dari 24 staf</div>
              </div>

              {/* Zona + Shift */}
              <div className="flex flex-col gap-4">
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-4">Distribusi Staf per Zona</p>
                  <div className="flex flex-col gap-3">
                    {zones.map((z, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-medium text-slate-700">{z.name}</span>
                          <span className="text-slate-500">{z.aktif}/{z.total}</span>
                        </div>
                        <AnimatedBar value={Math.round((z.aktif/z.total)*100)} color={z.aktif < z.total ? 'amber' : 'teal'} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Jadwal Shift Hari Ini</p>
                  <div className="flex flex-col gap-2">
                    {shifts.map((sh, i) => (
                      <div key={i} className={`flex justify-between items-center px-3 py-2.5 border-l-2 ${sh.active ? 'border-teal-500 bg-teal-50' : 'border-slate-200 bg-slate-50'}`}>
                        <span className="text-sm font-medium text-slate-700">{sh.label}</span>
                        <span className={`text-sm font-semibold ${sh.active ? 'text-teal-700' : 'text-slate-500'}`}>{sh.count} staf</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>

          {modal && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
              <div className="bg-white rounded-md w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
                  <h2 className="font-display text-lg text-slate-900">Tambah Staf Baru</h2>
                  <button onClick={() => setModal(false)} className="text-slate-400 hover:text-slate-700"><X size={18} /></button>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {l:'Nama Lengkap',k:'nama',t:'text',col:2},{l:'No. ID Staf',k:'id',t:'text'},
                    {l:'No. HP',k:'hp',t:'tel'},{l:'Sub-Role',k:'role',t:'sel',o:['Penjaga Wahana','Teknisi','Tim Medis','Keamanan']},
                    {l:'Zona',k:'zona',t:'sel',o:['Wahana Ekstrem','Wahana Air','Wahana Anak','Pintu Masuk','Area Parkir','Pos Medis']},
                    {l:'Shift',k:'shift',t:'sel',o:['Pagi','Sore','Malam']},
                  ].map(f => (
                    <div key={f.k} className={f.col===2?'col-span-2':''}>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">{f.l}</label>
                      {f.t==='sel' ? (
                        <select className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500">
                          {f.o.map(o=><option key={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input type={f.t} className="w-full text-sm border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-teal-500" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100">
                  <button onClick={()=>setModal(false)} className="text-sm text-slate-600 border border-slate-200 px-4 py-2 rounded hover:bg-slate-50">Batal</button>
                  <button onClick={()=>setModal(false)} className="bg-teal-600 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-teal-700">Simpan</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </PageWrapper>
  )
}

