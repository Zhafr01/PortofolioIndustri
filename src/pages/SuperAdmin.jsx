import { useState, useEffect } from 'react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import StatBlock from '../components/StatBlock'
import { X, CheckCircle2, RotateCw, Edit, Plus } from 'lucide-react'

const initialDeviceList = [
  { id: 1, type: 'Sensor Getaran',  dest: 'Jatim Park 2', status: 'Online',  ping: '14:32' },
  { id: 2, type: 'Smart Gate A',    dest: 'Jatim Park 3', status: 'Online',  ping: '14:31' },
  { id: 3, type: 'CCTV Gate 2',     dest: 'Selecta',      status: 'Offline', ping: '13:00' },
  { id: 4, type: 'Sensor Suhu',     dest: 'BNS',          status: 'Online',  ping: '14:30' },
  { id: 5, type: 'Smart Gate B',    dest: 'Jatim Park 1', status: 'Warning', ping: '14:28' },
]

const initialDestList = [
  { id: 'DST-001', nama: 'Jatim Park 1',      admin: 'Hendra W.', status: 'Aktif', iot: 12 },
  { id: 'DST-002', nama: 'Jatim Park 2',      admin: 'Budi S.',   status: 'Aktif', iot: 18 },
  { id: 'DST-003', nama: 'Jatim Park 3',      admin: 'Ari W.',    status: 'Aktif', iot: 15 },
  { id: 'DST-004', nama: 'BNS',               admin: 'Maya S.',   status: 'Aktif', iot: 8  },
  { id: 'DST-005', nama: 'Selecta',           admin: 'Rina K.',   status: 'Aktif', iot: 10 },
  { id: 'DST-006', nama: 'Santerra',          admin: 'Dedi P.',   status: 'Aktif', iot: 6  },
  { id: 'DST-007', nama: 'Kusuma Agrowisata', admin: 'Wahyu T.',  status: 'Aktif', iot: 5  },
]

const initialAuditLog = [
  { ts: '14:32:00', user: 'Rudi H.',            role: 'Technical',    aksi: 'Akui Alert AL-001',  ip: '192.168.1.14', status: 'Sukses' },
  { ts: '14:20:30', user: 'Dinas Pariwisata',    role: 'Gov Admin',    aksi: 'Login ke Dashboard', ip: '10.0.1.2',     status: 'Sukses' },
  { ts: '13:55:00', user: 'Budi S.',            role: 'Branch Admin', aksi: 'Edit Wahana W004',   ip: '192.168.1.10', status: 'Sukses' },
  { ts: '13:30:00', user: 'Dev Team',           role: 'Super Admin',  aksi: 'Restart MQTT Broker',ip: 'localhost',    status: 'Sukses' },
  { ts: '12:10:00', user: 'Ari W.',             role: 'Branch Admin', aksi: 'Kirim Proposal',     ip: '192.168.2.5',  status: 'Sukses' },
  { ts: '11:45:00', user: 'Unknown User',       role: 'Publik',       aksi: 'Login gagal 3x',     ip: '45.33.100.9',  status: 'Gagal' },
]

function randRPS() { return Math.round(60 + Math.random() * 60) }

export default function SuperAdmin() {
  const MAX = 20
  const [pts, setPts] = useState(() => Array.from({ length: MAX }, () => ({ v: randRPS() })))
  const [deviceList, setDeviceList] = useState(initialDeviceList)
  const [destList, setDestList] = useState(initialDestList)
  const [auditLog, setAuditLog] = useState(initialAuditLog)
  const [editingDest, setEditingDest] = useState(null)
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    const id = setInterval(() => {
      setPts(p => [...p.slice(1), { v: randRPS() }])
    }, 2000)
    return () => clearInterval(id)
  }, [])

  function showToast(msg) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  function handleRestartDevice(device) {
    setDeviceList(prev => prev.map(d => d.id === device.id ? { ...d, status: 'Restarting...' } : d))
    showToast(`Memulai ulang ${device.type} di ${device.dest}...`)

    setTimeout(() => {
      setDeviceList(prev => prev.map(d => d.id === device.id ? { ...d, status: 'Online', ping: 'Baru saja' } : d))
      showToast(`✓ ${device.type} berhasil di-restart dan berstatus Online.`)
    }, 1500)
  }

  function handleSaveEditDest() {
    if (!editingDest) return
    setDestList(prev => prev.map(d => d.id === editingDest.id ? editingDest : d))
    showToast(`✓ Data destinasi ${editingDest.nama} berhasil diperbarui.`)
    setEditingDest(null)
  }

  return (
    <PageWrapper role="super" active="/super-admin">
      {({ toggleSidebar }) => (
        <>
          <Topbar title="System Overview"
            breadcrumb={[{ label: 'System Overview' }]}
            onMenuClick={toggleSidebar} notifCount={1} />
          
          {toastMsg && (
            <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl text-xs font-medium border border-slate-700 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={16} className="text-teal-400" />
              <span>{toastMsg}</span>
            </div>
          )}

          <main className="p-4 sm:p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatBlock label="Platform Uptime"   value="99.9%"  sub="30 hari terakhir" color="green" />
              <StatBlock label="Active Sessions"   value="142"    sub="Seluruh aktor" />
              <StatBlock label="Total Devices"     value="74"     sub="71 online, 3 offline" color="amber" />
              <StatBlock label="API Response Time" value="48 ms"  sub="Rata-rata global" />
            </div>

            {/* Server traffic chart + IoT devices */}
            <div className="grid md:grid-cols-10 gap-6">
              <div className="md:col-span-6 bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between shadow-xs">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Traffic Permintaan API (RPS)</p>
                  <p className="text-xs text-slate-400 mt-0.5">Real-time throughput dari gateway Kota Batu</p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={pts} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <Line type="monotone" dataKey="v" stroke="#0D9488" strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="md:col-span-4 flex flex-col gap-4">
                <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Status Perangkat IoT</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead><tr className="border-b border-slate-100 text-slate-500 uppercase text-left">
                        {['Tipe','Destinasi','Status','Last Ping','Aksi'].map(h => <th key={h} className="pb-2 pr-3 font-semibold">{h}</th>)}
                      </tr></thead>
                      <tbody>{deviceList.map((d) => (
                        <tr key={d.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                          <td className="py-2 pr-3 text-slate-700 font-medium">{d.type}</td>
                          <td className="py-2 pr-3 text-slate-600">{d.dest}</td>
                          <td className="py-2 pr-3">
                            <span className={`font-semibold ${d.status==='Online'?'text-emerald-600':d.status==='Offline'?'text-slate-500':d.status==='Restarting...'?'text-blue-600':'text-red-600'}`}>
                              {d.status}
                            </span>
                          </td>
                          <td className="py-2 pr-3 text-slate-400 font-mono">{d.ping}</td>
                          <td className="py-2">
                            <button
                              onClick={() => handleRestartDevice(d)}
                              className="text-teal-600 hover:text-teal-800 font-semibold flex items-center gap-1 hover:underline"
                            >
                              <RotateCw size={11} /> Restart
                            </button>
                          </td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">MQTT Broker Status</p>
                  <p>Connected clients: <strong>47</strong></p>
                  <p>Message rate: <strong>230/min</strong></p>
                  <p>Uptime: <strong className="text-teal-600">99.8%</strong></p>
                </div>
              </div>
            </div>

            {/* Destinations */}
            <div className="bg-white border border-slate-200 rounded-md shadow-xs">
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                <p className="text-sm font-semibold text-slate-900">Destinasi Terdaftar</p>
                <span className="text-xs text-slate-500">{destList.length} Destinasi Aktif</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-xs text-left bg-slate-50">
                    {['ID','Nama','Branch Admin','Status Platform','IoT Aktif','Aksi'].map(h =>
                      <th key={h} className="px-4 py-2.5 font-semibold">{h}</th>
                    )}
                  </tr></thead>
                  <tbody>{destList.map((d) => (
                    <tr key={d.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-xs text-slate-400 font-mono">{d.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{d.nama}</td>
                      <td className="px-4 py-3 text-slate-600">{d.admin}</td>
                      <td className="px-4 py-3"><span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-sm">{d.status}</span></td>
                      <td className="px-4 py-3 text-slate-600">{d.iot} devices</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setEditingDest({ ...d })}
                          className="text-xs text-teal-600 hover:text-white border border-teal-200 hover:bg-teal-600 px-3 py-1 rounded transition-colors flex items-center gap-1 font-semibold"
                        >
                          <Edit size={11} /> Edit
                        </button>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>

            {/* Audit log */}
            <div className="bg-white border border-slate-200 rounded-md shadow-xs">
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                <p className="text-sm font-semibold text-slate-900">Log Aktivitas Terbaru (Audit Trail)</p>
                <span className="text-xs text-slate-400 font-mono">Real-time Stream</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-left bg-slate-50">
                    {['Waktu','User','Role','Aksi','IP Address','Status'].map(h =>
                      <th key={h} className="px-4 py-2.5 font-semibold">{h}</th>
                    )}
                  </tr></thead>
                  <tbody>{auditLog.map((r, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-2.5 text-slate-400 font-mono">{r.ts}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-700">{r.user}</td>
                      <td className="px-4 py-2.5 text-slate-500">{r.role}</td>
                      <td className="px-4 py-2.5 text-slate-700">{r.aksi}</td>
                      <td className="px-4 py-2.5 text-slate-400 font-mono">{r.ip}</td>
                      <td className="px-4 py-2.5">
                        <span className={`font-semibold ${r.status==='Sukses'?'text-emerald-600':'text-red-600'}`}>{r.status}</span>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          </main>

          {/* Edit Destinasi Modal */}
          {editingDest && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl flex flex-col gap-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h3 className="font-display text-xl text-slate-900">Edit Data Destinasi</h3>
                  <button onClick={() => setEditingDest(null)} className="text-slate-400 hover:text-slate-700">
                    <X size={18} />
                  </button>
                </div>

                <div className="flex flex-col gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nama Destinasi</label>
                    <input
                      type="text"
                      value={editingDest.nama}
                      onChange={e => setEditingDest({ ...editingDest, nama: e.target.value })}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Branch Admin Terdaftar</label>
                    <input
                      type="text"
                      value={editingDest.admin}
                      onChange={e => setEditingDest({ ...editingDest, admin: e.target.value })}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Status Platform</label>
                    <select
                      value={editingDest.status}
                      onChange={e => setEditingDest({ ...editingDest, status: e.target.value })}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-slate-800 bg-white"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Ditangguhkan">Ditangguhkan</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Jumlah Perangkat IoT Terkoneksi</label>
                    <input
                      type="number"
                      value={editingDest.iot}
                      onChange={e => setEditingDest({ ...editingDest, iot: parseInt(e.target.value) || 0 })}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-slate-800"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setEditingDest(null)}
                    className="px-4 py-2 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveEditDest}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded text-xs font-semibold"
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
