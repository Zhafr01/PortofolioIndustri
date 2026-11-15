import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import Topbar from '../components/Topbar'
import StatBlock from '../components/StatBlock'
import AnimatedBar from '../components/AnimatedBar'
import BarChartWidget from '../components/BarChartWidget'
import { Compass, MapPin, Radio, Users, CheckCircle, Navigation } from 'lucide-react'

const monthData6 = [
  { name:'Jan', value:38200 }, { name:'Feb', value:41500 }, { name:'Mar', value:39800 },
  { name:'Apr', value:44200 }, { name:'Mei', value:47100 }, { name:'Jun', value:48291 },
]
const monthData12 = [
  ...monthData6,
  { name:'Jul', value:51000 }, { name:'Agu', value:53200 }, { name:'Sep', value:49800 },
  { name:'Okt', value:52100 }, { name:'Nov', value:47300 }, { name:'Des', value:44200 },
]

const destinations = [
  { name:'Jatim Park 3',       score:86.2 },
  { name:'BNS',                score:81.4 },
  { name:'Santerra',           score:78.9 },
  { name:'Jatim Park 2',       score:76.3 },
  { name:'Selecta',            score:71.8 },
  { name:'Jatim Park 1',       score:68.5 },
  { name:'Kusuma Agrowisata',  score:61.2 },
]

const proposals = [
  { dest:'Jatim Park 3', jenis:'Pembangunan Wahana Baru', tanggal:'28 Okt 2026', prioritas:'Tinggi',  status:'Menunggu' },
  { dest:'Selecta',       jenis:'Perbaikan Akses Jalan',  tanggal:'1 Nov 2026',  prioritas:'Sedang',  status:'Menunggu' },
]

const mapNodes = [
  { id:'jp1',      name:'Jatim Park 1',      kecamatan:'Kec. Batu',    x:340, y:230, occ:'Sedang',       pct:58, visitors:'4.120 org', capacity:'7.000', parkir:'Tersedia (40%)', gate:'Normal' },
  { id:'jp2',      name:'Jatim Park 2',      kecamatan:'Kec. Batu',    x:380, y:295, occ:'Ramai',        pct:76, visitors:'6.480 org', capacity:'8.500', parkir:'Penuh (92%)',    gate:'Padat' },
  { id:'jp3',      name:'Jatim Park 3',      kecamatan:'Kec. Junrejo', x:530, y:255, occ:'Sangat Ramai', pct:88, visitors:'8.120 org', capacity:'9.000', parkir:'Penuh (96%)',    gate:'Sangat Padat' },
  { id:'bns',      name:'BNS',               kecamatan:'Kec. Junrejo', x:460, y:325, occ:'Ramai',        pct:68, visitors:'3.820 org', capacity:'5.500', parkir:'Tersedia (25%)', gate:'Lancar' },
  { id:'selecta',  name:'Selecta',           kecamatan:'Kec. Bumiaji', x:360, y:95,  occ:'Lengang',      pct:28, visitors:'1.650 org', capacity:'6.000', parkir:'Tersedia (75%)', gate:'Lancar' },
  { id:'santerra', name:'Santerra',          kecamatan:'Kec. Pujon',   x:180, y:135, occ:'Sedang',       pct:52, visitors:'2.840 org', capacity:'5.000', parkir:'Tersedia (55%)', gate:'Normal' },
  { id:'kusuma',   name:'Kusuma Agro',       kecamatan:'Kec. Batu',    x:230, y:265, occ:'Lengang',      pct:32, visitors:'1.210 org', capacity:'4.000', parkir:'Tersedia (80%)', gate:'Lancar' },
  { id:'angkut',   name:'Museum Angkut',     kecamatan:'Kec. Batu',    x:280, y:215, occ:'Ramai',        pct:74, visitors:'5.190 org', capacity:'7.000', parkir:'Padat (85%)',    gate:'Normal' },
]

const occColor = { 
  'Lengang':      { hex: '#059669', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300' },
  'Sedang':       { hex: '#0D9488', bg: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-300' },
  'Ramai':        { hex: '#D97706', bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-300' },
  'Sangat Ramai': { hex: '#DC2626', bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-300' }
}

const rangeTabs = ['6 Bulan','1 Tahun']

export default function GovAdmin() {
  const [range, setRange] = useState('6 Bulan')
  const [selectedNode, setSelectedNode] = useState(mapNodes[1]) // Default to Jatim Park 2
  const chartData = range === '6 Bulan' ? monthData6 : monthData12

  return (
    <PageWrapper role="gov" active="/gov-admin">
      {({ toggleSidebar }) => (
        <>
          <Topbar title="Dashboard Pemerintah"
            breadcrumb={[{ label:'Dashboard Pemerintah' }]}
            onMenuClick={toggleSidebar} notifCount={2} />
          <main className="p-4 sm:p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatBlock label="Total Destinasi Aktif"       value="7"      sub="Wilayah Kota Batu" />
              <StatBlock label="Total Kunjungan Bulan Ini"   value="48.291" sub="Data agregat real-time" />
              <StatBlock label="Proposal Menunggu Review"    value="2"      sub="Perlu ditindaklanjuti" color="red" />
              <StatBlock label="Rata-rata Skor Ekspansi"     value="72.1"   sub="Semua destinasi" />
            </div>

            {/* Chart + ranking */}
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-3 flex flex-col gap-3">
                <BarChartWidget data={chartData} title={`Tren Kunjungan Agregat: ${range}`} />
                <div className="flex gap-2">
                  {rangeTabs.map(t => (
                    <button key={t} onClick={()=>setRange(t)}
                      className={`text-xs font-medium px-3 py-1 rounded border ${range===t?'bg-teal-600 text-white border-teal-600':'border-slate-200 text-slate-600 hover:border-teal-400'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 bg-white border border-slate-200 rounded-md p-5">
                <p className="text-sm font-semibold text-slate-900 mb-4">Ranking Skor Ekspansi</p>
                <div className="flex flex-col gap-4">
                  {destinations.map((d, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="font-display text-teal-600 text-lg w-5 flex-shrink-0">{i+1}</span>
                        <span className="text-sm text-slate-700 flex-1 truncate">{d.name}</span>
                        <span className="text-sm font-semibold text-slate-900">{d.score}</span>
                      </div>
                      <AnimatedBar value={d.score} color="teal" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Proposals */}
            <div className="bg-white border border-slate-200 rounded-md">
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                <p className="text-sm font-semibold text-slate-900">Proposal Ekspansi Menunggu Review</p>
                <span className="text-xs text-slate-500 font-medium">2 Proposal Terbaru</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-slate-100 text-slate-500 uppercase tracking-wide text-xs text-left bg-slate-50">
                    {['Destinasi','Jenis Proposal','Tanggal Masuk','Prioritas','Status','Aksi'].map(h =>
                      <th key={h} className="px-4 py-2.5 font-semibold whitespace-nowrap">{h}</th>
                    )}
                  </tr></thead>
                  <tbody>{proposals.map((p, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-800">{p.dest}</td>
                      <td className="px-4 py-3 text-slate-600">{p.jenis}</td>
                      <td className="px-4 py-3 text-slate-500">{p.tanggal}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${p.prioritas==='Tinggi'?'bg-red-50 text-red-700':'bg-amber-50 text-amber-700'}`}>{p.prioritas}</span>
                      </td>
                      <td className="px-4 py-3"><span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-sm">{p.status}</span></td>
                      <td className="px-4 py-3">
                        <Link to="/expansion-approval" className="text-xs text-teal-600 border border-teal-200 px-2.5 py-1 rounded hover:bg-teal-50">Telaah</Link>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>

            {/* Rich Interactive Vector Map */}
            <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-slate-900">Peta Sebaran Destinasi Wisata Kota Batu</p>
                    <span className="flex items-center gap-1 text-[11px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-full border border-teal-200">
                      <Radio size={12} className="animate-pulse text-teal-600" /> Live Sensor IoT
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Pemantauan spasial kepadatan 3 kecamatan: Bumiaji, Batu, dan Junrejo</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Compass size={14} className="text-slate-400" />
                  <span>Koordinat: -7.8712° S, 112.5273° E</span>
                </div>
              </div>

              {/* Map Canvas + Info Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4 items-start">
                {/* SVG Vector Map */}
                <div className="lg:col-span-3 bg-slate-50 rounded-lg p-2 sm:p-4 border border-slate-200 relative overflow-hidden">
                  <svg viewBox="0 0 700 420" className="w-full h-auto drop-shadow-sm select-none" aria-label="Peta Geografis Wisata Kota Batu">
                    <defs>
                      <pattern id="mapGrid" width="35" height="35" patternUnits="userSpaceOnUse">
                        <path d="M 35 0 L 0 0 0 35" fill="none" stroke="#E2E8F0" strokeWidth="0.6" strokeDasharray="2,2" />
                      </pattern>
                      <linearGradient id="bumiajiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ECFDF5" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#D1FAE5" stopOpacity="0.6" />
                      </linearGradient>
                      <linearGradient id="batuGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F0FDFA" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#CCFBF1" stopOpacity="0.6" />
                      </linearGradient>
                      <linearGradient id="junrejoGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>

                    {/* Base Grid */}
                    <rect width="700" height="420" fill="#F8FAFC" rx="8" />
                    <rect width="700" height="420" fill="url(#mapGrid)" rx="8" />

                    {/* Regional Outline - Kota Batu Composite Boundary */}
                    {/* 1. Kecamatan Bumiaji (Utara) */}
                    <path
                      d="M 230 40 C 310 15, 430 20, 510 55 C 570 85, 560 140, 520 170 C 470 190, 390 195, 330 185 C 270 175, 210 145, 190 100 C 180 75, 200 48, 230 40 Z"
                      fill="url(#bumiajiGrad)"
                      stroke="#A7F3D0"
                      strokeWidth="1.8"
                    />

                    {/* 2. Kecamatan Batu (Tengah & Barat) */}
                    <path
                      d="M 170 135 C 240 160, 330 185, 360 195 C 430 215, 450 250, 430 320 C 380 375, 290 380, 210 350 C 160 325, 120 280, 130 215 C 135 170, 150 145, 170 135 Z"
                      fill="url(#batuGrad)"
                      stroke="#99F6E4"
                      strokeWidth="1.8"
                    />

                    {/* 3. Kecamatan Junrejo (Tenggara - Arah Gerbang Malang) */}
                    <path
                      d="M 360 195 C 430 190, 520 180, 600 205 C 655 240, 660 310, 600 365 C 520 405, 440 385, 400 345 C 445 285, 420 225, 360 195 Z"
                      fill="url(#junrejoGrad)"
                      stroke="#FDE68A"
                      strokeWidth="1.8"
                    />

                    {/* Mountain Silhouettes */}
                    {/* Gn. Arjuno (Utara) */}
                    <g opacity="0.45" transform="translate(320, 18)">
                      <path d="M 0 35 L 35 5 L 70 35 Z" fill="#94A3B8" />
                      <path d="M 28 11 L 35 5 L 42 11 L 38 14 L 35 12 L 32 14 Z" fill="#FFFFFF" />
                      <text x="35" y="47" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="600">Gn. Arjuno (3.339 m)</text>
                    </g>

                    {/* Gn. Panderman (Barat) */}
                    <g opacity="0.45" transform="translate(100, 240)">
                      <path d="M 0 32 L 25 8 L 50 32 Z" fill="#94A3B8" />
                      <text x="25" y="44" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="600">Gn. Panderman</text>
                    </g>

                    {/* Kali Brantas (Water Arterial Line) */}
                    <path
                      d="M 390 45 C 380 90, 420 140, 400 180 C 375 220, 395 255, 450 280 C 510 305, 545 350, 590 380"
                      fill="none"
                      stroke="#60A5FA"
                      strokeWidth="2.5"
                      strokeDasharray="6,3"
                      opacity="0.75"
                    />
                    <text x="540" y="385" fontSize="8" fill="#3B82F6" fontWeight="600">Aliran Brantas</text>

                    {/* Main Road Networks */}
                    {/* Arteri Malang - Batu (Jl. Ir. Soekarno) */}
                    <path
                      d="M 660 340 Q 560 285 450 260 T 340 240"
                      fill="none"
                      stroke="#64748B"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 660 340 Q 560 285 450 260 T 340 240"
                      fill="none"
                      stroke="#F8FAFC"
                      strokeWidth="1.2"
                      strokeDasharray="4,4"
                    />
                    <text x="580" y="295" fontSize="8" fill="#475569" fontWeight="600">Jl. Ir. Soekarno (Arteri Malang)</text>

                    {/* Jl. Raya Oro-Oro Ombo (Jalur Lingkar Wisata) */}
                    <path
                      d="M 340 240 Q 320 280 360 310 T 480 345"
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />

                    {/* Jl. Raya Selecta (Akses Bumiaji) */}
                    <path
                      d="M 340 240 Q 350 160 365 95 T 385 45"
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />

                    {/* Subdistrict Watermarks */}
                    <text x="430" y="75" fontSize="13" fill="#059669" opacity="0.35" fontWeight="bold" letterSpacing="2">KEC. BUMIAJI</text>
                    <text x="210" y="210" fontSize="13" fill="#0D9488" opacity="0.35" fontWeight="bold" letterSpacing="2">KEC. BATU</text>
                    <text x="500" y="355" fontSize="13" fill="#D97706" opacity="0.35" fontWeight="bold" letterSpacing="2">KEC. JUNREJO</text>

                    {/* Destination Nodes */}
                    {mapNodes.map((n) => {
                      const isSelected = selectedNode?.id === n.id
                      const col = occColor[n.occ]
                      return (
                        <g
                          key={n.id}
                          className="cursor-pointer transition-transform duration-200"
                          onClick={() => setSelectedNode(n)}
                        >
                          {/* Pulsing ring for busy destinations */}
                          {(n.occ === 'Ramai' || n.occ === 'Sangat Ramai') && (
                            <circle
                              cx={n.x}
                              cy={n.y}
                              r={isSelected ? 26 : 21}
                              fill="none"
                              stroke={col.hex}
                              strokeWidth="1.5"
                              opacity="0.4"
                              className="animate-ping"
                            />
                          )}

                          {/* Outer Selection Indicator */}
                          {isSelected && (
                            <circle
                              cx={n.x}
                              cy={n.y}
                              r="20"
                              fill="none"
                              stroke="#0F172A"
                              strokeWidth="2"
                              strokeDasharray="3,3"
                            />
                          )}

                          {/* Pin Background */}
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r={isSelected ? 14 : 11}
                            fill={col.hex}
                            stroke="#FFFFFF"
                            strokeWidth="2.5"
                            className="shadow-md"
                          />

                          {/* Dot center */}
                          <circle cx={n.x} cy={n.y} r="3.5" fill="#FFFFFF" />

                          {/* Label Pill */}
                          <g transform={`translate(${n.x}, ${n.y + (isSelected ? 26 : 22)})`}>
                            <rect
                              x="-50"
                              y="-8"
                              width="100"
                              height="22"
                              rx="4"
                              fill={isSelected ? '#0F172A' : '#FFFFFF'}
                              stroke={isSelected ? '#0F172A' : '#E2E8F0'}
                              strokeWidth="1"
                              className="shadow-sm"
                            />
                            <text
                              x="0"
                              y="3"
                              textAnchor="middle"
                              fontSize="9"
                              fontWeight="600"
                              fill={isSelected ? '#FFFFFF' : '#1E293B'}
                            >
                              {n.name}
                            </text>
                            <text
                              x="0"
                              y="11"
                              textAnchor="middle"
                              fontSize="7.5"
                              fontWeight="500"
                              fill={isSelected ? '#94A3B8' : col.hex}
                            >
                              {n.occ} ({n.pct}%)
                            </text>
                          </g>
                        </g>
                      )
                    })}

                    {/* Scale bar & Compass */}
                    <g transform="translate(25, 380)">
                      <rect x="0" y="0" width="110" height="26" rx="4" fill="#FFFFFF" stroke="#E2E8F0" opacity="0.9" />
                      <line x1="12" y1="13" x2="98" y2="13" stroke="#334155" strokeWidth="2" />
                      <line x1="12" y1="9" x2="12" y2="17" stroke="#334155" strokeWidth="2" />
                      <line x1="55" y1="9" x2="55" y2="17" stroke="#334155" strokeWidth="2" />
                      <line x1="98" y1="9" x2="98" y2="17" stroke="#334155" strokeWidth="2" />
                      <text x="12" y="23" fontSize="7" fill="#64748B">0</text>
                      <text x="50" y="23" fontSize="7" fill="#64748B">2.5 km</text>
                      <text x="92" y="23" fontSize="7" fill="#64748B">5 km</text>
                    </g>

                    <g transform="translate(645, 35)">
                      <circle cx="16" cy="16" r="16" fill="#FFFFFF" stroke="#E2E8F0" opacity="0.95" />
                      <polygon points="16,4 20,16 16,13 12,16" fill="#DC2626" />
                      <polygon points="16,28 20,16 16,13 12,16" fill="#64748B" />
                      <text x="16" y="2" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#DC2626">U</text>
                    </g>
                  </svg>
                </div>

                {/* Selected Node Details Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{selectedNode.kecamatan}</span>
                      <p className="font-display text-lg text-slate-900 mt-0.5">{selectedNode.name}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${occColor[selectedNode.occ].bg} ${occColor[selectedNode.occ].text} border ${occColor[selectedNode.occ].border}`}>
                      {selectedNode.occ}
                    </span>
                  </div>

                  <div className="bg-white rounded p-3 border border-slate-100 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 flex items-center gap-1.5"><Users size={13} className="text-slate-400" /> Kunjungan Real-time:</span>
                      <span className="font-semibold text-slate-800">{selectedNode.visitors}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Kapasitas Maksimal:</span>
                      <span className="font-semibold text-slate-700">{selectedNode.capacity} org</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Status Parkir:</span>
                      <span className="font-semibold text-slate-700">{selectedNode.parkir}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Arus Smart Gate:</span>
                      <span className="font-semibold text-teal-700">{selectedNode.gate}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-600 font-medium">Beban Kapasitas</span>
                      <span className="font-bold text-slate-900">{selectedNode.pct}%</span>
                    </div>
                    <AnimatedBar value={selectedNode.pct} color={selectedNode.pct > 75 ? 'red' : selectedNode.pct > 50 ? 'amber' : 'teal'} />
                  </div>

                  <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded border border-slate-100 flex items-start gap-1.5">
                    <CheckCircle size={14} className="text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>Terhubung ke 12 sensor IoT dan 4 smart gate counter gateway Kota Batu.</span>
                  </div>

                  <p className="text-[11px] text-slate-400 italic text-center">
                    Klik pin destinasi pada peta untuk inspeksi cepat.
                  </p>
                </div>
              </div>

              {/* Map Legend */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Tingkat Kepadatan:</span>
                  {Object.entries(occColor).map(([label, val]) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full border border-white shadow-xs" style={{ background: val.hex }} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-slate-600 inline-block" /> Jalan Arteri</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-400 border-b border-dashed border-blue-600 inline-block" /> Kali Brantas</span>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </PageWrapper>
  )
}


