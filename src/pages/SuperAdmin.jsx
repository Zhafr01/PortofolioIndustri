import { useState, useEffect } from 'react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import StatBlock from '../components/StatBlock'
import AnimatedBar from '../components/AnimatedBar'

const deviceList = [
  { type:'CCTV',            dest:'Jatim Park 2', status:'Online', ping:'14:45:12' },
  { type:'Sensor Getaran',  dest:'Jatim Park 3', status:'Online', ping:'14:45:10' },
  { type:'Smart Gate',      dest:'BNS',           status:'Offline',ping:'14:30:00' },
  { type:'Sensor Suhu',     dest:'Selecta',       status:'Online', ping:'14:45:08' },
  { type:'CCTV',            dest:'Santerra',      status:'Error',  ping:'14:00:00' },
  { type:'Smart Gate',      dest:'Jatim Park 1',  status:'Online', ping:'14:45:11' },
]

const destList = [
  { id:'D-001', nama:'Jatim Park 1',      admin:'Hendra S.',  status:'Aktif',  iot:'8' },
  { id:'D-002', nama:'Jatim Park 2',      admin:'Budi S.',    status:'Aktif',  iot:'12' },
  { id:'D-003', nama:'Jatim Park 3',      admin:'Ari W.',     status:'Aktif',  iot:'14' },
  { id:'D-004', nama:'BNS',               admin:'Citra M.',   status:'Aktif',  iot:'9' },
  { id:'D-005', nama:'Selecta',           admin:'Doni P.',    status:'Aktif',  iot:'6' },
  { id:'D-006', nama:'Santerra',          admin:'Eka R.',     status:'Aktif',  iot:'7' },
  { id:'D-007', nama:'Kusuma Agrowisata', admin:'Fani A.',    status:'Aktif',  iot:'4' },
]

const auditLog = [
  { ts:'14:45:00', user:'Budi S.',     role:'Branch Admin', aksi:'Login',              ip:'192.168.1.10', status:'Sukses' },
  { ts:'14:40:12', user:'Sensor IoT',  role:'System',       aksi:'Alert Anomali Getaran', ip:'10.0.0.5',  status:'Sukses' },
  { ts:'14:32:00', user:'Rudi H.',     role:'Technical',    aksi:'Akui Alert AL-001',  ip:'192.168.1.14', status:'Sukses' },
  { ts:'14:20:30', user:'Dinas Pariwisata', role:'Gov Admin', aksi:'Login',            ip:'10.0.1.2',    status:'Sukses' },
  { ts:'13:55:00', user:'Budi S.',     role:'Branch Admin', aksi:'Edit Wahana W004',   ip:'192.168.1.10', status:'Sukses' },
  { ts:'13:30:00', user:'Dev Team',    role:'Super Admin',  aksi:'Restart MQTT Broker',ip:'localhost',    status:'Sukses' },
  { ts:'12:10:00', user:'Ari W.',      role:'Branch Admin', aksi:'Kirim Proposal',     ip:'192.168.2.5',  status:'Sukses' },
  { ts:'11:45:00', user:'Unknown',     role:'–',            aksi:'Login gagal 3x',     ip:'45.33.100.9',  status:'Gagal' },
]

function randRPS() { return Math.round(60 + Math.random() * 60) }

export default function SuperAdmin() {
  const MAX = 20
  const [pts, setPts] = useState(() => Array.from({ length: MAX }, () => ({ v: randRPS() })))

  useEffect(() => {
    const id = setInterval(() => {
      setPts(prev => [...prev.slice(1), { v: randRPS() }])
    }, 2000)
    return () => clearInterval(id)
  }, [])

  const currentRPS = pts[pts.length - 1]?.v ?? 0

  return (
    <PageWrapper role="super" active="/super-admin">
      {({ toggleSidebar }) => (
        <>
          <Topbar title="Dasbor Sistem"
            breadcrumb={[{ label:'System Overview' }]}
            onMenuClick={toggleSidebar} />
          <main className="p-4 sm:p-6 flex flex-col gap-6">
            {/* Health */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatBlock label="CPU Usage" value="34%"><AnimatedBar value={34} /></StatBlock>
              <StatBlock label="Memory" value="6.2 / 16 GB"><AnimatedBar value={39} /></StatBlock>
              <StatBlock label="Storage" value="234 / 500 GB"><AnimatedBar value={47} /></StatBlock>
              <StatBlock label="IoT Devices Online" value="47/52" sub="5 perangkat offline" color="amber">
                <AnimatedBar value={90} color="amber" />
              </StatBlock>
            </div>

            {/* Chart + IoT */}
            <div className="grid md:grid-cols-9 gap-6">
              <div className="md:col-span-5 bg-white border border-slate-200 rounded-md p-5">
                <div className="flex items-baseline gap-2 mb-3">
                  <p className="text-sm font-semibold text-slate-900">Aktivitas Platform Real-time</p>
                  <span className="font-display text-xl text-teal-600">{currentRPS}</span>
                  <span className="text-xs text-slate-400">req/s</span>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={pts} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <Line type="monotone" dataKey="v" stroke="#0D9488" strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="md:col-span-4 flex flex-col gap-4">
                <div className="bg-white border border-slate-200 rounded-md p-5">
                  <p className="text-sm font-semibold text-slate-900 mb-3">Status Perangkat IoT</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead><tr className="border-b border-slate-100 text-slate-500 uppercase text-left">
                        {['Tipe','Destinasi','Status','Last Ping',''].map(h => <th key={h} className="pb-2 pr-3 font-semibold">{h}</th>)}
                      </tr></thead>
                      <tbody>{deviceList.map((d, i) => (
                        <tr key={i} className="border-b border-slate-50 last:border-0">
                          <td className="py-2 pr-3 text-slate-700">{d.type}</td>
                          <td className="py-2 pr-3 text-slate-600">{d.dest}</td>
                          <td className="py-2 pr-3">
                            <span className={`font-semibold ${d.status==='Online'?'text-emerald-600':d.status==='Offline'?'text-slate-500':'text-red-600'}`}>{d.status}</span>
                          </td>
                          <td className="py-2 pr-3 text-slate-400">{d.ping}</td>
                          <td className="py-2"><button className="text-teal-600 hover:underline">Restart</button></td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-md px-4 py-3 text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">MQTT Broker</p>
                  <p>Connected clients: <strong>47</strong></p>
                  <p>Message rate: <strong>230/min</strong></p>
                  <p>Uptime: <strong className="text-teal-600">99.8%</strong></p>
                </div>
              </div>
            </div>

            {/* Destinations */}
            <div className="bg-white border border-slate-200 rounded-md">
              <div className="px-5 py-4 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-900">Destinasi Terdaftar</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-xs text-left bg-slate-50">
                    {['ID','Nama','Branch Admin','Status Platform','IoT Aktif','Aksi'].map(h =>
                      <th key={h} className="px-4 py-2.5 font-semibold">{h}</th>
                    )}
                  </tr></thead>
                  <tbody>{destList.map((d, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                      <td className="px-4 py-3 text-xs text-slate-400">{d.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{d.nama}</td>
                      <td className="px-4 py-3 text-slate-600">{d.admin}</td>
                      <td className="px-4 py-3"><span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-sm">{d.status}</span></td>
                      <td className="px-4 py-3 text-slate-600">{d.iot} devices</td>
                      <td className="px-4 py-3"><button className="text-xs text-teal-600 border border-teal-200 px-2.5 py-1 rounded hover:bg-teal-50">Edit</button></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>

            {/* Audit log */}
            <div className="bg-white border border-slate-200 rounded-md">
              <div className="px-5 py-4 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-900">Log Aktivitas Terbaru</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-left bg-slate-50">
                    {['Waktu','User','Role','Aksi','IP','Status'].map(h =>
                      <th key={h} className="px-4 py-2.5 font-semibold">{h}</th>
                    )}
                  </tr></thead>
                  <tbody>{auditLog.map((r, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                      <td className="px-4 py-2 text-slate-400">{r.ts}</td>
                      <td className="px-4 py-2 font-medium text-slate-700">{r.user}</td>
                      <td className="px-4 py-2 text-slate-500">{r.role}</td>
                      <td className="px-4 py-2 text-slate-700">{r.aksi}</td>
                      <td className="px-4 py-2 text-slate-400 font-mono">{r.ip}</td>
                      <td className="px-4 py-2">
                        <span className={`font-semibold ${r.status==='Sukses'?'text-emerald-600':'text-red-600'}`}>{r.status}</span>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          </main>
        </>
      )}
    </PageWrapper>
  )
}

